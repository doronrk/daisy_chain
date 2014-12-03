/*
http://www.JSON.org/json2.js
2010-11-17

Public Domain.

NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

See http://www.JSON.org/js.html

This code should be minified before deployment.
See http://javascript.crockford.com/jsmin.html

USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
NOT CONTROL.

This file creates a global JSON object containing two methods: stringify
and parse.

JSON.stringify(value, replacer, space)
value       any JavaScript value, usually an object or array.

replacer    an optional parameter that determines how object
values are stringified for objects. It can be a

space       an optional parameter that specifies the indentation
of nested structures. If it is omitted, the text will
be packed without extra whitespace. If it is a number,
it will specify the number of spaces to indent at each
level. If it is a string (such as '\t' or '&nbsp;'),
it contains the characters used to indent at each level.

This method produces a JSON text from a JavaScript value.

When an object value is found, if the object contains a toJSON
method, its toJSON method will be called and the result will be
stringified. A toJSON method does not serialize: it returns the
value represented by the name/value pair that should be serialized,
or undefined if nothing should be serialized. The toJSON method
will be passed the key associated with the value, and this will be
bound to the value

For example, this would serialize Dates as ISO strings.

Date.prototype.toJSON = function (key) {
function f(n) {
// Format integers to have at least two digits.
return n < 10 ? '0' + n : n;
}

return this.getUTCFullYear()   + '-' +
f(this.getUTCMonth() + 1) + '-' +
f(this.getUTCDate())      + 'T' +
f(this.getUTCHours())     + ':' +
f(this.getUTCMinutes())   + ':' +
f(this.getUTCSeconds())   + 'Z';
};

You can provide an optional replacer method. It will be passed the
key and value of each member, with this bound to the containing
object. The value that is returned from your method will be
serialized. If your method returns undefined, then the member will
be excluded from the serialization.

If the replacer parameter is an array of strings, then it will be
used to select the members to be serialized. It filters the results
such that only members with keys listed in the replacer array are
stringified.

Values that do not have JSON representations, such as undefined or
functions, will not be serialized. Such values in objects will be
dropped; in arrays they will be replaced with null. You can use
a replacer function to replace those with JSON values.
JSON.stringify(undefined) returns undefined.

The optional space parameter produces a stringification of the
value that is filled with line breaks and indentation to make it
easier to read.

If the space parameter is a non-empty string, then that string will
be used for indentation. If the space parameter is a number, then
the indentation will be that many spaces.

Example:

text = JSON.stringify(['e', {pluribus: 'unum'}]);
// text is '["e",{"pluribus":"unum"}]'

text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
// text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

text = JSON.stringify([new Date()], function (key, value) {
return this[key] instanceof Date ?
'Date(' + this[key] + ')' : value;
});
// text is '["Date(---current time---)"]'

JSON.parse(text, reviver)
This method parses a JSON text to produce an object or array.
It can throw a SyntaxError exception.

The optional reviver parameter is a function that can filter and
transform the results. It receives each of the keys and values,
and its return value is used instead of the original value.
If it returns what it received, then the structure is not modified.
If it returns undefined then the member is deleted.

Example:

// Parse the text. Values that look like ISO date strings will
// be converted to Date objects.

myData = JSON.parse(text, function (key, value) {
var a;
if (typeof value === 'string') {
a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
if (a) {
return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
+a[5], +a[6]));
}
}
return value;
});

myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
var d;
if (typeof value === 'string' &&
value.slice(0, 5) === 'Date(' &&
value.slice(-1) === ')') {
d = new Date(value.slice(5, -1));
if (d) {
return d;
}
}
return value;
});

This is a reference implementation. You are free to copy, modify, or
redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
lastIndex, length, parse, prototype, push, replace, slice, stringify,
test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}( function() {"use strict";

        function f(n) {
            // Format integers to have at least two digits.
            return n < 10 ? '0' + n : n;
        }

        if ( typeof Date.prototype.toJSON !== 'function') {

            Date.prototype.toJSON = function(key) {

                return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
            };

            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
                return this.valueOf();
            };
        }

        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {// table of character substitutions
            '\b' : '\\b',
            '\t' : '\\t',
            '\n' : '\\n',
            '\f' : '\\f',
            '\r' : '\\r',
            '"' : '\\"',
            '\\' : '\\\\'
        }, rep;

        function quote(string) {

            // If the string contains no control characters, no quote characters, and no
            // backslash characters, then we can safely slap some quotes around it.
            // Otherwise we must also replace the offending characters with safe escape
            // sequences.

            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
                var c = meta[a];
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }

        function str(key, holder) {

            // Produce a string from holder[key].

            var i, // The loop counter.
            k, // The member key.
            v, // The member value.
            length, mind = gap, partial, value = holder[key];

            // If the value has a toJSON method, call it to obtain a replacement value.

            if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

            // If we were called with a replacer function, then call the replacer to
            // obtain a replacement value.

            if ( typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }

            // What happens next depends on the value's type.

            switch (typeof value) {
                case 'string':
                    return quote(value);

                case 'number':

                    // JSON numbers must be finite. Encode non-finite numbers as null.

                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':

                    // If the value is a boolean or null, convert it to a string. Note:
                    // typeof null does not produce 'null'. The case is included here in
                    // the remote chance that this gets fixed someday.

                    return String(value);

                // If the type is 'object', we might be dealing with an object or an array or
                // null.

                case 'object':

                    // Due to a specification blunder in ECMAScript, typeof null is 'object',
                    // so watch out for that case.

                    if (!value) {
                        return 'null';
                    }

                    // Make an array to hold the partial results of stringifying this object value.

                    gap += indent;
                    partial = [];

                    // Is the value an array?

                    if (Object.prototype.toString.apply(value) === '[object Array]') {

                        // The value is an array. Stringify every element. Use null as a placeholder
                        // for non-JSON values.

                        length = value.length;
                        for ( i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }

                        // Join all of the elements together, separated with commas, and wrap them in
                        // brackets.

                        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }

                    // If the replacer is an array, use it to select the members to be stringified.

                    if (rep && typeof rep === 'object') {
                        length = rep.length;
                        for ( i = 0; i < length; i += 1) {
                            k = rep[i];
                            if ( typeof k === 'string') {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + ( gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    } else {

                        // Otherwise, iterate through all of the keys in the object.

                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + ( gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }

                    // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.

                    v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        }

        // If the JSON object does not yet have a stringify method, give it one.

        if ( typeof JSON.stringify !== 'function') {
            JSON.stringify = function(value, replacer, space) {

                // The stringify method takes a value and an optional replacer, and an optional
                // space parameter, and returns a JSON text. The replacer can be a function
                // that can replace values, or an array of strings that will select the keys.
                // A default replacer method can be provided. Use of the space parameter can
                // produce text that is more easily readable.

                var i;
                gap = '';
                indent = '';

                // If the space parameter is a number, make an indent string containing that
                // many spaces.

                if ( typeof space === 'number') {
                    for ( i = 0; i < space; i += 1) {
                        indent += ' ';
                    }

                    // If the space parameter is a string, it will be used as the indent string.

                } else if ( typeof space === 'string') {
                    indent = space;
                }

                // If there is a replacer, it must be a function or an array.
                // Otherwise, throw an error.

                rep = replacer;
                if (replacer && typeof replacer !== 'function' && ( typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                    throw new Error('JSON.stringify');
                }

                // Make a fake root object containing our value under the key of ''.
                // Return the result of stringifying the value.

                return str('', {
                    '' : value
                });
            };
        }

        // If the JSON object does not yet have a parse method, give it one.

        if ( typeof JSON.parse !== 'function') {
            JSON.parse = function(text, reviver) {

                // The parse method takes a text and an optional reviver function, and returns
                // a JavaScript value if the text is a valid JSON text.

                var j;

                function walk(holder, key) {

                    // The walk method is used to recursively walk the resulting structure so
                    // that modifications can be made.

                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }

                // Parsing happens in four stages. In the first stage, we replace certain
                // Unicode characters with escape sequences. JavaScript handles many characters
                // incorrectly, either silently deleting them, or treating them as line endings.

                text = String(text);
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function(a) {
                        return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }

                // In the second stage, we run the text against regular expressions that look
                // for non-JSON patterns. We are especially concerned with '()' and 'new'
                // because they can cause invocation, and '=' because it can cause mutation.
                // But just to be safe, we want to reject all unexpected forms.

                // We split the second stage into 4 regexp operations in order to work around
                // crippling inefficiencies in IE's and Safari's regexp engines. First we
                // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
                // replace all simple value tokens with ']' characters. Third, we delete all
                // open brackets that follow a colon or comma or that begin the text. Finally,
                // we look to see that the remaining characters are only whitespace or ']' or
                // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

                if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                    // In the third stage we use the eval function to compile the text into a
                    // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                    // in JavaScript: it can begin a block or an object literal. We wrap the text
                    // in parens to eliminate the ambiguity.

                    j = eval('(' + text + ')');

                    // In the optional fourth stage, we recursively walk the new structure, passing
                    // each name/value pair to a reviver function for possible transformation.

                    return typeof reviver === 'function' ? walk({
                        '' : j
                    }, '') : j;
                }

                // If the text is not JSON parseable, then a SyntaxError is thrown.

                throw new SyntaxError('JSON.parse');
            };
        }
    }());

function logicalRuleToString(o) {
    var parse = function(_o) {
        var a = [], t;
        for (var p in _o) {
            if (_o.hasOwnProperty(p)) {
                t = _o[p];
                if ( typeof (t) == "object") {
                    a[a.length] = "{" + arguments.callee(t).join(", ") + "}";
                } else if ( typeof (t) != "function")/*Functions are excluded. FIX#2423*/
                {
                    a[a.length] = ["'" + p + "' : '" + t.toString() + "'"];
                }
            }
        };
        return a;
    };
    return "[" + parse(o).join(", ") + "]";
}

