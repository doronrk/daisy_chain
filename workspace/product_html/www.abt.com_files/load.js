if (typeof mabayaWidget == 'undefined' && typeof mabayaWidget !== 'object') {
	var mabayaWidget = {
		integrated: 0
	};
}
mabayaWidget.integrated++;
mabayaWidget.Settings = {};
mabayaWidget.Settings.className = 'mabaya';
mabayaWidget.Settings.arrayDelimiter = ',';
mabayaWidget.Settings.autoload = false;
mabayaWidget.Settings.Attributes = {
	widgets: "data-widget"
};
mabayaWidget.Helper = {};
mabayaWidget.Helper.noop = function(arg) { return arg; };
mabayaWidget.Helper.each = function (obj, func) {

	if ((typeof obj == 'object') && obj || (typeof obj == 'function') && !('call' in obj)) {
		if ('length' in obj) {

			var l = obj.length;
			if (obj) {
				for (var t = 0; t < l; t++) {
					func(obj[t], t);
				}
			}
		}
		else {
			for (var key in obj) {
				func(obj[key], key);
			}
		}

	}
};
mabayaWidget.Helper.trim = typeof String.prototype.trim == 'function'
	? function (str) {
	return str.trim();
}
	: function (str) {
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
mabayaWidget.Helper.stripTags = function (str) {
	return mabayaWidget.Helper.trim(str)
		.replace(/<[^>]*>/g, '')
		.replace(/\s+/g, ' ');
};
mabayaWidget.Helper.isNode = function(node) {
	return (typeof node == 'object') && node && ('nodeType' in node) && (node.nodeType == 1)
};
mabayaWidget.Helper.indexOf = (typeof Array.prototype.indexOf == 'function')
	? function (arr, item) {
	return arr.indexOf(item);
}
	: function (arr, item) {
	var length = arr.length;
	for (var i = 0; i < length; i++) {
		if (arr[i] == item) {
			return i;
		}
	}
	return -1;
};
mabayaWidget.Helper.JSON = typeof JSON == 'object'
	? JSON
	: { parse: mabayaWidget.Helper.noop, stringify: mabayaWidget.Helper.noop };
mabayaWidget.Helper.Cookie = function (name, options) {
	var helper = mabayaWidget.Helper,
		defaults = {
			expires: 3600,
			path: '/',
			domain: document.location.host,
			secure: ''
		},
		settings = helper.extend(defaults, options || {});

	return {
		put: function (value) {

			switch (typeof value) {
				case 'undefined':
				case 'function' :
				case 'unknown'  :
					return false;
			}

			var str = [
				name, "=", escape(helper.JSON.stringify(value)),
				settings.expires ? '; expires=' + new Date(new Date().getTime() + (settings.expires * 1000)).toString() : '',
				settings.path ? '; path=' + escape(settings.path) : '',
				settings.domain ? '; domain=' + escape(settings.domain) : '',
				settings.secure ? '; secure' : ''
			].join('');

			try {
				window.document.cookie = str;
			}
			catch (e) {
				console.log('Cookie set failed/', e);
				return false;
			}
			return true;

		},

		remove: function () {

			try {
				window.document.cookie = [
					name, '=; expires=', new Date(new Date().getTime() - (3600 * 1000)).toString(),
					settings.path ? '; path=' + escape(settings.path) : '',
					settings.domain ? '; domain=' + escape(settings.domain) : '',
					settings.secure ? '; secure' : ''

				].join('');
			}
			catch (e) {
				console.log('Cookie removal failed', e);
				return false;
			}
			return true;
		},

		fetch: function () {

			var cookies = window.document.cookie.match(name + '=(.*?)(;|$)'),
				cookiesHash = cookies && cookies[1]
					? helper.JSON.parse(unescape(cookies[1]))
					: null,
				key = arguments && arguments.length && cookiesHash ? arguments[0] : null;


			return key
				? ((typeof cookiesHash == 'object') && (key in cookiesHash)) ? cookiesHash[key] : null
				: cookiesHash;

		}

	}
};
mabayaWidget.Helper.hasClass = function(elem, className) {
	var re = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
	return re.test(elem.className);
};
mabayaWidget.Helper.addClass = function(elem, className) {
	if(mabayaWidget.Helper.hasClass(elem, className)) return;
	elem.className = (elem.className + " " + className).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
};
mabayaWidget.Helper.removeClass = function(elem, className) {
	var re = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
	elem.className = elem.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
};
mabayaWidget.Helper.getElementsByClassName = typeof document.getElementsByClassName == 'function'
	? function (className, context) {
	var target = typeof context == 'undefined' ? document : context;
	return target.getElementsByClassName(className);
}
	: typeof document.querySelectorAll == 'function'
	? function (className, context) {
	var target = typeof context == 'undefined' ? document : context;
	return target.querySelectorAll('.' + className);
}
	: function (className, context) {
	var helper = mabayaWidget.Helper,
		target = typeof context == 'undefined' ? document : context,
		all = target.getElementsByTagName("*"),
		elements = [];

	helper.each(all, function (elem, i) {
		if (elem.className && helper.hasClass(elem, className) && mabayaWidget.Helper.indexOf(elements, elem) === -1) {
			elements.push(elem);
		}
	});

	return elements;
};
mabayaWidget.Helper.extend = function (dest, src) {
	for (var prop in src) {
		if (src[prop] && src[prop].constructor &&
			src[prop].constructor === Object) {
			dest[prop] = dest[prop] || {};
			arguments.callee(dest[prop], src[property]);
		} else {
			dest[prop] = src[prop];
		}
	}
	return dest;
};
mabayaWidget.Helper.attachStyle = (function () {
	var stylesTag = document.createElement('style'),
		headTag = document.getElementsByTagName('head');

	stylesTag.type = 'text/css';

	if (headTag) {
		headTag = headTag[0];
		headTag.appendChild(stylesTag);
	}

	return function (styles) {
		stylesTag.styleSheet
			? stylesTag.styleSheet.cssText += styles
			: stylesTag.innerHTML += styles;
	};
}());
mabayaWidget.Helper.randomString = function(r) {
	return Math.floor(Math.random() * Math.pow(10, r));
};
mabayaWidget.Helper.serialize = function (attrs) {

	var paramString = [];

	mabayaWidget.Helper.each(attrs, function (param, attr) {
		if (param) {

			if (typeof param == 'object') {

				if ('length' in param) {

					var arrayValue = [];
					mabayaWidget.Helper.each(param, function (val) {
						arrayValue.push(attr + '=' + encodeURIComponent(val))
					});

					paramString.push(arrayValue.join('&'));
				}
			}
			else {
				paramString.push(attr + '=' + encodeURIComponent(param));
			}
		}

	});

	paramString.push('rand=' + mabayaWidget.Helper.randomString(8));

	return paramString.join('&');

};
mabayaWidget.Helper.screenSize = ('innerWidth' in window) && ('innerHeight' in window)
	? function () {
	return {
		width: window.innerWidth,
		height: window.innerHeight
	}
}
	: function () {
	var doc = document.documentElement;

	return {
		width: doc.clientWidth,
		height: doc.clientHeight
	}
};
mabayaWidget.Helper.screenOrientation = function () {
	var sizes = mabayaWidget.Helper.screenSize();

	return sizes.width < sizes.height ? 'portrait' : 'landscape';
};
mabayaWidget.Helper.addEvent = ('addEventListener' in window)
	? function (elem, evtName, func) {
	return elem.addEventListener(evtName, func);
}
	: function (elem, evtName, func) {
	elem.attachEvent('on' + evtName, func);
};
mabayaWidget.Helper.removeEvent = ('removeEventListener' in window)
	? function (elem, evtName, func) {
	return elem.removeEventListener(evtName, func);
}
	: function (elem, evtName, func) {
	elem.detachEvent('on' + evtName, func);
};

mabayaWidget.Helper.parseUrl = function (url) {
	var pStr = '://',
		p = url.indexOf(pStr),
		hasProtocol = (p > 0),
		protocol = hasProtocol ? url.substring(0, p) : null,
		urlStr = url.substring(hasProtocol ? (p + pStr.length) : 0),
		hE = urlStr.indexOf('/'),
		hasPath = (hE > -1),
		host = urlStr.substr(0, hasPath ? hE : urlStr.length),
		pR = host.indexOf(':'),
		hasPort = (pR > -1),
		hostname = host.substring(0, hasPort ? pR : host.length),
		port = hasPort ? host.substring(pR + 1, host.length) : '',
		pathString = hasPath ? urlStr.substring(hE + 1) : '',
		s = pathString.indexOf('?'),
		h = pathString.indexOf('#'),
		hasSearch = (s >= 0),
		hasHash = (h >= 0),
		pathname = pathString
			.substring(0, hasSearch ? s : pathString.length )
			.substring(0, hasHash ? h : pathString.length),
		folders = pathname.split('/'),
		fileName = folders && folders.length ? folders.pop() : '',
		e = fileName.indexOf('.'),
		hasExtension = (e >= 0);

	if(folders.length && !folders[0]) {
		folders.shift();
	}

	return {
		protocol: protocol,
		host: host,
		hostname: hostname,
		port: port,
		origin: hasProtocol ? (protocol + pStr + host) : host,
		pathname: pathname ? ('/' + pathname) : '',
		filename: hasExtension ? fileName.substring(0, e): fileName,
		extension: hasExtension
			? fileName.substring(e + 1)
			: '',
		search: hasSearch ? pathString.substring(s, hasHash && h > s ? h : pathString.length) : '',
		hash: hasHash ? pathString.substring(h, hasSearch && s > h ? s : pathString.length) : '',
		folders: folders
	}

};
mabayaWidget.Helper.domReady = (function() {

	var w3c = !!document.addEventListener,
		loaded = false,
		toplevel = false,
		fns = [];

	if (w3c) {
		document.addEventListener("DOMContentLoaded", contentLoaded, true);
		window.addEventListener("load", ready, false);
	}
	else {
		document.attachEvent("onreadystatechange", contentLoaded);
		window.attachEvent("onload", ready);

		try {
			toplevel = window.frameElement === null;
		} catch(e) {}

		if ( document.documentElement.doScroll && toplevel ) {
			scrollCheck();
		}
	}

	function contentLoaded() {
		w3c
			? document.removeEventListener("DOMContentLoaded", contentLoaded, true)
			: document.readyState === "complete" && document.detachEvent("onreadystatechange", contentLoaded);
		ready();
	}

	function scrollCheck() {
		if (loaded) {
			return;
		}

		try {
			document.documentElement.doScroll("left");
		}
		catch(e) {
			window.setTimeout(scrollCheck, 15);
			return;
		}
		ready();
	}

	function ready() {
		if (loaded) {
			return;
		}
		loaded = true;

		for(var len = fns.length, i = 0; i < len; i++) {
			fns[i].call(document);
		}
	}

	return function(fn) {

		return (loaded
			|| document.readyState === "complete"
			|| document.readyState == "loaded"
			|| document.readyState == "interactive")
			? fn.call(document)
			: fns.push(fn);
	}
})();
mabayaWidget.Test = function () {
	var helper = mabayaWidget.Helper,
		testMode = new helper.Cookie('_mabayaTestMode');

	return {
		on: function () {
			return !!testMode.put(1);
		},
		off: function () {
			return !!testMode.remove();
		},
		mode: function () {
			return !!testMode.fetch();
		}
	}
}();

mabayaWidget.Request = function () {

	var privates = {
		ServerName: 'widget.mabaya.com',
		api: {},
		Methods: {
			http: function (path, params, success, error) {
				var isXDomain = window.XDomainRequest ? true : false,
					req = isXDomain
						? new window.XDomainRequest()
						: new XMLHttpRequest();

				if (!req) return;

				req.open("GET", privates.buildUrl(path, params), true);

				if (isXDomain) {
					req.onload = function () {
						if (typeof success == 'function') {
							success(req.responseText);
						}
					}
				}
				else {

					req.onreadystatechange = function () {
						if (req.readyState != 4) return;
						if (req.status != 200 && req.status != 304) {
							if (typeof error == 'function') {
								error();
							}
							return;
						}
						if (typeof success == 'function') {
							success(req.responseText);
						}
					};

				}

				if (req.readyState == 4) return;

				req.send();
			},
			jsonp: function (path, params, success, error) {
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.async = true;

				if (typeof success == 'function') {
					script.onload = success;
				}

				script.src = privates.buildUrl(path, params);


				var ref = document.getElementsByTagName('script')[0];
				ref.parentNode.insertBefore(script, ref);
			},
			img: function (path, params, success, error) {
				var img = document.createElement('img');
				img.src = privates.buildUrl(path, params);

				img.onload = function (e) {
					if (typeof success == 'function') {
						success.call(img, e);
					}

					if (img.parentNode == body) {
						body.removeChild(img);
					}

				};

				var body = document.getElementsByTagName('body');
				body = body && body.length ? body[0] : null;

				body.insertBefore(img, body.firstChild);

				img.style.height = '0';
				img.style.display = 'block';
			}
		},
		register: function (name, path, type) {
			var modifyParams = arguments.length > 3
				? arguments[3]
				: function(params) { return params; };

			if (type in privates.Methods) {
				privates.api[name] = function (params, success, error) {
					privates.Methods[type](path, modifyParams(params), success, error);
				}
			}
		},
		setServerName: function (name) {
			if (name) {
				this.ServerName = name;
			}
		},
		buildUrl: function (path, params) {

			return [
				document.location.protocol,
				'//',
				privates.ServerName,
				path,
				(params ? '?' + mabayaWidget.Helper.serialize(params) : '')
			].join('');
		}

	};

	return {
		serverName: privates.ServerName,
		setServerName: function(name) {
			privates.setServerName(name)
		},
		register: function(name, path, type) {
			privates.register.apply(this, arguments);
		},
		api: privates.api
	}

}();

mabayaWidget.Request.register('visit', '/pixel/visit', 'img', function (params) {
	mabayaWidget.Helper.extend(params, {
		url: document.location.href,
		referrer: document.referrer
	});
	return params;
});
mabayaWidget.Request.register('optimize', '/optimize', 'http');
mabayaWidget.Request.register('converse', '/pixel/conv', 'img');
mabayaWidget.Request.register('ad', '/serve/ad.jsonp', 'jsonp');

mabayaWidget.optimize = mabayaWidget.Request.api.optimize;
mabayaWidget.converse = mabayaWidget.Request.api.converse;
mabayaWidget.visit = mabayaWidget.Request.api.visit;
mabayaWidget.ad = mabayaWidget.Request.api.ad;

mabayaWidget.Widgets = {};

mabayaWidget.readAttributes = function () {
	var helper = mabayaWidget.Helper,
		settings = mabayaWidget.Settings,
		attributes = settings.Attributes,
		params = mabayaWidget.Widgets,
		containers = helper.getElementsByClassName(settings.className),

		scriptElement = function () {
			var helper = mabayaWidget.Helper,
				mabayaScripts = [],
				index = mabayaWidget.integrated - 1;

			helper.each(document.getElementsByTagName('script'), function(script) {
				if (script.src.indexOf('widget.mabaya.com/load.js') > -1 ) {
					mabayaScripts.push(script);
				}
			});

			return  (mabayaScripts.length >= index)
				? mabayaScripts[0]
				: null;

		}(),

		flag = 'tag=',
		hash = scriptElement && (scriptElement.src.indexOf(flag) > -1)
			? scriptElement.src.substring(scriptElement.src.indexOf(flag) + flag.length).replace(/&[^&]*]/)
			: '';

	settings.tag = hash;

	params.widgets = [];

	helper.each(containers, function (block, b) {
		var widget = block.getAttribute(attributes.widgets);

		if (widget) {
			params.widgets.push(widget.toLowerCase());

			helper.each(attributes, function (attr, param) {

				if(attr != attributes.widgets) {
					var currentAttrValue = block.getAttribute(attr);

					if (currentAttrValue) {

						if (currentAttrValue.indexOf(settings.arrayDelimiter) > -1) {
							var attrArray = [];

							helper.each(currentAttrValue.split(settings.arrayDelimiter), function (value, v) {
								attrArray.push(helper.trim(value));
							});

							params[param] = attrArray;
						}
						else {
							params[param] = currentAttrValue;
						}

					}
				}

			});

			if (!('tag' in params)) {
				params.tag = hash;
			}

			if (!('url' in params)) {
				params.url = document.location.href;
			}

			if (!('callback' in params)) {
				params.callback = 'mabayaWidget.render';
			}

			if (!('signals' in params)) {

				var defaultSignals = [],
					titleElements = document.getElementsByTagName('title'),
					h1Elements = document.getElementsByTagName('h1'),
					metaElements = document.getElementsByTagName('meta');

				helper.each(titleElements, function (titleElement) {
					var signal = helper.trim(titleElement.innerHTML);

					if (helper.indexOf(defaultSignals, signal) < 0) {
						defaultSignals.push(signal);
					}
				});

				helper.each(h1Elements, function (h1Element) {
					var signal = helper.trim(helper.stripTags(h1Element.innerHTML))

					if (helper.indexOf(defaultSignals, signal) < 0) {
						defaultSignals.push(signal);
					}
				});

				helper.each(metaElements, function (metaElement) {
					var name = metaElement.getAttribute('name'),
						content = null;

					if (name && name.toLowerCase().indexOf('keywords') > -1) {

						content = metaElement.getAttribute('content');

						if (content) {

							var signals = content.split(/\s*,\s*/g);

							helper.each(signals, function (metaSignal) {
								if (helper.indexOf(defaultSignals, metaSignal) < 0) {
									defaultSignals.push(metaSignal);
								}
							});
						}

					}

				});

				params.signals = defaultSignals;


			}
		}

	});
};
mabayaWidget.onBeforeRender = mabayaWidget.Helper.noop;
mabayaWidget.onAfterRender = mabayaWidget.Helper.noop;
mabayaWidget.render = function (responseObject) {

	var helper = mabayaWidget.Helper,
		settings = mabayaWidget.Settings,
		responseContent = typeof responseObject == "string"
			? JSON.parse(responseObject)
			: responseObject,
		widgetPayload = responseContent && typeof responseContent.payload == "object"
			? responseContent.payload
			: null,
		widgetAds = widgetPayload && typeof widgetPayload.ads == "object"
			? widgetPayload.ads
			: null,
		render = function (widgetHash) {

			if ("groupName" in widgetHash) {

				var containers = helper.getElementsByClassName(settings.className);

				helper.each(containers, function (block, b) {
					var blockWidgetId = block.getAttribute(settings.Attributes.widgets);

					if (blockWidgetId && blockWidgetId.toLowerCase() == widgetHash.groupName.toLowerCase()) {

						if ("css" in widgetHash) {
							helper.attachStyle(widgetHash.css);
						}

						if ("html" in widgetHash) {
							block.innerHTML = widgetHash.html;
						}

						mabayaWidget.onAfterRender(block, widgetHash.html, widgetHash.css);
					}

				});

			}
		};

	if (widgetAds) {

		widgetAds.length !== "undefined" && widgetAds.length
			? helper.each(widgetAds, render)
			: render(widgetAds);

	}


};

