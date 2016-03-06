var express = require('express');
var util = require('./util');
var router = express.Router();
var userService = require('../../service/userService');
var UserModel = require('../../model/user');

module.exports = function (passport, authService) {

    router.post('/login',
        passport.authenticate('local',
        function (req, res, next) {
            console.log(req.body);
        }));

    router.post('/signin', passport.authenticate('local', {failureFlash: true}),
        function (req, res, next) {
            req.session.user = req.user;
            return res.json(req.user);
        });

    router.get('/logout', function (req, res) {
        if (req.session) {
            req.session.destroy();
        }
        req.logout();
        res.json({});
    });

    return router;
};
