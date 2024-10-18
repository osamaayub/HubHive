const { Order } = require("../models/order.model");
const { Product } = require("../models/product.model");
const { Shop } = require("../models/shop.model");

//create new order
const createNewOrder = async (req, res) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo
    } = req.body;
    if (!cart || !cart.length || !shippingAddress || !user || !totalPrice || !paymentInfo) {
      res.status(400).json({ message: "Invalid Order data provided" });
    }
    //group cart Items by ShopId
    const shopItemsMap = cart.reduce((acc, item) => {
      const { shopId } = item;
      if (!acc[shopId]) {
        acc[shopId] = [];
      }
      acc[shopId].push(item);
      return acc;
    }, {});
    //create orders for each shop  sequentially
    const orders = [];
    for (const [shopId, items] of Object.entries(shopItemsMap)) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        paymentInfo,
        totalPrice
      })
      return res.status(201).json({
        sucess: true,
        orders
      });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get User orders

const getOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.find({
      OrderId: id
    }).sort({ createdAt: -1 });
    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//All Order managed by Admin 
const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find().sort({ createdAt: -1, deliveredAt: -1 });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//update the order status of the seller

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "order not found by Id" });
    // Handle status change logic
    if (status === "Transferred to delivery partner") {
      // If the order is transferred, update the product stock for each item in the order
      for (const item of order.cart) {
        const product = await Product.findById(item._id);
        if (product) {
          product.stock -= item.qty;
          product.sold_out += item.qty;
          await product.save({ validateBeforeSave: false });
        }
      }
    }

    // Update the order status
    order.status = status;

    // If the status is delivered, set delivery date and update seller balance
    if (status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";

      const serviceCharge = order.totalPrice * 0.10;
      const seller = await Shop.findById(req.seller.id);
      if (seller) {
        seller.availableBalance += (order.totalPrice - serviceCharge);
        await seller.save();
      }
    }

    // Save the updated order
    await order.save({ validateBeforeSave: false });

    // Return a success response
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}
//update the user refund

const updateRefundUser = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "order not found by Id" });
    const { status } = req.body;
    await order.save({ validateBeforeSave: false });
    res.status(200).json(order, {
      sucess: true,
      message: "Your refund request has been approved"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//update the seller refund

const updateRefundSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "order not found by Id" });
    const { status } = req.body;
    await order.save();
    res.status(200).json(order, {
      sucess: true,
      message: "Request for order refunded sucessfully"
    })
    if (status === "Refund Sucess") {
      for (const item of order.cart) {
        const product = await Product.findById(item._id);
        if (product) {
          product.stock.qty += item.qty;
          product.sold_out -= item.qty;
          await product.save({ validateBeforeSave: false });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  createNewOrder,
  updateOrderStatus,
  updateRefundSeller,
  updateRefundUser,
  getAllOrders,
  getOrders
}