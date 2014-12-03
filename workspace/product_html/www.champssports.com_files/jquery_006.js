/*
 * Contains flyin plugin
 */
(function($) { // Hide scope, no $ conflict
	var vars = {
		structure : new Object(),
		TOUCH_DEVICE : (typeof document.ontouchstart != "undefined") ? true : false,
		initialStartX : 0,
		initialPos : 0,
		touchX : 0,
		xChange : 0,
		swiping : false,
		dir : 'left',
		history : [],
		flyinScroll : null
	};
	var settings = {
		site : 'eastbay',
		initial_width : '400px',
		keepTab : false,
		niceScroll : true,
		scrollSettings : {'cursorwidth':'17px'},
		openTab : true,
		swipeToClose : false,
		position : 0,
		onOpen : function() {},
		callback : function(){},
		clear : false,
		sensitivity: 30,
        title : ''
	};
	var methods = {
		init : function(options) {
			
			if(typeof(jqueryFlyinSettings) !== 'undefined'){
				try {
					settings = $.extend(settings, jqueryFlyinSettings);	
				} catch(err){}
			}
			
			settings = $.extend(settings, options);
			
			//initial setup
		    return this.each(function() {
				var $element;				
				vars.xChange = 0;
				if($('#flyin_container').attr('data-open') != 'true') {
					methods.createQV();
				}
				if(vars.TOUCH_DEVICE && settings.swipeToClose) {
					$('#flyin_container').off("touchstart");
					$('#flyin_container').on("touchstart", function(event) {
						console.log('touchstart');
						var touchStart = event.originalEvent.touches[0];
						vars.swiping = false;
						vars.initialStartX = touchStart.clientX;
						vars.touchX = vars.initialStartX;
						vars.initialPos = parseInt($(this).css("right"));
						
						$('#flyin_container').off("touchmove");
						$('#flyin_container').on("touchmove", function(event) {
							var touch = event.originalEvent.touches[0];
							
							
							if(vars.touchX <= touch.clientX) {
								vars.dir = 'right';	
							} else {
								vars.dir = 'left';
							}
							
							vars.touchX = touch.clientX;
							console.log(vars.xChange + ' : ' + vars.dir);
							vars.xChange = parseInt(vars.initialStartX - vars.touchX);
							if(vars.xChange < 0) {
								event.preventDefault();
								$(this).css("right",  vars.xChange - vars.initialPos);
								$(this).on("click", function() {
									return false;
								});
								vars.swiping = true;
							} else {
								$(this).css("right", 0);
							}
							vars.swiping = false;
						});
						$('#flyin_container').off("touchend");
						$('#flyin_container').on("touchend", function(event) {
							$('#flyin_container').off("touchmove touchend");
														
							if(vars.xChange < -settings.sensitivity && vars.dir == 'right') {
								methods.closeQV($('#flyin_container'))								
							} else {
								$('#flyin_container').animate({'right':'0'}, 400);
							}
							$(this).off("click");
							vars.swiping = false;
						});
					});
				}
				if(settings.clear) {
					methods.clear();
				}
				methods.addTab($(this));
				
				/*$('#flyin_container .qv_close').css({
					'position': 'absolute',
					'top': '20px',
					'right': '20px'
				});
				$('#flyin_container .qv_close a').css({
					'width': '50px',
					'height': '50px',
					'line-height' : '50px',
					'display': 'inline-block',
					'background': '#848484',
					'color': '#FFF',
					'font-weight': 'bold',
					'font-size': '24px',
					'text-align': 'center',
					'text-decoration': 'none'
				});*/
				$('.flyin_header .qv_close a').off('click');
				$('.flyin_header .qv_close a').on('click', function(){methods.closeQV($('#flyin_container'))});
				
				$(window).on('unload', function(){
					methods.closeQV($('#flyin_container'));					
				});
				/*window.onbeforeunload = function(e){
					methods.closeQV($('#flyin_container'));
				}*/
				
				//methods.openQV();	
				
			});
			
		},
		createQV : function() {
			if($('#flyin_container').length == 0) {
				$('body').append('<div id="flyin_container"><div class="flyin_content"></div></div>');
				$('#flyin_container .flyin_content').html('<div class="flyin_header"><div class="qv_close"><a href="javascript:void(0);" data-btnname="flyin_close" title="Close"><span></span></a></div></div><div class="qv_scroll"><div class="tab_container" id="flyin_tabs"></div><div id="qv_content"></div></div>');
				$('#flyin_container').css({'right':($('#flyin_container').outerWidth() + 50) * -1});
				$('#flyin_container').css({
					'position' : 'fixed',
					'display' : 'inline-block',
					'-moz-box-sizing' : 'border-box',
					'box-sizing' : 'border-box',
					'top' : '0',
					'background': '#FFF',
					'right': '-'+settings.initial_width,
					'width': settings.initial_width,
					'height': '100%',
					'text-align': 'left',
					'z-index': '999',
				});
				methods.updateHeight();
				$(window).off('resize');
				$(window).on('resize', function() {
					methods.updateHeight();
				});
			}
		},
		updateHeight : function() {
			$('#flyin_container .flyin_content .qv_scroll').css({
				'display' : 'inline-block',
				'height': $(window).outerHeight() - $('#flyin_container .flyin_content .flyin_header').outerHeight()
			});
		},
		openQV: function () {
		    var titleTag = settings.title;
		    if (titleTag == '') {
		        titleTag = 'View Shopping Cart';
		    }
		    $('#flyin_container').show();
		    $('#flyin_container a[data-tab="Cart"]').attr('title', titleTag);
			if($('#flyin_container').attr('data-open') != 'true') {
				$('html').addClass('body_flyout');
				$('html').animate({'right':$('#flyin_container').outerWidth()}, 400, function() {
					$('#flyin_container').attr('data-open','true');	
				});
				$('#flyin_container').stop();
				$('#flyin_container').animate({'right':'0'}, 400, function() {settings.callback();$('#flyin_container').css({'width':'auto'});if(vars.flyinScroll == null){methods.addNiceScroll();} });
			} else {
				settings.callback();
				$('#flyin_container').css({'width':'auto'});
			}
		},
		clear : function() {
			$.each($('#flyin_container #flyin_tabs span.tab:not([data-keeptab="true"])'), function() {
				methods.removeTab($(this).children('a').attr('data-tab'));
			});
		},
		switchTabs : function(elem) {
			$('#flyin_container #flyin_tabs a').removeClass('selected');
			elem.addClass('selected');
			$('#flyin_container #qv_content [data-title]').hide();
			$('#flyin_container #qv_content [data-title="'+elem.attr('data-tab')+'"]').show();
			vars.history.push(elem.attr('data-tab'));
			$(window).resize();
			return false;
		},
		removeTab : function(tabname) {
			if($('#flyin_container #flyin_tabs a[data-tab="'+tabname+'"]').parent('span.tab').attr('data-keeptab') == 'true') {
				$('#flyin_container #qv_content [data-title="'+tabname+'"]').hide();
				$('#flyin_container #flyin_tabs a[data-tab="'+tabname+'"]').parent('span.tab').hide();
			} else {
				$('#flyin_container #qv_content [data-title="'+tabname+'"]').remove();
				$('#flyin_container #flyin_tabs a[data-tab="'+tabname+'"]').parent('span.tab').remove();
			}
			if($('#flyin_container #flyin_tabs span.tab:not([data-keeptab="true"])').length == 0) {
				methods.closeQV();
			} else {
				if(vars.history[vars.history.length - 1] != tabname) {
					methods.switchTabs($('#flyin_container #flyin_tabs a[data-tab="'+vars.history[vars.history.length - 1]+'"]'));
				} else {
					methods.switchTabs($('#flyin_container #flyin_tabs a[data-tab="'+vars.history[vars.history.length - 2]+'"]'));
					vars.history.splice(vars.history[vars.history.length - 2], 1);
				}
			}
		},
		addTab : function(elem) {
			if(!elem) {
				var elem = $(this);	
			}
			var title = '';
			var titleTag = settings.title;
			var display = '';
			
			if(typeof(elem.attr('data-title')) !== 'undefined') {
				title = elem.attr('data-title');	
				display = elem.attr('data-title');
			}
			if($('[data-tab="'+title+'"]').length == 0 || title == '') {
				elem.appendTo('#flyin_container #qv_content').wrap($('</div>',{'id':title}));
				elem.hide();
				if (titleTag == '') {
				    titleTag = title;
				}
				if(parseInt(settings.position) == 0 || parseInt(settings.position) > $('#flyin_container #flyin_tabs a').length) {
				    $('#flyin_container #flyin_tabs').append('<span class="tab" data-keeptab="' + settings.keepTab + '" data-tabindex="' + ($('#flyin_container #flyin_tabs .tab').length + 1) + '"><a href="' + title + '" data-tab="' + title + '" title="' + titleTag + '">' + display + '</a></span>');
				} else {
				    $('#flyin_container #flyin_tabs .tab:nth-child(' + parseInt(settings.position) + ')').before('<span class="tab"><a href="' + title + '" data-tab="' + title + '" title="' + titleTag + '">' + display + '</a></span>');
				}
				
				
			} else {
				$('#'+title).html($('#'+title).html());
			}
			var tabCallback = settings.onOpen;
			settings.onOpen = function(){};
			$('#flyin_container #flyin_tabs a[data-tab="'+title+'"]').off('click');
			$('#flyin_container #flyin_tabs a[data-tab="'+title+'"]').on('click', function() {
				methods.switchTabs($(this));
				tabCallback();
				return false;
			});
			
			settings.position = 0;
			
			methods.createQV();
			methods.openQV();
			if(settings.openTab) {
				$('#flyin_container #flyin_tabs a[data-tab="'+title+'"]').click();
			}
			
			/*$('#qv_content').css({
				'overflow-y': 'scroll',
				'bottom': '0',
				'height' : 'calc(100% - '+ ($(".tab_container").outerHeight() + $(".tab_container").position().top) + 'px)'
			});*/
			settings.keepTab = false;
			settings.openTab = true;
			settings.clear = false;
			
		},
		addNiceScroll : function() {
			if(settings.niceScroll) {
				try{
					$('#flyin_container').off('mouseover touchstart');
					vars.flyinScroll = $('#flyin_container .flyin_content .qv_scroll').niceScroll(settings.scrollSettings);
					$('#flyin_container').on('mouseover touchstart', function() {
						$('#flyin_container .flyin_content .qv_scroll').getNiceScroll().resize();
					});
					$(window).on('resize', function() {
						$('#flyin_container .flyin_content .qv_scroll').getNiceScroll().resize();
					});
				} catch(err){}
			}
		},
		closeQV : function(element) {
			$('html').removeClass('body_flyout');
			$('html').animate({'right':'0'}, 400);
			$('#flyin_container').stop();
			$('#flyin_container').animate({'right':$('#flyin_container').outerWidth() * -1}, 400, function(){
				methods.clear();
				$('#flyin_container').attr('data-open', 'false');
				$('#flyin_container').hide();
				$('#flyin_container .flyin_content .qv_scroll').getNiceScroll().resize();
			});
		}
	};
	
	$.flyin = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.flyin' );
	    } 
	};
	
	$.fn.flyin = function(method) {
		// Method calling logic
	    if ( methods[method] ) {
	    	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.flyin' );
	    } 
	};

})(jQuery);
/* END quickview */
