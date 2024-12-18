const express = require('express');
const indexRoutes = require('./routes/indexRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const server = express();
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
server.use(express.json());
server.set('viewengine', 'pug');


server.use(bodyParser.json());
const port = process.env.PORT || 3000;
server.use(express.static(path.join(__dirname, "public")));
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.use(express.static("views"));


server.use(express.json());
server.use(cors({ origin: "http://127.0.0.1:5500" }));


server.get("/", (req, res) => {
    res.send("Welcome to the API!");
});
//handle routes here 

server.use("/", indexRoutes);
server.use("/admin", adminRoutes);
server.use("/user", userRoutes);
server.use("/cart", cartRoutes);
server.use('/uploads', express.static('uploads'));


server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});