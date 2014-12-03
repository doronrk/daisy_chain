// *****************************************************
//                 Class Event jQuery 
// *****************************************************
(function($) {
    var classEvent = new $.Event('class');
    var addClass = $.fn.addClass;
    var rmClass = $.fn.removeClass;
    var tgClass = $.fn.toggleClass;
    $.fn.addClass = function() {
        var t = addClass.apply(this, arguments);
        this.trigger(classEvent);
        return t;
    };
    $.fn.removeClass = function() {
        var t = rmClass.apply(this, arguments);
        this.trigger(classEvent);
        return t;
    };
    $.fn.toggleClass = function() {
        var t = tgClass.apply(this, arguments);
        this.trigger(classEvent);
        return t;
    };
    $.fn.applyStyle = function(stylefile) {
        if (!$("link[href='" + stylefile + "']").length) {
            $('<link href="' + stylefile + '" rel="stylesheet">').appendTo("head");
        }
    };
})(jQuery);


// global click event that can be referenced elsewhere for binding and unbinding
// to click events
function loginModalClickEvent(e){
    loadPopup($(this).attr('data-popupurl'));
    e.preventDefault();
}

// *****************************************************
//          Top Nav and Main Menu jQuery
// *****************************************************
$(document).ready(function() {

    //Added By AAXIS Offshore Team
    $('#mainnav').pngFix();
    //Added End


    // *****************************************************
    //              Mega Menu  -   Main Nav
    // *****************************************************
    //On Hover Over
    function megaHoverOver() {
        $(this).find('.sub').stop().fadeTo(200, 1).show(); //Find sub and fade it in
        (function($) {
            //Function to calculate total width of all ul's
            jQuery.fn.calcSubWidth = function() {
                rowWidth = 0;
                //Calculate row
                $(this).find('ul').each(function() { //for each ul...
                    rowWidth += $(this).width(); //Add each ul's width together
                });
            };
        })(jQuery);

        var pos = $(this).parent().offset();
        var height = $(this).parent().height();
        var popupHeight = $(this).find('.sub').height();

        if ($(this).find('.row').length > 0) { //If row exists...

            var biggestRow = 0;

            $(this).find('.row').each(function() {  //for each row...
                $(this).calcSubWidth(); //Call function to calculate width of all ul's
                //Find biggest row
                if (rowWidth > biggestRow) {
                    biggestRow = rowWidth;
                }
            });

            $(this).find('.sub').css({
                'width': biggestRow,
                'top': (pos.top + height) + "px",
                'left': (pos.left) + "px"
            }); //Set width
            $(this).find('.row:last').css({ 'margin': '0' });  //Kill last row's margin

        } else { //If row does not exist...

            $(this).calcSubWidth();  //Call function to calculate width of all ul's
            $(this).find('.sub').css({
                'top': (pos.top + height) + "px",
                'left': (pos.left) + "px"
            });

        }
    }
    //On Hover Out
    function megaHoverOut() {
        $(this).find('.sub').stop().fadeTo(400, 0, function() { //Fade to 0 opactiy
            $(this).hide();  //after fading, hide it
        });
    }

    //Set custom configurations
    var config = {
        sensitivity: 100, // number = sensitivity threshold (must be 1 or higher)
        interval: 50, // number = milliseconds for onMouseOver polling interval
        over: megaHoverOver, // function = onMouseOver callback (REQUIRED)
        timeout: 150, // number = milliseconds delay before onMouseOut
        out: megaHoverOut // function = onMouseOut callback (REQUIRED)
    };

    $('#topnav li .sub').css({ 'opacity': '0' }); //Fade sub nav to 0 opacity on default
    $('#topnav li').hoverIntent(config); //Trigger Hover intent with custom configurations


});
// *****************************************************
//              Mega Menu  -   Header Nav (gray menu)
// *****************************************************
function initializeHeaderNav(){
    $('#menutabs').pngFix();
    function megaHoverOver() {
        $(this).find('.sub').stop().fadeTo(50, 1).show();
        //Calculate width of all ul's
        (function($) {
            jQuery.fn.calcSubWidth = function() {
                rowWidth = 0;
                //Calculate row
                $(this).find('ul').each(function() {
                    rowWidth += $(this).outerWidth();
                });
                //Calculate row
                $(this).find('dl').each(function() {
                    rowWidth += $(this).outerWidth();
                });
            };
        })(jQuery);

        if ($(this).find('.row').length > 0) { //If row exists...
            var biggestRow = 0;
            //Calculate each row
            $(this).find('.row').each(function() {
                $(this).calcSubWidth();
                //Find biggest row
                if (rowWidth > biggestRow) {
                    biggestRow = rowWidth;
                }
            });
            //Set width
            $(this).find('.sub').css({ 'width': biggestRow });
            $(this).find('.row:last').css({ 'margin': '0' });


        } else { //If row does not exist...

            $(this).calcSubWidth();
            //Set Width
            $(this).find('.sub').css({ 'width': rowWidth });


        }

        $(this).find('.fixIE_bottom').stop().fadeTo(10, 1).show();
    }

    function megaHoverOut() {
        $(this).find('.sub').stop().fadeTo(10, 0, function() {
            $(this).hide();
        });
        $(this).find('.fixIE_bottom').stop().fadeTo(10, 0, function() {
            $(this).hide();
        });
    }


    var config = {
        sensitivity: 100, // number = sensitivity threshold (must be 1 or higher)
        interval: 50, // number = milliseconds for onMouseOver polling interval
        over: megaHoverOver, // function = onMouseOver callback (REQUIRED)
        timeout: 50, // number = milliseconds delay before onMouseOut
        out: megaHoverOut // function = onMouseOut callback (REQUIRED)
    };

    $('ul#menutabs li .sub').css({ 'opacity': '0' });
    $('ul#menutabs li').hoverIntent(config);

    $('#menutabs li').hover(function() {
        $(this).addClass('j-hover');
    }, function() {
        $(this).removeClass('j-hover');
    });

    // *****************************************************
    //          Resolve the popup z-index style.
    // *****************************************************
        $('#menutabs li.unit').hover(function() {
            $('#headernav .menu').css("position","relative");
        }, function() {
            $('#headernav .menu').css("position","");
        });
    // *****************************************************
//          Top Nav jQuery Hovering
// *****************************************************
//
//  Add class 'j-hover' to menu container elements
//
        $('#topnav li').hover(function() {
            $(this).addClass('j-hover');
        }, function() {
            $(this).removeClass('j-hover');
        });
}

