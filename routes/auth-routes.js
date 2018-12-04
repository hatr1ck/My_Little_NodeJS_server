const router = require('express').Router();
const passport = require('passport');
const { Login, User } = require('../models/user-model');
const LocalStrategy = require('passport-local').Strategy;

router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        Login.findById(req.session.passport.user).then((data) => {
            res.send(data.username);
        })
    });
// auth logout
router.get('/logout', (req, res) => {
    current = '';
    req.logout();
    res.send('Logged out');
    //  res.clearCookie('sid', {path: '/'});
    // res.redirect('/');

});

//site login
router.post('/addnew', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    var errors = req.validationErrors();

    if (errors) {
        res.send(errors);
    } else {
        Login.findOne({ email: req.body.email }).then((found) => {
            if (found) {
                res.send('This email is already registered');
            } else {
                Login.findOne({ username: req.body.username }).then((found2) => {
                    if (found2) {
                        res.send('This nickname is already registered');
                    } else {
                        let add = new Login(req.body);
                        add.save().then((dat) => {
                            res.send("Success");
                        })
                    }
                })
            }
        })
    }
})


// auth login
// router.get('/login', (req, res) => {
//     res.render('login', { user: req.user });
// });
passport.use(new LocalStrategy(function(username, password, done) {
    // find the user based off the username (case insensitive)
    Login.findOne({ username: username }).exec(function(err, user) {
        // if any problems, error out
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: "Unknown user: " + username
            });
        }

        // verify if the password is valid
        user.isPasswordValid(password, function(err, isValid) {
            // if any problems, error out
            if (err) {
                return done(err);
            }

            // only return the user if the password is valid
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: "Invalid password"
                });
            }
        });
    });
}));
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Promise.all([Login.findById(id), User.findById(id)]).then((user) => {
        if (user[0]) {
            done(null, user[0]); //forsenE
        } else {
            done(null, user[1]);
        }
    });
});
router.get('/allusers', function(req, res) {
    Promise.all([Login.find(), User.find()]).then((some) => res.send({
        list: some[0].concat(some[1]).map((obj) => {
            return obj.username;
        }),
        current: req.user.username
    }))
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:3300/login1/');
});

module.exports = router;