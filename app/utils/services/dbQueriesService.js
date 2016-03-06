var app = angular.module('fup');

/*
 * Service for DB queries
 */
app.service('dbQueriesService', function ($http) {

    this.getTowns = function (search) {
        return $http.get('/api/towns/' + search);
    };

    this.postSearchTenant = function (data) {
        return $http.post('/api/tenants', data);
    };

    this.getTenant = function (hash) {
        return $http.get('/api/tenants/' + hash);
    };

    this.getOwner = function () {
        return $http.get('/api/owners');
    };

    this.createOwner = function (data) {
        return $http.post('/api/owners', data);
    };

    this.mailPassword = function (data) {
        return $http.post('/api/pass', data);
    };

    this.postNote = function (data) {
        return $http.post('/api/notes', data);
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
