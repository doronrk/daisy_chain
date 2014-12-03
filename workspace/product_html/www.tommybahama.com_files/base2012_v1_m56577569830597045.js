//Define the Tommy Bahama namespace
var tb = tb || {};
tb.utility = tb.utility || {};  //assorted utilities
tb.enviroment = tb.enviroment || {};
tb.DOM = tb.DOM || {};          //DOM manipulation

//environment boolean
var IERegEx = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})" );
var version;

tb.enviroment.production = window.location.hostname === "www.tommybahama.com";
tb.enviroment.isIE = navigator.appName === 'Microsoft Internet Explorer';

version = function () {
	var agent = IERegEx.exec( navigator.userAgent );
	return agent !== null ? RegExp.$1 : null;
};

tb.enviroment.ieVersion = version !== null ? version : null;

//array filtering for older non ECMA 5.1 browsers
if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun/*, thisArg*/) {
        'use strict';

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];

                // NOTE: Technically this should Object.defineProperty at
                //       the next index, as push can be affected by
                //       properties on Object.prototype and Array.prototype.
                //       But that method's new, and collisions should be
                //       rare, so use the more-compatible alternative.
                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
}

// Array map for older browsers
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

    Array.prototype.map = function(callback, thisArg) {

        var T, A, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        // 1. Let O be the result of calling ToObject passing the |this|
        //    value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal
        //    method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let A be a new array created as if by the expression new Array(len)
        //    where Array is the standard built-in constructor with that name and
        //    len is the value of len.
        A = new Array(len);

        // 7. Let k be 0
        k = 0;

        // 8. Repeat, while k < len
        while (k < len) {

            var kValue, mappedValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal
            //    method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal
                //    method of O with argument Pk.
                kValue = O[k];

                // ii. Let mappedValue be the result of calling the Call internal
                //     method of callback with T as the this value and argument
                //     list containing kValue, k, and O.
                mappedValue = callback.call(T, kValue, k, O);

                // iii. Call the DefineOwnProperty internal method of A with arguments
                // Pk, Property Descriptor
                // { Value: mappedValue,
                //   Writable: true,
                //   Enumerable: true,
                //   Configurable: true },
                // and false.

                // In browsers that support Object.defineProperty, use the following:
                // Object.defineProperty(A, k, {
                //   value: mappedValue,
                //   writable: true,
                //   enumerable: true,
                //   configurable: true
                // });

                // For best browser support, use the following:
                A[k] = mappedValue;
            }
            // d. Increase k by 1.
            k++;
        }

        // 9. return A
        return A;
    };
}

/**
 * tb.console
 *
 * replacement console for development, adds a check to ensure the console is present (IE throw errors when trying
 * to log a message when the console isn't present), and checks that the current enviroment isn't production
 *
 */
tb.utility.logger = function(msg) {
	if (arguments.length > 1) {
		msg = Array.prototype.slice.call(arguments);
	}

	//check that console is available and current eviroment isn't production
	if (typeof console !== "undefined" && !tb.enviroment.production) {
		window.console.log(msg);
	}
};

tb.utility.logger('console initialized');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NAMESPACED FUNCTIONS
// TODO convert non-namespaced functions to namespaced functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * tb.utility.randomCookieIndex
 *
 * @description a random number between min and max is generated if a cookie value isn't found between min and max.
 * If a cookie value is found between the min and max values the number is incremented wrapping as necessary. The
 * newly created, or updated value is then saved to the cookie id passed in.
 *
 * @type {Function}
 *
 * @param {Number} min a minimum value to use
 * @param {Number} max a maximum value to use
 * @param {String} cookieID a name identifier for the cookie
 * @param {Number} cookieTimeout the number of days to keep the cookie, if not present, the cookie defaults
 * to a session cookie
 * @return {Number}
 */
tb.utility.randomCookieIndex = function (min, max, cookieID, cookieTimeout) {
	var index = 0,
		cookieValue = parseInt(tb.utility.readCookie(cookieID), 10);

	/*  check if cookie value is between the min and max value, wrap around if at max,
	 *  otherwise generate a random index between min and max
	 */
	if (cookieValue >= min && cookieValue < max -1) {
		index = ++cookieValue;
	} else if (cookieValue === max) {
		index = min;
	} else {
		index = Math.floor(Math.random() * (max - min + 1)) + min;
	}

	//update cookie value
	tb.utility.createCookie(cookieID, index, cookieTimeout);

	return index;
};

/**
 * tb.utility.createCookie
 *
 * @description creates a cookie with a given name, value, and timeout. If no timeout is given the cookie will default
 * to a session cookie. If the cookie already exists, the value is updated.
 *
 * @type {Function}
 *
 * @param {String} name the cookie name used to identify the cookie
 * @param value a value for the cookie to store
 * @param {Number} days the number of days a cookie should be stored before expiring, if not present the cookie
 * will default to a session cookie
 */
tb.utility.createCookie = window.createCookie  = function (name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "expires="+ date.toGMTString();
	}
	document.cookie = name + "=" + value + "; " + expires + "; path=/";
};

/**
 *  tb.utility.readCookie
 *
 * @description reads and returns a cookie value with given name.
 *
 * @type {Function}
 *
 * @param {String} name the cookie's name to lookup
 * @return the Cookies value, or if the cookie isn't found, null
 */
tb.utility.readCookie = window.readCookie = function (name) {
	var cookies = document.cookie.split(';');
	name += "=";

	//check for the named cookie
	for (var i = 0, l = cookies.length; i < l; i++) {
		var cookie = cookies[i];
		//remove any whitespace at the beginning of the string
		while (cookie.charAt(0)==' ') cookie = cookie.substring(1, cookie.length);

		if (cookie.indexOf(name) === 0) return cookie.substring(name.length, cookie.length);
	}
	//no value found
	return null;
};

/**
 * tb.utility.eraseCookie
 *
 * @description deletes a cookie with a given name
 *
 * @type {Function}
 */
tb.utility.eraseCookie = window.eraseCookie = function (name) {
	tb.utility.createCookie(name,"",-1);
};

/**
 * tb.utility.PSTDate
 *
 * @description constructs a Date object in Pacific Standard Time; Like Date if no parameters are given
 * the current date will be returned in PST, otherwise the given parameters will be used to create the Date
 * object. See https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date for more on
 * the Date object
 *
 * @return {Date} the Date in PST
 * @constructor
 *
 * @example to get the current date in PST time:
 *
 * var currentTime = new tb.utility.PSTDate();
 *
 * all of the methods and properties for a Date object are available:
 *
 * var currentHour = currentTime.getHours();
 *
 * to get a specified time in PST specify a time in the parameters:
 *
 * var startTime = new tb.utility.PSTDate("Nov, 16 2012 23:59");
 *
 * once your date object is set up, comparison is easy, there is no need to compare individual properties:
 *
 * if (currentTime >= startTime) { ... }
 */
tb.utility.PSTDate = function () {
	var TimezoneOffset =  -8,  // PST
		localTime,
		ms,
		args = Array.prototype.slice.call(arguments),
		evlDate,
		xssClean = /[();]/g,
		evlDateCleaned;

	//use the passed in parameters to construct the date object?
	if (args.length) {
		//handle special case of formatted String date
		if(args.length == 1 && typeof args[0] === "string") {
			evlDate = '"' + args[0] + '"';
		} else {
			evlDate = args.join(',');
		}
		evlDateCleaned = evlDate.replace(xssClean, "");
		localTime = eval('new Date('+ evlDateCleaned + ');');

	}
	//no parameters, get the current date in PST time
	else {
		localTime = new Date();
	}
	ms = localTime.getTime() + (localTime.getTimezoneOffset() * 60000) + TimezoneOffset * 3600000;

	return new Date(ms);
};

/**
 * tb.utility.PDTDate
 *
 * @description constructs a Date object in Pacific Daylight Time; Like Date if no parameters are given
 * the current date will be returned in PDT, otherwise the given parameters will be used to create the Date
 * object. See https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date for more on
 * the Date object
 *
 * @return {Date} the Date in PDT
 * @constructor
 *
 */
tb.utility.PDTDate = function () {
	var TimezoneOffset =  -7,  // PDT
		localTime,
		ms,
		args = Array.prototype.slice.call(arguments),
		evlDate,
		xssClean = /[();]/g,
		evlDateCleaned;

	//use the passed in parameters to construct the date object?
	if (args.length) {
		//handle special case of formatted String date
		if(args.length == 1 && typeof args[0] === "string") {
			evlDate = '"' + args[0] + '"';
		} else {
			evlDate = args.join(',');
		}

		evlDateCleaned = evlDate.replace(xssClean, "");
		localTime = eval('new Date('+ evlDateCleaned + ');');

	}
	//no parameters, get the current date in PST time
	else {
		localTime = new Date();
	}
	ms = localTime.getTime() + (localTime.getTimezoneOffset() * 60000) + TimezoneOffset * 3600000;

	return new Date(ms);
};

