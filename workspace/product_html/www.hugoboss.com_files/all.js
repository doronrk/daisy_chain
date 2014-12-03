Array.isArray || (Array.isArray = function (a) {
    return '' + a !== a && {}.toString.call(a) == '[object Array]';
});
var FitsMe;
(function (FitsMe) {
    (function (Constants) {
        (function (Events) {
            Events.buttonClicked = "button clicked";
            Events.buttonShown = "button shown";
        })(Constants.Events || (Constants.Events = {}));
        var Events = Constants.Events;

        (function (GeorgeOmnitureEvents) {
            GeorgeOmnitureEvents.buttonClicked = "event91";
            GeorgeOmnitureEvents.buttonShown = "event90";
        })(Constants.GeorgeOmnitureEvents || (Constants.GeorgeOmnitureEvents = {}));
        var GeorgeOmnitureEvents = Constants.GeorgeOmnitureEvents;
    })(FitsMe.Constants || (FitsMe.Constants = {}));
    var Constants = FitsMe.Constants;
})(FitsMe || (FitsMe = {}));

var FitsMe;
(function (FitsMe) {
    var WindowWrapperClass = (function () {
        function WindowWrapperClass() {
            this.location = window.location.href.toLowerCase();
            this.hostName = window.location.hostname.toLowerCase();
        }
        WindowWrapperClass.prototype.getLocation = function () {
            return this.location;
        };

        WindowWrapperClass.prototype.getHostName = function () {
            return this.hostName;
        };

        WindowWrapperClass.prototype.locationContains = function (s) {
            return !!s && this.getLocation().indexOf(s.toLowerCase()) != -1;
        };
        return WindowWrapperClass;
    })();
    FitsMe.WindowWrapperClass = WindowWrapperClass;

    FitsMe.WindowWrapper = new WindowWrapperClass();
})(FitsMe || (FitsMe = {}));

var FitsMe;
(function (FitsMe) {
    var Base64Class = (function () {
        function Base64Class() {
            this.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        }
        Base64Class.prototype.encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = Base64Class.utf8_encode(input);

            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) + this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
            }

            return output;
        };

        Base64Class.prototype.decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }

            output = Base64Class.utf8_decode(output);

            return output;
        };

        Base64Class.utf8_encode = function (s) {
            s = s.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < s.length; n++) {
                var c = s.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }

            return utftext;
        };

        Base64Class.utf8_decode = function (utftext) {
            var s = "";
            var i = 0;
            var c, c3, c2;

            while (i < utftext.length) {
                c = utftext.charCodeAt(i);

                if (c < 128) {
                    s += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    s += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    s += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }

            return s;
        };
        return Base64Class;
    })();
    FitsMe.Base64Class = Base64Class;

    FitsMe.Base64 = new Base64Class();
})(FitsMe || (FitsMe = {}));

