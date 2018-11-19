var mysql = require('mysql');

//DB has to already exist in server
//We can later add code to make sure it does and if not we create it
var db = mysql.createConnection({
  host: "localhost",
  // port: "3030",
  user: "root",
  password: "1234",
  database: "buggyDB"
});

//create table if it doesnt exist
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE sensorData (id INT AUTO_INCREMENT PRIMARY KEY, strain INT, vibracion INT)";
  con.query(sql, function (err, result) {
    if (err) console.log("table already exists");
    else console.log("Table created");
  });
});

module.exports = db;
