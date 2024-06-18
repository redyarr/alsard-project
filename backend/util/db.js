
const Sequllize = require('sequelize');

const db = new Sequllize('alsard-ims', 'root','2003Nr123', {
    host: 'localhost',
    dialect: 'mysql',

});


module.exports = db;