/*
 * All java script logic for the application.
 *
 * The code relies on the jQuery JS library to
 * be also loaded.
 */
// semi-colon to assure functionality upon script concatenation and minification
;

// if jQuery has not been loaded, load from google cdn
if (!window.jQuery) {
    var s = document.createElement('script');
    s.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
    s.setAttribute('type', 'text/javascript');
    document.getElementsByTagName('head')[0].appendChild(s);
}
/*
 * Add 'exist' method to jQuery elements.
 */
jQuery.fn.exists = function() {
    if( $(this).length > 0) {
        return true;
    }
    return false;
};

function checkerrors() {
    $('.error').each(
        function() {
            if($(this).attr('for') == 'dwfrm_login_password') {
                $(this).text("A valid password is required.");
            }
        }
    );
    return false;
}

window.onload = function(){
    $('#dwfrm_login').submit(
        function() {
            setTimeout("checkerrors()",1000);
        }
    );
}

$(document).on("ready", function () {
	
	var COUNTRY_NAMES_BY_LOCALE = {
            "de_AT" : "Austria",
            "nl_BE" : "Belgium",
            "el_CY" : "Cyprus",
            "cs_CZ" : "Czech Republic",
            "da_DK" : "Denmark",
            "et_EE" : "Estonia",
            "fi_FI" : "Finland",
            "fr_FR" : "France",
            "de_DE" : "Germany",
            "el_GR" : "Greece",
            "hu_HU" : "Hungary",
            "is_IS" : "Iceland",
            "en_IE" : "Ireland",
            "it_IT" : "Italy",
            "lv_LV" : "Latvia",
            "fr_LU" : "Luxemburg",
            "nl_NL" : "Netherlands",
            "nb_NO" : "Norway",
            "pl_PL" : "Poland",
            "pt_PT" : "Portugal",
            "ro_RO" : "Romania",
            "ru_RU" : "Russian Federation",
            "sk_SK" : "Slovakia",
            "sl_SI" : "Slovenia",
            "es_ES" : "Spain",
            "sv_SE" : "Sweden",
            "de_CH" : "Switzerland",
            "tr_TR" : "Turkey",
            "en_GB" : "United Kingdom",
            "en_CA" : "Canada",
            "es_MX" : "Mexico",
            "en_US" : "United States",
            "default" : "United States",
            "ar_BH" : "Bahrain",
            "ar_EG" : "Egypt",
            "ar_JO" : "Jordan",
            "ar_KW" : "Kuwait",
            "ar_QA" : "Qatar",
            "ar_OM" : "Oman",
            "ar_SA" : "Saudia Arabia",
            "ar_AE" : "United Arab Emirates"
       };
   var footerLocaleDisplayName = $(".fiftyone-shipping-tab-wrapper-footer .shipping-tab-country");
   $(footerLocaleDisplayName).text(COUNTRY_NAMES_BY_LOCALE[currentLocale]);
   
   if($(footerLocaleDisplayName).text() == "United States" || $(footerLocaleDisplayName).text() == "default"){
	   $('.fiftyone-shipping-tab-wrapper-footer').addClass("domestic");  
   }
   
   
    var urlHash = window.location.href.split("#")[1];
    if(urlHash) {
		    $('html,body').animate({
		        scrollTop: $('.' + urlHash).offset().top
		    }, 1200);
    }
    
    
    var footerWrapper 		= $('.footer-wrapper');
    var footerContainer 	= footerWrapper.find('#footer-container');
    var footerToggle		= $('.footer-top');
    var footerOpen 			= false;
    var fTop 				= footerToggle.offset().top;
    var fTop2, win;
    var footerShipTo		= $('.shipping-tab-anchor-footer.shipping-tab-trigger');
    footerContainer.addClass("stuck");
    
    function getDocHeight() {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }
    
    footerContainer.mouseleave(function() {
    	footerContainer.removeClass("open");
    });
    
    footerToggle.mouseenter(function(){
    	if(!$(footerContainer).hasClass("scrolled")){
    		footerContainer.addClass("nudge");
    	}
    }).mouseleave(function(){
    	footerContainer.removeClass("nudge");
    }).click(function(){
    	if($(footerContainer).hasClass("open")){
    		footerContainer.removeClass("open");
    	}
    	if(!$(footerContainer).hasClass("open")){
    		footerContainer.addClass("open");
    	}
    	//footerContainer.addClass("open");
    	footerOpen = !footerOpen;
    	//return false; Generates BUG-6304
    })
    
    footerContainer.find('.connect-link').click(function(){
    	footerContainer.toggleClass("open");
    	footerOpen = !footerOpen;
    	
    	return false;
    })
    
    footerContainer.find('.customer, .findStore').click(function(e){
    	e.stopPropagation();
    });

    
    footerShipTo.click(function () {
		$('html,body').scrollTop(0);
		
		if($(footerContainer).hasClass("stuck")){
			footerContainer.removeClass("open scrolled");
			footerOpen = false;
		}
	});
    
    $("#SpecialHandlingPreview, .monogram-header").live('click', '#SpecialHandlingPreview, .monogram-header', function() {
    	UpdatePreview();
    });
    
    $("#pdpMain a#add-to-wishlist.novariationselected").live('click', '#pdpMain a#add-to-wishlist.novariationselected', function() {
    	$("#pdpMain select.variation-select.size-sel + .chzn-container").addClass("error");
    });
    
    
    //setup before functions
    var typingTimer;                //timer identifier
    var doneTypingInterval = 400;  //time in ms, 5 second for example

    //on keyup, start the countdown
    $('.specialhandling #monogram-initials').live('keyup', '.specialhandling #monogram-initials', function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }); 

    //on keydown, clear the countdown 
    $('.specialhandling #monogram-initials').live('keydown', '.specialhandling #monogram-initials', function(key) {
        clearTimeout(typingTimer);
    });
    
    //restrict alphanumerics
    $('.specialhandling #monogram-initials').live('keydown', '.specialhandling #monogram-initials', function(key) {
    	var keyValue = key.keyCode;
    	if(keyValue == 8 || keyValue == 37 || keyValue == 39 || keyValue == 46 ){
			return keyValue;
    	} else if(keyValue < 65 || keyValue > 90){
			return false;
    	}
    });
    
    //user is "finished typing," do something 
    function doneTyping () {
    	UpdatePreviewTyping();
    }
    
    //Monogram Preview Color
    var monoPrevColor = $(".specialhandling ul.swatches.Color > li.selected > a.monogram > input[type='radio']:first").attr("data-colorcode");
    if(monoPrevColor != "undefined"){
    	$('.summary-monogram').css("color", "#" + monoPrevColor);
    }
    
    //Envelope Typing
    //setup before functions
    var EnvelopeTimer;                //timer identifier
    var EnvelopeInterval = 400;  //time in ms, 5 second for example

    //on keyup, start the countdown
    $('.sheet.address input.input-text').live('keyup', '.sheet.address input.input-text', function() {
        clearTimeout(EnvelopeTimer);
        EnvelopeTimer = setTimeout(EnvelopedoneTyping, EnvelopeInterval);
    }); 

    //on keydown, clear the countdown 
    $('.sheet.address input.input-text').live('keydown', '.sheet.address input.input-text', function() {
        clearTimeout(EnvelopeTimer);
    });

    //user is "finished typing," do something
    function EnvelopedoneTyping () {
    	EnvelopeCopyAddressTyping();
    }
    
     // Envelope Same Information Link
    $('.specialhandling a.to-envelope').live('click', '.specialhandling a.to-envelope', function() {
    	var jqThis = $(this);
        var $envcb = jqThis.children("span");
    	var inputs = jqThis.parents("div.envelope").find(".address input");
    	$('.envelope-address').toggleClass('use-same');
    	$('.envelope-checkbox').toggleClass('unchecked').toggleClass('checked');
    	jqThis.parents("div.envelope").toggleClass('not-same');
    	if($(".envelope-address").hasClass("use-same")){
    		jqThis.parents("div.envelope").find(".address input").each(function () {
                var jqInput = $(this);
                jqInput.attr('tabindex', '-1');
                var sheetid = jqInput.attr("id").replace("envelope", "sheet");
                var copyValue = jqInput.parents("ul.to-expand").find("input#" + sheetid).val();
                jqInput.val(copyValue);
                if(copyValue != "" && copyValue != jqInput.attr("placeholder")){
                    jqInput.removeClass("placeholder");
                }
            });
        } else {
        	
            jqThis.parents("div.envelope").find(".address input").each(function () {
                $(this).val("");
                $(this).attr('tabindex', '0');
            });
        }
    });
    
    var prevScroll = 0;
    var headerPromoSize = $(".header-promo-area-wrapper").height() + 40;
    var headerLogoSize = $(".header-logo").height();
    var headerTopSize = $(".header-top").height();
    var navSticky = headerPromoSize + headerLogoSize;
    var navStickyMobile = headerLogoSize;
    var promoPadding = 0;
    var prodImg = $('.product-primary-image');
    var prodImgTop = $('.product-primary-image').offset();
    
	$(window).scroll(function() {
		
		var headerPromoSize = $(".header-promo-area-wrapper").height() + 40;
	    var headerLogoSize = $(".header-logo").height();
	    var headerTopSize = $(".header-top").height();
	    var navSticky = headerPromoSize + headerLogoSize;
	    var navStickyMobile = headerLogoSize;
	    var promoPadding = 0;
		
		if ($("#wrapper").width() < 479){ // if mobile
			if($("#wrapper").hasClass("promo-open")){ // if promo open
				if ($(this).scrollTop() > headerPromoSize){ 
		    		$('#header, #wrapper').addClass("mobile-sticky");
		    		$('.header-promo-area').addClass('scrolling');
		    		$('.header-promo-area').addClass('closed');
		    		$('.header-promo-area').removeClass('hard-open');
		    		
		  		} else {
		    		$('#header, #wrapper').removeClass("mobile-sticky");
		    		$('.header-promo-area').removeClass('scrolling');
		    		$('.header-promo-area').removeClass('closed');
		    		if ($(".header-promo-area").hasClass("hard-close")){
		    			
		    		} else {
		    			$('.header-promo-area').addClass('hard-open');
		    		}
		  		}
			} else if($("#wrapper").hasClass("promo-closed")){ // if promo closed
				if ($(this).scrollTop() > 1){ 
		    		$('#header, #wrapper').addClass("mobile-sticky");
		    		$('.header-promo-area').addClass('scrolling');
		    		$('.header-promo-area').addClass('closed');
		    		$('.header-promo-area').removeClass('hard-open');
		    		
		  		} else {
		    		$('#header, #wrapper').removeClass("mobile-sticky");
		    		$('.header-promo-area').removeClass('scrolling');
		    		$('.header-promo-area').removeClass('closed');
		    		if ($(".header-promo-area").hasClass("hard-close")){
		    			
		    		} else {
		    			$('.header-promo-area').addClass('hard-open');
		    		}
		  		}
			}
		}else{ // if not mobile
			if($("#wrapper").hasClass("promo-open")){ // if promo is open
				if ($(this).scrollTop() > headerPromoSize){
		    		$('#header, #wrapper').addClass("sticky1");
		    		$('.header-promo-area').addClass('scrolling');
		    		$('.header-promo-area').removeClass('hard-open');
		  		} else {
		    		$('#header, #wrapper').removeClass("sticky1");
		    		$('.header-promo-area').removeClass('scrolling');
		    		$('.header-promo-area').removeClass('closed');
		    		if ($(".header-promo-area").hasClass("hard-close")){
		    			
		    		} else {
		    			$('.header-promo-area').addClass('hard-open')
		    		}
		  		}
				if ($(this).scrollTop() > navSticky){  
		    		$('#header, #wrapper').addClass("sticky2");
		    		$('.header-promo-area').addClass('closed');
		    		$('.header-logo img').addClass('hidden');
		    		$('#navigation').addClass('scrolling');
		    		$('.header-promo-area').removeClass('hard-open');
		  		} else {
		    		$('#header, #wrapper').removeClass("sticky2");
		    		$('.header-promo-area').removeClass('closed');
		    		$('.header-logo img').removeClass('hidden');
		    		$('#navigation').removeClass('scrolling');
		    		if ($(".header-promo-area").hasClass("hard-close")){
		    			
		    		} else {
		    			$('.header-promo-area').addClass('hard-open')
		    		}
		  		}
			} else if($("#wrapper").hasClass("promo-closed")){ // if promo is closed
				if ($(this).scrollTop() > 0){
		    		$('#header, #wrapper').addClass("sticky1");
		    		$('.header-promo-area').addClass('scrolling');
		    		$('.header-promo-area').removeClass('hard-open');
		  		} else {
		    		$('#header, #wrapper').removeClass("sticky1");
		    		$('.header-promo-area').removeClass('scrolling');
		    		$('#navigation').removeClass('scrolling');
		    		$('.header-promo-area').removeClass('closed');
		    		if ($(".header-promo-area").hasClass("hard-close")){
		    			
		    		} else {
		    			$('.header-promo-area').addClass('hard-open')
		    		}
		  		}
				if ($(this).scrollTop() > navStickyMobile){  
		    		$('#header, #wrapper').addClass("sticky2");
		    		$('#navigation').addClass('scrolling');
		    		$('.header-promo-area').addClass('closed');
		    		$('.header-promo-area').removeClass('hard-open');
		  		} else {
		    		$('#header, #wrapper').removeClass("sticky2");
		    		$('#navigation').removeClass('scrolling');
		    		$('.header-promo-area').removeClass('closed');
		    		if ($(".header-promo-area").hasClass("hard-close")){
		    			
		    		} else {
		    			$('.header-promo-area').addClass('hard-open')
		    		}
		  		}
			}
		}
		
		var scrollPos = $(window).scrollTop();
		fTop2 = footerToggle.offset().top;
		var pColPos = $('.product-col-1').offset();
		
		   if (scrollPos > prevScroll){
			   //scroll down
			   if($(footerContainer).hasClass("stuck")){
				   if(fTop2 >= (getDocHeight() - 30) ){
					   footerContainer.addClass("open scrolled").removeClass("stuck");
					   footerOpen = true;
				   }
			   }
			   
			   if($('.product-set').length){
				   if($('#wrapper').width() >= 769){
					   //var pColPos = $('.product-col-1').offset();
					   var pCol = $('.product-col-1').height();
					   var pSetImg = $('.primaryimage-social').height();
					   var scrollDiff = pCol - pSetImg + 100;
					   
					   if(scrollPos > pColPos.top - 80){
						   $('.primaryimage-social').addClass("stickit");
					   }
					   
					   if(scrollPos > scrollDiff){
						   $('.primaryimage-social').removeClass("stickit").addClass("stickit-end");
					   }
				   }
			   }
			  
			   
		   } else {
			  //scroll up
				   if (fTop2 >= ($(window).scrollTop() + $(window).height() - 30) ) {
					   footerContainer.addClass("stuck").removeClass("open scrolled");
					   footerOpen = false;
				   }
				   if($('.product-set').length){
					   if($('#wrapper').width() >=769){
						   var pColPos = $('.product-col-1').offset();
						   var pCol = $('.product-col-1').height();
						   var mainContent = $('#main').offset();
						   var pSetImg = $('.primaryimage-social').height();
						   var scrollDiff = pColPos.top + pCol - pSetImg - 100;
						   if(scrollPos < scrollDiff){
							   $('.primaryimage-social').removeClass("stickit-end").addClass("stickit");
						   }
						   
						   if(!$('.blackfleece').length){
							   if(scrollPos < 165){
								   $('.primaryimage-social').removeClass("stickit");
							   }
						   }else{
							   if(scrollPos < 305){
								   $('.primaryimage-social').removeClass("stickit");
							   }
						   }
						   
					   }
				   }
		   }
		   prevScroll = scrollPos;
		
	}); 
	
	/*if ($("#wrapper").width() < 479){ //if mobile
		$("body").swipe( {
	        //Generic swipe handler for all directions
	        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
	        	if($("#wrapper").hasClass("promo-closed")){
		        	if(direction == "down"){
		        		alert("down")
		        	}
	        	}
	
	        },
	        //Default is 75px, set to 0 so any distance triggers swipe
	         threshold:75
	      });
	}*/
	
	var deviceAgent = navigator.userAgent.toLowerCase();
	var agentID = deviceAgent.match(/(ipad)/);
	if (agentID) {
		// set header to absolute - IOS fixed header fix, stop header from floating in 
    	// center of page
        $(document).on('focus', 'input', function(e) {
            $("body").addClass('fixfixed');
        })
        $(document).on('blur', 'input', function(e) {
        	$("body").removeClass('fixfixed');
        }); 
        
        $(".header-search input[type=text]").on('focus', function(e) {
        	$("body").scrollTo(0);
    	});
	}
	
	  if (!$.cookie('exclusive-promo')) {
	      $(".header-promo-area").removeClass('hard-close');
	      $(".header-promo-area").addClass("hard-open");
	      $("#wrapper").removeClass('promo-closed');
	      $("#wrapper").addClass("promo-open");
	      /*var promoPadding = $(".header-promo-area-wrapper").height() + 75;
	      $("#wrapper").css("padding-top", promoPadding + "px");*/
	  }
	  
	  $(".limited-time-excl, .promo-close").click(function(e) {
	    e.preventDefault();
	    $("body").scrollTo(0);
	    if($(".header-promo-area").hasClass("closed")){
	      $(".header-promo-area").removeClass("closed");
	      $("#wrapper").removeClass("promo-closed");
	      $("#wrapper").addClass("promo-open");
	      $(".header-promo-area").removeClass("hard-close");
	      $(".header-promo-area").addClass("hard-open");
	      $(".header-promo-area").stop().animate({
		        "height": headerPromoSize+"px",
		        "max-height": "500px"
		    }, 200);
	    } else if ($(".header-promo-area").hasClass("hard-close")){
	      $(".header-promo-area").removeClass("hard-close");
	      $(".header-promo-area").addClass("hard-open");
	      $("#wrapper").removeClass("promo-closed");
	      $("#wrapper").addClass("promo-open");
	      $(".header-promo-area").removeClass("closed");
	      $(".header-promo-area").stop().animate({
		        "height": headerPromoSize+"px",
		        "max-height": "500px"
		    }, 200);
	    } else {
	      $(".header-promo-area").addClass("hard-close");
	      $(".header-promo-area").removeClass("hard-open");
	      $("#wrapper").addClass("promo-closed");
	      $("#wrapper").removeClass("promo-open");
	      $(".header-promo-area").css({
		        "height": "0px",
		        "max-height": "0px"
		    });
	      $.cookie('exclusive-promo', "true", { path : '/' });
	    }
	  });
	
	// if has promo is closed on load then remove promo area padding
	if ($(".header-promo-area").hasClass("hard-close")){
		$("#wrapper").addClass("promo-closed");
		$("#wrapper").css("padding-top", "");
	}
	
	$('.limited-time-excl').hover(function() {
		$(".header-promo-area").toggleClass("nudge");
		$("#navigation").toggleClass("nudge");
	});
	
	$(".header-cart-products").mCustomScrollbar({
	    theme:"brooks"
	});
	
	if ($("body").hasClass("blackfleece")){
		var blackFleeceNoPromoSize = $("#header").height();
		var blackFleecePromoSize = $("#header").height() - $("#navigation").height();
	}
	
	// Toggle Menu
	//$("#wdc-accordion h3.toggle-menu-header").click(function(){
	$('#wdc-accordion h3.toggle-menu-header').live('click', '#wdc-accordion h3.toggle-menu-header', function(e) {
		//$("#wdc-accordion").find(".active").toggleClass("active"); 
		$(this).parent().toggleClass("active")
			.closest('.wdc-toggle-menu').siblings('.wdc-toggle-menu')
			.removeClass('active');
		
		//slide up all the link lists
		$("#wdc-accordion ul ul.toggle-menu-body-wrapper").slideUp(600);
		//slide down the link list below the h3 clicked - only if its closed
		if(!$(this).next().is(":visible"))
		{ 
			$(this).next().slideDown(600);
		}
	});
	
	// Single Toggle Menu
	//$("#wdc-accordion h3.toggle-menu-header").click(function(){
	$('#wdc-accordion-single h3.single-toggle-menu-header').live('click', '#wdc-accordion h3.single-toggle-menu-header', function(e) {
		//$("#wdc-accordion").find(".active").toggleClass("active"); 
		$(this).parent().toggleClass("active")
		
		//slide up all the link lists
		$("#wdc-accordion-single ul ul.toggle-menu-body-wrapper").slideUp(600);
		$('#wdc-accordion-single li.wdc-toggle-menu').removeClass("accordion-open");
		//slide down the link list below the h3 clicked - only if its closed
		if(!$(this).next().is(":visible"))
		{ 
			$(this).next().slideDown(600);
			
			function AccordionSetOpen(){
	        	$('#wdc-accordion-single li.wdc-toggle-menu').addClass("accordion-open");
	        }
			
			setTimeout(AccordionSetOpen,700); 
		}
	});
	
	/*
	$('#wdc-accordion-single h3.special-handling-header').live('click', '#wdc-accordion-single h3.special-handling-header', function(e) {
		var jqThis = $(this);
		app.PDP.toggleSpecialHandlingCheckbox(jqThis, jqThis.parent().hasClass("applied"));
	});
	*/
	
	setFeaturesList();
	
	function setFeaturesList(){
		var featuresBody = $('.pdp-main .product-col-2 .features-text .toggle-menu-body');
		var featuresList = $(featuresBody).find('.features-list');
		var itemCount = 0;
		
		$(featuresList).find('.features-list-item').each(function(index){
			itemCount ++;
			if(itemCount == 4){
				$(featuresBody).append('<ul class="features-list list2"></ul>')
			}
			
			if(itemCount >= 5){
				$(this).appendTo('.list2');
			}
		});
	};
	
	
	// toggle grid
	$('.grid-toggle').click(function() {
		$("#grid").toggleClass("show");
	});
	
	if ($(".product-col-1").hasClass("product-set")){
		$("#wrapper").addClass("product-set");
	}
	
	if ($("#wrapper").hasClass("pt_product-details")){
		$("body").addClass("pt_product-details_body");
	}
	
	if($('#wrapper').hasClass("pt_product-details")){
		if($('.golden-menu ul li').length > 3){
			$('.golden-menu ul').addClass("all");
		}
	}
    
}); //end doc-ready

var app = (function (app, $) {
    
    document.cookie="dw=1";
    /******** private functions & vars **********/

    if($('.leftNavCategoryHeader').text() == 'Women\'s Sale' ||
            $('.leftNavCategoryHeader').text() =='Men\'s Sale' || 
            $('.leftNavCategoryHeader').text() =='Girl\'s Sale' ||
            $('.leftNavCategoryHeader').text() =='Girls\' Sale' ||
            $('.leftNavCategoryHeader').text() =='Boys'||
            $('.leftNavCategoryHeader').text() =='Boys\' Sale'){
        $('.leftNavCategoryHeader').css('color','#B5124F');
        
    }
    $('.button-short-navy').click(
            function(){
                if($('#dwfrm_profile_customer_salutation_chzn span:first').text() == '--')
                {
                    $('#err-mes-to-add').css('top','-4px');
                    if($(window).width() < 750){
                        $('#err-mes span:first').text('Select A Title');
                        $('#err-mes span:first').css('font-size','11px');
                    }
                    else{
                        $('#err-mes span:first').text('SELECT A TITLE');
                    }
                }
                else{
                    $('#err-mes span:first').text('');
                }
            }
    );
    $('.form-row-button .apply-button').click(
            function(){
                if($('#dwfrm_profile_address_salutation_chzn span:first').text() == '--')
                {
                    //$('#err-mes-to-add').css('top','-10px');
                    
            
                    
                        $('#errmsg span:first').text('SELECT A TITLE');
                    
                }
                else{
                    $('#errmsg span:first').text('');
                }
            }
        );  
    var errAdded = $('#err-mes-to-add');
    errAdded.change(function(){
        if($('#dwfrm_profile_customer_salutation_chzn span:first').text() != '--'){
                $('#err-mes span:first').text('');
            }
    });
    
    
    //hook distinct error message - password required in submit form
    $('.submit-btn').click(
            function() {
            if ($('#dwfrm_login_password') == null
            || $('#dwfrm_login_password').val() == ""
            || $('#dwfrm_login_password').val() == undefined) {
            var hookErrorMsg = $("#hookErrorMsg");
            hookErrorMsg.addClass("er-password-required").text("A valid password is required.");

            }

    });
    //end of hook error message password required
        

    // cache dom elements accessed multiple times
    // app.ui holds globally available elements
    function initUiCache() {
        app.ui = {
            searchContainer           : $("#header div.header-search"),
            searchContainerResponsive : $("#header div.header-search"),
            printPage                 : $("a.print-page"),
            reviewsContainer          : $("#pwrwritediv"),
            main                      : $("#main"),
            primary                   : $("#primary"),
            secondary                 : $("#secondary"),

            // elements found in content slots
            slots : { }
        };
    }

    function initializeEvents() {
        var controlKeys = ["8", "13", "46", "45", "36", "35", "38", "37", "40", "39"];
        // apply dialogify event handler to all elements that match
        // one or more of the specified selectors
        $("body").on("click", ".dialogify, [data-dlg-options], [data-dlg-action]", app.util.setDialogify)
        .on("keydown", "textarea[data-character-limit]", function(e) {
            var text = $.trim($(this).val()),
                charsLimit = $(this).data("character-limit"),
                charsUsed = text.length;

                if ((charsUsed >= charsLimit) && (controlKeys.indexOf(e.which.toString()) < 0)) {
                    e.preventDefault();
                }
        })
        .on("change keyup mouseup", "textarea[data-character-limit]", function(e) {
            var text = $.trim($(this).val()),
                charsLimit = $(this).data("character-limit"),
                charsUsed = text.length,
                charsRemain = charsLimit - charsUsed;

            if(charsRemain < 0) {
                $(this).val( text.slice(0, charsRemain) );
                charsRemain = 0;
            }

            $(this).next('div.char-count').html("You have " + charsRemain + " characters left");
        });

        //initialize search suggestions
        app.searchsuggest.init(app.ui.searchContainer, app.resources.SIMPLE_SEARCH);
        app.searchsuggestResponsive.init(app.ui.searchContainerResponsive, app.resources.SIMPLE_SEARCH);

        // print handler
        app.ui.printPage.on("click", function () { window.print(); return false; });


        // add show/hide navigation elements
        $('.secondary-navigation .toggle').click(function(){
            $(this).toggleClass('expanded').next('ul').toggle();
        });

        // add generic toggle functionality
        $('.toggle').next('.toggle-content').hide();
        $('.toggle').click(function(){
            $(this).toggleClass('expanded').next('.toggle-content').toggle();
        });

        //Initialize Order History functions
        app.OrderHistory.init();

        /* START: Equal columns in the pages with a left nav
                  Usage: add the "left-tweak-jq" class to the element where the content is in the left nav, and "right-tweak-jq" to the element
                  which needs to get the height.
        */

        app.equalateThem.init();

        /* END: Equal columns in the pages with a left nav */

        /* START: Equal lines at the left and right of bottom footer (Copyright section) */

        app.equalateHRs.init();

        /* END: Equal lines at the left and right of bottom footer (Copyright section) */
    }

    function initializeDom() {
        // add class to html for css targeting
        $('html').addClass('js');
/*
        // load js specific styles
        try {
            app.util.loadCssFile(app.util.staticUrl("/css/js-style.css"));
        } catch(e) { }
        app.util.limitCharacters();
        */
    }


    // _app object
    // "inherits" app object via $.extend() at the end of this seaf (Self-Executing Anonymous Function
    var _app = {
        containerId     : "content",
        ProductCache    : null,  // app.Product object ref to the current/main product
        ProductDetail   : null,
        clearDivHtml    : '<div class="clear"></div>',
        currencyCodes   : app.currencyCodes || {}, // holds currency code/symbol for the site

        /**
         * @name init
         * @function
         * @description Master page initialization routine
         */
        init: function () {
            if (document.cookie.length === 0) {
                $("<div/>")
                    .addClass("browser-compatibility-alert")
                    .append(
                        $("<p/>")
                            .addClass("browser-error")
                            .html(app.resources.COOKIES_DISABLED)
                    )
                    .appendTo("#browser-check");
            }

            // init global cache
            initUiCache();

            // init global dom elements
            initializeDom();

            // init global events
            initializeEvents();

            // init local storage
            app.LocalStorage.init();
            app.RememberedItems.init();
            app.SavedPreferences.init();
            app.RecentlyViewedProducts.init();

            // Run Tasks
            app.TaskQueueManager.init();

            // BackToTop
            app.BackToTop.init();

            // init specific global components
            app.tooltips.init();
            app.minicart.init();
            app.headercart.init();
            app.validator.init();
            app.components.init();
            app.searchplaceholder.init();
            app.iesupportedplaceholder.init();
            
            app.UpDownInputs.init();
            app.ShoppingCart.init();
            app.Newsletter.init();
            app.SubmitBtnsCheck.init();
            app.PasswordValidationNotification.init();
            app.trimText.init();
            app.CustomSelects.init();
            app.promoMessageTweak.init();
            app.PSpadding.init();
            app.ScrollToError.init();
            app.GCCheckBalance.init();
            app.Omniture.init();
            app.ProductGrid.init();
            app.pageIndexSelector.init();
            app.FiftyOne.init();
            app.ProductSortingOptions.init();
            app.Footer.init();

            // execute page specific initializations
            var ns = app.page.ns;
            if (ns && app[ns] && app[ns].init) {
                app[ns].init();
            }
            
            // Apply custom form element styling
            if("CustomFormElements" in jQuery) {
                jQuery.CustomFormElements();
            }
        }
    };

    return $.extend(app, _app);
}(window.app = window.app || {}, jQuery));

// app.LocalStorage
(function (app, $) {
    app.LocalStorage = {
        available : (function() {
            var hasLocalStorage = (function() {
                if (typeof localStorage === 'undefined' ) {
                    return false;
                }

                try {
                    localStorage.setItem("check", "checked");
                    localStorage.removeItem("check");
                    return true;
                }
                catch(e) {
                    return false;
                }
            })();
            var hasPostMessage = (function() {
                if (typeof postMessage  === 'undefined' ) {
                    return false;
                }

                return true;
            })();

            return hasLocalStorage && hasPostMessage;
        })(),

        init : function() {
            if ( ! app.LocalStorage.available ) {
                return;
            }

            window.customerSettings = app.customerSettings.rememberedPreferences;
            $("body").append(
                $("<iframe />")
                    .css("display", "none")
                    .attr("id", "localStorageProxy")
                    .attr("src", app.urls.localStorageStart)
            );
        }
    };
}(window.app = window.app || {}, jQuery));

// app.RememberedItems
(function (app, $) {
    var chRememberedItems   = null;
    var channelIsReady      = false;
    var addProductModalOpen = false;
    var ns                  = {

        // Global
        Global : {
            updateCount : function (content) {

                // Set Akamai cookie flag if there are remembered items
                //if(content && content > 0) {
                    //app.util.setAkamaiCookie(0);
                //}

                $("#rememberedItemsCount").html(content);
            },

            doSync : function () {
                if (channelIsReady) {
                    chRememberedItems.call({
                        method  : "get",
                        params  : null ,
                        success : function(getResponse) {
                            var jsonObj   = JSON.parse(getResponse);
                            var needsSync = (function() {
                                if (!app.CurrentCustomer.authenticated) {
                                    return false;
                                }

                                if (jsonObj.h == app.CurrentCustomer.RememberedItems.h) {
                                    return false;
                                }

                                return true;
                            })();

                            if (needsSync) {
                                ns.Account.initSync();
                                $.ajax({
                                    type        : "POST",
                                    url         : app.urls.localStorageRememberedItems,
                                    contentType : 'application/json; charset=utf-8',
                                    data        : JSON.stringify({
                                        m : "sync",
                                        d : jsonObj.d
                                    }),
                                    dataType    : "json",
                                    success     : function(syncResponse) {
                                        chRememberedItems.call({
                                            method  : "set",
                                            params  : JSON.stringify({
                                                h : syncResponse.h,
                                                d : syncResponse.d
                                            }),
                                            success : function(setResponse) { }
                                        });
                                        ns.Global.updateCount(syncResponse.c);
                                        ns.Account.endSync();
                                    }
                                });
                            }
                            else {
                                ns.Global.updateCount(jsonObj.d.length);
                            }
                        }
                    });

                }
                else {
                    ns.Global.updateCount(app.CurrentCustomer.RememberedItems.c);
                }
            },

            doAddProductModal : function (currentProduct, latestProducts, callbackParams) {
                var ajaxRequest  = null;
                var $doAddDialog = $("<div>")
                    .attr("id", "dialog-remember-item")
                    .html( $("<div>").addClass("loading") );
                app.dialog.create({
                    target  : $doAddDialog,
                    options : {
                        width : "900",
                        height: "auto",
                        open  : function(event, ui) {
                            addProductModalOpen = true;
                            var $dlgThis = $(this);

                            // Bind Events
                            $doAddDialog.on("click", "a.btnCancel", function(event) {
                                /*
                                var productId = $(this).attr("data-product-id");

                                if (callbackParams.source == "ProductGrid" && callbackParams.cbFunction) {
                                    callbackParams.cbFunction(callbackParams.cbParams.productUid, callbackParams.cbParams.trackElem);
                                }

                                if (callbackParams.source == "ProductDetailPage" && callbackParams.cbFunction) {
                                    callbackParams.cbFunction(callbackParams.cbParams.$element, callbackParams.cbParams.productUid);
                                }

                                if (callbackParams.source == "Cart" && callbackParams.cbFunction) {
                                    callbackParams.cbFunction(callbackParams.cbParams.$element, callbackParams.cbParams.productUid);
                                }
                                */

                                $dlgThis.dialog("close");
                                event.preventDefault();
                            });

                            ajaxRequest = $.ajax({
                                type        : "POST",
                                url         : app.urls.rememberedItemsDialog,
                                contentType : 'application/json; charset=utf-8',
                                data        : JSON.stringify({
                                    CurrentItem : currentProduct,
                                    LatestItems : latestProducts
                                }),
                                dataType    : "html",
                                success     : function(data) {
                                    $doAddDialog.html(data);
                                    $productTiles = $doAddDialog.find(".product-tile");
                                    if ($productTiles.size() > 0) {
                                        $productTiles.syncHeight();
                                        $productTiles.each(function(idx) {
                                            $(this).data("idx", idx);
                                        });
                                    }
                                },
                                failure     : function(data) {
                                    reportError(app.resources.SERVER_ERROR);
                                },
                                complete    : function() {
                                    ajaxRequest = null;
                                }
                            });

                            /* Close the modal on clicking the overlay */
                            app.ClickOutsideModal.bindHere();

                        },
                        close : function(event, ui) {
                            addProductModalOpen = false;
                            if (ajaxRequest != null) {
                                ajaxRequest.abort();
                            }
                        }
                    }
                }).dialog("open");
            },

            addProductModalIsOpen : function () {
                return addProductModalOpen;
            },

            doAddProductModalMobile : function () {
                var topPos       = Math.round($(window).scrollTop() + ($(window).height() / 2));
                var $mobileModal = $(
                    $("<div>")
                        .addClass("remembered-item-message-mobile")
                        .append(
                            $("<div>")
                                .append( $("<span>").addClass("rimm-orange-text").html(app.resources.REMEMBERED_ITEMS_MOBILE_HEADER1) )
                                .append( $("<span>").addClass("rimm-gray-text"  ).html(app.resources.REMEMBERED_ITEMS_MOBILE_HEADER2) )
                        )
                        .css({"top" : topPos + "px"})
                );

                $("body").append($mobileModal);
                setTimeout(function() {
                    $mobileModal.remove();
                }, 3000);
            }
        },

        // Product Grid
        ProductGrid : {
            initPage : function () {
                var needsUpdate = ((typeof app.page.ns !== "undefined") && (app.page.ns == "search") && channelIsReady);
                if (needsUpdate) {
                    chRememberedItems.call({
                        method  : "get",
                        params  : null ,
                        success : function(getResponse) {
                            var jsonObj = JSON.parse(getResponse);
                            $("#productsearchresult-productgrid").find("li.grid-tile").each(function(index) {
                                var productId     = $(this).attr("data-item-id");
                                var productUid    = $(this).attr("data-item-uid");
                                var isRemembered  = ($.inArray(productId, jsonObj.d) != -1);
                                if (isRemembered) {
                                    $(this).attr("data-item-remembered", "y");
                                    var $pGridTooltip = $("#pGridTooltip" + productUid);
                                    if (!$pGridTooltip.hasClass("selected")) {
                                        $pGridTooltip.addClass("selected");
                                    }
                                }
                            });
                        }
                    });
                }
            },

            /**
             * Initializes the remember item tooltip functionality when its enabled.
             */
            initTooltips : function(container, target) {
                var showTooltip = app.LocalStorage.available;
                window.modalTimeout = false;

                if (showTooltip) {

                    /**
                     * click handler for the "remember" button. (Un)remembers the clicked item.
                     */
                    $(document).on('click', '.pgrid-remember-tooltip .hover-tooltip .rememberBtn', function(event) {

                        var target = $(this).parent().parent().find("a");
                        var isRemembered = ns.ProductGrid.getRemembered($(target));
                        var productUid   = ns.ProductGrid.getProductUid($(target));
                        if (isRemembered) {
                            ns.ProductGrid.doDel(productUid, this);
                        }
                        else {
                            ns.ProductGrid.doAdd(productUid, this);
                        }
                        event.preventDefault();
                    });

                    /**
                     * Click handler for the "learn more" link in remember tooltip.
                     */
                    $(document).on('click', '.pgrid-remember-tooltip .hover-tooltip .rememberInfoText img', function(event) {
                        if(!window.modalTimeout) {
                            $('.pgrid-remember-tooltip .hover-tooltip .rememberInfoTextExpanded').show();
                            $('.pgrid-remember-tooltip .hover-tooltip .rememberInfoText').hide();

                            // IE fix for selectors
                            if(jQuery.browser.msie) {
                                window.modalTimeout = true;
                                window.setTimeout(function() { window.modalTimeout = false; }, 100);
                            }
                        }
                    });

                    /**
                     * Click handler for the expanded "learn more" DIV. A click on it closes it.
                     */
                    $(document).on('click', '.pgrid-remember-tooltip .hover-tooltip .rememberInfoTextExpanded', function() {
                        $('.pgrid-remember-tooltip .hover-tooltip .rememberInfoTextExpanded').hide();
                        $('.pgrid-remember-tooltip .hover-tooltip').hide();
                    });

                    /**
                     * Mouseenter handler for the remember start icon. Expands the remember button.
                     * for mobile devices this should be modified
                     */
                    $(document).on('mouseover', '.pgrid-remember-tooltip a', function() {
                        // Do not show the tooltip on mobile
                        if (app.responsive && app.responsive.isMobileLayout()) {
                            return;
                        }

                        $(this).parent().find("div.hover-tooltip").stop(true, true).fadeIn("300");
                    }).on('click', '.pgrid-remember-tooltip a', function(event) {
                        // Remember item on star click only on mobile
                        if (app.responsive && app.responsive.isMobileLayout()) {
                            var isRemembered = ns.ProductGrid.getRemembered($(this));
                            var productUid   = ns.ProductGrid.getProductUid($(this));

                            if (isRemembered) {
                                ns.ProductGrid.doDel(productUid, this);
                            }
                            else {
                                ns.ProductGrid.doAdd(productUid, this);
                            }
                        }

                        event.preventDefault();
                    });


                    /**
                     * Mouseleave handler for the remember button.
                     */
                    $(document).on('mouseleave', '.pgrid-remember-tooltip .hover-tooltip', function() {
                        if(!window.modalTimeout) {
                            $("div.hover-tooltip").stop(true, true).fadeOut("300");

                            // Make sure the remember this explanation is hidden on mouseout
                            $('.pgrid-remember-tooltip .hover-tooltip .rememberInfoTextExpanded').hide();
                            $('.pgrid-remember-tooltip .hover-tooltip .rememberInfoText').show();
                        }
                    });
                }
            },

            initButtons : function(container, target) { },

            getRemembered : function ($child) {
                var $parent = $child.parents("li.grid-tile").first();
                return (($parent.size() > 0)
                    && (typeof $parent.attr("data-item-remembered") !== "undefined")
                    && ($parent.attr("data-item-remembered") == "y"));
            },

            getProductUid : function ($child) {
                var $parent = $child.parents("div.product-tile").first();
                return ((($parent.size() > 0) && (typeof $parent.attr("id") !== "undefined"))
                    ? $parent.attr("id")
                    : null );
            },

            updateProducts : function ($gridTile, method) {

                if ($gridTile.size() > 0) {
                    if (method == "add") {
                        $gridTile.attr("data-item-remembered", "y");

                        var $tooltipStar = $gridTile.find("div.pgrid-remember-tooltip a").first();
                        if (($tooltipStar.size() > 0) && !$tooltipStar.hasClass("selected")) {
                            $tooltipStar.addClass("selected");
                        }

                        var $rememberItemButton = $gridTile.find("a#rememberitembutton").first();
                        if (($rememberItemButton.size() > 0) && !$rememberItemButton.hasClass("selected")) {
                            $rememberItemButton.addClass("selected");
                        }
                    }

                    if (method == "del") {
                        $gridTile.attr("data-item-remembered", "n");

                        var $tooltipStar = $gridTile.find("div.pgrid-remember-tooltip a").first();
                        if (($tooltipStar.size() > 0) && $tooltipStar.hasClass("selected")) {
                            $tooltipStar.removeClass("selected");
                        }

                        var $rememberItemButton = $gridTile.find("a#rememberitembutton").first();
                        if (($rememberItemButton.size() > 0) && $rememberItemButton.hasClass("selected")) {
                            $rememberItemButton.removeClass("selected");
                        }
                    }
                }
            },

            doAdd : function (productUid, trackElem) {
                if (productUid == null) {
                    return;
                }

                var $prodTile = $("#" + productUid);
                var $gridTile = $prodTile.parents("li.grid-tile").first();
                var productId = $prodTile.attr("data-itemid");
                var requestInProgress = (function() {
                    return ((typeof $prodTile.data("requestInProgress") !== "undefined")
                        && ($prodTile.data("requestInProgress") == 'y'));
                })();
                if (requestInProgress) {
                    return;
                }

                $prodTile.data("requestInProgress", "y");
                $.ajax({
                    type        : "POST",
                    url         : app.urls.localStorageRememberedItems,
                    contentType : 'application/json; charset=utf-8',
                    data        : JSON.stringify({
                        m : "add",
                        d : [productId]
                    }),
                    dataType    : "json",
                    success     : function(jsAddResponse) {
                        var isAuthenticated = (jsAddResponse.s === "authenticated");
                        if (isAuthenticated) {
                            ns.Global.updateCount(jsAddResponse.c);

                            // Fade out the remember this button
                            $("div.hover-tooltip").stop(true, true).fadeOut("300");

                            if (app.responsive && app.responsive.isMobileLayout()) {
                                ns.Global.doAddProductModalMobile();
                            }
                            else {
                                /* !ProductGrid - doAddProductModal */
                                ns.Global.doAddProductModal(productId, jsAddResponse.p, {
                                    source     : "ProductGrid",
                                    cbFunction : ns.ProductGrid.doDel,
                                    cbParams   : {
                                        productUid : productUid,
                                        trackElem  : trackElem
                                    }
                                });
                            }

                            ns.ProductGrid.updateProducts($gridTile, "add");

                            if (channelIsReady) {
                                chRememberedItems.call({
                                    method  : "add",
                                    params  : JSON.stringify([productId]),
                                    success : function(chAddResponse) { }
                                });
                            }

                            // Reload remembered items product grid if we are on account page
                            ns.Account.reloadProductGrid();
                        }
                        else {
                            if (channelIsReady) {
                                chRememberedItems.call({
                                    method  : "add",
                                    params  : JSON.stringify([productId]) ,
                                    success : function(chAddResponse) {
                                        var jsonObj = JSON.parse(chAddResponse);
                                        ns.Global.updateCount(jsonObj.c);

                                        if (app.responsive && app.responsive.isMobileLayout()) {
                                            ns.Global.doAddProductModalMobile();
                                        }
                                        else {
                                            /* !ProductGrid - doAddProductModal */
                                            ns.Global.doAddProductModal(productId, jsonObj.p, {
                                                source     : "ProductGrid",
                                                cbFunction : ns.ProductGrid.doDel,
                                                cbParams   : {
                                                    productUid : productUid,
                                                    trackElem  : trackElem
                                                }
                                            });
                                        }

                                        ns.ProductGrid.updateProducts($gridTile, "add");
                                    }
                                });
                            }
                        }
                        app.Omniture.trackLinkRemberedItemAdd(productId, trackElem);
                    },
                    failure     : function(data) {
                        reportError(app.resources.SERVER_ERROR);
                    },
                    complete    : function() {
                        $prodTile.data("requestInProgress", "n");
                    }
                });
            },

            doDel : function (productUid, trackElem) {
                if (productUid == null) {
                    return;
                }

                var $prodTile = $("#" + productUid);
                var $gridTile = $prodTile.parents("li.grid-tile").first();
                var productId = $prodTile.attr("data-itemid");
                var requestInProgress = (function() {
                    return ((typeof $prodTile.data("requestInProgress") !== "undefined")
                        && ($prodTile.data("requestInProgress") == 'y'));
                })();
                if (requestInProgress) {
                    return;
                }

                $prodTile.data("requestInProgress", "y");
                $.ajax({
                    type        : "POST",
                    url         : app.urls.localStorageRememberedItems,
                    contentType : 'application/json; charset=utf-8',
                    data        : JSON.stringify({
                        m : "del",
                        d : [productId]
                    }),
                    dataType    : "json",
                    success     : function(jsDelResponse) {
                        var isAuthenticated = (jsDelResponse.s === "authenticated");
                        if (isAuthenticated) {
                            ns.Global.updateCount(jsDelResponse.c);
                            ns.ProductGrid.updateProducts($gridTile, "del");

                            // Fade out the remember this button
                            $("div.hover-tooltip").stop(true, true).fadeOut("300");

                            if (channelIsReady) {
                                chRememberedItems.call({
                                    method  : "del",
                                    params  : JSON.stringify([productId]),
                                    success : function(chDelResponse) { }
                                });
                            }

                            // Reload remembered items product grid if we are on account page
                            ns.Account.reloadProductGrid();
                        }
                        else {
                            if (channelIsReady) {
                                chRememberedItems.call({
                                    method  : "del",
                                    params  : JSON.stringify([productId]) ,
                                    success : function(chDelResponse) {
                                        var jsonObj = JSON.parse(chDelResponse);
                                        ns.Global.updateCount(jsonObj.c);
                                        ns.ProductGrid.updateProducts($gridTile, "del");
                                    }
                                });
                            }
                        }
                        app.Omniture.trackLinkRemberedItemDel(productId, trackElem);
                    },
                    failure     : function(data) {
                        reportError(app.resources.SERVER_ERROR);
                    },
                    complete    : function() {
                        $prodTile.data("requestInProgress", "n");
                    }
                });
            }
        },

        // Product Detail Page
        ProductDetail : {
            initPage : function () {

                var needsUpdate = (function() {
                    var isProductPage = ((typeof app.page.ns !== "undefined")
                        && (app.page.ns == "product"));
                    return (isProductPage && channelIsReady);
                })();

                if (needsUpdate) {
                    chRememberedItems.call({
                        method  : "get",
                        params  : null ,
                        success : function(getResponse) {
                            var jsonObj = JSON.parse(getResponse);

                            $(".pdp-remember-tooltip a").each(function(index) {
                                var productId    = $(this).attr("data-item-id");
                                var productUid   = $(this).attr("data-item-uid");
                                var isRemembered = (($.inArray(productId, jsonObj.d) != -1) || ($(this).attr("data-item-remembered") == "y"));
                                if (isRemembered) {
                                    $(this).attr("data-item-remembered", "y");
                                    if (!$(this).hasClass("selected")) {
                                        $(this).addClass("selected");
                                    }
                                }
                            });

                            $(".pdp-remember-button").each(function(index) {
                                var productId    = $(this).attr("data-item-id");
                                var productUid   = $(this).attr("data-item-uid");
                                var isRemembered = (($.inArray(productId, jsonObj.d) != -1) || ($(this).attr("data-item-remembered") == "y"));
                                if (isRemembered) {
                                    $(this).attr("data-item-remembered", "y");
                                    $(this).html(app.resources.REMEMBERED_ITEMS_REMEMBERED);

                                    if (!$(this).hasClass("selected")) {
                                        $(this).addClass("selected");
                                    }
                                }
                            });
                        }
                    });
                }

                $(".golden-menu .infohelp").on('click', function(e) {
                    ns.ProductDetail.initCustServiceModal(e, this);
                });

                ns.ProductDetail.initTrackingHandlers();


                /*
                 * Monogramming related logic to prevent 'BTW Placket & Pocket (Vertical)' and
                 * 'Diamond Serif' being selected together
                 */

                // Apply onle for special handling code 'ME'
                if( $('.pd-expandable.specialhandling').attr('data-optionvalue') == 'ME' ) {

                    // Determine current product id and location select element
                    var monoJustChanged = false;
                    var productID = $('#pid').val();
                    var selectedLocation = $('#specialhandling-a-style-4').closest('div.to-expand').find('#specialhandling'+productID+'-location');

                    // Click handler for special handling style
                    $('a.specialHandlingStyle').on('click', function(e) {
                    	
                        // 'Diamond Serif' icon
                        if( $(this).attr('id') == 'specialhandling-a-style-4' ) {
                        	$('div.required-initials').show();
                            // Hide 'BTW Placket & Pocket (Vertical)' location in select
                            $(selectedLocation).find("option[value='BTW Placket & Pocket (Vertical)']").hide();

                            // Check selected location
                            if( selectedLocation.val() == 'BTW Placket & Pocket (Vertical)' ) {

                                // Reset location
                                selectedLocation.find('option').first().attr('selected',true);
                            }

                            monoJustChanged = true;
                            selectedLocation.change();
                        }

                        // Different icon
                        else {
                        	$('div.required-initials').hide();
                            $(selectedLocation).find("option[value='BTW Placket & Pocket (Vertical)']").show();
                            selectedLocation.change();
                        }
                    });

                    // Click handler for the location select
                    selectedLocation.on('change', function(e) {

                        // 'BTW Placket & Pocket (Vertical)' option selected
                        if( selectedLocation.val() == 'BTW Placket & Pocket (Vertical)' ) {
                            $('#specialhandling-a-style-4').hide();

                            // Check selected font
                            if( $('#specialhandling-a-style-4').parent().hasClass('selected') ) {

                                // Reset font
                                $('#specialhandling-a-style-1').click();
                            }

                        }

                        // Different option selected
                        else {

                            // Make sure to hide the font icon only if the change event hasn't
                            // been fired by the script itself
                            if(!monoJustChanged) {
                                $('#specialhandling-a-style-4').show();
                            } else {
                                monoJustChanged = false;
                            }

                        }
                    });
                }

                // Scroll to bazaar voice ratings section in case the URL param
                // 'scrollToRatings' had been set.
                if(window.scrollToRatings) {
                    if(jQuery.browser.webkit) {
                        $(document.body).animate({ 'scrollTop':   $('#BVRRWidgetID').offset().top+'px' }, 2000);
                    }

                    else {
                        $("html").animate({ 'scrollTop': $('#BVRRWidgetID').height()+1150 }, 2000);
                    }
                }
            },

            /**
             * Init customer service modal handler
             */
            initCustServiceModal: function(e, elem) {

                e.preventDefault();
                var jqThis = $(elem);

                cid = jqThis.data("cid");
                shcode = jqThis.data("shcode");
                scroltoheight = jqThis.data("scroltoheight");
                scrolldetails = jqThis.data("scrolldetails");

                if(cid == "PDP-shipping" || cid == "PDP-returns" || cid == "PDP-help"){
                    var pid = $("span[itemprop='productID']").text();
                    ns.ProductDetail.openCustServiceModal(cid, "1", shcode);
                }
                else{
                    ns.ProductDetail.openCustServiceModal(cid, "1", shcode, pid, scroltoheight, scrolldetails);

                }
            },

            /**
             * Tracking handlers for different PDP sub sections
             */
            initTrackingHandlers: function() {

                // Size guide
                $('.attribute a.guide.size-guide').on('click', function() { 
                    ns.ProductDetail.addTrackingHandler('size guide', 'event65', 'size guide viewed');
                });

                // Fit guide
                $('.attribute a.guide.fit-guide').on('click', function() {
                    ns.ProductDetail.addTrackingHandler('fit guide', 'event66', 'fit guide viewed');
                });

                if( $(".product-actions .golden-menu .infohelp").length > 0) {

                    // Monogramming
                    $(".product-actions .golden-menu .infohelp.PDP-monogramming").on('click', function() {
                        ns.ProductDetail.addTrackingHandler('monogramming', 'event67', 'product customer service viewed');
                    });

                    // Alterations
                    $(".product-actions .golden-menu .infohelp.PDP-alterations").on('click', function() {
                        ns.ProductDetail.addTrackingHandler('alterations', 'event67', 'product customer service viewed');
                    });

                    // Shipping
                    $(".product-actions .golden-menu .infohelp.PDP-shipping").on('click', function() {
                        ns.ProductDetail.addTrackingHandler('shipping info', 'event67', 'product customer service viewed');
                    });

                    // Returns
                    $(".product-actions .golden-menu .infohelp.PDP-returns").on('click', function() {
                        ns.ProductDetail.addTrackingHandler('return policy', 'event67', 'product customer service viewed');
                    });

                    // Help
                    $(".product-actions .golden-menu .infohelp.PDP-help").on('click', function() {
                        ns.ProductDetail.addTrackingHandler('help', 'event67', 'product customer service viewed');
                    });
                }
            },

            /**
             * Tracking handlers for different PDP sub sections (Modal)
             */
            initModalTrackingHandlers: function() {
                if( $("#dialog-info .golden-menu .infohelp").length > 0) {

                    // Monogramming
                    $("#dialog-info .golden-menu .infohelp.PDP-monogramming").on('click', function() {
                        ns.ProductDetail.addTrackingHandler('monogramming', 'event67', 'product customer service viewed');
                    });

                    // Alterations
                    $("#dialog-info .golden-menu .infohelp.PDP-alterations").on('click', function() {
                        ns.ProductDetail.addTrackingHandler('alterations', 'event67', 'product customer service viewed');
                    });

                    // Shipping
                    $("#dialog-info .golden-menu .infohelp.PDP-shipping").on('click', function() {
                        ns.ProductDetail.addTrackingHandler('shipping info', 'event67', 'product customer service viewed');
                    });

                    // Returns
                    $("#dialog-info .golden-menu .infohelp.PDP-returns").on('click', function() {
                        ns.ProductDetail.addTrackingHandler('return policy', 'event67', 'product customer service viewed');
                    });

                    // Help
                    $("#dialog-info .golden-menu .infohelp.PDP-help").on('click', function() {
                        ns.ProductDetail.addTrackingHandler('help', 'event67', 'product customer service viewed');
                    });
                }
            },

            /**
             * Add a handler to trigger tracking event for a PDP sub section.
             */
            addTrackingHandler: function(pageName, events, contextAction) {

                // Tracking object existent?
                if(s) {

                    // Set pageName
                    var orgPageName = s.pageName;
                    if(s.pageName.indexOf('> full view') != -1) {
                        s.pageName = s.pageName.substring(0, s.pageName.length - 11);
                    }
                    s.pageName += ' > '+pageName;

                    // Set products and events
                    if(s.products.match(/;/g).length > 1) {
                        s.products = s.products.substring(0, s.products.indexOf(';', 1) );
                    }
                    s.events = events;

                    // Trigger tracking
                    s.contextData['action'] = contextAction;
                    s.t();
                    s.pageName = orgPageName;
                }
            },

            /**
             * Open the customer service modal
             */
            openCustServiceModal: function(infoId, servicemenu, shcode, pid, scroltoheight, scrolldetails) {
                var data = {cid: infoId, servicemenu: servicemenu};
                if(shcode != undefined){
                    data.specialhandlingcode = shcode;
                }
                if(pid != undefined){
                    data.pid = pid;
                }


                $.ajax({
                    type     : "POST",
                    url      : app.urls.pageInclude,
                    data     : data,
                    dataType : "html",
                    success  : function(data) {
                        app.dialog.create({
                            target  : $("<div>").attr("id", "dialog-info").html(data),
                            options : { width: "729", height: "609" }
                        }, ns.ProductDetail.initModalTrackingHandlers).dialog("open");
                        ns.ProductDetail.initModalTrackingHandlers();

                        if(scroltoheight != undefined && scrolldetails != undefined){
                            $(scrolldetails).css("position", "relative");
                            $(scrolldetails).animate({ scrollTop:0 }, 0);
                            $(scrolldetails).animate({ scrollTop:scroltoheight }, 1000);
                        }
                    },
                    failure  : function(data) {
                        reportError(app.resources.SERVER_ERROR);
                    }
                });
            },

            initQuickView : function () {
                var needsUpdate = (function() {
                    var isQuickView = app.quickView.isOpen();
                    return (isQuickView && channelIsReady);
                })();
                if (needsUpdate) {
                    chRememberedItems.call({
                        method  : "get",
                        params  : null ,
                        success : function(getResponse) {
                            var jsonObj = JSON.parse(getResponse);

                            $(".pdp-remember-tooltip a").each(function(index) {
                                var productId    = $(this).attr("data-item-id");
                                var productUid   = $(this).attr("data-item-uid");
                                var isRemembered = (($.inArray(productId, jsonObj.d) != -1) || ($(this).attr("data-item-remembered") == "y"));
                                if (isRemembered) {
                                    $(this).attr("data-item-remembered", "y");
                                    if (!$(this).hasClass("selected")) {
                                        $(this).addClass("selected");
                                    }
                                }
                           });

                            $(".pdp-remember-button").each(function(index) {
                                var productId    = $(this).attr("data-item-id");
                                var productUid   = $(this).attr("data-item-uid");
                                var isRemembered = (($.inArray(productId, jsonObj.d) != -1) || ($(this).attr("data-item-remembered") == "y"));
                                if (isRemembered) {
                                    $(this).attr("data-item-remembered", "y");
                                    $(this).html(app.resources.REMEMBERED_ITEMS_REMEMBERED);

                                    if (!$(this).hasClass("selected")) {
                                        $(this).addClass("selected");
                                    }
                                }
                            });
                        }
                    });
                }
            },

            initButton : function () {
                $("div#pdpMain").on("click", ".pdp-remember-button", function(event) {
                    var productUid   = $(this).attr("data-item-uid");
                    var isRemembered = $(this).attr("data-item-remembered") == "y";
                    if (isRemembered) {
                        ns.ProductDetail.doDel($(this), productUid);
                    }
                    else {
                        ns.ProductDetail.doAdd($(this), productUid);
                    }
                    event.preventDefault();
                });
            },

            initTooltip : function() {
                $("div#pdpMain").on("click", ".pdp-remember-tooltip a", function(event) {
                    var productUid   = $(this).attr("data-item-uid");
                    var isRemembered = $(this).attr("data-item-remembered") == "y";
                    if (isRemembered) {
                        ns.ProductDetail.doDel($(this), productUid);
                    }
                    else {
                        ns.ProductDetail.doAdd($(this), productUid);
                    }
                    event.preventDefault();
                });
            },

            updateProducts : function(productUid, method) {
                $(".pdp-remember-tooltip a").each(function(index) {
                    var thisProductId  = $(this).attr("data-item-id");
                    var thisProductUid = $(this).attr("data-item-uid");
                    var isThisProduct  = (thisProductUid == productUid);
                    if (isThisProduct) {
                        if (method == "add") {
                            $(this).attr("data-item-remembered", "y");

                            if (!$(this).hasClass("selected")) {
                                $(this).addClass("selected");
                            }
                        }

                        if (method == "del") {
                            $(this).attr("data-item-remembered", "n");

                            if ($(this).hasClass("selected")) {
                                $(this).removeClass("selected");
                            }
                        }
                    }
                });

                $(".pdp-remember-button").each(function(index) {
                    var thisProductId  = $(this).attr("data-item-id");
                    var thisProductUid = $(this).attr("data-item-uid");
                    var isThisProduct  = (thisProductUid == productUid);
                    if (isThisProduct) {
                        if (method == "add") {
                            $(this).attr("data-item-remembered", "y");
                            $(this).html(app.resources.REMEMBERED_ITEMS_REMEMBERED);

                            if (!$(this).hasClass("selected")) {
                                $(this).addClass("selected");
                            }
                        }

                        if (method == "del") {
                            $(this).attr("data-item-remembered", "n");
                            $(this).html(app.resources.REMEMBERED_ITEMS_REMEMBER);

                            if ($(this).hasClass("selected")) {
                                $(this).removeClass("selected");
                            }
                        }
                    }
                });

                var $pgridGrid = $("#productsearchresult-productgrid");
                if ($pgridGrid.size() > 0) {
                    $pgridGrid.find("li.grid-tile").each(function(index) {
                        var thisTileUid = $(this).attr("data-item-uid");
                        var isThisTile  = (thisTileUid == productUid);
                        if (isThisTile) {
                            ns.ProductGrid.updateProducts($(this), method);
                        }
                    });
                }
            },

            doAdd : function ($element, productUid) {
                var productId         = $element.attr("data-item-id");
                var requestInProgress = $element.data("requestInProgress") == 'y';
                if (requestInProgress) {
                    return;
                }

                $element.data("requestInProgress", "y");
                $.ajax({
                    type        : "POST",
                    url         : app.urls.localStorageRememberedItems,
                    contentType : 'application/json; charset=utf-8',
                    data        : JSON.stringify({
                        m : "add",
                        d : [productId]
                    }),
                    dataType    : "json",
                    success     : function(jsAddResponse) {
                        var isAuthenticated = (jsAddResponse.s === "authenticated");
                        if (isAuthenticated) {
                            ns.Global.updateCount(jsAddResponse.c);


                            if (app.responsive && app.responsive.isMobileLayout()) {
                                ns.Global.doAddProductModalMobile();
                            }
                            else {
                                /* !ProductDetailPage - doAddProductModal */
                                ns.Global.doAddProductModal(productId, jsAddResponse.p, {
                                    source     : "ProductDetailPage"
                                });
                            }

                            ns.ProductDetail.updateProducts(productUid, "add");

                            if (channelIsReady) {
                                chRememberedItems.call({
                                    method  : "add",
                                    params  : JSON.stringify([productId]),
                                    success : function(chAddResponse) { }
                                });
                            }

                            // Reload remembered items product grid if we are on account page
                            ns.Account.reloadProductGrid();
                        }
                        else {
                            if (channelIsReady) {
                                chRememberedItems.call({
                                    method  : "add",
                                    params  : JSON.stringify([productId]),
                                    success : function(chAddResponse) {
                                        var jsonObj = JSON.parse(chAddResponse);
                                        ns.Global.updateCount(jsonObj.c);

                                        if (app.responsive && app.responsive.isMobileLayout()) {
                                            ns.Global.doAddProductModalMobile();
                                        }
                                        else {
                                            /* !ProductDetailPage - doAddProductModal */
                                            ns.Global.doAddProductModal(productId, jsonObj.p, {
                                                source     : "ProductDetailPage"
                                            });
                                        }

                                        ns.ProductDetail.updateProducts(productUid, "add");
                                    }
                                });
                            }
                        }
                        app.Omniture.trackLinkRemberedItemAdd(productId, $element[0]);
                    },
                    failure     : function(data) {
                        reportError(app.resources.SERVER_ERROR);
                    },
                    complete    : function() {
                        $element.data("requestInProgress", "n");
                    }
                });
            },

            doDel : function ($element, productUid) {
                var productId         = $element.attr("data-item-id");
                var requestInProgress = $element.data("requestInProgress") == 'y';
                if (requestInProgress) {
                    return;
                }

                $element.data("requestInProgress", "y");
                $.ajax({
                    type        : "POST",
                    url         : app.urls.localStorageRememberedItems,
                    contentType : 'application/json; charset=utf-8',
                    data        : JSON.stringify({
                        m : "del",
                        d : [productId]
                    }),
                    dataType    : "json",
                    success     : function(jsDelResponse) {
                        var isAuthenticated = (jsDelResponse.s === "authenticated");
                        if (isAuthenticated) {
                            ns.Global.updateCount(jsDelResponse.c);
                            ns.ProductDetail.updateProducts(productUid, "del");

                            if (channelIsReady) {
                                chRememberedItems.call({
                                    method  : "del",
                                    params  : JSON.stringify([productId]),
                                    success : function(chDelResponse) { }
                                });
                            }

                            // Reload remembered items product grid if we are on account page
                            ns.Account.reloadProductGrid();
                        }
                        else {
                            if (channelIsReady) {
                                chRememberedItems.call({
                                    method  : "del",
                                    params  : JSON.stringify([productId]) ,
                                    success : function(chDelResponse) {
                                        var jsonObj = JSON.parse(chDelResponse);
                                        ns.Global.updateCount(jsonObj.c);
                                        ns.ProductDetail.updateProducts(productUid, "del");
                                    }
                                });
                            }
                        }
                        app.Omniture.trackLinkRemberedItemDel(productId, $element[0]);
                    },
                    failure     : function(data) {
                        reportError(app.resources.SERVER_ERROR);
                    },
                    complete    : function() {
                        $element.data("requestInProgress", "n");
                    }
                });
            }
        },

        Cart : {
            initPage : function () {
                var needsUpdate = (function() {
                    var isCartPage = ((typeof app.page.ns !== "undefined")
                        && (app.page.ns == "cart"));
                    return (isCartPage && channelIsReady);
                })();
                if (needsUpdate) {
                    chRememberedItems.call({
                        method  : "get",
                        params  : null ,
                        success : function(getResponse) {
                            var jsonObj = JSON.parse(getResponse);

                            $(".cart-remember-button").each(function(index) {
                                var productId    = $(this).attr("data-item-id");
                                var productUid   = $(this).attr("data-item-uid");
                                var isRemembered = ($.inArray(productId, jsonObj.d) != -1);
                                if (isRemembered) {
                                    $(this).attr("data-item-remembered", "y");
                                    $(this).find("span:first").html(app.resources.REMEMBERED_ITEMS_REMEMBERED);
                                    if (!$(this).hasClass("selected")) {
                                        $(this).addClass("selected");
                                    }
                                }
                           });
                        }
                    });
                }
                
                // Donation tracking code
                if( $('#donation-viewdetails a').exists() && app.siteCatalystEnabled && s ) {
                    $('#donation-viewdetails a').on('click', function() {
                        var donationName = $(this).data("donationname");
                        s.pageName="donation > "+donationName+" > view details";
                        s.channel="donation";
                        s.prop4="donation";
                        s.t();
                    });
                }
            },

            initTooltip : function () {
                var showTooltip = app.LocalStorage.available;
                if (showTooltip) {
                    $(".cart-remember-button").on("mouseenter", function(event) {
                        $(this).siblings("div.cart-remember-tooltip:first").find("div.hover-tooltip:first").stop(true, true).fadeIn("300");
                    }).on("mouseleave", function(event) {
                        $(this).siblings("div.cart-remember-tooltip:first").find("div.hover-tooltip:first").stop(true, true).fadeOut("300");
                    });
                }
            },

            initButton : function () {
                $(".cart-remember-button").click(function(event) {
                    var productId    = $(this).attr("data-item-id");
                    var productUid   = $(this).attr("data-item-uid");
                    var isRemembered = $(this).attr("data-item-remembered") == "y";
                    if (isRemembered) {
                        ns.Cart.doDel($(this), productUid);
                    }
                    else {
                        ns.Cart.doAdd($(this), productUid);
                    }
                    event.preventDefault();
                });
            },

            updateProducts : function(productUid, method) {
                $(".cart-remember-button").each(function(index) {
                    var thisProductId  = $(this).attr("data-item-id");
                    var thisProductUid = $(this).attr("data-item-uid");
                    var isThisProduct  = (thisProductUid == productUid);
                    if (isThisProduct) {
                        if (method == "add") {
                            $(this).attr("data-item-remembered", "y");
                            $(this).find("span:first").html(app.resources.REMEMBERED_ITEMS_REMEMBERED);

                            if (!$(this).hasClass("selected")) {
                                $(this).addClass("selected");
                            }
                        }

                        if (method == "del") {
                            $(this).attr("data-item-remembered", "n");
                            $(this).find("span:first").html(app.resources.REMEMBERED_ITEMS_REMEMBER);

                            if ($(this).hasClass("selected")) {
                                $(this).removeClass("selected");
                            }
                        }
                    }
                });
            },

            doAdd : function ($element, productUid) {
                var productId         = $element.attr("data-item-id");
                var requestInProgress = $element.data("requestInProgress") == 'y';
                if (requestInProgress) {
                    return;
                }

                $element.data("requestInProgress", "y");
                $.ajax({
                    type        : "POST",
                    url         : app.urls.localStorageRememberedItems,
                    contentType : 'application/json; charset=utf-8',
                    data        : JSON.stringify({
                        m : "add",
                        d : [productId]
                    }),
                    dataType    : "json",
                    success     : function(jsAddResponse) {
                        var isAuthenticated = (jsAddResponse.s === "authenticated");
                        if (isAuthenticated) {
                            ns.Global.updateCount(jsAddResponse.c);

                            if (app.responsive && app.responsive.isMobileLayout()) {
                                ns.Global.doAddProductModalMobile();
                            }
                            else {
                                /* !Cart - doAddProductModal */
                                ns.Global.doAddProductModal(productId, jsAddResponse.p, {
                                    source     : "Cart"
                                });
                            }

                            ns.Cart.updateProducts(productUid, "add");

                            if (channelIsReady) {
                                chRememberedItems.call({
                                    method  : "add",
                                    params  : JSON.stringify([productId]),
                                    success : function(chAddResponse) { }
                                });
                            }
                        }
                        else {
                            if (channelIsReady) {
                                chRememberedItems.call({
                                    method  : "add",
                                    params  : JSON.stringify([productId]) ,
                                    success : function(chAddResponse) {
                                        var jsonObj = JSON.parse(chAddResponse);
                                        ns.Global.updateCount(jsonObj.c);

                                        if (app.responsive && app.responsive.isMobileLayout()) {
                                            ns.Global.doAddProductModalMobile();
                                        }
                                        else {
                                            /* !Cart - doAddProductModal */
                                            ns.Global.doAddProductModal(productId, jsonObj.p, {
                                                source     : "Cart"
                                            });
                                        }

                                        ns.Cart.updateProducts(productUid, "add");
                                    }
                                });
                            }
                        }
                    },
                    failure     : function(data) {
                        reportError(app.resources.SERVER_ERROR);
                    },
                    complete    : function() {
                        $element.data("requestInProgress", "n");
                    }
                });
            },

            doDel : function ($element, productUid) {
                var productId         = $element.attr("data-item-id");
                var requestInProgress = $element.data("requestInProgress") == 'y';
                if (requestInProgress) {
                    return;
                }

                $element.data("requestInProgress", "y");
                $.ajax({
                    type        : "POST",
                    url         : app.urls.localStorageRememberedItems,
                    contentType : 'application/json; charset=utf-8',
                    data        : JSON.stringify({
                        m : "del",
                        d : [productId]
                    }),
                    dataType    : "json",
                    success     : function(jsDelResponse) {
                        var isAuthenticated = (jsDelResponse.s === "authenticated");
                        if (isAuthenticated) {
                            ns.Global.updateCount(jsDelResponse.c);
                            ns.Cart.updateProducts(productUid, "del");

                            if (channelIsReady) {
                                chRememberedItems.call({
                                    method  : "del",
                                    params  : JSON.stringify([productId]),
                                    success : function(chDelResponse) { }
                                });
                            }
                        }
                        else {
                            if (channelIsReady) {
                                chRememberedItems.call({
                                    method  : "del",
                                    params  : JSON.stringify([productId]) ,
                                    success : function(chDelResponse) {
                                        var jsonObj = JSON.parse(chDelResponse);
                                        ns.Global.updateCount(jsonObj.c);
                                        ns.Cart.updateProducts(productUid, "del");
                                    }
                                });
                            }
                        }
                    },
                    failure     : function(data) {
                        reportError(app.resources.SERVER_ERROR);
                    },
                    complete    : function() {
                        $element.data("requestInProgress", "n");
                    }
                });
            }
        },

        Account : {
            initSync : function () {
                var needsSync = (function() {
                    var isAccountPage = ((typeof app.page.ns !== "undefined")
                        && (app.page.ns == "account"));
                    return (isAccountPage && $("#remembereditems-productgrid").size() > 0);
                })();
                if (needsSync) {
                    var $riGridContainer = $("#remembereditems-productgrid-container");
                    var $riGridResults   = $("#remembereditems-productgrid");

                    $riGridContainer.block({
                        message : '<div class="blockUILoader"></div>',
                        css : {
                            width  : '40%',
                            top    : '200px',
                            border : '2px solid #aaa'
                        },
                        overlayCSS : {
                            backgroundColor : '#fff'
                        },
                        centerY : false
                    });
                }
            },

            endSync : function () {
                var needsSync = (function() {
                    var isAccountPage = ((typeof app.page.ns !== "undefined")
                        && (app.page.ns == "account"));
                    return (isAccountPage && $("#remembereditems-productgrid").size() > 0);
                })();
                if (needsSync) {
                    var $riGridContainer = $("#remembereditems-productgrid-container");
                    var $riGridResults   = $("#remembereditems-productgrid");
                    var requestUrl       = app.util.appendParamToURL(app.urls.myAccountRememberedItems, "format", "ajax");
                    $riGridResults.load(requestUrl, function() {
                        $riGridContainer.unblock();
                    });
                }
            },

            initButtons : function () {
                var $riGridContainer = $("#remembereditems-productgrid-container");
                var $riGridResults   = $("#remembereditems-productgrid");
                if ($riGridResults.size() > 0) {
                    $riGridResults.on("click", "a.remove-button", function(e) {
                        var productUid = $(this).attr("data-item-uid");
                        ns.ProductGrid.doDel(productUid);
                    });
                }
            },

            reloadProductGrid : function () {
                var needsReload = (function() {
                    var isAccountPage = ((typeof app.page.ns !== "undefined")
                        && (app.page.ns == "account"));
                    return (isAccountPage && $("#remembereditems-productgrid").size() > 0);
                })();
                if (needsReload) {
                    var functionArguments = arguments;
                    var $riGridContainer  = $("#remembereditems-productgrid-container");
                    var $riGridResults    = $("#remembereditems-productgrid");

                    $riGridResults.find("div.hover-tooltip").each(function(index) {
                        $(this).hide();
                    });

                    $riGridContainer.block({
                        message : '<div class="blockUILoader"></div>',
                        css : {
                            width  : '40%',
                            top    : '200px',
                            border : '2px solid #aaa'
                        },
                        overlayCSS : {
                            backgroundColor : '#fff'
                        },
                        centerY : false
                    });

                    var $sOptP1    = $("select#sort-by-p1");
                    var $sOptP2    = $("select#sort-by-p2");
                    var optP1      = $sOptP1.find("option:selected").val();
                    var optP2      = $sOptP2.find("option:selected").val();

                    var requestUrl = app.urls.myAccountRememberedItems;
                    if (optP1.length > 0) { requestUrl = app.util.appendParamToURL(requestUrl, "byp1", optP1); }
                    if (optP2.length > 0) { requestUrl = app.util.appendParamToURL(requestUrl, "byp2", optP2); }
                    requestUrl = app.util.appendParamToURL(requestUrl, "format", "ajax");

                    $sOptP1.attr("disabled", "disabled").trigger("liszt:updated");
                    $sOptP2.attr("disabled", "disabled").trigger("liszt:updated");

                    $riGridResults.load(requestUrl, function() {
                        var noResults = $riGridResults.find("div.no-items").size() > 0;
                        if (noResults) {
                            var optP1Data = $riGridResults.find("div#remembereditems-productgrid-datawrapper").data("sortByP1");
                            var optP2Data = $riGridResults.find("div#remembereditems-productgrid-datawrapper").data("sortByP2");

                            $("div#remembereditems-header").find("div.sort-by-row").hide();
                            $riGridResults.find("div#remembereditems-productgrid-datawrapper").show();
                        }

                        if (functionArguments.length > 0) {
                            if (typeof functionArguments[0] === "function") {
                                functionArguments[0]();
                            }
                        }

                        $sOptP1.removeAttr("disabled").trigger("liszt:updated");
                        $sOptP2.removeAttr("disabled").trigger("liszt:updated");

                        $riGridContainer.unblock();
                        location.reload();// fix to reload grid window
                    });
                }
            },

            sortProductGrid : function (optP1, optP2, callback) {
                var $riGridContainer = $("#remembereditems-productgrid-container");
                var $riGridResults   = $("#remembereditems-productgrid");

                var noResults = $riGridResults.find("div.no-items").size() > 0;
                if (noResults) {
                    return;
                }

                $riGridResults.find("div.hover-tooltip").each(function(index) {
                    $(this).hide();
                });

                $riGridContainer.block({
                    message : '<div class="blockUILoader"></div>',
                    css     : {
                        width  : '40%',
                        top    : '200px',
                        border : '2px solid #aaa'
                    },
                    overlayCSS : {
                        backgroundColor : '#fff'
                    },
                    centerY : false
                });

                var requestUrl = app.urls.myAccountRememberedItems;
                if (optP1.length > 0) { requestUrl = app.util.appendParamToURL(requestUrl, "byp1", optP1); }
                if (optP2.length > 0) { requestUrl = app.util.appendParamToURL(requestUrl, "byp2", optP2); }
                requestUrl = app.util.appendParamToURL(requestUrl, "format", "ajax");

                $riGridResults.load(requestUrl, function() {
                    if (typeof callback == "function") {
                        callback();
                    }
                    $riGridContainer.unblock();
                });
            }
        }
    };


    app.RememberedItems = {
        Global: {
            addProductModalIsOpen   : ns.Global.addProductModalIsOpen,
            doAddProductModalMobile : ns.Global.doAddProductModalMobile
        },

        ProductGrid : {
            initPage     : ns.ProductGrid.initPage,
            initTooltips : ns.ProductGrid.initTooltips,
            initButtons  : ns.ProductGrid.initButtons
        },

        ProductDetail : {
            initPage      : ns.ProductDetail.initPage,
            initQuickView : ns.ProductDetail.initQuickView,
            initButton    : ns.ProductDetail.initButton,
            initTooltip   : ns.ProductDetail.initTooltip
        },

        Cart : {
            initPage    : ns.Cart.initPage,
            initTooltip : ns.Cart.initTooltip,
            initButton  : ns.Cart.initButton
        },

        Account : {
            initButtons       : ns.Account.initButtons,
            reloadProductGrid : ns.Account.reloadProductGrid,
            sortProductGrid   : ns.Account.sortProductGrid
        },

        init : function() {
            if (app.CurrentCustomer) {
                if ( app.LocalStorage.available ) {
                    chRememberedItems = Channel.build({
                        window  : document.getElementById("localStorageProxy").contentWindow,
                        origin  : "*",
                        scope   : "RememberedItems",
                        onReady : function() {
                            channelIsReady = true;
                            ns.Global.doSync();
                            ns.ProductGrid.initPage();
                            ns.ProductDetail.initPage();
                            ns.Cart.initPage();
                        }
                    });
                }
                else {
                    ns.Global.doSync();
                }
            }
        }
    };
}(window.app = window.app || {}, jQuery));

// app.SavedPreferences
(function (app, $) {
    var chSavedPreferences   = null;
    var channelIsReady       = false;
    var dialogOpened         = false;

    function dialogIsOpened() {
        return dialogOpened;
    }

    function doInitMainMenuLinks() {
        if (channelIsReady) {
            chSavedPreferences.call({
                method  : "get",
                params  : { customerSettings : window.customerSettings },
                success : function(getResponse) {
                    var jsonPreferenceObj  = JSON.parse(getResponse);
                    var preferenceObjCache = null;
                    var getSavedPreference = function(cat) {
                        if (preferenceObjCache === null) {
                            preferenceObjCache = {};
                            for (var i = 0; i < jsonPreferenceObj.d.length; i++) {
                                var pref = jsonPreferenceObj.d[i];
                                preferenceObjCache[pref.c] = pref;
                            }
                        }

                        return (cat in preferenceObjCache) ? preferenceObjCache[cat] : null;
                    }

                    $("a.svdprefs-hook").each(function(index) {
                        var hasHref  = ((typeof $(this).attr("href")             !== "undefined") && ($(this).attr("href").length             > 0));
                        var hasCatId = ((typeof $(this).attr("data-category-id") !== "undefined") && ($(this).attr("data-category-id").length > 0));
                        if (hasHref && hasCatId) {
                            var href    = $(this).attr("href");
                            var catID   = $(this).attr("data-category-id");
                            var uri     = app.util.getUri(href);
                            var catPref = getSavedPreference(catID);

                            if (catPref != null) {
                                var newHref = href;
                                var prefNr  = 1;

                                if (catPref.f != "") {
                                    newHref = app.util.appendParamToURL(newHref, "prefn" + prefNr, "fit");
                                    newHref = app.util.appendParamToURL(newHref, "prefv" + prefNr, catPref.f);
                                    prefNr++;
                                }

                                if (catPref.s != "") {
                                    newHref = app.util.appendParamToURL(newHref, "prefn" + prefNr, "size");
                                    newHref = app.util.appendParamToURL(newHref, "prefv" + prefNr, catPref.s);
                                    prefNr++;
                                }

                                $(this).attr("href", newHref);
                            }
                        }
                    });
                }
            });
        }
    }

    function doInitPage() {
        var needsUpdate = (function() {
            var isSearchPage = ((typeof app.page.ns !== "undefined")
                && (app.page.ns == "search"));
            return (isSearchPage
                &&  app.CurrentCustomer.SavedPreferences.e
                && !app.CurrentCustomer.authenticated
                &&  channelIsReady);
        })();
        if (needsUpdate) {
            var $preferencesBar = $("div#user-preferences-bar");
            if ($preferencesBar.size() > 0) {
                var categoryId = $preferencesBar.attr("data-category-id");
                chSavedPreferences.call({
                    method  : "getCategory",
                    params  : categoryId,
                    success : function(getResponse) {
                        var jsonObj    = JSON.parse(getResponse);
                        var isVisible  = jsonObj.h !== "y";
                        var displayBar = false;

                        $preferencesBar.attr("data-hidden"   , jsonObj.h);
                        $preferencesBar.attr("data-user-fit" , jsonObj.f);
                        $preferencesBar.attr("data-user-size", jsonObj.s);

                        var $prefBarSize = $("#preference-bar-refinement-size");
                        var $prefBarFit  = $("#preference-bar-refinement-fit");

                        var userSize     = $preferencesBar.attr("data-user-size");
                        var requestSize  = $preferencesBar.attr("data-request-size");
                        var userFit      = $preferencesBar.attr("data-user-fit");
                        var requestFit   = $preferencesBar.attr("data-request-fit");

                        if ($prefBarSize.size() > 0) {
                            var hasUserSize    = (typeof userSize    !== "undefined" && userSize.length    > 0);
                            var hasRequestSize = (typeof requestSize !== "undefined" && requestSize.length > 0);

                            if(hasUserSize) {
                                $prefBarSize.html(userSize);
                            }
                            else if(hasRequestSize) {
                                $prefBarSize.html(requestSize);
                            }
                            else {
                                $prefBarSize.html("&mdash;");
                            }

                            displayBar = displayBar /*|| hasUserSize*/ || hasRequestSize;
                        }

                        if ($prefBarFit.size() > 0) {
                            var hasUserFit    = (typeof userFit    !== "undefined" && userFit.length    > 0);
                            var hasRequestFit = (typeof requestFit !== "undefined" && requestFit.length > 0);

                            if(hasUserFit) {
                                $prefBarFit.html(userFit);
                            }
                            else if(hasRequestFit) {
                                $prefBarFit.html(requestFit);
                            }
                            else {
                                $prefBarFit.html("&mdash;");
                            }

                            displayBar = displayBar /*|| hasUserFit*/ || hasRequestFit;
                        }

                        if (displayBar) {
                            if (isVisible) {
                                $("div#user-preferences-bar div.preference-bar-visible").show();
                                $("div#user-preferences-bar div.preference-bar-hidden" ).hide();
                            }
                            else {
                                $("div#user-preferences-bar div.preference-bar-visible").hide();
                                $("div#user-preferences-bar div.preference-bar-hidden" ).show();
                            }
                        }
                    }
                });
            }
        }
    }

    function doInitButtons() {
        $("div#user-preferences-bar").on("click", "a#preferences-bar-dohide", function(event) {
            var categoryId = $("div#user-preferences-bar").attr("data-category-id");

            $("div#user-preferences-bar").attr("data-hidden", "y")
            $("div#user-preferences-bar div.preference-bar-visible").hide();
            $("div#user-preferences-bar div.preference-bar-hidden" ).show();

            $.ajax({
                type        : "POST",
                url         : app.urls.localStorageSavedPreferences,
                contentType : 'application/json; charset=utf-8',
                data        : JSON.stringify({
                    m : "hide",
                    c : categoryId
                }),
                dataType    : "json",
                success     : function(data) {},
                failure     : function(data) {
                    reportError(app.resources.SERVER_ERROR);
                }
            });

            if (channelIsReady) {
                chSavedPreferences.call({
                    method  : "hide",
                    params  : categoryId,
                    success : function(chAddResponse) { }
                });
            }

            event.preventDefault();
        }).on("click", "a#preferences-bar-doshow", function(event) {
            var categoryId = $("div#user-preferences-bar").attr("data-category-id");

            $("div#user-preferences-bar").attr("data-hidden", "n")
            $("div#user-preferences-bar div.preference-bar-visible").show();
            $("div#user-preferences-bar div.preference-bar-hidden" ).hide();

            $.ajax({
                type        : "POST",
                url         : app.urls.localStorageSavedPreferences,
                contentType : 'application/json; charset=utf-8',
                data        : JSON.stringify({
                    m : "show",
                    c : categoryId
                }),
                dataType    : "json",
                success     : function(data) {},
                failure     : function(data) {
                    reportError(app.resources.SERVER_ERROR);
                }
            });

            if (channelIsReady) {
                chSavedPreferences.call({
                    method  : "show",
                    params  : categoryId,
                    success : function(chAddResponse) { }
                });
            }

            event.preventDefault();
        }).on("click", "a#preferences-bar-dosave", function(event) {
            var categoryId     = $("div#user-preferences-bar").attr("data-category-id");
            var refinementFit  = $("div#user-preferences-bar").attr("data-request-fit");
            var refinementSize = $("div#user-preferences-bar").attr("data-request-size");
            var ajaxRequest    = null;
            var $doAddDialog   = $("<div>")
                .attr("id", "dialog-saved-preference")
                .html( $("<div>").addClass("loading") );

            if (channelIsReady) {
                app.dialog.create({
                    target  : $doAddDialog,
                    options : {
                        width : "542",
                        height: "auto",
                        open  : function(event, ui) {
                            dialogOpened = true;
                            chSavedPreferences.call({
                                method  : "getPreferencesAndItems",
                                params  : null,
                                success : function(chGetResponse) {
                                    var jsonObj = JSON.parse(chGetResponse);
                                    var cpObj   = {
                                        c : categoryId,
                                        s : refinementSize,
                                        f : refinementFit
                                    };

                                    ajaxRequest = $.ajax({
                                        type        : "POST",
                                        url         : app.urls.savedPreferencesDialog,
                                        contentType : 'application/json; charset=utf-8',
                                        data        : JSON.stringify({
                                            sp : jsonObj.sp,
                                            ri : jsonObj.ri,
                                            cp : cpObj,
                                            rf : window.location.href
                                        }),
                                        dataType    : "html",
                                        success     : function(data) {
                                            var $data = $(data);

                                            var $ihCategory = $data.find("input#dwfrm_login_prefCategory");
                                            if ($ihCategory.size() > 0) {
                                                $ihCategory.val(cpObj.c);
                                            }

                                            var $ihSize = $data.find("input#dwfrm_login_prefSize");
                                            if ($ihSize.size() > 0) {
                                                $ihSize.val(cpObj.s);
                                            }

                                            var $ihFit = $data.find("input#dwfrm_login_prefFit");
                                            if ($ihFit.size() > 0) {
                                                $ihFit.val(cpObj.f);
                                            }

                                            var $ihUrl = $data.find("input#dwfrm_login_prefUrl");
                                            if ($ihUrl.size() > 0) {
                                                $ihUrl.val(window.location.href);
                                            }

                                            var $tspContentAsset = $data.find("div#thanks-saved-preferences");
                                            if ($tspContentAsset.size() > 0) {
                                                //User is authenticated
                                                chSavedPreferences.call({
                                                    method  : "save",
                                                    params  : JSON.stringify({
                                                        c : cpObj.c,
                                                        s : cpObj.s,
                                                        f : cpObj.f
                                                    }),
                                                    success : function(chAddResponse) { }
                                                });
                                            }

                                            $doAddDialog.html($data);
                                            app.validator.init();

                                            /* Close the modal on clicking the overlay */
                                            app.ClickOutsideModal.bindHere();
                                        },
                                        failure     : function(data) {
                                            reportError(app.resources.SERVER_ERROR);
                                        },
                                        complete    : function() {
                                            ajaxRequest = null;
                                        }
                                    });
                                }
                            });
                        },
                        close : function(event, ui) {
                            dialogOpened = false;

                            if (ajaxRequest != null) {
                                ajaxRequest.abort();
                            }

                            $(this).dialog("destroy").remove();
                        }
                    }
                }).dialog("open");
            }

            event.preventDefault();
        }).on("click", "a#preferences-bar-doclear", function(event) {
            var categoryId  = $("div#user-preferences-bar").attr("data-category-id");
            var newLocation = $(this).attr("href");

            $("div#user-preferences-bar div.preference-bar-visible").hide();
            $("div#user-preferences-bar div.preference-bar-hidden" ).hide();

            $.ajax({
                type        : "POST",
                url         : app.urls.localStorageSavedPreferences,
                contentType : 'application/json; charset=utf-8',
                data        : JSON.stringify({
                    m : "clear",
                    c : categoryId
                }),
                dataType    : "json",
                success     : function(data) {
                    if (channelIsReady) {
                        chSavedPreferences.call({
                            method  : "clear",
                            params  : categoryId,
                            success : function(chAddResponse) {
                                window.location.href = newLocation;
                            }
                        });
                    }
                    else {
                        window.location.href = newLocation;
                    }
                },
                failure     : function(data) {
                    reportError(app.resources.SERVER_ERROR);
                }
            });

            event.preventDefault();
        });
    }

    function doSavePreferencesDialog(pParams) {
        var $thankYouDialog = $("<div>")
            .attr("id", "dialog-saved-preference")
            .html( $("<div>").addClass("loading") );

        app.dialog.create({
            target  : $thankYouDialog,
            options : {
                width : "542",
                height: "auto",
                open  : function(event, ui) {
                    var contentAssetUrl = app.util.appendParamToURL(app.urls.pageInclude, "cid", "thanks-saved-preferences");
                    $thankYouDialog.load(contentAssetUrl, function() {
                        var spCategory = pParams.c;
                        var spFit      = pParams.f;
                        var spSize     = pParams.s;
                        var spUrl      = pParams.u;

                        var hasCategory = ((typeof spCategory === "string") && (spCategory.length > 0));
                        var hasFit      = (hasCategory && (typeof spFit  === "string") && (spFit.length  > 0));
                        var hasSize     = (hasCategory && (typeof spSize === "string") && (spSize.length > 0));
                        var hasData     = (hasFit || hasSize);

                        var redirectToBackURL = ((typeof spUrl === "string") && (spUrl.length > 0));

                        if (hasData && channelIsReady) {
                            chSavedPreferences.call({
                                method  : "save",
                                params  : JSON.stringify({
                                    c : spCategory,
                                    s : spSize,
                                    f : spFit
                                }),
                                success : function(chAddResponse) {
                                    if (redirectToBackURL) {
                                        setTimeout(function() { window.location.href = spUrl; }, 3000);
                                    }

                                    /* Close the modal on clicking the overlay */
                                    app.ClickOutsideModal.bindHere();
                                }
                            });
                        }
                        else {
                            if (redirectToBackURL) {
                                setTimeout(function() { window.location.href = spUrl; }, 3000);
                            }
                        }
                    });
                },
                close : function(event, ui) {
                   $(this).dialog("destroy").remove();
                }
            }
        }).dialog("open");
    }

    app.SavedPreferences = {
        init : function () {
            if ( app.LocalStorage.available ) {
                chSavedPreferences = Channel.build({
                    window  : document.getElementById("localStorageProxy").contentWindow,
                    origin  : "*",
                    scope   : "SavedPreferences",
                    onReady : function() {
                        channelIsReady = true;
                        doInitMainMenuLinks();
                        doInitPage();
                        doInitButtons();
                        app.TaskQueueManager.initSavedPreferences();
                    }
                });
            }
        },

        initPage              : doInitPage,
        initButtons           : doInitButtons,
        savePreferencesDialog : doSavePreferencesDialog,
        dialogIsOpened        : dialogIsOpened
    };
}(window.app = window.app || {}, jQuery));

// app.RecentlyViewedProducts
(function (app, $) {
    var chRecentlyViewedProducts = null;
    var channelIsReady           = false;

    app.RecentlyViewedProducts = {
        initPage : function () {
            if (channelIsReady) {
                var productId = $("#pdpMain").attr("data-product-id");
                if (productId) {
                    chRecentlyViewedProducts.call({
                        method  : "add",
                        params  : JSON.stringify([productId]),
                        success : function(chAddResponse) { }
                    });
                }

                var $rvps = $("#recently-viewed-products");
                var isPdp = (($rvps.size() > 0)
                    && (typeof app.page.ns !== "undefined")
                    && (app.page.ns == "product"));
                if (isPdp) {
                    chRecentlyViewedProducts.call({
                        method  : "get",
                        params  : null,
                        success : function(chGetResponseJSON) {
                            $rvps.html( $("<div>").addClass("loading") );
                            $.ajax({
                                type        : "POST",
                                url         : app.urls.recentlyViewedProducts,
                                contentType : 'application/json; charset=utf-8',
                                data        : chGetResponseJSON,
                                dataType    : "html",
                                success     : function(data) {
                                    $rvps.html( data );
                                    var $productTiles = $rvps.find(".product-tile");
                                    if ($productTiles.size() > 0) {
                                        $productTiles.each(function(idx) {
                                            $(this).data("idx", idx);
                                        });
                                    }else{
                                    	$rvps.hide();
                                    }
                                    app.Omniture.addRememberedItemsURLParam();
                                    
                                    if($('#wrapper').width() <= 767){
                                    	$('#recently-viewed-products').addClass('flexslider');
                                        $('#recently-viewed-products.flexslider > ul').addClass('slides');
                                        $('#recently-viewed-products.flexslider').flexslider({
                                            animation: "slide",
                                            slideshow: false,
                                            itemWidth: 104,
                                            animationLoop: false,
                                            controlNav: false,
                                            reverse: true,
                                            directionNav: false
                                          });
                                    }
                                },
                                failure     : function(data) {
                                    reportError(app.resources.SERVER_ERROR);
                                }
                            });

                        }
                    });
                }
            }
        },

        init : function () {
            if ( app.LocalStorage.available ) {
                chRecentlyViewedProducts = Channel.build({
                    window  : document.getElementById("localStorageProxy").contentWindow,
                    origin  : "*",
                    scope   : "RecentlyViewedProducts",
                    onReady : function() {
                        channelIsReady = true;
                        app.RecentlyViewedProducts.initPage();
                    }
                });
            }
        }
    };
}(window.app = window.app || {}, jQuery));

// app.BackToTop
(function (app, $) {
    app.BackToTop = {
        init : function() {
            var $navigation     = $("#navigation");
            var $pGridContainer = $("#productsearchresult-productgrid-container");
            var $pGrid          = $("#productsearchresult-productgrid");
            var $psContentRight = $("#productsearch-content-right");
            var showBackToTop   = $pGridContainer.size() > 0;

            if (showBackToTop) {
                var $backToTopContainer = $("<div>").css({
                    "position" : "relative"
                }).addClass("rsp-backtotop");
                var $backToTopSpan = $("<span>").css({
                    "position" : "absolute",
                    "display"  : "none",
                    "right"    : "-58px"
                });
                var $backToTopImage = $("<img>", {
                    "src"    : app.urls.staticBackToTopImg,
                    "usemap" : "#backToTopImageMap"
                });
                var $backToTopImageMap = $("<map>", {
                    "name" : "backToTopImageMap"
                });
                var $backToTopImageMapArea = $("<area>", {
                    "shape"  : "poly",
                    "coords" : "0,6,32,6,37,1,42,6,75,6,75,53,0,53,0,6",
                    "href"   : "javascript:void(0);"
                });

                $pGridContainer.prepend(
                    $backToTopContainer.append(
                        $backToTopSpan
                            .append($backToTopImage)
                            .append($backToTopImageMap.append($backToTopImageMapArea))
                    )
                );

                $backToTopImageMapArea.on("click", function() {
                    $.scrollTo(0, 400);
                });
                
                $("#mobile-back-to-top").on("click", function() {
                    $.scrollTo(0, 400);
                });

                $(window).scroll(function() {
                    var sCurrentPosition         = $(window).scrollTop();
                    var backToTopShouldBeVisible = (($(window).height() / 2.0 + sCurrentPosition - ($backToTopSpan.width() / 2.0)) > $psContentRight.offset().top)
                        && ($psContentRight.outerHeight() > $(window).scrollTop())
                        && sCurrentPosition != 0;
                    var backToTopIsVisible       = $backToTopSpan.is(":visible");

                    if (backToTopShouldBeVisible) {
                        if (!backToTopIsVisible) {
                            spanToTopSpanTop = -($backToTopSpan.height() / 2.0);

                            $backToTopSpan.css({
                                "position" : "fixed",
                                "top"      : "50%",
                                "margin-top" : spanToTopSpanTop,
                                "right"    : "20px",
                                "z-index"  : 9999999
                            }).fadeIn(700);
                        }
                    }
                    else {
                        $backToTopSpan.css({
                            "top" : "0px"
                        });

                        if (backToTopIsVisible) {
                            $backToTopSpan.hide();
                        }
                    }
                });
            }
        }
    };
}(window.app = window.app || {}, jQuery));

// app.UpDownInputs
(function (app, $) {
    app.UpDownInputs = {
        init : function () {
            $(document).on('click', '.input-updown a.goup', function(){
                var $this = this,
                    actualInp = $($this).parents('.input-wrapper').find('input'),
                    actualVal = parseInt(actualInp.attr('value'), 10);
                if (actualVal < 0) {
                    actualInp.attr('value', '0');
                }
                else {
                    actualInp.attr('value', actualVal + 1);
                }
                actualInp.change();
                return false;
            });
            $(document).on('click', '.input-updown a.godown', function(){
                var $this = this,
                    actualInp = $($this).parents('.input-wrapper').find('input'),
                    actualVal = parseInt(actualInp.attr('value'), 10);
                if (!actualVal == 0) {
                    actualInp.attr('value', actualVal - 1);
                }
                if (actualVal < 0) {
                    actualInp.attr('value', '0');
                }
                actualInp.change();
                return false;
            });
        }
    };
}(window.app = window.app || {}, jQuery));

// app.SubmitBtnsCheck - for all forms in page - add the "searchFormInPage" class in order to work
// If value of the input field is default or empty upon submit, the action is halted

(function (app, $) {
    app.SubmitBtnsCheck = {
        init : function () {
            var $searchContainer = $(document);
            var $searchForm      = $searchContainer.find("form.searchFormInPage");
            var $searchField     = $searchForm.find("input[name='q']");
            var $defaultValue    = $searchField.val();
            $searchForm.submit(function (e) {
                e.preventDefault();
                var searchTerm = $searchField.val();
                if(searchTerm === $defaultValue || searchTerm.length === 0) {
                    return false;
                }
                window.location = app.util.appendParamToURL($(this).attr("action"), "q", searchTerm);
            });
        }
    };
}(window.app = window.app || {}, jQuery));

//app.PDP - Product Detail Page
(function (app, $) {
    app.PDP = {

        toggleSpecialHandlingCheckbox : function (elem, checked) {

              var pdexpandableDiv = elem.parents(".pd-expandable");

              var specialHandlingOptionValue = pdexpandableDiv.data("optionvalue");
              var specialHandlingNoValue = pdexpandableDiv.data("optionnovalue");

              if(checked){
                pdexpandableDiv.find(".specialHandlingOption").val(specialHandlingOptionValue);
              }
              else{
                pdexpandableDiv.find(".specialHandlingOption").val(specialHandlingNoValue);
              }
        },

        toggleToEnvelopeCheckbox : function () {
            var pdexpandableDiv = jQuery(".pd-expandable"),
                checkbox = pdexpandableDiv.find(".to-envelope span"),
                values = false,
                same = true;

            pdexpandableDiv.find("div.envelope .address input").each(function () {
                var jqInput = $(this),
                    sheetid = jqInput.attr("id").replace("envelope", "sheet"),
                    sheetInput = jqInput.parents("div.to-expand").find("input#" + sheetid).first();

                if(sheetInput == null){
                    return;
                }
                var sheetValue = sheetInput.val(),
                    envValue = jqInput.val();

                if((sheetValue != "" && sheetValue != sheetInput.attr("placeholder")) || (envValue != "" && envValue != jqInput.attr("placeholder"))){
                    values = true;
                    if(sheetValue != envValue) {
                        same = false;
                        return false;
                    }
                }
            });

            if(values && same){
                checkbox.removeClass("elem-checkbox");
            }
            else{
                checkbox.addClass("elem-checkbox");
            }
        },

        getSpecialHandlingParams : function(data) {
            var params = "";
            if (data != null) {
                var pdexpandableDiv = jQuery(".pd-expandable.specialhandling");

                if(pdexpandableDiv != null && pdexpandableDiv.length > 0){

                    var isQuickView = (pdexpandableDiv.parents("#QuickViewDialog").length > 0);
                    var hrefdata = "";

                    // First process form data and only take the inputs within the special handling div
                    var parts = data.split("&");
                    for (var i = 0; i < parts.length; i++) {
                        var pair = parts[i].split("=");
                        elemid = pair[0];
                        var elem = pdexpandableDiv.find("input[name='" + elemid + "'], select[name='" + elemid + "']");
                        if (elem != null && elem.length > 0) {
                            var pname = elem.first().data("pname");
                            var key = pname != null && pname != "" ? pname : pair[0];
                            params += (params.length > 0 ? "&" : "") + key + (pair.length > 1 ? "=" + pair[1] : "");
                        }
                    }
                }
            }
            return params;
        },

        initSpecialHandlingSlider : function() {
            var jqThis = jQuery('.specialhandling h3 a.shtoggle');
            var pdexpandableDiv = jQuery(".pd-expandable.specialhandling");

            if(!jqThis.hasClass('not-expanded') && jqThis.parents("#QuickViewDialog").length == 0){
                jqThis.toggleClass("not-expanded");
                var pdexpandableDiv = jqThis.parents(".pd-expandable");

                pdexpandableDiv.find("div.to-expand").css("display", "none");

                setTimeout(function() {
                    jqThis.click();
                }, 1000);
            }

            app.PDP.toggleToEnvelopeCheckbox();
        }
    };
}(window.app = window.app || {}, jQuery));

//app.ShoppingCart - Product Detail Page
(function (app, $) {
    app.ShoppingCart = {
        init : function () {

            $("div#wrapper.pt_cart div#main div.wrapper-cart div.cart-coupon-code button#coupon-apply").click(function(){
                var $this = this;
                $($this).parents("div.cart-coupon-code").fadeOut(600, function(){
                    $("div#wrapper.pt_cart div#main div.wrapper-cart div.code-new").fadeIn(600);
                });
                return false;
            });
            $("div#wrapper.pt_cart div#main div.wrapper-cart div.code-new button#coupon-remove").click(function(){
                var $this = this;
                $($this).parents("div.code-new").fadeOut(600, function(){
                    $("div#wrapper.pt_cart div#main div.wrapper-cart div.code-enter").fadeIn(600);
                });
                return false;
            });
            $("div#wrapper.pt_cart div#main div.wrapper-cart div.item-user-actions button.remember-button").click(function(){
                var $this = this;
                $($this).toggleClass("active");
                return false;
            });

            // Click handler for the continue shopping button
            $('#checkout-form-top .btnContinueShopping').on('click', function() {
                window.location.href = app.urls.homePage;
            });
            
            // Omniture add donation tracking
            app.checkoutCommon.initDonationTracking("cart");
        }
    };
}(window.app = window.app || {}, jQuery));

//app.trimText - trims text from selected location and adds the original value as an title attribute
(function (app, $) {
    app.trimText = {

        trimFnc : function(whichElement, charLimit, lCaseOption){

            var ellipsestext = "...";
            $(whichElement).each(function() {

                var $self = $(this);

                var content = $.trim($self.text());

                if(content.length > charLimit) {

                    var c = content.substr(0, charLimit);

                    if(lCaseOption && lCaseOption == 1) {
                        c = c.toLowerCase();
                    }

                    var newcontent = c + ellipsestext;

                    $self.text(newcontent);
                    $self.attr("title", content);

                }
                else if(lCaseOption && lCaseOption == 1) {
                    content = content.toLowerCase();
                    $self.text(content);
                }

            });
        },

        init : function () {

            /*  Add in here all the elements that need trimming
                Usage: trimFnc(element, limit) */

                $("#wrapper.pt_account .account-landingcontent .miniaddress .mini-address-location.account-landing-profile span.value").each(function () {
                    var $this = this;
                        if($($this).hasClass("email")) {
                            app.trimText.trimFnc($this, 24, 1);
                        }
                        else if ($($this).hasClass("username")) {
                            app.trimText.trimFnc($this, 20, 1);
                        }
                        else {
                            app.trimText.trimFnc($this, 20);
                        }
                });

                app.trimText.trimFnc("#header .header-right a.customer-name-text", 18);

                app.trimText.trimFnc(".product-details-breadcrumbs .breadcrumb li.last span", 109);

                if ($("body").hasClass("blackfleece")) {
                    app.trimText.trimFnc(".product-detail .promotion-callout", 90);
                    /* Blind value upon math from PDP - 60% of the original PDP value, no PS for BF is available */
                    app.trimText.trimFnc(".product-set .promotion-callout", 39);
                    app.trimText.trimFnc(".pt_cart table#cart-table .item-description div.name a", 35);
                }
                else {
                    app.trimText.trimFnc(".product-detail .promotion-callout", 150);
                    app.trimText.trimFnc(".product-set .promotion-callout", 65);
                    app.trimText.trimFnc(".pt_cart table#cart-table .item-description div.name a", 45);
                }

                app.trimText.trimFnc("#remembered-items .remembered-items-content ul li.grid-tile .name-link", 40);
                app.trimText.trimFnc(".account-landingbanner-area .account-landingbanner-overlay span.spanToTrim", 20);
                app.trimText.trimFnc(".product-tile .promotional-message-label", 45);
                app.trimText.trimFnc("#user-preferences-bar .preference-bar-visible .overlay-preference-bar .left-text", 43);
                app.trimText.trimFnc(".pt_account #profile-readonly .lastname .field-value span", 17);
                app.trimText.trimFnc(".pt_account #profile-editable .lastname p", 16);

        }
    };
}(window.app = window.app || {}, jQuery));

// Notify user about password length
(function (app, $) {
    app.PasswordValidationNotification = {
        init : function () {
            $(document).on("keypress", "input[type='password'].passwordValidationNotificationHook", function() {

                // for the Account-StartRegister process don't show the password validation modal
                if ($(this).parents('#account-register').length >= 1) {
                    return true;
                }

                var maxLength = parseInt($(this).attr("maxlength"), 10);
                var curLength = parseInt($(this).val().length     , 10);

                if (curLength >= maxLength) {
                    var $dlg = $("<div>")
                        .attr("id", "dialogPasswordValidationNotification")
                        .html( $("<div>").addClass("loading") );

                    app.dialog.create({
                        target  : $dlg,
                        options : {
                            width  : "510",
                            height : "auto",
                            open   : function(event, ui) {
                                $.ajax({
                                    type     : "GET",
                                    url      : app.util.appendParamToURL(app.urls.pageInclude, "cid", "password-validation-modal"),
                                    dataType : "html",
                                    success  : function(data) {
                                        var $html = $(data);

                                        $html.on("click", "button.close", function(e) {
                                            $dlg.dialog("close");
                                            e.preventDefault();
                                        });

                                        $dlg.html( $html );
                                    }
                                });

                                /* Close the modal on clicking the overlay */
                                app.ClickOutsideModal.bindHere();
                            },
                            close  : function(event, ui) {
                                $(this).dialog("destroy").remove();
                            }
                        }
                    }).dialog("open");
                }
            });
        }
    };
}(window.app = window.app || {}, jQuery));

//app.PSpadding - trims text from selected location and adds the original value as an title attribute
(function (app, $) {
    app.PSpadding = {
        init : function () {
            /* Adjust css, only for product set */


        }
    };
}(window.app = window.app || {}, jQuery));

//app.cis - all logic for the Cis-Show page
(function (app, $) {
    var $newDialog;
    var agreedToTerms = false;
    app.cis = {
        init : function () {
            // Equal columns
            var $blueBox = $(".fixed-blue-box-content.blockbox");
            var heightToSet = 0;
            if ($blueBox.length) {
                $blueBox.each(function () {
                    var $self = $(this);
                    if ($self.height() > heightToSet) {
                        heightToSet = $self.height();
                    }
                    else {
                        $self.height(heightToSet);
                    }
                });
            }
            // CIS Landing Page: Accordion
            var $cisAccordionActions = $(".cis-accordion-actions"),
                $cisAccordionActionsH3 = $cisAccordionActions.find("h3"),
                $cisAccordionActionsBBox = $cisAccordionActions.find(".fixed-blue-box-content"),
                $cisAccordionActionsButton = $cisAccordionActions.find(".accordion-link"),
                $cisAccordionContent = $(".cis-accordion-content"),
                $cisAccordionActionsH3_cached;
            // Binding a click event to start or stop the accordion open/close animations
            $cisAccordionActionsButton.on("click", function(e) {
                e.preventDefault();
                if ($cisAccordionContent.filter(":hidden").length) {
                    $cisAccordionActionsH3_cached = $cisAccordionActionsH3.detach();
                    $cisAccordionActionsButton.hasClass("more") && $cisAccordionActionsButton.removeClass("more").addClass("less").text("Close");
                    $cisAccordionContent.slideToggle(300);
                    $cisAccordionActionsButton.parent().parent().parent().removeClass("both-borders");
                }
                else if (typeof $cisAccordionActionsH3_cached != "undefined" && $cisAccordionContent.filter(":visible").length) {
                    $cisAccordionActionsH3_cached.prependTo($cisAccordionActionsBBox);
                    $cisAccordionActionsButton.hasClass("less") && $cisAccordionActionsButton.removeClass("less").addClass("more").text("Learn More");
                    $cisAccordionContent.slideToggle(200);
                    $cisAccordionActionsButton.parent().parent().parent().addClass("both-borders");
                }
            });
            function revertTextarea () {
                if ($(".cis-ui").hasClass("cis-inform")) {
                    var $thisTextarea = $("textarea.message");
                    var textareaDefaultText = $thisTextarea.text();
                    var textRevert = ".text-revert";
                    $thisTextarea.data("defaultText", textareaDefaultText);
                    $thisTextarea.on("keyup", function () {
                        var $self = $(this);
                        var $revert = $self.parent().find(textRevert);
                        if ($self.val() != $self.data("defaultText") && $revert.filter(":hidden").length) {
                            $revert.show();
                        }
                        else if ($self.val() == $self.data("defaultText") && $revert.filter(":visible").length) {
                            $revert.hide();
                        }
                    });
                    $(textRevert).on("click", function(event) {
                        event.preventDefault();
                        $thisTextarea.val($thisTextarea.data("defaultText"));
                        $(this).hide();
                    });
                }
            }
            revertTextarea();
            function cisTerms () {
                var $cisUi = $(".cis-ui");
                var $defaultDivs = $(".default");
                var $ndTermsDivs = $(".nd-terms");
                var $cisTermsCheckbox = $(".cis-terms-checkbox");
                var cisTermsClass = "cis-terms";
                $("a.terms-show").on("click", function(event) {
                    event.preventDefault();
                    // Change the modal content
                    $defaultDivs.hide();
                    $cisUi.addClass(cisTermsClass);
                    $ndTermsDivs.show();

                    jQuery(".ui-dialog-titlebar-close").unbind("click").click(function(){
                        $defaultDivs.show();
                        $cisUi.removeClass(cisTermsClass);
                        $ndTermsDivs.hide();

                        //now that all is back to default, also reset close button.
                        jQuery(".ui-dialog-titlebar-close").click(function(){
                            $newDialog.dialog("destroy").remove();
                        });
                    });

                });
                $(".cis-terms-checkbox").on("change", function () {
                    if ($(this).is(":checked")) {
                        if ($cisUi.hasClass(cisTermsClass)) {
                            // Change the modal content
                            $cisUi.removeClass(cisTermsClass);
                            $ndTermsDivs.hide();
                            $defaultDivs.show();
                        }
                        if ($(".cis-main-checkbox").hasClass("error")) {
                            $(this).removeClass("error").parent(".checkbox-row").find("span.error").remove();
                        }
                        $cisTermsCheckbox.attr("checked","checked").trigger("change");
                    }
                    else {
                        $cisTermsCheckbox.attr("checked",false).trigger("change");
                    }
                });
            }
            // Initialize the CIS tooltips
            app.cis.initTooltips();
            // CIS Renew modal
            $(".cis-wrapper .cis-renew").on("click", function(event) {
                event.preventDefault();
                // Create the modal
                (function cisMainModal1 () {
                    (typeof $newDialog != "undefined") && $newDialog.dialog("destroy").remove();
                    app.cis.initModal("dialog-cis-ui", "584", app.urls.CisRenew, function () {
                        $("#Cancel").on("click", function(event) {
                            event.preventDefault();
                            $newDialog.dialog("destroy").remove();
                        });
                        $("#forgot-email").on("click", function(event) {
                            event.preventDefault();
                            //switch modal content
                            jQuery(".default").hide();
                            jQuery(".forgot-email").show();

                            //When displaying the forgot-email part, the only way out is the close button, so...
                            //temporary change handling of close button for the dialog.
                            jQuery(".ui-dialog-titlebar-close").unbind("click").click(function(){
                                jQuery(".forgot-email").hide();
                                jQuery(".default").show();

                                //now that all is back to default, also reset close button.
                                jQuery(".ui-dialog-titlebar-close").click(function(){
                                    $newDialog.dialog("destroy").remove();
                                });
                            });
                            // Change the modal content - Old solution
                            //app.cis.initAjaxCall(app.urls.CisRenewForgotEmail);
                        });
                        // CIS Terms
                        cisTerms();
                    });
                })();
            });
            // Enroll for a Corporate Membership Number modal
            $(".cis-wrapper .cis-enroll").on("click", function(event) {
                event.preventDefault();
                // Create the modal
                (function cisMainModal2 () {
                    (typeof $newDialog != "undefined") && $newDialog.dialog("destroy").remove();
                    app.cis.initModal("dialog-cis-ui", "584", app.urls.CisEnroll, function () {
                        $("#Cancel").on("click", function(event) {
                            event.preventDefault();
                            $newDialog.dialog("destroy").remove();
                        });
                        // CIS Terms
                        cisTerms();
                    });
                })();
            });
            // Company inform about membership modal
            $(".cis-wrapper .cis-inform").on("click", function(event) {
                event.preventDefault();
                // Create the modal
                (function cisMainModal3 () {
                    (typeof $newDialog != "undefined") && $newDialog.dialog("destroy").remove();
                    app.cis.initModal("dialog-cis-ui", "584", app.urls.CisInform, function () {
                        // Show the custom selects
                        app.CustomSelects.changeThem();
                        $("#Cancel").on("click", function(event) {
                            event.preventDefault();
                            $newDialog.dialog("destroy").remove();
                        });
                        // Revert the textarea functionality
                        revertTextarea();
                    });
                })();
            });

            // Company membership modal
            $(".cis-wrapper .cis-membership").on("click", function(event) {
                event.preventDefault();
                // Create the modal
                (function cisMainModal4 () {
                    (typeof $newDialog != "undefined") && $newDialog.dialog("destroy").remove();
                    app.cis.initModal("dialog-cis-ui", "584", app.urls.CisMembership, function () {
                        $("#Cancel").on("click", function(event) {
                            event.preventDefault();
                            $newDialog.dialog("destroy").remove();
                        });
                    });
                })();
            });

            // Show the modal
            (function() {
                var qsParams = app.util.getQueryStringParams(window.location.search);
                if (qsParams.hasOwnProperty("m") && qsParams.m == "CisMembership") {
                    $(".cis-wrapper .cis-membership").triggerHandler("click");
                }
            })();
        },
        // Creates a modal with the given parameters or some default ones
        initModal : function(modalId, modalWidth, urlToLoad, callback) {
            var modalId = (typeof modalId == "undefined") ? "dialog-cis-ui" : modalId;
            var modalWidth =  (typeof modalWidth == "undefined") ? "584" : modalWidth;
            var urlToLoad = (typeof urlToLoad == "undefined") ? app.urls.CisRenew : urlToLoad;
            $newDialog = $("<div/>").attr("id", modalId).html($("<div>").addClass("loading"));
            app.dialog.create({
                target  : $newDialog,
                options : {
                    width       : modalWidth,
                    height      : "auto",
                    open        : function(event, ui) {
                        // Ajax call with custom callback or not
                        typeof callback != "undefined" ? app.cis.initAjaxCall(urlToLoad, callback) : app.cis.initAjaxCall(urlToLoad);
                        // Close the modal on clicking the overlay
                        app.ClickOutsideModal.bindHere();
                    },
                    close : function(event, ui) {
                        $(this).dialog("destroy").remove();
                    }
                }
            }).dialog("open");
        },
        // Creates an ajax request for content loading into the existing modal window, with the given arguments or default ones
        initAjaxCall : function(urlToLoad, callback) {
            var urlToLoad = (typeof urlToLoad == "undefined") ? app.urls.CisRenew : urlToLoad;
            $.ajax({
                type        : "GET",
                url         : urlToLoad,
                dataType    : "html",
                success     : function(data) {
                    $newDialog.html(data);
                    var $dialogForm = $newDialog.find("form");
                    if ($dialogForm.length) {
                        // Adding another input of type "hidden" which holds the name and value of the original submit button
                        var $submitButton = $dialogForm.find("button.cis-submit");
                        var submitButtonName = $submitButton.attr("name");
                        var submitButtonValue = $submitButton.attr("value");
                        $("<input/>").attr({
                            "type"  : "hidden",
                            "name"  : submitButtonName,
                            "value" : submitButtonValue
                        }).appendTo($dialogForm.find("fieldset"));

                        // Submitting the form
                        $dialogForm.on("submit", function(event) {
                            event.preventDefault();

                            var $self    = $(this);
                            var thisUrl  = app.util.ajaxUrl($self.attr("action"));
                            var formData = $self.serialize();

                            if ($self.valid()) {
                                $newDialog.html($("<div>").addClass("loading"));

                                $.ajax({
                                    type        : "GET",
                                    url         : thisUrl,
                                    dataType    : "html",
                                    data        : formData,
                                    success     : function(data) {
                                        $newDialog.html(data);
                                    }
                                });
                            }
                        });
                    }
                    $newDialog.dialog('option', 'position', 'center');
                    // Show the tips
                    app.cis.initTooltips();
                    // Show the styled checkbox
                    jQuery.CustomFormElements();
                    // Validate the form
                    app.validator.init();
                    typeof callback != "undefined" && callback();
                }
            });
        },
        // CIS Tooltips
        initTooltips : function () {
            if ($(".cis-tip .style-tooltip").length) {
                $(".cis-tip .style-tooltip").on("click", function(event) {
                    ($(event.target).parent().hasClass("terms-show") == false) && event.preventDefault();
                }).on("mouseenter", function(event) {
                    $(this).find(".hover-tooltip").stop(true, true).fadeIn("300");
                }).on("mouseleave", function(event) {
                    $(this).find(".hover-tooltip").stop(true, true).fadeOut("300");
                });
            }
        }
    };
}(window.app = window.app || {}, jQuery));

//app.ClickOutsideModal
//For closing modal windows on clicking the overlay behind them (not including the modal itself)
(function (app, $) {
    app.ClickOutsideModal = {
        init : function () {
            var $bodyContainer = $("body"),
                $modalOverlay = $(".ui-widget-overlay");
            $bodyContainer.on("click touchstart", $modalOverlay, function (e) {
                var $modalWindow = $(e.target).prev(".ui-dialog").find("div:eq(1)");
                if($modalWindow.length) {

                    // Make sure the modal window is closed only if we're not in an
                    // unfinished multishipping checkout progress
                    if( window.multishippingFinished === undefined ||
                        window.multishippingFinished === null ||
                        window.multishippingFinished == true)
                    {
                        $modalWindow.dialog("close");
                        $modalWindow.dialog("destroy").remove();
                    }
                }
            });

            app.ClickOutsideModal.checkForBiggerDialog();
            $(".ui-dialog-content").dialog("option", "position", "center");

            // Switching view mode
            var dialogResizeTimeout = null;
            $(window).on("resize", function() {
                if (dialogResizeTimeout == null) {
                    dialogResizeTimeout = setTimeout(function() {
                        app.ClickOutsideModal.checkForBiggerDialog();
                        $(".ui-dialog-content").dialog("option", "position", "center");
                        // Clear the timeout
                        clearTimeout(dialogResizeTimeout);
                        dialogResizeTimeout = null;
                    }, 1000);
                }
            });

        },
        checkForBiggerDialog : function() {
            // Handle modal windows bigger than the window width
            if($(window).width() < $('.ui-dialog').outerWidth(true)){
                var dialogPadding = $('.ui-dialog').outerWidth(true) - $('.ui-dialog').width();
                $('.ui-dialog').css({
                    width: $(window).width() - dialogPadding
                });
            }
        },
        bindHere : function () {
            app.ClickOutsideModal.init();
        }
    };
}(window.app = window.app || {}, jQuery));

// app.CheckoutPromoModal
(function (app, $) {
    function init() {
        if ($(".checkout-billing:visible").length > 0) {
            var $paymentMethodInput    = $(".checkout-billing .selectPaymentRadioBtn");
            var $selectedPaymentMethod = $(".checkout-billing .selectPaymentRadioBtn:checked");
            var $newCCselect           = $(".form-row.credit-card select");

            // Move information text beneath CC input field
            $('.form-row.formelem-ccnumber.required').append( $('.ccNumberSubscription') );

            if ($selectedPaymentMethod.length) {
                var selectedPaymentType = JSON.parse($selectedPaymentMethod.attr("data-ccard")).type;
                if (selectedPaymentType == "BBCard" || selectedPaymentType == "BBPLCC") {
                    showCheckoutPromoModal();
                }
            }

            $newCCselect.on("change", function () {
                var selectedVal = $(this).find("option:selected").attr("value");
                if (selectedVal == "BBCard" || selectedVal == "BBPLCC") {
                    showCheckoutPromoModal();
                }
                
                // Toggle CVV input fields for "BBCard"
                if(selectedVal == "BBCard"){
                	app.paymentAndReview.showAdditionalCCFields();
                	app.paymentAndReview.hideCVVField();
                } else if(selectedVal == "BBPLCC") {
                    app.paymentAndReview.hideAdditionalCCFields();
                } else {
                    app.paymentAndReview.showAdditionalCCFields();
                }
                
                alterCCText( $('#dwfrm_billing_paymentMethods_creditCard_type').val() );
            });

            $paymentMethodInput.on("change", function () {
                var selectedPaymentType = JSON.parse($(this).attr("data-ccard")).type;
                if (selectedPaymentType == "BBCard" || selectedPaymentType == "BBPLCC") {
                    showCheckoutPromoModal();
                }
                
                // Toggle CVV input fields for "BBCard"
                if(selectedPaymentType == "BBCard"){
                	app.paymentAndReview.showAdditionalCCFields();
                	app.paymentAndReview.hideCVVField();
                } else if(selectedPaymentType == "BBPLCC") {
                    app.paymentAndReview.hideAdditionalCCFields();
                } else {
                    app.paymentAndReview.showAdditionalCCFields();
                }
            });
        }
    }

    function showCheckoutPromoModal() {
        var $newCCselect           = $(".form-row.credit-card select");
        if ($newCCselect.attr("data-show-checkout-promo-modal") !== "y") {
            return;
        }

        var $newDialog = $("<div/>").attr("id", "dialogCheckoutPromo").html($("<div>").addClass("loading"));
        app.dialog.create({
            target  : $newDialog,
            options : {
                width    : "auto",
                height   : "auto",
                open     : function(event, ui) {
                    $.ajax({
                        type     : "GET",
                        url      : app.urls.BBCheckoutPromoModal,
                        dataType : "html",
                        success  : function(data) {
                            $newDialog.html(data);
                            $newDialog.dialog('option', 'position', 'center');
                        }
                    });

                    /* Close the modal on clicking the overlay */
                    app.ClickOutsideModal.bindHere();
                },
                close : function(event, ui) {
                    $(this).dialog("destroy").remove();
                }
            }
        }).dialog("open");
    }

    /**
     * Show alternative description text for BBPLCC
     */
    function alterCCText(ccType) {
        var txtContainer = $('.ccNumberSubscription');

        if(!ccType || txtContainer.length == 0) {
            return;
        }

        // Brooks Card special handling
        if(ccType == 'BBPLCC') {
            txtContainer.text( app.resources.CC_INFOTEXT_BBPLCC );
            txtContainer.addClass("BBPLCCstyle");
        }

        // Other cards
        else {
            txtContainer.text( app.resources.CC_INFOTEXT_DEFAULT );
            txtContainer.removeClass("BBPLCCstyle");
        }
    }

    app.CheckoutPromoModal = {
        init : init
    };
}(window.app = window.app || {}, jQuery));

/**
 * Category Product Grid functionality
 */
(function (app, $) {
    app.ProductGrid = {
        init : function () {

            // Omniture tracking for fit guide
            $('.refinement.attribute-refinement .guide.fit-guide').on('click', function() {

                // Tracking object existent?
                if(s) {
                    s.pageName += ' > fit guide';
                    s.contextData['action']= 'fit guide viewed';
                    s.t();
                    s.pageName = s.pageName.substring(0, s.pageName.length - 12);
                }
            });

            // Omniture tracking for size guide
            $('.refinement.attribute-refinement .guide.size-guide').on('click', function() {

                // Tracking object existent?
                if(s) {
                    s.pageName += ' > size guide';
                    s.contextData['action']= 'size guide viewed';
                    s.t();
                    s.pageName = s.pageName.substring(0, s.pageName.length - 13);
                }
            });
            
            // Omniture tracking for Checkout button in mini-bag flyout
            $('.header-cart-link-cart').on('click', function() {
                // Tracking object existent?
                if(s) {
                    s.contextData['action']= 'mini-bag flyout checkout';
                    s.t();
                }
            });
    
        }
    };
}(window.app = window.app || {}, jQuery));

//app.GCCheckBalance
//Check Balance Modal
(function (app, $) {
    app.GCCheckBalance = {
        init : function () {
            //$("#dialog-container").dialog({ position: 'top' });
            $('#dialog-container :inpu  t').each(function(){
                //$(this).scrollTop(300);
                $(this).position({
                      my: "left top",
                      at: "left top",
                      of: "window"
                    });
            
            }); 
            $(".giftcards-landing .cs-header-wrap .ps-gc-checkbalance").on("click", function (e) {
                e.preventDefault();
                app.GCCheckBalance.openModal();
            });
        },
        openModal : function () {
            var $newDialog = $("<div/>").attr("id", "dialog-container").html($("<div>").addClass("loading"));
            app.dialog.create({
                target  : $newDialog,
                
                options : {
                    width       : "450",
                    height      : "auto",
                    dialogClass : "resetpassword check-balance-dialog",
                    
                    open        : function(event, ui) {
                        $.ajax({
                            type        : "GET",
                            url         : app.urls.GCCheckBalance,
                            dataType    : "html",
                            success     : function(data) {
                                $newDialog.html(data);
                                $newDialog.dialog('option', 'position', 'center');
                            }
                        });

                        /* Close the modal on clicking the overlay */
                        app.ClickOutsideModal.bindHere();
                    },
                    close : function(event, ui) {
                        $(this).dialog("destroy").remove();
                    }
                }
            }).dialog("open");
        }
    };
}(window.app = window.app || {}, jQuery));

//app.ScrollToError
/* START: Whenever the user tries to submit a form and page has an active error field, scroll the page to the first error field at top */
(function (app, $) {
    app.ScrollToError = {
        init : function () {
            $(":submit").on("click", function () {
                setTimeout(function() {
                    $(".error:visible").length && $("html, body").animate({scrollTop : $(".error:visible:eq(0)").offset().top - 85}, 1000);
                }, 200);
            });
        },
        scrollNow : function () {
            app.ScrollToError.init();
        }
    };
}(window.app = window.app || {}, jQuery));
/* END: Whenever the user tries to submit a form and page has an active error field, scroll the page to the first error field at top */

// app.ProductSortingOptions
(function (app, $) {
    app.ProductSortingOptions = {
        init : function() {
            if (app.CurrentCustomer.anonymous) {
                $("select.chzn-select-sort").each(function() {
                    var $select = $(this);
                    $select.find("option").each(function() {
                        var $option = $(this);
                        if ( $option.data("sruleId") === "recommended" ) {
                            $option.remove();
                            $select.trigger("liszt:updated");
                        }
                    });
                });
            }
        }
    };
}(window.app = window.app || {}, jQuery));

//app.FiftyOne - Logic for all FiftyOne JS apps
(function (app, $) {

    var COUNTRY_NAMES = {
        "AD" : "ANDORRA",
        "AE" : "UNITED ARAB EMIRATES",
        "AF" : "AFGHANISTAN",
        "AG" : "ANTIGUA AND BARBUDA",
        "AI" : "ANGUILLA",
        "AL" : "ALBANIA",
        "AM" : "ARMENIA",
        "AO" : "ANGOLA",
        "AQ" : "ANTARCTICA",
        "AR" : "ARGENTINA",
        "AS" : "AMERICAN SAMOA",
        "AT" : "AUSTRIA",
        "AU" : "AUSTRALIA",
        "AW" : "ARUBA",
        "AX" : "ALAND ISLANDS",
        "AZ" : "AZERBAIJAN",
        "BA" : "BOSNIA AND HERZEGOVINA",
        "BB" : "BARBADOS",
        "BD" : "BANGLADESH",
        "BE" : "BELGIUM",
        "BF" : "BURKINA FASO",
        "BG" : "BULGARIA",
        "BH" : "BAHRAIN",
        "BI" : "BURUNDI",
        "BJ" : "BENIN",
        "BL" : "SAINT BARTHELEMY",
        "BM" : "BERMUDA",
        "BN" : "BRUNEI DARUSSALAM",
        "BO" : "BOLIVIA",
        "BQ" : "BONAIRE, SINT EUSTACHIUS, SABA",
        "BR" : "BRAZIL",
        "BS" : "BAHAMAS",
        "BT" : "BHUTAN",
        "BV" : "BOUVET ISLAND",
        "BW" : "BOTSWANA",
        "BY" : "BELARUS",
        "BZ" : "BELIZE",
        "CA" : "CANADA",
        "CC" : "COCOS (KEELING) ISLANDS",
        "CD" : "CONGO, THE DEMOCRATIC REPUBLIC OF THE",
        "CF" : "CENTRAL AFRICAN REPUBLIC",
        "CG" : "CONGO",
        "CH" : "SWITZERLAND",
        "CI" : "COTE D'IVOIRE",
        "CK" : "COOK ISLANDS",
        "CL" : "CHILE",
        "CM" : "CAMEROON",
        "CN" : "CHINA",
        "CO" : "COLOMBIA",
        "CR" : "COSTA RICA",
        "CS" : "CZECHOSLOVAKIA",
        "CU" : "CUBA",
        "CV" : "CAPE VERDE",
        "CW" : "CURACAO",
        "CX" : "CHRISTMAS ISLAND",
        "CY" : "CYPRUS",
        "CZ" : "CZECH REPUBLIC",
        "DE" : "GERMANY",
        "DJ" : "DJIBOUTI",
        "DK" : "DENMARK",
        "DM" : "DOMINICA",
        "DO" : "DOMINICAN REPUBLIC",
        "DZ" : "ALGERIA",
        "EC" : "ECUADOR",
        "EE" : "ESTONIA",
        "EG" : "EGYPT",
        "EH" : "WESTERN SAHARA",
        "ER" : "ERITREA",
        "ES" : "SPAIN",
        "ET" : "ETHIOPIA",
        "EU" : "EUROPEAN UNION",
        "FI" : "FINLAND",
        "FJ" : "FIJI",
        "FK" : "FALKLAND ISLANDS (MALVINAS)",
        "FM" : "MICRONESIA, FEDERATED STATES OF",
        "FO" : "FAROE ISLANDS",
        "FR" : "FRANCE",
        "GA" : "GABON",
        "GB" : "UNITED KINGDOM",
        "GD" : "GRENADA",
        "GE" : "GEORGIA",
        "GF" : "FRENCH GUIANA",
        "GG" : "GUERNSEY (UK)",
        "GH" : "GHANA",
        "GI" : "GIBRALTAR",
        "GL" : "GREENLAND",
        "GM" : "GAMBIA",
        "GN" : "GUINEA",
        "GP" : "GUADELOUPE",
        "GQ" : "EQUATORIAL GUINEA",
        "GR" : "GREECE",
        "GS" : "SOUTH GEORGIA & SANDWICH ISLANDS",
        "GT" : "GUATEMALA",
        "GU" : "GUAM",
        "GW" : "GUINEA-BISSAU",
        "GY" : "GUYANA",
        "HK" : "HONG KONG",
        "HM" : "HEARD ISLAND AND MCDONALD ISLANDS",
        "HN" : "HONDURAS REPUBLIC",
        "HR" : "CROATIA",
        "HT" : "HAITI",
        "HU" : "HUNGARY",
        "IC" : "CANARY ISLANDS",
        "ID" : "INDONESIA",
        "IE" : "IRELAND, REPUBLIC",
        "IL" : "ISRAEL",
        "IM" : "ISLE OF MAN  (UK)",
        "IN" : "INDIA",
        "IO" : "BRITISH INDIAN OCEAN TERRITORY",
        "IQ" : "IRAQ",
        "IR" : "IRAN, ISLAMIC REPUBLIC OF",
        "IS" : "ICELAND",
        "IT" : "ITALY",
        "JE" : "JERSEY (UK)",
        "JM" : "JAMAICA",
        "JO" : "JORDAN",
        "JP" : "JAPAN",
        "KE" : "KENYA",
        "KG" : "KYRGYZSTAN",
        "KH" : "CAMBODIA",
        "KI" : "KIRIBATI",
        "KM" : "COMOROS",
        "KN" : "SAINT KITTS AND NEVIS",
        "KP" : "KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF",
        "KR" : "KOREA, REPUBLIC OF",
        "KW" : "KUWAIT",
        "KY" : "CAYMAN ISLANDS",
        "KZ" : "KAZAKHSTAN",
        "LA" : "LAO PEOPLE'S DEMOCRATIC REPUBLIC",
        "LB" : "LEBANON",
        "LC" : "SAINT LUCIA",
        "LI" : "LIECHTENSTEIN",
        "LK" : "SRI LANKA",
        "LR" : "LIBERIA",
        "LS" : "LESOTHO",
        "LT" : "LITHUANIA",
        "LU" : "LUXEMBOURG",
        "LV" : "LATVIA",
        "LY" : "LIBYAN ARAB JAMAHIRIYA",
        "MA" : "MOROCCO",
        "MC" : "MONACO",
        "MD" : "MOLDOVA, REPUBLIC OF",
        "ME" : "MONTENEGRO",
        "MF" : "NETHERLANDS ANTILLES",
        "MG" : "MADAGASCAR",
        "MH" : "MARSHALL ISLANDS",
        "MK" : "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF",
        "ML" : "MALI",
        "MM" : "MYANMAR",
        "MN" : "MONGOLIA",
        "MO" : "MACAO",
        "MP" : "NORTHERN MARIANA ISLANDS",
        "MQ" : "MARTINIQUE",
        "MR" : "MAURITANIA",
        "MS" : "MONTSERRAT",
        "MT" : "MALTA",
        "MU" : "MAURITIUS",
        "MV" : "MALDIVES",
        "MW" : "MALAWI",
        "MX" : "MEXICO",
        "MY" : "MALAYSIA",
        "MZ" : "MOZAMBIQUE",
        "NA" : "NAMIBIA",
        "NC" : "NEW CALEDONIA",
        "NE" : "NIGER",
        "NF" : "NORFOLK ISLAND",
        "NG" : "NIGERIA",
        "NI" : "NICARAGUA",
        "NL" : "NETHERLANDS, THE",
        "NO" : "NORWAY",
        "NP" : "NEPAL",
        "NR" : "NAURU",
        "NU" : "NIUE",
        "NZ" : "NEW ZEALAND",
        "OM" : "OMAN",
        "PA" : "PANAMA",
        "PE" : "PERU",
        "PF" : "FRENCH POLYNESIA",
        "PG" : "PAPUA NEW GUINEA",
        "PH" : "PHILIPPINES",
        "PK" : "PAKISTAN",
        "PL" : "POLAND",
        "PM" : "SAINT PIERRE AND MIQUELON",
        "PN" : "PITCAIRN",
        "PR" : "PUERTO RICO",
        "PS" : "PALESTINIAN TERRITORY",
        "PT" : "PORTUGAL",
        "PW" : "PALAU",
        "PY" : "PARAGUAY",
        "QA" : "QATAR",
        "RE" : "REUNION",
        "RO" : "ROMANIA",
        "RS" : "SERBIA",
        "RU" : "RUSSIAN FEDERATION",
        "RW" : "RWANDA",
        "SA" : "SAUDI ARABIA",
        "SB" : "SOLOMON ISLANDS",
        "SC" : "SEYCHELLES",
        "SD" : "SUDAN",
        "SE" : "SWEDEN",
        "SG" : "SINGAPORE",
        "SH" : "SAINT HELENA",
        "SI" : "SLOVENIA",
        "SJ" : "SVALBARD AND JAN MAYEN",
        "SK" : "SLOVAKIA",
        "SL" : "SIERRA LEONE",
        "SM" : "SAN MARINO",
        "SN" : "SENEGAL",
        "SO" : "SOMALIA",
        "SR" : "SURINAME",
        "ST" : "SAO TOME AND PRINCIPE",
        "SV" : "EL SALVADOR",
        "SY" : "SYRIAN ARAB REPUBLIC",
        "SZ" : "SWAZILAND",
        "TC" : "TURKS AND CAICOS ISLANDS",
        "TD" : "CHAD",
        "TF" : "FRENCH SOUTHERN TERRITORIES",
        "TG" : "TOGO",
        "TH" : "THAILAND",
        "TJ" : "TAJIKISTAN",
        "TK" : "TOKELAU",
        "TL" : "TIMOR-LESTE",
        "TM" : "TURKMENISTAN",
        "TN" : "TUNISIA",
        "TO" : "TONGA",
        "TP" : "EAST TIMOR",
        "TR" : "TURKEY",
        "TT" : "TRINIDAD AND TOBAGO",
        "TV" : "TUVALU",
        "TW" : "TAIWAN, PROVINCE OF CHINA",
        "TZ" : "TANZANIA, UNITED REPUBLIC OF",
        "UA" : "UKRAINE",
        "UG" : "UGANDA",
        "UM" : "UNITED STATES MINOR OUTLYING ISLANDS",
        "US" : "UNITED STATES",
        "UY" : "URUGUAY",
        "UZ" : "UZBEKISTAN",
        "VA" : "HOLY SEE (VATICAN CITY STATE)",
        "VC" : "SAINT VINCENT AND THE GRENADINES",
        "VE" : "VENEZUELA",
        "VG" : "VIRGIN ISLANDS, BRITISH",
        "VI" : "VIRGIN ISLANDS, U.S.",
        "VN" : "VIET NAM",
        "VU" : "VANUATU",
        "WF" : "WALLIS AND FUTUNA",
        "WS" : "SAMOA",
        "YE" : "YEMEN",
        "YT" : "MAYOTTE",
        "YU" : "TUGOSLAVIA",
        "ZA" : "SOUTH AFRICA",
        "ZM" : "ZAMBIA",
        "ZW" : "ZIMBABWE",
        "ZZ" : "WORLD"
    };

    var COUNTRY_LOCALE = {
            "AE" : "ar_AE",
            "AT" : "de_AT",
            "BE" : "nl_BE",
            "CR" : "es_CR",
            "CY" : "el_CY",
            "CZ" : "cs_CZ",
            "DO" : "es_DO",
            "EC" : "es_EC",
            "ES" : "es_ES",
            "EE" : "et_EE",
            "FI" : "fi_FI",
            "FR" : "fr_FR",
            "DE" : "de_DE",
            "GB" : "en_GB",
            "GR" : "el_GR",
            "GT" : "es_GT",
            "HN" : "es_HN",
            "IE" : "en_IE",
            "IT" : "it_IT",
            "JO" : "ar_JO",
            "LU" : "fr_LU",
            //"MT" : "ml_MT",
            //"MC" : "fr_MC",
            "MX" : "es_MX",
            "NI" : "es_NI",
            "NL" : "nl_NL",
            "PA" : "es_PA",
            "PY" : "es_PY",
            "PT" : "pt_PT",
            "SK" : "sk_SK",
            "SI" : "sl_SI",
            "SV" : "es_SV",
            "TH" : "th_TH",
            //"VA" : "it_VA",
            "DK" : "da_DK",
            "HU" : "hu_HU",
            "IS" : "is_IS",
            "LV" : "lv_LV", 
            //"LI" : "de_LI",
            //"LT" : "it_LT",
            "NO" : "nb_NO",
            "PL" : "pl_PL",
            "RU" : "ru_RU",
            "SE" : "sv_SE",
            "TR" : "tr_TR",
            "CH" : "de_CH",
            "RO" : "ro_RO",
            //"IL" : "he_IL",
            "SA" : "ar_SA",
            "BH" : "ar_BH",
            "QA" : "ar_QA",
            //"BN" : "ms_BN",
            "EG" : "ar_EG",
            //"AO" : "ar_JO",
            "OM" : "ar_OM",
            "KW" : "ar_KW"
            //"ZA" : "en_ZA"        
    };
    
    
    var COUNTRY_CURRENCY = {
            "AE" : "AED",
            "AT" : "EUR",
            "BE" : "EUR",
            "CR" : "CRC",
            "CY" : "EUR",
            "CZ" : "CZK",
            "DO" : "DOP",
            "EC" : "USD",
            "ES" : "EUR",
            "EE" : "EUR",
            "FI" : "EUR",
            "FR" : "EUR",
            "DE" : "EUR",
            "GB" : "GBP",
            "GR" : "EUR",
            "GT" : "GTQ",
            "HN" : "HNL",
            "IE" : "EUR",
            "IT" : "EUR",
            "JO" : "JOD",
            "LU" : "EUR",
            "MT" : "EUR", 
            "MC" : "EUR",
            "MX" : "MXN",
            "NI" : "NIO",
            "NL" : "EUR",
            "PA" : "PAB",
            "PT" : "EUR",
            "PY" : "PYG",
            "SK" : "EUR",
            "SI" : "EUR",
            "VA" : "EUR",
            "DK" : "DKK",
            "HU" : "HUF",
            "IS" : "EUR",
            "LV" : "LVL",           
            "LI" : "EUR",
            "LT" : "LTL",
            "NO" : "NOK",
            "PL" : "PLN",
            "RU" : "RUB",
            "SE" : "SEK",
            "SV" : "USD",
            "TH" : "THB",
            "TR" : "TRY",
            "CH" : "CHF",
            "RO" : "RON",
            "IL" : "ILS",
            "SA" : "SAR",
            "BH" : "BHD",
            "QA" : "QAR",
            "BN" : "USD",
            "EG" : "EGP",
            "AO" : "AOA",
            "OM" : "OMR",
            "KW" : "KWD",
            "ZA" : "ZAR"
    };
    
    
    var CURRENCY_NAMES = {
            "AED" : "United Arab Emirates Dirham",
            "CRC" : "Costa Rican Colon",
            "CZK" : "Czech Koruna",
            "DOP" : "Dominican Peso",
            "EUR" : "Euro",
            "GBP" : "British Pound",
            "GTQ" : "Guatemalan Quetzal",
            "DKK"  : "Danish Krone",
            "HNL" : "Honduran Lempira",
            "HUF" :  "Hungarian Forint",
            "JOD" : "Jordanian Dinar",
            "LVL" : "Latvian Lats",         
            "LTL" :  "Lithuanian Litas",
            "MXN" : "Mexican Peso",
            "NIO" : "Nicaraguan Cordoba",
            "NOK" : "Norwegian Krone",
            "PAB" : "Panamanian Balboa",
            "PYG" : "Paraguayan Guarani",
            "PLN" : "Polish Zloty",
            "RUB" : "Russian Ruble",
            "SEK" : "Swedish Krona",
            "TRY" : "Turkish Lira",
            "CHF" : "Swiss Franc",
            "RON" : "New Romanian Leu",
            "ILS" : "Israeli Shekel",
            "SAR" : "Saudi Riyal",
            "BHD" : "Bahraini Dinar",
            "QAR" : "Qatari Riyal",
            "EGP" : "Egyptian Pound",
            "AOA" : "Angolan Kwanza",
            "OMR" : "Omani Rial",
            "KWD" : "Kuwaiti Dinar",
            "THB" : "Thai Baht",
            "USD" : "United States Dollar",
            "ZAR" : "South African Rand"        
    };
    
    var $cache = {
        wrapper                   : $("#wrapper"),
        shippingTabWrapper        : $("#fiftyone-shipping-tab-wrapper"),
        shippingTabContentWrapper : $("#fiftyone-shipping-tab-wrapper > .shipping-tab-container > .shipping-tab-content-wrapper"),
        shippingTabContent        : $("#fiftyone-shipping-tab-wrapper > .shipping-tab-container > .shipping-tab-content-wrapper > .shipping-tab-content:first"),
        shippingTabContentHeader  : $("#fiftyone-shipping-tab-content-header"),
        shippingTabContentFooter  : $("#fiftyone-shipping-tab-content-footer"),
        checkoutCountrySelects    : $("select.country"),
        shippingTabContainer      : $(".shipping-tab-container")
    };

    function redirectToLocale(localeId) {
        var newURL = window.location.href;
        var index = newURL.indexOf("51Checkout");
        if(index>=0)
        {
            var i =newURL.split("/");
            newURL = newURL.substring(0, newURL.lastIndexOf("/"));
            newURL = newURL.substring(0,newURL.lastIndexOf("/"));
            newURL =newURL + "/" + localeId +"/" +"Cart-Show";
        }
        else
        {
            newURL += newURL.indexOf("?") == -1 ? "?" : "&";
            newURL += "setRequestLocale=" + localeId;
        }
        window.location.href = newURL;
    }

    function initHeaderAndFooter() {
            $("#fiftyone-shipping-tab-wrapper").show();
            $("#fiftyone-shipping-tab-wrapper-footer").show();
    }

    function initWelcomeMat() {
        if ( $.cookie("dw51wlcm") === "true" ) {
           return;
        }

        var dw51cacheCookie = $.cookie("dw51cache");
        var isValidCookie   = (dw51cacheCookie != null) && (typeof dw51cacheCookie === "string") && /^([a-zA-Z]+)\|([a-zA-Z]+)\|(.+)$/.test(dw51cacheCookie);
        var isIntlCookie    = isValidCookie && /^([a-zA-Z]+)\|([a-zA-Z]+)\|(.+)$/.test(dw51cacheCookie);
 
        if (isIntlCookie) {         
            var $welcomeMatDialog = $("<div>", {"id" : "dw51WelcomeMatDialog"}).html( $("<div>", {"class" : "loading"}) );

            $.cookie("dw51wlcm", "true", {expires:365, path : '/'});

            var dw51cacheCookieParts   = dw51cacheCookie.split("|");
            var countryFromCookie = dw51cacheCookieParts[0];
            var currencyFromCookie = dw51cacheCookieParts[1];            
            app.dialog.create({
                target  : $welcomeMatDialog,
                options : {
                    width  : "730",
                    height : "auto",
                    open   : function(event, ui) {
                        var $thisDialog = $(this);

                        $.ajax({
                            type     : "GET",
                            url      : app.urls.fiftyOneWelcomeMat,
                            data     : {country: COUNTRY_NAMES[countryFromCookie], currency : currencyFromCookie, currencyName : CURRENCY_NAMES[currencyFromCookie]},
                            dataType : "html",
                            success  : function(data) {
                                var $html = $(data);

                                /* YN-Change the ID Of the element to generic insteaf of -shopUK */ 
                                $html.find("#dw51welcomeMat-continueshopping").on("click", function(e) {
                                    e.preventDefault();

                                    $.ajax({
                                        type     : "POST",
                                        url      : app.urls.fiftyOneContextChooserSave,
                                        data     : {country : countryFromCookie, currency : currencyFromCookie},
                                        dataType : "json",
                                        success  : function() {
                                           redirectToLocale(COUNTRY_LOCALE[countryFromCookie]);
                                        }
                                    });
                                });

                                $html.find("#dw51welcomeMat-shopUS").on("click", function(e) {
                                    e.preventDefault();

                                    $.ajax({
                                        type     : "POST",
                                        url      : app.urls.fiftyOneContextChooserSave,
                                        data     : {country : "US", currency : "USD"},
                                        dataType : "json",
                                        success  : function() {
                                            redirectToLocale("default");
                                        }
                                    });
                                });
                                
                                $html.find("#dw51welcometMat-close").on("click", function(e) {
                                    $welcomeMatDialog.dialog("close");
                                });

                                $welcomeMatDialog.html( $html );
                                $welcomeMatDialog.dialog("option", "position", "center");

                            }
                        });

                        // Close the modal on clicking the overlay
                        app.ClickOutsideModal.bindHere();
                    },
                    close : function(event, ui) {
                        var $thisDialog = $(this);
                        $thisDialog.dialog("destroy").remove();
                    }
                }
            }).dialog("open");
        }
    }

    function initCountryAndFlag() {
        
        var dw51cacheCookie = $.cookie("dw51cache");
        var isValidCookie   = (dw51cacheCookie != null) && (typeof dw51cacheCookie === "string") && /^([a-zA-Z]+)\|([a-zA-Z]+)\|(.+)$/.test(dw51cacheCookie);
    
        if (isValidCookie) {
            var dw51cacheCookieParts   = dw51cacheCookie.split("|");
            var dw51cacheCookieCountry = dw51cacheCookieParts[0];
            localStorage.setItem("dw51cacheCookieCountry", dw51cacheCookieCountry);
        }
        else
            {
              var newURL = window.location.href;
              var index = newURL.indexOf("default");
              var fullURLIndex = newURL.indexOf("Sites-brooksbrothers-Site");
              if(index<=0)
                {
                  if (fullURLIndex>0) {
                      var dw51cacheCookieCountry = localStorage.getItem("dw51cacheCookieCountry");
                  } else {
                      localStorage.removeItem("dw51cacheCookieCountry");
                  }
                }
            }
            var $headerShippingCountry = $cache.shippingTabContentHeader.find(".shipping-tab-country");
            var $headerShippingFlag    = $cache.shippingTabContentHeader.find(".shipping-tab-flag"   );
            var $footerShippingCountry = $cache.shippingTabContentFooter.find(".shipping-tab-country");
            var $footerShippingFlag    = $cache.shippingTabContentFooter.find(".shipping-tab-flag"   );

            if (COUNTRY_NAMES.hasOwnProperty(dw51cacheCookieCountry)) {
                var countryName = COUNTRY_NAMES[dw51cacheCookieCountry];
         
                var coutryCode  = dw51cacheCookieCountry;
               
                var countryClass = countryName.replace(/\s|,/g, '').toLowerCase(),
                countryFlag = app.urls.fiftyOneCountryFlagsLrg + countryClass + ".png";
      

                if ($headerShippingCountry.size() > 0) {
                    $headerShippingCountry.html( countryName );
                }

                if ($headerShippingFlag.size() > 0) {
                    $headerShippingFlag.html($("<img>", {
                        "src" : countryFlag,
                        "alt" : coutryCode,
                        "height" : "100%",
                        "width" : "100%"
                    }));
                }

                if ($footerShippingCountry.size() > 0) {
                    $footerShippingCountry.html( countryName );
                }

                if ($footerShippingFlag.size() > 0) {
                    $footerShippingFlag.html($("<img>", {
                        "src" : countryFlag,
                        "alt" : coutryCode,
                        "height" : "100%",
                        "width" : "100%"
                    }));
                }
                
                /* Supporting unique flag dimensions -- IE fix */
                
                if(countryClass !== 'malta' && countryClass !== 'vaticancitystate') return;
                
                $footerShippingFlag.add($headerShippingFlag)
                    .addClass(countryClass);
                
        }
    }
    	
    $(".ship-to-background, .shipping-dest-close").click(function(e) {
    	e.preventDefault();
    	$(".ship-to-background").hide();
    	$("#fiftyone-shipping-tab-wrapper").hide();
        $("#fiftyone-shipping-tab-wrapper-footer").hide();
        $cache.shippingTabContentWrapper.slideUp(300, function() {
            $cache.shippingTabContent.html( $("<div>", {"class" : "loading"}) );
            $cache.shippingTabWrapper.removeClass("unfurled");
            $('#navigation').removeClass("hide");
            $('#wrapper').removeClass('overflow');
        });
	}); 
    
    function initContextChooser() {      
        $(document).delegate(".shipping-tab-trigger", "click",  function(e) {
            e.preventDefault();
            
            if($(e.currentTarget).hasClass('shipping-tab-trigger-scroll')) { 
                var tval = ($.browser.mobile) ? 0 : 1000;
                $.scrollTo($cache.shippingTabWrapper, tval);
            }
            
            $("#fiftyone-shipping-tab-wrapper").toggle();
            $("#fiftyone-shipping-tab-wrapper-footer").toggle();
            $(".ship-to-background").toggle();
            //alert("TEST");

            var isUnfurled      = $cache.shippingTabWrapper.hasClass("unfurled");
            var isHeaderTrigger = $(this).hasClass("shipping-tab-anchor-header");
            var $headerShippingToggle = $cache.shippingTabContentHeader.find(".shipping-tab-toggle");

            if (isUnfurled) {
                if (isHeaderTrigger) {
                    $cache.shippingTabContentWrapper.slideUp(300, function() {
                        $cache.shippingTabContent.html( $("<div>", {"class" : "loading"}) );
                        $cache.shippingTabWrapper.removeClass("unfurled");
                    });
                    $headerShippingToggle.find('.text').text('change');
                    $("#navigation").removeClass('hide');
                }
            }
            else {
                $cache.shippingTabContent.html( $("<div>", {"class" : "loading"}) );
                $cache.shippingTabWrapper.addClass("unfurled");
                $('#navigation').addClass("hide");
                $headerShippingToggle.find('.text').text('close');
                
                var dw51cacheCookie = $.cookie("dw51cache");
                var countryForContextChooser = "US";
                var currencyForContextChooser = "USD";
                
                if (dw51cacheCookie != null) { 
                    var dw51cacheCookieParts   = dw51cacheCookie.split("|");
                    countryForContextChooser = dw51cacheCookieParts[0];
                    currencyForContextChooser = dw51cacheCookieParts[1];
                }
                
                $cache.shippingTabContentWrapper.slideDown(300, function() {
                    $.ajax({
                        type        : "GET",
                        url         : app.urls.fiftyOneContextChooser,
                        dataType    : "html",
                        data        : {country : COUNTRY_NAMES[countryForContextChooser], currency : currencyForContextChooser, currencyName : CURRENCY_NAMES[currencyForContextChooser]},
                        success     : function(data) {
                            var $html = $(data);

                            $html.find("#dw51contextChooser-shopUK").on("click", function(e) {
                                e.preventDefault();

                                $.ajax({
                                    type     : "POST",
                                    url      : app.urls.fiftyOneContextChooserSave,
                                    data     : {country : "GB", currency : "GBP"},
                                    dataType : "json",
                                    success  : function(data) {
                                        redirectToLocale("en_GB");
                                    }
                                });

                                
                                $cache.shippingTabContentWrapper.slideUp(300, function() {
                                    $cache.shippingTabContent.html( $("<div>", {"class" : "loading"}) );
                                    $cache.shippingTabWrapper.removeClass("unfurled");
                                    $('#navigation').removeClass("hide");
                                });
                            });

                            $html.find("#dw51contextChooser-shopUS, #dw51contextChooser-shopWorld").on("click", function(e) {
                                e.preventDefault();

                                $.ajax({
                                    type     : "POST",
                                    url      : app.urls.fiftyOneContextChooserSave,
                                    data     : {country : "US", currency : "USD"},
                                    dataType : "json",
                                    success  : function(data) {
                                        redirectToLocale("default");
                                    }
                                });
                                                           
                                $cache.shippingTabContentWrapper.slideUp(300, function() {
                                    $cache.shippingTabContent.html( $("<div>", {"class" : "loading"}) );
                                    $cache.shippingTabWrapper.removeClass("unfurled");
                                    $('#navigation').removeClass("hide");
                                });
                            });

                            $cache.shippingTabContent.html( $html );
                            app.CountryCustomSelect.init();
                        }
                    });
                });
            }
        });
       /* $(document).mouseup(function (e){
            if ($cache.shippingTabContainer.has(e.target).length === 0)
            {
                $cache.shippingTabContentHeader.find(".shipping-tab-toggle")
                    .find('.text').text('change');
                $cache.shippingTabContentWrapper.slideUp(300, function(){
                    $("#navigation").removeClass('hide');
                    $cache.shippingTabWrapper.removeClass("unfurled");
                });
            }
        }); */
    }

    function initCheckoutMat() {
        var isOnCheckoutPage = $cache.wrapper.hasClass("pt_checkout"),
            disable = 0;
      
        if (isOnCheckoutPage) {
            
            // Invoking when custom select dropdown retracts --- must invoke even if same value is reselected (removing "change" event)
            
            $('#primary').delegate($cache.checkoutCountrySelects.selector, 'liszt:hiding_dropdown change', function(e) {
                
                if(e.target.id === 'dwfrm_billing_billingAddress_addressFields_country') return;

                /*
                 * Logic should go here only for UK country selection
                 */
                if(disable) return;
                
                var chzn = $(e.currentTarget.id + '_czn');
                
                var selectedVal = $(this).find("option:selected").attr("value");
                var countryList = ["AE", "AT", "BE", "CR","CY", "CZ", "DO","EC","ES", "EE", "FI", "FR", "DE", "GB", "GR", "GT","HN","IE", "IT", "JO", "LU","MX","NI", "NL","PA", "PT","PY", "SK", "SI","SV","TH", /*"VA",*/ "DK", "HU", "IS", "LV", "NO", "PL", "RU", "SE", "TR", "CH", "RO", "SA", "BH", "QA", "EG", /*"AO",*/ "OM", "KW"];
                var currencyVal = "GBP";

                if ($.inArray(selectedVal, countryList) != -1) {                  
                    currencyVal = COUNTRY_CURRENCY[selectedVal];                    
                    var $checkoutMatDialog = $("<div>", {"id" : "dw51CheckoutMatDialog"}).html( $("<div>", {"class" : "loading"}) );
                    app.dialog.create({
                        target  : $checkoutMatDialog,
                        options : {
                            width  : "730",
                            height : "auto",
                            open   : function(event, ui) {
                                
                                disable = 1;
                                
                                var $thisDialog = $(this);

                                $.ajax({
                                    type     : "GET",
                                    url      : app.urls.fiftyOneCheckoutMat,
                                    data     : {countryName : COUNTRY_NAMES[selectedVal], currency : currencyVal, currencyName : CURRENCY_NAMES[currencyVal]},
                                    dataType : "html",
                                    success  : function(data) {
                                        var $html = $(data);

                                        $html.find("#dw51checkoutMat-close").on("click", function(e) {
                                            e.preventDefault();
                                            $checkoutMatDialog.dialog("close");
                                        });
                                        
                                        /* YN- Change ID of the element to Generic instead of -shopUK */
                                        $html.find("#dw51checkoutMat-shopUK").on("click", function(e) {
                                            e.preventDefault();
                                            $.ajax({
                                                type     : "POST",
                                                url      : app.urls.fiftyOneContextChooserSave,
                                                data     : {country : selectedVal, currency : currencyVal},
                                                dataType : 'json',
                                                success  : function() {                                                 
                                                     $.ajax({
                                                        type     : "POST",
                                                        url      : app.urls.cartLocaleURL,
                                                        data     : {localeID : COUNTRY_LOCALE[selectedVal]},
                                                        dataType : 'json',
                                                        success: function(data) {
                                                            if(data) {
                                                                window.location.href=data['location'];
                                                            }
                                                        }
                                                       }); 
                                                }
                                            });
                                        });
                                        $checkoutMatDialog.html( $html );
                                        $checkoutMatDialog.dialog("option", "position", "center");
                                    }
                                });

                                // Close the modal on clicking the overlay
                                app.ClickOutsideModal.bindHere();
                            },
                            close : function(event, ui) {
                                $("#dwfrm_singleshipping_shippingAddress_addressFields_country").find("option:[value='US']").prop('selected', true);
                                $("#dwfrm_singleshipping_shippingAddress_addressFields_country").trigger('liszt:updated');
                                $("#dwfrm_singleshipping_shippingAddress_addressFields_country option[value='US']").change();
                                $("#pdict.CurrentForms.singleshipping.shippingAddress.addressFields.states.state.htmlName").change();
                                var $thisDialog = $(this);
                                $thisDialog.dialog("destroy").remove();
                                chzn.removeClass('chzn-container-active');
                                disable = 0;
                            }
                        }
                    }).dialog("open");
                }
            });
        }
    }

    app.FiftyOne = {
        init : function () {
            //initHeaderAndFooter();
            initWelcomeMat();
            initCountryAndFlag();
            initContextChooser();         
            initCheckoutMat();
          
        },
        countryLocales: COUNTRY_LOCALE
    };
}(window.app = window.app || {}, jQuery));


// app.ProductSortingOptions
(function (app, $) {
    app.ProductSortingOptions = {
        init : function() {
            if (app.CurrentCustomer.anonymous) {
                $("select.chzn-select-sort").each(function() {
                    var $select = $(this);
                    $select.find("option").each(function() {
                        var $option = $(this);
                        if ( $option.data("sruleId") === "recommended" ) {
                            $option.remove();
                            $select.trigger("liszt:updated");
                        }
                    });
                });
            }
        }
    };
}(window.app = window.app || {}, jQuery));



/**
 * Footer specific logic
 */
(function (app, $) {
    app.Footer = {
            
        init : function() {
            
            // Toggle responsive design switch
            $('#footer .responsivefulllink').on('click', function(e) {
                $.get(app.urls.allowResponsiveSwitch, function(e) {
                    window.location.reload(true);
                });
            });
        }
    };
}(window.app = window.app || {}, jQuery));


//app.equalateThem
(function (app, $) {
    app.equalateThem = {
        init : function () {
            if (app.CurrentCustomer.anonymous) {
                $("select.chzn-select-sort").each(function() {
                    var $select = $(this);
                    $select.find("option").each(function() {
                        var $option = $(this);
                        if ( $option.data("sruleId") === "recommended" ) {
                            $option.remove();
                            $select.trigger("liszt:updated");
                        }
                    });
                });
            }
        }
    };
}(window.app = window.app || {}, jQuery));


/**
 * Footer specific logic
 */
(function (app, $) {
    app.Footer = {
            
        init : function() {
            
            // Toggle responsive design switch
            $('#footer .responsivefulllink').on('click', function(e) {
                $.get(app.urls.allowResponsiveSwitch, function(e) {
                    window.location.reload(true);
                });
            });
        }
    };
}(window.app = window.app || {}, jQuery));


//app.equalateThem
(function (app, $) {
    app.equalateThem = {
        init : function () {
            /* START: Equal columns in the pages with a left nav
                      Usage: add the "left-tweak-jq" class to the element where the content is in the left nav, and "right-tweak-jq" to the element
                      which needs to get the height.
            */

            var leftNavH = $(".left-tweak-jq").outerHeight(),
            rightContentH = $(".right-tweak-jq").outerHeight();

            if ((leftNavH > rightContentH) || (leftNavH < $(".right-tweak-jq").data("lastHeight"))) {
                $(".right-tweak-jq").css("min-height", leftNavH).data("lastHeight", leftNavH);
            }

            /* END: Equal columns in the pages with a left nav */
        }
    };
}(window.app = window.app || {}, jQuery));

//app.equalateHRs
(function (app, $) {
    app.equalateHRs = {
        init : function () {
            /* START: Equal lines at the left and right of bottom footer (Copyright section) */

            var jqBFContainer = $("#footer-container .footer-down"),
                jqBFCopyright = $("#footer-container .footer-down .copyright"),
                jqHRWrappers = $("#footer-container .footer-down .hr-wrap hr");

            jqHRWrappers.each(function () {
                var jqSelf = $(this),
                    jqCalcWTS = Math.floor((jqBFContainer.outerWidth() - jqBFCopyright.outerWidth(true)) / 2);
                jqSelf.width(jqCalcWTS);
            });

            /* END: Equal lines at the left and right of bottom footer (Copyright section) */
        }
    };
}(window.app = window.app || {}, jQuery));

//app.promoMessageTweak
(function (app, $) {
    app.promoMessageTweak = {
        doNow : function () {
            /*
                This function's usage isn't of actuality anymore as of Bug 2109
                Will stay commented until minification
            */
            /*$('.product-price').each(function () {
                var $self = $(this);
                var $selfpromotion = $self.parent().parent().find("div.promotion");
                var widthProductPrice = $self.outerWidth() + 10;
                var heightPromotion = $selfpromotion.height();
                $selfpromotion.find('div.promotion-title').css("margin-left",widthProductPrice);
                $self.css("margin-bottom",heightPromotion);
            });*/
            var $pContent = $("#product-content");
            $pContent.each(function () {
                var $self = $(this),
                    $pPrice = $self.find(".product-price"),
                    $pPromoContainer = $self.find(".promotion"),
                    pPromoMaxWidth = $self.width() - $pPrice.width() - ($pPromoContainer.outerWidth(true) - $pPromoContainer.width()) - 5,
                    pPromoTopMargin = -(($pPromoContainer.height() / 2.0) - ($pPrice.height() / 2.0));
                var windowsize = $(window).width();
                if (windowsize < 768) {
                    var col1Height = $(".product-col-1").outerHeight(true);
                    var buttonsHeight = $(".buttons-wrapper").outerHeight(true);
                    var promotionalHeight = $("#promotion-mobile").outerHeight(true);
                    var descriptionHeight = $(".description-features").outerHeight(true);
                    var col2Height = $(".product-col-2").outerHeight(true);
                    var pnHeight = $(".product-number-mobile").outerHeight(true);
                    col2Height = col2Height - buttonsHeight - promotionalHeight - descriptionHeight - pnHeight

                    if (col1Height > col2Height){
                        var distance = (col1Height - col2Height) + 55;
                        $("#promotion-mobile").css('margin-top', distance);
                    }
                    else {
                        $("#promotion-mobile").css('margin-top', '55px');
                    }

                }
                else {
                    $("#promotion-mobile").css("margin-top","");
                    $(".product-add-to-cart .buttons-wrapper").css("padding-top","");
                }
                $pPromoContainer.css({
                    "max-width"  : pPromoMaxWidth,
                    "margin-top" : pPromoTopMargin
                });
            });
        },
        init : function () {
            app.promoMessageTweak.doNow();
        }
    };
}(window.app = window.app || {}, jQuery));

//app.CustomSelects
(function (app, $) {
    app.CustomSelects = {
        changeThem : function () {
            $("select.chzn-global-select").chosen({
                no_results_text          : app.resources.CHZN_SELECT_NO_RESULTS_TEXT,
                disable_search_threshold : 35
            }).change(function (e) {
                var $form      = $(this).parents("form:first");
                var hasForm    = (($form.size() > 0) && (typeof $form.data("validator") !== "undefined"));
                var isRequired = $(this).hasClass("required");

                if ( hasForm && isRequired && !e.isTrigger ) {
                    $form.validate(app.validator.settings).element( $(this) );
                }

                /* Update select inputs in case options dinamically changed upon changing the value */
                $("select.chzn-global-select").trigger("liszt:updated");

                e.preventDefault();
            });
        },

        init : function () {
            app.CustomSelects.changeThem();
        }
    };
}(window.app = window.app || {}, jQuery));

//app.CountryCustomSelects
(function (app, $) {
    app.CountryCustomSelect = {
        init: function() {
        	/*
            var el = $('.country-select-custom');
            
            function opt_val(e) {
                var node = e, this_opt = node[node.selectedIndex],
                val = this_opt.text, flag_name = val.split('(')[0].replace(/\s|,/g, '').toLowerCase(),
                flag = el.data('img-src') + flag_name + '.png',
                flag_el = el.find('.country-flag');
                        
                el.find('.value').html(val);
                
                if(e.value.toLowerCase() == 'default') {
                    flag_el.css('display','none');
                    el.parent().addClass('default-selected');
                    return;
                }
                
                el.parent().removeClass('default-selected');
                flag_el.find('img').attr('src', flag);
                if(flag_el.css('display') == 'none' ) flag_el.css('display','block');
                flag_el.attr('class', 'country-flag');
                
                
                /* Supporting unique flag dimensions -- IE fix 
                if(flag_name !== 'malta' && flag_name !== 'vaticancitystate') return;
                flag_el.attr('class', 'country-flag ' + flag_name);
            }
            
            opt_val(el.find('select').get(0));
            
            el.delegate('select', 'change', function(e){
                opt_val(e.currentTarget, false);
            });
            */
        }
    };
}(window.app = window.app || {}, jQuery));


//app.tooltips
(function (app, $) {
    var $cache = {};
    app.tooltips = {

        init : function () {

            $('.tooltip').tooltip({
                track: true,
                showURL: false,
                bodyHandler: function() {
                    // add a data attribute of data-layout="some-class" to your tooltip-content container if you want a custom class
                    var tooltipClass = "";
                    if( tooltipClass = $(this).find('.tooltip-content').data("layout") ) {
                        tooltipClass = " class='" + tooltipClass + "' ";
                    }
                    return "<div " + tooltipClass + ">" + $(this).find('.tooltip-content').html() + "</div>";
                },
                showURL: false
            });
        }
    };

}(window.app = window.app || {}, jQuery));



// app.product
(function (app, $) {
    var $cache;

    /*************** app.product private vars and functions ***************/
    function loadProductSetVariations() {
        var varContainers = $(".psvariations");
        // if no hash exists, or no pid exists, or nav container does not exist, return
        if (!varContainers || varContainers.length === 0) {
            // Already loaded variations, only check availability
            var vars = $(".product-variations");
            vars.each(function () {
                jqThis = $(this);
                var ic = jqThis.closest(".product-set-item");
                var qty = ic.find(".qty-select");
                var size = ic.find(".size-sel");
                if(qty && qty.length > 0 && qty.data("available") > 0 && size && ((size.length > 0 && size.val() != "") || size.length == 0)){
                    ic.find(".add-to-cart").removeAttr('disabled');
                }
            });
        }
        else {
            varContainers.each(function(){
                // Ajax load variations controls
                jqThis = $(this);
                var ic = jqThis.closest(".product-set-item");
                app.ajax.load({
                    url: jqThis.data('url'),
                    target: jqThis,
                    callback : function (data) {
                        var qty = ic.find(".qty-select");
                        var size = ic.find(".size-sel");
                        if(qty && qty.length > 0 && qty.data("available") > 0 && size && ((size.length > 0 && size.val() != "") || size.length == 0)){
                            ic.find(".add-to-cart").removeAttr('disabled');
                        }
                        jQuery.CustomFormElements();
                        app.CustomSelects.changeThem();
                        /* Promo Message Tweak */
                        app.promoMessageTweak.doNow();
                    }
                });
            });
        }
    }

    function loadProductNavigation() {
        var pidInput     = $cache.pdpForm.find("input[name='pid']").last();
        var navContainer = $("#product-nav-container");

        // if no hash exists, or no pid exists, or nav container does not exist, return
        if(pidInput.length===0 || navContainer.length===0) {
            return;
        }

        var pid        = pidInput.val();
        var hashParams = "";

        if (typeof navContainer.attr("data-product-set-id") != "undefined") {
            pid = navContainer.attr("data-product-set-id");
        }

        if(window.location.hash && window.location.hash.length > 1){
            hashParams += window.location.hash.substr(1);
        }
        if (hashParams.indexOf("pid="+pid) < 0) {
            hashParams += (hashParams.length > 0 ? "&" : "") + "pid="+pid;
        }
        var url = app.urls.productNav;
        if(hashParams.length > 0){
            url += (url.indexOf("?") < 0 ? "?" : "&") + hashParams;
        }
        app.ajax.load({url:url, target: navContainer});
    }

    //creates product recommendation carousel using jQuery jcarousel plugin
    function loadRecommendations() {
        var carousel = $("#carousel-recomendations");
        if(!carousel || carousel.length === 0 || carousel.children().length === 0) {
            return;
        }

        carousel.jcarousel(app.components.carouselSettings);
    }

    /**
     @description Sets the main image attributes and the href for the surrounding <a> tag
     @param {Object} atts Simple object with url, alt, title and hires properties
     */
    function setMainImage(atts) {
        var imgZoom = $cache.pdpMain.find("a.main-image");
        if (imgZoom.length>0) {
            imgZoom.attr("href", atts.hires);
        }

        imgZoom.find("img.primary-image").attr({
            "src" : atts.url,
            "alt" : atts.alt,
            "title" : atts.title
        });
    }

    /**
     @description helper function for swapping main image on swatch hover
     @param {Element} element DOM element with custom data-lgimg attribute
     */
    function swapImage(element) {
        var lgImg = $(element).data("lgimg");

        if(lgImg){
            var newImg = $.extend({}, lgImg);
            var imgZoom = $cache.pdpMain.find("a.main-image");
            var mainImage = imgZoom.find("img.primary-image");
            // store current image info
            lgImg.hires = imgZoom.attr("href");
            lgImg.url = mainImage.attr("src");
            lgImg.alt = mainImage.attr("alt");
            lgImg.title = mainImage.attr("title");
            // reset element's lgimg data attribute
            $(element).data(lgImg);
            // set the main image
            setMainImage(newImg);
        }
    }

    function replaceImages() {
        var $newImages      = $("#update-images");
        var $imageContainer = $cache.pdpMain.find("div.product-image-container");
        var $primaryImage   = $imageContainer.find("div.product-primary-image");
        var $thumbnailsWrap = $imageContainer.find("div.thumbnails-wrap");

        $primaryImage.remove();
        $thumbnailsWrap.remove();
        $imageContainer.prepend($newImages.html());
        $newImages.remove();
        setMainImageLink();
        checkMobileElements();
    }
    
    function checkMobileElements(){
    	if($('#wrapper').width() <=768){
    		// Flexslider
            if($(".pdp-main .product-thumbnails").length != 0){
                $('.pdp-main .product-thumbnails').addClass('flexslider');
                $('.pdp-main .product-thumbnails ul').addClass('slides');
                $('.flexslider').flexslider({
                    animation: "slide",
                    slideshow: false,
                    animationLoop: false,
                    directionNav: false
                  });
            } else {
            	$('.pdp-main .product-primary-image').addClass('no-thumbs');
            }
            
            if($('.product-col-1 .product-top-details').length == 1){
	    		$('.product-col-1').find('.product-top-details').prependTo('.product-col-1');
	    	}
	   
	    	if($('.product-col-1 .product-top-details').length == 1 && $('.product-col-2 .product-top-details').length == 1){
	    		$('.product-col-1').find('.product-top-details').prependTo('.product-col-1');
	    		$('.product-col-2').find(".product-top-details").remove(); 
	    	} 
	    	
	    	if($('.product-col-1 .product-top-details').length < 1 && $('.product-col-2 .product-top-details').length == 1){
	    		$('.product-col-2').find('.product-top-details').prependTo('.product-col-1');
	    	} 
	    	
	    	$('.pdp-social').appendTo('.product-col-2');
    	}
    	
    }
    
    function setMainImageLink() {
        /*
        if (app.quickView.isActive() || app.isMobileUserAgent) {
            $cache.pdpMain.find("a.main-image").removeAttr("href");
        }
        else {
            $cache.pdpMain.find("a.main-image").addClass("image-zoom");
        }
        */
    }


    function initializeDom() {
        $cache.pdpMain.find('div.product-detail .product-tabs').tabs();
        if($('#pwrwritediv').length > 0) {
            var options = $.extend(true, {}, app.dialog.settings, {
                autoOpen : true,
                height : 750,
                width : 650,
                dialogClass : 'writereview',
                title : 'Product Review',
                resizable : false
            });

            app.dialog.create({
                target : app.ui.reviewsContainer,
                options : options
            });
        }
        loadRecommendations($cache.container);
        loadProductNavigation();
        setMainImageLink();

        if ($cache.productSetList.length>0) {
            var unavailable = $cache.productSetList.find("form").find("button.add-to-cart[disabled]");
            if (unavailable.length > 0) {
                $cache.addAllToCart.attr("disabled", "disabled");
                $cache.addToCart.attr("disabled", "disabled"); // this may be a bundle

            }
            loadProductSetVariations();
        }       
        
        // Hide responsive/desktop toggle on non-mobile devices
        var responsiveSwitch = jQuery('.responsivefulllink');
        if(!jQuery.browser.mobile && responsiveSwitch.length > 0) {
            responsiveSwitch.remove();
        }
    }

    function initializeCache() {
        $cache = {
            productId : $("#pid"),
            pdpMain : $("#pdpMain"),
            productContent : $("#product-content"),
            thumbnails : $("#thumbnails"),
            bonusProductGrid : $(".bonusproductgrid"),
            imageContainer : $(".product-primary-image"),
            productSetList : $("#product-set-list"),
            addToCart : $("#add-to-cart"),
            addAllToCart : $("#add-all-to-cart")
        };
        $cache.detailContent = $cache.pdpMain.find("div.detail-content");
        $cache.pdpForm = $cache.pdpMain.find("form.pdpForm");
        $cache.swatches = $cache.pdpMain.find("ul.swatches");
        $cache.mainImageAnchor = $cache.imageZoom = $cache.imageContainer.find("a.main-image");
        $cache.mainImage = $cache.mainImageAnchor.find("img.primary-image");
    }

    function initializeEvents() {
    	if ($("#QuickViewDialog").length>0){
    		$cache.pdpMain=$("#QuickViewDialog #pdpMain");
    	}
        /* Product image modal */
        $cache.pdpMain.on('click', 'div.mousetrap', function (e) {
            e.preventDefault();
            
            if($("#QuickViewDialog").length == 0){
            	 // Create Modal
            	var currentWidth = $(document).width();
            	var currentHeight = $(document).height();
            	
                $("#root").prepend("<div class='pdp-detailview-container-bg' style='width:"+currentWidth+"px;height:"+currentHeight+"px;'><div class='pdp-detailview-container'><a class='pdp-detailview-close'></a></div></div>");
                
                //var RootHeight = $("#root").height();
                //$(".pdp-detailview-container-bg").css("height", RootHeight);
                
                // Add Thumbnails to Product Zoom Modal
                $('#thumbnails.product-thumbnails').clone().appendTo('.pdp-detailview-container').addClass('pdp-detailview-thumbnails');
                $('.pdp-detailview-thumbnails ul.pdp-thumbnails li.thumb a').attr('class', 'pdp-detailview-thumbnail-link');
                $('.pdp-detailview-thumbnail-link').removeAttr('target');
                $('.pdp-detailview-thumbnail-link').attr("href", "#");
                
                var $img = $(this).siblings("a.product-image:first");
                var $dlg = $("<div>").attr("id", "dialog-product-image-zoom").attr("class", "mousetrap-zoom").html( $("<img>").attr("src", $img.attr("href")) );

                $('.pdp-detailview-container').append($dlg);
                
            }
           
            
            
        });

        
        
        $cache.pdpMain.on('click', '.product-col-2.product-set .product-set-item .product-set-details .product-name a', function(e){
        	e.preventDefault();
        	var prodUrl = $(this).attr('href');
        	return false;
        });
        
        $cache.pdpMain.on('click', '.ui-dialog div.mousetrap', function (e){
        	e.preventDefault();
        	return false;
        })

        
        $('.pdp-detailview-container ul li').live('click', '.pdp-detailview-thumbnail-link', function(e) {
        	e.preventDefault();
        	var $img = $(this).find('img').attr('src'),
        		$imgLink = $img.split("?")[0],
        		$imgSize = $img.split("?")[1];
        	$imgSize = "?$bbenlarged$";
        	var $newImg = $imgLink+$imgSize;
        	$('#dialog-product-image-zoom').find('img').attr('src', $newImg);
        });

        $('.pdp-detailview-close').live('click', function(e){
        	e.preventDefault();
        	$('.pdp-detailview-container-bg').remove();
        });
        
        $cache.pdpMain.on('click', 'a.product-image', function (e) {
            e.preventDefault();

            var $img = $(this);
            var $dlg = $("<div>").attr("id", "dialog-product-image-zoom").html( $("<img>").attr("src", $img.attr("href")) );

            app.dialog.create({
                target  : $dlg,
                options : {
                    width    : $(window).width(),
                    height   : "auto",
                    position : ['top', 0],
                    open     : function(event, ui) {
                        /* Close the modal on clicking the overlay */
                        app.ClickOutsideModal.bindHere();
                        var dialogPosition = $(".ui-dialog-content").offset();
                        window.scrollTo(dialogPosition.top,0);
                        $(".ui-dialog-content").dialog("option", "position", "top");
                    },
                    close    : function(event, ui) {
                        $(this).dialog("destroy").remove();
                    }
                }
            }).dialog("open");
        });
        
        /* SOCIAL MEDIA SHARING */
        
        $cache.pdpMain.on('mouseenter', '.pdp-social .pdp-social-menu ul li', function(e){
        	e.preventDefault();
		 	var loc = $(this).attr('class');
		 	
		 	//set over/active states
    		$('.pdp-social').addClass("active");
    		$(this).addClass("over");
    		
    		//if active state exists, remove it
    		if($('.pdp-social .active').length){
    			$('.pdp-social-menu').find(".active").removeClass("active");
    		}

    		//set specific active state
    		$(this).addClass("active");
    		
    		//if content is visible, hide it
    		if($('.show').length){
    			$('.pdp-social .pdp-social-content').find('.show').removeClass("show");
    		}
    		//show corresponding social content
    		$('.pdp-social .pdp-social-content').find('#'+loc).addClass("show");
        });
        
        $cache.pdpMain.on('mouseleave', '.pdp-social .pdp-social-menu ul li', function(e){
        	e.preventDefault();
	    	//remove over state
	    	$(this).removeClass("over");
	    	//hide active social content
	    	if(!$('.show').length){
	    		$('.pdp-social').find(".active").removeClass("active");
    		}
        });
        
        
        $cache.pdpMain.on('mouseleave', '.pdp-social', function(){
	    		$(this).find(".show").removeClass("show");
	    		$(this).removeClass("active").find(".active").removeClass('active');
        });
        
        /* Set Stock msg */
        var prodUrl = window.location.href;
    	var outofstockMsg = $('<div class="out-of-stock-msg"><span>Out of Stock</span></div>');
    	
    	if($("ul.swatches.Fit li").hasClass("outofstock")){
    		outofstockMsg.insertBefore("li.outofstock a");
    	};
    	
    	/* Add Open Graph URL Meta Tag */
    	$('head').find('meta[property="og:url"]').attr("content", prodUrl);
    	
    	/* Recommendation Hover State Effect */
    	$('.pdp-main .recommendations li').hover(function(){
    		$('.pdp-main .recommendations li').toggleClass("hovered");
    		$(this).toggleClass("current");
    	});
 
    	$('.pdp-main .recommendations li').click(function(){
    		s.eVar72 = 'cross sell > ' + omnPageName;
    		s.t();
    	});
    	
    	/* Black Fleece / Red Fleece mini logo */
    	$('#pdp-bf-logo, #pdp-rf-logo').click(function(e){
    		var asset = $('.pdp-content-slot-1').offset();
    		if($('#wrapper').width() > 767){
    			$('html, body').animate({ scrollTop: (asset.top -80) }, 500);
    		}
    		e.preventDefault();
    	});
    	
    	
    	
        /* START: Setup for the PDP Specialhandling accordion */

        /* Manual bottom setting - in case the initialBottom variable fails to load the current rule */
        var initialBottom = "95px";

        if (parseInt($('.product-col-2').find('.specialhandling').css('bottom')) > 0) {
            initialBottom = $('.product-col-2').find('.specialhandling').css('bottom');
        }

        /* END: Setup for the PDP Specialhandling accordion */

        var availabilityContainer = $cache.pdpMain.find("div.availability");

        app.product.initAddThis();

        // add or update shopping cart line item
        app.product.initAddToCart($cache.pdpMain);

        // Special handling events
        $cache.pdpMain.on('click', '.pd-expandable h3', function (e) {
            var jqThis = $(this);

            /* START: Setup for the PDP Specialhandling accordion */

            var setMargins = 36;
            var totalHProductForm = (jqThis.parents(".specialhandling").outerHeight() + jqThis.parents(".specialhandling").find('.to-expand').outerHeight()) - jqThis.parents(".specialhandling").position().top - parseInt(initialBottom) - setMargins;

            if (totalHProductForm != 0) {
                temporaryBottom = -(totalHProductForm);
            }
            else {
                temporaryBottom = 0;
            }

            /* END: Setup for the PDP Specialhandling accordion */

            if(!jqThis.hasClass("qvlink")){
                e.preventDefault();

                if(jqThis.hasClass("to-envelope")) {
                    var $envcb = jqThis.children("span");
                    var inputs = jqThis.parents("div.envelope").find(".address input");
                    if($($envcb).hasClass("elem-checkbox")) {
                        jqThis.parents("div.envelope").find(".address input").each(function () {
                            var jqInput = $(this);
                            var sheetid = jqInput.attr("id").replace("envelope", "sheet");
                            var copyValue = jqInput.parents("div.to-expand").find("input#" + sheetid).val();
                            jqInput.val(copyValue);
                            if(copyValue != "" && copyValue != jqInput.attr("placeholder")){
                                jqInput.removeClass("placeholder");
                            }
                        });
                    }
                    else {
                        jqThis.parents("div.envelope").find(".address input").each(function () {
                            $(this).val("");
                        });
                    }

                    $($envcb).toggleClass("elem-checkbox");

                }
                else {
                    var pdexpandableDiv = jqThis.parents(".pd-expandable");

                    /* START: Timer and css for the slide toggle */

                    var setTimer;
                    if (pdexpandableDiv.find("div.to-expand").css("display") == "none") {
                        setTimer = 500;
                        $(this).parents('.specialhandling').css({
                            'bottom' : temporaryBottom
                        });
                        pdexpandableDiv.find("div.to-expand").slideToggle(setTimer);
                    }
                    else {
                        setTimer = 1;
                        pdexpandableDiv.find("div.to-expand").slideToggle(setTimer, function () {
                            $(this).parents('.specialhandling').css({
                                'bottom' : initialBottom
                            });
                        });
                    }

                    /* END: Timer and css for the slide toggle */

                    jqThis.toggleClass("not-expanded");
                   //app.PDP.toggleSpecialHandlingCheckbox(jqThis, jqThis.parent().hasClass("applied"));

                }
            }
            else
            {
                window.location.href = jqThis.attr('href');

            }

        });

        $cache.pdpMain.on("mouseenter", "a.style-tooltip", function(event) {
            $(this).find("div.hover-tooltip").stop(true, true).fadeIn("300");
        }).on("mouseleave", "a.style-tooltip", function(event) {
            $(this).find("div.hover-tooltip").stop(true, true).fadeOut("300");
        }).on("click", "a.style-tooltip", function (event) {
            event.preventDefault();
        });
        /*this is for the size-info-link dialog box*/
      /*  $cache.pdpMain.on("click", "a.size-info-link", function (event) {
            $(".size-info-content").dialog({
                bgiframe: true,
                modal: true,
                height: 120,
                dialogClass: alert,
                open: function() {
                    jQuery('.ui-widget-overlay').bind('click', function() {
                        $(".size-info-content").dialog('close');
                    });
                    },
                close: function(){
                     $(".ui-dialog-content").dialog("destroy");
                  }
                });
            var position = $(".size-info-content").dialog('option', 'position');
            $(".size-info-content").dialog('option', 'position', 'center');
        });*/
        $cache.pdpMain.on('change', '.pd-expandable div.address input', function () {
            app.PDP.toggleToEnvelopeCheckbox();
        });

        $cache.pdpMain.on('click', '.pd-expandable a.swatchanchor', function (e) {
            var jqThis = $(this);
            if (e.target.nodeName === 'A') {
                jqThis.children('input').prop('checked', true);
            }
            jqThis.parents('ul.swatches').find('input[type="radio"]').each(function () {
                var jqRadio = $(this);
                var jqListitem = jqRadio.parent("a").parent("li");
                jqListitem.toggleClass("selected", jqRadio.prop('checked'));
                jqListitem.toggleClass("emptyswatch", !jqRadio.prop('checked'));
            });
            $(".specialhandling").removeClass("applied");
        	$(".pdp-main button#apply-and-close").text("Apply");
            UpdatePreview();
        });
        $cache.pdpMain.on('click', '.pd-expandable a#cancel-btn', function (e) {
            e.preventDefault();
            $("#add-to-wishlist").live('mouseover mouseout', function(event) {
        		if (event.type == 'mouseover') {
            		$(".wishlist-pdp-tooltip").css("display","none");
            	} else {
            		$(".wishlist-pdp-tooltip").css("display","none");
            	}
        	});
            var jqThis = $(this);
            $cache.addToCart.removeAttr("disabled");
            var pdexpandableDiv = jqThis.parents(".pd-expandable");
            //$(".wdc-toggle-menu.specialhandling").removeClass("active")
            $('.summary-monogram').empty();
            $('#monogram-initials').val("");
            $(".specialhandling").removeClass("applied");
        	$(".pdp-main button#apply-and-close").text("Apply");
            $('#wdc-accordion-single li.wdc-toggle-menu').removeClass("accordion-open");
    		//slide up all the link lists
    		$("#wdc-accordion-single ul li.specialhandling ul.toggle-menu-body-wrapper").slideUp(600);
            
            pdexpandableDiv.find("div.to-expand").slideToggle(1, function () {

                /* START: PDP Specialhandling accordion - css settings */

                $(this).parents('.specialhandling').css({
                    'bottom' : initialBottom
                });
                
                
                /* END: PDP Specialhandling accordion - css settings */

            });
            pdexpandableDiv.find("h3 a").toggleClass("not-expanded");
            pdexpandableDiv.find("span.specialhandling-checkbox").addClass("elem-checkbox");
            app.PDP.toggleSpecialHandlingCheckbox(jqThis, false);
            
            UpdatePreviewTyping();
        });
        $cache.pdpMain.on('click', '.pd-expandable button#apply-and-close', function (e) {
            e.preventDefault();
            $("#add-to-wishlist").live('mouseover mouseout', function(event) {
        		if (event.type == 'mouseover') {
            		$(".wishlist-pdp-tooltip").css("display","block");
            	} else {
            		$(".wishlist-pdp-tooltip").css("display","none");
            	}
        	});
            var jqThis = $(this);
            
            app.PDP.toggleSpecialHandlingCheckbox(jqThis, true);
            
            /*
            var isMonogram = jqThis.parents("li.specialhandling.ME").length > 0;
            if(isMonogram && !jqThis.hasClass("active")) {
            	return false;
            }
            */
            
            var pdexpandableDiv = jqThis.parents(".pd-expandable");
            
            if($(".pdp-main .product-col-2 h3.special-handling-header").hasClass("monogram-header")){
            	SubmitSpecialHandling();
            }
            
            if(pdexpandableDiv){
                var validateURL = pdexpandableDiv.data("validate");
                var form = jqThis.closest("form");
                var errordiv = pdexpandableDiv.find(".errormessage");
                var summarydiv = pdexpandableDiv.find("h3 span.summary");
                errordiv.html("");
                
                if(validateURL){
                    // Validate form

                    // First remove placeholder fallback values
                    form.find('.placeholder').val('');
                    var data = form.serialize();
                    
                    $.ajax({
                        dataType : "json",
                        url: validateURL,
                        data: data
                    })
                    .done(function (response) {
                        if(response){
                            // Recreate placeholders
                            form.find('.placeholder').blur();
                            if(response.success){
                            	//alert("success");
                            	
                            	$(".specialhandling").addClass("applied");
                            	$(".pdp-main button#apply-and-close").text("Applied");
                            	$(".wdc-toggle-menu.specialhandling").removeClass("active")
                            	$("#wdc-accordion-single li.wdc-toggle-menu").removeClass("accordion-open");
                         		
                         		//slide up all the link lists
                         		$("#wdc-accordion-single ul li.specialhandling ul.toggle-menu-body-wrapper").slideUp(600);
                            	
                                pdexpandableDiv.find("div.to-expand").slideToggle(1, function () {

                                    /* START: PDP Specialhandling accordion - css settings */

                                    $(this).parents('.specialhandling').css({
                                        'bottom' : initialBottom
                                    });

                                    /* END: PDP Specialhandling accordion - css settings */

                                    /* Trim the summary span if necessary */

                                    app.trimText.trimFnc(".product-col-2 .specialhandling h3 a span.summary", 3);

                                    pdexpandableDiv.find("span.specialhandling-checkbox").removeClass("elem-checkbox");

                                });
                                pdexpandableDiv.find("h3 a").toggleClass("not-expanded");
                                app.PDP.toggleSpecialHandlingCheckbox(jqThis, true);
                                if(response.summary){
                                    summarydiv.html(response.summary);
                                }

                            }
                            else{
                            	//alert("error");
                                summarydiv.html("");
                                errordiv.show().html(response.error);
                                app.PDP.toggleSpecialHandlingCheckbox(jqThis, false);
                                app.Omniture.reportExistingErrors("client");
                            }
                        }
                    });
                }

            }

            return false;
        });

        // Other PDP events

        // product quantity change event handler
        $cache.pdpMain.on("change", "form.pdpForm select.qty-select", function (e) {
            var jqThis = $(this);
            // Reinit in case we are in quick view
            $cache.productId = $("#pid");
            $cache.addToCart = $("#add-to-cart");

            size = jqThis.find(".size-sel");
            if(size.length == 0 || (size.length > 0 && size.val() != "")){

                app.product.getAvailability($cache.productId.val(), jqThis.val(), function (data) {

                    // get a reference to all needed <div> msg container
                    availabilityContainer = $('div.availability');
                    var inventoryMsgContainer = jqThis.parents(".quantity-wrapper").find(".inventoryerror");
                    var inStockMsgContainer = availabilityContainer.find('.in-stock-msg');
                    var backorderMsgContainer = availabilityContainer.find('.backorder-msg');

                    // the product is available
                    if (data && data.isAvailable) {
                        $cache.addToCart.removeAttr("disabled");
                        $cache.addAllToCart.removeAttr("disabled");

                        inventoryMsgContainer.html('').hide();
                        inStockMsgContainer.html(data.inStockMsg).show();
                        if (data.levels.BACKORDER == 0) {
                            backorderMsgContainer.hide()
                            $('.back-order-information').hide();
                        }
                        else{
                            inStockMsgContainer.html(data.inStockMsg).hide();
                            inStockMsgContainer.html(data.quantityInStockMsg).show();
                            backorderMsgContainer.html(data.inStockDateMsg).show();
                            var backOrderInformation = $('.back-order-information');
                            var backOrderModal = $(".back-order");
                            backOrderInformation.show();
                            backOrderInformation.click(function(){
                                backOrderModal.dialog({
                                    bgiframe: true,
                                    modal: true,
                                    dialogClass: alert,
                                    open: function() {
                                        jQuery('.ui-widget-overlay').bind('click', function() {
                                            backOrderModal.dialog('close');
                                        });
                                        jQuery(".ui-widget-overlay").addClass('back-order-overlay');
                                        setTimeout("$('.back-order').dialog('close')",5000);
                                        },
                                    close: function(){
                                         $(".ui-dialog-content").dialog("destroy");
                                      }
                                    });
                                var position = backOrderModal.dialog('option', 'position');
                                backOrderModal.dialog('option', 'position', 'center');
                            });
                        }
                    }
                    // the product is not available
                    else{
                        $cache.addToCart.attr("disabled", "disabled");

                        inventoryMsgContainer.html(data.qtyUnavailableMsg).show();
                        inStockMsgContainer.html(data.inStockMsg).show();

                        app.Omniture.reportExistingErrors("client");
                    }
                    
                    // Reinizialize event handlers
                    if( jQuery('.genericTooltip.memberTooltip').length == 0 ) {
                        app.util.mOverToolTip( jQuery('.discountagepercent.yourPrice.image'), 'top', app.customerSettings.firstName, app.resources.MEMBER_DISCOUNT_TOOLTIP, "memberTooltip");
                    }
                });
            }
        });
        $cache.pdpMain.on("click", "a.wl-action", function (e) {
            // work around for bundle products. options dropdown not included within form.
            e.preventDefault();

            var data = app.util.getQueryStringParams($cache.pdpForm.serialize());
            if (data.cartAction) {
                delete data.cartAction;
            }
            
            var url = app.util.appendParamsToUrl(this.href, data);
            url = this.protocol + "//" + this.hostname + ((url.charAt(0)==="/") ? url : ("/"+url));
            window.location.href = url;

        });

        //      $cache.pdpMain.find("ul.Color a.swatchanchor").tooltip({
        //          delay: 0,
        //          showURL: false,
        //          bodyHandler: function() {
        //              return $(this).parent().find("div.hover-tooltip").html();
        //          }
        //      });

        $cache.pdpMain.on("mouseenter", "ul.Color a.swatchanchor, ul.Style a.swatchanchor", function(event) {
            if (app.responsive && app.responsive.isTabletLayout()) {
                event.preventDefault();
                return;
            }

            if (jQuery && jQuery.browser && jQuery.browser.mobile) {
                event.preventDefault();
                return;
            }

            var jqThis = $(this),
                tooltip = jqThis.parent().find("div.hover-tooltip"),
                specialhandlingDiv = jqThis.parents(".specialhandling"),
                swatchGroup = jqThis.parents(".swatches"),
                showTooltip = true;

            if (jqThis.hasClass("monogram")) {
                var imgurl = jqThis.data("urlbase");
                if(imgurl && imgurl != ""){
                    if(!swatchGroup.hasClass("Color")){
                        var selectedColorInput = specialhandlingDiv.find(".Color input[type='radio']:radio:checked").first();
                        if(!selectedColorInput || selectedColorInput.length == 0){
                            selectedColorInput = specialhandlingDiv.find(".Color input[type='radio']").first();
                        }
                    }
                    else{
                        var selectedColorInput = jqThis.find("input");
                    }

                    if(!swatchGroup.hasClass("Style")){
                        var selectedFontInput = specialhandlingDiv.find(".Style input[type='radio']:radio:checked").first();
                        if(!selectedFontInput || selectedFontInput.length == 0){
                            selectedFontInput = specialhandlingDiv.find(".Font input[type='radio']").first();
                        }
                    }
                    else{
                        var selectedFontInput = jqThis.find("input");
                    }

                    // Cannot use .data since this will interprete certain codes in a weird way (e.g. as numbers)
                    var colorcode = selectedColorInput.attr("data-colorcode");
                    var charorder = selectedFontInput.attr("data-charorder");

                    var prevparams = selectedFontInput.data("prevparams");

                    if(prevparams != undefined && prevparams != ""){
                        // Compose letters based on charorder
                        var chars = new Array();
                        chars[2] = specialhandlingDiv.find("select.third").val();
                        chars[1] = specialhandlingDiv.find("select.second").val();
                        chars[0] = specialhandlingDiv.find("select.first").val();
                        if(chars[0] + chars[1] + chars[2] == ""){
                            chars[2] = "C";
                            chars[1] = "B";
                            chars[0] = "A";
                        }
                        var indexes = new Array(1,2,3);
                        for(var i = 0; i < 3 && i < charorder.length; i++){
                            var n = parseInt(charorder.charAt(i));
                            if(n != NaN){
                                indexes[i] = n;
                            }
                        }
                        initL = chars[indexes[0]-1];
                        initC = chars[indexes[1]-1];
                        initR = chars[indexes[2]-1];

                        imgurl += "?$color=" + colorcode + ",off&$swatch=BrooksBrothers/" + jqThis.data("urlid");
                        imgurl += "&$initR=" + initR + "&$initC=" + initC + "&$initL=" + initL;
                        imgurl += prevparams;
                        var mgimg = tooltip.find("img");
                        app.progress.show(mgimg.parents(".hover-container").first());
                        mgimg.unbind().on('load', function(){app.progress.hide()});
                        mgimg.attr("src",imgurl);
                    }
                    else{
                        showTooltip = false;
                    }
                }
            }
            if(showTooltip){
                tooltip.stop(true, true).fadeIn("300");
            }
        })
        .on("mouseleave", "ul.Color a.swatchanchor, ul.Style a.swatchanchor", function(event) {
            $(this).parent().find("div.hover-tooltip").stop(true, true).fadeOut("300");
        });

        $(document).on("click", "#mobileSpecialHandlingPreview", function(event) {
            var $specialHandling = $(".specialhandling");
            var imgUrl      = "";
            var fLetter     = "";
            var mLetter     = "";
            var tLetter     = "";
            var pStyle      = "";
            var pPrevParams = "";
            var pCharOrder  = "";
            var pColor      = "";

            fLetter = $specialHandling.find("select.first option:selected").val();
            mLetter = $specialHandling.find("select.second option:selected").val();
            tLetter = $specialHandling.find("select.third option:selected").val();

            if (fLetter + mLetter + tLetter == "") {
                fLetter = "A";
                mLetter = "B";
                tLetter = "C";
            }

            var $styleAnchor = $specialHandling.find("ul.swatches.Style > li.selected > a.monogram");
            if ($styleAnchor.size() > 0) {
                if (imgUrl == "") {
                    imgUrl = $styleAnchor.attr("data-urlbase");
                }

                pStyle = $styleAnchor.attr("data-urlid");

                var $inputStyle = $styleAnchor.find("> input[type='radio']:first");
                if ($inputStyle.size() > 0) {
                    pPrevParams = typeof $inputStyle.attr("data-prevparams") != "undefined" ? $inputStyle.attr("data-prevparams") : "";
                    pCharOrder  = typeof $inputStyle.attr("data-charorder")  != "undefined" ? $inputStyle.attr("data-charorder")  : "";
                }
            }

            var $colorAnchor = $specialHandling.find("ul.swatches.Color > li.selected > a.monogram");
            if ($colorAnchor.size() > 0) {
                if (imgUrl == "") {
                    imgUrl = $colorAnchor.attr("data-urlbase");
                }

                var $inputColor = $colorAnchor.find("> input[type='radio']:first");
                if ($inputColor.size() > 0) {
                    pColor = $inputColor.attr("data-colorcode");
                }
            }

            if (pCharOrder != "") {
                var chars = new Array();
                chars[0] = fLetter;
                chars[1] = mLetter;
                chars[2] = tLetter;

                var indexes = new Array(1, 2, 3);
                for (var i = 0; i < 3 && i < pCharOrder.length; i++) {
                    var n = parseInt(pCharOrder.charAt(i));
                    if(n != NaN) {
                        indexes[i] = n;
                    }
                }

                fLetter = chars[ indexes[0] - 1 ];
                mLetter = chars[ indexes[1] - 1 ];
                tLetter = chars[ indexes[2] - 1 ];
            }

            imgUrl += ("?$color=" + pColor);
            imgUrl += (",off&$swatch=BrooksBrothers/" + pStyle);
            imgUrl += ("&$initL=" + fLetter);
            imgUrl += ("&$initC=" + mLetter);
            imgUrl += ("&$initR=" + tLetter);
            imgUrl += pPrevParams;

            $(this).find("> div:first").html(
                $("<img>").attr({src : imgUrl})
            );
        });
        
        var lockedImg = {
				href: $cache.pdpMain.find("div.product-thumbnails .thumbnail-link:first-child").data("altImgHref"),
				src: $cache.pdpMain.find("div.product-thumbnails .thumbnail-link:first-child").data("altImgSrc"),
				alt: $cache.pdpMain.find("div.product-thumbnails .thumbnail-link:first-child").data("altImgAlt"),
				title: $cache.pdpMain.find("div.product-thumbnails .thumbnail-link:first-child").data("altImgTitle")
		};
        var imgLock = false;
        
        // Product alt images
        $cache.pdpMain.on("click", ".product-thumbnails a.thumbnail-link", function (e) {
        	imgLock = true;
            var newImg   = {
                href  : $(this).data("altImgHref"),
                title : $(this).data("altImgTitle"),
                src	  : $(this).data("altImgSrc"),
                alt	  : $(this).data("altImgAlt")
            };

            lockedImg = newImg;
            
        	if ($("#QuickViewDialog").length>0){
        		$cache.pdpMain = $("#QuickViewDialog #pdpMain");
        	}

            // switch indicator
            $cache.pdpMain.find("div.product-thumbnails li.selected").removeClass("selected");
            $(this).parents("li:first").addClass("selected");

            // switch image
            var $zoomLink    = $cache.pdpMain.find("div.product-primary-image a.product-image.main-image");
            var $zoomImage   = $zoomLink.find("img.primary-image:first");
            var hasCloudZoom = (typeof $zoomLink.data("zoom") !== "undefined") && ($zoomLink.data("zoom") !== null);

            if ( hasCloudZoom ) {
                $zoomLink.data("zoom").destroy();
            }

            $zoomLink.attr({
                href  : newImg.href,
                title : newImg.title
            });

            $zoomImage.attr({
                src   : newImg.src,
                alt   : newImg.alt,
                title : newImg.title
            });

            if ( hasCloudZoom ) {
                if ( !(app.responsive && app.responsive.isTabletLayout()) ) {
                    $zoomLink.CloudZoom();
                }
            }

            e.preventDefault();
            initializeCache();
        });
        
        var $imgThumb = $cache.pdpMain.find(".product-thumbnails a.thumbnail-link");
        
        $imgThumb.live({
        	mouseenter: function(e){
        		//if(!imgLock){
        			var newImg   = {
        	                href  : $(this).data("altImgHref"),
        	                title : $(this).data("altImgTitle"),
        	                src	  : $(this).data("altImgSrc"),
        	                alt	  : $(this).data("altImgAlt")
        	            };

                	if ($("#QuickViewDialog").length>0){
                		$cache.pdpMain = $("#QuickViewDialog #pdpMain");
                	}

                    // switch indicator
                    $cache.pdpMain.find("div.product-thumbnails li.selected").removeClass("selected");
                    $(this).parents("li:first").addClass("selected");

                    // switch image
                    var $zoomLink    = $cache.pdpMain.find("div.product-primary-image a.product-image.main-image");
                    var $zoomImage   = $zoomLink.find("img.primary-image:first");
                    var hasCloudZoom = (typeof $zoomLink.data("zoom") !== "undefined") && ($zoomLink.data("zoom") !== null);

                    if ( hasCloudZoom ) {
                        $zoomLink.data("zoom").destroy();
                    }

                    $zoomLink.attr({
                        href  : newImg.href,
                        title : newImg.title
                    });

                    $zoomImage.attr({
                        src   : newImg.src,
                        alt   : newImg.alt,
                        title : newImg.title
                    });

                    if ( hasCloudZoom ) {
                        if ( !(app.responsive && app.responsive.isTabletLayout()) ) {
                            $zoomLink.CloudZoom();
                        }
                    }

                    e.preventDefault();
                    initializeCache();
        		//}//check imgLock
        	},
        	mouseleave: function(e){
        		if(!imgLock){
        		var oldImg = {
        				href: $cache.pdpMain.find("div.product-thumbnails .thumbnail-link:first-child").data("altImgHref"),
        				src: $cache.pdpMain.find("div.product-thumbnails .thumbnail-link:first-child").data("altImgSrc"),
        				alt: $cache.pdpMain.find("div.product-thumbnails .thumbnail-link:first-child").data("altImgAlt"),
        				title: $cache.pdpMain.find("div.product-thumbnails .thumbnail-link:first-child").data("altImgTitle")
        		}

                	if ($("#QuickViewDialog").length>0){
                		$cache.pdpMain = $("#QuickViewDialog #pdpMain");
                	}

                    // switch indicator
                    $cache.pdpMain.find("div.product-thumbnails li.selected").removeClass("selected");
                    //$(this).parents("li:first").addClass("selected");
                    $cache.pdpMain.find("div.product-thumbnails li.thumb:first-child").addClass("selected");

                    // switch image
                    var $zoomLink    = $cache.pdpMain.find("div.product-primary-image a.product-image.main-image");
                    var $zoomImage   = $zoomLink.find("img.primary-image:first");
                    var hasCloudZoom = (typeof $zoomLink.data("zoom") !== "undefined") && ($zoomLink.data("zoom") !== null);

                    if ( hasCloudZoom ) {
                        $zoomLink.data("zoom").destroy();
                    }

                    $zoomLink.attr({
                        href  : oldImg.href,
                        title : oldImg.title
                    });

                    $zoomImage.attr({
                        src   : oldImg.src,
                        alt   : oldImg.alt,
                        title : oldImg.title
                    });

                    if ( hasCloudZoom ) {
                        if ( !(app.responsive && app.responsive.isTabletLayout()) ) {
                            $zoomLink.CloudZoom();
                        }
                    }

                    e.preventDefault();
                    initializeCache();
        		}else{
                    	if ($("#QuickViewDialog").length>0){
                    		$cache.pdpMain = $("#QuickViewDialog #pdpMain");
                    	}

                        // switch indicator
                        $cache.pdpMain.find("div.product-thumbnails li.selected").removeClass("selected");
                        //$(this).parents("li:first").addClass("selected");
                        $cache.pdpMain.find("div.product-thumbnails li.thumb:first-child").addClass("selected");

                        // switch image
                        var $zoomLink    = $cache.pdpMain.find("div.product-primary-image a.product-image.main-image");
                        var $zoomImage   = $zoomLink.find("img.primary-image:first");
                        var hasCloudZoom = (typeof $zoomLink.data("zoom") !== "undefined") && ($zoomLink.data("zoom") !== null);

                        if ( hasCloudZoom ) {
                            $zoomLink.data("zoom").destroy();
                        }

                        $zoomLink.attr({
                            href  : lockedImg.href,
                            title : lockedImg.title
                        });

                        $zoomImage.attr({
                            src   : lockedImg.src,
                            alt   : lockedImg.alt,
                            title : lockedImg.title
                        });

                        if ( hasCloudZoom ) {
                            if ( !(app.responsive && app.responsive.isTabletLayout()) ) {
                                $zoomLink.CloudZoom();
                            }
                        }

                        e.preventDefault();
                        initializeCache();
        		}//check imgLock
        	}
        });
        
        
        // dropdown options
        $cache.pdpMain.on("change", ".product-options select", function (e) {

            var salesPrice = $cache.pdpMain.find("div.product-add-to-cart .price-sales");

            var selectedItem = $(this).children().filter(":selected").first();
            var combinedPrice = selectedItem.data("combined");
            salesPrice.text(combinedPrice);
        });

        // prevent default behavior of thumbnail link and add this Button
        $cache.pdpMain.on("click", ".addthis_toolbox a", false);
        $cache.pdpMain.on("click", "li.unselectable a", false);

        // variation select change
        var variationselect = function (e) {
        	if ($("#QuickViewDialog").length>0){
        		$cache.pdpMain = $("#QuickViewDialog #pdpMain");
        		$cache.pdpForm = $cache.pdpMain.find("form.pdpForm");
        	}
            var jqThis = $(this);
            var isFit  = jqThis.hasClass("fit-select");
            var url    = this.value || jqThis.data("url");
            e.preventDefault();
            if ( $(this).find("option:selected").is(":disabled") ) {
                return;
            }

            if(url === "") {
                return;
            }

            var qty = $cache.pdpForm.find("select.qty-select").first().val(),
                productSet = jqThis.closest('.subProduct'),
                params = {
                    Quantity : isNaN(qty) ? "1" : qty,
                    cgid : app.product.categoryID ? app.product.categoryID : ''
                };

            //var target = (productSet.length > 0 && productSet.children.length > 0) ? productSet : $cache.productContent;
            var target = isFit ? $cache.pdpMain : $cache.productContent;

            var completeurl = app.util.appendOnlyNewParamsToUrl(url, params);
            specialHandlingParams = app.PDP.getSpecialHandlingParams($cache.pdpForm.serialize());
            if (specialHandlingParams.length > 0) {
                completeurl += (completeurl.indexOf("?") >= 0 ? "&" : "?") + specialHandlingParams;
            }
            app.progress.show($cache.pdpMain);
            app.ajax.load({
                url: completeurl,
                callback : function (data) {
                    target.html(data);
                    app.progress.hide();
                	if ($("#QuickViewDialog").length>0){
                		$cache.pdpMain = $("#QuickViewDialog #pdpMain");
                	}
                    app.product.initAddThis();
                    app.product.initAddToCart($cache.pdpMain);
                    // Apply custom form element styling
                    if("CustomFormElements" in jQuery) {
                        jQuery.CustomFormElements();
                    } 
                    /* Re-initialize Chosen */
                    app.CustomSelects.changeThem();
                    /* Promo Message Tweak */
                    app.promoMessageTweak.doNow();
                    serID = new String($('#pid').val());
                    omnProducts = new String($('.product-number span[itemprop=productID]').text());
                    if('pdpsProducts' in $(this)) {
                        $(this).pdpsProducts();
                    }
                    
                    if(s && 't' in s) {
                        s.t();
                    }

                    if(isFit){
                        initializeCache();
                        $cache.pdpMain = $("#QuickViewDialog #pdpMain");
                        setMainImageLink();
                        checkMobileElements();
                    }
                    else{
                        $cache.pdpForm = $cache.pdpMain.find("form.pdpForm");
                    }
                    // Refresh RememberedItems
                    app.RememberedItems.ProductDetail.initPage();
                    app.product.initProductDescription();
                    
                    if (typeof sr_updateMessages == "function"){
                        //update ShopRunner Messaging
                        sr_updateMessages();
                      //Adding functonality for PayPal Boost in order to display Paypal Boost on ajax reload
                        var element = $("div.paypal-boost2 div.paypal-content");
                        $(".paypal-boost").append(element);
                        $(".paypal-boost div.paypal-content").show();
                        $(".paypal-boost div.paypal-content").clone().appendTo( "div.paypal-boost2" );
                        $("div.paypal-boost2").hide();
                    }
                    //Recently Viewed
                    app.RecentlyViewedProducts.initPage();

                    if ( !(app.responsive && app.responsive.isTabletLayout()) ) {
                        //Re-initialize image zoom
                        $cache.pdpMain.find("a.cloud-zoom").CloudZoom();
                    }
                    // Init MyBuys
                    try {
                        mybuys.initPage();
                    } catch (e) {}
                    initializeCache();
                }
            });
            initializeCache();
        };
        $cache.pdpMain.on("change", "div.product-detail .product-variations .variation-select", variationselect);
        $cache.pdpMain.on("click", ".swatches.Fit a", variationselect);
        $cache.pdpMain.on("change", "div.product-detail .product-variations .variation-select", function() {
            
          	if ($("#monogram-initials").val() !== "") {
              	$("#add-to-wishlist").live('mouseover mouseout', function(event) {
              		if (event.type == 'mouseover') {
                  		$(".wishlist-pdp-tooltip").css("display","block");
                  	} else {
                  		$(".wishlist-pdp-tooltip").css("display","none");
                  	}
              	});
              } else {
              	$("#add-to-wishlist").live('mouseover mouseout', function(event) {
              		if (event.type == 'mouseover') {
                  		$(".wishlist-pdp-tooltip").css("display","none");
                  	} else {
                  		$(".wishlist-pdp-tooltip").css("display","none");
                  	}
              	});
              }
	          	$(document).on('click','.pd-expandable a#cancel-btn', function(event) {
	          		event.preventDefault();
	          		$("#add-to-wishlist").live('mouseover mouseout', function(event) {
	            		if (event.type == 'mouseover') {
	                		$(".wishlist-pdp-tooltip").css("display","none");
	                	} else {
	                		$(".wishlist-pdp-tooltip").css("display","none");
	                	}
	            	});
	          	});
          });
        // swatch anchor click
        $cache.pdpMain.on("click", "div.product-detail .product-variations li a.swatchanchor", function (e) {
            var jqThis = $(this),
                isColor = false
                url = this.href,
                isColor = jqThis.closest("ul.swatches").hasClass("Color");

            e.preventDefault();

            if(jqThis.parent("li").hasClass("selected")) {
                return;
            }
        	if ($("#QuickViewDialog").length>0){
        		$cache.pdpMain = $("#QuickViewDialog #pdpMain");
        		$cache.pdpForm = $cache.pdpMain.find("form.pdpForm");
        	}

            var qty = $cache.pdpForm.find("select.qty-select").first().val(),
                productSet = jqThis.closest('.subProduct'),
                params = {
                    Quantity : isNaN(qty) ? "1" : qty
                };

            var target = (productSet.length > 0 && productSet.children.length > 0) ? productSet : $cache.productContent;
            var completeurl = app.util.appendOnlyNewParamsToUrl(url, params);
            specialHandlingParams = app.PDP.getSpecialHandlingParams($cache.pdpForm.serialize());
            if (specialHandlingParams.length > 0) {
                completeurl += (completeurl.indexOf("?") >= 0 ? "&" : "?") + specialHandlingParams;
            }
            app.progress.show($cache.pdpMain);

            app.ajax.load({
                url: completeurl,
                callback : function (data) {
                    app.progress.hide();
                    target.html(data);
                	if ($("#QuickViewDialog").length>0){
                		$cache.pdpMain = $("#QuickViewDialog #pdpMain");
                		$cache.pdpForm = $cache.pdpMain.find("form.pdpForm");
                	}
                    app.product.initAddThis();
                    app.product.initAddToCart($cache.pdpMain);

                    if (isColor) {
                        replaceImages();
                    }

                    jQuery.CustomFormElements();

                    /* Re-initialize Chosen */
                    app.CustomSelects.changeThem();
                    /* Promo Message Tweak */
                    app.promoMessageTweak.doNow();
                    $cache.pdpForm = $cache.pdpMain.find("form.pdpForm");

                    // Refresh RememberedItems
                    app.RememberedItems.ProductDetail.initPage();

                    if ( !(app.responsive && app.responsive.isTabletLayout()) ) {
                        //Re-initialize image zoom
                        $cache.pdpMain.find("a.cloud-zoom").CloudZoom();
                    }

                    app.product.initProductDescription();

                    if (typeof sr_updateMessages == "function"){
                        //update ShopRunner Messaging
                        sr_updateMessages();
                        //Adding functonality for PayPal Boost in order to display Paypal Boost on ajax reload
                        var element = $("div.paypal-boost2 div.paypal-content");
                        $(".paypal-boost").append(element);
                        $(".paypal-boost div.paypal-content").show();
                        $(".paypal-boost div.paypal-content").clone().appendTo( "div.paypal-boost2" );
                        $("div.paypal-boost2").hide();
                    }
                    initializeCache();
                }
            });
        });

        $cache.productSetList.on("click", "div.product-set-item li a.swatchanchor", function (e) {
            e.preventDefault();

            var url = this.href,
                jqThis = $(this),
                psItem = jqThis.closest(".product-set-item");

            if(!jqThis.hasClass("monogram")){

                if(jqThis.parent("li").hasClass("selected") || psItem.length === 0) {
                    return;
                }

                var qty = psItem.find("form").find("select.qty-select").first().val(),
                    params = {
                        Quantity : isNaN(qty) || !qty ? "1" : qty,
                        lvars : "1"
                    },
                    completeurl = app.util.appendOnlyNewParamsToUrl(url, params);
                    specialHandlingParams = app.PDP.getSpecialHandlingParams($cache.pdpForm.serialize());
                    if (specialHandlingParams.length > 0) {
                        completeurl += (completeurl.indexOf("?") >= 0 ? "&" : "?") + specialHandlingParams;
                    }

                // get container
                var ic = $(this).closest(".product-set-item");
                ic.load(completeurl, function () {
                    app.progress.hide();
                    if ($cache.productSetList.find("button.add-to-cart[disabled]").length>0) {
                        $cache.addAllToCart.attr("disabled","disabled");
                        $cache.addToCart.attr("disabled","disabled"); // this may be a bundle
                    }
                    else {
                        $cache.addAllToCart.removeAttr("disabled");
                        $cache.addToCart.removeAttr("disabled"); // this may be a bundle
                    }
                    app.product.initAddThis();
                    app.product.initAddToCartAndCheckQty(ic);
                    jQuery.CustomFormElements();
                    /* Re-initialize Chosen */
                    app.CustomSelects.changeThem();
                    /* Promo Message Tweak */
                    app.promoMessageTweak.doNow();
                    app.PSpadding.init();
                    // Refresh RememberedItems
                    app.RememberedItems.ProductDetail.initPage();

                    app.product.initProductDescription();

                    if($(".add-to-cart:disabled").length == 0){
                    	$cache.addAllToCart.removeAttr("disabled");
                    } else {
                    	$cache.addAllToCart.attr("disabled","disabled");
                    }
                });
            }
        });

        $cache.productSetList.on("change", "div.product-set-item .variation-select", function (e) {

            var url = this.value,
                jqThis = $(this),
                psItem = jqThis.closest(".product-set-item");

            if(psItem.length === 0 || url === "") {
                return;
            }

            var qty = psItem.find("form").find("select.qty-select").first().val(),
                params = {
                    Quantity : isNaN(qty) || !qty ? "1" : qty,
                    lvars : "1"
                },
                completeurl = app.util.appendOnlyNewParamsToUrl(url, params);

            specialHandlingParams = app.PDP.getSpecialHandlingParams($cache.pdpForm.serialize());
            if (specialHandlingParams.length > 0) {
                completeurl += (completeurl.indexOf("?") >= 0 ? "&" : "?") + specialHandlingParams;
            }

            // get container
            var ic = $(this).closest(".product-set-item");
            ic.load(completeurl, function () {
                app.progress.hide();
                if ($cache.productSetList.find("button.add-to-cart[disabled]").length>0) {
                    $cache.addAllToCart.attr("disabled","disabled");
                    $cache.addToCart.attr("disabled","disabled"); // this may be a bundle
                }
                else {
                    $cache.addAllToCart.removeAttr("disabled");
                    $cache.addToCart.removeAttr("disabled"); // this may be a bundle
                }
                app.product.initAddThis();
                app.product.initAddToCartAndCheckQty(ic);

                jQuery.CustomFormElements();
                /* Re-initialize Chosen */
                app.CustomSelects.changeThem();
                /* Promo Message Tweak */
                app.promoMessageTweak.doNow();
                app.PSpadding.init();
                // Refresh RememberedItems
                app.RememberedItems.ProductDetail.initPage();

                app.product.initProductDescription();

                if($(".add-to-cart:disabled").length == 0){
                	$cache.addAllToCart.removeAttr("disabled");
                } else {
                	$cache.addAllToCart.attr("disabled","disabled");
                }
            });

        });
        $cache.pdpMain.on("change", "div.product-set-item select.qty-select", function (e) {
            var jqThis = $(this),
                form = jqThis.parents("form").first(),
                pid = form.find("input[name='pid']"),
                size = form.find(".size-sel"),
                addToCart = form.find("button[name='add-to-cart']");

            if(size.length == 0 || (size.length > 0 && size.val() != "")){

                app.product.getAvailability(pid.val(), jqThis.val(), function (data) {
                    /*if(!(size && size.val())*/
                    if (!data || data.isAvailable) {
                        addToCart.removeAttr("disabled");
                        availabilityContainer.find(".availability-qty-available").hide();
                        availabilityContainer.find(".availability-msg").show();
                        jqThis.parents(".product-variations").find(".inventoryerror").html("").hide();
                    }
                    else{
                        addToCart.attr("disabled", "disabled");
                        availabilityContainer.find(".availability-msg").hide();
                        var avQtyMsg = availabilityContainer.find(".availability-qty-available");
                        if (avQtyMsg.length===0) {
                            avQtyMsg = $("<span/>").addClass("availability-qty-available").appendTo(availabilityContainer);
                        }
                        avQtyMsg.text(data.inStockMsg).show();
                        if(data.qtyUnavailableMsg){
                            jqThis.parents(".product-variations").find(".errormessage").html(data.qtyUnavailableMsg);
                            app.Omniture.reportExistingErrors("client");
                        }
                    }
                });
            }
        });
        
        // Optimization for product description accessibility on touch device 
        var e_desc = (function(isMobile) {
            return {
                event: (isMobile) ? 'touchend' : 'click',
                selector: (isMobile) ? '.description-features' : 'h3 span.pdpDescription, .product-description .morelink',
                isMobile: isMobile
            }
        })(typeof document.ontouchend !== 'undefined');
        
        $cache.pdpMain.on(e_desc.event, e_desc.selector, function (e) {
            e.preventDefault();

            var jqThis    = $(this),
            expandableDiv = (e_desc.isMobile) ? $(this) : jqThis.parents(".pd-expandable"),
            truncdata     = expandableDiv.find(".truncate"),
            showChar      = truncdata.data("showchar"),
            ellipsestext  = truncdata.data("ellipsestext"),
            moretext      = truncdata.data("moretext"),
            lesstext      = truncdata.data("lesstext"),
            morelink      = expandableDiv.find(".morelink");

            expandableDiv.find("h3 span.pdpDescription").toggleClass("not-expanded");

            if (morelink.hasClass("less")) {
                morelink.removeClass("less");
                morelink.html(moretext);
            }
            else {
                morelink.addClass("less");
                morelink.html(lesstext);
            }
            morelink.parent().prev().toggle();
            morelink.prev().toggle();
        });

        $cache.addAllToCart.on("click", function (e) {
            e.preventDefault();
            var psForms = $cache.productSetList.find("form").toArray(),
                miniCartHtml = "",
                addProductUrl = app.util.ajaxUrl(app.urls.addProduct);

            // add items to cart
            function addItems() {
                var form = $(psForms.shift());
                var itemid = form.find("input[name='pid']").val();

                $.ajax({
                    dataType : "html",
                    url: addProductUrl,
                    data: form.serialize()
                })
                .done(function (response) {
                    // success
                    miniCartHtml = response;

                })
                .fail(function (xhr, textStatus) {
                    // failed
                    var msg = app.resources.ADD_TO_CART_FAIL;
                    $.validator.format(msg, itemid);
                    if(textStatus === "parsererror") {
                        msg+="\n"+app.resources.BAD_RESPONSE;
                    } else {
                        msg+="\n"+app.resources.SERVER_CONNECTION_ERROR;
                    }
                    reportError(msg);
                })
                .always(function () {
                    if (psForms.length > 0) {
                        addItems();
                    }
                    else {
                        app.quickView.close();
                        app.minicart.show(miniCartHtml);
                        app.headercart.update();
                        app.minicart.show();
                    }
                });
            }
            addItems();
            return false;
        });

        app.product.initProductDescription();

        app.sendToFriend.initializeDialog($cache.pdpMain, "a.send-to-friend");

        $cache.pdpMain.find("button.add-to-cart[disabled]").attr('title', $cache.pdpMain.find(".availability-msg").html() );

        // bind pdp size charts and fit guide click handler
        $cache.pdpMain.on("click", "a.guide", function(e) {
            
            if ( $(this).data("onQuickView") !== true ) {
                e.preventDefault();

                var link = $(this),
                    url = link.attr('href'),
                    contentID = link.data('guide-id');

                if (link.hasClass('fit-guide')) {

                    var isSelected = $(this).parent().parent().parent().find("select option:selected").data('fit')|| $(this).parent().parent().parent().find(".Fit li.selected").data('fit');

                    app.tabGuide.show(url, isSelected, 'fitguide.css', 935,  850, contentID);

                } else if (link.hasClass('size-guide')) {

                    if (contentID == 'mens-dress-shirts-size-chart') {
                        app.tabGuide.show(url, $('select.fit-select > option:selected').attr('data-fit'), 'sizeguide.css', 1110, 650, contentID);
                    } else if (contentID == 'mens-suits-size-chart') {
                        app.tabGuide.show(url, $('select.fit-select > option:selected').attr('data-fit'), 'sizeguide.css', 1110, 920, contentID);
                    } else {
                        app.sizeGuide.show(url);
                    }

                } else {
                    openInfo(link.attr("data-guide-id"), "0");
                }
            }
        });

        app.util.mOverToolTip( jQuery('.product-price p .discountagepercent.yourPrice.image'), 'top', app.customerSettings.firstName, app.resources.MEMBER_DISCOUNT_TOOLTIP, "memberTooltip");
        
        $cache.productSetList.on("click", ".quickviewlink,.quickviewimage", function (e) {
            e.preventDefault();
            var someurl = e.target.href || e.target.dataset.url;
            if($('#wrapper').width() > 768){

	          app.quickView.show({
	            url : e.target.href || e.target.dataset.url,
	            source : "quickview" 
	          });
	          
	            
        	}else{
        		window.location.href = someurl;
        	}
            
        });
        initializeCache();
    }
    
    

    function initializeCloudZoom() {
        if (app.responsive && app.responsive.isTabletLayout()) {
            return;
        }

        $('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();
    }


    function openInfo(infoId, servicemenu, shcode, pid) {
        var data = {cid: infoId, servicemenu: servicemenu};
        if(shcode != undefined){
            data.specialhandlingcode = shcode;
        }
        if(pid != undefined){
            data.pid = pid;
        }

        $.ajax({
            type     : "POST",
            url      : app.urls.pageInclude,
            data     : data,
            dataType : "html",
            success  : function(data) {
                app.dialog.create({
                    target  : $("<div>").attr("id", "dialog-info").html(data),
                    options : { width: "729", height: "609" }
                }).dialog("open");
                
                
            },
            failure  : function(data) {
                reportError(app.resources.SERVER_ERROR);
            }
        });
    }

    function setAddToCartHandler(e) {
        this.disabled = true
        
        e.preventDefault();
        var form = $(this).closest("form");
        var qty = form.find("select.qty-select");
        var size = form.find("select.variation-select.size-sel");
        //alert(qty.val());
        var isSubItem = $(this).hasClass("sub-product-item");
        if(/*qty.length === 0 ||*/ isNaN(qty.val()) || parseInt(qty.val(), 10) === 0) {
            qty.val("1");
        }
        //alert(qty.val());
        // First remove placeholder fallback values
        form.find('.placeholder').val('');
        var data = form.serialize();
        if(app.responsive && app.responsive.isMobileLayout()) {
            data += "&isMobile=true";
        } else {
            data += "&isMobile=false";
        };
        
        //check if size attribute is present
        if (size.length != 0){
            //size attribute present. Validate if value is selected:
            var s = size.val();
            if (s == null || s == undefined || s == ''){
                //no size selected. Prevent addition of product to cart
                size.siblings(".chzn-container").addClass("error");
                //size.siblings(".errormessage").show();
                form.find('#add-to-cart').addClass("sizeError").attr("title", "Select a Size");
                form.find('#add-to-cart').text('Select a Size');
                return false;
            }else{
            	form.find('#add-to-cart').attr("title", "Add to Bag").removeClass("sizeError");
            	form.find('#add-to-cart').text('Add to Bag');
            }
        }

        var pdexpandableDiv = form.find(".pd-expandable.specialhandling");
        if(pdexpandableDiv && pdexpandableDiv.length > 0){//&& pdexpandableDiv.parents("#QuickViewDialog").length == 0
            var validateURL = pdexpandableDiv.data("validate");
            var errordiv = pdexpandableDiv.find(".errormessage");
            errordiv.html("");
            var summarydiv = pdexpandableDiv.find("h3 span.summary");

            if(validateURL){
                // Validate form
                $.ajax({
                    dataType : "json",
                    url: validateURL,
                    data: form.serialize()
                })
                .done(function (response) {
                    if(response){
                        // Recreate placeholders
                        form.find('.placeholder').blur();
                        if(response.success){
                            app.cart.update(data, function (response) {
                            	form.find('button[id="add-to-cart"]').prop("disabled", false);

                                var uuid = form.find("input[name='uuid']");
                                if (uuid.length > 0 && uuid.val().length > 0) {
                                    if(uuid.data("carturl") != null && uuid.data("carturl").length > 0){
                                        window.location.href = uuid.data("carturl");
                                    } else {
                                        window.location.assign(app.urls.cartShow);
                                    }
                                } else {
                                    if (!isSubItem) {
                                        app.quickView.close();
                                    }
                                    app.minicart.show(response);
                                }
                                app.headercart.update();
                            });
                            
                            //$('#add-to-cart').addClass("prod-in-bag").text("Checkout");
                            
                        } else {
                            summarydiv.html("");
                            errordiv.show().html(response.error);
                            app.Omniture.reportExistingErrors("client");
                        }
                    }
                });
            }
        } else {
            app.cart.update(data, function (response) {
                form.find('button[id="add-to-cart"]').prop("disabled", false);
                
                var uuid = form.find("input[name='uuid']");
                if (uuid.length > 0 && uuid.val().length > 0) {
                    app.cart.refresh();
                } else {
                    if (!isSubItem) {
                        app.quickView.close();
                    }
                    app.minicart.show(response);
                }
                app.headercart.update();
            });
        }
    }



    /*************** app.product public object ***************/
    app.product = {

        categoryID : null,

        init : function () {
            initializeCache();
            initializeDom();
            initializeEvents();
            initializeCloudZoom();

            app.PDP.initSpecialHandlingSlider();

            // RememberedItems
            app.RememberedItems.ProductDetail.initTooltip();
            app.RememberedItems.ProductDetail.initButton();
        },

        initProductDescription : function() {
            $(".product-description .truncate").each(function() {
                if ($(this).attr("data-truncated") === "true") {
                    return;
                }
                else {
                    $(this).attr("data-truncated", "true");
                }

                var jqThis   = $(this),
                showChar     = jqThis.data("showchar"),
                ellipsestext = jqThis.data("ellipsestext"),
                moretext     = jqThis.data("moretext"),
                lesstext     = jqThis.data("lesstext"),
                productUrl   = jqThis.data("url");

                var content  = $.trim($(jqThis).html());

                if (content.length >= showChar) {
                    var c = content.substr(0, showChar);
                    var h = content.substr(showChar, content.length - showChar);

                    if (productUrl) {
                        var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a class="morelinkpdp" href="' + productUrl + '">' + moretext + '</a></span>';
                    }
                    else {
                        var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<span class="morelink">' + moretext + '</span></span>';
                    }

                    jqThis.html(html);
                }
                else {
                    jqThis.parents(".pd-expandable").find("h3 span.pdpDescription").toggleClass("non-expandable", true);
                }
            });

            // trigger initial product availibility request for choosen quantity
            $('form.pdpForm select.qty-select').change();

        },

        get : function (options) {
            // loads a product into a given container div
            // params
            //      containerId - id of the container div, if empty then global app.containerId is used
            //      source - source string e.g. search, cart etc.
            //      label - label for the add to cart button, default is Add to Cart
            //      url - url to get the product
            //      id - id of the product to get, is optional only used when url is empty
            var target = options.target || app.quickView.init();
            var source = options.source || "";

            var productUrl = options.url || app.util.appendParamToURL(app.urls.getProductUrl, "pid", options.id);
            if(source.length > 0) {
                productUrl = app.util.appendParamToURL(productUrl, "source", source);
            }

            // show small loading image
            //app.progress.show(app.ui.primary);
            app.ajax.load({
                target : target,
                url : productUrl,
                data : options.data || "",
                // replace with callback passed in by options
                callback : options.callback || app.product.init
            });
        },

        getAvailability : function (pid, quantity, callback) {
            app.ajax.getJson({
                url: app.util.appendParamsToUrl(app.urls.getAvailability, {pid:pid, Quantity:quantity}),
                callback: callback
            });
        },

        initAddThis : function () {
            var $addThis         = $("div.addthis_toolbox");
            var addThisAvailable = ($addThis.size() > 0) && (typeof addthis !== "undefined");
            var isGteIE8         = !$("html").hasClass("ie6") && !$("html").hasClass("ie7");
            var isBF             = $("body").hasClass("blackfleece");

            if ( addThisAvailable ) {
                $addThis.empty();

                // Pinterest
                var $wPinterest = $("<a>")
                    .attr("id", "addthis_pinterest")
                    .attr("class", "addthis_button_pinterest_pinit")
                    .attr("pi:pinit:layout", "horizontal")
                    .attr("href", "javascript:;")
                    .attr("title", app.resources.ADDTHIS_PINIT);
                $addThis.append( $wPinterest );

                // Facebook
                if ( isGteIE8 ) {
                    var $wFacebook = $("<a>")
                        .attr("id", "addthis_facebook")
                        .attr("class", "addthis_button_facebook_like")
                        .attr("fb:like:layout", "button_count")
                        .attr("title", app.resources.ADDTHIS_FACEBOOK);
                    $addThis.append( $wFacebook );
                }


                // Twitter
                var $wTwitter = $("<a>")
                    .attr("id", "addthis_twitter")
                    .attr("class", "addthis_button_twitter")
                    .attr("href", "javascript:;")
                    .attr("title", app.resources.ADDTHIS_TWITTER);
                var $wTwitterImg = $("<img>")
                    .attr("src", isBF ? app.urls.addThisTwitterIconBF : app.urls.addThisTwitterIcon)
                    .attr("alt", app.resources.ADDTHIS_SHARE_TWITTER);
                $addThis.append( $wTwitter.append( $wTwitterImg ) );

                // Google+
                if ( isGteIE8 ) {
                    var $wGoogle = $("<a>")
                        .attr("id", "addthis_google")
                        .attr("class", "addthis_button_google_plusone")
                        .attr("g:plusone:size", "tall")
                        .attr("g:plusone:annotation", "none")
                        .attr("title", app.resources.ADDTHIS_GOOGLE);
                    $addThis.append( $wGoogle );
                }

                // SendToFriend
                var stafUrl = $addThis.data("stafUrl");
                var $wSendToFriend = $("<a>")
                    .attr("id", "send-to-friend")
                    .attr("class", "send-to-friend")
                    .attr("href", stafUrl)
                    .attr("title", app.resources.ADDTHIS_SENDTOFRIEND);
                var $wSendToFriendImg = $("<img>")
                    .attr("src", isBF ? app.urls.addThisSendToFriendIconBF : app.urls.addThisSendToFriendIcon)
                    .attr("alt", app.resources.ADDTHIS_SENDTOFRIEND);
                $addThis.append( $wSendToFriend.append( $wSendToFriendImg ) );
                

                // Listen for the share event - Used for Omniture tracking
                addthis.addEventListener('addthis.menu.share', function (evt) {
                    if (evt.type == 'addthis.menu.share') {
                        if (evt.data.service == 'google_plusone') {
                            app.Omniture.trackLinkSocial(configData.productId, "event37", "google+");
                        }
                        else if(evt.data.service == 'facebook_like') {
                            app.Omniture.trackLinkSocial(configData.productId, "event42", "facebook");
                        }
                        else if(evt.data.service == 'twitter') {
                            app.Omniture.trackLinkSocial(configData.productId, "event43", "twitter");
                        }
                        else if(evt.data.service == 'pinterest_share') {
                            app.Omniture.trackLinkSocial(configData.productId, "event50", "pin it");
                        }
                    }
                });
                $wSendToFriend.on("click", function() { 
                    app.Omniture.trackLinkSocial(configData.productId, "event38", "mail");
                });

                addthis.toolbox(".addthis_toolbox");

                /*---------------------------------------------------------------------
                START: Social icons (without Google+) tooltip
                Sets tooltip for all social icons (anchor elements)
                but the Google+ one, with a delay of 400ms, extra
                class and removes the default HTML tooltip on hover,
                but resets it on mouseleave.
                ---------------------------------------------------------------------*/
                $addThis.find("a").each(function() {
                    var $self = $(this);

                    if ( !$self.hasClass("addthis_button_google_plusone") ) {
                        $self.tooltip({
                            track      : true,
                            delay      : 400,
                            extraClass : "social-tooltip",
                            showURL    : false
                        });
                    }

                    $self.hover(
                        function() {
                            $self.data("title", $self.attr("title"));
                            $self.attr("title", "");
                        },
                        function() {
                            $self.attr("title", $self.data("title"));
                        }
                    );
                });
                /*---------------------------------------------------------------------
                    END: Social icons (without Google+) tooltip
                ---------------------------------------------------------------------*/
            }
        },

        initAddToCart : function (target) {
            if (target) {
                target.find(".add-to-cart").on("click", setAddToCartHandler);
            }
            else {
                $(".add-to-cart").on("click", setAddToCartHandler);
            }
        },

        initAddToCartAndCheckQty : function (target) {
            app.product.initAddToCart(target);
            var qty = target.find(".qty-select");
            var size = target.find(".size-sel");
            if(qty && qty.length > 0 && qty.data("available") > 0 && size && ((size.length > 0 && size.val() != "") || size.length == 0)){
                target.find(".add-to-cart").removeAttr('disabled');
            }
            else if(qty && qty.length > 0 && qty.data("available") == 0){
                target.find(".add-to-cart").attr('disabled', 'disabled');
            }
        },

        setCategoryID : function(cgid) {
            this.categoryID = cgid != null && typeof cgid == 'string' && cgid.length > 0 ? cgid : '';
        }
    };

}(window.app = window.app || {}, jQuery));

// app.product.tile
(function (app, $) {
    var $cache = {};

    function initializeDom() {
        var tiles = $cache.container.find(".product-tile");
        if (tiles.length===0) { return; }
        $cache.container.find(".product-tile").syncHeight().each(function(idx) { $(this).data("idx", idx); });

        $cache.container.on("mouseenter", ".product-tile .morelink", function(e) {
            $(this).find(".hover-tooltip").stop(true, true).fadeIn("300");
        }).on("mouseleave", ".product-tile .morelink", function(e) {
            $(this).find(".hover-tooltip").stop(true, true).fadeOut("300");
        });
    }

    function initializeEvents() {
        app.quickView.initializeButton($cache.container, ".product-image.qvbttn");
        app.RememberedItems.ProductGrid.initTooltips($cache.container, ".product-image .pgrid-remember-tooltip a");
        app.RememberedItems.ProductGrid.initButtons($cache.container, ".product-image");

        $cache.container.on("click", ".swatch-list a.swatch", function (e) {
            e.preventDefault();
            if ($(this).hasClass("selected")) { return; }

            var tile = $(this).closest(".grid-tile");
            $(this).closest(".swatch-list").find(".swatch.selected").removeClass("selected");
            $(this).addClass("selected");
            tile.find("a.thumb-link").attr("href", $(this).attr("href"));
            tile.find("a.name-link").attr("href", $(this).attr("href"));
            var thumb = tile.find(".product-image a.thumb-link img").filter(":first");
            var swatchImg = $(this).children("img").filter(":first");
            var data = swatchImg.data("thumb");
            thumb.data("original", {url:data.src});
            thumb.data("alternate2", {url:swatchImg.data("thumb2").src});
            thumb.data("alternate3", {url:swatchImg.data("thumb3").src});

            tile.find(".grid-image").attr("data-rolloverimg", data.src.split('?')[0]);
            tile.find(".grid-image").attr("data-rollovertotal", data.rollovertotals);
            count = 1;
            
            thumb.attr({
                src   : data.src
            });
            
        }).on("mouseenter", ".swatch-list a.swatch", function (e) {
            if ($(this).hasClass("selected")) { return; }
            var tile = $(this).closest(".grid-tile");
            var thumb = tile.find(".product-image a.thumb-link img").filter(":first");
            var swatchImg = $(this).children("img").filter(":first");
            var data = swatchImg.data("thumb");
            thumb.attr({
                src   : data.src
            });

        }).on("mouseleave", ".swatch-list a.swatch", function (e) {
            if ($(this).hasClass("selected")) { return; }
            var tile = $(this).closest(".grid-tile");
            var thumb = tile.find(".product-image a.thumb-link img").filter(":first");
            var swatchImg = $(this).children("img").filter(":first");
            var data = thumb.data("original");
            thumb.attr({
                src   : data.url
            });
        });

        /*.on("hover", ".swatch-list a.swatch", function (e) {
            if ($(this).hasClass("selected")) { return; }

            // get current thumb details
            var tile = $(this).closest(".grid-tile");

            var thumb = tile.find(".product-image a.thumb-link img").filter(":first");

            var swatchImg = $(this).children("img").filter(":first");

            var data = swatchImg.data("thumb");

            var currentAtts = {
                src : thumb.attr("src"),
                alt : thumb.attr("alt"),
                title : thumb.attr("title")
            }

            thumb.attr({
                src   : data.src,
                alt   : data.alt,
                title : data.title
            });

            swatchImg.data("thumb", currentAtts);

        });*/
    }

    /*************** app.product.tile public object ***************/
    app.product.tile = {
        initNsSearch : function () {
            $cache = {
                container : $("#productsearchresult-productgrid")
            };
            initializeEvents();
            initializeDom();
        },
        initNsAccount : function () {
            $cache = {
                container : $("#remembereditems-productgrid")
            };
            initializeEvents();
            initializeDom();
        }
    };

}(window.app = window.app || {}, jQuery));

// app.product.compare
(function (app, $) {
    var $cache = {},
        _currentCategory = "",
        _isClearing = false,
        MAX_ACTIVE = 6,
        CI_PREFIX = "ci-";

    /************** private ****************/
    function refreshContainer() {
        if (_isClearing) { return; }

        var ac = $cache.compareContainer.find(".active").length;

        if (ac < 2) {
            $cache.compareButton.attr("disabled", "disabled");
        }
        else {
            $cache.compareButton.removeAttr("disabled");
        }

        // update list with sequential classes for ui targeting
        var compareItems = $cache.compareContainer.find('.compare-item');
        for( i=0; i < compareItems.length; i++ ){
            compareItems.removeClass('compare-item-' + i);
            $(compareItems[i]).addClass('compare-item-' + i);
        }

        $cache.compareContainer.toggle(ac > 0);

    }

    function addToList(data) {
        // get the first compare-item not currently active
        var item = $cache.compareContainer.find(".compare-item").not(".active").first();
        if (item.length===0) { return; } // safety only

        // if already added somehow, return
        if ($("#"+CI_PREFIX+data.uuid).length > 0) {
            return;
        }
        // set as active item
        item.addClass("active")
            .attr("id", CI_PREFIX+data.uuid)
            .data("itemid", data.itemid);

        // replace the item image
        var itemImg = item.children("img.compareproduct").first();
        itemImg.attr({src : $(data.img).attr("src"), alt : $(data.img).attr("alt")});

        // refresh container state
        refreshContainer();

        var tile = $("#"+data.uuid);
        if (tile.length===0) { return; }

        // ensure that the associated checkbox is checked
        tile.find(".compare-check")[0].checked = true;
    }

    function removeFromList(uuid) {
        var item = $("#"+CI_PREFIX+uuid);
        if (item.length===0) { return; }

        // replace the item image
        var itemImg = item.children("img.compareproduct").first();
        itemImg.attr({src : app.urls.compareEmptyImage, alt : app.resources.EMPTY_IMG_ALT});

        // remove class, data and id from item
        item.removeClass("active")
            .removeAttr("id")
            .removeAttr("data-itemid")
            .data("itemid", "");

        // use clone to prevent image flash when removing item from list
        var cloneItem = item.clone();
        item.remove();
        cloneItem.appendTo($cache.comparePanel);
        refreshContainer();
        // ensure that the associated checkbox is not checked
        var tile = $("#"+uuid);
        if (tile.length === 0 ) { return; }

        tile.find(".compare-check")[0].checked = false;
    }

    function initializeCache() {
        $cache = {
            primaryContent : $("#primary"),
            compareContainer : $("#compare-items"),
            compareButton : $("#compare-items-button"),
            clearButton : $("#clear-compared-items"),
            comparePanel : $("#compare-items-panel")
        };
    }

    function initializeDom() {
        _currentCategory = $cache.compareContainer.data("category") || "";
        var active = $cache.compareContainer.find(".compare-item").filter(".active");
        active.each(function () {
            var uuid = this.id.substr(CI_PREFIX.length);
            var tile = $("#"+uuid);
            if (tile.length === 0 ) { return; }

            tile.find(".compare-check")[0].checked = true;
        });
        // set container state
        refreshContainer();
    }

    function initializeEvents() {
        // add event to buttons to remove products
        $cache.primaryContent.on("click", ".compare-item-remove", function (e, async) {
            var item = $(this).closest(".compare-item");
            var uuid = item[0].id.substr(CI_PREFIX.length);
            var tile = $("#"+uuid);
            var args = {
                itemid : item.data("itemid"),
                uuid : uuid,
                cb :  tile.length===0 ? null : tile.find(".compare-check"),
                async : async
            };
            app.product.compare.removeProduct(args);
            refreshContainer();
        });

        // Button to go to compare page
        $cache.primaryContent.on("click", "#compare-items-button", function () {
            window.location.href = app.util.appendParamToURL(app.urls.compareShow, "category", _currentCategory);
        });

        // Button to clear all compared items
        $cache.primaryContent.on("click", "#clear-compared-items", function () {
            _isClearing = true;
            $cache.compareContainer.hide()
                                   .find(".active .compare-item-remove")
                                   .trigger("click", [false]);
            _isClearing = false;

        });
    }

    /*************** app.product.compare public object ***************/
    app.product.compare = {
        init : function () {
            initializeCache();
            initializeDom();
            initializeEvents();
        },
        initCache : initializeCache,
        addProduct : function (args) {
            var items = $cache.compareContainer.find(".compare-item");
            var cb = $(args.cb);
            var ac = items.filter(".active").length;
            if(ac===MAX_ACTIVE) {
                if(!window.confirm(app.resources.COMPARE_CONFIRMATION)) {
                    cb[0].checked = false;
                    return;
                }

                // remove product using id
                var item = items.first();

                // safety check only. should never occur.
                if (item[0].id.indexOf(CI_PREFIX)!==0) {
                    cb[0].checked = false;
                    reportError(app.resources.COMPARE_ADD_FAIL);
                    return;
                }
                var uuid = item[0].id.substr(CI_PREFIX.length);
                app.product.compare.removeProduct({
                    itemid: item.data("itemid"),
                    uuid: uuid,
                    cb: $("#"+uuid).find(".compare-check")
                });
            }

            app.ajax.getJson({
                url : app.urls.compareAdd,
                data : { 'pid' : args.itemid, 'category' : _currentCategory },
                callback : function (response) {
                    if (!response || !response.success) {
                        // response failed. uncheck the checkbox return
                        cb.checked = false;
                        reportError(app.resources.COMPARE_ADD_FAIL);
                        return;
                    }

                    // item successfully stored in session, now add to list...
                    addToList(args);
                }
            });
        },

        removeProduct : function (args) {
            if (!args.itemid) { return; }
            var cb = args.cb ? $(args.cb) : null;
            app.ajax.getJson({
                url : app.urls.compareRemove,
                data : { 'pid' : args.itemid, 'category' : _currentCategory },
                async: args.async,
                callback : function (response) {
                    if (!response || !response.success) {
                        // response failed. uncheck the checkbox return
                        if (cb && cb.length > 0) { cb[0].checked = true; }
                        reportError(app.resources.COMPARE_REMOVE_FAIL);
                        return;
                    }

                    // item successfully removed session, now remove from to list...
                    removeFromList(args.uuid);
                }
            });
        }
    };

}(window.app = window.app || {}, jQuery));

// app.compare
(function (app, $) {
    var $cache = {};

    function initializeCache() {
        $cache = {
            compareTable : $("#compare-table"),
            categoryList : $("#compare-category-list")
        };
    }

    function initializeDom() {
        app.product.tile.initNsSearch();
    }

    function initializeEvents() {
        $cache.compareTable.on("click", ".remove-link", function (e) {
            e.preventDefault();
            app.ajax.getJson({
                url : this.href,
                callback : function (response) {
                    app.page.refresh();
                }
            });
        })
        .on("click", ".open-quick-view", function (e) {
            e.preventDefault();
            var form = $(this).closest("form");
            app.quickView.show({
                url:form.attr("action"),
                source:"quickview",
                data:form.serialize()
            });
        });

        $cache.categoryList.on("change", function () {
            $(this).closest("form").submit();
        });
    }

    /*************** app.compare public object ***************/
    app.compare = {
        init : function () {
            initializeCache();
            initializeDom();
            initializeEvents();
            app.product.initAddToCart();
        }
    };


}(window.app = window.app || {}, jQuery));

// send to friend
(function (app, $) {
    var $cache = {},
        initialized=false;
    function initializeEvents() {
        app.util.limitCharacters();
        if (initialized) {return; }
        $cache.dialog.on("click", ".preview-button, .send-button, .edit-button", function (e) {
            e.preventDefault();
            //$cache.form.validate();
            if (!$cache.form.valid()) {
                return false;
            }
            var requestType = $cache.form.find("#request-type");
            if (requestType.length>0) {
                requestType.remove();
            }
            $("<input/>").attr({id:"request-type", type:"hidden", name:$(this).attr("name"), value:$(this).attr("value")}).appendTo($cache.form);
            var data = $cache.form.serialize();
            app.ajax.load({url:$cache.form.attr("action"),
                   data: data,
                   target: $cache.dialog,
                   callback: function() {
                        app.validator.init();
                        app.util.limitCharacters();
                        $cache.form = $("#send-to-friend-form");
                        $(".ui-dialog-content").dialog("option", "position", "center");
                   }
            });
        })
        .on("click", ".cancel-button, .close-button", function (e) {
            e.preventDefault();
            $cache.dialog.dialog("close");
        });

        initialized=true;
    }

    /*************** app.sendToFriend public object ***************/
    app.sendToFriend = {
        init : function () {
            $cache = {
                form   : $("#send-to-friend-form"),
                dialog : $("#send-to-friend-dialog")
            };
            initializeEvents();
        },
        initializeDialog : function (eventDelegate, eventTarget) {
            $(eventDelegate).on("click", eventTarget, function (e) {
                e.preventDefault();


                // Send to firend is opened in a new page on tablet when responsive is enabled
                if ( app.responsive && app.responsive.isTabletLayout() && app.responsive.isTabletResponsiveEnabled() ) {
                    window.location.href = this.href;
                    return;
                }

                var dlg = app.dialog.create({target:$("#send-to-friend-dialog"), options:{
                    width  : 658,
                    height : 'auto',
                    dialogClass:'email-wishlist-dialog',
                    title  : this.title,
                    open   : function() {
                        app.sendToFriend.init();
                        app.validator.init();

                        /* Close the modal on clicking the overlay */
                        app.ClickOutsideModal.bindHere();
                    }
                }});

                app.ajax.load({
                    url      : app.util.ajaxUrl(this.href),
                    target   : dlg,
                    callback : function () {
                        dlg.dialog("open");  // open after load to ensure dialog is centered
                    }
                });
            });
        }
    };

}(window.app = window.app || {}, jQuery));


// app.search
(function (app, $) {
    var $cache = {};

    function showLoading() {
        $cache.psContainer.block({
            message : '<div class="blockUILoader"></div>',
            css : {
                width  : '40%',
                top    : '200px',
                border : '2px solid #aaa'
            },
            overlayCSS : {
                backgroundColor : '#fff'
            },
            centerY : false
        });
    }

    function hideLoading() {
        app.RememberedItems.ProductGrid.initPage();
        $cache.psContainer.unblock();
    }

    function showRequestInProgress() {
        $("<div />").addClass("requestInProgress").appendTo($cache.psContainer);
    }

    function hideRequestInProgress() {
        app.RememberedItems.ProductGrid.initPage();
        $cache.psContainer.find("div.requestInProgress").remove();
    }

    function getProductListingHash(url) {
        var refinementUri = app.util.getUri(url);
        var queryString   = window.location.search.substr(1);
        var currentHash   = window.location.hash.substr(1);

        var qsParams      = app.util.getQueryStringParams(queryString);
        var chParams      = app.util.getQueryStringParams(currentHash);
        var rfParams      = refinementUri.queryParams;
        var hashParams    = $.extend({}, qsParams, chParams, rfParams);

        for (var p in hashParams) {
            hashParams[p] = unescape(hashParams[p]);
        }

        return $.param(hashParams);
    }

    function updateProductListing() {
        var hash = window.location.hash;
        if (hash.length > 0) {
            var refineUrl = "";

            refineUrl = window.location.pathname + "?" + hash.substr(1);
            refineUrl = app.util.appendParamToURL(refineUrl, "format", "ajax");

            showLoading();
            $cache.psResults.load(refineUrl, function() {
                hideLoading();
            });
        }
    }
    
    
    function showProductGridLayout() {
        if ($cache.psContainer.find("div.aLayoutRequestInProgress").size() > 0) {
            $cache.psContainer.find("div.aLayoutRequestInProgress").remove();
            $cache.psResults.show();
        }

        if ($("div.view-page-layout").size() > 0 && $(window).width() > 959) {
            $("div.view-page-layout").show();
        }
        if(categoryGridStyle) {
        	$("div.view-page-layout").hide();
        }
    }

    function switchProductGridLayout(style, report) {
        $cache.psResults.find("ul.search-result-items").each(function(ulIndex) {
            $(this).find("li.grid-tile").each(function(liIndex) {
                var itemsPerRow  = 3;
                var colorsPerRow = 5;
                var itemCount    = liIndex + 1;

                if (style == "2cols") { itemsPerRow = 2; colorsPerRow = 8; }
                if (style == "3cols") { itemsPerRow = 3; colorsPerRow = 5; }

                $(this).removeClass("new-row");
                $(this).removeClass("last");

                var lastRow = itemCount % itemsPerRow == 0;
                if ( lastRow && (categoryGridStyle)) {
                    $(this).addClass("last");
                };

                var newRow = itemCount % itemsPerRow == 1;
                if ( newRow && !(categoryGridStyle)) {
                    $(this).addClass("new-row");
                };
                
                
                if($(this).hasClass('new-row-images') && (categoryGridStyle)) {
                	$(this).removeClass('new-row-images').addClass('new-row"');
                	$(this).css("clear", "both");
                }
                
                $(this).find(".product-tile").each(function() {
                    var size = $(this).find(".product-swatches ul.swatch-list li").size();

                    if(size && size > colorsPerRow)
                    {
                        var display = size - colorsPerRow;
                        $(this).find(".product-swatches .product-swatches-all").html("+" + display);
                    }
                    else
                    {
                        $(this).find(".product-swatches .product-swatches-all").html("");
                    }

                    $(this).css("height", "auto");
                });
            });

            var layoutCtrls = $cache.psMain.find(".view-page-layout");
            if (report && layoutCtrls && layoutCtrls.length > 0) {
                var omnDataS = layoutCtrls.data("contextbases");
                var omnDataB = layoutCtrls.data("contextbaseb");
                app.Omniture.trackGridLayoutSwitch(style, omnDataS, omnDataB);
            }
        });
    }

    function onViewpageLayout2Cols(report) {
        $.cookie('alternatelayout', 'y', { expires: 365, path: '/' });

        $cache.psResults.removeClass("layout3cols").addClass("layout2cols");
        $cache.psResults.find(".product-tile").each(function() {
            $(this).find("img.grid-image").attr("src", $(this).find("img.grid-image").data("alternate2").url);
            $(this).find("img.grid-image").data("original", $(this).find("img.grid-image").data("alternate2"));
            $(this).find(".swatch-list a.swatch").each(function() {
                $(this).find("img").data("thumb", $(this).find("img").data("thumb2"));
            });
        });

        $("a#viewpage-layout2cols").addClass("active");
        $("a#viewpage-layout3cols").removeClass("active");

        // Grid rating layout changes
        $('.bvText.overal').show();

        switchProductGridLayout("2cols", report);
        $(".html-slot-container .contentslot-ingrid").each(function() {
			$(this).find("img").show();
			$(this).css({"width":"340px", "height" : "auto"});
		});
    }

    function onViewpageLayout3Cols(report) {
        $.cookie('alternatelayout', 'n', { expires: 365, path: '/' });

        $cache.psResults.removeClass("layout2cols").addClass("layout3cols");
        $cache.psResults.find(".product-tile").each(function() {
            $(this).find("img.grid-image").attr("src", $(this).find("img.grid-image").data("alternate2").url);
            $(this).find("img.grid-image").data("original", $(this).find("img.grid-image").data("alternate3"));
            $(this).find(".swatch-list a.swatch").each(function(){
                $(this).find("img").data("thumb", $(this).find("img").data("thumb3"));
            });
        });

        $("a#viewpage-layout3cols").addClass("active");
        $("a#viewpage-layout2cols").removeClass("active");

        // Grid rating layout changes
        $('.bvText.overal').hide();

        switchProductGridLayout("3cols", report);
        
        //Content assets in the grid
        $(".html-slot-container .contentslot-ingrid").each(function() {
        	var img = { x1: 18, x2: 225, y1: 0, y2: 394 , url: $(this).find("img").attr("src").replace("wid=340","wid=243"), a_href:$(this).find("a").attr("href") };
			$(this).find("img").hide();
			if(img.a_href) { $(this).wrap('<a href="'+img.a_href+'" ></a>'); }
			$(this).css({
			  width: img.x2 - img.x1,
			  height: img.y2 - img.y1,
			  background: "url('" + img.url + "')",
			  backgroundPosition: -img.x1 + "px " + -img.y1 + "px"
			});
		});
    }

    function initPageLayout() {
        var is2ColLayout = $.cookie('alternatelayout') === "y";

        if (is2ColLayout) {
            onViewpageLayout2Cols(false);
            showProductGridLayout();
        }
        else {
            onViewpageLayout3Cols(false);
            showProductGridLayout();
        }
    }

    function openInfo(infoId, servicemenu, shcode, pid) {
        var data = {cid: infoId, servicemenu: servicemenu};
        if(shcode != undefined){
            data.specialhandlingcode = shcode;
        }
        if(pid != undefined){
            data.pid = pid;
        }

        $.ajax({
            type     : "POST",
            url      : app.urls.pageInclude,
            data     : data,
            dataType : "html",
            success  : function(data) {
                app.dialog.create({
                    target  : $("<div>").attr("id", "dialog-info").html(data),
                    options : { width: "892", height: "609" }
                }).dialog("open");
            },
            failure  : function(data) {
                reportError(app.resources.SERVER_ERROR);
            }
        });
    }

    function initSTLCarousel() {
        $("div.stl-carousel ul").each(function() {
            var visibleSlides = $(this).data("visibleSlides");

            $(this).jcarousel({
                scroll : 1,
                visible: visibleSlides,
                buttonNextHTML: '<div class="next"></div>',
                buttonPrevHTML: '<div class="prev"></div>'
            });
        });
    }

    function initializeEvents() {

        // compare checked
        // $cache.psResults.on("click", "input[type='checkbox'].compare-check", function (e) {
        //  var cb   = $(this);
        //  var tile = cb.closest(".product-tile");
        //  var func    = this.checked ? app.product.compare.addProduct : app.product.compare.removeProduct;
        //  var itemImg = tile.find("div.product-image a img").first();
        //  func({
        //      itemid : tile.data("itemid"),
        //      uuid   : tile[0].id,
        //      img    : itemImg
        //  });
        // });

        // Handle toggle refinement blocks
        $cache.psMain.on("click", ".refinement h3", function (e) {
            $(this).toggleClass("expanded");
            $(this).siblings("div.toggle-sibling").slideToggle("fast", function () {
                app.equalateThem.init();
            });
        }).on("click", ".refinement ul li > a", function (e) {
            if ($(this).siblings("div.toggle-sibling").length > 0) {
                $(this).toggleClass("expanded");
                $(this).siblings("div.toggle-sibling").slideToggle("fast", function () {
                    app.equalateThem.init();
                });
                /* Since expanding has to happen for those, default click action should be halted */
                return false;
            }
        });

        $cache.psMain.on("click", "a#viewpage-layout2cols", function (e) {
            if ( !$(this).hasClass("active") ) { onViewpageLayout2Cols(true); }
            e.preventDefault();
        });

        $cache.psMain.on("click", "a#viewpage-layout3cols", function (e) {
            if ( !$(this).hasClass("active") ) { onViewpageLayout3Cols(true); }
            e.preventDefault();
        });

        // bind category size charts and fit guide click handler
        $cache.psMain.find(".guide").click(function(e){
            e.preventDefault();

            var link = $(this);
            var url = link.attr('href');
            var contentID = link.data('guide-id');
            if(link.hasClass('fit-guide')) {
                var isSelected = link.parent().find("li.selected").children('a').first().attr('data-fit');
                if(isSelected !='traditional' && isSelected != 'regular' && isSelected != 'slim' && isSelected != 'extraslim')
                {
                    app.tabGuide.show(url, link.parent().find("li.selected").children('a').first().attr('data-fit'), 'fitguide.css', 935, 600,contentID);
                }
                else
                {
                    app.tabGuide.show(url, link.parent().find("li.selected").children('a').first().attr('data-fit'), 'fitguide.css', 935, 850,contentID);
                }
            } else if(link.hasClass('size-guide')) {

                if (contentID == 'mens-dress-shirts-size-chart') {
                    app.tabGuide.show(contentID, $('li.selected > a[data-fit]').attr('data-fit'), 'sizeguide.css', 1110, 650);
                } else if (contentID == 'mens-suits-size-chart') {
                    app.tabGuide.show(url, $('li.selected > a[data-fit]').attr('data-fit'), 'sizeguide.css', 1110, 920,contentID);
                } else {
                    app.sizeGuide.show(url);
                }
            } else {
                openInfo(url, "0");
            }
        });

        $cache.psMain.on("click", ".attribute-refinement a, .price-refinement a", function (e) {
            if ( typeof $(this).data('omn') !== "undefined" ) {
                //uncomment line below to be able to test omniture using DigitalPulse Debugger
                //e.preventDefault();

                app.Omniture.trackSearchRefinement($(this).data('omn').refined);
            }
        });

        // Handle events item click. append params.
        $cache.psResults.on("click", ".product-tile a:not('#quickviewbutton'):not('#rememberitembutton'):not('.pgrid-rememberitemtooltipbutton')", function(e) {
            var a  = $(this);

            var isAbsoluteURL = $(this).attr("href").indexOf("http") == 0;
            var isRelativeURL = $(this).attr("href").indexOf("/")    == 0;
            if ( !isAbsoluteURL || !isRelativeURL ) {
                return;
            }

            // get current page refinement values
            var wl = window.location;

            var qsParams   = (wl.search.length > 1) ? app.util.getQueryStringParams(wl.search.substr(1)) : {};
            var hashParams = (wl.hash.length   > 1) ? app.util.getQueryStringParams(wl.hash.substr(1))   : {};

            // merge hash params with querystring params
            var params = $.extend(hashParams, qsParams);
            if (!params.start) {
                params.start = 0;
            }
            // get the index of the selected item and save as start parameter
            var tile = a.closest(".product-tile");
            var idx  = tile.data("idx") ? +tile.data("idx") : 0;

            // convert params.start to integer and add index
            params.start = (+params.start)+(idx+1);

            // set the hash and allow normal action to continue
            try {
                a[0].hash = $.param(params);
            }
            catch (e) {}
        });

        // Handle scroll event
        $(window).scroll(function() {
            
            //verify auto scroll is enabled
            if(!app.pageIndexSelector.autoEnabled()) return;
            
            // SavePreferences is opened
            var psSavePreferencesIsOpen = (function() {
                return app.SavedPreferences.dialogIsOpened();
            })();
            if (psSavePreferencesIsOpen) {
                return;
            }

            // QuickView is open
            var psQuickViewIsOpen = (function() {
                return app.quickView.isOpen();
            })();
            if (psQuickViewIsOpen) {
                return;
            }

            //RememberProduct is open
            var psRememberProductIsOpen = (function() {
                return app.RememberedItems.Global.addProductModalIsOpen();
            })();
            if (psRememberProductIsOpen) {
                return;
            }

            // A request for next page is already in progress
            var psRequestInProgress = (function() {
                return $cache.psContainer.find("div.requestInProgress").size() > 0;
            })();
            if (psRequestInProgress) {
                return;
            }

            // A request for alternate layout is in progress
            var psLayoutRequestInProgress = (function() {
                return $cache.psContainer.find("div.aLayoutRequestInProgress").size() > 0;
            })();
            if (psLayoutRequestInProgress) {
                return;
            }

            // There are no search results
            var psNoResults = (function() {
                return $cache.psResults.find("ul.search-result-items").size() == 0;
            })();
            if (psNoResults) {
                return;
            }

            // We got to the last page
            var psLastPage = (function() {
                var $noResultsElement = $cache.psResults.find("div.no-results");
                var pgHasNoResultsDiv = $noResultsElement.size() > 0;

                var $lastPageElement  = $cache.psResults.find("ul.search-result-items:last");
                var pgCurrentPage     = $lastPageElement.data("pgCurrentPage");
                var pgMaxPage         = $lastPageElement.data("pgMaxPage");

                return pgHasNoResultsDiv || (pgCurrentPage >= pgMaxPage);
            })();
            if (psLastPage) {
                return;
            }

            // Check scroll position
            var psInPositionForRequest = (function() {
                var sCurrentPosition  = (function() {
                    var scrollTop    = parseInt($(window).scrollTop(), 10);
                    var windowHeight = parseInt($(window).height()   , 10);
                    return scrollTop + windowHeight;
                })();
                var sLastItemPosition = (function() {
                    var $lastPageElement = $cache.psResults.find("ul.search-result-items:last");
                    var $lastTileElement = $lastPageElement.find("li.grid-tile:last");
                    var tileOffset       = $lastTileElement.offset();
                    return tileOffset == null ? 0 : tileOffset.top;
                })();

                return ((sLastItemPosition > 0)
                    && (sCurrentPosition >= sLastItemPosition)
                );
            })();
            if (psInPositionForRequest) {
                var $myBuysCachedJSON = $("#myBuysCachedJSON");
                var $lastPageElement  = $cache.psResults.find("ul.search-result-items:last");
                var pgCurrentPage     = $lastPageElement.data("pgCurrentPage");
                var pgMaxPage         = $lastPageElement.data("pgMaxPage");
                var pgNextPageUrl     = $lastPageElement.data("pgNextPageUrl");

                showRequestInProgress();

                if ($myBuysCachedJSON.size() > 0) {
                    $.ajax({
                        type     : "POST",
                        url      : pgNextPageUrl,
                        data     : {cachedJSON : $myBuysCachedJSON.html().trim()},
                        dataType : "html",
                        success  : function(data) { 
                            $cache.psResults.append(data); 
                            initPageLayout(); 
                            app.util.mOverToolTip( $('.product-pricing .groupDiscountedPrice').parent(), 'top', app.customerSettings.firstName, app.resources.MEMBER_DISCOUNT_TOOLTIP, "memberTooltip"); 
                        },
                        failure  : function(data) { reportError(app.resources.SERVER_ERROR);         },
                        complete : function()     { hideRequestInProgress();                         }
                    });
                }
                else {
                    $.ajax({
                        type     : "GET",
                        url      : pgNextPageUrl,
                        dataType : "html",
                        success  : function(data) { 
                            $cache.psResults.append(data); 
                            initPageLayout(); 
                            app.util.mOverToolTip( $('.product-pricing .groupDiscountedPrice').parent(), 'top', app.customerSettings.firstName, app.resources.MEMBER_DISCOUNT_TOOLTIP, "memberTooltip");
                        },
                        failure  : function(data) { reportError(app.resources.SERVER_ERROR);         },
                        complete : function()     { hideRequestInProgress();                         }
                    });
                }
            }
        });

        // setting margin top
        var heightcategorylanding = $('.categorylandingpage-top > .rsp-hook-mca-desktop > .html-slot-container').height() + 73;
        $('.categorylandingpage-middle-left').css("margin-top",-heightcategorylanding);

        var heightleftnav = $('#productsearch-content-left').outerHeight(true) - $('.grid-main-banner').outerHeight(true) - $(' #user-preferences-bar').outerHeight(true) - $('.productsearch-sorting').outerHeight(true) + 130;
        $('#productsearch-content-right').css("min-height",heightleftnav);

        $("select.chzn-select-pgridsize, select.chzn-mobile-select-size").chosen({
            no_results_text       : app.resources.CHZN_SELECT_NO_RESULTS_TEXT,
            allow_single_deselect : true
        }).change(function (e) {
            var $selectedOption = $(this).find('option:selected');
            var refineUrl       = $selectedOption.val();
            var isDisabled      = ($selectedOption.attr("disabled") === "disabled");
            var refinements = app.util.getQueryStringParams(refineUrl);
            app.Omniture.trackSearchRefinement("size|"+$selectedOption[0].label);


            if (!isDisabled) {
                window.location.href = refineUrl;
            }

            e.preventDefault();
        });

        $("select.chzn-select-sort").chosen({
            no_results_text          : app.resources.CHZN_SELECT_NO_RESULTS_TEXT,
            disable_search_threshold : 20
        }).change(function (e) {
            var $selectedOption = $(this).find('option:selected');
            var refineUrl       = $selectedOption.val();
            var isDisabled      = ($selectedOption.attr("disabled") === "disabled");

            if (!isDisabled) {
                window.location.href = refineUrl;
            }

            e.preventDefault();
        });

        // Set product grid alternate layout
        if ($cache.psContainer.find("div.aLayoutRequestInProgress").size() > 0) {
            initPageLayout();
        }
        
        // Show group discount info tool-tip on product grid
        if(app.customerSettings.firstName && app.customerSettings.isInDiscountGroup) {
            app.util.mOverToolTip( $('.product-pricing .groupDiscountedPrice').parent(), 'top', app.customerSettings.firstName, app.resources.MEMBER_DISCOUNT_TOOLTIP, "memberTooltip");
        }
    }

    app.search = {
        init : function () {
            $cache = {
                psMain      : $("#main"),
                psContainer : $("#productsearchresult-productgrid-container"),
                psResults   : $("#productsearchresult-productgrid")
            };
            //if (app.product.compare) {
            //  app.product.compare.init();
            //}
            //updateProductListing();

            initSTLCarousel();

            app.product.tile.initNsSearch();
            initializeEvents();
        }
    };

}(window.app = window.app || {}, jQuery));

// app.bonusProductsView
(function (app, $) {
    var $cache = {};
    var selectedList = [];
    var maxItems = 1;
    var bliUUID = "";

    function getBonusProducts() {
        var o = {};
        o.bonusproducts = [];

        var i, len;
        for (i=0, len=selectedList.length;i<len;i++) {
            var p = { pid : selectedList[i].pid,    qty : selectedList[i].qty, options : {} };
            var a, alen, bp=selectedList[i];
            for (a=0,alen=bp.options.length;a<alen;a++) {
                var opt = bp.options[a];
                p.options = {optionName:opt.name,optionValue:opt.value};
            }
            o.bonusproducts.push({product:p});
        }
        return o;
    }

    function updateSummary() {
        if (selectedList.length===0) {
            $cache.bonusProductList.find("li.selected-bonus-item").remove();
        }
        else {
            var ulList = $cache.bonusProductList.find("ul.selected-bonus-items").first();
            var itemTemplate = ulList.children(".selected-item-template").first();
            var i, len;
            for (i=0, len=selectedList.length;i<len;i++) {
                var item = selectedList[i];
                var li = itemTemplate.clone().removeClass("selected-item-template").addClass("selected-bonus-item");
                li.data("uuid", item.uuid).data("pid", item.pid);
                li.find(".item-name").html(item.name);
                li.find(".item-qty").html(item.qty);
                var ulAtts = li.find(".item-attributes");
                var attTemplate = ulAtts.children().first().clone();
                ulAtts.empty();
                var att;
                for (att in item.attributes) {
                    var attLi = attTemplate.clone();
                    attLi.addClass(att);
                    attLi.children(".display-name").html(item.attributes[att].displayName);
                    attLi.children(".display-value").html(item.attributes[att].displayValue);
                    attLi.appendTo(ulAtts);
                }
                li.appendTo(ulList);
            }
            ulList.children(".selected-bonus-item").show();
        }

        // get remaining item count
        var remain = maxItems - selectedList.length;
        $cache.bonusProductList.find(".bonus-items-available").text(remain);
        if (remain <= 0) {
            $cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
        }
        else {
            $cache.bonusProductList.find("button.button-select-bonus").removeAttr("disabled");
        }
    }
    /********* public app.bonusProductsView object *********/
    app.bonusProductsView = {
        init : function () {
            $cache = {
                bonusProduct : $("#bonus-product-dialog"),
                resultArea : $("#product-result-area")
            };
        },
        show : function (url) {
            // add element to cache if it does not already exist
            if(!$cache.bonusProduct) {
                app.bonusProductsView.init();
            }

            // create the dialog
            $cache.bonusProduct = app.dialog.create({
                target : $cache.bonusProduct,
                options : {
                    width: 795,
                    dialogClass : 'quickview',
                    title : app.resources.BONUS_PRODUCTS
                }
            });

            // load the products then show
            app.ajax.load({
                target : $cache.bonusProduct,
                url : url,
                callback : function () {
                    $cache.bonusProduct.dialog('open');
                    app.bonusProductsView.initializeGrid();
                }
            });

        },
        // close the quick view dialog
        close : function () {
            $cache.bonusProduct.dialog('close');
        },
        loadBonusOption : function () {
            $cache.bonusDiscountContainer = $(".bonus-discount-container");
            if ($cache.bonusDiscountContainer.length===0) { return; }

            app.dialog.create({
                target : $cache.bonusDiscountContainer,
                options : {
                    height : 'auto',
                    width : 350,
                    dialogClass : 'quickview',
                    title : app.resources.BONUS_PRODUCT
                }
            });
            $cache.bonusDiscountContainer.dialog('open');

            // add event handlers
            $cache.bonusDiscountContainer.on("click", ".select-bonus-btn", function (e) {
                e.preventDefault();
                var uuid = $cache.bonusDiscountContainer.data("lineitemid");
                var url = app.util.appendParamsToUrl(app.urls.getBonusProducts,
                                                     {
                                                        bonusDiscountLineItemUUID : uuid,
                                                        source : "bonus"
                                                     });

                $cache.bonusDiscountContainer.dialog('close');
                app.bonusProductsView.show(url);
            }).on("click", ".no-bonus-btn", function (e) {
                $cache.bonusDiscountContainer.dialog('close');
            });
        },
        initializeGrid : function () {
            $cache.bonusProductList = $("#bonus-product-list"),
                bliData = $cache.bonusProductList.data("line-item-detail");

            maxItems = bliData.maxItems;
            bliUUID = bliData.uuid;

            if (bliData.itemCount>=maxItems) {
                $cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
            }

            var cartItems = $cache.bonusProductList.find(".selected-bonus-item");

            cartItems.each(function() {
                var ci = $(this);

                var product = {
                    uuid : ci.data("uuid"),
                    pid : ci.data("pid"),
                    qty : ci.find(".item-qty").text(),
                    name : ci.find(".item-name").html(),
                    attributes: {}
                };
                var attributes = ci.find("ul.item-attributes li");
                attributes.each(function(){
                    var li = $(this);
                    product.attributes[li.data("attributeId")] = {
                        displayName:li.children(".display-name").html(),
                        displayValue:li.children(".display-value").html()
                    };
                });
                selectedList.push(product);
            });


            $cache.bonusProductList.on("click", "div.bonus-product-item a[href].swatchanchor", function (e) {
                e.preventDefault();

                var anchor = $(this),
                    bpItem = anchor.closest(".bonus-product-item"),
                    bpForm = bpItem.find("form.bonus-product-form"),
                    qty = bpForm.find("select.qty-select").first().val(),
                    params = {
                        Quantity : isNaN(qty) ? "1" : qty,
                        format : "ajax",
                        source : "bonus",
                        bonusDiscountLineItemUUID : bliUUID
                    };

                var url = app.util.appendParamsToUrl(this.href, params);

                app.progress.show(bpItem);
                app.ajax.load({
                    url: url,
                    callback : function (data) {
                        bpItem.html(data);
                    }
                });
            })
            .on("click", "button.button-select-bonus", function (e) {
                e.preventDefault();
                if (selectedList.length>=maxItems) {
                    $cache.bonusProductList.find("button.button-select-bonus").attr("disabled", "disabled");
                    $cache.bonusProductList.find("bonus-items-available").text("0");
                    return;
                }

                var form = $(this).closest("form.bonus-product-form"),
                    detail = $(this).closest(".product-detail");
                    uuid = form.find("input[name='productUUID']").val(),
                    qtyVal = form.find("select.qty-select").val(),
                    qty = isNaN(qtyVal) ? 1 : (+qtyVal);

                var product = {
                    uuid : uuid,
                    pid : form.find("input[name='pid']").val(),
                    qty : qty,
                    name : detail.find(".product-name").text(),
                    attributes : detail.find(".product-variations").data("current"),
                    options : []
                };

                var optionSelects = form.find("select.product-option");

                optionSelects.each(function (idx) {
                    product.options.push({
                        name : this.name,
                        value : $(this).val(),
                        display : $(this).children(":selected").first().html()
                    });
                });
                selectedList.push(product);
                updateSummary();
            })
            .on("click", ".remove-link", function(e){
                e.preventDefault();
                var container = $(this).closest("li.selected-bonus-item");
                if (!container.data("uuid")) { return; }

                var uuid = container.data("uuid");
                var i, len = selectedList.length;
                for(i=0;i<len;i++) {
                    if (selectedList[i].uuid===uuid) {
                        selectedList.splice(i,1);
                        break;
                    }
                }
                updateSummary();
            })
            .on("click", ".add-to-cart-bonus", function (e) {
                e.preventDefault();
                var url = app.util.appendParamsToUrl(app.urls.addBonusProduct, {bonusDiscountLineItemUUID:bliUUID});
                var bonusProducts = getBonusProducts();
                // make the server call
                $.ajax({
                    type : "POST",
                    dataType : "json",
                    cache   : false,
                    contentType : "application/json",
                    url : url,
                    data : JSON.stringify(bonusProducts)
                })
                .done(function (response) {
                    // success
                    app.page.refresh();
                })
                .fail(function (xhr, textStatus) {
                    // failed
                    if(textStatus === "parsererror") {
                        reportError(app.resources.BAD_RESPONSE);
                    } else {
                        reportError(app.resources.SERVER_CONNECTION_ERROR);
                    }
                })
                .always(function () {
                    $cache.bonusProduct.dialog("close");
                });
            });
        }
    };

}(window.app = window.app || {}, jQuery));

// app.giftcard
(function (app, $) {

    app.giftcard = {
        checkBalance : function (id, callback) {
            // load gift certificate details
            var url = app.util.appendParamToURL(app.urls.giftCardCheckBalance, "giftCertificateID", id);

            app.ajax.getJson({
                url: url,
                callback: callback
            });
        }
    };
}(window.app = window.app || {}, jQuery));

// app.checkout
(function (app, $) {
    var $cache = {},
        isShipping = false,
        isBilling = false,
        shipping = null;

    /**
     * Helper method which constructs a URL for an AJAX request using the
     * entered address information as URL request parameters.
     */
    function getShippingMethodURL(url) {
        var newUrl = app.util.appendParamsToUrl(url,
                                                {
                                                    countryCode:$cache.countryCode.val(),
                                                    stateCode:$cache.stateCode.val(),
                                                    postalCode:$cache.postalCode.val(),
                                                    city:$cache.city.val()
                                                 },
                                                 true);
        return newUrl;
    }

    //selects a shipping method for the default shipment
    //and updates the summary section on the right hand side
    function selectShippingMethod(shippingMethodID) {
        // nothing entered
        if(!shippingMethodID) {
            return;
        }
        // attempt to set shipping method
        var url = app.util.appendParamsToUrl(app.urls.selectShippingList,
                                             { countryCode:$cache.countryCode.val(),
                                               stateCode:$cache.stateCode.val(),
                                               postalCode:$cache.postalCode.val(),
                                               city:$cache.city.val(),
                                               shippingMethodID:shippingMethodID
                                             },
                                             true);

         app.ajax.getJson({
            url: url,
            callback: function (data) {
                app.checkoutCommon.updateSummary();
                if(!data || !data.shippingMethodID) {
                    reportError("Couldn't select shipping method.");
                    return false;
                }
                // display promotion in UI and update the summary section,
                // if some promotions were applied
                $(".shippingpromotions").empty();
                if(data.shippingPriceAdjustments && data.shippingPriceAdjustments.length > 0) {
                    var i,len=data.shippingPriceAdjustments.length;
                    for(i=0; i<len; i++) {
                        var spa = data.shippingPriceAdjustments[i];
                    }
                }
            }
        });
    }

    /**
     * Make an AJAX request to the server to retrieve the list of applicable shipping
     * based on the merchandise in the cart and the currently entered shipping address
     * (the address may be only partially entered).  If the list of applicable shipping
     * has changed because new address information has been entered, then issue another AJAX
     * request which updates the currently selected shipping method (if needed) and also updates
     * the UI.
     */
    function updateShippingMethodList() {

        if ((! $cache.shippingMethodList) || ($cache.shippingMethodList.length === 0)) { return; }
        var url = getShippingMethodURL(app.urls.shippingMethodsJSON);
         app.ajax.getJson({
            url: url,
            callback: function (data) {
                if(!data) {
                    reportError("Couldn't get list of applicable shipping .");
                    return false;
                }
                if (shipping && shipping.toString() === data.toString())
                {
                    // No need to update the UI.  The list has not changed.
                    return true;
                }

                // We need to update the UI.  The list has changed.
                // Cache the array of returned shipping .
                shipping = data;

                var smlUrl = getShippingMethodURL(app.urls.shippingMethodsList);

                // indicate progress
                app.progress.show($cache.shippingMethodList);

                // load the shipping method form
                $cache.shippingMethodList.load( smlUrl, function () {
                    $cache.shippingMethodList.fadeIn("fast");
                    // rebind the radio buttons onclick function to a handler.
                    $cache.shippingMethodList.find("[name$='_shippingMethodID']").click(function () {
                        selectShippingMethod($(this).val());
                    });

                    // update the summary
                    app.checkoutCommon.updateSummary();
                    app.progress.hide();
                    jQuery.CustomFormElements();
                    /* Re-initialize Chosen */
                    app.CustomSelects.changeThem();
                    jQuery(".radio-row").click(function() {
                        jQuery(".radio-row>label").removeClass("selected-label");
                        jQuery("input:checked").parent().find("label").addClass("selected-label");
                    });

                    // In case some methods are not available because of the products in basket make sure
                    // the first available method is selected if no other is.
                    if( jQuery(".shippingMethodRadio:checked").length == 0 ) {
                        jQuery(".shippingMethodRadio").first().attr("checked", true);
                        jQuery(".shippingMethodRadio").first().change();
                    }

                });
            }

        });
    }

    //shipping page logic
    //checkout gift message counter
    function initGiftMessageBox() {
        // show gift message box, if shipment is gift
        var $isGiftYes = $cache.checkoutForm.find("#is-gift-yes").first();
        if ($isGiftYes.size() > 0) {
            $cache.giftMessage.toggle($isGiftYes.checked);
        }
    }
    
    function giftMessageCharLimit() {
        
        var node = $('#dwfrm_singleshipping_shippingAddress_giftMessage'),
            counter = $('.counterNumber'),
            toggleClass = 'lowCharacterCount',
            warning = 11,
            limit = 60;

        node.bind('keyup', function(e) {
            var val = $(this).val(),
                charLen = limit - val.length;
            if(val.length > limit) {
                $(this).val(val.substr(0, limit));
                counter.addClass(toggleClass);
            } else {
                if (charLen < warning) {
                    counter.addClass(toggleClass);
                } else {
                    counter.removeClass(toggleClass);
                }
            }
            counter.html((parseInt(charLen) < 0) ? 0 : charLen);
        });

        $('#giftmessageflagcntr').bind('click', function(e) {
            var message = $('#giftmessagecntr'),
                checkbox = $('#dwfrm_singleshipping_shippingAddress_giftMessageCheck');
            if(checkbox[0].checked) {
                message.show();
            } else {
                message.hide();
            }
        });
        
        node.trigger('keyup');
    }

    function shippingLoad() {

        $cache.checkoutForm.on("click", "#is-gift-yes, #is-gift-no", function (e) {
            $cache.checkoutForm.find(".gift-message-text").toggle($cache.checkoutForm.find("#is-gift-yes")[0].checked);
        })
        .on("change",
            "select[name$='_addressFields_country'], select[name$='_addressFields_states_state'], input[name$='_addressFields_city'], input[name$='_addressFields_zip']",
            updateShippingMethodList
        );

        // Map registered checkout radio button JSON attribute to correct fields
        $('.radioBtn .selectAddrRadioBtn').bind('click', function() {
            var addressData = JSON.parse( unescape( $(this).attr('data-address') ) );
            $cache.countryCode.val(addressData.countryCode);
            $cache.stateCode.val(addressData.stateCode);
            $cache.postalCode.val(addressData.postalCode);
            $cache.city.val(addressData.city);
        });

        // Trigger 'updateShippingMethodList' once on startup to make sure the methods are applicable
        // for CIS and EE customers
        updateShippingMethodList();

        // Trigger the change event for address select radios in case there is a default selected
        jQuery(".leftContainer .radioBtn input[type='radio'][checked='checked']").change();

        // gift message character limitation
        initGiftMessageBox();
        giftMessageCharLimit();
        app.messageToolTip.init();
        return null;
    }

    function addressLoad() {
        // select address from list
        $cache.addressList.on("change", function () {
            var selected = $(this).children(":selected").first();
            var data = $(selected).data("address");
            if (!data) { return; }
            var p;
            for (p in data) {
                if ($cache[p] && data[p]) {
                    $cache[p].val(data[p].replace("^","'"));
                    // special handling for countrycode => stateCode combo

                    if ($cache[p]===$cache.countryCode) {
                        app.util.updateStateOptions($cache[p]);
                        $cache.stateCode.val(data.stateCode);
                        $cache.stateCode.trigger("change");
                    }
                    else {
                        updateShippingMethodList();
                    }
                }
            }

            // re-validate the form
            $cache.checkoutForm.validate().form();
        });

        // update state options in case the country changes
        $cache.countryCode.on("change", function () {
            app.util.updateStateOptions(this);
        });
    }

    //changes the payment method form
    function changePaymentMethod(paymentMethodID) {
        $cache.payment.removeClass("payment-method-expanded");
        var pmc = $cache.payment.filter("#PaymentMethod_"+paymentMethodID);
        if (pmc.length===0) {
            pmc = $("#PaymentMethod_Custom");
        }
        pmc.addClass("payment-method-expanded");

        // ensure checkbox of payment method is checked
        if($("#is-" + paymentMethodID).size() > 0){
            $("#is-" + paymentMethodID)[0].checked = true;
        }

        var bmlForm = $cache.checkoutForm.find("#PaymentMethod_BML");
        bmlForm.find("select[name$='_year']").removeClass("required");
        bmlForm.find("select[name$='_month']").removeClass("required");
        bmlForm.find("select[name$='_day']").removeClass("required");
        bmlForm.find("input[name$='_ssn']").removeClass("required");

        if (paymentMethodID==="BML") {
            var yr = bmlForm.find("select[name$='_year']");
            bmlForm.find("select[name$='_year']").addClass("required");
            bmlForm.find("select[name$='_month']").addClass("required");
            bmlForm.find("select[name$='_day']").addClass("required");
            bmlForm.find("input[name$='_ssn']").addClass("required");
        }
        app.validator.init();
    }

    function setCCFields(data) {
        // fill the form / clear the former cvn input
        $cache.ccOwner.val(data.holder);
        $cache.ccType.val(data.type);
        $cache.ccNum.val(data.maskedNumber);
        $cache.ccMonth.val(data.expirationMonth);
        $cache.ccYear.val(data.expirationYear);
        $cache.ccCcv.val("");

        // remove error messages
        $cache.ccContainer.find(".errormessage")
                          .toggleClass("errormessage")
                          .filter("span").remove();

        $cache.ccContainer.find(".errorlabel").toggleClass("errorlabel");
    }

    //updates the credit card form with the attributes of a given card
    function populateCreditCardForm(cardID) {
        // load card details
        var url = app.util.appendParamToURL(app.urls.billingSelectCC, "creditCardUUID", cardID);
         app.ajax.getJson({
            url: url,
            callback: function (data) {
                if(!data) {
                    reportError(app.resources.CC_LOAD_ERROR);
                    return false;
                }
                $cache.ccList.data(cardID, data);
                setCCFields(data);
            }
        });
    }

    //loads billing address, Gift Certificates, Coupon and Payment
    function billingLoad() {
        $cache.paymentMethodId.on("click", function () {
            changePaymentMethod($(this).val());

        });

        // get selected payment method from payment method form
        var paymentMethodId = $cache.paymentMethodId.filter(":checked");
        changePaymentMethod(paymentMethodId.length===0 ? "CREDIT_CARD" : paymentMethodId.val());

        // select credit card from list
        $cache.ccList.on("change", function () {
            var cardUUID = $(this).val();
            if(!cardUUID) { return; }
            var ccdata = $cache.ccList.data(cardUUID);
            if (ccdata && ccdata.holder) {
                setCCFields(ccdata);
                return;
            }
            populateCreditCardForm(cardUUID);
        });
        
        initGiftMessageBox();
        giftMessageCharLimit();
    }

    function initializeDom() {
        isShipping = $(".checkout-shipping").length > 0;
        isBilling = $(".checkout-billing").length > 0;
    }

    function initializeCache() {
        $cache.checkoutForm = $("form.address");
        $cache.addressList = $cache.checkoutForm.find(".select-address select[id$='']");
        $cache.firstName = $cache.checkoutForm.find("input[name$='_firstName']");
        $cache.lastName = $cache.checkoutForm.find("input[name$='_lastName']");
        $cache.address1 = $cache.checkoutForm.find("input[name$='_address1']");
        $cache.address2 = $cache.checkoutForm.find("input[name$='_address2']");
        $cache.city = $cache.checkoutForm.find("input[name$='_city']");
        $cache.postalCode = $cache.checkoutForm.find("input[name$='_zip']");
        $cache.phone = $cache.checkoutForm.find("input[name$='_phone']");
        $cache.countryCode = $cache.checkoutForm.find("select[id$='_country']");
        $cache.stateCode = $cache.checkoutForm.find("select[id$='_state']");
        $cache.addToAddressBook = $cache.checkoutForm.find("input[name$='_addToAddressBook']");

        // Check for inputs if not country/state selects can be found
        // This happens for CIS/EE customers since they are hidden fields
        if($cache.countryCode.length == 0) {
            $cache.countryCode = $cache.checkoutForm.find("input[id$='_country']");
            $cache.stateCode = $cache.checkoutForm.find("input[id$='_state']");
        }

        if ($cache.checkoutForm.hasClass("checkout-shipping")) {
            // shipping only
            $cache.useForBilling = $cache.checkoutForm.find("input[name$='_useAsBillingAddress']");
            $cache.giftMessage = $cache.checkoutForm.find(".gift-message-text");
            $cache.shippingMethodList = $("#shipping-method-list");
        }

        if ($cache.checkoutForm.hasClass("checkout-billing")) {
            // billing only
            $cache.email = $cache.checkoutForm.find("input[name$='_emailAddress']");
            $cache.save = $cache.checkoutForm.find("button[name$='_billing_save']");
            $cache.payment = $cache.checkoutForm.find("div.payment-method");
            $cache.paymentMethodId = $cache.checkoutForm.find("input[name$='_selectedPaymentMethodID']");
            $cache.ccContainer = $("#PaymentMethod_CREDIT_CARD");
            $cache.ccList = $("#creditCardList");
            $cache.ccOwner = $cache.ccContainer.find("input[name$='creditCard_owner']");
            $cache.ccType = $cache.ccContainer.find("select[name$='_type']");
            $cache.ccNum = $cache.ccContainer.find("input[name$='_number']");
            $cache.ccMonth = $cache.ccContainer.find("[name$='_month']");
            $cache.ccYear = $cache.ccContainer.find("[name$='_year']");
            $cache.ccCcv = $cache.ccContainer.find("input[name$='_cvn']");
            $cache.BMLContainer = $("#PaymentMethod_BML");
            $cache.gcCheckBalance = $("#gc-checkbalance");
            $cache.addCoupon = $("#add-coupon");

        }
    }

    function initializeEvents() {
        addressLoad();
        if (isShipping) {
            shippingLoad();
        }
        else if (isBilling){
            billingLoad();
        }

        giftCardChk.on("change", function() {
            if (this.checked) {
                giftCardForm.show();
            } else {
                giftCardForm.hide();
            }
        });
     /*   // bind gift cert redemption
        jQuery("input[name=dwfrm_billinggiftcert_giftCertCode]").blur(function() 
                {
            setGiftCertError(null);
            var giftCertificateId = jQuery("input[name=dwfrm_billinggiftcert_giftCertCode]").val();
            // nothing entered
            // Canadian Gift Card 
            
            if ((giftCertificateId >= '6006492610000000000') && (giftCertificateId <= '6006492610249999999'))
            {
                jQuery(".applybutton").attr('disabled', true);
                
                jQuery(".applybutton").addClass('white-bg-btn');
            
            jQuery('.giftcardnumber.card-no input').addClass("error");
            setGiftCertError(app.resources.BILLING_GC_CANADA);
            
            return;
            
            }   
            // Canadian Gift Card Merchandise Credit
            if ((giftCertificateId >= '6006492610250000000') && (giftCertificateId <= '6006492610499999999'))
            {
                jQuery(".applybutton").attr('disabled', true);
                jQuery(".applybutton").addClass('white-bg-btn');
                jQuery('.giftcardnumber.card-no input').addClass("error");
            jQuery('.giftcardnumber.card-no input').addClass("error");
            setGiftCertError(app.resources.BILLING_GC_MERCHANDISE_CANADA);
            return;
            
            }   
                });
        jQuery("input[name=dwfrm_billinggiftcert_giftCertCode]").change(function()
                {
            setGiftCertError(null);
            $(this).removeClass("error");
            jQuery("button.applybutton >span").css('background','#897C68');
            jQuery(".applybutton").attr('disabled', false);
                });
        jQuery("input[name=dwfrm_billinggiftcert_giftCertCode]").blur(function() 
                {
            setGiftCertError(null);
            var giftCertificateId = jQuery("input[name=dwfrm_billinggiftcert_giftCertCode]").val();
            // nothing entered
            // Canadian Gift Card 
            
            if ((giftCertificateId >= '6006492610000000000') && (giftCertificateId <= '6006492610249999999'))
            {
                jQuery(".applybutton").attr('disabled', true);
                
                jQuery(".applybutton").addClass('white-bg-btn');
            
            jQuery('.giftcardnumber.card-no input').addClass("error");
            jQuery('..giftcardnumber.code input').addClass("error");
            setGiftCertError(app.resources.BILLING_GC_CANADA);
            
            return;
            
            }   
            // Canadian Gift Card Merchandise Credit
            if ((giftCertificateId >= '6006492610250000000') && (giftCertificateId <= '6006492610499999999'))
            {
                jQuery(".applybutton").attr('disabled', true);
                jQuery(".applybutton").addClass('white-bg-btn');
                jQuery('.giftcardnumber.card-no input').addClass("error");
            jQuery('.giftcardnumber.code input').addClass("error");
            setGiftCertError(app.resources.BILLING_GC_MERCHANDISE_CANADA);
            return;
            
            }   
                });
        jQuery("input[name=dwfrm_billinggiftcert_giftCertCode]").change(function()
                {
            setGiftCertError(null);
            $(this).removeClass("error");
            jQuery('.giftcardnumber.code input').removeClass("error");
            jQuery("button.applybutton >span").css('background','#897C68');
            jQuery(".applybutton").attr('disabled', false);
                });
        
        */
        jQuery(".applybutton").click(function() {
            var gcId = jQuery("input[name=dwfrm_billinggiftcert_giftCertCode]").val();
            var gcPin = jQuery("input[name=dwfrm_billinggiftcert_giftCertCodePin]").val();
            redeemGiftCert(gcId, gcPin);
            return false;
        });

        // bind coupon remove
        jQuery(".removeCouponButton").click(function() {
            var removeUrl = app.util.getUri(app.urls.removeCoupon);
            app.ajax.load({
                url: removeUrl.url,
                target: '#CheckoutPromoStep',
                callback: function () {
                    $cache.addCoupon = $("#add-coupon");
                    billingLoad();
                }
            });
            return false;
        });

        // bind gift cert balance check
        jQuery("#checkBalance").click(function(e) {
            e.preventDefault();
            var gcId = jQuery("input[name=dwfrm_billinggiftcert_giftCertCode]").val();
            var gcPin = jQuery("input[name=dwfrm_billinggiftcert_giftCertCodePin]").val();
            checkGiftCertBalance(gcId,gcPin);
            return false;
        });
        bindGiftCertificateRemoval();
        //END Gift Card Section

        $cache.gcCheckBalance.on("click", function (e) {
            e.preventDefault();
            $cache.gcCode = $cache.gcCode || $cache.checkoutForm.find("input[name$='_giftCertCode']");
            $cache.balance = $cache.balance || $cache.checkoutForm.find("div.balance");
            if ($cache.gcCode.length===0 || $cache.gcCode.val().length===0) {
                var error = $cache.balance.find("span.error");
                if (error.length===0) {
                    error = $("<span>").addClass("error").appendTo($cache.balance);
                }
                error.html(app.resources.GIFT_CERT_MISSING);
                app.Omniture.reportExistingErrors("client");
                return;
            }

            app.giftcard.checkBalance($cache.gcCode.val(), function (data) {
                if(!data || !data.giftCertificate) {
                    // error
                    var error = $cache.balance.find("span.error");
                    if (error.length===0) {
                        error = $("<span>").addClass("error").appendTo($cache.balance);
                    }
                    error.html(app.resources.GIFT_CERT_INVALID);
                    app.Omniture.reportExistingErrors("client");
                    return;
                }
                // display details in UI
                $cache.balance.find("span.error").remove();
                var balance = data.giftCertificate.balance;
                $cache.balance.html(app.resources.GIFT_CERT_BALANCE+" "+balance);
            });
        });

        $cache.addCoupon.on("click", function(e){
            e.preventDefault();

            $cache.couponCode = $cache.couponCode || $cache.checkoutForm.find("input[name$='_couponCode']");
            $cache.redemption = $cache.redemption || $cache.checkoutForm.find("div.redemption.coupon");
            var val = $cache.couponCode.val();

            if (val.length===0 || val == app.resources.COUPON_CODE_ADD) {
                var error = $cache.redemption.find("span.error");
                if (error.length===0) {
                    error = $("<span>").addClass("error").appendTo($cache.redemption);
                }
                error.html(app.resources.COUPON_CODE_MISSING);
                app.Omniture.reportExistingErrors("client");
                return;
            }


            var url = app.util.appendParamsToUrl(app.urls.addCoupon, {couponCode:val,format:"ajax"});
            $.getJSON(url, function(data) {
                var fail = false;
                var msg = "";
                if (!data) {
                    msg = app.resources.BAD_RESPONSE;
                    fail = true;
                }

                else if (!data.success) {
                    msg = data.message;
                    fail = true;
                } else {
                    var addedCouponUrl = app.util.getUri(app.urls.addedCoupon);
                    app.ajax.load({
                        url: addedCouponUrl.url,
                        target: '#CheckoutPromoStep',
                        callback: function () {
                            billingLoad();
                        }
                    });
                }
                if (fail) {
                    var error = $cache.redemption.find(".couponBalance.error");
                    if (error.length===0) {
                        $(".couponBalance").addClass("error").appendTo($cache.redemption);
                    }
                    $(".couponBalance").html(msg);
                    app.Omniture.reportExistingErrors("client");
                    return;
                }

                $cache.redemption.html(data.message);
            });
        });
        
        giftMessageCharLimit();
        app.messageToolTip.init();
        
    }

    function initializeDom() {
        isShipping = $(".checkout-shipping").length > 0;
        isBilling = $(".checkout-billing").length > 0;

    }

    function initializeCache() {
        $cache.checkoutForm = $("form.address");
        $cache.addressList = $cache.checkoutForm.find(".select-address select[id$='']");
        $cache.firstName = $cache.checkoutForm.find("input[name$='_firstName']");
        $cache.lastName = $cache.checkoutForm.find("input[name$='_lastName']");
        $cache.address1 = $cache.checkoutForm.find("input[name$='_address1']");
        $cache.address2 = $cache.checkoutForm.find("input[name$='_address2']");
        $cache.city = $cache.checkoutForm.find("input[name$='_city']");
        $cache.postalCode = $cache.checkoutForm.find("input[name$='_zip']");
        $cache.phone = $cache.checkoutForm.find("input[name$='_phone']");
        $cache.countryCode = $cache.checkoutForm.find("select[id$='_country']");
        $cache.stateCode = $cache.checkoutForm.find("select[id$='_state']");
        $cache.addToAddressBook = $cache.checkoutForm.find("input[name$='_addToAddressBook']");

        // Check for inputs if not country/state selects can be found
        // This happens for CIS/EE customers since they are hidden fields
        if($cache.countryCode.length == 0) {
            $cache.countryCode = $cache.checkoutForm.find("input[id$='_country']");
            $cache.stateCode = $cache.checkoutForm.find("input[id$='_state']");
        }

        if ($cache.checkoutForm.hasClass("checkout-shipping")) {
            // shipping only
            $cache.useForBilling = $cache.checkoutForm.find("input[name$='_useAsBillingAddress']");
            $cache.giftMessage = $cache.checkoutForm.find(".gift-message-text");
            $cache.shippingMethodList = $("#shipping-method-list");
        }

        if ($cache.checkoutForm.hasClass("checkout-billing")) {
            // billing only
        	$cache.email = $cache.checkoutForm.find("input[name$='_emailAddress']");
            $cache.save = $cache.checkoutForm.find("button[name$='_billing_save']");
            $cache.payment = $cache.checkoutForm.find("div.payment-method");
            $cache.paymentMethodId = $cache.checkoutForm.find("input[name$='_selectedPaymentMethodID']");
            $cache.ccContainer = $("#PaymentMethod_CREDIT_CARD");
            $cache.ccList = $("#creditCardList");
            $cache.ccOwner = $cache.ccContainer.find("input[name$='creditCard_owner']");
            $cache.ccType = $cache.ccContainer.find("select[name$='_type']");
            $cache.ccNum = $cache.ccContainer.find("input[name$='_number']");
            $cache.ccMonth = $cache.ccContainer.find("[name$='_month']");
            $cache.ccYear = $cache.ccContainer.find("[name$='_year']");
            $cache.ccCcv = $cache.ccContainer.find("input[name$='_cvn']");
            $cache.BMLContainer = $("#PaymentMethod_BML");
            $cache.gcCheckBalance = $("#gc-checkbalance");
            $cache.addCoupon = $("#add-coupon");

        }
    }

    function initializeEvents() {
        addressLoad();
        if (isShipping) {
            shippingLoad();
        }
        else if (isBilling){
            billingLoad();
        }
        /* START: Trigger click event on radio boxes */
        $cache.checkoutPage = $("#wrapper.pt_checkout");
        $cache.checkoutPage.on("click", ".rightContainer .title", function (e) {
            $(e.target).parent().parent().find(".leftContainer input:radio").trigger("click");
        });
        /* END: Trigger click event on radio boxes */
        app.CheckoutPromoModal.init();
        
        var $MessageWrapper = $(".pt_checkout .primary-content .error-form");
        var text = $MessageWrapper.text();
        var arr = text.split(".");
        arr[0] = "<h2 class='title'>" + arr[0] + "." + "</h2>";
        arr[1] = "<p class='subtitle'>" + arr[1] + "." + "</p>";
        for (var x in arr) {
        	if (x > 1) {
        		arr[x] = arr[x] + ".";
        	}
        }
        var result = arr.join(" ");
        
        $MessageWrapper.empty();
        $MessageWrapper.html(result);
        
        var foo = "<hr style='border: 1px solid #900;'/>";
        $(".pt_checkout .primary-content .error-form").after(foo).before(foo);
    }

    /******* app.checkout public object ********/
    app.checkout = {
        init : function () {
            initializeCache();
            initializeDom();
            initializeEvents();
        }
    };
}(window.app = window.app || {}, jQuery));

// app.quickview
(function (app, $) {
    var $cache = {};
    var isOpen = false;

    function bindQvButton() {
        $cache.qvButton.one("click", function (e) {
            e.preventDefault();
            app.quickView.show({
                url    : $(this).attr("href"),
                source : "quickview"
            });
        });
    }


    app.quickView = {
        initializeButton : function (container, target) {

            // Check if QuickView is enabled from BM
            if (!app.quickViewEnabled && $("#productsearchresult-productgrid").length>0) {
                return;
            }


            // quick view button
            $(container).on("mouseenter", target, function (e) {
                if(!$cache.qvButton) {
                    $cache.qvButton = $("<a id='quickviewbutton'/>");
                }
                bindQvButton();

                var link = $(this).children("a:first");
                $cache.qvButton.attr({
                    "href"  : link.attr("href"),
                    "title" : link.attr("title")
                }).appendTo($(this));
            });
        },
        init : function () {
            if(app.quickView.exists()) {
                return $cache.quickView;
            }
            $cache.quickView = $("<div/>").attr("id", "QuickViewDialog").appendTo(document.body);
            return $cache.quickView;
        },

        // show quick view dialog and send request to the server to get the product
        // options.source - source of the dialog i.e. search/cart
        // options.url - product url
        show : function (options) {
            // app.quickview.show
            var productRequestUrl = options.url;

            app.progress.show($("#container"));
            options.target   = app.quickView.init();
            options.callback = function () {
                app.dialog.create({
                    target : $cache.quickView,
                    options : {
                        height      : 'auto',
                        width       : 1005,
                        dialogClass : 'quickview',
                        title       : '',
                        resizable   : false,
                        position    : 'center',
                        open        : function() {
                            isOpen = true;
                            app.progress.hide();
                            jQuery.CustomFormElements();
                            /* Re-initialize Chosen */
                            app.CustomSelects.changeThem();
                            /* Promo message tweak */
                            app.promoMessageTweak.doNow();
                            /* PS Padding */
                            app.PSpadding.init();
                            /* Promo message trimming */
                            if ($("body").hasClass("blackfleece")) {
                                app.trimText.trimFnc(".product-detail .promotion-callout", 90);
                                /* Blind value upon math from PDP - 60% of the original PDP value, no PS for BF is available */
                                app.trimText.trimFnc(".product-set .promotion-callout", 39);
                            }
                            else {
                                app.trimText.trimFnc(".product-detail .promotion-callout", 150);
                                app.trimText.trimFnc(".product-set .promotion-callout", 65);
                            }
                            
                            if ($("#wrapper").hasClass("pt_cart")) {
                            	$('.ui-dialog').addClass('wdc-dialog');
                            }
                            
                            if ($("#wrapper").hasClass("product-set")) {
                            	$('.ui-dialog').addClass('wdc-dialog');
                            }
                            // RememberedItems
                            app.RememberedItems.ProductDetail.initQuickView();
                            app.RememberedItems.ProductDetail.initTooltip();
                            app.RememberedItems.ProductDetail.initButton();

                            // RecentlyViewedProducts
                            app.RecentlyViewedProducts.initPage();

                            $('.product-col-2 .product-add-to-cart .btn-wrap a.pdp-cancel-button').click(function(e){
                                e.preventDefault();
                                $cache.quickView.dialog('close');
                            });

                            /* Close the modal on clicking the overlay */
                            app.ClickOutsideModal.bindHere();

                            $(this).find("a.guide").each(function(index) {
                                var guideId = $(this).attr("data-guide-id");
                                if (typeof guideId !== "undefined") {
                                    $(this).attr("href", app.util.appendParamToURL(productRequestUrl, "qvShowGuide", guideId));
                                    $(this).data("onQuickView", true);
                                }
                            });
                            
                            if($('.pdp-main').length > 0){
                            	$(this).find("h1.product-name").addClass("modalLink").click(function(e){
                            		window.location.href = productRequestUrl;
                            	})
                            };

                            if ( !(app.responsive && app.responsive.isTabletLayout()) ) {
                                $(this).find("div.product-primary-image a.product-image.main-image").CloudZoom();
                            }
                        },
                        close : function() {
                            isOpen = false;
                        }
                    }
                });
                $cache.quickView.dialog('open');
                app.product.init();
            };
            app.product.get(options);

            return $cache.quickView;
        },
        // close the quick view dialog
        close : function () {
            if($cache.quickView) {
                $cache.quickView.dialog('close').empty();
                return $cache.quickView;
            }
        },
        exists : function() {
            return $cache.quickView && ($cache.quickView.length > 0);
        },
        isActive : function() {
            return $cache.quickView && ($cache.quickView.length > 0) && ($cache.quickView.children.length > 0);
        },
        isOpen : function() {
            return isOpen;
        },
        container : $cache.quickView
    };

}(window.app = window.app || {}, jQuery));

// app.util
(function (app, $) {

    // sub namespace app.util.* contains utility functions
    app.util = {

        // trims a prefix from a given string, this can be used to trim
        // a certain prefix from DOM element IDs for further processing on the ID
        trimPrefix : function (str, prefix) {
            return str.substring(prefix.length);
        },

        setDialogify : function (e) {
            e.preventDefault();
            var actionSource = $(this),
                dlgAction = $(actionSource).data("dlg-action") || {}, // url, target, isForm
                dlgOptions = $.extend({}, app.dialog.settings, $(actionSource).data("dlg-options") || {});

            dlgOptions.title = dlgOptions.title || $(actionSource).attr("title") || "";

            var url = dlgAction.url // url from data
                      || (dlgAction.isForm ? $(actionSource).closest("form").attr("action") : null) // or url from form action if isForm=true
                      || $(actionSource).attr("href"); // or url from href

            if (!url) { return; }

            // if this is a content link, update url from Page-Show to Page-Include
            if ($(this).hasClass("attributecontentlink")) {
                var uri = app.util.getUri(url);
                url = app.urls.pageInclude+uri.query;
            }

            var dlg = app.dialog.create({target : dlgAction.target, options : dlgOptions});

            // Form data to send
            var formData = dlgAction.isForm ? $(actionSource).closest("form").serialize(): null;
            
            app.ajax.load({
                type     : "POST",
                url      : $(actionSource).attr("href") || $(actionSource).closest("form").attr("action"),
                target   : dlg,
                data     : formData,
                callback : function () {
                    dlg.dialog("open");   // open after load to ensure dialog is centered
                    app.validator.init(); // re-init validator
                }
            });
        },

        // setDialogifyPost sends also the forms data in a POST request. It restores the forms handling in backend.
        setDialogifyPost : function (e) {
            e.preventDefault();
            var actionSource = $(this),
            dlgAction = $(actionSource).data("dlg-action") || {}, // url, target, isForm
            dlgOptions = $.extend({}, app.dialog.settings, $(actionSource).data("dlg-options") || {});

            dlgOptions.title = dlgOptions.title || $(actionSource).attr("title") || "";

            var url = dlgAction.url // url from data
                      || (dlgAction.isForm ? $(actionSource).closest("form").attr("action") : null) // or url from form action if isForm=true
                      || $(actionSource).attr("href"); // or url from href

            if (!url) { return; }

            // if this is a content link, update url from Page-Show to Page-Include
            if ($(this).hasClass("attributecontentlink")) {
                var uri = app.util.getUri(url);
                url = app.urls.pageInclude+uri.query;
            }

            var dlg = app.dialog.create({target:dlgAction.target, options : dlgOptions});
            var form = $(actionSource).closest("form");
            var data = form.serialize();
            var url = $(actionSource).attr("href") || $(actionSource).closest("form").attr("action");
            app.ajax.load({
                url      : url,
                type     : "POST",
                data     : data,
                target   : dlg,
                callback : function () {

                    // Fire an omniture tracking event if the requestpassword form modal has been submitted
                    if (this.url.indexOf("UsernameRequest") != -1 && typeof s != "undefined") {
                        s.pageName = 'my account > username requested';
                        s.channel  = 'my account';
                        s.t();
                    }

                    dlg.dialog("open"); // open after load to ensure dialog is centered
                    app.validator.init(); // re-init validator
                }
            });
        },

        padLeft : function (str, padChar, len) {
            var digs = len || 10;
            var s = str.toString();
            var dif = digs - s.length;
            while(dif > 0) {
                s = padChar + s;
                dif--;
            }
            return s;
        },

        // appends the parameter with the given name and
        // value to the given url and returns the changed url
        appendParamToURL : function (url, name, value) {
            var c = "?";
            if(url.indexOf(c) !== -1) {
                c = "&";
            }
            return url + c + name + "=" + encodeURIComponent(value);
        },
        
        /**
         * Show mouseover tool-tip next to an html element.
         * @param element The element to attach the tooltip to
         * @param direction The direction where the tooltip should be displayed
         * @param content The content to display
         * @param additionalClass Additional CSS class to apply
         * @param positionOverwrite Optional object with position overwrites
         */
        mOverToolTip: function(element, direction, title, content, additionalClass, positionOverwrite, color) {

            $(element).each(function() {
                var element = this;
                var id = app.util.md5(Math.random().toString());
                var modal = null, insideModal = null, modalArrow = null, arrowPrefix = 'staticArrow';
                
                // Create tool-tip and attach to element
                modal = document.createElement("div");
                insideModal = document.createElement("div");
                modalArrow = document.createElement("div");
                jQuery(modal).append(insideModal);
                jQuery(modal).attr('id', id);
                jQuery(modal).addClass("genericTooltip");
                if(additionalClass) {
                    jQuery(modal).addClass(additionalClass);
                }
                jQuery(modalArrow).addClass("arrow");
                jQuery(insideModal).addClass("genericInsideTooltip");
                if(title) {
                    jQuery(insideModal).append("<p class='title'>"+title+"</p>");
                    jQuery(insideModal).append("<hr class='titleLine' />");
                }       
                jQuery(insideModal).append("<p class='content'>"+content+"</p>");
                jQuery(insideModal).append(modalArrow);
                jQuery(element).append(modal);
                
                arrowUrl = (color === 'white') ? 'White' : '';
                if(arrowUrl !== '') $(modalArrow).addClass('arrow-' + arrowUrl.toLowerCase());
                
                // Set the tool-tips position based on direction
                switch(direction) {
                    case "top":
                        jQuery(modal).css("bottom", (jQuery(element).outerHeight(true)+20)+"px");
                        jQuery(modal).css("right", "-"+(jQuery(modal).outerWidth(true)/2 -jQuery(element).outerWidth(true)/2)+"px");
                        jQuery(modalArrow).css("background", "url("+app.urls[arrowPrefix + 'Down' + arrowUrl]+") no-repeat center center");
                        jQuery(modalArrow).css("width", "12px");
                        jQuery(modalArrow).css("height", "6px");
                        jQuery(modalArrow).css("top", jQuery(modal).outerHeight(true)+"px");
                        jQuery(modalArrow).css("left", (jQuery(modal).outerWidth(true)/2 - jQuery(modalArrow).outerWidth(true)/2 )+"px");
                        break;
                    case "right":
                        if(positionOverwrite && positionOverwrite.left) {
                            jQuery(modal).css("left", positionOverwrite.left);
                        } else {
                            jQuery(modal).css("left", "35px");
                        }
                        if(positionOverwrite && positionOverwrite.bottom) {
                            jQuery(modal).css("bottom", positionOverwrite.bottom);
                        } else {
                            jQuery(modal).css("bottom", "-"+(jQuery(modal).outerHeight(true)-jQuery(element).outerHeight(true))/1.4+"px");
                        }
                        jQuery(modalArrow).css("background", "url(" + app.urls[arrowPrefix + 'Left' + arrowUrl] + ") no-repeat center center");
                        jQuery(modalArrow).css("width", "6px");
                        jQuery(modalArrow).css("height", "12px");
                        jQuery(modalArrow).css("top", (jQuery(modal).outerHeight(true)/4 - jQuery(modalArrow).outerWidth(true)/2)+"px");
                        jQuery(modalArrow).css("left", -jQuery(modalArrow).outerWidth(true)+"px");
                        break;
                    case "bottom":
                        jQuery(modal).css("bottom", "-"+(jQuery(element).outerHeight(true)+jQuery(modal).outerHeight(true))+"px");
                        jQuery(modal).css("right", "-"+(jQuery(modal).outerWidth(true)/4)+"px");
                        // TODO: Add arrow here
                        break;
                    case "left":
                        jQuery(modal).css("left", "-"+(jQuery(modal).outerWidth(true)+20)+"px");
                        jQuery(modal).css("bottom", "-"+(jQuery(modal).outerHeight(true)-jQuery(element).outerHeight(true))/2+"px");
                        jQuery(modalArrow).css("background", "url(" + app.urls[arrowPrefix + 'Right' + arrowUrl] + ") no-repeat center center");
                        break;
                    default:
                        jQuery(modal).css("bottom", (jQuery(element).outerHeight(true)+20)+"px");
                        jQuery(modal).css("right", "-"+(jQuery(modal).outerWidth(true)/4)+"px");
                        break;
                }

                
                // Attach event listeners to element
                jQuery(element).on('mouseenter', function() {
                    jQuery(modal).show();
                });
                jQuery(element).on('mouseleave', function() {
                    jQuery(modal).hide();
                });     
            });
        },

        // Set Akamai cookie based on given value or
        // determine by checking for items in cart.
        setAkamaiCookie: function(value) {

            // No value given, check for basket
            if(value === null || value === undefined) {
                value = 1;

                // Check for items in cart
                jQuery.getJSON(app.urls.checkCartCount, function(data){
                    if(data.count && data.count > 0) {
                        value = 0;
                    }

                    // Set cookie
                    $.cookie('bbAkamaiCaching', value, { expires: 365, path: '/' });
                });
            }

            // Set cookie
            else {
                $.cookie('bbAkamaiCaching', value, { expires: 365, path: '/' });
            }
        },

        /**
         *  MD5 (Message-Digest Algorithm)
         *  http://www.webtoolkit.info/
         **/
        md5 : function(string) {
            function RotateLeft(lValue, iShiftBits) {
                return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
            }

            function AddUnsigned(lX,lY) {
                var lX4,lY4,lX8,lY8,lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
                } else {
                    return (lResult ^ lX8 ^ lY8);
                }
            }

            function F(x,y,z) { return (x & y) | ((~x) & z); }
            function G(x,y,z) { return (x & z) | (y & (~z)); }
            function H(x,y,z) { return (x ^ y ^ z); }
            function I(x,y,z) { return (y ^ (x | (~z))); }

            function FF(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            function GG(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            function HH(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            function II(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            function ConvertToWordArray(string) {
                var lWordCount;
                var lMessageLength = string.length;
                var lNumberOfWords_temp1=lMessageLength + 8;
                var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
                var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
                var lWordArray=Array(lNumberOfWords-1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while ( lByteCount < lMessageLength ) {
                    lWordCount = (lByteCount-(lByteCount % 4))/4;
                    lBytePosition = (lByteCount % 4)*8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                    lByteCount++;
                }
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
                lWordArray[lNumberOfWords-2] = lMessageLength<<3;
                lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
                return lWordArray;
            };

            function WordToHex(lValue) {
                var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
                for (lCount = 0;lCount<=3;lCount++) {
                    lByte = (lValue>>>(lCount*8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
                }
                return WordToHexValue;
            };

            function Utf8Encode(string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            };

            var x=Array();
            var k,AA,BB,CC,DD,a,b,c,d;
            var S11=7, S12=12, S13=17, S14=22;
            var S21=5, S22=9 , S23=14, S24=20;
            var S31=4, S32=11, S33=16, S34=23;
            var S41=6, S42=10, S43=15, S44=21;

            string = Utf8Encode(string);

            x = ConvertToWordArray(string);

            a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

            for (k=0;k<x.length;k+=16) {
                AA=a; BB=b; CC=c; DD=d;
                a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
                d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
                c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
                b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
                a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
                d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
                c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
                b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
                a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
                d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
                c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
                b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
                a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
                d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
                c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
                b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
                a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
                d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
                c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
                b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
                a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
                d=GG(d,a,b,c,x[k+10],S22,0x2441453);
                c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
                b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
                a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
                d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
                c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
                b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
                a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
                d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
                c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
                b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
                a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
                d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
                c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
                b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
                a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
                d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
                c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
                b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
                a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
                d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
                c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
                b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
                a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
                d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
                c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
                b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
                a=II(a,b,c,d,x[k+0], S41,0xF4292244);
                d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
                c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
                b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
                a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
                d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
                c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
                b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
                a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
                d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
                c=II(c,d,a,b,x[k+6], S43,0xA3014314);
                b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
                a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
                d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
                c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
                b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
                a=AddUnsigned(a,AA);
                b=AddUnsigned(b,BB);
                c=AddUnsigned(c,CC);
                d=AddUnsigned(d,DD);
            }

            var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

            return temp.toLowerCase();
        },

        appendParamsToUrl : function (url, params) {
            if(!url) {
                return null;
            }

            var uri = app.util.getUri(url),
                includeHash = arguments.length < 3 ? false : arguments[2];

            var qsParams = $.extend(uri.queryParams, params);
            var result = uri.path+"?"+$.param(qsParams);
            if (includeHash) {
                result+=uri.hash;
            }
            if (result.indexOf("http")<0 && result.charAt(0)!=="/") {
                result="/"+result;
            }

            return result;
        },

        appendOnlyNewParamsToUrl : function (url, params) {
            var uri = app.util.getUri(url),
                includeHash = arguments.length < 3 ? false : arguments[2];

            var result = url + '&' + $.param(params);
            if (includeHash) {
                result+=uri.hash;
            }
            if (result.indexOf("http")<0 && result.charAt(0)!=="/") {
                result="/"+result;
            }

            return result;
        },

        removeParamFromURL : function (url, parameter) {
            var urlparts = url.split('?');

            if(urlparts.length >= 2) {
                var urlBase = urlparts.shift();
                var queryString = urlparts.join("?");

                var prefix = encodeURIComponent(parameter) + '=';
                var pars = queryString.split(/[&;]/g);
                var i=pars.length;
                while(0 > i--) {
                    if(pars[i].lastIndexOf(prefix, 0) !== -1) {
                        pars.splice(i, 1);
                    }
                }
                url = urlBase + '?' + pars.join('&');
            }
            return url;
        },

        staticUrl : function (path) {
            if(!path || $.trim(path).length === 0) {
                return app.urls.staticPath;
            }

            return app.urls.staticPath + (path.charAt(0) === "/" ? path.substr(1) : path );
        },

        ajaxUrl : function (path) {
            return app.util.appendParamToURL(path, "format", "ajax");
        },

        toAbsoluteUrl : function (url) {
            if(!url) {
                return null;
            }

            if (url.indexOf("http")!==0 && url.charAt(0)!=="/") {
                url = "/"+url;
            }
            return url;
        },

        loadDynamicCss : function (urls) {
            var i, len=urls.length;
            for(i=0; i < len; i++) {
                app.util.loadedCssFiles.push(app.util.loadCssFile(urls[i]));
            }
        },

        // dynamically loads a CSS file
        loadCssFile : function (url) {
            
            var newCSS = $("<link/>").attr({
                type : "text/css",
                rel : "stylesheet"
            });
            $("head").append(newCSS);
            newCSS.attr("href", url);   
            
            return newCSS;
        },

        // array to keep track of the dynamically loaded CSS files
        loadedCssFiles : [],

        // removes all dynamically loaded CSS files
        clearDynamicCss : function () {
            var i = app.util.loadedCssFiles.length;
            while(0 > i--) {
                $(app.util.loadedCssFiles[i]).remove();
            }
            app.util.loadedCssFiles = [];
        },

        getQueryStringParams : function (qs) {
            if(!qs || qs.length === 0) { return {}; }

            var params = {};
            // Use the String::replace method to iterate over each
            // name-value pair in the string.
            qs.replace( new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
                        function ( $0, $1, $2, $3 ) {   params[ $1 ] = $3; }
            );
            return params;
        },

        getUri : function (o) {
            if(!o) {
                return null;
            }

            var a;
            if (o.tagName && $(o).attr("href")) {
                a = o;
            }
            else if (typeof o === "string") {
                a = document.createElement("a");
                a.href = o;
            }
            else {
                return null;
            }

            var path = a.pathname.charAt(0) === "/" ? a.pathname : "/" + a.pathname         
            return {
                protocol     : a.protocol, //http:
                host         : a.host, //www.myexample.com
                hostname     : a.hostname, //www.myexample.com'
                port         : a.port, //:80
                path         : path, // /sub1/sub2
                query        : a.search, // ?param1=val1&param2=val2
                queryParams  : a.search.length > 1 ? app.util.getQueryStringParams(a.search.substr(1)) : {},
                hash         : a.hash, // #OU812,5150
                url          : a.protocol+ "//" + a.host + path,
                urlWithQuery : a.protocol+ "//" + a.host + a.port + path + a.search
            };
        },

        postForm : function (args) {
            var form = $("<form>").attr({action:args.url,method:"post"}).appendTo("body");
            var p;
            for (p in args.fields) {
                $("<input>").attr({name:p,value:args.fields[p]}).appendTo(form);
            }
            form.submit();
        },

        getMessage : function (key, bundleName, callback) {
            if (!callback || !key || key.length===0) {
                return;
            }
            var params = {key:key};
            if (bundleName && bundleName.length===0) {
                params.bn = bundleName;
            }
            var url = app.util.appendParamsToUrl(app.urls.appResources, params);
            $.getJSON(url, callback);
        },

        updateStateOptions : function(countrySelect) {
            /*
            var country = $(countrySelect);
            if (country.length===0 || !app.countries[country.val()]) {
                 return;
            }
            var form = country.closest("form");
            var stateField = country.data("stateField") ? country.data("stateField") : form.find("select[name$='_state']");
            if (stateField.length===0) {
                return;
            }

            var form = country.closest("form"),
                c = app.countries[country.val()],
                arrHtml = [],
                labelSpan = form.find("label[for='"+stateField[0].id+"'] span").not(".required-indicator");

            // set the label text
            labelSpan.html(c.label);

            var s;
            for (s in c.regions) {
                arrHtml.push('<option value="'+s+'">'+c.regions[s]+'</option>');
            }
            // clone the empty option item and add to stateSelect
            var o1 = stateField.children().first().clone();
            stateField.html(arrHtml.join("")).removeAttr("disabled").children().first().before(o1);
            stateField[0].selectedIndex=0;
            */
        },

        limitCharacters : function () {
            $('form').find('textarea[data-character-limit]').each(function(){
                var characterLimit = $(this).data("character-limit");
                var charCountHtml = String.format(app.resources.CHAR_LIMIT_MSG,
                                        '<span class="char-remain-count">'+characterLimit+'</span>',
                                        '<span class="char-allowed-count">'+characterLimit+'</span>');
                var charCountContainer = $(this).next('div.char-count');
                if (charCountContainer.length===0) {
                    charCountContainer = $('<div class="char-count"/>').insertAfter($(this));
                }
                //charCountContainer.html(charCountHtml);
                // trigger the keydown event so that any existing character data is calculated
                $(this).change();
            });
        },

        setDeleteConfirmation : function(container, message) {
            $(container).on("click", ".delete", function(e){
                e.preventDefault();
                var $target = $(e.target);

                if ($target.attr("href") !== undefined) {
                    function goTo() {
                        window.location = $target.attr("href");
                    }
                }
                else {
                    function goTo() {
                        $target.parents("form").submit();
                    }
                }

                app.ModalMessage(message, function() { goTo(); });
            });
        },

        scrollBrowser : function (xLocation) {
            $('html, body').animate({ scrollTop: xLocation }, 500);
        }
    };
}(window.app = window.app || {}, jQuery));

// app.page
(function (app, $) {
    app.page = {
        title      : "",
        type       : "",
        setContext : function (o) { $.extend(app.page, o); },
        params     : app.util.getQueryStringParams(window.location.search.substr(1)),
        refresh    : function() { var t=setTimeout("window.location.assign(window.location.href);",500); }
    };
}(window.app = window.app || {}, jQuery));

// app.registry
(function (app, $) {
    var $cache = {};

    function populateBeforeAddressForm(addressID) {
        // load address details
        var url = app.urls.giftRegAdd + addressID;
         app.ajax.getJson({
            url: url,
            callback: function (data) {
                if(!data || !data.address) {
                    reportError(app.resources.REG_ADDR_ERROR);
                    return false;
                }
                // fill the form
                $cache.addressBeforeFields.filter("[name$='_addressid']").val(data.address.ID);
                $cache.addressBeforeFields.filter("[name$='_firstname']").val(data.address.firstName);
                $cache.addressBeforeFields.filter("[name$='_lastname']").val(data.address.lastName);
                $cache.addressBeforeFields.filter("[name$='_address1']").val(data.address.address1);
                $cache.addressBeforeFields.filter("[name$='_address2']").val(data.address.address2);
                $cache.addressBeforeFields.filter("[name$='_city']").val(data.address.city);
                $cache.addressBeforeFields.filter("[name$='_zip']").val(data.address.postalCode);
                $cache.addressBeforeFields.filter("[name$='_state']").val(data.address.stateCode);
                $cache.addressBeforeFields.filter("[name$='_country']").val(data.address.countryCode);
                $cache.addressBeforeFields.filter("[name$='_phone']").val(data.address.phone);
                $cache.registryForm.validate().form();
            }
        });
    }

    //updates the after address form with the attributes of a given address
    function populateAfterAddressForm(addressID) {
        // load address details
        var url = app.urls.giftRegAdd + addressID;
         app.ajax.getJson({
            url: url,
            callback: function (data) {
                if(!data || !data.address) {
                    reportError(app.resources.REG_ADDR_ERROR);
                    return false;
                }
                // fill the form
                $cache.addressAfterFields.filter("[name$='_addressid']").val(data.address.ID);
                $cache.addressAfterFields.filter("[name$='_firstname']").val(data.address.firstName);
                $cache.addressAfterFields.filter("[name$='_lastname']").val(data.address.lastName);
                $cache.addressAfterFields.filter("[name$='_address1']").val(data.address.address1);
                $cache.addressAfterFields.filter("[name$='_address2']").val(data.address.address2);
                $cache.addressAfterFields.filter("[name$='_city']").val(data.address.city);
                $cache.addressAfterFields.filter("[name$='_zip']").val(data.address.postalCode);
                $cache.addressAfterFields.filter("[name$='_state']").val(data.address.stateCode);
                $cache.addressAfterFields.filter("[name$='_country']").val(data.address.countryCode);
                $cache.addressAfterFields.filter("[name$='_phone']").val(data.address.phone);
                $cache.registryForm.validate().form();
            }
        });
    }

    //copy address before fields to address after fields
    function copyBeforeAddress() {
        $cache.addressBeforeFields.each(function () {
            var fieldName = $(this).attr("name");
            var afterField = $cache.addressAfterFields.filter("[name='"+fieldName.replace("Before","After")+"']");
            afterField.val($(this).val());
        });
    }

    // disable the address after fields
    function setAfterAddressDisabled(disabled) {
        if (disabled) {
            $cache.addressAfterFields.attr("disabled", "disabled");
        }
        else {
            $cache.addressAfterFields.removeAttr("disabled");
        }
    }

    function initializeCache() {
        $cache = {
            registryForm : $("form[name$='_giftregistry']"),
            registryTable : $("#registry-results")
        };
        $cache.copyAddress = $cache.registryForm.find("input[name$='_copyAddress']");
        $cache.addressBeforeFields = $cache.registryForm.find("fieldset[name='address-before'] input:not(:checkbox), fieldset[name='address-before'] select");
        $cache.addressAfterFields = $cache.registryForm.find("fieldset[name='address-after'] input:not(:checkbox), fieldset[name='address-after'] select");
    }

    function initializeDom() {
        $cache.addressBeforeFields.filter("[name$='_country']").data("stateField", $cache.addressBeforeFields.filter("[name$='_state']"));
        $cache.addressAfterFields.filter("[name$='_country']").data("stateField", $cache.addressAfterFields.filter("[name$='_state']"));

        if ($cache.copyAddress.length && $cache.copyAddress[0].checked) {
            // fill the address after fields
            copyBeforeAddress();
            setAfterAddressDisabled(true);
        }
    }

    function initializeEvents() {
        app.sendToFriend.initializeDialog("div.list-table-header", ".send-to-friend");
        app.util.setDeleteConfirmation("table.item-list", String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_GIFTREGISTRY));

        $cache.copyAddress.on("click", function () {
            if (this.checked) {
                // fill the address after fields
                copyBeforeAddress();
            }
        });
        $cache.registryForm.on("change", "select[name$='_addressBeforeList']", function (e) {
            var addressID = $(this).val();
            if (addressID.length===0) { return; }
            populateBeforeAddressForm(addressID);
            if ($cache.copyAddress[0].checked) {
                copyBeforeAddress();
            }
        })
        .on("change", "select[name$='_addressAfterList']", function (e) {
            var addressID = $(this).val();
            if (addressID.length===0) { return; }
            populateAfterAddressForm(addressID);
        })
        .on("change", $cache.addressBeforeFields.filter(":not([name$='_country'])"), function (e) {
            if (!$cache.copyAddress[0].checked) { return; }
            copyBeforeAddress();
        });


        $("form").on("change", "select[name$='_country']", function(e) {
            app.util.updateStateOptions(this);

            if ($cache.copyAddress.length > 0 && $cache.copyAddress[0].checked && this.id.indexOf("_addressBefore") > 0) {
                copyBeforeAddress();
                $cache.addressAfterFields.filter("[name$='_country']").trigger("change");
            }
        });
    }


    app.registry = {
        init : function () {
            initializeCache();
            initializeDom();
            initializeEvents();
            app.product.initAddToCart();

        }

    };

}(window.app = window.app || {}, jQuery));

// app.progress
(function (app, $) {
    var loader;
    app.progress = {
        show: function (container) {
            //app.progress.show
            var target = (!container || $(container).length===0) ? $("body") : $(container);
            loader = loader || $(".loader");

            if (loader.length===0) {
                loader = $("<div/>").addClass("loader")
                                    .append($("<div/>").addClass("loader-indicator"), $("<div/>").addClass("loader-bg"));

            }
            return loader.appendTo(target).show();
        },
        hide: function () {
        	$(".loader").hide();
        }
    };
}(window.app = window.app || {}, jQuery));

// app.components
(function (app, dw, $) {
    // capture recommendation of each product when it becomes visible in the carousel

    function captureCarouselRecommendations(c, li, index, state) {
        if (!dw) { return; }

        $(li).find(".capture-product-id").each(function () {
            dw.ac.capture({
                id : $(this).text(),
                type : dw.ac.EV_PRD_RECOMMENDATION
            });
        });
    }


    app.components = {
        carouselSettings : {
            scroll : 1,
            itemFallbackDimension: '100%',
            itemVisibleInCallback : app.captureCarouselRecommendations
        },
        init : function () {
            // renders horizontal/vertical carousels for product slots
            $('#horizontal-carousel').jcarousel(app.components.carouselSettings);
            $('#vertical-carousel').jcarousel($.extend({vertical : true}, app.components.carouselSettings));
        }
    };
}(window.app = window.app || {}, window.dw, jQuery));

// app.cart
(function (app, $) {
    var $cache = {};

    function updateCart(postdata, callback) {
        var url = app.util.ajaxUrl(app.urls.addProduct);

        $.post(url, postdata, callback || app.cart.refresh);
    }

    function initializeCache() {
        $cache = {
            cartTable : $("#cart-table"),
            itemsForm : $("#cart-items-form"),
            addCoupon : $("#add-coupon"),
            couponCode : $("form input[name$='_couponCode']")
        };
    }

    function initializeEvents() {

        $cache.addCoupon.attr("disabled", "disabled");

        $cache.cartTable.on("click", ".item-edit-details<a", function (e) {
                e.preventDefault();
                
                app.progress.show("#root");
                app.quickView.show({
                    url : e.target.href,
                    source : "cart"
                });
                
        })
        .on("click", ".bonus-item-actions a", function (e) {
            e.preventDefault();
            app.bonusProductsView.show(this.href);
        });

        // override enter key for coupon code entry
        $cache.couponCode.on("keydown", function (e) {
            if (e.which === 13 && ( $(this).val().length===0 || $(this).val() == app.resources.COUPON_CODE_ADD )) { return false; }
        });
        $cache.couponCode.on("keyup", function (e) {
            initializeAddCoupon($(this));
        });
        $cache.couponCode.on("change", function (e) {
            initializeAddCoupon($(this));
        });
        var $MessageWrapperBag = $(".pt_cart .wrapper-cart #cart-items-form .cart-error-form .error-form");
        var textBag = $MessageWrapperBag.text();
        var arrBag = textBag.split(".");
        arrBag[0] = "<h2 class='title'>" + arrBag[0] + "." + "</h2>";
        arrBag[1] = "<p class='subtitle'>" + arrBag[1] + "." + "</p>";
        arrBag[2] = "<p>" + arrBag[2] + "." + "</p>";
        for (var x in arrBag) {
        	if (x > 2) {
        		arrBag[x] = arrBag[x] + ".";
        	}
        }
        var result = arrBag.join(" ");
        
        $MessageWrapperBag.empty();
        $MessageWrapperBag.html(result);
        
        var foo = "<hr style='border: 1px solid #900;'/>";
        $(".pt_cart .wrapper-cart #cart-items-form .cart-error-form .error-form").after(foo).before(foo);
    }

    function initializeAddCoupon(jqInput) {
        if ( jqInput.val().length != 0 && jqInput.val() != app.resources.COUPON_CODE_ADD ) {
            $cache.addCoupon.removeAttr("disabled");
            $cache.addCoupon.parents().find("input.coupon-error").removeClass("coupon-error");
        }
        else {
            $cache.addCoupon.attr("disabled", "disabled");
        }
    }

    app.cart = {
        add : function (postdata, callback) {
            updateCart(postdata, callback);
        },
        remove : function () {
            return;
        },
        update : function (postdata, callback) {
            updateCart(postdata, callback);
        },
        refresh : function () {
            // refresh without posting
            app.page.refresh();
        },
        init : function () {
            // edit shopping cart line item
            initializeCache();
            initializeEvents();

            //Remebered Items
            app.RememberedItems.Cart.initTooltip();
            app.RememberedItems.Cart.initButton();
        }
    };

}(window.app = window.app || {}, jQuery));

//app.wishlist
(function (app, $) {
    var $cache = { cartTable : $("#cart-table")};

    function initializeEvents() {
        app.sendToFriend.initializeDialog("div.list-table-header", ".send-to-friend");
        $cache.editAddress.on('change', function () {
            window.location.href = app.util.appendParamToURL(app.urls.wishlistAddress, "AddressID", $(this).val());
        });
        $cache.cartTable.on("click", ".item-edit-details<a", function (e) {
            e.preventDefault();
            app.progress.show("#root");
            app.quickView.show({
                url : e.target.href,
                source : "wishlist"
            });
        });
     
    }
    
    //Added to fix 7017 and 7179
    function initToggles() {
    	
    	// Toggle Menu
    	//$("#wdc-accordion h3.toggle-menu-header").click(function(){
    	$('#wdc-accordion h3.toggle-menu-header').live('click', '#wdc-accordion h3.toggle-menu-header', function(e) {
    		//$("#wdc-accordion").find(".active").toggleClass("active"); 
    		$(this).parent().toggleClass("active")
    			.closest('.wdc-toggle-menu').siblings('.wdc-toggle-menu')
    			.removeClass('active');
    		
    		//slide up all the link lists
    		$("#wdc-accordion ul ul.toggle-menu-body-wrapper").slideUp(600);
    		//slide down the link list below the h3 clicked - only if its closed
    		if(!$(this).next().is(":visible"))
    		{ 
    			$(this).next().slideDown(600);
    		}
    	});
    	
    	// Single Toggle Menu
    	//$("#wdc-accordion h3.toggle-menu-header").click(function(){
    	$('#wdc-accordion-single h3.single-toggle-menu-header').live('click', '#wdc-accordion h3.single-toggle-menu-header', function(e) {
    		//$("#wdc-accordion").find(".active").toggleClass("active"); 
    		$(this).parent().toggleClass("active")
    		
    		//slide up all the link lists
    		$("#wdc-accordion-single ul ul.toggle-menu-body-wrapper").slideUp(600);
    		$('#wdc-accordion-single li.wdc-toggle-menu').removeClass("accordion-open");
    		//slide down the link list below the h3 clicked - only if its closed
    		if(!$(this).next().is(":visible"))
    		{ 
    			$(this).next().slideDown(600);
    			
    			function AccordionSetOpen(){
    	        	$('#wdc-accordion-single li.wdc-toggle-menu').addClass("accordion-open");
    	        }
    			
    			setTimeout(AccordionSetOpen,700); 
    		}
    	});
    	
    	/*
    	$('#wdc-accordion-single h3.special-handling-header').live('click', '#wdc-accordion-single h3.special-handling-header', function(e) {
    		var jqThis = $(this);
    		app.PDP.toggleSpecialHandlingCheckbox(jqThis, jqThis.parent().hasClass("active"));
    	});
        */
     
    }
    function initHeaderNavPromo() {
    	var prevScroll = 0;
    	var headerPromoSize = $(".header-promo-area-wrapper").height() + 40;
    	var footerWrapper 		= $('.footer-wrapper');
        var footerContainer 	= footerWrapper.find('#footer-container');
        var footerToggle		= $('.footer-top');
        var footerOpen 			= false;
        var fTop 				= footerToggle.offset().top;
        var fTop2, win;
        var footerShipTo		= $('.shipping-tab-anchor-footer.shipping-tab-trigger');
        footerContainer.addClass("stuck");
        
        function getDocHeight() {
            var D = document;
            return Math.max(
                D.body.scrollHeight, D.documentElement.scrollHeight,
                D.body.offsetHeight, D.documentElement.offsetHeight,
                D.body.clientHeight, D.documentElement.clientHeight
            );
        }
        
        footerContainer.mouseleave(function() {
        	footerContainer.removeClass("open");
        });
        
        footerToggle.mouseenter(function(){
        	if(!$(footerContainer).hasClass("scrolled")){
        		footerContainer.addClass("nudge");
        	}
        }).mouseleave(function(){
        	footerContainer.removeClass("nudge");
        }).click(function(){
        	if($(footerContainer).hasClass("open")){
        		footerContainer.removeClass("open");
        	}
        	if(!$(footerContainer).hasClass("open")){
        		footerContainer.addClass("open");
        	}
        	//footerContainer.addClass("open");
        	footerOpen = !footerOpen;
        	//return false; Generates BUG-6304
        })
        
        footerContainer.find('.connect-link').click(function(){
        	footerContainer.toggleClass("open");
        	footerOpen = !footerOpen;
        	
        	return false;
        })
        
        footerContainer.find('.customer, .findStore').click(function(e){
        	e.stopPropagation();
        });

        
        footerShipTo.click(function () {
    		$('html,body').scrollTop(0);
    		
    		if($(footerContainer).hasClass("stuck")){
    			footerContainer.removeClass("open scrolled");
    			footerOpen = false;
    		}
    	});
        
    	$(window).scroll(function() {
	    	var headerPromoSize = $(".header-promo-area-wrapper").height() + 40;
		    var headerLogoSize = $(".header-logo").height();
		    var headerTopSize = $(".header-top").height();
		    var navSticky = headerPromoSize + headerLogoSize;
		    var navStickyMobile = headerLogoSize;
		    var promoPadding = 0;
			
		    if ($("#wrapper").width() < 479){ // if mobile
				if($("#wrapper").hasClass("promo-open")){ // if promo open
					if ($(this).scrollTop() > headerPromoSize){ 
			    		$('#header, #wrapper').addClass("mobile-sticky");
			    		$('.header-promo-area').addClass('scrolling');
			    		$('.header-promo-area').addClass('closed');
			    		$('.header-promo-area').removeClass('hard-open');
			    		
			  		} else {
			    		$('#header, #wrapper').removeClass("mobile-sticky");
			    		$('.header-promo-area').removeClass('scrolling');
			    		$('.header-promo-area').removeClass('closed');
			    		if ($(".header-promo-area").hasClass("hard-close")){
			    			
			    		} else {
			    			$('.header-promo-area').addClass('hard-open');
			    		}
			  		}
				} else if($("#wrapper").hasClass("promo-closed")){ // if promo closed
					if ($(this).scrollTop() > 1){ 
			    		$('#header, #wrapper').addClass("mobile-sticky");
			    		$('.header-promo-area').addClass('scrolling');
			    		$('.header-promo-area').addClass('closed');
			    		$('.header-promo-area').removeClass('hard-open');
			    		
			  		} else {
			    		$('#header, #wrapper').removeClass("mobile-sticky");
			    		$('.header-promo-area').removeClass('scrolling');
			    		$('.header-promo-area').removeClass('closed');
			    		if ($(".header-promo-area").hasClass("hard-close")){
			    			
			    		} else {
			    			$('.header-promo-area').addClass('hard-open');
			    		}
			  		}
				}
			}else{ // if not mobile
				if($("#wrapper").hasClass("promo-open")){ // if promo is open
					if ($(this).scrollTop() > headerPromoSize){
			    		$('#header, #wrapper').addClass("sticky1");
			    		$('.header-promo-area').addClass('scrolling');
			    		$('.header-promo-area').removeClass('hard-open');
			  		} else {
			    		$('#header, #wrapper').removeClass("sticky1");
			    		$('.header-promo-area').removeClass('scrolling');
			    		$('.header-promo-area').removeClass('closed');
			    		if ($(".header-promo-area").hasClass("hard-close")){
			    			
			    		} else {
			    			$('.header-promo-area').addClass('hard-open')
			    		}
			  		}
					if ($(this).scrollTop() > navSticky){  
			    		$('#header, #wrapper').addClass("sticky2");
			    		$('.header-promo-area').addClass('closed');
			    		$('.header-logo img').addClass('hidden');
			    		$('#navigation').addClass('scrolling');
			    		$('.header-promo-area').removeClass('hard-open');
			  		} else {
			    		$('#header, #wrapper').removeClass("sticky2");
			    		$('.header-promo-area').removeClass('closed');
			    		$('.header-logo img').removeClass('hidden');
			    		$('#navigation').removeClass('scrolling');
			    		if ($(".header-promo-area").hasClass("hard-close")){
			    			
			    		} else {
			    			$('.header-promo-area').addClass('hard-open')
			    		}
			  		}
				} else if($("#wrapper").hasClass("promo-closed")){ // if promo is closed
					if ($(this).scrollTop() > 0){
			    		$('#header, #wrapper').addClass("sticky1");
			    		$('.header-promo-area').addClass('scrolling');
			    		$('.header-promo-area').removeClass('hard-open');
			  		} else {
			    		$('#header, #wrapper').removeClass("sticky1");
			    		$('.header-promo-area').removeClass('scrolling');
			    		$('#navigation').removeClass('scrolling');
			    		$('.header-promo-area').removeClass('closed');
			    		if ($(".header-promo-area").hasClass("hard-close")){
			    			
			    		} else {
			    			$('.header-promo-area').addClass('hard-open')
			    		}
			  		}
					if ($(this).scrollTop() > navStickyMobile){  
			    		$('#header, #wrapper').addClass("sticky2");
			    		$('#navigation').addClass('scrolling');
			    		$('.header-promo-area').addClass('closed');
			    		$('.header-promo-area').removeClass('hard-open');
			  		} else {
			    		$('#header, #wrapper').removeClass("sticky2");
			    		$('#navigation').removeClass('scrolling');
			    		$('.header-promo-area').removeClass('closed');
			    		if ($(".header-promo-area").hasClass("hard-close")){
			    			
			    		} else {
			    			$('.header-promo-area').addClass('hard-open')
			    		}
			  		}
				}
			}
			
			var scrollPos = $(window).scrollTop();
			fTop2 = footerToggle.offset().top;
			var pColPos = $('.product-col-1').offset();
			
			   if (scrollPos > prevScroll){
				   //scroll down
				   if($(footerContainer).hasClass("stuck")){
					   if(fTop2 >= (getDocHeight() - 30) ){
						   footerContainer.addClass("open scrolled").removeClass("stuck");
						   footerOpen = true;
					   }
				   }
				   
				   if($('.product-set').length){
					   if($('#wrapper').width() >= 769){
						   //var pColPos = $('.product-col-1').offset();
						   var pCol = $('.product-col-1').height();
						   var pSetImg = $('.primaryimage-social').height();
						   var scrollDiff = pCol - pSetImg + 100;
						   
						   if(scrollPos > pColPos.top - 80){
							   $('.primaryimage-social').addClass("stickit");
						   }
						   
						   if(scrollPos > scrollDiff){
							   $('.primaryimage-social').removeClass("stickit").addClass("stickit-end");
						   }
					   }
				   }
				  
				   
			   } else {
				  //scroll up
					   if (fTop2 >= ($(window).scrollTop() + $(window).height() - 30) ) {
						   footerContainer.addClass("stuck").removeClass("open scrolled");
						   footerOpen = false;
					   }
					   if($('.product-set').length){
						   if($('#wrapper').width() >=769){
							   var pColPos = $('.product-col-1').offset();
							   var pCol = $('.product-col-1').height();
							   var mainContent = $('#main').offset();
							   var pSetImg = $('.primaryimage-social').height();
							   var scrollDiff = pColPos.top + pCol - pSetImg - 100;
							   if(scrollPos < scrollDiff){
								   $('.primaryimage-social').removeClass("stickit-end").addClass("stickit");
							   }
							   
							   if(!$('.blackfleece').length){
								   if(scrollPos < 165){
									   $('.primaryimage-social').removeClass("stickit");
								   }
							   }else{
								   if(scrollPos < 305){
									   $('.primaryimage-social').removeClass("stickit");
								   }
							   }
							   
						   }
					   }
			   }
			   prevScroll = scrollPos;
			   
			   
		
    	});
    	
    	if (!$.cookie('exclusive-promo')) {
  	      $(".header-promo-area").removeClass('hard-close');
  	      $(".header-promo-area").addClass("hard-open");
  	      $("#wrapper").removeClass('promo-closed');
  	      $("#wrapper").addClass("promo-open");
  	      /*var promoPadding = $(".header-promo-area-wrapper").height() + 75;
  	      $("#wrapper").css("padding-top", promoPadding + "px");*/
  	  }
  	  
  	  $(".limited-time-excl, .promo-close").click(function(e) {
  	    e.preventDefault();
  	    $("body").scrollTo(0);
  	    if($(".header-promo-area").hasClass("closed")){
  	      $(".header-promo-area").removeClass("closed");
  	      $("#wrapper").removeClass("promo-closed");
  	      $("#wrapper").addClass("promo-open");
  	      $(".header-promo-area").removeClass("hard-close");
  	      $(".header-promo-area").addClass("hard-open");
  	      $(".header-promo-area").stop().animate({
  		        "height": headerPromoSize+"px",
  		        "max-height": "500px"
  		    }, 200);
  	    } else if ($(".header-promo-area").hasClass("hard-close")){
  	      $(".header-promo-area").removeClass("hard-close");
  	      $(".header-promo-area").addClass("hard-open");
  	      $("#wrapper").removeClass("promo-closed");
  	      $("#wrapper").addClass("promo-open");
  	      $(".header-promo-area").removeClass("closed");
  	      $(".header-promo-area").stop().animate({
  		        "height": headerPromoSize+"px",
  		        "max-height": "500px"
  		    }, 200);
  	    } else {
  	      $(".header-promo-area").addClass("hard-close");
  	      $(".header-promo-area").removeClass("hard-open");
  	      $("#wrapper").addClass("promo-closed");
  	      $("#wrapper").removeClass("promo-open");
  	      $(".header-promo-area").css({
  		        "height": "0px",
  		        "max-height": "0px"
  		    });
  	      $.cookie('exclusive-promo', "true", { path : '/' });
  	    }
  	  });
  	
  	// if has promo is closed on load then remove promo area padding
  	if ($(".header-promo-area").hasClass("hard-close")){
  		$("#wrapper").addClass("promo-closed");
  		$("#wrapper").css("padding-top", "");
  	}
  	
  	$('.limited-time-excl').hover(function() {
  		$(".header-promo-area").toggleClass("nudge");
  		$("#navigation").toggleClass("nudge");
  	});
		
    }
    
    function initCountryName() {
    	var COUNTRY_NAMES = {
    	        "AD" : "ANDORRA",
    	        "AE" : "UNITED ARAB EMIRATES",
    	        "AF" : "AFGHANISTAN",
    	        "AG" : "ANTIGUA AND BARBUDA",
    	        "AI" : "ANGUILLA",
    	        "AL" : "ALBANIA",
    	        "AM" : "ARMENIA",
    	        "AO" : "ANGOLA",
    	        "AQ" : "ANTARCTICA",
    	        "AR" : "ARGENTINA",
    	        "AS" : "AMERICAN SAMOA",
    	        "AT" : "AUSTRIA",
    	        "AU" : "AUSTRALIA",
    	        "AW" : "ARUBA",
    	        "AX" : "ALAND ISLANDS",
    	        "AZ" : "AZERBAIJAN",
    	        "BA" : "BOSNIA AND HERZEGOVINA",
    	        "BB" : "BARBADOS",
    	        "BD" : "BANGLADESH",
    	        "BE" : "BELGIUM",
    	        "BF" : "BURKINA FASO",
    	        "BG" : "BULGARIA",
    	        "BH" : "BAHRAIN",
    	        "BI" : "BURUNDI",
    	        "BJ" : "BENIN",
    	        "BL" : "SAINT BARTHELEMY",
    	        "BM" : "BERMUDA",
    	        "BN" : "BRUNEI DARUSSALAM",
    	        "BO" : "BOLIVIA",
    	        "BQ" : "BONAIRE, SINT EUSTACHIUS, SABA",
    	        "BR" : "BRAZIL",
    	        "BS" : "BAHAMAS",
    	        "BT" : "BHUTAN",
    	        "BV" : "BOUVET ISLAND",
    	        "BW" : "BOTSWANA",
    	        "BY" : "BELARUS",
    	        "BZ" : "BELIZE",
    	        "CA" : "CANADA",
    	        "CC" : "COCOS (KEELING) ISLANDS",
    	        "CD" : "CONGO, THE DEMOCRATIC REPUBLIC OF THE",
    	        "CF" : "CENTRAL AFRICAN REPUBLIC",
    	        "CG" : "CONGO",
    	        "CH" : "SWITZERLAND",
    	        "CI" : "COTE D'IVOIRE",
    	        "CK" : "COOK ISLANDS",
    	        "CL" : "CHILE",
    	        "CM" : "CAMEROON",
    	        "CN" : "CHINA",
    	        "CO" : "COLOMBIA",
    	        "CR" : "COSTA RICA",
    	        "CS" : "CZECHOSLOVAKIA",
    	        "CU" : "CUBA",
    	        "CV" : "CAPE VERDE",
    	        "CW" : "CURACAO",
    	        "CX" : "CHRISTMAS ISLAND",
    	        "CY" : "CYPRUS",
    	        "CZ" : "CZECH REPUBLIC",
    	        "DE" : "GERMANY",
    	        "DJ" : "DJIBOUTI",
    	        "DK" : "DENMARK",
    	        "DM" : "DOMINICA",
    	        "DO" : "DOMINICAN REPUBLIC",
    	        "DZ" : "ALGERIA",
    	        "EC" : "ECUADOR",
    	        "EE" : "ESTONIA",
    	        "EG" : "EGYPT",
    	        "EH" : "WESTERN SAHARA",
    	        "ER" : "ERITREA",
    	        "ES" : "SPAIN",
    	        "ET" : "ETHIOPIA",
    	        "EU" : "EUROPEAN UNION",
    	        "FI" : "FINLAND",
    	        "FJ" : "FIJI",
    	        "FK" : "FALKLAND ISLANDS (MALVINAS)",
    	        "FM" : "MICRONESIA, FEDERATED STATES OF",
    	        "FO" : "FAROE ISLANDS",
    	        "FR" : "FRANCE",
    	        "GA" : "GABON",
    	        "GB" : "UNITED KINGDOM",
    	        "GD" : "GRENADA",
    	        "GE" : "GEORGIA",
    	        "GF" : "FRENCH GUIANA",
    	        "GG" : "GUERNSEY (UK)",
    	        "GH" : "GHANA",
    	        "GI" : "GIBRALTAR",
    	        "GL" : "GREENLAND",
    	        "GM" : "GAMBIA",
    	        "GN" : "GUINEA",
    	        "GP" : "GUADELOUPE",
    	        "GQ" : "EQUATORIAL GUINEA",
    	        "GR" : "GREECE",
    	        "GS" : "SOUTH GEORGIA & SANDWICH ISLANDS",
    	        "GT" : "GUATEMALA",
    	        "GU" : "GUAM",
    	        "GW" : "GUINEA-BISSAU",
    	        "GY" : "GUYANA",
    	        "HK" : "HONG KONG",
    	        "HM" : "HEARD ISLAND AND MCDONALD ISLANDS",
    	        "HN" : "HONDURAS REPUBLIC",
    	        "HR" : "CROATIA",
    	        "HT" : "HAITI",
    	        "HU" : "HUNGARY",
    	        "IC" : "CANARY ISLANDS",
    	        "ID" : "INDONESIA",
    	        "IE" : "IRELAND, REPUBLIC",
    	        "IL" : "ISRAEL",
    	        "IM" : "ISLE OF MAN  (UK)",
    	        "IN" : "INDIA",
    	        "IO" : "BRITISH INDIAN OCEAN TERRITORY",
    	        "IQ" : "IRAQ",
    	        "IR" : "IRAN, ISLAMIC REPUBLIC OF",
    	        "IS" : "ICELAND",
    	        "IT" : "ITALY",
    	        "JE" : "JERSEY (UK)",
    	        "JM" : "JAMAICA",
    	        "JO" : "JORDAN",
    	        "JP" : "JAPAN",
    	        "KE" : "KENYA",
    	        "KG" : "KYRGYZSTAN",
    	        "KH" : "CAMBODIA",
    	        "KI" : "KIRIBATI",
    	        "KM" : "COMOROS",
    	        "KN" : "SAINT KITTS AND NEVIS",
    	        "KP" : "KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF",
    	        "KR" : "KOREA, REPUBLIC OF",
    	        "KW" : "KUWAIT",
    	        "KY" : "CAYMAN ISLANDS",
    	        "KZ" : "KAZAKHSTAN",
    	        "LA" : "LAO PEOPLE'S DEMOCRATIC REPUBLIC",
    	        "LB" : "LEBANON",
    	        "LC" : "SAINT LUCIA",
    	        "LI" : "LIECHTENSTEIN",
    	        "LK" : "SRI LANKA",
    	        "LR" : "LIBERIA",
    	        "LS" : "LESOTHO",
    	        "LT" : "LITHUANIA",
    	        "LU" : "LUXEMBOURG",
    	        "LV" : "LATVIA",
    	        "LY" : "LIBYAN ARAB JAMAHIRIYA",
    	        "MA" : "MOROCCO",
    	        "MC" : "MONACO",
    	        "MD" : "MOLDOVA, REPUBLIC OF",
    	        "ME" : "MONTENEGRO",
    	        "MF" : "NETHERLANDS ANTILLES",
    	        "MG" : "MADAGASCAR",
    	        "MH" : "MARSHALL ISLANDS",
    	        "MK" : "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF",
    	        "ML" : "MALI",
    	        "MM" : "MYANMAR",
    	        "MN" : "MONGOLIA",
    	        "MO" : "MACAO",
    	        "MP" : "NORTHERN MARIANA ISLANDS",
    	        "MQ" : "MARTINIQUE",
    	        "MR" : "MAURITANIA",
    	        "MS" : "MONTSERRAT",
    	        "MT" : "MALTA",
    	        "MU" : "MAURITIUS",
    	        "MV" : "MALDIVES",
    	        "MW" : "MALAWI",
    	        "MX" : "MEXICO",
    	        "MY" : "MALAYSIA",
    	        "MZ" : "MOZAMBIQUE",
    	        "NA" : "NAMIBIA",
    	        "NC" : "NEW CALEDONIA",
    	        "NE" : "NIGER",
    	        "NF" : "NORFOLK ISLAND",
    	        "NG" : "NIGERIA",
    	        "NI" : "NICARAGUA",
    	        "NL" : "NETHERLANDS, THE",
    	        "NO" : "NORWAY",
    	        "NP" : "NEPAL",
    	        "NR" : "NAURU",
    	        "NU" : "NIUE",
    	        "NZ" : "NEW ZEALAND",
    	        "OM" : "OMAN",
    	        "PA" : "PANAMA",
    	        "PE" : "PERU",
    	        "PF" : "FRENCH POLYNESIA",
    	        "PG" : "PAPUA NEW GUINEA",
    	        "PH" : "PHILIPPINES",
    	        "PK" : "PAKISTAN",
    	        "PL" : "POLAND",
    	        "PM" : "SAINT PIERRE AND MIQUELON",
    	        "PN" : "PITCAIRN",
    	        "PR" : "PUERTO RICO",
    	        "PS" : "PALESTINIAN TERRITORY",
    	        "PT" : "PORTUGAL",
    	        "PW" : "PALAU",
    	        "PY" : "PARAGUAY",
    	        "QA" : "QATAR",
    	        "RE" : "REUNION",
    	        "RO" : "ROMANIA",
    	        "RS" : "SERBIA",
    	        "RU" : "RUSSIAN FEDERATION",
    	        "RW" : "RWANDA",
    	        "SA" : "SAUDI ARABIA",
    	        "SB" : "SOLOMON ISLANDS",
    	        "SC" : "SEYCHELLES",
    	        "SD" : "SUDAN",
    	        "SE" : "SWEDEN",
    	        "SG" : "SINGAPORE",
    	        "SH" : "SAINT HELENA",
    	        "SI" : "SLOVENIA",
    	        "SJ" : "SVALBARD AND JAN MAYEN",
    	        "SK" : "SLOVAKIA",
    	        "SL" : "SIERRA LEONE",
    	        "SM" : "SAN MARINO",
    	        "SN" : "SENEGAL",
    	        "SO" : "SOMALIA",
    	        "SR" : "SURINAME",
    	        "ST" : "SAO TOME AND PRINCIPE",
    	        "SV" : "EL SALVADOR",
    	        "SY" : "SYRIAN ARAB REPUBLIC",
    	        "SZ" : "SWAZILAND",
    	        "TC" : "TURKS AND CAICOS ISLANDS",
    	        "TD" : "CHAD",
    	        "TF" : "FRENCH SOUTHERN TERRITORIES",
    	        "TG" : "TOGO",
    	        "TH" : "THAILAND",
    	        "TJ" : "TAJIKISTAN",
    	        "TK" : "TOKELAU",
    	        "TL" : "TIMOR-LESTE",
    	        "TM" : "TURKMENISTAN",
    	        "TN" : "TUNISIA",
    	        "TO" : "TONGA",
    	        "TP" : "EAST TIMOR",
    	        "TR" : "TURKEY",
    	        "TT" : "TRINIDAD AND TOBAGO",
    	        "TV" : "TUVALU",
    	        "TW" : "TAIWAN, PROVINCE OF CHINA",
    	        "TZ" : "TANZANIA, UNITED REPUBLIC OF",
    	        "UA" : "UKRAINE",
    	        "UG" : "UGANDA",
    	        "UM" : "UNITED STATES MINOR OUTLYING ISLANDS",
    	        "US" : "UNITED STATES",
    	        "UY" : "URUGUAY",
    	        "UZ" : "UZBEKISTAN",
    	        "VA" : "HOLY SEE (VATICAN CITY STATE)",
    	        "VC" : "SAINT VINCENT AND THE GRENADINES",
    	        "VE" : "VENEZUELA",
    	        "VG" : "VIRGIN ISLANDS, BRITISH",
    	        "VI" : "VIRGIN ISLANDS, U.S.",
    	        "VN" : "VIET NAM",
    	        "VU" : "VANUATU",
    	        "WF" : "WALLIS AND FUTUNA",
    	        "WS" : "SAMOA",
    	        "YE" : "YEMEN",
    	        "YT" : "MAYOTTE",
    	        "YU" : "TUGOSLAVIA",
    	        "ZA" : "SOUTH AFRICA",
    	        "ZM" : "ZAMBIA",
    	        "ZW" : "ZIMBABWE",
    	        "ZZ" : "WORLD"
    	    };
    	var COUNTRY_NAMES_BY_LOCALE = {
                "de_AT" : "Austria",
                "nl_BE" : "Belgium",
                "el_CY" : "Cyprus",
                "cs_CZ" : "Czech Republic",
                "da_DK" : "Denmark",
                "et_EE" : "Estonia",
                "fi_FI" : "Finland",
                "fr_FR" : "France",
                "de_DE" : "Germany",
                "el_GR" : "Greece",
                "hu_HU" : "Hungary",
                "is_IS" : "Iceland",
                "en_IE" : "Ireland",
                "it_IT" : "Italy",
                "lv_LV" : "Latvia",
                "fr_LU" : "Luxemburg",
                "nl_NL" : "Netherlands",
                "nb_NO" : "Norway",
                "pl_PL" : "Poland",
                "pt_PT" : "Portugal",
                "ro_RO" : "Romania",
                "ru_RU" : "Russian Federation",
                "sk_SK" : "Slovakia",
                "sl_SI" : "Slovenia",
                "es_ES" : "Spain",
                "sv_SE" : "Sweden",
                "de_CH" : "Switzerland",
                "tr_TR" : "Turkey",
                "en_GB" : "United Kingdom",
                "en_CA" : "Canada",
                "es_MX" : "Mexico",
                "en_US" : "United States",
                "default" : "United States",
                "ar_BH" : "Bahrain",
                "ar_EG" : "Egypt",
                "ar_JO" : "Jordan",
                "ar_KW" : "Kuwait",
                "ar_QA" : "Qatar",
                "ar_OM" : "Oman",
                "ar_SA" : "Saudia Arabia",
                "ar_AE" : "United Arab Emirates"
           };
    	var footerLocaleDisplayName = $(".fiftyone-shipping-tab-wrapper-footer .shipping-tab-country");
    	var $shippingTabContentHeader  = $("#fiftyone-shipping-tab-content-header");
    	var $headerShippingCountry = $shippingTabContentHeader.find(".shipping-tab-country");
    	$(footerLocaleDisplayName).text(COUNTRY_NAMES_BY_LOCALE[currentLocale]);
    	if($(footerLocaleDisplayName).text() == "United States" || $(footerLocaleDisplayName).text() == "default"){
    		$('.fiftyone-shipping-tab-wrapper-footer').addClass("domestic");  
    	} 
    	var dw51cacheCookie = $.cookie("dw51cache");
        var isValidCookie   = (dw51cacheCookie != null) && (typeof dw51cacheCookie === "string") && /^([a-zA-Z]+)\|([a-zA-Z]+)\|(.+)$/.test(dw51cacheCookie);
    
        if (isValidCookie) {
            var dw51cacheCookieParts   = dw51cacheCookie.split("|");
            var dw51cacheCookieCountry = dw51cacheCookieParts[0];
            localStorage.setItem("dw51cacheCookieCountry", dw51cacheCookieCountry);
        }  else {
              var newURL = window.location.href;
              var index = newURL.indexOf("default");
              var fullURLIndex = newURL.indexOf("Sites-brooksbrothers-Site");
              if(index<=0)
                {
                  if (fullURLIndex>0) {
                      var dw51cacheCookieCountry = localStorage.getItem("dw51cacheCookieCountry");
                  } else {
                      localStorage.removeItem("dw51cacheCookieCountry");
                  }
                }
            }
        if (COUNTRY_NAMES.hasOwnProperty(dw51cacheCookieCountry)) {
            var countryName = COUNTRY_NAMES[dw51cacheCookieCountry];

           if ($headerShippingCountry.size() > 0) {
              $headerShippingCountry.html( countryName );
          }
       }
    }
    function initContextChooser() {      
        $(document).delegate(".shipping-tab-trigger", "click",  function(e) {
            e.preventDefault();
            
            if($(e.currentTarget).hasClass('shipping-tab-trigger-scroll')) { 
                var tval = ($.browser.mobile) ? 0 : 1000;
                $.scrollTo($("#fiftyone-shipping-tab-wrapper"), tval);
            }
            
            $("#fiftyone-shipping-tab-wrapper").toggle();
            $("#fiftyone-shipping-tab-wrapper-footer").toggle();
            $(".ship-to-background").toggle();
            //alert("TEST");

            var isUnfurled      = $("#fiftyone-shipping-tab-wrapper").hasClass("unfurled");
            var isHeaderTrigger = $(this).hasClass("shipping-tab-anchor-header");
            var $headerShippingToggle = $("#fiftyone-shipping-tab-content-header").find(".shipping-tab-toggle");

            if (isUnfurled) {
                if (isHeaderTrigger) {
                	$("#fiftyone-shipping-tab-wrapper > .shipping-tab-container > .shipping-tab-content-wrapper").slideUp(300, function() {
                		$("#fiftyone-shipping-tab-wrapper > .shipping-tab-container > .shipping-tab-content-wrapper > .shipping-tab-content:first").html( $("<div>", {"class" : "loading"}) );
                        $("#fiftyone-shipping-tab-wrapper").removeClass("unfurled");
                    });
                    $headerShippingToggle.find('.text').text('change');
                    $("#navigation").removeClass('hide');
                }
            }
            else {
            	$("#fiftyone-shipping-tab-wrapper > .shipping-tab-container > .shipping-tab-content-wrapper > .shipping-tab-content:first").html( $("<div>", {"class" : "loading"}) );
                $("#fiftyone-shipping-tab-wrapper").addClass("unfurled");
                $('#navigation').addClass("hide");
                $headerShippingToggle.find('.text').text('close');
                
                var dw51cacheCookie = $.cookie("dw51cache");
                var countryForContextChooser = "US";
                var currencyForContextChooser = "USD";
                
                if (dw51cacheCookie != null) { 
                    var dw51cacheCookieParts   = dw51cacheCookie.split("|");
                    countryForContextChooser = dw51cacheCookieParts[0];
                    currencyForContextChooser = dw51cacheCookieParts[1];
                }
                
                $("#fiftyone-shipping-tab-wrapper > .shipping-tab-container > .shipping-tab-content-wrapper").slideDown(300, function() {
                    $.ajax({
                        type        : "GET",
                        url         : app.urls.fiftyOneContextChooser,
                        dataType    : "html",
                        data        : {country : COUNTRY_NAMES[countryForContextChooser], currency : currencyForContextChooser, currencyName : CURRENCY_NAMES[currencyForContextChooser]},
                        success     : function(data) {
                            var $html = $(data);

                            $html.find("#dw51contextChooser-shopUK").on("click", function(e) {
                                e.preventDefault();

                                $.ajax({
                                    type     : "POST",
                                    url      : app.urls.fiftyOneContextChooserSave,
                                    data     : {country : "GB", currency : "GBP"},
                                    dataType : "json",
                                    success  : function(data) {
                                        redirectToLocale("en_GB");
                                    }
                                });

                                
                                $("#fiftyone-shipping-tab-wrapper > .shipping-tab-container > .shipping-tab-content-wrapper").slideUp(300, function() {
                                	$("#fiftyone-shipping-tab-wrapper > .shipping-tab-container > .shipping-tab-content-wrapper > .shipping-tab-content:first").html( $("<div>", {"class" : "loading"}) );
                                    $("#fiftyone-shipping-tab-wrapper").removeClass("unfurled");
                                    $('#navigation').removeClass("hide");
                                });
                            });

                            $html.find("#dw51contextChooser-shopUS, #dw51contextChooser-shopWorld").on("click", function(e) {
                                e.preventDefault();

                                $.ajax({
                                    type     : "POST",
                                    url      : app.urls.fiftyOneContextChooserSave,
                                    data     : {country : "US", currency : "USD"},
                                    dataType : "json",
                                    success  : function(data) {
                                        redirectToLocale("default");
                                    }
                                });
                                                           
                                $("#fiftyone-shipping-tab-wrapper > .shipping-tab-container > .shipping-tab-content-wrapper").slideUp(300, function() {
                                	$("#fiftyone-shipping-tab-wrapper > .shipping-tab-container > .shipping-tab-content-wrapper > .shipping-tab-content:first").html( $("<div>", {"class" : "loading"}) );
                                    $("#fiftyone-shipping-tab-wrapper").removeClass("unfurled");
                                    $('#navigation').removeClass("hide");
                                });
                            });

                            $("#fiftyone-shipping-tab-wrapper > .shipping-tab-container > .shipping-tab-content-wrapper > .shipping-tab-content:first").html( $html );
                            app.CountryCustomSelect.init();
                        }
                    });
                });
            }
        });
    }
    app.wishlist = {
        init : function () {
            $cache.editAddress = $('#editAddress');
            app.product.initAddToCart();
            initializeEvents();
            initToggles();
            initCountryName();
            initHeaderNavPromo();
            initHeaderPromo();
            initContextChooser();
        }
    };
}(window.app = window.app || {}, jQuery));

// app.minicart
(function (app, $) {
    // sub name space app.minicart.* provides functionality around the mini cart

    var $cache = {},
        initialized = false;

    var timer = {
        id    : null,
        clear : function () {
            if(timer.id) {
                window.clearTimeout(timer.id);
                delete timer.id;
            }
        },
        start : function (duration) {
            timer.id = setTimeout(app.minicart.close, duration);
        }
    };

    app.minicart = {
        url  : "", // during page loading, the Demandware URL is stored here
        init : function() {
//          var showMinicartUrl = app.util.ajaxUrl(app.urls.minicartshow);
//          $.ajax({
//              dataType : "html",
//              url: showMinicartUrl,
//          }).done(function (response) {
//              // success
//              var $minicartHtml = $("<span>").html(response);
//              var $valueElement = $minicartHtml.find(".header-orange-text");
//              if($valueElement.size() > 0) {
//                  $('#mini-cart-total-label').html($valueElement.html());
//              }
//              else {
//                  $('#mini-cart-total-label').html("0");
//              }
//              //var totalValue = $("<div/>").append(minicartHtml).;
//          });
        },

        show : function (minicartHtml) {
        	// Bug 6934
        	// Cart-AddProduct now end with the omnitureassetinclude template.
        	// Inject it into its wrapper in the minicart
        	$("#minicart-omniture-wrapper").html(minicartHtml);
        	///////////////////////////////////////////////////
        	
        	setTimeout(function () {
        		$('#mini-cart').addClass("unfurl");
            }, 100);
        	
        	setTimeout(function () {
        		$('#mini-cart').removeClass("unfurl");
            }, 4000);

//Commented code was used before the updates for bug 6552
//            if (app.responsive && app.responsive.isMobileLayout()) {
            	          	
//                app.dialog.create({
//                    target  : $("<div>").attr("id", "dialog-minicart").attr("class", "responsive").html(minicartHtml),
//                    options : {
//                        width: "302",
//                        height: "273",
//                        position    : ["center", 40],
//                        open : function(event, ui) {
//                            var $self = $(this);
                                                      
                            //4606
//                            var $valueElement = $self.find(".products-mini-cart-qty");
//                            if($valueElement.size() > 0) {
//                                $('#mini-cart-total-label').html($valueElement.html());
//                            } else {
//                                $('#mini-cart-total-label').html("0");
//                            }
                            
//                            jQuery('.ui-dialog').addClass('responsive-minicart');
                                                               
//                            $self.on("click", ".rsp-minibag-checkout-button", function (e) {
//                                window.location = app.urls.cartShow;
//                                $self.dialog("close");
//                            });

//                            $self.on("click", ".rsp-minibag-continueshopping", function (e) {
//                                $self.dialog("close");
//                            });
                                
                            /* Close the modal on clicking the overlay */
//                            app.ClickOutsideModal.bindHere();
//                        }
//                    }
//                }).dialog("open");
               
//            } else {
            	
            	
                // app.minicart.show
                //$cache.minicart.html(html);
//                app.dialog.create({
//                    target  : $("<div>").attr("id", "dialog-minicart").html(minicartHtml),
//                    options : {
//                        width: "880",
//                        position    : ["center", 40],
//                        open : function(event, ui) {
//                            var $self = $(this);
//    
//                            var $valueElement = $self.find(".header-orange-text");
//                            if($valueElement.size() > 0) {
//                                $('#mini-cart-total-label').html($valueElement.html());
//                            } else {
//                                $('#mini-cart-total-label').html("0");
//                            }
    
//                            //timer.id = setTimeout(function() { $self.dialog("close"); }, 5000);
//                            if ( $("body").hasClass("blackfleece") ) {
//                                app.trimText.trimFnc(".products-mini-cart h4", 47);
//                            } else {
//                                app.trimText.trimFnc(".products-mini-cart h4", 68);
//                            }
    
//                            $self.on("click", "#minicart_checkout", function (e) {
//                                window.location = app.urls.cartShow;
//                                $self.dialog("close");
//                            });
    
//                            $self.on("click", "#minicart_continue", function (e) {
//                                $self.dialog("close");
//                            });
    
//                            /* Close the modal on clicking the overlay */
//                            app.ClickOutsideModal.bindHere();
   
//                            // Init MyBuys on MiniCart
//                            try {
//                                mybuys.initPage();
//                            } catch (e) {}
//                        }
//                   }
//                }).dialog("open");
//            };
        },

        // closes the mini cart with given delay
        close : function (delay) {
            timer.clear();
            //$cache.mcContent.slideUp();
        },
        // hook which can be replaced by individual pages/page types (e.g. cart)
        suppressSlideDown : function () {
            return false;
        }
    };
}(window.app = window.app || {}, jQuery));

// app.headercart (appears at the top, next to the bag and logout buttons
(function (app, $) {
	var $cache = {},
		initialized = false;

	var timer = {
		id : null,
		clear : function () {
			if(timer.id) {
				window.clearTimeout(timer.id);
				delete timer.id;
			}
		},
		start : function (duration) {
			timer.id = setTimeout(app.headercart.close, duration);
		}
	};
	app.headercart = {
		url : "", // during page loading, the Demandware URL is stored here

		/**
		 * @function
		 * @description Cache initializations and event binding to the mimcart
		 */
		init : function () {
			$cache.headercart = $("#mini-cart");
			$cache.mcTotal = $cache.headercart.find(".mini-cart-total");
			$cache.mcContent = $cache.headercart.find(".header-cart-content");
			$cache.mcClose = $cache.headercart.find(".header-cart-close");
			$cache.mcProductList = $cache.headercart.find(".header-cart-products");
			$cache.mcProducts = $cache.mcProductList.children(".mini-cart-product");

			var collapsed = $cache.mcProductList.children().not(":first").addClass("collapsed");

			/*// bind hover event to the cart total link at the top right corner
			$cache.headercart.on("mouseenter", ".mini-cart-total", function () {
				if($cache.mcContent.not(":visible")) {
					app.headercart.slide();
				}
			})
			.on("mouseenter", ".header-cart-content", function (e) {
				timer.clear();
			})
			.on("mouseleave", ".header-cart-content", function (e) {
				timer.clear();
				timer.start(30);
			})
			.on("click", ".header-cart-close", app.headercart.close);

			$cache.headercart.mouseleave(function(){
				app.headercart.close();
			});*/

			$cache.mcProducts.append('<div class="header-cart-toggler">&nbsp;</div>');

			$cache.mcProductList.toggledList({toggleClass : "collapsed", triggerSelector:".header-cart-toggler", eventName:"click"});

			initialized = true;
		},
		/**
		 * @function
		 * @description Shows the given content in the mini cart
		 * @param {String} A HTML string with the content which will be shown
		 */
		show : function (html) {
			$cache.headercart.html(html);
		},
		/**
		 * @function
		 * @description Slides down and show the contents of the mini cart
		 */
		slide : function () {
			if(!initialized) {
				app.headercart.init();
			}

			if(app.headercart.suppressSlideDown && app.headercart.suppressSlideDown()) {
				return;
			}

			timer.clear();

			// show the item
			$cache.mcContent.slideDown('slow');

			// after a time out automatically close it
			timer.start(6000);
		},
		/**
		 * @function
		 * @description Closes the mini cart with given delay
		 * @param {Number} delay The delay in milliseconds
		 */
		close : function (delay) {
			timer.clear();
			$cache.mcContent.slideUp();
		},
		/**
		 * @function
		 * @description Hook which can be replaced by individual pages/page types (e.g. cart)
		 */
			suppressSlideDown : function () {
			return false;
		},
		/**
		 * @function
		 * @description call server to update product list in header cart 
		 */
		update : function () {
            $.ajax({
    			dataType : "html",
    			url: app.util.ajaxUrl(app.urls.headercartshow)
    		})
    		.done(function (resp) {
    			app.headercart.show(resp);
    		});
		}
	};
}(window.app = window.app || {}, jQuery));

// app.dialog
(function (app, $) {
    // private

    var $cache = {};
    // end private

    app.dialog = {
        create : function (params, successFunction) {
            // options.target can be an id selector or an jquery object
            var target = $(params.target || "#dialog-container");

            // if no element found, create one
            if(target.length === 0) {
                if(target.selector && target.selector.charAt(0) === "#") {
                    id = target.selector.substr(1);
                }
                target = $("<div>").attr("id", id).addClass("dialog-content").appendTo("body");
            }

            // create the dialog
            $cache.container=target;
            var dialogOptions = $.extend(true, {}, app.dialog.settings, params.options || {});
            //console.log(JSON.stringify(dialogOptions));
            $cache.container.dialog( dialogOptions );

            $cache.container.on("click", ".infohelp", function(e){
                e.preventDefault();
                var jqThis = $(this),
                    data = {};

                data.cid = jqThis.data("cid");
                data.servicemenu = "1";
                data.specialhandlingcode = jqThis.data("shcode");

                if(cid == "pdp-shipping" || cid == "pdp-returns" || cid == "pdp-help"){
                    data.pid = $cache.pdpMain.find("#pid").val();
                }
                $.ajax({
                    type     : "POST",
                    url      : app.urls.pageInclude,
                    data     : data,
                    dataType : "html",
                    success  : function(data) {
                        $cache.container.html(data);

                        // Call the handed over success function if there is one
                        if(successFunction) {
                            successFunction();
                        }
                    },
                    failure  : function(data) {
                        reportError(app.resources.SERVER_ERROR);
                    }
                });
            });

            return $cache.container;

        },

        // opens a dialog using the given url
        open : function (params) {
            if (!params.url || params.url.length===0) { return; }

            $cache.container = app.dialog.create(params);
            params.url = app.util.appendParamsToUrl(params.url, {format:"ajax"});

            // finally load the dialog
            app.ajax.load({
                target : $cache.container,
                url : params.url,
                callback : function () {

                    if($cache.container.dialog("isOpen")) { return; }
                    $cache.container.dialog("open");

                }
            });

        },
        // closes the dialog and triggers the "close" event for the dialog
        close : function () {
            if(!$cache.container) {
                return;
            }
            $cache.container.dialog("close");
        },
        // triggers the "apply" event for the dialog
        triggerApply : function () {
            $(this).trigger("dialogApplied");
        },
        // attaches the given callback function upon dialog "apply" event
        onApply : function (callback) {
            if(callback) {
                $(this).bind("dialogApplied", callback);
            }
        },
        // triggers the "delete" event for the dialog
        triggerDelete : function () {
            $(this).trigger("dialogDeleted");
        },
        // attaches the given callback function upon dialog "delete" event
        onDelete : function (callback) {
            if(callback) {
                $(this).bind("dialogDeleted", callback);
            }
        },
        // submits the dialog form with the given action
        submit : function (action) {
            var form = $cache.container.find("form:first");
            // set the action
            $("<input/>").attr({
                name : action,
                type : "hidden"
            }).appendTo(form);

            // serialize the form and get the post url
            var post = form.serialize();
            var url = form.attr("action");

            // post the data and replace current content with response content
            $.ajax({
                type : "POST",
                url : url,
                data : post,
                dataType : "html",
                success : function (data) {
                    $cache.container.html(data);
                },
                failure : function (data) {
                    reportError(app.resources.SERVER_ERROR);
                }
            });
        },
        settings : {
            autoOpen : false,
            resizable : false,
            bgiframe : true,
            modal : true,
            height : 'auto',
            width : '800',
            buttons : {},
            title : '',
            position : 'center',
            overlay : {
                opacity : 0.5,
                background : "black"
            },
            close : function (event, ui) {
                $(this).dialog("destroy").remove();
            },
            open : function(event, ui) {
                /* Close the modal on clicking the overlay */
                app.ClickOutsideModal.bindHere();
            }
        },
        
        /**
         * Adjust the dialogs placement based on current viewport.
         */
        adjustPlacement : function( dialog ) {
            
            var dialogWidth = $(dialog).outerWidth(true);
            var dialogHeight = $(dialog).outerHeight(true);
            var windowWidth = $(window).outerWidth(true);
            var windowHeight = $(window).outerHeight(true);
            
            $(dialog).css("top", $(window).scrollTop() + ((windowHeight-dialogHeight)/2) );
            $(dialog).css("left", $(window).scrollLeft() + ((windowWidth-dialogWidth)/2) );
        }
    };
}(window.app = window.app || {}, jQuery));

// app.validator
(function (app, $) {

        var naPhone = /^\(?([2-9][0-8][0-9])\)?[\-\. ]?([2-9][0-9]{2})[\-\. ]?([0-9]{4})(\s*x[0-9]+)?$/,
        
        regex = {
            giftCardId: /(^[0-9]{11}$)|(^(600){1}[0-9]{16}$)/,
            password : /^[A-Za-z0-9!@#_$%*+'-]{4,12}$/,
            userName : /^[A-Za-z0-9]{4,20}$/,
            firstName : /^[\sA-Za-z0-9@#_!']{1,15}$/,
            lastName : /^[\sA-Za-z0-9@#_!']{1,25}$/,
            owner : /^[\sA-Za-z0-9@#_!'-]{1,40}$/,
            cvv : /[0-9]{3,4}/,
            orderNumber : /^[0-9]{8}$/,
            postalCode : /^[\sA-Za-z0-9@#_!'-]{4,}$/,
            addressid : /^[\sA-Za-z0-9@,#_!'-.()&~7\/|+]{1,50}$/,
            addressChars : /^[\sA-Za-z0-9@,#_!'-\.]{1,50}$/,
            phone : {
                us : naPhone,
                ca : naPhone
            },
            postal : {
                us : /^\d{5}(-\d{4})?$/,
                ca : /^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$/
                
            },
            email : /^[\w.%+\-]+@[\w.\-]+\.[\w]{2,6}$/,
            nopobox : /^(?!p(?:ost|\.?)\s*(?:o(?:ffice|\.?)\s*)?b\s*o\s*x\s*\.?\s*[0-9]*).*$/i,
            creditCard : {
                bb : /^1[0-9]{10}$/,
                vi : /^4[0-9]{12}(?:[0-9]{3})?$/,
                bbmc: /^514862[0-9]{10}$/,
                mc : /^5[1-5][0-9]{14}$/,
                ae : /^3[47][0-9]{13}$/,
                dc : /^3[068]\d{12}$/,
                dn : /(^6[0-9]{15}$)|(^3[0-9]{13}$)|(^3[0-9]{15}$)/,
                jcb: /(^3[0-9]{15}$)|(^(2131|1800)[0-9]{11}$)/,
                cup: /^6[0-9]{15}$/,
                masked : /^\*{5,12}\d{4}$/
            }

        },
        settings = {
            // global form validator settings
            errorClass   : 'error',
            errorElement : 'span',
            onkeyup      : false,
            ignore       : '.ignore',
            onfocusout   : function (element) {
                //if(!this.checkable(element)) {
                //  this.element(element);
                //}
            },
            highlight : function (element, errorClass, validClass) {
                if(!element) { return; }
                
                if (element.type === 'radio') {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                }
                else {
                	
                    if ( $(element).hasClass("chzn-done") ) {
                        var $errElement = $(element).siblings("div.chzn-container").first();
                        if ($errElement.size() > 0) {
                            $errElement.addClass(errorClass).removeClass(validClass);
                        }
                    }
                    else {
                        $(element).addClass(errorClass).removeClass(validClass);
                        this.focusInvalid();

                    }
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                if (element.type === 'radio') {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                }
                else {
                    if ( $(element).hasClass("chzn-done") ) {
                        var $errElement = $(element).siblings("div.chzn-container").first();
                        if ($errElement.size() > 0) {
                            $errElement.removeClass(errorClass).addClass(validClass);
                        }
                    }
                    else {
                        $(element).removeClass(errorClass).addClass(validClass);
                    }
                }
            },
            showErrors : function(errorMap, errorList) {
                this.defaultShowErrors();
                if(errorList && errorList.length > 0){
                    app.Omniture.reportExistingErrors("client");
                    
                    var errorElement = $('.error').offset().top - 120;
                    $('html,body').animate({scrollTop: errorElement},'fast');
                    
                }
            }
        };


    function validateAddressID(value, el) {
        var isOptional = this.optional(el);
        var isValid = regex.addressid.test($.trim(value));
        var isHidden = !jQuery(el).is(':visible');
        return isOptional || isValid || isHidden;
    }

    function validateTrackOrderPostal(value, el) {
        var isOptional = this.optional(el);
        var isValid = regex.postalCode.test($.trim(value));
        return isOptional || isValid;
    }

    function validateOrderNumber(value, el) {
        var isOptional = this.optional(el);
        var isValid = regex.orderNumber.test($.trim(value));
        return isOptional || isValid;
    }

    function validateOwner(value, el) {
        var isOptional = this.optional(el);
        var isValid = regex.owner.test($.trim(value));
        return isOptional || isValid;
    }

    function validateCouponCode(value, el) {
        var isValid = (value.length > 0);
        return isValid;
    }

    function validateGiftCardId(value, el) {
        var isOptional = this.optional(el);
        var isValid = regex.giftCardId.test($.trim(value));
        return isOptional || isValid;
    }

    function validateCVV(value, el) {
        var isOptional = this.optional(el);
        var isValid = regex.cvv.test($.trim(value));
        var isPlaceHolder = $(el).hasClass("placeholder");
        return isOptional || isValid || isPlaceHolder;
    }

    function validatePassword(value, el) {
        var isOptional = this.optional(el);
        //var isValid = regex.password.test($.trim(value));
        var isValid = (/^\S.*\S$/.test(value)) && (regex.password.test($.trim(value)));
        return isOptional || isValid;
    }

    function validateUserName(value, el) {
        var isOptional = this.optional(el);
        var isValid = regex.userName.test($.trim(value));
        return isOptional || isValid;
    }

    function validateFirstName(value, el) {
        var isOptional = this.optional(el);
        var isValid = regex.firstName.test($.trim(value));
        var isHidden = !jQuery(el).is(':visible');
        return isOptional || isValid || isHidden;
    }

    function validateLastName(value, el) {
        var isOptional = this.optional(el);
        var isValid = regex.lastName.test($.trim(value));
        return isOptional || isValid;
    }

    function validatePhone(value, el) {
    	  var countryforphone = $('#dwfrm_billing_billingAddress_addressFields_country');
    	  
          var countryforphoneform = $(el).closest("form").find(".country");
          
          if(countryforphone != null ){
        	  
        	  var country = countryforphone;
        	  
          }else{
        	  var country = countryforphoneform;
        	  
          }
        if(country.length === 0 || country.val().length === 0 || !regex.phone[country.val().toLowerCase()]) {
            return true;
        }

        var rgx = regex.phone[country.val().toLowerCase()];
        var isOptional = this.optional(el);
        var isValid = rgx.test($.trim(value));
        var isHidden = !jQuery(el).is(':visible');
        return isOptional || isValid || isHidden;
    }

    function validateEmail(value, el) {
        var isOptional = this.optional(el);
        var isValid = regex.email.test($.trim(value));
        var isHidden = !jQuery(el).is(':visible');
        return isOptional || isValid || isHidden;
    }

    function validateAddress(value, el) {
        var checkAddressMapping = validateAndMapAddressChars(value, el);
        var isOptional = this.optional(el);
        var jqEl = jQuery(el);
        var isHidden = !jqEl.is(':visible');
        return (isOptional || isHidden || checkAddressMapping);
    }

    function validateNoPOBox(value, el) {
        var noPOBox = regex.nopobox.test($.trim(value));
        return noPOBox;
    }

    function validateAndMapAddressChars(value, el) {
        var jqEl = jQuery(el);
        jqEl.val(jqEl.val().replace(/[À�?ÂÃÄÅÆ]/g, 'A'));
        jqEl.val(jqEl.val().replace(/[Ç]/g, 'C'));
        jqEl.val(jqEl.val().replace(/[ÈÉÊË]/g, 'E'));
        jqEl.val(jqEl.val().replace(/[Ì�?Î�?]/g, 'I'));
        jqEl.val(jqEl.val().replace(/[�?]/g, 'D'));
        jqEl.val(jqEl.val().replace(/[Ñ]/g, 'N'));
        jqEl.val(jqEl.val().replace(/[ÒÓÔÕÖ]/g, 'O'));
        jqEl.val(jqEl.val().replace(/[ÚÛÜ]/g, 'U'));
        jqEl.val(jqEl.val().replace(/[�?]/g, 'Y'));
        jqEl.val(jqEl.val().replace(/[àáâãäåæ]/g, 'a'));
        jqEl.val(jqEl.val().replace(/[Ç]/g, 'c'));
        jqEl.val(jqEl.val().replace(/[èéêë]/g, 'e'));
        jqEl.val(jqEl.val().replace(/[ìíîï]/g, 'i'));
        jqEl.val(jqEl.val().replace(/[ñ]/g, 'n'));
        jqEl.val(jqEl.val().replace(/[òóôõöø]/g, 'o'));
        jqEl.val(jqEl.val().replace(/[ùúûü]/g, 'u'));
        jqEl.val(jqEl.val().replace(/[ýÿ]/g, 'y'));

        var isEmpty = false;
        if ($.trim(jqEl.val()) == "") isEmpty = true;
        var isValid = regex.addressChars.test($.trim(jqEl.val()));
        var isHidden = !jqEl.is(':visible');
        return isValid  || isHidden || isEmpty;
    }

   function validatePostal(value, el) {
    	
    	for (var i = 0; i < 2; i++) 
    	{    	
        	var country = $(el).closest("form").find("select.country").eq(i);        
        	var postalCode = $(el).closest("form").find("input.zip").eq(i).val();
	        if(country.length === 0 || country.val().length === 0 || !regex.postal[country.val().toLowerCase()]) {
	            return true;
	        }

	        var rgx = regex.postal[country.val().toLowerCase()];
	        var isOptional = this.optional(el);
	        var isValid = rgx.test($.trim(postalCode));
	        var isHidden = !jQuery(el).is(':visible');    	
	        return isOptional || isValid || isHidden;
    	}
    }
    	
    


    function validateRegistrationZip(value, el) {
        if(!value.length) {
            return false;
        }
        return true;
    }

    function validateCCNumber(value, el) {
    	
        var creditCardType = $('#dwfrm_billing_paymentMethods_creditCard_type').val() || $('#dwfrm_paymentinstruments_creditcards_newcreditcard_type').val();
        var creditCardMatcher = null;

        // Error getting type field - Return true to not block the creation workflow
        if(!creditCardType) {
            return true;
        }

        // first of all check, if the given input value comes from server
        // and is currently masked, if so this value is automatically valid,
        // because of the previous client and server side successfully validation
        if (regex.creditCard.masked.test($.trim(value))) {
            return true;
        }

        // get the right fitting credit card format regex
        switch (creditCardType.toLowerCase()) {
            // brooks brothers platinum mastercard
            case 'bbcard':
                creditCardMatcher = regex.creditCard.bbmc;
                break;

            // the brooks card (may look odd but it's actually the brooks card, not the platinum edition)
            case 'bbplcc':
                creditCardMatcher = regex.creditCard.bb;
                break;

            // american express
            case 'amex':
                creditCardMatcher = regex.creditCard.ae;
                break;

            // diners club
            case 'dinersclub':
                creditCardMatcher = regex.creditCard.dc;
                break;

            // discovery network
            case 'discover':
                creditCardMatcher = regex.creditCard.dn;
                break;

            // jcb
            case 'jcb':
                creditCardMatcher = regex.creditCard.jcb;
                break;

            // mastercard
            case 'master':
                creditCardMatcher = regex.creditCard.mc;
                break;

            // visa card
            case 'visa':
                creditCardMatcher = regex.creditCard.vi;
                break;

            // china union pay
            case 'china':
                creditCardMatcher = regex.creditCard.cup;
                break;

            // no credit card type was previously selected
            default:
                return false;
                break;
        }

        // apply regex test for appropriate number format
        var isValid = creditCardMatcher != null ? creditCardMatcher.test($.trim(value)) : false;
        
        
        if(!isValid){
        
        	$(app.forms.billing.paymentMethods.creditCard.cvv).val("");
          	$(app.forms.billing.paymentMethods.creditCard.cvn).val("");
            
          
        }

        return isValid;
    }

    function validateCCMonthAndYear(value, el) {
    	var creditCardType = $('#dwfrm_billing_paymentMethods_creditCard_type').val() || $('#dwfrm_paymentinstruments_creditcards_newcreditcard_type').val();
        // Remove eventually set stored CC error
        jQuery('.cvvInput.existing-cc .dateError').remove();

        // Make sure both fields have been touched
        if(!g_creditCartMonthSet) { g_creditCartMonthSet = false; }
        if(!g_creditCartYearSet) { g_creditCartYearSet = false; }
        if( $(el).attr("id").indexOf("month") != -1 ) {
            g_creditCartMonthSet = true;
        }
        if( $(el).attr("id").indexOf("year") != -1 ) {
            g_creditCartYearSet = true;
        }
        if((g_creditCartMonthSet && g_creditCartYearSet) == false) {
            return true;
        }

        var isOptional = this.optional(el);
        var currentMonth = (new Date()).getMonth()+1;
        var currentYear  = (new Date()).getFullYear();
        var monthSelectVal = parseInt( $('.additionalCCFields, .expirationCCFields').find('select.month').val() );
        var yearSelectVal = parseInt( $('.additionalCCFields, .expirationCCFields').find('select.year').val() );
        var monthSelectContainer = $('.additionalCCFields, .expirationCCFields').find('select.month').parent().find('.chzn-container');
        var yearSelectContainer = $('.additionalCCFields, .expirationCCFields').find('select.year').parent().find('.chzn-container');
        jQuery('.CCMonthYearErrors').hide();

        // Year is bigger than the current one - TRUE
        if(yearSelectVal > currentYear  && creditCardType!="BBPLCC") {
            jQuery('.CCMonthYearErrors').hide();
            monthSelectContainer.removeClass('error');
            yearSelectContainer.removeClass('error');
            return true;
        }

        // Year is equal - Decide basing on month
        if(yearSelectVal == currentYear && creditCardType!="BBPLCC") {
            if(monthSelectVal < currentMonth) {
                jQuery('.CCMonthYearErrors').text(app.resources.INVALID_CCDATE)
                jQuery('.CCMonthYearErrors').show();
                monthSelectContainer.addClass('error');
                yearSelectContainer.addClass('error');

                // Check for the selection of a stored credit card
                if( jQuery(".selectPaymentRadioBtn[checked='checked']").length > 0 ) {
                    jQuery('.cvvInput.existing-cc').children().append('<div class="dateError error">'+app.resources.EXPIRED_CC+'</div>');

                }

                return false;

            } else {
                jQuery('.CCMonthYearErrors').hide();
                monthSelectContainer.removeClass('error');
                yearSelectContainer.removeClass('error');
                return true;
            }
        }

        // Year is smaller - FALSE
        if(yearSelectVal < currentYear 	&& creditCardType!="BBPLCC") {
            jQuery('.CCMonthYearErrors').text(app.resources.INVALID_CCDATE)
            jQuery('.CCMonthYearErrors').show();
            monthSelectContainer.addClass('error');
            yearSelectContainer.addClass('error');
            return false;
        }

        monthSelectContainer.removeClass('error');
        yearSelectContainer.removeClass('error');
        return true;
    }

    /**
     * Check if content of input field matches those of another input with same ID (minus 'confirm' at the end).
     * E.g. <input id="user_emailconfirm" class="validate-confirm"/> is only valid if its content matches that of  <input id="user_email"/>.
     * If no matching input is found no error is displayed.
     */
    function validateConfirm(thisValue, thisElem) {
        var endsWith = function(str, suff) {
            return str.indexOf(suff, str.length - suff.length) !== -1;
        };

        var result = true;
        var suffix = 'confirm';
        var thisId = $(thisElem).attr('id');
        if (thisId && endsWith(thisId, suffix) && thisId.length > suffix.length) {
            var otherId = thisId.substr(0, thisId.length - suffix.length);
            var $otherElem = $('#'+otherId);
            if ($otherElem.length == 1) {
                var otherValue = $otherElem.val();
                if (typeof otherValue !== 'undefined') {
                    result = (thisValue == otherValue);
                }
            }
        }
        return result;
    }

    function validateBillingSelect(value, el) {
        var isOptional = $(el).hasClass("optional");
        var isValid = (value != "invalid");
        return isOptional || isValid;
    }

    function validateAptNumber(value, el) {
        var isOptional = this.optional(el);
        var isValid = regex.firstName.test($.trim(value));
        var isHidden = !jQuery(el).is(':visible');
        return isOptional || isValid || isHidden;
    }

    /**
     * Post Box validation method for jQuery validation
     * plugin. Text fields must have 'nopo' css class to be validated
     * correctly
     */
    $.validator.addMethod("nopo", validateNoPOBox,
            app.resources.NO_POBOX);

    /**
     * Registration form postal code validation method to jQuery validation plugin.
     * Text fields must have 'registrationZip' css class to be validated correctly
     */
    $.validator.addMethod("registrationZip", validateRegistrationZip, app.resources.INVALID_REGZIP);

    /**
     * APT number validation method to jQuery validation plugin.
     * Text fields must have 'aptNumber' css class to be validated correctly
     */
    $.validator.addMethod("aptNumber", validateAptNumber, app.resources.INVALID_APT);

    /**
     * Address nickname validation method to jQuery validation plugin.
     * Text fields must have 'addressid' css class to be validated correctly
     */
    $.validator.addMethod("addressid", validateAddressID, app.resources.INVALID_ADDRESSID);


    /**
     * Add postal code validation method to jQuery validation plugin.
     * Text fields must have 'postalCode' css class to be validated correctly
     */
    $.validator.addMethod("postalCode", validateTrackOrderPostal, app.resources.INVALID_OTPOSTAL);

    /**
     * Add order number validation method to jQuery validation plugin.
     * Text fields must have 'orderNumber' css class to be validated correctly
     */
    $.validator.addMethod("orderNumber", validateOrderNumber, app.resources.INVALID_OTNUMBER);

    /**
     * Add credit card name validation method to jQuery validation plugin.
     * Text fields must have 'owner' css class to be validated correctly
     */
    $.validator.addMethod("owner", validateOwner, app.resources.INVALID_FULLNAME);

    /**
     * Add billing address select box validation method to jQuery validation plugin.
     * Text fields must have 'billingaddressselectbox' css class to be validated correctly
     */
    $.validator.addMethod("billingaddressselectbox", validateBillingSelect, app.resources.BILLING_ADDRESS_MISSING);

    /**
     * Add coupon code validation method to jQuery validation plugin.
     * Text fields must have 'couponCode' css class to be validated correctly
     */
    //$.validator.addMethod("couponCode", validateCouponCode, app.resources.COUPON_CODE_MISSING);

    /**
     * Add credit card month and year validation method to jQuery validation plugin.
     * Text fields must have 'month'/'year' css class to be validated correctly
     */
    $.validator.addMethod("month", validateCCMonthAndYear, '');
    $.validator.addMethod("year", validateCCMonthAndYear, '');

    /**
     * Add credit card number validation method to jQuery validation plugin.
     * Text fields must have 'number' css class to be validated correctly
     */
    $.validator.addMethod("number", validateCCNumber, app.resources.INVALID_CCNUMBER);

    /**
     * Add giftcard number validation method to jQuery validation plugin.
     * Text fields must have 'giftCardId' css class to be validated correctly
     */
    // As per bug 1198 they don't want client sided gift card number validation
    // $.validator.addMethod("giftCardId", validateGiftCardId, app.resources.BILLING_GC_INVALID);

    /**
     * Add password validation method to jQuery validation plugin.
     * Text fields must have 'password' css class to be validated correctly
     */
    $.validator.addMethod("passwordInput", validatePassword, app.resources.INVALID_PASSWORD);

    /**
     * Add username validation method to jQuery validation plugin.
     * Text fields must have 'username' css class to be validated correctly
     */
    $.validator.addMethod("usernameInput", validateUserName, app.resources.INVALID_USERNAME);

    /**
     * Add first- and last name validation method to jQuery validation plugin.
     * Text fields must have 'firstName'/'lastName' css class to be validated correctly
     */
    $.validator.addMethod("firstname", validateFirstName, app.resources.INVALID_FIRSTNAME);
    $.validator.addMethod("lastname", validateLastName, app.resources.INVALID_LASTNAME);
    $.validator.addMethod("firstName", validateFirstName, app.resources.INVALID_FIRSTNAME);
    $.validator.addMethod("lastName", validateLastName, app.resources.INVALID_LASTNAME);

    /**
     * Add CVV/CVN validation method to jQuery validation plugin.
     * Text fields must have 'cvv' css class to be validated as phone
     */
    $.validator.addMethod("cvv", validateCVV, app.resources.INVALID_CVV);
    $.validator.addMethod("cvn", validateCVV, app.resources.INVALID_CVV);
    $.validator.addMethod("giftCardPin", validateCVV, app.resources.BILLING_GC_INVALIDPIN);

    /**
     * Add phone validation method to jQuery validation plugin.
     * Text fields must have 'phone' css class to be validated as phone
     */
    $.validator.addMethod("phone", validatePhone, app.resources.INVALID_PHONE);

    /**
     * Add email validation method to jQuery validation plugin.
     * Text fields must have 'email' css class to be validated as email
     */
    $.validator.addMethod("email", validateEmail, app.resources.INVALID_EMAIL);

    /**
     * Add postal code validation method to jQuery validation plugin.
     * Text fields must have 'zip' css class to be validated as postal code
     */
    $.validator.addMethod("zip", validatePostal, app.resources.INVALID_ZIP);

    /**
     * Add gift cert amount validation method to jQuery validation plugin.
     * Text fields must have 'gift-cert-amont' css class to be validated
     */
    $.validator.addMethod("gift-cert-amount", function(value, el){
        var isOptional = this.optional(el);
        var isValid = (!isNaN(value)) && (parseFloat(value)>=5) && (parseFloat(value)<=5000);
        return isOptional || isValid;
    }, app.resources.GIFT_CERT_AMOUNT_INVALID);

    $.validator.addMethod("address1", validateAddress, app.resources.INVALID_ADDRESS);
    $.validator.addMethod("address2", validateAddress, app.resources.INVALID_ADDRESS);

    $.validator.addMethod("address1", validateAndMapAddressChars, app.resources.INVALID_ADDRESSCHARS);
    $.validator.addMethod("address2", validateAndMapAddressChars, app.resources.INVALID_ADDRESSCHARS);
    $.validator.addMethod("city", validateAndMapAddressChars, app.resources.INVALID_CITYCHARS);


    /**
     * Add positive number validation method to jQuery validation plugin.
     * Text fields must have 'positivenumber' css class to be validated as positivenumber
     */
    $.validator.addMethod("positivenumber", function (value, element) {
        if($.trim(value).length === 0) { return true; }
        return (!isNaN(value) && Number(value) >= 0);
    }, "");
    // "" should be replaced with error message if needed

    /**
     * see validateConfirm() for more info
     */
    $.validator.addMethod("validate-confirm-password", validateConfirm, app.resources.PASSWORD_NO_MATCH);
    $.validator.addMethod("validate-confirm-email", validateConfirm, app.resources.EMAIL_NO_MATCH);

    $.validator.messages.required = function ($1, ele, $3) {

        //alert($(ele).attr('class'));

        if($(ele).hasClass('cvn') || $(ele).hasClass('cvv')) {
            return app.resources.NO_CVV;
        }
        else if($(ele).hasClass('owner')) {
            return app.resources.INVALID_OWNERNAME;
        }
        else if($(ele).hasClass('type')) {
            return app.resources.INVALID_CCTYPE;
        }
        else if($(ele).hasClass('number')) {
            return app.resources.INVALID_CCNUMBER;
        }
        else if($(ele).hasClass('month')) {
            return app.resources.INVALID_CCMONTH;
        }
        else if($(ele).hasClass('year')) {
            return app.resources.INVALID_CCYEAR;
        }
        else if($(ele).hasClass('firstName') || $(ele).hasClass('firstname')) {
            return app.resources.NO_FIRSTNAME;
        }
        else if($(ele).hasClass('lastName') || $(ele).hasClass('lastname')) {
            return app.resources.NO_LASTNAME;
        }
        else if($(ele).hasClass('addressid') || $(ele).hasClass('addressid')) {
            return app.resources.INVALID_ADDRESSID;
        }
        else if($(ele).hasClass('address1')) {
            return app.resources.NO_ADDRESS1;
        }
        else if($(ele).hasClass('city')) {
            return app.resources.NO_CITY;
        }
        else if($(ele).hasClass('state')) {
            return app.resources.NO_STATE;
        }
        else if($(ele).hasClass('country')) {
            return app.resources.NO_COUNTRY;
        }
        else if($(ele).hasClass('zip')) {
            return app.resources.NO_ZIP;
        }
        else if($(ele).hasClass('phone')) {
            return app.resources.NO_PHONE;
        }
        else if($(ele).hasClass('friendsname')) {
            return app.resources.FRIENDSNAMEMISSING_ERROR;
        }
        else if($(ele).hasClass('friendsemail')) {
            return app.resources.FRIENDSEMAILMISSING_ERROR;
        }
        else if($(ele).hasClass('yourname')) {
            return app.resources.YOURNAMEMISSING_ERROR;
        }
        else if($(ele).hasClass('youremail')) {
            return app.resources.YOUREMAILMISSING_ERROR;
        }
        else if($(ele).hasClass('email')) {
            return app.resources.NO_EMAIL;
        }
        else if($(ele).hasClass('username')) {
            return app.resources.INVALID_USERNAME;
        }
        else if($(ele).hasClass('membershipnumber')) {
            return app.resources.INVALID_MEMBERSHIPNUMBER;
        }
        else if($(ele).hasClass('passwordInput')) {
            return app.resources.INVALID_PASSWORD;
        }
        else if($(ele).hasClass('salutation')) {
            return "";
        }
        else if($(ele).hasClass('cis-terms-checkbox')) {
            return app.resources.TERMS_NOT_AGREED;
        }
        else if($(ele).hasClass('orgname')) {
            return app.resources.ORGNAME_ERROR;
        }
        else if($(ele).hasClass('orgid')) {
            return app.resources.ORGID_ERROR;
        }
        else if($(ele).hasClass('cis-title')) {
            return app.resources.CISTITLE_ERROR;
        }
        else if($(ele).hasClass('cis-select-title')) {
            return app.resources.CISSELECTTITLE_ERROR;
        }
        else if($(ele).hasClass('fullname')) {
            return app.resources.FULLNAME_ERROR;
        }
        else if($(ele).hasClass('message')) {
            return app.resources.NOMESSAGE_ERROR;
        }
        else if($(ele).hasClass('pincode')) {
            return app.resources.NOPINCODE_ERROR;
        }
        else if($(ele).hasClass('membershipno')) {
            return app.resources.NOMEMBERSHIPNR_ERROR;
        }
        else if($(ele).hasClass('nickname')) {
            return app.resources.NONICKNAME;
        }

        /*switch($(ele).attr('class'))
        {
        case 'cvn':
            return app.resources.NO_CVV;
        case 'cvv':
            return app.resources.NO_CVV;
        case 'owner':
            return app.resources.INVALID_OWNERNAME;
        case 'type':
            return app.resources.INVALID_CCTYPE;
        case 'number':
            return app.resources.INVALID_CCNUMBER;
        case 'month':
            return app.resources.INVALID_CCMONTH;
        case 'year':
            return app.resources.INVALID_CCYEAR;
        default: return "";
        }*/

        return "";
    };

    app.validator = {
        regex    : regex,
        settings : settings,
        init     : function () {

            $("form:not(.suppress)").each(function ()
                    {
                
                 $(this).validate(app.validator.settings);
                
            });

        },
        initForm : function(f) {
            $(f).validate(app.validator.settings);
        },
        showError : function(formId, inputId, errorMsg) {
            var $form  = $('#' + formId);
            if ($form.length > 0) {
                var validator = $form.validate(app.validator.settings);
                var errObj = {};
                errObj[inputId] = errorMsg;
                validator.showErrors(errObj);
            }
        }
    };
}(window.app = window.app || {}, jQuery));

// app.ajax
(function (app, $) {

    var currentRequests = [];
    // request cache

    // sub namespace app.ajax.* contains application specific ajax components
    app.ajax = {
        // ajax request to get json response
        // @param - async - boolean - asynchronous or not
        // @param - url - String - uri for the request
        // @param - data - name/value pair data request
        // @param - callback - function - callback function to be called
        getJson : function (options) {
            options.url = app.util.toAbsoluteUrl(options.url);
            // return if no url exists or url matches a current request
            if(!options.url || currentRequests[options.url]) {
                return;
            }

            currentRequests[options.url] = true;

            // make the server call
            $.ajax({
                dataType : "json",
                url : options.url,
                async : (typeof options.async==="undefined" || options.async===null) ? true : options.async,
                data : options.data || {}
            })
            // success
            .done(function (response) {
                if(options.callback) {
                    options.callback(response);
                }
            })
            // failed
            .fail(function (xhr, textStatus) {
                if(textStatus === "parsererror") {
                    reportError(app.resources.BAD_RESPONSE);
                }
                if(options.callback) {
                    options.callback(null);
                }
            })
            // executed on success or fail
            .always(function () {
                // remove current request from hash
                if(currentRequests[options.url]) {
                    delete currentRequests[options.url];
                }
            });
        },
        // ajax request to load html response in a given container

        // @param - url - String - uri for the request
        // @param - data - name/value pair data request
        // @param - callback - function - callback function to be called
        // @param - target - Object - Selector or element that will receive content
        load : function (options) {
            options.url = app.util.toAbsoluteUrl(options.url);
            // return if no url exists or url matches a current request
            if(!options.url || currentRequests[options.url]) {
                return;
            }

            currentRequests[options.url] = true;
            var type = options.type;
            // make the server call
            $.ajax({
                dataType : "html",
                url : app.util.appendParamToURL(options.url, "format", "ajax"),
                data : options.data,
                type : options.type
            })
            .done(function (response) {
                // success
                if(options.target) {
                    $(options.target).empty().html(response);
                }
                if(options.callback) {
                    options.callback(response);
                }

            })
            .fail(function (xhr, textStatus) {
                // failed
                if(textStatus === "parsererror") {
                    reportError(app.resources.BAD_RESPONSE);
                }
                options.callback(null, textStatus);
            })
            .always(function () {
                // remove current request from hash
                if(currentRequests[options.url]) {
                    delete currentRequests[options.url];
                }
            });
        }
    };
}(window.app = window.app || {}, jQuery));

// app.searchsuggest
(function (app, $) {
    var $searchContainer;
    var $searchForm;
    var $searchField;
    var $searchWrapper;
    var $searchResults;

    var delay       = 300;
    var qlen        = 0;
    var listTotal   = -1;
    var listCurrent = -1;

    function handleArrowKeys(keyCode) {

        switch (keyCode) {
            case 38:
                // keyUp
                listCurrent = (listCurrent <= 0) ? (listTotal - 1) : (listCurrent - 1);
                break;
            case 40:
                // keyDown
                listCurrent = (listCurrent >= listTotal - 1) ? 0 : listCurrent + 1;
                break;
            default:
                // reset
                listCurrent = -1;
                return false;
        }

        $searchResults.children().removeClass("selected").eq(listCurrent).addClass("selected");
        $searchField.val($searchResults.find(".selected").first().data("suggestionText"));

        return true;
    }

    app.searchsuggest = {
        // configuration parameters and required object instances
        init : function (container, defaultValue) {
            // initialize vars
            window.omnitureSearchInit = false;
            var $searchFieldPlaceholder;
            $searchContainer = $(container);
            $searchForm      = $searchContainer.find("form[name='simpleSearch']");
            $searchField     = $searchForm.find("input[name='q']");
            $searchWrapper   = $("div#suggestions-wrapper");
            $searchResults   = $searchWrapper.find("div#suggestions-items");
            $searchFieldPlaceholder = $searchField.attr("placeholder");
            searchInitiated = false; //tracks the status. initialization per page request

            // disable browser auto complete
            $searchField.attr("autocomplete", "off");

            // on blur listener
            $searchField.blur(function () {
                setTimeout(app.searchsuggest.clearResults, 200);
            });

            // on key up listener
            $searchField.keyup(function (e) {

                // get keyCode (window.event is for IE)
                var keyCode = e.keyCode || window.event.keyCode;

                // check and treat up and down arrows
                if(handleArrowKeys(keyCode)) {
                    return;
                }

                // check for an ENTER or ESC
                if(keyCode === 13 || keyCode === 27) {
                    app.searchsuggest.clearResults();
                    return;
                }

                // if is text, call with delay
                setTimeout(function () {
                    app.searchsuggest.suggest( $searchField.val() );
                }, delay);
            });

            // on submit we do not submit the form, but change the window location
            // in order to avoid https to http warnings in the browser
            // only if it's not the default value and it's not empty
            $searchForm.submit(function (e) {
                e.preventDefault();
                var searchTerm = $searchField.val();
                if(searchTerm === defaultValue || searchTerm.length === 0) {
                    return false;
                }
                window.location = app.util.appendParamToURL($(this).attr("action"), "q", searchTerm);
            });
        },

        // trigger suggest action
        suggest : function (lastValue) {

            // get the field value
            var part = $searchField.val();

            // if it's empty clear the resuts box and return
            if(part.length === 0) {
                app.searchsuggest.clearResults();
                return;
            }

            // if part is not equal to the value from the initiated call,
            // or there were no results in the last call and the query length
            // is longer than the last query length, return
            // #TODO: improve this to look at the query value and length
            if((lastValue !== part) || (listTotal === 0 && part.length > qlen)) {
                return;
            }
            qlen = part.length;


            // build the request url
            var reqUrl = app.util.appendParamToURL(app.urls.searchsuggest, "q", part);

            // get remote data as JSON
            $.getJSON(reqUrl, function (data) {
                // get the total of results
                var suggestions = data;
                var ansLength   = suggestions.length;

                listTotal = ansLength;

                $searchWrapper.append("<div id='suggestion-tracking'><\/div>");

                // if there are results populate the results div
                if(ansLength === 0) {
                    app.searchsuggest.clearResults();
                    return;
                }

                $searchResults.empty();
                $.each(suggestions, function(i, e) {
                    var suggestionText = e.suggestion;
                    var suggestionHtml = part + '<span>' + suggestionText.slice(part.length) + '</span>';
                    $searchResults.append(
                        $('<div>')
                            .addClass("suggestion-item")
                            .data("suggestionText", suggestionText)
                            .html(suggestionHtml)
                    );
                });

                $searchWrapper.show();

                $("div.suggestion-item", $searchResults).on("hover", function() {
                    $(this).toggleClass("selected");
                });

                $("div.suggestion-item", $searchResults).on("click", function() {
                    $searchField.val( $(this).data("suggestionText") );
                    app.searchsuggest.clearResults();
                    $searchForm.trigger("submit");
                });
            });
        },

        clearResults : function () {
            $searchWrapper.hide();
            $searchResults.empty();
        }
    };
}(window.app = window.app || {}, jQuery));

// app.searchsuggestResponsive
(function (app, $) {
    var $searchContainer;
    var $searchForm;
    var $searchField;
    var $searchWrapper;
    var $searchResults;

    var delay       = 300;
    var qlen        = 0;
    var listTotal   = -1;
    var listCurrent = -1;

    function handleArrowKeys(keyCode) {

        switch (keyCode) {
            case 38:
                // keyUp
                listCurrent = (listCurrent <= 0) ? (listTotal - 1) : (listCurrent - 1);
                break;
            case 40:
                // keyDown
                listCurrent = (listCurrent >= listTotal - 1) ? 0 : listCurrent + 1;
                break;
            default:
                // reset
                listCurrent = -1;
                return false;
        }

        $searchResults.children().removeClass("selected").eq(listCurrent).addClass("selected");
        $searchField.val($searchResults.find(".selected").first().data("suggestionText"));

        return true;
    }

    app.searchsuggestResponsive = {
        // configuration parameters and required object instances
        init : function (container, defaultValue) {
            // initialize vars
            window.omnitureSearchInit = false;
            var $searchFieldPlaceholder;
            $searchContainer = $(container);
            $searchForm      = $searchContainer.find("form[name='simpleSearch']");
            $searchField     = $searchForm.find("input[name='q']");
            $searchWrapper   = $("div#suggestions-wrapper");
            $searchResults   = $searchWrapper.find("div#suggestions-items");
            $searchFieldPlaceholder = $searchField.attr("placeholder");
            searchInitiated = false; //tracks the status. initialization per page request

            // disable browser auto complete
            $searchField.attr("autocomplete", "off");

            // on blur listener
            $searchField.blur(function () {
                setTimeout(app.searchsuggestResponsive.clearResults, 200);
            });

            // on key up listener
            $searchField.keyup(function (e) {

                // get keyCode (window.event is for IE)
                var keyCode = e.keyCode || window.event.keyCode;

                // check and treat up and down arrows
                if(handleArrowKeys(keyCode)) {
                    return;
                }

                // check for an ENTER or ESC
                if(keyCode === 13 || keyCode === 27) {
                    app.searchsuggestResponsive.clearResults();
                    return;
                }

                // if is text, call with delay
                setTimeout(function () {
                    app.searchsuggestResponsive.suggest( $searchField.val() );
                }, delay);
            });

            // on submit we do not submit the form, but change the window location
            // in order to avoid https to http warnings in the browser
            // only if it's not the default value and it's not empty
            $searchForm.submit(function (e) {
                e.preventDefault();
                var searchTerm = $searchField.val();
                if(searchTerm === defaultValue || searchTerm.length === 0) {
                    return false;
                }
                window.location = app.util.appendParamToURL($(this).attr("action"), "q", searchTerm);
            });
        },

        // trigger suggest action
        suggest : function (lastValue) {

            // get the field value
            var part = $searchField.val();

            // if it's empty clear the resuts box and return
            if(part.length === 0) {
                app.searchsuggestResponsive.clearResults();
                return;
            }

            // if part is not equal to the value from the initiated call,
            // or there were no results in the last call and the query length
            // is longer than the last query length, return
            // #TODO: improve this to look at the query value and length
            if((lastValue !== part) || (listTotal === 0 && part.length > qlen)) {
                return;
            }
            qlen = part.length;


            // build the request url
            var reqUrl = app.util.appendParamToURL(app.urls.searchsuggest, "q", part);

            // get remote data as JSON
            $.getJSON(reqUrl, function (data) {
                // get the total of results
                var suggestions = data;
                var ansLength   = suggestions.length;

                listTotal = ansLength;

                $searchWrapper.append("<div id='suggestion-tracking'><\/div>");

                // if there are results populate the results div
                if(ansLength === 0) {
                    app.searchsuggestResponsive.clearResults();
                    return;
                }

                $searchResults.empty();
                $.each(suggestions, function(i, e) {
                    var suggestionText = e.suggestion;
                    var suggestionHtml = part + '<span>' + suggestionText.slice(part.length) + '</span>';
                    $searchResults.append(
                        $('<div>')
                            .addClass("suggestion-item")
                            .data("suggestionText", suggestionText)
                            .html(suggestionHtml)
                    );
                });

                $searchWrapper.show();

                $("div.suggestion-item", $searchResults).on("hover", function() {
                    $(this).toggleClass("selected");
                });

                $("div.suggestion-item", $searchResults).on("click", function() {
                    $searchField.val( $(this).data("suggestionText") );
                    app.searchsuggestResponsive.clearResults();
                    $searchForm.trigger("submit");
                });
            });
        },

        clearResults : function () {
            $searchWrapper.hide();
            $searchResults.empty();
        }
    };
}(window.app = window.app || {}, jQuery));


// app.searchplaceholder
(function (app, $) {

    function initializeEvents() {

        $('[placeholder]').each(function (){
            var jqThis = $(this),
            placeholder = jqThis.attr("placeholder");

            jqThis.focus(function () {
                if (jqThis.val() == placeholder) {
                    jqThis.removeClass('placeholder').val('');
                    jqThis.attr('placeholder', '');
                }
            }).blur(function () {
                if (jqThis.val() == '' || jqThis.val() == jqThis.attr('placeholder')) {
                    jqThis.addClass('placeholder').val(placeholder);
                    jqThis.attr('placeholder', placeholder);
                }
            });
        });
    }

    app.searchplaceholder = {
        init : function () {

            // This function seems to disable submit buttons in checkout via ie10
            // Is it necessary to cache the placeholder if it's node attribute is supported?

            if($.browser.msie && $.browser.version === '10.0') return;

            initializeEvents();
        }
    };
}(window.app = window.app || {}, jQuery));

// app.ModalMessage
(function (app, $) {

    app.ModalMessage = function (msg) {
        var $dlg = $("<div>")
            .attr("id", "dialog-modalmessage")
            .append($("<div>").addClass("user-confirmation-header").append($("<img>").attr({
                "src" : app.urls.staticPath + "images/sheep-title.png",
                "alt" : ""
            })).append($("<h2>").text(app.resources.USER_CONFIRMATION_MSG)).append($("<div>").addClass("form-field-separator long")))
            .append($("<p>").addClass("instructions").text(msg));

        var onOkCallback     = function(){};
        var onCancelCallback = function(){};

        if ((arguments.length > 1) && (typeof arguments[1] === "function")) {
            onOkCallback = arguments[1];
        }

        if ((arguments.length > 2) && (typeof arguments[2] === "function")) {
            onCancelCallback = arguments[2];
        }

        app.dialog.create({
            target  : $dlg,
            options : {
                width   : "450",
                height  : "auto",
                open    : function(event, ui) {
                    // Focus Cancel button
                    $(this).closest(".ui-dialog")
                        .find(".ui-button:last")
                        .focus();
                },
                create  : function() {},
                buttons : {
                    "Ok"     : function() {
                        onOkCallback();
                        $(this).dialog("close");
                    },
                    "Cancel" : function() {
                        onCancelCallback();
                        $(this).dialog("close");
                    }
                },
                close   : function(event, ui) {
                    $(this).dialog("destroy").remove();
                }
            }
        }).dialog("open");

        // Automatically close dialogs if a customer clicks outside them
        $(".ui-widget-overlay").on("click", function() {
            $('.ui-dialog').remove()
        });
    };
}(window.app = window.app || {}, jQuery));


// app.Newsletter
(function (app, $) {
    function bindEvents($selector) {
        /* Registered - Subscribed */
        if ($selector.find("div#emailsignup-existingreg-dlgstep1").size() > 0) {
            $selector.on("click", "div#emailsignup-existingreg-dlgstep1 a.emailsignup-dlgbtn-continueshopping", function(e) {
                if ($selector.hasClass("newslettersubscribe-desktop")) {
                    $selector.dialog("close");
                }
                else {
                    window.location.href = app.urls.homePageUrl;
                }

                e.preventDefault();
            });
        }

        /* Registered - Unsubscribed */
        else if ($selector.find("div#emailsignup-newreg-dlgstep1").size() > 0) {

            var emailAddressData = $selector.find("div#emailsignup-newreg-dlgstep1").data("emailAddress");
            var emailAddress     = ((typeof emailAddressData !== "undefined") && (emailAddressData.length > 0)) ? emailAddressData : "";
            $selector.find("div#emailsignup-newreg-dlgstep1").find("span.email-address").html(emailAddress);

            $selector.on("click", "div#emailsignup-newreg-dlgstep1 button.emailsignup-dlgbtn-continueshopping", function(e) {
                if ($selector.hasClass("newslettersubscribe-desktop")) {
                    $selector.dialog("close");
                }
                else {
                    window.location.href = app.urls.homePageUrl;
                }

                e.preventDefault();
            });

            $selector.on("click", "div#emailsignup-newreg-dlgstep1 button.emailsignup-dlgbtn-submit", function(e) {
                var $dlgStep1 = $selector.find("div#emailsignup-newreg-dlgstep1");
                var zipCode   = $dlgStep1.find("input#email-signup-dlginput-zip").val();
                var mail1st   = $dlgStep1.find("input#mail1stsubscription").is(":checked") ? 'Y' : 'N';
                var mail2nd   = $dlgStep1.find("input#mail2ndsubscription").is(":checked") ? 'Y' : 'N';
                var mail3rd   = $dlgStep1.find("input#mail3rdsubscription").is(":checked") ? 'Y' : 'N';

                $selector.find("div#emailsignup-newreg-dlgstep1").hide();
                $selector.find("div#emailsignup-newreg-dlgstep1loading").show();

                $.ajax({
                    type     : "POST",
                    url      : app.urls.newsletterUpdateSubscriptions,
                    data     : {
                        email               : emailAddress,
                        zipCode             : zipCode,
                        mail1stSubscription : mail1st,
                        mail2ndSubscription : mail2nd,
                        mail3rdSubscription : mail3rd
                    },
                    dataType : "json",
                    success  : function() {
                        $selector.find("div#emailsignup-newreg-dlgstep1loading").hide();
                        $selector.find("div#emailsignup-newreg-dlgstep2").show();
                    }
                });

                e.preventDefault();
            });

            $selector.on("click", "div#emailsignup-newreg-dlgstep2 a.emailsignup-dlgbtn-continueshopping", function(e) {
                if ($selector.hasClass("newslettersubscribe-desktop")) {
                    $selector.dialog("close");
                }
                else {
                    window.location.href = app.urls.homePageUrl;
                }

                e.preventDefault();
            });

            jQuery.CustomFormElements();
        }

        /* Unregistered - Subscribed */
        else if ( $selector.find("div#emailsignup-existingunreg-dlgstep1").size() > 0 ) {
            var emailAddressData = $selector.find("div#emailsignup-existingunreg-dlgstep1").data("emailAddress");
            var emailAddress     = ((typeof emailAddressData !== "undefined") && (emailAddressData.length > 0)) ? emailAddressData : "";

            var $dlgStep2 = $selector.find("div#emailsignup-existingunreg-dlgstep2");
            $dlgStep2.find("div.e-mail span.value").html(emailAddress);
            $dlgStep2.find("input#dwfrm_profile_customer_email").val(emailAddress);
            $dlgStep2.find("input#dwfrm_profile_customer_emailconfirm").val(emailAddress);
            $dlgStep2.find("input#dwfrm_profile_emailsignup_showThankYouModal").val("Y");
            $dlgStep2.find("input#dwfrm_profile_emailsignup_refererUrl").val(window.location.href);

            $selector.on("click", "div#emailsignup-existingunreg-dlgstep1 a.emailsignup-dlgbtn-continueshopping", function(e) {
                if ($selector.hasClass("newslettersubscribe-desktop")) {
                    $selector.dialog("close");
                }
                else {
                    window.location.href = app.urls.homePageUrl;
                }

                e.preventDefault();
            });

            $selector.on("click", "div#emailsignup-existingunreg-dlgstep1 a.emailsignup-dlgbtn-createanaccount", function(e) {
                $selector.find("div#emailsignup-existingunreg-dlgstep1").hide();
                $selector.find("div#emailsignup-existingunreg-dlgstep2").show();
                e.preventDefault();
            });
            
            /* Unregistered - Unsubscribed */
        } else if ($selector.find("div#emailsignup-newunreg-dlgstep1").size() > 0) {
            var emailAddressData = $selector.find("div#emailsignup-newunreg-dlgstep1").data("emailAddress");
            var emailAddress     = ((typeof emailAddressData !== "undefined") && (emailAddressData.length > 0)) ? emailAddressData : "";
            var $dlgStep1        = $selector.find("div#emailsignup-newunreg-dlgstep1");
            var $dlgStep3        = $selector.find("div#emailsignup-newunreg-dlgstep3");

            $selector.find("div#emailsignup-newunreg-dlgstep1").find("span.email-address").html(emailAddress);

            $selector.on("click", "div#emailsignup-newunreg-dlgstep1 button.emailsignup-dlgbtn-continueshopping", function(e) {
                if ($selector.hasClass("newslettersubscribe-desktop")) {
                    $selector.dialog("close");
                }
                else {
                    window.location.href = app.urls.homePageUrl;
                }

                e.preventDefault();
            });

            $selector.on("click", "div#emailsignup-newunreg-dlgstep1 button.emailsignup-dlgbtn-submit", function(e) {
                var zipCode   = $dlgStep1.find("input#email-signup-dlginput-zip").val();
                var mail1st   = $dlgStep1.find("input#mail1stsubscription").is(":checked") ? 'Y' : 'N';
                var mail2nd   = $dlgStep1.find("input#mail2ndsubscription").is(":checked") ? 'Y' : 'N';
                var mail3rd   = $dlgStep1.find("input#mail3rdsubscription").is(":checked") ? 'Y' : 'N';

                $selector.find("div#emailsignup-newunreg-dlgstep1").hide();
                $selector.find("div#emailsignup-newunreg-dlgstep1loading").show();

                $.ajax({
                    type     : "POST",
                    url      : app.urls.newsletterUpdateSubscriptions,
                    data     : {
                        email               : emailAddress,
                        zipCode             : zipCode,
                        mail1stSubscription : mail1st,
                        mail2ndSubscription : mail2nd,
                        mail3rdSubscription : mail3rd
                    },
                    dataType : "json",
                    success  : function() {
                        $selector.find("div#emailsignup-newunreg-dlgstep1loading").hide();
                        $selector.find("div#emailsignup-newunreg-dlgstep2").show();
                    }
                });

                e.preventDefault();
            });

            $selector.on("click", "div#emailsignup-newunreg-dlgstep2 button.emailsignup-dlgbtn-continueshopping", function(e) {
                if ($selector.hasClass("newslettersubscribe-desktop")) {
                    $selector.dialog("close");
                }
                else {
                    window.location.href = app.urls.homePageUrl;
                }

                e.preventDefault();
            });

            $selector.on("click", "div#emailsignup-newunreg-dlgstep2 button.emailsignup-dlgbtn-createanaccount", function(e) {
                $dlgStep3.find("div.e-mail span.value").html(emailAddress);
                $dlgStep3.find("input#dwfrm_profile_customer_email").val(emailAddress);
                $dlgStep3.find("input#dwfrm_profile_customer_emailconfirm").val(emailAddress);
                $dlgStep3.find("input#dwfrm_profile_customer_zip").val(
                    $dlgStep1.find("input#email-signup-dlginput-zip").val()
                );
                $dlgStep3.find("input#dwfrm_profile_emailsignup_showThankYouModal").val("Y");
                $dlgStep3.find("input#dwfrm_profile_emailsignup_refererUrl").val(window.location.href);

                app.validator.initForm( $dlgStep3.find("form#RemoteRegistrationForm") );

                $selector.find("div#emailsignup-newunreg-dlgstep2").hide();
                $selector.find("div#emailsignup-newunreg-dlgstep3").show();

                e.preventDefault();
            });

            $selector.on("change", "div#emailsignup-newunreg-dlgstep3 select#esmodal_birthday_day", function(e) {
                if ($dlgStep3.find("select#esmodal_birthday_month option:selected").val() == "") {
                    $dlgStep3.find("select#esmodal_birthday_month").addClass("required");
                }
            });

            $selector.on("click", "div#emailsignup-newunreg-dlgstep3 button.cancel", function(e) {
                if ($selector.hasClass("newslettersubscribe-desktop")) {
                    $selector.dialog("close");
                }
                else {
                    window.location.href = app.urls.homePageUrl;
                }

                e.preventDefault();
            });

            jQuery.CustomFormElements();
            app.validator.initForm( $dlgStep3.find("form#RemoteRegistrationForm") );
            app.CustomSelects.changeThem();
        }

        if ($selector.find("div#emailsignup-existingunreg-dlgstep1").size() > 0  || $selector.find("div#emailsignup-newunreg-dlgstep1").size() > 0) {
            var selDay = jQuery('select#esmodal_birthday_day')[0];

            var changeOverlayDayInSelect = function(month){
                if(parseInt(month, 10)==0) {
                    selDay.options.length = 0;
                    selDay.options[0] = new Option('Day');
                }
                else {
                    var days = [31,29,31,30,31,30,31,31,30,31,30,31];
                    var mDays = (days[parseInt(month, 10)-1]);
                    selDay.options.length = 0;
                    for (var i=0; i<mDays; i++){
                        selDay.options[i] = new Option(i+1);
                    }
                }
                jQuery('select#esmodal_birthday_day').trigger("liszt:updated");
            };

            $selector.on("change", "select#esmodal_birthday_month" , function(e) {
                changeOverlayDayInSelect(jQuery('select#esmodal_birthday_month').val());
            });
        }
    }

    function validateNoPOBox(value, el) {
        var noPOBox = regex.nopobox.test($.trim(value));
        return noPOBox;
    }

    function validateAndMapAddressChars(value, el) {
        var jqEl = jQuery(el);
        jqEl.val(jqEl.val().replace(/[À??ÂÃÄÅÆ]/g, 'A'));
        jqEl.val(jqEl.val().replace(/[Ç]/g, 'C'));
        jqEl.val(jqEl.val().replace(/[ÈÉÊË]/g, 'E'));
        jqEl.val(jqEl.val().replace(/[Ì??Î??]/g, 'I'));
        jqEl.val(jqEl.val().replace(/[??]/g, 'D'));
        jqEl.val(jqEl.val().replace(/[Ñ]/g, 'N'));
        jqEl.val(jqEl.val().replace(/[ÒÓÔÕÖ]/g, 'O'));
        jqEl.val(jqEl.val().replace(/[ÚÛÜ]/g, 'U'));
        jqEl.val(jqEl.val().replace(/[??]/g, 'Y'));
        jqEl.val(jqEl.val().replace(/[àáâãäåæ]/g, 'a'));
        jqEl.val(jqEl.val().replace(/[Ç]/g, 'c'));
        jqEl.val(jqEl.val().replace(/[èéêë]/g, 'e'));
        jqEl.val(jqEl.val().replace(/[ìíîï]/g, 'i'));
        jqEl.val(jqEl.val().replace(/[ñ]/g, 'n'));
        jqEl.val(jqEl.val().replace(/[òóôõöø]/g, 'o'));
        jqEl.val(jqEl.val().replace(/[ùúûü]/g, 'u'));
        jqEl.val(jqEl.val().replace(/[ýÿ]/g, 'y'));
    }

    function initializeEvents() {
    	if ( app.page.ns === "newsletterMobile" ) {
            bindEvents( $("div.newslettersubscribe-mobile") );
        }

        $(document).on("submit", "form#signup-form", function(event) {
            var reExp   = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
            var email   = $.trim($('input#signup-email').val());
            var country   = $.trim($('#signup-country').val());
            var isValid = reExp.test(email);
            if(country=='') isValid = false;
            
            if ( isValid ) {
            	if ( !(app.responsive && app.responsive.isMobileLayout()) ) {
                    var $dlg = $("<div>")
                        .attr("id", "dialog-newsletter")
                        .addClass("newslettersubscribe-desktop")
                        .html( $("<div>").addClass("loading") );

                    $('div#signup-error').html("");
                    $('input#signup-email').val("")

                    $.scrollTo(0, 400, {onAfter:function() {
                        app.dialog.create({
                            target  : $dlg,
                            options : {
                                width       : "510",
                                height      : "auto",
                                position    : ["center", 40],
                                dialogClass : "dialog-newsletter",
                                open        : function(event, ui) {
                                    $.ajax({
                                        type     : "POST",
                                        url      : app.urls.newsletter,
                                        data     : {"signup-email": email, "signup-country":country},
                                        dataType : "html",
                                        success  : function(data) {
                                            $dlg.html( data );
                                            bindEvents( $dlg );
                                        },
                                        failure  : function(data) {
                                            reportError(app.resources.SERVER_ERROR);
                                        }
                                    });
                                },
                                close : function(event, ui) {
                                    $(this).dialog("destroy").remove();
                                }
                            }
                        }).dialog("open");
                    }});

                    event.preventDefault();
                }
            }
            else {
            	if(country=='') {
            		$('div#signup-error').html(app.resources.NEWSLETTER_COUNTRY_INVALID);
            	} else {
            		$('div#signup-error').html(app.resources.NEWSLETTER_EMAIL_INVALID);
            	}
                app.Omniture.reportExistingErrors("client");
                event.preventDefault();
            }
        });
    }

    app.Newsletter = {
        init : function () {
            initializeEvents();
        }
    };
}(window.app = window.app || {}, jQuery));


// app.TaskQueueManager
(function (app, $) {
    var TaskQueue = new Array();

    app.TaskQueueManager = {
        setTasks : function(Tasks) {
            if (Tasks instanceof Array) {
                $.each(Tasks, function(index, Task) {
                    var isObject = ((Task != null) && (typeof Task === "object"));
                    var isValid  = (isObject && ("Id" in Task) && (typeof Task.Id === "string"));
                    if (isValid) {
                        TaskQueue.push(Task);
                    }
                });
            }
        },

        init : function() {
            $.each(TaskQueue, function(index, Task) {
                if (Task.Id === "esThankYouDialog") {
                    var $dlg = $("<div>")
                        .attr("id", "dialog-newsletter")
                        .html( $("<div>").addClass("loading") );

                    app.dialog.create({
                        target  : $dlg,
                        options : {
                            width       : "510",
                            height      : "auto",
                            position    : ["center", 40],
                            dialogClass : "dialog-newsletter email-signup-unreg-thankyou",
                            open        : function(event, ui) {
                                $.ajax({
                                    type     : "GET",
                                    url      : app.util.appendParamToURL(app.urls.pageInclude, "cid", "email-signup-unreg-thankyou"),
                                    dataType : "html",
                                    success  : function(data) {
                                        var $html = $(data);

                                        $html.on("click", "button.emailsignup-dlgbtn-continueshopping", function(e) {
                                            $dlg.dialog("close");
                                            e.preventDefault();
                                        });

                                        $dlg.html($html);
                                    }
                                });
                            },
                            close : function(event, ui) {
                                $(this).dialog("destroy").remove();
                                window.location.href = Task.RefererUrl;
                            }
                        }
                    }).dialog("open");
                }
                else if (Task.Id === "qvShowGuide") {
                    $.ajax({
                        type     : "POST",
                        url      : app.urls.pageInclude,
                        data     : {cid: Task.GuideId, servicemenu: "0"},
                        dataType : "html",
                        success  : function(data) {
                            app.dialog.create({
                                target  : $("<div>").attr("id", "dialog-info").html(data),
                                options : { width: "729", height: "609" }
                            }).dialog("open");
                        },
                        failure  : function(data) {
                            reportError(app.resources.SERVER_ERROR);
                        }
                    });
                }
            });
        },

        initSavedPreferences : function() {
            $.each(TaskQueue, function(index, Task) {
                if (Task.Id === "spThankYouDialog") {
                    app.SavedPreferences.savePreferencesDialog({
                        c : Task.Category,
                        f : Task.Fit,
                        s : Task.Size,
                        u : Task.RefererUrl
                    });
                }
            });
        }
    };
}(window.app = window.app || {}, jQuery));


// app.ContactUs
(function (app, $) {

    function initializeEvents() {
        $('#contact-us-form').on("submit", function(event) {
            event.preventDefault();

            var isValid   = $(this).valid();
            var submitURL = $(this).attr("action");

            //contactus validation added

            if($("#dwfrm_contactus_message") != null && $("#dwfrm_contactus_message").val() == "")
            {
                $("#dwfrm_contactus_message ~ span:first").css('font-weight','bold').text("Please enter a message");
            }

            //contactus validation added

            if($("#dwfrm_contactus_message") != null && $("#dwfrm_contactus_message").val() == "")
            {
                $("#dwfrm_contactus_message ~ span:first").css('font-weight','bold').text("Please enter a message");
            }

            if ( isValid ) {
                $.ajax({
                    type     : "POST",
                    url      : submitURL,
                    data     : {
                        dwfrm_contactus_firstname : $("#dwfrm_contactus_firstname").val(),
                        dwfrm_contactus_lastname  : $("#dwfrm_contactus_lastname") .val(),
                        dwfrm_contactus_email     : $("#dwfrm_contactus_email")    .val(),
                        dwfrm_contactus_subject   : $("#dwfrm_contactus_subject")  .val(),
                        dwfrm_contactus_message   : $("#dwfrm_contactus_message")  .val(),
                        dwfrm_contactus_send      : $("#dwfrm_contactus_send")     .val(),
                        format                    : "ajax"
                    },
                    dataType : "html",
                    success  : function(data) {
                        app.dialog.create({
                            target  : $("<div>").attr("id", "dialog-contact-us").html(data),
                            options : {
                                width: "510",
                                open : function(event, ui) {
                                    var $self = $(this);
                                    setTimeout(function() {
                                        window.location.href = app.urls.homePageUrl;
                                    }, 3000);
                                    /* Close the modal on clicking the overlay */
                                    app.ClickOutsideModal.bindHere();
                                }
                            }
                        }).dialog("open");
                    },
                    failure  : function(data) {
                        reportError(app.resources.SERVER_ERROR);
                    },
                    complete : function() {

                    }
                });
            }
        });
    }

    app.ContactUs = {
        init : function () {
            initializeEvents();
        }
    };
}(window.app = window.app || {}, jQuery));

// jquery extensions
(function ($) {
    // params
    // toggleClass - required
    // triggerSelector - optional. the selector for the element that triggers the event handler. defaults to the child elements of the list.
    // eventName - optional. defaults to 'click'
    $.fn.toggledList = function (options) {
        if (!options.toggleClass) { return this; }

        var list = this;
        function handleToggle(e) {
            e.preventDefault();
            var classTarget = options.triggerSelector ? $(this).parent() : $(this);
            classTarget.toggleClass(options.toggleClass);
            // execute callback if exists
            if (options.callback) { options.callback(); }
        }

        return list.on(options.eventName || "click", options.triggerSelector || list.children(), handleToggle);
    };

    $.fn.syncHeight = function () {

        function sortHeight(a, b) {
            return $(a).height() - $(b).height();
        }

        var arr = $.makeArray(this);
        arr.sort(sortHeight);

        return this.height($(arr[arr.length-1]).height());
    };
}(jQuery));

// general extension functions
(function () {
    String.format = function() {
        var s = arguments[0];
        var i,len=arguments.length - 1;
        for (i = 0; i < len; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i + 1]);
        }
        return s;
    };
})();

/**
 * QAS address validation service: Client
 */
(function (app, $) {
    var initialAdd2 = null;

    app.qasUtil = {

        /********************************************************
         * Adjust an address by given apartment number and submit
         ********************************************************/
        adjustApt : function(aptNumber) {
        	var aptString = null;
            var multi = false;
            if( window.form.form.attr("id") == "multiShippingAddresses")  {
                multi = true;
            }

            // Close modal and save if aptNumber is empty
            if(!aptNumber || aptNumber.length == 0) {
                window.form.dialog.dialog('close');
                window.form.form.validate().cancelSubmit = true;
                window.form.form.submit();
            }

            if(initialAdd2 == null && window.form.add2){
                initialAdd2 = window.form.add2.val();
            }

            // Add apartment numer to address line 2
            if(initialAdd2.length > 0) {
                aptString = initialAdd2 + " " + aptNumber;
            } else {
                aptString = aptNumber;
            }
            window.form.add2.val(aptString);

            // Close modal
            window.form.dialog.dialog('close');

            // Resubmit to validate entered value
            if(multi == false) {
                window.form.dialog.dialog('close');
                window.form.form.validate().cancelSubmit = true;
                app.qasUtil.copyShippingToBillingAfterQASValidation();
                window.form.form.submit();
            } else {
                window.app.qasUtil.validateMulti();
            }
        },

        /********************************************************
         * Adjust an address by given street number and submit
         ********************************************************/
        adjustStreet : function(strNumber) {
        	var multi = false;
            if( window.form.form.attr("id") == "multiShippingAddresses")  {
                multi = true;
            }

            // Close modal and save if strNumber is empty
            if(!strNumber || strNumber.length == 0) {
                window.form.dialog.dialog('close');
                window.form.form.validate().cancelSubmit = true;
                app.qasUtil.copyShippingToBillingAfterQASValidation();
                window.form.form.submit();
            }

            // Replace street number
            var oldAdd1 = window.form.add1.val();
            var newAdd1 = strNumber + " " + oldAdd1.replace(/^[0-9]+/,"");
            window.form.add1.val(newAdd1);

            // Close modal
            window.form.dialog.dialog('close');

            // Resubmit to validate entered value
            if(multi == false) {
                window.app.qasUtil.validate();
            }
            else{
                window.app.qasUtil.validateMulti();
            }
        },

        /********************************************************
         * Check if address is a building type
         ********************************************************/
        checkForBldg : function() {
            var bool = false;
            var address = window.form.add1.val()

            if (address == "Business") {bool = true;}
            if (address == "Building") {bool = true;}
            if (address == "Bldg") {bool = true;}
            if (address == "Business Bldg") {bool = true;}
            if (address == "Business Bldg.") {bool = true;}
            if (address == "Business Building") {bool = true;}
            if (address == "Business Complex") {bool = true;}
            if (address == "Business Plaza") {bool = true;}
            if (address == "Immeuble Commercial") {bool = true;}
            if (address == "Apt") {bool = true;}
            if (address == "Apartment") {bool = true;}
            if (address == "Apartment Bldg") {bool = true;}
            if (address == "Apartment Bldg.") {bool = true;}
            if (address == "Apartment Building") {bool = true;}
            if (address == "Immeuble a Appartements") {bool = true;}
            if (address == "Townhomes") {bool = true;}
            if (address == "Townhouses") {bool = true;}

            return bool;
        },

        /********************************************************
         * Parse a QAS webservice address string and returns
         * it as JSON object
         ********************************************************/
        parseAddress : function(address) {

            var jsonAddress = new Object();
            var regExp = new RegExp("[A-Z]{2}");

            jsonAddress.add1 = address.substring(0, address.indexOf(','));
            jsonAddress.city = address.substring(address.indexOf(',')+2, address.indexOf((regExp.exec(address))[0])-1);
            jsonAddress.state = (regExp.exec(address))[0];
            jsonAddress.zip = address.substring(address.indexOf((regExp.exec(address))[0])+3, address.lastIndexOf(','));
            jsonAddress.country = address.substring(address.lastIndexOf(',')+2, address.length);

            // DW forms expect two letter format. Fix it for US
            if(jsonAddress.country == 'USA')
                jsonAddress.country = 'US';

            return jsonAddress;
        },

        /**
         * Replaces the address in the current form with the given one and submits it and closes the dialog.<br>
         * Important: window.form needs to be set.
         */
        useAddress : function(address, multi) {
            if(multi == null)
                multi = false;

            address = JSON.parse(unescape(address));

            // Fix country format
            if(address.country == 'USA') { address.country = 'US'; }
            if(address.country == 'CAN') { address.country = 'CA'; }

            window.form.add1.val( address.street );
            window.form.add2.val( address.add2 );
            window.form.city.val( address.city );
            window.form.state.val( address.state );
            window.form.zip.val( address.postalCode );
            window.form.country.val( address.country );

            initialAdd2 = null;

            if(multi == false) {
            	app.qasUtil.copyShippingToBillingAfterQASValidation();
            	window.form.form.submit();
            } else {
                $.post(window.form.multiPipeline, window.form.form.serialize(), function(data2) {
                    $('#multiShippingModal').html(data2);
                });
            }

            window.form.dialog.dialog('close');
        },

        /**
         * Use address as entered. Submits the form and closes the dialog.<br>
         * Important: window.form needs to be set.
         */
        useEntered: function(multi) {
            
            /* This func will save selected, registered addresses on invoke
             * and returns a method to repopulate with the cached values
             */
            function cacheRegisteredAddresses() {
                var selects = this, cache = [];

                selects.each(function() {
                    cache.push($(this).val());
                });

                function update() {
                    for(c in cache) { 
                        if(cache[c] === 'createnewaddress') continue;
                        $(selects[c]).val(cache[c]); 
                    }
                }

                return { update: update };
            }

            if(multi == null)
                multi = false;

            initialAdd2 = null;

            if(multi == false) {
                window.form.form.submit();
            } else {
                var cRA = cacheRegisteredAddresses.call($('#multiShippingModal select.addressselectbox'));
                $.post(window.form.multiPipeline, window.form.form.serialize(), function(data2) {
                    $('#multiShippingModal').html(data2);
                    cRA.update();
                });
            }

            window.form.dialog.dialog('close');
        },

        /**
         * Sends the data to the server and validates it. A dialog is presented to the user in case of an inaccurate address.<br>
         * Important: window.form needs to be set.
         */
        validate : function() {

            // Check is QAS is enabled in custom preferences
            if( !app.constants.QAS_ENABLED || window.form.form.hasClass("noqas") ) {
                window.form.form.validate().cancelSubmit = true;
                window.form.form.submit();
                return true;
            }

            // Make sure the validation is skipped for non-US/CA
            if(window.form.country.val() != "US" && window.form.country.val() != "CA") {
                window.form.form.validate().cancelSubmit = true;
                window.form.form.submit();
                return true;
            }

            // Check if waiting message is present
            if (jQuery(".address-is-validating").length == 0){
                //not present so let's build it
                jQuery(document.body).append('<div class="address-is-validating" style="display: none;">');
                jQuery(".address-is-validating").append(jQuery('<div class="validationlogo"> <div class="blacklamb">&nbsp;</div> <div class="address-validation-title">'+app.resources.QAS_WAITING_TITLE1+' <span class="checkbox-item">&nbsp;</span> '+app.resources.QAS_WAITING_TITLE2+'</div> <div class="ruler">&nbsp;</div> </div> <div class="address-validation-text">'+app.resources.QAS_WAITING_TEXT+'</div>'));
            }

            // Determine the used form
            var formName = window.form.add1.attr('id').substring(6, window.form.add1.attr('id').length);
            formName = formName.substring(0, formName.indexOf('_'));

            // Build JSON object
            var address = new Object();
            address.add1    = window.form.add1.val();
            address.add2    = window.form.add2.val();
            address.city    = window.form.city.val();
            address.state   = window.form.state.val();
            address.zip     = window.form.zip.val();
            address.country = window.form.country.val();

            //the following call will take a while, so show the waiting modal window,
            //that also prevents the customer from clicking on the button multiple times, thus starting additional calls
            jQuery(".address-is-validating").dialog({modal: true, dialogClass: 'dialog-without-titlebar', width: 500, height: 240});

            // POST to server
            jQuery.post(window.form.pipeline, address, function(data) {

                // Process result
                data = JSON.parse(data);
                switch(data.verificationLevel) {

                    // Address verified - Submit form
                    case 'Verified':
                        jQuery(".address-is-validating").dialog('close');
                        window.form.form.validate().cancelSubmit = true;
                        window.form.form.submit();
                        break;

                    // Service error - Submit form
                    case 'error':
                        jQuery(".address-is-validating").dialog('close');
                        window.form.form.validate().cancelSubmit = true;
                        window.form.form.submit();
                        break;

                    // Valid feedback - Render dialog
                    default:
                        data.formName = formName;
                        jQuery(".addressModal").remove();
                        var info = document.createElement("div");
                        jQuery(info).addClass("addressModal clearfix");
                        jQuery(info).load(window.form.dTempl, {data: JSON.stringify(data)}, function() {
                            // call is done, let's close the waiting window and show the other one.
                            jQuery(".address-is-validating").dialog('close');
                            // now show the fresh loaded one
                            window.form.dialog = jQuery(info);
                            jQuery(info).dialog({
                                modal: true,
                                minWidth: 730,
                                minHeight: 480,
                                dialogClass:"resetpassword",
                                open: function (ev, ui) {
                                    if (app.responsive && app.responsive.isMobileLayout()) {
                                        var $thisDialog = $(this).parent();
                                        var thisDialogHeight = $thisDialog.height();
                                        if (thisDialogHeight > $(window).height()) {
                                            var whereTo = $thisDialog.offset().top;
                                            $.scrollTo(whereTo);
                                        }
                                    }
                                },
                                close: function (ev, ui) {
                                    $(this).dialog("destroy"); $(this).remove();
                                }
                            });
                        });
                        break;
                }
            });
        },

        /**
         * Sends the data to the server and validates it. A dialog is presented to the user in case of an inaccurate address.<br>
         * Adapted for multishipping address validation (AJAX)<br>
         * Important: window.form needs to be set.
         */
        validateMulti : function() {

            // Check is QAS is enabled in custom preferences
            if( !app.constants.QAS_ENABLED ) {
                $.post(window.form.multiPipeline, window.form.form.serialize(), function(data) {
                    $('#multiShippingModal').html(data);
                });
                return true;
            }

            // Make sure the validation is skipped for non-US/CA
            if(window.form.country.val() != "US" && window.form.country.val() != "CA") {
                $.post(window.form.multiPipeline, window.form.form.serialize(), function(data) {
                    $('#multiShippingModal').html(data);
                });
                return true;
            }

            //check if waiting message is present
            if (jQuery(".address-is-validating").length == 0){
                //not present so let's build it
                jQuery(document.body).append('<div class="address-is-validating" style="display: none;">');
                jQuery(".address-is-validating").append(jQuery('<div class="validationlogo"> <div class="blacklamb">&nbsp;</div> <div class="address-validation-title">'+app.resources.QAS_WAITING_TITLE1+' <span class="checkbox-item">&nbsp;</span> '+app.resources.QAS_WAITING_TITLE2+'</div> <div class="ruler">&nbsp;</div> </div> <div class="address-validation-text">'+app.resources.QAS_WAITING_TEXT+'</div>'));
            }

            // Determine the used form
            var formName = window.form.add1.attr('id').substring(6, window.form.add1.attr('id').length);
            formName = formName.substring(0, formName.indexOf('_'));

            // Build JSON object
            var address = new Object();
            address.add1    = window.form.add1.val();
            address.add2    = window.form.add2.val();
            address.city    = window.form.city.val();
            address.state   = window.form.state.val();
            address.zip     = window.form.zip.val();
            address.country = window.form.country.val();

            //the following call will take a while, so show the waiting modal window,
            //that also prevents the customer from clicking on the button multiple times, thus starting additional calls
            jQuery(".address-is-validating").dialog({modal: true, dialogClass: 'dialog-without-titlebar', width: 500, height: 240});

            // POST to server
            jQuery.post(window.form.pipeline, address, function(data) {

                // Process result
                data = JSON.parse(data);
                switch(data.verificationLevel) {

                    // Address verified - Submit form
                    case 'Verified':
                        jQuery(".address-is-validating").dialog('close');
                        $.post(window.form.multiPipeline, window.form.form.serialize(), function(data2) {
                            $('#multiShippingModal').html(data2);
                        });
                        break;

                    // Service error - Submit form
                    case 'error':
                        jQuery(".address-is-validating").dialog('close');
                        $.post(window.form.multiPipeline, window.form.form.serialize(), function(data2) {
                            $('#multiShippingModal').html(data2);
                        });
                        break;

                    // Valid feedback - Render dialog
                    default:
                        jQuery(".address-is-validating").dialog('close');
                        data.formName = formName;
                        var info = document.createElement("div");
                        jQuery(info).load(window.form.dTempl, {data: JSON.stringify(data)}, function() {
                            window.form.dialog = jQuery(info);
                            jQuery(info).dialog({ modal: true, minWidth: 730, minHeight: 480, dialogClass:"resetpassword", close: function (ev, ui) { $(this).dialog("destroy"); $(this).remove(); }});
                        });
                        break;
                }
            });
        },
        
        /**
         * Copy shipping updates to billing
         */
        copyShippingToBillingAfterQASValidation : function() {
        	if($(app.forms.singleshipping.shippingAddress.useAsBillingAddress).attr('checked') === true || $(app.forms.singleshipping.shippingAddress.useAsBillingAddress).attr('checked')) {
        		    var billingAddress1     = $('#dwfrm_billing_billingAddress_addressFields_address1');
        	        var billingAddress2     = $('#dwfrm_billing_billingAddress_addressFields_address2');
        	        var billingCity         = $('#dwfrm_billing_billingAddress_addressFields_city');
        	        var billingZip          = $('#dwfrm_billing_billingAddress_addressFields_zip');
        	        var billingCountry      = $('#dwfrm_billing_billingAddress_addressFields_country');
        	        var billingState       = $('#dwfrm_billing_billingAddress_addressFields_states_state');
        	        
        	        // Copy any existing values initially from shipping to billing
        	        ////////////////////////////////////////////////////////////////    
        	        billingAddress1.val(    window.form.add1.val()   );
        	        billingAddress2.val(    window.form.add2.val()   );
        	        billingCity.val(        window.form.city.val()   );
        	        billingZip.val(         window.form.zip.val()        );
        	        billingCountry.val(     window.form.country.val()    );
        	        billingState.val(      window.form.state.val()     );
			}
        },

        /**
         * Scrolls the current page view to the top most error field that was marked invalid
         * during the process of validation. If possible, after that the focus is set to that field.
         */
        scrollToFirstErrorField : function() {
            // try to get label assigned to the top most error marked input
            // if no label could be found, fall back to the input itself
            var label = $('input.error, div.chzn-container.error').first().prevAll('label');
            var input = $('input.error, div.chzn-container.error').first();
            var element = label[0] ? label : input;

            // scroll to detected element
            if(element.length > 0) {
                if (element && element.offset && element.offset.top) {
                    $('html, body').animate(
                                    {
                                        scrollTop : (((element.offset().top - 10) > 0) ? (element.offset().top - 10) : 0)
                                    }, 500);
            }
            // set the focus on this element, if it is visible
            // note! visible check needed for some IE versions
                if (input.is(':visible')) {
                    input.focus();
                }
            }

            // set the focus on this element, if it is visible
            // note! visible check needed for some IE versions
            if (input.is(':visible')) { input.focus(); }
        }
    };

}(window.app = window.app || {}, jQuery));


/*
 *  Function to change a state select box according to a country select
 */
app.stateChanger = (function() {

    var regions = { 
            US : ["","AL","AK","AA","AE","AP","AZ","AR","CA","CO","CT","DE","DC","FL","GA","GU","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VT","VI","VA","WA","WV","WI","WY",""],
            CA : ["","AB","BC","MB","NB","NL","NT","NS","NU","ON","PE","QC","SK","YT"],
            OTHER : ["", "OTHER"]
        },
        select = {}, cached = {};

    /*
     *  Initialize the desired state select
     *  Caching "select" node and "options" in clojure
     */
    function init(name) {           
        if(name === undefined) return;
        var _select = (name.jquery) ? name : $(name);
        if(_select[0] == undefined) return;
        else {
            n = ('name' in _select[0]) ? _select[0].name : _select;
        }
        if(select[n] === undefined) select[n] = _select;
        if(cached[n] === undefined) cached[n] = {};
    }

    /*
    *   Caching the node options in "cached" variable
    *   before removing them
    *
    */

    function cache(repo, erase) {

        erase = erase || 0;

        var opts = this.find('option'),
            len = opts.length,
            name = this.attr('name'),
            contents = {};

        while(len > 0) {
            var opt = opts[len - 1];
            contents[opt.value] = opt;
            if(erase) $(opt).remove();
            len--;
        }
        $.extend(repo[name], contents);
    }

    /*
    *   The select should be updated if cached in the clojure
    *   or if the select is in sync with another select
    *
    *   hasInSync -> ex. "Use My Shipping Address for MY BILLING"
    */

    function shouldUpdate(select_name, hasInSync) {

        var selection = (this.attr('name') === select_name);
        if(hasInSync && inSync()) { return true; } else { return selection; }
    }

    /*
     *  Changes the state select based on the country code in the country select
     */
    function update(_select, hasInSync) {

        hasInSync = hasInSync || 0;
        _select = $(_select);

        /*
        *   Check the value of the select and find the corresponding 
        *   property in the region object
        */

        var region = (function(s){ 
                var val = $(s).val();
                return (val in regions) ? regions[val] : regions.OTHER;
            })(this);

        /*
        *   Iterate through cached select objects to verfiy if the called select 
        *   should be updated. 
        */

        $.each(select, function(name, value) {

            if(shouldUpdate.call(_select, name, hasInSync)) {

                // decide to use iterated, cached node or node argument
                var selfie = multiShipHotFix.call(this) || _select;

                // see cache()
                cache.call(selfie, cached, true); 

                var _cached = cached[name], s_len = region.length;

                // remove obsolete error messages
                $('.error[for=' + name + ']').remove(); 

                while(s_len > 0) {

                    var _value = region[s_len - 1],
                        opt = selfie.find('option[value=' + _value + ']');

                    // if select doesn't contain option, then append it
                    if(opt.length < 1 && _value in _cached) selfie.prepend(_cached[_value]);

                    s_len--;
                }

                // update chosen object options
                // chosen.jQuery.js

                selfie.trigger("liszt:updated");
            }
        });
    }

    /*
    *   A hot fix to support the multishipping functionality. Since each added address uses the same
    *   form for edit, we must use the node argument instead of it's cached self since adding and removing
    *   the form to the DOM creates new registered nodes 
    */

    function multiShipHotFix() {
        return /multishipping/g.test(this.attr('name').toLowerCase()) ? undefined : this;
    }

    function inSync() {
        return ('shippingToBillingAddressSync' in window) ? window.shippingToBillingAddressSync : true;
    }

    return {
        init: init,
        updateStateOptions: update
    }

})();


jQuery(document).ready(function() {
    // Initialize app
    app.init();
    $(".ui-dialog-content").dialog("option", "position", "center");
    
});

//app.OrderHistory
(function (app, $) {

    function expandOrder(orderline) {

        collapseOrders();
        orderline.addClass('expanded');

        jQuery('.order-history-actionline', orderline).slideDown(250);
        jQuery('.order-history-items-expanded', orderline).slideDown(500);
        jQuery('.order-history-orderdetails', orderline).slideDown(500);
    }

    function collapseOrders() {
        var expandedOrder = jQuery('.orderhistory .order-line.expanded');

        jQuery('.order-history-actionline', expandedOrder).slideUp(250);
        jQuery('.order-history-items-expanded', expandedOrder).slideUp(500);
        jQuery('.order-history-orderdetails', expandedOrder).slideUp(500);
        
        expandedOrder.removeClass('expanded');
    }

    function initializeEvents() {
        jQuery('.orderhistory .order-history-footer .viewdetails').each(function(){

            if(!this.clickHandler){
                this.clickHandler= true;

                $(this).click(function(event) {
                    var orderId = this.name;

                    if(!$('#'+orderId).length>0){

                        $(this).parents('.order-line').load(app.urls.serenadeGetOrderDetails,'&serenadeOrderId='+orderId ,function(){
                            expandOrder($('#'+orderId).parents('.order-line'));
                            initializeEvents();
                        });
                    }else{
                        expandOrder($('#'+orderId).parents('.order-line'));
                    }
                });
            }
        });
        jQuery('.orderhistory button.trackshipment').bind("click", function(event) {
            window.open($(this).parents('form.trackshipmentform').attr('action'),'_newtab');
        });
        jQuery('.orderhistory button.returnorder').bind("click", function(event) {
            window.open($(this).parents('form.returnorderform').attr('action'),'_newtab');
        });
    }

    app.OrderHistory = {
        init : function () {
            initializeEvents();
            expandOrder(jQuery('.orderhistory .order-line:first'));
        }
    };

    // Show the Canada 65 warning
    app.show65Message = function() {
        var info = document.createElement("div");
        jQuery(info).load(app.urls.checkoutCAProp65Warning, function() {
            jQuery(info).dialog({
                modal: true,
                minWidth: 350,
                minHeight: 480,
                dialogClass: "resetpassword",
                close: function (ev, ui) {
                    $(this).dialog("destroy");
                    $(this).remove();
                }
            });
        });
    };

//app.iesupportedplaceholder
(function (app, $) {
    
    function initializeEventsie() {
        var input = document.createElement("input");
        if(('placeholder' in input)==false) { 
            $('[placeholder]').focus(function() {
                var i = $(this);
                if(i.val() == i.attr('placeholder')) {
                    i.val('').removeClass('placeholder');
                    if(i.hasClass('password')) {
                        i.removeClass('password');
                        this.type='password';
                    }           
                }
            }).blur(function() {
                var i = $(this);    
                if(i.val() == '' || i.val() == i.attr('placeholder')) {
                    if(this.type=='password') {
                        i.addClass('password');
                        this.type='text';
                    }
                    i.addClass('placeholder').val(i.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var i = $(this);
                    if(i.val() == i.attr('placeholder'))
                        i.val('');
                })
            });
        }
    }
    app.iesupportedplaceholder = {
            init : function () {
                initializeEventsie();
            }
        };

}(window.app = window.app || {}, jQuery));


    app.Omniture = {
        /*
         * Link tracking is only active if the custom preference
         * "siteCatalystEnabled" is set to true for the current site.
         */
        init : function() {

            if (!app.siteCatalystEnabled) {
                return;
            }
            // Setup link tracking for category menu content slots.
            // We assume every content slot to be tracked has the following two
            // attributes:
            var $contentSlotElems = $('[data-track-cat][data-track-cslot]');
            $contentSlotElems.each(function() {
                var $slotElem    = $(this);
                var categoryName = $slotElem.attr('data-track-cat');
                var slotNumber   = $slotElem.attr('data-track-cslot') || '';
                var slotContextValue = '';

                // assemble tracking data specific to the slot
                var slotContextKey    = 'cslot_' + (categoryName == "home page" ? "home" : categoryName);
                var slotContextValue  = categoryName + ':slot' + slotNumber;
                var slotLinkTrackVars = 'eVar5,eVar6,prop8,eVar33,contextData.action,contextData.' + slotContextKey;
                
                // Assign click handlers to sub-elements of the slot:
                // Every element with the following two attributes will be tracked
                $slotElem.find('[data-track-content][data-track-box]').click(function(event) {
                    var $trackElem = $(this);
					var trackElem = this;
					slotContextValue += ':'
							+ $(trackElem).attr('data-track-content')
							+ ':'
							+ $(trackElem).attr('data-track-box');
					slotContextValue = slotContextValue.toLowerCase();

                    if(trackElemContextValue) {
                    	var trackElemContextValue = trackElemContextValue.toLowerCase();

                    }
                    var s = s_gi(app.siteCatalystReportSuiteID);
                    s.linkTrackVars   = slotLinkTrackVars;
                    s.linkTrackEvents = '';
                    s.contextData[slotContextKey] = slotContextValue;
                    s.contextData['action']       = 'content slot clicked';
                    s.tl(this, 'o', 'content slot clicked');
                });
            });

            // Report initial errors from the server-side
            app.Omniture.reportExistingErrors("server");
        },
        trackLinkRemberedItemAdd : function(productId, trackElem) {
            app.Omniture.trackLinkRemberedItem(productId, trackElem, 'event46', 'product added to remembered items list');
        },
        trackLinkRemberedItemDel : function(productId, trackElem) {
            app.Omniture.trackLinkRemberedItem(productId, trackElem, 'event47', 'product removed from remembered items list');
        },
        trackLinkRemberedItem : function(productId, trackElem, event, friendlyName) {
            if (app.siteCatalystEnabled) {
                s = s_gi(app.siteCatalystReportSuiteID);
                app.Omniture.clearRefineContextData(s);
                s.linkTrackVars = 'eVar5,eVar6,prop8,eVar33,products,events,prop4,contextData.action';
                s.linkTrackEvents = event;
                s.products = ';' + productId;
                s.events = event;
                s.contextData['action'] = friendlyName;
                s.prop4 = 'product details';
                s.tl(trackElem, 'o', friendlyName);
            }
        },
        trackLinkError : function(trackElem, errorMsgs){
            if (app.siteCatalystEnabled && errorMsgs && errorMsgs.length > 0) {
                s = s_gi(app.siteCatalystReportSuiteID);
                if (s.linkTrackVars.length == 0){
                    s.linkTrackVars='eVar31';
                } else {
                    s.linkTrackVars+=',eVar31';
                }

                s.eVar31 = errorMsgs;

                s.tl(trackElem, 'o', 'checkout error message');
            }
        },
        trackLinkSocial : function(productId, event, eVar3) {
            if (app.siteCatalystEnabled) {
                var friendlyName = "product shared";
                s = s_gi(app.siteCatalystReportSuiteID);
                s.linkTrackVars = 'eVar3,eVar5,eVar6,prop4,prop8,prop10,products,events,contextData.action';
                s.linkTrackEvents = event;
                s.pageName = omnPageNameForProductShared;
                s.products = ";" + productId;
                s.eVar3 = encodeURIComponent(eVar3);
                s.events = event;
                s.contextData['action'] = friendlyName;
                s.prop4 = 'product details';
                var s_code=s.t();if(s_code)document.write(s_code)
            }
        },
        trackGridRefinement : function(section, refinement) {

        },
        trackSearchRefinement : function( refinement) {
            $.cookie('refinedby', refinement.toLowerCase(), { expires: 1, path: '/' });
        },
        addRememberedItemsURLParam : function() {
            if (app.siteCatalystEnabled) {
                $("a.thumb-link, a.name-link").attr("href", function(i, href) {
                    return app.util.appendParamToURL(href, 'omnpp','recently viewed');
                    //return addParameterToURL(href,'omnpp=previously viewed');
                });
            }
        },
        trackGridLayoutSwitch : function(style, datas, datab) {
            if (app.siteCatalystEnabled && datas && datab) {
                s = s_gi(app.siteCatalystReportSuiteID);
                s.contextData[datas] = datab + "|page layout|" + (style == "2cols" ? "2 products" : "3 products");
                var s_code=s.t();
                if(s_code)document.write(s_code);
            }
        },
        clearRefineContextData : function(omn_s) {
            for(var prop in omn_s.contextData){
                if(prop.indexOf("ref") == 0){
                    delete omn_s.contextData[prop];
                }
            }
        },
        reportExistingErrors : function(side) {
            if (app.siteCatalystEnabled) {
                var errorQuery  =       "span.error, " +
                                        "div.error, " +
                                        "p.error, " +
                                        "label.error, " +
                                        "span.form-error, " +
                                        "div.form-error, " +
                                        "span.error-form, " +
                                        "div.error-form, " +
                                        "span.error-message, " +
                                        "div.error-message, " +
                                        "span.errormessage, " +
                                        "div.errormessage, " +
                                        "div.no_order, " +
                                        "div.no-shipping-method-error, " +
                                        "div.promoCodeError, " +
                                        "div.coupon-code-error, " +
                                        "div.signup-error, " +
                                        "p.error-page-message, " +
                                        "div.inventoryerror, " +
                                        "#signup-error, " +
                                        "div.COmLi-errormsg, " +
                                        "div.generalErrorText";

                var notReportQuery =    "div.form-row";


                var errorElements = jQuery(errorQuery).not(notReportQuery).filter(":visible").not(".omnerrrep"),
                    errorMessage = "";

                errorElements.each(function(){
                    var jqThis = jQuery(this),
                        msg = "";

                    if(jqThis.hasClass("chzn-container")){
                        msg = jqThis.attr("id");
                    }
                    else{
                        msg = jqThis.text();
                        if(msg == ""){
                            var forAttr = jqThis.attr("for");
                            if(forAttr != ""){
                                if(jQuery("#" + forAttr).filter(":visible").length > 0){
                                    msg = forAttr;
                                }
                            }
                        }
                    }

                    if(msg != undefined && msg != ""){
                        if(side == "server"){
                            jqThis.addClass("omnerrrep");
                        }
                        errorMessage += (errorMessage != "" ? "|" : "") + msg;
                    }
                });

                if(errorMessage != ""){
                    s = s_gi(app.siteCatalystReportSuiteID);
                    if (s.linkTrackVars.length == 0) {
                        s.linkTrackVars = 'eVar31';
                    } else {
                        s.linkTrackVars += ',eVar31';
                    }
                    s.eVar31 = errorMessage;
                    s.tl(errorElements.first(), 'o', 'error');
                }
            }
        }
    };

}(window.app = window.app || {}, jQuery));

/**
 * Reports an error in a way defined by the current mode.
 */
function reportError(msg) {
    var mode = app.constants.INSTANCE_TYPE;

    switch(mode) {
        case 0:
            break;
        case 1:
            if(window.console) {
                window.console.log(msg);
            } else {
                window.alert(msg);
            }
            break;
        case 2:
            window.alert(msg);
            break;
    }
}

/*
 * app.tabGuide scope definitions
 *
 */
(function(app, $) {

    function displayActiveTab() {
        $('div.tabs div.tabContent').each(function() {
            if ($(this).attr('id').search(app.tabGuide.activeTabRegExp) == 3) {
                $(this).removeClass('invisible');
                app.tabGuide.lastActiveTab = $(this);
            }
        });
    }

    function bindTabMenuClickHandler() {
        $('div.navigation a').click(tabMenuClickHandler);
        app.tabGuide.isOpen = true;
    }

    function bindOverlayClickHandler() {
        $('div.ui-widget-overlay').click(onClose);
    }

    function tabMenuClickHandler() {

        // switch tab menu item
        var lastActiveMenuItem = $('div.navigation div.active');
        var activeMenuItem = $(this).children().first();
        lastActiveMenuItem.toggleClass('hover');
        lastActiveMenuItem.toggleClass('active');
        activeMenuItem.toggleClass('hover');
        activeMenuItem.toggleClass('active');

        // switch tab content
        var activeTab = $($(this).attr('href').match(/#tab\w*$/gi)[0]); //we have to parse the anchor ref, because ie7 fills up with full url path
        activeTab.removeClass('invisible');
        if (app.tabGuide.lastActiveTab) {app.tabGuide.lastActiveTab.addClass('invisible');}
        app.tabGuide.lastActiveTab = activeTab;

        return false;
    }

    function onClose() {
        app.tabGuide.isOpen = false;
        app.tabGuide.dialog.dialog("destroy").remove();
    }

    function setupTableStyling() {
        $('.tabs .tabContent').each(function() {
            var table = $(this).children('table');

            table.find('tr:even').addClass('even');
            table.find('th:nth-child(even), td:nth-child(even)').addClass('odd');
            table.find('tbody td:first-child').addClass('label');
            table.find('thead tr:last th').addClass('label');
            table.find('th:first-child, td:first-child').addClass('first');
        });
    }

    app.tabGuide = {

        activeTabRegExp : null,
        lastActiveTab : null,
        dialog : null,
        isOpen : false,

        show : function(url, tabID, cssFile, width, height, contentID) {
            
            // check for existence of all major params
            if (!contentID || contentID.length == 0 || app.tabGuide.isOpen) return;

            var data = {cid: contentID};

            // if no tab id was provided set a default tab related to the
            // appropriate content id to auto activate in the dialog
            if (tabID && tabID.length > 0) {

                // special mapping
                switch(contentID) {
                case 'mens-suits-size-chart':
                    if (/regent|milano|fitzgerald/.test(tabID)) {
                        data.type = 'refimi';
                    } else {
                        data.type = 'madison';
                    }
                    break;

                default:
                        data.type = tabID;
                }
                app.tabGuide.activeTabRegExp = new RegExp(data.type, 'i');
            } else {
                // get default tab
                switch(contentID) {
                case 'mens-shirts-fit-guide':
                    app.tabGuide.activeTabRegExp = new RegExp('compare', 'i');
                    break;
                case 'mens-pants-fit-guide':
                    app.tabGuide.activeTabRegExp = new RegExp('compare', 'i');
                    break;
                case 'mens-suits-fit-guide':
                    app.tabGuide.activeTabRegExp = new RegExp('compare', 'i');
                    break;
                case 'mens-sports-fit-guide':
                    app.tabGuide.activeTabRegExp = new RegExp('compare', 'i');
                    break;
                case 'mens-dress-shirts-size-chart':
                    app.tabGuide.activeTabRegExp = new RegExp('overview', 'i');
                    break;
                case 'mens-suits-size-chart':
                    app.tabGuide.activeTabRegExp = new RegExp('madison', 'i');
                    break;
                }
            }

            // load dialog content asynchronous
            $.ajax({
                type     : "POST",
                url      : url/*app.urls.pageShow*/,
                data     : data,
                dataType : "html",
                success  : function(data) {
                    
                    // was a special css file requested? if yes, so load it here..
                    if (cssFile && cssFile.length > 0) {
                        try {
                            app.util.loadCssFile(app.urls.staticLibraryPath + 'css/' + cssFile);
                        } catch(e) { }
                    }

                    app.tabGuide.dialog = app.dialog.create({
                        target  : $("<div>").attr("id", "dialog-info").html(data),
                        options : { width: width ? width : 1110, height: height ? height : 650, close: onClose }
                    }).dialog("open");

                    // setup dialog tab navigation
                    displayActiveTab();
                    bindTabMenuClickHandler();
                    bindOverlayClickHandler();
                    setupTableStyling();

                },
                failure  : function(data) {
                    reportError(app.resources.SERVER_ERROR);
                }
            });
        }
    };

}(window.app = window.app || {}, jQuery));


/*
 * app.sizeGuide scope definitions
 *
 */
(function(app, $) {

    app.sizeGuide = {

            show : function(url) {

                if (url && url.length > 0) {
                    //var data = {cid: contentID};

                    $.ajax({
                        type     : "POST",
                        url      : url/*app.urls.pageInclude*/,
                        //data     : data,
                        dataType : "html",
                        success  : function(data) {

                            app.dialog.create({
                                target  : $("<div>").attr("id", "dialog-info").html(data),
                                options : { width: 1110, height: 650, dialogClass: 'sizeGuide' }
                            }).dialog("open");
                            
                        },
                    
                        failure  : function(data) {
                            reportError(app.resources.SERVER_ERROR);
                        }
                    });
                }
            }
    };

}(window.app = window.app || {}, jQuery));


/*
 * app.messageToolTip
 *
 */
(function(app, $) {
    
    var message = $('.hover-tooltip'),
        node = message.closest('.cvn-tooltip');
    
    function show() {
        node.hover(function() {
            message.stop(true).fadeIn('300');
        }, function() {
            message.stop(true).fadeOut('300');
        });
    }

    app.messageToolTip = {
            init : show
    };

}(window.app = window.app || {}, jQuery));

/**
 * Javascript code for the checkout
 * ================================
 */
    
/**
 * Common code for all checkout pages
 */
app.checkoutCommon = {
        
    /**
     * Summary section initialization code. It has it's own method so the events
     * can be reapplied without doubling all other in checkoutCommon.init.
     */
    summaryInit: function() {

        // Initialization of click handlers
        /////////////////////////////////////////////////////////////////////////
        
        // Add promotion code button
        if( $('#add-coupon').exists() ) {
            $('#add-coupon').on('click', function() {
                app.checkoutCommon.applyCoupon( $('#add-coupon').parent().parent().find("input[type='text']").val() )
            });
        }

        // Remove promotion code link
        if( $('#remove-coupon').exists() ) {
            $('#remove-coupon').on('click', function() {
                app.checkoutCommon.removeCoupon();
            });
        }
        
        // Clear error on focus on promo code input
        if( $('.pt_checkout #secondary .couponCodeArea .input input[type=text]').exists() ) {
            $('.pt_checkout #secondary .couponCodeArea .input input[type=text]').on('focus', function() {
                app.checkoutCommon.clearCoupon();
            })
        }
        
        // Hover event for estimated tax info
        if( $('#estTaxInfo').exists() ) {
            app.util.mOverToolTip( 
                $('#estTaxInfo'), 
                'top', 
                app.resources.TAX_INFO_TITLE, 
                app.resources.TAX_INFO_DESC,
                'tax'
            );
        }
        
        //bind donation handler
        jQuery("#donation-banner-viewdetails span.link").bind('click', function() {
            jQuery("#donation-modal-banner").dialog({modal: true, dialogClass: 'dialog-without-titlebar', width: 916, height: 554});
        }); 
        jQuery('#donation-modal-banner-close a').bind('click', function() {
            jQuery("#donation-modal-banner").dialog('close');
        });
        jQuery("#donation-mastercard-desc span.link").bind('click', function() {
            jQuery("#donation-modal-mastercard").dialog({modal: true, dialogClass: 'dialog-without-titlebar', width: 916, height: 554});
        });
        jQuery('#donation-modal-mastercard-close a').bind('click', function() {
            jQuery("#donation-modal-mastercard").dialog('close');
        });
        
        // Omniture add donation tracking
        app.checkoutCommon.initDonationTracking("checkout");
    },
        
    /**
     * Initialization code
     */
    init: function() {
        multiModalloading = false;
        
        /*
         * Scroll select to top on open, only if the user hasn't already selected
         * an option, case in which it won't happen and the user would have to
         * manually scroll up the list of results
         */
        $cacheContainer = $('.pt_checkout');
        jQuery($cacheContainer).on('click', '.form-row', function (e) {
            var $self = $(this),
                $chznResults = $self.find('.chzn-results'),
                $chznDefault = $chznResults.find('li:hidden');
            if ($chznDefault.length != 0 && $chznDefault.hasClass('highlighted') || $self.hasClass('formelem-country')) {
                $chznResults.animate({scrollTop: 0});
            }
        });
        
        // Initialization of event handlers
        /////////////////////////////////////////////////////////////////////////
        
        // bind delegate submit order button handler
        $('#submitOrderDelegateBtn').click(function() {
            $('#submitOrderBtn').click();
            return false;
        });
        $('#submitOrderDelegateBtn2').click(function() {
            $('#submitOrderBtn').click();
            return false;
        });
        
        // Minishipment information toggle
        if( $('#checkout-step-edit-shipping').exists() ) {
            $('#checkout-step-edit-shipping').on('click', function() {
                
                $('.wrapper-checkout .shippingSpacer').toggle();
                $('.wrapper-checkout .shippingMiniDisplay').toggle();
                
                if($('.wrapper-checkout .shippingMiniDisplay').is(":visible")) {
                    $('.title-checkout-step #checkout-step-edit-shipping').addClass('open');
                } else {
                    $('.title-checkout-step #checkout-step-edit-shipping').removeClass('open');
                }
            });
        }
        
        // Edit link for shipping
        /*if( $('.content-checkout-step .editLink:not(.giftContainer .editLink)').exists() ) {
            $('.content-checkout-step .editLink:not(.giftContainer .editLink)').on('click', function() {
                location.href = app.urls.shippingAndBilling;
            });
        }*/
        $('.mini-shipment .editLink').on('click', function() {
            location.href = app.urls.shippingAndBilling+"?checkout-step-1-edit=Edit";
        });
        $('.mini-billing-address .editLink').on('click', function() {
            location.href = app.urls.shippingAndBilling+"?checkout-step-1-edit=Edit#editBillingAddressFormAnchor";
        });
        $('.shippingMethodContainer .editLink').on('click', function() {
            location.href = app.urls.shippingAndBilling+"?checkout-step-1-edit=Edit#shipping-methods";
        });
        $('.giftContainer .editLink').on('click', function() {
            location.href = app.urls.shippingAndBilling+"?checkout-step-1-edit=Edit#GiftWrapStep";
        });
        
                
        // Gift message area display checkbox
        if(jQuery('#giftmessageflagcntr').exists()) {
            jQuery('#giftmessageflagcntr').bind('click',function(e) {
                if(jQuery('#dwfrm_singleshipping_shippingAddress_giftMessageCheck')[0].checked == true) {
                    jQuery('#giftmessagecntr').show();
                    jQuery('#giftmessagecntr').find('textarea').attr("placeholder","---"); // ${Resource.msg('co.giftmessage.placeholder','checkout',null)}
                } else {
                    jQuery('#giftmessagecntr').hide();
                    jQuery('#giftmessagecntr').find('textarea').removeAttr("placeholder");
                }
            });
        }
        
        // Billing address selection handling
        if( $(app.forms.paymentinstruments.creditcards.addressList).exists() ) {
            $(app.forms.paymentinstruments.creditcards.addressList).on('change click', app.paymentAndReview.handleAddrListSelection);
        }
        
        // Initialite summary specific logic
        /////////////////////////////////////////////////////////////////////////
        app.checkoutCommon.summaryInit();
    },
    
    /**
     * Apply a coupon code to the cart
     */
    applyCoupon: function(couponCode) {

        // Reset messaging
        $('.nav.summary .couponCodeArea div.error').hide();
        $('.nav.summary .couponCodeArea .input input').removeClass('error');
        $('.nav.summary .couponCodeArea .error').text("");
        
        // Show loading message
        $('.nav.summary .couponCodeArea div.validating').show();
        $('.nav.summary .couponCodeArea div.validating').text(app.resources.COUPON_VALIDATING_MSG);
        
        // Try to add coupon
        $.ajax({
            type     : "POST",
            url      : app.urls.addCoupon,
            data     : {couponCode: couponCode, format: 'ajax'},
            dataType : "html",
            success  : function(data) {
                $('.nav.summary .couponCodeArea div.validating').hide();
                var result = JSON.parse(data);

                // Success - Update summary
                if(result.success) {
                    app.checkoutCommon.updateSummary(true);
                
                // Display error code
                } else if( $('.nav.summary .couponCodeArea div.error').exists() ) {
                    $('.nav.summary .couponCodeArea div.error').show();
                    $('.nav.summary .couponCodeArea .input input').addClass('error');
                    $('.nav.summary .couponCodeArea div.error').text(result.message);
                    $(".nav.summary .couponCodeArea .submit button").addClass('disabled');
                }
                
            }
        });
    },
    
    /**
     * Remove a coupon code from the cart
     */
    removeCoupon: function() {          

        // Reset messaging
        $('.nav.summary .couponCodeArea div.error').hide();
        $('.nav.summary .couponCodeArea .error').text("");
        
        // Show loading message
        $('.nav.summary .couponCodeArea div.removing').show();
        $('.nav.summary .couponCodeArea div.removing').text(app.resources.COUPON_REMOVING_MSG);
        
        // Try to remove coupon
        $.ajax({
            type     : "POST",
            url      : app.urls.removeCoupon,
            data     : {format: 'ajax'},
            dataType : "html",
            success  : function(data) {
                $('.nav.summary .couponCodeArea div.removing').hide();
                app.checkoutCommon.updateSummary(true);
            }
        });
    },
    
    /**
     * Clear all error flags from coupon button and reenable it
     */
    clearCoupon: function() {
        $('.nav.summary .couponCodeArea div.error').hide();
        $('.nav.summary .couponCodeArea .input input').removeClass('error');
        $('.nav.summary .couponCodeArea .error').text("");
        $(".nav.summary .couponCodeArea .submit button").removeClass('disabled');
    },
    
    /**
     * Update the summary display
     */
    updateSummary: function(recalcTax) {
        var url = app.urls.summaryRefreshURL;
        var summary = $("#secondary.summary");
        var data = {};
        
        // Evaluate if the tax should be recalculated (default: TRUE)
        recalcTax? data.recalcTax = recalcTax: data.recalcTax = true;
        
        // Append current shipping address selection if applicable (registered customer, shipping & billing step)
        if( $('.dAddressListContainer .radioBtn .selectAddrRadioBtn:checked').exists() ) {
            data.address = $('.dAddressListContainer .radioBtn .selectAddrRadioBtn:checked').attr("data-address");
        }

        // indicate progress
        app.progress.show(summary);

        // load the updated summary area
        summary.load( url, data, function () {
            // hide edit shipping method link
            summary.fadeIn("fast");
            summary.find('.checkout-mini-cart .minishipment .header a').hide();
            summary.find('.order-totals-table .order-shipping .label a').hide();
            
            // Reinitialize summary related events
            app.checkoutCommon.summaryInit();
        });
    },
    
    /**
     * Initialize event handler for donation link tracking
     */
    initDonationTracking: function(location) {
        
        if (app.siteCatalystEnabled && s) {
            
            // Track donation addition
            $('.donationLink').on('click', function() {
                
                var dData = $(this).data("donation");
                
                if(location && location == "cart") {
                    s.contextData['action']="donation added to bag from bag page";
                } else if(location && location == "checkout") {
                    s.contextData['action']="donation added to bag from checkout page";
                }
                
                s.products=";"+dData.charity_name+"-"+dData.donation_amount+"-"+dData.currency;
                s.events="scAdd";
                s.tl();
            });
            
            // Track details link
            $("#donation-banner-viewdetails .link, #donation-mastercard .link").on('click', function() {
                var donationName = $(this).data("donationname");
                s.pageName="donation > "+donationName+" > view details";
                s.channel="donation";
                s.prop4="donation";
                s.t();
            });
        }
    }
}


/**
 * Shipping and billing page related code
 */
app.shippingAndBilling = {

    /**
     * Code to be run after the page is load
     */
    init : function() {
    	// .is('[CHECKED]') for ie9
        if($(app.forms.singleshipping.shippingAddress.useAsBillingAddress).attr('checked') === true || $(app.forms.singleshipping.shippingAddress.useAsBillingAddress).attr('checked') || $(app.forms.singleshipping.shippingAddress.useAsBillingAddress).is('[CHECKED]') == true) {
            window.shippingToBillingAddressSync = true;
        } else {
            window.shippingToBillingAddressSync = false;
        }
        app.shippingAndBilling.shippingToBillingAddressSync(true);
        
        // Mouse-over tooltips
        jQuery("label[for='dwfrm_singleshipping_shippingAddress_addressFields_phone'], " +
        		"label[for='dwfrm_singleshipping_shippingAddress_email_emailAddress'], " +
        		"label[for='dwfrm_billing_billingAddress_addressFields_phone'], " +
        		"label[for='dwfrm_billing_billingAddress_email_emailAddress'], " +
        		".rsp-multiple-shipping label")
            .append('<span class="customToolTip"><!-- tooltip --></span>');
        
        // Toggle billing address form
        if( $("input.useAsBillingAddress[type='checkbox']").exists() ) {
            $("input.useAsBillingAddress[type='checkbox']").on('change', function() {
                app.shippingAndBilling.toggleBillingAddress( $('.billingAddressContent'), true );
                $('#dwfrm_paymentinstruments_creditcards_addressList_chzn .chzn-results').bind('mouseup', function(e) {
        			if($(app.forms.paymentinstruments.creditcards.addressList).val() == 'createnewaddress') {
        				$('.editBillingAddressFormAnchor .addressFields.inputSection').show();
        			}
        		});
            });
            app.shippingAndBilling.toggleBillingAddress( $('.billingAddressContent') );
        }
        
        // Initialization of event handlers
        /////////////////////////////////////////////////////////////////////////
        
        // Custom tooltip for phone info
        app.util.mOverToolTip( 
            jQuery('.form-row.phone .customToolTip'),
            'right', 
            app.resources.PHONE_TOOLTIP_HEADLINE, 
            app.resources.PHONE_TOOLTIP_MSG,
            'emailToolTip',
            {bottom: "-115px"}
        );
        
        // Custom tooltip for email info
        app.util.mOverToolTip( 
            jQuery('.form-row.email .customToolTip'),
            'right', 
            app.resources.EMAIL_TOOLTIP_HEADLINE, 
            app.resources.EMAIL_TOOLTIP_MSG,
            'emailToolTip',
            {bottom: "-89px"}
        );
        
        // Custom tooltip for multiple shipping
        app.util.mOverToolTip( 
            jQuery('.rsp-multiple-shipping .customToolTip'),
            'right', 
            app.resources.MULTIPLE_SHIPPING_HEADLINE, 
            app.resources.MULTIPLE_SHIPPING_MSG,
            'multiShipToolTip',
            {bottom: "-293px"}
        );
        jQuery('.form-row.email .genericTooltip').addClass('extended');
        
        // Clear gift message area when checkbox is not set
        $('#dwfrm_singleshipping_shippingAddress').on('submit', function() {
            if(jQuery('#dwfrm_singleshipping_shippingAddress_giftMessageCheck')[0].checked == false) {
                jQuery('#dwfrm_singleshipping_shippingAddress_giftMessage').val("");
            }
        });
        
        // Trigger tax update
        //not needed now - Hari.
        /*
        if ( $('.dAddressListContainer .radioBtn .selectAddrRadioBtn').exists() ) {
            $('.dAddressListContainer .radioBtn .selectAddrRadioBtn').on('click', app.shippingAndBilling.updateTax);
        } 
        */      
        
        // Fill mail input fields with form address in case they are not set
        if( $('.form-row.email.required input').exists() ) {
            $('.form-row.email.required input').each( function() {
                if( $(this).val().length == 0 && app.customerSettings.email ) {
                    $(this).val(app.customerSettings.email);
                }
            });
        }
    },
    
    /**
     * Toggle the billing address input fields.
     */
    toggleBillingAddress: function(element, clearForm) {

        function sync(select) {
            select = select || $('.billingaddressselectbox');
            select.find('option').removeAttr('selected');
            var data = select.parents('form').serializeArray();
            $.each(data, function(name, val) {
                if(name === 'radioButton') {
                    select.find('option[value=' + val + ']').attr('selected', 'selected');
                }
            });
        }

        element = element.first();
        var blockContainer = $('.mini-billing-address.order-component-block');
        
        if( $(app.forms.singleshipping.shippingAddress.useAsBillingAddress).attr("checked") ) {
            blockContainer.hide(); element.hide();
            sync();
        } else if(window.useAsBillingAddressInitiallyChecked) {
            element.show()
        } else {
            element.hide()
            blockContainer.show();
            //sync();
        }
        
        
        // Toggle shipping address sync based on visibility state
        if( element.is(':hidden') ) {
            window.shippingToBillingAddressSync = true;
            app.shippingAndBilling.shippingToBillingAddressSync(false);
            
        } else {
            window.shippingToBillingAddressSync = false;
            app.shippingAndBilling.clearForm(element);

            if(clearForm) {
                app.shippingAndBilling.clearForm(element);
            }
            
            // Default contry to US if non has been selected yet
            if( $(app.forms.billing.billingAddress.addressFields.country).val() == "" ) {
                $(app.forms.billing.billingAddress.addressFields.country).val("US");
                $(app.forms.billing.billingAddress.addressFields.country).change();
                $(app.forms.billing.billingAddress.addressFields.states.state).change();
            }
        }
    },
    
    /**
     * Clears all fields of a given element
     */
    clearForm: function(element) {
        
        // Clear input fields
        $(element).find("input[type='text']").each(function() {
            $(this).val("");
        });
        
        // Clear select boxes
        $(element).find("select").each(function() {
            $(this).find("option").first().attr("selected", "selected");
            $(this).change();
        });
    },
    
    /**
     * Synchronize all entries in the shipping form with the billing form.
     */
    shippingToBillingAddressSync: function(addListener) {
    	var shippingSalutation  = $('#dwfrm_singleshipping_shippingAddress_addressFields_salutation');
        var shippingFirstName   = $('#dwfrm_singleshipping_shippingAddress_addressFields_firstName');
        var shippingLastName    = $('#dwfrm_singleshipping_shippingAddress_addressFields_lastName');
        var shippingAddress1    = $('#dwfrm_singleshipping_shippingAddress_addressFields_address1');
        var shippingAddress2    = $('#dwfrm_singleshipping_shippingAddress_addressFields_address2');
        var shippingCity        = $('#dwfrm_singleshipping_shippingAddress_addressFields_city');
        var shippingZip         = $('#dwfrm_singleshipping_shippingAddress_addressFields_zip');
        var shippingCountry     = $('#dwfrm_singleshipping_shippingAddress_addressFields_country');
        var shippingStates      = $('#dwfrm_singleshipping_shippingAddress_addressFields_states_state');
        //var shippingPhone       = $(app.forms.singleshipping.shippingAddress.addressFields.phone);
        
        var billingSalutation   = $('#dwfrm_billing_billingAddress_addressFields_salutation');
        var billingFirstName    = $('#dwfrm_billing_billingAddress_addressFields_firstName');
        var billingLastName     = $('#dwfrm_billing_billingAddress_addressFields_lastName');
        var billingAddress1     = $('#dwfrm_billing_billingAddress_addressFields_address1');
        var billingAddress2     = $('#dwfrm_billing_billingAddress_addressFields_address2');
        var billingCity         = $('#dwfrm_billing_billingAddress_addressFields_city');
        var billingZip          = $('#dwfrm_billing_billingAddress_addressFields_zip');
        var billingCountry      = $('#dwfrm_billing_billingAddress_addressFields_country');
        var billingStates       = $('#dwfrm_billing_billingAddress_addressFields_states_state');
        //var billingPhone        = $(app.forms.billing.billingAddress.addressFields.phone);
        
        // Copy any existing values initially from shipping to billing
        ////////////////////////////////////////////////////////////////    
        if( window.shippingToBillingAddressSync ) {
            billingSalutation.val(  shippingSalutation.val() );
            billingFirstName.val(   shippingFirstName.val()  );
            billingLastName.val(    shippingLastName.val()   );
            billingAddress1.val(    shippingAddress1.val()   );
            billingAddress2.val(    shippingAddress2.val()   );
            billingCity.val(        shippingCity.val()       );
            billingZip.val(         shippingZip.val()        );
            //billingPhone.val(       shippingPhone.val()      );
            billingCountry.val(     shippingCountry.val()    );
            billingCountry.change();
            billingStates.val(      shippingStates.val()     );
            billingStates.change();
        }
        
        // Add event handlers to copy any changes (when sync is enabled)
        ////////////////////////////////////////////////////////////////
        if(addListener) {
        
            shippingSalutation.on('change', function() {
                if( window.shippingToBillingAddressSync ) {
                    billingSalutation.val( $(this).val() );
                }               
            });
            
            shippingFirstName.on('change keyup', function() {
                if( window.shippingToBillingAddressSync ) {
                    billingFirstName.val( $(this).val() );
                }               
            });
            
            shippingLastName.on('change keyup', function() {
                if( window.shippingToBillingAddressSync ) {
                    billingLastName.val( $(this).val() );
                }               
            });
            
            shippingAddress1.on('change keyup', function() {
                if( window.shippingToBillingAddressSync ) {
                    billingAddress1.val( $(this).val() );
                }               
            });
            
            shippingAddress2.on('change keyup', function() {
                if( window.shippingToBillingAddressSync ) {
                    billingAddress2.val( $(this).val() );
                }               
            });
            
            shippingCity.on('change keyup', function() {
                if( window.shippingToBillingAddressSync ) {
                    billingCity.val( $(this).val() );
                }               
            });
            
            shippingZip.on('change keyup', function() {
                if( window.shippingToBillingAddressSync ) {
                    billingZip.val( $(this).val() );
                }               
            });
            
            /*
            shippingPhone.on('change keyup', function() {
                if( window.shippingToBillingAddressSync ) {
                    billingPhone.val( $(this).val() );
                }               
            });
            */
            
            shippingCountry.on('change', function() {
                if( window.shippingToBillingAddressSync ) {
                    billingCountry.val( $(this).val() );
                }               
            });
            
            shippingStates.on('change', function() {
                if( window.shippingToBillingAddressSync ) {
                    billingStates.val( $(this).val() );
                }               
            });     
        }
    },

    /**
     * Show the multishipping edit modal dialog
     */
    showMultishippingEdit: function(targetPipeline, expandAddress) {

        function enableShippingSelect() { 
            $(this).delegate('.radio-row', 'click', function() {
                var _class = 'selected-label';
                $('.radio-row>label').removeClass(_class);
                $('input:checked').parent().find('label').addClass(_class);
            });
        }
        
        //disabling EMEA countries for multiple shipping addresses feature
        function disableEMEA(name) {
            var select = $('#' + name) || $('select[name="' + name + '"');
            if(select === undefined) return;

            var regions = app.FiftyOne.countryLocales;
            $.each(select.children(), function() {
                var val = $(this).val();
                if(regions[val] !== undefined) {
                    $(this).attr('disabled', 'disabled');
                }
            });
        }

        // Return if modal is loading already
        if(multiModalloading) {
            return;
        } else {
            multiModalloading = true;
        }
        
        // Fallback to COShippingAndBillingMultiple-Start in case no parameter is provided
        if (!targetPipeline) {
            targetPipeline = app.urls.multishippingStart;
        }
        
        // Set global for the target pipeline
        window.targetPipeline = targetPipeline.substring(targetPipeline.indexOf("COShippingAndBillingMultiple"), targetPipeline.length);

        // (Re)Create DIV and load the data
        //////////////////////////////////////////////////////////

        // Build new DIV and display it
        var info = null;
        if($('multiShippingModal').size() == 0) {
            info = document.createElement("div");
            $(info).attr('id', 'multiShippingModal');
            $(info).attr('data-url', targetPipeline);
        } else
            info = $('#multiShippingModal');


        jQuery(info).load(targetPipeline, function() {
            multiModalloading = false;
            jQuery(info).dialog({ 
                modal: true, 
                minWidth: 1024, 
                minHeight: 768,
                open: function (ev, ui) {
                    window.app.validator.init(); 
                    app.ClickOutsideModal.bindHere();
                    enableShippingSelect.call(this);
                }, 
                close: function (ev, ui) { 
                    app.shippingAndBilling.closeMultiModal(); 
                }
            });

            // Make sure the shipping method radios are set
            jQuery(".shippingMethodRadio:checked").change();
            
            jQuery('#multiShippingAddresses').validate();
            jQuery('.GiftMsgToggle').each(function(){

                var id = jQuery(this).attr("id");
                var no =id.substr(id.indexOf("_")+1);

                if(!$(this).attr('checked')) {
                jQuery("#Giftmessagetext_" + no).hide();

                } else {
                    jQuery("#Giftmessagetext_" + no).show();
                }

            });

            disableEMEA('dwfrm_multishipping_shippingAddress_addressFields_country');
                
            jQuery.CustomFormElements();
            window.app.CustomSelects.changeThem();
            $('select.addressselectbox').click(function() {
                if ($(this).find("option:selected").val()=="createnewaddress"){
                    $(".addaddressform").hide();
                    $(this).parent().parent().find(".addaddressform").show();
                } else {
                    $(this).parent().parent().find(".addaddressform").hide();
                }
            });

            // Expand the new address form if the customer is registered but has no saved addresses
            if(expandAddress) {
                jQuery("#dwfrm_multishipping_addressSelection_productLineItems_i0_addressList").val("createnewaddress");
                realocateNewAddress( jQuery("#dwfrm_multishipping_addressSelection_productLineItems_i0_addressList")[0] );
            }
            
            // Unbind the mouseDown event to reenable scrolling
            setTimeout(function() { jQuery(document).unbind("mousedown") }, 100);
            
            var countryLabel = jQuery("label[for='dwfrm_multishipping_shippingAddress_addressFields_country']");
                        
        
            // Initialization of event handlers
            /////////////////////////////////////////////////////////////////////////
            
            $('#multiShippingModal').find('select.country')
                .bind('liszt:showing_dropdown', function(){
                    countryLabel.find('.customToolTip').trigger('mouseenter');
                }).bind('liszt:hiding_dropdown', function(){ 
                    countryLabel.find('.customToolTip').trigger('mouseleave');
                });

            // Update shoprunner shipping methods

            if(window.sr_updateMessages) {
                sr_updateMessages();
            } else {
                jQuery(document).on("srIntegrationLoaded", function(e) {
                    sr_updateMessages();
                });
            }
            
        });
    },
    
    /**
     * Close multishipping dialog and reload page in case the current target pipeline
     * is COShippingAndBillingMultiple-Start and isMultishipping is set.
     */
    closeMultiModal: function() {
        
        // Remove modal
        $('#multiShippingModal').dialog("destroy");
        $('#multiShippingModal').remove();
        location.href = app.urls.resetShipments;
        // Check for target pipeline
       /* if( window.targetPipeline && 
            window.targetPipeline.indexOf("COShippingAndBilling-Start") != -1 && 
            !(window.multishippingFinished === undefined || 
            window.multishippingFinished === null) && 
            window.multishippingFinished == false ) {
            

            location.href = app.urls.resetShipments;
        } */
    },
    
    /**
     * Recalculate the tax for selected customer address
     */
    updateTax: function(elem) {
        
        // No element provided, take the triggering element
        if(!elem) {
            elem = $(this).target;
        } else if( elem.target ) {
            elem = elem.target;
        }
        
        $.ajax({
            type     : "POST",
            url      : app.urls.updateTax,
            data     : {address: $(elem).attr("data-address") },
            dataType : "html",
            success  : function(data) {
                var status = JSON.parse(data).status;
                
                if(status == "ok") {
                    app.checkoutCommon.updateSummary();
                } else if(status == "error") {
                    // Error while calculating tax - not crucial, simply not update the summary
                }
            }
        });
    }
};


/**
 * Payment and review related JS code.
 */
app.paymentAndReview = {
        
    /**
     * Code to be run after the page is load
     */
    init : function() {
        
        jQuery("label[for='dwfrm_singleshipping_shippingAddress_addressFields_phone']")
            .add("label[for='dwfrm_billing_billingAddress_email_emailAddress']")
                .append('<span class="customToolTip"><!-- tooltip --></span>');
        
        // Custom tooltip for phone and email info
        app.util.mOverToolTip( 
            jQuery('.form-row.email .customToolTip'),
            'right', 
            app.resources.EMAIL_TOOLTIP_HEADLINE, 
            app.resources.EMAIL_TOOLTIP_MSG,
            'emailToolTip'
        );
        jQuery('.form-row.email .genericTooltip').addClass('extended');
        jQuery('.form-row.email .genericTooltip').css('bottom', '-74px');
        
        // Disable "Send Payment & Place Order" button until the customer finished filling
        // either the gift or credit card form and the input is valid
        app.paymentAndReview.setCOContinueBtn(false);
        
        // Change the CVV input label in new credit card form
        $('.numberAndCVV .cvv label span').first().text("CVV");
        
        // Remove unused CVV fields on submit
        $(app.forms.billing.save).on('click', app.paymentAndReview.removeUnusedCVVFields);
        
        // Toggle CVV input fields for "BBCard"        	
        if( $(app.forms.billing.paymentMethods.creditCard.type).val() == 'BBCard' ) {
        	app.paymentAndReview.showAdditionalCCFields();
        	app.paymentAndReview.hideCVVField();
        } else if( $(app.forms.billing.paymentMethods.creditCard.type).val() == 'BBPLCC' ) {
            app.paymentAndReview.hideAdditionalCCFields();
        } else {
            app.paymentAndReview.showAdditionalCCFields();
        }

        // Initialization of event handlers
        /////////////////////////////////////////////////////////////////////////
        
        // Handler for closing the expanded billing address frame
        $('.addressDisplay.billingAddressContent .cancel.cancel-button.button-short-white').on('click', function(e) {
            e.preventDefault();
            $('#dwfrm_singleshipping_shippingAddress_useAsBillingAddress').click();
        });
        
        // Show gift card payment options
        $('#giftCardPaymentCheckbox').on('change', function() {
            if( ($('#giftCardPaymentCheckbox').attr('checked') && $('#giftCardPaymentCheckbox').attr('checked') =='checked') &&
                !$('.giftCardInputArea').is(':visible') ) {
            	$('.paypalSection').hide();
             /*   if( ($('#paypalPaymentCheckbox').attr('checked') && $('#paypalPaymentCheckbox').attr('checked') =='checked')) {
                	app.paymentAndReview.togglePayPal();
                } */
                $('.giftCardInputArea').show();
            } else {
            	$(app.forms.billinggiftcert.giftCertCode).val("");
                $(app.forms.billinggiftcert.giftCertCodePin).val("");
                app.paymentAndReview.removeAllGiftCertificates();
                $('.giftCardInputArea').hide();
            }
            
            if ($('.giftCardInputArea').is(':visible')) {
                $('#giftCardCheckbox.checkbox-row .areaExpander').addClass("open");
            } else {
                $('#giftCardCheckbox.checkbox-row .areaExpander').removeClass("open");
                if( $('.giftcertcouponform .balance').exists() ) {
                	$('.giftcertcouponform .balance').hide();
                }
            }

        });
        $('#giftCardCheckbox.checkbox-row .areaExpander').on('click', function() {
            $('.giftCardInputArea').toggle();
            if ($('.giftCardInputArea').is(':visible')) {
                $('#giftCardCheckbox.checkbox-row .areaExpander').addClass("open");
            } else {
                $('#giftCardCheckbox.checkbox-row .areaExpander').removeClass("open");
                if( $('.giftcertcouponform .balance').exists() ) {
                	$('.giftcertcouponform .balance').hide();
                }
            }
        });
        
        // Show Paypal payment options
        $('#paypalPaymentCheckbox').on('change', function() {
        //	app.paymentAndReview.setCOContinueBtn(true);
            if( ($('#paypalPaymentCheckbox').attr('checked') && $('#paypalPaymentCheckbox').attr('checked') =='checked') &&
                !$('.payPalInputArea').is(':visible') ) {
                $('.nonGCSection').hide();
                $('.gcPaySection').hide();
                $('.paypalfunding').show();
                jQuery(".cntButton").hide();
             	
                /* Remove CC fields when PayPal is checked */ 
                $(app.forms.billing.paymentMethods.creditCard.number).val("");
                $(app.forms.billing.paymentMethods.creditCard.cvv).val("");
                $(app.forms.billing.paymentMethods.creditCard.cvn).val("");
                $(app.forms.billing.paymentMethods.creditCard.type).find('option:first').attr('selected', true);
                $(app.forms.billing.paymentMethods.creditCard.type).change();
                $(app.forms.billing.paymentMethods.creditCard.month).find('option:first').attr('selected', true);
                $(app.forms.billing.paymentMethods.creditCard.month).change();
                $(app.forms.billing.paymentMethods.creditCard.year).find('option:first').attr('selected', true);
                $(app.forms.billing.paymentMethods.creditCard.year).change();
                $(app.forms.billing.paymentMethods.creditCard.owner).val("");
                /* Remove CC fields when PayPal is checked */ 
                
            	app.paymentAndReview.setCOContinueBtn(true);
            } else {
            	 $('.gcPaySection').show();
            	$('.nonGCSection').show();
         	   $('.paypalfunding').hide();
         	   jQuery(".cntButton").show();
         	   app.paymentAndReview.setCOContinueBtn(false);
            }
            if ($('.payPalInputArea').is(':visible')) {
                $('#paypalPaymentCheckbox.checkbox-row .areaExpander').addClass("open");
            }
        });
        
        $('#payPalCheckbox.checkbox-row .areaExpander').on('click', function() {
            $('.payPalInputArea').toggle();
            if ($('.payPalInputArea').is(':visible')) {
                $('#payPalCheckbox.checkbox-row .areaExpander').addClass("open");
            } else {
                $('#payPalCheckbox.checkbox-row .areaExpander').removeClass("open");
            } 
        });        
        // Show credit card payment options
        $('#creditCardPaymentCheckbox').on('change', function() {
            if( ($('#creditCardPaymentCheckbox').attr('checked') && $('#creditCardPaymentCheckbox').attr('checked') =='checked') &&
                !$('.creditCardInputArea').is(':visible') ) {
                $('.creditCardInputArea').toggle();     
            }
            
            if ($('.creditCardInputArea').is(':visible')) {
                $('#creditCardCheckbox.checkbox-row .areaExpander').addClass('open');
            } else {
                $('#creditCardCheckbox.checkbox-row .areaExpander').removeClass('open');
            }
            
            // Attach CVV field to default credit card
            //app.paymentAndReview.rearrangeCVV( $('.dAddressListContainer .leftContainer .radioBtn').first() );
            
            // Toggle checkout continue button based on checkbox state
            if( $(this).attr("checked") ) {
                /*
            	$(app.forms.billing.paymentMethods.creditCard.number).val("");
                $(app.forms.billing.paymentMethods.creditCard.cvv).val("");
                $(app.forms.billing.paymentMethods.creditCard.cvn).val("");
                $(app.forms.billing.paymentMethods.creditCard.type).find('option:first').attr('selected', true);
                $(app.forms.billing.paymentMethods.creditCard.type).change();
                $(app.forms.billing.paymentMethods.creditCard.month).find('option:first').attr('selected', true);
                $(app.forms.billing.paymentMethods.creditCard.month).change();
                $(app.forms.billing.paymentMethods.creditCard.year).find('option:first').attr('selected', true);
                $(app.forms.billing.paymentMethods.creditCard.year).change();
                $(app.forms.billing.paymentMethods.creditCard.owner).val("");
                */
                app.paymentAndReview.setCOContinueBtn(true);
                //app.paymentAndReview.initializeCCFormWithDefaultCard();
            } else {
                app.paymentAndReview.setCOContinueBtn(false);
            }
        });
        $('#creditCardCheckbox.checkbox-row .areaExpander').on('click', function() {
            $('.creditCardInputArea').toggle();
            if ($('.creditCardInputArea').is(':visible')) {
            	if( $(".selectPaymentRadioBtn[checked='checked']").exists() ) {
                	// check credit card payment box and enable the continue btn
                    //$("#creditCardPaymentCheckbox").attr('checked','true');
                    //app.paymentAndReview.setCOContinueBtn(true);
            		$(".selectPaymentRadioBtn[checked='checked']").trigger('click');
                }
                $('#creditCardCheckbox.checkbox-row .areaExpander').addClass('open');
            } else {
            	$('#creditCardCheckbox.checkbox-row .areaExpander').removeClass('open');
                // check credit card payment box and enable the continue btn
            	$("#creditCardCheckbox").find('.checkbox').css({"background-position": "0px 0px "});
            	$("#creditCardPaymentCheckbox").removeAttr('checked');
                app.paymentAndReview.setCOContinueBtn(false);
            }
            // Attach CVV field to default credit card
            //app.paymentAndReview.rearrangeCVV( $('.dAddressListContainer .leftContainer .radioBtn').first() );
        });
        
        // Hover event for applicable creditcards info
        if( $('#ccInfo').exists() ) {
            app.util.mOverToolTip( 
                $('#ccInfo'), 
                'right', 
                app.resources.CC_INFO_TITLE, 
                app.assets.cc_info_hover,
                'cc'
            );
        }
        
        // Hover event for applicable gift card info
        if( $('#giftcardform #gcInfo').exists() ) {
            app.util.mOverToolTip( 
                $('#giftcardform #gcInfo'), 
                'right', 
                null, 
                app.assets.gc_info_hover,
                'gc',
                { bottom: "-153px" }
            );
        }
        
        if( $('#payPalCheckbox #ppInfo').exists() ) {
            app.util.mOverToolTip( 
                $('#ppInfo'), 
                'right', 
                app.resources.PP_INFO_TITLE, 
                app.resources.PP_INFO_TITLE_DESC,
                'pp'/*,
                { bottom: "-153px" }*/
            );
        }
        if( $('.dAddressListContainer .leftContainer .radioBtn').exists() ) {
            $('.dAddressListContainer .leftContainer .radioBtn').on('click', function() {
            	$('.dAddressListContainer  .leftContainer .radioBtn').parent().parent().find('.rightContainer .addressDisplay:not(.billingAddressContent)').hide();
                $(this).parent().parent().find('.rightContainer .paymentMethodDisplay').show();
                $(this).parent().parent().find('.rightContainer .addPaymentMethodDisplay').show();
                
                // check credit card payment box and enable the continue btn
                $("#creditCardCheckbox").find('.checkbox').css({"background-position": "0px -44px "});
                $("#creditCardPaymentCheckbox").attr('checked','true');
                app.paymentAndReview.setCOContinueBtn(true);
                
                // Reset credit card icons
                if( $(this).parent().parent().find('.rightContainer .paymentMethodDisplay').exists() ) {
                    $('.ccIcon .Amex').add('.ccIcon .BBPLCC').add('.ccIcon .BBCard')
                    .add('.ccIcon .DinersClub').add('.ccIcon .Discover').add('.ccIcon .JCB')
                    .add('.ccIcon .Master').add('.ccIcon .China').add('.ccIcon .Visa').hide();  
                }
                
                // Bug 5786
                $('#dwfrm_billing_paymentMethods_creditCard_type_chzn .chzn-results').bind('mouseup', function (e) {
                	var src = e.target;
                    if($(app.forms.billing.paymentMethods.creditCard.type).val() === 'BBPLCC' || $(app.forms.billing.paymentMethods.creditCard.type).val() === 'BBCard') {
                    	jQuery(".cvvInput input.cvn").val('111');
                    	$('.cvv').hide();
                    } else {
                    	jQuery(".cvvInput input.cvn").val('');
                    	$('.cvv').show();                    	
                    }
                });

                
                // Update form when a saved card was selected
                if( app.paymentAndReview.isSavedCreditCard($(this)) ) {
                	app.paymentAndReview.updateBillingFormWith( $(this) );
                	
                	if( $(app.forms.billing.paymentMethods.creditCard.type).val() != 'BBPLCC' && $(app.forms.billing.paymentMethods.creditCard.type).val() != 'BBCard' ) {
                		jQuery("input[name=dwfrm_billing_paymentMethods_creditCard_cvn]").val("");
                	}
                	
                // Clear fields when the new card radio was selected
                } else {
                    if(!(window.creditCardValidationResult))
                        {
                    	
                    $(app.forms.billing.paymentMethods.creditCard.number).val("");
                    $(app.forms.billing.paymentMethods.creditCard.cvv).val("");
                    $(app.forms.billing.paymentMethods.creditCard.cvn).val("");
                    $(app.forms.billing.paymentMethods.creditCard.type).find('option:first').attr('selected', true);
                    $(app.forms.billing.paymentMethods.creditCard.type).change();
                    $(app.forms.billing.paymentMethods.creditCard.month).find('option:first').attr('selected', true);
                    $(app.forms.billing.paymentMethods.creditCard.month).change();
                    $(app.forms.billing.paymentMethods.creditCard.year).find('option:first').attr('selected', true);
                    $(app.forms.billing.paymentMethods.creditCard.year).change();
                    $(app.forms.billing.paymentMethods.creditCard.owner).val("");
                        }
                                            
                }
                
                // Set credit card image
                app.paymentAndReview.setCreditCardImage( $(this), null );
                
                // Rearrange CVV input for credit card on radiobox click
                if( $(app.forms.billing.paymentMethods.creditCard.type).val() == 'BBPLCC' || $(app.forms.billing.paymentMethods.creditCard.type).val() == 'BBCard') {
                    app.paymentAndReview.removeCVV( $(this) );
                } else {
                	if( app.paymentAndReview.isSavedCreditCard($(this)) ) {
                		app.paymentAndReview.rearrangeCVV( $(this) );
                	} else{
                		app.paymentAndReview.removeCVVForNewCC( $(this) );
                	}
                }
                
                app.paymentAndReview.currentCCArea = $(this); 
            });
        }
        if( $(app.forms.billing.paymentMethods.creditCard.type).exists() ) {
            $(app.forms.billing.paymentMethods.creditCard.type).on('change', function() {
                app.paymentAndReview.setCreditCardImage( null, $(this).val() );
            });
        }
        
        if ( $(app.forms.billing.paymentMethods.creditCard.number).exists() ) {
        	$(app.forms.billing.paymentMethods.creditCard.number).on('keydown', function(){
        		$("#creditCardCheckbox").find('.checkbox').css({"background-position": "0px -44px "});
                $("#creditCardPaymentCheckbox").attr('checked','true');
                app.paymentAndReview.setCOContinueBtn(true);
            });
        }
        
        if ( $(app.forms.billing.paymentMethods.creditCard.cvn).exists() ) {
        	$(app.forms.billing.paymentMethods.creditCard.cvn).on('keydown', function(){
        		$("#creditCardCheckbox").find('.checkbox').css({"background-position": "0px -44px "});
                $("#creditCardPaymentCheckbox").attr('checked','true');
                app.paymentAndReview.setCOContinueBtn(true);
            });
        }
        
        if ( $('.cvvInput.existing-cc').exists() ) {
        	$('.cvvInput.existing-cc').on('keydown', function(){
        		$("#creditCardCheckbox").find('.checkbox').css({"background-position": "0px -44px "});
                $("#creditCardPaymentCheckbox").attr('checked','true');
                app.paymentAndReview.setCOContinueBtn(true);
            });
        }
        
        // Initialize credit card form in case a default card is selected
        if( $(".selectPaymentRadioBtn[checked='checked']").exists() ) {
            app.paymentAndReview.updateBillingFormWith( $(".selectPaymentRadioBtn[checked='checked']") );
            
            // Attach CVV field to default credit card, if the default card is not BBCard
            if( $(app.forms.billing.paymentMethods.creditCard.type).val() != 'BBPLCC' && $(app.forms.billing.paymentMethods.creditCard.type).val() != 'BBCard' ) {
            	app.paymentAndReview.rearrangeCVV( $('.dAddressListContainer .leftContainer .radioBtn').first() );
            } else {
            	if( $(app.forms.billing.paymentMethods.creditCard.type).val() == 'BBCard' ) {
            		app.paymentAndReview.hideCVVField();
            	} else {
            		app.paymentAndReview.hideAdditionalCCFields();
            	}
            }
        }
        
        // Add validation to gift card fields for apply button toggling
        var gcNumber = $(app.forms.billinggiftcert.giftCertCode);
        var gcPIN = $(app.forms.billinggiftcert.giftCertCodePin);
        var applyBtn = $(app.forms.billinggiftcert.redeemGiftCert);
        var chkBalanceBtn = $('#checkBalance');
        var applyBtnSpan = $('.wrapper-checkout #giftcardform .formfield.giftcardnumber.code > button span');
        if( gcNumber.exists() && gcPIN.exists() ) {
            gcNumber.add(gcPIN).on('keyup', function() { 

                // Valid Gift Card - Enable "Apply" and "Check Balance" controls
                if(app.paymentAndReview.validateGiftCard(gcNumber.val(), gcPIN.val())) {
                	$("#giftCardPaymentCheckbox").attr('checked','checked');
                    applyBtn.removeClass('disabled');
                    applyBtnSpan.css('cursor', 'pointer');
                    applyBtn.unbind('click', app.paymentAndReview.redeemGiftCard);
                    applyBtn.on('click', app.paymentAndReview.redeemGiftCard);
                    
                    chkBalanceBtn.removeClass('disabled');
                    chkBalanceBtn.css('cursor', 'pointer');
                    chkBalanceBtn.unbind('click', app.paymentAndReview.checkGiftCertBalance);
                    chkBalanceBtn.on('click', app.paymentAndReview.checkGiftCertBalance);                   
                    
                // Invalid Gift Card - Disable controls
                } else {
                    applyBtn.addClass('disabled');
                    applyBtnSpan.css('cursor', 'default');
                    applyBtn.unbind('click', app.paymentAndReview.redeemGiftCard);
                    
                    chkBalanceBtn.addClass('disabled');
                    chkBalanceBtn.css('cursor', 'default');
                    chkBalanceBtn.unbind('click', app.paymentAndReview.checkGiftCertBalance);
                    
                    if( $('.giftcertcouponform .balance').exists() ) {
		                $('.giftcertcouponform .balance').hide();
		            }
                }
            });
        }
        
        // Clear error style on gift card fields for keyUp
        $('#giftcardscontainer .input-text').on('keyup', function() {
            $(this).removeClass('error');
        });
        
        // Initialize gift card section
        app.paymentAndReview.initGCSection();
        
        // Enable/Disable continue button based on gift card balance
        /*
        if( ($('#basketCovered').exists() && $('#basketCovered').val() == "true") || $('#creditCardPaymentCheckbox').attr('checked') ) {
            app.paymentAndReview.setCOContinueBtn(true);
        } else {
            app.paymentAndReview.setCOContinueBtn(false);
        }
        */   
        
        /* PayPal Validation */

        var paypalBtn = $(app.forms.billingpaypal.usePayPal);
       	paypalBtn.on('click', function() {
        	window.location.href=app.urls.selectPayPalFunding;        		
        });        	
        // Set globals for credit card validation
        g_creditCartMonthSet = false;
        g_creditCartYearSet = false;
        
        // Apend info hover to CVV info icon
        if( $('.ccCVVInfo').exists() ) {
            app.util.mOverToolTip( $('.ccCVVInfo'), 'right', app.resources.CC_CVVINFO_TITLE, app.assets.cc_info_cvv, 'cvvInfo', { bottom: "-298px" });                  
        }
        if( $('.ccCVVInfoExisting').exists() ) {
            app.util.mOverToolTip( $('.ccCVVInfoExisting'), 'right', app.resources.CC_CVVINFO_TITLE, app.assets.cc_info_cvv, 'cvvInfo', { left: "40px", bottom: "-255px" });                    
        }           
        
        // Expand the gift card/credit card section in case the is already a gift card payment method
        if($('#redemption .header-giftcard').exists() && parseInt($('#redemption .header-giftcard').attr('data-numofgcs')) > 0) {
            $('#giftCardPaymentCheckbox').click();
        }
        
        // Initialize gift options event handlers
        app.paymentAndReview.initGiftOptionEvents();
        
        // Expand credit card section in case the server-side validation failed so the customer
        // can see evantual error messages
        if(window.creditCardValidationResult) {             
            
            var error = $(".additionalCCFields div.form-row span.error-message").filter(function() {
                // as long as there is no cvn parent clear all error spans
                return $(this).parent('input.cvn').length == 0;
            });
            var cvnvalue = jQuery(".additionalCCFields input.cvn").val();
            
            // Additional logic to make IE8 display the CC area
            $('#creditCardPaymentCheckbox').click();
            $('.creditCardInputArea').show();
            
            if( $('.creditCardInputArea .dAddressListContainer .selectPaymentRadioBtn:checked').exists() ) {
                $('.creditCardInputArea .dAddressListContainer .selectPaymentRadioBtn:checked').click();
                
            } else if( $('.creditCardInputArea .dAddressListContainer .addPaymentRadioBtn').exists() ) {
                $('.creditCardInputArea .dAddressListContainer .addPaymentRadioBtn').click();
            }

            if(error){
                $(".cvvInput input.cvn").addClass("error");
            }
            if(cvnvalue){
                jQuery(".cvvInput input.cvn").val(cvnvalue);
            }
            if((window.creditCardValidationResult == 'CREDITCARD_INVALID_CARD_NUMBER') && (app.customerSettings.isRegistered)) {
                $(".dAddressListContainer .addPaymentRadioBtn").click();
            }
            
            // Re-enable checkout continue button
            app.paymentAndReview.setCOContinueBtn(true);
        }
        
        // Initialize multishipping info
        if ($('.form-row input.useAsBillingCheck').is(':checked')) {
            $('.form-row .multishippinginfo').show();
            $('.addressDisplay.billingAddressContent').hide();
        } else {
            $('.form-row .multishippinginfo').hide();
            $('.addressDisplay.billingAddressContent').show();
        }

        // Show multishipping info when useAsBillingAddress checkbox is checked
        $('.form-row input.useAsBillingCheck').on('change', function() {
            $('.form-row .multishippinginfo').toggle(this.checked);
            $('.addressDisplay.billingAddressContent').toggle(!this.checked);
        });
        
        // toggle billing form when applicable
        app.shippingAndBilling.toggleBillingAddress( $('.billingAddressContent') );
        $(app.forms.singleshipping.shippingAddress.useAsBillingAddress).on('change', function() {
            app.shippingAndBilling.toggleBillingAddress( $('.billingAddressContent') );
        });
        
        // Clear new credit card form when new CC radio got selected
        $('input.addPaymentRadioBtn').on('change', function() { 
            app.paymentAndReview.clearNewCCForm();
        });
        
        // Prefill the phone field of the edit billing section for CIS/EE customers
        if( $(app.forms.billing.billingAddress.addressFields.phone).exists() && 
            $(app.forms.billing.billingAddress.addressFields.phone).val() == "" &&
            app.customerSettings.phone ) {
            
            $(app.forms.billing.billingAddress.addressFields.phone).val(app.customerSettings.phone);
        }
    },
    
    /**
     * Clears the new credit card form
     */
    clearNewCCForm: function() {        
        $(app.forms.billing.paymentMethods.creditCard.cvn).val("");
        $(app.forms.billing.paymentMethods.creditCard.cvv).val("");
        $(app.forms.billing.paymentMethods.creditCard.number).val("");
        $(app.forms.billing.paymentMethods.creditCard.month+" option").first().attr("selected", "selected");
        $(app.forms.billing.paymentMethods.creditCard.month).change();
        $(app.forms.billing.paymentMethods.creditCard.year+" option").first().attr("selected", "selected");
        $(app.forms.billing.paymentMethods.creditCard.year).change();
        $(app.forms.billing.paymentMethods.creditCard.type+" option").first().attr("selected", "selected");
        $(app.forms.billing.paymentMethods.creditCard.type).change();
        $(app.forms.billing.paymentMethods.creditCard.owner).val("");
    },
    
    
    /**
     * Credit card checkbox selected and the account has a default credit card...call this function when cc checkbox is selected.
     */
    initializeCCFormWithDefaultCard: function() {
	    // Initialize credit card form in case a default card is selected
	    if( $(".selectPaymentRadioBtn[checked='checked']").exists() ) {
	        app.paymentAndReview.updateBillingFormWith( $(".selectPaymentRadioBtn[checked='checked']") );
	        
	        // Attach CVV field to default credit card, if the default card is not BBCard
	        if( $(app.forms.billing.paymentMethods.creditCard.type).val() != 'BBPLCC' && $(app.forms.billing.paymentMethods.creditCard.type).val() != 'BBCard' ) {
	        	app.paymentAndReview.rearrangeCVV( $('.dAddressListContainer .leftContainer .radioBtn').first() );
	        }
	    }
    },
    
    
    /**
     * Rearranges the CVV field dependant on selected credit card
     */
    rearrangeCVV: function(checkboxElement) {
        var cvvBox = $('.cvvInput.existing-cc');
        var target = $(checkboxElement).parent().parent().find('.rightContainer .minicreditcard-addressdetails');
        
        if(target.find('.cvvInput.existing-cc').length == 0) {
            target.append(cvvBox);
        }
        cvvBox.show();
    },
    
    /**
     * Removes the CVV field if BBPLCC
     */
    removeCVV: function(checkboxElement) {
        var cvvBox = $('.cvvInput.existing-cc');
        var target = $(checkboxElement).parent().parent().find('.rightContainer .minicreditcard-addressdetails');
        
        if(target.find('.cvvInput.existing-cc').length > 0) {
        	cvvBox.hide();
        	$(app.forms.billing.paymentMethods.creditCard.cvn).val("111");
        }
    },
    
    /**
     * Removes the CVV field for new CC form
     */
    removeCVVForNewCC: function(checkboxElement) {
        var cvvBox = $('.cvvInput.existing-cc');
        var target = $(checkboxElement).parent().parent().find('.rightContainer .minicreditcard-addressdetails');
        
        if(target.find('.cvvInput.existing-cc').length > 0) {
        	cvvBox.hide();
        	//$(app.forms.billing.paymentMethods.creditCard.cvn).val("111");
        }
    },
    
    /**
     * Customer selected a billing address in drop down. Show and clear the address form or hide
     * and update it depending on selection.
     */
    handleAddrListSelection: function(e) {
        var select =            $(e.target);
        var addressForm =       $('.editBillingAddressFormAnchor .addressFields.inputSection');
        var selectedAddress =   null;
        
        var salutation =        $(app.forms.billing.billingAddress.addressFields.salutation);
        var firstName =         $(app.forms.billing.billingAddress.addressFields.firstName);
        var lastName =          $(app.forms.billing.billingAddress.addressFields.lastName);
        var address1 =          $(app.forms.billing.billingAddress.addressFields.address1);
        var address2 =          $(app.forms.billing.billingAddress.addressFields.address2);
        var country =           $(app.forms.billing.billingAddress.addressFields.country);
        var city =              $(app.forms.billing.billingAddress.addressFields.city);
        var state =             $(app.forms.billing.billingAddress.addressFields.states.state);
        var postalCode =        $(app.forms.billing.billingAddress.addressFields.zip);
        //var phone =             $(app.forms.singleshipping.shippingAddress.addressFields.phone);
        //var billingPhone =      $(app.forms.billing.billingAddress.addressFields.phone);
        
        if(select != null && select != undefined && select.val() != 'invalid') {
        	
	        // Selection of "create new address", clear and display form
	        if(select.val() == 'createnewaddress') {
	            addressForm.show();
	            
	            //$select.val().remove();
	        }
	        
	        // Selection of an address, copy data to form fields and hide the form
	        else {
	            addressForm.hide();
	            selectedAddress = JSON.parse( select.find('option:selected').attr('data-address') );
	
	            salutation.find("option[value='"+selectedAddress.salutation+"']").attr('selected', true);
	            firstName.val( selectedAddress.firstName );
	            lastName.val( selectedAddress.lastName );
	            address1.val( selectedAddress.address1 );
	            address2.val( selectedAddress.address2 );
	            country.find("option[value='"+selectedAddress.countryCode+"']").attr('selected', true);
	            country.change();
	            city.val( selectedAddress.city );
	            state.find("option[value='"+selectedAddress.stateCode+"']").attr('selected', true);
	            postalCode.val( selectedAddress.postalCode );
	            //phone.val( selectedAddress.phone );
	            //billingPhone.val( selectedAddress.phone );
	        }
        } else {
        	addressForm.hide();
        }
    },
    
    /**
     * Initialize gift options event handlers. Needs to be applied again after an options update,
     * so it has been put in a separate method.
     */
     initGiftOptionEvents: function() {

        // Toggle gift options in minishipments
        if( $('.giftContainer .editLink').exists() ) {
            $('.giftContainer .editLink').on('click', app.paymentAndReview.toggleGiftOptions);
        }
        if( $('.giftContainer .giftEditBtns #cancelGiftOptions').exists() ) {
            $('.giftContainer .giftEditBtns #cancelGiftOptions').on('click', app.paymentAndReview.toggleGiftOptions);
        }     
    },
    
    /**
     * Toggle the gift options display in minishipments
     */
    /*
    toggleGiftOptions: function() {
        $('.giftContainer .editView').toggle();
        $('.giftContainer .readOnlyView').toggle();
    },
    */
    /**
     * Initialization code for gift card section. Separated from other code
     * since this section can be reloaded.
     */
    initGCSection: function() {
        
        if( jQuery("#redemption button.remove").exists() ) {
            jQuery("#redemption button.remove").unbind("click").bind("click", function() {
                var gcId = app.util.trimPrefix(jQuery(this).attr("id"), "rgc-");
                app.paymentAndReview.removeGiftCertificate(gcId);
                
                if($('#redemption .header-giftcard').exists() && parseInt($('#redemption .header-giftcard').attr('data-numofgcs')) > 0) {
                    
                    $('#redemption .header-giftcard').attr('data-numofgcs', parseInt($('#redemption .header-giftcard').attr('data-numofgcs'))-1);
                    
                    if( parseInt($('#redemption .header-giftcard').attr('data-numofgcs')) == 0 &&
                        $('#giftCardPaymentCheckbox').attr('checked') && 
                        $('#giftCardPaymentCheckbox').attr('checked') =='checked') {
                        
                        $('#giftCardPaymentCheckbox').click();
                    }
                }
                
                return false;
            });     
        }
        
        // Hide all other payment options if the current gift cards already cover the full amount
        /*
        if( $('#basketCovered').exists() && $('#basketCovered').val() == "true" ) {
            $('.nonGCSection').hide();
            $('.paymentCovered').show();
            if($('#creditCardPaymentCheckbox').is(':checked')) {
            	$('#creditCardPaymentCheckbox').removeAttr('checked');
            }
        } else {
            $('.nonGCSection').show();
            $('.paymentCovered').hide();
        }
        */
        
        // Disable gift card options by default
        var applyBtn = $(app.forms.billinggiftcert.redeemGiftCert);
        var chkBalanceBtn = $('#checkBalance');
        var applyBtnSpan = $('.wrapper-checkout #giftcardform .formfield.giftcardnumber.code > button span');
        applyBtn.addClass('disabled');
        applyBtnSpan.css('cursor', 'default');
        applyBtn.unbind('click', app.paymentAndReview.redeemGiftCard);

        chkBalanceBtn.addClass('disabled');
        chkBalanceBtn.css('cursor', 'default');
        chkBalanceBtn.unbind('click', app.paymentAndReview.checkGiftCertBalance);
    },
    
    /**
     * Enables / Disables the checkout continue button
     */
    setCOContinueBtn: function(activate) {      
        if(activate === "undefined") { return; }
        var btn = $(app.forms.billing.save);
        if(activate) {
            btn.removeClass("disabled");
            btn.removeClass('disabled2').addClass('activate');
            $('.continueBtnWrapper .disableBtnOverlay').hide();  
        } else {
            btn.addClass('disabled');
            btn.removeClass('activate');
            $('.continueBtnWrapper .disableBtnOverlay').show();     
        }
    },

    /**
     * Set the in the payment methods section displayed credit card icon
     */
    setCreditCardImage: function(ccRadio, type) {
        var cardType = null;

        // Reset credit card icons
        $('.ccIcon .Amex').add('.ccIcon .BBPLCC').add('.ccIcon .BBCard')
        .add('.ccIcon .DinersClub').add('.ccIcon .Discover').add('.ccIcon .JCB')
        .add('.ccIcon .Master').add('.ccIcon .China').add('.ccIcon .Visa').hide();
        
        // Saved credit card handling
        if(!type && ccRadio && ccRadio.find("input[type='radio']").attr('data-ccard')) {
            cardType = JSON.parse( ccRadio.find("input[type='radio']").attr('data-ccard') ).type;

        // New card input form handling
        } else if(type && !ccRadio) {
            cardType = type;
        }   
        
        $('.ccIcon .'+cardType).show();
        
        // } else if(ccRadio.parent().parent().find('.rightContainer .addPaymentMethodDisplay').exists()) {
    },

    /**
     * Check if checked radio button belongs to a saved credit card
     */
    isSavedCreditCard: function(ccRadio) {
        if(!ccRadio) {
            return false;
        }
        if(ccRadio.parent().parent().find('.rightContainer .paymentMethodDisplay').exists()) {
            return true;
        }
        return false;
    },
    
    /**
     * Updates the payment form with a saved credit card
     */
    updateBillingFormWith: function(ccRadio) {
        var addressObj = JSON.parse( ccRadio.parent().find("input[type='radio'].selectPaymentRadioBtn").attr('data-ccard') );
        /*
        $(app.forms.billing.billingAddress.addressFields.salutation).val( addressObj.address.salutation );
        $(app.forms.billing.billingAddress.addressFields.suffix).val( addressObj.address.suffix );
        $(app.forms.billing.billingAddress.addressFields.ID).val( addressObj.address.ID );
        $(app.forms.billing.billingAddress.addressFields.firstName).val( addressObj.address.firstName );
        $(app.forms.billing.billingAddress.addressFields.lastName).val( addressObj.address.lastName );
        $(app.forms.billing.billingAddress.addressFields.address1).val( addressObj.address.address1 );
        $(app.forms.billing.billingAddress.addressFields.address2).val( addressObj.address.address2 );
        $(app.forms.billing.billingAddress.addressFields.city).val( addressObj.address.city );
        $(app.forms.billing.billingAddress.addressFields.zip).val( addressObj.address.postalCode );
        $(app.forms.billing.billingAddress.addressFields.country).val( addressObj.address.country );
        
        // Make sure the correct states are displayed in select
        $(app.forms.billing.billingAddress.addressFields.country).change()
        
        $(app.forms.billing.billingAddress.addressFields.states.state).val( addressObj.address.state );
        $(app.forms.billing.billingAddress.addressFields.phone).val( addressObj.address.phone );
        $(app.forms.singleshipping.shippingAddress.addressFields.phone).val( addressObj.address.phone );
        */
        $(app.forms.billing.paymentMethods.creditCard.month).val( addressObj.month );
        $(app.forms.billing.paymentMethods.creditCard.number).val( addressObj.number );
        if(addressObj.owner !== undefined && addressObj.owner != '' && addressObj.owner != 'null' && addressObj.owner != 'null null') {
        	$(app.forms.billing.paymentMethods.creditCard.owner).val( addressObj.owner );
        }
        else {
        	$(app.forms.billing.paymentMethods.creditCard.owner).val(billingCardHolderName);
        }
        $(app.forms.billing.paymentMethods.creditCard.type).val( addressObj.type );
        $(app.forms.billing.paymentMethods.creditCard.year).val( addressObj.year );
    },
    
    /**
     * Remove unused CVV fields to allow validation
     */
    removeUnusedCVVFields: function() {
        var unusedFieldsCounter = 0;
        var gcPaymentInstruments = $('#giftCardPaymentCheckbox').attr('checked')? true: false;
        var ccPaymentInstruments = $('#creditCardPaymentCheckbox').attr('checked')? true: false;
        var paypalPaymentInstruments = $('#paypalPaymentCheckbox').attr('checked')?true: false;
        
        $('.input-text.cvn.required').each( function( ) {
            if(!$(this).val() && $(this).val() == "") {
                unusedFieldsCounter++;
            }
        });
        
        // Credit card / mixed handling
        if( unusedFieldsCounter != $('.input-text.cvn.required').length ) {
            $('.input-text.cvn.required').each( function( ) {
                if(!$(this).val() && $(this).val() == "") {
                    $(this).remove();
                }
            });         
        }
        
        // Gift card only handling - Remove all credit card specific
        // fields to pass validation.
        if( (gcPaymentInstruments && !ccPaymentInstruments && !paypalPaymentInstruments) ) {
            $(app.forms.billing.paymentMethods.creditCard.type).remove();
            $(app.forms.billing.paymentMethods.creditCard.number).remove();
            //$(app.forms.billing.paymentMethods.creditCard.cvv).remove();
            $(app.forms.billing.paymentMethods.creditCard.month).remove();
            $(app.forms.billing.paymentMethods.creditCard.year).remove();
            $(app.forms.billing.paymentMethods.creditCard.owner).remove();
            //$(app.forms.billing.paymentMethods.creditCard.cvn).remove();
            
            $(app.forms.billing.paymentMethods.creditCard.cvn).val("111");
            $(app.forms.billing.paymentMethods.creditCard.cvv).val("111");
            $(app.forms.billing.paymentMethods.creditCard.isDefault).remove();
            $(app.forms.billing.paymentMethods.selectedPaymentMethodID).val('GIFT_CERTIFICATE');
        } else if (paypalPaymentInstruments) { 
            $(app.forms.billing.paymentMethods.creditCard.type).remove();
            $(app.forms.billing.paymentMethods.creditCard.number).remove();
            //$(app.forms.billing.paymentMethods.creditCard.cvv).remove();
            $(app.forms.billing.paymentMethods.creditCard.month).remove();
            $(app.forms.billing.paymentMethods.creditCard.year).remove();
            $(app.forms.billing.paymentMethods.creditCard.owner).remove();
            //$(app.forms.billing.paymentMethods.creditCard.cvn).remove();
            
            $(app.forms.billing.paymentMethods.creditCard.cvn).val("111");
            $(app.forms.billing.paymentMethods.creditCard.cvv).val("111");
            $(app.forms.billing.paymentMethods.creditCard.isDefault).remove();
            $(app.forms.billing.paymentMethods.selectedPaymentMethodID).val('PayPal');
        } else {  // Make sure credit card is set as payment method otherwise
            $(app.forms.billing.paymentMethods.selectedPaymentMethodID).val('CREDIT_CARD');
        }
        
        // Remove expiration date for Brooks Card
        if ( $(app.forms.billing.paymentMethods.creditCard.type).exists() && $(app.forms.billing.paymentMethods.creditCard.type).val() == 'BBPLCC' ) {
            $(app.forms.billing.paymentMethods.creditCard.year + ' option:last').attr('selected', true);
            $(app.forms.billing.paymentMethods.creditCard.month + ' option:last').attr('selected', true);
        }
                
        // Adjust CVV error messages (if applicable)
        if( app.customerSettings.isRegistered && app.paymentAndReview.currentCCArea && app.paymentAndReview.currentCCArea.parent() ) {
            $('form.checkout-billing').valid();
            var cvvError = $("span[for='dwfrm_billing_paymentMethods_creditCard_cvn']");
            var cvvContainer = app.paymentAndReview.currentCCArea.parent().parent();
            if(cvvError.exists()) {
                if(!cvvContainer.find(cvvError).exists()) {
                    cvvContainer.find(app.forms.billing.paymentMethods.creditCard.cvn).parent().append(cvvError);
                    cvvContainer.find(app.forms.billing.paymentMethods.creditCard.cvn).addClass("error");
                }
            } else {
                cvvContainer.find(app.forms.billing.paymentMethods.creditCard.cvn).removeClass("error");
            }
        }
    },
    
    /**
     * Checks if the given gift card is valid. Client side validation only based on given pattern.
     * @param Number The Gift Card number
     * @param PIN The Gift Card PIN
     * @return TRUE if number and PIN are valid, FALSE otherwise
     */
    validateGiftCard: function(number, pin) {
        if(!number || !pin) {
            return false;
        }
        
        var numberRegExp = new RegExp( app.constants.GC_NUMBER_REGEXP );
        var pinRegExp = new RegExp( app.constants.GC_PIN_REGEXP );
        
        if( numberRegExp.exec(number) && pinRegExp.exec(pin) ) {
            return true;
        }
        
        return false;
    },
    
    /**
     * Redeem a gift card
     * @param giftCertificateId Gift Card Number
     * @param giftCertificatePin Gift Card PIN
     */
    redeemGiftCard: function(giftCertificateId, giftCertificatePin) {
        $('.wrapper-checkout #giftcardform .balance').hide();
        var giftCertificateId = $(app.forms.billinggiftcert.giftCertCode).val();
        var giftCertificatePin = $(app.forms.billinggiftcert.giftCertCodePin).val();
        
        //alert("The Method redeemGiftCert :: giftCertificateID + ["+giftCertificateId+"]\n giftCertificatePin ["+giftCertificatePin+"]\n app.urls.giftCertRedeem ["+app.urls.giftCertRedeem+"]");
        app.paymentAndReview.setGiftCertError(null);
        app.paymentAndReview.setGiftCertBalanceInfo(null);
        // nothing entered
        if(!giftCertificateId && !giftCertificatePin) {
            jQuery('.giftcardnumber.card-no input').addClass("error");
            jQuery('.giftcardnumber.code input').addClass("error");
            app.paymentAndReview.setGiftCertError(app.resources.BILLING_GC_MISSINGNUMBERANDPIN);
            return;
        }
        if(!giftCertificateId) {
            jQuery('.giftcardnumber.card-no input').addClass("error");
            app.paymentAndReview.setGiftCertError(app.resources.BILLING_GC_MISSINGID);
            return;
        }
        if(!giftCertificatePin) {
            jQuery('.giftcardnumber.code input').addClass("error");
            app.paymentAndReview.setGiftCertError(app.resources.BILLING_GC_MISSINGPIN);
            return;
        }
        // Canada gift Card
        if ((giftCertificateId >= '6006492610000000000') && (giftCertificateId<= '6006492610249999999'))
        {
        	 jQuery(".applybutton").attr('disabled', true);
             jQuery(".applybutton").addClass('white-bg-btn');
             jQuery('.giftcardnumber.card-no input').addClass("error");
             app.paymentAndReview.setGiftCertError(app.resources.BILLING_GC_CANADA);
             return;
        } 
        
        // Canadian Gift Card Merchandise Credit
        if ((giftCertificateId >= '6006492610250000000') && (giftCertificateId <= '6006492610499999999'))
        {
            jQuery(".applybutton").attr('disabled', true);
            jQuery(".applybutton").addClass('white-bg-btn');
            jQuery('.giftcardnumber.card-no input').addClass("error");
            app.paymentAndReview.setGiftCertError(app.resources.BILLING_GC_MERCHANDISE_CANADA);
            return;
        
        } 
        
        
        // attempt to redeem
        var url = app.util.appendParamToURL(app.urls.giftCertRedeem, "giftCertificateID", giftCertificateId);
        url = app.util.appendParamToURL(url,"giftCertificatePin",giftCertificatePin);
        var result = app.ajax.getJson({
            url: url,
            callback: function(data) {
                if(!data) {
                    app.paymentAndReview.setGiftCertError(app.resources.BILLING_GC_INVALID);
                    return false;
                }
                if(data.redemptionErrorMsg) {
                    if(data.insufficientBalance) {
                        app.paymentAndReview.setGiftCertError(data.redemptionErrorMsg, data.insufficientBalance);
                    } else {
                        app.paymentAndReview.setGiftCertError(data.redemptionErrorMsg);
                    }
                    return false;
                }
                if(!data.redemption)
                {
                    if (data.giftcertError)
                    {
                        app.paymentAndReview.setGiftCertError(data.giftcertError.StatusMessage);
                    } else {
                        app.paymentAndReview.setGiftCertError(app.resources.BILLING_GC_INVALID);
                    }
                    return false;
                }
                // empty input field and pin field and display redemption in UI
                jQuery("input[name=dwfrm_billinggiftcert_giftCertCode]").val("");
                jQuery("input[name=dwfrm_billinggiftcert_giftCertCodePin]").val("");
                
                // Update applied Gift Cards
                $.ajax({
                    type     : "POST",
                    url      : app.urls.updateGiftCardSection,
                    success  : function(data) {
                        if(data) {
                            $('.giftcardsshow')[0].innerHTML = data;
                            
                            // Enable/Disable continue button based on gift card balance
                            /*
                            if( ($('#basketCovered').exists() && $('#basketCovered').val() == "true") || $('#creditCardPaymentCheckbox').attr('checked') ) {
                                app.paymentAndReview.setCOContinueBtn(true);
                            } else {
                                app.paymentAndReview.setCOContinueBtn(false);
                            }
                            */ 
                        }
                        
                        // Reinitialize gift card event handlers
                        app.paymentAndReview.initGCSection();
                        
                        // Update summary
                        app.checkoutCommon.updateSummary();
                        
                        // Check gift card checkbox in case it's not yet
                        if( !$('#giftCardPaymentCheckbox').attr('checked') ) {
                            $('#giftCardPaymentCheckbox').click();
                        }
                    }
                });
            }
        });
    },
    
    /**
     * Render given error message for Gift Card area
     */
    setGiftCertError: function(msg, dontDisableCheckBalance) {
        if(!msg) {
            jQuery("#giftcertentry span.errormessage").remove();
            return;
        }
        jQuery("#giftcertentry").append("<span class=\"errormessage\">" + msg + "<\/span>");

        app.Omniture.reportExistingErrors("client");
        
        // Disable "Apply" and "Check Balance" controls
        var applyBtn = $(app.forms.billinggiftcert.redeemGiftCert);
        var applyBtnSpan = $('.wrapper-checkout #giftcardform .formfield.giftcardnumber.code > button span');
        var chkBalanceBtn = $('#checkBalance');
        
        applyBtn.addClass('disabled');
        applyBtnSpan.css('cursor', 'default');
        applyBtn.unbind('click', app.paymentAndReview.redeemGiftCard);      

        // Disable check balance, too if not explicitely desired
        if(!dontDisableCheckBalance) {
            chkBalanceBtn.addClass('disabled');
            chkBalanceBtn.css('cursor', 'default');
            chkBalanceBtn.unbind('click', app.paymentAndReview.checkGiftCertBalance);
        }
    },
    
    /**
     * Show Gift Card balance
     */
    setGiftCertBalanceInfo: function(amountExpr) {
        if(!amountExpr) {
            $('.wrapper-checkout #giftcardform .balance .inner .text .value').empty();
            return;
        }
        $('.wrapper-checkout #giftcardform .balance .inner .text .value').text(amountExpr);
    },
    
    /**
     * Check the gift certificate balance
     */
    checkGiftCertBalance: function(e) {
        e.preventDefault();
        var giftCertificateId = jQuery("input[name=dwfrm_billinggiftcert_giftCertCode]").val();
        var giftCertificatePin = jQuery("input[name=dwfrm_billinggiftcert_giftCertCodePin]").val();
        
        $('.wrapper-checkout #giftcardform .balance').hide();
        app.paymentAndReview.setGiftCertError(null);
        app.paymentAndReview.setGiftCertBalanceInfo(null);
        // nothing entered
        if(!giftCertificateId && !giftCertificatePin) {
            jQuery('.giftcardnumber.card-no input').addClass("error");
            jQuery('.giftcardnumber.code input').addClass("error");
            app.paymentAndReview.setGiftCertError(app.resources.BILLING_GC_MISSINGNUMBERANDPIN);
            return;
        }
        if(!giftCertificateId) {
            jQuery('.giftcardnumber.card-no input').addClass("error");
            app.paymentAndReview.setGiftCertError(app.resources.BILLING_GC_MISSINGID);
            return;
        }
        if(!giftCertificatePin) {
            jQuery('.giftcardnumber.code input').addClass("error");
            app.paymentAndReview.setGiftCertError(app.resources.BILLING_GC_MISSINGPIN);
            return;
        }
        
        
        // Canada gift Card
        if ((giftCertificateId >= '6006492610000000000') && (giftCertificateId<= '6006492610249999999'))
        {
        	 jQuery(".applybutton").attr('disabled', true);
             jQuery(".applybutton").addClass('white-bg-btn');
             jQuery('.giftcardnumber.card-no input').addClass("error");
             app.paymentAndReview.setGiftCertError(app.resources.BILLING_GC_CANADA);
             return;
        } 
        
        // Canadian Gift Card Merchandise Credit
        if ((giftCertificateId >= '6006492610250000000') && (giftCertificateId <= '6006492610499999999'))
        {
            jQuery(".applybutton").attr('disabled', true);
            jQuery(".applybutton").addClass('white-bg-btn');
            jQuery('.giftcardnumber.card-no input').addClass("error");
            app.paymentAndReview.setGiftCertError(app.resources.BILLING_GC_MERCHANDISE_CANADA);
            return;
        
        } 
        
        // load gift certificate details
        var url = app.util.appendParamToURL(app.urls.giftCertBalance, "giftCertificateID", giftCertificateId);
        url = app.util.appendParamToURL(url,"giftCertificatePin",giftCertificatePin);
        var result = app.ajax.getJson({
            url: url,
            callback: function(data) {
                if(!data || !data.giftCertificate) {
                    if (data && data.giftcertError) {
                        app.paymentAndReview.setGiftCertError(data.giftcertError.StatusMessage);
                    } else {
                        app.paymentAndReview.setGiftCertError(app.resources.BILLING_GC_INVALID);
                    }
                    return false;
                }
                // display details in UI
                $('.wrapper-checkout #giftcardform .balance').show();
                app.paymentAndReview.setGiftCertBalanceInfo(data.giftCertificate.balance);
            }
        });
        
        return false;
    },
    
    setGiftCertRedemptionInfo: function(giftCertificateId, amountExpr) {
        if(!giftCertificateId || !giftCertificateId) {
            return;
        }
        jQuery("#gc-"+giftCertificateId).parent().remove();
        jQuery("#redemption ol").append("<li><div class=\"success giftcertpi\" id=\"gc-" + giftCertificateId + "\"><span class=\"giftcardsshownumber\">" + giftCertificateId + "</span><span class=\"giftcardsshowsum\">" + amountExpr + "</span><span class=\"giftcardsshowbtn\"><button type=\"submit\" name=\"" + gcButtonName + "\" value=\"" + app.resources["REMOVESHORT"] + "\" id=\"rgc-" + giftCertificateId + "\" class=\"remove\" ><span>" + app.resources["REMOVESHORT"] + "</span></button></span></div></li>").parent().find("div.header-giftcard").show();
        hasGiftCard = true;
        jQuery(".addPaymentMethodDisplay input.required").addClass("requiredifnogc");
        jQuery(".addPaymentMethodDisplay input.requiredifnogc").removeClass("required");
        bindGiftCertificateRemoval();
    },
    
    removeGiftCertificate: function(giftCertificateId) {
        jQuery(".balance").hide();
        // remove gift certificate
        var url = app.util.appendParamToURL(app.urls.giftCertRemove, "giftCertificateID", giftCertificateId);
        var result = app.ajax.getJson({
            url: url,
            callback: function(data) {
                if(!data || !data.giftCertificate || !data.giftCertificate.removed) {
                    setGiftCertError(app.resources.BILLING_GC_ERROR);
                    return false;
                }
                // remove message in UI
                jQuery("#gc-"+giftCertificateId).parent().remove();

                if (!$("#redemption ol li")[0]) {
                    $("#redemption .header-giftcard").hide();
                    hasGiftCard = false;
                    jQuery(".addPaymentMethodDisplay input.requiredifnogc").addClass("required");
                }
                
                // Toggle other payment
                if(data && data.fullyCovered !== "undefined") {                 
                    $('#basketCovered').val(""+data.fullyCovered);
                    app.paymentAndReview.initGCSection();
                    
                    if( data.fullyCovered ) {
                        app.paymentAndReview.setCOContinueBtn(true);
                    } else {
                        
                        if( $('#creditCardPaymentCheckbox').attr('checked') && $('#creditCardPaymentCheckbox').attr('checked') =='checked' ) {
                            app.paymentAndReview.setCOContinueBtn(true);
                        } else if( $('#paypalPaymentCheckbox').attr('checked') && $('#paypalPaymentCheckbox').attr('checked') =='checked' ) { 
                            jQuery(".cntButton").hide();
                        	app.paymentAndReview.setCOContinueBtn(true);
                        	jQuery(".nonGCSection").hide();
                        }
                        else {
                            app.paymentAndReview.setCOContinueBtn(false);
                        }
                    }   
                }
                
                // Update summary
                app.checkoutCommon.updateSummary();
            }
        });
    },
    
    /**
     * Clears all gift certificates and reloads the gift certificate area.
     */
    removeAllGiftCertificates: function() {
        $.ajax({
            type     : "POST",
            url      : app.urls.giftCertRemoveAll,
            success  : function(data) {
                
                // Clean up gift card section
                $('#giftcardform .giftcertpi').parent().remove();
                $('#basketCovered').val("false");
                $("#redemption .header-giftcard").hide();
                jQuery(".addPaymentMethodDisplay input.requiredifnogc").addClass("required");
                
                // Update view
                app.paymentAndReview.initGCSection();
                if( $('#creditCardPaymentCheckbox').attr('checked') ) {
                    app.paymentAndReview.setCOContinueBtn(true);
                } else {
                    app.paymentAndReview.setCOContinueBtn(false);
                }               
                app.checkoutCommon.updateSummary();
            }
        });
    },
    
    togglePayPal: function() {
        $.ajax({
            type     : "GET",
            url      : app.urls.paypalLoginStatus,
            dataType : "json",
            success  : function (ajaxResponse) {
            	if (ajaxResponse != null) {
	                if (ajaxResponse.loginstatus === "false") {
	                	$("#paypalPaymentCheckbox").attr('checked', false);
	                	$('.paypalfunding').hide();
	                	$('.nonGCSection').show();
	                	$('.cntButton').show();
	                } 
            	}
            }
        });
    },
    
    /**
     * Hide the CVV and expiration date fields and set its value to 111 to pass validation
     */
    hideAdditionalCCFields: function() {
        if( $('.numberAndCVV .cvv').exists() ) {
            $('.numberAndCVV .cvv').hide();
            $(app.forms.billing.paymentMethods.creditCard.cvn).val("111");
        }
        if( $('.expirationCCFields').exists() ) {
            $('.expirationCCFields').hide();
        }       
    },
    
    /**
     * Hide the CVV field and set its value to 111 to pass validation
     */
    hideCVVField: function() {
        if( $('.numberAndCVV .cvv').exists() ) {
            $('.numberAndCVV .cvv').hide();
            $(app.forms.billing.paymentMethods.creditCard.cvn).val("111");
        }
    },
    
    /**
     * Show the CVV and expiration date fields and clear the CVVs value
     */
    showAdditionalCCFields: function() {
        if( $('.numberAndCVV .cvv').exists() ) {
            $('.numberAndCVV .cvv').show();
            $(app.forms.billing.paymentMethods.creditCard.cvn).val("");
        }
        if( $('.expirationCCFields').exists() ) {
            $('.expirationCCFields').show();
        }
    },
    
    /**
     * Toggle mini billing address display
     */
    toggleBillingAddressMini: function() {
        
        if( $(app.forms.singleshipping.shippingAddress.useAsBillingAddress).attr("checked") ) {
            $('.mini-billing-address.order-component-block').hide();
            $('.billingAddressContent.mini').hide();
        } else {
            if($('.shippingMiniDisplay .mini-billing-address.order-component-block').exists()) {
                $('.mini-billing-address.order-component-block').show();
                $('.billingAddressContent.mini').hide();
            } else {
                $('.mini-billing-address.order-component-block').hide();
                $('.billingAddressContent.mini').show();
            }
        }
    }
};

app.account = {
    $cache : {},
        
    /**
     * Initialization code
     */
    init : function () {
        app.account.initializeEvents();
        app.account.syncHeightAccountSection();

        // Remembered Items
        app.product.tile.initNsAccount();
        app.RememberedItems.Account.initButtons();

        // ContactUs page
        app.ContactUs.init();
        
        // Add error display to address select box on payment methods page
        /*
        $('.account-payment-formaction #applyBtn').on('click', function(e) {

            if( $(app.forms.paymentinstruments.creditcards.newbillingaddress.addressFields.firstName).val() == "" ) {               
                $(app.forms.paymentinstruments.creditcards.addressList+"_chzn").addClass("error")
                e.preventDefault()
                return false;
                
            } else {
                $(app.forms.paymentinstruments.creditcards.addressList+"_chzn").removeClass("error")
            }
        });
        $(app.forms.paymentinstruments.creditcards.addressList).on('change', function() {
            $(app.forms.paymentinstruments.creditcards.addressList+"_chzn").removeClass("error")
        });
        */
    },

    /**
     * Private class methods
     */
    initializeAddressForm: function(form) {
        var form = $("#edit-address-form");

        form.find("input[name='format']").remove();
        //$("<input/>").attr({type:"hidden", name:"format", value:"ajax"}).appendTo(form);

        form.on("click", ".apply-button", function(e) {
            var addressId = form.find("input[name$='_addressid']");
            addressId.val(addressId.val().replace(/[^\w+-]/g, "-"));
            if (!form.valid()) {
                return false;
            }

            app.dialog.close();
            app.page.refresh();
        })
        .on("click", ".cancel-button", function(e){
            e.preventDefault();
            app.dialog.close();
        })
        .on("click", ".delete-button", function(e){
            e.preventDefault();
            $goTo = $(this).attr("href");
            app.ModalMessage(String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_ADDRESS), function() { window.location = $goTo; });
        });

        $cache.countrySelect = form.find("select[id$='_country']");
        $cache.countrySelect.on("change", function(){
            app.util.updateStateOptions(this);
        });

        app.validator.init();
    },

    toggleFullOrder: function() {
        $('.order-items')
            .find('li.hidden:first')
                .prev('li')
                    .append('<a class="toggle">View All</a>')
                    .children('.toggle')
                        .click(function() {
                            $(this).parent().siblings('li.hidden').show();
                            $(this).remove();
                        });
    },

    initAddressEvents: function() {
    	var addresses = $("#addresses");
        if (addresses.length===0) { return; }
        
        addresses.on("click", "a.address-create", function(e){
            e.preventDefault();
            var options = {open: initializeAddressForm};
            app.dialog.open({url:this.href, options:options});
        });
        
        addresses.on("click", ".delete", function(e){
            e.preventDefault();
            $goTo = $(this).attr("href");
            app.ModalMessage(String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_ADDRESS), function() { window.location = $goTo; });
        });
    },

    addressLoad: function() {
        // select address from list
        app.account.$cache.addressList.on("change", function () {

            var selected = $(this).children(":selected").first();
            var data = $(selected).data("address");

            if (!data) { return; }
            var p;
            for (p in data) {
                if (app.account.$cache[p] && data[p]) {
                    app.account.$cache[p].val(data[p].replace("^","'"));

                    //workaround to manually trigger change event attached to select boxes
                    //allowing to update the label of the custom select box
                    if(app.account.$cache[p][0].nodeName == 'SELECT') {
                        app.account.$cache[p].change();
                    }

                    // special handling for countrycode => stateCode combo
                    if (app.account.$cache[p] === app.account.$cache.countryCode) {
                        app.util.updateStateOptions(app.account.$cache[p]);
                        app.account.$cache.stateCode.val(data.stateCode);
                        app.account.$cache.stateCode.trigger("change");
                    }

                }
            }

            // re-validate the form
            app.account.$cache.addressForm.validate().form();
        });

        // update state options in case the country changes
        app.account.$cache.countryCode.on("change", function () {
            app.util.updateStateOptions(this);
        });

    },

    initPaymentEvents: function() {
        app.account.addressLoad();
        var paymentList = $(".payment-list");
        if (paymentList.length===0) { return; }

        app.util.setDeleteConfirmation(paymentList, String.format(app.resources.CONFIRM_DELETE, app.resources.TITLE_CREDITCARD));

        $("form[name='payment-remove']").on("submit", function(e){
            var button = $(this).find("button.delete");
            $("<input/>").attr({type:"hidden", name:button.attr("name"), value:button.attr("value")||"delete card"}).appendTo($(this));
        });
    },

    initRememberedItemsEvents: function() {
        if ( app.account.$cache.rememberedItemsGrid.size() > 0 ) {

            app.account.$cache.rememberedItemsGrid.on("click", "a#viewpage-layout1col", function (e) {
                if ( ! $(this).hasClass("active") ) {
                    $.cookie('rialternatelayout', 'y', { expires: 365, path: '/' });
                    app.RememberedItems.Account.reloadProductGrid(function() {
                        app.account.$cache.rememberedItemsGrid.removeClass("layout3cols").addClass("layout1col");
                        $("a#viewpage-layout1col").addClass("active");
                        $("a#viewpage-layout3cols").removeClass("active");
                    });
                }

                e.preventDefault();
            });

            app.account.$cache.rememberedItemsGrid.on("click", "a#viewpage-layout3cols", function (e) {
                if ( ! $(this).hasClass("active") ) {
                    $.cookie('rialternatelayout', 'n', { expires: 365, path: '/' });
                    app.RememberedItems.Account.reloadProductGrid(function() {
                        app.account.$cache.rememberedItemsGrid.removeClass("layout1col").addClass("layout3cols");
                        $("a#viewpage-layout3cols").addClass("active");
                        $("a#viewpage-layout1col").removeClass("active");
                    });
                }

                e.preventDefault();
            });

            $("select#sort-by-p1").on("change", function() {
                var $sOptP1 = $("select#sort-by-p1");
                var $sOptP2 = $("select#sort-by-p2");
                var optP1   = $sOptP1.find("option:selected").val();
                var optP2   = "";

                $sOptP1.attr("disabled", "disabled").trigger("liszt:updated");
                $sOptP2.attr("disabled", "disabled").trigger("liszt:updated");

                app.RememberedItems.Account.sortProductGrid(optP1, optP2, function() {
                    var newP2Opts = $("div#remembereditems-productgrid-datawrapper").data("sortByP2");
                    $sOptP2.empty();
                    $.each(newP2Opts, function(index, item) {
                        $sOptP2.append( $("<option>").attr("value", item.value).html(item.label) );
                    });

                    $sOptP1.removeAttr("disabled").trigger("liszt:updated");
                    $sOptP2.removeAttr("disabled").trigger("liszt:updated");
                });
            });

            $("select#sort-by-p2").on("change", function() {
                var $sOptP1 = $("select#sort-by-p1");
                var $sOptP2 = $("select#sort-by-p2");
                var optP1   = $sOptP1.find("option:selected").val();
                var optP2   = $sOptP2.find("option:selected").val();

                $sOptP1.attr("disabled", "disabled").trigger("liszt:updated");
                $sOptP2.attr("disabled", "disabled").trigger("liszt:updated");

                app.RememberedItems.Account.sortProductGrid(optP1, optP2, function() {
                    $sOptP1.removeAttr("disabled").trigger("liszt:updated");
                    $sOptP2.removeAttr("disabled").trigger("liszt:updated");
                });
            });
        }
    },

    initUpdateEmailSubscriptionEvents: function() {
        var isAccountRegister = $("form#RegistrationForm").size()     > 0;
        var isAccountEdit     = $("form#MailSubscriptionForm").size() > 0;

        if ( !(isAccountRegister || isAccountEdit) ) {
            return;
        }

        $(document).on("change", "div.mail-subscribed input", function(e) {
            if ( !$(this).is(":checked") ) {
                $("div.mail-subscribtion input").each(function(index) {
                    if ( $(this).is(":checked") ) { $(this).click(); }
                });
            }
        }).on("change", "div.mail-subscribtion input", function(e) {
            var $mSubscribed   = $("div.mail-subscribed input").first();
            var $mSubscription = $(this);

            if ( $mSubscription.is(":checked") && !$mSubscribed.is(":checked") ) {
                $mSubscribed.click();
            }
        });

        $('#profile-cis').parent().find("input[type='checkbox']").on('change', function(e) {
            if ( $(this).is(":checked") ) {
                $('#profile-cis').show();
                jQuery('.form-row.zipcode input').addClass('registrationZip');
                jQuery('.form-row.zipcode input').valid();
            }
            else {
                $("#profile-cis").hide();
                $("#dwfrm_profile_customer_membershipnumber").removeClass("error").val("");
                jQuery(".form-row.zipcode input").removeClass("registrationZip");
                jQuery(".form-row.zipcode input").valid();
            }
        })
    },

    initializeCache: function() {
        app.account.$cache.addressForm          = $("form#CreditCardForm");
        app.account.$cache.addressList          = app.account.$cache.addressForm.find(".select-address select[id$='_addressList']");
        app.account.$cache.salutation           = app.account.$cache.addressForm.find("select[name$='_salutation']");
        app.account.$cache.firstName            = app.account.$cache.addressForm.find("input[name$='_firstName']");
        app.account.$cache.lastName             = app.account.$cache.addressForm.find("input[name$='_lastName']");
        app.account.$cache.suffix               = app.account.$cache.addressForm.find("select[name$='_suffix']");
        app.account.$cache.companyName          = app.account.$cache.addressForm.find("input[name$='_companyName']");
        app.account.$cache.address1             = app.account.$cache.addressForm.find("input[name$='_address1']");
        app.account.$cache.address2             = app.account.$cache.addressForm.find("input[name$='_address2']");
        app.account.$cache.city                 = app.account.$cache.addressForm.find("input[name$='_city']");
        app.account.$cache.postalCode           = app.account.$cache.addressForm.find("input[name$='_zip']");
        app.account.$cache.phone                = app.account.$cache.addressForm.find("input[name$='_phone']");
        app.account.$cache.countryCode          = app.account.$cache.addressForm.find("select[id$='_country']");
        app.account.$cache.stateCode            = app.account.$cache.addressForm.find("select[id$='_state']");
        app.account.$cache.ID                   = app.account.$cache.addressForm.find("input[name$='_ID']");
        app.account.$cache.accountLandingContent= $('div.account-landingcontent');
        app.account.$cache.rememberedItemsGrid  = $("div#remembereditems-productgrid");
    },
    
    initializeEvents: function() {
        app.account.toggleFullOrder();
        app.account.initAddressEvents();
        app.account.initializeCache();
        app.account.initPaymentEvents();
        app.account.initRememberedItemsEvents();
        app.account.initUpdateEmailSubscriptionEvents();
    },

    syncHeightAccountSection: function() {
        var $accountOptions = app.account.$cache.accountLandingContent.find('ul.account-options li .syncheight');
        if ($accountOptions.size() > 0) {
            $accountOptions.syncHeight();
        }
    },
    
    /**
     * Payment methods logic
     */
    paymentMethods: {
        
        /**
         * Initialization code
         */
        /*
    	init: function() {
            $(app.forms.paymentinstruments.creditcards.addressList).on('change', app.account.paymentMethods.toggleAddressForm);
            // To display address form , if there is no saved addresses in addressbook
            var addbook = $("#pdict.CurrentCustomer.profile.addressBook.addresses");
            if(addbook.size() == 0)
                {
                var formAnchor          = $('.selectAddressFormAnchor');
                formAnchor.show();
                }
        },
        */
    
        /**
         * Toggle the address form basing on current state.
         */
        /*
        toggleAddressForm: function(e) {
            var addressForm         = $(e.target);
            var formAnchor          = $('.selectAddressFormAnchor');
            var newAddressIndicator = $('#newAddressIndicator');
            
            if( addressForm.val() == 'createnewaddress' ) {
                formAnchor.show();
                newAddressIndicator.val('true');
            } else {
                formAnchor.hide();
                newAddressIndicator.val('false');
            }
        }
        */
    }
};

/*
 * Validation for account registration
 * @ checkout/confirmation/confirmationregister.isml
 *
 */

app.confirmationRegister = (function() {

    function form() {
        return {
            self: this.form,
            cancel: this.cancel,
            salut: this.salut,
            psswd: this.psswd,
            psswdconfirm: this.psswdconfirm,
            submit: this.submit,
            username: this.username,
            noMatch: this.noMatch,
            missingSalut: this.missingSalut,
            checkAccDup: this.checkAccDup
        }
    }

    function delegate(events) {

        var form = this;

        for(name in events) {
            (function(form, name, events) {
                var event = name.split('-')[0],
                node = form[name.split('-')[1]];

                form.self.delegate(event, node, function(e) { events[name].call(form, e); });

            })(form, name, events);
        }

    }

    function error(node, message) {

        var validator = this.self.validate(app.validator.settings),
            name = node.name;
        validator.showErrors({name : message});

    }

    var events = {

        'click-cancel': function(e) {

            e.preventDefault();
            $('.resetpassword').dialog('close');

        },

        'blur-username': function(e) { this.self.find('.usernameerror').hide(); },

        'blur-psswdconfirm': function(e) {

            if(this.psswd.val() !== this.psswdconfirm.val()) {
                error.call(this, this.psswdconfirm, this.noMatch);
            }
        },

        'click-submit': function(e) {

            e.preventDefault();

            var form = this;

            form.self.validate();

            if(form.salut.val() === '') {
                form.salut.next().addClass('error');
                error.call(form, form.salut, form.missingSalut);
                return;
            }

            var request = form.checkAccDup + '?userName=' + form.username.val();

            if(form.self.valid()) {
                $.post(request, function(data) {
                    if(!data.customerExists) {
                        form.self.submit();
                    } else {
                        form.self.find('.usernameerror').show();
                    }
                });
            }
        },

        'change-salut': function(e) { this.salut.next().removeClass('error'); },

        'keydown-psswd': function(e) { if(e.keyCode === 32) e.preventDefault(); },

        'keydown-psswdconfirm': function(e) { if(e.keyCode === 32) e.preventDefault(); }

    };

    return {

        register: function(nodes) {

            var form = form.call(nodes);

            form.psswd.addClass('passwordInput');
            form.psswdconfirm.addClass('passwordInput');

        }

    }

})();

function UpdatePreview() {
	var $specialHandling = $(".specialhandling");
    var imgUrl      = "";
    var fLetter = $specialHandling.find("select.first option:selected").val();
    var mLetter = $specialHandling.find("select.second option:selected").val(); 
    var tLetter = $specialHandling.find("select.third option:selected").val();
    var pStyle      = "";
    var pPrevParams = "";
    var pCharOrder  = "";
    var pColor      = "";
    var initialString = fLetter + mLetter + tLetter;
    
    if(initialString != ""){
    	// Initials Exist
    	$('#monogram-initials').val(initialString);
    } else {
    	/*Initials Empty
    	fLetter = "A";
        mLetter = "B";
        tLetter = "C";
        $specialHandling.find("select.first").val(0);
        $specialHandling.find("select.second").val(0);
        $specialHandling.find("select.third").val(0);*/
    }
    
    var $styleAnchor = $specialHandling.find("ul.swatches.Style > li.selected > a.monogram");
    if ($styleAnchor.size() > 0) {
        if (imgUrl == "") {
            imgUrl = $styleAnchor.attr("data-urlbase");
        }

        pStyle = $styleAnchor.attr("data-urlid");

        var $inputStyle = $styleAnchor.find("> input[type='radio']:first");
        if ($inputStyle.size() > 0) {
            pPrevParams = typeof $inputStyle.attr("data-prevparams") != "undefined" ? $inputStyle.attr("data-prevparams") : "";
            pCharOrder  = typeof $inputStyle.attr("data-charorder")  != "undefined" ? $inputStyle.attr("data-charorder")  : "";
        }
    }

    var $colorAnchor = $specialHandling.find("ul.swatches.Color > li.selected > a.monogram");
    if ($colorAnchor.size() > 0) {
        if (imgUrl == "") {
            imgUrl = $colorAnchor.attr("data-urlbase");
        }

        var $inputColor = $colorAnchor.find("> input[type='radio']:first");
        if ($inputColor.size() > 0) {
            pColor = $inputColor.attr("data-colorcode");
        }
    }

    if (pCharOrder != "") {
        var chars = new Array();
        chars[0] = fLetter;
        chars[1] = mLetter;
        chars[2] = tLetter;

        var indexes = new Array(1, 2, 3);
        for (var i = 0; i < 3 && i < pCharOrder.length; i++) {
            var n = parseInt(pCharOrder.charAt(i));
            if(n != NaN) {
                indexes[i] = n;
            }
        }

        fLetter = chars[ indexes[0] - 1 ];
        mLetter = chars[ indexes[1] - 1 ];
        tLetter = chars[ indexes[2] - 1 ];
    }
    
    if(initialString != ""){
    	// Initials Exist
    	imgUrl += ("?$color=" + pColor);
        imgUrl += (",off&$swatch=BrooksBrothers/" + pStyle);
        imgUrl += ("&$initL=" + fLetter);
        imgUrl += ("&$initC=" + mLetter);
        imgUrl += ("&$initR=" + tLetter);
        imgUrl += pPrevParams;
    } else {
    	imgUrl += ("?$color=" + pColor);
        imgUrl += (",off&$swatch=BrooksBrothers/" + pStyle);
        imgUrl += ("&$initL=" + "A");
        imgUrl += ("&$initC=" + "B");
        imgUrl += ("&$initR=" + "C");
        imgUrl += pPrevParams;
    }

    /*imgUrl += ("?$color=" + pColor);
    imgUrl += (",off&$swatch=BrooksBrothers/" + pStyle);
    imgUrl += ("&$initL=" + fLetter);
    imgUrl += ("&$initC=" + mLetter);
    imgUrl += ("&$initR=" + tLetter);
    imgUrl += pPrevParams;*/

    $("#SpecialHandlingPreview").find("> div:first").html(
        $("<img>").attr({src : imgUrl})
    );
    
    //update header preview
    /*
    $('.summary-monogram').css("color", "#" + pColor);
    
    var CurrInitials = ""; 
	$('.summary-monogram').empty();
	var CurrInitials = $(".specialhandling").find("#monogram-initials").val();
	$('.summary-monogram').append(CurrInitials); 
	*/
}

function UpdatePreviewTyping() {
	var $specialHandling = $(".specialhandling");
    var imgUrl      = "";
    var fLetter;
    var mLetter; 
    var tLetter;
    var pStyle      = "";
    var pPrevParams = "";
    var pCharOrder  = "";
    var pColor      = "";
    var Initials    = "";
    var EachInitial = "";

    Initials = $specialHandling.find("#monogram-initials").val();
    var EachInitial = Initials.split("");
    fLetter = EachInitial[0];
    mLetter = EachInitial[1];
    tLetter = EachInitial[2];
    
    if (fLetter == undefined) {
        fLetter = "";
    }
    if (mLetter == undefined) {
        mLetter = "";
    }
    if (tLetter == undefined) {
        tLetter = "";
    } 
    
    if (fLetter + mLetter + tLetter == "") {
        fLetter = "A";
        mLetter = "B";
        tLetter = "C";
    }
    
    /*
    if(Initials == ""){
    	$('button#apply-and-close').removeClass('active');
    } else {
    	$('button#apply-and-close').addClass('active');
    }
    */
    
    var $styleAnchor = $specialHandling.find("ul.swatches.Style > li.selected > a.monogram");
    if ($styleAnchor.size() > 0) {
        if (imgUrl == "") {
            imgUrl = $styleAnchor.attr("data-urlbase");
        }

        pStyle = $styleAnchor.attr("data-urlid");

        var $inputStyle = $styleAnchor.find("> input[type='radio']:first");
        if ($inputStyle.size() > 0) {
            pPrevParams = typeof $inputStyle.attr("data-prevparams") != "undefined" ? $inputStyle.attr("data-prevparams") : "";
            pCharOrder  = typeof $inputStyle.attr("data-charorder")  != "undefined" ? $inputStyle.attr("data-charorder")  : "";
        }
    }

    var $colorAnchor = $specialHandling.find("ul.swatches.Color > li.selected > a.monogram");
    if ($colorAnchor.size() > 0) {
        if (imgUrl == "") {
            imgUrl = $colorAnchor.attr("data-urlbase");
        }

        var $inputColor = $colorAnchor.find("> input[type='radio']:first");
        if ($inputColor.size() > 0) {
            pColor = $inputColor.attr("data-colorcode");
        }
    }

    if (pCharOrder != "") {
        var chars = new Array();
        chars[0] = fLetter;
        chars[1] = mLetter;
        chars[2] = tLetter;

        var indexes = new Array(1, 2, 3);
        for (var i = 0; i < 3 && i < pCharOrder.length; i++) {
            var n = parseInt(pCharOrder.charAt(i));
            if(n != NaN) {
                indexes[i] = n;
            }
        }

        fLetter = chars[ indexes[0] - 1 ];
        mLetter = chars[ indexes[1] - 1 ];
        tLetter = chars[ indexes[2] - 1 ];
    }

    imgUrl += ("?$color=" + pColor);
    imgUrl += (",off&$swatch=BrooksBrothers/" + pStyle);
    imgUrl += ("&$initL=" + fLetter);
    imgUrl += ("&$initC=" + mLetter);
    imgUrl += ("&$initR=" + tLetter);
    imgUrl += pPrevParams;

    $("#SpecialHandlingPreview").find("> div:first").html(
        $("<img>").attr({src : imgUrl})
    );
    
    //update header preview
    /*
    $('.summary-monogram').css("color", "#" + pColor);
    
    var CurrInitials = ""; 
	$('.summary-monogram').empty();
	var CurrInitials = $(".specialhandling").find("#monogram-initials").val();
	$('.summary-monogram').append(CurrInitials); 
    */
    
    $specialHandling.find("select.first").val(fLetter);
	$specialHandling.find("select.second").val(mLetter);
	$specialHandling.find("select.third").val(tLetter);
	
}

function SubmitSpecialHandling() {
	var $specialHandling = $(".specialhandling");
    var imgUrl      = "";
    var pStyle      = "";
    var pPrevParams = "";
    var pCharOrder  = "";
    var pColor      = "";
    var Initials    = "";
    var EachInitial = "";
    var fLetter = "";
    var mLetter = "";
    var tLetter = "";
    
    Initials = $specialHandling.find("#monogram-initials").val();
    //alert("Initials "+ Initials);
    if(Initials != ""){
    	EachInitial = Initials.split("");
    	fLetter = EachInitial[0];
    	mLetter = EachInitial[1];
    	tLetter = EachInitial[2];
    	$specialHandling.find("select.first").val(fLetter);
    	$specialHandling.find("select.second").val(mLetter);
    	$specialHandling.find("select.third").val(tLetter);
    } else {
    	fLetter = "A";
    	mLetter = "B";
    	tLetter = "C";
    }
    


    var $styleAnchor = $specialHandling.find("ul.swatches.Style > li.selected > a.monogram");
    if ($styleAnchor.size() > 0) {
        if (imgUrl == "") {
            imgUrl = $styleAnchor.attr("data-urlbase");
        }

        pStyle = $styleAnchor.attr("data-urlid");

        var $inputStyle = $styleAnchor.find("> input[type='radio']:first");
        if ($inputStyle.size() > 0) {
            pPrevParams = typeof $inputStyle.attr("data-prevparams") != "undefined" ? $inputStyle.attr("data-prevparams") : "";
            pCharOrder  = typeof $inputStyle.attr("data-charorder")  != "undefined" ? $inputStyle.attr("data-charorder")  : "";
        }
    }

    var $colorAnchor = $specialHandling.find("ul.swatches.Color > li.selected > a.monogram");
    if ($colorAnchor.size() > 0) {
        if (imgUrl == "") {
            imgUrl = $colorAnchor.attr("data-urlbase");
        }

        var $inputColor = $colorAnchor.find("> input[type='radio']:first");
        if ($inputColor.size() > 0) {
            pColor = $inputColor.attr("data-colorcode");
        }
    }

    if (pCharOrder != "") {
        var chars = new Array();
        chars[0] = fLetter;
        chars[1] = mLetter;
        chars[2] = tLetter;

        var indexes = new Array(1, 2, 3);
        for (var i = 0; i < 3 && i < pCharOrder.length; i++) {
            var n = parseInt(pCharOrder.charAt(i));
            if(n != NaN) {
                indexes[i] = n;
            }
        }

        fLetter = chars[ indexes[0] - 1 ];
        mLetter = chars[ indexes[1] - 1 ];
        tLetter = chars[ indexes[2] - 1 ];
    }

    imgUrl += ("?$color=" + pColor);
    imgUrl += (",off&$swatch=BrooksBrothers/" + pStyle);
    imgUrl += ("&$initL=" + fLetter);
    imgUrl += ("&$initC=" + mLetter);
    imgUrl += ("&$initR=" + tLetter);
    imgUrl += pPrevParams;

    $("#SpecialHandlingPreview").find("> div:first").html(
        $("<img>").attr({src : imgUrl})
    );
    
    //update header preview
    $('.summary-monogram').css("color", "#" + pColor);
    
    var CurrInitials = ""; 
	$('.summary-monogram').empty();
	var CurrInitials = $(".specialhandling").find("#monogram-initials").val();
	$('.summary-monogram').append(CurrInitials); 
	
	//fLetter = $specialHandling.find("select.first option:selected").val();
    //mLetter = $specialHandling.find("select.second option:selected").val();
    //tLetter = $specialHandling.find("select.third option:selected").val();
	
}

function EnvelopeCopyAddressTyping(){
	if($('.envelope-checkbox').hasClass('checked')){
		$(".envelope-address").find("input").each(function () {
	        var jqInput = $(this);
	        var sheetid = jqInput.attr("id").replace("envelope", "sheet");
	        var copyValue = jqInput.parents("ul.to-expand").find("input#" + sheetid).val();
	        jqInput.val(copyValue);
	        if(copyValue != "" && copyValue != jqInput.attr("placeholder")){
	            jqInput.removeClass("placeholder");
	        }
	    });
	}
};


/*
 * Enables the pagination selector
 */

app.pageIndexSelector = (function(_class){

    function extract() { 
        var e = {}; 
        for(var a=0; a<arguments.length; a++) {
            var name = arguments[a]; 
            e[name] = (this) ? $(this).data(name) : ''; 
        }
        return e; 
    }

    var s = $('.' + _class) || 0,
        query = extract.apply(s, ['href', 'size', 'viewall']);

    function select() {
        if(query.href.length < 1) return;
        location.href = query.href + '&sz=' + query.size + '&start=' + $(this).val();
    }
    
    return {
        init: function() { 
            if(!s) return;
            s.change(function() { select.call(this); });
        },
    
        autoEnabled: function() { return query.viewall; }
    }

})('pgindxselector');

;