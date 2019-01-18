var mysql = require('mysql');
var pool = mysql.createPool({
  user: "root",
  host: "localhost",
  database: "buggy_db",
  password: "root",
  port: "3306"
});

pool.on('connection', () => {
  console.log('Connected to the data base.');
});

/**
 * This function creates the table with the specified parameters
 */
const createTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      SensorData (id INT AUTO_INCREMENT PRIMARY KEY,
      strain INT, vibracion INT)`;
  pool.query(queryText, function (error, results, fields) {
    if(error){
      throw error;
      pool.end();
    }
    console.log("Table created succesfully.")
    pool.end();
  });
}

/**
 * If necessary run this function to delete table
 */
const dropTable = () => {
  const queryText = 'DROP TABLE IF EXISTS SensorData';
  pool.query(queryText, function (error, results, fields) {
    if(error){
      throw error;
      pool.end();
    }
    console.log("Table droped succesfully.")
    pool.end();
  });
}

module.exports = {
  pool,
  createTable,
  dropTable
};

/**
  Necessary module to run createTable and dropTable in command line.
  Steps in the command line:
    1. cd <your proyect path>/Buggy7thGenTelemetry/src/api/models
    2. node dataModel <type here the function you want to run>
 */
require('make-runnable');
