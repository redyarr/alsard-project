const Sequllize = require('sequelize');

const db = require('../util/db');

    const EmployeeItem = db.define('EmployeeItem', {
      id: {
        type: Sequllize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      employeeId: {
        type: Sequllize.INTEGER,
        references: {
          model: 'employee',
          key: 'id',
        },
      },
      itemId: {
        type: Sequllize.INTEGER,
        references: {
          model: 'item',
          key: 'id',
        },
      },
     
    });
  
module.exports=EmployeeItem;
  