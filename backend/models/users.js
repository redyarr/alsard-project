const Sequllize = require('sequelize');

const db = require('../util/db');



const users = db.define('user', {

    id: {

        type: Sequllize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequllize.STRING,
        allowNull: false
    },

    password: {
        type: Sequllize.STRING,
        allowNull: false
    },

    role: {
        type: Sequllize.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: [['user', 'admin']]
        }
    }

}
);


module.exports = users;