// instantiate a PST and PDT Date object for maintenance of depreciated legacy methods
var currentPSTTime = new tb.utility.PSTDate(),
	currentPDTTime = new tb.utility.PDTDate();


/**
 * tb.utility.getCurrentPSTYear
 *
 * @description returns the current PST year
 * @returns {Number} the current 4 digit year
 *
 * @depreciated use tb.utility.PSTDate() instead
 */

tb.utility.getCurrentPSTYear = function () {
	return currentPSTTime.getYear();
};

/**
 * tb.utility.getCurrentPSTHour
 *
 * @description returns the current PST hour
 * @returns {Number} the current PST hour
 *
 * @depreciated use tb.utility.PSTDate() instead
 *
 */
tb.utility.getCurrentPSTHour = window.getCurrentPSTHour = function () {
	return currentPSTTime.getHours();
};

/**
 * tb.utility.getCurrentPSTDate
 *
 * @description returns the current PST calendar day
 * @returns {Number} the current PST calendar day
 *
 * @depreciated use tb.utility.PSTDate() instead
 */
tb.utility.getCurrentPSTDate = window.getCurrentPSTDate = function () {
	return currentPSTTime.getDate();
};

/**
 * tb.utility.getCurrentPSTMonth
 *
 * @description returns a numerical index of the current calendar month starting with Jan = 0 to December = 11
 * @returns {Number} current calendar month index starting with 0 (Jan) and ending with 11 (Dec);
 *
 * @depreciated use tb.utility.PSTDate() instead
 */
tb.utility.getCurrentPSTMonth = window.getCurrentPSTMonth = function () {
	return currentPSTTime.getMonth();
};

/**
 * tb.utility.getCurrentPSTDay
 *
 * @description returns the current index of the day of the week with Sunday = 0 and Saturday = 6
 * @returns {Number} current day of the week index starting with 0 (Sun) and ending with 6 (Sat);
 *
 * @depreciated use tb.utility.PSTDate() instead
 */
tb.utility.getCurrentPSTDay = window.getCurrentPSTDay = function () {
	return currentPSTTime.getDay();
};

/**
 * tb.utility.getCurrentPDTYear
 *
 * @description returns the current PDT year
 * @returns {Number} the current 4 digit year in PDT
 *
 * @depreciated use tb.utility.PDTDate() instead
 */

tb.utility.getCurrentPDTYear = function () {
	return currentPDTTime.getYear();
};
/**
 * tb.utility.getCurrentPDTHour
 *
 * @description returns the current PDT hour
 * @returns {Number} the current PDT hour
 *
 * @depreciated use tb.utility.PDTDate() instead
 */
tb.utility.getCurrentPDTHour = window.getCurrentPDTHour = function () {
	return currentPDTTime.getHours();
};

/**
 * tb.utility.getCurrentPDTDate
 *
 * @description returns the current PDT calendar day
 * @returns {Number} the current PDT calendar day
 *
 * @depreciated use tb.utility.PDTDate() instead
 */
tb.utility.getCurrentPDTDate = window.getCurrentPDTDate = function () {
	return currentPDTTime.getDate();
};

/**
 * tb.utility.getCurrentPSDMonth
 *
 * @description returns a numerical index of the current calendar month starting with Jan = 0 to December = 11
 * @returns {Number} current calendar month index starting with 0 (Jan) and ending with 11 (Dec);
 *
 * @depreciated use tb.utility.PDTDate() instead
 *
 */
tb.utility.getCurrentPDTMonth = window.getCurrentPDTMonth = function () {
	return currentPDTTime.getMonth();
};

/**
 * tb.utility.getCurrentPDTDay
 *
 * @description returns the current index of the day of the week with Sunday = 0 and Saturday = 6
 * @returns {Number} current day of the week index starting with 0 (Sun) and ending with 6 (Sat);
 *
 * @depreciated use tb.utility.PDTDate() instead
 */
tb.utility.getCurrentPDTDay = window.getCurrentPDTDay = function () {
	return currentPDTTime.getDay();
};

tb.utility.TimedContent = function() {
	var args = Array.prototype.slice.call(arguments);

	if (!args.length) {
		throw new Error('At least one element of TimedContentElement is expected');
	}

	for (var i = 0, l = args.length; i < l; i++) {
		if( !(args[i] instanceof tb.utility.TimedContentElement) ) {
			throw new Error('Invalid argument was found, expected instance of TimeContentElement');
		}
	}

	this._content = args;
	this._fallbackContent = this._content[0]; //set default fallback content, user can override using TimeConent.setFallbackContent
};

//prototype shortcut
tb.utility.TimedContent.fn = tb.utility.TimedContent.prototype;

//set default fallback content in case the current date is before or beyond the the current dates of the elements
tb.utility.TimedContent.fn.setFallbackContent = function(content) {
	this._fallbackContent = content;
};

//return the first instance of content found that is current for the given date
tb.utility.TimedContent.fn.getCurrentContent = function(currentDate) {
	if ( !(currentDate instanceof Date) ) {
		throw new Error('Unexpected type encountered: expected type should be an instance of Date');
	}

    var currentContent = this._content.filter(function(contentItem) {
        return contentItem.isCurrent(currentDate);
    });

    //return only the content if a single item, otherwise return the whole array of content
    if (currentContent.length) {
        if (currentContent.length == 1) {
            return currentContent[0] instanceof  tb.utility.TimedContentElement ? currentContent[0].content() : currentContent[0]
        } else {
            return currentContent.map(function(element) {
                return element.content();
            });
        }
    }

	//no current content found use fallback content
	if (this._fallbackContent instanceof tb.utility.TimedContentElement) {
		return this._fallbackContent.content();
	} else {
		return this._fallbackContent;
	}
};

(function($, tb){
    tb.utility.TopnavPromo = function() {
        var values = arguments[0];

        var Img = function() { return $('<img/>'); };
        var link = $('<a></a>').attr('href', values.url);

        this.el = $('<div></div>');
        this.el.append($('<div></div>').addClass('topnav-promo'));

        var promo = this.el.find('.topnav-promo');

        link.append(new Img().attr({'src': values.mainImage, 'alt': values.alt}).addClass('desktop'));
        link.append(new Img().attr({'data-src': values.tabletImage, 'alt': values.alt}).addClass('tablet'));
        link.append(new Img().attr({'data-src': values.mobileImage, 'alt': values.alt}).addClass('mobile'));

        promo.html(link);
    };
})(jQuery, tb);

/**
 *
 * @param startDate
 * @param endDate
 * @param content
 * @constructor
 */
tb.utility.TimedContentElement = function (startDate, endDate, content) {
	//make sure input is date object
	if (startDate instanceof Date) {
		this._startDate = startDate;
	} else {
		this._startDate = new Date(startDate);
	}

	if (endDate instanceof Date) {
		this._endDate = endDate;
	} else {
		this._endDate = new Date(endDate);
	}

	this._content   = content;
};

tb.utility.TimedContentElement.fn = tb.utility.TimedContentElement.prototype; //prtotype shortcut

//content getter/setter
tb.utility.TimedContentElement.fn.content = function() {
	if (arguments.length) {
		this._content = arguments[0];
		return undefined;
	} else return this._content;
};

//startdate getter
tb.utility.TimedContentElement.fn.startDate = function() {
	return this._startDate;
};

//enddate getter
tb.utility.TimedContentElement.fn.endDate = function() {
	return this._endDate;
};

//check if the passed in currentDate falls between the start and end dates
tb.utility.TimedContentElement.fn.isCurrent = function(currentDate) {
	if (!(currentDate instanceof Date)) {
		currentDate = new Date(currentDate);
	}
	return (currentDate >= this._startDate && currentDate <= this._endDate);
};


/**
 * tb.utility.isNumeric
 *
 * @description determines in an input is a non-null number
 *
 * @returns {Boolean}
 */
tb.utility.isNumeric = window.isNumeric = function (x) {
	return (x!=null && !isNaN(x));
};

/**
 * tb.utility.trim
 *
 * @description trims any extra spaces from the beginning or end of string
 *
 * @returns {String} a trimmed string
 */
