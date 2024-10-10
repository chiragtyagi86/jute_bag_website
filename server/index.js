const express = require('express');
const indexRoutes = require('./routes/indexRoutes');
const server = express();
const port = 3000;


server.use(express.json());


server.get("/", (req, res) => {
    res.send("Welcome to the API!");
});
//handle routes here 

server.use("/", indexRoutes);


server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});