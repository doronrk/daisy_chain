var $j = jQuery.noConflict();
var Zumiez = {
    findinstore : {
        validate : function() {
            return productAddToCartForm.validator.validate();
        }
    },
    globalLoading : {
        init: function() {
            if (!$j('#loading-wrapper').length) {
                $j('body').append('<div id="loading-wrapper"><div></div></div>');
                this.loader = $j('#loading-wrapper');
            }
        }
    },
    ajaxLoadOn : function(){
        $(document.body).insert({
            top: new Element ('div', {id: 'ajaxLoading'})
        });
    },
    ajaxLoadOff : function(){
        if($('ajaxLoading') != undefined) {
            $('ajaxLoading').remove();
        }
    },
    truncateAttributeList : function () {
        $j('#narrow-by-list dd ol').each(function() {
            var ol = $j(this);
            var lis = ol.find('li:gt(4)');
            if (lis.length) {
                lis.hide();
                ol.append(
                    $j('<li><a href="#">more...</a></li>').click( function(e){
                        e.preventDefault();
                        $j(this).siblings(':hidden').show().end().remove();
                    })
                );
            }

        });
    },
    giftCards : {
        fullyPaid : false,
        freeMethod : null,
        paymentMethodContainers : null,
        paymentStepContainer : null,
        reviewStepContainer : null,
        init : function() {
            this.form = $j('#giftcard-form');
            this.stepContainer = this.form.parents('#checkout-step-payment');
            this.btnApplyGiftCard = $j('#apply-giftcard').click(this.addGiftCard);
            this.btnCheckGiftCard = $j('#check-giftcard').click(this.checkGiftCard);
            this.btnRemoveGiftCard = $j('body').on('click','.checkout-totals-gc .btn-remove',this.removeGiftCard);
            this.btnFormToggle = $j('#gift-card-wrapper h2 a').click(this.toggleForm);
            this.responseContainer = $j('#giftcard_response');
            this.hasResponseContainer = this.responseContainer.length;
            this.isOnpageCheckout = $j('body.checkout-onepage-index').length;
        },
        requestConfig : {
            type: "POST",
            url: '',
            dataType: 'json',
            headers: {'X_REQUESTED_WITH':'XMLHttpRequest'},
            data : {},
            beforeSend : function() {
                //console.log('Zumiez.giftCards.action: ', Zumiez.giftCards.action);
                if (typeof checkout !== 'undefined') {
                    if (Zumiez.giftCards.action == 'add' || Zumiez.giftCards.action == 'check') {
                        payment.isLoading(true);
                        payment.showMask();

                        $$('.validation-failed').invoke('removeClassName','validation-failed');
                        if ($('advice-required-entry-giftcard_code')) {
                            $('advice-required-entry-giftcard_code').remove();
                        }
                        if ($('advice-required-entry-giftcard_pin')) {
                            $('advice-required-entry-giftcard_pin').remove();
                        }
                        if ($('gift-card-balance-check')) {
                            $('gift-card-balance-check').remove();
                        }
                        Zumiez.giftCards.responseContainer.removeClass().html('');

                    }
                    else if (Zumiez.giftCards.action == 'remove') {
                        review.isLoading(true);
                        review.showMask();
                    }
                }
            },
            success: function(data) {
                if (Zumiez.giftCards.hasResponseContainer) {
                    if (data.status === 'apply-error-not-valid' || data.status === 'balance-error') {
                        $('giftcard_code').addClassName('validation-failed');
                        $('giftcard_code').insert({
                            after: '<div class="validation-advice" id="advice-required-entry-giftcard_code">Please enter a valid Gift Card number</div>'
                        });
                        $('giftcard_pin').addClassName('validation-failed');
                        $('giftcard_pin').insert({
                            after: '<div class="validation-advice" id="advice-required-entry-giftcard_pin">Please enter a valid Gift Card PIN.</div>'
                        });
                        return;
                    }
                    if (data.status === 'apply-error-in-use') {
                        Zumiez.giftCards.responseContainer.removeClass().addClass('error');
                        Zumiez.giftCards.responseContainer.html(data.message);
                        return;
                    }
                    if (data.status === 'balance') {
                        $('giftcard-form').insert({
                            after: data.message
                        });
                        return;
                    }
                    if (data.status) {
                        Zumiez.giftCards.responseContainer.removeClass().addClass(data.status);
                    } else {
                        Zumiez.giftCards.responseContainer.css('color','#42A506');
                    }
                    Zumiez.giftCards.responseContainer.html(data.message);
                }
                else {
                    window.location.reload();
                }
            },
            complete: function() {
                if (typeof checkout !== 'undefined') {
                    payment.isLoading(false);
                    payment.hideMask();
                    review.isLoading(false);
                    review.hideMask();
                    if (Zumiez.giftCards.action == 'add' || Zumiez.giftCards.action == 'remove') {
                        EcomDev.CheckItOut.instance.addToReload(payment);
                        EcomDev.CheckItOut.instance.addToReload(review);
                        EcomDev.CheckItOut.instance.reload();
                    }
                }
                Zumiez.giftCards.action = '';
            }
        },
        toggleForm : function() {
            var lnk = $j(this);
            Zumiez.giftCards.form.find('fieldset').slideToggle();
            lnk.toggleClass('card-open');
            return false;
        },
        addGiftCard : function() {
            if (!giftcardForm.validator.validate()) {return;}
            Zumiez.giftCards.action = 'add';
            Zumiez.giftCards.setRequestData();
            Zumiez.giftCards.requestConfig.url = '/giftcard/checkout/add/';
            if (Zumiez.giftCards.isOnpageCheckout) {
                Zumiez.giftCards.requestConfig.url += 'onepage/true';
            }
            var config = Zumiez.giftCards.requestConfig;
            $j.ajax(config);
        },
        removeGiftCard : function(ev) {
            ev.preventDefault();
            Zumiez.giftCards.action = 'remove';
            Zumiez.giftCards.requestConfig.url = $j(ev.target).closest('a').attr('href');
            if (Zumiez.giftCards.isOnpageCheckout) {
                Zumiez.giftCards.requestConfig.url += 'onepage/true';
            }
            var config = Zumiez.giftCards.requestConfig;
            $j.ajax(config);
        },
        checkGiftCard : function() {
            if (!giftcardForm.validator.validate()) {return;}
            Zumiez.giftCards.action = 'check';
            Zumiez.giftCards.setRequestData();
            Zumiez.giftCards.requestConfig.url = '/giftcard/checkout/quickCheck/';
            var config = Zumiez.giftCards.requestConfig;
            $j.ajax(config);
        },
        setRequestData : function() {
            Zumiez.giftCards.requestConfig.data = Zumiez.giftCards.form.serialize();
        }
    },
    readCookie: function (name)
	{
	  name += '=';
	  var parts = document.cookie.split(/;\s*/);
	  for (var i = 0; i < parts.length; i++)
	  {
	    var part = parts[i];
	    if (part.indexOf(name) == 0)
	      return part.substring(name.length)
	  }
	  return null;
	},
    cartItems : {
        init : function() {
 	        this.cartItems = Zumiez.readCookie('cartItems');
            this.cartHeader = $j('#top-link-cart');
            this.render();
        },
        updateCart: function(itemCount) {
            this.cartItems = itemCount;
            this.render();
        },
        render: function() {
            var itemCount = 0;
            if (this.cartItems) {
                itemCount = this.cartItems;
            }
            this.cartHeader.html('My Bag (' + itemCount + ')');
        }
    },
    birthdayValidation : function() {
        $j('.customer-dob input').removeClass('validate-custom');
        $j('.customer-dob input').blur(function(){
            $j('.customer-dob').removeClass('validation-passed');
        });
        $j('.customer-dob #year').blur(function(){
            $j('.customer-dob input').addClass('validate-custom');
        });
    },
    checkoutValidation : function() {
        $j('#cybersource_soap_cc_number').removeClass('validate-cc-type validate-cc-number');
        $j('#cybersource_soap_cc_cid').removeClass('validate-cc-cvn');
        $j('.newAccountPass').removeClass('validate-password');
        $j('.newAccountPassConfirm').removeClass('validate-cpassword');
        $j('#cybersource_soap_cc_number').blur(function(){
           $j(this).addClass('validate-cc-type validate-cc-number');
        });
        $j('#cybersource_soap_cc_cid').blur(function(){
           $j(this).addClass('validate-cc-cvn');
        });
        $j('.billingEmail').blur(function(){
           $j(this).addClass('validate-email');
        });
        $j('.newAccountPass').blur(function(){
           $j(this).addClass('validate-password');
        });
        $j('.newAccountPassConfirm').blur(function(){
           $j(this).addClass('validate-cpassword');
        });
    }
};

