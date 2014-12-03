/*
sub menus need a class of flyout
*/

jQuery.fn.expaNav = function(settings)
{
	settings = jQuery.extend(
		{
			oneBranchOnly : true,
			preserveMinimized : true,
			startMinimized : false,
			initialMenuItemActive : {}
		}, settings
	);
	return this.each(
		function()
		{
			var $this = jQuery(this);
			var hideNavTimer;
			var showNavTimer;
			var hideSubNavTimer;
			var showSubNavTimer;
			init();
			/**
			 * loops through first tier of menu - assumes first tier is the definition of a definition list
			 */
			
			function init(){
				/**
				*  code below commented for WCS-1144.
				*/
					if(navigator.userAgent.indexOf("iPad") == -1){	
					$('.flyout').parent().each(function(){
						new FlyoutTarget($(this));					
					});
					}
					
				
				//add minimize and restore controls to navigation container
				//$this.children('div.nav_main_inner').append('<div class="nav_main_minimize">-</div><div class="nav_main_restore" style="display:none;">+</div>');
				/*
				if( (document.URL.indexOf("MensLandingView")>-1) || ((document.URL.indexOf("-men")>-1) && ($('#backToCoachImg').length)) )
					$this.children('div.nav_main_inner').append('<div class="nav_main_minimize"><img src="/wcsstore/Coach_US/images/branding/left_nav/mensClose.png" alt="close"/></div><div class="nav_main_restore" style="display:none;"><img src="/wcsstore/Coach_US/images/branding/left_nav/mensOpen.png" alt="open"/></div>');
				else
					$this.children('div.nav_main_inner').append('<div class="nav_main_minimize"><img src="/wcsstore/Coach_US/images/branding/left_nav/close.png" alt="close"/></div><div class="nav_main_restore" style="display:none;"><img src="/wcsstore/Coach_US/images/branding/left_nav/open.png" alt="open"/></div>');
				*/
				//set up minimize and restore event handlers
				$this.find('.nav_main_minimize').bind('click', minimize);
				$this.find('.nav_main_restore').bind('click', restore);
				if(settings.startMinimized){minimize();}
				//strip active class and 
				$this.find('.over').removeClass('over');
				$("#supplementary").css("bottom", 0);
				if(typeof document.body.style.maxHeight === "undefined") {DD_belatedPNG.fix('#nav_main ul');}
			};
			
		
			function minimize(){
				if($('#localeInfo').val() != 'en_US'){
			    $this.children('div.nav_main_inner').children('dl').css('display', 'none');
				$this.children('div.nav_main_inner').children('dl').children('dd').css('display', 'none');
				if( (document.URL.indexOf("MensLandingView")>-1) || ((document.URL.indexOf("-men")>-1) && ($('#backToCoachImg').length)) )
					$this.children('div.nav_main_inner').children('ul').children('li').css('display', 'none');
				$this.children('div.nav_main_inner').children('div.nav_main_minimize').css('display', 'none');
				$('div.dotNav, div.dotSectionNav').css('display', 'none');
				$('div.nav_main_inner').children('ul').css('display', 'none');
				$this.children('div.nav_main_inner').children('div.nav_main_restore').css('display', 'block');
				}
			}
			
			function restore(){
			     $this.children('div.nav_main_inner').children('dl').css('display', 'block');
				$this.children('div.nav_main_inner').children('div.nav_main_restore').css('display', 'none');
				if( (document.URL.indexOf("MensLandingView")>-1) || ((document.URL.indexOf("-men")>-1) && ($('#backToCoachImg').length)) )
					$this.children('div.nav_main_inner').children('ul').children('li').css('display', 'block');				
				$this.children('div.nav_main_inner').children('div.nav_main_minimize').css('display', 'block');
				$('div.dotNav , div.dotSectionNav').css('display', 'block');
				$('div.nav_main_inner').children('ul').css('display','block');
				
				$this.children('div.nav_main_inner').children('dl').children('dd').css('display', 'block');
				if($('.menCategories').length)
				    $('.menCategories').hide();
			    if($('.mensFlyout').length)
			        $('.mensFlyout').hide();
			    if($('.holidayCategories').length)
				    $('.holidayCategories').hide();    
				//added to resolve the expanding issue in Safari
				var browserName = navigator.userAgent;
				
				if(browserName.indexOf('Safari')>-1)
				{
					$('div.dotNav, div.dotSectionNav').css('margin-top','3.5px');
					$('li.navFeatures').css('padding-bottom','3px');
					$('div.nav_main_minimize').css('margin-top','6px');
				}
			}
			
			/**
			* code commented out for WCS-1144.
			*/
			function FlyoutTarget(_wrapper){
				var hideNavTimer;
				var showNavTimer;
				var wrapper = _wrapper;
				var flyout = $(wrapper).children('.flyout').eq(0);
				var _parent = $($(flyout).parent().get(0));
				var _id = _parent.attr('id');
					
				
				wrapper.bind('mouseenter',startShowNavTimer);
				wrapper.bind('mouseleave',startHideNavTimer);
				
				function hideNav(){
					if(document.getElementById('searchFilterIframe'))
						document.getElementById('searchFilterIframe').style.display = 'none';
					
					flyout.hide();
				
					if(!(_id == "")){ 
						$("#"+_id+" a:first").each(function(){
							$(this).attr('class','');			  
						});
					}

				}
				
				function showNav(){
					if(document.getElementById('searchFilterIframe'))
						document.getElementById('searchFilterIframe').style.display = 'block';
						
					flyout.show();				

					if(!(_id == "")){ 
						$("#"+_id+" a:first").each(function(){
							$(this).attr('class','over');			  
						});
					}

				}
				
				function startShowNavTimer(){
					clearHideNavTimer();
					showNavTimer = setTimeout(showNav, 400);
				}
				
				function startHideNavTimer(){
					clearShowNavTimer();
					hideNavTimer = setTimeout(hideNav, 400);
				}
				
				function clearHideNavTimer(){
					clearTimeout(hideNavTimer);
				}
				
				function clearShowNavTimer(){
					clearTimeout(showNavTimer);
					//startHideNavTimer();
				}
				
			}
			
		}
	)
};

$().ready(function(){
		if(jQuery.isFunction(jQuery.fn.expaNav)) {
			$('#nav_main').expaNav("true", "true", "true");
		} 
});
