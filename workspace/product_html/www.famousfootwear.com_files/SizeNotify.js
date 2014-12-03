var SizeNotify = {
    productvariantid: '',
    querystring: '',

    initialize: function(container) {
        SizeNotify.container = container;

        SizeNotify.showLoadingBar();
        SizeNotify.ajaxRenderSizeNotify();
    },

    showLoadingBar: function() {
        $('#SizeNotify').hide();
        $('#SizeNotifyLoading').show();
    },

    ajaxRenderSizeNotify: function() {
        var productId;
        productId = SizeNotify.findQueryString('p');

        SizeNotify.ajaxUrl = "/WebServices/RenderControls.aspx?control=SizeNotify&action=Get&p=" + productId;
        jQuery.ajax({
            type: 'GET',
            url: SizeNotify.ajaxUrl,
            dataType: 'html',
            success: function(data, textStatus, XMLHttpRequest) {
                var result = CleanAjaxResponse(data);

                SizeNotify.container.html(result);
                SizeNotify.renderSizeNotifyPostProcessing();
            },
            error: function() {
                SizeNotify.renderAjaxFailure();
            }
        });
    },

    renderSizeNotifyPostProcessing: function() {
        $('#SizeNotifyLoading').hide();
        SizeNotify.popupSizeNotify();
    },

    renderAjaxFailure: function() {
        var markup = "<div class='modal'>An Error Has Occurred.<a class='close tab' href='#' onclick=$('#SizeNotify').hide();>Close</a></div>";
        SizeNotify.container.html(markup);
        //		SizeNotify.showContent();
    },

    popupSizeNotify: function() {
        SizeNotify.myAnnouncement = Dialog.Box;
        SizeNotify.myAnnouncement.initialize($('#SizeNotify'));
        SizeNotify.myAnnouncement.show();
    },

    ajaxSubmitSizeNotify: function() {
        var url = '/WebServices/RenderControls.aspx?control=SizeNotify&action=Submit' + SizeNotify.querystring;

        jQuery.ajax({
            type: 'POST',
            url: url,
            dataType: 'html',
            success: function(data, textStatus, XMLHttpRequest) {
                var result = CleanAjaxResponse(data);
                SizeNotify.container.html(result);
            },
            error: function(transport) {
                SizeNotify.renderAjaxFailure();
            }
        });
    },

    submitSizeNotify: function(ddlSize, ddlWidth) {
        var oSize = $('#' + ddlSize)[0];
        var sizeCode = oSize.options[oSize.selectedIndex].value;
        var displaySize = oSize.options[oSize.selectedIndex].text;

        var oWidth = $('#' + ddlWidth)[0];
        var widthCode = oWidth.options[oWidth.selectedIndex].value;
        var displayWidth = oWidth.options[oWidth.selectedIndex].text;

        var emailaddress = $('#txtEmailAddress').val();
        var optin = 0;
        if ($('#chkPromotionsOptIn')[0].checked) {
            optin = 1;
        }

        var productId = '';
        productId = SizeNotify.findQueryString('p');

        SizeNotify.productvariantid = productId + '-' + SizeNotify.padDigits(sizeCode, 3) + '-' + SizeNotify.padDigits(widthCode, 2);
        SizeNotify.querystring = '&p=' + productId + '&ds=' + displaySize + '&dw=' + displayWidth + '&s=' + sizeCode + '&w=' + widthCode + '&email=' + emailaddress + '&opt=' + optin;

        //check if already exists
        var ddlctrl = $("[id$='_ddlSizeAndWidth']")[0];
        var list = '';

        if (typeof ddlctrl != "undefined") {
            for (i = 1; i < ddlctrl.length; i++) {
                list += ddlctrl.options[i].value + ',';
            }
        } else {
            list = $("[id$='_hdnAllInStock']").val();
        }

        if (list.match(SizeNotify.productvariantid) != null) {
            //item already in stock
            $('#CongratsInStock').css('display', '');
            $('#divErrors').css('display', 'none');
        }
        else {
            if (SizeNotify.validateEmail() && oSize.selectedIndex > 0 && oWidth.selectedIndex > 0) {
                //Submit
                $('#btnNotifyMe')[0].disabled = true;
                $('#CongratsInStock').css('display', 'none');
                SizeNotify.ajaxSubmitSizeNotify();
            }
            else {
                //Validation errors
                $('#CongratsInStock').css('display', 'none');
                $('#divErrors').html('').css('color', 'red');
                if (!SizeNotify.validateEmail()) {
                    $('#divErrors')[0].innerHTML = 'Please enter a valid email. <br />';
                }
                if (oSize.selectedIndex == 0) {
                    $('#divErrors')[0].innerHTML = $('#divErrors')[0].innerHTML + 'Please select a size. <br />';
                }
                if (oWidth.selectedIndex == 0) {
                    $('#divErrors')[0].innerHTML = $('#divErrors')[0].innerHTML + 'Please select a width. <br />';
                }

                $('#divErrors').css('display', '');
            }

        }
    },

    validateEmail: function() {
        var email = $('#txtEmailAddress');
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email.val()) || email.val() == null || email.val() == '') {
            return false;
        }
        else {
            return true;
        }
    },

    padDigits: function(n, totalDigits) {
        n = n.toString();
        var pd = '';
        if (totalDigits > n.length) {
            for (i = 0; i < (totalDigits - n.length); i++) {
                pd += '0';
            }
        }
        return pd + n.toString();
    },

    findQueryString: function(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)    //Get our native url, in case the page has been rerouted to an SEO friendly url.
            results = regex.exec($("#SEORoutesNativeUrl").val());
        if (results == null)
            return "";
        else
            return results[1];
    }

};


