import { Product } from "../models/product.model";
import { Shop } from "../models/shop.model";
import { Order } from "../models/order.model";
import { v2 as cloudinary } from "cloudinary";



//create a new product

export const createProduct = async (req, res) => {
  try {
    const { shopId } = req.body;
    const shop = await Shop.find({ id: shopId });
    if (!shop) {
      return res.status(400).json({ message: "Shop Id is Invalid" });
    }
    else {
      let images = [];
      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      }
      else {
        images = req.body.images;
      }
      const productImages = [];
      for (let i = 0; i < productImages.length; i++) {
        const uploadImage = await cloudinary.uploader.upload(images[i], {
          folder: "products"
        })
      }
      productImages.push({
        public_id: uploadImage.public_id,
        url: uploadImage.secure_url
      })
    }
    const productsData = req.body;
    productsData.images = productImages;
    const product = await Product.create(productsData);
    res.status(201).json(product, {
      sucess: true
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get all the products by id

export const getAllProducts = async (req, res) => {

  try {
    const { id } = req.params;
    const product = await Product.find({ shopId: id });
    res.status(200).json(product, {
      sucess: true
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get all the shop Items
export const getProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product, {
      sucess: true
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//products managed by admin

export const manageProducts = async (req, res) => {
  try {
    const product = await Product.find().sort({ CreatedAt: -1 });
    res.status(200).json(product, {
      sucess: true
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//update review
export const updateReview = async (req, res) => {
  try {
    const { user, rating, comment, productId, orderId } = req.body;
    const product = await Product.findById(productId);
    const review = {
      user, comment, productId, rating
    }
    const isReviewd = product.review.find((rev) => rev.user._id === req.user._id);
    if (isReviewd) {
      product.review.forEach((rev) => {
        if (rev.user_id === req.user._id) {
          rev.rating = rating,
            rev.comment = comment,
            rev.user = user;
        }
        else {
          product.review.push(review);
        }
        let avg = 0;
        product.review.forEach((rev) => {
          avg += rev.rating;
        })
        product.ratings = avg / product.review.length;
      });
      await product.save();
      const order = await Order.findByIdAndUpdate(orderId,
        {
          $set: { "cart.$[elem].isReviewed": true },
          arrayFilters: [{ "elem_id": [productId] }],
          new: true
        })
    };
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//delete review
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found by Id" });
    }
    for (let i = 0; i < product.images.length; i++) {
      const images = await cloudinary.uploader.destroy(
        product.images[i].public_id
      );
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json(product, {
      message: `${product} is deleted sucessfully`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}