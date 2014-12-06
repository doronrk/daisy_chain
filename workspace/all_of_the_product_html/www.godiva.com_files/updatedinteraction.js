var godiva = godiva || {};

(function ($, window, document, undefined) {
	
	godiva.colExpand = (function () {
        function _colExpand() {
        	
        	//openPromoFlag = false;	
			var headerHeight = $('.top-menu>li').height();			
			$('.show-promo').on('click',function(){
				if($(this).parent().find('.show-promo-content').css('display') == 'block'){
					$('.top-menu>li').removeAttr("style");
					$(this).parent().find('.show-promo-content').slideUp(700);
					$(this).find('span').text('View Details').css('color', '#ffffff');
					$(this).find('a').removeClass('top-hidedetails').addClass('top-viewdetails');
					$('.top-menu').addClass('top-menu-padd').removeClass('top-menu-paddbot');
					if($('#wrapper').width() <= 740 ) {
						$('.mini-cart').animate({paddingTop:'-=76px'});
						$('.mini-cart-content').css('top', '37px');
						$('#main').css('paddingTop','80px');
						$('#header').css('position','fixed');
					} else {
						$('#main').css('paddingTop',$('#header').height()-$('.show-promo-content').height());
						$('#header').css('position','fixed');
					}
					openPromoFlag  = true;				
					
				}else{						
					$(this).parent().find('.show-promo-content').slideDown(700);
					$(this).find('span').text('Hide Details').css('color', '#472d27');
					$(this).find('a').removeClass('top-viewdetails').addClass('top-hidedetails');						
					$('.top-menu').addClass('top-menu-paddbot').removeClass('top-menu-padd');
					$('.top-menu>li').css("height","20px");
					if($('#wrapper').width() <= 740 ) {
						$('.mini-cart').animate({paddingTop:'+=76px'});
						$('.mini-cart-content').css('top', '113px');
						$('#main').css('paddingTop','80px');
						$('#header').css('position','fixed');
					} else {
						$('#main').css('paddingTop','0px');
						$('#header').css('position','relative');
					}
					openPromoFlag  = false;
					setTimeout('godiva.colExpand.promoClose()', 15000);

				}
			});	
        	
        	
			this.init = function() {			
				
				//code for handling filters in reload of page through pagination
				if($('#wrapper').width() <= 740 ) {
					
					if($(".mobilefilters").val()!="true"){	
						$(".refinements").hide();
					}else
						{
							$(".refinements").show();
						}
				}
				else if ($('#wrapper').width() <= 959 ) {
					if($(".tabfilters").val()!="true"){	
						$(".refinements").hide();
					}
					else
					{
						$(".refinements").show();
					}
				}
				 else {
					 if($(".desktopfilters").val()!="true"){	
							$(".refinements").hide();
						}
					 else
						{
							$(".refinements").show();
						}
				 }
				
				if($('#wrapper').width() <= 757 ) {		
					
					$('.column li p').click(function () {
						var $ul = $(this).parent().find('ul');
						$('.section').not($ul).hide();
						$('.column li p span').html( '+' );
						if( !$ul.is( ':visible' ) ) {
							$(this).find('span').html( '&ndash;');
						}
						$ul.slideToggle(700);
					});
					
					$('#wrapper').find('.refinement-content').hide();
					$('#wrapper').find('.refinement-header .expand-icon').text('+');
					
					$('.refinement-header').on('click',function(){
						if($(this).next('.refinement-content').css('display') == 'none'){
							$(this).next('.refinement-content').slideDown(700);
							$(this).find('.expand-icon').text('\u2013');
						}else{
							$(this).next('.refinement-content').slideUp(700);
							$(this).find('.expand-icon').text('+');
						}
					});
					
					$('#wrapper').find('.refinement ul').hide();
					$('#wrapper').find('.refinement h3 span').text('+');
					
					$('.refinement').on('click','h3',function(){
						if($(this).parent().find('ul').css('display') == 'none'){
							$(this).parent().find('ul').slideDown(700);
							$(this).find('span').text('\u2013');
						}else{
							$(this).parent().find('ul').slideUp(700);
							$(this).find('span').text('+');
						}
					});
				}
				else {
					$('.refinement-header').on('click',function(){
						if($(this).next('.refinement-content').css('display') == 'none'){
							$(this).next('.refinement-content').slideDown(700);
							$(this).find('.expand-icon').text('\u2013');
						}else{
							$(this).next('.refinement-content').slideUp(700);
							$(this).find('.expand-icon').text('+');
						}
					});					
					
				}							
						
				
				if($('body').width()<767){
				$('.header-search-icon').on('touchstart click',function(){
					
					if($('#wrapper').width() <= 740 ) {
						$('.menu-category').hide();
					}
				    
					$('#header-main-mobile a.navigation-header').find('span').attr('style','background-position:-5px -67px !important;');
					if($(this).parents().find('#sitesearchcontainer').css('display') == 'none'){
						$(this).parents().find('#sitesearchcontainer').show().find('.simplesearchinput').focus();
						$(this).find('span').css('background-position', '-148px -65px');
						if( /MSIE/i.test(navigator.userAgent) ) {
							setTimeout(function(){
								$('.simplesearchinput').focus();
							},200);
						}
						
					}else{
						$(this).parents().find('#sitesearchcontainer').hide();
						$(this).find('span').css('background-position', '-53px -65px');
					}
				});
				
				$('.sitesearch-close').on('click',function(){
					$(this).parents().find('#sitesearchcontainer').hide();
					$('.header-search-icon').find('span').css('background-position', '1px -330px');
				});
				
				}
							
				
				$('.top-hidedetails').on('click',function(){
					$(this).parents().find('.show-promo-content').slideUp(700);
					$('.show-promo').find('a').removeClass('top-hidedetails').addClass('top-viewdetails');
					$('.mini-cart').animate({paddingTop:'-=76px'});
					$('.mini-cart-content').css('top', '37px');	
				});	
				
				$('.header-pos').hover(				
					function () {
						$(this).find('span').css('background-position', '-172px -66px');								
					},						
					function () {
						$(this).find('span').css('background-position', '-73px -67px');
					}				
				);
				
				/*$('.header-menu').hover(				
					function () {
						$(this).find('span').css('background-position', '-94px -65px');								
					},						
					function () {
						$(this).find('span').css('background-position', '-5px -67px');
					}				
				);	*/			
				
				$("#quickview-look-inside-tab").on("click", ".product-flip > .thumb-link", function (e) {
					 
						  e.preventDefault();
						  var $this = $(this);
						  $this.flip({
						    direction: 'lr',
						    color: '#f0f0f0',
						    speed: 200,
						    content: $this.next(".productpiecedescription"),
						    onBefore: function () {
						      $this.removeClass('thumb-link');
						      $this.addClass('productpiecedescriptionback');
						    }
						  });
						  
						 
					});
				
					$( "a.thumb-more-link" ).live( "click", function(e) {
						e.stopPropagation();
						var url=$(this).attr("href");
						window.location.assign(url);
						});
					
				
					$("#quickview-look-inside-tab").on("click", ".productpiecedescriptionback", function (e) {
					  e.preventDefault();
					  var $this = $(this);
					  $this.revertFlip();
					  $this.removeClass('productpiecedescriptionback');
					  $this.addClass('thumb-link');
					  
					});
					
					
					$('.expanderHead').delegate(".expand,.collapse", "click", function (e) {
						 $(this).parent().next().slideToggle();
						 if ($(this).hasClass('expand')){
							 $(this).removeClass('expand').addClass('collapse');
							}
							else {
								$(this).removeClass('collapse').addClass('expand');
							}
						
						      });
					
					$('.clp .banner-content').delegate("h2", "click", function (e) {
						 if($('#wrapper').width() <= 757 ) {
						 $(this).parents('.cat-landing-full-slot').next().find('ul.category-slider1').slideToggle();
						 if ($(this).hasClass('expand')){
							 $(this).removeClass('expand').addClass('collapse');
							}
							else {
								$(this).removeClass('collapse').addClass('expand');
							}
						 }
						
						      });
					
					$('.boutiques > .banner-content').delegate("h2.plus", "click", function (e) {
						 if($('#wrapper').width() <= 757 ) {
						 $(this).parents('.article-content').find('#article-content').slideToggle();
						 if ($(this).hasClass('expand')){
							 $(this).removeClass('expand').addClass('collapse');
							}
							else {
								$(this).removeClass('collapse').addClass('expand');
							}
						 }
						
						      });
					
					$('#article-content').delegate("h2.topline", "click", function (e) {
						 if($('#wrapper').width() <= 757 ) {
						 $(this).next().find('ul').slideToggle();
						 if ($(this).hasClass('expand')){
							 $(this).removeClass('expand').addClass('collapse');
							}
							else {
								$(this).removeClass('collapse').addClass('expand');
							}
						 }
						
						      });
					$('.account').delegate("h2.expandeHead", "click", function (e) {
						 if($('#wrapper').width() <= 757 ) {
						 $(this).next().next().slideToggle();
						 if ($(this).find('span:nth-child(2)').hasClass('expand')){
							 $(this).find('span:nth-child(2)').removeClass('expand').addClass('collapse');
							}
							else {
								$(this).find('span:nth-child(2)').removeClass('collapse').addClass('expand');
							}
						 }
						
						      });
				
			},
			
			this.promoClose = function(){			
				$('.top-menu>li').removeAttr("style");
				$('.show-promo').parent().find('.show-promo-content').slideUp(700);
				$('.show-promo').find('span').text('View Details').css('color', '#ffffff');
				$('.show-promo').find('a').removeClass('top-hidedetails').addClass('top-viewdetails');
				$('.top-menu').addClass('top-menu-padd').removeClass('top-menu-paddbot');
				openPromoFlag = true;	
				if($('#wrapper').width() <= 740 ) {
					$('.mini-cart').css('padding-top', '5px');
					$('.mini-cart-content').css('top', '37px');
				}
			},	
			
			this.promoOpen = function(){			
				
				$('.show-promo').parent().find('.show-promo-content').slideDown(700);
				$('.show-promo').find('span').text('Hide Details').css('color', '#472d27');
				$('.show-promo').find('a').removeClass('top-viewdetails').addClass('top-hidedetails');						
				$('.top-menu').addClass('top-menu-paddbot').removeClass('top-menu-padd');
				openPromoFlag = false;	
				
				$('#header').css('position','relative');
				$('#main').css('paddingTop','0px');
			},	

			this.showHideScrollNext = function() {/*
				if($(window).scrollTop() > 10){
					$defaultShow.addClass('invisible');
					if(sapeLibMod.coreUtils.getViewportSize()[0] <= 699) {
						$nextSection.parents(".section-footer:first").addClass("hidden");
					}
				}refinement-headerrefinement-header

				if($parallaxLayers.eq(parallaxLayersLen-2).is(':in-viewport') === false && $parallaxLayers.eq(parallaxLayersLen-1).is(':in-viewport') === true) {
					$defaultShow.addClass('invisible');
					$nextSection.addClass('scroll-up').removeClass('scroll-down');
				} else if($parallaxLayers.eq(parallaxLayersLen-2).is(':in-viewport') === false && $parallaxLayers.eq(parallaxLayersLen-1).is(':in-viewport') === true) {

				}
			*/};
			
			return this;
		}
		return new _colExpand();
	}());
})(jQuery, this, this.document);

