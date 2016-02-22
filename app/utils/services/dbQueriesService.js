var app = angular.module('fup');

/*
 * Service for DB queries
 */
app.service('dbQueriesService', function ($http) {

    this.getTowns = function () {
        return $http.get('/api/towns');
    };

    this.postSearchTenant = function (data) {
        return $http.post('/api/tenants', data);
    };

    this.getTenant = function (hash) {
        return $http.get('/api/tenants/' + hash);
    };

    this.getOwner = function () {
        return $http.get('/api/owners/5');
    };

    this.postNote = function (data) {
        return $http.post('/api/notes', data);
    };

});
