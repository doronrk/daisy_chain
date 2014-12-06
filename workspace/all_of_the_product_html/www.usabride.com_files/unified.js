/* --- vspfiles/templates/usabrideBL/js/continue_shopping.js --- */ 
/*--------------------------------------------------------------------------*
 * 
 * Copyright (C) 2008 Brand Labs LLC
 * 
 * Continue shopping which uses the referrer to redirect to
 * 
 * Version 1.0.2
 * 
 *--------------------------------------------------------------------------*/

function continueShopping(){var aa=null;var ba=null;var ca='/';var da=window.location.pathname;var ea=window.location.host;var fa=null;var ga;if(document.referrer){aa=document.referrer;}
try{fa=getProductHistoryURL();}
catch(e){fa=null;}
ca=(fa==null?ca:fa);if(aa==null||aa==''){window.location.href=ca;return;}
try{ga=aa.indexOf(ea);if(ga==-1){window.location.href=ca;return;}
ba=aa.substring((ga+ea.length));if(ba.toLowerCase().indexOf(da.toLowerCase())==0){window.location.href=ca;return;}
window.location.href=ba;return;}
catch(e){window.location.href=ca;return;}}
function getProductHistoryURL(){var ha='%2FHistory';var ia=null;var ja=null;var ka=null;var la=null;if(!document.cookie||document.cookie==null){return null;}
ia=document.cookie.split(';');for(index=0;index<ia.length;index++){ja=ia[index];while(ja.charAt(0)==' '){ja=ja.substring(1,ja.length);}
if(ja.indexOf(ha+'=')==0){ka=ja.substring(ha.length+1);if(ka==null||ka==''){return null;}
la=ka.split('%2C');return '/ProductDetails.asp?ProductCode='+la[0];}}
return null;}
/* --- vspfiles/templates/usabrideBL/js/header_cart_summary.js --- */ 
/*--------------------------------------------------------------------------*
 * 
 * Copyright (C) 2008 Brand Labs LLC
 * 
 *--------------------------------------------------------------------------*/
/**
 * Update header with cart items
 */
function updateHeaderCartSummary() {
	var element;
	var items;
	var output;
	
	element = document.getElementById('view_cart_text_right');
	
	if(element == null) {
		return;
	}
	
	items = getShoppingCartItems();
	total = getShoppingCartTotal();
	
	//No items or null
	if(isShoppingCartEmpty()) {
		output = '(0) <b>$0.00</b>';
	}
	else if (items == null || total == null) {
		return;
	}
	else if(items == 0) {
		output = '(0) <b>$0.00</b>';
	}
	else {
		//Create string
		output = items;
		/*output = items + ' Item';
		if (items > 1) {
			output = output + 's';
		}*/
		output = '(' + output + ') <b>' + total + '</b>';
	}
	
	//Put data into field
	element.innerHTML = output;
}
/* --- vspfiles/templates/usabrideBL/js/shopping_cart_summary.js --- */ 
/*--------------------------------------------------------------------------*
 * 
 * Copyright (C) 2008 Brand Labs LLC
 * 
 * Shopping Cart Summary
 * 
 * Version 1.2.1
 * 
 *--------------------------------------------------------------------------*/

function getShoppingCartSummary(){var aa;var ba;aa=document.getElementById('display_cart_summary');if(aa==null){return null;}
return aa.innerHTML;}
function isShoppingCartEmpty(){var ca;ca=getShoppingCartSummary();if(ca==null){return null;}
if(ca.search('(Your shopping cart is empty)')!=-1){return true;}
return false;}
function getShoppingCartItems(){var da;var ea;da=getShoppingCartSummary();if(da==null){return null;}
ea=da.match(/\d+/);if(ea==null){return null;}
return ea[0];}
function getShoppingCartTotal(){var fa;var ga;var ha;var ia;fa=getShoppingCartSummary();if(fa==null){return null;}
ga=fa.match(/total\scost\sof\s.*\)/);ha=fa.match(/priced\sat\s.*\)/);if(ga==null&&ha==null){return null;}
if(ga!=null){if(ga[0]==null||ga[0].length<=15){return null;}
ia=ga[0].substr(14,ga[0].length-15);}
else{if(ha[0]==null||ha[0].length<=11){return null;}
ia=ha[0].substr(10,ha[0].length-11);}
return ia;}
/* --- vspfiles/templates/usabrideBL/js/input_text_default_temporary.js --- */ 
/*--------------------------------------------------------------------------*
 * 
 * Copyright (C) 2008 Brand Labs LLC
 * 
 * Default value temporary for user
 * 
 * Version 1.0.1
 * 
 *--------------------------------------------------------------------------*/

