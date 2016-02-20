/**
 * MainCtrl - controller
 */
function newNoteCtrl($rootScope, $scope, $modal, $location, townService, $translate, $log, $mdMedia, $mdDialog) {

    $scope.towns = townService.getTowns();;
    $scope.town = {};
    $scope.town.selected = undefined;

    $scope.note = {};

    $scope.querySearch = function (query) {
        var results = query ? $scope.towns.filter( createFilterFor(query) ) : $scope.towns;
        return results;
    }

    $scope.searchTextChange = function (text) {
        $log.info('Text changed to ' + text);
    }

    $scope.selectedItemChange = function (item) {
        $log.info('Item changed to ' + JSON.stringify(item));
    }

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
            return ((state.postal_code + state.town).toLowerCase().indexOf(lowercaseQuery) >= 0);
        };
    }

};

angular
    .module('fup')
    .controller('newNoteCtrl', newNoteCtrl)
