const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db");

require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken");
router.get("/", function (req, res) {
  res.send("This is the route for user here all the users routes are defined");
});

const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

function getUniqueUserID() {
  return "User" + Math.floor(100000 + Math.random() * 900000);
}

router.post("/sign-up", async (req, res) => {
  const { first_name, last_name, email, phone_Number, password } = req.body;

  if (!first_name || !last_name || !email || !password || !phone_Number) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    });
  }

  // Check if email already exists in the database
  const checkEmailSql = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error("Failed to check email:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results[0].count > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password before inserting into the database
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        console.error("Failed to hash password:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      let userid = await getUniqueUserID();
      let User = {
        userid,
        first_name,
        last_name,
        email,
        phone_Number,
        password: hashedPassword,
      };

      const sql = "INSERT INTO users SET ?";
      db.query(sql, User, (err, result) => {
        if (err) {
          console.error("Failed to insert user:", err);
          return res.status(500).json({ error: "Failed to insert user" });
        }
        res.json({
          message: "User inserted successfully",
          id: result.insertId,
        });
      });
    });
  });
});

//sign-in
router.post("/sign-in", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Failed to select user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0]; // Correctly define user

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Failed to compare passwords:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token using the user object
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        message: "Login successful",
        token,
      });
    });
  });
});

//dashboard
router.get("/dashboard", authenticateToken, (req, res) => {
  const email = req.user.email;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    // Send both the user details and the email
    res.json({
      userDetails: result[0],
      message: ` ${email}`,
    });
  });
});

//order
function getOrderId() {
  return "Order" + Math.floor(100000 + Math.random() * 900000);
}

router.post("/buy-products", authenticateToken, (req, res) => {
  const { product_id, email, payment_method, price, product_qty } = req.body;

  if (!product_id || !email || !payment_method || !product_qty || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const order = {
    order_id: getOrderId(),
    email,
    product_id,
    payment_method,
    product_qty,
    price,
  };
  const getQty = "SELECT product_qty FROM product_data WHERE product_id = ?";
  const updateProduct = `
     UPDATE product_data 
  SET product_qty = ?, 
      product_sales = product_sales + 1 
  WHERE product_id = ?
     `;
  const sql = "INSERT INTO orders SET?";
  db.query(sql, order, (err, result) => {
    if (err) {
      console.error("Failed to insert order:", err);
      return res.status(500).json({ error: "Failed to insert order" });
    }
    db.query(getQty, [product_id], (err, result) => {
      if (err) return res.status(500).json({ message: "Server error" });
      const remaining_qty = result[0].product_qty - product_qty;
      db.query(updateProduct, [remaining_qty, product_id], (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Failed to update product quantity" });
        res.json({
          message: "Order inserted successfully",
          id: result.insertId,
        });
      });
    });
  });
});

router.get("/orders/:email", (req, res) => {
  const { email } = req.params;
  const sql =
    "SELECT * FROM `orders`  WHERE email =? ORDER BY `orders`.`order_added` DESC;";

  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.length === 0)
      return res.status(404).json({ message: "No orders found" });

    res.json({
      orders: result,
      message: `Orders for ${email}`,
    });
  });
});

router.post("/payment", authenticateToken, (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount, // amount in paise
    currency: "INR",
    receipt: "receipt#1",
    payment_capture: 1, // auto capture
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      console.error("Failed to create Razorpay order:", err);
      return res.status(500).json({ error: "Failed to create payment order" });
    }
    res.json(order);
    console.log(order);
    // Send order details back to client
  });
});

router.post("/create-order", authenticateToken, (req, res) => {
  const { product_id, email, payment_method, price, product_qty } = req.body;

  if (!product_id || !email || !payment_method || !product_qty || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const options = {
    amount: price * 100, // amount in paise
    currency: "INR",
    receipt: "receipt#1", // optional
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create order" });
    }
    res.json(order);
  });
});
router.post("/payment/verify", (req, res) => {
  const { razorpay_payment_id, order_id, signature } = req.body;

  // You can verify the signature and payment ID here
  const generatedSignature = crypto
    .createHmac("sha256", process.env.key_secret) // replace with your Razorpay secret
    .update(`${order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature === signature) {
    // Payment is verified
    res.json({ message: "Payment verified successfully" });
  } else {
    res.status(400).json({ error: "Payment verification failed" });
  }
});

module.exports = router;
