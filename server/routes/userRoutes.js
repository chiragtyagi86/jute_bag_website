const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db");

require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken");
const otpTemplate = require("../../client/email_templates/otpEmailTemplate");
const otp_forgot_password_template = require("../../client/email_templates/otp_forgot_password");
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.mail_id,
    pass: process.env.mail_password
  }
});

let otpStore = {};

router.get("/", function (req, res) {
  res.send("This is the route for user here all the users routes are defined");
});

const razorpay = new Razorpay({
  key_id: process.env.key_id, 
  key_secret: process.env.key_secret, 
});

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

async function getUniqueUserID() {
  let uniqueID;
  let isUnique = false;
  while (!isUnique) {
    uniqueID = "User" + Math.floor(100000 + Math.random() * 900000);
    const sql = "SELECT COUNT(*) AS count FROM users WHERE userid = ?";
    const result = await new Promise((resolve, reject) => {
      db.query(sql, [uniqueID], (err, results) => {
        if (err) return reject(err);
        resolve(results[0].count);
      });
    });
    if (result === 0) {
      isUnique = true;
    }
  }
  return uniqueID;
}

router.post("/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const currentDate = formatDate(new Date());
  const sql = "INSERT INTO notify_users (email, date_added) VALUES (?, ?)";
  db.query(sql, [email, currentDate], (err, result) => {
    if (err) {
      console.error("Failed to insert email:", err);
      return res.status(500).json({ error: "Failed to insert email" });
    }
    res.json({
      message: "Email inserted successfully",
      id: result.insertId,
    });
  });
});


router.post("/sign-up", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
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

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    otpStore[email] = { otp, expires: Date.now() + 300000 }; // Store OTP with a 5-minute expiration



    // Send OTP to user's email
    transporter.sendMail({
      from: 'abesit.darshil@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      html: otpTemplate(otp),
    }, (err, info) => {
      if (err) {
        console.error("Failed to send OTP:", err);
        return res.status(500).json({ error: "Failed to send OTP" });
      }

      res.json({ message: 'OTP sent to your email. Please verify to complete registration.' });
    });
  });
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp, first_name, last_name, phone_Number, password } = req.body;

  const storedOtp = otpStore[email];

  if (!storedOtp) {
    return res.status(400).json({ error: "No OTP requested or expired" });
  }

  if (Date.now() > storedOtp.expires) {
    delete otpStore[email]; // Remove expired OTP
    return res.status(400).json({ error: "OTP has expired" });
  }

  if (storedOtp.otp !== parseInt(otp, 10)) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  // Hash the password and insert the user
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
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
      delete otpStore[email]; // Clean up after successful registration
      res.json({
        message: "User registered successfully",
        id: result.insertId,
      });
    });
  } catch (err) {
    console.error("Failed to hash password:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
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


router.post("/profile", authenticateToken, (req, res) => {
  const { first_name, last_name, address, phone_Number, userid } = req.body;
  if (!first_name || !last_name || !address || !phone_Number) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const updateQuery = 'UPDATE users SET first_name = ?, last_name = ?, address = ?, phone_Number = ? WHERE userid = ?';
  db.query(updateQuery, [first_name, last_name, address, phone_Number, userid], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating profile' });
    }
    res.status(200).json({ message: 'Profile updated successfully' });
  });
});


router.post("/verify-password", authenticateToken, (req, res) => {
  const { currentPassword, userid } = req.body;

  if (!currentPassword) {
    return res.status(400).json({ error: "Current password is required" });
  }
  const sql = "SELECT password FROM users WHERE userid = ?";
  db.query(sql, [userid], (err, results) => {
    if (err) {
      console.error("Failed to retrieve user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = results[0];
    bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
      if (err) {
        console.error("Failed to compare passwords:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }

      res.json({ message: "Current password verified" });
    });
  });
});

router.post("/change-password", authenticateToken, (req, res) => {
  const { newPassword, userid } = req.body;
  if (!newPassword) {
    return res.status(400).json({ error: "New password is required" });
  }

  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({
      error:
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    });
  };

  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  const sql = "UPDATE users SET password = ? WHERE userid = ?";
  db.query(sql, [hashedPassword, userid], (err, results) => {
    if (err) {
      console.error("Failed to update password:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json({ message: "Password changed successfully" });
  });
});

router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = { otp, expires: Date.now() + 300000 };
  transporter.sendMail({
    from: 'abesit.darshil@gmail.com',
    to: email,
    subject: 'Your OTP for Password Reset',
    html: otp_forgot_password_template(otp),
  }, (err, info) => {
    if (err) {
      console.error("Failed to send OTP:", err);
      return res.status(500).json({ error: "Failed to send OTP" });
    }
    res.json({ message: 'OTP sent to your email. Please check to verify.', success: true });
  });
});

router.post("/verify-forgot-password-otp", (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otpStore[email];
  if (!storedOtp) {
    return res.status(400).json({ error: "No OTP requested or expired" });
  }
  if (Date.now() > storedOtp.expires) {
    delete otpStore[email];
    return res.status(400).json({ error: "OTP has expired" });
  }
  if (storedOtp.otp !== parseInt(otp, 10)) {
    return res.status(400).json({ error: "Invalid OTP" });
  }
  delete otpStore[email];
  res.json({ message: "OTP verified successfully", success: true });
});

router.post("/change-forgotten-password", (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ error: "Email and new password are required." });
  }
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({
      error: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
    });
  }
  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  const sql = "UPDATE users SET password = ? WHERE email = ?";
  db.query(sql, [hashedPassword, email], (err, results) => {
    if (err) {
      console.error("Failed to update password:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({ message: "Password changed successfully." });
  });
});