var FitsMe;
(function (FitsMe) {
    (function (Common) {
        'use strict';

        function getDocument() {
            return window.document;
        }
        Common.getDocument = getDocument;
        ;

        function buildGetParams(pJson, propertyExpression) {
            if (!pJson) {
                return '';
            }
            var s = '';
            for (var name in pJson) {
                if (!pJson.hasOwnProperty(name)) {
                    continue;
                }
                var val = pJson[name];
                if (val == null) {
                    continue;
                }
                var newPropertyExpression;
                if (propertyExpression) {
                    newPropertyExpression = propertyExpression + '.' + name;
                } else {
                    newPropertyExpression = name;
                }
                if (Array.isArray(val)) {
                    for (var i = 0; i < val.length; i++) {
                        s += newPropertyExpression + '=' + encodeURIComponent(val[i]) + '&';
                    }
                } else if (typeof val == 'object') {
                    s += buildGetParams(val, newPropertyExpression);
                } else {
                    s += newPropertyExpression + '=' + encodeURIComponent(val) + '&';
                }
            }
            return s;
        }
        Common.buildGetParams = buildGetParams;
        ;

        function getUserAgent() {
            return navigator.userAgent;
        }
        Common.getUserAgent = getUserAgent;
        ;

        function detectMobile() {
            var a = Common.getUserAgent() || navigator.vendor;
            var r = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)));
            return r;
        }
        Common.detectMobile = detectMobile;
        ;

        function detectTablet() {
            var ua = Common.getUserAgent();
            return ua.indexOf('iPad') >= 0 || ua.indexOf('Android') >= 0;
        }
        Common.detectTablet = detectTablet;
        ;

        function detectIe8() {
            var ua = Common.getUserAgent();
            return ua.indexOf('MSIE 8.0') >= 0;
        }
        Common.detectIe8 = detectIe8;
        ;

        function getVfrHost() {
            return FitsMe.settings.VfrHost;
        }
        Common.getVfrHost = getVfrHost;
        ;

        function firstOrNull(collection, predicate) {
            if (!collection) {
                return null;
            }
            for (var i = 0; i < collection.length; i++) {
                var element = collection[i];
                if (predicate(element)) {
                    return element;
                }
            }
            return null;
        }
        Common.firstOrNull = firstOrNull;
        ;

        function first(collection, predicate) {
            var r = firstOrNull(collection, predicate);
            if (r == null) {
                throw 'did not find even single element';
            }
            return r;
        }
        Common.first = first;
        ;

        function resolveSizeSystemKeyword(response) {
            return FitsMeData.SizeSystemKeyword || response.SizeSystem;
        }
        Common.resolveSizeSystemKeyword = resolveSizeSystemKeyword;

        function isShowButton(response) {
            var isMobile = FitsMe.Common.detectMobile(), showButton = false;

            if (isMobile) {
                switch (response.MobileState) {
                    case 1 /* On */:
                        showButton = true;
                        break;
                    case 2 /* ByHash */:
                        if (FitsMe.WindowWrapper.locationContains(FitsMe.settings.MobileHashtag)) {
                            showButton = true;
                        }
                        break;
                    default:
                }
                return showButton;
            }
            return true;
        }
        Common.isShowButton = isShowButton;
        ;

        function resolvePlatformId(response) {
            var mobileDetected = FitsMe.Common.detectMobile();
            var isMobile = false;

            switch (response.MobileState) {
                case 1 /* On */:
                    if (mobileDetected) {
                        isMobile = true;
                    }
                    break;
                case 2 /* ByHash */:
                    if (FitsMe.WindowWrapper.locationContains(FitsMe.settings.MobileHashtag) && mobileDetected) {
                        isMobile = true;
                    }
                    break;
                default:
            }

            var tabletDetected = FitsMe.Common.detectTablet();
            var responseUseTablet = response.DetectTablet;
            var istablet = responseUseTablet && tabletDetected;

            if (isMobile) {
                return FitsMe.settings.Platform.Mobile;
            } else if (istablet) {
                return FitsMe.settings.Platform.Tablet;
            }
            return FitsMe.settings.Platform.Desktop;
        }
        Common.resolvePlatformId = resolvePlatformId;

        function resolveProductTitleParam() {
            var title = FitsMeData.ProductTitle;
            if (!title)
                return null;
            return FitsMe.Base64.encode(title);
        }
        Common.resolveProductTitleParam = resolveProductTitleParam;

        function resolveThumbnailUrlParam() {
            var imageUrl = FitsMeData.ProductImageUrl;
            if (!imageUrl)
                return null;
            return FitsMe.Base64.encode(FitsMe.Base64.encode(imageUrl));
        }
        Common.resolveThumbnailUrlParam = resolveThumbnailUrlParam;

        function resolveSkuParam() {
            var sku = FitsMeData.Id;
            if (sku == null) {
                return null;
            }
            return FitsMe.Base64.encode(sku);
        }
        Common.resolveSkuParam = resolveSkuParam;

        function normalizeSizeTitle(dirtySizeTitle) {
            return dirtySizeTitle.replace(/&quot;?|cm|in\.?(ch)?|["\_\\\/@'\s\n\r\v]/ig, '').toUpperCase();
        }
        Common.normalizeSizeTitle = normalizeSizeTitle;

        function buildLandingLaunchUrl(protocol, vfrHost, clientId, cultureName, platformId, applicationId, sizeSystemKeyword, domainId, trackingCode, googleAnalyticsCode, unit, useLongImperial, gender) {
            var retval = protocol + '://' + vfrHost + '/' + clientId + '/' + cultureName + '/' + unit + '/' + useLongImperial + '/' + platformId + '/' + applicationId + '/' + sizeSystemKeyword + '/' + domainId + '/' + trackingCode + (googleAnalyticsCode ? '/' + googleAnalyticsCode : '');
            if (gender != null) {
                retval += "?gender=" + gender;
            }
            return retval;
        }
        Common.buildLandingLaunchUrl = buildLandingLaunchUrl;
        ;

        function buildProductLaunchUrl(protocol, vfrHost, clientId, cultureName, productId, platformId, applicationId, sizeSystemKeyword, domainId, productTitle, thumbnailUrl, trackingCode, sku, googleAnalyticsCode, unit, useLongImperial) {
            if (!productId)
                return null;

            var url = protocol + '://' + vfrHost + '/' + clientId + '/' + cultureName + '/' + unit + '/' + useLongImperial + '/' + productId + '/' + platformId + '/' + applicationId + '/' + sizeSystemKeyword + '/' + domainId + '/' + productTitle + '/' + thumbnailUrl + '/' + trackingCode + '/' + sku + (googleAnalyticsCode ? '/' + googleAnalyticsCode : '');

            return url;
        }
        Common.buildProductLaunchUrl = buildProductLaunchUrl;
    })(FitsMe.Common || (FitsMe.Common = {}));
    var Common = FitsMe.Common;
})(FitsMe || (FitsMe = {}));

var FitsMe;
(function (FitsMe) {
    'use strict';
    var CookieClass = (function () {
        function CookieClass() {
        }
        CookieClass.prototype.Create = function (name, value, days) {
            if (name === null || value === null)
                return;
            var doc = FitsMe.Common.getDocument();
            if (days === undefined)
                days = 365;
            var expires = '';
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
            doc.cookie = name + '=' + value + expires + '; path=/';
        };
        CookieClass.prototype.Read = function (name) {
            if (!name) {
                throw "name should be defined";
            }
            var doc = FitsMe.Common.getDocument();
            var nameEq = name + '=';
            if (!doc.cookie)
                return null;
            var ca = doc.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ')
                    c = c.substring(1, c.length);
                if (c.indexOf(nameEq) === 0)
                    return c.substring(nameEq.length, c.length);
            }
            return null;
        };
        CookieClass.prototype.Erase = function (name) {
            this.Create(name, '', -1);
        };
        return CookieClass;
    })();
    FitsMe.CookieClass = CookieClass;
    FitsMe.Cookie = new CookieClass();
})(FitsMe || (FitsMe = {}));

