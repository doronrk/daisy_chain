topNav ={
	obj:{
		wWidth: "",
		Font:10
		},
	func:{
		scaleNav: function() {
			if (!$.browser.msie){
				scrollBarWidth = window.innerWidth - jQuery("body").width(); 
							   }
							   else{scrollBarWidth = 20;}

				$("#mainMenu").css("visibility","hidden");
				var elements = 0;
				var winW = $(window).width();
				var newFontSize = 10;
			    topNav.obj.wWidth = jQuery(window).width();
			    	
					if( topNav.obj.wWidth <= 1024 &&  topNav.obj.wWidth >= 768 ){
					            for( i=0; i<100; i++)
					            {

					                var newnew = newFontSize-(i/10);
					                $("#mainMenu").css("font-size", newnew+"px");
					                elements = 0;
					                $("#mainMenu>li").each(function(){
					                     elements += $(this).width();
					                });
					                menW = elements+40+scrollBarWidth;

					                if(winW<=menW){
					                	
					                }
					                else{
					                	
					                	$('#mainMenu, #sideNav').css("font-size", newnew+"px"); 
										
										$("#mainMenu").css("visibility","visible");
					                	break; 
					                }
					            }
					}
					else if( topNav.obj.wWidth < 768 ){
							 for( i=0; i<100; i++)
					            {
					                var winW = 768;
					                var newnew = newFontSize-(i/10);
					               
					                $('#mainMenu, #sideNav').css("font-size", newnew+"px");
					                elements = 0;
					                $("#mainMenu>li").each(function(){
					                     elements += $(this).width();
					                });
					                menW = elements+40+scrollBarWidth;
					                if(winW<=menW){
					                }
					                else{
					                	$('#mainMenu, #sideNav').css("font-size", newnew+"px"); 
										$("#mainMenu").css("visibility","visible");
					                	break; 
					                }
					            }
						return false;
					}
					else{ 
						newnew=10;
						$('#mainMenu, #sideNav').css("font-size", newnew+"px");
						$("#mainMenu").css("visibility","visible");
						}
	      			}	
		}
	}

/*SCALE FUNCTION*/



//END OF SCALE FUNCTION
jQuery(window).resize(function(){ 
	topNav.func.scaleNav();
	
});
jQuery(window).load(function(){ 
	topNav.func.scaleNav();
});


jQuery(document).ready(function(){
		topNav.func.scaleNav();
		//iPad EXTRA padding
		jQuery('ol#mainMenu').children('li').on({ 
			'touchstart' : function(){ 
				jQuery("#nav ol#mainMenu li ol li a").css({"padding":"0 0 12px 0"});
									 }
												});
		//iPad EXTRA padding

		$('a.disable').mouseenter(function () {   $(this).removeAttr("href");    });
        jQuery('ol#sideMenu').find('div.womenSidenavContainer').append($('.womenSideElement').each(function(){$(this).html()}));
		jQuery('ol#sideMenu').find('div.menSidenavContainer').append($('.menSideElement').each(function(){$(this).html()}));

//MENU HOVER EVENT

jQuery('ol#mainMenu li').on({
	
 mouseenter: function () {	
		 	var w = Math.round(jQuery(this).children('ol').width());
			var m = Math.round(jQuery(this).position().left);
			var g = w+m;
			var f = g-topNav.obj.wWidth;
							if(g > topNav.obj.wWidth){
							jQuery(this).children('ol').css({"position":"absolute","left":-f+"px"}).show();
									   				 }
						else {
							jQuery(this).children('ol').css({"position":"absolute"}).attr("style","left:0px").show();
							 }
						},

 mouseleave: function(){ jQuery(this).children('ol').hide()}


							});
/*
var aboveHeight = $('#branding2').outerHeight();
    $(window).scroll(function(){
        if ($(window).scrollTop() > aboveHeight){
            $('#nav').addClass('fixed').css({'position':'fixed','top':'0','width':'100%'}).next().css('padding-top','34px');
        } 
		
		else {
			
            $('#nav').removeClass('fixed').css('position','relative').next().css('padding-top','0');
        }
			
    });
	
var aboveHeight = $('#nav').outerHeight();
     $(window).scroll(function(){
        if ($(window).scrollTop() > aboveHeight){
             $('.sidenav').addClass('fixed2').css('top','40').next().css('padding-top','30px');
		     $('.gridarea').addClass('padding2');
        } 
		
		else {
            $('.sidenav').removeClass('fixed2').next().css('padding-top','0');
			$('.gridarea').removeClass('padding2');
        }
		
	});
*/
jQuery('div#logo a').click(function(){
            
		     		var s = window.s;	
					s.linkTrackVars = 'prop18';
					s.prop18 ="LG";
					s.tl(true,'o','Site Content Click');
		     });
});

	
	
	jQuery(function(){
		
		jQuery("ol#mainMenu > li").hover(function(){
			jQuery(this).find("a:first").toggleClass("sideSectionHeader");
		});
		jQuery(".spacer").parent("li").hover(function(){
				jQuery(this).css("display","block");
			});
	
	});
	