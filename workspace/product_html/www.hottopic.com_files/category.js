//these functions rely on jquery.history.js

//history namespace, contains methods geared toward the browsers history
(function( historyUtils, $, undefined ) {
	var History = null;
	
	if(!utils.isIELessThan8()){
		History = window.History; // Note: We are using a capital H instead of a lower h
	}
	
	var state = 0;
	
	//grab history object
	historyUtils.getHistoryAPI = function(){
		return History;
	};
	
	// Prepare, func is the function to call on state change
	historyUtils.prepareHistory = function(func){
		if ( !History.enabled ) {
			 // History.js is disabled for this browser.
			 // This is because we can optionally choose to support HTML4 browsers or not.
			return false;
		}

		// Bind to StateChange Event
		History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
			var State = History.getState(); // Note: We are using History.getState() instead of event.state
			//History.log(State.data, State.title, State.url);
			func();
		});
	};
	
	//push page onto history stack
	historyUtils.pushState = function(data, title, url){
		state++;
		
		if(title == undefined || title.length == 0)
			title = $(document).find("title").text();;
		
		if(url == undefined || url.length == 0)
			url = "?state=" + state;
			
		History.pushState(data, title, url); 
	};
	
	//replace current page in history stack
	historyUtils.replaceState = function(data, title, url){
		if(title == undefined || title.length == 0)
			title = $(document).find("title").text();;
		
		if(url == undefined || url.length == 0)
			url = "?state=" + state;
			
		History.replaceState(data, title, url); 
	};
	
	//gets current state data
	historyUtils.getStateData = function(){
		return History.getState().data;
	};
	
	
}( window.historyUtils = window.historyUtils || {}, jQuery ));

//product namespace, contains methods geared toward the category pages
(function( product, $, undefined ) {	
	product.getPageFromHistory = function(){
		var data = historyUtils.getStateData();
		
		if(data != undefined && data.page != undefined && data.page.length != 0)
			return data.page;
		
		return 1;
	};
	
	product.getScollLocFromHistory = function(){
		var data = historyUtils.getStateData();
		
		if(data != undefined && data.scrollLoc != undefined && data.scrollLoc.length != 0)
			return data.scrollLoc;
		
		return 0;
	};
	
	product.setupHistoryData = function(page, scrollLoc){
		if(scrollLoc == undefined || scrollLoc.length == 0)
			scrollLoc = 0;
		
		return {page: page, scrollLoc: scrollLoc};
	};
	
	product.pushHistoryState = function(page){
		var data = product.setupHistoryData(page);
		
		historyUtils.pushState(data);
	};
	
	product.replaceHistoryState = function(page){
		var data = product.setupHistoryData(page, $(document).scrollTop());
		
		historyUtils.pushState(data);
	};
}( window.product = window.product || {}, jQuery ));