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

router.post('/add', (req, res) => {
    var object = {
        medicine_id         : req.body.id,
        medicine_quantity   : req.body.quantity,
        customer_id         : req.session.user.id,
        customer_name       : req.session.user.username,
        customer_number     : req.session.user.contact
    };
    customer_operation.get_medicine_ById(req.body.id, (result) => {
        customer_operation.update_medicine({
            availability: result[0].availability - object.medicine_quantity,
            id          : object.medicine_id
        }, (status) => {
            if(status) {
                customer_operation.add_to_cart({
                    medicine_id     : object.medicine_id,
                    medicine_name   : result[0].name,
                    quantity        : object.medicine_quantity,
                    price           : result[0].price * object.medicine_quantity,
                    customer_id     : object.customer_id
                }, (status) => {
                    if(status) {
                        res.json({ result : true });
                    } else {
                        res.json({ result : false });
                    }
                    // console.log(status);
                });
                console.log(result);
            } else {
                res.json({ result : false });
            }
        });
    });
    
    // console.log(req.body);
});

router.get('/remove/:id/:medicine_id/:quantity', (req, res) => {
    
    console.log(req.params);
});

router.get('/placeorder/:id', (req, res) => {
    console.log(req.params.id);
});

module.exports = router;