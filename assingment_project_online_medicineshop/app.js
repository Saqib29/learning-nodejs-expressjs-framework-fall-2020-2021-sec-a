const express                   = require('express');
const expressSession            = require('express-session');
const bodyParser                = require('body-parser');


const app                       = express();
const port                      = process.env.port || 8080;

// middleware
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('welcome');
});


app.listen(port, (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log(`Server started at ${port}`);
    }
});