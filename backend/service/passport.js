var UserModel = require('../model/user');

module.exports = function(passport) {

    passport.serializeUser(function (user, callback) {
        callback(null, user.mail);
    });

    passport.deserializeUser(function (mail, callback) {
        UserModel.getOwnerByMail(mail, function (err, user) {
            if (err) {
                return callback(err);
            }
            callback(null, user);
        });
    });
};
