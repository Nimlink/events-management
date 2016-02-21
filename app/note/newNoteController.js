/**
 * MainCtrl - controller
 */
function newNoteCtrl($rootScope, $scope, $modalInstance, $location, townService,  $log, noteService) {

    $scope.towns = townService.getTowns();
    $scope.town = {};
    $scope.town.selected = undefined;

    $scope.note = {
        id_owner : 5,
        firstname: '',
        lastname: '',
        id_town: '',
        date_start:'',
        date_end: '',
        capacity: 0,
        attitude: 0,
        degradation: 0
    };
    $scope.moyenne = 0;

    $scope.$watch('note.capacity', modifiedNote);

    function modifiedNote() {
        var moyenne = 0;
        var nb = 0;
        if ($scope.note.capacity != '') {
            moyenne += $scope.note.capacity;
            nb += 1;
        }
        if ($scope.note.attitude != '') {
            moyenne += $scope.note.capacity;
            nb += 1;
        }
        if ($scope.note.degradation != '') {
            moyenne += $scope.note.capacity;
            nb += 1;
        }
        if (nb>0) {
            $scope.moyenne = Math.floor(moyenne/nb/5*100);
        }
    };


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

    $scope.ok = function () {

        $scope.note.id_town = $scope.town.selected;

        noteService.insertNote($scope.note).then(
            function(greeting) {
                if (greeting.data.length > 0) {

                }
            }, function(reason) {

            }

        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

};

angular
    .module('fup')
    .controller('newNoteCtrl', newNoteCtrl)
