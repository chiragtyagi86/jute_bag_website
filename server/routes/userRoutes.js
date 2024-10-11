const express = require("express");
const router = express.Router();
const path = require('path');
const mysql = require("mysql");
const bcrypt = require("bcrypt");

router.use(express.json());

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jutebag',
});


router.get("/sign-up", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'html', 'sign-up.html'));
});

router.post("/sign-up", async (req, res) => {
    const { first_name, last_name, email, password, password_confirmation, marketing_accept } = req.body;

    // Check if password and password confirmation match
    if (password_confirmation !== password) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    console.log(req.body);  // Debugging: Check received data


    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds (you can adjust it)

        const query = `INSERT INTO users (email, password, first_name, last_name, marketing_accept)
        VALUES (?, ?, ?, ?, ?)`;

        console.log([email, hashedPassword, first_name, last_name, marketing_accept ? 1 : 0]);

        db.query(query, [email, hashedPassword, first_name, last_name, marketing_accept ? 1 : 0], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Database error occurred' });
            }
            console.log("Successfully inserted");
            res.json({ message: 'User successfully registered', result });
        });

    } catch (err) {
        console.log("Error hashing password:", err);
        res.status(500).json({ error: 'Password hashing failed' });
    }
});



router.get("/sign-in",(req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'html', 'sign-in.html'));
});

router.post("/sign-in", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // const db = mysql.createPool({
    //     connectionLimit: 10,
    //     host: 'localhost',
    //     user: 'root',
    //     password: '',
    //     database: 'jutebag',
    // });

    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Database error occurred' });
        }

        // Check if user exists
        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        try {
            // Compare provided password with hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            // Successful login
            // Instead of res.redirect, send a success message and redirect in frontend
            res.json({ 
                message: 'Login successful', 
                user: { email: user.email, first_name: user.first_name, last_name: user.last_name },
                redirectUrl: '/product' // Send redirect URL
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error comparing passwords' });
        }
    });
});

router.get("/product", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'html', 'product.html'));
});

module.exports = router
