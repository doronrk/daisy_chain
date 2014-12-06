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
			
		mobileLayoutWidth : 740,
		
		init : function () {

			$cache = {
					wrapper: $('#wrapper'),
					header: $('#header'),
					navigation: $('#navigation-mobile'),
					homepageSlider: $('#homepage-slider')
				};
						

			// toggle menu element
			$cache.header.find('.navigation-header').click(function(){
				
				if($('#sitesearchcontainer').css('display') == 'block'){
					$('#sitesearchcontainer').hide();
					$('.header-search-icon').find('span').css('background-position', '1px -330px');
				}
								
				if($('#wrapper').width() <= 740 ) {			    	 
		    		  $('#header').css({"position": "","top": ""});
		    		  $('html, body').animate({scrollTop:0}, 'slow');
			      }
				
				if($('#navigation-mobile ul.menu-category').css('display') == 'block'){
					$('.header-menu').find('span').css('background-position', '-5px -67px');
					if($cache.navigation.hasClass('applyPadding'))
						$cache.navigation.removeClass('applyPadding');
				} else {
					$('.header-menu').find('span').css('background-position', '-93px -65px');
				}
				
				$cache.wrapper.find('#navigation-mobile ul.menu-category').slideToggle(700);				
				$('#navigation-mobile ul.menu-category li div.level-2').hide();				
				
			
			});

			// check onload to see if mobile enabled
			if( $cache.header.width() <= this.mobileLayoutWidth ) {
				app.responsive.enableMobileNav();					
			} 
			
		},
		
		// build vertical, collapsable menu
		enableMobileNav : function(){			
			
			$('#navigation-mobile ul.menu-category > li > a').click(function () {
				var $div = $(this).parent().find('div.level-2');
				$('div.level-2').not($div).hide();
				$('.menu-category li a span').html( '+' );
				if( !$div.is( ':visible' ) ) {
					$(this).find('span').html( '&ndash;');					
				}
				$div.slideToggle(700);				
			});
			
			$('.menu-category-mobile .rewards-drop a, .menu-category-mobile .assistance-drop a').removeClass('goldButton');
						
			$('.menu-category-mobile .rewards-drop a, .menu-category-mobile a').removeClass('view-all');
						
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
				var homeCarousel = 	$cache.homepageSlider.data('jcarousel');
				if(homeCarousel){
					homeCarousel.stopAuto();
					homeCarousel.scroll(1);
					$cache.homepageSlider.find('.slide').width( $cache.wrapper.width());
					$cache.homepageSlider.find('#homepage-slides').css( {'left':'0','width': ($cache.wrapper.width() * $cache.homepageSlider.find('#homepage-slides li').size()) });
					homeCarousel.reload();
				}
				
			}
		},
		
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
		
		// set up listener so we can update DOM if page grows/shrinks, only on bigger platforms
		if($(window).width() > 767){
						
			$(window).smartresize(function(){				

				if( jQuery('#wrapper').width() <= app.responsive.mobileLayoutWidth   ) {
					app.responsive.enableMobileNav();
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