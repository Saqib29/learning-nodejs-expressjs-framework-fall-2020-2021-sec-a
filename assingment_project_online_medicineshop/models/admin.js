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
    get_medicine_by_id: (id, callback) => {
        var sql = `SELECT * FROM medicine WHERE id = ?`;

        db.getResults(sql, [id], (result) => {
            callback(result);
        });
    },
    update_medicine: (id, data, callback) => {
        var sql = `UPDATE medicine SET name = ?, availability = ?, price = ?, category = ?, type = ?, vendor = ? WHERE id = ?`;
        var update = [data.name, data.availability, data.price, data.category, data.type, data.vendor, id];
        
        db.execute(sql, update, (status) => {
            callback(status);
        });
    },
    delete_medicine: (id, callback) => {
        var sql = `DELETE FROM medicine WHERE id = ?`

        db.execute(sql, [id], (status) => {
            callback(status);
        });
    },
    purchase_list: (callback) => {
        var sql = `SELECT * FROM purchase_list`;
        db.getResults(sql, null, (results) => {
            callback(results);
        });
    },
    insert_into_purchase_list: (data, callback) => {
        var sql = `INSERT INTO purchase_list (customer_name, customer_number, medicine_name, quantity, price, date) VALUES (?, ?, ?, ?, ?, ?)`;
        var values = [data.customer_name, data.customer_number, data.medicine_name, data.quantity, data.price, data.date];

        db.execute(sql, values, (status) => {
            callback(status);
        });
    },
    delete_from_orders_By_Id: (id, callback) => {
        var sql = `DELETE FROM orders WHERE id = ?`;

        db.execute(sql, [id], (status) => {
            // console.log('not deleted');
            callback(status);
        });
    },
    get_orders: (callback) => {
        var sql = `SELECT * FROM orders`;
        db.getResults(sql, null, (orders) => {
            callback(orders);
        });
    },
    update: (data, callback) => {
        var sql = `UPDATE user SET username = ?, password = ?, contact = ?, address = ? WHERE id = ?`;
        var update = [data.username, data.password, data.contact, data.address, data.id];

        // console.log(data)
        db.execute(sql, update, (status) => {
            callback(status);
        });
    },
    delete_customer: (id, callback) => {
        var sql = `DELETE FROM user WHERE id = ?`;

        db.execute(sql, [id], (status) => {
            callback(status);
        });
    },
    get_order_ById: (id, callback) => {
        var sql = `SELECT * FROM orders WHERE id = ?`;

        db.getResults(sql, [id], (result) => {
            callback(result);
        });
    }
}