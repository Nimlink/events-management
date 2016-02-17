function ContractorsAdminCtrl($scope, $modal, $http, $translate, dbQueriesService) {

    $scope.modifyContractor = function () {
        $modal.open({
            templateUrl: "admin/contractor/modal_contractor_modify.html",
            windowClass: "animated flipInY",
            scope: $scope,
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };
            }
        });
    }

    $scope.createContractor = function () {
        $modal.open({
            templateUrl: "admin/contractor/modal_contractor_new.html",
            windowClass: "animated flipInY",
            scope: $scope,
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };
            }
        });
    }
}

var app = angular.module('fup');
app.controller('ContractorsAdminCtrl', ContractorsAdminCtrl);
