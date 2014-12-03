/* jshint camelcase: false */
'use strict';

// Asyncronous with module loading
require(['main'], function() {
    require(['domReady', 'jquery'], function(domReady, $) {
        domReady(function() {

            // Open tab if error message exists
            if( $('.parsley-error-list').length ) {
                var errorTabIndex = $('.parsley-error-list').closest('.js_tab-content').data('tab-index');

                $('.js_tab-content').addClass('hideTab').removeClass('showTab');
                $('.js_tab-nav-trigger').parent('.js_tab-nav-item').removeClass('active');
                $('[data-tab-index=' + errorTabIndex + ']').removeClass('hideTab').addClass('showTab');
                $('[data-tab-index=' + errorTabIndex + ']').parent('.js_tab-nav-item').addClass('active');
            }

            // Else open tabs on click
            $('.js_tab-nav-trigger').on('click', function(e) {
                e.preventDefault();

                var $tabTrigger = $(this),
                    $tabParent = $tabTrigger.parent('.js_tab-nav-item'),
                    tabIndex = $tabTrigger.data('tab-index');

                $('.js_tab-content').addClass('hideTab');

                if ( $tabParent.hasClass('active') ) {
                    return;
                } else {
                    $('.js_tab-content').addClass('hideTab').removeClass('showTab');
                    $('.js_tab-nav-trigger').parent('.js_tab-nav-item').removeClass('active');
                    $('[data-tab-index=' + tabIndex + ']').removeClass('hideTab').addClass('showTab');
                    $tabParent.addClass('active');
                }
            });

        });
    });
});
