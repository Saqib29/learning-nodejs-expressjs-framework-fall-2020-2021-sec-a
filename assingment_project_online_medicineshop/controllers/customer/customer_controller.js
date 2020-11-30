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
        if( result[0].availability >= object.medicine_quantity) {
            customer_operation.update_medicine({
                availability: parseInt(result[0].availability) - parseInt(object.medicine_quantity),
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
                            res.json({ outcome : true });
                        } else {
                            res.json({ outcome : false });
                        }
                        // console.log(status);
                    });
                    // console.log(result);
                } else {
                    res.json({ outcome : false });
                }
            });
        } else {
            res.json({ outcome : false });
        }
    });
    
    // console.log(req.body);
});

router.get('/remove/:id/:medicine_id/:quantity', (req, res) => {
    customer_operation.get_medicine_ById(req.params.medicine_id, (result) => {
        customer_operation.update_medicine({
            availability: parseInt(result[0].availability) + parseInt(req.params.quantity),
            id          : req.params.medicine_id
        }, (status) => {
            if(status) {
                customer_operation.delete_from_cart(req.params.id, (status) => {
                    if(status){
                        res.redirect('/customer/profile');
                    } else {
                        res.json({ outcome : false });
                    }
                });
            } else {
                res.json({ outcome : false });
            }
        });
        // console.log(result[0].availability);
        // console.log();
    });
    // console.log(req.params);
});

router.get('/placeorder/:id', (req, res) => {
    customer_operation.get_from_cart(req.params.id, (result) => {
        customer_operation.getById(result[0].customer_id, (user) => {
            customer_operation.insert_order({
                customer_name   : user[0].username,
                customer_number : user[0].contact,
                medicine_name   : result[0].medicine_name,
                quantity        : result[0].quantity,
                price           : result[0].price,
                date            : new Date().toISOString().slice(0, 10)
            }, (status) => {
                if(status) {
                    customer_operation.delete_from_cart(result[0].id, (status) => {
                        if(status){
                            res.redirect('/customer/profile');
                        }else {
                            res.send("<h1>Something went wrong!</h1>");
                        }
                    });
                } else {
                    res.send("<h1>Something went wrong!</h1>");
                }
            });
            // console.log(user[0]);
            // console.log(result[0]);
        });
    });
    // console.log(req.params.id);
});

module.exports = router;