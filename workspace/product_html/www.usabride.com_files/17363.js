var ShopgateMobileHeader = function (systemSettings, userSettings) {
	
	var host = (("https:" == document.location.protocol) ? "https://static-ssl.shopgate.com" : "http://static.shopgate.com"),
		settings = mergeOptions(systemSettings, userSettings);
	
	// "Konstanten" fuer verschiedene Smartphone Plattformen
	var CONST_WEBAPP = 0,
		CONST_IPHONE = 1,
		CONST_IPAD = 2,
		CONST_ANDROID = 3,
		CONST_BADA = 4,
		CONST_WP7 = 5,
		CONST_WP8 = 6;
		
	var headerButton = null,
		scriptParams = null,
		stores = null,
		getParams = decodeSearchPath(),
		redirectCM = null,
		httpRedirectCM = null;
	
	this.create = function() {
		// Script nur ausfuehren, wenn die Seite auf einer der unterstuetzen Plattformen aufgerufen wurde
		if (getUserAgent() !== false && getUserAgent() !== CONST_WP7) {
			// Defaultwerte fuer die Scriptfunktionen
			scriptParams = {
				backReferenceParam: 'shopgate_redirect',
				mobileHeaderId: 'shopgate_mobile_header',
				buttonWrapperId: 'shopgate_mobile_button',
				buttonPanelText: '',
				buttonBelowHeader: true,
				buttonDisable: false,
				btnImageSrcOn: host + '/api/mobile_header/button_on.png',
				btnImageSrcOff: host + '/api/mobile_header/button_off.png',
				btnClassNameOn: 'sg_mobile_button_on',
				btnClassNameOff: 'sg_mobile_button_off',
				mobileHeaderText: '',
				storeLink: null,
				storeLogoSrc: null,
				cookieShowName: 'shopgate_show_mobile_header',
				cookieShowDefault: 1,
				cookieShowExpires: 10,
				cookieRedirectName: 'shopgate_redirect_to_webapp',
				cookieHTTPRedirectName: 'SHOPGATE_MOBILE_WEBPAGE',
				cookieHTTPRedirectExpires: 10,
				cookieRedirectDefault: 1,
				cookieRedirectExpires: 7,
				cookieRandomNumberName: 'shopgate_random_number',
				cookieRandomNumberExpires: 7,
				cookieRandomNumberDefault: 0,
				styleHeaderParent: 'body',
				styleButtonParent: 'body',
				styleBgColorTop: '#A80050',
				styleBgColorMiddle: '#A80050',
				styleBgColorBottom: '#A80050'
			};
	
			mobileHeaderTexts = {
						buttonPanelText: 'Activate mobile website'
			};
					
			// Icons und Marktplatz-App-Links fuer die veschiedenen Plattformstores
			stores = new Array();
			stores[CONST_IPHONE] = {
				logo: host + '/api/mobile_header/logo_app_store.png',
				marketplaceLink: 'http://itunes.apple.com/de/app/id365287459?mt=8',
				platformName: 'iPhone',
				paramPrefix: 'iphone'
			};
			
			stores[CONST_IPAD] = {
				logo: host + '/api/mobile_header/logo_app_store.png',
				platformName: 'iPad',
				paramPrefix: 'ipad'
			};
			
			stores[CONST_BADA] = {
				logo: host + '/api/mobile_header/logo_app_store.png',
				platformName: 'Bada',
				paramPrefix: 'bada'
			};
			
			stores[CONST_WP8] = {
				logo: host + '',
				platformName: 'Windows Phone 8',
				paramPrefix: 'wp8'
			};
			
			stores[CONST_ANDROID] = {
				logo: host + '/api/mobile_header/logo_app_store.png',
				marketplaceLink: '',
				platformName: 'Android',
				paramPrefix: 'android'
			};
			stores[CONST_WEBAPP] = {
				logo: host + '/api/mobile_header/logo_app_store.png',
								marketplaceLink: 'http://{SHOP_NUMBER}.shopgate.com',
								platformName: 'Web',
				paramPrefix: 'web'
			};

			// Manager fuer das Redirect-Cookie erstellen
			redirectCM = new CookieManager(scriptParams, 'Redirect');
			httpRedirectCM = new CookieManager(scriptParams, 'HTTPRedirect');
			
			// Pruefen ob ein Redirect aus der Webapp stattgefunden hat. Dann Redirect deaktivieren
			if (getParams != false && getParams[scriptParams.backReferenceParam] == 1) {
				redirectCM.setStatusOff();
			}

			if (!checkRandomRedirect()) {return false;}

			// Weiterleitung auf Webapp - wenn gewuenscht
			if (settings.redirect_to_webapp == true && redirectCM.getStatus() == 1) {
				createWebappUrl(true);
			} else {
				if (!settings.is_domready_disabled) {
					// Neues Dom-Event definieren, um IE Eigenheiten zu kompensieren
					addDomReadyEvent();
					// Wenn das DOM fertig gerendert ist, wird das Script ausgefuehrt
					window.onDomReady(initShopgateMobileHeader);
				} else {
					initShopgateMobileHeader();
				}
			}
		}
	};
	
	this.destroy = function(){
		headerButton.destroy();
	};

	function checkRandomRedirect() {
		if (typeof settings.redirect_percentage == 'undefined' || settings.redirect_percentage == 0 || settings.redirect_percentage > 99) {
			return true;
		} else {
			var randomNumberCm = new CookieManager(scriptParams, 'RandomNumber');
			randomNumber = parseInt(randomNumberCm.getValue());

			if (!randomNumber) {
				randomNumber = Math.floor(Math.random() * (100)) + 1;
				randomNumberCm.setValue(randomNumber);
			}

			if (randomNumber <= settings.redirect_percentage) {
				return true;
			} else {
				return false;
			}
		}
	}
	
	// Script initialisieren
	function initShopgateMobileHeader() {
		
		if (getUserAgent() !== false && setOptions() !== false && checkHeaderButtonStatus()) {
			// Button erzeugen
			headerButton = new ShopgateMobileHeaderButton(scriptParams);
			
			if (scriptParams.buttonBelowHeader == true) {
				var firstChild = document.querySelector(scriptParams.styleHeaderParent).firstChild;
				document.querySelector(scriptParams.styleHeaderParent).insertBefore(headerButton.create(), firstChild);
			} else {
				document.querySelector(scriptParams.styleButtonParent).appendChild(headerButton.create());
			}
		}
	}
	
	/**
	 * Prueft, ob der HeaderButton angezeigt werden soll
	 * @returns {Boolean} TRUE der Button angezeigt werden soll
	 */
	function checkHeaderButtonStatus() {
		if (!checkDefaultRedirectStatus() || scriptParams.buttonDisable == true) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * Prueft, ob beim default Redirect-Typ weitergeleitet werden soll
	 * @returns {Boolean} TRUE wenn weitergeleitet werden soll
	 */
	function checkDefaultRedirectStatus() {
		if (typeof settings.redirect != 'undefined' && settings.redirect == 'default' && 
			typeof settings.is_default_redirect_disabled != 'undefined' && settings.is_default_redirect_disabled == true) {
			return false;
		} else {
			return true;
		}
	}
		
	/**
	 * Übertraegt User-Parameter in die Script-Parameter und setzt die passenden Shop-Links und -Logos
	 * @returns {Boolean} TRUE wenn Optionen korrekt gesetzt wurden, FALSE im Fehlerfall
	*/
	function setOptions() {
		var client = getUserAgent();
		if (typeof userSettings != 'object') {userSettings = new Object();}
		
		// Gernerierung des MobileHeaders verhindern, wenn dies von Hand fuer die aktuelle Plattform gesetzt wurde
		if (typeof stores[client] != 'undefined' && settings[stores[client].paramPrefix] !== false) {
			// Beschriftung fuer Button setzen
			scriptParams.buttonPanelText = mobileHeaderTexts.buttonPanelText;
			
			// HTML-Elemente bestimmen, die MobileHeader und Button aufnehmen
			if (settings.css_selector) {
				scriptParams.styleHeaderParent = settings.css_selector;
				scriptParams.styleButtonParent = settings.css_selector;
			}
			
			if (settings.style_button_parent) {
				scriptParams.styleButtonParent = settings.style_button_parent;
			}
			
			if (typeof settings.button_below_header  == 'boolean') {
				scriptParams.buttonBelowHeader = settings.button_below_header;
			}
			
			if (typeof settings.is_mobile_button_disabled  == 'boolean') {
				scriptParams.buttonDisable = settings.is_mobile_button_disabled;
			}
			
			if (typeof settings.is_mobile_button_disabled  == 'boolean') {
				scriptParams.buttonDisable = settings.is_mobile_button_disabled;
			}
			
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * Erzeugt eine URL zu einer Einzelwebapp - basierend auf der Shop-Nummer
	 * @param {boolean} redirect Legt fest, ob ein Redirect zur erzeugten URL durchgefuehrt werden soll
	 * @returns {Mixed} URL zu einer Einzelwebapp bei Erfolg. Andernfalls FALSE
	 */

	function createWebappUrl(redirect) {
		
		if (settings.shop_number) {
			
			var rules = {"start":[{"a":"","p":[]}],"default":[{"a":"","p":[]}],"redirect_from_webshop":[{"a":"redirect_from_webshop","p":[]}],"item":[{"a":"item","p":[{"p":"item_number","t":0,"h":true,"ae":false}]},{"a":"itempublic","p":[{"p":"item_number_public","t":0,"h":true,"ae":false}]}],"category":[{"a":"category","p":[{"p":"category_number","t":0,"h":true,"ae":false}]}],"cms":[{"a":"cms","p":[{"p":"cms_page","t":0,"ae":false}]}],"brand":[{"a":"brand","p":[{"p":"brand_name","t":1,"n":"q"}]}],"search":[{"a":"search","p":[{"p":"search_query","t":1,"n":"s"}]}]},
				backLinkRegex = new RegExp('(\\?*||\\&*)(' + scriptParams.backReferenceParam + '=)(1|0)'),
				ignoredParams = ['webapp_c_name', 'shop_alias', 'host', 'debug', 'debug_platform', 'is_mobile_button_disabled'],
				redirectType = null, documentUrl = '', webappUrl = '', query = [];
			
			if (settings.webapp_c_name) {
				webappUrl = settings.webapp_c_name;
			} else if (settings.shop_alias) {
				webappUrl = stores[CONST_WEBAPP].marketplaceLink.replace(/{SHOP_NUMBER}/, settings.shop_alias);
			} else {
				webappUrl = stores[CONST_WEBAPP].marketplaceLink.replace(/{SHOP_NUMBER}/, settings.shop_number);
			}
		
			// Shopgate-Redirect-Parametern aus Parametern entfernen
			documentUrl = document.location.href.replace(backLinkRegex, '');
			
			if (_shopgate.shop_item_number) {_shopgate.redirect = 'item'; _shopgate.item_number = _shopgate.shop_item_number;}

			redirectType = typeof _shopgate.redirect != 'undefined' ? _shopgate.redirect : 'start';
			
			if (checkDefaultRedirectStatus()) {
				urlParams = _getUrlParams(redirectType);
				
				if (urlParams != null) {
					webappUrl += urlParams.u;
					if (urlParams.q.length > 0)
						query = urlParams.q;
				} else {_shopgate.error = 1; webappUrl += '/redirect_from_webshop';}
				
				if (redirectType == 'redirect_from_webshop' || urlParams == null) {
					for (prop in _shopgate) {
						var ignoreParam = false;
						for (i in ignoredParams) {if (ignoredParams[i] == prop) {ignoreParam = true; break;}}
						if (ignoreParam == false) {query.push(prop + '=' + encodeURIComponent(_shopgate[prop]));};
					}
					
					if (settings.referrer_url) {
						query.push('referrer=' + encodeURIComponent(settings.referrer_url));
					} else {
						query.push('referrer=' + encodeURIComponent(documentUrl));
					}
				}
				
				if(settings.tracking_params && getParams){
					for (var para in settings.tracking_params) {
						if(settings.tracking_params.hasOwnProperty(para) && getParams[settings.tracking_params[para]]){
							query.push(settings.tracking_params[para] + '=' + getParams[settings.tracking_params[para]]);
						}
					}
				}
				
			} else {
				redirect = false;
			}
			
			
			if (redirect == true) {
				var queryString = query.join('&');
				if (queryString.length > 0) {queryString = '?'+ queryString;}
				
				if (settings.web_app_url) {
					window.location = settings.web_app_url + queryString;
				} else {
					window.location = webappUrl + queryString;
				}
				
				
			} else {
				return webappUrl;
			}
		} else {
			return false;
		}
		
		function _getUrlParams(type) {
			var error = true,
				result = {'u': '', 'q': []};
			
			if (typeof rules[type]) {
				var ruleSet = rules[type], url = null;
				error = false;
				
				for (var i = 0; i < ruleSet.length; i++) { 		
					var rule = ruleSet[i], ruleSetError = false;
					url = [rule['a']];
					
					for (var j = 0; j < rule['p'].length; j++) {
						var tmp = rule['p'][j];
												if(typeof _shopgate[tmp['p']] !== 'undefined') {
														if (typeof tmp['ae'] !== 'undefined' && tmp['ae'] == false) {
								if (_shopgate[tmp['p']] == '') {ruleSetError = true; break;}
							}
							if (tmp['t'] == 0) {
															tmp['h'] ? url.push(_bin2hex(_shopgate[tmp['p']])) : url.push(_shopgate[tmp['p']]);
							} else if (tmp['t'] == 1) {
															result.q.push(tmp['n'] + '=' + encodeURIComponent(_shopgate[tmp['p']]));
							}
						} else {
							ruleSetError = true;
						}
					}
					
					if (!ruleSetError) {
						break;
					} else {
						if (ruleSet.length == i + 1) {
							error = true;
						} else {
							ruleSetError = false;
						}
					}
				}
	
				result.u = url.join('/');
				if (result.u.length > 0) {result.u = '/' + result.u;}
			}
	
			return error ? null : result;
		}
	
		function _bin2hex(s) {
			s = unescape(encodeURIComponent(s));
			var i, f = 0, a = []; s += ''; f = s.length;
			for (i = 0; i < f; i++) {a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/,"0$1");}
			return a.join('');
		}
	}
	
	/**
	 * Verschmilzt die Einstellungen aus den System- und User-Einstellungen
	 * @param {object} systemOptions Vom System generierte Einstellungen
	 * @param {object} userOptions Benutzerdefinierte Einstellungen
	 * @returns {object} Das resultierende Objekt
	 */
	function mergeOptions(systemOptions, userOptions){

		var mergedOptions = {};
		// Beide Objekte sind vorhanden -> verschmelzen
		if (typeof systemOptions == 'object' && typeof userOptions == 'object') {
			for (attrname in systemOptions) { mergedOptions[attrname] = systemOptions[attrname]; }
			for (attrname in userOptions) { mergedOptions[attrname] = userOptions[attrname]; }
			return mergedOptions;
		} else {
		// Nur die generierten Einstellungen sind vorhanden
			return systemOptions;
		}
	}
	
	/**
	 * Prueft, ob die Seite mit auf einem Geraet der unterstuetzen Plattformen aufgerufen wurde
	 * @returns {Mixed} Plattformkonstante bei Erfolg, FALSE bei Misserfolg
	 */
	function getUserAgent() {
		var userAgent = navigator.userAgent,
			s = settings;
		
		if (s.debug == true && typeof s.debug_platform == 'number') {
			return s.debug_platform;
		}
		
		if (userAgent.match(/opera mini/i)) {
			return false;
		} else if (typeof s.disable_redirect == 'boolean' && s.disable_redirect == true) {
			return false;
		} else if (userAgent.match(/shopgate/i)) {
			return false;
		} else if (userAgent.match(/redirectbot/i)) {
			return CONST_IPHONE;
		} else if (userAgent.match(/iPhone|iPod/i)) {
			return CONST_IPHONE;
		} else if (userAgent.match(/iPad/i)) {
			return s.is_tablet_redirect ? CONST_IPAD : false;
		} else if (userAgent.match(/ARCHOS 80G9|Android 3|Kindle|Nexus 7|playbook|Silk|SC-01C|SHW-M180S|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC(.Flyer|\_Flyer)|Sprint.ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos.S7|Dell.Streak.7|Advent.Vega|A101IT|A70BHT|MID7015|Next2|nook|X7GS|Android; Tablet|SM-P6\d{2,3}\s|SM-P9\d{2,3}\s|SM-T7\d{2,3}\s|SM-T8\d{2,3}\s|SM-T9\d{2,3}\s|SM-T3\d{2,3}\s|SM-T2\d{2,3}\s|SM-T1\d{2,3}\s|Nexus 10|GT-P10|GT-N80|xoom|TF101|GT-P\d{4}\s|Transformer|MD_LIFETAB_P9516|LIFETAB_S9714|AT100|AT200|AT300|AT10LE-A|A500|A510|A511|A200|A701|Slider SL101|ME302C|ME102A|ME302KL|IdeaTab\sS6000|B8000-F|SGP3\d{2,}|SGP5\d{2,}|VT10416/i)) {
			return s.is_tablet_redirect ? CONST_IPAD : false;
		} else if (userAgent.match(/Android/i)) {
			return CONST_ANDROID;
		} else if (userAgent.match(/Windows Phone OS 7/i)) {
			return false;
		} else if (userAgent.match(/Windows Phone 8/i)) {
			return CONST_WP8;
		} else if (userAgent.match(/Bada/i)) {
			return false;
		} else {
			return false;
		}
	}
	
	/**
	 * Dekodiert die GET-Parameter der URL
	 * @retuns {mixed} Objekt mit Parameter-Keys als Attribute bei Erfolg. FALSE bei Misserfolg
	*/
	function decodeSearchPath() {
		var params = {};
	   
		if (location.search.length > 0) {
			var get_param_str = location.search.substring(1, location.search.length),
				get_params = get_param_str.split("&");
			
			for (var i = 0; i < get_params.length; i++) {
				var key_value = get_params[i].split("=");
				if(key_value.length == 2) {
					var key = key_value[0],
						value = key_value[1];
					params[key] = value;
				}
			}
	    	
	    	return params;
	   } else {
			return false;
	   }
	}

	/**
	 * Definiert ein neues DOMReady-Ereignis um Probleme mit IE zu kompensieren
	 */
	function addDomReadyEvent() {
		// create onDomReady Event
		window.onDomReady = initReady;
	
		// Initialize event depending on browser
		function initReady(fn) {
			//W3C-compliant browser
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", fn, false);
			} else { // IE
				document.onreadystatechange = function(){readyState(fn);};
			}
		}
	
		// IE execute function
		function readyState(func) {
			// DOM is ready
			if (document.readyState == "interactive" || document.readyState == "complete") {
				func();
			}
		}
	}
		
	/**
	 * Erzeugt ein Panel mit Button ueber den der ShopgateMobileHeader ein- / ausgeblendet werden kann
	 * @class
	 * @param {object} scriptParams JS-Objekt mit Scriptparametern
	 */
	ShopgateMobileHeaderButton = function(scriptParams) {
		var params = scriptParams,
			cookie = new CookieManager(params, 'Show'),
			mobileHeader = new ShopgateMobileHeader(params);
		
		/**
		 * MobileHeaderButton erzeugen
		 * @public
		 * @returns {object} Panel mit Button
		 */
		this.create = function() {
			var textElement = document.createTextNode(params.buttonPanelText),
				wrapper = createButtonWrapper();
			
			wrapper.appendChild(textElement);
			wrapper.appendChild(createButton(redirectCM.getStatus()));
				
			return wrapper;
		};
		
		this.destroy = function() {
			mobileHeader.destroy();
			var button = document.getElementById(params.buttonWrapperId);
			if (button) {
				button.parentNode.removeChild(button);
			}
		};

		/**
		 * Erzeugt ein DIV-Panel, das den Button umschliesst
		 * @returns {object} HTML-Element
		 */
		function createButtonWrapper() {
			var wrapper = document.createElement('div');
			
			wrapper.id = params.buttonWrapperId;
			
			// Styles fuer ButtonWrapper setzen
			wrapper.style.lineHeight = '30px';
			wrapper.style.fontSize = '30px';
			wrapper.style.fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
			wrapper.style.fontWeight = 'bold';
			wrapper.style.textAlign = 'left';
			wrapper.style.backgroundColor = '#FFF';
			wrapper.style.border = '1px solid #ADADAD';
			wrapper.style.clear = 'both';
			wrapper.style.color = '#222';
			wrapper.style.margin = '20px auto';
			wrapper.style.marginBottom = '40px';
			wrapper.style.padding = '15px';
			wrapper.style.position = 'relative';
			wrapper.style.width = '560px';
			wrapper.style.borderRadius = '8px';
			wrapper.style.WebkitBorderRadius = '8px';
			wrapper.style.MozBorderRadius = '8px';
			
			return wrapper;
		}
		
		/**
		 * Erzeugt einen Button mit dem der ShopgateMobileHeader an-/ ausgeschaltet werden kann
		 * @param {boolean} switchedOn Setzt den Status des Buttons (TRUE -> An / FALSE -> Aus)
		 * @returns {object} HTML-Element
		 */
		function createButton(switchedOn) {
			var btnImage = document.createElement('img');
			
			// Button-Grafik fuer den gewueschten Zustand setzen
			if (switchedOn) {
				btnImage.src = params.btnImageSrcOn;
				btnImage.className = params.btnClassNameOn;
				// mobileHeader erzeugen
				//mobileHeader.create();
								
			} else {
				btnImage.src = params.btnImageSrcOff;
				btnImage.className = params.btnClassNameOff;
			}
			
			// Styles fuer Button-Grafik setzen
			btnImage.style.background = 'none';
			btnImage.style.margin = '0px';
			btnImage.style.padding = '0px';
			btnImage.style.border = 'medium none';
			btnImage.style.verticalAlign = 'baseline';
			btnImage.style.height = '45px';
			btnImage.style.position = 'absolute';
			btnImage.style.right = '15px';
			btnImage.style.top = '7px';
			
			// Click-Event erzeugen, um den Zustand des Buttons zu wechseln
			btnImage.onclick = function(event) {
				// Button ist momentan auf 'an' gestellt
				if (this.className == params.btnClassNameOn) {
					// Button-Klasse und Grafik in 'aus'-Zustand wechseln
					this.className = params.btnClassNameOff;
					this.src = params.btnImageSrcOff;
					
					// Cookie-Status anpassen und MobileHeader entfernen
					redirectCM.setStatusOff();
				//	mobileHeader.destroy();

				// Button ist momentan auf 'aus' gestellt
				} else if (this.className == params.btnClassNameOff) {
					// Button-Klasse und Grafik in 'an'-Zustand wechseln
					this.className = params.btnClassNameOn;
					this.src = params.btnImageSrcOn;
					
					// Cookie-Status anpassen und MobileHeader erzeugen
					redirectCM.setStatusOn();
					httpRedirectCM.deleteCookie();
					
					window.setTimeout(function() {
						createWebappUrl(true);
					}, 500);
					
					
				//	mobileHeader.create();
				}
			};
			return btnImage;
		}
	};
	/**
	 * Klasse zur Verwaltung des MobileHeader-Cookies
	 * @class
	 * @param {object} scriptParams JS-Objekt mit Scriptparametern
	 */
	CookieManager = function (scriptParams, type) {
		var params = scriptParams,
			cookieRegExp = new RegExp(params['cookie' + type + 'Name']),			// regExp-Objekt fuer die Suche nach dem Cookie
			cookieRegExpOn = new RegExp(params['cookie' + type + 'Name'] + '=1'),	// regExp-Objekt fuer die Suche nach einem aktivierten Cookie
			expires = '; expires=',									// String-Rumpf fuer das Ablaufdatum
			path = '; path=/';
		
		this.status = construct();
		
		/**
		 * Cookiestatus auslesen / Cookie neu anlegen
		 * @returns {Boolean} Cookie-Status TRUE wenn der Header angezeigt werden soll, FALSE wenn nicht
		 */
		function construct() {
			
			// Ablaufdatum generieren
			var expiryDate = new Date();
			expiryDate.setTime(expiryDate.getTime() + (params['cookie' + type + 'Expires'] * 24 * 60 * 60 * 1000));
			expires += expiryDate.toGMTString();
			
			// auslesen / anlegen
			if (document.cookie && document.cookie.match(cookieRegExp)) {
				if (document.cookie.match(cookieRegExpOn)) {
					return true;
				} else {
					return false;
				}
			} else {
				document.cookie = params['cookie' + type + 'Name'] + '=' + params['cookie' + type + 'Default'] + expires + path;
				return params['cookie' + type + 'Default'] == 1 ? true : false;
			}
		}

		/**
		 * Gibt den aktuellen Status fuer die Headeranzeige zurueck
		 * @public
		 * @returns {Boolean} TRUE wenn der Header angezeigt werden soll, FALSE wenn nicht
		 */
		this.getStatus = function () {
			return this.status;
		};
		
		/**
		 * Setzt den Status auf 'Header anzeigen'
		 * @public
		 */
		this.setStatusOn = function() {
			document.cookie = params['cookie' + type + 'Name'] +'=1' + expires + path;
			this.status = true;
		};
		/**
		 * Setzt den Status auf 'Header verbergen'
		 * @public
		 */
		this.setStatusOff = function() {
			document.cookie = params['cookie' + type + 'Name'] +'=0' + expires + path;
			this.status = false;
		};

		this.setValue = function(value) {
			if (!value) {return false;}
			document.cookie = params['cookie' + type + 'Name'] +'='+value + expires + path;
		};

		this.getValue = function() {
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var allCookies = document.cookie.split(';'),
				name = params['cookie' + type + 'Name'];
				for (index in allCookies) {
					var cookie = allCookies[index].trim();

					// current cookie corresponds with the searched cookie
					if (cookie.substr(0,name.length + 1) == (name + '=')) {
						var tmpValue = cookie.substr(name.length + 1);
						cookieValue = decodeURIComponent(cookie.substr(name.length + 1) ? cookie.substr(name.length + 1) : '');
						break;
					}
				}
			}

			return cookieValue;
		}

		/**
		 * Loescht das Cookie
		 * @public
		 */
		this.deleteCookie = function() {
			document.cookie = params['cookie' + type + 'Name'] +'=0; expires=Thu, 01 Jan 1970 00:00:01 GMT' + path;
			this.status = false;
		};
	};
};

var _shopgate_system_options = {"shop_number":"17363","redirect_to_webapp":true,"is_default_redirect_disabled":false,"is_domready_disabled":false,"tracking_params":{"0":"gclid","1":"utm_source","2":"utm_medium","3":"utm_campaign","4":"utm_term","5":"utm_content"},"shop_alias":"usabride","is_tablet_redirect":true};

try {
	if (typeof _shopgate == 'object') {
		var _shopgate_mobile_header = new ShopgateMobileHeader(_shopgate_system_options, _shopgate);
	} else if (typeof _sg_user_options == 'object') {
		var _shopgate_mobile_header = new ShopgateMobileHeader(_shopgate_system_options, _sg_user_options);
	} else {
		var _shopgate_mobile_header = new ShopgateMobileHeader(_shopgate_system_options);
	}
	_shopgate_mobile_header.create();
} catch(err){}
