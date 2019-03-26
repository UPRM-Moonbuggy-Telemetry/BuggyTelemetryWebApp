const mysql = require('mysql');
const pool = mysql.createPool({
  user: "root",
  host: "localhost",
  database: "buggy_db",
  password: "1234",
  port: "3306"
});

pool.on('connection', () => {
  console.log('Connected to the data base.');
});

/**
 * This function creates the table with the specified parameters
 */
const createTableNewBuggy = () => {
  const queryText = `CREATE TABLE
          NewBuggy (id INT AUTO_INCREMENT PRIMARY KEY,
          strain_sensor_1 INT, strain_sensor_2 INT, strain_sensor_3 INT,
          strain_sensor_4 INT, vibration_sensor_1 INT, vibration_sensor_2 INT,
          vibration_sensor_3 INT, vibration_sensor_4 INT, vibration_sensor_5 INT,
          battery_status INT, latitude DOUBLE, longitude DOUBLE,
          GSC_time VARCHAR(10), GSC_date VARCHAR(12), OBC_time VARCHAR(10),
          OBC_date VARCHAR(12))`;

      //To-DO : Add humedad, temp

  pool.query(queryText, function (error, results, fields) {
    if(error){
      throw error;
      pool.end();
    }
    console.log("Table created succesfully.")
    pool.end();
  });
}

const createTableOldBuggy = () => {
  const queryText = `CREATE TABLE
          OldBuggy (id INT AUTO_INCREMENT PRIMARY KEY,
          strain_sensor_1 INT, strain_sensor_2 INT, strain_sensor_3 INT,
          strain_sensor_4 INT, vibration_sensor_1 INT, vibration_sensor_2 INT,
          vibration_sensor_3 INT, vibration_sensor_4 INT, vibration_sensor_5 INT,
          battery_status INT, latitude DOUBLE, longitude DOUBLE,
          GSC_time VARCHAR(10), GSC_date VARCHAR(12), OBC_time VARCHAR(10),
          OBC_date VARCHAR(12))`;

      //To-DO : Add humedad, temp

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
 * If necessary run this functions to delete tables
 */
const dropTableNewBuggy = () => {
  const queryText = 'DROP TABLE IF EXISTS NewBuggy';
  pool.query(queryText, function (error, results, fields) {
    if(error){
      throw error;
      pool.end();
    }
    console.log("Table droped succesfully.")
    pool.end();
  });
}

const dropTableOldBuggy = () => {
  const queryText = 'DROP TABLE IF EXISTS OldBuggy';
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
  createTableNewBuggy,
  createTableOldBuggy,
  dropTableNewBuggy,
  dropTableOldBuggy
};

/**
  Necessary module to run createTable and dropTable in command line.
  Steps in the command line:
    1. cd <your proyect path>/Buggy7thGenTelemetry/src/api/models
    2. node dataModel <type here the function you want to run>
 */
require('make-runnable');
