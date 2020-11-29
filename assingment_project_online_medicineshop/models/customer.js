const db  = require('./db');


module.exports = {
    medicines: (callback) => {
        var sql = `SELECT * FROM medicine`;
        db.getResults(sql, null, (results) => {
            callback(results);
        });
    },
    get_medicine_ById: (id, callback) => {
        var sql = `SELECT * FROM medicine WHERE id = ?`;

        db.getResults(sql, [id], (result) => {
            callback(result);
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
    },
    update_medicine: (data, callback) => {
        var sql = `UPDATE medicine SET availability = ? WHERE id = ?`;

        db.getResults(sql, [data.availability, data.id], (status) => {
            callback(status);
        });
    },
    insert_order: (object, callback) => {
        var sql = `INSERT INTO orders (customer_name, customer_number, madicine_name, quantity, price, date) VALUES (?, ?, ?, ?, ?, ?)`;
        var data = [object.customer_name, object.customer_number, object.medicine_name, object.quantity, object.price, object.date];

        // var sql = `INSERT INTO orders (customer_name, customer_number, medicine_name, quantity, price, date) VALUES ('${object.customer_name}', '${object.customer_number}', '${object.medicine_name}', '${object.quantity}', '${object.price}', '${object.date.toString()}')`;

        console.log(object);
        db.execute(sql, data, (status) => {
            
            callback(status);

        });
    },
    add_to_cart: (data, callback) => {
        var sql = `INSERT INTO cart (medicine_name, quantity, price, customer_id) VALUES (?, ?, ?, ?)`;
        var values = [data.medicine_name, data.quantity, data.price, data.customer_id];

        db.execute(sql, values, (status) => {
            callback(status);
        });
    }
}