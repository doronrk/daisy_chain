/**
 *
 * All java script logic for the application.
 *    (c) 2009-2012 Demandware Inc.
 *    Subject to standard usage terms and conditions
 * The code relies on the jQuery JS library to
 * be also loaded.
 *    For all details and documentation:
 *    https://github.com/Demandware/Site-Genesis
 */
// semi-colon to assure functionality upon script concatenation and minification
;

// if jQuery has not been loaded, load from google cdn
if (!window.jQuery) {
	var s = document.createElement('script');
	s.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
	s.setAttribute('type', 'text/javascript');
	document.getElementsByTagName('head')[0].appendChild(s);
}
/** @namespace */
var app = (function (app, $) {
	//allows the use of $ within this function without conflicting with other JavaScript libraries which are using it (JQuery extension)
	document.cookie="dw=1";
	/******** private functions & vars **********/

	/**
	 * @private
	 * @function
	 * @description Cache dom elements which are being accessed multiple times.<br/>app.ui holds globally available elements.
	 */
	function initUiCache() {
		app.ui = {
			searchContainer : $("#navigation .header-search"),
			searchCon	    : $(".pt_storefront #main .header-search-nav"),
			printPage		: $("a.print-page"),
			reviewsContainer: $("#pwrwritediv"),
			main			: $("#main"),
			primary			: $("#primary"),
			secondary		: $("#secondary"),
			// elements found in content slots
			slots : {
				subscribeEmail : $(".subscribe-email")
			}
		};
	}
	
	// for logging errors semi-silently
	if (typeof console === "undefined" || typeof console.error === "undefined") {
		app.consoleLog = function(msg) { return; }; // fallback for IE8 and older
	} else {
		app.consoleLog = function(msg) { console.error(msg); };
	}

	/**
	 * @private
	 * @function
	 * @description Apply dialogify event handler to all elements that match one or more of the specified selectors.
	 */
	function initializeEvents() {
		var controlKeys = ["8", "13", "46", "45", "36", "35", "38", "37", "40", "39"];

		$("body").on("click", ".dialogify, [data-dlg-options], [data-dlg-action]", app.util.setDialogify)
		.on("keydown", "textarea[data-character-limit]", function(e) {
			var text = $.trim($(this).val()),
				charsLimit = $(this).data("character-limit"),
				charsUsed = text.length;

				if ((charsUsed >= charsLimit) && (controlKeys.indexOf(e.which.toString()) < 0)) {
					e.preventDefault();
				}
		})
		.on("change keyup mouseup", "textarea[data-character-limit]", function(e) {
			var text = $.trim($(this).val()),
				charsLimit = $(this).data("character-limit"),
				charsUsed = text.length,
				charsRemain = charsLimit - charsUsed;

			if(charsRemain < 0) {
				$(this).val( text.slice(0, charsRemain) );
				charsRemain = 0;
			}

			$(this).next('div.char-count').find('.char-remain-count').html(charsRemain);
		});


		/**
		 * initialize search suggestions, pending the value of the site preference(enhancedSearchSuggestions)
		 * this will either init the legacy(false) or the beta versions(true) of the the search suggest feature.
		 * */
		if(app.clientcache.LISTING_SEARCHSUGGEST_LEGACY){
			app.searchsuggestbeta.init(app.ui.searchContainer, app.ui.searchCon, app.resources.SIMPLE_SEARCH);
		}else{
			app.searchsuggest.init(app.ui.searchContainer, app.resources.SIMPLE_SEARCH);
		}
		
		// print handler
		app.ui.printPage.on("click", function () { window.print(); return false; });


		// add show/hide navigation elements
		$('.secondary-navigation .toggle').click(function(){
			$(this).toggleClass('expanded').next('ul').toggle();
		});

		// add generic toggle functionality
		$('.toggle').next('.toggle-content').hide();
		$('.toggle').click(function(){
			$(this).toggleClass('expanded').next('.toggle-content').toggle();
		});
		
		$('.refinement .toggle').next('.toggle-content').show();
		
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
	}
	/**
	 * @private
	 * @function
	 * @description Adds class ('js') to html for css targeting and loads js specific styles.
	 */
	function initializeDom() {
		// add class to html for css targeting
		$('html').addClass('js');
		if (app.clientcache.LISTING_INFINITE_SCROLL){
			$('html').addClass('infinite-scroll');
		}
		// load js specific styles
		app.util.limitCharacters();
	}


	/**
	 * @property {Object} _app "inherits" app object via $.extend() at the end of this seaf (Self-Executing Anonymous Function)
	 */
	var _app = {
		containerId		: "content",
		ProductCache	: null,  // app.Product object ref to the current/main product
		ProductDetail	: null,
		clearDivHtml	: '<div class="clear"></div>',
		currencyCodes	: app.currencyCodes || {}, // holds currency code/symbol for the site
		
		/**
		 * @name init
		 * @function
		 * @description Master page initialization routine
		 */
		init: function () {

			if (document.cookie.length===0) {
				$("<div/>").addClass("browser-compatibility-alert").append($("<p/>").addClass("browser-error").html(app.resources.COOKIES_DISABLED)).appendTo("#browser-check");
			}
			
			//load in jQueryUI library
			app.util.checkScriptLoaded(app.scripts.jQueryUI, function(){
				// init global cache
				initUiCache();
	
				// init global dom elements
				initializeDom();
	
				// init global events
				initializeEvents();
	
				// init specific global components
				app.tooltips.init();
				app.minicart.init();
				app.validator.init();
				app.components.init();
				app.searchplaceholder.init();
				app.headerevents.init();
				app.responsive.init();		
				app.storelocatorvisual.init();
				app.selectboxes.init();
					
				// set up listener so we can update DOM if page grows/shrinks, only on bigger platforms
				if(screen.width > 767){
					$(window).smartresize(function(){
						if( jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth   ) {
							app.responsive.enableMobileNav();
							app.headerevents.destroy();		
						}
						else {
							app.responsive.disableMobileNav();
							app.headerevents.init();
						}
					});
				}
					var windoww=$(window).width();
					if(windoww < 641) {
						app.responsive.footerAccordion();
						}	
					$(window).resize(function() {
						var windowr=$(window).width();
						if(windowr < 641) {
								app.responsive.footerAccordion();
							}
						else {
							if($("#footer-accordion").hasClass('ui-accordion')) {
								app.responsive.footerAccordionDestroy();
								}
					 		}
					 	});
				
				// execute page specific initializations
				var ns = app.page.ns;
				if (ns && app[ns] && app[ns].init) {
					app[ns].init();
					//load in content initialization scripts
					app.util.checkScriptLoaded(app.scripts.content, function(){
						//load in responsive slot scripts
						app.util.checkScriptLoaded(app.scripts.slotRespond, function(){
							// execute page content specific initializations
							if (ns && app.content[ns] && app.content[ns].init) {
								app.content[ns].init();
							}
						});
					});
				}
			});
		}
	};

	return $.extend(app, _app);
}(window.app = window.app || {}, jQuery));

/**
@class app.storefront
*/
(function (app, $) {
	var $cache = {};
	app.storefront = {
		init : function () {
			$cache = {
				slide : $('.slide'),
				slider : $('#homepage-slider'),
				wrapper : $('#wrapper')
			};

			/**
			 * @function
			 * @description Triggers the scroll event on a carousel element
			 * @param {Object} carousel
			 */
			function slideCarousel_initCallback(carousel) {

				// create navigation for slideshow
				var numSlides = $('#homepage-slider li').size();
				var slideShowNav = '<div class="jcarousel-control">';
				for( i=1; i <= numSlides; i++) {
					slideShowNav = slideShowNav + '<a href="#" class="link-'+i+'">' + i + '</a>';
				}
				slideShowNav = slideShowNav + '</div>';
				$('#homepage-slider .jcarousel-clip').append(slideShowNav);

			   $('.jcarousel-control a').bind('click', function() {
			        carousel.scroll(jQuery.jcarousel.intval($(this).text()));
			        return false;
			    });

			   $cache.slide.width($cache.wrapper.width());

			}
			/**
			 * @function
			 * @description Activates the visibility of the next element in the carousel
			 * @param {Object} carousel -- necessity needs TBD!
			 * @param {Object} item --  necessity needs TBD!
			 * @param {Number} idx Index of the item which should be activated
			 * @param {Object} state --  necessity needs TBD!
			 */
			function slideCarousel_itemVisible(carousel, item, idx, state) {
			    //alert('Item #' + idx + ' is visible');
				$('.jcarousel-control a').removeClass('active');
				$('.jcarousel-control').find('.link-'+idx).addClass('active');
			}
			app.util.checkScriptLoaded(app.scripts.carousel, function(){
				$cache.slider.jcarousel({
					scroll: 1,
					auto: 4,
					buttonNextHTML: null,
					buttonPrevHTML: null,
					itemFallbackDimension: '100%',
					initCallback: slideCarousel_initCallback,
					itemFirstInCallback: slideCarousel_itemVisible
				});
			});
		}
	};

}(window.app = window.app || {}, jQuery));


/**
@class app.headerevents
*/
(function (app, $) {
	var $cache = {};
	app.headerevents = {
		/**
		 * @function
		 * @description Initializes header events
		 */
		init : function () {
			$cache = {
				help : $('#header-help'),
				login : $('#header-login'),
				headermessage : $('#header-message')
			};

			 $cache.help.on({
                mouseenter: function() {
                    $cache.help.find('ul.help-expanded').stop(true, true).slideDown(200);
                },
                mouseleave: function() {
                    $cache.help.find('ul.help-expanded').stop(true, true).slideUp(200);
			    }
             });
			 
            $cache.headermessage.find('.centrated').bind("click", function () {
                app.ajax.load({url:app.urls.sessionMessage});
            });
            $cache.headermessage.find('.close-global').bind("click", function () {
                app.ajax.load({url:app.urls.sessionMessage});
                $(this).hide();
                $cache.headermessage.slideUp();
            });


            $cache.login.on({
                mouseenter: function() {
                    var loginElWidth = $(this).innerWidth();
                    if($('#header-login .menu-utility-user li.login-strip a').hasClass('user-login')) {
                        $cache.login.find('.login-flyout').width(loginElWidth-1);
                    } else {
                        $cache.login.find('.login-flyout').width(loginElWidth);

                    }
                    if ($.browser.msie) {
                        $cache.login.find('.login-flyout').width(loginElWidth);
                    }
                    $cache.login.find('.login-flyout').stop(true, true).slideDown(200);
                },
                mouseleave: function() {
                    $cache.login.find('.login-flyout').stop(true, true).slideUp(200);
                }
            });

		},
		destroy : function () {
			$cache = {
				help : $('#header-help'),
				login : $('#header-login'),
				headermessage : $('#header-message')
			};
			$cache.help.off();
			$cache.login.off();
		}
	};

}(window.app = window.app || {}, jQuery));

/**
@class app.storelocatorvisual
*/
(function (app, $) {
	var $cache = {
		accordion : $('#accordion-stores'),
		listmap   : $('#list-map-view')
	};
	app.storelocatorvisual = {
		/**
		 * @function
		 * @description Initializes
		 */
		init : function () {
			$cache.accordion.accordion({
			    collapsible:true,
			    heightStyle:"content",
			    active:false,
			    icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" },
			
			    beforeActivate: function(event, ui) {
			         // The accordion believes a panel is being opened
			        if (ui.newHeader[0]) {
			            var currHeader  = ui.newHeader;
			            var currContent = currHeader.next('.ui-accordion-content');
			         // The accordion believes a panel is being closed
			        } else {
			            var currHeader  = ui.oldHeader;
			            var currContent = currHeader.next('.ui-accordion-content');
			        }
			         // Since we've changed the default behavior, this detects the actual status
			        var isPanelSelected = currHeader.attr('aria-selected') == 'true';
			
			         // Toggle the panel's header
			        currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));
			
			        // Toggle the panel's icon
			        currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);
			
			         // Toggle the panel's content
			        currContent.toggleClass('accordion-content-active',!isPanelSelected)    
			        if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }
			
			        return false; // Cancel the default action
			    }
			});
			$cache.listmap.children('div').on('click', function(){
				$(this).hide().siblings().show();
				if ($(this).hasClass("map")) {
					$('#rightcolumn').show();
					$('#stores').hide();
				};
				if ($(this).hasClass("list")) {
					$('#rightcolumn').hide();
					$('#stores').show();
				}
			});
		}
	};

}(window.app = window.app || {}, jQuery));


/**
 @class app.customer
 */
(function (app, $) {

    app.customer = {
        /**
         * @function
         * @description made store preferred for customer
         */
        makeStorePreferred : function (storeId, setStoreUrl) {
            var locationTmp = null;
            var lastClickedId = null;

            // prevent "multi clicking" to increase speed
            if(lastClickedId == storeId){
                return 0;
            }else{
                lastClickedId = storeId;
            }

            //redraw!
            //reset all the buttons to correct layout
            var prevStore = window.localStore;
            if(prevStore!=null){
                $('#store-active-'+prevStore).hide().find('.thisPreferred').hide();
                $('#store-inactive-'+prevStore).show().find('.makePreferred').show();
            }

            $('#store-inactive-'+storeId).hide().find('.makePreferred').hide();
            $('#store-active-'+storeId).show().find('.thisPreferred').show();


            window.localStore = storeId;
            $.ajax({async: false,
                url: setStoreUrl,
                data: {storeID: storeId},
                dataType : "json",
                success: function(d){
                    if(window.universal_variable.store == undefined){
                        window.universal_variable.store = {};
                    }
                    if(d.oldStoreId!="" && d.oldStoreId!=null){
                        window.universal_variable.store.oldStoreID = d.oldStoreId;
                    }

                    window.universal_variable.store.storeID = d.storeId;
                }
            });
        }
    };

}(window.app = window.app || {}, jQuery));


/**
@class app.tooltip
*/
(function (app, $) {
	var $cache = {};
	app.tooltips = {
		/**
		 * @function
		 * @description Initializes the tooltip-content and layout
		 */
		init : function () {
			var tooltipOptions = {
				track: true,
				showURL: false,
			    bodyHandler: function() {
					// add a data attribute of data-layout="some-class" to your tooltip-content container if you want a custom class
					var tooltipClass = "";
					if( tooltipClass = $(this).find('.tooltip-content').data("layout") ) {
						tooltipClass = " class='" + tooltipClass + "' ";
					}
		        	return "<div " + tooltipClass + ">" + $(this).find('.tooltip-content').html() + "</div>";
				},
				showURL: false
			};
			
			app.util.checkScriptLoaded(app.scripts.tooltip, function(){
				$('.tooltip').tooltip(tooltipOptions);
			});
		}
	};

}(window.app = window.app || {}, jQuery));


/**
@class app.selectboxes
*/
(function (app, $) {
	var $cache = {};
	app.selectboxes = {
		/**
		 * @function
		 * @description Initializes the tooltip-content and layout
		 */
		init : function () {
			
			app.util.checkScriptLoaded(app.scripts.selectbox, function(){
				$('#grid-sort-header, #grid-paging-header, #grid-paging-footer, #grid-sort-footer, #grid-sort-ref, .product-select, .pr-review-sort-box select, .bonus-product select.quantity, #bonus-product-list select.quantity, .product-option.input-select').selectbox();
				
			});
		}
	};

}(window.app = window.app || {}, jQuery));

/**
@class app.checkboxes
*/
(function (app, $) {
	var $cache = {};
	app.checkboxes = {
		/**
		 * @function
		 * @description Initializes the tooltip-content and layout
		 */
		init : function () {
			
			app.util.checkScriptLoaded(app.scripts.checkbox, function(){
				$('.input-checkbox').checkbox();
				
			});
		}
	};
}(window.app = window.app || {}, jQuery));	
/**
@class app.radio
*/
(function (app, $) {
	var $cache = {};
	app.radio = {
		/**
		 * @function
		 * @description Initializes the tooltip-content and layout
		 */
		init : function () {
			
			app.util.checkScriptLoaded(app.scripts.radio, function(){
				$('.input-radio, .input-radio-sts, .pr-error input').radio();				
			});
		}
	};

}(window.app = window.app || {}, jQuery));

/**
 @class app.product
 */
