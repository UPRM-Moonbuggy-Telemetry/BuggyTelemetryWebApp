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
          strain_front_lft_1 INT, strain_front_lft_2 INT, strain_front_lft_3 INT,
          strain_front_rt_1 INT, strain_front_rt_2 INT, strain_front_rt_3 INT,
          strain_center_1 INT, strain_center_2 INT, strain_center_3 INT,
          vibration_front_lft INT, vibration_front_rt INT, vibration_rear_lft INT,
          vibration_rear_rt INT, vibration_center INT,
          battery_status INT, latitude DOUBLE, longitude DOUBLE,
          GSC_time VARCHAR(10), GSC_date VARCHAR(12), OBC_time VARCHAR(10),
          OBC_date VARCHAR(12))`;

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
          strain_front_lft_1 INT, strain_front_lft_2 INT, strain_front_lft_3 INT,
          strain_front_rt_1 INT, strain_front_rt_2 INT, strain_front_rt_3 INT,
          strain_center_1 INT, strain_center_2 INT, strain_center_3 INT,
          vibration_front_lft INT, vibration_front_rt INT, vibration_rear_lft INT,
          vibration_rear_rt INT, vibration_center INT,
          battery_status INT, latitude DOUBLE, longitude DOUBLE,
          GSC_time VARCHAR(10), GSC_date VARCHAR(12), OBC_time VARCHAR(10),
          OBC_date VARCHAR(12))`;

  pool.query(queryText, function (error, results, fields) {
    if(error){
      throw error;
      pool.end();
    }
    console.log("Table created succesfully.")
    pool.end();
  });
}

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

/**
 * This function create both tables, is assumed that they don't exist
 *
 * Note: If you don't want to create both tables, you can run
 * createTableNewBuggy or createTableOldBuggy only
 */
const create = () => {
  createTableNewBuggy();
  createTableOldBuggy();
}

/**
 * If necessary, this function delete the tables.
 * pre: Tables must exist before using this function
 */
const drop = () => {
  dropTableNewBuggy();
  dropTableOldBuggy();
}

/**
 * This function deletes the existing tables and create new tables.
 *
 * pre: This is a utility function for dropping and creating again the
 * tables.
 */
const reset = () => {
  dropTableNewBuggy();
  dropTableOldBuggy();
  createTableNewBuggy();
  createTableOldBuggy();
}

module.exports = {
  pool,
  create,
  reset,
  drop,
};

/**
  Necessary module to run functions in command line.
  Steps in the command line:
    1. cd <your proyect path>/Buggy7thGenTelemetry/src/api/models
    2. node dataModel <type here the function you want to run>
 */
require('make-runnable');
