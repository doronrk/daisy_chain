/*
This script will add a StellaService seal to any web page, based on the url of the page
that includes it, or a parameter passed in the script url. An example is:

<a class="stella-seal"></a>
<script defer src='http://localhost:8000/media/js/seal.js?companyUrl=bestbuy.com'></script>

*/

var StellaSeal = StellaSeal || {
    init: function(imgClassName) {
        // Write the code to display the link and seal.
        var params = StellaSeal.getParams(),
            companyUrl = StellaSeal.getCompanyUrl(params),
            imgSrcFile = companyUrl + (params.isNom ? '_nom' : '') + '.png',
            imgSrc = '//seal.stellaservice.com/seals/' + imgSrcFile + '?ptnr=seal',
            profileLink = 'http://www.stellaservice.com/profile/' + companyUrl + '/',
            aEls = StellaSeal.getElementsByClassName('stella-seal'),
            i;

        for (i = 0; i < aEls.length; i++) {
            aEls[i].href = profileLink;
            aEls[i].target = '_blank';
            aEls[i].innerHTML = '<img src="' + imgSrc + '" onerror="this.style.display=\'none\';" alt="StellaService Seal" />';
        }
    },

    getCompanyUrl: function(params) {
        // Use the companyUrl passed as an argument, if there is one.
        if (params.hasOwnProperty('companyUrl')) {
            return params.companyUrl.toLowerCase();
        }

        // Otherwise, use a simplified form of the hostname.
        var nameParts = document.location.hostname.split('.');
        return (nameParts[nameParts.length-2] + '.' + nameParts[nameParts.length-1]).toLowerCase();
    },

    // Return the querystring paramters passed in the script url as a dictionary.
    getParams: function(url) {
        // Find all the script tags on the page, then find the one that is _this_ one.
        var scripts = document.getElementsByTagName('script'),
            script = StellaSeal.findWhere(scripts, function(s) { return StellaSeal.matchScriptUrl(s.src); }),
            params = { 'isNom': script.src.indexOf('nominate.js') > 0 },
            urlParts,
            queryStringParts,
            paramParts,
            i;

        // Parse out the src URL from that tag for its parameters. This might be naive.
        urlParts = script.src.split('?');
        if (urlParts.length === 2) {
            queryStringParts = urlParts[1].split('&');
            for (i = 0; i < queryStringParts.length; i++) {
                paramParts = queryStringParts[i].split('=');
                if (paramParts.length === 2) {
                    params[paramParts[0]] = paramParts[1];
                }
            }
        }

        return params;
    },

    // Iterate over an array, and return the first item s therein for which f(s) returns true, or null if there is none.
    findWhere: function(a, f) {
        var i;
        for (i = 0; i < a.length; i++) {
            if (f(a[i])) return a[i];
        }
        return null;
    },

    // Return true if url is the url for this script, false otherwise.
    matchScriptUrl: function(url) {
        var isStellaService = url.indexOf('stellaservice.com') > 0 || url.indexOf('cloudfront.net') > 0,
            isLocalhost = url.indexOf('localhost') > 0,
            isSealJs = url.indexOf('seal.js') > 0,
            isNom = url.indexOf('nominate.js') > 0;
        return ((isStellaService || isLocalhost) && (isSealJs || isNom));
    },

    /* Developed by Robert Nyman, http://www.robertnyman.com
     * Code/licensing: http://code.google.com/p/getelementsbyclassname/ */
    getElementsByClassName: function(e,t,n){if(document.getElementsByClassName){getElementsByClassName=function(e,t,n){n=n||document;var r=n.getElementsByClassName(e),i=t?new RegExp("\\b"+t+"\\b","i"):null,s=[],o;for(var u=0,a=r.length;u<a;u+=1){o=r[u];if(!i||i.test(o.nodeName)){s.push(o)}}return s}}else if(document.evaluate){getElementsByClassName=function(e,t,n){t=t||"*";n=n||document;var r=e.split(" "),i="",s="http://www.w3.org/1999/xhtml",o=document.documentElement.namespaceURI===s?s:null,u=[],a,f;for(var l=0,c=r.length;l<c;l+=1){i+="[contains(concat(' ', @class, ' '), ' "+r[l]+" ')]"}try{a=document.evaluate(".//"+t+i,n,o,0,null)}catch(h){a=document.evaluate(".//"+t+i,n,null,0,null)}while(f=a.iterateNext()){u.push(f)}return u}}else{getElementsByClassName=function(e,t,n){t=t||"*";n=n||document;var r=e.split(" "),i=[],s=t==="*"&&n.all?n.all:n.getElementsByTagName(t),o,u=[],a;for(var f=0,l=r.length;f<l;f+=1){i.push(new RegExp("(^|\\s)"+r[f]+"(\\s|$)"))}for(var c=0,h=s.length;c<h;c+=1){o=s[c];a=false;for(var p=0,d=i.length;p<d;p+=1){a=i[p].test(o.className);if(!a){break}}if(a){u.push(o)}}return u}}return getElementsByClassName(e,t,n)}
};
StellaSeal.init();
