const express           = require('express');
const operation         = require.main.require('./models/operationModel');
const router            = express.Router();

router.get('/', (req, res) => {
    res.render('login/login');
});

router.post('/', (req, res) => {
    
    var user = {
        username: req.body.username,
        password: req.body.password
    };

    // setting session 
    req.session.username = user.username;
    req.session.password = user.password;
    console.log(req.session.username);
    console.log(req.session.password);
    operation.validate(user, (status) => {
        if(status) {
            operation.getId(user.password, user.username, (result) => {

                if (result[0].userRoll == 'admin'){
                    
                    res.render('home/adminView', {
                        id: result[0].id,
                        username: result[0].username,
                        empName: result[0].empName,
                        compName: result[0].compName,
                        contact: result[0].conctNo,
                        jobtitle: result[0].jobTitle,
                        location: result[0].jobLoc,
                        salary: result[0].salary,
                        userRoll: result[0].userRoll
                    });

                    // res.send(result[0]);
                    
                } else {
                    res.render('home/employeeView', {
                        id: result[0].id,
                        username: result[0].username,
                        empName: result[0].empName,
                        compName: result[0].compName,
                        contact: result[0].conctNo,
                        jobtitle: result[0].jobTitle,
                        location: result[0].location,
                        salary: result[0].salary,
                        userRoll: result[0].userRoll
                    });

                    // res.send(result[0]);
                }

            });
        } else {
            res.send('Not Registerted');
        }
    });

});

module.exports = router;