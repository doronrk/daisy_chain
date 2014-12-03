//    (c) 2009-2012 Demandware Inc.
//    Subject to standard usage terms and conditions
//    Relies on jQuery, jQuery UI, jQuery validate, ...
//    For all details and documentation:
//    https://github.com/Demandware/Site-Genesis

// All java script logic for the application.
// The code relies on the jQuery JS library to be also loaded.

// semi-colon to assure functionality upon script concatenation and minification
;

// if jQuery has not been loaded, load from google cdn
if (!window.jQuery) {
	var s = document.createElement('script');
	s.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
	s.setAttribute('type', 'text/javascript');
	document.getElementsByTagName('head')[0].appendChild(s);
}

// Application singleton and namespace object
// ------------------------------------------
var app = (function (app, $) {
	document.cookie="dw=1";
	/******** private functions & vars **********/

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
			// elements found in content slots
			slots : {
				subscribeEmail : $(".subscribe-email")
			},
			attributes : {
				attributeValue : $(".displayvariationvalue")
			}
		};
	}

	function initializeEvents() {
		var controlKeys = ["8", "13", "46", "45", "36", "35", "38", "37", "40", "39"];
		// apply dialogify event handler to all elements that match
		// one or more of the specified selectors
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


		//initialize search suggestions
		app.searchsuggest.init(app.ui.searchContainer, app.resources.SIMPLE_SEARCH);

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
		
		if(app.ui.attributes.attributeValue.length > 0) {
			app.ui.attributes.attributeValue.each(function () {
				var currVal = $(this).html();
				var newVal = currVal.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
				$(this).html(newVal);
			});			
		}
	}

	function initializeDom() {
		// add class to html for css targeting
		$('html').addClass('js');

		// load js specific styles
		app.util.limitCharacters();
	}


	// _app object
	// "inherits" app object via $.extend() at the end of this seaf (Self-Executing Anonymous Function
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
			// execute page specific initializations
			var ns = app.page.ns;
			if (ns && app[ns] && app[ns].init) {
				app[ns].init();
			}
		}
	};

	return $.extend(app, _app);
}(window.app = window.app || {}, jQuery));

// Home page (Storefront) singleton and namespace object
// -----------------------------------------------------

// app.storefront
(function (app, $) {
	var $cache = {};
	app.storefront = {
		init : function () {
			$cache = {
				slide : $('.jcarousel-item'),
				slider : $('#homepage-slider'),
				pdpslider : $('#pdp-slider'),
				lookbookslider : $('#lookbook-slider'),
				wrapper : $('#main')
			};
			
		}
	};

}(window.app = window.app || {}, jQuery));


// Tooltips singleton and namespace object
// ---------------------------------------

