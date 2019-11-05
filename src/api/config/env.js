const env = {
  database: 'buggy_db',
  username: 'buggy_user',
  password: 'mo*nbu66y',
  host: 'localhost',
  dialect: 'postgres',
  freezeTableName: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;