var FitsMe;
(function (FitsMe) {
    (function (Jsonp) {
        'use strict';

        var counter = 0, head, config = {};

        function load(url, pfnError) {
            var script = document.createElement('script'), done = false;
            script.src = url;
            script.async = true;

            var errorHandler = pfnError || config.error;
            if (typeof errorHandler === 'function') {
                script.onerror = function (ex) {
                    errorHandler({ url: url, event: ex });
                };
            }

            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                    done = true;
                    script.onload = script.onreadystatechange = null;
                    if (script && script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                }
            };

            if (!head) {
                head = document.getElementsByTagName('head')[0];
            }
            head.appendChild(script);
        }

        function get(url, callback) {
            var query = (url || '').indexOf('?') === -1 ? '?' : '&';

            var callbackName = 'callback';
            var uniqueName = callbackName + '_json' + (++counter);

            Jsonp.callbacks[uniqueName] = function (data) {
                callback(data);
                try  {
                    delete Jsonp.callbacks[uniqueName];
                } catch (e) {
                }
                Jsonp.callbacks[uniqueName] = null;
            };

            load(url + query + callbackName + '=FitsMe.Jsonp.callbacks.' + uniqueName);
            return uniqueName;
        }
        Jsonp.get = get;

        Jsonp.callbacks = {};

        function init(obj) {
            config = obj;
        }
        Jsonp.init = init;
    })(FitsMe.Jsonp || (FitsMe.Jsonp = {}));
    var Jsonp = FitsMe.Jsonp;
})(FitsMe || (FitsMe = {}));

var FitsMe;
(function (FitsMe) {
    'use strict';

    var RequestClass = (function () {
        function RequestClass(windowWrapper, settings, fitsmeData) {
            this.windowWrapper = windowWrapper;
            this.settings = settings;
            this.fitsmeData = fitsmeData;
        }
        RequestClass.prototype.prepare = function () {
            var outValue = this.settings.Protocol + '://' + this.settings.IntegrationDomain + this.settings.IntegrationUrl + '?' + FitsMe.Common.buildGetParams({
                url: this.windowWrapper.getLocation(),
                sku: this.fitsmeData.Id,
                categories: this.fitsmeData.ProductCategories
            });
            return outValue;
        };

        RequestClass.prototype.send = function (query, callback) {
            var _this = this;
            FitsMe.Jsonp.get(query, function (data) {
                if (!data) {
                    return;
                }
                _this.Response = data;
                callback();
            });
        };
        return RequestClass;
    })();
    FitsMe.RequestClass = RequestClass;

    FitsMe.Request = new RequestClass(FitsMe.WindowWrapper, FitsMe.settings, FitsMeData);
})(FitsMe || (FitsMe = {}));

var FitsMe;
(function (FitsMe) {
    (function (Language) {
        'use strict';

        function regexLookup(lookup, value) {
            return lookup && value && lookup.search(new RegExp(value)) >= 0;
        }

        function regularLookup(lookup, value) {
            return lookup && value && lookup.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        }

        function detectLanguage() {
            var languages = FitsMe.Request.Response.Languages, language = undefined, detected = false;

            for (var i = 0; i < languages.length; i++) {
                language = languages[i];
                var detMode = language.DetectMode;
                var detParam = language.DetectParameter;
                var detRegex = language.DetectRegex;
                var detValue = language.DetectValue;
                var queryParam;

                if (detMode == 1 /* Url */) {
                    queryParam = FitsMe.WindowWrapper.getLocation();
                } else if (detMode == 2 /* Cookie */) {
                    if (!detParam) {
                        continue;
                    }
                    queryParam = FitsMe.Cookie.Read(detParam);
                } else if (detMode == 3 /* FitsMeData */) {
                    queryParam = FitsMeData.Locale;
                } else {
                    throw "invalid language detection mode";
                }

                var queryFunction = regularLookup;
                if (detRegex) {
                    queryFunction = regexLookup;
                }

                if (queryFunction(queryParam, detValue)) {
                    detected = true;
                    break;
                }
            }

            if (!detected) {
                language = FitsMe.Common.first(languages, function (l) {
                    return l.IsDefault;
                });
            }

            if (language && FitsMeData.Locale && FitsMeData.OverrideUnit) {
                language.Unit = FitsMeData.OverrideUnit(FitsMeData.Locale);
            }

            return language;
        }
        Language.detectLanguage = detectLanguage;
        ;
    })(FitsMe.Language || (FitsMe.Language = {}));
    var Language = FitsMe.Language;
})(FitsMe || (FitsMe = {}));

var cmCreateElementTag;
var pageTracker;
var _gaq;
var _gat;
var ga;
var s;
var s_gi;

