var app = angular.module('fup');

/*
 * Filter for formatting in html
 */
app.filter('statementFilter', function(formatterService){

	return function (value, scope) {
		return formatterService.formatStatement(value,'€');
	};

});

app.filter('sharesFilter', function(formatterService){
	return function (value, scope) {
		return formatterService.formatStatement(value  / 1000000 ,'');
	};
});

app.filter('marketcapFilter', function(formatterService){
	return function (value, scope) {
		return formatterService.formatStatement(value  / 1000000 ,'€');
	};
});

app.filter('percentFilter', function(formatterService){
	return function (value, scope) {
		return formatterService.formatPercent(value);
	};
});
