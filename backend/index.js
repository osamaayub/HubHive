const express = require("express");
require("dotenv/config");
const cors = require("cors");
const ConnectDB = require("./config/database");
const cloudinary = require("cloudinary").v2;

const {
  conversationRouter,
  couponCodeRouter,
  eventRouter,
  messageRouter,
  orderRouter,
  productRouter,
  userRouter,
  withdrawRouter,
  shopRouter
} = require("./routes");

const cookieParser = requrie("cookie-parser");





const app = express();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json());
app.use(cookieParser());

app.use(cors());


app.use("/api/v2/conversation", conversationRouter);
app.use("/api/v2/couponCode", couponCodeRouter);
app.use("/api/v2/event", eventRouter);
app.use("/api/v2/message", messageRouter);
app.use("/api/v2/orders", orderRouter);
app.use("/api/v2/products", productRouter);
app.use("/api/v2/shop", shopRouter);
app.use("/api/v2/users", userRouter);
app.use("/api/v2/withdraw", withdrawRouter);

ConnectDB();



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})
