/*!
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
// Script: jQuery resize event
//
// *Version: 1.1, Last updated: 3/14/2010*

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.

  // A jQuery object containing all non-window elements to which the resize
  // event is bound.
  var elems = $([]),

    // Extend $.resize if it already exists, otherwise create it.
    jq_resize = $.resize = $.extend( $.resize, {} ),

    timeout_id,

    // Reused strings.
    str_setTimeout = 'setTimeout',
    str_resize = 'resize',
    str_data = str_resize + '-special-event',
    str_delay = 'delay',
    str_throttle = 'throttleWindow';

  // Property: jQuery.resize.delay
  //
  // The numeric interval (in milliseconds) at which the resize event polling
  // loop executes. Defaults to 250.

  jq_resize[ str_delay ] = 250;

  // Property: jQuery.resize.throttleWindow
  //
  // Throttle the native window object resize event to fire no more than once
  // every <jQuery.resize.delay> milliseconds. Defaults to true.
  //
  // Because the window object has its own resize event, it doesn't need to be
  // provided by this plugin, and its execution can be left entirely up to the
  // browser. However, since certain browsers fire the resize event continuously
  // while others do not, enabling this will throttle the window resize event,
  // making event behavior consistent across all elements in all browsers.
  //
  // While setting this property to false will disable window object resize
  // event throttling, please note that this property must be changed before any
  // window object resize event callbacks are bound.

  jq_resize[ str_throttle ] = true;

  // Event: resize event
  //
  // Fired when an element's width or height changes. Because browsers only
  // provide this event for the window element, for other elements a polling
  // loop is initialized, running every <jQuery.resize.delay> milliseconds
  // to see if elements' dimensions have changed. You may bind with either
  // .resize( fn ) or .bind( "resize", fn ), and unbind with .unbind( "resize" ).
  //
  // Usage:
  //
  // > jQuery('selector').bind( 'resize', function(e) {
  // >   // element's width or height has changed!
  // >   ...
  // > });
  //
  // Additional Notes:
  //
  // * The polling loop is not created until at least one callback is actually
  //   bound to the 'resize' event, and this single polling loop is shared
  //   across all elements.
  //
  // Double firing issue in jQuery 1.3.2:
  //
  // While this plugin works in jQuery 1.3.2, if an element's event callbacks
  // are manually triggered via .trigger( 'resize' ) or .resize() those
  // callbacks may double-fire, due to limitations in the jQuery 1.3.2 special
  // events system. This is not an issue when using jQuery 1.4+.
  //
  // > // While this works in jQuery 1.4+
  // > $(elem).css({ width: new_w, height: new_h }).resize();
  // >
  // > // In jQuery 1.3.2, you need to do this:
  // > var elem = $(elem);
  // > elem.css({ width: new_w, height: new_h });
  // > elem.data( 'resize-special-event', { width: elem.width(), height: elem.height() } );
  // > elem.resize();

  $.event.special[ str_resize ] = {

    // Called only when the first 'resize' event callback is bound per element.
    setup: function() {
      // Since window has its own native 'resize' event, return false so that
      // jQuery will bind the event using DOM methods. Since only 'window'
      // objects have a .setTimeout method, this should be a sufficient test.
      // Unless, of course, we're throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

      var elem = $(this);

      // Add this element to the list of internal elements to monitor.
      elems = elems.add( elem );

      // Initialize data store on the element.
      $.data( this, str_data, { w: elem.width(), h: elem.height() } );

      // If this is the first element added, start the polling loop.
      if ( elems.length === 1 ) {
        loopy();
      }
    },

    // Called only when the last 'resize' event callback is unbound per element.
    teardown: function() {
      // Since window has its own native 'resize' event, return false so that
      // jQuery will unbind the event using DOM methods. Since only 'window'
      // objects have a .setTimeout method, this should be a sufficient test.
      // Unless, of course, we're throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

      var elem = $(this);

      // Remove this element from the list of internal elements to monitor.
      elems = elems.not( elem );

      // Remove any data stored on the element.
      elem.removeData( str_data );

      // If this is the last element removed, stop the polling loop.
      if ( !elems.length ) {
        clearTimeout( timeout_id );
      }
    },

    // Called every time a 'resize' event callback is bound per element (new in
    // jQuery 1.4).
    add: function( handleObj ) {
      // Since window has its own native 'resize' event, return false so that
      // jQuery doesn't modify the event object. Unless, of course, we're
      // throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

      var old_handler;

      // The new_handler function is executed every time the event is triggered.
      // This is used to update the internal element data store with the width
      // and height when the event is triggered manually, to avoid double-firing
      // of the event callback. See the "Double firing issue in jQuery 1.3.2"
      // comments above for more information.

      function new_handler( e, w, h ) {
        var elem = $(this),
          data = $.data( this, str_data );

        // If called from the polling loop, w and h will be passed in as
        // arguments. If called manually, via .trigger( 'resize' ) or .resize(),
        // those values will need to be computed.
        data.w = w !== undefined ? w : elem.width();
        data.h = h !== undefined ? h : elem.height();

        old_handler.apply( this, arguments );
      };

      // This may seem a little complicated, but it normalizes the special event
      // .add method between jQuery 1.4/1.4.1 and 1.4.2+
      if ( $.isFunction( handleObj ) ) {
        // 1.4, 1.4.1
        old_handler = handleObj;
        return new_handler;
      } else {
        // 1.4.2+
        old_handler = handleObj.handler;
        handleObj.handler = new_handler;
      }
    }
  };

  function loopy() {
    // Start the polling loop, asynchronously.
    timeout_id = window[ str_setTimeout ](function(){

      // Iterate over all elements to which the 'resize' event is bound.
      elems.each(function(){
        var elem = $(this),
          width = elem.width(),
          height = elem.height(),
          data = $.data( this, str_data );

        // If element size has changed since the last time, update the element
        // data store and trigger the 'resize' event.
        if ( width !== data.w || height !== data.h ) {
          elem.trigger( str_resize, [ data.w = width, data.h = height ] );
        }

      });

      // Loop.
      loopy();

    }, jq_resize[ str_delay ] );
  };
})(jQuery,this);

// Tell IE9 to use its built-in console
if (Function.prototype.bind && typeof(console) !== 'undefined' && typeof console.log == "object") {
    ["log","info","warn","error","assert","dir","clear","profile","profileEnd"]
        .forEach(function (method) {
            console[method] = this.call(console[method], console);
        }, Function.prototype.bind);
}

if (!window.log) {
    window.log = function () {
        log.history = log.history || [];  // store logs to an array for reference
        log.history.push(arguments);
        // Modern browsers
        if (typeof console != 'undefined' && typeof console.log == 'function') {

            // Opera 11
            if (window.opera) {
                var i = 0;
                while (i < arguments.length) {
                    console.log("Item " + (i+1) + ": " + arguments[i]);
                    i++;
                }
            }

            // All other modern browsers
            else if ((Array.prototype.slice.call(arguments)).length == 1 && typeof Array.prototype.slice.call(arguments)[0] == 'string') {
                console.log( (Array.prototype.slice.call(arguments)).toString() );
            }
            else {
                console.log( Array.prototype.slice.call(arguments) );
            }

        }

        // IE8
        else if (!Function.prototype.bind && typeof console != 'undefined' && typeof console.log == 'object') {
            Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
        }

        // IE7 and lower, and other old browsers
        else {
            // Inject Firebug lite
            if (!document.getElementById('firebug-lite')) {
                // Include the script
                var script = document.createElement('script');
                script.type = "text/javascript";
                script.id = 'firebug-lite';
                // If you run the script locally, point to /path/to/firebug-lite/build/firebug-lite.js
                script.src = 'https://getfirebug.com/firebug-lite.js';
                // If you want to expand the console window by default, uncomment this line
                //document.getElementsByTagName('HTML')[0].setAttribute('debug','true');
                document.getElementsByTagName('HEAD')[0].appendChild(script);
                setTimeout(function () { log( Array.prototype.slice.call(arguments) ); }, 2000);
            }
            else {
                // FBL was included but it hasn't finished loading yet, so try again momentarily
                setTimeout(function () { log( Array.prototype.slice.call(arguments) ); }, 500);
            }
        }
    }
}

var isIphone = navigator.userAgent.match(/iPhone/i) != null;
var common = {
    contextPath: ''
}

function is_touch_device() {
    return !!('ontouchstart' in window);
}

function isLTEie8() {
    if (jQuery.browser.msie) {
        if (parseInt(jQuery.browser.version) <= 8) {
            return true;
        }
    }
    return false;
}

function isLTEie9() {
    if (jQuery.browser.msie) {
        if (parseInt(jQuery.browser.version) <= 9) {
            return true;
        }
    }
    return false;
}

function removeParamValue(url, param) {
    var params = url.split('&');
    var newUrl = '';
    for(var i=0;i<params.length;i++)
        if(params[i].indexOf(param) == -1 && params[i] != '') {
            if(params[i].indexOf('?') >=0)
                newUrl += params[i];
            else
                newUrl += '&' + params[i];
        }
    return newUrl;
}

function getQuerystringValue(queryString, key, default_) {
  if (default_==null) default_="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec((queryString && queryString != "") ? queryString : window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}

/**
 * Add and/or updates the query string based on a specific key value pair
 * @param url: URL in question
 * @param key: Key in which needs adding or updating
 * @param value: The value of the key
 */
