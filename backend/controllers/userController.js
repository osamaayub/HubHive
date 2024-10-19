const { User } = require("../models/user.model");
const cloudinary = require("cloudinary").v2;
const sendEmail = require("../utils/sendEmail");
const { createToken, comparePassword, verifyToken } = require("../utils");




//create a new User
const createUser = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;
    const userEmail = await User.find({ email });
    if (!userEmail) return res.status(400).json({ message: "user already exists" });
    const uploadUserImage = await cloudinary.uploader.upload(avatar, {
      folder: "avatars"
    });
    const user = {
      username,
      email,
      password,
      avatar: {
        public_id: uploadUserImage.public_id,
        url: uploadUserImage.secure_url
      }
    }
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5000/${activationToken}`
    await sendEmail({
      email: user.email,
      subject: "Account activation",
      message: `Hello ${user.username}, please click on this account  to activate your account ${activationUrl} `
    })
    res.status(201).json({
      sucess: true,
      message: `please check u email ${user.email} to activate your account`
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//activating the user
const createActivationToken = (user) => {
  return createToken(user);
}


//login User 

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "user already exists" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "User does not exists" });
    const isPassword = await comparePassword(password, user.password);
    if (!isPassword) return res.status(400).json({ message: "password is not valid" });
    const token = createToken({ id: user._id, email: user.email });
    res.status(200).json({
      token,
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//logout 

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true
    });
    res.status(200).json({
      sucess: true,
      message: "user is logged out"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get single user data through id

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({
      sucess: true,
      user
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
//get all the user only for Admin

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      sucess: true,
      user
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//load the user 

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "user does not exists" });
    }
    res.status(200).json({
      sucess: true,
      user
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
//update User Info

const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "user already exists" });
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) return res.status(400).json({ message: "password is not valid" });

    //update the fields of the user
    user.username = username;
    user.email = email;
    user.phoneNumber = phoneNumber;
    await user.save();
    res.status(200).json({
      sucess: true,
      user
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//update the avatar

const updateAvatar = async (req, res) => {
  try {
    const existingUser = await User.findById(req.user.id);
    if (req.body.avatar !== "") {
      const imageId = existingUser.avatar.public_id;
      await cloudinary.uploader.destroy(imageId);
      const avatarcloud = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150
      })
      existingUser.avatar = {
        public_id: avatarcloud.public_id,
        url: avatarcloud.secure_url
      };
    }//saving into the database
    await existingUser.save();
    res.status(200).json({
      sucess: true,
      user: existingUser
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
//delete user by admin

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "user does not exists with this id" });
    const imageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);
    await User.findByIdAndDelete(id);
    res.status(200).json({
      sucess: true,
      message: `${user} deleted sucessfully`
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

//update Address

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const sameAddress = user.address.find((Address) => Address.addressType === req.body.addressType);
    if (sameAddress) {
      res.status(400).json({ message: "address already exists" });
    }
    const existingAddress = user.address.find((address) => address._id === req.body._id);
    if (existingAddress) {
      Object.assign(existingAddress, req.body);
    }
    else {
      //add new address to the array
      user.address.push(req.body);
    }
    //saving adress into the database
    await user.save();
    res.status(200).json({
      sucess: true,
      user
    })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//delete Address

const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const userId = req.user._id;

    await User.updateOne({
      _id: userId
    }, {
      $pull: { address: { _id: addressId } }
    })
    const user = await User.findById(userId);
    res.status(200).json({
      sucess: true,
      user
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
//update password

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("+password");
    const IsPasswordMatched = await comparePassword(password, user.password);
    if (!IsPasswordMatched) return res.status(400).json({ message: "Password is Invalid" });
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({ message: "password  does'nt match each other" });
    }
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).json({
      sucess: true,
      message: "password saved succesfully"
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
//activate User

const activateUser = async (req, res) => {
  try {
    const { activateToken } = req.body;
    const newUser = verifyToken(activateToken);
    if (!newUser) return res.status(400).json({ message: "Invalid Token" });
    const { username, email, password, avatar } = newUser;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exists" });
    user = await user.create({
      username,
      email,
      avatar,
      password
    })
    res.status(201).json({
      sucess: true,
      user
    })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createUser,
  deleteUser,
  deleteAddress,
  updateAddress,
  updateAvatar,
  updatePassword,
  getAllUsers,
  getUser,
  getSingleUser,
  updateUser,
  loginUser,
  logoutUser,
  activateUser
}