function inputTextClicked(aa,ba){if(aa.value==aa.defaultValue){aa.value='';aa.style.color=ba;}}
function inputTextBlurred(ca,da){if(ca.value!=''){return;}
ca.style.color=da;ca.value=ca.defaultValue;}
/* --- vspfiles/templates/usabrideBL/js/navmenu.js --- */ 
/*--------------------------------------------------------------------------*
 * 
 * Copyright (C) 2009 Brand Labs LLC
 * 
 * Nav Menu Popup Fix for ie6, now with more jQuery
 * 
 * Version 1.0.1 
 * 
 *--------------------------------------------------------------------------*/

(function($){
  $(document).ready(function(){
    $('#top_nav li').hover(function(){
      $(this).addClass('over');},
    function(){
      $(this).removeClass('over');
    });
  });
})(jQuery);
/* --- cdev/lib/app.js --- */ 
/*--------------------------------------------------------------------------*
 * 
 * Woodward
 * 
 * Version 2.1.1
 * 
 * Copyright (C) 2012 Brand Labs LLC
 * 
 *--------------------------------------------------------------------------*/

//Application builder
(function($){
	"use strict";

	var App 		= new Function('args', 'return App.create(args);'),
		type		= { f: 'function', u: 'undefined', s: 'string', o: 'object', a:'array', n:'number'},
		fn			= function(){/* no-op */},
		namespaces 	= [];

	//debug console stub
	if(typeof console === type.u) {
		console = { log: fn, group:fn, error:fn, warn:fn, groupEnd:fn };
	};

	//base class setup
	window['App']	= App;
	App.$			= $;
	App.cfg			= { env : typeof vjsReady === type.f ? 'Volusion' : 'other', initialized : false };
	App.type		= type;
	App.namespaces	= namespaces;

	//create namespace
	App.ns = function(a) {
		var ns = App;
		a = a || [];
		if (typeof a == type.s) {a = a.split('.');};
		for(var i = 0; i < a.length; i++) {
			if (ns[a[i]]) { ns[a[i]] = ns[a[i]] } else {
				namespaces.push(a[i]);
				ns[a[i]]			= new fn;
				ns[a[i]].prototype	= App.prototype;
				ns[a[i]].prototype.constructor = App.prototype.constructor;
			};
			ns = ns[a[i]];
		};
		return ns;
	};
	//create application
	App.create = function() {
		var item,
			o, 
			old,
			tmp,
			args = Array.prototype.slice.call(arguments);

		if (args.length==0) { return App; };
		if (args.length==1) { o = args[0]; };
		if (args.length==2) { 
			o = App.apply({}, {
				namespace 	: args[0],
				overrides 	: args[1]
			}); 
		};
		if (args.length==3) { 
			o = App.apply({}, {
				namespace 	: args[0],
				cfg 		: args[1],
				overrides 	: args[2]
			}); 
		};
		if (typeof o == type.f) {
			App.apply(o);
			return o;
		};

		o.object = o.object || o.namespace || o.ns || {};
		if (typeof o.object == type.s) {o.object = App.ns(o.object);};
		if (typeof o.overrides == type.u) {return;};
		if (typeof o.defaults !== type.u) { App.create( {object: o.object, overrides: o.defaults} ); };
		if (o.object && o.overrides && typeof o.overrides === type.o) {
			o.object.$ 		= $;
			o.object.global = App;
			o.object.self 	= o.object;
			o.object.cfg 	= o.object.cfg || o.object.settings || {};
			o.object.self.cfg = o.object.cfg; 

			if (typeof o.cfg !== type.u) {
				o.object.cfg = App.apply(o.object.cfg, o.cfg);
			};
			for (item in o.overrides) {
				if ( o.overwrite ) { o.object[item] = o.overrides[item]; } else if ( !o.object[item] ) { o.object[item] = o.overrides[item]; };
				if (item == 'init') {
					/*old = o.object[item].prototype;
					tmp = o.object[item];
					o.object[item] =  function(){
						App._super(o.object,arguments);
						tmp.apply(this, arguments);
					};
					o.object[item].prototype = old; */

					$(document).ready(o.object[item]);
				};
			};
		};
		return o.object;
	};
	//copy properties on to an object
	App.apply = function(o,a) {
		var i;
		if (typeof o == type.u || typeof a == type.u) {return o;};
		for(i in a) {
			o[i] = a[i];
		};
		return o;
	};
	//copy properties on to an object conditionally
	App.applyif = function(o,a) {
		var i;
		if (typeof o == type.u || typeof a == type.u) {return o;};
		for(i in a) {
			if (!o[i]) o[i] = a[i];
		};
		return o;
	};
	//same as apply, but allows namespace as primary object
	App.extend = function(o,a) {
		if (typeof o == type.u || typeof a == type.u) {return;};
		if (typeof o == type.s) { o = App.ns(o);};
		return App.apply(o,a);
	};
	//search an object for a key and optional value pair, returns array of matching values
	App.search = function(o, key, val) {
		var a = [], tmp = {};
		if (typeof o == type.u || typeof key == type.u ) {return a;};
		for (var i in o) {
			if (o[i] === null && (i == key)) {a.push(o); continue;};
			if (!o.hasOwnProperty(i)) continue;
			if (typeof o[i] == type.o) {
				a = a.concat(App.search(o[i], key, val));
			} else if (i == key) {
				if (typeof val == type.u) { a.push(o); } else if (o[i] == val){ a.push(o); };
			};
		};
		return a;
	};
	App._super = function(o,a){
		return App.apply(o,a);
	};
	App.reconfig = function(context, o){
		o = o || {};
		//loads alternative cfg if supplied
		if (o.cfg) {
			//apply settings
			$.each(o.cfg, function(i,val){
				var tmp;
				tmp = App.search(context, i);
				if(tmp.length>0) {tmp[0][i] = val;};
			});
		};
	};
	App.callback = function(o, context){
		if (typeof o == type.s) {o=o.split(',');};
		$.each(o, function(i,val){context[val]()});
	};
	//Function extensions
	App.applyif(Function.prototype, {
		intercept : function(fcn, s){
			var m = this;
			return (typeof fcn == type.f) ?
					m :
					function() {
						var me = this,
							a = arguments;
						fcn.target = me;
						fcn.m = m;
						return (fcn.apply(s || me || window, a) !== false) ?
								m.apply(me || window, a) :
								null;
					};
		},
		callback : function(){
			var a = arguments,
				m = this;
			return function() {
				return m.apply(window, a);
			};
		},
		delegate : function(o, a, aa){
			var m = this;
			return function() {
				var ca = a || arguments;
				if (aa === true){
					ca = Array.prototype.slice.call(arguments, 0);
					ca = ca.concat(a);
				}else if (typeof aa  == type.n){
					ca = Array.prototype.slice.call(arguments, 0); // copy arguments
					var aa = [aa, 0].concat(a); // create method call params
					Array.prototype.splice.apply(ca, aa); // splice them in
				};
				return m.apply(o || window, ca);
			};
		},
		wait : function(m, o, a, aa){
			var fn = this.delegate(o, a, aa);
			if(m > 0){
				return setTimeout(fn, m);
			};
			fn();
			return 0;
		}
	});
	
	App.cfg.initialized = true;
	
})(jQuery);