function updateQueryStringParameter(url, key, value) {
    if (!url) url = window.location.href;
    var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
    var separator = url.indexOf('?') !== -1 ? "&" : "?";
    if (url.match(re)) {
        return url.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return url + separator + key + "=" + value;
    }
}

$(function(){
	if(jQuery.browser.opera){$('body').addClass('opera');}
	$(".button").assignMouseEvents();
});

(function(){
    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);

    special.scrollstart = {
        setup: function() {

            var timer,
                handler =  function(evt) {

                    var _self = this,
                        _args = arguments;

                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        jQuery.event.handle.apply(_self, _args);
                    }

                    timer = setTimeout( function(){
                        timer = null;
                    }, special.scrollstop.latency);

                };

            jQuery(this).bind('scroll', handler).data(uid1, handler);

        },
        teardown: function(){
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid1) );
        }
    };

    special.scrollstop = {
        latency: 300,
        setup: function() {

            var timer,
                    handler = function(evt) {

                    var _self = this,
                        _args = arguments;

                    if (timer) {
                        clearTimeout(timer);
                    }

                    timer = setTimeout( function(){

                        timer = null;
                        evt.type = 'scrollstop';
                        jQuery.event.handle.apply(_self, _args);

                    }, special.scrollstop.latency);

                };

            jQuery(this).bind('scroll', handler).data(uid2, handler);

        },
        teardown: function() {
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid2) );
        }
    };
})();

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * This method will be called when user changes selected refinements
 */
function refinementChange() {
    var refineUrl = removeAllParamValue(window.location.search, "refinementValueIds") + getRefineUrl();
    if(refineUrl.indexOf("?") == -1)
        refineUrl = "?" + refineUrl;
    if($.browser.queryParams["currentIndex"] != null) {
        refineUrl = removeAllParamValue(refineUrl,"currentIndex");
        refineUrl += "&currentIndex=0";
    }
    refineUrl = updateQueryStringParameter(refineUrl, 'selectedRefinements', selectedRefinements);
    window.location.search = refineUrl;
}

/**
 * Method support removing param and its value in the url
 */
function removeAllParamValue(url, param) {
    var params = url.split('&');
    var newUrl = '';
    for(var i=0;i<params.length;i++)
        if(params[i].indexOf(param) == -1 && params[i] != '') {
            if(params[i].indexOf('?') >=0)
                newUrl += params[i];
            else
                newUrl += '&' + params[i];
        }
    return newUrl;
}

/**
* Get the refinement url base on selected refinements
*/
function getRefineUrl() {
    var refineUrl = '';
    selectedRefinements = '';

    var $sortRefineRoot = $("#catalog-sort-refine");

    $('.filteringOption', $sortRefineRoot).each(function(index, element) {
        refineUrl += "&refinementValueIds=";

        var refineType = $(this).attr('data-display-name');
        var $refinementsAnchor = $(".refinementGroupAnchor", $sortRefineRoot).filter('[data-display-name=' + refineType + ']');

        $refinementsAnchor.find('.refinements').each(function(index, element) {
            var $this = $(element),
            $selectedRefinements = $this.find('input[type=checkbox]:checked');

            if($selectedRefinements.length > 0) {
                var productType = $($selectedRefinements[0]).attr('id').split('-')[0];
                selectedRefinements += refineType.toLowerCase() + '|' + productType + '|';
            }

            $selectedRefinements.each(function(index, element) {
                var $refinementOption = $(element),
                    refinementParts = $refinementOption.attr('id').split('-'),
                    refineId = refinementParts[1];

                refineUrl += $refinementOption.val() + ', ';
                selectedRefinements += refineId;

                if((index + 1) < $selectedRefinements.length) {
                    selectedRefinements += '-';
                }

            });

            if($selectedRefinements.length > 0) {
                selectedRefinements += ',';
            }

       });
    });

    return refineUrl;
}

/**
 * Remove the selected refinement value with the specified id
 */
function removeSelectedRefinementValue(selectedRefinementValueId) {
    //document.getElementById("refinementValueIds_" + selectedRefinementValueId).value = '';
    refinementChange();
}

function resetRefinements() {
    var url = window.location.href;
    var urlParts = url.split('?');
    var keyword = "";
    if($('body').hasClass('search')) {
        keyword = getQuerystringValue(url, 'keyword');
    }
    if(urlParts.length >= 2) {
        url = urlParts[0];
    }
    window.location = ((keyword == "") ? url : url + '?keyword=' + keyword);
    return false;
}


/**
 * Closes the targeted refinement layer
 * $anchor: Refinement anchor group element
 * action: Whether the layer was closed or applied
 */
function closeRefinementLayer($anchor, action) {
    var $root = $anchor.parents("#catalog-sort-refine");

    // Remove the 'active' class
//    $anchor.removeClass('active');
    $root.find('.active,.inactive').removeClass('active inactive');

    var refinementGroup = $anchor.find('.refinementGroup');
    refinementGroup.hide();

    if(ACTION_CLOSE) {
        // IF canceled, apply the saved selected state
        refinementGroup.find('.refinementGroupings').html($preSelectionHTML);
    }

    // Reset value
    $preSelectionHTML = '';
}

/**
 * Opens the targeted refinement layer
 * $anchor: Refinement anchor group element
 */
function openRefinementLayer($anchor) {
    var $root = $anchor.parents("#catalog-sort-refine");
    var $refinementGroupAnchors = $root.find('.refinementGroupAnchor');
    var isSorting = ($anchor.attr("id") == "sortByCategoryGroup");

    // Add the 'active' class
    $anchor.removeClass('inactive').addClass('active');

    $refinementGroupAnchors.not('.active').addClass('inactive');
    if (isSorting) {
        $(".option-text", $root).addClass("inactive");
    } else {
        $(".sortByText", $root).addClass("inactive");
    }
    var refinementGroup = $anchor.find('.refinementGroup');
    refinementGroup.show();

    // Save off the current selected state
    $preSelectionHTML = refinementGroup.find('.refinementGroupings').html();
}

function outputSelectedCount(label, count) {
    var message = '';

    if(count > 1) {
        message = count + ' ' + label + 's Selected';
    }else if(count == 1) {
        message = count + ' ' + label + ' Selected';
    }else {
        message = 'All ' +  label + 's';
    }

    return message;
}

function fetchSelectedCount($anchor) {
    return $anchor.find('.refinements input:checkbox:checked').length;
}

function submitSearchForm(theForm) {
	   if(doSearchValidation (theForm)) theForm.submit();
}

function doSearchFocus(component) {
    var searchVal = component.value;
    if (searchVal == searchInstructions) {
        component.value = "";
    }
}

function doSearchBlur(component) {
    var searchVal = component.value;
    if (strTrim(searchVal) == '') {
        component.value = searchInstructions;
    }
}

function doSearchValidation (theForm) {
	var searchVal = theForm.keyword.value ;
	if (searchVal == "" || searchVal == searchInstructions) {
		alert (searchErrorText) ;
		return false ;
	}
	return true ;
}

function doControlFocus(component,defaultMessage) {
    var controlVal = component.value;
    if (controlVal == defaultMessage) {
        component.value = "";
    }
}

function doControlBlur(component,defaultMessage) {
    var controlVal = component.value;
    if (strTrim(controlVal) == '') {
        component.value = defaultMessage;
    }
}

function strTrim(s) {
    // Remove leading spaces and carriage returns
    while (s.substring(0,1) == ' ') {
        s = s.substring(1, s.length);
    }
    // Remove trailing spaces and carriage returns
    while (s.substring(s.length-1, s.length) == ' ') {
        s = s.substring(0, s.length-1);
    }
    return s;
}


var isImgLoaded = function(imgId) {
    var testImage = document.getElementById(imgId);
    // old Gecko-based browsers may incorrectly always return true.
    if (!testImage.complete)
        return false;
    // so use natural width to check them, IE will be undefined
    if (typeof testImage.naturalWidth != "undefined" && testImage.naturalWidth == 0)
        return false;
    return true;
};

/*
* This function launches a new web browser window to a specified width, height and features.
* Features string is a comma separated window's feature needed for this new window. For Instance
* If a new window needs a toolbar the feature string must be "toolbar" like needs scroll bar and
* and toolbar then it must be "toolbar,scrollbar". Note that the order of the feature is not required.
* Also it's case insensitive. Therefore, "scrollbar,toolbar" is identical to "Toolbar,ScrollBar".
*
* If the features string is ommitted then all the features are turned off. To turn all the features on
* use the word "all" for features instead of specifying each feature.
*/

