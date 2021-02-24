module.exports = function (app) {
    var newrover = require('../controllers/newRoverController');

    /**
     Methods get called depending on request type and url.
    **/
    app.route('/api/NewRover')
      .get(newrover.getAll)
      .post(newrover.addData);
      // .delete(newrover.reset);

    app.route('/api/NewRover/recent')
      .get(newrover.getLastValues);

    app.route('/api/NewRover/:id')
      .get(newrover.getDataById)
      .delete(newrover.deleteById)
      .put(newrover.updateDataById);

    app.route('/api/NewRover/timeStamp/:hour')
      .get(newrover.getDataByTimeStamp)
};