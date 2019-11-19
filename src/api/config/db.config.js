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
