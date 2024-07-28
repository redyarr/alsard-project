const Sequelize = require('sequelize');
const db = require('../util/db');

const employees = db.define('employee', {
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
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    employeeId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    department: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Position: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isEditable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    hooks: {
        afterCreate: (employee, options) => {
            setTimeout(async () => {
                await employee.update({ isEditable: false });
                console.log(`Employee ${employee.Id} is now not editable`);
            }, 6 * 60 * 60 * 1000); // Use 12 * 60 * 60 * 1000 for 12 hours
        }
    }
});

module.exports = employees;
