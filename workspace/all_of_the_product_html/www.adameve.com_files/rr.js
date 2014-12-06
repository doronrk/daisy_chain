var rr = (function () {
    return {
        init: function () {
            window.R3_COMMON = new r3_common();
            window.R3_COMMON.setApiKey(rrconfig.apiKey);
            window.R3_COMMON.setBaseUrl(window.location.protocol + '//' + rrconfig.baseUrl);
            window.R3_COMMON.setClickthruServer(rrconfig.clickThruServer);
            window.R3_COMMON.setSessionId(rrconfig.sessionId);
            window.R3_COMMON.setUserId(rrconfig.customerId);

            switch (rrconfig.pageType) {
                case 'home':
                    setupForHomePage();
                    break;
                case 'search':
                    setupForSearchPage();
                    break;
                case 'category':
                    setupForCategoryPage();
                    break;
                case 'item':
                    setupForItemPage();
                    break;
                case 'addtocart':
                    setupForAddToCartPage();
                    break;
                case 'cart':
                    setupForCartPage();
                    break;
                case 'purchasecomplete':
                    setupForPurchaseCompletePage();
                    break;
                case 'error':
                    setupForErrorPage();
                    break;
            }

            setupPlacements();
            r3();
        },
        addToCart: function (productId) {
            rrconfig.addToCartProductId = productId;
            setupForAddToCartPage();
        }
    };

    function setupForHomePage() {
        window.R3_HOME = new r3_home();
    }

    function setupForSearchPage() {
        window.R3_SEARCH = new r3_search();
        window.R3_SEARCH.setTerms(rrconfig.searchTerm);

        if (rrconfig.searchResults) {
            rrconfig.searchResults.forEach(function (result) {
                window.R3_SEARCH.addItemId(result);
            });
        }
    }

    function setupForCategoryPage() {
        window.R3_CATEGORY = new r3_category();
        window.R3_CATEGORY.setId(rrconfig.categoryId);
        window.R3_CATEGORY.setName(rrconfig.categoryName);
    }

    function setupForItemPage() {
        window.R3_ITEM = new r3_item();
        window.R3_ITEM.setId(rrconfig.productId);
    }

    function setupForAddToCartPage() {
        window.R3_ADDTOCART = new r3_addtocart();
        window.R3_ADDTOCART.addItemIdToCart(rrconfig.addToCartProductId);
    }

    function setupForCartPage() {
        window.R3_CART = new r3_cart();

        rrconfig.cartItems.forEach(function (item) {
            window.R3_CART.addItemId(item);
        });
    }

    function setupForPurchaseCompletePage() {
        window.R3_PURCHASED = new r3_purchased();
        window.R3_PURCHASED.setOrderNumber(rrconfig.orderNumber);

        rrconfig.orderItems.forEach(function (item) {
            window.R3_PURCHASED.addItemIdPriceQuantity(item.productId, item.price, item.quantity);
        });
    }

    function setupForErrorPage() {
        window.R3_ERROR = new r3_error();
    }

    function setupPlacements() {
        var items = document.getElementsByClassName('rr-placement');
        var index = 0;

        (function next() {
            var e = items[index];

            if (e) {
                var div = document.createElement('div');
                div.id = 'rr_placement_' + rr_placement_place_holders.length;
                e.appendChild(div)
                rr_placement_place_holders[rr_placement_place_holders.length] = e.getAttribute('data-id');
                R3_COMMON.addPlacementType(e.getAttribute('data-id'));
                index++;
                next();
            } else {
                rr_flush_onload();
            }
        })();
    }
})();

rr.init();