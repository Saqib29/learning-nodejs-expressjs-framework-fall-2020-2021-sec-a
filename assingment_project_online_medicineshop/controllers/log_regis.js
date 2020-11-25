const { urlencoded }                                  = require('body-parser');
const express                                         = require('express');
const { check, validtionResult, validationResult }    = require('express-validator');
const user_db_connection                              = require('../models/user');

const router               = express.Router();

// get pos route for login
router.get('/login', (req, res) => {
    res.render('home/login');
});

router.post('/login', (req, res) => {

});

// get post router for registration
router.get('/registration', (req, res) => {
    res.render('home/registration', { username : 'undefined', password : 'undefined' });
});

router.post('/registration', [
    check('username', 'must insert valid username').not().isEmpty(),
    check('password', 'must be at least 6 characters').not().isEmpty().isLength({ min : 6})

    ], (req, res) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            // return res.json(error.array()[0].msg);
            // console.log(error.array()[1]);
            // console.log(error.mapped());
            res.render('home/registration', { username: (error.mapped().username) ? error.mapped().username : 'undefined', password: (error.mapped().password) ? error.mapped().password : 'undefined'});
        }
        else{
            var user = {
                username: req.body.username,
                password: req.body.password,
                contact:   req.body.contact,
                user_roll: req.body.user_roll
            }
            // console.log(user);
            user_db_connection.insert(user, (status) => {
                if(status) {
                    res.redirect('/home/login');
                    // console.log(status);
                } else {
                    res.send("<h1>Ops! Something went wrong!</h1>");
                    console.log(status);
                }
            });
        }
});



module.exports = router;