var tbs = {
    loc: { //TODO: add localization
        currency: '£',
        outOfStock: 0
        //        email: 'Enter your email address for updates',
        //        searchtargeturl: '/services/search.aspx',
        //        search: '{0}?code={1}'
    },
    /* CO&Reg Changes Start */

    popup: {
        ManagePopup: function (divId) {
            var _windowHeight = $(window).height(),
                    _windowWidth = $(window).width(),
                    _divHeight = $(divId).height(),
                    _divWidth = $(divId).width(),
                    _left = 0,
                    _top = 0;

            if (_divHeight < _windowHeight)
                _top = ($(window).height() - $(divId).height()) / 2;
            if (_divWidth < _windowWidth)
                _left = ($(window).width() - $(divId).width()) / 2;

            $(divId).css({
                left: _left,
                top: $(window).scrollTop() + _top
            });

            $(document).on('keydown', function (e) {
                if (e.keyCode == 27) {
                    $(divId + " .close").trigger('click');
                }
            });

            $(divId).on("click", ".close", function () {
                $(divId).html("");
                $(divId + "_overlay").fadeOut(500);
                $("div#ajax-loader").parent().css("position", "");
                $("div#ajax-loader").remove();
            });
        },

        OpenTermsPopup: function (infoid, title) {
            var infoid = infoid.split(';');
            $.ajax({
                type: "POST",
                async: false,
                contentType: "charset=UTF-8",
                url: loc.basket.urlStaticLinks + "?topcode=" + infoid[0] + "&toptype=" + infoid[1] + "&heading=" + title,
                success: function (data) {
                    $("#common-popup").html("").append($(data));
                    $("#common-popup_overlay").fadeIn(500);
                    tbs.popup.ManagePopup("#common-popup");
                    tbs.popup.ManageTermsToggle();
                },
                error: function () {
                    console.log("error")
                }
            });
        },

        ManageTermsPopup: function () {
            $("#moreinfo .informationblock .infoitems").bind("click", function () {
                var title = $(this).html();
                tbs.popup.OpenTermsPopup($(this).attr('id'), title);
            });

        },

        ManageTermsToggle: function () {
            $("#common-popup").on('click', '#toggle-view li', function (e) {
                e.stopImmediatePropagation();
                var text = $(this).children('div.panel');
                if (text.is(':hidden')) {
                    text.slideDown('200');
                    $(this).children('span').html('-');
                } else {
                    text.slideUp('200');
                    $(this).children('span').html('+');
                }
            });
        },

        ValidateLYBKeyPress: function (field) {
            $("input[name$='" + field + "']").bind('keypress', function (event) {
                // Allow only backspace and delete and arrow keys
                if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39) {
                    return true;
                }
                else {
                    // Ensure that it is a number and stop the keypress
                    if (event.charCode < 48 || event.charCode > 57) {
                        event.preventDefault();
                    }
                }
            });
        }
    },
    //Email validation for intermediate login, login, etc
    Email: {
        fnValidateEmail: function (strEmailText) {
            var strEmailErrMsg = "";
            var strEmailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (($.trim(strEmailText)).length == 0) {
                strEmailErrMsg = loc.Var.constEmpty;
            }
            else if (!strEmailRegex.test(strEmailText)) {
                strEmailErrMsg = loc.Var.constInvalid;
            }
            return strEmailErrMsg;
        }
    },
    //Password validation for intermediate login, login, etc
    PWD: {
        //strType = PWD (strPwd_1 validation only); strType = REG (Registration - Confirm password); strType = CHG (Change password);
        fnValidatePassword: function (strPwd_1, strPwd_2, strType) {
            var strPWDErrMsg = "";
            var strPWDRegex = /^.{6,}$/;
            if ((strType == loc.login.varReg) || (strType == loc.login.varChg)) {
                if (($.trim(strPwd_1).length == 0) || ($.trim(strPwd_2).length == 0)) {
                    strPWDErrMsg = loc.Var.constEmpty;
                }
                else if (($.trim(strPwd_1).length < loc.login.pwdminchara) || (!strPWDRegex.test(strPwd_2))) {
                    strPWDErrMsg = loc.Var.constLength;
                }
                else if (($.trim(strPwd_1)) != ($.trim(strPwd_2))) {
                    strPWDErrMsg = loc.Var.constNotMatch;
                }
            }
            else if (($.trim(strPwd_1)).length == 0) {
                strPWDErrMsg = loc.Var.constEmpty;
            }
            return strPWDErrMsg;
        }
    },

    ShowAjaxLoader: function (parentid) {
        $(parentid).append('<div id="ajax-loader"></div>');
        $("div#ajax-loader").parent().css("position", "relative");
        $(parentid + " #ajax-loader").delay(600).show();
    },

    ShowAjaxLoaderforPayment: function (parentid) {
        $(parentid).append('<div id="ajax-loader"></div>');
        $("#ajax-loader").append('<div class="message" style="font-size:17px;margin-top:52%;text-align:center;">' + loc.messages.noRefreshOrBackButton + '</div>');
        $("div#ajax-loader").parent().css("position", "relative");
        $(parentid + " #ajax-loader").delay(600).show();
    },

    HideAjaxLoader: function () {
        $("div#ajax-loader").parent().css("position", "");
        $("div#ajax-loader").remove();
    },
    /**ATP Changes **/
    openDeliveryInfoTooTip: function (data) {
        var expressMoreDetailsToolTip = "<div id='delivery-atp'>"
									+ "<div class='msg-heading'>"
									+ "<span class='msg-sub-info'>" + loc.messages.OpcDeliveryInfoTitle + "<span>" + loc.ss.OpcDeliveryInfoCloseSymbol + "</span></span>"
									+ "</div>"
									+ "<div class='msg-description'>" + loc.messages.OpcDeliveryInfoText + "</div>"
									+ "</div>"
									+ "</div></div>";
        expressMoreDetailsToolTip = '<div id="atp-tooltip" style="top:' + parseInt($(data).offset().top + 15) + 'px; left:' + parseInt($(data).offset().left) + 'px;">' + expressMoreDetailsToolTip;
        $("#master").after(expressMoreDetailsToolTip);
        $("#delivery-atp").animate({ width: '250px', height: '90px' }, 400, function () {
            $("#delivery-atp .msg-heading  .msg-sub-info > span").click(function () { $("#atp-tooltip").remove(); });
            setTimeout(function () { $("#atp-tooltip").remove(); }
				, 5000);
        });
    },
    /* CO&Reg Changes End */

    core: {
        isTouchDevice: function () { /* touch interface detection */
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) { }
            return false;
        },
        isMobile: function () {
            var deviceAgent = navigator.userAgent.toLowerCase();
            var agentID = deviceAgent.match(/(iphone|ipod|android)/);
            if (agentID) {
                return true;
            } else { return false; }
        },
        manageMainMegaMenuDisplay: function (inputOptions) { /* MANAGE LOGIN POPUP */
            var options = $.extend({ delay: 0 }, inputOptions);

            if (options.delay > 0) {
                setTimeout(updatemegamenuwidth, options.delay);
            } else {
                updatemegamenuwidth();
            }

            function updatemegamenuwidth() {
                var mainNavEntries = $('.mainnavmegamenu > ul > li > a'),
					navWidth = $('.mainnavmegamenu').width(),
					totalEntriesWidth = 0,
					mainNavEntriesNumber = mainNavEntries.length,
					liLeft = 0,
					liRight = 0;

                mainNavEntries.each(function () {
                    totalEntriesWidth += $(this).width();
                });
                var totalFreeSpace = navWidth - totalEntriesWidth,
					paddingEntryValue = Math.floor(totalFreeSpace / (mainNavEntriesNumber * 2));
                totalEntriesWidth = 0;
                var firstclasswidth = $('.mainnavmegamenu > ul > .first').width();
                $('.mainnavmegamenu > ul > li').each(function (index) {
                    liRight = liRight + $(this).width();
                    var $listItems = $(this).find('.menu-outer-container .menu-inner-container'),
						_left = 0,
						megaMenuWidth = $listItems.find('.main-categories ul li').width() + 20 + (($listItems.find('.sub-categories ul li').width() + 10) * $listItems.find('.sub-categories ul').length) + 10,
						menuLeft = ($('#mainnav').width() - megaMenuWidth) / 2,
						menuRight = ($('#mainnav').width() - megaMenuWidth) / 2 + megaMenuWidth;
                    if (megaMenuWidth < $('#mainnav').width())
                        _left = parseInt(Math.floor(($('#mainnav').width() - megaMenuWidth) / 2));

                    $(this).find('.menu-outer-container').css({ left: (_left - liLeft) });
                    if (liLeft < menuLeft && liRight < menuRight)
                        $(this).find('.menu-outer-container').css({ left: (liRight - liLeft) / 2 });
                    if (liLeft > menuLeft && liRight > menuRight)
                        $(this).find('.menu-outer-container').css({ left: ((liRight - liLeft) - megaMenuWidth) });

                    if ($(this).find(".main-categories").length && !$(this).find(".sub-categories").length && !$(this).find(".menu-inner-container .banner-section").length) {
                        $(this).find(".menu-outer-container").css({ 'box-shadow': 'none', 'border-width': '5px 1px 1px' });
                        $(this).find(".menu-inner-container").css({ 'box-shadow': 'none', 'border-width': '0px' });
                    }

                    if ($(this).find('.main-categories ul li').length == 0) {
                        $(this).find('.main-categories').hide();
                    }

                    liLeft = liLeft + $(this).width();
                });
            }
        },
        manageMainNavDisplay: function (inputOptions) { /* MANAGE LOGIN POPUP */
            var options = $.extend({ delay: 0 }, inputOptions);

            if (options.delay > 0) {
                setTimeout(updatePadding, options.delay);
            } else {
                updatePadding();
            }

            function updatePadding() {
                var mainNavEntries = $('#mainnav > ul > li > a'),
					navWidth = $('#mainnav').width(),
					totalEntriesWidth = 0,
					mainNavEntriesNumber = mainNavEntries.length;

                mainNavEntries.each(function () {
                    totalEntriesWidth += $(this).width();
                });
                var totalFreeSpace = navWidth - totalEntriesWidth,
					paddingEntryValue = Math.floor(totalFreeSpace / (mainNavEntriesNumber * 2));

                mainNavEntries.each(function () {
                    $(this).css('padding', '0 ' + paddingEntryValue + 'px');
                });
            }
        },


        quickshop: {
            resizeQuickshop: function () {
                var _getHeight = $('#quickshop .container').attr('data-height'),
					_getHeight_oos = $('#quickshop_outofstock .container').attr('data-height'),
					_getHeight_oos_conf = $('#quickshop_outofstock_confirmation .container').attr('data-height'),
					_setTop = 0, _setTop_oos = 0, _setTop_oos_conf = 0;

                if ($(window).height() > parseInt(_getHeight)) {
                    _setTop = $(window).height() - parseInt(_getHeight);
                    _setTop /= 2;
                }
                if ($(window).height() > parseInt(_getHeight_oos)) {
                    _setTop_oos = $(window).height() - parseInt(_getHeight_oos);
                    _setTop_oos /= 2;
                }
                if ($(window).height() > parseInt(_getHeight_oos_conf)) {
                    _setTop_oos_conf = $(window).height() - parseInt(_getHeight_oos_conf);
                    _setTop_oos_conf /= 2;
                }
                $('#quickshop .overlay').css('top', $(window).scrollTop() + _setTop);
                $('#quickshop_outofstock .overlay').css('top', $(window).scrollTop() + _setTop_oos);
                $('#quickshop_outofstock_confirmation .overlay').css('top', $(window).scrollTop() + _setTop_oos_conf);
            },
            loadManageOutOfStock: function (target) { /*This method is used for loading loadManageOutOfStock*/
                var fnQs = function (e) {
                    e.preventDefault();
                    var $this = $(this).blur();
                    var hrefValueStock = $this.attr("href");
                    tbs.core.quickshop.triggerManageOutOfStock(hrefValueStock);
                }
                $(target).bind({ 'click': fnQs });
            },
            triggerManageOutOfStock: function (hrefValueStock) { /*This method is used for triggerManageOutOfStock  */
                var val = hrefValueStock.split("#");
                var varcode = val[1];
                //var url_stock = $.format("/ajax/outofStock_notification_popup.aspx?varcode={0}", varcode);
                var url_stock = $.format(loc.url.outofstocknotification, varcode);
                // $("#outofstockNotification_div").load(url_stock, tbs.core.quickshop.manageOutOfStockPopup);
                var outofstockNotificationdiv = $("#outofstockNotification_div");
                outofstockNotificationdiv.children().remove();
                $.ajax({
                    type: "GET",
                    url: url_stock,
                    success: tbs.core.quickshop.manageOutOfStockPopup,
                    error: function () {
                        alert("Error AJAX !");
                        return false;
                    }
                });
                return false;
            },
            manageOutOfStockPopup: function (data) {
                $("#outofstockNotification_div").append($(data).filter("form").children());

                var _getStatusval = $('#quickshop_outofstock').attr('data-status');
                if (_getStatusval === 'close') {
                    $('#quickshop_outofstock').fadeIn(function () {
                        $('#quickshop_outofstock').attr('data-status', 'open');
                        $('#quickshop_outofstock').css('display', 'block');
                        $('#quickshop_outofstock').css('visibility', 'visible');
                    });

                } else if (_getStatusval === 'open') {
                    $('#quickshop_outofstock').fadeOut(function () {
                        $('#quickshop_outofstock').attr('data-status', 'close');
                        $('#quickshop_outofstock').css('display', 'none');
                        $('#quickshop_outofstock').css('visibility', 'visible');
                    });
                    $("#outofstockNotification_div").empty(); //fixig the issue BBBDK-16
                }


                $('#quickshop_outofstock .container').attr('data-height', $('#quickshop_outofstock .container').height());

                tbs.core.quickshop.resizeQuickshop();
                /*Added now*/
                if ($('#quickshop_outofstock INPUT[id$=notificationEmail]').length) {
                    $('#quickshop_outofstock INPUT[id$=notificationEmail]').attr('placeholder', $('#notificationEmailplacholder').val()).keyPressEnter("a[id='stockNotificationBtn']");
                }


                $("a[id='stockNotificationBtn']").click(function (e) { //click on the send button to hide
                    e.preventDefault();
                    tbs.core.quickshop.postOutOfStock();
                });
                /*Added now*/

                $('#quickshop_outofstock .btn.close').click(function (e) { //click on the close button to hide
                    e.preventDefault();
                    $('#quickshop_outofstock').fadeOut(function () {
                        $('#quickshop_outofstock').attr('data-status', 'close');
                    });
                    $("#outofstockNotification_div").empty(); //fixig the issue BBBDK-16
                });
                $('html').click(function (event) { //click on the overlay to hide
                    var _getStatus = $('#quickshop_outofstock').attr('data-status');
                    if ($(event.target).parents('#quickshop_outofstock').length == 0 && _getStatus === 'open') {
                        $('#quickshop_outofstock .btn.close').triggerHandler('click');
                    }
                });
                /* $('#quickshop_outofstock input').eq(1).click(function (e) { // temp code to open confirmation
                e.preventDefault();
                e.stopPropagation();
                $('#quickshop_outofstock .btn.close').triggerHandler('click');
                $('#quickshop_outofstock_confirmation').fadeIn();
                })*/
            },
            postOutOfStock: function () {

                var fieldIsValid = (!$("input[id*='notificationEmail']").val().match(/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/)) ? false : true;
                if (fieldIsValid) {
                    var url = "/ajax/outofStock_notification_popup.aspx?varcode=" + $("input#varcodeoos").val() + "&time=" + Math.round(Math.random() * 1000);
                    var dataForm = $("#outofstockNotification_div").serializeElement();
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: dataForm,
                        success: tbs.core.quickshop.postOutOfStockSuccess,
                        dataType: "html",
                        error: function () {
                            alert("Error AJAX !");
                            return false;
                        }
                    });
                } else {
                    $("#StockNotification_Email_Errormsg").css('display', 'block');
                    return false;
                }
                return false;
            },
            postOutOfStockSuccess: function (data) {
                var _getStatusval = $('#quickshop_outofstock').attr('data-status');
                if (_getStatusval === 'open') {
                    $('#quickshop_outofstock').fadeOut(function () {
                        $('#quickshop_outofstock').attr('data-status', 'close');
                        $('#quickshop_outofstock').css('display', 'none');
                        $('#quickshop_outofstock').css('visibility', 'visible');
                    });
                    $("#outofstockNotification_div").empty(); //fixig the issue BBBDK-16
                }
                tbs.core.quickshop.manageOutOfStockConfirmationPopup();
                $("input[id*='notificationEmail']").val("");
            },
            manageOutOfStockConfirmationPopup: function () {
                var _getStatusvalue = $('#quickshop_outofstock_confirmation').attr('data-status');
                if (_getStatusvalue === 'close') {
                    $('#quickshop_outofstock_confirmation').fadeIn(function () {
                        $('#quickshop_outofstock_confirmation').attr('data-status', 'open');
                        $('#quickshop_outofstock_confirmation').css('display', 'block');
                        $('#quickshop_outofstock_confirmation').css('visibility', 'visible');
                        $('#quickshop_outofstock_confirmation').css('height', $(document).height() + 'px');
                    });

                } else if (_getStatusvalue === 'open') {
                    $('#quickshop_outofstock_confirmation').fadeOut(function () {
                        $('#quickshop_outofstock_confirmation').attr('data-status', 'close');
                        $('#quickshop_outofstock_confirmation').css('display', 'none');
                        $('#quickshop_outofstock_confirmation').css('visibility', 'visible');
                    });

                }

                $('#quickshop_outofstock_confirmation .container').attr('data-height', $('#quickshop_outofstock_confirmation .container').height());

                tbs.core.quickshop.resizeQuickshop();
                $('#quickshop_outofstock_confirmation .btn.close').click(function (e) { //click on the close button to hide
                    e.preventDefault();
                    $('#quickshop_outofstock_confirmation').fadeOut(function () {
                        $('#quickshop_outofstock_confirmation').attr('data-status', 'close');
                    });
                });
                $('html').click(function (event) { //click on the overlay to hide
                    var _getStatus = $('#quickshop_outofstock_confirmation').attr('data-status');
                    if ($(event.target).parents('#quicksquickshop_outofstock_confirmationhop_outofstock').length == 0 && _getStatus === 'open') {
                        $('#quickshop_outofstock_confirmation .btn.close').triggerHandler('click');
                    }
                });
            },
            loadQuickshop: function (target) { /*This method is used for loading quickshop*/
                var fnQs = function (e) {
                    e.preventDefault();
                    var $this = $(this).blur();
                    var hrefValue = $this.attr("href");

                    tbs.core.quickshop.triggerQuickshop(hrefValue);
                }
                $(target).bind({ 'click': fnQs });
            },
            reloadQuickshop: function () { /*This method is used for reloading quickshop */
                var $this = $(this).blur();
                var hrefValue = $this.val();
                tbs.core.quickshop.triggerQuickshop(hrefValue);
            },
            triggerQuickshop: function (hrefValue) { /*This method is used for triggerQuickshop quickshop */

                var val = hrefValue.split("#");
                $.data($("INPUT[id$=save_state]").get(0), "quickshop", hrefValue);
                var catcode = val[1];
                var prdcode = val[2];
                //var url_quick = $.format("/ajax/quickshop.aspx?catcode={0}&prdcode={1}", catcode, prdcode);
                var url_quick = $.format(loc.url.quickshop, catcode, prdcode);
                $("#quickshop_pop_div").load(url_quick, tbs.core.quickshop.openQuickShop);
            },
            openQuickShop: function () {

                //Enabling the quick shop overlay data status value
                var _getStatus = $('#quickshop').attr('data-status');
                $('quickshop_pop_div').css('display', 'block');
                if (_getStatus === 'close') {
                    $('#quickshop').fadeIn(function () {
                        $('#quickshop').attr('data-status', 'open');
                        $('#quickshop').css('display', 'block');
                        $('#quickshop').css('visibility', 'visible');
                    });
                } else if (_getStatus === 'open') {
                    $('#quickshop').fadeIn(function () {
                        $('#quickshop').attr('data-status', 'close');
                        $('#quickshop').css('display', 'none');
                        $('#quickshop').css('visibility', 'visible');
                    });
                }

                //get height of quick shop container
                $('#quickshop .container').attr('data-height', $('#quickshop .container').height());

                //Initalising the varlist and checking and enabling for out of stock values
                $("#quickshop .shade-type-select option:first", this).attr("selected", "selected");
                var $varlistSelect = $("#quickshop .shade-type-select option:selected");
                tbs.core.quickshop.enableOutOfStock($varlistSelect);
                tbs.core.quickshop.getSelectedVariantCode();
                tbs.core.quickshop.setVariantprice($varlistSelect);

                $($('#quickshop .shade-selector .description .name')[0]).html($(this).find('#quickshop .shade-selector li a').attr('title'));
                $($('#quickshop .shade-selector .description .weight')[0]).html($(this).find('#quickshop .shade-selector li a').attr('data-weight'));

                tbs.core.quickshop.resizeQuickshop();
                $('#quickshop select').customStyle();

                // method trigger while clicking on shades
                $('.shade-selector li a').click(function (e) {
                    e.preventDefault();
                    var pathNewImg = $(this).attr('data-visual');
                    var newImgsrc = $('#quickshop .visual').attr("src").split('/');
                    var newImg = $.format(loc.packshot.shadesmedium, pathNewImg);
                    // var newImg = $.format("/images/product/Medium/{0}_m.jpg", pathNewImg); //TODO:Bring the img path from loc Localization
                    $('#quickshop .visual').attr("src", newImg);
                    $('#quickshop .shade-selector .customStyleSelectBoxInner').html($(this).attr('data-weight'));
                    $("#quickshop .shade-type-select option").removeAttr("selected", "selected");
                    $("#quickshop .shade-type-select option[value^=" + $(this).attr('data-visual') + "]").attr("selected", "selected");
                    var $selectValue = $("#quickshop .shade-type-select option:selected");
                    tbs.core.quickshop.getSelectedVariantCode();
                    tbs.core.quickshop.enableOutOfStock($selectValue);
                })

                $('.shade-selector li').bind({
                    'click': function (e) {
                        $(this).closest('ul').find('li').removeClass('active');
                        $(this).addClass('active');
                        $($('#quickshop .shade-selector .description .name')[0]).html($(this).find('a').attr('title'));
                        $($('#quickshop .shade-selector .description .weight')[0]).html($(this).find('a').attr('data-weight'));
                    }
                });

                //Method trigger while clicking on varlist combo
                $('#quickshop .shade-type-select').change(function () {
                    var $selected = $("#quickshop .shade-type-select option:selected");
                    var values = $selected.val().split("#");
                    var skuSelected = values[0];
                    tbs.core.quickshop.getSelectedVariantCode();
                    tbs.core.quickshop.setVariantprice($selected);
                    if ($("#quickshop .shade-selector li").length == 0) {
                        tbs.core.quickshop.enableOutOfStock($selected);
                    }
                    $("#quickshop .shade-selector li a").each(function (i, elt) {
                        if (skuSelected == $(elt).attr("data-visual")) {
                            $(elt).trigger('click');
                        }
                        return;
                    })
                });

                //click on the quick shop buy now to add to your bag
                $('#quickshop .btn.buy').click(function (e) {
                    e.preventDefault();
                    if (!RegExp("disabled").test($(this).attr('class'))) { // if enabled
                        // code to add to basket
                        tbs.core.quickshop.addToBag();

                    }
                });


                $('#quickshop .btn.buy').mouseenter(function (e) {
                    if (RegExp("disabled").test($(this).attr('class'))) { // if disabled, no hand cursor
                        $(this).css('cursor', 'default')
                    }
                });


                //click on the close button to hide
                $('#quickshop .btn.close').click(function (e) {
                    e.preventDefault();
                    $($('.shade-selector li')[0]).triggerHandler('click');
                    //$('.customStyleSelectBoxInner').html('1');
                    $('#quickshop').fadeOut(function () {
                        $('#quickshop').attr('data-status', 'close');
                    });
                });

                //click on the overlay to hide
                /*$('html').click(function (event) {
                var _getStatus = $('#quickshop').attr('data-status');
                if ($(event.target).parents('#quickshop').length == 0 && _getStatus === 'open') {
                $('#quickshop .btn.close').triggerHandler('click');
                }
                });*/



                //TODO: Need to bring the hardcoded URl from Localization.Code clean up need to be done for this method

                $('#quickshop .btn.wish').click(function (e) {
                    e.preventDefault();
                    tbs.core.quickshop.addToFavorite();

                });

                //Re-triggers add to wish list click
                if (tbs.core.quickshop.loadState) {
                    tbs.core.quickshop.loadState = false;
                    $('#quickshop .btn.wish').triggerHandler('click');
                }

                // OUT OF SOCK
                $('#quickshop .stock a').click(function (e) {
                    e.preventDefault();
                    $('#quickshop .btn.close').triggerHandler('click');
                    var stockhrefvalues = $('#quickshop .stock .backinstock_link').attr("href");
                    tbs.core.quickshop.triggerManageOutOfStock(stockhrefvalues);
                });

                return false;
            },
            enableOutOfStock: function (data) {
                var stock;
                var varValues;
                varValues = $(data).val().split("#");
                stock = parseInt(varValues[2]);
                if (stock <= tbs.loc.outOfStock) {
                    $("#addtobag").hide();
                    $("#addtobagdisabaled").show();
                    $("#out_of_stock").show();
                }
                else {
                    $("#addtobag").show();
                    $("#addtobagdisabaled").hide();
                    $("#out_of_stock").hide();
                }
            },
            setVariantprice: function (data) { //Change the price value which base on th variant selected in quick shop window
                var valuesArray;
                var price;
                var newprice;
                valuesArray = $(data).val().split("#");
                price = valuesArray[1];
                newprice = valuesArray[3];
                if (newprice == price) {
                    $('.price .old').html("");
                    $('.price .new').html(price);
                } else {
                    $('.price .old').html(price);
                    $('.price .new').html(newprice);
                }
            },
            getSelectedVariantCode: function () {
                var variantcode = $("#quickshop .shade-type-select option:selected").val().split("#")[0];

                $('#quickshop .stock a').attr("href", "#" + variantcode);
                return variantcode;
            },
            addToBag: function () {
                $(this).blur();
                var varcode = $("#quickshop .shade-type-select").val().split('#')[0];
                var qty = $("#qtylist").val();
                //agile one starts
                AgileOneAddToCart(varcode);
                // agile one ends
                var maxqty = $("#quickshop .shade-type-select").val().split('#')[10];

                $.ajax({
                    type: "POST",
                    url: "/ajax/addsingleproductcheck.aspx?varcode=" + varcode + "&qty=" + qty + "&maxqty=" + maxqty,
                    async: false,
                    success: function (dataProduct) {
                        if ($(dataProduct).attr('data') == "true") {
                            $("#limitqtyerror").hide();
                            tbs.core.quickshop.addtobagAfterLimitCheck();
                        }
                        else {
                            $("#limitqtyerror").show();
                            $("#limitqtyerror").addClass('messagekoerror');
                        }

                    }
                });


            },

            addtobagAfterLimitCheck: function () {
                $(this).blur();
                var varcode = $("#quickshop .shade-type-select").val().split('#')[0];
                var qty = $("#qtylist").val();
                //var url = $.format("/ajax/addsingleproduct.aspx?varcode={0}&qty={1}", varcode, qty);
                var url = $.format(loc.url.addtobag, varcode, qty);
                $("#addtobagresult").hide().load(url, tbs.core.quickshop.refreshBag);
                return false;
            },

            // Invoke basket from product page
            addToBasketProduct: function () {
                $(this).blur();
                var varcode = "";
                var maxqty = "";
                if ($(".product-size option").length > 0) {
                    varcode = $(".product-size option:selected").attr("value").split('#')[4];
                    maxqty = $(".product-size option:selected").attr("value").split('#')[7];
                } else if ($(".shade-type-select").length > 0) {
                    varcode = $(".shade-type-select option:selected").attr("value").split('#')[4];
                    maxqty = $(".shade-type-select option:selected").attr("value").split('#')[5];
                }
                //agile one starts
                AgileOneAddToCart(varcode);
                // agile one ends
                var qty = $(".product-quantity").val();
                $.ajax({
                    type: "POST",
                    url: "/ajax/addsingleproductcheck.aspx?varcode=" + varcode + "&qty=" + qty + "&maxqty=" + maxqty,
                    async: false,
                    success: function (dataProduct) {
                        if ($(dataProduct).attr('data') == "true") {
                            $("#limitqtyerror").hide();
                            tbs.core.quickshop.addProductAfterLimitCheck();
                        }
                        else {
                            $("#limitqtyerror").show();
                            $("#limitqtyerror").addClass('messagekoerror');
                        }

                    }
                });
            },
            addProductAfterLimitCheck: function () {
                $(this).blur();
                var varcode = "";
                if ($(".product-size option").length > 0) {
                    varcode = $(".product-size option:selected").attr("value").split('#')[4];
                } else if ($(".shade-type-select").length > 0) {
                    varcode = $(".shade-type-select option:selected").attr("value").split('#')[4];
                }

                var qty = $(".product-quantity").val();
                //var url = $.format("/ajax/addsingleproduct.aspx?varcode={0}&qty={1}", varcode, qty);
                var url = $.format(loc.url.addtobag, varcode, qty);
                $("#addtobagresult").hide().load(url, tbs.core.quickshop.refreshBag);
                return false;
            },
            refreshBag: function () {

                var $addtobagresult = $("#addtobagresult");
                if ($("#addtobagsuccess").length) {
                    $("#header_basket").load(loc.url.refreshbag, tbs.core.quickshop.afterRefreshBag);
                    //$("#header_basket").load("/ajax/refreshbag.aspx", tbs.core.quickshop.afterRefreshBag);
                } else {
                    $addtobagresult.show();
                }
            },
            afterRefreshBag: function () {

                $('#quickshop .btn.close').triggerHandler('click');
                $("BODY").scroll();
                $("#microbasket_div").load(loc.url.microbasket, tbs.core.microbasket.manageMicrobasket);
                //$("#microbasket_div").load("/ajax/microbasket.aspx", tbs.core.microbasket.manageMicrobasket);
            },
            resizeaddtofavorite: function () {

                var _getHeight = $('#add_to_wish_list .container').attr('data-height');
                var _getHeight_confirm = $('#add_to_favorite_confirmation .container').attr('data-height');
                var _setTop = 0, _setTop_conf = 0;
                if ($(window).height() > parseInt(_getHeight)) {
                    _setTop = $(window).height() - parseInt(_getHeight);
                    _setTop /= 2;
                    _setTop_conf = $(window).height() - parseInt(_getHeight_confirm);
                    _setTop_conf /= 2;
                }
                $('#add_to_wish_list .overlay').css('top', $(window).scrollTop() + _setTop);
                $('#add_to_favorite_confirmation .overlay').css('top', $(window).scrollTop() + _setTop_conf);
            },
            addToFavorite: function () { //Added for addto wish list functionality

                if (tbs.core.quickshop.Signed || Loreal.Customer.Signed) {

                    var $optionvalue = $(".shade-type-select option:selected");
                    var splitValue = $optionvalue.val().split("#");
                    var skuparameter = splitValue[0];
                    var urlparameter = $.format(loc.url.favorite, "add", skuparameter);
                    //var urlparameter = $.format("/ajax/favorite.aspx?action={0}&prdcode={1}", "add", skuparameter); //TODO: to bring the values from Localization
                    $("#favoriteresult").load(urlparameter, tbs.core.quickshop.refreshFavorite);
                }
                else {

                    var $state = $("INPUT[id$=save_state]");
                    if ($state.length) {
                        var state = $.data($("INPUT[id$=save_state]").get(0), "quickshop");
                        $("INPUT[id$=save_state]").val(state); //Save state
                    }
                    var loginPopOpened = false;
                    $('#login_popup_add_wish_list').attr('data-status', 'closed');

                    if (!loginPopOpened || $('#login_popup_add_wish_list').attr('data-status') == 'closed') {
                        loginPopOpened = true;
                        $('#login_popup_add_wish_list').attr('data-status', 'opened');
                        $('#login_popup_add_wish_list').css('display', 'block');
                        $('#login_popup_add_wish_list').css('visibility', 'visible');
                        //$('#login_popup_add_wish_list').show();
                    } else {
                        loginPopOpened = false;
                        $('#login_popup_add_wish_list').attr('data-status', 'closed');
                        $('#login_popup_add_wish_list').css('display', 'none');
                        $('#login_popup_add_wish_list').css('visibility', 'visible');
                        //$('#login_popup_add_wish_list').hide();

                    };

                    $('#login_popup_add_wish_list .btn.close').click(function (e) {
                        e.preventDefault();
                        $('#login_popup_add_wish_list').hide();
                        PopOpened = false;
                        $('#login_popup_add_wish_list').attr('data-status', 'closed');

                    });
                }
                return false;


            },

            refreshFavorite: function () { /*This method invokes add to wish list confirmation overlay and code clean up is pending */

                var $favoriteresult = $("#favoriteresult");
                if ($("#favoritesuccess").length) {
                    var _getStatusnew = $('#confirmation_popup_add_wish_list').attr('data-status');
                    if (_getStatusnew === 'closed') {
                        $('#confirmation_popup_add_wish_list').fadeIn(function () {
                            $('#confirmation_popup_add_wish_list').attr('data-status', 'open');
                            $('#confirmation_popup_add_wish_list').css('display', 'block');
                            $('#confirmation_popup_add_wish_list').css('visibility', 'visible');
                            $('#confirmation_popup_add_wish_list').show();
                        });
                    } else if (_getStatusnew == 'open') {
                        $('#confirmation_popup_add_wish_list').fadeIn(function () {
                            $('#confirmation_popup_add_wish_list').attr('data-status', 'close');
                            $('#confirmation_popup_add_wish_list').css('display', 'none');
                            $('#confirmation_popup_add_wish_list').css('visibility', 'visible');
                            $('#confirmation_popup_add_wish_list').hide();
                        });
                    }

                    /*This method triggers while clicking on the close button for the confirmation pop up of add to wish list*/
                    $('#confirmation_popup_add_wish_list .btn.close').click(function (e) {
                        e.preventDefault();
                        if ($("#successfavouritelogin").length) {
                            $(location).attr("href", $(location).attr("href"));
                        } else {
                            $('#confirmation_popup_add_wish_list').hide();
                            $('#confirmation_popup_add_wish_list').attr('data-status', 'closed');
                        }
                    });

                    /*This method triggers while clicking on the Fermer link in the body of the confirmation pop up of add to wish list*/
                    $('#confirmation_popup_add_wish_list #closefavorite a').click(function (e) {
                        e.preventDefault();
                        if ($("#successfavouritelogin").length) {
                            $(location).attr("href", $(location).attr("href"));
                        } else {
                            $('#confirmation_popup_add_wish_list').hide();
                            $('#confirmation_popup_add_wish_list').attr('data-status', 'closed');
                        }
                    });

                    tbs.core.quickshop.resizeaddtofavorite();
                }
                else {
                    $favoriteresult.show();
                }

            }
        },
        microbasket: {
            manageMicrobasket: function () {
                // e.preventDefault();

                var price;
                if ($('.prices .new').length > 0) {
                    price = $('.prices .new').html();
                }
                if ($('#quickshop .container table .price .new').length > 0) {
                    price = $('#quickshop .container table .price .new').html();
                }
                $('#microbasketPrice').html(price);

                var _getStatus = $('#microbasket').attr('data-status');

                if (_getStatus === 'close') {
                    $('#microbasket').fadeIn(function () {
                        $('#microbasket').attr('data-status', 'open');
                        $('#microbasket').css('display', 'block');
                        $('#microbasket').css('visibility', 'visible');
                    });
                    //$('body').css('overflow', 'hidden');
                } else if (_getStatus === 'open') {
                    $('#microbasket').fadeOut(function () {
                        $('#microbasket').attr('data-status', 'close');
                        $('#microbasket').css('display', 'block');
                        $('#microbasket').css('visibility', 'visible');
                    });
                    //$('body').css('overflow', 'auto');
                }

                this.resizeMicrobasket;
                //get height
                $('#microbasket .container').attr('data-height', $('#microbasket .container').height());



                // continue shopping
                $('#microbasket a.link.detail').click(function (e) { e.preventDefault(); $('#microbasket .btn.close').click(); })
                // call for recommendations to load
                tbs.core.recommendations('bag');


                //click on the close button to hide
                $('#microbasket .btn.close').click(function (e) {
                    e.preventDefault();
                    $($('.shade-selector li')[0]).triggerHandler('click');
                    $('#microbasket').fadeOut(function () {
                        $('#microbasket').attr('data-status', 'close');
                    });
                });


                //click on the overlay to hide
                $('html').click(function (event) {
                    var _getStatus = $('#microbasket').attr('data-status');
                    if ($(event.target).parents('#microbasket').length == 0 && _getStatus === 'open') {
                        $('#microbasket .btn.close').triggerHandler('click')
                    }
                });
            },
            resizeMicrobasket: function () {
                var _getHeight = $('#microbasket .container').attr('data-height'), _setTop = 0;
                if ($(window).height() > parseInt(_getHeight)) {
                    _setTop = $(window).height() - parseInt(_getHeight);
                    _setTop /= 2;
                }
                $('#microbasket .overlay').css('top', $(window).scrollTop() + _setTop);
            }
        },
        recommendations: function (pageDirective) { /* manage product recommendations for add to bag, basket, product pages */
            switch (pageDirective) {
                case 'bag':
                    /* loc.url.urlRecommendations =  http://tbssearchservice-emea-integration.cloudapp.net/v1/en-gb-test/recommendations/{0}?callback=? */
                    var url = $.format(loc.url.urlRecommendations, pageDirective);
                    if ($("#microbasket .content").attr("prdid") != undefined) {
                        $.getJSON(url, { products: $("#microbasket .content").attr("prdid").replace(/-/g, "_") }).done(function (data) { $("#contextual-product").html(data.html); });
                    }
                    //$.getJSON(url, { products: $("#microbasket .content").attr("prdid")}).done(function(data) { $("#contextual-product").html(data.html); });
                    break;
                case 'basket':
                    var basketProdCodes = $.map($("#basketyourbag .basketitem"), function (code) { return $(code).data('sku').replace(/-/g, "_") }).join(";"),
						url = $.format(loc.url.urlRecommendations, pageDirective);
                    $.getJSON(url, { products: basketProdCodes }).success(function (data) {
                        if (data.success && data.codes.length) {
                            $.get("/ajax/catalog/basket_recommendations.aspx?ids=" + data.codes.join(';')).done(function (e) {
                                $("#recommendations").html(e);
                                tbs.core.quickshop.loadQuickshop($('#recommendations .recommendations .addtobag .buy-prod'));
                                tbs.checkout.sliders.initSliderBasketRecommendations();
                                $(window).resize(function () { $(".recommendation-basket ul").css("left", "0"); tbs.checkout.sliders.initSliderBasketRecommendations(); });
                            }).done(function (e) {
                                var heights = $("#recommendations .recommendations .product-details .name").map(function () { return $(this).height(); }).get(),
									maxHeight = Math.max.apply(null, heights);
                                $("#recommendations .recommendations .product-details .name").height(maxHeight);
                            });
                        }
                    });
                    break;
                case 'product':
                    var url = $.format(loc.url.urlRecommendations, pageDirective);
                    $.getJSON(url, { products: $("#product-block .content").data("sku").replace(/-/g, "_") }).then(function (data) {
                        if (data.success && data.codes.length) {
                            $.get("/ajax/catalog/product_recommendations.aspx?ids=" + data.codes.join(';')).done(function (e) {
                                $("#top-content .gcol-R > div").prepend(e);
                                tbs.core.quickshop.loadQuickshop($('.wrapper .container .buyButton .addToBag> .button.shop'));
                            });
                        }
                    });
                    break;
            }

        },
        manageAdvertBlocks: function () { /* manage advertisings blocks display on resize */
            var viewportWidth = $(window).width(), advertDummy = $('.advert-dummy'), advertContent = $('.advert-list').html();
            if (viewportWidth <= 1000) {
                if (advertDummy.html() != '') { advertDummy.css('display', 'block'); } else { advertDummy.html(advertContent); }
            } else {
                if (advertDummy) { advertDummy.css('display', 'none'); }
            }
        },
        addNavOpened: false,
        manageAddNav: function () { /* MANAGE ADDITIONNAL NAV & its responsive behavior on PRODUCT & SUBCATEGORY pages */
            var nav = $('#additionnal-nav');
            var openedHeight = 45 + parseInt($('#additionnal-nav ul').css('height'));
            var viewportWidth = $(window).width();
            var widthStop;
            /*to detect ie version less than 8*/
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent;
                var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
            if (isChrome || rv <= 8.0) { widthStop = 1017; } else { widthStop = 1000; }
            if (viewportWidth < widthStop) {
                nav.css('height', 45).css('overflow', 'hidden');
                nav.die();
                if (!tbs.core.isTouchDevice() || isChrome) {
                    nav.live({
                        "mouseenter": function () { nav.animate({ 'height': openedHeight }, 300); },
                        "mouseleave": function () { nav.animate({ 'height': 45 }, 300); }
                    });
                } else {
                    nav.live({
                        "click": function () {
                            if (this.addNavOpened) {
                                //alert('opened');
                                nav.animate({ 'height': 45 }, 300);
                                this.addNavOpened = false;
                            } else {
                                //alert('closed');
                                nav.animate({ 'height': openedHeight }, 300);
                                this.addNavOpened = true;
                            }
                        }
                    });
                }
            } else {
                nav.css('height', 'auto').css('overflow', 'inherit');
                nav.die();
            }
        },
        manageLybInformationPopup: function () {
            $("#lyb-information").click(function (e) {
                e.preventDefault();
                $("#lyb-information_popup").show();
                $("#cardnumber").val("");
                $("#error-msg").css("display", "none");
                $("#lybcardinfo").css("display", "none");
                $("#error-msg-invalidcard").css("display", "none");
            });
        },
        fnManageLYBDetailsPopup: function () {
            $("#lyb-information_popup").on("click", "input[id$=lybdetails]", function () {
                var cardnumberval = $("#cardnumber").val();
                if (cardnumberval.trim() != "") {
                    $("#error-msg").css("display", "none");
                    $("#lybcardinfo").css("display", "none");
                    $("#error-msg-invalidcard").css("display", "none");
                    $.ajax({
                        type: "POST",
                        url: "/ajax/Lybdetails.aspx" + "?CardNumber=" + cardnumberval,
                        success: function (data) {
                            var response = $(data);
                            if (response != null) {
                                $("#expiry-date").text(response.find("div[id=expirydate]").text());
                                $("#balance").text(response.find("div[id=points-balance]").text());
                                $("#fourpoint").text(response.find("div[id=four-pt]").text());
                                $("#eightpoint").text(response.find("div[id=Eight-pt]").text());
                                if (response.find("div[id=IndexError]").length > 0) {
                                    $("#error-msg").css("display", "block");
                                }
                                else {
                                    $("#lybcardinfo").css("display", "block");
                                }
                            }
                        },
                        error: function (request, error) {
                            alert(request + "-" + error);
                        }
                    });
                }
                else {
                    $("#error-msg").css("display", "none");
                    $("#lybcardinfo").css("display", "none");
                    $("#error-msg-invalidcard").css("display", "block");
                }
            });
        },
        manageEmailUpdatesPopup: function () { /* MANAGE EMAIL UPDATES POPUP */
            var target = $('#email-updates_popup');
            var emailUpdatesBtn = $('#complementary-nav .email_inscr-03');
            $('#email-updates_popup').attr('data-status', 'closed');
            var emailUpdatesPopOpened = false;
            var emailUpdatesInput = $('#email_inscr-03');
            emailUpdatesBtn.click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (!emailUpdatesPopOpened || $('#email-updates_popup').attr('data-status') == 'closed') {
                    if (tbs.core.isMobile()) {
                        $('#client-manager .login').triggerHandler('click');
                    }
                    if ($('#login_popup').attr('data-status') == 'closed') {
                        $('#email-updates_popup').css('z-index', 20);
                    }
                    else {
                        $('#email-updates_popup').css('z-index', 21);
                    }
                    $('#email-updates_popup').attr('data-status', 'opened');
                    $('#email-updates_popup').css('top', '42px');
                    $('#email-updates_popup').css('right', '55px');
                    emailUpdatesPopOpened = true;
                    $('#login_popup').hide();
                    $('#login_popup').attr('data-status', 'closed');
                    target.show();
                } else {
                    $('#email-updates_popup').css('z-index', 20);
                    $('#email-updates_popup').attr('data-status', 'closed');
                    emailUpdatesPopOpened = false;
                    target.hide();
                    emailUpdatesInput.val("");
                }
                $('html').click(function (event) {
                    event.stopPropagation();
                    var _getStatus = $('#email-updates_popup').attr('data-status');
                    if ($(event.target).closest('#email-updates_popup').length == 0 && _getStatus === 'opened') {
                        $(emailUpdatesBtn).triggerHandler('click');

                        //The below code commented and added a new line to fix the issue to make the Email updates pop up text value as                        blank while closing the pop up
                        //$('#email_inscr-03').val("");
                        $('#email_update-01 .email_inscr03').val("").blur();

                        // Added to hide the error message while closing the pop up. The issue is once the error message shown for the 				                        first time, it retains the error message
                        $('#email_update-01 .error_msgerror').css('display', 'none');
                    }
                });
            });
            if ($("#email-updates_popup .error_msgerror").length) {

                $('#email-updates_popup').attr('data-status', 'opened');
                $('#email-updates_popup').css('display', 'block');
                $("#email-updates_popup").show();
            }
            $('#email-updates_popup .title a').click(function (e) {
                e.preventDefault();
                emailUpdatesPopOpened = false;
                target.hide();
                $('#email-updates_popup').attr('data-status', 'closed');

                //The below code commented and added a new line to fix the issue to make the Email updates pop up text value as blank                while closing the pop up
                //$('#email_inscr-03').val("");
                $('#email_update-01 .email_inscr03').val("").blur();

                // Added to hide the error message while closing the pop up. The issue is once the error message shown for the 				                first time, it retains the error message
                $('#email_update-01 .email_error_msg').css('display', 'none');
            });
        },
        manageEmailClickUpdatesPopup: function () { /* MANAGE EMAIL UPDATES POPUP */
            var target = $('#email-updates_popup');
            var emailUpdatesBtn = $('.emailUpdate #NL_Subscribe');
            $('#email-updates_popup').attr('data-status', 'closed');
            var emailUpdatesPopOpened = false;
            var emailUpdatesInput = $('#NL_Subscribe');
            emailUpdatesBtn.click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (!emailUpdatesPopOpened || $('#email-updates_popup').attr('data-status') == 'closed') {
                    if (tbs.core.isMobile()) {
                        $('#client-manager .login').triggerHandler('click');
                    }
                    if ($('#login_popup').attr('data-status') == 'closed') {
                        $('#email-updates_popup').css('z-index', 20);
                    }
                    else {
                        $('#email-updates_popup').css('z-index', 21);
                    }
                    $('#email-updates_popup').attr('data-status', 'opened');
                    $('#email-updates_popup').css('top', '515px');
                    $('#email-updates_popup').css('right', '620px');
                    emailUpdatesPopOpened = true;
                    $('#login_popup').hide();
                    $('#login_popup').attr('data-status', 'closed');
                    target.show();
                } else {
                    $('#email-updates_popup').css('z-index', 20);
                    $('#email-updates_popup').attr('data-status', 'closed');
                    emailUpdatesPopOpened = false;
                    target.hide();
                    emailUpdatesInput.val("");
                }
                $('html').click(function (event) {
                    event.stopPropagation();
                    var _getStatus = $('#email-updates_popup').attr('data-status');
                    if ($(event.target).closest('#email-updates_popup').length == 0 && _getStatus === 'opened') {
                        $(emailUpdatesBtn).triggerHandler('click');

                        //The below code commented and added a new line to fix the issue to make the Email updates pop up text value as                        blank while closing the pop up
                        //$('#email_inscr-03').val("");
                        $('#email_update-01 .email_inscr03').val("").blur();

                        // Added to hide the error message while closing the pop up. The issue is once the error message shown for the 				                        first time, it retains the error message
                        $('#email_update-01 .error_msgerror').css('display', 'none');
                    }
                });
            });
            if ($("#email-updates_popup .error_msgerror").length) {

                $('#email-updates_popup').attr('data-status', 'opened');
                $('#email-updates_popup').css('display', 'block');
                $("#email-updates_popup").show();
            }
            $('#email-updates_popup .title a').click(function (e) {
                e.preventDefault();
                emailUpdatesPopOpened = false;
                target.hide();
                $('#email-updates_popup').attr('data-status', 'closed');

                //The below code commented and added a new line to fix the issue to make the Email updates pop up text value as blank                while closing the pop up
                //$('#email_inscr-03').val("");
                $('#email_update-01 .email_inscr03').val("").blur();

                // Added to hide the error message while closing the pop up. The issue is once the error message shown for the 				                first time, it retains the error message
                $('#email_update-01 .email_error_msg').css('display', 'none');
            });
        },
        manageEmailUpdatesPopupAlignement: function () {
            var viewportHeight = parseInt($(window).height());
            var blocHeight = $('#email-updates_popup .container').attr('data-height');
            $('#email-updates_popup .overlay').css('height', viewportHeight);
            var marginAdjust = blocHeight / 2;
            $('#email-updates_popup .container').css('margin-top', -marginAdjust);
        },
        manageLoginPopup: function () { /* MANAGE LOGIN POPUP */
            var loginBtn = $('#client-manager .login');
            var loginPopOpened = false;
            $('#login_popup').attr('data-status', 'closed');
            var inputLogin = $('#account_login');
            var inputPwd = $('#account_pwd');

            loginBtn.click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (tbs.core.isMobile()) {

                    if (!loginPopOpened || $('#login_popup').attr('data-status') == 'closed') {
                        $('#email-updates_popup .title span').triggerHandler('click');
                        if ($('#email-updates_popup').attr('data-status') == 'closed') {
                            $('#login_popup').css('z-index', 20);
                        }
                        else {
                            $('#login_popup').css('z-index', 21);
                        }
                        loginPopOpened = true;
                        $('#login_popup').attr('data-status', 'opened');
                        $('#login_popup').show();
                        $('#email-updates_popup').attr('data-status', 'closed');
                        $('#email-updates_popup').hide();
                    } else {
                        $('#login_popup').css('z-index', 20);
                        loginPopOpened = false;
                        $('#login_popup').hide();
                        $('#login_popup').attr('data-status', 'closed');
                        inputLogin.val("");
                        inputPwd.val("");
                    };
                    $('html').click(function (event) {
                        event.stopPropagation();
                        var _getStatus = $('#login_popup').attr('data-status');

                        if ($(event.target).closest('#login_popup').length == 0 && _getStatus === 'opened') {
                            $('#login_popup .title span').triggerHandler('click');

                            // Added to hide the error message while closing the pop up. The issue is once the error message shown for the 				                        first time, it retains the error message
                            $('#login_popup .error_msgerror').css('display', 'none');

                            //The below code commented and added a new line to fix the issue to make the login pop up login and password                        value as blank while closing the pop up
                            $("#login_form INPUT[id$=login]").val("").blur();
                            $("#login_form INPUT[id$=password]").val("").blur();
                        }
                    });
                }
                else {
                    location.href = "/account/signin.aspx";
                }
            });
            $('#login_popup .title a').click(function (e) {
                e.preventDefault();
                $('#login_popup').hide();
                loginPopOpened = false;
                $('#login_popup').attr('data-status', 'closed');
                //inputLogin.val("");
                //inputPwd.val("");

                // Added to hide the error message while closing the pop up. The issue is once the error message shown for the 				                first time, it retains the error message
                $('#login_popup .error_msgerror').css('display', 'none');

                //The below code commented and added a new line to fix the issue to make the login pop up login and password                value as blank while closing the pop up
                $("#login_form INPUT[id$=login]").val("").blur();
                $("#login_form INPUT[id$=password]").val("").blur();
            });
            if ($("#login_popup .error_msgerror").length || $(location).attr("href").indexOf("ReturnUrl=") > 0 && $(location).attr("href").indexOf("bvauthenticateuser=") < 0) {//Don't redirect if it is bazaarvoice
                //$("#middle_div").load("/ajax/refreshIngredients.aspx"); //TODO:Added for testing to be removed once testing done//
                /*$("#footerdiv").load("/ajax/refreshfooter.aspx", function () {
                tbs.core.ManageRefresh();
                });*/
                if (tbs.core.isMobile()) { // Show popup for mobile users
                    if ($(location).attr("href").indexOf("account/members/index.aspx") <= 0) {
                        $('#login_popup').attr('data-status', 'opened');
                        $('#banner #login_popup').css('display', 'block');
                        $("#login_popup").show();
                    }
                }
                else {
                    location.href = loc.url.urlLoginPageNew;
                }
            }
        },
        managePlaceholder: function () { /* PLACEHOLDER FALLBACK FOR NON COMPATIBLE BROWSERS  */
            if (!Modernizr.input.placeholder) {
                $("input").each(function () {
                    if ($(this).val() == "" && $(this).attr("placeholder") != "") {
                        $(this).val($(this).attr("placeholder"));
                        $(this).focus(function () {
                            if ($(this).val() == $(this).attr("placeholder")) { $(this).val(""); }
                        });
                        $(this).click(function () {
                            if ($(this).val() == $(this).attr("placeholder")) { $(this).val(""); }
                        });
                        $(this).blur(function () {
                            if ($(this).val() == "") { $(this).val($(this).attr("placeholder")); }
                        });
                    }
                });
            }
        },
        manageWebkitPlaceholder: function () {
            if ($.browser.webkit) {
                $('input, textarea').on('focus', function () {
                    if ($(this).attr('placeholder')) $(this).data('placeholder', $(this).attr('placeholder')).removeAttr('placeholder');
                }).on('blur', function () {
                    if ($(this).data('placeholder')) $(this).attr('placeholder', $(this).data('placeholder')).removeData('placeholder');
                });
            }
        },
        manageStaticNavListPlaceholder: function () {
            CustomerSigned ? $("#email_inscr-03").hide() : $("#email_inscr-03").show();
        },
        manageMyBagLink: function () {
            $("#header_basket,#microbasket_div").on('click', "a.content,.wish,.buy", function (e) {
                e.preventDefault();
                if (tbs.core.isMobile()) {
                    location.href = loc.url.urlBasketCheckout;
                }
                else {
                    location.href = loc.basket.locbasketpagepath;
                }
            });
        },
        searchHeader: function () {

            var code = encodeURIComponent($("#header_input_searchtext").val().replace(/&/gi, ""));
            var url;
            var placeHolderValue = $("#header_input_searchtext").attr("placeholder");
            if (code.length > 0 && code != "" && code != 'undefined' && (placeHolderValue != code)) {
                url = $.format(loc.url.search, loc.url.searchtargeturl, code);
            } else {
                url = location.href;
            }
            $(location).attr("href", url); //Redirect to search page
            return false;
            /*
            var code = encodeURIComponent($("#header_input_searchtext").val().replace(/&/gi, ""));
            searchpage = "/services/search.aspx";
            var url = $.format(loc.url.search, searchpage, code);
            $(location).attr("href", url); //Redirect to search page
            return false;*/

        },
        /*Added for Defaulting Country in Combo Box based on the market*/
        selectedlang: function () {
            var langflag = $('html').attr('countrycode');
            if (langflag != "" && langflag != 'undefined') {
                $('#lang-choice option').each(function (index) {
                    if (langflag == $(this).attr('class')) {
                        $('#lang-choice').children('option:eq(' + index + ')').attr('selected', 'selected');
                    }
                });
            }
        },
        storeLocator: function () {
            //$('#loc-search').click(function (e) {
            var address = $("#loc-address").val();
            var city = $("#loc-city").val();
            var postcode = $("#loc-postcode").val();
            var country = $("#loc-country option:selected").val();
            address = encodeURIComponent($.format("{0} {1} {2}, {3}", address, city, postcode, country));
            var url = $.format("/services/storelocator-result.aspx?address={0}", address);
            $(location).attr("href", url);
            return false;
            //})
        },
        heightCalc: function () {
            $('#maincontent .advert-list ul li').each(function () {
                $(this).find('aside').css('height', $(this).find('img').height());
            });
            var leftHandNavHeight = $('#additionnal-nav').height() + 20 + $('#maincontent .advert-list').height();
            $('#maincontent').css('min-height', leftHandNavHeight + 'px');
        },
        /*Suggest Search functionality*/
        suggestSearch: function () {
            $("#header_input_searchtext").autocomplete({
                //source: availableTags
                source: function (request, response) {
                    $.ajax({
                        url: loc.url.suggestSearchService + request.term,
                        dataType: "jsonp",
                        data: {
                            featureClass: "P",
                            style: "full",
                            maxRows: 12,
                            name_startsWith: request.term
                        },
                        success: function (data) {
                            var parsed = [], i, j, searchterm, row, group, groupsuggestion;
                            //console.log("Inside success method", ">>>>", data.suggestionGroups.length);
                            for (i = 0; i < data.suggestionGroups.length; i++) {
                                group = data.suggestionGroups[i];
                                //  console.log("Inside success method group", i, ">>>>", group.length);
                                groupsuggestion = group.suggestions;
                                //console.log("Inside success method groupsuggestion", i, ">>>>", groupsuggestion);
                                if (group.indexName == "1keywords") {
                                    //  console.log("Inside success method indexName", i, ">>>>");
                                    response($.map(groupsuggestion, function (item) {
                                        //    console.log("Inside success method map", item, ">>>>");
                                        return {
                                            label: item.searchterm,
                                            value: item.searchterm
                                        }
                                    }));
                                }
                            }
                            $('.ui-autocomplete').css('z-index', '100');
                            $('.ui-autocomplete li').each(function () {
                                var code = encodeURIComponent($("#header_input_searchtext").val().replace(/&/gi, ""));
                                /*var text = $(this).find('a').text().split('(')[0],
                                qnty = $(this).find('a').text().replace(/[^0-9]+/ig, "");
                                $(this).find('a').text(text).append('<span>(' + qnty + ')</span>');*/
                                $(this).find('a').attr('href', $.format(loc.url.search, loc.url.searchtargeturl, code));
                            });
                            $('.ui-autocomplete li').bind("click", function () {
                                $(this).find('a').attr('href', $.format(loc.url.search, loc.url.searchtargeturl, $(this).find('a').text()));
                            });
                        }
                    });
                },
                minLength: 2,
                select: function (event, ui) {
                    $("#header_input_searchtext").val(ui.item.value);
                    $(this).find('a').attr('href', $.format(loc.url.search, loc.url.searchtargeturl, $(this).find('a').text()));
                    $('#launch_search').trigger('click'); /*Search functionality*/
                }
            });
        },
        /*End of Suggest Search functionality*/
		
		/* Landing page OOS functionality */
		fnCheckProdOutOfStock: function (addtobagId, outofstockId) {
		   var prodcode = $(addtobagId).attr("data-prodcode");
		   $.ajax({
                        url: "/ajax/catalog/prices.aspx" +
							"?ids=" +
							 prodcode,
                        dataType: "json"
						
                     }).done( function (data) {
						
						$.each(data, function() {
							$.each(this, function(key, value) {
								//console.log("outside all" + key + "=" + value);
							 if ((key == "in_stock") && (value == true)) {
								//console.log("inside if" + key + "=" + value);
								$(addtobagId).css("display","block");
								$(outofstockId).css("display","none");
							 }
							 else if ((key == "in_stock") && (value == false)) {
								//console.log("inside else" + key + "=" + value);
								$(addtobagId).css("display","none");
								$(outofstockId).css("display","block");
							 }
							});
						});
						
						
						
						
					});
		},
		
		fnTriggerOOSLandingPage: function() {
			$(".outofstockproduct").click(function(e)  {
                var prodcode = $(this).attr("data-prodcode");
				tbs.core.quickshop.triggerManageOutOfStock("#" + prodcode);
            });
		},
		
        //*** CHAT SECTION FUNCTIONS START ***//
        fnManageChatSection: function () {
            var departments = 0;
            $.ajax({
                url: loc.url.chatStatus,
                dataType: 'jsonp',
                async: false,
                method: 'post',
                data: { module: 'US_Chat', jsonp: '' },
                cache: false,
                jsonp: true,
                success: function (data) {
                    var departments = false;
                    $.each(data, function (index, info) {
                        if (info.status.open && (info.status.open == true || info.status.open == "true")) { departments = true }
                    });
                    if (departments) {
                        $("#chat-link").show();
                        $("#email-link").hide();
                    } else {
                        $("#chat-link").hide();
                        $("#email-link").show();
                    }
                },
                error: function () { console.log("fnManageChatSection - Error"); }
            });
            try {
                $("#chat-link").on('click', "a", function (e) {
                    e.preventDefault();
                    var options = { id: 'chat-link', height: '600', width: '400', url: loc.url.chatApp, modules: 'US_Chat' }
                    var popup = window.open(options.url, 'chat', "screenX=10,screenY=10,left=10,top=10,width=" + options.width + ",height=" + options.height + ",resizable,scrollbars");
                    popup.focus();
                    return false;
                });
            } catch (ExChat) { }
        },
        //*** CHAT SECTION FUNCTIONS END ***//




        onReady: function () {
            tbs.core.manageMainMegaMenuDisplay({ delay: 250 });
            tbs.core.manageMainNavDisplay({ delay: 250 });

            tbs.popup.ManageTermsPopup(); /* Manage Terms Popup */

            $('#login_popup').hide(); /* HIDE LOGIN POPUP */
            $('#email-updates_popup').hide(); /* HIDE LOGIN POPUP */


            if ($('#wrappermail INPUT[id$=email]').length) {
                $('#wrappermail INPUT[id$=email]').attr('placeholder', $('#plcholdr').val()).keyPressEnter("INPUT[id$=submitNL]");

            }
            $('#wrappermail INPUT[id$=email]').focus(function () {
                if ($(this).val() == $(this).attr("placeholder")) {
                    $(this).val("");
                }
            }).blur(function () {
                if ($(this).val() == "") {
                    $(this).val($(this).attr("placeholder"));
                }
            });

            if ($('#footer_mail INPUT[id$=email]').length) {
                $('#footer_mail INPUT[id$=email]').attr('placeholder', $('#fplcholdr').val());
                $('#footer_mail INPUT[id$=email]').keyPressEnter("INPUT[id$=submit_newsletter_FT]");

            }
            $('#footer_mail INPUT[id$=email]').focus(function () {
                if ($(this).val() == $(this).attr("placeholder")) {
                    $(this).val("");
                }
            }).blur(function () {
                if ($(this).val() == "") {
                    $(this).val($(this).attr("placeholder"));
                }
            });
            $('#lyb-information_popup .btn.close').click(function (e) {

                $("#lyb-information_popup").hide();
            });
            if ($('#email_update-01 INPUT[id$=email]').length) {
                $('#email_update-01 INPUT[id$=email]').attr('placeholder', $('#hplcholdr').val());
                $('#email_update-01 INPUT[id$=email]').keyPressEnter("INPUT[id$=submitEmailUpdatesPopup]");

            }
            $('#email_update-01 INPUT[id$=email]').focus(function () {
                if ($(this).val() == $(this).attr("placeholder")) {
                    $(this).val("");
                }
            }).blur(function () {
                if ($(this).val() == "") {
                    $(this).val($(this).attr("placeholder"));
                }
            });
            if ($('#login_form INPUT[id$=login]').length) {
                $('#login_form INPUT[id$=login]').attr('placeholder', $('#loginplcholdr').val());
                $('#login_form INPUT[id$=login]').keyPressEnter("INPUT[id$=login_submit]");
            }
            if ($("#login_form INPUT[id$=password]").length) {
                $("#login_form INPUT[id$=password]")
				.keyPressEnter("INPUT[id$=login_submit]");
            }
            if ($("#login_form01 INPUT[id$=login]").length) {
                //Added for keypressenter for login favourite
                $("#login_form01 INPUT[id$=login]").attr('placeholder', $('#loginplcholdr').val());
                $("#login_form01 INPUT[id$=login]").keyPressEnter("INPUT[id$=submitpopupLoginbutton]");
                $("#login_form01 INPUT[id$=password]").keyPressEnter("INPUT[id$=submitpopupLoginbutton]");
            }

            /* var title1 = $('#hsignouttitle').val(); */ //old code //Value to be changed//
            $('A[id$=_LogoutSubmit]')
				.attr('title', $('#hsignouttitle').val());

            $('#launch_search').click(tbs.core.searchHeader); /*Search functionality*/
            if ($("#search_text INPUT[id$=header_input_searchtext]").length) {
                $("#search_text INPUT[id$=header_input_searchtext]").keyPressEnter("INPUT[id$=launch_search]");
            }

            try {
                $("#mainnav").on("click", "map[name^=MegaMenuPromoBannerMap]", function (e) {
                    var promoCode = $("#mainnav").find("#AdobeMegamenuBannerCode").text();
                    setAdobeCampaignCodeValue(promoCode);
                });
            } catch (ex) { }


            /*added for Special Characters implementation*/
            $("#search_text INPUT[id$=header_input_searchtext]").keypress(function (event) {
                return disallowedCharacters(event);
            });
            tbs.core.manageLybInformationPopup();
            tbs.core.manageEmailUpdatesPopup(); /* MANAGE EMAIL UPDATES POPUP */
            tbs.core.manageEmailClickUpdatesPopup();
            tbs.core.manageLoginPopup(); /* MANAGE LOGIN POPUP */
            tbs.core.managePlaceholder(); /* MANAGE PLACEHOLDER FOR NON COMPATIBLE BROWSERS */
            tbs.core.manageWebkitPlaceholder();
            tbs.core.selectedlang(); /*ADDED FOR DEFAULTING COUNTRY IN THE COMBO*/
            tbs.core.manageStaticNavListPlaceholder();
            tbs.core.manageMyBagLink(); /* MANAGE HEADER SECTION -> CLIENT MANAGER -> MY BAG LINK CLICK */
            tbs.core.fnManageLYBDetailsPopup();
			$(".AddToCart").each(function() {

				tbs.core.fnCheckProdOutOfStock( "#"+$(".AddToCart a[id^='addtobagLP_']").attr("id"),"#"+$(".AddToCart a[id^='addtobagLPOOS_']").attr("id"));/* Added for landing page */
			});
			tbs.core.fnTriggerOOSLandingPage();
					
            $(window).resize(function () {
                tbs.core.manageMainNavDisplay({ delay: 500 });
                tbs.core.manageMainMegaMenuDisplay({ delay: 500 });
            });

            /*
            * Added for addto wish list functionlity.Open QuickShop if login success
            */
            if ($("#successfavouritelogin").length) {
                tbs.core.quickshop.Signed = true;
                var $state = $("INPUT[id$=save_state]");
                if ($state.length) {
                    tbs.core.quickshop.loadState = true;
                    tbs.core.quickshop.reloadQuickshop.apply($state.get(0));
                }
            }

            /*
            * Added for addto wish list functionlity. Open QuickShop if login error.
            */
            if ($("#login_popup_add_wish_list .error_msgerror").length) {
                var $state = $("INPUT[id$=save_state]");
                if ($state.length) {

                    tbs.core.quickshop.loadState = true;
                    tbs.core.quickshop.reloadQuickshop.apply($state.get(0));
                }
            }

            if ($('#lang-choice').length) {
                $('#lang-choice')
				.customStyle()
				.change(function (event) {
				    window.location.href = $(this).val();
				});
            }
            /* to handle LYB Outofstock */
            $(".outofstockbuttonLYB").click(function () {
                console.log("clicked");
                tbs.core.quickshop.triggerManageOutOfStock($(this).attr("data-attr"));
            });
            if ($(location).attr("href").indexOf("storelocator-search") > 0) {
                $("#loc-search").click(tbs.core.storeLocator);
                //$("DIV.margin_bloc INPUT").keyPressEnter("#loc-search");
                $("#loc-search INPUT").keyPressEnter("A[id$=loc-search]");

                $("INPUT[id$=loc-address]").keyPressEnter("A[id$=loc-search]");
                $("INPUT[id$=loc-city]").keyPressEnter("A[id$=loc-search]");
                $("INPUT[id$=loc-postcode]").keyPressEnter("A[id$=loc-search]");
                $("INPUT[id$=loc-country]").keyPressEnter("A[id$=loc-search]");
            }
            //My Account section new address book disable for mobile users
            if ($(this).find("#hidIsNewCheckout").length) {
                if (tbs.core.isMobile()) { //Mobile device dont show new my account pages.
                    $("#additionnal-left-nav-staticpage").find("a[href*='address']").attr("href", "address-book.aspx");
                }
                //                else { //For partial roll-out (like 10%, 20%, etc... 100%)
                //                    if (($(this).find("#hidIsNewCheckoutLYB").val() == "YES") || (loc.config.wcConfigCookiePercent == 100)) {
                //                        $("#additionnal-left-nav-staticpage").find("a[href*='address']").attr("href", "myaddressbook.aspx");
                //                    }
                //                    else { //Old address book
                //                        $("#additionnal-left-nav-staticpage").find("a[href*='address']").attr("href", "address-book.aspx");
                //                    }
                //                }
            }

            //LYB card URL for Old basket page
            if ($(this).find("#lyblearnmorelayout").length) {
                $("#lyblearnmorelayout .margin20_T .btn_add_to_cart a").attr("href", $("#lyblearnmorelayout .margin20_T .btn_add_to_cart a").attr("href") + "&IsMobile=1");
            }

            tbs.core.suggestSearch(); // Suggest Search Code
            tbs.core.fnManageChatSection(); // EMAIL OR CHAT LINK for Need help section in CHECKOUT & My Account Section

        },
        onLoad: function () {
            tbs.core.manageMainMegaMenuDisplay();  /* MANAGE MAINNAV DISPLAY */
            tbs.core.manageMainNavDisplay(); /* MANAGE MAINNAV DISPLAY */
            tbs.core.heightCalc(); /* MANAGE SUB-CAT AD HEIGHT */



        }
    } //core
};

$(tbs.core.onReady);
/*added for Special Characters implementation*/
function disallowedCharacters(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 33 || charCode == 35 || charCode == 36 || charCode == 37 || charCode == 38 || charCode == 40 || charCode == 41 || charCode == 42 || charCode == 64 || charCode == 94 || charCode == 96 || charCode == 126 || charCode == 39 || charCode == 34 || charCode == 63)
        return false;

    return true;
}
$(window).load(tbs.core.onLoad);
