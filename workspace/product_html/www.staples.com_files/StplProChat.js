<!--
// Author. EGuner. 2011-05-10. 
// 
// CHANGES
// DATE       Who     What
// 2013-12-17 EGuner	We no longer call the Moxie for Sales Conversion unless the AgentCookie exists. erdalg at gunerservices dot com
// 2014-01-21 EGuner	Return only for staples.com. staples.ca cannot read cookie from staples.com domain for AgentSales as it is only created for .com.
// ----------------------------------------------------------------------------
// Define variables here. 
// 
// CAUTION: These variables will be GLOBAL! 
// ----------------------------------------------------------------------------

	varPCMoxieTalCustDelim="#:Prop!";
	
	talCustProp="SalesValue=0.00"; // only for Moxie anyways! 

	varPCWhiteSpacePtrn = /\s+/; // One or more white-space. 
	varPCBeginEndTrimPattern="/^\\s+|\\s+$/g"; // TODO Use this instead of the direct patterns below. 
	
	varPCChatPageList = "";
	varPCChatPageIndexList = new Array(); // HOLDS THE INDICES FOR THE PAGE LIST. 
	varPCChatVarList = "";
	varPCChatVarRenameList = "";
	varPCChatVarOverrideList = "";
	//chatVarFunctionList = "";
	varPCChatVarIndexList=new Array(); // HOLDS THE INDICES FOR THE CHAT VAR LIST. 
	varPCJSPageList = "";

	// -----------------------------------------------------------------
	// All these varibles will be filled out in the 
	// common JS page function fnPCFetchTheLastElementsForFetchedVars().
	// These variables MUST exist in the variable lists
	// in the integration...properties 
	// -----------------------------------------------------------------
	tagJSessId='';
	tagCustId='';
	tagCustTier='';
	tagCartCnt='';
	tagSalesVal='';

	//varPCJSPrePageList = ""; // NOT USED! FOR FUTURE. 
	//varPCJSPrePageIndexList = new Array(); // HOLDS THE INDICES FOR THE PAGE LIST.  NOT USED! FOR FUTURE.

