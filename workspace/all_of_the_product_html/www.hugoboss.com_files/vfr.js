
    var FitsMe = {
        settings: {"VfrHost":"vfr7.fits.me","IntegrationDomain":"integration.fits.me","LayeringFramework":"http://vfr7.fits.me/Scripts/layer","Protocol":"http","AutoOpenHashtag":"autoopenvfr","MobileHashtag":"fitsme","Platform":{"Mobile":"b0b8c348-96ee-4b59-81d4-73261d7b02e0","Desktop":"b61c8a68-fd87-46e7-9044-197feb56ae78","Tablet":"a70fadc1-ff4b-46b4-abe0-80c37f70cfc0"},"VfrId":"7abaa238-9440-4d2a-bb8b-3de836ee9a79","FaId":"e438c28f-add9-408f-b51f-fdbbf80a1ccd","CustomUrl":"/c","IntegrationUrl":"/i","TrackingUrl":"/d/p/ti","BundleUrl":"/all?v=k92poEQGFR9P8jCXP_1gV0urqBUUhF6hov0vgd8uG8M1"},
        wait: function (predicate, callback) {
            'use strict';
            var intervalId = setInterval(function () {
                if (!predicate()) {
                    return;
                }
                clearInterval(intervalId);
                callback();
            }, 100);
            setTimeout(function () {
                clearInterval(intervalId);
            }, 60000);
        },
        isDocumentReady: function () {
            'use strict';
            return document.readyState != 'loading';
        },
        isFitsMeData: function () {
            'use strict';
            return window.FitsMeData;
        },
        loadScript: function (url, cb) {
            'use strict';
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = url;

            if (s.addEventListener) {
                s.addEventListener('load', cb, false);
            } else {
                s.attachEvent('onreadystatechange', function () {
                    if (/complete|loaded/.test(s.readyState)) {
                        cb();
                    }
                });
            }

            var e = document.getElementsByTagName('script')[0];
            e.parentNode.insertBefore(s, e);
        },
    };
    (function () {
        'use strict';

        FitsMe.wait(
            function() {
                return FitsMe.isDocumentReady() && FitsMe.isFitsMeData();
            },
            function () {
                var loaded = {
                    response: false,
                    layering: false
                };
                function onLoaded() {
                    if (loaded.response && !FitsMe.Common.isShowButton(FitsMe.Request.Response)) {
                        return;
                    }

                    if (loaded.response && loaded.layering) {
                        FitsMe.Integrator.integrate();
                    }
                }

                FitsMe.loadScript(FitsMe.settings.Protocol + "://" + FitsMe.settings.IntegrationDomain + FitsMe.settings.BundleUrl, function () {
                    (function(){
                        var sizeSystemKeywordMapping = [
    { a: '50240762', l: 'en_us', s: 'us' }, { a: '50240762', l: 'de_de', s: 'eu' }, { a: '50240762', l: 'nl_nl', s: 'eu' }, { a: '50240762', l: 'fr_fr', s: 'eufr' }, { a: '50240762', l: 'it_it', s: 'euit' }, { a: '50240762', l: 'es_es', s: 'eu' }, { a: '50240762', l: 'fr_ch', s: 'eu' }, { a: '50240762', l: 'de_at', s: 'eu' }, { a: '50240762', l: 'de_ch', s: 'eu' }, { a: '50240762', l: 'en_gb', s: 'uk' },
    { a: '50232627', l: 'en_us', s: 'hbus1' }, { a: '50232627', l: 'de_de', s: 'eu' }, { a: '50232627', l: 'nl_nl', s: 'eu' }, { a: '50232627', l: 'fr_fr', s: 'eu' }, { a: '50232627', l: 'it_it', s: 'eu' }, { a: '50232627', l: 'es_es', s: 'eu' }, { a: '50232627', l: 'fr_ch', s: 'eu' }, { a: '50232627', l: 'de_at', s: 'eu' }, { a: '50232627', l: 'de_ch', s: 'eu' }, { a: '50232627', l: 'en_gb', s: 'eu' },
    { a: '50182029', l: 'en_us', s: 'hbus1' }, { a: '50182029', l: 'de_de', s: 'eu' }, { a: '50182029', l: 'nl_nl', s: 'eu' }, { a: '50182029', l: 'fr_fr', s: 'eu' }, { a: '50182029', l: 'it_it', s: 'eu' }, { a: '50182029', l: 'es_es', s: 'eu' }, { a: '50182029', l: 'fr_ch', s: 'eu' }, { a: '50182029', l: 'de_at', s: 'eu' }, { a: '50182029', l: 'de_ch', s: 'eu' }, { a: '50182029', l: 'en_gb', s: 'eu' },
    { a: '50119990', l: 'en_us', s: 'let' }, { a: '50119990', l: 'de_de', s: 'let' }, { a: '50119990', l: 'nl_nl', s: 'let' }, { a: '50119990', l: 'fr_fr', s: 'let' }, { a: '50119990', l: 'it_it', s: 'let' }, { a: '50119990', l: 'es_es', s: 'let' }, { a: '50119990', l: 'fr_ch', s: 'let' }, { a: '50119990', l: 'de_at', s: 'let' }, { a: '50119990', l: 'de_ch', s: 'let' }, { a: '50119990', l: 'en_gb', s: 'let' },
    { a: '50237804', l: 'en_us', s: 'let' }, { a: '50237804', l: 'de_de', s: 'let' }, { a: '50237804', l: 'nl_nl', s: 'let' }, { a: '50237804', l: 'fr_fr', s: 'let' }, { a: '50237804', l: 'it_it', s: 'let' }, { a: '50237804', l: 'es_es', s: 'let' }, { a: '50237804', l: 'fr_ch', s: 'let' }, { a: '50237804', l: 'de_at', s: 'let' }, { a: '50237804', l: 'de_ch', s: 'let' }, { a: '50237804', l: 'en_gb', s: 'let' },
    { a: '50204030', l: 'en_us', s: 'uk' }, { a: '50204030', l: 'de_de', s: 'eun' }, { a: '50204030', l: 'nl_nl', s: 'eun' }, { a: '50204030', l: 'fr_fr', s: 'eun' }, { a: '50204030', l: 'it_it', s: 'eun' }, { a: '50204030', l: 'es_es', s: 'eun' }, { a: '50204030', l: 'fr_ch', s: 'eun' }, { a: '50204030', l: 'de_at', s: 'eun' }, { a: '50204030', l: 'de_ch', s: 'eun' }, { a: '50204030', l: 'en_gb', s: 'eun' },
    { a: '50121367', l: 'en_us', s: 'uk' }, { a: '50121367', l: 'de_de', s: 'eun' }, { a: '50121367', l: 'nl_nl', s: 'eun' }, { a: '50121367', l: 'fr_fr', s: 'eun' }, { a: '50121367', l: 'it_it', s: 'eun' }, { a: '50121367', l: 'es_es', s: 'eun' }, { a: '50121367', l: 'fr_ch', s: 'eun' }, { a: '50121367', l: 'de_at', s: 'eun' }, { a: '50121367', l: 'de_ch', s: 'eun' }, { a: '50121367', l: 'en_gb', s: 'eun' },
    { a: '50182831', l: 'en_us', s: 'let' }, { a: '50182831', l: 'de_de', s: 'let' }, { a: '50182831', l: 'nl_nl', s: 'let' }, { a: '50182831', l: 'fr_fr', s: 'let' }, { a: '50182831', l: 'it_it', s: 'let' }, { a: '50182831', l: 'es_es', s: 'let' }, { a: '50182831', l: 'fr_ch', s: 'let' }, { a: '50182831', l: 'de_at', s: 'let' }, { a: '50182831', l: 'de_ch', s: 'let' }, { a: '50182831', l: 'en_gb', s: 'let' },
    { a: '50237043', l: 'en_us', s: 'let' }, { a: '50237043', l: 'de_de', s: 'let' }, { a: '50237043', l: 'nl_nl', s: 'let' }, { a: '50237043', l: 'fr_fr', s: 'let' }, { a: '50237043', l: 'it_it', s: 'let' }, { a: '50237043', l: 'es_es', s: 'let' }, { a: '50237043', l: 'fr_ch', s: 'let' }, { a: '50237043', l: 'de_at', s: 'let' }, { a: '50237043', l: 'de_ch', s: 'let' }, { a: '50237043', l: 'en_gb', s: 'let' },
    { a: '50273095', l: 'en_us', s: 'uk' }, { a: '50273095', l: 'de_de', s: 'eun' }, { a: '50273095', l: 'nl_nl', s: 'eun' }, { a: '50273095', l: 'fr_fr', s: 'eun' }, { a: '50273095', l: 'it_it', s: 'eun' }, { a: '50273095', l: 'es_es', s: 'eun' }, { a: '50273095', l: 'fr_ch', s: 'eun' }, { a: '50273095', l: 'de_at', s: 'eun' }, { a: '50273095', l: 'de_ch', s: 'eun' }, { a: '50273095', l: 'en_gb', s: 'eun' },
    { a: '50242560', l: 'en_us', s: 'hbus1' }, { a: '50242560', l: 'de_de', s: 'eu' }, { a: '50242560', l: 'nl_nl', s: 'eu' }, { a: '50242560', l: 'fr_fr', s: 'eu' }, { a: '50242560', l: 'it_it', s: 'eu' }, { a: '50242560', l: 'es_es', s: 'eu' }, { a: '50242560', l: 'fr_ch', s: 'eu' }, { a: '50242560', l: 'de_at', s: 'eu' }, { a: '50242560', l: 'de_ch', s: 'eu' }, { a: '50242560', l: 'en_gb', s: 'eu' },
    { a: '50270920', l: 'en_us', s: 'hbus1' }, { a: '50270920', l: 'de_de', s: 'eu' }, { a: '50270920', l: 'nl_nl', s: 'eu' }, { a: '50270920', l: 'fr_fr', s: 'eu' }, { a: '50270920', l: 'it_it', s: 'eu' }, { a: '50270920', l: 'es_es', s: 'eu' }, { a: '50270920', l: 'fr_ch', s: 'eu' }, { a: '50270920', l: 'de_at', s: 'eu' }, { a: '50270920', l: 'de_ch', s: 'eu' }, { a: '50270920', l: 'en_gb', s: 'eu' },
    { a: '50198000', l: 'en_us', s: 'us' }, { a: '50198000', l: 'de_de', s: 'eu' }, { a: '50198000', l: 'nl_nl', s: 'eu' }, { a: '50198000', l: 'fr_fr', s: 'eufr' }, { a: '50198000', l: 'it_it', s: 'euit' }, { a: '50198000', l: 'es_es', s: 'eu' }, { a: '50198000', l: 'fr_ch', s: 'eu' }, { a: '50198000', l: 'de_at', s: 'eu' }, { a: '50198000', l: 'de_ch', s: 'eu' }, { a: '50198000', l: 'en_gb', s: 'uk' },
    { a: '50229376', l: 'en_us', s: 'uk' }, { a: '50229376', l: 'de_de', s: 'eun' }, { a: '50229376', l: 'nl_nl', s: 'eun' }, { a: '50229376', l: 'fr_fr', s: 'eun' }, { a: '50229376', l: 'it_it', s: 'eun' }, { a: '50229376', l: 'es_es', s: 'eun' }, { a: '50229376', l: 'fr_ch', s: 'eun' }, { a: '50229376', l: 'de_at', s: 'eun' }, { a: '50229376', l: 'de_ch', s: 'eun' }, { a: '50229376', l: 'en_gb', s: 'eun' },
    { a: '50258967', l: 'en_us', s: 'let' }, { a: '50258967', l: 'de_de', s: 'let' }, { a: '50258967', l: 'nl_nl', s: 'let' }, { a: '50258967', l: 'fr_fr', s: 'let' }, { a: '50258967', l: 'it_it', s: 'let' }, { a: '50258967', l: 'es_es', s: 'let' }, { a: '50258967', l: 'fr_ch', s: 'let' }, { a: '50258967', l: 'de_at', s: 'let' }, { a: '50258967', l: 'de_ch', s: 'let' }, { a: '50258967', l: 'en_gb', s: 'let' },
    { a: '50258968', l: 'en_us', s: 'let' }, { a: '50258968', l: 'de_de', s: 'let' }, { a: '50258968', l: 'nl_nl', s: 'let' }, { a: '50258968', l: 'fr_fr', s: 'let' }, { a: '50258968', l: 'it_it', s: 'let' }, { a: '50258968', l: 'es_es', s: 'let' }, { a: '50258968', l: 'fr_ch', s: 'let' }, { a: '50258968', l: 'de_at', s: 'let' }, { a: '50258968', l: 'de_ch', s: 'let' }, { a: '50258968', l: 'en_gb', s: 'let' },
    { a: '50211199', l: 'en_us', s: 'hbus1' }, { a: '50211199', l: 'de_de', s: 'eu' }, { a: '50211199', l: 'nl_nl', s: 'eu' }, { a: '50211199', l: 'fr_fr', s: 'eu' }, { a: '50211199', l: 'it_it', s: 'eu' }, { a: '50211199', l: 'es_es', s: 'eu' }, { a: '50211199', l: 'fr_ch', s: 'eu' }, { a: '50211199', l: 'de_at', s: 'eu' }, { a: '50211199', l: 'de_ch', s: 'eu' }, { a: '50211199', l: 'en_gb', s: 'eu' },
    { a: '50198254', l: 'en_us', s: 'let' }, { a: '50198254', l: 'de_de', s: 'let' }, { a: '50198254', l: 'nl_nl', s: 'let' }, { a: '50198254', l: 'fr_fr', s: 'let' }, { a: '50198254', l: 'it_it', s: 'let' }, { a: '50198254', l: 'es_es', s: 'let' }, { a: '50198254', l: 'fr_ch', s: 'let' }, { a: '50198254', l: 'de_at', s: 'let' }, { a: '50198254', l: 'de_ch', s: 'let' }, { a: '50198254', l: 'en_gb', s: 'let' },
    { a: '50249531', l: 'en_us', s: 'let' }, { a: '50249531', l: 'de_de', s: 'let' }, { a: '50249531', l: 'nl_nl', s: 'let' }, { a: '50249531', l: 'fr_fr', s: 'let' }, { a: '50249531', l: 'it_it', s: 'let' }, { a: '50249531', l: 'es_es', s: 'let' }, { a: '50249531', l: 'fr_ch', s: 'let' }, { a: '50249531', l: 'de_at', s: 'let' }, { a: '50249531', l: 'de_ch', s: 'let' }, { a: '50249531', l: 'en_gb', s: 'let' },
    { a: '50260318', l: 'en_us', s: 'let' }, { a: '50260318', l: 'de_de', s: 'let' }, { a: '50260318', l: 'nl_nl', s: 'let' }, { a: '50260318', l: 'fr_fr', s: 'let' }, { a: '50260318', l: 'it_it', s: 'let' }, { a: '50260318', l: 'es_es', s: 'let' }, { a: '50260318', l: 'fr_ch', s: 'let' }, { a: '50260318', l: 'de_at', s: 'let' }, { a: '50260318', l: 'de_ch', s: 'let' }, { a: '50260318', l: 'en_gb', s: 'let' },
    { a: '50193722', l: 'en_us', s: 'us' }, { a: '50193722', l: 'de_de', s: 'eu' }, { a: '50193722', l: 'nl_nl', s: 'eu' }, { a: '50193722', l: 'fr_fr', s: 'eufr' }, { a: '50193722', l: 'it_it', s: 'euit' }, { a: '50193722', l: 'es_es', s: 'eu' }, { a: '50193722', l: 'fr_ch', s: 'eu' }, { a: '50193722', l: 'de_at', s: 'eu' }, { a: '50193722', l: 'de_ch', s: 'eu' }, { a: '50193722', l: 'en_gb', s: 'uk' },
    { a: '50270925', l: 'en_us', s: 'let' }, { a: '50270925', l: 'de_de', s: 'let' }, { a: '50270925', l: 'nl_nl', s: 'let' }, { a: '50270925', l: 'fr_fr', s: 'let' }, { a: '50270925', l: 'it_it', s: 'let' }, { a: '50270925', l: 'es_es', s: 'let' }, { a: '50270925', l: 'fr_ch', s: 'let' }, { a: '50270925', l: 'de_at', s: 'let' }, { a: '50270925', l: 'de_ch', s: 'let' }, { a: '50270925', l: 'en_gb', s: 'let' },
    { a: '50275029', l: 'en_us', s: 'hbus1' }, { a: '50275029', l: 'de_de', s: 'eu' }, { a: '50275029', l: 'nl_nl', s: 'eu' }, { a: '50275029', l: 'fr_fr', s: 'eu' }, { a: '50275029', l: 'it_it', s: 'eu' }, { a: '50275029', l: 'es_es', s: 'eu' }, { a: '50275029', l: 'fr_ch', s: 'eu' }, { a: '50275029', l: 'de_at', s: 'eu' }, { a: '50275029', l: 'de_ch', s: 'eu' }, { a: '50275029', l: 'en_gb', s: 'eu' },
    { a: '50211394', l: 'en_us', s: 'hbus1' }, { a: '50211394', l: 'de_de', s: 'eu' }, { a: '50211394', l: 'nl_nl', s: 'eu' }, { a: '50211394', l: 'fr_fr', s: 'eu' }, { a: '50211394', l: 'it_it', s: 'eu' }, { a: '50211394', l: 'es_es', s: 'eu' }, { a: '50211394', l: 'fr_ch', s: 'eu' }, { a: '50211394', l: 'de_at', s: 'eu' }, { a: '50211394', l: 'de_ch', s: 'eu' }, { a: '50211394', l: 'en_gb', s: 'eu' }
];
var originalResolveSizeSystemKeyword = FitsMe.Common.resolveSizeSystemKeyword;
FitsMe.Common.resolveSizeSystemKeyword = function (response) {
    var articleNumber = response.ArticleNumber.replace('US', '');
    var locale = FitsMeData.Locale;
    if (articleNumber && locale) {
        for (var i = 0; i < sizeSystemKeywordMapping.length; i++) {
            var d = sizeSystemKeywordMapping[i];
            if (d.a == articleNumber && d.l == locale) {
                return d.s;
            }
        }
    }
    return originalResolveSizeSystemKeyword(response);
};

var sizes = FitsMeData.Sizes;
var events = FitsMeData.Events;
if (sizes && sizes.length && events && events.SizeCallback) {
    var sizes = sizes;
    var originalSizeCallback = events.SizeCallback;
    events.SizeCallback = function (data) {
        for (var i = 0; i < sizes.length; i++) {
            var size = sizes[i];
            var hbT = size.Title.trim().toUpperCase() + ' ';
            var fmT = data.sizeTitle.trim().toUpperCase() + ' ';
            if (hbT.indexOf(fmT) === 0) {
                console.log("found HB title and passing it", size.Title);
                var newData = {
                    articleNumber: data.articleNumber,
                    sizeTitle: size.Title,
                    sizeSubTitle: data.sizeSubTitle
                };
                console.log("passing to HB size callback", newData);
                originalSizeCallback(newData);
                break;
            }
        }
    };
}

                    })();
                    FitsMe.Integrator.sendQuery(function () {
                        loaded.response = true;
                        onLoaded();
                    });
                });
                FitsMe.loadScript(FitsMe.settings.LayeringFramework, function () {
                    loaded.layering = true;
                    onLoaded();
                });
            });
    })();
