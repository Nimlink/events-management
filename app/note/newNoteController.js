/**
 * newNoteCtrl - controller
 */
function newNoteCtrl($rootScope, $scope, $modalInstance, $state, townService,  noteService, $translate, ownerNoteService, dbQueriesService) {

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.refreshAddresses = function(address) {
        return dbQueriesService.getTowns(address).then(function(response) {
                $scope.towns = response.data
            });
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $scope.towns = townService.getTowns();
    $scope.town = {};
    $scope.town.selected = undefined;

    $scope.errors = [];
    $scope.warnings = [];

    $scope.note = {
        firstname: undefined,
        lastname: undefined,
        id_town: undefined,
        date_start: undefined,
        date_end: undefined,
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
    }

    $scope.querySearch = function (query) {
        var results = query ? $scope.towns.filter( createFilterFor(query) ) : $scope.towns;
        return results;
    };

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
            return ((state.postal_code + state.town).toLowerCase().indexOf(lowercaseQuery) >= 0);
        };
    }

    $scope.ok = function () {
        $scope.errors = [];

        if ($scope.town.selected == null) {
            $scope.errors.push({item:$translate.instant('town')});
        } else {
            $scope.note.id_town = $scope.town.selected.id;
        }

        if ($scope.note.firstname == null) {
            $scope.errors.push({item:$translate.instant('prenom')});
        }

        if ($scope.note.lastname == null) {
            $scope.errors.push({item:$translate.instant('nom')});
        }

        if ($scope.note.date_start == null) {
            $scope.errors.push({item:$translate.instant('entree')});
        }

        if ($scope.note.date_end == null) {
            $scope.errors.push({item:$translate.instant('sortie')});
        }

        //if ($scope.note.capacity == 0) {
        //    $scope.warnings.push({item:$translate.instant('capacite_tiny')});
        //}
        //
        //if ($scope.note.attitude == 0) {
        //    $scope.warnings.push({item:$translate.instant('attitude_tiny')});
        //}
        //
        //if ($scope.note.degradation == 0) {
        //    $scope.warnings.push({item:$translate.instant('degradation_tiny')});
        //}

        if ($scope.note.date_end != null && $scope.note.date_start != null) {
            if ($scope.note.date_end < $scope.note.date_start) {
                $scope.errors.push({item: $translate.instant('dateNotOk')});
            }
        }

        if ($scope.errors.length == 0) {
            noteService.insertNote($scope.note).then(
                function(greeting) {
                    ownerNoteService.refresh(function(err){});
                }, function(reason) {
                    ownerNoteService.refresh(function(err){});
                });
            $modalInstance.close();
        }

    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

};

angular
    .module('fup')
    .controller('newNoteCtrl', newNoteCtrl);
