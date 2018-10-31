const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();//init express

//assign a port
const port = process.env.PORT || 3000;

//setup of angular files (similar to setting up a static file)
app.use(express.static(__dirname + '/dist/buggy-gui-angularPort'));
//in the docs for body parser middleware
app.use(bodyParser.json());

//methods for REST
//get all
app.route('/api/data').get((req, res) => {
  res.send({
      data: [{ name: 'lilly' }, { name: 'lucy' }]//for this example we are simply creating new data
    });
});
//get name
app.route('/api/data/:name').get((req, res) => {
  const requestedName = req.params['name'];
  //for the purpose of this test we only return the name in a new object
  res.send({ name: requestedName });
});
//post
app.route('/api/data').post((req, res) => {
  res.send(201, req.body);
});
//for the following we require reading the params (name)
//put (update)
app.route('/api/data/:name').put((req, res) => {
  res.send(200, req.body);
});
//delete
app.route('/api/data/:name').delete((req, res) => {
  res.sendStatus(204);
});

//send angular file to path (has to be built)
app.get('/*', (req,res) => res.sendFile(path.join(__dirname)));

//server creation
const server = http.createServer(app);

server.listen(port, ()=> console.log('Running on port 3000...'));
