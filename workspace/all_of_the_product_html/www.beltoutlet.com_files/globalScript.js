var pdAddToFavoritesAction = "http://myaccount.beltoutlet.com/mod_favorites/favoritesAddItem.php";
var pdAddToRegistryAction = "http://myaccount.beltoutlet.com/mod_registry/addRegistryItem.php";

//**********************************************************
//**************** UTILITY FUNCTIONS ***********************
//**********************************************************
function isBlank(item) {
	item = String(item).toLowerCase();
	if(item == "undefined" || item == "" || item == "null") return true;
	else return false;
}
function getCurrentDomainName() {
	var url = String(location);
	var domainName = extractDomain(url);
	return domainName;
}
function extractDomain(url) {
	var url = url.replace("http://", "");
	var slashIndex = url.indexOf("/");
	if(slashIndex == -1) slashIndex = url.length;
	var url = url.substring(0, slashIndex);
	var urlSectionArray = url.split('.');
	var urlSectionArrayLength = urlSectionArray.length;
	var domainName = "";
	for(var i=urlSectionArrayLength - 2;i<urlSectionArrayLength; i++) {
		domainName += "." + urlSectionArray[i];
	}
	return domainName;
}
function pdGetCookie(cookieName) {
	var allCookies = String(document.cookie);
	var cookieStart = allCookies.indexOf(cookieName + "=");
	if(cookieStart == -1) return "";
	cookieStart = cookieStart + cookieName.length + 1;
	var cookieEnd = allCookies.indexOf(";", cookieStart);
	if(cookieEnd == -1) cookieEnd = allCookies.length;
	var cookieValue = allCookies.substring(cookieStart, cookieEnd);
	cookieValue = decodeURIComponent(cookieValue);
	if(cookieName == "pdRememberMe") cookieValue = String(cookieValue).replace("+"," ");	//*** ENCODING WORKAROUND
	return cookieValue;
}
function pdSetCookie(cookieName, cookieValue, cookieDomain, cookiePath, expirationDate) {
	if(isBlank(cookieDomain)) cookieDomain = getCurrentDomainName();
	if(isBlank(cookiePath)) cookiePath = "/";
	var cookieString = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue) + ";domain=" + cookieDomain + ";path=" + cookiePath;
	if(!isBlank(expirationDate)) {
		cookieString += ";expires=" + expirationDate.toGMTString();
	}
	document.cookie = cookieString;
	return true;
}
function popIt(width, height, scrollbars){ 
	if(!width) width = "640";
	if(!height) height = "480";
	if(!scrollbars) scrollbars = 1;
	var windowString = 'width=' + width + ',height=' + height + ',resizable=1,status=0,toolbar=no,scrollbars=' + scrollbars + ',scrolling=auto';
	var popItWindow = window.open('',"popIt", windowString);
	return false;
}
function encodeOptions(input) {
	input = String(input).replace(/&/g, "!!amp!!");
	input = String(input).replace(/=/g, "!!eq!!");
	return input;
}
function addToFavorites(orderForm, autoDetectUrl) {
	//*** AUTO-DETECT URL
	if(autoDetectUrl == true) {
		var productUrl = window.location;
		var hiddenProductUrl = document.createElement("INPUT");
		hiddenProductUrl.type = "hidden";
		hiddenProductUrl.name = "productUrl";
		hiddenProductUrl.value = productUrl;
		orderForm.appendChild(hiddenProductUrl);
	}
	//*** PASS ALONG ORIGINAL FORM ACTION
	var myInput = document.createElement("INPUT");
	myInput.type = "hidden";
	myInput.name = "formActionUrl";
	myInput.value = String(orderForm.action);
	orderForm.appendChild(myInput);	

	var tempAction = orderForm.action;
	var copiedQueryString = "";
	var queryStringPosition = tempAction.indexOf("?");
	if(queryStringPosition > -1) {
		copiedQueryString = tempAction.substring(queryStringPosition, tempAction.length);
		copiedQueryString = copiedQueryString.replace("+", "%20");
	}
	
	if(pdAddToFavoritesAction.indexOf("?") > -1) copiedQueryString = String(copiedQueryString).replace("?", "&");	
	orderForm.action=pdAddToFavoritesAction + copiedQueryString;
	orderForm.target="";	//*** COMPAT W/ SCFC
	orderForm.submit();
	orderForm.action = tempAction;
	orderForm.removeChild(myInput);
	return false;
}
function addToRegistry(orderForm, productUrl) {
	var optionString = '';
	var optionList = new Array();
	for(var i=0;i<orderForm.elements.length;i++) {
		if(orderForm.elements[i].type == "select-one" || String(orderForm.elements[i].name).indexOf("vw-inscription-") > -1) {
			var option = new Object();
			option.name = orderForm.elements[i].name;
			option.value = orderForm.elements[i].value;
			optionList.push(option);
		}
	}
	for (i = 0; i <= optionList.length - 1; i++) optionString += encodeOptions(optionList[i].name) + "=" + encodeOptions(optionList[i].value) + "&";
	optionString = optionString.substring(0, optionString.length - 1);
	var myInput = document.createElement("INPUT");
	myInput.type = "hidden";
	myInput.name = "product-option-list";
	myInput.value = optionString;
	orderForm.appendChild(myInput);
	//*** PRODUCT URL		
	if(!isBlank(productUrl)) {
		var hiddenProductUrl = document.createElement("INPUT");
		hiddenProductUrl.type = "hidden";
		hiddenProductUrl.name = "productUrl";
		hiddenProductUrl.value = productUrl;
		orderForm.appendChild(hiddenProductUrl);
	}
	var tempAction = orderForm.action;
	var copiedQueryString = "";
	var queryStringPosition = tempAction.indexOf("?");
	if(queryStringPosition > -1) {
		copiedQueryString = tempAction.substring(queryStringPosition, tempAction.length);
		copiedQueryString = copiedQueryString.replace("+", "%20");
	}
	orderForm.action=pdAddToRegistryAction + copiedQueryString;
	orderForm.target="";	//*** COMPAT W/ SCFC
	orderForm.submit();
	orderForm.action = tempAction;
	orderForm.removeChild(myInput);
	return false;
}
function addToFavoritesMultiAddForm(orderForm,num,productUrl) {
	var item = "vwitem" + num;
	var itemAttr = "vwattr" + num + "_";
	//*** CAN'T FIND MULTIFORM ELEMENT?  FALL BACK TO SINGLE ITEM CASE
	if(typeof orderForm[item] == "undefined") {
		item = "item";	
		itemAttr = "vwattr_";
	}	
	//******** ATTACH PRODUCT ID INPUT **************
	var inputProductId = document.createElement("INPUT");
	inputProductId.type = "hidden";
	inputProductId.name = "product-id";
	inputProductId.value = orderForm.elements[item].value;
	orderForm.appendChild(inputProductId);
	//******** ATTACH OPTIONS INPUT **************
	var optionString = '';
	var optionList = new Array();
	for(var i=0;i<orderForm.elements.length;i++){
		var optionName = orderForm.elements[i].name;
		if(optionName.match(itemAttr)){
			var option = new Object();
			var optionName = orderForm.elements[i].name;
			var optionNameFormatted = optionName.replace(itemAttr,"");
			option.name = optionNameFormatted;
			option.type = orderForm.elements[i].type;
			option.selected = false;
			try {option.selected = orderForm.elements[i].selected;} catch(e) {}
			option.checked = false;
			try {option.checked = orderForm.elements[i].checked;} catch(e) {}
			option.value = orderForm.elements[i].value;
			optionList.push(option);
		}
	}	
	for (i = 0; i <= optionList.length - 1; i++) {
		if(optionList[i].type == "radio") {
			if(optionList[i].checked == true) {
				optionString += encodeOptions(optionList[i].name) + "=" + encodeOptions(optionList[i].value) + "&";
			}
		} else {
			optionString += encodeOptions(optionList[i].name) + "=" + encodeOptions(optionList[i].value) + "&";
		}			
	}
	
	optionString = optionString.substring(0, optionString.length - 1);
	var inputOptions = document.createElement("INPUT");
	inputOptions.type = "hidden";
	inputOptions.name = "product-option-list";
	inputOptions.value = optionString;
	orderForm.appendChild(inputOptions);

	if(!isBlank(productUrl)) {
		var inputOptions = document.createElement("INPUT");
		inputOptions.type = "hidden";
		inputOptions.name = "productUrl";
		inputOptions.value = productUrl;
		orderForm.appendChild(inputOptions);
	}	
	
	var tempAction = orderForm.action;
	var copiedQueryString = "";
	var queryStringPosition = tempAction.indexOf("?");
	if(queryStringPosition > -1) {
		copiedQueryString = tempAction.substring(queryStringPosition, tempAction.length);
		copiedQueryString = copiedQueryString.replace("+", "%20");
	}
	orderForm.action=pdAddToFavoritesAction + copiedQueryString;
	if(orderForm.target != "_top") orderForm.target = ""; //*** COMPAT W/ SCFC (MODIFED W/ EXCEPTION FOR BINDERTEK)
	orderForm.submit();
	orderForm.action = tempAction;
	orderForm.removeChild(inputProductId);
	orderForm.removeChild(inputOptions);

	return false;
}
function addToRegistryMultiAddForm(orderForm,num) {
	//** GET ITEM ID AND OPTION ATTRIBUTES **********
	var item = "vwitem" + num;
	var itemAttr = "vwattr" + num + "_";
	var productId = orderForm[item].value;
	//******** ATTACH PRODUCT ID INPUT **************
	var inputProductId = document.createElement("INPUT");
	inputProductId.type = "hidden";
	inputProductId.name = "product-id";
	inputProductId.value = orderForm.elements[item].value;
	orderForm.appendChild(inputProductId);
	//******** ATTACH OPTIONS INPUT **************
	var optionString = '';
	var optionList = new Array();
	for(var i=0;i<orderForm.elements.length;i++){
		var optionName = orderForm.elements[i].name;
		if(optionName.match(itemAttr)){
			var option = new Object();
			var optionName = orderForm.elements[i].name;
			var optionNameFormatted = optionName.replace(itemAttr,"");
			option.name = optionNameFormatted;
			option.value = orderForm.elements[i].value;
			optionList.push(option);
		}
	}	
	for (i = 0; i <= optionList.length - 1; i++) optionString += encodeOptions(optionList[i].name) + "=" + encodeOptions(optionList[i].value) + "&";
	optionString = optionString.substring(0, optionString.length - 1);
	var inputOptions = document.createElement("INPUT");
	inputOptions.type = "hidden";
	inputOptions.name = "product-option-list";
	inputOptions.value = optionString;
	orderForm.appendChild(inputOptions);

	var tempAction = orderForm.action;
	var copiedQueryString = "";
	var queryStringPosition = tempAction.indexOf("?");
	if(queryStringPosition > -1) {
		copiedQueryString = tempAction.substring(queryStringPosition, tempAction.length);
		copiedQueryString = copiedQueryString.replace("+", "%20");
	}
	orderForm.action = pdAddToRegistryAction + copiedQueryString;
	orderForm.target="";	//*** COMPAT W/ SCFC
	orderForm.submit();
	orderForm.action = tempAction;
	orderForm.removeChild(inputProductId);
	orderForm.removeChild(inputOptions);

	return false;
}
function addToFavorites2013(orderForm,index,productUrl) {
	if(isBlank(index)) index = 0;
	var item = "vwitem" + index;
	var itemAttr = "vwattr" + index + "_";
	//*** CAN'T FIND MULTIFORM ELEMENT?  FALL BACK TO SINGLE ITEM CASE
	if(typeof orderForm[item] == "undefined") {
		item = "item";	
		itemAttr = "vwattr_";
	}
	//******** ATTACH PRODUCT ID INPUT **************
	if(item != "item") {
		var inputProductId = document.createElement("INPUT");
		inputProductId.type = "hidden";
		inputProductId.name = "add-single-favorites";
		inputProductId.value = index;
		orderForm.appendChild(inputProductId);
	}
	if(productUrl == "autoDetect") productUrl = String(document.location);
	if(!isBlank(productUrl)) {
		var inputOptions = document.createElement("INPUT");
		inputOptions.type = "hidden";
		inputOptions.name = "productUrl";
		inputOptions.value = productUrl;
		orderForm.appendChild(inputOptions);
	}	
	var tempAction = orderForm.action;
	var copiedQueryString = "";
	var queryStringPosition = tempAction.indexOf("?");
	if(queryStringPosition > -1) {
		copiedQueryString = tempAction.substring(queryStringPosition, tempAction.length);
		copiedQueryString = copiedQueryString.replace("+", "%20");
	}
	orderForm.action=pdAddToFavoritesAction + copiedQueryString;
	if(orderForm.target != "_top") orderForm.target = ""; //*** COMPAT W/ SCFC (MODIFED W/ EXCEPTION FOR BINDERTEK)
	orderForm.submit();
	orderForm.action = tempAction;
	orderForm.removeChild(inputProductId);
	orderForm.removeChild(inputOptions);
	return false;
}
//**********************************************************
//****** COPY BILLING FROM SHIPPING ON REGISTRY FORM *******
//**********************************************************
function copyBillingInfo(form) {
	if (form.copy.checked) {
		//**********************************************************
		//********* SET SHIPPING FIELDS AS VARIABLES ***************
		//**********************************************************
		var billFirstName = form.billFirstName.value;
		var billLastName = form.billLastName.value;
		var billAddress1 = form.billAddress1.value;
		var billAddress2 = form.billAddress2.value;
		var billCity = form.billCity.value;
		var billState = form.billState.value;
		var billZip = form.billZip.value;
		var billCountry = form.billCountry.value;
		var billPhone = form.billPhone.value;
				
		//***********************
		//*** OPTIONAL FIELDS ***
		//***********************
		try {var billCompany = form.billCompany.value;} catch(e) {}
		try {var billFax = form.billFax.value;} catch(e) {}
		try {var businessInfoBillingEmail = form.businessInfoBillingEmail.value;} catch(e) {}	//*** CB ONLY

		//**********************************************************
		//****** POPULATE SHIPPING FIELDS WITH BILLING DATA ********
		//**********************************************************
		form.shipFirstName.value = billFirstName;
		form.shipLastName.value = billLastName;
		form.shipAddress1.value = billAddress1;
		form.shipAddress2.value = billAddress2;
		form.shipCity.value = billCity;
		form.shipState.value = billState;
		form.shipZip.value = billZip;
		form.shipCountry.value = billCountry;
		form.shipPhone.value = billPhone;
		
		//***********************
		//*** OPTIONAL FIELDS ***
		//***********************
		try {form.shipCompany.value = billCompany;} catch(e) {}
		try {form.shipFax.value = billFax;} catch(e) {}
		try {form.businessInfoShippingEmail.value = businessInfoBillingEmail;} catch(e) {}	//*** CB ONLY

	} else {

		//**********************************************************
		//******************* RESET BILLING DATA *******************
		//**********************************************************
		try {form.shipCompany.value = "";} catch(e) {}
		form.shipFirstName.value = "";
		form.shipLastName.value = "";
		form.shipAddress1.value = "";
		form.shipAddress2.value = "";
		form.shipCity.value = "";
		form.shipState.value = "";       
		form.shipZip.value = "";
		form.shipCountry.value = "US";
		form.shipPhone.value = "";
		
		//***********************
		//*** OPTIONAL FIELDS ***
		//***********************
		try {form.shipCompany.value = "";} catch(e) {}
		try {form.shipFax.value = "";} catch(e) {}
		try {form.businessInfoShippingEmail.value = "";} catch(e) {}	//*** CB ONLY
	
	}
}

