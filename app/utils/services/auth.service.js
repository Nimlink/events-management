(function () {
    angular.module('fup')
        .factory('authService', ['$http', '$q', '$timeout', '$rootScope', 'userSession', 'dbQueriesService', 'AUTH_EVENTS', 'USER_ROLES', function ($http, $q, $timeout, $rootScope, userSession, dbQueriesService, AUTH_EVENTS, USER_ROLES) {

            var authService = {};

            authService.ROLES = USER_ROLES;

            authService.login = function (credentials) {
                return dbQueriesService.auth_login(credentials)
                    .then(function (res) {
                        userSession.create(res.data);
                        return res.data;
                    }
                );
            };

            authService.mailPassword = function (data) {
                return dbQueriesService.mailPassword(data)
                    .then(function (res) {
                        return res.data;
                    }
                );
            };

            authService.logout = function () {
                userSession.destroy();
            };

            authService.getCurrentUser = function () {
                return userSession.user;
            };

            authService.getUserPreferences = function () {
                return userSession.getPreferences();
            };

            authService.updateUserPreferences = function (preferences) {
                userSession.user.preferences = preferences;
            };

            authService.isAuthenticated = function () {
                return !!userSession.user;
            };

            authService.authenticateIfLastSession = function () {
                /*var result = $q.defer();
                var isAuthenticated = authService.isAuthenticated();

                // was already connected ?
                var lastToken = userSession.getToken();
                if (!isAuthenticated && !!lastToken) {
                    result.notify(AUTH_EVENTS.loginStarted);
                    $http.get(restApi.auth_profile).then(function (res) {
                            res.data.token = lastToken;
                            userSession.create(res.data);
                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, res.data);
                            result.resolve(true);
                        },
                        function (err) {
                            // do not use token anymore
                            userSession.destroy();
                            if (err.status < 0) {
                                $rootScope.$broadcast(AUTH_EVENTS.apiConnectionFailed, err);
                                result.reject(AUTH_EVENTS.apiConnectionFailed);
                            }
                            else {
                                $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, err);
                                result.reject(AUTH_EVENTS.sessionTimeout);
                            }
                        }
                    );
                }
                else {
                    $timeout(function () {
                        if (isAuthenticated) {
                            result.resolve(true);
                        }
                        else {
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                            result.reject(AUTH_EVENTS.notAuthenticated);
                        }
                    })
                }

                return result.promise;*/
            };

            authService.isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }

                var minAuthorizedRole = Math.min.apply(null, authorizedRoles);
                return (authService.isAuthenticated() && (userSession.userRole >= minAuthorizedRole));
            };

            authService.isRoleCode = function (roleCode) {

            };

            return authService;
        }])
}());