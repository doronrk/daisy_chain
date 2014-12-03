mmcore.SetCookie('mmid','-2068792630|AQAAAAqWarvvTQsAAA==',365,1);mmcore.SetCookie('pd','157240581|AQAAAAoBQpZqu+9NCzQ++eoBAHneIp/F3NFIAA4AAAB53iKfxdzRSAAAAAD/////AP//////////AAZEaXJlY3QBTQsBAAAAAAABAAAAAAD///////////////8AAAAAAAFF',365);mmcore.SetCookie('srv','nycvwcgus03',365);(function(){mmcore.custAttrs = {GeoZipCode:'19104'};if(typeof(mmcore.GenInfo)!='object')mmcore.GenInfo={};mmcore.EH=function(e){var s=e.message+'\r\n';if(!window.mm_error)window.mm_error=s;else window.mm_error+=s;};
try{
mmcore.nord = {};
mmcore.nord.wcm = 0;
if ('nord' in window && 'config' in window.nord && 'settings' in nord.config) mmcore.nord.wcm = 1;
if (typeof(cmSetupOther) == 'function') { cmSetupOther({"cm_TrackImpressions":"RCM"}); }
else window.cm_TrackImpressions = "RCM";
//console.log(window.cm_TrackImpressions);
if (typeof(Storage)!=="undefined") mmcore.nord.storage = 1;
if (mmcore.GetCookie('pgcount') === '1') mmcore.SetCookie('pgcount', 2);
if (mmcore.GetCookie('pgcount') === '') mmcore.SetCookie('pgcount', 1);
}catch(err){mmcore.EH(err);}
try{
mmcore.SetCookie = function (n, v, d, g, h) {	// n == name, v == value, d == days, g == global, h == decode
    var _t = this,
        _h = _t._Host(_t._TL(location.hostname)),
        exp = _t._FutureDate(d);
    _t._d.cookie = escape(eval(g) ? n : _t._PN(n)) + '=' + (h?v:escape(v)) + (_h.length ? ';domain=' + _h : '') + ';path=/' + (typeof d !== 'undefined' && d !== 0 ? (';expires=' + exp.toGMTString()) : '');
    _t.SetParam(n, v);
};
}catch(err){mmcore.EH(err);}
try{
// utility module
// global
// on page load
mmcore.nord.utils = function() {
	/**************************************************************************/
	// matchBrowser
	// Matches a browsers X, X.X, and X.X.X version number
	/**************************************************************************/
	function matchBrowser(browsername, browserversion) {
	    var ua= navigator.userAgent;
	    var re = new RegExp(browsername+"\/"+browserversion+"[.]{1}", "i");
	    var re2 = new RegExp("Version/"+browserversion+"\.+.*"+browsername+"/", "i");
	    return !(re.exec(ua) == null && re2.exec(ua) == null);
	}
  
	/**************************************************************************/
	// detectBrowser
	// Returns the browser name and version number
	/**************************************************************************/
	function detectBrowser() {
	    var ua= navigator.userAgent, tem, 
	    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+\.\d+\.\d+)/i) || [];
	    if(/trident/i.test(M[1])){
	        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
	        return 'IE '+(tem[1] || '');
	    }
	    if(M[1]=== 'Chrome'){
	        tem= ua.match(/\bOPR\/(\d+)/)
	        if(tem!= null) return 'Opera '+tem[1];
	    }
	    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
	    return M.join(' ');
	}
	/**************************************************************************/
	// headerCSSInject
	// Uses stragiht JS to inject CSS into the header
	/**************************************************************************/
	function headerCSSInject(css) {
		var head = document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);
	}

	/**************************************************************************/
	// mmAsyncAction
	// Fires off an asyncronous MM action
	/**************************************************************************/
	function mmAsyncAction(action, attribute, num, pageID) {
		//Set default values if not present
		num = (num) ? num : 1;
		pageID = (pageID) ? pageID : action;		
		mmcore._async = true;
		if (attribute) mmcore.SetAction(action, num, attribute);
		else mmcore.SetAction(action, num);
		mmcore.SetPageID(pageID);
		mmcore.CGRequest();
	}

	/**************************************************************************/
	// mmDeferredAction
	// Fires off an deferred MM action
	/**************************************************************************/
	function mmDeferredAction(action, attribute, num) {
		//Set default values if not present
		num = (num) ? num : 1;		
		if (attribute) mmcore.$Action(action, num,  attribute);
		else mmcore.$Action(action, num);
	}
  
        /**************************************************************************/
        // inArray
        // Finds a value in an array without using Jquery
        /**************************************************************************/
        function inArray(elem, array, i) {
            var len;
            if ( array ) {
                if ( array.indexOf ) {
                    return array.indexOf.call( array, elem, i );
                }
                len = array.length;
                i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;
                for ( ; i < len; i++ ) {
                    // Skip accessing in sparse arrays
                    if ( i in array && array[ i ] === elem ) {
                        return i;
                    }
                }
            }
            return -1;
        }
  
	/**************************************************************************/
	// getQueryParam
	// Finds a parameter in the querystring and returns the parameter's value
	/**************************************************************************/
	function getQueryParam(param) {
		var url = window.location.search;
		if (url.indexOf(param + '=') === -1) return '';
		var start = url.indexOf(param + '=') + param.length + 1;
		var end = (url.indexOf('&', start) !== -1) ? url.indexOf('&', start) : url.length;
		return url.substring(start, end);
	}

	/**************************************************************************/
	// getQueryParamValue
	// Finds a parameter in the querystring and returns the parameter's value
	/**************************************************************************/
	function getHashParam(param) {
		var url = window.location.hash;
		if (url.indexOf(param + '=') === -1) return false;
		var start = url.indexOf(param + '=') + param.length + 1;
		var end = (url.indexOf('&', start) !== -1) ? url.indexOf('&', start) : url.length;
		return url.substring(start, end);
	}

	/**************************************************************************/
	// removeQueryParam
	// Removes a parameter from the querystring
	/**************************************************************************/
	function removeQueryParam(url, param, value) {
		return url.replace("?"+param+"="+value+"&", "?").replace("&"+param+"="+value, "");
	}

	/**************************************************************************/
	// mmEvent
	// plain JS cross-browser event trigger
	/**************************************************************************/
	function mmEvent(name) {
		var event;
		if (document.createEvent) {
			event = document.createEvent('Event');
			event.initEvent(name, true, true);
			document.dispatchEvent(event);
			return false;
		}
		else {
			document.documentElement[name]++;
			return false;
		}
	}

	/**************************************************************************/
	// mmListen
	// plain JS cross-browser event listener
	/**************************************************************************/
	function mmListen(eventName, fire) {
		if (document.addEventListener) document.addEventListener(eventName, fire, true);
		else if(document.attachEvent) {
			document.documentElement[eventName] = 0;
			document.documentElement.attachEvent("onpropertychange", function(event) {
				if (event.propertyName == eventName) {
					fire();
				}
			});
		}
	}

	/**************************************************************************/
	// wcmutils
	// utilities/events for WCM only
	/**************************************************************************/
	(function wcmutils() {
		if (mmcore.nord.wcm) {
			// is jQuery loaded?
			var jquery_loaded = function() {
				if ('jQuery' in window) mmEvent('jquery_yes');
				else setTimeout(jquery_loaded, 50);
			};
			jquery_loaded();

			// is tto obj created?
			var tto_loaded = function() {
				if ('nord' in window && 'config' in nord && 'settings' in nord.config && 'tto' in nord.config.settings) mmEvent('tto_yes');
				else setTimeout(tto_loaded, 50);
			};
			tto_loaded();

			// is shopper obj created?
			var shopper_loaded = function() {
				if ('nord' in window && 'config' in nord && 'settings' in nord.config && 'shopper' in nord.config.settings) mmEvent('shopper_yes');
				else setTimeout(shopper_loaded, 50);
			};
			shopper_loaded();
                  
                        // is features obj created?
                        var features_loaded = function() {
                          if ('nord' in window && 'config' in nord && 'settings' in nord.config && 'features' in nord.config.settings) mmEvent('features_yes');
                          else setTimeout(features_loaded, 50);
                        };
                        features_loaded();

			/*var timing_loaded = function() {
                          if ('performance' in window && 'timing' in performance && 'loadEventEnd' in performance.timing && performance.timing.loadEventEnd > 0) mmEvent('tto_loadEventEnd');
			  else setTimeout(timing_loaded, 100);
			};
                        timing_loaded();*/
                  	
		}
	})();

	/**************************************************************************/
	// require
	// injects scripts on demand using requirejs in WCM, yepnope in Legacy
	/**************************************************************************/
	function require(modules) {
		var i, fileArr = [], path = mmcore.GetCookie('cfgID') === '1' ? 'http://i.dev.nordstromimage.com/images/default/shop/js/tto/dev/' : 'http://i.nordstromimage.com/images/default/shop/js/tto/';
		if (typeof modules === 'string') {
			fileArr.push(modules);
		}
		else fileArr = modules;
		for (i=0;i<fileArr.length;i++) {
			s = document.createElement('script');
			s.src = path + fileArr[i] + '.js';
			document.getElementsByTagName('head')[0].appendChild(s);
		}
	}
  
	return {
		getQueryParam: getQueryParam,
		getHashParam: getHashParam,
		headerCSSInject: headerCSSInject,
		removeQueryParam: removeQueryParam,
		mmAsyncAction: mmAsyncAction,
		mmDeferredAction: mmDeferredAction,
		require: require,
		mmEvent: mmEvent,
		mmListen: mmListen,
          	matchBrowser: matchBrowser,
	        detectBrowser: detectBrowser,
          	inArray: inArray
	};
}();
}catch(err){mmcore.EH(err);}
try{
/******************************************************************************/
// serializes and writes JSON array to mmcore.PC cookie to track user behavior
// campaigns read cookie and set persistent Personalization Criteria as needed
// public method to read cookie: mmcore.nord.PC.read([key])
// on page load
// global
/******************************************************************************/
mmcore.nord.PC = (function() {
	var _debug = false;
	var PCcookie = mmcore.GetCookie('PC'), PCarray = (PCcookie !== '') ? JSON.parse(PCcookie) : {};
	mmcore.PCs = mmcore.PCs || {};

	/**************************************************************************/
	// init
	// initialize the object
	/**************************************************************************/
	function init() {
		getLogin();
		getFR();
		getEncore();
		getWomens();
		getMens();
		getYCM();
		getYCW();
		getDesigner();
		//getKids();
		getKidsBTS();
		getPetites();
		getBaby();
		getJuniors();
		getBridgeWAP();
		setArrayCookie();
	}

	/**************************************************************************/
	// init
	// initialize the object after DOM loads
	/**************************************************************************/
	function initAfterLoad() {
		getEncoreAfterLoad();
		getYCWAfterLoad();
		getPetitesAfterLoad();
		filterEvents();
	}

	/**************************************************************************/
	// setSegmentScore
	// sets segment score for a given cookie
	/**************************************************************************/
	function setSegmentScore(segment, score) {
		mmcore.PCs[segment] = score;	// ATB
		setArrayCookie();
	}

	/**************************************************************************/
	// setArrayCookie
	// sets the PC array values in persistent storage in the cookies
	/**************************************************************************/
	function setArrayCookie() {//console.log('PCcookie');
		for (var i in mmcore.PCs) {
			PCarray[i] = mmcore.PCs[i];
                  //console.log(PCarray[i]);
			mmcore.SetCookie('PC', JSON.stringify(PCarray), 45, false, true);
			//console.log(mmcore.GetCookie('PC'));
		}
	}

	/**************************************************************************/
	// readArrayCookie
	// Reads the PC array values from persistent storage in the cookies
	/**************************************************************************/
	function readArrayCookie(key) {
		return ((key in PCarray) ? PCarray[key] : 0);
	}

	/**************************************************************************/
	// getSegment
	// shopperRegion/shopperStyle, AllShop
	/**************************************************************************/
	function getSegment() {
		if (('nord' in window && 'config' in window.nord) && 
			'shopperSegment' in nord.config.settings.tto && nord.config.settings.tto.shopperSegment !== null) {
			var bar = PageParameters.shopperSegment.indexOf('|');
			mmcore.PCs.region = nord.config.settings.tto.shopperSegment.charAt(bar+1);
			mmcore.PCs.style = nord.config.settings.tto.shopperSegment.charAt(bar+2);
		}
	}

	/**************************************************************************/
	// getATB
	// handles add to bag actions for all segments
	/**************************************************************************/
	function getATB(pc) {
		$(document).bind('mmatb', function() {	// custom event fired on ATB in ATB.js site script
			increaseSegmentValue(pc, 3);
		});
	}

	/**************************************************************************/
	// getPurchase
	// registers a purchase for a given segment
	/**************************************************************************/
	function getPurchase(categoryArray, pc) {
		if ('PageParameters' in window && 'orderInfo' in PageParameters && 'items' in PageParameters.orderInfo) {
			var i, j=0, oii = PageParameters.orderInfo.items;
			for (i in oii) {
				for (; j<categoryArray.length; j++) {
					if (oii[i].productCategory.indexOf(categoryArray[j]) !== -1) {
						increaseSegmentValue(pc, 5);						
					}
				}
			}
		}
	}

	/**************************************************************************/
	// getLogin
	// gets the login status of the current user
	/**************************************************************************/
	function getLogin() {
		var nc, ac;
		if (window.location.hostname.indexOf('.dev') !== -1) {
			nc = 'nordstromdev';
			ac = 'authstatusdev';
		}
		else {
			nc = 'nordstrom';
			ac = 'authstatus';
		}
		if (mmcore.GetCookie(nc, true).indexOf('firstname') === -1) {	// anon
			mmcore.PCs.auth = 'AN';
		}
		else if (mmcore.GetCookie(ac, true) === '') {	// recognized
			mmcore.PCs.auth = 'RC';
		}
		else {	// logged in
			mmcore.PCs.auth = 'LI';
		}
		mmcore.nord.utils.mmEvent('PCs.auth');
	}
  
  /**************************************************************************/
	// getFR
	// gets fashion rewards status
	/**************************************************************************/
	function getFR() {
		var ps;
		if ('PageParameters' in window && 'shopper' in PageParameters) {
			mmcore.PCs.rewards =  (PageParameters.shopperAttrEa || (parseInt(PageParameters.shopper.maxRewardsLevel) > 0));
		}
		else if ('nord' in window && 'config' in window.nord && 'settings' in nord.config && 'shopper' in nord.config.settings) {
			mmcore.PCs.rewards = (nord.config.settings.shopper.isEarlyAccessEligible || (nord.config.settings.shopper.maxRewardsLevel > 0));
		}
		
		setArrayCookie();      
	}
  
	/**************************************************************************/
	// isProductPage
	// Is this a product page?
	/**************************************************************************/
	function isProductPage() {
		if ('nord' in window && 'config' in window.nord && 'settings' in window.nord.config && 'page' in window.nord.config.settings) {
			return (nord.config.settings.page.pageType === "ProductPage");
		}
		else return false;
	}

	/**************************************************************************/
	// checkKeywords
	// Checks for specific keywords for a segment
	/**************************************************************************/
	function checkKeywords(a) {
		var re1 = new RegExp(a.replace(/\+/g, "\\+"), "ig");
		var re2 = new RegExp(a.replace(/\+/g, "\\-"), "ig");

		if(mmcore.nord.utils.getQueryParam('keyword').toLowerCase().match(re1) !== null || mmcore.nord.utils.getQueryParam('keyword').toLowerCase().match(re2) !== null) return true;
		else return false;
	}

	/**************************************************************************/
	// checkURLPath
	// Checks for specific URL segments
	/**************************************************************************/
	function checkURLPath(pathArray) {
		if ($.inArray(window.location.pathname, pathArray) > -1) return true;
		else return false;
	}

	/**************************************************************************/
	// checkCategories
	// Checks for specific categories
	/**************************************************************************/
	function checkCategories(categoryArray) {
		for (var i=0; i< categoryArray.length; i++) {
			if ('PageParameters' in window && 'categoryString' in PageParameters && PageParameters.categoryString !== null ) {
				if(PageParameters.categoryString.match(categoryArray[i])) return true;
			}

			if ('PageParameters' in window && 'productCategoryId' in PageParameters && PageParameters.productCategoryId !== null ) {
				if(PageParameters.productCategoryId.match(categoryArray[i])) return true;
			}
		}
		
		return false;
	}

	/**************************************************************************/
	// checkBrands
	// Checks for specific brand names
	/**************************************************************************/
	function checkBrands(brandArray) {
		if ('nord' in window && 'config' in window.nord && 'settings' in window.nord.config && 'product' in window.nord.config.settings) {
			if ($.inArray(nord.config.settings.product.brandName.toLowerCase(), brandArray) > -1) return true;
		}

		return false;
	}

	/**************************************************************************/
	// checkBrands
	// Checks for specific brand names
	/**************************************************************************/
	function checkGender(genderArray) {
		if ('nord' in window && 'config' in window.nord && 'settings' in window.nord.config && 'product' in window.nord.config.settings) {
			if ($.inArray(nord.config.settings.product.gender.toLowerCase(), genderArray) > -1) return true;
		}

		return false;
	}

	/**************************************************************************/
	// checkBrands
	// Checks for specific brand names
	/**************************************************************************/
	function checkAge(ageArray) {
		if ('nord' in window && 'config' in window.nord && 'settings' in window.nord.config && 'product' in window.nord.config.settings) {
			if ($.inArray(nord.config.settings.product.ageGroup.toLowerCase(), ageArray) > -1) return true;
		}

		return false;
	}

	/**************************************************************************/
	// checkBrands
	// Checks for specific brand names
	/**************************************************************************/
	function checkReferrer(referrerArray) {
		for (var i in referrerArray) {
			if (document.referrer.toLowerCase().indexOf(referrerArray[i])!=-1) {
				return true;
			}
		}

		return false;
	}

	/**************************************************************************/
	// filterEvents
	// Fire events for the filters
	/**************************************************************************/
	function filterEvents() {
		if($("#dynamicFilter").length <= 0) return;

		$(".filter ul > li").on("mouseup", function() {
			var e = jQuery.Event( "ATO_SEGMENTS_FILTERS", { text: $(this).text() } );
			$(document).trigger(e);
		})
	}

	/**************************************************************************/
	// filterListen
	// Listen for the filter events
	/**************************************************************************/
	function getFilters(filterArray, segment) {
		$(document).on("ATO_SEGMENTS_FILTERS", function(e) {
			for (var i in filterArray) {
				if (e.text.toLowerCase().indexOf(filterArray[i])!=-1) {
					increaseSegmentValue(segment, 1)
				}
			}
		})
	}

	/**************************************************************************/
	// leftNavEvents
	// Fire events for the left nav
	/**************************************************************************/
	function leftNavEvents() {
		if($('#category-nav a, .side-navigation a, .left-nav-category-tree a').length <= 0) return;

		$('#category-nav a, .side-navigation a, .left-nav-category-tree a').on('mouseup', function() {
			var e = jQuery.Event( "ATO_SEGMENTS_LEFTNAV", { text: $(this).text() } );
			$(document).trigger(e);
		})
	}

	/**************************************************************************/
	// getLeftNav
	// Listen for the left nav events
	/**************************************************************************/
	function getLeftNav(brandArray, segment) {
		$(document).on("ATO_SEGMENTS_LEFTNAV", function(e) {
			for (var i in filterArray) {
				if (e.text.toLowerCase().indexOf(brandArray[i])!=-1) {
					increaseSegmentValue(segment, 1)
				}
			}
		})
	}

	/**************************************************************************/
	// increaseSegmentValue
	// Centralizes the addition
	/**************************************************************************/
	function increaseSegmentValue(segment, amt) {
		if (_debug) console.log("INCREASE SEGMENT: " + segment + " +" + amt);
		mmcore.PCs[segment] += amt;
    window.postMessage({ type: "SEGMENT_MONITOR", segment: segment, amt: amt }, "*");
		setArrayCookie();
	}

	/////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////
	// 	THE SEGMENTS
	/////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////

	/**************************************************************************/
	// getWomens
	// WAP Segment
	/**************************************************************************/
	function getWomens() {
		var keywords = 'for+women';
		var paths = ['/c/accessories', '/c/womens-clothing', '/c/womens-shoes-shop', '/c/beauty-makeup-perfume'];
		var categories = ['60136226', '2376778', '6008000', '2377897'];

		mmcore.PCs.womens = readArrayCookie('womens');

		if (checkCategories(categories) || checkURLPath(paths) || checkKeywords(keywords)) { 
			increaseSegmentValue('womens', 1);
		}

		getPurchase(categories, 'womens');

		if (!isProductPage()) return;
		
    if ('nord' in window && 'config' in window.nord && 'settings' in nord.config && 'product' in nord.config.settings && 'ageGroup' in nord.config.settings.product && 'gender' in nord.config.settings.product && 'isDesigner' in nord.config.settings.product && nord.config.settings.product.ageGroup === "Adult" && nord.config.settings.product.gender === 'Female' && !nord.config.settings.product.isDesigner) {
			increaseSegmentValue('womens', 1);
			getATB('womens');
		}
	}

	/**************************************************************************/
	// getMens
	// Mens Segment
	/**************************************************************************/
	function getMens() {
		var keywords = 'Topman|John+Varvatos|Tuxedo|Sportscoat|Big+and+Tall|men';
		var paths = ['/c/men', '/c/mens-clothing', '/c/mens-shoes-shop', '/c/mens-accessories-shop', '/c/mens-designer', '/c/all-mens-rail', '/c/mens-grooming-cologne'];
		var categories = ['2374609'];

		mmcore.PCs.mens = readArrayCookie('mens');

		if (checkCategories(categories) || checkURLPath(paths) || checkKeywords(keywords)) { 
			increaseSegmentValue('mens', 1);
		}

		getPurchase(categories, 'mens');

		if (!isProductPage()) return;
		
    if ('nord' in window && 'config' in window.nord && 'settings' in nord.config && 'product' in nord.config.settings && 'ageGroup' in nord.config.settings.product && 'gender' in nord.config.settings.product && nord.config.settings.product.ageGroup === "Adult" && nord.config.settings.product.gender === 'Male') {
			increaseSegmentValue('mens', 1);
			getATB('mens');
		}
	}

	/**************************************************************************/
	// getYCM
	// YCM Segment
	/**************************************************************************/
	function getYCM() {
		var keywords = 'Topman|Rail';
		var categories = ['60150629', '60160268'];

		mmcore.PCs.YCM = readArrayCookie('YCM');

		if (checkCategories(categories) || checkKeywords(keywords)) { 
			increaseSegmentValue('YCM', 1);
			getATB('YCM');
		}

		getPurchase(categories, 'YCM');
	}

	/**************************************************************************/
	// getYCW
	// YCW Segment
	/**************************************************************************/
	function getYCW() {
		var categories = ['60150628', '60160208', '60156114'];
		var brands = ['1 state ', 'ace delivery', 'chelsea 28', 'free people', 'hinge', 'topshop', 'treasure &amp; bond', 'trouve', 'wildfox'];
		var filters = ['1 state ', 'ace delivery', 'chelsea 28', 'free people', 'hinge', 'topshop', 'treasure & bond', 'trouve', 'wildfox'];
		var paths = ['/c/1state', '/c/all-1state', '/c/womens-chelsea28', '/c/free-people', '/c/free-people-women', '/c/free-people-clothing', '/c/free-people-womens-dresses', '/c/free-people-womens-pants-shorts', '/c/free-people-womens-skirts', '/c/free-people-womens-tops', '/c/hinge', '/c/womens-hinge', '/c/hinge-womens-clothing', '/c/topshop', '/c/all-topshop', '/c/topshop-videos', '/c/topshop-new-arrivals', '/c/womens-topshop-sale', '/c/topshop-all-clothing', '/c/topshop-dresses', '/c/topshop-tops', '/c/topshop-sweaters', '/c/topshop-jeans', '/c/topshop-coats', '/c/topshop-jackets', '/c/topshop-pants-shorts', '/c/topshop-skirts', '/c/topshop-swimsuits-cover-ups'];
		var referrers = ['asos.com', 'nastygal.com', 'zara.com', 'topshop.com', 'freepeople.com', 'forever21.com', 'urbanoutfitters.com'];
		var ages = ['toddler', 'youth'];
		var genders = ['male', 'female', 'unisex'];
		var keywords = 'savvy|topshop|1+state|ace+delivery|chelsea+28|free+people|Hinge|treasure+&+bond|trouve|wildfox' + "|" + brands.join("|").replace(/ /g, '+');

		mmcore.PCs.YCW = readArrayCookie('YCW');

		if (checkCategories(categories) || checkURLPath(paths) || checkKeywords(keywords) || checkBrands(brands) || checkReferrer(referrers) ) { 
			increaseSegmentValue('YCW', 1);
			getATB('YCW');
		}

		getPurchase(categories, 'YCW');
		getFilters(filters, 'YCW');
	}

	/**************************************************************************/
	// getYCWAfterLoad
	// YCW Segment post DOM actions
	/**************************************************************************/
	function getYCWAfterLoad() {
		if (!isProductPage()) return;

		if ($("li:contains('Savvy')", "ul.style-features").length > 0) {
			increaseSegmentValue('YCW', 1);
			getATB('YCW');
		}
	}

	/**************************************************************************/
	// getDesigner
	// Designer Segment
	/**************************************************************************/
	function getDesigner() {
		var keywords = 'burberry|chanel|valentino|chloe|gucci|fendi|prada|red+valentino|christian+louboutin|alexander+wang|helmut+lang|designer|akris+punto|armani|alexander+mcqueen|alice+olivia|armani|dolce+gabbana|dolce-gabbana|donna+karan|herve+leger|jay+godfrey|jimmy+choo|manolo+blahnik|michael+kors|oscar+de+la+renta|pedro+garcia|phillip+lim|roberto+cavalli|saint+laurent|stella+mccartney|tracy+reese|akris|mcq|belstaff|proenza+schouler|mcqueen|balenciaga|escada|jason+wu|emilio+pucci|etro|iro|lanvin|maxmara|marc+jacobs|ferragamo|versace|alice-olivia|miumiu|tods|haute+hippie|lagence|rag+bone|rag-bone|current+elliott|elizabeth+james|elizabeth-james|the+kooples|m+missoni|alc|frame+denim|robert+rodriguez|mcginn|rachel+zoe|veda|just+cavalli|carven|apc|blk+denim|smythe|habitual|faith+connexion|opening+ceremony|theyskens+theory|zadig+voltaire|zadig-voltaire';
		var categories = ['6006559'];

		mmcore.PCs.designer = readArrayCookie('designer');
		
		if (checkCategories(categories) || checkKeywords(keywords) ) { 
			increaseSegmentValue('designer', 1);
			getATB('designer');
		}

		getPurchase(categories, 'designer');

		if (!isProductPage()) return;

    if ('nord' in window && 'config' in window.nord && 'settings' in nord.config && 'product' in nord.config.settings && 'isDesigner' in nord.config.settings.product && nord.config.settings.product.isDesigner) {
			increaseSegmentValue('designer', 1);
			getATB('designer');
		}
	}

	/**************************************************************************/
	// getKids
	// Kids Segment
	/**************************************************************************/
	function getKids() {
		var keywords = 'adidas+for+kids|baby|baby+bag|baby+boden|baby+clothes|baby+shoes|boots+for+kids|boys+shoes|burberry+for+kids|burberry+kids|converse+for+kids|diaper+bag|diaper+bags|dresses+for+girls|flower+girl+dresses|girls+boots|girls+dresses|girls+shoes|hunter+for+kids|juicy+couture+for+kids|kids|kids+apparel|kids+shoes|kids+toms|kids+uggs|mini+boden|mini+boden+|mini+boden+girls|minnetonka+for+kids|new+balance+for+kids|nike+for+kids|north+face+for+kids|peek|petunia+pickle+bottom|polo+ralph+lauren++for+kids|quicksilver+for+kids|rain+boots+for+kids|ralph+lauren+for+kids|shoes+for+kids|sorel+for+kids|sperry+top-sider+for+kids|strollers|tea+collection|the+north+face+for+kids|toms+for+kids|true+religion+brand+jeans+for+kids|tucker+++tate|tucker+and+tate|ugg+australia+for+kids|ugg+kids|under+armour+for+kids|uppababy|vans+for+kids|volcom+for+kids|zella+for+kids';
		var categories = ['2379293'];
		var paths = ['/c/baby-kids'];

		mmcore.PCs.kids = readArrayCookie('kids');

		if (checkCategories(categories) || checkURLPath(paths) || checkKeywords(keywords) ) { 
			increaseSegmentValue('kids', 1);
			getATB('kids');
		}

		getPurchase(categories, 'kids');
	}

	/**************************************************************************/
	// getKids
	// Kids Segment
	/**************************************************************************/
	function getKidsBTS() {
		var brands = ['stride rite', 'igor', 'jumping jacks', 'see kai run', '3c4g gifts', '4 love', 'abela designs 4 keeps', 'accessory collective', 'adidas logo os', 'adidas os', 'aegean apparel', 'alex toys', 'alpine sleds', 'andrea\'s beau', 'andy&amp;evan for little gentlemen', 'anthem of the ants', 'appaman', 'bd &amp; a', 'biscotti', 'bling2o goggle', 'blume', 'blush by us angels', 'boden', 'bo-po toys', 'boxos papercraft sets', 'breaking waves', 'butter supersoft', 'cejon accessories', 'chaser', 'collapse a pail', 'cuddle barn plush toys', 'design history', 'diggin active toys', 'dirtee hollywood', 'dkny mens &amp; boys dresswear', 'dorissa', 'downeast girl', 'element boys &amp; menswear', 'elisa b', 'endless games', 'esme', 'estes zip disc set', 'etch a sketch', 'fantasia accessories', 'fashion angels', 'fine print', 'fiveloaves twofish', 'flow society', 'flowers by zoe', 'fun loom', 'galt toys', 'genuine monkeez &amp; friends', 'geospace international toys', 'gerson &amp; gerson', 'gibbs smith', 'glitzy bella', 'go! games', 'goldieblox toys', 'gossip girl', 'guillow\'s toys', 'gund', 'gypsy daisy', 'hachette books', 'halabaloo', 'hanna andersson', 'high intencity', 'hog wild toys', 'hula star', 'ic sleepwear', 'imaginista toy', 'improv electronics', 'intelliglobe', 'international arrivals', 'iscream gifts', 'isobella &amp; chloe', 'jem sportswear', 'jenna &amp; jessie', 'joan calabrese for mon cheri', 'john varvatos star usa boys', 'joseph abboud belts &amp; slg', 'juicy couture accessories', 'kate mack', 'kate quinn organics', 'kid o toys', 'kiddo by katie', 'kidoozie toys', 'kimmi fragrance', 'kitsch', 'klutz books', 'laser pegs toys', 'laura ashley girls dresses', 'lauren marie', 'lego lights &amp; accessories', 'lemon fizz', 'levi\'s childrens', 'libertalia', 'little experience', 'loopdedoo toy', 'lotta luv beauty', 'loungefly', 'lul love you lots', 'luli and me', 'madame alexander dolls', 'madpax', 'master toys', 'mattel toys', 'me.n.u', 'mele &amp; co.', 'mignone', 'miken clothing', 'mindware', 'morfs apparel', 'neff headwear', 'nfl logo os', 'nitro watches', 'ogo sport', 'ooh la la couture', 'outset media games', 'peek aren\'t you curious', 'penguin books', 'perplexus toys', 'pinc premium', 'pink vanilla', 'pippa &amp; julie', 'plasmart toys', 'play visions toys', 'pocket disc', 'poof-slinky', 'popatu', 'pressman toy', 'prime time toys', 'pumpkin patch', 'pumponator toys', 'rad clothing', 'raisins', 'ralph lauren childrenswear', 'ray ban junior', 'recent toys puzzles', 'rockin robin', 'rolf bleu accessories', 'ruby rox', 'sally miller', 'schylling', 'singing machine karaoke system', 'smartlab/artlab toys', 'snowtime anytime gifts', 'sports images toys', 'squishable gifts', 'star wars toys', 'sugar lulu toys', 't2 love', 'tangle toys', 'tea collection', 'thames &amp; kosmos science kits', 'thinkfun games', 'tin-tastic', 'tractr jeans', 'truly me', 'turbo twister toys', 'twirls and twigs', 'ty', 'un deux trois', 'uncle milton', 'usangels', 'vintage havana apparel', 'weatherproof garment childrens', 'weavers', 'westminster toys', 'widgeon outerwear', 'world tech toys', 'yo gabba gabba character toys', 'zara terez', 'zoe'];
		var categories = ['60136122', '60136141', '60139433', '60134138', '60161619', '60168550', '60139435', '60134142', '60161626', '60140702', '60166413', '60140706', '60166414'];
		var filters = ['little girl', 'little boy', 'toddler', 'big girl', 'big boy', 'little kid', 'big kid'];
		var paths = ['/c/baby-kids'];
		var ages = ['toddler', 'youth'];
		var genders = ['male', 'female', 'unisex'];
		var keywords = 'kids|boys|girls|children' + "|" + brands.join("|").replace(/ /g, '+');

		mmcore.PCs.kidsBTS = readArrayCookie('kidsBTS');

		if (checkCategories(categories) || checkURLPath(paths) || checkKeywords(keywords) || (checkBrands(brands) && checkAge(ages)) ) { 
			increaseSegmentValue('kidsBTS', 1);
			getATB('kidsBTS');
		}

		getPurchase(categories, 'kidsBTS');
		getFilters(filters.concat(brands), 'kidsBTS');
		getLeftNav(brands, 'kidsBTS');
	}

	/**************************************************************************/
	// getBaby
	// Baby Segment
	/**************************************************************************/
	function getBaby() {
		var brands = ['stride rite', 'igor', 'jumping jacks', 'see kai run', '3 sprouts', '7 a.m. enfant', 'a d sutton &amp; sons', 'aden + anais', 'andy&amp;evan for little gentlemen', 'aurora world toys', 'baghera toys', 'bamboobies', 'bebe au lait', 'beco bay gear', 'beginagain toys', 'bella tunno', 'belly bandit', 'bestever', 'biscotti', 'blueberry hill hats', 'blume', 'bob strollers', 'boden', 'boon', 'boppy infant products', 'bugaboo', 'buggyguard', 'bump nest', 'butterscotch blankees', 'charles castro', 'charm', 'chewbeads', 'chicco juvenile gear', 'clek', 'cloud b', 'compendium', 'crane air quality products', 'crocodile creek', 'danzo diaper bags', 'diaper dude', 'educo', 'electrik kidz', 'elf on the shelf', 'fatboy furniture', 'flensted mobiles', 'gerson &amp; gerson', 'gift giant', 'green toys', 'guavamitts', 'gund', 'hachette books', 'hanna andersson', 'i can do that! games', 'i see me', 'ic sleepwear', 'incharacter costumes', 'isobella &amp; chloe', 'itzy ritzy', 'ivi playcarpets', 'jellycat london', 'jj cole collections', 'ju-ju-be', 'kahn lucas lancaster', 'kate mack', 'kate quinn organics', 'kevel mommy accessory', 'kid o toys', 'kissy kissy', 'laura ashley girls dresses', 'levi\'s childrens', 'little giraffe', 'little me', 'little things mean a lot', 'loose leaf eyewear', 'lul love you lots', 'luli and me', 'mamaroo - 4moms', 'manhattan toy', 'marathon', 'marie-chantal', 'mary meyer', 'mattel toys', 'maxi-cosi', 'mele &amp; co', 'melissa &amp; doug', 'meri meri at home &amp; acc', 'messy marvin', 'mini maniacs', 'modern moose', 'money scholar', 'mud pie', 'mustela', 'my brest friend', 'nat &amp; jules plush toys', 'natursutten pacifiers', 'nolan glove', 'noodle &amp; boo', 'offspring', 'oliver b', 'organized from the start', 'oxo tot juvenile gear', 'paul smith children\'s wear', 'peanut shell by studio arts', 'pearls &amp; popcorn ltd', 'peek aren\'t you curious', 'pello childrens accessories', 'perine lowe', 'perry mackin diaper bags', 'petit collage decor', 'petunia pickle bottom', 'pippa &amp; julie', 'p\'kolino', 'plan toys', 'plh bows &amp; laces', 'poof-slinky', 'popatu', 'pressman toy', 'pumpkin patch', 'quinny', 'ralph lauren childrenswear', 'regal lager', 'ruffle butts', 'salisbury pewter', 'schylling', 'skip hop', 'soapsox bath aids', 'sock it to me', 'someday', 'sophie la girafe', 'spacecraft', 'stella kim diaper bags', 'storksak', 'super sprowtz', 'swaddledesigns', 'tea collection', 'teethease jewelry', 'the ellie rose', 'tiggly', 'timi &amp; leslie diaper bags', 'tobbles toy', 'toofeze', 'tree by kerri lee', 'trumpette', 'twig creative toys', 'twirls and twigs', 'usangels', 'wubbanub', 'zebi', 'zoli'];
		var categories = ['60133688', '60159172', '60159173', '60139477', '60137831', '60134250', '60150561', '60167219', '60167227', '60166416', '60167351'];
		var filters = ['newborn', '0-3m', '3-6m', '6-9m', '9-12m', '12-18m', '18-24m', 'baby', 'walker'];
		var paths = ['/c/baby-girl', '/c/baby-boy', '/c/baby-walker-shoes', '/c/baby-gear', '/c/baby-gifts', '/c/maternity', '/c/all-baby-girl-sale', '/c/all-baby-boy-sale', '/c/baby-shoes-sale', '/c/sale-baby-gear'];
		var ages = ['infant', 'baby'];
		var genders = ['male', 'female', 'unisex'];
		var keywords = 'baby|baby+boy|baby+girl' + "|" + brands.join("|").replace(/ /g, '+');

		mmcore.PCs.baby = readArrayCookie('baby');

		if (checkCategories(categories) || checkURLPath(paths) || checkKeywords(keywords) || (checkBrands(brands) && checkAge(ages)) ) { 
			increaseSegmentValue('baby', 1);
			getATB('baby');
		}

		getPurchase(categories, 'baby');
		getFilters(filters.concat(brands), 'baby');
		getLeftNav(brands, 'baby');
	}

	/**************************************************************************/
	// getJuniors
	// Juniors Segment
	/**************************************************************************/
	function getJuniors() {
		var brands = ['bp', 'frenchi', 'lush', 'rubbish', 'fire', 'jolt', 'mimi chica', 'painted threads', 'see thru soul', 'soprano', 'hailey logan', 'vigoss', 'way-in', 'articles of society', 'dee elle', 'lily white'];
		var categories = ['60135751', '6007579'];
		var filters = ['bp', 'frenchi', 'lush', 'rubbish', 'fire', 'jolt', 'mimi chica', 'painted threads', 'see thru soul', 'soprano', 'hailey logan', 'vigoss', 'way-in', 'articles of society', 'dee elle', 'lily white'];
		var paths = ['/c/juniors-shop', '/c/juniors-shop', '/c/sale-juniors-clothing', '/c/bp', '/c/bp-accessories', '/c/bp-clothing', '/c/bp-shoes', '/c/frenchi', '/c/lush', '/c/rubbish-clothing', '/c/fire', '/c/jolt', '/c/mimi-chica', '/c/painted-threads', '/c/see-thru-soul', '/c/soprano-clothing', '/c/vigoss-jeans', '/c/articles-of-society', '/c/dee-elle', '/c/lily-white-clothing'];
		var ages = ['teen'];
		var genders = ['female'];
		var keywords = 'for+juniors' + "|" + brands.join("|").replace(/ /g, '+');

		mmcore.PCs.juniors = readArrayCookie('juniors');

		if (checkCategories(categories) || checkURLPath(paths) || checkKeywords(keywords) || checkBrands(brands) || (checkAge(ages) && checkGender(genders)) ) { 
			increaseSegmentValue('juniors', 1);
			getATB('juniors');
		}

		getPurchase(categories, 'juniors');
		getFilters(filters.concat(brands), 'juniors');
		getLeftNav(brands, 'juniors');
	}
  
	/**************************************************************************/
	// getEncore
	// Encore / Plus Segment
	/**************************************************************************/
	function getEncore() {
		var keywords = 'plus-size|plus+size|plus|encore|sejour|city+chic|evans|pink+lotus';
		var paths = ['/c/womens-plus-size-shop', '/c/womens-plus-size'];
		var categories = ['6007059'];

		mmcore.PCs.encore = readArrayCookie('encore');
		
		if (checkCategories(categories) || checkURLPath(paths) || checkKeywords(keywords) ) { 
			increaseSegmentValue('encore', 1);
		}

		getPurchase(categories, 'encore');
	}

	/**************************************************************************/
	// getEncoreAfterLoad
	// Encore / Plus Segment post DOM actions
	/**************************************************************************/
	function getEncoreAfterLoad() {
		$(document).on('click.tto', '#dynamicFilter ul#filter_Size li[data-defaultsize3="plus"]', function(){
			increaseSegmentValue('encore', 1);
		});

		if (isProductPage()) {
      if('nord' in window && 'config' in window.nord && 'settings' in nord.config && 'page' in nord.config.settings && 'pageType' in nord.config.settings.page && nord.config.settings.page.pageType == "ProductPage") {
				$('input[type=radio][value=Plus]').one('mouseup', function() {
					increaseSegmentValue('encore', 1);
				});

				if ($('input[type=radio][value=Plus]:checked').length > 0 ||
					$("li:contains('Encore')", "ul.style-features").length > 0) {
					increaseSegmentValue('encore', 1);
					getATB('encore');
				}
			}
		}
	}

	/**************************************************************************/
	// getPetites
	// Petites Segment
	/**************************************************************************/
	function getPetites() {
		var keywords = 'petite+dresses|eileen+fisher+petite|nydj+petite|petite+coats|petite+jeans|halogen+petite|petite+sale|petite+tops|nic+and+zoe+petite|caslon+petite|adrianna+papell+petite|lafayette+148+new+york+petite|petite+pants|petite|petite+dress|petite+leather+jacket|vince+camuto+petite|eileen+fisher+petites|petite+coat|petite+leggings';
		var categories = ['6002273'];

		mmcore.PCs.petites = readArrayCookie('petites');
          
		if (checkCategories(categories) || checkKeywords(keywords) || (window.location.pathname.match('/c/') !== null && window.location.pathname.match('petite') !== null)) { 
			increaseSegmentValue('petites', 1);
			getATB('petites');
		}
		
		if (!isProductPage()) return;

		$(document).bind('mmatb', function() {
			if($("ul > li.selected", "#skuSelector_size1Value").length > 0 && 
			   $("ul > li.selected", "#skuSelector_size1Value").children("a").children("label").html().slice(-1).toLowerCase() == "p") {
				increaseSegmentValue('petites', 3);
			}
		});
	}

	/**************************************************************************/
	// getPetitesAfterLoad
	// Petites Segment post DOM actions
	/**************************************************************************/
	function getPetitesAfterLoad() {
		$(document).on('click.tto', '#dynamicFilter ul#filter_Size li:contains("Petite")', function(){
			increaseSegmentValue('petites', 1);
		});

		if (!isProductPage()) return;

		$('input[type=radio][value=Petite]').one('mouseup', function() {
			increaseSegmentValue('petites', 1);
		});

		if ($("li:contains('Petite Focus.')", "ul.style-features").length > 0 || 
			$('input[type=radio][value=Petite]:checked').length > 0) {
			increaseSegmentValue('petites', 1);
			getATB('petites');
		}
	}

	/**************************************************************************/
	// getBridgeWAP
	// Womens Bridge Pricing Segment
	/**************************************************************************/
	function getBridgeWAP() {
		var brands = ['3.1 phillip lim', 'alc', 'alexander wang', 'alice &amp; olivia', 'apc', 'ashley b', 'band of outsiders', 'barbour', 'blk dnm', 'boss hugo boss', 'burberry brit', 'canada goose', 'carven', 'classiques entier', 'clover canyon', 'cole haan', 'current/elliott', 'dawn levy', 'dooney &amp; bourke', 'dvf', 'diane von furstenberg', 'eileen fisher', 'elie tahari', 'elizabeth &amp; james', 'equipment', 'frame denim', 'habitual', 'halston heritage', 'haute hippie', 'helmut lang', 'hunter', 'ivanka trump', 'joie', 'just cavalli', 'kate spade new york', 'l\'agence', 'lamarque', 'layfayette 148 new york', 'longchamp', 'm missoni', 'maje', 'marc by marc jacobs', 'mcginn', 'milly', 'moncler', 'nordstrom collection', 'parker', 'pink tartan', 'rachel roy', 'rachel zoe', 'rag &amp; bone', 'rebecca minkoff', 'rebecca taylor', 'robert rodriguez', 'sandro', 'smythe', 'tadashi shoji', 'ted baker london', 'the kooples', 'theory', 'theyskens theory', 'tibi', 'tory burch', 'trina turk', 'truth &amp; pride', 'veda', 'vince', 'weekend max mara', 'white + warren', 'zadig &amp; voltaire'];
		var filters = [];
		var paths = ['/c/3-1-phillip-lim', '/c/3-1-phillip-lim-womens-clothing', '/c/3-1-phillip-lim-handbags', '/c/60175807', '/c/a-l-c', '/c/alexander-wang', '/c/alexander-wang-womens-clothing', '/c/alexander-wang-womens-handbags', '/c/alexander-wang-womens-shoes', '/c/alice-olivia', '/c/alice-olivia-womens-clothing', '/c/alice-and-olivia-shoes', '/c/alice-olivia-womens-hosiery', '/c/a-p-c-', '/c/womens-a-p-c', '/c/ashley-b', '/c/band-of-outsiders', '/c/womens-band-of-outsiders', '/c/barbour', '/c/womens-barbour', '/c/blk-dnm', '/c/blk-dnm-womens-clothing', '/c/boss-black-women', '/c/hugo-boss-women', '/c/burberry-brit', '/c/womens-burberry-brit', '/c/burberry-brit-womens-clothing', '/c/burberry-brit-womens-perfume', '/c/canada-goose', '/c/carven', '/c/carven-clothing', '/c/classiques-entier', '/c/clover-canyon', '/c/cole-haan', '/c/all-cole-haan', '/c/womens-cole-haan', '/c/cole-haan-womens-clothing', '/c/cole-haan-womens-shoes', '/c/current-elliott', '/c/dooney-bourke', '/c/diane-von-furstenberg', '/c/diane-von-furstenberg-clothing', '/c/diane-von-furstenberg-wrap-dresses', '/c/diane-von-furstenberg-shoes', '/c/diane-von-furstenberg-accessories', '/c/eileen-fisher', '/c/womens-eileen-fisher', '/c/eileen-fisher-womens-clothing', '/c/eileen-fisher-womens-dresses', '/c/60179410', '/c/eileen-fisher-womens-top', '/c/eileen-fisher-womens-shoes', '/c/eileen-fisher-womens-accessories', '/c/eileen-fisher-bestsellers', '/c/eileen-fisher-outfits', '/c/womens-eileen-fisher-sale', '/c/elie-tahari', '/c/elie-tahari-clothing', '/c/elizabeth-and-james', '/c/elizabeth-and-james-womens-clothing', '/c/elizabeth-and-james-womens-handbags', '/c/equipment', '/c/equipment-womens-sweaters', '/c/equipment-womens-shirts-blouses', '/c/frame-denim', '/c/habitual-jeans', '/c/halston-heritage', '/c/haute-hippie', '/c/haute-hippie-clothing', '/c/helmut-lang', '/c/helmut-lang-clothing-for-women', '/c/hunter', '/c/womens-hunter', '/c/hunter-boots-women', '/c/hunter-womens-socks', '/c/hunter-womens-coats-jackets', '/c/joie', '/c/joie-clothing', '/c/joie-shoes', '/c/just-cavalli', '/c/just-cavalli-women', '/c/kate-spade-new-york', '/c/all-kate-spade-new-york', '/c/womens-kate-spade-new-york', '/c/kate-spade-new-york-womens-clothing', '/c/kate-spade-new-york-womens-shoes', '/c/l-agence', '/c/lamarque', '/c/lafayette-148-new-york', '/c/womens-lafayette-148-new-york', '/c/lafayette-148-new-york-pants', '/c/lafayette-148-new-york-tops', '/c/lafayette-148-new-york-casual-basics', '/c/lafayette-148-new-york-womens-accessories', '/c/lafayette-148-new-york-womens-sale', '/c/longchamp', '/c/m-missoni', '/c/maje', '/c/marc-by-marc-jacobs', '/c/marc-by-marc-jacobs-view-all', '/c/womens-marc-by-marc-jacobs', '/c/marc-by-marc-jacobs-womens-clothing', '/c/marc-by-marc-jacobs-womens-shoes', '/c/mcginn', '/c/milly', '/c/womens-milly', '/c/moncler', '/c/womens-nordstrom-collection', '/c/nordstrom-collection-womens-apparel', '/c/parker', '/c/pink-tartan', '/c/rachel-roy', '/c/rachel-zoe', '/c/rachel-zoe-womens-clothing', '/c/rag-bone', '/c/womens-rag-bone', '/c/rag-and-bone-womens', '/c/rag-bone-jean', '/c/rebecca-minkoff', '/c/rebecca-minkoff-womens-clothing', '/c/rebecca-taylor', '/c/robert-rodriguez-clothing', '/c/womens-sandro', '/c/sandro', '/c/smythe', '/c/tadashi-shoji', '/c/womens-ted-baker-london', '/c/ted-baker-london', '/c/all-ted-baker-london', '/c/ted-baker-london-womens-clothing', '/c/ted-baker-london-womens-shoes', '/c/ted-baker-london-womens-accessories', '/c/the-kooples', '/c/the-kooples-women', '/c/womens-theory', '/c/theory', '/c/theyskens-theory', '/c/tibi', '/c/all-tory-burch', '/c/trina-turk', '/c/truth-and-pride', '/c/veda', '/c/vince', '/c/vince-for-women', '/c/vince-clothing-for-women', '/c/vince-shoes-for-women', '/c/vince-complete-looks', '/c/vince-womens-essentials', '/c/weekend-max-mara', '/c/zadig-and-voltaire', '/c/womens-zadig-voltaire', '/c/zadig-voltaire-womens-clothing'];
		var keywords = brands.join("|").replace(/ /g, '+');

		mmcore.PCs.bridgeWAP = readArrayCookie('bridgeWAP');

		if (checkURLPath(paths) || checkKeywords(keywords) || checkBrands(brands)) { 
			increaseSegmentValue('bridgeWAP', 1);
			getATB('bridgeWAP');
		}

		//getPurchase(categories, 'bridgeWAP');
		getFilters(filters.concat(brands), 'bridgeWAP');
		getLeftNav(brands, 'bridgeWAP');
	}

	// Call the init function after waiting for WCM
	setTimeout(init, 3000);

	// Call the init function after waiting for the DOM
	mmcore.AddDocLoadHandler(function() {
		setTimeout(initAfterLoad, 3500);
	});
	

	return {
		read: readArrayCookie,
		set: setArrayCookie,
		setSegmentScore: setSegmentScore
	};
})();
}catch(err){mmcore.EH(err);}
try{
mmcore.AddDocLoadHandler(function() {
	if ('custAttrs' in mmcore && 'GeoZipCode' in mmcore.custAttrs) {
		if ('PageParameters' in window) {
			$.cookie('GeoLocationZipCode', mmcore.custAttrs.GeoZipCode, { "domain": location.host.indexOf(".dev.") !== -1 ? ".dev.nordstrom.com" : ".nordstrom.com", "path": "/" });
			if (!('shopper' in PageParameters)) {
				PageParameters.shopper = {};
			}
			PageParameters.shopper.geoLocation = { zip: mmcore.custAttrs.GeoZipCode };
		}
		else if ('nord' in window && 'config' in window.nord) {
			setTimeout(function() {
				if (require.defined('nord/feature/util/cookie')) {
					require('nord/feature/util/cookie').save('GeoLocationZipCode', mmcore.custAttrs.GeoZipCode, { "domain": location.host.indexOf(".dev.") !== -1 ? ".dev.nordstrom.com" : ".nordstrom.com", "path": "/" });
					if ('settings' in nord.config && 'shopper' in nord.config.settings) {
						nord.config.settings.shopper.geoLocation = { zip: mmcore.custAttrs.GeoZipCode };
					}
				}
			}, 2000);
		}
	}
});
}catch(err){mmcore.EH(err);}
try{
mmcore.nord.sandbox = (function() {
	var url = window.location.search,
		mmc = mmcore.GetCookie('cfgID');

	if(mmc !== '1' && /sandbox=true/.test(url)) {
		mmcore.SetCookie('cfgID', '1', 0);
		location.reload();
	}
	else if (mmc === '1' && /sandbox=false/.test(url)) {
		mmcore.SetCookie('cfgID', '', 0);
		location.reload();
	}
})();
mmcore.AddDocLoadHandler(function(){
	if(typeof mmcore._vars.cfgid != 'undefined' && mmcore._vars.cfgid == 1){
		var div = document.createElement('div'), html = '<style>#MMSB{border:2px solid gray;top:20px;left:20px;padding:10px;font-size:12px;font-weight:bold;background-color:white;position:fixed;z-index:10000;opacity:0.5;width:100px}#MMSB span{font-size:9px;padding-top:}</style><div id="MMSB">You are in Maxymiser Sandbox mode<br><span>(clear cookies to return to Production mode)</span><br><br>INTERNAL ONLY</div>';
		div.innerHTML = html;
		document.body.appendChild(div);
	}
});
}catch(err){mmcore.EH(err);}
try{
// passes campaign name into ForeSee obj for campaign tracking in ForeSee
// function declared on page load
// called from campaign on campaign load: mmcore.ForeSee('A62ColdWthrBoot1021');
// global
mmcore.VOC = mmcore.voc = mmcore.foresee = mmcore.ForeSee = function(campaignName) {
  var GI = mmcore.GenInfo[campaignName], 
    output=[];

  if (!GI) {
    return mmcore.EH({ message:'mmcore.ForeSee No GenInfo found for campaign: ' + campaignName });
  }

  for (var key in GI) {
    output.push(key+':' +GI[key]);
  }
  var campaignInfo = output.join('|').toLowerCase();

  function sendForeSee() {
    FSR.CPPS.set(campaignName, campaignName + '=' + campaignInfo);
  }

  if ('FSR' in window && 'CPPS' in FSR && typeof FSR.CPPS.set == 'function') {
    sendForeSee();
  } 
  else {
    var waitForFS = setInterval(function() {
      if (typeof FSR !== 'object' || typeof FSR.CPPS !== 'object' || typeof FSR.CPPS.set !== 'function') {
        return;
      }
      clearInterval(waitForFS);
      sendForeSee();
    }, 50);

    setTimeout(function() {
      clearInterval(waitForFS);
      mmcore.EH({ message:'mmcore.ForeSee: no foresee function found' });
    }, 5000);
  }

  // Set to Page Level Data
  if ('PageParameters' in window && 'tto' in PageParameters) {
      PageParameters.tto.VOC = campaignName + '=' + campaignInfo;
  }
  else if ('nord' in window && 'config' in window.nord && 'settings' in nord.config && 'tto' in nord.config.settings) {
      nord.config.settings.tto.VOC = campaignName + '=' + campaignInfo;
  }
  
  $(document).trigger("VOCMxyCampaign", {campaign_name: campaignName + '=' + campaignInfo });
};
}catch(err){mmcore.EH(err);}
try{
mmcore.nord.getProductData = (function() {
	var mmAttribs = [], p;
	this.getWCMproduct = function() {
		p = nord.config.settings.product || '';
		if (p === '') return false;
		if (typeof p.gender != 'undefined' && typeof p.ageGroup != 'undefined') {
			if (p.gender == "Unisex") {
				mmAttribs.push("Unisex");
			}
			else if (p.ageGroup == "Adult") {
				mmAttribs.push((p.gender == "Female") ? "Women": "Men");
			}
			else if (p.ageGroup == "Youth") {
				mmAttribs.push((p.gender == "Female") ? "Girls": "Boys");
			}
			else {
				mmAttribs.push((p.gender == "Female") ? p.ageGroup + " Girls": p.ageGroup + " Boys");
			}
		}
		if (typeof p.productType1 != 'undefined') mmAttribs.push((p.isDesigner) ? "Designer " + p.productType1 : p.productType1);
		if (typeof p.productType2 != 'undefined') mmAttribs.push(p.productType2);
		mmcore.nord.productType = mmAttribs.join('/').replace('-', ' ');
		return mmcore.nord.productType;
	}
	mmcore.nord.utils.mmListen('tto_yes', this.getWCMproduct);
})();
if (typeof cmCreatePageElementTag == 'undefined') cmCreatePageElementTag = function() { return false; };
}catch(err){mmcore.EH(err);}
try{
/******************************************************************************/
// Manages Data for Personalizaion Criteria and MM PC's
// on page load
// global
/******************************************************************************/

mmcore.nord.PCData = (function() {
  var $PC = "PersCriteria";

  var $segments = [
    { name: "bridgeWAP",   qualify: 50, cookie: "bridgeWAP",   pc: 1,    page: "bridgePC",   active: true },
    { name: "encore",      qualify: 30, cookie: "encore",      pc: 2,    page: "encorePC",   active: true },
    { name: "petites",     qualify: 30, cookie: "petites",     pc: 3,    page: "petitesPC",  active: true },
    { name: "designer",    qualify: 30, cookie: "designer",    pc: 4,    page: "designerPC", active: true },
    { name: "mens",        qualify: 50, cookie: "mens",        pc: 5,    page: "mensPC",     active: false },
    { name: "mensUT",      qualify: 30, cookie: "mensUT",      pc: 6,    page: "mensUTPC",   active: true },
    { name: "kidsBTS",     qualify: 30, cookie: "kidsBTS",     pc: 7,    page: "kidsBTSPC",  active: true },
    { name: "baby",        qualify: 30, cookie: "baby",        pc: 8,    page: "babyPC",     active: true },
    { name: "YCW",         qualify: 30, cookie: "YCW",         pc: 9,    page: "ycwPC",      active: true },
    { name: "YCM",         qualify: 30, cookie: "YCM",         pc: 10,   page: "YCMPC",      active: true },
    { name: "juniors",     qualify: 30, cookie: "juniors",     pc: 11,   page: "juniorsPC",  active: true },
    { name: "kids",        qualify: 30, cookie: "kids",        pc: 12,   page: "kidsPC",     active: false }
  ];


  /**************************************************************************/
  // determineSegment
  // calculate the winning segment
  /**************************************************************************/
  function determineSegment(filters) {
    var orderArray = [{segment: "none", score: 0}];

    for (j in filters) {
      for (x in $segments) {
        if (filters[j].name === $segments[x].name) {
          if (filters[j].hasOwnProperty("page")) $segments[x].page = filters[j].page;
          if(mmcore.nord.PC.read($segments[x].cookie) >= $segments[x].qualify) {
            orderArray.push({segment: $segments[x], score: mmcore.nord.PC.read($segments[x].cookie)});
          }
        }
      }
    }

    var winner = orderArray[0];
    var maximum = orderArray[0].score;
    for (i=1;i<orderArray.length;i++) {
      if (orderArray[i].score > maximum) {
        maximum = orderArray[i].score;
        winner = orderArray[i];
      }
    }

    return winner.segment;
  }

  function setPC(filters) {
    var winner = determineSegment(filters);
    mmcore._async = true;
    mmcore.SetPersCriterion($PC, winner.name);
    mmcore.SetPageID(winner.page);
    mmcore.CGRequest();
  }

  /**************************************************************************/
  // getSegments
  // get the segment array
  /**************************************************************************/
  function getSegments(num) {
    return $segments;
  }

  /**************************************************************************/
  // getSegmentByID
  // get the segment  by ID
  /**************************************************************************/
  function getSegmentByID(num) {
    return $segments[num-1];
  }

  return {
    getSegmentByID: getSegmentByID,
    determineSegment: determineSegment,
    setPC: setPC
  };
})();

}catch(err){mmcore.EH(err);}
try{
mmcore.nord.PATB = (function() {
  mmcore.AddDocLoadHandler(function() {
          $(document).on('update.miniBag', function() {
                  mmcore.nord.utils.mmEvent('mmatb');
                  mmcore._async = true;
                  mmcore.SetAction('Add_to_Bag', 1, mmcore.nord.productType || '');
                  mmcore.SetPageID('PATB');
                  mmcore.CGRequest();
          });
  });
})();
}catch(err){mmcore.EH(err);}
try{
var timing_loaded = function() {
	if ('performance' in window && 'timing' in performance && 'loadEventEnd' in performance.timing && performance.timing.loadEventEnd > 0) tto_getTiming();
	else setTimeout(timing_loaded, 100);
};
timing_loaded();

function tto_getTiming() {
	if('PageParameters' in window) {
		$.extend(window.PageParameters.tto, {
			performance: {
				timing: {
					navStartToLoadEventEnd: (performance.timing.loadEventEnd - performance.timing.navigationStart),
					respStartToRespEnd: (performance.timing.responseEnd - performance.timing.responseStart),
					respStartToLoadEventEnd: (performance.timing.loadEventEnd - performance.timing.responseStart),
					respStartToDomLoading: (performance.timing.domLoading - performance.timing.responseStart),
					respStartToDomComplete: (performance.timing.domComplete - performance.timing.responseStart)
				}
			}
		});
		//console.log(PageParameters.tto.performance.timing.respStartToLoadEventEnd);
		mmcore.nord.utils.mmEvent('tto_timing');
	}
	else if('nord' in window && 'config' in window.nord && 'settings' in nord.config && 'tto' in nord.config.settings) {
		$.extend(window.nord.config.settings.tto, {
			performance: {
				timing: {
					navStartToLoadEventEnd: (performance.timing.loadEventEnd - performance.timing.navigationStart),
					respStartToRespEnd: (performance.timing.responseEnd - performance.timing.responseStart),
					respStartToLoadEventEnd: (performance.timing.loadEventEnd - performance.timing.responseStart),
					respStartToDomLoading: (performance.timing.domLoading - performance.timing.responseStart),
					respStartToDomComplete: (performance.timing.domComplete - performance.timing.responseStart)
				}
			}
		});
		//console.log(nord.config.settings.tto.performance.timing.respStartToLoadEventEnd);
		mmcore.nord.utils.mmEvent('tto_timing');
	}
}
}catch(err){mmcore.EH(err);}
try{
// capture global actions
// on page load
mmcore.nord.SiteActions = (function() {
	function fire() {
		mmcore._async = true;
		mmcore.SetPageID('SiteActions');
		mmcore.CGRequest();
	}
	if ('PageParameters' in window) {
		if('shopperId' in PageParameters){
			mmcore.SetVisitorID(PageParameters.shopperId.toUpperCase());
		}
		if ('templateName' in PageParameters && /ProductPage/.test(PageParameters.templateName)) {
			mmcore.SetAction('Product_Views', 1, mmcore.nord.productType);
		}
		fire();
	}
	else if (mmcore.nord.wcm) {
		setTimeout(function() {
			if('shopper' in nord.config.settings && 'id' in nord.config.settings.shopper){
				mmcore.SetVisitorID(nord.config.settings.shopper.id.toUpperCase());
			}
			if ('analytics' in nord.config.settings && nord.config.settings.analytics.pageType === 'Product Page') {
				mmcore.SetAction('Product_Views', 1, mmcore.nord.productType);
			}
			fire();
		}, 2000);
	}
})();
}catch(err){mmcore.EH(err);}
try{
setTimeout(function(){
  if(typeof mm_error != 'undefined' && mmcore.GetCookie('cfgID') == 1 && 'console' in window && !mm_error.match(/^[\r\n]+$/)){
  	console.log('MM: ' + mm_error);
  }
}, 2000);
}catch(err){mmcore.EH(err);}
try{
mmcore.nord.GenInfo = function() {
	mmcore.AddDocLoadHandler(function() {
		var parentProp,
			prop,
			div = document.createElement('div'),
			html = '<style>#nord_geninfo{position:fixed;top:180px;left:20px;width:175px;z-index:10000;border:2px solid black;background-color:white;padding:20px;font-size:12px;}#nord_geninfo h4{margin:0}#nord_geninfo p{margin:10px 0}#nord_geninfo_close{font-size:9px;cursor:pointer;float:right;margin-top:10px;}<\/style><h4>Maxymiser campaign content in this page:<br/><br/><\/h4>';
		for (parentProp in mmcore.GenInfo) {
			html += '<strong>' + parentProp + ':</strong><br/>';
			for (prop in mmcore.GenInfo[parentProp]) {
				html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + prop + ': ' + mmcore.GenInfo[parentProp][prop] + '<br/>';
			}
			html += '<br/>';
		}
		html += '<div id="nord_geninfo_close"><a onclick="(function(){ document.getElementsByTagName(\'body\')[0].removeChild(document.getElementById(\'nord_geninfo\')); return false; })()">close</a></div>';
		div.innerHTML = html;
		div.id = 'nord_geninfo';
		document.body.appendChild(div);
	});
};
}catch(err){mmcore.EH(err);}
if(typeof mmcore._callback=='object'&&typeof mmcore._callback[1]=='function'){try{mmcore._callback[1]();}catch(err){mmcore.EH(err);}
finally{mmcore._callback[1]=null;}}
})();