//order
async function getOrderId() {
  let uniqueOrderID;
  let isUnique = false;
  while (!isUnique) {
    uniqueOrderID = "Order" + Math.floor(100000 + Math.random() * 900000);
    const sql = "SELECT COUNT(*) AS count FROM orders WHERE order_id = ?";
    const result = await new Promise((resolve, reject) => {
      db.query(sql, [uniqueOrderID], (err, results) => {
        if (err) return reject(err);
        resolve(results[0].count);
      });
    });
    if (result === 0) {
      isUnique = true;
    }
  }
  return uniqueOrderID;
}
router.post("/buy-products", authenticateToken, async (req, res) => {
  const { product_id, email, payment_method, price, product_qty, custom_product_qty } = req.body;
  const quantity = product_qty || custom_product_qty; 

  if (!product_id || !email || !payment_method || !quantity || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const order = {
    order_id: await getOrderId(),
    email,
    product_id,
    payment_method,
    product_qty : quantity || product_qty,
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
      const remaining_qty = result[0].product_qty - product_qty ? product_qty : "0";
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

    // Send order details back to client
  });
});

router.post("/create-order", authenticateToken, (req, res) => {
  const { product_id, email, payment_method, price, product_qty, custom_product_qty } = req.body;


  // Assign the selected quantity to a variable
  const quantity = product_qty || custom_product_qty; // This will take product_qty if it's truthy, otherwise it will take custom_product_qty

  // Check if required fields are provided
  if (!product_id || !email || !payment_method || !price || !quantity) {
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

router.post("/payment/verify", authenticateToken, (req, res) => {
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

router.post("/order-details", authenticateToken, (req, res) => {
  const { order_id } = req.body;

  if (!order_id) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  const sql = "SELECT * FROM orders WHERE order_id =?";

  db.query(sql, [order_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.length === 0)
      return res.status(404).json({ message: "No order found" });

    res.json({
      order: result[0],
      message: `Order details for ${order_id}`,
    });
  });
})

// router.post("/refund", authenticateToken, (req, res) => {
//   const { order_id, email, refund_reason } = req.body;

//   if (!order_id || !email || !refund_reason) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const checkOrderID = "SELECT * FROM refund WHERE order_id = ?";
//   db.query(checkOrderID, [order_id], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "Server error" });
//     }

//     if (result.length > 0) {
//       return res.status(400).json({ error: "Refund request already submitted for this order" });
//     }

//     const refund_id = "Refund" + Math.floor(100000 + Math.random() * 900000);
//     const refundData = {
//       refund_id,
//       order_id,
//       email,
//       refund_reason,
//     };

//     const sql = "INSERT INTO refund SET ?";
//     db.query(sql, refundData, (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: "Server error here" });
//       }
//       res.json({ message: "Refund request submitted successfully", refund_id });
//     });
//   });
// });

router.post("/refund", authenticateToken, (req, res) => {
  const { order_id, email, refund_reason } = req.body;

  if (!order_id || !email || !refund_reason) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const checkOrderID = "SELECT * FROM refund WHERE order_id = ?";
  db.query(checkOrderID, [order_id], (err, result) => {
    if (err) {
      console.error("Error in checkOrderID query:", err); // Log error details
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ error: "Refund request already submitted for this order" });
    }

    const refund_id = "Refund" + Math.floor(100000 + Math.random() * 900000);
    const refundData = {
      refund_id,
      order_id,
      email,
      refund_reason,
    };

    const sql = "INSERT INTO refund SET ?";
    db.query(sql, refundData, (err, result) => {
      if (err) {
        console.error("Error in INSERT query:", err); // Log error details
        return res.status(500).json({ message: "Server error here" });
      }
      res.json({ message: "Refund request submitted successfully", refund_id });
    });
  });
});

router.post("/refund-data", authenticateToken, (req, res) => {
  let {email} = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  email = email.trim();
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  
  
  const sql = "SELECT * FROM `refund` WHERE `email` = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error in SELECT query:", err); // Log error details
      if (result.length === 0)
        return res.status(404).json({ message: "No orders found" });
      return res.status(500).json({ message: "Server error" });
    }
    res.json({ refunds: result });
  })
})


module.exports = router;
