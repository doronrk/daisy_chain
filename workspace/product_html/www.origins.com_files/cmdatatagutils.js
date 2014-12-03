<!--
/*
 * cmdatatagutils.js 
 * $Id: cmdatatagutils-sku-10032260-MultiClient-091310.txt 155296 2010-09-13 18:15:33Z abrink $
 *
 * Version 4.1.0
 *
 * Coremetrics Tag v4.0, 4/18/2004
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *
 * MODIFICATION HISTORY:
 * DATE		PERSON      NOTES
 * --------	-----------	----------------------------------------------------
 * 07/23/08	H.White		New maketag multi client id Library
 * 08/27/08	W.Bird		Corrected element tag	
 * 03/11/09	H.White		Adding cm_vc parameter
 * 05/27/10	A.Brink		Provision IO and IA
 * 07/06/10	A.Brink		Provision IA only
 * 09/08/10 A.Brink		Convert * to ^ in cm_mmc params
 *
 * NOTE: Client is taking responsibility for setting variables cm_ClientID and cm_HOST
 *
 */

var cm_exAttr=new Array;  

if (!cm_JSFEnabled) {
	var cm_JSFEnabled = false;
}

var cmJv = "1.0";
if (typeof(isNaN) == "function") cmJv = "1.1";
if (typeof(isFinite) == "function") cmJv = "1.2";
if (typeof(NaN) == "number") cmJv = "1.3";
if (typeof(decodeURI) == "function") cmJv = "1.5";
if (typeof(Array.forEach) == "function") cmJv = "1.6";
if (typeof(Iterator) == "object") cmJv = "1.7";

var cmCheckCMEMFlag = true;
  
/* TAG GENERATING FUNCTIONS */

function cmCreateManualImpressionTag(pageID, trackSP, trackRE) {
		// insert code to get pageID from cmTagControl if pageID is null
		cmMakeTag(["tid","9","pi",pageID,"cm_sp",trackSP,"cm_re",trackRE,"st",cm_ClientTS]);
}

function cmCreateManualLinkClickTag(href,name,pageID) {	
	if (cmCreateLinkTag == null && cM != null) {
		var cmCreateLinkTag = cM;
	}
	if (cmCreateLinkTag != null) {		
		var dt = new Date();
		cmLnkT3 = dt.getTime();
		href=cG7.normalizeURL(href,true);
		cmCreateLinkTag(cm_ClientTS, cmLnkT3, name, href, false, pageID);
	}
}

/* manual PageviewTag for off site page tagging.  Allows client to supply URL and Referring URL
*/
function cmCreateManualPageviewTag(pageID, categoryID,DestinationURL,ReferringURL) {
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"ul",DestinationURL,"rf",ReferringURL]);
}

function cmCreatePageElementTag(elementID, elementCategory,attributes) {
    return;
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
    elementID = (elementID||'').substr(0,49);
    elementCategory = (elementCategory||'').substr(0,49);
	cmMakeTag(["tid","15","eid",elementID,"ecat",elementCategory,"pflg","0","cm_exAttr",cm_exAttr]);
}

/*
 * Creates a Tech Props tag.
 * pageID		: required. Page ID to set on this Pageview tag
 */
function cmCreateTechPropsTag(pageID, categoryID,attributes) {
	if(pageID == null) { pageID = cmGetDefaultPageID(); }
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}	
	cmMakeTag(["tid","6","pi",pageID,"cg",categoryID,"pc","Y","cm_exAttr",cm_exAttr]);
}

/*
 * Creates a Pageview tag with the given Page ID
 *
 * pageID		: required. Page ID to set on this Pageview tag
 * categoryID	: optional. Category ID to set on this Pageview tag
 * searchString	: optional. Internal search string enterred by user to reach
 *				  this page.
 *
 * 
 */
function cmCreatePageviewTag(pageID,  searchString, categoryID,searchResults,attributes) {
    return;
	if (pageID == null) { pageID = cmGetDefaultPageID(); }
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}	
	cmMakeTag(["tid","1","pi",pageID,"cg",categoryID,"se",searchString,"sr",searchResults,"cm_exAttr",cm_exAttr]);
}

/*
 * Creates a Pageview tag with the default value for Page ID. 
 * Format of Page ID is "x/y/z/MyPage.asp"
 *
 * 
 */
function cmCreateDefaultPageviewTag(categoryID) {
	cmCreatePageviewTag(cmGetDefaultPageID(), null, categoryID);
}

