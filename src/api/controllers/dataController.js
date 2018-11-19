const db = require('../models/dataModel.js');
const _ = require('lodash');

//reads all values from DB
exports.getAll = function(req, res) {
  //query the DB using prepared statement
  var results = db.query('SELECT * from sensorData', function (error, results, fields) {
    //if error, print blank results
    if (error) {
      res.send(404, req.body);
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
  var sql = "INSERT INTO sensorData (strain, vibracion) VALUES ?";
  var values = [];

  _.forEach(req.body, function(value) {
    values.push([value.strain, value.vibracion]);
  });

  db.query(sql, [values], function (err, result) {
    if (err) res.send(500, req.body);
    console.log("Number of records inserted: " + result.affectedRows);
  });
  res.send(201, req.body);
};

//gets specific row from DB
exports.getId = function(req, res) {
  const paramId = req.params['id'];

  var sql = 'SELECT * FROM sensorData WHERE id = ?';
  db.query(sql, [paramId], function (err, result) {
    if (err) res.send(404, req.body);

    //make results
    var resultJson = JSON.stringify(results);
    resultJson = JSON.parse(resultJson);

    //send JSON to Express
    res.send(resultJson);
  });
};

//updates specific row from DB
exports.updateId = function(req, res){
  const paramId = req.params['id'];

  var sql = "UPDATE sensorData SET strain = ?, vibracion = ? WHERE id = ?";
  db.query(sql, [req.body.strain, req.body.vibracion, paramId],  function (err, result) {
    if (err) res.send(406, req.body);

    console.log(result.affectedRows + " record(s) updated");
    res.send(200, req.body);
  });
};

//removes row from DB
exports.removeId = function(req, res){
  const paramId = req.params['id'];

  var sql = "DELETE FROM sensorData WHERE id = ?";
  db.query(sql, [paramId], function (err, result) {
    if (err) res.sendStatus(404);

    console.log("Number of records deleted: " + result.affectedRows);
    res.sendStatus(204);
  });
};
