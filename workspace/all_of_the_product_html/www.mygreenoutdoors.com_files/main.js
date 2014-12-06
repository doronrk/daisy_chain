$(document).ready(function() {
		
	var itemTxt = $('.cartCount strong').text();
	var totalCost = $('.cartCost strong').text();
				if(totalCost.length != 0) {
	$('.CartLink span').html(itemTxt+' Items / '+totalCost);
				}
				
	var hash = window.location.hash;
	if (hash == '#ProductReviews' || hash == '#write_review') {
		$('#ProductReviews').find('.subtitle').trigger('click');
	}
	
	$('.saveToWhishList').click(function() {
		$('#frmWishList').submit();
	});
	
	$('.wishTrigger').click(function() {
		$('#MultipleWishListForm').slideToggle( "fast" );
		$(".radio-inline input[type='radio']").uniform();
	});

	$('.wishListFormClose').click(function() {
		$('#MultipleWishListForm').slideToggle( "fast" );
	});
	
	$('input[type=text],input[type=url],input[type=email],input[type=password]').focus(function () {
		if ($(this).val() == $(this).attr("title")) {
			$(this).val("");
		}
	}).blur(function () {
		if ($(this).val() == "") {
			$(this).val($(this).attr("title"));
		}
	});
	$(".SubTotal td strong:contains('Grand Total:')").closest('tr').addClass('gtotal');
	
	
	
	var onsale = $(".ProductDetailsGrid .DetailRow.PriceRow .Value em");
	if(onsale.children('strike').length > 0 ){
		onsale.addClass("on-sale");
	}
	
	
	
	var shopPath = config.ShopPath;
	var win = window.location.pathname;
		var Maddr = win.toLowerCase().replace(shopPath, ''); // remove the shop path because some links dont have it
	$('.Breadcrumb ul').last().addClass('last');
	//$('.Breadcrumb ul').not('.last').remove();
	var breadLink;
	if ($('.Breadcrumb li:nth-child(2)').children('a').size() != 0) {
		breadLink = $('.Breadcrumb ul.last li:nth-child(2)').children('a').attr('href').toLowerCase().replace(shopPath, '');	
	}
	
	$('#Menu .category-list').addClass('page');
	//$('#Menu .category-list').prepend('<li class=""><a href="'+shopPath+'/">Home</a></li>')
	// add active class to category sidebar
	
	
	
	$("#SideCategoryList li a").each(function() {
			
			var ChrefX = $(this).attr('href').toLowerCase().replace(shopPath, ''); // remove shop path if any because some links dont have it
		
		if (Maddr==ChrefX) {
			$(this).closest('.parent').children('a').addClass("active"); //if the window location is equal side menu href
			
		} 
		
	});

	// add active class to menu	
	$(".category-list.page a").each(function() {
			
			var MhrefX = $(this).attr('href').toLowerCase().replace(shopPath, ''); // remove shop path if any because some links dont have it
		
	
		
	
		if (Maddr==MhrefX) {
			
			
			$(this).closest('.parent').addClass("ActivePage"); //if the window location is equal side menu href
			
		} 
		if (breadLink == MhrefX) {
			$(this).closest('.parent').addClass("ActivePage");
		}
		
		
	});
	
	if($('input[type="checkbox"]').is(":visible")){
		$('input[type="checkbox"]').not('#category input[type="checkbox"]').uniform();
	}
	if($('input[type="radio"]').is(":visible")){
		$('input[type="radio"]').not('.productOptionPickListSwatch input[type="radio"], .productOptionViewRectangle input[type="radio"]').uniform();
	}
	
	$('select').not('select#FormField_12, .UniApplied').uniform({ selectAutoWidth: false });
	$('input[type="file"]').uniform();  
	
	//currency display
   var currentCurrency = $('#currencyPrices span').html();
   currentCurrency = currentCurrency.substring(0,currentCurrency.length);
   $('#SideCurrencySelector .selCurr').html(currentCurrency);
   
   var currentCurrencyF = $('.CurrencyList').find('.Sel').html();
   $('.selected-currency').html(currentCurrencyF);	
  
   if ($('.ChooseCurrencyBox').size() == 1 ) {
   		$('.changeCurr').hide();	
   }
	if ($('.ChooseCurrencyBox').size() !=0 ) {
		$('.changeCurr').live("click",function() {

			if ($("#SideCurrencySelector .CurrencyList").is(':visible')) {
				$('.CurrencyChooser').hide();
				$("#SideCurrencySelector .CurrencyList").stop(true,true).hide();	
				$(this).text('Change');
				if($('#SideCurrencySelectorMobile .changeCurr').html() != undefined)
					$('#SideCurrencySelectorMobile .changeCurr').html('Change Currency');
			} else {
				$('.CurrencyChooser').show();
				$(this).text('Cancel');
				$("#SideCurrencySelector .CurrencyList").stop(true,true).show();	
			}
			return false;
		});
	}
	
	
	$("#wishlistsform a:contains('Share')").each(function() {
		$(this).attr('title', 'Share Wishlist');
	})
	
	
	$('#selectAllWishLists').click(function() {
		$.uniform.update(); 
	});
	
	
	// menu adjust
	$("#Menu ul > li").each(function() {
		$(this).addClass('parent');
	});	
	$(".PageMenu .category-list  > li").each(function() {
		$(this).addClass('parent');
		
			tallest = 0;
			group =  $(this).find('ul');
		
		group.each(function() {
			thisHeight = $(this).height();
			if(thisHeight > tallest) {
				tallest = thisHeight;
			}
		});
		group.height(tallest);
	});
	
	$('.PageMenu li').each(function() {
		if ($(this).children('ul').size() != 0) {
			$(this).children('a').addClass('hasSub');	
		}
	});
	$('.PageMenu li').hover(function() {
		$(this).addClass('over');
		return false;
	}, function() {
		$(this).removeClass('over');
	});
	
	$( '.HasSubMenu' ).on( "mouseleave", function() { $(this).removeClass('over');$(this).removeClass('sfHover');});
	
	var num = $('.PageMenu .parent').size(); 
	$('.category-list .parent').each(function(i) {
				$(this).css('z-index', num - i);
		});
		$('.PageMenu #Menu .parent').each(function(i) {
				$(this).css('z-index', num - i);
		});
	
	//Drawer Subnavigation Accordion
    $("#DrawerMenu li ul").addClass("drawer-subcat");
    $("#DrawerMenu .drawer-subcat").prev("a").after("<span class='sf-sub-indicator subcat-expand'></span>");
    $("#DrawerMenu .subcat-expand").click(function(){
       $(this).next(".drawer-subcat").toggleClass("expanded", 500, "easeOutExpo");	   
		
		if ($(this).hasClass("subcat-expand")) {
			 $(this).removeClass("subcat-expand");
		} else {
			$(this).addClass("subcat-expand");
		}
    })
	
	//Drawer Menu
	menuToggle = $("#ToggleMenu");
	drawer = $("#DrawerMenu");
	page = $(".page");
	menuToggle.click(function(){
		$(this).toggleClass('active normal');
		if (page.hasClass("off-screen")) {
			setTimeout(function(){drawer.toggleClass("on-screen")},100);
		} else {
			drawer.toggleClass("on-screen");
		}
	});
	
	if ($(".CartLink span").length > 0) {
				var itemTxt = $(".CartLink span").html();
				var e = itemTxt.replace(/[^\d.]/g, '');
				
				var c = e;
				if(c=='') {
					c = 0;
				}
				
				$(".CartLink span").html(c);
				$("#cart-amount .total").html(e);
		}

	//Checking if device is touch enabled. There is no surefire solution for this, but this boolean caters for most cases.
	//http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
	//A CSS fallback has been written in /Styles/responsive.css for edge case devices.
	var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
	
	if (isTouch) {
		//Disable the swatch preview on touch devices - this is triggered on mouseover, which isn't ideal for touch devices.
		$.fn.productOptionPreviewDisplay = $.noop;
	} 

	//Functions for mobile breakpoint
	if (matchMedia("screen and (max-width: 480px)").matches) {


		searchbar = $(".header-secondary").parents("#Header");
		var lastScroll = 0;

		$(window).scroll(function(){
			var thisScroll = $(this).scrollTop();
				if (thisScroll > lastScroll && thisScroll > 0) {
					searchbar.addClass("off-screen");
				} else {
					searchbar.removeClass("off-screen");
				}
			lastScroll = thisScroll;
		});

		/*!
		* FitText.js 1.1
		*
		* Copyright 2011, Dave Rupert http://daverupert.com
		* Released under the WTFPL license
		* http://sam.zoy.org/wtfpl/
		*
		* Date: Thu May 05 14:23:00 2011 -0600
		*/
		// Modified and added by Miko Ademagic

		$.fn.fitText = function( k, o ) {

			// Setup options
			var compressor = k || 1,
					settings = $.extend({
						'minFontSize' : Number.NEGATIVE_INFINITY,
						'maxFontSize' : Number.POSITIVE_INFINITY
					}, o);

			return this.each(function(){

						// Store the object
						var $this = $(this);

						// Resizer() resizes items based on the object width divided by the compressor * 10
						var resizer = function () {
							var sl = $this.text().length;
							$this.css('font-size', Math.max(Math.min(($this.width() / sl) * compressor, parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
						};

						// Call once to set.
						resizer();

						// Call on resize. Opera debounces their resize by default.
					 $(window).bind('resize.fittext orientationchange.fittext', resizer);

			});

		};

		$('#LogoContainer h1').fitText(1.6, { minFontSize: '14px', maxFontSize: '28px' });
		/*******************/
	}
	
	$('.FormFieldLabel').each(function() {
		$(this).text($(this).text().replace(/:/g,"")); 
	});
});



function ToggleShippingEstimation2(){
		var $container = $(".EstimateShipping");
		$('.EstimatedShippingMethods').hide();
		
		
		if ($container.is( ":hidden" )){
			// Show - slide down.
			$('.EstimateShippingLink').hide();	
			$container.slideDown(300, function() {
				
			});	
			$('.EstimateShipping select:eq(0)').focus();
			//$('#shippingZoneState:not(".UniApplied")').uniform();
			if ($('#shippingZoneState').is(':hidden')) {
				$('#uniform-shippingZoneState').hide();
			}
		 
		} else {
		 
			// hide - slide up.
			
			$container.slideUp(300, function() {
				$('.EstimateShippingLink').show();	
			});	
		
		 
		}
		

};
	