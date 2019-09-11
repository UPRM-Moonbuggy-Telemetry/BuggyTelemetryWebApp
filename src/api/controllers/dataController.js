const db = require('../models/dataModel.js').pool;
const _ = require('lodash');

/**
  Gets all the rows from the Data Base
**/
exports.getAll = function(req, res) {
  const table = req.params['table']; // Respective Buggy table

  //query the DB using prepared statement
  const queryText = 'SELECT * from '+ table;
  const results = db.query(queryText, function (error, results, fields) {
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

/**
  Get the last 30 values or less from the Data Base, the outer query
  gets the number of rows and the inner query gets the data.
**/
exports.getLastValues = function(req, res) {
  const table = req.params['table'];
  const rowsNumQuery = `SELECT COUNT(*) As count FROM `+ table;

  //Outer query
  const results = db.query(rowsNumQuery,function (error, result) {

      if (error) {
        res.status(404).send(req.body);
      }

      var json = JSON.stringify(result);
      json =  JSON.parse(json);
      var rowsNum = json[0].count;

      //If the DB have >30 rows we choose the first 30's
      if (rowsNum>30){
        rowsNum = 30;
      }

      const queryText = `SELECT * from (SELECT * FROM `+table+` ORDER BY id
        DESC LIMIT `+String(rowsNum)+`) sub`;

      //Inner query
      const rslt = db.query(queryText, function (error, results, fields) {
        if (error) {
          res.status(404).send(req.body);
        }

        var resultJson = JSON.stringify(results);
        resultJson = JSON.parse(resultJson);

        res.send(resultJson);
      });
  });
};

/**
  This function adds new rows to the Data Base
**/
exports.addData = function(req, res) {
  const table = req.params['table']; // Respective Buggy table

  const queryText = `INSERT INTO `+ table + ` (strain_front_lft_1, strain_front_lft_2,
  strain_front_lft_3, strain_front_rt_1, strain_front_rt_2, strain_front_rt_3, strain_center_1,
  strain_center_2, strain_center_3, vibration_front_lft, vibration_front_rt,
  vibration_rear_lft, vibration_rear_rt, vibration_center, battery_status,
  latitude, longitude, GSC_time, GSC_date, OBC_time, OBC_date) VALUES ?`;

  var values = [];
  var dt =  new Date();
  var time = dt.toTimeString().substring(0,8);
  var month = parseInt(dt.getMonth())+1;
  var date = dt.getFullYear()+"-"+month.toString()+"-"+dt.getDate();

  _.forEach(req.body, function(value) {
    values.push([value.strain_front_lft_1, value.strain_front_lft_2,
      value.strain_front_lft_3,value.strain_front_rt_1, value.strain_front_rt_2,
      value.strain_front_rt_3, value.strain_center_1, value.strain_center_2,
      value.strain_center_3, value.vibration_front_lft, value.vibration_front_rt,
      value.vibration_rear_lft,value.vibration_rear_rt, value.vibration_center,
      value.battery_status, value.latitude, value.longitude, time, date,
      value.OBC_time, value.OBC_date]);
  });

  db.query(queryText, [values], function (err, result) {
    if (err) res.status(500).send(req.body);
    console.log("Number of records inserted: " + result.affectedRows);
  });
  res.status(201).send(req.body);
};

/**
  This function gets a specific row from the Data Base
**/
exports.getId = function(req, res) {
  const paramId = req.params['id'];
  const table = req.params['table']; // Respective Buggy table

  const queryText = 'SELECT * FROM '+ table +' WHERE id = ?';
  db.query(queryText, [paramId], function (err, result) {
    if (err) res.status(404).send(req.body);

    //make results
    var resultJson = JSON.stringify(result);
    resultJson = JSON.parse(resultJson);

    //send JSON to Express
    res.send(resultJson);
  });
};

/**
  This function updates a specific row from the Data Base
**/
exports.updateId = function(req, res){
  const paramId = req.params['id'];
  const table = req.params['table'];// Respective Buggy table

  const queryText = `UPDATE `+ table +` SET strain_front_lft_1 = ?, strain_front_lft_2 = ?,
  strain_front_lft_3 = ?, strain_front_rt_1 = ?,  strain_front_rt_2 = ?, strain_front_rt_3 = ?,
  strain_center_1 = ?, strain_center_2 = ?, strain_center_3 = ?, vibration_front_lft = ?,
  vibration_front_rt = ?, vibration_rear_lft = ?, vibration_rear_rt = ?,
  vibration_center = ?, battery_status = ?, latitude = ?, longitude = ?,
  GSC_time = ?, GSC_date = ?, OBC_time = ?, OBC_date = ? WHERE id = ?`;

  db.query(queryText, [req.body.strain_front_lft_1, req.body.strain_front_lft_2,
      req.body.strain_front_lft_3, req.body.strain_front_rt_1, req.body.strain_front_rt_2,
      req.body.strain_front_rt_3, req.body.strain_center_1, req.body.strain_center_2,
      req.body.strain_center_3, req.body.vibration_front_lft, req.body.vibration_front_rt,
      req.body.vibration_rear_lft, req.body.vibration_rear_rt, req.body.vibration_center,
      req.body.battery_status, req.body.latitude, req.body.longitude,req.body.GSC_time,
      req.body.GSC_date, req.body.OBC_time, req.body.OBC_date, paramId],
  function (err, result) {

    if (err) res.status(406).send(req.body);

    console.log(result.affectedRows + " record(s) updated");
    res.status(200).send(req.body);
  });
};

/**
  This function removes a specific row from the Data Base
**/
exports.removeId = function(req, res){
  const paramId = req.params['id'];
  const table = req.params['table']; // Respective Buggy or Data table

  const queryText = "DELETE FROM "+ table +" WHERE id = ?";
  db.query(queryText, [paramId], function (err, result) {
    if (err) res.sendStatus(404);

    console.log("Number of records deleted: " + result.affectedRows);
    res.sendStatus(204);
  });
};
