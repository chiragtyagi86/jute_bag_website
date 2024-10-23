const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/get-products", (req, res) => {
  const sql = "SELECT * FROM product_data";
  db.query(sql, (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.json({ message: "No products found" });
    } else {
      res.json(rows);
    }
  });
});

//trending products
router.get("/trending-products", (req, res) => {
  const sql = "SELECT * FROM product_data ORDER BY product_sales DESC LIMIT 3";
  db.query(sql, (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.json({ message: "No trending products found" });
    } else {
      res.json(rows);
    }
  });
});

//searching products
router.get("/search-products/:query", (req, res) => {
  const query = req.params.query;
  const sql = `SELECT * FROM product_data WHERE product_name LIKE '%${query}%'`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.json({ message: "No products found" });
    } else {
      res.json(rows);
    }
  });
});

// latest product by date
router.get("/latest-product", (req, res) => {
  const sql = "SELECT * FROM product_data ORDER BY date_added DESC LIMIT 2";
  db.query(sql, (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.json({ message: "No latest product found" });
    } else {
      res.json(rows);
    }
  });
});

//random products display
router.get("/random-products", (req, res) => {
  const sql = "SELECT * FROM product_data ORDER BY RAND() LIMIT 4";
  db.query(sql, (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.json({ message: "No random products found" });
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
