const mongodb = require('mongodb');
const Mongoclient = mongodb.MongoClient;

let _db;

const mongoConnect = ( callback ) => {
    Mongoclient.connect(
        'mongodb+srv://admin:node123@cluster0-z7cxs.mongodb.net/shop?retryWrites=true'
    )
    .then( client => {
        _db = client.db();
        callback();
    })
    .catch(console.log);
}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw "No Database Found";
};


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', '', {
//     dialect: 'mysql',
//     host: 'localhost'
// });

// module.exports = sequelize;





// const mysql = require("mysql2");

// /* A pool will provide multiple active connections with db */
// const pool = mysql.createPool( {
//     host: "localhost",
//     user: 'root',
//     database: 'node-complete',
//     password: ''
// });

// module.exports = pool.promise(); // returns promise