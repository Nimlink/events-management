/**
 * MainCtrl - controller
 */
function MainCtrl($rootScope, $state, $scope, $modal, $location, tenantService, dbQueriesService, townService,authService, $translate, $log) {

    $scope.search = {};
    $scope.towns = [];

    $scope.createNote = function () {
        $modal.open({
            templateUrl: "note/modal_note_new.html",
            windowClass: "animated bounceInRight",
            scope: $scope,
            controller: newNoteCtrl
        });
    };

    $scope.tenant = {};
    $scope.$watch('tenant.selected', function(newValue, oldValue) {
        if ($scope.tenant.selected.hash) {
            $state.go('index.tenant', {id: $scope.tenant.selected.hash});
            $scope.tenant.selected = undefined;
        }
    });
    $scope.refreshTenants = function(tenant) {
        if (tenant.length > 0) {
            return dbQueriesService.searchTenant(tenant.toLowerCase().replace(/ /g,"")).then(function(response) {
                $scope.tenants = response.data
            });
        }
    };

    $scope.searchTenant = function () {

        tenantService.searchTenant(
            {
                firstname: $scope.search.firstname,
                lastname: $scope.search.lastname
            }
        ).then(
            function(greeting) {
                // TODO: if multiple people
                if (greeting.data.length > 0) {
                    if (greeting.data.length > 1) {
                        $scope.people = greeting.data;
                        $modal.open({
                            templateUrl: "search/modal_search.html",
                            windowClass: "animated bounceInRight",
                            scope: $scope,
                            controller: function ($scope, $modalInstance) {
                                $scope.cancel = function () {
                                    $modalInstance.dismiss();
                                };
                                $scope.goTo = function (id) {
                                    $state.go('index.tenant', {id : id});
                                    $modalInstance.close();
                                };
                            }
                        });
                    } else {
                        $state.go('index.tenant', {id : greeting.data[0].id});
                    }
                }
            }, function(reason) {
                if (reason == 'Too many people found') {
                    $modal.open({
                        templateUrl: "search/modal_search_toomany.html",
                        windowClass: "animated bounceInRight",
                        scope: $scope,
                        controller: function ($scope, $modalInstance) {
                            $scope.ok = function () {
                                $modalInstance.close();
                            };
                        }
                    });
                } else {
                    $modal.open({
                        templateUrl: "search/modal_search_nobody.html",
                        windowClass: "animated bounceInRight",
                        scope: $scope,
                        controller: function ($scope, $modalInstance) {
                            $scope.ok = function () {
                                $modalInstance.close();
                            };
                        }
                    });
                }
            }
        );
    };

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.logout = function () {
        authService.logout();
        $state.go('index_nobar.login');
    };

};

function translateCtrl($translate, $scope) {
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };
}

angular
    .module('fup')
    .controller('MainCtrl', MainCtrl)
    .controller('translateCtrl', translateCtrl)
