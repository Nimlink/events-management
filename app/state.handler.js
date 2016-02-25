(function () {
    angular.module('fup')
        .factory('stateHandler', ['$rootScope', '$state', 'authService', function ($rootScope, $state, authService) {

            var stateHandler = {};

            stateHandler.init = function () {
                // nothing yet
            };

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (typeof toState.data !== 'undefined') {

                    var requireLogin = (toState.data.requireLogin !== false);

                    if (requireLogin) {
                        event.preventDefault();
                        if (authService.isAuthenticated()){
                            $state.go(toState.name, toParams, {notify: false}).then(function() {
                                $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
                            });
                        } else {
                            $state.go('index_nobar.login', {notify:false});
                        }
                    } else {
                        $state.go(toState.name, toParams, {notify:false});
                    }
                }
                else {
                    $state.go('index_nobar.login', {notify:false});
                }
            });

            return stateHandler;
        }])
}());