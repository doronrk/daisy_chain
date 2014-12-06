var __sco = typeof __sco == "undefined" ? {} : __sco;
__sco.sender = __sco.sender || {};
__sco.storage = __sco.storage || {};
__sco.encryption = __sco.encryption || {};
__sco.management = __sco.management || {};

__sco.management.main = function () {

    // This is the only setup needed, after this it becomes event driven **/

    /** Parse the request from the listener and act accordingly **/
    function react(eventObject) {
        try {
            if (validate(eventObject)) {
                var obj = __sco.tryparse(eventObject.data);
                if (typeof obj['func'] !== "undefined" && typeof obj['args'] !== "undefined") {
                    var func = obj['func'], args = obj['args'], ticket = __sco.type(__sco.tonumber(obj['ticket'])) == "number" ? __sco.tonumber(obj['ticket']) : -1;
                    switch (func) {
                        case "set":
                            store.set.call(window, { 'ticket': ticket, 'args': args });
                            break;
                        case "get":
                            store.get.call(window, { 'ticket': ticket, 'args': args, 'classic': __sco.type(__sco.tonumber(obj['ticket'])) });
                            break;
                        case "remove":
                            store.remove.call(window, { 'ticket': ticket, 'args': args });
                            break;
                        case "send":
                            __sco.sender.send.call(window, { 'ticket': ticket, 'args': args });
                            break;
                        case "test":
                            __sco.management.callback("sc_ready");
                        default:
                            __sco.management.callback("No matching function found");
                            break;
                    }
                }
                else {
                    __sco.management.callback("INVALID ARGUMENTS");
                }
            }
        }
        catch (re) {
            __sco.error("REACT ERROR: " + (re.stack || "") + (re.description || "") + (re.message || ""));
        }
    }

    /** Attach to onmessage to listen for calls being made **/
    function listen() {
        __sco.on("message", react);
    }

    /** Only respond if the client ID supplied is the same as the one we're allowed to talk to **/
    function validate(obj) {
        function search(arr, comp) {
            var pass = false;
            if (typeof comp != "string")
                return pass;
            __sco.each(arr, function (ix, val) {
                if (!pass)
                    pass = typeof val == "string" && val.toUpperCase() == comp.toUpperCase();
            });
            return pass;
        }
        function objectvalidate(thisobj) {
            try {
                var parsed = __sco.tryparse(thisobj.data);
                if (__sco.type(thisobj.data) == "string" && __sco.type(parsed) == "object" && __sco.type(parsed.args) == "array" && __sco.type(parsed.func) == "string" && __sco.type(parsed.guid) == "array") {
                    return true;
                }
                return false;
            }
            catch (ex) {
                return false;
            }
        }
        // If the server is down, returns null referrers; do not allow storage
        if (scobj.referrers == null) {
            store.cookies = false;
            store.local = false;
            return true;
        }
        else if (scobj.referrers.indexOf(obj.origin) > -1 && search(__sco.tryparse(obj.data).guid, scobj.guid))
            return true;
        else {
            if (typeof scobj.debug == "boolean" && scobj.debug && objectvalidate(obj))
                __sco.error("FAILED VALIDATION : ORIGIN : " + obj.origin + " ARGS : " + (__sco.type(obj) !== "string" ? JSON.stringify(obj.data) : obj.data));
            return false;
        }
    }

    // Create a new storage instance **/
    var store = new __sco.storage();

    // Setup the listener for the iframe
    listen();

    // Last thing we do is call ready to let the consumer know we're ready
    ready();
}

/** Function to call back to the parent, passing whatever it needs to **/
__sco.management.callback = function (message) {
    // Must post back to origin * because this handles all traffic
    // Check the parent is not the current window, risk getting into a loop if they are the same
    if (parent !== window)
        parent.postMessage(message != null && typeof message !== "undefined" ? typeof message !== "string" ? JSON.stringify(message) : message : "false", "*");
}

/** Provide a last chance error callback for reporting **/
__sco.error = function (err) {
    try {
        // Handle V1 and V2 errors for now
        if (__sco.tonumber(scobj.client) >= 10000 && document.location.host.indexOf("api.salecycle.com") < 0 && document.location.host.indexOf("d22j4fzzszoii2.cloudfront.net") < 0) {
            __sco.sender.send({ "args": ["POST", "https://" + document.location.host + "/import/capture.aspx", 'c=' + scobj.client + '&b=&mid=&scs=' + screen.availHeight + '-' + screen.availWidth + '-' + screen.colorDepth + '-' + screen.height + '-' + screen.width + '&n=||&t=&e=&o=&w=&st=1800&ua=&bs=1&ctd=&cc=&ca=0&fc=0&y=&p=&i=&u=&v1=&v2=&q1=&q2=&q3=&d1=&d2=&s=1&er=' + err + " : USERAGENT :" + navigator.userAgent + '&cu1=&cu2=&ifs=&sfs='] });
        }
    }
    catch (e) { }
    return;
}

