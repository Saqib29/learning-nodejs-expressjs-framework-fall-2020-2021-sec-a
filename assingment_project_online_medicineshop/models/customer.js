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
    },
    getById: (id, callback) => {
        var sql = `SELECT * FROM user WHERE id = ?`;

        db.getResults(sql, [id], (results) => {
            callback(results);
        });
    },
    update: (data, callback) => {
        var sql = `UPDATE user SET username = ?, password = ?, contact = ?, address = ? WHERE id = ?`;
        var update = [data.username, data.password, data.contact, data.address, data.id];

        // console.log(data)
        db.execute(sql, update, (status) => {
            callback(status);
        });
    }
}