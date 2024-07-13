const Sequelize = require('sequelize');
const db = require('../util/db');
const Employee = require('./employee');
const Item = require('./item');


const EmployeeItem = db.define('EmployeeItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  employeeId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'employee', // Make sure this matches your table name
      key: 'Id',
    },
  },
  itemId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'item', // Make sure this matches your table name
      key: 'Id',
    },
  },
});

EmployeeItem.belongsTo(Employee, { foreignKey: 'employeeId' });
EmployeeItem.belongsTo(Item, { foreignKey: 'itemId' });

module.exports = EmployeeItem;
