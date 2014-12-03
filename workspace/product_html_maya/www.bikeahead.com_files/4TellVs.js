//Volusion specific additions and client settings

//MD5 hash. Needed because the order details we get back don't have the proper order ID,
//just the email address, so we use a hash of that instead.
/*jsl:ignore*/
var hexcase = 1; var b64pad = ""; function hex_md5(s) { return rstr2hex(rstr_md5(str2rstr_utf8(s))) } function b64_md5(s) { return rstr2b64(rstr_md5(str2rstr_utf8(s))) } function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e) } function hex_hmac_md5(k, d) { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))) } function b64_hmac_md5(k, d) { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))) } function any_hmac_md5(k, d, e) { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e) } function md5_vm_test() { return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72" } function rstr_md5(s) { return binl2rstr(binl_md5(rstr2binl(s), s.length * 8)) } function rstr_hmac_md5(key, data) { var bkey = rstr2binl(key); if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8); var ipad = Array(16), opad = Array(16); for (var i = 0; i < 16; i++) { ipad[i] = bkey[i] ^ 0x36363636; opad[i] = bkey[i] ^ 0x5C5C5C5C } var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8); return binl2rstr(binl_md5(opad.concat(hash), 512 + 128)) } function rstr2hex(input) { try { hexcase } catch (e) { hexcase = 0 } var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef"; var output = ""; var x; for (var i = 0; i < input.length; i++) { x = input.charCodeAt(i); output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F) } return output } function rstr2b64(input) { try { b64pad } catch (e) { b64pad = '' } var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; var output = ""; var len = input.length; for (var i = 0; i < len; i += 3) { var triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0); for (var j = 0; j < 4; j++) { if (i * 8 + j * 6 > input.length * 8) output += b64pad; else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F) } } return output } function rstr2any(input, encoding) { var divisor = encoding.length; var i, j, q, x, quotient; var dividend = Array(Math.ceil(input.length / 2)); for (i = 0; i < dividend.length; i++) { dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1) } var full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2))); var remainders = Array(full_length); for (j = 0; j < full_length; j++) { quotient = Array(); x = 0; for (i = 0; i < dividend.length; i++) { x = (x << 16) + dividend[i]; q = Math.floor(x / divisor); x -= q * divisor; if (quotient.length > 0 || q > 0) quotient[quotient.length] = q } remainders[j] = x; dividend = quotient } var output = ""; for (i = remainders.length - 1; i >= 0; i--) output += encoding.charAt(remainders[i]); return output } function str2rstr_utf8(input) { var output = ""; var i = -1; var x, y; while (++i < input.length) { x = input.charCodeAt(i); y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0; if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) { x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF); i++ } if (x <= 0x7F) output += String.fromCharCode(x); else if (x <= 0x7FF) output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F)); else if (x <= 0xFFFF) output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F)); else if (x <= 0x1FFFFF) output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F)) } return output } function str2rstr_utf16le(input) { var output = ""; for (var i = 0; i < input.length; i++) output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF); return output } function str2rstr_utf16be(input) { var output = ""; for (var i = 0; i < input.length; i++) output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF); return output } function rstr2binl(input) { var output = Array(input.length >> 2); for (var i = 0; i < output.length; i++) output[i] = 0; for (var i = 0; i < input.length * 8; i += 8) output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32); return output } function binl2rstr(input) { var output = ""; for (var i = 0; i < input.length * 32; i += 8) output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF); return output } function binl_md5(x, len) { x[len >> 5] |= 0x80 << ((len) % 32); x[(((len + 64) >>> 9) << 4) + 14] = len; var a = 1732584193; var b = -271733879; var c = -1732584194; var d = 271733878; for (var i = 0; i < x.length; i += 16) { var olda = a; var oldb = b; var oldc = c; var oldd = d; a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936); d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586); c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819); b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330); a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897); d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426); c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341); b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983); a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416); d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417); c = md5_ff(c, d, a, b, x[i + 10], 17, -42063); b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162); a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682); d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101); c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290); b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329); a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510); d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632); c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713); b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302); a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691); d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083); c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335); b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848); a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438); d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690); c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961); b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501); a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467); d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784); c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473); b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734); a = md5_hh(a, b, c, d, x[i + 5], 4, -378558); d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463); c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562); b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556); a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060); d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353); c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632); b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640); a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174); d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222); c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979); b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189); a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487); d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835); c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520); b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651); a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844); d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415); c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905); b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055); a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571); d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606); c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523); b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799); a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359); d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744); c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380); b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649); a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070); d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379); c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259); b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551); a = safe_add(a, olda); b = safe_add(b, oldb); c = safe_add(c, oldc); d = safe_add(d, oldd) } return Array(a, b, c, d) } function md5_cmn(q, a, b, x, s, t) { return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b) } function md5_ff(a, b, c, d, x, s, t) { return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t) } function md5_gg(a, b, c, d, x, s, t) { return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t) } function md5_hh(a, b, c, d, x, s, t) { return md5_cmn(b ^ c ^ d, a, b, x, s, t) } function md5_ii(a, b, c, d, x, s, t) { return md5_cmn(c ^ (b | (~d)), a, b, x, s, t) } function safe_add(x, y) { var lsw = (x & 0xFFFF) + (y & 0xFFFF); var msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xFFFF) } function bit_rol(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)) }
/*jsl:end*/
//FF has issues because self is no longer supported by that browser. 
var self = self || window;

