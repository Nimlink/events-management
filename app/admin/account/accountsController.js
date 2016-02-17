function AccountsAdminCtrl($scope, $modal, $http, $translate, dbQueriesService) {

    $scope.manageTags = function () {
        $modal.open({
            templateUrl: "admin/account/modal_tag_manage.html",
            windowClass: "animated flipInY",
            scope: $scope,
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };
            }
        });
    }

    $scope.modifyAccount = function () {
        $modal.open({
            templateUrl: "admin/account/modal_account_modify.html",
            windowClass: "animated flipInY",
            scope: $scope,
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };
            }
        });
    }

    $scope.createAccount = function () {
        $modal.open({
            templateUrl: "admin/account/modal_account_new.html",
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
app.controller('AccountsAdminCtrl', AccountsAdminCtrl);
