/**
 * Responsive JavaScript
 */

$(document).ready(function() {

    /*
     * Menu functions
     */

    // Add secondary nav list items to main menu
    $(".secondary-nav ul li").clone().appendTo('.menu-more .sub-menu');

    // Menu toggle
    $('.nav-icon').click(function(e) {
        e.preventDefault();
        $('.primary-nav').slideToggle();
    });

    // Submenu click
    $('.with-sub-menu').click(function(e) {
        if (isMobileNav() === true) {
            e.preventDefault();
            $(this).find('.sub-menu').slideToggle();
        }
    });

    // Submenu children click
    $(".sub-menu li a").click(function(e) {
        e.stopPropagation();
    });

    // Submenu hover
    $(".with-sub-menu").hover(
      function() {
        if (isMobileNav() === false) {
            $(this).find('.sub-menu').fadeIn(150);
        }
      }, function() {
        if (isMobileNav() === false) {
            $(this).find('.sub-menu').fadeOut(150);
        }
      }
    );

    // Hide submenus when transitioning from mobile to desktop viewports
    $( window ).resize(function() {
        if (isMobile() === false) {
            $('.sub-menu').hide();
        }
    });

    /*
     * Slider functions
     */

    // Match slider and slider-nav heights
    function matchSliderHeight() {
        var windowWidth = $(window).width();
        if (windowWidth < 1020) {
            var sliderHeight = $('.slider .slides').height();
            $('.slider .slide-thumbs').height(sliderHeight - 57);
        } else {
            $('.slider .slide-thumbs').height(198);
        }
    }
    setInterval(matchSliderHeight, 500);

    // Resize events
    $(window).resize(function() {
        matchSliderHeight();
    });

    /*
     * Carousel functions
     */

    // Add links to home page carousel replacements
    $('.home-grid .carousel.small .box-top').each(function() {
        var link = $(this).find('h2 a').attr("href");
        $(this).wrap('<a href="'+link+'"></a>');
    });

    /**
     * Utility functions
     */

    // Determine if were showing the phone portrait or landscape viewport
    function isMobile() {
        var windowWidth = $(window).width();
        var isMobile = (windowWidth <= 767) ? true : false;
        return isMobile;
    }

    // Determine if the mobile navigation is visible
    function isMobileNav() {
        var windowWidth = $(window).width();
        var isMobileNav = (windowWidth <= 767) ? true : false;
        return isMobileNav;
    }

});