const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

	if(req.body.password == '' || req.body.username){
		res.redirect('/login');
	}

	var user = {
		username: req.body.username,
		password: req.body.password
	};

	// session added
	req.session.username = user.username;
	req.session.password = user.password;


	userModel.validate(user, function(status){
		if(status){
			res.redirect('/home', {name: 'Saqib', id: '123'});
		}else{
			res.redirect('/login');
		}
	});
}); 

module.exports = router;