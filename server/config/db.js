// db.js
require('dotenv').config();
const mysql = require('mysql');

let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3307,
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds if there is an error
    } else {
      console.log('Connected to the database as ID', connection.threadId);
    }
  });

  connection.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Database connection lost. Reconnecting...');
      handleDisconnect(); // Reconnect on connection loss
    } else {
      throw err;
    }
  });
}

// Call handleDisconnect to initialize connection
handleDisconnect();

// Keep the connection alive by pinging MySQL at regular intervals
setInterval(() => {
  connection.query('SELECT 1', (err) => {
    if (err) {
      console.error('Error keeping the connection alive:', err);
    }
  });
}, 5000); // Ping every 5 seconds to keep the connection active

module.exports = connection;
