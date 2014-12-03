// ====================
// = Common namespace =
// ====================
YAHOO.namespace('speedfc.cart.add');
YAHOO.speedfc.cart.add = {
    cart_overlay : null,
    timeOut : 5000,
    header_cart_timeout : null,
    header_cart_timer: null,

    /**
     * wishlist_add_to_cart: This function adds the given item to the cart. The
     * item is added using and ajax request. If the item is added succesfully then
     * the cart is showed in a panel, the shopping bag counter is updated and the
     * recent items updated. If the item add fails an error message is shown.
     * @param <array> arr this array contains the following sku values: color,
     *                size and quantity.
     * @param <int> item_id id of the item to add to cart.
     *
     */
    wishlist_add_to_cart : function(item_id, arr) {
        if (arr.length == 3) {
            for (var i=0; i < arr.length; i++) {
                if (arr[i] == '') {
                    return false;
                }
            }
        }
        
        var postData = 'i=' + item_id + '&c=' + arr[0] + '&s=' + arr[1] + '&q=' + arr[2] + '&f=1';
    
        var sUrl = "/cart/ajaxadd";
    
        var callback = {
            success:function(o) {
                if (typeof weAreInCart != "undefined" && weAreInCart == true) {
                    window.location.reload();
                    return;
                }
                if (o.responseText == undefined) return;
                if (typeof wait != 'undefined') wait.hide();
                responses = o.responseText.split('<br />');
                YAHOO.speedfc.cart.add.open_header_cart(responses[0]);
                document.getElementById('shopping_bag_counter').innerHTML = responses[1];
                YAHOO.speedfc.product.detail.updateRecent();
                window.location.reload();
            },
            failure:function(o) {
                if (o.responseText == undefined) return;
                var error_body = "<div id='add_to_wishlist_overlay'>"+
                                "<div>"+
                                    "<div class='bagDescription'>&nbsp;</div>"+
                                        "<div class='item_container'>There was an error while adding the item to your bag."+
                                    "</div>"+
                                    "<div class='view_fav_btn'>&nbps;</div>"+
                                "</div>"+
                            "</div>";                
                YAHOO.speedfc.cart.add.open_header_cart(error_body);
            }
        };
    
        YAHOO.util.Connect.asyncRequest('POST', sUrl, callback, postData);
    },

    /**
     * addGCtoBag - Used to add Gift cards to the cart. The item is added using
     * and ajax request. If the item is added succesfully then the cart is
     * showed in a panel, the shopping bag counter is updated and the recent
     * items updated. If the item add fails an error message is shown.
     */
    addGCtoBag : function () {
        var amount             = '0000';
        var elAmount           = document.getElementById('size_select_0');
        if (elAmount) { amount = elAmount.value; }

        var qty                = '';
        var elQty              = document.getElementById('qty_select_0');
        if (elQty) { qty       = elQty.value; }

        var gc     = document.getElementsByTagName('input');
        var ids    = new Array();

        var post_colors = new Array();
        var post_sizes  = new Array();
        var post_qtys   = new Array();
        for (var i = 0; i < gc.length; i++) {
            if (gc[i].type == "checkbox"
                && gc[i].checked
                && amount != ''
                && qty != '') {
                ids[ids.length]                 = eval('gift_item_codes.' + gc[i].value + '[' + amount + ']');
                post_colors[post_colors.length] = '0000';
                post_sizes[post_sizes.length]   = '0000';
                post_qtys[post_qtys.length]     = qty;
            }
        }

        if (ids.length == 0 || qty.value == '') {
            return;
        }

        var postData = 'i='  + ids.join(',')
                     + '&c=' + post_colors.join(',')
                     + '&s=' + post_sizes.join(',')
                     + '&q=' + post_qtys.join(',');

        var sUrl = "/cart/ajaxadd";

        var callback = {
            success:function(o) {
                if (typeof weAreInCart != "undefined" && weAreInCart == true) {
                    window.location.reload();
                    return;
                }
                if (o.responseText == undefined) return;
                if (typeof wait != 'undefined') wait.hide();
                responses = o.responseText.split('<br />');
                YAHOO.speedfc.cart.add.open_header_cart(responses[0]);
                document.getElementById('shopping_bag_counter').innerHTML = responses[1];
                YAHOO.speedfc.product.detail.updateRecent();
            },
            failure:function(o) {
                if (o.responseText == undefined) return;
                var error_body = "<div id='add_to_wishlist_overlay'>"+
                                "<div>"+
                                    "<div class='bagDescription'>&nbsp;</div>"+
                                        "<div class='item_container'>There was an error while adding the item to your bag."+
                                    "</div>"+
                                    "<div class='view_fav_btn'>&nbps;</div>"+
                                "</div>"+
                            "</div>";                
                YAHOO.speedfc.cart.add.open_header_cart(error_body);
            }
        };

        YAHOO.util.Connect.asyncRequest('POST', sUrl, callback, postData);
    },

    /**
     * open_header_cart: If text is given the opens the cart panel else the cart
     * page is opened.
     */
    open_header_cart : function(text) {
        if (text == '') {
            window.location = '/cart';
            return;
        }    
            
        YAHOO.speedfc.cart.add.showCart(text);
    
        return false;   // don't follow link
    },

    /**
     * showCart: opens a panel showing the cart current items. This panel
     * contains a timer to close the panel automatically.
     *
     * @param <text> text this text is set as body.
     */
    showCart : function(text) {
        if(YAHOO.speedfc.product.wishlist.panel != null){
            YAHOO.speedfc.product.wishlist.panel.hide();
        }
        
        YAHOO.speedfc.cart.add.cart_overlay = new YAHOO.speedfc.utilities.sfcPanel('header_cart_last_item');
        YAHOO.speedfc.cart.add.cart_overlay.setProperties(
                    {
                      width:'182px',
                      context: ['addto_bag' , 'tr', 'br'],
                      fixedcenter: false,
                      iframe:true,
                      close:false,
                      zindex:300,
                      modal:false,
                      constraintoviewport: false,
                      scope:this
                    });
        YAHOO.speedfc.cart.add.cart_overlay.setBody(text);
        YAHOO.speedfc.cart.add.cart_overlay.show(); 

        setTimeout('window.scrollTo(0, 0)',1);
        setTimeout("YAHOO.speedfc.cart.add.cart_overlay.hide();YAHOO.speedfc.cart.add.cart_overlay.setBody('');",YAHOO.speedfc.cart.add.timeOut);
    },

    /**
     * beginCheckout. This function opens the cart page
     */
    beginCheckout : function() {
        YAHOO.speedfc.cart.add.cart_overlay.hide();
        window.location = "/cart";
    },

    /**
     * animate_header_element: Tis function is used to animate the given object
     *  @TODO: complete this variable documentation.
     * @param id identifier of the object to be animated.
     * @param rate
     * @param max
     */
    animate_header_element : function(id, rate, max) {
        e = document.getElementById(id);
    
        // skip the animation for browsers that don't support max-height
        if (typeof(e.style.maxHeight) == "undefined") {
            if (rate > 0) {
                e.style.display = "block";
            } else {
                e.style.display = "none";
            }
            return false;
        }
    
        h = parseInt(e.style.maxHeight) + rate;
        if (h > max) h = max;
        if (h < 0) h = 0;
        e.style.maxHeight = h + 'px';
    
        if (h > 0) {
            e.style.display = "block";
        } else {
            e.style.display = "none";
        }
    
        return (rate > 0 && h < max) || (rate < 0 && h > 0);
    },

    /**
     * animate_header_cart this function animates the cart panel show up.
     */
    animate_header_cart : function(dir) {
        if (YAHOO.speedfc.cart.add.header_cart_timer) clearTimeout(YAHOO.speedfc.cart.add.header_cart_timer);
    
        if (dir > 0) {
            if (YAHOO.speedfc.cart.add.animate_header_element("header_cart_closed", -dir*50, 30)) {}
            else if (YAHOO.speedfc.cart.add.animate_header_element("header_cart_open", dir*50, 200)) {}
            else return;
        } else {
            if (YAHOO.speedfc.cart.add.animate_header_element("header_cart_open", dir*50, 200)) {}
            else if (YAHOO.speedfc.cart.add.animate_header_element("header_cart_closed", -dir*50, 30)) {}
            else {
                clearTimeout(YAHOO.speedfc.cart.add.header_cart_timeout);
                return;
            }
        }
    
        YAHOO.speedfc.cart.add.header_cart_timer = setTimeout("YAHOO.speedfc.cart.add.animate_header_cart("+dir+")", 100);
    },

    /**
     * addVGCtoBag - Used to add Virtual Gift cards to the cart. The item is added using
     * and ajax request. If the item is added succesfully then the cart is
     * showed in a panel, the shopping bag counter is updated and the recent
     * items updated. If the item add fails an error message is shown.
     */
    addVGCtoBag : function (item_id, item_color, item_size, item_qty, is_egc) {
        var postData = 'i=' + item_id + '&c=' + item_color + '&s=' + item_size + '&q=' + item_qty + '&egc=' + is_egc + '&url_from=' + encodeURIComponent(window.location);
        var sUrl = "/cart/ajaxadd";

        var callback = {
            success:function(o) {

                if (typeof weAreInCart != "undefined" && weAreInCart == true) {
                    window.location.reload();
                    return;
                }
                if (o.responseText == undefined) return;

                if (typeof wait != 'undefined') wait.hide();
                responses = o.responseText.split('<br />');
                YAHOO.speedfc.cart.add.open_header_cart(responses[0]);
                document.getElementById('shopping_bag_counter').innerHTML = responses[1];
                YAHOO.speedfc.product.detail.updateRecent();
            },
            failure:function(o) {
                if (o.responseText == undefined) return;
                var error_body = "<div id='add_to_wishlist_overlay'>"+
                    "<div>"+
                    "<div class='bagDescription'>&nbsp;</div>"+
                    "<div class='item_container'>There was an error while adding the item to your bag."+
                    "</div>"+
                    "<div class='view_fav_btn'>&nbps;</div>"+
                    "</div>"+
                    "</div>";
                YAHOO.speedfc.cart.add.open_header_cart(error_body);
            }
        };

        return YAHOO.util.Connect.asyncRequest('POST', sUrl, callback, postData);
    }

};