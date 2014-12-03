__sco = typeof __sco == "undefined" ? {} : __sco;
__scd = typeof __scd == "undefined" ? {} : __scd;
__sco.v1 = __sco.v1 || {};
__sco.osr = __sco.osr || {};
__sco.config = __sco.config || {};
__sco.sender = __sco.sender || {};
__sco.support = __sco.support || {};
__sco.scraper = __sco.scraper || {};
__sco.storage = __sco.storage || {};
__sco.provider = __sco.provider || {};
__sco.management = __sco.management || {};
__sco.management.trigger = __sco.management.trigger || {};

/** Config module - sets up things such as use OSR, api URL's, triggers, status detection, etc **/
__sco.config = {
    'live': true, // Send data to live or staging
    'v1': true, // Send data to v1
    'v2': false, // Send data to v2
    'osr': false, // Enable OSR
    'fallbackallowed': true, // Enable auto fall back to traditional data capture
    'xdomain': true, // Is the site over multiple domains? (Including sub domains)
    'translatev1': false, // Translate the data before sending to V1
    'persistcustomer': false, // Persist customer details accross sessions
    'geoip': false, // Use Geo IP Location (Server side)

    /** MIGRATION SETTINGS **/
    'migrationcollect': false, // Collect customer data from the old cookie if it exists
    'daystorun': 20,          // Number of days after live (the date set below) to still look at the cookie
    'startdate': 0,           // In milliseconds, the date the script went live

    'guid': '', // V2 guid
    'v1guid': '8cdb7648-6f9a-4951-918b-f76c23a50d56', // V1 guid, the api key for the client

    'triggers': ['exit', 'timeout'], // Set the triggers to use, use either load or exit and timeout together

    'status1': ["/cart", "/checkout"], // Strings to be set in lower case, will be compared against the URL of the current page. Functions will be executed and must return either true, false or a number to use as the status
    'status2': ["STATUS2"],
    'status3': ["/order-confirm"],
    'status4': ["STATUSFOUR"],
    'exclude': ["RUN ON EVERYTHING"],

    'onchange': {
        'email': ["#email", "#txtSignUpEmail", "#bemail", "#verify_email"],
        'first': ["#bfirstname", "#firstname"],
        'last': ["#blastname", "#lastname"],
        'telephone': ["#bphone", "#phone"],
        'mobile': [],
        'salutation': [],
        'optout': []
    },
    'block': {
        'email': ["email @ address"]
    },
    'optneg': false, // Default value of opt out button

    'external': {
        "selector string here": "optional function here, must update the Object status if you do this yourself",
        "can have another if you want": "if this is anything but a function it just gets ignored"
    },

    'sessiontime': 1800, // The time for a session to be inactive before creating a new one in seconds, so 1800 is 30 minutes
    'timerruns': 2, // The number of times to send a timestamp
    'timeout': 900, // The timeout triggers period in seconds, so 900 is 15 minutes
    'mintimeout': 60, // In seconds, minimum time since last timestamp sent - for onload set to 0
    'cookieexpiry': 1095, // The number of days in the future for the cookie to expire (1095 is 3 years)

    'status4overwrite': [/* 300 If a completion then overwrite the status 4 */],
    'status4restart': [/* 100, 200 If a basket or email after a status 4 then restart the session */],

    // DO NOT CHANGE THE FOLLOWING
    'v1api': 'https://d30ke5tqu2tkyx.cloudfront.net/import/lite/impression.ashx',
    'v1completion': 'https://d30ke5tqu2tkyx.cloudfront.net/import/lite/impression.ashx',
    'v2api': 'https://d22j4fzzszoii2.cloudfront.net/impression',
    'v2onload': '',
    'providerhost': 'https://d22j4fzzszoii2.cloudfront.net/provider',
    'v1providerhost': 'https://d30ke5tqu2tkyx.cloudfront.net/import/lite/provider.aspx',
    'errorapi': 'https://d30ke5tqu2tkyx.cloudfront.net/import/capture.aspx',

    'sessionfields': ['i', 'm', 'geo'], // The standard fields within the session object which are not to be translated
    'itemfields': ['n', 'i', 'q', 'v', 'd1', 'd2', 'u', 'f1', 'f2'], // The standard fields within an item which are not to be translated

    'doc': {
        'sv': '2.6',                            // Script Version
        'v': '1.0',                              // schema version
        'd': new Date().getTime().toString(),    // utc date
        'r': 100,                                // The request type   
        'u': document.location.href,                  // page URL/title
        't': 0,                                 // type integer of the request (100,200,300...)
        'o': '',                                  // order ID
        'cc': true,                              // Claim conversion flag
        's': {                                   // * session object
            'i': '',                             // session ID
            'm': ''                              // machine ID
        },
        'i': 0,                                 // client ID
        'i1': 17810,                                // V1 client ID
        'c': {                                  // * client object
            'f': '',                            // name
            'l': '',                            // surname
            'e': '',                            // email address
            'o': '0',                           // optout
            's': '',                            // salutation
            'p': {                              // phone numbers
                'm': '',                            // mobile
                'l': ''                             // telephone
            }
        },
        'b': {                                   // * basket
            'c': '',                             // the basket currency
            'v': '',                             // basket total value
            'i': []                              // basket items
        },
        'g': [],                                  // * errors object
        'm': {}                                   // * meta data object 
    },
    'timestamptemplate': {
        'v': '1.0',
        'r': 200,
        'u': document.location.href,                  // page URL/title
        'd': new Date().getTime().toString(),
        't': 0,
        'i': 0,
        'i1': 17810,
        'm': {
            'si': screen.availHeight + '-' + screen.availWidth + '-' + screen.colorDepth + '-' + screen.height + '-' + screen.width,
            'ua': navigator.userAgent
        },
        's': {
            'i': '',
            'm': ''
        },
        'g': []
    }
};

/** Scraper module, scrapes the data from the page for any status **/

/** Get the data for status 1 **/
__sco.scraper.statusone = function () {

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    if (__sco.contains(__sco.loc, "mobile")) {
        var rollingTotal = 0;

        try {
            if (__sco.contains(__sco.loc, "/cart")) {
                if (_scs("#totalprice")) {
                    __scd.b.v = _scs("#totalprice", "Total Value", ["text", "pricecurr"]);
                    __scd.s.cartid = __sco.inbetween("=", "", __sco.attr(_scs('.cartstyle:first a:first'), "href"), "fl");
                }
                else {
                    __scd.b.v = rollingTotal;
                    if (!__sco.contains(__sco.loc, "err") && __sco.contains(__sco.loc, "cartid")) {
                        __scd.s.cartid = __sco.inbetween("=", "", __sco.loc, "fl");
                    }
                }
                __scd.b.c = __sco.cursym;
            }
        }
        catch (be2) {
            be2.description = "201 " + (be2.description || "");
            __sco.error(be2);
        }
        try {
            if (__sco.contains(__sco.loc, "/cart") || __sco.contains(__sco.loc, "checkout.asp")) {
                __sco.each(_scs(".cartgroup"), function (ix, val) {
                    if (!__sco.contains(__sco.attr(val, "class"), "header")) {
                        var src = "(http://|https://)", href = "(http://|https://)";
                        // Set basket values here

                        if (__sco.contains(__sco.loc, "/cart")) {

                            if (_scs([val, ".qtyinput"])) {

                                var size = __sco.getvt(_scs("input[name=ItemSize" + (ix) + "]:first"));
                                var colour = __sco.getvt(_scs("input[name=ItemColor" + (ix) + "]:first"));
                                if (size != "") {
                                    size = "Item: " + size;
                                }
                                if (colour != "") {
                                    colour = "Color: " + colour;
                                }
                                var itemName = toTitleCase(_scs([val, ".iteminfo:first a:first"], "Item Name Mob", ["text"]));
                                var itemQty = __sco.getvt(_scs([val, ".qtyinput:first"], "03 Qty"));
                                var itemLink = _scs([val, "a:nth-child(2)"], "05 Link").href;
                                var itemImage = _scs([val, "img:first"], "06 Image").src;
                                var itemId = __sco.text(_scs([val, ".iteminfo"])[0].childNodes[0]).replace("Item #:", "");

                                if (_scs([val, "strike:first"])) {
                                    var oldP = _scs([val, ".linetotal:first"], "tt", ["text"]).split(" ")[0];
                                    var fullP = _scs([val, ".linetotal:first"], "tt", ["text"]).split(" ")[1];
                                    var itemPrice = __sco.pricecurr(_scs([val, ".linetotal:first"], "tt", ["text"]).split(" ")[1]);
                                }
                                else {
                                    var itemPrice = _scs([val, ".linetotal:first"], "04 Value", ["text", "pricecurr"]);
                                }
                                var rollingTotal = rollingTotal + (itemPrice * 1);



                                //default placeholder for base64 images 
                                if (__sco.contains(itemImage, "base64") || itemImage.length > 180) {
                                    itemImage = "http://images.salecycle.com/17810/5418/placeholder.jpg";
                                }

                                __scd.b.i.push({
                                    'n': itemName,
                                    'i': itemId,
                                    'q': itemQty,
                                    'v': itemPrice,
                                    'f1': itemLink,
                                    'u': itemImage,
                                    'size': size,
                                    'colour': colour,
                                    "f2": __scd.s.cartid
                                });
                            }
                        }
                    }
                });
            }
        }
        catch (be1) {
            be1.description = "101 " + (be1.description || "");
            __sco.error(be1);
        }
    }
    else {
        try {
            if (__sco.contains(__sco.loc, "/cart")) {
                if (_scs("#totalprice")) {
                    __scd.b.v = _scs("#totalprice", "Total Value", ["text", "pricecurr"]);
                    __scd.s.cartid = __sco.inbetween("=", "", __sco.attr(_scs('.chkoutbtn:first a:first'), "href"), "fl");
                }
            }
            else if (_scs("#sumItemTotal")) {
                __scd.b.v = _scs("div#sumItemTotal", "Total Value", ["text", "pricecurr"]);
                if (!__sco.contains(__sco.loc, "err")) {
                    __scd.s.cartid = __sco.inbetween("=", "", __sco.loc, "fl");
                }
            }
            

            if (__sco.contains(__scd.s.cartid, "&")) {
                __scd.s.cartid = __sco.inbetween("", "&", __scd.s.cartid, "ff");
            }
            __scd.b.c = __sco.cursym;
            __scd.s.l = __scd.s.cartid;
        }
        catch (be2) {
            be2.description = "201 " + (be2.description || "");
            __sco.error(be2);
        }
        try {
            if (__sco.contains(__sco.loc, "/cart") || __sco.contains(__sco.loc, "/checkout")) {

                var rollingTotal = 0;

                __sco.each(_scs(".cartgroup"), function (ix, val) {
                    var src = "(http://|https://)", href = "(http://|https://)";
                    // Set basket values here


                    if (__sco.contains(__sco.loc, "/cart") && _scs([val, ".remove:first a:first"]) || _scs([val, ".cartRemove:first"])) {

                        if (_scs([val, ".qtyinput"])) {

                            var size = __sco.getvt(_scs("input[name=ItemSize" + (ix) + "]:first"));
                            var colour = __sco.getvt(_scs("input[name=ItemColor" + (ix) + "]:first"));

                            if (size != "") {
                                size = "Size: " + size;
                            }
                            if (colour != "") {
                                colour = "Color: " + colour;
                            }

                            var itemName = toTitleCase(_scs([val, "a:first"], "01 Item name", ["text"]));
                            var itemQty = __sco.getvt(_scs([val, ".qtyinput:first"], "03 Qty"));
                            var itemLink = __sco.attr(_scs([val, 'a:first'], 'Link'), "href");
                            if (!__sco.contains(itemLink, "chadwicks.com")) {
                                itemLink = "http://www.chadwicks" + itemLink;
                            }
                            var itemImage = __sco.attr(_scs([val, 'img:first'], 'image', 'src'), "src")
                            var itemId = __sco.clear(_scs([val, "a:first"], "02 Item Id", ["text"]), " ", "g", "-");


                            if (_scs([val, ".strikePrice:first"])) {
                                var oldP = _scs([val, ".strikePrice:first"], "Strike Grab", ["text"]);
                                var fullP = _scs([val, ".linetotal:first"], "04 Value", ["text"]);
                                var itemPrice = __sco.pricecurr(__sco.clear(fullP, oldP, "g", "").replace(" Was ", "").replace("Was ", "").replace(oldP, ""));
                            }
                            else {
                                var itemPrice = _scs([val, ".linetotal:first"], "04 Value", ["text", "pricecurr"]);
                            }

                            var rollingTotal = rollingTotal + (itemPrice * 1);
                        }
                        else if (__sco.contains(__sco.loc, "/checkout")) {
                            var itemPrice = _scs([val, "div:first"], "Price", ["text", "pricecurr"]);
                            var itemQty = __sco.getvt(_scs([val, ".na_itmqty:first"], "Price"))
                            var itemName = __sco.text(_scs([val, "div:nth-child(1)"]).childNodes[0]);
                            var itemImage = _scs([val, "img:first"], "06 Image").src;
                            var itemId = __sco.clear(itemName, " ", "g", "-");
                            var itemLink = "http://www.chadwicks.com/products.asp?sku=" + itemName.split(":")[1].split(" ")[0];
                            var size = "", colour = "";
                        }

                        //var item =  _scs("meta[name=ncxcartid]:first").content;
                        var item = __sco.attr(_scs("meta[name=ncxcartid]:first"), "content");

                        //default placeholder for base64 images 
                        if (__sco.contains(itemImage, "base64") || itemImage.length > 180) {
                            itemImage = "http://images.salecycle.com/17810/5418/placeholder.jpg";
                        }


                        __scd.b.i.push({
                            'n': itemName,
                            'i': itemId,
                            'q': itemQty,
                            'v': itemPrice,
                            'f1': itemLink,
                            'u': itemImage,
                            'size': size,
                            'colour': colour,
                            'l': item,
                            "f2": __scd.s.cartid
                        });
                    }
                });
            }
        }
        catch (be1) {
            be1.description = "101 " + (be1.description || "");
            __sco.error(be1);
        }

    }
}

