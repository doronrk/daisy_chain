/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> APP.JS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

// Semi-colon to assure functionality upon script concatenation and minification.
;


// If jQuery has not been loaded, load from google cdn.
if (!window.jQuery) {
	var s = document.createElement('script');
	s.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
	s.setAttribute('type', 'text/javascript');
	document.getElementsByTagName('head')[0].appendChild(s);
}


/**
* @class app
*/
var app = (function (app, $) {
	var _app = { // _app "inherits" app object via $.extend() at the end of this seaf (Self-Executing Anonymous Function)
		
		// ---------- Variables ----------
		
		URLs				: {}, // holds dw specific urls, check htmlhead.isml for some examples
		resources			: {}, // resource strings used in js
		forms				: {}, // place to hold things used in forms by js (wishlist)
		constants			: {}, // platform constants, initialized in htmlhead.isml
		orderData			: {
			products		: []
		}, // for js tracking
		searchResults		: {
			products		: []
		},
		ProductCache		: null,	// app.Product object ref to the current/main product
		ProductCacheRef		: {}, // app.ProductController object ref to the current/main product
		clearDivHtml		: '<div class="clear"></div>',
		currencyCodes		: {}, // holds currency code/symbol for the site
		trackingData		: [],
		fullviewurl			: '',
		rollup				: null, // Rollup AJAX page data
		
		paging: { // Transient Category Page Data.
			start			: null,
			end				: null,
			refinedURL		: null,
			categoryID		: null,
			categoryCount	: null,
			saleURL			: null
		},
		
		googleMapsAPI		: {loaded: false, loading: false},

		dialogSettings: { // Default jQuery UI Dialog settings.
			// bgiframe		: true,
			autoOpen		: false,
			buttons			: {},
			modal			: true,
			dialogClass		: 'genericpopup',
			overlay			: {opacity: 0.5, background: 'black'},
			height			: 530,
			width			: 800,
			title			: '',
			show			: {effect: 'fade', duration: 500},
			hide			: {effect: 'fade', duration: 500},
			resizable		: false,
			draggable		: false
		},

		tooltipSettings: { // Default jQuery UI Tooltip settings.
				delay		: 0,
				showURL		: false,
				extraClass	: 'tooltipshadow',
				top			: 15,
				left		: 5
		},

		validatorSettings: { // Default jQuery Validate settings.
			errorClass		: 'errorclient',
			errorElement	: 'span',
			validClass		: 'isvalid',
			errorPlacement	: function(error, element) {error.insertAfter(element);},
			success			: function(label) {label.remove();}
		},

		// ---------- Functions ----------

		/**
		* Initialize App
		*/
		init: function() {
			// init specific global components
			app.minicart.init();
			app.fixedmenu.init();
			app.quickView.init();
			app.tablet.init();
			app.giftcert.init();
			
			jQuery(document).bind('refreshCart', app.cart.refresh);
			
			// execute unobtrusive js code
			this.execUjs();
			
			app.tracking.shelf();
		},

		
		/**
		* Unobtrusive JS
		*/
		execUjs: function() {
			this.hiddenData();
			
			// init specific global components
			app.validation.init();
			app.tooltips.init();
		},
		
		/**
		* Grabs 'hidden' data and appends it to previous element. Mainly used for form/validation.
		*
		* <input class="text-box textinput required" id="recaptcha_response_field" type="text" name="recaptcha_response_field" value="" maxlength="30" />
		* <span class="hidden json">{label:"Enter code shown"}</span>
		*/
		hiddenData : function() {
			jQuery('.hidden').each(function() {
				var hiddenStr = jQuery(this).html();
				
				if (hiddenStr === '') {	return;	}
				
				// see if its a json string
				if (jQuery(this).hasClass('json')) {
					// try to parse it as a json
					try {
						hiddenStr = window['eval']('(' + hiddenStr + ')');
					} catch(e) {}				
				}
				jQuery(this).prev().data('data', hiddenStr);
				jQuery(this).remove();
			});
		}
		
		// ---------- Legacy ----------
		
		/**
		* These functions have been aliased and moved into their respective components below.
		*
		* app.refreshCart		= app.cart.refresh,
		* app.getProduct		= app.quickView.getProduct,
		* app.createDialog		= app.dialog.createDialog,
		* app.tooltip			= app.tooltips.tooltip,
		* app.tooltipDefault	= app.tooltips.init,
		* app.showProgress		= app.progress.show,
		* app.validator			= app.validation.init,
		*/

	};

	return $.extend(app, _app);
}(window.app = window.app || {}, jQuery));


/**
* @class app.cart
*/
(function (app, $) {	
	app.cart = {
		refresh: function() {
			app.quickView.close();
			app.page.refresh();
		},
		gotoCheckout: function() {
			app.page.redirect(app.URLs.showCart);
		}
	};
	
	// Legacy
	app.refreshCart = app.cart.refresh;
}(window.app = window.app || {}, jQuery));


/**
* @class app.page
*/
(function (app, $) {
	app.page = {
		redirect: function(newURL) {
			var t = setTimeout("window.location.href='"+newURL+"'", 0);
		},
		refresh: function() {
			// var t = setTimeout("window.location.assign(window.location.href);", 500);
			location.href = location.href;
		}
	};
}(window.app = window.app || {}, jQuery));


/**
* @class app.progress
*/
(function (app, $) {
	app.progress = {
		show: function(className, msg) {
			var classes = "loading";
			if (className != undefined) {
				classes += " " + className;
			}
			if (msg != undefined) {
				return jQuery('<div class="' + classes + '"><img src="' + app.URLs.loadingSmallImg + '" /><div class="msg">' + msg + '</div></div>');
			} else {
				return jQuery('<div class="' + classes + '"><img src="' + app.URLs.loadingSmallImg + '" /></div>');
			}		
		}
	};
	
	// Legacy
	app.showProgress = app.progress.show;
}(window.app = window.app || {}, jQuery));


/**
* @class app.tooltips
*/
(function (app, $) {
	var settings = app.tooltipSettings; // Inherit

	app.tooltips = {
		settings: settings,
		
		init: function () {	 
			jQuery('.tooltip').tooltip(jQuery.extend({}, app.tooltips.settings, {
					bodyHandler: function() {
						return jQuery(this).children('.tooltip-body').html();
					}
				}
			));
		},
		
		tooltip: function(options) { // Not Used
			if (options.id.charAt(0) !== '#') {
				options.id = '#'+options.id;
			}
			jQuery(options.id).tooltip(jQuery.extend({}, app.tooltips.settings, options.options));
		},
	};

	// Legacy
	app.tooltip = app.tooltips.tooltip;
	app.tooltipDefault = app.tooltips.init;
}(window.app = window.app || {}, jQuery));


/**
* @class app.validation
*/
(function (app, $) {
	var settings = app.validatorSettings; // Inherit

	jQuery.validator.addMethod("positivenumber", function(value, element) {
		if (value == '') return true;				
		return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value) && Number(value) >= 0;
	}, ""); // "" should be replaced with error message if needed

	app.validation = {
		settings: settings,
		init: function() {
			$("form:not(.suppress,.customvalidation)").each(function () {
				jQuery(this).validate(app.validation.settings);
			});
		}
	};

	// Legacy
	app.validator = app.validation.init;
}(window.app = window.app || {}, jQuery));


/**
* @class app.maps
*/
(function (app, $) {
	app.maps = {
		loadAPI: function() {
			if (app.googleMapsAPI.loaded == false && app.googleMapsAPI.loading == false) {
				if (typeof google === 'object' && typeof google.maps === 'object') {
					app.maps.APICallback();
					
				} else {
					app.googleMapsAPI.loading = true;
					
					var script = document.createElement("script");
					script.type = "text/javascript";
					script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyCLVuzJXzf7-NRpzKoLIvZ-7jGRM3-l8DU&sensor=false&callback=app.maps.APICallback";
					document.body.appendChild(script);
				}
			}
			
			return app.googleMapsAPI.loaded;
		},
		APICallback: function() {
			app.googleMapsAPI.loaded = true;
			app.googleMapsAPI.loading = false;
		}
	};
}(window.app = window.app || {}, jQuery));


/**
* @class app.user
*/
(function (app, $) {
	app.user = {
		info: {},
		clearInfo: function() {
			app.user.info = {};
		},
		setInfo: function(key, value) {
			app.user.info[key] = value;
		}
	};
}(window.app = window.app || {}, jQuery));


/**
* @class app.tracking
*/
(function (app, $) {
	app.tracking = {
		shelf: function() {
			if (!app.URLs.certona.enabled || typeof certonaResx === "undefined")
				return;
				
			var arr = [];
			var els = jQuery('#shelf-container .producttile .name a[rel]' + 
					', #wishlist-items .wishlistlineitem .product .sku .value' +
					', #search .first_three_products .nohits-images .image a[rel]' +
					', #main .cart .carttable .productattributes .productid .value' +
					', #page-wrapper.pt_cart .cart #cart-table .productattributes .productid .value');
			if (els.length <= 0) {
				if (jQuery('.cartempty').length > 0 || jQuery('#page-wrapper.pt_cart .cart #cart-table .tablerow').length > 0) {
					window.resx = new Object();
					resx.appid = app.URLs.certona.appid;
					resx.top1 = app.URLs.certona.top1;
					resx.top2 = app.URLs.certona.top2;
					resx.event = "shopping+cart";
					resx.rrelem = "cart_rr";
					resx.rrec = true;
					resx.rrnum = "10";
					if (app.URLs.certona.cart_total != null) {
						var cart_total = parseFloat(app.URLs.certona.cart_total);
						var certonaThreshold = parseFloat(app.URLs.certona.threshold);
						if (cart_total >= certonaThreshold)
							resx.rrqs = "freeshippingthreshold=0.00";
						else resx.rrqs = "freeshippingthreshold=" + (+parseFloat(certonaThreshold - cart_total)).toFixed(2);
					}
					certonaResx.run();
				}
				else if (jQuery('#pdpMain .outofstock').length > 0) {
					window.resx = new Object();
					if (!app.URLs.certona.live) {
						resx.host = "qa.res-x.com"; // USE ONLY DURING QA; REMOVE PRIOR TO PRODUCTION
					}
					resx.appid = app.URLs.certona.appid;
					// resx.top1 = app.URLs.certona.top1;
					// resx.top2 = app.URLs.certona.top2;
					resx.event = "product";
					resx.rrelem = "outofstock_rr";
					resx.rrec = true;
					resx.rrnum = "6";
					resx.itemid = jQuery('#pdpMain .pdp-topinfo .item-number span').text();
					certonaResx.run();
				}
				return;
			}
			var cnt = Math.min(els.length, 50);
			for (var i = 0; i < cnt; i++) {
				arr.push(jQuery(els[i]).attr('rel'));
			}
			
			if (arr.length > 0)
			{
				window.resx = new Object();
				if (!app.URLs.certona.live)
					resx.host = "qa.res-x.com"; // USE ONLY DURING QA; REMOVE PRIOR TO PRODUCTION
				resx.appid = app.URLs.certona.appid;
				resx.top1 = app.URLs.certona.top1;
				resx.top2 = app.URLs.certona.top2;
				if (jQuery('#wishlist-items').length > 0)
				{
					resx.itemid = arr.join(';');
					resx.event = "wishlist";
				}
				else if (jQuery('#shelf-container .producttile').length > 0)
				{
					resx.links = arr.join(';');
				}
				else if (jQuery('#search .first_three_products .nohits-images').length > 0)
				{
					resx.links = arr.join(';'); 
				}
				else if (jQuery('#main .cart .carttable .productattributes .productid .value, #page-wrapper.pt_cart .cart #cart-table .productattributes .productid .value').length > 0)
				{
					resx.itemid = arr.join(';');
					resx.event = "shopping+cart";
					resx.rrelem = "cart_rr";
					resx.rrec = true;
					resx.rrnum = "10";
					if (app.URLs.certona.cart_total != null) {
						var cart_total = parseFloat(app.URLs.certona.cart_total);
						var certonaThreshold = parseFloat(app.URLs.certona.threshold);
						if (cart_total >= certonaThreshold)
							resx.rrqs = "freeshippingthreshold=0.00";
						else resx.rrqs = "freeshippingthreshold=" + (+parseFloat(certonaThreshold - cart_total)).toFixed(2);
					}
				}
				certonaResx.run();
			}
		},
		
		trackingWithID: function(id) {
			window.resx = new Object();
			if (!app.URLs.certona.live)
				resx.host = "qa.res-x.com"; // USE ONLY DURING QA; REMOVE PRIOR TO PRODUCTION
			resx.appid = app.URLs.certona.appid;
			resx.top1 = app.URLs.certona.top1;
			resx.top2 = app.URLs.certona.top2;
			
			if (id.length > 12)
				id = id.substring(0, id.length - 11) + id.substring(id.length - 11,id.length - 7) + '_' + id.substring(id.length - 7,id.length - 4);
			
			resx.itemid = id;
			if (jQuery('#wishlist-items').length > 0)
			{
				//resx.event = "wishlist";
				resx.event = "addtocart_op";
			}
			else if (jQuery('#main .cart .carttable .productattributes .productid .value, #page-wrapper.pt_cart .cart #cart-table .productattributes .productid .value').length > 0)
			{ //on shopping cart page
				resx.event = "addtocart_op";
				resx.rrelem = "cart_rr";
				resx.rrec = true;
				resx.rrnum = "10";
				if (app.URLs.certona.cart_total != null) {
					var cart_total = parseFloat(app.URLs.certona.cart_total);
					var certonaThreshold = parseFloat(app.URLs.certona.threshold);
					if (cart_total >= certonaThreshold)
						resx.rrqs = "freeshippingthreshold=0.00";
					else resx.rrqs = "freeshippingthreshold=" + (+parseFloat(certonaThreshold - cart_total)).toFixed(2);
				}
			}
			certonaResx.run();
		}
	};
}(window.app = window.app || {}, jQuery));


/**
* @class app.social
*/
(function (app, $) {
	app.social = {
		pinIt: function(url, media, description, containerID) {
			if (app.constants.socialIntegrationPinterest == true) { // socialIntegrationGooglePlus

				if (media.indexOf('http') == 0) {
					// Production (URL starts with http)
					// media = media;
				} else {
					// Staging (Does not have http in front)
					if (app.URLs.home != undefined) {
						media = app.URLs.home + media;
					} else {
						media = 'http://www.thelimited.com' + media;
					}
				}
				
				var prefix = (("https:" == document.location.protocol) ? "https://" : "http://");
				
				jQuery('div.pin-it', containerID).empty();
				
				var pi_media = media;
				var pi_url = url;
				var pi_desc = description;
				var pi_isvideo = 'false';
				var bookmark = prefix + 'pinterest.com/pin/create/bookmarklet/?media=' + encodeURIComponent(pi_media) + '&url=' + encodeURIComponent(pi_url) + '&is_video=' + encodeURIComponent(pi_isvideo) + '&description=' + encodeURIComponent(pi_desc);
				
				var html = '<a href="' + bookmark + '" class="pin-it-button"><img border="0" src="' + prefix + 'assets.pinterest.com/images/PinExt.png" title="Pin It" /></a>';
				jQuery('div.pin-it', containerID).html(html);
				
				jQuery('div.pin-it a', containerID).unbind('click').click(function (e) {
					e.preventDefault();
					window.open(jQuery(this).attr('href'), 'Pinterest', 'width=800,height=350,status=0,toolbar=0,menubar=0,location=1,scrollbars=1');				
					return false;
				});
			}
		},
		
		facebook: function(url, media, description) {
			if (app.constants.socialIntegrationFacebook == true) {
				var html;
			
				url = encodeURIComponent(url);
				
				jQuery('div.like-it').empty();
				
				html = '<fb:like href="' + url + '" send="true" layout="button_count" width="140" show_faces="false"></fb:like>';
				jQuery('div.like-it').html(html);
				
				FB.XFBML.parse();
			}
		}
		
	};
}(window.app = window.app || {}, jQuery));


/**
* @class app.ajax
*/
(function (app, $) {
	app.ajax = {
		Success: "success",
		currentRequests: {}, // request cache

		// ajax request to get json response
		// @param - reqName - String - name of the request
		// @param - async - boolean - asynchronous or not
		// @param - url - String - uri for the request
		// @param - data - name/value pair data request
		// @param - callback - function - callback function to be called
		getJson: function(options) {
			var thisAjax = this;

			// do not bother if the request is already in progress
			// and let go null reqName
			if (!options.reqName || !this.currentRequests[options.reqName]) {
				this.currentRequests[options.reqName] = true;
				if(options.async == "undefined") options.async = true;
				// make the server call
				jQuery.ajax({
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					url		: options.url,
					cache	: true,
					async	: options.async,
					data	: options.data,

					success: function(response, textStatus) {
						thisAjax.currentRequests[options.reqName] = false;
						if (!response.Success) {
							// handle failure
						}
						options.callback(response, textStatus);
					},

					error: function(request, textStatus, error) {
						if (textStatus === "parsererror") {
							alert(app.resources["BAD_RESPONSE"]);
						}
						
						options.callback({Success: false, data:{}});
					}
				});
			}
		},

		// ajax request to load html response in a given container
		// @param - reqName - String - name of the request
		// @param - url - String - uri for the request
		// @param - data - name/value pair data request
		// @param - callback - function - callback function to be called
		// @param - selector - string - id of the container div/span (#mycontainer) - it must start with '#'
		load: function(options) {

			var thisAjax = this;

			// do not bother if the request is already in progress
			// and let go null reqname
			if (!options.reqName || !this.currentRequests[options.reqName]) {
				this.currentRequests[options.reqName] = true;
				// make the server call
				
				jQuery.ajax({
					dataType: "html",
					url		: options.url,
					cache	: true,
					data	: options.data,

					success: function(response, textStatus) {
						thisAjax.currentRequests[options.reqName] = false;
						
						if (options.selector) {
							jQuery(options.selector).html(response);
						}

						(options.callback != undefined ? options.callback(response, textStatus): null)
					},

					error: function(request, textStatus, error) {
						if (textStatus === "parsererror") {
							alert(app.resources["BAD_RESPONSE"]);
						}

						options.callback(null, textStatus);
					}
				});
			}
		}
	};
}(window.app = window.app || {}, jQuery));


/**
* @class app.minicart
*/
(function (app, $) {
	app.minicart = {
		url			: '',  // during page loading, the Demandware URL is stored here
		refreshUrl	: '',  // during page loading, the Demandware URL is stored here
		timer		: null, // timer for automatic close of cart item view

		// initializations
		init: function() {

			// bind hover event to the cart total link at the top right corner
			jQuery(".minicarttotal").unbind("mouseenter").mouseenter(function(e){
				// Open
				if (app.minicart.isShow(jQuery(this).next('.minicartcontent')) == false) {
					app.minicart.slide(jQuery(this).next('.minicartcontent'));
				}
				// Kill the timer
				clearTimeout(app.minicart.timer);
				app.minicart.timer = null;
			}).mouseleave(function(e){
				// Maybe Close
				clearTimeout(app.minicart.timer);
				app.minicart.timer = null;
				// after a time out automatically close it
				app.minicart.timer = setTimeout('app.minicart.close()', 100);
			});
		
			jQuery('.minicartcontent').unbind("mouseenter").mouseenter(function(e) {
				// Already Open
				clearTimeout(app.minicart.timer);
				app.minicart.timer = null;
			}).mouseleave(function(e) {
				// Maybe Close
				clearTimeout(app.minicart.timer);
				app.minicart.timer = null;
				// after a time out automatically close it
				app.minicart.timer = setTimeout('app.minicart.close()', 100);
			});

			// register close button event
			jQuery('.minicartcontent .minicartclose').unbind("click").click(function(e) {
				// reset all the events bindings
				e.preventDefault();
				app.minicart.close(0);
			});
			
			app.minicart.bindEditLinks();

			/*
			// iPad handler, if minicart is open and a tap is registered outside of the minicartcontent, close the minicart
			if (app.util.isiPad() == true) {
				jQuery(document).on('touchend', function(e) {
					var container = jQuery('.minicartcontent');
					// if the target of the touch isn't the container...nor a descendant of the container
					if (!container.is(e.target) && container.has(e.target).length === 0) {
						app.minicart.close(0);
					}
				});
			}
			*/
		},
		
		// returns a boolean if a minicart is visible/shown or hidden
		isShow: function(container) {
			return jQuery(container).css('display') == 'none' ? false : true;
		},
		
		bindEditLinks: function() {
			
			app.giftcert.bindEditLinks();
			
			// Quickview - Add to Cart
			jQuery(".minicartcontent .editdetails a, #ModalCartDialog .editdetails a").unbind('click').click(function(e){
				e.preventDefault();
				var uuid = this.id.substring(3);
				var url = app.URLs.miniCartEditLine + '?pli='+uuid;
			
				// append the continue node next action which is editLineItem in this case
				url = app.util.appendParamToURL(url, this.name, '');
	
				jQuery(document).unbind("UpdateMiniCart").bind("UpdateMiniCart", function(event) {
					// bind to AddToCart event, it gets triggered when the user has made selections
					// on the product detail page and clicked A2C button
					// event.selectedOptions contain name/value pair for the selected produt data e.g. pid, Quantity, any options
			
					app.modalCart.close();
					var pliOptions = jQuery.extend({}, {}, event.selectedOptions);

					// make server call to replace the lineitem and refresh the cart
					// update the product
					jQuery.ajax({
						type	: "POST",
						url		: url,
						cache	: false,
						data	: pliOptions,
						success	: function(response) {
								var buttonText = jQuery(".addtocartbutton")[0].innerHTML;

								//omniture tagging
								if (pliOptions.pid != pliOptions.masterPid) {
									s.products = ";" + app.ProductCache.PDO.masterID + ";;;;evar12=" + pliOptions.masterPid; //old product ID
									s.events = "event61"; //product removed via edit
									var s_code=s.t();
									if(s_code) {
										document.write(s_code);
									}
					
									s.products = ";" + app.ProductCache.PDO.masterID + ";;;;evar12=" + pliOptions.pid; //new product ID 
									s.events = "event56,event60"; //product added via edit
									var s_code=s.t();
									if(s_code) {
										document.write(s_code);
									}
								} else {
									s.events = "event56";
									var s_code=s.t();
					
									if(s_code) {
										document.write(s_code);
									}
								}
								//end omniture tagging
								app.minicart.update(response);
								if (app.minicart.suppressSlideDown()) {
									// This stupid hook triggers a page refresh in cart.isml ONLY. Otherwise returns false.
								} else if (app.modalCart.enabled) {
									app.modalCart.show();
								} else {
									app.minicart.slide(jQuery('#minicart .minicartcontent'), false);
									// if iPad, close minicart after a delay
									if (app.util.isiPad() == true) {
										app.minicart.timer = setTimeout('app.minicart.close()', 3000);
									}
								}
							},
						error	: function() {
							app.cart.refresh();
						}
					});
				});
				
				app.quickView.show({url: this.href, source: "minicart", label: app.resources["UPDATE"]});
				return false;
			});
		
		},
		
		// reset minicart
		reset: function() {
			/*
			// This function is no longer needed. The reset happens before new event handers are applied.
			jQuery(".minicarttotal").unbind("mouseenter");
			jQuery('.minicartcontent').unbind("mouseenter");
			jQuery('.minicartcontent .minicartclose').unbind("click");
			jQuery(".minicartcontent .editdetails a, #ModalCartDialog .editdetails a").unbind('click');
			*/
		},

		// shows the given content in the mini cart.
		show: function(html) {
			
			// update
			app.minicart.update(html);
			
			if (app.minicart.suppressSlideDown()) {

			} else {
				app.minicart.slide(jQuery('#minicart .minicartcontent'));
			}
		},
		
		// update the html and event handlers. you can all this instead of 'show' above.
		update: function(html) {
			
			// update html
			jQuery('#minicart').html(html);
			
			// bind all the events
			app.minicart.init();
		},
		
		// slide down and show the contents of the mini cart
		slide: function(cartdiv, closeOnTimeout) {
			closeOnTimeout = (closeOnTimeout == undefined) ? true : closeOnTimeout;
			
			if (app.minicart.suppressSlideDown()) {
				return;
			}
				
			// show the item
			jQuery(cartdiv).fadeIn(500, 'easeOutCubic');
			jQuery(cartdiv).prev('.minicarttotal').addClass('isopen');
			
			clearTimeout(app.minicart.timer);
			app.minicart.timer = null;
				
			// after a time out automatically close it
			if (closeOnTimeout) {
				app.minicart.timer = setTimeout('app.minicart.close()', 3000);
			}
		},

		// adds a product to the mini cart
		// @params
		// progressImageSrc - source/url of the image to show when the item is being added to the cart
		// postdata - form data containing the product information to be added to mini-cart
		// callback - call back function/handler
		add: function(progressImageSrc, postdata, callback) {
			
			// get the data of the form as serialized string
			var postdata = postdata;

			// get button reference
			var addButtons = [];

			// the button to update
			var addButton = null;
			
			// it is an array of buttons, but we need only one all
			// other combinations are strange so far
			if (addButtons.length == 1)	{
				addButton = addButtons[0];
			}

			var previousImageSrc = null;

			// show progress indicator
			if (addButton != null) {
				previousImageSrc = addButton.src;
				addButton.src = progressImageSrc;
			}

			// handles successful add to cart
			var ADDhandlerFunc = function(req)	{
				// hide progress indicator
				if (addButton != null) {
					addButton.src = previousImageSrc;
				}

				// replace the content
				jQuery('#minicart').html(req);

				// bind all the events
				app.minicart.init();
				
				if (callback) callback();
				
				if (app.minicart.suppressSlideDown()) {
					// This stupid hook triggers a page refresh in cart.isml ONLY. Otherwise returns false.
				} else if (app.modalCart.enabled) {
					app.modalCart.show();
				} else {
					app.minicart.slide(jQuery('#minicart .minicartcontent'), false);
					// if iPad, close minicart after a delay
					if (app.util.isiPad() == true) {
						app.minicart.timer = setTimeout('app.minicart.close()', 3000);
					}
				}
			}

			// handles add to cart error
			var errFunc = function(req) {
				// hide progress indicator
				if (addButton != null) {
					addButton.src = previousImageSrc;
				}
			}

			// closes a previous mini cart
			app.minicart.close();

			// add the product
			jQuery.ajax({
				type	: "POST",
				url		: app.minicart.url,
				cache	: true,
				data	: postdata,
				success	: ADDhandlerFunc,
				error	: errFunc
			});
		},
		
		refresh: function(req) {
			app.minicart.show(req);
		},

		// closes the mini cart with given delay
		close: function(delay) {
			if (app.minicart.timer != null || delay == 0) {
				clearTimeout(app.minicart.timer);
				app.minicart.timer = null;
				
				// hide with "slide" causes to fire mouse enter/leave events sometimes infinitely thus changed it to fadeOut
				
				if (app.minicart.isShow(jQuery('#minicart .minicartcontent'))) {
					jQuery('#minicart .minicartcontent').fadeOut(500);
				}
				/*
				if (app.minicart.isShow(jQuery('#minicart-clone .minicartcontent'))) {
					jQuery('#minicart-clone .minicartcontent').fadeOut(500);
				}
				*/
				jQuery('.minicarttotal').removeClass('isopen');
			}
		},

		// hook which can be replaced by individual pages/page types (e.g. cart)
		suppressSlideDown: function() {
			return false;
		}
	};
}(window.app = window.app || {}, jQuery));


/**
* @class app.fixedmenu
*/
(function (app, $) {
	app.fixedmenu = {
		isCollapsed: false,
		isFixed: true,
		targetTop: 178, // This is the real height of #fixed-header (168) + 10 margin
		timer: false, // false == use scroll event, true == use timeout event
		lastTop: 0,
		
		// initializations
		init: function() {
			if (jQuery('#fixed-header').length > 0) {
				app.fixedmenu.scroll();
			
				if (app.util.isiPad() == true) {
					app.fixedmenu.timer = true; // Use timer event
					setTimeout(function(e) {
						app.fixedmenu.scroll();
					}, 250);
				} else {
					app.fixedmenu.timer = false; // Use scroll event
					jQuery(window).bind("scroll", function(e) {
						app.fixedmenu.scroll();
					});
				}
				/*
				document.addEventListener("touchmove", function(e) {
					jQuery('#resize-info').text("touchmove");
					app.fixedmenu.scroll();
				}, false);
				jQuery(window).bind("touchmove", function(e) {
					jQuery('#resize-info').text("touchmove");
					app.fixedmenu.scroll();
				});
				jQuery(window).bind("touchend", function(e) {
					jQuery('#resize-info').text("touchend");
					app.fixedmenu.scroll();
				});
				jQuery(window).bind("scroll", function(e) {
					jQuery('#resize-info').text("scroll");
					app.fixedmenu.scroll();
				});
				*/
			}
		},
		
		scroll: function() {
			var top = jQuery(window).scrollTop();
			var diff = top - app.fixedmenu.lastTop; // Down is positive
			app.fixedmenu.lastTop = top;
			
			// jQuery('#resize-info').text(top + ' / ' + diff + ' / ' + app.fixedmenu.isCollapsed + ' / ' + (new Date().getMilliseconds()));
			
			if (top >= app.fixedmenu.targetTop) {
				if (diff > 10) {
					// Scrolling down
					if (app.fixedmenu.isCollapsed == true) {
						app.fixedmenu.expand();
					}
				} else if (diff < -15) {
					// Scrolling up
					if (app.fixedmenu.isCollapsed == false) {
						app.fixedmenu.collapse();
					}
				}
			} else {
				if (app.fixedmenu.isFixed == false) {
					app.fixedmenu.tofixed();
				}
			}
			
			if (app.fixedmenu.timer == true) {
				setTimeout(function(e) {
					app.fixedmenu.scroll();
				}, 100);
			}
		},

		// shows the given content in the mini cart
		collapse: function() {
			app.fixedmenu.isCollapsed = true;
			app.fixedmenu.isFixed = false;
			// jQuery('#fixed-header').stop(true,false).css({top: '0px', position: 'fixed'}).animate({top: '-75px'}, 150, 'easeInOutQuint');
			// jQuery('#header-wrapper').stop(true,false).css({marginBottom: '15px'}).animate({marginBottom: '0px'}, 150, 'easeInOutQuint');
			jQuery('#fixed-header').stop(true,false).css({top: '-153px', position: 'fixed'}).animate({top: '-75px'}, 350, 'easeInOutQuint');
			jQuery('#header-wrapper').css({marginBottom: '0px'});
			jQuery('#page-wrapper').css({marginTop: '176px'});
		},
		
		// slide down and show the contents of the mini cart
		expand: function() {
			app.fixedmenu.isCollapsed = false;
			app.fixedmenu.isFixed = false;
			// jQuery('#fixed-header').stop(true,false).css({top: '-75px', position: 'relative'}).animate({top: '0px'}, 150, 'easeInOutQuint');
			// jQuery('#header-wrapper').stop(true,false).css({marginBottom: '0px'}).animate({marginBottom: '15px'}, 150, 'easeInOutQuint');
			jQuery('#fixed-header').stop(true,false).css({top: '-75px', position: 'fixed'}).animate({top: '-153px'}, 350, 'easeInOutQuint')
			jQuery('#header-wrapper').css({marginBottom: '0px'});
			jQuery('#page-wrapper').css({marginTop: '176px'});
		},
		
		tofixed: function() {
			app.fixedmenu.isCollapsed = false;
			app.fixedmenu.isFixed = true;
			// jQuery('#fixed-header').stop(true,false).css({top: '-75px', position: 'relative'}).animate({top: '0px'}, 150, 'easeInOutQuint');
			// jQuery('#header-wrapper').stop(true,false).css({marginBottom: '0px'}).animate({marginBottom: '15px'}, 150, 'easeInOutQuint');
			jQuery('#fixed-header').stop(true,false).css({top: '0px', position: 'relative'});
			jQuery('#header-wrapper').css({marginBottom: '15px'});
			jQuery('#page-wrapper').css({marginTop: '10px'});		
		}
	};
}(window.app = window.app || {}, jQuery));


/**
* @class app.tablet
*/
(function (app, $) {
	app.tablet = {
		isTablet: false,
		
		// initializations
		init: function() {
			if (app.util.isiPad() == true) {
				app.isTablet = true;
				jQuery('body').addClass('tablet');
			}
		}
	};
}(window.app = window.app || {}, jQuery));


