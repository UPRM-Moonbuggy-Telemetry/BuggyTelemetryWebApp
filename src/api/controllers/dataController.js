const _ = require('lodash');
const sequelize = require('../config/db.config.js').Sequelize;
const Buggy = require('../models/dataModel.js').Buggy;
const Data = require('../models/dataModel.js').Data;

/**
 Gets all the rows from the Data Base
 **/
exports.getAll = function (req, res) {
  const buggy_name = req.params['table'].toLowerCase(); // Respective Buggy name

  // Find all the data of the respective buggy.
  Buggy.findOne({include: [{model: Data}] ,
    where: {
      buggy_data: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + buggy_name + '%')
    }
  })
  // If the query was a success, then send all data rows of the respective buggy as the result.
    .then(buggy => {
      if (buggy) {
        res.status(200).send(buggy['dataValues']['data']);
      }
    })
    // If there was an error in the query, then return 404 and print out the error.
    .catch(error => {
      console.log('Could not retrieve Buggy Data' + error);
      res.status(404).send(req.body);
    });
};

/**
 Get the last 30 values or less from the Data Base, the outer query
 gets the number of rows and the inner query gets the data.
 **/
exports.getLastValues = function (req, res) {
  const buggy_name = req.params['table'].toLowerCase();

  Buggy.findOne({
    where: {
      buggy_data: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + buggy_name + '%')
    }
  }).then(buggy => {

    // Find all the data related to buggy.
    if (buggy) {
      Data.findAll({
        where: {
          'buggyId': buggy['id'],
        },
        order: [['id', 'DESC']],
        limit: 30,
      }).then(dataRows => {
        console.log('Successfully fetched the most recent 30 data rows of %' % buggy_name);
        res.status(200).send(dataRows);
      }).catch(error => {
        console.log(('Could not fetch the 30 most recent data rows of %. ' % buggy_name) + error);
        res.status(404).send(req.body);
      });
    }

  }).catch(error => {
    console.log(('Could not find the respective buggy: %. ' % buggy_name) + error);
    res.status(404).send(req.body);
  });
};

/**
 This function adds new rows to the Data Base
 **/
exports.addData = function (req, res) {
  const buggy_name = req.params['table'].toLowerCase(); // Respective Buggy name

  var values = [];
  var dt = new Date();
  var time = dt.toTimeString().substring(0, 8);
  var month = dt.getMonth() + 1;
  var date = dt.getFullYear().toString() + "-" + month.toString() + "-" + dt.getDate().toString();

  Buggy.findOne({include: [{model: Data}] ,
    where: {
      buggy_data: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + buggy_name + '%')
    }
  })
  // If the query was a success, then send all data rows of the respective buggy as the result.
    .then(buggy => {
      if (buggy) {
        _.forEach(req.body, function (value) {
          values.push({
            'buggyId': buggy['id'],
            'strain_front_lft_1': value.strain_front_lft_1,
            'strain_front_lft_2': value.strain_front_lft_2,
            'strain_front_lft_3': value.strain_front_lft_3,
            'strain_front_rt_1': value.strain_front_rt_1,
            'strain_front_rt_2': value.strain_front_rt_2,
            'strain_front_rt_3': value.strain_front_rt_3,
            'strain_center_1': value.strain_center_1,
            'strain_center_2': value.strain_center_2,
            'strain_center_3': value.strain_center_3,
            'vibration_front_lft': value.vibration_front_lft,
            'vibration_front_rt': value.vibration_front_rt,
            'vibration_rear_lft': value.vibration_rear_lft,
            'vibration_rear_rt': value.vibration_rear_rt,
            'vibration_center': value.vibration_center,
            'battery_status': value.battery_status,
            'latitude': value.latitude,
            'longitude': value.longitude,
            'GSC_time': time,
            'GSC_date': date,
            'OBC_time': value.OBC_time,
            'OBC_date': value.OBC_date});
        });

        // Create all Data values received at the same time.
        Data.bulkCreate(values).then(data => {
          // const result = JSON.stringify(data);
          res.status(201).send(data);
        }).catch(error => {
          console.log('Could not create Data rows' + error);
          res.status(500).send(req.body);
        });
      }
    })
    // If there was an error in the query, then return 404 and print out the error.
    .catch(error => {
      console.log('Could not find respective Buggy' + error);
      res.status(404).send(req.body);
    });
};