/*
 * Creates a Productview Tag
 * Also creates a Pageview Tag by setting pc="Y"
 * Format of Page ID is "PRODUCT: <Product Name> (<Product ID>)"
 *
 * productID	: required. Product ID to set on this Productview tag
 * productName	: required. Product Name to set on this Productview tag
 * categoryID	: optional. Category ID to set on this Productview tag 
 *
 * 
 */
function cmCreateProductviewTag(productID, productName, categoryID,attributes,isPage,cmVC) {
    return;
	if(!cmVC){
		cmVC=cmExtractParameter("cm_vc",document.location.href);
	}
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	if (!isPage){
		var isPage="N";
	}
	if (isPage!="Y"){
		isPage="N";
	}
	cmMakeTag(["tid","5","pi","PRODUCT: "+productName+" ("+productID+")","pr",productID,"pm",productName,"cg",categoryID,"pc",isPage,"cm_vc",cmVC,"cm_exAttr",cm_exAttr]);
}


/*
 * Variables and Arrays to support Lineitem Aggregation
 */
var __sArray = new Array();
var __skuString = "";
var __ex=new Array();
var __skuArray=new Array();
						
function __cmGetPIPC(__pr,__cg) {
	var __pI, i;
	var cmAttr1=new Array();
	var cmAttr2=new Array();
	for (i=0;i<__ex.length;++i){
		cmAttr1=cmAttr1+__ex[i];
	}		
	for (__pI = 0; __pI < __sArray.length; ++__pI) {
		if (__ex.length>0){
			cmAttr2=new Array();		
			for (i=__sArray[__pI].length-__ex.length*2+1;i<__sArray[__pI].length;i=i+2){
				cmAttr2=cmAttr2+__sArray[__pI][i];
			}
	
			if (__pr == __sArray[__pI][1] && __cg == __sArray[__pI][9] && cmAttr1==cmAttr2){
				return __pI;
			}
		} else {
		if (__pr == __sArray[__pI][1] && __cg == __sArray[__pI][9]) return __pI;
	}
	}	
	return -1;
}

function __cmGetPIPCsku(__pr,__cg) {
	var __pI;
	for (__pI = 0; __pI < __skuArray.length; ++__pI) {
		if (__pr == __skuArray[__pI][1] && __cg == __skuArray[__pI][9]) return __pI;
	}
	return -1;
}

function cmAddShop(__v) {
	var __i = __cmGetPIPC(__v[1],__v[9]);
	if (__i == -1) {
		if (__ex.length>0){
			for (i=0; i<__ex.length; ++i){
				__v[__v.length]="s_a"+(i+1);
				__v[__v.length]=__ex[i];
			}
		}
		__sArray[__sArray.length] = __v;
	}
	else {
		var __oQ = __sArray[__i][5];
		var __oP = __sArray[__i][7];
		__sArray[__i][5] = parseInt(__sArray[__i][5]) + parseInt(__v[5]);
		__sArray[__i][7] = (((__v[7]*__v[5])+(__oP*__oQ))/__sArray[__i][5]);
	}
}

function cmAddSku(__v) {
	var __i = __cmGetPIPCsku(__v[1],__v[9]);
	if (__i == -1) {
		__skuArray[__skuArray.length] = __v;
	}
	else {
		var __oQ = __skuArray[__i][5];
		var __oP = __skuArray[__i][7];
		__skuArray[__i][5] = parseInt(__skuArray[__i][5]) + parseInt(__v[5]);
		__skuArray[__i][7] = (((__v[7]*__v[5])+(__oP*__oQ))/__skuArray[__i][5]);

	}
}

