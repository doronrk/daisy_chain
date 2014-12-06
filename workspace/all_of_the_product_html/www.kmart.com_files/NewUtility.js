/*
	Author: OBU UX CORE FED
	NOTE: This file will never contain application-specific code
		Do NOT make changes without discussion with OBU UX CORE FED, reach out to Tim.Ryan@searshc.com or Scott.Sullivan@searshc.com
*/

//obsolete - still a couple packed jquery UI files calling this
$.fn.bgIframe = $.fn.bgiframe = $.noop;

//Ensure that we have a console object to avoid IE issues
window.console = (window.console || {log: $.noop, error: $.noop, warn: $.noop, trace: $.noop});

/* Date.now not supported in IE7/8 */
Date.now = Date.now || function() { return +new Date(); };

/*
 String Extensions
   This is the preferred way to do string manipulation, rather than global functions.
   They all check for existence first so that in case a specific browser has implemented the function in the JS engine,
   these versions will be ignored, as it's assumed that the browser version will be more efficient.
*/
if (!String.prototype.replaceAll) {
	/**
 * @member String
	 * Replace all instances of one string within another string.

	//Example
	' foobar'.replaceAll('o', '-');		// returns "f--bar"
	'fo o b a r'.replaceAll(' ', '');	// returns "foobar"

	 * @param {String} find the string to find.
	 * @param {String} replace the string to replace with.
 * @return {String} the modified string.
	 */
	String.prototype.replaceAll = function(find, replace) {
	    return this.split(find).join(replace);
	};
}

if (!String.prototype.trim) {
	/**
 * @member String
	 * Return string with leading and trailing spaces removed.

	//Example
' foobar'.trim();	// returns 'foobar'
'foobar '.trim();	// returns 'foobar'
' foobar '.trim();	// returns 'foobar'
'foo bar'.trim();	// returns 'foo bar'
 * @return {String} the trimmed string.
	 */
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	};
}

if (!String.prototype.ltrim) {
	/**
 * @member String
	 * Return string with leading spaces removed.

	//Example
' foobar'.ltrim();	// returns 'foobar'
' foobar '.ltrim();	// returns 'foobar '
'foo bar'.ltrim();	// returns 'foo bar'
 * @return {String} the trimmed string.
	 */
	String.prototype.ltrim = function() {
		return this.replace(/^\s+/, '');
	};
}

if (!String.prototype.rtrim) {
	/**
 * @member String
	 * Return string with trailing spaces removed.

	//Example
'foobar '.rtrim();	// returns 'foobar'
' foobar '.rtrim();	// returns ' foobar'
'foobar'.rtrim();	// returns 'foobar'
 * @return {String} the trimmed string.
	 */
	String.prototype.rtrim = function() {
		return this.replace(/\s+$/, '');
	};
}

if (!String.prototype.mtrim) {
	/**
 * @member String
	 * Return string with all multiple (two or more) spaces reduced to single spaces.

	//Example
'foo bar'.mtrim();				// returns 'foo bar'
'foo     bar'.mtrim();			// returns 'foo bar'
'foo  bar  baz'.mtrim();		// returns 'foobarbaz'
'foobar'.mtrim();				// returns 'foobar'
 * @return {String} the trimmed string.
	 */
	String.prototype.mtrim = function() {
		return this.replace(/\s{2,}/g, ' ');
	};
}

if (!String.prototype.startsWith) {
	/**
 * @member String
	 * Determine whether the string starts with a passed string.

	//Example
'foobar'.startsWith('foo')  //true
'foobar'.startsWith('abc')	//false
 * @param {String} string the substring to check.
 * @return {Boolean} true if this string starts with the passed string.
	 */
	String.prototype.startsWith = function(s) {
		return this.match('^' + s) == s;  //array[0] casts to string
	};
}

if (!String.prototype.endsWith) {
	/**
 * @member String
	 * Determine whether the string ends with a passed string.

	//Example
'foobar'.endsWith('bar') //true
'foobar'.endsWith('abc') //false
 * @param {String} string the substring to check.
 * @return {Boolean} true if this string ends with the passed string.
	 */
	String.prototype.endsWith = function(s) {
		return this.match(s + '$') == s;	//array[0] casts to string
	};
}

/**
 * @static
 * @member String
 * Format a string by replacing an arbitrary number of tokens with passed values.
 * The tokens must be unique and must increment in the format {0}, {1}, etc.

	//Example
	var s = String.format('The {0} red {1} jumped over', 'lazy', 'fox');
	// s now contains the string: 'The lazy red fox jumped over'
 * @param {String} string the string to be formatted
 * @param {String} value1 value to replace token {0}
 * @param {String} value2 value to replace token {1}, etc..
 * @return {String} the formatted string
 */
String.format = function(format){
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
};

/* End String Extensions */

/* String manipulation backwards compatibility
   These definitions will replace any existing function definitions that are to be removed elsewhere in the codebase.
   They are simple aliases to the above functions which will always be expected to have the optimum implementation.
   Ideally, calls to these functions should all be replaced with calls to the functions declared above.  Once all calls to
   these are removed from all application code, these can go away in order to limit code bloat and global namespace pollution.
*/

/**
 * @member Global
 * Replace all instances of one string within another string.
 * @deprecated Use the generic {@link String#replaceAll} method
 * @param {String} s the string to search within.
 * @param {String} find the string to find.
 * @param {String} replace the string to replace with.
 * @return the modified string.
 */
function replaceAll(s, find, replace) {
	return s.replaceAll(find, replace);
}

/**
 * @member Global
 * Return string with leading and trailing spaces removed.  Normally you should just call {@link String#trim}, but if there's a
 * chance that the string could be null, this function will handle it.
 * @param {String} s the string to be trimmed.
 * @return {String} the trimmed string.
 */
function trim(s) {
	return typeof s !== 'undefined' && s !== null ? s.trim() : '';
}

/**
 * @member Global
 * Return string with leading spaces removed.   Normally you should just call {@link String#ltrim}, but if there's a
 * chance that the string could be null, this function will handle it.
 * @param {String} s the string to be trimmed.
 * @return the trimmed string.
 */
function ltrim(s) {
	return typeof s !== 'undefined' && s !== null ? s.ltrim() : '';
}
/**
 * @member Global
 * Return string with trailing spaces removed.  Normally you should just call {@link String#rtrim}, but if there's a
 * chance that the string could be null, this function will handle it.
 * @param {String} s the string to be trimmed.
 * @return the trimmed string.
 */
function rtrim(s) {
	return typeof s !== 'undefined' && s !== null ? s.rtrim() : '';
}

/* Function Extensions */

/**
 * @member Function
 * Create a delegate (function) that sets the scope to a requested object.
 * Can be called directly on any function.<br />
 * Creates a function that is scoped so that the <b>this</b> var inside the function is what is passed via <i>scope</i>.<br />
 * Similar to $.proxy (although parameter handling may not be quite the same).

	//Example
doSomething.createDelegate(this, ['foo', 'bar']);
...
doSomething();
...
function doSomething() {
	// arguments =['foo', 'bar'] here
}
// OR
doSomething.createDelegate(this, ['foo', 'bar'], true);
...
doSomething(false, 'hello');
...
function doSomething() {
	// arguments = [false, 'hello', 'foo', 'bar'] here
}

 * @param {Object} [scope=window] object for which the scope is set.
 * @param {Array} [args=args passed by caller] override arguments for the call.
 * @param {Boolean|Number} [append=false] true to append to caller args instead of overriding, or
 * a if a number, the args are inserted at the specified position.
 * @return {Function} The new function
 *
*/
Function.prototype.createDelegate = function(scope, args, append) {
    var me = this;
    return function() {
        var callArgs = args || arguments;
        if (append === true) {
            callArgs = Array.prototype.slice.call(arguments, 0);
            callArgs = callArgs.concat(args);
        } else if (typeof append === 'number') {
            callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
            var applyArgs = [append, 0].concat(args); // create method call params
            Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
        }
        return me.apply(scope || window, callArgs);
    };
};
/* End Function Extensions */


/**
 * Namespace for all FED utility functions.
 * @singleton
 */
var FED = {};

FED.events = {
	//at a minimum, data should be {pid:xxxx, qty:x, title: xxxxx}
	'fed.addtocart': function(e, data) {
		// add item to Session.cart
		console.log('atc: pid=' + (data.pid || ''));
		buildMiniCart(data, 'add');
	},
	//at a minimum, data should be {pid:xxxx, qty:x}
	'fed.deletefromcart': function(e, data) {
		// remove item from Session.cart
		console.log('dtc: pid=' + (data.pid || ''));
		buildMiniCart(data, 'del');
	},
	'fed.emptycart': function(e, data) {
		console.log('minicart emptied');
		buildMiniCart(data, 'empty');
	},
	//at a minimum, data should be {pid:xxxx}
	'fed.quickview': function(e, data) {
		console.log('quickview triggered');
	}
};

//subscribe to events
$('body').on({
	'fed.addtocart': FED.events['fed.addtocart'],
	'fed.deletefromcart': FED.events['fed.deletefromcart'],
	'fed.emptycart': FED.events['fed.emptycart'],
	'fed.quickview': FED.events['fed.quickview']
});

function buildMiniCart(data, action) {
	var cart = Session.get('cart') || {};

	if (!cart.items) {
		cart.items = [];
	}

	switch (action) {
		case 'add':
			cart.items.push(data);
			break;
		case 'del':
			var items = cart.items, i, len;

			for (i=0, len=items.length; i<len; i++) {
				if (items[i].pid === data.pid && items[i].qty === data.qty) {
					items.splice(i, i+1);
					break;
				}
			}
			break;
		case 'empty':
			cart.items = [];
			break;
	}

	Session.set('cart', cart);

}

