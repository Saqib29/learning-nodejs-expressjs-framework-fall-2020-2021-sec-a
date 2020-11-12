const db = require('./dbConnection');

module.exports= {
	// validate: function(user, callback){
	// 	var sql = "select * from user where username='"+user.username+"' and password='"+user.password+"'";
	// 	db.getResults(sql, function(results){
	// 		if(results.length > 0 ){
	// 			callback(true);
	// 		}else{
	// 			callback(false);
	// 		}
	// 	});
	// },
	// getId: function(password, username, callback){
	// 	var sql = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`;
	// 	db.getResults(sql, function(result){
	// 		console.log(result);
	// 		callback(result);
	// 	});
	// },
	getById: function(id, callback) {
		var sql = `SELECT * FROM job WHERE id = ${id}`;
		db.getResults(sql, (result) => {
			callback(result);
		});
	},
	getByuser_Id: function(user_id, callback){
		var sql = `SELECT * FROM job WHERE user_id = ${user_id}`;
		db.getResults(sql, function(result){
			callback(result);
		});
	},
	// getAll: function(callback){
	// 	var sql = "select * from user";
	// 	db.getResults(sql, function(results){
	// 		callback(results);
	// 	});
	// },
	insert: function(user, callback){
		var sql = `INSERT INTO job (compName, jobTitle, jobLoc, salary, user_id) VALUES ('${user.compName}', '${user.jobTitle}','${user.jobLoc}', '${user.salary}', '${user.user_id}')`;
	
		db.execute(sql, (result) => {
			callback(result);
			console.log(result);
		});
	},
	update: function(user, callback){
		var sql = `UPDATE job SET compName = '${user.compName}', jobTitle = '${user.jobTitle}', jobLoc = '${user.jobLoc}', salary = '${user.salary}' WHERE id = '${user.id}'`;
		db.execute(sql, (result) => {
			callback(result);
		});
	},
	updateUsertable: function(user, callback){
		var sql = `UPDATE user SET jobTitle = '${user.jobTitle}', jobLoc = '${user.jobLoc}', salary = '${user.salary}' WHERE id = '${user.user_id}'`;

		db.execute(sql, (result) => {
			callback(result);
		});
	},
	delete: function(id, callback){
		var sql = `DELETE FROM user WHERE id = ${id}`;
		db.execute(sql, (result) => {
			callback(result);
		});
	}
}