tb.utility.trim = window.trim = function (str) {
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

/**
 *  tb.DOM.removeDashes
 *  @description //TODO add description
 */
tb.DOM.removeDashes = window.removeDashes = function (element2Scrub) {
	var dashedElement = document.getElementsByName(element2Scrub);
        if (dashedElement != null) {
		var noDashes = dashedElement[0].value;
		dashedElement.value = noDashes.replace(/-/g,"");
	}
};

/**
 * tb.DOM.writeURL
 *
 * @description sets the browser url to a non-secure url
 */
tb.DOM.writeURL = window.writeURL = function (strURL) {
	window.location = 'http://' + window.location.host.toString() + strURL;
};

/**
 * tb.DOM.writeURL
 *
 * @description sets the browser url to a secure url
 */
tb.DOM.writeSecureURL = window.writeSecureURL = function (strURL) {
	window.location = 'https://' + window.location.host.toString() + strURL;
};

/**
 * tb.DOM.getQuerystring
 *
 * @description check for the presence of a key value pair in the query string variable
 *
 * @param {String} key a query key to lookup
 * @param [default_] a default value to return in case the key is not found
 *
 * @returns {String} returns the value of the queried key if found, otherwise returns the default value which defaults
 * to nothing if not found.
 */
tb.DOM.getQuerystring = window.getQuerystring = function (key, default_) {
	if (default_==null) {
		default_="";
	}
	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	var qs = regex.exec(window.location.href);
	if(qs == null) {
		return default_;
	} else {
		return qs[1];
	}
};

/**
 * tb.DOM.showFitVideo
 *
 * @description - launches a new window with the selected fit video
 *
 * @param {String} strWhich - the fit code indicating the video series to show
 * @param {Number} the index of the video to watch;
 */
tb.DOM.showFitVideo = window.showFitVideo = function (strWhich, intWhich) {
	var url, height = '402', width = '824';

	switch (strWhich) {
		case 'm':
			url = '/TBG/GeneralContent/Modal/video/denim_men.jsp';
			break;
		case 'w':
			url = '/TBG/GeneralContent/Modal/video/denim_women.jsp';
			break;
		case 'bt':
			url = '/TBG/GeneralContent/Modal/video/denim_bigtall.jsp';
			break;
		default:
			throw new Error('an unknown fit type was encountered');
	}

	tb.DOM.showModal(url + '?v=' + intWhich, height, width);
};

/**
 * tb.DOM.showCCV
 *
 * @description calls for a modal with instruction on card code verification number
 */
tb.DOM.showCCV = window.showCCV = function () {
	tb.DOM.showModal('/TBG/GeneralContent/Modal/CVV.jsp','450','560');
};

/**
 * tb.DOm.shippingRestrictions
 *
 * @description call a modal listing any relevant shipping restrictions
 */
tb.DOM.shippingRestrictions = window.shippingRestrictions = function (strType) {
	tb.DOM.showModal('/TBG/GeneralContent/Modal/Shipping_Restrictions.jsp?rest='+strType,'250','500');
};

/**
 * tb.DOM.shippingRestrictionError
 *
 * @description show the shipping restriction model - not sure how this is different from tb.DOM.shippingRestrictions?
 */
tb.DOM.shippingRestrictionError = window.shippingRestrictionError = function (strType) {
	tb.DOM.showModal('/TBG/GeneralContent/Modal/Shipping_Restrictions.jsp?rest='+strType,'250','500');
};

/**
 * tb.DOM.showSizeChart
 *
 * @description calls forth a new window conceived in liberty and dedicated to the proposition that all clothes should fit
 *
 * @param {String} strWhich a size code to parse
 * @param {String} [strURL] an option paramater - currently ignored
 *
 */
tb.DOM.showSizeChart = window.showSizeChart = function (strWhich, strURL) {
	// for now, we're ignoring strURL and hardcoding a different one below, to avoid prematurely overwriting the old one:
	var strURLPrefix = "/TBG/GeneralContent/Modal/Size_Chart",
		strURLSuffix = "/Men.jsp", // default if none of the cases below are applicable
		w = 820,
		h = 600,
		topOffset = (screen.height - h) / 2,
		leftOffset = (screen.width - w) / 2,
		settings='width=' + w + ',height=' + h + ',top=' + topOffset + ',left=' + leftOffset + ',scrollbars=1,status=0,location=0',
		popupname='sizeChart';

	switch (strWhich) {
		case 'TBM':
			strURLSuffix = '/Men.jsp';
			break;
        case 'TBMS':
            strURLSuffix = '/Men_New.jsp';
            break;
		case 'TBK':
			strURLSuffix = '/Men.jsp';
			break;
        case 'TBMP':
            strURLSuffix = '/Men_Pants.jsp';
            break;
        case 'TBMT':
            strURLSuffix = '/Men_Tailored_Shirts.jsp';
            break;
        case 'TBMI':
			strURLSuffix = '/Men_International.jsp';
			break;
		case 'IMF':
			strURLSuffix = '/Men_Island_Modern.jsp';
			break;
		case 'TBMCS':
			strURLSuffix = '/Men_Camp_Shirts.jsp';
			break;
		case 'BT':
			strURLSuffix = '/Men_Big_and_Tall.jsp';
			break;
		case 'TBMF':
			strURLSuffix = '/Men_Footwear.jsp';
			break;
		case 'TW':
			strURLSuffix = '/Women.jsp';
			break;
		case 'TBWI':
			strURLSuffix = '/Women_International.jsp';
			break;
		case 'TSW':
			strURLSuffix = '/Women_Swimwear.jsp';
			break;
		case 'TBWF':
			strURLSuffix = '/Women_Footwear.jsp';
			break;
		default:
			strURLSuffix = '/Men.jsp';
	}
	window.open(strURLPrefix + strURLSuffix, popupname , settings);
};

/**
 * tb.DOM.intlOrderDeadlinePopup
 *
 * @description calls forth a new window displaying the holiday 2012 Order Deadline Chart
 *
 * TODO: PLEASE DELETE AFTER DEC 6, 2012
 */
tb.DOM.intlOrderDeadlinePopup = function () {
	var url = "/TBG/GeneralContent/Modal/Holiday_2012_Intl_Order_Deadlines.jsp",
		w = 600,
		h = 500,
		topOffset = (screen.height - h) / 2,
		leftOffset = (screen.width - w) / 2,
		settings = 'width=' + w + ',height=' + h + ',top=' + topOffset + ',left=' + leftOffset + ',scrollbars=1,status=0,location=0',
		popupname= "Holiday_2012_Deadlines";

		window.open(url, popupname , settings);
};

/* SMOOTH BOX MODALS ***********************************************/
/**
 * tb.DOM.showModal
 *
 * @description calls for a modal with a particular url handling any special cases
 *
 * @param {String} url the url of the modal page to display
 * @param {Number} height the height of the modal window to display
 * @param {Number} width the width of the modal window to display
 */
tb.DOM.showModal = window.showModal = function (url, height, width) {
	if ((url.indexOf('/TBG/GeneralContent/Shipping_and_Returns.jsp') > -1)) {
		location.href='/TBG/GeneralContent/Shipping_and_Returns.jsp';
    } else if (url.indexOf('/TBG/GeneralContent/Modal/tgc_tac.jsp') > -1) {
        TB_show('',url+'?TB_iframe=true&height='+height+'&width=575',false);
	} else if (url.indexOf('/TBG/GeneralContent/Shipping.jsp') > -1) {
		location.href='/TBG/GeneralContent/Shipping_and_Returns.jsp';
	} else if (url.indexOf('/store/catalog/product_detail_modal.jsp') > -1) {
		TB_show('',url+'?TB_iframe=true&height=525&width=888',false);			
	} else if (url.indexOf('/TBG/GeneralContent/Modal/SalesTax_TBD') > -1) {
		TB_show('',url+'?TB_iframe=true&height=400&width=600',false);	
//	} else if (url.indexOf('pages.exacttarget.com') > -1){
//		TB_show('',url+'&TB_iframe=true&height='+height+'&width='+width,false);
	} else if (url.indexOf('/TBG/GeneralContent/Modal/quicklink_shipping.jsp') > -1) {
		// show inventory modal from 20140910 9:00:00 to 20140912 10:00:00:
		var blnShowInventory = false;
		
		if ((getCurrentPSTMonth()==8) && (getCurrentPSTDate() > 9) && (getCurrentPSTDate() < 13)) {
			if ((getCurrentPSTDate()==10) && (getCurrentPSTHour() > 8)) {
				blnShowInventory = true;
			} else if ((getCurrentPSTDate()==12) && (getCurrentPSTHour() < 11)) {
				blnShowInventory = true;
			} else if (getCurrentPSTDate()==11) {
                blnShowInventory = true;
            }
		}
		if (blnShowInventory==true) {
			TB_show('','/TBG/GeneralContent/Modal/Shipping_Inventory.jsp?TB_iframe=true&height=445&width=700',false);
		} else {
			TB_show('',url+'?TB_iframe=true&height=550&width=840',false);
		}
	} else if (url.indexOf('/store/global/context_chooser.jsp') > -1) {
		TB_show('',url+'?TB_iframe=true&height=500&width=826',false);
	} else {
		if (url.indexOf('?') > -1) {
			TB_show('',url+'&TB_iframe=true&height='+height+'&width='+width,false);
		} else {
			TB_show('',url+'?TB_iframe=true&height='+height+'&width='+width,false);
		}
	}
};

/**
 * tb.DOM.showPromo
 *
 * @description calls a modal with the current promo url
 */
tb.DOM.showPromo = window.showPromo = function () {
	tb.DOM.showModal('/TBG/GeneralContent/Modal/Free_Shipping.jsp','445','700');
};

/**
 * tb.DOM.showPromoModal
 *
 * @description call a modal feature the promo modal for a given code
 *
 * @param {String} code the promo code to show.
 */
tb.DOM.showPromoModal = window.showPromoModal = function (code) {
	//showModal('/TBG/GeneralContent/Modal/SwimPromo.jsp','375','650');
	//showDenimPromo();
	if (code.indexOf('FlipSide50GWP') > -1) {
		tb.DOM.showModal('/TBG/GeneralContent/Modal/promo_flipside.jsp','500','700');
	} else if (code=='MensSockPromo7282011') {
		tb.DOM.showModal('/TBG/GeneralContent/modal/sock_promo.jsp','318','645');
	} else if (code.indexOf('FriendsandFamily') > -1) {
		tb.DOM.showModal('/TBG/GeneralContent/modal/FriendsFamily.jsp','300','700');
	} else if (code.indexOf('MothersDay2013GWP') > -1) {
		tb.DOM.showModal('/TBG/GeneralContent/modal/promo_mothersday.jsp','300','700');
	} else if (code.indexOf('FathersDay2013GWP') > -1) {
		tb.DOM.showModal('/TBG/GeneralContent/modal/promo_fathersday.jsp','300','700');
	} else if (code.indexOf('FD2013Flipside50GWPon') > -1) {
		tb.DOM.showModal('/TBG/GeneralContent/modal/promo_flipside_canada.jsp','360','700');
	} else if (code.indexOf('BottomsUpPromo2013') > -1) {
		tb.DOM.showModal('/TBG/GeneralContent/modal/pant_promo_freeship.jsp','500','700');
	} else if (code.indexOf('HolidayFlipSide50GWP') > -1) {
		tb.DOM.showModal('/TBG/GeneralContent/modal/promo_flipside.jsp','500','700');
    } else if (code.indexOf('GWPMensHoliday2013') > -1) {
        tb.DOM.showModal('/TBG/GeneralContent/modal/promo_gwp_for_him.jsp','300','700');
    } else if (code.indexOf('GWPWomensHoliday2013') > -1) {
        tb.DOM.showModal('/TBG/GeneralContent/modal/promo_gwp_for_her.jsp','300','700');
	} else if ((code.indexOf('HalfOffBiminiFlipFlopwPurchaseorWosSwim') > -1) || (code.indexOf('GSHalfOffBiminiFlipFlopwSwim') > -1)) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/promo_pwp_swim.jsp','500','700');
    } else if ((code.indexOf('HalfOffTShirtwPurchaseofSSWoven') > -1) || (code.indexOf('GSHalfOffTShirtwWoven') > -1)) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/promo_pwp_shirt.jsp','500','700');
    } else if (code.indexOf('HalfOffBiminiPromoNewCode') > -1) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/promo_pwp_swim2.jsp','500','700');
    } else if (code.indexOf('FreeToteW150Purchase') > -1) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/promo_gwp_md_2014.jsp','500','700');
    } else if (code.indexOf('MDayFragranceGWP2014') > -1) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/promo_gwp_fragrance.jsp','500','700');
    } else if (code.indexOf('FreeToteW200Purchase') > -1) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/promo_gwp_200_tote.jsp','500','700');
    } else if (code.indexOf('FlipsideFD2014') > -1) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/Free_Shipping.jsp','500','700');
    }  else if (code.indexOf('FDGWP2014') > -1) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/promo_gwp_fragrance.jsp','500','700');
    }  else if (code.indexOf('SwimPromo201425OffAllSwim') > -1) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/flipside.jsp','500','700');
    }  else if (code.indexOf('FAIRMONT25Off') > -1) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/promo_fairmont.jsp','500','700');
    }  else if (code.indexOf('ShortsPromo2014') > -1) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/shorts_promo.jsp','500','700');
    } else if (code=='NRD2014Spend75andreceiveGWP') {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/Free_Shipping.jsp','500','700');
    } else if (code=='PantsPromo2014') {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/Pant_Promo.jsp','500','700');
    } else if (code.indexOf('Holiday2014MensGWP') > -1) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/promo_gwp_for_him.jsp','500','700');
    } else if (code.indexOf('Holiday2014WomensGWP') > -1) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/promo_gwp_for_her.jsp','500','700');
    } else if ((code.indexOf('FlipsideHoliday2014GWP') > -1) || (code.indexOf('FlipsideHolidayII2014GWP') > -1)) {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/flipside.jsp','500','700');
    } else if(code=='CyberMondayGWP2014') {
        tb.DOM.showModal('/TBG/GeneralContent/Modal/promo_gwp_cocktailbook.jsp','500','700');
    } else {
		tb.DOM.showModal('/TBG/GeneralContent/Modal/glass.jsp','230','425');
	}
};

