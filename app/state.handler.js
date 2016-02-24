(function () {
    angular.module('PressureDB')
        .factory('stateHandler', ['$rootScope', '$state', 'authService', 'AUTH_EVENTS', '$window', 'STORAGE_KEYS', function ($rootScope, $state, authService, AUTH_EVENTS, $window, STORAGE_KEYS) {

            var stateHandler = {};

            stateHandler.init = function () {
                // nothing yet
            };

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                // remove all previous notification if any
                PNotify.removeAll();

                var hasData = typeof toState.data !== 'undefined';
                var requireAuthorization = hasData && (typeof toState.data.authorizedRoles !== 'undefined');

                // By default all pages require Login, except if set to False
                var requireLogin = requireAuthorization || (!hasData) || (toState.data.requireLogin !== false);

                if (requireLogin && !authService.isAuthenticated()) {
                   /* event.defaultPrevented = true;
                    //geotoolkit.log("Not logged In, try to auto connect");
                    authService.authenticateIfLastSession().then(function () {
                        $state.go(toState.name, toParams);
                    });*/
                    $state.go(toState.name, toParams);
                }
                else {
                    $state.go(toState.name, toParams);
                }
            });

            return stateHandler;
        }])
}());