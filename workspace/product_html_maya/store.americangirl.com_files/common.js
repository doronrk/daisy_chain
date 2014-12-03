if (!common) var common = {};

$(function() {
    common.updateBagCount();
    common.renderAddToWishListOrGiftRegistryLink();

    $('a#emailProductPageToFriendLink').click(function() {
        common.emailProductPageToFriendLinkClickHandler();
        return false;
    });

    $('a.ageGradeLink').click(function() {
        common.openSupplPop("/static/popups/ageGrade.html");
        return false;
    });
});

common.updateBagCount = function() {
    var bagCount = $.cookies.get('BAG_COUNT');
    if (!bagCount) bagCount = 0;

    if (bagCount == 1) {
        $("span#numItemsInBagSpan").text('1 item');
    } else {
        $("span#numItemsInBagSpan").text(bagCount + ' items');
    }

}

common.renderAddToWishListOrGiftRegistryLink = function() {

    var parentSpan = $('span#wishListOrGCRegistrySpan');
    var loggedInCookie = $.cookies.get('LOGGEDIN');
    var loggedIn = (loggedInCookie == 'Y');
    
    if (parentSpan && loggedIn && (common.getNumberOfGiftRegistries() > 0)) {
        parentSpan.html('<li class="giftReg"><a id="addToGiftRegistryLink" href="#">Add to Gift Registry</a></li>');
    }
}

common.emailProductPageToFriendLinkClickHandler = function() {
    var itemId = common.getUrlParameterValue('id');
    common.openSupplPop("/pls/ag/pc_forward.forward_page?p_page_type=P&p_opt_in=N&p_item_id=" + itemId,"400","600");
}

common.openGiftRegistryPopup = function() {
    common.openSupplPop('/agshop/html/gift_registry.html', "500", "480");
}

/**
 * Makes a JSON request to add itemIds to bag.
 *
 * Returns the number of items successfully added to bag.
 */
common.callAddToBag = function(itemIds, client_type_code, quickSellItemId, callback) {

    var data = {}
    data.type = 'item';
    data.id = itemIds;

    if (client_type_code) data.client_type_code = client_type_code;
    if (quickSellItemId) data.quick_sell_item_id = quickSellItemId;

    var agssid = $.cookies.get('AGSSID');
    if (agssid) data.agssid = agssid;

    var agskey = $.cookies.get('AGSKEY');
    if (agskey) data.agskey = agskey;

    $.ajaxSetup({
        cache: false
    });

    $.getJSON("/agshop/html/addtobag", data, function(data, textStatus) {
        if (callback && callback.handleCallback) {
            callback.handleCallback(data, textStatus);
        }
    });
}

common.processAddToBagResponseCookies = function(resp) {
    if (resp.bag_count && resp.bag_count > 0) {
        common.setAgComCookie('BAG_COUNT', resp.bag_count);
    }

    if (resp.agssid) common.setAgComCookie('AGSSID', resp.agssid);
    if (resp.agskey) common.setAgComCookie('AGSKEY', resp.agskey);
}

common.displayAddToBagResponseSlideDown = function(resp) {
    if (resp.added_items.length > 0) {
        var addedItemsLIArray = [];

        $.each(resp.added_items, function(index, item) {
            addedItemsLIArray.push('<li>' + item.description + '<span class="addedPrice">$' + item.price + '</span></li>');
        });

        $('ul.addedList').html(addedItemsLIArray.join(''));

        if (resp.bag_count) {
            $("span.totalQty").text(resp.bag_count);
        }

        if (resp.bag_price_total) {
            $("span.totalAmt").text('$' + resp.bag_price_total);
        }

        common.positionBagConfirmation();

        $("div#bagConfirmation").slideDown(1000).delay(1500).slideUp(1000);
    }
}

/*
 * Callback implementation to be passed to the callAddToBag() function when it is
 * called from a product (non-thumbnail) page.
 */
