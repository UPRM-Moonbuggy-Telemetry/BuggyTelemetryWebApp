const _ = require('lodash');
const sequelize = require('../config/dbConfig.js').Sequelize;
const OldRover = require('../models/dataModel.js').OldRover;

/**
 Gets all the rows from the Data table.
 **/
exports.getAll = function (req, res) {
    // Find all the data of the respective buggy.
    OldRover.findAll()
    // If the query was a success, then send all data rows of the respective buggy as the result.
    .then(data => {
        if (data) {
        res.status(200).send(data);
        }
    })
    // If there was an error in the query, then return 404 and print out the error.
    .catch(error => {
        console.log('Could not retrieve Old Rover Data' + error);
        res.status(404).send(req.body);
    });
};

/**
 Get the last 30 values or less from the Data table, the outer query
 gets the number of rows and the inner query gets the data.
 **/
exports.getLastValues = function (req, res) {
    OldRover.findAll({
        order: [['id', 'DESC']],
        limit: 30,
    })
    .then(dataRows => {
        console.log('Successfully fetched the most recent 30 data rows of Old Rover.');
        res.status(200).send(dataRows);
    })
    .catch(error => {
        console.log(('Could not fetch the 30 most recent data rows of Old Rover.') + error);
        res.status(404).send(req.body);
    });
};

/**
 This function gets a specific row from the Data table.
 **/
exports.getDataById = function (req, res) {
    const paramId = req.params['id'];
  
    OldRover.findOne({
        where: {'id': paramId},
    })
    .then((data) => {
        console.log('Data row successfully found: ' + JSON.stringify(data));
        res.status(200).send(data);
    })
    .catch((error) => {
        console.log('Could not fetch desired data row: ' + error);
        res.status(404).send(req.body);
    });
};

/**
 This function gets the next 30 rows after the specified time.
 **/
//
exports.getDataByTimeStamp = function (req, res) {
    // Get data given a specific time
    const inTime = req.params['hour'];
  
    OldRover.findAll({
        where : {
        [sequelize.Op.gte] : inTime
        },
        order : [['GSC_Time', 'DESC']],
        limit : 30
    })
    .then(dataRows => {
        console.log('Successfully fetched data rows with time stamps: %' % inTime);
        res.status(200).send(dataRows);
    })
    .catch(error => {
        console.log(('Could not fetch data rows with time stamps: %. ' % inTime) + error);
        res.status(404).send(req.body);
    });
};

/**
 This function adds new rows to the Data table.
 **/
exports.addData = function (req, res) {
  
    var values = [];
    var dt = new Date();
    var time = dt.toTimeString().substring(0, 8);
    var month = dt.getMonth() + 1;
    var date = dt.getFullYear().toString() + "-" + month.toString() + "-" + dt.getDate().toString();
  
    _.forEach(req.body, function (value) {
        values.push({
        'strain_center_front_1': value.strain_center_front_1,
        'strain_center_front_2': value.strain_center_front_2,
        'strain_center_front_3': value.strain_center_front_2,
        'strain_center_back_1': value.strain_center_back_1,
        'strain_center_back_2': value.strain_center_back_2,
        'strain_center_back_3': value.strain_center_back_3,
        'strain_frontseat_1': value.strain_frontseat_1,
        'strain_frontseat_2': value.strain_frontseat_2,
        'strain_frontseat_3': value.strain_frontseat_3,
        'vibration_backseat_top': value.vibration_backseat_top,
        'vibration_backseat_bottom': value.vibration_backseat_bottom,
        'vibration_front_right': value.vibration_front_right,
        'vibration_front_left': value.vibration_front_left,
        'battery_status': value.battery_status,
        'latitude': value.latitude,
        'longitude': value.longitude,
        'OBC_time': value.OBC_time,
        'OBC_date': value.OBC_date,
        'GSC_time': time,
        'GSC_date': date
        });
    });

    // Create all Data values received at the same time.
    OldRover.bulkCreate(values)
    .then(data => {
        res.status(201).send(data);
    })
    .catch(error => {
        console.log('Could not create Data rows' + error);
        res.status(500).send(req.body);
    });
};

/**
 This function updates a specific row from the Data table.
 **/
exports.updateDataById = function (req, res) {
    const paramId = req.params['id'];
  
    const values = {
    'strain_center_front_1': req.body.strain_center_front_1,
    'strain_center_front_2': req.body.strain_center_front_2,
    'strain_center_front_3': req.body.strain_center_front_2,
    'strain_center_back_1': req.body.strain_center_back_1,
    'strain_center_back_2': req.body.strain_center_back_2,
    'strain_center_back_3': req.body.strain_center_back_3,
    'strain_frontseat_1': req.body.strain_frontseat_1,
    'strain_frontseat_2': req.body.strain_frontseat_2,
    'strain_frontseat_3': req.body.strain_frontseat_3,
    'vibration_backseat_top': req.body.vibration_backseat_top,
    'vibration_backseat_bottom': req.body.vibration_backseat_bottom,
    'vibration_front_right': req.body.vibration_front_right,
    'vibration_front_left': req.body.vibration_front_left,
    'battery_status': req.body.battery_status,
    'latitude': req.body.latitude,
    'longitude': req.body.longitude,
    'OBC_time': req.body.OBC_time,
    'OBC_date': req.body.OBC_date,
    'GSC_time': req.body.GSC_time,
    'GSC_date': req.body.GSC_date
    };
  
    OldRover.update(values, {
        where: {'id': paramId},
        returning: true
    })
    .then((data) => {
        if (data) {
            // data returns an array with two elements, the number of affected rows and the actual affected row.
            console.log("Successfully updated row: " + data[0].toString() + " with " + JSON.stringify(data[1]));
            res.status(200).send(data);
        }
    })
    .catch((error) => {
        console.log("Could not find row with the specified id: " + error);
        res.status(204).send(req.body);
    });
};

/**
 This function deletes a specific row from the Data table.
**/
exports.deleteById = function (req, res) {
    const paramId = req.params['id'];
  
    OldRover.destroy({
      where: {'id': paramId},
    })
    .then((result) => {
        console.log('Successfully deleted %d row(s).' % result);
        res.sendStatus(204);
    })
    .catch((error) => {
        console.log('Could not delete specified row: ' + error);
        res.status(404).send(req.body);
    });
};

/**
 This function resets the data table (deletes all rows).
**/
exports.reset = function (req, res) {  
    OldRover.destroy()
    .then((result) => {
        console.log('Successfully deleted all rows.');
        res.sendStatus(204);
    })
    .catch((error) => {
        console.log('Could not delete rows: ' + error);
        res.status(404).send(req.body);
    });
};