const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const {Login} = require('../models/model');

passport.serializeUser((user, done)=>{
    done(null, user.id)
});
passport.deserializeUser((id, done)=>{
    Login.findById(id).then((user)=>{
        done(null, user)
    })
});
passport.use(new GoogleStrategy({
    clientID:'107637168141-h8j7h2js297dfsui15d2n6v4oifnlr0p.apps.googleusercontent.com',
    clientSecret: 'lIkxXbcKK7nTbQUIGvTtXRFG',
    callbackURL: '/auth/google/redirect'
},(accessToken, refreshToken, profile, done)=>{
    Login.findOne({
        googleID: profile.id
    }).then((iftrue)=>{
        if(iftrue){
            console.log('huh, got one'+iftrue);
            done(null, iftrue);
        }
        else{
            new Login({
            login: profile.displayName,
            email: 'from google',
            googleID: profile.id
          }).save().then(()=>{
            done(null, user);  
            console.log('sucksASS')}
          );
        }
    })
    
   
}))