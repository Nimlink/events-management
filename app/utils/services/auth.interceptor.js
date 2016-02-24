/**
 * Intercepts every XHR request/response send/receive to/from Backend
 */
(function () {
    angular.module('fup')
        .factory('authInterceptor', ['$q', '$rootScope', 'AUTH_EVENTS', 'userSession', function ($q, $rootScope, AUTH_EVENTS, userSession) {
            var authInterceptor = {};

            authInterceptor.request = function (config) {
                config.headers = config.headers || {};

                var authData = userSession.getToken();
                if (authData) {
                    // config.headers.Authorization = 'Bearer ' + authData;
                    config.headers['x-access-token'] = authData;
                }

                return config;
            };

            return authInterceptor;
        }])
}());