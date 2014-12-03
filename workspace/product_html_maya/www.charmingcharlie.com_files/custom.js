(function($) {
    $(document).ready(function(e) {

        /**
         * Strip leading and trailing spaces from email inputs before validating and on blur
         * See https://charmingcharlie.atlassian.net/browse/DEV-1025
         */
        $('.validate-email').blur(function() {
            $(this).val($(this).val().trim());
        });

        Validation.add('validate-email', 'Please enter a valid email address. For example johndoe@domain.com.', function(v) {
            v = v.trim();
            return Validation.get('IsEmpty').test(v) || /^([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*@([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*\.(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]){2,})$/i.test(v);
        });

        /**
         * Add validation class to shipping zip code fields. Doing this in js because
         * this cannot easily be set via the admin and this is the quickest route
         * to implement this.
         */
        $('[name="postcode"], #shipping\\:postcode, #billing\\:postcode').addClass('validate-zip-strict');

        Validation.add('validate-zip-strict', 'Please enter a valid zip code. For example 90602.', function(v) {
            return Validation.get('IsEmpty').test(v) || /^\d{5}$/.test(v);
        });

        $('input[name="telephone"], input[name="billing[telephone]"], input[name="shipping[telephone]"]').addClass('validate-phoneLax');

        var $body = $('body');
        if ($body.hasClass('customer-account-create')) {

            $('.rewards-signup-information').fancybox();

            /**
             * Customize registration form flow to initially hide address fields
             */
            var $addressWrapper  = $('.address-wrapper');
            if ($addressWrapper.length > 0 && $addressWrapper.is(':hidden')) {

                var $form = $('#form-validate');

                // Disable to Prototype form event observer. Prototype does not play nice with jQuery observers
                // @see https://amplificommerce.jiveon.com/docs/DOC-1648
                Event.stopObserving($form.get(0),'submit',Validation.onSubmit,false);

                /**
                 * This is ugly, but it is the cleanest way I see to hide a customer field from the
                 * registration form, but still include it. There is no option for a hidden field
                 * type.
                 */
                var $crmMemberNumber = $('#crm_member_number');
                $crmMemberNumber.parents('li:first').hide();

                // Default rewards signup to checked. There is probably a better way to do this via the form class
                $('#crm_rewards_opt_in').attr('checked', 'checked');

                var basicInformationForm = new VarienForm('basic-information-wrapper', true);
                var addressForm = new VarienForm('address-wrapper', true);

                var $submitButton = $('#submit');
                $submitButton.find('>span>span').text('Continue');

                $('#form-validate').submit(function(e) {
                    if ($addressWrapper.is(':hidden')) {
                        e.preventDefault();
                        if (basicInformationForm.validator.validate()) {
                            var $loadingDialog = $('#please-wait');
                            $loadingDialog.show();
                            $submitButton.attr('disabled', 'disabled');

                            $.post('/customerloyalty/search/getCustomerDataFromCrmGivenData',
                                $('#form-validate').serialize(),
                                function(data) {
                                    var messages = $('.account-create .messages');
                                    if (data.error) {
                                        if (messages.length) {
                                            messages.replaceWith(data.error_message);
                                        } else {
                                            $('.account-create .page-title').after(data.error_message);
                                        }

                                        // Display error message
                                        messages = $('.account-create .messages');
                                        messages.show();
                                    } else {
                                        if ('undefined' != typeof(data.epicor_customer)) {
                                            if (data.epicor_customer.address) {
                                                /**
                                                 * Populate member number
                                                 *
                                                 * If member is already in the Charm Club Rewards program, disable and hide the CRM rewards signup checkbox
                                                 */
                                                if (data.epicor_customer.member_number) {
                                                    $crmMemberNumber.val(data.epicor_customer.member_number);
                                                    if ('REGL' == data.epicor_customer.member_type || 'PREM' == data.epicor_customer.member_type) {
                                                        $('#crm_rewards_opt_in').attr('disabled', 'disabled').parents('li:first').hide();
                                                    }
                                                }

                                                /**
                                                 * Populate address fields
                                                 */
                                                $.each(data.epicor_customer.address, function(name, value) {
                                                    var $el = $('#' + name);
                                                    if ($el) {
                                                        $el.val(value);
                                                    }
                                                });

                                                /**
                                                 * Fix inconsistent fields in Magento...
                                                 */
                                                $('#street_1').val(data.epicor_customer.address.street1);
                                                $('#street_2').val(data.epicor_customer.address.street2);
                                                $('#zip').val(data.epicor_customer.address.postcode);

                                                $.uniform.update();
                                            }
                                        }

                                        messages.hide();
                                        $submitButton.find('>span>span').text('Submit');
                                        $addressWrapper.fadeIn();
                                    }

                                    // Unlock form
                                    $loadingDialog.hide();
                                    $submitButton.removeAttr('disabled');
                                },
                                'json'
                            );
                        }
                    } else if (!addressForm.validator.validate()) {
                        e.preventDefault();
                    }
                });
            }
        }

        /**
         * Setup totals remove links in cart
         */
        if ($body.hasClass('checkout-cart-index')) {
            $('.totals').on('click', '.summary-discount-remove,.summary-voucher-remove,.summary-giftcard-remove', function(e) {
                e.preventDefault();
                var url = $(this).attr('href');
                $.ajax({
                    url: url,
                    method: 'POST',
                    data: {
                        remove: true,
                        totals_block_only: true
                    },
                    dataType: 'json',
                    success: function(data, textStatus, jqXHR){
                        if(data.success){
                            $('#shopping-cart-totals-table').replaceWith(data.summary);
                        }
                    }
                });
            });
        }
    });
})(jQuery);

GomageNavigationClass=(function(){
    var _origin  = GomageNavigationClass;
    return function(arg){
        var _obj = new _origin(arg);

        _obj.navigationOpenFilter = function(request_var) {
            if (this.help_icon_open_type == 'over') {
                this.help = false;
            }

            if (this.help === false) {
                var id = 'advancednavigation-filter-content-'+request_var;
                var $filter = jQuery('#' + id);

                if ($filter.is(':hidden')){
                    $filter.fadeIn('fast');
                    $filter.parent('dl').addClass('fileter-open');
                    if (this.navigation_eval_js) {
                        eval(this.navigation_eval_js);
                        this.ganInitSliders();
                    }
                    for(var filter in this.navigationOpenFilters){
                        if(this.navigationOpenFilters[filter] == true){
                            this.navigationOpenFilter(filter.replace('_is_open',''));
                        }
                    }
                    this.navigationOpenFilters[request_var+'_is_open'] = true;

                } else {
                    $filter.fadeOut('fast');
                    $filter.parent('dl').removeClass('fileter-open');
                    this.navigationOpenFilters[request_var+'_is_open'] = false;
                }
            }

            this.help = false;
        }

        _obj.navigationCheckFilters = function(e) {
            if ( !e.target.up('dl') || !e.target.up('dl').hasClassName('gan-attribute') )
            {
                $$('.gan-attribute').each(function (e) {
                    var _filter = e.down('dd');
                    if ( _filter )
                    {
                        if ( _filter && _filter.style.display != 'none' )
                        {
                            var _id = _filter.id.replace(/advancednavigation-filter-content-/,'');
                            _obj.navigationOpenFilter(_id);
                        }
                    }
                });
            }
        }

        Event.observe(document, 'click', _obj.navigationCheckFilters);

        return _obj;
    }

})();

if (typeof(Product) != 'undefined') {
Product.OptionsPrice.prototype.reload = function() {
    var price;
    var formattedPrice;
    var optionPrices = this.getOptionPrices();
    var nonTaxable = optionPrices[1];
    var optionOldPrice = optionPrices[2];
    var priceInclTax = optionPrices[3];
    optionPrices = optionPrices[0];

    $H(this.containers).each(function(pair) {
        var _productPrice;
        var _plusDisposition;
        var _minusDisposition;
        var _priceInclTax;

        if ($(pair.value)) {
            if (pair.value == 'old-price-'+this.productId && this.productOldPrice != this.productPrice) {
                _productPrice = this.productOldPrice;
                _plusDisposition = this.oldPlusDisposition;
                _minusDisposition = this.oldMinusDisposition;
            } else {
                _productPrice = this.productPrice;
                _plusDisposition = this.plusDisposition;
                _minusDisposition = this.minusDisposition;
            }
            _priceInclTax = priceInclTax;

            if (pair.value == 'old-price-'+this.productId && optionOldPrice !== undefined) {
                price = optionOldPrice+parseFloat(_productPrice);
            } else if (this.specialTaxPrice == 'true' && this.priceInclTax !== undefined && this.priceExclTax !== undefined) {
                price = optionPrices+parseFloat(this.priceExclTax);
                _priceInclTax += this.priceInclTax;
            } else {
                price = optionPrices+parseFloat(_productPrice);
                _priceInclTax += parseFloat(_productPrice) * (100 + this.currentTax) / 100;
            }

            if (this.specialTaxPrice == 'true') {
                var excl = price;
                var incl = _priceInclTax;
            } else if (this.includeTax == 'true') {
                // tax = tax included into product price by admin
                var tax = price / (100 + this.defaultTax) * this.defaultTax;
                var excl = price - tax;
                var incl = excl*(1+(this.currentTax/100));
            } else {
                var tax = price * (this.currentTax / 100);
                var excl = price;
                var incl = excl + tax;
            }

            var subPrice = 0;
            var subPriceincludeTax = 0;
            Object.values(this.customPrices).each(function(el){
                if (el.excludeTax && el.includeTax) {
                    subPrice += parseFloat(el.excludeTax);
                    subPriceincludeTax += parseFloat(el.includeTax);
                } else {
                    subPrice += parseFloat(el.price);
                    subPriceincludeTax += parseFloat(el.price);
                }
            });
            excl += subPrice;
            incl += subPriceincludeTax;

            if (typeof this.exclDisposition == 'undefined') {
                excl += parseFloat(_plusDisposition);
            }

            incl += parseFloat(_plusDisposition) + parseFloat(this.plusDispositionTax);
            excl -= parseFloat(_minusDisposition);
            incl -= parseFloat(_minusDisposition);

            //adding nontaxlable part of options
            excl += parseFloat(nonTaxable);
            incl += parseFloat(nonTaxable);

            if (pair.value == 'price-including-tax-'+this.productId) {
                price = incl;
            } else if (pair.value == 'price-excluding-tax-'+this.productId) {
                price = excl;
            } else if (pair.value == 'old-price-'+this.productId) {
                if (this.showIncludeTax || this.showBothPrices) {
                    price = incl;
                } else {
                    price = excl;
                }
            } else {
                if (this.showIncludeTax) {
                    price = incl;
                } else {
                    price = excl;
                }
            }

            if (price < 0) price = 0;

            if (price > 0 || this.displayZeroPrice) {
                formattedPrice = this.formatPrice(price);
            } else {
                formattedPrice = '';
            }

            /**
             * Charming Charlie custom logic
             *
             * This logic is very convoluted. Magento is not consistent with it's pricing html. It uses a wrapping span
             * if there is only one price, but a wrapping p if there are multiple prices. Magento is also inconsistent in
             * where it puts the id. For a single price, the id is on the parent span. For multiple prices, the id is
             * on the second price's child span.
             *
             * @todo Review and clean up this logic. Potentially update the Magento price template for consistency
             *
             */
            if ('product-price-' == pair.value.substr(0, 14)) {
                // Have to quantify id here, because the category view page has the same span id for price as quick view.
                var $priceBlock = jQuery('.product-view #' + pair.value);
                /**
                 * Normalize markup to be consistent
                 *
                 * Parent p tag is always created. $priceBlock always refers to parent p tag.
                 */
                if ($priceBlock.is('span')) {
                    if ($priceBlock.parent().is('div')) {
                        var $newPriceBlock = jQuery('<p id="' + pair.value + '" class="regular-price"><span class="price">' + formattedPrice + '</span></p>');
                        $priceBlock.replaceWith($newPriceBlock);
                        $priceBlock = $newPriceBlock;
                    } else {
                        $priceBlock = $priceBlock.parent();
                    }
                }

                if (!$priceBlock.hasClass('special-price')) {
                    if (price != this.productOldPrice) {
                        $priceBlock.removeClass('regular-price').addClass('old-price');
                        $priceBlock.children().html(this.formatPrice(this.productOldPrice));
                        if ($priceBlock.next('p.special-price').length > 0) {
                            $priceBlock.next('p.special-price').children().html(formattedPrice);
                            $priceBlock.next('p.special-price').show();
                        } else {
                            var $newPrice = jQuery('<p class="special-price"><span class="price">' + formattedPrice + '</span></p>');
                            $priceBlock.after($newPrice);
                        }
                    } else {
                        if ($priceBlock.hasClass('old-price')) {
                            $priceBlock.next('p.special-price').hide();
                            $priceBlock.removeClass('old-price').addClass('regular-price');
                        }
                    }
                }
            }
        };
    }.bind(this));

    for (var i = 0; i < this.tierPrices.length; i++) {
        $$('.price.tier-' + i).each(function (el) {
            var price = this.tierPrices[i] + parseFloat(optionPrices);
            el.innerHTML = this.formatPrice(price);
        }, this);
        $$('.price.tier-' + i + '-incl-tax').each(function (el) {
            var price = this.tierPricesInclTax[i] + parseFloat(optionPrices);
            el.innerHTML = this.formatPrice(price);
        }, this);
        $$('.benefit').each(function (el) {
            var parsePrice = function (html) {
                return parseFloat(/\d+\.?\d*/.exec(html));
            };
            var container = $(this.containers[3]) ? this.containers[3] : this.containers[0];
            var price = parsePrice($(container).innerHTML);
            var tierPrice = $$('.tier-price.tier-' + i+' .price');
            tierPrice = tierPrice.length ? parsePrice(tierPrice[0].innerHTML, 10) : 0;
            var $percent = Selector.findChildElements(el, ['.percent.tier-' + i]);
            $percent.each(function (el) {
                el.innerHTML = Math.ceil(100 - ((100 / price) * tierPrice));
            });
        }, this);
    }
};
}

(function($) {
    $(document).ready(function(e) {
        $( document ).on( "click", ".pager .pages li a", function() {
            $('html,body').scrollTop(0);
        });
    });
})(jQuery);

/**
 * Events tracking
 */
(function($) {
    $(document).ready(function(e) {
        function Charming_evt_track(trtype, trlabel) {
            if (typeof(dataLayer) != 'undefined') {
                dataLayer.push({
                    'event': trtype,
                    'eventCategory': trtype,
                    'eventAction': 'click',
                    'eventLabel': trlabel.replace(/<(\w+)[^>]*>.*<\/\1>/gi,'')});
            }
        }
        $('#nav .level-top a>span, .header .links a, .header #cartHeader').click(function() {
            var label = $(this).attr('title');
            if ( !label ) {
                if ( $(this).parent('a').attr('href').match(/rsvp\.html/) ) {
                    label = 'Rsvp';
                } else {
                    label = $(this).html();
                }
            }
            Charming_evt_track('top nav', label.replace(/\s*?\(\d+\)/,''));
        });
        $('.footer-links a').click(function() {
            var label = $(this).html();
            if ( label.match(/^(\s|\n)*?<img.*?>(\s|\n)*?$/i) )
            {
                label = $(this).find('img').attr('alt');
            }
            Charming_evt_track('btm nav', label);
        });
        $('.shop-by-color a').click(function() {
            var label = $(this).attr('class');
            Charming_evt_track('color nav', label);
        });
    });
})(jQuery);

Validation.add('validate-alpha-space', 'Please use letters only (a-z or A-Z) in this field.', function (v) {
    return Validation.get('IsEmpty').test(v) ||  /^[a-zA-Z ]+$/.test(v)
});
