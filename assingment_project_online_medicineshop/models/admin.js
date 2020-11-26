const db  =  require('./db');

module.exports = {
    get_customers: (callback) => {
        var sql =  `SELECT * FROM user WHERE user_roll = 'customer'`;
        db.getResults(sql, null, (results) => {
            callback(results);
        });
    },
    getById: (id, callback) => {
        var sql = `SELECT * FROM user WHERE id = ?`;

        db.getResults(sql, [id], (result) => {
            callback(result);
        });
    },
    add_medicine: (data, callback) => {
        var sql = `INSERT INTO medicine (name, availability, price, category, type, vendor) VALUES (?, ?, ?,? ,?, ?)`;
        var info = [data.name, data.availability, data.price, data.category, data.type, data.vendor];
        db.execute(sql, info, (status) => {
            callback(status);
        });
        // console.log(data);
    },
    get_medicines: (callback) => {
        var sql = `SELECT * FROM medicine`;
        db.getResults(sql, null, (results) => {
            callback(results);
        });
    },
    purchase_list: (callback) => {
        var sql = `SELECT * FROM purchase_list`;
        db.getResults(sql, null, (results) => {
            callback(results);
        });
    }
}