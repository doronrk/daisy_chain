var Expo = (function (){
	var trackUrl = 'http://ets.expotv.com',
		trackGif = '/_xpa.gif?',
		permData = {},
		browserDataSet = false,
		expoCookie = '';

	var fireTracker = function(data) {
		var requestUrl 	= assembleRequestUrl(data),
			image 		= new Image(1,1);

			image.onLoad = function() {};
			image.src = requestUrl;
	}

	var assembleRequestUrl = function(data) {
		var randomStr = '&rand=' + Math.random().toString().split('.')[1];

		return trackUrl + trackGif + createQueryString(data) + randomStr;
	}

	var createQueryString = function(data) {
		var query = [];

		for(var prop in data) {
			if(data.hasOwnProperty(prop) && data[prop])
				query.push(encodeURIComponent(prop) + '=' + encodeURIComponent(JSON.stringify(data[prop])));
		}

		return query.join('&');
	}

	var addPageLanguage = function(data) {
		permData['us_lng'] = document.documentElement.lang;
	}

	var addUserAgent = function() {
		permData['us_ua'] = navigator ? navigator.userAgent : '';
	}

	var addPageData = function(data) {
		permData['pg_dom'] = window.location.hostname;
		permData['pg_url'] = window.location.href;
		permData['pg_ref'] = window.location.referrer;
	}

	var sanityCheckData = function(eventData) {
		return eventData && typeof eventData === 'object' ? eventData : {};
	}

	var getBrowserData = function() {
		if(!browserDataSet) {
			addPageLanguage();
			addUserAgent();
			addPageData();

			browserDataSet = true;
		}
	}

	var readOrSetCookie = function() {
		var browserCookie = document.cookie.replace(/(?:(?:^|.*;\s*)expo_us_llt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

		var generateUuid = function() {
			var createUuid = function(c) {
				var r = Math.random()*16|0,
					v = c == 'x' ? r : (r&0x3|0x8);
	    		return v.toString(16);
			}

			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, createUuid);
		}

		var setCookie = function() {
			var now = new Date(),
				oneYearFromNow = now.getTime() + (1000 * 60 * 60 * 24 * 365),
				uuid = generateUuid(),
				expires;

			now.setTime(oneYearFromNow);
			expires = now.toGMTString();

			document.cookie = 
				'expo_us_llt=' 	+ uuid 		+
				'; expires=' 	+ expires 	+ 
				'; path=/';

			return uuid;
		}

		if(!expoCookie) {
			if(browserCookie) {
				expoCookie = browserCookie;
			} else {
				expoCookie = setCookie();
			}
		}
	}

	var getCookieData = function(eventData) {
		eventData['us_llt'] = expoCookie;
	}

	var getElementsByClassName = function(className) {
	    var matching = [],
	    	re = new RegExp('(^| )'+className+'( |$)'),
	    	allElems;

		if(document.getElementsByClassName) 
			return document.getElementsByClassName(className);

		allElems = document.getElementsByTagName("*");

	    for(var i=0;i<allElems.length;i++) {
	    	if(re.test(allElems[i].className))
	    		matching.push(allElems[i]);
	    }

	    return matching;
	}

	var changeExpoLinks = function() {
		var expoLinks 	= getElementsByClassName('_expoLink'),
			dataSrc,
			i;

		for(i=0;i<expoLinks.length;i++) {
			dataSrc = expoLinks[i].getAttribute('data-src');

			if(dataSrc)
				expoLinks[i].setAttribute('data-src', rewriteExpoLink(dataSrc));

			if(expoLinks[i].src)
				expoLinks[i].src = rewriteExpoLink(expoLinks[i].src);

			if(expoLinks[i].href)
				expoLinks[i].href = rewriteExpoLink(expoLinks[i].href);
		}
	}

	var rewriteExpoLink = function(url) {
		var	cookieStr 	= 'us_llt=' + expoCookie;

		if(url.indexOf('us_llt') !== -1)
			return url;

		if(url.indexOf('?') !== -1)
			return url + '&' + cookieStr;
		else
			return url + '?' + cookieStr;
	}

	var mergeObjects = function(obj1, obj2) {
		var objNew = {};

		for (var prop in obj1) {
			if(obj1.hasOwnProperty(prop))
				objNew[prop] = obj1[prop];
		}

		for(var prop in obj2) {
			if(obj2.hasOwnProperty(prop))
				objNew[prop] = obj2[prop];
		}

		return objNew;
	}

	var Expo = function(eventData) {
		var eventData = sanityCheckData(eventData);

		readOrSetCookie();
		changeExpoLinks();
		permData = mergeObjects(permData, eventData);

		browserDataSet = false;
	};

	Expo.prototype = {

		trackPageView: function(eventData) {
			var eventData = sanityCheckData(eventData);

			eventData['ev_ty'] = 'page';
			eventData['ev_nt'] = 'load';

			this.trackEvent(eventData);
		},

		trackEvent: function(eventData){
			var eventData = sanityCheckData(eventData);
			
			getBrowserData();
			getCookieData(eventData);

			fireTracker(mergeObjects(permData, eventData));
		},

		modifyExpoLinks: function() {
			changeExpoLinks();
		}
	}

	return Expo;
}());Expo.PlayerConfigurator = (function() {

    var cleanPlayerObject = function(playerObj) {
        if(playerObj.video)
            delete playerObj.video;

        if(playerObj.playerKey)
            delete playerObj.playerKey;

        if(playerObj.customBgColor)
            delete playerObj.customBgColor;

        return playerObj;
    };

    var mergeRecursive = function(toObj, fromObj) {
        for (var prop in fromObj) {
            if(fromObj.hasOwnProperty(prop)) {
                try {
                  if (fromObj[prop].constructor == Object) {
                    toObj[prop] = mergeRecursive(toObj[prop], fromObj[prop]);
                  } else {
                    toObj[prop] = fromObj[prop];
                  }
                } catch(e) {
                  toObj[prop] = fromObj[prop];
                }
            }
        }

        return toObj;
    };

    var clone = function(obj) {
        var copy = {};

        for(var attr in obj) {
            if(obj.hasOwnProperty(attr))
                copy[attr] = obj[attr];
        }

        return copy;
    };

    var prependPathToPlugins = function(playerObj) {
        if(playerObj.plugins && playerObj.pluginUrl)
        {
            var pluginUrl = playerObj.pluginUrl;
            var plugins = clone(playerObj.plugins);

            for(var plugin in plugins)
            {
                if(playerObj.plugins.hasOwnProperty(plugin))
                {
                    playerObj.plugins[pluginUrl + plugin] = playerObj.plugins[plugin];
                    delete playerObj.plugins[plugin];
                }
            }

            delete playerObj.pluginUrl;
        }

        return playerObj;
    };

    var constructor = function PlayerConfigurator() {
        var params = {}, config = {}, merged = {};

        this.addPlayerConfig = function(callback) {
            var supportsXHR = window.XDomainRequest ? false : true;
            var requestPrefix = "http://client.expotv.com/video/config";
            var requestString = params.video ?
                                requestPrefix + "/" + params.video + "/" + params.playerKey :
                                requestPrefix + "/" + params.playerKey;
            var configRequest = window.XDomainRequest ? new window.XDomainRequest() : new XMLHttpRequest();

            var responseReceived = function() {
                var configObj = JSON.parse(configRequest.responseText);

                for(var key in configObj) {
                    if(configObj.hasOwnProperty(key)) {
                        config[key] = configObj[key];
                    }
                }

                merged = mergeRecursive(config, params);

                callback();
            };

            if(supportsXHR) {
                configRequest.onreadystatechange = function(e) {
                    if(this.readyState == 4){
                        responseReceived();
                    }
                }
            } else {
                configRequest.onload = responseReceived;
            }
            configRequest.open("GET", requestString, true);

            //The following 3 lines and subsequent setTimeout are to mitigate
            //a timeout bug in IE
            configRequest.onprogress = function(){ };
            configRequest.ontimeout = function(){ };
            configRequest.onerror = function () { };

            setTimeout(function(){ configRequest.send(); }, 0);
        };

        this.addParam = function(paramName, paramValue) {
            var paramStr = "";
            var nameArray = paramName.split("_");

            for(var i=0;i<nameArray.length;i++) {
                paramStr += '{"' + nameArray[i] + '":';
            }

            paramStr += '"' + paramValue + '"';

            for(var i=0;i<nameArray.length;i++) {
                paramStr += "}";
            }

            params = mergeRecursive(params, JSON.parse(paramStr));
        };

        this.createPlayerScript = function(id) {
            var playerScript,
                playerObj = clone(merged);

            playerObj = prependPathToPlugins(playerObj);
            playerObj = cleanPlayerObject(playerObj);

            playerScript = "jwplayer('expoPlayer" + id + "').setup(";
            playerScript += JSON.stringify(playerObj);
            playerScript += ");";

            return playerScript;
        };

        this.getPlayerObject = function() {
            return merged;
        }
    };

    return constructor;

})();Expo.Player = (function (){

	var insertScript = function(scriptName, callback) {
		var firstScript = document.getElementsByTagName('script')[0];
		var script = document.createElement('script');

		script.type = "text/javascript";
		script.src = scriptName;

		script.onload = script.onreadystatechange = function() {
			if(script.readyState && script.readyState !== "complete" && script.readyState !== "loaded") {
				return false;
			}
			script.onload = script.onreadystatechange = null;
			callback();
		};

		firstScript.parentNode.insertBefore(script, firstScript);
	};

	var insertJWPlayerJs = function(backgroundColor, callback) {
		var backgroundColorQuery;

		if(window.jwplayer) {
			callback();
			return;
		}

		backgroundColorQuery = backgroundColor ? '?custom_bg_color=' + backgroundColor : '';

		insertScript('http://wwwcdn.expotv.com/js/mediaPlayer/v5/jwplayer.js' + backgroundColorQuery, function() {
			insertScript('http://wwwcdn.expotv.com/js/mediaPlayer/v5/jwkey.js', function() {
				if(typeof JSON === 'undefined' || JSON.stringify === 'undefined') {
					insertScript('http://wwwcdn.expotv.com/js/mediaPlayer/v5/json2.js', function() {
						callback();
					});
				} else {
					callback();
				}
			});
		});
	};

	var getParamElements = function(expoObject) {
		if(navigator.appVersion.indexOf("MSIE 7") != -1 || navigator.appVersion.indexOf("MSIE 8") != -1) {			
			var params = [];

			for(var i=0;i<expoObject.childNodes.length;i++){
				if(expoObject.childNodes[i].tagName == 'PARAM')
					params.push(expoObject.childNodes[i]);
			}

			return params;
		} else {
			return expoObject.getElementsByTagName('param');
		}
	};

	var getParams = function(expoObject) {
		var paramElems = getParamElements(expoObject);
		var paramName, paramValue, params = {};

		for(var i=0;i<paramElems.length;i++) {
			paramName = paramElems[i].getAttribute('name');
			paramValue = paramElems[i].getAttribute('value');
			params[paramName] = paramValue;
		}

		return params;
	};

	var createPlayerDiv = function(id) {
		var playerDiv = document.createElement('div');

		playerDiv.id = 'expoPlayer' + id;

		return playerDiv;
	};

	var createPlayer = function(id, params, callback) {
		var configurator = new Expo.PlayerConfigurator(),
			playerScript = document.createElement('script'),
			playerObject;

		playerScript.id = "expoPlayerScript";
		playerScript.type = "text/javascript";

		for(var key in params) {
			if(params.hasOwnProperty(key)) {
				configurator.addParam(key, params[key]);
			}
		}

		configurator.addPlayerConfig(function(){
			playerObject = configurator.getPlayerObject();
			playerScript.text = configurator.createPlayerScript(id);
			callback(playerScript, playerObject);
		});
	};

	var getElementsByClassName = function(className) {
		var matching = [];
		var re = new RegExp('(^| )'+className+'( |$)');
		var allElems = document.getElementsByTagName("*");

		for(var i=0;i<allElems.length;i++) {
			if(re.test(allElems[i].className))
				matching.push(allElems[i]);
		}

		return matching;
	};

	var firePlayerLoadEvent = function(playerObject) {
		this.trackEvent({
			ev_ty:	'videoplayer',
			ev_nt:	'load',
			vd_id:	playerObject.video,
			pl_ky:	playerObject.playerKey,
			type: 	'expo'
		});
	};

	Expo.prototype.swapVideo = function(expoObjectId, videoId, extraParams) {
		var	expoObject = document.getElementById(expoObjectId),
			currentPlayerScript  = document.getElementById('expoPlayerScript'),
			self = this;

		params = getParams(expoObject);
		params.video = videoId;
		
		if(extraParams) {
			for(var param in extraParams) {
				if(extraParams.hasOwnProperty(param))
					params[param] = extraParams[param];
			}
		}

		createPlayer(expoObjectId, params, function(playerScript, playerObject) {
			insertJWPlayerJs(playerObject.customBgColor, function() {
				currentPlayerScript.parentNode.replaceChild(playerScript, currentPlayerScript);
				firePlayerLoadEvent.call(self, playerObject);
			});
		});

	};

	Expo.prototype.loadAllVideos = function() {
		var	params,
			self = this,
			expoObjects = getElementsByClassName('_expoVideo');

		for(var i=0;i<expoObjects.length;i++) {
			if(expoObjects[i].tagName == 'OBJECT'){
				(function(i){
					params = getParams(expoObjects[i]);
					createPlayer(expoObjects[i].id, params, function(playerScript, playerObject) {
						insertJWPlayerJs(playerObject.customBgColor, function(){
							playerDiv = createPlayerDiv(expoObjects[i].id);
							expoObjects[i].parentNode.insertBefore(playerDiv, expoObjects[i]);
							expoObjects[i].parentNode.insertBefore(playerScript, expoObjects[i]);
							firePlayerLoadEvent.call(self, playerObject);
						});
					});
				})(i);
			}
		}
	};

	Expo.prototype.loadVideo = function(objectId) {
		var expoObject = document.getElementById(objectId),
			self = this;

		if(expoObject.tagName == 'OBJECT')
		{
			params = getParams(expoObject);
			createPlayer(expoObject.id, params, function(playerScript, playerObject) {
				insertJWPlayerJs(playerObject.customBgColor, function() {
					playerDiv = createPlayerDiv(expoObject.id);
					expoObject.parentNode.insertBefore(playerDiv, expoObject);
					expoObject.parentNode.insertBefore(playerScript, expoObject);
					firePlayerLoadEvent.call(self, playerObject);
				});
			});
		}
	};

}());