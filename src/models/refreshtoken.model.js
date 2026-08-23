const mongoose=require("mongoose");
const refreshTokenSchema = new mongoose.Schema(
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


const refreshtokenModel = mongoose.model(
  "RefreshToken",
  refreshTokenSchema
);
module.exports ={refreshtokenModel};