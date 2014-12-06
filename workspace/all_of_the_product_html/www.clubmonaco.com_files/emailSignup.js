jQuery(document).ready(function () {
    var cookieName = 'emailPopup';
    // cookie doesn't exist
    if (readCookie(cookieName) == null) {
        createCookie(cookieName, 'yes', 365); // expires in a year        
        // display popup
        setTimeout(function () {
            jQuery.blockUI({
                message: jQuery('.emailPopup'),
                css: {
                    width: '512px',
                    cursor: 'default',
                    border: '0px'
                },
                overlayCSS: {
                    cursor: 'default'
                },
                onBlock: function () {
                    jQuery('.blockPage').addClass('emailPop');
                }
            });
        }, 100)

        jQuery(".emailPopup .email")
            .focus(function () {
                if (jQuery(this).val() == "Your Email") {
                    jQuery(this).val("");
                }
            })
            .blur(function () {
                if (jQuery(this).val() == "") {
                    jQuery(this).val("Your Email");
                }
            })
            .keydown(function (e) { // prevent form submit on enter
                if (e.keyCode == 13) {
                   	e.preventDefault();					
					validateSignup();
                }
            });

        jQuery(".blockOverlay, .close").live("click", function () {
            jQuery.unblockUI();
            jQuery('.emailPopup').hide();
        });
    }

});

function validateSignup() {
    jQuery(".emailPopup .error").css("display", "none");
    var fs = document.emailpopSignup;
    if (ess.isValidEmail(fs.emailpopAddress.value)) {
        var genderSelected = jQuery("input[type='radio'][name='maginzeUpdate']:checked").val().charAt(0);    
        var formData = {
            "emailAddress": fs.emailpopAddress.value,
            "contest": "CMUS_OVERLAY_"+genderSelected,
            "locale_code": "en_US",
            "email_pref": "Y",
            "emailUpdates": "on"
        };
        // submit the form!
        jQuery.ajax({
            type: "POST",
            url: "/headersignup/index.jsp",
            data: formData,
            success: function () {
                jQuery('.emailPopupForm').hide();
                jQuery('.emailPopupThanks').show();
            }
        });
        try {
            var pageTracker = _gat._getTracker(ess.googleAccountId);
            if (/\/home/.match(window.location.pathname)) {
                pageTracker._trackEvent('Visitor Actions', 'Email', 'Home Page');
            }
            if (/\/category/.match(window.location.pathname)) {
                pageTracker._trackEvent('Visitor Actions', 'Email', 'Category Page');
            }
            if (/\/orderlogin/.match(window.location.pathname)) {
                pageTracker._trackEvent('Visitor Actions', 'Email', 'Order Login Page');
            }
            if (/\/family/.match(window.location.pathname)) {
                pageTracker._trackEvent('Visitor Actions', 'Email', 'Family Page');
            }
            if (/\/product/.match(window.location.pathname)) {
                pageTracker._trackEvent('Visitor Actions', 'Email', 'Product Page');
            }
            if (/\/login/.match(window.location.pathname)) {
                pageTracker._trackEvent('Visitor Actions', 'Email', 'My Account');
            }
            if (/\/cart/.match(window.location.pathname)) {
                pageTracker._trackEvent('Visitor Actions', 'Email', 'Shopping Cart');
            }
            if (/\/checkout/.match(window.location.pathname)) {
                pageTracker._trackEvent('Visitor Actions', 'Email', 'Checkout');
            }

            pageTracker._trackPageview();

        } catch (err) {}

    } else {
        // display errors
        jQuery(".emailPopup .error").css("display", "block");
    }
};