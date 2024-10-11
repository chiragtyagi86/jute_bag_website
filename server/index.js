const express = require('express');
const indexRoutes = require('./routes/indexRoutes');
const adminRoutes = require('./routes/adminRoutes');
const server = express();
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
server.use(express.json());

server.use(bodyParser.json());
const port = 3000;
server.use(express.static(path.join(__dirname, "public")));
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.use(express.static("views"));


server.use(express.json());
server.use(cors({ origin: "http://127.0.0.1:5501" }));


server.get("/", (req, res) => {
    res.send("Welcome to the API!");
});
//handle routes here 

server.use("/", indexRoutes);
server.use("/admin", adminRoutes);
server.use('/uploads', express.static('uploads'));


server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});