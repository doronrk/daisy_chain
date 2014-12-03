

var SizeGuideConfig = {
    iClientId: 126,
    sSizeGuideRequestId: 'ExJ-125Z_EWokqFhyUrthg2',
    urlApiRoot: '//app.shoefitr.com/api',
    urlMetricsRoot: '//app.shoefitr.com/metrics',
    sApiKey: '60DB977328582B32BABF72123B125BD1',
    urlStaticContentRoot: '//d2nzezaqmc2hne.cloudfront.net/sizeGuideStatic/215_1a92083d',
    sSkin: 'rw',
    bModelScanned: false,
    sLocale: 'en',
    sInputSizeDisplayConvention: '',
    sRecommendationSizeDisplayConvention: null,
    sGenderBinary: "M",
    sMinimalInputSizeDisplayConvention: 'US',
    iPreferredBrandId: null,
    bUnisexMerchandise: false,

    asAllowableFilters: [],
    asAllowableVisuals: [],
    asAllowableMiVisuals: []
};



(function() {
    // IE6 is not supported
    if (document.all && parseFloat(navigator.appVersion.split("MSIE")[1]) < 7.0) {
        return;
    }

    var responseTimestamp;
    if (window.performance && window.performance.now) {
        responseTimestamp = window.performance.now();
    } else {
        responseTimestamp = new Date();
    }

    if (window.shoefitr && window.shoefitr._t2) {
        window.shoefitr._t2.push(responseTimestamp);
    }

    function appendScript(sUrl) {
        var domScript = document.createElement('script');
        domScript.type = 'text/javascript';
        domScript.charset = "UTF-8";
        domScript.src = sUrl;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(domScript);
    }

    appendScript('//d2nzezaqmc2hne.cloudfront.net/sizeGuideStatic/215_1a92083d/js/bin/sizeGuide-en-min.gz.js');

    function appendStyle(sUrl) {
        var domStyle = document.createElement('link');
        domStyle.type = 'text/css';
        domStyle.rel = 'stylesheet';
        domStyle.media = 'screen';
        domStyle.charset = "UTF-8";
        domStyle.href = sUrl;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(domStyle);
    }

    appendStyle('//d2nzezaqmc2hne.cloudfront.net/sizeGuideStatic/215_1a92083d/css/bin/sizeGuide-min.gz.css');
    appendStyle('//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700|Merriweather:400,700');
})();
