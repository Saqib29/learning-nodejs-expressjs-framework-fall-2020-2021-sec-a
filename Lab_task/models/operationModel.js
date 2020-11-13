const db = require('./dbConnection');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from user where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0 ){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getId: function(password, username, callback){
		var sql = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`;
		db.getResults(sql, function(result){
			console.log(result);
			callback(result);
		});
	},
	getById: function(id, callback){
		var sql = `SELECT * FROM user WHERE id = ${id}`;
		db.getResults(sql, function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql = `INSERT INTO user (username, password, empName, compName, conctNo, jobTitle, jobLoc, salary, userRoll) VALUES ('${user.username}', '${user.password}', '${user.empName}', '${user.compName}', '${user.conctNo}',NULL, NULL, NULL, '${user.userRoll}')`;
	
		db.execute(sql, (result) => {
			callback(result);
			console.log(result);
		});
	},
	update:function(user, callback){
		var sql = `UPDATE user SET username = '${user.username}', password = '${user.password}', empName = '${user.empName}', compName = '${user.compName}', conctNo = '${user.conctNo}' WHERE id = '${user.id}'`;
		db.execute(sql, (result) => {
			callback(result);
		});
	},
	delete: function(id, callback){
		var sql = `DELETE FROM user WHERE id = ${id}`;
		db.execute(sql, (result) => {
			callback(result);
		});
	},
	search: (search_item, callback) => {
		var sql = `SELECT * FROM user WHERE id = '${search_item}' OR username = '${search_item}' OR empName = '${search_item}' OR compName = '${search_item}' OR conctNo = '${search_item}' OR jobTitle = '${search_item}' OR jobLoc = '${search_item}' OR salary = '${search_item}' OR userRoll = '${search_item}'`;
		db.getResults(sql, (results) => {
			callback(results);
		});
	}
}