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

router.get('/create', (req, res)=>{
	res.render('user/create');
});


router.post('/create', (req, res)=>{
	var user = {
		id: req.params.id,
		username: req.body.username,
		password: req.body.password,
		type: 'Software engineer'	
	};

	userModel.insert(user, (result) => {
		res.send('Delete: '+result);
	});
});

router.get('/edit/:id', (req, res)=>{

	userModel.getById(req.params.id, (result) => {
		var user = {
			username: result[0].username,
			password: result[0].password,
			email: 'saqib@gmail.com'
		};
		res.render('user/edit', user);
	});
});

router.post('/edit/:id', (req, res)=>{
	var user = {
		id: req.params.id,
		username: req.body.username,
		password: req.body.password
	}
	userModel.update(user, (result) => {
		console.log(result);
	});
	res.redirect('/home/userlist');
});

router.get('/delete/:id', (req, res)=>{
	userModel.getById(req.params.id, (result) => {
		var user = {
			username: result[0].username,
			password: result[0].password, 
			email: 'email@gmail.com'
		};
		res.render('user/delete', user);
	});

});

router.post('/delete/:id', (req, res)=>{
	userModel.delete(req.params.id, (result) => {
		console.log(result);
	});
	res.redirect('/home/userlist');
});

module.exports = router;