if (!window.liveclicker)
    window.liveclicker = {};

liveclicker.api_res = new Array();

liveclicker.getAccountId = function() {
    if (lc.settings && lc.settings.account_id)
        return lc.settings.account_id;
    else if (lc.account_id)
        return lc.account_id;
    else
        return 0;
};

function isSecure() {
    return window.location.protocol == 'https:';

}

function getSecureDomain() {
    if (!lc.secure_domain)
        lc.secure_domain = "sc.liveclicker.net";
    return lc.secure_domain;
}

function getSecureAppDomain() {
    if (!lc.secure_domain)
        lc.secure_domain = "vms.liveclicker.com";
    return lc.secure_domain;
}

function getHttp() {
    var domain = liveclicker.getDomain();
    var http;

    if (domain == getSecureDomain())
        http = "https://";
    else
        http = "http://";
    return http;
}

liveclicker.getDomain = function() {
    var javaserver;
    if (isSecure()) {
        javaserver = getSecureDomain();
    } else {
        javaserver = "sv.liveclicker.net";
    }

    if (lc.settings && lc.settings.domain) {
        return lc.settings.domain;
    } else if (lc.domain) {
        return lc.domain;
    } else {
        return javaserver;
    }
};

liveclicker.getAppDomain = function() {
    if (isSecure()) {
        return getSecureAppDomain();
    } else if (lc.settings && lc.settings.app_domain) {
        return lc.settings.app_domain;
    } else {
        return "apps.liveclicker.com";
    }
};

