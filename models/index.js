const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.users = require('./user')(sequelize, Sequelize);
db.products = require('./product')(sequelize, Sequelize);
// Add other models here

module.exports = db;