//Namespace for all 4-Tell code
(function (_4TellBoost, $, undefined) {
    _4TellBoost.Service.platformLoaded = true;

    _4TellBoost.detectCartPage = function () {
        //First, check to see if this came from email.
        var emailRec = location.search.match(/(?:4Tee=)([\w+,?]+)[&\?]?/)
        if (emailRec && emailRec.length) {
            var params = emailRec[1].split(",");
            //Volusion does not like hyphens in URLs, so emailType-resultType
            //gets sent with an underscore instead.
            params[0] = params[0].replace("_", "-");
            //Sometimes the productID has dashes in it, which causes Volusion to freak out,
            //so we have to scrape the productID off the page.
            var id = params[2] || $("input[name=ProductCode]").val();
            _gaq.push(['_setAccount', _4TellBoost.SiteInfo.GA_UA],
                ['_trackEvent', "4TellRecsEmail", "Email-" + params[0] + "-" + params[1], id]);
        }

        //check for product page
        var productImg = $("img.vCSS_img_product_photo, img.vCSS_img_product_photo_small, img#product_photo");
        if (productImg && productImg.length) {
            _4TellBoost.setPageType('ProductDetail');
            $.each(productImg, function () {
                var imageSrc = $(this).attr("src");
                //ID from imageSrc is less than 100% reliable.
                var id = $("input[name=ProductCode]").val() || getProductIdFromImageSrc(imageSrc);
                if (id) {
                    _4TellBoost.addProductID(id);
                }
            });
            return;
        }

        //check for cart page
        productImg = $("td.v65-cart-detail-productimage").children("img");
        //the above does not work on Artisan Wine Depot.
        if (!(productImg && productImg.length)) {
            productImg = $('td:has(img[src*="btn_cart_remove.gif"]) ~ td:has(img)').children("img");
        }

        if (productImg && productImg.length) {
            _4TellBoost.setPageType('AddToCart');
            _4TellBoost.UserData.clearCart();
            $.each(productImg, function () {
                var imageSrc = $(this).attr("src");
                var id = getProductIdFromImageSrc(imageSrc);
                if (id && id.match("nophoto")) {
                    //No photo to scrape from, so we'll grab the ID from elsewhere.
                    var foo = $(this).closest("tr").find(".v65-cart-details-cell a.carttext");
                    id = foo && foo.attr("href");
                    id = id && id.match(/(?:ProductCode=)([\w%]+)&/);
                    id = id && id[1];
                }
                if (id) {
                    _4TellBoost.addCartItem(id);
                }
            });
            return;
        }

        //check for search and category results
        var results = $("form.search_results_section");
        if (results && results.length) {
            var CATID = $("input[name=Cat]").val();
            if (CATID && CATID.length) {
                _4TellBoost.setPageType("Category");
                _4TellBoost.setCatId(CATID);
            } else {
                _4TellBoost.setPageType('Search');

                resultLinks = results.find("a[title]:has(img)");
                if (resultLinks && resultLinks.length) {
                    $.each(resultLinks, function (index) {
                        if (index >= 20)
                            return false;

                        var imageSrc = $(this).children("img").attr("src");
                        //find product code. Images are unreliable, so they're just backup.
                        var id = $(this).attr("href").replace(/\S+\//, "").replace(/\.html?/, "");
                        id = id || getProductIdFromImageSrc(imageSrc);
                        if (id) {
                            _4TellBoost.addProductID(id);
                        }
                    });
                }
            }
            return;
        }

        //check for home page
        var featuredProds = $("table.v65-productDisplay");
        if (featuredProds && featuredProds.length) {
            _4TellBoost.setPageType('Home');
            //No products to interest us.
            return;
        }

        //From Volusion support.
        //Had to change the second check to fix case-sensitivity. Default != default.
        var onHomePage = (location.pathname == "/") || (location.pathname.match(/default.asp/i));
        if (onHomePage) {
            _4TellBoost.setPageType('Home');
            //Still no products to interest us.
            return;
        }

        //Check for invoice page.
        //Apparently casting UNDEF to boolean doesn't get false, it just gives REFERENCEERROR
        if (typeof (Order) != "undefined" && (Order.length > 9) && OrderDetails && OrderDetails.length) {
            _4TellBoost.reportSales();
        }

        _4TellBoost.setPageType('Auto');
        return;
    };

    function getProductIdFromImageSrc(imageSrc) {
        if (imageSrc.indexOf('clear1x1') > -1) return null;
        //find product code
        imageSrc = decodeURI(imageSrc);
        var index1 = imageSrc.lastIndexOf('/');
        if (index1 > -1) {
            index1 += 1;
            var id = '';
            //remove file extension
            var index2 = imageSrc.lastIndexOf(".");
            if (index2 > -1)
                id = imageSrc.substring(index1, index2);
            else
                id = imageSrc.substring(index1);
            //remove image id number
            var index3 = id.lastIndexOf('-');
            if (index3 > 0)
                id = id.substring(0, index3);
            return id;
        }
        return null;
    };

    _4TellBoost.getRatingImage = function (rating) {
        var rateVal = parseFloat(rating);
        if (isNaN(rateVal) || rateVal < 0) return $("<div class='ratingImage'/>");
        //ignore negative and NaN ratings.
        rateVal = Math.min(rateVal, 5);

        var imagePath = "";
        var star = String(Math.floor(rateVal));
        if (_4TellBoost.SiteInfo.ratings)
            imagePath = _4TellBoost.SiteInfo.ratings[star]; //Custom ratings images.
        else
            imagePath = _4TellBoost.loadpath + 'images/star' + star + '.png';

        var ratingImageLink = '';
        if (_4TellBoost.SiteInfo.includeBase)
            ratingImageLink = '//' + _4TellBoost.SiteInfo.baseURL + '/';
        ratingImageLink += imagePath;
        var rating = $("<div class='ratingImage'/>");
        var img = $("<img class='ratingImageImg'/>");
        img.attr("src", ratingImageLink);
        img.appendTo(rating);
        return rating;
    };

    _4TellBoost.getBuyBtn = function (tout, itemdata) {
        var buyWrapper = $("<div class='productBuy' />");
        var buyBtn = $("<" + _4TellBoost.SiteInfo.addCartBtnAtts + " />");
        if (_4TellBoost.SiteInfo.addCartImage) {
            var buyBtnImage = '';
            if (_4TellBoost.SiteInfo.includeBase)
                buyBtnImage = '//' + _4TellBoost.SiteInfo.baseURL + '/';
            buyBtnImage += _4TellBoost.SiteInfo.addCartImage;
            buyBtn.attr("src", buyBtnImage);
        }
        if (buyBtn)
            buyBtn.appendTo(buyWrapper);
        var newAddress = "";
        if (_4TellBoost.SiteInfo.includeBase)
            newAddress = 'http://' + _4TellBoost.SiteInfo.baseURL; //link to PDP should not be https
        newAddress += '/ShoppingCart.asp?ProductCode=' + encodeURI(itemdata.productID);

        //can't wrap with a-href in IE so add new address to the onclick handler
        buyBtn.click(function () {
            _4TellBoost.TrackClick(tout.toutType, itemdata.productID, newAddress);
        });
        return buyWrapper;
    };

    _4TellBoost.getProdImg = function (tout, itemdata) {
        //Boilerplate. This will make things complicated if we need to refactor
        var frameTarget = '';
        if (tout.inFrame) frameTarget = "target='_parent' ";
        var itemType = _4TellBoost.resultTypes[itemdata.resultType] || itemdata.resultType;
        var trackFunc = 'onclick="_4TellBoost.TrackClick(' + "'" + _4TellBoost.Service.pageType + "-" + itemType + "','" + itemdata.productID +
            "','" + itemdata.pageLink + "');return false;" + '"';
        var pageLink = '';
        if (_4TellBoost.SiteInfo.includeBase)
            pageLink = 'http://' + _4TellBoost.SiteInfo.baseURL + '/'; //link to PDP should not be https
        pageLink += itemdata.pageLink;

        var prodImage = $("<div class='" + tout.productImageStyle + "' />");
        var img = $('<img class="productImageImg" onerror="_4TellBoost.ImgError(this);"/>');
        img.attr("src", _4TellBoost.SiteInfo.emptyImage);
        img.attr("data-src", itemdata.imageLink);
        img.attr("alt", itemdata.title);
        img.appendTo(prodImage);
        img.wrap("<a href='" + pageLink + "' " + frameTarget + trackFunc + ' ></a>');
        return prodImage;
    };

    _4TellBoost.ImgError = function (source) {
        var JPGSRC = source.src;
        if (JPGSRC.match(/jpg$/)) {
            //Let's try this with a GIF.
            JPGSRC = JPGSRC.replace(/jpg$/i, "gif");
            source.src = JPGSRC;
        } else {
            //WELP.
            if (_4TellBoost.SiteInfo.hideIfNoImage) {
                var prodID = getProductIdFromImageSrc(JPGSRC);
                var containerDiv = $(source).parents(".FourTellContainer");
                var foo = containerDiv.find("div.product4T:has(img[src*=" + prodID + "])");
                var newDiv = containerDiv.find("div.product4T:hidden:first");
                if (newDiv) {
                    if (foo.is(":visible"))
                        newDiv.css("display", "");
                    newDiv.replaceAll(foo);
                }
            } else {
                source.src = _4TellBoost.SiteInfo.emptyImage;
                source.onerror = "";
            }
        }
    };

    _4TellBoost.reportSales = function () {
        _4TellBoost.setPageType('OrderConfirmation');
        var operation = 'upload/UploadData/singleSale';
        var orderID = OrderDetails[0][0];
        if (Order[9]) _4TellBoost.setCustomerID(Order[9]);
        var userID = _4TellBoost.getCustomerID();
        userID = hex_md5(userID);
        for (var i = 0; i < OrderDetails.length; i++) {
            if (OrderDetails[i].length > 6) {
                // Assemble the url to call
                var query = '?clientAlias=' + _4TellBoost.SiteInfo.alias +
                    '&customerID=' + userID +
                    '&productID=' + OrderDetails[i][2] +
                    '&quantity=' + OrderDetails[i][6] +
                    '&orderID=' + orderID;
                _4TellBoost.call4TellRest(operation, query);

                //The entirety of our image-based reporting system.
                var reportImg = new Image();
                reportImg.src = "https://email.4-tell.net/Boost/o/report.gif?clientAlias=" + _4TellBoost.SiteInfo.alias +
                    '&customerID=' + userID +
                    '&productID=' + OrderDetails[i][2] +
                    '&quantity=' + OrderDetails[i][6] +
                    '&orderID=' + orderID;
            }
        }
    };

    //Probably won't be used, but it'll be here when it's needed.
    function delayToGetItems(delayDiv) { //use in page settings above to delay for third-party results to load

        var delayContainer = $(delayDiv);
        if (!delayContainer) return;

        //anonymous call-back function is called after delayed container changes
        _4TellBoost.DelayHandler.callback = function () {
            var toutDiv = $(_4TellBoost.DelayHandler.toutDiv);
            if (!toutDiv || !(toutDiv.length)) //see if the toutDiv is visible
                _4TellBoost.DelayHandler.ended = false;
        };
        _4TellBoost.SiteInfo.delay = true;
        _4TellBoost.delayUntilLoaded(delayContainer);
    };

}(window._4TellBoost = window._4TellBoost || {}, jQuery));
//self-invoked namespace that protects $ and undefined internally