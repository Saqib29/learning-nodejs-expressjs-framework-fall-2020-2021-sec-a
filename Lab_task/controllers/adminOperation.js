const express           = require('express');
const operation         = require.main.require('./models/operationModel');

const router            = express.Router();

router.get('*', (req, res, next) => {
    if(req.session.username == null){
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/userlist', (req, res) => {
    operation.getAll((result) => {
        res.render('home/userlist', { users: result} );
    });
});

module.exports = router;