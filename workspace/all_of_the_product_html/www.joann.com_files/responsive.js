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
		largeLayoutWidth : 769,		
		
		init : function () {

			$cache = {
				logo: $('.primary-logo img'),
				wrapper: $('#wrapper'),
				innerWrapper: $('.inner-wrapper'),
				navigation: $('#navigation'),
				mainHeaderContent: $('#header div.mainHeaderContent'),
				mainContent: $('#primary'),
				homepageSlider: $('#homepage-slider'),
				footer: $('#footer'),
				submenuExpand: $('.toggle-sublevel')
			};

			// toggle menu element
			//Need both click and touch start for ipad issues.  If we combine them it breaks the mobile event.  See line 88
			$cache.navigation.on('click', '.mobileNav:not(.no-sub) a.level-1', function(e){					
				e.preventDefault();
				
				var $this = $(this);				
				
				$this = $this.parent();//reset THIS
				
				var width = screen.width,
					pos = $this.position();
				
				$this.removeClass('activeTopLevel');
				//Active category, hide menu
				if($this.hasClass('shopActive')){
					$this.removeClass('shopActive').find('.level2Wrapper').hide();
				}else{//Show menu
					$this.siblings('.shopActive').removeClass('shopActive').find('> .level2Wrapper').toggle().end().end().addClass('shopActive');
					$this.find('.menu-category > li.level-2').width(width);
					$cache.navigation.find('.level2Wrapper').hide()
					$this.find('.level2Wrapper').css('left', -pos.left).toggle();
				}				

			});
			
			$cache.navigation.on('touchstart', '.mobileNav:not(.no-sub) a.level-1', function(e){				
				e.preventDefault();
				
				var $this = $(this);					
				$this = $this.parent();//reset THIS
				
				var width = screen.width,
					pos = $this.position();
				
				$this.removeClass('activeTopLevel');
				//Active category, hide menu
				if($this.hasClass('shopActive')){
					$this.removeClass('shopActive').find('.level2Wrapper').hide();
				}else{//Show menu
					$this.siblings('.shopActive').removeClass('shopActive').find('> .level2Wrapper').toggle().end().end().addClass('shopActive');
					$this.find('.menu-category > li.level-2').width(width);
					$cache.navigation.find('.level2Wrapper').hide()
					$this.find('.level2Wrapper').css('left', -pos.left).toggle();
				}				

			});
			
			$cache.navigation.on('touchstart', '.toggle-sublevel', function(e){
				e.preventDefault();
				$(this).toggleClass('expanded').parents('li.level-2').find('div.level-3').slideToggle();
			});
			
			// toggle mobile account menu element
			$cache.mainContent.find('.myAccountNav').click(function() {
				$(this).toggleClass('active');
				$cache.mainContent.find('#mobileAccountNavigation').toggle();
				//$('#header').height( $(this).outerHeight() + $('.menu-category').outerHeight() );
			});

			// check onload to see if mobile enabled
			if( $cache.wrapper.width() < this.largeLayoutWidth) {

				app.responsive.enableMobileNav();
				app.responsive.disableTabletNav();
				
				app.responsive.toggleContent.enable( $('.footer-menu-lists-wrapper h6') );
				app.responsive.toggleContent.enable( $('.categories-left-nav-wrapper .catTitle') );
				app.responsive.toggleContent.enable( $('.categories-left-nav-wrapper .featuredItemsTitle') );
				app.responsive.toggleContent.enable( $('.categories-left-nav-wrapper .moreWaysTitle') );
				app.responsive.toggleFeaturedProjects.enable( $('div.project-ideas.featured-projects') );
				app.responsive.toggleEventsLandingNav.enable( $('.refineWrap') );
				
			}else if($cache.wrapper.width() == 1024 && Math.abs(window.orientation) == 90){//If we are portrait on iPad
				app.responsive.enableTabletNav();
				app.responsive.disableMobileNav();
			}

		},
		
		// Events Landing Page - Navigation Containers
		toggleEventsLandingNav : {
			enable : function(trigger) {
				trigger.off('click');
				trigger.on('click', function() {
					var $this = $(this);
					
					if($this != null){
						$this.find('.header.with-stitching').toggleClass('expanded').end().find('.links').toggle();
					}
					
				});
			}
		},
		
		// Featured Projects 
		toggleFeaturedProjects : {
			enable : function(trigger) {
				trigger.off('click');
				trigger.on('click', function() {
					
					$('div.project-ideas.featured-projects').toggleClass('mobile');
					$('div#project-ideas-featured-projects-moblie-content').toggle();
				});
			}
		},
		
		
		// utility functions for show/hide ( add init for: $(".featured-items h5") )
		toggleContent : {
			enable : function(trigger) {
				//console.debug('toggleContent enabled');
				trigger.off('click');
				trigger.on('click', function() {
					$(this).toggleClass('expanded').siblings().toggle();
				});
			},
			disable : function(trigger) {
				//console.debug('toggleContent disabled');
				trigger.off('click');
				trigger.siblings().show();
			}
		},
		
		
		// build vertical, collapsable menu
		enableMobileNav : function() {	
			// header nav menu
			var $firstLevelLinks = $cache.navigation.find('.menu-category').find('a.level-2'),
				$navigation = $('#navigation');

			$navigation.find('li.topLevelClass').addClass('mobileNav').removeClass('tabletNav');
			$navigation.find('.activeTopLevel').removeClass('activeTopLevel');	
			//app.expandHeader.disableTablet();

		},
		
		
		// revert to standard horizontal menu
		disableMobileNav : function() {
			var $navigation = $('#navigation');
			$cache.navigation.find('.level-2').removeAttr('style');					

			$navigation.find('li.topLevelClass').removeClass('mobileNav');
		},
		
		// build vertical, collapsable menu for tablet
		enableTabletNav : function() {	
			// header nav menu
			var $firstLevelLinks = $cache.navigation.find('.menu-category').find('a.level-2'),
				$navigation = $('#navigation');

			$navigation.find('li.topLevelClass').removeClass('mobileNav').addClass('tabletNav');
			$navigation.find('.activeTopLevel').removeClass('activeTopLevel');				
			//app.expandHeader.enableTablet();
			

		},
		
		
		// revert to standard horizontal menu
		disableTabletNav : function() {
			var $navigation = $('#navigation');
			$cache.navigation.find('.level-2').removeAttr('style');					

			$navigation.find('li.topLevelClass').removeClass('tabletNav');
			//app.expandHeader.disableTablet();
		},
		
		
		// mobile logo replacement
		mobileLogo : {
			enable : function(selector, smallSrc) {
				$(selector).attr('src', smallSrc);
			},
			disable : function(selector, standardSrc) {
				$(selector).attr('src', standardSrc);
			}
		},
		
		
		// carousel touch controls
		touchwipe: {
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
				    preventDefaultEvents: false
				});
			},
			disable : function() {
				$('.wipe-tip').remove();
			}
		},
		
		// weekly ad slot moves to the top navigation bar
		weeklyAdSlot: {
			addToMenu: function() {
				$('li.weekly-add').hide();
				if($('.weekly-ad-copy').length > 0) {
					return;
				} else {
					// TODO: create custom attribute that holds the value of the HREF attribute
					var menuLink = $('<li class="weekly-ad-copy"><a href="">Weekly Ad</a></li>');
					$('.menu-utility').prepend(menuLink);
				}
			},
			removeFromMenu: function() {
				$('li.weekly-add').show();
				$('.menu-utility .weekly-ad-copy').remove();
			}
		}, 
	
		// pull the slideshow into a variable to re-use
		rebuildHomepageSlides: function() {
			if($cache.homepageSlider.length > 0){
				var homeCarousel = 	$cache.homepageSlider.data('jcarousel');
				homeCarousel.stopAuto();
				homeCarousel.scroll(1);
				$cache.homepageSlider.find('.slide').width( $cache.wrapper.width());
				//$cache.homepageSlider.height( $cache.homepageSlider.find('.slide').first().outerHeight() );
				$cache.homepageSlider.find('#homepage-slides').css( {'left':'0','width': ($cache.wrapper.width() * $cache.homepageSlider.find('#homepage-slides li').size()) });
				homeCarousel.reload();
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
		},
		
		dropdownStateCheck : function() {
			
			$('#productTabs .mobile-tab').each(function () {
				$(this).removeClass('inactive');
				if ($(this).siblings('.tab-content:hidden').length) {
					$(this).addClass('inactive');
		        }
		    });
			
			
			//$("#productTabs").find('.ui-tabs-hide').siblings('.mobile-tab').addClass('inactive');
		}
		
	}
	
	
	$(document).ready(function(){
		
		app.responsive.init();
		
		

		// set up listener so we can update DOM if page grows/shrinks, only on bigger platforms
		//if(screen.width > 767){
			
		$(window).smartresize(function() {
	
			if( $('#wrapper').width() < app.responsive.largeLayoutWidth ) { // less than 768px (mobileLayoutWidth, largeLayoutWidth)
				
				app.responsive.disableTabletNav();
				app.responsive.enableMobileNav(); 
				app.responsive.toggleContent.enable( $('.footer-menu-lists-wrapper h6') );
				
			}
			else if($('#wrapper').width() == 1024 && Math.abs(window.orientation) == 90 ){
				app.responsive.disableMobileNav();
				app.responsive.enableTabletNav(); 
			}
			else {
				
				app.expandHeader.enable();
				app.responsive.toggleContent.disable( $('.footer-menu-lists-wrapper h6') );
				app.responsive.disableMobileNav();
				app.responsive.disableTabletNav();
				
			}
		
		});
			
		$("#productTabs").find('.mobile-tab').click(function(e) {
			e.preventDefault();
			var $this = $(this);
			
			$this.siblings('.tab-content').toggleClass('ui-tabs-hide'); 
			app.responsive.dropdownStateCheck();
			
			if($this.attr('id') == 'mobileVideoTab' && !$this.siblings('.tab-content').hasClass('ui-tabs-hide')){
				app.product.loadMobileVideo();
			}
			
		});
		setTimeout('app.responsive.dropdownStateCheck()', 500);
			
	});
		
}(window.app = window.app || {}, jQuery));