var pdMyAccountCopyBillingInfo = copyBillingInfo;	//*** FIX FOR REGISTRY OVERRIDING FUNCTION


//************************************************************************
//****** COPY BILLING INFO FROM SHIPPING INFO ON REGISTRATION FORM *******
//************************************************************************
function pdMyAccountCopyShippingInfo(form) {
	if (form.copy.checked) {
		//**********************************************************
		//********* SET SHIPPING FIELDS AS VARIABLES ***************
		//**********************************************************
		var shipFirstName = form.shipFirstName.value;
		var shipLastName = form.shipLastName.value;
		var shipAddress1 = form.shipAddress1.value;
		var shipAddress2 = form.shipAddress2.value;
		var shipCity = form.shipCity.value;
		var shipState = form.shipState.value;
		var shipZip = form.shipZip.value;
		var shipCountry = form.shipCountry.value;
		var shipPhone = form.shipPhone.value;
				
		//***********************
		//*** OPTIONAL FIELDS ***
		//***********************
		try {var shipCompany = form.shipCompany.value;} catch(e) {}
		try {var shipFax = form.shipFax.value;} catch(e) {}
		
		//**********************************************************
		//****** POPULATE BILLING FIELDS WITH SHIPPING DATA ********
		//**********************************************************
		form.billFirstName.value = shipFirstName;
		form.billLastName.value = shipLastName;
		form.billAddress1.value = shipAddress1;
		form.billAddress2.value = shipAddress2;
		form.billCity.value = shipCity;
		form.billState.value = shipState;
		form.billZip.value = shipZip;
		form.billCountry.value = shipCountry;
		form.billPhone.value = shipPhone;
		
		//***********************
		//*** OPTIONAL FIELDS ***
		//***********************
		try {form.billCompany.value = shipCompany;} catch(e) {}
		try {form.billFax.value = shipFax;} catch(e) {}

	} else {

		//**********************************************************
		//******************* RESET BILLING DATA *******************
		//**********************************************************
		try {form.billCompany.value = "";} catch(e) {}
		form.billFirstName.value = "";
		form.billLastName.value = "";
		form.billAddress1.value = "";
		form.billAddress2.value = "";
		form.billCity.value = "";
		form.billState.value = "";       
		form.billZip.value = "";
		form.billCountry.value = "US";
		form.billPhone.value = "";
		
		//***********************
		//*** OPTIONAL FIELDS ***
		//***********************
		try {form.billCompany.value = "";} catch(e) {}
		try {form.billFax.value = "";} catch(e) {}
	}
}

