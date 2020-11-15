const express              = require('express');


const router               = express.Router();


router.get('/login', (req, res) => {
    res.render('home/login');
});

router.get('/registration', (req, res) => {
    res.render('home/registration');
});



module.exports = router;