/** Get the data for status 2 **/
__sco.scraper.statustwo = function () {
    try {
        // Do any extra status 2 scraping you want here
        //Delivery cost
        //__scd.s.deliverycost = _scs('div#sumOrderShip:last', 'shipping amount', ['text', 'pricecurr']);
    }
    catch (s2) {
        s2.description = "2000 " + (s2.description || "");
        __sco.error(s2);
    }
}

/** Get the data for status 3 **/
__sco.scraper.statusthree = function () {
    try {
        // Get the order number and so on here
        // The order number must be in the session field __scd.s.ordernumber and also __scd.o for V2 clients
        __scd.s.ordernumber = _scs('div.orderMessage:first b:first', '', ['text']);
    }
    catch (s3) {
        s3.description = "3000 " + (s3.description || "");
        __sco.error(s3);
    }
}

/** Get the data for status 4 **/
__sco.scraper.statusfour = function () {
    try {
        // Get any data you want to assocaite
    }
    catch (s4) {
        s4.description = "4000 " + (s4.description || "");
        __sco.error(s4);
    }
}

/** Main function - sets up and controls the overall flow **/
__sco.management.main = function () {
    // First entry point of the script 
    try {
        // Create a custom error, this can be thrown and handled differently - stops script executing
        __sco.management.NoSupport = function (message) { this.name = "NoSupport"; this.message = message || ""; }
        __sco.management.NoSupport.prototype = new Error();

        if (__sco.management.canexec()) {

            // Set up support properties in the support module, return value indicating whether or not we can work!
            if (!__sco.support.setsupport())
                throw new __sco.management.NoSupport("No Support Available");

            // If client is set to live, update the config entries for v1
            if (__sco.config.live) {
                __sco.config.v1api = __sco.config.v1api.replace("d30ke5tqu2tkyx.cloudfront.net", "d16fk4ms6rqz1v.cloudfront.net");
                __sco.config.errorapi = __sco.config.errorapi.replace("d30ke5tqu2tkyx.cloudfront.net", "d16fk4ms6rqz1v.cloudfront.net");
                __sco.config.v1completion = __sco.config.v1completion.replace("d30ke5tqu2tkyx.cloudfront.net", "d16fk4ms6rqz1v.cloudfront.net");
                __sco.config.v1providerhost = __sco.config.v1providerhost.replace("d30ke5tqu2tkyx.cloudfront.net", "d16fk4ms6rqz1v.cloudfront.net");
            }

            /** 
                Multiple Client ID's to be set here 
                Put conditions inside the try to work out the client ID, then set the client ID and GUID
            **/
            /**
                try {
                    __sco.config.doc.i1 = 
                    __sco.config.timestamptemplate.i1 = 
                    __sco.config.v1guid = 
                }
                catch(ce) {
                    ce.title = "MAIN__ClientDecision__";
                    // Client ID Error
                    if (__sco.config.v1)
                        __sco.sender.send("POST", __sco.config.errorapi, __sco.v1runtime(ce));
                }
            **/

            // Check whether or not the provider needs to be initialised, if so then initialise it
            // If provider, add callback which calls adaded to handle case when provider loads before page load
            // If not, just add contentLoaded as normal
            if (__sco.support.useprovider) {
                if (__sco.config.v2 && __sco.config.v1) {
                    __sco.management.v1listener = new __sco.provider(__sco.config.v1providerhost + "?id=" + __sco.config.v1guid.toUpperCase(), "sc_provider_v1", __sco.management.interget, ["__sc", __sco.management.setsession, false]);
                    __sco.management.listener = new __sco.provider(__sco.config.providerhost + "?id=" + __sco.config.guid.toUpperCase(), "sc_provider_iframe", __sco.management.interget, ["__sc", __sco.management.setsession, false]);
                }
                else if (__sco.config.v1)
                    __sco.management.listener = new __sco.provider(__sco.config.v1providerhost + "?id=" + __sco.config.v1guid.toUpperCase(), "sc_provider_iframe", __sco.management.interget, ["__sc", __sco.management.setsession, false]);
                else
                    __sco.management.listener = new __sco.provider(__sco.config.providerhost + "?id=" + __sco.config.guid.toUpperCase(), "sc_provider_iframe", __sco.management.interget, ["__sc", __sco.management.setsession, false]);
                // If provider and completion send IP user agent timestamp
                if (__sco.management.iscompletion()) {
                    var timestamp = __sco.clone(__sco.config.timestamptemplate), current = false;
                    if (!__sco.support.storeprovider)
                        current = __sco.tryparse(__sco.storage.get("__sc" + __sco.config.doc[__sco.config.v2 ? 'i' : 'i1'], false));
                    timestamp.t = 301; // Don't have a previous status so set to holding status
                    timestamp.i = __sco.config.doc.i;
                    timestamp.i1 = __sco.config.doc.i1;
                    if (__sco.type(current) == "object") {
                        timestamp.s.i = current.s.i;
                        timestamp.s.m = current.s.m;
                    }
                    __sco.management.timestampapi(timestamp);
                }
            }
            else {
                // If completion, get machine ID from cookie and send timestamp
                if (__sco.management.iscompletion()) {
                    var timestamp = __sco.clone(__sco.config.timestamptemplate), current = __sco.config.fallbackallowed ? false : __sco.tryparse(__sco.storage.get("__sc" + __sco.config.doc[__sco.config.v2 ? 'i' : 'i1'], false));
                    timestamp.t = 301; // Default to 301 to protect against case where data not recovered from storage
                    timestamp.i = __sco.config.doc.i;
                    timestamp.i1 = __sco.config.doc.i1;
                    if (__sco.type(current) == "object") {
                        timestamp.t = current.t;
                        timestamp.s.i = current.s.i;
                        timestamp.s.m = current.s.m;
                        timestamp.t = 300;
                    }
                    __sco.management.timestampapi(timestamp);
                }
                // Change the triggers and set to use traditional data capture methods if allowed
                if (__sco.config.fallbackallowed) {
                    __sco.support.traditional = true;
                    __sco.config.triggers = ['load'];
                    __sco.config.translatev1 = true;
                    __sco.config.v1api = __sco.config.v1api.replace("/lite/impression.ashx", "/capture.aspx");
                    __sco.config.v1completion = __sco.config.v1completion.replace("/lite/impression.ashx", "/pixelcapture.aspx");
                }
                __sco.management.contentLoaded(window, __sco.management.interget, ["__sc", __sco.management.setsession, false]);
            }
        }
    }
    catch (me) {
        if (me instanceof __sco.management.NoSupport) {
            // No support so we cannot run, report it
            __sco.management.nosupport(false);
        }
        else {
            me.title = "MAIN__";
            // Generic error, report it back
            if (__sco.config.v1)
                __sco.sender.send("POST", __sco.config.errorapi, __sco.v1runtime(me));
        }
    }
}