/** Provide storage functions, this will work out if we can use cookies or local storage and handle through the get, set and remove methods **/
__sco.storage = function () {

    /***************************************************/
    /**         PUBLIC/PRIVILEGED FUNCTIONS           **/
    /***************************************************/

    var that = this;
    this.local = uselocal();
    this.cookies = usecookies();

    /** Provide remove function, this will remove the specified name and associated value from storage **/
    this.remove = function (obj) {
        var data = false;
        obj.args[0] += scobj.guid;
        if (that.local)
            data = localremove(obj.args[0]);
        else if (that.cookies)
            data = cookieremove(obj.args[0]);
        else
            data = false;
        if (__sco.type(obj.ticket) == "number" && obj.ticket >= 0)
            __sco.management.callback({ 'data': data, 'ticket': obj.ticket });
    }

    /** Provide set function, this will set the data using the specified name **/
    this.set = function (obj) {
        var data = false;
        obj.args[0] += scobj.guid;
        if (that.local)
            data = localset(obj.args[0], obj.args[1]);
        else if (that.cookies)
            data = cookieset(obj.args[0], obj.args[1], obj.args.length > 2 ? obj.args[2] : null);
        else
            data = false;
        if (__sco.type(obj.ticket) == "number" && obj.ticket >= 0)
            __sco.management.callback({ 'data': data, 'ticket': obj.ticket });
    }

    /** Provide get function, this will return the data from the specified name **/
    this.get = function (obj) {
        var data = false;
        obj.args[0] += scobj.guid;
        if (that.local)
            data = localget(obj.args[0], obj.args.length > 1 ? obj.args[1] : false);
        else if (that.cookies)
            data = cookieget(obj.args[0], obj.args.length > 1 ? obj.args[1] : false);
        else
            data = false;
        if ((__sco.type(obj.ticket) == "number" && obj.ticket >= 0) || obj.classic == "boolean")
            __sco.management.callback(obj.classic == "boolean" ? data : { 'data': data, 'ticket': obj.ticket });
    }

    /*****************************************/
    /**         PRIVATE FUNCTIONS           **/
    /*****************************************/

    /** Returns boolean value indicating whether or not cookies are available **/
    function usecookies() {
        var cookiesAvailable = false, nav = navigator.userAgent, version = nav.match(/version\/(\d+)/i);
        if (nav.match(/safari/i) != null && nav.match(/chrome/i) == null && nav.match(/OPR/) == null && version != null && version.length > 1 && __sco.tonumber(version[1]) != false && __sco.tonumber(version[1]) >= 6)
            return cookiesAvailable;
        try {
            cookieset("sc_test", "testvalue", 1);
            if (cookieget("sc_test"))
                cookiesAvailable = true;
        }
        catch (ce) { }
        finally {
            cookieremove("sc_test");
            return cookiesAvailable;
        }
    }

    /** Deletes a cookie **/
    function cookieremove(a) {
        // Check if we have an exact name or split over multiple cookies
        __sco.each(document.cookie.split(";"), function (ix, val) {
            var c = clean(val), regex = "^" + a + "__(\\d+)\\s*(?=\\=)|^" + a + "(?=\\s*\\=)", m = c.match(new RegExp(regex));
            if (m != null)
                cookieset(m[0], "", -1);
        });
        return true;
    }

    function clearcookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=" + sd(-1) + "domain=" + document.location.host + ";path=/";
        }
    }

    /** Gets the specified element name **/
    function cookieget(a, b) {
        var tmp = new Array(), res = "", regex = "^" + a + "__(\\d+)\\s*(?=\\=)|^" + a + "(?=\\s*\\=)";

        function sort(s) {
            return s.sort(function (a, b) { if (__sco.tonumber(a[1]) < __sco.tonumber(b[1])) return -1; if (__sco.tonumber(b[1]) < __sco.tonumber(a[1])) return 1; return 0; });
        }

        function join(arr) {
            var r = "";
            __sco.each(arr, function (ix, val) {
                r += val[0];
            });
            return r.length > 0 ? r : null;
        }

        try {
            __sco.each(document.cookie.split(";"), function (ix, val) {
                var c = clean(val), m = c.match(new RegExp(regex));
                if (m != null)
                    tmp.push([c.substr(c.indexOf("=") + 1), m[1] || 0]);
            });
            res = join(sort(tmp));
        }
        catch (ce1) { }
        if (res != '') {
            var retval = __sco.tryparse(decode(res));
            return retval == null ? arguments.length > 1 && typeof arguments[1] !== "undefined" ? b : false : retval;
        }
        else {
            return arguments.length > 1 && typeof arguments[1] !== "undefined" ? b : false;
        }
    }

    /** Writes a cookie with the specified name, value and number of days for expiry (0 means session) 
    * Data will be split over multiple cookies if it exceeds the max length
    **/
    function cookieset(n, v, d) {
        // Catch Firefox private browsing mode error when you touch cookies
        try {
            function wrc(tn, tv, td) {
                document.cookie = tn + "=" + tv + (td == 0 ? "" : ";expires=" + sd(td)) + ";domain=" + document.location.host + ";path=/";
                return true;
            }
            var vv = escape(JSON.stringify(v)), dd = arguments.length > 2 && typeof arguments[2] !== "undefined" ? d : 1095, max = 18500;
            if (__sco.type(dd) === "number" && dd > -1)
                cookieremove(n);
            // If cookies close to limit, clear cookies
            // Cloudfront header limit is 20k
            if (vv.length < max && (max - document.cookie.length) > vv.length) {
                if (vv.length > 1800) {
                    var x = Math.ceil(vv.length / 1800);
                    for (var i = 0; i < x; i++) {
                        wrc(n + "__" + i.toString(), vv.substring(0, 1800), dd);
                        vv = vv.substr(1800);
                    }
                    return true;
                }
                else {
                    return wrc(n, vv, dd);
                }
            }
            // We're going to exceed the limit, clear all cookies that we can and try again
            else {
                // If it's too big for storage just don't set it
                if (vv.length > max)
                    return false;
                clearcookies();
                return cookieset(n, v, dd);
            }
        }
        catch (ce) {
            return false;
        }
    }

    /** Return a value indicating whether or not we can use local storage (just because it's there doesn't mean we have access) **/
    function uselocal() {
        var available = false, nav = navigator.userAgent, version = nav.match(/version\/(\d+)/i);
        try {
            if (typeof localStorage === "undefined" && typeof localStorage.setItem === "undefined")
                return available;
            if (nav.match(/safari/i) != null && nav.match(/chrome/i) == null && nav.match(/OPR/) == null && version != null && version.length > 1 && version[1] >= 6)
                return available;
            localset("sc_test", "testval");
            available = !!localget("sc_test");
            localremove("sc_test");
            return available;
        }
        catch (e) {
            return available;
        }
    }

    /** Clear all items from localStorage not used in the current session **/
    function clearstorage() {
        // If length is 0 and we got the quota exception, we obviously can't set anything in there so don't try again
        // This will handle Safari (in all it's forms) private browsing hands off rule
        if (localStorage.length > 0) {
            // Clear all other items that are not currently being used
            __sco.each(localStorage, function (ix, val) {
                if (ix.indexOf(scobj.client.toString()) < 0 && ix.toLowerCase().indexOf(scobj.guid.toLowerCase()) < 0)
                    localStorage.removeItem(ix);
            });
            return true;
        }
        return false;
    }

    /** Adds the specified key and value into local storage **/
    function localset(key, value) {
        try {
            var ret = true;
            localStorage.setItem(key, escape(JSON.stringify(value)));
        }
        catch (se) {
            // Presume this is a quota exception, so clear and try again
            try {
                if (clearstorage())
                    localStorage.setItem(key, escape(JSON.stringify(value)));
                else
                    ret = false;
            }
            catch (ise) {
                ret = false;
            }
        }
        finally {
            return ret;
        }
    }

    /** Gets the specified keys value from local storage, if not found returns either false or the default return value specified **/
    function localget(key, notfound) {
        try {
            var ret = __sco.tryparse(decode(localStorage.getItem(key)));
            ret = ret == null ? arguments.length > 1 && typeof arguments[1] !== "undefined" ? notfound : false : ret;
        }
        catch (ge) {
            ret = arguments.length > 1 && typeof arguments[1] !== "undefined" ? false : notfound;
        }
        finally {
            return ret;
        }
    }

    /** Removes the specified key and it's associated value from storage **/
    function localremove(key) {
        try {
            var ret = true;
            localStorage.removeItem(key);
        }
        catch (re) {
            ret = false;
        }
        finally {
            return ret;
        }
    }

    function clean(a) {
        return __sco.type(a) == "string" ? a.replace(/^\s*|\s*$/g, "").replace(/\s{2,}|[\r\n\t]/g, " ") : "";
    }

    /** Decodes a string back to it's raw form **/
    function decode(a, b) {
        if (a == null || typeof a == "undefined")
            return a;
        else
            return unescape(a);
    }

    /** Returns a date in UTC form d days in the future **/
    function sd(d) {
        return new Date(new Date().setDate(new Date().getDate() + (!isNaN(d) ? Number(d) : 30))).toUTCString();
    }
}

