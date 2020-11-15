const db           = require('mysql');
const { connect } = require('../controllers/log_regis');


var getConnection = (callback) => {
    var connection = mysql.craeteConnection({
        host        : 'localhost',
        database    : '',
        user        : 'root',
        password    : ''
    });

    connection.connect((err) => {
        if(err) {
            console.log(`error connecting: ${err.stack}`);
            return;
        }
        console.log(`connected as id ${connection.threadId}`);
    });

    callback(coonection);
}

module.exports = {
    getResult: (sql, callback) => {
        getConnection((connection) => {
            connection.query(sql, (error, results) => {
                callback(results);
            });

            connection.end((err) => {
                console.log('connection end...');
            });
        });
    },

    execute: (sql, callback) => {
        getConnection((connection) => {
            connection.query(sql, (status) => {

                if(status) {
                    callback(true);
                }
                else{
                    callback(false);
                }
            });

            connection.end((err) => {
                console.log('connection end...')
            });
        });
    }
}