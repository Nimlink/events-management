/**
 * MainCtrl - controller
 */
function ownerCtrl($rootScope, $stateParams, $scope, ownerService, $modal, $state) {

    $scope.owner = {};

    //$.fn.datepicker.noConflict
    //
    //$('#InlineMenu').datepicker({
    //    minViewMode: 1
    //});

    //$('#RangeMenu').datepicker({
    //    format: "dd/mm/yyyy",
    //    startView: 1,
    //    minViewMode: 1
    //});


    async.parallel([
        ownerService.getOwner
    ], function (err, result) {
        $scope.owner = result[0];
        $scope.notes = $scope.owner.notes;

        $scope.moyenne = {
            capacity: 0,
            attitude: 0,
            degradation: 0,
            general: 0
        };

        var nbCapacity = 0;
        var nbAttitude = 0;
        var nbDegradation = 0;
        for (var i in $scope.notes) {
            var nbNote = 0;
            var item = $scope.notes[i];
            $scope.notes[i].moyenne = 0;
            $scope.notes[i].buttonCapacity = '';
            $scope.notes[i].buttonAttitude = '';
            $scope.notes[i].buttonDegradation = '';
            $scope.notes[i].buttonMoyenne = '';
            if (item.capacity != null) {
                $scope.moyenne.capacity += item.capacity;
                nbCapacity += 1;
                $scope.notes[i].moyenne += item.capacity;
                nbNote += 1;

                if (item.capacity < 2 ) {
                    $scope.notes[i].buttonCapacity = 'btn-danger';
                } else {
                    if (item.capacity >= 2 && item.capacity < 4) {
                        $scope.notes[i].buttonCapacity = 'btn-warning';
                    } else {
                        $scope.notes[i].buttonCapacity = 'btn-primary';
                    }
                }
            }
            if (item.attitude != null) {
                $scope.moyenne.attitude += item.attitude;
                nbAttitude += 1;
                $scope.notes[i].moyenne += item.attitude;
                nbNote += 1;

                if (item.attitude < 2 ) {
                    $scope.notes[i].buttonAttitude = 'btn-danger';
                } else {
                    if (item.attitude >= 2 && item.attitude < 4) {
                        $scope.notes[i].buttonAttitude = 'btn-warning';
                    } else {
                        $scope.notes[i].buttonAttitude = 'btn-primary';
                    }
                }
            }
            if (item.degradation != null) {
                $scope.moyenne.degradation += item.degradation;
                nbDegradation += 1;
                $scope.notes[i].moyenne += item.degradation;
                nbNote += 1;

                if (item.degradation < 2 ) {
                    $scope.notes[i].buttonDegradation = 'btn-danger';
                } else {
                    if (item.degradation >= 2 && item.degradation < 4) {
                        $scope.notes[i].buttonDegradation = 'btn-warning';
                    } else {
                        $scope.notes[i].buttonDegradation = 'btn-primary';
                    }
                }
            }
            $scope.notes[i].moyenne = Math.floor($scope.notes[i].moyenne/nbNote/5*100);

            if (item.moyenne < 34 ) {
                $scope.notes[i].buttonMoyenne = 'btn-danger';
            } else {
                if (item.moyenne >= 34 && item.moyenne < 66) {
                    $scope.notes[i].buttonMoyenne = 'btn-warning';
                } else {
                    $scope.notes[i].buttonMoyenne = 'btn-primary';
                }
            }
        }

        $scope.moyenne.general = ($scope.moyenne.capacity + $scope.moyenne.attitude + $scope.moyenne.degradation) / (nbDegradation+nbAttitude+nbCapacity);
        $scope.moyenne.general = Math.floor($scope.moyenne.general / 5 *100);

        if (nbCapacity == 0) {
            $scope.moyenne.capacity = null;
        } else {
            $scope.moyenne.capacity = Math.floor($scope.moyenne.capacity / nbCapacity);
        }
        if (nbAttitude == 0) {
            $scope.moyenne.attitude = null;
        } else {
            $scope.moyenne.attitude = Math.floor($scope.moyenne.attitude / nbAttitude);
        }
        if (nbDegradation == 0) {
            $scope.moyenne.degradation = null;
        } else {
            $scope.moyenne.degradation = Math.floor($scope.moyenne.degradation / nbDegradation);
        }

    });
};

angular
    .module('fup')
    .controller('ownerCtrl', ownerCtrl);
