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

    'guid': '58cfa969-c3dd-469d-8fe5-f3dd364cc821', // V2 guid
    'v1guid': '58cfa969-c3dd-469d-8fe5-f3dd364cc821', // V1 guid, the api key for the client

    'triggers': ['exit', 'timeout'], // Set the triggers to use, use either load or exit and timeout together

    'status1': ["/cart"], // Strings to be set in lower case, will be compared against the URL of the current page. Functions will be executed and must return either true, false or a number to use as the status
    'status2': ["STATUSTWO"],
    'status3': ["/confirmation"],
    'status4': ["STATUSFOUR"],
    'exclude': ["RUN ON EVERYTHING"],

    'onchange': {
        'email': ["#email_address", "#login_name"],
        'first': ["#first_name"],
        'last': ["#last_name"],
        'telephone': [],
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

    'requesttimeout': 0, // Request Timeout, the time to allow a request to a remote server to load before timing out
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
    'itemfields': ['n', 'i', 'q', 'v', 'fd', 'td', 'u', 'f1', 'f2'], // The standard fields within an item which are not to be translated

    'doc': {
        'sv': '1.24',                            // Script Version
        'v': '1.0',                              // schema version
        'd': new Date().getTime().toString(),    // utc date
        'r': 100,                                // The request type   
        'u': document.location.href,                  // page URL/title
        't': 0,                                 // type integer of the request (100,200,300...)
        'o': '',                                 // order ID
        'cc': true,                              // Claim conversion flag
        's': {                                   // * session object
            'i': '',                             // session ID
            'm': ''                              // machine ID
        },
        'i': 1183,                                 // client ID
        'i1': 18235,                                // V1 client ID
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
        'i': 1183,
        'i1': 18235,
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
    try {
        __scd.b.c = "USD";

        /*__scd.s.example = "";*/ // Example session field
    }
    catch (be2) {
        be2.description = "201 " + (be2.description || "");
        __sco.error(be2);
    }
    try {
        /* Set rows here **/
        var subtotal = 0;
        __sco.each(_scs('.fieldsetProduct', '1 rows'), function (ix, val) {
            var src = "(http://|https://)", href = "(http://|https://)";
            // Set basket values here
            var prodvalue = _scs([val, "span.blueSteel:first"], '5 itemprice', ['text', 'pricecurr']);
            var quantity = __sco.getvt(_scs([val, "#product_quantity"], '4 item quantity'));
            subtotal = subtotal + ((prodvalue *1) * (quantity * 1));
            __scd.b.i.push({
                'n': _scs([val, 'div:first a:nth-child(1)'], '2 item name', ['text']), //name
                'i': __sco.attr(_scs([val, 'div:first a:last'], '3 item id'), "data-product-id"), //item ID
                'q': quantity,
                'v': prodvalue,
                'f1': __sco.inbetween('/product','',__sco.attr(_scs([val, 'div:first a:first'], '6 item link'), "href"),'fl'), //item link
                'u': __sco.attr(_scs([val, 'div:first img:first'], '7 image'), "src") //image
            });
        });
        __scd.b.v = subtotal.toFixed(2);
        __scd.s.swidth = __scd.b.i.length == 1 ? "222" : (__scd.b.i.length == 2 ? "125" : "22");

    }
    catch (be1) {
        be1.description = "101 " + (be1.description || "");
        __sco.error(be1);
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
        // Get the order number and so on here
        // The order number must be in the session field __scd.s.ordernumber
        /* 
            DO NOT SET ERROR MESSAGES IN THE SELECTOR FOR ORDER NUMBERS
        */
        //__scd.s.ordernumber = "ordernumber";
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
    function localStorageAvailable() {
        try {
            localStorage.setItem("sc_test", "testvalue");
            if (localStorage.getItem("sc_test")) {
                localStorage.removeItem("sc_test");
                return true;
            }
            return false;
        }
        catch (err) {
            return false;
        }
    }

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
                    // If we're in Safari, and it's version 6 or greater, or we don't have local storage we need to send this translated
                    var nav = navigator.userAgent, version = nav.match(/version\/(\d+)/i);
                    if (nav.match(/safari/i) != null && nav.match(/chrome/i) == null && nav.match(/OPR/) == null) {
                        if ((version != null && version.length > 1 && __sco.tonumber(version[1]) != false && __sco.tonumber(version[1]) >= 6) || !(localStorageAvailable())) {
                            __sco.config.v1api = __sco.config.v1api.replace("/lite/impression.ashx", "/capture.aspx");
                            __sco.config.v1completion = __sco.config.v1completion.replace("/lite/impression.ashx", "/pixelcapture.aspx");
                        }
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

__sco.management.prerun = function () { try { var a = !1, b = !1, c = !1; __sco.config.geoip && (__scd.s.geo = !0); if (0 < (a = __sco.management.isstatus(__sco.config.status3)) || __sco.management.isstatus(__sco.config.status3)) b = !0, __sco.scraper.statusthree(), __sco.management.itemtypes(), (a = __sco.tonumber(a)) && 300 <= a && 400 > a ? __sco.management.setstatus(a, __sco.management.run) : __sco.management.setstatus(300, __sco.management.run); else if (0 < (a = __sco.management.killit()) || __sco.management.killit()) b = !0, __sco.scraper.statusfour(), (a = __sco.tonumber(a)) && 400 <= a && 500 > a ? __sco.management.setstatus(a, __sco.management.run) : __sco.management.setstatus(400, __sco.management.run); else if (0 < (a = __sco.management.isstatus(__sco.config.status1)) || __sco.management.isstatus(__sco.config.status1)) { b = !0; __sco.lastbasket = __sco.clone(__scd.b); customer = ""; __scd.b = __sco.clone(__sco.config.doc.b); __sco.scraper.statusone(); 0 == __sco.lastbasket.i.length && 0 == __scd.b.i.length && 200 > __scd.t ? c = !0 : 0 < __sco.lastbasket.i.length && 0 == __scd.b.i.length && (__scd.b = __sco.clone(__sco.lastbasket)); __sco.management.itemtypes(); if (__sco.config.migrationcollect && __sco.config.persistcustomer && isFinite((new Date(__sco.config.startdate)).getTime()) && (new Date).getTime() - new Date(__sco.config.startdate) < 864E5 * __sco.config.daystorun && (customer = __sco.storage.get("__sc")) && "string" == __sco.type(customer)) { __scd.c.e = "" == __scd.c.e && 1 < customer.split(":").length ? customer.split(":")[1] : __scd.c.e; __scd.c.p.l = "" == __scd.c.p.l && 2 < customer.split(":").length ? customer.split(":")[2] : __scd.c.p.l; var d = 0 < customer.split(":").length && 0 < customer.split(":")[0].split("|").length ? customer.split(":")[0].split("|") : []; __scd.c.f = 0 < d.length && "" == __scd.c.f ? d[0] : __scd.c.f; __scd.c.l = 1 < d.length && "" == __scd.c.l ? d[1] : __scd.c.l } c ? __sco.management.run() : (a = __sco.tonumber(a)) && 100 <= a && 200 > a ? __sco.management.setstatus(a, __sco.management.run) : __sco.management.setstatus(100, __sco.management.run) } else if (0 < (a = __sco.management.isstatus(__sco.config.status2)) || __sco.management.isstatus(__sco.config.status2) || "string" == __sco.type(__scd.c.e) && "" != __scd.c.e) b = !0, __sco.scraper.statustwo(), (a = __sco.tonumber(a)) && 200 <= a && 300 > a ? __sco.management.setstatus(a, __sco.management.run) : __sco.management.setstatus(200, __sco.management.run); b || __sco.management.run() } catch (e) { e.title = "PRERUNTIME__", __sco.config.v1 && __sco.sender.send("POST", __sco.config.errorapi, __sco.v1runtime(e)) } }; __sco.management.run = function () { function a() { 300 <= __scd.t && 400 > __scd.t ? "3" != __sco.oldtype && __sco.management.sendtoapi() : "boolean" == __sco.type(__sco.management.trigger.set) && (__sco.contains(__sco.config.triggers, "load") || __sco.support.touchscreen) ? __sco.management.callback("load") : __sco.management.trigger.setup() } function b(a) { a || (a = __sco.clone(__sco.config.timestamptemplate), a.t = __scd.t, a.i = __sco.config.doc.i, a.i1 = __sco.config.doc.i1, a.s.i = __scd.s.i, a.s.m = __scd.s.m, __sco.management.intersend("POST", __sco.config.v2api, a)) } try { 100 <= __scd.t && 200 > __scd.t && __sco.config.v2 && !__sco.contains(__sco.config.triggers, "load") && !__sco.support.touchscreen && __sco.management.interget("__sc__lastsent", b), __sco.management.interset("__sc", __scd, a) } catch (c) { c.title = "RUNTIME__", __sco.config.v1 && __sco.sender.send("POST", __sco.config.errorapi, __sco.v1runtime(c)) } }; __sco.management.setsession = function (a) { try { var b = "", c = "", d = "", e = "", h = {}, k = __sco.storage.get("__scSMT"); "object" == __sco.type(a) && "object" == __sco.type(a.c) && "object" == __sco.type(a.s) ? (b = a.s.m, c = a.s.i, e = __sco.tonumber(a.d), d = a.t.toString().charAt(0), __scd = a) : (b = __sco.mid(), c = __sco.guid(), e = (new Date).getTime(), __scd = __sco.clone(__sco.config.doc), __sco.support.updatedoc(), d = __scd.t.toString().charAt(0)); k && "string" == __sco.type(k) && 0 < k.split(":").length && __sco.tonumber(k.split(":")[0]) && (k = k.split(":")[0]) && (b = k != b ? k : b); if (Math.floor(((new Date).getTime() - e) / 1E3) > __sco.config.sessiontime || "3" == d) c = __sco.guid(), h = __sco.clone(__scd.c), __scd = __sco.clone(__sco.config.doc), __sco.management.interremove("__sc__lastsent"), __sco.config.persistcustomer && (__scd.c = h), __sco.support.updatedoc(), __scd.t = 0; __sco.support.traditional ? (__scd.s.i = "", __scd.s.m = "") : (__scd.s.m = b, __scd.s.i = c); __scd.d = (new Date).getTime().toString(); __sco.__scd = __sco.clone(__scd); __sco.oldtype = d; __sco.management.prerun() } catch (g) { g.title = "SETSESSION__", __sco.config.v1 && __sco.sender.send("POST", __sco.config.errorapi, __sco.v1runtime(g)) } }; __sco.management.isstatus = function (a) { var b = !1; __sco.each(a, function (a, d) { b || (b = "string" === __sco.type(d) ? __sco.contains(__sco.loc, d) : "function" === __sco.type(d) ? d.call(window) : !1) }); return b }; __sco.management.killit = function (a) { if ("event" == __sco.type(a)) __scd.t = 400, __sco.management.interset("__sc", __scd, function () { __sco.management.callback("load") }); else return __sco.management.isstatus(__sco.config.status4) }; __sco.management.external = function () { __sco.each(__sco.config.external, function (a, b) { if (null != _scs(a)) __sco.on("mousedown", "function" !== __sco.type(b) ? __sco.management.killit : b, _scs(a)) }) }; __sco.management.itemtypes = function () { __scd.b.v = "string" !== __sco.type(__scd.b.v) && __sco.noru(__scd.b.v) ? __scd.b.v.toString() : __scd.b.v; __sco.each(__scd.s, function (a, b) { __scd.s[a] = "string" !== __sco.type(b) && __sco.noru(b) ? b.toString() : b }); __sco.each(__scd.b.i, function (a, b) { __scd.b.i[a].q = "number" !== __sco.type(b.q) && __sco.noru(b.q) ? __sco.tonumber(b.q) : b.q; __scd.b.i[a].v = "string" !== __sco.type(b.v) && __sco.noru(b.v) ? b.v.toString() : b.v; __sco.each(__scd.b.i[a], function (b, d) { __sco.contains(__sco.config.itemfields, b) || (__scd.b.i[a][b] = "string" !== __sco.type(d) && __sco.noru(d) ? d.toString() : d) }) }) }; __sco.management.setstatus = function (a, b, c) { __sco.management.interget("__sc", function (d) { 0 < a && 400 <= __scd.t && 413 != __scd.t && __sco.contains(__sco.config.status4restart, a) ? (__sco.management.haschanged(__sco.tryparse(d.data)) && __sco.management.sendtoapi(), __scd.s.i = __sco.guid(), __scd.b = __sco.clone(__sco.config.doc.b), __sco.management.interremove("__sc__lastsent"), __sco.config.persistcustomer || (__scd.c = __sco.clone(__sco.config.doc.c)), __sco.support.updatedoc(), __scd.t = a) : 0 < a && 400 <= __scd.t && 413 != __scd.t && __sco.contains(__sco.config.status4overwrite, a) ? __scd.t = a : 0 < a && 400 > __scd.t && (__scd.t = a); __sco.noru(b) && ("array" == __sco.type(c) ? b.apply(window, c) : b.call(window)) }) }; __sco.management.canexec = function () { function a() { var a = !1; __sco.each(__sco.config.onchange, function (b, c) { a || __sco.each(c, function (b, c) { null != __sco.getdom(_scs(c)) && (a = !0) }) }); return a } try { var b = __sco.management.isstatus(__sco.config.status1), c = __sco.management.isstatus(__sco.config.status2) || a(), d = __sco.management.isstatus(__sco.config.status3), e = __sco.management.killit(); return !__sco.management.isstatus(__sco.config.exclude) && (b || 0 < b || c || d || 0 < d || e || 0 < e) ? !0 : !1 } catch (h) { return !0 } }; __sco.management.nosupport = function (a) { try { var b = "NO SUPPORT "; a && (b += " NO PROVIDER STORAGE "); __sco.config.v1 && (__sco.support && "undefined" !== __sco.type(__sco.support.cors) && __sco.each(__sco.support, function (a, c) { "function" !== __sco.type(c) && "array" !== __sco.type(c) && (b += a + " : " + c + " ") }), __sco.management.intersend("POST", __sco.config.errorapi, __sco.v1runtime(b))); if (__sco.config.v2) { var c = __sco.clone(__sco.config.doc); c.g.push({ s: 100, d: (new Date).getTime(), e: [{ c: "100", d: (new Date).getTime(), t: b, n: b }] }); __sco.management.intersend("POST", __sco.config.v2api, c) } } catch (d) { } }; __sco.management.haschanged = function (a) { try { var b = __sco.__scd, c = __sco.tonumber(a && __sco.tonumber(a.d) && __sco.tonumber(a.d) > __sco.tonumber(__scd.d) ? a.d : __scd.d); return Math.floor(((new Date).getTime() - c) / 1E3) > __sco.config.sessiontime ? (__scd.s.i = __sco.guid(), __scd.b = __sco.clone(__sco.config.doc.b), __sco.management.interremove("__sc__lastsent"), __sco.config.persistcustomer || (__scd.c = __sco.clone(__sco.config.doc.c)), __sco.support.updatedoc(), __scd.t = 0, !0) : a && __sco.tonumber(a.d) && a.d != __scd.d && __sco.tonumber(a.d) > __sco.tonumber(__scd.d) ? (__scd.c = __sco.extend(a.c, __scd.c, !0), __scd.s = __sco.extend(a.s, __scd.s, !0), __scd.t = 300 <= a.t && 400 > a.t ? a.t : 0 < a.t ? a.t : __scd.t, 0 < a.b.i.length && SCJSON.stringify(__scd.b) != SCJSON.stringify(a.b) && (__scd.b = __sco.clone(a.b)), !0) : b ? SCJSON.stringify(b.b) != SCJSON.stringify(__scd.b) || SCJSON.stringify(b.c) != SCJSON.stringify(__scd.c) || b.s.i != __scd.s.i || SCJSON.stringify(__scd.g) != SCJSON.stringify(b.g) : !0 } catch (d) { return !0 } }; __sco.management.trigger.setup = function () { "undefined" === __sco.type(__sco.management.trigger.set) && (__sco.contains(__sco.config.triggers, "timeout") && __sco.management.callback("timeout"), __sco.contains(__sco.config.triggers, "exit") && (__sco.lastmove = 0, __sco.on("mouseout", function (a) { (a.relatedTarget || a.toElement) == this.parentNode && (0 == __sco.lastmove || 1E3 < (new Date).getTime() - __sco.lastmove) && (__sco.lastmove = (new Date).getTime(), __sco.management.callback("exit")) }, document)), (__sco.contains(__sco.config.triggers, "load") || __sco.support.touchscreen) && __sco.management.callback("load"), __sco.processonchange(), __sco.management.external(), __sco.management.trigger.set = !0) }; __sco.management.callback = function (a) { function b(a) { __sco.management.haschanged(a) ? (__sco.management.sendtoapi(), __sco.management.interset("__sc", __scd)) : __sco.management.interget("__sc__lastsent", c, !1) } function c(a) { (!a || a < (new Date).getTime() - 1E3 * __sco.config.mintimeout) && 0 < __scd.t && (a = __sco.clone(__sco.config.timestamptemplate), a.t = __scd.t, a.i = __sco.config.doc.i, a.i1 = __sco.config.doc.i1, a.s.i = __scd.s.i, a.s.m = __scd.s.m, __sco.management.timestampapi(a)) } function d(a) { var c = (new Date).getTime(), d = 0, g; !a || a < c - 1E3 * __sco.config.timeout ? ("number" == __sco.type(__sco.tonumber(a)) && a < c - 1E3 * __sco.config.timeout && __sco.management.interget("__sc", b), g = setInterval(function () { __sco.management.interget("__sc", b); d++; d > __sco.config.timerruns && clearTimeout(g) }, 1E3 * __sco.config.timeout)) : setTimeout(function () { __sco.management.interget("__sc", b); g = setInterval(function () { __sco.management.interget("__sc", b); d++; d > __sco.config.timerruns && clearTimeout(g) }, 1E3 * __sco.config.timeout) }, 1E3 * __sco.config.timeout - (c - a)) } "exit" == a || "load" == a ? __sco.management.interget("__sc", b) : "timeout" == a && __sco.management.interget("__sc__lastsent", d, !1) }; __sco.management.react = function (a) { if (__sco.management.validate(a)) try { var b = __sco.tryparse(a.data), c = b.ticket; "number" == __sco.type(c) && 0 <= c && __sco.tickets[c].call(window, b.data) } catch (d) { d.title = "React_Error", __sco.error(d) } }; __sco.management.interget = function (a, b, c) { if ("__sc" == a || "__sc__lastsent" == a) a += __sco.config.doc[__sco.config.v2 ? "i" : "i1"]; __sco.support.storeprovider && __sco.support.ps ? (c = "undefined" === __sco.type(c) ? !1 : c, b = __sco.tickets.push(b), __sco.management.listener.get(a, c, b - 1)) : b.call(window, __sco.support.traditional ? !1 : __sco.storage.get(a, c)) }; __sco.management.interset = function (a, b, c) { if ("__sc__lastsent" == a || "__sc" == a) __scd.d = (new Date).getTime().toString(), a += __sco.config.doc[__sco.config.v2 ? "i" : "i1"]; if (__sco.support.storeprovider && __sco.support.ps) { var d = -1; "function" === __sco.type(c) && (d = __sco.tickets.push(c)); __sco.management.listener.set(a, b, d - 1) } else __sco.support.traditional ? "function" === __sco.type(c) ? c.call(window, !1) : null : "function" === __sco.type(c) ? c.call(window, __sco.storage.set(a, b)) : __sco.storage.set(a, b) }; __sco.management.intersend = function (a, b, c, d, e, h) { function k(a) { d.call(window, a) } h || "GET" != a || (h = Math.floor(4095 * Math.random()).toString(), b += (-1 < b.indexOf("?") ? "&" : "?") + "cbi1=" + h); __sco.support.cors || !__sco.support.postmessage || __sco.support.postmessage && "undefined" != __sco.type(__sco.management.listener) && !__sco.management.listener.ready ? __sco.sender.send(a, b, c, "function" === __sco.type(d) ? k : null, e, __sco.config.requesttimeout) : (h = -1, "function" === __sco.type(d) && (h = __sco.tickets.push(d)), __sco.config.v1 && __sco.config.v2 ? __sco.management[__sco.contains(b, "/lite/") || __sco.contains(b, "/import/") ? "v1listener" : "listener"].send(a, b, c, h - 1, e, __sco.config.requesttimeout) : __sco.management.listener.send(a, b, c, h - 1, e)) }; __sco.management.interremove = function (a, b) { if ("__sc" == a || "__sc__lastsent" == a) a += __sco.config.doc[__sco.config.v2 ? "i" : "i1"]; if (__sco.support.storeprovider) { var c = -1; "function" === __sco.type(b) && (c = __sco.tickets.push(b)); __sco.management.listener.remove(a, c - 1) } else __sco.support.traditional ? "function" === __sco.type(b) ? b.call(window, !1) : null : "function" === __sco.type(b) ? b.call(window, __sco.storage.remove(a)) : __sco.storage.remove(a) }; __sco.management.validate = function (a) { return "string" != __sco.type(a.origin) || a.origin != __sco.config.v1providerhost.match(__sco.config.providerregex)[0] && a.origin != __sco.config.providerhost.match(__sco.config.providerregex)[0] && "self" != a.origin ? !1 : !0 }; __sco.management.timestampapi = function (a) { function b(b) { var d, e = "object" == __sco.type(__scd) && "object" == __sco.type(__scd.b) && "object" == __sco.type(__scd.c); "object" != __sco.type(a) || e || (d = __sco.clone(__sco.config.timestamptemplate), d.t = a.t, d.s.i = a.s.i, d.s.m = a.s.m, d.i = __sco.config.doc.i, d.i1 = __sco.config.doc.i1, d.o = ""); !b && e ? __sco.management.sendtoapi() : (__sco.config.v1 && __sco.management.intersend("POST", (e ? 300 <= __scd.t : 300 <= d.t) && (e ? 400 > __scd.t : 400 > d.t) ? __sco.config.v1completion : __sco.config.v1api, __sco.contains(__sco.config.v1api, "/lite/") ? a : __sco.translatetov1(e ? __scd : d)), __sco.config.v2 && __sco.management.intersend("POST", __sco.config.v2api, a), e && (__sco.management.interset("__sc__lastsent", (new Date).getTime()), __scd.d = (new Date).getTime().toString(), __sco.__scd.d = __sco.clone(__scd.d), __sco.management.interset("__sc", __scd))) } "undefined" == __sco.type(__sco.management.listener) || "undefined" != __sco.type(__sco.management.listener) && !__sco.management.listener.ready ? b(!1) : __sco.management.interget("__sc__lastsent", b) }; __sco.management.sendtoapi = function () { if (0 < __scd.t || 0 < __scd.g.length) { __sco.management.interset("__sc__lastsent", (new Date).getTime()); __sco.config.v1 && __sco.management.intersend("POST", 300 <= __scd.t && 400 > __scd.t ? __sco.config.v1completion : __sco.config.v1api, __sco.config.translatev1 ? __sco.translatetov1(__scd) : __scd); if (__sco.config.v2) { var a = __sco.clone(__scd); __sco.support.traditional && (a.r = 300); __sco.management.intersend("POST", __sco.config.v2api, a) } __sco.__scd = __sco.clone(__scd) } }; __sco.management.contentLoaded = function (a, b, c) { var d = !1, e = !0, h = a.document, k = h.documentElement, g = function (e) { if ("readystatechange" != e.type || "complete" == h.readyState) __sco.off(e.type, g, "load" == e.type ? a : h), !d && (d = !0) && b.apply(a, c || [], e.type || e) }, m = function () { try { k.doScroll("left") } catch (a) { setTimeout(m, 50); return } g("poll") }; if ("complete" == h.readyState) b.apply(a, c || []); else { if (h.createEventObject && k.doScroll) { try { e = !a.frameElement } catch (t) { } e && m() } __sco.on("DOMContentLoaded", g, h); __sco.on("readystatechange", g, h); __sco.on("load", g, a) } }; _scs = function (a, b, c) { function d(a) { return a.replace(p, v) } function e(a, b) { var c = []; __sco.each(__sco.toarray(a), function (a, d) { 1 != d.nodeType && 9 != d.nodeType || "string" === __sco.type(b) && d.nodeName.toLowerCase() !== b || c.push(d) }); return c } function h(a) { var b = []; __sco.each(a, function (a, c) { 3 == c.nodeType && b.push(c) }); return b } function k(a, b) { var c = [], d = new RegExp("(^|\\s+)(" + b + ")($|\\s+)"); __sco.each(a, function (a, b) { 1 === b.nodeType && null != b.className.match(d) && c.push(b) }); return c } function g(a, b) { var c = [], d = 0, f = 0, e = (b || document).getElementsByTagName(a); c[0] = e[0]; for (var h = 1; h < e.length; h++) null != c[d] && (f += c[d].getElementsByTagName(a).length, f++, d++, null != e[f] && (c[d] = e[f])); return c } function m(a, b, c) { var d = []; if (1 === a.nodeType || 9 === a.nodeType) b ? (b = __sco.attr(a, c.match(n.ATTR)[1]), null != b && null != b.match(new RegExp("^" + c.match(n.ATTR)[5] + "$")) && (d = d.concat(__sco.toarray(a)))) : (a = a.getElementsByTagName("*"), __sco.each(a, function (a, b) { var e = __sco.attr(b, c.match(n.ATTR)[1]); null != e && null != e.match(new RegExp("^" + c.match(n.ATTR)[5] + "$")) && (d = d.concat(__sco.toarray(b))) })); return d } function t(a, b, c) { var e = []; if (1 === a.nodeType || 9 === a.nodeType) b ? null != __sco.attr(a, d(c.match(n.ATTR)[1])) && (e = e.concat(__sco.toarray(a))) : (a = a.getElementsByTagName("*"), __sco.each(a, function (a, b) { __sco.attr(b, d(c.match(n.ATTR)[1])) && (e = e.concat(__sco.toarray(b))) })); return e } function s(a, b, c, r) { if (null != b) { if (null != a.match(n.ID)) { l[c] = __sco.ltrim(l[c].replace(a.match(n.ID)[0], "")); var f = document.getElementById(d(a.match(n.ID)[1])), f = null == f ? null : f.id != d(a.match(n.ID)[1]) ? null : f; return "" === l[c] ? f : s(l[c], f, c, 1) } if (null != a.match(n.TAG)) return l[c] = __sco.ltrim(l[c].replace(a.match(n.TAG)[0], "")), f = [], "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (b, c) { 1 === c.nodeType && (f = f.concat(__sco.toarray(c.getElementsByTagName(d(a.match(n.TAG)[0]))))) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? f = f.concat(__sco.toarray((r ? b : document).getElementsByTagName(d(a.match(n.TAG)[0])))) : f = f.concat(__sco.toarray(b.getElementsByTagName(d(a.match(n.TAG)[0])))), "" === l[c] ? 0 === f.length ? null : f : s(l[c], null == f || 0 == f.length ? null : f, c, 1); if (null != a.match(n.CLASS)) return l[c] = __sco.ltrim(l[c].replace(a.match(n.CLASS)[0], "")), f = [], "function" == __sco.type(document.getElementsByClassName) && -1 < document.getElementsByClassName.toString().indexOf("[native code]") ? "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (b, c) { 1 === c.nodeType && (f = r ? f.concat(null != c.className.match(new RegExp("(^|\\s+)(" + d(a.match(n.CLASS)[1]) + ")($|\\s+)")) ? __sco.toarray(c) : []) : f.concat(__sco.toarray(c.getElementsByClassName(d(a.match(n.CLASS)[1]))))) }) : f = f.concat(__sco.toarray(("htmlelement" != __sco.type(b) && 0 == b.length ? document : b).getElementsByClassName(d(a.match(n.CLASS)[1])))) : "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (b, c) { 1 === c.nodeType && (r ? null != c.className.match(new RegExp("(^|\\s+)(" + d(a.match(n.CLASS)[1]) + ")($|\\s+)")) && (f = f.concat(__sco.toarray(c))) : f = f.concat(__sco.toarray(k(c.getElementsByTagName("*"), d(a.match(n.CLASS)[1]))))) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? f = f.concat(__sco.toarray(k(document.getElementsByTagName("*"), d(a.match(n.CLASS)[1])))) : r ? f = f.concat(__sco.toarray(k(__sco.toarray(b), d(a.match(n.CLASS)[1])))) : f = f.concat(__sco.toarray(k(b.getElementsByTagName("*"), d(a.match(n.CLASS)[1])))), "" === l[c] ? 0 === f.length ? null : f : s(l[c], null == f || 0 == f.length ? null : f, c, 1); if (null != a.match(n.ATTR)) return l[c] = __sco.ltrim(l[c].replace(a.match(n.ATTR)[0], "")), f = [], "undefined" !== typeof a.match(n.ATTR)[5] ? "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (b, c) { f = f.concat(m(c, r, a)) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? __sco.each([document], function (b, c) { f = f.concat(m(c, r, a)) }) : f = f.concat(m(b, r, a)) : "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (b, c) { f = f.concat(t(c, r, a)) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? __sco.each([document], function (b, c) { f = f.concat(t(c, r, a)) }) : f = f.concat(t(b, r, a)), "" === l[c] ? 0 === f.length ? null : f : s(l[c], null == f || 0 == f.length ? null : f, c, 1); if (null != a.match(n.CHILD)) { var p = a.match(n.CHILD), f = []; l[c] = __sco.ltrim(l[c].replace(a.match(n.CHILD)[0], "")); if ("first" == p[1] || "last" == p[1] || "nth-child" == p[1]) switch (p[1]) { case "first": return f = "htmlelement" != __sco.type(b) && 0 < b.length ? b[0] : b.length ? null : b, "" === l[c] ? null == f || 0 === f.length ? null : f : s(l[c], null == f || 0 == f.length ? null : f, c, 1); case "last": return f = "htmlelement" != __sco.type(b) && 0 < b.length ? b[b.length - 1] : b.length ? null : b, "" === l[c] ? null == f || 0 === f.length ? null : f : s(l[c], null == f || 0 == f.length ? null : f, c, 1); case "nth-child": return f = "htmlelement" != __sco.type(b) && "NaN" !== parseFloat(p[2]).toString() && b.length > p[2] ? b[p[2]] : null, "" === l[c] ? null == f || 0 === f.length ? null : f : s(l[c], null == f || 0 == f.length ? null : f, c, 1) } else { if ("children" == p[1]) return "undefined" != __sco.type(p[2]) ? "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (a, b) { f = f.concat(__sco.toarray(e(b.childNodes, p[2]))) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? f = [] : f = f.concat(__sco.toarray(e(b.childNodes, p[2]))) : "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (a, b) { f = f.concat(__sco.toarray(e(b.childNodes))) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? f = [] : f = f.concat(__sco.toarray(e(b.childNodes))), "" === l[c] ? 0 === f.length ? null : f : s(l[c], null == f || 0 == f.length ? null : f, c, 1); if ("textnodes" == p[1]) return "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (a, b) { f = f.concat(__sco.toarray(h(b.childNodes))) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? f = [] : f = f.concat(__sco.toarray(h(b.childNodes))), "" === l[c] ? 0 === f.length ? null : f : s(l[c], null == f || 0 == f.length ? null : f, c, 1); if ("elemp" == p[1]) return "htmlelement" != __sco.type(b) && 0 < b.length ? __sco.each(b, function (a, b) { f = f.concat(__sco.toarray(g(d(p[2]), b))) }) : "htmlelement" != __sco.type(b) && 0 == b.length ? f = [] : f = f.concat(__sco.toarray(g(d(p[2]), b))), "" === l[c] ? 0 === f.length ? null : f : s(l[c], null == f || 0 == f.length ? null : f, c, 1) } } } return null } var r = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#") + ")|)|)[\\x20\\t\\r\\n\\f]*\\]", n = { ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/, CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/, TAG: new RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"), ATTR: new RegExp("^" + r), CHILD: /^:(first|last|children|textnodes|elemp|nth-child)(?:\([\x20\t\r\n\f]*([\d\w\*]*)[\x20\t\r\n\f]*\)|)?/i }, p = RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)", "ig"), v = function (a, b, c) { a = "0x" + b - 65536; return a !== a || c ? b : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(a >> 10 | 55296, a & 1023 | 56320) }; if ("string" === __sco.type(a) || "array" === __sco.type(a) && "htmlelement" === __sco.type(a[0]) && "string" === __sco.type(a[1])) { var l = [], u = "", q = [], w = [], x = !1; "array" === __sco.type(a) ? (l = __sco.clean(a[1]).split(/\s+(?![^\[]*\])/g), q = a[0]) : l = __sco.clean(a).split(/\s+(?![^\[]*\])/g); w = __sco.clone(l); __sco.each(l, function (a, c) { if (null != u) { var d = s(c, q, a); null == d ? (u = d, q = null) : (q = d, u = ""); null == d && "string" == __sco.type(b) && 0 < b.length && !x && (__sco.error(b + " Selector:" + w.slice(0, a + 1).join(" ")), x = !0) } else q = null }); "array" === __sco.type(c) && 0 < c.length && __sco.each(c, function (a, b) { "function" === __sco.type(__sco[b]) && (q = __sco[b].call(window, "array" === __sco.type(q) && 0 < q.length ? q[0] : q)) }); return q } return null }; __sco.attr = function (a, b, c) { return "htmlelement" == __sco.type(a) ? 3 > arguments.length ? a.getAttribute(b) || null : __sco.noru(c) ? a.setAttribute(b, c) : a.removeAttribute(b) : null }; __sco.clean = function (a) { return "string" === __sco.type(a) ? a.replace(/^\s*|\s*$/g, "").replace(/\s{2,}|[\r\t\n]/g, " ") : null }; __sco.clear = function (a, b, c, d) { var e = __sco.type(a), h = __sco.type(b), k = __sco.type(c), g = __sco.type(d); return "string" != e || "string" != e && ("string" != h || "regexp" != h) ? null : a.replace("regexp" == h ? b : "string" == k ? new RegExp(b, c) : new RegExp(b), "string" == g || "function" == g ? d : "") }; __sco.contains = function (a, b) { return "string" === __sco.type(a) ? -1 < a.indexOf(b) : "array" === __sco.type(a) ? -1 < a.indexOf(b) : "object" === __sco.type(a) ? a.hasOwnProperty(b) : !1 }; __sco.cursym = ""; __sco.ltrim = function (a) { return "string" === __sco.type(a) ? a.replace(/^\s*/, "") : null }; __sco.getvt = function (a, b) { var c = "htmlelement" !== __sco.type(a) ? "" : a.nodeName.toLowerCase(), d = null; if ("input" == c || "select" == c || "textarea" == c) { var e = a.type.toLowerCase(); "select" == c ? d = -1 < a.selectedIndex ? 0 == b ? a.options[a.selectedIndex].value : a.options[a.selectedIndex].text : null : "input" == c && (d = "checkbox" == e || "radio" == e ? a.selected || 1 == a.checked ? "1" : "0" : "undefined" == typeof a.value ? null : a.value) } else d = null; return __sco.clean(d) }; __sco.inbetween = function (a, b, c, d) { if ("string" === __sco.type(a) && "string" === __sco.type(b) && "string" === __sco.type(c)) { d = d || "ff"; var e = "", h = 0, k = c.indexOf(a), h = c.lastIndexOf(a), g = a.length, m = c.lastIndexOf(b); -1 != k && -1 != m && (a == b ? (h = c.match(new RegExp(a.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&").replace(/\s/g, "\\s"), "g")), 1 < h.length && (e = "ff" == d ? c.substring(k + g, c.indexOf(b, k + g)) : "fl" == d ? c.substring(k + g, m) : e)) : e = "ff" == d ? c.substring(k + g, c.indexOf(b, k + g)) : "fl" == d ? c.substring(k + g, m) : "lf" == d ? c.substring(h + g, c.indexOf(b, h + g)) : "ll" == d ? c.substring(h + g, m) : e); return __sco.clean(e) } return null }; __sco.pricecurr = function (a, b) { function c(a, b) { b = b || a.length; for (var c = "", d = 0; d < b; d++) c += a[d]; return c } var d = { "\u00a3": "GBP", "\u20ac": "EUR", "\u20ac": "EUR", $: "USD", A$: "AUD", CAD$: "CAD", CHF: "CHF", "Fr.": "CHF", "\u00a5": "JPY", kr: "NOK", NZ$: "NZD", "\u0440\u0443\u0431.": "RUB", py6: "RUB", pyu0431: "RUB", SKr: "SEK", Kc: "CZK" }, e = { AED: "AED", AFN: "AFN", Lek: "ALL", AMD: "AMD", Kz: "AOA", AR$: "ARS", "\u0192": "AWG", AZN: "AZN", KM: "BAM", Bds$: "BBD", BDT: "BDT", "\u043b\u0432": "BGN", BHD: "BHD", Fr: "BIF", BD$: "BMD", B$: "BND", $b: "BOB", R$: "BRL", B$: "BSD", BTN: "BTN", P: "BWP", "p.": "BYR", BZ$: "BZD", FC: "CDF", CLP: "CLP", "\u00a5": "RMB", COP: "COP", "\u00a2": "CRC", $MN: "CUP", Esc: "CVE", CYP: "CYP", Kc: "CZK", "K\u010d": "CZK", Fdj: "DJF", DKK: "DKK", Dkr: "DKK", RD$: "DOP", DZD: "DZD", EEK: "EEK", EGP: "EGP", Nfk: "ERN", ETB: "ETB", FJ$: "FJD", FKP: "FKP", GEL: "GEL", GGP: "GGP", GHS: "GHS", D: "GMD", Fr: "GNF", q: "GTQ", HK$: "HKD", L: "HNL", kn: "HRK", G: "HTG", Ft: "HUF", Rp: "IDR", ILS: "ILS", "\u20aa": "ILS", IMP: "IMP", Rs: "INR", "\u20b9": "INR", IQD: "IQD", IRR: "IRR", "\u00cdkr": "ISK", JEP: "JEP", J$: "JMD", JOD: "JOD", Sh: "KES", KGS: "KGS", KHR: "KHR", Fr: "KMF", "\u20a9": "KPW", KRW: "KRW", KWD: "KWD", CI$: "KYD", KZT: "KZT", "\u20ad": "LAK", LBP: "LBP", Rp: "LKR", L$: "LRD", L: "LSL", Lt: "LTL", Ls: "LVL", LYD: "LYD", MAD: "MAD", L: "MDL", MGA: "MGA", "\u0434\u0435\u043d": "MKD", K: "MMK", "\u20ae": "MNT", P: "MOP", UM: "MRO", Rp: "MUR", MVR: "MVR", MK: "MWK", MEX$: "MXN", RM: "MYR", MT: "MZN", N$: "NAD", "\u20a6": "NGN", C$: "NIO", Rp: "NPR", OMR: "OMR", "B/.": "PAB", "S/.": "PEN", K: "PGK", Php: "PHP", "\u20b1": "PHP", Rp: "PKR", "z\u0142": "PLN", Gs: "PYG", QAR: "QAR", RMB: "RMB", lei: "RON", Fr: "RWF", SAR: "SAR", SI$: "SBD", Rp: "SCR", SDG: "SDG", SEK: "SEK", SG$: "SGD", S$: "SGD", SHP: "SHP", Le: "SLL", S: "SOS", SPL: "SPL", SRD: "SRD", Db: "STD", "\u20a1": "SVC", SYP: "SYP", L: "SZL", "\u0e3f": "THB", "\u0e1a\u0e32\u0e17": "THB", SM: "TJS", m: "TMM", TND: "TND", T$: "TOP", TL: "TRY", TT$: "TTD", TV$: "TVD", $T: "TVD", NT$: "TWD", Sh: "TZS", UAH: "UAH", Sh: "UGX", $U: "UYU", UZS: "UZS", Bs: "VEF", "\u20ab": "VND", Vt: "VUV", T: "WST", EC$: "XCD", YER: "YER", R: "ZAR", Zk: "ZMK", Z$: "ZWD", CUC$: "CUC" }, h = { EGP: "1", KWD: "1", OMR: "1", JOD: "1" }, k = "", g = ""; (function () { var a = [], b = []; __sco.config.allcurrencies && __sco.each(e, function (a, b) { d[a] = b }); for (var c in d) a.push(d[c]), b.push(c); g = a.join("|"); k = b.join("|") })(); b = 0 == b ? !1 : !0; if ("string" === __sco.type(a) && "" != a.replace(/[^\d]/g, "")) { var m = a.replace(/[^\d\,\.]/g, "").match(/[\d]+/g), t = a.match(new RegExp("(" + g + ")"), "i"), s = a.match(new RegExp("(" + k.replace(/\$/g, "\\$") + ")"), "i"); null != t ? __sco.cursym = t[0] : null != s && (__sco.cursym = d[s[0]] || ""); h = 1 == !!h[__sco.cursym] ? 4 : 3; m = 1 == m.length ? m[0] : m[m.length - 1].length < h ? c(m, m.length - 1) + "." + m[m.length - 1] : c(m); return "" != m ? m : 1 == b ? __sco.error("301 price not found") : "0.00" } if ("" == a && 1 == b) __sco.error("301 price not found"); else return "0.00" }; __sco.text = function (a) { return "htmlelement" === __sco.type(a) ? __sco.clean(a.textContent || a.innerText || a.data) : null }; "indexOf" in Array.prototype || (Array.prototype.indexOf = function (a, b) { void 0 === b && (b = 0); 0 > b && (b += this.length); 0 > b && (b = 0); for (var c = this.length; b < c; b++) if (b in this && this[b] === a) return b; return -1 }); String.prototype.trim || (String.prototype.trim = function () { return this.replace(/^[\s\xA0]+|[\s\xA0]+$/g, "") }); __sco.empty = function (a) { if (__sco.isArray(a)) __sco.iterateExecute(a, __sco.empty); else { if (!__sco.isDomNode(a)) return !1; for (; a.hasChildNodes() ;) a.removeChild(a.lastChild) } }; __sco.isArray = function (a) { a = Object.prototype.toString.call(a); return "[object Array]" == a || "[object HTMLCollection]" == a }; __sco.isDomNode = function (a) { return null == a || "object" != typeof a ? !1 : !0 }; __sco.iterateExecute = function (a, b, c) { "undefined" == typeof c && (c = []); if (__sco.isArray(a)) { for (var d = 0; d <= a.length - 1; d++) b.apply(this, [a[d]].concat(c)); return !0 } }; __sco.addClass = function (a, b) { if (__sco.isArray(a)) __sco.iterateExecute(a, __sco.addClass, [b]); else { if (!__sco.isDomNode(a)) return !1; var c = a.getAttribute("class"); null == c && (c = ""); -1 == c.indexOf(b) && (a.className = 0 == c.length ? b : " " + b) } }; __sco.clone = function (a) { if ("htmlelement" === __sco.type(a)) return a.cloneNode(); if ("date" === __sco.type(a)) return new Date(a.getTime()); if ("object" !== __sco.type(a) && "array" !== __sco.type(a)) return a; try { var b = new a.constructor; __sco.each(a, function (c, e) { b.hasOwnProperty(c) || (b[c] = __sco.clone(a[c])) }) } catch (c) { b = a } finally { return b } }; __sco.dedupe = function (a) { var b = []; "object" != __sco.type(a) && "array" != __sco.type(a) && "nodelist" != __sco.type(a) || __sco.each(a, function (a, d) { b.hasOwnProperty(d) || b.push(d) }); return b }; __sco.each = function (a, b) { if (__sco.noru(a)) if ("object" === __sco.type(a)) for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.call(a[c], c, a[c]); else for (c = 0; c < a.length; c++) Object.prototype.hasOwnProperty.call(a, c) && b.call(a[c], c, a[c]); return a }; __sco.error = function (a) { var b = (new Date).getTime(), c = "", d = "", e = ""; "error" === __sco.type(a) ? (c = a.stack || "", d = a.description || "", e = a.message || "") : e = "string" !== __sco.type(a) ? SCJSON.stringify(a) : a; "" != a && (0 == __scd.g.length && __scd.g.push({ s: 100, d: (new Date).getTime(), e: [] }), __scd.g[0].e.push({ c: "100", d: b, t: d, n: e + " : " + c })); return null }; __sco.extend = function (a, b, c) { var d = __sco.clone(a), e = __sco.clone(b); __sco.each(d, function (a, b) { Object.prototype.hasOwnProperty.call(d, a) && "undefined" !== __sco.type(e[a]) && (c && "string" == __sco.type(d[a]) && "string" == __sco.type(e[a]) ? d[a] = "" == d[a] && "" != e[a] ? e[a] : d[a] : d[a] = e[a]) }); __sco.each(e, function (a, b) { Object.prototype.hasOwnProperty.call(d, a) || (d[a] = e[a]) }); return d }; __sco.getdom = function (a, b) { b = b || ""; return __sco.noru(a) ? "undefined" != typeof a.length ? 0 < a.length ? a : __sco.error(b) : a : __sco.error(b) }; __sco.guid = function () { function a(a) { return a ? Math.floor(65536 * (1 + Math.random())).toString(16).substring(1) : Math.floor(1E15 * Math.random()).toString(16).substr(0, 12) } return ((new Date).getTime().toString(36) + "-" + a(!0) + "-" + a(!0) + "-" + a(!0) + "-" + a(!1)).toString().toUpperCase() }; __sco.hash = function (a) { var b = 0, c; if ("string" !== __sco.type(a)) return null; for (i = 0; i < a.length; i++) c = a.charCodeAt(i), b = (b << 5) - b + c, b &= b; return b.toString() }; __sco.loc = document.location.href.toLowerCase(); __sco.mid = function () { return (new Date).getTime().toString() + Math.floor(16777216 * (1 + Math.random())).toString().substr(0, 6) }; __sco.monitor = function () { function a() { try { h ? (d(k), e != g.compare.call(window) && (g.action.call(window), e = g.compare.call(window)), b++, b < g.max && (k = c(a, g.interval))) : (e = "undefined" !== __sco.type(g.startstate) ? g.startstate : g.compare.call(window), h = !0, b++, k = c(a, g.interval)) } catch (m) { __sco.error("207 timer error") } } try { var b = 0, c = setTimeout, d = clearTimeout, e = null, h = !1, k, g = this; this.startstate = void 0; this.max = 300; this.stop = function () { d(k) }; this.start = function () { d(k); b = 0; c(a, g.interval) }; this.interval = 2E3; this.compare = function () { return null }; this.action = function () { } } catch (m) { __sco.error("206 timer error") } }; __sco.noru = function (a) { return null != a && "undefined" !== typeof a }; __sco.on = function (a, b, c) { if (__sco.isArray(c)) for (var d = 0; d <= c.length - 1; d++) __sco.on(a, b, c[d]); else { var d = window.addEventListener, e = 2 < arguments.length && __sco.noru(c) ? c : window; d ? e.addEventListener(a, b) : e.attachEvent("on" + a, b) } }; __sco.off = function (a, b, c) { if (__sco.isArray(c)) for (var d = 0; d <= c.length - 1; d++) __sco.off(a, b, c[d]); else { var d = window.removeEventListener, e = 2 < arguments.length && __sco.noru(c) ? c : window; d ? e.removeEventListener(a, b) : e.detachEvent("on" + a, b) } }; __sco.remove = function (a) { if (__sco.isArray(a)) __sco.iterateExecute(a, __sco.remove); else { if (!__sco.isDomNode(a)) return !1; a.parentNode.removeChild(a) } }; __sco.removeClass = function (a, b) { if (__sco.isArray(a)) __sco.iterateExecute(a, __sco.removeClass, [b]); else { if (!__sco.isDomNode(a)) return !1; a.className = a.className.replace(b, "") } }; __sco.toarray = function (a) { var b = []; if ("array" == __sco.type(a)) return a; if ("nodelist" == __sco.type(a) && 0 == a.length) return b; __sco.each(a, function (a, d) { b.push(d) }); 0 == b.length && b.push("function" === __sco.type(a) ? a.valueOf() : a); return b }; __sco.tonumber = function (a) { var b = __sco.type(a); return "string" == b && "" == a || "string" != b && "number" != b || !isFinite(Number(a)) ? !1 : Number(a) }; __sco.tryparse = function (a) { function b(a) { try { return SCJSON.parse(a) } catch (h) { return d++, d < c.length ? b(c[d]) : null } } var c = [a, '"' + a + '"', "{" + a + "}", "[" + a + "]"], d = 0; return "string" !== __sco.type(a) ? a : b(a) }; __sco.type = function (a) { if (!__sco.noru(a)) return String(a); var b = ""; try { b = a.toString() } catch (c) { } if ("[object]" === b) { if ("number" === typeof a.nodeType && 9 === a.nodeType) return "htmldoc"; if ("number" === typeof a.nodeType && ("undefined" === typeof a.length || "string" === typeof a.nodeName && ("select" === a.nodeName.toLowerCase() || "form" === a.nodeName.toLowerCase() || "#text" === a.nodeName.toLowerCase()))) return "htmlelement"; if ("undefined" !== typeof a.item && "number" === typeof a.length) return "nodelist" } return "object" !== typeof a || "undefined" === typeof a.callee && "undefined" === typeof a.caller || "number" !== typeof a.length ? "number" !== typeof a.nodeType || 1 !== a.nodeType && 3 !== a.nodeType ? "object" !== typeof a || "string" !== typeof a.type || "boolean" !== typeof a.cancelBubble && "boolean" !== typeof a.bubbles ? { "[object Boolean]": "boolean", "[object Number]": "number", "[object String]": "string", "[object Text]": "htmlelement", "[object Function]": "function", "[object Array]": "array", "[object Date]": "date", "[object RegExp]": "regexp", "[object Object]": "object", "[object Error]": "error", "[object Arguments]": "arguments", "[object NodeList]": "nodelist", "[object HTMLCollection]": "nodelist", "[object HTMLDocument]": "htmldoc" }[Object.prototype.toString.call(a)] || (null != Object.prototype.toString.call(a).match(/HTML[\w]*Element/) ? "htmlelement" : null != Object.prototype.toString.call(a).match(/HTML[\w]*Collection/) ? "nodelist" : "object") : "event" : "htmlelement" : "arguments" }; __sco.isvalid = function (a, b) { if ("string" === __sco.type(a)) { if (1 == !!__sco.config.block[b]) for (var c = 0; c < __sco.config.block[b].length; c++) if (__sco.config.block[b][c] == a) return !1; switch (b) { case "email": return -1 < a.indexOf("@") ? !0 : !1; case "telephone": return a = a.replace(/[^0-9]/gi, ""), c = a.split(new RegExp(a[0])).length - 1, 5 < a.length && c != a.length ? !0 : !1; case "mobile": return a = a.replace(/[^0-9]/gi, ""), c = a.split(new RegExp(a[0])).length - 1, 5 < a.length && c != a.length ? !0 : !1; default: return !0 } } else return !1 }; __sco.onchange = function (a, b) { if ("htmlelement" === __sco.type(_scs(a))) { a = _scs(a); var c = __sco.attr(a, "disabled"), d = __sco.getvt(a); c && __sco.attr(a, "disabled", null); "" !== d && __sco.updatecustomer(d, b); __sco.on("change", function () { try { var c = __sco.getvt(a); "" != c && (__sco.updatecustomer(c, b), __sco.management.setstatus(200, __sco.management.sendtoapi)) } catch (d) { d.title = "ONCHANGE", __sco.error(d) } }, a); c && __sco.attr(a, "disabled", "true") } }; __sco.processonchange = function () { for (var a in __sco.config.onchange) for (var b in __sco.config.onchange[a]) if (__sco.config.onchange[a].hasOwnProperty(b)) __sco.onchange(__sco.config.onchange[a][b], a) }; __sco.updatecustomer = function (a, b) { if ("" != a && __sco.isvalid(a, b)) { if ("first" == b || "last" == b) a = a.charAt(0).toUpperCase() + a.slice(1).toLowerCase(); var c = __scd.c; "optout" == b && __sco.config.optneg && (a = -1 * ((a ? 1 : 0) - 1)); "telephone" == b || "mobile" == b ? c.p["telephone" == b ? "l" : "m"] = a : c[b.charAt(0)] = a; __sco.management.interset("__sc", __scd) } }; __sco.support.setsupport = function () { function a(a, b) { var c = "Unknown"; __sco.each(a, function (a, d) { null != b.match(new RegExp(d)) && "Unknown" == c && (c = b.match(new RegExp(d))[0]) }); return c } __sco.support.os = "Unknown"; __sco.support.browser = "Unknown"; __sco.support.version = "Unknown"; __sco.support.browsers = "OPR Chrome CriOS Firefox MSIE Safari Opera KDE Trident".split(" "); __sco.support.ossystems = "Windows iPhone iPad Android Mac Linux Symbian Blackberry CrOS".split(" "); __sco.support.cors = ("function" === typeof XMLHttpRequest || "object" === typeof XMLHttpRequest) && "withCredentials" in new XMLHttpRequest; __sco.support.postmessage = "postMessage" in window; __sco.support.cookies = __sco.storage.cookies(); __sco.support.useragent = navigator.userAgent; __sco.support.protocol = document.location.protocol; __sco.support.useprovider = __sco.support.postmessage; __sco.support.storeprovider = __sco.support.postmessage; __sco.support.ps = !1; __sco.support.earlyie = null != navigator.userAgent.match(/msie(\s+)[5-7]/i); __sco.support.traditional = !1; __sco.support.screeninfo = screen.availHeight + "-" + screen.availWidth + "-" + screen.colorDepth + "-" + screen.height + "-" + screen.width; __sco.support.mobile = null != navigator.userAgent.match(/android|blackberry|symbian|iphone|ipad|mobi|tablet|opera\s+mini/i); __sco.support.touchscreen = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || 0 < navigator.msMaxTouchPoints ? !0 : !1; try { __sco.support.localstorage = "undefined" !== typeof localStorage && "object" === __sco.type(localStorage) && "undefined" !== __sco.type(localStorage.setItem) } catch (b) { __sco.support.localstorage = !1 } try { __sco.support.os = a(__sco.support.ossystems, navigator.userAgent), __sco.support.browser = a(__sco.support.browsers, navigator.userAgent), __sco.support.version = function () { var a = navigator.userAgent.match(/version\/(\d+)/i), b = navigator.userAgent.match(new RegExp(__sco.support.browser + "\\s*\\d+|" + __sco.support.browser + "\\/\\s*\\d+", "i")), c = navigator.userAgent.match(/\bTrident\/\d+.*\s+rv:(\d+)/); return null != c ? c[1] : null != a ? a[1] : b ? b[0].replace(/[\D]/g, "") : "Unknown" }(), "OPR" == __sco.support.browser && (__sco.support.browser = "Opera"), "Trident" == __sco.support.browser && (__sco.support.browser = "MSIE") } catch (c) { } return __sco.support.postmessage || ("" != __sco.config.v2onload || !__sco.config.v2) && __sco.config.fallbackallowed }; __sco.support.updatedoc = function () { with (__sco.support) __scd.m.b = browser, __scd.m.xsr = cors, __scd.m.pm = postmessage, __scd.m.c = cookies, __scd.m.l = localstorage, __scd.m.o = os, __scd.m.p = protocol, __scd.m.v = version, __scd.m.ua = useragent, __scd.m.m = mobile, __scd.m.t = touchscreen, __scd.m.si = screeninfo, __scd.m.ps = ps }; __sco.provider = function (a, b, c, d) { function e(a, b, c) { _scs("#" + k.id).contentWindow.postMessage(SCJSON.stringify({ func: a, args: b, guid: [__sco.config.guid, __sco.config.v1guid], ticket: c }), k.host.match(__sco.config.providerregex)[0]) } function h(a) { a.origin == k.host.match(__sco.config.providerregex)[0] && ("sc_ready" == a.data ? (k.ready = !0, __sco.support.ps = !0, __sco.off("message", h), "undefined" == __sco.type(__sco.management.listening) && (__sco.management.listening = !0, __sco.on("message", __sco.management.react))) : "sc_not_available" == a.data && (__sco.off("message", h), __sco.config.fallbackallowed ? (k.ready = !0, __sco.support.ps = !1, __sco.support.traditional = !0, __sco.config.triggers = ["load"], __sco.config.translatev1 = !0, __sco.config.v1api = __sco.config.v1api.replace("/lite/impression.ashx", "/capture.aspx"), __sco.config.v1completion = __sco.config.v1completion.replace("/lite/impression.ashx", "/pixelcapture.aspx")) : __sco.management.nosupport.call(window, !0)), "function" === __sco.type(c) && (__sco.config.v1 && __sco.config.v2 ? __sco.management.listener.ready && __sco.management.v1listener.ready && c.apply(window, d || []) : c.apply(window, d || []))) } this.set = function (a, b, c) { e("set", [a, b], c) }; this.get = function (a, b, c) { e("get", [a, b], c) }; this.remove = function (a, b) { e("remove", [a], b) }; this.send = function (a, b, c, d, h, k) { e("send", [a, b, c, null, h, k], d) }; this.destroy = function () { _scs("#sc_div_postmessage_parent") && _scs("#" + k.id) && _scs("#sc_div_postmessage_parent").removeChild(_scs("#" + k.id)) }; var k = this; __sco.tickets = "array" === __sco.type(__sco.tickets) ? __sco.tickets : []; if (_scs("#" + b)) k.id = b, k.host = a, k.ready = !0; else { if (!_scs("#sc_div_postmessage_parent")) { var g = document.createElement("div"); g.setAttribute("id", "sc_div_postmessage_parent"); _scs("body")[0].appendChild(g) } g = document.createElement("iframe"); g.setAttribute("src", a); g.setAttribute("target", "_self"); g.setAttribute("id", b); g.style.display = "none"; g.style.height = "0px"; g.style.width = "0px"; _scs("#sc_div_postmessage_parent").appendChild(g); k.id = b; k.host = a; k.ready = !1; __sco.on("message", h) } }; __sco.storage.decode = function (a) { try { return unescape(a) } catch (b) { return a } }; __sco.storage.cookies = function () { var a = !1; try { document.cookie = "sc_test=testvalue;expires=" + __sco.storage.sd(1) + ";path=/", __sco.storage.get("sc_test") && (a = !0) } catch (b) { } finally { return __sco.storage.remove("sc_test"), a } }; __sco.storage.remove = function (a) { __sco.each(document.cookie.split(";"), function (b, c) { var d = __sco.clean(c).match(new RegExp("^" + a + "__(\\d+)\\s*(?=\\=)|^" + a + "(?=\\s*\\=)")); null != d && __sco.storage.set(d[0], "", -1) }); return !0 }; __sco.storage.get = function (a, b) { function c(a) { return a.sort(function (a, b) { return __sco.tonumber(a[1]) < __sco.tonumber(b[1]) ? -1 : __sco.tonumber(b[1]) < __sco.tonumber(a[1]) ? 1 : 0 }) } function d(a) { var b = ""; __sco.each(a, function (a, c) { b += c[0] }); return b } var e = [], h = "", k = "^" + a + "__(\\d+)\\s*(?=\\=)|^" + a + "(?=\\s*\\=)"; try { __sco.each(document.cookie.split(";"), function (a, b) { var c = __sco.clean(b), d = c.match(new RegExp(k)); null != d && e.push([c.substr(c.indexOf("=") + 1), d[1] || 0]) }), h = d(c(e)) } catch (g) { } return "" != h ? (h = __sco.tryparse(__sco.storage.decode(h)), null != h ? h : 1 < arguments.length ? b : !1) : 1 < arguments.length ? b : !1 }; __sco.storage.set = function (a, b, c) { function d(a, b, c) { document.cookie = a + "=" + b + (0 == c ? "" : ";expires=" + __sco.storage.sd(c)) + ";path=/" } try { var e = escape(SCJSON.stringify(b)); c = 2 < arguments.length && "undefined" !== typeof arguments[2] ? c : __sco.config.cookieexpiry; "number" === __sco.type(c) && -1 < c && __sco.storage.remove(a); if (7168 - 2 * document.cookie.length > e.length) if (1800 < e.length) for (var h = Math.ceil(e.length / 1800), k = 0; k < h; k++) d(a + "__" + k.toString(), e.substring(0, 1800), c), e = e.substr(1800); else d(a, e, c) } catch (g) { } }; __sco.storage.sd = function (a) { return (new Date((new Date).setDate((new Date).getDate() + (isNaN(a) ? 30 : Number(a))))).toUTCString() }; __sco.sender.send = function (a, b, c, d, e, h) { function k(a) { var b = { target: {}, type: "timeout" }; b.target.responseText = null; b.target.status = a.status; b.target.statusText = a.statusText; "function" === __sco.type(d) && d.call(window, b) } function g() { var g = new XMLHttpRequest, r = !1; g.open(a, b + ("GET" == a ? "string" == __sco.type(c) ? c : JSON.stringify(c) : ""), !0); __sco.each(e, function (a, b) { "object" == __sco.type(b) && "string" == __sco.type(b.key) && "string" == __sco.type(b.value) && g.setRequestHeader(b.key, b.value) }); "number" == __sco.type(h) && 0 < h && ("ontimeout" in g ? (g.timeout = "number" != __sco.type(h) ? 0 : h, g.ontimeout = k) : (g.onabort = k, setTimeout(function () { g.abort() }, h + 10))); "function" === __sco.type(d) && ("onload" in g ? g.onload = d : g.onreadystatechange = function (a) { r || 4 != g.readyState || (r = !0, d.call(window, a)) }); g.send("GET" != a && __sco.noru(c) ? "string" !== __sco.type(c) ? SCJSON.stringify(c) : c : "") } function m() { try { var d = document.createElement("div"); d.setAttribute("id", "sc_if_post"); _scs("body")[0].appendChild(d); var e = __sco.support.earlyie, h = e ? document.createElement("<iframe name='salecycle>") : document.createElement("iframe"); e || (h.name = "salecycle"); h.style.display = "none"; d.appendChild(h); var g = h.document || h.contentDocument, k = e ? g.createElement("<form name='scPost'>") : g.createElement("form"); k.target = "salecycle"; e || (k.name = "scPost"); k.setAttribute("method", a); k.setAttribute("action", b + ("GET" == a && __sco.noru(c) ? "string" == __sco.type(c) ? c : SCJSON.stringify(c) : "")); if ("POST" == a && (k.setAttribute("encoding", "multipart/form-data"), __sco.noru(c))) if ("string" != __sco.type(c)) { var l = e ? g.createElement("<input name=data>") : g.createElement("input"); l.type = "hidden"; e || (l.name = "data"); l.value = SCJSON.stringify(c); k.appendChild(l) } else __sco.each(c.split("&"), function (a, b) { var c = e ? g.createElement("<input name=" + b.split("=")[0] + ">") : g.createElement("input"); c.type = "hidden"; e || (c.name = b.split("=")[0]); c.value = b.split("=")[1]; k.appendChild(c) }); g.getElementsByTagName("body")[0].appendChild(k); k.submit(); setTimeout(t, 5E3) } catch (m) { } } function t() { null != _scs("#sc_if_post") && _scs("body")[0].removeChild(_scs("#sc_if_post")) } __sco.support.cors ? g() : m() }; __sco.fields = function (a, b) { var c = []; __sco.each(a, function (a, e) { 0 > b.indexOf(a) && c.push(a + "^" + e) }); return c.join("~") }; __sco.format = function (a, b) { var c = ""; __sco.each(a, function (a, e) { c = "undefined" !== typeof e[b] ? c + (e[b] + "|") : c + "|" }); return c }; __sco.translatetov1 = function (a) { try { var b = __sco.escs(__sco.clone(a)), c = b.t.toString().charAt(0); if ("3" == c) return "c=" + b.i1 + "&cc=&ca=0&e=&sfs=ordernumber^" + ("string" == typeof b.s.ordernumber ? b.s.ordernumber : "string" == typeof b.s.ordernum ? b.s.ordernum : "") + "&scs=" + __sco.support.screeninfo + "&b=" + b.s.i + "&ua=" + __sco.hash(navigator.userAgent); var d = [], e = __sco.fields(b.s, __sco.config.sessionfields); __sco.each(__scd.b.i, function (a, b) { d.push(__sco.fields(b, __sco.config.itemfields)) }); return "c=" + b.i1 + "&b=" + b.s.i + "&mid=" + b.s.m + "&scs=" + __sco.support.screeninfo + (__sco.config.geoip ? "&geo=1" : "") + "&n=" + b.c.f + "|" + b.c.l + "|" + b.c.s + "|&t=" + b.c.p.l + "&e=" + b.c.e + "&o=" + b.c.o + "&w=" + b.u + "&st=" + __sco.config.sessiontime + "&ua=" + __sco.hash(navigator.userAgent) + "&bs=1&ctd=&cc=" + (b.cc ? "1" : "0") + "&ca=0&fc=0&y=" + __scd.b.c + "&p=" + __sco.format(b.b.i, "i") + "&i=" + __sco.format(b.b.i, "n") + "&u=" + __sco.format(b.b.i, "u") + "&v1=" + __sco.format(b.b.i, "v") + "&v2=" + b.b.v + "&q1=" + __sco.format(b.b.i, "q") + "&q2=" + __sco.format(b.b.i, "na") + "&q3=" + __sco.format(b.b.i, "nc") + "&d1=" + __sco.format(b.b.i, ["fd"]) + "&d2=" + __sco.format(b.b.i, "td") + "&s=" + c + "&er=" + __sco.errorstov1() + "&cu1=" + __sco.format(b.b.i, "f1") + "&cu2=" + __sco.format(b.b.i, "f2") + "&ifs=" + (0 == d.length ? Array(__scd.b.i.length).join("|") : d.join("|")) + "&sfs=" + e } catch (h) { return "c=" + __sco.config.doc.i1 + "&b=&mid=&scs=" + __sco.support.screeninfo + "&n=||&t=&e=&o=&w=&st=" + __sco.config.sessiontime + "&ua=" + __sco.hash(navigator.userAgent) + "&bs=1&ctd=&cc=&ca=0&fc=0&y=&p=&i=&u=&v1=&v2=&q1=&q2=&q3=&d1=&d2=&s=&er=" + (h.description || "") + "_" + (h.message || "") + "_" + (h.stack || "") + "_" + navigator.userAgent + "&cu1=&cu2=&ifs=&sfs=" } }; __sco.escs = function (a) { if (null == a || "undefined" == typeof a) return ""; if ("date" === __sco.type(a)) return a.toUTCString(); if ("object" == typeof a) return __sco.each(a, function (b, c) { a[b] = __sco.escs(c) }), a; if ("undefined" != typeof a.toString) return a.toString().replace(/&/g, "[sc_amp]").replace(/\?/g, "[sc_qm]").replace(/\+/g, "[sc_pl]").replace(/>/g, "[sc_bc]").replace(/</g, "[sc_bo]").replace(/=/g, "[sc_eq]").replace(/#/g, "[sc_h]") }; __sco.errorstov1 = function () { var a = "", b = __scd.g; 0 < b.length && __sco.each(b, function (b, d) { a += d.e[b].d + "_" + d.e[b].t + "_" + d.e[b].n + "_END" }); return a }; __sco.v1runtime = function (a) { var b = ""; if ("error" == __sco.type(a)) { b = (a.message || "") + "__" + (a.description || "") + "__" + (a.stack || "") + "__" + (a.title || "") + "__"; try { __sco.support && "undefined" !== __sco.type(__sco.support.cors) && __sco.each(__sco.support, function (a, c) { "function" !== __sco.type(c) && "array" !== __sco.type(c) && (b += a + ":" + c + "__") }) } catch (c) { } } else "string" == __sco.type(a) && (b = a); return "c=" + __sco.config.doc.i1 + "&b=&mid=&scs=" + screen.availHeight + "-" + screen.availWidth + "-" + screen.colorDepth + "-" + screen.height + "-" + screen.width + "&n=||&t=&e=&o=&w=&st=1800&ua=" + __sco.hash(navigator.userAgent) + "&bs=1&ctd=&cc=&ca=0&fc=0&y=&p=&i=&u=&v1=&v2=&q1=&q2=&q3=&d1=&d2=&s=1&er=" + b + "&cu1=&cu2=&ifs=&sfs=" }; "object" != typeof SCJSON && (SCJSON = {}); (function () { function a(a) { return 10 > a ? "0" + a : a } function b(a) { return e.lastIndex = 0, e.test(a) ? '"' + a.replace(e, function (a) { var b = g[a]; return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + a + '"' } function c(a, d) { var e, g, p, v, l, u = h, q = d[a]; switch ("function" == typeof m && (q = m.call(d, a, q)), typeof q) { case "string": return b(q); case "number": return isFinite(q) ? String(q) : "null"; case "boolean": case "null": return String(q); case "object": if (!q) return "null"; if (h += k, l = [], "[object Array]" === Object.prototype.toString.apply(q)) { v = q.length; for (e = 0; v > e; e += 1) l[e] = c(e, q) || "null"; return p = 0 === l.length ? "[]" : h ? "[\n" + h + l.join(",\n" + h) + "\n" + u + "]" : "[" + l.join(",") + "]", h = u, p } if (m && "object" == typeof m) for (v = m.length, e = 0; v > e; e += 1) "string" == typeof m[e] && (g = m[e], p = c(g, q), p && l.push(b(g) + (h ? ": " : ":") + p)); else for (g in q) Object.prototype.hasOwnProperty.call(q, g) && (p = c(g, q), p && l.push(b(g) + (h ? ": " : ":") + p)); return p = 0 === l.length ? "{}" : h ? "{\n" + h + l.join(",\n" + h) + "\n" + u + "}" : "{" + l.join(",") + "}", h = u, p } } "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () { return this.valueOf() }); var d = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, h, k, g = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, m; "function" != typeof SCJSON.stringify && (SCJSON.stringify = function (a, b, d) { var e; if (h = "", k = "", "number" == typeof d) for (e = 0; d > e; e += 1) k += " "; else "string" == typeof d && (k = d); if (m = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length)) throw Error("JSON.stringify"); return c("", { "": a }) }); "function" != typeof SCJSON.parse && (SCJSON.parse = function (a, b) { function c(a, d) { var e, h, g = a[d]; if (g && "object" == typeof g) for (e in g) Object.prototype.hasOwnProperty.call(g, e) && (h = c(g, e), void 0 !== h ? g[e] = h : delete g[e]); return b.call(a, d, g) } var e; if (a = String(a), d.lastIndex = 0, d.test(a) && (a = a.replace(d, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) })), /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), "function" == typeof b ? c({ "": e }, "") : e; throw new SyntaxError("JSON.parse"); }) })(); __sco.management.contentLoaded(window, __sco.management.main);


/*




OSR





*/

// add to SCO
__sco.sizeOf = function (obj) {
    var size = 0, key;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

if (!Date.prototype.toJSON) {
    (function () {

        function pad(number) {
            var r = String(number);
            if (r.length === 1) {
                r = '0' + r;
            }
            return r;
        }

        Date.prototype.toJSON = function () {
            return this.getUTCFullYear()
              + '-' + pad(this.getUTCMonth() + 1)
              + '-' + pad(this.getUTCDate())
              + 'T' + pad(this.getUTCHours())
              + ':' + pad(this.getUTCMinutes())
              + ':' + pad(this.getUTCSeconds())
              + '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5)
              + 'Z';
        };

    }());
}

try {
    // AOP.js (meld) library
    /* MIT License (c) copyright 2011-2013 original author or authors */
    (function () { function f(a, b, c) { var d, e; if (3 > arguments.length) { var l; l = a.name || "_"; d = {}; d[l] = a; p(d, l, b); return d[l] } if (v(b)) e = w(a, b, c); else if (d = typeof b, "string" === d) "function" === typeof a[b] && (e = p(a, b, c)); else if ("function" === d) e = w(a, b(a), c); else { d = []; for (l in a) "function" == typeof a[l] && b.test(l) && d.push(p(a, l, c)); e = x(d) } return e } function q(a, b) { var c, d, e; this.target = a; this.func = b; this.aspects = {}; c = this.orig = a[b]; d = this; e = this.advised = function () { function a(b) { var c = h(b); d._callSimpleAdvice("on", g, b); return c } var g, m, f, h, k; this instanceof e ? (g = y(c.prototype), h = function (a) { var b = g; try { s(b, "constructor", { value: c, enumerable: !1 }) } catch (d) { } c.apply(b, a); return b }) : (g = this, h = function (a) { return c.apply(g, a) }); f = t.call(arguments); k = "afterReturning"; m = z({ target: g, method: b, args: f }); try { d._callSimpleAdvice("before", g, f); try { m.result = d._callAroundAdvice(g, b, f, a) } catch (A) { m.result = m.exception = A, k = "afterThrowing" } f = [m.result]; d._callSimpleAdvice(k, g, f); d._callSimpleAdvice("after", g, f); if (m.exception) throw m.exception; return m.result } finally { n = r.pop() } }; s(e, "_advisor", { value: d, configurable: !0 }) } function p(a, b, c) { return (a = q.get(a, b)) && a.add(c) } function w(a, b, c) { var d, e, f; d = []; for (f = 0; e = b[f++];) (e = p(a, e, c)) && d.push(e); return x(d) } function x(a) { return { remove: function () { for (var b = a.length - 1; 0 <= b; --b) a[b].remove() } } } function k(a) { return function (b, c, d) { var e = {}; if (2 === arguments.length) return e[a] = c, f(b, e); e[a] = d; return f(b, c, e) } } function B(a, b) { var c, d, e; for (c in h) if (d = b[c]) (e = a[c]) || (a[c] = e = []), e.push({ aspect: b, advice: d }) } function z(a) { r.push(n); return n = a } f.before = k("before"); f.around = k("around"); f.on = k("on"); f.afterReturning = k("afterReturning"); f.afterThrowing = k("afterThrowing"); f.after = k("after"); f.joinpoint = function () { return n }; f.add = function () { return f.apply(null, arguments) }; q.prototype = { _callSimpleAdvice: function (a, b, c) { var d; this.aspects[a] && (d = h[a], d(this.aspects[a], function (a) { (a = a.advice) && a.apply(b, c) })) }, _callAroundAdvice: function (a, b, c, d) { function e(a, b) { return 0 > a ? d(b) : f(g[a].advice, a, b) } function f(c, d, g) { function l(a) { h++; return e(d - 1, a) } var h, k; h = 0; k = z({ target: a, method: b, args: g, proceed: function () { return l(0 < arguments.length ? t.call(arguments) : g) }, proceedApply: function (a) { return l(a || g) }, proceedCount: function () { return h } }); try { return c.call(a, k) } finally { n = r.pop() } } var g; g = this.aspects.around; return e((g ? g.length : 0) - 1, c) }, add: function (a) { var b, c; b = this; c = b.aspects; B(c, a); return { remove: function () { var d, e, f; f = 0; for (d in h) if (e = c[d]) { f += e.length; for (var g = e.length - 1; 0 <= g; --g) if (e[g].aspect === a) { e.splice(g, 1); --f; break } } f || b.remove() } } }, remove: function () { delete this.advised._advisor; this.target[this.func] = this.orig } }; q.get = function (a, b) { if (b in a) { var c; c = a[b]; if ("function" !== typeof c) throw Error("Advice can only be applied to functions: " + b); c = c._advisor; c || (c = new q(a, b), a[b] = c.advised); return c } }; var n, r, h, t, v, s, y; r = []; t = Array.prototype.slice; v = Array.isArray || function (a) { return "[object Array]" == Object.prototype.toString.call(a) }; var u; a: { try { u = "x" in Object.defineProperty({}, "x", {}); break a } catch (C) { } u = void 0 } s = u ? Object.defineProperty : function (a, b, c) { a[b] = c.value }; y = Object.create || function () { function a() { } return function (b) { a.prototype = b; b = new a; a.prototype = null; return b } }(); h = { before: function (a, b) { for (var c = a.length - 1; 0 <= c; --c) b(a[c]) }, around: !1 }; h.on = h.afterReturning = h.afterThrowing = h.after = function (a, b) { for (var c = 0, d = a.length; c < d; c++) b(a[c]) }; window.meld = f })();


    /* OSR */

    __sco.osr.clientConfigModule = function () {

        meld.after(__sco.osr, "continueClick", function () {

           // after contine click has been registered, redirect to the checkout page

            window.setTimeout(function () { document.location.href = "http://www.shareasale.com/r.cfm?u=1002485&b=308166&m=32800&afftrack=&urllink=www%2Epricefalls%2Ecom%2Fcart"; }, 500);
            

        });
    }

    __sco.osr.config = null;
    __sco.osr.previouslyShown = false;
    __sco.osr.triggerType = null;
    __sco.osr.await = false;
    __sco.osr.exittime = 0;

    /* Configuration objects (main, page, instance) */
    __sco.osr.config = {};
    __sco.osr.activePageConfig = null;
    __sco.osr.activeInstanceConfig = null;

    /* Local template cache */
    __sco.osr.template = {};

    /* Other local vars */
    __sco.osr.debug = false;
    __sco.osr.errorState = false;   // has an exception been thrown? used to handle callbacks
    __sco.osr.exceedsLimit = null;
    __sco.osr.templatesPreloading = false;
    __sco.osr.logFile = [];
    __sco.osr.clientIp = null;
    __sco.osr.lastMove = {
        x: null,
        y: null,
        timestamp: null
    };

    __sco.osr.requestHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    /** Initialization **/
    __sco.osr.init = function () {

        function osrInitComplete() {

            // stop listening for the event once it's been fired
            __sco.off('osrInitComplete', osrInitComplete, _scs('body'));

            // work out the valid configuration to use
            __sco.osr.getActivePageConfig(function (result) {
                if (__sco.osr.errorState) { return; }

                try {
                    if (result == null) { throw "No active page configuration found"; }

                    __sco.osr.activePageConfig = __sco.osr.getConfigByName(result);

                    if (__sco.osr.activePageConfig.limitFrequency == true) {
                        __sco.osr.checkSessionLiteboxesExceedLimit(__sco.osr.activePageConfig, function (result) {
                            if (__sco.osr.errorState) { return; }
                        });
                    }

                    if (__sco.osr.config.initParameter != null && location.search.indexOf(__sco.osr.config.initParameter) == -1) {
                        throw "Top level init parameter defined, does not match href";
                    }

                    __sco.osr.addEvents(__sco.osr.activePageConfig);
                } catch (ex) { }
            });
        }

        // init client config module first
        if (typeof (__sco.osr.clientConfigModule) == 'function') { __sco.osr.clientConfigModule(); }

        __sco.osr.retrieveClientIp();

        // post init, set up triggers, events etc.
        __sco.on('osrInitComplete', osrInitComplete, _scs('body'));

        // retrieve configurations
        __sco.osr.getConfig();
    };

    /** Get main OSR configuration from cache **/
    __sco.osr.getConfig = function () {

        // retrieve config
        var configEndpoint = __sco.osr.getApiHost() + '/osr/' + __sco.config.guid;
        __sco.management.intersend('GET', configEndpoint, '', function (configData) {
            try {
                if (__sco.osr.errorState) { return; }

                // Get the config from the response
                var config = __sco.tryparse(configData.target.responseText);
                if (__sco.type(config) != "object") {
                    return;
                }

                // Config is good
                __sco.osr.config = config;

                // Check if the config is enabled
                if (typeof (__sco.osr.config.enabled) != "undefined" && __sco.osr.config.enabled == false) { throw "Config is disabled."; }

                // foreach config, retrieve template
                var templateIds = [];

                // pages
                for (var ix = 0; ix <= __sco.osr.config.pageConfigs.length - 1; ix++) {

                    __sco.osr.config.pageConfigs[ix] = __sco.osr.config.pageConfigs[ix];
                    var pageConfig = __sco.osr.config.pageConfigs[ix];
                    if (pageConfig.enabled == false) { continue; }

                    // instances
                    if (pageConfig.pageInstances == null) { throw "No page instances defined"; }

                    for (var ixz = 0; ixz <= pageConfig.pageInstances.length - 1; ixz++) {

                        var instanceConfig = pageConfig.pageInstances[ixz];

                        var keyword = __sco.osr.getTemplateKeyword(instanceConfig); // default or meld defined template
                        var templateId = __sco.osr.getActiveTemplateIdByKeyword(keyword, instanceConfig);

                        if (templateIds.indexOf(templateId) == -1) { templateIds.push(templateId); }
                    }
                }

                // retrieve those templates
                __sco.osr.preloadTemplates(templateIds);

                // check that all template IDs have been loaded before firing initComplete
                __sco.osr.monitorTemplatesLoaded(templateIds, true);
            }
            catch (ex) { if (__sco.osr.debug) { throw ex; } }
        }, __sco.osr.requestHeaders, true);
    };

    /** Preload templates into local storage & instance vars **/
    __sco.osr.preloadTemplates = function (templateIds) {

        // set flag so we know template load is in progress
        __sco.osr.templatesPreloading = true;

        __sco.each(templateIds, function (ix, val) {
            var templateKey = 'template_' + templateIds[ix];

            // retrieve template & urldecode
            __sco.management.intersend('GET', __sco.osr.getApiHost() + '/litebox/template/' + __scd.i + '/' + templateIds[ix], '', function (templateData) {
                try {
                    if (__sco.osr.errorState) { return; }

                    templateData = SCJSON.parse(templateData.target.responseText);

                    __sco.osr.template[templateKey] = {};
                    __sco.osr.template[templateKey].html = (typeof (templateData.html) != "undefined") ? decodeURIComponent(templateData.html.replace(/\+/g, " ")) : "";
                    __sco.osr.template[templateKey].stylesheet = (typeof (templateData.stylesheet) != "undefined") ? decodeURIComponent(templateData.stylesheet.replace(/\+/g, " ")) : "";
                } catch (ex) { if (__sco.osr.debug) { throw ex; } }
            });

        });
    }

    /** Monitor state of templates expected vs loaded **/
    __sco.osr.monitorTemplatesLoaded = function (templateIds, fireEvent) {
        var tmplCheckInt = setInterval(function () {
            var templatesReady = true;
            __sco.each(templateIds, function (ix, val) {
                if (typeof (__sco.osr.template["template_" + val]) == "undefined") {
                    templatesReady = false;
                }
            });

            if (templatesReady) {
                clearInterval(tmplCheckInt);
                if (fireEvent) { __sco.osr.fireEvent(_scs('body')[0], 'osrInitComplete'); }
                __sco.osr.templatesPreloading = false;
            }
        }, 500);
    }

    /** Check to ensure that keyword hasn't changed, if it has, preload necessary template **/
    __sco.osr.monitorTemplatesByKeyword = function () {
        var monitorCheckInt = setInterval(function () {
            var keyword = __sco.osr.getTemplateKeyword();
            var active = __sco.osr.getActiveTemplateIdByKeyword(keyword);
            var templateKey = "template_" + active;

            // missing template found, preload
            if (typeof (__sco.osr.template[templateKey]) == "undefined") { __sco.osr.preloadTemplates(templateIds); }
        }, 1000);
    }

    /** Get the instance config by calculating split test result **/
    __sco.osr.getActiveInstanceConfig = function () {

        var pageConfig = __sco.osr.activePageConfig;
        var instances = pageConfig.pageInstances;
        var split = pageConfig.splitTests;
        var splitCount = __sco.sizeOf(split);

        var instanceByInstanceId = function (instanceId) {
            for (var i = 0; i <= __sco.sizeOf(instances) ; i++) {
                var cur = instances[i];
                if (cur["id"] == instanceId) { return cur; }
            }
            return null;
        };

        // how many split tests defined
        if (splitCount == 0 || split.splitsEnabled == false) {
            if (__sco.sizeOf(instances) > 1) {
                throw "No split test defined but more than 1 instance configured.";
            }
            return instances[0];
        }

        // assign each split test a number space between (last number) and last number + split percentage
        if (splitCount > 0) {
            var roll = Math.floor((Math.random() * 100) + 1); // roll a random between 1 and 100%
            var total = 0, last = 0;
            for (var key in split) {
                var val = split[key];
                total = total + val;

                if (roll > last && roll <= total) {
                    var instance = instanceByInstanceId(key);
                    if (instance == null) { throw "Unable to retrieve instance by id " + key; }
                    return instance;
                }
                last = val;
            }
            if (total > 100) { throw "Split tests defined total more than 100%"; }
        }
    }

    /** get client IP address from local storage or API endpoint **/
    __sco.osr.retrieveClientIp = function () {
        __sco.osr.interget('clientipa', function (data) {
            if (__sco.osr.errorState) { return; }
            try {
                // Data is not null and is less than one day old
                if (!!data && !!data.timestamp && data.timestamp > (new Date().getTime() - 86400000)) {
                    // Use stored IP
                    __sco.osr.clientIp = data.ip;
                } else {
                    // Get IP from server and put in storage
                    __sco.management.intersend('GET', __sco.osr.getApiHost() + "/ipaddress", null, function (apiResponse) {
                        if (__sco.osr.errorState) { return; }
                        try {
                            var ip = apiResponse.target.responseText.replace(/\"/g, "");
                            var ipObj = {
                                "timestamp": new Date().getTime(),
                                "ip": ip
                            };
                            __sco.osr.clientIp = ip;
                            __sco.osr.interset("clientipa", ipObj);
                        } catch (ex) { if (__sco.osr.debug) { throw ex; } }
                    });
                    return;
                }
            } catch (ex) { if (__sco.osr.debug) { throw ex; } }
        }, null);
    }

    /** find a configuraiton that is enabled, IP matches, not too many shows & on a valid page **/
    __sco.osr.getActivePageConfig = function (callback) {
        if (__sco.osr.activePageConfig != null) { callback(__sco.osr.activePageConfig); }

        for (var ix in __sco.osr.config.pageConfigs) {
            var configObj = __sco.osr.config.pageConfigs[ix];
            var name = __sco.osr.config.pageConfigs[ix].name;

            // enabled check
            if (configObj.enabled == false) { continue; } // sco.each continue

            // valid page check
            if (configObj.validPages != null && configObj.validPages.length > 0 && __sco.osr.validPage(configObj) == false) { continue; }

            // acl check
            if (typeof (configObj.aclMode) != "undefined" && configObj.aclMode != null && configObj.aclMode.toLowerCase() != "disabled" &&
                __sco.osr.validateAclMode(__sco.osr.getIpAddress(), configObj) == false) { continue; }

            callback(name); return;
        }
        callback(null);
    };

    /** Retrieve the current users IP address **/
    __sco.osr.getIpAddress = function () {
        return __sco.osr.clientIp || "unknown";
    };

    /** Validate that either the ACL mode is disabled, the current user is whitelisted or the current user is not blacklisted by IP **/
    __sco.osr.validateAclMode = function (ipAddress, configObj) {

        if (ipAddress == "unknown") { throw "Unable to retrieve client IP address - aborting"; }

        if (configObj.aclMode.toLowerCase() == "whitelist") {
            return (configObj.ipAddresses != null && configObj.ipAddresses.indexOf(ipAddress) > -1);
        }
        else if (configObj.aclMode.toLowerCase() == "blacklist") {
            return (configObj.ipAddresses == null || configObj.ipAddresses.indexOf(ipAddress) == -1);
        }

        return true;
    };

    /** Record that an OSR has been shown **/
    __sco.osr.recordOsrShowInStorage = function () {

        __sco.osr.interget("osrshows", function (data) {
            try {
                if (__sco.type(data) != "array") {
                    data = [];
                }

                var newRecord = {
                    "ts": new Date().toJSON(),
                    "pi": __sco.osr.activePageConfig.id,
                    "si": __scd.s.i
                };

                data.push(newRecord);
                __sco.osr.interset("osrshows", data);

            } catch (ex) { if (__sco.osr.debug) { throw ex; } }
        }, []);

        return true;
    }

    /** This is here as an extension point only (always returns default value), and should be overridden in a client module **/
    __sco.osr.getTemplateKeyword = function (instance) {

        // get instance config
        var instanceConfig = instance || __sco.osr.activeInstanceConfig;
        if (instanceConfig == null || typeof (instanceConfig.filters) == "undefined" || typeof (instanceConfig.defaultFilter) == "undefined") {
            return "default";
        }

        // return default value
        return instanceConfig.defaultFilter; // default value
    }

    /** Check that a limit on the number of OSRs shown hasn't been exceeded for a given configuration **/
    __sco.osr.checkSessionLiteboxesExceedLimit = function (configObj, callback) {

        if (typeof (configObj) == "undefined" || typeof (configObj["limitFrequency"]) == "undefined" || configObj["limitFrequency"] == false) { callback(false); }

        var unit = configObj["frequencyUnit"].toLowerCase();
        var seekFrom = new Date();

        switch (unit) {
            case 'day':
                seekFrom.setDate(seekFrom.getDate() - 1); break;
            case 'week':
                seekFrom.setDate(seekFrom.getDate() - 7); break;
            case 'month':
                seekFrom.setMonth(seekFrom.getMonth() - 1); break;
            case 'year':
                seekFrom.setYear(seekFrom.getYear() - 1); break;
            case 'session':
                break;
            default:
                return false;
        }

        __sco.osr.interget("osrshows", function (showData) {
            if (__sco.osr.errorState) { return; }

            try {
                if (typeof (showData) != "undefined" && showData.length && showData.length > 0) {
                    __sco.each(showData, function (ix, val) {

                        if (unit.toLowerCase() == "session") {
                            if (typeof (val) == "object" && typeof (val["si"]) != "undefined") {
                                if (val["si"].length > 0 && val["si"] == __scd.s.i) {
                                    if (__sco.osr.debug) {
                                        console.log("OSR surpressed due to per session rule. Already shown for " + val["si"]);
                                    }
                                    __sco.osr.exceedsLimit = true;
                                    callback(true);
                                    return;
                                }
                            }
                        }
                        else {
                            if (val["pi"] == __sco.osr.activePageConfig.id) {
                                var lastShow = new Date(val["ts"]);

                                if (typeof (lastShow) != "undefined" && lastShow > seekFrom) {
                                    if (__sco.osr.debug) {
                                        console.log("OSR surpressed due to per " + unit + " rule. Last shown " + lastShow);
                                    }
                                    __sco.osr.exceedsLimit = true;
                                    callback(true);
                                    return; // break __sco.each loop
                                } else {
                                    __sco.osr.exceedsLimit = false;
                                    callback(false);
                                    return; // break __sco.each loop
                                }
                            }
                        }
                    });
                }
            } catch (ex) { if (__sco.osr.debug) { throw ex; } }
        });
    }

    /** Retrieve a specific configuration by name **/
    __sco.osr.getConfigByName = function (name) {
        for (var i = 0; i <= __sco.osr.config.pageConfigs.length - 1; i++) {
            if (__sco.osr.config.pageConfigs[i].name == name) { return __sco.osr.config.pageConfigs[i]; } //@TODO array filter needed
        }
        return null;
    }

    /** Retrieve a template by given ID **/
    __sco.osr.getTemplateById = function (id) {
        return (typeof (id) != "undefined" && typeof (__sco.osr.template["template_" + id]) != "undefined") ? __sco.osr.template["template_" + id] : null;
    }

    /** Retrieve a template for the current OSR config by keyword **/
    __sco.osr.getActiveTemplateIdByKeyword = function (keyword, instance) {

        if (instance != null && typeof (instance) == "object") { instanceConfig = instance; } else { instanceConfig = __sco.osr.activeInstanceConfig; }

        if (typeof (instanceConfig) == "undefined" || typeof (instanceConfig.filters) == "undefined") { throw "Unable to get active template by keyword - filters not defined"; }

        var retVal = null;
        __sco.each(instanceConfig.filters, function (ix, val) {
            var itemObj = instanceConfig.filters[ix];
            if (itemObj.keyword == keyword) {
                retVal = itemObj.templates.osr;
            }
        });

        if (retVal == null) {
            throw "Unable to get active template - keyword not found in config: " + keyword;
        }

        return retVal;
    }

    /**********************
     *  Overridable logic *
     **********************/

    /** Do some final checks before showing OSR **/
    __sco.osr.preShowChecks = function () {

        // check show limit not exceeded
        var instanceConfig = __sco.osr.activePageConfig;
        if (instanceConfig.limitFrequency && __sco.osr.exceedsLimit) {
            return false;
        }

        return (!__scd.b.i.length == 0) && (__scd.g.length == 0); // basket must not be empty
    };

    /** Are we on a valid page? **/
    __sco.osr.validPage = function (configObj) {
        if (configObj.validPages.length == 0) { return false; }

        for (var i = 0; i <= configObj.validPages.length - 1; i++) {
            var matches = null;
            if (configObj.validPages[i] instanceof RegExp) { matches = document.location.href.match(configObj.validPages[i]); }
            else { matches = document.location.href.match(new RegExp(configObj.validPages[i])); }
            if (matches != null && matches.length > 0) { return true; }

        }
        return false;
    };

    /**  Get email address - no regexp validation, see: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript **/
    __sco.osr.scrapeEmailAddress = function () {
        var emailField;
        emailField = _scs(__sco.osr.activePageConfig.selectors.emailCaptureField);
        emailField = __sco.isArray(emailField) ? emailField[0] : emailField;

        if (emailField == null || emailField.length == 0) { throw "Unable to retrieve email field, selector is " + __sco.osr.activePageConfig.selectors.emailCaptureField; }

        var emailAddress = __sco.osr._trim(emailField.value);
        if (emailAddress.length == 0) {
            alert("Please enter an email address");
            return false;
        }
        return emailAddress;
    }

    /** Can we show the email capture template **/
    __sco.osr.canShowEmailCapture = function () {
        return (_scs(__sco.osr.activePageConfig.selectors.emailCaptureField) != null && _scs(__sco.osr.activePageConfig.selectors.saveButton) != null);     // email capture field and save button must exist
    }

    /** Can we show the recommendations template **/
    __sco.osr.canShowRecommendations = function () {
        return (_scs(__sco.osr.activePageConfig.selectors.productContainer) != null && _scs(__sco.osr.activePageConfig.selectors.productTemplate) != null); // recommendations template and target container must exist
    }

    /** Can we show the trends template **/
    __sco.osr.canShowTrends = function (data) {
        return (_scs(__sco.osr.activePageConfig.selectors.trendContainer) != null && _scs(__sco.osr.activePageConfig.selectors.trendTemplate) != null) && data != null && data.length > 0 && (data[0].BasketCount > 1 || data.length > 1);     // trends template and target container must exist
    }

    /***************
     *  Rendering  *
     ***************/

    /** Set up the page with the template & css **/
    __sco.osr.preRender = function () {

        var keyword = __sco.osr.getTemplateKeyword();
        var templateId = __sco.osr.getActiveTemplateIdByKeyword(keyword);

        if (templateId == null) { throw "Unable to retrieve active template by keyword: " + keyword; }

        var template = __sco.osr.getTemplateById(templateId);
        if (template == null) { throw "Unable to retrieve template id " + templateId; }

        var styleElements = _scs('style.sc-lb');
        var overlayElement = _scs('div.osr-overlay');

        // disable & remove existing elements if they exist
        __sco.attr(styleElements, 'disabled', 'disabled');
        __sco.empty(_scs('div.osr-overlay'));
        __sco.remove(overlayElement);

        // apply stylesheets
        var lbStyle = document.createElement('style');
        var lbHiddenStyle = document.createElement('style');
        _scs('head')[0].appendChild(lbStyle);
        _scs('head')[0].appendChild(lbHiddenStyle);

        if (__sco.osr.isEarlyIe()) {
            lbStyle.styleSheet.cssText = template.stylesheet;
            lbHiddenStyle.styleSheet.cssText = ".hidden { display: none; }";
        }
        else {
            lbStyle.innerHTML = template.stylesheet;
            lbHiddenStyle.innerHTML = ".hidden { display: none; }";
        }

        // append container to document in a hidden state
        var lbContainer = document.createElement('div');
        lbContainer.innerHTML = template.html;
        lbContainer.className = 'sc-lb hidden';
        _scs('body')[0].appendChild(lbContainer);

        lbStyle.className = 'sc-lb';
    };

    /** Create overlay **/
    __sco.osr.renderOverlay = function () {
        var styleElement = document.createElement('style');
        styleElement.className = "sc-lb";
        styleElement.type = 'text/css';
        _scs('head')[0].appendChild(styleElement);

        var cssStyleContent = "div.osr-overlay { background: rgba(0,0,0,0.7); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#bf45484d', endColorstr='#bf000000',GradientType=0 ); width: 100%; height: 100%; z-index: 99999; top: 0; left: 0; position:fixed; } div.osr-overlay.hidden { display: none; } div.osr-content { margin: 0 auto; position: relative; width: 770px; background-color: #FFFFFF; top: 10% }";
        if (__sco.osr.isEarlyIe()) { styleElement.styleSheet.cssText = cssStyleContent; }
        else { styleElement.appendChild(document.createTextNode(cssStyleContent)); }

        var overlayElement = document.createElement('div');
        overlayElement.className = 'osr-overlay hidden';

        var contentElement = document.createElement('div');
        contentElement.className = 'osr-content';
        overlayElement.appendChild(contentElement);

        // insert contentHtml into body and css into head
        _scs('head')[0].appendChild(styleElement);
        _scs('body')[0].appendChild(overlayElement);
    }

    /** Render the content, primarily here as a hook for meld **/
    __sco.osr.renderContent = function (content) {
        var contentEl = _scs('div.osr-content')[0];
        __sco.empty(contentEl);

        // add content
        if (__sco.isDomNode(content) == false) { contentEl.innerHTML = content; }
        else { contentEl.appendChild(content); }
    }

    /** Show recommendations content area **/
    __sco.osr.showRecommendationsContent = function (recommendations) {
        var productTargetEl = _scs(__sco.osr.activePageConfig.selectors.productContainer);
        productTargetEl = __sco.isArray(productTargetEl) ? productTargetEl[0] : productTargetEl;

        var productTemplate = _scs(__sco.osr.activePageConfig.selectors.productTemplate);
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
        var trendTargetEl = _scs(__sco.osr.activePageConfig.selectors.trendContainer);
        trendTargetEl = __sco.isArray(trendTargetEl) ? trendTargetEl[0] : trendTargetEl;

        var trendTemplate = _scs(__sco.osr.activePageConfig.selectors.trendTemplate);
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

        // render
        if (__sco.osr.previouslyShown == false) { __sco.osr.renderOverlay(); }
        __sco.osr.renderContent(config.message);

        // timeout
        if (typeof (config.timeout) != 'undefined') {
            setTimeout(__sco.osr.unblockUI, config.timeout);
        }
        __sco.removeClass(_scs('div.osr-overlay'), 'hidden');
    };

    /*******************
     *  Event Handlers *
     *******************/

    /** Add events **/
    __sco.osr.addEvents = function (configObj) {

        var lastEvent = "", quickmove = false;
        function ieHandle(ev) {
            // Any mouseover must disable, also set event type
            if (ev.type == "mouseover") {
                __sco.osr.config.enabled = false;
                lastEvent = ev.type;
            }
            // Just register the event to stop the click handler firing off
            if (ev.type == "click") {
                if (lastEvent == "mouseover") {
                    lastEvent = ev.type;
                }
                // If last event was change or blur, this means select has closed
                if (lastEvent == "change" || lastEvent == "blur") {
                    __sco.osr.config.enabled = true;
                }
                lastEvent = ev.type;
            }
            // Mouseout following a mouseover just means moved over - re-enable
            if (ev.type == "mouseout") {
                if (lastEvent == "mouseover") {
                    __sco.osr.config.enabled = true;
                    quickmove = true;
                }
                // Click following mouseout means selected drop down - make sure it's still disabled
                if (lastEvent == "click") {
                    __sco.osr.config.enabled = false;
                }
                lastEvent = ev.type;
            }
            // Just update the event for reference, handling can be done in click handler
            if (ev.type == "blur" || ev.type == "change") {
                if (lastEvent == "mouseout" && ev.type == "blur") {
                    __sco.osr.config.enabled = true;
                }
                else {
                    lastEvent = ev.type;
                }
            }
        }

        function ieFire() {
            if (quickmove) {
                quickmove = false;
            } else {
                __sco.osr.triggerType = "exitintent";
                __sco.osr.show();
            }
        }

        // inactivity
        if (configObj.enableInactivityTimer == true) {
            setInterval(function () {
                if (__sco.osr.previouslyShown == false) { return; }
                if (__sco.osr.checkForActivity() == true) {
                    __sco.osr.triggerType = "inactivity";
                    __sco.osr.show();
                }
            }, 1000);

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

            // reset inactivity timeout on keyboard actions
            __sco.on('keydown', function (ev) {
                __sco.osr.lastMove.timestamp = new Date().getTime();
            }, document);
        }

        // exit intent
        if (configObj.enableExitFrame == true) {
            __sco.on('mouseout', function (ev) {
                if ((ev.relatedTarget || ev.toElement) == this.parentNode) {
                    if (__sco.osr.previouslyShown == true) {
                        return false;
                    }

                    // check OSR fired not fired from scrollbar
                    var dimensions = __sco.osr.getViewportDimensions();
                    var x = ev.x || ev.clientX, y = ev.y || ev.clientY;

                    if (x >= dimensions.width && y >= 0) {
                        return false;
                    }

                    if (__sco.support.browser == "MSIE") {
                        setTimeout(ieFire, 20);
                    } else {
                        if (y < 2 || x < 2 || y > (dimensions.height - 2)) {
                            __sco.osr.triggerType = "exitintent";
                            __sco.osr.show();
                        }
                    }
                }
            }, document);

            if (__sco.support.browser == "MSIE" && _scs("select")) {
                __sco.on("blur", ieHandle, _scs("select"));
                __sco.on("click", ieHandle, _scs("select"));
                __sco.on("change", ieHandle, _scs("select"));
                __sco.on("mouseout", ieHandle, _scs("select"));
                __sco.on("mouseover", ieHandle, _scs("select"));
            }
        }

    };

    /** Bind events to dynamically generated content **/
    __sco.osr.rebindTemplateEvents = function () {

        // bind click sink on litebox container, close & continue buttons
        var lbContainer = _scs(__sco.osr.activePageConfig.selectors.liteboxContainer);
        if (lbContainer == null) { throw "Unable to find litebox container, selector is " + __sco.osr.activePageConfig.selectors.liteboxContainer; }

        __sco.on('click', function (ev) { __sco.osr.stopPropagation(ev); }, lbContainer);
        // bind close & continue buttons
        if (_scs('div.osr-overlay') != null) {
            if (_scs(__sco.osr.activePageConfig.selectors.closeButton) != null) {
                __sco.on('click', __sco.osr.closeClick, [_scs(__sco.osr.activePageConfig.selectors.closeButton), _scs('div.osr-overlay')]);
            } else {
                __sco.on('click', __sco.osr.closeClick, _scs('div.osr-overlay'));
            }

            if (_scs(__sco.osr.activePageConfig.selectors.continueButton)) {
                __sco.on('click', __sco.osr.continueClick, _scs(__sco.osr.activePageConfig.selectors.continueButton));
            }

            // email capture button
            var saveButton;
            if (__sco.osr.canShowEmailCapture() == true && __sco.osr.activeInstanceConfig.showEmailCapture == true && (saveButton = _scs(__sco.osr.activePageConfig.selectors.saveButton)) != null) {
                __sco.on('click', __sco.osr.emailBasketClick, __sco.isArray(saveButton) ? saveButton[0] : saveButton);
            }
        }
    };

    /**  Continue click **/
    __sco.osr.continueClick = function (ev) {
        __sco.osr.unblockUI();

        var endpoint = __sco.osr.getApiHost() + '/litebox/continue/' + __scd.i + '/' + __scd.s.i;
        __sco.management.intersend('POST', endpoint, __sco.osr.getConfigRequest());
        __sco.osr.stopPropagation(ev);
    }

    /** Close click **/
    __sco.osr.closeClick = function (ev) {
        __sco.osr.unblockUI();

        var endpoint = __sco.osr.getApiHost() + '/litebox/close/' + __scd.i + '/' + __scd.s.i;
        __sco.management.intersend('POST', endpoint, __sco.osr.getConfigRequest());
        __sco.osr.stopPropagation(ev);
    }

    /** Email basket click **/
    __sco.osr.emailBasketClick = function () {

        if ((emailAddress = __sco.osr.scrapeEmailAddress()) == false) { return; }
        __sco.osr.unblockUI();

        var req = __sco.extend({ 'emailAddress': emailAddress, 'keyword': __sco.osr.getTemplateKeyword() }, __sco.osr.getConfigRequest());
        var endpoint = __sco.osr.getApiHost() + '/litebox/emailbasket/' + __sco.config.guid + '/' + __scd.s.i;

        __sco.management.intersend('POST', endpoint, SCJSON.stringify(req), function () {
            if (__sco.osr.errorState) { return; }

            if (__sco.osr.activePageConfig.selectors.emailBasketConfirmationTemplate != null) {
                __sco.osr.blockUI({
                    message: _scs(__sco.osr.activePageConfig.selectors.emailBasketConfirmationTemplate),
                    timeout: __sco.config.emailBasketConfirmationTimeout
                });
            }
            __scd.cc = false;
            __sco.management.setstatus(499, __sco.management.sendtoapi);

            // update email address in scd
            if (__scd.c.e.trim().length == 0) { __scd.c.e = emailAddress; }

        }, __sco.osr.requestHeaders);
    }

    /****************
     * CORE METHODS * 
     ****************/

    /** Show the litebox, optionally provide force parameter to override previouslyShown check, used in LB preview **/
    __sco.osr.show = function (force) {

        // get active instance config
        __sco.osr.activeInstanceConfig = __sco.osr.getActiveInstanceConfig();

        var endpoint = __sco.osr.getApiHost() + '/osr/' + __sco.config.guid + '/' + __scd.s.i;
        var controlGroup = (typeof (__sco.osr.config.controlGroup) != "undefined" && __sco.osr.config.controlGroup != null && __sco.osr.config.controlGroup.enabled == true);

        // pre show checks
        if (typeof (force) == "undefined" || force == false) {
            if (__sco.osr.previouslyShown == true || __sco.osr.config.enabled == false || __sco.osr.errorState == true || __sco.osr.preShowChecks() != true) {
                return;
            }
        }

        // control group will show OSR to a given percentage of users, and hide it for others. will always record with backend.
        if (controlGroup == true) {
            var roll = Math.floor((Math.random() * 100) + 1);
            if (roll <= __sco.osr.config.controlGroup.percentage) {
                var cgReq = __sco.extend({ 'basketContents': __scd.b.i, 'triggerType': __sco.osr.triggerType, 'cg': true }, __sco.osr.getConfigRequest());
                __sco.management.intersend('POST', endpoint, SCJSON.stringify(cgReq), function (apiResponse) { }, __sco.osr.requestHeaders);
                __sco.osr.previouslyShown = true;
                __sco.osr.recordOsrShowInStorage();
                return;
            }
        }

        var basketRequest = __sco.extend({ 'basketContents': __scd.b.i, 'triggerType': __sco.osr.triggerType, 'cg': false }, __sco.osr.getConfigRequest());

        // inject template & css into the page
        __sco.osr.preRender();

        // if data is required from the server, perform some checks and then show OSR
        if (__sco.osr.config.showRecommendations == true || __sco.osr.config.showBasketTrends == true) {
            if (!__sco.osr.await) {
                __sco.osr.await = true;

                __sco.management.intersend('POST', endpoint, SCJSON.stringify(basketRequest), function (apiResponse) {
                    if (__sco.osr.errorState) { return; }

                    try {
                        // Try get response object
                        var response = __sco.tryparse(apiResponse.target.responseText);
                        if (__sco.type(response) != "object") {
                            return;
                        }

                        // Make sure the response matches with what we expect
                        if (__sco.osr.activeInstanceConfig.showRecommendations == true && __sco.osr.canShowRecommendations(response.Recommendations) == false) { return; }
                        if (__sco.osr.activeInstanceConfig.showBasketTrends == true && __sco.osr.canShowTrends(response.Trends) == false) { return; }

                        // render sections
                        __sco.osr._render({
                            'recommendations': response.Recommendations != null ? response.Recommendations : [],
                            'trends': response.Trends != null ? response.Trends : []
                        });
                    } catch (ex) { if (__sco.osr.debug) { throw ex; } }
                }, __sco.osr.requestHeaders);
            }
        }
        else {
            // no recommendations or trends required, just render when call to backend has been made, no need to wait for result
            __sco.management.intersend('POST', endpoint, SCJSON.stringify(basketRequest), function (apiResponse) { }, __sco.osr.requestHeaders);
            __sco.osr._render([], []);
        }
    };

    /** Check if mouse has moved in the configured time interval **/
    __sco.osr.checkForActivity = function () {
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
        var container = _scs(__sco.osr.activePageConfig.selectors.liteboxContainer);

        __sco.osr.showRecommendationsContent(viewModel.recommendations);
        __sco.osr.showTrendsContent(viewModel.trends);

        __sco.osr.blockUI({ message: __sco.isArray(container) ? container[0] : container });
        __sco.osr.rebindTemplateEvents();
        __sco.osr.sendPing();
        __sco.osr.previouslyShown = true;
        __sco.osr.recordOsrShowInStorage();
    };

    /** return API environment from v2api property **/
    __sco.osr.getApiHost = function () {
        var parser = document.createElement('a');
        parser.href = __sco.config.v2api;
        var host = parser.protocol + "//" + parser.host;

        return host;
    }

    /** If we don't have local storage, need to send a fingerprint along with the request **/
    __sco.osr.getConfigRequest = function () {
        var req = {
            'pid': __sco.osr.activePageConfig.id,
            'si': __scd.m.si,
            'ua': __scd.m.ua,
            'keyword': __sco.osr.getTemplateKeyword()
        };

        // instance id may not be available yet
        if (typeof (__sco.osr.activeInstanceConfig) != "undefined" && __sco.osr.activeInstanceConfig != null && typeof (__sco.osr.activeInstanceConfig.id) != "undefined") {
            req['iid'] = __sco.osr.activeInstanceConfig.id;
        }

        return req;
    }

    /** Send a ping to the backend to indicate OSR has actually been rendered **/
    __sco.osr.sendPing = function () {
        var endpoint = __sco.osr.getApiHost() + '/litebox/ping/' + __scd.i + '/' + __scd.s.i;
        __sco.management.intersend('POST', endpoint, SCJSON.stringify(__sco.osr.getConfigRequest()), function (apiResponse) { }, __sco.osr.requestHeaders);
    }

    /** Camelcase from DTO **/
    __sco.osr._toCamelCase = function (obj) {
        var newObj = {};
        __sco.each(obj, function (ix, key) {
            if (obj.hasOwnProperty(key) == true) {
                var newKey = key;
                newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);

                if (typeof (obj[key]) == "object") {
                    newObj[newKey] = __sco.osr.toCamelCase(obj[key]);
                } else {
                    newObj[newKey] = obj[key];
                }
            }
        });
        return newObj;
    };

    __sco.osr._trim = function (str) {
        return str.replace(/^\s+|\s+$/g, '');
    }

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

    /** Log errors, either to console, endpoint or silently depending on config **/
    __sco.osr.log = function (category, level, message) {
        var logLine = ("[{0}] [{1}] {2}"
            .replace("{0}", category)
            .replace("{1}", level)
            .replace("{2}", message));

        if (__sco.osr.config.debug == true) {
            __sco.osr.logFile.push(logLine);
        }
    }

    /** Placeholder - no endpoint yet for OSR logging **/
    __sco.osr.sendLog = function () {
        return true;
    }

    /*******************
     * UTILITY METHODS *
     *******************/

    /** Fire an event **/
    __sco.osr.fireEvent = function (el, eventName, data) {
        var event;

        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent(eventName, true, true);
        } else {
            event = document.createEventObject();
            event.eventType = eventName;
        }
        event.eventName = eventName;
        event.data = data;

        if (document.createEvent) {
            el.dispatchEvent(event);
        } else {
            el.fireEvent("on" + event.eventType, event);
        }
    }

    /** An intermediate callback function for getting from storage, abstracts away the use of the provider **/
    __sco.osr.interget = function (name, callback, def) {
        try {
            var defType = __sco.type(def);
            if (defType === "null" || defType === "undefined") {
                def = false;
            }

            var ticket = __sco.tickets.push(callback);
            __sco.management.listener.get(name, def, ticket - 1);
        } catch (ex) { if (__sco.osr.debug) { throw ex; } }
    }

    //* An intermediate set function, abstracts use of the provider if needed **/
    __sco.osr.interset = function (name, toset, callback) {
        try {
            var ticket = -1;
            if (__sco.type(callback) === "function") {
                ticket = __sco.tickets.push(callback);
            }
            __sco.management.listener.set(name, toset, ticket - 1);
        } catch (ex) { if (__sco.osr.debug) { throw ex; } }
    }

    /** Detect early IE versions **/
    __sco.osr.isEarlyIe = function () {
        var matches = navigator.userAgent.match(/msie(\s+)[7-9]/i);
        return matches != null && matches.length > 0;
    }

    /** Prevent default cross-browser **/
    __sco.osr.preventDefault = function (ev) {
        if (__sco.support.browser == 'MSIE' && typeof (ev.preventDefault) == 'undefined') { ev.returnValue = false; }
        else { ev.preventDefault(); }
    }

    /**  Stop propagation cross-browser **/
    __sco.osr.stopPropagation = function (ev) {
        if (__sco.support.browser == 'MSIE') { ev.cancelBubble = true; }
        else { ev.stopPropagation(); }
    }

    /***************
     *     INIT    *
     ***************/
    __sco.osrInt = typeof __sco.osrInt === "number" ? __sco.osrInt : null;
    if (__sco.config.osr && __sco.osrInt == null) {
        __sco.osrInt = setInterval(function () {
            if (typeof (__scd) != 'undefined' && typeof (__scd.c) != 'undefined' && typeof (__scd.b) != 'undefined') {
                clearInterval(__sco.osrInt);
                __sco.osr.init();
            }
        }, 500);
    }
}
catch (ex) {

    if (__sco.osr.debug == true) {
        console.log("Caught exception in debug mode", ex);
    }

    __sco.osr.errorState = true;

    // report to v2
    __sco.osr.log("exception", "fatal", ex);
    __sco.osr.sendLog();
    // report to v1
    __sco.management.intersend("POST", __sco.config.v1errorapi, __sco.v1runtime(ex));
}

__sco.osr.clientConfigModule = function () {
    meld.around(__sco.osr, "getTemplateKeyword", function (methodCall) {
        return "default";
    });
}