$(document).on('click touchstart', function(event) { 	
	
	//alert($(event.target).parents().index($('#sitesearchcontainer')));
	
	if($('body').width()<676){
	    if($(event.target).parents().index($('#sitesearchcontainer')) == -1) {
	        if($('#sitesearchcontainer').is(":visible")) {
	            $('#sitesearchcontainer').hide()            
	            $('.header-search-icon').find('span').css('background-position', '1px -330px');
	        }
	    }   
	    
	    if($(event.target).parents().index($('.header-search-icon')) == 0) {
	        $('#sitesearchcontainer').show()
	        $('.header-search-icon').find('span').css('background-position', '1px -365px');
	    }   
	}
	else {
		if($(event.target).parents().index($('#sitesearchcontainer')) == -1) {
		    $("#searchinput").blur();			
	    } 
		if($(event.target).parents().index($('#navigation')) == -1){
			$('#navigation').find('div.level-2').hide();
		}
	}
});	

$('.strawberry-outOfStock').ready(function() {

    if($('#strawberryProduct').val() == 'true') {
            $(".product-short-description, a.product-read-more-link").hide();
            $(".product-long-description").show();
            
            $('.a.product-read-less-link').ready(function() {
                    $("a.product-read-less-link").show();
            });     
    }
});


$(document).ready(function(e) {
  	godiva.colExpand.init();  
  	loadHomeCarousel();
  	
  	if($('#wrapper').width() <= 740 ) {
		if($(".mobiledetails").val()=="true"){			
			openPromoFlag = false;
			$('.mini-cart').animate({paddingTop:'+=76px'});
			$('.mini-cart-content').css('top', '113px');
			setTimeout('godiva.colExpand.promoClose()', 15000);			
		} else {
			openPromoFlag = true;	
			$('.mini-cart').animate({paddingTop:'-=76px'});
			$('.mini-cart-content').css('top', '37px');
		}
		
		// code for hiding the refinement section if set to collapse by default
		if($(".mobilefilters").val()!="true"){	
			$(".refinements").hide();
		} else {
			$(".refinements").show();
			$(".refinement-header").next('.refinement-content').slideDown(700);
			$(".refinement-header").find('.expand-icon').text('\u2013');
		}
		
	} else if ($('#wrapper').width() <= 959 ) {
		if($(".tabdetails").val()=="true"){
			openPromoFlag = false;
			setTimeout('godiva.colExpand.promoClose()', 15000);
		} else {
			openPromoFlag = true;	
		}
		
		// code for hiding the refinement section if set to collapse by default
		if($(".tabfilters").val()!="true"){	
			$(".refinements").hide();
		} else {
			$(".refinements").show();
			$(".refinement-header").next('.refinement-content').slideDown(700);
			$(".refinement-header").find('.expand-icon').text('\u2013');
		}
		
	} else {
		if($(".desktopdetails").val()=="true"){
			openPromoFlag = false;
			setTimeout('godiva.colExpand.promoClose()', 15000);
		} else {
			openPromoFlag = true;						
		}
		
		// code for hiding the refinement section if set to collapse by default
		if($(".desktopfilters").val()!="true"){	
			$(".refinements").hide();
		} else {
			$(".refinements").show();
			$(".refinement-header").next('.refinement-content').slideDown(700);
			$(".refinement-header").find('.expand-icon').text('\u2013');
		}		
	}
  	
  	if(!openPromoFlag){					
		godiva.colExpand.promoOpen();
	} else {
		godiva.colExpand.promoClose();
	}
  	
  	/*if ($('#wrapper').width() >= 768 ) {
  		$('#main').css('paddingTop',$('#header').height());
  	}*/
  		
  	var strictNav = function() {
  	    var scrolltop = $(this).scrollTop();	
  	    godiva.colExpand.promoClose();	 
  	    var touchDevice = false;
  	  if(("ontouchstart" in document.documentElement) && ($(document.activeElement).hasClass('input-text')) && (navigator.userAgent.match(/(iPhone|iPod|iPad)/))){
  		touchDevice = true;
  		$('#header').css({'position':'absolute','top':scrolltop});
  	  }else{
  		$('#header').css('top',0);
  	  }
  	    
  	  	if($('#navigation-mobile ul.menu-category').css('display') == 'block')
  	  		$("#navigation-mobile").addClass('applyPadding');
		
  	  	if(scrolltop >= 25) {
			// $('#header').css({"position": "fixed","top": "0px","z-index": "999"});	      
			$('#navigation').css({"padding-top": "48px"});	      
			$('.header-logo').hide();  
			$('.header-nav-logo, .set-fixed-nav-bg').show(); 
			if(!touchDevice)
			$('#header').css('position','fixed');
					
			if($('#wrapper').width() >= 740 ) {
				$('div.level-2').css("top", "84px");
				//$('#wrapper').css('padding-top', '115px');
				$('#top-menu-bg').slideUp();
				if($("div.checkout-progress-indicator").length)
				$('body').find(".checkoutPagesHeader").removeClass('removeHeaderBorder');
				$('#main').css('paddingTop','195px');
			} else {
				$('.header-logo, #top-menu-bg').show(); 
				//$('#wrapper').css('padding-top', '110px');
				$('#main').css('paddingTop','80px');

			}	      
		}
  	    
  	    else if(scrolltop <= 25) {
			//$('#header').css({"position": "","top": "", "z-index": "9"});	      
			$('#navigation').css({"padding-top": "48px"});	 
			$('.header-logo, #top-menu-bg').show();
			$('.header-nav-logo, .set-fixed-nav-bg').hide();
			if(!touchDevice)
			$('#header').css('position','fixed');
			
			if($('#wrapper').width() >= 740 ) {
				$('div.level-2').css("top", "84px");	
				// $('#wrapper').css('padding-top', '0px');
				$('#main').css('paddingTop',$('#header').height());
				if($("div.checkout-progress-indicator").length)
				$('body').find(".checkoutPagesHeader").addClass('removeHeaderBorder');
			} else {
				$('.header-logo, #top-menu-bg').show(); 
				//$('#wrapper').css('padding-top', '0px');
				$('#main').css('paddingTop','80px');
			}
		}	   
  	}
  	
  	/*if (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod' || navigator.platform == 'Linux armv6l') {
  	    window.ontouchstart = function () {
  	    	strictNav();
  	    }  	   
  	} else {
  		 window.onscroll = function() { 
   	    	strictNav();
   	    }
  	}*/
  	
  	window.onscroll = function() { 
    	strictNav();
    }

  	
	if($('#footer').parent().attr('id')!='wrapper'){
  		$('#wrapper').append($('#footer'));	
  	}
  	
	if($('.side-slot').length>0){
		var objSlot=$('.side-slot');
		var iHeight=objSlot.height();
		if(iHeight < objSlot.next().height()) iHeight=objSlot.next().height();
		objSlot.height(iHeight);
		objSlot.next().height(iHeight);
	}
	$('.phone').blur(function(){		
		var sNum=$(this).val();
		if($.trim(sNum)){
			sNum=sNum.replace(/-/g, '');
			sNum=sNum.substring(0,3)+'-'+sNum.substring(3,6)+'-'+sNum.substring(6,sNum.length);
			$(this).val(sNum);
		}
	});
	
	if($('#wrapper').width() <= 740 ) {
		$('.customerservicesection h5 a').removeAttr('href');
	}
});
if( $(window).width()<=757 && !(window.innerHeight > window.innerWidth) && ($(".full-width-slider-landing-new").length>0 || $(".full-width-slider-new").length>0)){$('.full-width-slider-landing-new,.full-width-slider-new').css('height','320px');}

