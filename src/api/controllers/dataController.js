const db = require('../models/dataModel.js').pool;
const _ = require('lodash');

//reads all values from DB
exports.getAll = function(req, res) {
  const table = req.params['table']; // Respective Buggy table

  //query the DB using prepared statement
  const queryText = 'SELECT * from '+ table;
  var results = db.query(queryText, function (error, results, fields) {
    //if error, print blank results
    if (error) {
      res.status(404).send(req.body);
    }

    //make results
    var resultJson = JSON.stringify(results);
    resultJson = JSON.parse(resultJson);

    //send JSON to Express
    res.send(resultJson);
  });
};

//adds a row to DB
exports.addData = function(req, res) {
  const table = req.params['table']; // Respective Buggy table
  
  var queryText = `INSERT INTO `+ table + ` (strain_sensor_1, strain_sensor_2,
  strain_sensor_3, strain_sensor_4, vibration_sensor_1, vibration_sensor_2,
  vibration_sensor_3, vibration_sensor_4, vibration_sensor_5, battery_status,
  latitude, longitude, GSC_time, GSC_date) VALUES ?`;

  var values = [];
  var dt =  new Date();
  var time = dt.toTimeString().substring(0,8);
  var date = dt.getFullYear()+"/"+dt.getMonth()+"/"+dt.getDate();

  _.forEach(req.body, function(value) {
    values.push([value.strain_sensor_1, value.strain_sensor_2,
    value.strain_sensor_3,value.strain_sensor_4,value.vibration_sensor_1,
    value.vibration_sensor_2,value.vibration_sensor_3,value.vibration_sensor_4,
    value.vibration_sensor_5, value.battery_status, value.latitude,
    value.longitude, time, date]);
  });

  db.query(queryText, [values], function (err, result) {
    if (err) res.status(500).send(req.body);
    console.log("Number of records inserted: " + result.affectedRows);
  });
  res.status(201).send(req.body);
};

//gets specific row from DB
exports.getId = function(req, res) {
  const paramId = req.params['id'];
  const table = req.params['table']; // Respective Buggy table

  var queryText = 'SELECT * FROM '+ table +' WHERE id = ?';
  db.query(queryText, [paramId], function (err, result) {
    if (err) res.status(404).send(req.body);

    //make results
    var resultJson = JSON.stringify(result);
    resultJson = JSON.parse(resultJson);

    //send JSON to Express
    res.send(resultJson);
  });
};

//updates specific row from DB
exports.updateId = function(req, res){
  const paramId = req.params['id'];
  const table = req.params['table'];// Respective Buggy table

  var queryText = `UPDATE `+ table +` SET strain_sensor_1 = ?, strain_sensor_2 = ?,
  strain_sensor_3 = ?, strain_sensor_4 = ?, vibration_sensor_1 = ?,
  vibration_sensor_2 = ?, vibration_sensor_3 = ?, vibration_sensor_4 = ?,
  vibration_sensor_5 = ?, battery_status = ?, latitude = ?, longitude = ?,
  GSC_time = ?, GSC_date = ? WHERE id = ?`;

  db.query(queryText, [req.body.strain_sensor_1, req.body.strain_sensor_2,
  req.body.strain_sensor_3, req.body.strain_sensor_4,req.body.vibration_sensor_1,
  req.body.vibration_sensor_2, req.body.vibration_sensor_3,
  req.body.vibration_sensor_4, req.body.vibration_sensor_5,
  req.body.battery_status, req.body.latitude, req.body.longitude,req.body.GSC_time,
  req.body.GSC_date, paramId], function (err, result) {

    if (err) res.status(406).send(req.body);

    console.log(result.affectedRows + " record(s) updated");
    res.status(200).send(req.body);
  });
};

//removes row from DB
exports.removeId = function(req, res){
  const paramId = req.params['id'];
  const table = req.params['table']; // Respective Buggy table

  var queryText = "DELETE FROM "+ table +" WHERE id = ?";
  db.query(queryText, [paramId], function (err, result) {
    if (err) res.sendStatus(404);

    console.log("Number of records deleted: " + result.affectedRows);
    res.sendStatus(204);
  });
};
