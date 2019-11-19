const Sequelize = require('sequelize');
const db = require('../config/db.config').db;

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Buggy = db.define('buggy', {
  name: {
    type: Sequelize.STRING(15),
  }
}, {
  underscored: true,
  freezeTableName: true,
});

const Data = db.define('data', {
  buggyId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'buggy',
      key: 'id'
    }
  },
  strain_front_lft_1: {
    type: Sequelize.INTEGER
  },
  strain_front_lft_2: {
    type: Sequelize.INTEGER
  },
  strain_front_lft_3: {
    type: Sequelize.INTEGER
  },
  strain_front_rt_1: {
    type: Sequelize.INTEGER
  },
  strain_front_rt_2: {
    type: Sequelize.INTEGER
  },
  strain_front_rt_3: {
    type: Sequelize.INTEGER
  },
  strain_center_1: {
    type: Sequelize.INTEGER
  },
  strain_center_2: {
    type: Sequelize.INTEGER
  },
  strain_center_3: {
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
  vibration_center: {
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
  GSC_time: {
    type: Sequelize.STRING
  },
  GSC_date: {
    type: Sequelize.STRING
  },
  OBC_time: {
    type: Sequelize.STRING
  },
  OBC_date: {
    type: Sequelize.STRING
  }
}, {
  underscored: true,
  freezeTableName: true
});

Buggy.hasMany(Data, {foreignKey: 'buggyId'});
Data.belongsTo(Buggy, {foreignKey: 'buggyId'});

const values = [
  {
    'name': 'NewBuggy'
  },
  {
    'name': 'OldBuggy'
  }
];


/**
 * This function creates the table with the specified parameters
 */
const createTableBuggy = () => {
  // Find the correct way to create table values.
  Buggy.sync().then(() => {
    console.log("Buggy table created successfully");
    Buggy.bulkCreate(values);
  });
};

const createTableData = () => {
  Data.sync().then(() => {
    console.log("Data table created successfully");
  });
};

const dropTableData = () => {
  Data.drop().then(() => {
    console.log("Data table dropped successfully");
  });
};

const dropTableBuggy = () => {
  Buggy.drop().then(() => {
    console.log("Buggy table dropped successfully");
  });
};

/**
 * This function create both tables, is assumed that they don't exist
 *
 * Note: If you don't want to create both tables, you can run
 * createTableNewBuggy or createTableBuggyData only
 */
const create = () => {
  db.sync({ force: true })
    .then(() => {
      Buggy.bulkCreate(values);
      Buggy.sync();
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
  Buggy,
  Data,
};

/**
 Necessary module to run functions in command line.
 Steps in the command line:
 1. cd <your proyect path>/Buggy7thGenTelemetry/src/api/models
 2. node dataModel <type here the function you want to run>
 */
require('make-runnable');
