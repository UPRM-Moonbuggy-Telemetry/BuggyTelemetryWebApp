import {env_var} from 'src/environments/env_var'

const Sequelize = require('sequelize');
const db = new Sequelize(env_var.DB_NAME, env_var.DB_USER, env_var.DB_PASSWORD, {
  host: env_var.DB_HOST,
  dialect: env_var.DB_DIALECT,
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
