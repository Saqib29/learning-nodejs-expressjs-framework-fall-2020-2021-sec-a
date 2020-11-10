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
			userModel.getId(user.password, user.username, (result) => {
				if(result[0].designaation == 'admin'){
					res.render('/home/adminView', { name: user.username, id: result[0].id} );
				} else {
					res.render('/home/employeeView', { name: user.username, id: result[0].id});
				}
			});
		}else{
			res.redirect('/login');
		}
	});
}); 

module.exports = router;