/*jslint browser: true, undef: true, white: true, sloppy: true, vars: true */
/*global $, window */
/******************************************************************************
Lines above are for jslint, the JavaScript verifier.  http://www.jslint.com/
******************************************************************************/

/*********************************************************
This is the init functionality for Jquery.
*********************************************************/
	
$(document).ready(function() {
		
	//Imports HoverIntent plugin for menu :: modified to work with .live - http://cherne.net/brian/resources/jquery.hoverIntent.html
	$.getScript(Base_Href + '/scripts/jquery.hoverIntent.js', function() {});

	$(".roundedCorners").corner("round 10px");
	/* NOTE - can only be used on elements with solid background colors */
	
	//This scrolls the page to the top rather than a sudden jump
	$('a[href=#top]').click(function(){
		$('html, body').animate({scrollTop:0}, 'slow');
		return false;
	});
	
	// Menu hover functions (using jQuery instead of CSS to fix iPad issues)
	$('#menu li').live('mouseenter', function() {
		if (!$(this).data('init')) {  
			$(this).data('init', true);  
			$(this).hoverIntent(  
				function() {  
					if ($.browser.msie && parseInt($.browser.version, 10) < 9){
						$(this).find(".maincontent").show();
					} else {
						$(this).find(".maincontent").fadeIn("fast");
					} 
				},  
				function() {  
					if ($.browser.msie && parseInt($.browser.version, 10) < 9){
						$(this).find(".maincontent").hide();
					} else {
						$(this).find(".maincontent").fadeOut("fast");
					}
				}  
			);  
			$(this).trigger('mouseover');  
		}  
	});
	
	// Fix for Internet Explorer to still show main menu when user hovers over iframe inside of it	
	if($.browser.msie){
		$('#menu li a').on('mouseenter',function() {
			$(this).next().addClass('hover');
		});
		$('#menu li iframe').on('hover',function() {
			$(this).parents("#menu li .maincontent").addClass('hover');
			$(this).parents("#menu li").addClass('hoverIE');
		});
		$('#menu li iframe').on('mouseleave',function() {
			$(this).parents("#menu li .maincontent").removeClass('hover');
			$(this).parents("#menu li").removeClass('hoverIE');
		});
		$("#menu li a").on('mouseleave',function() {
			$(this).next().removeClass('hover');
		}); 
	}
		
	// This sets the iframe in the products menu flyout to the landing page after the user leaves the hover
	$("li#nav_item_1").hover(
		function () {
			//do nothing
		},
		function () {
			$("#homeFrame").attr('src', Base_Href + '/includes/menu/products/landing.html');
		}
	);
	
	// This is for the hover images. Instead of using CSS we are using jQuery so the images aren't background images
	$(function() {
		$('img[data-hover]').hover(function() {
			$(this).attr('tmp', $(this).attr('src')).attr('src', $(this).attr('data-hover')).attr('data-hover', $(this).attr('tmp')).removeAttr('tmp');
		}).each(function() {
			$('<img />').attr('src', $(this).attr('data-hover'));
		});
	}); 
	
	//Imports the AddThis widget, since the old masthead was importing it but we no longer use AddThis just in the header
	$.getScript(((location.protocol === "https:") ? "https:" : "http:") +
		    '//s7.addthis.com/js/250/addthis_widget.js#pubid=irenenewsom', function() {});
	
	// work around an IE problem where it doesn't capture hash
	// change events on the new result pages when you click on a
	// results link in an iframe inside a results page.
	$("#iframePage").find("a[href*='GEAResults.htm'],a[href*='GEAResultsTest.htm']").each(function () {
		var cachebuster = new Date().getTime() + "." + Math.random();
		cachebuster = encodeURIComponent(cachebuster);
		if (this.search === "" || this.search === "?") {
			this.search = "unique=" + cachebuster;
		}
		else {
			this.search += "&unique=" + cachebuster;
		}
	});

	//---------------------------------------------------------------------
	// Simple Modal "Popups"
	//---------------------------------------------------------------------

	//Imports simple modal jQuery functionality
	$.getScript(Base_Href + '/scripts/jquery.simplemodal.js', function() {});

	$(".simplemodal-link").click(function () {
		var dest = this.getAttribute("data-simplemodal-dest");
		dest = "#" + dest.replace(/^\#/, "");
		var options = {};
		if ($(dest).hasClass("type-b")) {
			options.closeHTML = "";
			options.containerId = "simplemodal-container-type-b";
			options.overlayId = "simplemodal-overlay-type-b";
		} else if ($(dest).hasClass("type-a")) {
			options.containerId = "simplemodal-container-type-a";
			options.overlayId = "simplemodal-overlay-type-a";
		}
		$(dest).modal(options);
		return false;
	});
	$(".simplemodal-content").each(function() {
		$(this).children().wrapAll("<div class='simplemodal-content-inner' />");
	});
	$(".simplemodal-content.type-b").prepend("<div class='simplemodal-close-wrapper'>" +
						 "<a class='simplemodal-close' href='#'>CLOSE [ X ]</a>" +
						 "</div>");
	
	//---------------------------------------------------------------------
	// GeoSpring State dropdowns
	//---------------------------------------------------------------------

	// This is so the dropdown button doesn't have to be an actual
	// button on GeoSpring pages.  Different ones for each modal
	// box since sometimes the includes are on the same page
	// together (can't use same ID's)
	$(function(){
		$("#stateSelectbtn").click(function() {
			var url = $("#stateselect").val(); // get selected value
			if (url) { // require a URL
				window.location = url; // redirect
			}
			return false;
		});
	});
	$(function(){
		$("#stateSelectbtn_modal").click(function() {
			var url = $("#stateselect_modal").val(); // get selected value
			if (url) { // require a URL
				window.location = url; // redirect
			}
			return false;
		});
	});
	$(function(){
		$("#stateSelectbtn_modalbottomBox").click(function() {
			var url = $("#stateselect_modalBottomBox").val(); // get selected value
			if (url) { // require a URL
				window.location = url; // redirect
			}
			return false;
		});
	});
	$(function(){
		$("#stateSelectbtn_modalIndex").click(function() {
			var url = $("#stateselect_modalIndex").val(); // get selected value
			if (url) { // require a URL
				window.location = url; // redirect
			}
			return false;
		});
	});

});

