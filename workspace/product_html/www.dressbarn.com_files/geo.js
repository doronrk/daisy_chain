YAHOO.namespace('speedfc.locator.geo');
YAHOO.speedfc.locator.geo = {
    gdir : null,
    map : null,
    fo: null,

    /**
     * gotoState: If a state is given the the page is redirected to the adequate
     * page.
     * @param <string> state name of the state to be located.
     */
    gotoState : function(state) {
        if (state) window.location = '/locator/map/state/' + state;
    },

    /**
     * setDirections: this function is a wraper for load function in gdir object.
     * @param fromAddress start point to be used.
     * @param toAddress end point to be used.
     * @param locale
     */
    setDirections : function(fromAddress, toAddress, locale) {
        YAHOO.speedfc.locator.geo.gdir.load("from: " + fromAddress + " to: " + toAddress, {
            "locale" : locale
        });
    },

    /**
     * handleErrors: This is wrapper for handling the errors received by the
     * gdir object.
     */
    handleErrors : function() {
        if (YAHOO.speedfc.locator.geo.gdir.getStatus().code == G_GEO_UNKNOWN_ADDRESS)
            alert("No corresponding geographic location could be found for one"+
            " of the specified addresses. This may be due to the fact that the"+
            " address is relatively new, or it may be incorrect.");
        else if (YAHOO.speedfc.locator.geo.gdir.getStatus().code == G_GEO_SERVER_ERROR)
            alert("A geocoding or directions request could not be successfully"+
            " processed, yet the exact reason for the failure is not known.");
        else if (YAHOO.speedfc.locator.geo.gdir.getStatus().code == G_GEO_MISSING_QUERY)
            alert("The HTTP q parameter was either missing or had no value. For"+
            " geocoder requests, this means that an empty address was specified"+
            " as input. For directions requests, this means that no query was"+
            " specified in the input.");
        else if (YAHOO.speedfc.locator.geo.gdir.getStatus().code == G_GEO_BAD_KEY)
            alert("The given key is either invalid or does not match the domain"+
            " for which it was given.");
        else if (YAHOO.speedfc.locator.geo.gdir.getStatus().code == G_GEO_BAD_REQUEST)
            alert("A directions request could not be successfully parsed.\n Error code: "
                + YAHOO.speedfc.locator.geo.gdir.getStatus().code);
        else
            alert("An unknown error occurred.");
    },

    /**
     * showFromForm: shows the from form information.
     * @param <int> id item id to be used.
     */
    showFromForm : function(id) {
        var main = document.getElementById("map_options_" + id).style.display = "none";
        var to = document.getElementById("to_" + id).style.display = "none";
        var from = document.getElementById("from_" + id).style.display = "block";
    },

    /**
     * showToForm: shows the to form information.
     * @param <int> id item id to be used.
     */
    showToForm : function(id) {
        var main = document.getElementById("map_options_" + id).style.display = "none";
        var to = document.getElementById("to_" + id).style.display = "block";
        var from = document.getElementById("from_" + id).style.display = "none";
    },

    /**
     * getLocatorFlashObject: Loads the flash object containing the locator map.
     */
    getLocatorFlashObject: function(){
        fo = new FlashObject("/flash/_usmap.swf", "statesMap", "440", "366", "6.0");
        fo.addParam("quality", "high");
        fo.addParam("wmode", "transparent");
        fo.addParam("menu", false);
        fo.write("statesMap");    
    }
};