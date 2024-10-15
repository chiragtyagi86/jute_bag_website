const express = require("express");
const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const bcrypt = require("bcrypt");
const { log } = require("console");

const router = express.Router();

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

router.post("/sign-up", (req, res) => {
  const { full_name, email, password } = req.body;

  if (!email || !password || !full_name) {
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

  function getAdminId() {
    return "Admin" + Math.floor(100000 + Math.random() * 900000);
  }
  // Check if email already exists in the database
  const checkEmailSql = "SELECT COUNT(*) AS count FROM admin WHERE email = ?";
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

      let User = {
        admin_ID: getAdminId(),
        name: full_name,
        email,
        password: hashedPassword,
      };

      const sql = "INSERT INTO admin SET ?";
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

function getProductId() {
  return "Product" + Math.floor(100000 + Math.random() * 900000);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

//
router.post(
  "/add-product",
  upload.fields([
    { name: "product_img", maxCount: 1 },
    { name: "product_media", maxCount: 5 },
  ]),
  (req, res) => {

    
    const {
      product_name,
      product_description,
      product_price,
      product_qty,
      product_discount,
      product_tax_class,
      product_status,
      product_tax_amount,
    } = req.body;

    // Validate inputs
    if (
      !product_name ||
      !product_description ||
      !product_price ||
      !product_qty ||
      !product_discount ||
      !product_tax_class ||
      !product_status ||
      !product_tax_amount
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check for product image
    if (!req.files.product_img) {
      return res.status(400).json({ error: "Product image is required" });
    }

    const productImgUrl = `http://localhost:3000/uploads/${req.files.product_img[0].filename}`;
    const productMediaUrls = req.files.product_media ? req.files.product_media.map(file => `http://localhost:3000/uploads/${file.filename}`) : [];
    const productMediaString = productMediaUrls.join(',');

  const productId = getProductId();
  const product_data = {
    product_id: productId,
    product_name,
    product_discription: product_description,
    product_price,
    product_qty,
    product_discount,
    product_tax_class,
    product_status,
    product_tax_amount,
    product_img: productImgUrl,
    product_media: productMediaString,
  }
  const sql = "INSERT INTO product_data SET?";
  db.query(sql, product_data, (err, result) => {
    if (err) {
      console.error("Failed to insert product:", err);
      return res.status(500).json({ error: "Failed to insert product" });
    }

    res.status(200).json({ message: "Product added successfully", id: productId });
  });

  }
);

// edit product
router.get("/product/:product_id", (req, res) => {
  const { product_id } = req.params;

  const sql = "SELECT * FROM product_data WHERE product_id =?";
  db.query(sql, [product_id], (err, results) => {
    if (err) {
      console.error("Failed to select product:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(results[0]);
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const sql = "SELECT * FROM admin WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Failed to select user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials " });
    }

    const user = results[0]; // Correctly define user

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Failed to compare passwords:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "Password is not matching" });
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
router.get("/get-products", authenticateToken, (req, res) => {
  const sql = "SELECT * FROM product_data";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Failed to select products:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json({ products: results });
  });
});
router.post("/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});
router.get("/dashboard", verifyAdmin, (req, res) => {
  res.json({ message: "admin" });
});

router.use("/", verifyAdmin);

module.exports = router;
