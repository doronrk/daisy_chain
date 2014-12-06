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
	
		mobileLayoutWidth : 765,
		
		init : function () {

			$cache = {
					wrapper: $('#wrapper'),
					navigation: $('#navigation-mobile'),
					homepageSlider: $('#homepage-slider')
				};

			// toggle menu element
			$cache.wrapper.find('.navigation-header').click(function(){
				if($cache.navigation.find('.menu-category').css('display') == 'none' ){
					$cache.navigation.find('.menu-category').slideDown();
					$cache.navigation.find('h1').css('background-position', '100% -255px');
				} else {
					$cache.navigation.find('.menu-category').slideUp();
					$cache.navigation.find('h1').css('background-position', '100% -227px');
				}
			});
			
			$cache.wrapper.find('.mobile-shopnav').click(function(){
				if($cache.navigation.find('.menu-category').css('display') == 'none' ){
					$cache.navigation.find('.menu-category').slideDown();
					$cache.navigation.find('h1').css('background-position', '100% -255px');
					$('html,body').animate({scrollTop: $(".navigation-header").offset().top});
				} else {
					$cache.navigation.find('.menu-category').slideUp();
					$cache.navigation.find('h1').css('background-position', '100% -227px');
				}
			});

			// check onload to see if mobile enabled
			if( $cache.wrapper.width() <= this.mobileLayoutWidth ) {
				//app.responsive.enableMobileNav();
			}
			
			$('.footer-contact-container-inner > div').click(function () {
				var $div = $(this).parent().find('ul.footer-inner');
				$('ul.footer-inner').not($div).slideUp();
				$('.footer-contact-container-inner div span').html( '+' );
				if( !$div.is( ':visible' ) ) {
					$(this).find('span').html( '&ndash;');					
				}
				$div.slideToggle(700);				
			});
			
			$('#tabs-menumobile ul.tabs-menumobile > li > a').click(function () {
				var $div = $(this).parent().find('div.tab-content');
				$('div.tab-content').not($div).slideUp();
				$('.tabs-menumobile li a span').html( '+' );
				$('.tabs-menumobile li a').addClass('collpase').removeClass('expanded');
				if( !$div.is( ':visible' ) ) {
					$(this).find('span').html( '&ndash;');
					$(this).addClass('expanded').removeClass('collpase');
				}
				$div.slideToggle(700);				
			});
			
			$('.footer-fda').click(function () {
				if($('.footer-fda-block').css('display') == 'none' ){
					$('.footer-fda-block').slideDown();	
					$(this).find('span').html('-');
				} else {
					$('.footer-fda-block').slideUp();
					$(this).find('span').html('+');
				}
			});

			
		},
		
		// build vertical, collapsable menu
		enableMobileNav : function(){
			$cache.navigation.find('.menu-category')
				.hide()
				.children('li')
					.children('a')
						.on('touchstart','click',function(){
							if( (jQuery(this).siblings().length > 0 ) && (!jQuery(this).siblings().is(":visible"))) {
								jQuery(this)
									.append('<span>close</span>')
									.children('span')
										.on('touchstart','click',function(){
											jQuery(this).parent().siblings().hide();
											jQuery(this).remove();
											return false;
										})
									.parent().siblings().show();
								return false;
							} 
						})
						
						/*$('#navigation-mobile ul.menu-category > li > a').click(function () {
							var $div = $(this).parent().find('div.level-2');
							$('div.level-2').not($div).hide();
							$('.menu-category li a span').html( '+' );
							if( !$div.is( ':visible' ) ) {
								$(this).find('span').html( '&ndash;');					
							}
							$div.slideToggle(700);				
						});*/
		},
		
		// revert to standard horizontal menu
		disableMobileNav : function(){
			$cache.navigation.find('.menu-category').show();
			$cache.navigation.find('.level-2').removeAttr('style');
			$cache.navigation.find('.level-1 span').remove();
		},
		
		// pull the slideshow into a variable to re-use
		rebuildHomepageSlides: function() {
			
			if($cache.homepageSlider.length > 0){
				
			
				var homeCarousel = 	$cache.homepageSlider			
				//homeCarousel.stopAuto();
				//homeCarousel.scroll(1);
				$cache.homepageSlider.find('.slide').width( $cache.wrapper.width());
				$cache.homepageSlider.find('#homepage-slides').css( {'left':'0','width': ($cache.wrapper.width() * $cache.homepageSlider.find('#homepage-slides li').size()) });
				//homeCarousel.reload();
			}
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
			
		}

	}
	
	
	
	
	$(document).ready(function(){
		
		app.responsive.init();
		
		// set up listener so we can update DOM if page grows/shrinks, only on bigger platforms
		if(screen.width > 767){
					
			$(window).smartresize(function(){
	
				if( jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth   ) {
					
					//app.responsive.enableMobileNav();
					app.responsive.rebuildHomepageSlides();
				}
				else {
					app.responsive.disableMobileNav();
					app.responsive.rebuildHomepageSlides();
				}
	
			});
		
		}

	});
		
}(window.app = window.app || {}, jQuery));