(function (app, $) {
	var $cache;

	/*************** app.product private vars and functions ***************/

	/**
	 * @private
	 * @function
	 * @description Loads product's navigation on the product detail page
	 */
	function loadProductNavigation() {
		var pidInput = $cache.pdpForm.find("input[name='pid']").last();
		var navContainer = $("#product-nav-container");
		// if no hash exists, or no pid exists, or nav container does not exist, return
		if (window.location.hash.length <= 1 || pidInput.length===0 || navContainer.length===0) {
			return;
		}

		var pid = pidInput.val();
		var hashParams = window.location.hash.substr(1);
		if (hashParams.indexOf("pid="+pid) < 0) {
			hashParams+="&pid="+pid;
		}

		var url = app.urls.productNav+(app.urls.productNav.indexOf("?") < 0 ? "?" : "&")+hashParams;
		app.ajax.load({url:url, target: navContainer});
	}

	
	/**
	 * @function
	 * @description Sets the main image attributes and the href for the surrounding <a> tag
	 * @param {Object} atts Simple object with url, alt, title and hires properties
	 */
	function setMainImage(atts) {
		var imgZoom = $("a.main-image");
		if (imgZoom.length>0 && atts.hires && atts.hires!='' && atts.hires!='null') {
			imgZoom.attr("href", atts.hires);
		}

		imgZoom.find("img.primary-image").attr({
			"src" : atts.url,
			"alt" : atts.alt,
			"title" : atts.title
		});
	}

	/**
	 * @function
	 * @description helper function for swapping main image on swatch hover
	 * @param {Element} element DOM element with custom data-lgimg attribute
	 */
	function swapImage(element) {
		var lgImg = $(element).data("lgimg");
        if (lgImg) {
			var newImg = $.extend({}, lgImg);
			var imgZoom = $cache.pdpMain.find("a.main-image");
			var mainImage = imgZoom.find("img.primary-image");
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
	}


	/**
	 * @function
	 * @description Enables the zoom viewer on the product detail page
	 */
	function loadZoom() {
		if(app.quickView.isActive() || !app.zoomViewerEnabled) { return; }

		// Added to prevent empty hires zoom feature (if images don't exist)
		var mainImage = $("a.main-image");
		var hiresImageSrc = mainImage.attr("href");
		if( hiresImageSrc && hiresImageSrc != '' && hiresImageSrc.indexOf('noimagelarge')<0 ) { return; }

		//zoom properties
		var options = {
			zoomType: 'standard',
			alwaysOn : 0, // setting to 1 will load load high res images on page load
			zoomWidth : 575,
			zoomHeight : 349,
			position:'right',
			preloadImages: 0, // setting to 1 will load load high res images on page load
			xOffset: 30,
			yOffset:0,
			showEffect : 'fadein',
			hideEffect: 'fadeout'
		};
		app.util.checkScriptLoaded(app.scripts.zoom, function(){
			mainImage.removeData("jqzoom").jqzoom(options);
		});
	}
	/**
	 * @function
	 * @description replaces the images in the image container. for example when a different color was clicked.
	 */
	function replaceImages() {
		var newImages = $("#update-images");
		var imageContainer = $cache.pdpMain.find("div.product-image-container");

		imageContainer.html(newImages.html());
		newImages.remove();
		setMainImageLink();

		//loadZoom();
	}
	/**
	 * @function
	 * @description Adds css class (image-zoom) to the main product image in order to activate the zoom viewer on the product detail page.
	 */
	function setMainImageLink() {
		if (app.quickView.isActive() || app.isMobileUserAgent) {
			$("a.main-image").removeAttr("href");
		}
		else {
			$("a.main-image").addClass("image-zoom");
		}
	}
	/**
	 * @function
	 * @description Removes css class (image-zoom) from the main product image in order to deactivate the zoom viewer on the product detail page.
	 */
	function removeImageZoom() {
		$cache.pdpMain.find("a.main-image").removeClass("image-zoom");
	}

	/**
	 * @private
	 * @function
	 * @description Initializes the DOM of the product detail page (images, reviews, recommendation and product-navigation).
	 */
	function clickonPDP(element){
		var tab_id = $(element).attr('data-tab');
		$('ul.tabs-menu li').removeClass('current');
        $('.tab-content').removeClass('current');
        $(element).addClass('current');
        $("#"+tab_id).addClass('current');
	}
	function initializeDom() {
		
		
		$cache.pdpMain.find('div.product-detail .accordion-tabs').accordion({
			    collapsible:true,
			    heightStyle:"content",
			    active:false,
			    icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" },
			    beforeActivate: function(event, ui) {
			        if (ui.newHeader[0]) {
			            var currHeader  = ui.newHeader;
			            var currContent = currHeader.next('.ui-accordion-content');
			        } else {
			            var currHeader  = ui.oldHeader;
			            var currContent = currHeader.next('.ui-accordion-content');
			        }
			        var isPanelSelected = currHeader.attr('aria-selected') == 'true';
			        currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));
			        currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);
			        currContent.toggleClass('accordion-content-active',!isPanelSelected)    
			        if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }
			
			        return false;
			    }
			});
		
		if($('#pwrwritediv').length > 0) {
			var options = $.extend(true, {}, app.dialog.settings, {
				autoOpen : true,
				height : 750,
				width : 650,
				dialogClass : 'writereview',
				title : 'Product Review',
				resizable : false
			});

			app.dialog.create({
				target : app.ui.reviewsContainer,
				options : options
			});
		}

		app.util.loadRecommendations();
		loadProductNavigation();
		setMainImageLink();
		

		if ($cache.productSetList.length>0) {
			var unavailable = $cache.productSetList.find("form").find("button.add-to-cart[disabled]");
			if (unavailable.length > 0) {
				$cache.addAllToCart.attr("disabled", "disabled");
				$cache.addToCart.attr("disabled", "disabled"); // this may be a bundle

			}
		}
        if (/*@cc_on !@*/false && (document.documentMode === 9)){
            $(document).on("click", ".see-more-btn a", function (e) {
                if ($(this).hasClass('open')){
                    $('.see-more-colors ul').hide();
                    $(this).removeClass('open');
                }
                else{
                    $('.see-more-colors ul').show();
                    $(this).addClass('open');
                    $('.product-variations ul.swatches li:nth-child(3n)').addClass('third');
                    $('.product-variations ul.swatches li:nth-child(4n)').addClass('fourth');
                    $('.product-variations ul.swatches li:nth-child(5n)').addClass('fifth');
                }

            });
        } else {
            $cache.pdpMain.on("click", ".see-more-btn a", function (e) {
                if ($(this).hasClass('open')){
                    $('.see-more-colors ul').hide();
                    $(this).removeClass('open');
                }
                else{
                    $('.see-more-colors ul').show();
                    $(this).addClass('open');
                    $('.product-variations ul.swatches li:nth-child(3n)').addClass('third');
                    $('.product-variations ul.swatches li:nth-child(4n)').addClass('fourth');
                    $('.product-variations ul.swatches li:nth-child(5n)').addClass('fifth');
                }

            });
        }
        $cache.promo25ship.click( function (e) {
			e.preventDefault();
            var dlg = app.dialog.create({target: $("#popup-dialog"), options: {
                width: 570,
                height: 'auto',
                title: "Promo",
            }});
		
		
           
            var url = app.util.appendParamToURL(app.urls.promoPopup, 'promoID', $(this).attr('name'));
            
            app.ajax.load({
            	
                url: app.util.ajaxUrl(url),
                target: dlg,
                callback: function () {
                    dlg.dialog("open"); 
                }
            });
        });
        
		$cache.pdpMain.on("click", ".pricing-popup-details", function (e) {
			e.preventDefault();
            var dlg = app.dialog.create({target: $("#pricing-popup"), options: {
                width: 570,
                height: 'auto',
                title: "Pricing",
            }});
            dlg.dialog("open");
		});
		$cache.pdpMain.on("click", ".map-sale-link", function (e) {
			e.preventDefault();
            var dlg = app.dialog.create({target: $("#map-details"), options: {
                width: 570,
                height: 'auto',
                title: "Map details",
            }});
            dlg.dialog("open");
		});
		$("#carousel-recomendations li").each(function(){
			$(this).find('.product-tile').removeClass('tooltip');
		})
		app.tooltips.init();
		app.selectboxes.init();
		app.util.checkScriptLoaded(app.scripts.carousel, function(){
			app.util.checkScriptLoaded(app.scripts.swipe, function(){	
		
		setTimeout(function(){
			$('#items_wrap').appendTo($('.jcarousel-cart-new'));
			if ($('.jcarousel-cart-new').text().length > 0) {
			    $('.jcarousel-control-next').css('height', '29px');
			    $('.jcarousel-cart').css('height', '350px');
			    $('.cart-recomendation-left').css('height', '350px');
			    $('.labelSale').css('display', 'none');
			    $('.cart-recomendation-left-mobile').css('height', '81px');
			  }
			var jcarousel2 = $('.jcarousel-cart-new');
			jcarousel2
            		.on('jcarousel:reload jcarousel:create', function () {
            				var width = jcarousel2.innerWidth();
            				if (width >= 600) {
            					width = width / 3;
                    		} else if (width >= 287) {
                    			width = width / 2;
                    		}
            				jcarousel2.jcarousel('items').css('width', width + 'px');
            		})
            .swipe({
		        swipeLeft: function(event, direction, distance, duration, fingerCount) {   
		        	jcarousel2.jcarousel('scroll', '+=1');
		        },
		        swipeRight: function(event, direction, distance, duration, fingerCount) {
		        	jcarousel2.jcarousel('scroll', '-=1');
		        },
		        triggerOnTouchEnd:false,
		        threshold:5
		     })
            .jcarousel({
            		wrap: 'circular',
            		vertical: false
            		
            	});
				
				}, 500);
			var jcarouselImagesSize = $('.jcarousel-images li').size();
			if(jcarouselImagesSize > 1) {
				var jcarousel4 = $('.jcarousel-images');
				jcarousel4
					.swipe({
						swipeLeft: function(event, direction, distance, duration, fingerCount) {   
							jcarousel4.jcarousel('scroll', '+=1');
						},
					swipeRight: function(event, direction, distance, duration, fingerCount) {
						jcarousel4.jcarousel('scroll', '-=1');
						},
						triggerOnTouchEnd:false,
						threshold:5
					})
					.jcarousel({
						wrap: 'circular',
						vertical: false
					});
				var jcarousel4 = $('.jcarousel-images');
				$('.jcarousel-pagination-new')
					.on('jcarouselpagination:active', 'a', function() {
						$(this).addClass('active');
					})
					.on('jcarouselpagination:inactive', 'a', function() {
						$(this).removeClass('active');
					})
					.on('click', function(e) {
						e.preventDefault();
					})
					.jcarouselPagination({
						item: function(page) {
							return '<a href="#' + page + '">' + page + '</a>';
						},
						carousel: jcarousel4
					});
				}
			});
		
		});
		$('ul.tabs-menu li').click(function(){
	        var tab_id = $(this).attr('data-tab');
	        $('ul.tabs-menu li').removeClass('current');
	        $('.tab-content').removeClass('current');
	        $(this).addClass('current');
	        $("#"+tab_id).addClass('current');
	        
	    });
		
		
		
		if($('.promotion-callout div').children().length == 0) {
			$('.promotion-top').css('display', 'none');
		}
		
		var windoww=$(window).width();
		 if(windoww < 641) {
			 $(".pr-review-engine").appendTo(".pdp-reviews-tab-mobile");
			 $(".pr-snippet-read-reviews a").addClass('mobile-read-review');
			 $(".mobile-read-review").off('click').on('click', function(e){
					e.preventDefault();
					$('.pdp-reviews-tab-mobile').css('display', 'block'); 
					$('.pdp-reviews-tab-mobile-title').addClass('accordion-header-active ui-state-active').attr('aria-selected', 'true');
					$('html, body').animate({
		                scrollTop: $('.pdp-reviews-tab-mobile').offset().top
		            }, 500);
				 });
		 }
		 else {
			 $(".pr-snippet-read-reviews a").off('click').on('click', function(e){
				 e.preventDefault();
				 clickonPDP('ul.tabs-menu li#pdpReviewsTabLI');
					$('html, body').animate({
				        scrollTop: $("#pdpReviewsTabLI").offset().top
				    }, 500);
				});
		 }
		 $(window).resize(function() {
			 var windowr=$(window).width();
			 if(windowr < 641) {
				 if($(".pdp-reviews-tab-mobile .pr-review-engine").length==0 ) {
					 $(".pr-review-engine").appendTo(".pdp-reviews-tab-mobile");
					 $(".pr-snippet-read-reviews a").addClass('mobile-read-review');
					 
					 $(".mobile-read-review").off('click').on('click', function(e){
							e.preventDefault();
							$('.pdp-reviews-tab-mobile').css('display', 'block'); 
							$('.pdp-reviews-tab-mobile-title').addClass('accordion-header-active ui-state-active').attr('aria-selected', 'true');
							$('html, body').animate({
				                scrollTop: $('.pdp-reviews-tab-mobile').offset().top
				            }, 500);
						 });
				 	}
				}
			 else {
				 	if($("#pdpReviewsTab .pr-review-engine").length==0 ) {
				 		$('.pr-review-engine').appendTo('#pdpReviewsTab');
				 		
				 		$(".pr-snippet-read-reviews a").off('click').on('click', function(e){
							 e.preventDefault();
							 clickonPDP('ul.tabs-menu li#pdpReviewsTabLI');
								$('html, body').animate({
							        scrollTop: $("#pdpReviewsTabLI").offset().top
							    }, 500);
						 });
				 	}
				 }
		 });
		
		
		
	}
	/**
	 * @private
	 * @function
	 * @description Initializes the cache on the product detail page.
	 */
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
			shiptostore_detail : $(".shiptostore_detail"),
			promo25ship : $(".promo25ship")
		};
		$cache.detailContent = $cache.pdpMain.find("div.detail-content");
		$cache.pdpForm = $cache.pdpMain.find("form.pdpForm");
		$cache.swatches = $cache.pdpMain.find("ul.swatches");
		$cache.mainImageAnchor = $cache.imageZoom = $cache.imageContainer.find("a.main-image");
		$cache.mainImage = $cache.mainImageAnchor.find("img.primary-image");
	}

	/**
	 * @private
	 * @function
	 * @description Initializes events on the product detail page for the following elements:<br/>
	 * <p>availability message</p>
	 * <p>add to cart functionality</p>
	 * <p>images and swatches</p>
	 * <p>variation selection</p>
	 * <p>option selection</p>
	 * <p>send to friend functionality</p>
	 */
	function initializeEvents() {
		app.product.initAddThis();
		if(app.enabledStorePickup){app.storeinventory.buildStoreList($('.product-number span').html());}
		// add or update shopping cart line item
		app.product.initAddToCart();
		$cache.shiptostore_detail.click( function (e) {
			e.preventDefault();
			var v_height = 600;
			if ($(this).hasClass('small'))
				v_height = 'auto';
            var dlg = app.dialog.create({target: $("#popup-dialog"), options: {
                width: 800,
                height: v_height,
                title: "Ship to store",
            }});

           
            var url = app.util.appendParamsToUrl(this.href);
           
            app.ajax.load({
            	
                url: app.util.ajaxUrl(url),
                target: dlg,
                callback: function () {
                    dlg.dialog("open");
                }
            });
        });
		$cache.pdpMain.on("change keyup", "form.pdpForm input[name='Quantity']", function (e) {
			var availabilityContainer = $cache.pdpMain.find("div.availability");
			app.product.getAvailability(
				$("#pid").val(),
				$(this).val(),
				function (data) {
					if (!data) {
						$cache.addToCart.removeAttr("disabled");
						availabilityContainer.find(".availability-qty-available").html();
						availabilityContainer.find(".availability-msg").show();
						return;
					}else{
						var avMsg = null;
						var avRoot = availabilityContainer.find(".availability-msg").html('');

						// Look through levels ... if msg is not empty, then create span el
						if( data.levels.IN_STOCK> 0 ) {
							avMsg = avRoot.find(".in-stock-msg");
							if (avMsg.length===0) {
								avMsg = $("<p/>").addClass("in-stock-msg").appendTo(avRoot);
							}
							if( data.levels.PREORDER==0 && data.levels.BACKORDER==0 && data.levels.NOT_AVAILABLE==0 ) {
								// Just in stock
								avMsg.text(app.resources.IN_STOCK);
							} else {
								// In stock with conditions ...
								avMsg.text(data.inStockMsg);
							}
						}
						if( data.levels.PREORDER> 0 ) {
							avMsg = avRoot.find(".preorder-msg");
							if (avMsg.length===0) {
								avMsg = $("<p/>").addClass("preorder-msg").appendTo(avRoot);
							}
							if( data.levels.IN_STOCK==0 && data.levels.BACKORDER==0 && data.levels.NOT_AVAILABLE==0 ) {
								// Just in stock
								avMsg.text(app.resources.PREORDER);
							} else {
								avMsg.text(data.preOrderMsg);
							}
						}
						if( data.levels.BACKORDER> 0 ) {
							avMsg = avRoot.find(".backorder-msg");
							if (avMsg.length===0) {
								avMsg = $("<p/>").addClass("backorder-msg").appendTo(avRoot);
							}
							if( data.levels.IN_STOCK==0 && data.levels.PREORDER==0 && data.levels.NOT_AVAILABLE==0 ) {
								// Just in stock
								avMsg.text(app.resources.BACKORDER);
							} else {
								avMsg.text(data.backOrderMsg);
							}
						}
						if( data.inStockDate != '' ) {
							avMsg = avRoot.find(".in-stock-date-msg");
							if (avMsg.length===0) {
								avMsg = $("<p/>").addClass("in-stock-date-msg").appendTo(avRoot);
							}
							avMsg.text(String.format(app.resources.IN_STOCK_DATE,data.inStockDate));
						}
						if( data.levels.NOT_AVAILABLE> 0 ) {
							avMsg = avRoot.find(".not-available-msg");
							if (avMsg.length===0) {
								avMsg = $("<p/>").addClass("not-available-msg").appendTo(avRoot);
							}
							if( data.levels.PREORDER==0 && data.levels.BACKORDER==0 && data.levels.IN_STOCK==0 ) {
								avMsg.text(app.resources.NOT_AVAILABLE);
							} else {
								avMsg.text(app.resources.REMAIN_NOT_AVAILABLE);
							}
						}
						return;
					}
					$cache.addToCart.attr("disabled", "disabled");
					availabilityContainer.find(".availability-msg").hide();
					var avQtyMsg = availabilityContainer.find(".availability-qty-available");
					if (avQtyMsg.length===0) {
						avQtyMsg = $("<span/>").addClass("availability-qty-available").appendTo(availabilityContainer);
					}
					avQtyMsg.text(data.inStockMsg).show();

					var avQtyMsg = availabilityContainer.find(".availability-qty-available");
					if (avQtyMsg.length===0) {
						avQtyMsg = $("<span/>").addClass("availability-qty-available").appendTo(availabilityContainer);
					}
					avQtyMsg.text(data.backorderMsg).show();
				});

		});

		// Add to Wishlist and Add to Gift Registry links behaviors
		$cache.pdpMain.on("click", "a.wl-action", function (e) {
			e.preventDefault();

			var data = app.util.getQueryStringParams($("form.pdpForm").serialize());
			if (data.cartAction) {
				delete data.cartAction;
			}
			var url = app.util.appendParamsToUrl(this.href, data);
			url = this.protocol + "//" + this.hostname + ((url.charAt(0)==="/") ? url : ("/"+url));
			window.location.href = url;
		});

		$cache.pdpMain.on("hover", "ul.swatches a.swatchanchor", function () {
			swapImage(this);
			jQuery(".product-variations ul.swatches li:nth-child(3n)").addClass("third");
			jQuery(".product-variations ul.swatches li:nth-child(4n)").addClass("fourth");
			jQuery(".product-variations ul.swatches li:nth-child(5n)").addClass("fifth");
		});
		
		// productthumbnail.onclick()
		$("img.productthumbnail").click(function() {

			var lgImg = $(this).data("lgimg");
			// switch indicator
			$("div.product-thumbnails li.selected").removeClass("selected");
			$(this).closest("li").addClass("selected");

			setMainImage(lgImg);

			// load zoom if not quick view
			if( lgImg.hires != '' && lgImg.hires.indexOf('noimagelarge')<0 ){
				setMainImageLink();
				//loadZoom();
			} else {
				removeImageZoom();
			}

		});

		// dropdown variations
		$cache.pdpMain.on("change", ".product-options select", function (e) {
			var salesPrice = $cache.pdpMain.find("div.product-add-to-cart .price-sales");
			var selectedItem = $(this).children().filter(":selected").first();
			var combinedPrice = selectedItem.data("combined");
			salesPrice.text(combinedPrice);
		});

		// prevent default behavior of thumbnail link and add this Button

		//$cache.pdpMain.on("click", ".thumbnail-link, .addthis_toolbox a", false);
		$(".thumbnail-link, .addthis_toolbox a").click(function(){ return false; });
		$cache.pdpMain.on("click", "li.unselectable a", false);

		// handle drop down variation attribute value selection event
		$cache.pdpMain.on("change", ".variation-select", function(e){
			if ($(this).val().length===0) {return;}
			;
			var qty = $cache.pdpForm.find("input[name='Quantity']").first().val(),
				listid = $cache.pdpForm.find("input[name='productlistid']").first().val(),
				productSet = $(this).closest('.subProduct'),
				params = {
					Quantity : isNaN(qty) ? "1" : qty,
					format : "ajax"
				};
			if( listid ) params.productlistid = listid;
			var target = (productSet.length > 0 && productSet.children.length > 0) ? productSet : $cache.productContent;
			var url = app.util.appendParamsToUrl($(this).val(), params);
			app.progress.show($cache.pdpMain);
			
			var hasSwapImage = $(this).find("option:selected").attr("data-lgimg") !== null;
			
			app.ajax.load({
				url: url,
				callback : function (data) {
					target.html(data);
					app.product.initAddThis();
					app.product.initAddToCart();
					app.product.initShopRunnerPDP();
					if (hasSwapImage) {
						replaceImages();
					}
					$("#update-images").remove();
					app.tooltips.init();
					app.selectboxes.init();				
				}
			});
		});

		// swatch anchor onclick()
		$cache.pdpMain.on("click", "div.product-detail a[href].swatchanchor", function (e) {
			e.preventDefault();

			var el = $(this);
			if( el.parents('li').hasClass('unselectable') ) return;

			var hasSwapImage = (el.attr("data-lgimg") !== null);

			var anchor = el,
				qty = $cache.pdpForm.find("input[name='Quantity']").first().val(),
				listid = $cache.pdpForm.find("input[name='productlistid']").first().val(),
				productSet = $(anchor).closest('.subProduct'),
				params = {
					Quantity : isNaN(qty) ? "1" : qty
				};
			if( listid ) params.productlistid = listid;

			var target = (productSet.length > 0 && productSet.children.length > 0) ? productSet : $cache.productContent;
			var url = app.util.appendParamsToUrl(this.href, params);
			app.progress.show($cache.pdpMain);

			app.ajax.load({
				url: url,
				callback : function (data) {
					target.html(data);
					app.product.initAddThis();
					app.product.initAddToCart();
					app.product.initShopRunnerPDP();
					if(app.enabledStorePickup){app.storeinventory.buildStoreList($('.product-number span').html());}
					if (hasSwapImage) {
						replaceImages();
					}
					app.tooltips.init();
					app.selectboxes.init();
				}
			});
		});

		$cache.productSetList.on("click", "div.product-set-item li a[href].swatchanchor", function (e) {
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
					$cache.addToCart.attr("disabled","disabled"); // this may be a bundle
				}
				else {
					$cache.addAllToCart.removeAttr("disabled");
					$cache.addToCart.removeAttr("disabled"); // this may be a bundle
				}

				app.product.initAddToCart(ic);
				app.tooltips.init();
			});
		});

		$cache.addAllToCart.on("click", function (e) {
			e.preventDefault();
			var psForms = $cache.productSetList.find("form").toArray(),
				miniCartHtml = "",
				addProductUrl = app.util.ajaxUrl(app.urls.addProduct);

			// add items to cart
			function addItems() {
				var form = $(psForms.shift());
				var itemid = form.find("input[name='pid']").val();

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
					if (psForms.length > 0) {
						addItems();
					}
					else {
						app.quickView.close();
						app.minicart.show(miniCartHtml);
					}
				});
			}
			addItems();
			return false;
		});
		app.sendToFriend.initializeDialog($cache.pdpMain, "a.send-to-friend");

		$cache.pdpMain.find("button.add-to-cart[disabled]").attr('title', $cache.pdpMain.find(".availability-msg").html() );
		app.util.loadRecommendations();
	}
	/**
	 * @private
	 * @function
	 * @description Event handler to handle the add to cart event
	 */
	function setAddToCartHandler(e) {
		e.preventDefault();
		var form = $(this).closest("form");
		var qty = form.find("select[name='Quantity']");
		var isSubItem = $(this).hasClass("sub-product-item");
		if(qty.length === 0 || isNaN(qty.val()) || parseInt(qty.val(), 10) === 0) {
			qty.val("1");
		}

		var data = form.serialize();
		app.cart.update(data, function (response) {
			var uuid = form.find("input[name='uuid']");
			if (uuid.length > 0 && uuid.val().length > 0) {
				app.cart.refresh();
			}
			else {
				if (!isSubItem) {
					app.quickView.close();
				}
				app.minicart.show(response);
			}
		});
	}



	/*************** app.product public object ***************/
	app.product = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
			//loadZoom();
			if(app.enabledStorePickup){
				app.storeinventory.init();
			}
			setTimeout(function(){
				if($('.have-thumb').children().length > 0) {
					 $('.have-thumb').css('display', 'block');
					 $('.have-thumb').children('div').addClass('first-sellpoint').children().addClass('second-sellpoint').children().addClass('third-sellpoint').children().addClass('fourth-sellpoint'); 
				    }
				if($('.one-thumb').children().length > 0) {
					 $('.one-thumb').css('display', 'block');
					 $('.one-thumb').children('div').addClass('first-sellpoint').children().addClass('second-sellpoint').children().addClass('third-sellpoint').children().addClass('fourth-sellpoint'); 
					 $('.product-image-container').css('padding-bottom', '48px');
				}
				if(thumb_carousel > 2 && $('.have-thumb').children().length > 0) {
					 $('.jcarousel-wrapper-images-thumb').css('width', '120px');
				 }
				}, 3000);
				var thumb_carousel = $('.jcarousel-images-thumb ul li').size();
				if((thumb_carousel > 2 && $('.have-thumb').children().length > 0) || thumb_carousel > 3) {
				   app.util.checkScriptLoaded(app.scripts.carousel, function(){
					   setTimeout(function(){
					   $('.jcarousel-images-thumb')
				   		.jcarousel({
				   			wrap: 'circular',
				   			vertical: false
				   		});
				   		$('.product-thumbnails-radio a.jcarousel-control-next-thumb').css('display', 'block');
				   		$('.jcarousel-control-next-thumb')
			            .on('jcarouselcontrol:active', function() {
			                $(this).removeClass('inactive');
			            })
			            .on('jcarouselcontrol:inactive', function() {
			                $(this).addClass('inactive');
			            })
			            .jcarouselControl({
			                target: '+=1'
			            });
					   }, 7000);
				   });
			   }
		},
		readReviews : function(){
			$('.product-tabs').tabs('select','#tab4');
			$('body').scrollTop($('#tab4').offset().top);
		},
		/**
		 * @function
		 * @description Loads a product into a given container div
		 * @param {Object} options An object with the following properties:</br>
		 * <p>containerId - id of the container div, if empty then global app.containerId is used</p>
		 * <p>source - source string e.g. search, cart etc.</p>
		 * <p>label - label for the add to cart button, default is Add to Cart</p>
		 * <p>url - url to get the product</p>
		 * <p>id - id of the product to get, is optional only used when url is empty</p>
		 */
		get : function (options) {
			var target = options.target || app.quickView.init();
			var source = options.source || "";
			var productListID = options.productlistid || "";

			var productUrl = options.url || app.util.appendParamToURL(app.urls.getProductUrl, "pid", options.id);
			if(source.length > 0) {
				productUrl = app.util.appendParamToURL(productUrl, "source", source);
			}
			if(productListID.length > 0) {
				productUrl = app.util.appendParamToURL(productUrl, "productlistid", productListID);
			}

			// show small loading image
			//app.progress.show(app.ui.primary);
			app.ajax.load({
				target : target,
				url : productUrl,
				data : options.data || "",
				// replace with callback passed in by options
				callback : options.callback || app.product.init
			});
		},
		/**
		 * @function
		 * @description Gets the availability to given product and quantity
		 */
		getAvailability : function (pid, quantity, callback) {
			app.ajax.getJson({
				url: app.util.appendParamsToUrl(app.urls.getAvailability, {pid:pid, Quantity:quantity}),
				callback: callback
			});
		},
		/**
		 * @function
		 * @description Initializes the 'AddThis'-functionality for the social sharing plugin
		 */
		initAddThis : function () {
			var addThisServices = ["compact"],
				addThisToolbox = $(".addthis_toolbox"),
				addThisLinks="";

			var i,len=addThisServices.length;
			for (i=0;i<len;i++) {
				if (addThisToolbox.find(".addthis_button_"+addThisServices[i]).length==0) {
					addThisLinks += '<a class="addthis_button_'+addThisServices[i]+'"></a>';
				}
			}
			if (addThisLinks.length===0) { return; }

			addThisToolbox.html(addThisLinks);
			var addthis_config =
			{
					ui_click: true
			}
			try{
				addthis.toolbox(".addthis_toolbox", addthis_config);
			} catch(e) {
				return;
			}
		},
		/**
		 * @function
		 * @description Binds the click event to a given target for the add-to-cart handling
		 * @param {Element} target The target on which an add to cart event-handler will be set
		 */
		initAddToCart : function (target) {
			if (target) {
				target.on("click", ".add-to-cart", setAddToCartHandler);
			}
			else {
				$(".add-to-cart").on("click", setAddToCartHandler);
			}
		},
		initShopRunnerPDP : function(target) {
			$.getScript(app.shoprunnerJSUrl, function() {
				// leaving this callback function in case it���s needed for future use
				// General note
				// In order to display the ShopRunner Express Checkout button on the PDP
				// page AFTER an option is clicked, we essentially need to reload the
				// ShopRunner init script so that it can grab the correct div tag
				// and render the button
			});
		}
	};

}(window.app = window.app || {}, jQuery));

/**
 * @class app.product.tile
 */