/** 
* Provider sender, in theory never needs cors because it's the same domain. 
* iframe post is there for cases where we might have the provider but no XMLHttpRequest 
* This can handle both get and POST requests
**/
__sco.sender.send = function (obj) {

    function timeouthandler(resp) {
        var robj = {};
        robj.target = {};
        robj.type = "timeout";
        robj.target.responseText = null;
        robj.target.status = resp.status;
        robj.target.statusText = resp.statusText;
        if (ticket >= 0 || __sco.type(callback) == "function" || (__sco.type(callback) == "boolean" && callback))
            __sco.management.callback(__sco.type(callback) == "function" ? robj : { 'data': robj, 'ticket': ticket });
    }

    var method = obj.args[0], endpoint = obj.args[1], data = obj.args[2], callback = obj.args.length > 3 ? obj.args[3] : null, headers = obj.args.length > 4 ? obj.args[4] : null, timeout = obj.args.length > 5 ? obj.args[5] : 0, ticket = obj.ticket;

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
    if (ticket >= 0 || __sco.type(callback) == "function" || (__sco.type(callback) == "boolean" && callback)) {
        if ('onload' in x)
            x.onload = function (resp) {
                var robj = {};
                try {
                    robj.target = {};
                    robj.type = resp.type;
                    robj.target.responseText = resp.target.responseText;
                    robj.target.status = resp.target.status;
                    robj.target.statusText = resp.target.statusText;
                }
                catch (e) { }
                __sco.management.callback(__sco.type(callback) == "function" ? robj : { 'data': robj, 'ticket': ticket });
            }
        else
            x.onreadystatechange = function () {
                if (!finished && x.readyState == 4) {
                    finished = true;
                    var robj = {};
                    try {
                        robj.target = {};
                        robj.type = "load";
                        robj.target.responseText = x.responseText;
                        robj.target.status = x.status;
                        robj.target.statusText = x.statusText;
                    }
                    catch (e) { }
                    __sco.management.callback(__sco.type(callback) == "function" ? robj : { 'data': robj, 'ticket': ticket });
                }
            }
    }
    x.send((method == "GET" ? "" : __sco.type(data) !== "string" ? JSON.stringify(data) : data));
}

