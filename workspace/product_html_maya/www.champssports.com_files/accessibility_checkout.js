//checkout tabindex

if ($('#checkout_page').length > 0) {
    //login
    $(document).ready(function () {
        $('#checkout_page #checkout_top #checkoutTopRight img').attr('alt', 'Live Chat');
        $('#checkout_page #checkout_top #checkoutTopLeft').attr('tabindex', 550);

        $('#checkout_page #checkout_middle #loginPane_edit td.info_text').each(function (i, v) {
            $(v).contents().wrap('<span class="tabAssist" />')
        });

        setTimeout(function () {
            $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                $(v).contents().wrap('<span class="tabAssist" />')
            });

            $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);
        }, 1000);

        $('#checkout_page #checkoutHelpContainer table tbody tr td table tbody tr td').each(function (i, v) {
            $(v).contents().wrap('<span class="tabAssist" />')
        });

        $('#checkout_page #checkoutHelpContainer table tbody tr td table tbody tr:nth-child(2) td:nth-child(2)').prepend('<a class="screenreader">Contact phone numbers</a>');

        $('#checkout_page #checkoutHelpContainer strong').attr('tabindex', 8999);
        $('#checkout_page #checkoutHelpContainer span').attr('tabindex', 8999);
        $('#checkout_page #checkoutHelpContainer a').attr('tabindex', 8999);
        $('#checkout_page #checkoutHelpContainer table tbody tr td table tbody tr td img').parent('span').attr('tabindex', -1);
        $('#checkout_page #checkoutHelpContainer table tbody tr td table tbody tr td a').parent('span').attr('tabindex', -1);

        $('#checkout_page #checkoutHelpContainer tr td img').attr('tabindex', -1);


        $('#checkout_page #checkout_container #checkout_top a').attr('tabindex', 550);
        $('#checkout_page #checkout_middle #loginPane_edit h3').attr('tabindex', 550);
        $('#checkout_page #checkout_middle #loginPane_edit span').attr('tabindex', 550);
        $('#checkout_page #checkout_middle #loginPane_edit input').attr('tabindex', 550);
        $('#checkout_page #checkout_middle #loginPane_edit a').attr('tabindex', 550);
        $('#checkout_page #checkout_middle #loginPane_edit button').attr('tabindex', 550);

        $('#checkout_page #order_summary_container img').attr('tabindex', 8000);
        $('#checkout_page #order_summary_container p').attr('tabindex', 8000);
        $('#checkout_page #order_summary_container span').attr('tabindex', 8000);
        $('#checkout_page #order_summary_container a').attr('tabindex', 8000);
        $('#checkout_page #order_summary_container .info_icon').attr('tabindex', 8000);
        $('#checkout_page #order_summary_container .orderSummary_deliverySpeed').attr('tabindex', 8000);

        $('#checkout_page a#loginPaneLogin').attr('href', 'javascript:void(0);');
        $('#checkout_page #checkout_middle #loginPane_edit #loginPaneLoginError:empty').attr('tabindex', '');
        $('#checkout_page #checkout_middle #loginPane_edit #loginPaneLoginError:empty').parent('span').attr('tabindex', '');
        $('#checkout_page #order_summary_container .orderSummary_storePickup .orderSummary_deliverySpeed').attr('tabindex', -1);

        $('#checkout_page p span').attr('tabindex', -1);
        $('#checkout_page span span').attr('tabindex', -1);
        $('#checkout_page p.egc_email span').attr('tabindex', 8000);
        $('#checkout_page div.orderSummary_deliveryMethod span span.red').attr('tabindex', 8000);
    });
    //pane 1

    $(document).ready(function () {

        $('#checkout_page #checkout_middle #billAddressPane_edit .edit_pane_header_right td.info_text:last').each(function (i, v) {
            $(v).contents().wrap('<span class="tabAssist" />')
        });

        $('#checkout_page #checkout_middle #billAddressPane_edit .paneEditForm td.hint_text').each(function (i, v) {
            $(v).contents().wrap('<span class="tabAssist" />')
        });

        $('#checkout_page #checkout_middle #billAddressPane_edit a').attr('tabindex', 600);
        $('#checkout_page #checkout_middle #billAddressPane_edit h2').attr('tabindex', 600);
        $('#checkout_page #checkout_middle #billAddressPane_edit span').attr('tabindex', 600);
        $('#checkout_page #checkout_middle #billAddressPane_edit br').parent('span').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #billAddressPane_edit input').attr('tabindex', 600);
        $('#checkout_page #checkout_middle #billAddressPane_edit button').attr('tabindex', 600);
        $('#checkout_page #checkout_middle #billAddressPane_edit select').attr('tabindex', 600);
        $('#checkout_page #checkout_middle #billAddressPane_edit option').attr('tabindex', 600);
        $('#checkout_page #checkout_middle #billAddressPane_edit .textlink').attr('tabindex', 600);
        $('#checkout_page #checkout_middle #billAddressPane_edit .info_text').attr('tabindex', 600);
        $('#checkout_page #checkout_middle #billAddressPane_edit .hint_text').attr('tabindex', 600);
        $('#checkout_page #checkout_middle #billAddressPane_edit .edit_pane_header_left').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #billAddressPane_edit .edit_pane_header_right').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #billAddressPane_edit .edit_pane_header_right td.info_text').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #billAddressPane_edit .paneEditForm td.hint_text').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #billAddressPane_edit #billUpdateAccountOption span#billUpdateLabel').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #billAddressPane_edit .edit_pane_header_right td.info_text.billAddressType').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #billAddressPane_edit .paneEditForm span.error_message:empty').attr('tabindex', '');

        $('#checkout_page #checkout_middle #billPaneContinue').on('click', function () {
            $('#checkout_page #checkout_middle #billAddressPane_edit .paneEditForm span.error_message').attr('tabindex', 600);
            $('#checkout_page #checkout_middle #billAddressPane_edit .paneEditForm span.error_message:empty').attr('tabindex', '');
            setTimeout(function () {
                $('#billAddressPane_view #billAddrViewPaneData.info_text').attr('tabindex', -1);
                $('#billAddressPane_view #billAddrViewPaneData h2').attr('tabindex', 600);
                $('#billAddressPane_view #billAddrViewPaneData button').attr('tabindex', 600);
                if ($('#billAddressPane_view #billAddrViewPaneData span.tabAssist').length <= 0) {
                    $('#billAddressPane_view #billAddrViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#billAddressPane_view #billAddrViewPaneData span').attr('tabindex', 600);
                    $('#billAddressPane_view #billAddrViewPaneData br').parent('span').attr('tabindex', -1);
                }
                $('#billAddressPane_view #billAddrViewPaneData button span').attr('tabindex', -1);

                $('#shipAddressStorePickupInfoContainer div').attr('tabindex', 700);
                $('#shipAddressPane_view #shipAddressStorePickupInfoContainer div').attr('tabindex', 700);

                $('#shipAddressPane_edit #shipPaneBillingAddress').each(function (i, v) {
                    $(v).contents().wrap('<span class="tabAssist" />')
                });

                $('#shipAddressPane_edit #shipPaneShippingAddress').each(function (i, v) {
                    $(v).contents().wrap('<span class="tabAssist" />')
                });
                $('#shipAddressPane_edit span').attr('tabindex', 700);
                $('#shipAddressPane_edit br').parent('span').attr('tabindex', -1);

                $('#checkout_page #checkout_middle #shipMethodPane_edit #shipMethodContainerS2S').find('input').attr('tabindex', 800);
                $('#checkout_page #checkout_middle #shipMethodPane_edit h4').attr('tabindex', 800);
                $('#checkout_page #checkout_middle #shipMethodPane_edit label[for="shipMethod"]').attr('tabindex', 800);
                $('#checkout_page #checkout_middle #shipMethodPane_edit label[for="shipMethod"] a').attr('tabindex', 800);

                $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                    $(v).contents().wrap('<span class="tabAssist" />')
                });
                $('#shipAddressPane_edit #shipToMultipleAddress span.hint_text').attr('tabindex', -1);
                $('#shipAddressPane_edit #shipPaneBillingAddress').attr('tabindex', -1);
                $('#shipAddressPane_edit #shipPaneShippingAddress').attr('tabindex', -1);
                $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);

            }, 3000);
        });

        $('#billAddressPane_view button').on('click', function () {
            setTimeout(function () {
                if ($('#billAddressPane_edit #billPaneBillingAddress span.tabAssist').length <= 0) {
                    $('#billAddressPane_edit #billPaneBillingAddress').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#billAddressPane_edit span').attr('tabindex', 600);
                    $('#billAddressPane_edit br').parent('span').attr('tabindex', -1);
                    $('#billAddressPane_edit .billAddressType').attr('tabindex', -1);
                    $('#billAddressPane_edit #billPaneBillingAddress').attr('tabindex', -1);
                    $('#billAddressPane_edit button span').attr('tabindex', -1);
                    $('#billAddressPane_edit span.error_message:empty').attr('tabindex', -1);
                    $('#billAddressPane_edit span#billUpdateLabel').attr('tabindex', '');
                }
            }, 1000);
        });

        $('#billAddressPane_edit #billPaneBillToDiffAddress').on('focus', function () {
            setTimeout(function () {
                $('select#billOtherAddress').attr('tabindex', 600);
                $('select#billOtherAddress option').attr('tabindex', 600);
            }, 500);
        });

        $('#billAddressPane_edit #billPaneBillToBillAddress').on('focus', function () {
            setTimeout(function () {
                if ($('span#billPaneBillingAddress.info_text span.tabAssist').length <= 0) {
                    $('#billAddressPane_edit #billPaneBillingAddress').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#billAddressPane_edit span').attr('tabindex', 600);
                    $('#billAddressPane_edit br').parent('span').attr('tabindex', -1);
                    $('#billAddressPane_edit #billPaneBillingAddress').attr('tabindex', -1);
                }
            }, 500);
        });
    });
    //pane 2
    $(document).ready(function () {

        $('#checkout_page #checkout_middle #shipAddressPane_edit #shipPaneShippingAddress.info_text').each(function (i, v) {
            $(v).contents().wrap('<span class="tabAssist" />')
        });
        $('#checkout_page #checkout_middle #shipAddressPane_edit #shipPaneShippingAddress.info_text span').attr('tabindex', 700);
        $('#checkout_page #checkout_middle #shipAddressPane_edit a').attr('tabindex', 700);
        $('#checkout_page #checkout_middle #shipAddressPane_edit h2').attr('tabindex', 700);
        $('#checkout_page #checkout_middle #shipAddressPane_edit input').attr('tabindex', 700);
        $('#checkout_page #checkout_middle #shipAddressPane_edit button').attr('tabindex', 700);
        $('#checkout_page #checkout_middle #shipAddressPane_edit select').attr('tabindex', 700);
        $('#checkout_page #checkout_middle #shipAddressPane_edit option').attr('tabindex', 700);
        $('#checkout_page #checkout_middle #shipAddressPane_edit span.form_title').attr('tabindex', 700);
        $('#checkout_page #checkout_middle #shipAddressPane_edit a.hint_text').attr('tabindex', 700);
        $('#checkout_page #checkout_middle #shipAddressPane_edit .info_text').attr('tabindex', 700);

        // Handles the Address Verification Overlay
        $('#checkout_page #checkout_middle #shipAddressPane_edit button#shipPaneContinue').on('click', function () {
            setTimeout(function () {
                $('#avOverlay a').attr('tabindex', 701);
                $('#avOverlay #avTitle').attr('tabindex', 701);
                $('#avOverlay .avBoxTitle').attr('tabindex', 701);
                $('#addressVerification_panel').find('div').eq(1).attr('tabindex', 701);
                $('#avOverlay #avBoxLeft #addressContainer').attr('tabindex', 701);
                $('#avOverlay #avBoxRight #addressContainer').attr('tabindex', 701);
                $('#avOverlay a[title="Close Window"]').attr('tabindex', 702);
                $('#avOverlay #avTitle').focus();
                //Add alertdialog role and set description and label to be read
                if ($('#avOverlay').length > 0) {
                    $('#avOverlay').find('div').eq(1).attr('id', 'avDesc');
                    $('#addressVerification_panel').attr('aria-labelledby', 'avTitle');
                    $('#addressVerification_panel').attr('aria-describedby', 'avDesc');
                    $('#addressVerification_panel').attr('role', 'alertdialog').attr('aria-live', 'assertive');
                }
                //Handle address verification dialog buttons and messaging to the user.
                $('#avOverlay a').on('click', function () {
                    $('#processingIE').remove();
                    $('#processingFF').remove();
                    if ($(this).attr('title') !== 'Close Window') {
                        nextPanelId = $("#" + spco.activePane + "_edit").next("div").attr("id");
                        nextPanelId = nextPanelId.substring(0, nextPanelId.indexOf("_"));
                        console.log("next --- " + nextPanelId);
                        $("#" + nextPanelId + "_edit h2").focus();
                        $("#" + nextPanelId + "_edit a").focus();
                        $('a[href="#skiptomaincontent"]').before('<div class="screenreader" id="processingIE3">Address verification complete. Returning to ' + $("#" + spco.activePane + "_edit h2").text() + '</div><p class="screenreader" id="processingFF3">Address verification complete. Returning to ' + $("#" + spco.activePane + "_edit h2").text() + '</p>');
                        $('#processingIE3').attr('role', 'alert').attr('aria-live', 'assertive');
                        $('#processingFF3').attr('role', 'alert').attr('aria-live', 'assertive');
                        window.setTimeout(function () {
                            $('#processingIE3').remove();
                            $('#processingFF3').remove();
                        }, 5000);
                    } else {
                        $('a[href="#skiptomaincontent"]').before('<div class="screenreader" id="processingIE3">Dialog closed. Returning to ' + $("#" + spco.activePane + "_edit h2").text() + '</div><p class="screenreader" id="processingFF3">Dialog closed. Returning to ' + $("#" + spco.activePane + "_edit h2").text() + '</p>');
                        $('#processingIE3').attr('role', 'alert').attr('aria-live', 'assertive');
                        $('#processingFF3').attr('role', 'alert').attr('aria-live', 'assertive');
                        window.setTimeout(function () {
                            $('#processingIE3').remove();
                            $('#processingFF3').remove();
                        }, 5000);
                    }
                    $('#' + spco.activePane + '_focusassist').focus();
                });
            }, 3000);
        });

        $('#checkout_page #checkout_middle #shipAddressPane_edit .edit_pane_header_left').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #shipAddressPane_edit .edit_pane_header_right').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #shipAddressPane_edit #shipPaneShippingAddress.info_text').parent('span').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #shipAddressPane_edit #shipPaneShippingAddress.info_text').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #shipAddressPane_edit #shipPaneBillingAddress.info_text').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #shipAddressPane_edit span#shipUpdateLabel').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #shipAddressPane_edit .hint_text').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #shipAddressPane_edit td').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #shipAddressPane_edit label.info_text').attr('tabindex', -1);

        $('#checkout_page #checkout_middle #shipAddressPane_edit .info_text:empty').attr('tabindex', '');

        $("#shipPaneShipToDiffAddress").on('focus', function () {
            //$('#checkout_page #checkout_middle #shipAddressPane_edit select').attr('tabindex', 700);
            //$('#checkout_page #checkout_middle #shipAddressPane_edit option').attr('tabindex', 700);
            setTimeout(function () {
                if ($('span#shipPaneShippingAddress.info_text span.tabAssist').length <= 0) {
                    $('#shipAddressPane_edit #shipPaneShippingAddress').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#shipAddressPane_edit span').attr('tabindex', 700);
                    $('#shipAddressPane_edit br').parent('span').attr('tabindex', -1);
                    $('#shipAddressPane_edit #shipPaneShippingAddress').attr('tabindex', -1);
                }
                $('#checkout_page #checkout_middle #shipAddressPane_edit select').attr('tabindex', 700);
                $('#checkout_page #checkout_middle #shipAddressPane_edit option').attr('tabindex', 700);
            }, 500);
        });

        $('#checkout_page #checkout_middle #shipAddressPane_edit select').on('change', function () {
            setTimeout(function () {
                if ($('span#shipPaneShippingAddress.info_text span.tabAssist').length <= 0) {
                    $('#shipAddressPane_edit #shipPaneShippingAddress').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#shipAddressPane_edit span').attr('tabindex', 700);
                    $('#shipAddressPane_edit br').parent('span').attr('tabindex', -1);
                    $('#shipAddressPane_edit #shipPaneShippingAddress').attr('tabindex', -1);
                }
            }, 500);
        });

        $("#shipPaneShipToNewAddress").on('focus', function () {
            $('#checkout_page #checkout_middle #shipAddressPane_edit select').attr('tabindex', 700);

            $('#checkout_page #checkout_middle #shipAddressPane_edit #shipPaneNewShipAddress a.hint_text').attr('tabindex', 700);
            setTimeout(function () {
                $('#checkout_page #checkout_middle #shipAddressPane_edit #shipPaneNewShipAddress #shipUpdateLabel').attr('tabindex', -1);
            }, 500);
        });

        $("#shipPaneShipToBillAddress").on('focus', function () {
            $('#shipAddressPane_edit #shipPaneBillingAddress').attr('tabindex', -1);
            $('#shipAddressPane_edit #shipPaneShippingAddress').attr('tabindex', -1);
        });

        $('#shipAddressPane_edit #shipPaneShipToShipAddress').on('focus', function () {
            setTimeout(function () {
                if ($('span#shipPaneShippingAddress.info_text span.tabAssist').length <= 0) {
                    $('#shipAddressPane_edit #shipPaneShippingAddress').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#shipAddressPane_edit span').attr('tabindex', 700);
                    $('#shipAddressPane_edit br').parent('span').attr('tabindex', -1);
                    $('#shipAddressPane_edit #shipPaneShippingAddress').attr('tabindex', -1);
                }
            }, 500);
        });

        $('#checkout_page #checkout_middle #shipPaneContinue').on('click', function () {
            $('#checkout_page #checkout_middle #billAddressPane_edit .error_message').attr('tabindex', 700);
            setTimeout(function () {
                $('#shipAddressPane_view #shipAddrViewPaneData.info_text').attr('tabindex', -1);
                $('#shipAddressPane_view h2').attr('tabindex', 700);
                $('#shipAddressPane_view button').attr('tabindex', 700);
                if ($('#shipAddressPane_view #shipAddrViewPaneData span.tabAssist').length <= 0) {
                    $('#shipAddressPane_view #shipAddrViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#shipAddressPane_view span').attr('tabindex', 700);
                    $('#shipAddressPane_view br').parent('span').attr('tabindex', -1);
                }
                $('#shipAddressPane_view button span').attr('tabindex', -1);
                $('#checkout_page #checkout_middle #shipMethodPane_edit #shipMethodContainer').find('input').attr('tabindex', 800);
                $('#checkout_page #checkout_middle #shipMethodPane_edit h4').attr('tabindex', 800);
                $('#checkout_page #checkout_middle #shipMethodPane_edit label[for="shipMethod"]').attr('tabindex', 800);
                $('#checkout_page #checkout_middle #shipMethodPane_edit label[for="shipMethod"] a').attr('tabindex', 800);
                if ($('#checkout_page #order_summary_container tr.summary td span.tabAssist').length <= 0) {
                    $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);
                }
                if ($('#checkout_page #checkout_middle #shipMethodPane_edit #shipMethodContainerEmailDelivery span.tabAssist').length <= 0) {
                    $('#checkout_page #checkout_middle #shipMethodPane_edit #shipMethodContainerEmailDelivery').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#shipMethodContainerEmailDelivery span').attr('tabindex', 800);
                    $('checkout_page #checkout_middle #shipMethodPane_edit a').attr('tabindex', 800);
                    $('#shipMethodContainerEmailDelivery br').parent('span').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #shipMethodPane_edit #ebLoyaltyFree').attr('tabindex', -1);
                }
            }, 3000);
        });

        $('#shipAddressPane_view button').on('click', function () {
            $('#shipAddressPane_edit #shipPaneBillingAddress').attr('tabindex', -1);
            if ($('#shipAddressPane_edit #shipPaneBillingAddress span.tabAssist').length <= 0) {
                $('#shipAddressPane_edit #shipPaneBillingAddress').each(function (i, v) {
                    $(v).contents().wrap('<span class="tabAssist" />')
                });
                $('#shipAddressPane_edit span').attr('tabindex', 700);
                $('#shipAddressPane_edit br').parent('span').attr('tabindex', -1);
            }
        });

        $('#checkout_page #checkout_middle #shipAddressPane_view #shipAddressStorePickupInfoContainer div').attr('tabindex', 700);
        $('#checkout_page #checkout_middle #shipAddressPane_view #shipAddressStorePickupInfoContainer').parent('span').attr('tabindex', -1);
    });
    //pane 3
    $(document).ready(function () {

        /*$('#shipMethodPane_edit a.focus_assist').focusout(function () {
            if ($('#shipAddressPane_view #shipAddrViewPaneData span.tabAssist').length <= 0) {
                $('#shipAddressPane_view #shipAddrViewPaneData').each(function (i, v) {
                    $(v).contents().wrap('<span class="tabAssist" />')
                });
                $('#shipAddressPane_view span').attr('tabindex', 700);
                $('#shipAddressPane_view br').parent('span').attr('tabindex', -1);
            }
        });*/


        $('checkout_page #checkout_middle #shipMethodPane_edit a').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit h2').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit h3').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit h4').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit input').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit button').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit .hint_text').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit .form_title').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit p.red').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit .shipMethodPaneEmailDeliveryTime').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit .storeLocation').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit .storeLocation span a').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit .chooseShippingMethodLabel').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit td.info_text img').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit .shipFromStore_selectedShippingSpeed').attr('tabindex', 800);

        $('#checkout_page #checkout_middle #shipMethodPane_edit .sendToStoreShipMethodContainer h4').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_edit .sendToStoreShipMethodContainer label').attr('tabindex', 800);
        //$('#checkout_page #checkout_middle #shipMethodPane_edit #pickupPersonContainer span').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #shipMethodPane_edit .error_message').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #shipMethodPane_edit input[type="text"]').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #shipMethodPane_edit span input').parent('span').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #shipMethodPane_edit #pickupPersonContainer label').attr('tabindex', -1);

        $('#checkout_page #checkout_middle #shipMethodPane_edit span.pickupInStoreLinkContainer a').attr('title', 'Pickup in store instead');
        $('#checkout_page #checkout_middle #shipMethodPane_edit span.pickupInStoreLinkContainer a').on('click', function () {
            setTimeout(function () {
                $('#isaOverlay').attr('role', 'dialog');
                $('#isaOverlay span').attr('tabindex', 800);
                $('#isaOverlay a').attr('tabindex', 800);
                $('#isaOverlay input').attr('tabindex', 800);
                $('#isaOverlay label').attr('tabindex', 800);
                $('#isaOverlay button').attr('tabindex', 800);
                $('#isaOverlay p').attr('tabindex', 800);
            }, 500);

        });

        $('#checkout_page #checkout_middle #shipMethodPane_edit #pickupPersonOption_other').on('focus', function () {
            setTimeout(function () {
                $('#checkout_page #checkout_middle #shipMethodPane_edit input[type="text"]').attr('tabindex', 800);
            }, 500);
        });

        $('#checkout_page #checkout_middle #shipMethodPane_edit .edit_pane_header_left').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #shipMethodPane_edit .edit_pane_header_right').attr('tabindex', -1);

        $('#isaOverlay [data-btnname="isa_pickupHere"]').on('click', function () {
            $('#checkout_page #checkout_middle #shipMethodPane_edit h4').attr('tabindex', 800);
            $('#checkout_page #checkout_middle #shipMethodPane_edit .storeLocation').attr('tabindex', 800);
            $('#checkout_page #checkout_middle #shipMethodPane_edit .shipMethodSendToHome').attr('tabindex', 800);
        });

        $('#checkout_page #checkout_middle #shipMethodPaneContinue').on('click', function () {
            setTimeout(function () {
                $('#shipMethodPane_view button').attr('tabindex', 801);
                $('#shipMethodPane_view h2').attr('tabindex', 800);
                $('#shipMethodPane_view #shipMethViewPaneData').attr('tabindex', -1);
                $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div').attr('tabindex', 800);
                $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice').attr('tabindex', -1);
                if ($('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice span.tabAssist').length <= 0) {
                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice span').attr('tabindex', 800);
                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice br').parent('span').attr('tabindex', -1);
                }

                if ($('#checkout_page #checkout_middle #paymentMethodPane_edit td#addMoreContainer').parent('tr').next('tr').find('div.info_text span.tabAssist').length <= 0) {
                    $('#checkout_page #checkout_middle #paymentMethodPane_edit td#addMoreContainer').parent('tr').next('tr').find('div.info_text').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #checkout_middle #paymentMethodPane_edit span').attr('tabindex', 900);
                    $('#checkout_page #checkout_middle #paymentMethodPane_edit a').parents('span').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #paymentMethodPane_edit td#addMoreContainer').parent('tr').next('tr').find('div.info_text').attr('tabindex', -1);
                }

                if ($('#checkout_page #order_summary_container tr.summary td span.tabAssist').length <= 0) {
                    $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);
                }
                $('#checkout_page #checkout_middle #paymentMethodPane_edit input').attr('tabindex', 900);
                $('#checkout_page #checkout_middle #paymentMethodPane_edit select').attr('tabindex', 900);
                $('#checkout_page #checkout_middle #paymentMethodPane_edit #payMethodSourceCode_container a').attr('tabindex', -1);
                $('#checkout_page #checkout_middle #paymentMethodPane_edit #payMethodSourceCode_container input#CPCOrSourceCode').attr('tabindex', -1);


            }, 3000);
        });

        $('#shipMethodPane_view button').on('click', function () {
            setTimeout(function () {
                if ($('#checkout_page #checkout_middle #shipMethodPane_edit #shipMethodContainerEmailDelivery span.tabAssist').length <= 0) {
                    $('#checkout_page #checkout_middle #shipMethodPane_edit #shipMethodContainerEmailDelivery label').each(function (i, v) {
                        $(v).contents.eq(2).wrap('<span />')
                    });
                    $('#shipMethodContainerEmailDelivery span').attr('tabindex', 800);
                    $('#shipMethodContainerEmailDelivery br').parent('span').attr('tabindex', -1);
                    $('checkout_page #checkout_middle #shipMethodPane_edit a').attr('tabindex', 800);
                };
            }, 500)
            setTimeout(function () {
                $('checkout_page #checkout_middle #shipMethodPane_edit a').attr('tabindex', 800);
                $('checkout_page #checkout_middle #shipMethodPane_edit h4').attr('tabindex', 800);
                $('checkout_page #checkout_middle #shipMethodPane_edit input').attr('tabindex', 800);
                $('checkout_page #checkout_middle #shipMethodPane_edit #shipFromStoreOptionLabel').attr('tabindex', 800);

            }, 2000)
        });
    });

    //pane 4
    $(document).ready(function () {
        $('#checkout_page #checkout_middle #paymentMethodPane_edit a').attr('tabindex', 900);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit h2').attr('tabindex', 900);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit span').attr('tabindex', 900);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit button').attr('tabindex', 900);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit input').attr('tabindex', 900);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit select').attr('tabindex', 900);

        $('#checkout_page #checkout_middle #paymentMethodPane_edit .form_title').attr('tabindex', 900);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit .info_text').attr('tabindex', 900);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit .form_title_red').attr('tabindex', 900);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit .form_title_red').find('*').attr('tabindex', 900);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit #paymentMethodEntryMessage').attr('tabindex', 900);

        $('#checkout_page #checkout_middle #paymentMethodPane_edit .hint_text').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit td.info_text').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit .error_message').attr('tabindex', -1);
        //$('#checkout_page #checkout_middle #paymentMethodPane_edit #giftCardForm label').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit #giftCardForm label .info_text').unwrap();
        $('#checkout_page #checkout_middle #paymentMethodPane_edit #giftCardForm input#giftCardCode_1').before('<label for="giftCardCode_1" style="display: none;">Enter your gift card number</label>');
        $('#checkout_page #checkout_middle #paymentMethodPane_edit #giftCardForm input#giftCardPin_1').before('<label for="giftCardPin_1" style="display: none;">Enter your gift card pin</label>');
        $('#checkout_page #checkout_middle #paymentMethodPane_edit label .hint_text').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit label .form_title').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit .edit_pane_header_left').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit .edit_pane_header_right').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit .edit_pane_header_right').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit #payMethodSourceCode_container label').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit #payMethodSourceCode_container .info_text').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit #giftCardForm .info_text').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit span#payMethodPaneStoredCCCVV_container').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit #payMethodNewCCContainer span#payCCTitle').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit #payMethodSourceCode_container input#CPCOrSourceCode').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit #payMethodSourceCode_container a').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit [type="hidden"]').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit a').parent('span').attr('tabindex', -1);
        $('#checkout_page #checkout_middle #paymentMethodPane_edit #payMethodPayPalContainer img').attr('title', 'Paypal Logo');
        $('#checkout_page #checkout_middle #paymentMethodPane_edit #payMethodBMLContainer img').attr('title', 'Bill Me Later Logo');

        $('#checkout_page #payMethodPaneMultiGiftCards').on('click', function () {
            var i = $('#checkout_page #giftCardForm input[id!="giftCardCode_"]').last().attr('id').split('_')[1];
            $('#checkout_page #giftCardForm input#giftCardCode_' + i).before('<label for="giftCardCode_' + i + '" style="display: none;">Enter your gift card number for giftcard ' + i + '</label>');
            $('#checkout_page #giftCardForm input#giftCardPin_' + i).before('<label for="giftCardPin_' + i + '" style="display: none;">Enter your gift card pin for giftcard ' + i + '</label>');
            $('#checkout_page #giftCardForm input#giftCardCode_' + i).focus();
        });

        $('#checkout_page #checkout_middle #paymentMethodPane_edit #payMethodSourceCode_container input#promo_type').on('focus', function () {
            setTimeout(function () {
                $(this).parent('span').find('a').attr('tabindex', 900);
                $('#checkout_page #checkout_middle #paymentMethodPane_edit #payMethodSourceCode_container input#CPCOrSourceCode').attr('tabindex', 900);
            }, 500);
        });

        $('#checkout_page #checkout_middle #paymentMethodPane_edit #payMethodSourceCode_container input#militaryCode').on('focus', function () {
            setTimeout(function () {
                $(this).parent('span').find('a').attr('tabindex', 900);
            }, 500);

        });


        $('#checkout_page #checkout_middle #payMethodPaneContinue').on('click', function () {
            setTimeout(function () {
                $('#checkout_page #checkout_middle #paymentMethodPane_edit .error_message').attr('tabindex', 900);
                $('#checkout_page #checkout_middle #paymentMethodPane_edit .error_message:empty').attr('tabindex', '');
                $('#paymentMethodPane_view button').attr('tabindex', 900);
                $('#paymentMethodPane_view h2').attr('tabindex', 900);
                if ($('#paymentMethodPane_view #payMethViewPaneData span.tabAssist').length <= 0) {
                    $('#paymentMethodPane_view #payMethViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#paymentMethodPane_view #payMethViewPaneData span').attr('tabindex', 900);
                    $('#paymentMethodPane_view #payMethViewPaneData br').parent('span').attr('tabindex', -1);
                }
                $('#paymentMethodPane_view #payMethViewPaneData button span').attr('tabindex', -1);
                if ($('#checkout_page #order_summary_container tr.summary td span.tabAssist').length <= 0) {
                    $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);
                }
            }, 5000);
        });

        $('#checkout_page #checkout_middle #payMethodPaneContinue').on('click', function () {
            setTimeout(function () {
                if ($('#paymentMethodPane_view #payMethViewPaneData span.tabAssist').length <= 0) {
                    $('#paymentMethodPane_view #payMethViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#paymentMethodPane_view span').attr('tabindex', 900);
                    $('#paymentMethodPane_view br').parent('span').attr('tabindex', -1);
                }
                $('#checkout_page #checkout_middle button span').attr('tabindex', -1);
                if ($('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td span.tabAssist').length <= 0) {
                    $('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #checkout_middle #orderReviewPane_edit td span').attr('tabindex', 1000);
                }
                $('#checkout_page #checkout_middle #orderReviewPane_edit a').attr('tabindex', 1000);

                $('#checkout_page #checkout_middle #orderReviewPane_edit span.info_text input').attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit input').attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit #orderReviewPaneStoredCCCVV_header').children().attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit span.form_title').attr('tabindex', 1000);

                $('#checkout_page #checkout_middle #orderReviewPane_edit br').parent('span').attr('tabindex', -1);
                $('#checkout_page #checkout_middle #orderReviewPane_edit td').attr('tabindex', -1);
                $('#checkout_page #checkout_middle #orderReviewPane_edit span').parent('span').attr('tabindex', -1);
                $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message').attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message:empty').attr('tabindex', -1);

                if ($('#checkout_page #order_summary_container tr.summary td span.tabAssist').length <= 0) {

                    $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);

                    $('#checkout_page #checkout_middle button span').attr('tabindex', -1);
                }
            }, 3000);
        });
    });
    //pane 5
    $(document).ready(function () {
        $('#orderReviewPane_edit a.focus_assist').focusout(function () {
            setTimeout(function () {
                if ($('#payMethViewPaneData span.tabAssist').length <= 0) {
                    $('#paymentMethodPane_view #payMethViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#paymentMethodPane_view span').attr('tabindex', 900);
                    $('#paymentMethodPane_view br').parent('span').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle button span').attr('tabindex', -1);
                }
                if ($('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td span.tabAssist').length <= 0) {

                    $('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #checkout_middle #orderReviewPane_edit td span').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit span').parent('span').attr('tabindex', -1);

                }
                $('#checkout_page #checkout_middle #orderReviewPane_edit span').attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit a').attr('tabindex', 1000);

                $('#checkout_page #checkout_middle #orderReviewPane_edit span.info_text input').attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit input').attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit #orderReviewPaneStoredCCCVV_header').children().attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit span.form_title').attr('tabindex', 1000);

                $('#checkout_page #checkout_middle #orderReviewPane_edit br').parent('span').attr('tabindex', -1);
                $('#checkout_page #checkout_middle #orderReviewPane_edit td').attr('tabindex', -1);
                $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message').attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message:empty').attr('tabindex', -1);
                if ($('#checkout_page #order_summary_container tr.summary td span.tabAssist').length <= 0) {

                    $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);
                }
                $('#checkout_page #checkout_middle button span').attr('tabindex', -1);
            }, 500)
        });
    });

    $(document).ready(function () {

        $("#billAddressPane_edit").prepend("<a tabindex='600' href='#' id='billAddressPane_focusassist' class='focus_assist'></a>");
        $('#billAddressPane_view #billAddrViewPaneData.info_text').attr('tabindex', -1);
        $('#billAddressPane_view h2').attr('tabindex', 600);
        $('#billAddressPane_view button').attr('tabindex', 600);
        if ($('#billAddressPane_view #billAddrViewPaneData span.tabAssist').length <= 0) {

            $('#billAddressPane_view #billAddrViewPaneData').each(function (i, v) {
                $(v).contents().wrap('<span class="tabAssist" />')
            });
            $('#billAddressPane_view span').attr('tabindex', 600);
            $('#billAddressPane_view br').parent('span').attr('tabindex', -1);
        }
        $("#shipAddressPane_edit").prepend("<a tabindex='700' href='#' id='shipAddressPane_focusassist' class='focus_assist'></a>");
        $('#shipAddressPane_view #shipAddrViewPaneData.info_text').attr('tabindex', -1);
        $('#shipAddressPane_view h2').attr('tabindex', 700);
        $('#shipAddressPane_view button').attr('tabindex', 700);
        $('#shipAddressPane_view #shipAddressStorePickupInfoContainer div').attr('tabindex', 700);
        if ($('#shipAddressPane_view #shipAddrViewPaneData span.tabAssist').length <= 0) {

            $('#shipAddressPane_view #shipAddrViewPaneData').each(function (i, v) {
                $(v).contents().wrap('<span class="tabAssist" />')
            });
            $('#shipAddressPane_view span').attr('tabindex', 700);
            $('#shipAddressPane_view br').parent('span').attr('tabindex', -1);
        }
        $('#shipMethodPane_edit #shipMethodContainer').find('*').attr('tabindex', 800);

        $("#shipMethodPane_edit").prepend("<a tabindex='800' href='#' id='shipMethodPane_focusassist' class='focus_assist'></a>");
        $('#shipMethodPane_view button').attr('tabindex', 801);
        $('#shipMethodPane_view h2').attr('tabindex', 800);
        $('#shipMethodPane_view #shipMethViewPaneData').attr('tabindex', -1);
        $('#shipMethodPane_view span').attr('tabindex', 800);
        $('#shipMethodPane_view div').attr('tabindex', 800);
        /*if ($('#ship_method_emailDelivery').length > 0) {
            $('#shipMethodPane_view div').attr('tabindex', -1);
            $('#shipMethodPane_view #shipMethViewPaneData #ship_method_title_emailDlvy').attr('tabindex', 800);
            $('#shipMethodPane_view #shipMethViewPaneData #ship_method_emailDelivery').attr('tabindex', 800);
            $('#shipMethodPane_view #shipMethViewPaneData .red').attr('tabindex', 800);
        }*/
        $('#shipMethodPane_view div.view_pane').attr('tabindex', -1);
        $('#shipMethViewPaneData div#giftInvoice').attr('tabindex', -1);
        $('#shipMethodPane_view div#shipMethViewPaneData').attr('tabindex', -1);

        $("#paymentMethodPane_edit").prepend("<a tabindex='900' href='#' id='paymentMethodPane_focusassist' class='focus_assist'></a>");
        $("#orderReviewPane_edit").prepend("<a tabindex='1000' href='#' id='orderReviewPane_focusassist' class='focus_assist'></a>");

        var buttonCheckInterval;
        var nextPanelId;
        //Setting focus in checkout when continue is clicked. 
        /**/
        $('#checkout_middle').on('click', '.button', function (event) {
            var buttonId = $(this).attr("id");

            console.log("BUTTON ID ---" + buttonId);
            console.log('a) ' + spco.activePane);
            //Handle Edit button clicks
            if (buttonId.indexOf("Edit") >= 0) {
                //$("#" + spco.activePane + "_edit h2").first().focus();
                //$("#" + spco.activePane + "_edit a").first().focus();

                $("#" + spco.activePane + "_focusassist").focus();
            }
            //Handle Continue button clicks
            if (buttonId.indexOf("Continue") >= 0) {
                console.log("HITHITHIT");
                console.log(spco.activePane);
                if (buttonId == '') {
                    
                }
                //Delay handling if address verification dialog is present.
                buttonCheckInterval = setInterval(function () {
                    if ($('#addressVerification_panel').length < 1) {
                        clearInterval(buttonCheckInterval);
                        nextPanelId = nextPanelId.substring(0, nextPanelId.indexOf("_"));
                        console.log("next --- " + nextPanelId);
                        setTimeout(function(){
                            //$("#" + nextPanelId + "_edit h2").first().focus();
                            //$("#" + nextPanelId + "_edit a").first().focus();
                            $("#" + nextPanelId + "_focusassist").focus();
                        }, 5000);
                    } else {
                        if (nextPanelId == '') {
                            nextPanelId = $("#" + spco.activePane + "_edit").next("div").attr("id");
                        }
                    }
                }, 300);
                nextPanelId = '';
            }
            setTimeout(function () {
                $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                    $(v).contents().wrap('<span class="tabAssist" />')
                });

                $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);

                $('#checkout_page #checkout_middle button span').attr('tabindex', -1);
            }, 500);
            setTimeout(function () {
                if ($('#paymentMethodPane_view #payMethViewPaneData span.tabAssist').length <= 0) {

                    $('#paymentMethodPane_view #payMethViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#paymentMethodPane_view span').attr('tabindex', 900);
                    $('#paymentMethodPane_view br').parent('span').attr('tabindex', -1);
                }
                if ($('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td span.tabAssist').length <= 0) {

                    $('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #checkout_middle #orderReviewPane_edit td span').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit a').attr('tabindex', 1000);

                    $('#checkout_page #checkout_middle #orderReviewPane_edit span.info_text input').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit input').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit #orderReviewPaneStoredCCCVV_header').children().attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit span.form_title').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit br').parent('span').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit td').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit span').parent('span').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message:empty').attr('tabindex', -1);
                }
                if ($('#checkout_page #order_summary_container tr.summary td span.tabAssist').length <= 0) {
                    $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);


                }
                $('#checkout_page #checkout_middle button span').attr('tabindex', -1);
            }, 15000);
        });

        $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice').each(function (i, v) {
            $(v).contents().wrap('<span class="tabAssist" />')
        });

        $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice span').attr('tabindex', 800);
        $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice br').parent('span').attr('tabindex', -1);

        $('#paymentMethodPane_view #payMethViewPaneData').attr('tabindex', -1);
        $('#paymentMethodPane_view #payMethViewPaneData div').attr('tabindex', 800);

        $('#checkout_page #checkout_middle #orderReviewPane_edit h2').attr('tabindex', 1000);
        $('#checkout_page #checkout_middle #orderReviewPane_edit button').attr('tabindex', 1000);

        setTimeout(function () {
            if ($('#paymentMethodPane_view #payMethViewPaneData span.tabAssist').length <= 0) {

                $('#paymentMethodPane_view #payMethViewPaneData').each(function (i, v) {
                    $(v).contents().wrap('<span class="tabAssist" />')
                });
                $('#paymentMethodPane_view span').attr('tabindex', 900);
                $('#paymentMethodPane_view br').parent('span').attr('tabindex', -1);
            }
            if ($('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td span.tabAssist').length <= 0) {

                $('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td').each(function (i, v) {
                    $(v).contents().wrap('<span class="tabAssist" />')
                });

                $('#checkout_page #checkout_middle #orderReviewPane_edit td span').attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit a').attr('tabindex', 1000);

                $('#checkout_page #checkout_middle #orderReviewPane_edit span.info_text input').attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit input').attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit #orderReviewPaneStoredCCCVV_header').children().attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit span.form_title').attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit br').parent('span').attr('tabindex', -1);
                $('#checkout_page #checkout_middle #orderReviewPane_edit td').attr('tabindex', -1);
                $('#checkout_page #checkout_middle #orderReviewPane_edit span').parent('span').attr('tabindex', -1);
                $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message').attr('tabindex', 1000);
                $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message:empty').attr('tabindex', -1);
            }
            if ($('#checkout_page #order_summary_container tr.summary td span.tabAssist').length <= 0) {
                $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                    $(v).contents().wrap('<span class="tabAssist" />')
                });
                $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);


            }
            $('#checkout_page #checkout_middle button span').attr('tabindex', -1);
        }, 15000);

        $('#checkout_page #checkout_middle button span').attr('tabindex', -1);

        $('a.focus_assist').on('focus', function () {
            setTimeout(function () {

                if ($('#billAddressPane_view #billAddrViewPaneData span.tabAssist').length <= 0) {

                    $('#billAddressPane_view #billAddrViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#billAddressPane_view span').attr('tabindex', 600);
                    $('#billAddressPane_view br').parent('span').attr('tabindex', -1);
                }

                if ($('#shipAddressPane_view #shipAddrViewPaneData span.tabAssist').length <= 0) {

                    $('#shipAddressPane_view #shipAddrViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#shipAddressPane_view span').attr('tabindex', 700);
                    $('#shipAddressPane_view br').parent('span').attr('tabindex', -1);
                }
                if ($('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice span.tabAssist').length <= 0) {

                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice span').attr('tabindex', 800);
                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice br').parent('span').attr('tabindex', -1);
                }

                if ($('#paymentMethodPane_view #payMethViewPaneData span.tabAssist').length <= 0) {

                    $('#paymentMethodPane_view #payMethViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#paymentMethodPane_view span').attr('tabindex', 900);
                    $('#paymentMethodPane_view br').parent('span').attr('tabindex', -1);
                }
                if ($('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td span.tabAssist').length <= 0) {

                    $('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #checkout_middle #orderReviewPane_edit td span').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit a').attr('tabindex', 1000);

                    $('#checkout_page #checkout_middle #orderReviewPane_edit span.info_text input').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit input').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit #orderReviewPaneStoredCCCVV_header').children().attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit span.form_title').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit br').parent('span').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit td').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit span').parent('span').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message:empty').attr('tabindex', -1);
                }
                if ($('#checkout_page #order_summary_container tr.summary td span.tabAssist').length <= 0) {
                    $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);
                }
                $('#checkout_page #checkout_middle button span').attr('tabindex', -1);
                $('span').each(function () {
                    var $this = $(this);
                    if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
                        $this.attr('tabindex', -1);
                });
                $('#checkout_page #checkout_middle #shipMethodPane_edit input').attr('tabindex', 800);
            }, 500);
        });
    });

    $(document).ready(function () {
        //Setting focus in checkout when continue is clicked. 
        /*
        $("#billAddressPane_edit").prepend("<a tabindex='600' href='#' class='focus_assist'></a>");
        $("#shipAddressPane_edit").prepend("<a tabindex='700' href='#' class='focus_assist'></a>");
        $("#shipMethodPane_edit").prepend("<a tabindex='800' href='#' class='focus_assist'></a>");
        $("#paymentMethodPane_edit").prepend("<a tabindex='900' href='#' class='focus_assist'></a>");
        $("#orderReviewPane_edit").prepend("<a tabindex='1000' href='#' class='focus_assist'></a>");
        */
        $('#checkout_middle [data-btntype="continue"]').on('click', function () {
            setTimeout(function () {
                if ($('#billAddressPane_view #billAddrViewPaneData span.tabAssist').length <= 0) {

                    $('#billAddressPane_view #billAddrViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#billAddressPane_view span').attr('tabindex', 600);
                    $('#billAddressPane_view br').parent('span').attr('tabindex', -1);
                }

                if ($('#shipAddressPane_view #shipAddrViewPaneData span.tabAssist').length <= 0) {

                    $('#shipAddressPane_view #shipAddrViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#shipAddressPane_view span').attr('tabindex', 700);
                    $('#shipAddressPane_view br').parent('span').attr('tabindex', -1);
                }
                if ($('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice span.tabAssist').length <= 0) {

                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice span').attr('tabindex', 800);
                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice br').parent('span').attr('tabindex', -1);
                }
                if ($('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#ship_method_inStore span.tabAssist').length <= 0) {

                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#ship_method_inStore').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#ship_method_inStore span').attr('tabindex', 800);
                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#ship_method_inStore span').first().attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#ship_method_inStore br').parent('span').attr('tabindex', -1);
                }
                $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData a').attr('tabindex', 800);
                $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData input').attr('tabindex', 800);
                $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData label#shipFromStoreOptionLabel.freeShipping').attr('tabindex', 800);

                if ($('#paymentMethodPane_view #payMethViewPaneData span.tabAssist').length <= 0) {

                    $('#paymentMethodPane_view #payMethViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#paymentMethodPane_view span').attr('tabindex', 900);
                    $('#paymentMethodPane_view br').parent('span').attr('tabindex', -1);
                }
                $('#paymentMethodPane_view #payMethViewPaneData #payMethodPanestoredCCCardNumber option').attr('tabindex', 900);
                if ($('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td span.tabAssist').length <= 0) {

                    $('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #checkout_middle #orderReviewPane_edit td span').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit a').attr('tabindex', 1000);

                    $('#checkout_page #checkout_middle #orderReviewPane_edit span.info_text input').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit input').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit #orderReviewPaneStoredCCCVV_header').children().attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit span.form_title').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit br').parent('span').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit td').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit span').parent('span').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message:empty').attr('tabindex', -1);
                }
                if ($('#checkout_page #order_summary_container tr.summary td span.tabAssist').length <= 0) {
                    $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);
                }
                $('#checkout_page #order_summary_container #orderSummaryShipToHomePrice').attr('tabindex', 8000);
                $('#checkout_page #checkout_middle button span').attr('tabindex', -1);
                $('#checkout_page #checkout_middle #orderReviewPane_edit #contingencyOrderMessage').attr('tabindex', 1000);
                $('span').each(function () {
                    var $this = $(this);
                    if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
                        $this.attr('tabindex', -1);
                });
            }, 20000);

        });

        $('a[href="#skiptomaincontent"]').on('focus', function () {
            setTimeout(function () {
                if ($('#billAddressPane_view #billAddrViewPaneData span.tabAssist').length <= 0) {

                    $('#billAddressPane_view #billAddrViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#billAddressPane_view span').attr('tabindex', 600);
                    $('#billAddressPane_view br').parent('span').attr('tabindex', -1);
                }

                if ($('#shipAddressPane_view #shipAddrViewPaneData span.tabAssist').length <= 0) {

                    $('#shipAddressPane_view #shipAddrViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#shipAddressPane_view span').attr('tabindex', 700);
                    $('#shipAddressPane_view br').parent('span').attr('tabindex', -1);
                }
                if ($('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice span.tabAssist').length <= 0) {

                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice span').attr('tabindex', 800);
                    $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div#giftInvoice br').parent('span').attr('tabindex', -1);
                }

                if ($('#paymentMethodPane_view #payMethViewPaneData span.tabAssist').length <= 0) {

                    $('#paymentMethodPane_view #payMethViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#paymentMethodPane_view span').attr('tabindex', 900);
                    $('#paymentMethodPane_view br').parent('span').attr('tabindex', -1);
                }
                if ($('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td span.tabAssist').length <= 0) {

                    $('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #checkout_middle #orderReviewPane_edit td span').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit a').attr('tabindex', 1000);

                    $('#checkout_page #checkout_middle #orderReviewPane_edit span.info_text input').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit input').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit #orderReviewPaneStoredCCCVV_header').children().attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit span.form_title').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit br').parent('span').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit td').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit span').parent('span').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message:empty').attr('tabindex', -1);
                }
                if ($('#checkout_page #order_summary_container tr.summary td span.tabAssist').length <= 0) {
                    $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);
                }
                $('#checkout_page #checkout_middle button span').attr('tabindex', -1);
                $('span').each(function () {
                    var $this = $(this);
                    if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
                        $this.attr('tabindex', -1);
                });
                $('#checkout_page #checkout_middle #shipMethodPane_edit input').attr('tabindex', 800);
            }, 500);
        });

        $('#checkout_page [data-btntype="submit"]').on('click', function () {
            setTimeout(function () {
                if ($('#paymentMethodPane_view #payMethViewPaneData span.tabAssist').length <= 0) {

                    $('#paymentMethodPane_view #payMethViewPaneData').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#paymentMethodPane_view span').attr('tabindex', 900);
                    $('#paymentMethodPane_view br').parent('span').attr('tabindex', -1);
                }
                if ($('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td span.tabAssist').length <= 0) {

                    $('#checkout_page #checkout_middle #orderReviewPane_edit table#orderReviewForm table td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });

                    $('#checkout_page #checkout_middle #orderReviewPane_edit td span').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit a').attr('tabindex', 1000);

                    $('#checkout_page #checkout_middle #orderReviewPane_edit span.info_text input').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit input').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit #orderReviewPaneStoredCCCVV_header').children().attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit span.form_title').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit br').parent('span').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit td').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit span').parent('span').attr('tabindex', -1);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message').attr('tabindex', 1000);
                    $('#checkout_page #checkout_middle #orderReviewPane_edit .error_message:empty').attr('tabindex', -1);
                }
                if ($('#checkout_page #order_summary_container tr.summary td span.tabAssist').length <= 0) {
                    $('#checkout_page #order_summary_container tr.summary td').each(function (i, v) {
                        $(v).contents().wrap('<span class="tabAssist" />')
                    });
                    $('#checkout_page #order_summary_container tr.summary td span').attr('tabindex', 8000);


                }
                $('#checkout_page #checkout_middle #shipMethodPane_view #shipMethViewPaneData div').attr('tabindex', 800);
                $('#checkout_page #checkout_middle button span').attr('tabindex', -1);
            }, 15000);
        });

        $('#checkout_page [data-btnname="checkout_submitOrder"]').on('click', function () {
            $('a[href="#skiptomaincontent"]').before('<a href="javascript:void(0);" id="processingAlert" class="screenreader">Please wait while your order is submitted. You will be taken to the reciept page.</a>');
            $('#processingAlert').attr('role', 'status').attr('aria-live', 'assertive');
        });
    });
}

