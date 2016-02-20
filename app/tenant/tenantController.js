/**
 * MainCtrl - controller
 */
function tenantCtrl($rootScope, $stateParams, scope, $modal, $location, townService, $translate, $log, $mdMedia, $mdDialog) {

    var id = $stateParams,id;

    async.parallel([
        getStockData,
        resizeLogo
    ], function (err, result) {

    });

};

angular
    .module('fup')
    .controller('tenantCtrl', tenantCtrl)
