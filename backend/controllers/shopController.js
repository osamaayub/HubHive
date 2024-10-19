const Shop = require("../models/shop.model");
const cloudinary = require("cloudinary").v2;
const { createToken, verifyToken, comparePassword } = require("../utils");
const SendEmail = require("../utils/sendEmail");



//create a new Shop


const createNewShop = async (req, res) => {
  try {
    const { email } = req.body;
    const seller = await Shop.find({ email });
    if (seller) {
      return res.status(400).json({ message: "seller already exists" });
    }
    const shopCloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars"
    })
    const newseller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: {
        public_id: shopCloud.public_id,
        url: shopCloud.secure_url
      },
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode
    }
    const activationToken = createActivationToken(newseller);
    const activationUrl = `http://localhost:5000/${activationToken}`;

    await SendEmail({
      email: seller.email,
      subject: "Activate Your Shop",
      message: `Hello ${seller.name} please click on this link to activate u shop ${activationUrl}`
    })
    res.status(201).json({
      sucess: true,
      message: `please check your email ${seller.email} to activate the shop`
    })


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//activation Token 

const createActivationToken = (seller) => {
  return createToken(seller);
}
//activate User

const activateUser = async (req, res) => {
  try {
    const { activateToken } = req.body;
    const newSeller = verifyToken(activateToken);
    if (!newSeller) return res.status(400).json({ message: "Token is invalid" });
    const { name, email, password, avatar, address, zipCode, phoneNumber } = newSeller;
    let seller = await Shop.find({ email });
    if (seller) return res.status(400).json({ message: "seller already exists" });
    seller = await Shop.create({
      name, email, password, avatar, address, zipCode, phoneNumber
    })
    res.status(201).json({
      sucess: true,
      seller
    })
  } catch (error) {
    res.status(500).json({ messsage: error.message });
  }
}
//login into shop

const loginShop = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Please Provide the correct details" });
    const user = await Shop.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "User does not exits" });
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) return res.status(400).json({ message: "Invalid Password" });
    const token = createToken({ id: user._id, email: email });
    res.status(200).json({
      sucess: true,
      token: token,
      data: user
    })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get Seller from the shop

const getSellers = async (req, res) => {
  try {
    const seller = await Shop.findById(req.seller._id);
    if (!seller) return res.status(400).json({ message: "user already exists" });
    res.status(200).json({
      sucess: true,
      seller
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//logout shop

const logoutShop = async (req, res) => {
  try {
    res.cookie("seller_token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true
    });
    res.status(200).json({
      sucess: true,
      message: "logged out sucessful!"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get Shop Information

const getShopInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findById(id);
    res.status(200).json({
      sucess: true,
      shop
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
//update shop avatar 
const updateShopAvatar = async (req, res) => {

  try {
    const existingSeller = await Shop.findById(req.seller._id);
    if (req.body.avatar !== "") {
      const imageId = existingSeller.avatar.public_id;
      await cloudinary.uploader.destroy(imageId);
      const avatarCloud = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "avatars"
      });
      existingSeller.avatar = {
        public_id: avatarCloud.public_id,
        url: avatarCloud.secure_url
      }
    }
    //saving seller into the database
    await existingSeller.save();
    res.status(200).json({
      sucess: true,
      seller: existingSeller
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get sellers data managed by admin

const getSellersData = async (req, res) => {
  try {
    const seller = await Shop.find().sort({ createdAt: -1 });
    res.status(200).json({
      sucess: true,
      sellerData: seller
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
//delete seller data managed by admin

const deleteSellerData = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Shop.findById(id);
    if (!seller) return res.status(400).json({ message: "seller does not exist" });
    await Shop.findByIdAndDelete(id);

    res.status(200).json({
      sucess: true,
      message: `seller deleted sucessfully`
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
//update seller data

const updateSellerData = async (req, res) => {

  try {
    const { name, description, address, zipCode, phoneNumber } = req.body;
    const shop = await Shop.findById(req.seller._id);
    if (!shop) return res.status(400).json({ message: "seller does not exist" });

    //update existing seller data
    shop.name = name;
    shop.description = description;
    shop.address = address;
    shop.zipCode = zipCode;
    shop.phoneNumber = phoneNumber;

    //saving seller data into the database
    await Shop.save();
    res.status(200).json({
      sucess: true,
      shop
    })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
//update payment Method

const updatePaymentMethod = async (req, res) => {
  try {
    const { withDrawalMethod } = req.body;
    const paymentMethod = await Shop.findByIdAndUpdate(req.seller.id, {
      withDrawalMethod
    })
    res.status(200).json({
      sucess: true,
      paymentMethod
    })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
//delete Payment Method

const deletePaymentMethod = async (req, res) => {
  try {
    const seller = await Shop.findById(req.seller._id);
    if (!seller) return res.status(400).json({ message: "seller not found by id" });
    seller.withDrawalMethod = null;
    //save the updated seller to the database
    await Shop.save();
    res.status(200).json({
      sucess: true,
      message: `${seller.withDrawalMethod} has been deleted sucessfully`
    })
      ;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


module.exports = {
  createNewShop,
  activateUser,
  loginShop,
  getSellers,
  logoutShop,
  getShopInfo,
  updateShopAvatar,
  getSellersData,
  deleteSellerData,
  updateSellerData,
  updatePaymentMethod,
  deletePaymentMethod
}