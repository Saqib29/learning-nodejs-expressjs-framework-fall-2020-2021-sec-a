const { urlencoded } = require('body-parser');
const express                       = require('express');
const { check, validtionResult, validationResult }    = require('express-validator');
const db = require('../models/db');

const router               = express.Router();

// get pos route for login
router.get('/login', (req, res) => {
    res.render('home/login');
});

router.post('/login', (req, res) => {

});

// get post router for registration
router.get('/registration', (req, res) => {
    res.render('home/registration', { alert: 'undefind'});
});

router.post('/registration', [
    check('username', 'username atleast 3+ character needed')
    .exists().isLength({ min: 3 })

    ], (req, res) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            // return res.json(error.array()[0].msg);
            const alert = error.array()[0];

            res.render('home/registration', { alert });
        }
        var user = {
            username: req.body.username,
            password: req.body.password,
            contNo:   req.body.contNo,
            userRoll: req.body.userRoll
        }
        // console.log(user);
        db.insert(user, (status) => {
            if(status) {
                res.redirect('/home/login');
            } else {
                res.send("<h1>Ops! Something went wrong!</h1>");
            }
        });
});



module.exports = router;