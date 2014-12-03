// global variables
var basePageName;

function siteCatalystInstance(args) {
	// Initialize common variables from object literal passed in by args. Default to new value or existing value if no new value specified. i.e. s.pagename = args.spagename || s.pagename;
	s.pageName = args.spagename || s.pageName;
    s.server = args.server || s.server;
    s.prop3 = args.sprop3 || s.prop3;
	if($.urlParam('src')) {
		s.campaign = $.urlParam('src').toUpperCase();
	}
	
	basePageName = s.pageName; // store base page name
}

function clean(mystring){
	//remove special character like trademark, registermark
	mystring = mystring.replace('&amp;', '' ).replace('™', '' ).replace('®', '' ).replace('&trade;', '' ).replace('&#153;', '').replace('#174;', '' );
	return mystring;
}

siteCatalystInstance.prototype.customLink = function(obj,pagename) {
	s.tl(obj, 'o', pagename);
}

siteCatalystInstance.prototype.pageView = function() {
	s.doPlugins=s_doPlugins;
	var s_code=s.t();
}


// Entry page functions
siteCatalystInstance.prototype.entryPageInit = function() {
	var _this = this;
	var products = 1;

	$('input[id=webdisplayname]').each(function() {
	    var productName = $(this).val();

	    // replace special characters
	    productName = clean(productName);
       
	    if(products == 1 ) {
	    	_this.entryProductView(productName);
	    	products++;
	    } else {
	    	_this.entryAdditionalProductView(productName);
	    }
	});
}

siteCatalystInstance.prototype.entryProductView = function(productName) {
	this.productName = productName;
	productName = clean(productName);
	
	s.products = ";" + productName + ";;;;evar11=" + s.pageName;
	s.events="prodView,event11"; 
}

siteCatalystInstance.prototype.entryAdditionalProductView = function(productName) {
	productName = clean(productName);
	
	s.products = s.products + ",;" + productName + ";;;;evar11=" + s.pageName;
}


// Product page functions
siteCatalystInstance.prototype.productPageInit = function(baseProductName) {

	baseProductName = $('#webdisplayname').val(); // grabs product name from Add to Cart button, authored by SiteOps

	// test for variant
	var variant = window.location.hash;
	if(variant.indexOf('currentState') != -1) {
		variant = variant.replace('#currentState=',''); // removes beginning of hash
		var input = document.getElementById(variant); // finds input that matches hash value
		baseProductName = input.getAttribute('data-web_display_name'); // grabs the web display name from that value
	} 

	// remove special chars
	baseProductName = clean(baseProductName);

	// builds s.product string
	this.additionalProductViews = new Array(); // creates a new array
	this.productView(baseProductName); // sends product name to productView function

	// Test if s.pageName contains "Index". If it does, remove it. If it doesn't we need that page name for tracking so leave it. 
	if (basePageName.indexOf("Index")!=-1) {
		basePageName = basePageName.substr(0,basePageName.lastIndexOf(':') + 1);
	} else {
		basePageName = basePageName + ":";
	}

	
	// Pass basePageName to tab view and product view functions.
	this.setTabView(basePageName);

}

siteCatalystInstance.prototype.productView = function(productName) {
	this.productName = productName;

	// remove special chars
	productName = clean(productName);

	s.products = ";" + productName + ";;;;evar11=" + s.pageName;
	s.events="prodView,event11"; 
}

siteCatalystInstance.prototype.AdditionalProductView = function(productName,collection) {
	// remove special chars
	productName = clean(productName);
	
	this.additionalProductViews[collection] = this.additionalProductViews[collection] || "";
	this.additionalProductViews[collection] += ";" + productName + ";;;;evar11=" + basePageName + collection + ",";
}

siteCatalystInstance.prototype.setAdditionalPageViews = function(collection) {
	s.products = s.products + "," + this.additionalProductViews[collection];
}

// Tab functionality
siteCatalystInstance.prototype.setTabView = function(basePageName) {
	// Append the tab name to the basePageName string.
	if($.urlParam('tab')) {
		s.pageName = basePageName + $.urlParam('tab');
	} else {
		s.pageName = basePageName + 'Overview';
	}
}
 
siteCatalystInstance.prototype.newTabView = function(args) {
	// When a new tab is viewed, remove the current tab name from the string and append the new tab name. 
	s.pageName = s.pageName.substr(0,s.pageName.lastIndexOf(':') + 1) + args.spagename;
	this.productView(this.productName);
}
 
////////////////////////////////////////////////
// ACTIONSCRIPT FUNCTIONS
// Used within 360 Media Showcase code
////////////////////////////////////////////////
function getTrackingSuite() {
	return s.fun;
}

function getTrackingServer() {
	return s.trackingServer;
}

////////////////////////////////////////////////
// COLORWARE DESIGN TOOL TRACKING
// Used on QC25 page
////////////////////////////////////////////////

function trackDesignTool(name) {
	// store page name
	var siteCatalystPageName = s.pageName;

	// set variables
	s.pageName=siteCatalystPageName + ":" + name;
	s.prop35=s.pageName;
	s.eVar43=s.pageName;

	// send data to SiteCatalyst
	s.doPlugins=s_doPlugins;
	var s_code=s.t();

	// set page name back to original
	s.pageName = siteCatalystPageName;

	// reset custom vars
	s.prop35 = undefined;
	s.prop44 = undefined;
}


////////////////////////////////////////////////
// WIFI MUSIC SYSTEMS - CATEGORY PAGE
////////////////////////////////////////////////

function trackPanelView(activePanel) {

	// store inital page name
	var pagename = s.pageName;

	activePanel = activePanel.replace(/-/g,' ');
	activePanel = activePanel.capitalize();

	// set page name to current panel
	s.pageName = pagename + ":Panel:" + activePanel;

	// send data to SiteCatalyst
	s.doPlugins=s_doPlugins;
	var s_code=s.t();

	// set page name back to original
	s.pageName = pagename;

}

jQuery(document).ready(function($) {
	// sets page name calls for panels
	$(".type_wifi-home-systems #navigation li").on('click', function() {
		var activePanel = $(this).attr('id');
		trackPanelView(activePanel);
	});

	// sets custom links on presets
	$(".page2-preset").on('click', function() {
		var preset = $(this).attr('id');
		preset = preset.replace(/-/g,' ').replace(' ', '');
		preset = preset.capitalize();
		var customLink = s.pageName + ":Panel:One Touch Access:" + preset;
		s.tl(true, 'o', customLink);
	});

	// sets custom links on panel 3 ipad animations
	$("#page3-ipadmenu li").on('click', function() {
		var animation = $(this).attr('id');
		animation = animation.replace(/-/g,' ');
		animation = animation.capitalize();
		var customLink = s.pageName + ":Panel:Control Your Way:" + animation;
		s.tl(true, 'o', customLink);
	});


});

/***
** title: Get querystring param
** description: Returns the value of a querystring key
** usage: var querystring = $.urlParam('key'); 
***/
$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (!results) { return 0; }
	return decodeURIComponent(results[1].replace(/\+/g, " ")) || 0;
}

/**
* Helper to capitalize first letter of every word
*/
String.prototype.capitalize = function(){
return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};