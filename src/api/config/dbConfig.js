// const Sequelize = require('sequelize');
// const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_DIALECT,
//   logging: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

// module.exports = {
//   Sequelize,
//   db
// };

const Sequelize = require('sequelize');
const db = new Sequelize('buggy_db', 'buggy_user', 'mo*nbu66y', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = {
  Sequelize,
  db
};