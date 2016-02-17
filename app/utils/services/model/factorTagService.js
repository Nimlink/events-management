var app = angular.module('fup');

/*
 * Service for the factor group
 */
app.service('factorTagService', function (dbQueriesService, $q) {

    var tags = [];

    // clear object
    this.clear = function () {
        tags = [];
    };

    this.getTags = function () {
        return tags;
    };

    // load factor tags
    this.init = function (callback) {
        this.clear;
        dbQueriesService.getFactorTags().success(function (data) {
            tags = data;
            callback(null);
        });
    };

    // create a tag factor
    this.createTag = function (tag) {
        var deferred = $q.defer();
        dbQueriesService.addFactorTag(tag).success(function (data) {
            deferred.resolve(data);
            tags.push(data);
        });
        return deferred.promise;
    }
})
;