function openWindow(address, width, height,features)
{
	/* Find out what features need to be enable
	 *
   */
	if(features) {
        features = features.toLowerCase();
    } else {
        features = "";
    }


	var toolbar = (features == "all" ? 1 : 0);
	var menubar = (features == "all" ? 1 : 0);
	var location = (features == "all" ? 1 : 0);
	var directories = (features == "all" ? 1 : 0);
	var status = (features == "all" ? 1 : 0);
	var scrollbars = (features == "all" ? 1 : 0);
	var resizable = (features == "all" ? 1 : 0);

	if(features != "all") {
		//split features
		var feature = features.split(",");
		for(i = 0; i < feature.length; i++) {
		 	if(feature[i] == "toolbar") {
			   toolbar = 1;
            }
			else if(feature[i] == "menubar") {
			   menubar = 1;
            }
			else if(feature[i] == "location") {
			   location = 1;
            }
			else if(feature[i] == "directories") {
			   directories = 1;
            }
			else if(feature[i] == "status") {
			   status = 1;
            }
			else if(feature[i] == "scrollbars") {
			   scrollbars = 1;
            }
			else if(feature[i] == "resizable") {
			   resizable = 1;
            }
		}
	}

	features = "toolbar=" + toolbar + ",";
	features += "menubar=" + menubar + ",";
	features += "location=" + location + ",";
	features += "directories=" + directories + ",";
	features += "status=" + status + ",";
	features += "scrollbars=" + scrollbars + ",";
	features += "resizable=" + resizable;

	var newWindow = window.open(address, 'Popup_Window', 'width=' + width + ',height=' + height + ',"' + features + '"');
	newWindow.focus();
}

function trim(s)
{
	// Remove leading spaces and carriage returns
	while (s.substring(0,1) == ' '){
		s = s.substring(1,s.length);
	}
	// Remove trailing spaces and carriage returns
	while (s.substring(s.length-1,s.length) == ' '){
		s = s.substring(0,s.length-1);
	}
	return s;
}
/**
 * Check if the zip code is a US or APO/FPO or Canadian zip code
 */
function isZipCode(s) {
	return isUnitedStateZipCode(s) || isFPOorAPOZipCode(s) || isCanadianZipCode(s);
}

/**
 * Check if the zip code is a US zip code
 */
function isUnitedStateZipCode(s) {

	var reUSZip = new RegExp(/(^\d{5}$)|(^\d{5}(\-|\ )\d{4}$)/);

    if (!reUSZip.test(s)) {
         return false;
    }

    return true;
}

/**
 * Check if the zip code is a Canadian zip code
 */
function isCanadianZipCode(s) {

	var reCanZip = new RegExp(/(^[a-zA-Z]\d{1}[a-zA-Z](\-|\ )\d{1}[a-zA-Z]\d{1}$)/);

    if (!reCanZip.test(s)) {
         return false;
    }

    return true;
}

/**
 * Check if the zip code is a FPO or APO zip code
 */
function isFPOorAPOZipCode(s) {

	var reFPOorAPOZip = new RegExp(/(^[a-zA-Z]{3}(\-|\ )?[a-zA-Z]{2}(\-|\ )?\d{5}$)/);

    if (!reFPOorAPOZip.test(s)) {
         return false;
    }

    return true;
}

/*************************
	Form Field Background Color
*************************/
/*$(function(){
	$("input[type=text]").focus(function(){
		makeCurrent(this);
	});
	$("input[type=text]").blur(function(){
		makeNormal(this);
	});
	$("input[type=password]").focus(function(){
		makeCurrent(this);
	});
	$("input[type=password]").blur(function(){
		makeNormal(this);
	});
	$("textarea").focus(function(){
		makeCurrent(this);
	});
	$("textarea").blur(function(){
		makeNormal(this);
	});
});
function makeCurrent(elem){
	$(elem).css("background-color", "yellow");
}
function makeNormal(elem){
	$(elem).css("background-color", "white");
}*/

/*************************
	Footer Javascript
*************************/

function callEmailSignup() {
	var formAction = $("#subscribeForm").attr("action");
	$("#emailSignUp").html("Saving...").load(formAction, {"userEmail":$("#subscribeForm input[name=userEmail]").val()});
}

$(function() {
	$("#subscribeForm input[name=userEmail]").keydown(function(event) {
		if (event.keyCode == 13)
		{
			callEmailSignup();
			return false;
		}
	});

	$(".email-signup-container .signup-button").click(function(){
		callEmailSignup();
	});
});

/* Create cookie */

