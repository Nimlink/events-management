(function () {
    angular.module('fup')
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginStarted: 'auth-login-started',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            licenseExpired: 'auth-expired-license',
            notAuthorized: 'auth-not-authorized',
            apiConnectionFailed: 'auth-api-connection-failed'
        })
        .constant('USER_ROLES', {
            admin: 8,
            user: 4,
            guest: 1
        })
})();