/**
 This function gets a specific row from the Data Base
 **/
exports.getDataById = function (req, res) {
  const paramId = req.params['id'];
  // const buggy_name = req.params['table'].toLowerCase(); // Respective Buggy name

  Data.findOne({
    where: {'id': paramId},
  }).then((data) => {
    console.log('Data row successfully found: ' + JSON.stringify(data));
    res.status(200).send(data);
  }).catch((error) => {
    console.log('Could not fetch desired data row: ' + error);
    res.status(404).send(req.body);
  });
};

/**
 This function gets the next 30 after the specified time.
 **/
//
exports.getDataByTimeStamp = function (req, res) {
  // Get data given a specific time
  const inTime = req.params['hour'];
  const buggy_name = req.params['table'].toLowerCase();

  Buggy.findOne({
    include : [{model : Data}],
    where : {
      buggy_data: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + buggy_name + '%')
    }
  }).then(buggy => {
    if (buggy) {
      Data.findAll({
        where : {
          [sequelize.Op.gte] : inTime,
          'buggyId': buggy['id'],
        },
        order : [['GSC_Time', 'DESC']],
        limit : 30
      }).then(dataRows => {
        console.log('Successfully fetched data rows with time stamps: %' % inTime);
        res.status(200).send(dataRows);}).catch(error => {
        console.log(('Could not fetch data rows with time stamps: %. ' % inTime) + error);
        res.status(404).send(req.body);
      });
    }

  }).catch(error => {
    console.log(('Could not find the respective buggy: %. ' % buggy_name) + error);
    res.status(404).send(req.body);
  });
};

/**
 This function updates a specific row from the Data table.
 **/
exports.updateDataById = function (req, res) {
  const paramId = req.params['id'];

  const values = {
    'buggyId': req.body.buggyId,
    'strain_front_lft_1': req.body.strain_front_lft_1,
    'strain_front_lft_2': req.body.strain_front_lft_2,
    'strain_front_lft_3': req.body.strain_front_lft_3,
    'strain_front_rt_1': req.body.strain_front_rt_1,
    'strain_front_rt_2': req.body.strain_front_rt_2,
    'strain_front_rt_3': req.body.strain_front_rt_3,
    'strain_center_1': req.body.strain_center_1,
    'strain_center_2': req.body.strain_center_2,
    'strain_center_3': req.body.strain_center_3,
    'vibration_front_lft': req.body.vibration_front_lft,
    'vibration_front_rt': req.body.vibration_front_rt,
    'vibration_rear_lft': req.body.vibration_rear_lft,
    'vibration_rear_rt': req.body.vibration_rear_rt,
    'vibration_center': req.body.vibration_center,
    'battery_status': req.body.battery_status,
    'latitude': req.body.latitude,
    'longitude': req.body.longitude,
    'GSC_time': req.body.GSC_time,
    'GSC_date': req.body.GSC_date,
    'OBC_time': req.body.OBC_time,
    'OBC_date': req.body.OBC_date,
  };

  Data.update(values, {
    where: {'id': paramId},
    returning: true
  }).then((data) => {
    if (data) {
      // data returns an array with two elements, the number of affected rows and the actual affected row.
      console.log("Successfully updated row: " + data[0].toString() + " with " + JSON.stringify(data[1]));
      res.status(200).send(data);
    }
  }).catch((error) => {
    console.log("Could not find row with the specified id: " + error);
    res.status(204).send(req.body);
  });
};

/**
 This function removes a specific row from the the specified table. By default it will delete from the Data table.
 BE CAREFUL NOT TO DELETE ANY BUGGY INSTANCE.
 table: iff is equal to 'buggy' then it will delete from the Buggy table, otherwise it will delete from the Data table.

 **/
exports.removeId = function (req, res) {
  const paramId = req.params['id'];
  var table = req.params['table'].toLowerCase(); // Respective Buggy or Data table

  if (table.localeCompare('buggy') === 0) {
    table = Buggy
  } else {
    table = Data
  }

  table.destroy({
    where: {'id': paramId},
  }).then((result) => {
    console.log('Successfully deleted %d row(s).' % result);
    res.sendStatus(204);
  }).catch((error) => {
    console.log('Could not delete specified row: ' + error);
    res.status(404).send(req.body);
  });
};
