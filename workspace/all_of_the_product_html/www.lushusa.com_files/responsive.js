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
	
		mobileLayoutWidth : 480,
		tabletLayoutWidth : 786,
		
		init : function () {

			$cache = {
					wrapper: $('#wrapper'),
					navigation: $('#navigation'),
					homepageSlider: $('#homepage-slider'),
					mobileNav:  $('div#mobileNav'),
					headerSearch:  $('div#header-search')
					
				};

			// toggle menu element
			$cache.navigation.find('.navigation-header')
				.click(function(){
					jQuery(this).siblings('.menu-category').toggle();
				});

			// check onload to see if mobile enabled

			

			
		},
		
		// build vertical, collapsable menu
		enableMobileNav : function(){
			
			$cache.navigation.find('.menu-category')
				.hide()
				.children('li')
					.children('a')
						.click(function(){
							if( (jQuery(this).siblings().length > 0 ) && (!jQuery(this).siblings().is(":visible"))) {
								jQuery(this)
									.append('<span>close</span>')
									.children('span')
										.click(function(){
											jQuery(this).parent().siblings().hide();
											jQuery(this).remove();
											return false;
										})
									.parent().siblings().show();
								return false;
							} 
						})
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
				homeCarousel.stopAuto();
				homeCarousel.scroll(1);
				$cache.homepageSlider.find('.slide').width( $cache.wrapper.width());
				$cache.homepageSlider.find('#homepage-slides').css( {'left':'0','width': ($cache.wrapper.width() * $cache.homepageSlider.find('#homepage-slides li').size()) });
				homeCarousel.reload();
			}
		},
		
		toggleGridWideTileView : function(){
			
			/*	toggle grid/wide tile	*/
			if(jQuery('.toggle-grid').length == 0)
			{
				var $tDiv = jQuery(document.createElement('div'));
				$tDiv.addClass('display-view');
				$tDiv.append('<span>' + app.resources.DISPLAY_VIEW + ':</span> <a class="toggle-grid one" href="'+location.href+'"></a><a class="toggle-grid two" href="'+location.href+'"></a><a class="toggle-grid three" href="'+location.href+'"></a>');
				jQuery('.search-result-options').append($tDiv);
				jQuery('.toggle-grid').click(function(){
					var $c = jQuery('.search-result-content');
					$c.removeClass('one two three');
					if(jQuery(this).hasClass('one')){
						$c.addClass('one');
						jQuery('.toggle-grid').removeClass('active');
						jQuery('.toggle-grid.one').addClass('active');
					} else if(jQuery(this).hasClass('two')){
						$c.addClass('two');
						jQuery('.toggle-grid').removeClass('active');
						jQuery('.toggle-grid.two').addClass('active');
					} else if(jQuery(this).hasClass('three')){
						$c.addClass('three');
						jQuery('.toggle-grid').removeClass('active');
						jQuery('.toggle-grid.three').addClass('active');
					}
					return false;
				});
				// check onload to see if mobile enabled
				if( $cache.wrapper.width() <= this.mobileLayoutWidth ) {
					jQuery('.toggle-grid.one').trigger('click');
				} else if( $cache.wrapper.width() <= this.tabletLayoutWidth ) {
					jQuery('.toggle-grid.two').trigger('click');
				} else {
					jQuery('.toggle-grid.three').trigger('click');
				}
			}
			 
		},
		showMobileNav : function(){
	     
			if(jQuery('.mobileNavMenu').length == 0)
			{
			$cache.mobileNav.show();	
			}
		    
		},
		hideMobileNav : function(){
			if(jQuery('.mobileNavMenu').length > 0)
			{
			$cache.mobileNav.hide();	
			}
		    
		},
		summarySections : function(bool){
			// hide all summary sections
			$('#section-summary .section-header').each(function(){
				var $showDiv = $(this).next();
				$showDiv.toggle(bool);
				LUSH.expandClass(!bool,$(this));
			});
		}
	}
	
	
	
	
	$(document).ready(function(){
		
		app.responsive.init();
		
	

	});
	

		
		$(window).smartresize(function(){

			
			
		if(jQuery('.search-result-content').length > 0){
				
			var cwrapper = $('#wrapper');
			if( cwrapper.width() <= 580 ) {
				//app.responsive.enableMobileNav();
		    	//app.responsive.rebuildHomepageSlides();
				if(jQuery('.toggle-grid').length > 0)
				{
				jQuery('.toggle-grid.one').trigger('click');
				jQuery('.toggle-grid').removeClass('active');
				jQuery('.toggle-grid.one').addClass('active');
				}
				
			} else {
				if( cwrapper.width() <= 920 ) {
					// reset grid display
					if(jQuery('.toggle-grid').length > 0)
					{jQuery('.toggle-grid.two').trigger('click');
					jQuery('.toggle-grid').removeClass('active');
					jQuery('.toggle-grid.two').addClass('active');
					}
					/* Toggle mobile nav 
					app.responsive.showMobileNav();
					*/ 
				}else if(cwrapper.width() >= 920){	
					if(jQuery('.toggle-grid').length > 0)
					{
					jQuery('.toggle-grid.three').trigger('click');
					jQuery('.toggle-grid').removeClass('active');
					jQuery('.toggle-grid.three').addClass('active');
					}
	
				}
				//app.responsive.disableMobileNav();
				
		    	}				
	     }

			 
					
			/*Dialog Recenter
			$(".ui-dialog-content").dialog("option","position","center");	
			*/
			
			if($('#wrapper').width() < app.responsive.tabletLayoutWidth){
				/*Mobile Nav */
				if($('nav.mm-menu').length < 1 ){
					jQuery('nav#menu').mmenu();
				}else{
				  
				}  
				
				
				//app.responsive.rebuildHomepageSlides();			
				app.responsive.summarySections(true);
				
			}
		
			
		
		});
	

	
	
	
		
}(window.app = window.app || {}, jQuery));