/**
* @class app.giftcert
*/
(function (app, $) {
	app.giftcert = {
		isTablet: false,
		mode: 'add', // 'add', 'edit
		amount: null,
		fromCart: false, // If true the page must reload when add or update item action.
		dialogSettings: {
			autoOpen: false,
			modal: true,
			overlay: {
				opacity: .5,
				background: 'black'
			},
			width: 'auto',
			minWidth: 708,
			maxWidth: 708,
			minHeight: 300,
			fluid: true,
			resizable: false,
			draggable: false,
			dialogClass: 'giftcertdialog'
		},
		
		init: function() {
			if (app.constants.modalGiftCert == false) {
				return;
			}
			
			app.giftcert.bindLinks();
			
			jQuery.validator.addMethod('updateEmailValidate', function(value, element) {
		
				// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
				var valid = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		
				if (value.charAt(0) == "*") {
					valid = true;
				}
		
				return valid;
			}, false);
		},
		
		
		bindLinks: function() {
			jQuery('.giftcertmodal').unbind().on('click', app.giftcert.landingModal);
			app.giftcert.bindEditLinks();
		},
		
		bindEditLinks: function() {
			if (app.constants.modalGiftCert == false) {
				return;
			}
			
			// Quickview - Edit Gift Card
			jQuery(".minicartcontent .editgiftcert a, #ModalCartDialog .editgiftcert a").unbind('click').click(function(e){
				e.preventDefault();
			
				var url = jQuery(this).attr('href');
				
				var physical = true;
				if (jQuery(this).hasClass('virtual')) {
					physical = false;
				}

				app.giftcert.initModal();
				app.giftcert.fromCart == false;

				app.ajax.load({
					selector: "#GiftCertDialog",
					url: url,
					callback: function(responseText, textStatus) {
						if (physical) {
							app.giftcert.physicalLoaded(responseText, textStatus);
						} else {
							app.giftcert.virtualLoaded(responseText, textStatus);
						}
					}
				});
			});
			
			jQuery("#dwfrm_cart #cart-table .editgiftcert a").unbind('click').click(function(e){
				e.preventDefault();
			
				var url = jQuery(this).attr('href');
				
				var physical = true;
				if (jQuery(this).hasClass('virtual')) {
					physical = false;
				}

				app.giftcert.initModal();
				app.giftcert.fromCart == true;

				app.ajax.load({
					selector: "#GiftCertDialog",
					url: url,
					callback: function(responseText, textStatus) {
						if (physical) {
							app.giftcert.physicalLoaded(responseText, textStatus);
						} else {
							app.giftcert.virtualLoaded(responseText, textStatus);
						}
					}
				});
			});
		},
		
		// Modals
		
		initModal: function() {
			if (jQuery('#GiftCertDialog').length == 0) {
				jQuery(document.body).append('<div id="GiftCertDialog"></div>');
			} else {
				jQuery('#GiftCertDialog').empty();
			}
		},
		
		openModal: function() {
			// Open Dialog
			jQuery('#GiftCertDialog').dialog('open');
			app.quickView.fluidDialog();
			jQuery('.ui-widget-overlay').last().unbind('click').bind('click', function(e) {
				e.preventDefault();
				jQuery(this).next('.ui-dialog').first().find('.ui-dialog-titlebar-close').trigger('click');
			});
		},
		
		landingModal: function(e) {
			e.preventDefault();

			app.giftcert.initModal();
			// app.giftcert.fromCart == false;

			app.ajax.load({
				selector: "#GiftCertDialog",
				url: app.URLs.giftCertLandingModal,
				callback: function(responseText, textStatus) {
					app.giftcert.landingLoaded(responseText, textStatus);
				}
			});
		},
		
		physicalModal: function(e) {
			e.preventDefault();
			
			app.giftcert.initModal();
			// app.giftcert.fromCart == false;

			app.ajax.load({
				selector: "#GiftCertDialog",
				url: app.URLs.giftCertPhysicalModal,
				callback: function(responseText, textStatus) {
					app.giftcert.physicalLoaded(responseText, textStatus);
				}
			});
		},
		
		virtualModal: function(e) {
			e.preventDefault();
			
			app.giftcert.initModal();
			// app.giftcert.fromCart == false;
			
			app.ajax.load({
				selector: "#GiftCertDialog",
				url: app.URLs.giftCertVirtualModal,
				callback: function(responseText, textStatus) {
					app.giftcert.virtualLoaded(responseText, textStatus);
				}
			});
		},
		
		// Loaded
		
		landingLoaded: function(responseText, textStatus) {
			jQuery('#GiftCertDialog').dialog(app.giftcert.dialogSettings);
			app.giftcert.bindLanding();
			app.giftcert.openModal();
		},
		
		physicalLoaded: function(responseText, textStatus) {
			jQuery('#GiftCertDialog').dialog(app.giftcert.dialogSettings);
			app.giftcert.bindPhysical();
			app.giftcert.openModal();
			
		},
		
		virtualLoaded: function(responseText, textStatus) {
			jQuery('#GiftCertDialog').dialog(app.giftcert.dialogSettings);
			app.giftcert.bindVirtual();
			app.giftcert.openModal();
			
		},
		
		// Events
		
		bindLanding: function() {
			jQuery('.gc-physical-link').unbind().on('click', app.giftcert.physicalModal);
			jQuery('.gc-virtual-link').unbind().on('click', app.giftcert.virtualModal);
			jQuery('.gc-balance').unbind();
		},
		
		bindPhysical: function() {
			if (app.giftcert.mode == 'edit') {
				jQuery('.gc-physical .back').hide(); // Hide the back buttons when editing.
				if (app.giftcert.amount != null) {
					jQuery('#GiftCertificateFormPhysical #dwfrm_giftcert_purchase_amount').val(app.giftcert.amount);
				}
			}
			jQuery('.gc-physical .back').unbind().on('click', app.giftcert.landingModal);
			
			app.giftcert.bindTerms();

			if (app.giftcert.mode == 'edit') {
				if (app.giftcert.amount != null) {
					app.util.changeFormSelection(jQuery('#GiftCertificateFormPhysical #dwfrm_giftcert_purchase_amount')[0], app.giftcert.amount);
				}
			}
			
			// Submit
			var optionsPhysical = {
				rules: {},
				messages: {
					dwfrm_giftcert_purchase_amount: { required: 'Please select a gift amount' }
				},
				submitHandler: function(form) {
					var url = jQuery(form).attr('action');
					if (app.giftcert.mode == 'edit') {
						url = app.URLs.giftCertUpdate;
					} else {
						url = app.URLs.giftCertAdd;
					}
					
					app.ajax.getJson({
						url			: url,
						data		: jQuery(form).serialize(),
						callback	: function(data) {
				
							var success = false;
							if (data && data.success === true) {
								success = true;
							}
							
							if (success) {
								if (jQuery('#minicart .minicarttotal .emptycart').length > 0) {
									s.events = "scAdd,scOpen";
								} else {
									s.events = "scAdd";
								}
								s.products = ";G2000000;;;;evar12=G2000000";
								s.eVar11="Gift Card Page";
								var s_code=s.t();
								if (s_code) {
									document.write(s_code);
								}

								if (app.giftcert.fromCart == true) {
									// document.location.href = app.URLs.showCart;
									app.giftcert.close();
									app.cart.refresh(); // jQuery(document).trigger("refreshCart");
								} else {
									var lineItemId = data.result.lineItemId;
									jQuery.ajax({
										type : 'POST',
										url	: app.URLs.giftCertShowMiniCart,
										cache : false,
										data : {lineItemId: lineItemId},
										success	: function(html) {
											app.giftcert.close();
											app.minicart.show(html);
										},
										error : function(html) {
										}
									});
									// jQuery('#GiftCertificateFormPhysical').first().reset();
								}
							} else {
							
							}
						}
					});
					
					return false;
				}

			};
			var validatorPhysical = jQuery('#GiftCertificateFormPhysical').validate(jQuery.extend({}, app.validatorSettings, optionsPhysical));
		},
		
		bindVirtual: function() {
			if (app.giftcert.mode == 'edit') {
				jQuery('.gc-virtual .back').hide(); // Hide the back buttons when editing.
				if (app.giftcert.amount != null) {
					jQuery('#GiftCertificateFormVirtual #dwfrm_giftcert_purchase_amount').val(app.giftcert.amount);
				}
			}
			jQuery('.gc-virtual .back').unbind().on('click', app.giftcert.landingModal);
			
			app.giftcert.bindTerms();

			if (app.giftcert.mode == 'edit') {
				if (app.giftcert.amount != null) {
					app.util.changeFormSelection(jQuery('#GiftCertificateFormVirtual #dwfrm_giftcert_purchase_amount')[0], app.giftcert.amount);
				}
			}
			
			// Submit
			var optionsVirtual = {
				rules: {
					dwfrm_giftcert_purchase_recipientEmail: {
						updateEmailValidate: 'updateEmailValidate'
					},
					dwfrm_giftcert_purchase_confirmRecipientEmail: {
						updateEmailValidate: 'updateEmailValidate',
						equalTo: '#GiftCertificateFormVirtual #dwfrm_giftcert_purchase_recipientEmail'
					},
					dwfrm_giftcert_purchase_message: {
						maxlength: 200
					}
				},
				messages: {
					dwfrm_giftcert_purchase_recipient: {
						required: 'Please enter recipient\'s name'
					},
					dwfrm_giftcert_purchase_recipientEmail: {
						required: 'Please enter recipient\'s email',
						updateEmailValidate: 'Please Enter a valid email address'
					},
					dwfrm_giftcert_purchase_confirmRecipientEmail: {
						required: 'Please confirm recipient\'s email',
						updateEmailValidate: 'Please Enter a valid email address',
						equalTo: 'Email addresses don\'t match'
					},
					dwfrm_giftcert_purchase_from: {
						required: 'Please enter your name'
					},
					dwfrm_giftcert_purchase_sender: {
						required: 'Please enter your email address'
					},
					dwfrm_giftcert_purchase_amount: {
						required: 'Please select a gift amount'
					},
					dwfrm_giftcert_purchase_message: {
						required: 'Please enter a personal message',
						maxlength: 'Message must be less than 200 characters'
					}
				},
				submitHandler: function(form) {
					var url = jQuery(form).attr('action');
					if (app.giftcert.mode == 'edit') {
						url = app.URLs.giftCertUpdate;
					} else {
						url = app.URLs.giftCertAdd;
					}
					
					app.ajax.getJson({
						url			: url,
						data		: jQuery(form).serialize(),
						callback	: function(data) {
				
							var success = false;
							if (data && data.success === true) {
								success = true;
							}
							
							if (success) {
								if (jQuery('#minicart .minicarttotal .emptycart').length > 0) {
									s.events = "scAdd,scOpen";
								} else {
									s.events = "scAdd";
								}
								s.products = ";G3000000;;;;evar12=G3000000";
								s.eVar11="Gift Card Page";
								var s_code=s.t();
								if (s_code) {
									document.write(s_code);
								}

								if (app.giftcert.fromCart == true) {
									// document.location.href = app.URLs.showCart;
									app.giftcert.close();
									app.cart.refresh(); // jQuery(document).trigger("refreshCart");
								} else {
									var lineItemId = data.result.lineItemId;
									jQuery.ajax({
										type : 'POST',
										url	: app.URLs.giftCertShowMiniCart,
										cache : false,
										data : {lineItemId: lineItemId},
										success	: function(html) {
											app.giftcert.close();
											app.minicart.show(html);
										},
										error : function(html) {
										}
									});
									// jQuery('#GiftCertificateFormPhysical').first().reset();
								}
							} else {
							
							}
						}
					});
					
					return false;
				}

			};
			var validatorVirtual = jQuery('#GiftCertificateFormVirtual').validate(jQuery.extend({}, app.validatorSettings, optionsVirtual));
			
			// code to refresh the chars left message under the text box
			jQuery("#GiftCertificateFormVirtual #dwfrm_giftcert_purchase_message").bind("keyup keydown", function() {
				var max = 200;
				var value = jQuery(this).val();
				var left = max - value.length;
				if(left < 0) {
					jQuery(this).val( value.slice(0, left) );
					left = 0;
				}
				jQuery("#GiftCertificateFormVirtual #textcount").text(left);
			});
		},
		
		close: function() {
			jQuery('#GiftCertDialog').dialog('close');
		},
		
		bindTerms: function() {
			jQuery('.gc-terms-link').unbind().on('click', function(e) {
				e.preventDefault();
				jQuery('#terms-dialog-container').dialog({
					autoOpen: true,
					modal: true,
					overlay: {
						opacity: .5,
						background: 'black'
					},
					width: 'auto',
					minWidth: 708,
					maxWidth: 708,
					minHeight: 300,
					fluid: true,
					resizable: false,
					draggable: false
				});
				jQuery('.ui-widget-overlay').last().unbind('click').bind('click', function(e) {
					e.preventDefault();
					jQuery(this).next('.ui-dialog').first().find('.ui-dialog-titlebar-close').trigger('click');
				});
			});
		}
		
	};
}(window.app = window.app || {}, jQuery));


/**
* @class app.quickView
*/
(function (app, $) {
	app.quickView = {
		
		init: function() {
			app.quickView.bindRecommendedQuickview();
			
			jQuery(document).on("dialogopen", ".ui-dialog", function (event, ui) {
				app.quickView.fluidDialog();
			});
			
			jQuery(document).on("dialogclose", ".ui-dialog", function (event, ui) {
				jQuery(window).off("resize.responsive");
			});
		},
		
		fluidDialog: function() {
			var $visible = jQuery(".ui-dialog:visible");
			// each open dialog
			$visible.each(function () {
				var $this = jQuery(this);
				var dialog = $this.find(".ui-dialog-content").data("uiDialog");
				
				// if fluid option == true
				if (dialog.options.maxWidth && dialog.options.width) {
					// fix maxWidth bug
					$this.css("max-width", dialog.options.maxWidth);
					// reposition dialog
					dialog.option("position", dialog.options.position);
				}
				
				if (dialog.options.fluid) {
					// namespace window resize
					jQuery(window).on("resize.responsive", function () {
						var wWidth = jQuery(window).width() - 100;
						// check window width against dialog width
						if (wWidth < dialog.options.minWidth) {
							$this.css("width", dialog.options.minWidth);
						} else if (wWidth < dialog.options.maxWidth) { // (1200 / .95) - 1200 = 63 / 133
							// $this.css("width", "90%");
							$this.css("width", wWidth);
						} else {
							$this.css("width", dialog.options.maxWidth);
						}
						dialog.option("position", dialog.options.position);
						
					});
				}
			});
			jQuery(window).trigger('resize.responsive');
		},
		
		/**
		* Get Product
		*/
		getProduct: function(options) { // id, source, start
			var cId 		= options.containerId || 'QuickViewDialog';
			var source 		= options.source || '';
			var a2cBtnLabel = options.label || null;
			
			// show small loading image
			jQuery('#'+cId).html(app.progress.show('quickviewloader'));

			if (options.url) {
				if (options.url.indexOf('?') == 0) {
					// Prepend the base product show URL
					options.url = app.URLs.getProductUrl + options.url;
				}
			}
			var productUrl = options.url ? options.url : app.util.appendParamToURL(app.URLs.getProductUrl, "pid", options.id);
			
			productUrl = app.util.appendParamToURL(productUrl, "source", source);
			
			app.ajax.load({
				selector: "#"+cId,
				url: productUrl,
				callback: function(responseText, textStatus) {
					// update the Add to cart button label if one provided
					(a2cBtnLabel != null ? jQuery("#"+cId+" .addtocartbutton:last").html(a2cBtnLabel) : '');
	
	               // run the open callback if passed in, after this stuff is loaded

					if (options.open !== undefined) {
						options.open();
					}
				}
			});
		},
	
		// bind browser events
		// options
		// buttonSelector - css selector for the quickview button
		// imageSelector - css selector for product image
		// buttonLinkSelector - css selector for quickview button link (a tag)
		// productNameLinkSelector - css selector for product name link (a tag)
		bindEvents: function(options) {
			// hide quickview buttons
			
			// var timer = null;
			
			// hovering
			if (app.util.isiPad() == true) {
				jQuery(options.buttonSelector).show();
			} else {
				jQuery(options.buttonSelector).hide();
			
				jQuery(options.imageSelector).hover( //  "div.producttile div.image"
					function(e) {
						var imagecontainer = jQuery(this);
						var image = jQuery('.thumbnail .productimage .jscontainer img[rel]', this); // Has a REL attribute
						if (image.length) {
							var hoverimage = jQuery('.thumbnail .productimage .jscontainer img.hoverimage', this);
							var pathdata = image.attr("rel").split("|");
							
							// Quickview Button
							// jQuery(options.buttonSelector, this).delay(250).fadeIn(500);
							jQuery(options.buttonSelector, this).show();
					
							// Hover image
							if (pathdata.length > 1) {
								if (hoverimage.length == 0) { // Create the hover image if there isn't one...
									jQuery('.thumbnail .productimage .jscontainer', this).append('<img class="hoverimage" style="display: none;" />');
									hoverimage = jQuery('.thumbnail .productimage .jscontainer img.hoverimage', this);
									
									/*
									// The load function doesn't work consistently.
									jQuery(hoverimage).bind('load', function(e){
										jQuery(this).delay(0).fadeIn(0);
									});
									*/
									jQuery(hoverimage).attr("src", pathdata[1]);
									jQuery('.thumbnail .productimage .jscontainer img.hoverimage', this).delay(450).fadeIn(500);
								} else {
									jQuery('.thumbnail .productimage .jscontainer img.hoverimage', this).delay(25).fadeIn(500);
								}
							}
					
							/*
							var context = jQuery(this);
							timer = setTimeout(function() {
								jQuery(options.buttonSelector, context).delay(400).fadeIn(600);
								jQuery('.thumbnail .productimage .jscontainer img.hoverimage', context).fadeIn(600);
							}, 400);
							*/
							// return false;
						}
					},
					function(e) {
						if (jQuery('.thumbnail .productimage .jscontainer img[rel]', this).length) {
							// clearTimeout(timer);
							// jQuery(options.buttonSelector, this).stop(true,true).fadeOut(750);
							jQuery(options.buttonSelector, this).hide();
							jQuery('.thumbnail .productimage .jscontainer img.hoverimage', this).unbind('load');
							jQuery('.thumbnail .productimage .jscontainer img.hoverimage', this).stop(true,true).fadeOut(300);
							// return false;
						}
					}
				);
			}

			// click binding for quick view
			jQuery(options.buttonLinkSelector).click(function(e) {
				e.preventDefault();
				app.quickView.show({url: this.href, source: "quickview"});
				return false;
			});

		},

		// show quick view dialog and send request to the server to get the product
		// options.source - source of the dialog i.e. search/cart
		// options.url - product url
		show: function(options) {
			
			if (jQuery('#QuickViewDialog').length == 0) {
				jQuery(document.body).append('<div id="QuickViewDialog"></div>');
			} else {
				jQuery('#QuickViewDialog').empty();
			}
			
			jQuery('#QuickViewDialog').dialog({
				// bgiframe: true,
				autoOpen: false,
				modal: true,
				overlay: {
					opacity: .5,
					background: 'black'
				},
				width: 'auto',
				minWidth: 708,
				maxWidth: 1200,
				minHeight: 600,
				fluid: true,
				resizable: false,
				draggable: false,
				dialogClass: 'quickview'
				/*
				open: function(event, ui) {
					app.quickView.fluidDialog(); // Only needed if autoOpen is set to true
				}
				*/
			});
			jQuery('#QuickViewDialog').dialog('open');
			
			jQuery('.ui-widget-overlay').last().unbind('click').bind('click', function(e) {
				e.preventDefault();
				jQuery(this).next('.ui-dialog').first().find('.ui-dialog-titlebar-close').trigger('click');
			});
			
			jQuery('#QuickViewDialog').unbind('dialogclose').bind('dialogclose', function(e) {
				if (app.URLs.certona==undefined) {	return; }
					
				if (!app.URLs.certona.enabled || typeof certonaResx === 'undefined') {	return;}
				e.preventDefault();
				if (jQuery('#pdpMain.pdpselector').length > 0) {
					var selectedProduct = null;
					for (var p in app.ProductCacheRef) {
						if (app.ProductCacheRef[p].pageSource == 'pdp') {
							try {
								selectedProduct = app.ProductCacheRef[p].GetSelectedColorVariant();
							}
							catch (e) {}
						}
					}
					
					if (selectedProduct != null) {
						window.resx = new Object();
						if (!app.URLs.certona.live)
							resx.host = "qa.res-x.com"; // USE ONLY DURING QA; REMOVE PRIOR TO PRODUCTION
						resx.appid = app.URLs.certona.appid;
						resx.top1 = app.URLs.certona.top1;
						resx.top2 = app.URLs.certona.top2;
						var styleNumber = "0000" + selectedProduct.styleNumber;
						var colorCode = "000" + selectedProduct.colorCode;
						resx.itemid = selectedProduct.classCode + styleNumber.substring(styleNumber.length - 4, styleNumber.length) + "_" + colorCode.substring(colorCode.length - 3, colorCode.length);
						resx.rrelem = "product_rr";
						resx.rrec = true;
						resx.rrnum = "4";
						certonaResx.run();
					}
				} else if (jQuery('.cart #cart-table').length > 0) {
					var arr = [];
					var els = jQuery('#shelf-container .producttile .name a[rel]' + 
							', #wishlist-items .wishlistlineitem .product .sku .value' +
							', #search .first_three_products .nohits-images .image a[rel]' +
							', #main .cart .carttable .productattributes .productid .value' +
							', #page-wrapper.pt_cart .cart #cart-table .productattributes .productid .value');
					if (els.length <= 0) {
						if (jQuery('.cartempty').length > 0) {
							window.resx = new Object();
							resx.appid = app.URLs.certona.appid;
							resx.top1 = app.URLs.certona.top1;
							resx.top2 = app.URLs.certona.top2;
							resx.event = "shopping+cart";
							resx.rrelem = "cart_rr";
							if (app.URLs.certona.cart_total != null) {
								var cart_total = parseFloat(app.URLs.certona.cart_total);
								var certonaThreshold = parseFloat(app.URLs.certona.threshold);
								if (cart_total >= certonaThreshold)
									resx.rrqs = "freeshippingthreshold=0.00";
								else resx.rrqs = "freeshippingthreshold=" + (+parseFloat(certonaThreshold - cart_total)).toFixed(2);
							}
							resx.rrec = true;
							resx.rrnum = "10";
							certonaResx.run();
						}
						else if (jQuery('#pdpMain .outofstock').length > 0) {
							window.resx = new Object();
							if (!app.URLs.certona.live) {
								resx.host = "qa.res-x.com"; // USE ONLY DURING QA; REMOVE PRIOR TO PRODUCTION
							}
							resx.appid = app.URLs.certona.appid;
							resx.top1 = app.URLs.certona.top1;
							resx.top2 = app.URLs.certona.top2;
							resx.event = "product";
							resx.rrelem = "outofstock_rr";
							resx.rrec = true;
							resx.rrnum = "6";
							certonaResx.run();
						}
						return;
					}
					var cnt = Math.min(els.length, 50);
					for (var i = 0; i < cnt; i++) {
						arr.push(jQuery(els[i]).attr('rel'));
					}
					
					if (arr.length > 0) {
						window.resx = new Object();
						if (!app.URLs.certona.live)
							resx.host = "qa.res-x.com"; // USE ONLY DURING QA; REMOVE PRIOR TO PRODUCTION
						resx.appid = app.URLs.certona.appid;
						resx.top1 = app.URLs.certona.top1;
						resx.top2 = app.URLs.certona.top2;
					
						resx.itemid = arr.join(';');
						resx.event = "shopping+cart";
						resx.rrelem = "cart_rr";
						resx.rrec = true;
						resx.rrnum = "10";
						if (app.URLs.certona.cart_total != null) {
							var cart_total = parseFloat(app.URLs.certona.cart_total);
							var certonaThreshold = parseFloat(app.URLs.certona.threshold);
							if (cart_total >= certonaThreshold)
								resx.rrqs = "freeshippingthreshold=0.00";
							else resx.rrqs = "freeshippingthreshold=" + (+parseFloat(certonaThreshold - cart_total)).toFixed(2);
						}
						certonaResx.run();
					}
				}
				jQuery('#QuickViewDialog').unbind('dialogclose');
			});
			
			app.fullviewurl = options.url;
			
			app.quickView.getProduct({
				containerId: 'QuickViewDialog',
				source: options.source,
				url: options.url,
				open: function() {
					// Update full details link to appropriate color.
					// var selectedSwatchHref = $('#QuickViewDialog ul.swatchesdisplay .selected a').attr('href');
					// $('#QuickViewDialog .productinfo #pdpFullDetailsLink a').attr('href', selectedSwatchHref);
					// app.quickView.bindRecommendedQuickview();
					// app.quickView.fluidDialog();
					jQuery(window).trigger('resize.responsive');
				},
				label: options.label
			});
			app.quickView.fluidDialog();
		},
		
		// close the quick view dialog
		close: function() {
			jQuery('#QuickViewDialog').dialog('close');
		},
		
		// Handle recommendations in the QuickView window.
		bindRecommendedQuickview: function() {
			// Open in Quickview...
			jQuery('body').delegate('#product_rr li a, #quickview_rr li a, #outofstock_rr li a, #cart_rr li a', 'click', function(e) {
				e.preventDefault();
				if (s_crossSell != undefined) {
					s_crossSell();
				}
				app.quickView.show({url: this.href, source: 'quickview'});
				return false;
			});
			// On hover show name...
			jQuery('body').delegate('#cart_rr li, #quickview_rr li, #outofstock_rr li', 'mouseenter', function(e) {
				jQuery('.rec-name', this).stop(true,true).fadeIn(500);
			});
			jQuery('body').delegate('#cart_rr li, #quickview_rr li, #outofstock_rr li', 'mouseleave', function(e) {
				jQuery('.rec-name', this).stop(true,true).fadeOut(500);
			});
		}
	};
	
	app.getProduct = app.quickView.getProduct;
}(window.app = window.app || {}, jQuery));


/**
* @class app.modalCart
*/
(function (app, $) {
	app.modalCart = {
			
		addedProduct: '',  // product added to the cart, class/style_color
		enabled: false, // if disabled, minicart will show instead
		
		// show quick view dialog and send request to the server to get the product
		// options.source - source of the dialog i.e. search/cart
		// options.url - product url
		show: function() {
			
			/*
			if (html != null)
				jQuery('#minicart').html(html);
			*/
							
			if (app.modalCart.enabled == false) {
				return; // Don't show the modal cart.
			}
			
			if (jQuery('#modalcart').length == 0)
				return false;
			
			if (jQuery('#ModalCartDialog').length == 0) {
				jQuery(document.body).append('<div id="ModalCartDialog"></div>');
			} else {
				jQuery('#ModalCartDialog').empty();
			}
			
			str = jQuery('#modalcart').html().replace('modalcart_rr', 'minicart_rr');
			jQuery('#ModalCartDialog').append(str);
			
			window.resx = new Object();
			//if (!app.URLs.certona.live)
				//resx.host = "qa.res-x.com";
			resx.appid = app.URLs.certona.appid;
			resx.top1 = app.URLs.certona.top1;
			resx.top2 = app.URLs.certona.top2;
			//resx.customerid = "CUSTOMER_IDENTIFIER";
			//resx.links = "1111;2222;3333";
			resx.itemid = app.modalCart.addedProduct;
			resx.event = "addtocart_op";
			resx.rrec = true;
			resx.rrelem = "minicart_rr";
			resx.rrnum = "4";
			certonaResx.run();
			
			//jQuery('#ModalCartDialog #minicart_rr').append(jQuery('#product_rr').html());
			
			jQuery('#ModalCartDialog').dialog({
				// bgiframe: true,
				autoOpen: false,
				modal: true,
				overlay: {
					opacity: .65,
					background: 'black'
				},
				width: 'auto',
				// height: 600,
				minWidth: 750,
				maxWidth: 750,
				fluid: true,
				resizable: false,
				draggable: false,
				/*
				open: function(event, ui) {
					app.quickView.fluidDialog(); // Only needed if autoOpen is set to true
				}
				*/
			});
			jQuery('#ModalCartDialog').dialog('open');
			
			jQuery('.ui-widget-overlay').last().unbind('click').bind('click', function(e) {
				e.preventDefault();
				jQuery(this).next('.ui-dialog').first().find('.ui-dialog-titlebar-close').trigger('click');
			});
			
			jQuery('#ModalCartDialog').unbind('dialogclose').bind('dialogclose', function(e) {
				jQuery('#ModalCartDialog').unbind('dialogclose');
			});
			
			jQuery('#ModalCartDialog .modalcartfooter .continueshopping').click(function(e) {
				app.modalCart.close();
			});
			
			app.minicart.bindEditLinks();
		},
		
		// close the quick view dialog
		close: function() {
			jQuery('#ModalCartDialog').dialog('close');
		},
	};
	
}(window.app = window.app || {}, jQuery));


/**
* @class app.bonusProductsView
*/
(function (app, $) {
	app.bonusProductsView = {
		// show bonus product view dialog and send request to the server to get the 
		// bonus products
		// options.url - bonus product url
		show: function(options) {
			if (jQuery('#BonusProductDialog').length == 0) {
				jQuery(document.body).append('<div id="BonusProductDialog"></div>');
			} else {
				jQuery('#BonusProductDialog').empty();
			}
			
			app.dialog.createDialog({id: 'BonusProductDialog', options: {
				height: 530,
				width: 800,
				dialogClass: 'quickview',
				title: 'Select Bonus Products'
			}});
			
			jQuery('#BonusProductDialog').dialog('open');	
			jQuery("#" + "productresultarea").hide();
			app.ajax.load({selector: "#BonusProductDialog", url: options.url, callback: function(responseText, textStatus){
				
			}});
		},
		// close the quick view dialog
		close: function() {
			jQuery('#BonusProductDialog').dialog('close');
		}
	};
}(window.app = window.app || {}, jQuery));


