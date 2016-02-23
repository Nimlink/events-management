var LocalStrategy = require('passport-local').Strategy;
var userService = require('./userService');

module.exports = function (passport, authService) {
    passport.use(new LocalStrategy({
            usernameField: 'mail',
            passwordField: 'password',
            session: false
        }, function (mail, password, callback) {
            userService.isValidByMail(mail, function (err, user) {
                if (user && !userService.isValidPassword(user, password)){
                    user = null;
                    err = new Error(userService.ERRORS_CODE.NO_EMAIL_FOUND);
                }
                return authService.authenticate(err, user, callback);
            });
        }));
};