// ----------------------------------------------------------------------------
// Define NON-page functions here. These functions will be GLOBAL so you can 
// use them in your tag. 
// 
// Do NOT use this portion for any custom tag data collection which will be 
// put into integration properties to be picked up by the tag. 
//
// Please use the next section of functions for this purpose. 
// Search for "PAGE BASED" to get there. 
// ----------------------------------------------------------------------------

	// -----------------------------------------------------------------------
	// Returns true if the variable is defined in the page context. 
	// -----------------------------------------------------------------------
	function fnPCIsVariableDefined(variablename)
	{
		return !(typeof(window[variablename]) == "undefined");
	}

	// -----------------------------------------------------------------------
	// Returns true if the function is defined in the page context. 
	// -----------------------------------------------------------------------
	function fnPCIsFunctionDefined(functionname)
	{
		return (typeof(window[functionname]) == "function");
	}

	// -----------------------------------------------------------------------
	// Removes the Moxie proactive chat talCustProp delimter pattern from
	// strings if there is any. The delimiter is set to be: #:Prop!
	// -----------------------------------------------------------------------
	function fnPCRemoveUnwanted(str, pattern) {
		if (str == 'undefined' || str == null) {
			return "";
		}
		str="" + str;
		//--JustForTesting-DoNotUse-alert("REMOVING -> " + str);
		if (pattern == 'undefined' || pattern == null) {
			str=str.replace(/#:Prop!/g," ");
		} else {
			str=str.replace(pattern,' ');
		}
		return str;
	}
	
	
	// -----------------------------------------------------------------------
	// This function handles the addition or replacement of an NVP
	// (Name Value Pair) within a String delimited by delimiter. 
	// -----------------------------------------------------------------------
	function fnPCAddReplaceDelimitedNVPs(existingStrParam, nameParam, valParam, delimiter) {
		if (arguments.length < 4) {
			//--JustForTesting-DoNotUse-alert('Send in all the params please!');
			return;
		}
		// As we assumed that the NVPs are assigned with = (equal) sign.
		// Why can't we assume the delimiter will be semicolon? 
		var pos1=existingStrParam.indexOf(nameParam+"=");
		var pos2=-1;
		if (pos1 > -1) {
			pos2=existingStrParam.indexOf(delimiter,pos1);
			var ch=delimiter;
			if (pos2==-1) {
				ch="";
				pos2=existingStrParam.length;
			} 
			var strToReplace= "/" + existingStrParam.substring(pos1,pos2+ch.length) + "/g"; //str1.replace (/,/g, "");
			//--JustForTesting-DoNotUse-alert(strToReplace);
			existingStrParam=existingStrParam.replace(existingStrParam.substring(pos1,pos2+ch.length), "");
		} 
		if (existingStrParam.length > 3) {
			delPos=existingStrParam.lastIndexOf(delimiter);
			if (delPos == -1 || (existingStrParam.length - delimiter.length) != delPos) {
				existingStrParam = existingStrParam + delimiter;
			}
		}
		existingStrParam = existingStrParam + nameParam + "=" + fnPCRemoveUnwanted(valParam);
		existingStrParam=existingStrParam.replace(";;", ";");
		
		//--JustForTesting-DoNotUse-alert("NEW existingStrParam=" + existingStrParam);
		return existingStrParam;
	}

	// -----------------------------------------------------------------------
	// This function adds or replaces a nameParam value found in the 
	// document/page and overrides it depending on variable existence. 
	// -----------------------------------------------------------------------
	function fnPCAddReplaceTalCustProp(nameParam, renameParam, overrideValParam) {
		if (arguments.length < 3) {
			// Don't be naughty. Send in the nameParam! 
			//--JustForTesting-DoNotUse-alert('Send in all the params please!');
			return;
		}
		
		var override = ('y' === overrideValParam.toLowerCase());
		var localName="";
		var localVal="";
		var isDefined=fnPCIsVariableDefined(nameParam);
		if ( isDefined ) {
			//--JustForTesting-DoNotUse-alert(nameParam + ' is NOT defined on this page. EVAL');
			localName=renameParam;
			localVal=eval(nameParam);
		} else {
			//--JustForTesting-DoNotUse-alert(nameParam + ' is NOT defined on this page. EVAL');
			if (override) {
				//--JustForTesting-DoNotUse-alert(nameParam + ' is being overriden to empty.');
				localName=renameParam;
			}
		}
		
		// If there is local name set. We need to add/replace the variable. 
		if (localName !== '') {
			//--JustForTesting-DoNotUse-alert("add/replace variable " + nameParam + " with " + localName + " and value=" + localVal + ", talCustProp=" + talCustProp);
			talCustProp=fnPCAddReplaceDelimitedNVPs(talCustProp, localName, localVal, varPCMoxieTalCustDelim);
		} else {
			//--JustForTesting-DoNotUse-alert("We do not add/replace variable " + nameParam);
		}
		
	}

	// -----------------------------------------------------------------------
	// Check to see if we do have anything to loop on MAIN variables-wise. 
	// -----------------------------------------------------------------------
	function fnPCIsMainVarsDefined() {
		return ! (typeof stplProChatVarList == 'undefined'
			|| typeof stplProChatVarRenameList == 'undefined'
			|| typeof stplProChatOverrideList == 'undefined' 
			|| typeof stplProChatPageList == 'undefined'
			|| typeof stplProChatJSPageList == 'undefined');
	}

	// -----------------------------------------------------------------------
	// Populates the global var lists as defined at the beginning of the JS.
	// These variables MUST be written out by the StaplesProActiveTag. 
	// This method MUST be called from the Tag driven call before any
	// other JS function calls.  
	// 
	// You must NOT call it within this JS. 
	// -----------------------------------------------------------------------
	function fnPCPopulateVarList() {
		// Check to see if we do have anything to loop on to fetch the JS values from . 
		if (!fnPCIsMainVarsDefined()) {
			//--JustForTesting-DoNotUse-alert('Returning as one..all of stplProChatVarList/stplProChatVarRenameList/stplProChatOverrideList not defined!');
			return;
		}
		
		varPCChatVarList = stplProChatVarList.replace(/^\s+|\s+$/g, '').split(varPCWhiteSpacePtrn);
		varPCChatVarRenameList = stplProChatVarRenameList.replace(/^\s+|\s+$/g, '').split(varPCWhiteSpacePtrn);
		varPCChatVarOverrideList = stplProChatOverrideList.replace(/^\s+|\s+$/g, '').split(varPCWhiteSpacePtrn);
		//varPCChatVarFunctionList = stplProChatFunctionList.split('\|');
		varPCChatPageList = stplProChatPageList.replace(/^\s+|\s+$/g, '').split(varPCWhiteSpacePtrn);
		varPCJSPageList = stplProChatJSPageList.replace(/^\s+|\s+$/g, '').split('|'); // Always pipe delimited for JavaScript scripting piece. 

		for(i = 0; i < varPCChatVarList.length; i++){
			var nameVal=varPCChatVarList[i];
			varPCChatVarIndexList[nameVal]=i;
		}

		for(i = 0; i < varPCChatPageList.length; i++){
			var nameVal=varPCChatPageList[i];
			varPCChatPageIndexList[nameVal]=i; // Since the first element is reserved for ALL pages, always use index+1!!!
		}
		
	}
	

	// -----------------------------------------------------------------------
	// Fetches all the variables listed in stplProChatVarList. 
	// Gets its values and inserts/updates talCustProp.
	// -----------------------------------------------------------------------
	function fnPCFetchFromPageVars() {
		$(window).load(function(){
		// Check to see if we do have anything to loop on to fetch the JS values from . 
		if (!fnPCIsMainVarsDefined()) {
			//--JustForTesting-DoNotUse-alert('Returning as one..all of stplProChatVarList/stplProChatVarRenameList/stplProChatOverrideList not defined!');
			return;
		}
		

		var avgLen=(varPCChatVarList.length + varPCChatVarRenameList.length + varPCChatVarOverrideList.length)/3;
		
		if (avgLen != varPCChatVarList.length || avgLen != varPCChatVarRenameList.length || avgLen != varPCChatVarOverrideList.length) {
			//--JustForTesting-DoNotUse-alert('Returning as one..some of stplProChatVarList/stplProChatVarRenameList/stplProChatOverrideList defined short/long! avg=' + avgLen + ", varListLen=" + varPCChatVarList.length + ", renameListLen=" + varPCChatVarRenameList.length + ", overrideListLen=" + varPCChatVarOverrideList.length);
			return;
		}
		
		for(i = 0; i < varPCChatVarList.length; i++){
			var nameVal=varPCChatVarList[i];
			var renameVal=varPCChatVarRenameList[i];
			var overrideVal=varPCChatVarOverrideList[i];

			varPCChatVarIndexList[nameVal]=i;
			
			fnPCAddReplaceTalCustProp(nameVal, renameVal, overrideVal);
		}
		
		// If we have the current page
		if (fnPCIsVariableDefined('tagCurrPage') && varPCJSPageList.length > 0) {
			varScript=varPCJSPageList[0];
			if (varScript!='undefined' && varScript!=null && varScript.length > 2 && varScript.toLowerCase() != 'none') {
				//--JustForTesting-DoNotUse-alert('Will evaluate MAIN script ' + varScript);
				eval(varScript);
			}
			// We do not work on page names that are one character long. 
			if (tagCurrPage!=null && tagCurrPage.length > 1 && varPCJSPageList.length > 1) {
				// Do we have this on the current page list? 
				if ( varPCChatPageIndexList[tagCurrPage] != 'undefined') {
					varScript=varPCJSPageList[varPCChatPageIndexList[tagCurrPage]+1];
					if (varScript!='undefined' && varScript!=null && varScript.length > 2 && varScript.toLowerCase() != 'none') {
						//--JustForTesting-DoNotUse-alert('Will evaluate page level script ' + varScript);
						eval(varScript);
					}
				}
			}
		}
		});
	}
	
	// -----------------------------------------------------------------------
	// This function handles the communication with Moxie on sales conversion
	// reporting. 
	// -----------------------------------------------------------------------
    function fnPCSalesConversion(urlToSend, currency, amount, variable1, variable2) {
        var cim_iframe = "";
        var agentCookie=STAPLES.Cookies.getCookie('AgentSales');
        // We no longer call the Moxie for Sales Conversion unless the AgentCookie exists.
        if (typeof agentCookie  == "undefined" || agentCookie == null || agentCookie == "" || agentCookie.trim() == "") {
				// Return only for staples.com. staples.ca cannot read cookie from staples.com domain for AgentSales as it is only created for .com. 
                if (window.location.host && window.location.host!=null && window.location.host.toLowerCase().indexOf("staples.com") > -1) {
					return;
				}
        }
        var server_url = urlToSend + "?SalesConversion=**" + currency + "**" + amount + "**" + variable1 + "**" + variable2 + "**";
    
    	//alert('Sending Sales conversion via URL=' + server_url);
    	
        cim_iframe = document.createElement("iframe");
        cim_iframe.setAttribute("id", "cim_sales_frame");
        cim_iframe.setAttribute("name", "cim_sales_frame");
        cim_iframe.setAttribute("src", server_url);
        cim_iframe.style.display = "none";
        document.body.appendChild(cim_iframe);
    }


    function fnPCShowHTML(urlToSend) {
        var cim_iframe = "";
    
        cim_iframe = document.createElement("iframe");
        cim_iframe.setAttribute("id", "PROCHATFRAME");
        cim_iframe.setAttribute("name", "PROCHATFRAME");
        cim_iframe.setAttribute("src", urlToSend);
        cim_iframe.style.display = "";
        document.body.appendChild(cim_iframe);
		//window.setTimeout("alert('PROCHATFRAME is ---> ' + document.getElementById('PROCHATFRAME').innerHTML)",1000);
        //alert('PROCHATFRAME is ---> ' + document.getElementById('PROCHATFRAME').innerHTML);
    }

    function fnPCIncludeJS(urlToSend) {
		var script=document.createElement('script');
		script.setAttribute("type","text/javascript");
		script.setAttribute("src", urlToSend);
		
		document.body.appendChild(script);
		
		
    }
  
	// -----------------------------------------------------------------------
	// This function fetches the StaplesCart cookie and returns the item count
	// -----------------------------------------------------------------------
	function fnPCGetCartItemCount() {
		var cartDetails = STAPLES.Main.parseCart('StaplesCart');

		var itemDetails = "" + cartDetails['Items'].split(" ",2);
		if (itemDetails != 'undefined' && itemDetails !=null && itemDetails.indexOf(',') > 0) {
			itemDetails = itemDetails.split(",",1)
			return itemDetails;
		} else {
			return "0";
		}

	}

	// -----------------------------------------------------------------------
	// This function fetches the StaplesCart cookie and returns the cart value
	// -----------------------------------------------------------------------
	function fnPCGetCartValue() {
		var cartDetails = STAPLES.Main.parseCart('StaplesCart');

		var total = "" + cartDetails['Total'];

		return total.replace(/\$/g,"").replace(/\,/g,"");
	}

	// -----------------------------------------------------------------------
	// Fetches the customer's tier element.
	// -----------------------------------------------------------------------
	function fnPCFetchCustomerTier() {
		try{
			if (STAPLES.Main.getStaplesUserInfo().tier!=null) {
				return STAPLES.Main.getStaplesUserInfo().tier;
			}
		} catch(err){
		return "";
	}
	}
	
	// -----------------------------------------------------------------------
	// This function fetches the last token after given delimiter. 
	// It is used to fetch the last element in a multiple value list
	// like 'CATEGORY:DEPARTMENT:CLASS' (fetches the CLASS here). 
	// -----------------------------------------------------------------------
	function fnPCGetLastTokenAfterDelimiter(strIn, delim) {
		if (strIn == 'undefined' || strIn == null || strIn.length < 2) {
			return '';
		}
		
		if (delim == 'undefined' || delim==null || delim.length < 1) {
			delim=':';
		}
		
		var tokenList = strIn.split(delim);
		if (tokenList.length < 1) {
			return '';
		}
		
		if (tokenList[tokenList.length -1].length < 1) {
			if (tokenList.length > 1) {
				return tokenList[tokenList.length -2];
			} else {
				return '';
			}
		} 
		
		return tokenList[tokenList.length -1];
	}

	// -----------------------------------------------------------------------
	// Fetches the last element splitting the string using the delimiter
	// and replaces it in talCustProp
	// -----------------------------------------------------------------------
	function fnPCFetchAndExchangeLastElementWithDelim(nameVal, delim) {
		if (nameVal == 'undefined' || nameVal == null || nameVal.length < 2) {
			return '';
		}
		
		if (delim == 'undefined' || delim==null || delim.length < 1) {
			delim=':';
		}
		
		//if (fnPCIsVariableDefined(nameVal)) {
			localVal=eval(nameVal);
			lastToken=fnPCGetLastTokenAfterDelimiter(localVal,delim);
			renameVal=varPCChatVarRenameList[varPCChatVarIndexList[nameVal]];
			overrideParam=varPCChatVarOverrideList[varPCChatVarIndexList[nameVal]];
			
			talCustProp=fnPCAddReplaceDelimitedNVPs(talCustProp, renameVal, lastToken, varPCMoxieTalCustDelim);
		//}
		}
	
	
	// -----------------------------------------------------------------------
	// This function furnishes functionality that updates the talCustProp
	// variable's content. 
	// Client must provide a variable Name (varName) and a value (varValue).
	//
	// Name cannot be less than two characters. Value can be empty. 
	// 
	// For example "SkuPrice", "9.99"
	// Returns true if success, false if not. 
	// -----------------------------------------------------------------------
	function fnPCChangeVariable(varName, varValue) {
		if (varName == 'undefined' || varName == null || varName.length < 2) {
			return false;
		}
		if (varValue == 'undefined' || varValue == null) { // it is OK to have 0 length variable value. 
			return false;
		}
		if ( ! fnPCIsVariableDefined("talCustProp")) {
			return false;
		}
		talCustProp=fnPCAddReplaceDelimitedNVPs(talCustProp, varName, varValue, varPCMoxieTalCustDelim);
		//alert("NEW talCustProp is " + talCustProp);
		if (document.getElementById("fnPCTalCustPropDebug")) {
			document.getElementById("fnPCTalCustPropDebug").innerHTML="talCustProp=" + talCustProp;
		}
	}

	// -----------------------------------------------------------------------
	// This function is used in pages where SKU information is kept in an XML
	// string (class and skuskuset for now). You can simply choose the SKU
	// which is selected or clicked, and this function will change the 
	// Proactive chat variables accordingly for this SKU.
	// 
	// Call this function when the SKU is changed or SKU information is clicked
	// where customer shows intention to buy (but not yet buying) so Proactive
	// chat rules would be tailored to a particular SKU. 
	//
	// MAKE SURE THAT XML function selectSingleNodeForNonIE 
	// is included where you are making use of this function. 
	//
	// Parameters:
	// @xmlSkuStrAsObj the XML representation of list of SKUs
	// @snum the number of the SKU (or SKUset)
	// -----------------------------------------------------------------------
	function fnPCChangeSkuInfo(xmlSkuStrAsObj, snum) {	
    	try {
			if (typeof(talCustProp)!=undefined) {
				//alert("ORG talCustProp is " + talCustProp);
				//alert(fnPCChangeVariable("Sku", snum));
				fnPCChangeVariable("Sku", snum);
				if (typeof(xmlSkuStrAsObj)!=undefined) {
					//alert(fnPCGetSkuSetProdStuff(xmlSkuStrAsObj, snum, "price"));
					tempPrice=fnPCGetSkuSetProdStuff(xmlSkuStrAsObj, snum, "price");
					if (tempPrice!=undefined && tempPrice!=null) {
						fnPCChangeVariable("SkuPrice", tempPrice);
					}
				}
				//alert("NEW talCustProp is " + talCustProp);
			}
		} catch (ege) {
			// Skipping the exception here. 
		}
	}

	// -----------------------------------------------------------------------
	// This function furnishes functionality that allows caller to 
	// get a particular attribute for a SKU, given the SKU set information 
	// in an XML as designed by BrowsePath 2.0 (onwards) project. 
	//
	// MAKE SURE THAT XML function selectSingleNodeForNonIE 
	// is included where you are making use of this function. 
	//
	// Parameters:
	// @xmlSkuStrAsObj the XML representation of list of SKUs
	// @snum the number of the SKU (or SKUset)
	// @attrName the name of the attribute to be fetched.  
	// -----------------------------------------------------------------------
	function fnPCGetSkuSetProdStuff(xmlStrAsObj, snum, attrName) {
		if (!fnPCIsVariableDefined('xmlSkuStrAsObj') || xmlSkuStrAsObj==null 
			|| typeof(snum)==undefined || snum==undefined || snum==null 
			|| typeof(attrName)==undefined || attrName==undefined || attrName==null
			) {
			return null;
		}
		if (window.ActiveXObject){ 
			curProdNode=STAPLES.Utilities.selectSingleNode(xmlStrAsObj, '//productcatalog/product[@snum="'+snum+'"]');
		} else { // code for Mozilla, Firefox, Opera, etc.
			curProdNode=STAPLES.Utilities.selectSingleNodeForNonIE(xmlStrAsObj,'//productcatalog/product[@snum="'+snum+'"]');
		}  
		if (curProdNode!=undefined && curProdNode!=null) {
			return curProdNode.getAttribute(attrName);
		} else {
			return null;
		}
	}


// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Define PAGE BASED functions here. 
// These functions will be GLOBAL so you can use them in integration properties 
// as one of the JS functions to be called for certain pages via property named
// PRO_CHAT_JS_PAGELIST using the page index in PRO_CHAT_PAGELIST
//
// CAUTION: If you define any functions to be called in PRO_CHAT_JS_PAGELIST, 
// you MUST at least put a placeholder function in well working order
// as the ProActive chat tag will not do syntax etc checking and simply
// put out the call as defined in the resource bundle. 
// 
// If you miss this simple configuration related update in this file, 
// your JS that comes next will not be executed. You are warned! 
// 
// Do NOT define your global functions where you may use them in you tag here. 
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

	function fnPCFetchCouponErrJSForMoxie() {
		// Obselete. 
		// Now using the server side (Tag) as request already has the error remnant, which are not accessible thru JS. 
		// No point checking the innerHtml and making it locale specific. 
	}
	
	function fnPCFetchCouponCodeJSForMoxie() {
		// Obselete
		return;
		
		if (document['couponinfo']!= 'undefined') {
			if(document.couponinfo.promoName != 'undefined') {
				//alert(document.couponinfo.promoName.value);
				//NA at this time! talCustProp=fnPCAddReplaceDelimitedNVPs(talCustProp, 'CouponCodeInput', document.couponinfo.promoName.value, varPCMoxieTalCustDelim);
			}
		}
	}


	// -----------------------------------------------------------------------
	// This function handles the sku-set price change in skuskuset page
	// during the onload event. 
	// -----------------------------------------------------------------------
	function fnPCChangeSkuPriceOnLoad() {
		if (fnPCIsFunctionDefined('loadSkuXMLString') 
			&& document.getElementById('stage')
			/*&& fnPCIsVariableDefined('s.products')*/
			&& s.products!=null) {
			xmlSkuAsString = $("#skufilterbrowse").html();
			xmlSkuStrAsObj = STAPLES.SKU.loadSkuXMLString(xmlSkuAsString);
			if (typeof(xmlSkuStrAsObj)!=undefined && xmlSkuStrAsObj!=null) {
				//alert(fnPCGetSkuSetProdStuff(xmlSkuStrAsObj, snum, "price"));
				skuNum=fnPCGetLastTokenAfterDelimiter(s.products,';');
				tempPrice=fnPCGetSkuSetProdStuff(xmlSkuStrAsObj, skuNum, "price");
				//alert('blah-' + skuNum + '---' + tempPrice);
				if (tempPrice!=undefined && tempPrice!=null) {
					fnPCChangeVariable("SkuPrice", tempPrice);
				}
			}
		}
	}

	// -----------------------------------------------------------------------
	// This function fetches the last elements for certain variables on each
	// page. varList drives this variable list on the page. 
	// Delimiter is COLON for this function. 
	// 
	// Put other custom common functionality to be repeated on ALL the tagged
	// pages in this function. 
	// -----------------------------------------------------------------------
	function fnPCFetchTheLastElementsForFetchedVars() {
		if(typeof(s)== 'object'){
			var varList = [];
			if(s.prop4!=null){
				varList.push("s.prop4");
			}
			if(s.prop5!=null){
				varList.push("s.prop5");
			}
			if(s.prop6!=null){
				varList.push("s.prop6");
			}
			if(s.products!=null){
				varList.push("s.products");
			}
		for(i = 0; i < varList.length; i++){
			var nameVal=varList[i];
			fnPCFetchAndExchangeLastElementWithDelim(nameVal, ':');
		} // of for...
		fnPCFetchAndExchangeLastElementWithDelim('s.products', ';');

		}
		

		tagJSessId=STAPLES.Cookies.getCookie('JSESSIONID');
		tagCustId=STAPLES.Cookies.getCookie('DirectCustomerNumber');
		tagCustTier=fnPCFetchCustomerTier();
		
		tagCartCnt=fnPCGetCartItemCount();
		tagSalesVal=fnPCGetCartValue();

		// --------------------------------------------------------
		// NOTE this is to resolve the caching related issues. 
		// All of these tag values must come from the cookies. 
		// Do NOT put any variable here if it is not defined 
		// in the integration...properties. 
		// --------------------------------------------------------
		var tagVarList="tagJSessId tagCustId tagCustTier tagCartCnt tagSalesVal".split(varPCWhiteSpacePtrn);
		
		for(i = 0; i < tagVarList.length; i++){
			var nameVal=tagVarList[i];
			if (varPCChatVarIndexList[nameVal] && varPCChatVarRenameList[varPCChatVarIndexList[nameVal]]) {
				var renameVal=varPCChatVarRenameList[varPCChatVarIndexList[nameVal]];
				var overrideParam=varPCChatVarOverrideList[varPCChatVarIndexList[nameVal]];
				fnPCAddReplaceTalCustProp(nameVal, renameVal, overrideParam);
			}
		} // of for...
		
		//fnPCShowHTML('https://prochatqa.staples.com/netagent/proactive/proactive.aspx');
	} 


// -->
