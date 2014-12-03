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
 * All java script logic for the mobile layout.
 *
 * The code relies on the jQuery JS library to
 * be also loaded.
 *
 * The logic extends the JS namespace app.*
 */
(function(app, $, undefined) {
	
	app.responsive = {
	
		mobileLayoutWidth : 767,
		tabletLayotWidth : 1025,
		currentWidth : 0,
		
		init : function () {

			$cache = {
					wrapper: $('#wrapper'),
					navigation: $('#navigation'),
					header: $('#header'),
					mainBlock: $('#main'),
					homepageSlider: $('#homepage-slider'),
					searchDropdown: $('#mainsearch'),
		            cartBlock: $('.cart-wishlist-block'),
		            minicartDropdown: $('.mini-cart-content'),
		        	refinementsBlock: $('.category-wrapper').find('.refinements'),
		        	primaryContentBlock: $('.category-wrapper').find('#primary')
				};
			
			app.responsive.currentWidth = $cache.wrapper.width();
			
			/*-----show-menu-on click-menu-button---*/
			$cache.header.on('click', '#slideMenu-hide', function(){
			    $(this).attr('id','slideMenu-show');
				$cache.navigation.find('.menu-category').show();
				$cache.navigation.animate({"left": "0"}, 300, function() {
					app.responsive.showOffCanvasNav();
					if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	            		$('html').addClass('menu-mobile');
	            	} else {
	            		$('html').addClass('menu-desktop');
	            	}
				}).addClass('block-shadow');
				$('#wrapper, #header, #mainsearch, .navigation-block-shadow').animate({"left": "230px"}, 300);	

        		 // document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
  	        	  var scroller = document.getElementById('navigation');
	        	  preventOverScroll(scroller);
				//console.log('show on button click');
			});
			
			/*-----show-menu-on-click-menu-button---*/
			$cache.header.on('click', '#slideMenu-show', function(){
			    $(this).attr('id','slideMenu-hide');
			    $cache.navigation.animate({"left": "-230px"}, 300, function() {
			    	$(this).removeAttr('style');
			    	$(this).removeClass('block-shadow');
					app.responsive.hideOffCanvasNav();
	            	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	            		$('html').removeClass('menu-mobile');
	            	} else {
	            		$('html').removeClass('menu-desktop');
	            	}
			    });
			    $('#wrapper, #header, #mainsearch, .navigation-block-shadow ').animate({"left": "0px"}, 300);
			    document.addEventListener('touchmove', function(e) { return true; }, true);
			    //console.log('hide on button click');
			});
			
			/*-----hide-menu-on-click-login-link---*/
			$cache.navigation.on('click', '.slidemenu-customer-login-link', function(){
			    $(this).attr('id','slideMenu-hide');
			    $cache.navigation.animate({"left": "-230px"}, 300, function() {
			    	$(this).removeAttr('style');
			    	$(this).removeClass('block-shadow');
					app.responsive.hideOffCanvasNav();
			    	
	            	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	            		$('html').removeClass('menu-mobile');
	            	} else {
	            		$('html').removeClass('menu-desktop');
	            	}
			    });
			    $('#wrapper, #header, #mainsearch, .navigation-block-shadow ').animate({"left": "0px"}, 300);
			    document.addEventListener('touchmove', function(e) { return true; }, true);
			    //console.log('hide on login click');
			});
			
			/*-----hide-menu-on-swipeleft---*/
			$('body').on('swipeleft', function(e){
				//e.preventDefault();
				if ($('.menu-btn').attr('id')===('slideMenu-show')) {
					$('.menu-btn').attr('id','slideMenu-hide');
				    $cache.navigation.animate({"left": "-230px"}, 300, function() {
				    	$(this).removeAttr('style'); 
				    	$(this).removeClass('block-shadow');
						app.responsive.hideOffCanvasNav();
				    	
		            	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		            		$('html').removeClass('menu-mobile');
		            	} else {
		            		$('html').removeClass('menu-desktop');
		            	}
				    });
				    $('#wrapper, #header, #mainsearch, .navigation-block-shadow').animate({"left": "0px"}, 300);
				    document.addEventListener('touchmove', function(e) { return true; }, true);
				}
				//console.log('hide on swipe');
			});
			
			/*-----hide-menu-on-touch---*/
			$('#main, #footer, #mainsearch, .promotional-content').on('touchstart', function(){
				if ($('.menu-btn').attr('id')===('slideMenu-show')) {
					$('.menu-btn').attr('id','slideMenu-hide');
				    $cache.navigation.animate({"left": "-230px"}, 300, function() {
				    	$(this).removeAttr('style'); 
				    	$(this).removeClass('block-shadow');
						app.responsive.hideOffCanvasNav();
				    	
		            	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		            		$('html').removeClass('menu-mobile');
		            	} else {
		            		$('html').removeClass('menu-desktop');
		            	}
				    });
				    $('#wrapper, #header, #mainsearch, .navigation-block-shadow').animate({"left": "0px"}, 300);
				    document.addEventListener('touchmove', function(e) { return true; }, true);
					//console.log('hide on touch');
				}
			});

			// check onload to see if mobile enabled
			if( $cache.wrapper.width() <= this.tabletLayotWidth ) {
				app.responsive.enableMobileNav();
			}
		},
		
		/*------get-event-on-touch------*/
        getEventOnUserAgent: function() {
            var ua = navigator.userAgent,
            event = (ua.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile)/)) ? "touchend" : "click";
            return event;
        },
        
		/*----sticky-menu-----*/
		 sticky_menu: function() {
     		var cartBlock = $cache.cartBlock;
     		var searchBlock = $cache.searchDropdown;
     		
         if ($(window).width() <= app.responsive.tabletLayotWidth) {
             var navigationBlock =  $cache.header;
             $cache.navigation.detach().appendTo('body');
         } else {
             var navigationBlock =  $cache.navigation;
             $cache.navigation.detach().appendTo('#header');
         }
         
         if ( !$cache.header.hasClass('small-header') ) {
        	 var navigation_offset_top = navigationBlock.position().top;
         }
         
         var sticky_navigation = function(){
        	 if ( !$cache.header.hasClass('small-header') ) {
        		
	             var scroll_top = $(window).scrollTop();
	
	             $cache.header.removeClass('fixed-menu');
	             $cache.navigation.removeClass('fixed-menu');
	             
	             if (scroll_top > navigation_offset_top) {
	                 navigationBlock.addClass('fixed-menu');
	                 cartBlock.addClass('fixed-cart');
	                 searchBlock.addClass('fixed-search');
	                 $('.navigation-block-shadow').addClass('fixed-shadow');
	                 
	                 if (  $(window).width() > 1024 ) {
	                	 $('.search-landing-top-slider').css('margin-top', jQuery("#navigation").height());
	                 }
	                 
	                 if (  $('.search-landing-top-slider').size() === 0 ) {
	                	 $(".desktop #main .breadcrumb").css("margin-top", jQuery("#navigation").height());
	                 }
	             } else {
	                 navigationBlock.removeClass('fixed-menu');
	                 cartBlock.removeClass('fixed-cart');
	                 searchBlock.removeClass('fixed-search');
	                 $('.navigation-block-shadow').removeClass('fixed-shadow');
	                 $('.search-landing-top-slider').css('margin-top', 0);
	                 
	                 if (  $('.search-landing-top-slider').size() === 0 ) {
	                	 $(".desktop #main .breadcrumb").css("margin-top", 0);
	                 }
	             }
        	 }
         };

         sticky_navigation();

         $(window).scroll(function() {
             sticky_navigation();
         });
         
         this.fixedHeader();
     }, 
     //only of iOS
     fixedHeader: function () {
    	 var header       = $('#header'),
     	 	 headerShadow = $('.navigation-block-shadow'),
     	 	 $doc         = $(document);

	     if( !header.length || !navigator.userAgent.match(/iPhone|iPad|iPod/i) )
	         return;
	     /**
	      * We should all pages except the checkout
	      */
	     if (!header.hasClass('small-header')) {
	    	 $doc.on('focus.iOSKeyboardFix', 'input, textarea, [contenteditable]', bind);
	     }
	
	     function bind(){
	         $(window).on('scroll.iOSKeyboardFix', react);
	         $(window).on('touchmove.iOSKeyboardFix', react);
	         react();
	     }
	
	     function react(){
	         var scrollY = window.pageYOffset,
	             shadowTop = parseInt(headerShadow.css('top'));
	         header.css({'position':'absolute', 'top': scrollY+'px'});
	         headerShadow.css({'position':'absolute', 'top': (scrollY + shadowTop)+'px'});
	         
	         $doc.on('blur.iOSKeyboardFix', 'input, textarea, [contenteditable]', unbind);
	     }
	
	     function unbind(){
	         headerShadow.removeAttr('style');
	         header.css({'top' : '0'});
	         //document.activeElement.blur();
	         
	         $(window).off('scroll.iOSKeyboardFix touchmove.iOSKeyboardFix');
	         $doc.off('touchend.iOSKeyboardFix blur.iOSKeyboardFix');
	     }
     },
     	
		// build vertical, collapsable menu
		enableMobileNav : function(){
			var firstLevel = $cache.navigation.find('.menu-category');
			
			 firstLevel.children('li').children('a').siblings().parent().addClass('parent');
			
			 $('.menu-category').find('li').each(function() {
			    if ($(this).find('.menu-wrapper .level-2 li').length == 0) {
			    	$(this).removeClass('parent');
			    }
		     });
			 
				firstLevel
				.children('li.parent')
					.children('a')
						.bind('click', function(e){
							e.preventDefault();	
						})

			firstLevel
				.hide()
				.children('li.parent')
					.children('a')
						.click(function(e){						
							if((!jQuery(this).siblings().is(":visible"))) {
								jQuery(this).parent().addClass('opened');
								jQuery(this)
									.append('<span></span>')
									.children('span')
										.click(function(){
											jQuery(this).parent().siblings().slideUp();
											jQuery(this).parent().parent().removeClass('opened');
											jQuery(this).remove();
											return false;
										})
									.parent().siblings().slideDown();
								return false;
							} 
						})
			
		},
		
		// revert to standard horizontal menu
		disableMobileNav : function(){
			$cache.navigation.find('.menu-category').show().css({'display': 'inline-block'});
			$cache.navigation.find('.level-2').removeAttr('style');
			//$cache.navigation.find('.level-1 span').remove();
			var firstLevel = $cache.navigation.find('.menu-category');
			 
			firstLevel
			.children('li.parent')
				.children('a')
					.unbind('click');
		},
		
		// pull the slideshow into a variable to re-use
		rebuildHomepageSlides: function() {
			if($cache.homepageSlider.length > 0){
				var homeCarousel = 	$cache.homepageSlider.data('jcarousel');
				homeCarousel.stopAuto();
				homeCarousel.scroll(1);
				$cache.homepageSlider.find('.slide').width( $cache.wrapper.width());
				$cache.homepageSlider.find('#homepage-slides').css( {'left':'0','width': ($cache.wrapper.width() * $cache.homepageSlider.find('#homepage-slides li').size()) });
				homeCarousel.reload();
			}
		},
		
		showOffCanvasNav : function(){
			$('html,body').addClass('showMenu').css({'overflow':'hidden', 'height': '100%'});
			//$('#wrapper').css({'position':'absolute'}).on('touchmove', function(e){ e.preventDefault(); });
		},
		
		hideOffCanvasNav : function(){
	    	$('html,body').css({'overflow':'', 'height': ''}).removeClass('showMenu');
			//$('#wrapper').css({'position':''}).off('touchmove');
		},
		
		toggleGridWideTileView : function(){
			
			/*	toggle grid/wide tile	*/
			if(jQuery('.toggle-grid').length == 0 && (jQuery('.pt_order').length == 0) && (jQuery('.pt_content-search-result').length == 0))
			{
				jQuery('.results-hits').prepend('<a class="toggle-grid" href="'+location.href+'">+</a>');
				jQuery('.toggle-grid').click(function(){
					jQuery('.search-result-content').toggleClass('wide-tiles');
					return false;
				});
			}
			
		},
		
		refinementsMenuMobileHide: function() {
    		
    		//hide refinements menu for mobile	    	
	    	if (jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth ) {
		    	$cache.refinementsBlock.hide();
		    	$cache.wrapper.find('.rf_menu_hide').removeClass('rf_menu_hide').addClass(' rf_menu_show');
	    	} else {
		    	$cache.refinementsBlock.show();
		    	$cache.wrapper.find('.rf_menu_show').removeClass('rf_menu_show').addClass(' rf_menu_hide');
	    	}
		},
		
		refinementsMenuDesktopShow: function() {
			
    		//change menu position for desktop view
    		if ($cache.refinementsBlock.css('display') == 'none') {
    			$cache.refinementsBlock.show();
    			$cache.wrapper.find('.rf_menu_show').removeClass('rf_menu_show').addClass(' rf_menu_hide');
    		}
		},
		
	    refinementsSlideMenuLargeView: function() {
	    	var refinementsBlockwidth = $cache.refinementsBlock.width();
	    	
	    	//console.log(refinementsBlockwidth)
			
	    	$cache.wrapper.on('click', '.rf_menu_show', function(){
	    		var refinementsBlockwidth = $cache.refinementsBlock.width();
	    		
	    		if( $(wrapper).width() <= app.responsive.mobileLayoutWidth   ) {
				    $(this).addClass(' rf_menu_hide').removeClass(' rf_menu_show');
				    $cache.refinementsBlock.slideDown(300);
				   // console.log('mobile show');

			   } else {
			    	$(this).addClass(' rf_menu_hide').removeClass(' rf_menu_show');
			    	$('body').addClass(' refinement__hide').removeClass(' refinement_show');
				    $cache.refinementsBlock.animate({'left': 0},300);
			    	$cache.primaryContentBlock.parent().animate({"padding-left": refinementsBlockwidth }, 300);
				    $('.product-image').removeClass('not-exposed');
				    $('.category-wrapper #primary').removeClass('closed-menu');
			    	//console.log('desktop show');
			   }
			});
	    	
	    	$cache.wrapper.on('click', '.rf_menu_hide', function(){
	    		var refinementsBlockwidth = $cache.refinementsBlock.width();
	    		
	    		if( $(wrapper).width() <= app.responsive.mobileLayoutWidth   ) {
				    $(this).removeClass(' rf_menu_hide').addClass(' rf_menu_show');
				    $cache.refinementsBlock.slideUp(300);
				   // console.log('mobile hide');
	    		} else {
	    			$(this).addClass(' rf_menu_show').removeClass(' rf_menu_hide');
				    $('body').addClass(' refinement_show').removeClass(' refinement_hide');
				    $cache.refinementsBlock.css({'position': 'absolute'}).animate({'left': -refinementsBlockwidth - 20}, 300);
			    	$cache.primaryContentBlock.parent().animate({"padding-left": "0"}, 300);
				    $('.product-image').addClass('not-exposed');
				    $('.category-wrapper #primary').addClass('closed-menu');
				    //console.log('desktop hide');
	    		}
			});	
	    	
        	if (!$('#refinement_block_present').length > 0) {
        		$('.refinements-menu').hide();
        		$cache.primaryContentBlock.parent().animate({"padding-left": "0"}, 300);
			    $('.product-image').addClass('not-exposed');
			    $('.category-wrapper #primary').addClass('closed-menu');
        	}
	    }, 
	    
	    updateBodyClassOnResize: function() {
			
			if($('.menu-btn a').attr('id')==('slideMenu-show')) {
				app.responsive.showOffCanvasNav();
			} else {
				app.responsive.hideOffCanvasNav();
			}
	    },
		
		/** order review page for mobile **/
	
		orderSummaryShiftIn: function (){	
			$('.pt_checkout #secondary').insertBefore('.cart-table-header-mobile');
		
		},
		orderSummaryShiftOut: function (){
			$('.pt_checkout #secondary').insertAfter('#primary');
		},
		
		orderSummaryShift: function (){
			if( jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth  ) {	
				app.responsive.orderSummaryShiftIn();
				$('.pt_checkout #secondary').show();
			}
			
			$(window).smartresize(function(){
				if( jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth  ) {	
					app.responsive.orderSummaryShiftIn();
				} else {
					app.responsive.orderSummaryShiftOut();
				}
			});
		}

	},
	
	$(document).ready(function(){
		
		app.responsive.init();
		app.responsive.sticky_menu();
		app.responsive.refinementsSlideMenuLargeView();
		app.responsive.refinementsMenuMobileHide();
		app.responsive.orderSummaryShift();
		
			$(window).smartresize(function(){	
				app.responsive.sticky_menu();
				app.responsive.orderSummaryShift();
				app.responsive.refinementsSlideMenuLargeView();
				CustomSelect.refreshCustomSelects();
				var widthChanged = (jQuery('#wrapper').width() != app.responsive.currentWidth);
				
				if (widthChanged){
					app.responsive.currentWidth = jQuery('#wrapper').width();
					if(app.responsive.currentWidth <= app.responsive.tabletLayotWidth) {					
						app.responsive.enableMobileNav();
						app.responsive.rebuildHomepageSlides();
						app.responsive.updateBodyClassOnResize();
						app.responsive.refinementsMenuMobileHide();
					} else {					
						app.responsive.disableMobileNav();
						app.responsive.rebuildHomepageSlides();
						app.responsive.refinementsMenuDesktopShow();
						if ($('body').hasClass('showMenu')) {
							app.responsive.hideOffCanvasNav();
						}
					}
				}	
			});

	});
		
}(window.app = window.app || {}, jQuery));



