const mongoose=require("mongoose");
const refreshSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    tokenHash: {
      type: String,
      required: true,
    },

    userAgent: String,

    ip: String,

    expiresAt: {
      type: Date,
      required: true,
      index: {
        expires: 0,
      },
    },
  },
  { timestamps: true }
);


const refreshModel = mongoose.model(
  "RefreshToken",
  refreshSchema
);
module.exports ={refreshModel};