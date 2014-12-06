var websiteurl = 'http://www.eyeslipsface.com/'
var contenturl  = 'http://content.eyeslipsface.com/'

$(document).ready(function() {

	$("a.fancybox").fancybox({
        'overlayColor'	: '#000000',
		'overlayOpacity' : .8,
		'titleShow' : false
    });
	
	$('.hdr_details_content .close').click( function(){       
		createHeaderDetails('');
	 });
	  
    jQuery('.hdr_details_holder').bind("mouseleave",function() { 
        createHeaderDetails('');
    });
	inputReseter($('#villain_zip'), 'enter zip');
	inputReseter($('.search input'), 'SEARCH NOW');
	inputReseter($('.search input'), 'SEARCH');  
	inputReseter($('#btm_bar li input'), 'Get offers, sign up today!');
	if ($('#hp_signup_form').length > 0) { inputReseter($('#hp_signup_form input'), 'enter email to get exclusive offers'); }
	inputReseter($('.homepage-footer-signup input'), 'ENTER EMAIL');
	
	 
	$('.search input').val('');
	animate_search_field()   
	 
	 $('#shop_nav li').hover(function() {
	 	if ($(this).find(".shop_subnav").length > 0 ) { 
			//$(this).find(".shop_subnav").css('display', 'block');
			$(this).find(".shop_subnav").slideDown("slow");
			$(this).addClass("shop_nav_over");
		}
	 }, function() {
	 	if ($(this).find(".shop_subnav").length > 0 ) { 
			//$(this).find(".shop_subnav").css('display', 'none');
			$(this).find(".shop_subnav").hide();
			$(this).removeClass("shop_nav_over");
		}
	 });
	 
	if ($('#slideup').length > 0 ) { 
	 	$('#slideup').animate({ bottom: '+=150'}, 5000);
		
		$('#slideup .close').click(function() {
			$('#slideup').fadeOut("fast");
		});
	}
	
	
	if ($('#slideupx').length > 0 ) { 
	 	$('#slideupx').fadeIn("1500");
		
		$('#slideupx .close').click(function() {
			$('#slideupx').fadeOut("fast");
		});
	}
		
	if($('#hp_slides_div').length>0  ){   
		 
		$('#hp_slides_lst .hp_slides').each( function(i, val) {  
			if ($(this).find('#hp_slide_img_' + $(this).attr("id")).length == 0) { 
				  var theImg = $(this).find('#hp_slide_src_' + $(this).attr("id")).val(); 
				  $(this).prepend('<img src="' + theImg + '" usemap="#hp_feature_' + $(this).attr("id") + '" id="hp_slide_img_' + $(this).attr("id") + '">');
			}
		});  
		
		i = setTimeout("hp_banner_slids()", 5000 ); 
		
		$('#hp_slide_steps ul li').click(
			function() {
			clearTimeout(i);
			
			var divNum = $(this).attr("id")
			divNum = divNum.replace("hp_slide_steps_","");
			
			var $active = $('#hp_slides_lst div.active-banner');
	
		    if ( $active.length == 0 ) $active = $('#hp_slides_lst div:last');
		 
		    var $next =  $('#hp_slides_lst #'+ divNum);
			
			if ($($next).find('#hp_slide_img_' + $next.attr("id")).length == 0) { 
				  var theImg = $($next).find('#hp_slide_src_' + $next.attr("id")).val();
				  $next.prepend('<img src="' + theImg + '" usemap="#hp_feature_' + $next.attr("id") + '" id="hp_slide_img_' + $next.attr("id") + '">');
			}
			
		    $active.addClass('last-active-banner');
		
		    $next.css({opacity: 0.0})
		        .addClass('active-banner')
		        .animate({opacity: 1.0}, 1000, function() {
		            $active.removeClass('active-banner last-active-banner');
		        });
				 
			$('#hp_slide_steps ul li').css("background-image", "url(http://content.eyeslipsface.com/images/slider-dot.png)"); 
			$('#hp_slide_steps_' + $next.attr("id")).css("background-image", "url(http://content.eyeslipsface.com/images/slider-dot-on.png)");  
		});
	
	
		
	};
	
	if($('#gifts2014_slides_div').length>0  ){   
		 
		$('#gifts2014_slides_lst .gifts2014_slides').each( function(i, val) {  
			if ($(this).find('#gifts2014_slide_img_' + $(this).attr("id")).length == 0) { 
				  var theImg = $(this).find('#gifts2014_slide_src_' + $(this).attr("id")).val(); 
				  $(this).prepend('<img src="' + theImg + '" usemap="#gifts2014_feature_' + $(this).attr("id") + '" id="gifts2014_slide_img_' + $(this).attr("id") + '">');
			}
		});  
		
		i = setTimeout("gifts2014_banner_slids()", 5000 ); 
		
		$('#gifts2014_slide_steps ul li').click(
			function() {
			clearTimeout(i);
			
			var divNum = $(this).attr("id")
			divNum = divNum.replace("gifts2014_slide_steps_","");
			
			var $active = $('#gifts2014_slides_lst div.active-banner');
	
		    if ( $active.length == 0 ) $active = $('#gifts2014_slides_lst div:last');
		 
		    var $next =  $('#gifts2014_slides_lst #'+ divNum);
			
			if ($($next).find('#gifts2014_slide_img_' + $next.attr("id")).length == 0) { 
				  var theImg = $($next).find('#gifts2014_slide_src_' + $next.attr("id")).val();
				  $next.prepend('<img src="' + theImg + '" usemap="#gifts2014_feature_' + $next.attr("id") + '" id="gifts2014_slide_img_' + $next.attr("id") + '">');
			}
			
		    $active.addClass('last-active-banner');
		
		    $next.css({opacity: 0.0})
		        .addClass('active-banner')
		        .animate({opacity: 1.0}, 1000, function() {
		            $active.removeClass('active-banner last-active-banner');
		        });
				 
			$('#gifts2014_slide_steps ul li').css("background-image", "url(http://content.eyeslipsface.com/images/slider-dot.png)"); 
			$('#gifts2014_slide_steps_' + $next.attr("id")).css("background-image", "url(http://content.eyeslipsface.com/images/slider-dot-on.png)");  
		});
	
	
		
	};


	if ($('#hp_mag_offer').length > 0 ) {
 		$("#hp_mag_offer").fancybox({  
			'href'			:	'magPopup.asp?display=2', 
			'overlayColor'	: '#000000',
			'overlayOpacity' : .8,
			'titleShow' : false
		});
	} 

	if($('#faq_list').length>0  ){    
		$('#faq_list').find('.question').click(function() {
			$(this).siblings('.answer').toggle("fast");
		});
			
	}
	
	
	if($('.dept-main-list').length>0  ){    
		
		$(".dept-main-list li .bar").click(function() {  
			document.location.href = $(this).siblings('.img').find('a').attr("href");
		});
		
		$(".dept-main-list li .name").click(function() {  
			document.location.href = $(this).siblings('.img').find('a').attr("href");
		});
	}
	
	
	if($('.faqs').length>0  ){    
		$('.faqs').find('.question').click(function() { 
			if ($(this).hasClass("over")) {
				$(this).removeClass("over");
				$(this).siblings('.answer').slideUp("fast"); 
			} else {
				$(this).addClass("over");
				$(this).siblings('.answer').slideDown("fast"); 
			}
		});
	}
	
	if( $('.as-seen-in-nav').length>0  ){    
		
		$(".as-seen-in-nav .nav").click(function() { 
			document.location.href = $(this).find("a").attr("href");
		});
	}	
	
	if( $('.as-seen-in-nav .filters').length>0  ){    
		
		$(".as-seen-in-nav .filters select").change(function() {  
			var selectedFilter = $(this).attr("name");
			
			$(".as-seen-in-nav .filters select").each(function() {
				if ($(this).attr("name") != selectedFilter) {  
					$(this).find("option:eq(0)").attr("selected","selected");  
				};
			});
			document.as_seen_in_form.submit();
		});
	}	
	
	if( $('.as-seen-in-main').length>0  ){    
	
		var num_mags = $("#as-seen-in-top-scroll .items .item").length + 1;
		$("#as-seen-in-top-scroll .items").css("width", num_mags * 120 + 'px');
		$("#as-seen-in-btm-scroll .items").css("width", num_mags * 980 + 'px'); 
		
	 	$("#as-seen-in-btm-scroll .scrollable").scrollable();
		
		var AsSeenInScroll = $("#as-seen-in-btm-scroll .scrollable").data("scrollable");
		AsSeenInScroll.onSeek(function() {
			var review_location = $("#as-seen-in-btm-scroll .scrollable .items .item:eq(" + this.getIndex() + ")").find("#review_location").val();
			
			if (review_location != '') {
				$('.as-seen-in-reviews .content').hide(); 
				$('.as-seen-in-reviews .content').load('asseenin.asp?review_location=' + review_location, function(){
					$('.as-seen-in-reviews .content').fadeIn("fast");
					});
			} else {
				$('.as-seen-in-reviews .content').html('No reviews found');
			}
			
			$("#as-seen-in-top-scroll .scrollable .items .item .mag").fadeTo("fast", "0.4");  
			$("#as-seen-in-top-scroll .scrollable .items .item .mag:eq(" + this.getIndex() + ")").fadeTo("fast", "1.0");   
		}) 
		
		
		$("#as-seen-in-btm-scroll .scrollable .items .item").find(".social").hover(function() { 
			$(this).fadeTo("fast", "1.0");   
		}, function() {
			$(this).fadeTo("fast", "0.4");  
		});  
		
		$("#as-seen-in-top-scroll .scrollable").scrollable();
	 	var AsSeenInTopScroll = $("#as-seen-in-top-scroll .scrollable").data("scrollable"); 
		var size = 8;
		if( $('.as-seen-in-main .tv').length>0  ){ size = 5 }
		 
		AsSeenInTopScroll.onBeforeSeek(function(event, index) {  
			if (this.getIndex() >= this.getSize() - size) {  
				if (index > this.getIndex()) { 
					return false;  
				} 
		
			}  
		}); 

  
		$("#as-seen-in-top-scroll .scrollable .items .item").hover(function() {
			$(this).find(".mag").fadeOut("fast"); 
			$(this).find(".product").fadeIn("fast");
		}, function() {
			$(this).find(".product").fadeOut("fast");
			$(this).find(".mag").fadeIn("fast"); 
		});
		
		$("#as-seen-in-top-scroll .scrollable .items .item .mag:first").fadeTo("fast", "1.0");   
		
		$("#as-seen-in-top-scroll .scrollable .items .item").click(function() {
			var item_index = $(this).index();  
			//$("#as-seen-in-btm-scroll .scrollable").scrollable().seekTo(item_index, "400")
			AsSeenInScroll.seekTo(item_index, "400") 
		});
	}
	
	if( $('.as-seen-in-main-testimonials').length>0  ){    
		inputReseter($('.form-fields #name'), 'Name');
		inputReseter($('.form-fields #location'), 'Location'); 
		inputReseter($('.form-fields #message'), 'Message'); 
	}
	if( $('#feedback_form').length>0  ){    
		
		inputReseter($('.form-fields #email_address'), 'EMAIL (required)'); 
		inputReseter($('.form-fields #message'), "WHAT'S ON YOUR MIND?"); 
	}
	if( $('#promo_emiliem').length>0  ){    
		inputReseter($('#first_name'), 'First Name');
		inputReseter($('#last_name'), 'Last Name');
		inputReseter($('#email'), 'Email');
		inputReseter($('.friends_email'), 'Friend’s email'); 
		  
	}
	
	if( $('.facebook_login').length>0  ){  
	
		$('#btn_returning_customer').mouseenter(function() {
			$('.facebook_login #signin_main #new_customers_form').css("display","none");
			$('.facebook_login #signin_main #returning_customers_form').fadeIn("fast");
			$('.facebook_login #signin_main').fadeIn("fast");
		});
		
		$('#btn_new_customer').mouseenter(function() {
			$('.facebook_login #signin_main #returning_customers_form').css("display","none");
			$('.facebook_login #signin_main #new_customers_form').fadeIn("fast");
			$('.facebook_login #signin_main').fadeIn("fast");
		});
		
		$('.facebook_login #signin_main').mouseleave (function() { 
			$('.facebook_login #signin_main').fadeOut("fast");
		});
		  
	}
	 
	 
	 if( $('.cart-gift-header').length>0  ){  
	
		$('.cart-gift-header.open').click(function() {
			if ($('.cart-gift-open').css("display") == "none") { // show gift message and card upsell
				$('.cart-gift-header .add').html("- ADD A SPECIAL MESSAGE AND/OR A GIFT CARD");
				$('.cart-gift-open').slideDown("fast");
				if ($('.cart-gift-closed').length > 0) { $('.cart-gift-closed').slideUp("fast"); }
			} else {
				$('.cart-gift-header .add').html("+ ADD A SPECIAL MESSAGE AND/OR A GIFT CARD");
				$('.cart-gift-open').slideUp("fast");
				if ($('.cart-gift-closed').length > 0) { $('.cart-gift-closed').slideDown("fast"); }
			}
		});
		
		$('.cart-gift-closed .edit').click(function() { 
			if ($('.cart-gift-open').css("display") == "none") { // show gift message and card upsell 
				$('.cart-gift-closed').slideUp("fast");
				$('.cart-gift-open').slideDown("fast"); 
			}
		});
		
		$('.cart-gift-open .box .form textarea').keyup(function() { 
			if ($('.cart-gift-open .box .form textarea').val().length > 68) {
				alert('Your message must be less than 70 characters'); 
			}  
		});
	}
	
	
	if ($('.dept-left ul').length > 0  ){   
		
		$('.dept-left ul.depts .depts-arrow').click(function() {   
			 
			if ($(this).siblings("ul.sub-depts").css("display") == "none") {  
				$(this).siblings("ul.sub-depts").slideDown("fast"); 
				$(this).addClass("on");
			} else {   
				$(this).removeClass("on");
				$(this).siblings("ul.sub-depts").slideUp("fast", function() {	
					$(this).parents(".on").removeClass("on"); 
				});
				
			}
		});
		
		$('.dept-left ul.sub-depts .sub-depts-arrow').click(function() {   
			  
			if ($(this).siblings("ul.sub-sub-depts").css("display") == "none") {  
				$(this).siblings("ul.sub-sub-depts").slideDown("fast"); 
				$(this).addClass("on");
			} else {   
				$(this).removeClass("on");
				$(this).siblings("ul.sub-sub-depts").slideUp("fast", function() {	
					$(this).parents("ul.sub-depts.on").removeClass("on"); 
					$(this).parents("li.on").removeClass("on"); 
				});
				
			}
		});
	}
	
	if ($('.product-left .tabs').length > 0  ){   
		$(".product-left .tabs" ).tabs();
	}
	
	if (window.location.protocol == 'https:') {
		  websiteurl = 'https://www.eyeslipsface.com/'
	}  
		  
    $.ajax({
        type: 'POST',
        async: false,
          
		  
        url: websiteurl + 'get-cart-items.asp',
        success: function (data) {
            $('#cart-info').html(data);
        }
    });
	
	
    $.ajax({
        type: 'POST',
        async: false,
               
        url: websiteurl + 'myaccount-header-links.asp',
        success: function (data) {
            $('#my-account-links').html(data);
        }
    }); 
	
}); 


