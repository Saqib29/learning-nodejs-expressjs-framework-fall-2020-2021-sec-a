const express 	= require('express');
const router 	= express.Router();


router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

	if(req.body.password == req.body.password){
		
		req.session.users = [
			['1', 'saqib', '123', 'saqib@email.com'],
			['2', 'aminul', '456', 'aminul@email.com'],
			['3', 'alamin', '123', 'alamin@gmail.com']
		];
		
		req.session.username = req.body.username;
		req.session.password = req.body.password;

		
		res.cookie('uname', req.body.username);
		res.redirect('/home');

	}else{
		res.redirect('/login');
	}
}); 


module.exports = router;



