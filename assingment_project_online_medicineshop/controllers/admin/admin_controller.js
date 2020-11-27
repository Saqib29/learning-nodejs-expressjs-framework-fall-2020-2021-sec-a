const express                                         = require('express');
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
        res.render('admin/edit_profile', { user : result[0] });
        // console.log(result);
    });
    // res.send(req.params.id);
});
router.post('/edit_profile/:id', (req, res) => {
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
});

module.exports = router;