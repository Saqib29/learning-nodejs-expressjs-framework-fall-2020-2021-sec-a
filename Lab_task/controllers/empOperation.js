const express = require('express');
const operation         = require.main.require('./models/empOperationModel');
// const user_operation    = require.main.require('./models/operationModel');

const router = express.Router();

router.get('*', (req, res, next) => {
    if(req.session.username == ""){
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/viewJobs', (req, res) => {
    operation.getById(req.session.user.id, (results) => {
        res.render('empOperation/joblist', { users: results });
    });
});

router.get('/addjob', (req, res) => {
    res.render('empOperation/addjob');
});

router.post('/addjob', (req, res) => {
    // need to work from here------------->
});


module.exports = router;