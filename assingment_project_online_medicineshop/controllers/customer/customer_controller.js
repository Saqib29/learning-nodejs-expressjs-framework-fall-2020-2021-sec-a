const express               = require('express');
const customer_operation    = require.main.require('./models/customer');

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
        res.render('customer/edit_profile', { user : result[0] });
    });
});

router.post('/edit_profile/:id', (req, res) => {
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
});

module.exports = router;