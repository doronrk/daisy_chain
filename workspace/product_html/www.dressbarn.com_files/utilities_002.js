/**
 * Account namespace
 */
YAHOO.namespace('speedfc.account.utilities');
YAHOO.speedfc.account.utilities = {
    passwordPanel : null,

    /**
     * openPasswordhelp: opens the password help panel.
     */
    openPasswordhelp : function() {
        var body = '<div id="password_panel" style="position: relative;">'
                    + '<div id="password_panel_wrapper">'
                    + '<p>Your password must have 6 to 10 characters, must begin with '
                    + 'a letter and contain at least one number or special character '
                    + '(e.g., ! @ # $ % ^ & * _ \ - + = : ; . ? / |).</p>'
                    + '</div></div>';
        YAHOO.speedfc.account.utilities.passwordPanel = new YAHOO.speedfc.utilities.sfcPanel("password_panel");
        YAHOO.speedfc.account.utilities.passwordPanel.setProperties({
                                                                     width : "250px",
                                                                     constraintoviewport : true,
                                                                     fixedcenter : true,
                                                                     underlay : "none",
                                                                     visible : false,
                                                                     draggable : false,
                                                                     modal : true
                                                                        });
        YAHOO.speedfc.account.utilities.passwordPanel.setBody(body);
        YAHOO.speedfc.account.utilities.passwordPanel.show();

        return false;
    },

    /**
     * prepareData creates a hidden input to merge the telephone numbers into a
     * single one.
     */
    prepareData : function(iForm) {
        var elem = iForm.elements;
        var iPh = document.createElement("INPUT");
        iPh.type = "hidden";
        iPh.name = "billing[phone]";
        iPh.value = elem['billing[phone_area]'].value + '-'
                        + elem['billing[phone_prefix]'].value + '-'
                        + elem['billing[phone_suffix]'].value;
        iForm.appendChild(iPh);
        return true;
    },

    /**
     * toggleLoginForgot: changes the screen between log in page an forgot pasword page
     */
    toggleLoginForgot : function () {
        var login = document.getElementById('login_screen');
        var forgot = document.getElementById('forgot_screen');
        if (!login || !forgot)  return;

        login.style.display = login.style.display == 'none' ? 'block' : 'none';
        forgot.style.display = forgot.style.display == 'none' ? 'block' : 'none';
    },

    /**
     * check_coppa: turn on or turn off the submit_button depending on coppaBox
     * value.
     */
    check_coppa : function(coppaBox) {
        var submit_button_on = document.getElementById('submit_button_on');
        var submit_button_off = document.getElementById('submit_button_off');
        if (coppaBox.checked) {
            submit_button_on.style.display = 'inline';
            submit_button_off.style.display = 'none';
        } else {
            submit_button_on.style.display = 'none';
            submit_button_off.style.display = 'inline';
        }
    },
    
    /**
     * open/close favorite stores actions
     */
    toggleEdit : function(action, id) {
        var edit_button = document.getElementById('edit_store_actions_button_'+id);
        var edit_div = document.getElementById('edit_store_actions_'+id);
        if (action == 'open') {
            edit_button.style.display = 'none';
            edit_div.style.display = 'block';
        } else {
            edit_div.style.display = 'none';
            edit_button.style.display = 'block';
        }
    },

    /**
     * open edit address
     */
    toggleAddressEdit: function(address_id, nick){
        var nick_label = YAHOO.util.Dom.get("span_nick_"+nick);
        var required_label = YAHOO.util.Dom.get("required_"+nick);
        var address_contents = YAHOO.util.Dom.get("address_contents_"+nick);
        var address_edit = YAHOO.util.Dom.get("address_edit_"+nick);
        if(nick_label) YAHOO.util.Dom.setStyle(nick_label, "display", "none");
        if(address_contents) YAHOO.util.Dom.setStyle(address_contents, "display", "none");
        if(required_label) YAHOO.util.Dom.setStyle(required_label, "display", "inline");

        var edit_btn = YAHOO.util.Dom.get("button_edit_address_"+nick);
        var edit_btn_dis = YAHOO.util.Dom.get("button_edit_address_cancel_"+nick);
        if(edit_btn) YAHOO.util.Dom.setStyle(edit_btn, "display", "none");
        if(edit_btn_dis) YAHOO.util.Dom.setStyle(edit_btn_dis, "display", "inline");

        var callback = {
                success: function(o)
                         {
                             var address_edit = YAHOO.util.Dom.get("address_edit_"+nick);
                             address_edit.innerHTML = o.responseText;
                         },
                failure: function(o){

                },
                argument: nick
        };


        YAHOO.util.Connect.asyncRequest('GET', '/account/editAddress?id='+address_id+'&do=get', callback, null);


    },

    toggleAddressEditError: function(address_id, nick){
        var nick_label = YAHOO.util.Dom.get("span_nick_"+nick);
        var required_label = YAHOO.util.Dom.get("required_"+nick);
        var address_contents = YAHOO.util.Dom.get("address_contents_"+nick);
        if(nick_label) YAHOO.util.Dom.setStyle(nick_label, "display", "none");
        if(address_contents) YAHOO.util.Dom.setStyle(address_contents, "display", "none");
        if(required_label) YAHOO.util.Dom.setStyle(required_label, "display", "inline");

        var edit_btn = YAHOO.util.Dom.get("button_edit_address_"+nick);
        var edit_btn_dis = YAHOO.util.Dom.get("button_edit_address_cancel_"+nick);
        if(edit_btn) YAHOO.util.Dom.setStyle(edit_btn, "display", "none");
        if(edit_btn_dis) YAHOO.util.Dom.setStyle(edit_btn_dis, "display", "inline");


    },

    /**
     * hides edit address form
     */
    cancelAddressEdit: function(nick){
        var nick_label = YAHOO.util.Dom.get("span_nick_"+nick);
        var required_label = YAHOO.util.Dom.get("required_"+nick);
        var address_contents = YAHOO.util.Dom.get("address_contents_"+nick);
        var address_edit = YAHOO.util.Dom.get("address_edit_"+nick);
        if(nick_label) YAHOO.util.Dom.setStyle(nick_label, "display", "inline");
        if(address_contents) YAHOO.util.Dom.setStyle(address_contents, "display", "inline");
        if(required_label) YAHOO.util.Dom.setStyle(required_label, "display", "none");
        address_edit.innerHTML = "";

        var edit_btn = YAHOO.util.Dom.get("button_edit_address_"+nick);
        var edit_btn_dis = YAHOO.util.Dom.get("button_edit_address_cancel_"+nick);
        if(edit_btn) YAHOO.util.Dom.setStyle(edit_btn, "display", "inline");
        if(edit_btn_dis) YAHOO.util.Dom.setStyle(edit_btn_dis, "display", "none");
    },
    
    /**
     * open forgot password overlay
     */
    forgotPassword : function(){
        YAHOO.speedfc.utilities.common.getPageOverlay('forgot', 'Forgot Password?', '/account/forgot',316, false, YAHOO.speedfc.account.utilities.handleForgot);
    },
    
    handleForgot : function(panel){
        YAHOO.util.Event.addListener(YAHOO.util.Selector.query('#formForgot'),'submit',
                function(evt, _panel)
                {
                    var callback = {
                            success: function(o)
                                     {
                                         YAHOO.util.Selector.query('#sfcpanel_container')[0].innerHTML = o.responseText;
                                         YAHOO.util.Event.addListener(YAHOO.util.Selector.query('#forgotClose')[0], 'click',
                                            function(evt, _win)
                                            {
                                                _win.hide();
                                            }, o.argument);
                                         YAHOO.speedfc.account.utilities.handleForgot(o.argument);
                                     },
                            argument: _panel
                    };
                    YAHOO.util.Connect.asyncRequest('POST', '/account/forgot',callback,'emailforgot='+YAHOO.util.Selector.query('#forgotemail')[0].value);
                    YAHOO.util.Event.preventDefault(evt);
                },panel);        
    
    },
    
    updateSuccessOverlay : function(){  
        YAHOO.speedfc.utilities.common.getPageOverlay('update', '', '/account/edited',316, false);
    },
    
    closeupdateSuccess : function(){
        if(YAHOO.speedfc.utilities.common.my_sfcPanel)
            YAHOO.speedfc.utilities.common.my_sfcPanel.hide();
    },
    
    /**
     * open/close mobile input div
     */
    toggleMobileInput : function(action) {

        var fine_print = document.getElementById('mobile_subscription_fine_print');
        var input = document.getElementById('mobile_phone_input'); 
        var store_info = document.getElementById('more-hours-info'); 
        if(action == 'toogle'){

            if(fine_print.style.display == 'block'){
                fine_print.style.display = 'none';
                fine_print.style.visibility = 'hidden';
                document.getElementById('comm_options_bg').style.height = '258px'; //40px more after addition of text "By checking the above...."
                //document.getElementById('comm_options_bg').style.background = "url('/images/account/d-mail-bg.jpg') no-repeat";
                document.getElementById('comm_options').style.height = '164px';  //40px more after addition of text "By checking the above...."
            }
            else{
                fine_print.style.display ='block';
                fine_print.style.visibility = 'visible';
                document.getElementById('comm_options_bg').style.height = '373px';
                //document.getElementById('comm_options_bg').style.background = "#FEECF0 url('/images/account/d-mail-bg-large.jpg') no-repeat";
                document.getElementById('comm_options').style.height = '269px';
            }

        } if(action == 'toggleinfo'){
            if(store_info.style.display == 'block'){
                store_info.style.display = 'none';
                store_info.style.visibility = 'hidden';
            }
            else{
                store_info.style.display ='block';
                store_info.style.visibility = 'visible';
            }
        } else{

            if (action == 'on') {
                input.style.display = 'block';
                //input.style.visibility = 'visible';
                fine_print.style.display = 'block';
                //fine_print.style.visibility = 'visible';
                document.getElementById('comm_options_bg').style.height = '536px';
                document.getElementById('comm_options_bg').style.background = "#FEECF0 url('/images/account/d-mail-bg-large.jpg') no-repeat";
                document.getElementById('comm_options').style.height = '440px';
            }  else {
                input.style.display = 'none';
                //input.style.visibility = 'hidden';
                fine_print.style.display = 'none';
                //fine_print.style.visibility = 'hidden';
                document.getElementById('comm_options_bg').style.height = '365px';
                document.getElementById('comm_options_bg').style.background = "url('/images/account/d-mail-bg.jpg') no-repeat";
                document.getElementById('comm_options').style.height = '270px';
            }

        }
    },
    
    toggleProfileFinePrint : function(){
        var fine_print = document.getElementById('mobile_fine_print');
        fine_print.style.display = 'block';
    },
    
    toggleSigninFinePrint : function(checked){
        var fine_print = document.getElementById('mobile_fine_print');
        if(checked)
            fine_print.style.display = 'block';
        else
            fine_print.style.display = 'none';
    }
    
    
     
    
};