function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
function pdIsMobileDevice() {
	var isMobile = false;
	var signatureList = new Array('iphone', 'ipod', 'android', 'palm', 'blackberry', 'devices60', 'devicesymbian', 'windows ce', 'opera mini', 'webos', 'windows phone', 'playbook');
	var agent = navigator.userAgent.toLowerCase();
	for(var i=0;i<signatureList.length;i++) {
		if(agent.indexOf(signatureList[i]) > -1) {
			if(signatureList[i] == 'android') {	//*** ONLY CONSIDER android a mobile device if "mobile" is also present in user agent string
				if(agent.indexOf("mobile") > -1) isMobile = true;
			} else {
			 	isMobile = true;
			}
		}
	}
	return isMobile;
}
function pdIsIpad() {
	var isIpad = false;
	var signatureList = new Array('ipad');
	var agent = navigator.userAgent.toLowerCase();
	for(var i=0;i<signatureList.length;i++) {
		if(agent.indexOf(signatureList[i]) > -1) isIpad = true;
	}
	return isIpad;
}
function pdIsTablet() {
	var isTablet = false;
	var signatureList = new Array('ipad', 'android');
	var agent = navigator.userAgent.toLowerCase();
	for(var i=0;i<signatureList.length;i++) {
		if(agent.indexOf(signatureList[i]) > -1) {
			isTablet = true;	//*** ASSUME TABLET
			if(signatureList[i] == 'android') {	//*** ONLY CONSIDER android a mobile device if "mobile" is also present in user agent string
				if(agent.indexOf("mobile") > -1) isTablet = false;
			} else {
			 	isTablet = true;
			}
		}
	}
	return isTablet;
}

