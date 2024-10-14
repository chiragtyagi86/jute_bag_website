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
const ensureAuthenticated = require('../middleware/AuthenticateUserToken');



router.use(express.json());
router.use(cors());

router.get("/",ensureAuthenticated,(req, res) => {
    console.log('Logging user details:',req.user);
    res.status(200).json([{
        name:"bag1",
        price:'1000'
    },{
        name:"bag1",
        price:'1000'
    }]);
    // res.sendFile(path.join(__dirname, '..', '..', 'html', 'product.html'));
});



module.exports = router