const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const dataRoutes = require('./api/routes/dataRoutes');//importing routes

const app = express();//init express

//assign a port
const port = process.env.PORT || 3000;

//setup of angular files dir (similar to setting up a static file)
// not found modify if need
app.use(express.static(__dirname + '../../dist/buggy-gui-angularPort'));

//in the docs for body parser middleware
app.use(bodyParser.json());

// enable cross-origin requests from anywhere
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//register the routes
dataRoutes(app);

//////////////////////////////////////////
//send angular file to path (has to be built first with ng build)
app.get('/*', (req,res) => res.sendFile(path.join(__dirname)));

//server creation
const server = http.createServer(app);

server.listen(port, ()=> console.log('Running on port 3000...'));
