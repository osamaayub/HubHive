import { Withdraw } from "../models/withdraw.model";
import { sendEmail } from "../utils/sendEmail";
import { Shop } from "../models/shop.model";


//create new withdraw Request



export const createWithdrawRequest = async (req, res) => {
  try {
    const { amount } = req.body;
    const data = {
      seller: req.seller,
      withdrawAmount: amount
    }
    await sendEmail({
      from: req.seller.email,
      subject: "Withdraw request",
      message: `Hello ${req.seller.name} your withdraw ${amount} is pending from 7 days`
    });
    req.status(201).json({
      sucess: true
    });
    const withdrawRequest = await Withdraw.create(data);
    res.status(201).json(withdrawRequest);
    const shopSeller = await Shop.findById(req.seller._id);
    shopBalance.availableBalance = shopBalance.availableBalance - amount;
    const shop = await Shop.create(shopSeller);
    res.status(201).json(shop);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get all payment admin

export const getAllPayments = async (req, res) => {
  try {
    const amount = await Withdraw.find().sort({ createAt: -1 });
    res.status(200).json(amount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//update withdraw request 

export const updateWithdrawRequest = async (req, res) => {
  try {
    const { sellerId } = req.body;
    const { id } = req.params;
    const withdraw = await Withdraw.findByIdAndUpdate({ new: true, id }, {
      status: "sucess"
    });
  } catch (error) {
    res.status(500).json({ message: error.mesage });
  }
}