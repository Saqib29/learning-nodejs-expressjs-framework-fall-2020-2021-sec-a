const express                                         = require('express');
const { check, validationResult }                     = require('express-validator');
const admin_operation                                 = require.main.require('./models/admin');


const router        = express.Router();


router.get('*', (req, res, next) => {
    if(req.session.user == null) {
        res.redirect('/home/logout');
    }
    else {
        next();
    }
});

router.get('/profile', (req, res) => {
    admin_operation.get_customers((results) => {
       admin_operation.get_medicines((medicines) => {
           admin_operation.purchase_list((purchase_list) => {
            //    console.log(purchase_list);
            admin_operation.get_orders((orders) => {

                res.render('admin/profile', { user : req.session.user, customers : results, medicines : medicines, purchases : purchase_list, orders : orders });
            });
           });
       });
        // console.log(results);
        
    });
});

router.post('/add_medicine', (req, res) => {
    admin_operation.add_medicine(req.body, (status) => {
        if(status) {
            res.redirect('/admin/profile');
        } 
        else {
            res.send(`<h1>Medicine doesn't added</h1>`);
        }
    });
});

router.get('/edit_profile/:id', (req, res) => {
    admin_operation.getById(req.params.id, (result) => {
        res.render('admin/edit_profile', { user : result[0], password : 'undefined', repassword : 'undefined' });
        // console.log(result);
    });
    // res.send(req.params.id);
});
router.post('/edit_profile/:id', [
        check('password', 'must be 6+ character').not().isEmpty().isLength({ min : 6 }),
        check('repassword', 'must be 6+ character').not().isEmpty().isLength({ min : 6 })
    ], 
    (req, res) => {

        const error = validationResult(req);

        if(!error.isEmpty()){
            // console.log(error.mapped());
            const er = error.mapped();
            admin_operation.getById(req.params.id, (result) => {

                res.render('admin/edit_profile', { user : result[0], password : (er.password) ? er.password : 'undefined', repassword : (er.repassword) ? er.repassword : 'undefined' });
            });
        }
        else{
            if(req.body.password == req.body.repassword){
            
                admin_operation.update(req.body, (status) => {
                    if(status){
                        res.redirect('/home/logout');
                    }else {
                        res.send(`<h1>Pasword doesn't matched!</h1><p><a href="/admin/edit_profile/${req.params.id}">Try again</a></p>`)
                    }
                });
                // res.send('you did');
            }
            else {
                res.send(`<h1>Pasword doesn't matched!</h1><p><a href="/admin/edit_profile/${req.params.id}">Try again</a></p>`);
            }
        }

        
});

router.get('/view_customer/:id', (req, res) => {
    // console.log(req.params.id);
    admin_operation.getById(req.params.id, (result) => {
        var user = result[0];
        res.render('admin/customer_view', { customer : user });
    });
});

router.get('/delete_customer/:id', (req, res) => {
    admin_operation.delete_customer(req.params.id, (status) => {
        if(status){
            res.redirect('/admin/profile');
        } else {
            res.send('<h1>Something went wrong!</h1>');
        }
    });
});

module.exports = router;