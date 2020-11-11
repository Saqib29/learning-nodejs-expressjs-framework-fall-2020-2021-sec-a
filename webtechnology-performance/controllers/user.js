const express 	= require('express');
const router 	= express.Router();

router.get('/create', (req, res)=>{
	
	if(req.cookies['uname'] == req.session.username){
		res.render('user/create');
	}else{
		res.redirect('/login');
	}
});

router.post('/create', (req, res)=>{
	
	if(req.cookies['uname'] == req.session.username){
	
		req.session.users.push([req.session.users.length+1, req.body.username, req.body.password, req.body.email]);
		// console.log(req.session.users);
		res.send('New user info:'+
					"<br> Username: "+req.body.username+
					"<br> Password: "+req.body.password+
					"<br> Email: "+req.body.email
				);
	}else{
		res.redirect('/login');
	}
});

router.get('/edit/:id', (req, res)=>{

	//res.send(req.params.id + "<br>"+ req.params.name);
	
	if(req.cookies['uname'] == req.session.username){
		
		
		var index_of = 0;
		for(var i=0, j=0; i<req.session.users.length; i++){
			if(req.params.id == req.session.users[i][0]){
				index_of = i;
				// console.log(index_of);
			}
		}
		
		
		var user = {
			username: req.session.users[index_of][1],
			password: req.session.users[index_of][2],
			email:  req.session.users[index_of][3]
		};
		
		res.render('user/edit', user);
	}else{
		res.redirect('/login');
	}
});

router.post('/edit/:id', (req, res)=>{
	
	if(req.cookies['uname'] == req.session.username){
		//res.send('updated');
		var index_of = 0;
		for(var i=0, j=0; i<req.session.users.length; i++){
			if(req.params.id == req.session.users[i][0]){
				index_of = i;
				
			}
		}
		req.session.users[index_of] = [req.params.id, req.body.username, req.body.password, req.body.email];
		console.log(req.body);
		console.log("req.body.username -> "+req.body.username);
		console.log("req.body.password ->"+req.body.password);
		console.log("req.body.email ->"+req.body.email);
		res.redirect('/home/userlist');
	}else{
		res.redirect('/login');
	}
});

router.get('/delete/:id', (req, res)=>{
	
	if(req.cookies['uname'] == req.session.username){
		// var user = {username: 'alamin', password: '123', email: 'email@gmail.com'};

		var index_of = 0;
		for(var i=0, j=0; i<req.session.users.length; i++){
			if(req.params.id == req.session.users[i][0]){
				index_of = i;
				// console.log(index_of);
			}
		}

		var user = {
			username: req.session.users[index_of][1],
			password: req.session.users[index_of][2],
			email:  req.session.users[index_of][3]
		};
		res.render('user/delete', user);
	}else{
		res.redirect('/login');
	}
});

router.post('/delete/:id', (req, res)=>{
	
	if(req.cookies['uname'] == req.session.username){
		//res.send('done!');
		
		// [req.params.id, req.body.username, req.body.password, req.body.email]

		var index_of = 0;
		
		var index_of = 0;
		for(var i=0, j=0; i<req.session.users.length; i++){
			if(req.params.id == req.session.users[i][0]){
				index_of = i;
				// console.log(index_of);
			}
		}
		// console.log(req.session.users[index_of]);
		req.session.users.splice(index_of, 1);
		
		res.redirect('/home/userlist');
	}else{
		res.redirect('/login');
	}
});

module.exports = router;

