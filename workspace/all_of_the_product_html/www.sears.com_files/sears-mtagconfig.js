var lpMTagConfig = {

    "lpServer": "sales.liveperson.net",

    "lpNumber": "37457093",

    "lpProtocol": (location.href.indexOf("https:") == 0) ? "https" : "http",

    "lpTagLoaded": false,

    "lpTagSrv": "r1.liveperson.net",

    "pageStartTime": (new Date())

        .getTime()

};



lpMTagConfig = $.extend(lpMTagConfig, {

    pageVar: [],

    sessionVar: [],

    visitorVar: [],

    onLoadCode: [],

    dynButton: [],

    ifVisitorCode: [],

    defaultInvite: 'chat-' + lpUnit + '-' + lpLanguage,

    calculateSentPageTime: function() {

        var t = (new Date())

            .getTime() - lpMTagConfig.pageStartTime;

        lpAddVars('page', 'pageLoadTime', Math.round(t / 1000) + " sec");

    },

    notifySears: function(bName, channel) {

        var lpImg = new Image(),

            src = '';

        if ( !! omCat) {

            src = "//searscom.112.2O7.net/b/ss/searscom/1/H.9--NS/0?v36=" + bName + "-" + omCat;

        } else if (catPageName !== "" && catPageName != "undefined") {

            src = "//searscom.112.2O7.net/b/ss/searscom/1/H.9--NS/0?v36=" + bName + "-" + catPageName;

        }

        if (typeof channel !== 'undefined') {

            src += '&channel=' + channel;

        }

        lpImg.src = src;

    }

});



function lpAddVars(scope, name, value) {

    var tag;

    if (name.indexOf('OrderTotal') !== -1 || name.indexOf('OrderNumber') !== -1) {

        if (value === '' || value == 0) {

            return;

        } else {

            lpMTagConfig.sendCookies = false;

        }

    }

    value = trim(value.toString());

    tag = escape(name) + "=" + escape(value);

    switch (scope) {

        case "page":

            lpMTagConfig.pageVar.push(tag);

            break;

        case "session":

            lpMTagConfig.sessionVar.push(tag);

            break;

        case "visitor":

            lpMTagConfig.visitorVar.push(tag);

            break;

    }

}



function lpAddMonitorTag(src) {

    if (!lpMTagConfig.lpTagLoaded) {

        if (typeof(src) == 'undefined' || typeof(src) == 'object') {

            if (lpMTagConfig.lpMTagSrc) {

                src = lpMTagConfig.lpMTagSrc;

            } else {

                if (lpMTagConfig.lpTagSrv && lpMTagConfig.lpProtocol == 'http') {

                    src = lpMTagConfig.lpProtocol + "://" + lpMTagConfig.lpTagSrv + '/hcp/html/mTag.js';

                } else {

                    src = '/hcp/html/mTag.js';

                }

            }

        }

        if (src.indexOf("http") != 0) {

            src = lpMTagConfig.lpProtocol + "://" + lpMTagConfig.lpServer + src + "?site=" + lpMTagConfig.lpNumber;

        } else {

            if (src.indexOf("site=") < 0) {

                if (src.indexOf("?") < 0) {

                    src = src + "?";

                } else {

                    src = src + "&";

                }

                src = src + "site=" + lpMTagConfig.lpNumber;

            }

        }

        var s = document.createElement("script");

        s.setAttribute("type", "text/javascript");

        s.setAttribute("charset", "iso-8859-1");

        s.setAttribute("src", src);

        document.getElementsByTagName("head")

            .item(0)

            .appendChild(s);

    }

}



function lpSendData(varscope, varname, varvalue) {

    if (typeof lpMTag !== "undefined" && typeof lpMTag.lpSendData) {

        lpMTag.lpSendData(varscope.toUpperCase() + "VAR!" + varname + "=" + varvalue, true);

    }

}



function onloadEMT() {

    if (lpMTag.lpBrowser === "IE" && document.cookie.length > 1000) {

        lpMTagConfig.sendCookies = false;

    }

}



function decodeCatPage(str) {

    return str.split("&")

        .join("&");

}



var vertPageName = "",

    catPageName = "",

    subcatPageName = "",

    el, arr, url, btns = [];

if (typeof lpUnit === "undefined") {

    if($('div.container-fluid').find('div#page-container').length>0){

        var lpUnit = 'Sears';

    } else {

        var lpUnit = 'sears';

    }

}

if (typeof lpLanguage === "undefined") {

    var lpLanguage = 'english';

}



