var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  // port: "3030",
  user: "root",
  password: "1234",
  database: "buggyDB"
});

//create table if it doesnt exist
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE sensorData (id INT AUTO_INCREMENT PRIMARY KEY, strain INT, vibracion INT)";
  con.query(sql, function (err, result) {
    if (err) console.log("table already exists");
    console.log("Table created");
  });
});

module.exports = con;
