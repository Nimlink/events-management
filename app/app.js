var app = angular.module('fup', [
    'ui.router',
    'ui.bootstrap',
    'pascalprecht.translate',
    'angular-input-stars',
    'ui.knob',
    'ngSanitize',
    'ui.select',
    'angular-google-analytics'
]);

app.config(function (AnalyticsProvider) {
    // Set a single account
    AnalyticsProvider.setAccount('UA-74203547-1');
});

app.run(function(Analytics) {});
