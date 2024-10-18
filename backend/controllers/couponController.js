const { CoupCode } = require("../models/couponCode.model");




//create a new CouponCode
const createNewCoupon = async (req, res) => {
  try {
    const coupon = await CoupCode.create({
      name: req.body.name
    });
    if (coupon.length !== 0) {
      return res.status(400).json({ message: "coupcode already exists" });
    }
    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
//get coupon code by id
const getCouponCode = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await CoupCode.find({ shopId: id });
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ messsage: error.message });
  }
}
//get coupon by name

const getCouponCodebyName = async (req, res) => {
  try {
    const { name } = req.body;
    const couponCode = await CoupCode.find(name);
    res.status(200).json(couponCode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
//delete an coupon code

const deleteCouponCode = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await CoupCode.findByIdAndDelete(id);
    res.status(200).json({
      coupon,
      message: `${coupon} deleted sucessfully`
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
module.exports = { createNewCoupon, deleteCouponCode, getCouponCode, getCouponCodebyName }