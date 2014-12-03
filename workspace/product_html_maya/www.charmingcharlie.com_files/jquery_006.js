/*
 * proNav 3.6
 * Author: Brandammo
 * */

(function($){	
			
	/*
	 * Sets ul#pronav with the body class
	 * and defines the width if value is present,
	 * height is set based on primary-pronav-item height
	 */
	$('ul#pronav').addClass(myProNav.bodyClass).css("width", myProNav.proNavWidth).css("height", $('ul#pronav > li.primary-pronav-item').outerHeight());
	
	/*
	 * Adds class .top-level-ul to ul's
	 * of direct descendant of .row
	 */
	$("ul#pronav .row > ul").addClass("top-level-ul");
	
	/*
	 * Calculates the width of .sub
	 * (dropdown width)
	 */
	$.fn.calcSubWidth = function() {
	    rowWidth = 0;
	    if ($(this).find(".columns-split").length){
	    	$(this).find(".columns-inside").each(function(){
	    		rowWidth += $(this).outerWidth();
	    	})
	    	$(this).find("ul.top-level-ul").addClass("has-columns");
	    } else {
	    	$(this).find("ul.top-level-ul").each(function() { 
		        rowWidth += $(this).outerWidth(); 
		    });
	    }
	};
	
	/*
	 * Adds classes to first and last primary proNav items,
	 * if only one item is present - remove class first-pronav-item
	 * and only show last-pronav-item
	 */
	$("li.primary-pronav-item:first").addClass("first-pronav-item");
	$("li.primary-pronav-item:last").addClass("last-pronav-item");
	if( $("ul#pronav li.primary-pronav-item").length == 1 ) {
		$("li.primary-pronav-item:first").removeClass("first-pronav-item");
	}
	
	/*
	 * Splits proNav items into x amount of columns
	 * if/when specified by the user
	 */	
	$('#pronav .sub .row ul.columns-split').each(function(){
		var columnClass = $(this).attr('class').split(' ')[0];
		var columnNum = columnClass.replace('columns-', '');
		var liNum = $(this).find('li').size();
		var itemsPerCol = Math.ceil(liNum/columnNum);

		var liItems = $(this).find('li');
	    for(var i = 0; i < liNum; i+=itemsPerCol) {
	      liItems.slice(i, i+itemsPerCol).wrapAll("<li class='columns-inside'><ul></ul></li>");
	    }
	});
    
    /*
	 * Adds classes to first and last row items and even and odd classes,
	 * if only one row item is present - remove class first-row and only
	 * show last-row
	 */
    $("ul#pronav .sub").each(function(){
    	$(this).find(".row:odd").addClass("odd-row");
    	$(this).find(".row:even").addClass("even-row");
    	$(this).find(".row:first").addClass("first-row");
    	$(this).find(".row:last").addClass("last-row");
    	
    	if ( $(this).find(".row").length == 1 ) {
    		$(this).find(".row").removeClass("first-row");
    	}
    })
    
     /*
	 * Adds odd and even classes to ul's of direct descendants of .row,
	 * if only one row item is present - remove class first-ul and only
	 * show last-ul
	 */
    $("ul#pronav .row").each(function(){
    	$(this).find('> ul:odd').addClass("odd-ul");
    	$(this).find('> ul:even').addClass("even-ul");
    	$(this).find('> ul:first').addClass("first-ul");
    	$(this).find('> ul:last').addClass("last-ul");   
    	$(this).find('> ul:last').after("<div style='clear:both;/>");
    	
    	if ( $(this).find("> ul").length == 1 ) {
    		$(this).find("> ul").removeClass("first-ul");
    	}
    })   
    
    /*
	 * Adds odd and even classes to li's of direct descendants of .row ul,
	 * if only one li item is present - remove class first-li and only
	 * show last-li
	 */
    $("ul#pronav .row ul").each(function(){
    	$(this).find("> li:odd").addClass("odd-li");
    	$(this).find("> li:even").addClass("even-li");
    	$(this).find("> li:first").addClass("first-li");
    	$(this).find("> li:last").addClass("last-li");
    	
    	if ( $(this).find("> li").length == 1 ) {
    		$(this).find("> li").removeClass("first-li");
    	}
    });
    
   	/*
	 * proNavOver() - rollover function
	 * when the primary proNav items are moused over 
	 */
	function proNavOver(){
		var proNavPosition = myProNav.proNavPosition;
        
	    $(this).find(".sub").css('display', 'block');
	    
	    var biggestRow = 0;
        $(this).find(".row").each(function(){
        	$(this).calcSubWidth();
        	if(rowWidth > biggestRow) {
                biggestRow = rowWidth;
            } 
        });               
        $(this).find(".sub").css({width : biggestRow});
        
        if (proNavPosition == "left") {
        	var proNavWidth = $(this).parent().parent().outerWidth();
        	$(this).find(".sub").css({"left" : proNavWidth, "top" : "0px"});
        }
        
        if (proNavPosition == "right") {
        	$(this).find(".sub").css({"left" : -rowWidth, "top" : "0px"});
        }
        
        $(this).find(".sub").stop().animate({opacity:1},{duration:myProNav.fadeInTime, easing:myProNav.easingMethodShow});
	}
	
	/*
	 * proNavOut() - rollout function
	 * when the primary proNav items are moused out 
	 */
	function proNavOut(){		
	    $(this).find(".sub").stop().animate({opacity:0},{duration:myProNav.fadeOutTime, easing:myProNav.easingMethodHide, complete: function(){$(this).css('display', 'none')} });
	}
	
	/*
	 * configurations for hoverIntent, parameters
	 * passed from proNav configuration in magento backend
	 */
	var config = {
		sensitivity: myProNav.sensitivity, 
		interval: myProNav.interval, 
		over: proNavOver, 
		timeout: myProNav.timeout, 
		out: proNavOut
	};	
	$("ul#pronav li").has('.sub').hoverIntent(config);
	
	/*
	 * disable default action of primary proNav links if set
	 * as not a link in magento backend.
	 */
	$("ul#pronav li.no-link a.primary-pronav-link").click(function(e) {e.preventDefault()});
	
	/********************************************************* BEGIN RESPONSIVE SELECT MENU *********************************************************/
	/*
	 * call to generate responsive dropdown menu for proNav
	 */
	generateSelectDropdown();
	checkBrowserWidth(); //checks the browser width	
	$(window).resize(function(){
		checkBrowserWidth(); //checks the browser width when browser window is resized
	})
	
	/*
	 * call to generate responsive dropdown menu for proNav
	 */
	function checkBrowserWidth(){
		var browserWidth = $(window).width();		
		if ( $("#pronav-selection-container").css("display") == "block" ) {
			//if responsive menu is shown, add class .responsive
			$("#pronav-selection-container").width(browserWidth).addClass("responsive");
		} else {
			//fix - height of pronav
			$('ul#pronav').css("height", $('ul#pronav > li.primary-pronav-item').outerHeight());
		}
	}
	
	function generateSelectDropdown(){
				
		$("ul#pronav .sub").not(".non-responsive").each(function(i){
						
			//generate the select forms for each sub
			$("<select id='pronav-select-"+ i +"'></select>").appendTo("#pronav-selection");
			
			//add the main top link to select
			var getMainLink = $(this).prev().attr("href");
			var getMainLinkText = $(this).prev().text();
			$("<option />", {
				 "value"   : getMainLink,
			     "text"    : getMainLinkText
			}).appendTo("select#pronav-select-"+ i);
				
			$(this).find(".row .top-level-ul > li a").each(function(){
				var selectLevels = "";
				var promoImgAlt = "";
				var theLink = $(this);
				if ( theLink.parent().hasClass("level-2") ) {
					selectLevels = "- "
				}
				if ( theLink.parent().hasClass("level-3") ) {
					selectLevels = "-- "
				}
				if ( theLink.parent().hasClass("level-4") ) {
					selectLevels = "--- "
				}
				
				/* checks if promo imagery is present and populates
				 * the value with the image alt tag instead
				 */
				promoImgAlt = theLink.find("img").attr("alt");
				if (promoImgAlt == undefined) {
					promoImgAlt = "";
				}
				
				$("<option />", {
				     "value"   : theLink.attr("href"),
				     "text"    : selectLevels + theLink.text() + promoImgAlt
				}).appendTo("select#pronav-select-"+ i);
			});
		})
		$("#pronav-selection select").change(function() {
			//assign value to link
			window.location = $(this).find("option:selected").val();			
		});
		
		checkProNavSelection();
		
		/* Toggles the responsive menu
		 */
		$("#pronav-select-toggle").click(function(){
			$(this).next().toggle();
		});
	}
	
	/* Checks the current url and matches up
	 * with selected responsive menu
	 */
	function checkProNavSelection(){
		var currenturl = myProNav.currentURL;
		var homeurl = myProNav.homeURL;
		$("#pronav-selection select").each(function(){
			if (currenturl !== homeurl) {
				$(this).find('option[value="'+currenturl+'"]').attr("selected", "selected");
			}
		});
	}
	
	/********************************************************* END RESPONSIVE SELECT MENU *********************************************************/
	
	
	/********************************************************* BEGIN CHILD DROPDOWNS *********************************************************/
	generateChildDropdowns();
	
	function generateChildDropdowns(){
		$("ul#pronav .sub ul > li").has(".row").each(function(){
			$(this).addClass("has-children");
		})
		
		$(".has-children").each(function(){
			var linkText = $(this).find("> a").html();
			$(this).find("> a").html(linkText);
		})
		
		$(".has-children").hoverIntent(showDoubleSub, hideDoubleSub);
	}	
	
	function showDoubleSub(){
		$(this).find("> .child-sub").css("display", "block").stop().animate({opacity:1},{duration:myProNav.fadeInTime, easing:myProNav.easingMethodShow});
		$(this).find("> .child-sub").css("left", Math.ceil(rowWidth));
	}
	function hideDoubleSub(){
		$(this).find("> .child-sub").stop().animate({opacity:0},{duration:myProNav.fadeOutTime, easing:myProNav.easingMethodHide, complete: function(){$(this).css('display', 'none')} });
	}
	/********************************************************* END CHILD DROPDOWNS *********************************************************/
})(jQuery);