// for light box effect
var Dialog = {};
Dialog.Box = {
	initialize: function(id) {
		Dialog.Box.createOverlay();

		Dialog.Box.dialog_box = $(id)[0];
		Dialog.Box.dialog_box.show = Dialog.Box.show;
		Dialog.Box.dialog_box.hide = Dialog.Box.hide;

		Dialog.Box.parent_element = $(Dialog.Box.dialog_box).parent()[0];

		Dialog.Box.dialog_box.style.position = 'absolute';

		Dialog.Box.dialog_box.style.left = '405px';
		Dialog.Box.dialog_box.style.top = '100px';

		Dialog.Box.dialog_box.style.zIndex = Dialog.Box.overlay.style.zIndex + 1;

	},

	createOverlay: function() {
		if($('#dialog_overlay').length) {
			Dialog.Box.overlay = $('#dialog_overlay')[0];
		} else {
			Dialog.Box.overlay = document.createElement('div');
			Dialog.Box.overlay.id = 'dialog_overlay';
			$(Dialog.Box.overlay).css({
				'position': 'absolute',
				'top': '0',
				'left': '0',
				'zIndex': '30000',
				'width': '100%',
				'backgroundColor': '#000',
				'display': 'none'
			});
			document.body.insertBefore(Dialog.Box.overlay, document.body.childNodes[0]);
		}
	},

	moveDialogBox: function(where) {
		$(Dialog.Box.dialog_box).remove();
		if(where == 'back') {
			Dialog.Box.dialog_box = Dialog.Box.parent_element.appendChild(Dialog.Box.dialog_box);
		}
		else {
			Dialog.Box.dialog_box = $(Dialog.Box.overlay).parent()[0].insertBefore(Dialog.Box.dialog_box, Dialog.Box.overlay);
		}
	},

	show: function() {
		Dialog.Box.overlay.style.height = $(document).height() +'px';
		Dialog.Box.moveDialogBox('out');
		Dialog.Box.selectBoxes('hide');
		$(Dialog.Box.overlay).animate({opacity: 0.3}, 0.0).show();
		Dialog.Box.dialog_box.style.display = '';
	},

	hide: function() {
		Dialog.Box.selectBoxes('show');
		$(Dialog.Box.overlay).fadeOut('fast');
		Dialog.Box.dialog_box.style.display = 'none';
		Dialog.Box.moveDialogBox('back');
		$(Dialog.Box.dialog_box.getElementsByTagName('input')).each(
			function(index, e) {
				if(e.type!='submit') {
					e.value='';
				}
			}
		);
	},

	selectBoxes: function(what) {
		if(what == 'show') {
			$('select').show();
		}
		else if(what == 'hide') {
			$('select').hide();
			$(Dialog.Box.dialog_box.getElementsByTagName('select')).show();
		}
	}
};


 
