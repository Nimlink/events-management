var app = angular.module('fup');

/*
 * Service for DB queries
 */
app.service('uiGridService', function(){

	this.getGridHeight = function(gridOptions) {

	    var length = gridOptions.data.length;
	    var rowHeight = 30; // your row height
	    var headerHeight = 40; // your header height
	    var filterHeight = 40; // your filter height

	    return length * rowHeight + headerHeight + filterHeight;
	}
	
});
