function unsafe($sce) {
	return function(val) {
		return $sce.trustAsHtml(val);
	};
}

function limit() {
	return function(val) {
		if (val.length > 110) {
			return val.substring(0,110) + ' ...';
		} else {
			return val.substring(0,110);
		}
	};
}

function propsFilter() {
	return function(items, props) {
		var out = [];

		if (angular.isArray(items)) {
			var keys = Object.keys(props);

			items.forEach(function(item) {
				var itemMatches = false;

				for (var i = 0; i < keys.length; i++) {
					var prop = keys[i];
					var text = props[prop].toLowerCase();
					if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
						itemMatches = true;
						break;
					}
				}

				if (itemMatches) {
					out.push(item);
				}
			});
		} else {
			// Let the output be the input untouched
			out = items;
		}

		return out;
	};
}

angular
.module('fup')
.filter('unsafe', unsafe)
.filter('limit', limit)
.filter('propsFilter', propsFilter);