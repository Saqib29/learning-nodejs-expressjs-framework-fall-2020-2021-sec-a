const express = require('express');


const router = express.Router();

router.get('*', (req, res, next) => {
    if(req.session.username == null){
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/admin', (req, res) => {
    res.render('home/adminView', req.session.user);
});

router.get('/employee', (req, res) => {
    res.render('home/employee', req.session.user);
});

module.exports = router;