$(document).ready(function() {
    initializeHeaderNav();
});

// *****************************************************
//           Quick View Link - animation
// *****************************************************

$(document).ready(function() {
    //Full Caption Sliding (Hidden to Visible)
    //
    function mouseOver() {
        $('.cover', this).stop().animate({ top: '90px' }, { queue: false, duration: 500 });
    }
    function mouseOut() {
        $('.cover', this).stop().animate({ top: '205px' }, { queue: false, duration: 500 });
    }
    var configForQuickViewMouseHover = {
        sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)    
        over: mouseOver, // function = onMouseOver callback (REQUIRED)    
        out: mouseOut // function = onMouseOut callback (REQUIRED)    
    };
    $('#main .item dt, .item1, #main .item div').hoverIntent(configForQuickViewMouseHover);
});
// *****************************************************
//          Top Nav jQuery Hovering
// *****************************************************
//
//  Add class 'j-hover' to menu container elements
// 
$(document).ready(function() {
    $('#topnav li').hover(function() {
        $(this).addClass('j-hover');
    }, function() {
        $(this).removeClass('j-hover');
    });
});


// *****************************************************
//      jQuery Modal Dialog/Popup
// *****************************************************
//
//   modal/popup windows
//      email signup, email opt out, product quick view
//
//      parameters:
//          overlay - overlay transparency (1 to 100%)
//          overlayClass - class of div to use for overlay.  Note: currently using default jqmOverlay
//          closeClass - class of "close" button or link in modal window.
//          trigger - The element that will trigger the display of the window.
//          modal - when TRUE - resticts input to only the dialog. When FALSE, clicking the overlay will close
//                     the dialog.
//      Callbacks:
//
$(document).ready(function() {
    (function($) {
        $.fn.positionCenter = function(options) {
            var pos = {
                sTop: function() {
                    return window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
                },
                wHeight: function() {
                    return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body.clientHeight;
                }
            };
            return this.each(function(index) {
                if (index == 0) {
                    var $this = $(this);
                    var elHeight = $this.outerHeight();
                    var elTop = pos.sTop() + (pos.wHeight() / 2) - (elHeight / 2);
                    if(elTop <5){
                        elTop=15;
                    }
                    $this.css({
                        position: 'absolute',
                        margin: '0',
                        top: elTop,
                        left: (($(window).width() - $this.outerWidth()) / 2) + 'px'
                    });
                }
            });
        };
    })(jQuery);
});

