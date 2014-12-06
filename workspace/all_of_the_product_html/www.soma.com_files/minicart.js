/**
 * MINI CART CLASS
 * contains functions used to render the persistent cart across the
 * site and the cart on the order page
 */

_ctoMiniCartClass = function(Config) {

    this.Lang = {
        'global': {
            'inventoryError': 'The availability of one or more items has changed'
        },
        'itemLevel': {
            'inventoryError': 'Availability has changed <a href="' + 'http://' + document.location.hostname + '/store/checkout/cart.jsp"><u>View details</u></a>'
        }
    }

    this.triggers = function() {
        var collapsedState = false;
        var forceCloseFlag = false;
        var flyOutEngaged = false;
        var lastMouseoverEl = '';
        $('#pc-main').mouseover(function(e, noAnimDuration, invokedFromUpdate, mouseleaveTimeout) {
            if($('#pc-wrapper:animated').length < 1) {
                var duration = (noAnimDuration) ? 0 : Config.flyIn.duration;
                if(invokedFromUpdate) {
                    _cto.clearObjDataTimeouts($('#pc-container'), ['tidML']);
                    $('#pc-overflow').show();
                    $('#pc-wrapper').animate({ marginTop: '0' }, duration, 'fasEaseIn', function() {
                        $('#pc-container').trigger('mouseleave', [false, mouseleaveTimeout]);
                        collapsedState = true;
                    });
                } else {
                    if(lastMouseoverEl == '#pc-container') {
                        _cto.clearObjDataTimeouts($('#pc-container'), ['tidML']);
                    }
                    if(!$(this).data('tidMO') || $(this).data('tidMO') == '') {
                        var tidMO = setTimeout(function() {
                            $('#pc-overflow').show();
                            $('#pc-wrapper').stop(true).animate({ marginTop: '0' }, duration, 'fasEaseIn', function() {
                                if(collapsedState == false) {
                                    _D('_ctoMiniCart.triggers|Omniture Tagging|persistentCart');
                                    set_page_send_tag(s.brandName,'persistentCart'); // Omniture tagging for persistent cart view
                                    collapsedState = true;
                                }
                                _ctoMiniCart.snapOverflowContainer();
                            });
                        }, Config.delayBeforeFlyIn.duration);
                        $(this).data('tidMO', tidMO);
                    }
                }
            }
            lastMouseoverEl = '#pc-main';
        }).mouseleave(function() {
                _cto.clearObjDataTimeouts($('#pc-main'), ['tidMO']);
                _cto.clearObjDataTimeouts($('#pc-container'), ['tidMO2']);
            }).find('a:last').attr('href', '#').mouseover(function() {
                $('#pc-container').trigger('mouseover');
            }).mouseleave(function() {
                _cto.clearObjDataTimeouts($('#pc-main'), ['tidMO']);
                _cto.clearObjDataTimeouts($('#pc-container'), ['tidMO2']);
            });
        $('#pc-container').mouseover(function() {
            if($('#pc-wrapper:animated').length < 1) {
                if(lastMouseoverEl == '#pc-main') {
                    _cto.clearObjDataTimeouts($('#pc-container'), ['tidML']);
                }
                if(!$(this).data('tidMO2') || $(this).data('tidMO2') == '') {
                    var tidMO2 = setTimeout(function() {
                        $('#pc-wrapper').stop(true).animate({ marginTop: '0' }, Config.flyIn.duration, 'fasEaseIn', function() {
                            if(collapsedState == false) {
                                _D('_ctoMiniCart.triggers|Omniture Tagging|persistentCart');
                                set_page_send_tag(s.brandName,'persistentCart'); // Omniture tagging for persistent cart view
                                collapsedState = true;
                            }
                        });
                    }, Config.delayBeforeFlyIn.duration);
                    $(this).data('tidMO2', tidMO2);
                }
            } else {
                if(!forceCloseFlag && (flyOutEngaged || collapsedState)) {
                    if(lastMouseoverEl == '#pc-main') {
                        _cto.clearObjDataTimeouts($('#pc-container'), ['tidML', 'tidMO2']);
                    } else {
                        _cto.clearObjDataTimeouts($('#pc-main'), ['tidMO']);
                    }
                    _ctoMiniCart.snapOverflowContainer();
                    $('#pc-wrapper').stop(true).animate({ marginTop: '0' }, Config.flyIn.duration, 'fasEaseIn', function() {
                        collapsedState = true;
                    });
                }
            }
            lastMouseoverEl = '#pc-container';
        }).mouseleave(function(e, noTimeoutDuration, mouseleaveTimeout) {
                _cto.clearObjDataTimeouts($('#pc-main'), ['tidMO']);
                _cto.clearObjDataTimeouts($('#pc-container'), ['tidMO2']);
                if(!$(this).data('tidML') || $(this).data('tidML') == '') {
                    var tidML = setTimeout(function(){
                        flyOutEngaged = true;
                        $('#pc-wrapper').stop(true).animate({ marginTop: $('#pc-wrapper').outerHeight() * -1 }, Config.flyOut.duration, 'fasEaseOut', function() {
                            $('#pc-items').scrollTop(0);
                            $('#pc-overflow').removeAttr('style').hide();
                            collapsedState = false;
                            forceCloseFlag = false;
                            flyOutEngaged = false;
                        });
                    }, (noTimeoutDuration) ? 0 : mouseleaveTimeout || Config.timeOut.duration1);
                    $(this).data('tidML', tidML);
                }
            });
        $('#pc-close, #pc-continue a').bind('mousedown', function() {
            forceCloseFlag = true;
            _cto.clearObjDataTimeouts($('#pc-main'), ['tidMO']);
            _cto.clearObjDataTimeouts($('#pc-container'), ['tidMO2']);
            if($('#pc-wrapper:animated').length > 0) {
                $('#pc-wrapper').stop(true, true);
            }
            $('#pc-container').trigger('mouseleave', true);
        });
    };

    this.snapOverflowContainer = function() {
        $('#pc-overflow').height($('#pc-wrapper').outerHeight());
    }

    this.populate = function() {
        $('#pc-items').addClass('loading');
        _cto.ajax({
            url: '/store/common/json/cart.jsp?task=onLoadCart&isCartPage=' + _cto.statics.isCartPage + '&isOrderPage=' + _cto.statics.isOrderPage + '&isShopPage=' + _cto.statics.isShopPage,
            dataType: 'json',
            success: function(data) {
                _cto.data = data;
                if(_cto.isCartOrCheckoutObject(data)) {
                    _ctoMiniCart.build(data, false);
                    if($('#pc-items').hasClass('loading') && _ctoMiniCart.isCollapsed()) {
                        _ctoMiniCart.snapOverflowContainer();
                    }
                    $('#pc-items').removeClass('loading');
                    if(_cto.statics.isIpad) {
                        $('#pc-items').css('maxHeight', '10000px');
                    }
                }
            }
        });
    }

    this.build = function(data, animateItems, formName) {
        window.cartData = data;
        $(window).trigger('cartDataReady');        
        // get all items in current persistent cart
        var curItems = [];
        $('#pc-items .pc-product[id^="pc-item-"]').each(function() {
            curItems.push($(this).attr('id').split('pc-item-')[1]);
        });

        // only add items not in current persistent cart
        var retItems = [];
        var newItems = [];
        var itemHtml = '';
        var cartContainsInventoryError = false;
        var isOrderPage = $('.is-order-page').length > 0;
        var cartItems = data.items;
        if (isOrderPage) {
            var miniCartCollection = new CTUI.MiniCartItemCollection(data);
            cartItems = miniCartCollection.getAll();
        }
        $.each(cartItems, function(index, item) {
            var uid = item.itemId + '_' + item.qty; // build unique identifier based on sku and qty

            if  (typeof item.giftQty != 'undefined') {
                uid = item.itemId + '_' + item.qty + '_' + item.giftQty;
            }

            var title = ($(item.name).length > 32) ? $(item.name).substring(0, 32) + '&#8230;' : item.name; // build product title
            title = title.replace(/&amp;/g,'&');

            // apply free label
            item.unitItemPrice = (item.unitItemPrice == '$0.00') ? 'FREE' : item.unitItemPrice;
            item.rawItemPrice = (item.rawItemPrice == '$0.00') ? 'FREE' : item.rawItemPrice;
            item.finalItemPrice = (item.finalItemPrice == '$0.00') ? 'FREE' : item.finalItemPrice;

            // update item price if exists
            if($('#pc-item-' + uid + ' .pc-price').length) {
                if(item.rawItemPrice == item.finalItemPrice) {
                    $('#pc-item-' + uid + ' .pc-price').html(item.rawItemPrice);
                } else {
                    rawItemPrice = (item.rawItemPrice == item.finalItemPrice) ? '' : item.rawItemPrice;
                    $('#pc-item-' + uid + ' .pc-price').html('<s><span class="sb-price-before-discount">' + rawItemPrice + '</span></s><div class="sb-price-after-discount">' + item.finalItemPrice + '</div>');
                }
            }

            // render new item html
            retItems.push(uid); // store items in response
            if($.inArray(uid, curItems) < 0) {
                var row = '<div id="pc-item-' + uid + '" class="pc-product"' + ((animateItems) ? ' style="display: none;"' : '') + '>';
                row += '<div class="pc-product-divider"></div>';
                row += '<div class="pc-product-image">';
                row += '<img src="' + item.image.replace('_shelf2', '_thumb2') + '" height="65" width="52" />';
                if(item.gwp == 'true') row += '<img class="pc-gwp" src="/store/images/checkout_redesign/chs_perCart_gift.gif"/>';
                row += '</div>';
                //row += '<div class="pc-title" ><a href="/store/browse/product.jsp?productId=' + item.style + '&color=' + item.color + 'prd=' + item.name.replace(/ /g, '+') + '">' + item.name + '</a></div>';
                row += '<div class="pc-product-info-container">';
                row += '<div class="pc-product-info-row1">';
                row += '<div class="pc-title" >' + title + '</div>';
                if(item.rawItemPrice == item.finalItemPrice) {
                    row += '<div class="pc-price">' + item.finalItemPrice + '</div>';
                } else {
                    rawItemPrice = (item.rawItemPrice == item.finalItemPrice) ? '' : item.rawItemPrice;
                    row += '<div class="pc-price"><s><span class="sb-price-before-discount">' + rawItemPrice + '</span></s><div class="sb-price-after-discount">' + item.finalItemPrice + '</div></div>';
                }
                row += '</div>';
                row += '<div class="pc-product-info-row2">';
                row += '<table class="pc-details" cellpadding="0" cellspacing="0">';
                if(item.itemNotAvailable || item.shortInvAlert) {
                    if(!cartContainsInventoryError) cartContainsInventoryError = true;
                    row += '<tr><td class="pc-value" colspan="3">' + _ctoMiniCart.Lang.itemLevel.inventoryError + '</td></tr>';
                } else {
                    if(item.color) row += '<tr class="pc-color"><td class="pc-label">Color:</td><td class="pc-value" colspan="2">' + item.color + '</td></tr>';

                    if(item.designName) row += '<tr class="pc-design"><td class="pc-label">Design:</td><td class="pc-value" colspan="2">' + item.designName + '</td></tr>';

                    if(item.size) row += '<tr class="pc-size"><td class="pc-label">Size:</td><td class="pc-value" colspan="2">' + item.size + '</td></tr>';

                    if(item.length) row += '<tr class="pc-length"><td class="pc-label">Length:</td><td class="pc-value" colspan="2">' + _cto.heDecode(this.length) + '</td></tr>';

                    if(item.backOrderFlag) row += '<tr class="pc-length"><td class="pc-value" colspan="3">' + item.expectedShipDate + '</td></tr>';
                }
                row += '<tr class="pc-qty"><td class="pc-label" style="' + ((item.itemNotAvailable || item.shortInvAlert) ? 'visibility:hidden' : '') + '">Qty:</td><td class="pc-value" style="' + ((item.itemNotAvailable || item.shortInvAlert) ? 'visibility:hidden' : '') + '">' + item.qty + '</td><td class="pc-controls-wrapper">';
                row += '<div class="pc-controls">';
                if(_cto.statics.isOrderPage) {
                    if(item.gwp == 'true' || item.isGiftCard == 'true') {
                        row += '<a class="pcItemRemove" href="javascript:void(0);" onclick="_ctoMiniCart.remItem(\'' + item.itemId + '\', true);">Remove</a><span class="removeAlert" style="display: none;">Are you sure? <a onclick="_ctoTagging.asyncAction.removeFromBag({\'categoryId\': \'' + item.categoryId + '\', \'style\': \'' + item.style + '\'});_ctoMiniCart.remItem(\'' + item.itemId + '\', false);" href="javascript: void(0);">Yes</a> or <a onclick="_ctoMiniCart.remItemReset(\'' + item.itemId + '\');" href="javascript: void(0);">No</a></span>';
                    } else {
                        if(!item.length){
                            row += '<a class="pcItemEdit" href="javascript: void(0);" onclick="quickView.quickLaunch(\'' + _cto.scrapeProductIdFromUrl(item.link) + '\',\'' + item.colorCode + '\',\'CHECKOUT_EDIT\',\'' + item.itemId + '\',\'' + 'none' + '\', \'' + ((item.size) ? item.size : '') + '\', \'' + item.designSku + '\');return false;">Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="pcItemRemove" href="javascript:void(0);" onclick="_ctoMiniCart.remItem(\'' + item.itemId + '\', true);">Remove</a><span class="removeAlert" style="display: none;">Are you sure? <a onclick="_ctoTagging.asyncAction.removeFromBag({\'categoryId\': \'' + item.categoryId + '\', \'style\': \'' + item.style + '\'});_ctoMiniCart.remItem(\'' + item.itemId + '\', false);" href="javascript: void(0);">Yes</a> or <a onclick="_ctoMiniCart.remItemReset(\'' + item.itemId + '\');" href="javascript: void(0);">No</a></span>';
                        }else{
                            row += '<a class="pcItemEdit" href="javascript: void(0);" onclick="quickView.quickLaunch(\'' + _cto.scrapeProductIdFromUrl(item.link) + '\',\'' + item.colorCode + '\',\'CHECKOUT_EDIT\',\'' + item.itemId + '\',\'' + _cto.heDecode(item.length) + '\', \'' + ((item.size) ? item.size : '') + '\', \'' + item.designSku + '\');return false;">Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="pcItemRemove" href="javascript:void(0);" onclick="_ctoMiniCart.remItem(\'' + item.itemId + '\', true);">Remove</a><span class="removeAlert" style="display: none;">Are you sure? <a onclick="_ctoTagging.asyncAction.removeFromBag({\'categoryId\': \'' + item.categoryId + '\', \'style\': \'' + item.style + '\'});_ctoMiniCart.remItem(\'' + item.itemId + '\', false);" href="javascript: void(0);">Yes</a> or <a onclick="_ctoMiniCart.remItemReset(\'' + item.itemId + '\');" href="javascript: void(0);">No</a></span>';
                        }
                    }
                } else {
                    if(item.gwp == 'true' || item.isGiftCard == 'true') {
                        row += '';
                    } else {
                        row += '<a class="pcItemEdit" href="' + 'http://' + document.location.hostname + '/store/checkout/cart.jsp" rel="' + item.itemId + '">edit</a>';
                    }
                }
                row += '</div>';
                row += '</td></tr>';
                row += '</table>';
                // Item is a gift; Show message.
                if (item.giftQty == 1 && item.giftQty == item.qty) {
                    row += '<div class="pcItemGift"><span class="gifting-icon"></span> This item is a gift </div>';
                } else if (item.giftQty == 1) {
                    row += '<div class="pcItemGift"><span class="gifting-icon"></span> Quantity Gifted: ' + item.giftQty + '</div>';
                } else if (item.giftQty > 1) {
                    row += '<div class="pcItemGift"><span class="gifting-icon"></span> Quantity Gifted: ' + item.giftQty + '</div>';
                }
                row += '<div class="clear"></div>';
                row += '</div>';
                row += '</div>';
                row += '</div>';

                // append row to string buffer
                itemHtml += row;

                // add this item to array so we can highlight them after update
                newItems.push(uid);
            }



        });

        // store removed items
        var remItems = [];
        $.each(curItems, function(index, item) {
            if($.inArray(item, retItems) < 0) {
                remItems.push(item);
            };
        });

        // closeness qualifier
        if(data.closenessQualifierMsgs) {
            $('#pc-close-qualif').html(data.closenessQualifierMsgs);
        } else {
            $('#pc-close-qualif').html('');
        }

        // apply item html to existing items
        itemHtml += $('#pc-items').html();
        $('#pc-items').html(itemHtml);

        // apply cart errors
        $('#pc-items .pc-errors').remove();
        $('<div class="pc-errors"></div>').prependTo('#pc-items');

        // append inventory error
        if(cartContainsInventoryError) {
            data.formErrors.cart.push({'message': _ctoMiniCart.Lang.global.inventoryError});
        }

        // cart level errors
        $.each(data.formErrors.cart, function() {
            $('<div class="pc-error">' + _cto.heDecode(this.message) + '</div>').prependTo('#pc-items .pc-errors');
        });

        // product dividers
        $('.pc-product-divider').each(function(index, obj) {
            if(index == 0) {
                $(this).addClass('pc-product-divider-first');
            } else {
                $(this).removeClass('pc-product-divider-first');
            }
        });
        $('.pc-product').each(function(index, obj) {
            if(index > 0) {
                $(this).addClass('pc-product-fix');
            } else {
                $(this).removeClass('pc-product-fix');
            }
        });

        // merge unclaimed coupons into discounts object
        $.merge(data.promoDiscounts, data.conditionalMessages);

        // claimed coupons
        var curClaimed = [];
        $('.sb-discount').each(function() {
            couponId = $(this).attr('id').split('promo')[1];
            curClaimed.push(couponId);
        });
        var retClaimed = [];
        $(data.promoDiscounts).each(function() {
            retClaimed.push(this.couponId);
        });
        var remClaimed = [];
        $(curClaimed).each(function(index, couponId) {
            if($.inArray(couponId, retClaimed) == -1) {
                remClaimed.push(couponId);
            }
        })
        var newClaimed = [];
        $(data.promoDiscounts).each(function(index, obj) {
            if($.inArray(this.couponId, curClaimed) == -1) {
                if(this.message) {
                    this.discountMessage = this.message;
                    this.discountAmount = '';
                    this.isClaimed = false;
                } else { // is claimed
                    this.isClaimed = true;
                }
                if(this.isClaimed == false && $('#pc-promos-pending').length < 1) {
                    $('<div id="pc-promos-pending"></div>').insertBefore('#sb-promo-errors');
                }
                // For coupon-driven shipping promos we hide the discount amount but display the remove link
                var promoDiscountAmount = (this.discountAmount === '-($0.00)') ? '' : this.discountAmount;
                  
                 //undefined error fix? W20140226
                 if(typeof promoRemoveLinkTemplate !== "undefined") {
                    $('<div id="promo' + this.couponId + '" class="pc-totals-row sb-discount sb-promo-is-' + this.type + ((this.isClaimed == false) ? ' sb-error-message' : '') + '"' + ((animateItems) ? ' style="display: none;"' : '') + '><div class="pc-label"><span class="sb-promo-msg">' +      _cto.heDecode(this.discountMessage) + '</span></div><div class="pc-price"><span class="sb-promo-rem">' + promoRemoveLinkTemplate.replace('_DAV=', '_DAV=' + this.couponId.replace('_unclaimed', '').split('-')[0]) + '</span><span class="sb-promo-dis-price">' + promoDiscountAmount + '</span></div><div class="clear"></div></div>').appendTo((this.isClaimed) ? '#pc-promos' : '#pc-promos-pending')
                 }                

                if($('#promo' + this.couponId + '.sb-error-message').length) {
                    $('#promo' + this.couponId + '.sb-error-message').css('paddingLeft', '0px');
                }
                newClaimed.push(this.couponId);
            }
        });

        if(data.bagCount > 0) {

            // hide empty cart msg
            $('#pc-items-empty').hide();

            // update subtotal
            if(data.itemsSubtotal) $('#pc-subtotal .pc-value').html(data.itemsSubtotal);

            // update shipping cost - only show free shipping in persistent cart
            if(data.shippingCost) {
                var shipCost = ((data.shippingCost == '$0.00') || (data.shippingCost == '0.00')) ? 'FREE' : data.shippingCost;
                if(!_cto.statics.isOrderPage && !_cto.statics.isCartPage) {
                    if(shipCost == 'FREE') {
                        $('#pc-shipping .pc-value').html(shipCost);
                    } else {
                        $('#pc-shipping').hide();
                        data.itemsTotal = data.itemsTotalNoShipping;
                    }
                } else {
                    $('#pc-shipping .pc-value').html(shipCost);
                }
            }
            else
            {
                $('#pc-shipping').hide();
                data.itemsTotal = data.itemsTotalNoShipping;
            }

            // update sales tax
            data.salesTax = ((data.salesTax == '$0.00') || (data.salesTax == '0.00')) ? false : data.salesTax;
            if(data.salesTax) {
                if($('#pc-tax .pc-value').text() != data.salesTax) {
                    $('#pc-tax').remove();
                    if(data.isBorderFree == 'true') {
                      $('<div id="pc-tax" class="pc-totals-row" style="display: none"><div class="pc-label">Duties & Taxes</div><div class="pc-value">' + data.salesTax + '</div><div class="clear"></div></div>').insertAfter('#pc-shipping').fasToggle();	
                    } else {
                      $('<div id="pc-tax" class="pc-totals-row" style="display: none"><div class="pc-label">Sales Tax</div><div class="pc-value">' + data.salesTax + '</div><div class="clear"></div></div>').insertAfter('#pc-shipping').fasToggle();
                    }
                } else {
                    if($('#pc-tax').css('display') == 'none') {
                        $('#pc-tax').fasToggle();
                    }
                }
            } else {
                if($('#pc-tax').css('display') != 'none') {
                    $('#pc-tax').fasToggle();
                }
            }

            // update gift options
            data.GiftOptions = ((data.GiftOptions == '$0.00') || (data.GiftOptions == '0.00')) ? false : data.GiftOptions;
            if(data.GiftOptions) {
                if($('#pc-gift .pc-value').text() != data.GiftOptions) {
                    $('#pc-gift').remove();
                    $('<div id="pc-gift" class="pc-totals-row" style="display: none"><div class="pc-label">Gift Options</div><div class="pc-value">' + data.GiftOptions + '</div><div class="clear"></div></div>').insertAfter('#pc-shipping').fasToggle();
                } else {
                    if($('#pc-tax').css('display') == 'none') {
                        $('#pc-tax').fasToggle();
                    }
                }
            } else {
                $('#pc-gift').remove();
            }

            // update grand total
            if(data.itemsTotal) $('#pc-grandtotal .pc-value').html(data.itemsTotal);

            // make totals visible
            $('#pc-totals').show();

            // enable checkout button
            if(!_cto.statics.isOrderPage || !_cto.statics.isCartPage) {
                $('#pc-btn-checkout-disabled').hide();
                $('#pc-btn-checkout').show();
            }

        } else if(data.bagCount == 0 && _cto.statics.isOrderPage) {
            // redirect to shopping bag if empty bag
            _cto.goHomeUnsecure()

        } else {

            // show empty cart promo slot
            $('#pc-items-empty').show();

            // disable checkout button
            if(!_cto.statics.isOrderPage || !_cto.statics.isCartPage) {
                $('#pc-btn-checkout').hide();
                $('#pc-btn-checkout-disabled').show();
            }

        }

        // bag count html
        _cto.updateBagCount(data.bagCount, cartContainsInventoryError);

        return {
            'items': {
                'applied': newItems,
                'removed': remItems
            },
            'coupons': {
                'applied': newClaimed,
                'removed': remClaimed
            }
        };

    }

    this.remItem = function(itemId, confirm) {
        if(confirm) {
            $('div[id^="pc-item-' + itemId + '"] .pcItemRemove').hide().next('.removeAlert').show();
        } else {
            $('#removeFromLink').val(itemId);
            document.checkoutEditOrder.submit();
        }
    }

    this.remItemReset = function(itemId) {
        $('div[id^="pc-item-' + itemId + '"] .pcItemRemove').show().next().hide();
    }

    this.isCollapsed = function() {
        if($('#pc-wrapper:visible').length) {
            return -1;
        } else {
            return 0;
        }
    }

    this.updateMboxMini = function(data) {
        var mboxParams = [];
        if(data.isCommonMboxParams) {
            $(data.mboxParameters).each(function() {
                mboxParams.push(this.mboxParameterName + '=' + this.mboxParameterValue);
            });
        }
        if(data.mboxes) {
            $(data.mboxes).each(function() {
                if(this.mboxName.indexOf('persistentCart') != -1) {
                    if(!data.isCommonMboxParams) {
                        mboxParams = [];
                        $(this.mboxParameters).each(function() {
                            mboxParams.push(this.mboxParameterName + '=' + this.mboxParameterValue);
                        });
                    }
                    try {
                        mboxDefine('pc-cond-msg', this.mboxName);
                        mboxFactoryDefault.update(this.mboxName, mboxParams);
                    } catch(e) {};
                }
            });
        }
    }

    this.update = function(data, formName) {

        // shift json object if returned both cart and checkout
        if(data.cart) data = data.cart;

        // build persistent cart content
        obj = _ctoMiniCart.build(data, true, formName);

        if(!_ctoMiniCart.isCollapsed() && !_cto.statics.isOrderPage) {
            $('#pc-main').trigger('mouseover', [true, true, Config.timeOut.duration2]);
        } else {
            $('#pc-overflow').removeAttr('style').show();
        }

        // coupon errors
        $('#sb-promo-errors .sb-error-message').remove();
        $.each(data.formErrors.coupon, function() {
            $('<div class="sb-error-message" style="display: none;">' + _cto.heDecode(this.message) + '</div>').appendTo('#sb-promo-errors').fasToggle();
        });

        // toggle removed coupons from view
        if(obj.coupons.removed.length) {
            var cpnAnimCount = 0;
            $(obj.coupons.removed).each(function(index, couponId) {
                $('#promo' + couponId).fasToggle(function() {
                    cpnAnimCount++;
                    $('#promo' + couponId).remove();
                    if(cpnAnimCount == obj.coupons.removed.length) {
                        $(obj.coupons.applied).each(function(index, couponId) {
                            $('#promo' + couponId).fasToggle();
                        });
                    }
                });
            });
            // toggle new coupons into view
        } else {
            $(obj.coupons.applied).each(function(index, couponId) {
                $('#promo' + couponId).fasToggle();
            });
        }

        // toggle removed items from view
        if(obj.items.removed.length) {
            var itmAnimCount = 0;
            $(obj.items.removed).each(function(index, item) {
                $('#pc-item-' + item).fasToggle(function() {
                    $('#pc-item-' + item).remove();
                    itmAnimCount++;
                    if(itmAnimCount == obj.items.removed.length) {
                        $.each(obj.items.applied, function(index, item) {
                            $('#pc-item-' + item).addClass('pc-added').css('opacity', 0.2).fasToggle({ duration: Config.items.duration,
                                callback: function() {
                                    _ctoMiniCart.snapOverflowContainer();
                                    // added product fade-in
                                    $('#pc-item-' + item).animate({backgroundColor: '#ffffff'}, Config.items.duration, function() {
                                        $('#pc-item-' + item).removeClass('pc-added').attr('style', '');
                                    });
                                }
                            });
                        });
                    }
                });
            });
            // toggle new items into view
        } else {
            $.each(obj.items.applied, function(index, item) {
                $('#pc-item-' + item).addClass('pc-added').css('opacity', 0.2).fasToggle({ duration: Config.items.duration,
                    callback: function() {
                        _ctoMiniCart.snapOverflowContainer();
                        // added product fade-in
                        $('#pc-item-' + item).animate({backgroundColor: '#ffffff'}, Config.items.duration, function() {
                            $('#pc-item-' + item).removeClass('pc-added').attr('style', '');
                        });
                    }
                });
            });
        }

        // update mbox for persistent cart
        if(!_cto.statics.isOrderPage) {
            // this.updateMboxMini(data);
        }
    }

}