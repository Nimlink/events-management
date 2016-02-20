var app = angular.module('fup');

/*
 * Service for DB queries
 */
app.service('dbQueriesService', function ($http) {

    // stocks
    this.getTowns = function () {
        return $http.get('/api/towns');
    };

});
