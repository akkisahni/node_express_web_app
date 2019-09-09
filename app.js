const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('EXPRESS_POC');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));
require('./src/config/passport')(app);
// require('./src/config/passport.js')(app);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

//CODE TO FETCH THE ENVIRONMENT VARIABLES FROM .ENV files
//console.log('value of foo before setting', process.env.Foo);
const result = require('dotenv').config({path: path.resolve(process.cwd(), 'config', process.env.NODE_ENV+'.env' )});
// node -r dotenv/config server.js
//console.log('value of foo after setting', result.parsed);

const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }
];


// MIDDLEWARE EXAMPLE
app.use((req, res, next)=>{
  debug("INSIDE MY MIDDLEWARE");
  if(req.user){
    res.locals.login = true;
  }
  else{
    res.locals.login= false;
  }
  next();
});

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')();
const authRouter = require('./src/routes/authRoutes')(nav);
app.use('/books', bookRouter);
app.use('/authors', adminRouter )
app.use('/auth', authRouter);



app.get('/', (req, res) => {
  res.render('index', {nav, title: 'Library'} );
  // res.sendFile(path.join(__dirname,'views/index.html'));
  // res.send("Hello world application");
});

app.listen(3000, () => {
  console.log(chalk.green(process.argv));
  debug(`App is running on port ${chalk.green(3000)}`);
});

// command to run debug mode in local is   ---> DEBUG=* node app.js
// or
// DEBUG="EXPRESS_POC" node app.js
// for WINDOWS it will be --> set DEBUG="EXPRESS_POC" & node app.js
