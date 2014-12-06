$(document).ready(function() {

    'use strict';

    function addContent() {
        //HTML being inserted
        var mainContent = $('.pi-pdpmainbody p:eq(1)').html(),
            paraGraph = $('<p/>', {
                'class': 'oeContent'
            }).html(mainContent),
            wrapper = $('<div/>', {
                'class': 'exp-product-notifyCustomMessage body-text nsg-font-family--base nsg-text--medium-grey js-above-the-fold-messaging',
                'style': 'height: auto; opacity: 1;'
            }).html(paraGraph),
            //Insert Learn More Link after content
            learnMoreContainer = $('<div/>', {
                'class': 'align-right',
                'style': 'display: block; width: 100%'
            }),
            learnMoreSpan = $('<span/>', {
                'class': 'learn-more'
            }),
            learnMoreLink = $('<a/>', {
                'class': 'underline learn-more',
                'href': 'javascript:void(0)',
                'text': 'Learn More'
            }),
            learmMoreClose = $('<a/>', {
                'class': 'underline close',
                'href': 'javascript:void(0)',
                'text': 'Close'
            });

        $(wrapper).insertAfter('.exp-product-info');
        $(learnMoreContainer).prepend(learnMoreSpan, learnMoreLink, learmMoreClose);
        $(learnMoreContainer).insertAfter('.oeContent');

        //Scroll to Learn More on click
        learnMoreLink.click(function() {
            $('html,body').animate({
                scrollTop: $('.exp-pdp-benefits-container:eq(0)').offset().top - 105
            }, 1000);
        });

        //Make sure that the paragraph stays the same height if the resolution changes
        nike.listen('windowResizeEvent', function() {
            $('.js-above-the-fold-messaging').css('height', $('.oeContent').height() + 20);
        });
    }

    //If there's a product description for the product and if that first paragraph isn't already in the product header
    if ($('.pi-pdpmainbody p:eq(1)').length && !$('.js-above-the-fold-messaging').length) {
        //Run function to add content above fold
        addContent();
        nike.listen('inventoryTemplateRenderComplete', function() {
            addContent();
        });
    }
});