liveclicker.callAPIObject = function(url, callbackObject) {
    // Add format to the url if it's not there
    if (url.indexOf('format=json') < 0) {
        url += '&format=json';
    }
    // Generate a variable name and add that to the url
    url += '&var=liveclicker.api_res[' + callbackObject.objectId + ']';

    var lcs = document.createElement('script');
    lcs.src = url;
    lcs.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(lcs);

    if (liveclicker.lcCallbackObjects == undefined) {
        liveclicker.lcCallbackObjects = new Array();
    }
    liveclicker.lcCallbackObjects[callbackObject.objectId] = callbackObject;
    setTimeout("liveclicker.lcCheckReadyObject()", 50);
};

liveclicker.lcCheckReadyObject = function() {
    var recurse = 1;
    if (window.liveclicker.api_res) {
        for (var objectId in window.liveclicker.api_res) {
            if (parseInt(objectId).toString() != objectId)
                continue;
            liveclicker.lcCallbackObjects[objectId].callback(window.liveclicker.api_res[objectId]);
            delete window.liveclicker.api_res[objectId];
            delete liveclicker.lcCallbackObjects[objectId];
            for (var objId in liveclicker.lcCallbackObjects) {
                recurse = 0;
            }
        }
    }
    if (recurse)
        setTimeout("liveclicker.lcCheckReadyObject()", 50);
};

liveclicker.detectEndPlayback = function(player, callbackFn) {
    if ( typeof player != undefined) {
        var playerSettings = player.getSettings();
        if ((playerSettings.playTime > 0 && playerSettings.totalTime > 0) &&
        	((playerSettings.playTime > 0.98 * playerSettings.totalTime) || (playerSettings.playTime > (playerSettings.totalTime - 0.3)))) {
            if ( typeof callbackFn != undefined) {
                callbackFn(player);
            }
        } else {
            window.setTimeout(function() {
                liveclicker.detectEndPlayback(player, callbackFn);
            }, 100);
        }
    }
};

liveclicker.callbackOnPlaybackCompleted = function(player, callbackFn) {
    liveclicker.detectEndPlayback(player, callbackFn);
};

