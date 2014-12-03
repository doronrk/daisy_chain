/**
* @author Victor Matekole (CC Marketing) 17/09/2009
* This is the adidas Analytics Wrapper. Its purpose is for calling Analytics Provider tags such as CoreMetrics.
* The Analytics tags in this library are to be used in web pages across adidas eComm and non-eComm sites.
*
* The wrapper also specifies the Analytics accounts it will send the tags to. E.g. UK or Germany.
* It will determine the country of origin by the request parameter passed to all microsites by Akamai, namely, strCountry_adidascom,
* or by the URL in the case of the PID/adidas.com homepage or by a reading the value of a cookie.
* Version 1.01 - Support HTTPS domains
* 	       1.02 - Support multi-currency and domains with a subdomain named origin
* 		   1.03 - Fixed adidas.com microsite business logic
* 		   1.031 - Fixed US Client Id setup issue. Changed the cookie domain for Uk to adidas.com
* 		   1.032 - Fixed miteam use case. Included a function to prepend country code to category.
* 		   1.033 - Fixed miadidas use case.
* 		   1.034 - Fixed micoach use case and COM country bug. Also changed country code format for categories
* 		   1.035 - Fixed miadidas  use case issue. Added additional Global rules.
* 		   1.036 - Fixed adidas.com use case issue.
* 		   1.037 - Fixed order of signature for function.
* 		   1.038 - JSFP domain switching
* 		   1.039 - Give ability to disable/enable prefixing of category on Page Element tags
* 		   1.040 - Fixed undefined chk on production variable
* 		   1.041 - Fixed Originals use case
* 		   1.042 - Fixed JSFP tracking issue
* 		   1.043 - Add additional Client Id's (BE, ID, VN) and fix miadidas and pid domain
* 		   1.044 - Created getters and setters for siteId and JFSPDomain
* 		   1.045 - Amend script to support Arvato's local environment
*		   1.046 - Added EU-Ecomm use case
*		   1.047 - Corrected Tag Item Purchased, added Order ID
*		   1.048 - Removing country code prefixing adding new analytics tags tagVideo and tagBrandProductView
* 		   1.049 - Renaming all page categories coming in as 'brandhome' to 'brand'. Some refactoring and improvements.
* 		   1.050 - Client Id restructure for miadidas and miteam. Making getPageId publicly accessible.
* 		   1.051 - Fix Sports Performance URL use case. Change client id structure for miadidas, brand and shop client id structure. Add test client id's
*		   1.052 - Temporary version for shop only for IO integration purposes.
*     	   1.054 - Temporary version for shop, for personalisation fix.
*          1.055 - Temporary fix for November 2011 incidents on brand site
*          1.056 - Logic added for new cookie adidas_country for onesite laundh
*		   1.057 - country code changes for AE and LA, added production variable to SetClientID function and break statement to case "LATIN-AMERICA", ClientID changes for UK,NL,FR,DE,AU,RU,CA,CZ,SK,PL and added ClientIDs for Cl,CO,PE and MX as part of their launch.
*          1.058 - Added Baltics client ID and modified US client ID.
*          1.059 - Added SLAM roll up client ID for countries AR, CL, MX, CO and PE.
*          1.060 - Added CM_DDX.headScripts = false to stop loading header scripts
*		   1.061 - Remove Page Prefix and additionally use onesite_market for country code check
*		   1.062 - Switch to first party cookie and data.coremetrics.com
*		   1.063 - set data colelction domain as data.coremetrics.com
* This library leverages the Revealing Module Pattern (http://www.wait-till-i.com/2007/08/22/again-with-the-module-pattern-reveal-something-to-the-world/)


*/
var NOEXPLOREATTR = 15;
var GLOBAL = "COM";
var VERSION = "1.061";
/* Commented as no longer in use-#1.061
var BRANDSITES = "adidas";
var ORIGINALS = "originals";
var PID = "pid";
var ROWESHOP = "roweshop";
var USESHOP = "useshop";
var USMIADIDAS = "miadidas";
var EUMIADIDAS = "eumiadidas";
var MITEAM = "miteam";
var MIADIDAS = "miadidas";
var RETAILMIADIDAS = "retailmiadidas";
var CHECKOUTMIADIDAS = "checkoutmiadidas";
var MICOACH = "micoach";
var BLOGWIKI = "blogwiki";
var ADIDASTV = "adidastv";
var CORPORATE = "corporatesite";
Commented as no longer in use-#1.061 */
var CM_TEST_CLIENTIDS = "60297136";

