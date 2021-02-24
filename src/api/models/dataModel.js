const Sequelize = require('sequelize');
const db = require('../config/dbConfig').db;

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// const Buggy = db.define('buggy', {
//   name: {
//     type: Sequelize.STRING(15),
//   }
// }, {
//   underscored: true,
//   freezeTableName: true,
// });

const OldRover = db.define('old_rover', {
  strain_center_front_1: {
    type: Sequelize.INTEGER
  },
  strain_center_front_2: {
    type: Sequelize.INTEGER
  },
  strain_center_front_3: {
    type: Sequelize.INTEGER
  },
  strain_center_back_1: {
    type: Sequelize.INTEGER
  },
  strain_center_back_2: {
    type: Sequelize.INTEGER
  },
  strain_center_back_3: {
    type: Sequelize.INTEGER
  },
  strain_frontseat_1: {
    type: Sequelize.INTEGER
  },
  strain_frontseat_2: {
    type: Sequelize.INTEGER
  },
  strain_frontseat_3: {
    type: Sequelize.INTEGER
  },
  vibration_backseat_top: {
    type: Sequelize.INTEGER
  },
  vibration_backseat_bottom: {
    type: Sequelize.INTEGER
  },
  vibration_front_right: {
    type: Sequelize.INTEGER
  },
  vibration_front_left: {
    type: Sequelize.INTEGER
  },
  battery_status: {
    type: Sequelize.INTEGER
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  OBC_time: {
    type: Sequelize.STRING
  },
  OBC_date: {
    type: Sequelize.STRING
  },
  GSC_time: {
    type: Sequelize.STRING
  },
  GSC_date: {
    type: Sequelize.STRING
  }
}, {
  underscored: true,
  freezeTableName: true
});

const NewRover = db.define('new_rover', {
  strain_center_front_1: {
    type: Sequelize.INTEGER
  },
  strain_center_front_2: {
    type: Sequelize.INTEGER
  },
  strain_center_front_3: {
    type: Sequelize.INTEGER
  },
  strain_center_back_1: {
    type: Sequelize.INTEGER
  },
  strain_center_back_2: {
    type: Sequelize.INTEGER
  },
  strain_center_back_3: {
    type: Sequelize.INTEGER
  },
  strain_backseat_1: {
    type: Sequelize.INTEGER
  },
  strain_backseat_2: {
    type: Sequelize.INTEGER
  },
  strain_backseat_3: {
    type: Sequelize.INTEGER
  },
  vibration_front_lft: {
    type: Sequelize.INTEGER
  },
  vibration_front_rt: {
    type: Sequelize.INTEGER
  },
  vibration_rear_lft: {
    type: Sequelize.INTEGER
  },
  vibration_rear_rt: {
    type: Sequelize.INTEGER
  },
  vibration_center_back: {
    type: Sequelize.INTEGER
  },
  battery_status: {
    type: Sequelize.INTEGER
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  OBC_time: {
    type: Sequelize.STRING
  },
  OBC_date: {
    type: Sequelize.STRING
  },
  GSC_time: {
    type: Sequelize.STRING
  },
  GSC_date: {
    type: Sequelize.STRING
  }
}, {
  underscored: true,
  freezeTableName: true
});

// Buggy.hasMany(Data, {foreignKey: 'buggyId'});
// Data.belongsTo(Buggy, {foreignKey: 'buggyId'});

// const values = [
//   {
//     'name': 'NewBuggy'
//   },
//   {
//     'name': 'OldBuggy'
//   }
// ];


/**
 * This function creates the table with the specified parameters
 */
// const createTableBuggy = () => {
//   // Find the correct way to create table values.
//   Buggy.sync().then(() => {
//     console.log("Buggy table created successfully");
//     Buggy.bulkCreate(values);
//   });
// };

// const createTableData = () => {
//   Data.sync().then(() => {
//     console.log("Data table created successfully");
//   });
// };

// const dropTableData = () => {
//   Data.drop().then(() => {
//     console.log("Data table dropped successfully");
//   });
// };

// const dropTableBuggy = () => {
//   Buggy.drop().then(() => {
//     console.log("Buggy table dropped successfully");
//   });
// };

/**
 * This function create both tables, is assumed that they don't exist
 *
 * Note: If you don't want to create both tables, you can run
 * createTableNewBuggy or createTableBuggyData only
 */
const create = () => {
  db.sync({ force: true })
    .then(() => {
      OldRover.sync();
      NewRover.sync();
    });
};

/**
 * If necessary, this function delete the tables.
 * pre: Tables must exist before using this function
 */
const drop = () => {
  db.sync().then(() => { return db.drop() });
};

/**
 * This function deletes the existing tables and create new tables.
 *
 * pre: This is a utility function for dropping and creating again the
 * tables.
 */
const reset = () => {
  drop();
  create();
};

module.exports = {
  pool: db,
  create,
  reset,
  drop,
  OldRover,
  NewRover
};

/**
 Necessary module to run functions in command line.
 Steps in the command line:
 1. cd <your proyect path>/Buggy7thGenTelemetry/src/api/models
 2. node dataModel <type here the function you want to run>
 */
require('make-runnable');
