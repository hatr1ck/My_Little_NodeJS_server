const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {User} = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
}); 
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: '107637168141-h8j7h2js297dfsui15d2n6v4oifnlr0p.apps.googleusercontent.com',
        clientSecret: '0fGmVM-5oE2lSLscbfakZbaW',
        callbackURL: 'http://localhost:3300/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        console.log("1");
        User.findOne({googleId: profile.id}).then((currentUser) => {
            console.log("2");
            if(currentUser){
                console.log("3");
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                console.log("4");
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.image.url
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);
