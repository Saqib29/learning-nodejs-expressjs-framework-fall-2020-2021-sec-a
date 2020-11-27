const express               = require('express');
const customer_operation    = require.main.require('./models/customer');

const router            = express.Router();

router.get('*', (req, res, next) => {
    if(req.session.user == null) {
        res.redirect('/home/logout');
    }
    else {
        next();
    }
});

router.get('/profile', (req, res) => {

    res.render('customer/profile', { user : req.session.user });
});

module.exports = router;