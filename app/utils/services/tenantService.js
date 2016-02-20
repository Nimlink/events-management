var app = angular.module('fup');

app.service('tenantService', function (dbQueriesService, $q) {

    this.searchTenant = function (data) {
        var users = [];
        var deferred = $q.defer();

        dbQueriesService.postSearchTenant(data).then(
            function (res) {
                users = res;
                deferred.resolve(users);
            },
            function (res) {
                deferred.reject(res.data);
            });

        return deferred.promise;
    };

    this.getTenant = function (id, callback) {
        var user = {};
        var deferred = $q.defer();

        dbQueriesService.getTenant(id).then(
            function (res) {
                user = res;
                deferred.resolve(user);
                callback(null);
            },
            function (res) {
                deferred.reject(res.data);
                callback(new Error('Failed'));
            });

        return deferred.promise;
    };

});
