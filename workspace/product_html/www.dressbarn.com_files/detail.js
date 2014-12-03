// ====================
// = Detail namespace =
// ====================
YAHOO.namespace('speedfc.product.detail');
YAHOO.speedfc.product.detail = {
    skuSelect: null,
    miniStoreLocator: null,
    fo: null,
    color_swatchpad: null,

    /**
     * get_quickview() - opens the quickview of the given item
     *  @param <string> id of the item to display in the quick view.
     *  @param <> type used to prevent next and prev item links from showing on overlay
     *  @param <> default_color color to be selected in the quickvew
     *  @param <> default_size size to be selected in the quickvew
     *  @param <> default_qty qty to be selected in the quickvew
     */
    get_quickview : function (id, type, default_color, default_size, default_qty) {
        var defaults = default_color || default_size || default_qty;

        // Initialize the temporary Panel to display while waiting for external content to load
        quickViewPanel = new YAHOO.speedfc.utilities.sfcPanel("quick_view_panel_"+id);
        quickViewPanel.setProperties(
                {
                  width: '700px',
                  fixedcenter: true,
                  close:true,
                  draggable:false,
                  modal:true,
                  visible:false,
                  constraintoviewport: true,
                  iframe:false,
                  effect:null
                }
        );

        var callback = {
            success: function(o) {
                quickViewPanel.setBody(o.responseText);
                quickViewPanel.show();
                var e = document.getElementById("basic_specs_js");
                if (e) {
                    eval(e.innerHTML);
                }
                YAHOO.speedfc.product.detail.hideSwatchName(null);
            },
            failure: function (o) {
                quickViewPanel.hide();
            }
        };

        var post_data = 'item=' + id;
        if (defaults) {
            if(default_color != undefined)
                post_data += '&default_color=' + default_color;
            if(default_size != undefined)
                post_data += '&default_size=' + default_size;
            if(default_qty != undefined)
                post_data += '&default_qty=' + default_qty;
        };

        YAHOO.util.Connect.asyncRequest('POST', "/quickview?" + post_data,
                                        callback,'');
        return false;
    },


    /**
     * Wishlist: opens the wishlist print view in a popup
     */
    printWishlist : function () {
        var sUrl = "/wishlist/print";
        YAHOO.speedfc.utilities.common.popup(sUrl, 'print', 970, 761, true);
    },
    
    /**
     * validateQvSizeQty: This function validates the selected data before doing
     * the submit. If there are custom alerts or cart errors false is returned,
     * else custom-alert and cart_errors are hidden and addToBag function executed.
     */
    validateQvSizeQty : function () {
        
    	var line_id = 0;
        var customError = document.getElementById('custom-alert');
        var alertQvDiv = document.getElementById('qv_errors');
        var item_wrapper = document.getElementById('item_desc_wrapper');
        var errCount = 0;

        if (alertQvDiv) alertQvDiv.style.display = 'none';
        if (customError) customError.innerHTML = '';


        var e = document.getElementById('qty_select_' + line_id);
        if (e.value == null || e.value == '') {
            YAHOO.util.Dom.addClass(e, "pdp_combo_error");
            customError.innerHTML = qtySelectError;
            errCount++;
        }

        e = document.getElementById('size_select_' + line_id);
        if (e.options.length > 1 && (e.value == null || e.value == '')) {
            YAHOO.util.Dom.addClass(e, "pdp_combo_error");
            if (errCount) customError.innerHTML += '<br/>';
            customError.innerHTML += sizeSelectError;
            errCount++;
        }

        if (errCount) {
            alertQvDiv.style.display = 'block';
            if(item_wrapper)
                YAHOO.util.Dom.addClass(item_wrapper, "no_margin");
        }

        if(errCount == 0){
            var combo = document.getElementById('size_select_' + line_id);
            if(combo)
                YAHOO.util.Dom.removeClass(combo, "pdp_combo_error");

            combo = document.getElementById('qty_select_' + line_id);
            if(combo)
                YAHOO.util.Dom.removeClass(combo, "pdp_combo_error");                
            
            YAHOO.util.Dom.removeClass(item_wrapper, "no_margin");
            
            //Tracking Event Function
            trackingEventMiniCartOverlay(skuSelect.getPrice(), skuSelect.getSalePrice(), skuSelect.item_desc);
            trackingEventPDPAddCart(skuSelect.item_desc);
           
            skuSelect.addToBag();
        }
    },

    /**
     * searchInStore() opens the panel with the info of stores for a certain item
     * @param {Object} idx          item instance
     */
    searchInStore : function (idx) {
        var item_id = document.getElementById("item_hidden_"+idx).value;
        var color_id = document.getElementById("color_id_"+idx).value;
        var size_id = document.getElementById("size_select_"+idx).value;
        var zip = document.getElementById("zip_"+idx).value;
        if(typeof item_id == undefined || typeof color_id == undefined ||
            typeof size_id == undefined){
            alert("This is not a valid product, please reload page or go back"+
                  " to the catalog and choose another product.")
            return;
        }

        if(typeof zip == undefined){
            alert("Please type in your zip code.")
            return;
        }

        var postData = 'item='+item_id+'&color='+color_id+'&size='+size_id+'&zip='+zip;
        var Url = "/detail/searchInStore";
        var callback = {
            success:function(o) {
                if (o.responseText == undefined) return;
                var pos_x = (document.body.clientWidth - 620)/2;
                miniStoreLocator = new YAHOO.speedfc.utilities.sfcPanel('searchInStore_base');
                miniStoreLocator.setProperties(
                                                {
                                                  width:'620px',
                                                  x: pos_x,
                                                  y: 100,
                                                  draggable:false,
                                                  iframe:true,
                                                  modal:true,
                                                  constraintoviewport: false,
                                                  scope:this,
                                                  fixedcenter: true
                                                }
                );
                miniStoreLocator.setBody(o.responseText);
                miniStoreLocator.show();
            },
            failure:function(o) {

            }
        };

        return YAHOO.util.Connect.asyncRequest('POST', Url, callback, postData);
    },

    /**
     * closeSearchInStore: closes miniStoreLocator panel
     */
    closeSearchInStore : function () {
        miniStoreLocator.hide();
    },

    /**
     * updateLocalStore: if skuSelect is an array then call availableInLocalStore()
     * function which sets the selected store as the local store and checks the
     * availability of the item.
     */
    updateLocalStore : function (){
        if(!YAHOO.speedfc.utilities.common.isArray(skuSelect)) {
            skuSelect.availableInLocalStore();
        }
    },

    /**
     * setStoreCookie This function creates a new cookie where the local store
     * is saved.
     */
    setStoreCookie : function (value){
        var c_name = "local_store";
        var expiredays = 30;
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()+"; path=/");
    },

    /**
     * getCookie: this function gets the requested cookie and returns it. If the
     * cookie is not found then returns emty string.
     */
    getCookie : function (c_name){
        var cookie = document.cookie;
        if (cookie.length>0)
        {
            c_start = cookie.indexOf(c_name + "=");
            if (c_start != -1){
                c_start = c_start + c_name.length+1;
                c_end = cookie.indexOf(";",c_start);
                if (c_end == -1) c_end = cookie.length;
                return unescape(cookie.substring(c_start,c_end));
            }
        }
        return "";
    },


    /**
     * Functions used by the zoom flash
     *
     */
        /**
        * getFlashMovie: funtion that helps for flash zoom in pdp
        */
        getFlashMovie : function (movieName) {
            var isIE = navigator.appName.indexOf("Microsoft") != -1;
            return (isIE) ? window[movieName] : document[movieName];
        },

        /**
         * movieIsLoaded: funtion that helps for flash zoom in pdp
         */
        movieIsLoaded : function (theMovie) {
            if (typeof(theMovie) != "undefined") {
                return theMovie.PercentLoaded() == 100;
            } else {
                return false;
            }
        },

        /**
         * zoomSend: sets the path of the image to be loaded in the flash zoom
        **/
        zoomSend : function (msg, img_path) {
            if (YAHOO.speedfc.product.detail.movieIsLoaded(YAHOO.speedfc.product.detail.getFlashMovie("flashzoom"))
                && YAHOO.speedfc.product.detail.getFlashMovie("flashzoom")) {                    
                 YAHOO.speedfc.product.detail.getFlashMovie("flashzoom").setPath(img_path + msg);
            }
        },

        /**
         * This function initialize the flash object in the PDP
         */
        initFlash : function (img_src_flash) {
            fo = new FlashObject("/flash/zoomer.swf", "flashzoom", "275", "340", "9.0", "#fff", "high");
            fo.addParam("quality", "high");
            fo.addParam("menu", false);
            fo.addParam("wmode", "transparent");
            fo.addParam("swLiveConnect", true);
            fo.addVariable('imagePath', img_src_flash);
            fo.write("flashcontent");
        },

    //callback functions used to update recent items in PDP
    recentCallback : {
        success : function(o){
            if (o.responseText == undefined) return;
            if(document.getElementById('list_recent_items') != undefined){
                document.getElementById('list_recent_items').innerHTML = o.responseText;
            }
        },
        failure : function(o){
            if (o.responseText == undefined) return false;
            alert("Action unavailable");
        }
    },

    /**
     * function used to update recent items in PDP when a swatch has been clicked
     */
    recentChange : function (i, c){
        var postData = "i=" + i + "&c=" + c;
        YAHOO.util.Connect.asyncRequest('POST', "/catalog/changecolorforrecent", YAHOO.speedfc.product.detail.recentCallback, postData);
    },

    /**
     * showSwatchName This function is used to show the swatch name and image
     * sample. The second parameter is optional, if it is not defined 0 will be
     * used.
     */
    showSwatchName : function (obj,left_margin) {
        var left = YAHOO.util.Dom.getX(obj);
        var sw = YAHOO.util.Dom.getElementsByClassName('color_name', 'div', obj);
        sw[0].style.display = 'block';
        YAHOO.util.Dom.setX(sw, left);

        left_margin = typeof(left_margin) != 'undefined' ? left_margin : 0;
        var sw2 = YAHOO.util.Dom.getElementsByClassName('swatch_zoom', 'div', obj);
        sw2[0].style.display = 'block';
        YAHOO.util.Dom.setX(sw2, left+left_margin);
    },

    /**
     * hideSwatchName this hides all labels to avoid having more than one showing
     */
    hideSwatchName : function (id) {
        var swatches = document.getElementById('swatches_' + id);
        var elements = YAHOO.util.Dom.getElementsByClassName('color_name', 'div', swatches);
        for (var i=0; i < elements.length; i++) {
            elements[i].style.display='none';
        }
        var elements = YAHOO.util.Dom.getElementsByClassName('swatch_zoom', 'div', swatches);
        for (var i=0; i < elements.length; i++) {
            elements[i].style.display='none';
        }
    },

    /**
     * properCase (called from change color text)
     */
    properCase : function (str) {
        var index;
        var tmpStr;
        var tmpChar;
        var preString;
        var postString;
        var strlen;
        tmpStr = str.toLowerCase();
        strLen = tmpStr.length;
        if (strLen > 0)  {
            for (index = 0; index < strLen; index++)  {
                if (index == 0)  {
                tmpChar = tmpStr.substring(0,1).toUpperCase();
                postString = tmpStr.substring(1,strLen);
                tmpStr = tmpChar + postString;
                }
                else {
                    tmpChar = tmpStr.substring(index, index+1);
                    if (tmpChar == " " && index < (strLen-1))  {
                    tmpChar = tmpStr.substring(index+1, index+2).toUpperCase();
                    preString = tmpStr.substring(0, index+1);
                    postString = tmpStr.substring(index+2,strLen);
                    tmpStr = preString + tmpChar + postString;
                         }
                }
            }
        }
        return tmpStr;
    },    

    /**
     * this is used to set the new color name after a swatch has been clicked
     * @param {Object} color_name
     */
    changeColorText : function (color_name) {
        var text = document.getElementById('color_selected_text');
        if (text) text.innerHTML = YAHOO.speedfc.product.detail.properCase(color_name);
    },
    
    /**
     * This function displays the "quickview button" when moving mouse over an item thumb
     * @param {Object} thumb
     */
    showQuickview: function(thumb) {
        divs=thumb.getElementsByTagName('div');
        if(divs[0])
            divs[0].style.display="block";
    },
    
    /**
     * This function hides the "quickview button" when moving mouse away of an item thumb
     * @param {Object} thumb
     */
    hideQuickview: function(thumb) {
        divs=thumb.getElementsByTagName('div');
        if(divs[0])
            divs[0].style.display="none";
    },
    
    /**
     * updates the recent items block
     */
    updateRecent: function(){
        var callback = {
            success: function(o) {
                var responses = o.responseText.split('<br class="split" />');
                var count = parseInt(responses[0].replace(/^\n*/,''));
                if(count > 0){
                    var recent = document.getElementById('list_recent_items');
                    if (recent) recent.innerHTML = responses[1];
                }
            },
            failure: function (o) {
        
            }
        }
        YAHOO.util.Connect.asyncRequest('POST',"/catalog/updaterecent",callback,'');
    },
    
    /**
     * displays the window to send item wishlist to a friend
     * @param {Object} is_wishlist
     */
    showSendFavorites: function () {
        var inputs = YAHOO.util.Dom.getElementsByClassName('thumb','a');
        var checked_items = new Array();
        var itemId = "";
        var colorId = "";
        var itemQueue = new Array();
        var colorQueue = new Array();
        //we are in wishlist page so we are going to retrieve the items id & colors by analyzing the item thumbs
        //might be better to use other method
        for (var i = 0; i < inputs.length; i++) {
            itemId = "" + YAHOO.util.Dom.getFirstChildBy(inputs[i],function (node) {
                return node.nodeName.toUpperCase() == "IMG";
            }).src.match(/\d+_/);
            colorId = "" + YAHOO.util.Dom.getFirstChildBy(inputs[i],function (node) {
                return node.nodeName.toUpperCase() == "IMG";
            }).src.match(/_\d+/);
            itemQueue[itemQueue.length] = itemId.replace("_", "");
            colorQueue[colorQueue.length] = colorId.replace("_", "");
        };
    
        if(itemQueue.length > 0){
            var callback = {
                success: function(o) {
                    send_details = new YAHOO.speedfc.utilities.sfcPanel("send_details");
                    send_details.setProperties({
                        width:"380px",
                        x: (document.documentElement.clientWidth - 344)/2,
                        y: 145,
                        visible:false,
                        draggable:false,
                        modal:true
                    });
                    
                    send_details.setBody(o.responseText);
                    
                    if (typeof quickViewPanel != 'undefined') {
                        quickViewPanel.hide();
                    };
                    
                    scroll(0,0);
                    send_details.show();
                },
                failure: function (o) {}
            };
            YAHOO.util.Connect.asyncRequest(
                    'POST',
                    '/detail/sendDetailsToFriend/',
                    callback,
                    'item=' + itemQueue + '&color=' + colorQueue + '&wishlist=' + true
            );
        }
    },    
    
    /**
     * this function sends the mail with items details
     */
    SendDetails: function() {
        var item_id = document.getElementById('send_item_id').value;
        var color_id = document.getElementById('send_color_id').value;
        var from_name = document.getElementById('from_name').value;
        var from_mail = document.getElementById('from_mail').value;
        var message_content = document.getElementById('message').value;
        var to_mail = new Array();
        for(var i = 1; i < 5; i++) {
            if (document.getElementById('to_mail_' + i.toString()).value != '') {
                to_mail[i-1] = document.getElementById('to_mail_' + i.toString()).value;
            }
        }
    
        if (!from_mail || !document.getElementById('to_mail_1').value || !from_name){
            alert("Please fill in all the fields marked with *");
            return;
        }
        for (var i = 0; i < to_mail.length; i++) {
            if (!YAHOO.speedfc.utilities.common.validate_email_adresses(to_mail[i])) {
                alert("Please enter valid e-mail address(es).");
                return;
            }
        }
        if (!YAHOO.speedfc.utilities.common.validate_email_adresses(from_mail)){
            alert("Please enter a valid e-mail address.");
            return;
        }
    
        var postData = 'item=' + item_id
        + '&color=' + color_id
        + '&from_name=' + from_name
        + '&from_mail=' + from_mail
        + '&to_mail=' + to_mail
        + '&message_content=' + message_content;
    
        var sUrl = "/send/details";
    
        var callback = {
            success:function(o) {
                scroll(0,0);
                send_details.setBody(o.responseText);
            },
            failure:function(o) {
                alert("Your mail couldn't be sent");
            }
        };
        YAHOO.util.Connect.asyncRequest('POST', sUrl, callback, postData);
    },
    
    addSwatchpadRelation: function(color_id, swatchpad, rootNode) {
        if(typeof color_swatchpad == 'undefined')
            this.color_swatchpad = new Array();
            
        if(typeof rootNode != 'undefined'){
            if (typeof color_swatchpad[rootNode] == 'undefined')
                this.color_swatchpad[rootNode] = new Array();    
            this.color_swatchpad[rootNode][color_id] = swatchpad;
        }else{
            this.color_swatchpad[color_id] = swatchpad;
        }
    },
    
    /*
     * Check available sku qty for the selected amount in the GC page, and update max qty in qty combo
     * 
     * @param string size_id id of the selected amount
     * @param string item_id of the selected amount GC
     */
    checkAvailable : function(size_id, item_id) 
    {
        var el = document.getElementById('gc_qty_available_'+item_id+'_'+size_id);
        var qty_combo = document.getElementById('gc_qty_select_'+item_id);
        
        if(typeof el != 'undefined' && typeof qty_combo != 'undefined') 
        {
            if(el == null) return;
            
            if(el.value > 9) el.value = 9;
            
            var qty_value = qty_combo.value;
            
            while (qty_combo.options.length > 0) qty_combo.remove(0);
            
            for (var i = 0; i <= el.value; i++) 
            {
                if(i == 0) 
                    var opt = new Option('Qty', '');
                else
                    var opt = new Option(i, i);
                    
                try {
                    qty_combo.add(opt, null); // standards compliant
                } 
                catch (ex) {
                    qty_combo.add(opt); // IE only
                }
            }
            
            if(el.value < qty_value)
                qty_combo.selectedIndex = '';
            else
                qty_combo.selectedIndex = qty_value;
        }
    },
    
    /*
     * Verify that the selected holders don't exceed the selected GC
     */
    checkCardHolderQty: function() 
    {
        var els = document.getElementsByTagName('select');
        var vHDTotal = 0;
        var vGiftCardTotal = 0;
        
        var hd_regex = /holder_qty_select_*/;
        for (var i=0;i < els.length;i++) {
            if (els[i].name) {
                if (els[i].name.match(hd_regex)) {
                    var n = parseInt(els[i].value, 10);
                    if (n > 0) 
                        vHDTotal += n;
                }
            }
        }
        
        hd_regex = /gc_qty_select_*/;
        for (var i=0;i < els.length;i++) {
            if (els[i].name) {
                if (els[i].name.match(hd_regex)) {
                    var n = parseInt(els[i].value, 10);
                    if (n > 0) 
                        vGiftCardTotal += n;
                }
            }
        }
    
        if (vHDTotal != vGiftCardTotal) 
        {
            alert('Please change the quantity of free gift card holder(s) to equal the number of gift card(s) ordered.\n You ordered ' + vGiftCardTotal + ' gift card(s) and selected ' + vHDTotal + ' gift holder(s).');
            return false;
        }
        
        return true;
    },
    EGCPopup: null,
    showEGCPopup: function()
    {
        if(this.EGCPopup == null){
            this.EGCPopup = new YAHOO.speedfc.utilities.sfcPanel('egcPopup');
            this.EGCPopup.setProperty("width", "300px");
            this.EGCPopup.setHeader("eGift Card");
            this.EGCPopup.setBody(YAHOO.util.Dom.get("gc_popup_text").innerHTML);
        }
        this.EGCPopup.show();
        return false;
    }
    
};