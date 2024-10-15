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
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = {
      user,
      comment,
      productId,
      rating
    };

    const existingReviewIndex = product.review.findIndex(
      (rev) => rev.user._id.toString() === req.user._id.toString()
    );

    if (existingReviewIndex > -1) {
      // Update existing review
      product.review[existingReviewIndex] = {
        ...product.review[existingReviewIndex],
        ...review
      };
    } else {
      // Add new review
      product.review.push(review);
    }

    // Recalculate average rating
    const totalRating = product.review.reduce((sum, rev) => sum + rev.rating, 0);
    product.ratings = totalRating / product.review.length;

    await product.save();

    // Update order
    await Order.findByIdAndUpdate(
      orderId,
      {
        $set: { "cart.$[elem].isReviewed": true },
      },
      {
        arrayFilters: [{ "elem._id": productId }],
        new: true,
      }
    );

    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "An error occurred while updating the review" });
  }
};
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