/* --- cdev/lib/fn.js --- */ 
/*--------------------------------------------------------------------------*
 * 
 * Woodward Function Library
 * 
 * Version 2.1.0
 * 
 * Copyright (C) 2012 Brand Labs LLC
 * 
 *--------------------------------------------------------------------------*/
 
//optional global functions
App.create({
	namespace 	: 'fn',
	cfg 		: 
	{
		js:[],
		css:[]
	},
	overrides 	: function(){ 
		var cfg,
			url =  window.location.pathname, 
			href = window.location.href,
			self	= App.ns('fn');
			cfg		= self.cfg = {
				initialized 			: false,
				pageType :
				{
					home 				: (url.toLowerCase() == '/' || url.toLowerCase() == '/default.asp'),
					register			: false,
					category 			: (url.toLowerCase() == '/searchresults.asp' || url.toLowerCase().indexOf('-s/') != -1 || url.toLowerCase().indexOf('_s/') != -1), 
					productDetail 		: (url.toLowerCase() == '/productdetails.asp' || url.toLowerCase().indexOf('-p/') != -1 || url.toLowerCase().indexOf('_p/') != -1),
					shoppingCart 		: (url.toLowerCase() == '/shoppingcart.asp'),
					onePageCheckout 	: (url.toLowerCase() == '/one-page-checkout.asp'),
					other				: false
				}
			};


		return {
			init : function(){
				cfg.pageType.register = self.isRegisterPage(url);
				cfg.pageType.other = !(
					cfg.pageType.home || 
					cfg.pageType.register || 
					cfg.pageType.category || 
					cfg.pageType.productDetail || 
					cfg.pageType.shoppingCart || 
					cfg.pageType.onePageCheckout 
				);

				cfg.initialized = true;
			},
			addJS : function(o){
				o = o || [];
				for (var i = 0; i < o.length; i++) {
					if (!cfg.js[o[i]]) {
						cfg.js.push(o[i]);
						$('head').append('\<scr'+'ipt  src="'+o[i]+'" type="text/javascript"><\/scr'+'ipt>');
					};
				};
			},
			addCSS : function(o){
				o = o || [];
				for (var i = 0; i < o.length; i++) {
					if (!cfg.css[o[i]]) {
						cfg.css.push(o[i]);
						$('head').append('<link href="'+o[i]+'" rel="stylesheet" type="text/css" />');
					};
				};
			},
			requires : function(o){
				o = o || {};
				if (o.js) {
					$.each(o.js, function(i,val){
						self.addJS([val]);
					});
				};
				if (o.css) {
					$.each(o.css, function(i,val){
						self.addCSS([val]);
					});
				};
			},
			isHomePage : function(url) {
				url = url || window.location.pathname;
				if(url == null) {
					return false;
				} else {
					//HOME
					return (url.toLowerCase() == '/' ||
							url.toLowerCase() == '/default.asp');
				};
			},
			isRegisterPage : function(url) {
				url = url || window.location.pathname;
				if(url == null) {
					return false;
				} else {
					//HOME
					return ( url.toLowerCase() == '/register.asp' ||
					self.qs['AddNewCustomer'] == 'Y' ||
					self.isOnePageCheckoutPage(url)
					);
				};
			},			
			isCategoryPage : function(url) {
				url = url || window.location.pathname;
				if(url == null) {
					return false;
				} else {
					//CATEGORY
					//The category page (per Volusion KB)	
					return (url.toLowerCase() == '/searchresults.asp' ||
							url.toLowerCase().indexOf('-s/') != -1 ||
							url.toLowerCase().indexOf('_s/') != -1);
				};
			},
			isProductDetailPage : function(url) {
				url = url || window.location.pathname;
				if(url == null) {
					return false;
				} else {
					//PRODUCT
					//The product detail page (per Volusion KB)	
					return (url.toLowerCase() == '/productdetails.asp' ||
							url.toLowerCase().indexOf('-p/') != -1 ||
							url.toLowerCase().indexOf('_p/') != -1);
				};
			},
			/**
			 * @return Boolean
			 * @param url is usually location.pathname
			 */
			isShoppingCartPage: function(url) {
				url = url || window.location.pathname;
				if(null == url) {
					return false;
				} else {
					return (url.toLowerCase() == '/shoppingcart.asp');
				};
			},

			/**
			 * @return Boolean
			 * @param url is usually location.pathname
			 */
			isOnePageCheckoutPage: function(url) {
				url = url || window.location.pathname;
				if(null == url) {
					return false;
				} else {
					return (url.toLowerCase() == '/one-page-checkout.asp');
				};
			},
			getProductCodeFromURL : function(url) {
				url = url || window.location.href;
				var matches = null;
		
				//Make sure we do not have a null
				if(url == null) {
					return null;
				};
		
				//Check non-SEO URL
				matches = url.match(/.*[\?|&]ProductCode=([^&;]*)/i);
				if(matches != null && matches.length >= 2) {
					return unescape(matches[1]).toLowerCase();
				};
		
				//Check SEO URL
				matches = url.match(/[_-]p\/(.+)\.htm/i);
				if(matches != null && matches.length >= 2) {
					return unescape(matches[1]).toLowerCase();
				};
		
				//No product code available
				return null;
			},
			getCategoryIdFromURL : function(url) {
				url = url || window.location.href;
				var matches = null;
				
				//Make sure we do not have a null
				if(url == null) {
					return null;
				};
				
				//Check non-SEO URL
				//matches = url.match(/\/searchresults\.asp\?(?:[\&]?.*\=.*)*cat=([^\&\#]+)/i);	old, ?: causes issues
				matches = url.match(/\/searchresults\.asp.*[\?&]cat=(\w+)/i); /* require there to be one ? or & before cat=(category) */
				if(matches != null && matches.length >= 2) {
					return unescape(matches[1]);
				};
				
				//Check SEO URL
				matches = url.match(/[_-]s\/(\w+)\.htm/i);	/* require there to be one - or _ before s/(number).html */	
				if(matches != null && matches.length >= 2) {
					return unescape(matches[1]);
				};
			
				//No category id available
				return null;
			}, 
			/*
			 * @param: template - templated string, things to replace should be of the form #{KEYWORD} 
			 * @param: arguments - object of KEYWORDS which are to be replaced with their associated VALUE
			 * 
			 * @return: resultant string with argument keys found replaced with values
			 * */
			evaluate: function(template, arguments) {
				finalString = template;
				
				jQuery.each(arguments, function(key, value){
					var regExp = new RegExp('#{' + key + '}','g');
					finalString = finalString.replace(regExp, value);
				});
				
				return finalString;
			},
			insert : function(el, what, pos) {
				el = $(el);
				if (pos == 'before' || pos == 'after' || pos == 'append' || pos == 'prepend') {
					el[pos](what);
				} else {
					el.append(what);
				};
				return el;
			},
			getQueryString : function (qs) {
				var result = {}, qs = qs || location.search.substring(1),
					re = /([^&=]+)=([^&]*)/g, m;
				while (m = re.exec(qs)) {
					result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
				};
				return result;
			}, 
			qs : (function(a) {
				if (a == "") return {};
				var b = {};
				for (var i = 0; i < a.length; ++i){
					var p=a[i].split('=');
					if (p.length != 2) continue;
					b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
				};
				return b;
			})( window.location.search.substr(1).split('&') )
		}
	}()
});

