const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      maxlength: 120,
      trim: true,
      minlength: 4,
    },
    fullname: { type: String, maxlength: 120, trim: true, minlength: 4 },
    phone: { type: String, maxlength: 120, trim: true, minlength: 10 },
    city: {
      type: String,
      maxlength: 120,
      trim: true,
      minlength: 4,
    },
    state: { type: String, maxlength: 120, trim: true, minlength: 4 },
    pincode: { type: Number, maxlength: 120, trim: true, minlength: 6 },
    isDefault: { type: Boolean, default: false },
  },
  { id: true },
);
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 128,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 126,
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 14
    },
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    profilePhoto: {
      url: {
        type: String,
      },
      publicID: {
        type: String,
      },
    },
    shopName: {
      type: String,
    },
    addresses: [addressSchema],
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
