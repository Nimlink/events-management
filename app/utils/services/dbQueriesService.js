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

    this.getTenant = function (id) {
        return $http.get('/api/tenants/' + id);
    };

    this.getNoteForTenant = function (id) {
        return $http.get('/api/tenants/' + id);
    };

});
