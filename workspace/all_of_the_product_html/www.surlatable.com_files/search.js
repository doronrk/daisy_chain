searchFunctions = {
	enterHandler : function(event,btn) {
	    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	    if (keyCode == 13) {
	    	$("#"+btn).click();
		}
	},
   submitMultipleSelectiton : function(checkboxNames) {
		if(!checkboxNames) {
			alert("The parameter checkboxNames is not passed in!");
			return false;
		}

   },
   /*
    * parameters:
    * 	linkId - The id of link which will be updated.
    * 	checkboxNames - The facet id and multiple selection name pair, like: [3012=brandSelectionValue]
    * */
   updateHref : function(/*object */thisLink, /*String[] */checkboxNames, linkId) {
		if(!thisLink || !checkboxNames) {
			alert("The parameter thisLink or checkboxNames is not passed in!");
			return false;
		}
		var oldHref = $(thisLink).attr("href");

		if(linkId) {
			oldHref = $("#" + linkId).attr("href");
		}

		var newHref = oldHref;
		var multiValues = this.getMultipleValues(checkboxNames);

		if(multiValues!="") {
			if(oldHref.indexOf("?")<0) {
				newHref = newHref + "?" + multiValues;
			} else {
				newHref = newHref + "&" + multiValues;
			}
		}

		window.location = newHref;
   },
   /*
    * parameters:
    * 	checkboxNames - The facet id and multiple selection name pair, like: [3012=brandSelectionValue]
    * */
   getMultipleValues : function(/*String[] */checkboxNames) {
	    if(!checkboxNames) {
			alert("The parameter checkboxNames is not passed in!");
			return false;
		}
		var result = "";
		for(var i=0; i<checkboxNames.length; i++) {
			var idNamePair = checkboxNames[i].split("=");
			var checkboxName = idNamePair[1];
			var multiSelectionId = idNamePair[0];

			$("input[name='" + checkboxName + "']").each(function(i) {
				if($(this).attr("checked")) {
					result += checkboxName + "$" + multiSelectionId + "_" + i + "=" + escape($(this).val()) + "&";
				}
			});
		}
		if(result=="") {
			result = "";
		} else {
			result = result.substring(0, result.length-1);
		}
		return result;
   },
   sumbitTwoLevelForm : function(formId) {
		if(!formId) {
			alert("Form id passed in is invalid!");
			return;
		}
		$("#" + formId).submit();
   },

	initializeJQM : function() {
		// onShow : show+make the window translucent
	    // callback function for jqmodal
	    var myOpenPNG = function(hash) {
	        var maskWidth = $(window).width();
	        var maskHeight = $(document).height();

	        hash.o.css({
	            position: 'absolute',
	            height: maskHeight + 'px',
	            width: maskWidth + 'px'
	        });
	        hash.o.fadeIn(5);
	        hash.w.positionCenter().show();
	        hash.w.bgiframe({ opacity: false });
	    };


	    // onClose : remove/hide the windows
	    // callback function for jqmodal
	    var myClosePNG = function(hash) {
	        hash.w.hide();

	        hash.o.fadeOut('1000');
	        hash.o.remove();
	    };

	    // onShow : show+make the window translucent
	    // callback function for jqmodal
	    var myOpenGIF = function(hash) {
	        var maskWidth = $(window).width();
	        var maskHeight = $(document).height();

	        hash.o.css({
	            position: 'absolute',
	            height: maskHeight + 'px',
	            width: maskWidth + 'px',
	            backgroundColor: '#f1f1f1'
	        });
	        hash.o.fadeIn('1000');
	        hash.w.positionCenter().fadeIn('1000');
	        hash.w.bgiframe({ opacity: true });
	    };


	    // onClose : remove/hide the windows
	    // callback function for jqmodal
	    var myCloseGIF = function(hash) {
	        hash.w.fadeOut('1000');
	        hash.o.fadeOut('1000');
	        hash.o.remove();
	    };

	    //
	    // jqmodal initialization
	    //
	    $('#popupemailoptout').jqm({
	        overlay: 50,
	        trigger: '#emailoptout',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization
	    //
	    $('#popupcontact').jqm({
	        overlay: 50,
	        trigger: '#emailsignup',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization
	    //
	    $('#productquickview').jqm({
	        overlay: 50,
	        trigger: '.quickviewlink',
	        closeClass: 'popupclose',
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - cartpopup.htm Shopping cart
	    //
	    $('#cartpopup').jqm({
	        overlay: 50,
	        trigger: 'a.cartpopuptrigger',
	        closeClass: 'popupclose',
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctAddAddress.htm
	    //
	    $('#acctaddaddress').jqm({
	        overlay: 50,
	        trigger: 'a.acctaddaddresstrigger',
	        closeClass: 'popupclose',
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctEditAddress.htm
	    //
	    $('#accteditaddress').jqm({
	        overlay: 50,
	        trigger: 'a.accteditaddresstrigger',
	        closeClass: 'popupclose',
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctRetrievepasswd.htm
	    //
	    $('#acctretrievepasswd').jqm({
	        overlay: 50,
	        trigger: 'a.acctretrievepasswdtrigger',
	        closeClass: 'popupclose',
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctRetrievepasswd.htm
	    //
	    $('div.step2').jqm({
	        overlay: 50,
	        trigger: 'a.acctretrievepasswd_step2trigger',
	        closeClass: 'popupclose',
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctRetrievepasswd.htm
	    //
	    $('div.step3').jqm({
	        overlay: 50,
	        trigger: 'a.acctretrievepasswd_step3trigger',
	        closeClass: 'popupclose',
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctCancelClass.htm
	    //
	    $('#acctcancelclass').jqm({
	        overlay: 50,
	        trigger: 'a.acctcancelclasstrigger',
	        closeClass: 'popupclose',
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctCulCancelPolicy.htm
	    //
	    $('#acctculcancelpolicy').jqm({
	        overlay: 50,
	        trigger: 'a.acctculcancelpolicytrigger',
	        closeClass: 'popupclose',
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });
	    //
	    // jqmodal initialization - acctPasswdForgot.htm
	    //
	    $('#forgotpasswd').jqm({
	        overlay: 50,
	        trigger: 'a.acctforgetpasswdtrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctPasswdTemp.htm
	    //
	    $('#temppasswd').jqm({
	        overlay: 50,
	        trigger: 'a.accttemppasswdtrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctPasswdReset.htm
	    //
	    $('#resetpasswd').jqm({
	        overlay: 50,
	        trigger: 'a.acctresetpasswdtrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctPasswdReset_error.htm
	    //
	    $('#resetpasswd_error').jqm({
	        overlay: 50,
	        trigger: 'a.acctresetpasswderrortrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });


	    //
	    // jqmodal initialization - acctPasswdCleared.htm
	    //
	    $('#clearpasswd').jqm({
	        overlay: 50,
	        trigger: 'a.acctclearpasswdtrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctPasswdTempSent.htm
	    //
	    $('#tempsentpasswd').jqm({
	        overlay: 50,
	        trigger: 'a.accttempsentpasswdtrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctAddCCardAddress.htm
	    //
	    $('#acctAddCCAddress').jqm({
	        overlay: 50,
	        trigger: 'a.acctaddccaddresstrigger',
	        closeClass: 'popupclose',
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctEditCCard.htm
	    //
	    $('#editccard').jqm({
	        overlay: 50,
	        trigger: 'a.carteditccardtrigger',
	        closeClass: 'popupclose',
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctRemoveCCard.htm
	    //
	    $('#removeccard').jqm({
	        overlay: 50,
	        trigger: 'a.acctremoveccardtrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });



	    //
	    // jqmodal initialization - acctAddCCard.htm
	    //
	    $('#addccard').jqm({
	        overlay: 50,
	        trigger: 'a.acctaddccardtrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctRemovedFromWishList.htm
	    //
	    $('#acctRemovedFromWishList').jqm({
	        overlay: 50,
	        trigger: 'a.acctremovedfromwishlisttrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctShippingPreferences.htm
	    //
	    $('#acctShippingPreferences').jqm({
	        overlay: 50,
	        trigger: 'a.acctshippingpreferencestrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctHowToRedeemGiftCard.htm
	    //
	    $('#acctHowToRedeemGiftCard').jqm({
	        overlay: 50,
	        trigger: 'a.accthowtoredeemgiftcardtrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctHowToRedeemGiftCard.htm
	    //
	    $('#acctCheckCardBalanceLookup').jqm({
	        overlay: 50,
	        trigger: 'a.acctcheckcardbalancetrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });
	    //
	    // jqmodal initialization - acctHowToRedeemGiftCard.htm
	    //
	    $('#acctaddaddress').jqm({
	        overlay: 50,
	        trigger: 'a.acctaddaddresstrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });
	    //
	    // jqmodal initialization - acctHowToRedeemGiftCard.htm
	    //
	    $('#accteditaddress').jqm({
	        overlay: 50,
	        trigger: 'a.accteditaddresstrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // jqmodal initialization - acctRemoveAddress.htm
	    //
	    $('#acctremoveaddress').jqm({
	        overlay: 50,
	        trigger: 'a.acctRemoveAddresstrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });
	    //
	    // jqmodal initialization - giftPopCreateRegistry.htm
	    //
	    $('#giftcreateregistry').jqm({
	        overlay: 50,
	        trigger: 'a.giftcreateregistrytrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });
	    //
	    // jqmodal initialization - giftPopChoosePhoto.htm
	    //
	    $('#giftchoosephoto').jqm({
	        overlay: 50,
	        trigger: 'a.giftchoosephototrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });
	    //
	    // jqmodal initialization - giftPopRegistryContent.htm
	    //
	    $('#giftregistrycontent').jqm({
	        overlay: 50,
	        trigger: 'a.giftregistrycontenttrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });
	    //
	    // jqmodal initialization - giftPopRegistryDetails.htm
	    //
	    $('#giftregistrydetails').jqm({
	        overlay: 50,
	        trigger: 'a.giftregistrydetailstrigger',
	        closeClass: 'popupclose',
	        width: 495,
	        height: 300,
	        modal: false,
	        onShow: myOpenGIF,
	        onHide: myCloseGIF
	    });

	    //
	    // image preloader for popup graphics
	    //
	    (function($) {
	        var cache = [];
	        // Arguments are image paths relative to the current page.
	        $.preLoadImages = function() {
	            var args_len = arguments.length;
	            for (var i = args_len; i--; ) {
	                var cacheImage = document.createElement('img');
	                cacheImage.src = arguments[i];
	                cache.push(cacheImage);
	            }
	        }
	    })(jQuery)

	    jQuery.preLoadImages('/styles/images/popup_box_top.png', '/styles/images/popup_box_btm.png', '/styles/images/popup_box_close_x.gif');
	},

 	/*------------------------------------------*/
	/* Changed for ATG 10 + Endeca: Terms now in Ntt param, s param removed
	 */

	submitSimpleSearch : function(url) {
		var questionInput = $("#searchQuestionDisplayed").val();
		if(questionInput.indexOf('%')!= -1) {
			questionInput = questionInput.replace(/%/gi,"");
		}
		if(questionInput=='' || questionInput=='SEARCH') {
			return false;
		}
		/*$("#searchQuestion").val(questionInput);
		$("#simpleSearchForm").submit();*/
		if($.trim(questionInput) == '') {
			$("#searchQuestionDisplayed").val('keyword or item #');
			$("#searchQuestionDisplayed").attr("class", "text watermark inactive");
			return false;
		}
		window.location.href = contextPath + url + "?Ntt=" + escape($.trim(questionInput));
		return false;
	},
	submitSearchAgainSimpleSearch : function() {
		var questionInput = $("#searchAgainTerm").val();
		// $("#searchQuestion").val(questionInput);
		// $("#simpleSearchForm").submit();
		$("#searchQuestionDisplayed").val(questionInput);
		$("#searchButton").click();
		return false;
	}
 }
