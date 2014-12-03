
    
    var __sco = typeof __sco == "undefined" ? {} : __sco;
    var __scd = typeof __scd == "undefined" ? {} : __scd;
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
    var basketLink = "";

    /** Config module - sets up things such as use OSR, api URL's, triggers, status detection, etc **/
    __sco.config = {
        'live': true, // Send data to live or staging
        'v1': true, // Send data to v1
        'v2': true, // Send data to v2
        'osr': true, // Enable OSR

        'fallbackallowed': true, // Enable auto fall back to traditional data capture
        'translatev1': false, // Translate the data before sending to V1

        'allcurrencies': false, // Allow pricecurr to try to use the entended search list
        'persistcustomer': true, // Persist customer details accross sessions
        'geoip': false, // Use Geo IP Location (Server side)

        /** MIGRATION SETTINGS **/
        'migrationcollect': false, // Collect customer data from the old cookie if it exists
        'daystorun': 20,          // Number of days after live (the date set below) to still look at the cookie
        'startdate': 0,           // In milliseconds, the date the script went live

        'guid': 'da2841f2-a4fb-452d-bcfa-55781809c83a', // V2 guid
        'v1guid': 'da2841f2-a4fb-452d-bcfa-55781809c83a', // V1 guid, the api key for the client

        'triggers': ['exit', 'timeout'], // Set the triggers to use, use either load or exit and timeout together

        'status1': ["cart", "category"], // Strings to be set in lower case, will be compared against the URL of the current page. Functions will be executed and must return either true, false or a number to use as the status
        'status2': ["STATUSTWO"],
        'status3': ["orderConfirmation", "orderconfirmation"],
        'status4': ["STATUSFOUR"],
        'exclude': ["RUN ON EVERYTHING"],

        'onchange': {
            'email': ["#email", "input[name=email]:first", "#email-address", "#register.email", "#j_username", "#forgottenPwd.email", ".email-signup:first input:first", ".SC-Input:first"],
            'first': ["#first-name", "#register.firstName", "#form-new-cust"],
            'last': ["#last-name", "#register.lastName", "#register.lastName"],
            'telephone': ["#phone-number"],
            'mobile': [],
            'salutation': [],
            'optout': []
        },
        'block': {},
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
        'providerregex': /(http[s]*):\/\/(d22j4f[\w\W]+|d30ke5[\w\W]+|d16fk[\w\W]+|app[-staging]*\.salecycle)(\.com|\.co\.uk|\.net)/, // The regex to match the provider hostname

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
            'sv': '2.0.1',                            // Script Version
            'v': '1.0',                              // schema version
            'd': new Date().getTime().toString(),    // utc date
            'r': 100,                                // The request type   
            'u': document.location.href,                  // page URL/title
            't': 0,                                 // type integer of the request (100,200,300...)
            'o': '',                                 // order ID
            'cc': false,                              // Claim conversion flag
            's': {                                   // * session object
                'i': '',                             // session ID
                'm': ''                              // machine ID
            },
            'i': 1050,                                 // client ID
            'i1': 17366,                                // V1 client ID
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
            'i1': 0,
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

        if (__sco.type(__sco.roomMonitor) == "undefined") {
            __sco.roomMonitor = new __sco.monitor();
            __sco.roomMonitor.compare = function () { return _scs(".SC-Input:first") != null ? _scs(".SC-Input:first").value : ''; }
            __sco.roomMonitor.action = function () { __sco.management.prerun(); }
            __sco.roomMonitor.startstate = _scs(".SC-Input:first") != null ? _scs(".SC-Input:first").value : '';
            __sco.roomMonitor.start();
        }

        if (_scs('.product-wrapper')) {

            __scd.cc = true;

            try {
                __scd.b.v = _scs(".subtotal-price:first", "Total Price", ["text", "pricecurr"]);
                __scd.b.c = __sco.cursym;

                var urlLoc = document.URL.split("/")[3];
                var filLoc = document.URL.split(".")[0].split("/")[2];

                __scd.s.phoneNum = "00800 62553985";
                __scd.s.address = "Oakley Icon, Verulam Point, Second Floor, Station Way, AL1 5HE, UK";

                if (filLoc == "it-ch") {
                    filLoc = "it";
                }
                filLoc = "-_-" + filLoc + "-_-";

                if (filLoc == "-_-www-_-") {

                    var phoneNum = "800.431.1439";
                    var address = "1 Icon, Foothill Ranch, CA 92610"
                }

                __scd.s.urlLoc = urlLoc;
                __scd.s.filLoc = filLoc;

                if (_scs(".SC-Input:first")) {
                    var pageStump = __sco.loc.split("/")[__sco.loc.split("/").length - 1].substring(0, 3);
                    var newsletterPages = {
                        "m02": "Mens Sunglasses",
                        "w02": "Womens Sunglasses",
                        "m04": "Mens Apparel",
                        "w04": "Womens Apparel",
                        "m05": "Mens Accessories",
                        "w05": "Womens Accessories",
                        "m07": "Mens Footwear",
                        "w06": "Womens Footwear",
                        "m03": "Mens Goggles",
                        "w03": "Womens Goggles",
                        "cart": "Cart",
                        "c01": "Custom",
                        "c": "Custom"
                    }
                    var newsletterPageName = newsletterPages[pageStump];
                    
                    if (newsletterPages[pageStump] == undefined) {
                        newsletterPageName = "Other Page";
                    }

                    var newsletterEmail = _scs(".SC-Input:first").value;
                    __scd.s.newsletterEmail = newsletterEmail;
                    __scd.s.newsletterPageName = newsletterPageName;
                    __scd.c.e = newsletterEmail;
                    __sco.management.sendtoapi();
                }

                /*__scd.s.example = "";*/ // Example session field
            }
            catch (be2) {
                be2.description = "201 " + (be2.description || "");
                __sco.error(be2);
            }
            try {
                /* Set rows here **/

                __sco.each(_scs('.product-wrapper', '1 rows'), function (ix, val) {

                    // Set basket values here

                    //ITEM QTY CAPTURE
                    var itemQty = "";
                    if (_scs([val, '.option-text:first'])) {
                        itemQty = _scs([val, '.option-text:first'], "Item Qty A", ["text"]);

                        if (itemQty == "") {
                            itemQty = 1; //FIX FOR BLANK QUANTITY SITE BUG
                        }
                    }
                    else if (_scs([val, '.OCPQuantity:first'])) {
                        itemQty = _scs([val, '.OCPQuantity:first'], "Item Qty B", ["text"]);
                    }

                    var itemId = _scs([val, "a:first"], "Item ID").href.split("=")[1].split("&")[0];

                    //REPOP LINK BUILD
                    if (basketLink == "" || basketLink === undefined) {
                        var linkAdd = "[sc_qm]productCode=" + itemId + "[sc_amp]qty=" + itemQty;
                        basketLink = linkAdd;
                    }
                    else {
                        var linkAdd = "[sc_amp]productCode=" + itemId + "[sc_amp]qty=" + itemQty;
                        basketLink = basketLink + linkAdd
                    }

                    //ITEM SIZE 
                    if (_scs([val, ".item-desc:first"])) {
                        var itemSize = _scs([val, ".item-desc:first"], "Size", ["text"]);
                    }
                    else {
                        var itemSize = "";
                    }

                    //ITEM COLOUR
                    if (_scs([val, ".item-desc:nth-child(1)"])) {
                        var itemCol = _scs([val, ".item-desc:nth-child(1)"], "Size", ["text"]);
                    }
                    else {
                        var itemCol = "";
                    }

                    //ITEM IMAGE
                    if (__sco.contains(__sco.attr(_scs([val, "img:first"], "Item Image"), "src"), "cloudfront")) {
                        var itemImage = __sco.attr(_scs([val, 'img:first'], '7 image'), "src").replace("https", "http");
                    }
                    else {
                        var itemImage = "http://www.oakley.com/" + __sco.attr(_scs([val, 'img:first'], '7 image'), "src");
                    }

                    var itemShipping = "";
                    if (_scs([val, ".item-availability:first"])) {
                        itemShipping = _scs([val, ".item-availability:first"], "Delivery Info", ["text"])
                    }
                    else {
                        itemShipping = _scs([val, ".item-state-title:first"], "Stock Check (Delivery Replacement)", ["text"])
                    }

                    __scd.s.basketLink = basketLink;

                    __scd.b.i.push({
                        'n': _scs([val, 'a:nth-child(1)'], "Item Link", ["text"]),
                        'i': __sco.inbetween("product/", "?", _scs([val, 'a:nth-child(1)'], "Item Id").href),
                        'q': itemQty,
                        'v': _scs([val, ".price:first"], "5 itemprice", ["text", "pricecurr"]),
                        'f1': __sco.loc.split(".com")[0] + ".com" + __sco.attr(_scs([val, 'a:first'], '6 link'), "href").split("?")[0],
                        'f2':__scd.s.filLoc,
                        'u': itemImage,
                        'si': itemSize,
                        'co': itemCol,
                        'itemdetails': itemSize,
                        'shipping': itemShipping
                    });
                });
            }
            catch (be1) {
                be1.description = "101 " + (be1.description || "");
                __sco.error(be1);
            }
        }

        else if (__sco.contains(__sco.loc, "category") && (__sco.contains(_scs('span.selected:first', '', ['text']), "Oakley US Site"))) {

            //TEMPORARY BASKET



            if (__scd.b.i.length == 0) {
                __scd.cc = false; //dont send email, its an empty session
                __scd.b.i.push({
                    'n': "Category Fake Item",
                    'i': "Category-Fake-Item",
                    'q': 1,
                    'v': 0.00,
                    'f1': "",
                    'u': ""
                });
            }

            if (_scs(".SC-Input:first")) {

                //var pageStump = "";
                //if (__sco.contains(__sco.loc, "cart")) {
                //    pageStump = "Cart"
                //}
                //else {
                //    if (__sco.contains(document.title, "|")) {
                //        pageStump = document.title.split("|")[0].split("Oakley")[1]
                //    }
                //}
                //__scd.s.newsletterPageName = pageStump;

                var pageStump = __sco.loc.split("/")[__sco.loc.split("/").length - 1].substring(0, 3);
                var newsletterPages = {
                    "m02": "Mens Sunglasses",
                    "w02": "Womens Sunglasses",
                    "m04": "Mens Apparel",
                    "w04": "Womens Apparel",
                    "m05": "Mens Accessories",
                    "w05": "Womens Accessories",
                    "m07": "Mens Footwear",
                    "w06": "Womens Footwear",
                    "m03": "Mens Goggles",
                    "w03": "Womens Goggles",
                    "cart": "Cart",
                    "c": "Custom"
                }
                var newsletterPageName = newsletterPages[pageStump];

                var newsletterEmail = _scs(".SC-Input:first").value;
                __scd.s.newsletterEmail = newsletterEmail;
                __scd.s.newsletterPageName = newsletterPageName;
                __scd.c.e = newsletterEmail;
                __sco.management.sendtoapi();
            }

        }
    }

    /** Get the data for status 2 **/
    __sco.scraper.statustwo = function () {
        try {
            // Do any extra status 2 scraping you want here
        }
        catch (s2) {
            s2.description = "2000 " + (s2.description || "");
            __sco.error(s2);
        }
    }

    /** Get the data for status 3 **/
    __sco.scraper.statusthree = function () {
        try {
            if (_scs(".summary-orderid:first")) {
                __scd.s.ordernumber = _scs(".summary-orderid:first", "Order ID", ["text"]).replace("Order ID# ", "")
            }
            //__scd.s.ordernumber = "ordevrnumber";
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
                    if (__sco.management.isstatus(__sco.config.status3)) {
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
                    if (__sco.management.isstatus(__sco.config.status3)) {
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

    /** Pre-run the script to set the status **/
    __sco.management.prerun = function () {
        try {
            var status = false, executed = false, empty = false;

            // If we're using Geo IP, then set the flag
            if (__sco.config.geoip)
                __scd.s.geo = true;

            // Detect the status and act appropriately
            if ((status = __sco.management.isstatus(__sco.config.status3)) > 0 || __sco.management.isstatus(__sco.config.status3)) {
                executed = true;
                // Get the order number
                __sco.scraper.statusthree();
                __sco.management.itemtypes();

                status = __sco.tonumber(status);
                if (status && status >= 300 && status < 400)
                    __sco.management.setstatus(status, __sco.management.run);
                else
                    __sco.management.setstatus(300, __sco.management.run);
            }
            else if ((status = __sco.management.killit()) > 0 || __sco.management.killit()) {
                executed = true;
                // Get any status 4 info
                __sco.scraper.statusfour();
                status = __sco.tonumber(status);
                if (status && status >= 400 && status < 500)
                    __sco.management.setstatus(status, __sco.management.run);
                else
                    __sco.management.setstatus(400, __sco.management.run);
            }
            else if ((status = __sco.management.isstatus(__sco.config.status1)) > 0 || __sco.management.isstatus(__sco.config.status1)) {
                executed = true;
                // Create a copy of the basket, so if basket is emptied we maintain the last one
                __sco.lastbasket = __sco.clone(__scd.b), customer = "";
                // Clear the old items, if re-run it would add the items otherwise
                __scd.b = __sco.clone(__sco.config.doc.b);
                __sco.scraper.statusone();

                // If the basket was empty, is still empty and the status is 100 then clear
                if (__sco.lastbasket.i.length == 0 && __scd.b.i.length == 0 && __scd.t < 200)
                    empty = true;
                    // If the basket was not empty, but now is then keep the old basket
                else if (__sco.lastbasket.i.length > 0 && __scd.b.i.length == 0)
                    __scd.b = __sco.clone(__sco.lastbasket);
                // Set the data types for the JSON schema (prices to strings and quantities to ints)
                __sco.management.itemtypes();

                // If this is a migration then look for customer details in the old cookie
                if (__sco.config.migrationcollect && __sco.config.persistcustomer && isFinite(new Date(__sco.config.startdate).getTime()) && new Date().getTime() - new Date(__sco.config.startdate) < (__sco.config.daystorun * 60 * 60 * 24 * 1000) && (customer = __sco.storage.get("__sc"))) {
                    if (__sco.type(customer) == "string") {
                        __scd.c.e = __scd.c.e == "" && customer.split(":").length > 1 ? customer.split(":")[1] : __scd.c.e;
                        __scd.c.p.l = __scd.c.p.l == "" && customer.split(":").length > 2 ? customer.split(":")[2] : __scd.c.p.l;
                        var names = customer.split(":").length > 0 && customer.split(":")[0].split("|").length > 0 ? customer.split(":")[0].split("|") : [];
                        __scd.c.f = names.length > 0 && __scd.c.f == "" ? names[0] : __scd.c.f;
                        __scd.c.l = names.length > 1 && __scd.c.l == "" ? names[1] : __scd.c.l;
                    }
                }

                if (!empty) {
                    status = __sco.tonumber(status);
                    if (status && status >= 100 && status < 200)
                        __sco.management.setstatus(status, __sco.management.run);
                    else
                        __sco.management.setstatus(100, __sco.management.run);
                }
                else {
                    __sco.management.run();
                }
            }
            else if ((status = __sco.management.isstatus(__sco.config.status2)) > 0 || __sco.management.isstatus(__sco.config.status2) || (__sco.type(__scd.c.e) == "string" && __scd.c.e != "")) {
                executed = true;
                __sco.scraper.statustwo();
                status = __sco.tonumber(status);
                if (status && status >= 200 && status < 300)
                    __sco.management.setstatus(status, __sco.management.run);
                else
                    __sco.management.setstatus(200, __sco.management.run);
            }

            if (!executed)
                __sco.management.run();
        }
        catch (pre) {
            pre.title = "PRERUNTIME__";
            // Runtime error, report it back
            if (__sco.config.v1)
                __sco.sender.send("POST", __sco.config.errorapi, __sco.v1runtime(pre));
        }
    }

    /** Run the data capture and so on **/
    __sco.management.run = function () {
        // Start the triggers after the JSON has been saved
        function starttriggers() {
            // If completion and not a completion refresh, send now
            if (__scd.t >= 300 && __scd.t < 400) {
                if (__sco.oldtype != "3")
                    __sco.management.sendtoapi();
            }
            else {
                // If the triggers have already been set up and we are using load then this is a re-run, otherwise set the triggers up
                if (__sco.type(__sco.management.trigger.set) == "boolean" && (__sco.contains(__sco.config.triggers, "load") || __sco.support.touchscreen))
                    __sco.management.callback("load");
                else
                    __sco.management.trigger.setup();
            }
        }

        // If no data has been sent before and v2, then send a timestamp for initialisation
        function v2init(data) {
            if (!(data)) {
                var timestamp = __sco.clone(__sco.config.timestamptemplate);
                timestamp.t = __scd.t;
                timestamp.i = __sco.config.doc.i;
                timestamp.i1 = __sco.config.doc.i1;
                timestamp.s.i = __scd.s.i;
                timestamp.s.m = __scd.s.m;
                __sco.management.intersend("POST", __sco.config.v2api, timestamp);
            }
        }

        try {
            // If no request has been sent for this session yet then send a heartbeat to initialise it
            if (__scd.t >= 100 && __scd.t < 200 && __sco.config.v2 && !(__sco.contains(__sco.config.triggers, "load")) && !(__sco.support.touchscreen)) {
                __sco.management.interget("__sc__lastsent", v2init);
            }

            // Data scraping complete, should have updated JSON itself - save the data, even if nothing has changed the timestamp needs updating
            __sco.management.interset("__sc", __scd, starttriggers);
        }
        catch (re) {
            re.title = "RUNTIME__";
            // Runtime error, report it back
            if (__sco.config.v1)
                __sco.sender.send("POST", __sco.config.errorapi, __sco.v1runtime(re));
        }
    }

    /** 
        Retrieves the old JSON if available or sets up new JSON according to schema
        Clear old items from the JSON
        Check if session ID still valid or renew
        If old type == completion, new type is not and session not passed expiry time send JSON if modified since last send (old)
    **/
    __sco.management.setsession = function (data) {
        try {
            var machine = "", session = "", type = "", timestamp = "", customer = {}, old = data, v1machine = __sco.storage.get("__scSMT");

            if (__sco.type(old) == "object" && __sco.type(old.c) == "object" && __sco.type(old.s) == "object") {
                // Get existing machine variables, create new copy of the JSON using the schema (ensures we always use latest schema)
                machine = old.s.m; session = old.s.i; timestamp = __sco.tonumber(old.d); type = old.t.toString().charAt(0);
                __scd = old;
            }
            else {
                // Set up new session
                machine = __sco.mid(); session = __sco.guid(); timestamp = new Date().getTime(); __scd = __sco.clone(__sco.config.doc); __sco.support.updatedoc(); type = __scd.t.toString().charAt(0);
            }
            // If we have a v1 machine ID in storage then get it
            if (v1machine && __sco.type(v1machine) == "string" && v1machine.split(":").length > 0 && !!__sco.tonumber(v1machine.split(":")[0]) && (v1machine = v1machine.split(":")[0])) {
                machine = v1machine != machine ? v1machine : machine;
            }

            // If session expired or current session still valid but last request was a completion and current is not then reset session ID
            if ((Math.floor((new Date().getTime() - timestamp) / 1000) > __sco.config.sessiontime) || type == "3") {
                session = __sco.guid();
                customer = __sco.clone(__scd.c);
                // Reset JSON, machine ID and session will be set at the end of this function
                __scd = __sco.clone(__sco.config.doc);
                // Remove the last sent info, new session means this has never been sent
                __sco.management.interremove("__sc__lastsent");
                // If config indicates we don't want to keep customer data over sessions then clear it
                if (__sco.config.persistcustomer)
                    __scd.c = customer;

                // Update the support info
                __sco.support.updatedoc();

                // Clear the status
                __scd.t = 0;
            }
            // Set session up unless using traditional
            if (__sco.support.traditional) {
                __scd.s.i = "";
                __scd.s.m = "";
            }
            else {
                __scd.s.m = machine;
                __scd.s.i = session;
            }
            __scd.d = new Date().getTime().toString();
            __sco.__scd = __sco.clone(__scd);
            __sco.oldtype = type;

            __sco.management.prerun();
        }
        catch (sse) {
            sse.title = "SETSESSION__";
            // Runtime error, report it back
            if (__sco.config.v1)
                __sco.sender.send("POST", __sco.config.errorapi, __sco.v1runtime(sse));
        }
    }

    __sco.management.isstatus = function (test) {
        var s = false;
        __sco.each(test, function (ix, val) {
            if (!s)
                s = __sco.type(val) === "string" ? __sco.contains(__sco.loc, val) : __sco.type(val) === "function" ? val.call(window) : false;
        });
        return s;
    }

    /** Check for session end, pass function if not using URL's **/
    __sco.management.killit = function (func) {
        // This has fired from an event, set the status to 400 (default) and save the changes
        if (__sco.type(func) == "event") {
            __scd.t = 400; // Don't use set status
            __sco.management.interset("__sc", __scd, function () { __sco.management.callback("load"); });
        }
        else {
            return __sco.management.isstatus(__sco.config.status4);
        }
    }

    /** Function to check for external checkouts on the page and reject their traffic **/
    __sco.management.external = function () {
        __sco.each(__sco.config.external, function (ix, val) {
            if (_scs(ix) != null)
                __sco.on("mousedown", (__sco.type(val) !== "function" ? __sco.management.killit : val), _scs(ix));
        });
    }

    /** Update the types of prices, quantities and session feilds to match the schema **/
    __sco.management.itemtypes = function () {
        __scd.b.v = __sco.type(__scd.b.v) !== "string" && __sco.noru(__scd.b.v) ? __scd.b.v.toString() : __scd.b.v;
        __sco.each(__scd.s, function (ix, val) {
            __scd.s[ix] = __sco.type(val) !== "string" && __sco.noru(val) ? val.toString() : val;
        });
        __sco.each(__scd.b.i, function (ix, val) {
            __scd.b.i[ix].q = __sco.type(val.q) !== "number" && __sco.noru(val.q) ? __sco.tonumber(val.q) : val.q;
            __scd.b.i[ix].v = __sco.type(val.v) !== "string" && __sco.noru(val.v) ? val.v.toString() : val.v;
            __sco.each(__scd.b.i[ix], function (iix, ival) {
                if (!__sco.contains(__sco.config.itemfields, iix))
                    __scd.b.i[ix][iix] = __sco.type(ival) !== "string" && __sco.noru(ival) ? ival.toString() : ival;
            });
        });
    }

    /** If current status 4 then do we overwrite it, restart the session or maintain current status? If current status not 4 then overwrite anyway **/
    __sco.management.setstatus = function (curr, callback, callbackargs) {
        function set(stored) {
            if (curr > 0 && __scd.t >= 400 && __scd.t != 413 && __sco.contains(__sco.config.status4restart, curr)) {
                // To restart
                // If data has changed since last send, or not been sent then send it (create a clone so we can work with the current object without overwriting what we are trying to send)
                if (__sco.management.haschanged(__sco.tryparse(stored.data)))
                    __sco.management.sendtoapi();
                __scd.s.i = __sco.guid();
                // Do not keep basket data over sessions
                __scd.b = __sco.clone(__sco.config.doc.b);
                // Remove the last sent info, new session means this has never been sent
                __sco.management.interremove("__sc__lastsent");
                // If config indicates we don't want to keep customer data over sessions then clear it
                if (!__sco.config.persistcustomer)
                    __scd.c = __sco.clone(__sco.config.doc.c);
                // Update the support info
                __sco.support.updatedoc();
                // Clear the status
                __scd.t = curr;
            }
            else if (curr > 0 && __scd.t >= 400 && __scd.t != 413 && __sco.contains(__sco.config.status4overwrite, curr)) {
                // To overwrite
                __scd.t = curr;
            }
            else if (curr > 0 && __scd.t < 400) {
                // Old is not status 4 so just set the new status
                __scd.t = curr;
            }
            // Maintain old
            if (__sco.noru(callback)) {
                __sco.type(callbackargs) == "array" ? callback.apply(window, callbackargs) : callback.call(window);
            }
            else
                return;
        }
        __sco.management.interget("__sc", set);
    }

    /** Do we need to run on this page **/
    __sco.management.canexec = function () {
        function status2() {
            var s2 = false;
            __sco.each(__sco.config.onchange, function (ix, val) {
                if (!s2) {
                    __sco.each(val, function (iix, ival) {
                        if (__sco.getdom(_scs(ival)) != null)
                            s2 = true;
                    });
                }
            });
            return s2;
        }
        try {
            var s1 = __sco.management.isstatus(__sco.config.status1), s2 = __sco.management.isstatus(__sco.config.status2) || status2(), s3 = __sco.management.isstatus(__sco.config.status3), s4 = __sco.management.killit(), exclude = __sco.management.isstatus(__sco.config.exclude);
            if (!exclude && (s1 || s1 > 0 || s2 || s3 || s3 > 0 || s4 || s4 > 0))
                return true;
            else
                return false;
        }
        catch (ce) {
            return true;
        }
    }

    /** Handle setting and sending error info for when we have no support **/
    __sco.management.nosupport = function (provider) {
        try {
            var error = "NO SUPPORT ";
            if (provider)
                error += " NO PROVIDER STORAGE ";
            if (__sco.config.v1) {
                if (__sco.support && __sco.type(__sco.support.cors) !== "undefined") {
                    __sco.each(__sco.support, function (ix, val) {
                        if (__sco.type(val) !== "function" && __sco.type(val) !== "array")
                            error += ix + " : " + val + " ";
                    });
                }
                __sco.management.intersend("POST", __sco.config.errorapi, __sco.v1runtime(error));
            }
            if (__sco.config.v2) {
                var tmp = __sco.clone(__sco.config.doc);
                tmp.g.push({
                    s: 100,
                    d: new Date().getTime(),
                    e: [{
                        c: "100",
                        d: new Date().getTime(),
                        t: error,
                        n: error
                    }]
                });
                __sco.management.intersend("POST", __sco.config.v2api, tmp);
            }
        }
        catch (nse) { }
    }

    /** Check if the basket, customer info or session ID has changed **/
    __sco.management.haschanged = function (stored) {
        try {
            var old = __sco.__scd, lastupdated = __sco.tonumber(!!stored && __sco.tonumber(stored.d) && __sco.tonumber(stored.d) > __sco.tonumber(__scd.d) ? stored.d : __scd.d);
            // If the session (find the newest between storage and local first) has expired, restart
            if (Math.floor((new Date().getTime() - lastupdated) / 1000) > __sco.config.sessiontime) {
                // Create a new session
                __scd.s.i = __sco.guid();
                // Do not keep basket data over sessions
                __scd.b = __sco.clone(__sco.config.doc.b);
                // Remove the last sent info, new session means this has never been sent
                __sco.management.interremove("__sc__lastsent");
                // If config indicates we don't want to keep customer data over sessions then clear it
                if (!__sco.config.persistcustomer)
                    __scd.c = __sco.clone(__sco.config.doc.c);
                // Update the support info
                __sco.support.updatedoc();
                // Clear the status
                __scd.t = 0;
                // Session has changed, so return true to send an "initialise"
                return true;
            }
            // If changed from storage, merge customer, update basket to whichever is newest and update __scd to stored
            if (!!stored && __sco.tonumber(stored.d) && stored.d != __scd.d && __sco.tonumber(stored.d) > __sco.tonumber(__scd.d)) {
                __scd.c = __sco.extend(stored.c, __scd.c, true);
                __scd.s = __sco.extend(stored.s, __scd.s, true);
                __scd.t = stored.t >= 300 && stored.t < 400 ? stored.t : stored.t > 0 ? stored.t : __scd.t;
                if (stored.b.i.length > 0 && SCJSON.stringify(__scd.b) != SCJSON.stringify(stored.b))
                    __scd.b = __sco.clone(stored.b);
                return true;
            }
            if (old) {
                return SCJSON.stringify(old.b) != SCJSON.stringify(__scd.b) || SCJSON.stringify(old.c) != SCJSON.stringify(__scd.c) || old.s.i != __scd.s.i || SCJSON.stringify(__scd.g) != SCJSON.stringify(old.g);
            }
            else {
                return true;
            }
        }
        catch (hce) {
            return true;
        }
    }

    /** Set the triggers up according to the config **/
    __sco.management.trigger.setup = function () {
        if (__sco.type(__sco.management.trigger.set) === "undefined") {
            if (__sco.contains(__sco.config.triggers, "timeout")) {
                __sco.management.callback("timeout");
            }

            if (__sco.contains(__sco.config.triggers, "exit")) {
                __sco.lastmove = 0;
                __sco.on("mouseout", function (e) {
                    if ((e.relatedTarget || e.toElement) == this.parentNode && (__sco.lastmove == 0 || new Date().getTime() - __sco.lastmove > 1000)) {
                        __sco.lastmove = new Date().getTime();
                        __sco.management.callback("exit");
                    }
                }, document);
            }

            if (__sco.contains(__sco.config.triggers, "load") || __sco.support.touchscreen) {
                __sco.management.callback("load");
            }

            // Setup onchange
            __sco.processonchange();

            // Attach onto any external checkouts
            __sco.management.external();

            // Mark the triggers as having been setup, so not to add again
            __sco.management.trigger.set = true;
        }
    }

    /** Callback for the triggers, work out if data has changed, does it need to store, does it need to send??? **/
    __sco.management.callback = function (trigger) {

        // If the data has changed, then send to the api and update the JSON in storage
        function checkandsend(stored) {
            if (__sco.management.haschanged(stored)) {
                __sco.management.sendtoapi();
                __sco.management.interset("__sc", __scd);
            }
            else {
                __sco.management.interget("__sc__lastsent", stamp, false);
            }
        }

        // Data has not changed, so if nothing has been sent in the last min config time then send
        function stamp(data) {
            if ((!data || data < (new Date().getTime() - (__sco.config.mintimeout * 1000))) && __scd.t > 0) {
                var timestamp = __sco.clone(__sco.config.timestamptemplate);
                timestamp.t = __scd.t; timestamp.i = __sco.config.doc.i; timestamp.i1 = __sco.config.doc.i1; timestamp.s.i = __scd.s.i; timestamp.s.m = __scd.s.m;
                __sco.management.timestampapi(timestamp);
            }
        }

        // Handle timeout callbacks
        function checkcallback(last) {
            var curTime = new Date().getTime(), lastSent = last, timerexecs = 0, timer;

            // If never sent (either first visit or session renew) or time from last sent is greater than the timeout period, send and reset the interval
            if (!lastSent || lastSent < (curTime - (__sco.config.timeout * 1000))) {
                if (__sco.type(__sco.tonumber(lastSent)) == "number" && lastSent < (curTime - (__sco.config.timeout * 1000)))
                    __sco.management.interget("__sc", checkandsend);
                timer = setInterval(function () {
                    __sco.management.interget("__sc", checkandsend);
                    timerexecs++;
                    if (timerexecs > __sco.config.timerruns)
                        clearTimeout(timer);
                }, __sco.config.timeout * 1000);
            }
            else {
                // If sent before, work out time between now and last sent and set timer for the remaining time - when triggered sends followed by resetting timer
                var timeLeft = (__sco.config.timeout * 1000) - (curTime - lastSent);
                setTimeout(function () {
                    __sco.management.interget("__sc", checkandsend);
                    timer = setInterval(function () {
                        __sco.management.interget("__sc", checkandsend);
                        timerexecs++;
                        if (timerexecs > __sco.config.timerruns)
                            clearTimeout(timer);
                    }, __sco.config.timeout * 1000);
                }, timeLeft);
            }
        }

        if (trigger == "exit" || trigger == "load") {
            __sco.management.interget("__sc", checkandsend);
        }
        else if (trigger == "timeout") {
            __sco.management.interget("__sc__lastsent", checkcallback, false);
        }
    }

    /** Listen for post message events, if from an SC provider then react as necessary **/
    __sco.management.react = function (evnt) {
        if (__sco.management.validate(evnt)) {
            try {
                var response = __sco.tryparse(evnt.data), ticket = response.ticket;
                // If we have a ticket, we have a callback to execute
                if (__sco.type(ticket) == "number" && ticket >= 0) {
                    __sco.tickets[ticket].call(window, response.data);
                }
            }
            catch (e) {
                e.title = "React_Error";
                __sco.error(e);
            }
        }
    }

    /** An intermediate callback function for getting from storage, abstracts away the use of the provider **/
    __sco.management.interget = function (name, callback, def) {
        if (name == "__sc" || name == "__sc__lastsent")
            name += __sco.config.doc[__sco.config.v2 ? 'i' : 'i1'];
        if (__sco.support.storeprovider && __sco.support.ps) {
            def = __sco.type(def) === "undefined" ? false : def;
            var ticket = __sco.tickets.push(callback);
            __sco.management.listener.get(name, def, ticket - 1);
        }
        else {
            callback.call(window, __sco.support.traditional ? false : __sco.storage.get(name, def));
        }
    }

    //* An intermediate set function, abstracts use of the provider if needed **/
    __sco.management.interset = function (name, toset, callback) {
        if (name == "__sc__lastsent" || name == "__sc") {
            __scd.d = new Date().getTime().toString();
            name += __sco.config.doc[__sco.config.v2 ? 'i' : 'i1'];
        }
        if (__sco.support.storeprovider && __sco.support.ps) {
            var ticket = -1;
            if (__sco.type(callback) === "function") { ticket = __sco.tickets.push(callback); }
            __sco.management.listener.set(name, toset, ticket - 1);
        }
        else
            !(__sco.support.traditional) ? __sco.type(callback) === "function" ? callback.call(window, __sco.storage.set(name, toset)) : __sco.storage.set(name, toset) : __sco.type(callback) === "function" ? callback.call(window, false) : null;
    }

    /** An intermediate function to abstract away sending through the provider or direct **/
    __sco.management.intersend = function (method, endpoint, data, callback, headers, cachebust) {
        function retrieve(responsedata) {
            callback.call(window, responsedata);
        }

        if (!cachebust && method == "GET") {
            var rn = Math.floor(Math.random() * 0xfff).toString();
            endpoint += ((endpoint.indexOf("?") > -1 ? "&" : "?") + "cbi1=" + rn);
        }

        if (__sco.support.cors || !__sco.support.postmessage || (__sco.support.postmessage && __sco.type(__sco.management.listener) != "undefined" && !__sco.management.listener.ready))
            __sco.sender.send(method, endpoint, data, (__sco.type(callback) === "function" ? retrieve : null), headers, __sco.config.requesttimeout);
        else {
            var ticket = -1;
            if (__sco.type(callback) === "function") { ticket = __sco.tickets.push(callback); }
            // Is it a V1 request? If so use the v1 provider
            if (__sco.config.v1 && __sco.config.v2)
                __sco.management[__sco.contains(endpoint, '/lite/') || __sco.contains(endpoint, '/import/') ? 'v1listener' : 'listener'].send(method, endpoint, data, ticket - 1, headers, __sco.config.requesttimeout);
            else
                __sco.management.listener.send(method, endpoint, data, ticket - 1, headers);
        }
    }

    /** An intermediate function to abstract away removing from storage either through the provider or direct **/
    __sco.management.interremove = function (name, callback) {
        if (name == "__sc" || name == "__sc__lastsent")
            name += __sco.config.doc[__sco.config.v2 ? 'i' : 'i1'];
        if (__sco.support.storeprovider) {
            var ticket = -1;
            if (__sco.type(callback) === "function") { ticket = __sco.tickets.push(callback); }
            __sco.management.listener.remove(name, ticket - 1);
        }
        else {
            !(__sco.support.traditional) ? __sco.type(callback) === "function" ? callback.call(window, __sco.storage.remove(name)) : __sco.storage.remove(name) : __sco.type(callback) === "function" ? callback.call(window, false) : null;
        }
    }

    /** A function to validate a request has come from the SaleCycle provider **/
    __sco.management.validate = function (data) {
        if (__sco.type(data.origin) == "string" && (data.origin == __sco.config.v1providerhost.match(__sco.config.providerregex)[0] || data.origin == __sco.config.providerhost.match(__sco.config.providerregex)[0] || data.origin == "self"))
            return true;
        else
            return false;
    }

    /** Send timestamp to both API's **/
    __sco.management.timestampapi = function (timedata) {
        function hassent(data) {
            var __sct, isset = __sco.type(__scd) == "object" && __sco.type(__scd.b) == "object" && __sco.type(__scd.c) == "object";
            // If we have timedata and __scd is not yet defined, create a temporary one to send
            if (__sco.type(timedata) == "object" && !isset) {
                __sct = __sco.clone(__sco.config.timestamptemplate);
                __sct.t = timedata.t;
                __sct.s.i = timedata.s.i;
                __sct.s.m = timedata.s.m;
                __sct.i = __sco.config.doc.i;
                __sct.i1 = __sco.config.doc.i1;
                __sct.o = "";
            }

            // If the basket has not been sent before then send it, otherwise use the timestamp
            if ((!data) && isset)
                __sco.management.sendtoapi();
            else {
                if (__sco.config.v1)
                    __sco.management.intersend("POST", ((!isset ? __sct.t >= 300 : __scd.t >= 300) && (!isset ? __sct.t < 400 : __scd.t < 400)) ? __sco.config.v1completion : __sco.config.v1api, (__sco.contains(__sco.config.v1api, "/lite/") ? timedata : __sco.translatetov1(isset ? __scd : __sct)));
                if (__sco.config.v2)
                    __sco.management.intersend("POST", __sco.config.v2api, timedata);

                // Set the time last sent
                if (isset) {
                    __sco.management.interset("__sc__lastsent", new Date().getTime());
                    __scd.d = new Date().getTime().toString();
                    __sco.__scd.d = __sco.clone(__scd.d);
                    __sco.management.interset("__sc", __scd);
                }
            }
        }
        if (__sco.type(__sco.management.listener) == "undefined" || (__sco.type(__sco.management.listener) != "undefined" && !__sco.management.listener.ready)) {
            hassent(false);
        }
        else
            // Check if the basket has been sent for this session yet
            __sco.management.interget("__sc__lastsent", hassent);
    }

    /** Send to both API's **/
    __sco.management.sendtoapi = function () {
        if (__scd.t > 0 || __scd.g.length > 0) {
            __sco.management.interset("__sc__lastsent", new Date().getTime());
            if (__sco.config.v1)
                __sco.management.intersend("POST", (__scd.t >= 300 && __scd.t < 400 ? __sco.config.v1completion : __sco.config.v1api), (__sco.config.translatev1 ? __sco.translatetov1(__scd) : __scd));
            if (__sco.config.v2) {
                var tmpscd = __sco.clone(__scd);
                if (__sco.support.traditional) {
                    tmpscd.r = 300;
                }
                __sco.management.intersend("POST", __sco.config.v2api, tmpscd);
            }
            __sco.__scd = __sco.clone(__scd);
        }
    }

    /**
     * A modified version of Diego Perini's contentLoaded 
     * http://javascript.nwbox.com/ContentLoaded/
     * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
    **/
    __sco.management.contentLoaded = function (win, fn, args) {
        var done = false, top = true, doc = win.document, root = doc.documentElement,
        init = function (e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            __sco.off(e.type, init, (e.type == 'load' ? win : doc));
            if (!done && (done = true)) fn.apply(win, args || [], e.type || e);
        },
        poll = function () {
            try { root.doScroll('left'); } catch (e) { setTimeout(poll, 50); return; }
            init('poll');
        };
        if (doc.readyState == 'complete') fn.apply(win, args || []);
        else {
            if (doc.createEventObject && root.doScroll) {
                try { top = !win.frameElement; } catch (e) { }
                if (top) poll();
            }
            __sco.on('DOMContentLoaded', init, doc);
            __sco.on('readystatechange', init, doc);
            __sco.on('load', init, win);
        }
    }

    /** Provide a jQuery/Sizzle selector **/
    _scs = function (selector, message, funcs) {

        // Selector regexp's taken from Sizzle.js - not using all of them!
        // https://raw.github.com/jquery/sizzle/master/src/sizzle.js
        // https://raw.github.com/jquery/sizzle/master/MIT-LICENSE.txt
        var whitespace = "[\\x20\\t\\r\\n\\f]",
        characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        identifier = characterEncoding.replace("w", "w#"),
        attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
            "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
        matchExpr = {
            "ID": new RegExp("^#(" + characterEncoding + ")"),
            "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
            "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            "ATTR": new RegExp("^" + attributes),
            "CHILD": new RegExp("^:(first|last|children|textnodes|elemp|nth-child)(?:\\(" + whitespace + "*([\\d\\w\\*]*)" + whitespace + "*\\)|)?", "i")
        },
        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
        funescape = function (_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 0x10000;
            return high !== high || escapedWhitespace ?
                escaped :
                    high < 0 ?
                            String.fromCharCode(high + 0x10000) :
                            String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        };

        function selectescape(txt) {
            return txt.replace(runescape, funescape);
        }

        function nodesonly(nodes, ty) {
            var tmp = new Array();
            __sco.each(__sco.toarray(nodes), function (ix, val) {
                if ((val.nodeType == 1 || val.nodeType == 9) && (__sco.type(ty) === "string" ? val.nodeName.toLowerCase() === ty : true))
                    tmp.push(val);
            });
            return tmp;
        }

        function textnodes(nodes) {
            var tmp = new Array();
            __sco.each(nodes, function (ix, val) {
                if (val.nodeType == 3)
                    tmp.push(val);
            });
            return tmp;
        }

        function elems(elem, classname) {
            var arr = new Array(), regex = new RegExp("(^|\\\s+)(" + classname + ")($|\\\s+)");
            __sco.each(elem, function (ix, val) {
                if (val.nodeType === 1 && val.className.match(regex) != null)
                    arr.push(val);
            });
            return arr;
        }

        function elemp(e, g) {
            var a = [], c = 0, b = 0, d = (g || document).getElementsByTagName(e);
            a[0] = d[0];
            for (var f = 1; f < d.length; f++) {
                null != a[c] && (b += a[c].getElementsByTagName(e).length, b++, c++, null != d[b] && (a[c] = d[b]));
            }
            return a;
        }

        function filvals(val, filt, search) {
            var arr = new Array();
            if (val.nodeType === 1 || val.nodeType === 9) {
                if (filt) {
                    var t = __sco.attr(val, search.match(matchExpr.ATTR)[1]);
                    if (t != null && t.match(new RegExp("^" + search.match(matchExpr.ATTR)[5] + "$")) != null)
                        arr = arr.concat(__sco.toarray(val));
                }
                else {
                    var cval = val.getElementsByTagName("*");
                    __sco.each(cval, function (iix, ival) {
                        var t = __sco.attr(ival, search.match(matchExpr.ATTR)[1]);
                        if (t != null && t.match(new RegExp("^" + search.match(matchExpr.ATTR)[5] + "$")) != null)
                            arr = arr.concat(__sco.toarray(ival));
                    });
                }
            }
            return arr;
        }

        function filatts(val, filt, search) {
            var arr = new Array();
            if (val.nodeType === 1 || val.nodeType === 9) {
                if (filt) {
                    if (__sco.attr(val, selectescape(search.match(matchExpr.ATTR)[1])) != null)
                        arr = arr.concat(__sco.toarray(val));
                }
                else {
                    var cval = val.getElementsByTagName("*");
                    __sco.each(cval, function (iix, ival) {
                        if (__sco.attr(ival, selectescape(search.match(matchExpr.ATTR)[1])))
                            arr = arr.concat(__sco.toarray(ival));
                    });
                }
            }
            return arr;
        }

        function select(search, context, index, filter) {
            if (context != null) {
                if (search.match(matchExpr.ID) != null) {
                    split[index] = __sco.ltrim(split[index].replace(search.match(matchExpr.ID)[0], ""));
                    var tmp = document.getElementById(selectescape(search.match(matchExpr.ID)[1]));
                    // Catch IE bug where names are returned as ID's
                    tmp = tmp == null ? null : tmp.id != selectescape(search.match(matchExpr.ID)[1]) ? null : tmp;
                    return split[index] === "" ? tmp : select(split[index], tmp, index, 1);
                }
                else if (search.match(matchExpr.TAG) != null) {
                    split[index] = __sco.ltrim(split[index].replace(search.match(matchExpr.TAG)[0], ""));
                    var tmp = new Array();
                    __sco.type(context) != "htmlelement" && context.length > 0 ? __sco.each(context, function (ix, val) {
                        if (val.nodeType === 1)
                            tmp = tmp.concat(__sco.toarray(val.getElementsByTagName(selectescape(search.match(matchExpr.TAG)[0]))));
                    }) : __sco.type(context) != "htmlelement" && context.length == 0 ? tmp = tmp.concat(__sco.toarray((!filter ? document : context).getElementsByTagName(selectescape(search.match(matchExpr.TAG)[0]))))
                       : tmp = tmp.concat(__sco.toarray(context.getElementsByTagName(selectescape(search.match(matchExpr.TAG)[0]))));
                    return split[index] === "" ? tmp.length === 0 ? null : tmp : select(split[index], tmp == null || tmp.length == 0 ? null : tmp, index, 1);
                }
                else if (search.match(matchExpr.CLASS) != null) {
                    split[index] = __sco.ltrim(split[index].replace(search.match(matchExpr.CLASS)[0], ""));
                    var tmp = new Array();
                    if (__sco.type(document.getElementsByClassName) == "function" && document.getElementsByClassName.toString().indexOf("[native code]") > -1) { // Native get by class support
                        __sco.type(context) != "htmlelement" && context.length > 0 ? __sco.each(context, function (ix, val) {
                            if (val.nodeType === 1)
                                if (filter) {
                                    tmp = tmp.concat(val.className.match(new RegExp("(^|\\\s+)(" + selectescape(search.match(matchExpr.CLASS)[1]) + ")($|\\\s+)")) != null ? __sco.toarray(val) : []);
                                }
                                else {
                                    tmp = tmp.concat(__sco.toarray(val.getElementsByClassName(selectescape(search.match(matchExpr.CLASS)[1]))));
                                }
                        }) : tmp = tmp.concat(__sco.toarray((__sco.type(context) != "htmlelement" && context.length == 0 ? document : context).getElementsByClassName(selectescape(search.match(matchExpr.CLASS)[1]))));
                    }
                    else { // Fall back to custom implementation
                        __sco.type(context) != "htmlelement" && context.length > 0 ? __sco.each(context, function (ix, val) {
                            if (val.nodeType === 1) {
                                if (filter) {
                                    if (val.className.match(new RegExp("(^|\\\s+)(" + selectescape(search.match(matchExpr.CLASS)[1]) + ")($|\\\s+)")) != null)
                                        tmp = tmp.concat(__sco.toarray(val));
                                }
                                else {
                                    tmp = tmp.concat(__sco.toarray(elems(val.getElementsByTagName("*"), selectescape(search.match(matchExpr.CLASS)[1]))));
                                }
                            }
                        }) : __sco.type(context) != "htmlelement" && context.length == 0 ? tmp = tmp.concat(__sco.toarray(elems(document.getElementsByTagName("*"), selectescape(search.match(matchExpr.CLASS)[1]))))
                           : !filter ? tmp = tmp.concat(__sco.toarray(elems(context.getElementsByTagName("*"), selectescape(search.match(matchExpr.CLASS)[1]))))
                           : tmp = tmp.concat(__sco.toarray(elems(__sco.toarray(context), selectescape(search.match(matchExpr.CLASS)[1]))));
                    }
                    return split[index] === "" ? tmp.length === 0 ? null : tmp : select(split[index], tmp == null || tmp.length == 0 ? null : tmp, index, 1);
                }
                else if (search.match(matchExpr.ATTR) != null) {
                    split[index] = __sco.ltrim(split[index].replace(search.match(matchExpr.ATTR)[0], ""));
                    var tmp = new Array();
                    if (typeof search.match(matchExpr.ATTR)[5] !== "undefined") {
                        __sco.type(context) != "htmlelement" && context.length > 0 ? __sco.each(context, function (ix, val) {
                            tmp = tmp.concat(filvals(val, filter, search));
                        }) : __sco.type(context) != "htmlelement" && context.length == 0 ? __sco.each([document], function (ix, val) {
                            tmp = tmp.concat(filvals(val, filter, search));
                        }) : tmp = tmp.concat(filvals(context, filter, search));
                    }
                    else {
                        __sco.type(context) != "htmlelement" && context.length > 0 ? __sco.each(context, function (ix, val) {
                            tmp = tmp.concat(filatts(val, filter, search));
                        }) : __sco.type(context) != "htmlelement" && context.length == 0 ? __sco.each([document], function (ix, val) {
                            tmp = tmp.concat(filatts(val, filter, search));
                        }) : tmp = tmp.concat(filatts(context, filter, search));
                    }
                    return split[index] === "" ? tmp.length === 0 ? null : tmp : select(split[index], tmp == null || tmp.length == 0 ? null : tmp, index, 1);
                }
                else if (search.match(matchExpr.CHILD) != null) {
                    var m = search.match(matchExpr.CHILD), tmp = new Array();
                    split[index] = __sco.ltrim(split[index].replace(search.match(matchExpr.CHILD)[0], ""));
                    if (m[1] == "first" || m[1] == "last" || m[1] == "nth-child") {
                        switch (m[1]) {
                            case "first":
                                tmp = __sco.type(context) != "htmlelement" && context.length > 0 ? context[0] : !context.length ? context : null;
                                return split[index] === "" ? tmp == null || tmp.length === 0 ? null : tmp : select(split[index], tmp == null || tmp.length == 0 ? null : tmp, index, 1);
                            case "last":
                                tmp = __sco.type(context) != "htmlelement" && context.length > 0 ? context[context.length - 1] : !context.length ? context : null;
                                return split[index] === "" ? tmp == null || tmp.length === 0 ? null : tmp : select(split[index], tmp == null || tmp.length == 0 ? null : tmp, index, 1);
                            case "nth-child":
                                tmp = __sco.type(context) != "htmlelement" && parseFloat(m[2]).toString() !== "NaN" && context.length > m[2] ? context[m[2]] : null;
                                return split[index] === "" ? tmp == null || tmp.length === 0 ? null : tmp : select(split[index], tmp == null || tmp.length == 0 ? null : tmp, index, 1);
                        }
                    }
                    else if (m[1] == "children") {
                        if (__sco.type(m[2]) != "undefined") {
                            __sco.type(context) != "htmlelement" && context.length > 0 ? __sco.each(context, function (ix, val) {
                                tmp = tmp.concat(__sco.toarray(nodesonly(val.childNodes, m[2])));
                            }) : __sco.type(context) != "htmlelement" && context.length == 0 ? tmp = [] : tmp = tmp.concat(__sco.toarray(nodesonly(context.childNodes, m[2])));
                        }
                        else {
                            __sco.type(context) != "htmlelement" && context.length > 0 ? __sco.each(context, function (ix, val) {
                                tmp = tmp.concat(__sco.toarray(nodesonly(val.childNodes)));
                            }) : __sco.type(context) != "htmlelement" && context.length == 0 ? tmp = [] : tmp = tmp.concat(__sco.toarray(nodesonly(context.childNodes)));
                        }
                        return split[index] === "" ? tmp.length === 0 ? null : tmp : select(split[index], tmp == null || tmp.length == 0 ? null : tmp, index, 1);
                    }
                    else if (m[1] == "textnodes") {
                        __sco.type(context) != "htmlelement" && context.length > 0 ? __sco.each(context, function (ix, val) {
                            tmp = tmp.concat(__sco.toarray(textnodes(val.childNodes)));
                        }) : __sco.type(context) != "htmlelement" && context.length == 0 ? tmp = [] : tmp = tmp.concat(__sco.toarray(textnodes(context.childNodes)));
                        return split[index] === "" ? tmp.length === 0 ? null : tmp : select(split[index], tmp == null || tmp.length == 0 ? null : tmp, index, 1);
                    }
                    else if (m[1] == "elemp") {
                        __sco.type(context) != "htmlelement" && context.length > 0 ? __sco.each(context, function (ix, val) {
                            tmp = tmp.concat(__sco.toarray(elemp(selectescape(m[2]), val)));
                        }) : __sco.type(context) != "htmlelement" && context.length == 0 ? tmp = [] : tmp = tmp.concat(__sco.toarray(elemp(selectescape(m[2]), context)));
                        return split[index] === "" ? tmp.length === 0 ? null : tmp : select(split[index], tmp == null || tmp.length == 0 ? null : tmp, index, 1);
                    }
                    else
                        return null;
                }
                else {
                    return null;
                }
            }
            return null;
        }

        if (__sco.type(selector) === "string" || (__sco.type(selector) === "array" && __sco.type(selector[0]) === "htmlelement" && __sco.type(selector[1]) === "string")) {
            var split = [], last = "", results = [], errorsplit = [], errorset = false;
            if (__sco.type(selector) === "array") {
                split = __sco.clean(selector[1]).split(/\s+(?![^\[]*\])/g);
                results = selector[0];
            }
            else {
                split = __sco.clean(selector).split(/\s+(?![^\[]*\])/g);
            }
            errorsplit = __sco.clone(split);
            __sco.each(split, function (ix, val) {
                if (last != null) {
                    var tmp = select(val, results, ix);
                    tmp == null ? (last = tmp, results = null) : (results = tmp, last = "");
                    if (tmp == null && __sco.type(message) == "string" && message.length > 0 && !errorset) {
                        __sco.error(message + " Selector:" + errorsplit.slice(0, ix + 1).join(" "));
                        errorset = true;
                    }
                }
                else {
                    results = null;
                }
            });
            if (__sco.type(funcs) === "array" && funcs.length > 0) {
                __sco.each(funcs, function (ix, val) {
                    if (__sco.type(__sco[val]) === "function")
                        results = __sco[val].call(window, __sco.type(results) === "array" && results.length > 0 ? results[0] : results);
                });
            }
            return results;
        }
        else {
            return null;
        }
    }

    /*********************************************/
    /**             Data retrieval              **/
    /*********************************************/

    /** Return the value of the requested attribute **/
    __sco.attr = function (elem, att, set) {
        if (__sco.type(elem) == "htmlelement") {
            if (arguments.length < 3) {
                return elem.getAttribute(att) || null;
            }
            else {
                if (__sco.noru(set))
                    return elem.setAttribute(att, set);
                else
                    return elem.removeAttribute(att);
            }
        }
        return null;
    }

    /** Remove leading or trailing whitespace, also multiple spaces in a string change to 1 space **/
    __sco.clean = function (txt) {
        return (__sco.type(txt) === "string") ? txt.replace(/^\s*|\s*$/g, '').replace(/\s{2,}|[\r\t\n]/g, " ") : null;
    }

    /** A wrapper function for replace, takes away danger of trying replace on non string value **/
    __sco.clear = function (str, regex, flags, repl) {
        var s = __sco.type(str), r = __sco.type(regex), f = __sco.type(flags), p = __sco.type(repl);
        if (s != "string" || (s != "string" && (r != "string" || r != "regexp")))
            return null;
        return str.replace((r == "regexp" ? regex : (f == "string" ? new RegExp(regex, flags) : new RegExp(regex))), (p == "string" || p == "function" ? repl : ""));
    }

    /** Check array, object, string **/
    __sco.contains = function (elem, search) {
        if (__sco.type(elem) === "string")
            return elem.indexOf(search) > -1;
        else if (__sco.type(elem) === "array") {
            return elem.indexOf(search) > -1;
        }
        else if (__sco.type(elem) === "object") {
            return elem.hasOwnProperty(search);
        }
        else
            return false;
    }

    /** The currency code of that last run of pricecurr if a symbol was found **/
    __sco.cursym = "";

    /** Trim whitespace from the left of a string **/
    __sco.ltrim = function (str) {
        return __sco.type(str) === "string" ? str.replace(/^\s*/, "") : null;
    }

    /** Return the value or text from an input, select or textarea node **/
    __sco.getvt = function (a, b) {
        var c = __sco.type(a) !== "htmlelement" ? "" : a.nodeName.toLowerCase(), e = null;
        if (c == "input" || c == "select" || c == "textarea") {
            var d = a.type.toLowerCase(), e;
            if (c == "select") {
                e = a.selectedIndex > -1 ? (b == false) ? a.options[a.selectedIndex].value : a.options[a.selectedIndex].text : null;
            }
            else if (c == "input") {
                if (d == "checkbox" || d == "radio") {
                    e = (a.selected || a.checked == true) ? "1" : "0";
                }
                else {
                    e = typeof a.value == "undefined" ? null : a.value;
                }
            }
        }
        else {
            e = null;
        }
        return __sco.clean(e);
    }

    /** Return the text inbetween the two strings in the specified string **/
    __sco.inbetween = function (a, b, c, d) {
        function esc(a) {
            return a.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&").replace(/\s/g, "\\s");
        }

        if (__sco.type(a) === "string" && __sco.type(b) === "string" && __sco.type(c) === "string") {
            var d = d || "ff", e = '', f = 0, g = c.indexOf(a), h = c.lastIndexOf(a),
            i = a.length, j = "substring", k = c.lastIndexOf(b);
            if (g != -1 && k != -1) {
                if (a == b) {
                    f = c.match(new RegExp(esc(a), 'g'));
                    if (f.length > 1) {
                        e = (d == "ff") ? c[j](g + i, c.indexOf(b, g + i)) : (d == "fl" ? c[j](g + i, k) : e);
                    }
                }
                else {
                    e = (d == "ff") ? c[j](g + i, c.indexOf(b, g + i)) : ((d == "fl") ? c[j](g + i, k) : ((d == "lf") ? c[j](h + i, c.indexOf(b, h + i)) : ((d == "ll") ? c[j](h + i, k) : e)));
                }
            }
            return __sco.clean(e);
        }
        else {
            return null;
        }
    }

    /** Function to return a formatted number from a string **/
    __sco.pricecurr = function (a, f) {

        function adda(z, y) {
            y = y || z.length; var x = ""; for (var i = 0; i < y; i++) { x += z[i]; } return x;
        }

        var curr = {
            "\u00a3": "GBP", "\u20ac": "EUR", "€": "EUR", "$": "USD", "A$": "AUD", "CAD$": "CAD", "CHF": "CHF", "Fr.": "CHF", "\u00a5": "JPY", "kr": "NOK", "NZ$": "NZD", "\u0440\u0443\u0431.": "RUB", "py6": "RUB", "pyu0431": "RUB", "SKr": "SEK", "Kc": "CZK"
            /* Uncomment if you need all currencies */
            /*,"AED":"AED","AFN":"AFN","Lek":"ALL","AMD":"AMD","Kz":"AOA","AR$":"ARS","\u0192":"AWG","AZN":"AZN","KM":"BAM","Bds$":"BBD","BDT":"BDT","\u043b\u0432":"BGN","BHD":"BHD","Fr":"BIF","BD$":"BMD","B$":"BND","$b":"BOB","R$":"BRL","B$":"BSD","BTN":"BTN","P":"BWP","p.":"BYR","BZ$":"BZD","FC":"CDF","CLP":"CLP","\u00a5":"RMB","COP":"COP","\u00a2":"CRC","$MN":"CUP","Esc":"CVE","CYP":"CYP","Kc":"CZK","K\u010d": "CZK","Fdj":"DJF","DKK":"DKK","Dkr":"DKK","RD$":"DOP","DZD":"DZD","EEK":"EEK","EGP":"EGP","Nfk":"ERN","ETB":"ETB","FJ$":"FJD","FKP":"FKP","GEL":"GEL","GGP":"GGP","GHS":"GHS","D":"GMD", "Fr":"GNF", "q":"GTQ","HK$":"HKD","L":"HNL","kn":"HRK","G":"HTG","Ft":"HUF","Rp":"IDR","ILS":"ILS","\u20aa":"ILS","IMP":"IMP","Rs":"INR","\u20b9":"INR","IQD":"IQD","IRR":"IRR","\u00cdkr":"ISK", "JEP":"JEP","J$":"JMD","JOD":"JOD","Sh":"KES","KGS":"KGS","KHR":"KHR","Fr":"KMF","\u20a9":"KPW","KRW":"KRW","KWD":"KWD","CI$":"KYD","KZT":"KZT","\u20ad":"LAK","LBP":"LBP","Rp":"LKR","L$":"LRD","L":"LSL","Lt":"LTL","Ls":"LVL","LYD":"LYD","MAD":"MAD","L":"MDL","MGA":"MGA","\u0434\u0435\u043d":"MKD","K":"MMK","\u20ae":"MNT","P":"MOP","UM":"MRO","Rp":"MUR","MVR":"MVR","MK":"MWK","MEX$":"MXN","RM":"MYR","MT":"MZN","N$":"NAD","\u20a6":"NGN","C$":"NIO","Rp":"NPR","OMR":"OMR","B/.":"PAB","S/.":"PEN","K":"PGK","Php":"PHP","\u20b1":"PHP","Rp":"PKR","z\u0142":"PLN","Gs":"PYG","QAR":"QAR","RMB":"RMB","lei":"RON","Fr":"RWF","SAR":"SAR","SI$":"SBD","Rp":"SCR","SDG":"SDG","SEK":"SEK","SG$":"SGD","S$":"SGD","SHP":"SHP","Le":"SLL","S":"SOS","SPL":"SPL","SRD":"SRD","Db":"STD","\u20a1":"SVC","SYP":"SYP","L":"SZL","\u0e3f":"THB","\u0e1a\u0e32\u0e17":"THB","SM":"TJS","m":"TMM","TND":"TND","T$":"TOP","TL":"TRY","TT$":"TTD","TV$":"TVD","$T":"TVD","NT$":"TWD", "Sh":"TZS","UAH":"UAH","Sh":"UGX","$U":"UYU","UZS":"UZS","Bs":"VEF","\u20ab":"VND","Vt":"VUV","T":"WST","EC$":"XCD","YER":"YER","R":"ZAR","Zk":"ZMK","Z$":"ZWD","CUC$":"CUC"*/
        },
        curr1 = {
            "AED": "AED", "AFN": "AFN", "Lek": "ALL", "AMD": "AMD", "Kz": "AOA", "AR$": "ARS", "\u0192": "AWG", "AZN": "AZN", "KM": "BAM", "Bds$": "BBD", "BDT": "BDT", "\u043b\u0432": "BGN", "BHD": "BHD", "Fr": "BIF", "BD$": "BMD", "B$": "BND", "$b": "BOB", "R$": "BRL", "B$": "BSD", "BTN": "BTN", "P": "BWP", "p.": "BYR", "BZ$": "BZD", "FC": "CDF", "CLP": "CLP", "\u00a5": "RMB", "COP": "COP", "\u00a2": "CRC", "$MN": "CUP", "Esc": "CVE", "CYP": "CYP", "Kc": "CZK", "K\u010d": "CZK", "Fdj": "DJF", "DKK": "DKK", "Dkr": "DKK", "RD$": "DOP", "DZD": "DZD", "EEK": "EEK", "EGP": "EGP", "Nfk": "ERN", "ETB": "ETB", "FJ$": "FJD", "FKP": "FKP", "GEL": "GEL", "GGP": "GGP", "GHS": "GHS", "D": "GMD", "Fr": "GNF", "q": "GTQ", "HK$": "HKD", "L": "HNL", "kn": "HRK", "G": "HTG", "Ft": "HUF", "Rp": "IDR", "ILS": "ILS", "\u20aa": "ILS", "IMP": "IMP", "Rs": "INR", "\u20b9": "INR", "IQD": "IQD", "IRR": "IRR", "\u00cdkr": "ISK", "JEP": "JEP", "J$": "JMD", "JOD": "JOD", "Sh": "KES", "KGS": "KGS", "KHR": "KHR", "Fr": "KMF", "\u20a9": "KPW", "KRW": "KRW", "KWD": "KWD", "CI$": "KYD", "KZT": "KZT", "\u20ad": "LAK", "LBP": "LBP", "Rp": "LKR", "L$": "LRD", "L": "LSL", "Lt": "LTL", "Ls": "LVL", "LYD": "LYD", "MAD": "MAD", "L": "MDL", "MGA": "MGA", "\u0434\u0435\u043d": "MKD", "K": "MMK", "\u20ae": "MNT", "P": "MOP", "UM": "MRO", "Rp": "MUR", "MVR": "MVR", "MK": "MWK", "MEX$": "MXN", "RM": "MYR", "MT": "MZN", "N$": "NAD", "\u20a6": "NGN", "C$": "NIO", "Rp": "NPR", "OMR": "OMR", "B/.": "PAB", "S/.": "PEN", "K": "PGK", "Php": "PHP", "\u20b1": "PHP", "Rp": "PKR", "z\u0142": "PLN", "Gs": "PYG", "QAR": "QAR", "RMB": "RMB", "lei": "RON", "Fr": "RWF", "SAR": "SAR", "SI$": "SBD", "Rp": "SCR", "SDG": "SDG", "SEK": "SEK", "SG$": "SGD", "S$": "SGD", "SHP": "SHP", "Le": "SLL", "S": "SOS", "SPL": "SPL", "SRD": "SRD", "Db": "STD", "\u20a1": "SVC", "SYP": "SYP", "L": "SZL", "\u0e3f": "THB", "\u0e1a\u0e32\u0e17": "THB", "SM": "TJS", "m": "TMM", "TND": "TND", "T$": "TOP", "TL": "TRY", "TT$": "TTD", "TV$": "TVD", "$T": "TVD", "NT$": "TWD", "Sh": "TZS", "UAH": "UAH", "Sh": "UGX", "$U": "UYU", "UZS": "UZS", "Bs": "VEF", "\u20ab": "VND", "Vt": "VUV", "T": "WST", "EC$": "XCD", "YER": "YER", "R": "ZAR", "Zk": "ZMK", "Z$": "ZWD", "CUC$": "CUC"
        },
        curr2 = { "EGP": "1", "KWD": "1", "OMR": "1", "JOD": "1" },
        cS = "",
        cC = "";

        (function () {
            var x = [], y = [];
            if (__sco.config.allcurrencies) {
                __sco.each(curr1, function (ix, val) {
                    curr[ix] = val;
                });
            }
            for (var key in curr) { x.push(curr[key]); y.push(key); }
            cC = x.join("|"),
            cS = y.join("|");
        }());

        var f = f == false ? false : true, g;
        if (__sco.type(a) === "string" && a.replace(/[^\d]/g, "") != "") {
            var c = a.replace(/[^\d\,\.]/g, "").match(/[\d]+/g),
            b1 = a.match(new RegExp("(" + cC + ")"), "i"),
            b2 = a.match(new RegExp("(" + cS.replace(/\$/g, "\\$") + ")"), "i");
            if (b1 != null) {
                __sco.cursym = b1[0];
            }
            else if (b2 != null) {
                __sco.cursym = curr[b2[0]] || '';
            }
            // Special handling of currencies with 1/1000 subunit
            if (!!curr2[__sco.cursym] == true) {
                g = 4;
            }
            else {
                g = 3;
            }
            var d = (c.length == 1) ? c[0] : (c[c.length - 1].length < g) ? adda(c, c.length - 1) + "." + c[c.length - 1] : adda(c);
            return (d != "") ? d : ((f == true) ? __sco.error("301 price not found") : "0.00");
        }
        else if (a == "" && f == true) {
            __sco.error("301 price not found");
        }
        else { return "0.00"; }
    }

    /** Return the text from a node or empty string **/
    __sco.text = function (elem) {
        return (__sco.type(elem) === "htmlelement") ? __sco.clean((elem.textContent || elem.innerText || elem.data)) : null;
    }

    /****************************************/
    /**             Utilities              **/
    /****************************************/

    /** If index Of does not exist on array's, add a custom implementation **/
    if (!('indexOf' in Array.prototype)) {
        Array.prototype.indexOf = function (find, i /*opt*/) {
            if (i === undefined) i = 0;
            if (i < 0) i += this.length;
            if (i < 0) i = 0;
            for (var n = this.length; i < n; i++)
                if (i in this && this[i] === find)
                    return i;
            return -1;
        };
    }

    /** Empty the given element of its children **/
    __sco.empty = function (elem) {
        if (__sco.isArray(elem)) { __sco.iterateExecute(elem, __sco.empty); return; }
        if (!__sco.isDomNode(elem)) { return false; };

        while (elem.hasChildNodes()) {
            elem.removeChild(elem.lastChild);
        }
    }
    /** Is provided element iterable */
    __sco.isArray = function (elem) {
        var toString = Object.prototype.toString.call(elem);
        return (toString == '[object Array]' || toString == '[object HTMLCollection]');
    }

    /** Is provided object a DOM node **/
    __sco.isDomNode = function (elem) {
        if (elem == null || typeof (elem) != 'object') { return false; }
        return true;
    }

    /** Iterate over an array and execute given func for each element **/
    __sco.iterateExecute = function (elem, func, args) {
        if (typeof (args) == 'undefined') { args = []; }

        if (__sco.isArray(elem)) {
            for (var i = 0; i <= elem.length - 1; i++) {
                func.apply(this, [elem[i]].concat(args));
            }
            return true;
        }
    }
    /** Add a class to a given element **/
    __sco.addClass = function (elem, className) {
        if (__sco.isArray(elem)) { __sco.iterateExecute(elem, __sco.addClass, [className]); return; }
        if (!__sco.isDomNode(elem)) { return false; };

        var classes = elem.getAttribute('class');
        if (classes == null) { classes = ""; }

        if (classes.indexOf(className) == -1) {
            elem.className = classes.length == 0 ? className : " " + className;
        }
    }
    /** Return a new copy **/
    __sco.clone = function (extend) {
        if (__sco.type(extend) === "htmlelement")
            return extend.cloneNode();
        if (__sco.type(extend) === "date")
            return new Date(extend.getTime());
        if (__sco.type(extend) !== "object" && __sco.type(extend) !== "array")
            return extend;
        try {
            var retVal = new extend.constructor();
            __sco.each(extend, function (ix, val) {
                if (!retVal.hasOwnProperty(ix))
                    retVal[ix] = __sco.clone(extend[ix]);
            });
        }
        catch (e) { retVal = extend; }
        finally {
            return retVal;
        }
    }

    /** Remove duplicate items **/
    __sco.dedupe = function (arr) {
        var unique = new Array();
        if (__sco.type(arr) == "object" || __sco.type(arr) == "array" || __sco.type(arr) == "nodelist") {
            __sco.each(arr, function (ix, val) {
                if (!unique.hasOwnProperty(val))
                    unique.push(val);
            });
        }
        return unique;
    }

    /** Loop through each item and execute the given function for each iteration - value of this in the function will be the current item **/
    __sco.each = function (arr, func) {
        if (__sco.noru(arr)) {
            if (__sco.type(arr) === "object") {
                for (var i in arr) {
                    if (Object.prototype.hasOwnProperty.call(arr, i))
                        func.call(arr[i], i, arr[i]);
                }
            }
            else {
                for (var i = 0; i < arr.length; i++) {
                    if (Object.prototype.hasOwnProperty.call(arr, i))
                        func.call(arr[i], i, arr[i]);
                }
            }
        }
        return arr;
    }

    /** Provide a function to check for errors and then insert into the JSON **/
    __sco.error = function (err) {
        var date = new Date().getTime(), stack = "", desc = "", message = "";
        if (__sco.type(err) === "error") {
            stack = err.stack || "", desc = err.description || "", message = err.message || "";
        }
        else {
            message = __sco.type(err) !== "string" ? SCJSON.stringify(err) : err;
        }
        if (err != "") {
            if (__scd.g.length == 0)
                __scd.g.push({
                    s: 100,
                    d: new Date().getTime(),
                    e: new Array()
                });
            __scd.g[0].e.push({
                c: "100",
                d: date,
                t: desc,
                n: message + " : " + stack
            });
        }
        return null;
    }

    /** Copy the first object, then update any common properties to that of the first and add any that are not present in the first that are in the second **/
    __sco.extend = function (from, to, overwrite) {
        var res = __sco.clone(from), obj = __sco.clone(to);
        __sco.each(res, function (ix, val) {
            if (Object.prototype.hasOwnProperty.call(res, ix) && __sco.type(obj[ix]) !== "undefined") {
                if (!!overwrite && __sco.type(res[ix]) == "string" && __sco.type(obj[ix]) == "string")
                    res[ix] = res[ix] == "" && obj[ix] != "" ? obj[ix] : res[ix];
                else
                    res[ix] = obj[ix];
            }
        });
        __sco.each(obj, function (ix, val) {
            if (!Object.prototype.hasOwnProperty.call(res, ix))
                res[ix] = obj[ix];
        });
        return res;
    }

    /** Provide an error handling/setting mechanism **/
    __sco.getdom = function (elem, message) {
        var message = message || "";
        if (__sco.noru(elem)) {
            if (typeof (elem.length) != "undefined") {
                return (elem.length > 0) ? elem : __sco.error(message);
            }
            else {
                return elem;
            }
        }
        else {
            return __sco.error(message);
        }
    }

    /** Return a JS GUID **/
    __sco.guid = function () {
        function r(a) { return a ? Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) : Math.floor(Math.random() * 1000000000000000).toString(16).substr(0, 12); };
        return ((new Date().getTime()).toString(36) + '-' + r(!!1) + '-' + r(!!1) + '-' + r(!!1) + '-' + r(!1)).toString().toUpperCase();
    }

    /** Return a hashed version of the string provided **/
    __sco.hash = function (a) {
        var hash = 0, chr;
        if (__sco.type(a) !== "string") return null;
        for (i = 0; i < a.length; i++) {
            chr = a.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash = hash & hash;
        }
        return hash.toString();
    }

    /** The URL of the current page in lower case **/
    __sco.loc = document.location.href.toLowerCase();

    /** Return a SC compatible machine ID **/
    __sco.mid = function () {
        return new Date().getTime().toString() + Math.floor((1 + Math.random()) * 0x1000000).toString().substr(0, 6);
    }

    //** Provide a customisable event mechanism, action is a function which is called when there has been a change, compare is a function which returns what you want to check (text in an element for example) **/
    __sco.monitor = function () {
        function h() {
            try {
                if (!run) {
                    if (__sco.type(that.startstate) !== "undefined")
                        old = that.startstate;
                    else {
                        old = that.compare.call(window);
                    }
                    run = true;
                    count++;
                    timer = s(h, that.interval);
                }
                else {
                    l(timer);
                    if (old != that.compare.call(window)) {
                        that.action.call(window);
                        old = that.compare.call(window);
                    }
                    count++;
                    if (count < that.max)
                        timer = s(h, that.interval);
                }
            }
            catch (e) {
                __sco.error("207 timer error");
            }
        }
        try {
            var count = 0, s = setTimeout, l = clearTimeout, old = null, run = false, timer, that = this;
            this.startstate = undefined;
            this.max = 300;
            this.stop = function () { l(timer); }
            this.start = function () { (l(timer), count = 0, s(h, that.interval)); }
            this.interval = 2000;
            this.compare = function () { return null; }
            this.action = function () { }
        }
        catch (e) { __sco.error("206 timer error"); }
    }

    /** Return whether or not the value is null or undefined **/
    __sco.noru = function (elem) {
        return elem != null && typeof elem !== "undefined";
    }

    /** Attach the specified function to the event **/
    __sco.on = function (evnt, func, elem) {
        // handle array of elements
        if (__sco.isArray(elem)) {
            for (var i = 0; i <= elem.length - 1; i++) {
                __sco.on(evnt, func, elem[i]);
            }
            return;
        }
        var ev = window.addEventListener, el = arguments.length > 2 && __sco.noru(elem) ? elem : window;
        ev ? el.addEventListener(evnt, func) : el.attachEvent("on" + evnt, func);
    }

    /** Remove the specified function from the event **/
    __sco.off = function (evnt, func, elem) {
        if (__sco.isArray(elem)) {
            for (var i = 0; i <= elem.length - 1; i++) {
                __sco.off(evnt, func, elem[i]);
            }
            return;
        }
        var ev = window.removeEventListener, el = arguments.length > 2 && __sco.noru(elem) ? elem : window;
        ev ? el.removeEventListener(evnt, func) : el.detachEvent("on" + evnt, func);
    }

    /** Remove node from the DOM **/
    __sco.remove = function (elem) {
        if (__sco.isArray(elem)) { __sco.iterateExecute(elem, __sco.remove); return; }
        if (!__sco.isDomNode(elem)) { return false; };

        elem.parentNode.removeChild(elem);
    }

    /** Remove class from given element **/
    __sco.removeClass = function (elem, className) {
        if (__sco.isArray(elem)) { __sco.iterateExecute(elem, __sco.removeClass, [className]); return; }
        if (!__sco.isDomNode(elem)) { return false; };

        elem.className = elem.className.replace(className, '');
    }

    /** Return the argument in array form **/
    __sco.toarray = function (a) {
        var arr = new Array();
        if (__sco.type(a) == "array")
            return a;
        if (__sco.type(a) == "nodelist" && a.length == 0)
            return arr;
        __sco.each(a, function (ix, val) {
            arr.push(val);
        });
        if (arr.length == 0)
            arr.push((__sco.type(a) === "function" ? a.valueOf() : a));
        return arr;
    }

    /** Return a number or false if it cannot be cast into a number **/
    __sco.tonumber = function (num) {
        var t = __sco.type(num);
        if (t == "string" && num == "") { return false; }
        if ((t == "string" || t == "number") && isFinite(Number(num)))
            return Number(num);
        else
            return false;
    }

    /** Try to parse the passed object using JSON.parse, else return object **/
    __sco.tryparse = function (val) {
        // Function to try parsing the current version
        function parse(value) {
            try {
                return SCJSON.parse(value);
            }
            catch (pe1) {
                // If it fails, increment the index - if we still have values to try then run on the next, else return null
                index++;
                return index < vals.length ? parse(vals[index]) : null;
            }
        }
        // Create array of things to try
        var vals = [val, "\"" + val + "\"", "{" + val + "}", "[" + val + "]"], index = 0;

        // Safeguard against a non stringified value getting in, if it's undefined we can't parse that so don't try
        if (__sco.type(val) !== "string")
            return val;
        else
            return parse(val);
    }

    /** Return the type as a string **/
    __sco.type = function (a) {
        // JS 1.8.5 < does not handle null and undefined classes, so protect against this
        if (!__sco.noru(a))
            return String(a);
        var classes = {
            "[object Boolean]": "boolean",
            "[object Number]": "number",
            "[object String]": "string",
            "[object Text]": "htmlelement",
            "[object Function]": "function",
            "[object Array]": "array",
            "[object Date]": "date",
            "[object RegExp]": "regexp",
            "[object Object]": "object",
            "[object Error]": "error",
            "[object Arguments]": "arguments",
            "[object NodeList]": "nodelist",
            "[object HTMLCollection]": "nodelist",
            "[object HTMLDocument]": "htmldoc"
        };
        // Cover for IE8 < not returning class of these
        var ietoString = "";
        try {
            ietoString = a.toString();
        }
        catch (err) { }
        if (ietoString === "[object]") {
            if (typeof a.nodeType === "number" && a.nodeType === 9)
                return "htmldoc";
            else if (typeof a.nodeType === "number" && (typeof a.length === "undefined" || (typeof a.nodeName === "string" && (a.nodeName.toLowerCase() === "select" || a.nodeName.toLowerCase() === "form" || a.nodeName.toLowerCase() === "#text"))))
                return "htmlelement";
            else if (typeof a.item !== "undefined" && typeof a.length === "number")
                return "nodelist";
        }
        if (typeof a === "object" && (typeof a.callee !== "undefined" || typeof a.caller !== "undefined") && typeof a.length === "number")
            return "arguments";
        if (typeof a.nodeType === "number" && (a.nodeType === 1 || a.nodeType === 3))
            return "htmlelement";
        if (typeof a === "object" && typeof a.type === "string" && (typeof a.cancelBubble === "boolean" || typeof a.bubbles === "boolean"))
            return "event";
        return classes[Object.prototype.toString.call(a)] || (Object.prototype.toString.call(a).match(/HTML[\w]*Element/) != null ? "htmlelement" : Object.prototype.toString.call(a).match(/HTML[\w]*Collection/) != null ? "nodelist" : "object");
    }

    /***************************************/
    /**             OnChange              **/
    /***************************************/

    /** Is the passed value valid for the field type **/
    __sco.isvalid = function (a, b) {
        if (__sco.type(a) === "string") {
            if (!!__sco.config.block[b] == true) {
                for (var i = 0; i < __sco.config.block[b].length; i++) {
                    if (__sco.config.block[b][i] == a) {
                        return false;
                        break;
                    }
                }
            }
            switch (b) {
                case "email":
                    return a.indexOf("@") > -1 ? true : false;
                    break;
                case "telephone":
                    var a = a.replace(/[^0-9]/gi, ""), c = a.split(new RegExp(a[0])).length - 1;
                    return (a.length > 5 && c != a.length) ? true : false;
                    break;
                case "mobile":
                    var a = a.replace(/[^0-9]/gi, ""), c = a.split(new RegExp(a[0])).length - 1;
                    return (a.length > 5 && c != a.length) ? true : false;
                    break;
                default:
                    return true;
                    break;
            }
        }
        else {
            return false;
        }
    }

    /** OnChange **/
    __sco.onchange = function (a, b) {
        if (__sco.type(_scs(a)) === "htmlelement") {
            var a = _scs(a),
            e = __sco.attr(a, "disabled"),
            v = __sco.getvt(a);
            if (e) { __sco.attr(a, "disabled", null); }
            if (v !== "") { __sco.updatecustomer(v, b); }
            __sco.on("change", function () {
                try {
                    var v = __sco.getvt(a);
                    if (v != "") {
                        __sco.updatecustomer(v, b);
                        __sco.management.setstatus(200, __sco.management.sendtoapi);
                    }
                }
                catch (e) {
                    e.title = "ONCHANGE";
                    __sco.error(e);
                }
            }, a);
            if (e) { __sco.attr(a, "disabled", "true"); }
        }
    }

    /** Attach onchange onto all of the values in the onchange object **/
    __sco.processonchange = function () {
        for (var a in __sco.config.onchange) {
            for (var b in __sco.config.onchange[a]) {
                if (__sco.config.onchange[a].hasOwnProperty(b)) {
                    __sco.onchange(__sco.config.onchange[a][b], a);
                }
            }
        }
    }

    /** Update values in the customer object **/
    __sco.updatecustomer = function (b, c) {
        if (b != "" && __sco.isvalid(b, c)) {
            if (c == "first" || c == "last") {
                b = b.charAt(0).toUpperCase() + b.slice(1).toLowerCase();
            }
            var o = __scd.c;
            if (c == "optout" && __sco.config.optneg) { b = ((b ? 1 : 0) - 1) * -1; }
            (c == "telephone" || c == "mobile") ? o.p[(c == "telephone" ? "l" : "m")] = b : o[c.charAt(0)] = b;
            __sco.management.interset("__sc", __scd);
        }
    }

    /** Support module, gets support info and returns value indicating whether or not we have a route which we can work **/
    __sco.support.setsupport = function () {

        /** Search function to find the first match in an array **/
        function search(arr, base) {
            var retval = "Unknown";
            __sco.each(arr, function (ix, val) {
                if (base.match(new RegExp(val)) != null && retval == "Unknown")
                    retval = base.match(new RegExp(val))[0];
            });
            return retval;
        }

        // Defaults
        __sco.support.os = "Unknown";
        __sco.support.browser = "Unknown";
        __sco.support.version = "Unknown";

        // Array of browsers
        __sco.support.browsers = ['OPR', 'Chrome', 'CriOS', 'Firefox', 'MSIE', 'Safari', 'Opera', 'KDE', 'Trident'];

        // Array of OS systems
        __sco.support.ossystems = ['Windows', 'iPhone', 'iPad', 'Android', 'Mac', 'Linux', 'Symbian', 'Blackberry', 'CrOS'];

        // Do we have CORS
        __sco.support.cors = (typeof XMLHttpRequest === "function" || typeof XMLHttpRequest === "object") && 'withCredentials' in new XMLHttpRequest();

        // postMessage is supported
        __sco.support.postmessage = 'postMessage' in window;

        // Can we set cookies
        __sco.support.cookies = __sco.storage.cookies();

        // Get the useragent string
        __sco.support.useragent = navigator.userAgent;

        // Get the document protocol
        __sco.support.protocol = document.location.protocol;

        // Do we need to use postMessage
        __sco.support.useprovider = __sco.support.postmessage;

        // Are we using the provider for storage
        __sco.support.storeprovider = __sco.support.postmessage;

        // Do we have storage in the provider, defualt to not
        __sco.support.ps = false;

        // Returns whether or not we are dealing with early IE
        __sco.support.earlyie = navigator.userAgent.match(/msie(\s+)[5-7]/i) != null;

        // Can we, or are we falling back to traditional capture
        __sco.support.traditional = false;

        // Collect the screen information
        __sco.support.screeninfo = screen.availHeight + '-' + screen.availWidth + '-' + screen.colorDepth + '-' + screen.height + '-' + screen.width;

        // Returns whether or not the browser is mobile/tablet or desktop
        __sco.support.mobile = navigator.userAgent.match(/android|blackberry|symbian|iphone|ipad|mobi|tablet|opera\s+mini/i) != null;

        // Returns whether or not this is a touch screen device
        __sco.support.touchscreen = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch || navigator.msMaxTouchPoints > 0 ? true : false;

        // localStorage is supported, catch browsers throwing errors when you touch it
        try {
            __sco.support.localstorage = typeof localStorage !== "undefined" && __sco.type(localStorage) === "object" && __sco.type(localStorage.setItem) !== "undefined";
        }
        catch (e) {
            __sco.support.localstorage = false;
        }

        try {

            // Get the OS 
            __sco.support.os = search(__sco.support.ossystems, navigator.userAgent);

            // Get the browser type
            __sco.support.browser = search(__sco.support.browsers, navigator.userAgent);

            // Get the browser version
            __sco.support.version = (function () {
                var uav = navigator.userAgent.match(/version\/(\d+)/i), ua = navigator.userAgent.match(new RegExp(__sco.support.browser + "\\s*\\d+|" + __sco.support.browser + "\\/\\s*\\d+", "i")), newie = navigator.userAgent.match(/\bTrident\/\d+.*\s+rv:(\d+)/);
                return newie != null ? newie[1] : uav != null ? uav[1] : ua ? ua[0].replace(/[\D]/g, "") : "Unknown";
            }());

            if (__sco.support.browser == "OPR")
                __sco.support.browser = "Opera";
            if (__sco.support.browser == "Trident")
                __sco.support.browser = "MSIE";
        }
        catch (e) {
            // Just in the event something goes wrong on any of these
        }

        // Return a value indicating whether or not we have a route with which we can work. Presume that if the have postmessage we have some sort of storage within
        return __sco.support.postmessage || ((__sco.config.v2onload != "" || !__sco.config.v2) && __sco.config.fallbackallowed);
    }

    /** Update the JSON doc with the support meta data **/
    __sco.support.updatedoc = function () {
        with (__sco.support) {
            __scd.m.b = browser;
            __scd.m.xsr = cors;
            __scd.m.pm = postmessage;
            __scd.m.c = cookies;
            __scd.m.l = localstorage;
            __scd.m.o = os;
            __scd.m.p = protocol;
            __scd.m.v = version;
            __scd.m.ua = useragent;
            __scd.m.m = mobile;
            __scd.m.t = touchscreen;
            __scd.m.si = screeninfo;
            __scd.m.ps = ps;
        }
    }

    /** Set the iframe up for receiving data, and listener on the parent for post backs **/
    __sco.provider = function (host, id, callback, callbackargs) {

        function callprovider(func, args, ticket) {
            _scs("#" + that.id).contentWindow.postMessage(SCJSON.stringify({ 'func': func, 'args': args, 'guid': [__sco.config.guid, __sco.config.v1guid], 'ticket': ticket }), that.host.match(__sco.config.providerregex)[0]);
        }

        /** Provide a function for setting data on the iframe **/
        this.set = function (name, data, ticket) {
            var tmp = [name, data];
            callprovider('set', tmp, ticket);
        }

        /** Provide a function for getting data back from the iframe **/
        this.get = function (name, failed, ticket) {
            var tmp = [name, failed];
            callprovider('get', tmp, ticket);
        }

        /** Provide a function to remove data from the iframe if necessary **/
        this.remove = function (name, ticket) {
            var tmp = [name];
            callprovider('remove', tmp, ticket);
        }

        /** Provide a function to send data from the iframe to the given endpoint **/
        this.send = function (method, endpoint, data, ticket, headers, timeout) {
            var tmp = [method, endpoint, data, null, headers, timeout];
            callprovider('send', tmp, ticket);
        }

        /** Provide a function to destroy this provider **/
        this.destroy = function () {
            if (_scs("#sc_div_postmessage_parent") && _scs("#" + that.id))
                _scs("#sc_div_postmessage_parent").removeChild(_scs("#" + that.id));
        }

        /** Private function to listen for the frame being ready, if callback supplied it is called **/
        function action(post) {
            if (post.origin == that.host.match(__sco.config.providerregex)[0]) {
                if (post.data == "sc_ready") {
                    that.ready = true;
                    __sco.support.ps = true;
                    __sco.off("message", action);
                    if (__sco.type(__sco.management.listening) == "undefined") {
                        __sco.management.listening = true;
                        __sco.on("message", __sco.management.react);
                    }
                }
                else if (post.data == "sc_not_available") {
                    // Provider has loaded but has no storage capability, if we can use client cookies then do so otherwise we cannot run
                    __sco.off("message", action);
                    // If we have no storage in the provider, try to fallback if allowed, otherwise call no support not callback to stop script execution
                    if (__sco.config.fallbackallowed) {
                        that.ready = true;
                        __sco.support.ps = false;
                        __sco.support.traditional = true;
                        __sco.config.triggers = ['load'];
                        __sco.config.translatev1 = true;
                        __sco.config.v1api = __sco.config.v1api.replace("/lite/impression.ashx", "/capture.aspx");
                        __sco.config.v1completion = __sco.config.v1completion.replace("/lite/impression.ashx", "/pixelcapture.aspx");
                    }
                    else {
                        // If we have no storage in the provider, call no support not callback to stop script execution
                        __sco.management.nosupport.call(window, true);
                    }
                }
                // If v1 and v2 providers and both loaded then run
                if (__sco.type(callback) === "function") {
                    if (__sco.config.v1 && __sco.config.v2) {
                        if (__sco.management.listener.ready && __sco.management.v1listener.ready)
                            callback.apply(window, callbackargs || []);
                    }
                    else
                        callback.apply(window, callbackargs || []);
                }
            }
        }

        var that = this;

        // Initialise the tickets array if it has not been created - done to handle callbacks
        __sco.tickets = __sco.type(__sco.tickets) === "array" ? __sco.tickets : new Array();

        // Create new iframe if needed on instantiation
        if (!_scs("#" + id)) {
            // Only create it the first time, any subsequent frames go inside this parent **/
            if (!_scs("#sc_div_postmessage_parent")) {
                var parent = document.createElement("div");
                parent.setAttribute("id", "sc_div_postmessage_parent");
                _scs("body")[0].appendChild(parent);
            }

            var ifr = document.createElement("iframe");
            ifr.setAttribute("src", host);
            ifr.setAttribute("target", "_self");
            ifr.setAttribute("id", id);
            ifr.style.display = "none";
            ifr.style.height = "0px";
            ifr.style.width = "0px";

            _scs("#sc_div_postmessage_parent").appendChild(ifr);

            that.id = id;
            that.host = host;
            that.ready = false;     // Indicates the provider has loaded

            __sco.on("message", action);
        }
        else {
            that.id = id;
            that.host = host;
            that.ready = true;     // This is a re-instantiation of an existing provider, so it's already ... ready
        }
    }

    /** Decodes a string back to it's raw form **/
    __sco.storage.decode = function (a) {
        try { return unescape(a); } catch (ee) { return a; }
    }

    /** Returns boolean value indicating whether or not cookies are available **/
    __sco.storage.cookies = function () {
        var cookiesAvailable = false;
        try {
            // Don't use set for this, if there are already max cookies set then test will cause 413
            document.cookie = "sc_test=testvalue" + ";expires=" + __sco.storage.sd(1) + ";path=/";
            if (__sco.storage.get("sc_test"))
                cookiesAvailable = true;
        }
        catch (ce) { }
        finally {
            __sco.storage.remove("sc_test");
            return cookiesAvailable;
        }
    }

    /** Deletes a cookie **/
    __sco.storage.remove = function (a) {
        // Check if we have an exact name or split over multiple cookies
        __sco.each(document.cookie.split(";"), function (ix, val) {
            var c = __sco.clean(val), regex = "^" + a + "__(\\d+)\\s*(?=\\=)|^" + a + "(?=\\s*\\=)", m = c.match(new RegExp(regex));
            if (m != null)
                __sco.storage.set(m[0], "", -1);
        });
        return true;
    }

    /** Gets the specified element name **/
    __sco.storage.get = function (a, b) {
        var tmp = new Array(), res = "", regex = "^" + a + "__(\\d+)\\s*(?=\\=)|^" + a + "(?=\\s*\\=)";

        function sort(s) {
            return s.sort(function (a, b) { if (__sco.tonumber(a[1]) < __sco.tonumber(b[1])) return -1; if (__sco.tonumber(b[1]) < __sco.tonumber(a[1])) return 1; return 0; });
        }

        function join(arr) {
            var r = "";
            __sco.each(arr, function (ix, val) {
                r += val[0];
            });
            return r;
        }

        try {
            __sco.each(document.cookie.split(";"), function (ix, val) {
                var c = __sco.clean(val), m = c.match(new RegExp(regex));
                if (m != null)
                    tmp.push([c.substr(c.indexOf("=") + 1), m[1] || 0]);
            });
            res = join(sort(tmp));
        }
        catch (ce1) { }
        if (res != '') {
            var retval = __sco.tryparse(__sco.storage.decode(res));
            return retval != null ? retval : arguments.length > 1 ? b : false;
        }
        else {
            return arguments.length > 1 ? b : false;
        }
    }

    /** Writes a cookie with the specified name, value and number of days for expiry (0 means session) 
      * Data will be split over multiple cookies if it exceeds the max length of 3800
    **/
    __sco.storage.set = function (n, v, d) {
        function wrc(tn, tv, td) {
            document.cookie = tn + "=" + tv + (td == 0 ? "" : ";expires=" + __sco.storage.sd(td)) + ";path=/";
        }
        // Catch Firefox private browsing mode error when you touch cookies
        try {
            var vv = escape(SCJSON.stringify(v)), d = arguments.length > 2 && typeof arguments[2] !== "undefined" ? d : __sco.config.cookieexpiry, max = 7168;
            if (__sco.type(d) === "number" && d > -1)
                __sco.storage.remove(n);
            // If what we are setting is not going to exceed the size limit, set it
            if ((max - document.cookie.length * 2) > vv.length) {
                if (vv.length > 1800) {
                    var x = Math.ceil(vv.length / 1800);
                    for (var i = 0; i < x; i++) {
                        wrc(n + "__" + i.toString(), vv.substring(0, 1800), d);
                        vv = vv.substr(1800);
                    }
                }
                else {
                    wrc(n, vv, d);
                }
            }
        }
        catch (ce) { }
    }

    /** Returns a date in UTC form d days in the future **/
    __sco.storage.sd = function (d) {
        return new Date(new Date().setDate(new Date().getDate() + (!isNaN(d) ? Number(d) : 30))).toUTCString();
    }

    /** 
    * Provider sender, in theory never needs cors because it's the same domain. 
    * iframe post is there for cases where we might have the provider but no XMLHttpRequest 
    * This can handle both get and POST requests
    **/
    __sco.sender.send = function (method, endpoint, data, callback, headers, timeout) {

        function timeouthandler(resp) {
            var robj = {};
            robj.target = {};
            robj.type = "timeout";
            robj.target.responseText = null;
            robj.target.status = resp.status;
            robj.target.statusText = resp.statusText;
            if (__sco.type(callback) === "function")
                callback.call(window, robj);
        }

        /** Provide a function for cors GET and POST requests **/
        function xmlpost() {
            var x = new XMLHttpRequest(), finished = false;
            x.open(method, endpoint + (method == "GET" ? (__sco.type(data) == "string" ? data : JSON.stringify(data)) : ""), true);
            __sco.each(headers, function (ix, val) {
                if (__sco.type(val) == "object" && __sco.type(val.key) == "string" && __sco.type(val.value) == "string")
                    x.setRequestHeader(val.key, val.value);
            });
            if (__sco.type(timeout) == "number" && timeout > 0) {
                if ("ontimeout" in x) {
                    x.timeout = __sco.type(timeout) != "number" ? 0 : timeout;
                    x.ontimeout = timeouthandler;
                } else {
                    // fallback
                    x.onabort = timeouthandler;
                    setTimeout(function () {
                        x.abort();
                    }, timeout + 10); // Add 10ms to allow for request setup and connection start
                }
            }
            if (__sco.type(callback) === "function") {
                if ('onload' in x)
                    x.onload = callback;
                else
                    x.onreadystatechange = function (e) {
                        if (!finished && x.readyState == 4) {
                            finished = true;
                            callback.call(window, e);
                        }
                    }
            }
            x.send((method == "GET" || !__sco.noru(data) ? "" : __sco.type(data) !== "string" ? SCJSON.stringify(data) : data));
        }

        /** Provide an injected iframe + form function for GET and POST requests **/
        function iframepost() {
            try {
                var container = document.createElement("div");
                container.setAttribute("id", "sc_if_post");
                _scs("body")[0].appendChild(container);

                var isIE = __sco.support.earlyie;
                var i = isIE ? document.createElement("<iframe name='salecycle>") : document.createElement("iframe");
                if (!isIE) { i.name = "salecycle"; }
                i.style.display = "none";
                container.appendChild(i);
                var doc = i.document || i.contentDocument;

                var form = isIE ? doc.createElement("<form name='scPost'>") : doc.createElement("form");
                form.target = "salecycle";
                if (!isIE) { form.name = "scPost"; }
                form.setAttribute("method", method);
                form.setAttribute("action", endpoint + (method == "GET" && __sco.noru(data) ? (__sco.type(data) == "string" ? data : SCJSON.stringify(data)) : ""));

                if (method == "POST") {
                    form.setAttribute("encoding", "multipart/form-data");

                    if (__sco.noru(data)) {
                        if (__sco.type(data) != "string") {
                            var input = isIE ? doc.createElement("<input name=data>") : doc.createElement("input");
                            input.type = "hidden";
                            if (!isIE) { input.name = "data"; }
                            input.value = SCJSON.stringify(data);
                            form.appendChild(input);
                        }
                        else {
                            __sco.each(data.split("&"), function (ix, val) {
                                var input = isIE ? doc.createElement("<input name=" + val.split("=")[0] + ">") : doc.createElement("input");
                                input.type = "hidden";
                                if (!isIE) { input.name = val.split("=")[0]; }
                                input.value = val.split("=")[1];
                                form.appendChild(input);
                            });
                        }
                    }
                }

                doc.getElementsByTagName("body")[0].appendChild(form);
                form.submit();
                setTimeout(tearDown, 5000);
            }
            catch (e) { }
        }

        function tearDown() {
            if (_scs("#sc_if_post") != null) {
                _scs("body")[0].removeChild(_scs("#sc_if_post"));
            }
        }

        /** Check if we have cors (XMLHttpRequest with credentials), if not fall back to iframe solution **/
        __sco.support.cors ? xmlpost() : iframepost();
    }

    /** V2 to V1 translation module **/

    /** Pick any non standard fields and format them into a string **/
    __sco.fields = function (obj, exclude) {
        var res = new Array();
        __sco.each(obj, function (ix, val) {
            if (exclude.indexOf(ix) < 0)
                res.push(ix + "^" + val);
        });
        return res.join("~");
    }

    /** For each item in the items collection, add the field and a | **/
    __sco.format = function (items, field) {
        var str = "";
        __sco.each(items, function (ix, item) {
            if (typeof item[field] !== "undefined")
                str += (item[field] + "|");
            else
                str += "|";
        });
        return str;
    }

    /** Translate V2 structure to V1 for sending **/
    __sco.translatetov1 = function (obj) {
        try {
            var thisObj = __sco.escs(__sco.clone(obj)), status = thisObj.t.toString().charAt(0);
            if (status == "3") {
                return 'c=' + thisObj.i1 + '&cc=&ca=0&e=&sfs=ordernum^' + (typeof thisObj.s.ordernumber == "string" ? thisObj.s.ordernumber : "") + '&scs=' + __sco.support.screeninfo + '&b=' + thisObj.s.i + '&ua=' + __sco.hash(navigator.userAgent);
            }
            else {
                var ifs = new Array(), sfs = __sco.fields(thisObj.s, __sco.config.sessionfields);
                __sco.each(__scd.b.i, function (ix, val) {
                    ifs.push(__sco.fields(val, __sco.config.itemfields));
                });
                return 'c=' + thisObj.i1 + '&b=' + thisObj.s.i + '&mid=' + thisObj.s.m + '&scs=' + __sco.support.screeninfo + (__sco.config.geoip ? '&geo=1' : '') + '&n=' + thisObj.c.f + '|' + thisObj.c.l + '|' + thisObj.c.s + '|&t=' + thisObj.c.p.l + '&e=' + thisObj.c.e + '&o=' + thisObj.c.o + '&w=' + thisObj.u + '&st=' + __sco.config.sessiontime + '&ua=' + __sco.hash(navigator.userAgent) + '&bs=1&ctd=&cc=' + (thisObj.cc ? '1' : '0') + '&ca=0&fc=0' + '&y=' + __scd.b.c + '&p=' + __sco.format(thisObj.b.i, "i") + '&i=' + __sco.format(thisObj.b.i, "n") + '&u=' + __sco.format(thisObj.b.i, "u") + '&v1=' + __sco.format(thisObj.b.i, "v") + '&v2=' + thisObj.b.v + '&q1=' + __sco.format(thisObj.b.i, "q") + '&q2=' + __sco.format(thisObj.b.i, "na") + '&q3=' + __sco.format(thisObj.b.i, "nc") + '&d1=' + __sco.format(thisObj.b.i, ["fd"]) + '&d2=' + __sco.format(thisObj.b.i, "td") + '&s=' + status + '&er=' + __sco.errorstov1() + '&cu1=' + __sco.format(thisObj.b.i, "f1") + '&cu2=' + __sco.format(thisObj.b.i, "f2") + '&ifs=' + (ifs.length == 0 ? new Array(__scd.b.i.length).join("|") : ifs.join("|")) + '&sfs=' + sfs;
            }
        }
        catch (e) {
            return 'c=' + __sco.config.doc.i1 + '&b=&mid=&scs=' + __sco.support.screeninfo + '&n=||&t=&e=&o=&w=&st=' + __sco.config.sessiontime + '&ua=' + __sco.hash(navigator.userAgent) + '&bs=1&ctd=&cc=&ca=0&fc=0&y=&p=&i=&u=&v1=&v2=&q1=&q2=&q3=&d1=&d2=&s=&er=' + (e.description || "") + "_" + (e.message || "") + "_" + (e.stack || "") + "_" + navigator.userAgent + '&cu1=&cu2=&ifs=&sfs=';
        }
    }

    /** Validate the values ready for the V1 request **/
    __sco.escs = function (a) {
        if (a == null || typeof a == "undefined") {
            return "";
        }
        else if (__sco.type(a) === "date") {
            return a.toUTCString();
        }
        else if (typeof a == "object") {
            __sco.each(a, function (ix, val) {
                a[ix] = __sco.escs(val);
            });
            return a;
        }
        else if (typeof a.toString != "undefined") {
            return a.toString().replace(/&/g, '[sc_amp]').replace(/\?/g, '[sc_qm]').replace(/\+/g, '[sc_pl]').replace(/>/g, '[sc_bc]').replace(/</g, '[sc_bo]').replace(/=/g, '[sc_eq]').replace(/#/g, '[sc_h]');
        }
    }

    /** Translate error codes for V1 **/
    __sco.errorstov1 = function () {
        var errorString = "", errors = __scd.g;
        if (errors.length > 0) {
            __sco.each(errors, function (ix, val) {
                errorString += val.e[ix].d + "_" + val.e[ix].t + "_" + val.e[ix].n + "_END";
            });
        }
        return errorString;
    }

    /** Translate no support errors or generic runtime errors to v1 **/
    __sco.v1runtime = function (err) {
        var str = "";
        if (__sco.type(err) == "error") {
            str = (err.message || "") + "__" + (err.description || "") + "__" + (err.stack || "") + "__" + (err.title || "") + "__";
            try {
                if (__sco.support && __sco.type(__sco.support.cors) !== "undefined") {
                    __sco.each(__sco.support, function (ix, val) {
                        if (__sco.type(val) !== "function" && __sco.type(val) !== "array")
                            str += (ix + ":" + val) + "__";
                    });
                }
            }
            catch (ie) { }
        }
        else if (__sco.type(err) == "string")
            str = err;
        return 'c=' + __sco.config.doc.i1 + '&b=&mid=&scs=' + screen.availHeight + '-' + screen.availWidth + '-' + screen.colorDepth + '-' + screen.height + '-' + screen.width + '&n=||&t=&e=&o=&w=&st=1800&ua=' + __sco.hash(navigator.userAgent) + '&bs=1&ctd=&cc=&ca=0&fc=0&y=&p=&i=&u=&v1=&v2=&q1=&q2=&q3=&d1=&d2=&s=1&er=' + str + '&cu1=&cu2=&ifs=&sfs=';
    }

    "object" != typeof SCJSON && (SCJSON = {}), function () { "use strict"; function f(a) { return 10 > a ? "0" + a : a; } function quote(a) { return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function (a) { var b = meta[a]; return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + a + '"' } function str(a, b) { var c, d, e, f, h, g = gap, i = b[a]; switch ("function" == typeof rep && (i = rep.call(b, a, i)), typeof i) { case "string": return quote(i); case "number": return isFinite(i) ? String(i) : "null"; case "boolean": case "null": return String(i); case "object": if (!i) return "null"; if (gap += indent, h = [], "[object Array]" === Object.prototype.toString.apply(i)) { for (f = i.length, c = 0; f > c; c += 1) h[c] = str(c, i) || "null"; return e = 0 === h.length ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g, e } if (rep && "object" == typeof rep) for (f = rep.length, c = 0; f > c; c += 1) "string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e)); else for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e)); return e = 0 === h.length ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g, e } } "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () { return this.valueOf() }); var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, rep; "function" != typeof SCJSON.stringify && (SCJSON.stringify = function (a, b, c) { var d; if (gap = "", indent = "", "number" == typeof c) for (d = 0; c > d; d += 1) indent += " "; else "string" == typeof c && (indent = c); if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length)) throw new Error("JSON.stringify"); return str("", { "": a }) }), "function" != typeof SCJSON.parse && (SCJSON.parse = function (text, reviver) { function walk(a, b) { var c, d, e = a[b]; if (e && "object" == typeof e) for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]); return reviver.call(a, b, e); } var j; if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({ "": j }, "") : j; throw new SyntaxError("JSON.parse"); }); }();

    /** Start the script **/
    __sco.management.contentLoaded(window, __sco.management.main);


    ///OSR START///


    try {

        // AOP.js (meld) library
        /* MIT License (c) copyright 2011-2013 original author or authors */
        (function () { function f(a, b, c) { var d, e; if (3 > arguments.length) { var l; l = a.name || "_"; d = {}; d[l] = a; p(d, l, b); return d[l] } if (v(b)) e = w(a, b, c); else if (d = typeof b, "string" === d) "function" === typeof a[b] && (e = p(a, b, c)); else if ("function" === d) e = w(a, b(a), c); else { d = []; for (l in a) "function" == typeof a[l] && b.test(l) && d.push(p(a, l, c)); e = x(d) } return e } function q(a, b) { var c, d, e; this.target = a; this.func = b; this.aspects = {}; c = this.orig = a[b]; d = this; e = this.advised = function () { function a(b) { var c = h(b); d._callSimpleAdvice("on", g, b); return c } var g, m, f, h, k; this instanceof e ? (g = y(c.prototype), h = function (a) { var b = g; try { s(b, "constructor", { value: c, enumerable: !1 }) } catch (d) { } c.apply(b, a); return b }) : (g = this, h = function (a) { return c.apply(g, a) }); f = t.call(arguments); k = "afterReturning"; m = z({ target: g, method: b, args: f }); try { d._callSimpleAdvice("before", g, f); try { m.result = d._callAroundAdvice(g, b, f, a) } catch (A) { m.result = m.exception = A, k = "afterThrowing" } f = [m.result]; d._callSimpleAdvice(k, g, f); d._callSimpleAdvice("after", g, f); if (m.exception) throw m.exception; return m.result } finally { n = r.pop() } }; s(e, "_advisor", { value: d, configurable: !0 }) } function p(a, b, c) { return (a = q.get(a, b)) && a.add(c) } function w(a, b, c) { var d, e, f; d = []; for (f = 0; e = b[f++];) (e = p(a, e, c)) && d.push(e); return x(d) } function x(a) { return { remove: function () { for (var b = a.length - 1; 0 <= b; --b) a[b].remove() } } } function k(a) { return function (b, c, d) { var e = {}; if (2 === arguments.length) return e[a] = c, f(b, e); e[a] = d; return f(b, c, e) } } function B(a, b) { var c, d, e; for (c in h) if (d = b[c]) (e = a[c]) || (a[c] = e = []), e.push({ aspect: b, advice: d }) } function z(a) { r.push(n); return n = a } f.before = k("before"); f.around = k("around"); f.on = k("on"); f.afterReturning = k("afterReturning"); f.afterThrowing = k("afterThrowing"); f.after = k("after"); f.joinpoint = function () { return n }; f.add = function () { return f.apply(null, arguments) }; q.prototype = { _callSimpleAdvice: function (a, b, c) { var d; this.aspects[a] && (d = h[a], d(this.aspects[a], function (a) { (a = a.advice) && a.apply(b, c) })) }, _callAroundAdvice: function (a, b, c, d) { function e(a, b) { return 0 > a ? d(b) : f(g[a].advice, a, b) } function f(c, d, g) { function l(a) { h++; return e(d - 1, a) } var h, k; h = 0; k = z({ target: a, method: b, args: g, proceed: function () { return l(0 < arguments.length ? t.call(arguments) : g) }, proceedApply: function (a) { return l(a || g) }, proceedCount: function () { return h } }); try { return c.call(a, k) } finally { n = r.pop() } } var g; g = this.aspects.around; return e((g ? g.length : 0) - 1, c) }, add: function (a) { var b, c; b = this; c = b.aspects; B(c, a); return { remove: function () { var d, e, f; f = 0; for (d in h) if (e = c[d]) { f += e.length; for (var g = e.length - 1; 0 <= g; --g) if (e[g].aspect === a) { e.splice(g, 1); --f; break } } f || b.remove() } } }, remove: function () { delete this.advised._advisor; this.target[this.func] = this.orig } }; q.get = function (a, b) { if (b in a) { var c; c = a[b]; if ("function" !== typeof c) throw Error("Advice can only be applied to functions: " + b); c = c._advisor; c || (c = new q(a, b), a[b] = c.advised); return c } }; var n, r, h, t, v, s, y; r = []; t = Array.prototype.slice; v = Array.isArray || function (a) { return "[object Array]" == Object.prototype.toString.call(a) }; var u; a: { try { u = "x" in Object.defineProperty({}, "x", {}); break a } catch (C) { } u = void 0 } s = u ? Object.defineProperty : function (a, b, c) { a[b] = c.value }; y = Object.create || function () { function a() { } return function (b) { a.prototype = b; b = new a; a.prototype = null; return b } }(); h = { before: function (a, b) { for (var c = a.length - 1; 0 <= c; --c) b(a[c]) }, around: !1 }; h.on = h.afterReturning = h.afterThrowing = h.after = function (a, b) { for (var c = 0, d = a.length; c < d; c++) b(a[c]) }; window.meld = f })();

        __sco.osr.clientConfigModule = function () {

            /** Example #2 - Add some extra pre-show checks, page related */
            meld.around(__sco.osr, "preShowChecks", function (methodCall) {

                // if we've already failed preShowChecks, just return false anyway
                result = methodCall.proceed();
                if (result == false) { return result; }

                // require that an element be present on the page
                if (!!(_scs('div.fsrFloatingMid') == null)) {
                    return true;
                }

                return false;
            });
        };


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
            'templateId': 1147,
            'enabled': true,
            'clientConfigModule': false,
            'initParameter': null, // parameter to be present in the query string before OSR will be eanbled, i.e. test=salecycle (without ?&). null to disable this feature.
            'validPages': ['mens/sunglasses/merch-category/m02', 'womens/sunglasses/category/w02', 'mens/apparel/category/m04', 'womens/apparel/category/w04', 'mens/apparel-accessories/category/m05', 'womens/apparel-accessories/category/w05', 'mens/footwear/category/m07', 'womens/bags-and-backpacks/category/w06', 'mens/goggles/category/m03', 'womens/goggles/category/w03', 'custom/category/c'],
            'requestHeaders': [
                { "key": "Content-Type", "value": "application/json" },
                { "key": "Accept", "value": "application/json" }
            ],
            'selectors': {
                'liteboxContainer': '#SC-Wrapper',
                'notificationContainer': null,
                'emailContainer': '#SC-InputContainer',
                'emailCaptureField': '.SC-Input:first',
                'productContainer': null,
                'productTemplate': null,
                'trendTemplate': null,
                'trendContainer': null,
                'emailBasketConfirmationTemplate': null,
                'closeButton': '#SC-Close',
                'continueButton': null,
                'saveButton': '#SC-Cta',
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
                    __sco.osr.triggerType = "exitIntent";
                    __sco.osr.show();
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
                __sco.management.intersend('POST', endpoint, SCJSON.stringify(basketRequest), function (apiResponse) {

                    apiResponse = apiResponse.target.responseText;
                    if (typeof (apiResponse) != 'object') { apiResponse = SCJSON.parse(apiResponse); }

                    // sanity checks on data
                    if (__sco.osr.config.showRecommendations == true && __sco.osr.canShowRecommendations(apiResponse.Recommendations) == false) { return; }
                    if (__sco.osr.config.showBasketTrends == true && __sco.osr.canShowTrends(apiResponse.Trends) == false) { return; }

                    __sco.osr._render({
                        'recommendations': apiResponse.Recommendations != null ? apiResponse.Recommendations : [],
                        'trends': apiResponse.Trends != null ? apiResponse.Trends : []
                    });

                }, __sco.osr.config.requestHeaders);
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


