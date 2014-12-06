/*******************************************************************
 * 
 *  Invokes the activity feed plugin
 * 
 ******************************************************************/

if(typeof(Demandware)=='undefined')Demandware = {};
if(!Demandware.Gigya)Demandware.Gigya = {};

Demandware.Gigya.Activity = new function(){
	var _divParams = null;
	var _height = null;
	var _width = null;
	var _feedId = null;
	var _siteName = null;
	
	//constructor
	new function(){
		$(document).bind("ready", initialize);
		$(window).bind("unload", dispose);
	}
	
	function initialize(){
		initializeElements();
		showActivityFeed();
	}
	
	function initializeElements(){
		_divParams = $('#divGigyaActivityFeedParams');
		_height = _divParams.find('#txtGigyaActivityHeight').val();
		_width =  _divParams.find('#txtGigyaActivityWidth').val();
		_feedId = _divParams.find('#txtGigyaActivityFeedId').val();
		_siteName = _divParams.find('#txtGigyaActivitySiteName').val();
	}
	
	function showActivityFeed(){
		var feedParams = {containerID:'divGigyaActivityFeed'};
		
		if(_height) feedParams.height = _height;
		if(_width) feedParams.width = _width;
		if(_feedId) feedParams.feedID = _feedId;
		if(_siteName) feedParams.siteName = _siteName;
		
		gigya.services.socialize.showFeedUI(feedParams);
	}
	
	function dispose(){
		_divParams = null;
	}
}