(function (app, $) {
	var $cache = {};

	/**
	 * @function
	 * @description Initializes the DOM of the Product Detail Page
	 */
	function initializeDom() {
		var tiles = $cache.container.find(".product-tile");
		if (tiles.length===0) { return; }
		$cache.container.find(".product-tile").syncHeight()
												.each(function (idx) {$(this).data("idx",idx);});
	}
	/**
	 * @private
	 * @function
	 * @description Initializes events on the product-tile for the following elements:<br/>
	 * <p>swatches</p>
	 * <p>thumbnails</p>
	 */
	function initializeEvents() {
		app.quickView.initializeButton($cache.container, ".product-image");
		$cache.container.on("mouseleave", ".swatch-list", function(e){
			// Restore current thumb image
			var tile = $(this).closest(".grid-tile");
			var thumb = tile.find(".product-image a.thumb-link img").filter(":first");
			var data = thumb.data("current");
			thumb.attr({
				src : data.src,
				alt : data.alt,
				title : data.title
			});
		});
		$cache.container.on("click", ".swatch-list a.swatch", function (e) {
			
			e.preventDefault();
			if ($(this).hasClass("selected")) { return; }

			var tile = $(this).closest(".grid-tile");
			$(this).closest(".swatch-list").find(".swatch.selected").removeClass("selected");
			$(this).addClass("selected");
			tile.find("a.thumb-link").attr("href", $(this).attr("href"));
			tile.find("a.name-link").attr("href", $(this).attr("href"));

			var swatchImg = $(this).children("img").filter(":first");
			var data = swatchImg.data("thumb");
			var thumb = tile.find(".product-image a.thumb-link img").filter(":first");
			var currentAtts = {
				src : data.src,
				alt : data.alt,
				title : data.title
			};
			thumb.attr(currentAtts);
			thumb.data("current", currentAtts);
			}).on("mouseenter", ".swatch-list a.swatch", function (e) {
			//if ($(this).hasClass("selected")) { return; }

			// get current thumb details
			var tile = $(this).closest(".grid-tile");
			var thumb = tile.find(".product-image a.thumb-link img").filter(":first");
			var swatchImg = $(this).children("img").filter(":first");
			var data = swatchImg.data("thumb");
			var current = thumb.data('current');

			// If this is the first time, then record the current img
			if(!current) {
			    thumb.data('current',{src:thumb[0].src, alt:thumb[0].alt, title:thumb[0].title});
			}

			// Set the tile image to the values provided on the swatch data attributes
			thumb.attr({
				src : data.src,
				alt : data.alt,
				title : data.title
			});

			//swatchImg.data("thumb", currentAtts);
		});
	}

	/*************** app.product.tile public object ***************/
	app.product.tile = {
		/**
		 * @function
		 * @description Cache, events and initialization
		 */
		init : function () {
			$cache = {
				container : $(".tiles-container")
			};
			initializeEvents();
			initializeDom();
		}
	};

}(window.app = window.app || {}, jQuery));

/**
 * @class app.product.compare
 */
(function (app, $) {
	var $cache = {},
		_currentCategory = "",
		_isClearing = false,
		MAX_ACTIVE = 4,
		CI_PREFIX = "ci-";

	/**
	 * @private
	 * @function
	 * @description Verifies the number of elements in the compare container and updates it with sequential classes for ui targeting
	 */
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
	/**
	 * @private
	 * @function
	 * @description Adds an item to the compare container and refreshes it
	 */
	function addToList(data) {
		// get the first compare-item not currently active
		var item = $cache.compareContainer.find(".compare-item").not(".active").first();
		var tile = $("#"+data.uuid);
		if (item.length===0) {
			if(tile.length > 0) {
				tile.find(".compare-check")[0].checked = false;
			}
			window.alert(app.resources.COMPARE_ADD_FAIL)
			return;
		} // safety only

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

		if (tile.length===0) { return; }

		// ensure that the associated checkbox is checked
		tile.find(".compare-check")[0].checked = true;
	}
	/**
	 * @private
	 * @function
	 * description Removes an item from the compare container and refreshes it
	 */
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
	/**
	 * @private
	 * @function
	 * description Initializes the cache of compare container
	 */
	function initializeCache() {
		$cache = {
			primaryContent : $("#primary"),
			compareContainer : $("#compare-items"),
			compareButton : $("#compare-items-button"),
			clearButton : $("#clear-compared-items"),
			comparePanel : $("#compare-items-panel")
		};
	}
	/**
	 * @private
	 * @function
	 * @description Initializes the DOM-Object of the compare container
	 */
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
	/**
	 * @private
	 * @function
	 * @description Initializes the events on the compare container
	 */
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
				async : async,
				ajaxCall : async
			
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

	/*************** app.product.compare public object ***************/
	app.product.compare = {
		/**
		 * @function
		 * @description Cache, events and initialization
		 */
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
		},
		initCache : initializeCache,
		/**
		 * @function
		 * @description Adds product to the compare table
		 */
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
					cb: $("#"+uuid).find(".compare-check"),
					ajaxCall: false
				});
			}

			app.ajax.getJson({
				url : app.urls.compareAdd,
				data : { 'pid' : args.itemid, 'category' : _currentCategory },
				callback : function (response) {
					if (!response || !response.success) {
						// response failed. uncheck the checkbox return
						cb[0].checked = false;
						window.alert(app.resources.COMPARE_ADD_FAIL);
						return;
					}

					// item successfully stored in session, now add to list...
					addToList(args);
				}
			});
		},
		/**
		 * @function
		 * @description Removes product from the compare table
		 */
		removeProduct : function (args) {
			if (!args.itemid) { 
				return; 
				}
				var cb = args.cb ? $(args.cb) : null;
				var ajaxCall = args.ajaxCall === undefined ? true : args.ajaxCall;
			if(ajaxCall) {
				app.ajax.getJson({
					url : app.urls.compareRemove,
					data : { 'pid' : args.itemid, 'category' : _currentCategory },
					callback : function (response) {
						if (!response || !response.success) {
							// response failed. uncheck the checkbox return
							if (cb && cb.length > 0) { cb[0].checked = true; }
							window.alert(app.resources.COMPARE_REMOVE_FAIL);
							return;
						}

						// item successfully removed session, now remove from to list...
						removeFromList(args.uuid);
					}
				});
			} else {
				app.ajax.getJson({
					url : app.urls.compareRemove,
			        async: false,
					data : { 'pid' : args.itemid, 'category' : _currentCategory },
					callback : function (response) {
						if (!response || !response.success) {
							// response failed. uncheck the checkbox return
							if (cb && cb.length > 0) { cb[0].checked = true; }
							window.alert(app.resources.COMPARE_REMOVE_FAIL);
							return;
						}

						// item successfully removed session, now remove from to list...
						removeFromList(args.uuid);
					}
				});
			}
				
		}
	};

}(window.app = window.app || {}, jQuery));

/**
 * @class app.compare
 */
