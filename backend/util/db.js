
const Sequllize = require('sequelize');

const db = new Sequllize('alsard-ims', 'root','12123Redyar', {
    host: 'localhost',
    dialect: 'mysql',

});


module.exports = db;