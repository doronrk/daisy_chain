(function($,sr){
 
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
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
 
          timeout = setTimeout(delayed, threshold || 500); 
      };
  }
	// smartresize 
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
 
}(jQuery,'smartresize'));


/*
 * All javascript logic for the mobile layout.
 *
 * The code relies on the jQuery JS library to
 * be also loaded.
 *
 * The logic extends the JS namespace app.*
 */
(function(app, $, undefined) {
	
	app.responsive = {
	
		mobileLayoutWidth : 767,
		tabletWideWidth : 769,
		
		//Ben: viewport size flags
		viewportSize : "standard", 
		
		isMobileNavEnabled : false,
		
		itsTiny : function() {
			//unrig ".twoColSubMenu" columns if they exist
			$(".twoColSubMenu").each(function(){
				//take all the LIs and move them out to their proper place, the parent
				$(this).children().appendTo($(this).parent());
				$(this).remove();//dump the now empty twoColSubMenu
			});
			
			app.responsive.viewportSize = "tiny";
			
			$("#mini-cart").addClass("disabledCart");
			
			//reset menu
			$("nav ul.level-2 li").height("auto").width("auto").css("paddingLeft","auto");
			$("nav ul.level-2 li a").css("marginLeft", "8px"); 
			
			//pdp
			
			//$(".product-tabs").before($("#pdpMain #product-content"));
			
			
			//MENU REDRAW WORK
			$("nav ul.level-3").each(function(){
				
				$($(this).children()).width("auto").height("auto");
				$(this).width("auto").height("auto");
			});
			//MENU SET ALL HEIGHTS
			$("nav .level-2").each(function(){
				
				$(this).find("ul.level-3").height("auto");
				$(this).find(".menu-follow .menu-wrapper").height("auto");
			});
			
			$("nav .level-2").each(function(){
				var mainDiv = $(this);
				var numElems = 1;
							
				mainDiv.css('min-width','100px');
				
			});
			
			$(".menu-shop-header, .menu-follow-header").css("paddingLeft","auto");
			
			//move user-account to the header for iconification...
			//$("#navigation").append($(".user-account"));
			
			
			//Ben: this really necessary on mobile devices, but for the sake of tidyness...
			$("#navigation ul.level-1 li, ul.level-1 li").off("mouseover", "*");
			
			$(".header-search .searchbutton").on("click touch", function(){
				//open the search
				$(this).parent().find('input[type="text"]').toggle();
				$(this).parents(".header-search").toggleClass("open");
			
			});

			$('.navigation-header').removeClass("visually-hidden");
		},
		//the full browser width
		itsBig : function(){
			//unrig ".twoColSubMenu" columns if they exist
			$(".twoColSubMenu").each(function(){
				//take all the LIs and move them out to their proper place, the parent
				$(this).children().appendTo($(this).parent());
				$(this).remove();//dump the now empty twoColSubMenu
			});
			
			app.responsive.viewportSize = "standard";
			$("#mini-cart").removeClass("disabledCart");
			
			//MENU REDRAW WORK
			var MAXCOLSIZE = 12;//the maximum number of items in a single column (Ben: should this be size/2 if size > 24?)
			var leftOffset = 0;
			
			//SIZE UP THE COLUMNS IN EACH MENU-SHOP
			$("nav .menu-shop ul.level-2").each(function(index){
				var tallestRow = 0;
				var outerCols = 0;
				var longCats;
				
				//AT MOST 2 COLUMNS, 4 COLUMNS IN TOTAL!
				$(this).find("ul.level-3").each(function(){//find the tallest row

					
					var numRows = 0;
					var numCols = 0;

					$($(this).children()).width("150px").height("auto");
					
					//check for number of ul.level-2s
					if($(this).children().length > MAXCOLSIZE && $(this).parent().parent().parent().children().length < 4){
						//WE'VE GOT A LOT of items and LESS THAN 4 SUBCATEGORIES
						//RENDER as 2 COLUMN UL3
						numCols = 2;
						
						numRows = Math.ceil($(this).children().length/2);
						numRows = MAXCOLSIZE; 
						
						//slice up the kids, throw them into columnizing divs (left-floating boxes)
						var col1Kids = $(this).children().slice(0,numRows);
						var col2Kids = $(this).children().slice(numRows, $(this).children().length);
						   
						
						$(this).children().detach();//momentarily remove from DOM
						//box em up and throw em back in!
						$(this).append($("<div class='twoColSubMenu' style='float:left;'></div>").append(col1Kids));//1st COLUMN
						$(this).append($("<div class='twoColSubMenu' style='float:left;'></div>").append(col2Kids));//2nd COLUMN
		
					}else{
						//RENDER as 1 COLUMN UL3
						numCols = 1;
						numRows = $(this).children().length;
					}
					if(numRows > tallestRow){
						tallestRow = numRows;
					}
					
					$(this).width(176*numCols); 
					$(this).parent().parent().css("paddingLeft","14px");
					$(".menu-shop-header, .menu-follow-header").css("paddingLeft","14px");

					outerCols += numCols;
				});
				//DONE WITH SUBMENUS (.level-3)...
				
				//SET WIDTHS on the Level2 (the big outer menu)
				var shopWidth = 191*outerCols+1;
				var fullWidth = shopWidth + 236; //236 is the width of the follow block
				$(this).parent().parent().width(shopWidth);//set it!
				//$(this).find(".menu-shop").width(shopWidth);
				var theWholeMenu = $(this).parent().parent().parent();
				theWholeMenu.width(fullWidth);
				
				theWholeMenu.show();
				var followHeight = theWholeMenu.find(".menu-follow .menu-wrapper").height();
				theWholeMenu.hide();
				//theWholeMenu.css("display","inherit");
				
				if(followHeight < (37*tallestRow)){
					//SET HEIGHTS
					theWholeMenu.find("ul.level-3").height(20*tallestRow);
					theWholeMenu.find(".menu-follow .menu-wrapper").height((20*tallestRow)+64);
					
				}else{
					//alert("FH: "+followHeight+" TR: "+37*tallestRow);
					theWholeMenu.find("ul.level-3").height(followHeight-64);
				}
				
				
				//SET LEFTS
				var leftPos = leftOffset+1; // -79 is the offset from the left side
				
				//If it threatens to hang over the right side
				if(79+leftPos+fullWidth>1001){
					leftPos = 1001-fullWidth-79;//subtract the difference!
				} 
				theWholeMenu.css("left", leftPos);
				
				//Update the leftoffset
				var topAlink = $(this).parent().parent().parent().parent().find("a.level-1");
				leftOffset += topAlink.outerWidth(true)+12;
				
			});

			//cleanup user-account to the header for iconification...
			$("#navigation .user-account").append(".menu-utility-user li:first-child");
			
			$('.navigation-header').addClass("visually-hidden");
			//$("#pdpMain .product-col-2").append($("#pdpMain #product-content"));
						
		},
		//the Tablet widescreen view
		itsLarge: function(){
			//unrig ".twoColSubMenu" columns if they exist
			$(".twoColSubMenu").each(function(){
				//take all the LIs and move them out to their proper place, the parent
				$(this).children().appendTo($(this).parent());
				$(this).remove();//dump the now empty twoColSubMenu
			});
			
			if(app.responsive.viewportSize=="large"){
				return;
			}
			app.responsive.viewportSize = "large";
			
			$(".header-search .searchbutton").on("click touch", function(){
				//open the search
				$(this).parent().find('input[type="text"]').toggle();
				$(this).parents(".header-search").toggleClass("open");
		
		});
		
			
			//MENU REDRAW WORK
			var MAXCOLSIZE = 12;//the maximum number of items in a single column (Ben: should this be size/2 if size > 24?)
			var leftOffset = 0;
			
			//SIZE UP THE COLUMNS IN EACH MENU-SHOP
			$("nav .menu-shop ul.level-2").each(function(index){
				var tallestRow = 0;
				var outerCols = 0;
				var longCats;
				
				//AT MOST 2 COLUMNS, 4 COLUMNS IN TOTAL!
				$(this).find("ul.level-3").each(function(){//find the tallest row
					
					var numRows = 0;
					var numCols = 0;

					$($(this).children()).width("132px").height("auto");
					
					//check for number of ul.level-2s
					if($(this).children().length > MAXCOLSIZE && $(this).parent().parent().parent().children().length < 4){
						//WE'VE GOT A LOT of items and LESS THAN 4 SUBCATEGORIES
						//RENDER as 2 COLUMN UL3
						numCols = 2;
						
						numRows = Math.ceil($(this).children().length/2);
						numRows = MAXCOLSIZE; 
						
						//slice up the kids, throw them into columnizing divs (left-floating boxes)
						var col1Kids = $(this).children().slice(0,numRows);
						var col2Kids = $(this).children().slice(numRows, $(this).children().length);
						   
						
						$(this).children().detach();//momentarily remove from DOM
						//box em up and throw em back in!
						$(this).append($("<div class='twoColSubMenu' style='float:left;'></div>").append(col1Kids));//1st COLUMN
						$(this).append($("<div class='twoColSubMenu' style='float:left;'></div>").append(col2Kids));//2nd COLUMN
		
					}else{
						//RENDER as 1 COLUMN UL3
						numCols = 1;
						numRows = $(this).children().length;
					}
					if(numRows > tallestRow){
						tallestRow = numRows;
					}
					
					$(this).width(132*numCols); 
					$(this).parent().parent().css("paddingLeft","11px");
					$(".menu-shop-header, .menu-follow-header").css("paddingLeft","11px");

					outerCols += numCols;
				});
				//DONE WITH SUBMENUS (.level-3)...
				
				//SET WIDTHS on the Level2 (the big outer menu)
				var shopWidth = 146*outerCols+10;
				var fullWidth = shopWidth + 174; //174 is the width of the follow block
				$(this).parent().parent().width(shopWidth);//set it!
				//$(this).find(".menu-shop").width(shopWidth);
				var theWholeMenu = $(this).parent().parent().parent();
				theWholeMenu.width(fullWidth);
				
				theWholeMenu.show();
				var followHeight = theWholeMenu.find(".menu-follow .menu-wrapper").height();
				theWholeMenu.hide();
				//theWholeMenu.css("display","inherit");
				
				if(followHeight < (20*tallestRow)){
					//SET HEIGHTS
					theWholeMenu.find("ul.level-3").height(20*tallestRow);
					theWholeMenu.find(".menu-follow .menu-wrapper").height((20*tallestRow)+64);
					
				}else{
					theWholeMenu.find("ul.level-3").height(followHeight-64);
				}
				
				
				//SET LEFTS
				var leftPos = leftOffset; // -79 is the offset from the left side
				
				//If it threatens to hang over the right side
				if(80+leftPos+fullWidth>761){
					leftPos = 761-fullWidth-79;//subtract the difference!
				} 
				theWholeMenu.css("left", leftPos);
				
				//Update the leftoffset
				var topAlink = $(this).parent().parent().parent().parent().find("a.level-1");
				leftOffset += topAlink.outerWidth(true)+12;
				
			});
			
			// redraw order details table
			if($("#wrapper.order-details").length > 0 && $("#wrapper.order-details").width() > 400) {
				$(".order-shipment-table .price-data, .order-shipment-table .price-header, .order-shipment-table .qty-data, .order-shipment-table .qty-header").show();
				$('.data').hide();
			}
			
			
		},
		
		
		init : function () {

			$cache = {
					wrapper: $('#wrapper'),
					navigation: $('#navigation'),
					homepageSlider: $('#homepage-slider'),
					accountNavigation: $('.accountlist'),
					accountHeader: $('.accountoverview h1')
				};

			// toggle menu element
			$cache.navigation.find('.navigation-header')
				.click(function(){
					if(jQuery(this).hasClass("activeNav")){
						jQuery(this).removeClass("activeNav")
					}else{
						jQuery(this).addClass("activeNav")
					}
					
					jQuery(this).siblings('.menu-category').toggle();
				});
			
			
			// check onload to see if mobile enabled
			if( $cache.wrapper.width() <= this.mobileLayoutWidth ) {
				app.responsive.enableMobileNav();
			}else{
				
			}
			
		},
		
		rebuildPDP : function(){
			var zoomExists = ($(".zoomPad").length > 0 ? true : false);
			/*
			if(zoomExists){
				app.product.removeZoom();
			}
			*/
			if(app.responsive.viewportSize==="large"){
				//app.product.initZoom();
				$("a.main-image").addClass("image-zoom");

			}else if(app.responsive.viewportSize==="standard"){
				//app.product.initZoom();
				$("a.main-image").addClass("image-zoom");
			}else{
				app.product.removeZoom;
			}
		},
		
		
		// build vertical, collapsable menu
		enableMobileNav : function(){
			if(this.isMobileNavEnabled){
				return;
			}
			
			$cache.navigation.find('.menu-category li a span').remove();
			$cache.navigation.find('h1:first').removeClass("activeNav");//reset the +/- icon
			$cache.navigation.find('.menu-category').hide();
			
			// if there is a subnav, add class hasSub
			$cache.navigation.find('.menu-category').find('li a.level-1').each(function(){
				if((jQuery(this).siblings().length > 0 )) {
					jQuery(this).addClass('hasSub');
				}
			});
			

			$(".hasSub").on("click touch", function(e){
				e.preventDefault();
				if($(this).hasClass('open')){
					jQuery(this).siblings("div.level-2").hide();
					jQuery(this).removeClass('open');
					return false;
				} else {
				
				jQuery(this).siblings("div.level-2").show();
				jQuery(this).addClass('open');
				return false;
				}
				
			});
						
			if($("#wrapper").hasClass("pt_product-search-result") ){
				
				$("#secondary").not(".nohits").insertAfter(".breadcrumb");
				
				//then the header
				//$("<div id='refineSearchHeader'>Refine Search <span class='switch'></span></div>").insertAfter(".breadcrumb").show();
				
				//move refinements menu into it's proper place
				$("#secondary").hide();
				$("#primary .sort-by").after($("<div id='mobileRefinementButton'>Filter</div>"))
				$("#mobileRefinementButton").after($("#secondary"));
				
				$(".refinement li").each(function(){
					var refine = $(this);
					if(refine.hasClass('selected')) {
						refine.addClass('scrollHere');
						$("#secondary").show();
						var scrollHere = $('.scrollHere').parents('.refinement').find('h3')
						$('html, body').animate({
						    scrollTop: scrollHere.offset().top
						});
						refine.removeClass('scrollHere');
					}
				});
			    
				//prev/next triangles
				var prevButton = $(".page-previous:first");
				var nextButton = $(".page-next:first");
				$(".full-results").prepend(prevButton).append(nextButton);
				$(".search-options-footer").prepend(prevButton).append(nextButton);
				//add the menu button
				//wire it up
				$("#mobileRefinementButton").on("click", function(){
					if($("#secondary").is(":visible")){
						$("#secondary").hide();
					}else{
						$("#secondary").show();
					}
				});
			}
			
			if($(".order-history-header").length > 0){
				//prev/next triangles
				var prevButton = $(".page-previous:first");
				var nextButton = $(".page-next:first");
				$(".full-results").prepend(prevButton).append(nextButton);
				$(".search-options-footer").prepend(prevButton).append(nextButton);
			}
			
			//ORDER CONFIRMATION REDRAW
			if($("#wrapper").hasClass("pt_order-confirmation") && $("#shipDetails").length==0){
				//break shipping address out to it's own table
				// the header $(".order-shipment-table th.section-header:last-child");
				$(".order-shipment-table").before("<table id='shipDetails'><thead></thead><tr></tr></table>");
				$("#shipDetails thead").append($(".order-shipment-table th.section-header:last-child"));
				$("#shipDetails tr:last-child").append($(".order-shipment-table td.order-shipment-details:last-child"));
				
			}
			
			// small viewport layout redraws	
			if($("#wrapper.order-details").length > 0 && $("#wrapper.order-details").width() <= 400) {
				$(".order-shipment-table td.item-data").append('<div class="data">' + '<span class="label">Price: </span>' + $(".order-shipment-table td.price-data").html() + '</div>')
				$(".order-shipment-table .price-data, .order-shipment-table .price-header").hide();
				$(".order-shipment-table td.item-data").append('<div class="data">' + '<span class="label">Qty: </span>' + $(".order-shipment-table td.qty-data").html() + '</div>')
				$(".order-shipment-table .qty-data, .order-shipment-table .qty-header").hide();
			}
			if($("#wrapper.order-details").length > 0 && $("#wrapper.order-details").width() > 400) {
				$(".order-shipment-table .price-data, .order-shipment-table .price-header, .order-shipment-table .qty-data, .order-shipment-table .qty-header").show();
				$('.data').hide();
			}
			
			this.isMobileNavEnabled = true;
		},
		
		// revert to standard horizontal menu
		disableMobileNav : function(){
			this.isMobileNavEnabled = false;
			$cache.navigation.find('.menu-category').show();
			
			//Ben: is this necessary anymore thanks to all of the menu redrawing in Large and Standard init functions?
			if(app.responsive.viewportSize == "tiny"){
				$cache.navigation.find('.level-2').removeAttr('style');
			}
			$cache.navigation.find('.level-1 span').remove();
			$cache.navigation.find('.menu-category li a span').remove();
			
			$("#secondary").not(".nohits").not(".summary").insertAfter("#primary").show();
			
			//ORDER CONFIRMATION REDRAW
			if($("#wrapper").hasClass("pt_order-confirmation")){
				//$("#shipDetails").remove();
			}
			

			if($("#wrapper").hasClass("pt_product-search-result") ){
				//dump nested secondary if it exists...
				$("#primary #secondary").remove(); 
				//and that pesky show/hide button for it
				$("#mobileRefinementButton").remove();
			}
		},
		
		// carousel touch controls
		/*touchwipe: {
			enable : function(itemsWrapper) {
				if( $(itemsWrapper).parents('.home-slot-slider').find('.wipe-tip').length == 0 ) {
					var wipeTipHolder = $('<div class="wipe-tip">Swipe</div>');
					$(wipeTipHolder).insertBefore(itemsWrapper);
				}
				$(itemsWrapper).touchwipe({
					wipeLeft: function() {
						$(itemsWrapper).parents('.jcarousel-container').find('.jcarousel-next-horizontal').trigger('click');
					},
					wipeRight: function() { 
						$(itemsWrapper).parents('.jcarousel-container').find('.jcarousel-prev-horizontal').trigger('click');
					},
					wipeDown: function() {
                        $(itemsWrapper).parents('.jcarousel-container').find('.jcarousel-next-vertical').trigger('click');
                    },
                    wipeUp: function() {
                        $(itemsWrapper).parents('.jcarousel-container').find('.jcarousel-prev-vertical').trigger('click');
                    },
				    min_move_x: 20,
				    min_move_y: 20,
				    preventDefaultEvents: true
				});
			},
			disable : function() {
				$('.wipe-tip').remove();
			}
		},*/
		
		// pull the slideshow into a variable to re-use
		/*rebuildHomepageSlides: function() {
			if($cache.homepageSlider.length > 0){
				var homeCarousel = 	$cache.homepageSlider.data('jcarousel');
				homeCarousel.stopAuto();
				homeCarousel.scroll(1);
				$cache.homepageSlider.find('.slide').width( $cache.wrapper.width());
				$cache.homepageSlider.find('#homepage-slides').css( {'left':'0','width': ($cache.wrapper.width() * $cache.homepageSlider.find('#homepage-slides li').size()) });
				homeCarousel.reload();
			}
		},*/
		
		toggleGridWideTileView : function(){
			
			/*	toggle grid/wide tile	*/
			if(jQuery('.toggle-grid').length == 0)
			{
				jQuery('.results-hits').prepend('<a class="toggle-grid" href="'+location.href+'">+</a>');
				jQuery('.toggle-grid').click(function(){
					jQuery('.search-result-content').toggleClass('wide-tiles');
					return false;
				});
			}
			
		}

	}
	

	$(document).ready(function(){
		
		app.responsive.init();
		
		if( jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth   ) {
			app.responsive.itsTiny();
			$(".accountoverview h1, #account-information h1, #order-information h1").on("click touch", function(){
				$(".accountnav").insertAfter(".accountoverview h1, #account-information h1");
				$(".accountnav").toggle();
				$(this).toggleClass("open");
			});
			$(".footerLinkList h3").on("click touch", function(){
				$(this).parent().find("ul").toggle();
				$(this).toggleClass("open");
			});
		}else if(jQuery("#wrapper").width() <= app.responsive.tabletWideWidth ){
			app.responsive.itsLarge();
		}else{
			app.responsive.itsBig();
			$(".header-search .searchbutton").on("click touch", function(){
				//open the search
				$(this).parent().find('input[type="text"]').toggle();
				$(this).parents(".header-search").toggleClass("open");		
			});
		}
		
		
		//BEN: touch event wiring
		if(app.isMobileUserAgent){ //ALL ANDROID AND iOS
			//app.responsive.itsTiny();
			//BIND TOP LEVEL CLICKS
			$("ul.level-1 li").on("click", function(e){
				e.stopPropagation();
				
				if($(this).hasClass("active")){
					var theUrl = $(this).find("a").attr("href");
					//alert(theUrl);
					window.location = theUrl;
					
				}
				//activate it
				$(this).addClass("active");
				$(this).find(".level-2").show();
				
				//deactivate others
				$(this).siblings().removeClass("active");
				$(this).siblings().find(".level-2").hide();
				
				return false;
			});
			
			
			//Ben: change this to li? .find("a") if we need to?
			//BIND LINKS WITHIN THE MENUS
			$("#navigation .level-2 a").on("click", function(e) {
				//e.stopPropagation();
				
				//check the li's active state
				if($(this).parent().hasClass("active")){
					if($(this).prop("tagName")==="A"){
						window.location = $(this).prop('href');
					}else{
						//toggle that piece
						$(this).parent().removeClass("active");
					}
				}else{
					$(this).parent().addClass("active");
					
				}
				
			});
			
			
			//Ben: hide the menu when you touch/scroll anywhere
			$(document).not("#navigation").on("touchstart", function(e) {
				$("ul.level-1 li").removeClass("active");
			});
			
		}else{
			// set up listener so we can update DOM if page grows/shrinks, only on bigger platforms
			$(window).smartresize(function(){
				
				//TODO: 
				//turn off menu hovers until the menu redraws
				//then reset the bindings
				
				if( jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth   ) {
					app.responsive.enableMobileNav();
					//app.responsive.rebuildHomepageSlides();
					
					app.responsive.itsTiny();
				}
				else if(jQuery("#wrapper").width() <= app.responsive.tabletWideWidth ){
					app.responsive.itsLarge();
					app.responsive.disableMobileNav();
				}
				else {
					app.responsive.disableMobileNav();
					//app.responsive.rebuildHomepageSlides();
					
					app.responsive.itsBig();
				}
				if(jQuery("#pdpMain").length > 0){
					app.responsive.rebuildPDP();
				}
				
				//rebind the menu hovers
				bindMenuEvents();
			});
			
			//bind the menu hovers
			bindMenuEvents();
		}

	});
}(window.app = window.app || {}, jQuery));

function bindMenuEvents(){
	//bind the menu hovers
	/*$("#navigation ul.level-1 li").off("mouseover mouseout", "*");
	$("#navigation ul.level-1 li").on("mouseover", function(){
		$(this).find("div.level-2").show();
	}).on("mouseout", function(){
		$(this).find("div.level-2").hide();
	});
	
	$("ul.level-1 li").off("mouseover mouseout", "*");
	$("ul.level-1 li").on("mouseover", function(){
		$(this).addClass("active");
	}).on("mouseleave", function(){
		$(this).removeClass("active");
	});*/
}