if (typeof omPrefix === 'undefined') {

    var omPrefix = '';

}

if('|home|CSHome|CSdelivery|freestorepickup|CSpricematch|CSreturns|5MinutePickupInStore|CSshipping|CSInternationalShipping|International Vendors|CStermsofservice|License Information|CSreturnsPolicy|CScaSupplyChain2010|CScaliforniaprivacy|CSpricing|CSprivacy|PaymentMethod|CSIntBasedAds|CSsecure|CSnutrition|CSrecycling|ProtectionAgreements|CSrecalls|CSwarrantyinformation|CSrebates|Product Manuals|CSSYWFaq|CSLayawayFaq|gclanding|CSeMail|'.indexOf('|'+omVrt+'|') !== -1){
	omVrt = 'CSHome';
	omLevels = omVrt;
}
if(omPrefix === "Return in 5 > Home"){
	omVrt = 'CSHome';
	omLevels = omVrt;
}


if (typeof omLevels !== 'undefined') {

    var omLevelString = omLevels.split('_');

		if (omPrefix == "Vertical") {

			var omVrt = omLevelString.shift();

		} else if (omPrefix == "Category") {

			var omVrt = omLevelString.shift();

			var omCat = omLevelString.shift();

		} else {

			var omVrt = omLevelString.shift();

			var omCat = omLevelString.shift();
			if (omLevelString.length > 0) {
				var omSubCat = omLevelString.pop();
			}

		}

    // Assign the rest of the remaining categories, if there are any.
if (omLevelString.length > 0) {
        $(omLevelString)

            .each(function(index, value) {

                lpAddVars("page", "omCat" + index, omLevelString[index]);

            });

    }

}



lpMTagConfig.onLoadCode.push(onloadEMT);

lpAddVars("page", "unit", lpUnit);

lpAddVars("session", "language", lpLanguage);

lpAddVars('page', 'PageTitle', document.title);

lpAddVars('session', 'PageTitleS', document.title);

if (location.href.indexOf('/p_10153_12605') > -1) {

    el = $('#subCategoryDisplayURL');

    if (el.length) {

        url = el.val();

        if ( !! url) {

            arr = url.split("_");

            if (arr.length) {

                vertPageName = decodeCatPage(arr[3]);

                catPageName = decodeCatPage(arr[4]);

                subcatPageName = decodeCatPage(arr[5]);

            }

        }

    }

}



el = $('#subCategoryDisplayURL');

if (el.length) {

    lpAddVars('page', 'subCategoryDisplayURL', el.val());

}

el = $('#shipStock');

if (el.length) {

    lpAddVars('page', 'shipStock', el.val());

}

el = $('#vcsVertical');

if (el.length) {

    lpAddVars('page', 'vcsVertical', el.val());

}

if (!omVrt && !vertPageName) {

    omVrt = "general";

} else if (!omVrt && vertPageName !== "" && vertPageName != "undefined") {

    omVrt = vertPageName;

}

lpAddVars('page', 'omVrt', omVrt);



if ( !! omCat) {

    lpAddVars('page', 'omCat', omCat);

} else if (catPageName !== "" && catPageName != "undefined") {

    lpAddVars('page', 'omCat', catPageName);

}

if ( !! omSubCat) {

    lpAddVars('page', 'omSubCat', omSubCat);

} else if (!omSubCat && subcatPageName !== "" && subcatPageName != "undefined") {

    lpAddVars('page', 'omSubCat', subcatPageName);

}

if (typeof isNewPDP !== "undefined") {

    lpAddVars('page', 'isNewPDP', isNewPDP);

}

if (typeof lpOrderTotal !== "undefined") {

    lpAddVars('page', 'OrderTotal', lpOrderTotal);

    lpAddVars('page', lpUnit + '_OrderTotal', lpOrderTotal);

}

if (typeof lpAppliancesTotal !== "undefined" && lpAppliancesTotal !== "" && lpAppliancesTotal > 0) {

    lpAddVars('page', 'sears_appliances_orderTotal', lpAppliancesTotal);

}

if (typeof lpAutomotiveTotal !== "undefined" && lpAutomotiveTotal !== "" && lpAutomotiveTotal > 0) {

    lpAddVars('page', 'sears_automotive_orderTotal', lpAutomotiveTotal);

}

if (typeof lpElectronicsTotal !== "undefined" && lpElectronicsTotal !== "" && lpElectronicsTotal > 0) {

    lpAddVars('page', 'sears_electronics_orderTotal', lpElectronicsTotal);

}

