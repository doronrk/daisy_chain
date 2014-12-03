/**
 * Cart.Checkout namespace
 */
YAHOO.namespace('speedfc.cart.checkout');
YAHOO.speedfc.cart.checkout = {
    why : '',
    win : '',
    giftwrap: null,

    /**
     * showWhy: shows a help panel for why to create an account
     */
    showWhy : function() {
        YAHOO.speedfc.cart.checkout.why = new YAHOO.speedfc.utilities.sfcPanel("why_overlay");
        YAHOO.speedfc.cart.checkout.why.setHeader("Why create an account?");
        YAHOO.speedfc.cart.checkout.why.setBody(" ");
        YAHOO.speedfc.cart.checkout.why.show();
        return false;
    },

    /**
     * openSecurityCode: shows a help panel for credit card information.
     */
    openSecurityCode : function(type) {
        var win_type = null;

        if(type == 'gc')
            win_type = 'w_giftCard';
        else
            win_type = 'w_secureCode';

        YAHOO.speedfc.cart.checkout.win = new YAHOO.speedfc.utilities.sfcPanel(win_type);
        YAHOO.speedfc.cart.checkout.win.setHeader("What is this?");
        YAHOO.speedfc.cart.checkout.win.show();
        return false;
    },

    /**
     * closeSecurityCode: this function is used to close the credit cad panel.
     */
    closeSecurityCode : function() {
        YAHOO.speedfc.cart.checkout.win.hide();
        return false;
    },

    /**
     * toggleSameAsShipping: shows or hide shipping info dependig on
     * same_as_billing value.
     */
    toggleSameAsShipping : function() {
        if(!document.getElementById('same_shipping'))
        {
            return;
        }
        var b = document.getElementById('same_shipping').checked;
        document.getElementById('billing_info_wrapper').style.display = b ? "none"
                        : "block";
    },

    /**
     * some stuff that needs to happen on cc change
     * @param {Object} o
     */
    cc_type_change : function(o) {
        var e = document.getElementById('cc_type');
        if ( !e ) {return;}
        // the DB Private Label card should be PL but has traditionally been ADS, so this will CYA.
        if (e.value == 'PL') {
            YAHOO.speedfc.cart.checkout.disable_inputs('input', 'cc_cvv', true);
        } else {
            YAHOO.speedfc.cart.checkout.disable_inputs('input', 'cc_cvv', false);
        }
    },

    disable_inputs: function (type, name, state) {
        var els = document.getElementsByTagName(type);
        if (state == true) {
            var color = '#ccc';
            var visibility = 'none';
            var border = '#999';
        } else {
            var color = '';
            var visibility = ''; //'block';
            var border = '';
        }
        for (var i in els) {
            if (els[i].name && els[i].name.indexOf(name) >= 0) {
                els[i].style.backgroundColor = color;
                els[i].style.borderColor = border;
                els[i].disabled = state;
                var error_name = ('error_for_' + els[i].name).replace('[','_').replace(']','');
                var error_display = document.getElementById(error_name);
                if (error_display) {
                    error_display.style.display = visibility;
                }
            }
        }
    },

    /**
     * getshippingrates: using the selected country, state and zip gets the
     * shipping rates. This function returns javascript code that will be
     * executed in the call back.
     */
    getshippingrates : function() {
        var callback = {
            success : function(o) {
                    eval(o.responseText);
            },
            failure : function(o) {
                    alert('Error getting shipping rates');
            }
        };

        var scc = document.getElementById('shipping_country');
        var scs = document.getElementById('shipping_state');
        var szp = document.getElementById('shipping_zip');

        postData = 'country_code=' + scc.options[scc.selectedIndex].value
                        + '&state_code=' + scs.options[scs.selectedIndex].value
                        + '&postal_code=' + szp.value + '&subtotal='
                        + total_without_shipping;

        YAHOO.util.Connect.asyncRequest('POST', '/checkout/getshiprate',
                        callback, postData);
    },

    /**
     * orderSubmission: this function call the submit function after hidding or
     * showing some elements depending on the pressed button.
     * @param <button> this is the pressed buton.
     */
    orderSubmission : function(btn) {
        if (btn.id == 'apply_giftcard_btn') {
                e = document.getElementById('apply_giftcard_btn');
                e.style['display'] = 'none';
                e = document.getElementById('gc_apply_notice');
                e.style['display'] = 'inline';
                document.add_gc.submit();
        }

        if (btn.id == 'commit') {
            btn.style['display'] = 'none';
            e = document.getElementById('commit_notice');
            e.style['display'] = 'block';
            document.billing.submit();
        }
        
        return true;
    },

    /**
     * recalculateSurcharge: call recalculateSurcharge and if shipping_surcharge
     * div exists then updated the value.
     */
    recalculateSurcharge : function(){
        var s_method = document.getElementById('shipping_method').value;
        //performs the request only if there is a shipping method selected and
        // if shipping_surcharge exists.
        if (s_method && document.getElementById('shipping_surcharge')) {
           var callback = {
                success: function(o) {
                    //update surcharge hidden div
                    document.getElementById('shipping_surcharge').innerHTML = o.responseText;
                    YAHOO.speedfc.cart.checkout.updateTotal();
                },
                failure: function(o) {
                    alert('Error recalculating surcharge');
                }
            };

            postData = 'ship_method='+s_method;
            YAHOO.util.Connect.asyncRequest('POST', '/cart/recalculateSurcharge', callback, postData);
        }
    },

    /**
     * updateTotal: This function updates the cart total after checking the
     * changes in shipping method and surcharge.
     */
    updateTotal : function() {
        var v = document.getElementById('shipping_method');
        var s = document.getElementById('shipping_surcharge');
        var ship_value_total = 0;
        var total = 0;
        if (v) {
            v = v.value;
            if (v == '') {
                v = 'none';
            }
            if (s) {
                var surcharge = s.innerHTML;
                var subtotal = shipping_rates[v]['total'];
                var ship_value = shipping_rates[v]['val'];
                surcharge = surcharge.replace('$', '');
                subtotal = subtotal.replace('$', '');
                ship_value = ship_value.replace('$', '');
                ship_value_total = parseFloat(ship_value)
                + parseFloat(surcharge);
                total = new Number(parseFloat(subtotal) + parseFloat(surcharge));
                total = '$' + total.toFixed(2);
                ship_value_total = '$' + ship_value_total + ' ($' + surcharge
                + ' surcharge included)';
            } else {
                ship_value_total = shipping_rates[v]['val'];
                total = shipping_rates[v]['total'];
            }

            document.getElementById('shipping_value').innerHTML = ship_value_total;
            document.getElementById('grand_total').innerHTML = total;
            if (document.getElementById('shipping_desc2')) {
                document.getElementById('shipping_desc2').innerHTML = surcharge;
            }
        }
    },

    /**
     * showEwasteNotice this function opens a panel showing a message regarding
     * the ewaste.
     */
    showEwasteNotice : function() {
        var ewasteNotice = new YAHOO.speedfc.utilities.sfcPanel("ewasteNotice");
        ewasteNotice.setBody('Your order contains items that are subject to an E-Waste charge.<br/>It has been added to your cart.');
        ewasteNotice.show();
    },

    /**
     * showGiftWrap this function displays gift wrap message area
     *
     */
    showGiftWrap : function() {
        /*giftwrap = document.getElementById('giftwrap_message_area');
        isgift_checkbox = document.getElementById('is_a_gift');

        if(isgift_checkbox){
            if(isgift_checkbox.checked)
                giftwrap.style.display="block";
            else{
                giftwrap.style.display="none";
            }
        }*/

    },   
    
    toggleGiftWrap : function(){        
        var url = '/checkout/UpdategiftwrapCheckbox?is_a_gift=';
        var param = document.getElementById('is_a_gift').checked ? '1' : '0';
        var giftwrap = document.getElementById('giftwrap_message');
        if (giftwrap) {
            param += '&giftwrap_message=' + giftwrap.value;
        }
        window.location = url + param;
    },

    /**
     * enableGiftWrap this function enables gift wrap message area
     *
     */
    enableGiftWrap : function(){
        status = document.getElementById('giftwrap').checked;
        gw_msg = document.getElementById('giftwrap_message');

        if(typeof gw_msg != 'undefined' && gw_msg != 'null'){
            gw_msg.disabled = !status;
            if(status)
                gw_msg.style.backgroundColor ='#ffffff';
            else{
                gw_msg.style.backgroundColor ='#f0f0f0';
                gw_msg.value="";
            }
        }
    },

    /**
     * toggleGiftCardPayment this function enables gift cards form
     *
     */
    toggleGiftCardPayment : function(){

        var b = document.getElementById('apply_giftcard').checked;
        document.getElementById('gc_content').style.display = b ? "block" : "none";
        //clear gc inputs if no giftcard payment is applied
        if(document.getElementById('gc_content').style.display == "none"){
            document.getElementById('gc_number').value = '';
            document.getElementById('gc_pin').value = '';
        }else{
            document.billing.gc_number.setAttribute( "autocomplete", "off" );
            document.billing.gc_pin.setAttribute( "autocomplete", "off" );
        }
    },

    /**
     * show select a store form
     *
     */
    showSelectStore : function(){
    	checkbox = document.getElementById('favorite_store_checkbox');
        stores = document.getElementById('store_selector');
        shipping = document.getElementById('shipping_info_container');

        if (checkbox.checked == false) {
            stores.style.display = 'none';
            shipping.style.display = 'block';
            YAHOO.speedfc.cart.utilities.updateSelectedAddress();
        } else {
            stores.style.display = 'block';
            shipping.style.display = 'none';
        }
    },
    
    /**
     * show select a store form with guest fav store option
     *
     */
    showSelectStoreGuest : function( isGuest ,hasPaypal ){
    	checkbox = document.getElementById('favorite_store_checkbox');
        stores = document.getElementById('store_selector');
        shipping = document.getElementById('shipping_info_container');

        firstLastName=document.getElementById('first_last_name');
        addressDetails=document.getElementById('address_details');
        giftwrapDetails=document.getElementById('giftwrap_details');
        emailSection=document.getElementById('email_section');
        selectShipping=document.getElementById('select_shipping');

        favorite_store_checkbox_switched = document.getElementById('favorite_store_checkbox_switched');
        favorite_store_checkbox_switched.value='switched';
        document.getElementById('required_label').style.display = 'block';

        if (checkbox.checked == false) {
            stores.style.display = 'none';
            shipping.style.display = 'block';
            //emailSection.style.display = 'block';
            selectShipping.style.display = 'block';
            if(isGuest != 'false'){
            firstLastName.style.display = 'block';
            addressDetails.style.display = 'block';
            giftwrapDetails.style.display = 'block';
            //emailSection.style.display = 'block';
            selectShipping.style.display = 'block';
            }
            
            if(hasPaypal){                
                firstLastName.style.display = 'none';
                addressDetails.style.display = 'none';                
                //TT43797 emailSection.style.display = 'none';
                document.getElementById('required_label').style.display = 'none';
            }
            
            YAHOO.speedfc.cart.utilities.updateSelectedAddress();
        } else {
            stores.style.display = 'block';
            if(isGuest == 'false' || isGuest == false){
                shipping.style.display = 'none';
                firstLastName.style.display = 'none';
                addressDetails.style.display = 'none';
                giftwrapDetails.style.display = 'none';
                //emailSection.style.display = 'none';
                selectShipping.style.display = 'block';
            }else{
                firstLastName.style.display = 'block';
                addressDetails.style.display = 'none';
                giftwrapDetails.style.display = 'none';
                selectShipping.style.display = 'none';
                //emailSection.style.display = 'none';
            }
        }
    },
    
    searchStore : function(favorites,nextLocation) {
        var zip = document.getElementById("zip").value;
        var state = document.getElementById("state").value;
        var city = document.getElementById("city").value;

        if(zip == '' && state == ''){
            alert("Please select a state or enter a zip code.")
            return;
        }

        miniStoreLocator = new YAHOO.speedfc.utilities.sfcPanel("miniStoreLocator");
        miniStoreLocator.setProperties(
                {
                  width: '340px',
                  height: '560px',
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

        var postData = '?zip='+zip+'&state='+state+'&city='+city+'&favorites='+favorites+'&nextLocation='+nextLocation;
        var Url = "/locator/searchStore";
        var callback = {
            success: function(o) {
                miniStoreLocator.setBody(o.responseText);
                miniStoreLocator.show();
            },
            failure: function (o) {
            }
        };

        YAHOO.util.Connect.asyncRequest('POST', Url + postData, callback, '');

        return false;
    },
    
    searchStoreNoCity : function(favorites,nextLocation) {
        var zip = document.getElementById("zip").value;
        var state = document.getElementById("state").value;
        var email_signup = 0;
        var mail_signup = 0;
        
        if(nextLocation != 'account'){
            if(document.getElementById("email_signup").checked){
                    email_signup = 1;
            }

            if(document.getElementById("mail_signup").checked){
                    mail_signup = 1;
            }

            if(zip == '' && state == ''){
                alert("Please select a state or enter a zip code.")
                return;
            }
        }

        miniStoreLocator = new YAHOO.speedfc.utilities.sfcPanel("miniStoreLocator");
        miniStoreLocator.setProperties(
                {
                  width: '340px',
                  height: '560px',
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

        var postData = '?zip='+zip+'&state='+state+'&favorites='+favorites+'&nextLocation='+nextLocation + '&emailsignup=' + email_signup + '&mailsignup=' + mail_signup;
        var Url = "/locator/searchStore";
        var callback = {
            success: function(o) {
                miniStoreLocator.setBody(o.responseText);
                miniStoreLocator.show();
            },
            failure: function (o) {
            }
        };

        YAHOO.util.Connect.asyncRequest('POST', Url + postData, callback, '');

        return false;
    },
    
    showSelectStoreForm : function() {
        document.getElementById('store_selector_form').style.display = "block";
        document.getElementById('storeInfoCollect').style.display = "none";
    }
};
