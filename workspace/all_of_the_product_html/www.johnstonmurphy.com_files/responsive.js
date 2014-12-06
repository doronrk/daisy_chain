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
	
		mobileLayoutWidth : 500,
		
		init : function () {

			$cache = {
					wrapper: $('#main'),
					pagewidth: $('.pagewidth'),
					navigation: $('#navigation'),
					homepageSlider: $('#homepage-slider')
				};

			// toggle menu element
			$cache.navigation.find('.navigation-header')
				.click(function(){
					jQuery(this).siblings('.menu-category').toggle();
				});

			// check onload to see if mobile enabled  
			if( ($cache.wrapper.width() <= this.mobileLayoutWidth) || (($cache.pagewidth.width() <= this.mobileLayoutWidth) && ($cache.pagewidth.width() != null))) {				
				app.responsive.enableMobileNav();
			}
			
		},
		
		// build vertical, collapsable menu
		enableMobileNav : function(){			
			$('.footercopy div').addClass('navdown');
			// move our navigation if we're on the homepage
			if ($('#homepageslidercontainer').length > 0) {
				$('#navigation').remove().insertBefore('#footer');
				$cache.navigation = $('#navigation');
				$cache.navigation.find('.navigation-header').click(function() {
					jQuery(this).siblings('.menu-category').toggle();
				});
			}
			// disable magiczoomplus
			MagicZoomPlus.stop();
			//$('.product-primary-image a').removeClass('MagicZoomPlus');
			$cache.navigation.find('.menu-category')
				.hide()
				.children('li')
					.children('a')
						.click(function(){							
							if( (jQuery(this).siblings().length > 0 ) && (!jQuery(this).siblings().is(":visible"))) {
								jQuery(this)
									.append('<span class="navup"></span>')
									.addClass('hideborder')
									.children('span')
										.click(function(){
											jQuery(this).parent().removeClass('hideborder')
											jQuery(this).parent().siblings().hide();											
											jQuery(this).remove();
											return false;
										})
									.parent().siblings().show();
								return false;
							} 
						});
						
			
			jQuery("ul.level-2 li").each(function(){
				if(jQuery(this).children('div').length) {
					jQuery(this).children('span').click(function(){
						if( (jQuery(this).siblings().length > 0 ) && (!jQuery(this).siblings().is(":visible"))) {
							jQuery(this)
								.append('<span class="close">close</span>')
								.addClass('hideborder')
								.children('span')
									.click(function(){
										jQuery(this).parent().removeClass('hideborder')
										jQuery(this).parent().siblings().hide();											
										jQuery(this).remove();
										return false;
									})
								.parent().siblings().show();
							return false;
						} 
					})
				}
			});
						
			jQuery("ul.level-3 li").each(function(){
				if(jQuery(this).children('div').length) {
					jQuery(this).children('a').click(function(){
						if( (jQuery(this).siblings().length > 0 ) && (!jQuery(this).siblings().is(":visible"))) {
							jQuery(this)
								.append('<span class="close">close</span>')
								.addClass('hideborder')
								.children('span')
									.click(function(){
										jQuery(this).parent().removeClass('hideborder')
										jQuery(this).parent().siblings().hide();											
										jQuery(this).remove();
										return false;
									})
								.parent().siblings().show();
							return false;
						} 
					});
				}
				
			}); 
			
			// this section is because Android and older iPhone don't show category correctly
			jQuery('ul.level-2 li').hover(function() {
				$('ul.level-3', this).show();
				
			}, function() {
				$('ul.level-3', this).hide();
			});	
			jQuery('ul.level-1 > li > a').click(function() {
				return false;
			});
			jQuery('ul.level-2 > li > a').click(function() {
				return false;
			});
			// End Android iPhone fix
			
			jQuery(".footercopy div").each(function(){
				jQuery(this).click(function() {
					jQuery(this).children('a').each(function(i,v) {
						if (jQuery(v).hasClass('mobileHide') == false) {
							jQuery(v).toggle();
						}
					});
				});
			})
			
			jQuery("#phonenumber a").attr("href", jQuery("#mobilephone").attr("href"));
			jQuery("#phonenumber a").html(jQuery("#mobilephone").html());
			if (jQuery(".mini-cart-qty").html() != null) {
				jQuery(".mini-cart-qty").html(jQuery(".mini-cart-qty").html().replace(/[()]/g, ''));
			}
			jQuery('.pt_product-details .breadcrumb li').last().prev().find('.slash').html('');
			jQuery('.add-this-area').remove().insertAfter(jQuery(".product-add-to-cart"));
			// if we have a couponMsg, we need to add some padding.
			if ($('#cart-coupon-msg').html() != null && $('#cart-coupon-msg').html().length > 0) {
				$('#cart-coupon-msg').css('padding-top', '70px');
			}
			jQuery('.requiredinfo').html('* Required');
			// toggle arrows
			jQuery('.navigation-header,a.level-1,ul.level-2 li').click(function() {
				if (jQuery(this).hasClass('navup')) {
					jQuery(this).removeClass('navup').addClass('navdown');
				} else if (jQuery(this).hasClass('navdown')){
					jQuery(this).removeClass('navdown').addClass('navup');
				}
			});
			
			jQuery('#primary .col-1').remove().insertAfter(jQuery("#primary .col-2"));
			
		},
		
		// revert to standard horizontal menu
		disableMobileNav : function(){
			MagicZoomPlus.start();
			if ($('#homepageslidercontainer').length > 0) {
				$('#navigation').remove().insertBefore('#main');
			}
			$cache.navigation = $('#navigation');
			$cache.navigation.find('.navigation-header').click(function() {
				jQuery(this).siblings('.menu-category').toggle();
			});

//			$('.product-primary-image a').addClass('MagicZoomPlus');
			$cache.navigation.find('.menu-category').show();
			$cache.navigation.find('.level-2').removeAttr('style');
			//$cache.navigation.find('.level-1 span').remove();
			jQuery('ul.level-2 li').hover(function() {
				
			}, function() {
				
			});					
		},
		
		/* pull the slideshow into a variable to re-use
		rebuildHomepageSlides: function() {
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
			if(jQuery('.toggle-grid').length == 0 && (jQuery('.pt_order').length == 0) && (jQuery('.pt_content-search-result').length == 0))
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
		
		// set up listener so we can update DOM if page grows/shrinks, only on bigger platforms
		if(screen.width > 767){
			
			$(window).smartresize(function(){
				
				if( (jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth) || ((jQuery('.pagewidth').width() <= app.responsive.mobileLayoutWidth) && (jQuery('.pagewidth').width() != null))) {
					
					//app.responsive.rebuildHomepageSlides();
					MagicZoomPlus.stop();
				}
				else {
					app.responsive.disableMobileNav();
					MagicZoomPlus.refresh();
					//app.responsive.rebuildHomepageSlides();
				}
				
			});
		
		}

	});
		
}(window.app = window.app || {}, jQuery));



