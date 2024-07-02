const Sequllize = require('sequelize');

const db = require('../util/db');


const items = db.define('item', {

    Id: {
        type: Sequllize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequllize.STRING,
        allowNull: false
    },
    Description: {
        type: Sequllize.STRING,
        allowNull: false
    },
    Category: {
        type: Sequllize.STRING,
        allowNull: false
    },
    Price: {
        type: Sequllize.DOUBLE,
        allowNull: false
    },
    companyId: {
        type: Sequllize.STRING,
        allowNull: false
    }
});

module.exports = items;