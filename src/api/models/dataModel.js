var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: "3030",
  user: "yourusername",
  password: "yourpassword",
  database: "buggyDB"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE sensorData (id INT AUTO_INCREMENT_KEY, strain INT, vibracion INT)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

module.exports = con;
