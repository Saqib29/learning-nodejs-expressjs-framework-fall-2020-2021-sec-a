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
    operation.getByuser_Id(req.session.user.id, (results) => {
        res.render('empOperation/joblist', { users: results });
    });
});

router.get('/addjob', (req, res) => {
    res.render('empOperation/addjob');
});

router.post('/addjob', (req, res) => {
    var user = {
        compName: req.body.compName,
        jobTitle: req.body.jobTitle,
        jobLoc: req.body.jobLoc,
        salary: req.body.salary,
        user_id: req.session.user.id
    };
    operation.insert(user, (result) => {
        if(result) {
            operation.updateUsertable(user, (result) => {
                res.redirect('/empOperation/viewjobs');
            });
            
        } else {
            res.send('<h1>Something went wrong!</h1');
        }
    });
});

router.get('/update/:id', (req, res) => {
    
    operation.getById(req.params.id, (result) => {
        res.render('empOperation/update', { user: result[0] });
    });
});

router.post('/update/:id', (req, res) => {
    var user = {
        id: req.params.id,
        compName: req.body.compName,
        jobTitle: req.body.jobTitle,
        jobLoc: req.body.jobLoc,
        salary: req.body.salary
    };
    operation.update(user, (result) => {
        if(result) {
            res.redirect('/empOperation/viewJobs');
        } else {
            res.send('<h1>Somethingf went wrong!</h1>');
        }
    });
});



module.exports = router;