/**
* @class app.util
*/
(function (app, $) {
	app.util = {
		isiPad : function() {
			// return true;
			return (navigator.userAgent.match(/iPad/i) != null);
		},
		
		isSecure: function() {
			return (document.location.protocol == "https:");
		},
		
		// disables browser auto completion for the given element
		disableAutoComplete : function(elemId) {
			jQuery("#"+elemId).attr("autocomplete", "off");
		},

		// trims a prefix from a given string, this can be used to trim
		// a certain prefix from DOM element IDs for further processing on the ID
		trimPrefix : function(str, prefix) {
			return str.substring(prefix.length);
		},
		
		addSlashes : function(str) { 
			return (str+'').replace(/([\\"'])/g, "\\$1").replace(/\0/g, "\\0");
		},
		
		htmlEncode : function(str) { 
			return (str+'').replace(/\"/g,"&quot;");
		},

		// helper for appendParamToURL
		keyValueSplit : function (str, key, value) {
			str = str.split('&');
			
			var x, k, v;
			var kvp = str;
			var output = {};
			
			for (var i=kvp.length-1; i>=0; i--) {
				if (kvp[i].length) { // No empty strings...
					x = kvp[i].split('=');
					k = x[0];
					v = '';
					if (x.length > 1) {
						v = x[1];
					}
					output[k] = v;
				}
			}
			
			output[key] = value;
			
			var arr = [];
			for (var prop in output) {
				arr.push(prop + "=" + output[prop]);
			}
			
			arr.reverse();
			str = arr.join("&");
			
			return str;
		},
		
		// appends the parameter with the given name and
		// value to the given url and returns the changed url
		appendParamToURL : function(url, key, value) {
		
			key = encodeURIComponent(key);
			value = encodeURIComponent(value);
		
			var arr = url.split('?');
			var host = arr[0];
			var search = '';
			var searchHash = '';
			var postHash = false;
		
			if (arr.length > 1) {
				var arrHash = arr[1].split('#'); // Maintain stupid hash parameters
				search = arrHash[0];
		
				if (arrHash.length > 1) {
					postHash = true;
					searchHash = arrHash[1];
				}
			}
		
			if (postHash) {
				// Adding after the hash for backwards compatibility.
				searchHash = app.util.keyValueSplit(searchHash, key, value);
			} else {
				// Adding to the query string.
				search = app.util.keyValueSplit(search, key, value);
			}
			
			url = host;
			if (search.length) {
				url += '?' + search;
			}
			if (postHash) {
				url += '#';
				if (searchHash.length) {
					url += searchHash;
				}
			}
			
			return url;
		},

		// helper for getParamsFromURL
		keyValueArray : function(str) {
			str = str.split('&');
			
			var x, k, v;
			var kvp = str;
			var output = {};
			
			for (var i=kvp.length-1; i>=0; i--) {
				if (kvp[i].length) { // No empty strings...
					x = kvp[i].split('=');
					k = x[0];
					v = '';
					if (x.length > 1) {
						v = x[1];
					}
					output[k] = v;
				}
			}
			
			return output;
		},
		
		/**
		* Get Parameters from URL
		*
		* Return an object with key/value pairs from the URL. If the URL contains a hash (#?) then it will use those values instead.
		*
		* USAGE: WITH QUERY
		* var url = "http://dev03.web.limitedstores.demandware.net/womens-clothing/womens-tops,default,sc.html?srule=highest-rated&prefn1=sizeFamily&prefv1=M&prefn2=colorFamily&prefv2=Navy&start=0&sz=24"
		* USAGE: WITH HASH
		* var url = "http://dev03.web.limitedstores.demandware.net/womens-clothing/womens-tops,default,sc.html#?srule=highest-rated&prefn1=sizeFamily&prefv1=M&prefn2=colorFamily&prefv2=Navy&start=0&sz=24"
		*
		* var obj = app.util.getParamsFromURL(url)
		*
		* obj.prefn1 = "sizeFamily"
		* obj.prefn2 = "colorFamily"
		* obj.prefv1 = "M"
		* obj.prefv2 = "Navy"
		* obj.srule = "highest-rated"
		* obj.start = "0"
		* obj.sz = "24"
		*/
		getParamsFromURL : function(url) {
			var arr = url.split('?');
			var search = '';
			var searchHash = '';
			var postHash = false;
		
			if (arr.length > 1) {
				var arrHash = arr[1].split('#'); // Maintain stupid hash parameters
				search = arrHash[0];
		
				if (arrHash.length > 1) {
					postHash = true;
					searchHash = arrHash[1];
				}
			}
			
			var output = {};
			if (search.length) {
				output = app.util.keyValueArray(search);
			}
			if (postHash) {
				if (searchHash.length) {
					var output2 = app.util.keyValueArray(searchHash);
					for (prop in output2) {
						output[prop] = output2[prop]; // Merge them...
					}
				}
			}
			
			return output;
		},

		// dynamically loads a CSS file
		loadCSSFile : function(url) {
			var elem = document.createElement("link");
			elem.setAttribute("rel", "stylesheet");
			elem.setAttribute("type", "text/css");
			elem.setAttribute("href", url);

			if(typeof elem != "undefined") {
				document.getElementsByTagName("head")[0].appendChild(elem);
				app.util.loadedCSSFiles.push(url);
			}
		},

		// array to keep track of the dynamically loaded CSS files
		loadedCSSFiles : [],

		// removes all dynamically loaded CSS files
		clearDynamicCSS : function() {
			for(var i=0; i<app.util.loadedCSSFiles.length; i++) {
				app.util.unloadCSSFile(app.util.loadedCSSFiles[i]);
			}
		},

		// dynamically unloads a CSS file
		unloadCSSFile : function(url) {
			var candidates = document.getElementsByTagName("link");
			for(var i=candidates.length; i>=0; i--) {
				if(candidates[i] && candidates[i].getAttribute("href") != null && candidates[i].getAttribute("href").indexOf(url) != -1) {
					candidates[i].parentNode.removeChild(candidates[i]);
				}
			}
		},

		// checks if cookies are enabled
		cookiesEnabled : function() {
			
			var test_cookie_name = "dwTestCookie";
			document.cookie = test_cookie_name + "=OK";
			
			// first we'll split this cookie up into name/value pairs
			// note: document.cookie only returns name=value, not the other components
			var all_cookies = document.cookie.split( ';' );
			var temp_cookie = '';
			var cookie_name = '';
			var cookie_value = '';
			var cookie_found = false; // set boolean t/f default f

			for ( i = 0; i < all_cookies.length; i++ )
			{
				// now we'll split apart each name=value pair
				temp_cookie = all_cookies[i].split( '=' );

				// and trim left/right whitespace while we're at it
				cookie_name = temp_cookie[0].replace(/^\s+|\s+$/g, '');

				// if the extracted name matches the session cookie name 
				if ( cookie_name == test_cookie_name )
				{
					// we need to handle case where cookie has no value but exists (no = sign, that is):
					if ( temp_cookie.length > 1 )
					{
						cookie_value = unescape( temp_cookie[1].replace(/^\s+|\s+$/g, '') );
					}

					if (cookie_value.length > 0)
					{
						cookie_found = true;
						document.cookie = test_cookie_name +"=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
						break;
					}
				}
				temp_cookie = null;
				cookie_name = '';
			}
			return cookie_found;
		},
		

		// Returns the version of Internet Explorer or a -1
		// (indicating the use of another browser).
		getInternetExplorerVersion : function() {
			var rv = -1; // Return value assumes failure.
			if (navigator.appName == 'Microsoft Internet Explorer') {
				var ua = navigator.userAgent;
				var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				if (re.exec(ua) != null) {
					rv = parseFloat( RegExp.$1 );
				}
			}
			return rv;
		},


		// checks if cookies are enabled
		browserVersion : function() {
			
			var test_cookie_name = "dwTestCookie";
			document.cookie = test_cookie_name + "=OK";
			
			// first we'll split this cookie up into name/value pairs
			// note: document.cookie only returns name=value, not the other components
			var all_cookies = document.cookie.split( ';' );
			var temp_cookie = '';
			var cookie_name = '';
			var cookie_value = '';
			var cookie_found = false; // set boolean t/f default f

			for ( i = 0; i < all_cookies.length; i++ )
			{
				// now we'll split apart each name=value pair
				temp_cookie = all_cookies[i].split( '=' );

				// and trim left/right whitespace while we're at it
				cookie_name = temp_cookie[0].replace(/^\s+|\s+$/g, '');

				// if the extracted name matches the session cookie name 
				if ( cookie_name == test_cookie_name )
				{
					// we need to handle case where cookie has no value but exists (no = sign, that is):
					if ( temp_cookie.length > 1 )
					{
						cookie_value = unescape( temp_cookie[1].replace(/^\s+|\s+$/g, '') );
					}

					if (cookie_value.length > 0)
					{
						cookie_found = true;
						document.cookie = test_cookie_name +"=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
						break;
					}
				}
				temp_cookie = null;
				cookie_name = '';
			}
			return cookie_found;
		},
		
		/**
		 * IE 6 multiple button submit issue work around.
		 * when a form has multiple buttons of submit type, then IE 6 submits all of them
		 * whenever form is submitted. e.g. Remove on cart page would remove the wrong item
		 * (always first item in the cart) because IE 6 submits all form data which includes all 
		 * remove links!!!
		 * the workaorund is to disable all buttons except the one which is being clicked.
		 * it should only be called for IE 6 (check out htmlhead.isml for usage)
		 */
		ie6ButtonFix: function() {
			jQuery('button').click(function(e){				
				e.preventDefault();
				// disable all buttons
				jQuery(this.form).find('button').attr("disabled", true);
				// enable the one being clicked
				jQuery(this).attr("disabled", false);
			});
		},
		
		// uses regexp to check if an email is valid or not
		// returns true or false
		isValidEmailAddress: function(emailAddress) {
			var pattern = new RegExp(/^(("[\+\w-\s]+")|([\+\w-]+(?:\.[\+\w-]+)*)|("[\+\w-\s]+")([\+\w-]+(?:\.[\+\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			return pattern.test(emailAddress);
		},
		
		/**
		* Select a form Option based on value.
		*
		* changeFormSelection(jQuery('select[name=' + selectors['formPrefix'] + 'states_stateDynamic]')[0], data.address.stateCode);
		*/
		changeFormSelection: function(selectElem, selectedValue){
			if (!selectElem) {
				return;
			}
			var options = selectElem.options;
			if (options.length > 0) {
				// find index of value to select
				var idx = 0;
				for (var i=0; i<options.length; i++) {
					if(options[i].value != selectedValue) continue;
					idx = i; break;
				}
				selectElem.selectedIndex = idx;
			}
		}
	};
}(window.app = window.app || {}, jQuery));


/**
* @class app.dialog
*/
(function (app, $) {
	app.dialog = {
		// opens a dialog using the given url
		open : function(url, title, container) {
			container = container == undefined ? 'dialogcontainer' : container;
			
			// create the dialog container if not present already
			if (jQuery("#"+container).length == 0) {
				jQuery(document.body).append('<div id="'+container+'"></div>');
			} else {
				// empty the container
				jQuery("#"+container).empty();
			}

			// set a default title
			title = title || "Dialog";

			// finally load the dialog, set the dialog title
			app.ajax.load({
				selector: "#"+container,
				url: url,
				callback: function() {
					app.dialog.checkOpen(container);
					app.dialog.setTitle(title);
				}
			});
		},

		// initializes the dialog with common dialog actions, like closing upon canceling
		// use this function in the dialog rendering template to re-bind common actions
		// upon dialog reload
		init : function() {
			jQuery(document).ready(function() {
				// binds the action to all buttons defining an action through the "name" attribute
				jQuery("#dialogcontainer button").each(function() {
					jQuery(this).click(function(e) {
						e.preventDefault();
						var action = jQuery(this).attr("name");
						if(action) {
							app.dialog.submit(action);
						}
						return false;
					});
				});

				// cancel button binding
				jQuery("#dialogCancelBtn").click(function(e) {
					e.preventDefault();
					app.dialog.close();
					return false;
				});					
			});
		},

		// sets the title of the dialog
		setTitle : function(title, container) {
			container = container == undefined ? 'dialogcontainer' : container;
			jQuery("#"+container).dialog("option", "title", title);
		},

		// checks, if the dialog is in the state "open" and sets the state if not presently set
		// this function is implicitly called by app.dialog.open(url, title) in order to initialize
		// the dialog properly; use this function to recover the "open" state of a dialog
		checkOpen : function(container) {
			container = container == undefined ? 'dialogcontainer' : container;
			
			// Explicitly compare with true to avoid the dialog being returned as an object
			if (jQuery("#"+container).dialog("isOpen") !== true) {
				jQuery("#"+container).dialog({
					// bgiframe: true,
					autoOpen: false,
					modal: true,
					overlay: {
						opacity: 0.5,
						background: "black"
					},
					height: 425,
					width: 460,
					resizable: false,
					draggable: false
				});
				jQuery("#"+container).dialog("open");
			}
		},
		
		// opens a dialog using the given url
		loadFullView : function(url, title) {
			// create the dialog container if not present already
			if (jQuery("#fullviewcontainer").length == 0) {
				jQuery(document.body).append("<div id=\"fullviewcontainer\"></div>");
			} else {
				jQuery("#fullviewcontainer").empty();
			}

			// set a default title
			title = title || "Full View";

			// finally load the dialog, set the dialog title
			app.ajax.load({
				selector: "#fullviewcontainer",
				url: url,
				callback: function() {
					app.dialog.openFullView();
				}
			});
		},
		
		// called by loadFullView
		openFullView : function() {
			jQuery("#fullviewcontainer").dialog({
				// bgiframe: true,
				autoOpen: false,
				modal: true,
				overlay: {
					opacity: 0.5,
					background: "black"
				},
				width: 'auto',
				minWidth: 708,
				maxWidth: 1050,
				minHeight: 670,
				fluid: true,
				resizable: false,
				draggable: false,
				dialogClass: 'enlarge-window'
			});
			jQuery("#fullviewcontainer").dialog("open");
			app.quickView.fluidDialog();
			
			jQuery(".ui-widget-overlay").last().unbind("click").bind("click", function(e) {
				e.preventDefault();
				jQuery(this).next('.ui-dialog').first().find('.ui-dialog-titlebar-close').trigger('click');
			});
		},

		// closes the dialog and triggers the "close" event for the dialog
		close : function() {
			jQuery("#dialogcontainer").dialog("close");
			jQuery(document.body).trigger("dialogClosed");
		},

		// attaches the given callback function upon dialog "close" event
		onClose : function(callback) {
			if(callback != undefined) {
				jQuery(document.body).bind("dialogClosed", callback);
			}
		},

		// triggers the "apply" event for the dialog
		triggerApply : function() {
			jQuery(document.body).trigger("dialogApplied");
		},

		// attaches the given callback function upon dialog "apply" event
		onApply : function(callback) {
			if(callback != undefined) {
				jQuery(document.body).bind("dialogApplied", callback);
			}
		},

		// triggers the "delete" event for the dialog
		triggerDelete : function() {
			jQuery(document.body).trigger("dialogDeleted");
		},

		// attaches the given callback function upon dialog "delete" event
		onDelete : function(callback) {
			if(callback != undefined) {
				jQuery(document.body).bind("dialogDeleted", callback);
			}
		},

		// submits the dialog form with the given action
		submit : function(action) {
			// set the action
			jQuery("#dialogcontainer form").append("<input name=\"" + action + "\" type=\"hidden\" />");

			// serialize the form and get the post url
			var post = jQuery("#dialogcontainer form").serialize();
			var url = jQuery("#dialogcontainer form").attr("action");

			// post the data and replace current content with response content
			jQuery.ajax({
			   type: "POST",
			   url: url,
			   data: post,
			   dataType: "html",
			   success: function(data){
					jQuery("#dialogcontainer").empty().html(data);
			   },
			   failure: function(data) {
				   alert(app.resources["SERVER_ERROR"]);
			   }
			});
		},
		
		// This function 
		createDialog: function(options) {
			jQuery('#'+options.id).dialog(jQuery.extend({}, app.dialogSettings, options.options));
			
			jQuery('.ui-widget-overlay').last().unbind('click').bind('click', function(e) {
				e.preventDefault();
				jQuery(this).next('.ui-dialog').first().find('.ui-dialog-titlebar-close').trigger('click');
				// jQuery('.ui-dialog-titlebar-close', jQuery(this).prev()).trigger('click');
			});
		},
		
		/**
		* Create a simple dialog.
		*
		* selectorID:		jQuery selected starting with #
		* content:			String content.
		* autoOpen:			Boolean. Open the dialog.
		* options: 			Override default dialog settings.
		*
		* app.dialog.simpleDialog('#selectAddressDialog', html, {width: 520});
		*/
		simpleDialog: function(selectorID, content, autoOpen, options) {
			if (selectorID.indexOf('#') != 0) { // Must have a pound (#) sign in front!
				return;
			}
		
			// ---------- Container ----------
			if (jQuery(selectorID).length == 0) {
				jQuery('<div/>').attr('id', selectorID.slice(1)).appendTo(document.body);
			} else {
				jQuery(selectorID).dialog('close');
				jQuery(selectorID).empty();
			}
	
			// ---------- Content ----------
			if (content != undefined) {
				jQuery(selectorID).append(content);
			}
	
			// ---------- Dialog ----------
			var defaults = {
				// bgiframe: true,
				autoOpen: false,
				resizable: false,
				draggable: false,
				modal: true,
				width: '450',
				height : 'auto',
				buttons : {},
				title : '',
				position : 'center',
				overlay: {
					opacity: 0.5,
					background: "black"
				},
				dialogClass: selectorID.slice(1)
			}
			if (options == undefined) {
				options = {};
			}
			var settings = jQuery.extend({}, defaults, options);
			jQuery(selectorID).dialog(settings);
			
			if (autoOpen == true) {
				jQuery(selectorID).dialog("open");
			}

			// ---------- Close ----------
			jQuery('.ui-widget-overlay').last().unbind('click').bind('click', function(e) {
				e.preventDefault();
				jQuery(this).next('.ui-dialog').first().find('.ui-dialog-titlebar-close').trigger('click');
			});
		}

	};
	
	// Legacy
	app.createDialog = app.dialog.createDialog;
}(window.app = window.app || {}, jQuery));


jQuery.fn.center = function (absolute) {
	return this.each(function () {
		var t = jQuery(this);

		t.css({
			position:	absolute ? 'absolute' : 'fixed', 
			left:		'50%', 
			top:		'50%', 
			zIndex:		'99'
		}).css({
			marginLeft:	'-' + (t.outerWidth() / 2) + 'px', 
			marginTop:	'-' + (t.outerHeight() / 2) + 'px'
		});

		if (absolute) {
			t.css({
				marginTop:	parseInt(t.css('marginTop'), 10) + jQuery(window).scrollTop(), 
				marginLeft:	parseInt(t.css('marginLeft'), 10) + jQuery(window).scrollLeft()
			});
		}
	});
};


/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
		} catch(e) {
			return;
		}

		try {
			// If we can't parse the cookie, ignore it, it's unusable.
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {
		expires: 90,
		path: '/'
	};
	config.json = true;
	config.raw = false;

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PRODUCTCONTROLLER.JS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

/**
* Product Controller
*
* DESCRIPTION:
* ProductController app.js to add product specific controls for PDP, Quickview, Cart Edit
* and more.
*
* The script is instantiated, meaning that you can have more than one. So, you be on the
* PDP page and do a Cart Edit in quickview at the same time.
*
* Instances are stored in app.ProductCacheRef[ID]
*
* USAGE:
* ProductController is created on the PDP page itself.
*
* jQuery(document).ready(function(){
*      app.ProductCache = new app.ProductController({data: <isinclude template="product/productjson"/>});
*      app.ProductCache.show({containerSelector: "#pdpMain.pdpselector", append: false, source: "pdp", eventTrigger: "AddToCart"});
* });
*/	
(function(app){
	if (app) {
		
		/**
		* Library
		*/
		app.ProductController = function(response) {
			
			// Private Variables
			this._variantsLoaded = false;
			var _initialized = false;
			
			// Public Variables
			this.PDO = new ProductDataObj(response.data);
			this.OOS = response.OOS == undefined ? false : response.OOS; // Out of stock mode. Find in store is active.
			
			this.containerID;
			this.appendProduct;
			this.pageSource;
			this.eventTrigger;
			
			this.findInStoreResults;
			this.findInStoreAvailability;
			
			
			/* --------------- CONSTRUCTOR --------------- */
			
			/**
			* Add a reference to this object instance to app.ProductCacheRef
			*/
			__ProductController(this);
			function __ProductController(scope) {
				app.ProductCacheRef[scope.PDO.ID] = scope;
			}
			
			
			/* --------------- INITIALIZATION --------------- */
			
			/**
			* Kick Off Display Initialization (PUBLIC)
			*
			* Triggered by the page on document ready.
			*/
			this.show = __DisplayInit;
			function __DisplayInit(options) {
				
				_initialized			= true;
				this._variantsLoaded	= false;
				
				this.containerID		= options.containerSelector;
				this.appendProduct		= options.append;
				this.pageSource			= options.source; // productsetproduct, toplooks, pdp, quickview, cart, minicart, quickviewtoplooks
				this.eventTrigger		= options.eventTrigger;
				
				if (this.PDO.isOutfitGroup == true) {
					// Outfit groups don't have variants or swatches.
					this.InitOutfitGroup();
				} else if (this.PDO.isMaster || this.PDO.isVariant) {
					// This is a Master, Variant (or OutfitProduct)
					__LoadVariants(this);
				}
			}
			
			
			/**
			* Initialize Interface
			*
			* This is called after ParseVariants callback.
			*/
			this.InitInterface = __InitInterface;
			function __InitInterface() {
				
				this.BindSwatches();
				this.BindQuantity();
				this.BindOutfitCheckbox();
				
				this.BindWishlist();
				this.BindFindInStore();
				this.BindViewFullDetails();
				this.BindWatchVideo();
				this.BindSendToFriend();
				this.BindAddToCart();
				
				this.AppendSwatchImages();
				this.InitSwatchStates();
				this.UpdateSwatchStates();
				this.UpdateColorFeatures();
				
				this.BindPrintHandler();
				SizeChart.init();
				
				this.Tracking("init", this.GetSelectedVariant());
				
			}
			
			
			/**
			* Init Outfit Group
			*
			* This initializes the interface for the outfit group product:
			* 1. Facebook
			* 2. Send to Friend
			* 3. Add Selected Button
			*/
			this.InitOutfitGroup = __InitOutfitGroup;
			function __InitOutfitGroup() {
			
				this.BindSendToFriend();
				this.BindAddOutfit();
				this.BindOutfitInterface();

				this.BindPrintHandler();
				SizeChart.init();
			}
			
			
			/* --------------- SWATCH EVENT HANDLING --------------- */
			
			/**
			* Bind Swatches (PUBLIC)
			*
			* Normally I would loop through AO.vals and bind handlers based on
			* their value. But to do that we would need to escape the 'rel'
			* attribute. Instead we will loop through the HTML elements.
			*
			* For instance:
			* a[rel='S/30"'] would need to be a[rel='S\\/30\\"']
			*
			*/
			this.BindSwatches = __BindSwatches;
			function __BindSwatches() {
				
				var attributeID, selector, AO, hander, AVO;
				var scope = this;
				
				/**
				* There are four different scenarios for swatch selections depending on the type of product: 
				* "colorCode + size/sizeCode"
				* "colorCode + size/sizeCode + pantLength"
				* "sizeType + colorCode + size/sizeCode"
				* "sizeType + colorCode + size/sizeCode + pantLength"
				*
				* AO = scope.PDO.variations[attributeID]; returns undefined is that attribute does not exist...
				*/
				
				/**
				* These are broken out as separate loops for the sake of readability.
				*/
				
				// colorCode
				attributeID = 'colorCode';
				hander = scope.ColorSwatchHander;
				AO = scope.PDO.variations[attributeID];
				if (AO != undefined) {
					selector = '.variationattributes .swatches.'+attributeID+' ul.swatchesdisplay li a';
					jQuery(selector, scope.containerID).each(function() {
						var rel = jQuery(this).attr('rel');
						var AVO = AO.vals[rel];
						var data = {'scope': scope, 'AVO': AVO, 'AO': AO};
						jQuery(this).bind('click', data, hander);
					});
				}
				
				// We only want to enable the color swatches for OOS products.
				if (scope.OOS == true) {
					return;
				}
				
				// sizeType
				attributeID = 'sizeType';
				hander = scope.SizeTypeSwatchHander;
				AO = scope.PDO.variations[attributeID];
				if (AO != undefined) {
					selector = '.variationattributes .swatches.'+attributeID+' ul.swatchesdisplay li a';
					jQuery(selector, scope.containerID).each(function() {
						var rel = jQuery(this).attr('rel');
						var AVO = AO.vals[rel];
						var data = {'scope': scope, 'AVO': AVO, 'AO': AO};
						jQuery(this).bind('click', data, hander);
					});
				}
				
				// size
				attributeID = 'size';
				hander = scope.SizeSwatchHander;
				AO = scope.PDO.variations[attributeID];
				if (AO != undefined) {
					selector = '.variationattributes .swatches.'+attributeID+' ul.swatchesdisplay li a';
					jQuery(selector, scope.containerID).each(function() {
						var rel = jQuery(this).attr('rel');
						var AVO = AO.vals[rel];
						var data = {'scope': scope, 'AVO': AVO, 'AO': AO};
						jQuery(this).bind('click', data, hander);
					});
				}
				
				// pantLength
				attributeID = 'pantLength';
				hander = scope.PantLengthSwatchHander;
				AO = scope.PDO.variations[attributeID];
				if (AO != undefined) {
					selector = '.variationattributes .swatches.'+attributeID+' ul.swatchesdisplay li a';
					jQuery(selector, scope.containerID).each(function() {
						var rel = jQuery(this).attr('rel');
						var AVO = AO.vals[rel];
						var data = {'scope': scope, 'AVO': AVO, 'AO': AO};
						jQuery(this).bind('click', data, hander);
					});
				}
			}
			
			
			/**
			* Color Swatch Click Hander (PUBLIC)
			*
			* DESCRIPTION:
			* Color swatches SOMETIMES behave different than other swatches. You can always select
			* them and they are never disabled or unselectable. And they behave like
			* radio button - you cannot deselect them.
			*
			* IF THERE IS A SIZETYPE, then color behaves like SIZE or LENGTH
			*
			* If the color+size combination is not available, then the size swatch
			* show a selected-but-unselectable state.
			*
			* Changing a color swatch triggers:
			* 1. Main image swap.
			* 2. Enlarge image swap.
			* 3. Thumbnail image swap.
			* 4. Snipe
			* 6. "Get the look" swap.
			* 7. Update "View Detail" link.
			* 8. Update "Facebook" link.
			* 9. Update "Send to Friend" link.
			*/
			this.ColorSwatchHander = __ColorSwatchHander;
			function __ColorSwatchHander(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				var AVO = e.data.AVO;
				var AO = e.data.AO;
				
				if (scope.OOS == true) {
					// Color swatches should always be clickable if product is OOS.
				} else {
					var hasSizeType = (scope.PDO.variations['sizeType'] != undefined);
					if (hasSizeType == true) {
						if (jQuery(this).parent('li').hasClass('unselectable') == true) {
							return; // Nope. This one is disabled, can't click on it...
						} else {
							// Okay. Continue below...
						}
					} else {
						// Okay. Continue below...
					}
				}
								
				// Get the currently selected value.
				selector = '.variationattributes .swatches.' + AO.id + ' ul.swatchesdisplay li.selected';
				var currentSelection = jQuery(selector, scope.containerID).find('a').attr('rel');
		
				// Deselect all the swatches.
				selector = '.variationattributes .swatches.' + AO.id + ' ul.swatchesdisplay li';
				jQuery(selector, scope.containerID).removeClass('selected');
		
				// Select this one.
				jQuery(this).parent('li').addClass('selected');
		
				var isSwitched = false;
				if (currentSelection == undefined || currentSelection != AVO.val) {
					isSwitched = true;
				}
		
				if (isSwitched) { // Update color dependent images and stuff.
					scope.UpdateColorFeatures();
				}
		
				// Update swatch states
				scope.UpdateSwatchStates();
				scope.Tracking('swatchClick', AVO.cc);
			}
			
			
			/**
			* Size Type Swatch Click Hander (PUBLIC)
			*/
			this.SizeTypeSwatchHander = __SizeTypeSwatchHander;
			function __SizeTypeSwatchHander(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				var AVO = e.data.AVO;
				var AO = e.data.AO;
				
				// Get the currently selected value.
				selector = '.variationattributes .swatches.' + AO.id + ' ul.swatchesdisplay li.selected';
				var currentSelection = jQuery(selector, scope.containerID).find('a').attr('rel');
								
				// Deselect all the swatches.
				selector = '.variationattributes .swatches.' + AO.id + ' ul.swatchesdisplay li';
				jQuery(selector, scope.containerID).removeClass('selected');
				
				// Select this one.
				jQuery(this).parent('li').addClass('selected');
				
				// Select or deselect the clicked swatch
				var isSwitched = false;
				if (currentSelection == undefined || currentSelection != AVO.val) {
					isSwitched = true;
				}
				
				// Update swatch states
				scope.UpdateSwatchStates();
			}
			
			
			/**
			* Pant Size Swatch Click Hander (PUBLIC)
			*/
			this.SizeSwatchHander = __SizeSwatchHander;
			function __SizeSwatchHander(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				var AVO = e.data.AVO;
				var AO = e.data.AO;
				
				if (jQuery(this).parent('li').hasClass('unselectable') == false) {
					// Get the currently selected value.
					selector = '.variationattributes .swatches.' + AO.id + ' ul.swatchesdisplay li.selected';
					var currentSelection = jQuery(selector, scope.containerID).find('a').attr('rel');
									
					// Deselect all the swatches.
					selector = '.variationattributes .swatches.' + AO.id + ' ul.swatchesdisplay li';
					jQuery(selector, scope.containerID).removeClass('selected');
					
					// Select this one.
					jQuery(this).parent('li').addClass('selected');
					
					// Select or deselect the clicked swatch
					var isSwitched = false;
					if (currentSelection == undefined || currentSelection != AVO.val) {
						isSwitched = true;
					}
					
					// Update swatch states
					scope.UpdateSwatchStates();
				}
			}
			
			
			/**
			* Pant Swatch Click Hander (PUBLIC)
			*/
			this.PantLengthSwatchHander = __PantLengthSwatchHander;
			function __PantLengthSwatchHander(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				var AVO = e.data.AVO;
				var AO = e.data.AO;
				
				if (jQuery(this).parent('li').hasClass('unselectable') == false) {
					// Get the currently selected value.
					selector = '.variationattributes .swatches.' + AO.id + ' ul.swatchesdisplay li.selected';
					var currentSelection = jQuery(selector, scope.containerID).find('a').attr('rel');
									
					// Deselect all the swatches.
					selector = '.variationattributes .swatches.' + AO.id + ' ul.swatchesdisplay li';
					jQuery(selector, scope.containerID).removeClass('selected');
					
					// Select this one.
					jQuery(this).parent('li').addClass('selected');
					
					// Select or deselect the clicked swatch
					var isSwitched = false;
					if (currentSelection == undefined || currentSelection != AVO.val) {
						isSwitched = true;
					}
					
					// Update swatch states
					scope.UpdateSwatchStates();
				}
			}
			
			
			this.InitSwatchStates = __InitSwatchStates;
			function __InitSwatchStates() {
				var scope = this;

				var VDO = scope.GetSelectedVariant();
					
				if (VDO != null) {
					// The product is a fully selected variant...
					
				} else {
					// No valid variant selected. Find one!

					var hasSizeType			= (scope.PDO.variations['sizeType'] != undefined);
				
					var selector;
					var possibleVariantArray, colorCodeVariantArray, sizeTypeVariantArray, sizeVariantArray, pantLengthVariantArray;
					

					// ----- Selected Color Code -----
					// This is where we see if there is a selected color. There should
					// always be a selected color unless something is really wacky.
					selector = '.variationattributes .swatches.colorCode ul.swatchesdisplay li';
					var colorCode = scope.GetSelectedColorCode();
					var colorCodeVariantArray = undefined;

					if (colorCode == undefined) {
						return; // No color is selected. This should not happen.
					} else {
						colorCodeVariantArray = scope.PDO.variantMatrix['colorCode'][colorCode];
						if (colorCodeVariantArray == undefined) {
							return; // This should not happen.
						} else {
							//
						}
					}
					
					
					if (hasSizeType == true) {
						// ----- Has Size Type -----
						
						// ----- Selected Size Type -----
						// This is where we see if there is a selected size type. Possible
						// options are Regular, Petite, and Tall. The goal is to make sure
						// that the selected color is available in the selected size type.
						selector = '.variationattributes .swatches.sizeType ul.swatchesdisplay li';
						var sizeType = scope.GetSelectedSizeType();
						var sizeTypeVariantArray = undefined;
						
						if (sizeType == undefined) {
							//
						} else {
							sizeTypeVariantArray = scope.PDO.variantMatrix['sizeType'][sizeType];
							if (sizeTypeVariantArray == undefined) {
								//
							} else {
								possibleVariantArray = scope.ArrayIntersection(colorCodeVariantArray, sizeTypeVariantArray);
							
								// Here we are verifying that the selected color is available in the selected size type.
								var availableCount = 0;
								var availableVDO = null;
								for (var i=0; i<possibleVariantArray.length; i++) {
									VDO = possibleVariantArray[i];
									if (VDO.availability.avStatus == 'IN_STOCK' || VDO.availability.avStatus == 'BACKORDER' || VDO.availability.avStatus == 'PREORDER') {
										// Success! At least one possible combo of the selected ColorCode and SiteType is available.
										availableCount++;
										availableVDO = VDO;
									}
								}
								if (availableCount == 1 && availableVDO != null) {
									// There is one combination that works. Select it.
									scope.SelectVariant(availableVDO, sizeType);
									return;
								} else if (availableCount > 0) {
									// There are multiple combinations that works.
									return;
								} else {
									// The selected color is not available in this size type (sold out)
								}
							}
						}
						
								
						// ----- Find A Color In Stock -----
						// If we have arrived here, then the selected color is not available in the
						// selected size type. We need to loop through Regular, Petite, and Tall and
						// and find a sizeType in which the color is available.
						selector = '.variationattributes .swatches.sizeType ul.swatchesdisplay li';
						var sizeTypes = jQuery(selector, scope.containerID);
						
						if (sizeTypes.length > 0) {
							for (var j=0; j<sizeTypes.length; j++) {
								el = jQuery(selector, scope.containerID).get(j);
								var sizeType = jQuery(el).find('a').attr('rel');
						
								if (sizeType == undefined) {
									continue;
								} else {
									sizeTypeVariantArray = scope.PDO.variantMatrix['sizeType'][sizeType];
									if (sizeTypeVariantArray == undefined) {
										continue;
									} else {
										possibleVariantArray = scope.ArrayIntersection(colorCodeVariantArray, sizeTypeVariantArray);
										if (possibleVariantArray.length > 0) {
											var availableCount = 0;
											var availableVDO = null;
											for (var i=0; i<possibleVariantArray.length; i++) {
												VDO = possibleVariantArray[i];
												if (VDO.availability.avStatus == 'IN_STOCK' || VDO.availability.avStatus == 'BACKORDER' || VDO.availability.avStatus == 'PREORDER') {
													availableCount++;
													availableVDO = VDO;
												}
											}
							
											if (availableCount == 1 && availableVDO != null) {
												// There is one combination that works. Select it.
												scope.SelectVariant(availableVDO, sizeType);
												return;
											} else if (availableCount > 0) {
												// There are multiple combinations that works.
												jQuery(selector, scope.containerID).removeClass('selected');
												jQuery(el).addClass('selected');
												return;
											} else {
												// The selected color is not available in this size type (sold out)
											}
										}
									}
								}
							}
						}
						
						// Failed to find anything in stock...
					} else {
						// ----- Does Not Have Size Type -----
								
						// ----- Check for Single Variant -----
						// Check if there is a single variant available in the selected color.
						possibleVariantArray = colorCodeVariantArray
						if (possibleVariantArray.length > 0) {
							var availableCount = 0;
							var availableVDO = null;
							for (var i=0; i<possibleVariantArray.length; i++) {
								VDO = possibleVariantArray[i];
								if (VDO.availability.avStatus == 'IN_STOCK' || VDO.availability.avStatus == 'BACKORDER' || VDO.availability.avStatus == 'PREORDER') {
									availableCount++;
									availableVDO = VDO;
								}
							}
			
							if (availableCount == 1 && availableVDO != null) {
								// There is one combination that works. Select it.
								scope.SelectVariant(availableVDO, sizeType);
								return;
							} else if (availableCount > 0) {
								// There are multiple combinations that works.
								return;
							} else {
								// The selected color is not available in this size type (sold out)
							}
						}
					
					}
				}
			}
			
			
			this.SelectVariant = __SelectVariant;
			function __SelectVariant(VDO, sizeType) {
				var scope = this;
				
				if (sizeType != undefined) {
					if (jQuery('.size-chart-link', scope.containerID).length > 0) {
						var href = jQuery('.size-chart-link', scope.containerID).attr('href');
						href = app.util.appendParamToURL(href, 'sizeType', sizeType);
						jQuery('.size-chart-link', scope.containerID).attr('href', href);
					}
				}
				
				if (VDO != null) {
					// Select this one...
					for (attr in VDO.attributes) {
						val = VDO.attributes[attr];
						selector = '.variationattributes .swatches.' + attr + ' ul.swatchesdisplay li';
						if (jQuery(selector, scope.containerID).length > 0) {
							jQuery(selector, scope.containerID).removeClass('selected');
							jQuery(selector, scope.containerID).each(function() {
								var rel = jQuery(this).find('a').attr('rel');						
								if (rel == val) {
									jQuery(this).addClass('selected');
								}
							});
						}
					}
				}
			}
			
			
			/**
			* Update Swatch States
			*
			* There are four different scenarios for swatch selections depending on the
			* type of product: 
			* "colorCode + size"
			* "colorCode + size + pantLength"
			* "sizeType + colorCode + size"
			* "sizeType + colorCode + size + pantLength"
			*
			* We need to determine what's selected and then enable/disable swatches based on
			* the avStatus (IN_STOCK or BACKORDER).
			*
			* This is also called for the Quantity Dropdown.
			*
			* 1. Enable or disable the cart buttons.
			* 2. Do optional call to check the realtime availability.
			* 3. Display messages (low-stock, out of stock, backorder messages.)
			*
			* Params:
			* updateSwatches	boolean		true: update swatch states, false: only validate (for quantity dropdown)
			*/
			this.UpdateSwatchStates = __UpdateSwatchStates;
			function __UpdateSwatchStates(updateTheSwatches) {
				var scope = this;
				if (scope.OOS == true) {
					return; // Color swatches should always be clickable if product is OOS.
				}
				
				updateTheSwatches = updateTheSwatches == undefined ? true : updateTheSwatches;
				
				var hasSizeType			= (scope.PDO.variations['sizeType'] != undefined);
				// var hasColorCode		= (scope.PDO.variations['colorCode'] != undefined);		// This should always be true...
				// var hasSize			= (scope.PDO.variations['size'] != undefined);			// This should always be true...
				var hasPantLength		= (scope.PDO.variations['pantLength'] != undefined);
				
				var selector;
				// var intersect_colorCode_sizeType			= [];
				// var intersect_colorCode_size				= [];
				// var intersect_colorCode_size_pantLength		= [];
				var possibleVariantArray, colorCodeVariantArray, sizeTypeVariantArray, sizeVariantArray, pantLengthVariantArray;
				
				var hint = '';
				var stronghint = '';
					
				// The "top level" attribute (either sizeType or colorCode) is always enabled.
				if (hasSizeType == true) {
					/**
					* "sizeType + colorCode + size"
					* "sizeType + colorCode + size + pantLength"
					*/
					
					// ----- Size Type -----
					selector = '.variationattributes .swatches.sizeType ul.swatchesdisplay li';
					// jQuery(selector, scope.containerID).removeClass('unselectable');
					var sizeType = scope.GetSelectedSizeType();
					if (sizeType == undefined) { // One of these must be selected...
						jQuery(selector, scope.containerID).first().addClass('selected');
						sizeType = scope.GetSelectedSizeType();
					}
					if (sizeType != undefined) {
						sizeTypeVariantArray = scope.PDO.variantMatrix['sizeType'][sizeType];
						if (sizeTypeVariantArray != undefined) {
							possibleVariantArray = sizeTypeVariantArray;
						}
						if (jQuery('.size-chart-link', scope.containerID).length > 0) {
							var href = jQuery('.size-chart-link', scope.containerID).attr('href');
							href = app.util.appendParamToURL(href, 'sizeType', sizeType);
							jQuery('.size-chart-link', scope.containerID).attr('href', href);
						}
					}
					
					// ----- Show / Hide Swatches -----
					if (updateTheSwatches) { // Disable / Enable Size Swatches
						var attribs = ['colorCode', 'size', 'pantLength'];
						var attr;
						for (var j=0; j<attribs.length; j++) {
							attr = attribs[j]
							selector = '.variationattributes .swatches.' + attr + ' ul.swatchesdisplay li';
							if (jQuery(selector, scope.containerID).length > 0) {
								jQuery(selector, scope.containerID).addClass('unavailable');
								jQuery(selector, scope.containerID).each(function() {
									var rel = jQuery(this).find('a').attr('rel');						
									var VDO;
									for (var i=0; i<possibleVariantArray.length; i++) {
										VDO = possibleVariantArray[i];
										if (VDO.attributes[attr] == rel) {
											jQuery(this).removeClass('unavailable');
										}
									}
								});
							}
						}
					
						// Show / Hide Price Group
						jQuery('.variationattributes .swatches.colorCode .priceGroup', scope.containerID).each(function() {
							var lis = jQuery(this).find('ul.swatchesdisplay li');
							var hidden = true;
							for (var i=0; i<lis.length; i++) {
								if (jQuery(lis[i]).hasClass('unavailable')) {
									// Check next
								} else {
									hidden = false;
									break;
								}
							}
							if (hidden) {
								jQuery(this).hide();
							} else {
								jQuery(this).show();
							}
						});
						
						// Select the first one if there is only one.
						attribs = ['size', 'pantLength'];
						for (var j=0; j<attribs.length; j++) {
							attr = attribs[j]
							selector = '.variationattributes .swatches.' + attr + ' ul.swatchesdisplay li';
							arr = jQuery(selector, scope.containerID).filter(function(index){
								if ($(this).hasClass('unavailable')) {
									return false;
								}
								return true;
								/*
								 else if ($(this).hasClass('selected')) {
									return true;
								} else if ($(this).hasClass('unselectable')) {
									return true;
								}
								return false;
								*/
							});
							// jQuery('.variationattributes .swatches.' + attr).show();
							if (arr.length == 1) {
								jQuery(selector, scope.containerID).removeClass('selected');
								jQuery(arr[0]).first().addClass('selected');
								// jQuery('.variationattributes .swatches.' + attr).hide();
							}
						}
					}
					
					// ----- Color Code -----
					selector = '.variationattributes .swatches.colorCode ul.swatchesdisplay li';
					if (updateTheSwatches) { // Disable / Enable Swatches
						if (jQuery(selector, scope.containerID).length > 0) {
							jQuery(selector, scope.containerID).addClass('unselectable');
							jQuery(selector, scope.containerID).each(function() {
								var rel = jQuery(this).find('a').attr('rel');
							
								var VDO;
								for (var i=0; i<possibleVariantArray.length; i++) {
									VDO = possibleVariantArray[i];
									if (VDO.attributes['colorCode'] == rel) {
										if (VDO.availability.avStatus == 'IN_STOCK' || VDO.availability.avStatus == 'BACKORDER' || VDO.availability.avStatus == 'PREORDER') {
											jQuery(this).removeClass('unselectable');
										}
										// break;
									}
								}
							});
						}
					}
					var colorCode = scope.GetSelectedColorCode();
					if (colorCode != undefined) {
						colorCodeVariantArray = scope.PDO.variantMatrix['colorCode'][colorCode];
						if (colorCodeVariantArray != undefined) {
							possibleVariantArray = scope.ArrayIntersection(possibleVariantArray, colorCodeVariantArray);
						}
					}					
					if (colorCode == undefined && jQuery(selector, scope.containerID).length > 0) {
						possibleVariantArray = [];
						hint = '<strong>Please select a Color.</strong>';
					}
					if (possibleVariantArray.length == 0) {
						stronghint = '<strong>Selected Color is not available in ' + sizeType + '.</strong>';
					}
				
					// ----- Size -----
					selector = '.variationattributes .swatches.size ul.swatchesdisplay li';
					if (updateTheSwatches) { // Disable / Enable Size Swatches
						if (jQuery(selector, scope.containerID).length > 0) {
							jQuery(selector, scope.containerID).addClass('unselectable');
							jQuery(selector, scope.containerID).removeClass('cantselectyet');
							if (possibleVariantArray.length == 0) { // Select a color first...
								jQuery(selector, scope.containerID).addClass('cantselectyet');
							}
							jQuery(selector, scope.containerID).each(function() {
								var rel = jQuery(this).find('a').attr('rel');
							
								var VDO;
								for (var i=0; i<possibleVariantArray.length; i++) {
									VDO = possibleVariantArray[i];
									if (VDO.attributes['size'] == rel) {
										if (VDO.availability.avStatus == 'IN_STOCK' || VDO.availability.avStatus == 'BACKORDER' || VDO.availability.avStatus == 'PREORDER') {
											jQuery(this).removeClass('unselectable');							
										}
										// break;
									}
								}
							});
						}
					}
					var size = scope.GetSelectedSize();
					if (size != undefined) {
						sizeVariantArray = scope.PDO.variantMatrix['size'][size];
						if (sizeVariantArray != undefined) {
							possibleVariantArray = scope.ArrayIntersection(possibleVariantArray, sizeVariantArray);
						}
					}
					if (size == undefined && jQuery(selector, scope.containerID).length > 0) {
						possibleVariantArray = [];
						hint = '<strong>Please select a Size.</strong>';
					}
					
					
					if (hasPantLength) {
						// ----- Pant Length -----
						selector = '.variationattributes .swatches.pantLength ul.swatchesdisplay li';
						if (updateTheSwatches) { // Disable / Enable Size Swatches
							if (jQuery(selector, scope.containerID).length > 0) {
								jQuery(selector, scope.containerID).addClass('unselectable');
								jQuery(selector, scope.containerID).removeClass('cantselectyet');
								jQuery(selector, scope.containerID).each(function() {
									var rel = jQuery(this).find('a').attr('rel');
							
									var VDO;
									for (var i=0; i<possibleVariantArray.length; i++) {
										VDO = possibleVariantArray[i];
										if (VDO.attributes['pantLength'] == rel) {
											if (VDO.availability.avStatus == 'IN_STOCK' || VDO.availability.avStatus == 'BACKORDER' || VDO.availability.avStatus == 'PREORDER') {
												jQuery(this).removeClass('unselectable');							
											}
											// break;
										}
									}
								});
							}
						}
						var pantLength = scope.GetSelectedPantLength();
						if (pantLength != undefined) {
							pantLengthVariantArray = scope.PDO.variantMatrix['pantLength'][pantLength];
							if (pantLengthVariantArray != undefined) {
								possibleVariantArray = scope.ArrayIntersection(possibleVariantArray, pantLengthVariantArray);
							}
						}
						if (size == undefined && jQuery('.variationattributes .swatches.size ul.swatchesdisplay li', scope.containerID).length > 0) {
							if (jQuery(selector, scope.containerID).length > 0) {
								// No size is selected... Show length as "disabled" instead of "out of stock"
								jQuery(selector, scope.containerID).addClass('cantselectyet');
							}
							possibleVariantArray = [];
							hint = '<strong>Please select a Size.</strong>';
						} else if (pantLength == undefined && jQuery(selector, scope.containerID).length > 0) {
							possibleVariantArray = [];
							hint = '<strong>Please select a Length.</strong>';
						}
					}
					
					
				} else {
					/**
					* "colorCode + size"
					* "colorCode + size + pantLength"
					*/
					
					// ----- Color Code -----
					selector = '.variationattributes .swatches.colorCode ul.swatchesdisplay li';
					jQuery(selector, scope.containerID).removeClass('unselectable');
					var colorCode = scope.GetSelectedColorCode();
					if (colorCode == undefined) { // One of these must be selected...
						jQuery(selector, scope.containerID).first().addClass('selected');
						colorCode = scope.GetSelectedColorCode();
					}
					if (colorCode != undefined) {
						colorCodeVariantArray = scope.PDO.variantMatrix['colorCode'][colorCode];
						if (colorCodeVariantArray != undefined) {
							possibleVariantArray = colorCodeVariantArray;
						}
					}
					
					// ----- Show / Hide Swatches -----
					if (updateTheSwatches) { // Disable / Enable Size Swatches
						var attribs = ['size', 'pantLength'];
						var attr;
						for (var j=0; j<attribs.length; j++) {
							attr = attribs[j]
							selector = '.variationattributes .swatches.' + attr + ' ul.swatchesdisplay li';
							if (jQuery(selector, scope.containerID).length > 0) {
								jQuery(selector, scope.containerID).addClass('unavailable');
								jQuery(selector, scope.containerID).each(function() {
									var rel = jQuery(this).find('a').attr('rel');						
									var VDO;
									for (var i=0; i<possibleVariantArray.length; i++) {
										VDO = possibleVariantArray[i];
										if (VDO.attributes[attr] == rel) {
											jQuery(this).removeClass('unavailable');
										}
									}
								});
							}
						}
						
						attribs = ['size', 'pantLength'];
						for (var j=0; j<attribs.length; j++) {
							attr = attribs[j]
							selector = '.variationattributes .swatches.' + attr + ' ul.swatchesdisplay li';
							arr = jQuery(selector, scope.containerID).filter(function(index){
								if ($(this).hasClass('unavailable')) {
									return false;
								}
								return true;
								/*
								 else if ($(this).hasClass('selected')) {
									return true;
								} else if ($(this).hasClass('unselectable')) {
									return true;
								}
								return false;
								*/
							});
							// jQuery('.variationattributes .swatches.' + attr).show();
							if (arr.length == 1) {
								jQuery(selector, scope.containerID).removeClass('selected');
								jQuery(arr[0]).first().addClass('selected');
								// jQuery('.variationattributes .swatches.' + attr).hide();
							}
						}
					}
				
					// ----- Size -----
					selector = '.variationattributes .swatches.size ul.swatchesdisplay li';
					if (updateTheSwatches) { // Disable / Enable Size Swatches
						if (jQuery(selector, scope.containerID).length > 0) {
							jQuery(selector, scope.containerID).addClass('unselectable');
							jQuery(selector, scope.containerID).each(function() {
								var rel = jQuery(this).find('a').attr('rel');
						
								var VDO;
								for (var i=0; i<possibleVariantArray.length; i++) {
									VDO = possibleVariantArray[i];
									if (VDO.attributes['size'] == rel) {
										if (VDO.availability.avStatus == 'IN_STOCK' || VDO.availability.avStatus == 'BACKORDER' || VDO.availability.avStatus == 'PREORDER') {
											jQuery(this).removeClass('unselectable');							
										}
										// break;
									}
								}
							});
						}
					}
					var size = scope.GetSelectedSize();
					if (size != undefined) {
						sizeVariantArray = scope.PDO.variantMatrix['size'][size];
						if (sizeVariantArray != undefined) {
							possibleVariantArray = scope.ArrayIntersection(possibleVariantArray, sizeVariantArray);
						}
					}
					if (size == undefined && jQuery(selector, scope.containerID).length > 0) {
						possibleVariantArray = [];
						hint = '<strong>Please select a Size.</strong>';
					}
					
					if (hasPantLength) {
						// ----- Pant Length -----
						selector = '.variationattributes .swatches.pantLength ul.swatchesdisplay li';
						if (updateTheSwatches) { // Disable / Enable Size Swatches
							if (jQuery(selector, scope.containerID).length > 0) {
								jQuery(selector, scope.containerID).addClass('unselectable');
								jQuery(selector, scope.containerID).removeClass('cantselectyet');
								jQuery(selector, scope.containerID).each(function() {
									var rel = jQuery(this).find('a').attr('rel');
							
									var VDO;
									for (var i=0; i<possibleVariantArray.length; i++) {
										VDO = possibleVariantArray[i];
										if (VDO.attributes['pantLength'] == rel) {
											if (VDO.availability.avStatus == 'IN_STOCK' || VDO.availability.avStatus == 'BACKORDER' || VDO.availability.avStatus == 'PREORDER') {
												jQuery(this).removeClass('unselectable');							
											}
											// break;
										}
									}
								});
							}
						}
						var pantLength = scope.GetSelectedPantLength();
						if (pantLength != undefined) {
							pantLengthVariantArray = scope.PDO.variantMatrix['pantLength'][pantLength];
							if (pantLengthVariantArray != undefined) {
								possibleVariantArray = scope.ArrayIntersection(possibleVariantArray, pantLengthVariantArray);
							}
						}
						if (size == undefined && jQuery('.variationattributes .swatches.size ul.swatchesdisplay li', scope.containerID).length > 0) {
							if (jQuery(selector, scope.containerID).length > 0) {
								// No size is selected... Show length as "disabled" instead of "out of stock"
								jQuery(selector, scope.containerID).addClass('cantselectyet');
							}
							possibleVariantArray = [];
							hint = '<strong>Please select a Size.</strong>';
						} else if (pantLength == undefined && jQuery(selector, scope.containerID).length > 0) {
							possibleVariantArray = [];
							hint = '<strong>Please select a Length.</strong>';
						}
					}
				
				}

				if (stronghint != '') {
					scope.SetLowStockMessage(stronghint, true);
				} else if (hint != '') {
					scope.SetLowStockMessage(hint, false);
				} else {
					scope.ClearLowStockMessage();
				}

				// Enable or disable the cart.
				if (possibleVariantArray != undefined && possibleVariantArray.length > 0) {
					scope.AvailabilityCheck(possibleVariantArray[0]);
				} else {
					// Nothing is selected
					if (stronghint == '' && hint == '') {
						scope.SetLowStockMessage('<strong>Not Available.</strong> Please select a different Color or Size.', true);
					}
					scope.DisableCart();
				}
			}
			
			
			
			
			/**
			* Get Selected Variant (PUBLIC)
			*
			* Determine what variant is selected. Returns VDO or null.
			*
			* This is also used by "Find In Store" (otherContainerID will be set to
			* '#FindInStore' in this case.)
			*
			* Params:
			* otherContainerID	string	Defaults to scope.containerID. ID of the container.
			*
			* Returns:
			* VDO or null
			*/
			this.GetSelectedVariant = __GetSelectedVariant;
			function __GetSelectedVariant(otherContainerID) {
				var scope = this;

				var hasSizeType			= (scope.PDO.variations['sizeType'] != undefined);
				// var hasColorCode		= (scope.PDO.variations['colorCode'] != undefined);		// This should always be true...
				// var hasSize			= (scope.PDO.variations['size'] != undefined);			// This should always be true...
				var hasPantLength		= (scope.PDO.variations['pantLength'] != undefined);
				
				var selector;
				// var intersect_colorCode_sizeType = [];
				// var intersect_colorCode_size = [];
				// var intersect_colorCode_size_pantLength = [];
				var possibleVariantArray, colorCodeVariantArray, sizeTypeVariantArray, sizeVariantArray, pantLengthVariantArray;
				
				var VDO = null;
				
				// The "top level" attribute (either sizeType or colorCode) is always enabled.
				if (hasSizeType == true) {
					/**
					* "sizeType + colorCode + size"
					* "sizeType + colorCode + size + pantLength"
					*/
									
					var sizeType = scope.GetSelectedSizeType(otherContainerID);
					if (sizeType != undefined) {
						// sizeType
						possibleVariantArray = scope.PDO.variantMatrix['sizeType'][sizeType];
						if (possibleVariantArray != undefined) {
					
							// ----- Color Code -----
							var colorCode = scope.GetSelectedColorCode(otherContainerID);
							if (colorCode != undefined) {
								colorCodeVariantArray = scope.PDO.variantMatrix['colorCode'][colorCode];
								if (colorCodeVariantArray != undefined) {
									possibleVariantArray = scope.ArrayIntersection(possibleVariantArray, colorCodeVariantArray);
								} else {
									possibleVariantArray = [];
								}
							} else {
								possibleVariantArray = [];
							}
							
							// ----- Size -----
							var size = scope.GetSelectedSize(otherContainerID);
							if (size != undefined) {
								sizeVariantArray = scope.PDO.variantMatrix['size'][size];
								if (sizeVariantArray != undefined) {
									possibleVariantArray = scope.ArrayIntersection(possibleVariantArray, sizeVariantArray);
								} else {
									possibleVariantArray = [];
								}
							} else {
								possibleVariantArray = [];
							}
						
							if (hasPantLength) {
								// ----- Pant Length -----
								var pantLength = scope.GetSelectedPantLength(otherContainerID);
								if (pantLength != undefined) {
									pantLengthVariantArray = scope.PDO.variantMatrix['pantLength'][pantLength];
									if (pantLengthVariantArray != undefined) {
										possibleVariantArray = scope.ArrayIntersection(possibleVariantArray, pantLengthVariantArray);
									} else {
										possibleVariantArray = [];
									}
								} else {
									possibleVariantArray = [];
								}
							}
						}
					}
				
				} else {
					/**
					* "colorCode + size"
					* "colorCode + size + pantLength"
					*/
				
					var colorCode = scope.GetSelectedColorCode(otherContainerID);
					if (colorCode != undefined) {
						// colorCode
						possibleVariantArray = scope.PDO.variantMatrix['colorCode'][colorCode];
						if (possibleVariantArray != undefined) {
					
							// ----- Size -----
							var size = scope.GetSelectedSize(otherContainerID);
							if (size != undefined) {
								sizeVariantArray = scope.PDO.variantMatrix['size'][size];
								if (sizeVariantArray != undefined) {
									possibleVariantArray = scope.ArrayIntersection(possibleVariantArray, sizeVariantArray);
								} else {
									possibleVariantArray = [];
								}
							} else {
								possibleVariantArray = [];
							}
						
							if (hasPantLength) {
								// ----- Pant Length -----
								var pantLength = scope.GetSelectedPantLength(otherContainerID);
								if (pantLength != undefined) {
									pantLengthVariantArray = scope.PDO.variantMatrix['pantLength'][pantLength];
									if (pantLengthVariantArray != undefined) {
										possibleVariantArray = scope.ArrayIntersection(possibleVariantArray, pantLengthVariantArray);
									} else {
										possibleVariantArray = [];
									}
								} else {
									possibleVariantArray = [];
								}
							}
						}
					}
				}
				
				// Enable or disable the cart.
				if (possibleVariantArray != undefined && possibleVariantArray.length > 0) {
					VDO = possibleVariantArray[0];
				} else {
					// Nothing is selected
					VDO = null;
				}
				
				return VDO;
			}
			
			
			/* --------------- QUANTITY DROPDOWN --------------- */
			
			
			/**
			* Bind Quantity Dropdown
			*/
			this.BindQuantity = __BindQuantity;
			function __BindQuantity() {
				
				var selector, hander;
				var scope = this;
				
				if (scope.OOS == true) {
					return;
				}
				
				hander = scope.QuantityDropdownHander;
				selector = '.quantityinput';
				jQuery(selector, scope.containerID).each(function() {
					var data = {'scope': scope};
					jQuery(this).bind('change', data, hander);
				});
			}
			
			
			/**
			* Quantity Dropdown Handler
			*/
			this.QuantityDropdownHander = __QuantityDropdownHander;
			function __QuantityDropdownHander(e) {
				var scope = e.data.scope;
				
				var qty = jQuery(this).val();
				
				scope.UpdateSwatchStates(false);
			}
			
			
			/**
			* Update Price
			*/
			this.UpdatePrice = __UpdatePrice;
			function __UpdatePrice(VDO) {
				
				var standardPrice 	= Number(VDO.pricing.standard || 0);
				var salePrice 		= Number(VDO.pricing.sale || 0);
				var priceHtml 		= '';
				var formattedPrices = {'salePrice': salePrice, 'standardPrice': standardPrice};
				
				// send server request to format the money based on site settings using Money api
				app.ajax.getJson({
					url		: app.URLs.formatMoney,
					cache	: true,
					async	: false,
					data	: {'salePrice': salePrice, 'standardPrice': standardPrice},
					callback: function(data){
						formattedPrices = data;
					}
				});
				
				if (standardPrice > 0 && standardPrice == salePrice) {
					// regular pricing
					priceHtml = '<div class="standardprice">' + formattedPrices.standardPrice + '</div>' + priceHtml;
				} else {
					if (standardPrice > 0 && standardPrice > salePrice) {
						// show strike-through pricing
						priceHtml = '<div class="strikeprice">' + formattedPrices.standardPrice + '</div>';
					}
					
					// in case it is a promotional price then we do not care if it is 0
					if (VDO.pricing.isPromoPrice == true || salePrice > 0) {
						priceHtml += '<div class="salesprice">' + formattedPrices.salePrice + '</div>';
					} else {
						priceHtml += '<div class="salesprice">N/A</div>'; 
					}
				}
				

				if (jQuery('div.productSetPriceBot .price', this.containerID).length > 0) {
					jQuery('div.productSetPriceBot .price', this.containerID).html(priceHtml);
				} else {
					jQuery('.productinfo .price:first', this.containerID).html(priceHtml);
					jQuery('.price-rating-wrapper .price:first', this.containerID).html(priceHtml);
				}
			}
			
			
			/**
			* Update Price
			*/
			this.UpdatePromo = __UpdatePromo;
			function __UpdatePromo(VDO) {
				
				if (jQuery('div.promo-container', this.containerID).length>0) {
					jQuery('div.promo-container', this.containerID).empty();
					
					if (VDO.promoMessage != "") {
						var html = '';
						html += '<div class="promotion"><span id="pdpPromoDiv" class="promocallout">';
						html += '<span class="promotext">'+VDO.promoMessage+'</span>';
						if (VDO.promoDetail != "") {
							html += '<span class="formfieldtooltip"><a class="tooltip" id="tooltipviewdetails">(Details)<div class="tooltip-body"><div class="top"></div><div class="cnt"><div>';
							html += VDO.promoDetail;
							html += '</div></div><div class="bottom"></div></div></a></span>';
						}
						html += '</span></div>';
						jQuery('div.promo-container', this.containerID).html(html);
						

						jQuery('div.promo-container .promotion span.formfieldtooltip').hover(
							function () {
								jQuery(this).find('.tooltip-body').show();
							},
							function () {
								jQuery(this).find('.tooltip-body').hide();
							}
						);
					}
	
		
		
				}
			}
			
			
			/* --------------- OUTFIT GROUP --------------- */
			
			
			/**
			* Update Outfit Price
			*/
			this.UpdateOutfitPrice = __UpdateOutfitPrice;
			function __UpdateOutfitPrice() {
			
				// Scope refers to the parent object
				var scope = this;
				var parentScope = this;
				
				if (scope.PDO.isOutfitGroup) {
					parentScope = this;
				} else if (scope.PDO.isOutfitProduct) {
					for (var parentID in scope.PDO.parentProduct) {
						parentScope = scope.PDO.parentProduct[parentID];
					}
				}
				
			
				var price = 0;
				var itemsSelected = 0;
				var totalItems = 0;
				
				var subProductRef, isSelectable, isSelected, subProductVDO, qty;
				for (var subProductID in parentScope.PDO.subProducts) {
					subProductRef = parentScope.PDO.subProducts[subProductID];
					if (subProductRef.PDO.isOutfitProduct) {
						totalItems++;
						// Checkbox values. Item must be selectable (hidden checkbox) and selected (Item Selected checkbox)
						isSelectable = jQuery('.item-configured', subProductRef.containerID).prop('checked');
						isSelected = jQuery('.item-selected', subProductRef.containerID).prop('checked');
						if (isSelected && isSelectable) {
							// User wants this item and it's configured...
						} else {
							// Skip this item...
							continue; 
						}
					}
					
					if (subProductRef.PDO.isMaster || subProductRef.PDO.isVariant) { // This check is not needed. It's always going to be a Master or Variant
						subProductVDO = subProductRef.GetSelectedVariant();
						if (subProductVDO == null) {
							// No valid variant selected.
							
						} else {
							// Variant selected.
							qty = parseInt(jQuery('.quantityinput', subProductRef.containerID).val());
							
							price += qty * subProductVDO.pricing.sale;
							itemsSelected += 1;
						}
					}
				}

				if (itemsSelected > 0) {
					// Enable Top Button
					jQuery('div.top_productSet .addtocartbutton').removeAttr('disabled').attr('title', 'Add Selected');
					jQuery('div.top_productSet .addtocartbutton').removeClass('unselectable');
				} else {
					// Disable Top Button
					jQuery('div.top_productSet .addtocartbutton').attr('disabled', 'true');
					jQuery('div.top_productSet .addtocartbutton').addClass('unselectable');
				}
				
				// Update Selected Count
				if (totalItems == 1) {
					jQuery('span.nof_items_selected').text(itemsSelected+' of 1 Item Selected');
				} else {
					jQuery('span.nof_items_selected').text(itemsSelected+' of '+totalItems+' Items Selected');
				}
				
				price = (new Number(price)).toFixed(2);
				
				jQuery('div.productSetPriceBot .price', parentScope.containerID).html('$' + price);
			}
			
			
			/**
			* Bind Outfit Select Checkbox
			*/
			this.BindOutfitCheckbox = __BindOutfitCheckbox;
			function __BindOutfitCheckbox() {
				
				var scope = this;
				
				if (scope.OOS == true) {
					return;
				}
				
				if (scope.PDO.isSubProduct) {
					var hander = scope.OutfitCheckboxHander;
					var selector = '.item-selected';
					jQuery(selector, scope.containerID).each(function() {
						var data = {'scope': scope};
						jQuery(this).bind('change', data, hander);
					});
				}
			}
			
			
			/**
			* Outfit Select Checkbox Handler
			*/
			this.OutfitCheckboxHander = __OutfitCheckboxHander;
			function __OutfitCheckboxHander(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				
				scope.UpdateOutfitPrice();
			}
			
			
			/* --------------- ADD TO CART --------------- */
			
			
			/**
			* Clear Low Stock Message
			*/
			this.ClearLowStockMessage = function() {
				jQuery('.lowStockMessage', this.containerID).removeClass('highlighted').html('');
			}
			this.SetLowStockMessage = function(msg, red) {
				jQuery('.lowStockMessage', this.containerID).removeClass('highlighted').html('<div id="msg">'+msg+'</div>');
				if (red == true) {
					jQuery('.lowStockMessage', this.containerID).addClass('highlighted');
				}
			}
			
			
			/**
			* Enable Cart
			*/
			this.EnableCart = __EnableCart;
			function __EnableCart() {
				var scope = this;
				
				jQuery('.addtocartbutton', scope.containerID).removeAttr('disabled').attr('title', 'Add to Bag');
				jQuery('.addtocartbutton', scope.containerID).removeClass('unselectable');
				jQuery('.addtowishlist', scope.containerID).removeClass('unselectable');
				
				if (scope.PDO.isSubProduct) {
					jQuery('.item-selected', scope.containerID).prop('checked', true); // .button('refresh');
					jQuery('.item-configured', scope.containerID).prop('checked', true); // .button('refresh');
					scope.UpdateOutfitPrice();
				}
			}
			
			
			/**
			* Disable Cart
			*/
			this.DisableCart = __DisableCart;
			function __DisableCart() {
				var scope = this;

				jQuery('.addtocartbutton', scope.containerID).attr('disabled', 'true').attr('title', '');
				jQuery('.addtocartbutton', scope.containerID).addClass('unselectable');
				jQuery('.addtowishlist', scope.containerID).addClass('unselectable');
				
				if (scope.PDO.isSubProduct) {
					jQuery('.item-configured', scope.containerID).prop('checked', false); // .button('refresh');
					var isSelected = jQuery('.item-selected', scope.containerID).prop('checked');
					if (isSelected) {
						jQuery('.item-selected', scope.containerID).prop('checked', false); // .button('refresh');
					}
					scope.UpdateOutfitPrice();
				}
			}
			
			
			/**
			* Enable or Disable the Cart based on Availability of VDO
			*
			* If the stockLevel is less than 10, or the item is on BACKORDER
			* do an availability check via AJAX.
			*/
			this.AvailabilityCheck = __AvailabilityCheck;
			function __AvailabilityCheck(VDO) {
				var scope = this;
				
				var qty = parseInt(jQuery('.quantityinput', scope.containerID).val());
				var stockLevel = VDO.availability.stockLevel;
				var lowStockLevel = VDO.availability.lowStockLevel;
				var ats = VDO.availability.ats;
				
				// scope.ClearLowStockMessage();
								
				/**
				* We default to 9 because that is the maximum for the quantity dropdown.
				*/
				if (VDO.availability.avStatus == 'IN_STOCK') {
					if (stockLevel <= lowStockLevel) {
						scope.DisableCart();
						__LoadAvailability(scope, VDO, qty);
					} else {
						scope.EnableCart();
						// scope.UpdatePrice(VDO);
					}
				} else if (VDO.availability.avStatus == 'BACKORDER' || VDO.availability.avStatus == 'PREORDER') {
					if (stockLevel <= lowStockLevel) {
						scope.DisableCart();
						__LoadAvailability(scope, VDO, qty);
					} else {
						scope.EnableCart();
						// scope.UpdatePrice(VDO);
					}
					
				} else {
					scope.SetLowStockMessage('<strong>Out of stock.</strong> Please select a different Color or Size.', true);
					scope.DisableCart();
				}
			}
			
			
			/**
			* Load Variant Data (PRIVATE)
			*
			* This is used for Real Time inventory check.
			*/
			function __LoadAvailability(scope, VDO, qty) {
				scope.SetLowStockMessage('Checking Availability...', false);
				
				app.ajax.getJson({
					url			: app.URLs.getAvailability,
					data		: {'pid': VDO.id, 'Quantity': qty, 'format': 'json'},
					callback	: function(data) {
						__ParseAvailability(scope, data);
					}
				});
			}
			
			
			/**
			* Load Variant Data (PRIVATE)
			*/
			function __ParseAvailability(scope, data) {
				
				if (!data || !data.avLevels) {
					return;
				}
				
				var msg = '';
				var red = false;
				var orderable = false;
				
				var VDO = scope.PDO.variants[data.pid];
				if (VDO != undefined) {
					VDO.availability = new AvailabilityObj(data);
					
					/*
					"AvailPhysical":0.0,
					"ReservePhysical":0.0,
					"OnOrder":1.0,
					"Ordered":0.0,
					"PromisedQty":0.0,
					"Pickable":0.0,
					"Quarantined":0.0,
					"PreOrderHandler":"None",
					"PreOrderQty":0.000000000000,
					"Buffer":0.0,
					"DropShip":0.0,
					"Reserved":0.0,
					"ReservedCart":0.0,
					"LastModified":"2014-10-16T15:29:40.57329Z",
					"ErrorMessage":null,
					"ErrorCode":"0"
					*/

					var realtimeATS = null;
					var Pickable, OnOrder, ReservePhysical, Reserved, PreOrderQty, PreOrderHandler;
					if (VDO.availability.realtime != undefined) {
						try {
							/*
							* 	Pickable: The number of units currently in pickable locations. Does not include PO units. Only includes active warehouse. Does not invlude Quarantined, or transferred inventory.
							* 	OnOrder: The number of units currently on open orders, but not in reserve staus
							* 	ReservePhysical: The number of units currently reserved for picking
							* 	Reserved: The number of units reserved using the Inventory Reservation system defined below.
							* 	PreOrderQty: Total number of preorder available. OnOrder amount is not considered here.
							* AvailPhysical: The physical number of units available, not invluding the reserve physical
							* Ordered: The number of units waiting to be receive on the PO
							* PromisedQty: The number of units that are currently promised to orders. Usually this is the same as OnOrder, but can be different depending on allocation process.
							* Quarantined: The number of units in the quarantined warehouse
							* PreOrderHandler: should be None or PreOrder This is the flag the determines pre order is enabled for a product in AX
							* Buffer: The number of units in buffer location.
							* DropShip: The number of units in dropship warehouse.
							* LastModifiedDate: the UTC time the request was made. This will be modified to include the last time the inventory was modified.
							* ErrorMessage: Only populated if an error Occurred.
							* ErrorCode: Should be 0 on a valid Request.  Any other response, the data should be ignored.
							*/
							Pickable = VDO.availability.realtime.Pickable;
							OnOrder = VDO.availability.realtime.OnOrder;
							ReservePhysical = VDO.availability.realtime.ReservePhysical;
							Reserved = VDO.availability.realtime.Reserved;
							PreOrderQty = VDO.availability.realtime.PreOrderQty;
							PreOrderHandler = VDO.availability.realtime.PreOrderHandler; // "Backorder", "Preorder", null
							realtimeATS = Math.max(0, (Pickable + PreOrderQty) - (OnOrder + ReservePhysical + Reserved));
							
							// realtimeATS = Math.max(0, Pickable - (OnOrder + ReservePhysical)) + Math.max(0, PreOrderQty - Math.max(0, OnOrder + Reserved - Pickable))
							
							
						} catch(e) {
							realtimeATS = null;
						}
					}
				
					var stockLevel = VDO.availability.stockLevel;
					var backordable = VDO.availability.backordable;
					
					var inStockDate = '';
					if (VDO.availability.inStockDate != '') {
						/*
							var d = new Date(VDO.availability.inStockDate);
							var month = d.getMonth()+1;
							var day = d.getDate();
							var year = new String(d.getFullYear()).substring(2);
							inStockDate = ' Ships after ' + month + '/' + day + '/' + year + '. ';
						*/
						inStockDate = ' Ships after ' + VDO.availability.inStockDate + '. ';
					}
					var lowStockLevel = VDO.availability.lowStockLevel;
					var qty = VDO.availability.avStatusQuantity;
					var ats = VDO.availability.ats;
					var avLevels = VDO.availability.avLevels;
										
					if (realtimeATS != null) { // Realtime Inventory
						if (realtimeATS == 0) {
							orderable = false;
							red = true;
							msg += '<strong>Out of stock.</strong> ';
							msg += 'Please select a different Color or Size. '
						} else {
							if (realtimeATS - qty < 0) {
								orderable = false;
								red = true;
								msg += '<strong>Only ' + realtimeATS + ' available.<.strong> ';
								msg += 'Please adjust quantity or select another color or size. '
							} else {
								orderable = true;
								red = false;
								msg += '<strong>Just a few left.</strong> ';
								if (PreOrderHandler == "Preorder") {
									msg += ats - stockLevel + ' available for pre-order. ' + inStockDate;
								} else if (PreOrderHandler == "Backorder") {
									msg += ats - stockLevel + ' available for backorder. ' + inStockDate;
								} else {
									msg += realtimeATS + ' in stock. ';
								}
							}
						}
					} else if (backordable) {
						// we are out of stock (assuming product is not pre-order-able)
						if (avLevels.NOT_AVAILABLE > 0) {
							orderable = false;
							red = true;
							var numberRemaining = qty - avLevels.NOT_AVAILABLE;
							if (numberRemaining <= 0) {
								msg += '<strong>Out of stock.</strong> ';
							} else {
								msg += '<strong>Only ' + numberRemaining + ' available.</strong> ';
							}
							msg += 'Please adjust quantity or select another color or size. '
						} else {
							orderable = true;
							red = false;
							if (ats - stockLevel > 0) {
						
							} else if (stockLevel == 0) {
								msg += '<strong>None in stock.</strong> ';
							} else if (stockLevel < lowStockLevel) {
								msg += '<strong>Just a few left.</strong> ';
							}
							if (stockLevel > 0) {
								if (stockLevel == 1) {
									msg += stockLevel + ' in stock. ';
								} else {
									msg += stockLevel + ' in stock. ';
								}
							}
							if (ats - stockLevel > 0) {
								msg += ats - stockLevel + ' available for backorder. ' + inStockDate;
							}
						}
					} else {
						if (avLevels.NOT_AVAILABLE > 0) { // Demandware Inventory
							orderable = false;
							red = true;
							var numberRemaining = qty - avLevels.NOT_AVAILABLE;
							if (numberRemaining <= 0) {
								msg += '<strong>Out of stock.</strong> ';
							} else {
								msg += '<strong>Only ' + numberRemaining + ' available.</strong> ';
							}
							msg += 'Please adjust quantity or select another color or size. '
						} else {
							orderable = true;
							red = false;
							if (ats - stockLevel > 0) {
								// 
							} else if (stockLevel == 0) {
								msg += '<strong>None in stock.</strong> ';
							} else if (stockLevel < lowStockLevel) {
								msg += '<strong>Just a few left.</strong> ';
							}
							if (stockLevel > 0) {
								if (stockLevel == 1) {
									msg += stockLevel + ' in stock. ';
								} else {
									msg += stockLevel + ' in stock. ';
								}
							}
							if (ats - stockLevel > 0) {
								msg += ats - stockLevel + ' available for pre-order. ' + inStockDate;
							}
						}
					}
					
				}
					
				if (msg == '') {
					scope.ClearLowStockMessage();
				} else {
					scope.SetLowStockMessage(msg, red);
				}
				
				if (orderable == true) {
					scope.EnableCart();
					// scope.UpdatePrice(VDO);
				} else { 
					scope.DisableCart();
				}
			}
			
			
			/**
			* Bind Add To Cart Click
			*/
			this.BindAddToCart = __BindAddToCart;
			function __BindAddToCart() {
				
				var scope = this;
				if (scope.OOS == true) {
					return;
				}
				
				if (scope.PDO.isMaster || scope.PDO.isVariant) {
					var hander = scope.AddToCartHander;
					var selector = '.addtocartbutton';
					jQuery(selector, scope.containerID).each(function() {
						var data = {'scope': scope};
						jQuery(this).bind('click', data, hander);
					});
				}
			}
			
			
			/**
			* Add To Cart Click Handler
			*
			* (If the items if backordered, then the 'yes' button in the dialog is also bound to this hander.)
			*/
			this.AddToCartHander = __AddToCartHander;
			function __AddToCartHander(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				var backorderConfirmed = e.data.backorderConfirmed == undefined ? false : e.data.backorderConfirmed;
				
				if (backorderConfirmed == true) {
					jQuery('#back-order-confirmation').dialog('close');
				}
				
			
				if (jQuery(this).hasClass('unselectable') == true || jQuery(this).attr('disabled') == 'true') {
					// The button is disabled.
					
				} else {
					
					if (scope.PDO.isMaster || scope.PDO.isVariant) { // This check is not needed. It's always going to be a Master or Variant
						var VDO = scope.GetSelectedVariant();
						if (VDO == null) {
							// No valid variant selected.
							
						} else {
							// Variant selected.
							var selectedOptions = {};
							selectedOptions['pid'] = VDO.id;
							selectedOptions['masterPid'] = scope.PDO.ID;
							var qty = parseInt(jQuery('.quantityinput', scope.containerID).val());
							selectedOptions['Quantity'] = qty;
							
							/*	
							// Backorder Alert
							var backorderAlert = false;
							if (VDO.availability.backordable == true && qty > VDO.availability.stockLevel) {
								backorderAlert = true;
							}
							
							// Checkout
							if (backorderAlert == true && backorderConfirmed == false) {
								scope.BackorderDialog(scope.AddToCartHander);
							} else {
								// Tracking
								scope.Tracking('cart', scope.GetSelectedVariant())
								scope.DoAddToCart(selectedOptions);
							}
							*/
							scope.Tracking('cart', scope.GetSelectedVariant())
							scope.DoAddToCart(selectedOptions);
						}
					}
				}
			}
			
			
			/**
			* Bind Add Outfit Group Click
			*/
			this.BindAddOutfit = __BindAddOutfit;
			function __BindAddOutfit() {
				
				var scope = this;
				if (scope.OOS == true) {
					return;
				}
				
				if (scope.PDO.isOutfitGroup) {
					var hander = scope.AddOutfitHander;
					var selector = 'div.top_productSet .addtocartbutton';
					jQuery(selector, scope.containerID).each(function() {
						var data = {'scope': scope};
						jQuery(this).bind('click', data, hander);
					});
				}
			}
			
			
			/**
			* Bind Add Outfit Group Click
			*/
			this.BindOutfitInterface = __BindOutfitInterface;
			function __BindOutfitInterface() {
				
				var scope = this;
				if (scope.OOS == true) {
					return;
				}
				
				if (scope.PDO.isOutfitGroup) {
					var hander = scope.ToggleOutfitConfigure,
						selector = 'div.outfit-configure-link';
					

					jQuery(selector, scope.containerID).each(function() {
						var data = {'scope': scope};
						
						jQuery(this).bind('click', data, hander);
					});
					// scope.BindZoom(AVO, index);
				}
			}
			
			this.ToggleOutfitConfigure = __ToggleOutfitConfigure;
			function __ToggleOutfitConfigure(e) {
				e.preventDefault();
				
				var scope = e.data.scope,
					pid = jQuery(this).attr('rel'); // product ID attribute added in subproduct.isml
					$outfitgroup = jQuery(this).parent('.outfit-productinfo-container').find('.outfit-configure-group');

				jQuery(this).hide();
				$outfitgroup.show();
				
				if (_gaq != undefined) {
					_gaq.push(['_trackEvent', 'Outfit', 'Reveal', scope.PDO.name + ': ' + pid, undefined, true]);
				}
			}
			
			
			
			/**
			* Add Outfit Group Click Handler
			*
			* (If the items if backordered, then the 'yes' button in the dialog is also bound to this hander.)
			*/
			this.AddOutfitHander = __AddOutfitHander;
			function __AddOutfitHander(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				/*
				var backorderConfirmed = e.data.backorderConfirmed;
				if (backorderConfirmed == undefined) {
					backorderConfirmed = false;
				}
				if (backorderConfirmed) {
					jQuery('#back-order-confirmation').dialog('close');
				}
				*/
				
				
				if (jQuery(this).hasClass('unselectable') == true || jQuery(this).attr('disabled') == 'true') {
					// The button is disabled.
				} else {
					
					var qty;
					// var backorderAlert = false;
					var stockLevel, backordable;
					
					if (scope.PDO.isOutfitGroup) {
						// Outfit Group

						var qtyArr = [];
						var pidArr = [];
						var trackingArr = [];
						var subProductRef, isSelectable, isSelected, subProductVDO;
						
						for (var subProductID in scope.PDO.subProducts) {
							subProductRef = scope.PDO.subProducts[subProductID];
							if (subProductRef.PDO.isOutfitProduct) {
								// Checkbox values. Item must be selectable (hidden checkbox) and selected (Item Selected checkbox)
								isSelectable = jQuery('.item-configured', subProductRef.containerID).prop('checked');
								isSelected = jQuery('.item-selected', subProductRef.containerID).prop('checked');
								if (isSelected && isSelectable) {
									// User wants this item and it's configured...
								} else {
									// Skip this item...
									continue; 
								}
							}
							
							if (subProductRef.PDO.isMaster || subProductRef.PDO.isVariant) { // This check is not needed. It's always going to be a Master or Variant
								subProductVDO = subProductRef.GetSelectedVariant();
								if (subProductVDO == null) {
									// No valid variant selected.
									
								} else {
									// Variant selected.
									qty = parseInt(jQuery('.quantityinput', subProductRef.containerID).val());
									pidArr.push(subProductVDO.id);
									qtyArr.push(qty);
									trackingArr.push(subProductRef.GetItemID(subProductVDO));
									
									// Backorder Alert
									/*
									if (subProductVDO.availability.backordable == true && qty > subProductVDO.availability.stockLevel) {
										backorderAlert = true;
									}
									*/
								}
							}
						}
						
						if (pidArr.length > 0) {
							var selectedOptions = {};
							selectedOptions['childPids'] = pidArr.join(',');
							selectedOptions['Quantity'] = qtyArr.join(',');
							selectedOptions['pid'] = scope.PDO.ID;
							
							// Checkout
							/*
							if (backorderAlert == true && backorderConfirmed == false) {
								scope.BackorderDialog(scope.AddOutfitHander);
							} else {
								// Tracking
								scope.Tracking('cart', trackingArr.join(','));
								scope.DoAddToCart(selectedOptions);
							}
							*/
							scope.Tracking('cart', trackingArr.join(','));
							scope.DoAddToCart(selectedOptions);
						}
					}
				}
			}
			
			
			/**
			* Backorder Dialog
			*
			* 1. Create the dialog
			* 2. Add 'No Thanks' hander
			* 3. Add 'Yes' hander (callback AddToCartHander or AddOutfitHander)
			* 4. Open dialog
			*/
			this.BackorderDialog = __BackorderDialog;
			function __BackorderDialog(hander) {
				/*
				var scope = this;
				
				if (jQuery('#back-order-confirmation').length == 0) {
					jQuery('<div/>').attr('id', 'back-order-confirmation').appendTo(document.body);
					
					var str = '';
					str += '<div class="modal-content">';
					str += '<h4 class="dialog-title">We\'re Sorry</h4>';
					str += '<p class="dialog-text">One or more items you\'ve selected are currently on backorder. Would you still like to add it to your shopping bag or continue shopping to find a similar item?</p>';
					str += '<p><a href="#yes" class="yes-button link-secondary" style="margin-right: 10px; width: 65px; text-align: center;"><span>YES</span></a>I STILL WANT IT*<p>';
					str += '<p><a href="#no-thanks" class="no-button link-secondary" style="margin-right: 10px; width: 65px; text-align: center;">NO THANKS</a>I\'LL LOOK FOR SOMETHING ELSE<p>';
					str += '<p style="margin-top: 15px; margin-bottom: 0;">*Unfortunately The Limited is unable to guarantee inventory or on-time delivery for items on backorder. We apologize for any inconvenience.</p>';
					str += '</div>';
												
					jQuery('#back-order-confirmation').css({display: 'none'}).addClass('dialog-container').html(str);
					
					jQuery('#back-order-confirmation .no-button').click(function(e){
						e.preventDefault();
						jQuery('#back-order-confirmation').dialog('close');
					});
				}
								
				var data = {'scope': scope, 'backorderConfirmed': true};
				jQuery('#back-order-confirmation .yes-button').unbind().bind('click', data, hander);
				
				jQuery('#back-order-confirmation').show().dialog({
					// bgiframe: true,
					modal: true,
					overlay: {
						opacity: 0.5,
						background: 'black'
					},
					height: 'auto',
					width: 370,
					resizable: false
				});		
				*/
			}
			
			
			/**
			* Do Add to Cart
			*
			* Called from AddToCartHander or AddOutfitHander
			*/
			this.DoAddToCart = __DoAddToCart;
			function __DoAddToCart(selectedOptions) {
				var scope = this;
				
				// ----------------------------------------
				// Trigger Add To Cart Event
				// ----------------------------------------
				// Find if there is a handler bound to AddToCart event e.g. cart -> edit details or wishlist -> edit details etc.
				// then fire it otherewise call app.minicart.add to add the selected product to the cart and show minicart
				
				var event = jQuery.Event(scope.eventTrigger);
				event.selectedOptions = selectedOptions;
				
				//Omniture tagging
				if (scope.pageSource == 'productsetproduct')
					s.eVar11 = 'Top Looks';
				if (scope.pageSource == 'quickviewproductsetproduct')
					s.eVar11 = 'Top Looks';
				else if (scope.pageSource == 'toplooks')
					s.eVar11 = 'Top Looks';
				else if (scope.pageSource == 'quickviewtoplooks')
					s.eVar11 = 'Top Looks';
				else if (scope.pageSource == 'pdp')
					s.eVar11 = 'Product Detail Page';
				else if (scope.pageSource == 'quickview')
					s.eVar11 = 'Quickview';
				s.eVar36 = '';
				if (jQuery('.checkoutminicart .summaryproduct').length == 0)
					s.events="scAdd, scOpen";
				else s.events="scAdd";
				if ((scope.pageSource == 'toplooks' || scope.pageSource == 'quickviewtoplooks') && selectedOptions.childPids != undefined) {
					var childPids = selectedOptions.childPids.split(",");
					var products = "";
					for (var i = 0; i < childPids.length; i++) {
						if (i > 0)
							products += ",";
						products += ";" + childPids[i] + ";;;;evar12=" + selectedOptions.pid; 
					}
					s.products = products;
				}
				else s.products = ";" + selectedOptions.masterPid + ";;;;evar12=" + selectedOptions.pid; 
				var s_code=s.t();
				if(s_code)
					document.write(s_code);
				
				if (jQuery.event.global[scope.eventTrigger] == undefined || jQuery.event.global[scope.eventTrigger] == null) {
				
					// Disable button so they can't double click...
					if (scope.PDO.isOutfitGroup) {
						jQuery('div.top_productSet .addtocartbutton', scope.containerID).attr('disabled', 'true').attr('title', '');
					} else {
						jQuery('.addtocartbutton', scope.containerID).attr('disabled', 'true').attr('title', '');
					}
					
					app.minicart.add('', selectedOptions, function() {
						// Re-enable button.
						if (scope.PDO.isOutfitGroup) {
							jQuery('div.top_productSet .addtocartbutton', scope.containerID).removeAttr('disabled').attr('title', 'Add to Bag');
						} else {
							jQuery('.addtocartbutton', scope.containerID).removeAttr('disabled').attr('title', 'Add to Bag');
						}
					});
					
				} else {
					jQuery(document).trigger(event);
				}
				
				// Close the quick view when user clicks A2C.
				if (scope.pageSource == 'quickview' || scope.pageSource == 'quickviewtoplooks' || scope.pageSource == 'quickviewproductsetproduct' || scope.pageSource == 'minicart' ) {
					app.quickView.close();
				}
			}
			
			
			/* --------------- TRACKING --------------- */
			
			
			/**
			* Certona Tracking
			*/
			this.Tracking = __Tracking;
			function __Tracking(type, options) {
				if (!app.URLs.certona.enabled || typeof certonaResx === "undefined")
					return;
					
				var thisProduct = this;
					
				if (this.PDO.isSubProduct) {
					if (type == "swatchClick") {
						app.trackingData = [];
						app.trackingData.push(this.GetItemID());
						this.TrackingProductSet();
					} else if (type == "cart") {
						window.resx = new Object();
						if (!app.URLs.certona.live)
							resx.host = "qa.res-x.com"; // USE ONLY DURING QA; REMOVE PRIOR TO PRODUCTION
						resx.appid = app.URLs.certona.appid;
						resx.top1 = app.URLs.certona.top1;
						resx.top2 = app.URLs.certona.top2;
						resx.itemid = thisProduct.GetItemID(options);
						resx.event = "addtocart_op";
						certonaResx.run();
					} else {
					
					}
					return;
				} else if (this.PDO.isOutfitGroup) { //Add Selected for Outfit
					if (type == "cart") {
						window.resx = new Object();
						if (!app.URLs.certona.live)
							resx.host = "qa.res-x.com"; // USE ONLY DURING QA; REMOVE PRIOR TO PRODUCTION
						resx.appid = app.URLs.certona.appid;
						resx.top1 = app.URLs.certona.top1;
						resx.top2 = app.URLs.certona.top2;
						resx.itemid = options; 
						resx.event = "addtocart_op";
						certonaResx.run();
					} else { //initial load
						window.resx = new Object();
						if (!app.URLs.certona.live)
							resx.host = "qa.res-x.com"; // USE ONLY DURING QA; REMOVE PRIOR TO PRODUCTION
						resx.appid = app.URLs.certona.appid;
						resx.top1 = app.URLs.certona.top1;
						resx.top2 = app.URLs.certona.top2;
						resx.itemid = options; 
						resx.event = "getthelook";
						certonaResx.run();
					}
				} else {
					var selectedItem = "";
					if (options == null)
						selectedItem = thisProduct.GetItemID(thisProduct.GetSelectedColorVariant());
					else if (isNaN(parseInt(options)))
						selectedItem = thisProduct.GetItemID(options);
					else selectedItem = thisProduct.GetItemIDWithColor(options);
					
					window.resx = new Object();
					if (!app.URLs.certona.live)
						resx.host = "qa.res-x.com"; // USE ONLY DURING QA; REMOVE PRIOR TO PRODUCTION
					resx.appid = app.URLs.certona.appid;
					resx.top1 = app.URLs.certona.top1;
					resx.top2 = app.URLs.certona.top2;
					resx.itemid = selectedItem;
					
					if (type == "cart") {
						resx.event = "addtocart_op";
						resx.rrec = true;
						resx.rrnum = "4";
						resx.rrelem = "product_rr";
						if (jQuery('#QuickViewDialog .quickviewselector .productinfo').length > 0)
							jQuery("#QuickViewDialog").unbind("dialogclose");
					} else if (type == "wishlist") {
						resx.event = "wishlist";
					} else if (type == "swatchClick") {	
						resx.rrec = true;
						if (this.pageSource == 'quickview' || this.pageSource == 'minicart' || this.pageSource == 'cart') {
							resx.event = "quickview";
							resx.rrelem = "quickview_rr";
						} else {
							resx.event = "product";
							resx.rrelem = "product_rr";
						}
						resx.rrnum = "4";
					} else {
						if (jQuery('#QuickViewDialog .quickviewselector .productinfo').length > 0) {
							// page load
							// resx.event = "quickview";
							resx.rrec = true;
							if (this.pageSource == 'quickview' || this.pageSource == 'minicart' || this.pageSource == 'cart') {
								resx.event = "quickview";
								resx.rrelem = "quickview_rr";
							} else {
								resx.event = "product";
								resx.rrelem = "product_rr";
							}
							resx.rrnum = "4";
						} else { // page load
							resx.rrec = true;
							if (this.pageSource == 'quickview' || this.pageSource == 'minicart' || this.pageSource == 'cart') {
								resx.event = "product";
								resx.rrelem = "quickview_rr";
							} else {
								resx.event = "product";
								resx.rrelem = "product_rr";
							}
							resx.rrnum = "4";
						}
					}
					certonaResx.run();
				}	
			}
			
			
			/**
			* Certona Product Set Tracking
			*/
			this.TrackingProductSet = __TrackingProductSet;
			function __TrackingProductSet() {
				window.resx = new Object();
				if (!app.URLs.certona.live)
					resx.host = "qa.res-x.com"; // USE ONLY DURING QA; REMOVE PRIOR TO PRODUCTION
				resx.appid = app.URLs.certona.appid;
				resx.top1 = app.URLs.certona.top1;
				resx.top2 = app.URLs.certona.top2;
				resx.itemid = app.trackingData.join(';'); 
				resx.event = "product";
				certonaResx.run();
			}
			
			
			/**
			* Certona Utility Functions
			*
			* Various string manipulation of the ID for Certona tracking.
			*/
			this.GetItemID = __GetItemID;
			function __GetItemID(options) {
				var selectedColor = "";
				try {
					selectedColor = "000" + this.PDO.variations['colorCode'].vals[options.attributes.colorCode].cc
				} catch (e) {
					selectedColor = "000";
				}
				var selectedItem = "";
				selectedItem = this.PDO.masterID + '_' + selectedColor.substring(selectedColor.length - 3, selectedColor.length);
				return selectedItem;
			}
			this.GetItemIDWithColor = __GetItemIDWithColor;
			function __GetItemIDWithColor(options) {
				options = "000" + options;
				return this.PDO.masterID + '_' + options.substring(options.length - 3, options.length);
			}

			
			
			/* --------------- WISHLIST / SEND TO FRIEND --------------- */

			/**
			* Bind Wishlist Click
			*
			* 1. Add to Wishlist Button
			* 2. Update Wishlist Button (when editing a product.)
			*/
			this.BindWishlist = __BindWishlist;
			function __BindWishlist() {

				var scope = this;
				if (scope.OOS == true) {
					return;
				}
				
				// Add to Wishlist
				if (scope.PDO.isMaster || scope.PDO.isVariant) {
					var hander = scope.WishlistHander;
					var selector = '.addtowishlist';
					jQuery(selector, scope.containerID).each(function() {
						var data = {'scope': scope};
						jQuery(this).bind('click', data, hander);
					});
				}

				// Update Wishlist	
				if (scope.PDO.isMaster || scope.PDO.isVariant) {
					var hander = scope.UpdateWishlistHandler;
					var selector = '.update-wishlist';
					jQuery(selector, scope.containerID).each(function() {
						var data = {'scope': scope};
						jQuery(this).bind('click', data, hander);
					});
				}
			}
			
			
			/**
			* Wishlist Click Handler
			*/
			this.WishlistHander = __WishlistHander;
			function __WishlistHander(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				
				if (jQuery(this).hasClass('unselectable') == true) {
					// The button is disabled.
				} else {
					var VDO = scope.GetSelectedVariant();
					if (VDO == null) {
						// No valid variant selected.
					} else {
						var url = jQuery(this).attr('rel');
						url = app.util.appendParamToURL(url, 'pid', VDO.id);
		
						//Certona tagging
						resx.event = " wishlist_op";
						resx.itemid = VDO.id;
						resx.pageid = "";
						resx.links = "";
						certonaResx.run();

						window.location.href = url;
					}
				}
			}
			
			
			/**
			* Update Wishlist
			*/
			this.UpdateWishlistHandler = __UpdateWishlistHandler;
			function __UpdateWishlistHandler(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				
				if (jQuery(this).hasClass('unselectable') == true) {
					// The button is disabled.
				} else {
					var VDO = scope.GetSelectedVariant();
					if (VDO == null) {
						// No valid variant selected.
					} else {
						var url = jQuery(this).attr('href');
						url = app.util.appendParamToURL(url, 'pid', VDO.id);
						
						qty = parseInt(jQuery('.quantityinput', scope.containerID).val());
						url = app.util.appendParamToURL(url, 'Quantity', qty);
		
						window.location.href = url;
					}
				}
			}

			
			
			/* --------------- FIND IN STORE --------------- */

			/**
			* Find In Store Click
			*/
			this.BindFindInStore = __BindFindInStore;
			function __BindFindInStore() {
				
				// Add to Wishlist
				var scope = this;
				if (scope.PDO.isMaster || scope.PDO.isVariant) {
					var hander = scope.FindInStoreHander;
					var selector = '.findinstore';
					jQuery(selector, scope.containerID).each(function() {
						var data = {'scope': scope};
						jQuery(this).bind('click', data, hander);
					});
				}
			}
			
			
			/**
			* Find In Store Handler
			*
			* This is a really long function.
			*
			* 1. Build dialog HTML.
			* 2. Create and open dialog.
			* 3. Instantiate StoreMap.
			* 4. Add event handlers.
			*/
			this.FindInStoreHander = __FindInStoreHander;
			function __FindInStoreHander(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				
				if (jQuery("#FindInStore").length == 0) {
					jQuery(document.body).append("<div id=\"FindInStore\"></div>");
				} else {
					jQuery("#FindInStore").empty();
				}
				
				var availableColors, attributeID, selector, VDOs, VDO, AO, hander, AVOs, AVO, html, str;
											
				var selectedVDO = scope.GetSelectedVariant();
				if (selectedVDO == null) {
					selectedVDO = scope.GetSelectedColorVariant();
				}
				
				if (selectedVDO == null) {
					// No variants at all...
					return false;
				}
				
				/**
				* These are broken out as separate loops for the sake of readability.
				*/
				
				// Determine list of available colors. We don't want to show all colors that ever existed.
				availableColors = [];
				VDOs = scope.PDO.variants;
				var isSelectedVDOValid, lastAvailableVDO;
				isSelectedVDOValid = false;
				if (VDOs != undefined) {
					for (var prop in VDOs) {
						VDO = VDOs[prop];
						
						// Don't show Online Exclusive or Final Sale colors 
						if (VDO.snipe != "Online Exclusive" && !(VDO.finalSale)) {
							if (VDO.id == selectedVDO.id) {
								isSelectedVDOValid = true;
							}
							// If this product is "out of stock" then we want to display all colors.
							if (VDO.availability.avStatus != "NOT_AVAILABLE" || scope.OOS == true || scope.PDO.showSoldOutSwatches == true) {
								if (jQuery.inArray(VDO.attributes.colorCode, availableColors) == -1) {
									availableColors.push(VDO.attributes.colorCode);
									lastAvailableVDO = VDO;
								}
							}
						}
					}
				}
				
				if (!(isSelectedVDOValid)) {
					selectedVDO = lastAvailableVDO;
				}
				
				str = '';
				
				// sizeType
				var hasPetite = false;
				var hasTall = false;
				attributeID = 'sizeType';
				AO = scope.PDO.variations[attributeID];
				if (AO != undefined && AO.vals != undefined) {
					html = '';
					AVOs = AO.vals;
					for (var prop in AVOs) {
						AVO = AVOs[prop];
						if (selectedVDO.attributes[attributeID] == AVO.val) {
							html += '<li class="emptyswatch selected">';
						} else {
							html += '<li class="emptyswatch">';
						}
						html += '<a href="#" rel="' + app.util.htmlEncode(AVO.val) + '" class="swatchanchor">' + AVO.val + '</a></li>';
						if (AVO.val == "Petite") {
							hasPetite == true;
						}
						if (AVO.val == "Tall") {
							hasTall == true;
						}
					}
					if (html.length) {
						str += '<div class="swatches ' + attributeID + '">';
						str += '<div class="label">Size:</div>';
						str += '<ul class="swatchesdisplay">' + html + '</ul>';
						str += '<div class="clear"></div>';
						str += '</div>';
					}
				}
				
				// colorCode
				attributeID = 'colorCode';
				AO = scope.PDO.variations[attributeID];
				if (AO != undefined && AO.vals != undefined) {
					html = '';
					AVOs = AO.vals;
					for (var prop in AVOs) {
						AVO = AVOs[prop];
						if (jQuery.inArray(AVO.val, availableColors) != -1) {
							if (selectedVDO.attributes[attributeID] == AVO.val) {
								html += '<li class="selected">';
							} else {
								html += '<li>';
							}
							html += '<a href="#" rel="' + app.util.htmlEncode(AVO.val) + '" class="swatchanchor">' + AVO.val + '<img src="' + AVO.images.swatch.url + '" title="" alt=""></a>';
							html += '<div style="display: none;" class="swatch-hover"><img src="' + AVO.images.swatch2.url + '" title="" alt=""><span class="color-title">' + AVO.val + '</span></div></li>';
						}
					}
					if (html.length) {
						str += '<div class="swatches ' + attributeID + '">';
						str += '<div class="label">Color:</div>';
						str += '<ul class="swatchesdisplay">' + html + '</ul>';
						str += '<div class="clear"></div>';
						str += '</div>';
					}
				}
				
				// size
				attributeID = 'size';
				AO = scope.PDO.variations[attributeID];
				if (AO != undefined && AO.vals != undefined) {
					html = '';
					AVOs = AO.vals;
					for (var prop in AVOs) {
						AVO = AVOs[prop];
						if (selectedVDO.attributes[attributeID] == AVO.val) {
							html += '<li class="emptyswatch selected">';
						} else {
							html += '<li class="emptyswatch">';
						}
						html += '<a href="#" rel="' + app.util.htmlEncode(AVO.val) + '" class="swatchanchor">' + AVO.val + '</a></li>';
					}
					if (html.length) {
						str += '<div class="swatches ' + attributeID + '">';
						str += '<div class="label">Size:</div>';
						str += '<ul class="swatchesdisplay">' + html + '</ul>';
						str += '<div class="clear"></div>';
						str += '</div>';
					}
				}
				
				// pantLength
				attributeID = 'pantLength';
				AO = scope.PDO.variations[attributeID];
				if (AO != undefined && AO.vals != undefined) {
					html = '';
					AVOs = AO.vals;
					for (var prop in AVOs) {
						AVO = AVOs[prop];
						if (selectedVDO.attributes[attributeID] == AVO.val) {
							html += '<li class="emptyswatch selected">';
						} else {
							html += '<li class="emptyswatch">';
						}
						html += '<a href="#" rel="' + app.util.htmlEncode(AVO.val) + '" class="swatchanchor">' + AVO.val + '</a></li>';
					}
					if (html.length) {
						str += '<div class="swatches ' + attributeID + '">';
						str += '<div class="label">Length:</div>';
						str += '<ul class="swatchesdisplay">' + html + '</ul>';
						str += '<div class="clear"></div>';
						str += '</div>';
					}
				}
				
				
				if (str.length) {
					html = '';
					html += '<div class="find-in-store-dialog">';
						html += '<div class="productimages">';
							html += '<div class="productimage">';
								var media = '';
								var colorCode = selectedVDO.attributes['colorCode'];
								AVO = scope.PDO.variations['colorCode'].vals[colorCode];
								if (AVO == undefined || AVO.images.hasImages == false || AVO.images['large'].length == 0) {
									//
								} else {
									media = AVO.images['large'][0].url;
								}
								html += '<img src="' + media + '" alt="" title="" />';
							html += '</div>';
							html += '<div class="instructions"><strong>Please note:</strong> Please call the store prior to arriving, inventory can change throughout the day and we cannot guarantee in-store availability. Our Find in Store feature is not available for items that are final sale or online exclusive.';
							if (hasPetite) {
								// html += '<br /><br />Petite is not available in stores.';
							}
							if (hasTall) {
								// html += '<br /><br />Tall is not available in stores.';
							}
							html += '</div>';
						html += '</div>';
						html += '<div class="productinfo">';
							html += '<div class="pdp-topinfo">';
								html += '<h1 class="productname">' + scope.PDO.name + '</h1>';
								html += '<div class="item-number">Item# ' + scope.PDO.ID + '</div>';
								html += '<div class="clear"></div>';
							html += '</div>';

							html += '<div id="find-in-store-wrapper">';
								html += '<div id="find-in-store-form" class="form-container">';
									html += '<div class="locator-store-form">';
										html += '<label>Please enter a City, State or ZIP code:</label>';
										html += '<span class="input-wrapper">';
											html += '<input class="text-box locator-store-search" name="q" type="text" />';
											html += '<a class="link-button locator-store-submit" href="' + app.URLs.getStores + '">';
												html += '<span>Search</span>';
											html += '</a>';
										html += '</span>';
									html += '</div>';
								html += '</div>';
		
								html += '<div id="find-in-store-address" style="display: none">';
								html += '</div>';
							
								html += '<div id="find-in-store-options" class="variationattributes" style="display: none">';
									html += str
								html += '</div>';
		
								html += '<div id="find-in-store-listing" style="display: none">';
								html += '</div>';
							html += '</div>';

						html += '</div>';
						html += '<div class="clear"></div>';
					html += '</div>'
					
					jQuery("#FindInStore").append(html);
					
					jQuery("#FindInStore").dialog({
						// bgiframe: true,
						autoOpen: true,
						modal: true,
						overlay: {
							opacity: 0.5,
							background: "black"
						},
						width: 'auto',
						minWidth: 708,
						maxWidth: 1024,
						minHeight: 500,
						fluid: true,
						resizable: false,
						draggable: false,
						dialogClass: 'findinstoredialog'
					});
					
					jQuery('.ui-widget-overlay').last().unbind('click').bind('click', function(e) {
						e.preventDefault();
						jQuery(this).next('.ui-dialog').first().find('.ui-dialog-titlebar-close').trigger('click');
					});
				
					var options = {
						'showMap'				: false,
						'includeStateStores'	: false,
						'callbackScope'			: scope,
						'callbackFunction'		: scope.StoreMapCallback,
						'scrollSelector'		: '#find-in-store-listing',
						'linkSelector'			: '#find-in-store-listing li a.store-name',
						'linkParentSelector'	: '.store-listing',
						'formSelector'			: '.locator-store-form',
						'inputSelector'			: '.locator-store-search',
						'submitSelector'		: '.locator-store-submit'
					}
					jQuery('#find-in-store-wrapper').StoreMap(options);
					
					jQuery('#find-in-store-wrapper .colorCode li a').click(function(e) {
						e.preventDefault();
						jQuery(this).parent('li').siblings().removeClass('selected');
						jQuery(this).parent('li').addClass('selected');
						var media = '';
						var colorCode = jQuery(this).attr('rel');
						AVO = scope.PDO.variations['colorCode'].vals[colorCode];
						if (AVO == undefined || AVO.images.hasImages == false || AVO.images['large'].length == 0) {
							//
						} else {
							media = AVO.images['large'][0].url;
						}
						jQuery('#FindInStore .productimage img').attr('src', media);
						__UpdateStoreAvailability(scope);
					});
					jQuery('.sizeType li a, .size li a, .pantLength li a', '#find-in-store-wrapper').click(function(e) {
						e.preventDefault();
						jQuery(this).parent('li').siblings().removeClass('selected');
						jQuery(this).parent('li').addClass('selected');
						var code = jQuery(this).attr('rel');
						var haveInventory = __UpdateStoreAvailability(scope);
						
						var TSV = scope.GetSelectedVariant('#FindInStore'); // Tracking selected variant
						if (TSV != null) {
							if (haveInventory)
								s.events = "event62";
							else
								s.events = "";
							s.products = ";" + TSV.classCode + TSV.styleNumber + ";;;;eVar12=" + TSV.id;

							var s_code=s.t();
							if(s_code) {
								document.write(s_code);
							}
						}
						
					});
					
					var TSV = scope.GetSelectedVariant(this.id); // Tracking selected variant
					if (TSV != null) {
						s.events = "";
						s.channel = "Product Detail";
						s.prop1 = "Product Detail: Find In Store Search";
						s.prop2 = "Product Detail: Find In Store Search: " + scope.PDO.name + ": " + TSV.classCode + TSV.styleNumber;
						s.prop3 = "Product Detail: Find In Store Search: " + scope.PDO.name + ": " + TSV.classCode + TSV.styleNumber;
						s.prop4 = "Product Detail";
						s.pageName = "Product Detail: Product Detail: Find In Store Search: " + scope.PDO.name + ": " + TSV.classCode + TSV.styleNumber;
						s.products = ";" + TSV.classCode + TSV.styleNumber + ";;;;eVar12=" + TSV.id;
						var s_code=s.t();
						if(s_code) {
							document.write(s_code);
						}
					}
					
					return false;
				}
			}
			
			
			/**
			* Store Map callback
			*
			* The StoreMap instance calls this function with various commands and data.
			*
			* Change the state of the dialog interface (hide/show things) depending on
			* what is happening (searching, results, etc.)
			*/
			this.StoreMapCallback = __StoreMapCallback;
			function __StoreMapCallback(args) {
				var scope = this;
				
				var cmd = args[0];
				switch(cmd) {
					case "__Search" : // 1. Starting a geocode search. (Next: __ZipSearch, __DidYouMean, __ShowGeocodeError)
						jQuery('#find-in-store-listing').hide();
						jQuery('#find-in-store-options').hide();
						jQuery('#find-in-store-address').hide();
						
						break;
						
					case "__ZipSearch" : // 2. Geocode was good. (Next: __ShowNoStores, __ParseResults)
						break;
						
					case "__DidYouMean" : // END. Geocode returned multiple hits. As user to choose one.
						jQuery('#find-in-store-listing').show();
						jQuery('#find-in-store-options').hide();
						jQuery('#find-in-store-address').hide();
						break;
						
					case "__ParseResults" : // 3. Parse store data results (Next: __ShowError, __ShowNoStores, __ShowStoreList)
						break;
						
					case "__ShowStoreList" : // END. Success!!!
						
						app.isFindInStore = true; //For Omniture tagging
						
						this.findInStoreResults = args[1];
						
						var stores = this.findInStoreResults.stores
						var storeIds = [];
						for (var i=0; i<stores.length; i++) {
							storeIds.push(stores[i].id);
						}
						
						/*
						jQuery.getJSON(
							app.URLs.findInStore + '?callback=?',
							{'stores': storeIds.join('|'), 'master': this.PDO.styleMasterID},
							__ParseStores
						);
						*/
						
						app.ajax.getJson({
							url			: app.URLs.findInStore + '?callback=?',
							data		: {'stores': storeIds.join('|'), 'master': this.PDO.styleMasterID},
							callback	: function(data) {
								__ParseStores(scope, data);
							}
						});
						
						break;
					case "__ShowGeocodeError" : // 2. Geocode error (ZERO_RESULTS or other error)
					case "__ShowNoStores" : // END. No stores in 50 miles (or no store data grabbed.)
					case "__ShowError" : // END. Error parsing store data
						jQuery('#find-in-store-listing').show();
						jQuery('#find-in-store-options').hide();
						jQuery('#find-in-store-address').hide();
						break;
				}
			}
			
			
			/**
			* Parse Stores Availability Data
			*
			* Various HTML manipulation and events handling.
			*/
			function __ParseStores(scope, data, textStatus, jqXHR) {
				if (data['success'] == false) {
					scope.findInStoreAvailability = {};
				} else {
					scope.findInStoreAvailability = data;
					jQuery('#find-in-store-listing').hide();
					jQuery('#find-in-store-options').show();
					jQuery('#find-in-store-form').hide();
					
					// Edit Address						
					var addr = jQuery('#find-in-store-wrapper .locator-store-search').val();
					jQuery('#find-in-store-address').empty().append('Find in stores near <strong>"' + addr + '"</strong> <a href="#">Edit</a>').show();
					jQuery('#find-in-store-address a').click(function() {
						jQuery('#find-in-store-listing').hide();
						jQuery('#find-in-store-options').hide();
						jQuery('#find-in-store-address').empty().hide();
						jQuery('#find-in-store-form').show();
						this.findInStoreResults = undefined;
						// Reset height of store results
						jQuery('#find-in-store-listing').css({
							'height': 200
						});
					});
					
					// Change height of store results...
					var h = 395 - 17 - jQuery('#find-in-store-options').height();
					jQuery('#find-in-store-listing').css({
						'height': h
					});
					
					// Details
					jQuery('#find-in-store-listing .store-hours-link').hide();
					jQuery('#find-in-store-listing .store-hours-container').show();
					
					jQuery('#find-in-store-listing .store-details-container').css({'marginTop': 5}).hide().before('<a class="store-details-link" href="#">View Details</a>');	
					jQuery('#find-in-store-listing a.store-details-link').unbind('click').click(function(e) {
						if (jQuery(this).hasClass('open')) {
							jQuery(this).removeClass('open');
							jQuery(this).parent().find('.store-details-container').hide();
						} else {
							jQuery(this).addClass('open');
							jQuery(this).parent().find('.store-details-container').show();
						}
					});
					
					var haveInventory = __UpdateStoreAvailability(scope);
					
					//s.products = ";" + app.ProductCache.PDO.masterID + ";;;;evar12=" + pliOptions.masterPid; //old product ID

					var TSV = scope.GetSelectedVariant('#FindInStore'); // Tracking selected variant
					if (TSV != null) {
						if (haveInventory)
							s.events = "event62";
						else s.events = "";
						s.channel = "Product Detail";
						s.prop1 = "Product Detail: Find In Store Results";
						s.prop2 = "Product Detail: Find In Store Results: " + scope.PDO.name + ": " + TSV.styleMasterID;
						s.prop3 = "Product Detail: Find In Store Results: " + scope.PDO.name + ": " + TSV.styleMasterID;
						s.prop4 = "Product Detail";
						s.pageName = "Product Detail: Find In Store Results: " + scope.PDO.name + ": " + TSV.styleMasterID;
						s.products = ";" + TSV.styleMasterID + ";;;;eVar12=" + TSV.id;
						var s_code=s.t();
						if(s_code) {
							document.write(s_code);
						}
					}
				}
			}
			
			
			/**
			* Update Store Availability
			*
			* When user selects different swatches, update the store availability information display.
			*/
			function __UpdateStoreAvailability(scope) {
				var VDO = scope.GetSelectedVariant('#FindInStore');	
				var haveInventory = false;
				var scope = scope;
				
				if (VDO == null) {
					// jQuery('#find-in-store-listing').hide();
					jQuery('#find-in-store-listing').show();
					
					jQuery('#find-in-store-listing .store-name').each(function(i,e) {
						jQuery(this).parent().find('.store-stock').remove();
						jQuery(this).parent().find('.store-details-link').before('<div class="store-stock stock0">Not Available</div>');
					});
				} else {
					jQuery('#find-in-store-listing').show();
					
					jQuery('#find-in-store-listing .store-name').each(function(i,e) {
						var rel = jQuery(this).attr('rel');
						var availabilityCode = 0;
						if (scope.findInStoreAvailability[rel] != undefined) {
							availabilityCode = scope.findInStoreAvailability[rel][VDO.id];
						}
						jQuery(this).parent().find('.store-stock').remove();
						switch (availabilityCode) {
							case 1:
								jQuery(this).parent().find('.store-details-link').before('<div class="store-stock stock1">Available</div>');
								haveInventory = true;
								break;
							case 2:
								jQuery(this).parent().find('.store-details-link').before('<div class="store-stock stock2">Limited Availability</div>');
								haveInventory = true;
								break;
							case 0:
							default:
								/*if (VDO.attributes != undefined && VDO.attributes.sizeType == "Petite") {
									jQuery(this).parent().find('.store-details-link').before('<div class="store-stock stock0">Petite sizes are only available online.</div>');
								} else if (VDO.attributes != undefined && VDO.attributes.sizeType == "Tall") {
									jQuery(this).parent().find('.store-details-link').before('<div class="store-stock stock0">Tall sizes are only available online.</div>');
								} else {
									jQuery(this).parent().find('.store-details-link').before('<div class="store-stock stock0">Not Available</div>');
								}*/
								jQuery(this).parent().find('.store-details-link').before('<div class="store-stock stock0">Not Available</div>');
								break;
						}
					});
				}
				return haveInventory;
			}
			
			
			/* --------------- VIDEO --------------- */


			/**
			* Watch Video
			*
			* 1. Appends watch button.
			* 2. Adds event handler
			*/
			this.BindWatchVideo = __BindWatchVideo;
			function __BindWatchVideo() {

				var scope = this;
				
				if (app.util.isSecure() == true) {
					return; // iFrame is not allowed on secure pages.
				}
				
				scope.ClearVideos();
				
				if (scope.OOS == true) {
					return;
				}
				
				if ((scope.PDO.isMaster || scope.PDO.isVariant) && scope.PDO.video != '') {
					jQuery('.productthumbnails', scope.containerID).before('<div class="watch-video"><span>Watch Video</span></div>');
					
					var hander = scope.WatchVideoHander;
					var selector = '.watch-video';
					jQuery(selector, scope.containerID).each(function() {
						var data = {'scope': scope, 'video': scope.PDO.video};
						jQuery(this).bind('click', data, hander);
					});
				}
			}
			
			
			/**
			* Clear Videos
			*
			* The video resize video is global. We must clear all of them.
			*
			* 1. Removes all video iframes.
			* 2. Clears all window.resize listeners.
			* 3. Resets all watch video buttons.
			*/
			this.ClearVideos = __ClearVideos;
			function __ClearVideos() {
				var scope = this;
				
				if (app.util.isSecure() == true) {
					return; // iFrame is not allowed on secure pages.
				}
				
				jQuery('.video-container').empty();
				jQuery(window).off('resize.video.*');
				jQuery('.watch-video span.stop').removeClass('stop');
				jQuery('.watch-video span').text('Watch Video');
			}
			
			
			/**
			* Watch Video
			*
			* 1. Append video iframe.
			* 2. Attach window.resize event listener.
			*/
			this.WatchVideoHander = __WatchVideoHander;
			function __WatchVideoHander(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				var video = e.data.video;
				
				if (video != '') {
					var str = jQuery('.watch-video span', scope.containerID).text();
					if (str == 'Stop Video') {
						scope.ClearVideos();
					} else {
						scope.ClearVideos();
				
						jQuery('.video-container', scope.containerID).append('<iframe class="video-iframe" src="' + video + '" frameborder="0" scrolling="no" height="auto" width="100%"></iframe>');
					
						var w = jQuery('img.new-hero', scope.containerID).width();
						var h = Math.round(w * (1370/1050)); // jQuery('img.new-hero', scope.containerID).height();
						jQuery('.video-iframe', scope.containerID).css({'width': w, 'height': h});
					
						jQuery('.watch-video span', scope.containerID).text('Stop Video');
						jQuery('.watch-video span', scope.containerID).addClass('stop');
						
						if (scope.PDO.ID != undefined) {
							var s = s_gi(s_account); 

							s.linkTrackVars = 'eVar55';
							s.eVar55 = "playvideo_" + scope.PDO.ID;
							s.tl(this,'o','Video');
						}
				
						scope.ResizeVideoInit();
					}
				}
			}
			
			
			/**
			* Resize Video
			*
			* 1. Attach window.resize event listener.
			*/
			this.ResizeVideoInit = __ResizeVideoInit;
			function __ResizeVideoInit() {
				var scope = this;
				
				var hero = jQuery('img.new-hero', scope.containerID);
				var iframe = jQuery('.video-iframe', scope.containerID);
				
				var w = jQuery(hero).width();
				var h = Math.round(w * (1370/1050)); // jQuery('img.new-hero', scope.containerID).height();
				jQuery(iframe).css({'width': w, 'height': h});
				
				jQuery(window).on('resize.video.'+scope.PDO.ID, function(e) {
					/*
					var scope =		e.data.scope;
					var hero =		e.data.hero;
					var iframe =	e.data.iframe;
					*/
					// jQuery('#QuickViewDialog').dialog('isOpen')
					
					// #pdpMain.quickviewselector
					// #pdpMain.pdpselector
					// #pdpMain.quickviewoutfitpdpselector
					
					if (scope.containerID == '#pdpMain.quickviewselector') {
						jQuery('#QuickViewDialog').dialog('isOpen')
					}
					
					var w = jQuery(hero).width();
					var h = Math.round(w * (1370/1050)); // jQuery('img.new-hero', scope.containerID).height();
					jQuery(iframe).css({'width': w, 'height': h});
				});
				jQuery(window).trigger('resize.video.'+scope.PDO.ID);
			}
			
			
			/* --------------- OTHER LINKS --------------- */


			/**
			* Bind View Full Details Click
			*/
			this.BindViewFullDetails = __BindViewFullDetails;
			function __BindViewFullDetails() {
				var scope = this;
				if (scope.OOS == true) {
					return;
				}

				// View Full Details				
				if (scope.PDO.isMaster || scope.PDO.isVariant) {
					var hander = scope.ViewFullDetailsHander;
					var selector = '#full-details-link a';
					jQuery(selector, scope.containerID).each(function() {
						var data = {'scope': scope};
						jQuery(this).bind('click', data, hander);
					});
				}
			}
			
			
			/**
			* View Full Details Click
			*/
			this.ViewFullDetailsHander = __ViewFullDetailsHander;
			function __ViewFullDetailsHander(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				
				var VDO = scope.GetSelectedVariant();
				if (VDO == null) {
					VDO = scope.GetSelectedColorVariant();
				}
				
				if (VDO == null) {
					// No variants at all...
				} else {
					var params = app.util.getParamsFromURL(app.fullviewurl);
					
					var url = app.URLs.getProductUrl;
					
					var start = params['start'];
					if (start != undefined) {
						url = app.util.appendParamToURL(url, 'start', start);
					}
					var cgid = params['cgid'];
					if (cgid != undefined) {
						url = app.util.appendParamToURL(url, 'cgid', cgid);
					}
					
					url = app.util.appendParamToURL(url, 'pid', VDO.id);
					
					window.location.href = url;
				}
			}
			
			
			/**
			* Bind Send to Friend Click
			*/
			this.BindSendToFriend = __BindSendToFriend;
			function __BindSendToFriend() {
				
				var scope = this;
				if (scope.OOS == true) {
					return;
				}
				
				// if (scope.PDO.isMaster || scope.PDO.isVariant) {
					var hander = scope.SendToFriendHander;
					var selector = '.sendtofriend';
					jQuery(selector, scope.containerID).each(function() {
						var data = {'scope': scope};
						jQuery(this).bind('click', data, hander);
					});
				// }
			}
			
			
			/**
			* Send to Friend Click Handler
			*/
			this.SendToFriendHander = __SendToFriendHander;
			function __SendToFriendHander(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				
				var url = app.URLs.sendToFriend;
				var pid = scope.PDO.ID;
				
				if (scope.PDO.isOutfitGroup) {
					url = app.util.appendParamToURL(url, 'pid', pid);
				} else {					
					if (scope.PDO.isMaster || scope.PDO.isVariant) {
						var VDO = scope.GetSelectedVariant();
						if (VDO != null) {
							pid = VDO.id; // Selected variant
						}
					}
					url = app.util.appendParamToURL(url, 'pid', pid);
				}
				app.dialog.open(url, app.resources.SEND_TO_FRIEND, 'stafcontainer');
				
				jQuery('#stafcontainer').dialog({
					width: 390,
					minHeight:560, 
					modal:true,
					overlay: {
						opacity: 0.5,
						background: 'black'
					},
					resizable: false,
					draggable: false
				});
				jQuery('.ui-widget-overlay').last().unbind('click').bind('click', function(e) {
					e.preventDefault();
					jQuery(this).next('.ui-dialog').first().find('.ui-dialog-titlebar-close').trigger('click');
				});
			}
			
			
			/**
			* Bind Print Hander
			*
			* Bind print handler if none found.
			*/
			this.BindPrintHandler = function() {
				var isPrintHandler = function(el, ev) {
				    var found = false;
				    var events = jQuery(el).data('events');
				    if (events) {
					    jQuery.each(events, function(i, e) {
					        if (i === ev) {
					            found = true;
					        }
					    });
				    }
				    return found;
				}
				if (!isPrintHandler('a.printpage', 'click')) {
					jQuery('a.printpage').click(function(evt) {
						evt.preventDefault();
						window.print();
					});
				}
			}
			
			
			/* --------------- GLOBAL UTILITY HANDERS --------------- */
			
			
			/**
			* Get Array intersect
			*/
			this.ArrayIntersection = __ArrayIntersection;
			function __ArrayIntersection(a1, a2) {
				var intersect = jQuery.map(a1,
					function(v) {
						return jQuery.inArray(v, a2) < 0 ? null : v;
					}
				);
				return intersect;
			}
			
			
			/**
			* Get Selected Swatch id
			*
			* Returns ID or undefined
			*/
			this.GetSelectedCode = __GetSelectedCode;
			function __GetSelectedCode(attributeID, otherContainerID) { // colorCode, sizeType, size, pantLenth
				var scope = this;
				
				var container = otherContainerID == undefined ? scope.containerID : otherContainerID;
				
				// Get the currently selected value.
				var selector = '.variationattributes .swatches.' + attributeID + ' ul.swatchesdisplay li.selected';
				var value = jQuery(selector, container).find('a').attr('rel');
				
				return value;
			}
			this.GetSelectedColorCode = function(otherContainerID) {
				return this.GetSelectedCode('colorCode', otherContainerID);
			}
			this.GetSelectedSizeType = function(otherContainerID) {
				return this.GetSelectedCode('sizeType', otherContainerID);
			}
			this.GetSelectedSize = function(otherContainerID) {
				return this.GetSelectedCode('size', otherContainerID);
			}
			this.GetSelectedPantLength = function(otherContainerID) {
				return this.GetSelectedCode('pantLength', otherContainerID);
			}
			
			
			/**
			* Get Selected Color Variant
			*
			* Get the first selected colorCode variant. Failing that, get the first variant.
			*
			* Returns VDO or null
			*/
			this.GetSelectedColorVariant = __GetSelectedColorVariant;
			function __GetSelectedColorVariant() {
				var scope = this;
				var attributeID = 'colorCode';
				var VDO = null;
				
				if (scope.PDO.variants) {
					// Get the currently selected value.
					var colorCode = scope.GetSelectedColorCode();
					
					if (colorCode != undefined) {
						var arr = this.PDO.variantMatrix[attributeID][colorCode]; // Array of products that match value
						if (arr != undefined || arr.length > 0) {
							VDO = arr[0];
						}
					}
					
					if (VDO == null) { // Fallback 1 - Get the first orderable variant
						for (var id in scope.PDO.variants) {
							if (scope.PDO.variants[id].availability.avStatus != 'NOT_AVAILABLE') {
								VDO = scope.PDO.variants[id];
								break; // Get the first orderable variant
							}
						}
					
						if (VDO == null) { // Fallback 2 - Get first variant
							for (var id in scope.PDO.variants) {
								VDO = scope.PDO.variants[id];
								break; // Get the first variant
							}
						}
					}
				}
				
				return VDO;
			}
			
			
			this.DebugAvailability = __DebugAvailability;
			function __DebugAvailability() {
				var scope = this;
				var VDO = null;
				var str = '<table><tr><th>id</th><th>colorCode</th><th>classCode</th><th>styleNumber</th><th>sizeType</th><th>size</th><th>pantLength</th><th>avStatus</th><th>ATS</th><th>sale</th><th>standard</th></tr>';
				
				if (scope.PDO.variants) {
					for (var id in scope.PDO.variants) {
						VDO = scope.PDO.variants[id];
						
						str += '<tr>';
						str += '<td>' + id + '</td>';
						str += '<td>' + VDO.attributes.colorCode + '</td>';
						str += '<td>' + VDO.classCode + '</td>';
						str += '<td>' + VDO.styleNumber + '</td>';
						str += '<td>' + (VDO.attributes.sizeType==undefined?'-':VDO.attributes.sizeType) + '</td>';
						str += '<td>' + (VDO.attributes.size==undefined?'-':VDO.attributes.size) + '</td>';
						str += '<td>' + (VDO.attributes.pantLength==undefined?'-':VDO.attributes.pantLength) + '</td>';
						str += '<td>' + VDO.availability.avStatus + '</td>';
						str += '<td>' + VDO.availability.ATS + '</td>';
						str += '<td>' + VDO.pricing.sale + '</td>';
						str += '<td>' + VDO.pricing.standard + '</td>';
						str += '</tr>';
					}
				}
				str += '</table>';
				
				if (jQuery('#debugDialog').length == 0) {
					jQuery(document.body).append('<div id="debugDialog"></div>');
				} else {
					jQuery('#debugDialog').empty();
				}
				jQuery('#debugDialog').append(str);
				jQuery('#debugDialog').dialog({
					modal: true,
					overlay: {
						opacity: 0.5,
						background: 'black'
					},
					height: 'auto',
					width: 800,
					resizable: false,
					dialogClass: 'debugDialog'
				});
				jQuery('.ui-widget-overlay').last().unbind('click').bind('click', function(e) {
					e.preventDefault();
					jQuery(this).next('.ui-dialog').first().find('.ui-dialog-titlebar-close').trigger('click');
				});
			}
			
			
			/* --------------- IMAGE INTERFACE HANDLING --------------- */
			
			/**
			* Update page elements when a color swatch is selected.
			*
			* Changing a color swatch triggers:
			* 1. Main image swap.
			* 2. Enlarge image swap.
			* 3. Thumbnail image swap.
			* 4. Snipe
			* 5. "Get the look" swap.
			* 	6. Update "View Detail" link.
			* 	7. Update "Facebook" link. (Quickview)
			* 	8. Update "Send to Friend" link.
			*/
			this.UpdateColorFeatures = __UpdateColorFeatures;
			function __UpdateColorFeatures() {
				var VDO = this.GetSelectedColorVariant();
				
				var scope = this;
				
				if (jQuery('#selectedColorText', scope.containerID).length == 0) {
					jQuery('.variationattributes .swatches.colorCode', scope.containerID).after('<div id="selectedColorText"><div>');
				}
				jQuery('#selectedColorText', scope.containerID).empty();
				
				if (VDO != null) {
					var colorName = VDO.attributes['colorCode'];
					jQuery('#selectedColorText', scope.containerID).html('<div class="container">Selected Color: <span class="text">' + colorName + '</span></div>');
				}
				
				__UpdateImages(this, VDO);
				__UpdateSnipe(this, VDO);
				
				if (scope.OOS == true) {
					// 
				} else {
					this.UpdatePrice(VDO); // Passing in the color VDO (not the selected one)
					this.UpdatePromo(VDO);
					// __UpdateGetTheLook(this, VDO);
					// __UpdateRecommendations(this, VDO);
					__UpdateSocialLinks(this, VDO);
				}
			}
			
			
			/**
			* Setup the video player, hide/show enlarge link.
			*/
			this.SetupVideo = __SetupVideo;
			function __SetupVideo(file) {
				/*
				var scope = this;
				
				var extension = file.substr((file.lastIndexOf('.') + 1));
				if (extension == 'flv') {
					jQuery('.productimage, .enlarge-link', scope.containerID).css('display','none');
					
					var staticUrl = jQuery('#static').attr('value');
					jQuery('#mediaplayer_wrapper').css('display','block');
					jwplayer('mediaplayer').setup({
						'flashplayer': staticUrl,
						'id': 'playerID',
						'width': '318',
						'height': '415',
						'backcolor': 'FFFFFF',
						'frontcolor': '000000',
						'lightcolor': '000000',
						'screencolor': 'FFFFFF',
						'file': file
					});
					return true;
				} else {
					jQuery('#mediaplayer_wrapper').css('display','none');
					jQuery('.productimage, .enlarge-link', scope.containerID).css('display','block');
				}
				return false;
				*/
				return false;
			}
			
			
			/**
			* Swap the main product image
			*
			* This is called from __UpdateImages and ThumbnailClickHander.
			*/
			this.SwapMainImage = __SwapMainImage;
			function __SwapMainImage(AVO, index) {
				var scope = this;
			
				scope.ClearVideos();
				
				if (AVO.images.hasImages == false || AVO.images['small'].length == 0) {
					return;
				}
				
				// Main Image (Outfit Product)
				if (scope.PDO.isSubProduct && AVO.images['large'].length) {
					// Not sure about this block
					jQuery('.sub-hero-wrapper', scope.containerID).html('').append(
						jQuery('<img/>').
							attr('src', AVO.images['large'][index].url).
							attr('alt', AVO.images['large'][index].alt).
							attr('title', AVO.images['large'][index].title).addClass('new-hero')
					);
				}
			
				// Main Image / Zoom Image
				if (jQuery('.new-hero-wrapper, .sub-hero-wrapper', scope.containerID).length) {
					// Main Image
					if (AVO.images['large'].length) {
						jQuery('.new-hero-wrapper, .sub-hero-wrapper', scope.containerID).html('').append('<img class="new-hero" src="' + AVO.images['large'][index].url + '" alt="' + AVO.images['large'][index].alt + '" title="' + AVO.images['large'][index].title + '" />');
						jQuery('.productimage, .new-hero-wrapper, .sub-hero-wrapper', scope.containerID).css('display','block');
						jQuery('.enlarge-link', scope.containerID).css('display','block');
						// var filename = AVO.images['large'][index].url;
						// scope.SetupVideo(filename);
					}

					// Zoom Image
					if (AVO.images['xlarge'].length) {
						scope.BindZoom(AVO, index);
					}
				}
				
				if (AVO.images['xlarge'].length) {
					jQuery('.enlarge-link, .new-hero-wrapper, .sub-hero-wrapper', scope.containerID).unbind('click').bind('click', {'scope': scope, 'AVO': AVO}, function(e) {
						e.preventDefault();
				
						var scope = e.data.scope;
						var AVO = e.data.AVO;
				
						var selectedOptions = {}; // jQuery.extend({}, {}, thisProduct.selectedOptions);
						/*
						if ((scope.PDO.isMaster || scope.PDO.isVariant) && scope.PDO.variantMatrix[AVO.val] != undefined) {
							selectedOptions.pid = scope.PDO.variantMatrix[AVO.val][0].id;
						} else {
							selectedOptions.pid = this.PDO.ID;
						}
						*/
						selectedOptions.pid = scope.PDO.ID;
					
						var tempURL = app.URLs.productEnlarge + '?' + jQuery.param(selectedOptions);
						app.dialog.loadFullView(tempURL, 'Full View');
						
						// $('html, body').animate({ scrollTop: 0 }, 'slow');
					});
				}
			}
			
			
			/**
			* Handle clicks on the thumbnails.
			*
			* Updates active thumb, swap main image.
			*/
			this.ThumbnailClickHander = __ThumbnailClickHander;
			function __ThumbnailClickHander(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				var AVO = e.data.AVO;
				var index = e.data.index;
				
				var smallImageObj = AVO.images['small'][index];
				var largeImageObj = AVO.images['large'][index];
				var xlargeImageObj = AVO.images['xlarge'][index];
				
				// Get the currently selected value.
				selector = '.productthumbnails img.pdpthumb.activeThumb';
				var currentSelection = jQuery(selector, scope.containerID);
				
				// Deselect all the swatches.
				selector = '.productthumbnails img.pdpthumb';
				jQuery(selector, scope.containerID).removeClass('activethumb');
				
				// Select this one.
				jQuery(this).addClass('activethumb');
				
				var isSwitched = false;
				if (currentSelection == undefined || currentSelection != this) {
					isSwitched = true;
				}
				
				scope.ClearVideos();
				
				if (isSwitched) {
					// Switch Main Image
					scope.SwapMainImage(AVO, index);
				}
			}
			

			/**
			* Update the main image and thumbnails
			*/
			function __UpdateImages(scope, VDO) {
				
				var AVO;
				
				// var VDO = scope.GetSelectedColorVariant();
				if (VDO != null) {
					var colorCode = VDO.attributes['colorCode'];
					AVO = scope.PDO.variations['colorCode'].vals[colorCode];
				}
			
				if (AVO == undefined || AVO.images.hasImages == false || AVO.images['small'].length == 0) {
					return;
				}
			
				var url = scope.SwapMainImage(AVO, 0);
				
				// Thumbnails						
				var arr = AVO.images['small'];
				if (arr.length && !scope.PDO.isSubProduct) { //  && !scope.PDO.isOutfitProduct && !scope.PDO.isOutfitGroup
					jQuery('.productthumbnails', scope.containerID).html('');
					
					var smallImageObj, largeImageObj, xlargeImageObj, filename, ext, data;
					
					for (var i=0; i<arr.length; i++) {
						smallImageObj = AVO.images['small'][i];
						largeImageObj = AVO.images['large'][i];
						xlargeImageObj = AVO.images['xlarge'][i];
						
						filename = largeImageObj.url;
						ext = filename.substr((filename.lastIndexOf('.') + 1));
						
						if (ext == 'flv') {
							// Video
							/*
							jQuery('.productthumbnails', scope.containerID).append(
								jQuery('<img/>').
									attr('src', smallImageObj.url).
									attr('alt', smallImageObj.alt).
									attr('title', smallImageObj.title).
									attr('class', 'vimage')
							);
							jQuery('.vimage', scope.containerID).wrap(jQuery('<a>').addClass('video-thumb')).before('<span></span>');
							jQuery('.video-thumb', scope.containerID).click(function(e){
								var filename = largeImageObj.url;
								openFile(filename);
							});
							*/
						} else {
							// Thumbnail
							var data = {'scope': scope, 'AVO': AVO, 'index': i};
							jQuery('.productthumbnails', scope.containerID).append('<div class="thumb-wrap"><img class="pdpthumb" src="'+smallImageObj.url+'" alt="'+smallImageObj.alt+'" title="'+smallImageObj.title+'"></div>');
							jQuery('.productthumbnails img', scope.containerID).last().bind('click', data, scope.ThumbnailClickHander);
						}
					}
					
					jQuery('.productthumbnails img', scope.containerID).first().addClass('activethumb');
				}
				
				return url;
			}
			
			
			/**
			* Update Snipes
			*/
			function __UpdateSnipe(scope, VDO) {
			
				jQuery('.productsnipe', scope.containerID).removeClass('finalsale sale exclusive outlet').text('');
				jQuery('.dotbadge', scope.containerID).removeClass('finalsale sale new outlet').text('');
				//jQuery('.enlarge-link', scope.containerID).removeClass('hasSnipe');
			
				// var VDO = scope.GetSelectedColorVariant();
				if (VDO != null) {
					if (VDO.outlet == true) {
						jQuery('.productsnipe', scope.containerID).addClass('outlet').text('Clearance');
						//jQuery('.enlarge-link', scope.containerID).addClass('hasSnipe');
					} else if (VDO.finalSale == true) {
						jQuery('.productsnipe', scope.containerID).addClass('finalsale').text('Final Sale');
						//jQuery('.enlarge-link', scope.containerID).addClass('hasSnipe');
					} else if (VDO.saleItem == true) {
						jQuery('.productsnipe', scope.containerID).addClass('sale').text('Sale');
						//jQuery('.enlarge-link', scope.containerID).addClass('hasSnipe');
					} else if (VDO.snipe != undefined && VDO.snipe != '') {
						jQuery('.productsnipe', scope.containerID).addClass('exclusive').text(VDO.snipe);
						//jQuery('.enlarge-link', scope.containerID).addClass('hasSnipe');
					}
				}
				
				return VDO;
			}
			
			
			/**
			* Update Get the Look
			*/
			function __UpdateGetTheLook(scope, VDO) {
				/*
					if (scope.pageSource == 'pdp') {
						// var VDO = scope.GetSelectedColorVariant();
					
						if (VDO != null) {
							var getThisLookArr = VDO.getthislook;
							if (getThisLookArr.length > 0) {
								if (jQuery('#get-this-look').hasClass(getThisLookArr[0].recID + '_recs') == false) {
									jQuery('#get-this-look').empty().removeClass().addClass(getThisLookArr[0].recID + '_recs');
		
									var str = '';
									str += '<div class="get-this-look-content">';
								
									str += '<div class="get-this-look-hero">';
									str += '<a href="'+getThisLookArr[0].recURL+'" title="'+getThisLookArr[0].recName+'">';
									str += '<img src="'+getThisLookArr[0].recImage+'" alt="'+getThisLookArr[0].recName+'" />';
									str += '</a>';
									str += '</div>';
								
									str += '<ul class="get-this-look-gallery">';
									for (var i=1; i<getThisLookArr.length; i++) {
										str += '<li>';
										str += '<a href="'+getThisLookArr[i].recURL+'" title="'+getThisLookArr[i].recName+'">';
										str += '<img src="'+getThisLookArr[i].recImage+'" alt="'+getThisLookArr[i].recName+'" />';
										str += '</a>';
										str += '</li>';
									}
									str += '</ul>';
									str += '<div class="get-this-look-text">';
									str += '<h3>'+app.resources['GET_THIS_LOOK_HEADER']+'</h3>';
									str += '<p>'+app.resources['GET_THIS_LOOK_COMPLETE_OUTFIT']+'</p>';
									str += '<a title="'+app.resources['GET_THIS_LOOK_GET_DETAILS']+'" href="'+getThisLookArr[0].recURL+'">'+app.resources['GET_THIS_LOOK_GET_DETAILS']+'</a>';
									str += '</div>';
									str += '</div>';
		
									jQuery(str).appendTo(jQuery('#get-this-look'));
								}
							} else {
								jQuery('#get-this-look').empty().removeClass();
							}
						} else {
							jQuery('#get-this-look').empty().removeClass();
						}
					}
				*/
			}
			
			
			/**
			* Update Snipe
			*/
			function __UpdateRecommendations(scope, VDO) {
				/*
					if (scope.pageSource == 'pdp' || scope.pageSource == 'quickview' || scope.pageSource == 'minicart' || scope.pageSource == 'cart') {
						// var VDO = scope.GetSelectedColorVariant();
							
						var rec_id = '#product_rr';
						if (scope.pageSource == 'quickview' || scope.pageSource == 'minicart' || scope.pageSource == 'cart') {
							rec_id = '#quickview_rr';
						}
					
						if (VDO != null) {
							var recommendationsArr = VDO.recommendations;
							if (recommendationsArr.length > 0) {
							
								if (jQuery(rec_id).hasClass(VDO.attributes.colorCode + '_recs') == false) {
									jQuery(rec_id).empty().removeClass().addClass(VDO.attributes.colorCode + '_recs');
		
									var str = '';
									str += '<h6>We Also Suggest</h6>';
									str += '<ul class="certona-rec-list">';
									for (var i=0; i<recommendationsArr.length; i++) {
										if (recommendationsArr[i].recOutOfStock == false) {
											str += '<li>';
											str += '<div class="analytics captureproductid" style="display: none;">'+recommendationsArr[i].recID+'</div>';
											str += '<a class="rec-image" href="'+recommendationsArr[i].recURL+'">'
											str += '<img alt="'+recommendationsArr[i].recName+'" src="'+recommendationsArr[i].recImage+'" />'
											str += '</a>'
											str += '<a class="rec-name" href="'+recommendationsArr[i].recURL+'" title="'+recommendationsArr[i].recName+'">'+recommendationsArr[i].recName+'</a>';
											str += '<div class="rec-rating '+recommendationsArr[i].recRating+'"></div>';
											str += '</a>';
											str += '</li>';
										}
									}
									str += '</ul>';
		
									jQuery(str).appendTo(jQuery(rec_id));
								}
							} else {
								jQuery(rec_id).empty().removeClass();
							}
						} else {
							jQuery(rec_id).empty().removeClass();
						}
					}
				*/
			}
			
			
			/**
			* Update Pinterest and Facebook Links
			*/
			function __UpdateSocialLinks(scope, VDO) {
				if (app.constants.socialIntegrationPinterest == true || app.constants.socialIntegrationFacebook == true) {
					if (!scope.PDO.isSubProduct) { // && !scope.PDO.isOutfitGroup
						var AVO;
						// var VDO = scope.GetSelectedColorVariant();
						if (VDO != null) {
							var colorCode = VDO.attributes['colorCode'];
							AVO = scope.PDO.variations['colorCode'].vals[colorCode];
						}
					
						if (AVO == undefined || AVO.images.hasImages == false || AVO.images['small'].length == 0) {
							return;
						}
						
						if (AVO.images['large'].length) {
							var media = AVO.images['large'][0].url;
							
							var description = scope.PDO.name + ' from THELIMITED.com';
							
							var selector = '.variationattributes .swatches.colorCode ul.swatchesdisplay li.selected';
							var url = jQuery(selector, scope.containerID).find('a').attr('href');
							
							if (app.constants.socialIntegrationPinterest == true) {
								app.social.pinIt(url, media, description, scope.containerID);
							}
							if (app.constants.socialIntegrationFacebook == true) {
								// app.social.facebook(url, media, description);
							}
						}
					}
				}
			}
			
			
			/* --------------- ZOOM --------------- */
			
			/**
			* Bind Zoom
			*/
			this.BindZoom = __BindZoom;
			function __BindZoom(AVO, index) {
				
				var scope = this;
				jQuery('.new-hero-wrapper, .sub-hero-wrapper', scope.containerID).not('.nozoom').find('img').wrap(
					jQuery('<a>').attr('href', AVO.images['xlarge'][index].url).addClass('jqzoom')
				);
				
				if (app.util.isiPad() == false) {
					var hander = scope.ZoomHandlerLoad;
					var selector = '.new-hero-wrapper a.jqzoom, .sub-hero-wrapper a.jqzoom';
					jQuery(selector, scope.containerID).each(function() {
						var data = {'scope': scope};
						jQuery(this).unbind('mouseenter').bind('mouseenter', data, hander);
					});
				}
			}
			
			
			/**
			* Load xlarge Image on Mouse Enter
			*/
			this.ZoomHandlerLoad = __ZoomHandlerLoad;
			function __ZoomHandlerLoad(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				
				var selector = '.new-hero-wrapper a.jqzoom, .sub-hero-wrapper a.jqzoom';
				var imgUrl = jQuery(selector, scope.containerID).attr('href');
				jQuery(selector, scope.containerID).prepend('<div class="zoomMask"><img class="zoomImage" src="'+imgUrl+'" /></div>')
				
				var handerEnter = scope.ZoomHandlerEnter;
				var handerLeave = scope.ZoomHandlerLeave;
				var handerMove = scope.ZoomHandlerMove;
				var selector = '.new-hero-wrapper a.jqzoom, .sub-hero-wrapper a.jqzoom';
				jQuery(selector, scope.containerID).each(function() {
					var data = {'scope': scope};
					jQuery(this).unbind('mouseenter').bind('mouseenter', data, handerEnter);
					jQuery(this).unbind('mouseleave').bind('mouseleave', data, handerLeave);
					jQuery(this).unbind('mousemove').bind('mousemove', data, handerMove);
					jQuery(this).unbind('click').bind('click', function(e) {e.preventDefault()});
				});
			}
			
			
			/**
			* Zoom Enter
			*/
			this.ZoomHandlerEnter = __ZoomHandlerEnter;
			function __ZoomHandlerEnter(e) {
				e.preventDefault();

				var scope = e.data.scope;
				
				var h = jQuery('.new-hero', scope.containerID).height();
				var w = jQuery('.new-hero', scope.containerID).width();
				jQuery('.zoomMask', scope.containerID).css({
					"width": w,
					"height": h
				}).show();
			}
			
			
			/**
			* Zoom Leave
			*/
			this.ZoomHandlerLeave = __ZoomHandlerLeave;
			function __ZoomHandlerLeave(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				
				var h = jQuery('.new-hero', scope.containerID).height();
				var w = jQuery('.new-hero', scope.containerID).width();
				jQuery('.zoomMask', scope.containerID).css({
					"width": w,
					"height": h
				}).hide();
			}
			
			
			/**
			* Zoom Move
			*/
			this.ZoomHandlerMove = __ZoomHandlerMove;
			function __ZoomHandlerMove(e) {
				e.preventDefault();
				
				var scope = e.data.scope;
				
				var w = jQuery('.new-hero', scope.containerID).width();
				var h = jQuery('.new-hero', scope.containerID).height();
				jQuery('.zoomMask', scope.containerID).css({
					"width": w,
					"height": h
				}).show();
				
				var parentOffset = $(this).parent().offset(); // or $(this).offset(); if you really just want the current element's offset
				var relX = e.pageX - parentOffset.left;
				var relY = e.pageY - parentOffset.top;

				var l = (w - 1050) * (relX / w)
				var t = (h - 1370) * (relY / h)
				jQuery('.zoomImage', scope.containerID).css({
					"left": l,
					"top": t
				});
			}


			/* --------------- VARIANT DATA HANDLING --------------- */
			
			/**
			* Load Variant Data (PRIVATE)
			*/
			function __LoadVariants(scope) {
				this._variantsLoaded = false;
				
				app.ajax.getJson({
					url			: app.URLs.getVariants,
					data		: {'pid': scope.PDO.ID, 'format': 'json'},
					callback	: function(data) {
						__ParseVariants(scope, data);
					}
				});
			}
			
			
			/**
			* Load Variant Data (PRIVATE)
			*/
			function __ParseVariants(scope, data) {
				
				if (!data || !data.variations || !data.variations.variants) {
					return;
				}
				
				var variants = {};
				var PID, AO, VDO, attributeValueID;
				for (var i=0; i<data.variations.variants.length; i++) {
					// colorCode, sizeType, size, pantLength
					PID = data.variations.variants[i].id;
					AO = data.variations.variants[i];
					VDO = new VariantDataObj(AO);
					variants[PID] = VDO;
				}
				scope.PDO.variants = variants;
				
				__PopulateVariantMatrix(scope);
				
				scope._variantsLoaded = true;

				if (scope.PDO.isSubProduct) {
					var parentScope = null;
					for (var parentID in scope.PDO.parentProduct) {
						parentScope = scope.PDO.parentProduct[parentID];
					}
					if (parentScope != null){
						var allDone = true;
						var subProductRef;
						for (var subProductID in parentScope.PDO.subProducts) {
							subProductRef = parentScope.PDO.subProducts[subProductID];
							if (subProductRef._variantsLoaded == false) {
								allDone = false;
								break;
							}
						}
						if (allDone) {
							parentScope.TriggerOutfitLoaded();
						}
					}
				}
				
				scope.InitInterface();
			}

			// Called once all variants of all sub products have been loaded
			this.TriggerOutfitLoaded = function () {
				var scope = this;
				var subProductRef, subProductVDO; 
				var trackingArr = [];
				for (var subProductID in scope.PDO.subProducts) {
					subProductRef = scope.PDO.subProducts[subProductID];
					subProductVDO = subProductRef.GetSelectedVariant();
					if (subProductVDO == null)
						subProductVDO = subProductRef.GetSelectedColorVariant();
					trackingArr.push(subProductRef.GetItemID(subProductVDO));
				}
				this.Tracking("outfit", trackingArr.join(";"));
			}
			
			
			/**
			* Populate Variant Data (PRIVATE)
			*/
			function __PopulateVariantMatrix(scope) {
				
				// Loop through variations and build out EMPTY array of all variations.
				scope.PDO.variantMatrix = {};
				for (var attributeID in scope.PDO.variations) {
					AO = scope.PDO.variations[attributeID];
					if (scope.PDO.variantMatrix[attributeID] == undefined) {
						scope.PDO.variantMatrix[attributeID] = {};
					}
					for (var attributeValueID in AO.vals) {
						scope.PDO.variantMatrix[attributeID][attributeValueID] = [];
					}
				}
				
				// Populate matrix with VDO references.
				var VDO, attributeValueID;
				for (var variantID in scope.PDO.variants) {
					VDO = scope.PDO.variants[variantID];
					for (var attributeID in VDO.attributes) { // colorCode
						attributeValueID = VDO.attributes[attributeID]; // Disco Violet
						scope.PDO.variantMatrix[attributeID][attributeValueID].push(VDO); // Reference
					}
				}
			}
			
			
			/* --------------- IMAGES --------------- */
			
			
			/**
			* Append swatch images to color swatches
			*/			
			this.AppendSwatchImages = __AppendSwatchImages;
			function __AppendSwatchImages() {
				
				var attributeID, selector, AO, hander, AVO;
				var scope = this;
				if (scope.OOS == true) {
					return;
				}
				
				// colorCode
				attributeID = 'colorCode';
				hander = scope.ColorSwatchHander;
				AO = this.PDO.variations[attributeID];
				if (AO != undefined) {
					selector = '.variationattributes .swatches.'+attributeID+' ul.swatchesdisplay li a';
					jQuery(selector, this.containerID).each(function() {
						var rel = jQuery(this).attr('rel');
						var AVO = AO.vals[rel];

						var title = AVO.val;
						if (AVO.images.hasImages == true) {
							var swatch1 = AVO.images['swatch']['url'];
							var swatch2 = AVO.images['swatch2']['url'];
						
							if (swatch1 && swatch2) {
								jQuery(this, scope.containerID).html('<img src="'+swatch1+'" title="" alt="'+title+'" />').parent().append('<div style="display: none;" class="swatch-hover"><img src="'+swatch2+'" title="" alt="'+title+'" /><span class="color-title">'+title+'</span></div>');
							} else if (swatch1) {
								jQuery(this, scope.containerID).html('<img src="'+swatch1+'" title="" alt="'+title+'" />');
							} else {
								// no swatch image found
							}								
							// jQuery(selector, scope.containerID).removeClass('unselectable');
						}
					});
				}
			}
			
			
			
			/* --------------- PARENT / CHILD FUNCTIONS --------------- */
			
			/**
			* DESCRIPTION:
			* Call EITHER of these two functions to add product references to BOTH the 
			* parent and the child. There is no need to call both, just pick one.
			*/
			
			/**
			* Call this function on the Outfit Group object and pass in a Sub Product object.
			*
			* USAGE:
			* app.ProductCache.AddSubProduct(subProduct);
			*/
			this.AddSubProduct = __AddSubProduct;
			function __AddSubProduct(childObj) {
				if (this.PDO.isOutfitGroup == true) {
					if (childObj.PDO.isOutfitProduct == true) {
						if (this.PDO.subProducts[childObj.PDO.ID] == undefined) {
							this.PDO.subProducts[childObj.PDO.ID] = childObj;
							childObj.AddOutfitParent(this);
						}
					}
				}
			}
			
			/**
			* Call this on the Sub Product
			*
			* USAGE:
			* subProduct.AddOutfitParent(app.ProductCache);
			*/
			this.AddOutfitParent = __AddOutfitParent;
			function __AddOutfitParent(parentObj) {
				if (this.PDO.isOutfitProduct == true) {
					if (parentObj.PDO.isOutfitGroup == true) {
						if (this.PDO.parentProduct[parentObj.PDO.ID] == undefined) {
							this.PDO.isSubProduct = true;
							this.PDO.parentProduct[parentObj.PDO.ID] = parentObj;
							parentObj.AddSubProduct(this);
						}
					}
				}
			}
			
			
			/* --------------- DATA OBJECTS --------------- */
		
			/*
			* Product Data Object
			*/
			function ProductDataObj(data) {
				
				// Relationships
				this.subProducts		= {};
				this.parentProduct		= {};
				
				this.source				= data.source; // pdict.CurrentHttpParameterMap.source.stringValue
				
				this.name				= data.name;
				this.colorCode			= data.colorCode; // null
				
				this.ID					= data.ID;
				this.masterID			= data.masterID == undefined ? '' : data.masterID;
				
				this.isMaster			= data.master;
				this.isVariant			= data.variant;
				this.isOutfitGroup		= data.productSet;
				this.isOutfitProduct	= data.productSetProduct;
				this.isSubProduct		= false;
				
				// console.log('     isMaster = '+this.isMaster);
				// console.log('     isVariant = '+this.isVariant);
				// console.log('     isOutfitGroup = '+this.isOutfitGroup);
				// console.log('     isOutfitProduct = '+this.isOutfitProduct);
				
				// this.isOption		= data.isOption;
				// this.isBundle		= data.bundle;
				// this.isBundled		= data.bundled;
				
				this.masterRecommendations = data.masterRecommendations; // Empty array
				
				this.variants			= {};
				this.variantMatrix		= {};
				this.variations			= {};
				
				// Outfit Groups don't have variants or variations...
				if (data.variations != undefined) {
					var attributeID, AO;
					for (var i=0; i<data.variations.attributes.length; i++) {
						// colorCode, size, pantLength, sizeType
						attributeID	= data.variations.attributes[i].id;
						value = data.variations.attributes[i];
						AO = new AttributeObj(value);
						this.variations[attributeID] = AO;
					}
				}
				
				this.images				= data.images // Object: large, medium, xlarge, small, video
				
				// For outfit groups these are not used...
				this.showSoldOutSwatches = data.showSoldOutSwatches == undefined ? false : data.showSoldOutSwatches;
				this.video				= data.video == undefined ? false : data.video;
				this.outlet				= data.outlet == undefined ? false : data.outlet;
				this.finalSale			= data.finalSale == undefined ? false : data.finalSale;
				this.saleItem			= data.saleItem == undefined ? false : data.saleItem;
				this.newArrival			= data.newArrival == undefined ? false : data.newArrival;
				this.snipe				= data.snipe == undefined ? '' : data.snipe;
				
				this.styleMasterID		= data.styleMasterID == undefined ? '' : data.styleMasterID;
				this.classCode			= data.classCode == undefined ? '' : data.classCode;
				this.styleNumber		= data.styleNumber == undefined ? '' : data.styleNumber;
				
				// For outfit groups these are useless...
				this.availability		= new AvailabilityObj(data);
				this.pricing			= data.pricing; // isPromoPrice, quantities, sale, standard
			}

			/*
			* Product Data Object
			*/
			function VariantDataObj(data) {
				this.id					= data.id;
				this.attributes			= data.attributes; // {"colorCode": "Tropical Green", "size": "XL"}
				this.recommendations	= data.recommendations; // []
				this.getthislook		= data.getthislook; // [{}]
				
				this.showSoldOutSwatches = data.showSoldOutSwatches == undefined ? false : data.showSoldOutSwatches;
				this.video				= data.video == undefined ? false : data.video;
				this.outlet				= data.outlet == undefined ? false : data.outlet;
				this.finalSale			= data.finalSale == undefined ? false : data.finalSale;
				this.saleItem			= data.saleItem == undefined ? false : data.saleItem;
				this.newArrival			= data.newArrival == undefined ? false : data.newArrival;
				this.snipe				= data.snipe == undefined ? '' : data.snipe;
				
				this.promoMessage		= "";
				if (data.promoMessage != undefined && data.promoMessage != 'null') {
					this.promoMessage = data.promoMessage;
				}
				this.promoDetail		= "";
				if (data.promoDetail != undefined && data.promoDetail != 'null') {
					this.promoDetail = data.promoDetail;
				}
			
				this.styleMasterID		= data.styleMasterID == undefined ? '' : data.styleMasterID;
				this.classCode			= data.classCode == undefined ? '' : data.classCode;
				this.styleNumber		= data.styleNumber == undefined ? '' : data.styleNumber;
				
				this.colorCode			= data.colorCode == undefined ? '' : data.colorCode;
				this.sizeCode			= data.sizeCode == undefined ? '' : data.sizeCode;
				this.size				= data.size == undefined ? '' : data.size;
				
				this.availability		= new AvailabilityObj(data);
				this.pricing			= data.pricing; // isPromoPrice, quantities[{unit:"",value:"1.0"}], sale, standard
			}
			
			/*
			* Attribute Object
			*/
			function AttributeObj(data) {
				this.id					= data.id; // colorCode, size, pantLength
				this.name				= data.name; // Color, Size, Length
				this.vals				= {};
				var key, value;
				for (var i=0; i<data.vals.length; i++) {
					// Disco Violet, Tropical Green, XS, S
					key = data.vals[i].val;
					value = data.vals[i];
					this.vals[key] = new AttributeValueObj(value);
				}
			}
			
			/*
			* Attribute Value Object
			*/
			function AttributeValueObj(data) {
				this.val				= data.val; // Disco Violet, Tropical Green, XS, S
				this.cc					= data.cc; // 782, 863, 3, 6
				this.images				= new ImageObj(data.images);
			}
			
			/*
			* Image Object
			*/
			function ImageObj(data) {
				if (data == undefined || data == null) {
					this.hasImages		= false;
				} else {
					this.hasImages		= true;
					this.swatch			= data.swatch // Object {"url": "", "alt": "", "title": ""}
					this.swatch2		= data.swatch2 // Object
					this.large			= data.large // Array of objects
					this.xlarge			= data.xlarge // Array of objects
					this.medium			= data.medium // Array of objects
					this.small			= data.small // Array of objects
				}
			}
			
			/*
			* Store Availability Data
			*/
			function AvailabilityObj(data) {
				// If this is a master than these values are meaningless...
				this.avStatus			= data.avStatus; // IN_STOCK, PREORDER, BACKORDER, NOT_AVAILABLE
				this.avStatusQuantity	= data.avStatusQuantity; // 1 or amount you are checking
				this.inStock			= data.inStock; // Boolean: avStatusQuantity is stock...
				this.avLevels			= data.avLevels; // IN_STOCK, PREORDER, BACKORDER, NOT_AVAILABLE
				this.ATS				= data.ATS; // Inventory record ATS
				this.inStockDate		= data.inStockDate;
				
				if (this.inStockDate == 'null' || this.inStockDate == null) {
					this.inStockDate == '';
				}
				
				// Only items that have inventory records (i.e. a variation)
				this.pid				= data.pid;
				
				// this.lowStockThresholdList = data.lowStockThresholdList;
				// this.lowStockThresholdProduct = data.lowStockThresholdProduct;
				
				this.lowStockLevel		= 9;
				if (data.lowStockThresholdList != undefined && data.lowStockThresholdList != 'null') {
					lowStockLevel = parseInt(data.lowStockThresholdList);
				}
				/*
				if (data.lowStockThresholdList != undefined && data.lowStockThresholdList != 'null') {
					lowStockLevel = parseInt(data.lowStockThresholdList);
				}
				if (data.lowStockThresholdProduct != undefined && data.lowStockThresholdProduct != 'null') {
					lowStockLevel = parseInt(data.lowStockThresholdProduct);
				}
				*/
				
				this.backordable		= data.backordable;
				this.allocationQty		= parseInt(data.allocationQty); // Number allocated (for backorder or pre-order)
				this.stockLevel			= data.stockLevel; // Physical number in stock
				this.ats				= data.ats; // allocationQty + stockLevel = ats
				
				if (data.realtime != undefined) {
					if (data.realtime.ErrorCode == 0) {
						this.realtime = data.realtime;
					}
				}
			}
		}
	} else {
		alert('app is undefined!');
	}
})(app);


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STOREMAP.JS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

/**
* Store Map
*
* DESCRIPTION:
* jQuery plugin to handle Store Map functionality. This script is used in 3 different
* places: Header Store Locator, Store Locator Pages, and Find in Store Dialog.
*
* The Header Store Locator is automatically initialized on document load.
*
* The 
* 
* USAGE:
* var options = {
* 	'data'					: [],
* 	'showMap'				: true,
* 	'canvasSelector'		: '#store-overlay-canvas',
* 	'scrollSelector'		: '#store-overlay-listing',
* 	'linkSelector'			: '#store-overlay-listing li a.store-name',
* 	'linkParentSelector'	: '.store-listing',
* 	'formSelector'			: '.locator-store-form',
* 	'inputSelector'			: '.locator-store-search',
* 	'submitSelector'		: '.locator-store-submit'
* }
* jQuery('#locator').StoreMap(options);
*/
(function(jQuery) {
	jQuery.fn.StoreMap = function(options) {
		
		/* --------------- SETTINGS --------------- */
					
		/**
		* Default Settings
		*/
		var defaults = {
			data				: [],
			showMap				: true, // Map
			includeStateStores	: true, // Include all stores in the state in results
			callbackFunction	: undefined, // Callback for various functions
			callbackScope		: undefined, // Callback for various functions
			canvasSelector		: '#store-locator-canvas',
			scrollSelector		: '#store-locator-listing',
			linkSelector		: '#store-locator-listing li a.store-name',
			linkParentSelector	: '.store-listing',
			formSelector		: '.locator-store-form',
			inputSelector		: '.locator-store-search',
			submitSelector		: '.locator-store-submit',
			outlets				: [6,8,97,98,113,163,185,186,187,435,500,511,665,855,890,913],
			storeLatLng			: app.constants.storedata
		}
		var settings = jQuery.extend({}, defaults, options);
		
		// [[100,27.934062,-82.32436,'FL'],[102,41.630569,-87.825501,'IL'],[103,27.551132,-99.501383,'TX'],[107,25.956979,-80.146787,'FL'],[117,39.199979,-84.377442,'OH'],[119,36.81889,-76.27528,'VA'],[122,40.383896,-86.844948,'IN'],[123,38.24896,-85.608235,'KY'],[125,37.990877,-84.528753,'KY'],[127,39.914531,-75.429248,'PA'],[129,38.913046,-94.64317,'KS'],[137,36.127648,-115.167918,'NV'],[143,42.299291,-71.384213,'MA'],[148,30.247647,-91.997941,'LA'],[149,37.676525,-77.456274,'VA'],[15,41.698476,-83.643025,'OH'],[154,41.414162,-81.909328,'OH'],[163,30.460961,-91.091206,'LA'],[165,36.0625,-95.88333,'OK'],[170,33.575,-84.35194,'GA'],[171,35.925,-86.86889,'TN'],[172,40.814004,-96.642017,'NE'],[173,33.673557,-112.212145,'AZ'],[175,40.488166,-88.955449,'IL'],[177,36.849543,-76.289459,'VA'],[178,43.085255,-77.635743,'NY'],[18,37.323433,-121.942987,'CA'],[185,36.205565,-86.696386,'TN'],[187,41.21444,-80.75222,'OH'],[190,40.085413,-75.394664,'PA'],[196,41.456098,-75.64944,'PA'],[200,40.235102,-75.24766,'PA'],[202,40.076539,-83.129314,'OH'],[210,32.769278,-117.169796,'CA'],[214,39.02474,-84.579341,'KY'],[215,33.465479,-82.0806,'GA'],[22,35.200715,-89.792068,'TN'],[221,26.368595,-80.137186,'FL'],[222,40.903527,-74.552011,'NJ'],[226,41.312004,-81.824297,'OH'],[230,39.829273,-75.097974,'NJ'],[231,41.229225,-96.135468,'NE'],[232,39.151535,-77.207241,'MD'],[233,40.142806,-75.119605,'PA'],[25,35.196179,-106.658976,'NM'],[251,35.353311,-80.85503,'NC'],[252,37.694124,-121.924608,'CA'],[253,41.133939,-81.618081,'OH'],[256,32.001945,-81.116935,'GA'],[266,41.355,-89.12778,'IL'],[269,29.631623,-90.756727,'LA'],[27,41.661113,-81.360563,'OH'],[270,30.43723,-84.255908,'FL'],[271,42.172183,-72.642011,'MA'],[277,32.929521,-96.82117,'TX'],[280,25.64637,-80.337887,'FL'],[281,46.859647,-96.843706,'ND'],[285,38.863901,-77.355172,'VA'],[288,39.374956,-76.469157,'MD'],[289,34.79278,-92.22639,'AR'],[29,33.848932,-84.364557,'GA'],[291,40.052863,-82.915232,'OH'],[294,32.869895,-96.774118,'TX'],[297,30.69417,-88.04306,'AL'],[299,30.400194,-97.725087,'TX'],[30,40.30111,-79.50833,'PA'],[304,38.634896,-90.346148,'MO'],[306,42.752355,-71.461405,'NH'],[307,40.999642,-73.678187,'NY'],[312,30.470546,-97.806318,'TX'],[314,38.601551,-90.448975,'MO'],[326,41.7195,-87.782532,'IL'],[330,42.66583,-73.79889,'NY'],[342,39.905671,-86.066612,'IN'],[345,41.021026,-80.662723,'OH'],[346,31.251934,-85.419509,'AL'],[349,32.399597,-90.132234,'MS'],[351,36.808464,-119.776401,'CA'],[352,38.77345,-121.261332,'CA'],[356,40.768269,-111.891101,'UT'],[359,34.060793,-83.985825,'GA'],[366,40.855232,-81.426981,'OH'],[368,42.242788,-83.746383,'MI'],[37,39.941035,-75.025012,'NJ'],[373,30.382439,-91.09575,'LA'],[374,39.218843,-76.858743,'MD'],[390,35.036995,-85.160905,'TN'],[391,41.467839,-90.5071,'IL'],[393,27.945171,-82.524171,'FL'],[400,41.597501,-93.749512,'IA'],[403,38.58889,-89.99028,'IL'],[408,39.768436,-84.056396,'OH'],[409,34.187209,-118.887858,'CA'],[416,33.305632,-111.898165,'AZ'],[421,41.540474,-72.808178,'CT'],[422,43.031502,-77.440955,'NY'],[428,38.580796,-121.501535,'CA'],[430,30.255835,-97.810914,'TX'],[431,41.053289,-73.536128,'CT'],[435,29.826279,-97.986115,'TX'],[444,42.480741,-71.21709,'MA'],[45,44.272997,-88.470975,'WI'],[455,41.66194,-86.15861,'IN'],[46,33.502265,-111.93038,'AZ'],[462,44.8831,-93.328782,'MN'],[484,34.217343,-77.907085,'NC'],[493,43.09722,-70.80556,'NH'],[5,43.032299,-88.106751,'WI'],[50,33.509588,-112.027363,'AZ'],[503,36.976601,-121.964981,'CA'],[51,40.145446,-82.980637,'OH'],[511,42.683753,-88.188534,'WI'],[523,41.466857,-87.309177,'IN'],[542,37.08333,-88.6,'KY'],[544,41.600933,-87.558889,'IL'],[554,36.085103,-79.830563,'NC'],[559,26.240076,-80.250481,'FL'],[574,40.543903,-105.074747,'CO'],[575,33.010535,-96.70852,'TX'],[580,32.72528,-97.32056,'TX'],[582,32.830764,-97.199433,'TX'],[583,32.286529,-110.978271,'AZ'],[585,40.580917,-74.169133,'NY'],[586,33.100026,-96.805858,'TX'],[59,44.971842,-93.44724,'MN'],[600,40.964807,-73.856551,'NY'],[601,33.177905,-97.097028,'TX'],[602,40.544577,-74.336172,'NJ'],[603,30.306597,-89.825718,'LA'],[606,26.007828,-80.336517,'FL'],[609,39.007517,-76.484206,'MD'],[612,39.916156,-88.960914,'IL'],[618,45.553432,-94.210379,'MN'],[623,31.280438,-92.462566,'LA'],[635,41.956492,-87.807243,'IL'],[64,33.582888,-117.706362,'CA'],[640,35.905848,-78.937783,'NC'],[641,39.765637,-86.159051,'IN'],[65,42.561436,-83.183864,'MI'],[658,32.79444,-80.03083,'SC'],[66,39.780061,-84.074292,'OH'],[667,37.683196,-97.248888,'KS'],[677,42.046484,-88.038498,'IL'],[68,35.866177,-78.575746,'NC'],[680,38.919328,-77.22578,'VA'],[682,40.305149,-74.058708,'NJ'],[684,37.505562,-77.60895,'VA'],[688,47.458800,-122.261274,'WA'],[7,42.062462,-87.749058,'IL'],[70,39.563603,-104.87273,'CO'],[705,37.656366,-77.62005,'VA'],[708,40.739971,-73.613576,'NY'],[71,47.829291,-122.273197,'WA'],[711,38.794026,-90.615042,'MO'],[730,33.772715,-117.867445,'CA'],[736,40.588826,-74.619569,'NJ'],[741,42.353227,-71.615692,'MA'],[744,29.517342,-98.497261,'TX'],[749,40.450933,-80.161369,'PA'],[75,32.873167,-117.211454,'CA'],[757,30.020121,-90.2468,'LA'],[76,42.1236,-80.0813,'PA'],[761,40.726952,-74.03788,'NJ'],[762,34.752222,-92.341224,'AR'],[766,41.827644,-71.418377,'RI'],[767,37.170212,-93.262547,'MO'],[771,42.242778,-87.95,'IL'],[775,26.848806,-80.086026,'FL'],[776,42.912514,-85.589862,'MI'],[777,41.498607,-81.494226,'OH'],[778,33.8625,-118.09333,'CA'],[78,35.928415,-84.036216,'TN'],[785,38.864828,-77.059767,'VA'],[789,41.866826,-71.051096,'MA'],[791,31.818227,-106.544943,'TX'],[792,41.72306,-72.76306,'CT'],[799,34.018243,-84.562143,'GA'],[800,45.447121,-122.782231,'OR'],[812,33.006095,-96.971754,'TX'],[813,37.044573,-76.394418,'VA'],[818,39.164237,-86.494175,'IN'],[819,38.599716,-121.427064,'CA'],[820,41.81137,-72.557173,'CT'],[823,29.98389,-90.15278,'LA'],[831,42.24119,-88.975424,'IL'],[834,40.257001,-74.291149,'NJ'],[835,38.956475,-94.716226,'KS'],[838,40.137992,-88.24366,'IL'],[839,33.747503,-118.013295,'CA'],[840,33.19444,-87.52278,'AL'],[847,39.68139,-75.65417,'DE'],[85,28.066037,-82.570625,'FL'],[850,34.076368,-81.158389,'SC'],[851,28.665497,-81.377448,'FL'],[852,35.839319,-78.675951,'NC'],[855,39.099233,-84.517486,'OH'],[858,35.072285,-78.960733,'NC'],[859,41.762432,-88.206061,'IL'],[86,41.25012,-75.844296,'PA'],[860,39.257471,-94.66304,'MO'],[861,40.186611,-74.88028,'PA'],[862,44.76778,-93.2775,'MN'],[864,38.250173,-85.623739,'KY'],[869,41.897931,-87.624016,'IL'],[87,29.555687,-95.3965,'TX'],[873,42.721058,-84.421802,'MI'],[875,38.648511,-90.5648,'MO'],[879,39.717479,-104.952853,'CO'],[879,39.717479,-104.952853,'CO'],[881,35.522667,-97.543955,'OK'],[882,43.070513,-76.169872,'NY'],[884,40.55667,-74.29889,'NJ'],[885,41.851237,-87.950436,'IL'],[886,36.069767,-80.300896,'NC'],[888,35.082889,-80.879718,'NC'],[889,30.00582,-95.315612,'TX'],[890,-83.306548,42.701962,'MI'],[891,40.957435,-74.069125,'NJ'],[892,42.53694,-83.1111,'MI'],[893,29.78117,-95.54077,'TX'],[895,30.185255,-81.551821,'FL'],[898,40.539203,-80.007386,'PA'],[9,40.222258,-76.932426,'PA'],[90,43.05722,-89.50556,'WI'],[901,39.022421,-77.148452,'MD'],[902,28.553352,-81.342732,'FL'],[903,42.489596,-83.47596,'MI'],[906,25.688815,-80.311513,'FL'],[907,28.449566,-81.400923,'FL'],[908,39.765764,-89.703734,'IL'],[91,43.06395,-88.044369,'WI'],[911,35.151948,-80.827788,'NC'],[913,33.848455,-84.256092,'GA'],[914,39.404491,-76.601512,'MD'],[915,41.842751,-88.005832,'IL'],[917,35.771285,-78.762892,'NC'],[919,40.069205,-76.336708,'PA'],[920,42.909283,-78.75925,'NY'],[921,42.987584,-78.822458,'NY'],[923,34.144442,-118.25592,'CA'],[924,33.37794,-86.810828,'AL'],[925,33.870502,-118.35269,'CA'],[926,42.143424,-70.844189,'MA'],[927,40.92528,-74.27694,'NJ'],[930,25.786706,-80.368618,'FL'],[933,42.221254,-85.589469,'MI'],[934,43.514831,-96.77452,'SD'],[935,33.613176,-117.873814,'CA'],[936,40.776561,-74.353565,'NJ'],[94,29.592901,-98.618066,'TX'],[940,40.630692,-75.48339,'PA'],[941,42.218478,-71.025584,'MA'],[943,42.413795,-83.30133,'MI'],[944,33.923769,-84.338113,'GA'],[949,36.819855,-76.067053,'VA'],[950,37.98394,-87.495694,'IN'],[952,40.343732,-80.056844,'PA'],[953,29.740555,-95.462951,'TX'],[954,45.014392,-93.174632,'MN'],[961,30.474631,-87.211982,'FL'],[964,44.856051,-93.242539,'MN'],[967,31.773435,-106.380734,'TX'],[969,37.30514,-79.961393,'VA'],[97,39.156078,-76.727726,'MD'],[974,42.58028,-83.03028,'MI'],[978,41.231089,-73.224767,'CT'],[98,35.371876,-80.719639,'NC'],[715,41.097260,-74.013283,'NY'],[500,41.975693,-87.86609,'IL'],[876,39.929795,-105.131024,'CO']]
		
		
		/* --------------- INSTANCES --------------- */
		
		return this.each(function() {
		
			var scope			= jQuery(this);
			var timer			= null;
			var geocoder		= undefined;
			var mapObj			= undefined;
			var circleObj		= undefined;
			var markersArray	= [];
			var infowindow		= undefined;
			var Results;
			var lastSearchTerm	= '';
			
			
			/**
			* Initialize
			*/
			var init = function() {
				
				// Checks if App is loadeds and Load/Checks of API is loaded
				if (app && app.maps.loadAPI()) {
				
					Results = new ResultDataObj({
						"success": true,
						"noresults": false,
						"distance": 0,
						"state": '',
						"zip": '',
						"latitude": 0,
						"longitude": 0,
						"stores": settings.data
					});
	
					initializeForm();
					
					initializeMap();
				} else {
					clearTimeout(timer);
					timer = setTimeout(init, 1000);
				}
				
			};
			

			/**
			* Initialize Map
			*/
			var initializeMap = function() {
				
				clearTimeout(timer);
				
				// New Geocoder
				if (geocoder == undefined) {
					geocoder = new google.maps.Geocoder();
				}
				
				if (settings.showMap == true) {
					// New Map
					if (mapObj == undefined) {
						if (jQuery(settings.canvasSelector, scope).length) {
							mapObj = new google.maps.Map(jQuery(settings.canvasSelector, scope)[0], {
								zoom: 3,
								mapTypeId: google.maps.MapTypeId.ROADMAP
							});						
							mapObj.setCenter(new google.maps.LatLng(37.09024, -95.71289));
						}
					}
					
					// New Info Window
					if (infowindow == undefined) {
						infowindow = new google.maps.InfoWindow({
							content: ''
						});
					}
					
					if (circleObj == undefined) {
						circleObj = new google.maps.Circle();
					}
				}
					
				updateMap();
			};
			
			
			/**
			* Clear Map Markers
			*/
			var clearMarkers = function() {
				
				if (settings.showMap == true) {
					for (var i = 0; i < markersArray.length; i++ ) {
						markersArray[i].setMap(null);
						google.maps.event.addListener(markersArray[i], "click", function(){});
					}
					markersArray = [];
					// mapObj.clearOverlays();
				}
			};
			
			
			/**
			* Update Map Markers
			*/
			var updateMap = function() {
				
				// Hours
				var el = jQuery(settings.scrollSelector, scope);
				jQuery('a.store-hours-link', el).unbind('click').click(function(e) {
					e.preventDefault();
					if (jQuery(this).hasClass('open')) {
						jQuery(this).removeClass('open');
						jQuery(this).parent().find('.store-hours-container').hide();
					} else {
						jQuery(this).addClass('open');
						jQuery(this).parent().find('.store-hours-container').show();
					}
				});
				
				if (settings.showMap == true) {
					// Create Markers
					var storeObj, lat, lng, latLng, marker;
					for (var i=0; i<Results.stores.length; i++) {
						lat = Results.stores[i].latitude;
						lng = Results.stores[i].longitude;
						latLng = new google.maps.LatLng(lat, lng);
						marker = new google.maps.Marker({map: mapObj, position: latLng});
						// marker = new google.maps.Marker({position: latLng});
						markersArray.push(marker);
						
						marker.html = __markerHtml(Results.stores[i]);
						marker.rel = Results.stores[i].id;
						// marker.icon = app.URLs.images + 'map/limited-selected.png';
						marker.icon = app.URLs.images + 'map/limited.png';
						marker.shadow = app.URLs.images + 'map/shadow.png';
						marker.shape = {
								coord: [0, 0, 20, 0, 20, 30, 0, 30],
								type: 'poly'
							};
						
						google.maps.event.addListener(marker, 'click', markerClickHandler);
					}
					
					jQuery(settings.linkSelector, scope).unbind('click').click(linkMarkerHandler);
					
					if (markersArray.length == 0) {
						centerUSA();
					} else {
						// Auto Center	
						// autoCenter();
						centerSearch();
					}
				}
			};
			
			
			/**
			* Initialize Form
			*/
			var initializeForm = function() {
				jQuery(settings.submitSelector, scope).click(function(e) {
					e.preventDefault();
					
					var address = jQuery(settings.inputSelector, scope).val();
					if (address.length > 0) {
						__Search(address, 50);
					}
				});
				
				
				// Capture Enter Key on focus.
				jQuery(settings.inputSelector, scope).focus(
					function() {
						$(this).keypress(function(e) {
							if (e.which == 13) {					
								var address = jQuery(settings.inputSelector, scope).val();
								if (address.length > 0) {
									__Search(address, 50);
								}
							}
						});
					}
				);
				// Don't capture Enter Key on blur.
				jQuery(settings.inputSelector, scope).blur(
					function() {
						$(this).unbind('keypress');
					}
				);
				
				// Set Focus
				jQuery(settings.inputSelector, scope).focus();
				
				
				// View Outlets
				jQuery('.view-outlets', scope).click(function(e) {
					// e.preventDefault();
					app.ajax.getJson({
						url			: app.URLs.getStores,
						data		: {
										'zip'		: undefined,
										'state'		: undefined,
										'ids'		: settings.outlets.join('|'),
										'lat'		: 0,
										'lng'		: 0,
										'distance'	: 0,
										'format'	: 'json'
										},
						callback	: function(data) {
							__ParseResults(data);
						}
					});
				});

			};
			
			
			/**
			* Animate Scroll Bars
			*/
			var animateScrollbars = function() {
				var position = jQuery(settings.linkSelector, scope).parents(settings.linkParentSelector).filter('.active').position();
				
				if (position != null) {
					var top = jQuery(settings.scrollSelector, scope).scrollTop();
					var offset = top + position.top;
					
					// jQuery(settings.scrollSelector, scope).animate({scrollTop: offset}, 500, 'easeInOutQuart');
					jQuery(settings.scrollSelector, scope).scrollTop(offset);
				}
			};
			
			
			/**
			* Marker Click Handler
			*/
			var markerClickHandler = function() {
				openMarker(this);
			};
			
			
			/**
			* Link Click Hander (i.e. Name of Store in Store List.)
			*/
			var linkMarkerHandler = function(e) {
				e.preventDefault();
				
				var rel = jQuery(this).attr('rel');
				for (var i=0; i<markersArray.length; i++) {
					if (markersArray[i].rel == rel) {
						openMarker(markersArray[i]);
						break;
					}
				}
			};
			
			
			/**
			* Open a Marker
			*/
			var openMarker = function(marker) {
				var links = jQuery(settings.linkSelector, scope);
				jQuery(links).removeClass('active');
				var active = jQuery(links).filter('[rel='+marker.rel+']').addClass('active');
				var parents = jQuery(links).parents(settings.linkParentSelector)
				jQuery(parents).removeClass('active');
				var activeParent = jQuery(active).parents(settings.linkParentSelector).addClass('active');
		
				// Set the content of the InfoBubble or InfoWindow
				// They both have a function called setContent
				infowindow.setContent(marker.html);
				infowindow.open(mapObj, marker);
				
				mapObj.setZoom(13);
				mapObj.panTo(marker.position);
								
				circleObj.setMap(null);
				
				animateScrollbars();
			};
			
			
			/**
			* Center Map on Markers
			*/
			var autoCenter = function() {
				/*
				var zoomListener = google.maps.event.addListener(mapObj, 'zoom_changed', function() {
					google.maps.event.removeListener(zoomListener);
					
					if (this.getZoom() > 15) { // Change max/min zoom here
						this.setZoom(15);
					}
				});
				*/
				
				if (markersArray.length == 1) {				
					mapObj.setZoom(13);
					mapObj.panTo(markersArray[0].position);
				} else {
					//  Create a new viewpoint bound
					var bounds = new google.maps.LatLngBounds();
					
					//  Go through each...
					for(var i=0; i<markersArray.length; i++) {
						bounds.extend(markersArray[i].position);
					}
					//  Fit these bounds to the map
					mapObj.fitBounds(bounds);
					// mapObj.panToBounds(bounds);
				}
			};
			
			
			/**
			* Center Map on Search Lat/Lng
			*/
			var centerSearch = function() {
				if (Results.distance > 0) {
					var radius = Results.distance * 1609.34; // 100 miles...
					var center = new google.maps.LatLng(Results.latitude, Results.longitude);
					
					circleObj.setMap(null);
					circleObj = new google.maps.Circle({
						radius			: radius,
						center			: center,
						map				: mapObj,
						fillColor		: '#000000',
						fillOpacity		: 0.05,
						strokeColor		: '#000000',
						strokeWeight	: 1,
						strokeOpacity	: 0.35,
						clickable		: false
					});
					mapObj.fitBounds(circleObj.getBounds());
					
				} else {
					autoCenter();
				}
			};
			
			
			/**
			* Center Map on USA
			*/
			var centerUSA = function () {
				mapObj.setCenter(new google.maps.LatLng(37.09024, -95.71289));
				mapObj.setZoom(3);

				/*
				var address = 'USA';
				geocoder.geocode( {'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var center = results[0].geometry.location;
						mapObj.setCenter(center);
						mapObj.setZoom(3.5);
						//var bounds = new google.maps.LatLngBounds();
						//map.fitBounds(bounds);
					} else {

					}
				});
				*/
			};
			
			
			/**
			* Marker HTML
			*
			* Create HTML for map markers.
			*/
			var __markerHtml = function (storeObj) {
				var str = '';
				
				str += '<div class="store-marker">';
					str += '<a class="store-name" href="' + storeObj.url + '">' + storeObj.name + '</a>';
					
					str += '<div class="store-address">';
						str += storeObj.address1 + '<br />';
						str += storeObj.citystatezip + '<br />';
					str += '</div>';
					
					str += '<div class="store-phone">' + storeObj.phone + '</div>';
					str += '<a class="store-directions" href="' + storeObj.link + '" target="_blank">Get Directions</a>';
				str += '</div>';
				
				return str;
			};
			
			
			/* --------------- SEARCH --------------- */
			
			/**
			* Search
			*
			* When the user clicks "Search" (or selects a "Did You Mean" option) this 
			* method Geocodes the results.
			*/
			var __Search = function(address, distance) {
				
				__DoCallback(['__Search', address, distance]);
				
				if (geocoder == undefined) {
					geocoder = new google.maps.Geocoder();
				}
				
				lastSearchTerm = address;
				
				clearMarkers();
				__ShowLoadingAnimation("Searching");
				
				// Do Google search for the address
				geocoder.geocode({'address': address, 'region': 'us'}, function(results, status) {
					/*
					results[]: {
						types[]: string,
						formatted_address: string,
						address_components[]: {
							short_name: string,
							long_name: string,
							types[]: string
						},
						geometry: {
							location: LatLng,
							location_type: GeocoderLocationType
							viewport: LatLngBounds,
							bounds: LatLngBounds
						}
					}
					*/
					
					if (status == google.maps.GeocoderStatus.OK) {
						
						if (results.length == 1) {

							var zip = undefined;
							var state = undefined;
							
							formatted = results[0].formatted_address;
							for (var component in results[0].address_components) {
								var addresscomponent = results[0].address_components[component];
								if (addresscomponent.types && addresscomponent.types[0] == 'postal_code') {
									zip = addresscomponent.short_name;
								} else if (addresscomponent.types && addresscomponent.types[0] == 'administrative_area_level_1') {
									state = addresscomponent.short_name;
								}
							}
														
							var lat = results[0].geometry.location.lat();
							var lng = results[0].geometry.location.lng();
							__ZipSearch(zip, state, lat, lng, distance, formatted);

						} else {
							lastSearchTerm = 'Did You Mean';
							__DidYouMean(results);
						}
					} else {
						__ShowGeocodeError(status);
					}
				});
			};
			
			
			/**
			* Do Callback
			*
			* This is used in the "Find In Store" functionality. Look in ProductController.js
			* for where and how is used.
			*/
			var __DoCallback = function(args) {
				if (settings.callbackScope != undefined && settings.callbackFunction != undefined) {
					var fn = settings.callbackFunction;
					var result = fn.call(settings.callbackScope, args);
				}
			}
			
			
			/**
			* Zip Search
			*
			* 1. Do a distance search against the settings.storeLatLng array.
			* 2. Do AJAX call for store info based on IDs.
			*/
			var __ZipSearch = function(zip, state, lat, lng, distance, formatted) {
				__DoCallback(['__ZipSearch', zip, state, lat, lng, distance]);
				
				// Calculate Distances
				var distanceArr = [];
				for (var i=0; i<settings.storeLatLng.length; i++) {
					distanceArr.push([ settings.storeLatLng[i][0], __GetDistance(lat, lng, settings.storeLatLng[i][1], settings.storeLatLng[i][2]), settings.storeLatLng[i][3] ]);
				}
				distanceArr.sort(function(a,b) {
					return (a[1]) - (b[1]);
				});
				
				// Distance or State
				var idArr = [];
				for (var i=0; i<distanceArr.length; i++) {
					// settings.includeStateStores
					
					if (distanceArr[i][1] < distance) {
						idArr.push(distanceArr[i][0]);
					} else if (settings.includeStateStores == true && distanceArr[i][2] == state) {
						idArr.push(distanceArr[i][0]);
					}
				}
				
				// Get Store Data
				if (idArr.length == 0) {
					__ShowNoStores(distance, formatted);
				} else {
					app.ajax.getJson({
						url			: app.URLs.getStores,
						data		: {
										'zip'		: zip,
										'state'		: state,
										'ids'		: idArr.join('|'),
										'lat'		: lat,
										'lng'		: lng,
										'distance'	: distance,
										'format'	: 'json'
										},
						callback	: function(data) {
							__ParseResults(data);
						}
					});
				}
			};
			
			
			/**
			* Parse Results
			*
			* Handle results from "app.URLs.getStores" call. Results will be a list of
			* stores and the query data.
			*/
			var __ParseResults = function(data) {
				__DoCallback(['__ParseResults']);
				
				if (!data || data.success == false || data.Success == false) {
					__ShowError();
					return;
				}
				
				Results = new ResultDataObj(data);
				
				if (Results.noresults == true || Results.stores.length == 0) {
					__ShowNoStores();
				} else {
					__ShowStoreList();
					
					if (app.isFindInStore === undefined || !app.isFindInStore) //don't fire tagging for Find In Store
					{	
						s.prop17 = lastSearchTerm;
						var s_code=s.t();
						if(s_code) {
							document.write(s_code);
						}
					}
					app.isFindInStore = false;
					
					
				}
			};
			
			
			/**
			* Did You Mean
			*
			* If more than one Geocode results is returned, display a list of the
			* results and prompt the user to select one.
			*/
			var __DidYouMean = function(results) {
				__DoCallback(['__DidYouMean', results]);
			
				var str = '';
				str += '<div class="result-message">Did you mean?</div>';
				str += '<ul class="suggestions-list">';
				str += '</ul>';
				
				var el = jQuery(settings.scrollSelector, scope);
				jQuery(el).empty().append(str);
				
				var city, state, zip, term;
				for (var i=0; i<results.length; i++) {
					city = undefined;
					state = undefined;
					zip = undefined;
					term = undefined;
					
					for (var component in results[i].address_components) {
						var addresscomponent = results[i].address_components[component];
						if (addresscomponent.types && addresscomponent.types[0] == 'postal_code') {
							zip = addresscomponent.short_name;
						} else if (addresscomponent.types && addresscomponent.types[0] == 'administrative_area_level_1') {
							state = addresscomponent.short_name;
						} else if (addresscomponent.types && addresscomponent.types[0] == 'locality') {
							city = addresscomponent.short_name;
						}
					}
					
					if (zip != undefined) {
						term = zip;
					} else if (state != undefined) {
						if (city != undefined) {
							term = city + ', ' + state;
						} else {
							term = state;
						}
					} else {
						continue;
					}
					
					jQuery('.suggestions-list', el).append('<li>' + results[i].formatted_address + '</li>');
					jQuery('.suggestions-list li:last', el).bind('click', {'scope': this, 'term': term}, __DidYouMeanHandler);
				}
			};
			
			
			/**
			* Did You Mean Handler
			*
			* Handler the click and search again.
			*/
			var __DidYouMeanHandler = function(e) {
				e.preventDefault();
				
				// var scope = e.data.scope;
				var address = e.data.term;
				// var distance = 100;
				
				jQuery(settings.inputSelector, scope).val(address);

				var address = jQuery(settings.inputSelector, scope).val();
				if (address.length > 0) {
					__Search(address, 50);
				}
			};
			
			
			/* --------------- HTML --------------- */
			
			
			/**
			* Show Loading Animation
			*
			* Display "Searching" message with animated icon.
			*/
			function __ShowLoadingAnimation(msg) {
				var str = '';
				str += '<div class="result-container"><div class="loading">' + msg + '</div></div>';
				jQuery(settings.scrollSelector, scope).empty().append(str);
			}
			
			
			/**
			* Show Geocode Error
			*
			* Display ZERO_RESULTS or other Geocoding error.
			*/
			function __ShowGeocodeError(status) {
				__DoCallback(['__ShowGeocodeError', status]);
				
				if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
					var str = '';
					str += '<div class="result-message">Where is that?</div>';
					str += '<div class="message">';
					str += 'The address you entered could not be found.<br /><br />Please try again.';
					str += '</div>';
					jQuery(settings.scrollSelector, scope).empty().append(str);
				} else {
					var str = '';
					str += '<div class="result-message">Search Error</div>';
					str += '<div class="message">';
					str += 'Please try again.<br /><br />';
					str += status;
					str += '</div>';
					jQuery(settings.scrollSelector, scope).empty().append(str);
				}
			}
			
			
			/**
			* Show Error
			*
			* Display "Communication Error" message.
			*/
			function __ShowError() {
				__DoCallback(['__ShowError']);
				
				var str = '';
				str += '<div class="result-message">Communication Error</div>';
				str += '<div class="message">';
				str += 'Please try again.';
				str += '</div>';
				jQuery(settings.scrollSelector, scope).empty().append(str);
			}
			
			
			/**
			* Show No Stores
			*
			* Display "No Store Found" message.
			*/
			function __ShowNoStores(distance, formatted) {
				__DoCallback(['__ShowNoStores']);
				
				var str = '';
				if (formatted == undefined) {
					str += '<div class="result-message">No Stores Found</div>';
					str += '<div class="message">';
					str += 'Please try again.';
					str += '</div>';
				} else {
					str += '<div class="result-message">No Stores Found</div>';
					str += '<div class="message">';
					str += 'No store found in ' + distance + ' miles of "' + formatted + '". Please try again.';
					str += '</div>';				
				}
				jQuery(settings.scrollSelector, scope).empty().append(str);
			}
			
			
			/* --------------- STORE LIST --------------- */
			
    		/**
    		* Show Store List
    		*
    		* Populate the list of stores from search result data.
    		*/
			function __ShowStoreList() {
				__DoCallback(['__ShowStoreList', Results]);
				
				var str = '';
				
				str += '<div class="result-message">' + Results.stores.length + ' stores found</div>';
				str += '<ul class="results-list">';
				str += '</ul>';
				
				var el = jQuery(settings.scrollSelector, scope);
				jQuery(el).empty().append(str);
				
				var storeObj;
				for (var i=0; i<Results.stores.length; i++) {
					storeObj = Results.stores[i];
					str = '';
					str += __StoreItemHTML(storeObj, 'list');
					jQuery('.results-list', el).append(str);
				}
				
				updateMap();
			}
			
			
    		/**
    		* Store Item HTML
    		*
    		* Return HTML for a Store Listing.
    		*/
			function __StoreItemHTML(storeObj, display) {
				var str = '';
				
				if (display == 'list') {
					str += '<li>';
				}
				str += '<div class="store-listing">';

					str += '<a class="store-name" rel="' + storeObj.id + '" href="' + storeObj.url + '">' + storeObj.name + '</a>';
					if (storeObj.distance != undefined) {
						str += '<span class="store-distance">' + storeObj.distance + ' mi</span>';
					}
					
					str += '<div class="clear"></div>';
					
					str += '<div class="store-details-container">';
					
						str += '<div class="store-address">';
							str += '<span>';
								str += storeObj.address1;
								if (storeObj.address2 != "") {
									str += '<br />' + storeObj.address2;
								}
							str += '</span><br/>';
							str += storeObj.citystatezip;
						str += '</div>';
							
						str += '<span class="store-phone">' + storeObj.phone + '</span>';
						
						str += '<a class="store-hours-link" href="#">View Hours</a>';
							
						str += storeObj.hours;
						
					str += '</div>';
					
				str += '</div>';
				if (display == 'list') {
					str += '</li>';
				}
				
				return str;
			}
			
			
			/* --------------- UTILITY --------------- */

    		/**
    		* Get Distance
    		*/
			var __GetDistance = function(lat1, lng1, lat2, lng2) {
				var R = 6371; // km
				var toRad = Math.PI / 180;
				
				var dLat = ((lat2-lat1) * toRad) / 2;
				var dLon = ((lng2-lng1) * toRad) / 2;
				var lat1 = lat1 * toRad;
				var lat2 = lat2 * toRad;
				
				var a = Math.sin(dLat) * Math.sin(dLat) + Math.sin(dLon) * Math.sin(dLon) * Math.cos(lat1) * Math.cos(lat2); 
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
				var d = R * c;
				
				var miles = d / 1.609344;
				return miles;
			};
			
			
			/* --------------- DATA OBJECTS --------------- */
			
		
			/*
			* Result Data Object
			*/
			var ResultDataObj = function(data) {
				this.noresults				= data.noresults;
				
				// Search Query
				this.distance				= data.distance;
				this.state					= data.state;
				this.zip					= data.zip;
				this.latitude				= parseFloat(data.latitude);
				this.longitude				= parseFloat(data.longitude);
				this.stores					= [];
				
				if (this.noresults == false) {
					for (var i=0; i<data.stores.length; i++) {
						this.stores.push(new StoreDataObj(data.stores[i], this.latitude, this.longitude));
					}
					this.stores.sort(function(a,b) {
						return (a.distance) - (b.distance);
					});
				}
			};
			
		
			/*
			* Store Data Object
			*/
			var StoreDataObj = function (data, lat, lng) {
				this.id						= data.id;
				this.url					= data.url;
				this.outlet					= data.outlet;
				this.name					= data.name;
				this.address1				= data.address1;
				this.address2				= data.address2;
				this.citystatezip			= data.citystatezip;
				/*
				this.city					= data.city;
				this.stateCode				= data.stateCode;
				this.postalCode				= data.postalCode;
				this.countryCode			= data.countryCode;
				*/
				this.phone					= data.phone;
				this.latitude				= parseFloat(data.latitude);
				this.longitude				= parseFloat(data.longitude);
				this.link					= data.link;
				this.hours					= data.hours;
				
				if (lat == 0 && lng == 0) {
					this.distance			= undefined;
				} else {
					this.distance			= __GetDistance(lat, lng, this.latitude, this.longitude).toFixed(2);
				}
				
				var str = '';	
				str += '<div class="info-window">';
					str += '<p class="info-title">';
						str += '<span class="info-name">' + this.name + '</span>';
						str += '<span class="info-distance" rel="' + this.id + '">' + this.distance + ' miles </span>';
					str += '</p>';
					str += '<div class="clear"></div>';
					str += '<p class="info-address">';
						str += this.address1 + '<br />';
						if (this.address2 != "") {
							str += this.address2 + '<br />';
						}
						str += this.city + ', ' + this.stateCode + ' ' + this.postalCode;
					str += '</p>';
					str += '<p class="info-phone">' + this.phone + '</p>';
					str += '<p>';
						str += '<a class="get-directions-link" href="' + this.link + '" target="_blank">Get Directions</a>';
					str += '</p>';
					str += '<div class="clear"></div>';
				str += '</div>';
				
				this.html					= str;
			};
			init();
				
		});
	}
	
		
	jQuery(document).ready(function() {
	
		/* --------------- INITIALIZE HEADER STORE LOCATOR --------------- */
	
		jQuery('#store-locator-link a').click(function(e) {
			e.preventDefault();
				
			if (jQuery("#LocatorDialog").length == 0) {
				jQuery(document.body).append("<div id=\"LocatorDialog\"></div>");
			} else {
				jQuery("#LocatorDialog").empty();
			}
			
			if (jQuery('#locator').length == 0) {
				var str = '';
				str += '<div id="locator">';
					str += '<div id="locator-bottom">';
						str += '<a href="#" class="close">Close</a>';
						str += '<a href="' + jQuery('#store-locator-link a').attr('href') + '" class="find-more">Find More Stores</a>';
						str += '<div class="clear"></div>';
					str += '</div>';
					str += '<div id="store-overlay">';
						str += '<div id="store-overlay-left">';
						
							str += '<div id="store-overlay-form" class="form-container">';
								str += '<div class="locator-store-form">';
									str += '<label>Please enter a City, State or ZIP code:</label>';
									str += '<span class="input-wrapper">';
										str += '<input class="text-box locator-store-search" name="q" type="text" />';
										str += '<a class="link-button locator-store-submit" href="' + app.URLs.getStores + '">';
											str += '<span>Search</span>';
										str += '</a>';
										str += '<div class="clear"></div>';
									str += '</span>';
									str += '<div class="view-outlets">View Outlet Stores</div>';
									
								str += '</div>';
							str += '</div>';
	
							str += '<div id="store-overlay-listing">';
							str += '</div>';
						str += '</div>';
	
						str += '<div id="store-overlay-map">';
							str += '<div id="store-overlay-canvas">';
							str += '</div>';
						str += '</div>';
						str += '<div class="clear"></div>';
					str += '</div>';
				str += '</div>';

				jQuery('#store-locator-link').addClass('active');
				
				jQuery("#LocatorDialog").append(str);
									
				jQuery("#LocatorDialog").dialog({
					// bgiframe: true,
					autoOpen: true,
					modal: true,
					overlay: {
						opacity: 0.5,
						background: "black"
					},
					width: 'auto',
					minWidth: 708,
					maxWidth: 1200,
					minHeight: 600,
					fluid: true,
					resizable: false,
					draggable: false,
					dialogClass: 'locatordialog'
				});
				
				jQuery('.ui-widget-overlay').last().unbind('click').bind('click', function(e) {
					e.preventDefault();
					jQuery(this).next('.ui-dialog').first().find('.ui-dialog-titlebar-close').trigger('click');
				});
				
				var options = {
					'data'					: [],
					'showMap'				: true,
					'canvasSelector'		: '#store-overlay-canvas',
					'scrollSelector'		: '#store-overlay-listing',
					'linkSelector'			: '#store-overlay-listing li a.store-name',
					'linkParentSelector'	: '.store-listing',
					'formSelector'			: '.locator-store-form',
					'inputSelector'			: '.locator-store-search',
					'submitSelector'		: '.locator-store-submit'
				}
				jQuery('#locator').StoreMap(options);
				
				jQuery('#locator .close').click(function(e) {
					e.preventDefault();
					jQuery('#store-locator-link').removeClass('active');
					jQuery('#header #locator').remove();
				});
				
				s.pageName="Store Locator: Mini Store Locator";
				s.channel="Store Locator";
				s.prop1="Store Locator: Mini Store Locator";
				s.prop2="Store Locator: Mini Store Locator";
				s.prop3="Store Locator: Mini Store Locator";
				s.prop4="Store Locator";
				s.events = "";
				s.products = "";
				var s_code=s.t();
				if(s_code) {
					document.write(s_code);
				}
			} else {
				jQuery('#store-locator-link').removeClass('active');
				jQuery('#header #locator').remove();			
			}
		});
	});	
})(jQuery);


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SEARCHSUGGEST.JS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */
(function(app){
	if (app) {
		// add searchsuggest to namespace
		app.searchsuggest = {
			// configuration parameters and required object instances
			acListTotal   :  0,
			acListCurrent : -1,
			acDelay       : 300,
			acURL         : null,
			acFormId      : null,
			acSearchId	  : null,
			acResultsId	  : null,
			acSearchField : null,
			acResultsDiv  : null,
			fieldDefault  : null,
			suggestionsJson: null,
			
			init : function(formId, fieldId, fieldDefault, resultsId, url) {
				// initialize vars
				app.searchsuggest.acFormId = "#" + formId;
				app.searchsuggest.acSearchId = "#" + fieldId;
				app.searchsuggest.acResultsId = "#" + resultsId;
				app.searchsuggest.acURL = url;
				app.searchsuggest.fieldDefault = fieldDefault;
				
				// disable browser auto comlete
				app.util.disableAutoComplete(fieldId);
				
				// create the results div
				jQuery("#site-search").append("<div id=\"" + resultsId + "\"></div>");
			
				// register mostly used vars (jQuery object)
				app.searchsuggest.acSearchField = jQuery(app.searchsuggest.acSearchId);
				app.searchsuggest.acResultsDiv = jQuery(app.searchsuggest.acResultsId);
			
				// reposition div
				app.searchsuggest.repositionResultsDiv();
			
				// on blur listener
				// app.searchsuggest.acSearchField.blur(function(){ setTimeout("app.searchsuggest.clear()", 200) });
			
				// on key up listener
				app.searchsuggest.acSearchField.keyup(function(e) {
					// get keyCode (window.event is for IE)
					var keyCode = e.keyCode || window.event.keyCode;
					var lastVal = app.searchsuggest.acSearchField.val();
					// check an treat up and down arrows
					if(app.searchsuggest.updownArrow(keyCode)){
						return;
					}
					// check for an ENTER or ESC
					if(keyCode == 13 || keyCode == 27) {
						app.searchsuggest.clear();
						return;
					}
					
					// if is text, call with delay
					setTimeout(function() { app.searchsuggest.suggest(lastVal) }, app.searchsuggest.acDelay);
				});
				
				// on focus listener (clear default value)
				app.searchsuggest.acSearchField.focus(function() {
					var val = app.searchsuggest.acSearchField.val();
					if(val == app.searchsuggest.fieldDefault)
					{
						app.searchsuggest.acSearchField.val("");
					}
				});
				
				// on submit we do not submit the form, but change the window location
				// in order to avoid https to http warnings in the browser
				// only if it's not the default value and it's not empty
				jQuery(app.searchsuggest.acFormId).submit(function() {
					var searchUrl = jQuery(app.searchsuggest.acFormId).attr("action");
					var searchTerm = app.searchsuggest.acSearchField.val();		
					if (searchTerm != app.searchsuggest.fieldDefault && searchTerm != '') {
						window.location = app.util.appendParamToURL(searchUrl, "q", searchTerm);
					}
					return false;					
				});
			},
			
			// trigger suggest action
			suggest : function(lastValue)
			{
				// get the field value
				var part = app.searchsuggest.acSearchField.val();
			
				// if it's empty clear the resuts box and return
				if(part == "") {
					app.searchsuggest.clear();
					return;
				}
			
				// if it's equal the value from the time of the call, allow
				if(lastValue != part) {
					return;
				}
				
				// build the request url
				var reqUrl = app.util.appendParamToURL(app.searchsuggest.acURL, "q", part);
				
				// get remote data as JSON
				jQuery.getJSON(reqUrl, function(json) {
					// get the total of results
					var ansLength = app.searchsuggest.acListTotal = json.suggestions.length;
			
					// if there are results populate the results div
					if(ansLength > 0) {
			
						var newData = "";
						// create a div for each result
						for(i=0; i < ansLength; i++) {
							newData += "<div class=\"unselected\"><div class=\"suggestionterm\">" + json.suggestions[i].suggestion + "</div>";
							newData += "<span class=\"hits\">(" + json.suggestions[i].hits + ")</span></div>";
						}
						
						app.searchsuggest.suggestionsJson = json.suggestions;
						
						// update the results div
						app.searchsuggest.acResultsDiv.html(newData);
						app.searchsuggest.acResultsDiv.css("display","block");
						// reposition in case user resizes browser between searches
						app.searchsuggest.repositionResultsDiv();
						
						// for all divs in results
						var divs = jQuery(app.searchsuggest.acResultsId + " > div");
						
						// on mouse over clean previous selected and set a new one
						divs.mouseover( function() {
							divs.each(function(){ this.className = "unselected"; });
							this.className = "selected";
						});
						
						// on click copy suggestion to search field, hide the list and submit the search
						divs.each(function(i){
							jQuery(this).click( function() {
								app.searchsuggest.acSearchField.val(app.searchsuggest.suggestionsJson[i].suggestion);
								app.searchsuggest.clear();
								jQuery(app.searchsuggest.acFormId).submit();
							})
						});
					} else {
						app.searchsuggest.clear();
					}
				});
			},
			
			// clear suggestions
			clear : function()
			{
				app.searchsuggest.acResultsDiv.html("");
				app.searchsuggest.acResultsDiv.css("display","none");
			},
			
			// reposition the results div accordingly to the search field
			repositionResultsDiv : function() {
				// get the input position
				var inPos = app.searchsuggest.acSearchField.offset();	
				var inPosLeft = jQuery(".sitesearch").position();
				var inTop = inPos.top;
				var inLeft = inPosLeft.left;
				
				// get the field size
				var inHeight = app.searchsuggest.acSearchField.height();
				var inWidth = app.searchsuggest.acSearchField.width();
				
				// apply the css styles
				app.searchsuggest.acResultsDiv.addClass("suggestions");
				// app.searchsuggest.acResultsDiv.css("position","absolute");
				// app.searchsuggest.acResultsDiv.css("left", inLeft-4); // to tweak
				// app.searchsuggest.acResultsDiv.css("top", inTop + inHeight -31);
				// app.searchsuggest.acResultsDiv.css("width", inWidth - 2); // to tweak
				// app.searchsuggest.acResultsDiv.css("z-index", "7777");
			},
			
			// treat up and down key strokes defining the next selected element
			updownArrow : function(keyCode) {
				if(keyCode == 40 || keyCode == 38) {
					if(keyCode == 38) { // keyUp
						if(app.searchsuggest.acListCurrent == 0 || app.searchsuggest.acListCurrent == -1) {
							app.searchsuggest.acListCurrent = app.searchsuggest.acListTotal-1;
						} else {
							app.searchsuggest.acListCurrent--;
						}
					} else { // keyDown
						if(app.searchsuggest.acListCurrent == app.searchsuggest.acListTotal-1) {
							app.searchsuggest.acListCurrent = 0;
						} else {
							app.searchsuggest.acListCurrent++;
						}
					}
					
					// loop through each result div applying the correct style
					app.searchsuggest.acResultsDiv.children().each(function(i) {
						if(i == app.searchsuggest.acListCurrent) {
							app.searchsuggest.acSearchField.val(app.searchsuggest.suggestionsJson[i].suggestion);
							this.className = "selected";
						} else {
							this.className = "unselected";
						}
					});
					return true;
				} else {
					// reset
					app.searchsuggest.acListCurrent = -1;
					return false;
				}
			}
		} // end searchsuggest
	} else {
		// namespace has not been defined yet
		alert("app namespace is not loaded yet!");
	}
})(app);


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SCRIPTS.JS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */
var CustomError = {
	init : function() {
		$("form input").blur(function() {
			if ($(this).hasClass("required") && $(this).hasClass("errorclient")) {
				$(this).parent().addClass('errorbox');
			}
		});
		
		$('form input').each(function() {
			$span = $(this).next();
			if ( ($span.attr('tagName')=="SPAN") && ($span.hasClass("errormessage")) ) {				
				$span.parent().addClass('errorbox');
			}
			
			$span = $(this).next().next();
			if ( ($span.attr('tagName')=="SPAN") && ($span.hasClass("errormessage")) ) {				
				$span.parent().addClass('errorbox');
			}
		 });
		
		$('div.value').each(function() {
			$span = $(this).next();
			if ( ($span.attr('tagName')=="SPAN") && ($span.hasClass("errormessageserverside")) ) {
				$span.prev().addClass('errorbox');
			}
		 });
	}
};


var GlobalTopNavigation = {
	init : function() {
		$('ul#main-menu ul').css('display', 'none');
		$('ul#main-menu ul').prev('a,span').addClass('dir');
		$('ul#main-menu li').hover(
			function() { // show its submenu
				$(this).addClass('open');
				$('ul', this).fadeIn(125);
			},
			function() { // hide its submenu
				$(this).removeClass('open');
				$('ul', this).stop(true,true).fadeOut(125);
			}
		);

		if (app.util.isiPad() == true) {
			$('ul#main-menu li ul.sub-panel li').append('<div class="clear"></div><div class="closemenu">Close</div>');
		}
		
		$('ul#main-menu li .closemenu').click(
			function(e) { // hide its submenu
				e.preventDefault();
				jQuery(this).parents('li').first().removeClass('open');
				jQuery(this).parents('ul').first().stop(true,true).fadeOut(125);
			}
		);
		
		var rel;
		if (typeof topNavHighlightRel !== "undefined" && topNavHighlightRel) {
			rel = topNavHighlightRel;
			$('ul#main-menu li a[rel="'+rel+'"],ul#main-menu li span[rel="'+rel+'"]').addClass('selected').parent('li').addClass('selected');
		}
		
		if (typeof navHighlightRelArray !== "undefined" && navHighlightRelArray.length) {
			for (var i=0; i<navHighlightRelArray.length; i++) {
				rel = navHighlightRelArray[i];
				$('ul#main-menu ul.sub-panel li a[rel="'+rel+'"]').addClass('selected');
			}
		}
		
		if (typeof pageHighlightRel !== "undefined" && pageHighlightRel) {
			rel = pageHighlightRel;
			$('#nav-pages li a[rel="'+rel+'"]').addClass('selected').parent('li').addClass('current');
		}
		
		var url = $('#nav-pages li.current a').attr('href');
		if (url != undefined) {
			$('#nav-pages li a[href="'+url+'"]').addClass('current');
		}
	}
};


var AccountNavigation = {
	init : function() {
		$('#account-nav .link-my-account').on('click', function(e) {
			e.preventDefault();
			if ($('#account-nav .my-account-popup').hasClass('open')) {
				$(this).parent('li').removeClass('active');
				$('#account-nav .my-account-popup').removeClass('open').hide();
			} else {
				$(this).parent('li').addClass('active');
				$('#account-nav .my-account-popup').addClass('open').show();
			}
		});
		$('#account-nav .my-account-close').on('click', function(e) {
			e.preventDefault();
			if ($('#account-nav .my-account-popup').hasClass('open')) {
				$(this).parent('li').removeClass('active');
				$('#account-nav .my-account-popup').removeClass('open').hide();
			}
		});
	}
};


var GlobalCategoryNavigation = {
	isOpen : false,
	
	init : function() {
		if ($('#sidebar-wrapper, #sidebar-wrapper-cs').length == 0) {
			$('#sidebar-widget').hide();
		} else {
			$('#sidebar-widget').click(function(e) {
				// Using classes instead of manipulating css values.
				if ($('#sidebar-widget').hasClass('open')) {
					// $('#sidebar-wrapper, #sidebar-wrapper-cs').addClass('closed');
					$('#sidebar-wrapper, #sidebar-wrapper-cs').removeClass('open');
					GlobalCategoryNavigation.isOpen = false;
					$('#sidebar-widget').removeClass('open');
				} else {
					// $('#sidebar-wrapper, #sidebar-wrapper-cs').removeClass('closed');
					$('#sidebar-wrapper, #sidebar-wrapper-cs').addClass('open');
					GlobalCategoryNavigation.isOpen = true;
					$('#sidebar-widget').addClass('open');
				}
			});
		
			if ($('#page-container').length) {
				$(window).resize(function() {
					if (GlobalCategoryNavigation.isOpen == true) {
						if ($('#page-container').width() > 768) {
							// $('#sidebar-wrapper, #sidebar-wrapper-cs').removeClass('closed'); // back to default
							$('#sidebar-wrapper, #sidebar-wrapper-cs').removeClass('open'); // back to default
							GlobalCategoryNavigation.isOpen = false;
							$('#sidebar-widget').removeClass('open');
						}
					}
				});
			}
		}
	}
};


var InputFieldHint = {
	init : function() {
		$('input.hint').each(function(i,e) {
			// Store default string
			jQuery.data(this, 'hint', $(this).val());
		});
		$('input.hint').focus(function(e) {
			if ($(this).val() == jQuery.data(this, 'hint')) {
				// Clear hint
				$(this).val('');
			}
		});
		$('input.hint').blur(function(e) {
			if ($(this).val() == '') {
				// Restore hint
				$(this).val(jQuery.data(this, 'hint'));
			}
		});
	}
};


var SizeChart = {
	sizeChartArray : ['tops', 'pants', 'denim', 'dresses', 'jackets', 'accessories'],
	
	init : function() {
		// Default category at bottom...
		if (jQuery('.schelper').length) {
			jQuery("#footer .size-chart-link").attr('href', jQuery('.schelper').html());
		}

		jQuery(".size-chart-link").unbind("click").click(SizeChart.open);
	},
	
	open : function(e) {
		e.preventDefault();
		
		if (jQuery("#sizeChartDialog").length == 0) {
			jQuery("<div/>").attr("id", "sizeChartDialog").appendTo(document.body);
		
			jQuery('#sizeChartDialog').dialog({
				modal: true,
				overlay: {
					opacity: 0.5,
					background: "black"
				},
				/*
				height: 'auto',
				minHeight: '345',
				width: 860,
				*/
				width: 'auto',
				// height: 600,
				minWidth: 708,
				maxWidth: 1200,
				minHeight: 600,
				fluid: true,
				resizable: false
			});
			
			var href = jQuery(this).attr('href');
			
			jQuery('#sizeChartDialog').dialog('open');
				
			// make the server call to load the size chart html
			jQuery('#sizeChartDialog').load(this.href, function(e){
				SizeChart.updateTabs(href);
			});
		} else {
			jQuery('#sizeChartDialog').dialog('open');
			SizeChart.updateTabs(jQuery(this).attr('href'));
		}

		jQuery(".ui-widget-overlay").last().unbind("click").bind("click", function(e) {
			e.preventDefault();
			jQuery(this).next('.ui-dialog').first().find('.ui-dialog-titlebar-close').trigger('click');
		});

		return false;	
	},
	
	updateTabs : function(href) {
		var obj = app.util.getParamsFromURL(href);
		var activeTabIndex = SizeChart.sizeChartArray.indexOf(obj.cid);
		jQuery('#sizeChartDialog .size-chart').tabs('option', 'active', activeTabIndex);
		var activePanelIndex = 0;
		if (obj.sizeType == 'Petite') {
			activePanelIndex = 1;
		}
		if (obj.sizeType == 'Tall') {
			activePanelIndex = 2;
		}
		jQuery('#sizeChartDialog .size-chart .charts .accordion:visible').accordion('option', 'active', activePanelIndex)
	}
};


var UberTagging = {
	init : function() {
		var selector = '#nav-category li a.sale';
		var url = jQuery(selector).attr('href');
		if (url != undefined) {
			url = app.util.appendParamToURL(url, 'ubtp', 'sale');
			jQuery(selector).attr('href', url);
		}
	}
};


var ResizeInfo = {
	init : function() {
		jQuery('body').append('<div id="screen-info"></div><div id="resize-info"></div>');
		jQuery(window).resize(function() {
			jQuery('#resize-info').text((jQuery(window).width()) + ' wide x ' + (jQuery(window).height()) + ' tall');
		});
	}
};


// application initialization on dom ready
jQuery(document).ready(function(){
	app.init();
	CustomError.init();
	GlobalTopNavigation.init();
	GlobalCategoryNavigation.init();
	AccountNavigation.init();
	InputFieldHint.init();
	SizeChart.init();
	UberTagging.init();
	// ResizeInfo.init();
});