/**
 * tb.DOM.showFlipSideModal
 *
 * @description call the flipside promo modal
 */
tb.DOM.showFlipSideModal = window.showFlipSideModal = function () {
	tb.DOM.showModal('/TBG/GeneralContent/Modal/promo_flipside.jsp','500','700');
};

/**
 * tb.DOM.socs
 *
 * @description calls the sock promo modal, link is displayed on all socks PDPs for American surfers
 */
tb.DOM.socks = window.socks = function () {
	tb.DOM.showModal('/TBG/GeneralContent/Modal/sock_promo.jsp','318','645');
};

/**
 * tb.DOM.PDPBanner
 *
 * @description displays the PDPBanner if various set conditions are met
 */
tb.DOM.PDPBanner = window.PDPBanner = function () {
    var defaultContent =
        '<style type="text/css">' +
            '#divPromoContainer { display: none; }' +
            '</style>';


    // NRD promos
    var pantsPromo =  new tb.utility.TimedContentElement(
        new tb.utility.PSTDate("Sept 11, 2014"),
        new tb.utility.PSTDate("Oct 5, 2014"),
        '<style type="text/css">' +
            '#divPromoContainer { display: block; position: relative; left: 7px;}' +
            '</style>' +
            '<a href="javascript:showModal(\'/TBG/GeneralContent/Modal/pant_promo.jsp\',\'500\',\'700\')"><img src="/media/TB001/images/static/global/nav/20140911_promo_banner.png" alt="Pants Promo" /></a>'
    );

    /***** CA *****/
    var pantsPromoCA =  new tb.utility.TimedContentElement(
        new tb.utility.PSTDate("Sept 11, 2014"),
        new tb.utility.PSTDate("Oct 5, 2014"),
        '<style type="text/css">' +
            '#divPromoContainer { display: block; position: relative; left: 7px;}' +
            '</style>' +
            '<a href="javascript:showModal(\'/TBG/GeneralContent/Modal/pant_promo.jsp\',\'500\',\'700\')"><img src="/media/TB001/images/static/global/nav/20140911_promo_banner.png" alt="Pants Promo" /></a>'
    );

    var usPDPBannerTimedContent = new tb.utility.TimedContent(pantsPromo);
    var caPDPBannerTimedContent = new tb.utility.TimedContent(pantsPromoCA);

    var currentDate = new tb.utility.PSTDate();

    var currentContent = defaultContent;
    var bannerContent, caBannerContent;

    usPDPBannerTimedContent.setFallbackContent(defaultContent);
    caPDPBannerTimedContent.setFallbackContent(defaultContent);

    bannerContent = usPDPBannerTimedContent.getCurrentContent(currentDate);
    caBannerContent = caPDPBannerTimedContent.getCurrentContent(currentDate);

    if (strSelectedCountryCode == 'US'  && bannerContent !== null) {
        currentContent = bannerContent;
    } else if ( strSelectedCountryCode == 'CA'  && caBannerContent !== null ) {
        currentContent = caBannerContent;
    }

    var newKnitStyles = [
        "PRD_T29652", "PRD_T20856", "PRD_TD29080", "PRD_T29174", "PRD_T29987", "PRD_TD29625", "PRD_TR210949",
        "PRD_TD2753", "PRD_TD29703", "PRD_T210954", "PRD_T27643", "PRD_T210955", "PRD_TR28380", "PRD_TR29057",
		"PRD_TD29238", "PRD_TR28379", "PRD_TR28952", "PRD_TR28948", "PRD_TR28307", "PRD_TR210939", "PRD_TR29140",
		"PRD_TR29141", "PRD_TR29853", "PRD_TR29136", "PRD_TR29131", "PRD_TR21966", "PRD_T211294",
        "PRD_T28915", "PRD_T28883", "PRD_T210705", "PRD_T29725", "PRD_T29899", "PRD_T29867", "PRD_T29898",
        "PRD_TD29323", "PRD_TD29271", "PRD_TD29433", "PRD_T29693", "PRD_TR28642", "PRD_TR29496"
    ];

    var newWovenStyles = [
        "PRD_T310030", "PRD_T310033", "PRD_T310046", "PRD_T310503", "PRD_T310670", "PRD_T310775", "PRD_T36974",
        "PRD_T39351", "PRD_T39355", "PRD_T39356", "PRD_T39378", "PRD_T39391", "PRD_T39405", "PRD_T39411", "PRD_T39434",
        "PRD_T39441", "PRD_T39446", "PRD_T39475", "PRD_T39506", "PRD_T39550", "PRD_T39736", "PRD_T39739",
        "PRD_T39740", "PRD_TD310634", "PRD_TD38623", "PRD_TD38624", "PRD_TD39170", "PRD_TD39289", "PRD_TD39655",
		"PRD_TD310634", "PRD_TD39040", "PRD_TD39042", "PRD_TR310623", "PRD_TR39542", "PRD_T38620", "PRD_T38622",
		"PRD_T39397", "PRD_T39461", "PRD_T39470", "PRD_T39517", "PRD_T39521", "PRD_T39522", "PRD_T310036", 
		"PRD_T310038", "PRD_T310039", "PRD_T310040", "PRD_T39394", "PRD_T39409", "PRD_T39424", "PRD_T39425",
		"PRD_T39426", "PRD_T39427", "PRD_T39428", "PRD_T39528", "PRD_T39533", "PRD_T39535", "PRD_T39543", "PRD_T39649",
		"PRD_T39681", "PRD_T39698", "PRD_T39699", "PRD_T39754", "PRD_TD39044", "PRD_TD39111", "PRD_TD39146",
		"PRD_TD39190", "PRD_TD39312", "PRD_TD39532", "PRD_TR38413", "PRD_TR38416", "PRD_TR39586",
		"PRD_TR39602", "PRD_TR39829"
    ];

    var url = window.location.pathname;
    var productCodeStartIndex = url.indexOf("PRD_");
    var productCodeEndIndex = url.indexOf("/", productCodeStartIndex);
    var productCode = url.slice(productCodeStartIndex, productCodeEndIndex);

    if (newKnitStyles.indexOf(productCode) !== -1) {
        currentContent =
            '<style type="text/css">' +
                '#divPromoContainer { display: block; position: relative; left: 7px;}' +
            '</style>' +
            '<a href="javascript:showSizeChart(\'TBMS\',\'http://ecap03/TBG/GeneralContent/SizingChart.jsp\')">' +
                '<img src="/media/TB001/images/static/banners/pdp_banner_knits_20141016.png"/>' +
            '</a>';
    }

    if (newWovenStyles.indexOf(productCode) !== -1) {
        currentContent =
            '<style type="text/css">' +
                '#divPromoContainer { display: block; position: relative; left: 7px;}' +
            '</style>' +
            '<a href="javascript:showSizeChart(\'TBMS\',\'http://ecap03/TBG/GeneralContent/SizingChart.jsp\')">' +
                '<img src="/media/TB001/images/static/banners/pdp_banner_wovens_20141016.png"/>' +
            '</a>';
    }

    var gwpStart = new tb.utility.PSTDate("Nov 20, 2014 10:00");
    var gwpEnd = new tb.utility.PSTDate("Dec 25, 2014");
    //GWP Men's - 198728, 199002, TH31325
    var mensGWPProducts = ['PRD_198728', 'PRD_199002', 'PRD_TH31325'];
    if (mensGWPProducts.indexOf(productCode) !== -1 && strSelectedCountryCode == "US"
        && currentDate > gwpStart && currentDate < gwpEnd) {
        currentContent =
            '<style type="text/css">' +
                '#divPromoContainer { display: block; position: relative; left: 7px;}' +
            '</style>' +
            '<a href="javascript:showModal(\'/TBG/GeneralContent/Modal/promo_gwp_for_him.jsp\',\'500\',\'700\')">' +
                '<img src="/media/TB001/images/static/banners/pdp_banner_mens_gwp_20141120.png"/>' +
            '</a>';
    }

    document.write(currentContent);
};

