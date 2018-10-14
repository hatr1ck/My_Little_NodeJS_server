const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const listRoutes = require('./routes/list-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
// Add headers
app.set('view engine', 'ejs');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });
// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['cookieKey']
}));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());
// connect to mongodb
mongoose.connect('mongodb://ImIn:1k2k3k4k@ds131753.mlab.com:31753/mydb', () => {
    console.log('connected to mongodb');
});
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/list', listRoutes);
// app.get('/', (req, res) => {
//     res.render('home', { user: req.user });
// });
app.use('/', express.static(path.join(__dirname, './build')));
// app.use(express.static('dist'));
app.listen(3300, () => {
    console.log('app now listening for requests on port 3100');
});
