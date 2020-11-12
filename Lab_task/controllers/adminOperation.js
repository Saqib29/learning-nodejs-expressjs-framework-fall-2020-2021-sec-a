const express           = require('express');
const operation         = require.main.require('./models/operationModel');

const router            = express.Router();

router.get('*', (req, res, next) => {
    if(req.session.username == ""){
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/userlist', (req, res) => {
    operation.getAll((result) => {
        res.render('adminOperation/userlist', { users: result} );
    });
});

router.get('/search_user', (req, res) => {
    res.render('adminOperation/search_user');
});

router.post('/search_user', (req, res) => {
    console.log(req.body);
});

router.get('/update/:id', (req, res) => {
    operation.getById(req.params.id, (result) => {
        res.render('adminOperation/update', { user: result[0] });
    });
});

router.post('/update/:id', (req, res) => {
    var user = {
        id: req.params.id,
        username: req.body.username,
        password: req.body.password,
        empName: req.body.empName,
        compName: req.body.compName,
        conctNo: req.body.conctNo,
    };
    console.log(user);
    operation.update(user, (result) => {
        if(result) {
            res.redirect('/adminOperation/userlist');
        } else {
            res.send('<h1>Something went wrong!</h1>');
        }
    });
});

router.get('/register', (req, res) => {
    res.render('adminOperation/register');
});

router.post('/register', (req, res) => {
    var user = {
        username: req.body.username,
        password: req.body.password,
        empName: req.body.empName,
        compName: req.body.compName,
        conctNo: req.body.conctNo,
        jobTitle: req.body.jobTitle,
        jobLoc: req.body.jobLoc,
        salary: req.body.salary,
        userRoll: req.body.userRoll
    };
    operation.insert(user, (result) => {
        if(result){
            res.redirect('/adminOperation/userlist');
        } else{
            res.send('<h1>Something went wrong!</h1>');
        }
    });
});


router.get('/delete/:id', (req, res)=>{
	operation.getById(req.params.id, (result) => {
		res.render('adminOperation/delete', { user: result[0] });
	});

});

router.post('/delete/:id', (req, res)=>{
	operation.delete(req.params.id, (result) => {
		if(result) {
            res.redirect('/adminOperation/userlist');
        } else {
            res.send('<h1>Something went wrong!</h1>');
        }
	});
});


module.exports = router;