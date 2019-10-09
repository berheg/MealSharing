//function returns sql query for returning all rows in the given table
function getAllRows(table){
    const sql =  `SELECT * FROM ${table}`;
    return sql; 
  };
  //function returns sql query for updating one value of given property in a row in a table
function updateRowById(table,id,columnName,value){
    const sql = `update ${table} set ${columnName} = '${value}' where id = ${id}` ;
    return sql; 
  };
  //function returns sql query for returning one row in a table
function getRowById(table,id){
    const sql = `Select * from ${table} where id = ${id}`;
    return sql;
  };
  //function returns sql query for deleting one row in a table
function deleteRowById(table,id){
    const sql = `DELETE from ${table} where id = ${id}`;
    return sql;
  };
  //Here goes the router
module.exports = {getAllRows,updateRowById,getRowById,deleteRowById};