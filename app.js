
const express = require('express')

const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const {Model, Login} = require('./models/model.js');
const passport = require('passport');
const passportSetup = require('./passport/setup');
const router = express.Router();
const app = express();
const cookieSession = require('cookie-session');

mongoose.connect('mongodb://localhost:27017/WTH');
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:['cookieKey']
}));
//initialize passport
app.use(passport.initialize());
app.use(passport.session());
/////////////////////////////////////////////////// 
app.post('/add', function(req, res, next){
  console.log("anythin");
  new Model(req.body);
  add.save().then((dat)=>
    res.send(dat)
  );
  
});
app.post('/adduser', function(req, res, next){
  console.log("whaat");
  let add = new Login(req.body);
  add.save().then((dat)=>
    res.send(dat)
  );
  
});

app.get('/add', function(req, res, next){

    Model.find(function (err, data) {
      res.send(data);
}
)});

app.delete('/delete/:id', function(req, res, next){
  Model.findByIdAndRemove({_id:req.params.id}).then((what)=>{
    res.send(what);
  });
  console.log("love is blind");
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('you reached the redirect URI');
});

app.use(express.static('dist'));
app.listen(3001, () => console.log('RUN!'));