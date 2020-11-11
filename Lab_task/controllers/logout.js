const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{

    // removing session
	req.session.username = "";
    req.session.password = "";
    req.session.user = {};
	
	res.redirect('/login');
});


module.exports = router;
