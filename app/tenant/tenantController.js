/**
 * MainCtrl - controller
 */
function tenantCtrl($rootScope, $stateParams, $scope, tenantService, $modal, $state) {

    $scope.tenant = {};
    $scope.tenant.id = $stateParams.id;

    async.parallel([
        async.apply(tenantService.getTenant, $scope.tenant.id)
    ], function (err, result) {
        if (err != undefined) {
            $modal.open({
                templateUrl: "search/modal_search_nobody.html",
                windowClass: "animated flipInY",
                scope: $scope,
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $modalInstance.close();
                        $state.go('index.owner');
                    };
                }
            });
        } else {
            $scope.tenant = result[0];
            $scope.notes = $scope.tenant.notes;

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
                if (item.capacity != null) {
                    $scope.moyenne.capacity += item.capacity;
                    nbCapacity += 1;
                    $scope.notes[i].moyenne += item.capacity;
                    nbNote += 1;
                }
                if (item.attitude != null) {
                    $scope.moyenne.attitude += item.attitude;
                    nbAttitude += 1;
                    $scope.notes[i].moyenne += item.attitude;
                    nbNote += 1;
                }
                if (item.degradation != null) {
                    $scope.moyenne.degradation += item.degradation;
                    nbDegradation += 1;
                    $scope.notes[i].moyenne += item.degradation;
                    nbNote += 1;
                }
                $scope.notes[i].moyenne = Math.floor($scope.notes[i].moyenne/nbNote/5*100);
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

            $scope.knob = {
                value: $scope.moyenne.general,
                options: {
                    readonly: true
                }
            }

        }
    });

};

angular
    .module('fup')
    .controller('tenantCtrl', tenantCtrl)
