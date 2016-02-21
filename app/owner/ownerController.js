/**
 * MainCtrl - controller
 */
function ownerCtrl($rootScope, $stateParams, $scope, ownerService, $modal, $state) {

    $scope.owner = {};

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
                    $scope.notes[i].buttonCapacity = 'btn btn-danger btn-circle';
                } else {
                    if (item.capacity >= 2 && item.capacity < 4) {
                        $scope.notes[i].buttonCapacity = 'btn btn-warning btn-circle';
                    } else {
                        $scope.notes[i].buttonCapacity = 'btn btn-primary btn-circle';
                    }
                }
            }
            if (item.attitude != null) {
                $scope.moyenne.attitude += item.attitude;
                nbAttitude += 1;
                $scope.notes[i].moyenne += item.attitude;
                nbNote += 1;

                if (item.attitude < 2 ) {
                    $scope.notes[i].buttonAttitude = 'btn btn-danger btn-circle';
                } else {
                    if (item.attitude >= 2 && item.attitude < 4) {
                        $scope.notes[i].buttonAttitude = 'btn btn-warning btn-circle';
                    } else {
                        $scope.notes[i].buttonAttitude = 'btn btn-primary btn-circle';
                    }
                }
            }
            if (item.degradation != null) {
                $scope.moyenne.degradation += item.degradation;
                nbDegradation += 1;
                $scope.notes[i].moyenne += item.degradation;
                nbNote += 1;

                if (item.degradation < 2 ) {
                    $scope.notes[i].buttonDegradation = 'btn btn-danger btn-circle';
                } else {
                    if (item.degradation >= 2 && item.degradation < 4) {
                        $scope.notes[i].buttonDegradation = 'btn btn-warning btn-circle';
                    } else {
                        $scope.notes[i].buttonDegradation = 'btn btn-primary btn-circle';
                    }
                }
            }
            $scope.notes[i].moyenne = Math.floor($scope.notes[i].moyenne/nbNote/5*100);

            if (item.moyenne < 34 ) {
                $scope.notes[i].buttonMoyenne = 'btn btn-danger btn-circle';
            } else {
                if (item.moyenne >= 34 && item.moyenne < 66) {
                    $scope.notes[i].buttonMoyenne = 'btn btn-warning btn-circle';
                } else {
                    $scope.notes[i].buttonMoyenne = 'btn btn-primary btn-circle';
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