var CMGlobal = function(brandType, siteType, category) {
    var self = this;

    self.GetCookie = function(name) {
        if (document.cookie.length > 0) {
            var cookieStart = document.cookie.indexOf(name + "=");
            if (cookieStart != -1) {
                cookieStart = cookieStart + name.length + 1;
                var cookieEnd = document.cookie.indexOf(";", cookieStart);
                if (cookieEnd == -1)
                    cookieEnd = document.cookie.length;
                return unescape(document.cookie.substring(cookieStart, cookieEnd));
            }
        }
        return null;
    };

    self.isEmpty = function(str) {
        if (str != null || str != "")
            return false;
        return true;
    };
/* #1.061
    self.siteType = brandType
    self.brandType = siteType;
    self.category = category;
	#1.061	*/
	self.siteType = ""
    self.brandType = "";
    self.category = "";

    self.country = self.GetCookie("adidas_country");
    self.countryOneSite = self.GetCookie("onesite_market");


    if ((self.country == null  || self.country == "com"  ||this.isEmpty(self.country))) {
		if ((self.countryOneSite == null  || this.isEmpty(self.countryOneSite))) {
			self.country = "COM"
		}
	
	else {
    	self.country = self.countryOneSite
    	}
    }
	if (self.country == "FR/CA") {
		self.country = "CF"
	}
	if (self.country == "NG") {
			self.country = "COM"
	}
	if (self.country == "KW") {
			self.country = "MIDDLE-EAST"
	}
	if (self.country == "EE") {
				self.country = "BALTICS"
	}
	if (self.country == "VE") {
				self.country = "LATIN-AMERICA"
	}

/// CM Rollup Client Id's
    var CM_TEST_CLIENTIDS = "60297136";
    var CM_TEST_ESHOP_ROLLUP = "60320940";
	var CM_TEST_SLAM_ROLLUP = "60321625";
    var CM_GLOBAL_ROLLUP = "90297136";
    var CM_NONESHOP_ROLLUP = "90297149";
    var CM_ESHOP_ROLLUP = "90320940";
    var CM_SLAM_ROLLUP = "90321625";

// Test Client Id's

    var CM_TEST_COM = "60321214";
	var CM_TEST_AE = "60297305";
	var CM_TEST_AR = "60297812";
	var CM_TEST_AT = "60297292";
	var CM_TEST_AU = "60297279";
	var CM_TEST_CH = "60297682";
	var CM_TEST_CN = "60297357";
	var CM_TEST_CZ = "60321488";
	var CM_TEST_DE = "60297227";
	var CM_TEST_DK = "60297370";
	var CM_TEST_ES = "60390016";
	var CM_TEST_FL = "60297383";
	var CM_TEST_FR = "60297214";
	var CM_TEST_GR = "60297422";
	var CM_TEST_HK = "60297435";
	var CM_TEST_HU = "60297448";
	var CM_TEST_IN = "60297461";
	var CM_TEST_IT = "60390013";
	var CM_TEST_JP = "60297487";
	var CM_TEST_KR = "60297500";
	var CM_TEST_MY = "60297526";
	var CM_TEST_NL = "60297240";
	var CM_TEST_NO = "60297565";
	var CM_TEST_NZ = "60297552";
	var CM_TEST_PH = "60297578";
	var CM_TEST_PL = "60297591";
	var CM_TEST_PT = "60297604";
	var CM_TEST_RU = "60390010";
	var CM_TEST_SE = "60297669";
	var CM_TEST_SG = "60297630";
	var CM_TEST_SK = "60321351";
	var CM_TEST_TH = "60297708";
	var CM_TEST_TW = "60297695";
	var CM_TEST_TR = "60397068";
	var CM_TEST_UK = "60297253";
	var CM_TEST_ZA = "60297643";
	var CM_TEST_US = "60297162";
	var CM_TEST_CA = "60297201";
	var CM_TEST_CF = "60297344";
	var CM_TEST_BR = "60297318";
	var CM_TEST_LA = "60297513";
	var CM_TEST_BE = "60272235";
	var CM_TEST_ID = "60272372";
	var CM_TEST_VN = "60297799";
	var CM_TEST_FI = "60297383";
	var CM_TEST_IE = "60390711";
	var CM_TEST_CL = "60398745";
	var CM_TEST_CO = "60394182";
	var CM_TEST_PE = "60398758";
	var CM_TEST_MX = "60297175";
    var CM_TEST_BALTICS = "60391426";

    // non eComm sites
    var CM_COM = "90321214";
    var CM_AE = "90297305";
    var CM_AR = "90297812";
    var CM_AT = "90297292";
    var CM_AU = "90297279";
    var CM_CH = "90297682";
    var CM_CN = "90297357";
    var CM_CZ = "90321488";
    var CM_DE = "90297227";
    var CM_DK = "90297370";
    var CM_ES = "90390016";
    var CM_FL = "90297383";
    var CM_FR = "90297214";
    var CM_GR = "90297422";
    var CM_HK = "90297435";
    var CM_HU = "90297448";
    var CM_IN = "90297461";
    var CM_IT = "90390013";
    var CM_JP = "90297487";
    var CM_KR = "90297500";
    var CM_MY = "90297526";
    var CM_NL = "90297240";
    var CM_NO = "90297565";
    var CM_NZ = "90297552";
    var CM_PH = "90297578";
    var CM_PL = "90297591";
    var CM_PT = "90297604";
    var CM_RU = "90390010";
    var CM_SE = "90297669";
    var CM_SG = "90297630";
    var CM_SK = "90321351";
    var CM_TH = "90297708";
    var CM_TW = "90297695";
    var CM_TR = "90397068";
    var CM_UK = "90297253";
    var CM_ZA = "90297643";
    var CM_US = "90297162";
    var CM_CA = "90297201";
    var CM_CF = "90297344";
    var CM_BR = "90297318";
    var CM_LA = "90297513";
    var CM_BE = "90272235";
    var CM_ID = "90272372";
    var CM_VN = "90297799";
    var CM_FI = "90297383";
    var CM_IE = "90390711";
    var CM_CL = "90398745";
    var CM_CO = "90394182";
    var CM_PE = "90398758";
    var CM_MX = "90297175";
    var CM_BALTICS = "90391426";


    var clientId = CM_GLOBAL_ROLLUP;
    var testclientId = CM_TEST_CLIENTIDS;

    self.country = self.country.toUpperCase();
    switch (self.country) {
		case "COM":
			clientId = clientId + ";" + CM_COM;
			testclientId = testclientId + ";" + CM_TEST_COM;
			break;
		case "MIDDLE-EAST":
			clientId = clientId + ";" + CM_AE;
			testclientId = testclientId + ";" + CM_TEST_AE;
			break;
		case "AT":
		   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_AT;
		   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_AT;
		    break;
		case "AU":
		   clientId = clientId + ";" + CM_AU;
		   testclientId = testclientId + ";" + CM_TEST_AU;
		  break;
		case "CH":
		   clientId = clientId + ";" + CM_CH;
		   testclientId = testclientId + ";" + CM_TEST_CH;
		  break;
		case "CN":
		   clientId = clientId + ";" + CM_CN;
		   testclientId = testclientId + ";" + CM_TEST_CN;
		  break;
		case "DE":
		   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_DE;
		   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_DE;
		   break;
		case "DK":
		   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_DK;
		   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_DK;
		   break;
		case "ES":
		   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_ES;
		   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_ES;
		   break;
		case "FL":
		   clientId = clientId + ";" + CM_FL;
	   	   testclientId = testclientId + ";" + CM_TEST_FL;
		   break;
		case "FR":
		   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_FR;
		   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_FR;
		   break;
		case "GR":
		   clientId = clientId + ";" + CM_GR;
		   testclientId = testclientId + ";" + CM_TEST_GR;
		   break;
		case "HK":
		   clientId = clientId + ";" + CM_HK;
		   testclientId = testclientId + ";" + CM_TEST_HK;
		   break;
		case "HU":
		   clientId = clientId + ";" + CM_HU;
		   testclientId = testclientId + ";" + CM_TEST_HU;
		   break;
		case "IN":
		   clientId = clientId + ";" + CM_IN;
		   testclientId = testclientId + ";" + CM_TEST_IN;
		   break;
		case "IT":
		   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_IT;
		   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_IT;
		   break;
		case "JP":
		   clientId = clientId + ";" + CM_JP;
		   testclientId = testclientId + ";" + CM_TEST_JP;
		   break;
		case "KR":
		   clientId = clientId + ";" + CM_KR;
		   testclientId = testclientId + ";" + CM_TEST_KR;
		   break;
		case "MY":
		   clientId = clientId + ";" + CM_MY;
		   testclientId = testclientId + ";" + CM_TEST_MY;
		   break;
		case "NL":
		   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_NL;
		   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_NL;
		   break;
		case "NO":
		   clientId = clientId + ";" + CM_NO;
		   testclientId = testclientId + ";" + CM_TEST_NO;
		   break;
		case "NZ":
		   clientId = clientId + ";" + CM_NZ;
		   testclientId = testclientId + ";" + CM_TEST_NZ;
		   break;
		case "PH":
		   clientId = clientId + ";" + CM_PH;
		   testclientId = testclientId + ";" + CM_TEST_PH;
		   break;
		case "PL":
		   clientId = clientId + ";"  + CM_ESHOP_ROLLUP + ";" + CM_PL;
		   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_PL;
		   break;
		case "PT":
		   clientId = clientId + ";" + CM_PT;
		   testclientId = testclientId + ";" + CM_TEST_PT;
		   break;
		case "RU":
		   clientId = clientId + ";" + CM_RU;
		   testclientId = testclientId + ";" + CM_TEST_RU;
		   break;
		case "SE":
		   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_SE;
		   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_SE;
		   break;
		case "SG":
		   clientId = clientId + ";" + CM_SG;
		   testclientId = testclientId + ";" + CM_TEST_SG;
		   break;
		case "TH":
		   clientId = clientId + ";" + CM_TH;
		   testclientId = testclientId + ";" + CM_TEST_TH;
		   break;
		case "TW":
		   clientId = clientId + ";" + CM_TW;
		   testclientId = testclientId + ";" + CM_TEST_TW;
		   break;
		case "UK":
		   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_UK;
		   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_UK;
		   break;
		case "ZA":
		   clientId = clientId + ";" + CM_ZA;
		   testclientId = testclientId + ";" + CM_TEST_ZA;
		   break;
		case "US":
		   clientId = clientId + ";" + CM_US;
		   testclientId = testclientId + ";" + CM_TEST_US;
		   break;
		case "CA":
		   clientId = clientId + ";" + CM_CA;
		   testclientId = testclientId + ";" + CM_TEST_CA;
		   break;
		case "CF":
		   clientId = clientId + ";" + CM_CF;
		   testclientId = testclientId + ";" + CM_TEST_CF;
		   break;
		case "BR":
		   clientId = clientId + ";" + CM_BR;
		   testclientId = testclientId + ";" + CM_TEST_BR;
		   break;
		case "LATIN-AMERICA":
		   clientId = clientId + ";" + CM_LA;
		   testclientId = testclientId + ";" + CM_TEST_LA;
		   break;
		case "BE":
		   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_BE;
		   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_BE;
		   break;
		case "ID":
		   clientId = clientId + ";" + CM_ID;
		   testclientId = testclientId + ";" + CM_TEST_ID;
		   break;
		case "VN":
		   clientId = clientId + ";" + CM_VN;
		   testclientId = testclientId + ";" + CM_TEST_VN;
		   break;
		case "FI":
		   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_FI;
		   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_FI;
		   break;
		case "IE":
		   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_IE;
		   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_IE;
		   break;
		case "CL":
	   	   clientId = clientId + ";" + CM_SLAM_ROLLUP + ";" + CM_CL;
	       testclientId = testclientId + ";" + CM_TEST_SLAM_ROLLUP + ";" + CM_TEST_CL;
		   break;
		case "PE":
	   	   clientId = clientId + ";" + CM_SLAM_ROLLUP + ";" + CM_PE;
	   	   testclientId = testclientId + ";" + CM_TEST_SLAM_ROLLUP + ";" + CM_TEST_PE;
		   break;
		case "AR":
		   clientId = clientId + ";" + CM_SLAM_ROLLUP + ";" + CM_AR;
	   	   testclientId = testclientId + ";" + CM_TEST_SLAM_ROLLUP + ";" + CM_TEST_AR;
		   break;
		case "CZ":
	   	   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_CZ;
	   	   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_CZ;
		   break;
		case "SK":
	   	   clientId = clientId + ";" + CM_ESHOP_ROLLUP + ";" + CM_SK;
	   	   testclientId = testclientId + ";" + CM_TEST_ESHOP_ROLLUP + ";" + CM_TEST_SK;
		   break;
		case "TR":
	   	   clientId = clientId + ";" + CM_TR;
	   	   testclientId = testclientId + ";" + CM_TEST_TR;
		   break;
		case "CO":
	   	   clientId = clientId + ";" + CM_SLAM_ROLLUP + ";" + CM_CO;
	   	   testclientId = testclientId + ";" + CM_TEST_SLAM_ROLLUP + ";" + CM_TEST_CO;
		   break;
		case "MX":
	   	   clientId = clientId + ";" + CM_SLAM_ROLLUP + ";" + CM_MX;
	       testclientId = testclientId + ";" + CM_TEST_SLAM_ROLLUP + ";" + CM_TEST_MX;
		   break;
		case "BALTICS":
	       clientId = clientId + ";" + CM_BALTICS;
	       testclientId = testclientId + ";" + CM_TEST_BALTICS;
		   break;
		default:
		   clientId = clientId + ";" + CM_COM;
		   testclientId = testclientId + ";" + CM_TEST_COM;
    }
    self.clientId = clientId;
    self.testclientId = testclientId;
};
var adidasGlobal = new CMGlobal("","","");  // By default we do not apply page prefixes


