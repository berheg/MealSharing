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
//function returns sql query for adding new meal row in mealsharing database
const addNewMeal = function(meal) {
  const sql = `insert into meal ` +
              `(title, description, location, when, max_reservations, price, created_date) ` +
              `values('${meal.title}', '${meal.description}', '${meal.location}','${meal.when}',${meal.max_reservations},${meal.price},'${meal.created_date}')` ;
 return sql;
};

//returns all rows of the given table
router.get("/", (request, response) => {
  const maxPrice = request.query.maxPrice;
  const availableReservations = request.query.availableReservations;
  const title = request.query.title;
  const createdAfter = request.query.createdAfter;
  const limit = request.query.limit;
  console.log(request.url);
  console.log(availableReservations);
  console.log(limit);
  if(maxPrice!== undefined){
    const sql =`select * from meal where price < ${maxPrice}`;
    pool.query(sql, function(err, results, fields) {
      if(err){
        console.error(err);
        return;
      }
      response.json(results);
      //maxPriceResults = results;
    });
  }
  else if(availableReservations!==undefined){
    const sql = `select meal.id,meal.title, Meal.max_reservations as max_reservations ,` +
    `sum(reservation.number_of_guests) as totalGuests from meal` +
    ` inner join reservation on reservation.meal_id = meal.id ` +
    `group by meal.id` +
    ` having totalGuests < meal.max_reservations`;
    pool.query(sql, function(err, results, fields) {
      if(err){
        console.error(err);
        return;
      }
      //console.log(results);
      response.json(results);
      });
  }
  else if(title !== undefined){
    const sql = `SELECT * FROM meal WHERE meal.title like '%${title}%'`;
    pool.query(sql, function(err, results, fields) {
      if(err){
        console.error(err);
        return;
      }
      response.json(results);
    });
  }
  else if(createdAfter !== undefined){
    const sql = `select * from meal where created_date > ${createdAfter}`;
    pool.query(sql, function(err, results, fields) {
      if(err){
        console.error(err);
        return;
      }
      response.json(results);
    });
  }
  else if(limit !== undefined){
    const sql = `select * from meal limit ${limit}`;
    pool.query(sql, function(err, results, fields) {
      if(err){
        console.error(err);
        return;
      }
      console.log('Data fetched at limit!');
      response.json(results);
    });

  }
  else{
    pool.query(sqlFunction.getAllRows('meal'), function(err, results, fields) {
      if(err){
        console.error(err);
        return;
      }
      response.json(results);
    });
  }
  console.log('Data fetched!')
});
//add new row in the given table
router.post("/", (request, response) => {
  const meal = request.body;
  pool.query(addNewMeal(meal), function(err, results, fields) {
    if(err){
      console.error(err);
      return;
  }
    response.json(results);
  });
});
//returns row with the given id and table
router.get("/meal/:id", (request, response) => {
  const mealId = request.params.id;
  pool.query(sqlFunction.getRowById('meal',mealId), function(err, results, fields) {
    if(err){
      console.error(err);
      return;
  }
    response.json(results);
  });
});
//update row with given id in the given table and properties
router.put("/:id", (request, response) => {
  const mealId = request.params.id;
  const columnName = request.body.columnName;
  const value = request.body.value;
  pool.query(sqlFunction.updateRowById('meal',mealId,columnName,value), function(err, results, fields) {
    if(err){
      console.error(err);
      return;
  }
    response.send(`The row with id of ${mealId} is updated!`);
  });
});
//delete row with given id in the given table
router.delete("/:id", (request, response) => {
  const mealId = request.params.id;
  pool.query(sqlFunction.deleteRowById('meal',mealId), function(err, results, fields) {
    if(err){
      console.error(err);
      return;
  }
    response.send(`The row with id of ${mealId} is successfully deleted!`);
  });
});
//Here goes the router
module.exports = router;
