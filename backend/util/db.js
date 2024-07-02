
const Sequllize = require('sequelize');

const db = new Sequllize('alsard-ims', 'root','12123', {
    host: 'localhost',
    dialect: 'mysql',

});


module.exports = db;