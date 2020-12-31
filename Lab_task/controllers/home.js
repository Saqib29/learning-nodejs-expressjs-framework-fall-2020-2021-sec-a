const express = require('express');
const router = express.Router();


router.get('*', (req, res, next) => {
    if(req.session.username == ""){
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/admin', (req, res) => {
    res.render('home/adminView', req.session.user);
});

router.get('/employee', (req, res) => {
    res.render('home/employeeView', req.session.user);
});

router.get('/get_api', (req, res) => {
	res.json({
		'Name' : 'Saqib Aminul Islam',
		'Id'   : '17-34879-2'
	});
})

module.exports = router;