liveclicker.newObjectId = function() {
    if (liveclicker.objectCount == undefined) {
        liveclicker.objectCount = 0;
    } else {
        liveclicker.objectCount++;
    }
    return liveclicker.objectCount;
};

// The array of pending objects; each object contains a jquery object, and the event to be
// called on the player it refers to, when that player is ready.
liveclicker.pending = new Array();

// Adds the jquery object/event to the pending list. If this is the first item added,
// starts the timeout to call checkPending.
liveclicker.setPending = function(obj) {
    liveclicker.pending[liveclicker.pending.length] = obj;
    if (liveclicker.pending.length == 1) {
        setTimeout("liveclicker.checkPending(0)", 50);
    }
};

// Periodically checks the pending list and sees whether a player is ready.
// If so, nulls out that item in the array and sends the event
liveclicker.checkPending = function(player) {
    // For the future: ignore calls to checkPending from onLCPlayerLoaded.
    if (player != 0)
        return;

    // tbd stores the number of unhandled entries in the array
    var tbd = 0;
    for (var i = 0; i < liveclicker.pending.length; i++) {
        var entry = liveclicker.pending[i];
        if (entry == null)
            continue;
        var player = liveclicker.findPlayerByWidgetId(entry.widget_id);
        if (player == undefined) {
            tbd++;
            continue;
        }
        // Found, null out the array entry and send the event
        liveclicker.pending[i] = null;
        try {
            player.sendEvent(entry.event, entry.p1, entry.p2, entry.p3, entry.p4);
        } catch (error) {
            // TODO: Remove after bug 673 fixed?
            // Otherwise we get an NPObject error by calling the player too early
            liveclicker.pending[i] = entry;
            tbd++;
        }
    }
    // If still some pending entries, reset the timeout; else reinitialize the array and
    // don't call the timer, since it's not needed until someone else adds to it.
    if (tbd > 0) {
        setTimeout("liveclicker.checkPending(0)", 50);
    } else {
        liveclicker.pending = new Array();
    }
};

// Takes a jquery object and returns the dom element that represents the player
// TBD: Implement HTML5 version
liveclicker.getPlayerFromJquery = function(jq) {
    if (jq.children("div").children("embed").length == 0) {
        return undefined;
    }
    var res = jq.children("div").children("embed")[0];
    return res;
};

liveclicker.findPlayerByJquery = function(jq) {
    var p = liveclicker.getPlayerFromJquery(jq);
    if (p == undefined)
        return undefined;
    var players = getLCPlayers();
    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        if (player == null)
            continue;
        if (player.getSettings == undefined)
            continue;
        if (player.isReady == undefined) {
            continue;
        }

        if (player == p) {
            return player;
        }
    }
    return undefined;
};

liveclicker.getWidgetId = function(player) {
    var widgetId = player.getSettings().id.toString();
    var usLoc = widgetId.indexOf('_');
    if (usLoc > 0) {
        widgetId = widgetId.substring(usLoc + 1);
    }
    return widgetId;
};

liveclicker.findPlayerByWidgetId = function(widget_id) {
    if (window.getLCPlayers == undefined) {
        return undefined;
    }
    var players = getLCPlayers();
    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        if (player == null)
            continue;
        if (player.getSettings == undefined)
            continue;
        // Next: try calling player with an exception handler
        if (player.isReady == undefined) {
            player.isReady = '1';
            return undefined;
        }

        if (liveclicker.getWidgetId(player) == widget_id) {
            return player;
        }
    }
    return undefined;
};

function lcThumbnail(thumbSrc, thumbSrcNormalized) {
    this.src = thumbSrc;
    this.srcNormalized = thumbSrcNormalized;
}

function lcDynamicThumbnail(widget_id) {
    this.widget_id = widget_id;

    this.scriptSrcDynamic = getHttp() + liveclicker.getDomain() + "/service/getDynamicEmbed?client_id=" + liveclicker.getAccountId() + "&widget_id=" + this.widget_id;
}

lcDynamicThumbnail.prototype.assignDynamicThumbnailOption = function(option_name, option_value) {
    this.scriptSrcDynamic = this.scriptSrcDynamic + '&' + option_name + '=' + option_value;
};

lcDynamicThumbnail.prototype.addInternalParams = function(params) {
    this.scriptSrcDynamic = this.scriptSrcDynamic + '&' + params;
};

