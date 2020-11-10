const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	// get ID
	userModel.getId(req.session.password, req.session.username,function(result){
		console.log('where is the prob?');
		console.log(req.session.password, req.session.username);
		if(result[0].length < 2 && result[0].password == req.session.password && result[0].username == req.session.username){
			res.render('home/index', {name: result[0].username, id: result[0].id });
		}
	});
});


router.get('/userlist', (req, res)=>{

	userModel.getAll(function(results){
		res.render('home/userlist', {users: results});
	});

})

module.exports = router;