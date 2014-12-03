/** *****************************************
 * @class BLOOMIES
 * @module BLOOMIES Base
 * @Pattern Singleton
 * @requires YAHOO, BLOOMIES
 * @static
 ***************************************** */

/* Removing $ reference to jQuery object to avoid its conflict with other libraries that use $ as main object 
 * this code will not be in responsiveGlobalLayout script.jsp so it's been moved here
 * */
if (typeof $ !== "undefined" && typeof $b === "undefined") {
	$.noConflict();
	var $b = jQuery; // Defining bloomies specific global jquery object.
}

/**
 * BLOOMIES global namespace object. Only create if it doesn't already exist.
 * This governs the Singleton nature of this base object.
 * @static
 */

if (typeof BLOOMIES === "undefined" || !BLOOMIES) {
    var BLOOMIES = {};
}

if(!BLOOMIES.namespace){
    /** Adapted namespacing code from core YUI YAHOO Singleton. Provides for
     * namespacing with BLOOMIES as the root package.
     *
     * @method namespace
     * @param  {String*} arguments 1-n namespaces to create
     * @return {Object}  A reference to the last namespace object created
     * @static
     */
    BLOOMIES.namespace = function() {
        var a=arguments, o=null, i, j, d;
        for (i=0; i<a.length; i=i+1) {
            d=a[i].split(".");
            o=BLOOMIES;

            // BLOOMIES is implied, so it is ignored if it is included
            for (j=(d[0] == "BLOOMIES") ? 1 : 0; j<d.length; j=j+1) {
                o[d[j]]=o[d[j]] || {};
                o=o[d[j]];
            }
        }
        return o;
    };
    
    

}   

if (typeof MACYS == "undefined" || !MACYS) {
    var MACYS = {};

    /** Adapted namespacing code from core YUI YAHOO Singleton. Provides for
     * namespacing with BLOOMIES as the root package.
     *
     * @method namespace
     * @param  {String*} arguments 1-n namespaces to create
     * @return {Object}  A reference to the last namespace object created
     * @static
     */
    MACYS.namespace = function() {
        var a=arguments, o=null, i, j, d;
        for (i=0; i<a.length; i=i+1) {
            d=a[i].split(".");
            o=MACYS;

            // BLOOMIES is implied, so it is ignored if it is included
            for (j=(d[0] == "MACYS") ? 1 : 0; j<d.length; j=j+1) {
                o[d[j]]=o[d[j]] || {};
                o=o[d[j]];
            }
        }
        return o;
    };
}   

if(typeof BLOOMIES.log == 'undefined' || !BLOOMIES.log){
    
	/**
     * Stub method. Add implementation in the separate file.
     */
    BLOOMIES.log = function(message, category, source){
    	if(category && "error" == category.toLowerCase()){
    			throw message;
    	}
    };
}

BLOOMIES.useNewDesign = useNewDesign;

if ( typeof YUI !== "undefined" && YUI ) {
    // YAHOO 3.4.x all here and ok
	if(typeof YUIJavaLoaderEnabled === "undefined") {
		var YUIJavaLoaderEnabled = false;
	}
	//Set the global config for all YUI instances
    YUI_config = {
               base: assetsServer + '/web20/assets/script/yahoo/' + (YUI_Version || '3.8.1') + '/',
               charset: 'utf-8', 
               loadOptional: false,
               comboBase: "/sns/yuiCombo?",
               combine: YUIJavaLoaderEnabled
       };
    // store the YUI object in a bloomies object reference so that the config is standard
    BLOOMIES.Y = YUI().use('*');
} else if ( typeof YAHOO !== "undefined" && YAHOO ) {
    // YAHOO 2.5 / 2.8 all here and ok
	BLOOMIES.Y = null;
} else { 
    BLOOMIES.log("Yahoo library configuration exception. Please select YUI or YAHOO for your library base!");
}

//This variable is initialized here but will be updated dynamically through base_script.jsp on page load
BLOOMIES.easternTimeZoneMode = "EST";

BLOOMIES.getCurrentEasternTimestamp = function(){
	var currentTimestamp = new Date(),
		easternTimezoneOffset,
		easternTimestamp;
	
	if(BLOOMIES.easternTimeZoneMode === "EDT"){
		easternTimezoneOffset = -4; //Eastern Daylight Time offset is -4 hours
	} else {
		easternTimezoneOffset = -5; //Eastern Standard Time offset is -5 hours
	}
	
	easternTimestamp = new Date(currentTimestamp.getTime() + (currentTimestamp.getTimezoneOffset() * 60 * 1000) + (easternTimezoneOffset * 60 * 60 * 1000));

	return easternTimestamp.toDateString() + " " + easternTimestamp.getHours() + ":" + easternTimestamp.getMinutes() + ":" + easternTimestamp.getSeconds();
};

BLOOMIES.formatNumberAsCurrency = function(n){
	var dollarString = String(Math.round(n*100)),
		decimalSeparator = ".",
		thousandsSeparator = ",",
		i, bits;
	
	dollarString = dollarString.replace(/(.*)(\d{2})/, "$1" + decimalSeparator + "$2");
	
	if(dollarString.length > 6){
		bits  = dollarString.split(/\D/);
		i = bits[0].length % 3 || 3;

		bits[0] = bits[0].slice(0,i) +
				  bits[0].slice(i).replace(/(\d{3})/g, thousandsSeparator + '$1');

		dollarString = bits.join(decimalSeparator);
	}
	
	return "$" + dollarString;
};

// Each MEW page's head will have class 'mw_page'
BLOOMIES.isMEW = /(?:\s|^)mw_page(?:\s|$)/.test(document.getElementsByTagName("head")[0].className);

BLOOMIES.setDisabled = function(element, bool) {
	if(element){
		element.disabled = bool;
		
		if(element.isCustomized){
			BLOOMIES.custom.Inputs.onDisabledChange(element);
		}
	}
};

BLOOMIES.setChecked = function(element, bool) {
	if(element){
		element.checked = bool;
		
		if(element.isCustomized){
			BLOOMIES.custom.Inputs.onCheckedChange(element);
		}
	}
};

//The trim function is not available before JavaScript 1.8 so we add it here
if(!String.prototype.trim) {
	String.prototype.trim = function () {  
		return this.replace(/^\s+|\s+$/g,'');  
	};
}

//Site Survey Random Variable generation
(function(){
    BLOOMIES.namespace("siteSurvey");	
    var d = new Date();
    var rawMonth = d.getMonth() + 1;
    var month = (rawMonth < 10 ? '0' + rawMonth : '' + rawMonth);
    var rawDate = d.getDate();
    var date = (rawDate < 10 ? '0' + rawDate : '' + rawDate);
    var year = d.getFullYear().toString().slice(-2);
    var hour = d.getHours().toString();
    var min = d.getMinutes().toString();
    var sec = d.getSeconds().toString();
    
    var stamp = month + date  + year  + hour  + min  + sec; //time stamp
    var rand = Math.floor(Math.random() * 1000000); // Six digit random number
    BLOOMIES.siteSurvey.fscm = rand + '_' + stamp;
})();