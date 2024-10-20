const express = require('express');
const router = express.Router();
//all routes will be defined here
router.get('/', function(req, res) {
    res.send('This is the route for user here all the users routes are defined');
});
module.exports = router;