/*
 * Creates a Shop tag with Action 5 (Shopping Cart)
 *
 * productID	: required. Product ID to set on this Shop tag
 * quantity	: required. Quantity to set on this Shop tag
 * productPrice	: required. Price of one unit of this product
 * categoryID	: optional. Category to set on this Shop tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateShopAction5Tag( productID, productName,sku,skuName,productQuantity,productPrice,categoryID,attributes) {	
    var pattern = /[^\-0-9\.]/gi;
    productPrice = productPrice.toString().replace(pattern, "");
	var cm_slotNum;
	if (attributes){
		__ex=attributes.split("-_-");	
		} else {
	__ex=new Array();
	}													
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"sn",cm_slotNum,"at","5","tid","4","pc","N"]);
	cmAddSku(["ps1",sku,"ps2",skuName,"ps3",productQuantity,"ps4",productPrice,"ps5",categoryID,"ps6",null,"ps7",productID,"li","5","tid","7","pc","N"]);
}

/* render the aggregated cart lineitems with Shop 5 tags*/
function cmDisplayShop5s(){
	cmDisplayShops();
}
/*
 * Creates a Shop tag with Action 9 (Order Receipt / Confirmed)
 *
 * productID	: required. Product ID to set on this Shop tag
 * productName	: required. Product Name to set on this Shop tag
 * quantity	: required. Quantity to set on this Shop tag
 * productPrice	: required. Price of one unit of this product
 * customerID	: required. ID of customer making the purchase
 * orderID	: required. ID of order this lineitem belongs to
 * orderTotal	: required. Total price of order this lineitem belongs to
 * categoryID	: optional. Category to set on this Shop tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateShopAction9Tag( productID, productName, sku, skuName, productQuantity, productPrice, customerID, orderID, orderTotal, categoryID,attributes) {
	var cm_slotNum;
	var pattern = /[^\-0-9\.]/gi;
	var pattern1 = /^\s+|\s+$/gi;
	productPrice = productPrice.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	productID = productID.toString().replace(pattern1, "");
	if (attributes){
		__ex=attributes.split("-_-");
	} else {
	__ex=new Array();
	}
	
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"sn",cm_slotNum,"cd",customerID,"on",orderID,"tr",orderTotal,"at","9","tid","4","pc","N"]);
	cmAddSku(["ps1",sku,"ps2",skuName,"ps3",productQuantity,"ps4",productPrice,"ps5",categoryID,"ps6",orderID,"ps7",productID,"li","9","tid","7","pc","N"]);
	cmCalcSKUString();

}

/* render the aggregated order lineitems with Shop 9 tags*/
function cmDisplayShop9s(){
	cmCalcSKUString();
	cmDisplayShops();
}

function cmDisplayShops() {
	var rt=new Date();
	var connector = rt.getTime()%10000000;
	var i;
	for (i = 0; i < __sArray.length; ++i) {
		for (l=0;l<__sArray[i].length;++l){
			if (__sArray[i][l]=="sn"){
				__sArray[i][l+1]=i.toString();
			}
		}
		cmMakeTag(__sArray[i]);
	}
	__sArray = new Array();
	var i;
	for (i = 0; i < __skuArray.length; ++i) {
		for (l=0;l<__skuArray[i].length;++l){
			if (__skuArray[i][l]=="sn"){
				__skuArray[i][l+1]=i.toString();
			}
		}
		__skuArray[i][__skuArray[i].length]="ps8";
		__skuArray[i][__skuArray[i].length]=connector;
		cmMakeTag(__skuArray[i]);
	}
	__skuArray = new Array();
}

function cmCalcSKUString() {
	__skuString = "";
	var __skuStringArray = new Array();
	for (i = 0; i < __sArray.length; ++i) {
		// aggregate
		var __skuStringArrayIndex = -1;
		for (y = 0; y < __skuStringArray.length; ++y) {
			if (__sArray[i][1] == __skuStringArray[y][0] ) {
				__skuStringArrayIndex = y;
			}
		}
		if (__skuStringArrayIndex == -1) {
			// it doesn't exist, so add it
			var newArrayIndex = __skuStringArray.length;
			__skuStringArray[newArrayIndex] = new Array();
			__skuStringArray[newArrayIndex][0] = __sArray[i][1];
			__skuStringArray[newArrayIndex][1] = __sArray[i][7];
			__skuStringArray[newArrayIndex][2] = __sArray[i][5];
		}
		else {
			// it exists, so update it
			var __oP = __skuStringArray[__skuStringArrayIndex][1];
			var __oQ = __skuStringArray[__skuStringArrayIndex][2];
			__skuStringArray[__skuStringArrayIndex][2] = parseInt(__sArray[i][5]) + __oQ;
			__skuStringArray[__skuStringArrayIndex][1] = (__oP*__oQ+__sArray[i][7]*__sArray[i][5])/(parseInt(__sArray[i][5])+parseInt(__oQ));
		}
	}
	for (var x = 0; x < __skuStringArray.length; ++x) {
		__skuString += "|"+__skuStringArray[x][0]+"|"+__skuStringArray[x][1]+"|"+__skuStringArray[x][2]+"|";
	}
}

