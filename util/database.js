const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;





// const mysql = require("mysql2");

// /* A pool will provide multiple active connections with db */
// const pool = mysql.createPool( {
//     host: "localhost",
//     user: 'root',
//     database: 'node-complete',
//     password: ''
// });

// module.exports = pool.promise(); // returns promise