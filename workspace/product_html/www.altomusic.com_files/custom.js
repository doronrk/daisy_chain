function previewInit(){
    jQuery('.product .product-image-wrapper.onhover').bind('mouseenter',function() {
        var pos = jQuery(this).parent().position();
        var width = jQuery(this).outerWidth();
        var width1 = jQuery(this).parent().next(".preview").outerWidth();
        jQuery(this).parent().addClass('hover');
        var width2 = width1 - width;
        jQuery(this).parent().next(".preview").css({
            top: pos.top + 10 + "px",
            left: (pos.left - width2 + 30) + "px"
        });
        jQuery(this).parent().next(".preview.small").css({
            top: pos.top + 10 + "px",
            left: (pos.left - width2 + 30) + "px"
        });

        jQuery(".preview").hide();
        jQuery(this).parent().next(".preview").show();
        //jQuery(this).parent().next(".preview").css({        "display": "inline-block"    });
    });

    jQuery('.preview').bind('mouseleave',function() {
        jQuery('.product').removeClass('hover');
        jQuery(this).stop().hide();
        $cur_prev=jQuery(this);
        jQuery('.big_image a img',this).attr('src',jQuery('.big_image a img',this).attr("data-rel"));


    });

    jQuery(".preview a.image").bind('mouseenter',function() {
        var image = jQuery(this).attr("data-rel");
        jQuery(this).parent().next().find('.big_image a img').attr('src',image);
        return false;
    });
}
var getDevicePixelRatio = function() {
    if (window.devicePixelRatio === undefined) { return 1; }
    return window.devicePixelRatio;
}
function retinaProducts(){
    if (getDevicePixelRatio() > 1)
    {
        jQuery('.product-retina').each(function(){
            jQuery(this).attr('src',jQuery(this).attr('data-image2x'));
        });
    }
}
jQuery(document).ready(function() {
    retinaProducts();
    previewInit();

    jQuery("#header .shoppingcart .fadelink").bind({
        mouseenter: function(e) {
            jQuery(this).find(".shopping_cart_mini").stop(true, true).fadeIn(200, "linear");
            jQuery('#search_autocomplete').hide();
        },
        mouseleave: function(e) {
            jQuery(this).find(".shopping_cart_mini").stop(true, true).fadeOut(200, "linear");
        },
    });

    jQuery(".collapse").collapse();

    jQuery("select.custom").selectbox();

    jQuery("#footer").hover(function() {
        if (jQuery("#footer_popup").hasClass("allowHover") && jQuery("#footer_popup").css('position') == 'absolute') {
            jQuery('#footer_popup').stop(true, false).slideDown(300);
            jQuery(this).find("i.icon-up").addClass("icon-down");
        }
    }, function() {
        if (jQuery("#footer_popup").hasClass("allowHover") && jQuery("#footer_popup").css('position') == 'absolute') {
            jQuery('#footer_popup').stop(true, false).slideUp(100);
            jQuery(this).find("i.icon-up").removeClass("icon-down");
        }
    });

    jQuery('div.noHover').hover(function() {
        jQuery('#footer_popup').toggleClass("allowHover");
    });

    jQuery("#right_toolbar").hide();
	
    jQuery(function() {
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > 150) {
                jQuery('#right_toolbar').fadeIn();
            } else {
                if (jQuery("#right_toolbar .shopping_cart_mini").css("display") == "block") { jQuery("#right_toolbar .shopping_cart_mini").fadeOut();}
                jQuery('#right_toolbar').fadeOut();
            }
        });

        jQuery('#back-top a').hover(function() {
            jQuery(this).stop().animate({
                "opacity": 0.6
            });
        }, function() {
            jQuery(this).stop().animate({
                "opacity": 1
            });
        });

        jQuery('#back-top a').click(function() {
            jQuery('body,html').animate({
                scrollTop: 0
            }, 400);
            return false;
        });
    });



    jQuery('.flexslider.small').flexslider({
        animation: "slide",
        pauseOnHover: true,
        controlNav: false,
        prevText: "<i class='icon-left-thin'></i>",
        nextText: "<i class='icon-right-thin'></i>"

    });



    jQuery('#topline .fadelink, .header_v_2 .fadelink').hover(function() {
        jQuery(this).find(".ul_wrapper").stop(true, true).fadeToggle(200, "linear");
    });

    jQuery("#right_toolbar .shoppingcart").bind('mouseenter',function() {
        jQuery(".shopping_cart_mini",this).stop(true, true).fadeIn(200, "linear");
    });

    jQuery("#right_toolbar .shoppingcart").bind('mouseleave',function() {
        jQuery(".shopping_cart_mini",this).stop(true, true).fadeOut(200, "linear");
    });



    jQuery(".login_block .login_link").mouseenter(function() {
        jQuery(this).parent().find(".form-login-wrapper").stop(true, false).fadeIn(200, "linear");
    });

    jQuery(".login_block .form-login-wrapper").mouseenter(function() {
        jQuery(this).stop(true, true).fadeIn(0);
		jQuery(this).addClass("active");
    });

    jQuery(".login_block .login_link").mouseleave(function() {
        jQuery(this).parent().find(".form-login-wrapper").stop(true, false).fadeOut(200, "linear");
    });
	
	jQuery('.login_block .form-login-wrapper input').focusout(function(){
		if (!jQuery(".login_block .form-login-wrapper").hasClass("active")) {
			jQuery(".form-login-wrapper").stop(true, false).fadeOut(200, "linear");
		}
	});
    jQuery(".login_block .form-login-wrapper").mouseleave(function() {
			jQuery(this).removeClass("active");
		if (!jQuery(".login_block .form-login-wrapper input").is(":focus")) {
			jQuery(this).stop(true, false).fadeOut(200, "linear");
		}
    });




    jQuery("#right_toolbar .form-search ").mouseenter(function() {
        jQuery('#right_toolbar .form-search input').animate({
            right: 48,
            width: 275
        }, 300);
    });
    jQuery("#right_toolbar .form-search ").mouseleave(function() {
        jQuery('#right_toolbar .form-search input').stop(true, false).animate({
            right: 20,
            width: 0
        }, 300);
    });


    jQuery('#myTab a').click(function(e) {
        e.preventDefault();
        jQuery(this).tab('show');
    })



    jQuery(".es-nav-prev").hover(function() {
        if (!jQuery(this).hasClass("disable")) {
            jQuery(this).parent().parent().find(".small_preview.prev").stop(true, true).fadeToggle(400, "linear");
        }
    });

    jQuery(".es-nav-next").hover(function() {
        if (!jQuery(this).hasClass("disable")) {
            jQuery(this).parent().parent().find(".small_preview.next").stop(true, true).fadeToggle(400, "linear");
        }
    });
    jQuery('.es-nav-prev').mouseleave(function() {
        jQuery(".small_preview.prev").stop(true, true).fadeOut(100, "linear");
    });

    jQuery('.es-nav-next').mouseleave(function() {
        jQuery(".small_preview.next").stop(true, true).fadeOut(100, "linear");
    });

    jQuery(".direction-nav a.prev").hover(function() {
        jQuery(this).parent().find(".small_preview.prev").stop(true, true).fadeToggle(400, "linear");
    });
    jQuery(".direction-nav a.next").hover(function() {
        jQuery(this).parent().find(".small_preview.next").stop(true, true).fadeToggle(400, "linear");
    });

    jQuery(".flexslider.vertical .flex-prev").hover(function() {
        if (!jQuery(this).hasClass("disabled")) {
            jQuery(this).parent().parent().parent().find(".small_previews .small_preview.prev").stop(true, true).fadeToggle(400, "linear");
        }
    });
    jQuery(".flexslider.vertical .flex-next").hover(function() {
        if (!jQuery(this).hasClass("disabled")) {
            jQuery(this).parent().parent().parent().find(".small_previews .small_preview.next").stop(true, true).fadeToggle(400, "linear");
        }
    });

    jQuery('.carousel_prev').mouseleave(function() {
        jQuery(this).parent().parent().find(".small_preview.prev").stop(true, true).fadeOut(100, "linear");
    });

    jQuery('.carousel_next').mouseleave(function() {
        jQuery(this).parent().parent().find(".small_preview.next").stop(true, true).fadeOut(100, "linear");
    });

   


    jQuery('#column_left .block:last').addClass('last');


    jQuery('.review_scroll a').click(function(){



        jQuery('html, body').animate({
            scrollTop: jQuery('#myTab').offset().top
        }, 500);

        jQuery('a[href=#tab2]').click();

    });

    /*buttons fix*/
    jQuery('p.back-link > a').addClass('button');

});
jQuery(window).resize(function() {
    jQuery(".collapse").collapse();
    jQuery(".preview").hide();
    jQuery(".small_preview").hide();
    jQuery(".shopping_cart_mini").hide();
    jQuery(".form-login-wrapper").hide();

});

