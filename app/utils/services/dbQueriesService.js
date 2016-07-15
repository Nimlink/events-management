var app = angular.module('fup');

/*
 * Service for DB queries
 */
app.service('dbQueriesService', function ($http) {

    this.mailPassword = function (data) {
        return $http.post('/api/pass', data);
    };

    this.auth_login = function (data) {
        return $http.post('/api/auth/signin', data);
    };

    this.validate_mail = function (hash) {
        return $http.get('/api/activation/mail/' + hash);
    };

    this.auth_logout = function (data) {
        return $http.post('/api/auth/logout', data);
    };
});
