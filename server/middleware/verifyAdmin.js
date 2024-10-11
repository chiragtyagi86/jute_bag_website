const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }

        // Check if the user has the admin role
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // If the user is an admin, proceed to the next middleware
        next();
    });
};

module.exports = verifyAdmin;