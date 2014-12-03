var loc = loc || {};
$.extend(loc, {

    debug: parseBoolean("faux"),
    currency: "$",
    lcid: parseInt("1033"),
    homepage: {
        productDescLimit: parseInt('100'),
        facebook: {
            href: 'http://www.facebook.com/TheBodyShop',
            showFaces: parseBoolean('true'),
            stream: parseBoolean('true'),
            header: parseBoolean('true')
        }
    },
    productPage: {
        videoBackground: 'url(http://img.youtube.com/vi/{0}/2.jpg) center center no-repeat',
        defaultTabConfiguration: 'review',
        isShadeItemCodeNeeded: 'on',
        productImageTooltip: 'Click for enlarged view',
        productLargeImagePath: '/images/packshot/products/large/{0}_l.jpg',
        alternateImageMediumPath: '/images/packshot/products/large/{0}_l.jpg'
    },
    subcategory: {
        productsToDisplay: parseInt('9'),
        initialSorting: 'bestsellers-desc'
    },
    bazaarvoice: {
        domainName: 'thebodyshop-usa.com',
        dns: '//reviews.thebodyshop-usa.com',
        askDns: 'http://answers.thebodyshop.e-loreal.com/'
    },
    emailupdates: {
        defaulttext: "Email Address"
    },
    title: {
        signouttitle: "sign out"
    },
    login: {
        email: "Email address",
        password: "",
		ErrorEmailPWDEmpty: "Please enter an email address and password.", //LOC_SW_EMAIL_EMPTY_ERRMSG
        ErrorEmailEmpty: "Please enter an email address.", //LOC_SW_EMAIL_EMPTY_MSG
        ErrorEmailInvalid: "Your email address is invalid, please check and re-enter your address.", //LOC_SW_EMAIL_INVALID_ERRMSG
        ErrorPWSEmpty: "Please enter a password.", //LOC_SW_PASSWORD_EMPTY_ERRMSG
        ErrorPWDLength: "Please verify, the password should be minimum of 6 characters.", //LOC_SW_PWD_ERRMSG
        ErrorPWDMismatch: "Your passwords do not match.", //LOC_SW_PWD_MISMATCH_ERRMSG
		ErrorNewUserSERVER: "This email address already exists in our database. Use the 'forgot password' link below for a reminder of your password.", //LOC_SW_NEW_USER_ERROR_MSG
		ErrorExistingUserSERVER: "Your email address or password is incorrect. ", //LOC_SW_EXISTING_USER_ERROR_MSG
        emailRegex: "/^([a-zA-Z0-9_\\.\\-\\+])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$/",
        pwdRegex: "/^.{6,}$/",
        varChg: "CHG",
        varReg: "REG",
        pwdminchara: "6"
    },
    newsletter: {
        email: "E-mail address to receive newsletters"
    },
    vnc: {
        urltext: "values",
        integpath: "contentmanagerdata/sites/aspnet/"
    },
    search: {
        value: ""
    },
    zoom: {
        error: "The image could not be loaded."
    },
    paging: {
        perpage: parseInt("100"),
        seeall: "view all",
        counter: "{0} of {1}",
        spacernth: "4n+1",
        spacerclass: "body_content_item_spacer"
    },
    giftwrapping: {
        maxlength: parseInt("255"),
        remaining: "{0} characters remaining.",
        giftmsg: "Gift Message",
        giftwrp: "Gift Box"
    },
    storelocator: {
        addressformat: "{0} {1} {2} {3}, {4}", //{0}=address {1}=city {2}=postcode {3}=state {4}=country
        nofound: "No shop found.",
        zoom: parseInt("4"),
        latitude: parseFloat("37.09024"),
        longitude: parseFloat("-95.1289")
    },
    url: {
		suggestSearchService: "http://query.published.live1.suggest.us1.fredhopperservices.com/bodyshop_us/jscript?scope=//universeus/en_US&search=",
     	searchService: "http://search-ame.thebodyshop.com/v1/en-us/products",
        error500: "/404.asp",
        search: "{0}?q={1}",
		searchtargeturl: "/search.aspx",
        addtobag: "/ajax/addsingleproduct.aspx?varcode={0}&qty={1}",
        favorite: "/ajax/favorite.aspx?action={0}&prdcode={1}",
        outofstock: "/ajax/outofstocknotification.aspx?prdcode={0}",
        refreshbag: "/ajax/refreshbag.aspx",
        refreshbagCGF: "/ajax/refreshbagCGF.aspx",
        quickshop: "/ajax/quickshop.aspx?catcode={0}&prdcode={1}",
        orderdetails: "/ajax/orderdetails.aspx?id={0}",
        shippingmethod: "/ajax/shippingmethod.aspx?code={0}",
        opcrefreshbag: "/ajax/opc-refreshbag.aspx",
        opccustomer: "/ajax/opc-customer.aspx?save={0}&time=" + Math.round(Math.random() * 1000),
        opcsignature: "/ajax/opc-signature.aspx",
        opcrefreshshipmethod: "/ajax/opc-refresgshipmethod.aspx?time=" + Math.round(Math.random() * 1000),
        storelocator: "/services/storelocator-result.aspx?address={0}",
        addgiftwrapping: "/ajax/giftwrapping.aspx?action=add&code={0}&from={1}&to={2}&message={3}",
        removegiftwrapping: "/ajax/giftwrapping.aspx?action=remove",
        checkLYBNumberFromRegisterPage: "/ajax/CheckCustomerSearch.aspx?LYBNumber=",
        checkLYBNumberFromEditProfilPage: "/ajax/CheckCustomerSearch.aspx?LYBNumber=",
        loveyourbodyinfo: "/account/members/love_your_body_info.aspx?",
        updateaddressbook: "/ajax/addressbook_edit.aspx?time=" + Math.round(Math.random() * 1000),
        SiteLanguagePath: "", //please do not delete even if it is emptyy for USA, it is referenced elswehere to make cerain js functions same between us and canada
        microbasket: "/ajax/microbasket.aspx",
        outofstocknotification: "/ajax/outofStock_notification_popup.aspx?varcode={0}",
        urlEmptyShoppingCart: "basket.aspx",
        urlPaymentMyBag: "/ajax/checkout_my_bag.aspx?PAGE_NAME=payment",
        urlPaymentPromoSection: "/ajax/payment_promo_section.aspx",
        urlPaymentSetBillAsDefaultShip: "/ajax/set_billing_as_defaultshipping.aspx",
        urlPaymentGiftCardDetails: "/ajax/payment_giftcard_details.aspx",
        urlGetDefaultAddress: "/ajax/checkout_getDefaultAddress.aspx",
        urlSetAddress: "/ajax/checkout_setAddress.aspx",
        urlVerifyAddress: "/ws/ajax/QAS_ODWS.asmx/VerifyAddressFromInput",
        urlAddGiftCardDetails: "/ajax/giftcard/tpGiftCardQuery.aspx",
        urlRemoveGiftCardDetails: "/ajax/giftcard/tpGiftCardRemoveQuery.aspx",
        urlUpdateGiftCardDetails: "/ajax/giftcard/TpGiftCardUpdate.aspx ",
        urlAuthorizeGiftCardDetails: "/ajax/giftcard/tpGiftCardAuthorization.aspx",
        urlPostPayment: "/ajax/giftcard/tpGiftPostPayment.aspx",
        urlRefreshDeliveryOption: "/ajax/refreshDeliveryOption.aspx",
        urlBasketCheckout: "/checkout/mybasket.aspx",
        urlRecommendations: "http://search-ame.thebodyshop.com/v1/en-us/recommendations/{0}?callback=?",
        urlForgotPassword: "/ajax/forgotpassword_popup.aspx",
        urlLoginPageNew:"/account/signin.aspx",
        urlOrderReceiptPageNew:"/checkout/orderreceipt.aspx",
        urlOrderFailedPage: "/checkout/receipt-failed.aspx",
        urlLoginPageNew: "/account/signin.aspx",
		urlPayPalPrePayECS: "/checkout/paypal_prepayment.aspx?express=true",
		urlPayPalPrePayECM: "/checkout/paypal_prepayment.aspx",
		urlPayPalPrePayECMMob: "/checkout/paypal_prepayment.aspx?isMobile=true",
		urlPayPalPostPayECS: "/checkout/paypal_postpayment.aspx?updateOrder=true",
		urlPayPalPostPayECSMob: "/checkout/paypal_postpayment.aspx?updateOrder=true&isMobile=true", 
		urlPayPalGuestLogin: "/ajax/paypal_express_guest_user.aspx",
		urlPayPalShippingAddr: "/ajax/update-shippingaddress-from-paypal.aspx?isMobile={0}&AddrID={1}&ST={2}",
		urlPayPalBillingAddr: "/ajax/checkout_single_address.aspx?AddrID={0}&ST={1}",       
		urlPayPalReviewAJAX: "/ajax/update-shippingaddress-from-paypal.aspx?PAGE_NAME=paypalmerchantreview&isMobile={0}",
		urlAdobeTrackRemovedProduct: "/ajax/adobe_track_removed_product.aspx",
        chatStatus: "//chat.thebodyshop-usa.com/v03/providers/Bodyshop/tvchat/button/?callback=?",
        chatApp: "//chat.thebodyshop-usa.com"
    },
    messages: {
        AddressEditError: "Some of the below information is incorrect. Please check the information printed.",
        IncorrectFormatLybNumber: "Please enter a valid Love Your Body <sup>TM</sup> card number (only digit and a maximum of 16 digits).",
        RulesFormatLybNumber: "The lyb number consists of 11 digits.",
        Error404: "Error 404: The page no longer exists.",
        LybNumberAlreadyExists: "Oops, this Love Your Body <sup>TM</sup> card number is already registered. Please enter another card number.",
        LybExpiredCardNumber: "Your Love Your Body <sup>TM</sup> card number is expired. You can buy a review card.",
        LybInvalidCardNumber: "This Love Your Body <sup>TM</sup> card number is expired or invalid. Please try again.",
        LybServiceNotAvailable: "Please enter a valid Love Your Body <sup>TM</sup>card number (only digit and a maximum of 16 digits)",
        LybMissingCardNumber: "Love Your Body <sup>TM</sup> card number is missing. Please enter a valid card number.",
        ErrorDuringTheQuery: "Error during the query!",
        QasPartialAddressFound: "Your address have been recognized but appears to have some inconsistencies, please select a correct address on the list below or go back to form and check what you typed in.",
        QasNoAddressFound: "Your address cannot be verified, please go back to the form and check what you typed in.",
        QasVerifiedAndUpdatedAddress: "Your address has some inconsistencies and this is the proposed address.<br /> Please click on Update button to save this address.",
        QasAddressTobeSaved: "The following address will be saved :<br /><br />",
        QasEnterNumber: "Enter number between ",
        QasInvalidNumber: "Please enter a valid number",
        InvalidAccountNumber: "",
        LybPrefix: "",
        showLabel: 'Show',
        hideLabel: 'Hide',
        msgAddrDelConfirmation: "<div id='popup-message'><header> <hgroup><h1 class='title'>Delete Confirmation</h1> <span class='close'>Close<span class='visual'>X</span></span></hgroup></header><div class='message-detail'> Are you sure you want to delete this address?    <div class='buttonparent'><div class='button greenbutton' id='deleteyes'> Yes</div> <div class='button greenbutton' id='deleteno'> No</div>   </div></div></div>",
		msgOpcOrderconfirmationMsg:"<div id='popup-message'><header> <hgroup><h1 class='title'>Order Confirmation</h1> <span class='close'>Close<span class='visual'>X</span></span></hgroup></header><div class='message-detail'>Please note that once order is placed your order can't be cancelled.</div><div class='buttonparent'><div class='button greenbutton' id='deleteyes'> Yes</div> <div class='button greenbutton' id='deleteno'> No</div>   </div></div>",
        msgOpcDeliveryMoreDetails: '  More Information',
        msgBasketSamplesToolTip: "<div id='basket-tip'><div class='msg-heading'><span class='msg-sub-info'>Please note:&nbsp;</span></div><div class='msg-description'>Maximum number of free samples have been selected. Please remove a sample to select a different one.</div></div></div></div>",
        OpcDeliveryInfoTitle: 'Shipping Option Information',
        OpcDeliveryInfoClose: 'CLOSE',
        OpcDeliveryInfoCloseSymbol: 'X',
        OpcDeliveryInfoText: 'Express delivery is not available for this order as some items in your basket are not eligible for Express delivery.',
        msgForgotPasswordThanks: "Thank You. Your password has been sent.",
        msgForgotPasswordEnterEmailAddress: "please enter the E-mail Address",
        msgDeletionDefaultShipping: "Default shipping address cannot be deleted",
        msgDeletionDefaultBilling: "Default billing address cannot be deleted",
        noRefreshOrBackButton:"Your order is under process. Please do not hit the browser refresh or back button until your order is completed.",
        Opc: {
            billingnew: "Please, enter your default billing address (account information).",
            billingupdate: "Please, be aware that by entering a new billing address you will automatically update your account information (default billing address) !",
            billingsuccess: "Thank you, your default billing address (account information) is registered.",
            shippingnew: "Please, enter a new shipping address for this order (note that the nickname of this address must be a new one). Sorry, we do not ship outside the US, to PO Boxes or APO addresses.",
            shippingsuccess: "Thank you, your shipping address for this order is registered.",
            existingdispname: "We're sorry but the name of your address already exists, please choose another one.",
            ajaxerror: "We're sorry, an error occurred while processing your request. Please try again.",
            paymenterror: "Oops! Please make sure you fill out all of the required fields highlighted in pink!",
            errorgiftcardauthorization: "Error at gift card authorization, please retry.",
            cybersource: {
                error1: "There was an error processing your payment. Please re-enter your payment information and try again.",
                //error1: "Oops! Please make sure you fill out all of the required fields highlighted in pink!",
                error2: "There was an error processing your payment. Please try again.",
                error3: "Your credit card was declined. Please check your billing information.",
                error4: "Your credit card was declined. Please try a different card.",
                error5: "Please check your CVN."
            }
        }
    },
    packshot: {
        variants: "/img/packshot/variants/{0}_l.jpg",
        shades: "/img/packshot/shades/{0}_l.jpg",
        shadestitle: "/img/packshot/shadestitle/{0}_title_l.gif",
        zoom: "/images/packshot/products/zoom/{0}_z.jpg",
        variantzoom: "/img/packshot/shades/{0}_z.jpg",
        shadesmedium: "/img/packshot/shades/{0}_s.jpg",
        variantLargeImg: '/img/packshot/shades/{0}_m.jpg',
        productmedium: "/images/product/Medium/{0}_m.jpg"
    },
    cardtypecode: {
        maestro: "024",
        amex: "003"
    },
    popin: {
        id: Array("oosDialog", "productZoom", "popin_login", "popin_favorite", "addressBookEditDialog", "giftwrappinglayout", "newsZoom", "LybConditionsDialog", "loginAjaxDialog", "qasAddressEditDialog", "lyblearnmorelayout", "shiprateslayout", "returnpolicylayout", "LinkLYBAjaxLoginDialog", "LinkLYBAjaxRegisterDialog", "LinkLYBAjaxCustEditDialog", "lybsuccesspopindialog"),
        size: {
            width: Array(523, 523, 320, 320, 523, 320, 523, 523, 320, 523, 395, 564, 564, 320, 320, 320, 320), // the Id popin define in "loc.popin.id[0]" have the width define in "loc.popin.size.width[0]"
            height: Array(250, "auto", "auto", 150, 500, "auto", "auto", "auto", 300, 450, "auto", "auto", "auto", "auto", "auto", "auto", "auto") // the Id popin define in "loc.popin.id[1]" have the height define in "loc.popin.size.height[1]"
        }
    },
    regex: {
        Opc: {
            accountnb: "^[0-9]{16}$", 	//"^[0-9 ]{16}$","^[0-9]{3,4}$"
            accountnbamex: "^[0-9]{15}$", 	//"^[0-9 ]{16}$","^[0-9]{3,4}$"
            cvndefault: "^[0-9]{3}$",     //"^[0-9]{3,4}$"
            cvnamex: "^[0-9]{4}$",
            zipcode: "^[0-9]{5}(-[0-9]{4})?$"
        }
    },
    basket: {
        locFreeSampleMaxCount: '3',
        locbasketpagepath: '/checkout/mybasket.aspx',
        urlAddGiftWrap: '/ajax/gift_popup.aspx',
        urlDeliveryOption: '/ajax/shippingmethod.aspx?code={0}',
        urlMyBag: '/ajax/basket_my_bag.aspx',
        urlCommonPopup: '/ajax/common_info_popup.aspx',
        urlAddGiftToBasket: '/ajax/giftwrapping.aspx?action=add&code={0}&from={1}&to={2}&message={3}',
        urlRemoveGiftFrmBasket: '/ajax/giftwrapping.aspx?action=remove',
        urlAddFreeGift: '/ajax/basket_free_gifts.aspx',
        urlAddFreeSample: '/ajax/basket_free_samples.aspx',
        urlHeaderMicroBasket: '/ajax/refreshbag.aspx',
        urlLogout: '/ajax/basket_logout.aspx',
        constDeliveryInfoTitle: "LOC_SW_BASKET_DELIVERY_INFO_POPUP_TITLE",
        constDeliveryInfoContent: "LOC_SW_BASKET_DELIVERY_INFO_POPUP_CONTENT",
        constPromoHelpTitle: "LOC_SW_PROMO_NEEDHELP",
        constPromoHelpContent: "LOC_SW_PROMO_NEEDHELP_CONTENT",
        constGiftHelpContent: "LOC_SW_GIFT_NEEDHELP_CONTENT",
        ajaxerror: "We're sorry, an error occurred while processing your request. Please try again.",
        refreshlyb: "/ajax/refreshbasketlybpromo.aspx",
        loginlinkaccountpopup: "/ajax/rewards_login_account_popup.aspx",
        createaccountpopup: "/ajax/rewards_create_account_popup.aspx",
        cardnumber: "?CardNumber={0}",
        lybproductid: "25544",
        lybrenewproductid: "26243",
        lybproductqty: "1",
        lybmembererror: "Great news! You already have an active Love Your Body™ number linked to your account.",
        refreshpromobanner: "/ajax/refreshpromobanner.aspx",
        urlStaticLinks: "/ajax/termsPopup.aspx",
        lybcardid: "prod1620004",
        giftoptionid: "dummy-gift-message",
        deliveryTermsCondition: "termsconditionsdelivery;301"
    },
    config: {
        constDeliveryOptSMSText: "Y6;",
        constYearlyHolidayList: "01 Jan,26 Jan,02 Feb,21 Mar,23 Mar,20 Apr,15 Aug,14 Oct,30 Nov,25 Dec",
        constWeeklyHolidayList: "6,0", //Saturday, Sunday
        constMonthList: "January,February,March,April,May,June,July,August,September,October,November,December",
        constDateSuffixs: "st,nd,rd,th",
        constATPFlag: "OFF",
        wcConfigCookieFlag: "OFF", // Code to ON/OFF COOKIES FLAG IN NEW CHECKOUT & NEW MY ACCOUNT PAGE
        wcConfigCookiePercent: parseInt("100"),
        adobeConfig:"ON",
		configPaypalPaymentAvailable: "ON",
		wcGlobalAjaxHandlingFlag: "ON" // Flag to enable/disable the global Ajax Error Handling
    },
    address: {
        addresscheck: "/ajax/checkout-addressbook.aspx",
        noShippingText: "LOC_MYSPACE_ADDRESSBOOK_NOSHIPPING_TXT",
        noShippingTitle: "LOC_MYSPACE_ADDRESSBOOK_NOSHIPPING_TITLE",
		noShippingTextPayPal:"LOC_SW_PAYPAL_SHIPPNG_ADDR_ERROR"
    },
    subscription: {
        subscriptioncheck: "/ajax/myaccount-subscription.aspx",
        subscription_popup: "/ajax/myaccount-subscription_popup.aspx"
    },
    delivery: {
        addgiftwrapping: "/ajax/gift_popup.aspx",
        editaddress: "/ajax/edit-address.aspx",
        addaddress_popup: "/ajax/add-address_popup.aspx",
        rewardScheme_popup: "/ajax/rewards_scheme_popup.aspx",
        rewardlinkaccount_popup: "/ajax/rewards_link_account_popup.aspx",
        addLYBToBag: "/ajax/addlybproduct.aspx?varcode={0}&qty={1}",
        countrylistpopup: "/ajax/country_popup.aspx",
        mypath: "/ajax/CheckLYBNumber.aspx?LYBNumber=",
        deliveryAddressCheck: "/ajax/checkout-address-check.aspx?PAGE_NAME=delivery",
        customerCommunication: "/ajax/customer-communication.aspx",
        custPropertyUpdate: "/ajax/customerpropertyupdate.aspx",
        checkoutMyBag: "/ajax/checkout_my_bag.aspx?PAGE_NAME=delivery",
        deliveryOption: "/ajax/delivery_options.aspx",
        refreshlyb: "/ajax/refreshlybpromo.aspx",
        giftoption: "Gift Wrap",
        actionSubmitted: false,
        submitEnabled: false,
        specialvarcode: {
            giftwrap: "GIFTWRAP",
            giftmsg: "GIFTMSG"
        },
        urlCheckoutPaymnt: "/checkout/payment.aspx",
        useDeliveryNumberPopupTitle: "LOC_SW_USE_DELIVERY_NUM_TITLE",
        useDeliveryNumberPopupContent: "LOC_SW_USE_DELIVERY_NUM_CONTENT"
    },
    errormsgs: {
        ajaxerror: "We're sorry, an error occurred while processing your request. Please try again.",
        emptypostcode: "Postcode cannot be empty. <span class='closeBtn'>Close the window</span> and please enter a valid postcode.",
        LybNumberAlreadyExists: "Oops! This Love Your Body&#8482; number is already registered. Each card can only be linked to ONE account. Please provide another number.",
        Error404: "Error 404 : File not found !",
        ErrorDuringTheQuery: "Error during the query !",
        LybMissingCardNumber: "Oops! Please provide a valid Love Your Body&#8482; number.",
        LybServiceNotAvailable: "Sorry, but the Love Your Body&#8482; service can not be reached at this point, please try again later to link your card to your account.",
        LybInvalidNumber: "The LYB number field contains characters which are not allowed (only 9 digit) !",
        errorheader: "Some of the information below is incorrect or missing. Please verify the information highlighted.",
        invalidpostcode: "Postcode entered is invalid. <span class='closeBtn'>Close the window</span> and please amend your entry.",
        LybNumberAlreadyExists: "Oops! This Love Your Body&#8482; number is already registered. Each card can only be linked to ONE account. Please provide another number.",
        errorsignature: "We're sorry, your shipping address couldn't be verified, please try again.",
        invalidEmail: "Please enter a valid email address",
        missingEmailInput: "The email field is mandatory",
        invalidPassword: "Please enter a valid password",
		errPayPal223: "PayPal rejected the transaction. Please try again.",
		errPayPal233: "The billing or shipping address supplied is not valid, please rectify or select another means of payment.",
		errPayPal238: "PayPal rejected the transaction. A successful transaction was already completed for this PayPal Token."
    },
    Var: {
        alphanum: "[a-zA-Z0-9 ]+$",
        alphanumeric: "[a-zA-z0-9]*[0-9]+[a-zA-z0-9]*",
        alphanumspecial: "[a-zA-Z0-9 '-]+$",
        currentAddressUsingQas: " ",
        rewardSchemePopupTitle: "LOC_SW_REWARDS_SCHEME_POPUP_TITLE",
        rewardSchemePopupContent: "LOC_SW_REWARDS_SCHEME_POPUP_CONTENT",
        paymentOptionsPopupContent: "LOC_SW_PAYMENT_OPTIONS_MORE_INFO_CONTENT",
        paymentOptionsPopupTitle: "LOC_SW_PAYMENT_OPTIONS_MORE_INFO_TITLE",
        currentAddressUsingQas: "",
        deliveryoptionspopuptitle: "LOC_SW_DELIVERY_OPTIONS_TITLE",
        deliveryoptionspopupcontent: "LOC_SW_ONEPAGESHIPMETHOD_SHIPPING_DESCRIPTION",
        urlcountrylistpopup: "Country List Information",
        flag: true,
        ninedigitregex: "^[0-9]{0,16}",
        intGiftMsgMaxLength: parseInt("255"),
        emailregex: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
        emailregexp: "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$",
		constEmpty: "EMPTY",
		constLength: "LENGTH",
		constInvalid: "INVALID",
		constNotMatch: "NOTMATCH",
		regexCustName: "^[\\sA-Za-z0-9@./&?'+(),\\-]+$",
		regexCustNameReplace: "[^\\sA-Za-z0-9@./&?'+(),\\\\-]",
		regexCustNameSplit: "[?.\\-@,&+\\s]"
    },
    payment: {
        paymentaccountnb: "^[0-9]{12,19}$", 	//"^[0-9 ]{16}$",
        paymentcvnb: "^[0-9]{3,4}$", 				//"^[0-9 ]{1,4}$",
        paymentissuenb: "^[0-9]+$",
        opccustomer: "/ajax/opc-customer_payment.aspx",
        mybag_edit_popup: "/ajax/payment_mybag_edit.aspx",
        shipping_options: "/ajax/shippingmethod.aspx",
        shipping_options: "/ajax/shippingmethod.aspx",
        paymentAddressCheck: "/ajax/checkout-address-check.aspx?PAGE_NAME=payment",
        grouponDetails: "/ajax/groupon_message.aspx",
        grouponCustomersTitle: "LOC_SW_GROUPON_CUSTOMER_HEADER",
        rewardDobTermsConditions_popup: "/ajax/rewards_dob_termsconditions_popup.aspx",

        GiftCard: {
            ErrorGiftCardEmpty: "We're sorry. Your card number and PIN are mandatory."
        }

    },
    myaccount: {
        urlNewMyAccountIndex:"https://secure.thebodyshop-usa.com/account/members/index.aspx",
        urlOldMyAccountIndex: "https://secure.thebodyshop-usa.com",
        urlNewRegisterPage: "https://secure.thebodyshop-usa.com/account/register.aspx",
        urlOldRegisterPage: "https://secure.thebodyshop-usa.com",
        orderhistory_popup: "/ajax/orderhistory_detail.aspx",
        strErrorType: "",
        strPageName: "",
        orderhistory_noofrows: "5",
        orderhistorydetails_noofrows: "3",

        changepwd: {
            ErrorChangePwdEmpty: "Please verify, required field(s) should not be empty.",
            ErrorChangePwdLength: "Please verify, the new password and confirm password should be same and have a minimum of 6 characters. ",
            ErrorChangePwdMismatch: "Please verify, the password fields must include atleast one number.",
            ErrorChangePwdServer: "Unable to change password. Please include atleast one number in your new password and confirm again.",
            SuccessMsgChangePwd: "Password has been changed successfully !!!"
        },

        register: {
            ErrorEmailAddressInvalid: "Please enter a valid E-Mail address",
            ErrorTextInvalid: "Please Verify,Some of the values entered are incorrect",
            ErrorPasswordInvalid:"",
            ErrorRegisteredEmail:""
        }
    },
    LYBProduct: {
        constLYBProductVarCode: parseInt("25544"),
        constLYBProductRenewVarCode: parseInt("26243"),
        constLYBProductVarQunatity: parseInt("1")
    },
    confirmation: {
        stsuffix: "st",
        ndsuffix: "nd",
        rdsuffix: "rd",
        thsuffix: "th",
        errorPage: "index_postpayment_error.aspx",
        facebookLike: "//connect.facebook.net/en_US/all.js#xfbml=1",
        order: {
            info: {
                customerId: "",
                transactionId: ""
            },
            line: {
                item: {
                    id: Array(),
                    prdcode: Array(),
                    name: Array(),
                    url: Array(),
                    quantity: Array(),
                    priceUnit: Array(),
                    priceApplied: Array(),
                    amountUnit: Array(),
                    amountApplied: Array()
                },
                total: {
                    amountUnit: 0,
                    amountApplied: 0
                }
            },
            basket: {
                amountTotal1NoPromo: 0,
                amountTotal2WithLinePromo: 0,
                amountTotal3WithAllPromo: 0,
                amountShip: 0,
                amountTax: 0,
                amountDiscount1Line: 0,
                amountDiscount2Basket: 0,
                amountDiscount3All: 0
            }
        }
    },
    from: {
        fromLabelText: "From"
    }
});