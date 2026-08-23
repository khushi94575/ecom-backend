const mongoose=require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      maxlength: 4000,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    mrp: {
      type: Number,
      required: true,
      min: 1,
    },

    images: [
      {
        url: String,
        publicId: String,
      },
    ],

    video: {
      url: String,
      publicId: String,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    stockQty: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    tags: [
      {
        type: String,
        enum: ["trending", "top-selling", "new"],
      },
    ],

    ratingAvg: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    ratingCount: {
      type: Number,
      default: 0,
    },

    soldCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const productModel = mongoose.model("Product", productSchema);
module.exports ={productModel};