var Reservation = {

    initialize: function () {

        var cookies = new CookieManager();
        Reservation.zipCode = cookies.getValueIgnoreCase('IPZipcode');
        if (typeof (Reservation.zipCode) == 'undefined') {
            Reservation.zipCode = '';
        }
        Reservation.productId = Reservation.findQueryString('p');
        Reservation.Banner = $('div#ReserveOnlineBanner');
        Reservation.url = '/WebServices/Reservation.asmx/IsItemAvailableNearMyLocation';

        if (shopastoreenabled == "True") {
            Reservation.Banner.hide();
            $("[id$='_btnFindShoe']").hide();
        }
        if (shopastoreenabled == "False" && Reservation.zipCode != null && Reservation.zipCode.length > 2 && Reservation.Banner != null && Reservation.Banner.length > 0)
            Reservation.ajaxUpdate();

        Reservation.resultMode = findQueryString('resultmode');
        if ($(".webExclusiveTag-pd").parent() && $(".webExclusiveTag-pd").parent().css("display") == "inline")
            Reservation.WebExclusive = true;
        else {
            Reservation.WebExclusive = false;
        }

        Reservation.Store = Reservation.cookieHandler('StoreInfo');
        if (typeof (Reservation.Store) == 'undefined' || Reservation.Store == null || Reservation.WebExclusive || shopastoreenabled == "False") {
            if (!Reservation.WebExclusive)
                Reservation.removeStoreId();

            Reservation.StoreId = '';
            if (Reservation.resultMode == "store")
                Reservation.removeStoreMode();
            else
                Reservation.OnlineOnlyMode();
        }
        else {
            var storeCookieJSON = eval('(' + Reservation.Store + ')');
            if (storeCookieJSON != null && storeCookieJSON.Store != null) {
                Reservation.StoreId = storeCookieJSON.Store;
                Reservation.StoreCity = storeCookieJSON.AddrLine1;
                var urlStoreId = findQueryString('store');

                if (urlStoreId != Reservation.StoreId && Reservation.StoreId.length > 0) {
                    var currentUrl = window.location.href;
                    if (urlStoreId.length > 0)
                        currentUrl = currentUrl.replace(urlStoreId, Reservation.StoreId)
                    else {
                        if (currentUrl.indexOf("&store=") > 0)
                            currentUrl = currentUrl.replace("&store=", "") + "&store=" + Reservation.StoreId;
                        if (currentUrl.indexOf("?store=") > 0)
                            currentUrl = currentUrl.replace("?store=", "") + "?store=" + Reservation.StoreId;
                        if (currentUrl.indexOf("store=") < 0) {
                            if (currentUrl.indexOf("?") > 0)
                                currentUrl = currentUrl + "&store=" + Reservation.StoreId;
                            else
                                currentUrl = currentUrl + "?store=" + Reservation.StoreId;
                        }
                    }

                    window.location = currentUrl;
                }
                else {
                    Reservation.StoreInventoryCheckUrl = '/WebServices/Reservation.asmx/IsItemAvailableAtMyStore';
                    Reservation.ajaxCheckStoreInv();
                }
            }

        }

    },

    ajaxUpdate: function () {

        jQuery.ajax({
            type: 'GET',
            url: Reservation.url,
            data: { zipcode: Reservation.zipCode, productid: Reservation.productId },
            dataType: 'xml',
            async: true,
            success: function (responseText) {

                if (Reservation.zipCode == '' || Reservation.zipCode == '-') {
                    if ($(responseText).find('ZipCode').text() != null) {
                        Reservation.zipCode = $(responseText).find('ZipCode').text();
                        var cookies = new CookieManager();
                        cookies.setCookie('IPZipcode', Reservation.zipCode, 30, siteDomain);
                    }
                }

                if ($(responseText).find('IsAvailable').text().toLowerCase() == 'true') {
                    Reservation.Banner.show();
                    $("[id$='_btnFindShoe']").hide();
                }
                else {
                    Reservation.Banner.hide();
                    $("[id$='_btnFindShoe']").show();
                }

            }
        });

    },

    ajaxCheckStoreInv: function () {
        jQuery.ajax({
            type: 'GET',
            url: Reservation.StoreInventoryCheckUrl,
            data: { storeId: Reservation.StoreId, productid: Reservation.productId },
            dataType: 'xml',
            async: true,
            success: function (responseText) {

                if ((responseText).text == "true" || (responseText).childNodes[0].textContent == "true") {
                    $(".SelectionTab2").show();
                    $("[id$='MyStoreTab']")[0].innerHTML = "My Store - " + Reservation.StoreCity;
                    $("[id$='divStore']").show();
                    $(".rightCol").addClass("storeActive");
                }
                else {

                    if (Reservation.resultMode == 'store') {
                        Reservation.removeStoreMode();

                    } else {
                        Reservation.OnlineOnlyMode();
                    }
                }

            }
        });

    },

    findQueryString: function (name) {

        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)    //Get it from the native url
            results = regex.exec($("#SEORoutesNativeUrl").val());
        if (results == null)
            return "";
        else
            return results[1];

    }
    ,
    openStoreLocator: function () {
        if (Reservation.zipCode != null && Reservation.zipCode.length > 2)
            window.location = "/ReserveOnline/ReserveOnline.aspx?item=" + Reservation.productId + "&zip=" + Reservation.zipCode;
        else
            window.location = "/ReserveOnline/ReserveOnline.aspx?item=" + Reservation.productId;
    }
    ,


    removeStoreMode: function () {

        var currentURL = window.location.href;
        if (currentURL.indexOf("resultmode=store") > 0) {
            currentURL = currentURL.replace("?resultmode=store&", "?");
            currentURL = currentURL.replace("&resultmode=store", "");
            window.location = currentURL;
        }


    }
    ,

    removeStoreId: function () {
        var currentURL = window.location.href;
        var urlstore = findQueryString('store');
        if (urlstore != null && urlstore.length >= 2) {
            currentURL = currentURL.replace("?store=" + urlstore, "?");
            currentURL = currentURL.replace("&store=" + urlstore, "");
            currentURL = currentURL.replace("?resultmode=store", "?");
            currentURL = currentURL.replace("&resultmode=store", "");
            window.location = currentURL;
        }


    }
    ,

    OnlineOnlyMode: function () {
        $(".SelectionTab1").hide();
        $(".SelectionTab2").hide();
        $("[id$='productSelectionStore']").hide();
        $(".rightCol").removeClass("storeActive");
        if ($(".webExclusiveTag-pd").parent() && $(".webExclusiveTag-pd").parent().css("display") != "inline") {
            if (Reservation.StoreId != null && Reservation.StoreId != '') {
                $("[id$='divSelectStore']").show();
            }
            else {
                $("[id$='divFindAStore']").show();
            }
        }
    }
    ,

    cookieHandler: function (key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && String(value) !== "[object Object]") {
            options = jQuery.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);
            //alert(siteDomain);
            return (document.cookie = [
                encodeURIComponent(key), '=',
                options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE            
                '; path=/',
                '; domain=' + siteDomain,
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;

    }



};

$(document).ready(Reservation.initialize());

