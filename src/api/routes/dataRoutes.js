module.exports = function(app) {
  var data = require('../controllers/dataController');

  app.route('/api/data')
    .get(data.getAll)
    .post(data.addData);

  app.route('/api/data/:id')
    .get(data.getId)
    .delete(data.removeId);

  app.route('/api/data/:id/:name')
    .put(data.updateId);
}