/**
 * Template strings for use with other functions e.g. FED.Util.layer()
 * @singleton
*/
FED.Template = {
	/**
	 * @property {String}
	 * HTML template for a simple layer element.
	 */
		layer: '<div id="{0}" class="{1}"><span class="shcTip shcTipTopLeft"><span></span></span><span class="layer"></span><span>{2}</span></div>',
	/**
	 * @property {String}
	 * HTML template for a closeable layer element.
	 */
	layerClose: '<div id="{0}" class="{1}">' +
		'<span class="shcTip shcTipTopLeft"><span></span></span>' +
		'<div class="closeWrp"><span class="shcLayerCloseSpan">CLOSE</span><span class="shcLayerCloseXSpan">X</span></div>' +
		'<div class="layer">{2}</div></div>',
	/**
	 * @property {String}
	 * HTML template for a simple tooltip element.
	 */
		toolTip: '<div id="{0}" class="{1}"><span class="shcTip shcTipTopLeft"><span></span></span><span>{2}</span></div>',
	/**
	 * @property {String}
	 * HTML template for a zipcode layer element.
	 */
	zipCode: '<div id="{0}" class="{1}">' +
		'<div class="closeWrp"><span class="shcLayerCloseSpan">CLOSE</span><span class="shcLayerCloseXSpan">X</span></div>' +
		'<div class="zipCont" style="clear:both">' +
			'<strong>Enter ZIP Code </strong><span>Required</span>' +
						'<input id="zipinput" class="shcForm shcForm_Text shcZip" type="text" maxlength="5" name="new" />' +
			'<a class="zipContBtn" href="#"><img src="<PATH>img/go.png" /></a>' + '<p>Price and availability may vary by location.</p>' +
		'</div></div>'
};

/**
 * FED Utility functions
 * @singleton
 */
