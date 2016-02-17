var app = angular.module('fup');

/*
 * Service for DB queries
 */
app.service('formatterService', function(){

	this.formatStatement = function(num, currency) {
		// Positive values
//		if (num >= 1000000) {
//		return (num / 1000000).toFixed(2).replace(/\.0$/, '') + ' G' + currency;
//		}
		if (num >= 1000) {
			return (num / 1000).toFixed(2).replace(/\.0$/, '') + ' G' + currency;
		}
		if (num >= 0) {
			return (num).toFixed(2).replace(/\.0$/, '') + ' M' + currency;
		}

		// Negative values
//		if (num <= -1000000) {
//		return (num / 1000000).toFixed(2).replace(/\.0$/, '') + ' G' + currency;
//		}
		if (num <= -1000) {
			return (num / 1000).toFixed(2).replace(/\.0$/, '') + ' G' + currency;
		}
		if (num < 0) {
			return (num).toFixed(2).replace(/\.0$/, '') + ' M' + currency;
		}
		return num;
	}

	this.formatPercent = function(num) {
		if (num != undefined) {
			return (num).toFixed(2).replace(/\.0$/, '') + ' %';
		}
	}

});
