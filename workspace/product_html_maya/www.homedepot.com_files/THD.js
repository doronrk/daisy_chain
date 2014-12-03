/*
 * Read cookie value
 */
function readCookieVal(cookieName) {
	return window.readCookie(cookieName);	
}

/*
 * Set Data collector (DC) for any key / Value pair.
 * 
 * Like: key=pageName Value=TestPage
 * 
 * It will set DC as _hddata["pageName"]=TestPage
 * 
 */
function setDC(key, value) {
	if ((typeof _hddata !== undefined) && ((key !== null) && (key !== ""))) {
		_hddata[key] = value;
	}
}

/*
 * This method sets the cookie
 * 
 * Like: localState
 */
function setBetaSiteDC() {
	var usebetaCookieVal = readCookie("usebeta");
	var strState = null;
	var betaCookie = null;
	var hostName = window.location.hostname;
	
	if ((hostName.indexOf(".homedepot.com") >= 0) && (hostName.indexOf("pr71") < 0)) {
		if ((usebetaCookieVal !== null) && (usebetaCookieVal === "1")) {
			betaCookie = "beta";			
		} else {
			betaCookie = "prod";		
		}
		
		setDC("betaSite", betaCookie);
	}	
		
	console.log("Setting Beta-DC for "+hostName+" / Val : "+betaCookie);
}

/*
 * This method provides DC for store number user is localized too.
 * 
 * Like: localStoreNum
 */
function setStoreNbr() {
	var locStoreVal = readCookie("THD_LOCSTORE");
	var strNumber = null;
	if ((locStoreVal !== null) && (locStoreVal !== "")) {
		strNumber = locStoreVal.substring(0, locStoreVal.indexOf('+'));
		setDC("localStoreNum", strNumber);
	}
}

/*
 * This method provides DC for state user is localized too.
 * 
 * Like: localState
 */
function setStoreState() {
	var locStoreVal = readCookie("THD_LOCSTORE");
	var strState = null;
	if ((locStoreVal !== null) && (locStoreVal !== "")) {
		strState = locStoreVal.substring((locStoreVal.indexOf(',')) + 1,
				locStoreVal.lastIndexOf('+'));
		setDC("localState", strState);
	}
}

/*
 * This method provides DC for ZIP code user is localized too.
 * 
 * Like: localZipCode
 */
function setStoreZip() {
	var locStoreZip = readCookie("THD_STRFINDERZIP");
	setDC("localZipCode", locStoreZip);
}

/*
 * This method provides DC regarding customer.
 * 
 * Like: custStatus & customerID
 */
function setUserIdAndStatus() {
	
	var wcPersistent = readBrowserCookie('WC_PERSISTENT');
	var wcUserActivity = getUserIdFromUserActivityCookie();

	var status = "";
	var userId = "";
	// Authenticated user
	if (readCookie("THD_USERSTATUS") === "1") {
		status = "authenticated";
		userId = wcUserActivity;
	}// Recognized user
	else if (readCookie("THD_REMEMBERME")
			&& readCookie("THD_USERSTATUS") !== "1") {
		status = "recognized";
		userId = wcUserActivity;
	} else if (wcUserActivity === -1002) {
		// Default status is anonymous
		status = "anonymous";
		userId = "-1002";
	} else {
		// Guest
		status = "guest";
		userId = wcUserActivity;
	}

	setDC("custStatus", status);
	setDC("customerID", userId);
}

/*
 * This method provides DC for user experience type.
 * 
 * Like: experienceType.
 */
function setExperienceType() {
	var experienceType = readCookie('THD_ONLINE_CHANNEL');

	if (experienceType == 'E1=S3') {
		setDC("experienceType", "tablet");
	} else {
		experienceType = readCookie('THD_USERTYPE');
		if (experienceType == 'P') {
			setDC("experienceType", "pro");
		} else {
			setDC("experienceType", "consumer");
		}
	}
}

/*
 * This method provides DC about the store user is localized too.
 * 
 * Like: localStoreNum, localState & localZipCode
 */
function setStoreDC() {
	console.log("Loading store DC's...");
	
	setStoreNbr();
	setStoreState();
	setStoreZip();
}

/*
 * This method provides common set of DC. It can be consumed by all the apps /
 * 3rd party pages to set basic DC.
 * 
 * This method needs to be modified only when we expect particular DC to be
 * available on all the pages.
 * 
 * Like: custStatus, customerID, experienceType, localStoreNum, localState &
 * localZipCode.
 */
function setStaticCommonDC() {
	console.log("Loading static commmon DC's...");
	
	if (_hddata !== null) {
		setUserIdAndStatus();
		setExperienceType();
		setStoreDC();
		setBetaSiteDC();
	}
}

/*
 * This method sets the basic page level DC. To set these user has to pass
 * corresponding value only.
 * 
 * Like: pageName, siteSection, contentCategory, contentSubCategory & pageType
 * 
 */
function setPageDC(pageName, siteSection, contentCategory, contentSubCategory,
		pageType) {
	console.log("Loading page DC's...");
	
	setDC("pageName", pageName);
	setDC("siteSection", siteSection);
	setDC("contentCategory", contentCategory);
	setDC("contentSubCategory", contentSubCategory);
	setDC("pageType", pageType);
}

/*
 * This method sets the basic page level DC and user provide page level DC's.
 * 
 * To set these user has to pass corresponding values.
 * 
 * Like: custStatus, customerID, experienceType, localStoreNum, localState,
 * localZipCode, pageName, siteSection, contentCategory, contentSubCategory &
 * pageType.
 * 
 */
function setCommonAndPageDC(pageName, siteSection, contentCategory,
		contentSubCategory, pageType) {
	console.log("Loading common static and page DC's...");
	setStaticCommonDC();
	setPageDC(pageName, siteSection, contentCategory, contentSubCategory,
			pageType);
}

/*
 * This method is called once all the DC's are set on the page.
 * 
 */
function sendData() {
	console.log("Sending page DC data...");
	if (window.hddataReady) {
		window.hddataReady();
	}
	ishddataReady = true;
}

/*
 * This method is called after AJAX call DC are set.
 * 
 */
function sendDataWithParam(formSubmitVal) {
	if ((formSubmitVal !== null) && (formSubmitVal !== "")) {
		if (window.hddataReady) {
			window.hddataReady(formSubmitVal);
		}
		ishddataReady = true;
	}
}

/*
 * This method is called after AJAX call DC are set.
 * 
 */
function sendAjaxData(ajaxVal, formSubmitVal) {
	console.log("Sending AJAX DC data...");
	
	setDC("AJAX", ajaxVal);
	if ((formSubmitVal !== null) && (formSubmitVal !== "")) {
		sendDataWithParam(ajaxVal, formSubmitVal)
	} else {
		sendData();
	}
}

/*
 * Function to set DC on store finder index page
 */
function setSFPageDC() {
	console.log("Setting SF & Directions DC...");
	
	setDC("pagename","page_home page_store finder");
	setDC("abTest","store finder:store finder:tomcat");
	setBetaSiteDC();
	sendData();
}
