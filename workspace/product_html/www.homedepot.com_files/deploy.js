lpAddMonitorTag();
typeof lpMTagConfig!="undefined"&&function(a){lpMTagConfig.isMobile=!1;if(/android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,
4)))lpMTagConfig.isMobile=!0}(navigator.userAgent||navigator.vendor||window.opera);
//DO NOT CHANGE THE BELOW COMMENT
//PLUGINS_LIST=globalUtils,genericEventsBridge,simpleDeploy,typingInvitationText,mobileDeviceDetection
if (typeof(lpMTagConfig.plugins) == 'undefined') {
    lpMTagConfig.plugins = {};
}

lpMTagConfig.pageWindowName = '';

lpMTagConfig.plugins.typingInvitationText = {
    name: 'typingInvitationText',
    config: {
        initialDelay: 1000,
        lineDelay: 0
    }
};

(function() {

function replacePageVarAlreadySet(variable, value) {
    var l = lpMTagConfig.pageVar.length;
    for (var i = 0; i < l; i++) {
        if (lpMTagConfig.pageVar[i].match(variable + '=')) {
            lpMTagConfig.pageVar[i] = variable + '=' + value;
            return true;
        }
    }
    return false;
}

function myIndexOf(myString, word) {
    var len = myString.length;
    var wordLen = word.length;
    for (var i = 0; i < len; i++) {
        var j = 0;
        for (j = 0; j < wordLen; j++) {
            if (myString[i + j] != word[j]) {
                break;
            }
        }
        if (j == wordLen) {
            return i;
        }
    }
    return -1;
}

// Function to scrape Omniture Visitor ID
var s_visIdCookie = getOmnCookie('s_vi');
if (s_visIdCookie != null) {
    var visRegExp = /[0-9A-F]+-[0-9A-F]+/g;
    var s_visId = s_visIdCookie.match(visRegExp);
    if (s_visId !== '') {
        lpAddVars('session', 'OmnitureVisitorID', s_visId);
    }
}

function getOmnCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

var chatChannel = '';
var onShoppingCartPage = false;

lpMTagConfig.plugins.globalUtils = {
    name: 'globalUtils',
    config: {
        dbOvrObj: ['lpMTagConfig.StaticButtonBehavior'],
        overrideBusyAction: true
    }
};

// Make sure that the MajorApplianceInCart flag gets sent
if (onShoppingCartPage && $('h3.cart-title').html().indexOf('Major Appli') === 0) {
    if (!replacePageVarAlreadySet('MajorApplianceInCart', 1)) {
        lpAddVars('page', 'MajorApplianceInCart', 1);
    }
}

// ProductSKU
if (document.location.href.match(/homedepot\.com\/p\//)) {
    var productSKU = document.location.href.match(/[0-9]{9}/);
    if (productSKU !== null) {
        lpAddVars('page', 'productSKU', productSKU[0]);
    }
}

lpMTagConfig.plugins.mobileDeviceDetection = {
    name: 'mobileDeviceDetection'
};

/*************
START NEW CODE
*************/

var checkOmnitureTry = 0;
checkOmniture();

function checkOmniture() {
    if (typeof s !== "undefined") {
        getRoutingVars();
    } else {
        lpMTagConfig.plugins.genericEventsBridge = {
            name: 'genericEventsBridge',
            config: {}
        };
        checkOmnitureTry++;
        if (checkOmnitureTry <= 10) {
            setTimeout(checkOmniture, 100);
        }
    }
}

function getRoutingVars() {
    var crumbs = getCrumbs();
    if (typeof crumbs !== "undefined") {
        for (var i = 0; i < crumbs.length; i++) {
            crumbs[i] = formatVariables(crumbs[i]);
        }
    }
    if (typeof crumbs != "undefined") {
        var unit = setUnit(crumbs);
        passRoutingVars(unit, crumbs);
        passGlobalVars();
    } else {
        lpMTagConfig.plugins.genericEventsBridge = {
            name: 'genericEventsBridge',
            config: {}
        };
        checkOmnitureTry++;
        if (checkOmnitureTry <= 10) {
            setTimeout(checkOmniture, 100);
        }
    }
}

//Changed default getCrumb function to getHDDataCrumbs
function getCrumbs() {
    if ($('#header-crumb').children().children('a').text().match(/\bHusky|husky\b/) !== null) {
        return getHeaderCrumbs();
    } else if (typeof _hddata.contentSubCategory !== "undefined" || typeof _hddata.pageName !== "undefined") {
        return getHDDataCrumbs();
    } else {
        return getHeaderCrumbs();
    }
}

function getHeaderCrumbs() {
    var headercrumb = $('#header-crumb').children().children('a').text();
    crumbs = headercrumb.split(/\n|\s\s/);
    // Clean up the array by removing whitespace
    for (var i = 0; i < crumbs.length; i++) {
        crumbs[i] = $.trim(crumbs[i]);
    }
    // Remove empty values
    crumbs = $.grep(crumbs, function(n) {
        return (n);
    });
    //Remove Home from array
    crumbs.shift();
    return crumbs;
}

function getProp2Crumbs() {
    var crumbs = typeof(s.prop2) != 'undefined' ? s.prop2.split(/>|\:/) : [];
    return crumbs;
}

//Function to get hddata crumbs
function getHDDataCrumbs() {
    //var crumbs = typeof(_hddata.contentSubCategory) != 'undefined' ?_hddata.contentSubCategory.split(/>|\:/) : [];
    var crumbs = [];
    if (typeof(_hddata.contentSubCategory) != 'undefined') {
        crumbs = _hddata.contentSubCategory.split(/>|\:/);
    } else if (typeof(_hddata.pageName) != 'undefined') {
        crumbs = _hddata.pageName.split(/>|\:/);
    }
    return crumbs;
}

//Bulk of changes made. Sets unit from crumbs scraped from hddata based on new logic.
function setUnit(crumbs) {
    //Set unit
    if (typeof crumbs !== "undefined") {
        if (typeof crumbs[0] !== "undefined") {
            if (crumbs[0].match("appliances|bath|checkout|doors|flooring|heatingventingcooling|kitchen|outdoors|paint|plumbing|windows")) {
                if (typeof crumbs[1] !== "undefined") {
                    switch (crumbs[0]) {
                    case "appliances":
                        if (crumbs[1] == "garbagedisposals") {
                            unit = "bath";
                        } else {
                            unit = "appliance"; //unit is appliance, not appliances
                        }
                        break;
                    case "checkout":
                        unit = "shoppingcart";
                        break;
                    case "kitchen":
                        if (crumbs[1] == "kitchenfaucets") {
                            unit = "bath";
                        }
                        if (crumbs[1] == "kitchensinks") {
                            if (crumbs[2] != "undefined") {
                                if (crumbs[2].match("stainlesssinks|othermaterials")) {
                                    unit = "bath";
                                }
                            }
                        }
                        break;
                    case "flooring":
                        if (crumbs[1] == "carpetcarpettile") {
                            unit = "carpet";
                        } else {
                            unit = "sale-flooring";
                        }
                        break;
                    case "doorswindows":
                        unit = "doors";
                        if (crumbs[1].match("doors|windows")) {
                            unit = crumbs[1];
                        }
                        break;
                    case "outdoors":
                        if (typeof crumbs[2] !== "undefined") {
                            if (crumbs[2] == "poolshottubssaunas") {
                                unit = "bath";
                            }
                        }
                        break;
                    case "plumbing":
                        if (crumbs[1] == "pumps") {
                            unit = "bath";
                        } else if (crumbs[1] == "waterheaters") {
                            unit = "waterheaters";
                        }
                        break;
                    case "storageorganization":
                        unit = "storage";
                        break; 
                    case "paint":
                        if (crumbs[1].match("interiorpaintstain|exteriorpaintstainwaterproofing")) {
                            unit = "paint";
                        } else {
                            unit = "sales-general";
                        }
                    default:
                    }
                }
                if (typeof unit == "undefined") {
                    if (crumbs[0] == "appliances") {
                        unit = "appliance";
                    } else if (crumbs[0] == "doorswindows") {
                        unit = "doors";
                    } else {
                        unit = crumbs[0];
                    }
                }
            } else if (crumbs[0].match("myaccount|search|helpcontactcenter")) {
                if (crumbs[0] == "search") {
                    if (_hddata.intSearchNumResults != "undefined" && _hddata.intSearchNumResults == 0) {
                        unit = "customerservice";
                    } else {
                        unit = "sales-general";
                    }
                } else {
                    unit = "customerservice";
                }
            } else {
                //High Value Code -- Replace Omniture in later stage
                try {
                    var price = document.getElementById("ajaxPrice").innerHTML;
                    var cleanPrice = price.replace(/[^a-zA-Z0-9.]+/g, '').toLowerCase();
                } catch (e) {}
                if (typeof s.prop30 !== "undefined" && s.prop30 == 'pip' && typeof cleanPrice !== "undefined" && cleanPrice >= 100) {
                    unit = "highvalue";
                }
                //End High Value Code --
                else {
                    unit = "sales-general"; //Replace with generic default unit
                }
            }

        }
    }
    if (typeof unit !== "undefined") {
        return unit;
    }
}



// This is used to parse out special characters from Omniture variables

function formatVariables(variable) {
    if (typeof variable === 'undefined') {
        return '';
    }
    return variable.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
}

function passRoutingVars(unit, crumbs) {
    if (typeof unit !== "undefined") {
        if (!replacePageVarAlreadySet('unit', unit)) {
            lpAddVars('page', 'unit', unit);
        }
    }
    if (typeof crumbs !== "undefined") {
        if (crumbs.length > 0) {
            lpAddVars('page', 'unit_marketer', crumbs[0]);
        }
        if (crumbs.length > 1) {
            if (!replacePageVarAlreadySet('Section', crumbs[1])) {
                lpAddVars('page', 'Section', crumbs[1]);
            }
        }
        if (crumbs.length > 2) {
            lpAddVars('page', 'SubSection', crumbs[2]);
        }
        if (crumbs.length > 3) {
            lpAddVars('page', 'Category', crumbs[3]);
        }
        if (crumbs.length > 4) {
            lpAddVars('page', 'SubCategory', crumbs[4]);
        }
    }
    initializeSiteCatalyst(unit);
}

function initializeSiteCatalyst(unit) {
    var chatChannel = '';
    if (typeof unit == "undefined" || unit == "") {
        if (typeof s !== "undefined" && typeof _hddata !== "undefined") {
            var hddataSplit = _hddata.split(">");
            if (typeof hddataSplit[1] !== "undefined" && hddataSplit[1].match(/doors/)) {
                unit = "doors";
            } else if (typeof hddataSplit[1] !== "undefined" && hddataSplit[1].match(/windows/)) {
                unit = "windows";
            } else if (typeof hddataSplit[2] !== "undefined" && hddataSplit[2].match(/concrete drilling tools|woodworking tools|specialty power tools|saws|sanders|drills|reconditioned power tools|power tool combo kits|power multitools|powder actuated tools accessories|polishers/)) {
                unit = "power tools";
            } else if (typeof hddataSplit[3] !== "undefined" && hddataSplit[3].match(/circular saws|miter saws|cordless/)) {
                unit = "power tools";
            }
        }
    }
    if (typeof unit !== "undefined" && unit !== "") {
        if (unit.match(/Kitchen|Appliance|Bath|Flooring|Paint|Outdoors|Install|Doors|Windows/i)) {
            chatChannel = unit.substr(0, 1).toUpperCase() + unit.substr(1);
        } else if (unit.match(/customerservice/)) {
            chatChannel = "Customer Service";
        } else if (unit.match(/shoppingcart/)) {
            chatChannel = "Shopping Cart";
        } else if (unit.match(/hvac/)) {
            chatChannel = "HVAC";
        } else if (unit.match(/power tools/)) {
            chatChannel = "Power Tools";
        } else if (unit.match(/highvalue/)) {
            chatChannel = "High Value";
        } else {
            chatChannel = unit;
        }
    }
    if (chatChannel !== '') {
        s_account = 'homedepot';
        chatChannel = decodeURI(chatChannel);
        lpAddVars('session', 'OmnitureChatChannel', chatChannel);

        lpMTagConfig.plugins.genericEventsBridge = {
            name: 'genericEventsBridge',
            config: {
                dbOvrObj: ['lpMTagConfig.StaticButtonBehavior', 'lpMTagConfig.TextLink'],
                invStart: function(vars) {
                    s.linkTrackVars = 'eVar68,eVar18,events';
                    s.linkTrackEvents = 'event84';
                    s.events = 'event84';
                    s.eVar68 = chatChannel;
                    s.eVar18 = 'invitation displayed';
                    s.tl(true, 'o', 'invitation displayed');
                    return true;
                },
                invAccepted: function(vars) {
                    s.linkTrackVars = 'eVar68,eVar18,events';
                    s.linkTrackEvents = 'event85';
                    s.events = 'event85';
                    s.eVar68 = chatChannel;
                    s.eVar18 = 'invitation accepted';
                    s.tl(true, 'o', 'invitation accepted');
                    return true;
                },
                invDeclined: function(vars) {
                    s.linkTrackVars = 'eVar68,eVar18';
                    s.eVar68 = chatChannel;
                    s.eVar18 = 'invitation declined';
                    s.tl(true, 'o', 'invitation declined');
                    return true;
                },
                btClicked: function(vars) {
                    s.linkTrackVars = 'eVar18';
                    s.eVar18 = 'chat clicked';
                    s.tl(true, 'o', 'chat clicked');
                    return true;
                }
            }
        };
    } else {
        lpMTagConfig.plugins.genericEventsBridge = {
            name: 'genericEventsBridge',
            config: {}
        };
    }
}

function passGlobalVars() {
    if (typeof s.products !== "undefined") {
        var products = s.products.split(",");
        if (products.length > 1) {
            lpAddVars('page', 'CompareProductPage', 1);
        }
    }
    if (s.prop30 == 'pip') {
        lpAddVars('page', 'PIPPage', 1);
    }
    if (typeof s.prop30 !== "undefined") {
        lpAddVars('page', 'pageType', s.prop30);
    }
    if (typeof s.eVar28 !== "undefined") {
        if (s.eVar28 !== "") {
            lpAddVars('session', 'zipCode', s.eVar28);
        }
    }
    if (typeof s.eVar26 !== "undefined") {
        lpAddVars('session', 'CustomerStatus', s.eVar26);
    }
    if (typeof s.pageName !== "undefined") {
        lpAddVars('page', 'pageName', s.pageName);
    }
    if (typeof s.events !== "undefined") {
        if (s.events.match("event56")) {
            lpAddVars('page', 'ProductOOS', true);
        }
    }
    if (typeof s.eVar27 !== "undefined") {
        lpAddVars('session', 'storeNumber', s.eVar27);
    }
    if (typeof s.prop30 !== "undefined") {
        try {
            var price = document.getElementById("ajaxPrice").innerHTML;
            var cleanPrice = price.replace(/[^a-zA-Z0-9.]+/g, '').toLowerCase();
            lpAddVars('page', 'itemPrice', cleanPrice);
        } catch (e) {}
    }
    if (typeof s.prop2 !== "undefined" && typeof s.eVar26 !== "undefined") {
        if (s.prop2.match("my account") && s.eVar26 === "authenticated") {
            var visitorName = getTHDUserName();
            lpAddVars('session', 'identifier', visitorName);
        }
    }
}

/***********
END NEW CODE
***********/

/*****Pass Misc non-Omniture vars*****/

lpAddVars('session', 'browserHeight', $(window).height());
lpAddVars('session', 'browserWidth', $(window).width());

// Make sure afterStartPage is defined on all buttons.
if (typeof(lpMTagConfig.dynButton) != 'undefined') {
    for (button in lpMTagConfig.dynButton) {
        if (typeof(lpMTagConfig.dynButton[button].afterStartPage) == 'undefined') {
            lpMTagConfig.dynButton[button].afterStartPage = true;
        }
    }
}

// Add variable to be sent when BOPIS button/link is clicked
$('a[rel="bopis"]').click(function() {
    lpSendData('page', 'BOPISOverlayShown', 1);
});

// Add variable to be sent when "In Store" tab is selected
$('#my_store').click(function() {
    lpSendData('page', 'InStoreClicked', 1);
});

//Deprecated (uses mobileDeviceDetection plugin now). Can be removed prior to release
if (lpMTagConfig.isMobile) {
    lpAddVars('session', 'isMobile', 'true');
}

var applianceDeliverZipTries = 0;
if (document.location.href.match(/AOLPartsServicesView/i)) {
    getApplianceDeliveryZip();
}

function getApplianceDeliveryZip() {
    // Get Appliance Delivery Zip
    applianceDeliverZipTries++;
    if (document.getElementById("appliance-ddate") && document.getElementById("appliance-ddate").innerHTML.match(/[0-9]{5}/).length > 0) {
        lpAddVars('session', 'ApplianceDeliveryZip', document.getElementById("appliance-ddate").innerHTML.match(/[0-9]{5}/)[0]);
    } else {
        if (applianceDeliverZipTries <= 10) {
            setTimeout(getApplianceDeliveryZip, 100);
        }
    }
}

// Get PRO Cookie

function lpReadCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

lpParseCookie();

function lpParseCookie() {
    var lpCookie = lpReadCookie("THD_PERSIST");
    if (!lpCookie) {
        // if null result, try again in 1 second
        setTimeout("lpParseCookie()", 1000);
    } else {
        lpCookieDecode = decodeURIComponent(lpCookie);
        lpCookieSplit = lpCookieDecode.split(":;");
        for (var i = 0; i < lpCookieSplit.length; i++) {
            lpCookieSplit[i] = lpCookieSplit[i].split("=");
            if (lpCookieSplit[i][0] == "C40") {
                lpAddVars('session', 'ProVisitor', lpCookieSplit[i][1] == "P")
            }
        }
    }
}

})();
if (typeof(lpMTagConfig.pluginCode)== 'undefined') {lpMTagConfig.pluginCode = {};} // HAS TO BE HERE
lpMTagConfig.pluginCode.lpBasePlugin = {
    // initialize the external configuration parameters - do not change this method - has to be added to every plugin
    init: function() {
        try {
            if (typeof (lpMTagConfig.pluginRef) == 'undefined') { lpMTagConfig.pluginRef = {}; }
            lpMTagConfig.pluginRef[this.name] = this;
            this.log(this.name + ' init', 'DEBUG');
            for (var name in lpMTagConfig.plugins) {
                if (typeof (lpMTagConfig.plugins[name]) == 'object' && lpMTagConfig.plugins[name].name == this.name) {
                    var cfg = lpMTagConfig.plugins[name].config;
                    if (cfg) {
                        for (var prop in cfg) {
                            this[prop] = cfg[prop];
                        }
                    }
                    break;
                }
            }
        }
        catch (e) {
            this.log('Plugin ' + this.name + ' exception in init:' + e, 'ERROR');
        }
    },

    log: function(msg, level) {
        if (typeof(lpMTagDebug)!='undefined' && lpMTagDebug.Display) {
            try {
                lpMTagDebug.Display(msg, level, 'PLUGIN-' + this.name);
            }
            catch (e) { }
        }
		if(typeof(console)!='undefined' && 
		   (typeof(lpMTagConfig.pluginsConsoleDebug)=='undefined' ||  lpMTagConfig.pluginsConsoleDebug==true)){
			console.log(level + ":" + msg);
		}
    }
};

// Initialize the plugin hook arrays if needed
if (typeof (lpMTagConfig.pluginHook) == 'undefined') { lpMTagConfig.pluginHook = {}; }
if (typeof (lpMTagConfig.pluginHook.invite) == 'undefined') { lpMTagConfig.pluginHook.invite = []; }
if (typeof (lpMTagConfig.pluginHook.dynButtons) == 'undefined') { lpMTagConfig.pluginHook.dynButtons = []; }
if(typeof lpMTagConfig.pluginCode=="undefined")lpMTagConfig.pluginCode={};
lpMTagConfig.pluginCode.globalUtils={ver:2,name:"globalUtils",overrideBusyAction:!1,overrideOfflineAction:!1,forceButtonRefreshOnDecline:!1,forceButtonRefreshOnInvite:!1,excludeVisitorByCookie:!1,excludeVariableName:"Exclude",excludeVariableValue:"true",ssoURL:null,dynButtonHooks:[{name:"busyAction",run:function(a){return lpMTagConfig.pluginCode.globalUtils.busyAction(a)}},{name:"offlineAction",run:function(a){return lpMTagConfig.pluginCode.globalUtils.offlineAction(a)}},{name:"dbStateChange",run:function(a){return lpMTagConfig.pluginCode.globalUtils.dbStateChange(a)}}],
buttonRefs:[],start:function(){this.log(this.name+" start","DEBUG");this.excludeVisitorByCookie&typeof lpAddVars!="undefined"&&/lpdontbotherme\=1/.test(document.cookie)&&lpAddVars("session",this.excludeVariableName,this.excludeVariableValue);if(this.ssoURL!=null){lpMTagConfig.inviteChatSSOurl=this.ssoURL;for(var a=0;a<lpMTagConfig.dynButton.length;a++)lpMTagConfig.dynButton[a].SSOURL=this.ssoURL}},setExcludeCookie:function(a){try{if(this.log(this.name+" setExcludeCookie","DEBUG"),!isNaN(a)&&a>0){var b=
new Date;b.setTime(b.getTime()+a*36E5);var c="; expires="+b.toGMTString();document.cookie="lpdontbotherme=1"+c+"; path=/"}}catch(d){this.log("Plugin "+this.name+" exception in setExcludeCookie:"+d,"ERROR")}},busyAction:function(a){if(this.overrideBusyAction)try{this.log(this.name+" busyAction","DEBUG");objRef=eval(a.objName);var b=objRef.getActionURL("Busy"),b=b.replace(/forceOffline/,"SESSIONVAR%21BusyClickOverride");window.open(b,"Chat"+lpMTagConfig.lpNumber,"width=472,height=320,status=0,resizable=0,menubar=no,scrollbars=no,location=no")}catch(c){this.log("Plugin "+
this.name+" exception in busyAction:"+c,"ERROR")}},offlineAction:function(a){if(this.overrideOfflineAction)try{this.log(this.name+" offlineAction","DEBUG");objRef=eval(a.objName);var b=objRef.getActionURL("Offline");window.open(b,"Chat"+lpMTagConfig.lpNumber,"width=472,height=320,status=0,resizable=0,menubar=no,scrollbars=no,location=no")}catch(c){this.log("Plugin "+this.name+" exception in offlineAction:"+c,"ERROR")}},dbStateChange:function(a){try{this.log(this.name+" dbStateChange","DEBUG");for(var b=
eval(a.objName),c=!1,d=0;d<this.buttonRefs.length;d++)this.buttonRefs[d]===b&&(c=!0);!c&&b!=null&&this.buttonRefs.push(b);objRef=eval(a.objName);if(typeof objRef.refImage=="undefined")return!0;if(a.status=="busy"&&this.overrideBusyAction)return objRef.setCursorStyle(objRef.pointerStyle),objRef.refImage.src=typeof objRef.ver=="undefined"?objRef.imageUrl+objRef.imgBusyName:objRef.imgBusyName,objRef.refImage.alt="",objRef.refImage.onclick=typeof objRef.overwriteObj.busyAction!="undefined"?function(){try{eval(objRef.extConfig.ovr).busyAction(a.objName)}catch(b){}return!1}:
null,!1;if(a.status=="offline"&&this.overrideOfflineAction)return objRef.setCursorStyle(objRef.pointerStyle),objRef.refImage.src=typeof objRef.ver=="undefined"?objRef.imageUrl+objRef.imgOfflineName:objRef.imgOfflineName,objRef.refImage.alt="",objRef.refImage.onclick=typeof objRef.overwriteObj.offlineAction!="undefined"?function(){try{eval(objRef.extConfig.ovr).offlineAction(a.objName)}catch(b){}return!1}:null,!1}catch(e){this.log("Plugin "+this.name+" exception in dbStateChange:"+e,"ERROR")}return!0},
refreshButtons:function(){for(var a=0;a<this.buttonRefs.length;a++){var b=this.buttonRefs[a];try{b.MakeCall()}catch(c){this.log("Plugin "+this.name+" exception when refreshing button: "+c,"ERROR")}}},inviteChatShown:function(){try{this.log(this.name+" inviteChatShown","DEBUG"),this.forceButtonRefreshOnInvite==!0&&this.refreshButtons()}catch(a){this.log("Plugin "+this.name+" exception in inviteChatShown:"+a,"ERROR")}return!0},inviteChatDeclined:function(){try{this.log(this.name+" inviteChatDeclined",
"DEBUG"),this.forceButtonRefreshOnDecline==!0&&this.refreshButtons()}catch(a){this.log("Plugin "+this.name+" exception in inviteChatDeclined:"+a,"ERROR")}return!0}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatDeclined",run:function(a){return lpMTagConfig.pluginCode.globalUtils.inviteChatDeclined(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatShown",run:function(a){return lpMTagConfig.pluginCode.globalUtils.inviteChatShown(a)}};
if(typeof lpMTagConfig.pluginCode=="undefined")lpMTagConfig.pluginCode={};
lpMTagConfig.pluginCode.genericEventsBridge={ver:1,name:"genericEventsBridge",invStart:null,invAccepted:null,invDeclined:null,invTimeout:null,invVoiceStart:null,invVoiceAccepted:null,invVoiceDeclined:null,invVoiceTimeout:null,invMultiChannelStart:null,invMultiChannelAccepted:null,invMultiChannelDeclined:null,invMultiChannelTimeout:null,btStateChange:null,btClicked:null,override:!1,dynButtonHooks:[{name:"dbStateChange",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.dbStateChange(a)}},
{name:"dbClicked",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.dbClicked(a)}}],start:function(){this.log(this.name+" start","DEBUG")},execCallback:function(a,b,c){var d=!0;try{this.log(this.name+" "+a,"DEBUG"),b!==null&&(d=b(c))}catch(e){this.log("Plugin "+this.name+" exception in "+a+":"+e,"ERROR")}return this.override?d:!0},inviteChatStart:function(a){return this.execCallback("inviteChatStart",this.invStart,a)},inviteChatAccept:function(a){return this.execCallback("inviteChatAccepted",
this.invAccepted,a)},inviteChatDeclined:function(a){return this.execCallback("inviteChatDeclined",this.invDeclined,a)},inviteChatTimeout:function(a){return this.execCallback("inviteChatTimeout",this.invTimeout,a)},inviteVoiceStart:function(a){return this.execCallback("inviteVoiceStart",this.invVoiceStart,a)},inviteVoiceAccept:function(a){return this.execCallback("inviteVoiceAccept",this.invVoiceAccepted,a)},inviteVoiceDeclined:function(a){return this.execCallback("inviteVoiceDeclined",this.invVoiceDeclined,
a)},inviteVoiceTimeout:function(a){return this.execCallback("inviteVoiceTimeout",this.invVoiceTimeout,a)},inviteMultiChannelStart:function(a){return this.execCallback("inviteMultiChannelStart",this.invMultiStart,a)},inviteMultiChannelAccept:function(a,b){var c=!0;try{this.log(this.name+" inviteMultiChannelAccept","DEBUG"),this.invMultiChannelAccept!==null&&(c=this.invMultiChannelAccept(a,b))}catch(d){this.log("Plugin "+this.name+" exception in inviteMultiChannelAccept:"+d,"ERROR")}return this.override?
c:!0},inviteMultiChannelDeclined:function(a){return this.execCallback("inviteMultiChannelDeclined",this.invMultiDeclined,a)},inviteMultiChannelTimeout:function(a){return this.execCallback("inviteMultiChannelTimeout",this.invMultiTimeout,a)},dbStateChange:function(a){return this.execCallback("dbStateChange",this.btStateChange,a)},dbClicked:function(a){return this.execCallback("dbClicked",this.btClicked,a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatStart",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteChatStart(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatAccept",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteChatAccept(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatDeclined",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteChatDeclined(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatTimeout",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteChatTimeout(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteVoiceStart",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteVoiceStart(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteVoiceAccept",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteVoiceAccept(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteVoiceDeclined",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteVoiceDeclined(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteVoiceTimeout",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteVoiceTimeout(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteMultiChannelStart",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteMultiChannelStart(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteMultiChannelAccept",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteMultiChannelAccept(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteMultiChannelDeclined",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteMultiChannelDeclined(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteMultiChannelTimeout",src:"genericEventsBridge",run:function(a){return lpMTagConfig.pluginCode.genericEventsBridge.inviteMultiChannelTimeout(a)}};
if(typeof lpMTagConfig.pluginCode=="undefined")lpMTagConfig.pluginCode={};
lpMTagConfig.pluginCode.simpleDeploy={ver:1,name:"simpleDeploy",buttonDivMustBePresentOnLoad:!0,defaultButtonDivID:"lpChatButton",sendOrderInfoIfZeroOrEmpty:!1,dontSendIfEmpty:["OrderTotal","OrderNumber"],dontSendIfZero:["OrderTotal","OrderNumber"],sendCookiesIfOrderTotal:!1,buttons:null,scopeOverride:{language:"session"},server:null,varNameCharLimit:50,varValueCharLimit:50,SSOURL:null,inviteChatSSOurl:null,inviteVoiceSSOurl:null,inviteVoiceSingleStepSSOurl:null,defaultInvite:"",isSetup:!1,loop:!0,
varPollInterval:5E3,processVarsTimeout:null,trimSpaces:function(d){return d.replace(/^\s+|\s+$/g,"")},addVar:function(d,c,a){lpMTagConfig.varLookup&&c?lpMTagConfig.varLookup[c]={value:a,scope:d,sent:!1}:c||this.log(this.name+" Added LP variable with a defined name","ERROR")},constructVarsQueryString:function(d){var c="",a;for(a in lpMTagConfig.varLookup)if(!lpMTagConfig.varLookup[a].sent){var b=lpMTagConfig.varLookup[a].value,f=lpMTagConfig.varLookup[a].scope;if(a.indexOf("OrderTotal")!=-1||a.indexOf("OrderNumber")!=
-1){if(this.sendOrderInfoIfZeroOrEmpty&&(b==""||b==0))return;if(!this.sendCookiesIfOrderTotal)lpMTagConfig.sendCookies=!1}for(var g=!0,e=0;e<this.dontSendIfEmpty.length;e++)a.indexOf(this.dontSendIfEmpty[e])!=-1&&b==""&&(g=!1);for(e=0;e<this.dontSendIfZero.length;e++)a.indexOf(this.dontSendIfZero[e])!=-1&&b==0&&(g=!1);if(g)if(b!=null&&f){b=this.trimSpaces(b.toString());a.length>this.varNameCharLimit&&(a=a.substr(0,this.varNameCharLimit));b.length>this.varValueCharLimit&&(b=b.substr(0,this.varValueCharLimit));
g=null;e=a+"="+b;g=typeof encodeURIComponent=="undefined"?escape(a)+"="+escape(b):encodeURIComponent(a)+"="+encodeURIComponent(b);b="P";switch(f){case "page":d&&lpMTagConfig.pageVar.push(g);b="P";break;case "session":d&&lpMTagConfig.sessionVar.push(g);b="S";break;case "visitor":d&&lpMTagConfig.visitorVar.push(g),b="V"}c.length>0&&(c+="&");c+=b+"V!"+e;lpMTagConfig.varLookup[a].sent=!0}else f||this.log("LP variable '"+a+"' does not have a scope defined","ERROR"),b||this.log("LP var '"+a+"' does not have a value defined",
"ERROR")}return c},processVars:function(d){if(!lpMTagConfig.varLookup)lpMTagConfig.varLookup={};if(lpMTagConfig.vars!=null)for(var c=0;c<lpMTagConfig.vars.length;c++){var a=lpMTagConfig.vars[c],b="";a.length>2&&(b=a[0],this.scopeOverride[a[0]]!=null&&(b=this.scopeOverride[a[0]]),this.addVar(b,a[1],a[2]));a.length==2&&(b="page",this.scopeOverride[a[0]]!=null&&(b=this.scopeOverride[a[0]]),this.addVar(b,a[0],a[1]))}d=this.constructVarsQueryString(d);lpMTagConfig.vars=[];if(this.loop){var f=this;this.processVarsTimeout&&
window.clearTimeout(this.processVarsTimeout);this.processVarsTimeout=window.setTimeout(function(){f.processVars(!0)},f.varPollInterval)}return d},start:function(){this.isSetup||this.setup()},setup:function(){this.log(this.name+" setup","DEBUG");this.isSetup=!0;if(typeof lpAddVars=="undefined")lpAddVars=this.addVar;lpMTagConfig.lpTagLoaded=!1;if(typeof lpMTagConfig.lpServer=="undefined")lpMTagConfig.lpServer=this.server!=null?this.server:lpMTagConfig.lpTagSrv;if(typeof lpMTagConfig.pageVar=="undefined")lpMTagConfig.pageVar=
[];if(typeof lpMTagConfig.sessionVar=="undefined")lpMTagConfig.sessionVar=[];if(typeof lpMTagConfig.visitorVar=="undefined")lpMTagConfig.visitorVar=[];if(typeof lpMTagConfig.onLoadCode=="undefined")lpMTagConfig.onLoadCode=[];if(typeof lpMTagConfig.dynButton=="undefined")lpMTagConfig.dynButton=[];if(typeof lpMTagConfig.ifVisitorCode=="undefined")lpMTagConfig.ifVisitorCode=[];if(typeof lpMTagConfig.channels=="undefined"||lpMTagConfig.channels.length==0)lpMTagConfig.channels=["chat"];if(typeof lpMTagConfig.db1==
"undefined")lpMTagConfig.db1={};if(typeof lpMTagConfig.db2=="undefined")lpMTagConfig.db2={};if(this.SSOURL)lpMTagConfig.SSOURL=this.SSOURL;if(this.inviteChatSSOurl)lpMTagConfig.inviteChatSSOurl=this.inviteChatSSOurl;if(this.inviteVoiceSSOurl)lpMTagConfig.inviteVoiceSSOurl=this.inviteVoiceSSOurl;if(this.inviteVoiceSingleStepSSOurl)lpMTagConfig.inviteVoiceSingleStepSSOurl=this.inviteVoiceSingleStepSSOurl;lpMTagConfig.pageLoadTime!=null&&this.addVar("page","pageLoadTime",Math.round(lpMTagConfig.pageLoadTime/
1E3)+" sec",!0);this.processVars(!0);var d=null;typeof lpMTagConfig.getLPVarValue!="undefined"?d=lpMTagConfig.getLPVarValue("unit"):typeof lpUnit!="undefined"&&(d=lpUnit);var c=null;typeof lpMTagConfig.getLPVarValue!="undefined"?c=lpMTagConfig.getLPVarValue("language"):typeof lpLanguage!="undefined"&&(c=lpLanguage);if(this.defaultInvite!=="")lpMTagConfig.defaultInvite=this.defaultInvite;else if(lpMTagConfig.defaultInvite==null){if(d!=null)lpMTagConfig.defaultInvite=lpMTagConfig.channels[0]+"-"+d;
c!=null&&(lpMTagConfig.defaultInvite+="-"+c)}if(this.buttons!=null&&lpMTagConfig.dynButton.length==0)for(var a=0;a<this.buttons.length;a++){lpMTagConfig["db"+(a+1)]==null&&(lpMTagConfig["db"+(a+1)]={});var b={name:this.buttons[a].name,pid:this.buttons[a].pid,afterStartPage:this.buttons[a].afterStartPage,ovr:this.buttons[a].ovr};if(this.buttons[a].SSOURL)b.SSOURL=this.buttons[a].SSOURL;else if(this.SSOURL)b.SSOURL=this.SSOURL;lpMTagConfig.dynButton[lpMTagConfig.dynButton.length]=b}else if(lpMTagConfig.buttonNames==
null&&lpMTagConfig.dynButton.length==0){if(d!=null)for(a=0;a<lpMTagConfig.channels.length;a++){b=lpMTagConfig.channels[a]+"-"+d;c!=null&&(b+="-"+c);lpMTagConfig["db"+(a+1)]==null&&(lpMTagConfig["db"+(a+1)]={});b={name:b,pid:this.buttonDivMustBePresentOnLoad&&document.getElementById(b)!=null?b:this.defaultButtonDivID,afterStartPage:!0,ovr:"lpMTagConfig.db"+(a+1)};if(this.SSOURL)b.SSOURL=this.SSOURL;lpMTagConfig.dynButton[lpMTagConfig.dynButton.length]=b}}else if(lpMTagConfig.buttonNames!=null)for(a=
0;a<lpMTagConfig.buttonNames.length;a++){b=lpMTagConfig.buttonNames[a];lpMTagConfig["db"+(a+1)]==null&&(lpMTagConfig["db"+(a+1)]={});b={name:b,pid:this.buttonDivMustBePresentOnLoad&&document.getElementById(b)!=null?b:this.defaultButtonDivID,afterStartPage:!0,ovr:"lpMTagConfig.db"+(a+1)};if(this.SSOURL)b.SSOURL=this.SSOURL;lpMTagConfig.dynButton[lpMTagConfig.dynButton.length]=b}if(this.buttonDivMustBePresentOnLoad){var f=this;lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length]=function(){if(typeof lpMTagConfig.dynButton!=
"undefined")for(var a=0;a<lpMTagConfig.dynButton.length;a++)typeof lpMTagConfig.dynButton[a].pid!="undefined"&&document.getElementById(lpMTagConfig.dynButton[a].pid)==null&&(f.log("Removing dynButton "+lpMTagConfig.dynButton[a].name,"DEBUG"),lpMTagConfig.dynButton.splice(a,1),a--)}}}};
if(typeof lpMTagConfig.pluginCode=="undefined")lpMTagConfig.pluginCode={};
lpMTagConfig.pluginCode.typingInvitationText={ver:1.1,name:"typingInvitationText",elementObject:null,elementText:null,currentCharacter:0,intervalID:0,showingCursor:false,elementID:"lpTypingInvite",characterDelay:50,lineDelay:5E3,cursorCharacter:"",cursorBlinkDelay:500,initialDelay:0,start:function(){this.log(this.name+" start","DEBUG")},startInvite:function(){var a=document.getElementById(this.elementID);if(a!==null){this.elementObject=a;this.elementText=this.elementObject.innerHTML;if(this.initialDelay>
0){var b=this;setTimeout(function(){b.nextCharacter(true);b.flipCursor()},this.initialDelay);this.elementObject.innerHTML=""}else{this.nextCharacter(true);this.flipCursor()}}else this.log(this.name+" is unable to find element with the id '"+this.elementID+"'","ERROR");return true},endInvite:function(){if(this.intervalID!==0){clearInterval(this.intervalID);this.intervalID=0}this.currentCharacter=this.elementObject=0;this.showingCursor=false;return true},flipCursor:function(){if(this.cursorCharacter.length>
0){this.showingCursor=!this.showingCursor;this.updateText();if(this.cursorBlinkDelay>0){var a=this;setTimeout(function(){a.flipCursor()},this.cursorBlinkDelay)}}else this.showingCursor=false},updateText:function(){this.elementObject.innerHTML=this.elementText.substr(0,this.currentCharacter);if(this.showingCursor)this.elementObject.innerHTML+=this.cursorCharacter},nextCharacter:function(a){var b=this;if(a){this.currentCharacter=0;this.intervalID=setInterval(function(){b.nextCharacter(false)},this.characterDelay)}this.currentCharacter++;
this.updateText();if(this.currentCharacter>=this.elementText.length){clearInterval(this.intervalID);this.intervalID=0;this.lineDelay>0&&setTimeout(function(){b.nextCharacter(true)},this.lineDelay)}}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatStart",src:"typingInvitationText",run:function(a){return lpMTagConfig.pluginCode.typingInvitationText.startInvite(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatAccept",src:"typingInvitationText",run:function(a){return lpMTagConfig.pluginCode.typingInvitationText.endInvite(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatDeclined",src:"typingInvitationText",run:function(a){return lpMTagConfig.pluginCode.typingInvitationText.endInvite(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteChatTimeout",src:"typingInvitationText",run:function(a){return lpMTagConfig.pluginCode.typingInvitationText.endInvite(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteVoiceStart",src:"typingInvitationText",run:function(a){return lpMTagConfig.pluginCode.typingInvitationText.startInvite(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteVoiceAccept",src:"typingInvitationText",run:function(a){return lpMTagConfig.pluginCode.typingInvitationText.endInvite(a)}};lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteVoiceDeclined",src:"typingInvitationText",run:function(a){return lpMTagConfig.pluginCode.typingInvitationText.endInvite(a)}};
lpMTagConfig.pluginHook.invite[lpMTagConfig.pluginHook.invite.length]={name:"inviteVoiceTimeout",src:"typingInvitationText",run:function(a){return lpMTagConfig.pluginCode.typingInvitationText.endInvite(a)}};
if (typeof lpMTagConfig.pluginCode == "undefined") lpMTagConfig.pluginCode = {};

lpMTagConfig.pluginCode.mobileDeviceDetection = function(document, window, undefined) {

    var mobileDeviceFlag = false; // indicates whether we are on a mobile device or not
    var mobilePhoneFlag = false; // flag just for mobile phones
    var mobileTabletFlag = false; // flag just for mobile phones

    // object describing any / all properties of the device
    var mobileDeviceInfo = {
        isIPhone: false,
        isIPad: false,
        isMobile: false,
        isTablet: false,
        deviceOS: ""
    };

    var appVer = navigator.appVersion;
    var searchVersion = /\s(\d)_\d/;
    var searchDevice = /\s[(](\w+\s?\w*)[;]\s/;
    var isIPhone = false;
    var isIPad = false;

    function isAndroidPhone() {

        // we need to check if this is a Kindle device as they share some of the user agent properties of Android devices.
        // if we detect this is NOT a KINDLE device then we proceed to check if it is an android phone as usual
        var flag = false;

        if (!isKindleDevice()) {
            // looking for Andoird && Mobile in UserAgent for Android Mobile Phones
            flag = navigator.userAgent.match(/^(?=.*?(Android))(?=.*?(Mobile)).*$/i) ? true : false;
            if (flag) {

                mobileDeviceInfo.deviceOS = "Android";
            }
        }

        return flag;
    }

    function isBlackBerry() {

        var flag = navigator.userAgent.match(/BlackBerry/i) ? true : false;
        if (flag) {
            mobileDeviceInfo.deviceOS = "Blackberry";
        }
        return flag;
    }

    function isiOS() {

        var flag = navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        if (flag) {
            mobileDeviceInfo.deviceOS = "iOS";
        }
        return flag;
    }

    function isiPhone() {
        var flag = navigator.userAgent.match(/iPhone|iPod/i) ? true : false;
        if (flag) {

            mobileDeviceInfo.deviceOS = "iOS (iPhone)";
        }

        return flag;
    }

    function isOpera() {

        var flag = navigator.userAgent.match(/Opera Mini/i) ? true : false;
        if (flag) {
            mobileDeviceInfo.deviceOS = "Opera";
        }
        return flag;
    }

    function isWindows() {

        var flag = navigator.userAgent.match(/IEMobile/i) ? true : false;
        if (flag) {
            mobileDeviceInfo.deviceOS = "Windows";
        }
        return flag;
    }

    function isiPad() {

        var flag = navigator.userAgent.match(/iPad/i) ? true : false;
        if (flag) {
            mobileDeviceInfo.deviceOS = "iOS (iPad)";
        }
        return flag;
    }

    function isAndroidTablet() {

        // looking for Android && NOT "Mobile" to confirm Android Tablet device
        return navigator.userAgent.match(/^(?=.*?(Android))((?!Kindle).)((?!Mobile).)*$/i) ? true : false;
    }

    function isKindleDevice() {
        /*
        Kindle User Agent String
        
        The monochrome Kindles have a User Agent String like:

            Mozilla/5.0 (Linux; U; en-US) AppleWebKit/528.5+ (KHTML, like Gecko, Safari/528.5+) Version/4.0 Kindle/3.0 (screen 600×800; rotate)
        
        The User Agent String of the new Kindle Fire tablet is:
            
            Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Kindle Fire Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1

        In Silk mode, the User Agent String of the Kindle Fire is:

            Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-80) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true

        */

        var flag = navigator.userAgent.match(/Kindle/i) ? true : false;
        if (flag) {

            mobileDeviceInfo.deviceOS = "Kindle";
        }
        return flag;

    }

    function isWindowsTablet() {
        // http://msdn.microsoft.com/en-us/library/ie/hh920767(v=vs.85).aspx#touch
        // Internet Explorer 10 introduces the "Touch" UA string token. If this token is present at the end of the UA string, the computer has touch capability, and is running Windows 8 (or later). This UA string will be transmitted on a touch-enabled system running Windows 8:
        // Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; Touch)Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; Touch)
        var flag = navigator.userAgent.match(/(MSIE 10\.0).*(Touch)/i) ? true : false;
        if (flag) {

            mobileDeviceInfo.deviceOS = "Windows 8 Tablet";
        }
        return flag;
    }

    function isTablet() {

        /*
        
        Android mobile phone browsers contain :: Android :: Mobile ::
        Android tablet devices contain :: Android 

        Therefore if we look for "Android" and NOT "Mobile" we can tell its a tablet android device

        User Agents follow...

        Nexus 7 UA == Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166  Safari/535.19

        Nexus 4 UA == Mozilla/5.0 (Linux; Android 4.2.1; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19

        */
        // return navigator.userAgent.match(/^(?!.*Mobile).*Android.*/i) || isiPad() ? true : false;
        return isAndroidTablet() || isiPad() || isWindowsTablet() || isKindleDevice() ? true : false;

    }

    function checkDevice() {
        if (searchVersion.exec(appVer) && searchDevice.exec(appVer)) {
            deviceVersion = searchVersion.exec(appVer)[1];
        }

        // check for just mobilePhone flag

        if (isiPhone() || isAndroidPhone() || isBlackBerry() || isOpera() || isWindows()) {
            mobilePhoneFlag = true;
        } else {
            mobilePhoneFlag = false;

        }

        mobileTabletFlag = isTablet();

        mobileDeviceFlag = (mobileTabletFlag || mobilePhoneFlag);

        mobileDeviceInfo.isIPhone = isiPhone();
        mobileDeviceInfo.isIPad = isiPad();
        mobileDeviceInfo.isMobile = mobilePhoneFlag;
        mobileDeviceInfo.isTablet = mobileTabletFlag;

        mobileDeviceInfo.userAgent = navigator.appVersion;


        if (mobileDeviceInfo.deviceOS === "" && navigator.userAgent.match(/(;\s).*;\s/i)) {
            mobileDeviceInfo.deviceOS = navigator.userAgent.match(/(;\s).*;\s/i)[0].replace(";", "");

        }
        try {
            
            if(typeof(lpMTagConfig.sessionVar) == "undefined") {
                lpMTagConfig.sessionVar = [];

            }

            if (mobileDeviceFlag && lpMTagConfig) {

                lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = 'mobileDevice=' + mobileDeviceFlag;
                lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = 'mobilePhone=' + mobilePhoneFlag;
                lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = 'mobileTablet=' + mobileTabletFlag;
                lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = 'deviceOS=' + trimSpaces(mobileDeviceInfo.deviceOS);
                lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = 'deviceUserAgent=' + navigator.userAgent;

                if (window.innerWidth) {
                    lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = 'mobileDevice-VisualViewport-Width=' + window.innerWidth;
                    lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = 'mobileDevice-VisualViewport-Height=' + window.innerHeight;

                }


            } else if(lpMTagConfig && mobileDeviceFlag === false) {
                lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = 'mobileDevice=' + mobileDeviceFlag;
            }


        } catch (err) {
            // error
        }

        return mobileDeviceFlag;
    }

    function trimSpaces(d) {
        return d.replace(/^\s+|\s+$/g, "");
    }

    return {
        isMobileDevice: checkDevice(), // call private function to reveal device
        isTablet: isTablet(),
        isIPhone: mobileDeviceInfo.isIPhone, // reveal internal variable for iPhone
        isIPad: mobileDeviceInfo.isIPad, // reveal internal variable for iPad
        deviceInfo: mobileDeviceInfo, // reveal internal variable for all device info {}
        ver: 1.2,
        name: "mobileDeviceDetection",
        trimSpaces: trimSpaces,
        start: function() {
            this.log(this.name + " start", "DEBUG");
        }
    }

}(document, window);
if(typeof lpMTagConfig.initPluginSys=="undefined")lpMTagConfig.initPluginSys=function(){try{for(var d in lpMTagConfig.plugins){for(var c in lpMTagConfig.pluginCode.lpBasePlugin)lpMTagConfig.pluginCode[d][c]=lpMTagConfig.pluginCode.lpBasePlugin[c];typeof lpMTagConfig.pluginCode[d].init!="undefined"&&lpMTagConfig.pluginCode[d].init();typeof lpMTagConfig.pluginLoaded!="undefined"&&lpMTagConfig.pluginLoaded(lpMTagConfig.pluginCode[d].name)}}catch(k){if(typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display)lpMTagDebug.Display("Exceptions in processing pluginRef:"+
k,"ERROR","PLUGIN-SYS");else throw k;}d=function(a,b){typeof a[b.name]=="undefined"&&(a[b.name]=function(a,c){return arguments.callee.hooks?lpMTagConfig.runPluginHooks(arguments.callee.hooks,b.name,{objName:a,status:c}):lpMTagConfig.runPluginHooks(lpMTagConfig.pluginHook.dynButtons,b.name,{objName:a,status:c})});if(!a[b.name].hooks)a[b.name].hooks=[];a[b.name].hooks.push(b)};try{for(c in lpMTagConfig.pluginRef){var g=lpMTagConfig.pluginRef[c];if(typeof g.dbOvrObj!="undefined")for(var h=0;h<g.dbOvrObj.length;h++){var i=
eval(g.dbOvrObj[h]);if(i){for(var f=0;f<lpMTagConfig.pluginHook.dynButtons.length;f++)d(i,lpMTagConfig.pluginHook.dynButtons[f]);if(g.dynButtonHooks)for(var j=0;j<g.dynButtonHooks.length;j++)d(i,g.dynButtonHooks[j])}}}}catch(l){if(typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display)lpMTagDebug.Display("Exceptions in processing dbOvrObj:"+l,"ERROR","PLUGIN-SYS");else throw l;}try{for(f=0;f<lpMTagConfig.pluginHook.invite.length;f++)(function(a){var b=lpMTagConfig.pluginHook.invite[a];typeof lpMTagConfig[b.name]==
"undefined"&&(lpMTagConfig[b.name]=function(a){return lpMTagConfig.runPluginHooks(lpMTagConfig.pluginHook.invite,b.name,{objName:a})})})(f)}catch(m){if(typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display)lpMTagDebug.Display("Exceptions in processing invite hooks:"+m,"ERROR","PLUGIN-SYS");else throw m;}lpMTagConfig.runPluginHooks=function(a,b,c){try{for(var d=!0,f=0;f<a.length;f++){var g=a[f];if(g.name==b){typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display&&lpMTagDebug.Display("runPluginHooks running:"+
b,"DEBUG","PLUGIN-SYS");c.prevRet=d;var h=g.run(c);h===!1&&(d=h)}}}catch(i){if(typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display)lpMTagDebug.Display("Exceptions in runPluginHooks:"+i,"ERROR","PLUGIN-SYS");else throw i;}return d};try{for(c in lpMTagConfig.pluginRef)c!="lpBasePlugin"&&typeof lpMTagConfig.pluginRef[c].start!="undefined"&&lpMTagConfig.pluginRef[c].start()}catch(n){if(typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display)lpMTagDebug.Display("Exceptions in processing start evets:"+n,
"ERROR","PLUGIN-SYS");else throw n;}},lpMTagConfig.initPluginSys();else if(typeof e!="undefined")if(typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display)lpMTagDebug.Display("Trying to define and run initPluginSys more than once (Check for multiple mtagconfig.js):"+e,"ERROR","PLUGIN-SYS");else throw e;else typeof lpMTagDebug!="undefined"&&lpMTagDebug.Display&&lpMTagDebug.Display("Trying to define and run initPluginSys more than once (Check for multiple mtagconfig.js):","ERROR","PLUGIN-SYS");
