/*
 * All java script logic for the application.
 *
 * The code relies on the jQuery JS library to
 * be also loaded.
 */
// semi-colon to assure functionality upon script concatenation and minification
;

// prevent errors in ie9 or less
window.console = window.console || { log: function(){}, error: function(){} };

// flood lights tag call method

$.fn.togglepanels = function(){ 
	return this.each(function(){
		$(this).addClass("ui-accordion ui-accordion-icons ui-widget ui-helper-reset")
			.find("h3")
			.addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-top ui-corner-bottom")
			.hover(function() { $(this).toggleClass("ui-state-hover"); })
			.prepend('<span class="ui-icon ui-icon-triangle-1-e"></span>')
			.click(function() {
				$(this)
				.toggleClass("ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom")
				.find("> .ui-icon").toggleClass("ui-icon-triangle-1-e ui-icon-triangle-1-s").end()
				.next().slideToggle();
					return false;
			})
		.next()
			.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom")
			.hide();
	});
};

function callFloodlight(source, type, cat) {
	try {
		var tag_url="https://fls.doubleclick.net/activityi;src=" + source + ";type=" + type + ";cat=" + cat + ";ord=1;num="+Math.random()*10000000000000+"?";
		if(document.getElementById("DCLK_FLDiv")){var flDiv=document.getElementById("DCLK_FLDiv");}
		else{var flDiv=document.body.appendChild(document.createElement("div"));flDiv.id="DCLK_FLDiv";flDiv.style.display="none";}
		var DCLK_FLIframe=document.createElement("iframe");
		DCLK_FLIframe.id="DCLK_FLIframe_"+Math.random()*10000000000000;
		DCLK_FLIframe.src=tag_url;
		flDiv.appendChild(DCLK_FLIframe);
	} catch(err) {
		console.error('Doubleclick Floodlight: ' + err.message);
	}
}

function writeFloodlightImagePixel(pixelParams) {
	var axel = Math.random() + "";
	var a = axel * 10000000000000;
	$('body').append('<img src="http://ad.doubleclick.net/' + pixelParams + ';ord=' + a + '" width="1" height="1" alt=""/>');
}

function callFloodlightTag(tag_url) { 
	try {
		if(document.getElementById("DCLK_FLDiv")){var flDiv=document.getElementById("DCLK_FLDiv");}
		else{var flDiv=document.body.appendChild(document.createElement("div"));flDiv.id="DCLK_FLDiv";flDiv.style.display="none";}
		var DCLK_FLIframe=document.createElement("iframe");
		DCLK_FLIframe.id="DCLK_FLIframe_"+Math.random()*10000000000000;
		DCLK_FLIframe.src=tag_url;
		flDiv.appendChild(DCLK_FLIframe);
	} catch(err) {
		console.error('Doubleclick Floodlight: ' + err.message);
	}
}

function callFloodlightOrderConfirm(tag_url){
	try {
		if(document.getElementById("DCLK_FLDiv")){var flDiv=document.getElementById("DCLK_FLDiv");}
		else{var flDiv=document.body.appendChild(document.createElement("div"));flDiv.id="DCLK_FLDiv";flDiv.style.display="none";}
		var DCLK_FLIframe=document.createElement("iframe");
		DCLK_FLIframe.id="DCLK_FLIframe_"+Math.random()*10000000000000;
		DCLK_FLIframe.src=tag_url;
		flDiv.appendChild(DCLK_FLIframe);
	} catch(err) {
		console.error('Doubleclick Floodlight: ' + err.message);
	}
}
function updateNavTypes(){

	$(".bottom_bar a").attr('href', function(i, h) {
		if(h){
			return h + (h.indexOf('#nav=top') != -1 ? "" : "#nav=top");
		}
	});
	$("#secondary.nav a").attr('href', function(i, h) {
		if(h){
			return h + (h.indexOf('#nav=left') != -1 ? "" : "#nav=left");
		}
	});
}
// non-cached session data
(function(app){
	
	var $cache = {};
	
	function initializeCache() {
		
	}
	
	function initializeDom() {	
		
	}
	
	function initializeEvents() {
		if(app.page.type.toLowerCase()==='cart'||app.page.type.toLowerCase()==='checkout') { return; }
		app.user.initPreferredStore(app.customer.zip);
	}
	app.user = app.user || {};
	$.extend(app.user, {
		storeId : (function(){
			if($('#userSession').attr('data-userStoreId') == null || $('#userSession').attr('data-userStoreId') === 'null'){
				return null;
			}else{
				return $('#userSession').attr('data-userStoreId');
			}
		})(),
		userSelectedStore : (function(){
			if($('#userSession').attr('data-userSelectedStore') == null 
					|| $('#userSession').attr('data-userSelectedStore') === 'null'
					|| $('#userSession').attr('data-userSelectedStore') == false
					|| $('#userSession').attr('data-userSelectedStore') === 'false'){
				return false;
			}else{
				return true;
			}
		})(),
		initPreferredStore : function(zip){
			if(app.user.storeId != null && app.user.userSelectedStore){ //store has been explicitly set by user
				return;
			}
			
			var cookieStore = jQuery.cookie('userstore');
			if(cookieStore){
				app.user.setUserPreferredStore(cookieStore); //set store based on cookie
				return;
			}
			
			if(zip != null){ //look up stores using retrieved zip code if not logged in
				if(!app.customer.authenticated || app.customer.authenticated && app.user.storeId == null){
					$.ajax({
						url: app.urls.storeFindFromNav,
						type: "POST",
						data: { ajax: "true", dwfrm_storelocator_postalCode : zip },
						success: function(stores){
							if(stores.length > 0 && stores[0].id != null){
								app.user.setUserPreferredStore(stores[0].id);
							}
						}
					});
				}
			}
		},
		findUserStores : function(zip){ //called when zip changed on PDP for for home deliverable area search
			$.ajax({
				url: app.urls.storeFindFromNav,
				type: "POST",
				data: { ajax: "true", dwfrm_storelocator_postalCode : zip }
			}).done(function(data){
				if(data.length > 0 && data[0].id != null){
					app.user.setUserPreferredStore(data[0].id);
					window.location.reload();
				}
			});
		},
		setUserPreferredStore : function(id){
			app.user.storeId = id;
			$.ajax({
				type: "POST",
				url: app.urls.setPreferredStore,
				data: { storeId : id, userSelected : false}
			}).done(function(data){
				if(data.length > 0 && data[0].storeName != null){
					$('.your-store').html(app.resources.YOUR_STORE + data[0].storeName.substring(0,20));
					$('.your-store-anchor').html(app.resources.YOUR_STORE_ANCHOR + ' &#x25BC;');
				}
			});
		},
		setUserZip : function (zip) {
			app.customer.zip = zip;
			app.customer.zipUserEntered = true;
			$.ajax({
				type: "POST",
				url: app.urls.setZipCode,
				data: { zipCode : zip }
			});
		},
		setPreferredStore : function(zip, pid) {
			$.ajax({
				url: app.urls.storeFindFromNav,
				type: "POST",
				data: { ajax: "true", dwfrm_storelocator_postalCode : zip }
			}).done(function(data){
				if(data.length > 0 && data[0].id != null){
					app.user.setUserPreferredStore(data[0].id);
				}
			})
			.always(function() {
				app.user.updateAvailabilityMessaging(zip);
			});
		},
		updateAvailabilityMessaging : function (zip) {
			var $availabilityContent = $('.availability-container'),
				zip = zip || app.customer.zip;
			
			$availabilityContent.each(function () {
				var $that = $(this),
					pid = $that.data('pid');
				
				$.ajax({
					type: "GET",
					url: app.urls.printDeliveryOptions,
					data: { zipCode: zip, sku: pid },
					success: function (response) { insertAvailabilityMarkup( $that, response); }
				});
			});
		},
		init : function() {
			initializeCache();
			initializeDom();
			initializeEvents();
		}
	});
	
	function insertAvailabilityMarkup( $ele, response ) {
		if(!$ele || !response) { return; }
		
		$ele.html(response);
	}
	
}(window.app = window.app || {}));

/**
 * @memberOf app
 */
var app = (function (app, $) {
	document.cookie="dw=1";
	/** ****** private functions & vars ********* */
	var CK_DVC = 'p1dvc';
	function setDisplayDetails() {
		var p1dvc = $.cookie(CK_DVC);
		
		if (p1dvc) { return; }
		
		var data = {
			dpr: window.devicePixelRatio,
			sw: window.screen.width,
			sh: window.screen.height
		};
		
		$.cookie(CK_DVC, JSON.stringify(data), { expires: 365, path: '/' });
		
	}
	setDisplayDetails();
	
	// cache dom elements accessed multiple times
	// app.ui holds globally available elements
	function initUiCache() {
		app.ui = {
			searchContainer : $(".header-search"),
			printPage		: $("a.print-page"),
			reviewsContainer: $("#pwrwritediv"),
			main			: $("#main"),
			primary			: $("#primary"),
			secondary		: $("#secondary"),
			headerNavCtnr	: $("#header-nav-container"),
			// elements found in content slots
			slots : {
				subscribeEmail : $(".subscribe-email")
			},
			citiesjsondata  : null
		};
	}
	
	function scrollToHash() {
		if (!window.location.hash || !window.location.hash.length || window.location.hash.indexOf("=") > -1) { return; }
		
		var $stickyHeader = $('.sticky-header'),
			$location = $(window.location.hash);
		
		if (!$location.length || !$stickyHeader.length) { return; }
		
		var newTop = $location.offset().top - $stickyHeader.height();
		$(window).scrollTop(newTop);	
	}

	function initializeEvents() {

		$(window).bind('hashchange', scrollToHash);
		
		// apply dialogify event handler to all elements that match
		// one or more of the specified selectors
		$("body").on("click", ".dialogify, [data-dlg-options], [data-dlg-action]", app.util.setDialogify);

		// Handle textarea with maxlength
		// Includes shim for browsers that don't incorporate maxlength (< IE10)
		var maxLengthSupported = 'maxLength' in document.createElement('textarea');
		var excludedKeyCodes = [8, 16, 17, 18, 37, 38, 39, 40, 46];
		$('body').on('keydown keyup focus paste', 'textarea[maxlength]', function (e) {
			var text = $(this).val();
			var maxLength = +$(this).attr('maxlength');

			if(!maxLengthSupported && (text.length >= maxLength)) {
				var keyCode = e.which;
				if((keyCode >= 48) || $.inArray(keyCode, excludedKeyCodes) === -1) {
					if(text.length > maxLength) {
						$(this).val(text.substr(0, maxLength));
					}
					e.preventDefault();
				}
			}
			$(this).next('div.char-count').find('.char-remain-count').html(maxLength - text.length);
		});
		
		// ensure that whitespace for input fields is normalized
		$('body').on('change', 'input[type="text"]', function(e) {
			var $input = $(this), val = $input.val();
			$input.val($.trim(val).replace(/\s{2,}/g,' '));
		});

		// build custom menu
		app.nav.init();

		// set up toggle elements
		app.util.initToggleElements();

		// initialize search suggestions
		if(!$('body').hasClass('mobile')){
			app.searchsuggest.init(app.ui.searchContainer, app.resources.SIMPLE_SEARCH);
		}

		if(	(navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
			(navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
			(navigator.userAgent.toLowerCase().indexOf("ipod") > -1)
		 ) {$('body').addClass('iphone');}


		// print handler
		app.ui.printPage.on("click", function () { window.print(); return false; });

		// subscribe email box
		if (app.ui.slots.subscribeEmail.length > 0)	{
			app.ui.slots.subscribeEmail.focus(function () {
				var val = $(this.val());
				if(val.length > 0 && val !== app.resources.SUBSCRIBE_EMAIL_DEFAULT) {
					return; // do not animate when contains non-default value
				}

				$(this).animate({ color: '#999999'}, 500, 'linear', function () {
					$(this).val('').css('color','#333333');
				});
			}).blur(function () {
				var val = $.trim($(this.val()));
				if(val.length > 0) {
					return; // do not animate when contains value
				}

				$(this).val(app.resources.SUBSCRIBE_EMAIL_DEFAULT)
					   .css('color','#999999')
					   .animate({color: '#333333'}, 500, 'linear');

			});
		}

		// store search tools, used in global header
		app.storeTools.selectStore( $('.cities-auto input[type="text"]') );

		// set preferred store from map
		$(document).on('click', '.makeThisMyStore', function () {
			var selectedStoreId = this.id
			$("#"+this.id).removeClass('makeThisMyStore');
			$("#"+this.id).addClass('preferredStore');
			app.user.storeId = this.id;
			$.ajax({
				type: "POST",
				url: app.urls.setPreferredStore,
				data: { storeId : this.id, userSelected : true }
			}).done(function(data){
				if(data.length > 0 && data[0].storeName != null){
					$('.your-store').html(app.resources.YOUR_STORE + data[0].storeName.substring(0,20));
					$('.your-store-anchor').html(app.resources.YOUR_STORE_ANCHOR + ' &#x25BC;');
				}
			})
			.fail(function() {

			});
			$("#"+this.id).text('My Preferred Store');
		});

		// checkout login forgot pwd
		app.account.initForgotPwd();

		// security Policy !!
		$('.securityPolicy, .privacyPolicy').click(function(e){
			e.preventDefault();
			var options = $.extend(true, {}, app.dialog.settings, {
				height : 600,
				width : 1200,
				dialogClass : 'privacy'
			});
			app.dialog.open({url:this.href, options: options});
		});

		// one click email sign-up in footer
		$("#emailjoin").click(function(e){
			var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
			var email = jQuery("#emailjoininput").val();
			var firstname = jQuery("#FirstName").val();
			var lastname = jQuery("#LastName").val();
			if ($.trim(firstname) == ''){
				firstname = "Unknown";
			}
			if ($.trim(lastname) == ''){
				lastname = "Unknown";
			}
			var wsurl = app.urls.emailjoin + "?email=" + email + "&fname=" + firstname + "&lname=" + lastname;
			var data;
			var txtStatus;

			jQuery(".emailjoinerror").removeClass('thankyou');
			if (pattern.test(email)) {
				jQuery.ajax({
					contentType: "application/json; charset=utf-8",
					dataType: 'html',
					url: wsurl,
					cache: false,
					async: false,
					success: function(data) {
						if(data == "success") {
							jQuery(".emailjoinerror p").removeClass().addClass('errorform').html("Email successfully added");
						}
						else{
							jQuery(".emailjoinerror p").removeClass().addClass('errorform').html(data);
							$("#FirstName").val('');
							$("#LastName").val('');
							$("#emailjoininput").val('');
						}
					},
				   failure: function(data) {
						jQuery(".emailjoinerror p").removeClass().addClass('errorform').html("An error was encountered while processing your request.");
				   }
				});
			}
			else { // if (pattern.test(email))
				jQuery(".emailjoinerror p").removeClass().addClass('errorform').html("Email address provided is invalid.");
			}
		});

		// PDP shipping options
		$('.shippingoptionsdialogcontent').click(function(e){
			e.preventDefault();
			var options = $.extend(true, {}, app.dialog.settings, {
				height : 400,
				width : 777,
				dialogClass : 'shippingoptionsdialog',
				title : 'Shipping Availability:'
			});
			app.dialog.open({url:this.href, options: options});
		});

		// PDP FAQ section
		$('#pdpFaq').find('a').click(function(e){
			e.preventDefault();

			var options = $.extend(true, {}, app.dialog.settings, {
				height : 'auto',
				width : 550,
				dialogClass : 'PDPFaqDialog',
				title : 'FAQs'
			});
			app.dialog.open({url:this.href, options: options});
		});

		// cart page quantity emptyness restriction
		function checkQTYField(){
			var isEmpty = false;
			var qtyComps = $(".qtyInput");
			for(var i=0; i< qtyComps.length; i++){
			   if(qtyComps[i].value == '' && !isEmpty){
					// alert("At least one of the product line item quantity
					// missing!");
					isEmpty = true;
					break;
				}
			}
			return isEmpty;
		}

		// allow numeric & submit update QTY on enter click
		$(".qtyInput").keypress(function(e){
			if(e.which == 13 || e.keyCode == 13){
				if(checkQTYField()){
					return false;
				}
			}else{
				$(".qtyInput").numeric({ decimal: false, negative: false }, function() { this.value = ""; this.focus(); });
			}
		});

		// submit update QTY on enter click
		$(".qtyInput").click(function(e){
			if(e.which == 13 || e.keyCode == 13){
				$(".updateQTY").click();
			}
		});

		// allow numerics only
		$(".numsonly, .option-quantity-desired input").numeric({ decimal: false, negative: false }, function() { this.value = ""; this.focus(); });

		// key up event handler to update the set product price on change of
		// quantity of set indivudual products
		$(".setIndQty").keyup(function(e){
			if(e.keyCode >= 48 && e.keyCode <=57 || e.keyCode == 8 || e.keyCode == 46 || e.keyCode >= 96 && e.keyCode <=105){
				app.product.updateSetPrice();
			}
		});
		
		$('#switch-view').on('click', function(){
			$(this).toggleClass('is-toggled');
		});
		// Logout timer for cashwrap PC
		if(app.customer.cwpc){
			app.logouttimer.init();
		}
	}

	function initializeDom() {
		// add class to html for css targeting
		$('html').addClass('js');
		$('input, textarea').placeholder();

		// load js specific styles
		app.util.loadCssFile(app.util.staticUrl("/css/js-style.css"));
		app.util.limitCharacters();
	}
	
	// 
	function appInit() {
		if (document.cookie.length===0) {
			$("<div/>").addClass("browser-compatibility-alert").append($("<p/>").addClass("browser-error").html(app.resources.COOKIES_DISABLED)).appendTo("#browser-check");
		}

		// init global cache
		initUiCache();

		// init global dom elements
		initializeDom();

		// init global events
		initializeEvents();
		
		if(!app.resources.DISABLE_RESPONSIVE){
			app.responsive.init();
		}
		// init specific global components
		app.tooltips.init();
		app.minicart.init();
		app.validator.init();
		app.components.init();
		app.searchplaceholder.init()
		app.storeTools.init();
		app.user.init();
		
		// execute page specific initializations
		app.page.init();
		
		scrollToHash();
	}

	var keyCodes = {
		BACKSPACE	: 8,
		ENTER 		: 13,
		ESC 		: 27,
		LEFT		: 37,
		UP			: 38,
		RIGHT		: 39,
		DOWN		: 40,
		DELETE		: 46,
		ZERO		: 48,
		NINE		: 57,
		NUMZERO		: 96,
		NUMNINE		:105
	}

	// _app object
	// "inherits" app object via $.extend() at the end of this seaf
	// (Self-Executing Anonymous Function
	var _app = {
		containerId		: "content",
		ProductCache	: null,  						// app.Product object ref to the current/main product
		ProductDetail	: null,
		clearDivHtml	: '<div class="clear"></div>',
		currencyCodes	: app.currencyCodes || {}, 		// holds currency code/symbol for the site
		rxIdReplace		: /[^\w+-]/g,
		countryCode : app.resources.SITE_COUNTRY_CODE || 'US',
		keyCodes : keyCodes,
		controlKeys : [keyCodes.BACKSPACE,keyCodes.ENTER,keyCodes.ESC,keyCodes.LEFT,keyCodes.UP,keyCodes.RIGHT,keyCodes.DOWN,keyCodes.DELETE],
		/**
		 * @name init
		 * @function
		 * @description Master page initialization routine
		 */
		init: appInit
	};

	return $.extend(app, _app);
}(window.app = window.app || {}, jQuery));

//app.customer
(function (app, $) {
	
	app.customer = $.extend(app.customer || {}, {
		
		getPostalCode : function() {
			var zip = null;	
			$.ajax({
				url: app.urls.getZipCode,
				async: false,
				success: function(data) {
					zip = data[0];
				}
			});
			
			return zip ? zip.zip : null;
		}
	
	});
	
}(window.app = window.app || {}, jQuery));

// app.nav
(function (app, $) {
	var $cache = {
			navItems : $('.bottom_bar .department'),
			body : $('body')
	};

	var menuConfig = {

		over: function() {

			var titleSpan = $(this).children('span.nav-title');
			var assetBlock = $(this).children('.flyout');

			$(this).children('.tail').css('display', 'block');
			$(this).addClass('active').children('.flyout').slideDown(0);



			// START Check for page overflow and add margin
			var elm = assetBlock.parent();
			var off = elm.position();
			var l = off.left;
			var w = assetBlock.width();
			var docW = $(".bottom_bar").width();

			var isEntirelyVisible = ((l+w+50) <= docW);

			if ( ! isEntirelyVisible ) {
				var difference = ((l + w) - docW);
				difference = difference + 50; // Add a little buffer
				assetBlock.css("margin-left", -difference);
			}
			// END Check for page overflow and add margin

			// This is a hack so that on a tablet when one taps on the bottom
			// bar and reveals a dropdown, if one taps anywhere outside of the
			// bottom bar events are not triggered. (ex. links, inputs, etc.)
			//
			// 1. Make bottom bar absolute. Without this the overlay always covers
			//	the bar.
			// 2. Set the z-index of the mini-bar so that it does not get covered by
			//	the overlay. Also set the z-index of the mini-cart dropdown. This
			//	is so that it does get covered by the bottom bar.
			// 3. Add an invisible overlay. This will absorb any tap events when
			//	someone taps outside the bottom bar. It gets removed in the out
			//	method below.
			//
			// The CSS could be placed in stylesheets, but this is a temporary hack
			// so we'll keep it here for now.
			$('.bottom_bar').css({zIndex: 501, position: 'absolute'});
			$('<a href="javascript:void(0)" id="bottom-bar-overlay"></a>')
			.appendTo('body')
			.css({
				position: 'fixed',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 500
			});
		},

		timeout: 0,

		out: function() {
			if( $('.ui-autocomplete:visible').length === 0 && !$('body').hasClass('mobile')  ) {
				$(this).removeClass('active').children('.flyout').slideUp(0);
				$(this).children('.tail').css('display', 'none');
			}

			// Use setTimeout so that the bottom bar overlay absorbs the click.
			// See above over method for more information.
			setTimeout(function() {
				$('.bottom_bar').removeAttr('style');
				$('#bottom-bar-overlay').remove();
			}, 0);
		}

	};


	app.nav= {
		init : function () {

			if(! $cache.body.hasClass('mobile')){
				 $cache.navItems.hoverIntent(menuConfig);
			}

			$('#navigation h1.navigation-header')
				.append('<span class="nav-close">close</span>')
				.click(
					function(){
						$('#navigation').find('.active').each(
								function(){
									$(this).removeClass('active');
								}
						);

						if( $(this).hasClass('over') ) {
							$(this).removeClass('over');
							$('.block-menu').hide();
						}
						else {
							$(this).addClass('over');
							$('.block-menu').show();
						}

					}
				);

			$('.department').hover(
				function(){
					if ( $cache.body.hasClass('mobile') ){
						$(this).removeClass('active');
					}
				}
			);

			if(!$('#wrapper').hasClass('pt_storefront')) {
				var $mobileNavHeader = $('.mobile_nav_header');
				var $department = $mobileNavHeader.siblings('.department');
				var $navClose = $('<span class="nav-close">+</span>').insertAfter($mobileNavHeader);

				$('.mobile_nav_header, .nav-close').click(function() {
					$mobileNavHeader.toggleClass('active');
					if($mobileNavHeader.hasClass('active')) {
						$navClose.text('-');
						$department.slideDown(100);
					}
					else {
						$navClose.text('+');
			  $department.slideUp(100);
					}
				});
			}

			$('.department').find('a.level-3').each(function(){
				$(this).click(function(e){
					if (
						($cache.body.hasClass('mobile')) &&
						($(this).siblings('.flyout').length > 0) &&
						$(this).parent().hasClass('active') == false
					){
						e.preventDefault();
						$(this).after('<span class="nav-close">-</span>');
						$(this).siblings('.nav-close').click(function(){
							$(this).parent().removeClass('active');
							$(this).siblings('.flyout').slideUp(100);
							$(this).remove();
						});

						$(this).parent().addClass('active');
						$(this).siblings('.flyout').slideDown(100);
					}
				});
			});

			updateNavTypes();

		}
	};




}(window.app = window.app || {}, jQuery));

/*
// app.storefront
(function (app, $) {
	var $cache = {
		body : $('body')
	};

	function loadFullStorefront() {
		// incase we are responding from mobile ui
		$cache.body.removeClass('homepage-mobile')


		if( $cache.body.hasClass('homepage-full') ) {
			// homepage is proccessed
		}
		else {
			// set up homepage
			$.ajax({
				url: app.urls.homeFull,
				success: function(data) {
					$('#storefront-content').html(data);
					app.quickView.initializeButton($('.theater'), ".product-image");
					$('body').addClass('homepage-full');
				}
			});
		}

	}

	function loadMobileStorefront() {
		// incase we are responding from full ui
		$cache.body.removeClass('homepage-full')


		if( $cache.body.hasClass('homepage-mobile') ) {
			// homepage is proccessed
		}
		else {
			// set up homepage

			$.ajax({
				url: app.urls.homeMobile,
				success: function(data) {
					$('#storefront-content').html(data);
					$('body').addClass('homepage-mobile');
				}
			});

		}
	}

	app.storefront = {

		init : function () {
			if( $('#storefront-content').size() !== 0 ){

				if( $('body').width() < 768 ) {
					loadMobileStorefront();
				}
				else {
					loadFullStorefront();
				}

			}

		}
	};

}(window.app = window.app || {}, jQuery));*/


// app.tooltips
(function (app, $) {
	var $cache = {};
	app.tooltips = {

		init : function () {

			$('.tooltip').tooltip({
				track: true,
				showURL: false,
				bodyHandler: function() {
					// add a data attribute of data-layout="some-class" to your
					// tooltip-content container if you want a custom class
					var tooltipClass = "";
					if( tooltipClass = $(this).find('.tooltip-content').data("layout") ) {
						tooltipClass = " class='" + tooltipClass + "' ";
					}
					return "<div " + tooltipClass + ">" + $(this).find('.tooltip-content').html() + "</div>";
				},
				showURL: false
			});
			$('.tooltip').on('click',function(e){
				e.preventDefault();
				$(this).mouseover();
			});
		}
	};

}(window.app = window.app || {}, jQuery));


//app.storeavailability
(function (app, $) {
	var postData;
	
	function openStoreModal(zip, products, limit, onlyShowInStock, callback) {		
		var self = this;
		products = formatProduct(products);
		
		if(!products.length) { return; }
		
		limit = limit || 10;
		onlyShowInStock = onlyShowInStock || false;
		
		postData = { products: JSON.stringify(products), limit: limit, onlyShowInStock: onlyShowInStock };
		if(zip) { postData['zip'] = zip; }
		
		app.dialog.open({
			url: app.urls.storeAvailability,
			data: postData,
			options: {
				closeIcon: true,
				title: "Store Availability",
				beforeClose: function() { handleZipFromPDPStoreModal(zip); }
			},
			callback: function(){
				initializeEvents();
				callback.call(self, products, zip, limit);
			}
		});
	}
	
	function refreshData(){
		$.ajax({
			url: app.urls.storeAvailability,
			type: 'POST',
			dataType: 'html',
			data: postData
		})
		.done(function (data) {
			$('#dialog-container').html(data);
		});
	}
	
	function formatProduct(product) {
		if(typeof product === 'object' && Object.prototype.toString.call( product ) !== '[object Array]') {
			return [product];
		} else if(typeof product === 'string' || typeof product === 'number') {
			return formatProduct(getProductItem(product));
		} else {
			return product;
		}
	}
	
	function handleZipFromPDPStoreModal(zip) {
		if(zip === app.customer.zip || app.page.ns !== 'product') {
			return;
		}
		
		window.location.reload();
	}
	
	function getProductItem(sku, qty) {
		return { ID: sku, qty: qty || 1 };
	}
	
	function initializeEvents(){
		$('#dialog-container').off('click', '**')
		.on('click', '#showallinv-checkbox', function () {
			postData.onlyShowInStock = $(this).is(':checked');
			refreshData();
		})
		.on('click', '#avail-change-zip, #avail-cancel-zip', function (e) {
			e.preventDefault();
			$('#avail-zip-container').toggleClass('change');
		})
		.on('keyup', '#avail-zip-input', function (e) {

			var isZipValid = app.validator.regex.postal.us.test($(this).val()),
				$saveEl = $('#avail-save-zip');

			if(isZipValid) {
				$saveEl.removeAttr('disabled').removeClass('disabled');
			} else {
				$saveEl.attr('disabled', 'disabled').addClass('disabled');
			}
		})
		.on('click', '#avail-save-zip', function (e) {
			e.preventDefault();		
			
			var zip = getZipFromField($('#avail-zip-input'));
			if(!zip) { return; }
			
			postData.zip = zip;
			app.util.setCustomerZip(zip);
			refreshData();
		})
		.on('click', '#avail-geolocate', function (e) {
			e.preventDefault();
			
			getLocationData(true).done(function(data) {
				postData.zip = data[0].zip;
				app.util.setCustomerZip(data[0].zip);
				refreshData();
			})
			.always(function () { $('#avail-zip-container').toggleClass('change'); });
		})
		.on('click', '.flip-trigger', function () {
			$(this).parents('.flip-container').toggleClass('is-flipped');
		});
	}
	
	function getZipFromField($ele) {
		var zip = $ele.val();
		
		if(!zip || !$ele.valid()) { return false; }
		
		return zip;
	}
	
	app.storeavailability = {
		openStoreModal: openStoreModal,
		getProductItem: getProductItem
	};
	
}(window.app = window.app || {}, jQuery));

// app.storeTools
(function (app, $) {

	/** ************* private vars and functions ************** */

	var $cache = {};
	var pid = null;
	var currentTemplate = $('#wrapper.pt_cart, #wrapper.pt_checkout').length ? "cart" : "pdp";
	var currentTemplateModal = false;
	var productSetTemplate = $('.product-col-2').hasClass('product-set');// checking
																			// if
																			// product
																			// set
																			// page.

	function initializeCache() {

		$cache = {
			preferredStorePanel : $('<div id="preferred-store-panel"/> '),
			storeList : $('<div class="store-list"/>')
		};

	}

	function initializeDom() {
		var productSetPage = (($('#product-set-list').length == 0) ? false : true);

		// update online availability
		/*
		$('#product-content').find('span.online-avail-msg').each(function(){
			app.storeTools.getOnlineAvailabilityExt($(this).data('pid'), $(this),false);
		});
		*/
		$('#cart-table').find('span.online-avail-msg').each(function(){
			getOnlineAvailability($(this).data('pid'), $(this));
		});

		// check for items that trigger dialog
		// Added more concrete class .pt_cart in order to avoid this call on
		// single shipping page
		$('#product-content, #cart-table, #product-set-list, #productset-content').find('.set-preferred-store').each(function(){

			// on pdp & zip is in session and not on ProductSet
			if( currentTemplate === 'pdp' && app.customer.zip != null) {
				if(!$(this).hasClass('dropdown-menu-details')){// not store
																// pick up drop
																// down.
					pdpProductStoreAvailability($(this).attr('rel'));
				}else{
					$('.productAvailability').show();
					$('.availability-block').show();
				}

			}

			// on cart & storeId in session
			if( currentTemplate === 'cart' && app.user.storeId !== 'null') {
				$(this).text('Change');
			}

			// open dialog on click
			$(this).on('click', function(e){
				e.preventDefault();
				if(!productSetPage){
					loadPreferredStorePanel($(this).parent().attr('rel'));
				}else{
					loadPreferredStorePanel($(this).attr('rel'));
				}

			});
		});

		if(productSetPage){
			pdpProductStoreAvailability();
		}else{
			$('.productAvailability').show();
			$('.availability-block').show();
		}
	}
	
	function initializeEvents() {
	
		$(".setreminder").on('click', function(){
			$('html, body').animate({
				scrollTop: $(".product-set-details").offset().top-150
			}, 2000);
		});

		$(".top_bar .store_container a").on('click', function(e){
		  e.preventDefault();
		  showPreferredStoreDialog();
		});
		
		//Availability Modal on PDP/Set Page
		$('#pdpMain').on('click', '.change-store-panel', function(e) {
			e.preventDefault();
			
			var limit = 10,
				zip = app.customer.zip,
				onlyShowInStock = false,
				productItem = app.storeavailability.getProductItem($(this).data('pid'));
				
			if(app.customer.device === 'mobile') {
				limit = 5;
			}
			
			app.storeavailability.openStoreModal(zip, productItem, limit, onlyShowInStock, pickupItemFromPDP);
		});
	}
	
	// Callback event handler for availability modal
	function pickupItemFromPDP(product) {
		$(document).off('click', '#availability-modal .card-primary-btn')
		.on('click', '#availability-modal .card-primary-btn', function (e) {
			var storeid = $(this).data('storeid'),
				pid = product[0].ID,	//Refactor PID retrieval when store availability consumes multiple items
				$addToCart = $('.add-to-cart-block.' + pid + ' .add-to-cart').first();
			
			$('.storeIDHidden').val(storeid);
			setPreferredStore(storeid, pid);
			$addToCart.click();
			app.dialog.close();
		});
	}
	
	function showPreferredStoreDialog() {
		// clear any previous results
		$cache.preferredStorePanel.empty();
		
		if (!app.customer.zip) {
			app.customer.zip = app.customer.getPostalCode();
		}

		// show form if no zip set
		
		var topHTML = '<div class="searchform"><span><input type="text" id="userZip" placeholder="Enter City or Zip" /></span><button id="set-user-zip" class="primary button" disabled="disabled">Find Stores</button></div>';

		if(app.customer.zip != null){
			topHTML = '<div class="searchform"><span><input type="text" id="userZip" placeholder="'+app.customer.zip.split('-')[0]+'" value="'+app.customer.zip.split('-')[0]+'"/></span><button id="set-user-zip" class="primary button" disabled="disabled">Find Stores</button></div>';
			displayNearestStores(app.customer.zip.split('-')[0]);
		}		

		$cache.preferredStorePanel
		.append(topHTML)
		.find('#set-user-zip')
		.click(function(){
			var zipCodePattern = /^(\d{5})(-\d{4})?$/;
			var enteredZip = $('#userZip').val();
			if( zipCodePattern.test(enteredZip) ) {
				// good zip
				app.user.setUserZip(enteredZip);
				displayNearestStores(enteredZip);
			}
			else {
				// bad zip
			}
		});
		$cache.preferredStorePanel.find('#userZip').keypress(function(e) {
			if( $(this).val() === 'Enter City or Zip' ) {
				$(this).val('');
			}

			code = e.keyCode ? e.keyCode : e.which;
			if(code.toString() == 13) {
				$cache.preferredStorePanel.find('#set-user-zip').trigger('click');
			}
		});

		// clear any on-page results
		$('div.store-stock ul.store-list').remove();

		// store search tools, used in global header
		app.storeTools.selectStore( $cache.preferredStorePanel.find('#userZip') );

		// open the dialog
		$cache.preferredStorePanel.dialog({
			width: 675,
			height: 545,
			modal: true,
			position: ["center", 50],
			title: 'Choose Your Store',
			closeText: ''
		});

		$('input, textarea').placeholder();

		// action for close/continue
		$('button.close').click(function(){
			$cache.preferredStorePanel.dialog("close");
		});

		$(document).on('click', '.ui-widget-overlay', function () {
			$(".ui-dialog-titlebar-close", $(this).prev()).trigger('click');
		});

	}

	function displayNearestStores (zip){
		$.ajax({
			url: app.urls.storeFindFromNav,
			type: "POST",
			data: { ajax: "true", dwfrm_storelocator_postalCode : zip }
		}).done(function(stores) {
			$cache.storeList.empty();
			if(stores.length > 0){

				for( var i = 0; i < stores.length; i++){

					var store_list = '<div class="store_node">';
					store_list = store_list + '<div class="store_info_left"><div class="small_black_font">' + stores[i].distance + '</div></div>';
					store_list = store_list + '<div class="store_info_right"><div class="address_font">' + '<span class="store-tile-name" title="Pier 1 Imports Store #' + stores[i].id + '">' + stores[i].name + '</span>' + '<br>' + stores[i].address + '<br>' + stores[i].city + ', ' + stores[i].state + ' ' + stores[i].postalcode + '<br>' + stores[i].phone + '</div></div>';
					store_list = store_list + '<div class="store_info_bottom"><div class="preferred_store_font">';
					if(stores[i].preferred == true){
						store_list = store_list + 'Your Preferred Store';
					}else{
						store_list = store_list + '<div class="preferred_store_button primary mini button" id="' + stores[i].id + '">Set Preferred Store</div>';
					}
					store_list = store_list + '</div></div>';
					store_list = store_list + '</div>';


					$cache.storeList.addClass('find_store_list');
					$cache.storeList.append(store_list);
				}



				$cache.storeList.delegate(".preferred_store_button", "click", function() {

					$.ajax({
						type: "POST",
						url: app.urls.setPreferredStore,
						data: { storeId : this.id, userSelected : true }
					})
					.done(function() {
						location.reload();
					});
				});

			}else{
				$cache.storeList.append("<div>No results found.</div>");

			}

			$cache.preferredStorePanel.append($cache.storeList);
		});





	}


	function getOnlineAvailability (pid, target) {

			$.getJSON(
				app.util.appendParamsToUrl(app.urls.getAvailability , {pid:pid}),
				{
					format: "json"
				},
				function(data){
					if(data) {
						var status = data.status.toLowerCase();
						if(status === "not_available"){ status = "Store Pickup Only";}
						target.html('<div class="store-status ' + status.replace(/_/g,'-') + '">' + status.replace(/_/g,' ') + '</div>');
					}
					// no records
					else {

					}
				}
			)
			.success(function (){})
			.error(function (){})
			.complete(function(){});

	}

	function updateTile(pid) {

		app.ajax.getJson({
			url: app.util.appendParamsToUrl(app.urls.storesInventory , {pid:pid, zipCode:app.customer.zip}),
			callback: function(data){
				/*
				 * if((typeof $('#'+pid).get(0).tagName.toLowerCase() !==
				 * 'undefined') && ($('#'+pid).get(0).tagName.toLowerCase() !=
				 * 'button')){//prevent product set button from being populated
				 * with below html. if(data && data.length > 0) { for (var i=0;
				 * i < 3 && i < data.length; i++) { var item=data[i]; var status =
				 * data[i].status.toLowerCase(); var zip =
				 * item.postalCode.split('-'); $('#'+pid).append( '<div
				 * class="tile-store-avail">' + '<span class="address">' +
				 * item.address1 + '<br />' + item.city + ', ' +
				 * item.stateCode + ' ' + zip[0] + '</span>' + '<div
				 * class="store-status ' + status.replace(/ /g,'-') + '">' +
				 * status + '</div>' + '</div>'); } $('#'+pid).append('<span
				 * class="label">See more stores</span>'); } // no records else {
				 * $('#'+pid).append('<span class="label
				 * set-preferred-store">Check store availability</span>'); } }
				 */
			}
		});
	}

	function setPreferredStore(id, pid) {
		app.user.storeId = id;
		
		var zip = app.customer.zip;
		var $yourStore = $('.your-store');
		
		$.ajax({
			type: "POST",
			url: app.urls.setPreferredStore,
			data: { storeId : id, userSelected : true }
		})
		.done(function(response) {
		 	$yourStore.html(app.resources.YOUR_STORE + response[0].storeName.substring(0,20));
		 	
		 	//Custom Event Handler to execute update header logic in app.mobile		 	
			$.event.trigger({ type: 'updateStoreHeader', zip: zip });
		 })
		.always(function() {
			//Update availability messaging on PDP and Product Set pages
			app.user.updateAvailabilityMessaging(zip);
		})
		.fail(function() {
			$yourStore.html(app.resources.YOUR_STORE + id);
		});
		
		$('.your-store-anchor').html(app.resources.YOUR_STORE_ANCHOR + ' &#x25BC;');
	}

	function bubbleStoreUp (list, id) {

		var preferredEntry = list.find('li.store-'+id).clone();

		list.find('li.store-'+id).remove();
		list.prepend(preferredEntry);

	}

	function pdpProductStoreAvailability(pid, modalButton){// modalButton is a
															// store number from
															// the select store
															// Modal. This is
															// undefined if not
															// coming from a
															// Modal.
		var productSets = $('#product-set-list'),
			productSetPage = ((productSets.length == 0) ? false : true),
			prductSetItems = productSets.find('.product-set-item');
	}

	function buildStoreList(pid, shipmentID, pliUUID) {
		if($("#checkall").is(':checked') || shipmentID){
			checkAll = true;
		} else {
			checkAll = false;
		}
		// alert(checkAll);

		if(typeof pid === 'undefined' && typeof shipmentID === 'undefined'){
			pid = $('#pid').val();
		}
		// request results from server
		app.ajax.getJson({
			url: app.util.appendParamsToUrl(app.urls.storesInventory , {pid:pid, zipCode:app.customer.zip, allItems:checkAll, shipmentID:shipmentID }),
			callback: function(data) {

				// clear any previous results, then build new
				$cache.storeList.empty();
				var listings = $("<ul class='store-list'/>");

				if(data && data.length > 0) {
					var resultsObj=data[0]; // only one result object that
											// contains product and stores.
					var results = resultsObj.results;
					var productObj = results.product;
					var product = productObj[0];  // This is what you use to
													// display product data.
													// product.imageURL,
													// product.productName,
													// product.productId
					var storesObj = results.stores;
					var basketObj = results.basket;
					
					var $ctnr = $('#cart-table').find('.basketitem[data-uuid="' + pliUUID + '"]');
					var prevShipMethod = $ctnr.attr('data-shipmethod');
					var currShipMethod = $ctnr.find('.option-pickup').val() || '004';//Shipping Method not returned in feed if pickup is unavailable.
					var itemQty = $ctnr.find('input.qtyInput').val();
					
					if(storesObj.length == 0){
						// no stores have this zipcode. display error
						listings.append('<li class="">No stores found for this zipcode.</li>');
					}
					else{
						if(currentTemplate === 'cart') {
							// cart information goes here
							var midrowLength = $('.midrow').length;

							if(midrowLength > 1){
								if($("#checkall").length == 0){
									$(".searchform").append('<input type="checkbox" id="checkall"><label for="checkall">Find stores that have stock for all items in your basket</label>');
									if(checkAll == true) {
										$("#checkall").attr('checked','checked');
									} else {
										$("#checkall").attr('checked', false);
									}
								}
							}
							if($("#ProductInfoWrapper").length == 0 && checkAll){
								$(".searchform").before('<div id="ProductInfoWrapper" />');
							}else if(!checkAll){
								$("#ProductInfoWrapper").remove();
							}
							if(checkAll){
								var basketList = '';
								for(var i = 0; i < basketObj.length; i++){
									var basketItem = basketObj[i].productid[0];
									basketList += '<div class="productinfo">' +
										'<div class="productimage"><img src="' + basketItem.imageURL + '"/>' + '</div>'+
										'<div class="productdetails"><span class="name">' + basketItem.productName + '</span><span class="qty">Quantity: ' + basketItem.qty + '</span><br/>' +
										'Item no.:' + basketItem.productId +
										'</div></div>';
								}
								$('#ProductInfoWrapper').html(basketList);
							} else {
								if($(".productinfo").length < 1){
									$('#ui-dialog-title-preferred-store-panel').parent().css('border','none');
									$(".searchform").before('<div id="ProductInfoWrapper" />');
									var productList = '<div class="productinfo">' +
										'<div class="productimage"><img src="' + product.imageURL + '"/>' + '</div>'+
										'<div class="productdetails"><span class="name">' + product.productName + '</span><br/>' +
										'Item no.:' + pid  +'</div></div>';
									}
								$('#ProductInfoWrapper').html(productList);

							}

							$("#checkall").on("click", function(){
								if ($(this).is(':checked')) {
									checkAll = true;
									// loadPreferredStorePanel(pid)
									buildStoreList(pid, shipmentID, pliUUID);
								} else {
									checkAll = false;
									$("#set-user-zip").click();
									loadPreferredStorePanel(pid, shipmentID, pliUUID);
								}
							});
						} else {
							if($(".productinfo").length < 1){
								$('#ui-dialog-title-preferred-store-panel').parent().css('border','none');
								$("#preferred-store-panel").prepend('<div class="productinfo">' +
									'<div class="productimage"><img src="' + product.imageURL + '"/>' + '</div>'+
									'<div class="productdetails"><span class="name">' + product.productName + '</span><br/>' +
									'Item no.:' + pid );
							}
						}
						for (var i=0; i < 10 && i < storesObj.length; i++) {
							var item=storesObj[i];
								// list item for cart
							
							var storeName = item.storeName;
							/* removing this check and added to server-side
							if(typeof item.storeDescription === 'string'){
								storeName = item.storeDescription;
							}
							*/
							
							if(checkAll){
								var listing = '<li class="store-' +item.storeId +' store-tile">' + '<div class="col1">';
								
								if(item.allInStock || (item.anyInStock && !item.allOutOfStockAreReservable)){
									listing += '<span class="store-quantity">' + item.status + '</span>';
									var pickupDisabled = item.allInStock ? false : true;
								}else if(item.allOutOfStockAreReservable){
									listing += '<span class="store-quantity">Ship to Store</span>';
									listing += '<div class="reserveMsg">Available in ' + item.reserveTime + '</div>';
									var pickupDisabled = false;
								}else{
									listing += '<span class="store-quantity unavailable">Unavailable</span>';
									var pickupDisabled = true;
								}
								listing += '<button value="'+ item.storeId + '" class="pickup mini primary button' + (pickupDisabled ? ' disabled' : '') + '"' + (pickupDisabled ? ' disabled="disabled"' : '') + '>Pick Up Here</button>';
							}
							else{
								if(item.preorderable){
									item.status = '<span class="store-quantity unavailable">Preview</span>';
								}else if(item.reservePurchase && item.quantity == 0 && item.reserveQty > 0){
									item.status = '<span class="store-quantity">Ship to Store</span>';
								}else if(item.backorderable){
									item.status = '<span class="store-quantity unavailable">Backorder</span>';
								}else if(item.quantity == 0 && item.arrivingSoon){
									item.status = '<span class="store-quantity more-on-way">More on the way</span>';
								}else if(item.quantity == 0){
									item.status = '<span class="store-quantity unavailable">Unavailable</span>';
								}else if(item.status == "Not Available" || item.status == "Unavailable" || item.status == "Out of Stock"){
									item.status = '<span class="store-quantity unavailable">Unavailable</span>';
								}else if(item.status.toLowerCase().indexOf(" of ") != -1){
									item.status = '<span class="store-quantity unavailable">'+item.status+'</span>';
								} else {
									item.status = '<span class="store-quantity">' + item.quantity + ' Available Today</span>';
								}
	
								var tipTxt = 'This item is a display unit. Please call to check its condition.';
								var itemqty = '<span class="store-quantity">'+ item.quantity + ' Available Today</span>';
								itemqty += item.quantity != 1 ? '' : '<a class="question-details" title="' + tipTxt + '"></a>';
							
								if(item.reservePurchase && item.quantity == 0){
									itemqty = '<span class="store-quantity">Ship to Store</span>';
								}else if(item.backorderable){
									itemqty = '<span class="store-quantity unavailable">Backorder</span>';
								}else if(item.preorderable){
									itemqty = '<span class="store-quantity unavailable">Preview</span>';
								}else if(item.quantity == 0){
									itemqty = '<span class="store-quantity unavailable">Unavailable</span>';
								}
							
								var reservePurchase = document.getElementById("_reservePurchase");
								var listing = '<li class="store-' +item.storeId +' store-tile">' + '<div class="col1">' + item.status;
								
								var reserveMsg = '';
								if (item.reservePurchase)
									var dispRedQty = String(item.reserveQty);
									if (item.reserveQty > 20){
										dispRedQty = "20+";
									}
									reserveMsg = dispRedQty + ' avail. in ' + item.reserveTime;
									if(item.quantity > 0){
										reserveMsg += '<br/>with <b>Ship to Store</b>';
									}
							
								if(item.quantity == 1 && item.reserveQty == 0 && item.reservePurchase){
									listing = listing + '<div class="reserveMsg">This may be on display</div>';
									listing = listing + '<button value="'+ item.storeId + '" class="pickup mini primary button' + (product.inStoreOnly ? ' disabled' : '') + '"' + (product.inStoreOnly ? ' disabled="disabled"' : '') + '>Pick Up Here</button>';
								} else if (item.preorderable == true && item.inStockDate != null && item.inStockDate != ""){
									listing = listing + '<br/><br/><span class="preorder">' + app.resources.TO_GO_MESSAGE + ' ' + item.inStockDate + '</span>';
								} else if (item.reservePurchase == true && item.reserveQty > 0){
									listing = listing + '<div class="reserveMsg">' + reserveMsg + '</div>';
									listing = listing + '<button value="'+ item.storeId + '" class="pickup mini primary button' + (product.inStoreOnly ? ' disabled' : '') + '"' + (product.inStoreOnly ? ' disabled="disabled"' : '') + '>Pick Up Here</button>';
								} else if (item.status.match(/more on the way/i)) {
									listing = listing + '<button value="'+ item.storeId + '" class="pickup mini primary button disabled" disabled="disabled">Pick Up Here</button>';
								} else {
									listing = listing + '<button value="'+ item.storeId + '" class="pickup mini primary button' + (product.inStoreOnly ? ' disabled' : '') + '"' + (product.inStoreOnly ? ' disabled="disabled"' : '') + '>Pick Up Here</button>';
								}
							}
							
							/*
							 * if (item.reservePurchase == true && item.quantity ==
							 * 0){ listing = listing + '<span
							 * class="store-title-call">Call for details</span>';
							 * }else if(item.preorderable == true &&
							 * item.inStockDate != null && item.inStockDate !=
							 * ""){ listing = listing + '<br/><br/><span
							 * class="preorder">' + app.resources.TO_GO_MESSAGE + ' ' +
							 * item.inStockDate + '</span>'; }else{ listing =
							 * listing + '<button value="'+ item.storeId + '"
							 * class="pickup mini primary button "' +
							 * ((product.inStoreOnly || (item.arrivingSoon &&
							 * item.quantity == 0)) ? ' disabled' : '') + '>Pick
							 * Up Here</button>'; }
							 */
							
							listing = listing + '</div><div class="col2">' +
								'<span class="store-tile-name" title="Pier 1 Imports Store #' + item.storeId + '">' + storeName + '</span>' +
								'<span class="store-tile-address ">' + item.address1 + '</span>' +
								'<span class="store-tile-city ">' + item.city + '</span>' +
								'<span class="store-tile-state ">, ' + item.stateCode + '</span>' +
								//'<span class="store-tile-postalCode "> ' + item.postalCode + '</span>' +
								'<span class="store-tile-phone ">' + item.phone + '</span>' +
								'<span class="store-location">' + item.distance + ' miles away</span>' +
								'</div></li>';							
							
							listings.append(listing);
						}
					}
				}
				// no records
				else {
					if(app.customer.zip != null){
						$cache.storeList.append("<div class='no-results'>No Results</div>");
						toggleAddToCartButton(pid);
					}
				}

				// check for preferred store id, highlight, move to top
				// if( currentTemplate !== 'cart' ) {
					var selectedButtonText = 'My Preferred Store';
				// }
				listings
					.find('li.store-'+app.user.storeId)
						.addClass('selected')
						.find('button.select-store-button')
						.addClass('mystore')
							.text(selectedButtonText);
				bubbleStoreUp(listings,app.user.storeId);

				// if there is a block to show results on page (pdp)
				if( currentTemplate !== 'cart' ) {
					var onPageList = listings.clone();
				}

				// update panel with new list
				listings.appendTo($cache.storeList);
				if(currentTemplate === 'cart') {
					$('.store-list li .unavailable').siblings('.select-store-button').attr('disabled','disabled').addClass('disabled');
				}
				$('.store-list li .unavailable').siblings('.pickup').attr('disabled','disabled').addClass('disabled');
				toggleAddToCartButton(pid);

				// set up 'set preferred store' action on new elements
				listings.find('button.select-store-button').click(function(e){
					var selectedStoreId = $(this).val();
					if(currentTemplate === 'cart') {
						setPreferredStore(selectedStoreId);
						var onCartList = listings.clone();
						bubbleStoreUp (onCartList, selectedStoreId);
						pdpProductStoreAvailability(pid);
						$('.store-list').removeClass('selected').addClass('extended-list').find('button.select-store-button').removeClass('mystore').text('Set As Preferred Store');
						$('.store-list li.store-'+selectedStoreId+' button.select-store-button').text('My Preferred Store').addClass('mystore').parent().addClass('selected').removeClass('extended-list');
						updateTile(pid);
						if(pliUUID){ // on multiship setting store and moving
										// one PLI into a new shipment
							window.location = app.util.appendParamsToUrl(app.urls.multiShippingSetStoreId, {storeId:selectedStoreId,pliuuid:pliUUID});
						} else if(shipmentID){ // on multiship setting a new
												// store and setting all PLIs in
												// shipment to use the new store
							window.location = app.util.appendParamsToUrl(app.urls.multiShippingSetStoreId, {storeId:selectedStoreId,shipmentID:shipmentID});
						} else { // on cart page setting a store and
									// assigning one product to use that store
							window.location = app.util.appendParamsToUrl(app.urls.setStoreIdCart, {storeId:selectedStoreId,pid:pid});
						}
						return;
					}

					if( app.user.storeId !== selectedStoreId ) {
						// pdpProductStoreAvailability(pid);

						$('.store-list').removeClass('selected').addClass('extended-list').find('button.select-store-button').removeClass('mystore').text('Set As Preferred Store');
						$('.store-list li.store-'+selectedStoreId+' button.select-store-button').text('My Preferred Store').addClass('mystore').parent().addClass('selected').removeClass('extended-list');

						// updateTile(pid);
						$(this).parents('li').find('.pickup').click();

						// $cache.preferredStorePanel.dialog("close");
						// set as selected
						setPreferredStore(selectedStoreId);
						bubbleStoreUp (onPageList, selectedStoreId);
					}
				});
				//Create tooltip for store-name hover event
				/* $('.store-list').find('.store-tile-name').each(function(){
					$(this).qtip({
						content: $(this).siblings('.store-tooltip-content'),
						position: {
							my: 'bottom middle',
							at: 'top left'
						},
						style: {
							width: 145
						},
						show: {
							event: "hover",
							solo: true
						},
						hide: { when: { event: 'unfocus'} }
					});
				}); */
				
				$('.pickup').click(function(e){
					var selectedStoreId = $(this).val();
					e.preventDefault();

					if(app.page.type.toLowerCase()==='cart'||app.page.type.toLowerCase()==='checkout') {

						if (pliUUID && selectedStoreId) {
							var params = {
								uuid: pliUUID,
								qty: itemQty,
								storeid: selectedStoreId,
								previousshipmethod: prevShipMethod,
								shipmethod: currShipMethod,
								refresh: true
							};
							
							$.event.trigger({
								type: 'lineItemChange',
								params: params,
								callback : function() {
									setPreferredStore(selectedStoreId);
									$cache.preferredStorePanel.dialog("close");
								}
							});
						}

					}
					else {

						var $this = $(this),
							storeNumber = $this.val();

						if(!$this.siblings('.store-quantity').hasClass('unavailable')){

							if($('#add-to-cart').length > 0){
								$('.storeIDHidden').val(storeNumber);
								if(!$("#add-to-cart").is(":disabled")){
								$('#add-to-cart').click();
								}
							}else{
								$('.storeIDHidden').val(storeNumber); // Set
																		// all
																		// hidden
																		// store
																		// ids
																		// to
																		// this
																		// store,
																		// just
																		// in
																		// case
																		// they
																		// are
																		// pulled
																		// into
																		// the
																		// form

								$('#' + pid).siblings('.storeIDHidden').val(storeNumber).end().click();
							}

							if( app.user.storeId !== selectedStoreId ) {

								$('.store-list').removeClass('selected').addClass('extended-list').find('button.select-store-button').removeClass('mystore').text('Set As Preferred Store');
								$('.store-list li.store-'+selectedStoreId+' button.select-store-button').text('My Preferred Store').addClass('mystore').parent().addClass('selected').removeClass('extended-list');
								
								setPreferredStore(selectedStoreId, pid);
								
								// set as selected
								bubbleStoreUp (onPageList, selectedStoreId);
							}

							pdpProductStoreAvailability(pid, storeNumber);
							$cache.preferredStorePanel.dialog("close");
						}
					}
				});

				if ($.fn.qtip) { 
					$(".question-details").qtip({
						 position: {
								my: 'top left',
								at: 'bottom right'
							}
					});
				}

				if($('.product-set-item').length > 0 && productSetTemplate){// product
																			// sets
					for(var i = 0; i < $('.product-set-item').length; i++){
						var item = $($('.product-set-item')[i]),
							itemStock = item.find('.store-list').find('li.selected').find('span.in-stock').length,// checking
																													// for
																													// instock
							itemNumber = item.find('input[name="pid"]').val();

						// Check Productset Online availability
						// app.storeTools.getOnlineAvailabilityExt(itemNumber, $('#store-avail-' + itemNumber), true);

					}
				}


			} // end ajax callback
		});
	}

	function loadPreferredStorePanel (pid, shipmentID, pliUUID) {

		// clear any previous results
		$cache.preferredStorePanel.empty();
		
		if (!app.customer.zip) {
			app.customer.zip = app.customer.getPostalCode();
		}

		// show form if no zip set
		if(!app.customer.zip) {
			$cache.preferredStorePanel
			.append('<div class="searchform"><span><input type="text" id="userZip" placeholder="Enter City or Zip" /></span><button id="set-user-zip" class="primary button" disabled="disabled">Find Stores</button></div>')
			.find('#set-user-zip')
			.click(function(){
				var zipCodePattern = /^(\d{5})(-\d{4})?$/;
				var enteredZip = $('#userZip').val();
				if( zipCodePattern.test(enteredZip) ) {
					// good zip
					app.user.setUserZip(enteredZip);
					loadPreferredStorePanel(pid, shipmentID, pliUUID);
				}
			});
			$cache.preferredStorePanel.find('#userZip').keypress(function(e) {
				if( $(this).val() === 'Enter City or Zip' ) {
					$(this).val('');
				}

				code = e.keyCode ? e.keyCode : e.which;
				if(code.toString() == 13) {
					$cache.preferredStorePanel.find('#set-user-zip').trigger('click');
				}
			});

			// clear any on-page results
			$('div.store-stock ul.store-list').remove();

			if(pid){
				toggleAddToCartButton(pid);
			}

			// store search tools, used in global header
			app.storeTools.selectStore( $cache.preferredStorePanel.find('#userZip') );

		}
		// zip is set, build list
		else {
			buildStoreList(pid, shipmentID, pliUUID);
			var searchFormHtml = '<div class="searchform"><span><input type="text" id="userZip" placeholder="'+app.customer.zip+'" value="'+app.customer.zip+'"/></span><button id="set-user-zip" class="primary button" disabled="disabled">Find Stores</button></div>';
			$('.searchform').remove();
			$cache.preferredStorePanel.append(searchFormHtml).find('#set-user-zip').click(function(){
				var zipCodePattern = /^(\d{5})(-\d{4})?$/;
				var enteredZip = $('#userZip').val();
				if( zipCodePattern.test(enteredZip) ) {
					// good zip
					app.user.setUserZip(enteredZip);
					if($("#checkall").attr("checked","checked")){
						checkAll = true;
					}else {
						checkAll = false;
					}
					loadPreferredStorePanel(pid, shipmentID, pliUUID);
				}
				else {
					// bad zip
				}
			});
			$cache.preferredStorePanel.find('#userZip').keypress(function(e) {
				if( $(this).val() === 'Enter City or Zip' ) {
					$(this).val('');
				}

				code = e.keyCode ? e.keyCode : e.which;
				if(code.toString() == 13) {
					$cache.preferredStorePanel.find('#set-user-zip').trigger('click');
				}
			});

			// clear any on-page results
			$('div.store-stock ul.store-list').remove();
			toggleAddToCartButton(pid);

			// store search tools, used in global header
			app.storeTools.selectStore( $cache.preferredStorePanel.find('#userZip') );
			$cache.preferredStorePanel.append($cache.storeList);

		}


		// open the dialog
		$cache.preferredStorePanel.dialog({
			width: 675,
			height: 545,
			modal: true,
			position: ["center", 50],
			title: 'Store Availability',
			closeText: ''
		});

		// action for close/continue
		$('button.close').click(function(){
			/*
			 * if(currentTemplate === "cart") { window.location =
			 * app.util.appendParamsToUrl(app.urls.setStoreIdCart ,
			 * {storeId:app.user.storeId}) ; }
			 */
			$cache.preferredStorePanel.dialog("close");
		});
		
		$('input, textarea').placeholder();
	}

	function toggleAddToCartButton(pid){

		// check for store; in-stock, availToGo = true
		if( $('#store-avail-'+pid+' .preorder').size() !== 0) {
			if( $('span.in-stock.availToGo-true').size() !== 0 ) {
				$('.add-to-cart').removeAttr('disabled');
			}
			else {
				$('.add-to-cart').attr('disabled','disabled');
			}
		}

	}

	function getStoreCities (input) {

		var inputCounter = 1;

		input.each(function(){
			var inputId = $(this).attr('id');
			var inputName = $(this).attr('name');

			var hiddenField = document.createElement('input');
			$(hiddenField)
				.attr('type','hidden')
				.attr('id',$(this).attr('id'))
				.attr('name',$(this).attr('name'));

			$(this)
				.attr('id','auto-complete-label')
				.attr('name','auto-complete-label')
				.addClass('store-select-' + inputCounter)
				.after($(hiddenField))
				.keyup(function(e){
					var zipCodePattern = /^\d{5}(-\d{4})?$/;
					var enteredZip = $(this).val();
					if( zipCodePattern.test(enteredZip) ) {
						// good zip

						$(this).parent().siblings('button').removeAttr('disabled');
						$(this).siblings('input[type="hidden"]').attr('value',enteredZip);
					}
					else {
						// bad zip

						e.preventDefault();
						$(this).parent().siblings('button').attr('disabled','disabled');
					}
				})
				.keypress(function(e){

					$('.store-select-' + inputCounter).autocomplete({
						source: app.ui.citiesjsondata,
						minLength: 3,
						autoFocus: true,
						select: function( event, ui ) {
							$(this).siblings('input[type="hidden"]').attr('value',ui.item.id);
							$(this).parent().siblings('button').removeAttr('disabled').trigger('click');
						}
					});
					var keycode = (e.keyCode ? e.keyCode : e.which);
					if(keycode == 13) {
						var zipCodePattern = /^(\d{5})(-\d{4})?$/;
						var enteredZip = $(this).val();
						if( zipCodePattern.test(enteredZip) ) {
							// good zip
							$(this).parent().siblings('button').removeAttr('disabled');
							$(this).siblings('input[type="hidden"]').attr('value',enteredZip);
						}
						else {
							// bad zip
							e.preventDefault();
							$(this).parent().siblings('button').attr('disabled','disabled');
						}
					}
				});

		});
	}

	// Gets Status for PDP for store or online messaging.
	function getStatus(type, data){
		if(!data.status) return;
		// check for dynamic status with custom preorder/preview message
		if( data.status.search(app.resources.TO_YOU_MESSAGE) !== -1 || data.status.search(app.resources.TO_GO_MESSAGE) !== -1 ) {
			status = data.status;
			return status;
		}
		// clean up status for checks below
		var status = data.status.toLowerCase().replace(/_/g,' ').replace(/-/g,' ');

		// check for preorder flag in levels object
		if(data.levels) {
			if( data.levels.PREORDER > 0) {
				status = 'preorder';
			}
		}

		// get avail date if set
		var inStockDate = data.inStockDate ? data.inStockDate : '';
		if(inStockDate !== ''){
			inStockDate = inStockDate;
		}

		// check for dynamic status with store phone number
		if( status.search("please call") !== -1) {
			status = "call to confirm";
			// return status;
		}

		// check for isAvailablePier1ToYou - not avail online if so
		if( (type == 'online') && (data.isAvailablePier1ToYou === false) ) {
			status = 'Store Pickup Only';
			return status;
		}

		// check for pre-order items && is available To You
		if( (type == 'online') && (status === 'preorder') && (data.isAvailablePier1ToYou !== false) ) {
			status = '<span class="preorder">' + app.resources.TO_YOU_MESSAGE + ' ' + inStockDate + '</span>';
			// return status;
		}

		// check for pre-order items && is available To Go
		if( (type == 'store') && (status === 'preorder') && (data.isAvailablePier1ToGo !== false) ) {
			status = '<span class="preorder">' + app.resources.TO_GO_MESSAGE + ' ' + inStockDate + '</span>';
			return status;
		}

		// check for store in-stock, availToGo = true - override disabled button
		if( (type == 'store') && (status === 'in stock') && (data.isAvailablePier1ToGo !== false) ) {
			status = '<span class="availToGo-true">In Stock</span>';
			return status;
		}

		// check for store in-stock, availToGo = false
		if( (type == 'store') && (status === 'in stock') && (data.isAvailablePier1ToGo === false) ) {
			status = '<span class="in-stock availToGo-false">In Stock(Not available for Pier 1 To-Go)</span>';
			return status;
		}

		if((type == 'store') && data.onlineExclusive){
			status = '<span class="in-stock availToGo-false">Online Only</span>';
			return status;
		}

		if((type == 'store') && data.status == "Not Available" && data.arrivingSoon !== null){
			status = '<span class="store-tile-status onTheWay">More on the way to '+ data.city +' store</span>';
			return status;
		}

		switch (status) {

			case 'in stock' :
				status = '<span class="in-stock">In Stock</span>';
				break;

			case 'in stock (item may be on display)' :
				status= 'In Stock';
				break;

			case 'in stock (not available for pier 1 to go)' :
				status = '<span class="in-stock availToGo-false">In Stock(Not available for Pier 1 To-Go)</span>';
				break;

			case 'not available' :
				if(type === 'online') {
					status = '<span class="out-of-stock">Unavailable</span>';
				} else if(type === 'store') {
					status = 'Out of Stock at';
				}

				break;

			case 'out of stock' :
				if(type === 'online') {
					status = '<span class="out-of-stock">Unavailable</span>';
				} else if(type === 'store') {
					status = 'Out of Stock at';
				}
				break;

			case 'call to confirm' :
				status = 'Available for Order in Store';
				break;

			case 'arriving soon' :
				status = 'Arriving Soon';
				break;

			case 'preorder' :
				status = '<span class="preorder">Preorder</span>';
				break;

		}

			return status;

	}

	function formatStatus(type, data ) {

		if(!data.status) return;

		// check for dynamic status with custom preorder/preview message
		if( data.status.search(app.resources.TO_YOU_MESSAGE) !== -1 || data.status.search(app.resources.TO_GO_MESSAGE) !== -1 ) {
			status = data.status;
			return status;
		}

		// clean up status for checks below
		var status = data.status.toLowerCase().replace(/_/g,' ').replace(/-/g,' ');

		if (status == "in stock") {
			  // we need to check that there is actually ats inventory
				  if (data.ats < 1) {
					  status = '<span class="out-of-stock outOfStock">Currently out of stock</span>';
				   return status;
		   }
		}

		// check for preorder flag in levels object
		if(data.levels) {
			if( data.levels.PREORDER > 0) {
				status = 'preorder';
			}
		}

		// get avail date if set
		var inStockDate = data.inStockDate ? data.inStockDate : '';
		if(inStockDate !== ''){
			inStockDate = inStockDate;
		}

		// check for dynamic status with store phone number
		if( status.search("please call") !== -1) {
			status = "call to confirm";
			// return status;
		}

		if((type == 'online') && (typeof data.levels !== 'undefined') && (data.levels.ARRIVING_SOON > 0) && (data.levels.IN_STOCK == 0)){
			status = '<span class="store-tile-status onTheWay">More on the way</span>';
			return status;
		}

		// check for isAvailablePier1ToYou - not avail online if so
		if( (type == 'online') && (data.isAvailablePier1ToYou === false) && (data.isHomeDeliverable === false)) {
			status = 'Store Pickup Only';
			return status;
		}

		// check for pre-order items && is available To You
		if( (type == 'online') && (status === 'preorder') && (data.isAvailablePier1ToYou !== false) ) {
			status = '<span class="preorder">' + app.resources.TO_YOU_MESSAGE + ' ' + inStockDate + '</span>';
			// return status;
		}

		// check for pre-order items && is available To Go
		if( (type == 'store') && (status === 'preorder') && (data.isAvailablePier1ToGo !== false) ) {
			status = '<span class="preorder">' + app.resources.TO_GO_MESSAGE + ' ' + inStockDate + '</span>';
			return status;
		}

		// check for store in-stock, availToGo = true - override disabled button
		if( (type == 'store') && (status === 'in stock') && (data.isAvailablePier1ToGo !== false) ) {
			status = '<span class="in-stock availToGo-true">In Stock</span>';
			return status;
		}

		// check for store in-stock, availToGo = false
		if( (type == 'store') && (status === 'in stock') && (data.isAvailablePier1ToGo === false) ) {
			status = '<span class="in-stock availToGo-false">In Stock(Not available for Pier 1 To-Go)</span>';
			return status;
		}

		switch (status) {

			case 'in stock' :

				status = '<span class="in-stock">In Stock for shipping</span>';
				break;

			case 'in stock (item may be on display)' :

				status= '<span class="in-stock">In Stock <span>(Item may be on display)</span></span>';
				break;

			case 'in stock (not available for pier 1 to go)' :
				status = '<span class="in-stock availToGo-false">In Stock(Not available for Pier 1 To-Go)</span>';
				break;

			case 'not available' :

				if(type === 'online') {
					if(data.isHomeDeliverable) {
						if(app.customer.zip != null && data.homeDeliveryQuantity != null) {
							if(data.homeDeliveryQuantity > 0) {
								status = '<span class="in-stock">In Stock for shipping to ' + app.customer.zip + '</span>';
								status += '<span id="setHdZip" class="set-home-delivery-zip link">change zip</span>';
							} else {
								status = '<span class="out-of-stock">Unavailable for shipping to ' + app.customer.zip + '</span>';
								status += '<span id="setHdZip" class="set-home-delivery-zip link">change zip</span>';
							}
						} else {
							status = 'searchHd';
						}
					} else {
						status = '<span class="out-of-stock">Unavailable for shipping</span>';
					}
				} else if(type === 'store') {
					status = 'Out of Stock at';
				}

				break;

			case 'out of stock' :

				status = '<span class="out-of-stock">Currently out of stock</span>';
				break;

			case 'call to confirm' :

				status = 'Available for Order in Store';
				break;

			case 'arriving soon' :
				status = '<span class="store-tile-status onTheWay">More on the way</span>';
				break;

			case 'preorder' :
				status = '<span class="preorder">Preorder</span>';
				break;

		}
			return status;
	}

	/** ************* app.storeTools public object ************** */

	app.storeTools = {

			init : function () {
				initializeCache();
				initializeDom();
				initializeEvents();
			},

			loadCities : function(callback) {
				if (app.ui.citiesjsondata) {
					return;
				}

				var args = Array.prototype.slice.call(arguments),
					callbackArgs = args.length > 1 ? args.slice(1) : [];

				$.ajax({
					url: app.urls.storesGetCitiesJson,
					cache: true,
					dataType: 'json',
					success:function(jsonResponse){
						app.ui.citiesjsondata = $( jsonResponse ).map(function() {
							return {
								value: this.SC + ', ' + this.SS,
								id: this.SZ
							};
						}).get();

						// call the callback if it exists
						if (callback) {
							callback.apply(undefined, callbackArgs);
						}

						// sort the data
						app.ui.citiesjsondata = app.ui.citiesjsondata.sort(function(a,b) {
							if (a.value > b.value) { return 1; }
							if (a.value < b.value) { return -1; }
							return 0;
						});
					}
				});
			},

			selectStore : function(input) {
				if (!input || !input.length) {
					return;
				}

				if (!app.ui.citiesjsondata) {
					app.storeTools.loadCities(getStoreCities, input);
				}
			   
				getStoreCities(input);
				
			},

			/*
			getOnlineAvailabilityExt : function(pid, target,qvflag){

				$.getJSON(
					app.util.appendParamsToUrl(app.urls.getAvailability , {pid:pid, postal:app.customer.zip}),
					{
						format: "json"
					},
					function(data){
						if(data) {
							var status = data.status.toLowerCase();
							if(status != 'in_stock'){
								var individualBtn = $("#"+pid);
								if(individualBtn){
									if(individualBtn.attr('data2') == 'false'){
										var add_all_to_cart = $(".add-all-to-cart");
										if(individualBtn.attr('data1')=='false'){
											individualBtn.attr('disabled','disabled');
											if(!qvflag){
												$("."+pid).attr('disabled','disabled');
											}
											if(add_all_to_cart){
												add_all_to_cart.attr('disabled','disabled');
												if(qvflag){
													$(".setTotalPriceqv").addClass("hide");
												}else{
													$(".setTotalPrice").addClass("hide");
												}
											}
										}
									}
								}
							}

							var status = formatStatus('online',data);

							if(status == 'searchHd'){
								$("#chd_" + pid + ".check-home-delivery-prompt").css('display', 'block');
							}else{
								target.html('<div id="as_'+pid+'" class="store-status">' + status + '</div>');
							}


						}
						// no records
						else {

						}
					}
				)
				.success(function (){})
				.error(function (){})
				.complete(function(){});

			},
			*/
			updateCartMessaging : formatStatus,
			loadPreferredStorePanel : loadPreferredStorePanel
		};

}(window.app = window.app || {}, jQuery));




/**
 * @class app.product
 */
(function (app, $) {
	var $cache;

	/** ************* app.product private vars and functions ************** */
	function loadProductNavigation() {
		var pidInput = $cache.pdpForm.find("input[name='pid']").last();
		var navContainer = $("#product-nav-container");
		// if no hash exists, or no pid exists, or nav container does not exist,
		// return
		if (window.location.hash.length <= 1 || pidInput.length===0 || navContainer.length===0) {
			return;
		}

		var pid = pidInput.val();
		var params = app.Uri.getKeyValuePairs(window.location.hash.substr(1));
		
		if (!params.q && !params.cgid) {
			return;
		}
		
		params.pid = params.pid || pid;
		delete params.format;
		var url = app.util.appendParamsToUrl(app.urls.productNav, params);
		
		app.ajax.load({url:url, target: navContainer});
	}

	// creates product recommendation carousel using jQuery jcarousel plugin
	function loadRecommendations() {
		
		if (!$.fn.jcarousel) { return; }
		
		var carousel = $("#carousel-recomendations");
		if(!carousel || carousel.length === 0 || carousel.children().length === 0) {
			return;
		}

		carousel.jcarousel(app.components.carouselSettings);
	}

	/**
	 * @description Sets the main image attributes and the href for the
	 *			  surrounding <a> tag
	 * @param {Object}
	 *			atts Simple object with url, alt, title and hires properties
	 */
	function setMainImage(atts) {
		var imgZoom = $cache.pdpMain.find("a.main-image");
		if (imgZoom.length>0) {
			imgZoom.attr("href", atts.hires);
		}

		imgZoom.find("img.primary-image").attr({
			"src" : atts.url,
			"alt" : atts.alt,
			"title" : atts.title
		});
	}

	/**
	 * @description helper function for swapping main image on swatch hover
	 * @param {Element}
	 *			element DOM element with custom data-lgimg attribute
	 */
	function swapImage(element) {
		
		var imgZoom = $cache.pdpMain.find("a.main-image"),
			mainImage = imgZoom.find("img.primary-image"),
			lgImg = $(element).data("lgimg"),
			newImg = $.extend({}, lgImg);
		
		if (!lgImg) { return; }
		
		// store current image info
		lgImg.hires = imgZoom.attr("href");
		lgImg.url = mainImage.attr("src");
		lgImg.alt = mainImage.attr("alt");
		lgImg.title = mainImage.attr("title");
		
		// reset element's lgimg data attribute
		$(element).data(lgImg);
		
		// set the main image
		setMainImage(newImg);
	}



	function loadZoom() {
		if(app.quickView.isActive() || !app.zoomViewerEnabled) { return; }

		// zoom properties
		var options = {
			zoomType: 'standard',
			alwaysOn : 0, // setting to 1 will load load high res images on
							// page load
			zoomWidth : 450,
			zoomHeight : 465,
			title : false,
			position:'left',
			preloadImages: 0, // setting to 1 will load load high res images
								// on page load
			xOffset: 55,
			yOffset: 0
		};

		$cache.pdpMain.find("a.main-image").removeData("jqzoom").jqzoom(options);
	}

	function replaceImages() {
		var newImages = $("#update-images");
		
		if (!newImages.length) { return; }
		
		var imageContainer = $cache.pdpMain.find("div.product-image-container");

		imageContainer.html(newImages.html());
		newImages.remove();
		setMainImageLink();

		loadZoom();
	}

	function setMainImageLink() {
		if (app.quickView.isActive() || app.isMobileUserAgent) {
			$cache.pdpMain.find("a.main-image").removeAttr("href");
		}
		else {
			$cache.pdpMain.find("a.main-image").addClass("image-zoom");
		}
	}


	function initializeDom() {
		
		var $tabs = $cache.pdpMain.find('div.product-detail .product-tabs');
		// if tabs exist, initialize
		$tabs.length && $tabs.tabs();

		if(!app.quickView.isActive()){
			$cache.pdpMain.find('.product-accordion .accordion-menu').togglepanels();
			if(!$('body').hasClass('mobile') && !$('body').hasClass('tablet')){
				$cache.pdpMain.find('div.product-detail .product-accordion .accordion-menu h3').click();
			}
		}

		var productAltImages = $('.product-image-container').find('.product-thumbnails');

		if(productAltImages.find('li').length > 6 && $.fn.jcarousel){
			productAltImages.jcarousel(app.components.carouselSettings);
		}

		loadRecommendations($cache.container);
		loadProductNavigation();
		setMainImageLink();
	}

	function initializeCache() {
		$cache = {
			productId : $("#pid"),
			pdpMain : $("#pdpMain"),
			productContent : $("#product-content"),
			thumbnails : $("#thumbnails"),
			bonusProductGrid : $(".bonusproductgrid"),
			imageContainer : $(".product-primary-image"),
			productSetList : $("#product-set-list"),
			addToCart : $("#add-to-cart"),
			addAllToCart : $("#add-all-to-cart"),
			addToWishList : $(".wl-action"),
			addAllToWishList : $(".wl-set-action"),
			swatchA2B : $("button[id*=add-to-cart-swatch]"),
			swatchContent : $(".swatch-qtip-content"),
			swatchImg : $(".swatch-container img"),
			swatchAnchor : $(".swatch-container a")
		};
		$cache.detailContent = $cache.pdpMain.find("div.detail-content");
		$cache.pdpForm = $cache.pdpMain.find("form.pdpForm");
		$cache.swatches = $cache.pdpMain.find(".swatches");
		$cache.mainImageAnchor = $cache.imageZoom = $cache.imageContainer.find("a.main-image");
		$cache.mainImage = $cache.mainImageAnchor.find("img.primary-image");
	}

	function initializeEvents() {

		var availabilityContainer = $cache.pdpMain.find("div.availability");

		app.product.initAddThis();
		
		// binding for product recommendations
		$(document).on('click tap', '#carousel-recomendations .product-tile div a' ,function(e){
			e = e || event;
			var target = e.target || e.srcElement;
			if(target.nodeName="IMG"){target=target.parentNode;}
			var href = target.getAttribute("href");
			if(href && href.indexOf('cross-sell') < 0) {
				target.href = href + (href.indexOf('#') > -1 ? "&cross-sell" : "#cross-sell");
			}
		});
		

		// add or update shopping cart line item
		app.product.initAddToCart();
		
		$cache.pdpMain.on('click', '.home-delivery-pdp-prompt-submit', function(e) {
		    e.preventDefault();
			var $hdPrompt = $(this).siblings('.home-delivery-prompt');
			var rx = new RegExp(app.validator.regex.postal.us);
			var pid = $('#pid').val();
			
			if (!rx.test($hdPrompt.val())) {
				$hdPrompt.addClass('error');
				$hdPrompt.one('keydown', function() {
					$hdPrompt.removeClass('error');
				});
				return;
			}
			
			$.ajax({
				url : app.util.appendParamsToUrl(app.urls.setZipCode, { zipCode : $hdPrompt.val() }),
				type : "GET",
				dataType: "json"
			}).done(function(data) {
				app.user.setPreferredStore($hdPrompt.val(), pid);
				if ($('.product-set-list').length > 0) {
					location.reload();
				}
			});
		});
		
		//for home delivery sku zip not being accurate, show change zip link and hide online stock message
		$cache.pdpMain.on('click', '.set-home-delivery-zip', function() {
			var $this = $(this);
			var pform = $(this).closest('form');
			var pid = pform.find("input[name='pid']").val();
			var $zip = $($cache.pdpMain.find('#chd_' + pid + '.check-home-delivery-prompt'));
			
			if ($zip.css('left') != '0px') {
				$this.css({position: 'relative', display: 'inline-block'}).animate({left: -($(this).width()+100)}, 200, 'swing', function(){				
					$zip.css({position: 'relative', left: $this.width(), display: 'inline-block'}).animate({left: '0px'}, 500, 'swing');					
					$cache.pdpMain.find('.#as_' + pid + '.store-status').css('display', 'none');
				});
				$this.fadeOut(100);
			}
		});

		$cache.pdpMain.on("hover", ".swatches.Color.swapimage a.swatchanchor", function () {
			swapImage(this);
		});

		// productthumbnail.onclick()
		$cache.pdpMain.on("click", "img.productthumbnail", function () {
			// Omniture.Events.PDPCarouselImageClicked.occurred();
			var lgImg = $(this).data("lgimg");

			setMainImage(lgImg);
			setMainImageLink();
			// load zoom if not quick view
			loadZoom();
		});

		// set the first alt image to selected and wire up the JS to add/remove
		// the selected class on the pdp image viewer.
		$cache.pdpMain.find('.product-col-1 ul.product-thumbnails')
			.find('.jcarousel-item')
			.on('click',function(){
				$(this).addClass('selected').siblings().removeClass('selected');
			})
			.end()
			.find('li:first-child').addClass('selected');

		// dropdown variations
		$cache.pdpMain.on("change", ".product-options select", function (e) {
			var salesPrice = $cache.pdpMain.find("div.product-add-to-cart .price-sales");

			var selectedItem = $(this).children().filter(":selected").first();
			var combinedPrice = selectedItem.data("combined");
			salesPrice.text(combinedPrice);
		});
		
		$(document).unbind('attributeSelected').on('attributeSelected', function(e) {
			var url = e.url,
				qty = $cache.pdpForm.find("input[name='Quantity']").first().val(),
				swapImage = !!$(this).closest(".swapimage").length,
				productSet = $(this).closest('.subProduct'),
				target = productSet.length && productSet.children.length ? productSet : $cache.productContent,
				selectedVariantId;
			
			url = app.util.appendParamToURL(url, 'Quantity', (!qty || isNaN(qty) ? "1" : qty));
		
			app.progress.show($cache.pdpMain);
			
			app.ajax.load({
				url: url,
				callback : function (data) {
					target.html(data);
					app.product.initAddToCart();
					app.product.initQtySelector();
					selectedVariantId = target.find('[data-selectedvariant]').data('selectedvariant');
					replaceImages(); 
					
				}
			});
			
		});

		// prevent default behavior of thumbnail link and add this Button
		$cache.pdpMain.on("click", ".thumbnail-link:not(.recomendation-thumbnail), .addthis_toolbox a", false);
		$cache.pdpMain.on("click", "div.unselectable a", false);

		$cache.pdpMain.on("change", ".variation-select", function(e){
			if ($(this).val().length===0) {return;}
			
			$.event.trigger({ type: 'attributeSelected', url: $(this).val() });
		});

		// swatch anchor onclick()
		$cache.pdpMain.on("click", "div.product-detail a[href].swatchanchor", function (e) {
			e.preventDefault();
			var url = this.href, $unselect;
			if ($(this).parent(".selected").length) {
				$unselect = $(this).closest('[data-unselect]');
				
				if (!$unselect.length || !$unselect.data('unselect').length) { return; }
				url = $unselect.data('unselect');
			}
			
			$.event.trigger({ type: 'attributeSelected', url: url });
		})
		.on('click', '.selected-overlay', function(e) {
			$unselect = $(this).closest('[data-unselect]'); 
			if (!$unselect.length || !$unselect.data('unselect').length) { return; }
			$.event.trigger({ type: 'attributeSelected', url: $unselect.data('unselect') });
		});

		$cache.productSetList.on("click", "div.product-set-item a[href].swatchanchor", function (e) {
			e.preventDefault();
			// get the querystring from the anchor element
			var params = app.util.getQueryStringParams(this.search);
			var psItem = $(this).closest(".product-set-item");

			// set quantity to value from form
			var qty = psItem.find("form").find("input[name='Quantity']").first().val();
			params.Quantity = isNaN(qty) ? "1" : qty;

			var url = app.urls.getSetItem + "?" + $.param(params);

			// get container
			var ic = $(this).closest(".product-set-item");
			ic.load(url, function () {
				app.progress.hide();
				if ($cache.productSetList.find("button.add-to-cart[disabled]").length>0) {
					$cache.addAllToCart.attr("disabled","disabled");
					$cache.addToCart.attr("disabled","disabled"); // this may
																	// be a
																	// bundle
				}
				else {
					$cache.addAllToCart.removeAttr("disabled");
					$cache.addToCart.removeAttr("disabled"); // this may be a
																// bundle
				}

				app.product.initAddToCart(ic);

			});
		});

		$cache.addAllToCart.on("click", function (e) {
			e.preventDefault();
			var psForms = $cache.productSetList.find("form").toArray(),
				miniCartHtml = "",
				tempurl = "";
				enteredQty = $("#setQuantity").val();
				if(enteredQty){
					if(enteredQty === '' || enteredQty.length === 0 || isNaN(enteredQty) || parseInt(enteredQty, 10) === 0) {
						$("#setQuantity").val("1");
						return;
					}
				}else{
					tempurl = app.urls.addProduct;
				}

			$cache.addAllToCart.callToAction("busy");
			// add items to cart
			function addItems() {
				var form = $(psForms.shift());
				var itemid = form.find("input[name='pid']").val();
				if(enteredQty > 0){
					var itemQty = form.find("input[name='Quantity']").val() * enteredQty;
					tempurl = app.urls.addProduct;
					tempurl = app.util.appendParamToURL(tempurl,'Quantity',itemQty);
				}

				addProductUrl = app.util.ajaxUrl(tempurl);
				$.ajax({
					dataType : "html",
					url: addProductUrl,
					data: form.serialize()
				})
				.done(function (response) {
					// success
					miniCartHtml = response;
				})
				.fail(function (xhr, textStatus) {
					// failed
					var msg = app.resources.ADD_TO_CART_FAIL;
					$.validator.format(msg, itemid);
					if(textStatus === "parsererror") {
						msg+="\n"+app.resources.BAD_RESPONSE;
					} else {
						msg+="\n"+app.resources.SERVER_CONNECTION_ERROR;
					}
					window.alert(msg);
				})
				.always(function () {
					if(psForms.length > 0){
						addItems();
					} else {
						app.quickView.close();
						if (app.minicart.exists){ 
							app.minicart.show(miniCartHtml);
						}
						$.event.trigger({
							type: 'basketItemAdded'
						});
						$cache.addAllToCart.callToAction("success");
					}
				});
			}
			addItems();
			callFloodlight('1391379','2012n236','2012a454');

		});

		$cache.addToWishList.on("click", function (e) {
			e.preventDefault();

			var wishListAnchor = jQuery(this);
			wishListAnchor.text('Adding to Wishlist');

			var urlParameters = this.attributes['data-parameters'].value;

			$.ajax({
				type : "POST",
				url : this.href + urlParameters,
				success : function(jsonData){
					if(typeof(jsonData) == 'string'){
						jsonData = JSON.parse(jsonData);
					}

					if(jsonData.authenticated == false){
						window.location = app.urls.addSecureToWishList + urlParameters;
					}
					else if(jsonData.success){
						wishListAnchor.text('Added to Wishlist!');
					}
					else{
						wishListAnchor.text('Error adding to wishlist');
					}
				}
			});
			callFloodlight('1391379','2012n236','2012a311');
		});

		$cache.addAllToWishList.on("click", function (e) {
			e.preventDefault();
			var enteredQty = $("#setQuantity").val();
			if(enteredQty === '' || enteredQty.length === 0 || isNaN(enteredQty) || parseInt(enteredQty, 10) === 0) {
				$("#setQuantity").val("1");
				return;
			}

			var wishListAnchor = jQuery(this);
			wishListAnchor.text('Adding to Wishlist');

			var urlParameters = this.attributes['data-parameters'].value;

			$.ajax({
				type : "POST",
				url : app.util.appendParamToURL(this.href + urlParameters, 'Quantity', enteredQty),
				success : function(jsonData){
					if(typeof(jsonData) == 'string'){
						jsonData = JSON.parse(jsonData);
					}

					if(jsonData.authenticated == false){
						window.location = app.util.appendParamToURL(app.urls.addSecureSetProductToWishList + urlParameters, 'Quantity', enteredQty);
					}
					else if(jsonData.success){
						wishListAnchor.text('Added to Wishlist!');
					}
					else{
						wishListAnchor.text('Error adding to wishlist');
					}
				}
			});
			callFloodlight('1391379','2012n236','2012a311');
		});
		
		$cache.swatchImg.on('click', function(e) {
			$cache.swatchAnchor.trigger('click');
		});
		
		$cache.swatchA2B.on('click', function(e) {
			var that = this;
			var miniCartHtml = "";
			var tempurl = "";
			
			function addItems() {
				var $swatchForm = $(that).closest("form");
				var itemid = $swatchForm.find("input[name='pid']").val();
			
				// Append the quantity to the url
				tempurl = app.urls.addProduct;
				tempurl = app.util.appendParamToURL(tempurl, 'Quantity', 1);

				addProductUrl = app.util.ajaxUrl(tempurl);

				$.ajax({
					dataType : "html",
					url: addProductUrl,
					data: $swatchForm.serialize()
				})
				.done(function (response) {
					// success
					miniCartHtml = response;
				})
				.fail(function (xhr, textStatus) {
					// failed
					var msg = app.resources.ADD_TO_CART_FAIL;
					$.validator.format(msg, itemid);
					if(textStatus === "parsererror") {
						msg+="\n"+app.resources.BAD_RESPONSE;
					} else {
						msg+="\n"+app.resources.SERVER_CONNECTION_ERROR;
					}
					window.alert(msg);
				})
				.always(function () {
					app.quickView.close();
					if ( app.isMobileUserAgent ) {
						$.event.trigger({ type: 'basketItemAdded' });
					} else {
						app.minicart.show(miniCartHtml);
					}
				});
			}
			addItems();
			callFloodlight('1391379','2012n236','2012a454');
		});

		if ( !app.isMobileUserAgent ) {
			$cache.swatchAnchor.qtip({
				id: 'swatch',
				content: {
					text: $cache.swatchContent
				},
				position: {
					my: 'bottom left',
					at: 'center',
					target: $cache.swatchImg
				},
				show: {
					event: 'click'
				},
				hide: {
					event: 'unfocus'
				},
				style: {
					width: 'auto'
				}
			});
		} else {
			$('.swatch-container').on('click', function(){
				$(this).hide();
				$('.swatch-qtip-content').slideDown();
			});
		}
		
		app.sendToFriend.initializeDialog($cache.pdpMain, "a.send-to-friend");

		$cache.pdpMain.find("button.add-to-cart[disabled]").attr('title', $cache.pdpMain.find(".availability-msg").html() );

		$(".moreDetails").on("click", function (){
			$(".setIndividuals").toggleClass('hide');
			$(".moreDetails").toggleClass('hide');
		});

		// set the first alt image to selected and wire up the JS to add/remove
		// the selected class on the pdp image viewer.
		$('.product-col-1 ul.product-thumbnails')
			.find('li')
			.on('click',function(){
				$(this).addClass('selected').siblings().removeClass('selected');
			})
			.end()
			.find('li:first-child').addClass('selected');

		if (!$.fn.qtip) { return; }
		
		$(".details-reserve").qtip({
			content: $('.reserve-tooltip').html(),
			show: 'click',
		   	style: {
		   		width: 300
		   	},
			position: {
				my: 'middle right',
				at: 'middle left'
			}
		});

	}

	function setAddToCartHandler(e) {
		var $this = $(this);
		e.preventDefault();
		var form = $this.closest("form");
		var price = $this.attr('data-price');
		var qty = form.find("input[name='Quantity']");
		var isSubItem = $this.hasClass("sub-product-item");
		
		if(qty.val() === '' || qty.length === 0 || isNaN(qty.val()) || parseInt(qty.val(), 10) === 0) {
			qty.val("1");
			return;
		}

		var data = form.serialize();
		var addToCartData = form.serializeObject();
		addToCartData.price = price ? price : 0;
	
		// Hide/disable add to basket area until update completes
		var $buttons = $this.closest('.buttonWrapper').find('button');
		
		if (!app.quickView.isActive()) {
			$buttons.callToAction('busy');
		}
			
		//$this.closest('.buttonWrapper').find('.dropdown-menu').css('display', 'none');

		app.cart.update(data, function (response) {
			var uuid = form.find("input[name='uuid']");
			if (uuid.length > 0 && uuid.val().length > 0) {
				app.cart.refresh();
			}
			else {
				if (!isSubItem) {
					app.quickView.close();
				}
				if (app.minicart.exists){ 
					app.minicart.show(response);
				}
				$.event.trigger({
					type: 'basketItemAdded',
					addedToCart: addToCartData
					 
				});
			}
			$('.storeIDHidden').val('');
		})
		.always(function() {
			// Turn buttons back on again
			$buttons.callToAction('success');
		});
		callFloodlight('1391379','2012n236','2012a454');
	}

	function initializeQtySelector(){
		app.product.initQtySelector();
	}

	/** ************* app.product public object ************** */
	app.product = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
			loadZoom();
			app.gallery.init();
			initializeQtySelector();
		},

		get : function (options) {
			// loads a product into a given container div
			// params
			// containerId - id of the container div, if empty then global
			// app.containerId is used
			// source - source string e.g. search, cart etc.
			// label - label for the add to cart button, default is Add to Cart
			// url - url to get the product
			// id - id of the product to get, is optional only used when url is
			// empty
			var target = options.target || app.quickView.init();
			var source = options.source || "";

			var productUrl = options.url || app.util.appendParamToURL(app.urls.getProductUrl, "pid", options.id);
			if(source.length > 0) {
				productUrl = app.util.appendParamToURL(productUrl, "source", source);
			}

			// show small loading image
			// app.progress.show(app.ui.primary);
			app.ajax.load({
				target : target,
				url : productUrl,
				data : options.data || "",
				// replace with callback passed in by options
				callback : options.callback || app.product.init
			});
		},

		getAvailability : function (pid, quantity, callback) {
			app.ajax.getJson({
				url: app.util.appendParamsToUrl(app.urls.getAvailability, {pid:pid, Quantity:quantity}),
				callback: callback
			});
		},

		initAddThis : function () {
			var addThisToolbox = $(".addthis_toolbox");
			if(typeof addthis === 'undefined') {
				addThisToolbox.hide();
				return;
			}
			if ($('a[class^="addthis_button"]').length) {
				return;
			}

			addThisToolbox
				.append('<a class="addthis_button_facebook_like" fb:like:layout="button_count"></a>')
				.append('<a class="addthis_button_tweet" tw:count="none"></a>')
				// .append('<a class="addthis_button_tweet" tw:count="none"><img
				// src="'+ $('#tweeter').val() +'" /></a>')
				.append('<a class="addthis_button_pinterest_pinit" pi:pinit:layout="horizontal" pi:pinit:media="' + $('#pinit_image_url').val() + '"></a>')
				.append('<a class="addthis_button_google_plusone" g:plusone:size="medium" g:plusone:count="false" g:plusone:callback="plusone_vote"></a>');

			addthis.toolbox(".addthis_toolbox");
		},

		initAddToCart : function (target) {
			
			// if variations exist, enable/disable add to cart
			var $productContainer = target || $cache.pdpMain,
				$variations = $productContainer.find('.product-variations');

			if ($variations.length) {
				var selectedvariant = ''+$variations.data('selectedvariant');
				$productContainer.find('.add-to-cart').prop('disabled', !selectedvariant.length);
			}
			
			if (target) {
				target.on("click", ".add-to-cart", setAddToCartHandler);
			}
			else {

				$("#Quantity").keypress(function(event) {
					  if ( event.which == 13 && !$('.add-to-cart:disabled') ) {
						  event.preventDefault();
						  $(".add-to-cart").trigger('click');
					   }
					});

				$(".add-to-cart").on("click", setAddToCartHandler);
			}
		},

		initQtySelector : function () {
			$cache.pdpMain.find('.qtySelector').find('span').click(function(){
				var $this = $(this),
					Qty = $this.parents('.quantity').find('input.numsonly');

				if($this.hasClass('more')){
					if(Qty.val() < 999){
						Qty.val(parseInt(Qty.val()) + 1);
					}
				}else{
					if(Qty.val() > 0){
						Qty.val(parseInt(Qty.val()) - 1);
					}
				}
				
				app.product.updateSetPrice();
			});
		},
		
		updateSetPrice : function (){
			var setpriceFin=Number('$0.00'.replace(/[^0-9\.]+/g,""));
			var setSalePriceFin = setpriceFin;
			var setForms = $("#product-set-list").find("form").toArray();
			
			for(i=0; i < setForms.length; i++){
				var curr_prod_id = $(setForms[i]).find("input[name='pid']").val();
				var curr_prod_qty = $(setForms[i]).find("input[name='Quantity']").val();
				var no_of_prices = $(".indvidual-price-"+curr_prod_id).children().first().children().length;
				var price="";
				var salePrice="";
				if(no_of_prices && no_of_prices > 1){
					price = $(".indvidual-price-"+curr_prod_id).children().first().children().first().text();
					salePrice = $(".indvidual-price-"+curr_prod_id).children().first().children().last().text();
				}else{
					price = $(".indvidual-price-"+curr_prod_id).children().first().children().first().text();
					salePrice = price;
				}
				var priceFin = Number(price.replace(/[^0-9\.]+/g,""));
				var salePriceFin = Number(salePrice.replace(/[^0-9\.]+/g,""));
				setpriceFin = setpriceFin + (priceFin * curr_prod_qty);
				setSalePriceFin = setSalePriceFin + (salePriceFin * curr_prod_qty);
			}
			
			if(setSalePriceFin < setpriceFin){
				setpriceFin = setpriceFin.toFixed(2);
				setSalePriceFin = setSalePriceFin.toFixed(2);
				$(".setTotalPrice").children().first().text("$"+setpriceFin);
				$(".setTotalPrice").children().last().text("$"+setSalePriceFin);
			}
			else{
				setpriceFin = setpriceFin.toFixed(2);
				$(".setTotalPrice").children().first().text("$"+setpriceFin);
			}
		}

	};

}(window.app = window.app || {}, jQuery));

// app.gallery
(function (app, $) {

	var $cache = {};
	var thumbSpecs = "sw=80&sh=80";
	var primarySpecs = "sw=600&sh=600";

	function initializeCache() {
		$cache = {
			pdpImageContainer : $('.product-image-container'),
			primaryImage : $('<div id="gallery-primary"/>'),
			thumbnails : $('<ul id="gallery-thumbs"/>'),
			gallery : $('<div id="gallery"/>')
		};
	}

	function initializeDom() {
		$('a.click-to-enlarge').click(function(e){
			e.preventDefault();
			buildGallery();
			$cache.gallery.dialog({
				modal: false,
				width: 'auto',
				dialogClass : 'gallery-dialog',
				position: ['left','top']
			});
		});

		$(document).on('click', '.ui-widget-overlay', function () {
			$(".ui-dialog-titlebar-close", $(this).prev()).trigger('click');
		});
	}

	function buildGallery() {

		// clean out any previous data
		$cache.thumbnails.empty();
		$cache.primaryImage.empty();
		$cache.gallery.empty();

		var primaryImageUrl = $('.product-primary-image .primary-image').attr('src').split('?');

		// set big image
		$cache.primaryImage.append( '<img src="' + primaryImageUrl[0] + '" />');

		// gather thumbs
		$cache.pdpImageContainer.find('.product-thumbnails .thumbnail-link').slice(0,28).each(function(){
			var thumbImageUrl = $(this).find('img').attr('src').split('?');
			var thisClass = (thumbImageUrl[0] === primaryImageUrl[0]) ? "active" : "";
			$cache.thumbnails.append('<li class="'+thisClass+'"><img src="' + thumbImageUrl[0] + '?' + thumbSpecs + '"></li>');
		});

		// put it into the gallery container
		$cache.gallery
			.append($cache.primaryImage)
			.append($cache.thumbnails)
			.append('<span class="gallery-next">next</span>')
			.append('<span class="gallery-prev">prev</span>');

		$cache.gallery.find('span.gallery-next').click(function(){
			$cache.thumbnails.find('.active').next('li').children('img').trigger('click');
		});

		$cache.gallery.find('span.gallery-prev').click(function(){
			$cache.thumbnails.find('.active').prev('li').children('img').trigger('click');
		});

		$cache.thumbnails.find('img').click(function(){
			$cache.primaryImage.find('img').attr('src',$(this).attr('src').split('?')[0]);
			$(this).parent().addClass('active').siblings().removeClass('active');
		});
	}

	app.gallery = {
		init : function () {
			initializeCache()
			initializeDom();
		}
	};

}(window.app = window.app || {}, jQuery));


// app.product.tile
(function (app, $) {
	var $cache = {};

	function initializeDom() {
		var tiles = $cache.container.find(".product-tile");
		if (tiles.length===0) { return; }
		tiles.each(function (idx) {
			$(this).data("idx",idx).hover(
					function(){
						$(this).parent().addClass('active').siblings().removeClass('active');
						$(this).click(function(){
							window.location = $(this).find('span.tile-more-link a').attr('href');
							return false;
						});
					},
					function(){
						$(this).parent().removeClass('active');
					});
		});
	}

	function initializeEvents() {

		if(app.resources.SHOW_QUICKVIEW && !('ontouchstart' in document.documentElement)){
			app.quickView.initializeButton($cache.container, ".product-image");
		}
		$cache.container.on("click", ".swatch-list a.swatch", function (e) {
			e.preventDefault();
			if ($(this).hasClass("selected")) { return; }

			var tile = $(this).closest(".grid-tile");
			$(this).closest(".swatch-list").find(".swatch.selected").removeClass("selected");
			$(this).addClass("selected");
			tile.find("a.thumb-link").attr("href", $(this).attr("href"));
			tile.find("a.name-link").attr("href", $(this).attr("href"));
		}).on("hover", ".swatch-list a.swatch", function (e) {
			if ($(this).hasClass("selected")) { return; }

			// get current thumb details
			var tile = $(this).closest(".grid-tile");
			var thumb = tile.find(".product-image a.thumb-link img").filter(":first");
			var swatchImg = $(this).children("img").filter(":first");
			var data = swatchImg.data("thumb");

			var currentAtts = {
				src : thumb.attr("src"),
				alt : thumb.attr("alt"),
				title : thumb.attr("title")
			}

			thumb.attr({
				src : data.src,
				alt : data.alt,
				title : data.title
			});

			swatchImg.data("thumb", currentAtts);
		});
	}


	/** ************* app.product.tile public object ************** */
	app.product.tile = {
		init : function () {
			$cache = {
				container : $(".tiles-container")
			};
			initializeEvents();
			// jack ogle - 10/21/2013 - turning off product grid tile hover as
			// part of 3.3 release, Defect 3377 (REP-63)
			// initializeDom();
		}
	};

}(window.app = window.app || {}, jQuery));

// app.product.compare
(function (app, $) {
	var $cache = {},
		_currentCategory = "",
		_isClearing = false,
		MAX_ACTIVE = 6,
		CI_PREFIX = "ci-";

	/** ************ private *************** */
	function refreshContainer() {
		if (_isClearing) { return; }

		var ac = $cache.compareContainer.find(".active").length;

		if (ac < 2) {
			$cache.compareButton.attr("disabled", "disabled");
		}
		else {
			$cache.compareButton.removeAttr("disabled");
		}

		// update list with sequential classes for ui targeting
		var compareItems = $cache.compareContainer.find('.compare-item');
		for( i=0; i < compareItems.length; i++ ){
			compareItems.removeClass('compare-item-' + i);
			$(compareItems[i]).addClass('compare-item-' + i);
		}

		$cache.compareContainer.toggle(ac > 0);

	}

	function addToList(data) {
		// get the first compare-item not currently active
		var item = $cache.compareContainer.find(".compare-item").not(".active").first();
		if (item.length===0) { return; } // safety only

		// if already added somehow, return
		if ($("#"+CI_PREFIX+data.uuid).length > 0) {
			return;
		}
		// set as active item
		item.addClass("active")
			.attr("id", CI_PREFIX+data.uuid)
			.data("itemid", data.itemid);

		// replace the item image
		var itemImg = item.children("img.compareproduct").first();
		itemImg.attr({src : $(data.img).attr("src"), alt : $(data.img).attr("alt")});

		// refresh container state
		refreshContainer();

		var tile = $("#"+data.uuid);
		if (tile.length===0) { return; }

		// ensure that the associated checkbox is checked
		tile.find(".compare-check")[0].checked = true;
	}

	function removeFromList(uuid) {
		var item = $("#"+CI_PREFIX+uuid);
		if (item.length===0) { return; }

		// replace the item image
		var itemImg = item.children("img.compareproduct").first();
		itemImg.attr({src : app.urls.compareEmptyImage, alt : app.resources.EMPTY_IMG_ALT});

		// remove class, data and id from item
		item.removeClass("active")
			.removeAttr("id")
			.removeAttr("data-itemid")
			.data("itemid", "");

		// use clone to prevent image flash when removing item from list
		var cloneItem = item.clone();
		item.remove();
		cloneItem.appendTo($cache.comparePanel);
		refreshContainer();
		// ensure that the associated checkbox is not checked
		var tile = $("#"+uuid);
		if (tile.length === 0 ) { return; }

		tile.find(".compare-check")[0].checked = false;
	}

	function initializeCache() {
		$cache = {
			primaryContent : $("#primary"),
			compareContainer : $("#compare-items"),
			compareButton : $("#compare-items-button"),
			clearButton : $("#clear-compared-items"),
			comparePanel : $("#compare-items-panel")
		};
	}

	function initializeDom() {
		_currentCategory = $cache.compareContainer.data("category") || "";
		var active = $cache.compareContainer.find(".compare-item").filter(".active");
		active.each(function () {
			var uuid = this.id.substr(CI_PREFIX.length);
			var tile = $("#"+uuid);
			if (tile.length === 0 ) { return; }

			tile.find(".compare-check")[0].checked = true;
		});
		// set container state
		refreshContainer();
	}

	function initializeEvents() {
		// add event to buttons to remove products
		$cache.primaryContent.on("click", ".compare-item-remove", function (e, async) {
			var item = $(this).closest(".compare-item");
			var uuid = item[0].id.substr(CI_PREFIX.length);
			var tile = $("#"+uuid);
			var args = {
				itemid : item.data("itemid"),
				uuid : uuid,
				cb :  tile.length===0 ? null : tile.find(".compare-check"),
				async : async
			};
			app.product.compare.removeProduct(args);
			refreshContainer();
		});

		// Button to go to compare page
		$cache.primaryContent.on("click", "#compare-items-button", function () {
			window.location.href = app.util.appendParamToURL(app.urls.compareShow, "category", _currentCategory);
		});

		// Button to clear all compared items
		$cache.primaryContent.on("click", "#clear-compared-items", function () {
			_isClearing = true;
			$cache.compareContainer.hide()
								   .find(".active .compare-item-remove")
								   .trigger("click", [false]);
			_isClearing = false;

		});
	}

	/** ************* app.product.compare public object ************** */
	app.product.compare = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
		},
		initCache : initializeCache,
		addProduct : function (args) {
			var items = $cache.compareContainer.find(".compare-item");
			var cb = $(args.cb);
			var ac = items.filter(".active").length;
			if(ac===MAX_ACTIVE) {
				if(!window.confirm(app.resources.COMPARE_CONFIRMATION)) {
					cb[0].checked = false;
					return;
				}

				// remove product using id
				var item = items.first();

				// safety check only. should never occur.
				if (item[0].id.indexOf(CI_PREFIX)!==0) {
					cb[0].checked = false;
					window.alert(app.resources.COMPARE_ADD_FAIL);
					return;
				}
				var uuid = item[0].id.substr(CI_PREFIX.length);
				app.product.compare.removeProduct({
					itemid: item.data("itemid"),
					uuid: uuid,
					cb: $("#"+uuid).find(".compare-check")
				});
			}

			app.ajax.getJson({
				url : app.urls.compareAdd,
				data : { 'pid' : args.itemid, 'category' : _currentCategory },
				callback : function (response) {
					if (!response || !response.success) {
						// response failed. uncheck the checkbox return
						cb.checked = false;
						window.alert(app.resources.COMPARE_ADD_FAIL);
						return;
					}

					// item successfully stored in session, now add to list...
					addToList(args);
				}
			});
		},

		removeProduct : function (args) {
			if (!args.itemid) { return; }
			var cb = args.cb ? $(args.cb) : null;
			app.ajax.getJson({
				url : app.urls.compareRemove,
				data : { 'pid' : args.itemid, 'category' : _currentCategory },
				async: args.async,
				callback : function (response) {
					if (!response || !response.success) {
						// response failed. uncheck the checkbox return
						if (cb && cb.length > 0) { cb[0].checked = true; }
						window.alert(app.resources.COMPARE_REMOVE_FAIL);
						return;
					}

					// item successfully removed session, now remove from to
					// list...
					removeFromList(args.uuid);
				}
			});
		}
	};

}(window.app = window.app || {}, jQuery));

// app.compare
(function (app, $) {
	var $cache = {};

	function initializeCache() {
		$cache = {
			compareTable : $("#compare-table"),
			categoryList : $("#compare-category-list")
		};
	}

	function initializeDom() {
		app.product.tile.init();
	}

	function initializeEvents() {
		$cache.compareTable.on("click", ".remove-link", function (e) {
			e.preventDefault();
			app.ajax.getJson({
				url : this.href,
				callback : function (response) {
					app.page.refresh();
				}
			});
		})
		.on("click", ".open-quick-view", function (e) {
			e.preventDefault();
			var form = $(this).closest("form");
			app.quickView.show({
				url:form.attr("action"),
				source:"quickview",
				data:form.serialize()
			});
		});

		$cache.categoryList.on("change", function () {
			$(this).closest("form").submit();
		});
	}

	/** ************* app.compare public object ************** */
	app.compare = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
			app.product.initAddToCart();
		}
	};


}(window.app = window.app || {}, jQuery));

// send to friend
(function (app, $) {
	var $cache = {},
		initialized=false;
	function initializeEvents() {
		app.util.limitCharacters();
		if (initialized) {return; }
		$cache.dialog.on("click", ".preview-button, .send-button, .edit-button", function (e) {
			e.preventDefault();
			// $cache.form.validate();
			if (!$cache.form.valid()) {
				return false;
			}
			var requestType = $cache.form.find("#request-type");
			if (requestType.length>0) {
				requestType.remove();
			}
			$("<input/>").attr({id:"request-type", type:"hidden", name:$(this).attr("name"), value:$(this).attr("value")}).appendTo($cache.form);
			var data = $cache.form.serialize();
			app.ajax.load({url:$cache.form.attr("action"),
				   data: data,
				   target: $cache.dialog,
				   callback: function() {
						app.validator.init();
						app.util.limitCharacters();
						$cache.form = $("#send-to-friend-form");
						$(".ui-dialog-content").dialog("option", "position", "center");
				   }
			});
		})
		.on("click", ".cancel-button, .close-button", function (e) {
			e.preventDefault();
			$cache.dialog.dialog("close");
		});
		initialized=true;
	}

	/** ************* app.sendToFriend public object ************** */
	app.sendToFriend = {
		init : function () {
			$cache = {
				form: $("#send-to-friend-form"),
				dialog: $("#send-to-friend-dialog")
			};
			initializeEvents();
		},
		initializeDialog : function (eventDelegate, eventTarget) {
			$(eventDelegate).on("click", eventTarget, function (e) {
				e.preventDefault();
				var dlg = app.dialog.create({target:$("#send-to-friend-dialog"), options:{
					width:'auto',
					height:'auto',
					title:this.title,
					open:function() {
						app.sendToFriend.init();
						app.validator.init();
						$(".ui-icon-closethick").remove();
					}
				}});

				app.ajax.load({
					url:app.util.ajaxUrl(this.href),
					target:dlg,
					callback: function () {
						dlg.dialog("open");	 // open after load to ensure
												// dialog is centered

					}
				});
			});
		}
	};

}(window.app = window.app || {}, jQuery));


// app.search
(function (app, $) {
	var $cache = {};
	var previousPage = document.referrer;
	

	/**
	 * replaces breadcrumbs, lefthand nav and product listing with ajax and puts
	 * a loading indicator over the product listing
	 */
	function updateProductListing(isHashChange, url) {

		if(!$('#search-result-items').length) { return; }

		var hash = window.location.hash;
		
		// Hash whitelist
		var whiteList = ["pmax","pmin","prefn","prefv","sz","q","srule","start","cid","cgid","showAll"];
		var re = new RegExp("[#&]((?:" + whiteList.join("|") + ")[0-9]*=[^&#]*)", "gmi");
		var match = hash.match(re, "");
		hash = (match ? match.join("") : "");
		
		if(isHashChange && (!hash || hash == "")){
			window.location = previousPage;
			return;
		}
			

		// if(hash==='#results-content' || hash==='#results-products') { return;
		// }

		var refineUrl = null;
		if (hash.length > 0 && hash.indexOf('=') >= 0) {
			refineUrl = (url || window.location.pathname)+"?"+hash.substr(1);
		}
		else if (isHashChange) {
			refineUrl = url || window.location.href;
		}

		if (!refineUrl) { return; }

		if(refineUrl.search('showAll') > 0 ){
			//app.util.scrollBrowser(0);
			endlessScroll(app.util.getUri(refineUrl));
			return;
		}

		app.util.scrollBrowser(0);
		app.progress.show($('#primary'));
		if(app.isMobileUserAgent && $("#result-grid").length){
			$.get(app.util.appendParamToURL(app.util.appendParamToURL(refineUrl,"format","ajax"),"mobilerefine","true"), function( data ) {
			 $("#result-grid").html(data);
			})
					.done(function(){
						bindtileitems();
						$(".load-more").show();
						$('.ddWrapper').each(function(index){
							var el = $(this);
							var dd = new app.DropDown(el, false);
						});
					});
		}
		else{
			// standard listing refresh
			$cache.container.load(app.util.appendParamToURL(refineUrl, "format", "ajax"), function () {
				app.product.compare.init();
				app.product.tile.init();
				app.progress.hide();
				clearBooleanRefinements();
				app.util.initToggleElements();
			});
		}


	}

	function endlessScroll (uri) {

        // set defaults
		if (app.customer.device == "mobile"){
			$cache.resultBlockItems = 10;
			$cache.resultBlockStart = 10;
		}
		else if (app.customer.device == "tablet"){
			$cache.resultBlockItems = 24;
			$cache.resultBlockStart = 24;
		}
		else {
			$cache.resultBlockItems = 30;
			$cache.resultBlockStart = 30;
		}
        $cache.resultTotalResults = 0;
        $cache.srule = null;
        var resultBlockUrl = window.location.pathname + "?";
        
        // get current request data via hash
        hashValues = app.util.getQueryStringParams(uri.query);
        
        // remove any pre-set starting point and size of list
        for(key in hashValues) {
            if( key !== 'start' && key !== 'sz' && key !== 'srule'){
                resultBlockUrl = resultBlockUrl + [key] + '=' + hashValues[key] + '&';
            }
            if( key === 'showAll') {
                $cache.resultTotalResults = parseInt(hashValues[key]);
            }
            if( key === 'srule') {
                $cache.srule = hashValues[key];
            }
        }

        resultBlockUrl = resultBlockUrl + 'format=ajax&';
        
        // clear any previous results
        //$('#search-result-items').empty();
        
        // add first result set
        appendProductListing (resultBlockUrl);
        
        // add listener to keep adding records if the browser is scrolled near bottom
        $(window).smartScrollListener(function() {

            if  (!$cache.loading && $cache.resultBlockStart <= $cache.resultTotalResults && ($(window).scrollTop() + 2500 >= ( $(document).height() - ( $(window).height() ) ) ) && (window.location.hash.indexOf( "showAll" ) !== -1) ){
                // call the append results function
                appendProductListing(resultBlockUrl);
            }       
        });
    }
    
    function appendProductListing (resultBlockUrl) {

        $cache.loading = true;
        if($('#scroll-loading').length === 0){
            $('#search-result-items').after('<div id="scroll-loading"/>');
        }

        
        // build the url for this recordset
        resultBlockUrl = resultBlockUrl + 'start=' + $cache.resultBlockStart + '&sz=' + $cache.resultBlockItems;
        if($cache.srule)
            resultBlockUrl += "&srule=" + $cache.srule;
        
        var newListings = $('<div style="display:none;"/>').empty();
        
        newListings.load(
            resultBlockUrl, 
            function (data) {
                $('.pagination').html($(data).find('.pagination').html());
                newListings.find('li.grid-tile').hide().appendTo($('#search-result-items')).fadeIn('slow');
                app.product.tile.init();
                
                // update numbers to get next set of records
                $cache.resultBlockStart = $cache.resultBlockStart + $cache.resultBlockItems;
                $cache.loading = false;
                if($cache.resultBlockStart >= $cache.resultTotalResults){
                    $('#scroll-loading').remove();
                }
            });
            
    }


	function clearBooleanRefinements() {
		if($cache.main.find('a.refinement-true-false-active').size()){
			if($('#see_everything_in_category_link').size() == 1){
				var href = $('#see_everything_in_category_link').val();
				$('.refinement-true-false:first').before('<span class="refinement-true-false-clear see-everything" data-reset="' + href + '">See Everything in Category</span>');
				$('.refinement-true-false-clear').click(function(){
						window.location = $(this).data('reset');
					});
			}
		}
	}

	function initializeEvents() {
		// compare checked
		$cache.main.on("click", "input[type='checkbox'].compare-check", function (e) {
			var cb = $(this);
			var tile = cb.closest(".product-tile");

			var func = this.checked ? app.product.compare.addProduct : app.product.compare.removeProduct;
			var itemImg = tile.find("div.product-image a img").first();
			func({
				itemid : tile.data("itemid"),
				uuid : tile[0].id,
				img : itemImg
			});

		});

		// handle events for updating grid
		$cache.main.on("click", ".refinements a, .pagination a, .load-more", function (e) {
			  if($(this).parent().hasClass("unselectable")) { return false; }

			  var uri = app.util.getUri(this);

			  if($(this).hasClass('clear-attributes')){
				  return true;
			  }

			  if($(this).hasClass('folder-content')){
				  return true;
			  }

			  if($(this).hasClass('no-ajax')){
				  return true;
			  }

			  if (uri.path.toLowerCase()!==window.location.pathname.toLowerCase() && window.location.pathname.indexOf('Search-Show') == -1) {
					return true;
			  }
			  
			  if($(this).hasClass('load-more')){
				  $(".load-more").hide();
			  }
			  
			  if (uri.query.length > 1) {
					window.location.hash = uri.query.substr(1);
			  }
			  else {
					updateProductListing(true, this.href);
			  }

			  return false;
		});


		// handle events item click. append params.
		bindtileitems();

		// handle events item click. append params.
		$cache.main.on("click", "#mobile-refinements", function (e) {
			$(this).toggleClass('active');
			$('#secondary').toggleClass('active');
		});

		// handle sorting change
		$cache.main.on("change", ".sort-by select", function (e) {
			var refineUrl = $(this).find('option:selected').val();
			var refineLbl = $(this).find('option:selected').text();
			var uri = app.util.getUri(refineUrl);
			window.location.hash = uri.query.substr(1);
			Omniture.OnClicks.CLPSortingClicked.occurred(refineLbl);
			return false;
		})
		.on("change", ".items-per-page select", function (e) {
			var refineUrl = $(this).find('option:selected').val();
			var uri = app.util.getUri(refineUrl);
			window.location.hash = uri.query.substr(1);
			return false;
		})
		.on("mouseup", "#styled-sorts-dd li, #m-styled-sorts-dd li", function(e) {
			var refineUrl = $(this).attr("data-url");
			var uri = app.util.getUri(refineUrl);
			window.location.hash = uri.query.substr(1);
			var sruleKey = "&srule=";
			var queryValues = app.util.getQueryStringParams(uri.query.substr(1));
			var srule = sruleKey + queryValues.srule;
			$(".load-more").attr("href", function() {
				var targetUrl = this.href;
				if (targetUrl.search('srule') > 0) {
					targetUrl = app.util.removeParamFromURL(targetUrl, 'srule');
				}
				return targetUrl + srule;
			});
			return false;
		});

		
		clearBooleanRefinements();


		// handle hash change
		if (app.page.type!=="content-results") {
		   // handle hash change
		   var $window = $(window);
		   
		   $(window).bind('hashchange', function () {
				updateProductListing(true, null);
		   });
		}

	}

	app.search = {
		init : function () {
			$cache = {
				main : $("body"),
				items : $("#search-result-items"),
				container: $("#main")
				
				
			};
			$cache.content = $cache.main.find(".search-result-content");
			// if (app.product.compare) {
				app.product.compare.init();
			// }
			updateProductListing(false, false);
			app.product.tile.init();
			initializeEvents();
		}
	};

}(window.app = window.app || {}, jQuery));

//function for re-binding the product tiles as they are pulled in from ajax on grid page refinement
function bindtileitems(){
	$(".product-tile a:not('#quickviewbutton')").on("click", function (e) {
		var a = $(this);
		// get current page refinement values
		var wl = window.location;

		var qsParams = (wl.search.length > 1) ? app.util.getQueryStringParams(wl.search.substr(1)) : {};
		var hashParams = (wl.hash.length > 1) ? app.util.getQueryStringParams(wl.hash.substr(1)) : {};

		// merge hash params with querystring params
		var params = $.extend(hashParams, qsParams);
		if (!params.start) {
			params.start = 0;
		}
		// get the index of the selected item and save as start parameter
		var tile = a.closest(".product-tile");
		var idx = tile.data("idx") ? +tile.data("idx") : 0;

		// convert params.start to integer and add index
		params.start=(+params.start)+(idx+1);
		// set the hash and allow normal action to continue
		a[0].hash = $.param(params);
		window.location = a[0].href;

		return false;
	});
}

// app.bonusProductsView
(function (app, $) {
	var $cache = {};
	var selectedList = [];
	var maxItems = 1;
	var bliUUID = "";

	function getBonusProducts() {
		var o = {};
		o.bonusproducts = [];

		var i, len;
		for (i=0, len=selectedList.length;i<len;i++) {
			var p = { pid : selectedList[i].pid,	qty : selectedList[i].qty, options : {} };
			var a, alen, bp=selectedList[i];
			for (a=0,alen=bp.options.length;a<alen;a++) {
				var opt = bp.options[a];
				p.options = {optionName:opt.name,optionValue:opt.value};
			}
			o.bonusproducts.push({product:p});
		}
		return o;
	}

	function updateSummary() {

		if (selectedList.length===0) {
			$cache.bonusProductList.find("li.selected-bonus-item").remove();
		}
		else {
			var ulList = $cache.bonusProductList.find("ul.selected-bonus-items").first();
			var itemTemplate = ulList.children(".selected-item-template").first();
			var i, len;
			for (i=0, len=selectedList.length;i<len;i++) {
				var item = selectedList[i];
				var li = itemTemplate.clone().removeClass("selected-item-template").addClass("selected-bonus-item");
				li.data("uuid", item.uuid).data("pid", item.pid);
				li.find(".item-name").html(item.name);
				li.find(".item-qty").html(item.qty);
				var ulAtts = li.find(".item-attributes");
				var attTemplate = ulAtts.children().first().clone();
				ulAtts.empty();
				var att;
				for (att in item.attributes) {
					var attLi = attTemplate.clone();
					attLi.addClass(att);
					attLi.children(".display-name").html(item.attributes[att].displayName);
					attLi.children(".display-value").html(item.attributes[att].displayValue);
					attLi.appendTo(ulAtts);
				}
				li.appendTo(ulList);
			}
			ulList.children(".selected-bonus-item").show();
		}

		// get remaining item count
		var remain = maxItems - selectedList.length;
		$cache.bonusProductList.find(".bonus-items-available").text(remain);
		if (remain <= 0) {
			$cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
		}
		else {
			$cache.bonusProductList.find("button.button-select-bonus").removeAttr("disabled");
		}
	}
	/** ******* public app.bonusProductsView object ******** */
	app.bonusProductsView = {
		init : function () {
			$cache = {
				bonusProduct : $("#bonus-product-dialog"),
				resultArea : $("#product-result-area")
			};
		},
		show : function (url) {
			// add element to cache if it does not already exist
			if(!$cache.bonusProduct) {
				app.bonusProductsView.init();
			}

			// create the dialog
			$cache.bonusProduct = app.dialog.create({
				target : $cache.bonusProduct,
				options : {
					width: 745,
					dialogClass : 'quickview',
					title : app.resources.BONUS_PRODUCTS
				}
			});

			// load the products then show
			app.ajax.load({
				target : $cache.bonusProduct,
				url : url,
				callback : function () {
					$cache.bonusProduct.dialog('open');
					app.bonusProductsView.initializeGrid();
				}
			});

		},
		// close the quick view dialog
		close : function () {
			$cache.bonusProduct.dialog('close');
		},
		loadBonusOption : function () {
			$cache.bonusDiscountContainer = $(".bonus-discount-container");
			if ($cache.bonusDiscountContainer.length===0) { return; }

			app.dialog.create({
				target : $cache.bonusDiscountContainer,
				options : {
					height : 'auto',
					width : 350,
					dialogClass : 'quickview',
					title : app.resources.BONUS_PRODUCT
				}
			});
			$cache.bonusDiscountContainer.dialog('open');

			// add event handlers
			$cache.bonusDiscountContainer.on("click", ".select-bonus-btn", function (e) {
				e.preventDefault();
				var uuid = $cache.bonusDiscountContainer.data("lineitemid");
				var url = app.util.appendParamsToUrl(app.urls.getBonusProducts,
													 {
														bonusDiscountLineItemUUID : uuid,
														source : "bonus"
													 });

				$cache.bonusDiscountContainer.dialog('close');
				app.bonusProductsView.show(url);
			}).on("click", ".no-bonus-btn", function (e) {
				$cache.bonusDiscountContainer.dialog('close');
			});
		},
		initializeGrid : function () {
			$cache.bonusProductList = $("#bonus-product-list"),
				bliData = $cache.bonusProductList.data("line-item-detail");

			maxItems = bliData.maxItems;
			bliUUID = bliData.uuid;

			if (bliData.itemCount>=maxItems) {
				$cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
			}

			var cartItems = $cache.bonusProductList.find(".selected-bonus-item");

			cartItems.each(function() {
				var ci = $(this);

				var product = {
					uuid : ci.data("uuid"),
					pid : ci.data("pid"),
					qty : ci.find(".item-qty").text(),
					name : ci.find(".item-name").html(),
					attributes: {}
				};
				var attributes = ci.find("ul.item-attributes li");
				attributes.each(function(){
					var li = $(this);
					product.attributes[li.data("attributeId")] = {
						displayName:li.children(".display-name").html(),
						displayValue:li.children(".display-value").html()
					};
				});
				selectedList.push(product);
			});


			$cache.bonusProductList.on("click", "div.bonus-product-item a[href].swatchanchor", function (e) {
				e.preventDefault();

				var anchor = $(this),
					bpItem = anchor.closest(".bonus-product-item"),
					bpForm = bpItem.find("form.bonus-product-form"),
					qty = bpForm.find("input[name='Quantity']").first().val(),
					params = {
						Quantity : isNaN(qty) ? "1" : qty,
						format : "ajax",
						source : "bonus",
						bonusDiscountLineItemUUID : bliUUID
					};

				var url = app.util.appendParamsToUrl(this.href, params);

				app.progress.show(bpItem);
				app.ajax.load({
					url: url,
					callback : function (data) {
						bpItem.html(data);
					}
				});
			})
			.on("click", "button.button-select-bonus", function (e) {
				e.preventDefault();
				if (selectedList.length>=maxItems) {
					$cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
					$cache.bonusProductList.find("bonus-items-available").text("0");
					return;
				}

				var form = $(this).closest("form.bonus-product-form"),
					detail = $(this).closest(".product-detail");
					uuid = form.find("input[name='productUUID']").val(),
					qtyVal = form.find("input[name='Quantity']").val(),
					qty = isNaN(qtyVal) ? 1 : (+qtyVal);

				var product = {
					uuid : uuid,
					pid : form.find("input[name='pid']").val(),
					qty : qty,
					name : detail.find(".product-name").text(),
					attributes : detail.find(".product-variations").data("current"),
					options : []
				};

				var optionSelects = form.find("select.product-option");

				optionSelects.each(function (idx) {
					product.options.push({
						name : this.name,
						value : $(this).val(),
						display : $(this).children(":selected").first().html()
					});
				});
				selectedList.push(product);
				updateSummary();
			})
			.on("click", ".remove-link", function(e){
				e.preventDefault();
				var container = $(this).closest("li.selected-bonus-item");
				if (!container.data("uuid")) { return; }

				var uuid = container.data("uuid");
				var i, len = selectedList.length;
				for(i=0;i<len;i++) {
					if (selectedList[i].uuid===uuid) {
						selectedList.splice(i,1);
						break;
					}
				}
				updateSummary();
			})
			.on("click", ".add-to-cart-bonus", function (e) {
				e.preventDefault();
				var url = app.util.appendParamsToUrl(app.urls.addBonusProduct, {bonusDiscountLineItemUUID:bliUUID});
				var bonusProducts = getBonusProducts();
				// make the server call
				$.ajax({
					type : "POST",
					dataType : "json",
					cache	: false,
					contentType : "application/json",
					url : url,
					data : JSON.stringify(bonusProducts)
				})
				.done(function (response) {
					// success
					app.page.refresh();
				})
				.fail(function (xhr, textStatus) {
					// failed
					if(textStatus === "parsererror") {
						window.alert(app.resources.BAD_RESPONSE);
					} else {
						window.alert(app.resources.SERVER_CONNECTION_ERROR);
					}
				})
				.always(function () {
					$cache.bonusProduct.dialog("close");
				});
			});
		}
	};

}(window.app = window.app || {}, jQuery));

// app.giftcard
(function (app, $) {

	app.giftcard = {
		checkBalance : function (id, callback) {
			// load gift certificate details
			var url = app.util.appendParamToURL(app.urls.giftCardCheckBalance, "giftCertificateID", id);

			app.ajax.getJson({
				url: url,
				callback: callback
			});
		}
	};
}(window.app = window.app || {}, jQuery));

// app.checkout
(function (app, $) {
	var $cache = {
			isShipping:false,
			isMultiShipping:false,
			isBilling:false,
			isSubmitOrder:false,
			shippingMethods:null
		};
	
	function setSelectedAddress(form) {
		var $form = $(form);
		var $addressBook = $form.find('.address-book');
		var $selected = $addressBook.length ? $addressBook.find('.box.selected') : null;
		
		if (!$selected || !$selected.length) { return; }
		
		$form.find('.address-form input').val('');
		var data = $selected.data("address");
		
		if (!data) { return; }
		
		var p;
		for (p in data) {
			if ($cache[p] && data[p]) {
				$cache[p].val(data[p].replace("^","'"));
			}
		}
	}
	

	/*
	 * GLOBAL CHECKOUT FUNCTIONS
	 */

	function initializeDom() {
	   	if($('.checkout-shipping').length){
	   		initializeShippingDom();
	   	} else{
	   		initializeMultiShippingDom();
	   	}
	   	if(app.customer.authenticated){
	   		if($.cookie('numaddress')){
				var numAddress = parseInt($.cookie('numaddress'));

				// Call function to remove cookie.
				removeCookie('numaddress');

				for(i=1; i<=numAddress; i++){
					var addrName = 'address'+ i;

					// Call function to remove cookie.
					removeCookie(addrName);
				}
			}
		}

		// Remove address cookie.
		function removeCookie(cookieName){
			var date = new Date();
			date.setTime(date.getTime()+(-1*24*60*60*1000));// -1 is the day
			var expires = "; expires="+date.toGMTString();
			document.cookie = cookieName+"="+expires+"; path=/";
		}

	}

	function initializeCache() {
		$cache.pt_checkout = $('.pt_checkout');
		

		if(!$cache.current) { // one-time cache of elements used in accordion
			$cache.shippingHeader = $('div.accordion-group.shipping .accordion-heading');
			$cache.shippingInner = $('div.accordion-group.shipping .accordion-inner');
			$cache.billingHeader = $('div.accordion-group.payment .accordion-heading');
			$cache.billingInner = $('div.accordion-group.payment .accordion-inner');
			$cache.summaryHeader = $('div.accordion-group.confirm .accordion-heading');
			$cache.summaryInner = $('div.accordion-group.confirm .accordion-inner');
		}
		// currently showed section in accordion, shipping is the default
		$cache.current = $cache.current || $cache.shippingHeader;

		// JSON of countries and regions (states), updated by
		// getCountriesAndRegions function
		if(!app.countries) { app.countries = null; }

		if ($cache.isMultiShipping) {
			$cache.currentForm = $(".multishipping-addresses-form");
			$cache.multiShippingForm = $cache.currentForm;

		} else if($cache.isShipping || $cache.isBilling) {

			// below list of elements need to be re-cached as we move into shipping or billing
			$cache.currentForm = ($cache.isShipping) ? $(".checkout-shipping") : $(".checkout-billing");
		   	$cache.addressList = $cache.currentForm.find(".address-book");
			$cache.firstName = $cache.currentForm.find("input[name$='_firstName']");
			$cache.lastName = $cache.currentForm.find("input[name$='_lastName']");
			$cache.address1 = $cache.currentForm.find("input[name$='_address1']");
			$cache.address2 = $cache.currentForm.find("input[name$='_address2']");
			$cache.city = $cache.currentForm.find("input[name$='_city']");
			$cache.postalCode = $cache.currentForm.find("input[name$='_zip']");
			$cache.phone = $cache.currentForm.find("input[name$='_phone']");
			$cache.mobile = $cache.currentForm.find("input[name$='_mobile']");
			$cache.countryCode = $cache.currentForm.find("[id$='_country']");
			$cache.stateCode = $cache.currentForm.find("[id$='_state']");
			$cache.addToAddressBook = $cache.currentForm.find("input[name$='_addToAddressBook']");
			$cache.ID = $cache.currentForm.find("input[name$='_addressid']").val($cache.currentForm.find("input[name$='_addressid']").val().replace(/[^A-Za-z0-9]/g, "-"));
			$cache.emailAddress = $cache.currentForm.find("input[name$='_emailAddress']");
			$cache.continueOnShipping = $("#continueOnShipping");

			if ($cache.isShipping && !$cache.shippingForm) { 
				// one-time cache of shipping elements
				$cache.shippingForm = $cache.currentForm;
				$cache.isGift = $cache.currentForm.find("input[name$='_isGift']");
				$cache.giftMessage = $cache.currentForm.find(".gift-message-text");
				$cache.shippingMethodList = $("#shipping-method-list");
				$cache.shippingMethodCtnr = $(".shipping-methods");
				$cache.cartTable = $("#cart-table");
				$cache.cartTableHolder = $(".cart-table-holder");

			} else if($cache.isBilling || !$cache.billingForm) { 
				// one-time cache of billing elements
				$cache.billingForm = $cache.currentForm;
				$cache.email = $cache.currentForm.find("input[name$='_emailAddress']");
				$cache.save = $cache.currentForm.find("button[name$='_billing_save']");
				$cache.paymentMethods = $cache.currentForm.find("div.payment-method");
				$cache.paymentMethodId = $cache.currentForm.find('#paymentmethodselect option'); // [value="CREDIT_CARD"]',
																									// '#paymentmethodselect
																									// option[value="CREDIT_CARD"]
				$cache.paymentMethodIdHolder = $cache.currentForm.find('#dwfrm_billing_paymentMethods_selectedPaymentMethodID');
				$cache.ccContainer = $("#PaymentMethod_CREDIT_CARD");
				$cache.ccList = $('#paymentmethodselect');
				$cache.ccOwner = $cache.ccContainer.find("input[name$='_owner']");
				$cache.ccType = $cache.ccContainer.find("select[name$='_type']");
				$cache.ccNum = $cache.ccContainer.find("input[name$='_number']");
				$cache.ccMonth = $cache.ccContainer.find("[name$='_month']");
				$cache.ccYear = $cache.ccContainer.find("[name$='_year']");
				$cache.ccCcv = $cache.ccContainer.find("input[name$='_cvn']");
				$cache.pier1CardContainer = $("#PaymentMethod_PIER1_REWARDS");
				$cache.pier1CardList = $("#pier1CardList");
				$cache.pier1CardOwner = $cache.pier1CardContainer.find("input[name$='_owner']");
				$cache.pier1CardType = $cache.pier1CardContainer.find("select[name$='_type']");
				$cache.pier1CardNum = $cache.pier1CardContainer.find("input[name$='_number']");
				$cache.BMLContainer = $("#PaymentMethod_BML");
				$cache.gcCheckBalance = $("#gc-checkbalance");
				$cache.cbSameAsShipping = $("#cbSameAsShipping");
			}
			

		} else if ($cache.isSummary) {
			$cache.currentForm	 = $(".submit-order");
			$cache.summaryForm	 = $cache.currentForm;
			$cache.passwordField   = $cache.currentForm.find("input[name$='_password']");
			$cache.passwordConfirm = $cache.currentForm.find("input[name$='_passwordconfirm']");
			$cache.checkOutButton  = $cache.currentForm.find(".check-out-button");

		}
	}

	function initializeEvents() {

		$cache.pt_checkout.on('click', '.ship-method', function(e){
			if (!this.checked) { return; }

			var $this = $(this),
				shippingGroup = $this.closest('.shipping-methods').data('group') || 'ship',
				orderType = $this.data('ordertype'),
				params = {
					uuid : orderType || shippingGroup,
					shipmethod : $this.val(),
					previousshipmethod : $this.parents('.contentcontainer').attr('data-shipmethod'),
					shipSelected: true,
					refresh : true
				};

			$.event.trigger({
				type: 'lineItemChange',
				params: params
			});
		})
		.on('click', '.ship-hd-info', function(e) {
			e.preventDefault();
			app.dialog.open({url:this.href, options: { height: ($(window).height() * .75) }});
		})
		.on('click', '.address-edit, .add-new-address', function(e) {
			e.preventDefault();
			
			var $this = $(this),
				$listContainer = $this.closest('.select-address'),
				uuid = $this.closest('.box').data('uuid'),
				vars = { container: $listContainer, uuid: uuid };
				
			var settings = {
					open: function(e, ui) {
						// init address form
						var $this = $(this),
							$form = $this.find('form').first(),
							vars = $this.data('vars');
							
						$('input, textarea').placeholder();
						$form.validate();
						
						$form.on('click', '.apply', function(e) {
							e.preventDefault();
							
							if (!$form.valid()) { return false; }

							$form.find("input[name='format']").remove();

							var addressId = $form.find("input[name$='_addressid']");
							addressId.val(addressId.val().replace(app.rxIdReplace, '-'));
							
							var url = app.util.ajaxUrl($form.attr("action"));
							var postData = $form.serializeArray();
						
							postData = postData.concat( { name: "fromCart", "value" : true },
							                            { name: "ship", "value" : $cache.isShipping },
							                            { name: "uuid", "value" : (vars.uuid || '') });
							
							$.ajax({
								type: "POST",
								url: url,
								data: postData
							}).done(function(data) {
								vars.container.html(data);
								vars.container.find('.box.selected .use-address').trigger('click');
								
							}).fail(function(xhr, textStatus) {
								alert("Unable to update save address. Please try again later.");
							}).always(function() {
								app.dialog.close();
							});
						})
						.on('click', '.cancel', function(e) {
							e.preventDefault();
							app.dialog.close();
						});
					
	
					},
					title: uuid ?  'Edit Address' : 'Add Address',
					dialogClass: 'aDlg'
				};
		
			app.dialog.open({url: this.href, vars: vars, options: $.extend({}, app.myaccountdlg.settings, settings) });	
		})
		.on('click', '.use-address', function(e){
			var $this = $(this);
			var $form = $this.closest('form');
			var $addressBook = $form.find('.address-book');
			
			$addressBook.find('.box').removeClass('selected');
			$addressBook.find('.use-address').text('Use This Address');
			
			var $selected = $this.closest('.box').addClass('selected');
			
			$this.text($cache.isBilling ? 'Billing here' : 'Shipping here');
			
			setSelectedAddress($form);
			
			if (!$cache.isBilling) {
			
				$.ajax({
					url: app.util.appendParamsToUrl(app.urls.cartSetPostalCode, { postalCode : $cache.postalCode.val() }),
					dataType: 'html',
					beforeSend: function() {
						$('#loader').show();
					}
				}).done(function(response) {
					if(!response.length){ return; }
	
					var responseMarkup = $('<div>'+response+'</div>');
					app.cart.resetCartTable(responseMarkup.find('#cart-table'));
					app.cart.resetShippingMethods(responseMarkup.find('.shipping-methods'));
					app.cart.resetSummary(responseMarkup.find('#basket-summary-holder'));
					responseMarkup = null;
	
				}).fail(function(xhr, status, msg){
					alert("An error occurred while updating your shipping options.");
				}).always(function() {
					$('#loader').hide();
				});
			}

			$cache.currentForm.find('.address-form').addClass('form-hidden');
			$cache.currentForm.find('.check-out-button').prop('disabled', false);
		})
		.on('change', 'input[name$="_addToAddressBook"]', function(e) {
			var $this = $(this),
				$form = $this.closest('form'),
				$addressid = $form.find('input[name$="_addressid"]');
			
			if (!this.checked) {
				$this.data('address-id', $addressid.val());
				$addressid.val('');
				return;
			}
			
			if (!$addressid.val().length) {
				$addressid.val($this.data('address-id') || '');
			}
		});

		// override enter key for coupon code entry
		$("form.minisummary-coupon").find("input[name$='_couponCode']").on("keydown", function (e) {
			if (e.which === 13 && $(this).val().length===0) { return false; }
		});

		if($cache.isShipping){
			app.checkout.initShipping();
		} else {
			app.checkout.initMultiShipping();
			$('.shipping-address select:visible').first().trigger('change');
		}

		// initializes coupon form on summary
		updateSummary();

		// initial accordion behaviour
	   	$cache.shippingInner.show();
	   	$cache.billingInner.hide();
	   	$cache.summaryInner.hide();
	   	$cache.billingHeader.toggleClass('up');
	   	$cache.summaryHeader.toggleClass('up');

	   	// handling click event on the title of every section in accordion
	   	$('.accordion-heading').click(function(e) {
	   		e.preventDefault();
	   		if($(this).siblings('.accordion-inner').children().length > 0){
	   			
	   			toggleAccordion($(this));
	   			initializeCache();
	   			getCountriesAndRegions(function(){
	   				if(!$cache.isShipping) {
	   					return;
	   				}
	   				
	   				var url = app.urls.getCheckoutAddressList,
					$selectList = $cache.shippingForm.find('.select-address');
				
					if (!$selectList.length) {
						return;
					}
					
					url = app.util.appendParamsToUrl(url, { ship: true, includePlist: true });
					$.ajax( url ).done(function(data) { 
						$selectList.closest('.select-address').html(data);
						checkForFilledForm($cache.shippingForm);
		   				app.cart.setShippingVisibility();
					});

	   			});

	   			$(".reg,.select-address,#shipping-method-list,.cart-table-holder").show();
	   			$(".gift-message-text").css('margin-bottom','10px');
	   			
	   			if($('.address-book').find('.selected').length == 0){
					$('.address-form').removeClass('form-hidden');
	   			}
	   			
	   		}
	   	 });

	   	// Basket summary scroll
		if($("#main").length){
			jQuery(window).scroll(function(event) {
				var stickyEl = jQuery('#secondary'),
					elTop = stickyEl.offset().top,
					thisTop = $(this).scrollTop(),
					windowBottom = $("#main").offset().top + $("#main").height();

				if(thisTop < 40) {
					stickyEl.css('top', 80);
				}
				else if(thisTop + 80 + stickyEl.height() > windowBottom + 40){
					stickyEl.css('top', windowBottom - stickyEl.height());
				}
				else {
					stickyEl.css('top', thisTop + 40);
				}			
			});
		}

	}

	// updates the order summary based on a possibly recalculated
	// basket after a shipping promotion has been applied
	function updateSummary() {
		var url = app.urls.summaryRefreshURL,
			summary = $("#secondary .summary"),
			cartPage = $(".pt_cart");

		if(cartPage.length == 0 || (cartPage.length && cartPage.data("basket") == true)){
			// indicate progress
			app.progress.show(summary);
		}
			// load the updated summary area
		summary.load( url, function () {

			var redemptionDiv = $("form.minisummary-coupon").find("div.redemption.coupon");

			// hide edit shipping method link
			summary.fadeIn("fast");
			summary.find('.checkout-mini-cart .minishipment .header a').hide();
			summary.find('.order-totals-table .order-shipping .label a').hide();

			// Shipping tooltip
			summary.find('.shipping-tooltip').hide();

			// coupon form toggle visibility
			$(".entercodelink").click(function(){
				$(".couponcodeform").show();
				$(".couponcodeform input").focus();
				$(".entercodelink").hide();
			});


			var $cb = $("#checkoutBtn"),
				$sb = summary.find('.cart-footer button');

			// sync behavior and state of checkout and summary buttons
			if ($cb && $cb.length) {
				$sb.on('click', function(e){
					e.preventDefault();
					$cb.trigger('click');
				});

				$sb.prop('disabled', $cb.prop('disabled'));
			}

			if ($.fn.qtip) { 
				$(".question-shipping").qtip({
					content: $('.shipping-tooltip'),
					show: 'click',
				   	style: {
				   		width: 190
				   	},
					position: {
						my: 'middle right',
						at: 'middle left'
					}
				});
			}
			addCouponRemoveEvent(redemptionDiv);
			addNewCouponEvent(redemptionDiv);
		});
		
		// disable continue if no shipping methods
		var isDisabled = !!$('.no-shipping-methods').length;
		
		if($cache.continueOnShipping) {
			$cache.continueOnShipping.prop('disabled', isDisabled);
		}
	}

	function ajaxCartTableReload() {
		if ($cache.isMultiShipping) { // reload the multishipping table
			$.get(app.urls.reloadMultipleShipping, function(response) {
				if($.trim(response) == 'EMPTY_BASKET'){
					window.location = app.urls.cartShow;
					return;
				}
				$cache.shippingInner.empty().html(response);
				app.checkout.initMultiShipping();
				$('.shipping-address select:visible').first().change();
			});
		} else if ($cache.isShipping) { // reload the single shipping table
			$.get(app.urls.shippingCartTableReload, function(response) {
				if($.trim(response) == 'EMPTY_BASKET'){
					window.location = app.urls.cartShow;
					return;
				}
				if(!response.length){ return; }
				var responseMarkup = $('<div>'+response+'</div>');
				app.cart.resetCartTable(responseMarkup.find('#cart-table'));
			});
			return;
		} else{ // default: reload the cart table on the main basket page
			var url = app.util.appendParamsToUrl(app.urls.cartTableReload, {ischeckout:1});
			$.get(app.urls.cartTableReload, function(response) {
				if($.trim(response) == 'EMPTY_BASKET'){
					window.location = app.urls.cartShow;
					return;
				}
				
				var responseMarkup = $('<div>'+response+'</div>');
				app.cart.resetApproachingAlert(responseMarkup.find('.cart-approaching-container'));
				
				$('#cart-table').html(responseMarkup.find('#cart-table').html());

				app.storeTools.init();
				app.cart.bindShipStoreEvents();
			});
		}
	}

	// add new coupon click event
	function addNewCouponEvent(redemptionDiv){
		$('form.minisummary-coupon').submit(function(e){
			e.preventDefault();
			var couponCodeField = $("form.minisummary-coupon").find("input[name$='_couponCode']");

			var val = couponCodeField.val();
			if (val.length===0) {
				// app.util.(app.resources.COUPON_CODE_MISSING);
				showBadPromoCodeError(app.resources.COUPON_CODE_MISSING);
				return;
			}

			var url = app.util.appendParamsToUrl(app.urls.addCoupon, {couponCode:val,format:"ajax"});
			$.getJSON(url, function(data) {
				var msg = data ? data.message : app.resources.BAD_RESPONSE;
				if (!data.success) {
					showBadPromoCodeError(msg);
					return;
				}
				
				if (data.showpaymsg != null && data.showpaymsg) {
					app.customer.rewardsCouponUser = true;
					var msgDiv = document.getElementById("payMethodReminder");
					if( msgDiv ){
						msgDiv.style.display='block';
					}
				}

				redemptionDiv.html(data.message+'<span id='+val+' class="remove-coupon-summary">X</span>');
				
				// If not qualified by applied, show tool tip.
				if(!data.applied){
					showBadPromoCodeError(data.unqualifiedMessage);
				}
				else {
					updateSummary();
					ajaxCartTableReload();
				}
			});
		});

		function showBadPromoCodeError(message){
			$("#dwfrm_billingcoupon_couponCode").qtip({
				content: message,
				style: {
					classes: 'qtipPromoError'
				},
				show: {
					event: false,
					ready: true
				},
				hide: {
					event: 'unfocus'
				},
				position: {
					my: 'bottom center',
					at: 'top center'
				}
			});
		}
	}

	// initialize remove button on currently active coupon
	function addCouponRemoveEvent(reddiv) {
		reddiv.on("click", '.remove-coupon-summary', function(e) {
			 var thisid = $(this).attr("id");
			 var url = app.util.appendParamsToUrl(app.urls.removeCoupon, {couponCode:thisid,format:"ajax"});
			 $.getJSON(url, function(data) {
					if (!data || !data.status) {
						app.util.notifyMe("Could not remove coupon from cart");
						return;
					}
					if (data.showpaymsg != null && !data.showpaymsg) {
						app.customer.rewardsCouponUser = false;
						var msgDiv = document.getElementById("payMethodReminder");
						if( msgDiv ){
							msgDiv.style.display='none';
						}
					}
					reddiv.html("Removed promo code from cart");
					updateSummary();
					ajaxCartTableReload();
			 });
		});
	}

	// defining accordion behaviour
	function toggleAccordion(heading){
		if ($(heading).parent('.shipping').length) {
			if($(heading).hasClass('up')){
			   	if($('.multishipping-addresses-form').length){
			   		initializeMultiShippingDom();
			   	} else{
			   		initializeShippingDom();
			   	}
		   		ajaxCartTableReload();
				$cache.current.siblings('.accordion-inner').stop().slideToggle(1600);
				$cache.shippingInner.stop().slideToggle(1600);
				$cache.shippingHeader.toggleClass('up');
			   	$('.accordion-footer').removeClass('up');
			   	$($cache.current).toggleClass('up');
			   	$('.shipping-closed').hide();
			   	if($('.payment-closed').children().length > 0){
			   		$('.payment-closed').show();
			   	}
			   	$cache.shippingHeader.find('a').hide();
			   	$cache.current = $cache.shippingHeader;
			}
   		} else if ($(heading).parent('.payment').length) {
   			if($(heading).hasClass('up')){
			   	initializeBillingDom();
			   	$cache.shippingHeader.find('a').show();
  				$cache.current.siblings('.accordion-inner').stop().slideToggle(1600);
			   	$cache.billingInner.stop().slideToggle(1600);
			   	$cache.billingHeader.toggleClass('up');
			   	$('.accordion-footer').removeClass('up');
			   	$cache.current.toggleClass('up');
			   	$('.shipping-closed').show();
			   	$('.payment-closed').hide();
			   	$cache.billingHeader.find('a').hide();
			   	$cache.current = $cache.billingHeader;
   			}
   		} else if ($(heading).parent('.confirm').length) {
   			if($(heading).hasClass('up')){
			   	initializeSummaryDom();
			   	$cache.current.siblings('.accordion-inner').stop().slideToggle(1600);
			   	$cache.summaryInner.stop().slideToggle(1600);
			   	$cache.summaryHeader.toggleClass('up');
			   	$('.accordion-footer').addClass('up');
			   	$cache.current.toggleClass('up');
			   	$('.shipping-closed, .payment-closed').show();
			   	$cache.shippingInner.find('a').show();
			   	$cache.billingHeader.find('a').show();
			   	$cache.current = $cache.summaryHeader;
   			}
   		}
	}

	// gets the countries and regions (states) for the current form as a JSON
	// object
	function getCountriesAndRegions(callback){
		var url = app.util.appendParamsToUrl(app.urls.getCountriesAndRegions, {country: $cache.countryCode.attr('id'), state: $cache.stateCode.attr('id'), country: 'forms'})
		app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data) {
					return false;
				}
				app.countries = data;
				if(callback){
					callback();
				}
			}
		});
	}


	function handleStateCityZip() {
		var coutForm = $cache.currentForm;
		if($cache.isBilling){
			coutForm = $(".checkout-billing");
		}
		coutForm.find("select[name$='_country']").css({visibility: 'hidden', position: 'absolute'});
		coutForm.find("select[name$='_state']").css({visibility: 'hidden', position: 'absolute'});
		coutForm.find("input[name$='_city']").css({visibility: 'hidden', position: 'absolute'});
		coutForm.find("input[name$='_zip']").on('blur', function() {
			var zip = coutForm.find("input[name$='_zip']").val();
			if (coutForm.find("input[name$='_zip']").val() == coutForm.find('.state-city').children(':selected').first().val()) {
				return;
			}
			var statesAndCities = app.ui.citiesjsondata;

			coutForm.find('.state-city').remove();
			coutForm.find("input[name$='_zip']").parent('.form-row').append('<select class="state-city" placeholder="City/State"/>');
			var stateCitySelect = coutForm.find('.state-city');
			$(stateCitySelect).on('change', function(){
				if ($(this).children().filter(":selected").first().val() != '') {
					var selectedOptionValue = $(this).children().filter(":selected").first().text();
					var stateVal = selectedOptionValue.split(', ')[1];
					var cityVal = selectedOptionValue.split(', ')[0];
					coutForm.find("select[name$='_state']").val(stateVal);
					coutForm.find("input[name$='_city']").val(cityVal);
				} else {
					$(stateCitySelect).hide();
					coutForm.find("select[name$='_state']").val('');
					coutForm.find("input[name$='_city']").val('');
					coutForm.find("select[name$='_state']").css({visibility: '', position: ''});
					coutForm.find("input[name$='_city']").css({visibility: '', position: ''});
					coutForm.find("input[name$='_city']").focus();
				}
			});
			var found = false;
			for (var item in statesAndCities) {
				if (statesAndCities[item].id == zip){
					var CSOption = new Option(statesAndCities[item].value, zip);
					$(stateCitySelect).append(CSOption);
					found = true;
				}
			}
			if (found){
				$(stateCitySelect).append(new Option('Other', ''));
				$(stateCitySelect).trigger('change');
				coutForm.find("input[name$='_country']").css({visibility: 'hidden', position: 'absolute'});
				coutForm.find("select[name$='_state']").css({visibility: 'hidden', position: 'absolute'});
				coutForm.find("input[name$='_city']").css({visibility: 'hidden', position: 'absolute'});
			} else {
				$(stateCitySelect).remove();
				coutForm.find("input[name$='_country']").css({visibility: '', position: ''});
				coutForm.find("select[name$='_state']").css({visibility: '', position: ''});
				coutForm.find("input[name$='_city']").css({visibility: '', position: ''});
				coutForm.find("select[name$='_state']").val('');
				coutForm.find("input[name$='_city']").val('');
			}
		});
	}

	function initAddressReviewSettings () {
		$(".enternew").on("click", function(e) {
			e.preventDefault();
			app.myaccountdlg.close();
		});
		$("#confirmAddress").on("click", function(e) {
			var selection = $(".address-selection").filter(":checked").val();
			
			if (selection==="suggested") {
				var corrected = $('.correctedAddress').data('address'),
					p, f, val;
				
				if (!corrected) { return; }
				
				for (p in corrected) {
					f = $cache.shippingForm.find('[name$="_' + p + '"]');
					if (!f.length) { continue; }
					f.val(corrected[p] || '');
				}
				app.myaccountdlg.close();
				var bypassVertex = corrected.state==="HI"||corrected.state==="AK";
				
				if(app.customer.authenticated) {
					var $addressBook = $('.address-book .box.selected'),
						addressObj = $addressBook.data('address');
					
					//Update selected address book data attribute with corrected values
					for( var attr in corrected ) {
						addressObj[attr] = corrected[attr];
					}
						
					$addressBook.data('address', addressObj);
				}
				
				$("#byPassVertex").val(bypassVertex);
				
				if (!bypassVertex) {
					$cache.continueOnShipping.trigger("click");
				}
				return;
			}
			
			// original address selected
			$("#byPassVertex").val(true);
			app.myaccountdlg.close();
			$cache.continueOnShipping.trigger("click");
			

		});
	}

	function clearForm(addressContainer) {
		
		if ( $('html').hasClass('ie9') ){
			addressContainer.find("input[name$='state']").val("");
			addressContainer.find("[placeholder]:not([type=hidden])")
							.each(function() { $(this).val($(this).prop('placeholder')); })
							.addClass('placeholder');
			return;
			
		}
		
		addressContainer.find("input:not([type=hidden]), select:not([type=hidden])").val('');
		
	}

	function clearCCForm(ccContainer){
		var owner = ccContainer.find("[id$='_creditCard_owner']"),
			ccNumber = ccContainer.find("[id$='_creditCard_number']"),
			cvn = ccContainer.find("[id$='_creditCard_cvn']");


		owner.val(owner.attr('placeholder')).addClass('placeholder');
		ccNumber.val(ccNumber.attr('placeholder')).addClass('placeholder');
		cvn.val(cvn.attr('placeholder')).addClass('placeholder');
		ccContainer.find("[id$='_creditCard_month']")[0].selectedIndex = 0;
		ccContainer.find("[id$='_creditCard_year']")[0].selectedIndex = 0;
	}

	// pick up address from address form
	function pickUpAddress(addressesContainer){
		var aName = addressesContainer.find("[name$='_firstName']").val();
		var aLastName = addressesContainer.find("[name$='_lastName']").val();
		var aAddress1 = addressesContainer.find("[name$='_address1']").val();
		var aAddress2 = addressesContainer.find("[name$='_address2']").val();
		var aCity = addressesContainer.find("[name$='_city']").val();
		var aCountry = addressesContainer.find("[name$='_country']").val();
		var aState = addressesContainer.find("[name$='_state']").val();
		var aZip = addressesContainer.find("[name$='_zip']").val();
		var aPhone = addressesContainer.find("[name$='_phone']").val();
		var aMobile = addressesContainer.find("[name$='_mobile']").val();
		var aId = addressesContainer.find("[name$='_addressid']").val();
		var aEmail = addressesContainer.find("[name$='_emailAddress']").val();
		var addressVal = {
				ID:aId,
				firstName:aName,
				lastName:aLastName,
				address1:aAddress1,
				address2:aAddress2,
				postalCode:aZip,
				city:aCity,
				stateCode:aState,
				countryCode:aCountry,
				phone:aPhone,
				mobile:aMobile,
				type:"customer",
				emailAddress: aEmail};

		return addressVal;
	}

	function checkForFilledForm(addressesContainer){
		if (!app.customer.authenticated) { return; }
	
		var addressFormAddress = pickUpAddress(addressesContainer);
		
		var isShipping = addressesContainer.hasClass("checkout-shipping");
		
		if (isShipping && !app.cart.hasShipShippingGroup()) { return; }
		
		var $continueButton = addressesContainer.find('.check-out-button');
		
		$continueButton.prop('disabled', true);
		
		if (!addressesContainer.find('.address-book .box .use-address').length) {
			addressesContainer.find('.address-book .box .add-new-address').trigger('click');
			return;
		}
		
		if(!addressFormAddress.ID.length || !addressFormAddress.firstName.length){
			addressesContainer.find('.address-book .box').first().find('.use-address').click();
		}
		else {
			var txt = isShipping ? 'Shipping here' : 'Billing here',
				addressId = addressFormAddress.ID.replace(app.rxIdReplace,"-"),
				selector = '.address-book [data-addressid="' + addressId + '"]', 
				$selectedAddress = addressesContainer.find(selector);
			
			if (!$selectedAddress.length) {
				$selectedAddress = addressesContainer.find('.address-book .box').not('.add-address').first();
			}
			
			if (!$selectedAddress.length) {
				addressesContainer.find('.address-book .box .add-new-address').trigger('click');
				return;
			}
			
			$selectedAddress.find('.use-address').trigger('click');
		}
		
	}


	/*
	 * GLOBAL SHIPPING FUNCTIONS
	 */

	/**
	 * Helper method which constructs a URL for an AJAX request using the
	 * entered address information as URL request parameters.
	 */
	function getShippingMethodURL(url) {
		var newUrl = app.util.appendParamsToUrl(url,
			{
				countryCode:$cache.countryCode.val(),
			 	stateCode:$cache.stateCode.val(),
			 	postalCode:$cache.postalCode.val(),
			 	city:$cache.city.val()
			 },
			 true);
		return newUrl;
	}


	/**
	 * Make an AJAX request to the server to retrieve the list of applicable
	 * shipping methods based on the merchandise in the cart and the currently
	 * entered shipping address (the address may be only partially entered). If
	 * the list of applicable shipping methods has changed because new address
	 * information has been entered, then issue another AJAX request which
	 * updates the currently selected shipping method (if needed) and also
	 * updates the UI.
	 */
	function updateShippingMethodList() {
		if ($cache.shippingMethodList.length === 0) { return; }
		var url = getShippingMethodURL(app.urls.shippingMethodsJSON);

		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data) {
					window.alert("Couldn't get list of applicable shipping methods.");
					return false;
				}
				if ($cache.shippingMethods && $cache.shippingMethods.toString() === data.toString())
				{
					// No need to update the UI. The list has not changed.
					return true;
				}

				// We need to update the UI. The list has changed.
				// Cache the array of returned shipping methods.
				$cache.shippingMethods = data;

				var smlUrl = getShippingMethodURL(app.urls.shippingMethodsList);

				// indicate progress
				app.progress.show($cache.shippingMethodList);

				// load the shipping method form
				$cache.shippingMethodList.load( smlUrl, function () {
					app.cart.setShippingVisibility();
					// rebind the radio buttons onclick function to a handler.
					$cache.shippingMethodList.find('#shippingmethodselect').change(function(){
						selectShippingMethod($(this).val());
					}).change();

					// update the summary
					updateSummary();
					app.progress.hide();
					app.tooltips.init();

					if (data == "004") {
						$('.shipping-methods-select').hide();
					}else{
						$('.shipping-methods-select').show();
					}
				});
			}
		});
	}

	// selects a shipping method for the default shipment
	// and updates the summary section on the right hand side
	function selectShippingMethod(shippingMethodID) {
		// nothing entered
		if(!shippingMethodID) {
			return;
		}
		// attempt to set shipping method
		var url = app.util.appendParamsToUrl(app.urls.selectShippingMethodsList,
			 { countryCode:$cache.countryCode.val(),
			   stateCode:$cache.stateCode.val(),
			   postalCode:$cache.postalCode.val(),
			   city:$cache.city.val(),
			   shippingMethodID:shippingMethodID
			 },
			 true);

		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				updateSummary();
				if(!data || !data.shippingMethodID) {
					window.alert("Couldn't select shipping method.");
					return false;
				}
				// display promotion in UI and update the summary section,
				// if some promotions were applied
				$(".shippingpromotions").empty();
				if(data.shippingPriceAdjustments && data.shippingPriceAdjustments.length > 0) {
					var i,len=data.shippingPriceAdjustments.length;
					for(i=0; i<len; i++) {
						var spa = data.shippingPriceAdjustments[i];
					}
				}
			}
		});
	}

	// Address book
	// TODO: clear up what this is for - is this for the open address book
	// functionality that is incomplete?
	function initializeAddressBook(){
		app.account.init();
	}

	// shipping page logic
	// checkout gift message counter
	function initGiftMessageBox() {
		// show gift message box, if shipment is gift
		$cache.giftMessage.each(function(){
			$(this).toggle($(this).prev().find("input[name$='_isGift']")[0].checked);
		});
	}

	/*
	 * SINGLE SHIPPING FUNCTIONS
	 */

	function initializeShippingDom() {
		$cache.isShipping = true;
		$cache.isMultiShipping = false;
		$cache.isBilling = false;
		$cache.isSummary = false;
	}

	function initializeShippingEvents() {

		getCountriesAndRegions(function(){
			
			bindShippingFieldEvents();
			app.cart.bindCartTableEvents();
			app.cart.setShippingVisibility();
			// may need to add this back in later for ship to store?
			// app.cart.bindShipStoreEvents();

		   	// Check shipping address form
		   	checkForFilledForm($cache.shippingForm);

			if($('div.box.selected').length){
				$('.address-form').addClass('form-hidden');
			}
		});

		$cache.shippingForm.on("change", "input[name$='_isGift']", function (e) {
			if($(this).attr("checked"))
			{
				$cache.currentForm.find(".gift-message-text").show();
			}
			else
			{
				$cache.currentForm.find(".gift-message-text").hide();
			}
		});

		$cache.postalCode.on('change', function(e) {
			var rx = app.validator.regex.postal.us,
				$this = $(this);

			if (!$this.val().length || !rx.test($this.val())) {
				return;
			}

			$.ajax({
				url: app.util.appendParamsToUrl(app.urls.cartSetPostalCode, { postalCode : $this.val() }),
				dataType: 'html',
				beforeSend: function() {
					$('#loader').show();
				}
			}).done(function(response) {
				if(!response.length){ return; }

				var responseMarkup = $('<div>'+response+'</div>');
				app.cart.resetCartTable(responseMarkup.find('#cart-table'));
				app.cart.resetShippingMethods(responseMarkup.find('.shipping-methods'));
				app.cart.resetSummary(responseMarkup.find('#basket-summary-holder'));
				responseMarkup = null;

			}).fail(function(xhr, status, msg){
				alert("An error occurred while updating your shipping options.");
			}).always(function() {
				$('#loader').hide();
			});

		});

		$cache.shippingForm.validate({
			invalidHandler: function(form, validator) {
				var errors = validator.numberOfInvalids();

				if (errors) {
					$("#error-message").show().text(app.resources.UH_OH).addClass();
					$(".address-form").removeClass("form-hidden");
					$('html, body').animate({
						scrollTop: $("#error-message").offset().top-100
					}, 800);
				} else {
					$("#error-message").hide();
				}
			}
		});

	   	// submitting the shipment form
		$cache.shippingForm.on('submit', function(e) {
	   		e.preventDefault();
	   		if(!$(this).valid()){ return; }
	   		
	   		setSelectedAddress(this);

	   		app.ajaxbuttonloader.show($cache.continueOnShipping);
	   		
	   		$.ajax({
				type: "POST",
				url: app.urls.shippingSave,
				data: $cache.shippingForm.serialize()
			})
	   		.done(function(responseData, statusText, xhr){
	   			
	   			app.ajaxbuttonloader.hide($cache.continueOnShipping);
	   			
				if ($(responseData).filter('#dwfrm_singleshipping_shippingAddress').length) {
					// shipping validation issue
					var noShipping = $(responseData).filter("#no-shipping").text().toString();
					if(noShipping == 'true'){
						app.cart.displayNoShipping();								
					}
					else{
						var removeUUID = $(responseData).filter("#removeUUID").text().toString();
						if(removeUUID){
							app.cart.displayOutOfStock(removeUUID);
						}
						else{
							var reviewRequired = $(responseData).filter("#reviewState").text().toString();
							if(validateShippingAddressFormat(reviewRequired)){
								$cache.shippingInner.empty().append(responseData);
								$(".shipping-error").show().text(app.resources.UH_OH);
								app.checkout.initShipping();
							}
						}
					}

				} else if ($(responseData).filter('#wrapper.pt_cart').length) { 
					// cart validation issue (usually tax related)
					var newDoc = document.open("text/html", "replace");
					newDoc.write(responseData);
					newDoc.close();
				} else {
					
					updateSummary();
					$(".shipping-error").hide();
					var paymentMethodId = ($cache.paymentMethodIdHolder.length) ? $cache.paymentMethodIdHolder.val() : '';
					$cache.billingInner.empty().append(responseData);

					toggleAccordion($cache.billingHeader);
					app.checkout.initBilling();
					// get selected payment method and expand form
					if(paymentMethodId.length){
						$cache.ccList.val(paymentMethodId);
						$cache.paymentMethodIdHolder.val(paymentMethodId);
						$("#PaymentMethod_"+paymentMethodId).addClass('payment-method-expanded');
					}

				}
	   		});
	   	});
	}

	function bindShippingFieldEvents(){

		// Ben: This causes all kinds of early validation problems with
		// browser-auto completes and simply showing the form...
		$("#dwfrm_singleshipping_shippingAddress_addressFields_firstName,#dwfrm_singleshipping_shippingAddress_addressFields_lastName,#dwfrm_singleshipping_shippingAddress_addressFields_address1, #dwfrm_singleshipping_shippingAddress_addressFields_city, #dwfrm_singleshipping_shippingAddress_addressFields_zip, #dwfrm_singleshipping_shippingAddress_addressFields_phone, #dwfrm_singleshipping_shippingAddress_email_emailAddress").change(function(){
			$(this).valid();
		});
		$("#dwfrm_singleshipping_shippingAddress_addressFields_country,#dwfrm_singleshipping_shippingAddress_addressFields_states_state, #shippingmethodselect").change(function(){
			$(this).valid();
		});
	}

	function validateShippingAddressFormat(reviewRequired){
		if(reviewRequired != 'null'){
			if(reviewRequired.indexOf("REVIEW") != -1){
				app.checkout.initAddressReview();
				return false;
			}
			if(reviewRequired.indexOf("INVALID") != -1){
				app.checkout.initAddressInvalid();
				return false;
			}
		}
		return true;
	}

	/*
	 * MULTI SHIPPING FUNCTIONS
	 */

	function initializeMultiShippingDom() {
		$cache.isShipping = false;
		$cache.isMultiShipping = true;
		$cache.isBilling = false;
		$cache.isSummary = false;
	}

	function initializeMultiShippingEvents() {

		app.storeTools.init();
		app.cart.bindCartTableEvents();
		app.cart.bindShipStoreEvents();

		if($('#reducedQtyMsg').length){
			app.util.notifyMeQty($('#reducedQtyMsg').html(), {sticky: true, position: "center"});
		}

		$cache.shippingInner.find(".add").on("click", function(e){
			e.preventDefault();
			var options = $.extend(true, {}, {open: initMultiShipmentDialog}, {title : 'Add Address', dialogClass: 'addAddress', closeText : '', height : 'auto', width : 550});
			app.myaccountdlg.open({url:this.href, options:options});

		});
		$cache.shippingInner.find(".edit").on("click", function(e){

			e.preventDefault();
			var addressID = $(this).parents(".shipping-address").find("select").val();

			var url = $(this).attr("href");
			if(!addressID) {
				return false;
			}
			var add_edit_url = app.util.appendParamToURL(url, "addressID", addressID);
			var options = $.extend(true, {}, {open: initMultiShipmentDialog}, {title : 'Edit Address', dialogClass: 'editAddress', closeText : '', height : 'auto', width : 550});
			app.myaccountdlg.open({url:add_edit_url, options:options});
		});
		$cache.shippingInner.find(".open-address-book").on("click", function(e){
			e.preventDefault();
			var options = $.extend(true, {}, {open: initializeAddressBook}, {title : 'Address Book', dialogClass: 'addressBook'});
			
			app.dialog.open({url:app.util.appendParamsToUrl(app.urls.addressList, {format:"ajax"}), options:options});
			
		});

		$cache.shippingInner.find('.shipping-address select').on('change', function(){

			var shipmentUUID = $(this).data('shipmentuuid'),
				addressUUID = $(this).val(),
				formData = 'shipmentuuid='+shipmentUUID+'&addressuuid='+addressUUID;

	   		jQuery.ajax({
				type: "POST",
				url: app.urls.multiShippingAddressesSave,
				data: formData,
				success: function(responseData) {
					$.get(app.urls.reloadMultipleShipping, function(responseDataReload) {
						$cache.shippingInner.empty().html(responseDataReload);
						app.checkout.initMultiShipping();
						updateSummary();
					});
				},
				beforeSend: function() {
					$('#loader').show();
				},
				complete: function(){
					$("#loader").hide();
				}
			});

		});

		$cache.shippingInner.find('.shipping-method select').on('change', function(){

			var shipmentUUID = $(this).data('shipmentuuid'),
				methodID = $(this).val(),
				formData = 'shipmentuuid='+shipmentUUID+'&methodid='+methodID;
			/* save the shipment method for a specific shipment */
	   		jQuery.ajax({
				type: "POST",
				url: app.urls.multiShippingMethodSave,
				data: formData,
				success: function(responseData) {
					$.get(app.urls.reloadMultipleShipping, function(responseDataReload) {
						$cache.shippingInner.empty().html(responseDataReload);
						app.checkout.initMultiShipping();
						updateSummary();
					});
				},
				beforeSend: function() {
					$('#loader').show();
				},
				complete: function(){
					$("#loader").hide();
				}
			});

		});

	   	// MULTISHIPPING - submitting the multishipping address form
		$cache.multiShippingForm.on('submit', function(e){
	   		e.preventDefault();
	   		var formData = $(".checkout-shipping multi-shipping-methods").serialize();
	   		jQuery.ajax({
				type: "POST",
				url: app.urls.multiShippingMethodsSave,
				data: formData,
				success: function(responseData) {
					$cache.billingInner.empty().append(responseData);
					toggleAccordion($cache.billingHeader);
					app.checkout.initBilling();

					// html to be appended to shipment closed info
		   			var shipmentInfo = $(".hidden-shipment-data").html();
					$('.shipping-closed').empty().html(shipmentInfo);

				},
				beforeSend: function() {
					$('#loader').show();
				},
				complete: function(){
					$("#loader").hide();
				}
			});
	   	});

		$cache.shippingInner.find("span.change-shipment-store").on("click", function(e){

			var sID = $(this).data('sid'); // shipment ID

			app.storeTools.loadPreferredStorePanel(null, sID);

		});

		$cache.shippingInner.find(".multiship-select-store span").on("click", function(e){

			var pID 	= $(this).data('pid'),	 // product ID
				pliUUID = $(this).data('pliuuid'); // productLineItem UUID

			app.storeTools.loadPreferredStorePanel(pID, null, pliUUID);

		});

		$cache.shippingInner.find("[name$='split']").on("click", function(e){
			e.preventDefault();

   			// send the triggeredAction
			var formData =  $(this).attr('name')+'=true';

	   		jQuery.ajax({
				type: "POST",
				url: app.urls.splitShipment,
				data: formData,
				success: function(responseData) {
					$($cache.shippingInner).empty().html(responseData);
					app.checkout.initMultiShipping();
				},
				beforeSend: function() {
					$('#loader').show();
				},
				complete: function(){
					$("#loader").hide();
				}
	   		});
		});

		$cache.shippingInner.find("[name$='move']").on("click", function(e){
			e.preventDefault();

   			// send the triggeredAction
			var formData =  $(this).attr('name')+'=true';

	   		jQuery.ajax({
				type: "POST",
				url: app.urls.moveProductToNewShipment,
				data: formData,
				success: function(responseData) {
					$($cache.shippingInner).empty().html(responseData);
					app.checkout.initMultiShipping();
				},
				beforeSend: function() {
					$('#loader').show();
				},
				complete: function(){
					$("#loader").hide();
				}
	   		});
		});

	}

	function initMultiShipmentDialog() {
		var $editAddressForm = $('#EditAddressForm');
		$editAddressForm.find(".cancel").on("click", function(e) {
			e.preventDefault();
			app.myaccountdlg.close();
		});
		$editAddressForm.find(".apply").on("click", function(e) {
			var form = $("#EditAddressForm");
			e.preventDefault();
			if (!form.valid()) {
				return false;
			}
			var post = $('#EditAddressForm').serialize() + "&"+ $(this).attr("name") + "=apply";
			$.ajax({
				type: "POST",
				url: form.attr("action"),
				data: post,
				dataType: 'html',
				success: function(data){

					$("#dialog-container").empty().html(data);
				},
			failure: function(data) {
				alert("${Resource.msg('global.serverconnection','locale',null)}");

			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				$('#confirmation-container').show();
				$('#confirmation-container').dialog({
					bgiframe: true,
					autoOpen: false,
					modal: true,
					height: 100,
					width: 300,
					resizable: false
				});
				$('#confirmation-container').dialog('option', 'title', $('#dialog-container').dialog('option', 'title'));
				$('#confirmation-container').dialog('open');
			}

			});
		});
		
		$editAddressForm.find(".remove").on("click", function(e) {
			app.myaccountdlg.close();
		});
	}

	/*
	 * BILLING FUNCTIONS
	 */

	function initializeBillingDom() {
		$cache.isShipping = false;
		$cache.isMultiShipping = false;
		$cache.isBilling = true;
		$cache.isSummary = false;
	}

	function isEquivalentAddress(formA, formB) {
		
		var same = true, fields = $(formA).find("input[type='text'], select"), i = 0, field;
		
		while ((field = fields[i++]) && same) {
			
			var $fieldA = $(field),
				$fieldB = formB.find('[name$="'+field.name.split('_').pop()+'"]');

			if (!$fieldB.length) { continue; }
			
			same = $.trim($fieldA.val()).toLowerCase() === $.trim($fieldB.val()).toLowerCase();
		}
		
		return same;
	}
	
	// loads billing address, Gift Certificates, Coupon and Payment methods
	function initializeBillingEvents() {
		
		if(app.customer.rewardsCouponUser){
			var msgDiv = document.getElementById("payMethodReminder");
			if( msgDiv ){
				msgDiv.style.display='block';
			}
		}
		
		$cache.billingForm.on('change', '.address-form input[type="text"]:not(".no-clear"), #dwfrm_billing_billingAddress_addressFields_states_state', function(e) {
			var $shippingField = $cache.shippingForm.find('[name$="'+this.name.split('_').pop()+'"]');

			if ($.trim($shippingField.val()).toLowerCase() != $.trim($(this).val()).toLowerCase()) {
				$cache.cbSameAsShipping.prop("checked", false);
			}
		});
		
		$cache.cbSameAsShipping.on("change", function(){
			
			if (this.checked) {
				// set to shipping address
				
				var $shippingFields = $cache.shippingForm.find("input[type='text'], select").not('[name$="_addressid"]');
				$shippingFields.each(function() {
					var $billingField = $cache.billingForm.find('[name$="'+this.name.split('_').pop()+'"]');
					if ($billingField.length) { $billingField.val($(this).val()); }
				});
				
				return;
			}
			
			// clear form
			clearForm($cache.billingForm);

		});

		getCountriesAndRegions(function(){
			if (app.customer.authenticated) {
				$cache.billingForm.find(".address-form").removeClass("form-hidden");
			}
			
			checkForFilledForm($cache.billingForm);

			// html to be appended to shipment closed info
			var shipmentInfo = $(".hidden-shipment-data").html();
			$('.shipping-closed').empty().append(shipmentInfo);


			$('.tooltip-content').hide();
			if ($.fn.qtip) { 
				$('.tooltip').qtip({
					content: jQuery('.tooltip-content'),
					show: {
						event: 'click',
						effect: function(offset) {
							$(this).fadeIn(400).slideDown('slow')
						}
					},
					hide: {
						event: 'click unfocus',
						effect: function(offset) {
							$(this).fadeOut(300);
						}
					},
					style: {
						width: 420
					},
					position: {
						my: 'left center',
						at: 'right center'
					}
				});
			}

			var PersonalMessageUUID = '',
				PersonalMessage = '';
			function bindQTipPM(){
				// edit/add personal and store messages for shipping

				$('.addmessage, .editpm, .addstoremessage').unbind('click').bind('click', function(e){
					e.preventDefault();
					var $this = $(this);
					PersonalMessageUUID = $this.data('uuid');
					PersonalMessage = $this.data('message');

					bindQTipPM();
				});

				if ($.fn.qtip) { 
					$(".addmessage, .editpm, .addstoremessage").qtip({
						overwrite: true,
						content: jQuery('.personalmessageinput'),
						events: {
							render: function(event, api) {
								$(this).find('.personalmessageinput:not(:first-child)').remove();
							}
						},
						show: {
							event: 'click',
							effect: function(offset) {

								$(this).fadeIn(400).slideDown('slow', function(){
									$(this).attr('rel', PersonalMessageUUID).find('textarea').val(PersonalMessage);

								});
							}
						},
						hide: {
							event: 'click unfocus',
							effect: function(offset) {
								$(this).fadeOut(300);
							}
						},
						style: {
							width: 420
						},
						position: {
							my: 'left center',
							at: 'left center',
							adjust: {
								x: 25
							}
						}
					});
				}
			}

			bindQTipPM();

			$(".personalmessageinput .btn").click(function(){
				$(this).parents(".qtip").qtip('hide');
				// $(this).parents(".qtip").qtip('destroy');
			});

			$('body').on('click', '.personalmessageinput .savemessage', function(e){
				e.preventDefault();
				var $this = $(this),
					uuid = $this.parents('.qtip').attr('rel'),
					giftMessage = $this.parents('.qtip').find('textarea').val(),
					upmurl = app.util.appendParamToURL(app.urls.updatePersonalMessage, "shipmentUUID", uuid);
					upmurl = app.util.appendParamToURL(upmurl, "giftMessage", giftMessage);

				// Save the current state of the checkbox.
				var checkState = $cache.isGift.attr('checked');

				if (giftMessage === "") {
					$cache.isGift.removeAttr('checked');
				}
				else {
					$cache.isGift.attr('checked', 'checked');
				}

				$cache.giftMessage.find('textarea').val(giftMessage);

				if (checkState != $cache.isGift.attr('checked'))
					$cache.giftMessage.toggle();

		   		jQuery.ajax({
					type: "POST",
					url: upmurl,
					success: function(responseData) {
						var newMessage = $(responseData).find('a[rel="' + uuid + '"]').parents('.personalMessageWrapper');

						$('a[rel="' + uuid + '"]').parents('.personalMessageWrapper').replaceWith(newMessage);
						bindQTipPM();
						$this.siblings('.btn').click();

					}
				})

			});


			$('.privacyPolicy').click(function(e){
				e.preventDefault();
				var options = $.extend(true, {}, app.dialog.settings, {
					height : 600,
					width : 1200
				});
				app.dialog.open({url:this.href, options: options});
			});

			$cache.isGift.on('change', function(){
				$cache.giftMessage.find('textarea').val("");
			});

		   	// submitting the payment form
			$cache.billingForm.on('submit', function(e) {
		   		e.preventDefault();
		   		setSelectedAddress(this);
		   		
		   		if($(this).valid()){
		   			// Make checkboxes recognizable for $().serialize()
		   			$cache.billingForm.find('input[type=checkbox]').each(function(index, el) {
		   				$(el).val(!!el.checked);
		   			});
		   			

		   			var formData = $cache.billingForm.serialize();
			   		app.ajaxbuttonloader.show($('#continueOnBilling'));
			   		jQuery.ajax({
						type: "POST",
						url: app.urls.billingSave,
						data: formData,
						success: function(responseData) {
							app.ajaxbuttonloader.hide($('#continueOnBilling'));
							if ($(responseData).filter('#dwfrm_billing').length) {

								var paymentMethodId = ($cache.paymentMethodIdHolder.length) ? $cache.paymentMethodIdHolder.val() : '';
								$cache.billingInner.empty().append(responseData);
								app.checkout.initBilling();
								$(".shipping-error").show().text(app.resources.UH_OH);
														  	// Updated for
															// Omniture changes
															// for card failure
								//s.linkTrackEvents='event27';
								//s.events="event27";
								//s.tl(this,'o',"card failure");
							   // omniture changes end

								// get selected payment method and expand form
							 	if(paymentMethodId.length){
									$cache.ccList.val(paymentMethodId);
									$cache.paymentMethodIdHolder.val(paymentMethodId);
									$("#PaymentMethod_"+paymentMethodId).addClass('payment-method-expanded');
								}
							} else {
								$(".shipping-error").hide();
								$cache.summaryInner.empty().append(responseData);
								var paymentInfo = $(".hidden-payment-data").html();
								$('.payment-closed').empty().append(paymentInfo);
								toggleAccordion($cache.summaryHeader);
								app.checkout.initSummary();
								updateSummary();
							}
						}
					});
		   		}
		   	});

			// adding credit card image depending on card type field
			$cache.billingForm.on('change', '#dwfrm_billing_paymentMethods_creditCard_type', function(){
				var $cardImageHolder = $('.card-image-holder'),
					ccType = $(this).val();
				switch (ccType) {
					case 'Amex':
						$cardImageHolder.removeClass().addClass('card-image-holder credit-card Amex');
						break;
					case 'Discover':
						$cardImageHolder.removeClass().addClass('card-image-holder credit-card Discover');
						break;
					case 'MasterCard':
						$cardImageHolder.removeClass().addClass('card-image-holder credit-card MasterCard');
						break;
					case 'Visa':
						$cardImageHolder.removeClass().addClass('card-image-holder credit-card Visa');
						break;
					default:
						$cardImageHolder.removeClass().addClass('card-image-holder');
				}
			});
			
			$cache.billingForm.on('blur', '#dwfrm_billing_paymentMethods_creditCard_number', function() {
				var $marker = $('.dwfrm_billing_paymentMethods_creditCard_number.marker.error');
				
				if (($(this).val().length == 16) && $marker.length) {
					$marker.hide();
				}
			});

			// determining credit card type
			$cache.billingForm.on('change', '#dwfrm_billing_paymentMethods_creditCard_number', function(){
				// remove any spaces from the cc number
				$(this).val($(this).val().replace(/\s/g, ''));
								
				
				var currentCardNumber = $(this).val();
				if(currentCardNumber.length > 12){
					// American Express
					if (currentCardNumber.length == 15 && (currentCardNumber.substr(0, 2) == 34 || currentCardNumber.substr(0, 2) == 37)) {
						$cache.ccType.val('Amex').trigger('change');
						return;
					}
					// Discover(Diners Club)
					if (currentCardNumber.length == 14 && (currentCardNumber.substr(0, 3) == 300 || currentCardNumber.substr(0, 3) == 301 || currentCardNumber.substr(0, 3) == 302 || currentCardNumber.substr(0, 3) == 303 || currentCardNumber.substr(0, 3) == 304 || currentCardNumber.substr(0, 3) == 305 || currentCardNumber.substr(0, 2) == 36)) {
						$cache.ccType.val('Discover').trigger('change');
						return;
					}
					// Discover(Carte Blanche)
					if (currentCardNumber.length == 14 && currentCardNumber.substr(0, 2) == 14) {
						$cache.ccType.val('Discover').trigger('change');
						return;
					}
					// Discover
					if (currentCardNumber.length == 16 && currentCardNumber.substr(0, 4) == 6011) {
						$cache.ccType.val('Discover').trigger('change');
						return;
					}
					// Discover(JCB)
					if (currentCardNumber.length == 16 && currentCardNumber.substr(0, 1) == 3) {
						$cache.ccType.val('Discover').trigger('change');
						return;
					}
					// Discover(JCB)
					if (currentCardNumber.length == 15 && (currentCardNumber.substr(0, 4) == 2131 || currentCardNumber.substr(0, 4) == 1800)) {
						$cache.ccType.val('Discover').trigger('change');
						return;
					}
					// Master Card
					if (currentCardNumber.length == 16 && (currentCardNumber.substr(0, 2) == 51 || currentCardNumber.substr(0, 2) == 52 || currentCardNumber.substr(0, 2) == 53 || currentCardNumber.substr(0, 2) == 54 || currentCardNumber.substr(0, 2) == 55)) {
						$cache.ccType.val('MasterCard').trigger('change');
						return;
					}
					// Visa
					if ((currentCardNumber.length == 13 || currentCardNumber.length == 16) && currentCardNumber.substr(0, 1) == 4) {
						$cache.ccType.val('Visa').trigger('change');
						return;
					}
				}

			});

			// select payment method, a credit card or a Pier1 card from list
			$cache.ccList.on("change", function () {
				if (($(this).find(':selected').attr('value') != 'CREDIT_CARD') && ($(this).find(':selected').attr('value') != 'PIER1_REWARDS') && ($(this).find(':selected').attr('value') != '')){
					if($(this).find(':selected').text().indexOf("Pier1") > -1) {
						var cardUUID = $(this).val();
						if(!cardUUID) { return; }
						var ccdata = $cache.pier1CardList.data(cardUUID);
						if (ccdata && ccdata.holder) {
							setPier1CardFields(ccdata);
						}
						$cache.paymentMethodIdHolder.val('PIER1_REWARDS');
						populatePier1CardForm(cardUUID);
					} else {
						var cardUUID = $(this).val();
						if(!cardUUID) { return; }
						var ccdata = $cache.ccList.data(cardUUID);
						if (ccdata && ccdata.holder) {
							setCCFields(ccdata);
						}
						$cache.paymentMethodIdHolder.val('CREDIT_CARD');
						populateCreditCardForm(cardUUID);
						// $('#dwfrm_billing_paymentMethods_creditCard_number').trigger('change');
						$('#dwfrm_billing_paymentMethods_creditCard_type').trigger('change');
					}
				} else if ($(this).find(':selected').attr('value') == '') {
					changePaymentMethod();
				} else {
					$cache.paymentMethodIdHolder.val($(this).find(':selected').val());
					$('.card-image-holder').removeClass().addClass('card-image-holder');
					changePaymentMethod($(this).find(':selected').val());
				}
				
			});
			
			//if cust svc rep entering cc info
			//call Callcopy blackout start on click of payment method
			$cache.ccList.on("click", function (){
				if(appnoncached.customersvc.representative){
					launchBlackoutStart();
				}
			});

			// select Pier1 card from list
			$cache.pier1CardList.on("change", function () {
				var cardUUID = $(this).val();
				if(!cardUUID) { return; }
				var ccdata = $cache.pier1CardList.data(cardUUID);
				if (ccdata && ccdata.holder) {
					setPier1CardFields(ccdata);
					return;
				}
				populatePier1CardForm(cardUUID);
			});

			// handle whole form submit (bind click to continue checkout button)
			// append form fields of current payment form to this submit
			// in order to validate the payment method form inputs too

			$cache.save.on('click', function (e) {
				// determine if the order total was paid using gift cert or a
				// promotion
				if ($("#noPaymentNeeded").length > 0 && $(".giftcertpi").length > 0) {
					// as a safety precaution, uncheck any existing payment
					// methods
					$cache.paymentMethodId.filter(":checked").removeAttr("checked");
					// add selected radio button with gift card payment method
					$("<input/>").attr({
										name:$cache.paymentMethodId.first().attr("name"),
										type:"radio",
										checked:"checked",
										value:app.constants.PI_METHOD_GIFT_CERTIFICATE})
								 .appendTo($cache.currentForm);
				}

				var tc = $cache.currentForm.find("input[name$='bml_termsandconditions']");
				if ($cache.paymentMethodId.filter(":checked").val()==="BML" && !$cache.currentForm.find("input[name$='bml_termsandconditions']")[0].checked) {
					alert(app.resources.BML_AGREE_TO_TERMS);
					return false;
				}

			});

			$cache.gcCheckBalance.on("click", function (e) {
				e.preventDefault();
				$cache.gcCode = $cache.gcCode || $cache.currentForm.find("input[name$='_giftCertCode']");
				$cache.balance = $cache.balance || $cache.currentForm.find("div.balance");
				if ($cache.gcCode.length===0 || $cache.gcCode.val().length===0) {
					var error = $cache.balance.find("span.error");
					if (error.length===0) {
						error = $("<span>").addClass("error").appendTo($cache.balance);
					}
					error.html(app.resources.GIFT_CERT_MISSING);
					return;
				}

				app.giftcard.checkBalance($cache.gcCode.val(), function (data) {
					if(!data || !data.giftCertificate) {
						// error
						var error = $cache.balance.find("span.error");
						if (error.length===0) {
							error = $("<span>").addClass("error").appendTo($cache.balance);
						}
						error.html(app.resources.GIFT_CERT_INVALID);
						return;
					}
					// display details in UI
					$cache.balance.find("span.error").remove();
					var balance = data.giftCertificate.balance;
					$cache.balance.html(app.resources.GIFT_CERT_BALANCE+" "+balance);
				});
			});

			if($cache.billingForm.find(".address-book .selected").length) {
				$('#dwfrm_billing').find('.address-form').addClass('form-hidden');
			}
		});

		$('input, textarea').placeholder();

	}

	// TODO: Find out of this function is supposed to be used somewhere...
	// because it isn't
	function initBillingPageEvents(){
		$('#dwfrm_billing_paymentMethods_creditCard_cvn').keyup(function(e){
			if(e.which == 13){
				$('.checkout-billing').submit();
			}else{
				$("#dwfrm_billing_paymentMethods_creditCard_cvn").numeric({ decimal: false, negative: false }, function() { this.value = ""; this.focus(); });
			}
		});
		$('#dwfrm_billing_paymentMethods_creditCard_type').change(updatePier1CcFields);
	}

	// changes the payment method form
	function changePaymentMethod(paymentMethodID) {
		$cache.paymentMethods.removeClass("payment-method-expanded");
		var pmc = $cache.paymentMethods.filter("#PaymentMethod_"+paymentMethodID);
		if (pmc.length===0) {
			pmc = $("#PaymentMethod_Custom");
		}
		pmc.addClass("payment-method-expanded");

		// Reset Payment Forms
		var $formFields = $cache.paymentMethods.find('input, select');
		$formFields.removeClass("required")
			.filter(':not(#dwfrm_billing_paymentMethods_pier1Card_type)')
			.val("");

		if (paymentMethodID==="CREDIT_CARD") {
			// add event 25,26
			$cache.ccContainer.find('input[type!="checkbox"], select').addClass("required");
			if($('html').hasClass('ie9')){
				clearCCForm($cache.ccContainer);
			}
			// Updated for Omniture changes
			// s.linkTrackEvents='event26';
		   // s.events="event26";
			// s.tl(this,'o',"reward points");
		   // omniture changes end

		}
		if (paymentMethodID==="PIER1_REWARDS") {
			$cache.pier1CardContainer.find('input[type!="checkbox"], select').addClass("required");
			// Updated for Omniture changes
			// s.linkTrackEvents='event25';
		   // s.events="event25";
			// s.tl(this,'o',"reward points");
		   // omniture changes end

		}
		 Omniture.OnClicks.CardSelectClicked.occurred($("#paymentmethodselect").val());
		// reinitialize the validator to reflect changed requirements
		app.validator.init();
	}

	function setCCFields(data) {
		// fill the form / clear the former cvn input
		$cache.ccOwner.val(data.holder);
		$cache.ccType.val(data.type);
		$cache.ccNum.val(data.maskedNumber);
		$cache.ccMonth.val(data.expirationMonth);
		$cache.ccYear.val(data.expirationYear);
		$cache.ccCcv.val("");

		updatePier1CcFields();

		// remove error messages
		$cache.ccContainer.find(".errormessage")
						  .toggleClass("errormessage")
						  .filter("span").remove();

		$cache.ccContainer.find(".errorlabel").toggleClass("errorlabel");
	}

	function setPier1CardFields(data) {
		// fill the form / clear the former cvn input
		$cache.pier1CardOwner.val(data.holder);
		$cache.pier1CardType.val(data.type);
		$cache.pier1CardNum.val(data.maskedNumber);

		// remove error messages
		$cache.pier1CardContainer.find(".errormessage")
						  .toggleClass("errormessage")
						  .filter("span").remove();

		$cache.pier1CardContainer.find(".errorlabel").toggleClass("errorlabel");
	}

	// updates the credit card form with the attributes of a given card
	function populateCreditCardForm(cardID) {
		// load card details
		var url = app.util.appendParamToURL(app.urls.billingSelectCC, "creditCardUUID", cardID);
		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				changePaymentMethod('CREDIT_CARD');
				if(!data) {
					window.alert(app.resources.CC_LOAD_ERROR);
					return false;
				}
				$cache.ccList.data(cardID, data);
				setCCFields(data);
				$('#dwfrm_billing_paymentMethods_creditCard_type').trigger('change');
			}
		});
	}

	// updates the Pier1 rewards credit card form with the attributes of a given
	// card
	function populatePier1CardForm(cardID) {
		// load card details
		var url = app.util.appendParamToURL(app.urls.billingSelectCC, "creditCardUUID", cardID);
		url = app.util.appendParamToURL(url, "paymentMethodID", "PIER1_REWARDS");
		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				changePaymentMethod('PIER1_REWARDS');
				if(!data) {
					window.alert(app.resources.CC_LOAD_ERROR);
					return false;
				}
				$cache.pier1CardList.data(cardID, data);
				setPier1CardFields(data);

				// Validate the form and enable/disable "Continue" button
				// (Not required for regular credit card because user must enter
				// CVN
				// every time, which forces validation on blur event. Pier1
				// Rewards
				// cards do not require secondary data entry.)
				$cache.currentForm.validate();
			}
		});
	}

	function updatePier1CcFields(){
		var ccForm = $cache.currentForm.find("#PaymentMethod_CREDIT_CARD");
		if($('#paymentmethodselect').find(':selected').attr('value') == 'PIER1_REWARDS'){
			ccForm.find(".required-indicator.exp-date").hide();
			ccForm.find("select[name$='_month']").removeClass("required");
			ccForm.find("select[name$='_year']").removeClass("required");
			ccForm.find("label[for$='_cvn'] .required-indicator").hide();
			ccForm.find("input[name$='_cvn']").removeClass("required");
		} else {
			ccForm.find(".required-indicator.exp-date").show();
			ccForm.find("select[name$='_month']").addClass("required");
			ccForm.find("select[name$='_year']").addClass("required");
			ccForm.find("label[for$='_cvn'] .required-indicator").show();
			ccForm.find("input[name$='_cvn']").addClass("required");
		}

		$cache.currentForm.validate();
	}
	
	//call Callcopy blackout start to stop recording of cc info by cust svc rep
	function launchBlackoutStart() {
		$.ajax({
			url: app.urls.blackoutStart,
			success: function(){
				//alert('blackout started');
			}
		});
	}

	/*
	 * SUMMARY FUNCTIONS
	 */

	function initializeSummaryDom() {
		$cache.isShipping = false;
		$cache.isMultiShipping = false;
		$cache.isBilling = false;
		$cache.isSummary = true;
	}

	function initializeSummaryEvents(){

		$cache.summaryForm.validate({
			rules: {
				dwfrm_checkoutprofile_login_passwordconfirm: {
					required: {
						depends: function(element) {
							return $cache.passwordField.val().length;
						}
					},
					equalTo: "#"+$cache.passwordField.attr('id')
				},
				dwfrm_checkoutprofile_login_password: {
					minlength: 5,
					maxlength: 20
				}
			},
			messages: {
				dwfrm_checkoutprofile_login_passwordconfirm: app.resources.PASSWORDS_MATCH
			}
		});

	   	// submitting the payment form
		$cache.checkOutButton.on('click', function(e) {
	   		e.preventDefault();
	   		if($cache.summaryForm.valid()){
	   			var formData   = $cache.summaryForm.serialize(),
	   				formAction = $cache.summaryForm.attr('action'),
	   				trigger	   = $cache.checkOutButton.attr('name');

	   			if(formData.length){formData += '&';}

	   			// append the triggeredAction
	   			formData += (trigger+'=true');

	   			$(this).prop("disabled", true);
		   		app.ajaxbuttonloader.show($cache.checkOutButton);
		   		jQuery.ajax({
					type: "POST",
					url: formAction,
					data: formData,
					success: function(responseData) {
					  $(this).prop("disabled", false);
						app.ajaxbuttonloader.hide($cache.checkOutButton);
						if($(responseData).filter('.pt_order-confirmation').length){ // success
							/*
							 * The method below for rendering the confirmation
							 * page causes javascript errors in IE due to the
							 * HTML in responseData referencing
							 * objects/variables contained in external scripts
							 * (such as in the jQuery library) that are loading
							 * asynchronously to the parsing of
							 * newDoc.write(responseData)
							 */
							var newDoc = document.open("text/html", "replace");
							newDoc.write(responseData);
							newDoc.close();
							return;
						} else if ($(responseData).filter('#dwfrm_billing').length) { // billing
																						// validation
																						// failed
							var paymentMethodId = $cache.paymentMethodIdHolder.val();
							$cache.billingInner.empty().append(responseData);
							app.checkout.initBilling();
							$(".shipping-error").show().text(app.resources.P1_CARD_DECLINE);

							// Updated for Omniture changes for card failure
							s.linkTrackEvents='event27';
							s.events="event27";
							s.tl(this,'o',"card failure");
						   // omniture changes end

							// get selected payment method and expand form
							if(paymentMethodId.length){
								$cache.ccList.val(paymentMethodId);
								$("#PaymentMethod_"+paymentMethodId).addClass('payment-method-expanded');
							}
							toggleAccordion($cache.billingHeader);
							$cache.summaryInner.empty();
							return;
						} else if ($(responseData).filter('.submit-order').length) { // summary
																						// validation
																						// failed
							$cache.summaryInner.empty().append(responseData);
							app.checkout.initSummary();
							return;
						} 
						
						
						try
						{
						   var json = $.parseJSON(responseData);
	   						if (json.error) {
	   							$('.checkout-error').text($.parseJSON(responseData).error).removeClass('hide');
	   							toggleAccordion($cache.shippingHeader);
	   						}
							return;
						}
						catch(e)
						{}
						
						window.location = app.urls.cartShow;
					}
				});
	   		}
	   	});
	}

	function initGuestRegisterEvents(){
		$('.occBtn').click(function() {
			$('.occBtnDiv').hide();
			$('#orderConfirmCreateAccount').removeClass('hide');
		});
	}
   	
	//if cust svc rep editing payment info and not logged in onbehalf of customer
	//call Callcopy blackout start
   	$('div.accordion-group.payment .accordion-heading a').click(function() {
		if(appnoncached.customersvc.representative && !appnoncached.customersvc.loggedInOnBehalf){
			launchBlackoutStart();
		}
   	});

	/** ***** app.checkout public object ******* */
	app.checkout = {
		init : function () {
			initializeDom();
			initializeCache();
			initializeEvents();
		},
		initShipping : function() { // SHIPPING
			initializeShippingDom();
			initializeCache();
			initializeShippingEvents();
		},
		initMultiShipping : function () { // MULTI SHIP
			initializeMultiShippingDom();
			initializeCache();
			initializeMultiShippingEvents();
		},
		initBilling : function () { // BILLING
			initializeBillingDom();
			initializeCache();
			initializeBillingEvents();
		},
		initSummary : function () { // SUMMARY
			initializeSummaryDom();
			initializeCache();
			initializeSummaryEvents();
		},
		initAddressReview : function (){ // ADDRESS VERIFICATION SERVICE
			var url = app.util.appendParamsToUrl(app.urls.addresReviewUrl , {flag:'REVIEW'});
			var options = $.extend(true, {}, {open: initAddressReviewSettings}, {title : 'Please Review Your Address', dialogClass: 'arDlg'});
			app.myaccountdlg.open({url:url, options:options});
		},
		initAddressInvalid : function (){
			var url = app.util.appendParamsToUrl(app.urls.addresReviewUrl , {flag:'INVALID'});
			var options = $.extend(true, {}, {open: initAddressReviewSettings}, {title : 'Please Review Your Address', dialogClass: 'arDlg'});
			app.myaccountdlg.open({url:url, options:options});
		},
		updateBasketSummary: updateSummary,
		ajaxCartTableReload: ajaxCartTableReload,
		addCouponRemoveEvent: addCouponRemoveEvent,
		addNewCouponEvent: addNewCouponEvent,
		doStateCityZip : handleStateCityZip,
		checkForFilledForm : checkForFilledForm
	};
}(window.app = window.app || {}, jQuery));

// app.orderconfirmation
(function (app, $) {
	var $cache = {
			loginForm: $('#dwfrm_login'),
			passwordField: $('#dwfrm_checkoutprofile_login_password')
	};

	function initializeEmailPrefsForm(form) {
		// var form = $("#email-signup-form");

	}
	function initEmailPrefsEvents() {
		$(document).on('click', '.email-prefs', function(e) {
			e.preventDefault();
			var options = $.extend(true, {}, {open: initializeEmailPrefsForm}, {title : 'Email Preferences', dialogClass: 'prefDlg'});
			app.dialog.open({url:this.href, options:options});
		});
	}

	function initPrivacyPolicyEvents() {
		$(document).on('click', '#dialog-container .privacyPolicy', function(e) {
			e.preventDefault();
			var options = $.extend(true, {}, app.dialog.settings, {
				dialogClass : 'privacy',
				closeText : '',
				height: 450,
				title : ''
			});
			var url = app.urls.privacyPolicy;
			app.dialog.open({url:url, options:options});
		});

		$(document).on('click', '#dialog-container .signupformactions a', function(e) {
			e.preventDefault();
			app.dialog.close();
		});
	}
	
	function initFormValidation() {
		$cache.loginForm.validate({
			rules: {
				dwfrm_checkoutprofile_login_passwordconfirm: {
					required: {
						depends: function(element) {
							return $cache.passwordField.val().length;
						}
					},
					equalTo: "#"+$cache.passwordField.attr('id')
				},
				dwfrm_checkoutprofile_login_password: {
					minlength: 5,
					maxlength: 20
				}
			},
			messages: {
				dwfrm_checkoutprofile_login_passwordconfirm: app.resources.PASSWORDS_MATCH
			}
		});
	}

	function initializeEvents() {

		initEmailPrefsEvents();
		initPrivacyPolicyEvents();
		initFormValidation();
	}
	/** ***** app.orderconfirmation public object ******* */
	app.orderconfirmation = {
		init : function () {
			// initializeCache();
			// initializeDom();
			initializeEvents();
		}
	};
}(window.app = window.app || {}, jQuery));


// app.quickview
(function (app, $) {
	var $cache = {};

	function bindQvButton() {
		$cache.qvButton.one("click", function (e) {
			e.preventDefault();
			app.quickView.show({
				url : $(this).attr("href"),
				source : "quickview",
				width: 900
			});
			return false;
		});
	}


	app.quickView = {
		initializeButton : function (container, target) {
			// quick view button
			$(container).on("mouseenter", target, function (e) {
				if(!$cache.qvButton) {
					$cache.qvButton = $("<a id='quickviewbutton'/>");
				}
				bindQvButton();

				var link = $(this).children("a:first");
				$cache.qvButton.attr({
					"href" : link.attr("href"),
					"title" : link.attr("title")
				}).appendTo($(this));
			});
		},
		init : function () {
			if(app.quickView.exists()) {
				return $cache.quickView;
			}

			$cache.quickView = $("<div/>").attr("id", "QuickViewDialog").appendTo(document.body);
			return $cache.quickView;
		},
		// show quick view dialog and send request to the server to get the
		// product
		// options.source - source of the dialog i.e. search/cart
		// options.url - product url
		show : function (options) {
			options.target = app.quickView.init();
			options.callback = function () {
				app.product.init();
				app.tooltips.init();
				app.dialog.create({
					target : $cache.quickView,
					options : {
						height : 'auto',
						width : (options.width ? options.width : 745),
						dialogClass : 'quickview',
						title : 'Product Quickview',
						resizable : false,
						position : 'center',
						closeText: '',
						open : function () {
							app.progress.hide();
							$('.accordion-menu').accordion({collapsible: true});
							app.storeTools.init();// Wire up select store js
							var productSetTemplate = $('.product-col-2').hasClass('product-set');// checking
																									// if
																									// productset
																									// page.
						}
					}
				});
				$cache.quickView.dialog('open');
				/*
				$('#product-content').find('span.online-avail-msg').each(function(){
					app.storeTools.getOnlineAvailabilityExt($(this).data('pid'), $(this), true);
				});
				*/
				$(".numsonly").numeric({ decimal: false, negative: false }, function() { this.value = ""; this.focus(); });
			};
			app.product.get(options);
			return $cache.quickView;
		},
		// close the quick view dialog
		close : function () {
			if($cache.quickView) {
				$cache.quickView.dialog('close').empty();
				return $cache.quickView;
			}
		},
		exists : function () {
			return $cache.quickView && ($cache.quickView.length > 0);
		},
		isActive : function () {
			return $cache.quickView && ($cache.quickView.length > 0) && ($cache.quickView.children.length > 0);
		},
		container : $cache.quickView
	};

}(window.app = window.app || {}, jQuery));

// app.util
(function (app, $) {

	// sub namespace app.util.* contains utility functions
	app.util = {

		// trims a prefix from a given string, this can be used to trim
		// a certain prefix from DOM element IDs for further processing on the
		// ID
		trimPrefix : function (str, prefix) {
			return str.substring(prefix.length);
		},

		initToggleElements : function() {
			// add generic toggle functionality
			$('.toggle')
				.click(function(){
					$(this).toggleClass('expanded').next('.toggle-content').toggle();
				})
				.next('.toggle-content').hide();
				
			$('#switch-view').click(function(){
				var url = app.util.removeParamFromURL(window.location.href, 'device');
				
				if(app.customer.device == 'desktop'){ url = app.util.appendParamToURL(url,'device','mobile'); }
				else { url = app.util.appendParamToURL(url,'device','desktop'); }
					
				window.location = url;
			});
		},

		setDialogify : function (e) {
			e.preventDefault();
			var actionSource = $(this),
				dlgAction = $(actionSource).data("dlg-action") || {},
				dlgEvents = $(actionSource).data("dlg-events") || null,
				dlgOptions = $.extend({}, app.dialog.settings, $(actionSource).data("dlg-options") || {}),
				form = dlgAction.isForm ? $(actionSource).closest("form") : null,
				data = form ? form.serialize() : null,
				method = form && form.attr("method") ? form.attr("method").toUpperCase() : "GET",
				url = (dlgAction.url // url from data
					   || (dlgAction.isForm ? form.attr("action") : null) // or url from form action if isForm=true
					   || $(actionSource).attr("href"));

			if (!url) { return; } // if we do not have a url, there is nothing to load

			dlgOptions.title = dlgOptions.title || $(actionSource).attr("title") || "";

			// if this is a content link, update url from Page-Show to Page-Include
			if ($(this).hasClass("attributecontentlink")) {
				var uri = app.util.getUri(url);
				url = app.urls.pageInclude+uri.query;
			}
			
			if (dlgEvents) {
				var evts = {}, k;
				for (k in dlgEvents) {
					var fn = app.util.getObject(dlgEvents[k]);
					if (fn) {
						dlgOptions[k] = fn;
					}
				}
			}
			
			var dlg = app.dialog.create({target:dlgAction.target, options : dlgOptions});

			app.ajax.load({
				url:url,
				data: data,
				method: method,
				target: dlg,
				callback: function () {
					dlg.dialog("open");	// open after load to ensure dialog is centered
					app.validator.init(); // re-init validator
				}
			});
			
			return false;
		},

		padLeft : function (str, padChar, len) {
			var digs = len || 10;
			var s = str.toString();
			var dif = digs - s.length;
			while(dif > 0) {
				s = padChar + s;
				dif--;
			}
			return s;
		},
		// appends the parameter with the given name and
		// value to the given url and returns the changed url
		appendParamToURL : function (url, name, value) {
			url = url.toString();
			var c = "?";
			if(url.indexOf(c) !== -1 && url.indexOf(c) !== (url.length - 1)) {
				c = "&";
			}
			else if (url.indexOf(c) == (url.length - 1)) {
				c = "";
			}

			if(url.indexOf('#') > -1) {
				var newURL = url.split('#');
				return newURL[0] + c + name + '=' + value + '#' + newURL[1];
			}
			else {
				return url + c + name + "=" + value;
			}
			
		},

		appendParamsToUrl : function (url, params) {
			var uri = app.util.getUri(url),
				includeHash = arguments.length < 3 ? false : arguments[2];

			var qsParams = $.extend(uri.queryParams, params);
			var result = uri.path+"?"+$.param(qsParams);
			if (includeHash) {
				result+=uri.hash;
			}
			if (result.indexOf("http")<0 && result.charAt(0)!=="/") {
				result="/"+result;
			}

			return result;
		},

		removeParamFromURL : function (url, parameter) {
			var urlparts = url.split('?');

			if(urlparts.length >= 2) {
				var urlBase = urlparts.shift();
				var queryString = urlparts.join("?");

				var prefix = parameter + '=';
				var pars = queryString.split(/[&;]/g);
				var i=pars.length;
				while(0 < i--) {
					if(pars[i].lastIndexOf(prefix, 0) !== -1) {
						pars.splice(i, 1);
					}
				}
				url = urlBase + '?' + pars.join('&');
			}
			return url;
		},

		staticUrl : function (path) {
			if(!path || $.trim(path).length === 0) {
				return app.urls.staticPath;
			}

			return app.urls.staticPath + (path.charAt(0) === "/" ? path.substr(1) : path );
		},

		ajaxUrl : function (path) {
			return app.util.appendParamToURL(path, "format", "ajax");
		},

		toAbsoluteUrl : function (url) {
			if (url.indexOf("http")!==0 && url.charAt(0)!=="/") {
				url = "/"+url;
			}
			return url;
		},

		loadDynamicCss : function (urls) {
			var i, len=urls.length;
			for(i=0; i < len; i++) {
				app.util.loadedCssFiles.push(app.util.loadCssFile(urls[i]));
			}
		},

		// dynamically loads a CSS file
		loadCssFile : function (url) {
			return $("<link/>").appendTo($("head")).attr({
				type : "text/css",
				rel : "stylesheet"
			}).attr("href", url); // for i.e. <9, href must be added after
									// link has been appended to head
		},
		// array to keep track of the dynamically loaded CSS files
		loadedCssFiles : [],

		// removes all dynamically loaded CSS files
		clearDynamicCss : function () {
			var i = app.util.loadedCssFiles.length;
			while(0 > i--) {
				$(app.util.loadedCssFiles[i]).remove();
			}
			app.util.loadedCssFiles = [];
		},

		getQueryStringParams : function (qs) {
			if(!qs || qs.length === 0) { return {}; }

			var params = {};
			// Use the String::replace method to iterate over each
			// name-value pair in the string.
			qs.replace( new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
						function ( $0, $1, $2, $3 ) {	params[ $1 ] = $3; }
			);
			return params;
		},

		getUri : function (o) {
			var a;

			if (o.tagName && $(o).attr("href")) {
				a = o;
			}
			else if (typeof o === "string") {
				a = document.createElement("a");
				// IE8 requires full url
				if (o.charAt(0)!=="h") {
					o = window.location.protocol + "//" + window.location.hostname + o;
				}
				a.href = o;
			}
			else {
				return null;
			}
			var host = a.host.split(':')[0];
			if (host === ""){
				host = a.href.split(':')[1];
				host = host.replace('//', '');
				var position = host.indexOf('/on/demandware.store/');
				host = host.slice(0,position);
			}

			var path = a.pathname.slice(0,1) === '/' ? a.pathname : '/' + a.pathname;

			if (path === '/Cart-AjaxUpdateQty'){
				path = a.href.split(':')[1];
				path = path.replace('//', '');
				var position = path.indexOf('/on/demandware.store/');
				path = path.slice(position);
			}

			return {
				protocol : a.protocol, // http:
				host : host, // www.myexample.com
				hostname : host, // www.myexample.com'
				port : a.port, // :80
				path : path, // /sub1/sub2
				query : a.search, // ?param1=val1&param2=val2
				queryParams : a.search.length > 1 ? app.util.getQueryStringParams(a.search.substr(1)) : {},
				hash : a.hash, // #OU812,5150
				url : a.protocol+ "//" + host + path,
				urlWithQuery : a.protocol+ "//" + host + a.port + path + a.search
			};

		},

		postForm : function (args) {
			var form = $("<form>").attr({action:args.url,method:"post"}).appendTo("body");
			var p;
			for (p in args.fields) {
				$("<input>").attr({name:p,value:args.fields[p]}).appendTo(form);
			}
			form.submit();
		},

		getMessage : function (key, bundleName, callback) {
			if (!callback || !key || key.length===0) {
				return;
			}
			var params = {key:key};
			if (bundleName && bundleName.length===0) {
				params.bn = bundleName;
			}
			var url = app.util.appendParamsToUrl(app.urls.appResources, params);
			$.getJSON(url, callback);
		},

		updateStateOptions : function(countrySelect) {
			var country = $(countrySelect);
			if (country.length===0 || !app.countries[country.val()]) {
				 return;
			}
			var form = country.closest("form");
			var stateField = country.data("stateField") ? country.data("stateField") : form.find("select[name$='_state']");
			if (stateField.length===0) {
				return;
			}

			var form = country.closest("form"),
				countryObj = app.countries[country.val()],
				arrHtml = [],
				labelSpan = form.find("label[for='"+stateField[0].id+"'] span").not(".required-indicator");

			// set the label text
			labelSpan.html(countryObj.label);

			var state;
			for (state in countryObj.regions) {
				arrHtml.push('<option value="'+state+'">'+countryObj.regions[state]+'</option>');
			}
			// clone the empty option item and add to stateSelect
			var o1 = stateField.children().first().clone();
			stateField.html(arrHtml.join("")).removeAttr("disabled").children().first().before(o1);
			stateField[0].selectedIndex=0;
		},

		limitCharacters : function () {
			$('form').find('textarea[maxlength]').each(function(){
				var characterLimit = $(this).attr('maxlength')
				var charCountHtml = String.format(app.resources.CHAR_LIMIT_MSG,
										'<span class="char-remain-count">'+characterLimit+'</span>',
										'<span class="char-allowed-count">'+characterLimit+'</span>');
				var charCountContainer = $(this).next('div.char-count');
				if (charCountContainer.length===0) {
					charCountContainer = $('<div class="char-count"/>').insertAfter($(this));
				}
				charCountContainer.html(charCountHtml);
				// trigger the keydown event so that any existing character data
				// is calculated
				$(this).change();
			});
		},

		removeHashFromURL : function(str) {
			var hash = window.location.hash,
				removeStr = str;
			
			if(hash.indexOf(str) == -1) { return; }
			
			if(removeStr.indexOf('#') == -1) { removeStr = '#' + removeStr; }
			
			window.location.hash = hash.replace(str,'');
		},
		
		setDeleteConfirmation : function(container, message) {
			$(container).on("click", ".delete", function(e){
				return confirm(message);
			});
		},

		scrollBrowser : function (xLocation) {
			$('html, body').animate({ scrollTop: xLocation }, 500);
		},

		notifyMe : function(message) {

			var jgOpts = {
					position: "center",
					header: "Jeepers!"
			};
			$.jGrowl(message, jgOpts);
			return;
		},

		// notifyMe with sticky option, close and overlay - for QTY messaging
		notifyMeQty : function(message) {
			var jgOpts = {
					sticky: true,
					position: "center",
					header: "Jeepers! <a href='#' class='closex'>X</a>",
					beforeOpen: function(){
						$("<div class='ui-widget-overlay'></div>").appendTo('body');
					},
					afterOpen: function() {
						$(".closex").on("click", function(e){
							e.preventDefault();
							$(".jGrowl-close").click();
						});
					},
					close: function() {
						$(".ui-widget-overlay").remove();
					}
			};
			$.jGrowl(message, jgOpts);
			return;
		},
		
		getObject : function(s) {
			var o = window,
				segments = s.split('.'),
				len = segments.length,
				i = 0;
			
			for (; i < len; i++) {
				o = o[segments[i]];
				if (!o) { return null; } 
			}
			return o;
		},
		toggleDevice : function(d) {
			app.page.uri.queryParams({device:d});
			window.location.assign(app.page.uri.absolute); 
		},
		setCustomerZip: function(zip) {
			app.customer.zip = zip;
		},
		getDayOfWeek: function(day) {
			var weekday = new Array(7);
			weekday[0]=  "sunday";
			weekday[1] = "monday";
			weekday[2] = "tuesday";
			weekday[3] = "wednesday";
			weekday[4] = "thursday";
			weekday[5] = "friday";
			weekday[6] = "saturday";
			
			return weekday[day];
		}
	};
	
}(window.app = window.app || {}, jQuery));

//app.page
(function (app, $) {
	app.page = app.page || {};
	$.extend(app.page, {
		title : '',
		type : '',
		uri : '',
		setContext : function (o) {
			$.extend(app.page, o);
		},
		params : app.util.getQueryStringParams(window.location.search.substr(1)),
		refresh : function() {
			// window.location.assign(window.location.href);
			window.location.reload();
		},
		init: function() {

			// execute page specific initializations
			try {
				var ns = this.ns;
				if (ns && app[ns] && app[ns].init) {
					app[ns].init();
				}
			}
			catch(ex) {
				console.warn('Unable to initialize page!\nERROR: ' + ex.message + '(' + ex.lineNumber + ')');
			}
			
			app.page.uri = new app.Uri(window.location.toString());
		}
	});

}(window.app = window.app || {}, jQuery));

// app.registry
(function (app, $) {
	var $cache = {};

	function populateBeforeAddressForm(addressID) {
		// load address details
		var url = app.urls.giftRegAdd + addressID;
		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data || !data.address) {
					window.alert(app.resources.REG_ADDR_ERROR);
					return false;
				}
				// fill the form
				$cache.addressBeforeFields.filter("[name$='_addressid']").val(data.address.ID);
				$cache.addressBeforeFields.filter("[name$='_firstname']").val(data.address.firstName);
				$cache.addressBeforeFields.filter("[name$='_lastname']").val(data.address.lastName);
				$cache.addressBeforeFields.filter("[name$='_address1']").val(data.address.address1);
				$cache.addressBeforeFields.filter("[name$='_address2']").val(data.address.address2);
				$cache.addressBeforeFields.filter("[name$='_city']").val(data.address.city);
				$cache.addressBeforeFields.filter("[name$='_zip']").val(data.address.postalCode);
				$cache.addressBeforeFields.filter("[name$='_state']").val(data.address.stateCode);
				$cache.addressBeforeFields.filter("[name$='_country']").val(data.address.countryCode);
				$cache.addressBeforeFields.filter("[name$='_phone']").val(data.address.phone);
				$cache.registryForm.validate().form();
			}
		});
	}

	// updates the after address form with the attributes of a given address
	function populateAfterAddressForm(addressID) {
		// load address details
		var url = app.urls.giftRegAdd + addressID;
		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data || !data.address) {
					window.alert(app.resources.REG_ADDR_ERROR);
					return false;
				}
				// fill the form
				$cache.addressAfterFields.filter("[name$='_addressid']").val(data.address.ID);
				$cache.addressAfterFields.filter("[name$='_firstname']").val(data.address.firstName);
				$cache.addressAfterFields.filter("[name$='_lastname']").val(data.address.lastName);
				$cache.addressAfterFields.filter("[name$='_address1']").val(data.address.address1);
				$cache.addressAfterFields.filter("[name$='_address2']").val(data.address.address2);
				$cache.addressAfterFields.filter("[name$='_city']").val(data.address.city);
				$cache.addressAfterFields.filter("[name$='_zip']").val(data.address.postalCode);
				$cache.addressAfterFields.filter("[name$='_state']").val(data.address.stateCode);
				$cache.addressAfterFields.filter("[name$='_country']").val(data.address.countryCode);
				$cache.addressAfterFields.filter("[name$='_phone']").val(data.address.phone);
				$cache.registryForm.validate().form();
			}
		});
	}

	// copy address before fields to address after fields
	function copyBeforeAddress() {
		$cache.addressBeforeFields.each(function () {
			var fieldName = $(this).attr("name");
			var afterField = $cache.addressAfterFields.filter("[name='"+fieldName.replace("Before","After")+"']");
			afterField.val($(this).val());
		});
	}

	// disable the address after fields
	function setAfterAddressDisabled(disabled) {
		if (disabled) {
			$cache.addressAfterFields.attr("disabled", "disabled");
		}
		else {
			$cache.addressAfterFields.removeAttr("disabled");
		}
	}

	function initializeCache() {
		$cache = {
			registryForm : $("form[name$='_giftregistry']"),
			registryTable : $("#registry-results")
		};
		$cache.copyAddress = $cache.registryForm.find("input[name$='_copyAddress']");
		$cache.addressBeforeFields = $cache.registryForm.find("fieldset[name='address-before'] input:not(:checkbox), fieldset[name='address-before'] select");
		$cache.addressAfterFields = $cache.registryForm.find("fieldset[name='address-after'] input:not(:checkbox), fieldset[name='address-after'] select");
	}

	function initializeDom() {
		$cache.addressBeforeFields.filter("[name$='_country']").data("stateField", $cache.addressBeforeFields.filter("[name$='_state']"));
		$cache.addressAfterFields.filter("[name$='_country']").data("stateField", $cache.addressAfterFields.filter("[name$='_state']"));

		if ($cache.copyAddress.length && $cache.copyAddress[0].checked) {
			// fill the address after fields
			copyBeforeAddress();
			setAfterAddressDisabled(true);
		}
	}

	function initializeEvents() {
		app.sendToFriend.initializeDialog("div.list-table-header", ".send-to-friend");
		app.util.setDeleteConfirmation("table.item-list", String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_GIFTREGISTRY));

		$cache.copyAddress.on("click", function () {
			if (this.checked) {
				// fill the address after fields
				copyBeforeAddress();
			}
		});
		$cache.registryForm.on("change", "select[name$='_addressBeforeList']", function (e) {
			var addressID = $(this).val();
			if (addressID.length===0) { return; }
			populateBeforeAddressForm(addressID);
			if ($cache.copyAddress[0].checked) {
				copyBeforeAddress();
			}
		})
		.on("change", "select[name$='_addressAfterList']", function (e) {
			var addressID = $(this).val();
			if (addressID.length===0) { return; }
			populateAfterAddressForm(addressID);
		})
		.on("change", $cache.addressBeforeFields.filter(":not([name$='_country'])"), function (e) {
			if (!$cache.copyAddress[0].checked) { return; }
			copyBeforeAddress();
		});


		$("form").on("change", "select[name$='_country']", function(e) {
			app.util.updateStateOptions(this);

			if ($cache.copyAddress.length > 0 && $cache.copyAddress[0].checked && this.id.indexOf("_addressBefore") > 0) {
				copyBeforeAddress();
				$cache.addressAfterFields.filter("[name$='_country']").trigger("change");
			}
		});
	}


	app.registry = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
			app.product.initAddToCart();

		}

	};

}(window.app = window.app || {}, jQuery));

// app.progress
(function (app, $) {
	var loader;
	app.progress = {
		show: function (container) {
			var target = (!container || $(container).length===0) ? $("body") : $(container);
			loader = loader || $(".loader");

			if (loader.length===0) {
				loader = $("<div/>").addClass("loader")
									.append($("<div/>").addClass("loader-indicator"), $("<div/>").addClass("loader-bg"));

			}
			return loader.appendTo(target).show();
		},
		hide: function () {
			if (loader) { loader.hide(); }
		}
	};
	app.ajaxbuttonloader = {
			show: function (butt) {
				if(butt.find('.button-loader').length == 0){
					butt.prepend('<img class="button-loader" src="'+app.urls.loaderImgSrc+'">');
				}
			},
			hide: function (butt) {
				butt.find('.button-loader').remove();
			}
	};
}(window.app = window.app || {}, jQuery));

// app.components
(function (app, dw, $) {
	// capture recommendation of each product when it becomes visible in the
	// carousel

	function captureCarouselRecommendations(c, li, index, state) {
		if (!dw) { return; }

		$(li).find(".capture-product-id").each(function () {
			dw.ac.capture({
				id : $(this).text(),
				type : dw.ac.EV_PRD_RECOMMENDATION
			});
		});
	}

	app.components = {
		carouselSettings : {
			scroll : 1,
			itemFallbackDimension: '100%',
			itemVisibleInCallback : app.captureCarouselRecommendations
		},
		init : function () {
			// renders horizontal/vertical carousels for product slots
			$('#horizontal-carousel').jcarousel(app.components.carouselSettings);
			$('#vertical-carousel').jcarousel($.extend({vertical : true}, app.components.carouselSettings));
		}
	};
}(window.app = window.app || {}, window.dw, jQuery));

// app.cart
(function (app, $) {
	var $cache = {};
	
	function xhrCartSetLineItemDetails(settings) {
		var ajaxSettings = {
			url: app.urls.cartSetLineItemDetails,
			type: 'POST',
			dataType: 'html'
		};
		
		ajaxSettings = $.extend(ajaxSettings, settings);
		
		return $.ajax(ajaxSettings);
	}
	
	function togglePrompt(lineItem) {
		lineItem.find('.check-home-delivery-prompt').toggle('fast');
		lineItem.find('.check-home-delivery').toggle('fast');
	}

	function updateCart(postdata, callback) {
		var url = app.util.ajaxUrl(app.urls.addProduct);
		return $.post(url, postdata, callback || app.cart.refresh);
	}

	function initializeCache() {
		$cache = {
			cartTable : $("#cart-table"),
			itemsForm : $("#cart-items-form"),
			approachingAlert: $("#cart-approaching-alert"),
			continueOnShipping: $("#continueOnShipping")
		};
	}

	var qtyChangeTimeout;
	lastQtyUpdate = {};
	function handleQuantityUpdate(e) {
		
		var $this = $(this),
			$lineItemCtnr = $this.closest('.basketitem, tr.midrow'),
			$qtyField = $lineItemCtnr.find('input.qtyInput'),
			$availField = $lineItemCtnr.find('input._availableQty'),
			$availHDField = $lineItemCtnr.find('input._availableHD'),
			$availToPromiseField = $lineItemCtnr.find('input._availableToPromise'),
			$hdSwitchLink = $lineItemCtnr.find('.switch-ship-method');
			$pickupField = $lineItemCtnr.find('input.option-pickup:checked'),
			$shipRadio = $lineItemCtnr.find("input[name*='ordertype-']:checked"),
			isShip = $shipRadio.prop('checked'),
			increment = $this.data('increment') || 0,
			currentQty = (!isNaN($qtyField.val()) ? parseInt($qtyField.val()) : 1) + increment,
			displayQty = currentQty,
			availableHD = parseInt($availHDField.val()),
			fcAvailableToPromise = parseInt($availToPromiseField.val()),
			storeid = $pickupField.length ? $pickupField.data('store') : '',
			duration = increment === 0 ? 0 : (increment > 0 ? 1000 : 2000),
			availQty = 0,
			uuid = $lineItemCtnr.data('uuid'),
			newShipMethod = null;
			
		if ($shipRadio.length) {
			availQty = (app.constants.SHIPPING_METHOD_ID_MAP[$shipRadio.val().slice('m')] == app.constants.ORDER_TYPE.DIRECT) ? fcAvailableToPromise : parseInt($availField.val());
		} else {
			availQty = 0;
			displayNoShipping();
			return;
		}
		
			
		// If this pli is of order type 'direct', check if current quantity
		// exceeds the available to promise and that it can be fulfilled
		// as a home delivery order type, if so, send home delivery shipping
		// method to the quantityChange event, which in turn will pass it to
		// the lineItemChange event, changing the shipping method to home delivery.
		if (isShip && (app.constants.SHIPPING_METHOD_ID_MAP[$shipRadio.val().slice('m')] == app.constants.ORDER_TYPE.DIRECT)) {
			if (currentQty > fcAvailableToPromise) {
				if (availableHD > fcAvailableToPromise) {
					availQty = availableHD;
					newShipMethod = $hdSwitchLink.data('method');
				}
			}
		}
			
			
		clearTimeout(qtyChangeTimeout);

		if(displayQty > 0 && displayQty <= availQty){
		  $('.delivery-option, #checkoutBtn, .cart-footer button').attr('disabled', 'true');
		}
		
		if (availQty > 0 & displayQty > availQty) {
			var shipOptions = $lineItemCtnr.find('.productshippingcontent').data('shipoptions');
			var hasReserve = shipOptions && shipOptions.pickup && shipOptions.pickup.reserve && shipOptions.pickup.reserve.quantityAvailable >= availQty;
			
			// if pickup selected and reserve qty > available qty, reset available qty
			if (!$lineItemCtnr.hasClass('no-override') && $pickupField.length && hasReserve) {
				availQty = shipOptions.pickup.reserve.quantityAvailable;
			}
			else {
				displayQty = availQty;
			}
		}
		else if (displayQty < 0) {
			displayQty = 0;
		}
		
		$qtyField.val(displayQty);

		e.preventDefault();

		qtyChangeTimeout = setTimeout(function() {
			
			var update = false;
			if (lastQtyUpdate[uuid]) {
				if (lastQtyUpdate[uuid] != displayQty) {
					lastQtyUpdate[uuid] = displayQty;
					update = true;
				}
			} else {
				lastQtyUpdate[uuid] = displayQty;
				update = true;
			}

			$.event.trigger({
				type: 'quantityChange',
				uuid: uuid,
				qty: currentQty,
				storeid : storeid,
				availQty: availQty,
				lineItemCtnr : $lineItemCtnr,
				shipmethod : newShipMethod,
				update : update
			});
		}, duration);
	}

	function bindCartTableEvents() {
		$cache.approachingAlert = $cache.approachingAlert || $("#cart-approaching-alert");
		$cache.cartTable = $("#cart-table");
		$cache.cartTable.on('click', 'a.remove', function(e) {
			e.preventDefault();
			var $this = $(this),
				$ctnr = $this.closest('.basketitem, .cart-row, .midrow'),
				uuid = $ctnr.data('uuid');

			if(!uuid) { return; }

			$.event.trigger({
				type: 'removeSelected',
				uuid: uuid,
				ctnr: $ctnr
			});

		})
		.on('keydown', '.qtyInput', function(e) {
			var $this = $(this);
			$this.data('increment', 0);

			if (e.which===app.keyCodes.UP) {
				$this.data('increment', 1);
			}
			else if (e.which===app.keyCodes.DOWN) {
				$this.data('increment', -1);
			}
			else if ( e.which!==app.keyCodes.ENTER ) {
				return;
			}
			
			handleQuantityUpdate.call(this, e);
		})
		.on('keyup', '.qtyInput', function(e){
			var $this = $(this);
			if ($this.val().length && !isNaN($this.val()) && $this.val() != $this.data('lqv')) {
				$this.data('lqv', $this.val()).data('dirty', true);
			}

		})
		.on('blur', '.qtyInput', function(e){
			var $this = $(this);
			if (!$this.val().length || isNaN($this.val())) {
				$this.val($this.data('lqv') || 1);
				return;
			}

			// make sure this is a whole number
			$this.val($this.val());

			if ($this.data('dirty')) {
				handleQuantityUpdate.call(this, e);
			}

		})
		.on('click', '.option-reserve', function(e) {
						
			var $this = $(this),
				$optionPickup = $this.closest('.basketitem').find('.option-pickup'),
				$ctnr = $this.closest('.basketitem'),
				$qtyField = $ctnr.find('input.qtyInput'),
				shipMethod;

			if (this.checked) {
				shipMethod = $this.val();
				$optionPickup.prop('checked', true);
			}
			else {
				shipMethod = $optionPickup.val();
				var shipOptions = $ctnr.find('.productshippingcontent').data('shipoptions');
				var $availField = $ctnr.find('input._availableQty');
				var instoreAvailable = shipOptions && shipOptions.pickup && shipOptions.pickup.instore ? shipOptions.pickup.instore.quantityAvailable : 0;
				var qty = +$qtyField.val();
				
				$availField.val(instoreAvailable);
				
				if (qty > instoreAvailable) {
					$qtyField.val(instoreAvailable);
					app.util.notifyMeQty(app.resources.CART_INVENTORY_MSG);
				}
			}

			var params = {
				uuid : $ctnr.data('uuid'),
				qty : $qtyField.val(),
				storeid : $this.data('store'),
				shipmethod : shipMethod,
				previousshipmethod : $ctnr.attr('data-shipmethod'),
				reserveSelected: true,
				refresh : true
			};
			
			$.event.trigger({
				type: 'lineItemChange',
				params: params
			});
			
			
		})
		.on('change', '.option-pickup', function(e) {
			if (!this.checked) {
				$this.closest('.basketitem').find('.option-reserve').prop('checked', false);
				
			}
			
		})
		.on('click', '.delivery-option', function(e) {
			if (!this.checked) { return; }

			var $this = $(this),
				$ctnr = $this.closest('.basketitem');

			if($this.hasClass('option-pickup') && !$this.data('enabled')) {
				app.storeTools.loadPreferredStorePanel($ctnr.data('pid'),null,$ctnr.data('uuid'));
				e.preventDefault();
				return;
			}
		})
		.on('change', '.delivery-option', function(e) {
			if (!this.checked || ($(this).hasClass('option-pickup') && !$(this).data('enabled'))) { return; }

			var $this = $(this),
				$ctnr = $this.closest('.basketitem'),
				params = {
					uuid : $ctnr.data('uuid'),
					qty : $ctnr.find('.qtyInput').val(),
					storeid : $this.data('store'),
					shipmethod : $this.val(),
					previousshipmethod : $ctnr.attr('data-shipmethod'),
					userinteraction : true,
					refresh : true
				};

			$.event.trigger({
				type: 'lineItemChange',
				params: params
			});
		})
		.on('click', '.switch-ship-method', function(e) {
			var $this = $(this),
				$ctnr = $this.closest('.basketitem'),
				isDirect = app.constants.SHIPPING_METHOD_ID_MAP[$this.data('method').split('m')[1]] == app.constants.ORDER_TYPE.DIRECT,
				quantity = getShippingQuantity(isDirect, $ctnr);
				params = {
					uuid : $ctnr.data('uuid'),
					quantity : parseInt(quantity),
					shipmethod : $this.data('method'),
					previousshipmethod : $ctnr.attr('data-shipmethod'),
					shipSelected: true,
					refresh : true
				};
			
			e.preventDefault();

			$.event.trigger({
				type: 'lineItemChange',
				params: params
			});

		})
		.on("click", ".item-edit-details a", function (e) {
			e.preventDefault();
			app.quickView.show({
				url : e.target.href,
				source : "cart"
			});
		})
		.on("click", ".bonus-item-actions a", function (e) {
			e.preventDefault();
			app.bonusProductsView.show(this.href);
		})
		.on('click', '.change-store, .check-stores', function(e){
			e.preventDefault();
			var $ctnr = $(this).closest('.basketitem');
			app.storeTools.loadPreferredStorePanel($ctnr.data('pid'),null,$ctnr.data('uuid'));
		})
		.on('click', '.check-home-delivery', function(e){
			e.preventDefault();
			togglePrompt($(this).closest('.basketitem'));
		})
		.on('keydown', '.home-delivery-prompt', function(e){
			var k = e.which,
				$this = $(this),
				rx = $this.data('rx') ? new RegExp($this.data('rx')) : app.validator.regex.postal[app.countryCode.toLowerCase()];

			$this.removeClass('error');

			if (k===app.keyCodes.ESC) {
				$this.val('');
				togglePrompt($this.closest('.basketitem'));
				return;
			}

			if (k!==app.keyCodes.ENTER) {
				return;
			}

			e.preventDefault();

			if (!rx.test($this.val())) {
				$this.addClass('error');
				return;
			}

			$.ajax({
				url : app.util.appendParamsToUrl(app.urls.setZipCode, { zipCode : $this.val() }),
				type : "GET",
				dataType: "json"
			}).done(function(data) {
				window.location.replace(window.location.href);
			});

		})
		.on('click', '.home-delivery-prompt-submit', function(e) {
			var $hdPrompt = $('.home-delivery-prompt');
			var rx = $hdPrompt.data('rx') ? new RegExp($hdPrompt.data('rx')) : app.validator.regex.postal[app.countryCode.toLowerCase()];

			e.preventDefault();

			if (!rx.test($hdPrompt.val())) {
				$hdPrompt.addClass('error');
				return;
			}

			$.ajax({
				url : app.util.appendParamsToUrl(app.urls.setZipCode, { zipCode : $hdPrompt.val() }),
				type : "GET",
				dataType: "json"
			}).done(function(data) {
				app.user.setPreferredStore($hdPrompt.val());
				app.checkout.ajaxCartTableReload();
			});
		})
		.on('click', '.qtySelector span', handleQuantityUpdate);

		$cache.cartTable.find('.qtyInput').each(function() {
			var $this = $(this);
			$this.data({ lqv : $this.val(), dirty : false});
		});

		// global custom event handlers
		$(document).off('removeSelected', '**').on('removeSelected', function(e){

			if (!e.uuid) { return; }

			var uuid = e.uuid,
				ctnr = e.ctnr || $('#li-'+uuid),
				url = app.util.appendParamsToUrl(app.urls.removeProduct, {UUID: uuid}),
				options = $.extend(true, {}, app.dialog.settings, {
					height : 240,
					width : 450,
					dialogClass : 'removeItem',
					title : 'Remove item?',
					data : {},
					closeText : ''

				});

			app.dialog.open({
				url:url,
				options: options,
				callback: function(){

					$('.cancel-button').add('.ui-dialog-titlebar-close').click(function (e) {
						e.preventDefault();
						var $btn = $('.cancel-button'),
							uuid = $btn.data('uuid'),
							qty = $btn.data('qty');

						ctnr.find('.qtyInput').val(qty);
						app.dialog.close();
					});

					// If remove is selected, trigger custom event to remove the
					// item.
					$('a.removeProduct').on('click', function(e){
						e.preventDefault();
						$.event.trigger({
							type: 'lineItemRemoved',
							uuid: uuid
						});
					});

					$('a.wishlist').on('click', function(e){
						e.preventDefault();
						var $btn = $(this),
							pid = $btn.data('productid'),
							uuid = $btn.data('uuid');
							
						var url = app.util.appendParamToURL(app.urls.wishlistMove, "pid", pid);
						url = app.util.appendParamToURL(url, "uuid", uuid);
						url = app.util.appendParamToURL(url, "format", "ajax");
							

						$.ajax({
							url: url
						}).done(function(data){
							if(data.success == false && data.error == "authentication"){
								var url = app.util.appendParamToURL(app.urls.wishlistMove, "pid", pid);
								url = app.util.appendParamToURL(url, "uuid", uuid);
								window.location = url;
							} else if(data.success == true) {
								$.event.trigger({
									type: 'lineItemRemoved',
									uuid: uuid
								});
							}
						});
					});
				}
			});

		});

		// global custom event handlers
		$(document).off('quantityChange', '**').on('quantityChange', function(e){
			var uuid = e.uuid,
				qty = e.qty,
				availQty = e.availQty,
				lineItemCtnr = e.lineItemCtnr,
				qtyField = lineItemCtnr.find('input.qtyInput'),
				storeid = e.storeid,
				totalPriceField = lineItemCtnr.find('.totalproductprice, .price-total');

			// if new quantity is 0, show the delete dialog
			if (qty <= 0) {
				$.event.trigger({
					type: 'removeSelected',
					uuid: uuid,
					ctnr: lineItemCtnr
				});
				return;
			}
			
			// if new quantity is greater than available,
			// set qtyField value to available, notify and fire the event with
			// reduced quantity
			
			if (qty > availQty) {
				app.util.notifyMeQty(app.resources.CART_INVENTORY_MSG);
				if (availQty > 0) {
					qtyField.val(availQty);
					qty = availQty;
				}
				else {
					qtyField.data('dirty', false);
				}
				if (!e.update) {
					return;
				}
			}
			
			var params = {
				uuid : uuid,
				qty : qty,
				storeid : storeid,
				refresh : true
			};
			
			if (e.shipmethod) {
				params.shipmethod = e.shipmethod;
				params.userinteraction = true;
			}

			$.event.trigger({
				type: 'lineItemChange',
				params: params
			});

			qtyField.data('dirty', false);

		});

		$(document).off('lineItemRemoved', '**').on('lineItemRemoved', function(e){
			var uuid = e.uuid,
				callback = e.callback || null,
				context = e.context || null;
			
			$.event.trigger({
				type: 'lineItemChange',
				context: e.context,
				callback: function() {
					app.dialog.close();
					if (callback) {
						callback.call(context);
					}
				},
				params: {
					uuid: e.uuid,
					quantity : 0,
					refresh: true
				}
			});
		});
		
		$(document).unbind('lineItemChange').on('lineItemChange', function(e){
			var $shippingForm = $('form.checkout-shipping'),
				callback = e.callback,
				context = e.context,
				params = e.params;
			
			if (params.shipmethod && params.shipmethod.toString().charAt(0)==='m') {
				params.shipmethod = params.shipmethod.slice(1);
			}
			
			
			if (app.page.type.toLowerCase()=='checkout') {
				params.ischeckout=1;
			}

			if ($shippingForm.length) {
				var $zip = $shippingForm.find("input[name$='_zip']");
				// provide postal code override
				if ($zip.length && $zip.val().length >= 5) {
					params.postalCode = $zip.val();
				}
			}

			xhrCartSetLineItemDetails({
				data: params,
				beforeSend: function() {
					app.progress.show($('#main'));
				}
			}).done(function(response) {

				if(!response.length){
					alert("Sorry. We were unable to update your cart at this time.");
					return;
				}
				// if response includes 'EMPTY_BASKET', return to ~/Cart-Show
				if(~response.indexOf('EMPTY_BASKET')){
					window.location = app.urls.cartShow;
					return;
				}

				$('#checkoutBtn, .cart-footer button').removeAttr('disabled');
				app.progress.hide();
				
				var responseMarkup = $('<div>'+response+'</div>');
				resetCartTable(responseMarkup.find('#cart-table'));
				resetShippingMethods(responseMarkup.find('.shipping-methods'));
				resetMiniCart(responseMarkup.find('#mini-cart'));
				resetSummary(responseMarkup.find('#basket-summary-holder'));
				resetYourStore(responseMarkup.find('#store-header'));
				resetApproachingAlert(responseMarkup.find('.cart-approaching-container'));
				responseMarkup = null;
				
				setShippingVisibility();
				app.checkout.checkForFilledForm($shippingForm);
				

			}).fail(function(xhr, status, msg){
				alert("An error occurred while updating your shipping options.");
			}).always(function() {
				app.progress.hide();
				if (callback) {
					callback.call(context || this);
				}
			});

		});
		
		
		if ($.fn.qtip) { 
			$(".question-reserve").qtip({
				content: $('.reserve-tooltip').html(),
				show: 'click',
			   	style: {
			   		width: 300
			   	},
				position: {
					my: 'middle right',
					at: 'middle left'
				}
			});
		}
		
		$cache.approachingAlert.on('click', '.close-approaching-alert', function(e){
			app.cart.approachingAlertClosed = true;
			$cache.approachingAlert.slideUp();
        });
	}
	
	function getShippingQuantity(isDirect, ctnr) {
		var inputQty = parseInt(ctnr.find('.qtyInput').val());
		var availableQty = parseInt(ctnr.find('input._availableToPromise').val());

		if (isDirect && (inputQty > availableQty)) {
			return availableQty;
		}
		return inputQty;
	}

	function resetMiniCart(element) {
		var $miniCart = $("#mini-cart");

		if (!element || !element.length || !app.minicart || !app.minicart.exists) { return; }

		app.minicart.update(element.html());
	}

	function resetYourStore(element) {

		var $yourStore = app.ui.headerNavCtnr.find('.your-store');

		if (!element || !element.length || !$yourStore.length) { return; }

		$yourStore.html(element.find('.your-store').html());
		$yourStore.next('a').html(element.find('.link-content').html());
	}

	function resetApproachingAlert(element) {
				
		if (!element || !element.children('.cart-promo-approaching').length) {
			$cache.approachingAlert.removeClass('visible');
			$cache.approachingAlert.find('.cart-approaching-container').html("");
			return; 
		}
		
		$cache.approachingAlert.addClass('visible');
		$cache.approachingAlert.html( element.html() );
		element.remove();
		
		showApproachingAlert();
	}

	function resetCartTable(element) {

		if (!element || !element.length) { return; }
		
		$cache.cartTable = $cache.cartTable && $cache.cartTable.length ? $cache.cartTable : $("#cart-table");
		$cache.cartTable.html(element.html());
		
		// highlight items flagged for highlight
		$.fn.effect && $cache.cartTable.find('.basketitem.highlight .productshippingcontent').effect('highlight', {color: '#ffff99'}, 2000);
		

		$(".question-reserve").qtip({
			content: $('.reserve-tooltip').html(),
			show: 'click',
		   	style: {
		   		width: 300
		   	},
			position: {
				my: 'middle right',
				at: 'middle left'
			}
		});
	}
	function resetShippingMethods(element) {
		if (!element || !element.length) { return; }
		$cache.shippingMethodCtnr = $('.shipping-methods');

		if (!$cache.shippingMethodCtnr.length) { return; }

		$cache.shippingMethodCtnr.html(element.html());

		if ($cache.shippingMethodCtnr.find('input').length == 0) {
			// No input fields returned, so no shipping options to show
			$cache.shippingMethodCtnr.closest('#shipping-method-list').fadeOut('fast');
		}else{
			$cache.shippingMethodCtnr.closest('#shipping-method-list').fadeIn('fast');
		}
	}
	function resetSummary(element) {

		if (!element || !element.length) { return; }
		var $summaryContainer = $('#basket-summary-holder');


		if (!$summaryContainer.length) { return; }
		$summaryContainer.html(element.html());
		$summaryContainer.find('.question-shipping').qtip({
			content: $('.shipping-tooltip'),
			show: 'click',
		   	style: {
		   		width: 180
		   	},
			position: {
				my: 'middle right',
				at: 'middle left'
			}
		});

		// coupon form toggle visibility
		$(".entercodelink").click(function(){
			$(".couponcodeform").show();
			$(".couponcodeform input").focus();
			$(".entercodelink").hide();
		});
		var redemptionDiv = $("form.minisummary-coupon").find("div.redemption.coupon");
		app.checkout.addCouponRemoveEvent(redemptionDiv);
		app.checkout.addNewCouponEvent(redemptionDiv);

		var $cb = $("#checkoutBtn"),
			$sb = $summaryContainer.find('.cart-footer button');

		// sync behavior and state of checkout and summary buttons
		if (!$cb || !$cb.length) { return; }

		$sb.prop('disabled', $cb.prop('disabled'));
		$sb.on('click', function(e) {
			e.preventDefault();
			$cb.trigger('click');
		});
	}
	function hasShipShippingGroup() {
		var sg = $('.shipping-groups'), groups;
	
		if (!sg.length) {
			return false;
		}
	
		groups = sg.data('shipping-groups');
	
		return !!~groups.indexOf("ship");
	}
	
	function setShippingVisibility() {
		
		hasShipGroup = hasShipShippingGroup();

		$('.ship-group').toggle(hasShipGroup);
		$('#cart-table td.divider').toggle(hasShipGroup);
		
		if(hasShipGroup){
		  $('.checkout-shipping').removeAttr('style');	  
		}else{
		   $('.checkout-shipping').css('height', '0px').css('width', '0px');
		   $('#continueOnShipping').prop("disabled", false);
		}

		if ($(".shipping-methods").find('input').length == 0) {
			// No input fields returned, so no shipping options to show
			$(".shipping-methods").closest('#shipping-method-list').fadeOut('fast');
		}else{
			$(".shipping-methods").closest('#shipping-method-list').fadeIn('fast');
		}


	}

	function displayOutOfStock(uuid){

		var $this = $(this),
			options = $.extend(true, {}, app.dialog.settings, {
			height : 240,
			width : 450,
			dialogClass : 'removeItem',
			title : 'An item is not available',
			data : {},
			closeText : '',
			closeOnEscape: false

		});

		var url = app.util.appendParamsToUrl(app.urls.removeProduct, {UUID: uuid, OOS: true});

		app.dialog.open({
			url:url,
			options: options,
			callback: function(){

				$('a.okay-button').click(function(e){
					e.preventDefault();
					app.dialog.close();
				});

				// If remove is selected, trigger custom event to remove the
				// item.
				$('a.removeProduct').on('click', function(e){
					e.preventDefault();
					var $btn = $(this),
						uuid = $btn.data('uuid'),
						pid = $btn.data('productid');
					$.event.trigger({
						type: 'lineItemRemoved',
						uuid: uuid
					});
				});

				$('a.wishlist').on('click', function(e){
					e.preventDefault();
					var $btn = $(this),
						pid = $btn.data('productid'),
						uuid = $btn.data('uuid');
						
					var url = app.util.appendParamToURL(app.urls.wishlistMove, "pid", pid);
					url = app.util.appendParamToURL(url, "uuid", uuid);
					url = app.util.appendParamToURL(url, "format", "ajax");
						
				
					$.ajax({
						url: url
					}).done(function(data){
						if(data.success == false && data.error == "authentication"){
							var url = app.util.appendParamToURL(app.urls.wishlistMove, "pid", pid);
							url = app.util.appendParamToURL(url, "uuid", uuid);
							window.location = url;
						} else if(data.success == true) {
							$.event.trigger({
								type: 'lineItemRemoved',
								uuid: uuid
							});
						}
					});
				});
			}
		});
	}
	
	function displayNoShipping(){

		var $this = $(this),
			options = $.extend(true, {}, app.dialog.settings, {
			height : 160,
			width : 450,
			dialogClass : 'noShipping',
			title : 'No Shipping Method Selected',
			data : {},
			closeText : '',
			closeOnEscape: false

		});

		app.dialog.open({
			url:app.urls.noShipping,
			options: options,
			callback: function(){
				
				$('.okay-button').click(function(e){
					e.preventDefault();
					app.dialog.close();
				});
			},
			options: {
				close: function() {
					if (!app.mobile || !app.mobile.checkout) { return; }
					
					// highlight line items with unselected shipping methods
					_.each(ko.toJS(app.mobile.checkout.viewModel.product_items), function(pi) {
						 if (pi.selectedShippingMethod && pi.selectedShippingMethod.availableForQuantity) { return; }
						 
						 $('#bpi-' + pi.uuid).addClass(clsUnselected);
						 $('#spi-' + pi.uuid).addClass(clsUnselected);
						 $('#rpi-' + pi.uuid).addClass(clsUnselected);
					 });
				}
			}
		});
	}

	function checkOutOfStock() {
		if($('.no-shipping').length > 0){
			displayNoShipping();
		}
		else{
			// Display modal for out of stock items
			$( ".OOS" ).each(function() {
				displayOutOfStock($(this).data("uuid"));
			});
		}
	}
	
	function showApproachingAlert(){
		if( $cache.approachingAlert.hasClass('visible') && !app.cart.approachingAlertClosed ){
		
			var docBottom = $(window).height();
			var alertTop = $("#approaching-alert-container").offset().top;
			
			if(alertTop > docBottom){
				$cache.approachingAlert.addClass("bottom");
			}
			
			setTimeout(function(){
				$cache.approachingAlert.slideDown();
			},1500);
		}
	}

	function initializeEvents() {

		bindCartTableEvents();
		bindShipStoreEvents();
		
		if( $cache.approachingAlert.find('.cart-promo-approaching').length ){
			$cache.approachingAlert.addClass('visible');
		}

		resetApproachingAlert($('.cart-approaching-container'));		
		
		if($('#reducedQtyMsg').length){
			app.util.notifyMeQty($('#reducedQtyMsg').html());
		}

		checkOutOfStock();

		$('#ChangeZip').on('click', function(){
			var estimatedWrapper = $(this).parents('.estimated');

			estimatedWrapper.animate({'diplay': 'hide'}, 0, function(){
				estimatedWrapper.siblings('.estimatedForm').fadeIn(1500);
			});

		});

		$("#CalcZip").submit(function(e){
			e.preventDefault();
			var zip = $(this).find('input').val();
			validateZip(zip, true);
		});

		$("#CalcZip input").blur(function(){
			var zip = $(this).val();
			validateZip(zip, false);
		});

		$('#checkoutBtn').on('click', function() {
			if($(".home-delivery-prompt-submit").length) {
				$(".home-delivery-prompt-submit").trigger('click');
				return false;
			} else {
				return true;
			}
		});


		function validateZip(zip, submit){
			var zipRegEx = /^(\d{5})(-\d{4})?$/,
				errorDOM = $('.estimatedZip .marker.error'),
				isValid = true;

			errorDOM.hide();
			if((zip == '') || (!zipRegEx.test(zip))){
				errorDOM.show();
				isValid = false;
			}

			if(isValid && submit){
				var url = app.util.appendParamsToUrl(app.urls.cartUpdateZip, {ProductID: zip}),
					summaryFooter = $('#secondary').find('.estimatedZip');
				url = url.replace('Cart-Show/', '');

				$.ajax({
					url: url,
					success: function(data){
						app.checkout.updateBasketSummary();
						summaryFooter
							.find('.estimatedForm').hide()
							.end()
							.find('.estimated').find('span').html(zip)
							.end()
							.show();
					}
				})
			}
		}

		// Basket summary scroll
		if($("#main").length){
			jQuery(window).scroll(function(event) {
				var stickyEl = jQuery('#secondary'),
					elTop = stickyEl.offset().top,
					thisTop = $(this).scrollTop(),
					windowBottom = $("#main").offset().top + $("#main").height();
			
				if(thisTop < 80) {
					stickyEl.css('top', 179);
				}
				else if(thisTop + 179 + stickyEl.height() > windowBottom + 80) {
				
					stickyEl.css('top', windowBottom - stickyEl.height());
				}
				else {
					stickyEl.css('top', thisTop + 99);
				}
			});
		}
	}

	function bindShipStoreEvents() {

		var deliverymethod = 'shiptohome',
			count = 0;

		$cache.cartTable = $cache.cartTable || $('#cart-table');

		$(".firstshipstore input.radio-url-a:not(:disabled)").click(function(e){

			var $thisRadio = $(this),
				$storeLink = $thisRadio.parent().find('.set-preferred-store'),
				storeSelected = ($storeLink.text() != app.resources.CART_CHOOSE_STORE);

			// we are attempting to pick up at the store
			deliverymethod = 'pickupatstore';

			// toggle visibility of form controls for multiship only
			if($cache.cartTable.hasClass('multi-ship-shipments-table')){
				$thisRadio.parents('.delivery-options').find('.ship-info').hide();
			}

			if(!storeSelected){ // store isn't selected
				// open store select dialog
				$storeLink.click();
			} else { // store is selected
				// tooltip prompt to set delivery for entire order if we haven't
				// before
				if(!count && $("#showStore").length){
					$("#showStore b").text("Ship to Store");
					loadTip($thisRadio, true);
					count++;
				}
				// send ajax request to update delivery method
				ajaxSetDelivery($thisRadio);
			}

		});

		$(".firstshiphome .radio-url-a:not(:disabled)").click(function(e){

			var $thisRadio = $(this);

			// we are attempting to ship to store
			deliverymethod = 'shiptohome';

			// toggle visibility of form controls for multiship only
			if($cache.cartTable.hasClass('multi-ship-shipments-table')){
				$thisRadio.parents('.delivery-options').find('.ship-info').show();
			}

			// tooltip prompt to set delivery for entire order if we haven't
			// before
			if(!count && $("#showStore").length){
				$("#showStore b").text("Ship to Home");
				loadTip($thisRadio, true);
				count++;
			}

			// send ajax request to update delivery method
			ajaxSetDelivery($thisRadio);

		});


		$cache.cartTable.find('.product-availability-list li').each(function(){
			var text = $(this).text();
			$(this).html( app.storeTools.updateCartMessaging('online',{ 'status' : text } ) );
		});
		$cache.cartTable.find('.selected-store-availability span').each(function(){
			var text = $(this).text();
			$(this).html( app.storeTools.updateCartMessaging('store',{ 'status' : text } ) );
		});

		function loadTip(target, load){

			if(load) {
				$(target).qtip({
					content: {
						text: $("#showStore"),
						title: {text: 'My Title', button: true}
					},
					position: {
						my: 'bottom middle',
						at: 'top left'
					},
					show: {
						ready: true,
						event: "click",
						solo: true
					},
					hide: 'unfocus'
				});
			}

			$(".btn").click(function(){
				$(target).qtip('hide');
				$(target).qtip('destroy');
			});

			$(".yes").click(function(){
				if(deliverymethod == 'shiptohome'){
					$(".firstshiphome .radio-url-a:not(:disabled):not(:checked)").attr("checked","checked").click();
				} else {
					$(".firstshipstore .radio-url-a:not(:disabled):not(:checked)").attr("checked","checked").click();
				}
				$(target).qtip('hide');
				$(target).qtip('destroy');
			});

		}

		function ajaxSetDelivery(selectedRadioBtn) {

			var $radioBtn = selectedRadioBtn,
				$availableQtyField = $radioBtn.parents('tr.midrow').find("._availableQty"),
				$qtyField = $radioBtn.parents('tr.midrow').find(".qtyInput"),
				availableQtyFieldVal = parseInt($availableQtyField.val()),
				qtyFieldVal = parseInt($qtyField.val()),
				requestURL = $radioBtn.data("url"),
				uuid = $radioBtn.parents('tr.midrow').data('uuid');

			// request JSON data about selection using AJAX
			$.getJSON(requestURL, {"qty" : qtyFieldVal}, function(data){

				if (!data || !data.availableQty) {return;} // required data not
															// present

				if (availableQtyFieldVal != data.availableQty) {
					$availableQtyField.val(data.availableQty); // update
																// available
																// quantity
				}

				if (qtyFieldVal > data.availableQty) {// update requested
														// quantity
					$qtyField.val(data.availableQty);
				}

				if(data.adjustedMsg){ // if quantity has been adjusted display
										// the message
					app.util.notifyMe(data.adjustedMsg);
				}

				app.checkout.updateBasketSummary();

				if (!$cache.isMultiShipping && !$cache.isShipping) {
					var url = app.util.appendParamsToUrl(app.urls.cartTableReload, {ischeckout:1});
					$.get(url, function(response) {
						if($.trim(response) == 'EMPTY_BASKET'){
							window.location = app.urls.cartShow;
							return;
						}
						var newTableRow = $(response).find('#midrow-' + uuid),
							itemPrice = newTableRow.find('td.item-price'),
							totalPrice = newTableRow.find('td.item-total'),
							oldTableRow = $('#midrow-' + uuid);

						oldTableRow.find('td.item-price').replaceWith(itemPrice);
						oldTableRow.find('td.item-total').replaceWith(totalPrice);

					});
				}
			});

		}

	}

	app.cart = {
		add : updateCart,
		remove : function () {
			return;
		},
		refresh : app.page.refresh,
		update : updateCart,
		init : function () {
			// edit shopping cart line item
			$(".option-reserve").hide();
			initializeCache();
			initializeEvents();
			app.checkout.updateBasketSummary();
		},
		bindShipStoreEvents : bindShipStoreEvents,
		bindCartTableEvents : bindCartTableEvents,
		setShippingVisibility : setShippingVisibility,
		hasShipShippingGroup : hasShipShippingGroup,
		checkOutOfStock : checkOutOfStock,
		displayNoShipping : displayNoShipping,
		displayOutOfStock : displayOutOfStock,
		resetCartTable : resetCartTable,
		resetShippingMethods : resetShippingMethods,
		resetSummary : resetSummary,
		resetApproachingAlert : resetApproachingAlert,
		showApproachingAlert : showApproachingAlert,
		approachingAlertClosed : false,
		setLineItemDetails: xhrCartSetLineItemDetails
	};

}(window.app = window.app || {}, jQuery));

// app.account
(function (app, $) {
	var $cache = {};

	function initializeAddressForm(e, ui) {
		var $el = e ? $(this) : $(document);
		
		
		$el.off('click').on('click', '.apply', function(e) {
			e.preventDefault();
			
			var $form = $("#edit-address-form"),
				valid = $form.valid();
				
			if (!valid) {
				return false;
			}
			
			$form.find("input[name='format']").remove();
			var addressId = $form.find("input[name$='_addressid']");
			addressId.val(addressId.val().replace(app.rxIdReplace, "-"));
			var post = $form.serialize();
			var formattedurl = app.util.ajaxUrl($form.attr("action"));
			app.dialog.close();
			$.ajax({
				type: "POST",
				url: formattedurl,
				data: post,
				dataType: 'html',
				success: function(data){
					//$("#dialog-container").empty().html(data);
					app.page.refresh();
				},
				failure: function(data) {
					alert("${Resource.msg('global.serverconnection','locale',null)}");

				},
				error : function(XMLHttpRequest, textStatus, errorThrown){
					$('#confirmation-container').show();
					$('#confirmation-container').dialog({
						bgiframe: true,
						autoOpen: false,
						modal: true,
						height: 100,
						width: 300,
						resizable: false
					});
					$('#confirmation-container').dialog('option', 'title', $('#dialog-container').dialog('option', 'title'));
					$('#confirmation-container').dialog('open');
				}
			});
		}).on('click', '.cancel', function(e) {
			e.preventDefault();
			app.dialog.close();
		}).on('click', '.delete-button', function(e){
			e.preventDefault();
			if (confirm(String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_ADDRESS))) {
				var url = app.util.appendParamsToUrl(app.urls.deleteAddress, {AddressID:form.find("#addressid").val(),format:"ajax"});
				$.ajax({
					url: url,
					method: "POST",
					dataType:"json"
				}).done(function(data){
					if (data.status.toLowerCase()==="ok") {
						app.dialog.close();
						app.page.refresh();
					}
					else if (data.message.length>0) {
						alert(data.message);
						return false;
					}
					else {
						app.dialog.close();
						app.page.refresh();
					}
				});
			}
		});
	}

	function toggleFullOrder () {
		$('.order-items')
			.find('li.hidden:first')
				.prev('li')
					.append('<a class="toggle">View All</a>')
					.children('.toggle')
						.click(function() {
							$(this).parent().siblings('li.hidden').show();
							$(this).remove();
						});
	}
	function initEditAccountInfo() {

		$(document).on('click', '.edit-account', function(e){
			e.preventDefault();
			var options = $.extend(true, {}, {open: initializeAddressForm}, {title : 'Edit Account Information', dialogClass: 'accInfo'});
			app.myaccountdlg.open({url:this.href, options:options});
		});
	}
	function initAddressEvents() {		
		$(document).on('click', '.address-edit', function(e){
			e.preventDefault();
			var options = $.extend(true, {}, {open: initializeAddressForm}, {title : 'Edit Address', dialogClass: 'aDlg'});
			app.myaccountdlg.open({url:this.href, options:options});
		});
		$(".address-delete").on("click", function(e){
			e.preventDefault();
			if (confirm(String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_ADDRESS))) {
				$.ajax({
					url: app.util.appendParamsToUrl($(this).attr("href"), {format:"ajax"}),
					dataType:"json"
				}).done(function(data){
					if (data.status.toLowerCase()==="ok") {
						app.page.refresh();
					}
					else if (data.message.length>0) {
						alert(data.message);
					}
					else {
						app.page.refresh();
					}
				});
			}
		});
		/*
		$(document).on('click', '.address-create', function(e){
			e.preventDefault();
			var options = $.extend(true, {}, {open: initializeAddressForm}, {title : 'Add an Address', dialogClass: 'aDlg'});
			app.myaccountdlg.open({url:this.href, options:options});
		});
		*/
		$(".address-set-preferred").on("click", function(e){
			var url = $(this).attr("id");
			var newChecked = this;
			$(".address-set-preferred:checked").each(function ( index, domEle) {
				// domEle == this
				if($(domEle).attr("id") != url){
					$(domEle).attr("checked", false);
				}
			});
			$.ajax({
				type: "GET",
				url: url
			});
		});
	}
	function initPaymentEvents() {

		$('.addCreditCard').click(function(e){
			var options = $.extend(true, {}, {open: initPaymentSettings}, {title : 'Add a Credit Card', dialogClass: 'addCard'});
			e.preventDefault();
			app.myaccountdlg.open({url:this.href, options:options});
		});

		$("form[name='payment-remove']").on("submit", function(e){
			e.preventDefault();
			if (!confirm(String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_CREDITCARD))) {
				return;
			}
			// override form submission in order to prevent refresh issues
			var button = $(this).find("button");

			var data = $(this).serialize();
			data = data + "&" + $(button).attr("name") + "=" + $(button).attr("value");
			$.ajax({
				type: "POST",
				url: $(this).attr("action"),
				data: data
			})
			.done(function(response) {
				app.page.refresh();
			});
		});
	}

	function initPaymentSettings () {
		$(document).on('click', '.cancel', function(e) {
			e.preventDefault();
			app.myaccountdlg.close();
		});
		$(document).on('click', '.apply', function(e) {
			var form = $("#CreditCardForm");
			e.preventDefault();
			if (!form.valid()) {
				return false;
			}
			
			if($("#dwfrm_paymentinstruments_creditcards_newcreditcard_type").val() == 'Pier1') {
				$("#CreditCardForm .addCreditCardRowExt").remove();
			}
			
			var formattedurl = app.util.ajaxUrl(form.attr("action"));
			var post = $('#CreditCardForm').serialize();
			$.ajax({
				type: "POST",
				url: formattedurl,
				data: post,
				dataType: 'html',
				success: function(data){
				$("#dialog-container").empty().html(data);
			},
			failure: function(data) {
				alert("${Resource.msg('global.serverconnection','locale',null)}");

			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				$('#confirmation-container').show();
				$('#confirmation-container').dialog({
					bgiframe: true,
					autoOpen: false,
					modal: true,
					height: 100,
					width: 300,
					resizable: false
				});
				$('#confirmation-container').dialog('option', 'title', $('#dialog-container').dialog('option', 'title'));
				$('#confirmation-container').dialog('open');
			}

			});
		});

		// Hide date fields if select Pier1 Rewards card type
		var dateFields = $("#CreditCardForm .addCreditCardRowExt");
		$("#dwfrm_paymentinstruments_creditcards_newcreditcard_type").change(function() {
			if ($(this).val() == 'Pier1')
			{
				dateFields.hide();
			}
			else
			{
				dateFields.show();
			}
		});

	}
	
	function scrollToShipment() {
		var container = $('html, body');
		var shiprefno = $('.order-detail-title-content-frame').attr('data-scrolltoref');
		var shipmentFrame = $('div[data-shipref=' + shiprefno + ']');
		
		if (shipmentFrame.length > 0) {
			$('html, body').animate({scrollTop: shipmentFrame.offset().top}, 2000, 'swing');
		}
	}

	function initForgotPwdSettings(){
		$(document).on('click', '.apply', function(e) {
			var form = $("#PasswordResetForm");
			e.preventDefault();
			if (!form.valid()) {
				return false;
			}
			action = "${pdict.CurrentForms.requestpassword.send.htmlName}";
			$('#formaction').append("<input name='" + action + "' type='hidden' />");
			var formattedurl = app.util.ajaxUrl(app.urls.submitDialogURL);
			var post = $('#PasswordResetForm').serialize();
			$.ajax({
				type: "POST",
				url: formattedurl,
				data: post,
				dataType: 'html',
				success: function(data){
				$("#dialog-container").empty().html(data);
			},
			failure: function(data) {
				alert("${Resource.msg('global.serverconnection','locale',null)}");

			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				$('#confirmation-container').show();
				$('#confirmation-container').dialog({
					bgiframe: true,
					autoOpen: false,
					modal: true,
					height: 100,
					width: 300,
					resizable: false
				});
				$('#confirmation-container').dialog('option', 'title', $('#dialog-container').dialog('option', 'title'));
				$('#confirmation-container').dialog('open');
			}
		  });
		});
		$(document).on('click', '.cancel', function(e) {
			e.preventDefault();
			app.myaccountdlg.close();
		});
	}
	function initializeEvents() {
		toggleFullOrder();
		/*initEditAccountInfo();*/
		initAddressEvents();
		initPaymentEvents();
	}
	app.account = {
		init : function () {
			initializeEvents();
			scrollToShipment();
		},
		initForgotPwd : function (){
			$(document).on('click', '#password-reset',function(e){
				e.preventDefault();
				var options = $.extend(true, {}, {open: initForgotPwdSettings}, {title : 'Reset password', dialogClass: 'fpDlg', closeText: ''});
				app.myaccountdlg.open({url:this.href, options:options});
			});
		},
		initializeAddressForm: initializeAddressForm
	};
}(window.app = window.app || {}, jQuery));

// app.wishlist
(function (app, $) {
	var $cache = {};

	function initializeEvents() {
		app.sendToFriend.initializeDialog("div.list-table-header", ".send-to-friend");
		$cache.editAddress.on('change', function () {
			window.location.href = app.util.appendParamToURL(app.urls.wishlistAddress, "AddressID", $(this).val());
		});
		$(".findBtn").on('click',function (){
			var wemail = $(".wishlist-email input").val();
			var wllname = $(".wishlist-lname input").val();
			var wlfname = $(".wishlist-fname input").val();
			if(wemail == ''){
				if(wllname == '' && wlfname == ''){
					alert("Please enter a value for first & last names!");
					return false;
				}
				if(wllname == '' && wlfname != ''){
					alert("Please enter a value for last name!");
					return false;
				}
				if(wllname != '' && wlfname == ''){
					alert("Please enter a value for first name!");
					return false;
				}
			}
		});
	}

	app.wishlist = {
		init : function () {
			$cache.editAddress = $('#editAddress');
			app.product.initAddToCart();
			initializeEvents();

		}
	};

	$(".pt_wish-list .list-table-header p .copy-paste-wishlist-url").focus(function(){
		this.select();
	});
	$(".pt_wish-list .list-table-header p .copy-paste-wishlist-url").mouseup(function(e){
		e.preventDefault();
	});

}(window.app = window.app || {}, jQuery));

// app.minicart
(function (app, $) {
	// sub name space app.minicart.* provides functionality around the mini cart

	var $cache = {},
		initialized = false;

	var timer = {
		id : null,
		clear : function () {
			if(timer.id) {
				window.clearTimeout(timer.id);
				delete timer.id;
			}
		},
		start : function (duration) {
			timer.id = setTimeout(app.minicart.close, duration);
		}
	};

	app.minicart = {
		url : "", // during page loading, the Demandware URL is stored here

		// initializations
		init : function () {

			$cache.minicart = $("#mini-cart");
			app.minicart.exists = $cache.minicart.length;

			$cache.mcTotal = $cache.minicart.find(".mini-cart-total");
			$cache.mcContent = $cache.minicart.find(".mini-cart-content");
			$cache.mcClose = $cache.minicart.find(".mini-cart-close");
			$cache.mcProductList = $cache.minicart.find(".mini-cart-products");
			$cache.mcProducts = $cache.mcProductList.children(".mini-cart-product");

			var collapsed = $cache.mcProductList.children().not(":first").addClass("collapsed");

			// bind hover event to the cart total link at the top right corner
			$cache.minicart.on("mouseenter", function () {
				if($cache.mcContent.not(":visible")) {
					app.minicart.slide();
				}
			})
			.on("mouseenter", ".mini-cart-content", function (e) {
				timer.clear();
			})
			.on("mouseleave", ".mini-cart-content", function (e) {
				timer.clear();
				timer.start(30);
			})
			.on("click", ".mini-cart-close", app.minicart.close);

			$cache.mcProducts.append('<div class="mini-cart-toggler">&nbsp;</div>');

			$cache.mcProductList.toggledList({toggleClass : "collapsed", triggerSelector:".mini-cart-toggler", eventName:"click"});

			var itemsInCart = $('.mini-cart-num-items');

			var digitArray = itemsInCart.text().match(/(\d)/g);
			if(digitArray != null){
				itemsInCart.empty();
				for( i = 0; i < digitArray.length; i++ )	{
					$('.mini-cart-num-items').append("<span class='num-image num-" + digitArray[i] + "'>"+digitArray[i]+"</span>");
				}
				$('.mini-cart-num-items').addClass('chars-' + digitArray.length);

			}


			initialized = true;
		},
		// shows the given content in the mini cart
		show : function (html) {
			var productSetTemplate = $('.product-col-2').hasClass('product-set');// checking
																					// if
																					// product
																					// set
																					// page.
			$cache.minicart.html(html);			
			
			app.minicart.init();
			app.minicart.slide();
			app.bonusProductsView.loadBonusOption();
		},
		// update the given content in the mini cart
		update : function (html) {
			$cache.minicart.html(html);
			var pgType = app.page.type.toLowerCase();

			if(pgType!=="cart" && pgType!=="checkout"){ // don't scroll to top
														// on the cart page
				app.util.scrollBrowser(0);
			}
			app.minicart.init();
			app.bonusProductsView.loadBonusOption();
		},
		// slide down and show the contents of the mini cart
		slide : function () {
			if(!initialized) {
				app.minicart.init();
			}

			if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
				return;
			}

			timer.clear();
			
			// Set the minicart to come down from top of the page
			var wrapper = $('#wrapper');
			if ($(document).scrollTop() != 0){
				$cache.mcContent.css({
					position: "fixed", 
					top: 0,
					left: wrapper.offset().left + wrapper.width() - $cache.mcContent.width() - 1
				});
			} else {
				$cache.mcContent.removeAttr('style');
			}

			// show the item
			$cache.mcContent.slideDown('slow');

			// after a time out automatically close it
			timer.start(6000);
		},
		// closes the mini cart with given delay
		close : function (delay) {
			timer.clear();
			$cache.mcContent.slideUp();
		},
		// hook which can be replaced by individual pages/page types (e.g. cart)
		suppressSlideDown : function () {
			return false;
		},
		exists : false
	};
}(window.app = window.app || {}, jQuery));

// app.dialog
(function (app, $) {
	// private
	var $cache = {
		container : $("#dialog-container")
	};
	// end private

	$(window).resize(function() {
		var dialogContainer = app.dialog.container;
		if (!dialogContainer || !dialogContainer.length || !dialogContainer.dialog || !app.dialog.container.dialog('isOpen')) {
			return;
		}

		app.dialog.container.dialog("option", "position", "center");
	});

	app.dialog = {
		create : function (params) {
			
			// options.target can be an id selector or an jquery object
			var target = $(params.target || "#dialog-container");

			// if no element found, create one
			if(target.length === 0) {
				if(target.selector && target.selector.charAt(0) === "#") {
					id = target.selector.substr(1);
				}
				target = $("<div>").attr("id", id).addClass("dialog-content").appendTo("body");
			}

			// create the dialog
			$cache.container=target;
			
			if (params.vars) {
				$cache.container.data('vars', params.vars);
			}
		
			$cache.container.dialog($.extend(true, {}, app.dialog.settings, params.options || {}));
			app.dialog.container = $cache.container;
			return $cache.container;
		},

		// opens a dialog using the given url
		open : function (params) {
			if (!params.url || params.url.length===0) { return; }

			$cache.container = app.dialog.create(params);
			params.url = app.util.appendParamsToUrl(params.url, {format:"ajax"});

			// finally load the dialog
			app.ajax.load({
				target : $cache.container,
				url : params.url,
				data: params.data || {},
				callback : function () {
					if (params.callback){
						params.callback();
					}
					if($cache.container.dialog("isOpen")) {	return;	}
					$cache.container.dialog("open");
				}
			});

		},

		// closes the dialog and triggers the "close" event for the dialog
		close : function () {
			if(!$cache.container) {
				return;
			}
			$cache.container.dialog("close");
		},
		// triggers the "apply" event for the dialog
		triggerApply : function () {
			$(this).trigger("dialogApplied");
		},
		// attaches the given callback function upon dialog "apply" event
		onApply : function (callback) {
			if(callback) {
				$(this).bind("dialogApplied", callback);
			}
		},
		// triggers the "delete" event for the dialog
		triggerDelete : function () {
			$(this).trigger("dialogDeleted");
		},
		// attaches the given callback function upon dialog "delete" event
		onDelete : function (callback) {
			if(callback) {
				$(this).bind("dialogDeleted", callback);
			}
		},
		// submits the dialog form with the given action
		submit : function (action) {
			var form = $cache.container.find("form:first");
			// set the action
			$("<input/>").attr({
				name : action,
				type : "hidden"
			}).appendTo(form);

			// serialize the form and get the post url
			var post = form.serialize();
			var url = form.attr("action");

			// post the data and replace current content with response content
			$.ajax({
				type : "POST",
				url : url,
				data : post,
				dataType : "html",
				success : function (data) {
					$cache.container.html(data);
				},
				failure : function (data) {
					window.alert(app.resources.SERVER_ERROR);
				}
			});
		},
		settings : {
			autoOpen : false,
			resizable : false,
			bgiframe : true,
			modal : true,
			height : 'auto',
			width : '800',
			buttons : {},
			title : '',
			position : 'center',
			overlay : {
				opacity : 0.5,
				background : "black"
			},
			close : function (event, ui) {
				$(this).dialog("destroy");
			},
			closeOnEscape: true
		},
		initErrorDialog : function(content){
			$(".errorDialogContainer").show();
			$(".errorDialogContainer").dialog({
				title: 'Whoops!',
				dialogClass : 'errorDlg',
				closeIcon: true
			});
			$("#errorDialogContainer").html("<span><p class='errMsg'>"+content+"</p></span><div class='note'>Please review your entries. <br/><br/><a class='button primary' onclick='app.dialog.closeErrorDialog();'>OK</a></div>");
			$(".errorDialogContainer").dialog('open');
		},
		closeErrorDialog : function(){
			$(".errorDialogContainer").dialog('close');
		},
		container: $cache.container
	};
}(window.app = window.app || {}, jQuery));

// app.myaccountdlg
(function (app, $) {
	// private

	var $cache = {};
	// end private

	app.myaccountdlg = {
		create : function (params) {
			// options.target can be an id selector or an jquery object
			var target = $(params.target || "#dialog-container");

			// if no element found, create one
			if(target.length === 0) {
				if(target.selector && target.selector.charAt(0) === "#") {
					id = target.selector.substr(1);
				}
				target = $("<div>").attr("id", id).addClass("dialog-content").appendTo("body");
			}

			// create the dialog
			$cache.container=target;
			$cache.container.dialog($.extend(true, {}, app.myaccountdlg.settings, params.options || {}));
			if(app.isMobileUserAgent) {
				window.scrollTo(0, 0);
			}
			return $cache.container;
		},

		// opens a dialog using the given url
		open : function (params) {
			if (!params.url || params.url.length===0) { return; }

			$cache.container = app.myaccountdlg.create(params);
			params.url = app.util.appendParamsToUrl(params.url, {format:"ajax"});

			// finally load the dialog
			app.ajax.load({
				target : $cache.container,
				url : params.url,
				callback : function () {
					if($cache.container.dialog("isOpen")) {	return;	}
					$cache.container.dialog("open");
					$('input, textarea').placeholder();
					if(app.isMobileUserAgent) {
						window.scrollTo(0, 0);
					}
				}
			});
			// $(".ui-icon-closethick").remove();
		},

		// closes the dialog and triggers the "close" event for the dialog
		close : function () {
			if(!$cache.container) {
				return;
			}
			$cache.container.dialog("close");
		},
		// triggers the "apply" event for the dialog
		triggerApply : function () {
			$(this).trigger("dialogApplied");
		},
		// attaches the given callback function upon dialog "apply" event
		onApply : function (callback) {
			if(callback) {
				$(this).bind("dialogApplied", callback);
			}
		},
		// triggers the "delete" event for the dialog
		triggerDelete : function () {
			$(this).trigger("dialogDeleted");
		},
		// attaches the given callback function upon dialog "delete" event
		onDelete : function (callback) {
			if(callback) {
				$(this).bind("dialogDeleted", callback);
			}
		},
		// submits the dialog form with the given action
		submit : function (action) {
			var form = $cache.container.find("form:first");
			// set the action
			$("<input/>").attr({
				name : action,
				type : "hidden"
			}).appendTo(form);

			// serialize the form and get the post url
			var post = form.serialize();
			var url = form.attr("action");

			// post the data and replace current content with response content
			$.ajax({
				type : "POST",
				url : url,
				data : post,
				dataType : "html",
				success : function (data) {
					$cache.container.html(data);
				},
				failure : function (data) {
					window.alert(app.resources.SERVER_ERROR);
				}
			});
		},
		settings : {
			autoOpen : false,
			resizable : false,
			bgiframe : true,
			modal : true,
			height : 'auto',
			width : 'auto',
			buttons : {},
			title : '',
			position : 'center',
			overlay : {
				opacity : 0.5,
				background : "black"
			},
			close : function (event, ui) {
				$(this).dialog("destroy");
			}
		}
	};
}(window.app = window.app || {}, jQuery));

// app.validator
(function (app, $) {

	var naPhone = /^\(?([2-9][0-8][0-9])\)?[\-\. ]?([2-9][0-9]{2})[\-\. ]?([0-9]{4})(\s*x[0-9]+)?$/,
		regex = {
			phone : {
				us : naPhone,
				ca : naPhone
			},
			postal : {
				us : /^\d{5}(-\d{4})?$/,
				ca : /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/,
				gb : /^GIR?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])?[0-9][ABD-HJLNP-UW-Z]{2}$/
			},
			email : /[A-Za-z0-9!#$%'*+/=?^_`{|}~-]+([-+.'][A-Za-z0-9!#$%'*+/=?^_`{|}~-]+)*@[A-Za-z0-9_]+([-.][A-Za-z0-9_]+)*\.[A-Za-z0-9_]+([-.][A-Za-z0-9_]+)*/,
			name  : /^[a-z]+[a-z ,.&'-]*$/i, //start with a-z, and at least 1 character 
			city  : /^[a-z]+[a-z ,.&'-]+$/i, //start with a-z, and at least 2 characters
			addressid : /^[\w+ -]+$/,
			address: /^[0-9a-z ,.&#'-]+$/i,
			zip   : /^(\d{5})(-\d{4})?$/
		},
		settings = {
			// global form validator settings
			errorClass : 'error',
			errorElement : 'span',
			ignoreTitle : true,
			onkeyup : false,
			onfocusout: false
			/*
			 * onfocusout : function (element) { if(!this.checkable(element)) {
			 * this.element(element); } }
			 */
		};

	function validatePhone(value, el) {
		value = $.trim($(el).val());
		var country = $(el).closest("form").find(".country").val();

		// since country selector was removed, the country will be null. We will
		// set it to US by default.
		if(country == null || country == ""){
		  country_val = "us";
		}else{
		  country_val = country.toLowerCase();
		}

		var rgx = regex.phone[country_val];
		var isOptional = this.optional(el) || !$(el).parent().hasClass('required');
		var isValid = rgx.test(value);

		return (isOptional && !value) || isValid;
	}

	function validateEmail(value, el) {
		value = $.trim($(el).val());
		var isOptional = this.optional(el) || !$(el).parent().hasClass('required');
		var isValid = regex.email.test(value);
		return (isOptional && !value) || isValid;
	}

	function validateName(value, el){
		value = $.trim($(el).val());
		var isOptional = this.optional(el) || !$(el).parent().hasClass('required');
		var isValid = regex.name.test(value);
		return (isOptional && !value) || isValid;
	}
	
	function validateCity(value, el){
		value = $.trim($(el).val());
		var isOptional = this.optional(el) || !$(el).parent().hasClass('required');
		var isValid = regex.name.test(value);
		return (isOptional && !value) || isValid;
	}
	
	function validateCity(value, el){
		value = $.trim($(el).val());
		var isOptional = this.optional(el) || !$(el).parent().hasClass('required');
		var isValid = regex.city.test(value);
		return (isOptional && !value) || isValid;
	}


	function validateAddress(value, el){
		value = $.trim($(el).val());
		var isOptional = this.optional(el) || !$(el).parent().hasClass('required');
		var isValid = regex.address.test(value);
		return (isOptional && !value) || isValid;
	}

	function validateZip(value, el){
		value = $.trim($(el).val());
		var isOptional = this.optional(el) || !$(el).parent().hasClass('required');
		var isValid = regex.zip.test(value);
		return (isOptional && !value) || isValid;
	}
	
	function validateAddressId(value, el) {
		value = $.trim($(el).val());
		var isOptional = this.optional(el) || !$(el).parent().hasClass('required');
		var isValid = regex.addressid.test(value);
		return (isOptional && !value) || isValid;
	}

	function initValidator() {
		/**
         * Add first and last name validation method to jQuery validation plugin.
         * Text fields must have 'phone' css class to be validated as phone
         */
        $.validator.addMethod("name-field", validateName, app.resources.INVALID_NAME);

        /**
         * Add city validation method to jQuery validation plugin. Text fields must
         * have 'phone' css class to be validated as phone
         */
        $.validator.addMethod("city-field", validateCity, app.resources.INVALID_CITY);

        /**
         * Add address validation method to jQuery validation plugin. Text fields
         * must have 'phone' css class to be validated as phone
         */
        $.validator.addMethod("address-field", validateAddress, app.resources.INVALID_ADDRESS);

        /**
         * Add phone validation method to jQuery validation plugin. Text fields must
         * have 'phone' css class to be validated as phone
         */
        $.validator.addMethod("phone", validatePhone, app.resources.INVALID_PHONE);
        $.validator.addMethod("other-phone", validatePhone, app.resources.INVALID_PHONE);
        $.validator.addMethod("mobile", validatePhone, app.resources.INVALID_PHONE);
        /**
         * Add email validation method to jQuery validation plugin. Text fields must
         * have 'email' css class to be validated as email
         */
        $.validator.addMethod("email", validateEmail, app.resources.INVALID_EMAIL);

        // Do not use default implementations due to IE8 placeholder bug
        $.validator.addMethod("zip-field", validateZip, app.resources.INVALID_ZIP);
        $.validator.addMethod("nickname", validateAddressId, app.resources.INVALID_ADDRESS_ID);
        $.validator.addMethod("first-name-field", validateName, app.resources.INVALID_NAME);
        $.validator.addMethod("last-name-field", validateName, app.resources.INVALID_NAME);

        /**
         * Add gift cert amount validation method to jQuery validation plugin. Text
         * fields must have 'gift-cert-amont' css class to be validated
         */
        $.validator.addMethod("gift-cert-amount", function(value, el){
            value = $(el).val();
            var isOptional = this.optional(el);
            var isValid = (!isNaN(value)) && (parseFloat(value)>=5) && (parseFloat(value)<=5000);
            return isOptional || isValid;
        }, app.resources.GIFT_CERT_AMOUNT_INVALID);

        /**
         * Add positive number validation method to jQuery validation plugin. Text
         * fields must have 'positivenumber' css class to be validated as
         * positivenumber
         */
        $.validator.addMethod("positivenumber", function (value, el) {
            value = $(el).val();
            if($.trim(value).length === 0) { return true; }
            return (!isNaN(value) && Number(value) >= 0);
        }, "");
        // "" should be replaced with error message if needed
	}

	function initRequiredValidationMessages(){
		$.validator.messages.required = function ($1, ele, $3) {
			if($(ele).hasClass('name-field')) {
				errorMessage = app.resources.INVALID_NAME;
			} else if ($(ele).hasClass('city-field')) {
				errorMessage = app.resources.INVALID_CITY;
			} else if ($(ele).hasClass('address-field')) {
				errorMessage = app.resources.INVALID_ADDRESS;
			} else if ($(ele).hasClass('phone')) {
				errorMessage = app.resources.INVALID_PHONE;
			} else if ($(ele).hasClass('email')) {
				errorMessage = app.resources.INVALID_EMAIL;
			} else if ($(ele).hasClass('cc-field')) {
				errorMessage = app.resources.INVALID_CC_NUM;
			} else if ($(ele).hasClass('state-field')) {
				errorMessage = app.resources.INVALID_STATE;
			} else if ($(ele).hasClass('zip-field')) {
				errorMessage = app.resources.INVALID_ZIP;
			} else if ($(ele).hasClass('addressid-field')) {
				errorMessage = app.resources.INVALID_ADDRESS_ID;
			} else if  ($(ele).hasClass('firstname')) {
				errorMessage = app.resources.INVALID_FIRSTNAME;
			} else if  ($(ele).hasClass('lastname')) {
				errorMessage = app.resources.INVALID_LASTNAME;
			} else {
				errorMessage = app.resources.INVALID_DEFAULT;
			}
			return errorMessage;
		};
	}

	app.validator = {
		regex : regex,
		settings : settings,
		init : function () {
			initValidator();
			$("form:not(.suppress)").validate(app.validator.settings);
			initRequiredValidationMessages();
			
		},
		initForm : function(f) {
			$(f).validate(app.validator.settings);
			initRequiredValidationMessages();
		}
	};
}(window.app = window.app || {}, jQuery));

// app.ajax
(function (app, $) {

	var currentRequests = [];
	// request cache

	// sub namespace app.ajax.* contains application specific ajax components
	app.ajax = {
		// ajax request to get json response
		// @param - async - boolean - asynchronous or not
		// @param - url - String - uri for the request
		// @param - data - name/value pair data request
		// @param - callback - function - callback function to be called
		getJson : function (options) {
			options.url = app.util.toAbsoluteUrl(options.url);
			// return if no url exists or url matches a current request
			if(!options.url || currentRequests[options.url]) {
				return;
			}

			currentRequests[options.url] = true;

			// make the server call
			$.ajax({
				dataType : "json",
				url : options.url,
				async : (typeof options.async==="undefined" || options.async===null) ? true : options.async,
				data : options.data || {}
			})
			// success
			.done(function (response) {
				if(options.callback) {
					options.callback(response);
				}
			})
			// failed
			.fail(function (xhr, textStatus) {
				if(textStatus === "parsererror") {
					window.alert(app.resources.BAD_RESPONSE);
				}
				if(options.callback) {
					options.callback(null);
				}
			})
			// executed on success or fail
			.always(function () {
				// remove current request from hash
				if(currentRequests[options.url]) {
					delete currentRequests[options.url];
				}
			});
		},
		// ajax request to load html response in a given container

		// @param - url - String - uri for the request
		// @param - data - name/value pair data request
		// @param - callback - function - callback function to be called
		// @param - target - Object - Selector or element that will receive
		// content
		load : function (options) {
			options.url = app.util.toAbsoluteUrl(options.url);
			// return if no url exists or url matches a current request
			if(!options.url || currentRequests[options.url]) {
				return;
			}

			currentRequests[options.url] = true;

			// make the server call
			$.ajax({
				dataType : "html",
				url : app.util.appendParamToURL(options.url, "format", "ajax"),
				data : options.data
			})
			.done(function (response) {
				// success
				if(options.target) {
					$(options.target).empty().html(response);
				}
				if(options.callback) {
					options.callback(response);
				}

			})
			.fail(function (xhr, textStatus) {
				// failed
				if(textStatus === "parsererror") {
					window.alert(app.resources.BAD_RESPONSE);
				}
				options.callback(null, textStatus);
			})
			.always(function () {
				app.progress.hide();
				// remove current request from hash
				if(currentRequests[options.url]) {
					delete currentRequests[options.url];
				}
			});
		}
	};
}(window.app = window.app || {}, jQuery));

// app.searchsuggest
(function (app, $) {

	var delay = 300,
		fieldDefault = null,
		$searchContainer,
		$searchForm,
		$searchField,
		$searchSubmit,
		$searchHistoryCntr,
		$suggestionResultsCntr,
		$resultsContainer = $('#suggestions');			
			
	var $cache = {
			listTotal : 0,
			listCurrent : -1,
			searchContainer : $('.header-search'),
			inputPlaceholderClosed : 'Search',
			inputPlaceholderOpen : 'Find What Speaks to You',
			searchExpanded : false
	};

	function initializeEvents() {
			// on submit we do not submit the form, but change the window location
			// in order to avoid https to http warnings in the browser - if it's not the default value and it's not empty
			$searchForm.submit(function (e) {
				e.preventDefault();
				var searchTerm = $searchField.val();
				if(searchTerm === fieldDefault || searchTerm.length === 0) {
					return false;
				}
				window.location = app.util.appendParamToURL($(this).attr("action"), "q", escape(searchTerm).split("%20").join("-"));
			});
			
			$resultsContainer.on("click", ".search-result-row", function () {
				//Submit search phrase of clicked row & clear results
				$searchField.val($(this).children(".suggestionterm").text());
				app.searchsuggest.clearResults();
				$searchForm.trigger("submit");
			});
			
			$searchField.on("click",function(){// on click listener				
				//Update list total size
				$cache.listTotal = getListTotal();
				
				if($cache.listTotal > 0)
					app.searchsuggest.showResults();
			}).on('blur', function () {// on blur listener
				setTimeout(function(){ app.searchsuggest.clearResults(); }, delay);
			}).on('keyup', function (e) {// on key up listener
				// get keyCode (window.event is for IE)
				var keyCode = e.keyCode || window.event.keyCode;

				// check and treat up and down arrows
				if(handleArrowKeys(keyCode)) {
					return;
				}
				// check for an ENTER or ESC
				if(keyCode === 13 || keyCode === 27) {
					app.searchsuggest.clearResults();
					$searchForm.submit();
					return;
				}
				
				var lastVal = $searchField.val();
				
				if(lastVal.length === 0)
					app.searchsuggest.clearResults();
				else {
					// if is text, call with delay				
					setTimeout(function () {
						app.searchsuggest.suggest(lastVal);
					}, delay);
				}
			});
	}
	
	function handleArrowKeys(keyCode) {
		
		switch (keyCode) {
			case 38:
				// keyUp
				$cache.listCurrent = ($cache.listCurrent <= 0) ? ($cache.listTotal - 1) : ($cache.listCurrent - 1);
				break;
			case 40:
				// keyDown
				$cache.listCurrent = ($cache.listCurrent >= $cache.listTotal - 1) ? 0 : $cache.listCurrent + 1;
				break;
			default:
				// reset
				$cache.listCurrent = -1;
				return false;
		}

		$resultsContainer.find('.search-result-row').removeClass("selected").eq($cache.listCurrent).addClass("selected");
		$searchField.val($resultsContainer.find(".selected div.suggestionterm").first().text());
		return true;
	}
	
	function getListTotal() {
		return $resultsContainer.find('.search-result-row').length;
	}
	
	app.searchsuggest = {

		// configuration parameters and required object instances
		init : function (container, defaultValue) {
			
			// initialize vars
			$searchContainer = $(container);
			fieldDefault = defaultValue;
			$searchForm = $searchContainer.find("form[name='simpleSearch']");
			$searchField = $searchForm.find("input[name='q']");
			$searchSubmit = $searchForm.find("input[type='submit']");
			$searchHistoryCntr = $searchContainer.find('.search-history-container');
			$suggestionResultsCntr = $searchContainer.find('.search-suggestion-container');
			
			// disable browser auto complete
			$searchField.attr("autocomplete", "off");
			
			initializeEvents();
		},
		// trigger suggest action
		suggest : function (lastValue) {
			// get the field value
			var part = $searchField.val();

			// if it's empty clear the results box and return
			if(part.length === 0) {
				app.searchsuggest.clearResults();
				return;
			}

			// if part is not equal to the value from the initiated call,
			// or the query length is longer than the last query length, return
			// #TODO: improve this to look at the query value and length
			if(lastValue !== part) {
				return;
			}

			// build the request url
			var reqUrl = app.util.appendParamToURL(app.urls.searchsuggest, "q", escape(part).split("%20").join("-"));

			// get remote data as JSON
			$.getJSON(reqUrl, function (data) {
				// get the total of results
				var suggestions = data,
					listTotal = suggestions.length;
				
				// if there are results populate the results div
				if(listTotal === 0) {
					$suggestionResultsCntr.removeClass('active');
					$suggestionResultsCntr.children().remove();
					return;
				}
				
				var html = '<div class="search-result-header">CATEGORIES</div>',
					suggestion = '';

				for(var i=0; i < listTotal; i++) {
					suggestion = suggestions[i].suggestion.toLowerCase().replace(/([^a-z]|^)([a-z])(?=[a-z]{2})/g, function(_, c1, c2){ return c1 + c2.toUpperCase(); });
					html+='<div class="search-result-row"><div class="suggestionterm">'+ suggestion +'</div><span class="hits">' + suggestions[i].hits.toUpperCase() +'</span></div>';
				}
				
				// update the results div
				$suggestionResultsCntr.html(html);
				
				//Update list total size
				$cache.listTotal = getListTotal();
				
				//Display results div after suggestions have been loaded
				if(listTotal > 0)
					app.searchsuggest.showResults();
			});
		},
		clearResults : function () {
			$suggestionResultsCntr.removeClass('active');
			$searchHistoryCntr.removeClass('active');
		},
		showResults : function () {
			$suggestionResultsCntr.addClass('active');
			$searchHistoryCntr.addClass('active');
		}
	};
}(window.app = window.app || {}, jQuery));

// app.searchplaceholder
(function (app, $) {

	function initializeEvents() {
		$('#q').focus(function () {
			var input = $(this);
			if (input.val() === input.attr("placeholder")) {
				input.val("");
			}
		})
		.blur(function () {
			var input = $(this);
			if (input.val() === "" || input.val() === input.attr("placeholder")) {
				input.val(input.attr("placeholder"));
			}
		})
		.blur();
	}

	app.searchplaceholder = {
		init : function () {
			initializeEvents();
		}
	};
}(window.app = window.app || {}, jQuery));


// app.responsive
(function (app, $) {

	$cache = {
		triggerMobileWidth : 640,
		navigation : $('#navigation'),
		body : $('body')
	}

	/*
	 * function mobileTooltips(){ $('a.tooltip').click(function(){
	 * $(this).toggleClass('active'); }); }
	 */

	function initPdp() {
		if( ( $cache.body.hasClass('mobile') ) && ( $('#pdpMain').size() !== 0 ) && ( !$('#pdpMain').hasClass('processed') ) ) {
			$('#pdpMain').addClass('processed');
			var mobileTabs = $('.product-tabs').clone();
			mobileTabs.addClass('mobile-tabs');
			$('.product-disclaimer-block').before(mobileTabs);
		}
	}

	function initCheckout() {
		if( ( $cache.body.hasClass('mobile') ) && ( $('.item-list-summary').size() !== 0 ) ) {

			var orderTable = $('.item-list-summary');
			orderTable.find('td.order-shipping-detail').each(function(){
				$(this).appendTo($(this).parent().parent());
			});
		}
	}

	function resetDom () {
		if( $cache.body.hasClass('mobile') ) {

			app.zoomViewerEnabled = false;
			app.isMobileUserAgent = true;

			initPdp();
			initCheckout();

		}
		else {

			app.zoomViewerEnabled = true;
			app.isMobileUserAgent = false;

			$cache.navigation.find('.active').removeClass('active');
			$cache.navigation.find('.block-menu').hide();
			$cache.navigation.find('#menu-category, #menu-category ul.level-2 li:first').addClass('active');
			$cache.navigation.find('.nav-close').remove();
		}

		//app.storefront.init();
	}

	function initializeEvents() {

		app.isMobileUserAgent = false;
		app.zoomViewerEnabled = true;

		// mobileTooltips();

		// check to see if we need to do anything on load
		if( $cache.body.width() < $cache.triggerMobileWidth ) {
			$cache.body.addClass('mobile');
			$cache.navigation.find('.active').removeClass('active');
			resetDom();
		}

		// set up listener for browser resize
		$(window).smartResizeListener(function(){

			// test document width
			if( $('body').width() < $cache.triggerMobileWidth ) {
				$('body').addClass('mobile');
				resetDom();
			}
			else {
				$('body').removeClass('mobile');
				resetDom();
			}

		});

	}

	app.responsive = {

		init : function () {
			initializeEvents();
		}

	};

}(window.app = window.app || {}, jQuery));
//app.Uri
(function (app, $) {
	
	function constructUrl(uri, absolute) {
		var origin = absolute ? '' : (uri.protocol+'//'+uri.hostname);
		
		if (origin && origin.slice(origin.length-1)==="/") {
			origin = origin.slice(origin.length-1);
		}
		
		if (uri.pathname.charAt(0)==="/") {
			uri.pathname = uri.pathname.slice(1);
		}
		
		if (uri.pathname.slice(uri.pathname.length-1)==="/") {
			uri.pathname = uri.pathname.slice(0, uri.pathname.length-1);
		}

		return [origin, "/", uri.pathname, uri.search||'', uri.hash||''].join('');
	}
	
	function getProtocolRelativeUrl(uri) {
		var urlSegments = uri.fullUrl.split(':');
		urlSegments.shift();

		return urlSegments.join('');
	}
	
	function Uri(o) {
		this.init(o);
	}

	Uri.prototype = {
		constructor : Uri,		
		init : function(o) {
			var loc = {};
			
			if (typeof o === "string") {
				loc = document.createElement("a");
				// IE8 requires full url
				if (o.charAt(0)!=="h") {
					o = window.location.protocol + "//" + window.location.hostname + o;
				}
				
				loc.href = o;
			}
			else if (o.href) {
				loc = o;
			}
		
			this.hash = loc.hash||'';
			this.host = loc.host||'';
			this.hostname = loc.hostname||'';
			this.href = loc.href||'';
			this.origin = loc.origin||'';
			this.pathname = loc.pathname||'';
			this.port = loc.port||'';
			this.protocol = loc.protocol||'';
			this.search = loc.search||'';

			// returns the full url, including the origin
			this.fullUrl = $(loc).prop('href');
			
			// get url without domain
			this.absoluteUrl = constructUrl(this, true);
			this.protocolRelativeUrl = getProtocolRelativeUrl(this);
		},

		// Returns key value pair representation of Uri.search string value.
		// If optional key value pairs are passed in, object properties will be
		// rebuilt to reflect change
		queryParams : function(o) {
			var params = Uri.getKeyValuePairs(this.search);
			if (!o) {
				return params;
			}

			$.extend(params, o);
			
			this.search = '?' + $.param(params);
			this.rebuild();

			return this;
		},
		rebuild : function() {
			this.init(constructUrl(this));
		},
		toHttps: function() {
			this.protocol = "https:";
			this.rebuild();
			return this;
		},
		toString : function() {
			return constructUrl(this);
		}

	};

	Uri.getUri = function(o) {
		return new Uri(o);
	};
	
	Uri.getKeyValuePairs = function(qs) {
		var params = {};
		// Use the String replace method to iterate over each name-value pair in the string.
		qs.replace( new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
					function ( $0, $1, $2, $3 ) {	params[ $1 ] = decodeURIComponent($3); }
		);
		return params;
	}
	
	app.Uri = Uri;
	
}(window.app = window.app || {}, jQuery));



//app.DropDown
(function(app, $) {
    function DropDown(el, koControlled) {
        this.dd = el;
        this.placeholder = this.dd.find('.ddLabel');
        this.opts = this.dd.find('ul.ddOptions > li');
        this.val = '';
        this.index = -1;
        this.selected = this.dd.find('ul.ddOptions li.optSelected').text();
        // Knockout controls selected classes and placeholer
        this.KOControlled = koControlled || false;
        this.initEvents();
    }

    function toggleArrow(el, dir) {
        var $icon = $(el).find("[class*='icon']");
		if(!$icon.length || $icon.hasClass('no-toggle')) { return; }

        if (dir === 'down') {
            $icon.addClass('icon-arrow-thin-down').removeClass('icon-arrow-right');
        } 
        else if (dir === 'right') {
            $icon.removeClass('icon-arrow-thin-down').addClass('icon-arrow-right');
        } 
        else {
            $icon.toggleClass('icon-arrow-thin-down').toggleClass('icon-arrow-right');
        }
    }

    DropDown.prototype = {
        initEvents: function() {
            var $cache = {
                    mobile: $('.mobile'),
                    body: $('body')
                },
                obj = this;

            function hideDropdown(e) {
                var $wrapper = $('.ddWrapper.active');

                // return if wrapper is not found
                // or the event target is ddWrapper or one of its children
                if (!$wrapper.length || $(e.target).closest('.ddWrapper').length) {
                    return;
                }

                // body clicked
                $wrapper.removeClass('active');
                toggleArrow($wrapper, 'down');
                $cache.mobile.removeClass('dd-open');
            }

            if (obj.selected && !obj.KOControlled && !obj.placeholder.hasClass('static')) {
                if(!obj.placeholder.hasClass('default') || (obj.placeholder.hasClass('default') && window.location.href.indexOf('srule') > -1)) {
                    obj.placeholder.text(obj.selected);
                }
            }

            $cache.body.off('click', hideDropdown).on('click tap', hideDropdown);

            obj.dd.on('click', function(e) {
                var $that = $(this),
                    $currActive = $('.ddWrapper.active'),
                    isTargetDDOption = $(e.target).hasClass('ddTabOption');
				
				if(isTargetDDOption) { return; }
				
                if ($currActive.length && $that[0] !== $currActive[0]) {
                    $currActive.removeClass('active');
                    toggleArrow($currActive);
                }

                $that.toggleClass('active');
                toggleArrow($that);
                $cache.mobile.toggleClass('dd-open');
                //return false;
            });

            obj.opts.on('click', function(e) {
                if (!$(this).hasClass('optDisabled')) {
                    var opt = $(this);
                    obj.val = opt.text();
                    obj.index = opt.index();
                    if (!obj.KOControlled) {
                        if (!obj.placeholder.hasClass('static')) {
                            obj.placeholder.text(obj.val);
                        }
                        obj.opts.removeClass('optSelected');
                        opt.addClass('optSelected');
                    }
                } 
                else {
                    e.stopPropagation();
                }
            });
        },

        getValue: function() {
            return this.val;
        },
        getIndex: function() {
            return this.index;
        }
    };

    app.DropDown = DropDown;

}(window.app = window.app || {}, jQuery));



// app.logouttimer
(function (app, $) {
	
	// Set timeout variables.
	var timoutWarning = app.resources.CASH_WRAP_PC_TIMEOUT || 900;
	var timeoutCountdown = 60;
	var timeoutDiff = timeoutCountdown;

	var warningTimer;
	var countdownTimer;
	var $dialog;

	function startTimers() {
	    warningTimer = setTimeout("app.logouttimer.idleWarning()", timoutWarning*1000);
	}

	function resetTimers() {
	    clearTimeout(warningTimer);
		clearInterval(countdownTimer);
	    startTimers();
	    $dialog.dialog('close');
	}

	function idleWarning() {
		if(app.customer.authenticated){
			if($dialog){
				$dialog.dialog('open');
				return;
			}
	
			$dialog = $("<div class='logout-dialog'><center>We will log you out in <span id='countdown-time'></span> seconds due to inactivity.<br/><br/><br/><button class='default button' id='logouttimer-logout'>Log Out Now</button>&nbsp;&nbsp;<button class='primary button' id='logouttimer-extend'>Stay Logged In</button></center></div>").dialog({
				modal: true,
				dialogClass : 'shippingoptionsdialog no-close',
				title : 'Shopping Session Expiring',
				open: function(event, ui){
					app.logouttimer.timeoutDiff = timeoutCountdown;
					$('#countdown-time').text(app.logouttimer.timeoutDiff);
					initializeEvents();
					countdownTimer = setInterval("app.logouttimer.updateCountdown()", 1000);
				}
		    });
		}
	}

	function idleTimeout() {
		$dialog.dialog('close');
		clearTimeout(warningTimer);
		clearInterval(countdownTimer);
	    window.location = app.urls.logoutCustomer;
	}
	
	function updateCountdown(){
		app.logouttimer.timeoutDiff -= 1;
		if(app.logouttimer.timeoutDiff < 1){
			app.logouttimer.idleTimeout();
			return;
		}
		$('#countdown-time').text(app.logouttimer.timeoutDiff);
	}
	
	function initializeEvents(){
		$('.logout-dialog').on('click', '#logouttimer-extend', function(event) {
			resetTimers();
		});
		$('.logout-dialog').on('click', '#logouttimer-logout', function(event) {
			idleTimeout();
		});
	}

	app.logouttimer = {
		init : function () {
			if(!app.customer.authenticated){ return; }
			startTimers();
		},
		idleWarning: idleWarning,
		idleTimeout: idleTimeout,
		updateCountdown: updateCountdown,
		timeoutDiff: timeoutDiff
	};
}(window.app = window.app || {}, jQuery));


// jquery extensions
(function ($) {
	// params
	// toggleClass - required
	// triggerSelector - optional. the selector for the element that triggers
	// the event handler. defaults to the child elements of the list.
	// eventName - optional. defaults to 'click'
	$.fn.toggledList = function (options) {
		if (!options.toggleClass) { return this; }

		var list = this;
		function handleToggle(e) {
			e.preventDefault();
			var classTarget = options.triggerSelector ? $(this).parent() : $(this);
			classTarget.toggleClass(options.toggleClass);
			// execute callback if exists
			if (options.callback) { options.callback(); }
		}

		return list.on(options.eventName || "click", options.triggerSelector || list.children(), handleToggle);
	};

	$.fn.syncHeight = function () {
		function sortHeight(a, b) {
			return $(a).height() - $(b).height();
		}

		var arr = $.makeArray(this);
		arr.sort(sortHeight);
		return this.height($(arr[arr.length-1]).height());
	};

	  $.fn.setCursorPosition = function(pos) {
			if ($(this).get(0).setSelectionRange) {
			  $(this).get(0).setSelectionRange(pos, pos);
			} else if ($(this).get(0).createTextRange) {
			  var range = $(this).get(0).createTextRange();
			  range.collapse(true);
			  range.moveEnd('character', pos);
			  range.moveStart('character', pos);
			  range.select();
			}
		  };

	   $.fn.smartResizeListener = function(fn) {

			  var debounce = function (func, threshold, execAsap) {
				  var timeout;

				  return function debounced () {
					  var obj = this, args = arguments;
					  function delayed () {
						  if (!execAsap)
							  func.apply(obj, args);
						  timeout = null;
					  };

					  if (timeout)
						  clearTimeout(timeout);
					  else if (execAsap)
						  func.apply(obj, args);

					  timeout = setTimeout(delayed, threshold || 300);
				  };
			  }

			  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	   };

	   $.fn.smartScrollListener = function(fn) {

		   var debounce = function (func, threshold, execAsap) {
			   var timeout;

			   return function debounced () {
				   var obj = this, args = arguments;
				   function delayed () {
					   if (!execAsap)
						   func.apply(obj, args);
					   timeout = null;
				   };

				   if (timeout)
					   clearTimeout(timeout);
				   else if (execAsap)
					   func.apply(obj, args);

				   timeout = setTimeout(delayed, threshold || 300);
			   };
		   }

		 	return fn ? this.bind('scroll', debounce(fn)) : this.trigger(sr);

	   };
	   
	   $.fn.serializeObject = function()
	   {
	       var o = {};
	       var a = this.serializeArray();
	       $.each(a, function() {
	           if (o[this.name] !== undefined) {
	               if (!o[this.name].push) {
	                   o[this.name] = [o[this.name]];
	               }
	               o[this.name].push(this.value || '');
	           } else {
	               o[this.name] = this.value || '';
	           }
	       });
	       return o;
	   };

}(jQuery));

// general extension functions
(function () {

	String.format = function() {
		var s = arguments[0];
		var i,len=arguments.length - 1;
		for (i = 0; i < len; i++) {
			var reg = new RegExp("\\{" + i + "\\}", "gm");
			s = s.replace(reg, arguments[i + 1]);
		}
		return s;
	};
	

		
	String.objectFormat = function(s, o) {
		var fs = s;
		
		if (empty(s) || empty(o)) { return s; }
		
		for (var p in o) {
			if (o.hasOwnProperty(p)) {
				var reg = new RegExp("\\{" + p + "\\}", "gm"); 
				fs = fs.replace(reg, o[p]);
			}
		}
		return fs;
	};

})();

// initialize app
$(document).ready(function () {
	app.init();
});

jQuery(function() {
	jQuery.support.placeholder = ('placeholder' in document.createElement('input'));
});

// set the value of e.which reguardless of browser.
function defineWhich(e){
	if (!e.which && ((e.charCode || e.charCode === 0) ? e.charCode: e.keyCode)) {
		e.which = e.charCode || e.keyCode;
	}
	return e;
}

(function($) {
	$.fn.goTo = function() {
		$('html, body').animate({
			scrollTop: $(this).offset().top + 'px'
		}, 'fast');
		return this; // for chaining...
	}
})(jQuery);

// Detect orientation change to draw certain elements
$(window).on('orientationchange', function() {
	// Redraw dialog boxes
	setTimeout(function() {
		$('body').hide().show(0);
	}, 500);
});

// polyfills
(function(){
	// String.contains()
	if(!('contains' in String.prototype)) {
		String.prototype.contains = function(str, startIndex) { return -1 !== String.prototype.indexOf.call(this, str, startIndex); };
	}
	// String.trim()
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	if (!String.prototype.trim) {
		String.prototype.trim = function () {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}
	// indexOf for IE8
	if (!Array.prototype.indexOf)
	{
	  Array.prototype.indexOf = function(elt /*, from*/)
	  {
	    var len = this.length >>> 0;

	    var from = Number(arguments[1]) || 0;
	    from = (from < 0)
	         ? Math.ceil(from)
	         : Math.floor(from);
	    if (from < 0)
	      from += len;

	    for (; from < len; from++)
	    {
	      if (from in this &&
	          this[from] === elt)
	        return from;
	    }
	    return -1;
	  };
	}
}());

/**
 * Get location data using HTML5 geolocation and a reverse geocode service.
 * It will return a promise due to asynchronous operations. The promise will
 * resolve with location data if it is successful. Otherwise it will fail.
 * (likely due to failure to get geolocation data or call the geocode service)
 * @return {Promise} A jQuery promise where success will return an object
 *                   with location data, including latitude and longitude.
 */
function getLocationData(forceLatLng) {  
  // Use promises to handle asynchronous operations
  var deferred = $.Deferred();

  // Check if geolocation is supported
  if(!window.navigator || !('geolocation' in navigator)) {
	deferred.reject('Geolocation is unsupported');
	return deferred.promise();
  }

  // Get current position with HTML5 geolocation
  navigator.geolocation.getCurrentPosition(function(position) {
    var data = {};
    data.lat = position.coords.latitude;
    data.lng = position.coords.longitude;
	data.forceLatLng = forceLatLng;

    // If we successfully get geolocation data, call API for reverse geocoding.
    // If that call is successful, promise will return location data, including
    // latitude and longitude.
    $.ajax({
    	url: app.urls.getZipCode,
    	data: data,
    	async: true,
    	success: function(data) {
			deferred.resolve(data);
    	},
		fail: function(){
			deferred.reject('Unable to call API for reverse geocoding');
		}
    });
    
  },
  // HTML5 geolocation request failed
  function() {
	  deferred.reject('Unable to get geolocation data');
  },
  // Geolocation parameters
  {
	  timeout: 5000,
	  maximumAge: 60000
  });
  
  return deferred.promise();
}

// Call to action jQuery plugin
$(function() {
	$.fn.callToAction = function(params) {
		var self = this;
		
		if(params === "busy"){
			$(self).addClass('btn-progress').prop("disabled", true).attr('is-busy', 'true');
		}
		
		if(params === "success"){
			$(self).prop('disabled', false).removeAttr('is-busy', '').attr('is-successful', 'true');
			setTimeout(function(){
				$(self).removeAttr('is-successful', '').removeClass('btn-progress');
			}, 1000);
		}
		
		if(params === "fail"){
			$(self).prop('disabled', false).removeAttr('is-busy', '').attr('is-fail', 'true');
			setTimeout(function(){
				$(self).removeAttr('is-fail', '').removeClass('btn-progress');
			}, 1000);
		}
	};
});

// app.omniture
(function (app, $) {
	var omniObj = { action: '', data: '', customEvents : '' };
	
	function getOmniObj(){ return omniObj; }
	function setOmniObj(str, data, events){ omniObj = { action: str || '', data: data || '', customEvents : events || '' }; }
	function appendEvents(events){
		if(!omniObj.customEvents) {
			omniObj.customEvents = {events : events};
		}
		else {
			omniObj.customEvents = {events : omniObj.customEvents.events  + ',' + events};
		}
	}
	
	function appendData(data) {
		if(!omniObj.data) {
			omniObj.data = data;
		} else {
			$.extend(omniObj.data, data);
		}
	}
	
	function clearOmniObj() { omniObj = { action: '', data: '', customEvents : '' }; }
	
	function fireOmnitureEvent(action, data) {
		action = formatActions(action);
		appendData(data);
		setOmniObj(action, omniObj.data, omniObj.customEvents);
		$.event.trigger({ type: 'fireOmnitureEvent' });
		clearOmniObj();
	}
	
	function formatActions(action) {
		if(action instanceof Array) {
			return action;
		} else {
			return [action.toString()];
		}
	}
		
	app.omniture = {
		fireOmnitureEvent: fireOmnitureEvent,
		getOmniObj: getOmniObj,
		clearOmniObj: clearOmniObj,
		setOmniObj : setOmniObj,
		appendEvents : appendEvents,
		appendData : appendData
	};
}(window.app = window.app || {}, jQuery));

