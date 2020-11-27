const db  = require('./db');


module.exports = {
    medicines: (callback) => {
        var sql = `SELECT * FROM medicine`;
        db.getResults(sql, null, (results) => {
            callback(results);
        });
    },
    cart: (id, callback) => {
        var sql = `SELECT * FROM cart WHERE customer_id = ?`;
        db.getResults(sql, [id], (lists) => {
            callback(lists);
        });
    }
}