tb.DOM.PDPBannerWomensSwim = window.PDPBannerWomensSwim = function () {
    var defaultContent =
        '<style type="text/css">' +
            '#divPromoContainer { display: none; }' +
            '</style>';
    var promoEndDate = new tb.utility.PSTDate("April 7, 2014");
    //Swim Women's PWP  4/2 – 11:59pm on 4/6, all PST. Valid for U.S. and Canada
    var swimWomensPWPApril = new tb.utility.TimedContentElement(
        new tb.utility.PSTDate("April 2, 2014"),
        promoEndDate,
        '<style type="text/css">' +
            '#divPromoContainer { display: block; position: relative; left: 7px;}' +
            '</style>' +
            '<a href="javascript:showModal(\'/TBG/GeneralContent/Modal/promo_pwp_swim2.jsp\',\'500\',\'700\')"><img src="/media/TB001/images/static/global/nav/20140402_promo_banner.png" alt="Flip for These, 50% off Classic Bimini Flip Flops with any women\'s swimwear purchase" /></a>'

    );

    var usCaPDPBannerTimedContent = new tb.utility.TimedContent(
        swimWomensPWPApril
    );

    var currentDate = new tb.utility.PSTDate();

    var currentContent = defaultContent;
    var bannerContent, caBannerContent;

    usCaPDPBannerTimedContent.setFallbackContent(defaultContent);

    bannerContent = usCaPDPBannerTimedContent.getCurrentContent(currentDate);

    if (currentDate > promoEndDate) {
        tb.DOM.PDPBanner();
    } else {
        if ((strSelectedCountryCode == 'US' || strSelectedCountryCode == 'CA') && bannerContent !== null) {
            currentContent = bannerContent;
        }

        document.write(currentContent);
    }
};

tb.DOM.PDPBannerSSShirts = window.PDPBannerSSShirts = function () {
    var defaultContent =
        '<style type="text/css">' +
            '#divPromoContainer { display: none; }' +
            '</style>';

    var promoEndDate = new tb.utility.PSTDate("April 13, 2014");

    //Swim Women's PWP  4/2 – 11:59pm on 4/6, all PST. Valid for U.S. and Canada
    var menShirtsPWPApril = new tb.utility.TimedContentElement(
        new tb.utility.PSTDate("April 6, 2014"),
        promoEndDate,
        '<style type="text/css">' +
            '#divPromoContainer { display: block; position: relative; left: 7px;}' +
        '</style>' +
        '<a href="javascript:showModal(\'/TBG/GeneralContent/Modal/promo_pwp_ss_shirts.jsp\',\'500\',\'700\')">' +
            '<img src="/media/TB001/images/static/global/nav/20140406_promo_banner.png" alt="" />' +
        '</a>'
    );

    var usCaPDPBannerTimedContent = new tb.utility.TimedContent(
        menShirtsPWPApril
    );

    var currentDate = new tb.utility.PSTDate();

    var currentContent = defaultContent;
    var bannerContent, caBannerContent;

    usCaPDPBannerTimedContent.setFallbackContent(defaultContent);

    bannerContent = usCaPDPBannerTimedContent.getCurrentContent(currentDate);

    if (currentDate > promoEndDate) {
        tb.DOM.PDPBanner();
    } else {
        if ((strSelectedCountryCode == 'US' || strSelectedCountryCode == 'CA') && bannerContent !== null) {
            currentContent = bannerContent;
        }
        document.write(currentContent);
    }
};

/**
 * tb.DOM.popup
 *
 * @param url the url to call
 * @param name the name of the popup window
 * @param settings popup window settings
 *
 * @returns the popup with focus
 */
tb.DOM.popup = function (url, name, settings) {
    var popup = window.open(url, name, settings);
    popup.focus();
    return popup;
};

/**
 * tb.DOM.emailSignup
 *
 * @description sets up and call the email signup popup page
 *
 * @param [email]
 */
tb.DOM.emailSignup = window.emailSignup = function ( email ) {
    var url = '/store/global/email_register.jsp',
        width = 800,
        height = 446,
        xssClean = /[<>();\/\\]/g;

    if (email !== undefined && email !== null) {
        email = email.replace(xssClean, "");
    }

    //prevent default values
    if ( email !== undefined && email != null && email !== "Enter Email Address" && email !== "" ) {
        url += '?' + 'email=' + email;
    }

    tb.DOM.showModal(url, height, width);
};

/**
 * tb.DOM.imageRollOver
 *
 * @description swaps images for rollover functions of <input/> tags
 */
tb.DOM.imageRollOver = window.imageRollOver = function (image_replacement, elementID) {
	try {
		var imagetag = document.getElementById(elementID);
		imagetag.src = image_replacement;
	} catch(e) {
		// relax	
	}
};


