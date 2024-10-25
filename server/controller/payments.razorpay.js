const { instance } = require("../config/razorpay");
require('dotenv').config();


const razorpay_instance = instance();

exports.createOrder = async (req, res) => {
  const options = {
    amount: price * 100,
    currency: "INR",
    receipt: "receipt_order_1",
  };
  try {
    razorpay_instance.orders.create(options, (err, order) => {
        if (err) {
          return res.status(500).json({
            success: false,
            messege: "Failed to create order",
          });
        }
        return res.json({
          success: true,
          order,
        });
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      messege: "something went wrong",
    });
  }
};

exports.verifyPayment = async (req, res) => {
const {order_id,payment_id, signature} = req.body;
const secret = process.env.key_secret;
//create hmac object
const hmac = crypto.createHmac('sha256', secret);
//add order_id and payment_id
hmac.update(`${order_id}|${payment_id}`);
//get the signature from the request
const generatedSignature = hmac.digest('hex');

if(signature === generatedSignature){
  return res.json({
    success: true,
    message: "Payment successful",
  });
} else {
  return res.status(403).json({
    success: false,
    message: "Invalid signature",
  });
}

}