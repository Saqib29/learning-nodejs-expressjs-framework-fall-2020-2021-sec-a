const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();


router.get('/', (req, res) => {
    res.render('/registration/registration');
});


router.post('/', (req, res) => {
    var user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        designation: req.body.designation
    };

    userModel.insert(user, (result) => {
		res.send('Inserted: '+result);
	});
});