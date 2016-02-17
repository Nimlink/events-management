var app = angular.module('fup');

/*
 * Service for basic maths
 */
app.service('userService', function (dbQueriesService) {

    var user;

    this.init = function (callback) {
        dbQueriesService.getCurrentUser('UserTest').success(function (data) {
            user = {
                id: data.id_user,
                pseudo: data.pseudo
            };
            callback(null);
        });
    }

    this.getCurrentUser = function () {
        return user;
    }

});
