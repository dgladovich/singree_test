const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {user} = require('../models');

module.exports = {
    passport: passport,
    authenticate: () => {

        passport.serializeUser((user, done) => {
            done(null, user.id)
        })
        passport.deserializeUser(async (id, done) => {
            const usr = await user.findOne({where: {id: id}})
            done(null, user)
        })

        // Sign in with username and Password
        passport.use('local', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        }, async (username, password, done) => {

            const usr = await user.findOne({where: {last_name: username}, raw: true});
            if (!usr) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if ( password !== usr.password ) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, usr);
        }))
        return passport;
    },
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        res.send(401, { message: 'User not authenticated' });
    },
}