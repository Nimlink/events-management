var express = require('express');
var util = require('./util');
var router = express.Router();
var userService = require('../../service/userService');
var UserModel = require('../../model/user');

module.exports = function (passport, authService) {

    router.get('/profile', authService.ensureAuthorized(), function (req, res) {

        var mail = req.decoded.user.mail;
        async.series([
            async.apply(users.getOwnerByMail, mail)
        ], function (err, user) {
            if (err) {
                return util.handleError(err, res);
            }
            return res.json(user);
        });
    });

    router.get('/negotiate', passport.authenticate('negotiate', {failureFlash: true, session: false}),
        function (req, res, next) {
            // SHOULD be called only if negotiate authenticate successful
            res.json(req.user);
        }
    );

    router.post('/login',
        passport.authenticate('local', {successReturnToOrRedirect: '/', failureRedirect: '/ws/auth/loginpage'}),
        function (req, res, next) {
        });

    router.post('/signin', passport.authenticate('local', {failureFlash: true}),
        function (req, res, next) {
            req.session.user = req.user;
            return res.json(req.user);
        });

    router.get('/loginpage', function (req, res) {
        res.redirect('../../login.html');
    });

    router.get('/logout', function (req, res) {
        if (req.session) {
            //req.session.reset();
            req.session.destroy();
        }

        req.logout();
        //res.redirect('/ws/auth/loginpage');
        res.json({});
    });

    return router;
};
