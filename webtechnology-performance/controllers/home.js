const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{
	// console.log(req.session.password);
	// console.log(req.session.username);
	// console.log(req.session.users.length);
	if(req.cookies['uname'] == req.session.username){
		res.render('home/index', {name: req.session.username, id:'123'});		
	}else{
		res.redirect('/login');
	}
});


router.get('/userlist', (req, res)=>{

	if(req.cookies['uname'] == req.session.username){
	
		res.render('home/userlist', {users: req.session.users});		
	}else{
		res.redirect('/login');
	}
})

module.exports = router;
