var hero_responsive;

$(document).ready(function () {
	
var sliderLoaded = false;
var content_parsed = false;


$('.explore_tout').on("click", function( e ){
	if(matchMedia("screen and (max-width : 800px)").matches) {	
	var linkTo = $(this).find( 'a' ).attr( 'href' );
	window.location = linkTo;
	}
});	


$('#hero_responsive ul li img').on("click", function( e ){
	if(matchMedia("screen and (max-width : 800px)").matches) {
	var linkTo = $(this).closest('li').find( 'a' ).attr( 'href' );
	window.location = linkTo;
	}
			
});


if (runResponsive)	{
	var checkAndChangeHtml = function() {
	   if (!content_parsed)	{
	   if(matchMedia("screen and (max-width : 800px)").matches) {
	   
	   } else {
		   if (!sliderLoaded){
		   category_slider_global();
		   sliderLoaded = true;
		   }
		  content_parsed = true;
	   }
	   }
	   
};

window.addEventListener('resize', checkAndChangeHtml);
checkAndChangeHtml();

}else{
	//IE support: 1 Initialize scripts and then 2.parse the content of <script type="text/conditional-html" id="featured_products_source">
category_slider_global();

}
});

// JavaScript Document
$(document).ready(function(){
	
		var time_hero_slider = 100;
		setTimeout(function() {
			hero_responsive = $('#hero_responsive ul').bxSlider({	
			});
		},time_hero_slider);


		
				
		// EXPAND SECTION
		var time = 600;
		setTimeout(function() {
				 // First animation
				 displayContents();

		},time);
		
		
		function displayContents () {
			
	/*	$('#model_attached *').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 500);*/	
			
/*		if($(window).width() > 767){
			$('#hs').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 1000);
			$(".slate").delay(700).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 1000);
			$("#captions .slideText, .orbit-bullets, .heroSlider + .orbit-prev, .heroSlider + .orbit-prev + .orbit-next ").delay(1000).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 1000);
			$(".divider, #productFinder, .productsDivider").delay(1200).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 1000);
		}
*/		}
									
});
    $(document).ready(function() {
		
	var readMore = function () {
	
	$(".make_ellip").dotdotdot({
	after: "a.ellip_link",
	watch: true,
	callback: hideLinkIfNoTruncation
	});
	
	}

	var readMore2 = function () {
	
	$(".make_ellip2").dotdotdot({
	after: "a.ellip_link2",
	watch: true,
	callback: hideLinkIfNoTruncation
	});
	
	}


	
	//window.addEventListener('resize', readMore);
readMore();
readMore2();


function hideLinkIfNoTruncation(isTruncated, origContent) {
	if (!isTruncated) {
	$('.ellip_link',this).addClass('dismiss')
	}else{
		$('.ellip_link',this).removeClass('dismiss')
		} 
	}

$(".page_id_area h1").click(

function()
{
	if(matchMedia("screen and (max-width : 800px)").matches) {
    window.location = $(this).closest('.page_id_area').attr("url");}
});	
		
});
