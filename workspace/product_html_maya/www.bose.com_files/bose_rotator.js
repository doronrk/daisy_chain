/***
** title: Rotating Content Area
** author: Dan DeRose
** company: Bose Corporation
** requires: jquery 1.5
** last updated: 5/22/2013 Laura Vecchio
** description: Creates an area of rotating slides. The slides may contain any sort of content. An object literal is passed in containing parameter values.
***/

(function($) {
	// store sitecatalyst page name
	var siteCatalystPageName = s.pageName;
	// plugin methods
	var methods = {
		config : {
			autoPlay : true,
			pagination : true,
			pagination_padding : '0',
			pagination_x : -20,
			pagination_y : -20,
			customPagination : {
				enabled : false,
				path : '/assets/images/bose_rotator/',
				filename : 'standard',
				extension : 'png'
			},
			controls : false,
			controlText : {
				play : 'Play',
				pause : 'Pause',
				next : 'Next',
				previous : 'Previous'
			},
			customControls : false,
			effect : 'fade',
			hoverPause : true,
			transitionSpeed : 500,
			speed : 1000,
			campaignMessaging: false,
			tracking: {
				enabled: false,
				pagename: ''
			}
		},
		
		settings : {
			container: '',
			slides: 0,
			currentSlide : 0,
			previousSlide : 0,
			timer: ''
		},
		
		init : function(settings) {

			// merge default global variables with custom variables, modifying 'config'
			if(settings) $.extend(true, methods.config, settings);
			methods.settings.container = $(this);
			
			// If campaign messaging is activated we need to set the last element to always show and remove it from the slideshow
			if(methods.config.campaignMessaging == true) {
				methods.settings.slides = methods.settings.container.children().size() - 2;
				methods.settings.container.children('div:last-child').show().addClass(methods.settings.container.attr('id') + '_compaign');
			} else { // Otherwise, show all slides as part of the slideshow
				methods.settings.slides = methods.settings.container.children().size() - 1;
			}
			methods.settings.previousSlide = methods.settings.slides; // By default, set the previous slide to be the last slide
			
			// If pause on hover is active, bind mouseenter and mouseleave events
			if(methods.config.hoverPause == true && methods.config.autoPlay == true) {
				methods.settings.container.bind('mouseenter.boseRotator', function() {
					methods.pause();
				});
				methods.settings.container.bind('mouseleave.boseRotator', function() {
					if(methods.settings.slides > 0)
						methods.play();
				});
			}
			
			// Set controls
			if(methods.config.controls == true) {
				methods.setControls();
			}
			
			// Set pagination
			if(methods.config.pagination == true) {
				methods.setPagination();
			}

			// Load the first slide
			// methods.transition();
			if(methods.settings.slides > 0) {
				methods.settings.container.children().eq(0).fadeIn(methods.config.transitionSpeed);
			} else {
				methods.settings.container.children().eq(0).show();
			}
			
			// Check to see if autoplay is set to true and run if it is
			if(methods.config.autoPlay == true && methods.settings.slides > 0) {
				methods.play();  
			}

			// Future enhancement: Pause slider when tab is not active
			/*$([window, document]).blur(function(){
				if(methods.config.autoPlay == true) {
					methods.pause();
					console.log('panel paused');
				};
			}).focus(function(){
			    if(methods.config.autoPlay == true) {
					methods.play();
					console.log('panel played');
				};
			});*/
		},
		
		play : function(index) {

			methods.settings.currentSlide = index || methods.settings.currentSlide;
			if(index && index > 0) {
				methods.settings.previousSlide = index - 1;
			} else {
				methods.settings.previousSlide = methods.settings.slides;
			}

			methods.settings.timer = window.setInterval(function() {
				methods.increment();	
				methods.transition();
			},methods.config.speed);

		},
		
		// This resets the timer, so it will be used for that as well
		pause : function() {
			clearInterval(methods.settings.timer);
		},
		
		transition : function() {

			var oSlidesContainer = methods.settings.container.children();
			
			if(methods.config.effect === 'fade') {
				oSlidesContainer.eq(methods.settings.previousSlide).fadeOut(methods.config.transitionSpeed);
				oSlidesContainer.eq(methods.settings.currentSlide).fadeIn(function() {
					methods.config.transitionSpeed;
				});
			}
			if(methods.config.effect === 'slideDown') {
				oSlidesContainer.eq(methods.settings.previousSlide).show().delay(methods.config.transitionSpeed).hide();
				oSlidesContainer.eq(methods.settings.currentSlide).slideDown(methods.config.transitionSpeed);
			}
			if(methods.config.effect === 'slideUp') {
				oSlidesContainer.eq(methods.settings.previousSlide).slideUp('slow');
				oSlidesContainer.eq(methods.settings.currentSlide).slideUp('slow');
			}
			if(methods.config.effect === 'scrollHorz') {
				//oSlidesContainer.eq(methods.settings.previousSlide).cycle({fx:'scrollLeft'});
				//oSlidesContainer.eq(methods.settings.currentSlide).show().cycle({fx:'scrollLeft'});
			}
			var oPaginationContainer = oSlidesContainer.last().children();

			if(methods.config.customPagination.enabled == true) {
				var currentButton = oPaginationContainer.eq(methods.settings.currentSlide);
				var previousButton = oPaginationContainer.eq(methods.settings.previousSlide);
				currentButton.css('backgroundPosition',-Number(methods.settings.currentSlide)*currentButton.outerWidth(true) + 'px ' + oPaginationContainer.outerHeight() + 'px');
				currentButton.addClass('selectedPanel',300);
				previousButton.removeClass('selectedPanel',300);
				previousButton.css('backgroundPosition',-Number(methods.settings.previousSlide)*currentButton.outerWidth(true) + 'px 0px'); // Must set explicitly for IE7/8
			} else {
				oPaginationContainer.eq(methods.settings.previousSlide).removeClass('boseRotatorPaginationSelected',300);
				oPaginationContainer.eq(methods.settings.currentSlide).addClass('boseRotatorPaginationSelected',300);
			}

		},
		
		increment : function() {

			if(methods.settings.currentSlide < methods.settings.slides) {
				methods.settings.previousSlide = methods.settings.currentSlide;
				methods.settings.currentSlide += 1;
			} else {
				methods.settings.previousSlide = methods.settings.slides;
				methods.settings.currentSlide = 0;
			}
			methods.transition();
		},
		
		decrement: function() {

			var currentSlide = methods.settings.currentSlide;
			if(currentSlide === 0) {
				methods.settings.currentSlide = methods.settings.slides;
				methods.settings.previousSlide = currentSlide;
			} else {
				methods.settings.currentSlide = currentSlide - 1;
				methods.settings.previousSlide = currentSlide;
			}
			methods.transition();
		},
		
		jump : function(index) {

			methods.settings.previousSlide = methods.settings.currentSlide;
			methods.settings.currentSlide = Number(index);
			methods.transition();
		},
		
		setPagination : function() {

			var oPaginationContainer = $('<div id="' + methods.settings.container.attr('id') + '_pagination' + '"></div>').appendTo(methods.settings.container).css('display','block');
			
			if(methods.config.pagination_x >= 0) {
				oPaginationContainer.css('top',methods.config.pagination_x);
			} else {
				oPaginationContainer.css('bottom',Math.abs(methods.config.pagination_x));
			}
			if(methods.config.pagination_y >= 0) {
				oPaginationContainer.css('left',methods.config.pagination_y);
			} else {
				oPaginationContainer.css('right',Math.abs(methods.config.pagination_y));
			}
			
			if(methods.config.customPagination.enabled == true) {
				oPaginationContainer.css('width',Number(Number(methods.settings.slides+1)*oPaginationContainer.outerWidth()));
			}
			var aSlides = methods.settings.container.children();
			aSlides.each(function(index) {
				if(index <= methods.settings.slides) {
					if(methods.config.customPagination.enabled == true) {
						oSlide = $('<a href="javascript:;" id="panel' + Number(index+1) + '"></a>').appendTo(oPaginationContainer).bind('click', function() {
							methods.jump(index);
							methods.transition();

							// SiteCatalyst Custom Link Tracking
							var slide = methods.settings.currentSlide;
							var customLink = s.pageName + ":Panel:" + slide;
							s.tl(true, 'o', customLink);
						});
						if(index === 0) {
							oSlide.css('backgroundPosition','0 ' + oSlide.outerHeight() + 'px');
							oSlide.addClass('selectedPanel',300);
						}
					} else {
						oSlide = $('<a href="javascript:;" class="boseRotatorPagination">' + Number(index+1) + '</a>').appendTo(oPaginationContainer).bind('click', function() {
							methods.jump(index);
							methods.transition();
							
							// SiteCatalyst Custom Link Tracking
							var slide = methods.settings.currentSlide;
							var customLink = s.pageName + ":Panel:" + slide;
							s.tl(true, 'o', customLink);
						});
						if(index === 0) {
							oSlide.addClass('boseRotatorPaginationSelected');
						}
					}
				}
			});
			oPaginationContainer.css('padding',methods.config.pagination_padding);
		},
		
		tracking : function(obj) {

			/* Removed SiteCatalyst tracking for sliders. 
			Note, if future tracking is added, every rotator which uses this JS should be tested. */
		},
		
		setControls : function() {

			var oControlsContainer = $('<div id="' + methods.settings.container.attr('id') + '_controls' + '"></div>').appendTo(methods.settings.container).css('display','block');
			
			if(methods.config.hoverPause != true) {
				$('<a href="javascript:;" title="" class="boseRotatorControls pause">Pause</a>').appendTo(oControlsContainer);
				$(oControlsContainer).delegate('.play', 'click.boseRotator', function() {
					methods.play();
					$(this).removeClass('play').addClass('pause').text('Pause');
				});
				$(oControlsContainer).delegate('.pause', 'click.boseRotator', function() {
					methods.settings.container.unbind('mouseenter.boseRotator mouseleave.boseRotator');
					methods.pause();
					$(this).removeClass('pause').addClass('play').text('Play');
				});
			}
			
			$('<a href="javascript:;" title="" class="boseRotatorControls previous">Previous</a>').appendTo(oControlsContainer).bind('click', function() {
				methods.decrement();
				var slide = methods.settings.previousSlide;
				var customLink = s.pageName + ":Panel:" + slide + ":Left";
				s.tl(true, 'o', customLink);
			});
			$('<a href="javascript:;" title="" class="boseRotatorControls next">Next</a>').appendTo(oControlsContainer).bind('click', function() {
				methods.increment();
				var slide = methods.settings.currentSlide;
				var customLink = s.pageName + ":Panel:" + slide + ":Right";
				s.tl(true, 'o', customLink);
			});
		}
	};
  
	$.fn.boseRotator = function(method) {
		 // Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.boseRotator');
		}    
	};

})(jQuery);




