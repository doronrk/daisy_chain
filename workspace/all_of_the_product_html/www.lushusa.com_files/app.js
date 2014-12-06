/*
 * All java script logic for the application.
 *
 * The code relies on the jQuery JS library to
 * be also loaded. 
 */
// semi-colon to assure functionality upon script concatenation and minification
; 

//if jQuery has not been loaded, load from google cdn
if (!window.jQuery) {
	var s = document.createElement('script');
	s.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
	s.setAttribute('type', 'text/javascript');
	document.getElementsByTagName('head')[0].appendChild(s);
}

var app = (function (app, $) {
	document.cookie="dw=1";
	/******** private functions & vars **********/
	
	// cache dom elements accessed multiple times
	// app.ui holds globally available elements
	function initUiCache() {
		app.ui = {
			searchContainer : $("#navigation .header-search"),
			printPage		: $("a.print-page"),
			reviewsContainer: $("#pwrwritediv"),
			main			: $("#main"),
			html            : $('html'),
			primary			: $("#primary"),
			secondary		: $("#secondary"),
			// elements found in content slots
			slots : {
				subscribeEmail : $(".subscribe-email")
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
	}

	function initializeDom() {
		// add class to html for css targeting
	
		if(typeof Modernizr != 'undefined'){
			$('html').addClass('no-js');
		}else{
			$('html').addClass('js');
			}

		// load js specific styles
		app.util.loadCssFile(app.util.staticUrl("/css/js-style.css"));		
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
			app.minisignin.init();
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



//app.tooltips
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

		if(navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/) && Modernizr.touch) {
			var url = app.urls.productNav+(app.urls.productNav.indexOf("?") < 0 ? "?" : "&")+hashParams;
			app.ajax.load({url:url, target: navContainer, callback : function (data) {
	          SlideNext.init();
			}});
		}
		
	}

	/**
	 @description Sets the main image attributes and the href for the surrounding <a> tag
	 @param {Object} atts Simple object with url, alt, title and hires properties
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
	 @description helper function for swapping main image on swatch hover
	 @param {Element} element DOM element with custom data-lgimg attribute
	 */
	function swapImage(element) {
		var lgImg = $(element).data("lgimg");

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



	function loadZoom() {
		if(app.quickView.isActive() || !app.zoomViewerEnabled ||  app.isMobileUserAgent ) { return; }

		var $mainImg = $cache.pdpMain.find("a.main-image");

		//zoom properties
		var options = {
			zoomType: 'standard',
			alwaysOn : 0, // setting to 1 will load load high res images on page load
			zoomWidth : $mainImg.width(),
			zoomHeight : $mainImg.width(),
			position:'right',
			preloadImages: 0, // setting to 1 will load load high res images on page load
			xOffset: 10,
			yOffset:0,
			showEffect : 'fadein',
			hideEffect: 'fadeout',
			fadeoutSpeed: 100,
			fadeinSpeed: 200
		};
		
	  	
		$mainImg.removeData("jqzoom").jqzoom(options);
	}

	function replaceImages() {		
		var newImages = $("#update-images");
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
	
		/* Old tabs from jquery UI ->  
		   if($.fn.tabs) {
			$cache.pdpMain.find('.product-tabs').tabs();
		}
		*/
			
			
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

		// *** Hidden - moved product detail template -- loadProductNavigation();
		setMainImageLink();		

		if ($cache.productSetList.length>0) {
			var unavailable = $cache.productSetList.find("form").find("button.add-to-cart.disable");
			if (unavailable.length > 0) {
				$cache.addAllToCart.addClass("disabled");
				$cache.addToCart.addClass("disabled"); // this may be a bundle

			}
		}

	}

	function initializeCache() {
		$cache = {
			productId : $("#pid"),
			pdpMain : $("#pdpMain"),
			mainContainer : $("#main.container"),
			productContent : $("#product-content"),
			thumbnails : $("#thumbnails"),
			bonusProductGrid : $(".bonusproductgrid"),
			imageContainer : $(".product-primary-image"),
			productSetList : $("#product-set-list"),
			addToCart : $("#add-to-cart"),
			addAllToCart : $("#add-all-to-cart")
		};
		$cache.detailContent = $cache.pdpMain.find("div.detail-content");
		$cache.pdpForm = $cache.pdpMain.find("form.pdpForm");
		$cache.swatches = $cache.pdpMain.find("ul.swatches");
		$cache.mainImageAnchor = $cache.imageZoom = $cache.imageContainer.find("a.main-image");
		$cache.mainImage = $cache.mainImageAnchor.find("img.primary-image");
	}

	function swapZoom(newUrl) {
		
		var imgZoom = $cache.pdpMain.find("a.main-image");
		var absUrl = newUrl;
		if (imgZoom.length>0) {
			imgZoom.attr("href", absUrl);
		}
		
	}
	
	function initializeEvents() {
		
		var availabilityContainer = $cache.pdpMain.find("div.availability");
		
		app.product.initAddThis();
		
		// add or update shopping cart line item
		app.product.initAddToCart();
		$cache.pdpMain.on("change", "form.pdpForm input[name='Quantity']", function (e) {
			app.product.getAvailability($cache.productId.val(),
										$(this).val(),
										function (data) {
											if (!data || data.isAvailable) {
												$cache.addToCart.removeClass("disabled");
												availabilityContainer.find(".availability-qty-available").hide();
												availabilityContainer.find(".availability-msg").show();
												return;
											}
											$cache.addToCart.addClass("disabled");
											availabilityContainer.find(".availability-msg").hide();
											var avQtyMsg = availabilityContainer.find(".availability-qty-available");
											if (avQtyMsg.length===0) {
												avQtyMsg = $("<span/>").addClass("availability-qty-available").appendTo(availabilityContainer);
											}
											avQtyMsg.text(data.inStockMsg).show();
										});

		});
		$cache.pdpMain.on("click", "a.wl-action", function (e) {
			// work around for bundle products. options dropdown not included within form.
			e.preventDefault();
			
			var data = app.util.getQueryStringParams($cache.pdpForm.serialize());
			if (data.cartAction) {
				delete data.cartAction;
			}
			var url = app.util.appendParamsToUrl(this.href, data);
			url = this.protocol + "//" + this.hostname + ((url.charAt(0)==="/") ? url : ("/"+url));
			window.location.href = url;
		});

		$cache.pdpMain.on("hover", "ul.Color a.swatchanchor", function () {
			swapImage(this);
		});
		// productthumbnail.onclick()
		$cache.pdpMain.on("click", "img.productthumbnail", function () {
			var pContainer = $('.product-image-container')
			,lgImg = $(this).data("lgimg")
			,lgImgUrl = lgImg.url
			,hostUrl = lgImg.url;//window.location.origin
					
			var loaderSm = $cache.pdpMain.find('.loader-indicatorAbs');
			if(loaderSm.length > 0){
				loaderSm.show();
			}else{
				pContainer.append($("<div/>").addClass("loader-indicatorAbs"));
			}
			
			
			// switch indicator
			$cache.pdpMain.find("div.product-thumbnails li.selected").removeClass("selected");
			$(this).closest("li").addClass("selected");

			setMainImage(lgImg);
			setMainImageLink();
			
			//This swaps in the new url for zoom functionality to work
			swapZoom(hostUrl);
			// load zoom if not quick view
			loadZoom();
			
			$('.product-image-container').find('.loader-indicatorAbs').fadeOut();
			
		});

		// dropdown giftcard designs
		$cache.pdpMain.on("change", "#gcdesign", function (e) {			
			var selectedItem = $(this).val();			
			var imgZoom = $cache.pdpMain.find("a.main-image");
			console.log(imgZoom);
			if (imgZoom.length>0) {
				imgZoom.attr("href",selectedItem);
			}
	
			imgZoom.find("img.primary-image").attr({
				"src" : selectedItem,
				"alt" : "Lush Gift Card",
				"title" : "Lush Gift Card"
			});
			
			
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
		
		$cache.pdpMain.on("change", ".variation-select", function(e){
			if ($(this).val().length===0) {return;}
			var qty = $cache.pdpForm.find("input[name='Quantity']").first().val(),
				productSet = $(this).closest('.subProduct'),
				params = {
					Quantity : isNaN(qty) ? "1" : qty,
					format : "ajax"
				};
			
			var target = (productSet.length > 0 && productSet.children.length > 0) ? productSet : $cache.productContent;
			var url = unescape(app.util.appendParamsToUrl(unescape( $(this).val() ) , params) );
			app.progress.show($cache.pdpMain);
			
			app.ajax.load({
				url: url,
				callback : function (data) {
					target.html(data);
					app.product.initAddThis();
					app.product.initAddToCart();
					$("update-images").remove();
					loadZoom();
					
					//Ordergroove init
					if (typeof(OG) !== "undefined") {	
						if(app.quickView.isActive() && typeof OG.Controller.quick_view_loaded != 'undefined'){
							 OG.Controller.quick_view_loaded();
						} else{
						  if(typeof OG.Controller.kickstart != 'undefined'){
							OG.Controller.kickstart();
						  }
						}	
					};
					
					
					/*Custom wishlist and gift registry list */
					if($('.product-actions .wl-action')){
						jQuery('.product-actions .wl-action').on('click',function(e){
								e.stopImmediatePropagation();
								e.preventDefault();
								
								var form = $cache.pdpForm
						 		,productId
						 		,wlquant = jQuery("input[name='Quantity']").val()
						 		,addSlug
						 		;
							 
								 if( $(this).hasClass('giftregistry') ){ 
									addSlug = app.urls.giftRegistrySlug;
								 }else if($(this).hasClass('wishlist')){
		                            addSlug = app.urls.wishlistSlug;
								 }else{return true}
							 
							 	 var select = document.getElementsByClassName('variation-select')[0];
				                
							 	 if(select.length > 0){
								 	 if (select.options[select.selectedIndex].hasAttribute('data-og-product')){
					                        productId = select.options[select.selectedIndex].getAttribute('data-og-product');
					                        //console.log(productId);
					                 }else{ return true;}
							 	 }else{
							 		productId = form.find("input[name='pid']");
							 	 }
				                 
				                 
				               var addUrl = app.util.appendParamToURL(addSlug, 'pid', productId);
				                   addUrl = app.util.appendParamToURL(addUrl, 'Quantity', wlquant);
				          
	                            //console.log(addUrl);        
						        window.location.href = addUrl;  
					            return false;
						 		});	
						
					   }//end custom wishlist and gift regristry function	
				    
				    
				    


				}
			});
			
					
		});

		// swatch anchor onclick()
		$cache.pdpMain.on("click", "div.product-detail a[href].swatchanchor", function (e) {
			e.preventDefault();
			if ($(this).parent("li").hasClass("selected")) {
				return;
			}
			
			var isColor = $(this).closest("ul.swatches").hasClass("Color");
						
			var anchor = $(this),
				qty = $cache.pdpForm.find("input[name='Quantity']").first().val(),
				productSet = $(anchor).closest('.subProduct'),
				params = {
					Quantity : isNaN(qty) ? "1" : qty
				};
			
			var target = (productSet.length > 0 && productSet.children.length > 0) ? productSet : $cache.productContent;
			var url = unescape(app.util.appendParamsToUrl(unescape(this.href), params));
			app.progress.show($cache.pdpMain);
			
			app.ajax.load({
				url: url,
				callback : function (data) {
					target.html(data);
					app.product.initAddThis();
					app.product.initAddToCart();
					if (isColor) {
						replaceImages();
					}					
					loadZoom();
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
				if ($cache.productSetList.find("button.add-to-cart.disabled").length>0) {
					$cache.addAllToCart.addClass("disabled");
					$cache.addToCart.addClass("disabled"); // this may be a bundle
				}
				else {
					$cache.addAllToCart.removeClass("disabled");
					$cache.addToCart.removeClass("disabled"); // this may be a bundle
				}
				
				app.product.initAddToCart(ic);

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
		
		$cache.pdpMain.find("button.add-to-cart.disabled").attr('title', $cache.pdpMain.find(".availability-msg").html() );
	}
	
	function setAddToCartHandler(e) {
		e.preventDefault();
		var tileCont = $(this).closest('div'),
		isPdp = $('#pdpMain');
		if($(this).hasClass('disabled')){   
		if($('.tilenote').length > 0){
			    $('.tilenote').remove();
		}
		// add a note for users to select a size before continuing
		var $tilenote = jQuery(document.createElement('div'));
		$tilenote.addClass('tilenote').text('Select Size');	
		if($('#pdpMain')[0]){
		var tileSel = tileCont.find(".actions-nona2c");	
		}else{var tileSel = tileCont.closest('li.grid-tile').find(".sizeContainer");}
		tileSel.prepend($tilenote);
		$tilenote.fadeIn(function(){
			setTimeout( function() { $tilenote.fadeOut(); 
			/*tileSel.find(".variantdropdown select").stop().css("border-color", "#101010")
			.animate({ borderColor: "#D9D9D9"}, 1500);*/
			}, 1100 );
		});	
	    return false;
		}
		 
		if(isPdp.length > 0){
		app.progressMini.show($(this).closest('div.product-detail'));
		}else{
		app.progressMini.show($(this).closest('li.grid-tile'));
		}
		var form = $(this).closest("form");
		var qty = form.find("input[name='Quantity']");
		var qtyValue = qty.val();
		
		// Check if product is master before continuing 
		var itemQuant = form.find("input[name='pid']");
		if(itemQuant.length > 0){ 
			var itemId = itemQuant.val().toString();
			if(itemId != null && itemId != '' && typeof itemId != 'undefined'){
				if (itemId.indexOf("99999") >= 0){ 
				alert('Please choose a size before adding to cart');
				app.progressMini.hide();	
				 return false;
				}
			} 
		}
	
		var isSubItem = $(this).hasClass("sub-product-item");
		if(qty.length === 0 || isNaN(qty.val()) || parseInt(qty.val(), 10) === 0) {
			qty.val("1");
			var qtyValue = qty.val();
		}
		
		
		
		
		var data = form.serialize();
		app.cart.update(data, function (response) {
			var uuid = form.find("input[name='uuid']");
			if (uuid.length > 0 && uuid.val().length > 0) {
				app.cart.refresh();
				app.progressMini.hide();		
			}
			else {				
				if (!isSubItem) {
					app.quickView.close();
					
					/*** Refresh page if Bonus popup is present ***/
					if($('#bonus-product-dialog').length > 0) {
						app.page.refresh();
					}
				}
				app.progressMini.hide();
				app.minicart.show(response);
				
			}
				
			/*** Update shipping Banner **/
			/*if( $('.fs-promo').length > 0 ){
				initFreeShipping();
			}
			*/
			
		});
		
		
		
/* **************START: Custom coremetrics values*************** */
		if(isPdp.length > 0){
		  /** Get Product Name **/
		  var itemEl = isPdp.find(".product-name");
		  var itemName = itemEl.text();
		  
		  
		  /** Get Product Category **/
		  var productPrimary = isPdp.find('input[name="productPrimary"]');  
		  var productPrimeCat = '';
		  if(productPrimary){ 
			var productPrimeCat = productPrimary.val();
			  }
		  
		  /** Get Product Price**/
		  var itemPrice = isPdp.find(".price-sales");
		  var itemPriceNumber = itemPrice.text().replace('$', '').replace(/\s/g, "");
		  itenPriceNumber = parseFloat(itemPriceNumber);
		  
			  /** Get AutoRefresh**/
			 if($('#og-div')[0]){ 
			  var itemPrice = isPdp.find("#og_deliver_on_"+itemId);
				  if(itemPrice.length && itemPrice.is(':checked')){
				  	var itemAuto = "Y";  
				  }else{
					var itemAuto = "N";
				   }
			 } else{var itemAuto = ""; }
			 
		}else{
			
		  /** Get Product Name **/
		  var itemEl = form.find(".name-link");
		 
		  if(!$('html').hasClass('oldie') ){
			  var itemName = itemEl.text().trim();	  
		  }else{
			  var itemName = itemEl.text();
		  }
		  
		  /** Get Product Category **/
		  var productPrimeCat = '';
		  var productPrimary = form.find('input[name="productPrimary"]');
		  if(productPrimary){ 
			var productPrimeCat = productPrimary.val();
			  }
	
		  /** Get Product Price**/
		  var itemPrice = form.find(".product-sales-price");
		
		
		  if(!$('html').hasClass('oldie') ){
			  var itemPriceNumber = itemPrice.text().trim().replace('$', '');
		  }else{
			  var itemPriceNumber = itemPrice.text().replace('$', '');
		  }
		  
		  
		  itemPriceNumber = parseFloat(itemPriceNumber);
		}
		
	   //console.log(itemId+'-'+itemName+'-'+qtyValue+'-'+itemPriceNumber );
	  /************ Coremetrics shop action 5 tag *************/
      if(typeof cmCreateShopAction5Tag != 'undefined' && itemPriceNumber && productPrimeCat && itemName && itemPriceNumber){
    	  cmCreateShopAction5Tag(itemId, itemName, qtyValue, itemPriceNumber ,productPrimeCat , itemAuto);
    	  cmDisplayShops();
    	
      } 
		
      /* ************** END: Custom coremetrics values*************** */	
		
	}
	
	

	/*************** app.product public object ***************/
	app.product = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
			loadZoom();
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
			if( typeof addthis == 'undefined') return;
			
			var addThisServices = ["compact","facebook","myspace","google","twitter"],
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
			addthis.toolbox(".addthis_toolbox");
		},
		initAddToCart : function (target) {
			//target = $('#wrapper');
			if (target) {
				target.on("click", ".add-to-cart", setAddToCartHandler);
			}
			else {
				
				$(".add-to-cart").on("click", setAddToCartHandler);
			}
		}
	};

}(window.app = window.app || {}, jQuery));

// app.product.tile
(function (app, $) {
	var $cache = {};

	function initializeDom() {
		var tiles = $cache.container.find(".product-tile");
		if (tiles.length===0) { return; }
		// removed .syncHeight();
		$cache.container.find(".product-tile").each(function (idx) {$(this).data("idx",idx);});
	}

	function initializeEvents() {
	if(!app.isMobileUserAgent && jQuery('#wrapper').width() >= app.responsive.tabletLayoutWidth ){	
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
			$cache.compareButton.addClass("disabled");
		}
		else {
			$cache.compareButton.removeClass("disabled");
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
			primaryContent : $("#main"),
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
			app.progress.show($cache.compareTable);
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
			//$cache.form.validate();
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
				dialog: $("#send-to-friend-dialog")
			};			
			initializeEvents();
		},
		initializeDialog : function (eventDelegate, eventTarget) {
			$(eventDelegate).on("click", eventTarget, function (e) {
				e.preventDefault();
				var dlg = app.dialog.create({target:$("#send-to-friend-dialog"), options:{
					width:800,
					height:'auto',
					title:this.title,
					open:function() {
						app.sendToFriend.init();
						app.validator.init();
					}
				}});

				app.ajax.load({
					url:app.util.ajaxUrl(this.href),
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
	function updateProductListing(isHashChange, url) {
		var hash = window.location.hash;
		if(hash==='#results-content' || hash==='#results-products') { return; }

		var refineUrl = null;
		var url = url || '';
		
		if (isHashChange && url!='' ) {
			refineUrl = encodeURI(url);
			/*window.location.hash = '';
			history.pushState('', document.title, window.location.pathname);*/
			
		}
		else if (hash.length > 0) {
		
			refineUrl =  window.location.pathname+"?"+hash.substr(1);
		}
		else if (isHashChange) {
			refineUrl = window.location.href;
		}

		if (!refineUrl) { return; }
		
		
		$cache.targetcontainer = $cache.main.find("div.targetContainer");
		
		
		if($cache.targetcontainer.length > 0){
			app.progress.show($cache.main);
		
			$cache.targetcontainer.load(app.util.appendParamToURL(refineUrl, "format", "ajax"), function () {
				app.product.compare.init();
			    app.product.tile.init();
				app.progress.hide();
				// enable flexslider if it's available: http://www.woothemes.com/flexslider/
				/*if($.fn.flexslider) {
					// don't force it to be ul/li
					$('.flexslider').flexslider({selector: ".slides > *"});
				}*/
			});
			
		}else{
		app.progress.show($cache.content);
		$cache.main.load(app.util.appendParamToURL(refineUrl, "format", "ajax"), function () {
			app.product.compare.init();
			app.product.tile.init();
			app.progress.hide();
			// enable flexslider if it's available: http://www.woothemes.com/flexslider/
			/*if($.fn.flexslider) {
				// don't force it to be ul/li
				$('.flexslider').flexslider({selector: ".slides > *"});
			}*/
		});
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
      //Only bind hashchange if browser capable & not old IE		
		 
	 if(typeof Modernizr != 'undefined' && Modernizr.hashchange && !$('html').hasClass('oldie') ){	 	 
		$cache.main.on("click", ".refinements:not(.fr_CA .refinements) a, .refinement:not(#blogsidebar .refinement, .refinement.Category, .fr_CA .refinement) a, .pagination:not(#blogPagination .pagination) ul li a,.lushPagination .pagination ul li a, a.refinerelax, .paging .next a, .paging .prev a", function (e) {
			e.preventDefault();
			if($(this).parent().hasClass("unselectable")) { return; }
			var uri = app.util.getUri(this);
			if(uri.query.length > 1){
				window.location.hash = encodeURI(uri.query.substr(1));
			}else{
				updateProductListing(true, this.href);
			}
					
			
	
			
			
		});

	 }	
		
		
		// handle events for updating grid
	        $cache.main.on("click", "#blogPagination:not(#blogPagination.refined) .pagination ul li a", function (e) {
			e.preventDefault();
			if($(this).parent().hasClass("unselectable")) { return; }
			var uri = app.util.getUri(this);
			var refineUrl = uri.query.length > 1 ? uri.query.substr(1) : "";
			window.location.href = window.location.href.split("#")[0] + "#" + encodeURI(refineUrl);
			return false;
		});
		 /*	*/



		
		
		// handle events item click. append params.
		$cache.main.on("click", ".product-tile a:not('.quickviewbutton')", function (e) {
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
	
		if(typeof Modernizr != 'undefined' && Modernizr.hashchange && !$('html').hasClass('oldie')){	
			window.location.hash = uri.query.substr(1);
			return false;
		}else{ 
			window.location = refineUrl;
	       return false; 
		}
	
		})
		.on("change", ".items-per-page select", function (e) {
			var refineUrl = $(this).find('option:selected').val();
			var uri = app.util.getUri(refineUrl);
			window.location.hash = uri.query.substr(1);
			return false;
		});
		
	
	   function getUrlVars() {	
			    var vars = [], hash;
			    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			    for(var i = 0; i < hashes.length; i++)
			    {
			      hash = hashes[i].split('=');
			      vars.push(hash[0]);
			      vars[hash[0]] = hash[1];
			    }
			    return vars;
			  };
			  
          function getUrlVar(name){
	       return getUrlVars()[name];
	       }; 
	 
		
		$cache.main.on("change", "select#pricesort", function (e) {
			var refineUrl = $(this).find('option:selected').val();
			var uri = app.util.getUri(refineUrl);
			
	      if(typeof cmCreateElementTag != 'undefined'){
	        /************ Coremetrics element tag *************/
	  		var sortVal = $(this).children(":selected").attr("id");
       		sortVal = 'FILTERBY'+sortVal+'';
            cmCreateElementTag(sortVal,"PRODUCT CATALOG FILTERS");
	      }
					
			
			if(typeof Modernizr != 'undefined' && Modernizr.hashchange && !$('html').hasClass('oldie')){	
				
				var checkFilter = getUrlVar('prefn1');
				if(typeof(checkFilter) != 'undefined' && checkFilter != ''){ 
					window.location.hash = uri.query.substr(1) + '&af=t';
				}else{
					window.location.hash = uri.query.substr(1);	
				}
							
				return false;
			}else{ 
				window.location = refineUrl;
		       return false; 
			}
		
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
				items : $("#search-result-items")
			};
			$cache.content = $cache.main.find(".search-result-content");
			if (app.product.compare) {
				app.product.compare.init();
			}
			updateProductListing(false);
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
			
			if(typeof(bp.options) != 'undefined'){
				
				for (a=0,alen=bp.options.length;a<alen;a++) {
					var opt = bp.options[a];
					p.options = {optionName:opt.name,optionValue:opt.value};
				}
		
			}	
			
			o.bonusproducts.push({product:p});
		}
		return o;
	}

	function updateSummary(callback) {
		
		
		if (selectedList.length===0) {
			$cache.bonusProductList.find("li.selected-bonus-item").remove();
		}
		else {
			
					
			$cache.bonusProductList.find("li.selected-bonus-item").remove();
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
		
		if(callback == true){
			var tempMessage = $("<div/>").addClass('messageBox').html('<p>'+ app.resources.SAMPLE_ADD +'</p>').appendTo('.bonus-samples-container');
			
			setTimeout(function() {
				app.progressMini.hide($cache.bonusProductList);
				tempMessage.fadeIn('fast');
				
				 setTimeout(function() {  
					$('.messageBox').fadeOut(400, function() { $(this).remove(); });  
					}, 1000);
				
			}, 350);

		}
		
		
		
		
		
		// get remaining item count
		var remain = maxItems - selectedList.length;
		//$cache.bonusProductList.find(".bonus-items-available").text(remain);
		if (remain <= 0) {
			
			if($cache.bonusProductList.find("button.button-select-bonus").length > 0)
			{
			  $cache.bonusProductList.find("button.button-select-bonus").addClass("disabled");
			}
			
			if($cache.bonusProductList.find("a.link-select-bonus").length > 0)
			{
			  $cache.bonusProductList.find("a.link-select-bonus").addClass("disabled");
			}
			
			
		}
		else {
				
				if($cache.bonusProductList.find("button.button-select-bonus").length > 0)
				{
				  $cache.bonusProductList.find("button.button-select-bonus").addClass("disabled");
				}
				
				if($cache.bonusProductList.find("a.link-select-bonus").length > 0)
				{
				  $cache.bonusProductList.find("a.link-select-bonus").removeClass("disabled");
				}
			
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

			//if(url.indexOf(c) !== -1) {
			var bonustype = app.util.getUrlParameter(url, 'type'),
			bonusTitle = app.resources.BONUS_PRODUCTS;
			if(bonustype != null && bonustype.length > 0 && bonustype == 'sample'){
				bonusTitle=  app.resources.SAMPLE_PRODUCTS;
			}
			//console.log(bonustype);
				
			// create the dialog
			$cache.bonusProduct = app.dialog.create({
				target : $cache.bonusProduct,
				options : {
					width: 700,
					dialogClass : 'quickview',
					position: ['top',62],
					title : bonusTitle != '' ? bonusTitle:app.resources.BONUS_PRODUCTS
				}
			});
			

			// load the products then show
			app.ajax.load({
				target : $cache.bonusProduct,
				url : url,
				callback : function () {
					$cache.bonusProduct.dialog('open');
					//func is already being called from sampleproductgrid.isml
					//app.bonusProductsView.initializeGrid();
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
				$cache.bonusProductList.find("button.button-select-bonus").addClass("disabled");
			}
			
			var cartItems = $cache.bonusProductList.find(".selected-bonus-item");
			//Need to empty list to ensure loop below does not re-add selectedItems on popup load
			selectedList = [];
			
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
				
				$(".sample-sampleCol").find("[data-uid='" + ci.data('uuid') + "']").addClass('chosen');
				selectedList.push(product);
			});
			
			if(selectedList.length >= 2 ) {
				$cache.bonusProductList.find("a.link-select-bonus").addClass("disabled");
				//$cache.bonusProductList.find("bonus-items-available").text("0");
			}

	
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
					$cache.bonusProductList.find("button.button-select-bonus").addClass("disabled");
					//$cache.bonusProductList.find("bonus-items-available").text("0");
					return;
				}

				var form = $(this).closest("form.bonus-product-form"),
					detail = $(this).closest(".product-detail"),
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
				
				//console.log(selectedList);
				
				updateSummary();
				
			})
			.unbind().on("click", "a.link-select-bonus", function (e) { 
				e.preventDefault();
				
				//var isChosen = $(this).hasClass('chosen');

				/*if(isChosen) {
					e.preventDefault();
					//var container = $(this).closest("li.selected-bonus-item");
					
					var gridLink = $(this);//$(".sample-sampleCol").find("[data-uid='" + container.data('uuid') + "']");

						if(gridLink.length > 0){
							gridLink.removeClass('chosen');
						}	
				
					
					if (!$(this).data("uid")) { return; }
					
					var uuid = $(this).data("uid");
					var i, len = selectedList.length;

					for(i=0;i<len;i++) {
						if (selectedList[i].uuid===uuid) {
							selectedList.splice(i,1);
							break;
						}
					}
					
					updateSummary();
				} else {*/
					if (selectedList.length>=maxItems) {
						$cache.bonusProductList.find("a.link-select-bonus").addClass("disabled");
						//$cache.bonusProductList.find("bonus-items-available").text("0");
						return;
						
					}
					
					  if($(this).hasClass('chosen')){
						}else{		
							$(this).addClass('chosen');	
						}
	               
					var form = $(this).parent('.bonus-product-item').find("form.bonus-product-form"),
						detail = $(this).find(".product-detail"),
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
					console.log(product);
					//console.log(selectedList);
					
					app.progressMini.show($cache.bonusProductList);
					updateSummary(true);
				//}
			})
			.on("click", ".remove-link", function(e){
				e.preventDefault();
				var container = $(this).closest("li.selected-bonus-item");
				var duplicate = 0;
				
				//Checks selectedlist for having more than 1 of the same product selected
				for(var x=0; x<selectedList.length; x++) {
					if(selectedList[x].uuid === container.data('uuid')) {
						duplicate++;
					}
				}
				
				var gridLink = $(".sample-sampleCol").find("[data-uid='" + container.data('uuid') + "']");

				if(gridLink.length > 0 && duplicate < 2){
					gridLink.removeClass('chosen');
				}	
				
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
					
					if(!$cache.bonusProduct){
						
						var url = app.urls.cartShow;
						window.location.href = url;	
						
					}else{	
						$cache.bonusProduct.dialog("close");  
						}
			
					
				
					
					
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



//app.rotatingarticles
(function (app, $) {	
	
	app.rotatingarticles = {
			index: 0,
			length: 0,
			$parent: {},
			itemselector: '',
			hasnav: false,
			init: function($parent,itemselector) {
				app.rotatingarticles.$parent = $parent;
				app.rotatingarticles.itemselector = itemselector;
				// create a cycler of content from the
			    // 'did you know' <p> tags on the subcategory landing page
				app.rotatingarticles.length = jQuery(itemselector,$parent).length;

				// Bind next/prev buttons
				jQuery('.prev',$parent).click(function(){
					app.rotatingarticles.shownext('prev');
				});
				jQuery('.next',$parent).click(function(){
					app.rotatingarticles.shownext('next');
				});
				
				app.rotatingarticles.shownext(0);
			},
			shownext: function() {
				
				jQuery(app.rotatingarticles.itemselector,app.rotatingarticles.$parent).stop(true,true);
				window.clearTimeout(window.dykToA);
				if(typeof(arguments[0]) != 'undefined'){
					if(isNaN(arguments[0])){
						if(arguments[0] == 'next'){
							nextIndex = app.rotatingarticles.index + 1;
						}else{
							nextIndex = app.rotatingarticles.index - 1;
						}
					}else{
						nextIndex = arguments[0];
					}
				}else{
					nextIndex = app.rotatingarticles.index + 1;
				}
				if(nextIndex >= app.rotatingarticles.length){
					nextIndex = 0;
				}else if(nextIndex < 0){
					nextIndex = app.rotatingarticles.length - 1;
				}
				app.rotatingarticles.index = nextIndex;
				
				jQuery(app.rotatingarticles.itemselector,app.rotatingarticles.$parent).hide();
				jQuery(app.rotatingarticles.itemselector,app.rotatingarticles.$parent).eq(app.rotatingarticles.index).fadeIn(500,function(){
					/* auto cycle turned off ** window.dykToA = window.setTimeout("app.rotatingarticles.shownext()",10000);*/
				});

			}
			
	};
	
}(window.app = window.app || {}, jQuery));


//app.rotatingcontent
(function (app, $) {	
	
	app.rotatingcontent = {
			index: 0,
			length: 0,
			$parent: {},
			itemselector: '',
			hasnav: false,
			init: function($parent,itemselector) {
				app.rotatingcontent.$parent = $parent;
				app.rotatingcontent.itemselector = itemselector;
				// create a cycler of content from the
			    // 'did you know' <p> tags on the subcategory landing page
				app.rotatingcontent.length = jQuery(itemselector,$parent).length;
				 
				// should we print out nav selectors?
				if(typeof(arguments[2]) != 'undefined'){
					app.rotatingcontent.addnav();
					app.rotatingcontent.hasnav = true;
				}

				// Bind next/prev buttons
				jQuery('.prev',$parent).click(function(){
					app.rotatingcontent.shownext('prev');
				});
				jQuery('.next',$parent).click(function(){
					app.rotatingcontent.shownext('next');
				});
				
				app.rotatingcontent.shownext(0);
			},
			shownext: function() {
				
				jQuery(app.rotatingcontent.itemselector,app.rotatingcontent.$parent).stop(true,true);
				window.clearTimeout(window.dykTo);
				if(typeof(arguments[0]) != 'undefined'){
					if(isNaN(arguments[0])){
						if(arguments[0] == 'next'){
							nextIndex = app.rotatingcontent.index + 1;
						}else{
							nextIndex = app.rotatingcontent.index - 1;
						}
					}else{
						nextIndex = arguments[0];
					}
				}else{
					nextIndex = app.rotatingcontent.index + 1;
				}
				if(nextIndex >= app.rotatingcontent.length){
					nextIndex = 0;
				}else if(nextIndex < 0){
					nextIndex = app.rotatingcontent.length - 1;
				}
				app.rotatingcontent.index = nextIndex;
				
				jQuery(app.rotatingcontent.itemselector,app.rotatingcontent.$parent).hide();
				jQuery(app.rotatingcontent.itemselector,app.rotatingcontent.$parent).eq(app.rotatingcontent.index).fadeIn(500,function(){
					window.dykTo = window.setTimeout("app.rotatingcontent.shownext()",10000);
				});
				
				// update nav state
				if(app.rotatingcontent.hasnav = true){
					jQuery('.nav span',app.rotatingcontent.$parent).removeClass('active').eq(app.rotatingcontent.index).addClass('active');
				}

			},
			addnav: function(){
				var nav = document.createElement('div');
				var arrowleft = document.createElement('div');
				var arrowright = document.createElement('div');
				jQuery(arrowleft).addClass('hero-arrow-left');
				jQuery(arrowright).addClass('hero-arrow-right');
				
				app.rotatingcontent.$parent.append(jQuery(arrowright));
				app.rotatingcontent.$parent.append(jQuery(arrowleft));
				jQuery(arrowleft).addClass('arrowleft');
				jQuery(arrowright).addClass('arrowright');
				
				
				jQuery(nav).addClass('nav');
				
				for(var i = 0; i < app.rotatingcontent.length; i++){
					jQuery(nav).append('<span rel="'+i+'">'+(i+1)+'</span>');
				}
				app.rotatingcontent.$parent.append(jQuery(nav));

			  /* Fade in hero scrolling arrows */	
			  /*	jQuery("#.homepage #hero").hover(function() { // Mouse over
					jQuery('.arrowright')
					 .fadeTo(200, .8);
					jQuery('.arrowleft')
					 .fadeTo(200, .8);
						
				}, function() { // Mouse out
					jQuery('.arrowright')
					 .fadeTo(200, 0);
					jQuery('.arrowleft')
					 .fadeTo(200, 0);
				});
				*/
				
				jQuery('.arrowright',app.rotatingcontent.$parent).click(function(){
					app.rotatingcontent.shownext('next');
				
				});
				
				jQuery('.arrowleft',app.rotatingcontent.$parent).click(function(){
					app.rotatingcontent.shownext('prev');
				
				});
				
				// bind nav clicks
				jQuery('.nav span',app.rotatingcontent.$parent).click(function(){
					app.rotatingcontent.shownext(parseInt(jQuery(this).attr('rel'),10));
			
				});
			}
			
	}
	
}(window.app = window.app || {}, jQuery));


//app.rotatingtags
(function (app, $) {	
	
	app.rotatingtags= {
		index: 0,
		length: 0,
		$parent: {},
		itemselector: '',
		hasnav: false,
		init: function($parent,itemselector) {
			app.rotatingtags.$parent = $parent;
			app.rotatingtags.itemselector = itemselector;
			// create a cycler of content from the
		    // 'did you know' <p> tags on the subcategory landing page
			app.rotatingtags.length = jQuery(itemselector,$parent).length;
			 

			// Bind next/prev buttons
			jQuery('.prev','.tagcontrolsmin').click(function(){
				app.rotatingtags.shownexttag('prev');
			});
			jQuery('.next','.tagcontrolsmin').click(function(){
				app.rotatingtags.shownexttag('next');
			});
			
			app.rotatingtags.shownexttag(0);
		},
		shownexttag: function() {
			jQuery(app.rotatingtags.itemselector,app.rotatingtags.$parent).stop(true,true);
			window.clearTimeout(window.dykTo);
			if(typeof(arguments[0]) != 'undefined'){
				if(isNaN(arguments[0])){
					if(arguments[0] == 'next'){
						nextIndex = app.rotatingtags.index + 1;
					}else{
						nextIndex = app.rotatingtags.index - 1;
					}
				}else{
					nextIndex = arguments[0];
				}
			}else{
				nextIndex = app.rotatingtags.index + 1;
			}
			if(nextIndex >= app.rotatingtags.length){
				nextIndex = 0;
			}else if(nextIndex < 0){
				nextIndex = app.rotatingtags.length - 1;
			}
			app.rotatingtags.index = nextIndex;
			
			jQuery(app.rotatingtags.itemselector,app.rotatingtags.$parent).hide();
			jQuery(app.rotatingtags.itemselector,app.rotatingtags.$parent).eq(app.rotatingtags.index).fadeIn(500,function(){
				window.dykTo = window.setTimeout("app.rotatingtags.shownexttag()",10000);
			});
			

		}
			
	};

}(window.app = window.app || {}, jQuery));


//app.rotating refinements
(function (app, $) {	
	 
	app.rotatingcat= {
		index: 0,
		length: 0,
		$parent: {},
		itemselector: '',
		hasnav: false,
		init: function($parent,itemselector) {
			app.rotatingcat.$parent = $parent;
			app.rotatingcat.itemselector = itemselector;
			// create a cycler of content from the
		    // 'did you know' <p> tags on the subcategory landing page
			app.rotatingcat.length = jQuery(itemselector,$parent).length;
			 

			// Bind next/prev buttons
			jQuery('.prev',$parent.parent('.refineContainer').find('.tagcontrolsmin')).click(function(){
				app.rotatingcat.shownexttag('prev');
			});
			jQuery('.next',$parent.parent('.refineContainer').find('.tagcontrolsmin')).click(function(){
				app.rotatingcat.shownexttag('next');
			});
			
			app.rotatingcat.shownexttag(0);
		},
		shownexttag: function() {
			jQuery(app.rotatingcat.itemselector,app.rotatingcat.$parent).stop(true,true);
			window.clearTimeout(window.dykTo);
			if(typeof(arguments[0]) != 'undefined'){
				if(isNaN(arguments[0])){
					if(arguments[0] == 'next'){
						nextIndex = app.rotatingcat.index + 1;
					}else{
						nextIndex = app.rotatingcat.index - 1;
					}
				}else{
					nextIndex = arguments[0];
				}
			}else{
				nextIndex = app.rotatingcat.index + 1;
			}
			if(nextIndex >= app.rotatingcat.length){
				nextIndex = 0;
			}else if(nextIndex < 0){
				nextIndex = app.rotatingcat.length - 1;
			}
			app.rotatingcat.index = nextIndex;
			
			jQuery(app.rotatingcat.itemselector,app.rotatingcat.$parent).hide();
			jQuery(app.rotatingcat.itemselector,app.rotatingcat.$parent).eq(app.rotatingcat.index).fadeIn(500,function(){
				window.dykTo = window.setTimeout("app.rotatingcat.shownexttag()",10000);
			});
			

		}
			
	};

}(window.app = window.app || {}, jQuery));


//app.rotating refinements
(function (app, $) {	
	
	app.rotatingauthors= {
		index: 0,
		length: 0,
		$parent: {},
		itemselector: '',
		hasnav: false,
		init: function($parent,itemselector) {
			app.rotatingauthors.$parent = $parent;
			app.rotatingauthors.itemselector = itemselector;
			// create a cycler of content from the
		    // 'did you know' <p> tags on the subcategory landing page
			app.rotatingauthors.length = jQuery(itemselector,$parent).length;
			 

			// Bind next/prev buttons
			jQuery('.prev',$parent.parent('.refineContainer').find('.tagcontrolsmin')).click(function(){
				app.rotatingauthors.shownexttag('prev');
			});
			jQuery('.next',$parent.parent('.refineContainer').find('.tagcontrolsmin')).click(function(){
				app.rotatingauthors.shownexttag('next');
			});
			
			app.rotatingauthors.shownexttag(0);
		},
		shownexttag: function() {
			jQuery(app.rotatingauthors.itemselector,app.rotatingauthors.$parent).stop(true,true);
			window.clearTimeout(window.dykTo);
			if(typeof(arguments[0]) != 'undefined'){
				if(isNaN(arguments[0])){
					if(arguments[0] == 'next'){
						nextIndex = app.rotatingauthors.index + 1;
					}else{
						nextIndex = app.rotatingauthors.index - 1;
					}
				}else{
					nextIndex = arguments[0];
				}
			}else{
				nextIndex = app.rotatingauthors.index + 1;
			}
			if(nextIndex >= app.rotatingauthors.length){
				nextIndex = 0;
			}else if(nextIndex < 0){
				nextIndex = app.rotatingauthors.length - 1;
			}
			app.rotatingauthors.index = nextIndex;
			
			jQuery(app.rotatingauthors.itemselector,app.rotatingauthors.$parent).hide();
			jQuery(app.rotatingauthors.itemselector,app.rotatingauthors.$parent).eq(app.rotatingauthors.index).fadeIn(500,function(){
				window.dykTo = window.setTimeout("app.rotatingauthors.shownexttag()",10000);
			});
			

		}
			
	};

}(window.app = window.app || {}, jQuery));
// app.checkout
(function (app, $) {
	var $cache = {},
		isShipping = false,
		isBilling = false,
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
		var url = app.urls.summaryRefreshURL;
		
		var summary = $('#summaryContainer');
		if(summary.length < 1)
		{summary = $("#secondary.summary");}
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

	/**
	 * Make an AJAX request to the server to retrieve the list of applicable shipping methods
	 * based on the merchandise in the cart and the currently entered shipping address
	 * (the address may be only partially entered).  If the list of applicable shipping methods
	 * has changed because new address information has been entered, then issue another AJAX
	 * request which updates the currently selected shipping method (if needed) and also updates
	 * the UI.
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
				});
			}
		});
	}

	//shipping page logic
	//checkout gift message counter
	function initGiftMessageBox() {
		// show gift message box, if shipment is gift
		$cache.giftMessage.toggle($cache.checkoutForm.find("#is-gift-yes")[0].checked);

	     /** Remove emoticon and other non word characters from gift message box - critical as it breaks order export**/
		jQuery(".gift-message-text textarea").change(function(){
		    var text = $(this).val();
		    var regexp = /[^\w\s|,|'|!|?|.]/g;
		    if ( text.match(regexp) ){      
		        text = text.replace(/[^\w\s|,|'|!|?|.]/g,'');
		        
				var messageArea = jQuery(".gift-message-text");	
				if(jQuery('.charnote').length){
				jQuery('.charnote').remove();	
				}
				
				var $charnote = jQuery(document.createElement('div'));
				$charnote.addClass('charnote').text('Only word characters allowed, thank you');
				messageArea.prepend($charnote);
			
		        $charnote.fadeIn(function(){
					setTimeout( function() { $charnote.fadeOut() }, 1200 );
				});
		        
		        return $(this).val(text);
		        
		    }
		    return false;
		});

	}
	 
	function initShippingBilling(){
		$("div#billing-address-form").toggle(!$cache.checkoutForm.find("#is_shipping_billing")[0].checked);	
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
	

	function setMoreSuggestions(){
		var recommendationContainer = $('.recommended-address-container');

		if(recommendationContainer.find('.cradio').length > 4) {
			recommendationContainer.addClass('closed');
		}
	}
	
		// Expand/collapse address recommendations container
	$('a#see-more-suggestions').on('click', function(e) {
		e.preventDefault();
		
		var recommendationContainer = $('.recommended-address-container');
		var seesuggestions = $('#see-more-suggestions');
			// set min height
		var minHeight = 250;
			
		if (recommendationContainer.hasClass('closed')) {
			// expand
			var contentHeight = recommendationContainer.css('height','auto').height();
			recommendationContainer.css("height", minHeight).animate({ height: contentHeight }, 600, function(){
				recommendationContainer.addClass('showall').removeClass('closed');
				seesuggestions.addClass('showall').html("See less suggestions");
			});
			
			
		}
		else if (recommendationContainer.hasClass('showall')) {
				
			// collapse
			recommendationContainer.animate({ height: minHeight}, 600, function(){
				recommendationContainer.addClass('closed').removeClass('showall');
				seesuggestions.removeClass('showall').html("See more suggestions");
			});
			
			$('body, html').animate({"scrollTop": recommendationContainer.offset().top}, 600);
		}
		
	});
	
	$('a.edit-bonus').on("click", function (e) {
		e.preventDefault();
		app.bonusProductsView.show(this.href);
	});

		
	
	function shipBillOn() {	
		
		function setBillingFields(data) {
			// fill the form / clear the former cvn input
			$cache.bfirstName.val(data.shipAddress.firtname);
			$cache.blastName.val(data.shipAddress.lastname);
			$cache.baddress1.val(data.shipAddress.address1);
			$cache.baddress2.val(data.shipAddress.address2);
			$cache.bcity.val(data.shipAddress.city);
			$cache.bpostalCode.val(data.shipAddress.zip);
			$cache.bphone.val(data.shipAddress.phone);
			$cache.bcountry.val(data.shipAddress.country);				
			$cache.bstate.val(data.shipAddress.state);

			//console.log(data.shipAddress.state);
		}
		
		function setUseShipping(data) {
			
	//	$cache.bfirstName.val(data.useShipAddress);
		
		}
		
		/********************* Edit Checkout Shipping Options *********************/
		
		$(document).on('click', '.updateSubmit', function(e) {      	
				
			if (!$cache.checkoutForm.valid()) {
				return true;
			}else{		
				if ($(this).children('.tempLoaderTransparent').length == 0) {	 	
					var temploaderdark = jQuery('<div> </div>');
					temploaderdark.addClass('tempLoaderTransparent'); 
					jQuery(this).find('span').hide();
					jQuery(this).append(temploaderdark); 
				 }else{ 
					 jQuery(this).find('span').hide();
					 jQuery(this).find('.tempLoaderTransparent').show();
				 }
			
			}
		
		}); 
		
		function expandClass(bool,$obj){
			if(bool){
				$obj.removeClass('expanded');
			} else {
				$obj.addClass('expanded');
			}
		}
		function expandEditClass(bool,$obj){
			if(bool){
				$obj.removeClass('expandedEdit');
			} else {
				$obj.addClass('expandedEdit');
			}
		}
		
		
		
/**************************************************
	 * Remove of custom ajax edit functionality in cart due to issue with ordergroove
	 * 
	 $("a#edit-shipping-details").on("click", function (e) {
			e.preventDefault();
			var url = app.util.ajaxUrl(this.href);

			var stepHeaderS = $('div.checkout-step-header.1');
			var stepLabelS =  $(stepHeaderS).find('.step-label');
			var infoedit = $(stepHeaderS).find('div.editinfo');		
			var isOpen = infoedit.is(':visible');
			
			expandClass(infoedit.is(':visible'),stepHeaderS);  
			expandEditClass(isOpen, $(this));
			
			if(isOpen){ infoedit.hide('fast'); }else{
				app.progress.show(stepHeaderS);
				app.ajax.load({
					url:url,
					target:infoedit,
					callback: function () {
						app.progress.hide();
						infoedit.show('fast');
						var form = $cache.checkoutForm;
						app.validator.initForm(form);
						updateCheck();
					
					}
				});
				
			}
			
		   });
		

		$("a#edit-billing-details").on("click", function (e) {
				e.preventDefault();

				var stepHeaderB = $('div.checkout-step-header.2');
				var stepLabelB =  $(stepHeaderB).find('.step-label');
				var infoedit = $(stepHeaderB).find('div.editinfo');		
				var isOpen = infoedit.is(':visible');
				
				expandClass(infoedit.is(':visible'),stepHeaderB);  
				expandEditClass(isOpen, $(this));
				
				if(isOpen){ infoedit.hide('fast'); }else{
					var url = app.util.ajaxUrl(this.href);
					app.progress.show(stepHeaderB);
					app.ajax.load({
						url:url,
						target:infoedit,
						callback: function () {
							app.tooltips.init();
							app.progress.hide();
							infoedit.show('fast');
							var form = $cache.checkoutForm;
							app.validator.initForm(form);
							updateCheck();
						
						}
					});
					
				}
				
			   });
			   
*****************************************************************/
		
		function updateCheck(){
			if($(".expanded #shippingU").length > 0){
				jQuery('#updateWhich').append("<input name='updateW' type='hidden' value='shippingU'/>");
			}else if($(".expanded #billingU").length > 0){ 
				jQuery('#updateWhich').append("<input name='updateW' type='hidden' value='billingU'/>");
				initShippingBilling();
			}else if($(".expanded #summaryU").length > 0){}
			
		}
	
	      function updateShip(schecked) {
		  		var shippingCheck = schecked; 
				var url = app.util.appendParamToURL(app.urls.billingUseShipRefresh, "shippingCheck", shippingCheck); 
					$.ajax({
				        type: "GET",
				        async: true,
				        url: url,
				        dataType: "json",
				        contentType: "application/json; charset=utf-8",
				        success: function (data) 
				                { 
				        		app.progress.hide();
				        		//setUseShipping(data);	
				                },
				        error:function(x,e){
				        			if(x.status==0){
				        			window.alert(app.resources.SERVER_ERROR);
				        			}else {
				        			window.alert(app.resources.BAD_RESPONSE);				        					
				        				
				        			}
				        		}
				    });	
		    	  
	      }
	      
	  
		
		$cache.checkoutBillingForm = $("form.checkout-billing");
		$cache.isbillingcontainer = $cache.checkoutForm.find("div#billing-address-form");
		
		$("#is_shipping_billing").on("click", function () {
		
			//Old surronding condition ** removed as it caused billing as shipping address checkbox to fail 
			//if(!$cache.checkoutForm.validate().form()){

			if (this.checked) {
		
				//$cache.checkoutForm.validate().form();
		
		          /*** if($('.error').length > 0 ){ 
					
					$('html, body').animate({
			            scrollTop: $('.error:first').offset().top
			        }, 500);
					
					return false;}	***/
				
			var url = app.urls.billingAddressRefresh; 
			app.progress.show($cache.billingaddresscontainer);
			
			 $.ajax({
			        type: "GET",
			        async: true,
			        url: url,
			        data:  { 'direction': 'up' },
			        dataType: "json",
			        contentType: "application/json; charset=utf-8",
			        success: function (data) 
			                {// alert(data.shipAddress.firtname)  
			        	
			        	    if(typeof updateStateOptions != 'undefined'){
			        	    	updateStateOptions(data.shipAddress.country);
			        	    //console.log(typeof updateStateOptions);
			        	    }
			        	    
			        	    setBillingFields(data);
			        		// re-validate the form
			    			$cache.checkoutForm.validate().form();
			    			$cache.isbillingcontainer.hide('fast');
			    			updateShip(true);
			                },
			        error:function(x,e){
			        	if(x.status==0){
		        			window.alert(app.resources.SERVER_ERROR);
		        			}else {
		        			window.alert(app.resources.BAD_RESPONSE);				        					
		        				
		        			}
			        		}			                
			    });	
 
		}else{
			
			updateShip(false);
			$cache.isbillingcontainer.fadeIn('fast');	
			//$cache.checkoutForm.validate().form();
		}	
	});
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
		
		// Is shipping billing form
		initShippingBilling();
		
		
		$cache.paymentMethodId.on("click", function () {
			changePaymentMethod($(this).val());
			
		});
	

		// get selected payment method from payment method form
		var paymentMethodId = $cache.paymentMethodId.filter(":checked");
		changePaymentMethod(paymentMethodId.length===0 ? "CREDIT_CARD" : paymentMethodId.val());

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
				var error = $cache.redemption.find("span.error");
				if (error.length===0) {
					error = $("<span>").addClass("error").appendTo($cache.redemption);
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
				}
				else if (!data.success) {
					msg = data.message;
					fail = true;
				}
				if (fail) {
					var error = $cache.redemption.find("span.error");
					if (error.length===0) {
						$("<span>").addClass("error").appendTo($cache.redemption);
					}
					error.html(msg);					
					return;
				}
				
				$cache.redemption.html(data.message);
			});
		});
	}

	function initializeDom() {
		isShipping = $(".checkout-shipping").length > 0;
		isBilling = $(".checkout-billing").length > 0;
	}

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
		$cache.shippingMethodList = $("#shipping-method-list");

		if ($cache.checkoutForm.hasClass("checkout-shipping")) {
			// shipping only
			$cache.checkoutShippingForm = $("form.checkout-sipping");
			
			$cache.useForBilling = $cache.checkoutForm.find("input[name$='_useAsBillingAddress']");
			$cache.giftMessage = $cache.checkoutForm.find(".gift-message-text");
			$cache.shippingMethodList = $("#shipping-method-list");
			

		}

		if ($cache.checkoutForm.hasClass("checkout-billing")) {
			// billing only
			$cache.checkoutBillingForm = $("form.checkout-billing");
			$cache.isbillingcontainer = $cache.checkoutForm.find("div#billing-address-form");
			
			 
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
			
			
			
			$cache.billingaddresscontainer = $cache.checkoutForm.find("div#billing-address-form");
			$cache.isshippingbilling = $cache.checkoutForm.find("div#is_shipping_billing");
			$cache.bfirstName = $cache.checkoutBillingForm.find("input[name$='_firstName']");
			$cache.blastName = $cache.checkoutBillingForm.find("input[name$='_lastName']");
			$cache.baddress1 = $cache.checkoutBillingForm.find("input[name$='_address1']");
			$cache.baddress2 = $cache.checkoutBillingForm.find("input[name$='_address2']");
			$cache.bcity = $cache.checkoutBillingForm.find("input[name$='_city']");
			$cache.bpostalCode = $cache.checkoutBillingForm.find("input[name$='_zip']");
			$cache.bphone = $cache.checkoutBillingForm.find("input[name$='_phone']");
			$cache.bcountry = $cache.checkoutBillingForm.find("select[id$='_country']");
			$cache.bstate = $cache.checkoutBillingForm.find("select[id$='_state']");
			
			
			
		}
	} 

	function initializeEvents() {
		addressLoad();
		
		if (isShipping) {
			shippingLoad();	
		}
		else if(isBilling) {
			billingLoad();
		}
		else{}
	}

	/******* app.checkout public object ********/
	app.checkout = {
		init : function () {
			initializeCache();
			initializeDom();
			initializeEvents();
			shipBillOn();
			setMoreSuggestions();
		}
	};
}(window.app = window.app || {}, jQuery));


// app.quickview
(function (app, $) {
	var $cache = {};

	function bindQvButton(e) {
		e.on("click", function (e) {
			e.preventDefault();
			app.quickView.show({
				url : $(this).attr("href"),
				source : "quickview"
			});
		});
	}


	app.quickView = {
		initializeButton : function (container, target) {
			// quick view button
			
			
			$(container).on("mouseover", target, function (e) {
				var $container = $(this);
				$cache.qvButton = $container.data('qvButton');
				
				if(!$cache.qvButton) {
					// find it; it may be in the page just missing
					$cache.qvButton = $container.find('a.quickviewbutton');
					if($cache.qvButton.length < 1) {
						//data-qv-text is returning undefined. TO-DO: Investigate why it does this
						//var qvText = $('#search-result-items').attr('data-qv-text') || "Quick View."; // localized text
						var frLocale = $('body').hasClass('fr_CA');
						
						if(frLocale) {
							var qvText = "Aperçu";
						} else {
							var qvText = "Quick View";
						}
						
						$cache.qvButton = $('<a class="quickviewbutton">' + qvText + '</a>');
						
						bindQvButton($cache.qvButton);
						
						var link = $container.children("a:first");
						$cache.qvButton.attr({
							"href" : link.attr("href"),
							"title" : link.attr("title")
						}).appendTo($(this));
					}
				}else{
					$cache.qvButton.show();
				}
				$container.data('qvButton', $cache.qvButton);
				// Clear qv button when hovering over action buttons
				var actionBtns = $('.actionbuttons');
				$(actionBtns).mouseover(function(){ $cache.qvButton.hide(); }).mouseout(function(){$cache.qvButton.show()});
	
				
			}).on("mouseout", function (e) {
				/* If quivkiview exists - hide*/
				if(typeof($cache.qvButton) != 'undefined'){
					$cache.qvButton.hide();	
				} 
				
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
		// optiions.button - jquery handler to bind click event
		show : function (options) {
			
			if(options.button) {
				$cache.qvButton = options.button;
				var popTitle = $cache.qvButton.attr("title") != null ? $cache.qvButton.attr("title"):'Product Quickview';
			}else{
				if(typeof($cache.qvButton) != 'undefined'){
				   var popTitle = $cache.qvButton.attr("title") != null ? $cache.qvButton.attr("title"):'Product Quickview';
				}else{var popTitle = 'Product Quickview'}
			}
			 
			app.progress.show($cache.main);
		    options.target = app.quickView.init();
			app.dialog.create({
				target : $cache.quickView,
				options : {
					height : 'auto',
					width : 920,
					dialogClass : 'quickview',
					title : popTitle,
					resizable : false,
					open: function(object) {
					   jQuery('.ui-widget-overlay').bind('click', function() {              
					            var id = jQuery(object.target).attr('id');
					            jQuery('#'+id).dialog('close');
					 })
					}
				}
			});
			$cache.quickView.dialog('open');
			
			options.callback = function () {app.progress.hide();app.product.init()};
	     	app.product.get(options);

		return $cache.quickView;

		},
		bindEventsContent: function(options) {
			// hide quickview buttons
			jQuery(options.buttonSelector).hide();
			jQuery(options.imageSelector).each(function() {
				   var quickContainer = $(this); 
				   var $img = jQuery("img", this);
				   var quickButton = jQuery(options.buttonLinkSelector, this);
				   var h = $img.height();
				   var w = $img.width();
				   quickContainer.css('height', + h + "px");
				   quickContainer.css('width', + w + "px");
				   quickButton.css('width', + w / 2 + "px");
				   quickButton.css('height', + h / 2 + "px");
				   var relHeight = quickButton.height() / 2;
				   var relWidth = quickButton.width() / 2;
				   quickButton.css('top', + h / 2 - relHeight + "px");
				   quickButton.css('left', + w / 2 - relWidth + "px");
				});

			//DISABLE THE QUICKVIEW USER INPUT EVENT LISTENERS alexei
			// hovering
			jQuery(options.imageSelector).hover(
				function(e) {
					jQuery(this).children(options.buttonSelector).show();
					return false;
				},
				function(e) {
					jQuery(this).children(options.buttonSelector).hide();
					return false;
				}
			);

			// click binding for quick view
			jQuery(options.buttonLinkSelector).click(function(e) {
				app.quickView.show({url: this.href, source: "quickview"});
				return false;
			});
		},
		bindEventsDiv: function(options) {
			// hide quickview buttons
			jQuery(options.buttonSelector).hide();
			jQuery(options.imageSelector).each(function() {
				   var divS = jQuery(options.imageSelector)
				   var quickContainer = jQuery(options.divSelector); 
				   var $img = jQuery("div.sec", this);
				   var quickButton = jQuery(options.buttonLinkSelector, this);
				  
				   var w = divS.outerWidth(); 
				   //alert(w);
				   var le = quickContainer.css('left'); 
				   
				   
				   quickButton.css('left', + ((w - 150) / 4)  + "px"); 
				
				
				 
				}); 
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



//app.minisignin
(function (app, $) {
	// sub name space app.minisignin.* provides functionality around the mini cart

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
			timer.id = setTimeout(app.minisignin.close, duration);
		}
	};

	app.minisignin = { 
			url : "", // during page loading, the Demandware URL is stored here

			// initializations
			init : function () {
				
				$cache.ULogin = jQuery(".userlogin");
				$cache.Hcontainer = jQuery('.headercustomerinfo_content');
				
				$cache.minisigninVisible = $cache.Hcontainer.is(':visible');
				
				// bind hover event to the cart total link at the top right corner
				
			 
				if(!jQuery('.login-account').length > 0){  
					
					$cache.ULogin.on("click", this, function () {	
						if($cache.Hcontainer.is(":visible")) {
							app.minisignin.close(0);
							$(this).removeClass('active');
						}else{
							app.minisignin.slide();
							$(this).addClass('active');
						} 
						return false;
					});
				
				}else{
					$cache.ULogin.on("click", this, function () {	
					  
						if(jQuery('.logintab')){
						jQuery('html').find('.logintab').trigger('click');
						}else{}
					  
					  return false;
					});
					
					
				}
				   if(!app.isMobileUserAgent){}
				
				$cache.Hcontainer.on("mouseenter", this, function (e) {
					timer.clear();
				})
				$cache.Hcontainer.on("mouseleave", this, function (e) {
					
					if( $('.login-box-content input').is(':focus') ){
					}else{
					timer.clear();
					timer.start(1800);
					}
					
					
				})
				
				//$cache.mcClose.on("click", this, app.minisignin.close);

				initialized = true;
			},
			// shows the given content in the mini cart
			show : function (html) {
				$cache.minisignin.html(html);
				//app.util.scrollBrowser(0);
				app.minisignin.init();
				if($cache.wtop > 90){$cache.Hcontainer.addClass('minisignin-fixed');}
				app.minisignin.slide();
			},
			// slide down and show the contents of the mini cart
			slide : function () {
				if(!initialized) {
					app.minisignin.init();
				}

				if(app.minisignin.suppressSlideDown && app.minisignin.suppressSlideDown()) {
					return;
				}

				timer.clear();

				app.minicart.close(0);
				// show the item
				$cache.Hcontainer.show();
				
				// after a time out automatically close it
				timer.start(5000);

			},
			// closes the mini cart with given delay
			close : function (delay) {
				$cache.Hcontainer.hide();
				if($cache.Hcontainer.hasClass('minicart-fixed')){
				$cache.Hcontainer.removeClass('minicart-fixed');
				}
				if(	$cache.ULogin.hasClass('active')){
					$cache.ULogin.removeClass('active');
					}
				timer.clear();

			},
			// hook which can be replaced by individual pages/page types (e.g. cart)
			suppressSlideDown : function () {
				return false;
			}
		};
}(window.app = window.app || {}, jQuery));



// app.util
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
				if(actionSource.hasClass('youtube')){
					 if(jQuery('#wrapper').width() <= app.responsive.tabletLayoutWidth){
						 window.open($(actionSource).attr("href"));
						  return;	
					 }else{
					app.dialog.openYoutube($(actionSource).attr("href"),$(actionSource).attr("title"),{"width":656,"height":525, "position": ['top',62]});
				    return false;	
					 }
				};
				
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
		
		getUrlParameter : function (url, name) {
		    return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
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
									.append($("<div/>").addClass("loader-indicator-lush"), $("<div/>").addClass("loader-bg-lush"));

			}
			return loader.appendTo(target).show();
		},
		hide: function () {
			if (loader) { loader.hide(); }
		}
	};
}(window.app = window.app || {}, jQuery));


//app.progressMini
(function (app, $) {
	var loader;
	app.progressMini = {
		show: function (container) {
			var target = (!container || $(container).length===0) ? $("body") : $(container);
			loader = loader || $(".loaderMini");

			if (loader.length===0) {
				loader = $("<div/>").addClass("loaderMini")
									.append($("<div/>").addClass("loader-indicatorMini"), $("<div/>").addClass("loader-bgMini"));

			}
			return loader.appendTo(target).show();
		},
		hide: function () {
			if (loader) { loader.hide(); }
		}
	};
}(window.app = window.app || {}, jQuery));


//app.progressPos
(function (app, $) {
	var loader;
	app.progressPos = {
		show: function (container) {
			var target = (!container || $(container).length===0) ? $("body") : $(container);
			loader = loader || $(".loaderPos");
			//alert(target.attr('id'));

			if (loader.length===0) {
				loader = $("<div/>").addClass("loaderPos")
									.append($("<div/>").addClass("loader-indicator-lush-pos"), $("<div/>").addClass("loader-pos-lush"));

			}
			return loader.appendTo(target).show();
		},
		hide: function () {
			if (loader) { loader.hide(); }
		}
	};
}(window.app = window.app || {}, jQuery));  


//app.progressTop
(function (app, $) {
	var loader;
	app.progressTop = {
		show: function (container) {
			var target = (!container || $(container).length===0) ? $("body") : $(container);
			loader = loader || $(".loaderPos");
			//alert(target.attr('id'));

			if (loader.length===0) {
				loader = $("<div/>").addClass("loaderPosTop")
									.append($("<div/>").addClass("loader-indicator-lush"), $("<div/>").addClass("loader-pos-top"));

			}
			return loader.appendTo(target).show();
		},
		hide: function () {
			if (loader) { loader.hide(); }
		}
	};
}(window.app = window.app || {}, jQuery)); 


//app.progressPos
(function (app, $) {
	var loader;
	app.progressFullDiv = {
		show: function (container) {
			var target = (!container || $(container).length===0) ? $("body") : $(container);
			loader = loader || $(".loaderPos");
			//alert(target.attr('id'));

			if (loader.length===0) {
				loader = $("<div/>").addClass("loaderPos")
									.append($("<div/>").addClass("loader-indicator-lush-full"), $("<div/>").addClass("loader-pos-full"));

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
			itemFallbackDimension: '100%',
			itemVisibleInCallback : app.captureCarouselRecommendations
		},
		init : function () {
			if($.fn.jcarousel) {
				// renders horizontal/vertical carousels for product slots
				$('#horizontal-carousel').jcarousel(app.components.carouselSettings);
				$('#vertical-carousel').jcarousel($.extend({vertical : true}, app.components.carouselSettings));
			}
		}
	};
}(window.app = window.app || {}, window.dw, jQuery));

// app.cart
(function (app, $) {
	var $cache = {};

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
		if(!app.isMobileUserAgent && jQuery('#wrapper').width() >= app.responsive.mobileLayoutWidth ){	
		}//Mobile check
		
		$('#selected-samples-container').on("click", ".bonus-item-actions a", function (e) {
			e.preventDefault();
			app.bonusProductsView.show(this.href);
		});
		
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
		
		jQuery(".sample-item-actions a").on("click", function (e) {
			e.preventDefault();
			app.bonusProductsView.show(this.href);
		});
		
	

		// override enter key for coupon code entry
		$cache.couponCode.on("keydown", function (e) {
			if (e.which === 13 && $(this).val().length===0) { return false; }
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
		//$("<input/>").attr({type:"hidden", name:"format", value:"ajax"}).appendTo(form);
		
		form.on("click", ".apply-button", function(e) {
			var addressId = form.find("input[name$='_addressid']");
			addressId.val(addressId.val().replace(/[^\w+-]/g, "-"));
			if (!form.valid()) {
				return false; 
			}
						
			app.dialog.close();
			app.page.refresh();
		})
		.on("click", ".cancel-button", function(e){
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
		var addresses = $("#addresses");
		if (addresses.length===0) { return; }
		
		addresses.on("click", "a.address-edit, a.address-create", function(e){
			e.preventDefault();
			var options = {open: initializeAddressForm};
			app.dialog.open({url:this.href, options:options});
		}).on("click", ".delete", function(e){
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
				app.page.refresh();	
			});
		});
	}
	
	function initializeEvents() {
		toggleFullOrder();
		initAddressEvents();
		initPaymentEvents();
	}
		
	app.account = {
		init : function () {			
			initializeEvents();
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
		
		
		$(".item-list").on("click", ".item-details a.edit", function (e) {
			e.preventDefault();
			app.quickView.show({
				url : e.target.href,
				source : "wishlist"
			});
			
		});
			
	}

	app.wishlist = {
		init : function () {
			$cache.editAddress = $('#editAddress');
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
				$cache.minicart = $("#header-cart");
				$cache.mcIcon = $cache.minicart.find("#mini-cart-total");
				
				$cache.mcTotal = $cache.minicart.find(".mini-cart-total");
				$cache.mcContent = $cache.minicart.find(".mini-cart-content");
				$cache.mcLink = $cache.mcTotal.find("#mini-cart-link");
				
				$cache.mcClose = $cache.minicart.find(".mini-cart-close");
				$cache.mcProductList = $cache.minicart.find(".mini-cart-products");
				$cache.mcProducts = $cache.mcProductList.children(".mini-cart-product");
				$cache.wtop = jQuery(window).scrollTop();
				$cache.minicartvisible = $cache.minicart.is(':visible');
				
				// bind hover event to the cart total link at the top right corner
				
			 
			if(!app.isMobileUserAgent){
			    $cache.mcIcon.on("click", this, function () {	
					if($cache.mcContent.is(":visible")) {
						app.minicart.close(0);
						$(this).removeClass('active');
					}else{
						app.minicart.slide();
						$(this).addClass('active');
					} 
					return false;
				})
				
				}else{ 
					return true;
					}
				
				$cache.mcContent.on("mouseenter", this, function (e) {
					timer.clear();
				})
				$cache.mcContent.on("mouseleave", this, function (e) {
					timer.clear();
					timer.start(800);
				})
				
				$cache.mcClose.on("click", this, app.minicart.close);

				initialized = true;
			},
			// shows the given content in the mini cart
			show : function (html) {
				$cache.minicart.html(html);
				//app.util.scrollBrowser(0);
				app.minicart.init();
				if($cache.wtop > 90){$cache.mcContent.addClass('minicart-fixed');}
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

				app.minisignin.close(0);
				// show the item
				$cache.mcContent.show();
				
				// after a time out automatically close it
				timer.start(5000);

			},
			// closes the mini cart with given delay
			close : function (delay) {
				$cache.mcContent.hide();
				if($cache.mcContent.hasClass('minicart-fixed')){
				$cache.mcContent.removeClass('minicart-fixed');
				}
				if($cache.mcIcon.hasClass('active')){
				$cache.mcIcon.removeClass('active');
				}
				
				timer.clear();

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
				
			//Open at top of mobile device
		  if(app.isMobileUserAgent && typeof params.options != 'undefined'){params.options.position = "top";} 
			
			// create the dialog
			$cache.container=target;
			$cache.container.dialog($.extend(true, {}, app.dialog.settings, params.options || {}));
			return $cache.container;
		},
		
		// opens a dialog using the given url
		open : function (params) {
			if (!params.url || params.url.length===0) { return; }
						
			$cache.container = app.dialog.create(params);
			if( typeof(params.type) == 'undefined' ) {
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
			} else if (params.type == 'iframe') {
				if($cache.container.dialog("isOpen")) {	return;	}
				$cache.container.dialog("open");
			
				if(typeof(params.title) != 'undefined'){
					$cache.container.dialog("option", "title", params.title);
				}
				$cache.container.html(params.url);
				$cache.container.bind('dialogclose',function(e,ui){
					$(this).empty();
				});
			}
			
		},
		// add the ability to send in a youtube video
		openYoutube : function(url, title) {
			// set a default title
			var title = title || "Dialog";
			// width/height
			var width = 436;
			var height = 349;
			if(typeof(arguments[2]) != 'undefined'){
				width = arguments[2].width;
				height = arguments[2].height;
			}

			// set the youtube iframe tag to load in
			var url_ar = url.split('/');
			var youtubeid = url_ar.pop();
			var iframe = '<iframe width="'+width+'" height="'+height+'" src="//www.youtube.com/embed/'+youtubeid+'?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>';

			app.dialog.open({
				"url": iframe,
				"title": title,
				"type": "iframe",
				"width": width,
				"height": height
			});
			
			if($('#dialog-container').length > 0){
				  $('#dialog-container').dialog( "option" , "title" ,title);
				}
		},
		
		// add the ability to send in a youtube video
		openYoutubebig : function(url, title) {
			app.dialog.openYoutube(url,title,{"width":656,"height":525, "position": ['top',62]});
		},
		
		loadYoutubebig : function(url, title, holder) {
			// create the dialog container if not present already
			//if(jQuery("#"+holder).length == 0) {
			//	jQuery(document.body).prepend("<div id=\"dialogcontainer\"></div>");
			//}
			// set a default title
			title = title || "Video";
			// set the youtube iframe tag to load in
			var url_ar = url.split('/');
			var youtubeid = url_ar.pop();
			var iframe = '<iframe width="656" height="525" src="//www.youtube.com/embed/'+youtubeid+'?autoplay=1&rel=0&autohide=1" frameborder="0" allowfullscreen></iframe>';
			
			//app.dialog.checkOpenBig();
			app.dialog.setTitle(title);
			//make sure to bind the close here to remove the youtube text
			jQuery('#'+holder).html(iframe);
		},
		// sets the title of the dialog
		setTitle : function(title) {
			jQuery("#dialogcontainer").dialog("option", "title", title);
			
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
			draggable: true,
			height : 'auto',
			width: 680,
			buttons : {},
			title : '',
			//show: {effect: "fade", duration: 20},
			//hide: {effect: "fade", duration: 20},
			position:['top', 82],  
			overlay : {
				opacity : 0.5,
				background : "white"
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
				ca : /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i,
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
		var country = $(el).closest("form").find("select.country");
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

	
	function validatePostal(value, el) {
		var country = $(el).closest("form").find(".country");
		if(country.length === 0 || country.val().length === 0 || !regex.phone[country.val().toLowerCase()]) {
			return true;
		}
		var rgx = regex.postal[country.val().toLowerCase()];
		var isOptional = this.optional(el);
		var isValid = rgx.test($.trim(value));	
		
		return isOptional || isValid;
	}
	
	
	
	/**
	 * Add phone validation method to jQuery validation plugin.
	 * Text fields must have 'phone' css class to be validated as phone
	 */
	$.validator.addMethod("zip", validatePostal, app.resources.INVALID_ZIP); 
	
	
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

	/*$.validator.messages.required = function ($1, ele, $3) {
		return "";
	};*/
	
	/*$.validator.messages.required = function ($1, ele, $3) {
		var requiredText = $(ele).parents('.form-row').attr('data-required-text');
		return requiredText||"";
	};*/

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
	
			$searchContainer = $("#headerSearch");
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
						"top" : $searchContainer[0].offsetHeight + 5,
						"left" : $searchContainer[0].offsetLeft,
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
		initNew : function (container, defaultValue) {
			// initialize vars
	
			
			
			$searchContainerNew = $(container);
			$searchFormNew = $searchContainerNew.find("form[name='simpleSearch']");
			$searchFieldNew = $searchFormNew.find("input[name='q']");
			fieldDefault = defaultValue;

			// disable browser auto complete
			$searchFieldNew.attr("autocomplete", "off");
			
//			console.log( $searchContainerNew[0].offsetLeft );

			// on focus listener (clear default value)
			$searchFieldNew.focus(function () {
				
				
				
				if(!$resultsContainer) {
					// create results container if needed
					$resultsContainer = $("<div/>").attr("id", "suggestions").appendTo($searchContainerNew).css({
						"top" :  $searchContainerNew[0].offsetHeight,
						"left" :  $searchContainerNew[0].offsetLeft + 4,
						"width" : '100%' 
					});
				}
				if($searchFieldNew.val() === fieldDefault) {
					$searchFieldNew.val("");
				}
			});
			// on blur listener
			$searchFieldNew.blur(function () {
				setTimeout(app.searchsuggest.clearResults, 200);
			});
			// on key up listener
			$searchFieldNew.keyup(function (e) {

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

				var lastVal = $searchFieldNew.val();

				// if is text, call with delay
				setTimeout(function () { app.searchsuggest.suggestNew(lastVal); }, delay);
			});
			// on submit we do not submit the form, but change the window location
			// in order to avoid https to http warnings in the browser
			// only if it's not the default value and it's not empty
			$searchFormNew.submit(function (e) {
				e.preventDefault();
				var searchTerm = $searchFieldNew.val();
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
					html+='<div><div class="suggestionterm">'+suggestions[i].suggestion+'</div></div>';
					//html+='<span class="hits">'+suggestions[i].hits+'</span>';
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
		suggestNew : function (lastValue) {
			// get the field value
			var part = $searchFieldNew.val();

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
					html+='<div><div class="suggestionterm">'+suggestions[i].suggestion+'</div></div>';
					//html+='<span class="hits">'+suggestions[i].hits+'</span>';
				}

				// update the results div
				$resultsContainer.html(html).show().on("hover", "div", function () {
					$(this).toggleClass = "selected";
				}).on("click", "div", function () {
					// on click copy suggestion to search field, hide the list and submit the search
					$searchFieldNew.val($(this).children(".suggestionterm").text());
					app.searchsuggest.clearResults();
					$searchFormNew.trigger("submit");
				});
			});
		},
		clearResults : function () {
			if (!$resultsContainer) { return; }
			$resultsContainer.empty().hide();
		}
	};
}(window.app = window.app || {}, jQuery));




//app.clearOgCookies
(function (app, $) {
	
	function clearCookies() {
		 var cookies = document.cookie.split(";");
		 var a_temp_cookie = '';
		 var cookie_name = '';
		  
		  for(index = 0; index < cookies.length; index++)
		  {
			  a_temp_cookie = cookies[index].split( '=' );
              cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

              if ( cookie_name == "oneTimeOrder" )
      		     {//deleteCookie(cookie_name);
      		     console.log(a_temp_cookie[1]);
      		    
      		   }   
              else if( cookie_name == "upcomingOrders")
                 {//deleteCookie(cookie_name);
                 console.log(cookie_name);
                 }
		  }
		  if ( !cookies )
			{
				return null;
			} 
		    
	} 
	
	function deleteCookie(key)
	{
	  // Delete a cookie by setting the date of expiry to yesterday
	   var date = new Date();
		    date.setDate(date.getDate() -1);
		    document.cookie = cookie_name+'=;domain=.demandware.net;path=/;expires=' + date;
	
	}
	
	app.clearOgCookies = {
			init : function () { 
				clearCookies();
			}
	};

}(window.app = window.app || {}, jQuery));


//app.loginDialog
(function (app, $) {
	
	function initializeDialog() {
		var loginTitle = "Login";
		var options = {
			width:450,
			height:'auto',
			title:loginTitle,
			open:function() {
			}
		};
		
	   var dialogs = jQuery(".headercustomerinfo_content").clone(true,true).dialog(options).wrapAll('<div class="lushI lushB"></div>');
	   dialogs.dialog("open");
	   
	} 
	app.loginDialog = {
			init : function () { 
			 initializeDialog();
			}
	};

}(window.app = window.app || {}, jQuery));

		//var url = app.urls.loginbox; 
		//app.dialog.open({url:url, options:options});	


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
		//return this.height($(arr[0]).height());
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
});