/*
 * Creates an Order tag
 *
 * orderID			: required. Order ID of this order
 * orderTotal		: required. Total of this order (minus tax and shipping)
 * orderShipping	: required. Shipping charge for this order
 * customerID		: required. Customer ID that placed this order
 * customerCity		: optional. City of Customer that placed this order
 * customerState	: optional. State of Customer that placed this order
 * customerZIP		: optional. Zipcode of Customer that placed this order
 *
 */
function cmCreateOrderTag(orderID,orderTotal,orderShipping,customerID,customerCity,customerState,customerZIP,attributes) {
	var pattern = /[^\-0-9\.]/gi;
    orderShipping = orderShipping.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}	
	cmMakeTag(["tid","3","osk",__skuString,"on",orderID,"tr",orderTotal,"sg",orderShipping,"cd",customerID,"ct",customerCity,"sa",customerState,"zp",customerZIP,"cm_exAttr",cm_exAttr]);
	__skuString = "";
}

/*
 * Creates a Conversion Event tag
 *
 * eventID			: required. Conversion event ID
 * actionType		: required. 1=conversion initiation, 2=conversion completion
 * categoryID		: optional. Category for the event
 * points			: optional. Point value to assign to conversion.
 */
 function cmCreateConversionEventTag(eventID, actionType, categoryID, points,attributes) {
    return;
 	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","14","cid",eventID,"cat",actionType,"ccid",categoryID,"cpt",points,"cm_exAttr",cm_exAttr]);
}

/*
 * Creates a Registration tag and/or a Newsletter tag
 *
 * customerID		: required for Registration. ID of Customer to register.
 * customerEmail	: required for Newsletters. Optional for Registration.
 * customerCity		: optional. City of Customer that placed this order
 * customerState	: optional. State of Customer that placed this order
 * customerZIP		: optional. Zipcode of Customer that placed this order
 * newsletterName	: required for Newsletters. The name of the Newsletter.
 * subscribe		: required for Newsletters. Either "Y" or "N"
 *
 */
function cmCreateRegistrationTag( customerID		// Required VARCHAR2(256) 
						, customerEmail		// Optional VARCHAR2(256)
						, customerCity		// Optional VARCHAR2(256)
						, customerState		// Optional VARCHAR2(256)
						, customerZIP		// Optional VARCHAR2(256)
						, newsletterName	// Optional VARCHAR2(256) 
						, subscribe			// Optional CHAR(1)	--> Y or N
						, country			// Optional VARCHAR2(256)
						, firstName			// Optional VARCHAR2(256)
						, age				// Optional NUMBER(3)
						, gender			// Optional CHAR(1) --> M or F
						, minIncome			// Optional NUMBER(14,2)
						, maxIncome			// Optional NUMBER(14,2)
						, educationLevel	// Optional VARCHAR2(256)
						, extraField1		// Optional VARCHAR2(100)
						, extraField2		// Optional VARCHAR2(100)
						, extraField3		// Optional VARCHAR2(100)
						, extraField4		// Optional VARCHAR2(100)
						, extraField5		// Optional VARCHAR2(100)
						) {
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"nl",newsletterName,"sd",subscribe,"cy",country,"fn",firstName,"ag",age,"gd",gender,"ml",minIncome,"xl",maxIncome,"ed",educationLevel,"rg11",extraField1,"rg12",extraField2,"rg13",extraField3,"rg14",extraField4,"rg15",extraField5]);

}