/**
* CoreMetrics Provider class.
* @base CoreMetricsProvider
*/
var CoreMetricsProvider = function() {
    var self = this;
    /**
    * Worker method for splitting out Explore attributes into an array.
    * @member GetExploreAttributes
    * @returns {Array} of Explore Attributes
    */
    var GetExploreAttributes = function(attributes) {
        var attr = null;
        if (attributes) {
            attr = attributes.split("-_-");
        }
        return attr;
    };



    /**
    * Manually set the CoreMetrics ClientId with a semi-colon delimited string e.g. "0000001;0000002"
    * @member SetClientId
    * @param clientId
    */
    var SetClientId = function(clientId, production, domain, countryCode) {
        cm_ClientID = clientId;
		/*1.062 restrict impression tags*/
		cmSetupOther({"cm_TrackImpressions":""});
        if (production === null || production == undefined || production) // Track to CM Production environment
        {
            CM_DDX.headScripts = false;
            //cmSetProduction();
			/*1.062 switching to first party cookie*/
            cmSetClientID(cm_ClientID, true, "data.coremetrics.com", domain);
			/*1.063 switching data collection domain*/
			cm_HOST="data.coremetrics.com/cm?";
        }
        else {

	    CM_DDX.headScripts = false;
		/*1.062 switching to first party cookie*/
            cmSetClientID(cm_ClientID, true, "data.coremetrics.com", domain);
        }
    };

    /**
    * Calls CM provider code for Page View tag, cmCreatePageviewTag
    * @member trackPageViewed
    * @param {AnalyticsDataPoints} Contains Analytics Data Points
    */
    var trackPageViewed = function(analyticsDataPoints) {
        var attr = GetExploreAttributes(analyticsDataPoints.getExploreAttributes());
        if (attr !== null) {
            if (attr.length >= NOEXPLOREATTR) {
                throw "You cannot pasets more than 14 explore attributes as the 1st is prepopulated with the country code of the site.";
            }
        }
        var attributes = null;
        if (attr == null || attr.length == 0) {
            attributes = analyticsDataPoints.getCountryCode();  // Add country code as the first Explore attribute
        }
        else {
            attributes = analyticsDataPoints.getCountryCode() + "-_-" + analyticsDataPoints.getExploreAttributes(); // Add country code as the first Explore attribute and additional attributes
        }
        cmCreatePageviewTag(analyticsDataPoints.getPageId(), analyticsDataPoints.getCategoryId(), analyticsDataPoints.getSearchTerm(), analyticsDataPoints.getTotalNumOfSearchResults(), attributes);
    };

    /**
    * Calls CM provider code for Page Element tag, cmCreatePageElementTag
    * @member trackPageElement
    * @param {AnalyticsDataPoints} Contains Analytics Data Points
    */
    var trackPageElement = function(analyticsDataPoints) {
        var attr = GetExploreAttributes(analyticsDataPoints.getExploreAttributes());
        if (attr !== null) {
            if (attr.length >= NOEXPLOREATTR) {
                throw "You cannot pass more than 14 explore attributes as the 1st is prepopulated with the country code of the site.";
            }
        }
        var attributes = null;
        if (attr == null || attr.length == 0) {
            attributes = analyticsDataPoints.getCountryCode();  // Add country code as the first Explore attribute
        }
        else {
            attributes = analyticsDataPoints.getCountryCode() + "-_-" + analyticsDataPoints.getExploreAttributes(); // Add country code as the first Explore attribute and additional attributes
        }
        cmCreatePageElementTag(analyticsDataPoints.getElementId(), analyticsDataPoints.getCategoryId(), null, null, null, attributes);
    };

    /**
    * Calls CM provider code for Product View tag, cmCreateProductviewTag
    * @member trackProductView
    * @param {AnalyticsDataPoints} Contains Analytics Data Points
    */
    var trackProductView = function(analyticsDataPoints) {
        var attr = GetExploreAttributes(analyticsDataPoints.getExploreAttributes());
        if (attr !== null) {
            if (attr.length >= NOEXPLOREATTR) {
                throw "You cannot pass more than 14 explore attributes as the 1st is prepopulated with the country code of the site.";
            }
        }
        var attributes = null;
        if (attr == null || attr.length == 0) {
            attributes = analyticsDataPoints.getCountryCode();  // Add country code as the first Explore attribute
        }
        else {
            attributes = analyticsDataPoints.getCountryCode() + "-_-" + analyticsDataPoints.getExploreAttributes(); // Add country code as the first Explore attribute and additional attributes
        }
        cmCreateProductviewTag(analyticsDataPoints.getProductId(), analyticsDataPoints.getProductName(), analyticsDataPoints.getCategoryId(), attributes);
    };

    /**
    * Calls cmCreateRegistrationTag for tracking User registrations
    * @member trackRegistration
    * @param {AnalyticsDataPoints} Contains Analytics Data Points
    */
    var trackRegistration = function(analyticsDataPoints) {
        var attr = GetExploreAttributes(analyticsDataPoints.getExploreAttributes());
        if (attr !== null) {
            if (attr.length >= NOEXPLOREATTR) {
                throw "You cannot pass more than 14 explore attributes as the 1st is prepopulated with the country code of the site.";
            }
        }
        var attributes = null;
        if (attr == null || attr.length == 0) {
            attributes = analyticsDataPoints.getCountryCode();  // Add country code as the first Explore attribute
        }
        else {
            attributes = analyticsDataPoints.getCountryCode() + "-_-" + analyticsDataPoints.getExploreAttributes(); // Add country code as the first Explore attribute and additional attributes
        }
        cmCreateRegistrationTag(analyticsDataPoints.getMemberId(), analyticsDataPoints.getEmail(), analyticsDataPoints.getCity(), analyticsDataPoints.getState(),
									analyticsDataPoints.getPostalCode(), attributes);
    };
    /**
    * Calls cmCreateErrorTag for tracking application errors.
    * @member trackError
    * @param {AnalyticsDataPoints} Contains Analytics Data Points
    */
    var trackError = function(analyticsDataPoints) {
        var attr = GetExploreAttributes(analyticsDataPoints.getExploreAttributes());
        if (attr !== null) {
            if (attr.length >= NOEXPLOREATTR) {
                throw "You cannot pass more than 14 explore attributes as the 1st is prepopulated with the country code of the site.";
            }
        }
        var attributes = null;
        if (attr == null || attr.length == 0) {
            attributes = analyticsDataPoints.getCountryCode();  // Add country code as the first Explore attribute
        }
        else {
            attributes = analyticsDataPoints.getCountryCode() + "-_-" + analyticsDataPoints.getExploreAttributes(); // Add country code as the first Explore attribute and additional attributes
        }
        cmCreateErrorTag(analyticsDataPoints.getPageId(), analyticsDataPoints.getCategoryId(), attributes);
    };
    /**
    * Calls cmCreateConversionEventTag. For tag conversion events.
    * @param {Object} analyticsDataPoints
    */
    var trackConversion = function(analyticsDataPoints) {
        var attr = GetExploreAttributes(analyticsDataPoints.getExploreAttributes());
        if (attr !== null) {
            if (attr.length >= NOEXPLOREATTR) {
                throw "You cannot pass more than 14 explore attributes as the 1st is prepopulated with the country code of the site.";
            }
        }
        var attributes = null;
        if (attr == null || attr.length == 0) {
            attributes = analyticsDataPoints.getCountryCode();  // Add country code as the first Explore attribute
        }
        else {
            attributes = analyticsDataPoints.getCountryCode() + "-_-" + analyticsDataPoints.getExploreAttributes(); // Add country code as the first Explore attribute and additional attributes
        }
        cmCreateConversionEventTag(analyticsDataPoints.getEventId(), analyticsDataPoints.getActionType(), analyticsDataPoints.getCategoryId(),
													analyticsDataPoints.getPoints(), attributes);
    };
    /**
    * Same as tracking a page element so this calls trackPageElement.
    * @param {Object} analyticsDataPoints
    */
    var trackFlashEvent = function(analyticsDataPoints) {
        var attr = GetExploreAttributes(analyticsDataPoints.getExploreAttributes());
        if (attr !== null) {
            if (attr.length >= NOEXPLOREATTR) {
                throw "You cannot pass more than 14 explore attributes as the 1st is prepopulated with the country code of the site.";
            }
        }
        var attributes = null;
        if (attr == null || attr.length == 0) {
            attributes = analyticsDataPoints.getCountryCode();  // Add country code as the first Explore attribute
        }
        else {
            attributes = analyticsDataPoints.getCountryCode() + "-_-" + analyticsDataPoints.getExploreAttributes(); // Add country code as the first Explore attribute and additional attributes
        }
        trackPageElement(analyticsDataPoints);
    };
    /**
    * Calls cmCreateManualLinkClickTag. Used for manually tagging links.
    * @param {Object} analyticsDataPoints
    */
    var trackFlashLink = function(analyticsDataPoints) {
        var attr = GetExploreAttributes(analyticsDataPoints.getExploreAttributes());
        if (attr !== null) {
            if (attr.length >= NOEXPLOREATTR) {
                throw "You cannot pass more than 14 explore attributes as the 1st is prepopulated with the country code of the site.";
            }
        }
        var attributes = null;
        if (attr == null || attr.length == 0) {
            attributes = analyticsDataPoints.getCountryCode();  // Add country code as the first Explore attribute
        }
        else {
            attributes = analyticsDataPoints.getCountryCode() + "-_-" + analyticsDataPoints.getExploreAttributes(); // Add country code as the first Explore attribute and additional attributes
        }
        cmCreateManualLinkClickTag(analyticsDataPoints.getLink(), analyticsDataPoints.getLinkName(), analyticsDataPoints.getPageId(), attributes);
    };
    /**
    * Calls cmCreateManualImpressionTag. Tags impressions.
    * @param {Object} analyticsDataPoints
    */
    var trackFlashImpression = function(analyticsDataPoints) {
        var attr = GetExploreAttributes(analyticsDataPoints.getExploreAttributes());
        if (attr !== null) {
            if (attr.length >= NOEXPLOREATTR) {
                throw "You cannot pass more than 14 explore attributes as the 1st is prepopulated with the country code of the site.";
            }
        }
        var attributes = null;
        if (attr == null || attr.length == 0) {
            attributes = analyticsDataPoints.getCountryCode();  // Add country code as the first Explore attribute
        }
        else {
            attributes = analyticsDataPoints.getCountryCode() + "-_-" + analyticsDataPoints.getExploreAttributes(); // Add country code as the first Explore attribute and additional attributes
        }
        cmCreateManualImpressionTag(analyticsDataPoints.getPageId(), analyticsDataPoints.getSitePromoTag(),
							analyticsDataPoints.getRealEstateTag(), attributes);
    };
    /**
    * Calls cmCreateOrderTag. Called on the confirmation page on final payment.
    * @param {Object} analyticsDataPoints
    */
    var trackOrderPurchased = function(analyticsDataPoints) {
        var attr = GetExploreAttributes(analyticsDataPoints.getExploreAttributes());
        if (attr !== null) {
            if (attr.length >= NOEXPLOREATTR) {
                throw "You cannot pass more than 14 explore attributes as the 1st is prepopulated with the country code of the site.";
            }
        }
        var attributes = null;
        if (attr == null || attr.length == 0) {
            attributes = analyticsDataPoints.getCountryCode();  // Add country code as the first Explore attribute
        }
        else {
            attributes = analyticsDataPoints.getCountryCode() + "-_-" + analyticsDataPoints.getExploreAttributes(); // Add country code as the first Explore attribute and additional attributes
        }
        cmCreateOrderTag(analyticsDataPoints.getOrderId(), analyticsDataPoints.getOrderSubTotal(), analyticsDataPoints.getOrderShipping(),
							  analyticsDataPoints.getMemberId(), analyticsDataPoints.getCity(), analyticsDataPoints.getState(), analyticsDataPoints.getPostalCode(),
							  analyticsDataPoints.getCurrency(), attributes);
    };
    /**
    * Coremetrics specific, calls cmDisplayShop5s. Required to be called only ONCE after the calls to tagProductItemAddtoBasket.
    */
    var displayShop5s = function() {
        cmDisplayShop5s();
    };
    /**
    * Calls CM tag cmCreateShopAction5Tag for each item added to basket.
    * @param {Object} analyticsDataPoints
    */
    var trackProductItemAddtoBasket = function(analyticsDataPoints) {
        var attr = GetExploreAttributes(analyticsDataPoints.getExploreAttributes());
        if (attr !== null) {
            if (attr.length >= NOEXPLOREATTR) {
                throw "You cannot pass more than 14 explore attributes as the 1st is prepopulated with the country code of the site.";
            }
        }
        var attributes = null;
        if (attr == null || attr.length == 0) {
            attributes = analyticsDataPoints.getCountryCode();  // Add country code as the first Explore attribute
        }
        else {
            attributes = analyticsDataPoints.getCountryCode() + "-_-" + analyticsDataPoints.getExploreAttributes(); // Add country code as the first Explore attribute and additional attributes
        }
        cmCreateShopAction5Tag(analyticsDataPoints.getProductId(), analyticsDataPoints.getProductName(), analyticsDataPoints.getQuantity(),
			                 analyticsDataPoints.getPrice(), analyticsDataPoints.getCategoryId(), analyticsDataPoints.getCurrency(), attributes);
    };
    /**
    * CoreMetrics specific, calls cmDisplayShop9s. Required to be called only ONCE after the calls to the tagProductItemPurchased.
    *
    */
    var displayShop9s = function() {
        cmDisplayShop9s();
    };
    /**
    * Calls CM cmCreateShopAction9Tag for every item purchased by the customer. Called by the tagProductItemPurchased.
    * @param {Object} analyticsDataPoints
    */
    var trackProductItemPurchased = function(analyticsDataPoints) {
        var attr = GetExploreAttributes(analyticsDataPoints.getExploreAttributes());
        if (attr !== null) {
            if (attr.length >= NOEXPLOREATTR) {
                throw "You cannot pass more than 14 explore attributes as the 1st is prepopulated with the country code of the site.";
            }
        }
        var attributes = null;
        if (attr == null || attr.length == 0) {
            attributes = analyticsDataPoints.getCountryCode();  // Add country code as the first Explore attribute
        }
        else {
            attributes = analyticsDataPoints.getCountryCode() + "-_-" + analyticsDataPoints.getExploreAttributes(); // Add country code as the first Explore attribute and additional attributes
        }
        cmCreateShopAction9Tag(analyticsDataPoints.getProductId(), analyticsDataPoints.getProductName(), analyticsDataPoints.getQuantity(),
							   analyticsDataPoints.getPrice(), analyticsDataPoints.getMemberId(), analyticsDataPoints.getOrderId(),
							   analyticsDataPoints.getOrderSubTotal(), analyticsDataPoints.getCategoryId(), analyticsDataPoints.getCurrency(), attributes);
    };


    /**
    *
    * @param {Object} analyticsDataPoints
    */

    var trackBrandProduct = function(analyticsDataPoints) {

    };
    //As part of the Revealing Module Pattern we must now expose those methods that require public access.
    return { SetClientId: SetClientId,
        trackPageViewed: trackPageViewed,
        trackPageElement: trackPageElement,
        trackProductView: trackProductView,
        trackRegistration: trackRegistration,
        trackError: trackError,
        trackConversion: trackConversion,
        trackFlashEvent: trackFlashEvent,
        trackFlashLink: trackFlashLink,
        trackFlashImpression: trackFlashImpression,
        trackOrderPurchased: trackOrderPurchased,
        trackProductItemAddtoBasket: trackProductItemAddtoBasket,
        trackProductItemPurchased: trackProductItemPurchased,
        displayShop5s: displayShop5s,
        displayShop9s: displayShop9s
    };
} ();