if (typeof lpLawnandGardenTotal !== "undefined" && lpLawnandGardenTotal !== "" && lpLawnandGardenTotal > 0) {

    lpAddVars('page', 'sears_lawngarden_orderTotal', lpLawnandGardenTotal);

}

if (typeof lpFitnessTotal !== "undefined" && lpFitnessTotal !== "" && lpFitnessTotal > 0) {

    lpAddVars('page', 'sears_fitness_orderTotal', lpFitnessTotal);

}

if (typeof lpToolsTotal !== "undefined" && lpToolsTotal !== "" && lpToolsTotal > 0) {

    lpAddVars('page', 'sears_tools_orderTotal', lpToolsTotal);

}

if (typeof lpHomeTotal !== "undefined" && lpHomeTotal !== "" && lpHomeTotal > 0) {

    lpAddVars('page', 'sears_home_orderTotal', lpHomeTotal);

}

if (typeof lpGeneralTotal !== "undefined" && lpGeneralTotal !== "" && lpGeneralTotal > 0) {

    lpAddVars('page', 'sears_general_orderTotal', lpGeneralTotal);

}

if (typeof lpOutDoorLivingTotal !== "undefined" && lpOutDoorLivingTotal !== "" && lpOutDoorLivingTotal > 0) {

    lpAddVars('page', 'sears_outdoor_orderTotal', lpOutDoorLivingTotal);

}

if (typeof lpShoesTotal !== "undefined" && lpShoesTotal !== "" && lpShoesTotal > 0) {

    lpAddVars('page', 'sears_shoes_orderTotal', lpShoesTotal);

}

if (typeof lpOrderNumber !== "undefined") {

    lpAddVars('page', 'OrderNumber', lpOrderNumber);

    lpAddVars('page', lpUnit + '_OrderNumber', lpOrderNumber);

}

if (typeof prodBrand !== "undefined") {

    lpAddVars('page', 'productBrand', prodBrand);

}

el = $('#isSRESEligible');

if (el.length) {

    lpAddVars('page', 'isSRESEligible', el.val());

}

el = $('#isSPUEligible');

if (el.length) {

    lpAddVars('page', 'isSPUEligible', el.val());

}

lpAddVars('page', 'noliveperson', $('#clickToTalkFlag')

    .val() === 'true' ? 1 : 0);

lpAddVars('page', 'waterheat', omPrefix === 'Product Summary' && omVrt === 'Appliances' && omCat === 'Water Heaters' ? 1 : 0);

if (omPrefix === 'Product Summary' && typeof isPool !== "undefined" && (isPool == 1 || isPool == 0)) {

    lpAddVars('page', 'POOL ', isPool);

}

if (omPrefix === 'Product Summary' && typeof kingmattress !== "undefined" && (kingmattress == 1 || kingmattress == 0)) {

    lpAddVars('page', 'FTH_BEDRM_MTTRS_Type', kingmattress);

}

el = $('#isInStock');

if (el.length) {

    lpAddVars('page', 'isInStock', el.val());

}

el = $('#pickUpEnable');

if (el.length) {

    lpAddVars('page', 'pickUpEnable', el.val());

}

el = $('#nextDayDeliveryEligible');

if (el.length) {

    lpAddVars('page', 'nextDayDeliveryEligible', el.val());

}

var price = $('#p0_price')

    .find('.youPay')

    .find('.pricing')

    .html();

if ( !! price) {

    lpAddVars('page', 'productPrice', price.substring(price.indexOf('$') + 1));

}



function lpPopulateCartVariables(mmlTotalPrdCount, mmlTotalPrice, userLoginType) {

    if (typeof mmlTotalPrice !== "undefined" && mmlTotalPrice !== null) {

        mmlTotalPrice = trim(mmlTotalPrice);

        mmlTotalPrice = mmlTotalPrice.substring(mmlTotalPrice.indexOf('$') + 1);

        lpAddVars('page', 'cartTotal', mmlTotalPrice);

    }

    if (typeof mmlTotalPrdCount !== "undefined" && !! mmlTotalPrdCount) {

        if (mmlTotalPrdCount.indexOf('items') > -1) {

            mmlTotalPrdCount = mmlTotalPrdCount.substring(0, mmlTotalPrdCount.indexOf('items'));

        }

        lpAddVars('page', 'numberCartItems', trim(mmlTotalPrdCount));

    }

    if (typeof userLoginType !== "undefined" && userLoginType !== null) {

        lpAddVars('session', 'userLoginType', trim(userLoginType));

    }

}



