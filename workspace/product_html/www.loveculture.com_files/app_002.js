
/**********************************************************************************************************************
 * 	app.override.js acts as a way for us to safely add functionality to app.js without having to actually modify it
 * 
 * 	NOTE: ALL INTEGRATION SPECIFIC LOGIC SHOULD GO IN ITS RESPECTIVE CARTRIDGE
 * 
 *********************************************************************************************************************/
// A place to override individual app.js functions
// An example of a common application will be to override an init function
// This approach is used when you want to leave the existing functionality in place and execute from within the same scope
// also preserves any prototype properties that are setup for that function.
(function () { 
	
	/***** app.lcg (LCG enhancements) *****/
	app.lcg = {
		isRefineVisible : true, //save refinement visibility state (true by default)
		toggleRefineNav : function() { // toggle visibility of the refinement navigation
    		var refineNav = $('.refinementnav')
    		refineNav.toggle();
    		app.lcg.isRefineVisible = !app.lcg.isRefineVisible;
		}
	};
	
	/***** app.search.init override *****/
    var old_prototype = app.search.init.prototype; //save original prototype
    var old_func = app.search.init; //save original function
    
    app.search.init = function () {
    
    	// execute original function
    	old_func.apply(this, arguments); 
    	
    	// cache dependency objects for later use
    	$cache = { main : $("#main") }
    	
    	// attach click event to toggle button
    	$cache.main.on("click",".togglerefinements", function (e) {
    		app.lcg.toggleRefineNav(); 
		});
    	
    	//we need to make sure it's displaying correctly on refinements' ajax response
    	$cache.main.ajaxComplete(function(){
    		// if the refinement navigation is supposed to be hidden lets hide it
    		if (!app.lcg.isRefineVisible) { app.lcg.toggleRefineNav(); }
    	});
	
//		$(window).smartresize(function(){
//			if( jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth   ) {
//	    		// navigation should be hidden initially for smaller viewports
//	    		if (app.lcg.isRefineVisible) { app.lcg.toggleRefineNav(); }
//			}
//			else {
//	    		// navigation should be shown for larger viewports
//	    		if (!app.lcg.isRefineVisible) { app.lcg.toggleRefineNav(); }
//			}
//		});
//   	
    };
    
    app.search.init.prototype = old_prototype; //preserve original prototype
    
}) ();

