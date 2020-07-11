const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require("./../database");
const sqlFunction = require('./sqlFunction.js');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
router.use(bodyParser());
//function returns sql query for adding new review row in mealsharing database
const addNewReview = function(review) {
  //const review = JSON.parse(review);
  const created_date = new Date().toISOString().split('T')[0];
  const sql = `insert into review ` +
              `(title, description, review_meal_id, stars,created_date) ` +
              `values('${review.title}', '${review.description}','${review.review_meal_id}', '${review.stars}','${created_date}')` ;
 return sql;
};

//returns all rows of the given table
router.get("/", (request, response) => {
    pool.query(sqlFunction.getAllRows('review'), function(err, results, fields) {
      if(err){
        console.error(err);
        return;
      }
      response.json(results);
    });
});
//add new row in the given table
router.post("/", (request, response) => {
  const review = request.body;
  pool.query(addNewReview(review), function(err, results, fields) {
    if(err){
      console.error(err);
      return;
  }
    response.json(results);
  });
});
//returns row with the given id and table
router.get("/:id", (request, response) => {
  const reviewId = request.params.id;
  pool.query(sqlFunction.getRowById('review',reviewId), function(err, results, fields) {
    if(err){
      console.error(err);
      return;
  }
    response.json(results);
  });
});
//update row with given id in the given table and properties
router.put("/:id", (request, response) => {
  const reviewId = request.params.id;
  const columnName = request.body.columnName;
  const value = request.body.value;
  pool.query(sqlFunction.updateRowById('review',reviewId,columnName,value), function(err, results, fields) {
    if(err){
      console.error(err);
      return;
  }
    response.send(`The row with id of ${reviewId} is updated!`);
  });
});
//delete row with given id in the given table
router.delete("/:id", (request, response) => {
  const reviewId = request.params.id;
  pool.query(sqlFunction.deleteRowById('review',reviewId), function(err, results, fields) {
    if(err){
      console.error(err);
      return;
  }
    response.send(`The row with id of ${reviewId} is successfully deleted!`);
  });
});
//Here goes the router
module.exports = router;