function createHeaderDetails(theID) {    
	if (theID  == '') { 
		$('.hdr_details_holder').hide(false);
	
	} else {
		$('.hdr_details_content .content').children().css('display', 'none');
		$('.hdr_details_content .content').find('#' + theID).css('display','inline');
		$('.hdr_details_holder').show();
	}
}
 

function inputReseter(jqObj, iniVal) {
    $(jqObj).focus(function () {
        value = $(this).val();
        if (value == iniVal) {
            $(this).val('');
        } else {
            // user has ented input, do nothing
        }
    });
    $(jqObj).blur(function () {
        if ($(this).val() === '') {
            $(this).val(iniVal);
        } else {
            // user has ented input, do nothing
        }
    });
}

function hp_banner_slids() {
 	var $active = $('#hp_slides_lst div.active-banner');

    if ( $active.length == 0 ) $active = $('#hp_slides_lst div:last');
 
    var $next =  $active.next().length ? $active.next()
        : $('#hp_slides_lst div:first');
  
    $active.addClass('last-active-banner');
	
    $next.css({opacity: 0.0})
        .addClass('active-banner')
        .animate({opacity: 1.0}, 1000, function() {
            $active.removeClass('active-banner last-active-banner');
        });
		 
	$('#hp_slide_steps ul li').css("background-image", "url(http://content.eyeslipsface.com/images/slider-dot.png)"); 
	$('#hp_slide_steps_' + $next.attr("id")).css("background-image", "url(http://content.eyeslipsface.com/images/slider-dot-on.png)"); 
	
	i = setTimeout("hp_banner_slids()", 5000 );
}