var FitsMe;
(function (FitsMe) {
    (function (Tracking) {
        'use strict';

        Tracking.Component = 'integration';
        Tracking.SessionEvent = 'Fits.me Session Initialised';
        Tracking.SessionCookie = 'fmSessionV2';
        Tracking.SessionValue = '';

        Tracking.GACategory = 'Fits.me Integration';
        Tracking.MobileCategory = 'Fits.me Mobile Integration';
        Tracking.CMCategory = 'Fits.me Integration';
        Tracking.OmnitureCategory = 'Fits.me Integration';
        Tracking.Category = 'int2.0';

        Tracking.initSessionValue = function () {
            var sessionCookie = FitsMe.Cookie.Read(Tracking.SessionCookie);
            if (!sessionCookie) {
                sessionCookie = getGuid();
                FitsMe.Cookie.Create(Tracking.SessionCookie, sessionCookie, 365);
            }
            Tracking.SessionValue = sessionCookie;
        };

        Tracking.trackOmniture = function (action, label, isMobile) {
            var response = FitsMe.Request.Response;
            if (response && response.AnalyticsOm) {
                if (!action) {
                    return;
                }

                FitsMe.wait(function () {
                    return ((s_gi && response.AnalyticsOm.ClientRsId) || (s && s.t && s.channel && s.events && s.prop1)) ? true : false;
                }, function () {
                    if (FitsMeData.OverrideEvent) {
                        action = FitsMeData.OverrideEvent(action);
                    }

                    if (s_gi && response.AnalyticsOm.ClientRsId) {
                        var fm = s_gi(response.AnalyticsOm.ClientRsId);
                        fm.events = action;

                        if (!FitsMeData.OverrideEvent) {
                            fm.channel = isMobile ? Tracking.MobileCategory : Tracking.OmnitureCategory;
                            fm.prop1 = label;
                        }

                        fm.t();
                        return;
                    }

                    s.events = action;

                    if (!FitsMeData.OverrideEvent) {
                        s.channel = isMobile ? Tracking.MobileCategory : Tracking.OmnitureCategory;
                        s.prop1 = label;
                    }
                    s.t();
                });
            }
        };

        Tracking.trackCoremetrics = function (action, label, isMobile) {
            if (FitsMe.Request.Response && FitsMe.Request.Response.AnalyticsCm) {
                if (!action) {
                    return;
                }
                if (cmCreateElementTag) {
                    var category = isMobile ? Tracking.MobileCategory : Tracking.CMCategory;
                    cmCreateElementTag(action, category, label);
                }
            }
        };

        Tracking.trackGoogle = function (action, label, value, isMobile) {
            if (!action) {
                return;
            }
            if (!FitsMe.Request.Response || !FitsMe.Request.Response.AnalyticsGa) {
                return;
            }

            var analyticsGa = FitsMe.Request.Response.AnalyticsGa, category = isMobile ? Tracking.MobileCategory : Tracking.GACategory, instanceName = Tracking.getInstanceString(), instancePrefix = instanceName ? instanceName + '.' : '', isNonInteraction = false;

            if (action.indexOf(FitsMe.Constants.Events.buttonShown) > -1) {
                isNonInteraction = !analyticsGa.UseInteraction;
            }

            switch (analyticsGa.Kind) {
                case 0 /* Sync */:
                    if (pageTracker && pageTracker._trackEvent) {
                        pageTracker._trackEvent(category, action, label, value, isNonInteraction);
                    }
                    break;
                case 1 /* Async */:
                    if (_gaq && _gaq.push) {
                        _gaq.push([instancePrefix + '_trackEvent', category, action, label, value, isNonInteraction]);
                    }
                    break;
                case 2 /* Universal */:
                    if (ga) {
                        ga(instancePrefix + 'send', 'event', category, action, label, value);
                    }
                    break;
                default:
            }
        };

        function getInstanceString() {
            var response = FitsMe.Request.Response;
            if (response) {
                var analyticsGa = response.AnalyticsGa;
                if (analyticsGa) {
                    var instanceString = analyticsGa.InstanceString;
                    if (instanceString) {
                        return instanceString;
                    }
                    if (analyticsGa.Kind == 2 /* Universal */) {
                        return '';
                    }
                }
            }
            return '';
        }
        Tracking.getInstanceString = getInstanceString;

        var getGuid = function () {
            var s4 = function () {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            };
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };

        Tracking.getSizeIdsString = function () {
            var retval = '';

            if (FitsMeData.Sizes) {
                for (var i = 0; i < FitsMeData.Sizes.length; i++) {
                    retval += FitsMeData.Sizes[i].ID + ',';
                }
            }
            return retval.substring(0, retval.length - 1);
        };

        Tracking.getInternalTrackerUrl = function (data) {
            if (!data.action) {
                return null;
            }
            var url = FitsMe.settings.Protocol + '://' + FitsMe.settings.VfrHost + FitsMe.settings.TrackingUrl + '?' + FitsMe.Common.buildGetParams({
                clientId: FitsMe.Request.Response.ClientApp,
                productId: FitsMe.Request.Response.ProductId,
                cultureName: FitsMe.Language.detectLanguage().Locale,
                gaTrackingCode: Tracking.getGAProfile(),
                gender: data.gender,
                sku: FitsMeData.Id,
                trackingCode: Tracking.SessionValue,
                sizeIds: Tracking.getSizeIdsString(),
                component: Tracking.Component,
                eventCategory: Tracking.Category,
                eventAction: data.action,
                eventLabel: data.label,
                eventValue: data.value
            });
            return url;
        };

        Tracking.getImageObj = function (url) {
            (new Image()).src = url;
        };

        Tracking.trackInternal = function (data) {
            if (!data.action) {
                return;
            }
            var url = Tracking.getInternalTrackerUrl(data);
            Tracking.getImageObj(url);
        };

        Tracking.getGAProfile = function () {
            var response = FitsMe.Request.Response;
            if (!response || !response.AnalyticsGa) {
                return null;
            }
            var gaAnalytics = response.AnalyticsGa;
            if (!gaAnalytics.AutoIdentify) {
                return gaAnalytics.Profile;
            }
            var gaProfile = null;
            switch (gaAnalytics.Kind) {
                case 1 /* Async */:
                    if (_gat && _gat._getTrackerByName) {
                        var instance = getInstanceString();
                        var gatrk = _gat._getTrackerByName(instance);
                        gaProfile = gatrk._getAccount();
                    }
                    break;
                case 0 /* Sync */:
                    if (pageTracker && pageTracker._getAccount) {
                        gaProfile = pageTracker._getAccount();
                    }
                    break;
                case 2 /* Universal */:
                default:
                    return null;
            }
            if (gaProfile) {
                return gaProfile;
            }
            if (gaAnalytics.FailFallback) {
                return gaAnalytics.Profile;
            }
            return null;
        };

        function Track(data) {
            if (!Tracking.SessionValue) {
                Tracking.initSessionValue();
            }
            Tracking.trackInternal(data);
            Tracking.trackCoremetrics(data.action, data.label, data.isMobile);
            Tracking.trackGoogle(data.action, data.label, data.value, data.isMobile);
            Tracking.trackOmniture(data.action, data.label, data.isMobile);
        }
        Tracking.Track = Track;

        function storeGACustomVar(slotno, varname, varvalue) {
            if (!slotno || !varname || !varvalue || typeof slotno !== "number") {
                return;
            }
            if (slotno <= 0) {
                return;
            }
            if (!FitsMe.Request.Response || !FitsMe.Request.Response.AnalyticsGa) {
                return;
            }
            var analyticsGa = FitsMe.Request.Response.AnalyticsGa;

            var instance = Tracking.getInstanceString();
            if (instance) {
                instance = instance + '.';
            }

            var score = 2;
            if (analyticsGa.Kind === 0 /* Sync */ && pageTracker && pageTracker._setCustomVar) {
                pageTracker._setCustomVar(slotno, varname, varvalue, score);
            } else if (analyticsGa.Kind === 1 /* Async */ && _gaq && _gaq.push) {
                _gaq.push([instance + '_setCustomVar', slotno, varname, varvalue, score]);
            } else if (analyticsGa.Kind === 2 /* Universal */ && ga) {
                ga(instance + 'set', 'dimension' + slotno, varvalue);
            }
        }
        Tracking.storeGACustomVar = storeGACustomVar;

        Tracking.TrackSession = function () {
            if (!Tracking.SessionValue) {
                Tracking.initSessionValue();
            }

            Tracking.trackInternal({ action: Tracking.SessionEvent, label: Tracking.SessionValue });
            if (FitsMe.Request.Response) {
                var resp = FitsMe.Request.Response;
                if (resp.AnalyticsOm && resp.AnalyticsOm.PushFmSession) {
                    Tracking.trackOmniture(Tracking.SessionValue, resp.AnalyticsOm.FmSessionTag);
                }
                if (resp.AnalyticsCm && resp.AnalyticsCm.PushFmSession) {
                    Tracking.trackCoremetrics(Tracking.SessionValue, resp.AnalyticsCm.FmSessionTag);
                }
                if (resp.AnalyticsGa && resp.AnalyticsGa.PushFmSession) {
                    Tracking.storeGACustomVar(resp.AnalyticsGa.FmCustomSlot, resp.AnalyticsGa.FmSessionTag, Tracking.SessionValue);
                }
            }
        };

        Tracking.enableCrossDomainGA = function () {
            if (FitsMe.Request.Response && FitsMe.Request.Response.AnalyticsGa) {
                var resp = FitsMe.Request.Response;
                var analyticsGa = resp.AnalyticsGa;
                var domain = FitsMe.WindowWrapper.getHostName();
                var instance = Tracking.getInstanceString();

                if (instance.length) {
                    instance = instance + '.';
                }
                if (analyticsGa.Kind === 0 /* Sync */ && pageTracker && pageTracker._setDomainName && pageTracker._setAllowLinker) {
                    pageTracker._setDomainName(domain);
                    pageTracker._setAllowLinker(true);
                }
                if (analyticsGa.Kind === 1 /* Async */ && _gaq && _gaq.push) {
                    _gaq.push([instance + '_setAllowLinker', true]);
                    _gaq.push([instance + '_setDomainName', domain]);
                }
            }
        };

        Tracking.addTrackerVars = function (url) {
            if (!url) {
                return null;
            }
            if (FitsMe.Request.Response && FitsMe.Request.Response.AnalyticsGa) {
                var analyticsGa = FitsMe.Request.Response.AnalyticsGa;
                var instance = getInstanceString();

                if (analyticsGa.Kind === 0 /* Sync */ && pageTracker && pageTracker._getLinkerUrl) {
                    url = pageTracker._getLinkerUrl(url);
                }

                if (analyticsGa.Kind === 1 /* Async */ && _gat && _gat._getTrackerByName) {
                    var tracker = _gat._getTrackerByName(instance);

                    if (tracker._getLinkerUrl) {
                        url = tracker._getLinkerUrl(url);
                    }
                }

                if (analyticsGa.Kind === 2 /* Universal */ && ga) {
                    ga(function () {
                        tracker = ga.getByName(instance);
                        var linker = new gaplugins.Linker(tracker);
                        url = linker.decorate(url);
                    });
                }
            }
            return url;
        };
    })(FitsMe.Tracking || (FitsMe.Tracking = {}));
    var Tracking = FitsMe.Tracking;
})(FitsMe || (FitsMe = {}));

