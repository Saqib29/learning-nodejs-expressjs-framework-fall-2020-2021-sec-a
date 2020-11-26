const { urlencoded }                                  = require('body-parser');
const express                                         = require('express');
const { check, validtionResult, validationResult }    = require('express-validator');
const user_db_connection                              = require('../models/user');
const admin_operation                                 = require('../models/admin');
const { route } = require('./admin/admin_controller');

const router               = express.Router();

// get pos route for login
router.get('/login', (req, res) => {
    res.render('home/login', { username: 'undefined', password: 'undefined'});
});

router.post('/login', [
        check('username', 'input valid username').not().isEmpty(),
        check('password', 'password must be 6+ charachter').not().isEmpty().isLength({ min : 6})
    ], (req, res) => {
        var error = validationResult(req);
        if(!error.isEmpty()) {
            res.render('home/login', { username: (error.mapped().username) ? error.mapped().username : 'undefined', password: (error.mapped().password) ? error.mapped().password : 'undefined'});
        } 
        else {
            var user = {
                username: req.body.username,
                password: req.body.password
            };
            user_db_connection.validate(user, (result) => {
                if(result.length > 0){

                    req.session.user = {
                        id: result[0].id,
                        username: result[0].username,
                        password: result[0].password,
                        contact: result[0].contact,
                        address: result[0].address,
                        user_roll: result[0].user_roll
                    };

                    if(req.session.user.user_roll == 'admin'){
                        res.redirect('/admin/profile');
                    } else if (req.session.user.user_roll == 'customer') {
                        res.redirect('customer/profile');
                    }
                    // res.redirect('/admin/profile');
                } 
                else {
                    res.render('home/wrong');
                }
            });
            // console.log(req.body);
        }
        // console.log(error.mapped());
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

router.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/home/login');
});


module.exports = router;