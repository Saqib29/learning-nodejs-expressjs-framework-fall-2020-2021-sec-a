const express                                         = require('express');
const admin_operation                                 = require.main.require('./models/admin');


const router        = express.Router();


router.get('/profile', (req, res) => {
    admin_operation.get_customers((results) => {
       
        console.log(results);
        
        if(req.session.user.user_roll == 'admin'){
            res.render('admin/profile', { user : req.session.user, customers : results });
        } else if (req.session.user.user_roll == 'customer') {
            res.render('customer/profile', { user : req.session.user });
        }

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



module.exports = router;