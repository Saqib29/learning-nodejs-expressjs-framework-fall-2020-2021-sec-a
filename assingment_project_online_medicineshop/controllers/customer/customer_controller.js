const express           = require('express');

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
    res.send('Set me up');
});

module.exports = router;