/************* Quicklink Modals ************************************/
/**
 * tb.DOM.quickLink
 *
 * @description sets up an <a> tag with a showModal javascript call and the appropriate url, or, in certain cases, calls a modal directly
 *
 * @param {String} strWhich a code designating the modal to call
 * NOTE: removed blnWrite from parameter list instead setting the value inside of the function, allowing a user to pass
 * this value rather than setting it based on the passed in code could result in a situation in which a code was passed
 * in that needed a tag to be returned, but
 */
/********* NOTE waiting to update the quickLink until after holidays so that adequate testing can be done *************/
/*
tb.DOM.quickLink = window.quickLink = function (strWhich) {
	var blnWrite,
		strReturnHTML = '',
		strReturnURL = '';

	switch(strWhich) {
		//  These return modal links:
		case 'returns':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_returns.jsp','220','680')";
			strReturnHTML = 'Free, Easy Returns';
			blnWrite = true;
			break;
		case 'shipping':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_shipping.jsp','460','800')";
			strReturnHTML = 'Shipping Options &amp; Rates';
			blnWrite = true;
			break;
		case 'international':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_shipping.jsp?show=Intl','460','880')";
			strReturnHTML = 'International Shipping';
			blnWrite = true;
			break;
		case 'canada':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_shipping.jsp?show=Canada','460','800')";
			strReturnHTML = 'Shipping to Canada';
			blnWrite = true;
			break;
		case 'gifts':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_gifts.jsp','340','680')";
			strReturnHTML = 'Sending a Gift';
			blnWrite = true;
			break;
			
		//  These just spawn modals immediately (nothing returned):
		case 'taxes':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_taxes.jsp','400','520')";
			blnWrite = false;
			break;
		case 'duty':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_duty.jsp','200','520')";
			blnWrite = false;
			break;
		default:
			throw new Error('an unexpected tag was encountered');
	}
	if (blnWrite) {
		return '<a href="javascript:' + strReturnURL + '">' + strReturnHTML + '</a>';
	} else {
		eval(strReturnURL);
	}
};
*/
/*reinstaing old code until after holidays to leave adequate time for testing, see above note for proposed change and
 * the reasons for the change */
function quickLink(strWhich,blnWrite) {
	strReturnHTML = '';
	strReturnURL = '';
	switch(strWhich) {
		//  These return modal links:
		case 'returns':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_returns.jsp','220','680')";
			strReturnHTML = 'Free, Easy Returns';
			break;
		case 'shipping':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_shipping.jsp','490','800')";
			strReturnHTML = 'Shipping Options &amp; Rates';
			break;
		case 'international':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_shipping.jsp?show=Intl','490','880')";
			strReturnHTML = 'International Shipping';
			break;
		case 'canada':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_shipping.jsp?show=Canada','490','800')";
			strReturnHTML = 'Shipping to Canada';
			break;
		case 'gifts':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_gifts.jsp','360','680')";
			strReturnHTML = 'Sending a Gift';
			break;

		//  These just spawn modals immediately (nothing returned):
		case 'taxes':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_taxes.jsp','400','520')";
			break;
		case 'duty':
			strReturnURL = "showModal('/TBG/GeneralContent/Modal/quicklink_duty.jsp','200','520')";
			break;
	}
	if (blnWrite == true) {
		var strReturn = '<a href="javascript:' + strReturnURL + '">' + strReturnHTML + '</a>';
		return strReturn;
	} else {
		eval(strReturnURL);
	}
}


//Remove non-alphanumeric characters from address fields in "my account"
window.addEvent('domready', function () {
	try{
		if($$('.changebilladdress')[0] || $$('.addbilladdress')[0]){
			
			$$('input').addEvent('keydown', function(event){
				if(this.getAttribute('type') == 'text'){
					if(event.shift){
						if((event.code == 55) || (event.code == 188) || (event.code == 190) || (event.code == 222)){
							event.stop();
						}
					}
					else{
						if((event.code == 191) || (event.code == 220)){
							event.stop();
						}
					}
				}
			});
		}
	}
	catch(e){}



    //////////////////////////////////////////////////////////////////////////////
    //
    // Friends and Family 2014
    //
    try {
        var blnShowFF = false;

        if (getQuerystring('cm_mmc').indexOf('ExactTarget') > -1) {
            //arrival via email; supress modal
            document.cookie = 'ffNoModal_Session=true';
        }


        if ((readCookie('E4X_COUNTRY')==null)||(readCookie('E4X_COUNTRY')=='US')||(readCookie('E4X_COUNTRY')=='CA')) {
            blnShowFF = true;
        }

    } catch(e) {
        //alert(e.toString());
    }
    //
    ///////////////////////////////////////////////////////////////////////////////

	
});


/*****************************************************
*  mediaForge - this boolean determines whether or not to write the global mediaForge "basic tag" to the page.
*	the "basic tag" should not be written on Product Detail or Confirmation pages; it's set to false for those pages
* 	via /templates/store/catalog/product_detail_redesign/main_content.jsp and 
*	/templates/store/checkout/order_confirm/inc_confirm_thirdparty_tags.jsp, respectively.  The global "basic tag"
*	is printed via /templates/store/global/post.jsp when blnMF_Global==true.
*/
	var blnMF_Global = true;
/*
*
******************************************************/

/**
******************************************************/


/**
 * tb.DOM.lastCall
 *
 * @description a sort of catch all for hack and fixes to be implemented at the end of a page load.
 *
 * NOTE: this is a great function for clean up and refactoring, more internal documentation could be provided!
 */