/**************************************/
/**         Common functions         **/
/**************************************/

/** If the browser does not have an implementation of array.indexOf - add one **/
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

/** Attach the specified function to the event **/
__sco.on = function (evnt, func, elem) {
    var ev = window.addEventListener, el = arguments.length > 2 && __sco.noru(elem) ? elem : window;
    ev ? el.addEventListener(evnt, func) : el.attachEvent("on" + evnt, func);
}

/** Remove the specified function from the event **/
__sco.off = function (evnt, func, elem) {
    var ev = window.removeEventListener, el = arguments.length > 2 && __sco.noru(elem) ? elem : window;
    ev ? el.removeEventListener(evnt, func) : el.detachEvent("on" + evnt, func);
}

/** Return whether or not the value is null or undefined **/
__sco.noru = function (elem) {
    return elem != null && typeof elem !== "undefined";
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

__sco.tryparse = function (val) {
    // Create array of things to try
    var vals = [val, "\"" + val + "\"", "{" + val + "}", "[" + val + "]"], index = 0;

    // Function to try parsing the current version
    function parse(value) {
        try {
            return JSON.parse(value);
        }
        catch (pe1) {
            // If it fails, increment the index - if we still have values to try then run on the next, else return null
            index++;
            return index < vals.length ? parse(vals[index]) : null;
        }
    }
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
    if (typeof a.toString !== "undefined" && a.toString() === "[object]") {
        if (typeof a.nodeType === "number" && a.nodeType === 9)
            return "htmldoc";
        else if (typeof a.nodeType === "number" && typeof a.length === "undefined")
            return "htmlelement";
        else if (typeof a.item !== "undefined" && typeof a.length === "number")
            return "nodelist";
        else
            return "object";
    }
    if (typeof a === "object" && (typeof a.callee !== "undefined" || typeof a.caller !== "undefined") && typeof a.length === "number")
        return "arguments";
    if (typeof a.nodeType === "number" && a.nodeType === 1)
        return "htmlelement";
    return classes[Object.prototype.toString.call(a)] || (Object.prototype.toString.call(a).match(/HTML[\w]*Element/) != null ? "htmlelement" : "object");
}

/** Include JSON 2, only needed for Opera 9.5 - 10.5 which has postMessage and not native JSON **/
"object" !== typeof JSON && (JSON = {}); (function () { function m(a) { return 10 > a ? "0" + a : a } function r(a) { s.lastIndex = 0; return s.test(a) ? '"' + a.replace(s, function (a) { var c = u[a]; return "string" === typeof c ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + a + '"' } function p(a, l) { var c, d, h, q, g = e, f, b = l[a]; b && "object" === typeof b && "function" === typeof b.toJSON && (b = b.toJSON(a)); "function" === typeof k && (b = k.call(l, a, b)); switch (typeof b) { case "string": return r(b); case "number": return isFinite(b) ? String(b) : "null"; case "boolean": case "null": return String(b); case "object": if (!b) return "null"; e += n; f = []; if ("[object Array]" === Object.prototype.toString.apply(b)) { q = b.length; for (c = 0; c < q; c += 1) f[c] = p(c, b) || "null"; h = 0 === f.length ? "[]" : e ? "[\n" + e + f.join(",\n" + e) + "\n" + g + "]" : "[" + f.join(",") + "]"; e = g; return h } if (k && "object" === typeof k) for (q = k.length, c = 0; c < q; c += 1) "string" === typeof k[c] && (d = k[c], (h = p(d, b)) && f.push(r(d) + (e ? ": " : ":") + h)); else for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (h = p(d, b)) && f.push(r(d) + (e ? ": " : ":") + h); h = 0 === f.length ? "{}" : e ? "{\n" + e + f.join(",\n" + e) + "\n" + g + "}" : "{" + f.join(",") + "}"; e = g; return h } } "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + m(this.getUTCMonth() + 1) + "-" + m(this.getUTCDate()) + "T" + m(this.getUTCHours()) + ":" + m(this.getUTCMinutes()) + ":" + m(this.getUTCSeconds()) + "Z" : null }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () { return this.valueOf() }); var t = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, s = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e, n, u = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, k; "function" !== typeof JSON.stringify && (JSON.stringify = function (a, l, c) { var d; n = e = ""; if ("number" === typeof c) for (d = 0; d < c; d += 1) n += " "; else "string" === typeof c && (n = c); if ((k = l) && "function" !== typeof l && ("object" !== typeof l || "number" !== typeof l.length)) throw Error("JSON.stringify"); return p("", { "": a }) }); "function" !== typeof JSON.parse && (JSON.parse = function (a, e) { function c(a, d) { var g, f, b = a[d]; if (b && "object" === typeof b) for (g in b) Object.prototype.hasOwnProperty.call(b, g) && (f = c(b, g), void 0 !== f ? b[g] = f : delete b[g]); return e.call(a, d, b) } var d; a = String(a); t.lastIndex = 0; t.test(a) && (a = a.replace(t, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) })); if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return d = eval("(" + a + ")"), "function" === typeof e ? c({ "": d }, "") : d; throw new SyntaxError("JSON.parse"); }) })();

/**
* A modified version of Diego Perini's contentLoaded 
* http://javascript.nwbox.com/ContentLoaded/
* http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
**/
__sco.management.contentLoaded = function (win, fn, args) {
    var first = true, done = false, doc = win.document, root = doc.documentElement;
    function hr() {
        try {
            if (typeof doc.readyState == 'undefined' || done) { throw new Error("ReadyState"); }
            (doc.readyState == "complete" || doc.readyState == "loaded") && !done ? first ? (setTimeout(hr, 100), first = false) : init("poll") : setTimeout(hr, 50);
        }
        catch (e) { }
    }
    function init(e) {
        if (e.type == "readystatechange" && (doc.readyState != "complete" || doc.readyState != "loaded")) return;
        __sco.off(e.type, init, e.type == "load" ? win : doc);
        if (!done && (done = true)) {
            fn.apply(win, args || []);
        }
    }
    if (doc.readyState == "complete" || doc.readyState == "loaded") {
        fn.apply(win, args || []);
    }
    else {
        __sco.on("load", init, win);
        __sco.on("readystatechange", init, doc);
        hr();
    }
}

/** Post message back to parent to let it know the frame is ready and if we have storage **/
function ready() {
    var tmpstore = new __sco.storage(), message = "sc_not_available";
    if ((tmpstore.local || tmpstore.cookies) && scobj.referrers != null)
        message = "sc_ready";
    __sco.management.callback(message);
};

/** Execute the main method **/
__sco.management.contentLoaded(window, __sco.management.main);