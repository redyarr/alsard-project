const sequelize = require('sequelize');

const db = require('../util/db');


const items = db.define('item', {

    Id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: sequelize.STRING,
        allowNull: false
    },
    Description: {
        type: sequelize.STRING,
        allowNull: false
    },
    model: {
        type: sequelize.STRING,
        allowNull: false
    }
    ,

    Category: {
        type: sequelize.STRING,
        allowNull: false
    },

    tagId: {
        type: sequelize.STRING,
        allowNull: false
    },
    company: {
        type: sequelize.STRING,
        allowNull: false
    },

    subLocation: {
        type: sequelize.STRING,
        allowNull: false
    },
    reserved: {
        type: sequelize.STRING,
        allowNull: false,
        defaultValue: 'no',
        validate: {
            isIn: [['yes', 'no']]
        }
    },
    isEditable: {
        type: sequelize.BOOLEAN,
        allowNull: false,
           defaultValue: true
    }


});

module.exports = items;