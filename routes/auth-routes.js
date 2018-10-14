const router = require('express').Router();
const passport = require('passport');
const {Login} = require('../models/user-model');



// User.findOne({googleId: profile.id}).then((currentUser) => {
//     if(currentUser){
//         // already have this user
//         console.log('user is: ', currentUser);
//         done(null, currentUser);
//     } else {
//         // if not, create user in our db
//         new User({
//             googleId: profile.id,
//             username: profile.displayName,
//             thumbnail: profile._json.image.url
//         }).save().then((newUser) => {
//             console.log('created new user: ', newUser);
//             done(null, newUser);
//         });
//     }
// });
//site login
router.post('/addnew', (req, res) => {
//     Login.findOne(req.body.username).then(() => {
// console.log('fuck you');
//     });
if(Login.findOne(req.body.username)){
    console.log('m8');
    res.send('kek');
}
else{
    let add = new Login(req.body);
    add.save().then((dat)=>{
      res.send(dat);
      console.log(dat);
    }
    );

}});
// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
     //res.send(req.user);
     console.log(req.user);
     res.redirect('http://localhost:3300/login1/');
});

module.exports = router;
