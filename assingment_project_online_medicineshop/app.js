const express                   = require('express');
const expressSession            = require('express-session');
const bodyParser                = require('body-parser');

const log_regis                 = require('./controllers/log_regis');


const app                       = express();
const port                      = process.env.port || 8080;

// configaration
app.set('view engine', 'ejs');

// middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({ secret: 'secrete value', saveUninitialized: true, resave: false}));

app.use('/home', log_regis);
app.use('/home', log_regis);

app.get('/', (req, res) => {
    res.render('home/welcome');
});


app.listen(port, (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log(`Server started at ${port}`);
    }
});