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
        dbQueriesService.getTenant(id).then(
            function (res) {
                callback(null, res.data);
            },
            function (res) {
                callback(new Error('Failed'));
            });
    };

});
