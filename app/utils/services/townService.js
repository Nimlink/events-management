var app = angular.module('fup');

/*
 * Service for the factor
 */
app.service('townService', function (dbQueriesService, $q) {

    var towns = [];

    this.getTowns = function () {
        return towns;
    };

    this.init = function (callback) {
        towns = [];
        var deferred = $q.defer();
        dbQueriesService.getTowns().success(function (data) {
            towns = data;
            deferred.resolve(towns);
            callback(null);
        });
        return deferred.promise;
    };
});
