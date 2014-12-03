/*jslint browser: true, vars: true, sloppy: true, white: true, regexp: true, eqeq: true */
/*global $, getYouTubeEmbedURL, getLocationObject, getLocationQueryArgs */
/*********************************************************
Global JS file for GEAppliances.com (as of 08/09 redesign)
*********************************************************/

// fixes IE6 background image flicker bug
try {
	document.execCommand('BackgroundImageCache', false, true);
} catch (e) {
}


// global vars
var popupWin;
var scrnwidth = screen.width;
var scrnheight = screen.height;


// URL prefix generally used for support files and iframes.  Do not
// include trailing slash.
var Base_Href;

// URL prefix generally used for links pointing to static pages on
// geappliances.com.  Do not include trailing slash.
var UnSecure_Base_Href;

if (/\bteamsite\./.test(location.host)) {
	if (/\/secure\.geappliances\.com\//.test(location.pathname)) {
		Base_Href          = location.protocol + "//" + location.host;
		UnSecure_Base_Href = "http://www.geappliances.com";
	} else {
		Base_Href          = location.protocol + "//" + location.host;
		UnSecure_Base_Href = "http://" + location.host;
	}
} else if (location.protocol === "https:") {
	Base_Href          = "https://secure.geappliances.com";
	UnSecure_Base_Href = "http://www.geappliances.com";
} else {
	Base_Href          = "http://www.geappliances.com";
	UnSecure_Base_Href = "http://www.geappliances.com";
}


