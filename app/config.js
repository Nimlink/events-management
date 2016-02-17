function config($stateProvider, $urlRouterProvider, $httpProvider, $ocLazyLoadProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $urlRouterProvider.otherwise("/login");

    $ocLazyLoadProvider.config({
        debug: false
    });

    // Libraries

    var component_wizard = ["https://cdnjs.cloudflare.com/ajax/libs/angular-wizard/0.5.5/angular-wizard.min.css",
        'https://cdnjs.cloudflare.com/ajax/libs/angular-wizard/0.5.5/angular-wizard.min.js'];

    var component_select = ['https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.12.1/select.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/select2/3.4.5/select2.css',
        'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.8.5/css/selectize.default.css',
        'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.12.1/select.min.js'];

    var component_tag = ['https://cdnjs.cloudflare.com/ajax/libs/ng-tags-input/3.0.0/ng-tags-input.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/ng-tags-input/3.0.0/ng-tags-input.min.js'];

    var component_colorpicker = ['https://cdnjs.cloudflare.com/ajax/libs/angular-bootstrap-colorpicker/3.0.19/js/bootstrap-colorpicker-module.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular-bootstrap-colorpicker/3.0.19/css/colorpicker.min.css'];

    var component_summernote = ['https://cdnjs.cloudflare.com/ajax/libs/summernote/0.6.16/summernote-bs3.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.6.16/summernote.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.6.16/summernote.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular-summernote/0.5.0/angular-summernote.min.js'];

    var component_rangeSlider = ['https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.0.13/css/ion.rangeSlider.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.0.13/css/ion.rangeSlider.skinModern.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.0.13/js/ion.rangeSlider.min.js'];

    var component_sparkline = ['https://cdnjs.cloudflare.com/ajax/libs/jquery-sparklines/2.1.2/jquery.sparkline.min.js'];

    var component_highchart = ['https://cdnjs.cloudflare.com/ajax/libs/highcharts/4.1.8/adapters/standalone-framework.js',
        'https://cdnjs.cloudflare.com/ajax/libs/highcharts/4.1.8/highcharts.js'];

    var component_highstock = ['https://cdnjs.cloudflare.com/ajax/libs/highstock/2.1.8/highstock-all.js'];

    var component_codemirror = ['https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.6.0/codemirror.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.6.0/codemirror.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.6.0/mode/javascript/javascript.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.6.0/theme/zenburn.min.css',
        'utils/libraries/ui-codemirror/ui-codemirror.min.js'];

    var component_uigrid = ['utils/libraries/angular-ui-grid/ui-grid.min.css',
        'utils/libraries/angular-ui-grid/ui-grid.min.js',
        'utils/libraries/angular-ui-grid/ui-grid.eot',
        'utils/libraries/angular-ui-grid/ui-grid.svg',
        'utils/libraries/angular-ui-grid/ui-grid.ttf',
        'utils/libraries/angular-ui-grid/ui-grid.woff',
        'utils/services/ui/uiGridService.js'];

    var component_jstree = ['https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css',
        'utils/libraries/jstree/jsTree.directive.js'];

    var component_dateformat = ['https://cdnjs.cloudflare.com/ajax/libs/jquery-dateFormat/1.0/jquery.dateFormat.min.js'];

    var component_spinkit = ['utils/libraries/angular-spinkit/angular-spinkit.min.css',
        'utils/libraries/angular-spinkit/angular-spinkit.min.js'];

    var component_dropzone = ['https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.2.0/min/basic.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.2.0/min/dropzone.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.2.0/min/dropzone.min.js'];

    var component_knob = ['utils/libraries/angular-knob/angular-knob.js',
        'utils/libraries/angular-knob/jquery.knob.js'];

    $stateProvider

        .state('index', {
            abstract: true,
            url: "",
            templateUrl: "styles/template/content.html"
        })
        .state('index.login', {
            url: "/login",
            templateUrl: "login/login.html",
            data: {pageTitle: 'Login'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{files: ['login/loginController.js']},
                        {
                            files: [
                                'utils/services/formatterService.js',
                                'utils/filters/formatFilter.js',
                                'utils/services/dbQueriesService.js'
                            ]
                        }])
                }
            }
        })
        .state('index.users', {
            url: "/admin/users",
            templateUrl: "admin/user/users.html",
            data: {pageTitle: 'Admin utilisateurs'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{files: ['admin/user/usersController.js']},
                        {files: component_select},
                        {
                            files: [
                                'utils/services/formatterService.js',
                                'utils/filters/formatFilter.js',
                                'utils/services/dbQueriesService.js'
                            ]
                        }])
                }
            }
        })
        .state('index.projects', {
            url: "/admin/projects",
            templateUrl: "admin/project/projects.html",
            data: {pageTitle: 'Admin projet'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{files: ['admin/project/projectsController.js']},
                        {files: component_select},
                        {
                            files: [
                                'utils/services/formatterService.js',
                                'utils/filters/formatFilter.js',
                                'utils/services/dbQueriesService.js'
                            ]
                        }])
                }
            }
        })
        .state('index.accounts', {
            url: "/admin/accounts",
            templateUrl: "admin/account/accounts.html",
            data: {pageTitle: 'Admin compte'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{files: ['admin/account/accountsController.js']},
                        {files: component_select},
                        {files: component_colorpicker},
                        {
                            files: [
                                'utils/services/formatterService.js',
                                'utils/filters/formatFilter.js',
                                'utils/services/dbQueriesService.js'
                            ]
                        }])
                }
            }
        })
        .state('index.contractors', {
            url: "/admin/contractors",
            templateUrl: "admin/contractor/contractors.html",
            data: {pageTitle: 'Admin prestataire'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{files: ['admin/contractor/contractorsController.js']},
                        {files: component_dropzone},
                        {
                            files: [
                                'utils/services/formatterService.js',
                                'utils/filters/formatFilter.js',
                                'utils/services/dbQueriesService.js'
                            ]
                        }])
                }
            }
        })
        .state('index.cig', {
            url: "/project/cig",
            templateUrl: "projects/cig/home.html",
            data: {pageTitle: 'Projet CIG'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{files: ['projects/cig/homeController.js']},
                        {files: component_select},
                        {files: component_dropzone},
                        {
                            files: [
                                'utils/services/formatterService.js',
                                'utils/filters/formatFilter.js',
                                'utils/services/dbQueriesService.js',
                                'projects/cig/controlsButtonController.js'
                            ]
                        }])
                }
            }
        })
        .state('index.cig_contract', {
            url: "/project/cig/contracts/:id",
            templateUrl: "projects/cig/contract.html",
            data: {pageTitle: 'Prestation'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{files: ['projects/cig/contractController.js']},
                        {files: component_select},
                        {files: component_dropzone},
                        {files: component_knob},
                        {
                            files: [
                                'utils/services/formatterService.js',
                                'utils/filters/formatFilter.js',
                                'utils/services/dbQueriesService.js',
                                'projects/cig/controlsButtonController.js'
                            ]
                        }])
                }
            }
        })
            .state('index.cig_progress', {
            url: "/project/cig/contracts",
            templateUrl: "projects/cig/contractsProgress.html",
            data: {pageTitle: 'Avancement'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{files: ['projects/cig/contractsProgressController.js']},
                        {files: component_select},
                        {files: component_uigrid},
                        {
                            files: [
                                'utils/services/formatterService.js',
                                'utils/filters/formatFilter.js',
                                'utils/services/dbQueriesService.js',
                                'projects/cig/controlsButtonController.js'
                            ]
                        }])
                }
            }
        })
}
angular
    .module('fup')
    .config(config)
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    });
