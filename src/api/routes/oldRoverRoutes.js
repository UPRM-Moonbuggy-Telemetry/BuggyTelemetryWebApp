module.exports = function (app) {
    var oldrover = require('../controllers/oldRoverController');
  
    /**
     Methods get called depending on request type and url.
    **/
    app.route('/api/OldRover')
      .get(oldrover.getAll)
      .post(oldrover.addData)
      .delete(oldrover.reset);
  
    app.route('/api/OldRover/recent')
      .get(oldrover.getLastValues);
  
    app.route('/api/OldRover/:id')
      .get(oldrover.getDataById)
      .delete(oldrover.deleteById)
      .put(oldrover.updateDataById);
  
    app.route('/api/OldRover/timeStamp/:hour')
      .get(oldrover.getDataByTimeStamp)
};