tb.DOM.lastCall = window.lastCall = function () {
	
	try {
		if (showInternational) {
			document.write('<style type="text/css">.fiftyone {display:block}</style>');
		} else {
			document.write('<style type="text/css">.fiftyone {display:none}</style>');	
		}
	} catch(e) {
		//do nothing--modals and checkout pages don't have showInternational defined.
	}

	try {
		if (isInternational) {
			document.write('<style type="text/css">.domestic {display:none !important;}</style>');
		}
	} catch(e) {
		//do nothing--modals and checkout pages don't have showInternational defined.
	}

	
	//On the Gift Cards Listing page, show a range of prices, instead of $25:
	if ((window.location.toString().indexOf('GiftCards_M.jsp') > -1) || (window.location.toString().indexOf('Gift_Cards.jsp') > -1) || (window.location.toString().indexOf('Traditional_Gift_Card.jsp') > -1)) {
		$$(".cat_product_desc").each(
			function(target){
				target.innerHTML = target.innerHTML.replace('$25','$25-$1000');
			}
		);
	}


	var elJimi = $$('.leftNav')[0];
	if (elJimi) {
//		try {
			if (window.location.toString().indexOf('/TBG/GeneralContent/mockups/') > -1) {
				// don't do anything for mockups
			} else {
				
				var arrImages = elJimi.getElementsByTagName('img');
				
				var objImageDiv = elJimi.getElementsByTagName('div')[0];				
				
				/////////////////////////////////////////////////////////////////////
				//
				//  Highlight "Shop" links
				
				var objULOne = elJimi.getElementsByTagName('ul')[0];
				var arrTopLevelUL = elJimi.getElementsByTagName('ul');  //objULOne.getElementsByTagName('ul');
                var arrLowerLevelUL = arrTopLevelUL[0].getElementsByTagName('ul');
				var arrTopLevelLI;
				var objTopLevelAnchor;
				var arrAnchorText;

                arrTopLevelLI = arrLowerLevelUL[0].getElementsByTagName('li');
                for (x=0;x<arrTopLevelLI.length;x++) {

                    if ((arrTopLevelLI[x].className=='leftnav_dotted') || ((arrTopLevelLI[x].id=='leftnav_sub') || (arrTopLevelLI[x].id=='leftnav_sub_on'))) {
                        if (trim(arrTopLevelLI[x].innerHTML.toString().toLowerCase()).indexOf('top 25 gifts') > -1) {
                            var arrSubs = arrTopLevelLI[x].getElementsByTagName('a');
                            for (n=0;n<arrSubs.length;n++) {
                                //ddebug(arrSubs[n].innerHTML.toLowerCase());
                                if (arrSubs[n].innerHTML.toLowerCase().indexOf('top 25 gifts') > -1) {
                                    arrSubs[n].href += '?showAll=1';
                                }
                            }

                        }
                    } else {
                        objTopLevelAnchor = arrTopLevelLI[x].getElementsByTagName('a')[0];
                        arrAnchorText = trim(objTopLevelAnchor.innerHTML).split(" ");
                        if (arrAnchorText[0]=='Visit') {
                            objTopLevelAnchor.style.fontWeight = 'bold';
                        }
                        if (arrAnchorText[0].indexOf('Valentine') > -1) {
                            objTopLevelAnchor.style.color = '#cc3333';
                        }
                        if (trim(objTopLevelAnchor.innerHTML.toString()).indexOf('Jeans Event') > -1) {
                            objTopLevelAnchor.style.textTransform = 'uppercase';
                            objTopLevelAnchor.style.color = '#cc3333';
                            objTopLevelAnchor.style.fontWeight = 'bold';
                        }
                        if (trim(objTopLevelAnchor.innerHTML.toString()).indexOf('Holiday Gift') > -1) {
                            objTopLevelAnchor.style.color = '#990000';
                            objTopLevelAnchor.style.fontWeight = 'bold';
                        }
                        if ((objTopLevelAnchor.innerHTML.indexOf('The Icon Collection') > -1) && (arrTopLevelLI[x].id!='leftnav_on')) {
                            arrTopLevelLI[x].style.background = 'url("/media/TB001/images/static/Leftnav_Icons/fish_icon.gif") no-repeat';
                            arrTopLevelLI[x].style.left = '-20px';
                            arrTopLevelLI[x].style.textIndent = '20px';
                            arrTopLevelLI[x].style.position = 'relative';
                        }
                    }
                }

				//
				//
				/////////////////////////////////////////////////////////////////////
			}
			
//		} catch(e) {
            //console.log(e.toString());
//		}
	}

	
	if ((window.location.toString().indexOf('/store/myaccount/returns_confirm_print.jsp') > -1) || (window.location.toString().indexOf('/store/checkout/order_confirm_print.jsp') > -1)) {
		document.write('<style type="text/css">');
		document.write('.main_logo {background: url("/media/TB001/images/static/tommy_logo_print.gif") no-repeat;width:328px;height:54px;}');
		document.write('</style>');
	}
	
	var objContactEmailConfirm = document.getElementById('contact-email-confirm');
	if (objContactEmailConfirm!=null) {
		objContactEmailConfirm.autocomplete = 'off';
	}
	var objCreditCardNumber = document.getElementById('credit-card-number');
	if (objCreditCardNumber!=null) {
		objCreditCardNumber.autocomplete = 'off';
	}
	
	// kill mm7.net pixel - 03/17/2011.  Stopgap until we get it removed from the template.
	try {
		var arrImages = document.getElementsByTagName('img');
		if (arrImages[(arrImages.length - 1)].src.indexOf('mm7.net') > -1) {
			arrImages[(arrImages.length - 1)].style.display = 'none';
		}
	} catch (e) {
		// do nothing
	}




	// shopping bag updates
	if ((window.location.toString().indexOf('/store/checkout/cart.jsp') > -1) || (window.location.toString().indexOf('/store/checkout/address_details.jsp') > -1)) {
		// sometimes the cart can be shown when the URL is "address_details.jsp"

		try { 
			if (objShoppingTable) {
				var arrShoppingTableRows = objShoppingTable.getElementsByTagName('tr');
				var objShoppingTableTD = arrShoppingTableRows[0].getElementsByTagName('td')[0];
				var strInnerHTML = '';
				// start at the fifth row because that's the first possible row the PGC can appear in
				for (i=3;i<arrShoppingTableRows.length;i++) {
					objShoppingTableTD = arrShoppingTableRows[i].getElementsByTagName('td')[0];
					if (objShoppingTableTD) {
						if (objShoppingTableTD.innerHTML.indexOf('/PRD_PGC') > -1) {
							strInnerHTML = objShoppingTableTD.getElementsByTagName('a')[0].innerHTML; // grab what's inside the anchor
							objShoppingTableTD.innerHTML = strInnerHTML; // restore the anchor's contents (sans anchor--unlinked)
						}
					}
					objShoppingTableTD = arrShoppingTableRows[i].getElementsByTagName('td')[1];
					if (objShoppingTableTD) {
						if (objShoppingTableTD.innerHTML.indexOf('FREE GIFT') > -1) {
							strInnerHTML = objShoppingTableTD.innerHTML.replace('<font color="red">FREE GIFT</font>','[<a href="javascript:showModal(\'/TBG/GeneralContent/Modal/ShoePromo2010.jsp\',\'430\',\'740\');">FREE GIFT</a>]'); // replace "FREE GIFT" text with [FREE GIFT] link
							objShoppingTableTD.innerHTML = strInnerHTML; // restore the cell's contents
						}
						if (objShoppingTableTD.innerHTML.indexOf('Click here for free gift wrapping!') > -1) {
							strInnerHTML = objShoppingTableTD.innerHTML.replace('Gift Box','');
							strInnerHTML = strInnerHTML.replace('<br>GB0001<br>','');
							strInnerHTML = strInnerHTML.replace('<font color="red">Click here for free gift wrapping!</font>','<font color="red">You qualify for FREE Gift Services!<br />Click here to wrap your gifts.</font>');
							
							var objQuantitySelect;
							var objRemoveLink;
							objShoppingTableTD = arrShoppingTableRows[i].getElementsByTagName('td')[2];
							objShoppingTableTD.innertHTML = '';
							objShoppingTableTD = arrShoppingTableRows[i].getElementsByTagName('td')[3];
							objShoppingTableTD.innertHTML = '';
							objShoppingTableTD = arrShoppingTableRows[i].getElementsByTagName('td')[4];
							objShoppingTableTD.innertHTML = '';
							objShoppingTableTD = arrShoppingTableRows[i].getElementsByTagName('td')[5];
							objQuantitySelect = objShoppingTableTD.getElementsByTagName('select')[0];
							objQuantitySelect.style.display = 'none';
							objRemoveLink = objShoppingTableTD.getElementsByTagName('a')[0];
							objRemoveLink.style.display = 'none';
							
						}
					}
				}
			}
		} catch(e) {
			//alert('[' + i + '] ' + e.toString());
		}

		
	}

	if ((window.location.toString().indexOf('/store/checkout/order_review.jsp') > -1) || (window.location.toString().indexOf('/store/checkout/order_confirm') > -1)) {
		var objShoppingTable = $$('.shoppingbag_table')[0];
		try { 
			if (objShoppingTable) {
				var arrShoppingTableRows = objShoppingTable.getElementsByTagName('tr');
				var objShoppingTableTD = arrShoppingTableRows[0].getElementsByTagName('td')[0];
				var strInnerHTML = '';
				var objShoppingPromoAnchor;
				// start at the fifth row because that's the first possible row the PGC can appear in
				for (i=3;i<arrShoppingTableRows.length;i++) {
					objShoppingTableTD = arrShoppingTableRows[i].getElementsByTagName('td')[0];
					if (objShoppingTableTD) {
						if (objShoppingTableTD.innerHTML.indexOf('/PRD_PGC') > -1) {
							strInnerHTML = objShoppingTableTD.getElementsByTagName('a')[0].innerHTML; // grab what's inside the anchor
							objShoppingTableTD.innerHTML = strInnerHTML; // restore the anchor's contents (sans anchor--unlinked)
						}
					}
					objShoppingTableTD = arrShoppingTableRows[i].getElementsByTagName('td')[1];
					if (objShoppingTableTD) {
						if (objShoppingTableTD.innerHTML.indexOf('/PRD_PGC') > -1) {
							objShoppingPromoAnchor = objShoppingTableTD.getElementsByTagName('a')[0];
							strInnerHTML = objShoppingTableTD.getElementsByTagName('a')[0].innerHTML; // grab what's inside the anchor
							objShoppingTableTD.removeChild(objShoppingPromoAnchor);
							objShoppingTableTD.innerHTML = strInnerHTML + objShoppingTableTD.innerHTML; // restore the anchor's contents (sans anchor--unlinked)
							//objShoppingTableTD.innerHTML += '<font color="red">FREE GIFT</font>','[<a href="javascript:showModal(\'/TBG/GeneralContent/Modal/ShoePromo2010.jsp\',\'430\',\'740\');">FREE GIFT</a>]'; // restore "FREE GIFT", with link
						}
						if (objShoppingTableTD.innerHTML.indexOf('FREE GIFT') > -1) {
							strInnerHTML = objShoppingTableTD.innerHTML.replace('<font color="red">FREE GIFT</font>','[<a href="javascript:showModal(\'/TBG/GeneralContent/Modal/ShoePromo2010.jsp\',\'430\',\'740\');">FREE GIFT</a>]'); // replace "FREE GIFT" text with [FREE GIFT] link
							objShoppingTableTD.innerHTML = strInnerHTML; // restore the cell's contents
						}
					}
				}
			}
				
		} catch(e) {
			//alert('[' + i + '] ' + e.toString());
		}

	}

	if (((window.location.toString().indexOf('/store/checkout/order_review.jsp') > -1) || (window.location.toString().indexOf('/store/account/order_detail.jsp') > -1)) && (navigator.userAgent.toLowerCase().indexOf('msie') > -1)) {
		try {
			// fix for IE--otherwise the footer doesn't adjust its vertical position accordingly...
			var objFooter = $('divFooter');
			objFooter.style.display = 'none';
			//document.write('<style type="text/css">#divFooter {top:71px;}</style>')
		} catch (e) {
			// do nothing
		}
	}

	if (window.location.toString().indexOf('/TBG/GeneralContent/ContactUs.jsp') > -1) {
		var objContactForm = $$('.accountForm')[0];
		var objContactFormText = objContactForm.getElementsByTagName('div')[0];
		objContactFormText.style.width = '680px';
		var objMainContent = $$('.main_content')[0];
	}
		
	if (window.location.toString().indexOf('Like_Father_Like_Son.jsp') > -1) {
		var arrProductDesc = $$('.product_desc');
		var objAnchor;
		for (i=0;i<arrProductDesc.length;i++) {
			objAnchor = arrProductDesc[i].getElementsByTagName('a')[0];
			if (objAnchor.innerHTML.indexOf('Boys') > -1) {
				//do nothing
			} else {
				objAnchor.innerHTML = 'Men\'s ' + objAnchor.innerHTML;
			}
		}
	}
	
	try {

		/*if (navigator.appVersion.toString().indexOf('AppleWebKit') > -1) {
			document.write('<style type="text/css">.grid, #divCatListMainTopHTML, .restaurant_wrapper, .cat_grid {top:-4px;left:-11px;} #divCategoryListingItems {left:-14px;} .grid_footer_30 {left:-7px;} #cat_list_table {left:25px;} #divBeachBanner {left:26px;position:relative;} </style>');
		} */
		if ($('divBreadcrumbNav')==null) {
			document.write('<style type="text/css">.main_content {padding-top:18px;}</style>');
		}
	} catch(e) {
		// do nothing
	}
	
	try {
		if ($('main_content').getElement('form.edit_personal_information')) {
			var arrStrong = document.getElementsByTagName('strong');
			for (i=0;i<arrStrong.length;i++) {
				if (arrStrong[i].innerHTML == 'Password:') {
					arrStrong[i].innerHTML = 'New Password:';
				}
			}
		}
	} catch (e) {
		//alert(e.toString());
	}
};

