if (!(typeof utag_data === 'object')) {

    // Defining base utag_data used by all page types
    var utag_data = {
        customer_id   : "",
        customer_type : "",
        loyalty_id : "",
        declined_loyalty_interstitial : "",
        site_version  : "",
        site_currency: "",
        site_region: "",
        site_language: ""
    };
}

var tealiumConstructor = function() {

    this.requiredData = {
        backEnd : [],
        frontEnd : []
    };

    this.receivedData = {};

    this.createScript = function(notFull) {
        // create the tealium script tag
        var host = window.location.host;
        var env = (host.indexOf("www.urbanoutfitters.com") > -1)
            ? "prod"
            : (host.indexOf("staging") > -1)
                ? "qa"
                : "dev";

        var loc = (typeof LOCALE === "string") && !(LOCALE === "urban") ? 'eu' : 'us';
        (function(a,b,c,d){
            a='//tags.tiqcdn.com/utag/urbanoutfitters/uo-'+loc+'/' + env + '/utag.js';
            b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
            a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
        })();
    };

    this.build = function(dataKeyword, dataObject) {
        // add data by keyword to receivedData
        this.receivedData[dataKeyword] = dataObject;

        var int = 0;
        // loop through requiredData.frontEnd
        for (var i = 0; i < this.requiredData.frontEnd.length; i++) {
            if (this.receivedData.hasOwnProperty(this.requiredData.frontEnd[i])) {
                int++
            };
        }

        // populate the utag_data object
        jQuery.extend(utag_data, dataObject)

        // create the script with createScript
        int === this.requiredData.frontEnd.length && this.createScript();
    }

    return this;

};