common.ProductPageAddToBagCallback = function(params) {
    this.params = params;
    this.handleCallback = function (data, textStatus){
        if (data && data.success) {
            var resp = data.response;

            common.processAddToBagResponseCookies(resp);

            common.updateBagCount();

            if (resp.excluded_items.length > 0) {
                var errorMessages = [];
                if (resp.excluded_items.length == 1) {
                    var item = resp.excluded_items[0];
                    var errorMsg = 'Sorry, ' + item.description + ' (' + item.sku + ') could not be added to shopping bag.';
                    errorMessages = [errorMsg];
                } else {
                    errorMessages.push('The item(s) below could not be added to your bag:');
                    $.each(resp.excluded_items, function(index, item) {
                        errorMessages.push('<p>' + item.description + ' (' + item.sku + ')</p>');
                    });
                }

                common.displayErrorMessage(errorMessages.join(''));
            }

            common.displayAddToBagResponseSlideDown(resp);
        } else {
            common.displayErrorMessage("Sorry, we could not add selected item(s) to bag");
        }

        $(window).scrollTop(0);
    }

    return true;
}

/*
 * Sets the cookieName=cookieValue.
 *
 * If the document domain ends with 'americangirl.com', cookie's domain option
 * is set to 'americangirl.com'. Otherwise, the domain option is not explicitly
 * specified in the .$cookies.set() call.
 */
common.setAgComCookie = function(cookieName, cookieValue) {
    var AG_DOMAIN = 'americangirl.com';

    var docDomain = document.domain;
    var options = {};

    if (docDomain && docDomain.match(AG_DOMAIN + '$')) {
        options.domain = AG_DOMAIN;
    }

    $.cookies.set(cookieName, cookieValue, options);
}

/*
 * If the document.domain property ends with 'americangirl.com',
 * set it to 'americangirl.com'. Otherwise, leave it unchanged.
 */
common.setDocumentDomain = function() {
    var AG_DOMAIN = 'americangirl.com';
    if (document.domain && document.domain.match(AG_DOMAIN + '$')) {
        document.domain = AG_DOMAIN;
    }
}

common.positionBagConfirmation = function() {
    var $divShopStatus = $('div#shopStatus');
    var shopStatusHeight =  $divShopStatus.height();
    var shopStatusTop = $divShopStatus.offset().top;
    var bagConfirmationTop = shopStatusTop + shopStatusHeight;
    $('div#bagConfirmation').css('top', bagConfirmationTop + 'px');
}

common.displayErrorMessage = function(errorMessage) {
    common.displayErrorMessages([errorMessage]);
}

common.displayErrorMessages = function(errorMessageArray) {
    var errorMessageLiArray = [];
    $.each(errorMessageArray, function(index, item) {
        errorMessageLiArray.push('<li>' + item + '</li>');
    });

    var errorHtml = [
    '<div id="errorMsg" class="errorMsg">',
    '<ul>',
    '</ul>',
    '</div>'];

    errorHtml.splice(2, 0, errorMessageLiArray.join(''));

    $('div#imageCrossSellBlock').prepend(errorHtml.join(''));
}

common.clearErrorMessages = function() {
    $('div#errorMsg').remove();
    $('div.selectBlock > select[name=size]').removeClass('error');
    $('input[type=text]').removeClass('error');
}

var supplPop = null //store supplemental window handle
common.openSupplPop = function(URL,w,h){
    if (supplPop && !supplPop.closed){//close existing window first
        common.closeSupplPop();
    }
    //if width and height are not explicit, use default values
    var width
    var height
    if(w) width = w
    else width = "400"
    if(h) height = h
    else height = "400"

    //open new popup, store in handle variable and set focus
    supplPop=window.open(URL,"supplPop","scrollbars=yes,resizable=yes,width="+width+",height="+height+",left=0,top=0");
    supplPop.focus();
}

common.closeSupplPop = function() {
    //close existing window
    if(supplPop && !supplPop.closed) {
        supplPop.close()
        supplPop = null
    }
}

/*
 * Given /agshop/blah/paramName/paramValue/x/y, retrieves paramValue.
 */
common.getUrlParameterValue = function(paramName) {
    var locationPathname = window.location.pathname;
    if (locationPathname) {
        var pathParams = locationPathname.split('/');
        var paramIndex = $.inArray(paramName, pathParams);
        if (paramIndex != -1 && ((paramIndex + 1) < pathParams.length)) {
            return pathParams[paramIndex + 1];
        }
    }

    return null;
}

common.getClientTypeCodeForProductPage = function() {
    var ctcUrlParam = common.getUrlParameterValue('ctc');
    var pageCode = $('meta[name=AG.ctc_page_code]').attr('content');

    if (ctcUrlParam) {
        if (pageCode) {
            return ctcUrlParam + ":" + pageCode;
        } else {
            return ctcUrlParam;
        }
    } else if (pageCode) {
        return pageCode;
    } else {
        return null;
    }
}

