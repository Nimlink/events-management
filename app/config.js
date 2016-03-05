function config($stateProvider, $urlRouterProvider, $httpProvider, $injector ) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $urlRouterProvider.otherwise("/login");

    $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
            return $injector.get('authInterceptor');
        }
    ]);

    $stateProvider
        .state('index', {
            abstract: true,
            url: "",
            templateUrl: "styles/template/content.html",
        })
        .state('index_nobar', {
            abstract: true,
            url: "",
            templateUrl: "styles/template/content_nobar.html"
        })
        .state('index_nobar.login', {
            url: "/login",
            templateUrl: "login/login.html",
            data: {pageTitle: 'Login', requireLogin: false},
        })
        .state('index.tenant', {
            url: "/tenant/:id",
            templateUrl: "tenant/tenant.html",
            data: {pageTitle: 'Locataire', requireLogin: true},
        })
        .state('index.owner', {
            url: "/owner",
            templateUrl: "owner/owner.html",
            data: {pageTitle: 'Propriétaire', requireLogin: true},
        })
        .state('index_nobar.signup', {
            url: "/signup",
            templateUrl: "signup/signup.html",
            data: {pageTitle: 'Inscription', requireLogin: false},
        })
}
angular
    .module('fup')
    .config(config)
    .run(function ($rootScope, $state, stateHandler) {
        $rootScope.$state = $state;
    });