/* --- cdev/photo-swap/js/main.js --- */ 
/*--------------------------------------------------------------------------*
 * 
 * Photo Swap
 * 
 * Version 1.0.0
 * 
 * Copyright (C) 2013 Brand Labs LLC
 * 
 *--------------------------------------------------------------------------*/

/* example application */
App.create({
	namespace : 'PhotoSwap', 
	
	cfg :
	{
		/* instance configuration overrides can go here */
	},

	overrides : function() {
	/* configuration variables (defaults) */
	var	cfg,
		global	= App,
		self	= App.ns('PhotoSwap'),
		$		= global.$;

		cfg = self.cfg = {
			initialized	: false,	
			settings	: 
			{
				/* settings go here */
				photoSeekURL			: '/v/cdev/photo-swap/ajax/image-request.json.asp',
				photoFileSize			: '3T',
				photoSwapClassName		: 'swapped_image'
			},
			selectors	: 
			{
				/* selectors go here */
				productPhotos	: '.v65-productDisplay table tr td a img'
			},
			elements	: 
			{
				/* elements go here */
				productPhotos	: null
			},
			data		:
			{
				productImages	: {}
			},
			templates	: 
			{
				swapImageElement	: '<img class="swapped_image" src="#{PhotoPath}" style="display:none;"/>'
			}
		};


/* private */
	//If not category/results page, quit.
	if (!global.fn.isCategoryPage()) {
		return;
	}
	
	//IE8 Object Keys compatability fix
	Object.keys = Object.keys || function(o) { 
	    var result = []; 
	    for(var name in o) { 
	        if (o.hasOwnProperty(name)) 
	          result.push(name); 
	    } 
	    return result; 
	};

/* public */
	return {
		/* constructor // runs once on page load. */
		init : function(){
			
			/* populate our elements */
			$.each(cfg.selectors, function(i, value){
				cfg.elements[i] = $(value);
			});
			
			//Go through images, pull out product code
			$.each(cfg.elements.productPhotos, function(k, element) {
				var anchor = $(element).parent('a');
				var productCode = global.fn.getProductCodeFromURL(anchor.attr('href'));
				//Add to PC list
				cfg.data.productImages[productCode.toUpperCase()] = element;
			});
			
			//Get images, and set us up the swap
			try {
				self.retrieveSwapImages();
			} catch(err) {
				/*Ignore*/
			}
			
			cfg.initialized = true;

		},
		retrieveSwapImages : function(){			
			$.ajax({
				url : cfg.settings.photoSeekURL,
				type: 'GET',
				data: {
					file			: cfg.settings.photoFileSize,
					productCode	: Object.keys(cfg.data.productImages)
				},
				success: function(response, status, xhr){
					var foundPaths = $.parseJSON(response);

					//Create swap images, and assign listenieners/handling
					$.each(foundPaths, function(productCode, foundPath) {
						var productPhoto = $(cfg.data.productImages[productCode.toUpperCase()]);
						var swapImage = $(global.fn.evaluate(cfg.templates.swapImageElement, {
								PhotoPath: foundPath
							}));
						
						//Add hidden swap image to page
						productPhoto.parent().append(swapImage);
						
						//Add mouseover swap listener
						productPhoto.mouseenter(function(event){
							var element = jQuery(this);
							element.hide();
							swapImage.css({height: element.height(), width: element.width()});
							swapImage.show();
						});
						//Add mouseout swap listener
						productPhoto.parent().mouseleave(function(event){
							swapImage.hide();
							productPhoto.show();
						});
						
					});

				}
			});
			
		}
	}/* end */
}()});