window.onorientationchange = function() {
 if($("#hero-slider-landing-new").length>0){	
	$("#hero-slider-landing-new").trigger("configuration", {
			responsive: true,				
			duration: 10000,
			width:"100%",
			items: {
				visible: 1,
				height:"100%"
			},				
			scroll: {
				duration: 1000,
				easing : "linear",
				timeoutDuration	: 10000,
				pauseOnHover	: "immediate"
	
			},
			pagination: {
			    container: ".hero-slider-control-new",
			  }				  
		}).css('visibility','visible');
	}
	
	if($("#hero-slider-new").length>0){
		$("#hero-slider-new").trigger("configuration", {
			responsive: true,
			duration: 10000,
			width:"100%",
			items: {
				visible: 1,
				height:"100%"
			},
			scroll: {
				duration: 1000,
				easing : "linear",
				timeoutDuration	: 10000,
				pauseOnHover	: "immediate"

			},
			pagination: {
			    container: ".hero-slider-control-new",
			  }				  
		});
	}
	
	switch(window.orientation) 
    {  
      case -90:
      case 90: //Landscape 
      	if( /iPad/i.test(navigator.userAgent)) {
      		//alert('Landscape :'+$('#wrapper').width()+'win width :'+screen.width);
      		$('#header, .header-fixed-bg, .wrapper, .slide').css('width','960px');
      		$('#wrapper').css({'width':'960px', 'margin': '0px auto'});
      		//$('#wrapper').css('margin-left','32px');      		
      		$('html,body').attr('style','width:'+screen.height+'px !important');
      		$('.full-width-slider-landing-new,.full-width-slider-new').css('height','500px');      		
      	}  
      	if( /iPhone/i.test(navigator.userAgent)) {
      		$('#header,#wrapper').css('min-width',screen.height+'px');
      		$('.ui-dialog').css('min-width',screen.height*0.8+'px');
      		$('.ui-widget-overlay').css('min-width',screen.height+'px');
      		$('.full-width-slider-landing-new,.full-width-slider-new').css('height','320px');
      		if($('.video_dialog').length>0){$('.video_dialog').find('iframe').attr('width','100%')}
      	}
      	if( /Android/i.test(navigator.userAgent)) {
      		$('.ui-dialog').css('width',screen.height*0.27+'px');
      		$('.full-width-slider-landing-new,.full-width-slider-new').css('height','320px');
      		if($('.video_dialog').length>0){$('.video_dialog').find('iframe').attr('width','100%')}
      		//$('.ui-widget-overlay').css('min-width',screen.height+'px');      		
      	}
      	
      	break; 
      default: //Portrait
      	if( /iPad/i.test(navigator.userAgent)) {
      		//alert('Portrait :'+$('#wrapper').width()+'win width :'+screen.width);
      		//$('#header, .header-fixed-bg, .wrapper').css('width','768px');
      		$('#wrapper, #header, .header-fixed-bg, .wrapper, .slide').css('width', '768px');
      		$('html,body').attr('style','width:'+screen.width+'px !important');
      		
      		      	}  
      	if( /iPhone/i.test(navigator.userAgent)) {
      		$('#header,#wrapper').css('min-width',screen.width+'px');
      		$('.ui-dialog').css('min-width',screen.width*0.8+'px');
      		$('.ui-widget-overlay').css('min-width',screen.width+'px');
      		$('.full-width-slider-landing-new,.full-width-slider-new').css('height','200px');
      	}
      	if( /Android/i.test(navigator.userAgent)) {
      		$('.ui-dialog').css('width',screen.width*0.27+'px');
      		$('.full-width-slider-landing-new,.full-width-slider-new').css('height','200px');
      		//$('.ui-widget-overlay').css('min-width',screen.width+'px');       		
      	}
      	break; 
    }	
	
	if(loadCarousel) loadCarousel();
	loadHomeCarousel();
	
}

var loadHomeCarousel = function(){
	var swipeON;
	if($('#wrapper').width() <= 768 ) {
	     swipeON = true;
	} else {
	     swipeON = false;
	}
	jQuery(window).load(function() {
		$('#homepage-slides').carouFredSel({
			responsive: true,
			auto: {
				play: true,
				timeoutDuration : 5000
			},
			prev: '#prev',
			next: '#next',
			pagination: ".hero-slider-control",
			mousewheel: swipeON,
			height: 750,
			swipe: {
				onMouse: swipeON,
				onTouch: swipeON
			},
			items: {
				height: 750,
				visible: 1
			}
		});
	});
}