function gifts2014_banner_slids() {
 	var $active = $('#gifts2014_slides_lst div.active-banner');

    if ( $active.length == 0 ) $active = $('#gifts2014_slides_lst div:last');
 
    var $next =  $active.next().length ? $active.next()
        : $('#gifts2014_slides_lst div:first');
  
    $active.addClass('last-active-banner');
	
    $next.css({opacity: 0.0})
        .addClass('active-banner')
        .animate({opacity: 1.0}, 1000, function() {
            $active.removeClass('active-banner last-active-banner');
        });
		 
	$('#gifts2014_slide_steps ul li').css("background-image", "url(http://content.eyeslipsface.com/images/slider-dot.png)"); 
	$('#gifts2014_slide_steps_' + $next.attr("id")).css("background-image", "url(http://content.eyeslipsface.com/images/slider-dot-on.png)"); 
	
	i = setTimeout("gifts2014_banner_slids()", 5000 );
}
function animate_search_field() { 
	
	setTimeout(function() {if ($('.search #sli_search_1:focus').length == 0 ) {$('.search #sli_search_1').val('SEARCH')}}, 1000);
	setTimeout(function() {if ($('.search #sli_search_1:focus').length == 0 ) {$('.search #sli_search_1').val('SEARCH NOW')}}, 1500); 
	 
	if (document.location.protocol=="https:") {
		setTimeout(function() {$('.search input:image').attr('src','images/nav_search_btn_on.gif')}, 2000);  
		setTimeout(function() {$('.search input:image').attr('src','images/nav_search_btn.gif')}, 3000);  
	} else {
		setTimeout(function() {$('.search input:image').attr('src','http://content.eyeslipsface.com/images/nav_search_btn_on.gif')}, 2000);  
		setTimeout(function() {$('.search input:image').attr('src','http://content.eyeslipsface.com/images/nav_search_btn.gif')}, 3000);  
	}
}

function checkGiftMsg() {
	if ($('.cart-gift-open .box .form textarea').val().length > 70) {
		alert('Your message is too long, it must be less than 70 characters');
		return false;
	} else {
		return true;
	}
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}



