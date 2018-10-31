const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./api/routes/dataRoutes');//importing routes

const app = express();//init express

//assign a port
const port = process.env.PORT || 3000;

//setup of angular files (similar to setting up a static file)
app.use(express.static(__dirname + '/dist/buggy-gui-angularPort'));
//in the docs for body parser middleware
app.use(bodyParser.json());

//TODO add database connections

routes(app);//reguster the route
//send angular file to path (has to be built)
app.get('/*', (req,res) => res.sendFile(path.join(__dirname)));

//server creation
const server = http.createServer(app);

server.listen(port, ()=> console.log('Running on port 3000...'));