btns = [{

    id: 'lpCartDivChat2',

    name: 'sears-cart-sales-english-Chat2'

}, {

    id: 'lpCartDivVoice2',

    name: 'sears-cart-sales-english-Voice2'

}, {

    id: 'lp_battery_Chat',

    name: lpUnit + '-battery-ordernow-sales-english-Chat'

}, {

    id: 'ApplianceChatFooter',

    name: 'sears-chat-footer-appliance-english'

}, {

    id: 'WaterheaterChatFooter',

    name: 'sears-chat-footer-waterheater-english'

}, {

    id: 'ElectronicsChatFooter',

    name: 'sears-chat-footer-electronics-english'

}, {

    id: 'lp_battery_Voice',

    name: lpUnit + '-battery-ordernow-sales-english-Voice'

}, {

    id: 'lp_auto_accessories_Chat',

    name: lpUnit + '-auto-accessories-ordernow-sales-english-Chat'

}, {

    id: 'lp_auto_accessories_Voice',

    name: lpUnit + '-auto-accessories-ordernow-sales-english-Voice'

}, {

    id: 'lpCheckoutDivChat2',

    name: lpUnit + '-mc-checkout-sales-english-Chat-2'

}, {

    id: 'lpCheckoutDivVoice2',

    name: lpUnit + '-mc-checkout-sales-english-Voice-2'

}, {

    id: 'lpOffshoreVoice',

    name: lpUnit + '-voice-offshore-sales-english'

}, {

    id: 'lpVoiceOrderNow',

    name: lpUnit + '-voice-ordernow-sales-english'

}, {

    id: 'csClickTalk',

    name: lpUnit + '-voice-cshome-service-english'

}, {

    id: 'csClickChat',

    name: lpUnit + '-chat-cshome-service-english'

}, {

    id: 'lpFootCall',

    name: lpUnit + '-voice-footer-service-english'

}, {

    id: 'lpFootChat',

    name: lpUnit + '-chat-footer-service-english'

}, {

    id: 'lpOrderNowChat',

    name: lpUnit + '-mc-ordernow-sales-english-Chat'

}, {

    id: 'lpOrderNowVoice',

    name: lpUnit + '-mc-ordernow-sales-english-Voice'

}, {

    id: 'lpOrderNowVoiceTires',

    name: lpUnit + '-mc-ordernow-sales-english-Voice'

}, {

    id: 'csMMHclickTalk',

    name: lpUnit + '-voice-csmmh-service-english'

}, {

    id: 'lpVoiceBTC',

    name: lpUnit + '-voice-personalshopper-btc-english'

}, {

    id: 'lpChatBTC',

    name: lpUnit + '-chat-personalshopper-btc-english'

}, {

    id: 'lpCheckoutDivChat',

    name: lpUnit + '-mc-checkout-sales-english-Chat'

}, {

    id: 'lpCheckoutDivVoice',

    name: lpUnit + '-mc-checkout-sales-english-Voice'

}, {

    id: 'lpPricingInfoDiv',

    name: lpUnit + '-voice-pricinginfo-sales-english'

}, {

    id: 'csClickChatToolBox',

    name: lpUnit + '-chat-cshome-service-english-toolbox'

}, {

    id: 'csClickTalkToolBox',

    name: lpUnit + '-voice-cshome-service-english-toolbox'

}, {

    id: 'lpFootCall-2',

    name: lpUnit + '-voice-footer-service-english-2'

}, {

    id: 'lpFootChat-2',

    name: lpUnit + '-chat-footer-service-english-2'

}, {

    id: 'MattBanClickTalk',

    name: 'banner-mattress-voice-sales-english'

}, {

    id: 'MattBanChat',

    name: 'banner-mattress-chat-sales-english'

}, {

    id: 'WaterBanClickTalk',

    name: 'banner-waterheater-voice-sales-english'

}, {

    id: 'WaterBanChat',

    name: 'banner-waterheater-chat-sales-english'

}, {

    id: 'AppBanClickTalk',

    name: 'banner-appliance-voice-sales-english'

}, {

    id: 'AppBanChat',

    name: 'banner-appliance-chat-sales-english'

}, {

    id: 'ToolsBanClickTalk',

    name: 'banner-tools-voice-sales-english'

}, {

    id: 'ToolsBanChat',

    name: 'banner-tools-chat-sales-english'

}, {

    id: 'AutoBanClickTalk',

    name: 'banner-automotive-voice-sales-english'

}, {

    id: 'AutoBanChat',

    name: 'banner-automotive-chat-sales-english'

}, {

    id: 'NewVoiceButtonDiv',

    name: 'banner-tools-voice-sales-english-1'

}, {

    id: 'NewChatButtonDiv',

    name: 'banner-tools-chat-sales-english-1'

}, {

    id: 'SearsInternationalButtonDiv',

    name: 'sears-international-chat-english'

}, {

    id: 'lpSearsDeliveryHeaderChat',

    name: 'sears-delivery-header-chat-english'

}, {

    id: 'lpSearsDeliveryHeaderVoice',

    name: 'sears-delivery-header-voice-english'

}, {

    id: 'LGChatBanDiv',

    name: 'Sears-chat-lawngarden-banner-english'

}, {

    id: 'LGChatProdDiv',

    name: 'Sears-chat-lawngarden-product-english'

}, {

    id: 'LGVoiceBanDiv',

    name: 'Sears-voice-lawngarden-banner-english'

}, {

    id: 'LGVoiceProdDiv',

    name: 'Sears-voice-lawngarden-product-english'

}, {

    id: 'lpChatBannerButton',

    name: 'sears-chat-banner-outdoor-english'

}, {

    id: 'lpChatProductButton',

    name: 'sears-chat-product-outdoor-english'

}, {

    id: 'lpVoiceBannerButton',

    name: 'sears-voice-banner-outdoor-english'

}, {

    id: 'lpVoiceProductButton',

    name: 'sears-voice-product-outdoor-english'

}, {

    id: 'MattProdClickTalk',

    name: 'sears-voice-product-home-mattress-english'

}, {

    id: 'MattProdChat',

    name: 'sears-chat-product-home-mattress-english'

}, {

    id: 'lpSearsInstallationChat',

    name: 'sears-installation-chat-english'

}, {

    id: 'lpHeaderChatButton',

    name: 'chat-sears-header-english'



}, {

    id: 'asap-banner-chat-div',

    name: 'sears-asap-banner-'+omVrt+'-chat-'+lpLanguage

}, {

    id: 'asap-banner-voice-div',

    name: 'sears-asap-banner-'+omVrt+'-voice-'+lpLanguage

}, {

    id: 'lpViewOnlyVoiceButton',

    name: lpUnit + '-ViewOnly-voice-sales-'+lpLanguage+'-'+ window.viewOnlyPageType

}, {

    id: 'lpChatButton_PDP',

    name: lpUnit+'-chat-'+omVrt+'-'+lpLanguage

},{
	id: 'lp-chat-button_member-dashboard',
	name: 'sears-mdcancel-chat-service-english'
},{
	id: 'lp-voice-button_member-dashboard',
	name: 'sears-mdcancel-voice-service-english'
}];

