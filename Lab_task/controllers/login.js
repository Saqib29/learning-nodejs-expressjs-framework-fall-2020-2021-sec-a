const express           = require('express');
const operation         = require.main.require('./models/operationModel');
const router            = express.Router();

router.get('/', (req, res) => {
    res.render('login/login');
});

router.post('/', (req, res) => {
    
    var user = {
        username: req.body.username,
        password: req.body.password
    };

    operation.validate(user, (status) => {
        if(status) {
            res.send('True');
        } else {
            res.send('False');
        }
    });

});

module.exports = router;