const express = require('express');
const mysql = require('mysql');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const server = express();
const port = 3000;

server.use(express.json());
server.set('viewengine', 'pug');

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jutebag',
});
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database.");
    connection.release(); // Release the connection back to the pool
  }
});

server.get("/", (req, res) => {
  res.send("Welcome to the API!");

});

server.use("/", indexRoutes);
server.use("/", userRoutes);


server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});