(function (app, $) {
	var $cache = {};
	/**
	 * @private
	 * @function
	 * @description Initializes the cache on the compare table
	 */
	function initializeCache() {
		$cache = {
			compareTable : $("#compare-table"),
			categoryList : $("#compare-category-list")
		};
	}
	/**
	 * @private
	 * @function
	 * @description Initializes the DOM on the product tile
	 */
	function initializeDom() {
		app.product.tile.init();
	}
	/**
	 * @private
	 * @function
	 * @description Binds the click events to the remove-link and quick-view button
	 */
	function initializeEvents() {
		$cache.compareTable.on("click", ".remove-link", function (e) {
			e.preventDefault();
			app.ajax.getJson({
				url : this.href,
				callback : function (response) {
					if (response.compareproducts == "true" && response.compareproductsize == 0) {
						window.location.href = app.urls.compareDeleteAll;
					} else {
						app.page.refresh();
					}
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

	/*************** app.compare public object ***************/
	app.compare = {
		/**
		 * @function
		 * @description Initializing of Cache, DOM and events
		 */
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
			app.product.initAddToCart();
		}
	};


}(window.app = window.app || {}, jQuery));

/**
 * @class app.sendToFriend
 */
(function (app, $) {
	var $cache = {},
		initialized=false;
	/**
	 * @private
	 * @function
	 * @description Initializes the events (preview, send, edit, cancel and close) on the send to friend form
	 */
	function initializeEvents() {
		app.util.limitCharacters();
		if (initialized) {return; }
		$cache.dialog.on("click", ".preview-button, .send-button, .edit-button", function (e) {
			e.preventDefault();
			$cache.form.validate();
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
			app.ajax.load({url:app.urls.promopopup,
				   target: '#popup',
				   callback: function() {
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

	/*************** app.sendToFriend public object ***************/
	app.sendToFriend = {
		init : function () {
			$cache = {
				form: $("#send-to-friend-form"),
				dialog: $("#send-to-friend-dialog"),
				pdpForm: $("form.pdpForm")
			};
			initializeEvents();
		},

		/**
		 * @function
		 * @description
		 */
		initializeDialog : function (eventDelegate, eventTarget) {
			$(eventDelegate).on("click", eventTarget, function (e) {
				e.preventDefault();
				var dlg = app.dialog.create({target:$("#send-to-friend-dialog"), options:{
					width:567,
					height:'auto',
					title:this.title,
					open:function() {
						app.sendToFriend.init();
						app.validator.init();
					}
				}});

				var data = app.util.getQueryStringParams($("form.pdpForm").serialize());
				if (data.cartAction) {
					delete data.cartAction;
				}
				var url = app.util.appendParamsToUrl(this.href, data);
				url = this.protocol + "//" + this.hostname + ((url.charAt(0)==="/") ? url : ("/"+url));
				app.ajax.load({
					url:app.util.ajaxUrl(url),
					target:dlg,
					callback: function () {
						dlg.dialog("open");	 // open after load to ensure dialog is centered
					}
				});
			});
		}
	};

}(window.app = window.app || {}, jQuery));


/**
 * @class app.search
 */
(function (app, $) {
	var $cache = {};
	/**
	 * @private
	 * @function
	 * @description Fix for ie8 Infinite Scroll Bar issue and QuickView Fix (along with CSS changes)
	 */	
	function initInfiniteScroll_ie8()
	{
		$( window ).scroll(function() {
				
				// getting the hidden div, which is the placeholder for the next page
				var loadingPlaceHolder = jQuery('.infinite-scroll-placeholder[data-loading-state="unloaded"]')
				
				if (loadingPlaceHolder.length == 1 && app.util.elementInViewport(loadingPlaceHolder.get(0), 250)) {
					app.search.init();
					// switch state to 'loading'
					// - switches state, so the above selector is only matching once
					// - shows loading indicator
					loadingPlaceHolder.attr('data-loading-state','loading');
					loadingPlaceHolder.addClass('infinite-scroll-loading');

					// get url hidden in DOM
					var gridUrl = loadingPlaceHolder.attr('data-grid-url');

					/**
					 * named wrapper function, which can either be called, if cache is hit, or ajax repsonse is received
					 */
					var fillEndlessScrollChunk = function (html) {
						loadingPlaceHolder.removeClass('infinite-scroll-loading');
						loadingPlaceHolder.attr('data-loading-state','loaded');
						jQuery('div.search-result-content').append(html);
					};
					if (app.clientcache.LISTING_INFINITE_SCROLL && 'sessionStorage' in window && sessionStorage["scroll-cache_" + gridUrl]) {
						// if we hit the cache
						fillEndlessScrollChunk(sessionStorage["scroll-cache_" + gridUrl]);
					} else {
						// else do query via ajax
						jQuery.ajax({
							type: "GET",
							dataType: 'html',
							url: gridUrl,
							success: function(response) {
								// put response into cache
								try {
									sessionStorage["scroll-cache_" + gridUrl] = response;
								} catch (e) {
									// nothing to catch in case of out of memory of session storage
									// it will fall back to load via ajax
								}
								// update UI
								fillEndlessScrollChunk(response);
							}
						});
					}
					

				}


		});		

	}
	/**
	 * @private
	 * @function
	 * @description replaces breadcrumbs, lefthand nav and product listing with ajax and puts a loading indicator over the product listing
	 */
	function updateProductListing(isHashChange) {
		var hash = encodeURI(decodeURI(window.location.hash));
		if(hash==='#results-content' || hash==='#results-products') { return; }

		var refineUrl = null;
		if (hash.length > 0) {
			refineUrl = window.location.pathname+"?"+hash.substr(1);
		}
		else if (isHashChange) {
			refineUrl = window.location.href;
		}

		if (!refineUrl) { return; }
        checkGridWideTileView();
		app.progress.show($cache.content);
		$cache.main.load(app.util.appendParamToURL(refineUrl, "format", "ajax"), function () {
			app.product.compare.init();
			app.product.tile.init();
			app.progress.hide();
            checkGridWideTileView();
			toggleGridWideTileView();
			app.selectboxes.init();
            app.product.initAddToCart();
			if (app.clientcache.LISTING_INFINITE_SCROLL){
				jQuery(document).trigger('grid-update');
			}
		});
	}
	
	relocateElement('.top .items-per-page', '.top .results-hits', true);
	relocateElement('.bottom .items-per-page', '.bottom .results-hits', true);
	
	function relocateElement(el, location, append)
	{
		if( el === undefined )
		{
			return;
		} 
		
		if( location === undefined )
		{
			return;
		} 
		
		if( append )
		{
			jQuery( location ).append( jQuery( el ) );
		}
		else
		{
			jQuery( location ).prepend( jQuery( el ) );
		}
	}
	
	function toggleGridWideTileView(){

		/*	toggle grid/wide tile	*/
        if(jQuery('.toggle-grid').length == 0 && (jQuery('.pt_content-search-result').length == 0) && jQuery("#wrapper").hasClass("list-mode"))
        {
            jQuery('#wrapper').removeClass('list-mode');
            jQuery('.search-result-content').addClass('wide-tiles');
            jQuery('.sort-by').append('<a class="toggle-grid list" href="'+location.href+'">+</a><a class="toggle-grid wide" href="'+location.href+'">+</a>');
            jQuery('.toggle-grid.list').addClass('active');
        }
        else if(jQuery('.toggle-grid').length == 0 && (jQuery('.pt_content-search-result').length == 0))
        {
            jQuery('#wrapper').removeClass('list-mode');
            jQuery('.sort-by').append('<a class="toggle-grid list" href="'+location.href+'">+</a><a class="toggle-grid wide" href="'+location.href+'">+</a>');
            jQuery('.toggle-grid.wide').addClass('active');
        }

        jQuery('.toggle-grid').click(function(e){
        		if($(this).hasClass('list')) {
        			jQuery('.search-result-content').addClass('wide-tiles');
        			jQuery('.toggle-grid.list').addClass('active');
        			jQuery('.toggle-grid.wide').removeClass('active');
        		}
        		else {
        			jQuery('.search-result-content').removeClass('wide-tiles');
        			jQuery('.toggle-grid.list').removeClass('active');
        			jQuery('.toggle-grid.wide').addClass('active');
        		}
        		e.preventDefault();
            });
        jQuery('.search-result-options.bottom .toggle-grid').click(function(e){
        	jQuery('html, body').animate({
                scrollTop: jQuery(".search-result-options.top").offset().top
            }, 500);
        });
        
        
	}

    function checkGridWideTileView(){

        /*	check list mode	*/
        if(jQuery(".search-result-content").hasClass("wide-tiles"))
        {
            jQuery('#wrapper').addClass('list-mode');
        }
      }
	/**
	 * @private
	 * @function
	 * @description
	 */
	function initInfiniteScroll() {

		jQuery(document).bind('scroll ready grid-update',function(e) {
			// getting the hidden div, which is the placeholder for the next page
			var loadingPlaceHolder = jQuery('.infinite-scroll-placeholder[data-loading-state="unloaded"]')
			if (loadingPlaceHolder.length == 1 && app.util.elementInViewport(loadingPlaceHolder.get(0), 250)) {
				// switch state to 'loading'
				// - switches state, so the above selector is only matching once
				// - shows loading indicator
				loadingPlaceHolder.attr('data-loading-state','loading');
				loadingPlaceHolder.addClass('infinite-scroll-loading');

				// get url hidden in DOM
				var gridUrl = loadingPlaceHolder.attr('data-grid-url');

				/**
				 * named wrapper function, which can either be called, if cache is hit, or ajax repsonse is received
				 */
				var fillEndlessScrollChunk = function (html) {
					loadingPlaceHolder.removeClass('infinite-scroll-loading');
					loadingPlaceHolder.attr('data-loading-state','loaded');
					jQuery('div.search-result-content').append(html);
					jQuery(document).trigger('grid-update');
				};
				if (app.clientcache.LISTING_INFINITE_SCROLL && 'sessionStorage' in window && sessionStorage["scroll-cache_" + gridUrl]) {
					// if we hit the cache
					fillEndlessScrollChunk(sessionStorage["scroll-cache_" + gridUrl]);
				} else {
					// else do query via ajax
					jQuery.ajax({
						type: "GET",
						dataType: 'html',
						url: gridUrl,
						success: function(response) {
							// put response into cache
							try {
								sessionStorage["scroll-cache_" + gridUrl] = response;
							} catch (e) {
								// nothing to catch in case of out of memory of session storage
								// it will fall back to load via ajax
							}
							// update UI
							fillEndlessScrollChunk(response);
						}
					});
				}
				app.search.init();
			}
		});
	}
	/**
	 * @private
	 * @function
	 * @description Initializes events for the following elements:<br/>
	 * <p>refinement blocks</p>
	 * <p>updating grid: refinements, pagination, breadcrumb</p>
	 * <p>item click</p>
	 * <p>sorting changes</p>
	 */
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
				img : itemImg,
				cb : cb
			});

		});
		$cache.main.on("click", ".refinements > div:not(.category-refinement) ul li a", function (e) {
			$('html, body').animate({
		        scrollTop: $("#main-content").offset().top
		    }, 1000);
		});
		// handle toggle refinement blocks
		
		$cache.main.on("click", ".mobile-nav", function (e) {
			var a = $(this).find('a');
			if(!$(a).hasClass('active')){
				$('.mobile-nav a').removeClass('active');
				$(a).addClass('active');
				var rel = $(this).find('a').attr('rel');
				$('.search-result-content').hide();
				$('#'+rel).show();
			}
			else{
				$('.search-result-content').hide();
				$('.mobile-nav a').removeClass('active');
			}
			
		});
		
		$cache.main.on("click", ".mobile-option ul li a", function (e) {
			var rel = $(this).attr('rel');
			if ($(this).hasClass('active')){
				$('#secondary, #mobile-secondary').hide();
				$(this).removeClass('active');
			}
			else{
				$('#secondary, #mobile-secondary').hide();
				$('.mobile-option ul li a').removeClass('active');
				$('#'+rel).show();
				$(this).addClass('active');
			}
		});
		
		// handle events for updating grid
		$cache.main.on("click", ".refinements a, .pagination a, .breadcrumb-refinement-value a", function (e) {

			if($(this).parent().hasClass("unselectable")) { return; }
			var catparent = $(this).parents('.category-refinement');
			var folderparent = $(this).parents('.folder-refinement');

			//if the anchor tag is uunderneath a div with the class names & , prevent the double encoding of the url
			//else handle the encoding for the url
			if(catparent.length > 0 || folderparent.length > 0 ){

				return true;
			}else{
				e.preventDefault();
				var uri = app.util.getUri(this);

				if(this.id == "delete-all-refinements") {
					//window.location.href = uri.url;
					window.location.hash = uri.query.substring(1, 6);
					return false;
				}

				if( uri.query.length > 1 ) {
					window.location.hash = uri.query.substring(1); // not working with some symbols encodeURI(decodeURI(uri.query.substring(1)));
				} else {
					window.location.href = this.href;
				}
				
				return false;
			}
			
		});
		$cache.main.on("click", ".pagination ul li a", function (e) {
			if($('.sort-by').parent().hasClass('bottom')){
				$('html, body').animate({
	                scrollTop: $(".search-result-options.top").offset().top
	            }, 500);
			}
		});

		// handle events item click. append params.
		$cache.main.on("click", ".product-tile a:not('#quickviewbutton, .swatch')", function (e) {
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
		});

		// handle sorting change
		$cache.main.on("change", ".sort-by select", function (e) {
			var refineUrl = $(this).find('option:selected').val();
			var uri = app.util.getUri(refineUrl);
			window.location.hash = uri.query.substr(1);
			if($('.sort-by').parent().hasClass('bottom')){
				$('html, body').animate({
	                scrollTop: $(".search-result-options.top").offset().top
	            }, 500);
			}
			return false;
		})
		.on("change", ".items-per-page select", function (e) {
			var refineUrl = $(this).find('option:selected').val();
			if (refineUrl == "INFINITE_SCROLL") {
				jQuery('html').addClass('infinite-scroll');
				jQuery('html').removeClass('disable-infinite-scroll');
			} else {
				jQuery('html').addClass('disable-infinite-scroll');
				jQuery('html').removeClass('infinite-scroll');
				var uri = app.util.getUri(refineUrl);
				window.location.hash = uri.query.substr(1);
				
			}
			if($('.sort-by').parent().hasClass('bottom')){
				$('html, body').animate({
	                scrollTop: $(".search-result-options.top").offset().top
	            }, 500);
			}
			
			return false;
		});
		$cache.main.on("click", ".pricing-popup-details", function (e) {
			e.preventDefault();
            var dlg = app.dialog.create({target: $("#pricing-popup"), options: {
                width: 570,
                height: 'auto',
                title: "Pricing",
            }});
            dlg.dialog("open");
		});

		// handle hash change
		$(window).on('hashchange', function () {
			updateProductListing(true);
		});
	}
	/******* app.search public object ********/
	app.search = {
		init : function () {
			$cache = {
				main : $("#main"),
				items : $("#search-result-items")
			};
			$cache.content = $cache.main.find(".search-result-content");
			//if (app.product.compare) {
				app.product.compare.init();
			//}
			//updateProductListing(false);
			if (window.pageXOffset == null && app.clientcache.LISTING_INFINITE_SCROLL) {
				initInfiniteScroll_ie8();
			}
			if ( window.pageXOffset != null && app.clientcache.LISTING_INFINITE_SCROLL) {
				initInfiniteScroll(); 
				
			}			
			app.product.tile.init();
			toggleGridWideTileView();
			initializeEvents();
            app.product.initAddToCart();
		}
	};

}(window.app = window.app || {}, jQuery));
/**
 * @class app.bonusProductsView
 */
(function (app, $) {
	var $cache = {};
	var selectedList = [];
	var maxItems = 1;
	var bliUUID = "";
	/**
	 * @private
	 * @function
	 * description Gets a list of bonus products related to a promoted product
	 */
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
	/**
	 * @private
	 * @function
	 * @description Updates the summary page with the selected bonus product
	 */
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
	/********* public app.bonusProductsView object *********/
	app.bonusProductsView = {
		/**
		 * @function
		 * @description Initializes the bonus product dialog
		 */
		init : function () {
			$cache = {
				bonusProduct : $("#bonus-product-dialog"),
				resultArea : $("#product-result-area")
			};
		},
		/**
		 * @function
		 * @description Opens the bonus product quick view dialog
		 */
		show : function (url) {
			// add element to cache if it does not already exist
			if(!$cache.bonusProduct) {
				app.bonusProductsView.init();
			}

			// create the dialog
			$cache.bonusProduct = app.dialog.create({
				target : $cache.bonusProduct,
				options : {
					width: 795,
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
					app.selectboxes.init();
				}
			});

		},
		/**
		 * @function
		 * @description Closes the bonus product quick view dialog
		 */
		close : function () {
			$cache.bonusProduct.dialog('close');
		},
		/**
		 * @function
		 * @description Loads the list of bonus products into quick view dialog
		 */
		loadBonusOption : function () {
			$cache.bonusDiscountContainer = $(".bonus-discount-container");
			if ($cache.bonusDiscountContainer.length===0) { return; }

			app.dialog.create({
				target : $cache.bonusDiscountContainer,
				options : {
					height : 'auto',
					width : 350,
					dialogClass : 'quickview',
					position: ['center', 78],
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
														prodID : 0,
														source : "bonus"
													 });

				$cache.bonusDiscountContainer.dialog('close');
				app.bonusProductsView.show(url);
			}).on("click", ".no-bonus-btn", function (e) {
				$cache.bonusDiscountContainer.dialog('close');
			});
		},

		/**
		 * @function
		 * @description
		 */
		initializeGrid : function () {
			$cache.bonusProductList = $("#bonus-product-list"),
				bliData = $cache.bonusProductList.data("line-item-detail");

			maxItems = bliData.maxItems;
			bliUUID = bliData.uuid;
			pid = bliData.prodID
			
			if (bliData.itemCount>=maxItems || (pid!=0)) {
				$cache.bonusProductList.find("button.button-select-bonus").each(function (){
					var val = $(this).parent().find('input[name="pid"]').attr('value');
					if(pid == val) {
						$(this).addClass('selected');
						$(this).closest('.bonus-product-item').addClass('bonus-product-item-selected');
						
					} else { 
						$(this).attr("disabled", "disabled");
					}
				})
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
				
				if (selectedList.length>=maxItems || $(this).hasClass('selected')) {
					$cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
					$cache.bonusProductList.find("bonus-items-available").text("0");
					$cache.bonusProductList.find("button.button-select-bonus").removeAttr("disabled");
					$cache.bonusProductList.find("li.selected-bonus-item").remove();
					$(this).removeClass('selected');
					$(this).closest('.bonus-product-item').removeClass('bonus-product-item-selected');
					selectedList=[];
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
				
				$(this).addClass('selected');
				$(this).closest('.bonus-product-item').addClass('bonus-product-item-selected');
				selectedList.push(product);
				updateSummary();
				$(this).removeAttr("disabled");
				$('button.button-select-bonus').each(function(){
					if ($(this).hasClass('selected'))
						$(this).removeAttr("disabled");
				})
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

/**
 * @class app.giftcert
 * @description Loads gift certificate details
 */
(function (app, $) {
	var $cache;

	function setAddToCartHandler(e) {
		e.preventDefault();
		var form = $(this).closest("form");

		var options = {
			url : app.util.ajaxUrl(form.attr('action')),
			method : 'POST',
			cache: false,
			contentType : 'application/json',
			data : form.serialize()
		};
		$.ajax(options).done(function (response) {
			if( response.success ) {
				app.ajax.load({
					url : app.urls.minicartGC,
					data :{lineItemId : response.result.lineItemId},
					callback : function(response){
						app.minicart.show(response);
						form.find('input,textarea').val('');
					}
				});
			} else {
				form.find('span.error').hide();
				for( id in response.errors.FormErrors ) {
					var error_el = $('#'+id).addClass('error').removeClass('valid').next('.error');
					if( !error_el || error_el.length===0 ) {
						error_el = $('<span for="'+id+'" generated="true" class="error" style=""></span>');
						$('#'+id).after(error_el);
					}
					error_el.text(response.errors.FormErrors[id].replace(/\\'/g,"'")).show();
				}
			}
		}).fail(function (xhr, textStatus) {
			// failed
			if(textStatus === "parsererror") {
				window.alert(app.resources.BAD_RESPONSE);
			} else {
				window.alert(app.resources.SERVER_CONNECTION_ERROR);
			}
		});
	}

	function initializeCache() {
		$cache = {
			addToCart : $("#AddToBasketButton")
		};
	}

	function initializeEvents() {
		$cache.addToCart.on('click', setAddToCartHandler);
	}

	app.giftcert = {
		init : function(){
			initializeCache();
			initializeEvents();
		}
	};
}(window.app = window.app || {}, jQuery));

/**
 * @class app.giftcard
 * @description Loads gift certificate details
 */
(function (app, $) {

	app.giftcard = {
		/**
		 * @function
		 * @description Load details to a given gift certificate
		 * @param {String} id The ID of the gift certificate
		 * @param {Function} callback A function to called
		 */
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

/**
 * @class app.checkout
 */
(function (app, $) {
	var $cache = {},
		isShipping = false,
		isMultiShipping = false,
		shippingMethods = null;

	/**
	 * @function
	 * @description Helper method which constructs a URL for an AJAX request using the
	 * entered address information as URL request parameters.
	 */
	function getShippingMethodURL(url) {
		var newUrl = app.util.appendParamsToUrl(url,
												{
													address1:$cache.address1.val(),
													address2:$cache.address2.val(),
													countryCode:$cache.countryCode.val(),
												 	stateCode:$cache.stateCode.val(),
												 	postalCode:$cache.postalCode.val(),
												 	city:$cache.city.val()
												 },
												 true);
		return newUrl;
	}

	/**
	 * @function
	 * @description updates the order summary based on a possibly recalculated basket after a shipping promotion has been applied
	 */
	function updateSummary() {
		var url = app.urls.summaryRefreshURL;
		var summary = $("#secondary.summary #minisum");
		// indicate progress
		app.progress.show(summary);

		// load the updated summary area
		summary.load( url, function () {
			// hide edit shipping method link
			summary.fadeIn("fast");
			summary.find('.checkout-mini-cart .minishipment .header a').hide();
			summary.find('.order-totals-table .order-shipping .label a').hide();
	     	$('#min_sum_continue').on('click', function(){     
        		$('.submit-form').trigger( "click" );
    		});
        $('.shipping-login .login-register').on('click', function(event){
            event.preventDefault();
            $(this).toggleClass('active');
            $('.checkout-login-inner-small').toggle();
        });
        app.checkboxes.init();
			});
	}
	/**
	 * @function
	 * @description selects a shipping method for the default shipment and updates the summary section on the right hand side
	 * @param
	 */
	function selectShippingMethod(shippingMethodID) {
		// nothing entered
		if(!shippingMethodID) {
			return;
		}
		// attempt to set shipping method
		var url = app.util.appendParamsToUrl(app.urls.selectShippingMethodsList,
											 { address1:$cache.address1.val(),
											   address2:$cache.address2.val(),
											   countryCode:$cache.countryCode.val(),
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

	/**
	 * @function
	 * @description Make an AJAX request to the server to retrieve the list of applicable shipping methods
	 * based on the merchandise in the cart and the currently entered shipping address
	 * (the address may be only partially entered).  If the list of applicable shipping methods
	 * has changed because new address information has been entered, then issue another AJAX
	 * request which updates the currently selected shipping method (if needed) and also updates
	 * the UI.
	 */
	function updateShippingMethodList() {
		if (!$cache.shippingMethodList || $cache.shippingMethodList.length === 0) { return; }
		var url = getShippingMethodURL(app.urls.shippingMethodsJSON);

		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data) {
					window.alert("Couldn't get list of applicable shipping methods.");
					return false;
				}
				if (shippingMethods && shippingMethods.toString() === data.toString())
				{
					// No need to update the UI.  The list has not changed.
					return true;
				}

				// We need to update the UI.  The list has changed.
				// Cache the array of returned shipping methods.
				shippingMethods = data;

				
				var smlUrl = getShippingMethodURL(app.urls.shippingMethodsList);

				// indicate progress
				app.progress.show($cache.shippingMethodList);

				// load the shipping method form
				$cache.shippingMethodList.load( smlUrl, function () {
					$cache.shippingMethodList.fadeIn("fast");
					// rebind the radio buttons onclick function to a handler.
					$cache.shippingMethodList.find("[name$='_shippingMethodID']").click(function () {
						selectShippingMethod($(this).val());
					});

					// update the summary
					updateSummary();
					app.progress.hide();
					app.tooltips.init();
					app.radio.init();
					});
			}
		});					     
	}

	//shipping page logic
	//checkout gift message counter
	/**
	 * @function
	 * @description Initializes gift message box, if shipment is gift
	 */
	function initGiftMessageBox() {
		// show gift message box, if shipment is gift
		if($cache.checkoutForm.find("#is-gift-yes").length > 0) {
			$cache.giftMessage.toggle($cache.checkoutForm.find("#is-gift-yes")[0].checked);
		}
	}
	/**
	 * @function
	 * @description Initializes gift message box for multiship shipping, the message box starts off as hidden and this will display it if the radio button is checked to yes, also added event handler to listen for when a radio button is pressed to display the message box
	 */
	function initMultiGiftMessageBox() {
		$.each( $("table.item-list"), function(){

			//handle initial load
			if($(this).find(".js-isgiftyes").is(':checked')){
				$(this).find(".gift-message-text").css('display','block')
			}

			//set event listeners
			$(this).bind('change', function(){
				if($(this).find(".js-isgiftyes").is(':checked')){
					$(this).find(".gift-message-text").css('display','block');
				}else if($(this).find(".js-isgiftno").is(':checked')){
					$(this).find(".gift-message-text").css('display','none');
				}
			});

		});
	}
	/**
	* @function
	* @description this function inits the form so that uses client side validation before submitting to the server
	*/
	function initmultishipshipaddress() {
	//init the continue button as disabled
		var selectvalue = new Array();
	    $(this).removeClass('error');

	    $("select option:selected").each(function () {
	    	selectvalue.push(this.value)

     	});

	    //if we found a empty value disable the button
	    if(selectvalue.indexOf('') == -1){
	    	$('.formactions button').removeAttr('disabled');
	    }else{
	    	$('.formactions button').attr('disabled','disabled');

	    }

	    //add error classes to selects that don't have an address associated with them  when the button is clicked
	    $('.formactions').bind('click',function(){
	    	$.each( $(".cart-row .shippingaddress select.selectbox"), function(){
	        	if(this.value == ''){
	          		$(this).addClass('error');
	        	}else{
	          		$(this).removeClass('error');
	        	};
	      	});
	    });

	    //add listeners to the selects to enable the continue button
	    $.each( $(".cart-row .shippingaddress select.selectbox"), function(){
	    	$(this).bind('change', function(){
	        	if(this.value == ''){
	          		$('.formactions button').attr('disabled','disabled');
	          		$(this).addClass('error');
	        	}else{
	          		//check to see if any select box has a empty vlaue
	          		var selectvalues = new Array();
	          		$(this).removeClass('error');

	            	$("select option:selected").each(function () {
	              		selectvalues.push(this.value)

	           	 	});

	            	//if we found a empty value disable the button
	            	if(selectvalues.indexOf('') == -1){
	              		$('.formactions button').removeAttr('disabled');
	            	}else{
	              		$('.formactions button').attr('disabled','disabled');

	            	}
	        	}
	      	});

	    });
	}
	/**
	 * @function
	 * @description shows gift message box, if shipment is gift
	 */
	function shippingLoad() {
		$cache.checkoutForm.on("click", "#is-gift-yes, #is-gift-no", function (e) {
			$cache.checkoutForm.find(".gift-message-text").toggle($cache.checkoutForm.find("#is-gift-yes")[0].checked);
		})
		.on("change",
			"input[name$='_addressFields_address1'], input[name$='_addressFields_address2'], input[name$='_addressFields_state'], input[name$='_addressFields_city'], input[name$='_addressFields_zip']",
			updateShippingMethodList
		);

		// gift message character limitation
		initGiftMessageBox();
		updateShippingMethodList();
		return null;
	}
	/**
	 * @function
	 * @description Selects the first address from the list of addresses
	 */
	function addressLoad() {
		// select address from list
		$cache.addressList.on("change", function () {
			var selected = $(this).children(":selected").first();
			var data = $(selected).data("address");
			if (!data) { return; }
			var p;
			for (p in data) {
				if ($cache[p] && data[p]) {
					$cache[p].val(data[p].replace("^","'"));
					// special handling for countrycode => stateCode combo
					if ($cache[p]===$cache.countryCode) {
						app.util.updateStateOptions($cache[p]);
						$cache.stateCode.val(data.stateCode);
						$cache.stateCode.trigger("change");
					}
					else {
						updateShippingMethodList();
					}
				}				
			}

			// re-validate the form
			$cache.checkoutForm.validate().form();
		});

		// update state options in case the country changes
		$cache.countryCode.on("change", function () {
			app.util.updateStateOptions(this);
		});
	}

	/**
	 * @function
	 * @description shows gift message box in multiship, and if the page is the multi shipping address page it will call initmultishipshipaddress() to initialize the form
	 */
	function multishippingLoad() {
		initMultiGiftMessageBox();
		if($(".cart-row .shippingaddress select.selectbox").length>0){
			initmultishipshipaddress();
		}
		return null;
	}

	/**
	 * @function
	 * @description Changes the payment method form depending on the passed paymentMethodID
	 * @param {String} paymentMethodID the ID of the payment method, to which the payment method form should be changed to
	 */
	function changePaymentMethod(paymentMethodID) {
		$cache.paymentMethods.removeClass("payment-method-expanded");
		var pmc = $cache.paymentMethods.filter("#PaymentMethod_"+paymentMethodID);
		if (pmc.length===0) {
			pmc = $("#PaymentMethod_Custom");
		}
		pmc.addClass("payment-method-expanded");

		// ensure checkbox of payment method is checked
		$("#is-" + paymentMethodID)[0].checked = true;

		var bmlForm = $cache.checkoutForm.find("#PaymentMethod_BML");
		bmlForm.find("select[name$='_year']").removeClass("required");
		bmlForm.find("select[name$='_month']").removeClass("required");
		bmlForm.find("select[name$='_day']").removeClass("required");
		bmlForm.find("input[name$='_ssn']").removeClass("required");

		if (paymentMethodID==="BML") {
			var yr = bmlForm.find("select[name$='_year']");
			bmlForm.find("select[name$='_year']").addClass("required");
			bmlForm.find("select[name$='_month']").addClass("required");
			bmlForm.find("select[name$='_day']").addClass("required");
			bmlForm.find("input[name$='_ssn']").addClass("required");
		}
		app.validator.init();
	}
	/**
	 * @function
	 * @description Fills the Credit Card form with the passed data-parameter and clears the former cvn input
	 * @param {Object} data The Credit Card data (holder, type, masked number, expiration month/year)
	 */
	function setCCFields(data) {
		$cache.ccOwner.val(data.holder);
		$cache.ccType.val(data.type);
		$cache.ccNum.val(data.maskedNumber);
		$cache.ccMonth.val(data.expirationMonth);
		$cache.ccYear.val(data.expirationYear);
		$cache.ccCcv.val("");

		// remove error messages
		$cache.ccContainer.find(".errormessage")
						  .toggleClass("errormessage")
						  .filter("span").remove();

		$cache.ccContainer.find(".errorlabel").toggleClass("errorlabel");
	}

	/**
	 * @function
	 * @description Updates the credit card form with the attributes of a given card
	 * @param {String} cardID the credit card ID of a given card
	 */
	function populateCreditCardForm(cardID) {
		// load card details
		var url = app.util.appendParamToURL(app.urls.billingSelectCC, "creditCardUUID", cardID);
		 app.ajax.getJson({
			url: url,
			callback: function (data) {
				if(!data) {
					window.alert(app.resources.CC_LOAD_ERROR);
					return false;
				}
				$cache.ccList.data(cardID, data);
				setCCFields(data);
			}
		});
	}

	/**
	 * @function
	 * @description loads billing address, Gift Certificates, Coupon and Payment methods
	 */
	function billingLoad() {
		if( !$cache.paymentMethodId ) return;

		$cache.paymentMethodId.on("click", function () {
			changePaymentMethod($(this).val());
		});

        $(".form-row .radio").on("click", function () {
            $(this).parent().find('.input-radio').trigger( "click");
		});

		// get selected payment method from payment method form
		var paymentMethodId = $cache.paymentMethodId.filter(":checked");
		if($('.payment-method-options').length >0 ){
			changePaymentMethod(paymentMethodId.length===0 ? "CREDIT_CARD" : paymentMethodId.val());
		}
		// select credit card from list
		$cache.ccList.on("change", function () {
			if($(this).val()) {
				$('.saved-card .input-checkbox').removeAttr('checked');
				$('.saved-card').css('display', 'none');
				}
			else {
				$('.saved-card .input-checkbox').attr('checked', 'checked');
				$('.saved-card').css('display', 'block');
				
			}
			var cardUUID = $(this).val();
			
			if(!cardUUID) { return; }
			
			var ccdata = $cache.ccList.data(cardUUID);
			if (ccdata && ccdata.holder) {
				setCCFields(ccdata);
				return;
			}
			populateCreditCardForm(cardUUID);
			
		});

		// handle whole form submit (bind click to continue checkout button)
		// append form fields of current payment form to this submit
		// in order to validate the payment method form inputs too

		$cache.save.on('click', function (e) {
			// determine if the order total was paid using gift cert or a promotion
			if ($("#noPaymentNeeded").length > 0 && $(".giftcertpi").length > 0) {
				// as a safety precaution, uncheck any existing payment methods
				$cache.paymentMethodId.filter(":checked").removeAttr("checked");
				// add selected radio button with gift card payment method
				$("<input/>").attr({
									name:$cache.paymentMethodId.first().attr("name"),
									type:"radio",
									checked:"checked",
									value:app.constants.PI_METHOD_GIFT_CERTIFICATE})
							 .appendTo($cache.checkoutForm);
			}

			var tc = $cache.checkoutForm.find("input[name$='bml_termsandconditions']");
			if ($cache.paymentMethodId.filter(":checked").val()==="BML" && !$cache.checkoutForm.find("input[name$='bml_termsandconditions']")[0].checked) {
				alert(app.resources.BML_AGREE_TO_TERMS);
				return false;
			}

		});

		$cache.gcCheckBalance.on("click", function (e) {
			e.preventDefault();
			$cache.gcCode = $cache.gcCode || $cache.checkoutForm.find("input[name$='_giftCertCode']");
			$cache.balance = $cache.balance || $cache.checkoutForm.find("div.balance");
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

		$cache.addCoupon.on("click", function(e){
			e.preventDefault();
			
			$cache.couponCode = $cache.couponCode || $cache.checkoutForm.find("input[name$='_couponCode']");
			$cache.redemption = $cache.redemption || $cache.checkoutForm.find("div.redemption.coupon");
			var val = $cache.couponCode.val();
			if (val.length===0) {
				$(".promo-code").find("input").addClass("error");
				var error = $cache.redemption.find("span.error");
				if (error.length===0) {
					error = $("<span>").addClass("error").appendTo($cache.redemption);
					$(".promo-code").find("input").addClass("error");
				}
				error.html(app.resources.COUPON_CODE_MISSING);
				return;
				
			}
			
			var url = app.util.appendParamsToUrl(app.urls.addCoupon, {couponCode:val,format:"ajax"});
			$.getJSON(url, function(data) {
				var fail = false;
				var msg = "";
				if (!data) {
					msg = app.resources.BAD_RESPONSE;
					fail = true;
					$(".promo-code").find("input").addClass("error");
					
				}
				else if (!data.success) {
					msg = data.message;
					msg = msg.split('<').join('&lt;');
					msg = msg.split('>').join('&gt;');
					fail = true;
					$(".promo-code").find("input").addClass("error");
				}
				if (fail) {
					var error = $cache.redemption.find("span.error");
					if (error.length===0) {
						$("<span>").addClass("error").appendTo($cache.redemption);
					}
					
					error.html( msg );
					return;
				}

				$cache.redemption.html("<span class='cupon-success-new'>" + data.message + "</span>");

				//basket check for displaying the payment section, if the adjusted total of the basket is 0 after applying the coupon
				//this will force a page refresh to display the coupon message based on a parameter message
				if(data.success && data.baskettotal==0){
					var ccode = data.CouponCode;
						window.location.assign(app.urls.billing);
				}
			
			});
		});
		if(app.variables.editPaymentSection) {
			$('html, body').animate({
		        scrollTop: $(".payment-title-new").offset().top
		    }, 500);
		    return false;
		}
		$('.payment-method-options .form-row .input-radio').on('click', function(){
			var paymentId=$(this).attr('id');
			if(paymentId=='is-PAY_PAL') {
				$('.submit-form span').text('Continue to PayPal');
			} else {
				$('.submit-form span').text('Continue');
						
			};
		});
	}

	$("#redeem-href").on("click", function(e){
		var val = $("#dwfrm_billing_giftCertCode").val();
		if (val.length===0) {
			$("#dwfrm_billing_giftCertCode").addClass("error");
					
		}
		var val1 = $("#dwfrm_billing_giftCertPin").val();
		if (val1.length===0) {
			$("#dwfrm_billing_giftCertPin").addClass("error");
		}
		var email = $("#dwfrm_billing_billingAddress_email_emailAddress").val();
		var url = app.urls.redeemGiftCertificate;
		var giftUrl = app.util.appendParamToURL(url, "giftCertificateID", val);
		var giftUrlFinal = app.util.appendParamToURL(giftUrl, "giftCertPin", val1);
		if(!$("#dwfrm_billing_billingAddress_email_emailAddress").hasClass("error")) {
			giftUrlFinal = app.util.appendParamToURL(giftUrlFinal, "emailAddress", email);
		}
		e.preventDefault();
		window.location.href = giftUrlFinal;
	});
	

	/**
	 * @function
	 * @description Sets a boolean variable (isShipping) to determine the checkout stage
	 */
	function initializeDom() {
		isShipping = $(".checkout-shipping").length > 0;
		isMultiShipping = $(".checkout-multi-shipping").length > 0;
		$("#dwfrm_login_password").parent().find("label>span:last").after("<span class='paswword-characters'>(5-20 characters)</span>");
	}

	/**
	 * @function
	 * @description Initializes the cache of the checkout UI
	 */
	function initializeCache() {
		$cache.checkoutForm = $("form.address");
		$cache.addressList = $cache.checkoutForm.find(".select-address select[id$='_addressList']");
		$cache.firstName = $cache.checkoutForm.find("input[name$='_firstName']");
		$cache.lastName = $cache.checkoutForm.find("input[name$='_lastName']");
		$cache.address1 = $cache.checkoutForm.find("input[name$='_address1']");
		$cache.address2 = $cache.checkoutForm.find("input[name$='_address2']");
		$cache.city = $cache.checkoutForm.find("input[name$='_city']");
		$cache.postalCode = $cache.checkoutForm.find("input[name$='_zip']");
		$cache.phone = $cache.checkoutForm.find("input[name$='_phone']");
		$cache.countryCode = $cache.checkoutForm.find("select[id$='_country']");
		$cache.stateCode = $cache.checkoutForm.find("select[id$='_state']");
		$cache.addToAddressBook = $cache.checkoutForm.find("input[name$='_addToAddressBook']");
		if ($cache.checkoutForm.hasClass("checkout-shipping")) {
			// shipping only
			$cache.useForBilling = $cache.checkoutForm.find("input[name$='_useAsBillingAddress']");
			$cache.giftMessage = $cache.checkoutForm.find(".gift-message-text");
			$cache.shippingMethodList = $("#shipping-method-list");
		}

		if ($cache.checkoutForm.hasClass("checkout-billing")) {
			// billing only
			$cache.email = $cache.checkoutForm.find("input[name$='_emailAddress']");
			$cache.save = $cache.checkoutForm.find("button[name$='_billing_save']");
			$cache.paymentMethods = $cache.checkoutForm.find("div.payment-method");
			$cache.paymentMethodId = $cache.checkoutForm.find("input[name$='_selectedPaymentMethodID']");
			$cache.ccContainer = $("#PaymentMethod_CREDIT_CARD");
			$cache.ccList = $("#creditCardList");
			$cache.ccOwner = $cache.ccContainer.find("input[name$='creditCard_owner']");
			$cache.ccType = $cache.ccContainer.find("select[name$='_type']");
			$cache.ccNum = $cache.ccContainer.find("input[name$='_number']");
			$cache.ccMonth = $cache.ccContainer.find("[name$='_month']");
			$cache.ccYear = $cache.ccContainer.find("[name$='_year']");
			$cache.ccCcv = $cache.ccContainer.find("input[name$='_cvn']");
			$cache.BMLContainer = $("#PaymentMethod_BML");
			$cache.gcCheckBalance = $("#gc-checkbalance");
			$cache.addCoupon = $("#add-coupon");
			$('.shipping-login').css('display', 'none');
			$('.search-information').css('display', 'none');

		}
	}
	/**
	 * @function Initializes the page events depending on the checkout stage (shipping/billing)
	 */
	function initializeEvents() {
		
		addressLoad();
		
		if (isShipping) {
			shippingLoad();
			$cache.addressList.trigger('change');
			
			//on the single shipping page, update the list of shipping methods when the state feild changes
			$('#dwfrm_singleshipping_shippingAddress_addressFields_states_state').bind('change', function(){
				updateShippingMethodList();
			});
		}
		else if(isMultiShipping){
			multishippingLoad();
		}
		else{
			
			billingLoad();
			if(useAsBillingAddressNew!== '') {
				if(!useAsBillingAddressNew) {
				$cache.addressList.trigger('change');
					}
				}
			}
		
		//if on the order review page and there are products that are not available diable the submit order button
		if($('.order-summary-footer').length > 0){
			if($('.notavailable').length > 0){
				$('.order-summary-footer .submit-order .button-fancy-large').attr( 'disabled', 'disabled' );
			}
		}
	}

	/******* app.checkout public object ********/
	app.checkout = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
		}
	};
}(window.app = window.app || {}, jQuery));


/**
 * @class app.quickview
 */
(function (app, $) {
	var $cache = {};
	/**
	 * @function
	 * @description Binds a 'click'-event to the quick view button
	 */
	function bindQvButton() {
		$cache.qvButton.one("click", function (e) {
			e.preventDefault();
			app.quickView.show({
				url : $(this).attr("href"),
				source : "quickview"
			});
		});
	}

	/******* app.quickView public object ********/
	app.quickView = {
		/**
		 * @function
		 * @description
		 */
		initializeButton : function (container, target) {
			// quick view button
			/*$(container).on("mouseenter", target, function (e) {
				if(!$cache.qvButton) {
					$cache.qvButton = $("<a id='quickviewbutton'/>");
				}
				bindQvButton();

				var link = $(this).children("a:first");
				$cache.qvButton.attr({
					"href" : link.attr("href"),
					"title" : link.attr("title"),
				}).appendTo($(this));
			});*/
		},
		init : function () {
			if(app.quickView.exists()) {
				return $cache.quickView;
			}

			$cache.quickView = $("<div/>").attr("id", "#QuickViewDialog").appendTo(document.body);
			return $cache.quickView;
		},
		
		initializeQuickViewNav : function(qvUrl) {
			
			//from the url of the product in the quickview
			qvUrlTail = qvUrl.substring(qvUrl.indexOf('?'));
			qvUrlPidParam = qvUrlTail.substring(0,qvUrlTail.indexOf('&'));
			qvUrl = qvUrl.substring(0, qvUrl.indexOf('?'));
			
			if(qvUrlPidParam.indexOf('pid') > 0){
				//if storefront urls are turned off
				//append the pid to the url
				qvUrl = qvUrl+qvUrlPidParam;
			}
			
			this.searchesultsContainer = $('#search-result-items').parent();
			this.productLinks = this.searchesultsContainer.find('.thumb-link');

			this.btnNext = $('.quickview-next');
			this.btnPrev = $('.quickview-prev');

			this.btnNext.click(this.navigateQuickview.bind(this));
			this.btnPrev.click(this.navigateQuickview.bind(this));

			var productLinksUrl = "";
			for ( var i = 0; i < this.productLinks.length; i++) {

				productLinksUrlTail = this.productLinks[i].href.substring(this.productLinks[i].href.indexOf('?'));
				productLinksUrlPidParam = productLinksUrlTail.substring(0,qvUrlTail.indexOf('&'));
				if(productLinksUrlPidParam.indexOf('pid') > 0){
					//append the pid to the url
					//if storefront urls are turned off
					productLinksUrl = this.productLinks[i].href.substring(0, this.productLinks[i].href.indexOf('?'));
					productLinksUrl = productLinksUrl+productLinksUrlPidParam;
				
				}else{
					productLinksUrl = this.productLinks[i].href.substring(0, this.productLinks[i].href.indexOf('?'));
				}
			
				if(productLinksUrl == ""){
					productLinksUrl = this.productLinks[i].href;
				}
				
				if (qvUrl == productLinksUrl) {
					this.productLinkIndex = i;
				}
			}

			if (this.productLinkIndex == this.productLinks.length - 1) {
				this.btnNext.hide();
			}

			if (this.productLinkIndex == 0) {
				this.btnPrev.hide();
			}

			//hide the buttons on the compare page
			if($('.compareremovecell').length > 0){
				this.btnNext.hide();
				this.btnPrev.hide();
			}
			
		},

		navigateQuickview : function(event) {
			var button = $(event.currentTarget);

			if (button.hasClass('quickview-next')) {
				this.productLinkIndex++;
			} else {
				this.productLinkIndex--;
			}

			app.quickView.show({
				url : this.productLinks[this.productLinkIndex].href,
				source : 'quickview'
			});

			event.preventDefault();
		},
		
		// show quick view dialog and send request to the server to get the product
		// options.source - source of the dialog i.e. search/cart
		// options.url - product url
		/**
		 * @function
		 * @description
		 */
		show : function (options) {
			options.target = app.quickView.init();
			options.callback = function () {
				app.product.init();
				app.dialog.create({
					target : $cache.quickView,
					options : {
						height : 'auto',
						width : 920,
						dialogClass : 'quickview',
						title : 'Product Quickview',
						resizable : false,
						position : 'center',
						open : function () {
							app.progress.hide();
						}
					}
				});
				$cache.quickView.dialog('open');
				
				app.quickView.initializeQuickViewNav(this.url);
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

/**
 * @class app.util
 */
(function (app, $) {

	// sub namespace app.util.* contains utility functions
	app.util = {
			
			/**
			 * @private
			 * @function
			 * @description Creates product recommendation carousel using jQuery jcarousel plugin
			 */
			loadRecommendations : function () {
				var carousel = $("#carousel-recomendations");
				if(!carousel || carousel.length === 0 || carousel.children().length === 0) {
					return;
				}
				app.util.checkScriptLoaded(app.scripts.carousel, function(){
					carousel.after('<div class="jcarousel-pagination mobile-view"></div>').parent().after('<a href="#" class="jcarousel-control-prev"></a><a href="#" class="jcarousel-control-next"></a>');
					
					carousel.parent('.recommendations').jcarousel({list: '#carousel-recomendations'});
					//carousel.jcarousel(app.components.carouselSettings);
		        $('.jcarousel-control-prev')
		            .on('jcarouselcontrol:active', function() {
		                $(this).removeClass('inactive');
		            })
		            .on('jcarouselcontrol:inactive', function() {
		                $(this).addClass('inactive');
		            })
		            .jcarouselControl({
		                target: '-=1'
		            });

		        $('.jcarousel-control-next')
		            .on('jcarouselcontrol:active', function() {
		                $(this).removeClass('inactive');
		            })
		            .on('jcarouselcontrol:inactive', function() {
		                $(this).addClass('inactive');
		            })
		            .jcarouselControl({
		                target: '+=1'
		            });

		        $('.jcarousel-pagination')
		            .on('jcarouselpagination:active', 'a', function() {
		                $(this).addClass('active');
		            })
		            .on('jcarouselpagination:inactive', 'a', function() {
		                $(this).removeClass('active');
		            })
		            .on('click', function(e) {
		                e.preventDefault();
		            })
		            .jcarouselPagination({
		                perPage: 1,
		                item: function(page) {
		                    return '<a href="#' + page + '">' + page + '</a>';
		                }
		            });
				});
			},
		/**
		 * @function
		 * @description Check whether a script is loaded, and if not, loads it. Then execute callback function.
		 * @param {Object} script object with path and loaded state
		 * @param {Function} callback function
		 */
		checkScriptLoaded : function (script, callback) {
			if(script.loaded){
				if (callback) { callback();	}
			} else {
				$.ajax({
					url: script.path,
					dataType: "script",
					cache: true
				}).done(function() {
					if (callback) { callback();	}
					script.loaded = true;
				});
			}	
		},
		/**
		 * @function
		 * @description trims a prefix from a given string, this can be used to trim
		 * a certain prefix from DOM element IDs for further processing on the ID
		 */
		trimPrefix : function (str, prefix) {
			return str.substring(prefix.length);
		},

		/**
		 * @function
		 * @description
		 */
		setDialogify : function (e) {
			e.preventDefault();
			var actionSource = $(this),
				dlgAction = $(actionSource).data("dlg-action") || {}, // url, target, isForm
				dlgOptions = $.extend({}, app.dialog.settings, $(actionSource).data("dlg-options") || {});

			dlgOptions.title = dlgOptions.title || $(actionSource).attr("title") || "";

			var url = dlgAction.url // url from data
					  || (dlgAction.isForm ? $(actionSource).closest("form").attr("action") : null) // or url from form action if isForm=true
					  || $(actionSource).attr("href"); // or url from href

			if (!url) { return; }

			var form = jQuery(this).parents('form');
			var method = form.attr("method")||"POST";

			// if this is a content link, update url from Page-Show to Page-Include
			if ($(this).hasClass("attributecontentlink")) {
				var uri = app.util.getUri(url);
				url = app.urls.pageInclude+uri.query;
			}
			if (method && method.toUpperCase() == "POST")
			{
		         var postData = form.serialize() + "&"+ jQuery(this).attr("name") + "=submit";
		    }
			else
			{
		         if (url.indexOf('?') == -1 )
		         {
		          url+='?';
		         }
		         else
		         {
		          url += '&'
		         }
		         url += form.serialize();
		         url = app.util.appendParamToURL(url, jQuery(this).attr('name'), "submit");
			}

			var dlg = app.dialog.create({target:dlgAction.target, options : dlgOptions});

			app.ajax.load({
				ajaxType : 'POST',
				url:$(actionSource).attr("href") || $(actionSource).closest("form").attr("action"),
				target:dlg, callback: function () {
					dlg.dialog("open");	// open after load to ensure dialog is centered
					app.validator.init(); // re-init validator
					$(".close-button").click(function(e){
						e.preventDefault();
						app.dialog.close();
					});
				},
				data : !$(actionSource).attr("href") ? postData : null

			});
		},
		/**
		 * @function
		 * @description Appends a character to the left side of a numeric string (normally ' ')
		 * @param {String} str the original string
		 * @param {String} padChar the character which will be appended to the original string
		 * @param {Number} len the length of the end string
		 */
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

		/**
		 * @function
		 * @description appends the parameter with the given name and value to the given url and returns the changed url
		 * @param {String} url the url to which the parameter will be added
		 * @param {String} name the name of the parameter
		 * @param {String} value the value of the parameter
		 */
		appendParamToURL : function (url, name, value) {
			var c = "?";
			if(url.indexOf(c) !== -1) {
				c = "&";
			}
			return url + c + name + "=" + encodeURIComponent(value);
		},
		/**
		 * @function
		 * @description
		 * @param {String}
		 * @param {String}
		 */
		elementInViewport: function (el, offsetToTop) {
			var top = el.offsetTop,
				left = el.offsetLeft,
				width = el.offsetWidth,
				height = el.offsetHeight;

			while (el.offsetParent) {
				el = el.offsetParent;
				top += el.offsetTop;
				left += el.offsetLeft;
			}

			if (typeof(offsetToTop) != 'undefined') {
				top -= offsetToTop;
			}
		
			
			if ( window.pageXOffset != null) {

				return (
						top < (window.pageYOffset + window.innerHeight) &&
						left < (window.pageXOffset + window.innerWidth) &&
						(top + height) > window.pageYOffset &&
						(left + width) > window.pageXOffset
				);
				
			}

			if (document.compatMode == "CSS1Compat") {
				return (
					top < (window.document.documentElement.scrollTop + window.document.documentElement.clientHeight) &&
					left < (window.document.documentElement.scrollLeft + window.document.documentElement.clientWidth) &&
					(top + height) > window.document.documentElement.scrollTop &&
					(left + width) > window.document.documentElement.scrollLeft
			);
			
			}
		},
		/**
		 * @function
		 * @description appends the parameters to the given url and returns the changed url
		 * @param {String} url the url to which the parameters will be added
		 * @param {String} params a JSON string with the parameters
		 */
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
		/**
		 * @function
		 * @description removes the parameter with the given name from the given url and returns the changed url
		 * @param {String} url the url from which the parameter will be removed
		 * @param {String} name the name of the parameter
		 */
		removeParamFromURL : function (url, parameter) {
			var urlparts = url.split('?');

			if(urlparts.length >= 2) {
				var urlBase = urlparts.shift();
				var queryString = urlparts.join("?");

				var prefix = encodeURIComponent(parameter) + '=';
				var pars = queryString.split(/[&;]/g);
				var i=pars.length;
				while(0 > i--) {
					if(pars[i].lastIndexOf(prefix, 0) !== -1) {
						pars.splice(i, 1);
					}
				}
				url = urlBase + '?' + pars.join('&');
			}
			return url;
		},

		/**
		 * @function
		 * @description Returns the static url for a specific relative path
		 * @param {String} path the relative path
		 */
		staticUrl : function (path) {
			if(!path || $.trim(path).length === 0) {
				return app.urls.staticPath;
			}

			return app.urls.staticPath + (path.charAt(0) === "/" ? path.substr(1) : path );
		},
		/**
		 * @function
		 * @description Appends the parameter 'format=ajax' to a given path
		 * @param {String} path the relative path
		 */
		ajaxUrl : function (path) {
			return app.util.appendParamToURL(path, "format", "ajax");
		},

		/**
		 * @function
		 * @description
		 * @param {String} url
		 */
		toAbsoluteUrl : function (url) {
			if (url.indexOf("http")!==0 && url.charAt(0)!=="/") {
				url = "/"+url;
			}
			return url;
		},
		/**
		 * @function
		 * @description Loads css dynamically from given urls
		 * @param {Array} urls Array of urls from which css will be dynamically loaded.
		 */
		loadDynamicCss : function (urls) {
			var i, len=urls.length;
			for(i=0; i < len; i++) {
				app.util.loadedCssFiles.push(app.util.loadCssFile(urls[i]));
			}
		},

		/**
		 * @function
		 * @description Loads css file dynamically from given url
		 * @param {String} url The url from which css file will be dynamically loaded.
		 */
		loadCssFile : function (url) {
			return $("<link/>").appendTo($("head")).attr({
				type : "text/css",
				rel : "stylesheet"
			}).attr("href", url); // for i.e. <9, href must be added after link has been appended to head
		},
		// array to keep track of the dynamically loaded CSS files
		loadedCssFiles : [],

		/**
		 * @function
		 * @description Removes all css files which were dynamically loaded
		 */
		clearDynamicCss : function () {
			var i = app.util.loadedCssFiles.length;
			while(0 > i--) {
				$(app.util.loadedCssFiles[i]).remove();
			}
			app.util.loadedCssFiles = [];
		},
		/**
		 * @function
		 * @description Extracts all parameters from a given query string into an object
		 * @param {String} qs The query string from which the parameters will be extracted
		 */
		getQueryStringParams : function (qs) {
			if(!qs || qs.length === 0) { return {}; }

			var params = {}, unescapedQS = unescape(qs);
			// Use the String::replace method to iterate over each
			// name-value pair in the string.
			unescapedQS.replace( new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
						function ( $0, $1, $2, $3 ) {	params[ $1 ] = $3; }
			);
			return params;
		},
		/**
		 * @function
		 * @description Returns an URI-Object from a given element with the following properties:<br/>
		 * <p>protocol</p>
		 * <p>host</p>
		 * <p>hostname</p>
		 * <p>port</p>
		 * <p>path</p>
		 * <p>query</p>
		 * <p>queryParams</p>
		 * <p>hash</p>
		 * <p>url</p>
		 * <p>urlWithQuery</p>
		 * @param {Object} o The HTML-Element
		 */
		getUri : function (o) {
			var a;
			if (o.tagName && $(o).attr("href")) {
				a = o;
			}
			else if (typeof o === "string") {
				a = document.createElement("a");
				a.href = o;
			}
			else {
				return null;
			}

			return {
				protocol : a.protocol, //http:
				host : a.host, //www.myexample.com
				hostname : a.hostname, //www.myexample.com'
				port : a.port, //:80
				path : a.pathname, // /sub1/sub2
				query : a.search, // ?param1=val1&param2=val2
				queryParams : a.search.length > 1 ? app.util.getQueryStringParams(a.search.substr(1)) : {},
				hash : a.hash, // #OU812,5150
				url : a.protocol+ "//" + a.host + a.pathname,
				urlWithQuery : a.protocol+ "//" + a.host + a.port + a.pathname + a.search
			};
		},
		/**
		 * @function
		 * @description Appends a form-element with given arguments to a body-element and submits it
		 * @param {Object} args The arguments which will be attached to the form-element:<br/>
		 * <p>url</p>
		 * <p>fields - an Object containing the query-string parameters</p>
		 */
		postForm : function (args) {
			var form = $("<form>").attr({action:args.url,method:"post"}).appendTo("body");
			var p;
			for (p in args.fields) {
				$("<input>").attr({name:p,value:args.fields[p]}).appendTo(form);
			}
			form.submit();
		},
		/**
		 * @function
		 * @description  Returns a JSON-Structure of a specific key-value pair from a given resource bundle
		 * @param {String} key The key in a given Resource bundle
		 * @param {String} bundleName The resource bundle name
		 * @param {Object} A callback function to be called
		 */
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
		/**
		 * @function
		 * @description Updates the states options to a given country
		 * @param {String} countrySelect The selected country
		 */
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
				c = app.countries[country.val()],
				arrHtml = [],
				labelSpan = form.find("label[for='"+stateField[0].id+"'] span").not(".required-indicator");

			// set the label text
			labelSpan.html(c.label);

			var s;
			for (s in c.regions) {
				arrHtml.push('<option value="'+s+'">'+c.regions[s]+'</option>');
			}
			// clone the empty option item and add to stateSelect
			var o1 = stateField.children().first().clone();
			stateField.html(arrHtml.join("")).removeAttr("disabled").children().first().before(o1);
			stateField[0].selectedIndex=0;
		},
		/**
		 * @function
		 * @description Updates the number of the remaining character
		 * based on the character limit in a text area
		 */
		limitCharacters : function () {
			$('form').find('textarea[data-character-limit]').each(function(){
				var characterLimit = $(this).data("character-limit");
				var charCountHtml = String.format(app.resources.CHAR_LIMIT_MSG,
										'<span class="char-remain-count">'+characterLimit+'</span>',
										'<span class="char-allowed-count">'+characterLimit+'</span>');
				var charCountContainer = $(this).next('div.char-count');
				if (charCountContainer.length===0) {
					charCountContainer = $('<div class="char-count"/>').insertAfter($(this));
				}
				charCountContainer.html(charCountHtml);
				// trigger the keydown event so that any existing character data is calculated
				$(this).change();
			});
		},
		/**
		 * @function
		 * @description Binds the onclick-event to a delete button on a given container,
		 * which opens a confirmation box with a given message
		 * @param {String} container The name of element to which the function will be bind
		 * @param {String} message The message the will be shown upon a click
		 */
		setDeleteConfirmation : function(container, message) {
			$(container).on("click", ".delete", function(e){
				return confirm(message);
			});
		},
		/**
		 * @function
		 * @description Scrolls a browser window to a given x point
		 * @param {String} The x coordinate
		 */
		scrollBrowser : function (xLocation) {
			$('html, body').animate({ scrollTop: xLocation }, 500);
		}

	};
}(window.app = window.app || {}, jQuery));

/**
 * @class app.page
 */
(function (app, $) {

	app.page = {
		title : "",
		type : "",
		setContext : function (o) {
			$.extend(app.page, o);
		},
		params : app.util.getQueryStringParams(window.location.search.substr(1)),
		redirect : function(newURL) {
			var t=setTimeout("window.location.href='"+newURL+"'",0);
		},
		refresh : function() {
			var t=setTimeout("window.location.assign(window.location.href);",500);

		}
	};
}(window.app = window.app || {}, jQuery));

/**
 * @class app.registry
 */
(function (app, $) {
	var $cache = {};
	/**
	 * @function
	 * @description Loads address details to a given address and fills the "Pre-Event-Shipping" address form
	 * @param {String} addressID The ID of the address to which data will be loaded
	 */
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

	/**
	 * @function
	 * @description Loads address details to a given address and fills the "Post-Event-Shipping" address form
	 * @param {String} addressID The ID of the address to which data will be loaded
	 */
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
	/**
	 * @function
	 * @description copy pre-event address fields to post-event address fields
	 */
	function copyBeforeAddress() {
		$cache.addressBeforeFields.each(function () {
			var fieldName = $(this).attr("name");
			var afterField = $cache.addressAfterFields.filter("[name='"+fieldName.replace("Before","After")+"']");
			afterField.val($(this).val());
		});
	}

	/**
	 * @function
	 * @description Disables or enables the post-event address fields depending on a given boolean
	 * @param {Boolean} disabled True to disable; False to enables
	 */
	function setAfterAddressDisabled(disabled) {
		if (disabled) {
			$cache.addressAfterFields.attr("disabled", "disabled");
		}
		else {
			$cache.addressAfterFields.removeAttr("disabled");
		}
	}
	/**
	 * @private
	 * @function
	 * @description Cache initialization of the gift registration
	 */
	function initializeCache() {
		$cache = {
			registryForm : $("form[name$='_giftregistry']"),
			registryItemsTable : $("form[name$='_giftregistry_items']"),
			registryTable : $("#registry-results")
		};
		$cache.copyAddress = $cache.registryForm.find("input[name$='_copyAddress']");
		$cache.addressBeforeFields = $cache.registryForm.find("fieldset[name='address-before'] input:not(:checkbox), fieldset[name='address-before'] select");
		$cache.addressAfterFields = $cache.registryForm.find("fieldset[name='address-after'] input:not(:checkbox), fieldset[name='address-after'] select");
	}
	/**
	 * @private
	 * @function
	 * @description DOM-Object initialization of the gift registration
	 */
	function initializeDom() {
		$cache.addressBeforeFields.filter("[name$='_country']").data("stateField", $cache.addressBeforeFields.filter("[name$='_state']"));
		$cache.addressAfterFields.filter("[name$='_country']").data("stateField", $cache.addressAfterFields.filter("[name$='_state']"));

		if ($cache.copyAddress.length && $cache.copyAddress[0].checked) {
			// fill the address after fields
			copyBeforeAddress();
			setAfterAddressDisabled(true);
		}
	}
	/**
	 * @private
	 * @function
	 * @description Initializes events for the gift registration
	 */
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

		$cache.registryItemsTable.on("click", ".item-details a", function (e) {
			e.preventDefault();
			var productListID = $('input[name=productListID]').val();
			app.quickView.show({
				url : e.target.href,
				source : "giftregistry",
				productlistid : productListID
			});
		});
	}

	/******* app.registry public object ********/
	app.registry = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
			app.product.initAddToCart();

		}

	};

}(window.app = window.app || {}, jQuery));

/**
 * @class app.progress
 */
(function (app, $) {
	var loader;
	app.progress = {
		/**
		 * @function
		 * @description Shows an AJAX-loader on top of a given container
		 * @param {Element} container The Element on top of which the AJAX-Loader will be shown
		 */
		show: function (container) {
			var target = (!container || $(container).length===0) ? $("body") : $(container);
			loader = loader || $(".loader");

			if (loader.length===0) {
				loader = $("<div/>").addClass("loader")
									.append($("<div/>").addClass("loader-indicator"), $("<div/>").addClass("loader-bg"));

			}
			return loader.appendTo(target).show();
		},
		/**
		 * @function
		 * @description Hides an AJAX-loader
		 */
		hide: function () {
			if (loader) { loader.hide(); }
		}
	};
}(window.app = window.app || {}, jQuery));

/**
 * @class app.components
 */
(function (app, dw, $) {
	/**
	 * @function
	 * @description capture recommendation of each product when it becomes visible in the carousel
	 * @param c TBD
	 * @param {Element} li The visible product element in the carousel
	 * @param index TBD
	 * @param state TBD
	 */
	function captureCarouselRecommendations(c, li, index, state) {
		if (!dw) { return; }

		$(li).find(".capture-product-id").each(function () {
			dw.ac.capture({
				id : $(this).text(),
				type : dw.ac.EV_PRD_RECOMMENDATION
			});
		});
	}

	/******* app.components public object ********/
	app.components = {
		carouselSettings : {
			scroll : 1,
			itemFallbackDimension: '100%',
			itemVisibleInCallback : app.captureCarouselRecommendations
		},
		init : function () {
			
			var jcarouselitems = $('.jcarousel ul li').size();
			if(jcarouselitems >= 1) {
				$('.home-category-carousel-first').css('display', 'block');
			}
			var jcarouselitems1 = $('.jcarousel-another ul li').size();
			if(jcarouselitems1 >= 1) {
				$('.home-category-carousel-second').css('display', 'block');
			}
			app.util.checkScriptLoaded(app.scripts.carousel, function(){
				app.util.checkScriptLoaded(app.scripts.swipe, function(){
				setTimeout(function(){
					// renders horizontal/vertical carousels for product slots
					$('#vertical-carousel').jcarousel($.extend({vertical : true}, app.components.carouselSettings));
					var jcarousel = $('.jcarousel');
					jcarousel
		            .on('jcarousel:reload jcarousel:create', function () {
		                var width = jcarousel.innerWidth();

		                if (width >= 600) {
		                    width = width / 3;
		                    
		                } else if (width >= 287) {
		                    width = width / 2;
		                }

		                jcarousel.jcarousel('items').css('width', width + 'px');
		            })
		            .swipe({
				        swipeLeft: function(event, direction, distance, duration, fingerCount) {   
				        	jcarousel.jcarousel('scroll', '+=1');
				        },
				        swipeRight: function(event, direction, distance, duration, fingerCount) {
				        	jcarousel.jcarousel('scroll', '-=1');
				        },
				        triggerOnTouchEnd:false,
				        threshold:5
				    })
		            .jcarousel({
		            		wrap: 'circular',
		            		vertical: false
		            		
		            });
					var jcarousel1 = $('.jcarousel-another');
					
					jcarousel1
		            .on('jcarousel:reload jcarousel:create', function () {
		                var width = jcarousel1.innerWidth();

		                if (width >= 600) {
		                    width = width / 3;
		                    
		                } else if (width >= 287) {
		                    width = width / 2;
		                }

		                jcarousel1.jcarousel('items').css('width', width + 'px');
		            })
		            .swipe({
				        swipeLeft: function(event, direction, distance, duration, fingerCount) {   
				        	jcarousel1.jcarousel('scroll', '+=1');
				        },
				        swipeRight: function(event, direction, distance, duration, fingerCount) {
				        	jcarousel1.jcarousel('scroll', '-=1');
				        },
				        triggerOnTouchEnd:false,
				        threshold:5
				     })
		            .jcarousel({
		            		wrap: 'circular',
		            		vertical: false
		            		
		            });
					
					
		            $('.jcarousel-control-next')
						.on('jcarouselcontrol:active', function() {
							$(this).removeClass('inactive');
							})
						.on('jcarouselcontrol:inactive', function() {
								$(this).addClass('inactive');
							})
		            	.jcarouselControl({
		            		target: '+=1'
		            	});

					$('.jcarousel-pagination')
		            	.on('jcarouselpagination:active', 'a', function() {
		            		$(this).addClass('active');
		            	})
		            	.on('jcarouselpagination:inactive', 'a', function() {
		            		$(this).removeClass('active');
		            	})
		            	.on('click', function(e) {
		            		e.preventDefault();
		            	})
		            	.jcarouselPagination({
		            		item: function(page) {
		            			return '<a href="#' + page + '">' + page + '</a>';
		            		}
		            	});
					
					
				}, 1000);
				});	
			});
		}
	};
}(window.app = window.app || {}, window.dw, jQuery));

/**
 * @class app.cart
 */
(function (app, $) {
	var $cache = {};
	/**
	 * @private
	 * @function
	 * @description Updates the cart with new data
	 * @param {Object} postdata An Object representing the the new or uptodate data
	 * @param {Object} A callback function to be called
	 */
	function updateCart(postdata, callback) {
		var url = app.util.ajaxUrl(app.urls.addProduct);
		$.post(url, postdata, callback || app.cart.refresh);
	}
	/**
	 * @private
	 * @function
	 * @description Cache initialization of the cart page
	 */
	function initializeCache() {
		$cache = {
			cartTable : $("#cart-table"),
			shiptostoreshow : $(".shiptostoreshow"),
			itemsForm : $("#cart-items-form"),
			addCoupon : $("#add-coupon"),
			couponCode : $("form input[name$='_couponCode']")
		};
	}
	/**
	 * @private
	 * @function
	 * @description Binds events to the cart page (edit item's details, bonus item's actions, coupon code entry )
	 */
	function initializeEvents() {
		$cache.cartTable.on("click", ".item-edit-details a", function (e) {
			e.preventDefault();
			app.quickView.show({
				url : e.target.href,
				source : "cart"
			});
		})
		.on("click", ".bonus-item-actions a", function (e) {
			e.preventDefault();
			app.bonusProductsView.show(this.href);
		});
		
		$cache.shiptostoreshow.on("click", ".shiptostore_detail", function (e) {
			e.preventDefault();
            var dlg = app.dialog.create({target: $("#popup-dialog"), options: {
                width: 800,
                height: 600,
                title: "Ship to store",
            }});

           
            var url = app.util.appendParamsToUrl(this.href);
           
            app.ajax.load({
            	
                url: app.util.ajaxUrl(url),
                target: dlg,
                callback: function () {
                    dlg.dialog("open");
                }
            });
        });
		// override enter key for coupon code entry
		$cache.couponCode.on("keydown", function (e) {
			if (e.which === 13 && $(this).val().length===0) { return false; }
		});
		app.util.loadRecommendations();
		$('a.close-btn').click(function(){
			app.dialog.close();
		});
		$("#carousel-recomendations li").each(function(){
			$(this).find('.product-tile').removeClass('tooltip');
		})
	}
	/******* app.cart public object ********/
	app.cart = {
		/**
		 * @function
		 * @description Adds new item to the cart
		 * @param {Object} postdata An Object representing the the new or uptodate data
		 * @param {Object} A callback function to be called
		 */
		add : function (postdata, callback) {
			updateCart(postdata, callback);
		},
		/**
		 * @function
		 * @description Hook for removing item from the cart
		 *
		 */
		remove : function () {
			return;
		},
		/**
		 * @function
		 * @description Updates the cart with new data
		 * @param {Object} postdata An Object representing the the new or uptodate data
		 * @param {Object} A callback function to be called
		 */
		update : function (postdata, callback) {
			updateCart(postdata, callback);
		},
		/**
		 * @function
		 * @description Refreshes the cart without posting
		 */
		refresh : function () {
			// refresh without posting
			app.page.refresh();
		},
		/**
		 * @function
		 * @description Initializes the functionality on the cart
		 */
		init : function () {
			// edit shopping cart line item
			
			initializeCache();
			initializeEvents();
			if(app.enabledStorePickup){
				app.storeinventory.init();
			}
			app.account.initCartLogin();
			app.selectboxes.init();
			app.util.checkScriptLoaded(app.scripts.carousel, function(){
				app.util.checkScriptLoaded(app.scripts.swipe, function(){	
			
			setTimeout(function(){
				$('.inner-wrap ul').appendTo($('.jcarousel-cart-new'));
				if ($('.jcarousel-cart-new').text().length > 0) {
				    $('.jcarousel-control-next').css('height', '29px');
				    $('.jcarousel-cart').css('height', '350px');
				    $('.cart-recomendation-left').css('height', '350px');
				    $('.cart-recomendation-left-mobile').css('height', '81px');
				  }
				
				var jcarousel2 = $('.jcarousel-cart-new');
				jcarousel2
	            		.on('jcarousel:reload jcarousel:create', function () {
	            				var width = jcarousel2.innerWidth();
	            				if (width >= 600) {
	            					width = width / 3;
	                    		} else if (width >= 287) {
	                    			width = width / 2;
	                    		}
	            				jcarousel2.jcarousel('items').css('width', width + 'px');
	            		})
	            .swipe({
			        swipeLeft: function(event, direction, distance, duration, fingerCount) {   
			        	jcarousel2.jcarousel('scroll', '+=1');
			        },
			        swipeRight: function(event, direction, distance, duration, fingerCount) {
			        	jcarousel2.jcarousel('scroll', '-=1');
			        },
			        triggerOnTouchEnd:false,
			        threshold:5
			     })
	            .jcarousel({
	            		wrap: 'circular',
	            		vertical: false
	            		
	            	});
				var jcarousel2 = $('.jcarousel-cart-new');
				$('.jcarousel-pagination-cart')
            	.on('jcarouselpagination:active', 'a', function() {
            		$(this).addClass('active');
            	})
            	.on('jcarouselpagination:inactive', 'a', function() {
            		$(this).removeClass('active');
            	})
            	.on('click', function(e) {
            		e.preventDefault();
            	})
            	.jcarouselPagination({
            		item: function(page) {
            			return '<a href="#' + page + '">' + page + '</a>';
            		},
					carousel: jcarousel2
            	});
					
					}, 500);
					
					
				});
			});
			
			
		}
	};
	
}(window.app = window.app || {}, jQuery));

/**
 * @class app.account
 */
(function (app, $) {
	var $cache = {};
	/**
	 * @private
	 * @function
	 * @description Initializes the events on the address form (apply, cancel, delete)
	 * @param {Element} form The form which will be initialized
	 */
	function initializeAddressForm(form) {
		var form = $("#edit-address-form");

		form.find("input[name='format']").remove();
		app.tooltips.init();
		//$("<input/>").attr({type:"hidden", name:"format", value:"ajax"}).appendTo(form);

		form.on("click", ".apply-button", function(e) {
			e.preventDefault();
			var addressId = form.find("input[name$='_addressid']");
			addressId.val(addressId.val().replace(/[^\w+-]/g, "-"));
			if (!form.valid()) {
				return false;
			}
			var url = app.util.appendParamsToUrl(form.attr('action'),{format:"ajax"});
			var applyName = form.find('.apply-button').attr('name');
			var options = {
				url: url,
				data: form.serialize()+"&"+applyName+'=x',
				type: "POST"
			};
			$.ajax( options ).done(function(data){
				if( typeof(data)!=='string' ) {
					if ( data.success ) {
						app.dialog.close();
						app.page.refresh();
					} else {
						alert(data.message);
						return false;
					}
				} else {
					$('#dialog-container').html(data);
					app.account.init();
					app.tooltips.init();
				}
			});
		})
		.on("click", ".cancel-button, .close-button", function(e){
			e.preventDefault();
			app.dialog.close();
		})
		.on("click", ".delete-button", function(e){
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

		$cache.countrySelect = form.find("select[id$='_country']");
		$cache.countrySelect.on("change", function(){
			app.util.updateStateOptions(this);
		});

		app.validator.init();
	}
	/**
	 * @private
	 * @function
	 * @description Toggles the list of Orders
	 */
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
	/**
	 * @private
	 * @function
	 * @description Binds the events on the address form (edit, create, delete)
	 */
	function initAddressEvents() {
		var addresses = $("#addresses");
		if (addresses.length===0) { return; }

		addresses.on("click", "a.address-edit, a.address-create", function(e){
		/*	e.preventDefault();
			var options = {open: initializeAddressForm};
			app.dialog.open({url:this.href, options:options});
		*/}).on("click", ".delete", function(e){
			e.preventDefault();
			if (confirm(String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_ADDRESS))) {
				$.ajax({
					url: app.util.appendParamsToUrl($(this).attr("href"), {format:"ajax"}),
					dataType:"json"
				}).done(function(data){
					if (data.status.toLowerCase()==="ok") {
						app.page.redirect(app.urls.addressesList);
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
	}
	/**
	 * @private
	 * @function
	 * @description Binds the events of the payment methods list (delete card)
	 */
	function initPaymentEvents() {
		var paymentList = $(".payment-list");
		if (paymentList.length===0) { return; }

		app.util.setDeleteConfirmation(paymentList, String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_CREDITCARD));

		$("form[name='payment-remove']").on("submit", function(e){
			e.preventDefault();
			// override form submission in order to prevent refresh issues
			var button = $(this).find("button.delete");
			$("<input/>").attr({type:"hidden", name:button.attr("name"), value:button.attr("value")||"delete card"}).appendTo($(this));
			var data = $(this).serialize();
			$.ajax({
				type: "POST",
				url: $(this).attr("action"),
				data: data
			})
			.done(function(response) {
				app.page.redirect(app.urls.paymentsList);
			});
		});
	}
	/** 
	 * @private 
	 * @function 
	 * @description init events for the loginPage
	 */
	function initLoginPage() {
		
		//o-auth binding for which icon is clicked
		$('.oAuthIcon').bind( "click", function() {
			$('#OAuthProvider').val(this.id);
		});	
		$(".close-button").bind( "click", function() {
			alert('ok');
			e.preventDefault();
			app.dialog.close();
		});
		//toggle the value of the rememberme checkbox
		$( "#dwfrm_login_rememberme" ).bind( "change", function() {
			if($('#dwfrm_login_rememberme').attr('checked')){
				$('#rememberme').val('true')
			}else{
				$('#rememberme').val('false')
			}
		});
		$("#dwfrm_login_password").parent().find("label>span:last").after("<span class='paswword-characters'>(5-20 characters)</span>");
		$("#dwfrm_login_rememberme").parent().find("label").addClass("remeber-me-login");
		$("#dwfrm_profile_login_password").parent().find("label>span:last").after("<span class='paswword-characters'>(5-20 characters)</span>");
		$("#dwfrm_profile_address_address2").parent().find("label>span:last").after("<span class='paswword-characters'>(optional)</span>");
		$("#dwfrm_profile_address_phone").parent().find("label>span:last").after("<span>Number</span>");
		$("#dwfrm_resetpassword_password").parent().find("label>span:last").after("<span class='paswword-characters'>(5-20 characters)</span>");
		
		 $('.login-register').on('click', function(event){
			 event.preventDefault();
			 $(this).toggleClass('active');
			 $('.checkout-login-inner-small').toggle();
			
		 });
		 $('#dwfrm_profile_address_phone').on('blur', function(){
			var mylength = $(this).parent().find("span.error").text().length;
			$(".account-phone-number-tooltip").css('top', '-54px');
			if(mylength > 1) {
				$(".account-phone-number-tooltip").css('top', '-77px');
			}
			
			if($(this).parent().find("span.error").css("display")=="none") {
				$(".account-phone-number-tooltip").css('top', '-54px');
			}
		 });
		var windoww=$(window).width();
		 if(windoww < 767) {
			 $('.login-create-account').prependTo('.col-1');
			 $('.account-nav-asset').appendTo('.my-account-global');
		 }
		 $(window).resize(function() {
			 var windowr=$(window).width();
			 if(windowr < 767) {
				
				 if(!$('.login-register').hasClass('active')){
					 $('.checkout-login-inner-small').css('display', 'none'); 
				 };
				 $('.login-create-account').prependTo('.col-1');
				 $('.account-nav-asset').appendTo('.my-account-global');
				
				 
			 }
			 else {
				 $('.checkout-login-inner-small').css('display', 'block');
				 $('.login-create-account').prependTo('.col-2');
				 $('.account-nav-asset').appendTo('.my-account-global');
				}
		 });
		app.checkboxes.init();	
		
	}
	/**
	 * @private
	 * @function
	 * @description Binds the events of the order, address and payment pages
	 */
	function initializeEvents() {
		toggleFullOrder();
		initAddressEvents();
		initPaymentEvents();
		initLoginPage();
	}

	/******* app.account public object ********/
	app.account = {
		/**
		 * @function
		 * @description Binds the events of the order, address and payment pages
		 */
		init : function () {
			initializeEvents();
			app.giftcert.init();
		},
		initCartLogin : function () {
			initLoginPage();
				
		}
		
	};
	
}(window.app = window.app || {}, jQuery));

/**
 * @class app.wishlist
 */
(function (app, $) {
	var $cache = {};
	/**
	 * @private
	 * @function
	 * @description Binds the send to friend and address changed events to the wishlist page
	 */
	function initializeEvents() {
		app.sendToFriend.initializeDialog("div.list-table-header", ".send-to-friend");
		$cache.editAddress.on('change', function () {
			window.location.href = app.util.appendParamToURL(app.urls.wishlistAddress, "AddressID", $(this).val());

		});
		
		//add js logic to remove the , from the qty feild to pass regex expression on client side
		jQuery('.option-quantity-desired div input').focusout(function(){		
			$(this).val($(this).val().replace(',',''));	
		});
	}


	/******* app.wishlist public object ********/
	app.wishlist = {
		/**
		 * @function
		 * @description Binds events to the wishlist page
		 */
		init : function () {
			$cache.editAddress = $('#editAddress');
			$cache.wishlistTable = $('.pt_wish-list .item-list');
			app.product.initAddToCart();
			initializeEvents();

		}
	};
}(window.app = window.app || {}, jQuery));

/**
 * @class app.minicart
 */
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
	/******* app.minicart public object ********/
	app.minicart = {
		url : "", // during page loading, the Demandware URL is stored here

		/**
		 * @function
		 * @description Cache initializations and event binding to the mimcart
		 */
		init : function () {
			$cache.minicart = $("#mini-cart");
			$cache.mcTotal = $cache.minicart.find(".mini-cart-total");
			$cache.mcContent = $cache.minicart.find(".mini-cart-content");
			$cache.mcClose = $cache.minicart.find(".mini-cart-close");
			$cache.mcProductList = $cache.minicart.find(".mini-cart-products");
			$cache.mcProducts = $cache.mcProductList.children(".mini-cart-product");

			var collapsed = $cache.mcProductList.children().not(":first").addClass("collapsed");


			// bind hover event to the cart total link at the top right corner
			$cache.minicart.on("mouseenter", ".mini-cart-total", function () {
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

			initialized = true;
		},
		/**
		 * @function
		 * @description Shows the given content in the mini cart
		 * @param {String} A HTML string with the content which will be shown
		 */
		show : function (html) {
			$cache.minicart.html(html);
			app.util.scrollBrowser(0);
			app.minicart.init();
			app.minicart.slide();
			app.bonusProductsView.loadBonusOption();
		},
		/**
		 * @function
		 * @description Slides down and show the contents of the mini cart
		 */
		slide : function () {
			if(!initialized) {
				app.minicart.init();
			}

			if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
				return;
			}

			timer.clear();

			// show the item
			$cache.mcContent.slideDown('slow');

			// after a time out automatically close it
			timer.start(6000);
		},
		/**
		 * @function
		 * @description Closes the mini cart with given delay
		 * @param {Number} delay The delay in milliseconds
		 */
		close : function (delay) {
			timer.clear();
			$cache.mcContent.slideUp();
		},
		/**
		 * @function
		 * @description Hook which can be replaced by individual pages/page types (e.g. cart)
		 */
			suppressSlideDown : function () {
			return false;
		}
	};
}(window.app = window.app || {}, jQuery));

/**
 * @class app.dialog
 */
(function (app, $) {
	// private

	var $cache = {};
	// end private

	/******* app.dialog public object ********/
	app.dialog = {
		/**
		 * @function
		 * @description Appends a dialog to a given container (target)
		 * @param {Object} params  params.target can be an id selector or an jquery object
		 */
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
			$cache.container.dialog($.extend(true, {}, app.dialog.settings, params.options || {}));
			return $cache.container;
		},
		/**
		 * @function
		 * @description Opens a dialog using the given url (params.url)
		 * @param {Object} params.url should contain the url
		 */
		open : function (params) {
			if (!params.url || params.url.length===0) { return; }

			$cache.container = app.dialog.create(params);
			params.url = app.util.appendParamsToUrl(params.url, {format:"ajax"});

			// finally load the dialog
			app.ajax.load({
				target : $cache.container,
				url : params.url,
				callback : function () {

					if($cache.container.dialog("isOpen")) {	return;	}
					$cache.container.dialog("open");
					$(".close-button").click(function(e){
						e.preventDefault();
						app.dialog.close();
					});
				}
			});

		},
		/**
		 * @function
		 * @description Closes the dialog and triggers the "close" event for the dialog
		 */
		close : function () {
			if(!$cache.container) {
				return;
			}
			$cache.container.dialog("close");
		},
		/**
		 * @function
		 * @description Triggers the "apply" event for the dialog
		 */
		triggerApply : function () {
			$(this).trigger("dialogApplied");
		},
		/**
		 * @function
		 * @description Attaches the given callback function upon dialog "apply" event
		 */
		onApply : function (callback) {
			if(callback) {
				$(this).bind("dialogApplied", callback);
			}
		},
		/**
		 * @function
		 * @description Triggers the "delete" event for the dialog
		 */
		triggerDelete : function () {
			$(this).trigger("dialogDeleted");
		},
		/**
		 * @function
		 * @description Attaches the given callback function upon dialog "delete" event
		 * @param {String} The callback function to be called
		 */
		onDelete : function (callback) {
			if(callback) {
				$(this).bind("dialogDeleted", callback);
			}
		},
		/**
		 * @function
		 * @description Submits the dialog form with the given action
		 * @param {String} The action which will be triggered upon form submit
		 */
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
			/**
			 * @function
			 * @description The close event
			 */
			close : function (event, ui) {
				$(this).dialog("destroy");
			}
		}
	};
}(window.app = window.app || {}, jQuery));

/**
 * @class app.validator
 */
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
			email : /^[\w.%+\-]+@[\w.\-]+\.[\w]{2,6}$/
		},
		settings = {
			// global form validator settings
			errorClass : 'error',
			errorElement : 'span',
			onkeyup : false,
			onfocusout : function (element) {
				if(!this.checkable(element)) {
					this.element(element);
				}
			}
		},
		validatorInitialized = false;
	/**
	 * @function
	 * @description Validates a given phone number against the countries phone regex
	 * @param {String} value The phone number which will be validated
	 * @param {String} el The input field
	 */
	function validatePhone(value, el) {
		var country = $(el).closest("form").find(".country");
		if(country.length === 0 || country.val().length === 0 || !regex.phone[country.val().toLowerCase()]) {
			return true;
		}

		var rgx = regex.phone[country.val().toLowerCase()];
		var isOptional = this.optional(el);
		var isValid = rgx.test($.trim(value));

		return isOptional || isValid;
	}
	/**
	 * @function
	 * @description Validates a given email
	 * @param {String} value The email which will be validated
	 * @param {String} el The input field
	 */
	function validateEmail(value, el) {
		var isOptional = this.optional(el);
		var isValid = regex.email.test($.trim(value));
		return isOptional || isValid;
	}

	/******* app.validator public object ********/
	app.validator = {
		regex : regex,
		settings : settings,
		init : function () {
			app.util.checkScriptLoaded(app.scripts.validator, function(){
				if(!validatorInitialized){
					/**
					 * Add phone validation method to jQuery validation plugin.
					 * Text fields must have 'phone' css class to be validated as phone
					 */
					$.validator.addMethod("phone", validatePhone, app.resources.INVALID_PHONE);

					/**
					 * Add email validation method to jQuery validation plugin.
					 * Text fields must have 'email' css class to be validated as email
					 */
					$.validator.addMethod("email", validateEmail, app.resources.INVALID_EMAIL);

					/**
					 * Add gift cert amount validation method to jQuery validation plugin.
					 * Text fields must have 'gift-cert-amont' css class to be validated
					 */
					$.validator.addMethod("gift-cert-amount", function(value, el){
						var isOptional = this.optional(el);
						var isValid = (!isNaN(value)) && (parseFloat(value)>=10) && (parseFloat(value)<=400);
						return isOptional || isValid;
					}, app.resources.GIFT_CERT_AMOUNT_INVALID);

					/**
					 * Add positive number validation method to jQuery validation plugin.
					 * Text fields must have 'positivenumber' css class to be validated as positivenumber
					 */
					$.validator.addMethod("positivenumber", function (value, element) {
						if($.trim(value).length === 0) { return true; }
						return (!isNaN(value) && Number(value) >= 0);
					}, "");
					// "" should be replaced with error message if needed

					$.validator.messages.required = function ($1, ele, $3) {
						var requiredText = $(ele).parents('.form-row').attr('data-required-text');
						return requiredText||"";
					};
				}
				$("form:not(.suppress)").each(function () {
					$(this).validate(app.validator.settings);
				});
			});
		},
		initForm : function(f) {
			$(f).validate(app.validator.settings);
		}
	};
}(window.app = window.app || {}, jQuery));

/**
 * @class app.ajax
 */
(function (app, $) {

	var currentRequests = [];
	// request cache

	// sub namespace app.ajax.* contains application specific ajax components
	app.ajax = {
		/**
		 * @function
		 * @description Ajax request to get json response
		 * @param {Boolean} async  Asynchronous or not
		 * @param {String} url URI for the request
		 * @param {Object} data Name/Value pair data request
		 * @param {Function} callback  Callback function to be called
		 */
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
		/**
		 * @function
		 * @description ajax request to load html response in a given container
		 * @param {String} url URI for the request
		 * @param {Object} data Name/Value pair data request
		 * @param {Function} callback  Callback function to be called
		 * @param {Object} target Selector or element that will receive content
		 */
		load : function (options) {
			options.url = app.util.toAbsoluteUrl(options.url);
			// return if no url exists or url matches a current request
			if(!options.url || currentRequests[options.url]) {
				return;
			}

			currentRequests[options.url] = true;

			//GET or POST
			if("ajaxType" in options){
				var t = options.ajaxType;
			}else{
				var t = "GET";
			}
			
			// make the server call
			$.ajax({
				dataType : "html",
				type : t,
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

/**
 * @class app.searchsuggest
 */
(function (app, $) {
	var qlen = 0,
		listTotal = -1,
		listCurrent = -1,
		delay = 300,
		fieldDefault = null,
		suggestionsJson = null,
		$searchForm,
		$searchField,
		$searchContainer,
		$resultsContainer;
	/**
	 * @function
	 * @description Handles keyboard's arrow keys
	 * @param keyCode Code of an arrow key to be handled
	 */
	function handleArrowKeys(keyCode) {
		switch (keyCode) {
			case 38:
				// keyUp
				listCurrent = (listCurrent <= 0) ? (listTotal - 1) : (listCurrent - 1);
				break;
			case 40:
				// keyDown
				listCurrent = (listCurrent >= listTotal - 1) ? 0 : listCurrent + 1;
				break;
			default:
				// reset
				listCurrent = -1;
				return false;
		}

		$resultsContainer.children().removeClass("selected").eq(listCurrent).addClass("selected");
		$searchField.val($resultsContainer.find(".selected div.suggestionterm").first().text());
		return true;
	}

	/******* app.searchsuggest public object ********/
	app.searchsuggest = {
		/**
		 * @function
		 * @description Configures parameters and required object instances
		 */
		init : function (container, defaultValue) {
			// initialize vars
			$searchContainer = $(container);
			$searchForm = $searchContainer.find("form[name='simpleSearch']");
			$searchField = $searchForm.find("input[name='q']");
			fieldDefault = defaultValue;

			// disable browser auto complete
			$searchField.attr("autocomplete", "off");

			// on focus listener (clear default value)
			$searchField.focus(function () {
				if(!$resultsContainer) {
					// create results container if needed
					$resultsContainer = $("<div/>").attr("id", "suggestions").appendTo($searchContainer).css({
						"top" : $searchContainer[0].offsetHeight,
						"left" : 0,
						"width" : $searchField[0].offsetWidth
					});
				}
				if($searchField.val() === fieldDefault) {
					$searchField.val("");
				}
			});
			// on blur listener
			$searchField.blur(function () {
				setTimeout(app.searchsuggest.clearResults, 200);
			});
			// on key up listener
			$searchField.keyup(function (e) {

				// get keyCode (window.event is for IE)
				var keyCode = e.keyCode || window.event.keyCode;

				// check and treat up and down arrows
				if(handleArrowKeys(keyCode)) {
					return;
				}
				// check for an ENTER or ESC
				if(keyCode === 13 || keyCode === 27) {
					app.searchsuggest.clearResults();
					return;
				}

				var lastVal = $searchField.val();

				// if is text, call with delay
				setTimeout(function () { app.searchsuggest.suggest(lastVal); }, delay);
			});
			// on submit we do not submit the form, but change the window location
			// in order to avoid https to http warnings in the browser
			// only if it's not the default value and it's not empty
			$searchForm.submit(function (e) {
				e.preventDefault();
				var searchTerm = $searchField.val();
				if(searchTerm === fieldDefault || searchTerm.length === 0) {
					return false;
				}
				window.location = app.util.appendParamToURL($(this).attr("action"), "q", searchTerm);
			});
		},

		/**
		 * @function
		 * @description trigger suggest action
		 * @param lastValue
		 */
		suggest : function (lastValue) {
			// get the field value
			var part = $searchField.val();

			// if it's empty clear the resuts box and return
			if(part.length === 0) {
				app.searchsuggest.clearResults();
				return;
			}

			// if part is not equal to the value from the initiated call,
			// or there were no results in the last call and the query length
			// is longer than the last query length, return
			// #TODO: improve this to look at the query value and length
			if((lastValue !== part) || (listTotal === 0 && part.length > qlen)) {
				return;
			}
			qlen = part.length;

			// build the request url
			var reqUrl = app.util.appendParamToURL(app.urls.searchsuggest, "q", part);
            reqUrl = app.util.appendParamToURL(reqUrl, "legacy", "true");
            
			// get remote data as JSON
			$.getJSON(reqUrl, function (data) {
				// get the total of results
				var suggestions = data,
					ansLength = suggestions.length,
					listTotal = ansLength;

				// if there are results populate the results div
				if(ansLength === 0) {
					app.searchsuggest.clearResults();
					return;
				}
				suggestionsJson = suggestions;
				var html = "";
				var i, len=ansLength;
				for(i=0; i < len; i++) {
					html+='<div><div class="suggestionterm">'+suggestions[i].suggestion+'</div><span class="hits">'+suggestions[i].hits+'</span></div>';
				}

				// update the results div
				$resultsContainer.html(html).show().on("hover", "div", function () {
					$(this).toggleClass = "selected";
				}).on("click", "div", function () {
					// on click copy suggestion to search field, hide the list and submit the search
					$searchField.val($(this).children(".suggestionterm").text());
					app.searchsuggest.clearResults();
					$searchForm.trigger("submit");
				});
			});
		},
		/**
		 * @function
		 * @description
		 */
		clearResults : function () {
			if (!$resultsContainer) { return; }
			$resultsContainer.empty().hide();
		}
	};
}(window.app = window.app || {}, jQuery));

/**
 * @class app.searchsuggestbeta
 */
(function (app, $) {
	var currentQuery = null,
	    lastQuery = null,
	    runningQuery = null,
        listTotal = -1,
		listCurrent = -1,
		delay = 30,
		fieldDefault = null,
		$searchForm,
		$searchForm2,
		$searchField,
		$searchField2,
		$searchContainer,
		$searchContainer2,
		$resultsContainer,
		$resultsContainer2;
	/**
	 * @function
	 * @description Handles keyboard's arrow keys
	 * @param keyCode Code of an arrow key to be handled
	 */
	function handleArrowKeys(keyCode) {
		switch (keyCode) {
			case 38:
				// keyUp
				listCurrent = (listCurrent <= 0) ? (listTotal - 1) : (listCurrent - 1);
				break;
			case 40:
				// keyDown
				listCurrent = (listCurrent >= listTotal - 1) ? 0 : listCurrent + 1;
				break;
			default:
				// reset
				listCurrent = -1;
				return false;
		}

		$resultsContainer.children().removeClass("selected").eq(listCurrent).addClass("selected");
		$resultsContainer2.children().removeClass("selected").eq(listCurrent).addClass("selected");
		$searchField.val($resultsContainer.find(".selected div.suggestionterm").first().text());
		$searchField2.val($resultsContainer.find(".selected div.suggestionterm").first().text());
		return true;
	}

	/******* app.searchsuggestBeta public object ********/
	app.searchsuggestbeta = {
		/**
		 * @function
		 * @description Configures parameters and required object instances
		 */
		init : function (container, mobileContainer, defaultValue) {
			// initialize vars
			$searchContainer = $(container);
			$searchContainer2 = $(mobileContainer);
			$searchForm = $searchContainer.find("form[name='simpleSearch']");
			$searchForm2 = $searchContainer2.find("form[name='simpleSearch']");
			$searchField = $searchForm.find("input[name='q']");
			$searchField2 = $searchForm2.find("input[name='q']");
			fieldDefault = defaultValue;

			// disable browser auto complete
			$searchField.attr("autocomplete", "off");
			$searchField2.attr("autocomplete", "off");

			// on focus listener (clear default value)
			$searchField.focus(function () {
				if(!$resultsContainer) {
					// create results container if needed
					$resultsContainer = $("<div/>").attr("id", "search-suggestions").appendTo($searchContainer);
				}
				if($searchField.val() === fieldDefault) {
					$searchField.val("");
				}
			});
			$searchField2.focus(function () {
				if(!$resultsContainer2) {
					// create results container if needed
					$resultsContainer2 = $("<div/>").attr("id", "search-suggestions").appendTo($searchContainer2);
				}
				if($searchField2.val() === fieldDefault) {
					$searchField2.val("");
				}
			});
			// on blur listener
			$searchField.blur(function () {
				setTimeout(app.searchsuggestbeta.clearResults, 200);
			});
			$searchField2.blur(function () {
				setTimeout(app.searchsuggestbeta.clearResults, 200);
			});
			// on key up listener
			$searchField.keyup(function (e) {

				// get keyCode (window.event is for IE)
				var keyCode = e.keyCode || window.event.keyCode;

				// check and treat up and down arrows
				if(handleArrowKeys(keyCode)) {
					return;
				}
				// check for an ENTER or ESC
				if(keyCode === 13 || keyCode === 27) {
					app.searchsuggestbeta.clearResults();
					return;
				}

				currentQuery = $searchField.val().trim();

                // no query currently running, init a update
                if (runningQuery == null)
                {
                    runningQuery = currentQuery;
                    setTimeout("app.searchsuggestbeta.suggest()", delay);
                }
			});
			$searchField2.keyup(function (e) {

				// get keyCode (window.event is for IE)
				var keyCode = e.keyCode || window.event.keyCode;

				// check and treat up and down arrows
				if(handleArrowKeys(keyCode)) {
					return;
				}
				// check for an ENTER or ESC
				if(keyCode === 13 || keyCode === 27) {
					app.searchsuggestbeta.clearResults();
					return;
				}

				currentQuery = $searchField2.val().trim();

                // no query currently running, init a update
                if (runningQuery == null)
                {
                    runningQuery = currentQuery;
                    setTimeout("app.searchsuggestbeta.suggest()", delay);
                }
			});
		},

        /**
		 * @function
		 * @description trigger suggest action
		 */
		suggest : function()
		{
		    // check whether query to execute (runningQuery) is still up to date and had not changed in the meanwhile
            // (we had a little delay)
            if (runningQuery !== currentQuery)
            {
                // update running query to the most recent search phrase
                runningQuery = currentQuery;
            }

            // if it's empty clear the results box and return
            if(runningQuery.length === 0) {
                app.searchsuggestbeta.clearResults();
                runningQuery = null;
                return;
            }

            // if the current search phrase is the same as for the last suggestion call, just return
            if (lastQuery === runningQuery)
            {
                runningQuery = null;
                return;
            }

            // build the request url
            var reqUrl = app.util.appendParamToURL(app.urls.searchsuggest, "q", runningQuery);
            reqUrl = app.util.appendParamToURL(reqUrl, "legacy", "false");

            // execute server call
            $.get(reqUrl, function (data)
            {

                var suggestionHTML = data,
                    ansLength = suggestionHTML.trim().length;

                // if there are results populate the results div
                if(ansLength === 0) {
                    app.searchsuggestbeta.clearResults();
                }
                else
                {
                    // update the results div
                    if(typeof($resultsContainer) != 'undefined') {$resultsContainer.html(suggestionHTML).fadeIn(200);};
 					if(typeof($resultsContainer2) != 'undefined') {$resultsContainer2.html(suggestionHTML).fadeIn(200);};
                }

                // record the query that has been executed
                lastQuery = runningQuery;
                // reset currently running query
                runningQuery = null;

                // check for another required update (if current search phrase is different from just executed call)
                if (currentQuery !== lastQuery)
                {
                    // ... and execute immediately if search has changed while this server call was in transit
                    runningQuery = currentQuery;
                    setTimeout("app.searchsuggestbeta.suggest()", delay);
                }
                app.searchsuggestbeta.hideLeftPanel();
            });
		},
		/**
		 * @function
		 * @description
		 */
		clearResults : function () {
			if (!$resultsContainer) { return; }
			$resultsContainer.fadeOut(200, function() {$resultsContainer.empty()});
			if (!$resultsContainer2) { return; }
			$resultsContainer2.fadeOut(200, function() {$resultsContainer2.empty()});
		},
		/**
		 * @function
		 * @description
		 */
		hideLeftPanel : function () {
			//hide left panel if there is only a matching suggested custom phrase
			if($('.search-suggestion-left-panel-hit').length == 1 && ($('.search-phrase-suggestion a').text().replace(/(^[\s]+|[\s]+$)/g, '').toUpperCase() == $('.search-suggestion-left-panel-hit a').text().toUpperCase())){
				$('.search-suggestion-left-panel').css('display','none');
				$('.search-suggestion-wrapper-full').addClass('search-suggestion-wrapper');
				$('.search-suggestion-wrapper').removeClass('search-suggestion-wrapper-full');
			}
		}
	};
}(window.app = window.app || {}, jQuery));

/**
 * @class app.searchplaceholder
 */
(function (app, $) {
	/**
	 * @private
	 * @function
	 * @description Binds event to the place holder (.blur)
	 */
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

	/******* app.searchplaceholder public object ********/
	app.searchplaceholder = {
		/**
		 * @function
		 * @description Binds event to the place holder (.blur)
		 */
		init : function () {
			initializeEvents();
		}
	};
}(window.app = window.app || {}, jQuery));

/**
 * @class app.storeinventory
 */
(function (app, $) {

	var $cache = {};
	var pid = null;
	var currentTemplate = jQuery('#wrapper.pt_cart').length ? "cart" : "pdp";

	/******* app.storeinventory public object ********/
	app.storeinventory = {
		/**
		 * @function
		 * @description
		 */
	 	init : function(){
			app.storeinventory.initializeCache();
			app.storeinventory.initializeDom();
		},

	 	initializeCache : function () {
 			$cache = {
 				preferredStorePanel : jQuery('<div id="preferred-store-panel"/> '),
 				storeList : jQuery('<div class="store-list"/>')
 			};
 		},

  		initializeDom: function(){
  			// check for items that trigger dialog
  			jQuery('#cart-table .set-preferred-store').on('click', function(e){
  				e.preventDefault();
 				app.storeinventory.loadPreferredStorePanel(jQuery(this).parent().attr('id'));
  			});
  			
  			//disable the radio button for home deliveries if the store inventory is out of stock
  			jQuery('#cart-table .item-delivery-options .home-delivery .not-available').each(function(){
  				jQuery(this).parents('.home-delivery').children('input').attr('disabled','disabled');
  			});
  			

  			jQuery('body').on('click', '#pdpMain .set-preferred-store', function(e){
 				e.stopImmediatePropagation();
  				e.preventDefault();
 				app.storeinventory.loadPreferredStorePanel(jQuery(this).parent().attr('id'));
  			});

  			jQuery('.item-delivery-options input.radio-url').click(function(){
  				app.storeinventory.setLineItemStore(jQuery(this));
  			});

  			if(jQuery(".checkout-shipping").length > 0) app.storeinventory.shippingLoad();

  			//disable the cart button if there is pli set to instore and the status is 'Not Available' and it is marked as an instore pli
  			jQuery('.item-delivery-options').each(function(){
  				if((jQuery(this).children(".instore-delivery").children("input").attr('disabled')=='disabled')
  						&&  (jQuery(this).children('.instore-delivery').children('.selected-store-availability').children('.store-error').length > 0)
  							&& (jQuery(this).children(".instore-delivery").children("input").attr('checked')=='checked')
  				){
  					jQuery('.cart-action-checkout button').attr("disabled", "disabled");
  				}
  			});
 		},

		setLineItemStore: function(radio) {

			jQuery(radio).parent().parent().children().toggleClass('hide');
			jQuery(radio).parent().parent().toggleClass('loading');

			app.ajax.getJson({
				url: app.util.appendParamsToUrl(jQuery(radio).attr('data-url') , {storeid : jQuery(radio).siblings('.storeid').attr('value')}),
				callback: function(data){

					jQuery(radio).attr('checked','checked');
					jQuery(radio).parent().parent().toggleClass('loading');
					jQuery(radio).parent().parent().children().toggleClass('hide');

				}
			});

			//scan the plis to see if there are any that are not able to go through checkout, if none are found re-enable the checkout button
			var countplis = 0;
			jQuery('.item-delivery-options').each(function(){

  				if((jQuery(this).children(".instore-delivery").children("input").attr('disabled')=='disabled')
  						&&  (jQuery(this).children('.instore-delivery').children('.selected-store-availability').children('.store-error').length > 0)
  							&& (jQuery(this).children(".instore-delivery").children("input").attr('checked')=='checked')
  				){
  					jQuery('.cart-action-checkout button').attr("disabled", "disabled");
  				}else{
  					countplis++;
  				}
  			});
  			if(countplis > 0 && jQuery('.error-message').length == 0){
  				jQuery('.cart-action-checkout button').removeAttr("disabled", "disabled")

  			}


		},

 		buildStoreList: function(pid) {

 			// request results from server
 			app.ajax.getJson({
 				url: app.util.appendParamsToUrl(app.urls.storesInventory , {pid:pid, zipCode:app.user.zip}),
 				callback: function(data){

 					// clear any previous results, then build new
 					$cache.storeList.empty();
 					var listings = jQuery("<ul class='store-list'/>");
 					if(data && data.length > 0) {
 						for (var i=0; i < 10 && i < data.length; i++) {
 							var item=data[i];

 							//Disable button if there is no stock for item
 							if(item.statusclass == "store-in-stock"){
						    		var displayButton = '<button value="'+ item.storeId +'" class="button-style-1 select-store-button" data-stock-status="'+item.status+'">' + app.resources.SELECT_STORE + '</button>';
						    	}
						    	else
						    	{
						    		var displayButton = '<button value="'+ item.storeId +'" class="button-style-1 select-store-button" data-stock-status="'+item.status+'" disabled="disabled">' + app.resources.SELECT_STORE + '</button>';
						    	}

							// list item for cart
							if(currentTemplate === 'cart') {

								listings.append('<li class="store-' +item.storeId + item.status.replace(/ /g,'-') + ' store-tile">' +
							    		'<span class="store-tile-address ">' + item.address1 + ',</span>' +
								    	'<span class="store-tile-city ">' + item.city + '</span>' +
								    	'<span class="store-tile-state ">' + item.stateCode + '</span>' +
								    	'<span class="store-tile-postalCode ">' + item.postalCode + '</span>' +
								    	'<span class="store-tile-status ' + item.statusclass + '">' + item.status + '</span>' +
								    	displayButton +
								    	'</li>');
							}

							// list item for pdp
							else {
								listings.append('<li class="store-' +item.storeId +' ' + item.status.replace(/ /g,'-') + ' store-tile">' +
							    		'<span class="store-tile-address ">' + item.address1 + ',</span>' +
								    	'<span class="store-tile-city ">' + item.city + '</span>' +
								    	'<span class="store-tile-state ">' + item.stateCode + '</span>' +
								    	'<span class="store-tile-postalCode ">' + item.postalCode + '</span>' +
								    	'<span class="store-tile-status ' + item.statusclass + '">' + item.status + '</span>' +
								    	displayButton +
								    	'</li>');
							}
 						}
 					}

 					// no records
 					else {
 						if(app.user.zip){
 							$cache.storeList.append("<div class='no-results'>No Results</div>");
 						}
 					}

 					// set up pagination for results
 					var storeTileWidth = 176;
 					var numListings = listings.find('li').size();
 					var listingsNav = jQuery('<div id="listings-nav"/>');
 					for(var i = 0, link = 1; i <= numListings; i++){
 						if(numListings >  i) { listingsNav.append('<a data-index="'+ i +'">'+link+'</a>'); }
 					    	link++;
 					    	i = i + 2;
 					}
 					listingsNav.find('a').click(function(){
 						jQuery(this).siblings().removeClass('active');
 					    	jQuery(this).addClass('active');
 					    	jQuery('ul.store-list').animate({'left' : (storeTileWidth * jQuery(this).data('index') * -1) },1000);
 					}).first().addClass('active');
 					$cache.storeList.after(listingsNav);

 					// check for preferred store id, highlight, move to top
 					if(currentTemplate === 'cart'){
 					    var selectedButtonText = app.resources.SELECTED_STORE;
 					}
 					else {
 						var selectedButtonText = app.resources.PREFERRED_STORE;
 					}
 					listings.find('li.store-'+app.user.storeId).addClass('selected').find('button.select-store-button ').text(selectedButtonText);

 					app.storeinventory.bubbleStoreUp(listings,app.user.storeId);

 					// if there is a block to show results on page (pdp)
 					if( currentTemplate !== 'cart' ) {

 						var onPageList = listings.clone();
 					    	var thisDiv = jQuery('div#' + pid);

 					    	thisDiv.find('ul.store-list').remove();
 					    	thisDiv.append(onPageList);

 					    	if( onPageList.find('li').size() > 1 ){
 					    		thisDiv.find('li:gt(0)').each(function(){
 					    			jQuery(this).addClass('extended-list');
 					    		});
 					    		jQuery('.more-stores').remove();
 					    		thisDiv.after('<span class="more-stores">' + app.resources.SEE_MORE + '</span>');
 						    	thisDiv.parent().find('.more-stores').click(function(){
 						    		if( jQuery(this).text() ===  app.resources.SEE_MORE) {
 						    			jQuery(this).text(app.resources.SEE_LESS).addClass('active');
 						    		}
 						    		else {
 						    			jQuery(this).text(app.resources.SEE_MORE).removeClass('active');
 						    		}
 						    		thisDiv.find(' ul.store-list').toggleClass('expanded');

 						    	});
 					    	}

 					}

 					// update panel with new list
 					listings.width(numListings * storeTileWidth).appendTo($cache.storeList);

 					// set up 'set preferred store' action on new elements
 					listings.find('button.select-store-button').click(function(e){

 						var selectedStoreId = jQuery(this).val();

 						if(currentTemplate === 'cart') {

 							//update selected store and set the lineitem
 							var liuuid = jQuery('#preferred-store-panel').find('.srcitem').attr('value');
 							jQuery('div[name="'+liuuid+'-sp"] .selected-store-address').html(jQuery(this).siblings('.store-tile-address').text()+' <br />'+jQuery(this).siblings('.store-tile-city').text()+' , '+jQuery(this).siblings('.store-tile-state').text()+' '+jQuery(this).siblings('.store-tile-postalCode').text());
 							jQuery('div[name="'+liuuid+'-sp"] .storeid').val(jQuery(this).val());
 							jQuery('div[name="'+liuuid+'-sp"] .selected-store-availability').html(jQuery(this).siblings('.store-tile-status'));
 							jQuery('div[name="'+liuuid+'-sp"] .radio-url').removeAttr('disabled');
 							jQuery('div[name="'+liuuid+'-sp"] .radio-url').click();
 							$cache.preferredStorePanel.dialog("close");

 						}else{

	 						if( app.user.storeId !== selectedStoreId ) {

	 							// set as selected
	 							app.storeinventory.setPreferredStore(selectedStoreId);
	 							app.storeinventory.bubbleStoreUp (onPageList, selectedStoreId);
	 							jQuery('.store-list li.selected').removeClass('selected').find('button.select-store-button').text(app.resources.SELECT_STORE);
	 							jQuery('.store-list li.store-'+selectedStoreId+' button.select-store-button').text(app.resources.PREFERRED_STORE).parent().addClass('selected');
	 						}

 						}
						//if there is a dialog box open in the cart for editing a pli and the user selected a new store
						//add an event to for a page refresh on the cart page if the update button has not been clicked
						//reason - the pli has been updated but the update button was not clicked, leaving the cart visually in accurate.  
						//when the update button is clicked it forces a refresh.
						if(jQuery('#cart-table').length > 0 && jQuery('.select-store-button').length > 0){
 							jQuery('.ui-dialog .ui-icon-closethick:first').bind( "click", function(){
 								window.location.reload(); 	
 							});
						}

 					});

 				} // end ajax callback
 			});
 		},

 		bubbleStoreUp : function(list, id) {

 			var preferredEntry = list.find('li.store-'+id).clone();
 			preferredEntry.removeClass('extended-list');
 			list.find('.store-tile').not('extended-list').addClass('extended-list');
 			list.find('li.store-'+id).remove();
 			list.prepend(preferredEntry);

 		},

 		loadPreferredStorePanel : function(pid) {

			//clear error messages from other product tiles if they exists in the dom
 			if(jQuery('#preferred-store-panel div .error-message').length > 0){
 				jQuery('#preferred-store-panel div .error-message').remove();
 			}
 			// clear any previous results
 			$cache.preferredStorePanel.empty();

 			// show form if no zip set
 				if(app.user.zip === null || app.user.zip === "") {
 					$cache.preferredStorePanel
 						.append('<div><input type="text" id="userZip" class="entered-zip" placeholder="' + app.resources.ENTER_ZIP + '"/><button id="set-user-zip" class="button-style-1">' + app.resources.SEARCH + '</button></div>')
 							.find('#set-user-zip')
 								.click(function(){
 									var enteredZip = jQuery('.ui-dialog #preferred-store-panel input.entered-zip').last().val();
 									var regexObj = {
 											canada 		: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i ,
 											usa    		: /^\d{5}(-\d{4})?$/
 									};

 									var validZipEntry = false;

 									//check Canadian postal code
 									var regexp     = new RegExp(regexObj.canada);
 									if( regexp.test(enteredZip) ) {
 										validZipEntry = true;
 									}

 									//check us zip codes
 									var regexp     = new RegExp(regexObj.usa);
 									if( regexp.test(enteredZip) ) {
 										validZipEntry = true;
 									}

 									if( validZipEntry ) {
 										//good zip
 										jQuery('#preferred-store-panel div .error-message').remove();
 										app.storeinventory.setUserZip(enteredZip);
 										app.storeinventory.loadPreferredStorePanel(pid);
 									} else {
 										//bad zip
 										if(jQuery('#preferred-store-panel div .error-message').length == 0){
 											jQuery('#preferred-store-panel div').append('<div class="error-message">'+app.resources.INVALID_ZIP+'</div>');
 										}
 									}
 								});
 					$cache
 						.preferredStorePanel
 							.find('#userZip')
 								.keypress(function(e) {
 									code = e.keyCode ? e.keyCode : e.which;
 									if(code.toString() == 13) {
 										$cache.preferredStorePanel.find('#set-user-zip').trigger('click');
 									}
 					});

 					// clear any on-page results
 					jQuery('div.store-stock ul.store-list').remove();
 					jQuery('.availability .more-stores').remove();

 				}
 				// zip is set, build list
 				else {
 					app.storeinventory.buildStoreList(pid);
 					$cache
 						.preferredStorePanel
 						.append("<div>For " + app.user.zip + " <span class='update-location'>" + app.resources.CHANGE_LOCATION + "</span></div>" )
 						.append($cache.storeList);
 					$cache
 						.preferredStorePanel
 							.find('span.update-location')
 								.click(function(){
 									app.storeinventory.setUserZip(null);
 									app.storeinventory.loadPreferredStorePanel(pid);
 					});

 				}

 				// append close button for pdp
 				if(currentTemplate !== "cart") {
	 				if(app.user.storeId !== null) {
	 					$cache.preferredStorePanel.append("<button class='close button-style-1  set-preferred-store'>" + app.resources.CONTINUE_WITH_STORE + "</button>");
	 				}
	 				else if(app.user.zip !== null) {
	 					$cache.preferredStorePanel.append("<button class='close button-style-1'>" + app.resources.CONTINUE + "</button>");
	 				}
 				}else{
 					$cache.preferredStorePanel.append("<input type='hidden' class='srcitem' value='" + pid + "'>");
 				}

 				// open the dialog
 				$cache.preferredStorePanel.dialog({
 					width: 550,
 					modal: true,
 					title: app.resources.STORE_NEAR_YOU
 				});

 				// action for close/continue
 				jQuery('button.close').click(function(){
 					$cache.preferredStorePanel.dialog("close");
 				});

 				//remove the continue button if selecting a zipcode
 				if(app.user.zip === null || app.user.zip === "") {
 					jQuery('#preferred-store-panel .set-preferred-store').last().remove();
 				}

 		},

 		setUserZip : function(zip) {

 			app.user.zip = zip;
 			jQuery.ajax({
 				type: "POST",
 				url: app.urls.setZipCode,
 				data: { zipCode : zip }
 			}).fail(function() {

 			});

 		},

 		setPreferredStore : function(id) {

 			app.user.storeId = id;
 			jQuery.post(app.urls.setPreferredStore, { storeId : id }, function(data) {
 				jQuery('.selected-store-availability').html(data);
 			});

 		},

 		shippingLoad : function() {
 			$cache.checkoutForm = jQuery("form.address");
 			$cache.checkoutForm.off("click");
 			$cache.checkoutForm.on("click", ".is-gift-yes, .is-gift-no", function (e) {
 				jQuery(this).parent().siblings(".gift-message-text").toggle(jQuery(this).checked);
 			});
 			return null;
 		}

	};
}(window.app = window.app || {}, jQuery));

// app.responsive
(function(app, $) {
	
	app.responsive = {
	
		mobileLayoutWidth : 500,
		
		init : function () {

			$cache = {
					wrapper: $('#wrapper'),
					navigation: $('#navigation'),
					homepageSlider: $('#homepage-slider'),
					menu : $('#small-menu'),
					nav : $('#navigation'),
					storelocator : $('#header-store-locator'),
					cart : $('#mini-cart'),
					icon : $('#small-menu > div'),
					headerstrip : $('#header .menu-strip'),
					main : $('#main'),
					footer : $('#footer')
				};

			// toggle menu element
			$cache.navigation.find('.navigation-header')
				.click(function(){
					jQuery(this).siblings('.menu-category').toggle();
				});

			// check onload to see if mobile enabled
			if( $cache.wrapper.width() <= this.mobileLayoutWidth ) {
				app.responsive.enableMobileNav();
				app.responsive.footerAccordion();
			}
			
		},
		
		// build vertical, collapsable menu
		enableMobileNav : function(){
		
			$cache.navigation.find('.menu-category')
				.children('li')
					.children('a').each(function(index){
						if (jQuery(this).siblings().length > 0 ) {
							jQuery(this).append('<span class="small-nav-plus-orange mobile-view"></span>');
							jQuery(this).siblings('.level-2')
								.children('.menu-wrapper')
									.children('ul.level-2')
										.children('li')
											.children('a').each(function(index){
												if (jQuery(this).siblings().length > 0 ) {
													jQuery(this).append('<span class="small-nav-plus-grey mobile-view"></span>');
												}
											});
						}
					});

            $cache.navigation.find('.menu-category')
                .children('li')
                .children('a')
                .click(function(){
                        if (jQuery(this).hasClass('active')){
                            jQuery(this).removeClass('active');
                            jQuery(this).children('span').removeClass('small-nav-minus-orange').addClass('small-nav-plus-orange');
                            jQuery(this).siblings().toggle();
                        } else {
                            if( jQuery(this).next().find('ul.level-2').first().has('li').length) {
                                jQuery(this).addClass('active');
                                jQuery(this).children('span').removeClass('small-nav-plus-orange').addClass('small-nav-minus-orange');
                                jQuery(this).siblings().toggle();
                            }
                        }
                        jQuery(this).siblings('.level-2').children('.menu-wrapper').children('ul.level-2')
                            .children('li')
                                .children('a').children('span').on("click", function(){
                                    if (jQuery(this).hasClass('small-nav-plus-grey')){
                                        if( jQuery(this).parent('a').next().find('ul.level-3').first().has('li').length ) {
                                            jQuery(this).removeClass('small-nav-plus-grey').addClass('small-nav-minus-grey');
                                            jQuery(this).parent().siblings().toggle();
                                        }
                                    } else {
                                        jQuery(this).removeClass('small-nav-minus-grey').addClass('small-nav-plus-grey');
                                        jQuery(this).parent().siblings().toggle();
                                    }
                                    return false;
                                });
                        if(jQuery(this).hasClass('find-store-mobile')) {
                        	return true;
                        }
                        return false;
                    });


			$cache.menu.on('click', function(){
				if ($cache.icon.hasClass('small-menu-active')){
					$cache.nav.animate({left: -284},200);
					$cache.headerstrip.animate({left: 0},200);
					$cache.main.animate({left: 0},200);
					$cache.footer.animate({left: 0},200);
					$cache.icon.removeClass('small-menu-active');
				}
				else{
					$cache.nav.animate({left: 0},200);
					$cache.headerstrip.animate({left: 284},200);
					$cache.main.animate({left: 284},200);
					$cache.footer.animate({left: 284},200);
					$cache.icon.addClass('small-menu-active');
				}
			});

		},
		
		// revert to standard horizontal menu
		disableMobileNav : function(){
			$cache.navigation.find('.menu-category').show();
			$cache.navigation.find('.level-2').removeAttr('style');
			$cache.navigation.find('.level-1 span').remove();
			$cache.navigation.find('.level-2 span').remove();
			$cache.menu.off('click');
		},
		
		


	footerAccordion: function(){
		$( "#footer-accordion" ).accordion({
		      collapsible: true,
		       header: "h3" 
		    });
	},
	footerAccordionDestroy : function(){
		$("#footer-accordion").accordion('destroy');
	}
		
	}
}(window.app = window.app || {}, jQuery));


(function(app){
	
	function isMobile() {
		var mobileAgentHash = ["mobile","tablet","phone","ipad","ipod","android","blackberry","windows ce","opera mini","palm"];
		var	idx = 0;
		var isMobile = false;
		var userAgent = (navigator.userAgent).toLowerCase();
				
		while (mobileAgentHash[idx] && !isMobile) {
			isMobile = (userAgent.indexOf(mobileAgentHash[idx]) >= 0);
			idx++;
		}
		return isMobile;
	}
	
	app.isMobileUserAgent = function() 
	{
		return isMobile();
	};
	
	app.zoomViewerEnabled = function()
	{
		return (!isMobile());
	};
}(window.app = window.app || {}));

// jquery extensions
(function ($) {
	// params
	// toggleClass - required
	// triggerSelector - optional. the selector for the element that triggers the event handler. defaults to the child elements of the list.
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
})();

(function($,sr){	 
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;
		return function debounced () {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap) { func.apply(obj, args); }
				timeout = null; 
			}
			if (timeout) { 
				clearTimeout(timeout); 
			} else if (execAsap) {
				func.apply(obj, args);
			} 
			timeout = setTimeout(delayed, threshold || 500); 
		};
	}
	// smartresize 
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
}(jQuery,'smartresize'));

//Floodlight Tags

var lang = $('html').attr('lang');

function floodLiveChat(type, cat, u14) {
    var axel = Math.random()+"";
    var a = axel * 10000000000000000;
    var flDiv=document.body.appendChild(document.createElement("div"));
    flDiv.setAttribute("class","floodLiveChat");
    flDiv.style.position="absolute";
    flDiv.style.top="0";
    flDiv.style.left="0";
    flDiv.style.width="1px";
    flDiv.style.height="1px";
    flDiv.style.display="none";
    flDiv.innerHTML='<iframe class="floodLiveChatFrame" src="//4479027.fls.doubleclick.net/activityi;src=4479027;type=LiveChat;cat=LiveC0;u14=' + lang + ';ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>';
}

function floodSignUp(a,b,c) {
    var floodSignUp = document.createElement('iframe');
    floodSignUp.src='//4479027.fls.doubleclick.net/activityi;src=4479027;type=Email;cat=Email0;u14=' + lang + ';ord=1;num=' + (Math.random() * 10000000000000000) + '?';
    with(floodSignUp.style){
        display="none";
    }
    document.body.appendChild(floodSignUp);
    return false;
}

function floodStoreLocator(type, cat, u13, u14) {
    var geoSearch = $("#postalcode").val();
    var axel = Math.random()+"";
    var a = axel * 10000000000000000;
    var flDiv=document.body.appendChild(document.createElement("div"));
    flDiv.setAttribute("class","floodStoreLocator");
    flDiv.style.position="absolute";
    flDiv.style.top="0";
    flDiv.style.left="0";
    flDiv.style.width="1px";
    flDiv.style.height="1px";
    flDiv.style.display="none";
    flDiv.innerHTML='<iframe class="floodStoreLocatorFrame" src="//4479027.fls.doubleclick.net/activityi;src=4479027;type=Store;cat=Store0;u13=' + geoSearch + ';u14=' + lang + ';ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>';
}

function floodFinder(type, cat, u14) {
    var axel = Math.random()+"";
    var a = axel * 10000000000000000;
    var flDiv=document.body.appendChild(document.createElement("div"));
    flDiv.setAttribute("class","floodFinder");
    flDiv.style.position="absolute";
    flDiv.style.top="0";
    flDiv.style.left="0";
    flDiv.style.width="1px";
    flDiv.style.height="1px";
    flDiv.style.display="none";
    flDiv.innerHTML='<iframe class="floodFinderFrame" src="//4479027.fls.doubleclick.net/activityi;src=4479027;type=BattFind;cat=Batte0;u14=' + lang + ';ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>';
}

// initialize app
jQuery(document).ready(function ($) {
	app.init();
	//Tab menu on search page
	var search = $('.search-result-bookmarks a');
	var result = $('.search-result-content');
	$(search).click(function(){
		var rel = $(this).attr('rel');
		$(search).removeClass('active');
		$(this).addClass('active');
		$(result).hide();
		$('#'+rel).show();
	});


	function openclose(link, box){
		jQuery(link).click(function(){
			jQuery(this).toggleClass('open');
			jQuery(box).toggleClass('open');
		});
	}
	openclose('.cart-login-option a','#log-reg-box');
	openclose('#promo-close-open a','.cart-coupon-code');
	//jQuery('.cart-login-option a').click(function(){
	//	jQuery(this).toggleClass('open');
	//	jQuery('#log-reg-box').toggleClass('open');
	//});

	// My account left nav class active added
	 var urlnew = window.location.pathname, 
	     urlRegExp = new RegExp(urlnew.replace(/\/$/,'') + "$"); 
	        $('.account-left-nav a').each(function(){
	            if(urlRegExp.test(this.href.replace(/\/$/,''))){
	                $(this).addClass('active');
	            }
	        });


	    $('.cvn-tooltip').on('click', function(){
        	$( ".cvn-pop-up" ).show();
    	});
    	
	    $('.cvn-pop-up .close').on('click', function(){
        	$(this).parent().hide();
    	});   
    	
     $('#min_sum_continue').on('click', function(){
        $('.submit-form').trigger( "click" );
    });
    
     $('.storeDetails').on('click', function(type, cat, u13, u14){
         var parent = $(this).parent();
         var zip = parent.find('.zip').text();
         var city = parent.find('.city').text();
         var state= parent.find('.state').text();
         var axel = Math.random()+"";
         var a = axel * 10000000000000000;
         var flDiv=document.body.appendChild(document.createElement("div"));
         flDiv.setAttribute("class","floodStores");
         flDiv.style.position="absolute";
         flDiv.style.top="0";
         flDiv.style.left="0";
         flDiv.style.width="1px";
         flDiv.style.height="1px";
         flDiv.style.display="none";
         flDiv.innerHTML='<iframe class="floodStoresFrame" src="//4479027.fls.doubleclick.net/activityi;src=4479027;type=Store;cat=Store0;u13='+ zip + '|' +  city + '|'  + state + ';u14=' + lang + ';ord=1;num=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>';
     });

    $(".pt_checkout .select-address label").append("<span class='optional'>(optional)</span>");

    $("#dwfrm_singleshipping_shippingAddress_addressFields_address2").parent().find("label>span:last").after("<span class='optional'>(optional)</span>");	
	$("#dwfrm_billing_billingAddress_addressFields_address2").parent().find("label>span:last").after("<span class='optional'>(optional)</span>");	    
    
    $('.checkout-progress-indicator').appendTo('.checkout-title');  
    
    if($( '.single-ship .form-row' ).hasClass( 'error' )) {
    	$('.sgi-title-error').show();
	}
	
    if($( 'h2' ).hasClass( 'review-order-title' )) {
    	$('.pt_checkout').addClass('review-order-wrap');
    	$('#min_sum_continue').html('Submit Order');
	}   
    
    $('.shipping-login .login-register').on('click', function(event){
			 event.preventDefault();
			 $(this).toggleClass('active');
			 $('.checkout-login-inner-small').toggle();
			
     });

    var windoww=$(window).width();

     if(windoww < 767) {
        $(".shipping-login").prependTo('#primary');
        $(".review-order-wrap .mini-sum-head").appendTo('#secondary');
        $(".review-order-wrap .edit-cart-link").appendTo('#secondary');
     }

     $(window).resize(function() {
         var windowr=$(window).width();
         if(windowr < 767) {
            $(".shipping-login").prependTo('#primary');
             if(!$('.login-register').hasClass('active')){
             };
            $(".review-order-wrap .mini-sum-head").appendTo('#secondary');
            $(".review-order-wrap .edit-cart-link").appendTo('#secondary');
         }
         else {
            $(".shipping-login").insertBefore("#secondary .mini-sum-head");
            $(".review-order-wrap .mini-sum-head").insertBefore('#secondary .mini-shipment');
            $(".review-order-wrap .edit-cart-link").appendTo('.submit-order .form-row');
            }
     });
     
     if(app.variables.changeShippingMethodsSTS){
 		$('.single-ship').css('display', 'none');
		$('.ship-to-store-top').css('display', 'block');
		if (!app.variables.disableContinueButton) {
			$('#dwfrm_singleshipping_shippingAddress button').css('display', 'none');
		} else {
            $('#dwfrm_singleshipping_shippingAddress button').css('display', 'block');
        }
	}
    
     app.checkboxes.init();
     app.radio.init();
      $('#shipping-method-list .form-row .radio').on('click', function(){
    	 var radioIdnew = $(this).parent().find('input[type="radio"]'); 
    	 	radioIdnew.trigger('click');
     	}); 
  	 app.selectboxes.init();
     
		       $('a.return-anchor[href^="#"]').on('click', function(){
		            var target =  $(this).attr('href');
		            $('html, body').animate({scrollTop:  $(target).offset().top}, 300);
		            return false;
		        });		      
	      
	//Contact form general error message handling
	checkForError(); //Check for errors on page load	
	
	//Check again for errors when the submit button is pressed
	jQuery('#sendBtn').click(function(){
		setTimeout(function() //Wait for validation to catch up
		{
			checkForError();
		},  100);
	});
		
	function changeShippingMethodsSTStest (status) {
		app.changeShippingMethodsSTS = status;
	}	
	
	/**
	* Check for errors on the contact form.
	*
	* @return VOID
	*/
	function checkForError()
	{
		if(jQuery('#RegistrationForm').find('.error').length > 0)
		{
			jQuery('.formError').css({'display' : 'block'});
		}
		else
		{
			jQuery('.formError').css({'display' : 'none'});
		}	
	} 
	jQuery('.product-variations ul.swatches li:nth-child(3n)').addClass("third");
	jQuery('.product-variations ul.swatches li:nth-child(4n)').addClass("fourth");
	jQuery('.product-variations ul.swatches li:nth-child(5n)').addClass("fifth");	

    var stockDate = $('.stock-date-msg');
    var stockDateText = (stockDate.text() .substr(0,8));
    stockDate.text(stockDateText);
    
    if($('.pre-order-msg').length) {
    	$('#add-to-cart').text('Pre-order');
    }  
    if($('.pre-order-msg').hasClass('not')) {
    	$('.product-add-to-cart').hide();
    }
	var productSetItem = $('.product-set-item');

	productSetItem.each(function(){
		if (productSetItem.find('.not-available-msg')) { 
			$('.not-available-msg').closest(productSetItem).find('.add-sub-product').hide();
		}
	    if(productSetItem.find('.pre-order-msg.not')) {
    		$('.pre-order-msg').closest(productSetItem).find('.add-sub-product').hide()
    	}
	    var stockDate = $('.stock-date-msg');
	    var stockDateText = (stockDate.text() .substr(0,8));
	    stockDate.text(stockDateText);
	});
	
	$('#dwfrm_shiptostorebox_shiptostore').change(function() {
		var href = $('.stsBoxShipping-href').attr('href');
      	window.location.href = href; 
	});
	var dwfrm_cart_shiptostore = $('.ship-to-store-show input[type="checkbox"]').attr('checked');
	if(dwfrm_cart_shiptostore == 'checked'){
		$('#ShipToStoreShowCheckout').trigger('click');
		}
	$('#ShipToStoreShowCheckout').change(function() {
		$('.ship-to-store-show input[type="checkbox"]').trigger('click');
	});
	
	$("#tab2 .tech-specs-inner").each(function () {
		if($(this).children().children('.tech-specs-name').length > 0 ) {
			$(this).css('display', 'block');
		}
	});
	if(!$('#tab2').children().children().children('.tech-specs-name').length > 0) {
		$('.tech-specs-tab').css('display', 'none');
	}
	
	var tech = $('.tech-specs-inner').filter(function() {
	    return $(this).css("display") === "block";}).children().has('p');
		for (i = 0; i < tech.length; i++) { 
		   if(i%2==0) {
			  var el = $(tech[i]);  
			  el.addClass('even');
		   }
		}
		
	$('.pdp-find-in-store-link').on('click', function(){
		$(this).parent().hide();
		$('.sity-and-state').show();
	});
	$('.pr-review-report-issue').click(function() {
        alert("ok");
        return false;
    });
	$("#compare-table tbody tr").each(function() {
		var num = 0;
		$(this).children('td').each(function(){
			if (($(this).children('span').hasClass('no-item-inner'))) {
					num++;
		        }
			});
		 if(num == '4') {
			 $(this).remove(); 
		 }
		});
	$("#compare-table tbody tr.compare-header-top").each(function() {
		if(($(this).next('tr').hasClass('compare-header-top'))) {
			$(this).remove();
		}
	});
	if(app.variables.recalculateTotals){
		var url = app.urls.summaryRefreshURL;
		var summary = $("#secondary.summary #minisum");
		// indicate progress
		app.progress.show(summary);

		// load the updated summary area
		summary.load( url, function () {
			// hide edit shipping method link
			summary.fadeIn("fast");
			summary.find('.checkout-mini-cart .minishipment .header a').hide();
			summary.find('.order-totals-table .order-shipping .label a').hide();
	     	$('#min_sum_continue').on('click', function(){     
        		$('.submit-form').trigger( "click" );
    		});
        $('.shipping-login .login-register').on('click', function(event){
            event.preventDefault();
            $(this).toggleClass('active');
            $('.checkout-login-inner-small').toggle();
        });
        app.checkboxes.init();
			});
	}
	var windoww=$(window).width();
	if($('.category-landing').length > 0) {
		$('.sort-mobile').addClass('sort-mobile-category');
		$('.shop-by-mobile').addClass('shop-by-mobile-category');
		if(windoww < 641) {
			$('#cat-landing-slotbanner').prependTo('.mobile-option');	
		}
		$(window).resize(function() {
			var windowr=$(window).width();
			if(windowr < 641) {
				if($(".mobile-option #cat-landing-slotbanner").length==0 ) {
					$('#cat-landing-slotbanner').prependTo('.mobile-option');
				}
			}
			else {
				if($(".cat-landing-slotbanner-wrapper #cat-landing-slotbanner").length==0) {
					$('#cat-landing-slotbanner').prependTo('.cat-landing-slotbanner-wrapper');
				}
			}
				
		 	});
		
	}
	var storedetailscount = $('.recommendations #horizontal-carousel2 li').size();
	if(storedetailscount==0) {
		$('.carousel').css('display', 'none');
	}
	$('ol.breadcrumb li').each(function() {
	    if ($(this).text()=='SHOP' || $(this).text()=='Home') {
	        $(this).remove();
	    }
	});
	$('.breadcrumb a').each(function() {
	    if ($(this).text()=='SHOP' || $(this).text()=='Home') {
	        $(this).remove();
	    }
	});
	$('.breadcrumb').each(function() {
	    if ($(this).children().size() < 2) {
	        $(this).remove();
	    }
	});	
	$('ol.breadcrumb').each(function(index) {
		$(this).find("li:eq(0)").children().css("margin-left", "0px");
	    
	});
	if (/*@cc_on !@*/false && (
		       document.documentMode === 9 || document.documentMode === 8)
		   ) {
		$('[placeholder]').focus(function() {
			  var input = $(this);
			  if (input.val() == input.attr('placeholder')) {
			    input.val('');
			  }
			}).blur(function() {
			  var input = $(this);
			  if (input.val() == '' || input.val() == input.attr('placeholder')) {
			    input.val(input.attr('placeholder'));
			  }
			}).blur();
		
		}
	else {
		$('#postalcode').focus(function() {
			$(this).attr('placeholder','');
		})
		.blur(function(){
			$(this).attr('placeholder','city & state or Zip');
		})
	}
	$('a.tooltip').click(function(e) {
		  e.preventDefault();
	});
});