var FitsMe;
(function (FitsMe) {
    (function (Buttons) {
        'use strict';

        function getButtonAttributeValue(id, propertySelector) {
            if (FitsMe.Request.Response && FitsMe.Request.Response.Buttons) {
                var buttons = FitsMe.Request.Response.Buttons;
                for (var i = 0; i < buttons.length; i++) {
                    if (buttons[i].Id == id) {
                        return propertySelector(buttons[i]);
                    }
                }
            }
            return null;
        }
        Buttons.getButtonAttributeValue = getButtonAttributeValue;
        ;

        function lookup(selector) {
            var doc = FitsMe.Common.getDocument();
            return doc.querySelector(selector);
        }
        Buttons.lookup = lookup;
        ;

        function getSplitIndex(max) {
            return Math.floor(Math.random() * (max + 1));
        }
        Buttons.getSplitIndex = getSplitIndex;
        ;

        function getResponseButton(id) {
            if (FitsMe.Request.Response && FitsMe.Request.Response.Buttons) {
                var resp = FitsMe.Request.Response;
                for (var i = 0; i < resp.Buttons.length; i++) {
                    if (resp.Buttons[i].Id == id) {
                        return resp.Buttons[i];
                    }
                }
            }

            return null;
        }
        Buttons.getResponseButton = getResponseButton;
        ;

        function genderAsString(gender) {
            return gender ? 'female' : 'male';
        }

        function getEventData(op, objContainer, buttonId) {
            if (!FitsMe.Request.Response) {
                return null;
            }

            var action, label, gender, resp = FitsMe.Request.Response, splitId = null, variationId = null, genderStr, isMobile;

            action = label = 'unknownapp ';

            isMobile = FitsMe.Common.detectMobile() || FitsMe.Common.detectTablet();

            if (resp.Application == FitsMe.settings.VfrId) {
                action = label = isMobile ? 'mobile vfr ' : 'vfr ';
            }
            if (resp.Application == FitsMe.settings.FaId) {
                action = label = isMobile ? 'mobile fa ' : 'fa ';
            }

            if (buttonId) {
                splitId = getButtonAttributeValue(buttonId, function (b) {
                    return b.SplitId;
                });
                variationId = getButtonAttributeValue(buttonId, function (b) {
                    return b.SplitVariationId;
                });
            }
            if (objContainer && objContainer.IsLanding) {
                gender = objContainer.Gender == 1 /* Female */;
            } else {
                gender = resp.Gender;
            }
            var title = objContainer ? objContainer.Title : '';
            genderStr = genderAsString(gender);
            action += op + ' - ' + genderStr + ' - ' + title;
            label += op + ';' + genderStr + ';' + title;
            label += ';' + FitsMeData.Id;

            if (splitId && variationId) {
                action += ' - ' + splitId + ' - ' + variationId;
                label += ';' + splitId + ';' + variationId;
            }

            return {
                action: action,
                label: label,
                gender: gender,
                isMobile: isMobile
            };
        }
        Buttons.getEventData = getEventData;
        ;

        function injectEverywhere(fullUrl) {
            if (FitsMe.Request.Response && FitsMe.Request.Response.Containers) {
                for (var i = 0; i < FitsMe.Request.Response.Containers.length; i++) {
                    Buttons.processContainer(FitsMe.Request.Response.Containers[i], fullUrl);
                }
            }
        }
        Buttons.injectEverywhere = injectEverywhere;
        ;

        function forEach(list, cb) {
            for (var i = 0; i < list.length; i++) {
                var el = list[i];
                cb(el);
            }
        }

        function addClick(selector, callbackfn) {
            var doc = FitsMe.Common.getDocument();
            var els = doc.querySelectorAll(selector);
            for (var i = 0; i < els.length; i++) {
                var el = els[i];
                if (el.addEventListener) {
                    el.addEventListener('click', callbackfn, false);
                } else {
                    el.attachEvent('onclick', function () {
                        if (/complete|loaded/.test(el.readyState)) {
                            callbackfn();
                        }
                    });
                }
            }
        }
        Buttons.addClick = addClick;
        ;

        function showStyle(selector, state) {
            var doc = FitsMe.Common.getDocument();
            var els = doc.querySelectorAll(selector);
            for (var i = 0; i < els.length; i++) {
                els[i].style.display = state;
            }
        }
        Buttons.showStyle = showStyle;
        ;

        function showJQuery(selector, visible) {
            var jQ = jQuery || $;
            if (jQ) {
                var obj = jQ(selector);

                if (!obj) {
                    return;
                }
                if (visible) {
                    obj.show();
                } else {
                    obj.hide();
                }
            }
        }
        Buttons.showJQuery = showJQuery;
        ;

        function applyClass(selector, classValue) {
            var doc = FitsMe.Common.getDocument();
            forEach(doc.querySelectorAll(selector), function (el) {
                return el.className = classValue;
            });
        }
        Buttons.applyClass = applyClass;
        ;

        function getLocaleButtons(locale, containerid) {
            if (!containerid || !locale || !FitsMe.Request.Response || !FitsMe.Request.Response.Buttons) {
                return null;
            }
            var buttons = FitsMe.Request.Response.Buttons;
            var retarr = [];
            var thereIsSplit = false;

            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].ContainerId != containerid) {
                    continue;
                }
                if (buttons[i].SplitId && thereIsSplit === false) {
                    thereIsSplit = true;
                }

                if (buttons[i].Locale == locale) {
                    retarr.push(buttons[i]);
                    if (thereIsSplit === false) {
                        break;
                    }
                }
            }

            if (retarr.length === 0) {
                return null;
            }

            return {
                buttons: retarr,
                hassplit: thereIsSplit
            };
        }
        Buttons.getLocaleButtons = getLocaleButtons;
        ;

        function getButtonIdfromVariation(butarr, varid) {
            if (butarr && varid != null && butarr.buttons.length > 0) {
                for (var i = 0; i < butarr.buttons.length; i++) {
                    if (butarr.buttons[i].SplitVariationId == varid) {
                        return butarr.buttons[i].Id;
                    }
                }
            }
            return null;
        }
        Buttons.getButtonIdfromVariation = getButtonIdfromVariation;
        ;

        function getClientSplitVariation(butarr) {
            if (butarr && butarr.buttons && butarr.buttons.length > 0) {
                var activeVariation = parseInt(FitsMe.Cookie.Read('fmSplit-' + butarr.buttons[0].SplitId));
                if (isNaN(activeVariation)) {
                    var useSplitIdx = Buttons.getSplitIndex(butarr.buttons.length - 1);
                    activeVariation = butarr.buttons[useSplitIdx].SplitVariationId;
                    FitsMe.Cookie.Create('fmSplit-' + butarr.buttons[0].SplitId, activeVariation.toString());
                }
                return activeVariation;
            }
            return null;
        }
        Buttons.getClientSplitVariation = getClientSplitVariation;
        ;

        function getSplitButton(butarr) {
            if (butarr && butarr.buttons && butarr.buttons.length > 0) {
                var selbuttonvariation = Buttons.getClientSplitVariation(butarr);

                if (selbuttonvariation != null) {
                    return Buttons.getButtonIdfromVariation(butarr, selbuttonvariation);
                }
            }
            return null;
        }
        Buttons.getSplitButton = getSplitButton;
        ;

        function determineButton(objContainer) {
            if (objContainer && FitsMe.Request.Response && FitsMe.Request.Response.Buttons && FitsMe.Request.Response.Buttons.length > 0) {
                var language = FitsMe.Language.detectLanguage();

                var cId = objContainer.Id;

                var locbuttons = getLocaleButtons(language.Locale, cId);

                if (locbuttons) {
                    if (locbuttons.buttons.length == 1) {
                        return locbuttons.buttons[0].Id;
                    }
                    if (locbuttons.hassplit === true && locbuttons.buttons.length > 1) {
                        return Buttons.getSplitButton(locbuttons);
                    }
                }
            }
            return null;
        }
        Buttons.determineButton = determineButton;
        ;

        function injectButton(buttonId, containerSelector) {
            if (buttonId && containerSelector) {
                var container = Buttons.lookup(containerSelector);
                var button = Buttons.getResponseButton(buttonId);

                if (container && button) {
                    var imgRegular = button.UrlRegular;
                    var imgHover = button.UrlHover;
                    var imgMobile = button.UrlMobile;
                    var htmlCode = "";

                    if (FitsMe.Common.detectMobile() && imgMobile) {
                        htmlCode = '<a onclick="return false;" href="javascript:void(0);"><img src="' + imgMobile + '" style="margin:0px; padding:0px; border:0px;"></a>';

                        Buttons.setHTML(container, htmlCode);
                    } else if (imgRegular) {
                        htmlCode = '<a onclick="return false;" href="javascript:void(0);"><img src="' + imgRegular + '" style="margin:0px; padding:0px; border:0px;"></a>';

                        Buttons.setHTML(container, htmlCode);

                        if (imgHover) {
                            Buttons.setHover(containerSelector + ' a img', imgRegular, imgHover);
                        }
                    }
                }
            }
        }
        Buttons.injectButton = injectButton;
        ;

        function setHTML(obj, html) {
            if (obj && html) {
                obj.innerHTML = html;
            }
        }
        Buttons.setHTML = setHTML;
        ;

        function visualise(objContainer, isVisible) {
            switch (objContainer.ShowMode) {
                case 1 /* JQuery */:
                    showJQuery(objContainer.ContainerAccessor, isVisible);
                    break;
                case 2 /* StyleDisplay */:
                    var showStyle = 'block';
                    var hideStyle = 'none';
                    if (objContainer.ShowParameters) {
                        showStyle = objContainer.ShowParameters;
                    }
                    if (objContainer.HideParameters) {
                        hideStyle = objContainer.HideParameters;
                    }
                    Buttons.showStyle(objContainer.ContainerAccessor, isVisible ? showStyle : hideStyle);
                    break;
                case 3 /* ClassName */:
                    var showClass = '';
                    var hideClass = '';
                    if (objContainer.ShowParameters) {
                        showClass = objContainer.ShowParameters;
                    }
                    if (objContainer.HideParameters) {
                        hideClass = objContainer.HideParameters;
                    }
                    applyClass(objContainer.ContainerAccessor, isVisible ? showClass : hideClass);
                    break;
            }
        }
        Buttons.visualise = visualise;
        ;

        function setHover(selector, regular, hover) {
            if (selector && regular && hover) {
                (new Image()).src = hover;

                var buttonImage = lookup(selector);
                if (!buttonImage) {
                    return;
                }
                buttonImage.onmouseover = function () {
                    buttonImage.src = hover;
                };
                buttonImage.onmouseout = function () {
                    buttonImage.src = regular;
                };
            }
        }
        Buttons.setHover = setHover;
        ;

        Buttons.WindowHandler = null;

        Buttons.stopCallback = function (data) {
            var sizeTitle = undefined, common = FitsMe.Common, title = data.sizeTitle;

            if (FitsMeData.Events) {
                if (FitsMeData.Events.SizeCallback) {
                    FitsMeData.Events.SizeCallback(data);
                }

                if (FitsMeData.Events.AddToCart) {
                    var sizeId = undefined;

                    FitsMeData.Sizes.forEach(function (size) {
                        if (common.normalizeSizeTitle(size.Title) == common.normalizeSizeTitle(title)) {
                            sizeId = size.ID;
                            sizeTitle = size.Title;
                        }
                    });
                    FitsMeData.Events.AddToCart(sizeId, sizeTitle);
                }
            }
            if (FitsMeData.SelectSize) {
                FitsMeData.Sizes.forEach(function (size) {
                    if (common.normalizeSizeTitle(size.Title) == common.normalizeSizeTitle(title)) {
                        sizeTitle = size.Title;
                    }
                });
                FitsMeData.SelectSize(sizeTitle);
            }
        };

        function processContainer(objContainer, fullUrl) {
            if (!objContainer || !fullUrl) {
                return;
            }

            var buttonId = Buttons.determineButton(objContainer);

            if (buttonId && !objContainer.NoInject) {
                Buttons.injectButton(buttonId, objContainer.ContainerAccessor);
            }

            Buttons.visualise(objContainer, true);

            var mobileDetected = FitsMe.Common.detectMobile();
            var tabletDetected = FitsMe.Common.detectTablet();
            var ie8Detected = FitsMe.Common.detectIe8();

            if (fitsme && fitsme.layer) {
                if (mobileDetected || tabletDetected || ie8Detected) {
                    Buttons.WindowHandler = new fitsme.layer.vfr.Popup();
                } else {
                    Buttons.WindowHandler = new fitsme.layer.vfr.IFrame();
                }
                Buttons.WindowHandler.onStopped(Buttons.stopCallback);
            }

            var data;
            if (!objContainer.IsLanding) {
                Buttons.addClick(objContainer.ContainerAccessor, function () {
                    Buttons.openApp(fullUrl, objContainer, buttonId);
                });

                data = Buttons.getEventData(FitsMe.Constants.Events.buttonShown, objContainer, buttonId);
            } else {
                Buttons.addClick(objContainer.ContainerAccessor, function () {
                    Buttons.openApp(fullUrl, objContainer, buttonId, FitsMe.Constants.Events.buttonClicked);
                });

                data = Buttons.getEventData(FitsMe.Constants.Events.buttonShown, objContainer, buttonId);
            }
            FitsMe.Tracking.Track(data);
        }
        Buttons.processContainer = processContainer;
        ;

        function openApp(fullUrl, objContainer, buttonId, eventoverride) {
            var evt = FitsMe.Constants.Events.buttonClicked;

            if (eventoverride) {
                evt = eventoverride;
            }
            fullUrl = FitsMe.Tracking.addTrackerVars(fullUrl);

            var data = Buttons.getEventData(evt, objContainer, buttonId);

            FitsMe.Tracking.Track(data);

            if (Buttons.WindowHandler && Buttons.WindowHandler.open) {
                Buttons.WindowHandler.open(fullUrl);
            }
        }
        Buttons.openApp = openApp;
        ;
    })(FitsMe.Buttons || (FitsMe.Buttons = {}));
    var Buttons = FitsMe.Buttons;
})(FitsMe || (FitsMe = {}));