common.setGiftRegistryItemIdsCookie = function(itemIdArray) {
    $.cookies.set('GIFT_REGISTRY_ITEM_IDS', itemIdArray);
}

common.getGiftRegistryItemIdsFromCookie = function() {
    return $.cookies.get('GIFT_REGISTRY_ITEM_IDS');
}

common.getGiftRegistryIdsFromCookie = function() {
    var registryIdsCookie = $.cookies.get('REGISTRY_IDS');
    return isNaN(registryIdsCookie) ? registryIdsCookie.split(':') : [registryIdsCookie];
}

common.getNumberOfGiftRegistries = function() {
    var registryCountCookie = $.cookies.get('REGISTRY_COUNT');
    return isNaN(registryCountCookie) ? 0 : registryCountCookie;
}

common.addToGiftRegistry = function(itemIdArray, registryIdArray, context) {

    var data = {};
    data.sc_type = 'G';
    data.id = itemIdArray;
    data.gift_registry_ids = registryIdArray.join('^');

    var agssid = $.cookies.get('AGSSID');
    if (agssid) data.agssid = agssid;

    var agskey = $.cookies.get('AGSKEY');
    if (agskey) data.agskey = agskey;

    $.ajaxSetup({
        cache: false
    });

    $.getJSON("/agshop/html/addtowishgr", data, function(data, textStatus) {
        common.addToWishListOrGiftRegistryCallback(data, '/gift_registry/home_page.php', 'Gift Registry', context);
    })
}

common.addToGiftRegistryOrOpenPopup = function(itemIdArray) {
    var numGiftRegistries = common.getNumberOfGiftRegistries();
    if (numGiftRegistries == 0) {
        $('div#wishListHide').prepend('<div id="wishListOrGiftRegistryError" class="altActionMsg">Please create a Gift Registry first.</div>');
    } else if (numGiftRegistries == 1) {
        common.addToGiftRegistry(itemIdArray, common.getGiftRegistryIdsFromCookie(), null);
    } else {
        common.setGiftRegistryItemIdsCookie(itemIdArray);
        common.openGiftRegistryPopup();
    }
}

common.addToWishListOrGiftRegistryCallback = function(data, href, hrefText, context) {
    var numItemsAdded = 0;
    if (data && data.success) {

        if (data.response.added_items) {
            numItemsAdded = data.response.added_items.length;
        }

        if (data.response.agssid) common.setAgComCookie('AGSSID', data.response.agssid);
        if (data.response.agskey) common.setAgComCookie('AGSKEY', data.response.agskey);
    }
    var message;
    if (numItemsAdded == 0) {
        message = 'Sorry, we could not add selected item(s) to your <a href="' + href + '">' + hrefText + '</a>';
    } else {
        if (numItemsAdded == 1) {
            message = 'You\'ve successfully added 1 item to your <a href="' + href + '">' + hrefText + '</a>.';
        } else {
            message = 'You\'ve successfully added '  + numItemsAdded + ' items to your <a href="' + href + '">' + hrefText + '</a>.';
        }
    }

    $('div#wishListOrGiftRegistryError', context).detach(); // remove previous error message, if any

    var wishListHide = $('div#wishListHide', context);
    wishListHide.prepend('<div id="wishListOrGiftRegistryError" class="altActionMsg">' + message + '</div>');

    if (context) {
        // if context is non-null, assume that we are in the 'Gift Registry popup and close it'.
        window.close();
    }
}

common.getQuickSellItemId = function() {
    var quickSellId = $("input[name=addon]:checked").val();
    return quickSellId;
}

common.addToWishList = function(itemIdArray) {

    var data = {};
    data.sc_type = 'W';
    data.id = itemIdArray;

    var agssid = $.cookies.get('AGSSID');
    if (agssid) data.agssid = agssid;

    var agskey = $.cookies.get('AGSKEY');
    if (agskey) data.agskey = agskey;

    $.ajaxSetup({
        cache: false
    });

    $.getJSON("/agshop/html/addtowishgr", data, function(data, textStatus) {
        common.addToWishListOrGiftRegistryCallback(data, '/wishlist/wishlist_home.php', 'Wish List', null);
    })
}
