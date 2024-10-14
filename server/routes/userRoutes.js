const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');


router.post("/signup", (req, res) => {
    const { first_name, last_name, email, password } = req.body;


    
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    // if (!emailRegex.test(email)) {
    //   return res.status(400).json({ error: "Invalid email format" });
    // }
  
    // if (!passwordRegex.test(password)) {
    //   return res.status(400).json({
    //     error:
    //       "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    //   });
    // }
  
    // Check if email already exists in the database
    // const checkEmailSql =
    //   "SELECT COUNT(*) AS count FROM customer_data WHERE email = ?";
    // db.query(checkEmailSql, [email], (err, results) => {
    //   if (err) {
    //     console.error("Failed to check email:", err);
    //     return res.status(500).json({ error: "Internal server error" });
    //   }
  
    //   if (results[0].count > 0) {
    //     return res.status(400).json({ error: "Email already exists" });
    //   }
  
    //   // Hash the password before inserting into the database
    //   bcrypt.hash(password, 10, async (err, hashedPassword) => {
    //     if (err) {
    //       console.error("Failed to hash password:", err);
    //       return res.status(500).json({ error: "Internal server error" });
    //     }
  

      
  
    //     const sql = "INSERT INTO customer_data SET ?";
    //     // db.query(sql, User, (err, result) => {
    //     //   if (err) {
    //     //     console.error("Failed to insert user:", err);
    //     //     return res.status(500).json({ error: "Failed to insert user" });
    //     //   }
    //     //   res.json({
    //     //     message: "User inserted successfully",
    //     //     id: result.insertId,
    //     //   });
    //     // });
    //   });
    // });
  });

module.exports = router;
