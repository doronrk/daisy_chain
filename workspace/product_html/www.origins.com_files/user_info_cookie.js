var site = site || {};
var generic = generic || {};

/**
    * Method to grab a cookie and use that to control DOM elements as needed.
    * Handles the setting and getting of the user cookie defined in cookie.name and set in backend.
    * To find where the cookie is set on backend, look to Request::TransactionLocaleHandler.
    * Example cookie structure not signed in:
    *   FE_USER_CART=item_count:1&first_name:&signed_in:0&region_id:0
    * Example cookie structure signed in:
    *   FE_USER_CART=item_count:3&first_name:John&signed_in:1&region_id:0
    * You can set specific functions on page load using events.load or hook into javascript events
    *    by defining them in the events class and adding the event to events.init.
    * The cookie class is used to handle all the cookie functionality such as the setting and getting.
    * This method is meant to be stand alone so should be able to add to a brand without many tweaks.
    * Uses straight javascript so not dependent on a javascript framework.
    * Preferably added to the where ever the globalnav javascript is added within a brand.
    * @memberOf site
*/
site.userInfoCookie = function() {
    // Set global vars here.
    var nodes = {};

    // Private internal cookie class.
    // Leverages generic.cookie to get and set the cookie values.
    var cookie = {
        'name'  : 'FE_USER_CART',
        'value' : '',
        'regEx' : function(key) {
            if (!key) {
                return null;
            };
            return new RegExp(key + '\:([^;&,}]*)');
        },
        'set'   : function() {
            if (!this.name) {
                return null;
            };
            var userCookie = generic.cookie(this.name);
            this.value = userCookie ? userCookie : '';
        },
        'getValue' : function(key) {
            var keyVal = this.value.match(this.regEx(key));
            return keyVal[1] ? keyVal[1] : null;
        },
        'setValue' : function(key, val) {
            var match  = this.value.match(this.regEx(key));
            var oldValue = match[0];
            var newValue = this.value.replace(match[1], val);
            generic.cookie(this.name, newValue, { path:"/" });
            this.value   = newValue;
        }
    };

    // Private events class that handles all individual events.
    // Add all events in 'init' method so they will get fired on page load.
    // The cart event is commented out but there as an example.
    var events = {
        'init'   : function() {
            this.load();
            //this.cart();
        },
        'load'  : function() {
            _setCartItemsTotal();
        },
        'cart'  : function() {
            /*
            document.observe("cart:countsUpdated", function() {
                var cartCount = generic.checkout.cart.getTotalItems();
                cookie.setValue('item_count', cartCount);
            });
            */
        }
    };

    /* Additional helper functions below here. */

    // Pulls in the cookie info and updates the DOM;
    var _setCartItemsTotal = function() {
        var valueKey = 'item_count';
        var itemsTotal = cookie.getValue(valueKey) || 0;
        if (nodes.cartTotalContainer != null) {
            nodes.cartTotalContainer.innerHTML = itemsTotal + " Items";
        }
        if (nodes.footerCartTotalContainer != null) {
            nodes.footerCartTotalContainer.innerHTML = itemsTotal; 
        }
    };

    // BRAND SPECIFIC: Get any DOM nodes and assign them to the global class var nodes. Varies between brands.
    // Helps keep all the brand specific DOM definitions in one spot.
    var _getDomNodes = function() {
        nodes.cartTotalContainer = document.getElementById('items_count');
        nodes.footerCartTotalContainer = document.getElementById('shelf_items_count'); 
    };

    return {
        init : function() {
            _getDomNodes();
            cookie.set();
            events.init();
        }
    }
}();

document.observe("dom:loaded", function() {
        site.userInfoCookie.init();
});
