require("dotenv").config();
const razorpay = require("razorpay");

exports.instance = () => {
  return new razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
};
