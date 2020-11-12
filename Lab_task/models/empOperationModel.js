const db = require('./dbConnection');

module.exports= {
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
		var sql = `DELETE FROM job WHERE id = ${id}`;
		db.execute(sql, (result) => {
			callback(result);
		});
	}
}