function createCookie(name, value, domain, secs, path) {
	if (secs) {
		var date = new Date();
		date.setTime(date.getTime()+(secs*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";

	document.cookie = name+"="+value+expires+"; path=" + ((path) ? path : "/") + ((domain) ? "; domain=" + domain : "");
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}


/*************************
	Required for Popup to Layer conversion
*************************/

/*
The default action for writing the response to the active popup layer.
Use this global function so the popup plugin can be changed easily
 */
var writeDataIntoLayer = function(data) {
	//used for jmpopups
	//$("#popupLayerScreenLocker").next().html(data);
	//used for openDOMWindow
	//$("#DOMWindow").html(data);
	//used for ColorBox
	$("#cboxLoadedContent").html(data);

    //used for SignUp from footer
    var signupLayerTarget = $("#signupLayerTarget");
	if (signupLayerTarget.length > 0) {
       signupLayerTarget.html(data);
    }

	$.colorbox.resize();
};

jQuery.fn.closeLayer = function(){
	/* use closeLayer() for all close layer events so that the interface with the plugin is only in one spot */
	$.colorbox.close();
};

jQuery.fn.softSlideDown = function(callback){
	this.css("opacity", 0).slideDown(300).fadeTo(150, 1, function() {
		if (callback && typeof callback == "function")
			callback();
	});
	return this;
};

jQuery.fn.softSlideUp = function(callback){
	this.fadeTo(150, 0).slideUp(300, function() {
		if (callback && typeof callback == "function")
			callback();
	}).css("opacity", 1);
	return this;
};

jQuery.fn.hilight = function(callback){
	var me = this;
	if (me.hasClass("animating")) {
		var t = setTimeout(function(){
			me.hilight(callback);
		},200);
	} else {
		var hiliteColor = "#ffffff";
		var defaultStart = "#4D4D4F";
		var currentColor = jQuery(this).css('background-color');
		if (currentColor && currentColor != 'transparent' && currentColor.indexOf("rgba(") == -1)
			defaultStart = currentColor;

		me.addClass("animating").css("background-color",defaultStart).animate({ backgroundColor:hiliteColor }, 300, function() {
			me.animate({ backgroundColor:defaultStart }, 1000, function() {
				me.css("background-color",currentColor).removeClass("animating");
				if (callback && typeof callback == "function")
					callback();
			});
		});
		return this;
	}
};

function doPrint(){
   window.print();
}

function signUpLayerInit(path, hasOverlay, fromFooter, xPos, yPos) {
    var opacity = (hasOverlay) ? .6 : 0,
        left = (fromFooter) ? xPos : null,
        top = (fromFooter) ? yPos : null;
    
    //  BEBECL-259 - Disabled the footer positioning of the signup layer
    fromFooter = false;
    
    if (fromFooter) {
        var signupLayerTargetName = "signupLayerTarget",
            overlayDiv = $('#commonOverlay');

        if ($('#' + signupLayerTargetName).length == 0) {
            $('body').append('<div id="'+ signupLayerTargetName +'"></div>');
        }

        if (hasOverlay) {
            overlayDiv.css('opacity', opacity).fadeIn();
        }

        $.ajax({
            url: path,
            success: function(data){
                var target = $('#' + signupLayerTargetName);
                target.html(data);
                var contentWidth = target.width(),
                    contentHeight = target.height(),
                    halfContentWidth = contentWidth/2,
                    contentWrap = $('div.content_wrap'),
                    contentWrapPos = contentWrap.offset(),
                    rightMostPos = contentWrapPos.left + contentWrap.width(),
                    rightMostWiggleRoom = rightMostPos - left,
                    isOverextended = (rightMostWiggleRoom < halfContentWidth),
                    amtOverextended = (isOverextended) ? halfContentWidth - rightMostWiggleRoom : 0;

                /*target.css({
                    'left': (left - halfContentWidth) - amtOverextended,
                    'top': top - ((contentHeight + 25))
                });*/

                target.hide().css('visibility', 'visible').fadeIn();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("There has been and error with your request: " + errorThrown);
            }
        });
    } else {
        $.colorbox({
            scrolling:false,
            width: (responsiveUtil.isMobile() ? responsiveUtil.getDefaultLayerWidth() : false),
            href:path,
            opacity:opacity
        });
    }
}

$(function() {
	$(document).on("click", ".openAjaxLayer", function(e) {
		e.preventDefault();
        var $this = $(this);
		var path = $this.attr("href");

		/* we need to cache bust GET requests for IE */
		var paramSep = (path.indexOf("?") > 0) ? "&" : "?";
		var d = new Date();
		path = path + paramSep + "time=" + d.getTime();

        if (path.indexOf("subscribe_layer.jsp")>-1) {
			/* do this for subscribe_layer.jsp (email sign up) and text_subscribe_layer.jsp */
			var fromFooter = false, leftPos = null, topPos = null;
			if ($this.parents(".footer").length>0) {
				fromFooter = true;
				path += "&fromFooter=true";
				var elemOffset = $this.offset();
				leftPos = elemOffset.left;
				topPos = elemOffset.top;
			}
			signUpLayerInit(path, (!$(this).hasClass('noOverlay')), fromFooter, leftPos, topPos);
        } else {
            $.colorbox({
                scrolling:false,
                href:path,
//                width:layerWidth,
                width:responsiveUtil.getLayerWidth($this),
                opacity:.6
            });
        }
		return false;
	});

	$(document).on("click", ".closePopupLayer", function(e){
		e.preventDefault();
		$(this).closeLayer();
		return false;
	});

    $(".shippedFromStoreWarning > a.jsTrigger").click(function(e) {
        e.preventDefault();
        $(this).parent().toggleClass("open", 300);
    });
});

// Validate for user input
function validateForm(formElem, message) {
	var objRegExp = /\<script\>.*\<\/script\>/;
	$(':input').each (function() {
		val = this.value;
		if (objRegExp.test(val)) {
			if (message != '') {
				alert(message);
				return false;
			}
		}
	});
}

function changeUserAddressFromList(addressId, contextPath){
	if (addressId == ""){
		$("#countryCode option:eq(0)").attr("selected", "selected").resetOverLabel();
		$("#firstName").val("").resetOverLabel();
		$("#lastName").val("").resetOverLabel();
		$("#address1").val("").resetOverLabel();
		$("#address2").val("").resetOverLabel();
		$("#apartment").val("").resetOverLabel();
		$("#city").val("").resetOverLabel();
		$("#stateSelect option:eq(0)").attr("selected", "selected").resetOverLabel();
		$("#stateText").val("").resetOverLabel();
        $("#state").val("").resetOverLabel();
		$("#zipCode").val("").resetOverLabel();
		$("#phone").val("").resetOverLabel();
		return;
	}
	var path = contextPath + "/includes/load_user_address.jsp?addressId=" + addressId;
	$.ajax({
		url:path,
		success:function(data){
			var objAddress = $.parseJSON(data);

			if (objAddress.COUNTRY_CODE){
				$("#countryCode").val(objAddress.COUNTRY_CODE).checkOverLabel().change();
			}
			if (objAddress.FIRST_NAME){
				$("#firstName").val(objAddress.FIRST_NAME).checkOverLabel();
			}
			if (objAddress.LAST_NAME){
				$("#lastName").val(objAddress.LAST_NAME).checkOverLabel();
			}
			if (objAddress.ADDRESS_LINE_1){
				$("#address1").val(objAddress.ADDRESS_LINE_1).checkOverLabel();
			}
			if (objAddress.ADDRESS_LINE_2){
				$("#address2").val(objAddress.ADDRESS_LINE_2).checkOverLabel();
			} else {
                $("#address2").val("").resetOverLabel();
            }
			if (objAddress.CITY){
				$("#city").val(objAddress.CITY).checkOverLabel();
			}
			if (objAddress.STATE){
				$("#stateSelect").val(objAddress.STATE).checkOverLabel().change();
				$("#state").val(objAddress.STATE).checkOverLabel().change();
				$("#stateText").val(objAddress.STATE).checkOverLabel();
			} else {
                $("#stateSelect option:eq(0)").attr("selected", "selected").resetOverLabel();
		        $("#stateText").val("").resetOverLabel();
		        $("#state").val("").resetOverLabel();
            }
			if (objAddress.ZIP_CODE){
				$("#zipCode").val(objAddress.ZIP_CODE).checkOverLabel();
			}
			if (objAddress.PHONE){
				$("#phone").val(objAddress.PHONE).checkOverLabel();
			}
		}
	});
}


function openProductLayer(productId, colorCode, referralCode) {
    var sourceUrl = "/catalog/includes/quicklook_miniproduct.jsp?productId="+productId;
    var qs = window.location.search;
    var extid = requestUtil.getQueryStringValue(qs, "extid", null);
    var intid = requestUtil.getQueryStringValue(qs, "intid", null);
    if (colorCode && colorCode.length>0) {
        sourceUrl += '&selectedColor=' + colorCode;
    }
    if (referralCode && referralCode.length>0) {
        sourceUrl += '&productFindingMethod=' + referralCode;
    }
    if (extid && extid.length>0) {
        sourceUrl += '&extid=' + extid;
    }
    if (intid && intid.length>0) {
        sourceUrl += '&intid=' + intid;
    }
	if (typeof OverlayWidget != "undefined") {
 		OverlayWidget.show("#headerOverlay", null, { sourceURL : sourceUrl });
    }
}


/* ------------------------------------------------------------------------
	prettyCheckboxes

	Developed By: Stephane Caron (http://www.no-margin-for-errors.com)
	Inspired By: All the non user friendly custom checkboxes solutions ;)
	Version: 1.1

	Copyright: Feel free to redistribute the script/modify it, as
			   long as you leave my infos at the top.
------------------------------------------------------------------------- */

jQuery.fn.prettyCheckboxes = function(settings) {
    settings = jQuery.extend({
                checkboxWidth: 17,
                checkboxHeight: 17,
                className : 'prettyCheckbox',
                display: 'list'
            }, settings);

    $(this).each(function(){
        // Find the label
        $label = $('label[for="'+$(this).attr('id')+'"]');

        // Add the checkbox holder to the label
        $label.prepend("<span class='holderWrap'><span class='holder'></span></span>");

        // If the checkbox is checked, display it as checked
        if($(this).is(':checked')) { $label.addClass('checked'); };

        // Assign the class on the label
        $label.addClass(settings.className).addClass($(this).attr('type')).addClass(settings.display);

        // Assign the dimensions to the checkbox display
        $label.find('span.holderWrap').width(settings.checkboxWidth).height(settings.checkboxHeight);
        $label.find('span.holder').width(settings.checkboxWidth);

        // Hide the checkbox
        $(this).addClass('hiddenCheckbox');

        // Associate the click event
        $('body').delegate($label.selector ,'click',function(){
            $('input#' + $(this).attr('for')).triggerHandler('click');

            if($('input#' + $(this).attr('for')).is(':checkbox')){
                $(this).toggleClass('checked');
                $('input#' + $(this).attr('for')).checked = true;

                $(this).find('span.holder').css('top',0);
            }else{
                $toCheck = $('input#' + $(this).attr('for'));

                // Uncheck all radio
                $('input[name="'+$toCheck.attr('name')+'"]').each(function(){
                    $('label[for="' + $(this).attr('id')+'"]').removeClass('checked');
                });

                $(this).addClass('checked');
                $toCheck.checked = true;
            };
        });

        $('input#' + $label.attr('for')).bind('keypress',function(e){
            if(e.keyCode == 32){
                if($.browser.msie){
                    $('label[for="'+$(this).attr('id')+'"]').toggleClass("checked");
                }else{
                    $(this).trigger('click');
                }
                return false;
            };
        });
    });
};

checkAllPrettyCheckboxes = function(caller, container){
    if($(caller).is(':checked')){
        // Find the label corresponding to each checkbox and click it
        $(container).find('input[type=checkbox]:not(:checked)').each(function(){
            $('label[for="'+$(this).attr('id')+'"]').trigger('click');
            if($.browser.msie){
                $(this).attr('checked','checked');
            }else{
                $(this).trigger('click');
            };
        });
    }else{
        $(container).find('input[type=checkbox]:checked').each(function(){
            $('label[for="'+$(this).attr('id')+'"]').trigger('click');
            if($.browser.msie){
                $(this).attr('checked','');
            }else{
                $(this).trigger('click');
            };
        });
    };
};

/**
 * Thumbnail Swatch Functionality
 * Upon hovering over the available thumbnail swatches, the respective image display will be updated
 * with a new image corresponding the color of the swath which trigger this event.
 */
var bindThumbnailSwatchEvents = function(_thumbnailEl) {
    var $this = $(_thumbnailEl);
    var $data = $this.elementData();
    var $imageAnchor = $this.find('a.jsImageDisplayAnchor');
    var $image = $imageAnchor.find('img');
    var originalURL = $imageAnchor.attr('href');
    var originalDataSourceURL = '';

    if($data !== null && $data.hasOwnProperty('sourceURL')) {
       originalDataSourceURL = $data.sourceURL;
    }

    $this.find('.swatchesWrap').find("li.swatch").mouseenter(function(e) {
        var $swatch = $(this),
            recoloredImage = $swatch.attr('recoloredImage'),
            colorCode = $swatch.attr('colorCode'),
            href = updateQueryStringParameter(originalURL, 'selectedColor', colorCode);

        // Reset all swatches state
        $swatch.siblings().removeClass('active');

        // Assign new active swatch
        $swatch.addClass('active');

        $imageAnchor.attr('href', href);

        $image.attr('src', recoloredImage);
        $image.attr('recoloredImage', $swatch.attr('recoloredImage'));
        $image.attr('recoloredImageAlt', $swatch.attr('recoloredImageAlt'));

        if($data !== null && $data.hasOwnProperty('sourceURL')) {
            /* widget method */
            $this.elementData('sourceURL', originalDataSourceURL + ('&selectedColor=' + colorCode));
        } else if ($(".quicklook-button", $this).length > 0) {
            /* certona / merchandiseBuilder method */
            $(".quicklook-button", $this).attr("data-colorcode", colorCode);
        }
    });


    $this.find(".jsSeeMoreColors").click(function(e){
        e.preventDefault();
        /* support for category page and for crosssells */
        //var $rootEl = $(this).parents(".Quicklook").length > 0 ? $(this).parents(".Quicklook") : $(this).parents(".ProductViewer");
        var z = parseInt($this.css("z-index"));
        z = (z > 0) ? z : 0;
        var $remainingSwatches = $(".remainingSwatches", $this);
        if ($remainingSwatches.is(":hidden")) {
            $this.css("z-index",z+10);/* since all cells are position relative, we need to make this one higher so the remaining swatches will always be on top */
            $remainingSwatches.show();
            e.stopPropagation();
            $("body").bind("click.remainingSwatches", function(e){
                var clicked = $(e.target);
                if (!clicked.parents().hasClass("remainingSwatches")) {
                    $remainingSwatches.hide();
                    $this.css("z-index",parseInt($this.css("z-index"))-10);
                    $("body").unbind("click.remainingSwatches");
                }
            });
        } else {
            $remainingSwatches.hide();
            $this.css("z-index",z-10);
            $("body").unbind("click.remainingSwatches");
        }
    });

};

var bindThumbnailHoverEvents = function(_thumbnailEl) {
    if (responsiveUtil.isDesktop()) {
        var $this = $(_thumbnailEl),
            $imageDisplay = $this.find('.image-display'),
            $imageAnchor = $imageDisplay.find('a.jsImageDisplayAnchor'),
            $image = $imageAnchor.find('img');

         $image.hover(
            function(e) {
                var recoloredImageAlt = $(this).attr('recoloredImageAlt');
                if (recoloredImageAlt != "") {
                    $(this).attr('src', recoloredImageAlt);
                }
            },
            function(e) {
                var recoloredImageAlt = $(this).attr('recoloredImageAlt');
                if (recoloredImageAlt != "") {
                    var recoloredImage = $(this).attr('recoloredImage');
                    $(this).attr('src', recoloredImage);
                }
            }
        );
    }
};


var merchandiseBuilder = function($) {
    var _formatUrl = function(_url, _env) {
        /* _env should be 'secure' or 'unsecure' */
        var curProtocol = window.location.protocol;
        var url = $.trim(_url);
        if (!_env && (url.indexOf("http://") == 0 || url.indexOf("https://") == 0)) {
            /* if we don't need to set an env and we have a full path, just change it to // */
            if (url.indexOf("http://") == 0) {
                url = url.substr(5);
            } else if (url.indexOf("https://") == 0) {
                url = url.substr(6);
            }
        } else {
            if (url.indexOf("https:") > -1) {
                /* we have a https _url, change it if necessary */
                if (_env != "secure" || curProtocol != "https:") {
                    url = url.replace("https:", "http:");
                }
            } else if (url.indexOf("http:") > -1) {
                /* we have a http _url, change it if necessary */
                if (_env != "unsecure" || curProtocol != "http:") {
                    url = url.replace("http:", "https:");
                }
            } else {
                /* we have no protocol, add it to the link */
                var host = window.location.host;
                var newProtocol = curProtocol;
                if (_env == "unsecure") {
                    newProtocol = "http:";
                } else if (_env == "secure") {
                    newProtocol = "https:";
                }
                /* first strip out any opening /'s */
                while (url.charAt(0) == "/") {
                    url = url.substr(1);
                }
                url = newProtocol + "//" + host + "/" + url;
            }
        }
        return url;
    };

    var _formatReferralCode = function(_scheme) {
        return encodeURI("CT " + (_scheme.split("_"))[0]);
    };

    var _getVideosetFromVideoURL = function(videoUrl) {
        var _videoset = videoUrl;
        if (videoUrl.lastIndexOf("/") >- 1) {
            _videoset = videoUrl.substring(videoUrl.lastIndexOf("/") + 1);
        }
        return _videoset;
    };

    var _getPlayVideoParamFromURL = function(videoUrl) {
        return "playVideo=" + _getVideosetFromVideoURL(videoUrl) + "&";
    };

    var _getSwatchesFromImageArray = function(imagesArr) {
        /*
            converts the array of thumbnail images into an array of objects that include:
             swatchImage, recoloredimage, recoloredimagealt, colorcode
            for each swatch
        */
        var _getBaseImagePath = function(thumbImage) {
            /* assumes thumbImage will be something like: http://s7d9.scene7.com/is/image/bebe/rbb-198002-wht-i1?$Thumbnail$ */
            /* delete the query string */
            var path = thumbImage.split("?")[0];
            /* delete the image reference - generally the ending -i1 */
            path = path.substring(0, path.lastIndexOf("-"));
            return path;
        };
        var _getColorCode = function(_baseImagePath) {
            return _baseImagePath.slice(_baseImagePath.lastIndexOf("-")+1);
        };

        var swatches = [];
        for (var i=0; i<imagesArr.length; i++) {
            var thumbImg = _formatUrl(imagesArr[i]);
            var obj = {};
            obj['recoloredimage'] = thumbImg;
            obj['recoloredimagealt'] = thumbImg.replace("-i1", "-i2");
            var basePath = _getBaseImagePath(thumbImg);
            obj['swatchImage'] = basePath + "-swatch?$SwatchSmall2013$";
            obj['colorcode'] = _getColorCode(basePath);
            swatches.push(obj);
        }
        return swatches;
    };

    var _getImageUrlArray = function(itemObj) {
        var imageURLs = itemObj.Image_URL;
        if (imageURLs.charAt(0) == "|") {
            imageURLs = imageURLs.slice(1);
        }
        return imageURLs.split("|");
    };

    var _createItemImage = function(itemObj) {
        var imageSrc = _formatUrl(_getImageUrlArray(itemObj)[0]);
        var html = [];
        html.push('<img src="');
        html.push(imageSrc + '" title="' + itemObj.Name + '" alt="' + itemObj.Name + '"');
        html.push(' recoloredimage="' + imageSrc + '"');
        html.push(' recoloredimagealt="' + imageSrc.replace("-i1", "-i2") + '"');
        html.push(' />');
        return html.join('');
    };

    var _createPriceString = function(itemObj) {
        var orig = parseFloat(itemObj.OriginalPrice);
        var sale = parseFloat(itemObj.PromoPrice);
        var min = parseFloat(itemObj.CurrentPriceMin);
        var max = parseFloat(itemObj.CurrentPriceMax);
        var priceStr = "";
        var listPriceStr = "";
        var salePriceStr = "";
        if ( min < max ) {
            /* we have a range */
            if (min < orig) {
                /* we have a sale range */
                listPriceStr = "$" + orig.toFixed(2);
                salePriceStr = "$" + min.toFixed(2) + " - " + "$" + max.toFixed(2);
            } else {
                /* non sale range */
                priceStr = "$" + min.toFixed(2) + " - " + "$" + max.toFixed(2);
            }
        } else {
            /* no range */
            if (sale < orig) {
                /* we have a sale price */
                listPriceStr = "$" + orig.toFixed(2);
                salePriceStr = "$" + sale.toFixed(2);
            } else {
                /* no sale */
                priceStr = "$" + orig.toFixed(2);
            }
        }
        var html = [];
        if (listPriceStr != "") {
            html.push('<span class="listPrice">' + listPriceStr + '</span> ');
        }
        if (salePriceStr != "") {
            html.push('<span class="salePrice">' + salePriceStr + '</span> ');
        }
        if (priceStr != "") {
            html.push('<span class="price">' + priceStr + '</span>');
        }
        return html.join('');
    };

    var _createItemCell = function(itemObj, _responsiveClass, _referralCode) {
        var showQuicklook = true;
        var imgUrlArr = _getImageUrlArray(itemObj);
        var canonicalUrl = _formatUrl(itemObj.Canonical_URL, "unsecure");
        if (_referralCode && (_referralCode != "")) {
            canonicalUrl += "?productFindingMethod=" + _referralCode;
        }
        var html = [];
        html.push('<div class="' + _responsiveClass + ' entity-cell">');
        html.push('<div class="current-product">');
        html.push('<div class="image-display">');
        if (itemObj.Video_URL) {
            html.push('<a href="' + canonicalUrl + '&' + _getPlayVideoParamFromURL(itemObj.Video_URL) + '">');
            html.push('<span data-videoid="' + _getVideosetFromVideoURL(itemObj.Video_URL) + '" class="video-icon"></span>');
            html.push('</a>');
        }
        html.push('<a href="' + canonicalUrl + '" class="jsImageDisplayAnchor">');
        html.push(_createItemImage(itemObj));
        html.push('</a>');
        if (showQuicklook) {
            html.push('<div class="quicklook-button" data-productid="' + itemObj.ProductId + '" data-colorcode=""></div>');
        }
        html.push('</div>'); /* image-display */
        html.push('<div class="text-display">');
        html.push('<a href="' + canonicalUrl + '">');
        html.push('<span class="display-text">' + itemObj.Name + '</span>');
        html.push(_createPriceString(itemObj));
        html.push('</a>');
        if (imgUrlArr.length > 1) {
            if (!responsiveUtil.isMobile()) {
                var _createSwatch = function(_swatch) {
                    var sw = [];
                    sw.push('<li class="swatch" ');
                    sw.push('recoloredimage="' + _swatch.recoloredimage + '" ');
                    sw.push('recoloredimagealt="' + _swatch.recoloredimagealt + '" ');
                    sw.push('colorcode="' + _swatch.colorcode + '">');
                    sw.push('<span class="swatchMask"></span>');
                    sw.push('<img alt="" src="' + _swatch.swatchImage + '" />');
                    sw.push('</li>');
                    return sw.join('');
                }
                /* if on desktop/tablet and there's more than one URL we will have to show swatches */
                html.push('<div class="swatchesWrap"><ul class="swatches">');
                var swatches = _getSwatchesFromImageArray(imgUrlArr);
                var visibleSwatchLimit = 6;
                var displayMoreList = swatches.length > visibleSwatchLimit;
                var visibleSwatchLength = (displayMoreList) ? (visibleSwatchLimit-2) : swatches.length;
                for (var i = 0; i < visibleSwatchLength; i++) {
                    html.push(_createSwatch(swatches[i]));
                }
                if (displayMoreList) {
                    html.push('<li class="moreSwatches">');
                    html.push('<a href="' + canonicalUrl + '" class="jsSeeMoreColors moreColorsText cssIcon_plus"></a>');
                    html.push('</li>')
                }
                html.push('</ul>'); /* /swatches */
                if (displayMoreList) {
                    html.push('<div class="remainingSwatches">');
                    html.push('<div class="inner">');
                    html.push('<div class="swatches"><ul>');
                    for (var i = 0; i < swatches.length; i++) {
                        html.push(_createSwatch(swatches[i]));
                    }
                    html.push('</ul></div></div></div>'); /* /swatches  /inner  /remainingSwatches  */
                }
                html.push('</div>'); /* /swatchesWrap */
            } else {
                /* if on mobile, show the more colors text */
                html.push('<div class="moreColors">');
                html.push('<a href="' + canonicalUrl + '">More Colors</a>');
                html.push('</div>');
            }
        }
        html.push('</div></div></div>'); /* /text-display  /current-product /responsiveClass  */
        return html.join('');
    };

    var _createCollection = function(itemsObj, _itemsLimit, _customItemClass, _referralCode) {
        var html = [];
        var itemClass = "certonaColumn ";
        if (_customItemClass) {
            itemClass = itemClass + _customItemClass;
        }

        var itemCount = (itemsObj.length < _itemsLimit) ? itemsObj.length : _itemsLimit;
        for (var i=0; i<itemCount; i++) {
            var _item = itemsObj[i];
            html.push(_createItemCell(_item, itemClass, _referralCode));
        }
        return html.join('');
    };

    return {
        processCertonaRecs : function(json) {
            /*
                expects a div on the page with an id of "certonaRecs"
                available options (view dynamaic attributes) are:
                  data-item_class : (optional) classes to add to each item
                  data-number_of_collections : override default of whatever number of schemes is being sent in json
                  data-number_of_items : (per collection) override default of whatever is being sent in json
            */
            var $certonaRecs = $("#certonaRecs");
            if ($certonaRecs.length == 0)
                return;
            var customItemClass = $certonaRecs.attr("data-item_class").length > 0 ? $certonaRecs.attr("data-item_class") : null;
            var collectionsLen = $certonaRecs.attr("data-number_of_collections").length > 0 ? $certonaRecs.attr("data-number_of_collections") : null;
            var itemsLimit = $certonaRecs.attr("data-number_of_items").length > 0 ? $certonaRecs.attr("data-number_of_items") : null;
            var columnWidthClass = "";
            var html = [];
            if (json.resonance && json.resonance.schemes) {
                var _schemes = json.resonance.schemes;
                var _len = (collectionsLen && parseInt(collectionsLen) > 0) ? parseInt(collectionsLen) : _schemes.length;
                for (var s=0; s<_len; s++) {
                    var _scheme = _schemes[s];
                    if (_scheme.display == "yes") {
                        var referralCode = _formatReferralCode(_scheme.scheme);
                        if (!itemsLimit) {
                            itemsLimit = parseInt(_scheme.items.length);
                        }

                        if (itemsLimit <= 3) {
                            columnWidthClass = "threeItems";
                        } else if (itemsLimit == 4) {
                            columnWidthClass = "fourItems";
                        } else if (itemsLimit == 5) {
                            columnWidthClass = "fiveItems";
                        } else if (itemsLimit >= 6) {
                            columnWidthClass = "sixItems";
                        }

                        html.push('<div id="' + _scheme.scheme + '" data-referral_code="' + referralCode + '" class="crossSellWrap clearfix columns actual ' + columnWidthClass + '">');
                        html.push('<div class="heading">' + _scheme.explanation + '</div>');
                        html.push(_createCollection(_scheme.items, itemsLimit, customItemClass, referralCode));
                        html.push('</div>'); /* crossSellWrap */
                    }
               }
            }
            $certonaRecs.html(html.join(''));
            $(".current-product", $certonaRecs).each(function(){
                var $this = $(this);
                $this.hover(
                    function() {
                        $(".quicklook-button", this).show();
                    },
                    function() {
                        $(".quicklook-button", this).hide();
                    }
                );

                $(".quicklook-button", $this).click(function(e){
                    var dataRefCode = null;
                    if ($(this).parents(".crossSellWrap").attr("data-referral_code")){
                        dataRefCode = $(this).parents(".crossSellWrap").attr("data-referral_code");
                    }
                    if ($.trim(dataRefCode) != "") {
                        dataRefCode = $.trim(dataRefCode);
                    }
                    openProductLayer($(this).attr("data-productid"), $(this).attr("data-colorcode"), dataRefCode);
                });

                bindThumbnailHoverEvents($this);
                bindThumbnailSwatchEvents($this);
            });
            $(document).trigger("certonaComplete");
        }
    };
}($);


var certonaRecs = function(json) {
    //console.log(json);
    merchandiseBuilder.processCertonaRecs(json);
};


var dynamicDataUtil = function($) {
    var _baseUrl = ""; /* passed in on page load to account for http/https and local environments */

    var _getJSON = function(path, success) {
        /* we need to cache bust GET requests for IE */
        var paramSep = (path.indexOf("?") > 0) ? "&" : "?";
        var d = new Date();
        path = _baseUrl + path + paramSep + "time=" + d.getTime();
        $.getJSON(path, null, success);
    };

    var _processCartInfo = function(obj) {
        var cartCount = obj.ocp_cartCount;
        if (parseInt(cartCount) == 0) {
            $("#headerItemCount").html(cartCount).parents("#widget-but-ucart").addClass("empty");
        } else {
            $("#headerItemCount").html(cartCount).parents("#widget-but-ucart").removeClass("empty");
        }
    };

    var _processUserInfo = function(obj) {
        var username = obj.ocp_userName;
        if (username == "") {
            $("#jsSignInMessage").html(username).addClass("signedOut");
        } else {
            $("#jsSignInMessage").html(username).removeClass("signedOut");
        }
        $("#dynamicTopNavData").fadeIn("fast");
    };

    var _processMyAcctMenu = function(obj) {
        var html = [];
        for (i=0; i<obj.length; i++) {
            html.push('<li><a href="' + obj[i].link + '">' + obj[i].text + '</a></li>');
        }
        $("#myAcctMenu").html(html.join(''));
    };

    var _processTopNav = function(obj) {
        return; /* do nothing on the front end, call is just for legacy GPS support */
        _processUserInfo(obj.user);
        _processCartInfo(obj.cart);
        _processMyAcctMenu(obj.myAcctMenu);
    };

    return {
        getTopNav : function() {
            _getJSON("/includes/json/topNavData.jsp", _processTopNav);
        },

        init : function(baseUrl) {
            _baseUrl = baseUrl;
        }
    };
}($);


/* This will make an Ajax call to update cart data. */
var cartInfoUtil = function($) {
    function _updateCartCount(cartCount, highlight) {
        var $headerItemCount = $("#headerItemCount");
        if (parseInt(cartCount) == 0) {
            $headerItemCount.html(cartCount).parents("#widget-but-ucart").addClass("empty");
        } else {
            $headerItemCount.html(cartCount).parents("#widget-but-ucart").removeClass("empty");
        }
        if (highlight) {
            $headerItemCount.hilight();
        }
    };
    return {
        getCartCount: function(contextPath, highlight) {
            var countDateStamp = new Date();
            if (!contextPath.endsWith("/")) {
                contextPath += "/";
            }
            $.ajax({
                url: contextPath + "checkout/data/item_count.jsp?time=" + countDateStamp.getTime(),
                success: function(data) {
                    _updateCartCount(data, highlight);
                }
            });
        },
        updateCartCount: function(cartCount, highlight) {
            _updateCartCount(cartCount, highlight);
        }
    };
}($);

$(document).ready(function() {
    var $emailMobileInput = $("#emailOrMobileNumber");
    $emailMobileInput.data("defaultVal", $emailMobileInput.val());

    $emailMobileInput.focus(function(e){
        if ($(this).val() == $(this).data("defaultVal")){
            $(this).val('');
        }
    }).blur(function(e){
        if ($(this).val() == ''){
            $(this).val($(this).data("defaultVal"));
        }
    });

    $("#emailOrMobileForm").submit(function(e){
        e.preventDefault();
        var $input = $(this).find("input");
        if ($input.val() == '' || $input.val() == $(this).data("defaultVal")) {
            return;
        } else {
            var $target = $("#jsLauchEmailLayer");
            var targetHref = $target.attr("href").split("?")[0];
            $target.attr("href", targetHref+"?userEmail="+$input.val()).click();
        }
/*
        disable the text functionality of the layer for now

        } else if ($input.val().indexOf("@")>-1) {
            var $target = $("#jsLauchEmailLayer");
            var targetHref = $target.attr("href").split("?")[0];
            $target.attr("href", targetHref+"?userEmail="+$input.val()).click();
        } else {
            var $target = $("#jsLauchTextLayer");
            var targetHref = $target.attr("href").split("?")[0];
            $target.attr("href", targetHref+"?smsPhone="+$input.val()).click();
        }
*/
    });

    $("#submitEmailOrMobile").click(function(e){
        e.preventDefault();
        $(this).parents("form").submit();
    });

    $('.catalog-entity-thumbnail .Quicklook, #moreItemsWrap .ProductViewer').each(function(index, element) {
        var $this = $(element);
        bindThumbnailHoverEvents($this);
        bindThumbnailSwatchEvents($this);
    });

    //Add commonOverlay div to the DOM to be used when building custom layer functionality that requires an overlay
    if ($('#commonOverlay').length == 0) {
        $('body').append('<div id="commonOverlay"></div>');
    }
});


function adjustDDLPos() {
    var $userNameLength = $('#usersFirstName').width();
    var $userAccDdl = $('#memberDropdown');
    var memeberDropdownWidth = $userAccDdl.width();
    var leftAdjust = ((memeberDropdownWidth - $userNameLength) / 2);
    if ($userNameLength > 0) {
        $userAccDdl.css('left', "-" + leftAdjust + "px");
    } else {
        $userAccDdl.css('left', "-" + 30 + "px");
    }
}

/* Contains a set of functions that provide useful utility functionality when interacting with a request. */
var stringUtil = {
    /* Returns a boolean of whether the string provided begins with the given prefix. */
    beginsWith: function(str, prefix) {
        if (str == '' || prefix == '') {
            return false;
        }
        return str.indexOf(prefix) === 0;
    },

    /* Returns a boolean of whether the string provided ends with the given suffix. */
    endsWith: function(str, suffix) {
        if (str == '' || suffix == '') {
            return false;
        }
        return str.indexOf(suffix, this.length - suffix.length) !== -1;
    },

    /* Returns a boolean of whether the full string provided contains the given find string. */
    contains: function(fullStr, findStr) {
        if (fullStr == '' || findStr == '') {
            return false;
        }
        return fullStr.indexOf(findStr) >= 0;
    }
};

/* Contains a set of functions that provide useful utility functionality when interacting with a request. */
var requestUtil = {
    /* Removes a parameter and it's value by providing both the parameter name and value from the given URL. */
    removeParamValue: function(url, param, value) {
        var baseUrl = this.getBaseUrl(url);
        var params = this.getQueryStringParams(url);
        var firstParam = true;
        var queryString = '';
        for (var i = 0; i < params.length; i++) {
            if (decodeURI(params[i]) == (param + "=" + value)) {
                continue;
            } else if (params[i] != '') {
                queryString += (firstParam) ? '' : '&';
                queryString += params[i];
                firstParam = false;
            }
        }

        return this.buildUrl(baseUrl, queryString);
    },

    /* Removes all instances of the parameter and it's value by providing the parameter name from the given URL. */
    removeParams: function(url, param) {
        var baseUrl = this.getBaseUrl(url);
        param = encodeURIComponent(param);
        var params = this.getQueryStringParams(url);
        var firstParam = true;
        var queryString = '';
        for (var i = 0; i < params.length; i++) {
            if (params[i].indexOf(param) == -1 && params[i] != '') {
                queryString += (firstParam) ? '' : '&';
                queryString += params[i];
                firstParam = false;
            }
        }

        return this.buildUrl(baseUrl, queryString);
    },

    /* Inserts the parameter and value to the given URL. */
    insertParam: function(url, param, value) {
        if (param == '' || value == '') {
            return url;
        }
        var baseUrl = this.getBaseUrl(url);
        param = encodeURIComponent(param);
        value = encodeURIComponent(value);
        var queryString = url.replace(baseUrl, '').replace('?', '');
        queryString += (queryString != '') ? '&' : '';
        queryString += param + '=' + value;

        return this.buildUrl(baseUrl, queryString);
    },

    /* Updates all instances of the parameter with the new value from the given URL. */
    updateParam: function(url, param, value) {
        var baseUrl = this.getBaseUrl(url);
        param = encodeURIComponent(param);
        value = encodeURIComponent(value);
        if (param == '') {
            return url;
        }
        if (value == '') {
            return this.removeParams(url, param);
        }
        if (!stringUtil.contains(url, param)) {
            return this.insertParam(url, param, value);
        }
        var params = this.getQueryStringParams(url);
        var queryString = '';
        if (params.length == 0) {
            queryString = param + '=' + value;
        } else {
            for (var i = 0; i < params.length; i++) {
                queryString += (i > 0) ? '&' : '';
                if (params[i].indexOf(param) >= 0 && params[i] != '') {
                    queryString += param + '=' + value;
                } else {
                    queryString += params[i];
                }
            }
        }
        return this.buildUrl(baseUrl, queryString);
    },

    /* Returns an array of query string parameters from the given URL. (i.e. [parameterName=parameterValue])  */
    getQueryStringParams: function(url) {
        if (url == '') {
            return [];
        }
        if (url.indexOf('?') >= 0) {
            url = url.split('?')[1];
        }
        url = '?' + url;

        return url.substr(1).split('&');
    },

    /* Returns a query string parameter value from the given URL. If the parameter is not found, then the default will be returned. */
    getQueryStringValue: function(url, key, default_) {
        var params = this.getQueryStringParams(url);
        var queryString = '';
        if (params.length == 0) {
            return default_;
        } else {
            for (var i = 0; i < params.length; i++) {
                if (params[i].indexOf(key) <= 0 && params[i] != '') {
                    return params[i].split('=')[1];
                }
            }
        }
        return default_;
    },

    /* Returns the base URL portion of the given URL without query string parameters. */
    getBaseUrl: function(url) {
        if (url == '') {
            return '';
        }
        if (url.indexOf('?') >= 0) {
            url = url.split('?')[0];
        }
        return url;
    },

    /* Returns the full URL by combining both the base URL and the query string parameters while handling the question marks and ampersands. */
    buildUrl: function(url, queryString) {
        if (url == '' && queryString == '') {
            return '?';
        }
        /* Check if the URL doesn't contain a question mark then add it to the query string. */
        if (url.indexOf('?') < 0 && !stringUtil.beginsWith(url, '?')) {
            queryString = '?' + queryString;
        }
        /* Check if the URL contains a question mark and doesn't end with a question mark or ampersand. */
        if (url.indexOf('?') >= 0 && !stringUtil.endsWith(url, '?') && !stringUtil.endsWith(url, '&')) {
            // If so, ensure the query string begins with an ampersand.
            if (queryString != '' && !stringUtil.beginsWith(queryString, '&')) {
                queryString = '&' + queryString;
            }
        }

        return url + queryString;
    }
};


var ajaxPackagerUtil = function($) {
    var _getJSON = function(path, success) {
        path = _updateTCAreaParam(path);
        /* we need to cache bust GET requests for IE */
        var paramSep = (path.indexOf("?") > 0) ? "&" : "?";
        var d = new Date();
        path = path + paramSep + "time=" + d.getTime();
        $.getJSON(path, null, success);
    };

    var _processPackage = function(obj) {
        for (var key in obj) {
            if (key == "trueDeviceType") {
                $("body").data("true_device_type", obj[key]);
                responsiveUtil.toggleViewAsDeviceLink();
            } else {
                $("#" + key).html(obj[key].replace(/\\\\'/g, "'").replace(/\\'/g, "'").replace(/\\"/g, '"'));
            }
        }
    };

    var _updateTCAreaParam = function(path) {
        if (window.ajaxPkgTCAreas || typeof(window.ajaxPkgTCAreas) !== 'undefined' || window.ajaxPkgTCAreas != null) {
            var updatedParam = "";
            for (var tcAreaIdx in window.ajaxPkgTCAreas) {
                if (updatedParam !== '') {
                    updatedParam += ',';
                }
                updatedParam += window.ajaxPkgTCAreas[tcAreaIdx];
            }
            path = requestUtil.removeParams(path, 'ajaxPkgTCAreas');
            path = requestUtil.insertParam(path, 'ajaxPkgTCAreas', updatedParam);
        }
        return path;
    };

    return {
        init : function(packagerPath) {
            _getJSON(packagerPath, _processPackage);
        }
    };
}($);

var nav = {
    adjust: function() {
        if (responsiveUtil.isMobile()) {
            $(".mobileNav li").unbind('mouseenter mouseleave');
            $(".mobileNav li a.parent").unbind('click').bind('click', function(e) {
                // must be attached to anchor element to prevent bubbling
                e.preventDefault();
                $(this).toggleClass("open");
                $(this).parent("li").children("ul").slideToggle(400, "easeInOutQuint");
            });
        }
        else {
            $(".mobileNav li").removeClass("hover");
            $(".mobileNav li a").unbind('click');
            $(".mobileNav li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
                // must be attached to li so that mouseleave is not triggered when hover over submenu
                $(this).toggleClass('hover');
            });
        }
    },
    init: function() {
        var $topNavRoot = $("#topNavRoot");
        /* add parent classes if applicable */
        $("li a", $topNavRoot).each(function() {
            if ($(this).next().length > 0) {
                $(this).addClass("parent");
            };
        });
        
        /* find the currently selected parent cat */
        var $currentParent = $topNavRoot.find(".current");
        if ($(".active", $currentParent).hasClass("parent")) {
            /* if the active category has subs, then open the menu */
            $(".active", $currentParent).parent("li").children("ul").slideToggle(400, "easeInOutQuint");
        }
        /* and always open the currently selected parent cat */
        $currentParent.children("ul").slideToggle(400, "easeInOutQuint");

        $("#mobileNavMenu").click(function(e) {
            e.preventDefault();
            $(this).toggleClass("active");
            var $nav = $("#topNavRoot");
            if (!$nav.is(":visible")) {
                $nav.show();
                /* since the productButtonContainer is fixed position, set the width so it goes off the screen */
                $("#productButtonContainer").width($("#productButtonContainer").width());
                $("#bodyContainer,#productButtonContainer").animate({
                    //measures the width of the menu
                    marginLeft: "+=" + $nav.width()
                  }, 500, "easeInOutExpo");
            } else {
                $("#bodyContainer,#productButtonContainer").animate({
                    marginLeft: "-=" + $nav.width()
                  }, 500, "easeInOutExpo", function(){
                    $nav.hide();
                    $("#productButtonContainer").width("auto");
                  }
                );
            }
        });
        nav.adjust();
    }
};

var toggleMenu = function(el) {
    var $this = $(el);
    if (!$this.hasClass("toggleMenuInited")) {
        $this.addClass("toggleMenuInited");
        var $trigger = $(".trigger", $this);
        var triggerClass = "cssIcon_arrow-wide";
        if ($this.attr("data-triggerIconClass") != null) {
            triggerClass = $this.attr("data-triggerIconClass");
        }
        $trigger.append('<span class="' + triggerClass + '"></span>');
        $trigger.click(function(e){
            e.preventDefault();
            if ($this.hasClass("open")) {
                $(".toggleMenu", $this).slideToggle(400, "easeOutExpo", function(){
                    $this.removeClass("open");
                });
            } else {
                $this.addClass("open");
                $(".toggleMenu", $this).slideToggle(400, "easeInOutQuint");
            }
        });
    }
};

var responsiveUtil = function($) {
    var _$responsiveRoot = null;
    var _responsiveMode = null;
    var mobileString = "mobile";
    var tabletString = "tablet";
    var desktopString = "desktop";

    var _readBodyClass = function() {
        if (_$responsiveRoot.hasClass(mobileString)) {
            _responsiveMode = mobileString;
        } else if (_$responsiveRoot.hasClass(tabletString)) {
            _responsiveMode = tabletString;
        } else {
            _responsiveMode = desktopString;
        }
    };

    var _init = function() {
        _$responsiveRoot = $('body');
        _readBodyClass();
    };

    return {
        /* returns a string, mobile, tablet, desktop */
        getResponsiveMode: function() {
            if (!_responsiveMode) {
                _init();
            }
            return _responsiveMode;
        },
        getDefaultLayerWidth: function(_desktopW, _tabletW, _mobileW) {
            var _layerWidth = "50%";
            if (responsiveUtil.isDesktop()) {
                if (_desktopW) {
                    _layerWidth = _desktopW;
                } else {
                    _layerWidth = "50%";
                }
            } else if (responsiveUtil.isTablet()) {
                if (_tabletW) {
                    _layerWidth = _tabletW;
                } else {
                    _layerWidth = "70%";
                }
            } else if (responsiveUtil.isMobile()) {
                if (_mobileW) {
                    _layerWidth = _mobileW;
                } else {
                    _layerWidth = "96%";
                }
            }
            return _layerWidth;
        },
        getLayerWidth: function(object) {
            //Here is where we are going to define the layer widths for the different device types.
            var $this = object;
            var layerWidth = responsiveUtil.getDefaultLayerWidth();
            var dynamicLayerWidth;

            if (responsiveUtil.isMobile()) {
                dynamicLayerWidth = $this.attr('data-layerwidthmobile');
            } else if (responsiveUtil.isTablet()) {
                dynamicLayerWidth = $this.attr('data-layerwidthtablet');
            } else if (responsiveUtil.isDesktop()) {
                dynamicLayerWidth = $this.attr('data-layerwidthdesktop');
                if ($this.hasClass("autoWidth"))
                    dynamicLayerWidth = "auto";
            }

            if (dynamicLayerWidth !== undefined && dynamicLayerWidth.indexOf("%") >= 0) {
                layerWidth = dynamicLayerWidth;
            } else if (dynamicLayerWidth !== undefined && dynamicLayerWidth.indexOf("px") >= 0) {
                layerWidth = parseInt(dynamicLayerWidth.replace('px', ''));
            } else if (dynamicLayerWidth !== undefined && isNumber(dynamicLayerWidth)) {
                layerWidth = dynamicLayerWidth;
            } else if (dynamicLayerWidth == "auto") {
                layerWidth = false;
            }

            return layerWidth;
        },
        viewFullSite: function() {
            createCookie("DEVICE_TYPE", "Desktop");
            window.location.reload();
            return false;
        },
        viewMobileSite: function() {
            createCookie("DEVICE_TYPE", "Mobile");
            window.location.reload();
            return false;
        },
        toggleViewAsDeviceLink: function() {
            if ($("body").data("true_device_type") == mobileString) {
                $("#viewMobileSiteFoot").show();
            }
        },
        isMobile: function() {
            return (this.getResponsiveMode() == mobileString);
        },
        isTablet: function() {
            return (this.getResponsiveMode() == tabletString);
        },
        isDesktop: function() {
            return (this.getResponsiveMode() == desktopString);
        }
    };
}($);

//Global Bind Window Resize/Orientation Change
$(window).bind('resize orientationchange', function() {
    nav.adjust();
});


/* GP SHOPPER mobile web redirect support */
if (getQuerystringValue(window.location.href, "noredirect") == "yes") {
    createCookie("DEVICE_TYPE", "Desktop");
    var mwhref = window.location.href;
    window.location.href = mwhref.replace("?noredirect=yes", "");
}

//Global Document Ready
$(document).ready(function() {

    //Global Inits
    $('img[usemap]').rwdImageMaps();

    //Depending on which device type we are in fire the appropriate document ready code
    if(responsiveUtil.isMobile()) {
        nav.init();
        $(".jsToggleMenu").each(function(){
            toggleMenu(this);
        });
    } else if(responsiveUtil.isTablet()) {
    } else if(responsiveUtil.isDesktop()) {
    }

    if (!responsiveUtil.isMobile()) {
        $('.catalog-sort-refine-option input[type=checkbox]').prettyCheckboxes({className: 'pretty-checkbox'});

        $("ul.megamenu > li").on("mouseenter", function(e) {
            $(this).addClass("mmHover");
        }).on("mouseleave", function(e) {
            $(this).removeClass("mmHover");
        });

        $("#signInContainer").on("mouseenter", function(e) {
            adjustDDLPos();
            $(this).addClass("hover");
        }).on("mouseleave", function(e) {
            $(this).removeClass("hover");
        });

        if (is_touch_device()) {
            $("ul.megamenu > li > a").on("touchstart", function(e) {
                if (!$(this).parent().hasClass("mmHover")) {
                    /* do not navigate away from the page, just open the top nav menu */
                    e.preventDefault();
                    $(".mmHover").removeClass("mmHover");
                    $(this).parent().addClass("mmHover");
                }
            });

            $("#signInContainer").on("touchstart", function(e) {
                e.stopPropagation();
                if (!$(this).hasClass("hover")) {
                    /* do not navigate away from the page, just open the top nav menu */
                    e.preventDefault();
                    adjustDDLPos();
                    $(this).addClass("hover");
                }
            });
            $(document).on("touchstart", function() {
                $("#signInContainer").removeClass("hover");
            });
        }
    }

    $("#headerTop").on("click", "#searchIcon", function(){
        if (!responsiveUtil.isDesktop()) {
            $("#searchEntryDrawer").slideToggle(400, "easeInOutQuint", function(){
                //
            });
        }
    });
});

//CHARACTER LIMITER
(function($) {
    $.fn.extend( {
        limiter: function(limit, elem) {
            $(this).on("keyup focus", function() {
                setCount(this, elem);
            });
            function setCount(src, elem) {
                var chars = src.value.length;
                if (chars > limit) {
                    src.value = src.value.substr(0, limit);
                    chars = limit;
                }
                elem.html( limit - chars );
            }
            setCount($(this)[0], elem);
        }
    });
})(jQuery);