/**
* Adidas Provider class.
* @class Adidas namespace
*/
var Adidas = function(production) {
    var self = this;
    if (typeof glHelper == "undefined")
        glHelper = new CMGlobal();
    /**
    * Contains Country of origin results COOResults.
    * Has two members site name and country code (UK, DE, etc, etc)
    * @member COOResults
    */
    function COOResults() {
        this.site = null;
        this.countryCode = null;
    }

    /**
    * Contains publically exposed methods for tagging pages.
    * @class Analytics
    */
    self.Analytics = function() {
        var self = this;
        /* -- References to the internal Classes to the Analytics class */
/*1.061*/
        var _prePendCC = false;
/*1.061*/
        var _prePendCCToCategory = false;
        var _prePendCCToElementCategory = false;
        var glHelper = new CMGlobal();

        /**
        * Business object containing Analytics Data Points.
        * @class AnalyticsDataPoints
        */
        self.AnalyticsDataPoints = function() {

            var _countryCode = null; // Country code
            var _domainName = null; // Current domain
            var _pageId = null; // Page Identifier
            var _elementId = null; // Page Element
            var _categoryId = null; // Category Identifier
            var _memberId = null; // Registered Member Identifier
            var _email = null; // Customer email address
            var _city = null; //Customer city
            var _state = null // Customer state
            var _postalCode = null // Postal code
            var _newsLetter = null // Newsletter
            var _subscribed = null // Subscribed
            var _eventId = null // Event Id
            var _orderId = null; // Order Identifier
            var _productId = null; // Product Identifier
            var _productName = null; //Product Name
            var _productPrice = +(0.0); // Product line item price
            var _orderQuantity = +(0); // Product line quantity
            var _orderSubTotal = +(0.00); // Order Subtotal
            var _orderShipping = +(0.00); // Order Shipping
            var _orderTax = +(0.0); // Product item tax
            var _searchKeyword = null; // Search keywords, comma delimited
            var _totalNumOfSearchResults = +(0.00); // Total number of search results
            var _actionID = null; // Generic analytics event identifier
            var _actionType = null; // Generic analytics event identifier
            var _conversionPoints = +(0); // Points per conversion
            var _href = null; // href
            var _linkName = null; // Link name
            var _realEstateTag = null; // Real Estate tag
            var _sitePromotionTag = null; // Site Promotion tag
            var _exploreAttributes = null; // Explore attributes
            var _currency = null; // ISO Currency type - Refer to Coremetrics document ReleaseNotes_Multi_Currency

            /**
            * Explore attributes
            */
            var _ex_attr1;
            var _ex_attr2;
            var _ex_attr3;
            var _ex_attr4;
            var _ex_attr5;
            var _ex_attr6;
            var _ex_attr7;
            var _ex_attr8;
            var _ex_attr9;
            var _ex_attr10;
            var _ex_attr11;
            var _ex_attr12;
            var _ex_attr13;
            var _ex_attr14;
            var _ex_attr15;


            var setDomain = function(domainName) {
                _domainName = domainName;
            };

            var getDomain = function() {
                return _domainName;
            };

            var setPageId = function(pageId) {
                _pageId = pageId;
            };

            var getPageId = function() {
                return _pageId;
            };

            var setElementId = function(elementId) {
                _elementId = elementId;
            };

            var getElementId = function() {
                return _elementId;
            };

            var setCategoryId = function(categoryId) {
                _categoryId = categoryId;
            };

            var getCategoryId = function() {
                return _categoryId;
            };

            var setMemberId = function(memberId) {
                _memberId = memberId;
            };

            var getMemberId = function() {
                return _memberId;
            };

            var setEmail = function(email) {
                _email = email;
            };

            var getEmail = function() {
                return _email;
            };

            var setCity = function(city) {
                _city = city;
            };

            var getCity = function() {
                return _city;
            };

            var setState = function(state) {
                _state = state;
            };

            var getState = function() {
                return _state;
            };
            var setPostalCode = function(postalCode) {
                _postalCode = postalCode;
            };
            var getPostalCode = function() {
                return _postalCode;
            };

            var setNewsLetter = function(newsLetter) {
                _newsLetter = newsLetter;
            };
            var getNewsLetter = function() {
                return _newsLetter;
            };

            var setSubscribed = function(subscribed) {
                _subscribed = subscribed;
            };
            var getSubscribed = function() {
                return _subscribed;
            };

            var setEventId = function(eventId) {
                _eventId = eventId;
            };
            var getEventId = function() {
                return _eventId;
            }

            var setOrderId = function(orderId) {
                _orderId = orderId;
            };

            var getOrderId = function() {
                return _orderId;
            };

            var setProductId = function(productId) {
                _productId = productId;
            };

            var getProductId = function() {
                return _productId;
            };

            var setProductName = function(productName) {
                _productName = productName;
            };

            var getProductName = function() {
                return _productName;
            };

            var setPrice = function(productPrice) {
                if (!isNaN(productPrice)) {
                    _productPrice = productPrice;
                }
                else {
                    throw "The product price set is not a valid number";
                }
            };

            var getPrice = function() {
                return _productPrice;
            };

            var setQuantity = function(orderQuantity) {
                if (!isNaN(orderQuantity)) {
                    _orderQuantity = orderQuantity;
                }
                else {
                    throw "The quantity set is not a valid number";
                }
            };

            var getQuantity = function() {
                return _orderQuantity;
            };

            var setOrderSubTotal = function(orderSubTotal) {
                if (!isNaN(orderSubTotal)) {
                    _orderSubTotal = orderSubTotal;
                }
                else {
                    throw "The order subtotal set is not a valid number.";
                }
            };

            var getOrderSubTotal = function() {
                return _orderSubTotal;
            };

            var setOrderShipping = function(orderShipping) {
                if (!isNaN(orderShipping)) {
                    _orderShipping = orderShipping;
                }
                else {
                    throw "The order shipping value is not a valid number";
                }
            };

            var getOrderShipping = function() {
                return _orderShipping;
            };

            var setTax = function(orderTax) {
                if (!isNaN(orderTax)) {
                    _orderTax = orderTax;
                }
                else {
                    throw "The order tax set is not a valid number";
                }

            };
            var getTax = function() {
                return _orderTax;
            };

            var setSearchTerm = function(searchKeyword) {
                _searchKeyword = searchKeyword;
            };
            var getSearchTerm = function() {
                return _searchKeyword;
            };

            var setTotalNumOfSearchResults = function(totalNumOfSearchResults) {
                _totalNumOfSearchResults = totalNumOfSearchResults;
            };
            var getTotalNumOfSearchResults = function() {
                return _totalNumOfSearchResults;
            };

            var setActionId = function(actionId) {
                _actionId = actionId;
            };
            var getActionId = function() {
                return _actionId;
            };

            var setActionType = function(actionType) {
                _actionType = actionType;
            };
            var getActionType = function() {
                return _actionType;
            };

            var setPoints = function(conversionPoints) {
                if (!isNaN(conversionPoints)) {
                    _conversionPoints = conversionPoints;
                }
                else {
                    throw "The number passed for Points is invalid";
                }

            };
            var getPoints = function() {
                return _conversionPoints;
            };

            var setLink = function(href) {
                _href = href;
            };
            var getLink = function() {
                return _href;
            };

            var setLinkName = function(name) {
                _linkName = name
            };
            var getLinkName = function() {
                return _linkName;
            };

            var setRealEstateTag = function(realEstateTag) {
                _realEstateTag = realEstateTag;
            };
            var getRealEstateTag = function() {
                return _realEstateTag;
            };

            var setSitePromoTag = function(promoTag) {
                _sitePromotionTag = promoTag;
            };

            var getSitePromoTag = function() {
                return _sitePromotionTag;
            };

            var setExploreAttributes = function(explore) {
                _exploreAttributes = explore;

            };
            var getExploreAttributes = function() {
                return _exploreAttributes;
            };

            var setCountryCode = function(countryCode) {
                _countryCode = countryCode;

            };
            var getCountryCode = function() {
                return _countryCode;
            };

            var setCurrency = function(currency) {
                _currency = currency;
            };

            var getCurrency = function() {
                return _currency;
            };

            var setAttr1 = function(attr) {
                _ex_attr1 = attr;
            };

            var getAttr1 = function() {
                return _ex_attr1;
            };

            var setAttr2 = function(attr) {
                _ex_attr2 = attr;
            };

            var getAttr2 = function() {
                return _ex_attr2;
            };

            var setAttr3 = function(attr) {
                _ex_attr3 = attr;
            };

            var getAttr3 = function() {
                return _ex_attr3;
            };

            var setAttr4 = function(attr) {
                _ex_attr4 = attr;
            };

            var getAttr4 = function() {
                return _ex_attr4;
            };

            var setAttr5 = function(attr) {
                _ex_attr5 = attr;
            };

            var getAttr5 = function() {
                return _ex_attr5;
            };

            var setAttr6 = function(attr) {
                _ex_attr6 = attr;
            };

            var getAttr6 = function() {
                return _ex_attr6;
            };

            var setAttr7 = function(attr) {
                _ex_attr7 = attr;
            };

            var getAttr7 = function() {
                return _ex_attr7;
            };

            var setAttr8 = function(attr) {
                _ex_attr8 = attr;
            };

            var getAttr8 = function() {
                return _ex_attr8;
            };

            var setAttr9 = function(attr) {
                _ex_attr9 = attr;
            };

            var getAttr9 = function() {
                return _ex_attr9;
            };

            var setAttr10 = function(attr) {
                _ex_attr10 = attr;
            };

            var getAttr10 = function() {
                return _ex_attr10;
            };

            var setAttr11 = function(attr) {
                _ex_attr11 = attr;
            };

            var getAttr11 = function() {
                return _ex_attr12;
            };

            var setAttr12 = function(attr) {
                _ex_attr12 = attr;
            };

            var getAttr12 = function() {
                return _ex_attr12;
            };

            var setAttr13 = function(attr) {
                _ex_attr13 = attr;
            };

            var getAttr13 = function() {
                return _ex_attr13;
            };

            var setAttr14 = function(attr) {
                _ex_attr14 = attr;
            };

            var getAttr14 = function() {
                return _ex_attr14;
            };

            var setAttr15 = function(attr) {
                _ex_attr15 = attr;
            };

            var getAttr15 = function() {
                return _ex_attr15;
            };

            //As part of the Revealing Module Pattern we must now expose those methods that require public access.
            return { setDomain: setDomain,
                getDomain: getDomain,
                setPageId: setPageId,
                getPageId: getPageId,
                setElementId: setElementId,
                getElementId: getElementId,
                setCategoryId: setCategoryId,
                getCategoryId: getCategoryId,
                setMemberId: setMemberId,
                getMemberId: getMemberId,
                getEmail: getEmail,
                setEmail: setEmail,
                setCity: setCity,
                getCity: getCity,
                setState: setState,
                getState: getState,
                setPostalCode: setPostalCode,
                getPostalCode: getPostalCode,
                setNewsLetter: setNewsLetter,
                getNewsLetter: getNewsLetter,
                setSubscribed: setSubscribed,
                getSubscribed: getSubscribed,
                setOrderId: setOrderId,
                getOrderId: getOrderId,
                setProductId: setProductId,
                getProductId: getProductId,
                setProductName: setProductName,
                getProductName: getProductName,
                setPrice: setPrice,
                getPrice: getPrice,
                setQuantity: setQuantity,
                getQuantity: getQuantity,
                setOrderSubTotal: setOrderSubTotal,
                getOrderSubTotal: getOrderSubTotal,
                setOrderShipping: setOrderShipping,
                getOrderShipping: getOrderShipping,
                setTax: setTax,
                getTax: getTax,
                setSearchTerm: setSearchTerm,
                getSearchTerm: getSearchTerm,
                setTotalNumOfSearchResults: setTotalNumOfSearchResults,
                getTotalNumOfSearchResults: getTotalNumOfSearchResults,
                setEventId: setEventId,
                getEventId: getEventId,
                setActionId: setActionId,
                getActionId: getActionId,
                setActionType: setActionType,
                getActionType: getActionType,
                setPoints: setPoints,
                getPoints: getPoints,
                setLink: setLink,
                getLink: getLink,
                setLinkName: setLinkName,
                getLinkName: getLinkName,
                setRealEstateTag: setRealEstateTag,
                getRealEstateTag: getRealEstateTag,
                setSitePromoTag: setSitePromoTag,
                getSitePromoTag: getSitePromoTag,
                setExploreAttributes: setExploreAttributes,
                getExploreAttributes: getExploreAttributes,
                setCountryCode: setCountryCode,
                getCountryCode: getCountryCode,
                setCurrency: setCurrency,
                getCurrency: getCurrency,
                getAttr1: getAttr1,
                setAttr1: setAttr1,
                getAttr2: getAttr2,
                setAttr2: setAttr2,
                getAttr3: getAttr3,
                setAttr3: setAttr3,
                getAttr4: getAttr4,
                setAttr4: setAttr4,
                getAttr5: getAttr5,
                setAttr5: setAttr5,
                getAttr6: getAttr6,
                setAttr6: setAttr6,
                getAttr7: getAttr7,
                setAttr7: setAttr7,
                getAttr8: getAttr8,
                setAttr8: setAttr8,
                getAttr9: getAttr9,
                setAttr9: setAttr9,
                getAttr10: getAttr10,
                setAttr10: setAttr10,
                getAttr11: getAttr11,
                setAttr11: setAttr11,
                getAttr12: getAttr12,
                setAttr12: setAttr12,
                getAttr13: getAttr13,
                setAttr13: setAttr13,
                getAttr14: getAttr14,
                setAttr14: setAttr14,
                getAttr15: getAttr15,
                setAttr15: setAttr15
            };
        } ();
        /**
        *
        * /



			 */
        /**
        * Public method for tagging page views
        * @param {Object} pageId Unique Page Identifier
        * @param {Object} pageCategoryId Category of the page, these categories are defined in the CDF.
        * @param {Object} searchTerm Search keywords used to find the page, should only be set on the first results page, all other pages it should be set to null.
        * @param {Object} searchResults Number of search results, set on the first results page.
        * @param {Object} attributes CM Explore attributes
        */
        var tagPageView = function(pageId, pageCategoryId, searchTerm, searchResults, attributes) {
            if (typeof glHelper != "undefined") {
                self.AnalyticsDataPoints.setCategoryId(pageCategoryId);
            }
            else {
                self.AnalyticsDataPoints.setCategoryId(pageCategoryId);
            }
            if (typeof adidasGlobal != "undefined" && adidasGlobal.siteType != "") //If the site's id has been set then enable prefixing
            {
				/*1.061 */
                /**self.AnalyticsDataPoints.setPageId(adidasGlobal.siteType + (adidasGlobal.brandType == "" ? "" : "_" + adidasGlobal.brandType) + (adidasGlobal.category == "" ? "" : "_" + adidasGlobal.category) + (adidasGlobal.siteType != "" ? "_" : "") + pageId);*/
				self.AnalyticsDataPoints.setPageId(pageId);
            }
            else {
                self.AnalyticsDataPoints.setPageId(pageId);
            }
            self.AnalyticsDataPoints.setSearchTerm(searchTerm);
            self.AnalyticsDataPoints.setTotalNumOfSearchResults(searchResults);
            self.AnalyticsDataPoints.setExploreAttributes(attributes);
            self.AnalyticsDataPoints.setCountryCode(adidasGlobal.country);
            CoreMetricsProvider.trackPageViewed(self.AnalyticsDataPoints);
        };
        /**
        * Tag a page element, useful for tracking AJAX application states
        * @param {Object} elementId Unique Page Element Id
        * @param {Object} elementCategoryId Associated category (self-contained, has nothing to do with the categories defined in the CDF) .
        * @param {Object} attributes  CM Explore attributes
        */
        var tagPageElement = function(elementId, elementCategoryId, attributes) {
            if (typeof glHelper != "undefined") {
                self.AnalyticsDataPoints.setCategoryId(elementCategoryId);
            }
            else {
                self.AnalyticsDataPoints.setCategoryId(elementCategoryId);
            }
            if (elementCategoryId == null) {
                elementCategoryId = "";
            }
            self.AnalyticsDataPoints.setElementId(elementId);
            self.AnalyticsDataPoints.setExploreAttributes(attributes);
            self.AnalyticsDataPoints.setCountryCode(adidasGlobal.country);

            CoreMetricsProvider.trackPageElement(self.AnalyticsDataPoints);
        };
        /**
        * Tag a product page
        * @param {Object} productId. In the case of adidas this would be the article Id
        * @param {Object} productName
        * @param {Object} productCategoryId. Defined in the CDF.
        * @param {Object} attributes CM Explore Attributes.
        */
        var tagProductView = function(productId, productName, productCategoryId, attributes) {
            if (typeof glHelper != "undefined") {
                self.AnalyticsDataPoints.setCategoryId(productCategoryId);
            }
            else {
                self.AnalyticsDataPoints.setCategoryId(productCategoryId);
            }
            self.AnalyticsDataPoints.setProductId(productId);
            self.AnalyticsDataPoints.setProductName(productName);
            self.AnalyticsDataPoints.setExploreAttributes(attributes);
            self.AnalyticsDataPoints.setCountryCode(adidasGlobal.country);

            CoreMetricsProvider.trackProductView(self.AnalyticsDataPoints);
        };
        /**
        * Tag a User Registration event
        * @param {Object} customerId Unique Customer Id
        * @param {Object} email Customer email
        * @param {Object} city Customer City
        * @param {Object} state Customer state/region
        * @param {Object} postalCode Customer postal code
        * @param {Object} attributes CM Explore attributes
        */
        var tagRegistration = function(customerId, email, city, state, postalCode, attributes) {
            self.AnalyticsDataPoints.setMemberId(customerId);
            self.AnalyticsDataPoints.setEmail(email);
            self.AnalyticsDataPoints.setCity(city);
            self.AnalyticsDataPoints.setState(state);
            self.AnalyticsDataPoints.setPostalCode(postalCode);
            self.AnalyticsDataPoints.setExploreAttributes(attributes);
            self.AnalyticsDataPoints.setCountryCode(adidasGlobal.country);

            CoreMetricsProvider.trackRegistration(self.AnalyticsDataPoints);
        };
        /**
        * Tag an application error.
        * @param {Object} pageId Unique Page Id
        * @param {Object} pageCategoryId Category Id for page defined in the CDF
        * @param {Object} attributes CM Explore attributes
        */
        var tagError = function(pageId, pageCategoryId, attributes) {
            tagPageView(pageId, pageCategoryId, "", "", attributes);
        };
        /**
        * Tag a conversion event
        * @param {Object} eventId A unique id for the event
        * @param {Object} actionType A value of 1(Initiation) or 2(Success). Single step conversion should be set as 2.
        * @param {Object} eventCategoryId Self contained category Id.
        * @param {Object} points Points associated toa successful conversion
        * @param {Object} attributes CM Explore attributes
        */
        var tagConversionEvent = function(eventId, actionType, eventCategoryId, points, attributes) {
            self.AnalyticsDataPoints.setCategoryId(eventCategoryId);
            self.AnalyticsDataPoints.setEventId(eventId);
            self.AnalyticsDataPoints.setActionType(actionType);
            self.AnalyticsDataPoints.setPoints(points);
            self.AnalyticsDataPoints.setExploreAttributes(attributes);
            self.AnalyticsDataPoints.setCountryCode(adidasGlobal.country);

            CoreMetricsProvider.trackConversion(self.AnalyticsDataPoints);
        };
        /**
        * Flash events are captured as Page Element events. This acts as a wrapper to the tagPageElement function.
        * @param {Object} flashEventCategory Self-contained category name for the Flash event
        * @param {Object} flashEvent Flash event Id
        * @param {Object} attributes CM Explore attributes
        */
        var tagFlashEvent = function(flashEvent, flashEventCategory, attributes) {
            tagPageElement(flashEvent, flashEventCategory, attributes);
        };
        /**
        * Tag a apge link. Usually used for Flash as HTML anchors are automatically tagged by CoreMetrics core library.
        * @param {Object} href URL for link
        * @param {Object} name Name of link.
        * @param {Object} pageId Unique Page Id
        * @param {Object} attributes CM Explore attributes
        */
        var tagLink = function(href, name, pageId, attributes) {
            self.AnalyticsDataPoints.setLink(href);
            self.AnalyticsDataPoints.setLinkName(name);
            self.AnalyticsDataPoints.setPageId(pageId);
            self.AnalyticsDataPoints.setExploreAttributes(attributes);
            self.AnalyticsDataPoints.setCountryCode(adidasGlobal.country);

            CoreMetricsProvider.trackFlashLink(self.AnalyticsDataPoints);
        };
        /**
        * Tag an Impression event.
        * @param {Object} pageId Unique Page identifier
        * @param {Object} sitePromoId Site promotion Id
        * @param {Object} realEstateId Real estate Id
        * @param {Object} attributes CM Explore attributes
        */
        var tagImpression = function(pageId, sitePromoId, realEstateId, attributes) {
            self.AnalyticsDataPoints.setPageId(pageId);
            self.AnalyticsDataPoints.setSitePromoTag(sitePromoId);
            self.AnalyticsDataPoints.setRealEstateTag(realEstateId);
            self.AnalyticsDataPoints.setExploreAttributes(attributes);
            self.AnalyticsDataPoints.setCountryCode(adidasGlobal.country);

            CoreMetricsProvider.trackFlashImpression(self.AnalyticsDataPoints, attributes);
        };
        /**
        * Tag a order purchase
        * @param {Object} orderId Unique Order Id
        * @param {Object} orderSubTotal Order Subtotal
        * @param {Object} orderShipping Order shipping cost
        * @param {Object} customerId Unique Customer Id
        * @param {Object} city Customer City
        * @param {Object} state Customer state/region
        * @param {Object} postalCode Customer Postal Code
        * @param {Object} currency ISO Currency Type
        * @param {Object} attributes CM Explore attributes
        */
        var tagOrderPurchased = function(orderId, orderSubTotal, orderShipping, customerId, city, state, postalCode, currency, attributes) {
            self.AnalyticsDataPoints.setOrderId(orderId);
            self.AnalyticsDataPoints.setOrderSubTotal(orderSubTotal);
            self.AnalyticsDataPoints.setOrderShipping(orderShipping);
            self.AnalyticsDataPoints.setMemberId(customerId);
            self.AnalyticsDataPoints.setCity(city);
            self.AnalyticsDataPoints.setState(state);
            self.AnalyticsDataPoints.setPostalCode(postalCode);
            self.AnalyticsDataPoints.setCurrency(currency);
            self.AnalyticsDataPoints.setExploreAttributes(attributes);
            self.AnalyticsDataPoints.setCountryCode(adidasGlobal.country);

            CoreMetricsProvider.trackOrderPurchased(self.AnalyticsDataPoints);
        };
        /**
        * Commit all tagProductItemAddTobasketTag. Must be called ONLY ONCE, this is a wrapper function for the CM function displayShop5s().
        */
        var commitProductItemAddToBasketTags = function() {
            CoreMetricsProvider.displayShop5s();
        };
        var tagProductItemAddToBasket = function(productId, productName, quantity, unitPrice, categoryId, currency, attributes) {
            self.AnalyticsDataPoints.setCategoryId(categoryId);
            self.AnalyticsDataPoints.setProductId(productId);
            self.AnalyticsDataPoints.setProductName(productName);
            self.AnalyticsDataPoints.setQuantity(quantity);
            self.AnalyticsDataPoints.setPrice(unitPrice);
            self.AnalyticsDataPoints.setCurrency(currency);
            self.AnalyticsDataPoints.setExploreAttributes(attributes);
            self.AnalyticsDataPoints.setCountryCode(adidasGlobal.country);

            CoreMetricsProvider.trackProductItemAddtoBasket(self.AnalyticsDataPoints);
        };
        /**
        * Commit all tagProductItemPurchasedTag. Must be called ONLY ONCE, this is a wrapper function for the CM function displayShop9s().
        */
        var commitProductItemPurchasedTags = function() {
            CoreMetricsProvider.displayShop9s();
        };
        /**
        * Tag a Prooduct Item purchased
        * @param {Object} productId Unique Product Id. Usually the Article Id
        * @param {Object} productName Product Name
        * @param {Object} quantity Quantity purchased
        * @param {Object} unitPrice Product price
        * @param {Object} customerId Unique customer Id
        * @param {Object} orderId Unique Order Id
        * @param {Object} orderSubTotal Order subtotal
        * @param {Object} categoryId Category Id defined in the CDF
        * @param {Object} attributes CM Explore attributes
        */
        var tagProductItemPurchased = function(productId, productName, quantity, unitPrice, customerId, orderId, orderSubTotal, categoryId, currency, attributes) {
            self.AnalyticsDataPoints.setCategoryId(categoryId);
            self.AnalyticsDataPoints.setMemberId(customerId);
            self.AnalyticsDataPoints.setCategoryId(categoryId);
            self.AnalyticsDataPoints.setProductId(productId);
            self.AnalyticsDataPoints.setProductName(productName);
            self.AnalyticsDataPoints.setOrderId(orderId);
            self.AnalyticsDataPoints.setQuantity(quantity);
            self.AnalyticsDataPoints.setPrice(unitPrice);
            self.AnalyticsDataPoints.setOrderSubTotal(orderSubTotal);
            self.AnalyticsDataPoints.setCurrency(currency);
            self.AnalyticsDataPoints.setExploreAttributes(attributes);
            self.AnalyticsDataPoints.setCountryCode(adidasGlobal.country);

            CoreMetricsProvider.trackProductItemPurchased(self.AnalyticsDataPoints);
        };

        /**
        * Set an attribute to an empty string if undefined
        */
        var initAttribute = function(attr) {
            return (attr == undefined || attr == null ? "" : attr);
        }

        /**
        *
        * Tag a video view
        *
        * @param {Object} videoid
        * @param {Object} category
        * @param {Object} status
        * @param {Object} time
        * @param {Object} length
        * @param {Object} attr2
        * @param {Object} attr3
        * @param {Object} attr4
        * @param {Object} attr5
        * @param {Object} attr6
        * @param {Object} attr7
        * @param {Object} attr8
        * @param {Object} attr9
        * @param {Object} attr10
        * @param {Object} attr11
        * @param {Object} attr12
        */

        var tagVideo = function(videoid, category, status, time, length, attr2, attr3, attr4, attr5, attr6, attr7, attr8, attr9, attr10, attr11, attr12) {

            self.AnalyticsDataPoints.setElementId(videoid);
            if (typeof glHelper != "undefined") {
                self.AnalyticsDataPoints.setCategoryId(category);
            }
            else {
                self.AnalyticsDataPoints.setCategoryId(category);
            }
            self.AnalyticsDataPoints.setAttr13(status);
            self.AnalyticsDataPoints.setAttr14(time);
            self.AnalyticsDataPoints.setAttr15(length);
            self.AnalyticsDataPoints.setCountryCode(adidasGlobal.country);

            attr2 = initAttribute(attr2);
            attr3 = initAttribute(attr3);
            attr4 = initAttribute(attr4);
            attr5 = initAttribute(attr5);
            attr6 = initAttribute(attr6);
            attr7 = initAttribute(attr7);
            attr8 = initAttribute(attr8);
            attr9 = initAttribute(attr9);
            attr10 = initAttribute(attr10);
            attr11 = initAttribute(attr11);
            attr12 = initAttribute(attr12);
            status = initAttribute(status);
            time = initAttribute(time);
            length = initAttribute(length);

            self.AnalyticsDataPoints.setExploreAttributes(attr2 + "-_-" + attr3 + "-_-" + attr4 + "-_-" + attr5 + "-_-" + attr6 + "-_-" + attr7 + "-_-"
						+ attr8 + "-_-" + attr9 + "-_-" + attr10 + "-_-" + attr11 + "-_-" + attr12 + "-_-" + status + "-_-" + time + "-_-" + length);
            CoreMetricsProvider.trackPageElement(self.AnalyticsDataPoints);
        };

        /**
        *
        * Tag a product view on a brand site as a page view
        *
        * @param {Object} pageId
        * @param {Object} category
        * @param {Object} articleName
        * @param {Object} articleNumber
        * @param {Object} attr2
        * @param {Object} attr3
        * @param {Object} attr4
        * @param {Object} attr5
        * @param {Object} attr6
        * @param {Object} attr7
        * @param {Object} attr8
        * @param {Object} attr9
        * @param {Object} attr10
        * @param {Object} attr11
        * @param {Object} attr12
        * @param {Object} attr13
        * @param {Object} attr14
        * @param {Object} attr15
        */

        var tagBrandProductView = function(category, articleName, articleNumber, attr2, attr3, attr4, attr5, attr6, attr7, attr8, attr9, attr10, attr11, attr12, attr13, attr14, attr15) {
            if (typeof glHelper != "undefined") {
                self.AnalyticsDataPoints.setCategoryId(category);
            }
            else {
                self.AnalyticsDataPoints.setCategoryId(category);
            }
            self.AnalyticsDataPoints.setProductName(articleName);
            self.AnalyticsDataPoints.setProductId(articleNumber);
            if (typeof adidasGlobal != "undefined") {
                self.AnalyticsDataPoints.setPageId(adidasGlobal.siteType + (adidasGlobal.brandType == "" ? "" : "_" + adidasGlobal.brandType) + (adidasGlobal.category == "" ? "" : "_" + adidasGlobal.category) + "_Product : " + self.AnalyticsDataPoints.getProductName() + " (" + self.AnalyticsDataPoints.getProductId() + ")");
            }
            else {
                throw "adidasGlobal is not defined!!";
            }

            self.AnalyticsDataPoints.setCountryCode(adidasGlobal.country);

            attr2 = initAttribute(attr2);
            attr3 = initAttribute(attr3);
            attr4 = initAttribute(attr4);
            attr5 = initAttribute(attr5);
            attr6 = initAttribute(attr6);
            attr7 = initAttribute(attr7);
            attr8 = initAttribute(attr8);
            attr9 = initAttribute(attr9);
            attr10 = initAttribute(attr10);
            attr11 = initAttribute(attr11);
            attr12 = initAttribute(attr12);
            attr13 = initAttribute(attr13);
            attr14 = initAttribute(attr14);
            attr15 = initAttribute(attr15);

            self.AnalyticsDataPoints.setExploreAttributes(attr2 + "-_-" + attr3 + "-_-" + attr4 + "-_-" + attr5 + "-_-" + attr6 + "-_-" + attr7 + "-_-"
						+ attr8 + "-_-" + attr9 + "-_-" + attr10 + "-_-" + attr11 + "-_-" + attr12 + "-_-" + attr13 + "-_-" + attr14 + "-_-" + attr15);

            CoreMetricsProvider.trackPageViewed(self.AnalyticsDataPoints);
        };
        /**
        *
        * @param {Object} prePend
        */
        var prePendCountryCodeToPageId = function(prePend) {
            _prePendCC = prePend;
        };
        /**
        *
        * @param {Object} prePend
        */
        var prePendCountryCodeToCategoryId = function(prePend) {
            _prePendCCToCategory = prePend;
        };

        /**
        *
        * @param {Object} prePend
        */
        var prePendCountryCodeElementToCategoryId = function(prePend) {
            _prePendCCToElementCategory = prePend;
        };
        /**
        *
        * @param {Object} setSiteId
        */
        var setSiteId = function(site) {
            adidasGlobal.siteType = site;
        };

        /**
        *
        * @param {Object} getSiteId
        */
        var getSiteId = function() {
            return adidasGlobal.siteType;
        };

        /**
        *
        * @param {Object} getPageId
        */
        var getPageId = function() {
            return self.AnalyticsDataPoints.getPageId();
        };

        /**
        *
        * @param {Object} setJFSPDomain
        */
        var setJSFPDomain = function(domain) {
            cm_JSFPCookieDomain = domain;
            CM_DDX.headScripts = false;
            cmSetClientID(cm_ClientID, true, cm_JSFPCookieDomain);
            //Must call cmSetProduction AFTER cmSetClientID
            if (production === null || production == undefined || production) // Track to CM Production environment
            {
                //cmSetProduction();
            }
        };

        /**
        *
        * @param {Object} getJFSPDomain
        */
        var getJSFPDomain = function() {
            return cm_JSFPCookieDomain;
        };
        //As part of the Revealing Module Pattern we must now expose those methods that require public access.
        return { tagPageView: tagPageView,
            tagPageElement: tagPageElement,
            tagProductView: tagProductView,
            tagRegistration: tagRegistration,
            tagError: tagError,
            tagConversionEvent: tagConversionEvent,
            tagFlashEvent: tagFlashEvent,
            tagLink: tagLink,
            tagImpression: tagImpression,
            tagOrderPurchased: tagOrderPurchased,
            tagProductItemAddToBasket: tagProductItemAddToBasket,
            tagProductItemPurchased: tagProductItemPurchased,
            commitProductItemAddToBasketTags: commitProductItemAddToBasketTags,
            commitProductItemPurchasedTags: commitProductItemPurchasedTags,
            prePendCountryCodeToPageId: prePendCountryCodeToPageId,
            prePendCountryCodeToCategoryId: prePendCountryCodeToCategoryId,
            prePendCountryCodeElementToCategoryId: prePendCountryCodeElementToCategoryId,
            setSiteId: setSiteId,
            getSiteId: getSiteId,
            setJSFPDomain: setJSFPDomain,
            getJSFPDomain: getJSFPDomain,
            tagVideo: tagVideo,
            tagBrandProductView: tagBrandProductView,
            getPageId: getPageId
        };
    } ();
    /**********************************************************  This code is executed on instantiation of the Adidas object ************************************************************************************************/
    if (!production) {//If production is set to false send all tags to the test global rollup
        //CoreMetricsProvider.SetClientId(CM_TEST_CLIENTIDS,production);
        CoreMetricsProvider.SetClientId(adidasGlobal.testclientId,production);
    }
    else {
      CoreMetricsProvider.SetClientId(adidasGlobal.clientId,production);
    }

    /***********************************************************************************************************************************************************************************************************************/
}