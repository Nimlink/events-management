function ControlsButtonCtrl($scope, $modal, $http, $translate, dbQueriesService) {

    $scope.createDeliverable = function () {
        $modal.open({
            templateUrl: "projects/cig/modal_deliverable_new.html",
            windowClass: "animated flipInY",
            scope: $scope,
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };
            }
        });
    };

    $scope.createContract = function () {
        $modal.open({
            templateUrl: "projects/cig/modal_contract_new.html",
            windowClass: "animated flipInY",
            scope: $scope,
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };
            }
        });
    };
}

var app = angular.module('fup');
app.controller('ControlsButtonCtrl', ControlsButtonCtrl);
