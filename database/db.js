const {Sequelize} = require('sequelize');
const {database} = require('../config/database');

const sequelize = new Sequelize(
    database.database,
    database.user,
    database.password,
    {
        host: database.host,
        dialect: database.dialect
    }
);

module.exports = sequelize;