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
        res.render('adminOperation/userlist', { users: result} );
    });
});

router.get('/update/:id', (req, res) => {
    operation.getById(req.params.id, (result) => {
        res.render('adminOperation/update', { user: result[0] });
    });
});

router.post('/update/:id', (req, res) => {
    
});

module.exports = router;