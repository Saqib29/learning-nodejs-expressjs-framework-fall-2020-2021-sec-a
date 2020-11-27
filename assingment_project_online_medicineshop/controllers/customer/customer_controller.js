const express                                         = require('express');
const { check, validationResult }                     = require('express-validator');
const { ValidatorsImpl } = require('express-validator/src/chain');
const customer_operation                              = require.main.require('./models/customer');

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

    customer_operation.medicines((medicines) => {
        customer_operation.cart(req.session.user.id, (cart_lists) => {
            
            res.render('customer/profile', { user : req.session.user, medicines : medicines, lists : cart_lists });
        });

    });
});

router.get('/edit_profile/:id', (req, res) => {
    customer_operation.getById(req.params.id, (result) => {
        res.render('customer/edit_profile', { user : result[0], password : 'undefined', repassword : 'undefined' });
    });
});

router.post('/edit_profile/:id', [
        check('password', 'must be 6+ character ').not().isEmpty().isLength({ min : 6 }),
        check('repassword', 'must be 6+ character').not().isEmpty().isLength({ min : 6 })
    ], 
    (req, res) => {

        const error = validationResult(req);

        if(!error.isEmpty()){
            const er = error.mapped();
            customer_operation.getById(req.params.id, (result) => {
                res.render('customer/edit_profile', { user : result[0], password : (er.password) ? er.password : 'undefined', repassword : (er.repassword) ? er.repassword : 'undefined' });
            });
        }
        else {
            if(req.body.password == req.body.repassword){
            
                customer_operation.update(req.body, (status) => {
                    if(status){
                        res.redirect('/home/logout');
                    }else {
                        res.send(`<h1>Pasword doesn't matched!</h1><p><a href="/customer/edit_profile/${req.params.id}">Try again</a></p>`)
                    }
                });
                // res.send('you did');
            }
            else {
                res.send(`<h1>Pasword doesn't matched!</h1><p><a href="/customer/edit_profile/${req.params.id}">Try again</a></p>`);
            }
        }
});

router.post('/adding_cart', (req, res) => {
    console.log('req.body');
    
});

module.exports = router;