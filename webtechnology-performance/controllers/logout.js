const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{

	//req.session.uname = "";
	//res.cookie('uname', '');
	
	req.session.username = '';
	req.session.password = '';

	res.clearCookie('uname');
	res.redirect('/login');
});


module.exports = router;



