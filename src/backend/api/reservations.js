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
//function returns sql query for adding new reservation row in mealsharing database
const addNewReservation = function(reservation) {
  const sql = `insert into reservation ` +
              `(number_of_guests, meal_id,created_date) ` +
              `values('${reservation.number_of_guests}', '${reservation.meal_id}','${reservation.created_date}')` ;     
 return sql;
};

//returns all rows of the given table
router.get("/", (request, response) => {  
    pool.query(sqlFunction.getAllRows('reservation'), function(err, results, fields) {
      if(err){
        console.error(err);
        return;
      }
      response.json(results);
    });  
});
//add new row in the given table
router.post("/", (request, response) => {
  const reservation = request.body;  
  pool.query(addNewReservation(reservation), function(err, results, fields) {
    if(err){
      console.error(err);
      return;
  }
    response.json(results);
  });
});
//returns row with the given id and table
router.get("/:id", (request, response) => {
  const reservationId = request.params.id;
  pool.query(sqlFunction.getRowById('reservation',reservationId), function(err, results, fields) {
    if(err){
      console.error(err);
      return;
  }
    response.json(results);    
  });
});
//update row with given id in the given table and properties
router.put("/:id", (request, response) => {
  const reservationId = request.params.id;
  const columnName = request.body.columnName;
  const value = request.body.value;
  pool.query(sqlFunction.updateRowById('reservation',reservationId,columnName,value), function(err, results, fields) {
    if(err){
      console.error(err);
      return;
  }
    response.send(`The row with id of ${reservationId} is updated!`);    
  });
});
//delete row with given id in the given table 
router.delete("/:id", (request, response) => {
  const reservationId = request.params.id;  
  pool.query(sqlFunction.deleteRowById('reservation',reservationId), function(err, results, fields) {
    if(err){
      console.error(err);
      return;
  }    
    response.send(`The row with id of ${reservationId} is successfully deleted!`);    
  });
});
//Here goes the router
module.exports = router;
