const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO_URI;

const connectDB = async () => {
  await mongoose.connect(url);
  console.log("DB Connection Established!!!");
};

module.exports = connectDB;