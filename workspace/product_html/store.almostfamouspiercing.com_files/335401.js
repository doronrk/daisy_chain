var flxpxlObj = (function() {
	var obj = {};

	obj.version = '1';

	obj.execute = function() {

		var bodyHTML = '';
		var bodyText = '';
		var bodyNormalized = '';
		var currentQueryTemp = '';
		var currentFunction = function(){};

		// Page group: all pages
		var conditions_358710 = {};
		setTimeout(function() {
		function pageGroup_358710() {
			obj.placeAppNexusSegmentScript('seg?add=1604132&t=1', null, null, null, 'None', '');
		}
		currentFunction=function(queryId){return (function(){queryId&&(conditions_358710[queryId]=true);if(checkConditions(conditions_358710)){pageGroup_358710();}});};
		if(
			(window.location.href != '')
		) {
			if(checkConditions(conditions_358710)){pageGroup_358710();}
		}
		}, 1);

		// Page group: organic
		var conditions_358711 = {};
		setTimeout(function() {
		function pageGroup_358711() {
			obj.placeAppNexusSegmentScript('seg?add=1604140&t=1', null, null, null, 'Organic', '');
		}
		currentFunction=function(queryId){return (function(){queryId&&(conditions_358711[queryId]=true);if(checkConditions(conditions_358711)){pageGroup_358711();}});};
		if(
			(flxKeyword != '')
		) {
			if(checkConditions(conditions_358711)){pageGroup_358711();}
		}
		}, 1);



	}; // end execute

	obj.placePixel = function(url, tagId) {
		if(tagId && tagsPlaced[tagId]) {
			return;
		} else if(tagId) {
			tagsPlaced[tagId] = 1;
		}
		var i = document.createElement("img");
		i.onload = function(){};
		i.src = obj.fixUrl((url + '')).replace('{iatRandom}', obj.randomId());
	};

	obj.placeCode = function(code, tagId) {
		if(tagId && tagsPlaced[tagId]) {
			return;
		} else if(tagId) {
			tagsPlaced[tagId] = 1;
		}
		var scriptCode = [];
		code = "" + code;
		if(code.toLowerCase().indexOf("<scr"+"ipt") > -1) {
			var d = document.createElement("div");
			d.innerHTML = "_" + code;
			var scripts = d.getElementsByTagName("script");
			for(var i=0, len=scripts.length; i < len; i++) {
				if(scripts[i].src) {
					scriptCode.push({url: scripts[i].src});
				} else {
					scriptCode.push({evalSrc: scripts[i].innerHTML});
				}
			}
			for(var j=scripts.length-1; j >= 0; j--) {
				scripts[j].parentNode.removeChild(scripts[j]);
			}
			code = d.innerHTML.substring(1);
		}
		obj.placeHtml(code);
		if(scriptCode.length) {
			 scriptsToPlace = scriptsToPlace.concat(scriptCode);
		}
		return scriptCode;
	};

	obj.placeScript = function(url, tagId) {
		if(tagId && tagsPlaced[tagId]) {
			return;
		} else if(tagId) {
			tagsPlaced[tagId] = 1;
		}
		var script = document.createElement("script");
		script.async = true;
		script.type = "text/javascript";
		script.src = obj.fixUrl(url).replace('{iatRandom}', obj.randomId());
		document.getElementsByTagName('head')[0].appendChild(script);
	};

	obj.placeHtml = function(code, tagId) {
		if(tagId && tagsPlaced[tagId]) {
			return;
		} else if(tagId) {
			tagsPlaced[tagId] = 1;
		}
		df.innerHTML += code.replace('{iatRandom}', obj.randomId());
	};

	obj.placeAppNexusScript = function(code, tagId, purchaseIntegration, scVariable) {
		code = window.location.protocol == 'https:' ? 'https://secure.adnxs.com/' + code : 'http://ib.adnxs.com/' + code;
		if(purchaseIntegration && purchaseIntegration != 'None') {
			code = code + obj.getIntegrationData(purchaseIntegration, scVariable);
		}
		obj.placeScript(code, tagId);
	};

	obj.placeAppNexusSegmentScript = function(code, tagId, purchaseIntegration, scVariable, keywordType, queryParam) {
		if(keywordType && keywordType == 'Organic') {
			if(flxKeywordHash) {
				code += '&other=' + escape(flxKeywordHash);
			}
		} else if(keywordType && keywordType == 'Custom') {
			var customKeyword = flxGetKeyword(queryParam);
			var hash = '';
			if(customKeyword) {
				hash = flxSendKeyword(customKeyword);
			}
			if(hash) {
				code += '&other=' + escape(hash);
			}
		} else if(keywordType && keywordType == 'Both') {
			var customKeyword = flxGetKeyword(queryParam);
			var hash = '';
			if(customKeyword) {
				hash = flxSendKeyword(customKeyword);
			}

			if(hash) {
				code += '&other=' + escape(hash);
			} else {
				if(flxKeywordHash) {
					code += '&other=' + escape(flxKeywordHash);
				}
			}
		}
		obj.placeAppNexusScript(code, tagId, purchaseIntegration, scVariable);
	};

	obj.getIntegrationData = function(purchaseIntegration, scVariable) {
		var ret = '';
		var orderId = '';
		var revenue = 0;
		if(purchaseIntegration == 'Google Analytics') {
			var html = document.body.innerHTML;
			//async
			if(html.indexOf('_gaq.push') != -1) {
				try {
					orderId = html.split('_addTrans')[1].split('_trackTrans')[0].split(',')[1].match(/['"].*?['"]/g)[0].replace(/['"]/g, '');
				} catch(e){};
				try {
					revenue = parseFloat(html.split('_addTrans')[1].split('_trackTrans')[0].split(',')[3].match(/['"].*?['"]/g)[0].replace(/['"]/g, ''));
				} catch(e){};
				if(!revenue) {
					try {
						revenue = parseFloat(html.split('_addTrans')[1].split('_trackTrans')[0].split(/\,\s+.*/g)[2].match(/['"].*?['"]/g)[0].replace(/['"]/g, ''));
					} catch(e){}
				}
			}

			//sync
			if(!orderId && !revenue) {
				try {
					orderId = html.split('_addTrans')[1].split('_trackTrans')[0].split(',')[0].match(/['"].*?['"]/g)[0].replace(/['"]/g, '');
				} catch(e){};
				try {
					revenue = parseFloat(html.split('_addTrans')[1].split('_trackTrans')[0].split(',')[2].match(/['"].*?['"]/g)[0].replace(/['"]/g, ''));
				} catch(e){};
			}
		} else if(purchaseIntegration == 'Adobe SiteCatalyst') {
			try {
				if(!scVariable) {
					scVariable = 's';
				}
				if(window[scVariable]) {
					orderId = window[scVariable].purchaseID;
				}
			} catch(e){};
			try {
				if(window[scVariable]) {
					var productsVar = window[scVariable].products;
					if(productsVar) {
						var products = productsVar.split(',');
						for(var i=0; i<products.length; i++) {
							var items = products[i].split(';');
							if(items.length > 3 && items[3]) {
								revenue += parseFloat(items[3], 10);
							}
						}
					}
				}
			} catch(e){};
		} else if(purchaseIntegration == 'Qubit Universal Variable') {
			try {
				if(window.universal_variable && window.universal_variable.transaction) {
					orderId = window.universal_variable.transaction.order_id;
					revenue = window.universal_variable.transaction.total;
				}
			} catch(e){}
		}

		if(orderId) {
			ret += '&order_id=' + encodeURIComponent(orderId);
		}
		if(revenue) {
			ret += '&value=' + encodeURIComponent(revenue);
		}
		return ret;
	};

	obj.randomId = function() {
		return (new Date()).getTime() + '' + (Math.random() * 1e16);
	};

	obj.fixUrl = function(url) {
		if(url.substring(0, 5) === 'http:') {
			return url;
		}
		if(url.substring(0, 6) === 'https:') {
			return url;
		}
		return "//" + url;
	};

	obj.scriptEval = function(script) {
		if (window.execScript) {
			window.execScript(script);
		} else {
			var f = function () {
				eval.call(window, script);
			};
			f();
		}
	};

	obj.placeScripts = function(scripts) {
		for(var i=0, len=scripts.length; i<len; i++) {
			if(scripts[i].url) {
				obj.placeScript(scripts[i].url);
			} else if(scripts[i].evalSrc) {
				obj.scriptEval(scripts[i].evalSrc);
			}
		}
	};

	function getTextContentExceptScript(element) {
		var text = [];
		var self = arguments.callee;
		var el, els = element.childNodes;

		for (var i=0, iLen=els.length; i<iLen; i++) {
			el = els[i];
			if (el.nodeType == 1 && el.tagName && el.tagName.toLowerCase() != 'script' && el.tagName.toLowerCase() != 'noscript' && el.tagName.toLowerCase() != 'style') {
				text.push(self(el));
			} else if (el.nodeType == 3) {
				text.push(el.data);
			}
		}
		return text.join(' ').replace(/\s{2,}/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}

	function checkConditions(conditions) {
		for(var i in conditions) {
			if(conditions.hasOwnProperty(i)) {
				if(!conditions[i]) {
					return false;
				}
			}
		}
		return true;
	}
    
    var visibilityObj = null;
    var flxKeyword = '';
    var flxCustomKeyword = '';
    var flxKeywordHash = '';
    var flxCustomKeywordHash = '';
    var flxRewriteDocumentWrite = true;

	
	
	

	
	
	
	
	
    
    
    
    flxKeyword = (function(referrer) {
	var search = [
		{
			domain: ['google.', 'googlesyndication.com'],
			query: ['q', 'as_q']
		},
		{
			domain: ['altavista.co', 'altavista.de'],
			query: ['q', 'r']
		},
		{
			domain: ['.aol.', 'suche.aolsvc.de'],
			query: ['q', 'query']
		},
		{
			domain: ['ask.jp', 'ask.co'],
			query: ['q', 'ask']
		},
		{
			domain: ['www.baidu.com', 'www.baidu.jp'],
			query: ['wd', 'word']
		},
		{
			domain: ['daum.net', 'search.daum.net'],
			query: ['q']
		},
		{
			domain: ['icqit.com'],
			query: ['q']
		},
		{
			domain: ['bing.com'],
			query: ['q']
		},
		{
			domain: ['myway.com'],
			query: ['searchfor']
		},
		{
			domain: ['naver.com', 'search.naver.com'],
			query: ['query']
		},
		{
			domain: ['netscape.com'],
			query: ['query', 'search']
		},
		{
			domain: ['reference.com'],
			query: ['q']
		},
		{
			domain: ['seznam'],
			query: ['w']
		},
		{
			domain: ['abcsok.no'],
			query: ['q']
		},
		{
			domain: ['tiscali.it', 'www.tiscali.co.uk'],
			query: ['key', 'query']
		},
		{
			domain: ['virgilio.it'],
			query: ['qs']
		},
		{
			domain: ['yahoo.com', 'yahoo.co.jp'],
			query: ['p', 'va']
		},
		{
			domain: ['yandex'],
			query: ['text']
		},
		{
			domain: ['startgoogle.startpagina.nl'],
			query: ['q']
		}
	];

	// parseUri 1.2.2
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License
	function parseUri (str) {
		var	o   = parseUri.options,
			m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
			uri = {},
			i   = 14;

		while (i--) uri[o.key[i]] = m[i] || "";

		uri[o.q.name] = {};
		uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
			if ($1) uri[o.q.name][$1] = $2;
		});

		return uri;
	};

	parseUri.options = {
		strictMode: false,
		key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
		q:   {
			name:   "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		}
	};

	function getKeyword(referrer, search) {
		var uri = parseUri(referrer);
		for(var i = 0, j = search.length; i < j; i++) {
			var queryStringsToLookFor = search[i].query;
			for(var k = 0, m = search[i].domain.length; k < m; k++) {
				var domainToSearchFor = search[i].domain[k];
				if(uri.host.indexOf(domainToSearchFor) != -1) {
					for(var z = 0, x=queryStringsToLookFor.length; z < x; z++) {
						if(uri.queryKey[queryStringsToLookFor[z]]) {
							return uri.queryKey[queryStringsToLookFor[z]];
						}
					}
					break;
				}
			}
		}
		return '';
	}

	var keyword = getKeyword(referrer, search);
	keyword = unescape(keyword).replace('+', ' ').toLowerCase();
	return keyword;
})(window.flxUnitTestReferrer || document.referrer);
    
    
    
    function sendRequest(url) {
	var img = new Image();
	img.onload = function(){};
	img.src = url;
}

var keywordsSent = {};
function flxSendKeyword(keyword) {
	if(keyword) {
		if(!keywordsSent[keyword]) {
			sendRequest('//ib.adnxs.com/getuid?https://dm6ndb2k9edja.cloudfront.net/k.gif?pubID=335401&' + '&keyword=' + encodeURIComponent(keyword) + '&AnId=$UID' + '&url=' + encodeURIComponent(window.location.href.split('#')[0].split('?')[0].substring(0,500)) + '&ref=' + encodeURIComponent(document.referrer.substring(0, 500)));
			keywordsSent[keyword] = 1;
		}
		return keyword;
	}
	return '';
}

if(typeof(flxKeyword) != 'undefined' && flxKeyword) {
	flxSendKeyword(flxKeyword);
} else {
	flxSendKeyword("CaptifyNoKeyword");
}

    
    

    function timeout(numberOfSeconds, funcToExec) {
    	window.setTimeout(funcToExec, numberOfSeconds * 1000);
    	return false;
    }
	
	var tagsPlaced = {};
	var docFragment = document.createDocumentFragment();
	var df = document.createElement('div');
	df.style.display = 'none';
	df.id = 'iatDivInsert';
	docFragment.appendChild(df);
	var scriptsToPlace = [];
	
	var main = function() {
		obj.execute();

		if(document.body) {
			document.body.appendChild(docFragment);
		}

		var dwCodes = [];
		var dw = document.write;
		var dwl = document.writeln;
		document.write = document.writeln = function(html){dwCodes.push(html)};
		obj.placeScripts(scriptsToPlace);
		scriptsToPlace = [];
		obj.placeCode(dwCodes.join(''));
		obj.placeScripts(scriptsToPlace);

		if(flxRewriteDocumentWrite) {
			document.write = document.writeln = function(html){var scriptsToPlace = obj.placeCode(html); obj.placeScripts(scriptsToPlace);};
		}

		if(window.location.href.indexOf('iatDev=1') != -1) {
			document.cookie = "iatDev=1; path=/";
		} else if(window.location.href.indexOf('iatDev=0') != -1) {
			document.cookie = "iatDev=0; path=/";
		}
	};

	(function(i) {
	  var u = navigator.userAgent.toLowerCase();
	  var ie = !!window.ActiveXObject;
	  if (/webkit/.test(u) || (/mozilla/.test(u) && !/(compatible)/.test(u)) ||
				 (/opera/.test(u))) {
		// safari
		timeout = setTimeout(function(){
				if ( document.readyState == "loaded" || document.readyState == "interactive" || 
					document.readyState == "complete" ) {
					i();
				} else {
				  setTimeout(arguments.callee,10);
				}
			}, 10);
	  } else if (ie) {
		// IE
		(function (){ 
		  var tempNode = document.createElement('document:ready'); 
		  try {
			tempNode.doScroll('left'); 
			i(); 
			tempNode = null; 
		  } catch(e) { 
			setTimeout(arguments.callee, 0); 
		  } 
		})();
	  } else {
		window.onload = i;
	  }
	})(main);

	return obj;
})();