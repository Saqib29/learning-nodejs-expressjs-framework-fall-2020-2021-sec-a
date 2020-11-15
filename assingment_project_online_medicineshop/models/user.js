const db  =  require('./db');

module.exports = {
    validate: (user, callback) => {
        var sql = `SELECT * FROM user WHERE username = ${user.username} AND password = ${user.password}`;
        db.getResult(sql, (result) => {
            if(results.length > 0) {
                callback(results);
            } else {
                callback(result);
            }
        });
    }
}