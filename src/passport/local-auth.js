const passport = require('passport');
const user = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Data serialization in the browser
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Database query with id
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Function that validates the registration data
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await User.findOne({email: email});
    if(user) {
        return done(null, false, req.flash('signupMessage', 'The email is already register'));
    }else {

        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }
}));

// Function that validates the login data
passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await User.findOne({email: email});
    if(!user) {
        return done(null, false, req.flash('signinMessage', 'No User found'));
    }
    if(!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
    }
    done(null, user);
}));