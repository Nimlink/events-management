function ProjectsAdminCtrl($scope, $modal, $http, $translate, dbQueriesService) {

    $scope.modifyProject = function () {
        $modal.open({
            templateUrl: "admin/project/modal_project_modify.html",
            windowClass: "animated flipInY",
            scope: $scope,
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };
            }
        });
    }

    $scope.createProject = function () {
        $modal.open({
            templateUrl: "admin/project/modal_project_new.html",
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
app.controller('ProjectsAdminCtrl', ProjectsAdminCtrl);
