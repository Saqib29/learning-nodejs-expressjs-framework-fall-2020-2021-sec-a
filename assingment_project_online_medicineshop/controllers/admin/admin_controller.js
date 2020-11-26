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
        res.render('admin/profile', { user : req.session.user, customers : results, medicines : medicines });
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



module.exports = router;