const db = require('../models/dataModel.js');
const _ = require('lodash');

//reads all values from DB
exports.getAll = function(req, res) {
  //query the DB using prepared statement
  var results = db.query('SELECT * from sensorData', function (error, results, fields) {
    //if error, print blank results
    if (error) {
      var apiResult = {};
      res.send(apiResult);
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
    if (err) req.send(500, req.body);
    console.log("Number of records inserted: " + result.affectedRows);
  });
  res.send(201, req.body);
};

//gets specific row from DB
exports.getId = function(req, res) {
  const requestedName = req.params['name'];
  //for the purpose of this test we only return the name in a new object
  res.send({ name: requestedName });
};

//updates specific row from DB
exports.updateId = function(req, res){
  res.send(201, req.body);
};

//removes row from DB
exports.removeId = function(req, res){
  res.sendStatus(204);
};