/* Creates an Error Tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateErrorTag(pageID, categoryID) {
	if(pageID == null) {
		pageID = cmGetDefaultPageID();
	}
	cmMakeTag(["tid","404","pi",pageID,"cg",categoryID,"pc","Y"]);
}

function cmMakeTag(__v) {
	var cm = new _cm("vn2", "e4.0");
	var i;
	for (i = 0; i < __v.length; i += 2) {
		var _n = __v[i];
		var _v = __v[i + 1];
		cm[_n] = _v;
	}
	
	var datestamp = new Date();	
	var stamp = (Math.floor(Math.random() * 11111111)) + datestamp.valueOf();	
	cm.rnd = stamp;
	
	if (cm.tid == "6") {
		cm.addTP();
		document.cookie = "cmTPSet=Y; path=/";
	}

	if (cm.tid == "1") {
		if (cI("cmTPSet") != 'Y') {
			cm.tid = "6";
			cm.pc = "Y";
			cm.addTP();
			document.cookie = "cmTPSet=Y; path=/";
		}
	}

	if (cm.tid != "4" && typeof(cm.cm_exAttr)!="undefined"){
		switch(cm.tid){
			case "6":
				prefix="pv";
				break;
			case "1":
				prefix="pv";
				break;
			case "5":
				prefix="pr";
				break;
			case "3":
				prefix="o";
				break;
			case "14":
				prefix="c";
				break;
			case "15":
				prefix="e";
				break;
			default:
				break;
		}		
		var attrNum=cm.cm_exAttr.length;
		if (attrNum>15){
			attrNum=15;
		}
		for (i=0;i<attrNum;i++){
			Attval=prefix+"_a"+(i+1);
			cm[Attval]=cm.cm_exAttr[i];
		}
		cm.cm_exAttr=null;
	}	
	if ((cm.pi == null) && (cm.pc == "Y")) {
		cm.pi = cmGetDefaultPageID();
	}

	try{
	if (parent.cm_ref != null) {
		cm.rf = parent.cm_ref;
			if (cm.pc == "Y") {
		parent.cm_ref = document.URL;
	}
		}
	
		// if parent had mmc variables and this is the first pageview, add mmc to this url
		if(parent.cm_set_mmc) {
			cm.ul = document.location.href + 
					((document.location.href.indexOf("?") < 0) ? "?" : "&") + 
					parent.cm_mmc_params; 
			if (cm.pc == "Y") {
				parent.cm_ref = cm.ul;
				parent.cm_set_mmc = false;
			}
		}
	}
	catch(err){}

	if (cm.ul == null) {
		cm.ul = window.location.href;
	}

	//check for zero price and zero quantity
	cmSafeZero(cm,["qt","bp","tr","sg"]);

	//check for manual_cm_mmc parameter;
	if (this.manual_cm_mmc != null) {
		cm.ul = cm.ul + ((cm.ul.indexOf("&") == -1) ? ((cm.ul.indexOf("?") == -1) ? "?" : "&") : "&") + "cm_mmc=" + this.manual_cm_mmc;
	}
	if (this.cm_manualMMC != null) {
		cm.ul = cm.ul + ((cm.ul.indexOf("&") == -1) ? ((cm.ul.indexOf("?") == -1) ? "?" : "&") : "&") + this.cm_manualMMC;
	}

	// convert MMC parameters to lowercase;
	cm.ul = cm.ul.replace(/cm_mmc/gi,"cm_mmc");
	cm.ul = cm.ul.replace(/cm_ven/gi,"cm_ven");
	cm.ul = cm.ul.replace(/cm_cat/gi,"cm_cat");
	cm.ul = cm.ul.replace(/cm_pla/gi,"cm_pla");
	cm.ul = cm.ul.replace(/cm_ite/gi,"cm_ite");
	
	// convert legacy astericks to carats
	cmLegacyIgnore(cm);

	if (cmCheckCMEMFlag){cmStartTagSet();}
	cm.writeImg();
	if (cmCheckCMEMFlag) {
		cmCheckCMEM();
		cmCheckCMEMFlag = false;
		cmSendTagSet();		
	}
}

// HELPER FUNCTIONS -----------------------------------------------------------
/* These functions are used by the tag-generating functions and/or may be used
 * in in general as convenience functions
 */

/*
 * Creates an acceptable default Page ID value to use for Pageview tags.
 * The default Page ID is based on the URL, and consists of the path and
 * filename (without the protocol, domain and query string).
 * 
 * example:
 * returns "x/y/MyPage.asp" for the URL http://www.mysite.com/x/y/MyPage.asp
 */
function cmGetDefaultPageID() { 
	var pageName = window.location.pathname; 

	// eliminates everything after "?" (for Opera browswers)
	var tempIndex1 = pageName.indexOf("?");
	if (tempIndex1 != -1) {
		pageName = pageName.substr(0, tempIndex1);
	}
	// eliminates everything after "#" (for Opera browswers)
	var tempIndex2 = pageName.indexOf("#");
	if (tempIndex2 != -1) {
		pageName = pageName.substr(0, tempIndex2);
	}
	// eliminates everything after ";"
	var tempIndex3 = pageName.indexOf(";");
	if (tempIndex3 != -1) {
		pageName = pageName.substr(0, tempIndex3);
	}

	var slashPos = pageName.lastIndexOf("/");
	if (slashPos == pageName.length - 1) {
		pageName = pageName + "default.asp"; /****************** SET TO DEFAULT DOC NAME */
	}

	while (pageName.indexOf("/") == 0) {
		pageName = pageName.substr(1,pageName.length);
	}

	return(pageName); 
} 