__sco.management.prerun = function () { try { var a = !1, b = !1, c = !1; __sco.config.geoip && (__scd.s.geo = !0); if (0 < (a = __sco.management.iscompletion()) || __sco.management.iscompletion()) b = !0, __sco.scraper.statusthree(), __sco.management.itemtypes(), (a = __sco.tonumber(a)) && 300 <= a && 400 > a ? __sco.management.setstatus(a, __sco.management.run) : __sco.management.setstatus(300, __sco.management.run); else if (0 < (a = __sco.management.killit()) || __sco.management.killit()) b = !0, __sco.scraper.statusfour(), (a = __sco.tonumber(a)) && 400 <= a && 500 > a ? __sco.management.setstatus(a, __sco.management.run) : __sco.management.setstatus(400, __sco.management.run); else if (0 < (a = __sco.management.isstatusone()) || __sco.management.isstatusone()) { b = !0; __sco.lastbasket = __sco.clone(__scd.b); customer = ""; __scd.b = __sco.clone(__sco.config.doc.b); __sco.scraper.statusone(); 0 == __sco.lastbasket.i.length && 0 == __scd.b.i.length && 200 > __scd.t ? c = !0 : 0 < __sco.lastbasket.i.length && 0 == __scd.b.i.length && (__scd.b = __sco.clone(__sco.lastbasket)); __sco.management.itemtypes(); if (__sco.config.migrationcollect && __sco.config.persistcustomer && isFinite((new Date(__sco.config.startdate)).getTime()) && (new Date).getTime() - new Date(__sco.config.startdate) < 864E5 * __sco.config.daystorun && (customer = __sco.storage.get("__sc")) && "string" == __sco.type(customer)) { __scd.c.e = "" == __scd.c.e && 1 < customer.split(":").length ? customer.split(":")[1] : __scd.c.e; __scd.c.p.l = "" == __scd.c.p.l && 2 < customer.split(":").length ? customer.split(":")[2] : __scd.c.p.l; var d = 0 < customer.split(":").length && 0 < customer.split(":")[0].split("|").length ? customer.split(":")[0].split("|") : []; __scd.c.f = 0 < d.length && "" == __scd.c.f ? d[0] : __scd.c.f; __scd.c.l = 1 < d.length && "" == __scd.c.l ? d[1] : __scd.c.l } c ? __sco.management.run() : (a = __sco.tonumber(a)) && 100 <= a && 200 > a ? __sco.management.setstatus(a, __sco.management.run) : __sco.management.setstatus(100, __sco.management.run) } else if (0 < (a = __sco.management.isstatustwo()) || __sco.management.isstatustwo() || "string" == __sco.type(__scd.c.e) && "" != __scd.c.e) b = !0, __sco.scraper.statustwo(), (a = __sco.tonumber(a)) && 200 <= a && 300 > a ? __sco.management.setstatus(a, __sco.management.run) : __sco.management.setstatus(200, __sco.management.run); b || __sco.management.run() } catch (e) { e.title = "PRERUNTIME__", __sco.config.v1 && __sco.sender.send("POST", __sco.config.errorapi, __sco.v1runtime(e)) } }; __sco.management.run = function () { function a() { 300 <= __scd.t && 400 > __scd.t ? "3" != __sco.oldtype && __sco.management.sendtoapi() : "boolean" == __sco.type(__sco.management.trigger.set) && (__sco.contains(__sco.config.triggers, "load") || __sco.support.touchscreen) ? __sco.management.callback("load") : __sco.management.trigger.setup() } function b(a) { a || (a = __sco.clone(__sco.config.timestamptemplate), a.t = __scd.t, a.i = __sco.config.doc.i, a.i1 = __sco.config.doc.i1, a.s.i = __scd.s.i, a.s.m = __scd.s.m, __sco.management.intersend("POST", __sco.config.v2api, a)) } try { 100 <= __scd.t && 200 > __scd.t && __sco.config.v2 && !__sco.contains(__sco.config.triggers, "load") && !__sco.support.touchscreen && __sco.management.interget("__sc__lastsent", b), __sco.management.interset("__sc", __scd, a) } catch (c) { c.title = "RUNTIME__", __sco.config.v1 && __sco.sender.send("POST", __sco.config.errorapi, __sco.v1runtime(c)) } }; __sco.management.setsession = function (a) { try { var b = "", c = "", d = "", e = "", f = {}, h = __sco.storage.get("__scSMT"); "object" == __sco.type(a) && "object" == __sco.type(a.c) && "object" == __sco.type(a.s) ? (b = a.s.m, c = a.s.i, e = __sco.tonumber(a.d), d = a.t.toString().charAt(0), __scd = a) : (b = __sco.mid(), c = __sco.guid(), e = (new Date).getTime(), __scd = __sco.clone(__sco.config.doc), __sco.support.updatedoc(), d = __scd.t.toString().charAt(0)); h && "string" == __sco.type(h) && 0 < h.split(":").length && __sco.tonumber(h.split(":")[0]) && (h = h.split(":")[0]) && (b = h != b ? h : b); if (Math.floor(((new Date).getTime() - e) / 1E3) > __sco.config.sessiontime || "3" == d) c = __sco.guid(), f = __sco.clone(__scd.c), __scd = __sco.clone(__sco.config.doc), __sco.management.interremove("__sc__lastsent"), __sco.config.persistcustomer && (__scd.c = f), __sco.support.updatedoc(), __scd.t = 0; __sco.support.traditional ? (__scd.s.i = "", __scd.s.m = "") : (__scd.s.m = b, __scd.s.i = c); __scd.d = (new Date).getTime().toString(); __sco.__scd = __sco.clone(__scd); __sco.oldtype = d; __sco.management.prerun() } catch (k) { k.title = "SETSESSION__", __sco.config.v1 && __sco.sender.send("POST", __sco.config.errorapi, __sco.v1runtime(k)) } }; __sco.management.isstatusone = function () { var a = !1; __sco.each(__sco.config.status1, function (b, c) { a || (a = "string" === __sco.type(c) ? __sco.contains(__sco.loc, c) : "function" === __sco.type(c) ? c.call(window) : !1) }); return a }; __sco.management.isstatustwo = function () { var a = !1; __sco.each(__sco.config.status2, function (b, c) { a || (a = "string" === __sco.type(c) ? __sco.contains(__sco.loc, c) : "function" === __sco.type(c) ? c.call(window) : !1) }); return a }; __sco.management.iscompletion = function () { var a = !1; __sco.each(__sco.config.status3, function (b, c) { a || (a = "string" === __sco.type(c) ? __sco.contains(__sco.loc, c) : "function" === __sco.type(c) ? c.call(window) : !1) }); return a }; __sco.management.isexcluded = function () { var a = !1; __sco.each(__sco.config.exclude, function (b, c) { a || (a = "string" === __sco.type(c) ? __sco.contains(__sco.loc, c) : "function" === __sco.type(c) ? c.call(window) : !1) }); return a }; __sco.management.killit = function (a) { if ("event" == __sco.type(a)) __scd.t = 400, __sco.management.interset("__sc", __scd, function () { __sco.management.callback("load") }); else { var b = !1; __sco.each(__sco.config.status4, function (a, d) { b || (b = "string" === __sco.type(d) ? __sco.contains(__sco.loc, d) : "function" === __sco.type(d) ? d.call(window) : !1) }); return b } }; __sco.management.external = function () { __sco.each(__sco.config.external, function (a, b) { if (null != _scs(a)) __sco.on("mousedown", "function" !== __sco.type(b) ? __sco.management.killit : b, _scs(a)) }) }; __sco.management.itemtypes = function () { __scd.b.v = "string" !== __sco.type(__scd.b.v) && __sco.noru(__scd.b.v) ? __scd.b.v.toString() : __scd.b.v; __sco.each(__scd.s, function (a, b) { __scd.s[a] = "string" !== __sco.type(b) && __sco.noru(b) ? b.toString() : b }); __sco.each(__scd.b.i, function (a, b) { __scd.b.i[a].q = "number" !== __sco.type(b.q) && __sco.noru(b.q) ? __sco.tonumber(b.q) : b.q; __scd.b.i[a].v = "string" !== __sco.type(b.v) && __sco.noru(b.v) ? b.v.toString() : b.v; __sco.each(__scd.b.i[a], function (b, d) { __sco.contains(__sco.config.itemfields, b) || (__scd.b.i[a][b] = "string" !== __sco.type(d) && __sco.noru(d) ? d.toString() : d) }) }) }; __sco.management.setstatus = function (a, b, c) { __sco.management.interget("__sc", function (d) { 0 < a && 400 <= __scd.t && 413 != __scd.t && __sco.contains(__sco.config.status4restart, a) ? (__sco.management.haschanged(__sco.tryparse(d.data)) && __sco.management.sendtoapi(), __scd.s.i = __sco.guid(), __scd.b = __sco.clone(__sco.config.doc.b), __sco.management.interremove("__sc__lastsent"), __sco.config.persistcustomer || (__scd.c = __sco.clone(__sco.config.doc.c)), __sco.support.updatedoc(), __scd.t = a) : 0 < a && 400 <= __scd.t && 413 != __scd.t && __sco.contains(__sco.config.status4overwrite, a) ? __scd.t = a : 0 < a && 400 > __scd.t && (__scd.t = a); __sco.noru(b) && ("array" == __sco.type(c) ? b.apply(window, c) : b.call(window)) }) }; __sco.management.canexec = function () { function a() { var a = !1; __sco.each(__sco.config.onchange, function (b, c) { a || __sco.each(c, function (b, c) { null != __sco.getdom(_scs(c)) && (a = !0) }) }); return a } try { var b = __sco.management.isstatusone(), c = __sco.management.isstatustwo() || a(), d = __sco.management.iscompletion(), e = __sco.management.killit(); return !__sco.management.isexcluded() && (b || 0 < b || c || d || 0 < d || e || 0 < e) ? !0 : !1 } catch (f) { return !0 } }; __sco.management.nosupport = function (a) { try { var b = "NO SUPPORT "; a && (b += " NO PROVIDER STORAGE "); __sco.config.v1 && (__sco.support && "undefined" !== __sco.type(__sco.support.cors) && __sco.each(__sco.support, function (a, c) { "function" !== __sco.type(c) && "array" !== __sco.type(c) && (b += a + " : " + c + " ") }), __sco.management.intersend("POST", __sco.config.errorapi, __sco.v1runtime(b))); if (__sco.config.v2) { var c = __sco.clone(__sco.config.doc); c.g.push({ s: 100, d: (new Date).getTime(), e: [{ c: "100", d: (new Date).getTime(), t: b, n: b }] }); __sco.management.intersend("POST", __sco.config.v2api, c) } } catch (d) { } }; __sco.management.haschanged = function (a) { try { var b = __sco.__scd, c = __sco.tonumber(a && __sco.tonumber(a.d) && __sco.tonumber(a.d) > __sco.tonumber(__scd.d) ? a.d : __scd.d); return Math.floor(((new Date).getTime() - c) / 1E3) > __sco.config.sessiontime ? (__scd.s.i = __sco.guid(), __scd.b = __sco.clone(__sco.config.doc.b), __sco.management.interremove("__sc__lastsent"), __sco.config.persistcustomer || (__scd.c = __sco.clone(__sco.config.doc.c)), __sco.support.updatedoc(), __scd.t = 0, !0) : a && __sco.tonumber(a.d) && a.d != __scd.d && __sco.tonumber(a.d) > __sco.tonumber(__scd.d) ? (__scd.c = __sco.extend(a.c, __scd.c, !0), __scd.s = __sco.extend(a.s, __scd.s, !0), __scd.t = 300 <= a.t && 400 > a.t ? a.t : 0 < a.t ? a.t : __scd.t, 0 < a.b.i.length && SCJSON.stringify(__scd.b) != SCJSON.stringify(a.b) && (__scd.b = __sco.clone(a.b)), !0) : b ? SCJSON.stringify(b.b) != SCJSON.stringify(__scd.b) || SCJSON.stringify(b.c) != SCJSON.stringify(__scd.c) || b.s.i != __scd.s.i || SCJSON.stringify(__scd.g) != SCJSON.stringify(b.g) : !0 } catch (d) { return !0 } }; __sco.management.trigger.setup = function () { "undefined" === __sco.type(__sco.management.trigger.set) && (__sco.contains(__sco.config.triggers, "timeout") && __sco.management.callback("timeout"), __sco.contains(__sco.config.triggers, "exit") && (__sco.lastmove = 0, __sco.on("mouseout", function (a) { (a.relatedTarget || a.toElement) == this.parentNode && (0 == __sco.lastmove || 1E3 < (new Date).getTime() - __sco.lastmove) && (__sco.lastmove = (new Date).getTime(), __sco.management.callback("exit")) }, document)), (__sco.contains(__sco.config.triggers, "load") || __sco.support.touchscreen) && __sco.management.callback("load"), __sco.processonchange(), __sco.management.external(), __sco.management.trigger.set = !0) }; __sco.management.callback = function (a) { function b(a) { __sco.management.haschanged(a) ? (__sco.management.sendtoapi(), __sco.management.interset("__sc", __scd)) : __sco.management.interget("__sc__lastsent", c, !1) } function c(a) { (!a || a < (new Date).getTime() - 1E3 * __sco.config.mintimeout) && 0 < __scd.t && (a = __sco.clone(__sco.config.timestamptemplate), a.t = __scd.t, a.i = __sco.config.doc.i, a.i1 = __sco.config.doc.i1, a.s.i = __scd.s.i, a.s.m = __scd.s.m, __sco.management.timestampapi(a)) } function d(a) { var c = (new Date).getTime(), d = 0, k; !a || a < c - 1E3 * __sco.config.timeout ? ("number" == __sco.type(__sco.tonumber(a)) && a < c - 1E3 * __sco.config.timeout && __sco.management.interget("__sc", b), k = setInterval(function () { __sco.management.interget("__sc", b); d++; d > __sco.config.timerruns && clearTimeout(k) }, 1E3 * __sco.config.timeout)) : setTimeout(function () { __sco.management.interget("__sc", b); k = setInterval(function () { __sco.management.interget("__sc", b); d++; d > __sco.config.timerruns && clearTimeout(k) }, 1E3 * __sco.config.timeout) }, 1E3 * __sco.config.timeout - (c - a)) } "exit" == a || "load" == a ? __sco.management.interget("__sc", b) : "timeout" == a && __sco.management.interget("__sc__lastsent", d, !1) }; __sco.management.react = function (a) { if (__sco.management.validate(a)) try { var b = __sco.tryparse(a.data), c = b.ticket; "number" == __sco.type(c) && 0 <= c && __sco.tickets[c].call(window, b.data) } catch (d) { d.title = "React_Error", __sco.error(d) } }; __sco.management.interget = function (a, b, c) { if ("__sc" == a || "__sc__lastsent" == a) a += __sco.config.doc[__sco.config.v2 ? "i" : "i1"]; __sco.support.storeprovider && __sco.support.ps ? (c = "undefined" === __sco.type(c) ? !1 : c, b = __sco.tickets.push(b), __sco.management.listener.get(a, c, b - 1)) : b.call(window, __sco.support.traditional ? !1 : __sco.storage.get(a, c)) }; __sco.management.interset = function (a, b, c) { if ("__sc__lastsent" == a || "__sc" == a) __scd.d = (new Date).getTime().toString(), a += __sco.config.doc[__sco.config.v2 ? "i" : "i1"]; if (__sco.support.storeprovider && __sco.support.ps) { var d = -1; "function" === __sco.type(c) && (d = __sco.tickets.push(c)); __sco.management.listener.set(a, b, d - 1) } else __sco.support.traditional ? "function" === __sco.type(c) ? c.call(window, !1) : null : "function" === __sco.type(c) ? c.call(window, __sco.storage.set(a, b)) : __sco.storage.set(a, b) }; __sco.management.intersend = function (a, b, c, d, e, f) { function h(a) { d.call(window, a) } f || "GET" != a || (f = Math.floor(4095 * Math.random()).toString(), b += (-1 < b.indexOf("?") ? "&" : "?") + "cbi1=" + f); __sco.support.cors || !__sco.support.postmessage || __sco.support.postmessage && "undefined" != __sco.type(__sco.management.listener) && !__sco.management.listener.ready ? __sco.sender.send(a, b, c, "function" === __sco.type(d) ? h : null, e) : (f = -1, "function" === __sco.type(d) && (f = __sco.tickets.push(d)), __sco.config.v1 && __sco.config.v2 ? __sco.management[__sco.contains(b, "/lite/") || __sco.contains(b, "/import/") ? "v1listener" : "listener"].send(a, b, c, f - 1, e) : __sco.management.listener.send(a, b, c, f - 1, e)) }; __sco.management.interremove = function (a, b) { if ("__sc" == a || "__sc__lastsent" == a) a += __sco.config.doc[__sco.config.v2 ? "i" : "i1"]; if (__sco.support.storeprovider) { var c = -1; "function" === __sco.type(b) && (c = __sco.tickets.push(b)); __sco.management.listener.remove(a, c - 1) } else __sco.support.traditional ? "function" === __sco.type(b) ? b.call(window, !1) : null : "function" === __sco.type(b) ? b.call(window, __sco.storage.remove(a)) : __sco.storage.remove(a) }; __sco.management.validate = function (a) { return "string" != __sco.type(a.origin) || a.origin != __sco.config.v1providerhost.match(/(http[s]*:\/\/[\w\W]+(\.com|\.co\.uk|\.net))/)[0] && a.origin != __sco.config.providerhost.match(/(http[s]*:\/\/[\w\W]+(\.com|\.co\.uk|\.net))/)[0] && "self" != a.origin ? !1 : !0 }; __sco.management.timestampapi = function (a) { function b(b) { var d, e = "object" == __sco.type(__scd) && "object" == __sco.type(__scd.b) && "object" == __sco.type(__scd.c); "object" != __sco.type(a) || e || (d = __sco.clone(__sco.config.timestamptemplate), d.t = a.t, d.s.i = a.s.i, d.s.m = a.s.m, d.i = __sco.config.doc.i, d.i1 = __sco.config.doc.i1, d.o = ""); !b && e ? __sco.management.sendtoapi() : (__sco.config.v1 && __sco.management.intersend("POST", (e ? 300 <= __scd.t : 300 <= d.t) && (e ? 400 > __scd.t : 400 > d.t) ? __sco.config.v1completion : __sco.config.v1api, __sco.contains(__sco.config.v1api, "/lite/") ? a : __sco.translatetov1(e ? __scd : d)), __sco.config.v2 && __sco.management.intersend("POST", __sco.config.v2api, a), e && (__sco.management.interset("__sc__lastsent", (new Date).getTime()), __scd.d = (new Date).getTime().toString(), __sco.__scd.d = __sco.clone(__scd.d), __sco.management.interset("__sc", __scd))) } "undefined" == __sco.type(__sco.management.listener) || "undefined" != __sco.type(__sco.management.listener) && !__sco.management.listener.ready ? b(!1) : __sco.management.interget("__sc__lastsent", b) }; __sco.management.sendtoapi = function () { if (0 < __scd.t || 0 < __scd.g.length) { __sco.management.interset("__sc__lastsent", (new Date).getTime()); __sco.config.v1 && __sco.management.intersend("POST", 300 <= __scd.t && 400 > __scd.t ? __sco.config.v1completion : __sco.config.v1api, __sco.config.translatev1 ? __sco.translatetov1(__scd) : __scd); if (__sco.config.v2) { var a = __sco.clone(__scd); __sco.support.traditional && (a.r = 300); __sco.management.intersend("POST", __sco.config.v2api, a) } __sco.__scd = __sco.clone(__scd) } }; __sco.management.contentLoaded = function (a, b, c) { var d = !1, e = !0, f = a.document, h = f.documentElement, k = function (e) { if ("readystatechange" != e.type || "complete" == f.readyState) __sco.off(e.type, k, "load" == e.type ? a : f), !d && (d = !0) && b.apply(a, c || [], e.type || e) }, p = function () { try { h.doScroll("left") } catch (a) { setTimeout(p, 50); return } k("poll") }; if ("complete" == f.readyState) b.apply(a, c || []); else { if (f.createEventObject && h.doScroll) { try { e = !a.frameElement } catch (v) { } e && p() } __sco.on("DOMContentLoaded", k, f); __sco.on("readystatechange", k, f); __sco.on("load", k, a) } }; _scs = function (a, b, c) { function d(a) { return a.replace(u, t) } function e(a, b) { var c = []; __sco.each(__sco.toarray(a), function (a, d) { 1 != d.nodeType && 9 != d.nodeType || "string" === __sco.type(b) && d.nodeName.toLowerCase() !== b || c.push(d) }); return c } function f(a) { var b = []; __sco.each(a, function (a, c) { 3 == c.nodeType && b.push(c) }); return b } function h(a, b) { var c = [], d = new RegExp("(^|\\s+)(" + b + ")($|\\s+)"); __sco.each(a, function (a, b) { 1 === b.nodeType && null != b.className.match(d) && c.push(b) }); return c } function k(a, b) { var c = [], d = 0, g = 0, f = (b || document).getElementsByTagName(a); c[0] = f[0]; for (var e = 1; e < f.length; e++) null != c[d] && (g += c[d].getElementsByTagName(a).length, g++, d++, null != f[g] && (c[d] = f[g])); return c } function p(a, b, c) { var d = []; if (1 === a.nodeType || 9 === a.nodeType) b ? (b = __sco.attr(a, c.match(l.ATTR)[1]), null != b && null != b.match(new RegExp("^" + c.match(l.ATTR)[5] + "$")) && (d = d.concat(__sco.toarray(a)))) : (a = a.getElementsByTagName("*"), __sco.each(a, function (a, b) { var f = __sco.attr(b, c.match(l.ATTR)[1]); null != f && null != f.match(new RegExp("^" + c.match(l.ATTR)[5] + "$")) && (d = d.concat(__sco.toarray(b))) })); return d } function v(a, b, c) { var f = []; if (1 === a.nodeType || 9 === a.nodeType) b ? null != __sco.attr(a, d(c.match(l.ATTR)[1])) && (f = f.concat(__sco.toarray(a))) : (a = a.getElementsByTagName("*"), __sco.each(a, function (a, b) { __sco.attr(b, d(c.match(l.ATTR)[1])) && (f = f.concat(__sco.toarray(b))) })); return f } function r(a, b, c, q) { if (null != b) { if (null != a.match(l.ID)) { m[c] = __sco.ltrim(m[c].replace(a.match(l.ID)[0], "")); var g = document.getElementById(d(a.match(l.ID)[1])), g = null == g ? null : g.id != d(a.match(l.ID)[1]) ? null : g; return "" === m[c] ? g : r(m[c], g, c, 1) } if (null != a.match(l.TAG)) return m[c] = __sco.ltrim(m[c].replace(a.match(l.TAG)[0], "")), g = [], "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (b, c) { 1 === c.nodeType && (g = g.concat(__sco.toarray(c.getElementsByTagName(d(a.match(l.TAG)[0]))))) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? g = g.concat(__sco.toarray((q ? b : document).getElementsByTagName(d(a.match(l.TAG)[0])))) : g = g.concat(__sco.toarray(b.getElementsByTagName(d(a.match(l.TAG)[0])))), "" === m[c] ? 0 === g.length ? null : g : r(m[c], null == g || 0 == g.length ? null : g, c, 1); if (null != a.match(l.CLASS)) return m[c] = __sco.ltrim(m[c].replace(a.match(l.CLASS)[0], "")), g = [], "function" == __sco.type(document.getElementsByClassName) && -1 < document.getElementsByClassName.toString().indexOf("[native code]") ? "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (b, c) { 1 === c.nodeType && (g = q ? g.concat(null != c.className.match(new RegExp("(^|\\s+)(" + d(a.match(l.CLASS)[1]) + ")($|\\s+)")) ? __sco.toarray(c) : []) : g.concat(__sco.toarray(c.getElementsByClassName(d(a.match(l.CLASS)[1]))))) }) : g = g.concat(__sco.toarray(("htmlelement" != __sco.type(b) && 0 == b.length ? document : b).getElementsByClassName(d(a.match(l.CLASS)[1])))) : "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (b, c) { 1 === c.nodeType && (q ? null != c.className.match(new RegExp("(^|\\s+)(" + d(a.match(l.CLASS)[1]) + ")($|\\s+)")) && (g = g.concat(__sco.toarray(c))) : g = g.concat(__sco.toarray(h(c.getElementsByTagName("*"), d(a.match(l.CLASS)[1]))))) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? g = g.concat(__sco.toarray(h(document.getElementsByTagName("*"), d(a.match(l.CLASS)[1])))) : q ? g = g.concat(__sco.toarray(h(__sco.toarray(b), d(a.match(l.CLASS)[1])))) : g = g.concat(__sco.toarray(h(b.getElementsByTagName("*"), d(a.match(l.CLASS)[1])))), "" === m[c] ? 0 === g.length ? null : g : r(m[c], null == g || 0 == g.length ? null : g, c, 1); if (null != a.match(l.ATTR)) return m[c] = __sco.ltrim(m[c].replace(a.match(l.ATTR)[0], "")), g = [], "undefined" !== typeof a.match(l.ATTR)[5] ? "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (b, c) { g = g.concat(p(c, q, a)) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? __sco.each([document], function (b, c) { g = g.concat(p(c, q, a)) }) : g = g.concat(p(b, q, a)) : "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (b, c) { g = g.concat(v(c, q, a)) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? __sco.each([document], function (b, c) { g = g.concat(v(c, q, a)) }) : g = g.concat(v(b, q, a)), "" === m[c] ? 0 === g.length ? null : g : r(m[c], null == g || 0 == g.length ? null : g, c, 1); if (null != a.match(l.CHILD)) { var n = a.match(l.CHILD), g = []; m[c] = __sco.ltrim(m[c].replace(a.match(l.CHILD)[0], "")); if ("first" == n[1] || "last" == n[1] || "nth-child" == n[1]) switch (n[1]) { case "first": return g = "htmlelement" != __sco.type(b) && 0 < b.length ? b[0] : b.length ? null : b, "" === m[c] ? null == g || 0 === g.length ? null : g : r(m[c], null == g || 0 == g.length ? null : g, c, 1); case "last": return g = "htmlelement" != __sco.type(b) && 0 < b.length ? b[b.length - 1] : b.length ? null : b, "" === m[c] ? null == g || 0 === g.length ? null : g : r(m[c], null == g || 0 == g.length ? null : g, c, 1); case "nth-child": return g = "htmlelement" != __sco.type(b) && "NaN" !== parseFloat(n[2]).toString() && b.length > n[2] ? b[n[2]] : null, "" === m[c] ? null == g || 0 === g.length ? null : g : r(m[c], null == g || 0 == g.length ? null : g, c, 1) } else { if ("children" == n[1]) return "undefined" != __sco.type(n[2]) ? "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (a, b) { g = g.concat(__sco.toarray(e(b.childNodes, n[2]))) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? g = [] : g = g.concat(__sco.toarray(e(b.childNodes, n[2]))) : "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (a, b) { g = g.concat(__sco.toarray(e(b.childNodes))) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? g = [] : g = g.concat(__sco.toarray(e(b.childNodes))), "" === m[c] ? 0 === g.length ? null : g : r(m[c], null == g || 0 == g.length ? null : g, c, 1); if ("textnodes" == n[1]) return "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (a, b) { g = g.concat(__sco.toarray(f(b.childNodes))) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? g = [] : g = g.concat(__sco.toarray(f(b.childNodes))), "" === m[c] ? 0 === g.length ? null : g : r(m[c], null == g || 0 == g.length ? null : g, c, 1); if ("elemp" == n[1]) return "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (a, b) { g = g.concat(__sco.toarray(k(d(n[2]), b))) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? g = [] : g = g.concat(__sco.toarray(k(d(n[2]), b))), "" === m[c] ? 0 === g.length ? null : g : r(m[c], null == g || 0 == g.length ? null : g, c, 1) } } } return null } var q = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#") + ")|)|)[\\x20\\t\\r\\n\\f]*\\]", l = { ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/, CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/, TAG: new RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"), ATTR: new RegExp("^" + q), CHILD: RegExp("^:(first|last|children|textnodes|elemp|nth-child)(?:\\([\\x20\\t\\r\\n\\f]*([\\d\\w\\*]*)[\\x20\\t\\r\\n\\f]*\\)|)?", "i") }, u = RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)", "ig"), t = function (a, b, c) { a = "0x" + b - 65536; return a !== a || c ? b : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(a >> 10 | 55296, a & 1023 | 56320) }; if ("string" === __sco.type(a) || "array" === __sco.type(a) && "htmlelement" === __sco.type(a[0]) && "string" === __sco.type(a[1])) { var m = [], s = "", n = [], w = [], y = !1; "array" === __sco.type(a) ? (m = __sco.clean(a[1]).split(/\s+(?![^\[]*\])/g), n = a[0]) : m = __sco.clean(a).split(/\s+(?![^\[]*\])/g); w = __sco.clone(m); __sco.each(m, function (a, c) { if (null != s) { var d = r(c, n, a); null == d ? (s = d, n = null) : (n = d, s = ""); null == d && "string" == __sco.type(b) && 0 < b.length && !y && (__sco.error(b + " Selector:" + w.slice(0, a + 1).join(" ")), y = !0) } else n = null }); "array" === __sco.type(c) && 0 < c.length && __sco.each(c, function (a, b) { "function" === __sco.type(__sco[b]) && (n = __sco[b].call(window, "array" === __sco.type(n) && 0 < n.length ? n[0] : n)) }); return n } return null }; __sco.attr = function (a, b, c) { return "htmlelement" == __sco.type(a) ? 3 > arguments.length ? a.getAttribute(b) || null : __sco.noru(c) ? a.setAttribute(b, c) : a.removeAttribute(b) : null }; __sco.clean = function (a) { return "string" === __sco.type(a) ? a.replace(/^\s*|\s*$/g, "").replace(/\s{2,}|[\r\t\n]/g, " ") : null }; __sco.clear = function (a, b, c, d) { var e = __sco.type(a), f = __sco.type(b), h = __sco.type(c), k = __sco.type(d); return "string" != e || "string" != e && ("string" != f || "regexp" != f) ? null : a.replace("regexp" == f ? b : "string" == h ? new RegExp(b, c) : new RegExp(b), "string" == k || "function" == k ? d : "") }; __sco.contains = function (a, b) { return "string" === __sco.type(a) ? -1 < a.indexOf(b) : "array" === __sco.type(a) ? -1 < a.indexOf(b) : "object" === __sco.type(a) ? a.hasOwnProperty(b) : !1 }; __sco.cursym = ""; __sco.ltrim = function (a) { return "string" === __sco.type(a) ? a.replace(/^\s*/, "") : null }; __sco.getvt = function (a, b) { var c = "htmlelement" !== __sco.type(a) ? "" : a.nodeName.toLowerCase(), d = null; if ("input" == c || "select" == c || "textarea" == c) { var e = a.type.toLowerCase(); "select" == c ? d = -1 < a.selectedIndex ? !1 == b ? a.options[a.selectedIndex].value : a.options[a.selectedIndex].text : null : "input" == c && (d = "checkbox" == e || "radio" == e ? a.selected || !0 == a.checked ? "1" : "0" : "undefined" == typeof a.value ? null : a.value) } else d = null; return __sco.clean(d) }; __sco.inbetween = function (a, b, c, d) { if ("string" === __sco.type(a) && "string" === __sco.type(b) && "string" === __sco.type(c)) { d = d || "ff"; var e = "", f = 0, h = c.indexOf(a), f = c.lastIndexOf(a), k = a.length, p = c.lastIndexOf(b); -1 != h && -1 != p && (a == b ? (f = c.match(new RegExp(a.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&").replace(/\s/g, "\\s"), "g")), 1 < f.length && (e = "ff" == d ? c.substring(h + k, c.indexOf(b, h + k)) : "fl" == d ? c.substring(h + k, p) : e)) : e = "ff" == d ? c.substring(h + k, c.indexOf(b, h + k)) : "fl" == d ? c.substring(h + k, p) : "lf" == d ? c.substring(f + k, c.indexOf(b, f + k)) : "ll" == d ? c.substring(f + k, p) : e); return __sco.clean(e) } return null }; __sco.pricecurr = function (a, b) { adda = function (a, b) { b = b || a.length; x = ""; for (var c = 0; c < b; c++) x += a[c]; return x }; var c = { "\u00a3": "GBP", "\u20ac": "EUR", "\u20ac": "EUR", $: "USD", A$: "AUD", CAD$: "CAD", CHF: "CHF", "Fr.": "CHF", "\u00a5": "JPY", kr: "NOK", NZ$: "NZD", "\u0440\u0443\u0431.": "RUB", py6: "RUB", pyu0431: "RUB", SKr: "SEK", Kc: "CZK" }, d = { EGP: "1", KWD: "1", OMR: "1", JOD: "1" }, e = "", f = ""; (function () { var a = [], b = [], d; for (d in c) a.push(c[d]), b.push(d); f = a.join("|"); e = b.join("|") })(); b = !1 == b ? !1 : !0; if ("string" === __sco.type(a) && "" != a.replace(/[^\d]/g, "")) { var h = a.replace(/[^\d\,\.]/g, "").match(/[\d]+/g), k = a.match(new RegExp("(" + f + ")"), "i"), p = a.match(new RegExp("(" + e.replace(/\$/g, "\\$") + ")"), "i"); null != k ? __sco.cursym = k[0] : null != p && (__sco.cursym = c[p[0]] || ""); d = !0 == !!d[__sco.cursym] ? 4 : 3; h = 1 == h.length ? h[0] : h[h.length - 1].length < d ? adda(h, h.length - 1) + "." + h[h.length - 1] : adda(h); return "" != h ? h : !0 == b ? __sco.error("301 price not found") : "0.00" } if ("" == a && !0 == b) __sco.error("301 price not found"); else return "0.00" }; __sco.text = function (a) { return "htmlelement" === __sco.type(a) ? __sco.clean(a.textContent || a.innerText || a.data) : null }; "indexOf" in Array.prototype || (Array.prototype.indexOf = function (a, b) { void 0 === b && (b = 0); 0 > b && (b += this.length); 0 > b && (b = 0); for (var c = this.length; b < c; b++) if (b in this && this[b] === a) return b; return -1 }); __sco.empty = function (a) { if (__sco.isArray(a)) __sco.iterateExecute(a, __sco.empty); else { if (!__sco.isDomNode(a)) return !1; for (; a.hasChildNodes() ;) a.removeChild(a.lastChild) } }; __sco.isArray = function (a) { a = Object.prototype.toString.call(a); return "[object Array]" == a || "[object HTMLCollection]" == a }; __sco.isDomNode = function (a) { return null == a || "object" != typeof a ? !1 : !0 }; __sco.iterateExecute = function (a, b, c) { "undefined" == typeof c && (c = []); if (__sco.isArray(a)) { for (i = 0; i <= a.length - 1; i++) b.apply(this, [a[i]].concat(c)); return !0 } }; __sco.addClass = function (a, b) { if (__sco.isArray(a)) __sco.iterateExecute(a, __sco.addClass, [b]); else { if (!__sco.isDomNode(a)) return !1; var c = a.getAttribute("class"); null == c && (c = ""); -1 == c.indexOf(b) && (a.className = 0 == c.length ? b : " " + b) } }; __sco.clone = function (a) { if ("htmlelement" === __sco.type(a)) return a.cloneNode(); if ("date" === __sco.type(a)) return new Date(a.getTime()); if ("object" !== __sco.type(a) && "array" !== __sco.type(a)) return a; try { var b = new a.constructor; __sco.each(a, function (c, e) { b.hasOwnProperty(c) || (b[c] = __sco.clone(a[c])) }) } catch (c) { b = a } finally { return b } }; __sco.dedupe = function (a) { var b = []; "object" != __sco.type(a) && "array" != __sco.type(a) && "nodelist" != __sco.type(a) || __sco.each(a, function (a, d) { b.hasOwnProperty(d) || b.push(d) }); return b }; __sco.each = function (a, b) { if (__sco.noru(a)) if ("object" === __sco.type(a)) for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.call(a[c], c, a[c]); else for (c = 0; c < a.length; c++) Object.prototype.hasOwnProperty.call(a, c) && b.call(a[c], c, a[c]); return a }; __sco.error = function (a) { var b = (new Date).getTime(), c = "", d = "", e = ""; "error" === __sco.type(a) ? (c = a.stack || "", d = a.description || "", e = a.message || "") : e = "string" !== __sco.type(a) ? SCJSON.stringify(a) : a; "" != a && (0 == __scd.g.length && __scd.g.push({ s: 100, d: (new Date).getTime(), e: [] }), __scd.g[0].e.push({ c: "100", d: b, t: d, n: e + " : " + c })); return null }; __sco.extend = function (a, b, c) { var d = __sco.clone(a), e = __sco.clone(b); __sco.each(d, function (a, b) { Object.prototype.hasOwnProperty.call(d, a) && "undefined" !== __sco.type(e[a]) && (c && "string" == __sco.type(d[a]) && "string" == __sco.type(e[a]) ? d[a] = "" == d[a] && "" != e[a] ? e[a] : d[a] : d[a] = e[a]) }); __sco.each(e, function (a, b) { Object.prototype.hasOwnProperty.call(d, a) || (d[a] = e[a]) }); return d }; __sco.getdom = function (a, b) { b = b || ""; return __sco.noru(a) ? "undefined" != typeof a.length ? 0 < a.length ? a : __sco.error(b) : a : __sco.error(b) }; __sco.guid = function () { function a(a) { return a ? Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) : Math.floor(1E15 * Math.random()).toString(16).substr(0, 12) } return ((new Date).getTime().toString(36) + "-" + a(!0) + "-" + a(!0) + "-" + a(!0) + "-" + a(!1)).toString().toUpperCase() }; __sco.hash = function (a) { var b = 0, c; if ("string" !== __sco.type(a)) return null; for (i = 0; i < a.length; i++) c = a.charCodeAt(i), b = (b << 5) - b + c, b &= b; return b.toString() }; __sco.loc = document.location.href.toLowerCase(); __sco.mid = function () { return (new Date).getTime().toString() + Math.floor(16777216 * (1 + Math.random())).toString().substr(0, 6) }; __sco.monitor = function () { function a() { try { f ? (d(h), e != k.compare.call(window) && (k.action.call(window), e = k.compare.call(window)), b++, b < k.max && (h = c(a, k.interval))) : (e = "undefined" !== __sco.type(k.startstate) ? k.startstate : k.compare.call(window), f = !0, b++, h = c(a, k.interval)) } catch (v) { __sco.error("207 timer error") } } try { var b = 0, c = setTimeout, d = clearTimeout, e = null, f = !1, h, k = this; this.startstate = void 0; this.max = 300; this.stop = function () { d(h) }; this.start = function () { d(h); b = 0; c(a, k.interval) }; this.interval = 2E3; this.compare = function () { return null }; this.action = function () { } } catch (p) { __sco.error("206 timer error") } }; __sco.noru = function (a) { return null != a && "undefined" !== typeof a }; __sco.on = function (a, b, c) { if (__sco.isArray(c)) for (var d = 0; d <= c.length - 1; d++) __sco.on(a, b, c[d]); else { var d = window.addEventListener, e = 2 < arguments.length && __sco.noru(c) ? c : window; d ? e.addEventListener(a, b) : e.attachEvent("on" + a, b) } }; __sco.off = function (a, b, c) { if (__sco.isArray(c)) for (var d = 0; d <= c.length - 1; d++) __sco.off(a, b, c[d]); else { var d = window.removeEventListener, e = 2 < arguments.length && __sco.noru(c) ? c : window; d ? e.removeEventListener(a, b) : e.detachEvent("on" + a, b) } }; __sco.remove = function (a) { if (__sco.isArray(a)) __sco.iterateExecute(a, __sco.remove); else { if (!__sco.isDomNode(a)) return !1; a.parentNode.removeChild(a) } }; __sco.removeClass = function (a, b) { if (__sco.isArray(a)) __sco.iterateExecute(a, __sco.removeClass, [b]); else { if (!__sco.isDomNode(a)) return !1; a.className = a.className.replace(b, "") } }; __sco.toarray = function (a) { var b = []; if ("array" == __sco.type(a)) return a; if ("nodelist" == __sco.type(a) && 0 == a.length) return b; __sco.each(a, function (a, d) { b.push(d) }); 0 == b.length && b.push("function" === __sco.type(a) ? a.valueOf() : a); return b }; __sco.tonumber = function (a) { var b = __sco.type(a); return "string" == b && "" == a || "string" != b && "number" != b || !isFinite(Number(a)) ? !1 : Number(a) }; __sco.tryparse = function (a) { function b(a) { try { return SCJSON.parse(a) } catch (f) { return d++, d < c.length ? b(c[d]) : null } } var c = [a, '"' + a + '"', "{" + a + "}", "[" + a + "]"], d = 0; return "string" !== __sco.type(a) ? a : b(a) }; __sco.type = function (a) { if (!__sco.noru(a)) return String(a); classes = { "[object Boolean]": "boolean", "[object Number]": "number", "[object String]": "string", "[object Text]": "htmlelement", "[object Function]": "function", "[object Array]": "array", "[object Date]": "date", "[object RegExp]": "regexp", "[object Object]": "object", "[object Error]": "error", "[object Arguments]": "arguments", "[object NodeList]": "nodelist", "[object HTMLCollection]": "nodelist", "[object HTMLDocument]": "htmldoc" }; var b = ""; try { b = a.toString() } catch (c) { } if ("[object]" === b) { if ("number" === typeof a.nodeType && 9 === a.nodeType) return "htmldoc"; if ("number" === typeof a.nodeType && ("undefined" === typeof a.length || "string" === typeof a.nodeName && ("select" === a.nodeName.toLowerCase() || "form" === a.nodeName.toLowerCase() || "#text" === a.nodeName.toLowerCase()))) return "htmlelement"; if ("undefined" !== typeof a.item && "number" === typeof a.length) return "nodelist" } return "object" !== typeof a || "undefined" === typeof a.callee && "undefined" === typeof a.caller || "number" !== typeof a.length ? "number" !== typeof a.nodeType || 1 !== a.nodeType && 3 !== a.nodeType ? "object" !== typeof a || "string" !== typeof a.type || "boolean" !== typeof a.cancelBubble && "boolean" !== typeof a.bubbles ? classes[Object.prototype.toString.call(a)] || (null != Object.prototype.toString.call(a).match(/HTML[\w]*Element/) ? "htmlelement" : null != Object.prototype.toString.call(a).match(/HTML[\w]*Collection/) ? "nodelist" : "object") : "event" : "htmlelement" : "arguments" }; __sco.isvalid = function (a, b) { if ("string" === __sco.type(a)) { if (!0 == !!__sco.config.block[b]) for (var c = 0; c < __sco.config.block[b].length; c++) if (__sco.config.block[b][c] == a) return !1; switch (b) { case "email": return -1 < a.indexOf("@") ? !0 : !1; case "telephone": return a = a.replace(/[^0-9]/gi, ""), c = a.split(new RegExp(a[0])).length - 1, 5 < a.length && c != a.length ? !0 : !1; case "mobile": return a = a.replace(/[^0-9]/gi, ""), c = a.split(new RegExp(a[0])).length - 1, 5 < a.length && c != a.length ? !0 : !1; default: return !0 } } else return !1 }; __sco.onchange = function (a, b) { if ("htmlelement" === __sco.type(_scs(a))) { a = _scs(a); var c = __sco.attr(a, "disabled"), d = __sco.getvt(a); c && __sco.attr(a, "disabled", null); "" !== d && __sco.updatecustomer(d, b); __sco.on("change", function () { try { var c = __sco.getvt(a); "" != c && (__sco.updatecustomer(c, b), __sco.management.setstatus(200, __sco.management.sendtoapi)) } catch (d) { d.title = "ONCHANGE", __sco.error(d) } }, a); c && __sco.attr(a, "disabled", "true") } }; __sco.processonchange = function () { for (var a in __sco.config.onchange) for (var b in __sco.config.onchange[a]) if (__sco.config.onchange[a].hasOwnProperty(b)) __sco.onchange(__sco.config.onchange[a][b], a) }; __sco.updatecustomer = function (a, b) { if ("" != a && __sco.isvalid(a, b)) { if ("first" == b || "last" == b) a = a.charAt(0).toUpperCase() + a.slice(1).toLowerCase(); var c = __scd.c; "optout" == b && __sco.config.optneg && (a = -1 * ((a ? 1 : 0) - 1)); "telephone" == b || "mobile" == b ? c.p["telephone" == b ? "l" : "m"] = a : c[b.charAt(0)] = a; __sco.management.interset("__sc", __scd) } }; __sco.support.setsupport = function () { function a(a, b) { var c = "Unknown"; __sco.each(a, function (a, d) { null != b.match(new RegExp(d)) && "Unknown" == c && (c = b.match(new RegExp(d))[0]) }); return c } __sco.support.os = "Unknown"; __sco.support.browser = "Unknown"; __sco.support.version = "Unknown"; __sco.support.browsers = "OPR Chrome CriOS Firefox MSIE Safari Opera KDE Trident".split(" "); __sco.support.ossystems = "Windows iPhone iPad Android Mac Linux Symbian Blackberry CrOS".split(" "); __sco.support.cors = ("function" === typeof XMLHttpRequest || "object" === typeof XMLHttpRequest) && "withCredentials" in new XMLHttpRequest; __sco.support.postmessage = "postMessage" in window; __sco.support.cookies = __sco.storage.cookies(); __sco.support.useragent = navigator.userAgent; __sco.support.protocol = document.location.protocol; __sco.support.useprovider = __sco.support.postmessage; __sco.support.storeprovider = __sco.support.postmessage; __sco.support.ps = !1; __sco.support.earlyie = null != navigator.userAgent.match(/msie(\s+)[5-7]/i); __sco.support.traditional = !1; __sco.support.screeninfo = screen.availHeight + "-" + screen.availWidth + "-" + screen.colorDepth + "-" + screen.height + "-" + screen.width; __sco.support.mobile = null != navigator.userAgent.match(/android|blackberry|symbian|iphone|ipad|mobi|tablet|opera\s+mini/i); __sco.support.touchscreen = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || 0 < navigator.msMaxTouchPoints ? !0 : !1; try { __sco.support.localstorage = "undefined" !== typeof localStorage && "object" === __sco.type(localStorage) && "undefined" !== __sco.type(localStorage.setItem) } catch (b) { __sco.support.localstorage = !1 } try { __sco.support.os = a(__sco.support.ossystems, navigator.userAgent), __sco.support.browser = a(__sco.support.browsers, navigator.userAgent), __sco.support.version = function () { var a = navigator.userAgent.match(/version\/(\d+)/i), b = navigator.userAgent.match(new RegExp(__sco.support.browser + "\\s*\\d+|" + __sco.support.browser + "\\/\\s*\\d+", "i")), c = navigator.userAgent.match(/\bTrident\/\d+.*\s+rv:(\d+)/); return null != c ? c[1] : null != a ? a[1] : b ? b[0].replace(/[\D]/g, "") : "Unknown" }(), "OPR" == __sco.support.browser && (__sco.support.browser = "Opera"), "Trident" == __sco.support.browser && (__sco.support.browser = "MSIE") } catch (c) { } return __sco.support.postmessage || ("" != __sco.config.v2onload || !__sco.config.v2) && __sco.config.fallbackallowed }; __sco.support.updatedoc = function () { with (__sco.support) __scd.m.b = browser, __scd.m.xsr = cors, __scd.m.pm = postmessage, __scd.m.c = cookies, __scd.m.l = localstorage, __scd.m.o = os, __scd.m.p = protocol, __scd.m.v = version, __scd.m.ua = useragent, __scd.m.m = mobile, __scd.m.t = touchscreen, __scd.m.si = screeninfo, __scd.m.ps = ps }; __sco.provider = function (a, b, c, d) { function e(a) { a.origin == f.host.match(/(http[s]*:\/\/[\w\W]+(\.com|\.co\.uk|\.net))/)[0] && ("sc_ready" == a.data ? (f.ready = !0, __sco.support.ps = !0, __sco.off("message", e), "undefined" == __sco.type(__sco.management.listening) && (__sco.management.listening = !0, __sco.on("message", __sco.management.react))) : "sc_not_available" == a.data && (__sco.off("message", e), __sco.config.fallbackallowed ? (f.ready = !0, __sco.support.ps = !1, __sco.support.traditional = !0, __sco.config.triggers = ["load"], __sco.config.translatev1 = !0, __sco.config.v1api = __sco.config.v1api.replace("/lite/impression.ashx", "/capture.aspx"), __sco.config.v1completion = __sco.config.v1completion.replace("/lite/impression.ashx", "/pixelcapture.aspx")) : __sco.management.nosupport.call(window, !0)), "function" === __sco.type(c) && (__sco.config.v1 && __sco.config.v2 ? __sco.management.listener.ready && __sco.management.v1listener.ready && c.apply(window, d || []) : c.apply(window, d || []))) } this.set = function (a, b, c) { a = [a, b]; _scs("#" + f.id).contentWindow.postMessage(SCJSON.stringify({ func: "set", args: a, guid: [__sco.config.guid, __sco.config.v1guid], ticket: c }), f.host.match(/(http[s]*:\/\/[\w\W]+(\.com|\.co\.uk|\.net))/)[0]) }; this.get = function (a, b, c) { a = [a, b]; _scs("#" + f.id).contentWindow.postMessage(SCJSON.stringify({ func: "get", args: a, guid: [__sco.config.guid, __sco.config.v1guid], ticket: c }), f.host.match(/(http[s]*:\/\/[\w\W]+(\.com|\.co\.uk|\.net))/)[0]) }; this.remove = function (a, b) { var c = [a]; _scs("#" + f.id).contentWindow.postMessage(SCJSON.stringify({ func: "remove", args: c, guid: [__sco.config.guid, __sco.config.v1guid], ticket: b }), f.host.match(/(http[s]*:\/\/[\w\W]+(\.com|\.co\.uk|\.net))/)[0]) }; this.send = function (a, b, c, d, e) { a = [a, b, c, null, e]; _scs("#" + f.id).contentWindow.postMessage(SCJSON.stringify({ func: "send", args: a, guid: [__sco.config.guid, __sco.config.v1guid], ticket: d }), f.host.match(/(http[s]*:\/\/[\w\W]+(\.com|\.co\.uk|\.net))/)[0]) }; this.destroy = function () { _scs("#sc_div_postmessage_parent") && _scs("#" + f.id) && _scs("#sc_div_postmessage_parent").removeChild(_scs("#" + f.id)) }; var f = this; __sco.tickets = "array" === __sco.type(__sco.tickets) ? __sco.tickets : []; if (_scs("#" + b)) f.id = b, f.host = a, f.ready = !0; else { if (!_scs("#sc_div_postmessage_parent")) { var h = document.createElement("div"); h.setAttribute("id", "sc_div_postmessage_parent"); _scs("body")[0].appendChild(h) } h = document.createElement("iframe"); h.setAttribute("src", a); h.setAttribute("target", "_self"); h.setAttribute("id", b); h.style.display = "none"; h.style.height = "0px"; h.style.width = "0px"; _scs("#sc_div_postmessage_parent").appendChild(h); f.id = b; f.host = a; f.ready = !1; __sco.on("message", e) } }; __sco.storage.decode = function (a, b) { try { return unescape(a) } catch (c) { return a } }; __sco.storage.cookies = function () { var a = !1; try { document.cookie = "sc_test=testvalue;expires=" + __sco.storage.sd(1) + ";path=/", __sco.storage.get("sc_test") && (a = !0) } catch (b) { } finally { return __sco.storage.remove("sc_test"), a } }; __sco.storage.remove = function (a) { __sco.each(document.cookie.split(";"), function (b, c) { var d = __sco.clean(c).match(new RegExp("^" + a + "__(\\d+)\\s*(?=\\=)|^" + a + "(?=\\s*\\=)")); null != d && __sco.storage.set(d[0], "", -1) }); return !0 }; __sco.storage.get = function (a, b) { function c(a) { return a.sort(function (a, b) { return __sco.tonumber(a[1]) < __sco.tonumber(b[1]) ? -1 : __sco.tonumber(b[1]) < __sco.tonumber(a[1]) ? 1 : 0 }) } function d(a) { var b = ""; __sco.each(a, function (a, c) { b += c[0] }); return b } var e = [], f = "", h = "^" + a + "__(\\d+)\\s*(?=\\=)|^" + a + "(?=\\s*\\=)"; try { __sco.each(document.cookie.split(";"), function (a, b) { var c = __sco.clean(b), d = c.match(new RegExp(h)); null != d && e.push([c.substr(c.indexOf("=") + 1), d[1] || 0]) }), f = d(c(e)) } catch (k) { } return "" != f ? (f = __sco.tryparse(__sco.storage.decode(f)), null != f ? f : 1 < arguments.length ? b : !1) : 1 < arguments.length ? b : !1 }; __sco.storage.set = function (a, b, c) { function d(a, b, c) { document.cookie = a + "=" + b + (0 == c ? "" : ";expires=" + __sco.storage.sd(c)) + ";path=/" } try { var e = escape(SCJSON.stringify(b)); c = 2 < arguments.length && "undefined" !== typeof arguments[2] ? c : __sco.config.cookieexpiry; "number" === __sco.type(c) && -1 < c && __sco.storage.remove(a); if (7168 - 2 * document.cookie.length > e.length) if (1800 < e.length) for (var f = Math.ceil(e.length / 1800), h = 0; h < f; h++) d(a + "__" + h.toString(), e.substring(0, 1800), c), e = e.substr(1800); else d(a, e, c); else h = __sco.clone(__sco.config.doc), h.t = 413, h.s.i = __scd.s.i, h.s.m = __scd.s.m, d(a, escape(SCJSON.stringify(h)), c), __scd = h } catch (k) { } }; __sco.storage.sd = function (a) { return (new Date((new Date).setDate((new Date).getDate() + (isNaN(a) ? 30 : Number(a))))).toUTCString() }; __sco.sender.send = function (a, b, c, d, e) { function f() { var f = new XMLHttpRequest, h = !1; f.open(a, b + ("GET" == a ? "string" == __sco.type(c) ? c : JSON.stringify(c) : ""), !0); __sco.each(e, function (a, b) { "object" == __sco.type(b) && "string" == __sco.type(b.key) && "string" == __sco.type(b.value) && f.setRequestHeader(b.key, b.value) }); "function" === __sco.type(d) && ("onload" in f ? f.onload = d : f.onreadystatechange = function (a) { h || 4 != f.readyState || (h = !0, d.call(window, a)) }); f.send("GET" != a && __sco.noru(c) ? "string" !== __sco.type(c) ? SCJSON.stringify(c) : c : "") } function h() { try { var d = document.createElement("div"); d.setAttribute("id", "sc_if_post"); _scs("body")[0].appendChild(d); var f = __sco.support.earlyie, e = f ? document.createElement("<iframe name='salecycle>") : document.createElement("iframe"); f || (e.name = "salecycle"); e.style.display = "none"; d.appendChild(e); var h = e.document || e.contentDocument, l = f ? h.createElement("<form name='scPost'>") : h.createElement("form"); l.target = "salecycle"; f || (l.name = "scPost"); l.setAttribute("method", a); l.setAttribute("action", b + ("GET" == a && __sco.noru(c) ? "string" == __sco.type(c) ? c : SCJSON.stringify(c) : "")); if ("POST" == a && (l.setAttribute("encoding", "multipart/form-data"), __sco.noru(c))) if ("string" != __sco.type(c)) { var u = f ? h.createElement("<input name=data>") : h.createElement("input"); u.type = "hidden"; f || (u.name = "data"); u.value = SCJSON.stringify(c); l.appendChild(u) } else __sco.each(c.split("&"), function (a, b) { var c = f ? h.createElement("<input name=" + b.split("=")[0] + ">") : h.createElement("input"); c.type = "hidden"; f || (c.name = b.split("=")[0]); c.value = b.split("=")[1]; l.appendChild(c) }); h.getElementsByTagName("body")[0].appendChild(l); l.submit(); setTimeout(k, 5E3) } catch (t) { } } function k() { null != _scs("#sc_if_post") && _scs("body")[0].removeChild(_scs("#sc_if_post")) } __sco.support.cors ? f() : h() }; __sco.fields = function (a, b) { var c = []; __sco.each(a, function (a, e) { 0 > b.indexOf(a) && c.push(a + "^" + e) }); return c.join("~") }; __sco.format = function (a, b) { var c = ""; __sco.each(a, function (a, e) { c = "undefined" !== typeof e[b] ? c + (e[b] + "|") : c + "|" }); return c }; __sco.translatetov1 = function (a) { try { var b = __sco.escs(__sco.clone(a)), c = b.t.toString().charAt(0); if ("3" == c) return "c=" + b.i1 + "&cc=&ca=0&e=&sfs=ordernum^" + ("string" == typeof b.s.ordernumber ? b.s.ordernumber : "") + "&scs=" + __sco.support.screeninfo + "&b=" + b.s.i + "&ua=" + __sco.hash(navigator.userAgent); var d = [], e = __sco.fields(b.s, __sco.config.sessionfields); __sco.each(__scd.b.i, function (a, b) { d.push(__sco.fields(b, __sco.config.itemfields)) }); return "c=" + b.i1 + "&b=" + b.s.i + "&mid=" + b.s.m + "&scs=" + __sco.support.screeninfo + (__sco.config.geoip ? "&geo=1" : "") + "&n=" + b.c.f + "|" + b.c.l + "|" + b.c.s + "|&t=" + b.c.p.l + "&e=" + b.c.e + "&o=" + b.c.o + "&w=" + b.u + "&st=" + __sco.config.sessiontime + "&ua=" + __sco.hash(navigator.userAgent) + "&bs=1&ctd=&cc=" + (b.cc ? "1" : "0") + "&ca=0&fc=0&y=" + __scd.b.c + "&p=" + __sco.format(b.b.i, "i") + "&i=" + __sco.format(b.b.i, "n") + "&u=" + __sco.format(b.b.i, "u") + "&v1=" + __sco.format(b.b.i, "v") + "&v2=" + b.b.v + "&q1=" + __sco.format(b.b.i, "q") + "&q2=" + __sco.format(b.b.i, "na") + "&q3=" + __sco.format(b.b.i, "nc") + "&d1=" + __sco.format(b.b.i, ["d1"]) + "&d2=" + __sco.format(b.b.i, "d2") + "&s=" + c + "&er=" + __sco.errorstov1() + "&cu1=" + __sco.format(b.b.i, "f1") + "&cu2=" + __sco.format(b.b.i, "f2") + "&ifs=" + (0 == d.length ? Array(__scd.b.i.length).join("|") : d.join("|")) + "&sfs=" + e } catch (f) { return "c=" + __sco.config.doc.i1 + "&b=&mid=&scs=" + __sco.support.screeninfo + "&n=||&t=&e=&o=&w=&st=" + __sco.config.sessiontime + "&ua=" + __sco.hash(navigator.userAgent) + "&bs=1&ctd=&cc=&ca=0&fc=0&y=&p=&i=&u=&v1=&v2=&q1=&q2=&q3=&d1=&d2=&s=&er=" + (f.description || "") + "_" + (f.message || "") + "_" + (f.stack || "") + "_" + navigator.userAgent + "&cu1=&cu2=&ifs=&sfs=" } }; __sco.escs = function (a) { if (null == a || "undefined" == typeof a) return ""; if ("date" === __sco.type(a)) return a.toUTCString(); if ("object" == typeof a) return __sco.each(a, function (b, c) { a[b] = __sco.escs(c) }), a; if ("undefined" != typeof a.toString) return a.toString().replace(/&/g, "[sc_amp]").replace(/\?/g, "[sc_qm]").replace(/\+/g, "[sc_pl]").replace(/>/g, "[sc_bc]").replace(/</g, "[sc_bo]").replace(/=/g, "[sc_eq]").replace(/#/g, "[sc_h]") }; __sco.errorstov1 = function () { var a = "", b = __scd.g; 0 < b.length && __sco.each(b, function (b, d) { a += d.e[b].d + "_" + d.e[b].t + "_" + d.e[b].n + "_END" }); return a }; __sco.v1runtime = function (a) { var b = ""; if ("error" == __sco.type(a)) { b = (a.message || "") + "__" + (a.description || "") + "__" + (a.stack || "") + "__" + (a.title || "") + "__"; try { __sco.support && "undefined" !== __sco.type(__sco.support.cors) && __sco.each(__sco.support, function (a, c) { "function" !== __sco.type(c) && "array" !== __sco.type(c) && (b += a + ":" + c + "__") }) } catch (c) { } } else "string" == __sco.type(a) && (b = a); return "c=" + __sco.config.doc.i1 + "&b=&mid=&scs=" + screen.availHeight + "-" + screen.availWidth + "-" + screen.colorDepth + "-" + screen.height + "-" + screen.width + "&n=||&t=&e=&o=&w=&st=1800&ua=" + __sco.hash(navigator.userAgent) + "&bs=1&ctd=&cc=&ca=0&fc=0&y=&p=&i=&u=&v1=&v2=&q1=&q2=&q3=&d1=&d2=&s=1&er=" + b + "&cu1=&cu2=&ifs=&sfs=" }; "object" != typeof SCJSON && (SCJSON = {}); (function () { function a(a) { return 10 > a ? "0" + a : a } function b(a) { return e.lastIndex = 0, e.test(a) ? '"' + a.replace(e, function (a) { var b = k[a]; return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + a + '"' } function c(a, d) { var e, l, k, t, m, s = f, n = d[a]; switch ("function" == typeof p && (n = p.call(d, a, n)), typeof n) { case "string": return b(n); case "number": return isFinite(n) ? String(n) : "null"; case "boolean": case "null": return String(n); case "object": if (!n) return "null"; if (f += h, m = [], "[object Array]" === Object.prototype.toString.apply(n)) { t = n.length; for (e = 0; t > e; e += 1) m[e] = c(e, n) || "null"; return k = 0 === m.length ? "[]" : f ? "[\n" + f + m.join(",\n" + f) + "\n" + s + "]" : "[" + m.join(",") + "]", f = s, k } if (p && "object" == typeof p) for (t = p.length, e = 0; t > e; e += 1) "string" == typeof p[e] && (l = p[e], k = c(l, n), k && m.push(b(l) + (f ? ": " : ":") + k)); else for (l in n) Object.prototype.hasOwnProperty.call(n, l) && (k = c(l, n), k && m.push(b(l) + (f ? ": " : ":") + k)); return k = 0 === m.length ? "{}" : f ? "{\n" + f + m.join(",\n" + f) + "\n" + s + "}" : "{" + m.join(",") + "}", f = s, k } } "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () { return this.valueOf() }); var d = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, f, h, k = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, p; "function" != typeof SCJSON.stringify && (SCJSON.stringify = function (a, b, d) { var e; if (f = "", h = "", "number" == typeof d) for (e = 0; d > e; e += 1) h += " "; else "string" == typeof d && (h = d); if (p = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length)) throw Error("JSON.stringify"); return c("", { "": a }) }); "function" != typeof SCJSON.parse && (SCJSON.parse = function (a, b) { function c(a, d) { var e, f, h = a[d]; if (h && "object" == typeof h) for (e in h) Object.prototype.hasOwnProperty.call(h, e) && (f = c(h, e), void 0 !== f ? h[e] = f : delete h[e]); return b.call(a, d, h) } var e; if (a = String(a), d.lastIndex = 0, d.test(a) && (a = a.replace(d, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) })), /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), "function" == typeof b ? c({ "": e }, "") : e; throw new SyntaxError("JSON.parse"); }) })(); __sco.management.contentLoaded(window, __sco.management.main);



///OSR 


try {

    // AOP.js (meld) library
    /* MIT License (c) copyright 2011-2013 original author or authors */
    (function () { function f(a, b, c) { var d, e; if (3 > arguments.length) { var l; l = a.name || "_"; d = {}; d[l] = a; p(d, l, b); return d[l] } if (v(b)) e = w(a, b, c); else if (d = typeof b, "string" === d) "function" === typeof a[b] && (e = p(a, b, c)); else if ("function" === d) e = w(a, b(a), c); else { d = []; for (l in a) "function" == typeof a[l] && b.test(l) && d.push(p(a, l, c)); e = x(d) } return e } function q(a, b) { var c, d, e; this.target = a; this.func = b; this.aspects = {}; c = this.orig = a[b]; d = this; e = this.advised = function () { function a(b) { var c = h(b); d._callSimpleAdvice("on", g, b); return c } var g, m, f, h, k; this instanceof e ? (g = y(c.prototype), h = function (a) { var b = g; try { s(b, "constructor", { value: c, enumerable: !1 }) } catch (d) { } c.apply(b, a); return b }) : (g = this, h = function (a) { return c.apply(g, a) }); f = t.call(arguments); k = "afterReturning"; m = z({ target: g, method: b, args: f }); try { d._callSimpleAdvice("before", g, f); try { m.result = d._callAroundAdvice(g, b, f, a) } catch (A) { m.result = m.exception = A, k = "afterThrowing" } f = [m.result]; d._callSimpleAdvice(k, g, f); d._callSimpleAdvice("after", g, f); if (m.exception) throw m.exception; return m.result } finally { n = r.pop() } }; s(e, "_advisor", { value: d, configurable: !0 }) } function p(a, b, c) { return (a = q.get(a, b)) && a.add(c) } function w(a, b, c) { var d, e, f; d = []; for (f = 0; e = b[f++];) (e = p(a, e, c)) && d.push(e); return x(d) } function x(a) { return { remove: function () { for (var b = a.length - 1; 0 <= b; --b) a[b].remove() } } } function k(a) { return function (b, c, d) { var e = {}; if (2 === arguments.length) return e[a] = c, f(b, e); e[a] = d; return f(b, c, e) } } function B(a, b) { var c, d, e; for (c in h) if (d = b[c]) (e = a[c]) || (a[c] = e = []), e.push({ aspect: b, advice: d }) } function z(a) { r.push(n); return n = a } f.before = k("before"); f.around = k("around"); f.on = k("on"); f.afterReturning = k("afterReturning"); f.afterThrowing = k("afterThrowing"); f.after = k("after"); f.joinpoint = function () { return n }; f.add = function () { return f.apply(null, arguments) }; q.prototype = { _callSimpleAdvice: function (a, b, c) { var d; this.aspects[a] && (d = h[a], d(this.aspects[a], function (a) { (a = a.advice) && a.apply(b, c) })) }, _callAroundAdvice: function (a, b, c, d) { function e(a, b) { return 0 > a ? d(b) : f(g[a].advice, a, b) } function f(c, d, g) { function l(a) { h++; return e(d - 1, a) } var h, k; h = 0; k = z({ target: a, method: b, args: g, proceed: function () { return l(0 < arguments.length ? t.call(arguments) : g) }, proceedApply: function (a) { return l(a || g) }, proceedCount: function () { return h } }); try { return c.call(a, k) } finally { n = r.pop() } } var g; g = this.aspects.around; return e((g ? g.length : 0) - 1, c) }, add: function (a) { var b, c; b = this; c = b.aspects; B(c, a); return { remove: function () { var d, e, f; f = 0; for (d in h) if (e = c[d]) { f += e.length; for (var g = e.length - 1; 0 <= g; --g) if (e[g].aspect === a) { e.splice(g, 1); --f; break } } f || b.remove() } } }, remove: function () { delete this.advised._advisor; this.target[this.func] = this.orig } }; q.get = function (a, b) { if (b in a) { var c; c = a[b]; if ("function" !== typeof c) throw Error("Advice can only be applied to functions: " + b); c = c._advisor; c || (c = new q(a, b), a[b] = c.advised); return c } }; var n, r, h, t, v, s, y; r = []; t = Array.prototype.slice; v = Array.isArray || function (a) { return "[object Array]" == Object.prototype.toString.call(a) }; var u; a: { try { u = "x" in Object.defineProperty({}, "x", {}); break a } catch (C) { } u = void 0 } s = u ? Object.defineProperty : function (a, b, c) { a[b] = c.value }; y = Object.create || function () { function a() { } return function (b) { a.prototype = b; b = new a; a.prototype = null; return b } }(); h = { before: function (a, b) { for (var c = a.length - 1; 0 <= c; --c) b(a[c]) }, around: !1 }; h.on = h.afterReturning = h.afterThrowing = h.after = function (a, b) { for (var c = 0, d = a.length; c < d; c++) b(a[c]) }; window.meld = f })();

    /* OSR */
    __sco.osr.previouslyShown = false;
    __sco.osr.triggerType = null;
    __sco.osr.config = {
        'apiHost': 'https://d22j4fzzszoii2.cloudfront.net',
        'debug': false,
        'clientId': __sco.config.doc.i,
        'templateId': null,
        'enableInactivityTimer': false,
        'inactivityDuration': null,
        'emailBasketConfirmationTimeout': null,
        'showOsrContainer': true,
        'showEmailCapture': false,
        'showRecommendations': false,
        'showBasketTrends': false,
        'stylesheet': null,
        'template': null,
        'templateId': null,
        'enabled': false,
        'clientConfigModule': true,
        'initParameter': null, // parameter to be present in the query string before OSR will be eanbled, i.e. test=salecycle (without ?&). null to disable this feature.
        'validPages': ["/cart"],
        'requestHeaders': [
            { "key": "Content-Type", "value": "application/json" },
            { "key": "Accept", "value": "application/json" }
        ],
        'selectors': {
            'liteboxContainer': null,
            'notificationContainer': null,
            'emailContainer': null,
            'emailCaptureField': null,
            'productContainer': null,
            'productTemplate': null,
            'trendTemplate': null,
            'trendContainer': null,
            'emailBasketConfirmationTemplate': null,
            'closeButton': null,
            'continueButton': null,
            'saveButton': null,
            'message': null,
            'osrOverlay': null
        },
        'style': {
            'width': '300px'
        }
    };

    __sco.osr.lastMove = {
        x: null,
        y: null,
        timestamp: null
    };

    __sco.osr.configRequest = {
        'si': null,
        'ua': null
    };

    __sco.osr.await = false;
    __sco.osr.exittime = 0;

    /** Initialization **/
    __sco.osr.init = function () {

        // init client config module first
        if (typeof (__sco.osr.clientConfigModule) == 'function') { __sco.osr.clientConfigModule(); }

        // valid page check
        if (!__sco.osr.validPage()) { return; }

        // update useragent/screeninfo now we're running
        __sco.osr.configRequest = { 'si': __scd.m.si, 'ua': __scd.m.ua };
        var configEndpoint = __sco.osr.config.apiHost + '/litebox/config/' + __scd.i + '/' + __scd.s.i;

        // retrieve config
        __sco.management.intersend('POST', configEndpoint, __sco.osr.configRequest, function (configData) {
            configData = __sco.osr._toCamelCase(SCJSON.parse(configData.target.responseText));
            __sco.osr.config = __sco.extend(__sco.osr.config, configData);

            // no valid template for this endpoint
            if (__sco.osr.config.templateId == null || __sco.osr.config.enabled == false) { return; }

            // validPages array brought back from config, still on a valid page after config merge?
            if (!__sco.osr.validPage()) { return; }

            // retrieve template & urldecode
            __sco.management.intersend('GET', __sco.osr.getTemplateEndpoint(), '', function (templateData) {

                templateData = __sco.osr._toCamelCase(SCJSON.parse(templateData.target.responseText));
                __sco.osr.config.template = decodeURIComponent(templateData.html);
                __sco.osr.config.stylesheet = decodeURIComponent(templateData.stylesheet);

                __sco.osr.preRender();
                __sco.osr.addEvents();
            });

        }, __sco.osr.config.requestHeaders, true);
    };

    /**********************
     *  Overridable logic *
     **********************/

    /** Do some final checks before showing OSR **/
    __sco.osr.preShowChecks = function () {
        return (!__scd.b.i.length == 0); // basket must not be empty
    };

    /** Are we on a valid page? **/
    __sco.osr.validPage = function () {
        if (__sco.osr.config.validPages.length == 0) { return false; }

        var validPage = false;
        for (i = 0; i <= __sco.osr.config.validPages.length - 1; i++) {

            var matches = null;
            if (__sco.osr.config.validPages[i] instanceof RegExp) { matches = document.location.href.match(__sco.osr.config.validPages[i]); }
            else { matches = document.location.href.match(new RegExp(__sco.osr.config.validPages[i])); }

            if (matches != null && matches.length > 0) { validPage = true; }
        }
        return validPage;
    };

    /** Get the template endpoint to use **/
    __sco.osr.getTemplateEndpoint = function () {
        return __sco.osr.config.apiHost + '/litebox/template/' + __scd.i + '/' + __sco.osr.config.templateId;
    }

    /**  Get email address - no regexp validation, see: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript **/
    __sco.osr.scrapeEmailAddress = function () {
        var emailAddress = _scs(__sco.osr.config.selectors.emailCaptureField).value.trim();
        if (emailAddress.length == 0) { ev.stopPropagation(); alert("Please enter an email address"); return null; }

        return emailAddress;
    }

    /** Can we show the email capture template **/
    __sco.osr.canShowEmailCapture = function () {
        return (_scs(__sco.osr.config.selectors.emailCaptureField) != null && _scs(__sco.osr.config.selectors.saveButton) != null);     // email capture field and save button must exist
    }

    /** Can we show the recommendations template **/
    __sco.osr.canShowRecommendations = function () {
        return (_scs(__sco.osr.config.selectors.productContainer) != null && _scs(__sco.osr.config.selectors.productTemplate) != null); // recommendations template and target container must exist
    }

    /** Can we show the trends template **/
    __sco.osr.canShowTrends = function (data) {
        return (_scs(__sco.osr.config.selectors.trendContainer) != null && _scs(__sco.osr.config.selectors.trendTemplate) != null) && data != null && data.length > 0 && (data[0].BasketCount > 1 || data.length > 1);     // trends template and target container must exist
    }

    /***************
     *  Rendering  *
     ***************/

    /** Set up the page with the template & css **/
    __sco.osr.preRender = function () {
        __sco.attr(_scs('style.sc-lb'), 'disabled', 'disabled');
        __sco.empty(_scs('div.osr-overlay'));
        __sco.remove(_scs('.sc-lb'));

        var lbContainer = document.createElement('div');
        _scs('body')[0].appendChild(lbContainer);
        lbContainer.innerHTML = __sco.osr.config.template;
        lbContainer.className = 'sc-lb hidden';

        var lbStyle = document.createElement('style');
        _scs('head')[0].appendChild(lbStyle);

        if (__sco.osr.isEarlyIe()) { lbStyle.styleSheet.cssText = __sco.osr.config.stylesheet; }
        else { lbStyle.innerHTML = __sco.osr.config.stylesheet; }

        lbStyle.className = 'sc-lb';
    };

    /** Create overlay **/
    __sco.osr.renderOverlay = function () {
        var cssEl = document.createElement('style');
        cssEl.className = "sc-lb";
        cssEl.type = 'text/css';
        _scs('head')[0].appendChild(cssEl);

        var cssStyleContent = "div.osr-overlay { background: rgba(0,0,0,0.7); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#bf45484d', endColorstr='#bf000000',GradientType=0 ); width: 100%; height: 100%; z-index: 99999; top: 0; left: 0; position:fixed; } div.osr-overlay.hidden { display: none; } div.osr-content { margin: 0 auto; width: " + __sco.osr.config.style.width + ";position: relative; background-color: #FFFFFF; top: 10% }";
        if (__sco.osr.isEarlyIe()) { cssEl.styleSheet.cssText = cssStyleContent; }
        else { cssEl.appendChild(document.createTextNode(cssStyleContent)); }

        var overlayEl = document.createElement('div');
        overlayEl.className = 'osr-overlay hidden';

        var contentEl = document.createElement('div');
        contentEl.className = 'osr-content';
        overlayEl.appendChild(contentEl);

        // insert contentHtml into body and css into head
        _scs('head')[0].appendChild(cssEl);
        _scs('body')[0].appendChild(overlayEl);
    }

    /** Render the content **/
    __sco.osr.renderContent = function (content) {
        var contentEl = _scs('div.osr-content')[0];
        __sco.empty(contentEl);

        // add content
        if (__sco.isDomNode(content) == false) { contentEl.innerHTML = content; }
        else { contentEl.appendChild(content); }
    }

    /** Show recommendations content area **/
    __sco.osr.showRecommendationsContent = function (recommendations) {
        var productTargetEl = _scs(__sco.osr.config.selectors.productContainer);
        productTargetEl = __sco.isArray(productTargetEl) ? productTargetEl[0] : productTargetEl;

        var productTemplate = _scs(__sco.osr.config.selectors.productTemplate);
        productTemplate = __sco.isArray(productTemplate) ? productTemplate[0] : productTemplate;

        // render recommendations
        if (__sco.osr.config.showRecommendations == true) {
            var recommendedProducts = [];
            __sco.each(recommendations, function (ix, item) {
                recommendedProducts.push(item.Product);
            });
            productTargetEl.appendChild(__sco.osr._tmpl(productTemplate, recommendedProducts));
        }
    }

    /** Show trends content area **/
    __sco.osr.showTrendsContent = function (trends) {
        var trendTargetEl = _scs(__sco.osr.config.selectors.trendContainer);
        trendTargetEl = __sco.isArray(trendTargetEl) ? trendTargetEl[0] : trendTargetEl;

        var trendTemplate = _scs(__sco.osr.config.selectors.trendTemplate);
        trendTemplate = __sco.isArray(trendTemplate) ? trendTemplate[0] : trendTemplate;

        // render trends
        if (__sco.osr.config.showBasketTrends == true) {
            var trendProducts = [];
            __sco.each(trends, function (ix, item) {
                item.Product.BasketCount = item.BasketCount;
                trendProducts.push(item.Product);
            });

            var templated = __sco.osr._tmpl(trendTemplate, trendProducts);
            trendTargetEl.innerHTML = templated;
        }
    }

    /** Unblock the UI **/
    __sco.osr.unblockUI = function () {
        __sco.addClass(_scs('div.osr-overlay'), 'hidden');
    };

    /** Block the UI & provide some modal content with optional timeout **/
    __sco.osr.blockUI = function (config) {
        __sco.osr.unblockUI();

        if (__sco.osr.previouslyShown == false) { __sco.osr.renderOverlay(); }
        __sco.osr.renderContent(config.message);

        if (typeof (config.timeout) != 'undefined') { setTimeout(__sco.osr.unblockUI, config.timeout); }
        __sco.removeClass(_scs('div.osr-overlay'), 'hidden');
    };

    /*******************
     *  Event Handlers *
     *******************/

    /** Add events **/
    __sco.osr.addEvents = function () {

        // inactivity
        if (__sco.osr.config.enableInactivityTimer == true) {
            setInterval(function () {
                if (__sco.osr.checkForActivity() == true) {
                    __sco.osr.triggerType = "inactivity";
                    __sco.osr.show();
                }
            }, 1000);
        }

        // exit intent
        __sco.on('mouseout', function (ev) {
            __sco.osr.preventDefault(ev);
            __sco.osr.stopPropagation(ev);
            if ((ev.relatedTarget || ev.toElement) == this.parentNode) {
                var dimensions = __sco.osr.getViewportDimensions();
                if ((ev.x || ev.clientX) >= dimensions.width && (ev.y || ev.clientY) >= 0) { return false; }
                if (__sco.osr.exittime == 0 || new Date().getTime() - __sco.osr.exittime > 1000) {
                    __sco.osr.exittime = new Date().getTime();
                    __sco.osr.triggerType = "exitIntent";
                    __sco.osr.show();
                }
            }

        }, document);

        // reset inactivity timeout
        __sco.on(['mousemove', 'touchstart', 'touchmove', 'touchend'], function (ev) {
            if (__sco.osr.lastMove.x != null && __sco.osr.lastMove.y != null) {
                if ((ev.clientX > __sco.osr.lastMove.x + 2 || ev.clientX < __sco.osr.lastMove.x - 2)
                    || (ev.clientY > __sco.osr.lastMove.y + 2 || ev.clientY < __sco.osr.lastMove.y - 2)) {
                    __sco.osr.lastMove.timestamp = new Date().getTime();
                }
            }
            __sco.osr.lastMove.x = ev.clientX;
            __sco.osr.lastMove.y = ev.clientY;
        }, document);
    };

    /** Bind events to dynamically generated content **/
    __sco.osr.rebindTemplateEvents = function () {

        __sco.osr.log('render', 'rebind template events');

        // bind click sink on litebox container
        var lbContainer = _scs(__sco.osr.config.selectors.liteboxContainer);
        if (lbContainer == null) { __sco.osr.log('render', 'unable to find litebox container'); return; }
        __sco.on('click', function (ev) {
            __sco.osr.stopPropagation(ev);
        }, lbContainer);

        // bind close & continue buttons
        __sco.on('click', __sco.osr.closeClick, [_scs(__sco.osr.config.selectors.closeButton), _scs('div.osr-overlay')]);
        __sco.on('click', __sco.osr.continueClick, _scs(__sco.osr.config.selectors.continueButton));

        // email capture button
        if (__sco.osr.canShowEmailCapture() == true && __sco.osr.config.showEmailCapture == true) {
            var saveButton = _scs(__sco.osr.config.selectors.saveButton);
            __sco.on('click', __sco.osr.emailBasketClick, __sco.isArray(saveButton) ? saveButton[0] : saveButton);
        }
    };

    /**  Continue click **/
    __sco.osr.continueClick = function (ev) {
        __sco.osr.unblockUI();
        var endpoint = __sco.osr.config.apiHost + '/litebox/continue/' + __scd.i + '/' + __scd.s.i;
        __sco.management.intersend('POST', endpoint, __sco.osr.configRequest);
        __sco.osr.stopPropagation(ev);
    }

    /** Close click **/
    __sco.osr.closeClick = function (ev) {
        var endpoint = __sco.osr.config.apiHost + '/litebox/close/' + __scd.i + '/' + __scd.s.i;
        __sco.osr.unblockUI();
        __sco.management.intersend('POST', endpoint, __sco.osr.configRequest);
        __sco.osr.stopPropagation(ev);
    }

    /** Email basket click **/
    __sco.osr.emailBasketClick = function () {

        if ((emailAddress = __sco.osr.scrapeEmailAddress()) == false) { return; }
        __sco.osr.unblockUI();

        var req = __sco.extend({ 'emailAddress': emailAddress }, __sco.osr.configRequest);
        var endpoint = __sco.osr.config.apiHost + '/litebox/emailbasket/' + __scd.i + '/' + __scd.s.i;
        __sco.management.intersend('POST', endpoint, SCJSON.stringify(req), function (apiResponse) {
            if (__sco.osr.config.selectors.emailBasketConfirmationTemplate != null) {
                __sco.osr.blockUI({
                    message: _scs(__sco.config.selectors.emailBasketConfirmationTemplate),
                    timeout: __sco.config.emailBasketConfirmationTimeout
                });
            }
            __scd.cc = false;
            __sco.management.setstatus(499, __sco.management.sendtoapi);
            // update email address in scd
            if (__scd.c.e.trim().length == 0) { __scd.c.e = emailAddress; }

        }, __sco.osr.config.requestHeaders);
    }

    /****************
     * CORE METHODS * 
     ****************/

    // TODO: AC - send litebox trigger information back here.

    /** Show the litebox, optionally provide force parameter to override previouslyShown check, used in LB preview **/
    __sco.osr.show = function (force) {
        if (typeof (force) == "undefined" || force == false) {
            if (__sco.osr.previouslyShown == true || __sco.osr.config.enabled == false || __sco.osr.preShowChecks() != true) {
                return;
            }
        }

        var endpoint = __sco.osr.config.apiHost + '/litebox/recommendations/' + __scd.i + '/' + __scd.s.i;

        var basketRequest = __sco.extend(
        {
            'basketContents': __scd.b.i,
            'triggerType': __sco.osr.triggerType
        }, __sco.osr.configRequest);

        // split test will record the fire, but not show to the user
        if (__sco.osr.config.showOsrContainer == false) {
            __sco.management.intersend('POST', endpoint, SCJSON.stringify(basketRequest), function (apiResponse) { }, __sco.osr.config.requestHeaders);
            __sco.osr.previouslyShown = true;
            return;
        }

        // if data is required from the server, perform some checks and then show OSR
        if (__sco.osr.config.showRecommendations == true || __sco.osr.config.showBasketTrends == true) {
            if (!__sco.osr.await) {
                __sco.osr.await = true;
                __sco.management.intersend('POST', endpoint, SCJSON.stringify(basketRequest), function (apiResponse) {

                    __sco.osr.await = false;

                    apiResponse = apiResponse.target.responseText;
                    if (typeof (apiResponse) != 'object') {
                        apiResponse = SCJSON.parse(apiResponse);
                    }

                    // sanity checks on data
                    if (__sco.osr.config.showRecommendations == true && __sco.osr.canShowRecommendations(apiResponse.Recommendations) == false) {
                        return;
                    }
                    if (__sco.osr.config.showBasketTrends == true && __sco.osr.canShowTrends(apiResponse.Trends) == false) {
                        return;
                    }

                    __sco.osr._render({
                        'recommendations': apiResponse.Recommendations != null ? apiResponse.Recommendations : [],
                        'trends': apiResponse.Trends != null ? apiResponse.Trends : []
                    });

                }, __sco.osr.config.requestHeaders);
            }
        }
        else {
            // no recommendations or trends required, just render when call to backend has been made, no need to wait for result
            __sco.management.intersend('POST', endpoint, SCJSON.stringify(basketRequest), function (apiResponse) { }, __sco.osr.config.requestHeaders);
            __sco.osr._render([], []);
        }
    };

    /** Check if mouse has moved in the configured time interval **/
    __sco.osr.checkForActivity = function () {
        // if timestamp or coords not set, give them a default value incase mousemove never fires
        if (__sco.osr.lastMove.timestamp == null) {
            __sco.osr.lastMove.timestamp = new Date().getTime();
            __sco.osr.lastMove.x = 0;
            __sco.osr.lastMove.y = 0;
        }
        if (__sco.osr.lastMove.timestamp != null && __sco.osr.lastMove.x != null && __sco.osr.lastMove.y != null
            && __sco.osr.lastMove.timestamp < new Date().getTime() - __sco.osr.config.inactivityDuration) {
            __sco.osr.lastMove.timestamp = null;
            return true;
        }
        return false;
    };

    /** Replace template variables **/
    __sco.osr._tmpl = function (template, model) {
        var re = /\$\{([^}.]*)}/g;
        var returnHtml = '', match, newTpl;
        __sco.each(model, function (ix, item) {
            newTpl = template.cloneNode(true).innerHTML;
            while (match = re.exec(template.innerHTML)) {
                newTpl = newTpl.replace(match[0], item[match[1]]);
            }
            returnHtml += newTpl;
        });
        return returnHtml;
    };

    /** Render the litebox with provided recommendations & trends **/
    __sco.osr._render = function (viewModel) {
        var container = _scs(__sco.osr.config.selectors.liteboxContainer);

        __sco.osr.showRecommendationsContent(viewModel.recommendations);
        __sco.osr.showTrendsContent(viewModel.trends);

        __sco.osr.blockUI({ message: __sco.isArray(container) ? container[0] : container });
        __sco.osr.rebindTemplateEvents();
        //__sco.osr.sendPing();
        __sco.osr.previouslyShown = true;
    };

    __sco.osr.sendPing = function () {
        var endpoint = __sco.osr.config.apiHost + '/litebox/ping/' + __scd.i + '/' + __scd.s.i;
        __sco.management.intersend('POST', endpoint, SCJSON.stringify(__sco.osr.configRequest), function (apiResponse) { }, __sco.osr.config.requestHeaders);
    }

    /** Camelcase from DTO **/
    __sco.osr._toCamelCase = function (obj) {
        newObj = {};
        for (key in obj) {
            newKey = key;
            newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
            newObj[newKey] = obj[key];
        }
        return newObj;
    };

    /** Get exact viewport dimensions, so we can exclude scrollbar **/
    __sco.osr.getViewportDimensions = function () {
        el = _scs('.viewportcalc');
        if (el == null) {
            var viewportCalc = document.createElement('img');
            viewportCalc.className = 'viewportcalc';
            viewportCalc.setAttribute('src', 'https://d22j4fzzszoii2.cloudfront.net/images/pixel.gif');
            viewportCalc.setAttribute('style', 'position: fixed; bottom: 0px; right: 0px; height: 1px; width: 1px;');
            _scs('body')[0].appendChild(viewportCalc);
            el = _scs('.viewportcalc');
        }

        return {
            'width': el[0].offsetLeft + 1,
            'height': el[0].offsetTop + 1
        };
    }

    /**  Stop propagation cross-browser **/
    __sco.osr.stopPropagation = function (ev) {
        if (__sco.support.browser == 'MSIE') { ev.cancelBubble = true; }
        else { ev.stopPropagation(); }
    }

    /** Prevent default cross-browser **/
    __sco.osr.preventDefault = function (ev) {
        if (__sco.support.browser == 'MSIE' && typeof (ev.preventDefault) == 'undefined') { ev.returnValue = false; }
        else { ev.preventDefault(); }
    }

    /** Detect early IE versions **/
    __sco.osr.isEarlyIe = function () {
        var matches = navigator.userAgent.match(/msie(\s+)[7-9]/i);
        return matches != null && matches.length > 0;
    }

    /** Log errors, either to console, endpoint or silently depending on config **/
    __sco.osr.log = function (category, level, message) {
        var logLine = ("[{0}] [{1}] {2}"
            .replace("{0}", category)
            .replace("{1}", level)
            .replace("{2}", message));

        if (__sco.osr.config.debug == true) {
            __sco.osr.logFile = __sco.osr.logFile || [];
            __sco.osr.logFile.push(logLine);
        }
    }

    /***************
     *     INIT    *
     ***************/
    if (__sco.config.osr) {
        if (__sco.osr.config.initParameter == null || location.search.indexOf(__sco.osr.config.initParameter) != -1) {
            var osrInt = setInterval(function () {
                if (typeof (__scd) != 'undefined' && typeof (__scd.c) != 'undefined' && typeof (__scd.b) != 'undefined') {
                    if (__sco.osr.config.clientConfigModule == false || typeof (__sco.osr.clientConfigModule) != 'undefined') {
                        clearInterval(osrInt);
                        __sco.osr.init();
                    }
                }
            }, 500);
        }
    }
}
catch (ex) { }
