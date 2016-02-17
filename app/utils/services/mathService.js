var app = angular.module('fup');

/*
 * Service for basic maths
 */
app.service('mathService', function(){

	this.minimum = function(array, f) {
		var i = -1,
		n = array.length,
		a,
		b;
		if (arguments.length === 1) {
			while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
			while (++i < n) if ((b = array[i]) != null && a > b) a = b;
		} else {
			while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
			while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
		}
		return a;
	};

	this.maximum = function(array, f) {
		var i = -1,
		n = array.length,
		a,
		b;
		if (arguments.length === 1) {
			while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
			while (++i < n) if ((b = array[i]) != null && b > a) a = b;
		} else {
			while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
			while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
		}
		return a;
	};

	this.avg = function(array) {
		var sum = 0;
		for (i in array) {
			sum += array[i];
		}
		return sum / array.length;
	};
	
});
