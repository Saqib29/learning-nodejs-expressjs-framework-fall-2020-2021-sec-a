const db  =  require('./db');

module.exports = {
    validate: (user, callback) => {
        var sql = `SELECT * FROM user WHERE username = '${user.username}' AND password = '${user.password}'`;
        db.getResults(sql, null, (result) => {
            if(result.length > 0) {
                callback(result);
            } else {
                callback(result);
            }
        });
    },
    insert: (user, callback) => {
        var sql = `INSERT INTO user (username, password, contact, user_roll) VALUES (?, ?, ?, ?)`;

        // console.log(user);
        db.execute(sql, [user.username, user.password, user.contact, user.user_roll], (status) => {
            callback(status);
        });
    }
}