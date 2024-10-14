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
const { signupValidation, loginValidation } = require('../middleware/verifyUser');



router.use(express.json());
router.use(cors());




async function generateId(required_length) {
    return new Promise((resolve) => {
        let result = '';
        const characters = '0123456789abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < required_length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setTimeout(() => {
            resolve(result);
        }, 0);

    });
}

async function checkIdExists(id, tablename, column_name) {
    const query = `SELECT COUNT(*) AS count FROM ${tablename} WHERE ${column_name} = ?`;
    try {
        const [result] = await dbQuery(query, [id]);
        return result.count > 0;
    } catch (error) {
        console.error("Database query failed", error);
        throw error;
    }
}

async function generateUniqueId(length, tablename, column_name) {
    let id;
    do {
        id = await generateId(length);
    } while (await checkIdExists(id, tablename, column_name)); // Regenerate if ID exists
    return id;
}



router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'html', 'sign-up.html'));
});

router.post("/signup", signupValidation, async (req, res) => {
    try {
        const { first_name, last_name, email, password, password_confirmation, marketing_accept } = req.body;
        const check_query = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
        const [rows] = await db.promise().query(check_query, [email]);
        const count = rows[0].count;
        if (count > 0) {
            return res.status(409).json({ message: 'User already exists with this email, you can login', success: false });
        }
        if (password_confirmation !== password) {
            return res.status(400).json({ message: 'Passwords do not match', success: false });
        }
        const uniqueId = await generateUniqueId(20, 'users', 'userid');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log([uniqueId, email, hashedPassword, first_name, last_name, marketing_accept ? 1 : 0]);
        const insert_query = 'INSERT INTO users (userid, email, password, first_name, last_name, marketing_accept) VALUES (?, ?, ?, ?, ?, ?)';
        await db.promise().query(insert_query, [uniqueId, email, hashedPassword, first_name, last_name, marketing_accept ? 1 : 0]);
        res.status(201).json({
            message: 'Signup successful',
            success: true,
            redirectUrl: '/user/signin'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Database error occurred' });
    }
});

router.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'html', 'sign-in.html'));
});

router.post("/signin", loginValidation, (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(403).json({ error: 'Email and password are required', success: false });
    }
    const find_query = 'SELECT * FROM users WHERE email = ?';
    db.query(find_query, [email], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Database error occurred', success: false });
        }

        if (results.length === 0) {
            return res.status(403).json({ message: 'User does not exist with this email', success: false });
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (compareErr, isPassEqual) => {
            if (compareErr) {
                return res.status(500).json({ error: 'Error comparing passwords', success: false });
            }
            if (!isPassEqual) {
                return res.status(403).json({ error: 'Incorrect Password', success: false });
            }
            const jwtToken = jwt.sign(
                { id: user.userid, email: user.email,first_name: user.first_name, last_name: user.last_},
                secretKey,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Signin successful',
                success: true,
                jwtToken,
                email,
                name: user.first_name,
                redirectUrl: '/product'
            });
        });
    });
});

router.get("/logout", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'html', 'logout.html'));
});



module.exports = router