lcDynamicThumbnail.prototype.appendDynamicThumbnailTo = function(options) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    for (var i in options) {
        if (this.scriptSrcDynamic.indexOf(i) > 1) {
            this.scriptSrcDynamic = this.scriptSrcDynamic.split("&" + i).join("&deleted_" + i);
            //.replace("&"+i, "&deleted_"+i);
        }
        if ((i != "id"))
            this.scriptSrcDynamic += "&" + i + "=" + options[i];
    }

    script.setAttribute('src', this.scriptSrcDynamic + '&div_id=' + options.id);
    document.getElementsByTagName("head")[0].appendChild(script);
    return jQuery("#" + options.id);
};

function lcThumbnail(thumbSrc, thumbSrcNormalized) {
    this.src = thumbSrc;
    this.srcNormalized = thumbSrcNormalized;
}

function lcPlayer(widget_id) {
    this.widget_id = widget_id;
    this.scriptSrc = getHttp() + liveclicker.getDomain() + "/service/getEmbed?client_id=" + liveclicker.getAccountId() + "&widget_id=" + this.widget_id;
}

lcPlayer.prototype.assignPlayerOption = function(option_name, option_value) {
	this.scriptSrc = this.scriptSrc.split("&"+ option_name).join("&deleted_" + option_name);
    this.scriptSrc = this.scriptSrc + '&' + option_name + '=' + option_value;
};

lcPlayer.prototype.addInternalParams = function(params) {
    this.scriptSrc = this.scriptSrc + '&' + params;
};

lcPlayer.prototype.setPrerollAdtag = function(adtag_url) {
    this.scriptSrc = this.scriptSrc + '&preroll_adtag_url=' + escape(adtag_url);
    return this;
};

lcPlayer.prototype.sendEvent = function(event, p1, p2, p3, p4) {
    var player = liveclicker.findPlayerByWidgetId(this.widget_id);
    if (player != undefined) {
        player.sendEvent(event, p1, p2, p3, p4);
    } else {
        liveclicker.setPending({
            'widget_id' : this.widget_id,
            'event' : event,
            'p1' : p1,
            'p2' : p2,
            'p3' : p3,
            'p4' : p4
        });
    }
};

lcPlayer.prototype.play = function() {
    this.sendEvent('play');
};

lcPlayer.prototype.pause = function() {
    this.sendEvent('pause');
};

lcPlayer.prototype.playpause = function() {
    this.sendEvent('playpause');
};

lcPlayer.prototype.stop = function() {
    this.sendEvent('stop');
};

lcPlayer.prototype.rewind = function() {
    this.sendEvent('rewind');
};

lcPlayer.prototype.mute = function() {
    this.sendEvent('mute');
};

lcPlayer.prototype.forcedownload = function() {
    this.sendEvent('forcedownload');
};

lcPlayer.prototype.volume = function(vol) {
    this.sendEvent('volume', vol);
};

lcPlayer.prototype.seek = function(seektime) {
    this.sendEvent('seek', seektime);
};

lcPlayer.prototype.resize = function(dW, dH, vW, vH) {
    // displayWidth,displayHeight,videoWidth,videoHeight
    this.sendEvent('resize', dW, dH, vW, vH);
};

lcPlayer.prototype.appendPlayerTo = function(options) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');

    for (var i in options) {
        if (this.scriptSrc.indexOf(i) > 1) {
            this.scriptSrc = this.scriptSrc.split("&" + i).join("&deleted_" + i);
            //.replace("&"+i, "&deleted_"+i);
        }
        if ((i != "player_id") && (i != "id"))
            this.scriptSrc += "&" + i + "=" + options[i];
    }
    if ((this.scriptSrc.indexOf("player_custom_id") > 1) && (options.player_id > 0)) {
        this.scriptSrc = this.scriptSrc.split("&player_custom_id").join("&deleted_player_custom_id");
        //.replace("&player_custom_id", "&deleted_player_custom_id");
    }

    script.setAttribute('src', this.scriptSrc + '&div_id=' + options.id + (options.player_id ? '&player_custom_id=' + options.player_id : ''));

    document.getElementsByTagName("head")[0].appendChild(script);

    return jQuery("#" + options.id);
};

function lcBanner(options, widgets) {
    if (options.overlay_autostart) {
        liveclicker.oa = false;
    }// if we want to autostart, reset the state
	this.widget_list = widgets;
    this.scriptSrc = getHttp() + liveclicker.getDomain() + "/service/getComponent?client_id=" + liveclicker.getAccountId() + "&component_id=" + options.banner_id + "&widget_list=" + widgets + (options.overlay_autostart ? '&overlay_autostart=' + options.overlay_autostart : '');
}

lcBanner.prototype.appendBannerTo = function(options) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', this.scriptSrc + '&div_id=' + options.id);
    document.getElementsByTagName("head")[0].appendChild(script);
    return jQuery("#" + options.id);
};

