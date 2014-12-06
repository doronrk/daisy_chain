// ====================
// = Common namespace =
// ====================
YAHOO.namespace('speedfc.cart.utilities');
YAHOO.speedfc.cart.utilities = {

    win : null,

    /**
     * close_edit_divs hides the edit section for the selected line.
     *
     * @param link Clicked link that triggered the call
     */
    close_edit_divs : function (link) {
        YUI().use('node', function(Y) {
            var forms    = Y.all('form.cart_line');
            forms.addClass('hidden');
            var displays    = Y.all('table.cart .display');
            displays.removeClass('hidden');
        });
    },

    /**
     * maxchars: limits the max number of characters in the given object.
     * @param <element> this is the element to be validated.
     * @param <int> this is the max number of characters allowed.
     */
    maxchars : function (obj,e,max) {
        key = (document.all) ? e.keyCode : e.which;
        if(obj.value.length >= max && !this.ctrlKeys(key) )
        {
            obj.value = obj.value.substring(0, max);
            return false;
        }
        return true;
    },
    
    /**
    * Validate if the key is a control key
    * @param key typed by User
    */
    ctrlKeys: function(key){
        switch (key) {
            case 8:
            case 46:
            case 35:
            case 36:
            case 37:
            case 38:
            case 39:
            case 40:
            return true;
            default:
            return false;
        }
    },

    /**
     * open_edit_div displays the edit options for the given line id.
     *
     * @param link Clicked link that triggered the call
     */
    open_edit_div : function (link) {
        YUI().use('node', function(Y) {
            var forms    = Y.all('form.cart_line');
            forms.addClass('hidden');

            var displays    = Y.all('table.cart .display');
            displays.removeClass('hidden');

            var tr =  Y.one(link).ancestor('tr.cart_line');
            var display = tr.one('.display');
            display.addClass('hidden');

            var form    = tr.one('form');
            form.removeClass('hidden');
        });
    },

    /**
    * Truncate the text for max lenght provided
    *
    */
    truncChars: function (obj, max) {
        if (obj.value.length <= max && !this.ctrlKeys(key)) return;
        obj.value = obj.value.substring(0, max);
    },

    /**
     * checkLineForm This function validates the given line before doing the
     * submit. If there are custom alerts or cart errors false is returned, else
     * custom-alert and cart_errors are hidden and true returned.
     * @param line_id this is the line number to use.
     */
    checkLineForm : function (line_id)
    {
        var customError = document.getElementById('custom-alert');
        var alertCartDiv = document.getElementById('cart_errors');
        var errCount = 0;

        if (alertCartDiv) alertCartDiv.style.display = 'none';
        if (customError) customError.innerHTML = '';

        var e = document.getElementById('qty_select_' + line_id);
        if (e.value == null || e.value == '') {
            customError.innerHTML = cartQtySelectError;
            errCount++;
        }

        e = document.getElementById('size_select_' + line_id);

        //  + without this check IE6 breaks
        //  if the cart takes long to load, cart line elements in DOM won't be found
        //  so the function won't do the change, without error reporting in IE6
        if (typeof e != 'undefined' && e != null){
            if (e.options.length > 1 && (e.value == null || e.value == '')) {
                if (errCount) customError.innerHTML += '<br/>';
                if (customError != null) {customError.innerHTML += cartSizeSelectError;}
                errCount++;
            }
        }

        if (errCount) {
            alertCartDiv.style.display = 'block';
        }
        return (errCount == 0);
    },

    /**
     * openShippingServices creates a new panel to show the shipping services.
     */
    openShippingServices : function (){
        YAHOO.speedfc.cart.utilities.win = new YAHOO.speedfc.utilities.sfcPanel('w_shippingServices');
        YAHOO.speedfc.cart.utilities.win.setProperty("width", "730px");
        YAHOO.speedfc.cart.utilities.win.setHeader("Shipping rates");
        var obj = document.getElementById('shipping_rates_ov_wrapper').innerHTML;
        //if(obj)
            YAHOO.speedfc.cart.utilities.win.setBody(obj);
        YAHOO.speedfc.cart.utilities.win.show();
        return false;
    },
    
    openGiftLearnMore : function (){
        YAHOO.speedfc.cart.utilities.win = new YAHOO.speedfc.utilities.sfcPanel('w_aboutGiftWrap');
        YAHOO.speedfc.cart.utilities.win.setProperty("height", "280px");
        YAHOO.speedfc.cart.utilities.win.setHeader("About Gift wrap");
        var obj = document.getElementById('giftwrap_ov_wrapper').innerHTML;
        //if(obj)
            YAHOO.speedfc.cart.utilities.win.setBody(obj);
        YAHOO.speedfc.cart.utilities.win.show();
        return false;
    },
    
    showQuickviewButton : function(thumb) {
        divs=thumb.getElementsByTagName('div');
        divs[0].style.visibility="visible";
        return false;
    },
    
    hideQuickviewButton : function(thumb) {
        divs=thumb.getElementsByTagName('div');
        divs[0].style.visibility="hidden";
        return false;
    },
    
    updateSelectedAddress : function(){
        var addresbook_combo = document.getElementById('address_combo');
        var zip = 0;
        var state = 0;
        
        if(addresbook_combo){
            var addr_id = addresbook_combo.options[addresbook_combo.selectedIndex].value;
            var callback = {
                success : function(o) {
                        try {
                            var address = YAHOO.lang.JSON.parse(o.responseText);
                            var elem = document.getElementById('shipping_form').elements;
                            
                            var phone;
                            if(address.phone.indexOf('-') != -1) {
                            	phone = address.phone.split('-');
                            } else {
                            	phone = new Array('','','');
                            }
                            
                            for(var i = 0; i < elem.length; i++) {
                                switch(elem[i].name){
                                    case "shipping[first_name]":
                                        elem[i].value = address.first_name;
                                        break;
                                    case "shipping[last_name]":
                                        elem[i].value = address.last_name;
                                        break;                                    
                                    case "shipping[last_name]":
                                        elem[i].value = address.last_name;
                                        break;                                    
                                    case "shipping[address1]":
                                        elem[i].value = address.address1;
                                        break;                                    
                                    case "shipping[address2]":
                                        elem[i].value = address.address2;
                                        break;                                    
                                    case "shipping[city]":
                                        elem[i].value = address.city;
                                        break;                                    
                                    case "shipping[zip]":
                                        elem[i].value = address.postal_code;
                                        zip = i;
                                        break;
                                    case "shipping[address_id]":
                                        elem[i].value = address.address_id;
                                        break;
                                    case "shipping[phone_area]":
                                        elem[i].value = phone[0];
                                        break;                                    
                                    case "shipping[phone_prefix]":
                                        elem[i].value = phone[1];
                                        break;                                    
                                    case "shipping[phone_suffix]":
                                        elem[i].value = phone[2];
                                    case "shipping[state]":
                                        var c = elem[i].options;
                                        state = i;                                        
                                        if(c){
                                            for(var j = 0; j < c.length; j++){
                                                if(c[j].value == address.state){
                                                    elem[i].selectedIndex = j;                                                    
                                                }                                                  
                                            }
                                        }
                                        break;
                                    case "shipping[country]":
                                        var c = elem[i].options;
                                        if(c){
                                            for(var j = 0; j < c.length; j++){
                                                if(c[j].value == address.country)
                                                    elem[i].selectedIndex = j;
                                            }
                                        }
                                        //If its not US we need to refresh states and zip
                                        document.getElementById('shipping_country').onchange();
                                        elem[zip].value = address.postal_code;
                                        var c = elem[state].options;                                                                       
                                        if(c){
                                            for(var j = 0; j < c.length; j++){
                                                if(c[j].value == address.state){
                                                    elem[state].selectedIndex = j;                                                    
                                                }                                                  
                                            }
                                        }
                                        
                                        break;
                                    case "shipping[email]":
                                        elem[i].value = address.email;
                                        break;
                                }
                               
                            }
                        }
                        catch (e) {
                            //alert("Invalid product data");
                            alert(e);
                            console.log(c);
                        }

                        
                },
                failure : function(o) {
                        alert('Error getting address data');
                }
            };

            postData = 'addr_id=' + addr_id;
            YAHOO.util.Connect.asyncRequest('POST', '/checkout/updateSelectedAddress', callback, postData);        
        }
    }
}
