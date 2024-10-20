const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;
const db = require("../config/db");
const authenticateToken = require("../middleware/authenticateToken");


router.use(express.json());
router.use(cors());

router.post("/view",(req, res) => {
    const { userid } = req.body;
    console.log(userid,'is viewing the cart');

    if (!userid) {
        return res.status(400).json({ error: "User ID is required" });
    }
    const query = `
      SELECT c.product_id, c.quantity, c.date_added, p.product_name, p.product_price,p.product_img FROM cart c JOIN product_data p ON c.product_id = p.product_id WHERE c.user_id = ?;
    `;
    db.query(query, [userid], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching cart items' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'No items in the cart' });
        }

        // Send the cart items back to the client
        res.status(200).json({
            message: 'Cart items retrieved successfully',
            cart: result
        });
    });
});


router.post("/add", (req, res) => {
    const {userid, product_id, quantity } = req.body; 
    console.log(userid,'is adding', quantity,'of',product_id,'in cart');
    if (!userid || !product_id || !quantity) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const checkQuery = 'SELECT * FROM cart WHERE user_id = ? AND product_id = ?';
    db.query(checkQuery, [userid, product_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error checking cart' });
        }

        const date = new Date();

        if (result.length > 0) {
            // Product already in cart, update the quantity and last_modified
            const updateQuery = 'UPDATE cart SET quantity = quantity + ?, last_modified = ? WHERE user_id = ? AND product_id = ?';
            db.query(updateQuery, [quantity, date, userid, product_id], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error updating cart' });
                }
                res.status(200).json({ message: 'Cart updated successfully' });
            });
        }else {
            // Product not in cart, insert a new row
            const insertQuery = 'INSERT INTO cart (user_id, product_id, quantity, date_added, last_modified) VALUES (?, ?, ?, ?, ?)';
            db.query(insertQuery, [userid, product_id, quantity, date, date], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error adding to cart' });
                }
                res.status(200).json({ message: 'Product added to cart successfully' });
            });
        }
    });
});

router.post("/remove", (req, res) => {
    const { userid, product_id, quantity} = req.body;
    console.log(userid,'is removing all', quantity,'of',product_id,'from cart');

    if (!userid || !product_id || !quantity) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const checkQuery = 'SELECT * FROM cart WHERE user_id = ? AND product_id = ?';
    db.query(checkQuery, [userid, product_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error checking cart' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        const currentQuantity = result[0].quantity;

        if (currentQuantity <= quantity) {
            // If the current quantity is less than or equal to the quantity to be removed, delete the product from the cart
            const deleteQuery = 'DELETE FROM cart WHERE user_id = ? AND product_id = ?';
            db.query(deleteQuery, [userid, product_id], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error deleting product from cart' });
                }
                res.status(200).json({ message: 'Product removed from cart' });
            });
        } else {
            // Otherwise, reduce the quantity by the specified amount
            const updateQuery = 'UPDATE cart SET quantity = quantity - ?, last_modified = NOW() WHERE user_id = ? AND product_id = ?';
            db.query(updateQuery, [quantity, userid, product_id], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error updating cart' });
                }
                res.status(200).json({ message: 'Cart updated successfully' });
            });
        }
    });
});

router.post("/update", (req, res) => {
    const { userid, product_id, quantity } = req.body;
    console.log(userid,'is updating', quantity,'quantity of',product_id,'in cart');
    // Check if all required fields are provided
    if (!userid || !product_id || !quantity) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const checkQuery = 'SELECT * FROM cart WHERE user_id = ? AND product_id = ?';
    
    db.query(checkQuery, [userid, product_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error checking cart' });
        }

        // If product is not in cart
        if (result.length === 0) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Update the quantity
        const updateQuery = 'UPDATE cart SET quantity = ?, last_modified = NOW() WHERE user_id = ? AND product_id = ?';
        db.query(updateQuery, [quantity, userid, product_id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error updating cart' });
            }

            res.status(200).json({ message: 'Cart updated successfully' });
        });
    });
});




module.exports = router