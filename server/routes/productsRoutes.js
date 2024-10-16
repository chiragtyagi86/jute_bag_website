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



router.use(express.json());
router.use(cors());





module.exports = router