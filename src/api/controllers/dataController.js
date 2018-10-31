exports.getAll = function(req, res) {
  res.send({
    data: [{ name: 'lilly' }, { name: 'lucy' }]//for this example we are simply creating new data
  });
};

exports.addData = function(req, res) {
  res.send(201, req.body);
};

exports.getId = function(req, res) {
  const requestedName = req.params['name'];
  //for the purpose of this test we only return the name in a new object
  res.send({ name: requestedName });
};

exports.updateId = function(req, res){
  res.send(201, req.body);
};

exports.removeId = function(req, res){
  res.sendStatus(204);
};