FED.Util = function() {
	var reNumber = /^\d+$/,
		reFloatNumber = /^([+-]?(((\d+(\.)?)|(\d*\.\d+))))$/,
		reEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
		reEmailUser = /^(root@|abuse@|spam@)/i,
		reZipcode = /^\d{5}$|^\d{5}-?\d{4}$/;

/**
 * @private
 * Test the user agent string
 * @param {String} s regex string to match
 * @param {Number} [len=99999] optional number of characters at start of string to match against
 * @returns {Boolean} true if the string is matches the user agent, else false
 */
	var uaTest = function(s, len) {
        return len === undefined ? s.test(ua) : s.test(ua.substr(0,len));
    };
	var ua = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase(),
        isOpera = uaTest(/opera/),
        isChrome = uaTest(/chrome/),
        isWebKit = uaTest(/webkit/),
        isSafari = !isChrome && uaTest(/safari/),
        isIE = !isOpera && (uaTest(/msie/) || uaTest(/trident.*rv/)),
        isIE7 = isIE && uaTest(/msie 7/),
        isIE8 = isIE && uaTest(/msie 8/),
        isIE9 = isIE && uaTest(/msie 9/),
		isIE10 = isIE && uaTest(/msie 10/),
		isIE11 = isIE && uaTest(/trident.*rv[ :]?11\./),
        isIE6 = isIE && !isIE7 && !isIE8 && !isIE9 && !isIE10 && !isIE11,
        isGecko = !isWebKit && uaTest(/gecko/),
        isGecko3 = isGecko && uaTest(/rv:1\.9/),	//FF3x
        isWindows = uaTest(/windows|win32/),
        isMac = uaTest(/macintosh|mac os x/),
		//mobile detect regex from http://detectmobilebrowsers.com (as of 9/9/13) plus 'ipad'
		isMobile = uaTest(/(ipad|android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i) ||
			uaTest(/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i, 4),
		stores = {
			'10151': 'kmart',
			'10153': 'sears',
			'10154': 'kenmore',
			'10155': 'craftsman',
			'10156': 'tgi',
			'10175': 'mygofer',
			'10153_12604': 'kenmore',
			'10153_12602': 'craftsman',
			'10165_26151': 'searspr'
		};

	/*
	 * @private
	 * Add CSS classes to the body tag to allow browser-specific CSS without sniffing
	 */
    var addBodyCls = function() {
        var cls = [
		isIE ? 'ie ' +
			(isIE6 ? 'ie6' :
			(isIE7 ? 'ie7' :
			(isIE8 ? 'ie8' :
			(isIE9 ? 'ie9' : 
			(isIE10 ? 'ie10' : 
			(isIE11 ? 'ie11' : '')))))) :
			isGecko ? ('gecko' + (isGecko3 ? ' gecko3' : '')) :
			isOpera ? 'opera' :
			isWebKit ? 'webkit' : ''];
		
        if (isSafari) {
            cls.push('safari');
		} else if (isChrome) {
            cls.push('chrome');
        }

        if (isMac) {
            cls.push('mac');
        }
		if (isMobile) {
			cls.push('mobile');
		}

		//don't trust storeId/catalogId to be a string - force it
		var s = '' + (typeof getStoreId === 'function' ? getStoreId() : (typeof storeId !== 'undefined' ? storeId : '')),
			c = '' + (typeof getCatalogId === 'function' ? getCatalogId() : (typeof catalogId !== 'undefined' ? catalogId : ''));

		if (!!s) {
			//check for storeId/catalogId combo first b/c kenmore/craftsman are initially reporting sears storeId on some pages
			if (stores[s + '_' + c]) {
				cls.push(stores[s + '_' + c]);
			} else if (stores[s]) {
				cls.push(stores[s]);
			}
		}

		//cookie check should probably be enough for all cases now
		if (trim($.cookie('ot')).indexOf('stores-') >=0 || (typeof isKiosk !== 'undefined' && (isKiosk === 'true' || isKiosk == true))) {
			shc.isKiosk = true;
			cls.push('kiosk');
		}

		//Force this call to clear the cache for this selector to avoid the possibility that code outside of an onReady
		//gets called before this when the body isn't ready and caches an empty selector.
		$.q('body', true).addClass(cls.join(' '));
        return true;
    };

	//wire any init functionality
	$(function() {
		addBodyCls();
		//all other global onReady code
		FED.onReady();
	});

	return {
		/**
		 * Add a CSS file LINK tag to a document.

			//Example
			FED.Util.addCssFile('/bar');
			FED.Util.addCssFile('//nav.shld.net/bar');
			FED.Util.addCssFile('http://nav.shld.net/bar');
			FED.Util.addCssFile('https://nav.shld.net/bar/foo.css');
			FED.Util.addCssFile('/foo', {media:'print'});
			
		 * @param {String} url the file to be added.  The '.css' extension is not required. In case of relative url path, url either should start with "/" or "//"
		 * @param {Object} options (optional) additional options to be applied
		 * @param {String} [options.media="screen"] media attribute to add to the LINK tag
		 */
		addCssFile: function(url, options) {
			options = $.extend({}, {
				media: 'screen'
			}, options);

			if (!!url) {
				if ($.q('body').hasClass('ie8') && !url.startsWith(location.protocol)) {
					url = location.protocol + "//" + location.host + url;
				}

				//assuming no querystring parms at end to break this
                url += trim(url).toLowerCase().endsWith('.css') ? '' : '.css';
				
				$('head').append(String.format('<link rel="stylesheet" type="text/css" media="{1}" href="{0}" />', url, options.media));
			}
		},

		/**
		 * Add a JS file via script tag to a document.

//Simple load
FED.Util.addJsFile('bar.js');

//This allows you to do post call processing
FED.Util.addJsFile('foo.js')
	.done(function() {//success handling})
	.fail({function() {//error handling})
	.always(function() {//completion handling, regardless of result});

		 * @param {String} url the file to be added
		 * @param {Boolean} [cache=true] By default file, will be cached. Passing false will add cache-buster parm, like $.getScript
		 * @return {Object} the jQuery XHR object which will allow access to the jquery Promise interface.
		 */
		addJsFile: function(url, cache) {
			if (!!url) {
				//assuming no querystring parms at end to break this
				url += trim(url).toLowerCase().endsWith('.js') ? '' : '.js';
				//load the file with caching enabled by default
				return $.ajax({
					url: url,
					dataType: 'script',
					//Need to force this so that jquery adds a script tag as opposed to making an xhr request.
					//This happens in most cases by virtue of the fact that the url is sears.com, but the request is to shld.net,
					//however in qa, for example the url and the request go to same domain, which triggers an xhr request -
					//script is handled differently and wont show up in firebug script tab for debugging.
					crossDomain: true,
					cache: cache !== false ? true : false
				});
			}
			return null;
		},

		/**
		 * Add the requested files to the document.  These can be either JS or CSS files.

			//Example
			FED.Util.requires({
				js: ['foo', 'bar', baz'],
				css: ['cssA', 'cssB']
			});
		 * @param {Object} config an object containing arrays of js and css files. Extensions are not required.
		 * @param {Array} [config.js=[]] array of js files to add
		 * @param {Array} [config.css=[]] array of css files to add
		 * @return {Object} the last jQuery XHR object if any js files were loaded, otherwise null
		*/
		requires: function(config) {
			var me = this,
				xhr = null,
				path = config ? config.baseUrl || '' : '';

			var buildPath = function(file) {
				file = trim(file);

				//if file starts with '.' or '/' or 'http', it's assumed to be a relative or FQ path and we just return it
				return !!file ? (file.startsWith('http') || file.startsWith('/') || file.startsWith('.')  ? file : (path + file)) : '';
			};

			if (config) {
				$.each(config.css, function(i, file) {
					me.addCssFile(buildPath(file));
				});
				$.each(config.js, function(i, file) {
					xhr = me.addJsFile(buildPath(file));
				});
			}

			return xhr;
		},

		/**
		 * Returns true if the passed value is empty.
		 * The value is considered to be empty if it is
		 * <ul>
		 * <li>null</li>
		 * <li>undefined</li>
		 * <li>a string equal to 'undefined'</li>
		 * <li>a zero length string</li>
		 * <li>a string containing only spaces</li>
		 * </ul>
		 * @param {Mixed} value The value to test
		 * @return {Boolean} true if the passed arg is empty, else false
		 */
		isEmpty: function(val) {
			return typeof val === 'undefined' || val === 'undefined' || val === null || trim('' + val).length === 0;
		},

		/**
		 * Returns true if the string contains only numbers.
		 * @param {String|Number} val the string to check
		 * @return {Boolean} true if the passed arg is numeric, else false
		 */
		isNumeric: function(val) {
		    return reNumber.test(val);
		},

		/**
		 * Returns true if the string contains a floating number.
		 * Valid values must be all numbers with an optional leading +/-, and single decimal point.
		 * @param {String|Number} val the string to check
		 * @return {Boolean} true if the passed arg is numeric, else false
		 */
		isFloatNumber: function(val) {
		    return reFloatNumber.test(val);
		},

		/**
		 * Returns true if the string is a valid 5 or 9 digit zipcode. Hyphen is optional in a 9 digit zip.<br />
		 * Also disallows zipcodes of 00000, 11111, 33333, 66666, 77777, 88888, 99999
		 * @param {String} s the zipcode to check
		 * @return {Boolean} true if the passed arg is a valid zipcode, else false
		 */
		isValidZipcode: function(s) {
		    return reZipcode.test(s) && ['00000','11111','33333','66666','77777','88888','99999'].indexOf(s.toString().substr(0,5)) === -1;
		},

		/**
		 * Returns true if the string is a valid email address.
		 * @param {String} s the string to check
		 * @return {Boolean} true if the passed arg is a valid email, else false
		 */
		isValidEmail: function(s) {
		    return reEmail.test(s);
		},

		/**
		 * Returns true if the string is a valid email username (left of '@' is NOT 'root', 'spam', 'abuse').
		 * @param {String} s the string to check
		 * @return {Boolean} true if the passed arg is a valid, else false
		 */
		isValidEmailUser: function(s) {
		    return !!trim(s) && !reEmailUser.test(s);
		},

		/**
		 * Returns true if the string is a valid phone number.  Any spaces, parens, dashes, periods will be removed before validation.<br />
		 * Valid phones must be 10 or 11 digits.<br />
		 * 10 digit phones must start with number other than 0/1. 11 digit phones starting with 0/1 must have a second digit that is not 0/1
		 * @param {String} s the string to check
		 * @param {Boolean} [isIntl=false] optional flag to do international phone validation which much be 10-16 digits
		 * @return {Boolean} true if the value is a valid
		 */
		isValidPhone: function(s, isIntl) {
			var d;

			if (!s) {
				return false;
			}
			//make sure we have a string, then strip the special characters
			s = (s+'').replace(/[ \.\-\(\)]/g, '');
			d = s.substr(0,1);

			if (!this.isNumeric(s)) {
				return false;
			}
			else if (isIntl === true && (s.length > 9 && s.length < 17)) {
				//international phone number must be 10-16 digits and
				//a) start with 0/1 and not 0/1 in second digit or
				//b) start with 2-9
				if (d === '0' || d === '1') {
					d = s.substr(1,1);
					return d !== '0' && d !== '1';
				}
				return d !== '0' && d !== '1';
			}
			else if (s.length === 10) {
				return d !== '0' && d !== '1';
			}
			else if (s.length === 11) {
				if (d === '0' || d === '1') {
					 d = s.substr(1,1);
					 return d !== '0' && d !== '1';
				}
				return false;
			}
			return false;
		},

		/**
		 * Generic name validation.
		 * Valid names must start with a letter, followed by any combination of letters, numbers, space, singlequote, or period, case insensitive
		 * @param {String} s the string to check
		 * @return {Boolean} true if the name is valid, false if empty or not valid
		*/
		isValidName: function(s) {
			return !!trim(s) && (/^[a-z][a-z0-9 '\.]+$/i).test(s);
		},

		/**
		 * Truncate a string to a specified length, optionally adding suffix (for ex '...').  Handles string or word-based truncation.

			//Example
			FED.Util.truncate('The lazy red fox jumped over the sleeping brown dog'); // returns 'The lazy red fo'
			FED.Util.truncate('The lazy red fox jumped over the sleeping brown dog',
				{length:3, suffix:'lma'}); // returns 'Thelma'
			//passing a space as delimiter to break on words (not characters)
			FED.Util.truncate('The lazy red fox jumped over the sleeping brown dog',
				{length:5, delim:' ', suffix:'...'}); //returns 'The lazy red fox jumped...'

		 * @param {String} s the string to operate on
		 * @param {Object} options (optional) config object to determine how the string will be truncated
		 * @param {Number} [length=15] max length of returned string
		 * @param {String} [suffix=''] suffix to append to the trucated string (in addition to the max length)
		 * @param {String} [delim=''] the delimiter character used to split when truncating words
		 * @return the truncated string
		*/
		truncate: function(s, options) {
			var o = $.extend({
				length: 15,
				suffix: '',
				delim: ''
			}, options);

			return trim(s).split(o.delim).slice(0, o.length).join(o.delim) + o.suffix;
		},

		/**
		 * Show a tooltip element, building the element if it doesn't exist.<br />
		 * A tooltip can have a close button, but no other CTA buttons.<br />
		 * Use the default tooltip html structure or pass a template string.

			//Example
$('#tipMe').hover(
	function() {
		FED.Util.toolTip($(this), {msg:'Hello'});
	},
	function() {
		$('#shcGenericTip').fadeOut(250);
	});

		 * @param {Object} el jQuery ref to the target of the tooltip display
		 * @param {Object} options config object specifying how the toolip will be built
		 * @param {String} [options.msg=''] the message to display
		 * @param {String} [options.id='shcTooltip'] the DOM id for this element
		 * @param {String} [options.cls='shcTooltip'] the CSS class for the element
		 * @param {Number} [options.offsetTop=12] the number of pixels to offset the element top from the target element
		 * @param {Number} [options.offsetLeft=18] the number of pixels to offset the element left from the target element
		 * @param {Number} [options.fadeIn=250] the number of milliseconds to delay the tooltip display
		 * @param {String} [options.tmpl=''] the html template to use for the tooltip content
		 * @return {Object} the jQuery element ref to to the tooltip
		 */
		toolTip: function(el, options) {
			if (!el.length) {
				return;
		}

			var o = $.extend({
				id: 'shcTooltip',
				cls: 'shcTooltip',
				msg: '',
				offsetTop: 4,
				offsetLeft: -20,
				fadeIn: 250,
				tmpl: ''
			}, options),
			offset = el.offset(),
			tip = $('#' + o.id);

			if (tip.length && !o.tmpl) {
				//tip element exists - just update it - skip the span for the caret
				tip.children('span:not(.tip, .shcTip)').html(o.msg);
			}
			else {
				//put in the image path - this can't happen when the template is defined b/c the global var hasn't been set
				//TODO: this can go away if we switch to all css buttons
				o.tmpl = (o.tmpl || FED.Template.toolTip).replaceAll('<PATH>', typeof imagePath !== 'undefined' ? imagePath : '');

				tip.remove();
				$(document).off('click.fedUtil'); //remove the close handler
				//format the html with config info and add to DOM
					tip = $(String.format(o.tmpl, o.id, o.cls, o.msg)).appendTo('body');
				}

			var css = {
				top: Math.max(offset.top + el.height() + o.offsetTop, 10),  // don't set negative top
				left: Math.max(offset.left + o.offsetLeft, 10) // don't set negative left
			};

			//if we're going to overrun the right side, shift it left
			if (css.left + tip.outerWidth() >= $.q(document).width()) {
				$('.shcTip').removeClass().addClass('shcTip shcTipTopRight');
				css.left = Math.max(offset.left - tip.outerWidth() + $('.shcTip').outerWidth() + 30, 10); // don't set negative left 
			}
			//if we're going to overrun the bottom, shift it up
			if (css.top + tip.outerHeight() >= ($.q(document).height() - 150)) {
				css.top = Math.max(offset.top - tip.outerHeight() - el.height(), 10);  // don't set negative top 
				
				if (offset.left + tip.outerWidth() >= $.q(document).width()) {
					$('.shcTip').removeClass().addClass('shcTip shcTipBottomRight');
				}
				else {
					$('.shcTip').removeClass().addClass('shcTip shcTipBottomLeft');
				}
			}
			
			//position and show it
			tip.css(css).fadeIn(o.fadeIn);

			return tip;
		},

		/**
		 * Show a generic layer element, building the element if it doesn't exist.<br />
		 * A layer can have a close button and CTA buttons.<br />
		 * A layer closes if another click anywhere in the document occurs, even if it's not configured with a close button.<br />
		 * Use the default layer html structure or pass a template string.

			//Example
$('#openLayer').click(function() {
		FED.Util.layer($(this), {msg:'Hello'});
});
		 * @param {Object} el jQuery ref to the target of the layer display
		 * @param {Object} options config object specifying how the layer will be built
		 * @param {String} [options.msg=''] the message to display
		 * @param {String} [options.id='shcLayer'] the DOM id for this element
		 * @param {String} [options.cls='shcLayer'] the CSS class for the element
		 * @param {Number} [options.offsetTop=12] the number of pixels to offset the element top from the target element
		 * @param {Number} [options.offsetLeft=18] the number of pixels to offset the element left from the target element
		 * @param {Number} [options.fadeIn=250] the number of milliseconds to delay the layer display
		 * @param {String} [options.tmpl=FED.Template.layer] the html template to use for the layer content
		 * @param {Boolean} [options.closeable=false] by default a simple layer with no close button.
		 * pass true to add close functionality
		 * @param {Function} [options.cbClose] a callback function to invoke when the layer closes, if you want to extend default close functionality
		 * @return {Object} the jQuery ref to layer element
		 */
		layer: function(el, options) {
			var layerEl,
				o = $.extend({
					id: 'shcLayer',
					cls: 'shcLayer',
				closeable: false
			}, options);

			var cbClose = function(e) {
				var layerContainer = $('#' + o.id);
				// if the target of the click isn't the clicked link itself nor a descendant of the clicked link
				// and also the target of the click isn't the layerContainer nor a descendant of the layerContainer except closeWrp
				if (!el.is(e.target) && el.has(e.target).length === 0 && !layerContainer.is(e.target) && 
				(layerContainer.has(e.target).length === 0 || $('#' + o.id + ' .closeWrp').has(e.target).length)) {
					
					layerContainer.remove();
					$(document).off('click.fedUtil'); //remove the close handler
					
					//call the user close callback if it exists
					if (typeof o.cbClose === 'function') {
						o.cbClose();
					}
				}
			};

			//if no template is passed, pick one based on closeable config
			if (!o.tmpl) {
				o.tmpl = FED.Template[o.closeable ? 'layerClose' : 'layer'];
			}

			layerEl = this.toolTip(el, o);

			//bind the default close action or user-specified close fn
			if (o.closeable) {
				$('#' + o.id + ' .closeWrp').on('click', cbClose);				
			}
			
			//A layer will always close on click off the layer, even if the layer doesn't have a close button
			$(document).on('click.fedUtil', cbClose);
			return layerEl;
		},

		/**
		 * Show a zipcode input layer element, building the element if it doesn't exist.
		 * Use the default layer html structure or pass a template string.

			//Example
$('#zip').click(function() {
		FED.Util.zipLayer($(this));
});
		 * @param {Object} el jQuery ref to the target of the layer display
		 * @param {Object} options config object specifying how the layer will be built
		 * @param {String} [options.msg=''] the message to display
		 * @param {String} [options.id='shcZipLayer'] the DOM id for this element
		 * @param {String} [options.cls='shcZipLayer'] the CSS class for the element
		 * @param {Number} [options.offsetTop=12] the number of pixels to offset the element top from the target element
		 * @param {Number} [options.offsetLeft=18] the number of pixels to offset the element left from the target element
		 * @param {Number} [options.fadeIn=1] the number of milliseconds to delay the layer display
		 * @param {String} [options.tmpl=FED.Template.layer] the html template to use for the layer content
		 * @param {Boolean} [options.closeable=true] close icon by default
		 * @param {Function} [options.cbClose] a callback function to inoke on clicking close button, if you want to override default close functionality
		 */
		zipLayer: function(el, options) {
			var o = $.extend({
				id: 'shcZipLayer',
				cls:'shcZipLayer',
				tmpl: FED.Template.zipCode,
				closeable: true,
				fadeIn:1 //letting this show immediately b/c it will lag to retrieve the images unless they're added to css file
			}, options);

			//this is just a layer with different config/template - let it do the work
			return this.layer(el, o);
		},

		/**
		 * Strip all the non-numerics out of a phone number.
		 * @param {String} s the string to clean
		 * @return {String} the cleaned phone number
		 */
		cleanPhoneNum: function(s) {
			//trim first to avoid issues with empty arg
			return trim(s).replace(/[^\d]/g, '');
		},

		/**
		 * Fetch the currently selected country by the user and the exchange rates for the country.
		 * Parse the cookie and store the values in global variables.
		 * The current implementation of this will return the content of the global i18nCookieData var
		 * if not null. Otherwise, it will attempt to read the international cookie
		 * @param {Boolean} [useCookie=false] (optional) pass true to force the cookie to be read and overwrite the global vars.
		 * @return {Object} the interational shipping data object
		 */
		getCountryData: function(useCookie) {
			var data = null,
				cookie, arr, len;

			//TODO: checking both of these b/c there's a discrep btwn the stores for var name.
			if (typeof i18nCookieData !== 'undefined' && i18nCookieData) {
				data = i18nCookieData; //global var defined somewhere?
			}

			//if neither global var is set or the flag is passed re-read from the cookie
			if (!data || useCookie === true) {
				cookie = $.cookie("IntnlShip");
				data = {};
				if (cookie) {
					arr = cookie.split('|');
					len = arr.length;

					 if (len > 1) {
						data.countryCode = trim(arr[0]).toUpperCase();
						data.currencyCode = arr[1];
						if (len>2) {
							data.exgRate = arr[2];
						}
						if (len>3) {
							data.quoteId = arr[3];
						}
						if (len > 4) {
							data.lcpId = arr[4];
						}
						if (len > 5) {
							data.countryGrp = arr[5];
						}
						if (len > 6) {
							data.isSimiElig = arr[6];
						}
					}
				}
			}

						//TODO: update all the refs to the result of this fn, rather than assuming a global var
						i18nCookieData = data;

			return data;
		},

		/**
		 * Remove the International cookie data
		 * @return {void}
		 */
		deleteCountryData: function() {
			//TODO: might need to add the domain to this
			$.cookie("IntnlShip", null);
		},

		/**
		 * Create a curtain element for a modal display.  Element is created & left hidden. Call show() on the returned value to display.
		 * @param {Object} [config] optional configuration values
		 * @param {String} [config.id='shcCurtain']  ID for curtain's DOM element
		 * @param {String} [config.cls='shcCurtain'] class for the curtain's DOM element
		 * @param {Boolean} [config.resize=false] wire the window resize handler to make the curtain fill the full window.  Should not be needed due to way base css is positioning the element.
		 * @param {Number} [config.zIndex=''] zIndex value to override what's in shcGlobal (999990)
		* @returns {Object} jQuery instance of the the curtain
		 */
		curtain: function(config) {
			config = $.extend({
				id: 'shcCurtain',
				cls: 'shcCurtain',
				resize: false,
				zIndex: ''
			}, config);

			$('#' + config.id).remove();  //make sure we don't have one left over

		    var el = $(String.format('<div id="{0}" class="{1}" />', config.id, config.cls)).appendTo('body');
			if (config.zIndex) {
				el.css('zIndex', config.zIndex);
		}

			if (config.resize) {
				$(window).resize(function() {
					el.height($(document).height());
				});
			}

			return el;
		},
		/**
		 * Get the root domain of the current page, e.g. sears.com
		 * @returns {String} the root domain or localhost
		 */
		getRootDomain: function() {
			var domain = document.domain,
				domainVars = domain.split('.'),
				length = domainVars.length;
				
			if (domain.indexOf('.pr') !== -1) {
				return (length > 3 ? domainVars[length-3] + '.' +domainVars[length-2] + '.' + domainVars[length-1] : domain);
			}
			else {			
           		return (length > 2 ? '.' + domainVars[length-2] + '.' + domainVars[length-1] : domain);
			}	
		}
	};
}();

/**
 * @member Global
 * Get a cookie value.<br />
 * NOTE: unlike $.cookie, this returns '' if not found
 * @deprecated Use $.cookie(name)
 * @param {String} name the cookie name
 * @return the value or empty string if not found
 */
function getCookie(name) {
	return !!name ? ($.cookie(name) || '') : '';
}

/**
 * Returns true if the string contains a floating number.
 * Valid values must be all numbers with an optional leading +/-, and single decimal point.
 * @member Global
 * @deprecated Use FED.Util#isFloatNumer
 * @param {String} s the string to check
 * @return {Boolean} true if the value is numeric
 */
checkNumeric = FED.Util.isFloatNumer;

/**
 * @member Global
 * Validate a 5 or 9 digit zipcode. Hyphen is optional in a 9 digit zip.
 * @deprecated Use FED.Util#isValidZipcode
 * @param {String} s the zipcode to check
 * @return {Boolean} true if valid else false
 */
zipcodeVal = FED.Util.isValidZipcode;

/**
 * @member Global
 * Validate a 5 or 9 digit zipcode. Hyphen is optional in a 9 digit zip.
 * @deprecated Use FED.Util#isValidZipcode
 * @param {String} s the zipcode to check
 * @return {Boolean} true if valid else false
 */
isValidZipcode = zipcodeVal;

/**
 * @member Global
 * Validate an email address
 * @deprecated Use FED.Util#isValidEmail
 * @param {String} s the string to check
 * @return {Boolean} true if valid else false
 */
isValidEmail = FED.Util.isValidEmail;

/**
 * @member Global
 * Validate an email address
 * @deprecated Use FED.Util#isValidEmail
 * @param {String} s the string to check
 * @return {Boolean} true if valid else false
 */
fnIsValidEmail = isValidEmail;

/**
 * @member Global
 * Generic name validation.
 * Valid names must start with a letter, followed by any combination of letters, numbers, space, singlequote, or period, case insensitive
 * @deprecated Use FED.Util#isValidName
 * @param {String} s the string to check
 * @return {Boolean} true if the name is valid, false if empty or not valid
 */
nameValidation = FED.Util.isValidName;

/**
 * @member Global
 * Trim a string down to 15 words.
 * @deprecated Use FED.Util.truncate
 * @param {String} s the string to trim
 * @return {String} the trimmed string
 */
function trimByWord(s) {
	return FED.Util.truncate(s, {
		delim: ' '
	});
}

/* end back-compat */

/**
 * @member Global
 * Returns true if the string contains exclamation, question mark or space or it's less than 6 characters
 * @param {String} s the string to check
 * @return {Boolean} true if the match is found
 */
function hasInvalidChars(s) {
	return s.length < 6 || /[ !?]/.test(s);
}

/**
 * @member Global
 * Returns true if the string contains a digit - tests only whether at least one digit is found, not whether the string is a number
 * @param {String} s the string to check
 * @return {Boolean} true if at least one digit is found
 */
function hasNumeric(s) {
	return (/\d/).test(s);
}

/**
 * @member Global
 * Returns true if the string contains less than two characters, starts with a spcial character, or contains any special characters, save for spaces, periods, apostrophes, underscores and a hyphen - possible names really
 * @param {String} s the string to check
 * @return {Boolean} true if the match is found
 */
function hasSpecialChars(s) {
	var charFirst = s.charAt(0);
	return s.length < 2 || (/[^\w\s]/).test(charFirst) || (/[^\w\-\s\.\']/).test(s);
}

/**
 * @member Global
 * Returns true if the string contains at least one of the special characters %,<,>,!,*,$,`
 * @param {String} s the string to check
 * @return {Boolean} true if at least one of the characters is found, else false.
 */
function hasSpecialAlpha(s) {
	return (/^[a-z0-9 '\.\-\/\#\(\)\,\@]*$/i).test(s);
}
/**
 * Returns true if the string contains a letters or space - tests only whether at least one letter/space is found, not whether only letters/space are found
 * @member Global
 * @param {String} s the string to check
 * @return {Boolean} true if at least one letter/space is found
 */
function hasLetter(s) {
	return (/[a-z ]/i).test(s);
}

if (typeof Array.indexOf !== 'function') {
/**
 * @member Array
 * Determine whether a passed item is in the array.<br />
 * <b>Note:</b> This is only added to the Array prototype for browsers that don't support it natively.

	//Example
	['foo', 'bar', 'baz'].indexOf('bar'); // returns 1
	['foo', 'bar', 'baz'].indexOf('x'); // returns -1
 * @param {Object} obj the element to seek in the array
 * @return {Number} returns the index (0-based) if found, or -1 if not found
 */
	Array.prototype.indexOf = function(obj) {
		var i, len;
		for (i=0,len=this.length; i<len; i++) {
			if (this[i] === obj) {
				return i;
			}
		}
		return -1;
	};
}

 //not sure we really need to be calling these 2 anymore.  Using attr instead of prop for kenmore
 /**
  * @member Global
  * Enable all SELECT elements on the page.
  * @return void
  */
 function enableSelect() {
	$('select').attr('disabled', false);
 }

/**
 * @member Global
* Disable all SELECT elements on the page.
* @return void
*/
function disableSelect() {
	$('select').attr('disabled', true);
}

//TODO: this needs to go away - seems to be causing issues in chrome - possible reserved word
//Change all calls to $(...).remove()
/**
 * @member Global
 * Remove an element.  This is a legacy function that is called by many inline click handlers.
 * Supports passing an ID (with the leading '#') or a DOM element
 * @param {String|Object} id the DOM element or ID (with leading '#') to remove
 * @return void
 */
function remove(id) {
	$(id).remove();
}

/**
 * @member Global
 * Display a curtain overlay and optionally an ajax loading element.<br />
 *	Note: Do not set zIndex values > 9999 as this may cause issues in some browsers.  If you have elements appearing above the curtain,
 *	you need to move those elements lower than what this creates (defaults to curtain:9998,ajaxModal:9999).
 * @param {Object} obj configuration object for the curtain element
 * @return void
*/
function curtainOverlay(params) {
	//apply default values to passed values
	params = $.extend(true, {
		elm: 'body',
		trans: '0.8',
		color: '#333',
		closing: false,
		ajaxclass: '',
		ajaxmodal: true,
		closeonclick: true,
		persistmodal: true,
		fade: true,
		zIndex: {
			curtain: 9998,
			ajaxModal: 9999
			}
	}, params);

	var duration, curtain,
	w = 0,
		h = 0,
		s = 0,
		l = 0,
		offset = 0,
		el = $(params.elm);

    if (params.fade) {
        $.fn.inmode = $.fn.fadeIn;
        $.fn.outmode = $.fn.fadeOut;
        duration = 1000;
    } else {
        $.fn.inmode = $.fn.show;
        $.fn.outmode = $.fn.hide;
        duration = 0;
		}

    $('#ajaxmodal')[params.persistmodal ? 'hide' : 'remove']();

    if (params.closing) {
		$('#shcCurtain').remove();

        if ($.q('body').hasClass('ie')) {
			$.q('body').css({
                overflow: 'auto'
            });
        } else {
            $('html').css({
                overflow: ''
            });
	}
	} else {
        if (el.is('body')) {
            if ($.q('body').hasClass('ie')) {
				$.q('body').css({
                    overflow: 'hidden'
                });
                if ($.boxmodel) {
                    w = document.documentElement.clientWidth;
                    h = document.documentElement.clientHeight;
                    s = document.documentElement.scrollTop;
                } else {
                    w = document.body.clientWidth;
                    h = document.body.clientHeight;
                    s = document.body.scrollTop;
                }
            } else {
				w = window.innerWidth;
				h = window.innerHeight;
				s = window.pageYOffset;
				//HACK: FF 3.6.3 doesn't get this setting - ECOM-127613
				if ($.q('body').hasClass('gecko3')) {
					$('html').css({
						overflow: 'hidden'
					});
				}
            }
        } else {
            w = el.width();
            h = el.height();
            offset = el.offset();
            if (typeof offset !== "undefined") {
                s = offset.top;
                l = offset.left;
            }
        }

        if (s !== "undefined" && l !== "undefined") {
			curtain = FED.Util.curtain({
				zIndex:params.zIndex.curtain
			}).show();
/*
            curtain = $('<div id="curtain"/>').css({
                position: 'absolute',
                display: 'none',
                zIndex: params.zIndex.curtain,
                top: s,
                left: l,
                width: w,
                height: h,
                background: params.color,
                opacity: params.trans
            }).appendTo('body');

			if ($.q('body').hasClass('ie')) {
            curtain.css({
                filter: 'alpha(opacity=' + (params.trans * 100) + ')'
            }).show();
        } else {
            curtain.show();
        }
*/
        }

        if (params.ajaxmodal) {
            if (params.persistmodal) {
                if ($('#ajaxmodal').length) {
                    $('#ajaxmodal').fadeIn(1000);
                } else {
                    $('<div id="ajaxmodal" class="' + params.ajaxclass + '"/>').css({
                        display: 'none',
                        position: 'absolute',
                        zIndex: params.zIndex.ajaxModal,
                        backgroundColor: '#FFF',
                        padding: '10px'
                    }).insertAfter('#shcCurtain').inmode(duration);
                }
            } else {
                $('#ajaxmodal').remove();
                $('<div id="ajaxmodal" class="' + params.ajaxclass + '"/>').css({
                    display: 'none',
                    position: 'absolute',
                    zIndex: params.zIndex.ajaxModal,
                    backgroundColor: '#FFF',
                    padding: '10px'
                }).insertAfter('#shcCurtain').outmode(duration);
            }
        }

        if (params.closeonclick) {
            curtain.click(function () {
                curtainOverlay({
                    closing: true
                });
            });
        }
    }
}

/**
 * @member Global
 * Strip non-numerics out of a phone number.
 * Moving this here to get rid of all the other copies.  This will problably go away a completely once we can standardize all
 * all the phone number validation.
 * @param {String} s the value to be reformatted.
 * @return {String}
 */
function reformat(s) {
	s = trim(s);
	// remove special characters like "\/-(). " and ","
	var re = /\$| |\(|\)|\+|\[|\-|\_|\]|\[|\}|\{|\\|\/|\$|\./g;
	return s.replace(re, "");
}

/**
 * @member Global
 * Generic currency formatting.
 * Formats a number as d,ddd.dd
 * Non-numerics, including null, return 0.00
 * @param {Number} num the value to be reformatted
 * @return {String} the formatted number or '0.00' if a number is not passed
 */
function formatCurrency(num) {
	var cents, i, len;

	//make sure we have a string and strip $ and comma
	num = String(num).replace(/\$|\,/g,'');
	if (isNaN(num)) {
		return '0.00';
	}

	num = Math.floor(num*100+0.50000000001);
	cents = num%100;
	num = Math.floor(num/100).toString();
	if (cents<10) {
		cents = '0' + cents;
	}
	for (i = 0, len=Math.floor((num.length-(1+i))/3); i<len; i++) {
		num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));
	}
	return num + '.' + cents;
}
//TODO: back compat alias
formatNumber = formatCurrency;

/**
 * @member Global
 *	This function is to display the glossary. This function is called after the ajax call in case of a glossary image.
 *	We pass the html to be displayed in the pop-up as well as the id of the html element in this case it being an image
 * @param {String} html	the HTML content to be added to the popup
 * @param {String} imageId id of the DOM element
 * @return void
*/
function showImageGlossary(html, imageId) {
	//assuming the IDs are unique so we're not filtering for 'IMG' tag
	var el = $('#' + imageId);

	if (el.length) {
		//call the global postioning and element creation functions
		findPos(el[0]);
		define(value);
	}
 }

 /**
  * @member Global
  * Build the definition popup.  Called from many places, including vam_popup and product pages.
  * Must be positioned first by a call to the global findPos() which set yPos, xPos
  * @param {String} html the content to display
  * @param {Object} options additional config options
  * @param {String} [options.id='definition'] the ID for the DOM element
  * @param {String} [options.cls='floatWindow'] the class for the DOM element
  * @return void
  */
 function define(html, options) {
	var id = 'definition',
		cls = 'floatWindow',
		el;

	id = (options && options.id) ? options.id : id;
	cls = (options && options.cls) ? options.cls : cls;

	$('#' + id).remove();
	el = $(String.format('<div id="{0}" class="{1}" />', id, cls))
		.appendTo('body')
		.html('<p><a href="javascript:;" class="closeWindow">Close</a></p><br clear="all" /><p><b>' + trim(html) + '</b></p>')
		.css({
			top: yPos,
			left: xPos
		});

	el.on('click', 'a', function() {
		el.remove();
	});
}

/**
 * @member Global
 * Calculate page dimensions.  This should really be obsolete, but it's still called in some places.<br />
 * As a first step to removal, all other definitions of this are being removed and remaining calls will be looked at.
 * @return {Object} dimensions object conaining properties w, h, s
*/
function pageDims() {
	var dims = {};
	if ($.q('body').hasClass('ie')) {
		if ($.boxmodel) {
			dims.w = document.documentElement.clientWidth;
			dims.h = document.documentElement.clientHeight;
			dims.s = document.documentElement.scrollTop;
		} else {
			dims.w = document.body.clientWidth;
			dims.h = document.body.clientHeight;
			dims.s = document.body.scrollTop;
		}
	} else {
		dims.w = window.innerWidth;
		dims.h = window.innerHeight;
		dims.s = window.pageYOffset;
	}
	return dims;
}

/**
 * @member Global
 * Single instance of the international check moved here from all other locations.
 * Since this is present on every page, there should never be a type check for existence of this.
 * @return {Boolean} true if International shipping is on.  Always false for non-Sears stores.
 */
function isI18NConvReq() {
	var data, flag = false;

	if (typeof storeIdValue !== "undefined" && storeIdValue != "10153"){
		return false;
	}

	if (typeof intShipFlgSwitch !== 'undefined' && intShipFlgSwitch === 'TRUE') {
		data = FED.Util.getCountryData();
		if (data && typeof data.countryCode !== 'undefined' && data.countryCode !== 'US') {
			flag = true;
		}
	}
	return flag;
}

/**
 * Generic window.open utility.  Changed to use a blank window name to avoid breaking the Session object.
 * @param {String} url the url to open
 * @param {Number} [width=null] width of the opened window, defaults to full width
 * @param {Number} [height=null] height of the opened window, defaults to full height
 * @param {String} [config='status=no,scrollbars=yes,resizable=yes,directories=no,menubar=no,toolbar=no,location=no'] additional info for the display arg
 * @return {Object} the window instance
 */
function popUpWin(url, width, height, config) {
	var w;

	config = config || 'status=no,scrollbars=yes,resizable=yes,directories=no,menubar=no,toolbar=no,location=no';

	w = window.open(url || '', '_blank', String.format('width={0},height={1},{2}', width, height, config));
	w.focus();

	return w;
}

/**
 * Legacy function to deal with great price wiring/display.  All other code that builds this removed
 * @return void
 */
function bindGreatPrice() {
	$('a.greatPrice').off('click').on('click', function () {
		FED.Util.layer($(this), {msg: this.getAttribute('info'), closeable: true });
	});
}
//TODO: leaving an old alias in case there are any calls in JSP
showGreatPrice = bindGreatPrice;

/**
 * Legacy function to deal with Hot Buy wiring/display.  All other code that builds this removed
 * @return void
 */
function bindHBPrice() {
	$('a.HBPrice').unbind('click').on('click',function () {
		FED.Util.layer($(this), {msg:this.getAttribute('info'), closeable: true});
	});
}

/**
 * Legacy function to deal with UPP Price wiring/display.  All other code that builds this removed
 * @return void
 */
function bindUPPPrice() {
	$('a.UPPPrice').unbind('click').on('click',function () {
		FED.Util.layer($(this), {msg:this.getAttribute('info'), closeable: true});
	});		
}

//this is just for docgen
/**
 * @class jQuery
 * jQuery library is documented here <http://jqapi.com> <br />
 * This section will document only SHC additions/plugins
 */

/**
 * @member jQuery
 * @method center
 * Center jQuery element(s) (usually a modal popup).<br />
 * This is a simple method that does not allow for special handling for positioned elements, resizing, etc.  If you need that functionality, use jQuery#shcCenter<br />
 * **Note:** Some browsers may have trouble positioning a hidden element.  You may have to call .show() first.
 * @return jQuery
 */
$.fn.center = function() {
	var w = $(window),
		top = (w.height() - this.height()) / 2 + w.scrollTop(),
		left = (w.width() - this.width()) / 2 + w.scrollLeft();

	this.css({
		position: 'absolute',
		//don't allow negative position
		top: top>0 ? top : 0,
		left: left>0 ? left : 0
	});
    return this;
};

/**
 * @member jQuery
 * @method centerOnScreen
 * Center jQuery element(s) (usually a modal popup).
 * @deprecated Use {@link jQuery#center} instead
 * @return jQuery
 */
$.fn.centerOnScreen = $.fn.center;

/**
 * @member jQuery
 * @chainable
 * Create a modal popup which can optionally load an additional file content.<br />
 * This attaches a click handler to call dynpop().
 * @param {Object} options config object to override default settings
 * @param {String} [options.filename='default.html] the content to load
 * @param {String} [options.contentname='#popup'] selector for element content will be loaded
 * @param {String} [options.windowWidth='300px'] width of content element
 * @param {String} [options.windowHeight='100px'] height of content element
 * @param {String} [options.dynamicContent='true'] whether content is dynamic??
 * @param {Boolean} [options.jsonFlag=false] conent is json??
 * @return jQuery
*/
$.fn.dynamicPopup = function (options) {
	options = $.extend({
		filename: 'default.html',
		contentname: '#popup',
		windowWidth: '300px',
		windowHeight: '100px',
		dynamicContent: 'true',
		jsonFlag: false
	}, options);

	return this.each(function () {
		$(this).click(function (e) {
			dynpop.ini(e, options);
		});
	});
};

/**
 * @member jQuery
 * @chainable
 * Another silly alias for {@link $.fn.dynamicPopup} to account for the poor implementation using dynpop1
 * @param {Object} options a config object to override default settings (see fn.dynamicPopup)
 * @return jQuery
*/
$.fn.dynamicPopup1 = function (options) {
	options = $.extend({
		filename: 'default.html',
		contentname: '#popup',
		windowWidth: '300px',
		windowHeight: '100px',
		jsonFlag: false
	}, options);

	return this.each(function () {
		$(this).click(function (e) {
			dynpop1.ini(e, options);
		});
	});
};

//TODO: Vertical dropdowns - maybe obsolete, only ref'd by a few JSPs
//TODO: global var for the following timeout; only called from same JSPs that call timeoutNav(), dropNav()
var h;
/**
 * Legacy handler for JSP calls.  Should be handled strictly in js.
 * @param {String} id DOM ID will be prefixed with 'd'
 */
function timeOutNav(id) {
	h = setTimeout(function() {
		$('#d' + id).hide();
	}, 500);
}
/**
 * Legacy handler for JSP calls.  Should be handled strictly in js.
 * @param {String} a DOM ID will be prefixed with 'd'
 * @param {Number} len number of dropdowns
 */
function dropNav(a, len) {
	var i;
	for (i = 1; i < len+1; i++) {
		$("#d" + i).hide();
		$("#c" + i).css('position', 'static');
	}
	$("#d" + a).show();
	$("#c" + a).css('position', 'relative');
	$("#content").css('zIndex', 10);
}

//TODO: moving these 3 here while refactoring out of other flies.
function rImg(imgSource) {
	var objImg = new Image();
	objImg.src = imgSource;
	return objImg;
}

function rObj(name) {
	return document.getElementById(name);
}

//querystring access plugin
(function ($, settings) {
	var $separator = settings.separator || '&',
		$spaces = settings.spaces === false ? false : true,
		$suffix = settings.suffix === false ? '' : '[]',
		$prefix = settings.prefix === false ? false : true,
		$hash = $prefix ? settings.hash === true ? "#" : "?" : "",
		$numbers = settings.numbers === false ? false : true;

/**
 * @class
 * @extends jQuery
 * Querystring access.  This is the only way querystring processing should be done.<br />
 * http://archive.plugins.jquery.com/project/query-object (currently down)
*/
	jQuery.query = new function () {
		var is = function (o, t) {
			return o !== undefined && o !== null && ( !! t ? o.constructor === t : true);
		};
		var parse = function (path) {
			var m, rx = /\[([^[]*)\]/g,
				match = /^([^[]+?)(\[.*\])?$/.exec(path),
				base = match[1],
				tokens = [];
			while (m = rx.exec(match[2])) {
				tokens.push(m[1]);
			}
			return [base, tokens];
		};

		var set = function (target, tokens, value) {
			var i, index, temp, token = tokens.shift();
			if (typeof target !== 'object') {
				target = null;
			}
			if (token === "") {
				if (!target) {
					target = [];
				}
				if (is(target, Array)) {
					target.push(tokens.length === 0 ? value : set(null, tokens.slice(0), value));
				} else if (is(target, Object)) {
					i = 0;
					while (target[i++] != null) { /*just an increment loop */
					}
					target[--i] = tokens.length === 0 ? value : set(target[i], tokens.slice(0), value);
				} else {
					target = [];
					target.push(tokens.length === 0 ? value : set(null, tokens.slice(0), value));
				}
			} else if (token && token.match(/^\s*[0-9]+\s*$/)) {
				index = parseInt(token, 10);
				if (!target) {
					target = [];
				}
				target[index] = tokens.length === 0 ? value : set(target[index], tokens.slice(0), value);
			} else if (token) {
				index = token.replace(/^\s*|\s*$/g, "");
				if (!target) {
					target = {};
				}
				if (is(target, Array)) {
					temp = {};
					for (i = 0; i < target.length; ++i) {
						temp[i] = target[i];
					}
					target = temp;
				}
				target[index] = tokens.length === 0 ? value : set(target[index], tokens.slice(0), value);
			} else {
				return value;
			}
			return target;
		};
		var queryObject = function (a) {
			var self = this;
			self.keys = {};
			if (a.queryObject) {
				$.each(a.get(), function (key, val) {
					self.SET(key, val);
				});
			} else {
				$.each(arguments, function () {
					var q = "" + this;
					q = q.replace(/^[?#]/, '').replace(/[;&]$/, '');
					if ($spaces) {
						q = q.replace(/[+]/g, ' ');
					}
					$.each(q.split(/[&;]/), function () {
						var val, key = decodeURIComponent(this.split('=')[0] || "");
						try {
							val = decodeURIComponent(unescape(this.split('=')[1]) || "");
						} catch (err) {
							val = unescape(this.split('=')[1]);
						}
						if (!key) {
							return;
						}
						if ($numbers) {
							if (/^[+-]?[0-9]+\.[0-9]*$/.test(val)) {
								val = parseFloat(val);
							} else if (/^[+-]?[0-9]+$/.test(val)) {
								val = parseInt(val, 10);
							}
						}
						val = (!val && val !== 0) ? true : val;
						if (val !== false && val !== true && typeof val !== 'number') {
							val = val;
						}
						self.SET(key, val);
					});
				});
			}
			return self;
		};

		queryObject.prototype = {
			queryObject: true,

			/**
			 * Determine whether a key/type combination exists on the querystring
			 * @param {String} key the QS parm name
			 * @param {Mixed} [type] the type of QS parm
			 * @return {Boolean} true if the key/type is found
			 */
			has: function (key, type) {
				var value = this.get(key);
				return is(value, type);
			},
			/**
			 * Read a value from the querystring
			 * @param {String} key name of the querystring parm
			 * @return {String} the parm value or blank
			 */
			GET: function (key) {
				if (!is(key)) {
					return this.keys;
				}
				var parsed = parse(key),
					base = parsed[0],
					tokens = parsed[1];
				var target = this.keys[base];
				while (target != null && tokens.length) {
					target = target[tokens.shift()];
				}
				return typeof target === 'number' ? target : target || "";
			},

			/**
			 * Read a value from the querystring.
			 * @param {String} key name of the querystring parm
			 * @return {Mixed} the parm value or blank
			 */
			get: function (key) {
				var target = this.GET(key);
				if (is(target, Object)) {
					return $.extend(true, {}, target);
				} else if (is(target, Array)) {
					return target.slice(0);
				}
				return target;
			},
			SET: function (key, val) {
				var value = !is(val) ? null : val;
				var parsed = parse(key),
					base = parsed[0],
					tokens = parsed[1];
				var target = this.keys[base];
				this.keys[base] = set(target, tokens.slice(0), value);
				return this;
			},
			set: function (key, val) {
				return this.copy().SET(key, val);
			},
			REMOVE: function (key) {
				return this.SET(key, null).COMPACT();
			},
			remove: function (key) {
				return this.copy().REMOVE(key);
			},
			EMPTY: function () {
				var self = this;
				$.each(self.keys, function (key, value) {
					delete self.keys[key];
				});
				return self;
			},
			load: function (url) {
				var hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
				var search = url.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
				return new queryObject(url.length === search.length ? '' : search, url.length === hash.length ? '' : hash);
			},
			empty: function () {
				return this.copy().EMPTY();
			},
			copy: function () {
				return new queryObject(this);
			},
			COMPACT: function () {
				function build(orig) {
					var obj = typeof orig === "object" ? is(orig, Array) ? [] : {} : orig;
					if (typeof orig === 'object') {
						function add(o, key, value) {
							if (is(o, Array)) {
								o.push(value);
							} else {
								o[key] = value;
							}
						}
						$.each(orig, function (key, value) {
							if (!is(value)) {
								return true;
							}
							add(obj, key, build(value));
						});
					}
					return obj;
				}
				this.keys = build(this.keys);
				return this;
			},
			compact: function () {
				return this.copy().COMPACT();
			},
			toString: function () {
				var queryString = [],
					chunks = [];

				var encode = function (str) {
					str += '';
					if ($spaces) {
						str = str.replace(/ /g, "+");
					}
					return encodeURIComponent(str);
				};
				var addFields = function (arr, key, value) {
					if (!is(value) || value == false) {
						return;
					}
					var o = [encode(key)];
					if (value !== true) {
						o.push("=");
						o.push(encode(value));
					}
					arr.push(o.join(""));
				};

				var build = function (obj, base) {
					var newKey = function (key) {
							return !base || base === "" ? [key].join("") : [base, "[", key, "]"].join("");
						};
					$.each(obj, function (key, value) {
						if (typeof value === 'object') {
							build(value, newKey(key));
						} else {
							addFields(chunks, newKey(key), value);
						}
					});
				};

				build(this.keys);
				if (chunks.length) {
					queryString.push($hash);
				}
				queryString.push(chunks.join($separator));
				return queryString.join("");
			}
		};
		return new queryObject(location.search, location.hash);
	};
}(jQuery, { /* default settings */}));

/**
 * jQuery.unparam v0.1
 * Dave Taylor http://the-taylors.org
 *
 * The reverse of the param function, takes a url and returns an object
 * jQuery.unparam('http://the-taylors.org/?foo=one&bar=two');
 * returns {object}: { foo: "one", bar: "two" }
 *
 * MIT License (MIT)  Copyright (c) <2011> <Dave Taylor http://the-taylors.org>
*/
(function($){
     $.unparam = function(url) {
        var vars = {}, hash, i,
            urlParams = url.indexOf('?') > -1 ? url.split('?')[1] : url;

        var hashes = urlParams.split('&');
        for(i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            vars[hash[0]] = decodeURIComponent(hash[1]).replace(/\+/g, ' ');
        }
        return vars;
    };

}(jQuery));

/**
 * @class jQuery.q
 * @extends jQuery
 * jQuery selector caching<br />
 * https://github.com/danwit/jQache#readme<br />
 */
(function ($) {
    $._jqache = {};
    $._assigned = [];
    $._jqns = [];
    $._jqnsAssigned = [];

	/**
 * @constructor
 * @chainable
 * This function is used to cache a jQuery selector to avoid repeatedly scanning the DOM to rebuild a jQuery object.

	//rather than scanning the DOM twice to build a jQuery object for the BODY element,
	//this will build it only once
	if ($.q('body').hasClass('ie7')) {
		$.q('body').addClass('getRealBrowser');
	}
	//pass true to rebuild the cache for a selector.  This is used when you have previously cached a selector
	//and then deleted the element and rebuilt it, or added new elements that match the selector
	var foo = $.q('#foo', true);
	* @param {String} selector any jQuery selector string
 * @param {Boolean} [clear=false] force the cache for this selector to be cleared and re-read from DOM
 * @return {jQuery}
	*/
    jQuery.q = function (selector, clear) {
        clear = ( typeof clear !== "undefined" ) ? clear : false;

        if ( typeof $._jqache[selector] !== "undefined" && !clear ) {
            return $._jqache[selector];
        } else {
            if ( typeof $._assigned[selector] !== "undefined" ) {
                return $._jqache[selector] = $( $._assigned[selector] );
            }

            return $._jqache[selector] = $( selector );
        }
    };

/**
 * @chainable
 * Specify options for an item in the cache

	//build an alias for a long selector
	$.q.assign({
		name: 'mySel',
		selector: '#foo, #bar, #baz'
	});
	var len = $.q('mySel').length;
 * @param {Object} options config options for this function
 * @param {String} options.selector the selector to be cached
 * @param {String} [options.name=selector] caching alias for the selector
 * @param {Number} [options.interval=0] number of seconds to wait before caching the item
 * @param {String} [options.namespace=blank]
 * @return {jQuery}
*/
    $.q.assign = function ( options ) {
        var defaults = {
            interval: 0,
            namespace: undefined
        };

        if ( typeof options.selector === "undefined" ) {
            return false;
		}
        if ( typeof options.name === "undefined") {
            options.name = options.selector;
		}
        options = $.extend( {}, defaults, options );

        if ( typeof options.namespace === "undefined" ) {
            $._jqache[options.name] = $( options.selector );
            $._assigned[options.name] = options.selector;

            if ( options.interval > 0 ) {
                window.setInterval( function(){
                    $._jqache[options.name] = $( options.selector );
                }, ( options.interval*1000 ) );
            }

            return $._jqache[options.name];
        } else {
			$._jqache[options.namespace] = (typeof $._jqache[options.namespace] !== "undefined") ? $._jqache[options.namespace] : [];
            $._jqache[options.namespace][options.name] = $( options.selector );

			$._jqns[options.namespace] = (typeof $._jqns[options.namespace] !== "undefined") ? $._jqns[options.namespace] : [];
            $._jqns[options.namespace].push( options.name );

			$._jqnsAssigned[options.namespace] = (typeof $._jqnsAssigned[options.namespace] !== "undefined") ? $._jqnsAssigned[options.namespace] : [];
            $._jqnsAssigned[options.namespace][options.name] = options.selector;

            if ( options.interval > 0 ) {
                window.setInterval( function(){
                    $._jqache[options.namespace][options.name] = $( options.selector );
                }, ( options.interval*1000 ) );
            }

            if ( typeof $.q[options.namespace] !== "function" ) {
                $.q[options.namespace] = function ( selector, clear ) {
                    if ( typeof selector !== "undefined" ) {
                        var clear = ( typeof clear !== "undefined" ) ? clear : false;

                        if ( typeof $._jqache[options.namespace][selector] !== "undefined"&& !clear ) {
                            return $._jqache[options.namespace][selector];
                        } else if ( typeof $._jqache[options.namespace][selector] !== "undefined"&& clear ) {
                            return $._jqache[options.namespace][selector] = $( $._jqnsAssigned[options.namespace][selector] );
                        }
                    } else {
                        var i, result = [];

                        for (i in $._jqache[options.namespace] ) {
                            if ($._jqache[options.namespace].hasOwnProperty( i )) {
                                result.push($.q[options.namespace](i)[0]);
                            }
                        }

                        return $(result);
                    }
                };
                }
            }
    };

/**
 * @chainable
 * Clear the cache of all selectors.

	$.q.clear();
 * @param {String} [ns=blank] namespace to clear
 * @return {jQuery}
*/
    jQuery.q.clear = function(ns) {
        if ( typeof ns === "undefined" ) {
            $.each( $._jqache, function ( i, val ) {
                if ( typeof $._jqns[i] === "undefined" ) {
                    $.q( i, true );
                } else {
                    $.q.clear( i );
                }
            });
        } else {
            $.each( $._jqns[ns], function ( i, val ) {
                $.q[ns]( val, true );
            });
        }
    };
})(jQuery);

/**
 * Manage non-cookie based session info.  Uses localStorage/sessionStorage or javascript Session where they're not supported.
 * @singleton
*/
var Session = (function() {
	var store = null, cookie = null;
	
	//check support for localStorage/sessionStorage
	var isLocalStorage = function(key) {
		try {
			localStorage.setItem(key, key);
			localStorage.removeItem(key);
			return true;
		} catch(e) {
			return false;
		}
	}('__test');

	var isSessionStorage = function(key) {
		try {
			sessionStorage.setItem(key, key);
			sessionStorage.removeItem(key);
			return true;
		} catch(e) {
			return false;
		}
	}('__test');
	
	//Try to fallback to JS session object in old browsers
		//this will problably fail for https iframes or if window.open is called with a named window
	if (!isLocalStorage && !isSessionStorage) {
		var win;
	try {
			win = window.top || window;
			store = !!win.name && win.name !== 'undefined' && !FED.Util.isNumeric(win.name) ? $.parseJSON(win.name) : {};
		}
	catch (e) {
		//Handle cases where code is writing garbage to the name var, probably due to wrongly scoped 'name' variable
		//or a window.open with a name
		store = {};
	}
	}

	/**
	* Save store on page unload
	* @private
	* @return void
	*/
	function save() {
		//serialize the store to js (window) session object
		win.name = serialize(store);
	}
	function serialize(value) {
		//don't want turn null into 'null' and don't want strings/numbers to get an exra set of quotes
		return value !== null && typeof value === 'object' ? JSON.stringify(value) : value;
	}
	function deserialize(value) {
		if (!value) {
			return null;
		}
		//it if looks like a an object or array try to convert from string
		if (value[0] === '{' || value[0] === '[') {
			value = $.parseJSON(value);
		}
		
		return value;
		}

	// page unload event for browsers without localStorage/sessionStorage
	if (!isLocalStorage && !isSessionStorage) {
		$(window).on('unload', save);   
	}

	// public methods
	return {
		/**
		* Set a Session variable. Note values are always stored as strings, even if you store as non-string
		* @param {String} name key for the entry
		* @param {Mixed} value the value to be stored
		* @param {Boolean} [sessionOnly=false] false will save to persistent localStorage, true will save to non-persistent sessionStorage (e.g. like a session cookie)
		*/
		set: function(name, value, sessionOnly) {
			value = serialize(value);
			
			//if it's a null, we need to do a remove (like cookies)
			var op = (value === null || value === undefined) ? 'removeItem': 'setItem';
			
			//eliminate the fallback first, since there's no concept of session-only
			if (store) {
				store[name] = value;
				return;
			}
					
			if (sessionOnly === true) {
				//session, then local
				window[isSessionStorage ? 'sessionStorage' : 'localStorage'][op](name, value);
			}
			else {
				//local, then session
				window[isLocalStorage ? 'localStorage' : 'sessionStorage'][op](name, value);
			}
		},
		
		/**
		* Get a Session value.
		* @param {String} name key for the entry
		* @return {String} the matching value or null.
		*/
		get: function(name) {
			if (isLocalStorage || isSessionStorage) {
				//localStorage is the default
				return deserialize(localStorage.getItem(name) || sessionStorage.getItem(name));
			}
			else {
				//look for it in JS session
				return (store && store[name]) || null;
			}
		},
		
		/**
		* Clear Session - remove all entries
		*/
		clear: function() {
			if (isLocalStorage || isSessionStorage) {
				localStorage.clear();
				sessionStorage.clear();
			}
			else {
				store = {};
				save();
			}
		}
	};
})();

/**
 * @member FED
 * Onready handling for NewUtility
*/
FED.onReady = function () {
/*
	if ($('body.ie6').length || $('body.ie7').length) {
		if (!shc.storeName) {
			shc.storeName = FED.Util.getRootDomain().replace('.com', '').replace('.', '');
		}
		alert(String.format('To access all the great features of {0}, please upgrade your browser.',
			shc.storeName.substr(0, 1).toUpperCase() + shc.storeName.substr(1)));
	}
*/	
	//Attempt to find bad coding in HEAD tag before we hit prod. This doesn't catch everything due to the way
	//FF/Chrome proactively move bad stuff out of HEAD and into BODY as part of rendering, but usually will work in IE.
	if (/(qa\.ecom\.)|(localhost)|(dev\.ch3\.)|(pilot\.ch4)/.test(location.host)) {
		if ($('head').children('input').length) {
			alert('HEAD tag violates page construction rules: INPUT is not allowed.');
			$('head').children('input').each(function() {
				var el = $(this);
				if (el.is('input')) {
					alert('INPUT id=' + (el.attr('id') || 'none') + ' name=' + (el.attr('name') || 'none'));
				}
			});
		}
		if (document.compatMode === "BackCompat" ) {
			alert('Current page is running in quirks mode. Validate the HTML page for invalid structure.');
		}
	}

	//Set global defaults for $.ajax calls.  No other code should call $.ajaxSetup to avoid impacting other code.
	$.ajaxSetup({
		dataType: 'text',
		//look for the new global timeout var from circuitbreaker config first. 0==unlimited
		timeout: typeof shcParams !== 'undefined' ? shcParams.ajaxTimeout : 0
	});

	//this runs before any ajax call is made to do any neccesary pre-config
	$.ajaxPrefilter(function(options, originalOptions, xhr) {
		//3rd Party ajax calls get a forced timeout.  Anything with a non-'www' subdomain is considered x-domain here.
		if (options.crossDomain && options.url.indexOf('shld.net') < 0) {
			options.timeout = 1000 * (typeof shcParams !== 'undefined' ? shcParams.ajaxTimeout3P : 7);
			if (/qa\.ecom\.|staging\.|prestage\.|localhost|dev\.ch3\./ig.test(location.host)) {
				//extend the 3rd party timeout for dev/test env
				options.timeout = options.timeout * 10;
			}
		}
	});

	$.q('body')
		.ajaxError(function(e, xhr, settings, error) {
			if (settings.dataType === 'script') {
				console.log(String.format('{0} in {1}\nUse jsLint to check for syntax errors.', error.message, settings.url));
			}
		});

	//dump all the ajax calls in debug mode
	if ($.query.GET('debug')) {
		$.q('body')
			.ajaxSend(function (e, xhr, settings) {
				xhr._timeStamp = e.timeStamp; //save the start time so we can calc duration
			})
			.ajaxComplete(function (e, xhr, settings) {
				//logs the request start time and duration
				//requests may not complete in order, so log entries may not be in timestamp order
				//jsonP,script calls don't fire this
				var ts = xhr._timeStamp;

				console.log(String.format('AJAX status:{0}, {1}ms, {2}:{3}, URL:{4}',
					xhr.status, e.timeStamp - ts, new Date(ts).toTimeString().substr(0,8), ts.toString().substr(10,3), settings.url));
			});
	}
};

/**
 * @class jQuery.iecors
 * @extends jQuery
 * Add support for cross-domain CORS support in IE
 * Plugin jquery.iecors.js
 * 
 */
(function($) {
	// Create the request object
	// (This is still attached to ajaxSettings for backward compatibility)
	$.ajaxSettings.xdr = function() {
		return (window.XDomainRequest ? new window.XDomainRequest() : null);
	};

	// Determine support properties
	(function(xdr) {
		$.extend($.support, {iecors: !!xdr});
	})($.ajaxSettings.xdr());

	// Create transport if the browser can provide an xdr
	if ($.support.iecors) {
		$.ajaxTransport(function(s) {
			var callback,
			xdr = s.xdr();

			return {
				send: function(headers, complete) {
					xdr.onload = function() {
						var headers = {'Content-Type': xdr.contentType};
						complete(200, 'OK', {text: xdr.responseText}, headers);
					};

					// Apply custom fields if provided
					if (s.xhrFields) {
						xhr.onerror = s.xhrFields.error;
						xhr.ontimeout = s.xhrFields.timeout;
					}

					xdr.open(s.type, s.url);

					// XDR has no method for setting headers O_o
					xdr.send((s.hasContent && s.data) || null);
				},
				abort: function() {
					xdr.abort();
				}
			};
		});
	}
})($);

//Notes with regard to comment formatting for documentation generation.
// 1) Comments of the following form are scanned to build the documentation using jsDuck.
// /**
//  * function comments/description
//  * @sometag1
//  * ..
// */
// 2) To include global functions in the 'Global' section, include the '@member Global' and '@method' tags.  This can also be
//    done to document String, Array, etc. additions.  e.g.  @member String
// 3) Example code can be included by leaving a blank line following the function description and indenting all the example
//    code with a single tab.
// 4) add tags for @param and @return (if needed) after the example code.
// 5) If function names don't follow naming conventions and start with an uppercase letter, you will need to include an '@method' tag to get
//    them to document correctly.
// 6) To get '#' symbols to appear in example code, double them.  For example $('##shcModal').shcCenter();
