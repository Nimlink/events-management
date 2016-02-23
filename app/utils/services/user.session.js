(function () {
    angular.module('fup')
        .service('userSession', ['USER_ROLES', '$window', function (USER_ROLES, $window) {
            var STORAGE_KEY_TOKEN = "imo.jwt";

            var userSession = this;

            var roleCodeMap = {
                "ADM": USER_ROLES.admin,
                "USR": USER_ROLES.user
            };

            userSession.create = function (userData) {
                setToken(userData.token);
                userSession.userRole = roleCodeMap[userData.roleCode];
                userSession.user = userData;
                userSession.user.displayRoleCode = "AUTH_" + userSession.user.roleCode;
            };

            userSession.destroy = function () {
                $window.localStorage.removeItem(STORAGE_KEY_TOKEN);
                userSession.user = null;
                userSession.userRole = null;
            };

            userSession.getPreferences = function () {
                return  userSession.user ?  userSession.user.preferences : null;
            };

            userSession.getToken = function () {
                return $window.localStorage.getItem(STORAGE_KEY_TOKEN);
            };

            var setToken = function (token) {
                $window.localStorage.setItem(STORAGE_KEY_TOKEN, token);
            };

            return userSession;
        }])
})();