/**
 * tb.DOM.printpage
 *
 * @description prints a page
 *
 * TODO address issue:  WebBrowser1 is never defined, is WebBrowser1 supposed to refer to WebBrowser?
 */
tb.DOM.printpage = window.printpage = function (){
	if (window.print) {
		window.print() ;  
	} else {
		var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
	document.body.insertAdjacentHTML('beforeEnd', WebBrowser);
		WebBrowser1.ExecWB(6, 2);//Use a 1 vs. a 2 for a prompting dialog box    
		WebBrowser1.outerHTML = "";  
	}
};

/* PDP */
var isRefererPlp = false,
	colorFromPlp = "";

/**
 * tb.DOM.getParameterByName
 *
 * @description extracts a query string value from the given name
 *
 * @param {String} name the lookup key to search for
 *
 * @return a URI decoded value if one is found
 */
tb.DOM.getParameterByName = window.getParameterByName = function (name){
    //format name
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

	//search for name in query results
	var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);

	if(results == null) //name not found
        return "";
    else
		//return decoded results
        return decodeURIComponent(results[1].replace(/\+/g, " "));
};

tb.DOM.validateEmail = function(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
}

tb.DOM.validateSelect = function(value) {
    return value !== '';
}

tb.DOM.validateTextField = function (text) {
    return text !== '';
}

tb.DOM.validateNameField = function (text) {
    var reg = /^[A-Za-z\-\'\s]+$/;
    return text !== '' && reg.test(text);
}

tb.DOM.validate2DigitNumber = function(value) {
    var reg = /\d{2}/;
    return reg.test(value) && value.length == 2;
}

tb.DOM.validate4DigitNumber = function(value) {
    var reg = /\d{4}/;
    return reg.test(value) && value.length == 4;
}

tb.DOM.CQSwapContent = function(destinationSelector, sourceSelector, index) {
    var $ = jQuery;
    var $el = $(destinationSelector);
    var $source = $(sourceSelector);

    $el.html($source.eq(index).html());
}

colorFromPlp = tb.DOM.getParameterByName("selectedPlpColor");

if(colorFromPlp != ""){
	isRefererPlp = true;
}

/* global page setup */
(function($) {
    $(document).ready(function() {
        // sanitize form data submitted to search */
        var form = $('form');
        var xssClean = /[<>();\/\\]/g;

        form.each(function() {
            var $this = $(this);
            var inputs = $this.find('input[type="text"]');
            $this.submit(function() {
                inputs.each(function() {
                    $(this).val($(this).val().replace(xssClean, ""));
                });
                return true;
            });
        });

        //Email Signup
        $('.emailSignupLink').each(function() {
            $(this).on('click', function() { tb.DOM.emailSignup() });
        });

        /**************************************************************/
        /* TOP NAV HOVER                                              */
        /**************************************************************/
        var clearMouseEvent = null, hoverReference = null;

        var topNavLi = $('.topNavLI');
        var initialColor = null;
        var hoverColor = '#666';
        var activeColor = '#B6483B';

        topNavLi.hover( function () {
            var link = $(this).find(".topNavA");
            hoverReference = this;
            initialColor = link.css("color");
            link.css( "color", hoverColor );
            clearMouseEvent = setTimeout( function () {
                menuTimer()
            }, 300);
            setCurrentTabBackGround();
        }, function () {
            clearTimeout( clearMouseEvent );
            $( this ).find( ".topNavA" ).css( "color", initialColor );
            $( this ).find( ".wrapper" ).fadeOut( 0 );
            initialColor = null;
            setCurrentTabBackGround();
        });

        //set current tab onload if directed to index page
        setCurrentTabBackGround();

        function menuTimer() {
            $( hoverReference ).find( ".wrapper" ).fadeIn( 400 );
        }

        window.menuTimer = menuTimer;

        //menu tab highlighting
        function setCurrentTabBackGround() {
            var strSelectedNavLink = '', strNavPath = 'plain_', strURL = window.location.toString(),
                URLCheck = {
                    'TBG/Men'               : 'topNavLIMen',
                    'TBG/Big_and_Tall'      : 'topNavLIBandT',
                    'TBG/Women'             : 'topNavLIWomen',
                    'TBG/Swim_Womens'       : 'topNavLISwim',
                    'TBG/Home'              : 'topNavLIHome',
                    'TBG/Stores_Restaurants': 'topNavLIStores',
                    'TBG/live-the-life'     : 'topNavLILive'
                };

            for ( var key in URLCheck ) {
                if ( strURL.indexOf( key ) > -1 ) {
                    strSelectedNavLink = URLCheck[key];
                }
            }
            // highlight current nav
            if ( strSelectedNavLink != '' ) {
                try {
                    $( '#' + strSelectedNavLink +' > a' ).css( 'color', activeColor );
                } catch ( e ) {
                }
            }
        }

        /**************************************************************/
        /* SEARCH FORM HANDLERS                                       */
        /**************************************************************/
        var searchForm = $( '#frmSearch' ),
            searchTextInput = searchForm.find( '#q' ),
            searchButton = searchForm.find( '.nav_search_btn' ),
            requestURL = $( 'input[name="redirectTemplate"]' ).val(),
            isTabInput = false;

        searchForm.submit( function () {
            //check if tab key was pressed for IE
            if ( !isTabInput ) {
                return true;
            } else {
                isTabInput = false;
            }
        } );

        searchTextInput.on({
            focus: function () {
                this.value = '';
                $(this).parents('div#navSearch').addClass('expanded');
            }, blur: function () {
                if ( this.value === '' ) {
                    this.value = 'Search';
                }
                $(this).parents('div#navSearch').removeClass('expanded');
            }, keydown: function ( e ) {
                switch ( e.which ) {
                    case 13:
                        e.preventDefault();
                        submitSearchResults();
                        break;
                    case  9:
                        isTabInput = true;
                        break;
                }
            }
        });

        searchButton.on('click', function ( e ) {
            e.preventDefault();
            submitSearchResults();
        });

        function submitSearchResults() {
            var submitBtn = $( '#refine_search' ), searchString = searchTextInput.val();

            //fix for the home page form submit bug
            var homepageFormActionFix = searchForm.attr( 'action' ).replace( '/store/index.jsp', '' );

            searchForm.attr( 'action', homepageFormActionFix );

            if ( searchString === '' || searchString === 'Search' ) {
                alert( 'Please enter a keyword or style number to begin your search' );
                searchTextInput.triggerHandler( "focus" );
            } else {
                //trigger form submission
                searchButton.off('click');
                submitBtn.click();
            }
        }

        //quickview
        var quickview = $('#quickview');
        $('.quickcart').click(function(e) {
            e.preventDefault();
            quickview.show();
        })
    })
})(jQuery);

