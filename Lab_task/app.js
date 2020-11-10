//declaration
const express 			= require('express');	
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');

const login 			= require('./controllers/login');
const home				= require('./controllers/home');
const adminOpeartion	= require('./controllers/adminOperation');
const empOperation 		= require('./controllers/empOperation');

const app				= express();
const port				= 3000;

//configuration
app.set('view engine', 'ejs');


//middleware
app.use('/abc', express.static('assets'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));

app.use('/login', login);
app.use('/home', home);
app.use('/adminOperation', adminOpeartion);
app.use('./empOperation', empOperation);

//router
app.get('/', (req, res)=>{
	res.send('Welcome');
});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});