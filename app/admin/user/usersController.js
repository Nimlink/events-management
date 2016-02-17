function UsersAdminCtrl($scope, $modal, $http, $translate, dbQueriesService) {

    $scope.showUser = function () {
        $modal.open({
            templateUrl: "admin/user/modal_user_modify.html",
            windowClass: "animated flipInY",
            scope: $scope,
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };
            }
        });
    }

    $scope.createUser = function () {
        $modal.open({
            templateUrl: "admin/user/modal_user_new.html",
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
app.controller('UsersAdminCtrl', UsersAdminCtrl);