$(document).ready(function () {
    var alertCranberry;
    $('#processingIE2').remove();
    $('#processingFF2').remove();
    $('option').removeAttr('tabindex');
    $('#shoppingcart_container a[data-btnname="cart_checkout"]').on('click', function () {
        $('a[href="#skiptomaincontent"]').before('<div class="screenreader" id="processingIE">Continuing to checkout, please wait</div><p class="screenreader" id="processingFF">Continuing to checkout, please wait</p>');
        $('#processingIE').attr('role', 'alert').attr('aria-live', 'assertive');
        $('#processingFF').attr('role', 'alert').attr('aria-live', 'assertive');
    });
   
    $('#checkout_container [data-btntype="continue"]').on('click', function () {
        
        $('a[href="#skiptomaincontent"]').before('<div class="screenreader" id="processingIE">Processing your information. Please wait</div><p class="screenreader" id="processingFF">Processing your information. Please wait</p>');
        $('#processingIE').attr('role', 'alert').attr('aria-live', 'assertive');
        $('#processingFF').attr('role', 'alert').attr('aria-live', 'assertive');
        $('option').removeAttr('tabindex');
        errorLength = $('#' + spco.activePane + '_edit span.error_message:empty').length;
        
        alertCranberry = setInterval(function () {
            
            if ($('#inventoryCheck_loading').length < 1 && $('#' + spco.activePane + '_edit span.error_message').text().length < 1) {
                $('#processingIE').remove();
                $('#processingFF').remove();
                $('a[href="#skiptomaincontent"]').before('<div class="screenreader" id="processingIE2">' + $("#" + spco.activePane + "_edit h2").text() + ' section now ready for input</div><p class="screenreader" id="processingFF2">' + $("#" + spco.activePane + "_edit h2").text() + ' section now ready for input</p>');
                $('#processingIE2').attr('role', 'alert').attr('aria-live', 'assertive');
                $('#processingFF2').attr('role', 'alert').attr('aria-live', 'assertive');
                $('option').removeAttr('tabindex');
                clearInterval(alertCranberry);
                errorLength = 0;
                window.setTimeout(function () {
                    $('#processingIE2').remove();
                    $('#processingFF2').remove();
                    //console.log('excalibur');
                }, 5000);
            } else if ($('#' + spco.activePane + '_edit span.error_message').text().length > 0) {
                $('#processingIE').remove();
                $('#processingFF').remove();
                $('a[href="#skiptomaincontent"]').before('<div class="screenreader" id="processingIE2">' + $("#" + spco.activePane + "_edit span.error_message").text() + '</div><p class="screenreader" id="processingFF2">' + $("#" + spco.activePane + "_edit span.error_message").text() + '</p>');
                $('#processingIE2').attr('role', 'alert').attr('aria-live', 'assertive');
                $('#processingFF2').attr('role', 'alert').attr('aria-live', 'assertive');
                clearInterval(alertCranberry);
                window.setTimeout(function () {
                    $('#processingIE2').remove();
                    $('#processingFF2').remove();
                }, 5000);
            }
        }, 5000);
    });
    $('#checkout_container .button, #checkout_container input').on('click', function () {
        setTimeout(function () {
            $('option').removeAttr('tabindex');
        }, 500);
    });
});