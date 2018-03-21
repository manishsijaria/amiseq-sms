var mysql = require('mysql')

var pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'amiseq'
}); 
//NOTE: you don't need to connect after getting the connection from the pool.
var getConnection = (callback) => {
    pool.getConnection((err, connection) => {
        callback(err,connection)
    })
}

module.exports = getConnection;