if ($("#lp_CFPQ")

    .length) {

    if ( !! omVrt) {

        btns.push({

            id: 'lp_CFPQ',

            name: lpUnit + '-voice-cfpq-sales-english-' + omVrt

        });

    } else if (vertPageName !== "" && vertPageName != "undefined") {

        btns.push({

            id: 'lp_CFPQ',

            name: lpUnit + '-voice-cfpq-sales-english-' + vertPageName

        });

    }

}

$.each(btns, function(idx, btn) {

    if ($('#' + btn.id)

        .length) {

        lpMTagConfig.dynButton.push({

            'name': btn.name,

            'pid': btn.id,

            'afterStartPage': true,

            'ovr': 'lpMTagConfig.omniInteg'

        });

    }

});

if (!lpMTagConfig.omniInteg) {

    lpMTagConfig.omniInteg = {};

}

lpMTagConfig.omniInteg.dbClicked = function(objName, status, mcChannel) {

    var objRef, sendStatus = '',

        sendChannel = '',

        bName = '',

        mcBut = typeof mcChannel !== 'undefined';

    try {

        objRef = eval(objName);

        if (mcBut) {

            if (mcChannel == 1) {

                sendChannel = 'chat';

                sendStatus = status.chat.name;

            } else {

                sendChannel = 'voice';

                sendStatus = status.voice.name;

            }

            bName = objRef.butConfig.buttonName;

        } else {

            bName = objRef.buttonName;

            sendStatus = status;

        }

        if (sendStatus === 'online') {

            if (mcBut) {

                lpMTagConfig.notifySears(bName, sendChannel);

            } else {

                lpMTagConfig.notifySears(bName);

            }

        }

    } catch (e) {}

    return true;

};

$(function() {

    lpMTagConfig.calculateSentPageTime();

    lpAddMonitorTag();

});

