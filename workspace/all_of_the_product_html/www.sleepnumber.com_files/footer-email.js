/* jshint camelcase: false */
'use strict';

// Asyncronous with module loading
require(['main'], function() {
    require(['jquery', 'domReady', 'app'], function($, domReady, app) {
        domReady(function() {

            if('.modal-wrapper'.length > 0) {
                // add validation
                app.modalValidator($('#footer-email'));
            }

            /* attach a submit handler to the form */
            $('#footer-email').submit(function(e){
                /* stop form from submitting normally */
                e.preventDefault();
                /* get the form elements on the page */
                var $form = $(this),
                ajaxUrl = $form.attr('action'),
                methodType = $form.attr('method');
                if ($form.find('.parsley-error').length < 1){
                    $.ajax({
                        url: ajaxUrl,
                        cache: !1,
                        dataType: 'html',
                        data: $form.serialize(),
                        type: methodType,
                        success: function() {
                            $('#newsletterEmail').val('');
                        }
                    });
                }
            });
        });
    });
});
