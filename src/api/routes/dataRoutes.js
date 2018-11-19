module.exports = function(app) {
  var data = require('../controllers/dataController');

//methods get called depending on reuest type and url
  app.route('/api/data')
    .get(data.getAll)
    .post(data.addData);

  app.route('/api/data/:id')
    .get(data.getId)
    .delete(data.removeId)
    .put(data.updateId);
}