mabayaWidget.start = function () {
	mabayaWidget.Request.api.ad(
		mabayaWidget.Widgets,
		function (responseObject) {
			mabayaWidget.render(mabayaWidget.onBeforeRender(responseObject));
		}
	);
};

mabayaWidget.readAttributes();

mabayaWidget.isAllowed = function () {
	var isDevTag = (mabayaWidget.Settings.tag.indexOf('dev-') == 0),
		isConvertifier = (document.location.hostname.indexOf('convertifire') > -1);

	return (isDevTag == isConvertifier);
};

if (mabayaWidget.Settings.autoload) {
	mabayaWidget.start();
}
;mabayaWidget.Request.setServerName('us.widget.mabaya.com');;(function () {

	mabayaWidget.Test.on();		//	Remove this line, if you don't want ads to render

	if(!mabayaWidget.Test.mode()) {
		mabayaWidget.Widgets.callback = 'mabayaWidget.Helper.noop';
	}

	var storeHash = 'hashforabt',
		helper = mabayaWidget.Helper,
		breadcrumbItems = function() {
			var bcId = document.getElementById('breadcrumbs'),
				bcCn = helper.getElementsByClassName('bread_crumbs'),
				bcElem = bcId || (bcCn.length ? bcCn[0] : null);

			return bcElem ? bcElem.getElementsByTagName('a') : []
		}(),
		fill = function (target, signals) {
			var add = function (s) {
				if (target.indexOf(s) == -1) { target.push(s); }
			};

			(typeof signals == 'object') && ('length' in signals)
				? helper.each(signals, add)
				: add(signals);
		},
		newSignals = [],
		optimizeLocal = [],
		optimizeSignals = [],
		optimizeSaver = new helper.Cookie('_mabayaWidgetABT'),
		savedOptimizeSignals = optimizeSaver.fetch('optimizeSignals'),

		device = {
			orientation: helper.screenOrientation()
		},

		setOrientationClass = function () {
			var widgetElem = arguments.length ? Array.prototype.shift.call(arguments) : null,
				newOrientation = arguments.length ? Array.prototype.shift.call(arguments) : null,
				oldOrientation = arguments.length ? Array.prototype.shift.call(arguments) : null;

			if(oldOrientation) {
				helper.removeClass(widgetElem, 'mabaya-orientation-' + oldOrientation);
			}
			if(newOrientation) {
				helper.addClass(widgetElem, 'mabaya-orientation-' + newOrientation);
			}

		},

		locationFileName = helper.parseUrl(document.location.href),

		isSameReferrer = function() {
			var dmn = locationFileName.hostname,
				ref = helper.parseUrl(document.referrer).hostname;

			return dmn == ref;
		},

		isProductPage = ( (locationFileName.extension == 'html' && locationFileName.folders.length && locationFileName.folders[0] == 'product') ) ||
			(locationFileName.filename == 'product_details' && locationFileName.search.indexOf('product_id=') > -1);

	optimizeSaver.remove();

	var mobileFlag = 'category_id=',
		lX = locationFileName.search.indexOf(mobileFlag);

	helper.each(breadcrumbItems, function (breadcrumbItem) {

		if ((breadcrumbItem.nodeName.toLowerCase() == 'a') && ('href' in breadcrumbItem)) {
			var breadcrumbLink = helper.trim(breadcrumbItem.href),
				breadcrumbFile = helper.parseUrl(breadcrumbLink),
				sX = breadcrumbFile.search.indexOf(mobileFlag);

			if (breadcrumbFile.search && sX > -1) {
				fill(optimizeLocal, breadcrumbFile.search.substring(sX + mobileFlag.length).match(/[^&]*/) || [])
			}
			else if (breadcrumbFile.folders.length > 1 && breadcrumbFile.folders[0] == 'category') {
				fill(optimizeLocal, breadcrumbFile.folders[1])
			}

		}

	});

	if(locationFileName.search && lX > -1) {
		var	currentSignal = (lX >= 0) ? locationFileName.search.substring(lX + mobileFlag.length).match(/[^&]*/) : [];
		fill(newSignals, currentSignal);
	}
	else if (locationFileName.folders.length > 1 &&
		locationFileName.folders[0] == 'category' &&
		helper.indexOf(newSignals, locationFileName.folders[1]) < 0) {

		fill(newSignals, locationFileName.folders[1]);
	}

	if (!isProductPage) {
		fill(optimizeLocal, newSignals);
		optimizeSaver.put({ optimizeSignals: optimizeLocal });
	}

	mabayaWidget.optimizeScript = function () {

		if (isProductPage) {

			if (optimizeLocal.length) {
				fill(optimizeSignals, optimizeLocal);
			}

			if (savedOptimizeSignals && savedOptimizeSignals.length) {
				fill(optimizeSignals, savedOptimizeSignals);
			}

			if (optimizeSignals && optimizeSignals.length && isSameReferrer()) {

				var optimizeParams = {
					signals: optimizeSignals,
					tag: mabayaWidget.Settings.tag,
					storeHash: storeHash,
					mref: document.referrer
				};

				if (locationFileName.folders.length > 1 && locationFileName.folders[1]) {
					optimizeParams.productSiteId = locationFileName.folders[1];
				}

				mabayaWidget.optimize(optimizeParams);

			}

			optimizeSaver.remove();

		}

		mabayaWidget.visit({
			signals: newSignals,
			storeHash: storeHash
		});

	};

	mabayaWidget.onAfterRender = function (widgetBlock, widgetHtml, widgetCss) {

		setOrientationClass(widgetBlock, device.orientation);

		var handleOrientationClass = function() {
			var newDeviceOrientation = helper.screenOrientation();

			if(device.orientation != newDeviceOrientation) {

				var oldDeviceOrientation = device.orientation;
				device.orientation = newDeviceOrientation;

				setOrientationClass(widgetBlock, newDeviceOrientation, oldDeviceOrientation);
			}

		};

		helper.addEvent(window, 'resize', handleOrientationClass);

		//  rating
		var ratingElems = helper.getElementsByClassName('cl_rating', widgetBlock);
		helper.each(ratingElems, function(ratingElem) {
			var rating = parseFloat(ratingElem.title) * 2;
			ratingElem.style.backgroundPosition = '0 ' + (-18 * (isNaN(rating) ? 0 : rating)) + 'px';
		});
	};

	mabayaWidget.started = false;
	mabayaWidget.adScript = function () {

		mabayaWidget.readAttributes();

		var widget = mabayaWidget.Widgets,
			hasWidgets = widget.widgets.length > 0;

		widget.signals = newSignals;
		widget.storeHash = storeHash;

		if (newSignals.length && hasWidgets && !mabayaWidget.started) {
			mabayaWidget.started = true;
			mabayaWidget.start();
		}
	};

	mabayaWidget.optimizeScript();
	mabayaWidget.adScript();

})();