/*	pdGetElementsByClassName -- Revised to avoid JS conflicts with libraries that override native "getElementsByClassName" browser function in IE
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/	
var pdGetElementsByClassName = function (className, tag, elm){
	var ieVersion = getInternetExplorerVersion();
	if (ieVersion == -1 && document.getElementsByClassName) {
		pdGetElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		pdGetElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		pdGetElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return pdGetElementsByClassName(className, tag, elm);
};
function pdHideForLoggedInUser() {
	var hideList = pdGetElementsByClassName("pdHideForLoggedInUser", null);
	for(var i=0;i<hideList.length;i++) {
		hideList[i].style.display = "none";	
	}
	return false;
}
function pdShowForLoggedInUser() {
	var showList = pdGetElementsByClassName("pdShowForLoggedInUser", null);
	var displayType = "block";
	for(var i=0;i<showList.length;i++) {
		if(showList[i].nodeName == "TR") displayType = "table-row";
		else if(showList[i].nodeName == "SPAN") displayType = "inline";
		else displayType = "block";
		showList[i].style.display = displayType;
	}
	return false;
}
function pdHideForDiscountedUser() {
	var hideList = pdGetElementsByClassName("pdHideForDiscountedUser", null);
	for(var i=0;i<hideList.length;i++) {
		hideList[i].style.display = "none";	
	}
	return false;
}
function pdShowForDiscountedUser() {
	var showList = pdGetElementsByClassName("pdShowForDiscountedUser", null);
	var displayType = "block";
	for(var i=0;i<showList.length;i++) {
		if(showList[i].nodeName == "TR") displayType = "table-row";
		else if(showList[i].nodeName == "SPAN") displayType = "inline";
		else displayType = "block";
		showList[i].style.display = displayType;
	}
	return false;
}
function pdHideForWholesale() {
	var hideList = pdGetElementsByClassName("pdHideForWholesale", null);
	for(var i=0;i<hideList.length;i++) {
		hideList[i].className = "pdHide";	//*** DEPRECATED
		hideList[i].style.display = "none";
	}
	hideList = pdGetElementsByClassName("pdHideFromWholesale", null);	//*** LEGACY SUPPORT (DEPRECATED)
	for(var i=0;i<hideList.length;i++) {
		hideList[i].className = "pdHide";	//*** DEPRECATED
		hideList[i].style.display = "none";
	}
	return false;
}
function pdShowForWholesale() {
	var showList = pdGetElementsByClassName("pdShowForWholesale", null);
	var displayType = "block";
	for(var i=0;i<showList.length;i++) {
		if(showList[i].nodeName == "TR") displayType = "table-row";
		else if(showList[i].nodeName == "SPAN") displayType = "inline";
		else displayType = "block";
		showList[i].style.display = displayType;
	}
	return false;
}
function pdShowHideForWholesale() {
	var pdUserInfoCookie = pdGetCookie("pdUserInfo", null);
	if(!isBlank(pdUserInfoCookie)) {		
		var elements = String(pdUserInfoCookie).split("|");
		var isWholesaleUserApproved = elements[4];
		if(isWholesaleUserApproved == "true") {
			pdHideForWholesale();
			pdShowForWholesale();
		}
	}
}
function pdShowHideForLoggedInUser() {
	var pdUserInfoCookie = pdGetCookie("pdUserInfo", null);
	if(!isBlank(pdUserInfoCookie)) {		
		pdShowForLoggedInUser();
		pdHideForLoggedInUser();
	}
}
function pdShowHideForDiscountedUser() {
	var pdUserInfoCookie = pdGetCookie("pdUserInfo", null);
	if(!isBlank(pdUserInfoCookie)) {		
		var elements = String(pdUserInfoCookie).split("|");
		var userHasDiscounts = elements[5];
		if(userHasDiscounts == "true") {
			pdHideForDiscountedUser();
			pdShowForDiscountedUser();
		}
	}
}

//**** START DEPRECATED FUNCTIONS
function pdHideFromWholesale() {
	pdHideForWholesale();
}
function pdShowHideFromWholesale() {	
	pdShowHideForWholesale();
}
//**** END DEPRECATED FUNCTIONS

function pdPreventDefaultAction(evt) { 
	if (evt) { 
		if (typeof evt.preventDefault!= 'undefined') evt.preventDefault(); // W3C 
		else evt.returnValue = false; // IE 
	}
	return false;	//*** FALLBACK
}
function getUrl(method, url, data) {
	var cacheBuster = (new Date()).getTime();
	if(url.indexOf("?") > -1) url += "&cb=" + cacheBuster;
	else url += "?cb=" + cacheBuster;
	try {
		var xmlhttp = new XMLHttpRequest();
	} catch(e) {
		var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");	//*** IE 6
	}	
	xmlhttp.open(method, url, false);
	xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xmlhttp.send(data);
	var responseText = String(xmlhttp.responseText);
	xmlhttp = null;
	return responseText;
}
//**** setPromoCookie pulled from registry globalScript.js ****
function setPromoCookie(c_name,value,expiredays){
	var exdate = new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
function pdFormatCurrency(num, includeDollarSign) {
	num = num.toString().replace(/\$|\,/g,'');
	if(isNaN(num))
	num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	cents = num%100;
	num = Math.floor(num/100).toString();
	if(cents<10)
	cents = "0" + cents;
	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	num = num.substring(0,num.length-(4*i+3))+','+
	num.substring(num.length-(4*i+3));	
	var returnValue = (((sign)?'':'-') + num + '.' + cents);
	if(includeDollarSign == true) returnValue = "$" + returnValue;	
	return returnValue;
}
function pdFindParentForm(element) {
    var elm,parentForm;
    for (elm = element.parentNode; elm; elm = elm.parentNode) {
        if(elm.tagName.toLowerCase() == "form") {
        	parentForm = elm;
        	break;
        }
    }
	return parentForm;
}
function pdIsLoggedIn() {
	var pdUserInfoCookie = pdGetCookie("pdUserInfo", null);
	if(!isBlank(pdUserInfoCookie)) return true;
	else return false;
}