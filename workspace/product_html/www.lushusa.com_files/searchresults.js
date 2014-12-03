/*
 * Extends (not replaces) app.search.init with special initResultEvents function
 * 
 */

(function(app, $) {
	
	if(app.search) {
		// keep reference to old init function (gets called when page finished load)
		app.search.oldInit = app.search.init;
		app.search.init = function() {
			app.search.oldInit();
		
		
	
			
			
		};
	} else {
		console.log('app.search not loaded! searchresults.js must come after app.js');
	}
		
}(window.app = window.app || {}, jQuery));