// Replace relative URLs in page based on if it's a simple <a
// href="/example/"></a> or img sources.
//
// Relative href links will be changed to UnSecure_Base_Href
// links. Support files such as images are changed to
// //www.geappliances.com so it inherits whatever the current area is
// in (SSL or non-SSL), unless it is in TeamSite, where it stays
// relative
//
// To call the function, alter the <body> tag to be:
//
//     <body onload="replaceLinks();">
//
function replaceLinks() {
	var html = document.body.innerHTML;
	html = html.replace(/src=\"\/(?!\/)/g,   'src="' + Base_Href + '/');
	html = html.replace(/href=\"\/(?!\/)/g,  'href="' + UnSecure_Base_Href + '/');
	html = html.replace(/value=\"\/(?!\/)/g, 'value="' + UnSecure_Base_Href + '/');
	document.body.innerHTML = html;
}


// Change tab functionality
function changeTabContent(activeTab) {
	$("ul.tabs li").removeClass("active"); // Remove any "active" class
	$(activeTab + '_top').addClass("active"); // Add "active" class to selected tab, using the id created at document load
	
	$(".tab_content").hide(); // Hide all tab content
	$(activeTab).fadeIn();	  // Fade in the active content
}


// "only 1 open at a time" popup function.
//-----------------------------------------------------------------------------
// The fifth argument, windowname, is optional.  If specified, it is passed as
// the second argument to window.open().  This is required in order to leave
// the popup opener page (without closing the popup), come back to it, and NOT
// have a duplicate popup window.
//-----------------------------------------------------------------------------
function openPop (url, width, height, addloptions, windowname) {
	if (windowname === undefined || windowname === null) {
		windowname = "";
	}
	var xspot = Math.round((scrnwidth / 2) - (width / 2));
	var yspot = Math.round((scrnheight / 2) - (height / 2) - 30);
	var features = "height=" + height + ",width=" + width + ",top=" + yspot + ",screenY=" + yspot + ",left=" + xspot + ",screenX=" + xspot;
	if (addloptions && addloptions !== "") { 
		features += "," + addloptions; 
	}
	if (!popupWin || popupWin.closed) {
		popupWin = window.open(url, windowname, features);
	}
	else {
		window.popupWin.close();
		popupWin = window.open(url, windowname, features);
	}
}


//-----------------------------------------------------------------------------
// recommended usage:
//
//   <a target="_blank" href="http://www.youtube.com/watch?v=[VIDEO_ID]"
//      onclick="openNakedYouTubePopup(this.href); return false;">...</a>
//
// works with the following kinds of YouTube URLs, converting them
// automatically to their proper embed URLs for the popup:
//
//   http://www.youtube.com/watch?v=[VIDEO_ID]
//       (presence of other query string parameters is fine)
//       (presence of hash is also fine)
//   http://youtu.be/[VIDEO_ID]
//
// urls NOT of the above listed formats will also work, without
// conversion, incase you want to do some kind of custom naked popup.
//
// fourth argument (options) is optional.  See getYouTubeEmbedURL()
// for info.
//-----------------------------------------------------------------------------
function openNakedYouTubePopup (href, width, height, options) {
	var search, params, url;
	if (!width)  { width  = 640; }
	if (!height) { height = 480; }
	url = getYouTubeEmbedURL(href, options);
	openPop(url, width, height, 'scrollbars,resizable');
}


//-----------------------------------------------------------------------------
// converts most YouTube URLs to "http://www.youtube.com/embed?v=...&..."
// properties in options argument override query-string parameters in url.
//
// options is an optional argument.  It can be an object containing any of
// the following properties:
//
//     rel
//
//     autoplay
//-----------------------------------------------------------------------------
function getYouTubeEmbedURL (url, options) {
	var loc = getLocationObject(url);
	var args = getLocationQueryArgs(loc);
	var result, videoId, newargs = [];

	// extract video ID if possible
	// note: IE removes leading / from <location>.pathname.
	if (/\byoutu\.be$/.test(loc.hostname)) {
		if (/^\/?([^\/\#\?\&]+)/.test(loc.pathname)) {
			videoId = RegExp.$1;
		}
	}
	else if (args.v !== undefined) {
		videoId = args.v;
	}
	else if (/^\/?embed\/([^\/\#\?\&]+)/.test(loc.pathname)) {
		videoId = RegExp.$1;
	}

	if (videoId) {
		result = "http://www.youtube.com/embed/" + videoId;
		if (options && options instanceof Object) {
			Object.extend(args, options);
		}
		if (args.autoplay !== undefined) {
			args.autoplay = (args.autoplay === true) ? "1" : (args.autoplay === false) ? "0" : args.autoplay;
			newargs.push("autoplay=" + args.autoplay);
		}
		if (args.rel !== undefined) {
			args.rel = (args.rel === true) ? "1" : (args.rel === false) ? "0" : args.rel;
			newargs.push("rel=" + args.rel);
		} else {
			newargs.push("rel=0");
		}
		// other parameters that might be supported:
		//   https://developers.google.com/youtube/player_parameters
		result = result + "?" + newargs.join("&");
		return result;
	}
	return url;
}


/*
Function to encode special characters, as well as anything that's not
printable ASCII, as HTML entities for safe inclusion in generated HTML.
	
Usage example:

document.write('<a href="' + encodeEntities(url) + '">moo</a>\n');
*/
function encodeEntities (s) {
	if (s === undefined || s === null) {
		s = ""; 
	} else {
		s = s + "";
	}
	s = s.replace(/&/g, "&amp;");
	s = s.replace(/</g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	s = s.replace(/\x22/g, "&quot;"); /* double quotation mark */
	s = s.replace(/\x27/g, "&#39;"); /* ASCII apostrophe -
		&apos; is not universal yet */
	s = s.replace(/[^\x20-\x7e]/g,
		function (ch) {
			return "&#" + ch.charCodeAt(0) + ";";
		}
	); /* escape anything other than ASCII printable */
	return s;
}

/*
based on openLarger() from http://www.gelighting.com/na/scripts/global.js

Usage example --- onclick event (also applies for href="javascript:..."):

	<a target="_blank" href="images/foo.jpg"
		onclick="openNakedImagePopup('images/foo.jpg', 640, 480, 'GE Profile(TM) Series Washers and Dryers'); return false;">
			view larger photo
	</a>

	Got &, <, >, ', ", or other special characters?

	<a target="_blank" href="images/foo.jpg?foo=1&amp;bar=2"
		onclick="openNakedImagePopup('images/foo.jpg?foo=1&amp;bar=2', 640, 480, 'GE Profile&trade; Series Washers &amp; Dryers'); return false;">
			view larger photo
	</a>

	REMEMBER:
	While this function runs encodeEntities on the imageURL and altText,
	you still need to escape <, >, &, ', and " characters in onclick events
	or any other HTML attribute value (the browser unescapes them, then
	openNakedImagePopup re-escapes them).
	While most browsers are lenient, XHTML validation tools will issue
	warnings or error messages if you do not do this.

Usage example --- <script> element (also applies for .js files):

	<script type="text/javascript">
		function openPopup () {
			openNakedImagePopup('images/foo.jpg', 640, 480, 'GE Profile(TM) Series Washers and Dryers');
			// Got special characters?
			openNakedImagePopup('images/foo.jpg?foo=1&bar=2', 640, 480, 'GE Profile\u2122 Series Washers & Dryers'); // [1] one way
			openNakedImagePopup('images/foo.jpg?foo=1&bar=2', 640, 480, 'GE Profile&trade; Series Washers &amp; Dryers', true); // [2] another way
			// notice lack of entity escaping here --^ in the URLs.
			// you don't need to entity-escape the URLs in <script>
			// elements or .js files.
		}
	</script>
	<a target="_blank" href="images/foo.jpg" onclick="openPopup(); return false;">
		view larger photo
	</a>

	Got &, <, >, ', ", or other special characters?

	REMEMBER:
	Since browsers do NOT unescape entities in <script> elements like they
	do in HTML attribute values, you do NOT need to do HTML entity escaping
	here.  \ escaping still applies.  See [1] above.

	If you don't like looking up Unicode hex values, you can use HTML
	entity escaping instead.  However, within <script> elements and .js
	files, you MUST pass an optional fifth argument of true.  In other
	contexts, such as onclick attributes and javascript: hrefs, you
	MUST NOT pass the optional fifth argument.  (The browser unescapes
	entities in onclick/href attributes, but not in script elements or
	.js files; the optional fifth argument tells openNakedImagePopup
	to *not* perform entity-escaping on the alt text.)
	
*/

var nakedImagePopupWindow;
function openNakedImagePopup(imageURL, width, height, altText, isEscaped) {
	var screenX = Math.round((screen.width - width) / 2);
	var screenY = Math.round((screen.height - height - 60) / 2); /* assume 60px for titlebar, toolbars, other vertical real-estate */
	var features = ( /* parenthesis for multiline expression */
		"width=" + width
		+ ",height=" + height
		+ ",screenX=" + screenX + ",screenY=" + screenY /* Netscape */
		+ ",left=" + screenX + ",top=" + screenY /* IE */
	);
	if (nakedImagePopupWindow && !(nakedImagePopupWindow.closed)) {
		nakedImagePopupWindow.close();
	}
	nakedImagePopupWindow = window.open(null, null, features);
	if (altText != null && !isEscaped) {
		altText = encodeEntities(altText);
	}
	var html = ( /* parenthesis for multiline expression */
		'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n'
		+ '<html>\n'
		+ '<head>\n'
		+ '<title>'
		+ ((altText != null) ? altText : 'Photo')
		+ '</title>\n'
		+ '<style type="text/css">\n'
		+ 'html, body { margin: 0; padding: 0; background-color: white; color: black; }\n'
		+ '</style>\n'
		+ '</head>\n'
		+ '<body>\n'
		+ '<img src="' + encodeEntities(imageURL) + '"\n'
		+ ' width="' + width + '"'
		+ ' height="' + height + '"'
		+ ((altText != null) ? (' alt="' + altText + '"') : "")
		+ ' border="0"'
		+ ' />\n'
		+ '</body>\n'
		+ '</html>\n'
	);
	nakedImagePopupWindow.document.open();
	nakedImagePopupWindow.document.write(html);
	nakedImagePopupWindow.document.close();
}


function closepopups(){
	if (popupWin && popupWin.open){
		window.popupWin.close();
	}
}

// Function to open FAQ popups
// Uses the 'openPop' function
function callOpenPop(faqFileName){
	var urlFaq = "/search/google/infobase/"+faqFileName;
	openPop(urlFaq,'575','480','scrollbars,resizable,toolbar');
}

// Function to open video gallery
// Uses the 'openPop' function
function openVideoGalleryPopup(url) {
	var link = document.createElement("a");
	link.href = url;
	if (link.hostname === "link.brightcove.com") {
		openPop(url, 494, 572, 'scrollbars,resizable');
	} else {
		openPop(url, 780, 730, 'scrollbars,resizable'); // legacy KIT digital
	}
}

// Function to open Email-A-Friend -- ClickQuared version 
// Uses the 'openPop' function
function openEmailafriendPopup(url) {
	var encurl = encodeURIComponent(url);
	openPop("http://forms.geconsumerandindustrial.com/asbs/servlet/SS?F=3123803&C=21036959&product="+encurl, 600, 630, 'scrollbars,resizable');
}


/* clears default value of text input on focus */
function textInputFocusClear(obj) {
	if(obj.value == obj.defaultValue) {
		obj.value = "";
	}
}
/* resets default value on blur if no text is entered */
function textInputBlurReset(obj) {
	if(obj.value == "") {
		obj.value = obj.defaultValue;
	}
}



//get url parameter value by name
function getParamFromURL(paramName)
{
  var regexS = "[\\?&'&amp;']"+ paramName +"=([^&#]*)";
  var regex = new RegExp( regexS );
  var tmpURL = window.location.href;
  var results = regex.exec( tmpURL );
  if( results == null )
    return "";
  else
    return results[1];
}
// Function to get a value from URL
function getValueFromURL(paramName)
{
  var regexS = "[\\?&'&amp;']"+ paramName +"=([^&#]*)";
  var regex = new RegExp( regexS );
  var tmpURL = window.location.href;
  var results = regex.exec( tmpURL );
  if( results == null )
    return "";
  else
    return results[1];
}




/***********************************************************
The "topNavSelector" function sets a selected item in the
top nav for the current page (based on the page URL and the
left nav link's HREF).

For pages that exist outside the major categories defined in
the top nav, the default behavior will be to set the home
button as selected. To force an item in the top nav to be 
set as selected, the corresponding A tag must be assigned a unique
ID in the top nav include file. Then you must pass that ID 
into the "topNavSelector" function.

This function should be run in the page immediately 
following the top nav include call.
***********************************************************/
function topNavSelector(optionalID) {
	var pagePath, pageURL, workareaCheck, i;

	try {
		pageURL = document.location.href;
		// test for Teamsite URL
		workareaCheck = pageURL.indexOf("WORKAREA/");

		// determine URL path (testing for Teamsite, as well)
		if(workareaCheck != -1) {
			pagePath = pageURL.split("WORKAREA/")[1];
			pagePath = pagePath.substr(pagePath.indexOf("/"));
		} else {
			pagePath = location.pathname;
		}
		
		if(!optionalID || !document.getElementById(optionalID)) {
			
			var navArray = document.getElementById("topNav").getElementsByTagName("a");
			// cycle through nav items looking for one with HREF that matches the beginnging of the page URL
			for(i=0;i<navArray.length;i += 1) {
				
				var testHref = navArray[i].pathname;
				if(testHref.indexOf("/") != 0) { testHref = "/" + testHref; } // IE doesn't include beginning slash
				
				
				if(pagePath.indexOf(testHref) == 0 && navArray[i].parentNode.tagName != "LI") {
					navArray[i].className += " selected";
					break;
				}// if
			} // for
			
		} else {
			
			document.getElementById(optionalID).className += " selected";
			
		} // else
		
	} catch(err) {} // try-catch
} // function





/* This function alternates the background color of table rows between 
	white and gray by placing a class of "odd" on every other row. 
	This function applies to tables that contain a class of 'graybarTable'.*/
function alternateOddRowsInGraybarTables () {
	/* sanity check */
	if (!document.getElementsByTagName) {
		return;
	}

	var tables = document.getElementsByTagName("table");
	for (var i = 0; i < tables.length; i += 1) {
		var table = tables[i];
		if (!table.className || !/\bgraybarTable\b/.test(table.className)) {
			continue;
		}

		var els = table.getElementsByTagName("tbody");
		if (!els || !els.length) continue;
		var tbody = els[0];

		var rows = tbody.getElementsByTagName("tr");
		if (!rows || !rows.length) continue;
		for (var j = 0; j < rows.length; j += 2) {
		rows[j].className = rows[j].className + " odd";
		}
	}
}





// Function for search.
function fnMastheadSearch (form) {
	var searchField = form.SEARCHTEXT;
	searchField.value = searchField.value.replace(/\%/g, ""); // workaround bug on corporate server
	var searchValue = searchField.value;

	var categoryField = form.selSearchCategory;
	var category;
	if (categoryField.type === "select") { // legacy form
		category = categoryField.options[categoryField.selectedIndex].value;
	}
	else {			// Google-powered search form
		category = categoryField.value;
	}

	// begin validation
	switch (category) {
	case "3":
		// extra validation if wanting use & care manuals
		if (searchValue === "") {
			alert("Please enter model number.");
			searchField.focus();
			searchField.select();
			return false;
		}
		if (searchValue.length < 3) {
			alert("Please enter at least 3 characters.");
			searchField.focus();
			searchField.select();
			return false;
		}
		break;
	default:
		if (searchValue === "") {
			alert("Please enter search term(s)");
			searchField.focus();
			searchField.select();
			return false;
		}
	}
	// end validation

	switch (category) {
	case "":
	case "0":		// nothing selected yet
		if (categoryField.type === "select") {
			categoryField.selectedIndex = 1;
		}
		else {
			categoryField.value = "1";
		}
		category = "1";
		// FALL THROUGH to case for "1".
	case "1":		// Products
		form.action       = "http://genet.geappliances.com/geasearch/Dispatcher?REQUEST=GETSEARCHRESULT";
		form.SITEID.value = "GEAPPLIANCES";
		form.SKU.value    = "";
		break;
	case "2":		// Service & Support
		form.action       = "http://genet.geappliances.com/geasearch/Dispatcher?REQUEST=GETSEARCHRESULT";
		form.SITEID.value = "GEACAPPL";
		form.SKU.value    = "";
		break;
	case "3":		// Use & Care Manuals
		form.action       = "http://genet.geappliances.com/DocSearch/Dispatcher?REQUEST=SEARCHWITHURLCONNECTION";
		form.SITEID.value = "GEA";
		form.SKU.value    = searchValue;
		break;
	}

	return true;
}




// Knowledge Base search 
function validGEACSearch (form) {
	if ("SEARCHTEXT" in form) { // legacy form
		form.SEARCHTEXT.value = form.SEARCHTEXT.value.replace(/\%/g, ""); // workaround bug on corporate server
		if (!/\S/.test(form.SEARCHTEXT.value)) {
			alert("Please enter a search term or model number.");
			form.SEARCHTEXT.focus();
			form.SEARCHTEXT.select();
			return false;
		}
	}
	else if ("q" in form) {	// Google-powered search form
		if (!/\S/.test(form.q.value)) {
			alert("Please enter a search term or model number.");
			form.q.focus();
			form.q.select();
			return false;
		}
	}
	return true;
}




/*************************** COMPARE PAGE FUNCTIONS ***************************/
// init var that means that the "only show differences" option is currently off
var differencesToggled = false;

/* This function expands and contracts the "product details" sections on COMPARE pages */
function compareProductDetailsToggle(obj) {
	
	var thisRow = obj;
	while(thisRow.tagName != "TR")	{
		thisRow = thisRow.parentNode;
	}// while
	
	var rowGroupArray = new Array();
	for(i=thisRow.rowIndex+1; i<document.getElementById("compareTable").rows.length; i += 1 ) {
		if( document.getElementById("compareTable").rows[i].className != "subHeadingRow" && document.getElementById("compareTable").rows[i].className != "productInfoRow" ) {
			if(document.getElementById("compareTable").rows[i].className == "differenceRow" || differencesToggled != true) {
				rowGroupArray.push(document.getElementById("compareTable").rows[i]);
			}
		} else {
			break;
		}
	}
	
	var linkSpansArray = thisRow.getElementsByTagName("span");
		
	if(rowGroupArray[0].style.display != "none") {
		
		for(i=0; i<rowGroupArray.length; i += 1) {
			rowGroupArray[i].style.display = "none";
		}
		for( i=0; i< linkSpansArray.length; i += 1 ) {
			if( linkSpansArray[i].className == "showHide" ) { linkSpansArray[i].innerHTML = "show"; }
			if( linkSpansArray[i].className == "plusMinus" ) { linkSpansArray[i].innerHTML = "+"; }
		}
		thisRow.cells[0].style.borderBottomWidth = "0";
		
	} else {
		
		for(i=0; i<rowGroupArray.length; i += 1) {
			rowGroupArray[i].style.display = "";
		}
		
		for( i=0; i< linkSpansArray.length; i += 1 ) {
			if( linkSpansArray[i].className == "showHide" ) { linkSpansArray[i].innerHTML = "hide"; }
			if( linkSpansArray[i].className == "plusMinus" ) { linkSpansArray[i].innerHTML = "-"; }
		}
		thisRow.cells[0].style.borderBottomWidth = "1px";
		
	}
}


/* This function toggles between showing all points of comparison or just the ones with differences on COMPARE pages */
function compareDifferencesToggle(obj) {
	var rowsArray = document.getElementById("compareTable").getElementsByTagName("tbody")[0].rows;
	var showHeading = false; /* init value */
	var differencesBox = document.getElementById("differencesBox");
	
	if(differencesToggled != true) {
	
		for(i=rowsArray.length-1; i>=0; i--) {
			rowsArray[i].style.display = "none";
			if( rowsArray[i].className == "differenceRow" ) {
				rowsArray[i].style.display = "";
				showHeading = true;
			}
			if( rowsArray[i].className == "subHeadingRow" && showHeading == true ) {
				var linkSpansArray = rowsArray[i].getElementsByTagName("span");
				for( j=0; j< linkSpansArray.length; j++ ) {
					if( linkSpansArray[j].className == "showHide" ) { linkSpansArray[j].innerHTML = "hide"; }
					if( linkSpansArray[j].className == "plusMinus" ) { linkSpansArray[j].innerHTML = "-"; }
				}
				
				rowsArray[i].style.display = "";
				showHeading = false;
			}
		}
		
		differencesBox.getElementsByTagName("span")[0].innerHTML = "Show All Features";
		differencesBox.getElementsByTagName("a")[0].innerHTML = "Show all features for these products.";
		
		differencesToggled = true;
	
	} else {
		
		for(i=0; i<rowsArray.length; i += 1) {
			rowsArray[i].style.display = "";
		
			var linkSpansArray = rowsArray[i].getElementsByTagName("span");
			for( j=0; j< linkSpansArray.length; j++ ) {
				if( linkSpansArray[j].className == "showHide" ) { linkSpansArray[j].innerHTML = "hide"; }
				if( linkSpansArray[j].className == "plusMinus" ) { linkSpansArray[j].innerHTML = "-"; }
			}
		}
		
		differencesBox.getElementsByTagName("span")[0].innerHTML = "Show Me the Differences";
		differencesBox.getElementsByTagName("a")[0].innerHTML = "Only show features that are different between models.";
		
		differencesToggled = false;
	}
}

/*************************** END COMPARE PAGE FUNCTIONS ***************************/




/*************************** SPEC PAGE FUNCTIONS ***************************/

/* This function expands and contracts the "product details" sections on SPEC pages */
function specProductDetailsToggle(obj) {
	var productDetailsTableWrapper = obj.parentNode.parentNode.getElementsByTagName("table")[0].parentNode;
	
	var linkSpansArray = obj.parentNode.getElementsByTagName("span");
		
	if(productDetailsTableWrapper.style.display != "none") {
		
		productDetailsTableWrapper.style.display = "none";
		
		for( i=0; i< linkSpansArray.length; i += 1 ) {
			if( linkSpansArray[i].className == "showHide" ) { linkSpansArray[i].innerHTML = "show"; }
			if( linkSpansArray[i].className == "plusMinus" ) { linkSpansArray[i].innerHTML = "+"; }
		}
		
	} else {
		
		productDetailsTableWrapper.style.display = "block";
		
		for( i=0; i< linkSpansArray.length; i += 1 ) {
			if( linkSpansArray[i].className == "showHide" ) { linkSpansArray[i].innerHTML = "hide"; }
			if( linkSpansArray[i].className == "plusMinus" ) { linkSpansArray[i].innerHTML = "-"; }
		}
		
	}
}




// number of current product image on spec pages (defaulted to first image)
var currentSpecImage = 0;

/* this functions sets the selected thumbnail and populates the larger image  */
function setMainImage(num) {
	
	// check the limits
	if( num < 0 ) { num = productImagesArray.length -1 }
	if( num >= productImagesArray.length ) { num = 0; }
	
	// set selected thumbnail
	document.getElementById("productThumbnail"+currentSpecImage ).childNodes[0].className = "";
	document.getElementById("productThumbnail"+num ).childNodes[0].className = "doubleBorder";
	
	// write main image
	mainImageSrc = productImagesArray[num][1];
	if(!productImagesArray[num][2] || GetSwfVer() == -1) {
		anchorContents = "";
		document.getElementById("magnifyInstructions").style.visibility = "hidden";
	}else {
		anchorContents = " class=\"MagicMagnify\" rel=\"zoom-color: #cccccc; size: 180px; type: square\" href=\"" + productImagesArray[num][2] + "\"";
		document.getElementById("magnifyInstructions").style.visibility = "visible";
	}
	document.getElementById("imageCell").innerHTML = "<a" + anchorContents + "><img id=\"mainImage\" src=\"" + mainImageSrc + "\" width=\"480\" height=\"500\" alt=\"\" title=\"\" /></a>";
	
	currentSpecImage = num;
}


/* this function populates the thumbnails and larger image on spec pages */
function populateProductImages() {
	// hide arrows and thumbs if only one image is available
	if(productImagesArray.length == 1) {
		document.getElementById("thumbnailsViewer").style.display = "none";
		leftRightButtonLinks = document.getElementById("mainImageViewer").getElementsByTagName("a");
		leftRightButtonLinks[0].style.visibility = "hidden";
		leftRightButtonLinks[1].style.visibility = "hidden";
	}
	
	// populate the thumbnails
	for(i=0; i<productImagesArray.length; i += 1) {
		document.getElementById("thumbnailsViewer").innerHTML += "<a id=\"productThumbnail" + i + "\" href=\"javascript:setMainImage(" + i + "); MagicMagnify_findMagnifiers();\"><img src=\"" + productImagesArray[i][0] + "\" width=\"60\" height=\"63\" alt=\"View larger\" title=\"View larger\" /></a> ";
	}
	
	// set the first thumbnail as selected and populate the larger images
	setMainImage(currentSpecImage);
}
/*************************** END SPEC PAGE FUNCTIONS ***************************/

/*************************** START SPEC PAGE 2012 FUNCTIONS ***************************/
		
var imgwidthvary = 81;
var lastNum;
var movedOver = false;
var wasBackwards = false;
var startOver = false;
var pathname = window.location.pathname;

/* this function sets the selected thumbnail and populates the larger image  */
function newsetMainImage(num) {
			
	var allimgs = productImagesArray.length;
	var trueimglength = allimgs*81;
			
			
	/* Scroll the overflow DIV */
			
	//alert('num: ' + num + ' lastNum: ' + lastNum + ' imgwidthvary: ' + imgwidthvary + ' trueimglength: ' + trueimglength);
		
	// Did the user click the right arrow, and there's more than 4 images?
			
	if (num == lastNum + 1 && allimgs > 4) {
			
		// Is the current number equal to or greater than 3?
		if (num >= 3 && num < allimgs) {
				
			/* Is imgwidthvary less than 1? If so, set it back to 81 (the width of an image container) */
			if (imgwidthvary < 1) {
				imgwidthvary = 81;
			}
				
			// Were we going backwards before this?
					
			if (wasBackwards == true) {
				if (typeof moveOver === "undefined")  {
					moveOver = 0;
				}
						
				imgwidthvary = 0;
				imgwidthvary = moveOver + 81;
						
				moveOver = moveOver + 81;
				$('#thumbnailsViewer').stop().animate({ right: moveOver + 'px' }, 600);
			} else {
				$('#thumbnailsViewer').stop().animate({ right: imgwidthvary + 'px' }, 600);
				imgwidthvary = imgwidthvary + 81;
			}
		
			movedOver = true;
					
		} 
		else if (num == allimgs) {
			$('#thumbnailsViewer').stop().animate({ right: '0' }, 400);
			movedOver = false;
			moveOver = 0;
			wasBackwards = false;
			imgwidthvary = 81;
			startOver = true;
		}
	}
			
	// Did the user click the left arrow, and there's more than 4 images?

	else if (num == lastNum - 1 && allimgs > 4) {
	
		// Did the user click the left arrow right away?
		if (num < 0) {
			moveOver = trueimglength - 243;
			$('#thumbnailsViewer').stop().animate({ right: moveOver + 'px' }, 600);
			movedOver = false;
			wasBackwards = false;
			imgwidthvary = 81;
			startOver = false;
		}
		else if (num >= 3 && num < allimgs) {
			if (imgwidthvary >= 81) {
				if (typeof moveOver === "undefined" || startOver == true)  {
					moveOver = 0;
					moveOver = trueimglength - 81;
					imgwidthvary = imgwidthvary - 81;
					startOver = false;
				}
			}
					
			wasBackwards = true;
					
			if (movedOver == true) {
				moveOver = imgwidthvary;
				moveOver = moveOver - 81;
				$('#thumbnailsViewer').stop().animate({ right: imgwidthvary + 'px' }, 600);
				imgwidthvary = imgwidthvary - 81;
				//alert('movedOver true');
			} else {
				$('#thumbnailsViewer').stop().animate({ right: moveOver + 'px' }, 600);
				//alert('moving by: ' + moveOver + 'px');
				moveOver = moveOver - 81;
			}
		} 
		else if (num == 2) {
			$('#thumbnailsViewer').stop().animate({ right: '0' }, 600);
			movedOver = false;
			moveOver = 0;
			wasBackwards = false;
			imgwidthvary = 81;
			startOver = true;
		}
		else if (movedOver == true) {
			$('#thumbnailsViewer').stop().animate({ right: '0' }, 600);
			movedOver = false;
			moveOver = 0;
			wasBackwards = false;
			imgwidthvary = 81;
			startOver = true;
		}
	}

	// check the limits

	if( num < 0 ) { 
		num = productImagesArray.length -1 
	}
			
	if( num >= productImagesArray.length ) { 
		num = 0; 
	}
			
	lastNum = num;

	// set selected thumbnail

	document.getElementById("productThumbnail"+currentSpecImage ).childNodes[0].className = "";
	document.getElementById("productThumbnail"+num ).childNodes[0].className = "selected";

	// write main image

	mainImageSrc = productImagesArray[num][1];

	if(!productImagesArray[num][2]) {
		anchorContents = "";
		document.getElementById("magnifyInstructions").style.visibility = "hidden";
	}else {
		anchorContents = " class=\"MagicZoomPlus\" rel=\"zoom-position:inner;zoom-fade: true; buttons:hide;\" href=\"" + productImagesArray[num][2] + "\"";
		document.getElementById("magnifyInstructions").style.visibility = "visible";
	}
	document.getElementById("imageCell").innerHTML = "<a" + anchorContents + "><img id=\"mainImage\" src=\"" + mainImageSrc + "\" width=\"480\" height=\"500\" alt=\"\" title=\"\" /></a>";
			
			
	// write the main image for the printer CSS. The DIV is hidden unless the printer CSS is loaded
	
	document.getElementById("productImgforPrint").innerHTML = "<img src=\"" + mainImageSrc + "\" width=\"288\" height=\"300\" alt=\"Product image for print\" title=\"Product image for print\" />";
	
	// Write the main image for the AddThis Pinterest button
	
	var pinterestElement = document.getElementById("pinterestBtn");
	if (pinterestElement != null) {
		pinterestElement.setAttribute('pi:pinit:media', mainImageSrc);

		if ($(pinterestElement).hasClass("TEMPORARY_button_pinterest_pinit")) {
			var dest = "http://pinterest.com/pin/create/button/?url={url}&media={media}&description=&layout=";
			dest = dest.replace(/{url}/,   encodeURIComponent(location.href));
			dest = dest.replace(/{media}/, encodeURIComponent(mainImageSrc));
			$(pinterestElement).attr({ "href": dest, "target": "_blank" }).unbind("click").click(function() {
				openPop(this.href, 754, 288, undefined, "pinterestPopup");
				return false;
			});
		}
	}
	currentSpecImage = num;
}

/* this function populates the thumbnails and larger image on spec pages */

function newpopulateProductImages() {
	// hide arrows and thumbs if only one image is available
	if(productImagesArray.length == 1) {
		document.getElementById("thumbnailViewerMain").style.display = "none";
	}

	// populate the thumbnails

	for(i=0; i<productImagesArray.length; i += 1) {
		document.getElementById("thumbnailsViewer").innerHTML += "<li><a id=\"productThumbnail" + i + "\" href=\"javascript:newsetMainImage(" + i + "); activateMagicZoom();\"><img src=\"" + productImagesArray[i][0] + "\" width=\"60\" height=\"63\" alt=\"View larger\" title=\"View larger\" /></a></li> ";
	}

	// set the first thumbnail as selected and populate the larger images
	newsetMainImage(currentSpecImage);
}
		

/*************************** END SPEC PAGE 2012 FUNCTIONS ***************************/




/******************* FOOTER FUNCTIONS *******************/

function validateNewsletterSubscriptionForm (form) {
	if (!form.i_emailgeneric) {
		return true;
	}
	if(!(/^\w+((-\w+)|(\.\w+)|(\+\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9][A-Za-z0-9]+$/.test(form.i_emailgeneric.value))) {
		alert("This does not appear to be a valid e-mail address.  Please try again.");
		form.i_emailgeneric.select();
		return false;
	}
	return true;
}

function openPrivacyPolicyPopup (url) {
	return openPop(url, 640, 500, "scrollbars,resizable",
		       "GEAPrivacyPolicy");
}

function openTermsPopup (url) {
	return openPop(url, 640, 500, "scrollbars,resizable",
		       "GEATerms");
}

/***************** END FOOTER FUNCTIONS *****************/








/***************** BEGIN FLASH PLAYER UTILITY FUNCTIONS *****************/

// Flash Player Version Detection - Rev 1.6
// Detect Client Browser type
// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");			
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
			//alert("flashVer="+flashVer);
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
    var str = '';
    if (isIE && isWin && !isOpera)
    {
  		str += '<object ';
  		for (var i in objAttrs)
  			str += i + '="' + objAttrs[i] + '" ';
  		for (var i in params)
  			str += '><param name="' + i + '" value="' + params[i] + '" /> ';
  		str += '></object>';
    } else {
  		str += '<embed ';
  		for (var i in embedAttrs)
  			str += i + '="' + embedAttrs[i] + '" ';
  		str += '> </embed>';
    }

    document.write(str);
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "id":
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}

/***************** END FLASH PLAYER UTILITY FUNCTIONS *****************/



//-----------------------------------------------------------------------------
// BEGIN MOBILE REDIRECT CODE
//-----------------------------------------------------------------------------
var hasFlash = GetSwfVer() !== -1;

// Simplified to define isMobile as being any screen < 768
// in January 2013 
var isMobileDevice;
if (window.screen.width < 768) {
	isMobileDevice = true;
}

// This function redirects the user to the URL specified in its first
// argument.
//
// If a second argument is specified and its "carryQueryString"
// property has a non-falsy value, any query string parameters on the
// current page will be appended to the redirect URL.
function mobileRedirect (url, options) {
	var q;
	function quotemeta(string) {
		return string.replace(/[^A-Za-z0-9_ \-]/g, function(c) { return "\\" + c; });
	}
	function hasCookie(name) {
		var rx = new RegExp('(?:^|; )' + quotemeta(encodeURIComponent(name)) + '=');
		return rx.test(document.cookie);
	}
	if (options && options.carryQueryString) {
		q = location.search.replace(/^\?/, "");
		if (/\?$/.test(url)) {       // test for blank query string
			url += q;
		} else if (/\?/.test(url)) { // test for non-blank query string
			url += "&" + q;
		} else {	             // no query string
			url += "?" + q;
		}
	}
	if (!hasCookie("preventMobileRedirect") && isMobileDevice) {
		location.replace(url);
	}
}
//-----------------------------------------------------------------------------
// END MOBILE REDIRECT CODE
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// BEGIN GOOGLE ANALYTICS CODE
//-----------------------------------------------------------------------------
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-23305009-1']);
_gaq.push(['_setDomainName', 'geappliances.com']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
//-----------------------------------------------------------------------------
// END GOOGLE ANALYTICS CODE
//-----------------------------------------------------------------------------



//-----------------------------------------------------------------------------
// BEGIN OPINIONLAB JAVASCRIPT ENGINE CODE
//-----------------------------------------------------------------------------

/*   OnlineOpinion v5.6.4 Released: 10/4/2012. Compiled 10/04/2012 11:28:22 AM -0500 Branch: master 4f693587716b7e98e287fda65b83b28cde6a3d5b Components: Full The following code is Copyright 1998-2012 Opinionlab, Inc.  All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab    */var OOo={Browser:(function(){var a=navigator.userAgent,b=Object.prototype.toString.call(window.opera)==='[object Opera]',c={IE:!!window.attachEvent&&!b,Opera:b,WebKit:a.indexOf('AppleWebKit/')>-1,Chrome:a.indexOf('Chrome')>-1,Gecko:a.indexOf('Gecko')>-1&&a.indexOf('KHTML')===-1,MobileSafari:/Apple.*Mobile.*Safari/.test(a),PalmPre:a.indexOf('Pre/')>-1,BlackBerry:a.indexOf('BlackBerry')>-1,Fennec:a.indexOf('Fennec')>-1,IEMobile:a.indexOf('IEMobile')>-1,OperaMobile:a.search(/Opera (?:Mobi|Mini)/)>-1,ua:a},d=false;c.isMobile=(c.MobileSafari||c.PalmPre||c.BlackBerry||c.Fennec||c.IEMobile||c.OperaMobile);return c}())};OOo.Cache={};OOo.instanceCount=0;OOo.K=function(){};var OnlineOpinion=OnlineOpinion||OOo;(function(){function l(a){return document.getElementById(a)}function k(a,b){var c;for(c in b){if(b.hasOwnProperty(c)){a[c]=b[c]}}return a}function m(a,b,c,d){if(a.addEventListener){a.addEventListener(b,c,d)}else if(a.attachEvent){a.attachEvent('on'+b,c)}}function q(a,b,c,d){if(a.removeEventListener){a.removeEventListener(b,c,d)}else if(a.detachEvent){a.detachEvent('on'+b,c)}}function s(a){var b=[],c;for(c in a){if(a.hasOwnProperty(c)){b.push(c+'='+(encodeURIComponent(a[c])||''))}}return b.join('&')}function t(a){var b=s(a.metrics),c=a.tealeafId+'|'+a.clickTalePID+'/'+a.clickTaleUID+'/'+a.ClickTaleGetSID;b+='&custom_var='+OOo.createLegacyVars(a.legacyVariables,c);if(a.metrics.type==='OnPage'){b+='|iframe'}if(a.asm){b+='&asm=2'}b+="&_"+'rev=2';if(a.customVariables){b+='&customVars='+encodeURIComponent(OOo.serialize(a.customVariables))}return b}function n(a,b){var c=document,d=c.createElement('form'),e=c.createElement('input'),f=a.referrerRewrite;a.metrics.referer=location.href;if(f){a.metrics.referer=OOo.referrerRewrite(f)}d.style.display='none';d.method='post';d.target=b||'OnlineOpinion';d.action=a.onPageCard?'https://secure.opinionlab.com/ccc01/comment_card_json_4_0_b.asp?r='+location.href:'https://secure.opinionlab.com/ccc01/comment_card_d.asp';if(a.commentCardUrl){d.action=a.commentCardUrl;if(a.onPageCard){d.action+='?r='+location.href}}e.name='params';e.value=t(a);d.appendChild(e);c.body.appendChild(d);return d}function r(){return{width:screen.width,height:screen.height,referer:location.href,prev:document.referrer,time1:(new Date()).getTime(),time2:null,currentURL:location.href,ocodeVersion:'5.6.4'}}function u(a){var b='';if(a&&a.search('://')>-1){var c=a.split('/');for(i=3;i<c.length;i++){b+="/";b+=c[i]}}return b}function o(a,b){a=a||{};if(typeof a==='string'){return b+'|'+a}return a.override?a.vars:b+(a.vars?'|'+a.vars:'')}function p(a,b){if(!b){b=location}if(typeof a==="string")return a;return a.searchPattern?b.href.replace(a.searchPattern,a.replacePattern):a.replacePattern}var w=(function(){var a=document.body,b,c,d,e,f;if(document.createElement&&a&&a.appendChild&&a.removeChild){b=document.createElement('div');if(!b.getBoundingClientRect){return null}b.innerHTML='x';b.style.cssText='position:fixed;top:100px;';a.appendChild(b);c=a.style.height;d=a.scrollTop;a.style.height='3000px';a.scrollTop=500;e=b.getBoundingClientRect().top;a.style.height=c;f=(e===100);a.removeChild(b);a.scrollTop=d;return f}return null}()),x=(function(){if(navigator.appName==="Microsoft Internet Explorer"&&navigator.userAgent.search("MSIE 6")!==-1){return true}var a=document.body,b,c;if(document.createElement&&a&&a.appendChild&&a.removeChild){b=document.createElement('iframe');c=false;b.setAttribute('name','oo_test');b.style.display='none';a.appendChild(b);c=!!!document.getElementsByName('oo_test')[0];a.removeChild(b);return c}else{return null}}());function v(){OOo.$('oo_container').style.display='none'}function A(){var a=OOo.$('oo_invitation_prompt');if(a){var b=OOo.$('oo_container');this.showPrompt(b);return}var c=window.XMLHttpRequest?new XMLHttpRequest():new window.ActiveXObject("Microsoft.XMLHTTP"),d=this,e=document.createElement('link'),f;c.onreadystatechange=function(){if(c.readyState!==4){return}d.showPrompt(c.responseText)};c.open("GET",this.options.pathToAssets+this.options.promptMarkup,true);c.send(null)}function y(a,b){var c=document,d=typeof a==='string'?c.createElement('div'):a,e=c.createElement('div'),f,g,h=this.options,j;e.id='oo_invitation_overlay';d.id='oo_container';d.style.visibility='hidden';if(typeof a==='string'){d.innerHTML=a;c.body.appendChild(d)}d.appendChild(e);j=OOo.$('oo_launch_prompt');if(h.companyLogo){f=new Image();f.src=h.companyLogo;OOo.$('oo_company_logo').appendChild(f)}OOo.addEventListener(j,'click',b.bind(this),false);if(h.clickCallbacks){if(typeof h.clickCallbacks.yes==='function'){OOo.addEventListener(j,'click',function(){h.clickCallbacks.yes()},false)}if(typeof h.clickCallbacks.no==='function'){OOo.addEventListener(OOo.$('oo_no_thanks'),'click',function(){h.clickCallbacks.no()},false)}}if(h.neverShowAgainButton){g=OOo.$('oo_never_show');g.style.visibility='visible';OOo.addEventListener(g,'click',this.killPrompt.bind(this),false)}if(OOo.Browser.IE&&!window.XMLHttpRequest){e.style.position='absolute';e.style.width=Math.max(document.documentElement.clientWidth,document.body.offsetWidth)+'px';e.style.height=Math.max(document.documentElement.clientHeight,document.body.offsetHeight)+'px';d.style.position='absolute'}d.style.visibility='visible';d.style.display='block';e.className='no_loading'}k(OOo,{extend:k,toQueryString:s,addEventListener:m,$:l,appendOOForm:n,removeEventListener:q,createMetrics:r,truncateMetric:u,createLegacyVars:o,POSITION_FIXED_SUPPORTED:w,DYNAMIC_FRAME_NAME_IS_BUGGY:x,getFormParams:t,referrerRewrite:p,hidePrompt:v,getPrompt:A,showPrompt:y})}());(function(){function f(a){if(!a){return null}switch(typeof a){case'number':case'boolean':case'function':return a;case'string':return'\''+a+'\'';case'object':var b,c,d,e;if(a.constructor===Array||typeof a.callee!=='undefined'){b='[';d=a.length;for(c=0;c<d-1;c+=1){b+=f(a[c])+','}b+=f(a[c])+']'}else{b='{';for(e in a){if(a.hasOwnProperty(e)){b+=e+':'+f(a[e])+','}}b=b.replace(/\,$/,'')+'}'}return b;default:return null}}OOo.extend(OOo,{serialize:f})}());(function(){function e(a,b,c){var d;if(a.search(b[0])!==-1){OOo.createCookie(c,0);return false}else if(OOo.readCookie(c)){d=parseInt(OOo.readCookie(c),10);if((a.search(b[d+1])!==-1)&&(d+1!==b.length-1)){OOo.createCookie(c,d+1);return false}else if(a.search(b[d])!==-1){return false}else if(d+1===b.length-1&&a.search(b.pop())!==-1){OOo.eraseCookie(c);return true}else{OOo.eraseCookie(c);return false}}else{return false}}OOo.extend(OOo,{checkTunnel:e})}());(function(){function r(a){var b="",c;for(c=7;c>=0;c-=1){b+='0123456789abcdef'.charAt((a>>(c*4))&0x0F)}return b}function u(a){var b=((a.length+8)>>6)+1,c=new Array(b*16),d;for(d=0;d<b*16;d+=1){c[d]=0}for(d=0;d<a.length;d+=1){c[d>>2]|=a.charCodeAt(d)<<(24-(d%4)*8)}c[d>>2]|=0x80<<(24-(d%4)*8);c[b*16-1]=a.length*8;return c}function o(a,b){var c=(a&0xFFFF)+(b&0xFFFF),d=(a>>16)+(b>>16)+(c>>16);return(d<<16)|(c&0xFFFF)}function p(a,b){return(a<<b)|(a>>>(32-b))}function w(a,b,c,d){if(a<20){return(b&c)|((~b)&d)}if(a<40){return b^c^d}if(a<60){return(b&c)|(b&d)|(c&d)}return b^c^d}function x(a){return(a<20)?1518500249:(a<40)?1859775393:(a<60)?-1894007588:-899497514}function v(a){var b=u(a),c=new Array(80),d=1732584193,e=-271733879,f=-1732584194,g=271733878,h=-1009589776,j,l,k,m,q,s,t,n;for(t=0;t<b.length;t+=16){j=d;l=e;k=f;m=g;q=h;for(n=0;n<80;n+=1){if(n<16){c[n]=b[t+n]}else{c[n]=p(c[n-3]^c[n-8]^c[n-14]^c[n-16],1)}s=o(o(p(d,5),w(n,e,f,g)),o(o(h,c[n]),x(n)));h=g;g=f;f=p(e,30);e=d;d=s}d=o(d,j);e=o(e,l);f=o(f,k);g=o(g,m);h=o(h,q)}return r(d)+r(e)+r(f)+r(g)+r(h)}OOo.extend(OOo,{sha1:v})}());(function(){function h(a,b){if(!b){b=location}var c=a.cookieName||'oo_abandon',d=OOo.readCookie(c),e=a.startPage,f=a.endPage,g=a.middle;if(!d){if(b.pathname.indexOf(e)!==-1){OOo.createCookie(c)}return false}else if(b.pathname.indexOf(f)!==-1){OOo.eraseCookie(c);return false}else if(b.pathname.search(g)!==-1){return false}else{OOo.eraseCookie(c);return true}}OOo.extend(OOo,{checkAbandonment:h})}());(function(){function d(a){var b,c;for(b=a.length-1;b>=0;b-=1){if(a[b].read){c=OOo.readCookie(a[b].name);if(!!c&&c===a[b].value){return true}else if(typeof a[b].value==='undefined'&&!!OOo.readCookie(a[b].name)){return true}}}return false}function e(a){var b;for(b=a.length-1;b>=0;b-=1){if(a[b].set){OOo.createCookie(a[b].name,a[b].value,a[b].expiration)}}}OOo.extend(OOo,{checkThirdPartyCookies:d,setThirdPartyCookies:e})}());OOo.extend(Function.prototype,(function(){if(typeof Function.prototype.bind!=="undefined"){return}var e=Array.prototype.slice;function f(a,b){var c=a.length,d=b.length;while(d){d-=1;a[c+d]=b[d]}return a}function g(a,b){a=e.call(a,0);return f(a,b)}function h(b){if(arguments.length<2&&typeof b==="undefined"){return this}var c=this,d=e.call(arguments,1);return function(){var a=g(d,arguments);return c.apply(b,a)}}return{bind:h}}()));(function(){function f(a){if(!a){a=location}var b;if(a.host.search(/\.[a-z]+/)!==-1){b=a.host.split('.').reverse();if(b.length>3){return a.host}b='.'+b[1]+'.'+b[0]}else{b=a.host}return b}function g(a,b,c){var d='',e='';if(c){d=new Date();d.setTime(d.getTime()+(c*1000));e="; expires="+d.toGMTString()}if(location.host!==f()){document.cookie=a+"="+b+e+"; path=/; domain="+f()+";"}else{document.cookie=a+"="+b+e+"; path=/;"}}function h(a){var b=a+"=",c=document.cookie.split(';'),d,e;for(e=0;e<c.length;e+=1){d=c[e];while(d.charAt(0)===' '){d=d.substring(1,d.length)}if(d.indexOf(b)===0){return d.substring(b.length,d.length)}}return null}function j(a){g(a,"",-1)}OOo.extend(OOo,{getCookieDomain:f,createCookie:g,readCookie:h,eraseCookie:j})}());OOo.Ocode=function(a){var b=OOo.Browser,c,d;if(a.disableMobile&&b.isMobile){return}if(a.disableNoniOS&&(navigator.userAgent.search('Android')!==-1||b.PalmPre||b.IEMobile||b.OperaMobile||b.Fennec)){return}OOo.instanceCount+=1;this.options={tealeafCookieName:'TLTSID'};OOo.extend(this.options,a);c=this.options;c.metrics=OOo.createMetrics();this.frameName=c.onPageCard?'OnlineOpinion'+OOo.instanceCount:'OnlineOpinion';if(c.cookie&&OOo.Ocode.matchUrl(c.cookie,location)){return}if(c.thirdPartyCookies&&OOo.checkThirdPartyCookies(c.thirdPartyCookies)){return}if(c.abandonment&&!OOo.checkAbandonment(c.abandonment)){return}if(c.tunnel&&!OOo.checkTunnel(location.pathname,c.tunnel.path,c.tunnel.cookieName)){return}if(c.events&&c.events.onSingleClick){this.singProbability=Math.random()<1-c.events.onSingleClick/100}c.tealeafId=OOo.readCookie(c.tealeafCookieName)||OOo.readCookie(c.sessionCookieName);if(c.events){this.setupEvents();if(c.events.disableLinks||c.events.disableFormElements){this.setupDisableElements()}}if(c.floating){this.floating()}else if(c.bar){this.bar()}else if(c.tab){this.tab()}};OOo.Ocode.prototype={show:function(a,b){if(a==='Tab'&&b&&b.preventDefault){b.preventDefault()}if(this.onPageCardVisible){return}var c=this.options,d;if(c.events&&c.events.prompt){if(c.cookie)OOo.eraseCookie(c.cookie.name||'oo_r');OOo.hidePrompt()}if(this.interruptShow){return}if(!this.floatingLogo&&c.cookie&&OOo.Ocode.matchUrl(c.cookie)){return}if(!c.floating&&c.events&&this.singProbability){return}if(c.events&&c.events.onSingleClick){this.singProbability=true}if(c.cookie){OOo.Ocode.tagUrl(c.cookie)}if(c.thirdPartyCookies){if(OOo.checkThirdPartyCookies(c.thirdPartyCookies)){return}OOo.setThirdPartyCookies(c.thirdPartyCookies)}if(this.floatingLogo){this.floatingLogo.children[0].blur()}if(this.floatingLogo&&c.disappearOnClick){this.floatingLogo.style.display='none'}if(a){c.metrics.trigger=a}if(c.clickTalePID&&typeof window.ClickTale==='function'){c.clickTaleUID=window.ClickTaleGetUID();c.clickTaleSID=window.ClickTaleGetSID()}if(c.onPageCard){this.setupOnPageCC()}else{this.launchOOPopup()}d=c.floating||c.tab||c.bar;if(d&&typeof d.onClickCallback==='function'){d.onClickCallback()}if(OOo.Browser.IE){return false}}};OOo.extend(OOo.Ocode,{tagUrl:function(a,b){if(!b){b=location}var c=a.name||'oo_r',d=a.type==='page'?b.href:b.hostname,e=OOo.readCookie(c)||'';if(OOo.Ocode.matchUrl(a,b)){return}OOo.createCookie(c,e+OOo.sha1(d),a.expiration)},matchUrl:function(a,b){if(!b){b=location}var c=OOo.readCookie(a.name||'oo_r'),d;if(!c){return false}d=a.type==='page'?b.href:b.hostname;return c.search(OOo.sha1(d))!==-1}});(function(){var g=0;function h(){var a=this.options,b=a.newWindowSize||[545,325],c=[parseInt((a.metrics.height-b[1])/2,10),parseInt((a.metrics.width-b[0])/2,10)],d,e,f='location=no,status=no,width='+b[0]+',height='+b[1]+',top='+c[0]+',left='+c[1];ie7=OOo.Browser.IE&&navigator.userAgent.search('MSIE 7')!==-1,windowName='OnlineOpinion';if(a.newWindow)windowName=windowName+(g++);a.metrics.time2=(new Date()).getTime();a.metrics.type='Popup';if(a.asm){f+=',scrollbars=1'}d=OOo.appendOOForm(a,windowName);e=window.open(ie7?a.commentCardUrl||'https://secure.opinionlab.com/ccc01/comment_card_d.asp?'+d.children[0].value:'',windowName,f);if(e&&!ie7){d.submit()}}OOo.extend(OOo.Ocode.prototype,{launchOOPopup:h})}());(function(){function l(){var a=this.options.events,b=[false,false],c=['onExit','onEntry'],d=OOo.Browser.Opera?'unload':'beforeunload',e,f,g,h,j;if(a.prompt){OOo.extend(this.options,{promptMarkup:a.prompt.promptMarkup||'oo_event_prompt.html',neverShowAgainButton:false,pathToAssets:a.prompt.pathToAssets})}for(g=c.length-1;g>=0;g-=1){e=c[g];if(a[e]instanceof Array){h=a[e];j=h.length;while(j&&!b[g]){j-=1;if(window.location.href.search(h[j].url)!==-1&&Math.random()>=1-h[j].p/100){b[g]=true}}}else if(a[e]&&Math.random()>=1-a[e]/100){b[g]=true}}if(b[0]){OOo.addEventListener(window,d,this.show.bind(this,'onExit'),false)}if(b[1]){if(a.delayEntry){window.setTimeout(function(){if(a.prompt)this.getPrompt();else this.show()}.bind(this,'onEntry'),a.delayEntry*1000)}else{if(a.prompt)this.getPrompt();else this.show('onEntry')}}}function k(a){var b=a||window.event,c=a.target||a.srcElement,d=this.options.events,e=c.parentNode,f=5,g=0;while(e&&(c.nodeName!=='A'||c.nodeName!=='INPUT')&&g!==f){if(e.nodeName==='A'){c=e}e=e.parentNode;g+=1}if(d.disableFormElements&&(c.tagName==="INPUT"||c.tagName==="BUTTON")&&(c.type==='submit'||c.type==='image'||c.type==='reset'||c.type==='button')){this.interruptShow=true}if(d.disableLinks&&(c.nodeName==='A'||c.nodeName==='AREA')&&c.href.substr(0,4)==='http'&&c.href.search(d.disableLinks)!==-1){this.interruptShow=true}}function m(a){this.interruptShow=true}function q(){OOo.addEventListener(document.body,'mousedown',k.bind(this));if(!this.options.events.disableFormElements){return}var a=document.getElementsByTagName('form'),b;for(b=a.length-1;b>=0;b-=1){OOo.addEventListener(a[b],'submit',m.bind(this))}}OOo.extend(OOo.Ocode.prototype,{setupEvents:l,setupDisableElements:q,getPrompt:function(){OOo.getPrompt.call(this)},showPrompt:function(a){if(this.options.cookie){OOo.Ocode.tagUrl(this.options.cookie)}OOo.showPrompt.call(this,a,this.show)}})}());OOo.extend(OOo.Ocode.prototype,{floating:function(){var d=document,e=this.floatingLogo=document.createElement('div'),f=d.createElement('div'),g=d.createElement('div'),h=d.createElement('div'),j=d.createElement('span'),l=this.options.floating,k=OOo.$(l.contentId),m='10px',q=l.id,s=d.createElement('span'),t,n,r,u,o,p,w,x;function v(a){return a.offsetLeft+a.offsetWidth}function A(a){u.style.left=v(k)+'px'}s.innerHTML="Screen reader users: Please switch to forms mode for this link.";s.className="screen_reader";if(q){e.id=q}e.className='oo_feedback_float';g.className='oo_transparent';f.className='olUp';h.className='olOver';f.tabIndex=0;f.onkeyup=function(a){t=a||window.event;if(t.keyCode!==13){return}this.show()}.bind(this);f.innerHTML=l.caption||'Feedback';e.appendChild(s);e.appendChild(f);j.innerHTML=l.hoverCaption||'Click here to<br>rate this page';h.appendChild(j);e.appendChild(h);e.appendChild(g);function y(a){var b=d.documentElement.scrollTop||d.body.scrollTop,c=d.documentElement.clientHeight||document.body.clientHeight;e.style.top=(b+c-(w||0)-10)+'px'}if(OOo.Browser.MobileSafari){if(OOo.Browser.ua.search('OS 4')!==-1){n=window.innerHeight;e.style.bottom=null;e.style.top=(window.pageYOffset+window.innerHeight-60)+'px';x=function(a){r=window.pageYOffset-(n-window.innerHeight);e.style.webkitTransform='translateY('+r+'px)'};OOo.addEventListener(window,'scroll',x,false);setTimeout(x,100)}}else if(!OOo.POSITION_FIXED_SUPPORTED){e.style.position='absolute';e.style.bottom='';OOo.addEventListener(window,'scroll',y,false);OOo.addEventListener(window,'resize',y,false);if(d.compatMode==="BackCompat"){e.style.background="white"}}if(l.position&&l.position.search(/Content/)&&k){u=this.spacer=d.createElement('div');o=OOo.Browser.WebKit?d.body:d.documentElement;u.id='oo_feedback_fl_spacer';u.style.left=v(k)+'px';d.body.appendChild(u);switch(l.position){case'rightOfContent':p=function(a){e.style.left=(v(k)-o.scrollLeft)+'px';if(!OOo.POSITION_FIXED_SUPPORTED){p=null}};break;case'fixedPreserveContent':p=function(a){var b=OOo.Browser.IE?d.body.clientWidth:window.innerWidth,c=OOo.POSITION_FIXED_SUPPORTED?o.scrollLeft:0;if(b<=v(k)+e.offsetWidth+parseInt(m,10)){e.style.left=(v(k)-c)+'px'}else{e.style.left='';e.style.right=m}};break;case'fixedContentMax':p=function(a){var b=OOo.Browser.IE?d.body.clientWidth:window.innerWidth;if(b<=v(k)+e.offsetWidth+parseInt(m,10)){e.style.left='';e.style.right=m;if(!OOo.POSITION_FIXED_SUPPORTED&&a&&a.type==='scroll'){e.style.left=(d.body.clientWidth+d.body.scrollLeft-105)+'px'}}else{e.style.left=(v(k)-o.scrollLeft)+'px';e.style.right=''}};break}window.setTimeout(p,0);OOo.addEventListener(window,'scroll',p,false);OOo.addEventListener(window,'resize',p,false);OOo.addEventListener(window,'resize',A,false)}else{e.style.right=m}OOo.addEventListener(e,'click',this.show.bind(this,'Floating'),false);OOo.addEventListener(e,'touchstart',this.show.bind(this,'Floating'),false);d.body.appendChild(e);if(!OOo.POSITION_FIXED_SUPPORTED&&!OOo.Browser.MobileSafari){g.style.height=e.clientHeight+'px';w=e.clientHeight;setTimeout(y,100)}},removeFloatingLogo:function(){document.body.removeChild(this.floatingLogo);if(this.spacer){document.body.removeChild(this.spacer)}}});OOo.extend(OOo.Ocode.prototype,{bar:function(){var d=document,e=this.floatingLogo=d.createElement('div'),f=d.createElement('span'),g,h,j,l=d.documentElement.scrollTop||d.body.scrollTop,k=d.createElement('div');function m(a){var b=curtop=0;if(a.offsetParent){do{b+=a.offsetLeft;curtop+=a.offsetTop}while(a=a.offsetParent);return[b,curtop]}}function q(a){var b=document.activeElement,c;if(!b)return;c=m(b);if(!c)return;if(c[1]+b.clientHeight>(window.innerHeight||document.body.clientHeight)+(window.pageYOffset||document.body.scrollTop)-e.clientHeight)window.scrollBy(0,b.clientHeight+20)}k.innerHTML='Link opens comment card';k.className='screen_reader';e.appendChild(k);this.reflowBar=OOo.K;e.id='oo_bar';f.innerHTML=this.options.bar.caption||'Feedback';e.appendChild(f);e.tabIndex=0;e.onkeyup=function(a){var b=a||window.event;if(b.keyCode!==13){return}this.show()}.bind(this);OOo.addEventListener(e,'click',this.show.bind(this,'Bar'));document.body.className+=document.body.className<1?'oo_bar':' oo_bar';document.body.appendChild(e);if(OOo.Browser.IE){if(d.compatMode==='CSS1Compat'){g=function(a){if(a&&a.type==='resize'){setTimeout(g,50)}e.style.top=(d.documentElement.scrollTop+document.documentElement.clientHeight-e.clientHeight-1)+'px';e.style.width=(Math.max(d.documentElement.clientWidth,d.body.offsetWidth))+'px'}}else{g=function(a){e.style.top=(d.body.scrollTop+document.body.clientHeight-e.clientHeight-1)+'px';e.style.width=(Math.max(d.documentElement.clientWidth,d.body.offsetWidth)-22)+'px'}}e.style.position='absolute';OOo.addEventListener(window,'scroll',g,false);OOo.addEventListener(window,'resize',g,false);this.reflowBar=function(){e.style.display='none';g();e.style.display='block'};g()}else if(OOo.Browser.MobileSafari&&OOo.Browser.ua.search('OS 4')!==-1){h=window.innerHeight;e.style.bottom=null;e.style.top=(window.pageYOffset+window.innerHeight-22)+'px';g=function(a){j=window.pageYOffset-(h-window.innerHeight);e.style.webkitTransform='translateY('+j+'px)'};OOo.addEventListener(window,'scroll',g,false);setTimeout(g,100)}OOo.addEventListener(document.body,'keyup',q,false)}});OOo.extend(OOo.Ocode.prototype,{tab:function(){var e=document,f=this.floatingLogo=e.createElement('div'),g=e.createElement('div'),h=e.createElement('span'),j=this.options.tab;function l(a){var b=e.documentElement.scrollTop||e.body.scrollTop,c=e.documentElement.scrollLeft||e.body.scrollLeft,d=e.documentElement.clientHeight||document.body.clientHeight;f.style.top=(b+(d/2-f.clientHeight/2))+'px';if((!j.position||j.position==='right'))f.style.right=(-1*c+2)+'px'}function k(a){f.style.top=pageYOffset+(innerHeight/2-f.clientHeight/2)+'px';f.style.right=document.documentElement.clientWidth-window.innerWidth-window.pageXOffset-15+'px'}f.id='oo_tab';f.className='oo_tab_'+(j.position||'right');if(!OOo.POSITION_FIXED_SUPPORTED&&!OOo.Browser.MobileSafari){f.style.position='absolute';if((!j.position||j.position==='right')&&OOo.Browser.IE){f.className+=' oo_tab_ie_right';if(OOo.Browser.ua.search('IE 6')===-1){OOo.addEventListener(window,'scroll',l,false);OOo.addEventListener(window,'resize',l,false)}}}f.tabIndex=0;f.onkeyup=function(a){var b=a||window.event;if(b.keyCode!==13){return}this.show()}.bind(this);g.appendChild(h);f.appendChild(g);OOo.addEventListener(f,'click',this.show.bind(this,'Tab'),false);e.body.appendChild(f);if(OOo.Browser.MobileSafari&&OOo.Browser.ua.search('OS 4')!==-1){f.style.position='absolute';OOo.addEventListener(window,'scroll',k,false);setTimeout(k,100)}}});OOo.extend(OOo.Ocode.prototype,{setupOnPageCC:function(){var e=document,f=OOo.Cache.overlay||e.createElement('div'),g=this.wrapper=e.createElement('div'),h=e.createElement('div'),j=e.createElement('div'),l=e.createElement('span'),k=this.frameName,m=e.createElement(OOo.DYNAMIC_FRAME_NAME_IS_BUGGY?'<iframe name="'+k+'">':'iframe'),q=e.createDocumentFragment(),s=this.options,t=s.onPageCard,n='https://secure.opinionlab.com/ccc01/comment_card_json_4_0_b.asp',r,u,o,p=false,w=this,x,v,A,y,B,E,C,D=e.createElement('span');function z(a){if(a&&a.preventDefault){a.preventDefault()}document.body.focus();m.tabIndex=-1;m.title="empty";m['aria-hidden']='true';f.style.display='none';f.className='';e.body.removeChild(g);if(window.postMessage){OOo.removeEventListener(window,'message',B)}else{window.clearInterval(u)}p=false;w.onPageCardVisible=false;return false}B=OOo.Ocode.postMessageHandler(function(a){var b=parseInt(a,10),c,d;if(b>0){if(p){return}p=true;c=window.innerHeight||e.documentElement.clientHeight||e.body.clientHeight;d=b;C=g.offsetTop;if(d+C>c){d=c-40-C;m.style.width='555px'}m.style.height=d+'px';g.style.visibility='visible';if(l.clientHeight<20){l.style.height=g.offsetHeight+'px'}f.className="no_loading";w.onPageCardVisible=true;r&&e.body.removeChild(r)}else if(a==='submitted'){z()}if(OOo.Browser.IE&&e.compatMode==="BackCompat"){window.scrollTo(0,0)}},w.options.commentCardUrl);s.metrics.type='OnPage';OOo.Cache.overlay=f;f.id='oo_overlay';f.style.display='block';f.className='';j.className='iwrapper';g.className='oo_cc_wrapper';g.setAttribute('role','alert');g.setAttribute('aria-describedby','comment_card_description');D.className='screen_reader';D.id='comment_card_description';D.innerHTML='Please leave your feedback in the comment card you just activated';g.appendChild(D);h.className='oo_cc_close';h.innerHTML='<span class="screen_reader">Link closes comment card</span>X';h.title='Click to close comment card';g.style.visibility='hidden';h.tabIndex=0;h.onkeyup=function(a){var b=a||window.event;if(b.keyCode!==13){return}z()};if(OOo.Browser.IE){m.frameBorder='0';if(!window.XMLHttpRequest||e.compatMode==="BackCompat"){E=Math.max(e.documentElement.clientWidth,e.body.offsetWidth);f.style.position='absolute';f.style.width=e.compatMode==="BackCompat"?(E-21)+'px':E+'px';f.style.height=Math.max(e.documentElement.clientHeight,e.body.offsetHeight)+'px';g.style.position='absolute';OOo.addEventListener(window,'scroll',function(){f.style.top=(e.body.scrollTop+document.body.clientHeight-f.clientHeight)+'px';g.style.top=(e.body.scrollTop+C+25)+'px'})}}OOo.addEventListener(h,'click',z);if(t.closeWithOverlay&&!OOo.Browser.isMobile){g.appendChild(l);l.onclick=z;f.onclick=z}m.src=' ';m.name=k;m.title='Comment Card';j.appendChild(h);j.appendChild(m);g.appendChild(j);q.appendChild(g);q.appendChild(f);e.body.appendChild(q);if(window.postMessage){OOo.addEventListener(window,"message",B)}else{u=setInterval(B,500)}s.metrics.time2=(new Date()).getTime();r=OOo.appendOOForm(s,k);r.submit()}});OOo.extend(OOo.Ocode,{postMessageHandler:function(d,e,f){return function(a){var b='https://secure.opinionlab.com',c;if(!f){f=location}if((a&&!(a.origin===b||a.origin.indexOf(e)!==0))||(!a&&f.hash.search('OL=')===-1)){return false}c=a?a.data:f.hash.split('=').pop();if(!a&&location.hash){location.hash=''}d(c);return c}}});OOo.Invitation=function(a){if(OOo.Browser.isMobile){return}this.options={tunnelCookie:'oo_inv_tunnel',repromptTime:604800,responseRate:50,repromptCookie:'oo_inv_reprompt',promptMarkup:'oo_inv_prompt.html',promptStyles:'oo_inverstitial_style.css',percentageCookie:'oo_inv_percent',pagesHitCookie:'oo_inv_hit',popupType:'popunder',promptDelay:0,neverShowAgainButton:false,loadPopupInBackground:false,truncatePrevCurrentMetrics:false,disablePrevCurrentMetrics:false,tealeafCookieName:'TLTSID',monitorWindow:'oo_inv_monitor.html',beforePrompt:OOo.K};this.popupShown=false;OOo.extend(this.options,a);var b=this.options,c=parseInt(OOo.readCookie(b.pagesHitCookie),10)||0;OOo.Invitation.friendlyDomains=b.friendlyDomains||null;if(location.search.search('evs')!==-1){b.loadPopupInBackground=true;this.launchPopup();OOo.createCookie(b.repromptCookie,1,b.repromptTime===-1?0:b.repromptTime)}setTimeout(function(){if(!window.oo_inv_monitor){return}if(b.area&&location.href.search(b.area)===-1){this.options.popupType='popup';this.launchPopup()}else if(b.goal&&location.href.search(b.goal)!==-1){window.oo_inv_monitor.close()}}.bind(this),1600);if(OOo.readCookie(b.repromptCookie)){return}if(b.thirdPartyCookies&&OOo.checkThirdPartyCookies(b.thirdPartyCookies)){return}if(!OOo.readCookie(b.percentageCookie)){OOo.createCookie(b.percentageCookie,(Math.random()>1-(b.responseRate/100))?"1":"0")}if(typeof b.promptTrigger!=='undefined'){if(b.promptTrigger instanceof RegExp){if(!window.location.href.match(b.promptTrigger)){return}}else if(b.promptTrigger instanceof Array){if(!OOo.checkTunnel(location.pathname,b.promptTrigger,b.tunnelCookie)){return}}}c+=1;OOo.createCookie(b.pagesHitCookie,c);if(b.pagesHit&&c<b.pagesHit){return}OOo.eraseCookie(b.tunnelCookie);if(OOo.readCookie(b.percentageCookie)==='1'){window.setTimeout(function(){OOo.createCookie(b.repromptCookie,1,b.repromptTime);this.options.beforePrompt();this.getPrompt()}.bind(this),b.promptDelay*1000)}};OOo.Invitation.prototype={getPrompt:function(){OOo.getPrompt.call(this)},showPrompt:function(a){OOo.showPrompt.call(this,a,this.launchPopup)},launchPopup:function(){if(this.popupShown){return}this.popupShown=true;var b=this.options,c=window.location.href,d=b.popupType==='popup'?'https://secure.opinionlab.com/ccc01/comment_card.asp?':b.pathToAssets+b.monitorWindow+'?'+(new Date()).getTime()+'&',e,f=[],g=b.asm?[555,500]:[400,335],h,j=OOo.createMetrics(),l=OOo.readCookie(b.tealeafCookieName),k;if(b.clickTalePID&&window.ClickTaleGetUID&&window.ClickTaleGetSID){l+='|'+[b.clickTalePID,window.ClickTaleGetUID(),window.ClickTaleGetSID()].join('/')}g=b.newWindowSize||g;k='location=no,status=no,width='+g[0]+',height='+g[1];if(b.referrerRewrite){j.referer=OOo.referrerRewrite(b.referrerRewrite)}if(b.truncatePrevCurrentMetrics){j.prev=OOo.truncateMetric(j.prev);j.currentURL=OOo.truncateMetric(j.currentURL)}if(b.disablePrevCurrentMetrics){j.prev='';j.currentURL=''}if(b.thirdPartyCookies){OOo.setThirdPartyCookies(b.thirdPartyCookies)}e=OOo.toQueryString(j)+'&type=Invitation';if(b.customVariables){e+='&customVars='+encodeURIComponent(OOo.serialize(b.customVariables))}e+='&custom_var='+OOo.createLegacyVars(b.legacyVariables,l);if(b.asm){e+='&asm=2';k+=',scrollbars=1'}d+=e;if(d.match(/\?/g).length===2)d=d.replace(/\?([^?]*)$/,'&$1');h=window.open(d,'OnlineOpinionInvitation',k);if(!b.loadPopupInBackground&&OOo.$('oo_container')){OOo.hidePrompt()}if(b.popupType==='popunder'){if(!OOo.Browser.Chrome){h.blur();window.focus()}else{if(!b.loadPopupInBackground){window.alert(b.chromeMainWinPrompt||'Please fill out the form behind this window when you are finished.')}if(b.chromeSurveyPrompt){setTimeout(function(a){h.postMessage(b.chromeSurveyPrompt,"*")},500)}}}else if(window.oo_inv_monitor){window.blur();h.focus()}},killPrompt:function(){if(this.options.clickCallbacks&&typeof this.options.clickCallbacks.no==='function'){this.options.clickCallbacks.no()}OOo.createCookie(this.options.repromptCookie,1,157680000);OOo.hidePrompt()}};OOo.extend(OOo.Invitation,{navigateToFriendlyDomain:function(a){location.href=a}});
//-----------------------------------------------------------------------------
// END OPINIONLAB JAVASCRIPT ENGINE CODE
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------
// START OPINIONLAB CONFIGURATION CODE - updated 2/15/13 per RITM0058894
//-----------------------------------------------------------------------
var oo_feedback;

if (window.top === window.self) {
	OOo.addEventListener(window, 'load', function () {
		var customVariables;
		if (typeof(s) !== "undefined") {
			// we've called omniture.
			customVariables = {
				PageName:     s.pageName,
				Channel:      s.channel,
				SiteSection2: s.prop3,
				SiteSection3: s.prop4,
				SiteSection4: s.prop5,
				PageType:     s.prop16
			};
		}
		else {
			// we haven't called omniture.
			customVariables = {
				PageName:     document.title,
				Channel:      "",
				SiteSection2: "",
				SiteSection3: "",
				SiteSection4: "",
				PageType:     ""
			};
		}
		oo_feedback = new OOo.Ocode({
		 	onPageCard:      { closeWithOverlay: {} },
			customVariables: customVariables
		});
		var oo_floating = new OOo.Ocode({
			floating:        {},
			onPageCard:      { closeWithOverlay: {} }
			, disableMobile: true // hides floating icon on mobile and touch devices
			, customVariables: customVariables
		});
	}, false);
}

/*
INLINE FEEDBACK LINK EXAMPLE
<a href="javascript:void(0);" onClick="oo_feedback.show()"><img src="/onlineopinionV5/oo_icon.gif" border="0" title="Feedback"> Feedback</a>
*/

//-----------------------------------------------------------------------
// END OPINIONLAB CONFIGURATION CODE
//-----------------------------------------------------------------------


// for site search form in header
function validateSiteSearchForm (form) {
	if ("q" in form) {
		if (!/\S/.test(form.q.value)) {
			return false;
		}
	}
	return true;
}

// for advanced search forms
function validateAdvancedSearchForm (form) {
	if (/\S/.test(form.as_q.value) ||
	    /\S/.test(form.as_epq.value) ||
	    /\S/.test(form.as_oq.value)) {
		return true;
	}
	alert("Please enter a search term in at least one of the first three fields.");
	form.as_q.focus();
	form.as_q.select();
	return false;
}

//*****************************************************************************
// General utility functions
//*****************************************************************************

function appendCSS (url, options) {
	var head = document.getElementsByTagName("head")[0];
	var link = document.createElement("link");
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("type", "text/css");
	link.setAttribute("href", url);
	if (options && "media" in options) {
		link.setAttribute("media", options.media);
	}
	head.appendChild(link);
}

// Based on example from "JavaScript: The Definitive Guide" 6th ed.
function getCookies () {
	var cookies = {};
	var list, i, cookie, p, name, value;
	var all = document.cookie;
	if (all === "") {
		return cookies;
	}
	list = all.split("; ");
	for (i = 0; i < list.length; i += 1) {
		cookie = list[i];
		p = cookie.indexOf("=");
		name = cookie.substring(0, p);
		value = decodeURIComponent(cookie.substring(p + 1));
		cookies[name] = value;
	}
	return cookies;
}

// Based on example from "JavaScript: The Definitive Guide" 6th ed.
//
// The url argument is optional.  Defaults to global location object.
function getLocationQueryArgs (url) {
	var args = {};
	var loc, query, a, pairs, i, pair, pos, name, value;
	loc = getLocationObject(url);
	query = loc.search.substring(1); // exclude the "?"
	pairs = query.split("&");
	for (i = 0; i < pairs.length; i += 1) {
		pair = pairs[i];
		pos = pair.indexOf("=");
		if (pos === -1) {
			continue;
		}
		name = pair.substring(0, pos);
		value = pair.substring(pos + 1);
		value = decodeURIComponent(value);
		args[name] = value;
	}
	return args;
}

// Use this function to ensure you are provided with a Location-like
// object with automatically parsed protocol, host, hostname, port,
// pathname, search, and hash properties.
//
// The url argument is optional.  Defaults to global location object.
function getLocationObject (url) {
	var a;
	if (url !== undefined && url !== null) {
		if (url instanceof Object && "pathname" in url && "search" in url && "href" in url) {
			return url;
		}
		else {
			a = document.createElement("a");
			a.href = url;
			return a;
		}
	} else {
		return location;
	}
}

if (!Object.extend) {
	// similar to object.prototype's Object.extend
	Object.extend = function (destination, source) {
		var prop;
		for (prop in source) {
			destination[prop] = source[prop];
		}
		return destination;
	};
}

