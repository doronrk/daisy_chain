jQuery(document).ready(function() {
    /*Navigation JS*/
    jQuery(".menu-icon").click(function() {
        jQuery(this).next(".accordion").toggle();
    });

    /*Footer Accordion Mobile*/
    jQuery(".links-head").click(function() {
        if(jQuery(this).hasClass("active")){
            jQuery(this).next("ul").css("display","none");
            jQuery(".links-head").removeClass("active");
        }
        else{
            jQuery(".links-head").next("ul").css("display","none");
            jQuery(this).next("ul").css("display","block");
            jQuery(".links-head").removeClass("active");
            jQuery(this).addClass("active");
        }
    });

    /*Header Fedex content show hide*/
    if (jQuery(window).width() < 970){
        jQuery(".head-txt").click(function() {
            if(jQuery(".fedex-content").css('display')=='none') {
                jQuery(".fedex-content").css('display','block');
            } else if(jQuery(".fedex-content").css('display')=='block') {
                jQuery(".fedex-content").css('display','none');
            }
        });
    }
    else{
        jQuery(".fedex-content").css("display","block");
        jQuery(".head-txt").click(function() {
            jQuery(".fedex-content").css("display","block");
        });
    }
    jQuery(".click").click(function() {
        if(jQuery(window).width() <= 639){
            if(jQuery(".open-panel").css('display')=='none') {
                jQuery(".open-panel").css('display','block');
            } else if(jQuery(".open-panel").css('display')=='block') {
                jQuery(".open-panel").css('display','none');
            }
        }
    });
    /*Left Menus on Product List page*/
    jQuery(".side-menu-panel .head").click(function() {
        jQuery(".left-nav-section").toggle();
        jQuery(".head-left").toggle();
        jQuery(".nwletter .input-box").toggleClass("index");
    });
    /*Filter By Section*/
    jQuery(".filterBy-btn-tab").click(function() {
        jQuery(this).next(".filter-option-dropdown").slideToggle();
    });

    function sticky_relocate() {
        var window_top = jQuery(window).scrollTop();
        if(jQuery('#sticky-anchor').length >0) {
            var div_top = jQuery('#sticky-anchor').offset().top;
            if (window_top > div_top) {
                jQuery('#sticky').addClass('stick');
            } else {
                jQuery('#sticky').removeClass('stick');
            }
        }
    }

    jQuery(function () {
        jQuery(window).scroll(sticky_relocate);
        sticky_relocate();
    });

    /*Checkout Shipping Method*/
    if(jQuery("ul.shipping-methods li")) {
        jQuery("ul.shipping-methods li").last().addClass("last");
    }

    /*Welcome text change*/
    if(jQuery(window).width() <= 639){
        jQuery(".welcome-text").html("Hi");
        if(jQuery(".mobile-material-option")) {
            var contents = jQuery(".desk-material-option").html();
            jQuery(".mobile-material-option").html(contents);
        }
    }
    else{
        jQuery(".welcome-text").html("Welcome");
    }

    jQuery.noConflict();
});