$(document).ready(function() {
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
    // jqmodal initialization - giftQuestionPrivacy.htm
    //
    $('#giftquestionprivacy').jqm({
        overlay: 50,
        trigger: 'a.giftregistryprivacytrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - giftprivacycheckbox_popup.jsp
    //
    $('#giftprivacycheckboxquestion').jqm({
        overlay: 50,
        trigger: 'a.giftprivacycheckboxtrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - giftQuestionPublish.htm
    //
    $('#giftquestionpublish').jqm({
        overlay: 50,
        trigger: 'a.giftregistrypublishtrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - giftQuestionShipping.htm
    //
    $('#giftquestionshipping').jqm({
        overlay: 50,
        trigger: 'a.giftregistryshippingtrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - giftQuestionMessage.htm
    //
    $('#giftquestionmessage').jqm({
        overlay: 50,
        trigger: 'a.giftregistrymessagetrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - giftQuestionEvents.htm
    //
    $('#giftquestionevents').jqm({
        overlay: 50,
        trigger: 'a.giftregistryeventstrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - giftQuestionInterests.htm
    //
    $('#giftquestioninterests').jqm({
        overlay: 50,
        trigger: 'a.giftregistryintereststrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - itemLoginWaitlist.htm
    //
    $('#itemloginwaitlist').jqm({
        overlay: 50,
        trigger: 'a.itemloginwaitlisttrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - itemAnonWaitlist.htm
    //
    $('#itemanonwaitlist').jqm({
        overlay: 50,
        trigger: 'a.itemanonwaitlisttrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - giftPopPerfectRegistry.htm
    //
    $('#giftperfectregistry').jqm({
        overlay: 50,
        trigger: 'a.giftperfectregistrytrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - giftPopFreeGifts.htm
    //
    $('#giftpopfreegifts').jqm({
        overlay: 50,
        trigger: 'a.giftpopfreegifts',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - giftPopFreeGifts.htm
    //
    $('#giftpophelp').jqm({
        overlay: 50,
        trigger: 'a.giftpophelp',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - giftDeleteRegistry.htm
    //
    $('#acctdeleteregistry').jqm({
        overlay: 50,
        trigger: 'a.acctdeleteregistrytrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - giftPopItemsAdded.htm
    //
    $('#giftpopitemsadded').jqm({
        overlay: 50,
        trigger: 'a.giftpopitemsaddedtrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - giftPopSelectRegistry.htm
    //
    $('#giftselectregistry').jqm({
        overlay: 50,
        trigger: 'a.giftselectregistrytrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    
        // jqmodal initialization - giftAddGiftCardtoRegistry.htm
    //
    $('#giftaddgiftcardtoregistry').jqm({
        overlay: 50,
        trigger: 'a.giftaddgiftcardtoregistrytrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - giftAddGiftCardtoWishlist.htm
    //
    $('#giftaddgiftcardtowishlist').jqm({
        overlay: 50,
        trigger: 'a.giftaddgiftcardtowishlisttrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - checkoutCVV2.htm
    //
    $('#checkoutcvv2').jqm({
        overlay: 50,
        trigger: 'a.cvvtrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - Taleo Careers popup
    //
    $('#cmpysearchcareer').jqm({
        overlay: 50,
        trigger: 'a.taleocareertrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - Account Manage Shipping Information popup
    //
    $('#acctMangementShippingInfo').jqm({
        overlay: 50,
        trigger: 'a.acctmanagementshippinginfotrigger',
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal initialization - As Seen In popup
    //
    $('#asSeenInMagazine').jqm({
        overlay: 50,

        closeClass: 'popupclose',
        width: 767,
        height: 536,
        modal: false,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    //
    // jqmodal trigger initialization - As Seen In Popup
    //
    $('a.newsitemtrigger').live('click', function() {
        var url = this.href;
        $.get(url, function(data) {
            $('#asSeenInArticle').html(data); // Update the inner HTML for the As Seen In Popup
            try {
                // If possible use the already initialized As Seen In Popoup
                $('#asSeenInMagazine').jqmShow(); // Show the As Seen In Popup
            }
            catch (e) {
                // Sometimes the browser looses track of the As Seen In Popoup
                //  so it has to be re-initialized - No idea why this is happenning!!!
                $('#asSeenInMagazine').jqm({
                    overlay: 50,
                    closeClass: 'popupclose',
                    width: 767,
                    height: 536,
                    modal: false,
                    onShow: myOpenGIF,
                    onHide: myCloseGIF
                });
                $('#asSeenInMagazine').jqmShow(); // Show the As Seen In Popup
            };
        });
        return false;
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

    $('#topHeader a.cartpopuptriggerTA').bind('click', function(e) {
        if(e.hasOwnProperty('originalEvent')) {
            $('#tellApart').load('/tellApartTag.jsp?actionType=updateCart&targetPage=Full&rnd=' + random_string());
        }
    });
});


//
//   Used with controls.css
//
$(document).ready(
    function() {
        $('.bgiframe').bgiframe({ opacity: false });
    }

);
//
//   Used with controls.css
//   
//      Show input fields with replaceable pale-gray text - aka 'watermark'.
//      Automatically replace the default text with blanks when the
//      user enters the field.
//
$(document).ready(function() {
    $('input.watermark.inactive').each(function() {              // find all watermark text fields
    $(this)
        .data('default', $(this).val())                 // save the current text field value
        .focus(function() {                             // when the text field gains focus, do...
            $(this).removeClass('inactive');                        // display the text as regular text
            if( $(this).val() == $(this).data('default') || '') {   // does the field contain the default text?
                $(this).val('');                                    // yes - empty out the field.
            }
        })
        .blur(function() {                              // when the text field loses focus, do...
            var default_val = $(this).data('default');      // get the original text value
            if($(this).val() == '') {                       // did the user leave the field blank?
                $(this).addClass('inactive');                   // yes - display the original text applying the .inactive css rule
                $(this).val(default_val);
            }
        });
    });
});

function loadPageFullPathNotifyMe(url,param) {
    $.get(url,param,function(data){
        $('#notifyMe_div').html(data);
    });
}

function notifyMe(skuId,productId,url){
    loadPageFullPathNotifyMe('/global/inventoryNotifyMe.jsp',{isFromEditLink:'true',catalogRefId:skuId,productId:productId,url:url});
}

function popupOndocReady(modal,showDivId){
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

    $(showDivId).jqm({
        overlay: 50,
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: modal,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
        
     $('.jqmOverlay').remove();
     $(showDivId).jqmShow();
}
    
function random_string() {
    var time = String((new Date()).getTime()).replace(/\D/gi, '');
    return time;
}

function enterHandler(event,triggerBtn) {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13) {
        event.returnValue=false;
        $("#"+triggerBtn).click();
    }
}

$(window).bind("beforeunload", function(event) {
    var n = window.event.screenX - window.screenLeft;     
    var b = n > document.documentElement.scrollWidth-20;    
    if(b && window.event.clientY < 0 || window.event.altKey)     
    {
        $.get(contextPath + "/timeout.jsp");
    }
});

// *****************************************************
//                 Dynamic Load Popup
// *****************************************************

// check to see if this link is external (on a different domain or a different protocol).
function isExternal(url) {
    var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
    if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) {
        return true;
    }
    if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host) {
        return true;
    }
    return false;
}

function loadPopup(url, params, callback) {

    if (isExternal(url)) {
        if (window['postMessage']) {
            // postMessage Proxy
            loadIframe.call(this, url);
        } else {
            window.location = url;
        }
    } else {
        if(url.indexOf("deleteregistry_popup.jsp")>=0){
            $("#dynamicLoadWrapper").load(url,params,callback);
        }
        else{
            $("#dynamicLoadWrapper").load(url);
        }
    }
}

function createPopupPNG(selector, modal) {
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

    var myClosePNG = function(hash) {
        hash.w.hide();
        hash.o.fadeOut('1000');
        hash.o.remove();
    };

    $(selector).jqm({
        overlay: 50,
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: modal,
        onShow: myOpenPNG,
        onHide: myClosePNG
    });
    $('.jqmOverlay').remove();
    $(selector).jqmShow();
}

function createPopupGIF(selector, modal) {

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

    var myCloseGIF = function(hash) {
        hash.w.fadeOut('1000');
        hash.o.fadeOut('1000');
        hash.o.remove();
    };

    $(selector).jqm({
        overlay: 50,
        closeClass: 'popupclose',
        width: 495,
        height: 300,
        modal: modal,
        onShow: myOpenGIF,
        onHide: myCloseGIF
    });
    $('.jqmOverlay').remove();
    $(selector).jqmShow();
}

// iFrame Proxy
//  because cross-domain restrictions apply to cross-protocol, we'll use an iframe to get secure content
function loadIframe(url) {
    var $iframe;

    if (url.indexOf('?') > 0) {
        url = url + '&proxy=true';
    } else {
        url = url + '?proxy=true';
    }

    // if the iframe already exists, we will use that, otherwise create the iframe and the postmessage function.
    if (document.getElementById('sltIframeProxy')) {
        $iframe = $('#sltIframeProxy');
    } else {
        $iframe = $('<iframe id="sltIframeProxy" name="sltIframeProxy" class="" style="visibility:hidden; float:left;" width="0" height="0" frameborder="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no"></iframe>')
                .appendTo('body');

        //put content into wrapper and show it.
        pm.bind("setModalContent", function (data) {
            $("#dynamicLoadWrapper").empty().html(data.content);
            createPopupGIF(data.modalId, false);
        });

        // general communication problem. show form-level message and re-enable form
        pm.bind("showErrorMessage", function (data) {
            var $form = $(data.formId);
            $form.find('.formErrorMessage').empty().html(data.content);
            $form.find(".button").show();
            $form.find('.waitingBtn').hide();
        });
    }
    $iframe.attr('src', url);
}

// *****************************************************
//             Modal Login
// *****************************************************

var loginModalFunctions = {
    showFormError: function($form){
        $form.find('.formErrorMessage').empty().html('<p class="message haserror">There were problems completing your request.</p>');
        $form.find(".button").show();
        $form.find('.waitingBtn').hide();
    },
    showFieldErrors: function($form, content) {
        $form.empty().html(content);
    },
    updateLoginStatus : function(modalId, content){
        $(modalId).jqmHide();
        $('#topHeader').empty().html(content);
        $('.js-trigger-loginModal').unbind('click',loginModalClickEvent);
        initializeHeaderNav();
    },
    loginEnforcePasswordChange : function (content){
        $('#loginPopup').jqmHide();
        $("#dynamicLoadWrapper").append(content);
        createPopupGIF('#resetpasswd', false);
    },
    redirectOnSucess : function(url){
        window.location = url;
    }
};

$(document).ready(function() {
    // Bind click on login/register to open login modal

    // we'll want to disable the modal on some pages, store rules here.
    function allowLoginModal(){
        var pagePath = window.location.pathname,
            allowModal = true;
        if (pagePath.indexOf('login.jsp') > -1) {
            allowModal = false;
        } else if (pagePath.indexOf('anonymousOrderTracking.jsp') > -1) {
            allowModal = false;
        } else if (pagePath.indexOf('register.jsp') > -1) {
            allowModal = false;
        } else if (pagePath.indexOf('anonymousCheckout.jsp') > -1) {
            allowModal = false;
        } else if (pagePath.indexOf('anonymousCheckout.jsp') > -1) {
            allowModal = false;
        } else if (pagePath.indexOf('/opc/') > -1) {
            allowModal = false;
        }
        return allowModal;
    }

    //only bind the click event on pages where we will allow the modal.
    if (allowLoginModal()) {
        $('.js-trigger-loginModal').click(loginModalClickEvent);
    }

    function submitToProxy(buttonId, formId) {
        //hide the button and show a loading progress animation
        $("#" + buttonId).hide().parent().find('.waitingBtn').show();
        proxyFunctions.postForm(document.getElementById(formId));
    }

    // if we are communicating using postmessage, setup listeners
    if ('http:' == document.location.protocol) {
        //TODO: if jQuery gets updated to 1.7+, 'bind' can be changed to 'on'
        // ex:  $("body").on("submit", '#loginForm', function(e){

        $("#dynamicLoadWrapper").bind("click", function(e){
            // because the submit buttons are actually spans wrapped in an a tag, we need to look at the id of the parent
            // we also have to look at target id because of enterHandler function.
            var parentId = e.target.parentNode.id,
                    targetId =  e.target.id;
            if (parentId == "loginBtnId" || targetId == "loginBtnId" ) {
                submitToProxy('loginBtnId', 'popupLoginForm');
                e.preventDefault();
            } else if (parentId == "registerSubBtn" || targetId == "registerSubBtn") {
                submitToProxy('registerSubBtn', 'popupRegisterForm');
                e.preventDefault();
            } else if (parentId == "changeTempPasswordSubmit" || targetId == "changeTempPasswordSubmit") {
                submitToProxy('changeTempPasswordSubmit', 'changeTempPassword');
                e.preventDefault();
            }
        });


        /*  postmessage functions */

        // success, close modal and update header
        pm.bind("loginFormSuccess", function (data) {
            if (data.previousPage == "") {
                var currentPath=window.location.href;
                if(currentPath.indexOf("culAdd") != -1){
                    loginModalFunctions.redirectOnSucess(currentPath);
                }
                else {
                    if(data.formId=="#popupRegisterForm"){
                        loginModalFunctions.redirectOnSucess("/account/acctCreated.jsp");
                    }
                    else {
                        loginModalFunctions.updateLoginStatus(data.modalId, data.content);
                    }
                }
                
            } else {
                loginModalFunctions.redirectOnSucess(data.previousPage);
            }
        });

        // failure, update modal contents to show form errors.
        pm.bind("loginFormError", function (data) {
            var $form = $(data.formId);
            loginModalFunctions.showFieldErrors($form, data.content);
        });

        // failure, update modal contents to show form errors.
        pm.bind("loginEnforcePasswordChange", function (data) {
            loginModalFunctions.loginEnforcePasswordChange(data.content);
        });

    }

});




jQuery(window).load(function() {
    /* If statement to fix SLT-975 */
    if (navigator.userAgent.match(/iPad/i) != null) {
        /* Allow :active styles to work on a page in Mobile Safari */
        document.addEventListener("touchstart", function(){}, true);
    }

    /* Gift click action */
    $('#topHeaderGiftReg').click(function() {
        window.location = $('#topHeaderRegistryButton').attr('href');
    });

    /* Search click action */
    $('#topNavSearch').click(function(event) {
        if ($(event.target).is('#topNavSearch>input')) {
            // Input clicked, no action
        } else {
            var searchUrl = $(this).attr('data-nonsecureurl');
            return searchFunctions.submitSimpleSearch(searchUrl);
        }
    });

    /* Section secondary dropdown toggling */
    $('#topSectionPrimNav .topNavWrapper').click(function(event) {
        // Section nav HREF link exception
        if ($(this).children('span').hasClass('topSectionSelected')) {
            hideAllNavs();
        } else if ($(this).hasClass("topNavHref")) {
            // No action
        } else {
            // Hide any open dropdowns
            hideAllNavs();
            // Open chosen menu
            $(this).children('span').addClass('topSectionSelected');
            var childPosition = $(this).children('span').position();
            $(this).children('.topSectionSecNav').css('left', childPosition.left);
            $(this).children('.topSectionSecNav').show();
        }
        event.stopPropagation();
    });

    /* Product secondary arrow hover */
    $('#topProductPrimNav .topNavWrapper div.topProductSecNav>ul>li').hover(function(event) {
        // Detect iPad for SLT-968
        if (navigator.userAgent.match(/iPad/i) != null) {
            $(this).onclick();
        }
        if ($(this).hasClass('topNavHref')) {
            // Don't show arrow on href links
            $('#topProductSecNavArrow').hide();
        } else {
            var hoverLiPos = $(this).position();
            // Display hover arrow next to hovered item based on item's current position
            $('#topProductSecNavArrow').css({ 'left': ($(this).parents('ul').outerWidth() + parseInt($(this).parents('.topProductSecNav').css('left'), 10)), 'top': (parseInt($(this).parents('.topProductSecNav').css('top'), 10) + hoverLiPos.top - (parseInt($(this).css('padding-top'), 10) + 2)) });
            $('#topProductSecNavArrow').show();
        }
    });

    /* Product secondary promo SHOP NOW activation */
    $('.topProductSecNavPromo').hover(function(event) {
        // When the promo box is hovered, activate SHOP NOW
        $(this).children('.topProductSecNavPromoShop').children('a').css({
            'color': '#405700',
            'border-bottom': '1px solid #a8a8a8',
            'text-decoration': 'none'
        });
    }, function(event) {
        // On mouseout, deactvate SHOP NOW
        $(this).children('.topProductSecNavPromoShop').children('a').css({
            'color': '',
            'border-bottom': '',
            'text-decoration': ''
        });
    });

    /* Product secondary & tertiary menu toggling */
    $('#topProductPrimNav .topNavWrapper').click(function(event) {
        // Get the event target for determining where click landed (event bubbling)
        var target = $(event.target);
        // Click was on primary, secondary menu handling
        if (target.is('#topProductPrimNav .topNavWrapper>span')) {
            // Secondary already open, close it
            if ($(this).children('span').hasClass('topProductSelected')) {
                hideAllNavs();
            } else {
                // Open secondary nav based on click location
                hideAllNavs();
                $(this).children('span').addClass('topProductSelected');
                var childPosition = $(this).children('span').position();
                $(this).children('.topProductSecNav').css('left', childPosition.left);
                $(this).children('.topProductSecNav').show();
                
                /* Truncate promo topProductSecNavPromoText so text is within topProductSecNavPromo height limit */
                var promoText = $(this).find('.topProductSecNav .topProductSecNavPromo .topProductSecNavPromoText');
                if (promoText.height() > 72) {
                    promoText.css('max-height', '72px'); // Hard coded height to fix SLT-916
                    // Trim and truncate p and add elipsis
                    var newText = $.trim(promoText.text());
                    newText = newText.substring(0, 60);
                    promoText.text(newText + "...");
                }
            }
        }
        /* Product tertiary menu slideout toggling */
        else if (target.is('#topProductPrimNav .topNavWrapper div.topProductSecNav ul li, #topProductPrimNav .topNavWrapper div.topProductSecNav ul li>span')) {
            // Convert target to li for selection
            if ($(target).is('li>span')) { target = target.parent('li'); }
            if ($(target).hasClass("topNavHref")) {
                // Href link, no action
            } else {
                // Same menu clicked, close it
                if ($(target).hasClass('topProductSubSelected')) {
                    $(target).removeClass('topProductSubSelected');
                    $(target).children('.topProductTerNav').hide();
                    $('#topProductSecNavArrowActive').hide();
                    // Reset radius corners on secondary menu
                    $(target).parents('.topProductSecNav').css({
                        '-moz-border-radius': '',
                        '-webkit-border-radius': '',
                        'border-radius': '',
                        'border-right': '1px solid #405700'
                    });

                    /* Secondary menu height matching - not in spec
                    // Unset secondary menu height
                    $(target).parents('.topProductSecNav').css({
                    'height': ''
                    });
                    */
                }
                // Open tertiary menu
                else {
                    // Set radius corners on secondary menu
                    $(target).parents('.topProductSecNav').css({
                        '-moz-border-radius': '0px 0px 0px 5px',
                        '-webkit-border-radius': '0px 0px 0px 5px',
                        'border-radius': '0px 0px 0px 5px',
                        'border-right': '1px solid #FFF'
                    });

                    /* Secondary menu height matching - not in spec
                    // Set secondary menu height
                    $(target).parents('.topProductSecNav').css({
                    'height':$(target).children('.topProductTerNav').height()
                    });
                    */

                    // Hide other tertiary menus
                    $('.topProductSecNav ul li').removeClass('topProductSubSelected');
                    $('.topProductSecNav ul li div.topProductTerNav').hide();
                    $(target).addClass('topProductSubSelected');

                    // Vars for determining tertiary menu position, once open
                    var parentOffset = $(target).parents('.topProductSecNav').offset();
                    var parentPosition = $(target).parents('.topProductSecNav').position();
                    var parentWidth = $(target).parents('.topProductSecNav').innerWidth();
                    var terNavWidth = $(target).children('.topProductTerNav').outerWidth();
                    var topProductPrimNavOffset = $('#topProductPrimNav').offset();
                    var topProductPrimNavWidth = $('#topProductPrimNav').outerWidth();
                    var contentEdgeDiff = 0;
                    // Check if tertiary menu will run off right content edge
                    if ((parentOffset.left + parentWidth + terNavWidth) > (topProductPrimNavOffset.left + topProductPrimNavWidth)) {
                        // Set differential for secondary+tertiary menus to right content edge
                        contentEdgeDiff = (parentOffset.left + parentWidth + terNavWidth) - (topProductPrimNavOffset.left + topProductPrimNavWidth) + 10;
                    }
                    // Align and show tertiary menu
                    $(target).parents('.topProductSecNav').css({ 'left': (parentPosition.left - contentEdgeDiff) });
                    $(target).children('.topProductTerNav').css({ 'left': parentWidth, 'top': '0px' });
                    $(target).children('.topProductTerNav').show();

                    // Display active arrow secondary arrow based on clicked element
                    var hoverLiPos = $(target).position();
                    $('#topProductSecNavArrowActive').css({ 'left': ($(target).parents('ul').outerWidth() + parseInt($(target).parents('.topProductSecNav').css('left'), 10)), 'top': (parseInt($(target).parents('.topProductSecNav').css('top'), 10) + hoverLiPos.top - (parseInt($(target).css('padding-top'), 10) + 2)) });
                    $('#topProductSecNavArrowActive').show();
                    $('#topProductSecNavArrow').hide();
                }
            }
        }
        event.stopPropagation();
    });

    /* Click anywhere on body to hide menus */
    $("body").click(function() {
        hideAllNavs();
    });

    /* Hides all navigation dropdowns and resets product tertiary display */
    function hideAllNavs() {
        $('#topSectionPrimNav .topNavWrapper span').removeClass('topSectionSelected');
        $('#topSectionPrimNav .topNavWrapper').children('.topSectionSecNav').hide();
        $('#topProductPrimNav .topNavWrapper span').removeClass('topProductSelected');
        $('#topProductPrimNav .topNavWrapper').children('.topProductSecNav').hide();
        $('.topProductSecNav ul li').removeClass('topProductSubSelected');
        $('.topProductSecNav ul li').children('.topProductTerNav').hide();
        $('#topProductSecNavArrow').hide();
        $('#topProductSecNavArrowActive').hide();
        // Reset radius corners on secondary menu
        $('.topProductSecNav').css({
            '-moz-border-radius': '',
            '-webkit-border-radius': '',
            'border-radius': '',
            'border-right': '1px solid #405700'
        });

        /* Secondary menu height matching - not in spec
        // Unset secondary menu height
        $('.topProductSecNav').css({
        'height': ''
        });
        */
    }

    /* Fix for search bar placeholder in IE8/9
    based on http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html */
    $('#topNavSearch>input').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.attr('placeholder', '');
            input.val('');
        }
    }).blur(function() {
        var input = $(this);
        if (input.val() == '') {
            input.attr('placeholder', 'SEARCH');
            input.val(input.attr('placeholder'));
        }
    }).blur();
});
