jQuery(function () {
    /* IE Fix for the use of attribute ='placeholder' */
    if (!jQuery.support.placeholder) {
        var active = document.activeElement;

        jQuery(':text').focus(function () {
            if (jQuery(this).attr('placeholder') != '' && jQuery(this).val() == jQuery(this).attr('placeholder')) {
                jQuery(this).val('').removeClass('hasPlaceholder');
            }
        }).blur(function () {
            if (jQuery(this).attr('placeholder') != '' && (jQuery(this).val() == '' || jQuery(this).val() == jQuery(this).attr('placeholder'))) {
                jQuery(this).val(jQuery(this).attr('placeholder')).addClass('hasPlaceholder');
            }
        });
        jQuery(':text').blur();

        jQuery(active).focus();
    }

    resizeMainContent();

    /* Equal heights on product dispays. */
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;

    if (jQuery('.product-item .name').length > 0) {

        jQuery('.product-item .name').each(function () {

            $el = jQuery(this);
            topPostion = $el.position().top;

            if (currentRowStart != topPostion) {

                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }

                rowDivs.length = 0;
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);

            } else {

                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }

            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }

        });
    }

    if (jQuery(window).width() > 1025) {
        /* Equal heights on Left & Right Bars. */
        var eqHeights = Math.max(jQuery('.eq-heights').outerHeight(true));
        jQuery('.eq-heights').css('min-height', eqHeights + 'px');
    }

    /* On the window resize event. */
    jQuery(window).resize(function () {

        resizeMainContent();

        if (jQuery(window).width() <= 980) {
            jQuery('#modCategory ul.mobile').appendTo('header')
            jQuery('header ul.mobile').hide();
        }
        else {
            jQuery('header ul.mobile').appendTo('#modCategory');
            jQuery('#modCategory ul.mobile').show();
        }
    });

    /* On the device orientation change event. */
    jQuery(window).bind('orientationchange', function (event) {
        var lbElem = jQuery('#leftBar');
        var rbElem = jQuery('#rightBar');

        /* Portrait Orientation */
        if (orientation == 0 || orientation == 180) {
            jQuery('#mainContent').css('width', '100%');
        }
        else {
            /* Landscape Orientation */
            resizeMainContent();
        }
    });

    var orientation = jQuery(window).bind('orientationchange');
    if (orientation == 90 || orientation == 360) {
        jQuery('#modCategory ul.mobile').appendTo('header');
        jQuery('header ul.mobile').hide();
    }

    /* Initiates toggle for mobile drop down menu */
    jQuery('a#mobileCatMenu').on('click', function () {
        jQuery('ul.mobile').slideToggle();
    });

    /* Initiates <select> for Sub-Category & Blog menus at a specified width. */
    if (jQuery(window).width() <= 980) {

        jQuery('#modCategory ul.mobile').appendTo('header');

        jQuery('#subcategoriesBlock .sub-categories-format').each(function () {
            var list = jQuery(this),
            select = jQuery(document.createElement('select')).insertBefore(jQuery(this).hide());

            jQuery('ul > li a', this).each(function () {
                var target = jQuery(this).attr('target'),
                option = jQuery(document.createElement('option'))
                 .appendTo(select)
                 .val(this.href)
                 .html(jQuery(this).html())
                 .click(function () {
                 });
            });
            list.remove();
        });

        jQuery('#blog .blogNav ul').each(function () {
            var list = jQuery(this),
            select = jQuery(document.createElement('select')).insertBefore(jQuery(this).hide());

            jQuery('>li a', this).each(function () {
                var target = jQuery(this).attr('target'),
                option = jQuery(document.createElement('option'))
                 .appendTo(select)
                 .val(this.href)
                 .html(jQuery(this).html())
                 .click(function () {
                 });
            });
            list.remove();
        });

        jQuery('#blog .blogNav select:eq(0)').prepend('<option> --- Select Category ---</option>');
        jQuery('#blog .blogNav select:eq(1)').prepend('<option> --- Select Recent Posts ---</option>');
        jQuery('#blog .blogNav select:eq(2)').prepend('<option> --- Select Archives ---</option>');

        jQuery('#subcategoriesBlock select').prepend('<option> --- Select Sub-Category ---</option>');

        jQuery('#blog .blogNav select, #subcategoriesBlock select').change(function () {
            window.location.href = jQuery(this).val();
        });
    }
    else {
        return;
    }
});

function resizeMainContent() {
    /* Site content section resizing depending on Left Bar or Right Bar is enabled. */
    var sw = jQuery('#mainContainer .wrapper').width();
    var mcElem = jQuery('#mainContent');
    var lbElem = jQuery('#leftBar');
    var rbElem = jQuery('#rightBar');
    var lb = (lbElem.length > 0 && lbElem.css("display") != 'none' && lbElem.height() > 15) ? lbElem.outerWidth(true) : 0;
    var rb = (rbElem.length > 0 && rbElem.css("display") != 'none' && rbElem.height() > 15) ? rbElem.outerWidth(true) : 0;
    var mw = sw - (lb + rb);

    if (lbElem.length == 0 || rbElem.length == 0) {
        if (lbElem.length == 0 && rbElem.length == 0) {
            jQuery('#mainContent').css('width', '100%');
        }
        else {
            jQuery('#mainContent').css('width', mw + 'px');
        }
    }
    else {
        jQuery('#mainContent').css('width', '100%');
    }

    if ((lbElem.css('display') == 'none' && rbElem.css('display') == 'none')) {
        jQuery('#mainContent').css('width', '100%');
    }
    else {
        if ((lbElem.css('display') == 'block' || rbElem.css('display') == 'block')) {
            jQuery('#mainContent').css('width', mw + 'px');
        }
    }

    /* Creates mobile/tablet left Slide Menu. */
    var menuLeft = document.getElementById('showSlideMenu'),
        body = document.body;

    mobileMenu.onclick = function () {
        classie.toggle(this, 'active');
        classie.toggle(menuLeft, 'cbp-spmenu-open');
        disableOther('closecbpMenu');
    };

    function disableOther(button) {
        if (button !== 'closecbpMenu') {
            classie.toggle(menuLeft, 'disabled');
        }
    }

    jQuery('#closecbpMenu').on('click', function () {
        jQuery('#showSlideMenu').removeClass('cbp-spmenu-open');
    });
}

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */

(function (window) {

    'use strict';

    // class helper functions from bonzo https://github.com/ded/bonzo

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    window.classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

})(window);
