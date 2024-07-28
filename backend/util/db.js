
const Sequllize = require('sequelize');

const db = new Sequllize('alsard-ims', 'root','Alsard12123', {
    host: 'localhost',
    dialect: 'mysql',

});


module.exports = db;