function cmIndexOfParameter (parameter, inString) {
	return inString.indexOf(parameter);
}

function cmExtractParameter (parameter, inString) {
    if (cmIndexOfParameter(parameter, inString) == -1) {
        return null;
    }
	var s = inString;
	var begin = s.indexOf(parameter);
	var end = s.indexOf("&", begin);
	if (end == -1) {
		end = s.length;
	}
	var middle = s.indexOf("=", begin);
	return s.substring(middle + 1, end);
}

function cmRemoveParameter (parameter, inString) {
    if (cmIndexOfParameter(parameter, inString) == -1) {
        return inString;
    }
	var s = inString;
	var begin = s.indexOf(parameter);
	var start = (begin - 1);
	var end = s.indexOf("&", begin);
	if (end == -1) {
		end = s.length;
	}
	if (s.substring(start, begin) == "?") {    // retain leading "?"
		start = (start + 1);
		end = (end + 1);
	}
	return s.substring(0, start) + s.substring(end, s.length);
}

function cmCheckCMEM() {
	if (cmIndexOfParameter("cm_em",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_em",document.location.href);
		if (emailAddress.indexOf(":")>-1){
			emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
		}
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
	if (cmIndexOfParameter("cm_lm",document.location.href) != -1){
		var emailAddress = cmExtractParameter("cm_lm",document.location.href);
		if (emailAddress.indexOf(":")>-1){
			emailAddress=emailAddress.substring(emailAddress.indexOf(":")+1);
		}		
		cmCreateRegistrationTag(emailAddress,emailAddress);
	}
}

function cmSafeZero(cm, checkArray) {
	// put logic here to convert number 0 to string "0"
	for (var i = 0; i < checkArray.length; ++i) {
		if ((cm[checkArray[i]] != null) && (cm[checkArray[i]] == 0)) {
			cm[checkArray[i]] = "0";
		}
	}
}

if (defaultNormalize == null) { var defaultNormalize = null; }

function myNormalizeURL(url, isHref) {
    var newURL = url;
    
    if (isHref) {
	    var blackList = ["cartid="];
	    var paramString;
	    var paramIndex = newURL.indexOf("?");
	    var params;
	    var keepParams = new Array();
	    var goodParam;
	
	    if (paramIndex > 0) {
		paramString = newURL.substring(paramIndex+1);
		newURL = newURL.substring(0, paramIndex);
		params = paramString.split("&");
	
		for(var i=0; i<params.length; i++) {
			goodParam = true;
			for(var j=0; j<blackList.length; j++) {
			//This match is case insensitive.  Remove .toLowerCase() to add case sensitivity
				if (params[i].toLowerCase().indexOf(blackList[j].toLowerCase()) == 0) {
					goodParam = false;
				}
			}
			if(goodParam == true) {
				keepParams[keepParams.length] = params[i];
			}
		}
		
		newURL += "?" + keepParams.join("&");
	
	    }
	 
	    if (defaultNormalize != null) {
	        newURL = defaultNormalize(newURL, isHref);
	    }
	}	
    return newURL;
}

// install normalization
if (document.cmTagCtl != null) {
    var func = "" + document.cmTagCtl.normalizeURL;
    if (func.indexOf('myNormalizeURL') == -1) {
        defaultNormalize = document.cmTagCtl.normalizeURL;
        document.cmTagCtl.normalizeURL = myNormalizeURL;
    }
}

function decodeCustomerID(customerID) 
{
  return parseInt("0x"+customerID)-100000000;
}

function cmLegacyIgnore(cm) {
	if (cmIndexOfParameter("cm_mmc",cm.ul) != -1){
		var mmcString = cmExtractParameter("cm_mmc",cm.ul);
		var params = mmcString.split("-_-");
		if (params.length == 4)
		{
			mmcString = "cm_mmc=";
			for (var i = 0; i < 4; ++i) {
				params[i] = params[i].replace(/[*]/g,"^");
				mmcString = mmcString + params[i] + ((i<3) ? "-_-" : "");
			}
			cm.ul = cmRemoveParameter("cm_mmc",cm.ul);
			cm.ul = cmRemoveParameter("cm_mmc",cm.ul) + ((cm.ul.indexOf("?") < 0) ? "?" : "&") + mmcString;
		}
	}
}

//-->
