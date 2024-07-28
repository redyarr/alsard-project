const Sequelize = require('sequelize');
const db = require('../util/db');

const items = db.define('item', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tagId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    company: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subLocation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reserved: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'no',
        validate: {
            isIn: [['yes', 'no']]
        }
    },
    isEditable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = items;
