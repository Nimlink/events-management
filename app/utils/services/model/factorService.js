var app = angular.module('fup');

/*
 * Service for the factor
 */
app.service('factorService', function (dbQueriesService, $q, userService) {

    var factor = {
        tags: [],
        factorlist: {},
        id: '',
        name: '',
        description: '',
        type: 'value',
        hidden: false,
        code: 'result = stock.income(date).net_income / stock.close(date);'
    };

    // clear object
    this.clear = function () {
        factor = {
            tags: [],
            factorlist: {},
            id: '',
            name: '',
            description: '',
            type: 'value',
            hidden: false,
            code: 'result = stock.income(date).net_income / stock.close(date);'
        };
    };

    // get the current factor
    this.getFactor = function () {
        return factor;
    };

    // load factor
    this.loadFactor = function (id_factor) {
        this.clear();
        var deferred = $q.defer();
        dbQueriesService.getFactor(id_factor).success(function (data) {
            // Factor
            factor.id = data.id_factor;
            factor.name = data.name_factor;
            factor.description = data.description;
            factor.code = data.script;
            factor.hidden = data.hidden;
            if (data.type == '%') {
                factor.type = 'percent';
            } else {
                factor.type = 'value';
            }

            // Factor list
            factor.factorlist = {
                name: data.name_factorlist,
                id: data.id_factorlist
            };

            dbQueriesService.getFactorTagsForFactor(id_factor).success(function (data) {
                angular.forEach(data, function (value) {
                    factor.tags.push(value);
                });
                deferred.resolve(factor);
            });
        });
        return deferred.promise;
    };

    // create factor
    this.createOrUpdateFactor = function (factor) {
        var deferred = $q.defer();
        factor.user = userService.getCurrentUser();
        dbQueriesService.addFactor(factor).success(function (data) {
            factor.id = data;
            deferred.resolve(factor);
        });
        return deferred.promise;
    }

    // delete factor
    this.deleteFactor = function (id_factor) {
        var deferred = $q.defer();
        dbQueriesService.delFactor({id: id_factor}).success(function (data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    }
})
;