// Fire when dom content is ready
$j(document).ready(function() {

    $j.ajaxSetup({cache: false});
    Zumiez.globalLoading.init();

    // ==== Popup - reusable triggers
    // Trigger for Popup Hints
    $j(document).on('hover', '.popup-trigger', function(){
        var container = "popup_" + $j(this).data('target-id');
        document.getElementById(container).style.display = 'block';
    });
    // Hide / show the hint modal content
    $j(document).on({mouseenter: function(){$j(this).stop(true,true).fadeIn(250);}, mouseleave: function(){$j(this).stop(true,true).fadeOut(500);}}, '.popup_hint');

    if ($j('#tab-container-1').length) {
        var tabber1 = new Yetii({
            id: 'tab-container-1',
            persist: false,
            interval: 5
        });
    }
    if ($j('#gift-card-wrapper').length) {
        Zumiez.giftCards.init();
    }
    if($j('.customer-account-edit').length){
        Zumiez.birthdayValidation();
    }
    if($j('.checkout-onepage-index').length){
       Zumiez.checkoutValidation();
    }
    $j(this).ajaxStop(function(){
        var body = $j('body');
        if (body.hasClass('ajax-loading')) {
            body.removeClass('ajax-loading');
        }
    });
    // Moved these calls up to doc.ready - Fixed IE8 issues
    if($j('#checkout-layout').hasClass('SOLD')){
        Zumiez.soldCheckout();
    }

// Fired after all content has loaded on the page
$j(window).load(function(){

    // If they unclick the stash "same as ph." checkbox
    $j("#zmz_stash_id_cb2").change(function(){
        // Make sure the input is clean
        $j('#zmz_stash_id2').val('');
        $j('#stashPhoneField2').toggle();
    });
    // end Stash code

    // colorbox
    $j('#largeView').colorbox({iframe: true, fastIframe: false, scrolling: false, width: "75%", height: "95%"});
    $j('.whereGC').colorbox();
    $j('#signUpForEmail').colorbox({iframe: true, width: "530px", height: "530px"});

    $j('#findinstore').click(function(){
        Zumiez.findinstore.validate();
        if (!productAddToCartForm.validator.validate()) {
            return false;
        } else {
            $j(this).colorbox({
                iframe: true,
                width: "680px",
                height: "600px",
                href: function() {
                    return '/storelocator/item/index?' + $('product_addtocart_form').serialize();
                }
            });
        }
    });

    $j('#locate-item').on('submit', function(event){
        event.preventDefault();
        var zipCode = $j('#zip').val() || '';
        var radius = $j('#radius').val() || '';
        var productID = (typeof window.parent.google_tag_params !== 'undefined' && window.parent.google_tag_params.ecomm_prodid !== undefined) ? window.parent.google_tag_params.ecomm_prodid : $j('title', window.parent.document).text();
        _gaq.push(['_trackEvent', 'Find in Store - Zip Code Search', 'Zip Code: ' + zipCode + ' :: Radius:' + radius, productID]);
        event.target.submit();
    });

    $j('.restrictions-popup').colorbox({iframe: true, width: "460px", height: "550px"});
    $j('.overlay-emailbag').colorbox({iframe: true, width: "440px", height: "480px", fastIframe: false, scrolling: false});
    $j('.pdp-main-image-wrapper a').colorbox({
       iframe: true,
        width: "900px",
        height: "700px"
    });
    $j('.sizechart').colorbox({iframe:true, width: '1150px', height: '540px', fastIframe: false, scrolling: false});

            $j('#email-product').colorbox({
                width: 494,
                height: 620,
                href: function(){
                    var productOptions = jQuery('#product_addtocart_form').serializeArray(),
                        url = document.querySelector('#email-product').getAttribute('href');

                    if(productOptions[2].value !== "")
                        url = url+'?color='+productOptions[1].value+'&size='+productOptions[2].value;

                    return url;
                },
                onComplete: function() {
                    /* CrowdTwist - Stash - Event: Share a product */
                    // Make sure base crowd twist variable is on page
                    if (!window.CT) {
                        window.CT = {};
                    }

                    // Check for this script and flag it
                    if (!window.CT.productsRcs) {
                        window.CT.productsRcs = true;
                    }

                    // Prep generic data
                    var ct_data = {
                        link: location.href,
                        title: document.title.substr(0, 100),
                        desc: $j('meta[name=description]').attr('content').substr(0, 250)
                    };

                    // Image data if we are on a pdp
                    if ($j('body').hasClass('catalog-product-view')) {
                        // PDP img
                        ct_data.image = $j('#zoom img').first().attr('src');
                    }

                    // Form Validation
                    new VarienForm('cart_sendfriend');

                    // AJAX for submitting the form
                    $j('#cart_sendfriend').submit(function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    $j.ajax({
                        type: 'POST',
                        url: '/emailproducttofriend/index/formSubmit',
                        data: $j('#cart_sendfriend').serialize(),
                        dataType: 'json' //Expecting json_encoded so let jquery decode

                    }).done(function (data) {
                        // Note: we also have data.status if we want it
                        // Display feedback
                        $j('#cart_sendfriend').html(data.html);
                    }).always(function () {
                        // Send off to crowdtwist for their effort
                        ct_trck_shared_a_product(ct_data);

                        // Close the colorbox
                        setTimeout(function () {
                        $j.colorbox.close();
                        }, 4500);
                    });
                });
            }
        });
    });
});
// function for gift card continue
var gcNext = function(){
	var thisUrl = window.location.href + "savePayment";
	var dataString = "payment%5Bmethod%5D=free";
	$j.ajax({
			type: "POST",
			beforeSend: function(){
				jQuery('#payment-please-wait').fadeIn('fast');
				},
			url: thisUrl,
			data: dataString,
			dataType: "json",
			success: function(response) {
				$j('#payment-please-wait').fadeOut('fast');
				$j('.order-review').html(response.update_section.html);
				//checkout.accordion.openSection('opc-review');
				$j('#checkout-step-payment').fadeOut('fast', function(){
				$j('#checkout-step-review').fadeIn('fast');
				});
				checkout.loadWaiting = false;
				checkout.reloadProgressBlock();
			}
		});
	};