lcBanner.prototype.showOverlayOnClick = function(options) {
	
    var clickLoc = options.id;
    // Random span id
    var spanId = "lcs" + this.widget_list.join(".");
	while ($("#"+spanId).length > 0){
	   
	   spanId = "lcs" + lcBanner.span_id;
	   lcBanner.span_id++;
	}
   // lcBanner.span_id++;
    // Append invisible span to end of body and add the banner code to it
    jQuery("body").append("<span id=\"" + spanId + "\" style=\"display:none;\"></span>");
    this.appendBannerTo({
        'id' : spanId
    });
	
	  // A click on the specified id will cause the first link in the banner to be clicked
    jQuery("#" + clickLoc).click(function() {
        var link = jQuery('a:first', '#' + spanId);
        link.click();
    });
    return this;
};

lcBanner.prototype.setPrerollAdtag = function(adtag_url) {
    this.scriptSrc = this.scriptSrc + '&preroll_adtag_url=' + escape(adtag_url);
    return this;
};

lcBanner.span_id = 0;
lcBanner.widget_list = 0;

function lcSlideshow(options) {
    this.slideshow_id = options.slideshow_id;
    this.slides = options.slides;
    this.title = options.title;
    this.views = options.views;
    this.rating = options.rating;

    // Build the array of lcSlide objects
    var slist = [];
    jQuery.each(this.slides.slide, function(j, item) {
        var widgetId = getWidgetId(item.photo_location);
        var slide;
        if (widgetId > 0) {
            slide = new lcWidgetSlide(item, widgetId);
        } else {
            slide = new lcImageSlide(item);
        }
        slist.push(slide);
    });
    this.slide_list = slist;
}

lcSlideshow.prototype.getLength = function() {
    return this.slide_list.length;
};

lcSlideshow.prototype.getSlide = function(which) {
    if (which <= 0 || which > this.slide_list.length) {
        return null;
    }
    return this.slide_list[which - 1];
};

function getWidgetId(photoUrl) {
    var widgetId = 0;
    var photo_filename = photoUrl.substring(photoUrl.lastIndexOf('/') + 1);
    if (photo_filename.charAt(0) == "-") {
        // this is a widget!
        widgetId = 0 - parseInt(photo_filename);
    }
    return widgetId;
}

lcSlideshow.prototype.appendMediaSlideshowTo = function(options) {
    var iframeUrl = this.scriptSrc = getHttp() + liveclicker.getAppDomain() + "/apps/5/?app_data=" + this.version + "-" + liveclicker.getAccountId() + "-" + this.slideshow_id;
    var iframe = document.createElement('iframe');
    iframe.src = iframeUrl;
    iframe.frameBorder = 0;
    iframe.scrolling = "no";
    iframe.width = options.width != undefined ? options.width : 945;
    iframe.height = options.height != undefined ? options.height : 815;
    var res = jQuery("#" + options.id);
    res.append(iframe);
    return res;
};

function lcSlide(options) {
    if (!options)
        return;
    this.slide_number = options.photo_number;
    this.description = options.description;
    this.link = options.link;

    // Build the array of lcProduct objects
    var plist = [];
    jQuery.each(options.product_links.product_link, function(j, item) {
        plist.push(item);
    });
    this.product_list = plist;
}

function lcWidgetSlide(options, widget_id) {
    lcSlide.call(this, options);
    this.widget_id = widget_id;
}

lcWidgetSlide.prototype = new lcSlide;

function lcImageSlide(options) {
    lcSlide.call(this, options);
    this.photo_location = options.photo_location;
}

lcImageSlide.prototype = new lcSlide;

// lc is the global function that creates an lc.fn object
var lc = function(options) {
    // Detect lc(this)
    if (options.widgetList) {
        return options;
    }
    return new lc.fn.init(options);
};

lc.request = function(method, callback_object, extra_params) {
    liveclicker.callAPIObject(getHttp() + liveclicker.getDomain() + "/service/api?method=" + method + "&account_id=" + liveclicker.getAccountId() + "&" + extra_params, callback_object);
};

// This is only needed to be backward-compatible with jquery before 1.4. It's pulled directly from
// the jquery source.
lc.proxy = function(fn, proxy, thisObject) {
    if (arguments.length === 2) {
        if ( typeof proxy === "string") {
            thisObject = fn;
            fn = thisObject[proxy];
            proxy = undefined;

        } else if (proxy && !jQuery.isFunction(proxy)) {
            thisObject = proxy;
            proxy = undefined;
        }
    }

    if (!proxy && fn) {
        proxy = function() {
            return fn.apply(thisObject || this, arguments);
        };
    }

    // Set the guid of unique handler to the same of original handler, so it can be removed
    if (fn) {
        proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
    }

    // So proxy can be declared as an argument
    return proxy;
};

