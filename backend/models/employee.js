const Sequllize = require('sequelize');

const db = require('../util/db');
const e = require('express');


const employees = db.define('employee', {

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
    Email: {
        type: Sequllize.STRING,
        allowNull: false
    },
    Phone: {
        type: Sequllize.STRING,
        allowNull: false
    },

    employeeId: {
        type: Sequllize.STRING,
        allowNull: false
    },
    department: {
        type: Sequllize.STRING,
        allowNull: false
    },
    Position: {
        type: Sequllize.STRING,
        allowNull: false
    }
   

});


module.exports = employees;

