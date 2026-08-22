const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
    requires: true,
    minlength: 6,
    maxlength: 126,
    select: false,
  },
  phone: {
    type: Number,
    minlength: 10,
    maxlength: 14,
    required: true,
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
    type: string,
  },
  addresses: [
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
  ],
},{timestamps:true});

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;