function openModal(thisObject, modalWidth, modalHeight, setIframe) {
    $j.colorbox({
        href:thisObject.href,
        width: modalWidth,
        height: modalHeight,
        iframe: setIframe
    });
    return false;
}

Validation.add(
    'validate-emails-match',
    'This email does not match',
    function(value, el) {
        var matchEl = $(el.getAttribute('data-match'));
        return el.value.toUpperCase() == matchEl.value.toUpperCase();
    }
);

Validation.add(
    'no-past-date',
    'Please choose today or a date in the future.',
    function (value, el) {
        // Get all the date field parts.
        var day   = parseInt($(el.getAttribute('data-day-field')).value) || 0,
            month = parseInt($(el.getAttribute('data-month-field')).value) || 0,
            year  = parseInt(el.value) || 0;

        // If the date is not complete, then return true. There are other validators to take care of this
        if (day == 0 || month == 0 || year == 0) {
            return true;
        }

        var now = new Date();

        // Make sure the date is not less than the current date. Timezone agnostic.
        return year > now.getFullYear()
            || year === now.getFullYear()
                && (month > now.getMonth() + 1 || month === now.getMonth() + 1 && day >= now.getDate());

    }
);

// Replace Gift Card Style select with thumbs
document.observe("dom:loaded", function() {

    if (typeof window.spConfig != 'undefined'
        && typeof window.spConfig.config.giftCardStyleAttributeId != 'undefined'
        )
    {
        var config = window.spConfig.config,
            attributeId = config.giftCardStyleAttributeId,
            elementId = 'attribute' + attributeId,
            configOptions = config.attributes[attributeId].options,
            configOptionsLength = configOptions.length,
            selectElement = $(elementId),
            selectOptions = selectElement.options,
            selectOptionsLength = selectOptions.length,
            container = new Element('div').addClassName('thumb-select'),
            parent = selectElement.up().addClassName('thumb-select-container'),

            createThumbElement = function (selectOption, container, url) {
                var el = new Element('div').addClassName('thumb-option');

                    thumbClickHandler = function (event) {
                        $(container).select('.thumb-option').invoke('removeClassName', 'selected');
                        selectOption.selected = true;
                        el.addClassName('selected');
                        window.spConfig.configureElement(selectElement);
                    };

                el.appendChild(new Element('img', {'src': url}).observe('click', thumbClickHandler));

                return el;
            };

        for (var i = 0; i < selectOptionsLength; i++) {
            var selectOption = selectOptions[i],
                optionId = selectOption.value;

            // Must loop through the config options to find the one we're looking for, as they're not indexed.
            for (var j = 0; j < configOptionsLength; j++) {
                if (configOptions[j].id == optionId) {
                    var configOption = configOptions[j],
                        thumbImg = configOption.thumbImg;
                    container.appendChild(createThumbElement(selectOption, container, thumbImg));
                }
            }

            parent.appendChild(container);

        }

    }

});