// app.tooltips
(function (app, $) {
	var $cache = {};
	app.tooltips = {

		init : function () {

			$('.tooltip').tooltip({
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
			});
			
			$('.tooltip').on('click',function(e){
				e.preventDefault();
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

	//creates product recommendation carousel using jQuery jcarousel plugin
	function loadRecommendations() {
		var carousel = $("#carousel-recomendations");
		if(!carousel || carousel.length === 0 || carousel.children().length === 0) {
			return;
		}

		carousel.jcarousel(app.components.carouselSettings);
	}

	/**
	 @description Sets the main image attributes and the href for the surrounding <a> tag
	 @param {Object} atts Simple object with url, alt, title and hires properties
	 */
	function setMainImage(atts) {
		
		var imgZoom = $cache.pdpMain.find("a.main-image");
		// the link on the image on the pdp page was removed as part of ticket #90261
		// Look for div instead. Leaving a.main-image search in there in case this function
		// is used on other pages where the link still exists
		imgZoom = (imgZoom.length==0) ? $cache.pdpMain.find("div.main-image") : imgZoom;
		
		if (imgZoom.length>0 && atts.hires && atts.hires!='' && atts.hires!='null') {
			imgZoom.attr("href", atts.hires);
		}

		imgZoom.find("img.primary-image").attr({
			"src" : atts.url,
			"alt" : atts.alt,
			"title" : atts.title
		}).removeClass('preload');
		
	}

	/**
	 @description helper function for swapping main image on swatch hover
	 @param {Element} element DOM element with custom data-lgimg attribute
	 */
	function swapImage(element) {
		var lgImg = $(element).data("lgimg");

		var newImg = $.extend({}, lgImg);
		var imgZoom = $cache.pdpMain.find("a.main-image");
		imgZoom = (imgZoom.length==0) ? $cache.pdpMain.find("div.main-image") : imgZoom;

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
	

	function loadZoom() {
		 $('.primaryIMGzoom').jqzoom({  
		        zoomType: 'standard',
		        xOffset	: 23,
		        title	: false,
		        zoomWidth	: 350,
		        zoomHeight	: 450
		});  
		
		if(!app.zoomViewerEnabled) { 
			$('.main-image img').addClass('preload');
			$(".zoomControls").hide();
			return; 
		}else{
			$('.main-image img').removeClass('preload');
			$(".zoomControls").show();
		}
		
		// Added to prevent empty hires zoom feature (if images don't exist)
		var mainImage = $cache.pdpMain.find(".main-image");
		var hiresImageSrc = mainImage.find("img").attr("src");
		
		mainImage.css('width',app.disConfig.large.scaleWidth+'px').css('height',app.disConfig.large.scaleHeight+'px');  
/*		if( hiresImageSrc && hiresImageSrc != '' && hiresImageSrc.indexOf('noimagelarge')<0 ) {
			
			$('.product-primary-image img.primary-image').smoothZoom({
				height: app.disConfig.large.scaleHeight,
				zoom_BUTTONS_SHOW: 'NO',
				zoom_OUT_TO_FIT: false,
				pan_BUTTONS_SHOW: 'NO',
				animation_SPEED_ZOOM: 1,
				responsive: true,
				border_SIZE: 2,
				border_TRANSPARENCY: 0,
				zoom_MAX: 290
			}).removeClass('preload');
 
			$('.zoom-in').mousedown(function(){
				$('.product-primary-image img.primary-image').smoothZoom('zoomIn');
			});
			$('.zoom-out').mousedown(function(){
				$('.product-primary-image img.primary-image').smoothZoom('zoomOut');
			});
			$('.zoom-fit').mousedown(function(){
				$('.product-primary-image img.primary-image').smoothZoom('Reset');
			});
			
		}*/
	}

	function replaceImages() {
		var newImages = $("#update-images");
		var isMobileVersion = false;
		if($(".pdp-mobile").length > 0) {
			var pdpDisplayTag = $(".pdp-mobile").css("display");
			isMobileVersion = (pdpDisplayTag.indexOf("none") < 0);
		}
		
		var imgCntn = (isMobileVersion) ? "div.product-image-container.pdp-mobile" : "div.product-image-container.pdp-desktop";
		var imageContainer = $cache.pdpMain.find(imgCntn);
		imageContainer.html(newImages.html());
		newImages.remove();
		
		if(isMobileVersion) {
			$('#pdp-slider').flexslider({
				prevText: "",
				nextText: "",  
				selector: ".jcarousel-list > li",
			    animation: "slide",
			    start: function(pdpslider){
			    	$('body').removeClass('loading');
			    }
			 });	
		}else{
			setMainImageLink();
			loadZoom();			
		}
	}

	function setMainImageLink() {
		var imgZoom = $cache.pdpMain.find("a.main-image");
		imgZoom = (imgZoom.length==0) ? $cache.pdpMain.find("div.main-image") : imgZoom;

		if (app.quickView.isActive() || app.isMobileUserAgent) {
			imgZoom.removeAttr("href");
		}
		else {
			imgZoom.addClass("image-zoom");
		}
	}

	function removeImageZoom() {
		var imgZoom = $cache.pdpMain.find("a.main-image");
		imgZoom = (imgZoom.length==0) ? imgZoom = $cache.pdpMain.find("div.main-image") : imgZoom;	
		imgZoom.removeClass("image-zoom");
	}
	
	// alert if color or size not selected
    function alertVariationSelection() {
        var color=$('.product-variations .labelcolor .selected-value span').text().trim().length;
        var size=$('.product-variations .selected-value.sizeValue').text().trim().length;
        
        $('.variationerrmsg').delay(500).fadeIn('fast');
        if(size<1){
            $('.variationerrmsg.size').text("Please select a size");
            $('.variationerrmsg.size').css("padding","4px");
        }
        if(color<1){
            $('.variationerrmsg.color').text("Please select a color");
            $('.variationerrmsg.color').css("padding","4px");
        }
    }
	
	function initializeDom() {
		//Ben: kill the tabs
		//$cache.pdpMain.find('div.product-detail .product-tabs').tabs();
		
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

		loadRecommendations($cache.container);
		loadProductNavigation();
		setMainImageLink();

		if ($cache.productSetList.length>0) {
			var unavailable = $cache.productSetList.find("form").find("button.add-to-cart[disabled]");
			if (unavailable.length > 0) {
				$cache.addAllToCart.attr("disabled", "disabled");
				$cache.addToCart.attr("disabled", "disabled"); // this may be a bundle

			}
		}
		
		app.tooltips.init();
	}

	function initializeCache() {
		$cache = {
			productId : $("#pid"),
			pdpMain : $("#pdpMain"),
			productContent : $("#product-content"),
			thumbnails : $("#thumbnails"),
			thumbnailImg : $("#thumbnails .producthumbnail"),
			bonusProductGrid : $(".bonusproductgrid"),
			imageContainer : $(".product-primary-image"),
			productSetList : $("#product-set-list"),
			addToCart : $("#add-to-cart"),
			addAllToCart : $("#add-all-to-cart")
		};
		$cache.detailContent = $cache.pdpMain.find("div.detail-content");
		$cache.pdpForm = $cache.pdpMain.find("form.pdpForm");
		$cache.swatches = $cache.pdpMain.find("ul.swatches");
		var imgZoom = $cache.pdpMain.find("a.main-image");
		imgZoom = (imgZoom.length==0) ? $cache.pdpMain.find("div.main-image") : imgZoom;

		$cache.mainImageAnchor = $cache.imageZoom = imgZoom;
		$cache.mainImage = $cache.mainImageAnchor.find("img.primary-image");
	}

	function initializeEvents() {
		app.product.initAddThis();

		// add or update shopping cart line item
		app.product.initAddToCart();
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
						
						availabilityContainer.removeClass('availability-not-avail');						

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
								$('.add-to-cart').attr("disabled", "disabled");
							}
							if( data.levels.PREORDER==0 && data.levels.BACKORDER==0 && data.levels.IN_STOCK==0 ) {
								avMsg.text(app.resources.NOT_AVAILABLE);
							} else {
								avMsg.text(app.resources.REMAIN_NOT_AVAILABLE);
							}
							availabilityContainer.addClass('availability-not-avail');
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
		$cache.pdpMain.on("click", ".productadd button", function(e){
            var disable=$(this).data('disabled');
            
            if(disable!=true){
                $('.variationerrmsg').css("display","none");
                $(this).attr('id','add-to-cart');
            }
            alertVariationSelection();
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
            
            var disableCartButton=$('.productadd button').data('disabled');
            if(disableCartButton==true){
                alertVariationSelection();
                return false;
            }
            window.location.href = url;
        });


		$cache.imgMain = $cache.pdpMain.find("img.productthumbnail");
		// productthumbnail.onclick()
		$cache.imgMain.click( function () {
			var lgImg = $(this).data("lgimg");

			// switch indicator
			$cache.pdpMain.find("div.product-thumbnails li.selected").removeClass("selected");
			$(this).closest(".thumb").addClass("selected");
						
			$('#thumbnails .productthumbnail').load(function(){
				$(this).css('display','block');
			});
			
			setMainImage(lgImg);
			// load zoom if not quick view
			if( lgImg.hires != '' && lgImg.hires.indexOf('noimagelarge')<0 ){
				setMainImageLink();
				
				//loadZoom();
			} else {
				//removeImageZoom();
			}
			
			// instantiate the zoom
			//$('.primaryIMGzoom').removeData('jqzoom');
			$('.jqzoom').remove();
			$('.primaryIMGzoom').unbind();

			//$(".primaryIMGzoom").attr('href', lgImg.hires);
		    $(".primaryIMGzoom img").attr('src', lgImg.hires);
		    //$(".zoomWrapperImage").children('img').eq(0).attr("src", lgImg.hires); 
			
			$('.primaryIMGzoom').jqzoom({  
			    zoomType: 'standard',
			    xOffset	: 23,
			    title	: false,
			    zoomWidth	: 400,
			    zoomHeight	: 500
			}); 
		});

		
		$cache.imgMain = $cache.pdpMain.find("img.productthumbnail");
		
		$cache.imgMain.hover(function () {
			var lgImg = $(this).data("lgimg");
						
			$('#thumbnails .productthumbnail').load(function(){
				$(this).css('display','block');
			});
			
			setMainImage(lgImg);
			// load zoom if not quick view
			if( lgImg.hires != '' && lgImg.hires.indexOf('noimagelarge')<0 ){
				setMainImageLink();
				
				//loadZoom();
			} else {
				removeImageZoom();
			}
			
		},
		function() {
			var selectedClass = $(this).closest('li').hasClass('selected');
			if(!selectedClass) {
				// change image back to the originally selected image
				$cache.selectedImg = $cache.pdpMain.find("li.thumb.selected").find('img.productthumbnail');
				var lgImg = $cache.selectedImg.data("lgimg");
							
				$('#thumbnails .productthumbnail').load(function(){
					$(this).css('display','block');
				});
				
				setMainImage(lgImg);
				// load zoom if not quick view
				if( lgImg.hires != '' && lgImg.hires.indexOf('noimagelarge')<0 ){
					setMainImageLink();
					
					loadZoom();
				} else {
					removeImageZoom();
				}
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
		$cache.pdpMain.on("click", ".thumbnail-link, .addthis_toolbox a", false);
		$cache.pdpMain.on("click", "li.unselectable a", false);

		// handle drop down variation attribute value selection event
		$cache.pdpMain.on("change", ".variation-select", function(e){
			if ($(this).val().length===0) {return;}
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

			app.ajax.load({
				url: url,
				callback : function (data) {
					target.html(data);
					app.product.initAddThis();
					app.product.initAddToCart();
					$("update-images").remove();
					app.tooltips.init();
				}
			});
		});

		// swatch anchor onclick()
		$cache.pdpMain.on("click", "div.product-detail a[href].swatchanchor", function (e) {
			e.preventDefault();
			
			var el = $(this);

			var isColor = el.closest("ul.swatches").hasClass("Color");
			
			if( el.parents('li').hasClass('unselectable') ) {
				if(isColor) {
					app.product.setDefaultSize();
				} else {
					return;
				}
			}
			
			var isShowingMobile = "false";
			if($(".pdp-mobile").length > 0) {
				var pdpDisplayTag = $(".pdp-mobile").css("display");
				isShowingMobile = (pdpDisplayTag.indexOf("none") < 0) ? "true" : "false";
			}
			
			var anchor = el,
				qty = $cache.pdpForm.find("input[name='Quantity']").first().val(),
				listid = $cache.pdpForm.find("input[name='productlistid']").first().val(),
				productSet = $(anchor).closest('.subProduct'),
				params = {
					Quantity : isNaN(qty) ? "1" : qty,
					isMobilePdp : isShowingMobile
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
					replaceImages();
					app.tooltips.init();
					if(isColor) {
						app.product.setDefaultSize();
					}
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
	}

	function setAddToCartHandler(e) {
		e.preventDefault();
		var form = $(this).closest("form");
		var qty = form.find("input[name='Quantity']");
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
			
			//GA Tag cart_abandon
			utag.link({event_type: 'cart_abandon', event_category: 'Product Detail Page', event_action: 'Add to bag', event_label: 'Item added to bag'});
		});
	}



	/*************** app.product public object ***************/
	app.product = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
			loadZoom();
			app.product.setDefaultColor();
		},
		readReviews : function(){
			$('.product-tabs').tabs('select','#tab4');
			$('body').scrollTop($('#tab4').offset().top);
		},
		get : function (options) {
			// loads a product into a given container div
			// params
			//		containerId - id of the container div, if empty then global app.containerId is used
			//		source - source string e.g. search, cart etc.
			//		label - label for the add to cart button, default is Add to Cart
			//		url - url to get the product
			//		id - id of the product to get, is optional only used when url is empty
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
		getAvailability : function (pid, quantity, callback) {
			app.ajax.getJson({
				url: app.util.appendParamsToUrl(app.urls.getAvailability, {pid:pid, Quantity:quantity}),
				callback: callback
			});
		},
		initAddThis : function () {

			var addThisServices = ["facebook","twitter"],
			addThisImages = [app.urls.facebookImg,app.urls.twitterImg],
			addThisToolbox = $(".addthis_toolbox"),
			addThisLinks="";
			
			if($('.ardenb').length > 0) {
				addThisImages = [app.urls.facebookabImg,app.urls.twitterabImg];
			}
			
			$(".pt_product-details img").each(function(){
				if(!$(this).hasClass("at_include")){
					$(this).addClass("at_exclude");
				}
			});

			var i,len=addThisServices.length;
			for (i=0;i<len;i++) {
				if (addThisToolbox.find(".addthis_button_"+addThisServices[i]).length==0) {
					addThisLinks += '<a class="addthis_button_'+addThisServices[i]+'">';
					if(typeof addThisImages[i] != 'undefined' && addThisImages[i] != "") {
						addThisLinks += '<img src="' + addThisImages[i] + '"/>';
					}
					addThisLinks += '</a>';
				}
			}
			if (addThisLinks.length===0) { return; }
			
			var addthis_config = {
				image_include: "at_include",
				image_exclude: "at_exclude"
			}
			
			addThisToolbox.html(addThisLinks);
			addthis.toolbox(".addthis_toolbox");
		},
		initAddToCart : function (target) {
			if (target) {
				target.on("click", ".add-to-cart", setAddToCartHandler);
			}
			else {
				$(".add-to-cart").on("click", setAddToCartHandler);
			}
		},
		setDefaultColor : function() {
			if($('.swatches.Color').length > 0 && $('.swatches.Color').find(".emptyswatch:not('.unselectable')").length == 1 && $('.swatches.Color').find('.selected').length == 0) {
				$('.swatches.Color').find(".emptyswatch:not('.unselectable')").find("a").click();
			} else {
				app.product.setDefaultSize();				
			}		
		},
		setDefaultSize : function() {
			if($('.swatches.size').length > 0 && $('.swatches.size').find(".emptyswatch:not('.unselectable')").length == 1 && $('.swatches.size').find('.selected').length == 0) {	
				$('.swatches.size').find(".emptyswatch:not('.unselectable')").find("a").click();
			}		
		}
	};

}(window.app = window.app || {}, jQuery));

// app.product.tile
(function (app, $) {
	var $cache = {};

	function initializeDom() {
		//Grab the group of results that haven't been synced.  Proformance boost for InfiniteScroll
		var tiles = $cache.container.find(".product-tile:not(.height-synced)");
	
		if (tiles.length===0) { return; }
		tiles.syncHeight().each(function (idx) {$(this).data("idx",idx);}).addClass('height-synced');
	}

	function initializeEvents() {
		if(!app.isMobileUserAgent) {
			app.quickView.initializeButton($cache.container, ".product-image");
		}
		$cache.container.on("mouseleave", ".swatch-list", function(e){
			// Restore current thumb image
			var tile = $(this).closest(".grid-tile");
			var thumb = tile.find(".product-image a.thumb-link img").filter(":first");
			var data = thumb.data("current");
			if(typeof data != undefined){
				thumb.attr({
					src : data.src,
					alt : data.alt,
					title : data.title
				});
			}
		});
		$cache.container.on("click", ".swatch-list a.swatch", function (e) {
			e.preventDefault();
			if ($(this).hasClass("selected")) { return; }

			var tile = $(this).closest(".grid-tile");

			var parentUlId = $(this).closest(".swatch-list").attr('id');
			if(parentUlId.indexOf('_firstul') > -1) {
				var prodId = parentUlId.replace('_firstul','');				
			} else {
				var prodId = parentUlId.replace('_ul','');								
			}
			
			var origSwatchSelector = "#" + prodId + "_firstul";
			var moreSwatchSelector = "#" + prodId + "_ul";
						
			$(origSwatchSelector).find(".swatch.selected").removeClass("selected");
			$(moreSwatchSelector).find(".swatch.selected").removeClass("selected");
			
			$(this).addClass("selected");
			tile.find("a.thumb-link").attr("href", $(this).attr("href"));
			tile.find("a.name-link").attr("href", $(this).attr("href"));

			var swatchImg = $(this).children("img").filter(":first");
			var data = swatchImg.data("thumb");
			var thumb = tile.find(".product-image a.thumb-link img").filter(":first");
			var thumbTwo = tile.find(".product-image a.thumb-link.thumblink_two img").filter(":first");
			var currentAtts = {
				src : data.src,
				alt : data.alt,
				title : data.title
			};
			if(thumbTwo && thumbTwo.attr('src') != undefined && currentAtts.src != undefined) {
				var newSrc = currentAtts.src;
				newSrc = newSrc.replace('_a1zm','_a2zm');
				thumbTwo.attr('src',newSrc);
			}
			thumb.attr(currentAtts);
			thumb.data("current", currentAtts);
			tile.find('.thumbnail_two').remove();//if old alt img is on DOM, remove it so it can be rebuilt on hover.
			tile.find('.noImage').removeClass('noImage');
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


		$('.product-swatches-all').unbind('hover').hover(function() {
			var thisId = $(this).attr('id');
			var swatchSelector = "#" + thisId + "_ul";
			$(swatchSelector).show();
			$(this).hide();
		});
		
		
		$('.more-swatches').off('mouseleave').on("mouseleave",function() {

			var thisId = $(this).attr('id');
			var productSwatchSelectorId = thisId.replace('_ul','');
			var productSwatchSelector = "#" + productSwatchSelectorId;
			if($(this).find("a.selected").length) {
			return;
			}

			$(productSwatchSelector).show();
			$(this).hide();
		});
		
		//Rotate the images on touch swipe.
		function touchwipeSwap($this) {
			var imgThumb = $this.find(".product-image-thumb");	
			
			if(imgThumb.parent().hasClass('over')){
				//If second image is shown call this function
				app.quickView.toggleImgThumbnail(imgThumb.last());
			}else{
				//If first image is shown, call this function
				app.quickView.initializeImageEvents(imgThumb);
			}
		
		}		
		
		$('.product-image').each(function() {
			var $this = $(this);
			$this.touchwipe({
				wipeRight:function () {touchwipeSwap($this);},
				wipeLeft:function(){touchwipeSwap($this);},
				preventDefaultEvents: false
			});
		});
		
	}

	/*************** app.product.tile public object ***************/
	app.product.tile = {
		init : function () {
			$cache = {
				container : $(".tiles-container")
			};
			initializeEvents();
			initializeDom();
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

	/************** private ****************/
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

	/*************** app.product.compare public object ***************/
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

					// item successfully removed session, now remove from to list...
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

	/*************** app.compare public object ***************/
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
		initializeDialog : function (eventDelegate, eventTarget) {
			$(eventDelegate).on("click", eventTarget, function (e) {
				e.preventDefault();
				var dlg = app.dialog.create({target:$("#send-to-friend-dialog"), options:{
					width:620,
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


// app.search
(function (app, $) {
	var $cache = {};

	/**
	 *  replaces breadcrumbs, lefthand nav and product listing with ajax and puts a loading indicator over the product listing
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

		app.progress.show($cache.content);
		$cache.main.load(app.util.appendParamToURL(refineUrl, "format", "ajax"), function () {
			app.product.compare.init();
			app.product.tile.init();
			app.progress.hide();
			if($(".headerpromo-mobile").is(':visible')){
				//it's mobile, so move refinements menu into it's proper place
				$("#secondary").hide();
				$("#primary .sort-by").after($("<div id='mobileRefinementButton'>Filter</div>"))
				$("#mobileRefinementButton").after($("#secondary"));
			}
		});
	}
	
	/** 
	 * @private 
	 * @function 
	 * @description 
	 */ 
	function initInfiniteScroll() {
		
		jQuery(document).bind('scroll',function(e) {
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
					$cache.container.off();
                    app.product.tile.init();
					jQuery(document).trigger('grid-update');
				};
					
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
		});
	}

	function initializeEvents() {

		// compare checked
		$cache.main.on("click", "input[type='checkbox'].compare-check", function (e) {
			var cb = $(this);
			var tile = cb.closest(".product-tile");

			var func = this.checked ? app.product.compare.addProduct : app.product.compare.removeProduct;
			var itemImg = tile.find("div.product-image img").first();
			func({
				itemid : tile.data("itemid"),
				uuid : tile[0].id,
				img : itemImg
			});

		});

		// handle toggle refinement blocks
		$cache.main.on("click", ".refinement h3", function (e) {
			$(this)
		 	.toggleClass('expanded')
		 	.siblings('ul').toggle();
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
	
				if( uri.query.length > 1 ) {
					window.location.hash = encodeURI(decodeURI(uri.query.substring(1)));
				} else {
					window.location.href = this.href;
				}
				return false;
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
			return false;
		})
		.on("click", ".items-per-page a", function (e) {
			var refineUrl = $(this).find('option:selected').val();
			var uri = app.util.getUri(refineUrl);
			window.location.hash = uri.query.substr(1);
			return false;
		})
		.on("click", ".pagination .view-all p", function (e) {
			var viewAllUrl = $(this).data('url');
			location.href=viewAllUrl;
		});

		// handle hash change
		$(window).hashchange(function () {
			updateProductListing(true);
		});
	}

	app.search = {
		init : function () {
			$cache = {
				main : $("#main"),
				items : $("#search-result-items"),
				container : $(".tiles-container")
			};
			$cache.content = $cache.main.find(".search-result-content");
					
			//if (app.product.compare) {
				app.product.compare.init();
			//}
			updateProductListing(false);
			if(app.InfiniteScroll){
				initInfiniteScroll();
			}
			
			app.product.tile.init();
			initializeEvents();
		}
	};

}(window.app = window.app || {}, jQuery));

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
	/********* public app.bonusProductsView object *********/
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
					width: 870,
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
					width : 900,
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

//app.giftcert
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
				console.log(JSON.stringify(response.errors));
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

//app.giftcard
(function (app, $) {

	app.giftcard = {
		checkBalance : function (id, callback) {
			// load gift certificate details
			var url = app.util.appendParamToURL(app.urls.giftCardCheckBalance, "giftCardID", id);

			app.ajax.getJson({
				url: url,
				callback: callback
			});
		}
	};
}(window.app = window.app || {}, jQuery));

// app.checkout
(function (app, $) {
	var $cache = {},
		isShipping = false,
		shippingMethods = null;

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

	//updates the order summary based on a possibly recalculated
	//basket after a shipping promotion has been applied
	function updateSummary() {
		//var url = app.urls.summaryRefreshURL + 'async=true';
		var url = app.util.appendParamsToUrl(app.urls.summaryRefreshURL,
				 { 
					async:'true'
				 },
				 true);
		var summary = $("#secondary.summary");
		// indicate progress
		app.progress.show(summary);

		// load the updated summary area
		summary.load( url, function () {
			// hide edit shipping method link
			summary.fadeIn("fast");
			summary.find('.checkout-mini-cart .minishipment .header a').hide();
			summary.find('.order-totals-table .order-shipping .label a').hide();
		});
	}

	//selects a shipping method for the default shipment
	//and updates the summary section on the right hand side
	function selectShippingMethod(shippingMethodID) {
		// nothing entered
		if(!shippingMethodID) {
			return;
		}

		$cache.shippingOptions = $cache.checkoutForm.find("div.shipping-methodoption-div");
		$cache.shippingWrapperOptions = $cache.checkoutForm.find("div.shipping-methodoption-wrapper");

		$cache.shippingOptions.removeClass("selected-shipping-option");
		$cache.shippingWrapperOptions.removeClass("selected-shipping-option-wrapper");
		
		var ssm = $cache.shippingOptions.filter("#ShippingOption-"+shippingMethodID);
		var ssw = $cache.shippingWrapperOptions.filter("#ShippingOptionWrapper-"+shippingMethodID);
		
		if (ssm.length===0) {
			ssm = $("#shipping-method-Custom");
		}
		if(ssw.length > 0)
		{
			ssw.addClass("selected-shipping-option-wrapper");
		}
		
		ssm.addClass("selected-shipping-option");
		
		// attempt to set shipping method
		var url = app.util.appendParamsToUrl(app.urls.selectShippingMethodsList,
											 { countryCode:$cache.countryCode.val(),
											   stateCode:$cache.stateCode.val(),
											   postalCode:$cache.postalCode.val(),
											   city:$cache.city.val(),
											   async:'true',
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
	 * Make an AJAX request to the server to retrieve the list of applicable shipping methods
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
					//window.alert("Couldn't get list of applicable shipping methods.");
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

				var smlUrl = getShippingMethodURL(app.urls.shippingMethodsList)+'&async=true';

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
				});
			}
		});
	}

	//shipping page logic
	//checkout gift message counter
	function initGiftMessageBox() {
		// show gift message box, if shipment is gift
		$cache.giftMessage.toggle($cache.checkoutForm.find("#is-gift-yes")[0].checked);

	}
	
	//Code to remove Promo code on checkout from order summary area.
	function loadRemovePromo(){
		$cache.checkoutWrapper.on("click", '.removeCode button', function(e){
			e.preventDefault();
			
			var url = app.util.appendParamsToUrl(app.urls.removeCoupon, {couponCode:$(this).attr('rel'), format:"ajax"});
			$.getJSON(url, function(data) {				
				//refresh summary.
				$('#secondary').load(app.urls.summaryRefreshURL);
				
				//reset error messages
				$cache.couponCode = $cache.couponCode || $cache.checkoutForm.find("input[name$='_couponCode']");				
				$cache.CouponError.html('').hide();
								
			});
		});
	}

	function shippingLoad() {
		$cache.checkoutForm.on("click", "#is-gift-yes, #is-gift-no", function (e) {
			$cache.checkoutForm.find(".gift-message-text").toggle($cache.checkoutForm.find("#is-gift-yes")[0].checked);
		})
		.on("change",
			"input[name$='_addressFields_state'], input[name$='_addressFields_city'], input[name$='_addressFields_zip']",
			updateShippingMethodList
		);

		// gift message character limitation
		initGiftMessageBox();
		updateShippingMethodList();
		loadRemovePromo();
		return null;
	}

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

	//changes the payment method form
	function changePaymentMethod(paymentMethodID) {
		$cache.paymentMethods.removeClass("payment-method-expanded");
		$cache.paymentOptions.removeClass("form-row-selected");
		var pmc = $cache.paymentMethods.filter("#PaymentMethod_"+paymentMethodID);
		var ptc = $cache.paymentOptions.filter("#PaymentSelector_"+paymentMethodID);
		if (pmc.length===0) {
			pmc = $("#PaymentMethod_Custom");
		}
		if (ptc.length===0) {
			ptc = $("#PaymentSelector_Custom");
		}		
		pmc.addClass("payment-method-expanded");
		ptc.addClass("form-row-selected");

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
		
		//GA Tag cart_abandon
		if(app.registeredUser){
			var registeredUserGA = 'RC';
		}else{
			var registeredUserGA = 'NC';
		}
		utag.link({event_type: 'cart_abandon', event_category: 'Checkout Billing Page', event_action: 'Button', event_label: registeredUserGA + ' payment option ' + paymentMethodID + ' clicked'});
		
		app.validator.init();
	}

	//changes the payment method form
	function changeRewardMethod(rewardMethodID) {
		$cache.rewardMethods.removeClass("reward-method-expanded");
		$cache.rewardOptions.removeClass("form-row-selected");
		
		var rtc;
		// if the "merchandise credit" tab was clicked, display the "gift card" field
		if( rewardMethodID == "MERCHANDISE_CREDIT" ) {
			rewardMethodID = "GIFT_CERTIFICATE";
			rtc = $cache.rewardOptions.filter("#RewardSelector_MERCHANDISE_CREDIT");
			
			// change input field label
			$("#RewardMethod_GIFT_CERTIFICATE .form-row label[for=dwfrm_billing_giftcardID] span").text("Card #");
			
			// hide "Check Balance" field
			$(".gc-checkbalance-wrapper").hide();
		}
		else
		{
			rtc = $cache.rewardOptions.filter("#RewardSelector_"+rewardMethodID);

			// change input field label
			$("#RewardMethod_GIFT_CERTIFICATE .form-row label[for=dwfrm_billing_giftcardID] span").text("Gift Card #");
			
			// hide "Check Balance" field
			$(".gc-checkbalance-wrapper").show();
		}
		
		var rmc = $cache.rewardMethods.filter("#RewardMethod_"+rewardMethodID);
		
		if (rmc.length===0) {
			rmc = $("#RewardMethod_Custom");
		}
		if (rtc.length===0) {
			rtc = $("#RewardSelector_Custom");
		}
		rmc.addClass("reward-method-expanded");
		rtc.addClass("form-row-selected");

		// ensure checkbox of payment method is checked
		$("#reward-" + rewardMethodID)[0].checked = true;
	}
	
	function setCCFields(data) {
		// fill the form / clear the former cvn input
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

	//updates the credit card form with the attributes of a given card
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

	//loads billing address, Gift Certificates, Coupon and Payment methods
	function billingLoad() {
		
		if( !$cache.paymentMethodId ) return;
		
		$cache.paymentMethodId.on("click", function () {
			changePaymentMethod($(this).val());
		});

		if($cache.rewardMethodId) {

			$cache.rewardMethodId.on("click", function () {
				changeRewardMethod($(this).val());
			});			

			// get selected reward method from billing form
			var rewardMethodId = $cache.rewardMethodId.filter(":checked");
			changeRewardMethod(rewardMethodId.length===0 ? "GIFT_CERTIFICATE" : rewardMethodId.val());
		}
		
		// get selected payment method from payment method form
		var paymentMethodId = $cache.paymentMethodId.filter(":checked");
		if(paymentMethodId.length>0) {
			changePaymentMethod(paymentMethodId.val());
		}
		
		// select credit card from list
		$cache.ccList.on("change", function () {
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

			var paymentMethodId = $cache.paymentMethodId.filter(":checked");

			if(paymentMethodId.length>0 && paymentMethodId.val() == "AMAZON") {
				e.preventDefault();				
				$cache.amazonDiv = $('#AmazonCheckoutWrapper_billing');
				$cache.amazonImg = $cache.amazonDiv.find('img');
				$cache.amazonImg.click();				
			}

			var tc = $cache.checkoutForm.find("input[name$='bml_termsandconditions']");
			if ($cache.paymentMethodId.filter(":checked").val()==="BML" && !$cache.checkoutForm.find("input[name$='bml_termsandconditions']")[0].checked) {
				alert(app.resources.BML_AGREE_TO_TERMS);
				return false;
			}

		});
		
		function initGiftCardRemoveClick() {	
			$("[id^='rgc-']").each(function() {
				$(this).on('click',function (e) {
					e.preventDefault();
					var elId = $(this).attr('id');
					var gcId = elId.replace('rgc-','');
					var gcTopId = '#rgct-' + gcId;
					var removeUrl = app.util.appendParamsToUrl(app.urls.giftCardRemove,{format:"ajax",giftCertificateID:gcId});
					$(this).parent().parent().remove();
					$(gcTopId).parent().parent().remove();
					app.ajax.getJson({
						url: removeUrl,
						callback: function(data) {
							$('#secondary').load(app.urls.summaryRefreshURL);
							$('#remainingBalance').hide().html('');
							
						}
					});
				});
			});
			$("[id^='rgct-']").each(function() {
				$(this).on('click',function (e) {
					e.preventDefault();
					var elId = $(this).attr('id');
					var gcId = elId.replace('rgct-','');
					var gcBottomId = '#rgc-' + gcId;
					var removeUrl = app.util.appendParamsToUrl(app.urls.giftCardRemove,{format:"ajax",giftCertificateID:gcId});
					$(this).parent().parent().remove();
					$(gcBottomId).parent().parent().remove();
					app.ajax.getJson({
						url: removeUrl,
						callback: function(data) {
							$('#secondary').load(app.urls.summaryRefreshURL);
						}
					});
				});
			});			
		}
		
		$cache.gcApply.on('click', function (e) {
			e.preventDefault();
			$cache.gcCode = $cache.gcCode || $cache.checkoutForm.find("input[name$='_giftcardID']");
			$cache.gcEAN = $cache.gcEAN || $cache.checkoutForm.find("input[name$='_giftcardEAN']");
			$cache.balance = $cache.balance || $cache.checkoutForm.find("div.balance");
			
			var error = $cache.balance.find("span.error");
			if (error.length===0) {
				error = $("<span>").addClass("error").appendTo($cache.balance);
			}
			error.html('');
			if ($cache.gcCode.length===0 || $cache.gcCode.val().length===0) {
				error.html(app.resources.GIFT_CARD_MISSING);
				return;
			}
			
			var val = $cache.gcCode.val();
			var pin = $cache.gcEAN.val();
			var url = app.util.appendParamsToUrl(app.urls.giftCardApply, {giftcardID:val, giftcardEAN:pin});
			
			app.ajax.getJson({
				url: url,
				callback: function(data) {
					if(data.error == 'null'){
						if(data.amount != 'null' && data.amount >= 0){
							$cache.appliedDiv = jQuery('#gc-applied-placeholder');
							$cache.appliedTopDiv = jQuery('#gc-applied-placeholder-top');

							if ($cache.appliedDiv.length > 0) {
								// check if the new gift card number has already been applied
								var existingHtml = jQuery('#gc-applied-placeholder').html();
								if(existingHtml.indexOf(val) < 0) {
									var newDiv = $("<div>").addClass("gcApplied-wrapper").appendTo($cache.appliedDiv);
									var appliedDiv = $("<div>").addClass("gcApplied").appendTo(newDiv);
									var gcNumDiv = $("<div>").addClass("gcNum").appendTo(appliedDiv);
									gcNumDiv.html('Gift Card # ' + val + ': ');
									var gcValDiv = $("<div>").addClass("gcVal").appendTo(appliedDiv);
									gcValDiv.html('$' + data.amount);
									var removeDiv = $("<div>").addClass("gcRemove").appendTo(newDiv);
									var removeUrl = app.util.appendParamsToUrl(app.urls.giftCardRemove,{format:"ajax"});
									var removeLink = '<input type="image" src="' + app.urls.removeButtonImage + '" id="rgc-' + val + '" class="remove" />';
									removeDiv.html(removeLink);
									initGiftCardRemoveClick();
								}
							}
							if($cache.appliedTopDiv.length > 0) {
								var existingHtml = jQuery('#gc-applied-placeholder-top').html();
								if(existingHtml.indexOf(val) < 0) {
									var newDiv = $("<div>").addClass("gcApplied-wrapper").appendTo($cache.appliedTopDiv);
									var appliedTopDiv = $("<div>").addClass("gcApplied").appendTo(newDiv);
									var gcNumDiv = $("<div>").addClass("gcNum").appendTo(appliedTopDiv);
									gcNumDiv.html('Gift Card # ' + val + ': ');
									var gcValDiv = $("<div>").addClass("gcVal").appendTo(appliedTopDiv);
									gcValDiv.html('$' + data.amount + ' ' + app.resources.GIFT_CERT_APPLIED);
									var removeDiv = $("<div>").addClass("gcRemove").appendTo(newDiv);
									var removeUrl = app.util.appendParamsToUrl(app.urls.giftCardRemove,{format:"ajax"});
									var removeLink = '<input type="image" src="' + app.urls.removeButtonImage + '" id="rgct-' + val + '" class="remove" />';
									removeDiv.html(removeLink);
									initGiftCardRemoveClick();								
								}
							} 
							if (data.remainingorderbalance != 'null' && data.remainingorderbalance > 0) {
								$('#remainingBalance').show().html("You have a remaining order balance of: $" + parseFloat(data.remainingorderbalance).toFixed(2) );
							}
							$('#secondary').load(app.urls.summaryRefreshURL);
						} else {
							var error = $cache.balance.find("span.error");
							if (error.length===0) {
								error = $("<span>").addClass("error").appendTo($cache.balance);
							}
							error.html(app.resources.GIFT_CERT_BALANCE + ' $0.00.');
						}
					}else{
						var error = $cache.balance.find("span.error");
						if (error.length===0) {
							error = $("<span>").addClass("error").appendTo($cache.balance);
						}
						error.html('');						
						error.html(data.error);
					}
					//GA Tag cart_abandon
					if(app.registeredUser){
						var registeredUserGA = 'RC';
					}else{
						var registeredUserGA = 'NC';
					}
					utag.link({event_type: 'cart_abandon', event_category: 'Checkout Billing Page', event_action: 'Button', event_label: registeredUserGA + ' giftcard applied'});
				}				
				
			});		
		});
		
		$cache.gcCheckBalance.on('click', function (e) {
			e.preventDefault();
			$cache.gcCode = $cache.gcCode || $cache.checkoutForm.find("input[name$='_giftcardID']");
			$cache.gcEAN = $cache.gcEAN || $cache.checkoutForm.find("input[name$='_giftcardEAN']");
			$cache.balance = $cache.balance || $cache.checkoutForm.find("div.balance");
			var error = $cache.balance.find("span.error");
			if (error.length===0) {
				error = $("<span>").addClass("error").appendTo($cache.balance);
			}
			error.html('');
			if ($cache.gcCode.length===0 || $cache.gcCode.val().length===0) {
				error.html(app.resources.GIFT_CARD_MISSING);
				return;
			}
			
			var val = $cache.gcCode.val();
			var pin = $cache.gcEAN.val();
			var url = app.util.appendParamsToUrl(app.urls.giftCardCheckBalance, {giftCardID:val, PIN:pin});
			
			app.ajax.getJson({
				url: url,
				callback: function(data) {
					if(data.error == 'null'){
							// display details in UI
							var balanceDiv = $cache.balance.find("span.error");
							if (balanceDiv.length===0) {
								balanceDiv = $("<span>").addClass("error").appendTo($cache.balance);
							}
							var balance = 0;
							if(data.amount != 'null' && data.amount >= 0) {
								balance = data.amount;
							}
							balanceDiv.html(app.resources.GIFT_CERT_BALANCE+" $"+balance);
						//}
					}else{
						// error
						error.html(data.error);
						return;
					}
				}
			});
			
		});
		

		$cache.addCoupon.on("click", function(e){
			e.preventDefault();
			$cache.couponCode = $cache.couponCode || $cache.checkoutForm.find("input[name$='_couponCode']");
			$cache.redemption = $cache.redemption || $cache.checkoutForm.find("div.redemption.coupon");
			var val = $cache.couponCode.val(),
				billingPage = ($cache.addCoupon.attr('rel') == 'promo_billing' ? true : false);
			
			$cache.CouponError.html('').hide();
			
			if (val.length===0) {
				if(billingPage){
					var error = $cache.CouponError;
				}else{
					var error = $cache.redemption.find("span.error");
					if (error.length===0) {
						error = $("<span>").addClass("error").appendTo($cache.redemption);
					}
					
				}
				error.html(app.resources.COUPON_CODE_MISSING).fadeIn();
				return;
			}

			var url = app.util.appendParamsToUrl(app.urls.addCoupon, {couponCode:val,format:"ajax"});
			$.getJSON(url, function(data) {
				var fail = false;
				var msg = "";
				if (!data) {
					msg = app.resources.BAD_RESPONSE;
					fail = true;
				}
				else if (!data.success) {
					msg = data.message;
					fail = true;
				}
				if (fail) {
					if(billingPage){
						$cache.CouponError.html(msg).fadeIn();
					}else{
						var error = $cache.redemption.find("span.error");
						if (error.length===0) {
							$("<span>").addClass("error").appendTo($cache.redemption);
						}
						error.html(msg);
						return;
					}
				}
				
				//If we are on billing page, update summary.
				if(billingPage){
					//refresh summary.
					$('#secondary').load(app.urls.summaryRefreshURL);
				}
				
				$cache.redemption.html(data.message);
				
				//GA Tag cart_abandon
				if(app.registeredUser){
					var registeredUserGA = 'RC';
				}else{
					var registeredUserGA = 'NC';
				}
				utag.link({event_type: 'cart_abandon', event_category: 'Checkout Billing Page', event_action: 'Button', event_label: registeredUserGA+' Promo applied'});
				
			});
		});
		
		loadRemovePromo();
		loadLoyalty();
		initGiftCardRemoveClick();
		
		//if ($cache.paymentMethodId.val() != app.constants.PI_METHOD_GIFT_CERTIFICATE) {
		if (!$cache.giftCardApplied.val()) {
			var errText = null;
			$('.form-caption.error-message').each(function() {
				errText = (errText != null) ? errText+$(this).html() : $(this).html();
				errText += "<br/>";
			});	
			if(errText != null) {
				$('.billing-top.error-message').html(errText);
				$('.billing-top.error-message').show();
			} else {
				$('.billing-top.error-message').hide();
			}
		}
	}

	function loadLoyalty() {
		var url = app.urls.updateLoyaltyNumber;
		$('#RewardMethod_LOYALTY').load(url, function() {
			$cache.loyaltyErrorDiv = $cache.loyaltyErrorDiv || $cache.checkoutForm.find("div.loyaltyerror");
			var error = $cache.loyaltyErrorDiv.find("span.error");
			error.html('');
		});
	}
	
	function initializeDom() {
		isShipping = $(".checkout-shipping").length > 0;
	}

	function initializeCache() {
		$cache.checkoutForm = $("form.address");
		$cache.checkoutWrapper = $(".pt_checkout");
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
			$cache.paymentOptions = $cache.checkoutForm.find("div.payment-selector");
			$cache.paymentMethods = $cache.checkoutForm.find("div.payment-method");
			$cache.paymentMethodId = $cache.checkoutForm.find("input[name$='_selectedPaymentMethodID']");
			$cache.rewardOptions = $cache.checkoutForm.find("div.reward-selector");
			$cache.rewardMethods = $cache.checkoutForm.find("div.reward-method");
			$cache.rewardMethodId = $cache.checkoutForm.find("input[name$='selectedRewardMethodID']");
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
			$cache.gcApply = $("#gc-apply");
			$cache.addCoupon = $("#add-coupon");
			$cache.giftCardApplied= $cache.checkoutForm.find("input[name$='GCJustApplied']");
			$cache.CouponError = $('#RewardMethod_PROMO').find('div.error');
		}
	}

	function initializeEvents() {
		addressLoad();
		if (isShipping) {
			shippingLoad();
		}
		else {
			billingLoad();
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


// app.quickview
(function (app, $) {
	var $cache = {};

	function bindQvButton() {
		$cache.qvButton.one("click", function (e) {
			e.preventDefault();
			app.quickView.show({
				url : $(this).attr("href"),
				source : "quickview"
			});
		});
	}
 
	//Timeout for prevent unintentional hover over image.
	var changeTimeout = '';
	
	//If image list needs to be built this function does that.
	function buildImageList(element){
		var clone = element.clone(),//clone of oringal.
			newID = clone.attr('id'),
			productImg = clone.find('img'),
			testImg = new Image(),
			testImg2 = new Image();
		
		newID = newID.replace('_1', '_2');//setting the new ID
		productImg = productImg.attr('src').replace('_a1zm', '_a2zm');//setting the new img
		
		//Test if img is on server before appending event and DOM.
		testImg.onload = function() {
			appendAltImg();
		};
		testImg.onerror = function() {//Second IMG does not exist.  3rd IMG should then be used.	
			productImg = productImg.replace('_a2zm', '_a3zm');//setting the new img
			//Test if the 2nd img is on server before appending event and DOM.
			testImg2.onload = function() {
				appendAltImg();
			};
			testImg2.onerror = function() {//Third image does not exist, assign class to we do not do a look up next time.	
				element.parent().addClass('noImage');
			}
			testImg2.src = productImg; // fires off loading of image2
					
		};
		
		testImg.src = productImg; // fires off loading of image
		
		function appendAltImg(){//function that appeneds the new alt IMG to the DOM.
			clone.removeAttr('id').attr('id', newID).addClass('thumbnail_two');		
			clone.find('img').attr('alt', '').attr('src', productImg);		
			
			element.after(clone);//insert new image setup on DOM		
			app.quickView.toggleImgThumbnail(element);
		}
		
	}
	
	app.quickView = {
		//Event for hover/swipe of tile image.
		initializeImageEvents :	function (imgThumb){
			//if we have only 1 image, get another to 'flip'
			if(!imgThumb.parent().hasClass('noImage')){//noImage means there is not an ALT image for this product.
				if(imgThumb.length == 1) {
					changeTimeout = setTimeout(function(){
						//Build ALT images
						buildImageList(imgThumb);
					},100);
					
				}else{
					//else just toggle the images.
					changeTimeout = setTimeout(function(){
						app.quickView.toggleImgThumbnail(imgThumb.first());
					},150);					
				}
			}
		},	
		
		toggleImgThumbnail : function (element) {	
			if(element.siblings('.product-image-thumb').length > 0){
				element.siblings().fadeIn('fast').end().fadeOut('fast').parents('.product-image').toggleClass('over');
			}
			
		},
		
		initializeButton : function (container, target) {
			// quick view button
			$(container).off();
			$(container).on("mouseenter touch", target, function (e) {
				
				if(!$cache.qvButton) {
					$cache.qvButton = $("<a id='quickviewbutton'/>");
				}
				
				if($(this).parents().hasClass('tablet')){
					$cache.qvButton = $("<a id='noquickview' />");
				}
				
				bindQvButton();
				var imgThumb = $(this).find(".product-image-thumb");
				
				app.quickView.initializeImageEvents(imgThumb);
				
				var link = $(this).find("a:first");
				$cache.qvButton.attr({
					"href" : link.attr("href"),
					"title" : link.attr("title")
				}).appendTo($(this));
			});

			$(container).on("mouseleave", target, function (e) {
				var imgThumb = $(this).find(".product-image-thumb.thumbnail_two");
				clearTimeout(changeTimeout);

				app.quickView.toggleImgThumbnail(imgThumb);

			});
		},
		init : function () {
			if(app.quickView.exists()) {
				return $cache.quickView;
			}

			$cache.quickView = $("<div/>").attr("id", "QuickViewDialog").appendTo(document.body);
			return $cache.quickView;
		},
		// show quick view dialog and send request to the server to get the product
		// options.source - source of the dialog i.e. search/cart
		// options.url - product url
		show : function (options) {
			options.target = app.quickView.init();
			options.callback = function () {
				app.product.init();
				app.dialog.create({
					target : $cache.quickView,
					options : {
						height : 'auto',
						width : 1180,
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
			};
			app.product.get(options);

			$cache.quickView.append("<a class='qvClose'> </a>");
			$cache.quickView.find(".qvClose").on("click", function(){
				$cache.quickView.dialog('close');
				
			});
			
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
//
//
(function (app, $) {

	// sub namespace app.util.* contains utility functions
	app.util = {

		// trims a prefix from a given string, this can be used to trim
		// a certain prefix from DOM element IDs for further processing on the ID
		trimPrefix : function (str, prefix) {
			return str.substring(prefix.length);
		},

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
				url:$(actionSource).attr("href") || $(actionSource).closest("form").attr("action"),
				target:dlg, callback: function () {
					dlg.dialog("open");	// open after load to ensure dialog is centered
					app.validator.init(); // re-init validator
				},
				data : !$(actionSource).attr("href") ? postData : null

			});
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
			
			return (
					top < (window.pageYOffset + window.innerHeight) &&
					left < (window.pageXOffset + window.innerWidth) &&
					(top + height) > window.pageYOffset &&
					(left + width) > window.pageXOffset
			);
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
			}).attr("href", url); // for i.e. <9, href must be added after link has been appended to head
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

			var params = {}, unescapedQS = unescape(qs);
			// Use the String::replace method to iterate over each
			// name-value pair in the string.
			unescapedQS.replace( new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
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

		setDeleteConfirmation : function(container, message) {
			$(container).on("click", ".delete", function(e){
				return confirm(message);
			});
		},

		scrollBrowser : function (xLocation) {
			$('html, body').animate({ scrollTop: xLocation }, 500);
		}

	};
}(window.app = window.app || {}, jQuery));

// app.page
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

	//updates the after address form with the attributes of a given address
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

	//copy address before fields to address after fields
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
			registryItemsTable : $("form[name$='_giftregistry_items']"),
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
}(window.app = window.app || {}, jQuery));

// app.components
(function (app, dw, $) {
	// capture recommendation of each product when it becomes visible in the carousel

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
			itemFallbackDimension: 300,
			itemVisibleInCallback : app.captureCarouselRecommendations
		},
		init : function () {
			setTimeout(function(){
			// renders horizontal/vertical carousels for product slots
			$('#vertical-carousel').jcarousel($.extend({vertical : true}, app.components.carouselSettings));
			$('#horizontal-carousel').jcarousel(app.components.carouselSettings);
			$('#carousel-recomendations').css("width","auto");
			}, 1000);
		}
	};
}(window.app = window.app || {}, window.dw, jQuery));

// app.cart
(function (app, $) {
	var $cache = {};

	if($('div.wetseal').length > 0) {
		if($('#loyalty-order-discount-amount').length > 0 && $('.loyalty-savings .isLoyalty').length > 0)
		{
			var discountAmt = $('#loyalty-order-discount-amount').html();
			var currentSavingsMsg = app.resources.LOYALTY_EARNED_MESSAGE + ' ' + discountAmt + ' ' + app.resources.LOYALTY_EARNED_CONTINUED;
			$('.loyalty-savings .isLoyalty').html(currentSavingsMsg);		
		} else if ($('#cart-order-subtotal').length > 0) {
			if ($('#loyalty-order-discount-amount').length > 0) {
				var subtotalAmt = $('#loyalty-order-discount-amount').html();
				subtotalAmt = subtotalAmt.replace('$','');
				var discountAmt = subtotalAmt;
			
			}
			else {
				var subtotalAmt = $('#cart-order-subtotal').html();
				subtotalAmt = subtotalAmt.replace('$','');
				var discountAmt = (subtotalAmt * 0.20).toFixed(2);
			}
			
			
			
			var currentSavingsMsg = app.resources.LOYALTY_SAVINGS_MESSAGE + ' ' + discountAmt + ' ' + app.resources.LOYALTY_SAVINGS_CONTINUED;
			$('.loyalty-savings .newLoyalty').html(currentSavingsMsg);
		}
	} else {
		// Must be ardenB
		if ($('#cart-order-subtotal').length > 0) {
			var subtotalAmt = $('#cart-order-subtotal').html();
			subtotalAmt = subtotalAmt.replace('$','');
			subtotalAmt = parseFloat(subtotalAmt);
			
			var discountAmt = 0;
			
			var loyaltyDiscount = 0;
			var loyaltyDiscountDiv = $('#loyalty-order-discount-amount');
			var loyaltyDiscountHtml = "$0.00";
			if(loyaltyDiscountDiv.length > 0) {
				loyaltyDiscountHtml = $('#loyalty-order-discount-amount').html();
				loyaltyDiscount = loyaltyDiscountHtml.replace('$','');
				loyaltyDiscount = parseFloat(loyaltyDiscount);
			}
			
			var orderDiscounts = 0;
			$('.order-discount-amount').each(function() {
				var orderDiscountHtml = $(this).html();
				var orderDiscountAmt = orderDiscountHtml.replace('$','');
				orderDiscounts += parseFloat(orderDiscountAmt);
			});				
			
			discountAmt = parseFloat(subtotalAmt - (loyaltyDiscount + orderDiscounts));
			discountAmt = (discountAmt > 0.0) ? Math.floor(discountAmt) : 0;
			
			if($('.loyalty-savings .newLoyalty').length > 0) {
				var currentSavingsMsg = app.resources.LOYALTY_SAVINGS_MESSAGE + ' ' + discountAmt + ' ' + app.resources.LOYALTY_SAVINGS_CONTINUED;
				$('.loyalty-savings .newLoyalty').html(currentSavingsMsg);
			} else {
				var currentSavingsMsg = app.resources.LOYALTY_EARNED_MESSAGE + ' ' + discountAmt + ' ' + app.resources.LOYALTY_SAVINGS_CONTINUED + ' ' + app.resources.LOYALTY_EARNED_CONTINUED;
				var loyaltyBalanceMsg = app.resources.LOYALTY_BALANCE + ' ' + loyaltyDiscountHtml + ' ' + app.resources.LOYALTY_APPLIED;
				currentSavingsMsg = (discountAmt <= 0 && loyaltyDiscount > 0) ? loyaltyBalanceMsg : currentSavingsMsg;
				$('.loyalty-savings .isLoyalty').html(currentSavingsMsg);						
			}
		}				
	}
		
	function updateCart(postdata, callback) {
		var url = app.util.ajaxUrl(app.urls.addProduct);
		$.post(url, postdata, callback || app.cart.refresh);
	}

	function initializeCache() {
		$cache = {
			cartTable : $("#cart-table"),
			itemsForm : $("#cart-items-form"),
			addCoupon : $("#add-coupon"),
			couponCode : $("form input[name$='_couponCode']")
		};
	}

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

		// override enter key for coupon code entry
		$cache.couponCode.on("keydown", function (e) {
			if (e.which === 13 && $(this).val().length===0) { return false; }
		});		

		$cache.cartTable.on("change", "select.qty-selector", function (e) {
			var $target = $(e.currentTarget);
			$target.siblings('.item-user-actions').find('.qty-user-action').click();
		});
	}

	app.cart = {
		add : function (postdata, callback) {
			updateCart(postdata, callback);
		},
		remove : function () {
			return;
		},
		update : function (postdata, callback) {
			updateCart(postdata, callback);
		},
		refresh : function () {
			// refresh without posting
			app.page.refresh();
		},
		init : function () {
			// edit shopping cart line item
			initializeCache();
			initializeEvents();
		}
	};

}(window.app = window.app || {}, jQuery));

// app.account
(function (app, $) {
	var $cache = {};

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

	function initAddressEvents() {
		var addresses = $(".address-list");
		if (addresses.length===0) { return; }

		addresses.on("click", ".delete", function(e){
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

	function initializeEvents() {
		toggleFullOrder();
		initAddressEvents();
		initPaymentEvents();
		
		$(".fashioninsider .updateLoyaltyNo, .loyalty-details .updateLoyaltyNo").on('click', function(e){
			e.preventDefault();
			$(this).parents(".cardNo, .loyalty-details").find(".loyaltyform").show();
		});
	}

	app.account = {
		init : function () {
			initializeEvents();

			app.giftcert.init();
		}
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
		$cache.wishlistTable.on("click", ".item-details a", function (e) {
			e.preventDefault();
			app.quickView.show({
				url : e.target.href,
				source : "wishlist"
			});
		});
		
		$(".item-dashboard").each(function(){
			var thisItem = $(this);
			var thisQty = thisItem.find(".option-quantity-desired input").val();
			var addToCartQty = thisItem.find(".addqtyInput").val();
			
				if(addToCartQty != thisQty){
					thisItem.find(".addqtyInput").val(thisQty);
				}
			
		});
	}

	app.wishlist = {
		init : function () {
			$cache.editAddress = $('#editAddress');
			$cache.wishlistTable = $('.pt_wish-list .item-list');
			app.product.initAddToCart();
			initializeEvents();

		}
	};
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
			$cache.mcTotal = $cache.minicart.find(".mini-cart-total");
			$cache.mcContent = $cache.minicart.find(".mini-cart-content");
			$cache.mcClose = $cache.minicart.find(".mini-cart-close");
			$cache.mcProductList = $cache.minicart.find(".mini-cart-products");
			$cache.mcProducts = $cache.mcProductList.children(".mini-cart-product");

			//var collapsed = $cache.mcProductList.children().not(":first").addClass("collapsed");


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

			//$cache.mcProducts.append('<div class="mini-cart-toggler">&nbsp;</div>');
			//$cache.mcProductList.toggledList({toggleClass : "collapsed", triggerSelector:".mini-cart-toggler", eventName:"click"});

			initialized = true;
		},
		// shows the given content in the mini cart
		show : function (html) {
			$cache.minicart.html(html);
			app.util.scrollBrowser(0);
			app.minicart.init();
			app.minicart.slide();
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
		}
	};
}(window.app = window.app || {}, jQuery));

// app.dialog
(function (app, $) {
	// private

	var $cache = {};
	// end private

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
			$cache.container.dialog($.extend(true, {}, app.dialog.settings, params.options || {}));
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
				callback : function () {

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
		};

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

	function validateEmail(value, el) {
		var isOptional = this.optional(el);
		var isValid = regex.email.test($.trim(value));
		return isOptional || isValid;
	}

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
		var isValid = (!isNaN(value)) && (parseFloat(value)>=5) && (parseFloat(value)<=5000);
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

	app.validator = {
		regex : regex,
		settings : settings,
		init : function () {

			$("form:not(.suppress)").each(function () {
				$(this).validate(app.validator.settings);
			});

		},
		initForm : function(f) {
			$(f).validate(app.validator.settings);
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
		// @param - target - Object - Selector or element that will receive content
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

	app.searchsuggest = {
		// configuration parameters and required object instances
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
		// trigger suggest action
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
		clearResults : function () {
			if (!$resultsContainer) { return; }
			$resultsContainer.empty().hide();
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

// initialize app
jQuery(document).ready(function () {
	app.init();
	
	var storeName = app.resources.STORE_NAME.replace(/\s/g, '');
	$('body').addClass(storeName)
	
	
	$('#homepage-slider').flexslider({
		prevText: "",
		nextText: "",  
		selector: ".jcarousel-list > li",
	    animation: "slide",
 	    touch:true,
 	    pauseOnAction:true,
 	    useCSS: false,
	    start: function(slider){
	    	$('body').removeClass('loading');
	    }
	 });
	
	$('#lookbook-slider').flexslider({
		prevText: "",
		nextText: "",  
		selector: ".jcarousel-list > li",
	    animation: "slide",
 	    touch:false,
 	    pauseOnAction:false,
	    start: function(lookbookslider){
	    	$('body').removeClass('loading');
	    }
	 });	

	
	$('#pdp-slider').flexslider({
		prevText: "",
		nextText: "",  
		selector: ".jcarousel-list > li",
	    animation: "slide",
	    start: function(pdpslider){
	    	$('body').removeClass('loading');
	    }
	 });	
	
	$('.backToTop').on('click', function(e){
		e.preventDefault();
		$("html,body").animate({ scrollTop: 0 }, "slow")
	});
	
	//$('.primary-image').css('width','122px')
	
	/** width calculations for menu navigation **/
	$("div.level-2").each(function(){
		var mainDiv = $(this);
		var numElems = 1;
		if($(".custom", this).length != 0){
			numElems = 2;
		} 
		if($(".menupromo.1", this).children().length != 0){
			numElems = numElems + 1;
		} 
		if($(".menupromo.2", this).children().length != 0){
			numElems = numElems + 1;
		}
		
		var elementWidth = (numElems * 215) + 60;
		thisWidth = elementWidth + "px";
		mainDiv.css('min-width',thisWidth);
	});
});





