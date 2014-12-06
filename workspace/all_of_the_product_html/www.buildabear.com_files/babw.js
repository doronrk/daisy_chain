/* jshint browser:true,jquery:true */
/* global babw,Invodo */
(function ($) {
    'use strict';

    function init(pageName, pageType) {
        var delayedInvoke = function (options) {
            invokePlayer(options.mpd, options);
        };

        if (Invodo) {
            try {
                Invodo.init({
                    'pageName': pageName,
                    'pageType': pageType
                });

                if (babw.invokeInvodo && babw.invokeInvodo.length) {
                    babw.invokeInvodo.forEach(delayedInvoke);
                }
            } catch (e) {
                babw.log(e);
            }
        }

        // Overwrite exposed init function to prevent duplicate init calls
        babw.invodo.init = function(){};
    }

    function initBrowse() {
        $(document).on('click', '.add-to-basket', function () {
            babw.invodo.addToBasketFromBrowse(this);
        });
    }

    function initProductPage(sku) {
        $(function () {
            babw.invodo.invokePlayer(sku);
        });
    }

    function invokePlayer(mpd, options) {
        var playerOptions = {
            'playerType': 'inplayer',
            'playerMode': 'overlay',
            'playerWidgetId': 'invodoPlayer',
            'ctaType': 'cta',
            'ctaWidgetId': 'invodoCallToAction',
            'ctaParentDom': 'invodoCallToActionWrap'
        };
        playerOptions = $.extend(playerOptions, options || {});

        if (Invodo) {
            try {
                // Player
                Invodo.Widget.add({
                    'type': playerOptions.playerType,
                    'mode': playerOptions.playerMode,
                    'widgetId': playerOptions.playerWidgetId,
                    'mpd': mpd,
                    'listensTo': playerOptions.ctaWidgetId
                });

                // Call to action
                Invodo.Widget.add({
                    'type': playerOptions.ctaType,
                    'widgetId': playerOptions.ctaWidgetId,
                    'parentDomId': playerOptions.ctaParentDom,
                    'mpd': mpd,
                    'data': document.getElementById(playerOptions.ctaWidgetId)
                });
            } catch (e) {
                babw.log(e);
            }
        }
    }

    function sendCartAddConversion(mpd, quantity, price) {
        if (Invodo) {
            try {
                Invodo.Conversion.send('cartAdd', {
                    'mpd': mpd,
                    'quantity': quantity,
                    'price': price
                });
            } catch (e) {
                babw.log(e);
            }
        }
    }

    function addToBasket(sku, qty, xmlResponse) {
        if (Invodo) {
            var unitPrice = '';

            $(xmlResponse).find('product').each(function () {
                unitPrice = $(this).find('itemprice').text().replace(/[\\s$]/g, '');
            });

            sendCartAddConversion(sku, qty, unitPrice);
        }
    }

    function addToBasketFromBrowse(object) {
        if (Invodo) {
            var $this = $(object),
                sku = $this.data().sku,
                unitPrice = $this.siblings('span.price').text().replace(/[\\s$]/g, '');

            sendCartAddConversion(sku, 1, unitPrice);
        }
    }

    function addToBasketFromHome(sku, qty, unitPrice) {
        sendCartAddConversion(sku, qty, unitPrice);
    }

    babw.invodo = {
        'init': init,
        'initBrowse': initBrowse,
        'initProductPage': initProductPage,
        'invokePlayer': invokePlayer,
        'addToBasket': addToBasket,
        'addToBasketFromBrowse': addToBasketFromBrowse,
        'addToBasketFromHome': addToBasketFromHome
    };
})(jQuery);