jQuery(window).on('resize' ,function() {

    if(jQuery(".a2a_menu")) {
        jQuery(".a2a_menu,.a2a_menu_border").css("display","none");
    }

    if(jQuery("[id^=popUpDiv_]")) {
        jQuery("#blanket").css("display","none");
        jQuery("[id^=popUpDiv_]").css("display","none");
    }

    if (jQuery(window).width() < 970){
        /*Header Fedex content show hide*/
        jQuery(".head-txt").click(function() {
            //jQuery(".fedex-content").toggle();
            if(jQuery(".fedex-content").css('display')=='none') {
                jQuery(".fedex-content").css('display','block');
            } else if(jQuery(".fedex-content").css('display')=='block') {
                jQuery(".fedex-content").css('display','none');
            }
        });
        if(jQuery(".edit-sub").attr('view') == 'window') {
            var result = jQuery(".edit-sub").attr('title').toString();
            var moreText = (result.length > 25) ? '...' : '';
            result = result.substr(0,24) + moreText;
            jQuery(".edit-sub").text(result);
        }
        if(jQuery(".banner-name").attr('view') == 'window') {
            var result = jQuery(".banner-name").attr('title').toString();
            var moreText = (result.length > 21) ? '...' : '';
            result = result.substr(0,20) + moreText;
            jQuery(".banner-name").html(result);
        }
        if(jQuery(".heading").attr('view') == 'window') {
            var result = jQuery(".heading").attr('title').toString();
            var moreText = (result.length > 25) ? '...' : '';
            result = result.substr(0,24) + moreText;
            jQuery(".heading").html(result);
        }
       
    } else {
        jQuery(".fedex-content").css("display","block");
        jQuery(".head-txt").click(function() {
            jQuery(".fedex-content").css("display","block");
        });
        if(jQuery(".banner-name").attr('view') == 'window') {
            jQuery(".banner-name").html(jQuery(".banner-name").attr('name'));
        }
        if(jQuery(".edit-sub").attr('view') == 'window') {
            jQuery(".edit-sub").text(jQuery(".edit-sub").attr('name'));
        }
        
    }

    if(jQuery(window).width() > 300 && jQuery(window).width() < 639) {
     var visibleItem = 1;
        if(jQuery(".welcome-text")) {
            jQuery(".welcome-text").html("Hi");
        }
        if(jQuery("#mobile-orderTable")) {
            var desc = jQuery("#comment").attr('description');
            jQuery("#comment").attr('name',desc);
        }
        
        if(jQuery(".mobile-material-option")) {
            var contents = jQuery(".desk-material-option").html();
            jQuery(".mobile-material-option").html(contents);
        }
        
        if(jQuery(window).width()<=320) {
            if(jQuery(".product-container .slide-box ").hasClass('left8')){
                jQuery(".product-container .slide-box ").removeClass('left8');
            }
            if(jQuery(".product-container .slide-box ").hasClass('left18')) {
                jQuery(".product-container .slide-box ").removeClass('left18');
            }
			if(jQuery(".product-container .slide-box ").hasClass('left0')){
                jQuery(".product-container .slide-box ").removeClass('left0');
            }
            jQuery(".product-container .slide-box ").addClass('left2');
			jQuery(".slide-arrow-lft, .slide-arrow-rgt").css("display","block");
        }else if(jQuery(window).width()<=360){
            if(jQuery(".product-container .slide-box ").hasClass('left2')){
                jQuery(".product-container .slide-box ").removeClass('left2');
            }
            if(jQuery(".product-container .slide-box ").hasClass('left18')) {
                jQuery(".product-container .slide-box ").removeClass('left18');
            }
			if(jQuery(".product-container .slide-box ").hasClass('left0')){
                jQuery(".product-container .slide-box ").removeClass('left0');
            }
            jQuery(".product-container .slide-box ").addClass('left8');
			jQuery(".slide-arrow-lft, .slide-arrow-rgt").css("display","block");
        }
        else if(jQuery(window).width()<=480){
            visibleItem = 2;
			jQuery(".slide-arrow-lft, .slide-arrow-rgt").css("display","none");
			 if(jQuery(".product-container .slide-box ").hasClass('left8')){
                jQuery(".product-container .slide-box ").removeClass('left8');
            }
			if(jQuery(".product-container .slide-box ").hasClass('left18')){
                jQuery(".product-container .slide-box ").removeClass('left18');
            }
			if(jQuery(".product-container .slide-box ").hasClass('left2')){
                jQuery(".product-container .slide-box ").removeClass('left2');
            }
			jQuery(".product-container .slide-box ").addClass('left0');
        }
        else if(jQuery(window).width()<=570){
             visibleItem = 2;
             jQuery(".slide-arrow-lft, .slide-arrow-rgt").css("display","none");
            if(jQuery(".product-container .slide-box ").hasClass('left2')){
                jQuery(".product-container .slide-box ").removeClass('left2');
            }
            if(jQuery(".product-container .slide-box ").hasClass('left8')) {
                jQuery(".product-container .slide-box ").removeClass('left8');
            }
            jQuery(".product-container .slide-box ").addClass('left18');
        } else if(jQuery(window).width()<=640) {
             visibleItem = 2;
             
            if(jQuery(".product-container .slide-box ").hasClass('left18')){
                jQuery(".product-container .slide-box ").removeClass('left18');
            }
            if(jQuery(".product-container .slide-box ").hasClass('left2')) {
                jQuery(".product-container .slide-box ").removeClass('left2');
            }
            jQuery(".product-container .slide-box ").addClass('left8');
        }
        jQuery('.infiniteCarousel .slide-arrow-rgt, .infiniteCarousel .slide-arrow-lft').unbind('click');
        if ( jQuery.isFunction(jQuery.fn.jCarouselLite) ) {
            jQuery('.infiniteCarousel .jCarouselLite').jCarouselLite({
                visible : visibleItem,
                btnNext: ".infiniteCarousel .slide-arrow-rgt",
                btnPrev: ".infiniteCarousel .slide-arrow-lft",
                speed: 500,
                easing: "easeinout",
                pauseOnHover: true
            });
        }
    }
    else if(jQuery(window).width() == 640){
        if(jQuery(".welcome-text")) {
            jQuery(".welcome-text").html("Welcome");
        }
        if(jQuery("#mobile-orderTable")) {
            jQuery("#comment").attr('name','');
        }
        if(jQuery(".open-panel")) {
            jQuery(".open-panel").css('display','none');
        }
        if(jQuery(".product-container .slide-box ").hasClass('left18')){
            jQuery(".product-container .slide-box ").removeClass('left18');
        }
        if(jQuery(".product-container .slide-box ").hasClass('left2')) {
            jQuery(".product-container .slide-box ").removeClass('left2');
        }
        jQuery(".product-container .slide-box ").addClass('left8');
        jQuery('.infiniteCarousel .slide-arrow-rgt, .infiniteCarousel .slide-arrow-lft').unbind('click');
        if ( jQuery.isFunction(jQuery.fn.jCarouselLite) ) {
            jQuery('.infiniteCarousel .jCarouselLite').jCarouselLite({
                visible: 2,
                btnNext: ".infiniteCarousel .slide-arrow-rgt",
                btnPrev: ".infiniteCarousel .slide-arrow-lft",
                speed: 500,
                easing: "easeinout",
                pauseOnHover: true
            });
        }
    }
    else if(jQuery(window).width() > 640 && jQuery(window).width() <= 969){
        if(jQuery(".welcome-text")) {
            jQuery(".welcome-text").html("Welcome");
        }
        if(jQuery("#mobile-orderTable")) {
            jQuery("#comment").attr('name','');
        }
        if(jQuery(".product-container .slide-box ").hasClass('left18')){
            jQuery(".product-container .slide-box ").removeClass('left18');
        }
        if(jQuery(".product-container .slide-box ").hasClass('left8')) {
            jQuery(".product-container .slide-box ").removeClass('left8');
        }
        jQuery(".product-container .slide-box ").addClass('left2');
        jQuery('.infiniteCarousel .slide-arrow-rgt, .infiniteCarousel .slide-arrow-lft').unbind('click');
        if ( jQuery.isFunction(jQuery.fn.jCarouselLite) ) {
            jQuery('.infiniteCarousel .jCarouselLite').jCarouselLite({
                visible: 3,
                btnNext: ".infiniteCarousel .slide-arrow-rgt",
                btnPrev: ".infiniteCarousel .slide-arrow-lft",
                speed: 500,
                easing: "easeinout",
                pauseOnHover: true
            });
        }
    }
    else if(jQuery(window).width() >= 970){
        if(jQuery(".welcome-text")) {
            jQuery(".welcome-text").html("Welcome");
        }
        if(jQuery("#mobile-orderTable")) {
            jQuery("#comment").attr('name','');
        }
        if(jQuery(".product-container .slide-box ").hasClass('left18')){
                jQuery(".product-container .slide-box ").removeClass('left18');
            }
            if(jQuery(".product-container .slide-box ").hasClass('left8')) {
                jQuery(".product-container .slide-box ").removeClass('left8');
            }
            if(jQuery(".product-container .slide-box ").hasClass('left2')) {
                jQuery(".product-container .slide-box ").removeClass('left2');
            }
            jQuery(".product-container .slide-box ").addClass('left0');
        jQuery('.infiniteCarousel .slide-arrow-rgt, .infiniteCarousel .slide-arrow-lft').unbind('click');
        jQuery(".slide-box").css("width","880px");
        jQuery(".infiniteCarousel ul li").css("width","220px");
        if ( jQuery.isFunction(jQuery.fn.jCarouselLite) ) {
            jQuery('.infiniteCarousel .jCarouselLite').jCarouselLite({
                visible: 4,
                btnNext: ".infiniteCarousel .slide-arrow-rgt",
                btnPrev: ".infiniteCarousel .slide-arrow-lft",
                speed: 500,
                easing: "easeinout",
                pauseOnHover: true
            });
        }
    }
});