var FitsMe;
(function (FitsMe) {
    (function (Integrator) {
        function integrate() {
            var response = FitsMe.Request.Response;

            if (!response) {
                return;
            }

            FitsMe.Tracking.enableCrossDomainGA();
            FitsMe.Tracking.TrackSession();

            var platformId = FitsMe.Common.resolvePlatformId(response);
            var productid = response.ProductId;
            var clientid = response.ClientApp;
            var sizeSystemKeyword = FitsMe.Common.resolveSizeSystemKeyword(response);
            var productTitle = FitsMe.Common.resolveProductTitleParam();
            var thumbnailUrl = FitsMe.Common.resolveThumbnailUrlParam();
            var googleAnalyticsCode = FitsMe.Tracking.getGAProfile();
            var protocol = FitsMe.settings.Protocol;
            var applicationId = response.Application;
            var language = FitsMe.Language.detectLanguage();
            var trackingCode = FitsMe.Tracking.SessionValue;
            var sku = FitsMe.Common.resolveSkuParam();
            var vfrHost = FitsMe.settings.VfrHost;
            var domainId = response.DomainId;
            var cultureName = language.Locale;
            var unit = language.Unit;
            var useLongImperial = language.UseLongImperial;
            var landingLaunchUrl;
            var productLaunchUrl = FitsMe.Common.buildProductLaunchUrl(protocol, vfrHost, clientid, cultureName, productid, platformId, applicationId, sizeSystemKeyword, domainId, productTitle, thumbnailUrl, trackingCode, sku, googleAnalyticsCode, unit, useLongImperial);

            for (var i = 0; i < response.Containers.length; i++) {
                var container = response.Containers[i];
                if (container.IsLanding) {
                    landingLaunchUrl = FitsMe.Common.buildLandingLaunchUrl(protocol, vfrHost, clientid, cultureName, platformId, applicationId, container.SizeSystem, domainId, trackingCode, googleAnalyticsCode, unit, useLongImperial, container.Gender);
                    FitsMe.Buttons.processContainer(container, landingLaunchUrl);
                } else {
                    FitsMe.Buttons.processContainer(container, productLaunchUrl);
                }
            }

            autoOpenIfNeeded(productLaunchUrl || landingLaunchUrl);
        }
        Integrator.integrate = integrate;
        ;

        function autoOpenIfNeeded(autoOpenLaunchUrl) {
            if (!autoOpenLaunchUrl) {
                return;
            }
            if (!FitsMe.WindowWrapper.locationContains(FitsMe.settings.AutoOpenHashtag)) {
                return;
            }
            FitsMe.Buttons.openApp(autoOpenLaunchUrl, null, null, 'auto open');
        }

        function sendQuery(cb) {
            var query = FitsMe.Request.prepare();
            FitsMe.Request.send(query, cb);
        }
        Integrator.sendQuery = sendQuery;
    })(FitsMe.Integrator || (FitsMe.Integrator = {}));
    var Integrator = FitsMe.Integrator;
})(FitsMe || (FitsMe = {}));