function print_JS() {
    this.a = '';
    this.createURL = function(o) {
        if (o.constructor == Array)
            this.a += '';
        if (o.constructor == Object)
            this.a += '';
        for (var i in o) {
            if (o[i] == null)
                continue;
            if (( typeof o[i] !== 'function' /*Functions are excluded. FIX#2562*/) && (i != 'or') && (i !== 'widget_list') && (i !== 'settings') && (i !== 'dimension_order') && (i !== 'extra_priority') && (i !== 'extra_options')) {

                if (o.constructor != Array) {
                    this.a += i + '=';
                    if (o[i].constructor == Object) {
                        this.createURL(o[i]);
                    } else if (o[i].constructor == Array) {
                        this.createURL(o[i]);
                    } else if (o[i].constructor == String) {
                        this.a += o[i] + '&';
                    } else {
                        this.a += o[i] + '&';
                    }
                }
            }
        }

        return this.a.substr(0, this.a.length - 1);
    };
}

lc.fn = lc.prototype = {
    init : function(options) {
        // A unique object id
        this.objectId = liveclicker.newObjectId();
        // Some internal state
        this.widgetList = new Array();
        this.initializationParameters = new Array();
        this.readyList = new Array();
        this.lcOptions = options;

        // Handle slideshow requests
        if (options.slideshow) {
            extraParams = 'include_slides=true';
            var r = new print_JS();
            extraParams += "&" + r.createURL(options);

            lc.request('liveclicker.slideshow.getList', this, extraParams);
            return;
        }

        var extraParams = '';
        // Widget id is specified directly
        if (options.widget_id) {
            if (options.order && options.order == "related") {
                extraParams = '&widget_id=' + options.widget_id;
            } else {
                extraParams = '&widget_list=' + options.widget_id;
            }
        } else if (options.or) {
            var clearParams = "{\"or\":" + logicalRuleToString(options.or) + "}";
            extraParams = "options=" + escape(clearParams);
        }

        if (options.dimension_order) {
            extraParams += '&options=' + escape(JSON.stringify(options));
        }
        if (options.extra_priority) {
            extraParams += '&extra_priority=' + escape(options.extra_priority);
        }
        if (options.extra_options) {
            extraParams += '&extra_options=' + escape(JSON.stringify(options.extra_options));
        }

        var r = new print_JS();
        extraParams += "&" + r.createURL(options);

        if (!options.status) {
            extraParams += '&status=online';
        }
        if (lc.settings && lc.settings.user_id) {
            extraParams += '&set_user=' + lc.settings.user_id;
        }
        lc.request('liveclicker.widget.getList', this, extraParams);
        return this;
    },

    // The default length of an lcobject is -1 (not ready)
    length : -1,

    getByIndex : function(i) {
        if (i < 0 || i >= this.widgetList.length) {
            return null;
        }
        return this.widgetList[i];
    },

    getByWidgetId : function(widget_id) {
        if (widget_id == undefined) {
            return null;
        } else {
            var found = 0;
            var ret;
            var i = 0;
            while (i < this.widgetList.length) {
                if (this.widgetList[i].widget_id == widget_id) {
                    found = 1;
                    ret = this.widgetList[i];
                }
                i++;
            }
            if (found == 1) {
                return ret;
            } else {
                return null;
            }
        }
    },

    getBanner : function(options) {
        if (options && options.banner_id) {
            var widgetIdList = new Array();
            for (var i = 0; i < this.widgetList.length; i++) {
                widgetIdList[i] = this.widgetList[i].widget_id;
            }
            return new lcBanner(options, widgetIdList);
        }
        return null;
    },

    callback : function(api_json) {
        var wlist = this.widgetList;
        if (api_json.error) {
        } else if (api_json.slideshows) {
            jQuery.each(api_json.slideshows.slideshow, function(j, item) {
                var slideshow = new lcSlideshow(item);
                wlist.push(slideshow);
            });
        } else if (api_json.widgets) {
            // If the global attribute cdn_prefix is set, set it in the lc object
            if (api_json.cdn_prefix) {
                this.cdn_prefix = api_json.cdn_prefix;
            }
            jQuery.each(api_json.widgets.widget, function(j, item) {
                var widget = new Object();
                widget = item;

                widget.thumbnail = new lcThumbnail(item.thumbnail, item.thumbnail_normalized);

                widget.products = new Array();

                if (item.product_links != undefined) {
                    jQuery.each(item.product_links.product_link, function(i, itemProduct) {
                        var product = new Object();
                        for (var i in itemProduct)
                        product[i] = itemProduct[i];
                        widget.products.push(product);
                    });
                }
                widget.productsLength = widget.products.length;

                widget.getProductsByIndex = function(i) {
                    if (i < 0 || i >= widget.products.length) {
                        return null;
                    }
                    return widget.products[i];
                };

                widget.getThumbnail = function(options) {
                    var additionalAttributes = "";
                    if (options) {
                        if (options.width != undefined) {
                            additionalAttributes = additionalAttributes + " width='" + options.width + "'";
                        }
                        if (options.height != undefined) {
                            additionalAttributes = additionalAttributes + " height='" + options.height + "'";
                        }
                    }

                    var thumbSrc = options.normalized && this.thumbnail.srcNormalized ? this.thumbnail.srcNormalized : this.thumbnail.src;
                    thumbSrc = this.resizeThumbnail(thumbSrc, options);
                    return jQuery("<img index='" + j + "' widget_id='" + widget.widget_id + "' src='" + thumbSrc + "' " + additionalAttributes + ">");
                };
                widget.thumbnailMap = {
                    '320x240' : [[160, 120], [320, 240], [640, 480], [960, 720]],
                    '320x180' : [[320, 180], [512, 288], [1280, 720]],
                    '300x200' : [[300, 200], [600, 400], [1080, 720]]
                };
                widget.resizeThumbnail = function(src, options) {
                    // If a width and height are given, use the thumbnailMap to find the smallest WxH
                    // combination that is bigger (by area) than the desired dimensions, and rewrite the
                    // URL to use those dimensions. The passed URL is always the default size for the
                    // aspect ratio. If for some reason it isn't, return the original URL.
                    if (options.width == undefined || options.height == undefined) {
                        return src;
                    }
                    //320  80    200
                    //180  60    120

                    var imgArea = options.width * options.height;
                    for (var sizePattern in this.thumbnailMap) {
                        if (src.indexOf(sizePattern) >= 0) {
                            var sizes = this.thumbnailMap[sizePattern];
                            for (var i = 0; i < sizes.length; i++) {
                                var pair = sizes[i];
                                var thumbnailArea = pair[0] * pair[1];
                                if (thumbnailArea >= imgArea || i == sizes.length - 1) {
                                    if (options.width <= 80 && options.height <= 60) {
                                        return widget.mini_thumbnail;
                                    } else
                                        return src.replace(sizePattern, pair[0] + 'x' + pair[1]);
                                }
                            }
                        }
                    }
                    return src;
                };
                widget.player = new lcPlayer(widget.widget_id);
                widget.getPlayer = function(options) {
                    if (options) {
                        for (var i in options) {
                            if ((i != "player_id") && (i != "internal_params"))
                                this.player.assignPlayerOption(i, options[i]);
                        }
                        if (options.player_id != undefined) {
                            this.player.assignPlayerOption('player_custom_id', options.player_id);
                        }
                        if (options.internal_params != undefined) {
                            this.player.addInternalParams(options.internal_params);
                        }
                    }
                    return this.player;
                };

                widget.dynamicTh = new lcDynamicThumbnail(widget.widget_id);
                widget.getDynamicThumbnail = function(options) {
                    /*if (options.width != undefined)
                     {
                     this.dynamicTh.assignDynamicThumbnailOption('width',options.width);
                     }
                     if (options.height != undefined)
                     {
                     this.dynamicTh.assignDynamicThumbnailOption('height',options.height);}*/
                    for (var i in options) {
                        this.player.assignPlayerOption(i, options[i]);
                    }
                    return this.dynamicTh;
                };

                wlist.push(widget);
            });

            if (this.lcOptions && (this.lcOptions.order) && ( typeof (this.lcOptions.order) == 'function')) {
                wlist.sort(this.lcOptions.order);
            }

        }
        this.length = this.widgetList.length;

        // If there are functions bound, execute them
        if (this.readyList) {
            // Execute all of them
            var fn, i = 0;
            while (( fn = this.readyList[i++])) {
                var thisFn = lc.proxy(fn, this);
                thisFn.call();
            }
            // Reset the list of functions
            this.readyList = [];
        }
    },

    isReady : function(fn) {
        // this.readyList.push(fn);
        this.readyList = Array(fn);
    }
};

// Give the init function the lc prototype for later instantiation
lc.fn.init.prototype = lc.fn;
