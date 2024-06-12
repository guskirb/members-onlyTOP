const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verify = async (username, password, done) => {
    try {
        const user = await User.findOne({ email: username });
        if (!user) {
            return done(null, false, {});
        };

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, {});
        };

        return done(null, user);
    } catch (err) {
        return done(err);
    };
};

const serialize = (user, done) => {
    done(null, user.id);
};

const deserialize = async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    };
};

function initialize(passport) {
    passport.use(
        new LocalStrategy(customFields, verify)
    )
    passport.serializeUser(serialize);
    passport.deserializeUser(deserialize);
};

module.exports = initialize;