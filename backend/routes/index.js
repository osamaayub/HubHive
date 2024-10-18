// routes/index.js
const conversationRouter = require('./conversation');
const couponCodeRouter = require('./couponCode');
const eventRouter = require('./event');
const messageRouter = require('./message');
const orderRouter = require('./order');
const productRouter = require('./product');
const shopRouter = require('./shop');
const userRouter = require('./user');
const withdrawRouter = require('./withdraw');

module.exports = {
  conversationRouter,
  couponCodeRouter,
  eventRouter,
  messageRouter,
  orderRouter,
  productRouter,
  shopRouter,
  userRouter,
  withdrawRouter
};
