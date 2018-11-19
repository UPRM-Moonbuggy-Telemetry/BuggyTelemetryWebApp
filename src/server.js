const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const dataRoutes = require('./api/routes/dataRoutes');//importing routes
const dataDB = require('./api/models/dataModel.js');//db model

const app = express();//init express

//assign a port
const port = process.env.PORT || 3000;

//setup of angular files dir (similar to setting up a static file)
app.use(express.static(__dirname + '../../dist/buggy-gui-angularPort'));

//in the docs for body parser middleware
app.use(bodyParser.json());

//register the routes
dataRoutes(app);

//////////////////////////////////////////
//send angular file to path (has to be built first with ng build)
app.get('/*', (req,res) => res.sendFile(path.join(__dirname)));

//server creation
const server = http.createServer(app);

server.listen(port, ()=> console.log('Running on port 3000...'));
