var LocalStrategy = require('passport-local').Strategy;
var userService = require('./userService');

module.exports = function (passport, authService) {
    passport.use(new LocalStrategy({
            usernameField: 'mail',
            passwordField: 'password',
            session: false
        }, function (mail, password, callback) {
            userService.isOwnerAuthorized(mail, password, function (err, user) {
                return authService.authenticate(err, user, callback);
            });
        }));
};
