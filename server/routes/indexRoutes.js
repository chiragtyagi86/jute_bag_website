//initialized with the packacge here
const express = require("express");
const db = require("../config/db");
const router = express.Router();




router.get("/get-products", (req, res)=> {
  //here i want to get the products from the product_data 
  const sql = "SELECT * FROM product_data";
  db.query(sql, (err, rows)=>{
    if(err) throw err;
    //error handling
    if(rows.length === 0){
      res.json({message: "No products found"});
    } else{
      res.json(rows);
    }
    // console.log("products fetched successfully");
  })
  
});

//trending products
router.get("/trending-products", (req, res)=> {
  //here i want to get the trending products from the product_data 
  const sql = "SELECT * FROM product_data ORDER BY product_sales DESC LIMIT 10";
  db.query(sql, (err, rows)=>{
    if(err) throw err;
    // error handling
    if(rows.length === 0){
      res.json({message: "No trending products found"});
    } else{
      res.json(rows);
    }
    console.log("trending products fetched successfully");
  })
  
});

//searching products
router.get("/search-products/:query", (req, res)=> {
  const query = req.params.query;
  const sql = `SELECT * FROM product_data WHERE product_name LIKE '%${query}%'`;
  db.query(sql, (err, rows)=>{
    if(err) throw err;
    //error handling
    if(rows.length === 0){
      res.json({message: "No products found"});
    }else{
      res.json(rows);
    }
    console.log("products searched successfully");
    // res.json(rows);

  })
  
});

// router.get('/search-products', (req, res) => {
//   const searchQuery = req.query.q; // Get search query from the URL

//   if (!searchQuery) {
//     return res.status(400).json({ message: 'Search query is required' });
//   }

//   const sql = 'SELECT * FROM products WHERE product_name LIKE ?'; // Adjust table name as needed
//   db.query(sql, [`%${searchQuery}%`], (error, results) => {
//     if (error) {
//       console.error('Query error:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//     res.json(results);
//   });
// });


// latest product by date
router.get("/latest-product", (req, res)=> {
  const sql = "SELECT * FROM product_data ORDER BY date_added DESC LIMIT 2";
  db.query(sql, (err, rows)=>{
    if(err) throw err;
    // error handling
    if(rows.length === 0){
      res.json({message: "No latest product found"});
    } else{
      res.json(rows[0]);
    }
    console.log("latest product fetched successfully");
  })
  
});


module.exports = router;
