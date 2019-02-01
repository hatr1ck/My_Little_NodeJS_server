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
const expressValidator = require('express-validator');
const session = require('express-session');
const helmet = require('helmet');
const server = app.listen(3300, () => {
    console.log('app now listening for requests on port 3300');
});
// Add headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(helmet());

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['cookieKey']
}));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());
// connect to mongodb
mongoose.connect('mongodb://ImIn:1k2k3k4k@ds131753.mlab.com:31753/mydb',{ useNewUrlParser: true }).then(()=>{
    console.log('connected to mLab')
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/list', listRoutes);
// app.get('/', (req, res) => {
//     res.render('home', { user: req.user });
// // });
// app.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//       res.redirect('http://localhost:3000/login1');
// });
//app.use('/', express.static(path.join(__dirname, './build')));
//app.use(express.static('dist'));

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});
//web sockets
const io = require('socket.io').listen(server);
io.on('connection', (socket) => {
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})