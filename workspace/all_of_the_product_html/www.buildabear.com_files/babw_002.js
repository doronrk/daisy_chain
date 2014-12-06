/* jshint browser:true, jquery:true */
/* global PubSub */

(function($, babw, _smtr) {
    var events = babw.events;

    function handleAddCategory(element) {
        _smtr.push('pageView', {
            'pageType': 'category',
            'catId': element.title,
            'catName': element.title
        });
    }

    /* Front-end category page views */
    if (location.href.indexOf('/search') > -1) {
        PubSub.subscribe(events.endecaChangeCategory, handleAddCategory);
        PubSub.subscribe(events.endecaEnableFilter, handleAddCategory);
    }

    /* Add-to-cart AJAX interaction */
    function handleAddToBasket() {
        var products = [];
        var product, cartId, cartTotal;

        $.ajax({
            type: 'GET',
            url: '/shopping/responder?callType=cart',
            dataType: 'json',
            success: function(json) {
                cartId = json.cartId;
                cartTotal = json.cartTotal;
                for (var i = 0; i < json.cartItems.length; i++) {
                    product = {
                        'productId': json.cartItems[i].productId,
                        'sku': json.cartItems[i].productSku,
                        'brand': json.cartItems[i].productBrand,
                        'qty': json.cartItems[i].productQty,
                        'price': json.cartItems[i].productPrice
                    };
                    products.push(product);
                }
                _smtr.push(['addToCart', {
                    'cartItems': products,
                    'cartTotal': cartTotal,
                    'cartId': cartId
                }]);
            }
        });
    }
    PubSub.subscribe(events.addToBasketSuccess, handleAddToBasket);

    function pushEmailInteraction(emailFieldSelector, isAccountEmail) {
        $(document).on('blur', emailFieldSelector, function() {

            var emailAddress = $(this).val();
            if (emailAddress) {
                var emailType = isAccountEmail ? 'account' : 'transact';

                _smtr.push(['onEmail', {
                    'email': emailAddress,
                    'type': emailType
                }]);
            }
        });
    }

    /* Promotion code interaction */
    function pushPromoAction(promoBoxSelector) {
        $(document).on('blur', promoBoxSelector, function() {

            var value = $(this).val(),
                id = promoBoxSelector.substring(1);

            if (value) {
                _smtr.push(['onPromo', {
                    'code': value,
                    'id': id
                }]);
            }
        });
    }

    /* Email interaction */
    if (location.href.indexOf('/checkoutsignin.jsp') > -1) {
        pushEmailInteraction('form#formShopLogin input.sign-in-field[type=email]', false);
    }
    if (location.href.indexOf('/checkout/') > -1) {
        pushEmailInteraction('#emailAddress', false);
        pushEmailInteraction('#emailShippingAddress', false);

        pushPromoAction('#input-promocode');
        pushPromoAction('#serializedCoupon');
        pushPromoAction('#SFSCertificate');
    }
    if (location.href.indexOf('/register/') > -1) {
        pushEmailInteraction('#txtEmailAddress', true);
    }
    if (location.href.indexOf('/login/') > -1) {
        pushEmailInteraction('form#formShopLogin input[type=text]', true);
    }
    if (location.href.indexOf('/myaccount/changeEmail.jsp') > -1) {
        pushEmailInteraction('#atg_store_profileEmailEditNew', true);
    }


    /* Payment method interaction */
    if (location.href.indexOf('/checkout/checkout-page.jsp') > -1) {

        var cardTypeSelector = '#CreditCardTypeDropDown';
        var cardNumberSelector = '#CreditCardNumber';
        var cardExpMonthSelector = '#CreditCardExpirationMonthDropDown';
        var cardExpYearSelector = '#CreditCardExpirationYearDropDown';
        var cardCvvSelector = '#CreditCardVerificationCode';
        var giftCardSelector = '#GiftCardNumber';
        var babToSrPaymentMap = {
            'Visa': 'visa',
            'MasterCard': 'mc',
            'AMEX': 'amex',
            'Discover': 'disc',
            'PayPal': 'pp'
        };

        _smtr.push(['onCheckout']);

        /* Initial page-load values in case user does not interact with their field */
        /* Initial shipping value */
        _smtr.push(['onShip', {
            'value': 'fedexsmpost'
        }]);

        /* Initial payment type value */
        /* PayPal not selectable but will be the value of the dropdown on page load */
        var payType = $('#CreditCardTypeDropDown').val();
        payType = (payType === 'Visa' || payType === 'PayPal') ? payType : 'Visa';
        _smtr.push(['onPayment', {
            'type': payType
        }]);


        /* Shipping interaction */
        var shippingOptionSelector = '#statusDropDownList';
        var babToSrShippingMap = {
            'USPS': 'fedexsmpost',
            'FEDEX-GROUND': 'ground',
            'FEDEX-2DAY': 'fedex2day',
            'FEDEX-NEXTDAY': 'nextday',
            'FEDEX-2DAY-SATURDAY': 'fedex2day',
            'FEDEX-NEXTDAY-SATURDAY': 'nextday',
            'PICK-DELIVERY-DAY': 'special',
            'CANADA': 'other',
            'INTERNATIONAL': 'other',
            'UPS-STANDARD': 'standard',
            'UPS-NEXTDAY': 'nextday',
            'FEDEX-SMARTPOST': 'fedexsmpost',
            'WILL-CALL': 'willcall'
        };

        $(document).on('blur', shippingOptionSelector, function() {
            var selected = $(this).val();
            if (selected) {
                _smtr.push(['onShip', {
                    'value': babToSrShippingMap[selected]
                }]);
            }
        });


        /* Card type */
        $(document).on('blur', cardTypeSelector, function() {
            var selected = $(this).val();
            if (selected) {
                _smtr.push(['onPayment', {
                    'type': babToSrPaymentMap[selected]
                }]);
            }
        });

        /* Card number */
        $(document).on('blur', cardNumberSelector, function() {
            var selected = $(cardTypeSelector).val();
            if (selected) {
                _smtr.push(['onPayment', {
                    'type': babToSrPaymentMap[selected],
                    'interaction': 'cn'
                }]);
            }
        });

        /* Expiration month */
        $(document).on('blur', cardExpMonthSelector, function() {
            var selected = $(cardTypeSelector).val();
            if (selected) {
                _smtr.push(['onPayment', {
                    'type': babToSrPaymentMap[selected],
                    'interaction': 'em'
                }]);
            }
        });

        /* Expiration year */
        $(document).on('blur', cardExpYearSelector, function() {
            var selected = $(cardTypeSelector).val();
            if (selected) {
                _smtr.push(['onPayment', {
                    'type': babToSrPaymentMap[selected],
                    'interaction': 'ey'
                }]);
            }
        });

        /* CVV */
        $(document).on('blur', cardCvvSelector, function() {
            var selected = $(cardTypeSelector).val();
            if (selected) {
                _smtr.push(['onPayment', {
                    'type': babToSrPaymentMap[selected],
                    'interaction': 'cvv'
                }]);
            }
        });

        /* Gift Card */
        $(document).on('blur', giftCardSelector, function() {
            if ($(this).val()) {
                _smtr.push(['onPayment', {
                    'type': 'gc'
                }]);

                _smtr.push(['onGift', {
                    'id': 'GiftCardNumber'
                }]);
            }
        });
    }

})(jQuery, window.babw, window._smtr = window._smtr || []);
