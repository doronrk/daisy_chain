// AC_OETags.js
// Flash Player Version Detection - Rev 1.5
// Detect Client Browser type
// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;			
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			if ( descArray[3] != "" ) {
				tempArrayMinor = descArray[3].split("r");
			} else {
				tempArrayMinor = descArray[4].split("r");
			}
			var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
    var str = '';
    if (isIE && isWin && !isOpera)
    {
  		str += '<object ';
  		for (var i in objAttrs)
  			str += i + '="' + objAttrs[i] + '" ';
  		for (var i in params)
  			str += '><param name="' + i + '" value="' + params[i] + '" /> ';
  		str += '></object>';
    } else {
  		str += '<embed ';
  		for (var i in embedAttrs)
  			str += i + '="' + embedAttrs[i] + '" ';
  		str += '> </embed>';
    }

    document.write(str);
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
      case "id":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.embedAttrs["name"] = ret.objAttrs["id"];
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}

/* End of AC_OETags.js */

//Auto advance to next form field after maxLength of current field is reached

	function autotab(current,to){
	
		if ((current.getAttribute && current.value.length==current.getAttribute("maxlength")) ) {
			current.blur()
			to.focus() 
		}
	}

/* End of autoTab.js */
﻿// ----------------------------------------------
// File:		BrowserUtils.js
// Author:		Nathan Derksen
// Description:	Class to provide access to some basic browser utilities 
// Example:
// var width = BrowserUtils.getBrowserWidth();
// ----------------------------------------------


// ----------------------------------------------
// Function:	BrowserUtils()
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
function BrowserUtils() {
}

// ----------------------------------------------
// Function:	getBrowserWidth()
// Author:		Nathan Derksen
// Description:	Find out how wide the browser window is
// Inputs:		<None>
// Returns:		<Number>
// ----------------------------------------------
BrowserUtils.getBrowserWidth = function() {
	var width = 0;
	
	if (typeof(innerWidth) == "number")
	{
		width = window.innerWidth;
	}
	else if (document.documentElement && document.documentElement.clientWidth)
	{
		width = document.documentElement.clientWidth;
	}
	else
	{
		width = document.body.clientWidth;
	}
	return width;
};

// ----------------------------------------------
// Function:	getBrowserHeight()
// Author:		Nathan Derksen
// Description:	Find out how tall the browser page is
// Inputs:		<None>
// Returns:		<Number>
// ----------------------------------------------
BrowserUtils.getBrowserHeight = function() {
	var height = 0;
	
	if (typeof(innerHeight) == "number")
	{
		height = window.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientHeight)
	{
		height = document.documentElement.clientHeight;
	}
	else
	{
		height = document.body.clientHeight;
	}
	return height;
};

// ----------------------------------------------
// ----------------------------------------------
BrowserUtils.addOnLoadHandler = function (newHandler) {
	if (typeof(console) != "undefined") {
		console.log("BrowserUtils.addOnLoadHandler is deprecated. Please use jQuery $(document).ready(...); instead.");
	}
};

// ----------------------------------------------
// ----------------------------------------------
BrowserUtils.getPosition = function(elementHandle) {
	var currentLeft = currentTop = 0;
	if (elementHandle.offsetParent) 
	{
		currentLeft = elementHandle.offsetLeft;
		currentTop = elementHandle.offsetTop;
		while (elementHandle = elementHandle.offsetParent) 
		{
			currentLeft += elementHandle.offsetLeft;
			currentTop += elementHandle.offsetTop;
		}
	}
	return {left:currentLeft, top:currentTop};
};

// ----------------------------------------------
// ----------------------------------------------
BrowserUtils.getIsSecure = function() {
	var pageLocation = window.location.href.toLowerCase();
	if (pageLocation.indexOf("https://") == 0)
	{
		return true;
	}
	return false;
}

BrowserUtils.preloadImages = function (imageArray) {
	var i, n;
	for (i = 0, n = imageArray.length; i < n; i++) {
		$("<img />").attr("src",imageArray[i]);
	}
}

// This function is to support old FAQ content only.  At some point all FAQ content should
// be updated and this function deleted
function MM_openBrWindow(theURL, winName, features) { //v2.0
    window.open(theURL, winName, features);
}

/* End of BrowserUtils.js */
﻿// CategoryBarRenderer.js, for drawing out category browse refinement menus

function CategoryBarRenderer()
{
	this.pInstance = null;
}

/* End of CategoryBarRenderer.js */
var IE=(navigator.appName.toLowerCase().indexOf("microsoft")!=-1)?true:false;
var NS=(navigator.appName.toLowerCase().indexOf("netscape")!=-1)?true:false;
var MAC=(navigator.appVersion.toLowerCase().indexOf("mac")!=-1)?true:false;
var isSafari = (navigator.userAgent.toLowerCase().indexOf("safari") != -1);true;false;
var realLength=0;
var textObj=null;
var maxLength=0;
var updateTimer=null;
var useCounter=false;
var globalId=null;
var lastLeftChars=0;
var alertBox=false;
if (typeof isGiftMessage == 'undefined'){
	isGiftMessage = false;
}

function onError(){
	top.location="javascript:";
}
function initCharCount(obj,max,counter,id,msg){
	globalId=id;
	textObj=obj;
	realLength=obj.value.length;
	maxLength=max;
	useCounter=counter;
	alertBox=msg;
	obj.onblur=new Function("if(updateTimer) top.clearTimeout(updateTimer)");
	obj.onblur= validateMessage;
	obj.onkeypress=watchMax;
	obj.onkeydown=watchMax;
	obj.onkeyup=watchMax;
}

function watchMax(e)
{
	//window.status=realLength - countCR();
	var keyCode=(NS)?e.which:event.keyCode;
	
	updateMessageLimit();
	
	if(realLength>=maxLength && keyCode!=8 && keyCode!=37 && keyCode!=38 && keyCode!=39 && keyCode!=40 && keyCode!=46){
		//Safari has a bug that doesnt cancel events correctly.
		if(isSafari && keyCode!=127) this.blur();
		if (isGiftMessage && keyCode!=13) {
			this.blur();
		}
		return false;
	}
	else{
		if(!MAC) return true;
	}
}

function writeToLayer(){
	var leftChars=maxLength-realLength;
	if(leftChars<0) leftChars=0;
	if(leftChars>maxLength) leftChars=maxLength;
//	if(lastLeftChars!=leftChars){
		lastLeftChars=leftChars;
		//var strOutput="<font size=1><font color=red><b>";
		var strOutput="<span class='medText'>";
		//strOutput+=leftChars;
		//if(leftChars==1) strOutput+="</b></font> character remaining";
		if(leftChars==1) strOutput+=prefixMessage + leftChars + suffixMessage + "</span>";
		//else strOutput+="</b></font> characters remaining</font>";
		else strOutput+=prefixMessage + leftChars + suffixMessage + "</span>";
		if (document.getElementById)
		{
			var x=(globalId==null)? document.getElementById(textObj.name+"Lyr"): document.getElementById(globalId+"Lyr");
			if (x)
			{
				x.innerHTML = '';
				x.innerHTML = strOutput;
			}
		}
		else if (document.all)
		{
			var x=(globalId==null)? eval("document.all."+textObj.name+"Lyr"):eval("document.all."+globalId+"Lyr");
			x.innerHTML = strOutput;
		}
		
		

//	}
}

function checkMessageLimit(obj,id){
	var counter = true;
	id = "ID" + id;
	msg = "";

	initCharCount(obj,max,counter,id,msg);
	updateMessageLimit();
}

function updateMessageLimit()
{
	realLength=textObj.value.length-countCR();
	
	if (textObj.value.length > maxLength){	
		textObj.value = textObj.value.substring(0,max);
	}
	if(useCounter) writeToLayer();
}

function validateMessage() {
	if (textObj.value.length-countCR() > maxLength){
		if (isGiftMessage){alert(exceededMessage);}
		textObj.value = textObj.value.substring(0,max + countCR());
		}
}


function countCR() {
		if (typeof isGiftMessage == 'undefined'){
			isGiftMessage = false;
		}
		if (isGiftMessage) {
			count = 0;
			for (cpos=0;cpos<=textObj.value.length;cpos++){
				c = textObj.value.charCodeAt(cpos);
				if (c == 13 && (document.all)){count = count + 1}
				else if (c == 10 && (!document.all)){count = count + 1}
			}
			if (document.all && !isMac) {count = count*2;}
			return count;
		}
		else { return 0}
}

function checkMessageLimitOnly(obj,id){
	var counter = true;
	id = "ID" + id;
	msg = "";
	if(arguments.length>0) initCharCount(obj,max,counter,id,msg);
	else realLength=textObj.value.length;
	if (textObj.value.length > maxLength){	
		textObj.value = textObj.value.substring(0,max);
	}
}

/* End of character_count.js */
﻿// CookieManager.js, for managing browser cookies

function CookieManager() {
}

CookieManager.getCookieValue = function(cookieName) {
    var cookie = document.cookie
    var chkdCookie = cookie.split(" ").join("");
    var nvpair = chkdCookie.split(";")
	var splitValues;

    for (var i = 0; i < nvpair.length; ++i) {
        splitValues = nvpair[i].split("=")
        if (splitValues[0] == cookieName) {
			return splitValues[1];
		}
    }
	return null;
}

CookieManager.setCookieValue = function (cookieName, cookieValue, cookieExpireDays) {
    var futdate = new Date()		//Get the current time and date
    var expdate = futdate.getTime()  //Get the milliseconds since Jan 1, 1970
    if (!cookieExpireDays || cookieExpireDays == "") {
        cookieExpireDays = 364;
    }
    expdate += cookieExpireDays * 24 * 60 * 60 * 1000  //expires in about one year
    futdate.setTime(expdate);
    var newCookie = cookieName + "=" + cookieValue + "; path=/;"
    newCookie += " expires=" + futdate.toGMTString();
    window.document.cookie = newCookie;
}

CookieManager.eraseCookie = function(cookieName) {
    document.cookie = cookieName + "=;expires=-1; path=/";
}

CookieManager.setCookieModule = function(mylink, qs, css, t) {
    var newCookie = "module_mode=yes;path=/;"// domain=dev.tiffany.us;"	//Set the new cookie values up 
    var newCookie2 = "module_url=" + mylink + "; path=/;"// domain=dev.tiffany.us;"	//Set the new cookie values up 
    var newCookie3 = "module_css=" + css + "; path=/;"// domain=dev.tiffany.us;"	//Set the new cookie values up 
    var newCookie4 = "module_qs=" + qs + "; path=/;"// domain=dev.tiffany.us;"	//Set the new cookie values up 
    var newCookie5 = "module_t=" + t + "; path=/;"// domain=dev.tiffany.us;"	//Set the new cookie values up 
    window.document.cookie = newCookie
    window.document.cookie = newCookie2
    window.document.cookie = newCookie3
    window.document.cookie = newCookie4
    window.document.cookie = newCookie5
}

CookieManager.areCookiesEnabled = function() {
	if (document.forms[0]) {
		if (document.forms[0].areCookiesEnabled) {
			if (document.forms[0].areCookiesEnabled.value.toLowerCase() == "false") {
				return false;
			}
		}
	}
	return true;
}

/* End of CookieManager.js */
// DomValidation.js.
//<script>
var _val_is_Overlay=false;
try {
    if (typeof parent.divPopupHolder != "undefined") {_val_is_Overlay=true;}
    if (typeof parent.divEmailPopupHolder != "undefined") { _val_is_Overlay = true; }
} catch(e) {
	//probably a cross-domain popup
}
var _val_agt=navigator.userAgent.toLowerCase();
var _val_is_major=parseInt(navigator.appVersion);
var _val_is_ie=((_val_agt.indexOf("msie")!=-1) && (_val_agt.indexOf("opera")==-1));
var _val_isNT=_val_agt.indexOf("windows nt")!=-1;
var _val_IE=(document.all);
var _val_IE4=(_val_is_ie && (_val_is_major==4) && (_val_agt.indexOf("msie 4")!=-1));
var _val_IE6=(_val_is_ie && (_val_agt.indexOf("msie 6.0")!=-1));
var _val_NS=(document.layers);
var _val_DOM=(document.getElementById);
var _val_isMac=(_val_agt.indexOf("Mac")==-1);
var _val_allString="document.";
_val_allString += (_val_IE)?"all.":(_val_DOM)?"getElementById(\"":"";
var _val_styleString=(_val_IE)?".style":(_val_DOM)?"\").style":"";
var _val_endAllString=(_val_DOM && !_val_IE)?"\")":"";
var _val_px=(_val_DOM)?"px":"";

var Page_DomValidationVer = "2";
var Page_IsValid = true;  
var Page_BlockSubmit = false;

function ValidatorUpdateDisplay(val) {
	//var prop = val.getAttribute("display");
	var prop = dom_getAttribute(val,"display");
	
	var style_str = "", style_prefix = "display: ";
		
    if (typeof(prop) == "string") {    
        if (prop == "None") {
            return;
        }
        if (prop == "Dynamic") {
			style_str = val.isvalid ? "none" : "inline";
            //val.setAttribute("style",style_prefix+style_str+"; ");
            val.style.display = style_str;
            return;
        }
    }
    val.style.visibility = val.isvalid ? "hidden" : "visible";
}

function ValidatorUpdateIsValid() {
	var i;
	if (typeof(Page_Validators) != "undefined") {
		for (i = 0; i < Page_Validators.length; i++) {
			if (!Page_Validators[i].isvalid) {
				Page_IsValid = false;
				Page_BlockSubmit = true;
				return;
			}
		}
	}
	Page_IsValid = true;
}

function ValidatorHookupControl(control, val) {
    if (control != null)
    {
	   if (typeof(control.Validators) == "undefined") {
            control.Validators = new Array;
	        var ev = control.onchange;
	        var new_ev;
            if (typeof(ev) == "function" ) {            
                ev = ev.toString();
                //ev = ev.substring(ev.indexOf("{") + 1, ev.lastIndexOf("}"));
                //new_ev = ev.substring(ev.indexOf("{") + 1, ev.lastIndexOf("}"));
                new_ev = "if (Page_IsValid || Page_BlockSubmit) {" + ev.substring(ev.indexOf("{") + 1, ev.lastIndexOf("}")) + "}";
            }
            else {
                //ev = "";
                new_ev = "";
            }

//			if (new_ev != "") {
//				ev += "if (Page_IsValid || Page_BlockSubmit) {" + new_ev + "}";
				//ev += "if (true) {" + new_ev + "}";
//			}
            //var func = new Function("ValidatorOnChange('" + control.id + "'); " + ev);
            var func = new Function("ValidatorOnChange('" + control.id + "'); " + new_ev);
    //alert(control.id + " function is [" + func + "]");
	        control.onchange = func;
	    }
        control.Validators[control.Validators.length] = val;
    }
}

function ValidatorGetValue(id) {
    var control;
    //control = document.getElementById(id);
    control = dom_getElementByID(id);
    if (control == null)
		return "";

    if (typeof(control.value) == "string") {
        return control.value;
    }

    if (typeof(control.tagName) == "undefined" && typeof(control.length) == "number") {
        var j;
        for (j=0; j < control.length; j++) {
            var inner = control[j];
            if (typeof(inner.value) == "string" && (inner.type != "radio" || inner.status == true)) {
                return inner.value;
            }
        }
    }
}

function Page_ClientValidate() {
	
    var i,ctrl;
    if (typeof(Page_Validators) != "undefined") {
		for (i = 0; i < Page_Validators.length; i++) {
			ValidatorValidate(Page_Validators[i]);
		}
	}
    ValidatorUpdateIsValid();   
    ValidationSummaryOnSubmit(); 
    Page_BlockSubmit = !Page_IsValid;
    return Page_IsValid;
}

function ValidatorCommonOnSubmit() {
///<V1.200> - Support for CausesValidation property
   var retValue = !Page_BlockSubmit;

   if (!_val_NS) {   // If we are not in crappy old Netscape 4.7 then....
      if (_val_IE)  // If its Internet Explorer, set our return event value.
		if (event)
		{
		 // ND: Added if() statement to deal with situation where event did not exist
         event.returnValue = retValue;
        }
   }
   
   Page_BlockSubmit = false;
   
   //All Overlays that do error conditions should have provision for scrolling.
   //if (_val_is_Overlay) {initScrollLayer();}

   return retValue;
}

function ValidatorOnChange(controlID) {
    //var cont = document.getElementById(controlID);
    var cont = dom_getElementByID(controlID);
    var vals = cont.Validators;
    var i;
    for (i = 0; i < vals.length; i++) {
        ValidatorValidate(vals[i]);
    }
    ValidatorUpdateIsValid();    
    return Page_IsValid;
}

function ValidatorValidate(val) {   
    val.isvalid = true;
    if (val.enabled != false)    // V2.00 change
    {
        if (typeof(val.evalfunc) == "function") {
            val.isvalid = val.evalfunc(val); 
        }
    }
	//All Overlays that do error conditions should have provision for scrolling.
	if (_val_is_Overlay) {initScrollLayer();}
	if (typeof(overlayAutoSize) != "undefined") {checkOverlaySize();}
    ValidatorUpdateDisplay(val);
}

function checkOverlaySize() {
    if ((document.getElementById("divText").offsetHeight) > 150) { resizeOverlay(); }
}
function resizeOverlay() {
    if (parent.document.getElementById("iframeMiniContent") != null) {
        var newOverlayOffSetHeight = document.getElementById("divText").offsetHeight + 20;
        parent.document.getElementById("iframeMiniContent").style.height = newOverlayOffSetHeight + "px"
    }
}

function ValidatorOnLoad() {
    if (typeof(Page_Validators) == "undefined")
        return;

    var i, val;
    for (i = 0; i < Page_Validators.length; i++) {
        val = Page_Validators[i];
        //var evalFunction = val.getAttribute("evaluationfunction");
        var evalFunction = dom_getAttribute(val,"evaluationfunction");
        if (typeof(evalFunction) == "string") {
            eval("val.evalfunc = " + evalFunction + ";");
        }
        //var isValidAttribute = val.getAttribute("isvalid");
        var isValidAttribute = dom_getAttribute(val,"isvalid");
        if (typeof(isValidAttribute) == "string") {
            if (isValidAttribute == "False") {
                val.isvalid = false;                                
                Page_IsValid = false;
            } 
            else {
                val.isvalid = true;
            }
        } else {
            val.isvalid = true;
        }
        if (typeof(val.enabled) == "string") {
            val.enabled = (val.enabled != "False");
        } else {
            val.enabled = true;
        }
       
        //var controlToValidate = val.getAttribute("controltovalidate");
        var controlToValidate = dom_getAttribute(val,"controltovalidate");
        if (typeof(controlToValidate) == "string") {
			ValidatorHookupControl(dom_getElementByID(controlToValidate), val);
            //ValidatorHookupControl(document.getElementById(controlToValidate), val);
        }
		//var controlhookup = val.getAttribute("controlhookup");
		var controlhookup = dom_getAttribute(val,"controlhookup");
		if (typeof(controlhookup) == "string") {
            if (controlhookup != "")    // V2.00 Change
            {
			    //ValidatorHookupControl(document.getElementById(controlhookup), val);
			    ValidatorHookupControl(dom_getElementByID(controlhookup), val);
			}
		}        
    }
    Page_ValidationActive = true;
    if (!Page_IsValid)
		ValidationSummaryOnSubmit();
		
	// IE4 hack test
    if (_val_IE4)
    {
		var ev = new Function("ValidationSummaryOnSubmit();");
		document.onreadystatechange=ev;
	}
	
}
function TrimString(s) {
    var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}

function RegularExpressionValidatorEvaluateIsValid(val) {
    //var value = ValidatorGetValue(val.getAttribute("controltovalidate"));
    var value = ValidatorGetValue(dom_getAttribute(val, "controltovalidate"));
    // change sent by Alex Aslam -- 9/21/2005
    if (TrimString(value).length == 0) return true;
    
    //var rx = new RegExp(val.getAttribute("validationexpression"));
    var rx = new RegExp(dom_getAttribute(val, "validationexpression"));
    var matches = rx.exec(value);
    return (matches != null && value == matches[0]);
    //if (TrimString(value).length != 0) return false;
}

function ValidatorTrim(s) {
    //var m = s.match(/^\s*(.*\S)\s*$/);
    //return (m == null) ? "" : m[1];

    // change sent by Mathew A. Frank 11/05/2003 <V2.000> fix.
    return s.replace(/^\s+|\s+$/g, "");
}

function RequiredFieldValidatorEvaluateIsValid(val) {
    //return (ValidatorTrim(ValidatorGetValue(val.getAttribute("controltovalidate"))) != ValidatorTrim(val.getAttribute("initialvalue")));
    return (ValidatorTrim(ValidatorGetValue(dom_getAttribute(val, "controltovalidate"))) != ValidatorTrim(dom_getAttribute(val, "initialvalue")));
}


///////////////////////////////////// my stuff ////////////////////////////////////////////////////////////

function ValidatorCompare(operand1, operand2, operator, val) {
    //var dataType = val.type;
    //var dataType = val.getAttribute("type",false);
    var dataType = dom_getAttribute(val, "type");
    var op1, op2;
    if ((op1 = ValidatorConvert(operand1, dataType, val)) == null)
        return false;   
    if (operator == "DataTypeCheck")
        return true;
    if ((op2 = ValidatorConvert(operand2, dataType, val)) == null)
        return true;
    if (op2 == "")
		return true;
    switch (operator) {
        case "NotEqual":
            return (op1 != op2);
        case "GreaterThan":
            return (op1 > op2);
        case "GreaterThanEqual":
            return (op1 >= op2);
        case "LessThan":
            return (op1 < op2);
        case "LessThanEqual":
            return (op1 <= op2);
        default:
            return (op1 == op2);            
    }
}



function CompareValidatorEvaluateIsValid(val) {
    var ctrl = dom_getAttribute(val, "controltovalidate");
    if (null == ctrl)
        return true;
    var value = ValidatorGetValue(ctrl);
    if (ValidatorTrim(value).length == 0)
        return true;
    var compareTo = "";

    // V2.0 changes
    var hookupCtrl = dom_getAttribute(val, "controlhookup");
    var useCtrlToValidate = false;
    if (hookupCtrl != null)
    {
        if (typeof(hookupCtrl) == "string")
        {
		    if (hookupCtrl != "")
		        useCtrlToValidate = true;
        }
    }
    // End V2.00 changes
    
    if (!useCtrlToValidate) {  // V2.00 change
        var ctrl_literal = dom_getAttribute(val, "valuetocompare");
        if (typeof(ctrl_literal) == "string") {
            compareTo = ctrl_literal;  // V2.00 change
         }
    }
    else {
        compareTo = ValidatorGetValue(dom_getAttribute(val, "controlhookup"));
    }
    operator = dom_getAttribute(val, "operator");
    return ValidatorCompare(value, compareTo, operator, val);
}

function CustomValidatorEvaluateIsValid(val) {
    var value = "";
    //var ctrl = val.getAttribute("controltovalidate");
    var ctrl = dom_getAttribute(val, "controltovalidate");
    if (typeof(ctrl) == "string") {
		if (ctrl != "") {
			value = ValidatorGetValue(ctrl);
			if (value == "")
				return true;
        }
    }
    var valid = true;
    //var func_str = val.getAttribute("clientvalidationfunction");
    var func_str = dom_getAttribute(val, "clientvalidationfunction");
    if (typeof(func_str) == "string") {
        if (func_str != "") {
            eval("valid = (" + func_str + "(val, value) != false);");
        }
    }        
    return valid;
}

// Added for V2.0 changes - 27/1/2002 - Glav
function RangeValidatorEvaluateIsValid(val) {
	var value;    
    var ctrl = dom_getAttribute(val, "controltovalidate");
    if (typeof(ctrl) == "string") {
		if (ctrl != "") {
			value = ValidatorGetValue(ctrl);
			if (value == "")
				return true;
        }
    }

    var minval = dom_getAttribute(val,"minimumvalue");
    var maxval = dom_getAttribute(val,"maximumvalue");

	if (minval == null && maxval == null)
        return true;
    
    if (minval == "")
		minval = 0;
	if (maxval == "")
		maxval = 0;
	
    return ( (parseFloat(value) >= parseFloat(minval)) && (parseFloat(value) <= parseFloat(maxval)));
}

function ValidatorConvert(op, dataType, val) {
    function GetFullYear(year) {
        return (year + parseInt(val.century)) - ((year < val.cutoffyear) ? 0 : 100);
    }
    var num, cleanInput, m, exp;
    if (dataType == "Integer") {
        exp = /^\s*[-\+]?\d+\s*$/;
        if (op.match(exp) == null) 
            return null;
        num = parseInt(op, 10);
        return (isNaN(num) ? null : num);
    }
    else if(dataType == "Double") {
        exp = new RegExp("^\\s*([-\\+])?(\\d+)?(\\" + val.decimalchar + "(\\d+))?\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        cleanInput = m[1] + (m[2].length>0 ? m[2] : "0") + "." + m[4];
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);            
    } 
    else if (dataType == "Currency") {
        exp = new RegExp("^\\s*([-\\+])?(((\\d+)\\" + val.groupchar + ")*)(\\d+)"
                        + ((val.digits > 0) ? "(\\" + val.decimalchar + "(\\d{1," + val.digits + "}))?" : "")
                        + "\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        var intermed = m[2] + m[5] ;
        cleanInput = m[1] + intermed.replace(new RegExp("(\\" + val.groupchar + ")", "g"), "") + ((val.digits > 0) ? "." + m[7] : 0);
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);            
    }
    else if (dataType == "Date") {
        var yearFirstExp = new RegExp("^\\s*((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})\\s*$");
        m = op.match(yearFirstExp);
        var day, month, year;
        if (m != null && (m[2].length == 4 || val.dateorder == "ymd")) {
            day = m[6];
            month = m[5];
            year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10))
        }
        else {
            if (val.dateorder == "ymd"){
                return null;		
            }						
            var yearLastExp = new RegExp("^\\s*(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))\\s*$");
            m = op.match(yearLastExp);
            if (m == null) {
                return null;
            }
            if (val.dateorder == "mdy") {
                day = m[3];
                month = m[1];
            }
            else {
                day = m[1];
                month = m[3];
            }
            year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10))
        }
        month -= 1;
        var date = new Date(year, month, day);
        return (typeof(date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate()) ? date.valueOf() : null;
    }
    else {
        return op.toString();
    }
}


function ValidationSummaryOnSubmit() {
    if (typeof(Page_ValidationSummaries) == "undefined") 
        return;
    var summary, sums, s, summ_attrib, hdr_txt, err_msg;
    for (sums = 0; sums < Page_ValidationSummaries.length; sums++) {
        summary = Page_ValidationSummaries[sums];
        summary.style.display = "none";
        if (!Page_IsValid) {
			//summ_attrib = summary.getAttribute("showsummary",false);
			summ_attrib = dom_getAttribute(summary, "showsummary");
            if (summ_attrib != "False") {
                summary.style.display = "";
                if (typeof(summary.displaymode) != "string") {
                    summary.displaymode = "BulletList";
                }
                switch (summary.displaymode) {
                    case "List":
                        headerSep = "<br>";
                        first = "";
                        pre = "";
                        post = "<br>";
                        final_block = "";
                        break;
                        
                    case "BulletList":
                    default: 
                        headerSep = "";
                        first = "<ul>";
                        pre = "<li>";
                        post = "</li>";
                        final_block = "</ul>";
                        break;
                        
                    case "SingleParagraph":
                        headerSep = " ";
                        first = "";
                        pre = "";
                        post = " ";
                        final_block = "<br>";
                        break;
                }
                s = "";
                //hdr_txt = summary.getAttribute("headertext",false);
                hdr_txt = dom_getAttribute(summary, "headertext");
                if (typeof(hdr_txt) == "string") {
                    s += hdr_txt + headerSep;
                }
  //              var cnt=0;
  //              s += first;
  //              for (i=0; i<Page_Validators.length; i++) {
  //                  //err_msg = Page_Validators[i].getAttribute("errormessage",false);
  //                  err_msg = dom_getAttribute(Page_Validators[i], "errormessage");
  //                  if (!Page_Validators[i].isvalid && typeof(err_msg) == "string") {
  //						if (err_msg != "") {
  //							cnt++;
  //							s += pre + err_msg + post;
  //						}
  //                  }
  //              }   
  //              s += final_block;
            
		// IE4 work around
                if (_val_IE4)
                {
					if (document.readyState == "complete")
					{
						summary.innerHTML  = s;
						window.scrollTo(0,0);
						summary.style.visibility = "visible";
					}
				} else
				{
					summary.innerHTML = s; 
					window.scrollTo(0,0);
					summary.style.visibility = "visible";
				}
            }
            //summ_attrib = summary.getAttribute("showmessagebox",false);
            summ_attrib = dom_getAttribute(summary, "showmessagebox");
            
            if (summ_attrib == "True") {
                s = "";
                //hdr_txt = summary.getAttribute("headertext",false);
                hdr_txt = dom_getAttribute(summary, "headertext");
                if (typeof(hdr_txt) == "string") {
                    //s += hdr_txt + "<BR>";
                    s += hdr_txt + "\n";
                }
                for (i=0; i<Page_Validators.length; i++) {
					//err_msg = Page_Validators[i].getAttribute("errormessage",false);
					err_msg = dom_getAttribute(Page_Validators[i], "errormessage");
                    if (!Page_Validators[i].isvalid && typeof(err_msg) == "string") {
                        switch (summary.displaymode) {
                            case "List":
                                //s += err_msg + "<BR>";
                                s += err_msg + "\n";
                                break;
                                
                            case "BulletList":
                            default: 
                                //s += "  - " + err_msg + "<BR>";
                                s += "  - " + err_msg + "\n";
                                break;
                                
                            case "SingleParagraph":
                                s += err_msg + " ";
                                break;
                        }
                    }
                }
                //span = document.createElement("SPAN");
                //span.innerHTML = s;
                //s = span.getAttribute("innerText",false);
                //alert(s);
            }
        }
    }
}

////////////////////////--- Funtions to work in IE4 and DOM ---/////////////////////////////////

function dom_getAttribute(control,attribute)
{
//alert(control + ":" + attribute);
	var attrib;
	if (control)
	{
		if (_val_DOM)
			attrib = control.getAttribute(attribute, false);
		else
			attrib = eval(_val_allString + control.id + "." + attribute + _val_endAllString);
	}
	return attrib;
}

function dom_getElementByID(id)
{
	var element = eval(_val_allString + id + _val_endAllString);
	return element;
}

/* End of DOMValidation.js */
﻿// GridRenderer.js class, for drawing out grids of product and marketing tiles

function GridRenderer()
{
	this.pInstance = null;
}

/* End of GridRenderer.js */
﻿// ----------------------------------------------
// File:		HistoryManager.js
// Author:		Nathan Derksen
// Description:	Singleton class used to keep track of what a person has been doing on the page
// Example:
// HistoryManager.getInstance().setState({productId:10001221, thumbnailIndex:5});
// ----------------------------------------------


// ----------------------------------------------
// Function:	HistoryManager
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<none>
// Returns:		<nothing>
// ----------------------------------------------
function HistoryManager()
{
	this.pInstance = null;
	this.pCurrentIndex = -1;
	this.pHistoryArray = new Array();
	this.pInternalTrigger = true;
	this.pSafariHistoryLength = 0;
	this.pEnabled = true;
	this.lastHistoryLength = 0; // Needed for Safari use
	this.baseHistoryLength = 0;
	this.lastHash;
	this.pIntervalId = 0;
}

// ----------------------------------------------
// Function:	HistoryManager.getInstance()
// Author:		Nathan Derksen
// Description:	Singleton access method
// Inputs:		<none>
// Returns:		<StateModel> Handle to a single HistoryManager instance
// ----------------------------------------------
HistoryManager.getInstance = function()
{
	if (!this.pInstance)
	{
		this.pInstance = new HistoryManager();
	}
	return this.pInstance;
};

// ----------------------------------------------
// Function:	HistoryManager.initHistory()
// Author:		Nathan Derksen
// Description:	Set up the history manager, using a particular state snapshot as a starting point
// Inputs:		<Object> baseState - A StateSnapshotVO instance holding the data to use for the base state snapshot
// Returns:		<Nothing>
// ----------------------------------------------
HistoryManager.prototype.initHistory = function(initBaseState)
{
	var baseState;
	if (initBaseState)
	{
		baseState = initBaseState;
	}
	else
	{
		if (typeof(StoreLocationsModel) != "undefined" && typeof(LocationsStateSnapshotVO != "undefined"))
		{
			baseState = new LocationsStateSnapshotVO();
		}
		else
		{
			baseState = new StateSnapshotVO();
		}
	}
	
	if (this.pHistoryArray.length == 0)
	{
		this.pHistoryArray = new Array(baseState);
	}
	this.pCurrentIndex = 0;	
	this.lastHistoryLength = history.length;
	this.baseHistoryLength = history.length;
	this.lastHash = baseState;
	
	clearInterval(this.pIntervalId);
	this.pIntervalId = setInterval("checkHash()", 500);
//	this.printDebug();
};

// ----------------------------------------------
// ----------------------------------------------
HistoryManager.prototype.overrideBaseState = function(initBaseState)
{
	if (initBaseState)
	{
		if (this.pHistoryArray != null && this.pHistoryArray.length > 0)
		{
			this.pHistoryArray[0] = initBaseState;
		}
		else
		{
			this.pHistoryArray = new Array(initBaseState);
		}
		this.lastHash = initBaseState;
	}
}

// ----------------------------------------------
// Function:	HistoryManager.addHistoryItem()
// Author:		Nathan Derksen
// Description:	Add a new item to the end of the history list
// Inputs:		<StateSnapshotVO> historyState: A StateSnapshotVO instance to use for this particular history step
// Returns:		<Nothing>
// ----------------------------------------------
HistoryManager.prototype.addHistoryItem = function(historyState)
{
	if (historyState)
	{
		if (this.pEnabled == true)
		{
			currentHistoryItem = HistoryManager.getInstance().getCurrentHistoryItem();
		
			if (currentHistoryItem != historyState)
			{
				var scrollYPosition = 0;
				if (this.pCurrentIndex < this.pHistoryArray.length)
				{
					this.pHistoryArray.splice(this.pCurrentIndex+1, this.pHistoryArray.length-this.pCurrentIndex-1);
					this.pHistoryArray.push(historyState);
					this.pCurrentIndex++;
					this.lastHash = historyState;
					this.pInternalTrigger = true;
					this.lastHistoryLength++;


					this.setHash(historyState);
				}
			}
		}
		else
		{
			this.setHash(historyState);
		}
	}
//	this.printDebug();
};

// ----------------------------------------------
// Function:	HistoryManager.getHistoryItem()
// Author:		Nathan Derksen
// Description:	Get the state for a particular step in the history
// Inputs:		<Number> historyIndex: The index of the history state to retrieve
// Returns:		<StateSnapshotVO>: An object containing the properties of that state
// ----------------------------------------------
HistoryManager.prototype.getHistoryItem = function(historyIndex)
{
	if (historyIndex < this.pHistoryArray.length)
	{
		return this.pHistoryArray[historyIndex];
	}
	return null;
};

// ----------------------------------------------
// Function:	HistoryManager.getCurrentHistoryItem()
// Author:		Nathan Derksen
// Description:	Get the state for the current step in the history
// Inputs:		<None>
// Returns:		<StateSnapshotVO>: An object containing the properties of that state
// ----------------------------------------------
HistoryManager.prototype.getCurrentHistoryItem = function()
{
	if (this.pCurrentIndex >= 0 && this.pCurrentIndex < this.pHistoryArray.length)
	{
		return this.pHistoryArray[this.pCurrentIndex];
	}
	return null;
};

// ----------------------------------------------
// Function:	HistoryManager.setHistoryPosition()
// Author:		Nathan Derksen
// Description:	Go back to a particular step in the history
// Inputs:		<Number> historyPosition - The history index to set to
// Returns:		<Nothing>
// ----------------------------------------------
HistoryManager.prototype.setHistoryPosition = function(historyPosition)
{
	this.pCurrentIndex = historyPosition;
	var historyItem = this.getHistoryItem(historyPosition);

	// Make sure that the onload event from the history iframe doesn't trigger a second
	// call. The history onload manager will call regardless of whether it is triggered
	// by pressing back/forward or by the history manager, so a flag is set when the trigger
	// to change the history page comes from inside this history class which is then cleared
	// when the onload method is called
	if (historyItem == null)
	{
		// Do nothing
	}
	else if (this.pInternalTrigger == true)
	{
		this.pInternalTrigger = false;
	}
	else
	{
//		generateEvent("onHistoryChanged", historyPosition, URLFactory.convertHashToState(historyItem));

		if (typeof(StoreLocationsModel) != "undefined" && typeof(LocationsURLFactory != "undefined"))
		{
//			StoreLocationsModel.getInstance().setStateSnapshot(LocationsURLFactory.convertHashToState(hist.getHistoryItem(historyIndex)));
		}
		else
		{
			tempState = URLFactory.convertHashToState(historyItem);
			StateModel.getInstance().setStateSnapshot(tempState);
			$(HistoryManager.getInstance()).trigger("historyChanged", { state: tempState, hash: historyItem});
		}
	}
//	this.printDebug();
};

// ----------------------------------------------
// Function:	HistoryManager.setHash()
// Author:		Nathan Derksen
// Description:	Set the hash shown in the URL based on the state snapshot
// Inputs:		<String> newHash - URL encoded list of name/value pairs to place in the URL
// Returns:		<Nothing>
// ----------------------------------------------
HistoryManager.prototype.setHash = function(newHash)
{
	if (document.body.scrollTop)
	{
		scrollYPosition = document.body.scrollTop;
	}
	else if (window.pageYOffset)
	{
		scrollYPosition = document.body.pageYOffset;
	}

	window.location.hash = newHash.split("#").join("");

	if (document.body.scrollTop)
	{
		document.body.scrollTop = scrollYPosition;
	}
	else if (window.pageYOffset)
	{
		document.body.pageYOffset = scrollYPosition;
	}
	//	this.printDebug();
};

// ----------------------------------------------
// ----------------------------------------------
function setHashFollowup(newHash)
{
	window.location.hash = newHash;
}

// ----------------------------------------------
// Function:	HistoryManager.disableHistory()
// Author:		Nathan Derksen
// Description:	Disable the history manager's history tracking, but keep the deep links intact
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
HistoryManager.prototype.disableHistory = function()
{
	this.pEnabled = false;
	clearInterval(this.pIntervalId);
};


// ----------------------------------------------
// Function:	checkHash()
// Author:		Nathan Derksen
// Description:	Utility function called by setInterval used to track whether back button pressed through the current URL
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
function checkHash()
{
	var hist = HistoryManager.getInstance();
	var lastHistoryLength = hist.lastHistoryLength;
	var lastHash = hist.lastHash;
	var currentHistoryLength = history.length;
	var currentHash = window.location.hash.split("#").join("");
	var currentHashEscaped = escape(window.location.hash.split("#").join(""));
	var historyIndex = 0;
	var tempState;
	
	if (currentHash == "" && hist.pHistoryArray.length > 0)
	{
		currentHash = hist.pHistoryArray[0];
	}
	
	if (hist.pHistoryArray.length == 0)
	{
		// Do nothing
	}
	else if (hist.pInternalTrigger == true)
	{
		hist.pInternalTrigger = false;
	}
	else
	{
		
		if (navigator.userAgent.indexOf("Safari") != -1 && !isSafari3Plus())
		{
			// Safari version 1 and 2 cannot detect changes to the hash. Get around these bugs
			// by taking advantage of an error in history.length. It will decrease
			// by one when hitting back, and increase by one when hitting next
			if (lastHistoryLength != history.length)
			{
				historyIndex = history.length - hist.baseHistoryLength;
				hist.lastHistoryLength = currentHistoryLength;
				hist.pCurrentIndex = historyIndex;
//				generateEvent("onHistoryChanged", historyIndex, URLFactory.convertHashToState(hist.getHistoryItem(historyIndex)));
				if (typeof(StoreLocationsModel) != "undefined" && typeof(LocationsURLFactory != "undefined"))
				{
//					StoreLocationsModel.getInstance().setStateSnapshot(LocationsURLFactory.convertHashToState(hist.getHistoryItem(historyIndex)));
				}
				else {
					tempState = URLFactory.convertHashToState(hist.getHistoryItem(historyIndex));
					StateModel.getInstance().setStateSnapshot(tempState);
					$(HistoryManager.getInstance()).trigger("historyChanged", { state: tempState, hash: hist.getHistoryItem(historyIndex) });
				}
			}
		}
		else
		{
			if (lastHash != currentHash && lastHash != currentHashEscaped)
			{
				var historyArray = hist.pHistoryArray;
				for (var i=0; i < historyArray.length; i++)
				{
					if (currentHash == historyArray[i])
					{
						historyIndex = i;
						hist.pCurrentIndex = i;
						break;
					}
				}
				hist.lastHash = currentHash;
//				generateEvent("onHistoryChanged", historyIndex, URLFactory.convertHashToState(hist.getHistoryItem(historyIndex)));
				if (typeof(StoreLocationsModel) != "undefined" && typeof(LocationsURLFactory != "undefined"))
				{
//					StoreLocationsModel.getInstance().setStateSnapshot(LocationsURLFactory.convertHashToState(hist.getHistoryItem(historyIndex)));
				}
				else
				{
					tempState = URLFactory.convertHashToState(hist.getHistoryItem(historyIndex));
					StateModel.getInstance().setStateSnapshot(tempState);
					$(HistoryManager.getInstance()).trigger("historyChanged", { state: tempState, hash: hist.getHistoryItem(historyIndex) });
				}
			}
		}

	}
//	HistoryManager.getInstance().printDebug();
}

// ----------------------------------------------
// Function:	setHistory()
// Author:		Nathan Derksen
// Description:	Utility function called by iframe (for IE implementation) to set a new history position
// Inputs:		<Number> id - The index of the history item to set
// Returns:		<Nothing>
// ----------------------------------------------
function setHistory(id)
{
	HistoryManager.getInstance().setHistoryPosition(Number(id));
}

// ----------------------------------------------
// ----------------------------------------------
/* HistoryManager.prototype.printDebug = function()
{
	var htmlText = "";
	
	for (var i=0; i < this.pHistoryArray.length; i++)
	{
		if (i == this.pCurrentIndex)
		{
			htmlText += "<b>" + i + ") " + this.pHistoryArray[i] + "</b><br />";
		}
		else
		{
			htmlText += i + ") " + this.pHistoryArray[i] + "<br />";
		}
	}
	if (document.getElementById("debug") == null)
	{
		$("body").append('<div id="debug"></div>');
	}
	$("#debug").css({ zIndex:100, backgroundColor:"#fff000", position:"fixed", top:"0px", padding:"5px" });
	$("#debug").html(htmlText);
} */

function HistoryManager_setFlashHistory(historyState)
{
	var model = StateModel.getInstance();
	var currentHistoryItem;

	if (typeof(StoreLocationsModel) != "undefined" && typeof(LocationsURLFactory != "undefined"))
	{
//		currentHistoryItem = LocationsURLFactory.convertHashToState(HistoryManager.getInstance().getCurrentHistoryItem());
	}
	else
	{
		currentHistoryItem = URLFactory.convertHashToState(HistoryManager.getInstance().getCurrentHistoryItem());
	}

	if (currentHistoryItem.flash != historyState)
	{
		model.setBrowseStatesNoSideEffects({flash:historyState});
		HistoryManager.getInstance().addHistoryItem(URLFactory.convertStateToHash(model.getStateSnapshot()));
	}
}

/* End of HistoryManager.js */
﻿// InlineShoppingBagManager.js, for managing global inline shopping bag and saved items components

var hoverOnEvent;
var hoverOffEvent;

function InlineShoppingBagManager()
{
	this.pInstance = null;
	this.addToBagTimeout;
}

InlineShoppingBagManager.getInstance = function () {
    //var addToBagTimeout;
    if (!this.pInstance) {
        this.pInstance = new InlineShoppingBagManager();
    }
    return this.pInstance;
};

InlineShoppingBagManager.prototype.init = function () {
    var parent = this;
    //inline shopping bag/saved item code

    if ('ontouchstart' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
    	hoverOnEvent = "click";
    } else if (window.navigator.msPointerEnabled) {
         if ($("body").hasClass("ie-10")) {
             hoverOnEvent = "MSPointerOver";
         } else {
             hoverOnEvent = "pointerover";
         }
    } else {
    	hoverOnEvent = "mouseenter";
    }

    if ('ontouchend' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
    	hoverOffEvent = "mouseleave";
    } else if (window.navigator.msPointerEnabled) {
         if ($("body").hasClass("ie-10")) {
             hoverOffEvent = "MSPointerOut";
         } else {
             hoverOffEvent = "pointerout";
         }
    } else {
    	hoverOffEvent = "mouseleave";
    }

    $("body").on("click", "#saved .open-bag, #saved .open-saved, #saved .open-rings", function (e) {
        var target = $(this);
        openInlineSelections(target);

        return false;
    });

    $("body").on("click", ".bag .open-bag, .bag .open-saved", function (e) {
        if (!$(this).hasClass("selected")) {
            e.preventDefault();
        }
    });

    $("body").on(hoverOnEvent, ".bag .open-bag, .bag .open-saved", function (e) {
        if (!$("body#shoppingbag").length && !$("body#savedItemsPage").length) {
            var target = $(this);

            if (hoverOnEvent != "click") {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                timer = setTimeout(function () {
                    openInlineSelections(target);
                    clearTimeout(timer);
                    timer = null;
                }, 300);
            } else {
                openInlineSelections(target);
            }
        } else {
			if ($(this).hasClass("open-bag")) {
			    $(".open-bag").addClass("selected");
			} else if ($(this).hasClass("open-saved")) {
			    $(".open-saved").addClass("selected");
			}	        	
        }
    });
    
    $("body").on("mouseleave", ".bag .open-bag, .bag .open-saved", function (e) {
        if ($("body#shoppingbag").length || $("body#savedItemsPage").length  || (typeof showInlineBags != "undefined" && showInlineBags === false)) {    
        	$(this).removeClass("selected");
        }
    });
    
    $("body").on("click", "#saved .close", function (e) {
        $("#saved").fadeOut(300);
        $(".open-bag, .open-saved, .open-rings").removeClass("selected");
        $("#inlineLoading").show();
        $("#inlineContent").hide();

        return false;
    });

    $("body").on("mouseleave", "#saved", function (e) {
        $("#saved").fadeOut(300);
        $(".open-bag, .open-saved, .open-rings").removeClass("selected");
        $("#inlineLoading").show();
        $("#inlineContent").hide();

        return false;
    });

    $("body").on("mouseenter", "#saved", function (e) {
        clearTimeout(parent.addToBagTimeout);
        parent.addToBagTimeout = null;

        return false;
    });

    $("body").on("click", "#saved a.remove", function (e) {
        var itemcontainer = $(this).parents(".quarter");
        var touchpager = $(this).parents(".touchpager");
        var container = touchpager.find(".container");
        //var bagCount = parseInt($(".bag-count").text());

        //$(".bag-count").text(bagCount - 1);
        $(this).parent().html(LABEL_REMOVED_FROM_SAVED_ITEMS).addClass("item-removed");

        //code to remove from bag

        itemcontainer.fadeTo(2000, 0, function () {
            var pages = $("#saved-content .touchpager .grid-container").length;
            var lastPageSize = $("#saved-content .touchpager .grid-container:last .item").length;

            itemcontainer.html("&nbsp;").removeClass("item");
            if (pages == 1) {
                $("#saved-content .touchpager .grid-container:last").prepend(itemcontainer);
                savedHeaderWidth(pages, lastPageSize - 1);

                if (lastPageSize == 1) {
                    if ($(".open-bag").hasClass("selected")) {
                        fillInlineBagNoItems(inlineBagNoItems);
                    } else if ($(".open-saved").hasClass("selected")) {
                        getInlineSavedItems(true);
                    }
                    itemcontainer.fadeTo(1000, 1);
                    $("#saved-content .touchpager .grid-container:last").append(itemcontainer);
                }
            } else {
                $("#saved-content .touchpager .grid-container:last").append(itemcontainer);
            }
            $("#saved-content .touchpager .grid-container.current").nextAll().each(function () {
                $(this).prev().append($(this).find(".quarter:first"));
                itemcontainer.fadeTo(0, 1);
            });
            if (lastPageSize == 1) {
                if ($("#saved-content .touchpager .grid-container:last").hasClass("current")) {
                    touchpager.find(".page-left-box").click();
                    touchpager.find(".page-right-box span").hide();

                    setTimeout(function () {
                        var pages = container.find(".grid-container").length;
                        if (pages > 1) {
                            $("#saved-content .touchpager .grid-container:last").remove();
                        }

                        pages = container.find(".grid-container").length;
                        var containerWidth = pages * 100;
                        container.css("width", containerWidth + "%");
                        var pageWidth = 100 / pages;
                        container.find(".grid-container").css("width", pageWidth + "%");
                    }, 600);

                } else {
                    if (pages > 1) {
                        $("#saved-content .touchpager .grid-container:last").remove();
                    }

                    var pages = container.find(".grid-container").length;
                    var containerWidth = pages * 100;
                    container.css("width", containerWidth + "%");
                    var pageWidth = 100 / pages;
                    container.find(".grid-container").css("width", pageWidth + "%");

                    if ($("#saved-content .touchpager .grid-container:last").hasClass("current")) {
                        touchpager.find(".page-right-box span").hide();
                    }
                }
            }
        });

        return false;
    });

    $("body").on("click", "#saved a.add", function (e) {
        var itemcontainer = $(this).parents(".quarter");
        var touchpager = $(this).parents(".touchpager");
        var container = touchpager.find(".container");
        var bagCount = parseInt($(".bag-count").text());

        $(".bag-count").text(bagCount - 1);
        $(this).parent().html(inlineNewAddMsg);

        //code to add to bag

        itemcontainer.fadeTo(2000, 0, function () {
            var pages = $("#saved-content .touchpager .grid-container").length;
            var lastPageSize = $("#saved-content .touchpager .grid-container:last .item").length;

            itemcontainer.html("&nbsp;").removeClass("item");
            if (pages == 1) {
                $("#saved-content .touchpager .grid-container:last").prepend(itemcontainer);
                savedHeaderWidth(pages, lastPageSize - 1);

                if (lastPageSize == 1) {
                    if ($(".open-bag").hasClass("selected")) {
                        fillInlineBagNoItems(inlineBagNoItems);
                    } else if ($(".open-saved").hasClass("selected")) {
                        getInlineSavedItems(true);
                    }
                    itemcontainer.fadeTo(1000, 1);
                    $("#saved-content .touchpager .grid-container:last").append(itemcontainer);
                }
            } else {
                $("#saved-content .touchpager .grid-container:last").append(itemcontainer);
            }
            $("#saved-content .touchpager .grid-container.current").nextAll().each(function () {
                $(this).prev().append($(this).find(".quarter:first"));
                itemcontainer.fadeTo(0, 1);
            });
            if (lastPageSize == 1) {
                if ($("#saved-content .touchpager .grid-container:last").hasClass("current")) {
                    touchpager.find(".page-left-box").click();
                    touchpager.find(".page-right-box span").hide();

                    setTimeout(function () {
                        var pages = container.find(".grid-container").length;
                        if (pages > 1) {
                            $("#saved-content .touchpager .grid-container:last").remove();
                        }

                        pages = container.find(".grid-container").length;
                        var containerWidth = pages * 100;
                        container.css("width", containerWidth + "%");
                        var pageWidth = 100 / pages;
                        container.find(".grid-container").css("width", pageWidth + "%");
                    }, 600);

                } else {
                    if (pages > 1) {
                        $("#saved-content .touchpager .grid-container:last").remove();
                    }

                    var pages = container.find(".grid-container").length;
                    var containerWidth = pages * 100;
                    container.css("width", containerWidth + "%");
                    var pageWidth = 100 / pages;
                    container.find(".grid-container").css("width", pageWidth + "%");

                    if ($("#saved-content .touchpager .grid-container:last").hasClass("current")) {
                        touchpager.find(".page-right-box span").hide();
                    }
                }
            }
        });

        return false;
    });

    //end inline shopping bag/saved item code
};

function openInlineSelections(target) {
		if (typeof showInlineBags != "undefined" && showInlineBags === false) {
			if (target.hasClass("open-bag")) {
	        $(".open-bag").addClass("selected");
	    } else if (target.hasClass("open-saved")) {
	        $(".open-saved").addClass("selected");
	    }	
			return;
		}

    $("#storesearch").fadeOut(200);
    $("#sitesearch").fadeOut(200);
    $("a.search, a.searchstores, .bag a").removeClass("selected");
    $("#flydown").fadeOut(300);
    $("#nav .flydowns a").removeClass("selected");
    $("#filters > div").slideUp(200);
    $("#filters a").removeClass("selected");
    $("#grid-popup").hide();

    $(".open-bag, .open-saved, .open-rings, .searchstores, .search").removeClass("selected");

		$("#saved-content").removeClass("sb saved rings")
    if (target.hasClass("open-bag")) {
        $("#saved-content").addClass("sb");
        //.load("/Customer/InlineCustomerSelections.aspx", function () {
        $(".open-bag").addClass("selected");

        //var pages = $("#saved-content .touchpager .grid-container").length;
        //var lastPageSize = 4 - $("#saved-content .touchpager .grid-container:last .blank").length;

        //savedHeaderWidth(pages, lastPageSize);
        //});
    } else if (target.hasClass("open-saved")) {
        $("#saved-content").addClass("saved");
        //.load("/Customer/InlineCustomerSelections.aspx", function () {
        $(".open-saved").addClass("selected");
        //});
    } else if (target.hasClass("open-rings")) {
        $("#saved-content").addClass("rings");
        //.load("/Customer/InlineCustomerSelections.aspx", function () {
        $(".open-rings").addClass("selected");
        //});
    }
    initInlineBag(target.hasClass("globalnav"));

    $("#saved:hidden").fadeIn(300);

    $(".empty").each(function () {
        $(this).height($(this).width());
    });

    centerGridText();
}
function initInlineBag(fromGlobalNav) {
		$("#inlineLoading").show();
		$("#inlineContent").hide();
		$("#inlineMainContainer").css("left","0%");
		if ($("#saved-content").hasClass("sb")) {
			getInlineShoppingBag(fromGlobalNav);
		} else if ($("#saved-content").hasClass("saved")) {
			getInlineSavedItems(fromGlobalNav);
		} else if ($("#saved-content").hasClass("rings")) {
			getInlineSavedRings(fromGlobalNav);
		}	
}
function populateInlineShoppingBag(data, headerData) {
	if (headerData == null || headerData.TotalBagCount == 0) {
		fillInlineBagNoItems(inlineBagNoItems);
		return;
	}
	$(".numShoppingBagItemsWrapper").show();
	$("#numShoppingBagItems").text(headerData.TotalBagCount);
	$("#inlineLoading").hide();
	$("#inlineContent").show();	
	fillInlineBag(data.Items, "sb");
}
function populateInlineSavedItems(data, headerData, fromGlobalNav) {
	$("#saved .open-saved").addClass("selected");
	if (headerData == null || (headerData.TotalCount == 0 && headerData.TotalRingCount == 0)) {
		$(".open-rings-wrapper").hide();
		fillInlineBagNoItems(inlineSavedNoItems);
		return;
	}
	if (headerData.TotalCount == 0 && headerData.TotalRingCount > 0) {
		$(".numSavedItemsWrapper").hide();
		$(".open-rings-wrapper").show();
		if (fromGlobalNav != null && fromGlobalNav == true) {
			$("#saved .open-saved").removeClass("selected");
			$("#saved .open-rings").addClass("selected");
			$("#saved-content").removeClass("saved").addClass("rings")		
			getInlineSavedRings();
		} else {
			$("#saved .open-saved").addClass("selected");
			fillInlineBagNoItems(inlineSavedNoItems);
		}
		return;
	}
	$(".numSavedItemsWrapper").show();
	$("#numSavedItems").text(headerData.TotalCount);
	if (headerData.TotalRingCount == 0) {
		$(".open-rings-wrapper").hide();
	} else {
		$(".open-rings-wrapper").show();
		$("#numSavedRings").text(headerData.TotalRingCount);
	}
	$("#inlineLoading").hide();
	$("#inlineContent").show();	
	fillInlineBag(data.SavedItems, "saved", true);
}
function populateInlineSavedRings(data, headerData) {
	$(".open-rings-wrapper").show();
	$("#saved .open-saved").removeClass("selected");
	$("#saved .open-rings").addClass("selected");
	if (headerData == null || (headerData.TotalCount == 0 && headerData.TotalRingCount == 0)) {		
		fillInlineBagNoItems(inlineSavedNoItems);
		return;
	}
	if (headerData.TotalCount == 0) {
		$(".numSavedItemsWrapper").hide();
	} else {
		$(".numSavedItemsWrapper").show();
		$("#numSavedItems").text(headerData.TotalCount);
	}
	$("#numSavedRings").text(headerData.TotalRingCount);
	$("#inlineLoading").hide();
	$("#inlineContent").show();	
	fillInlineBag(data.SavedItems, "rings", true);
}

function fillInlineBagNoItems(content) {
	$(".numSavedItemsWrapper").hide();
	$(".numShoppingBagItemsWrapper").hide();
	$("#inlineMainContainer").html(content);
	savedHeaderWidth(1, 1);					
	$("#saved-content .btn").css("visibility","hidden");
	$("#inlineLoading").hide();
	$("#inlineContent").show();	
	initTouchpager($("#saved-content .touchpager"));
	resizeTouchPager($("#saved-content .touchpager"));
	$(".touchpager img:first").load(function () {
	    resizeTouchPager();
	});
}

function fillInlineBag(items, bagType, hasAddToBag) {
  //alert($(items).length);
  var currentGridContainer = $('<div class="grid-container"></div>');
  $("#inlineMainContainer").html(currentGridContainer);
  var count = 0;
	$(items).each(function(){
		if (count > 0 && count % 4 == 0) {
			currentGridContainer = $('<div class="grid-container"></div>');
			$("#inlineMainContainer").append(currentGridContainer);
		}
		var item = $('<div class="quarter item"></div>');
		var itemTemp = inlineItemHTML;
		if (hasAddToBag && this.IsPurchasable == true) {
			itemTemp = itemTemp.replace("$addToBag$", inlineAddToBag);
		} else {
			itemTemp = itemTemp.replace("$addToBag$", "");
		}
		if (this.IsPurchasable == false && this.ShowEmailWhenAvailable == true) {
			itemTemp = itemTemp.replace("$emailMe$", inlineEmailMe);
			itemTemp = itemTemp.replace("$outOfStock$", inlineOutOfStock);
		} else {
			itemTemp = itemTemp.replace("$emailMe$", "");
			itemTemp = itemTemp.replace("$outOfStock$", "");
		}		
		if (typeof this.ListType != "undefined" && this.ListType == "Statement") {
			itemTemp = itemTemp.replace("$removeItem$", "");
		} else {
			itemTemp = itemTemp.replace("$removeItem$", inlineRemoveItem);
		}
		itemTemp = itemTemp.split("$imgSrc$").join(this.MediaPath);
		
		var descArray = this.Desc.split("##");
		var priceArray = this.RetailPrice.split("##");
		var titlepriceTemp = "";
		for (var i=0; i<descArray.length;i++) {
			titlepriceTemp += inlineItemTitlePrice;
			titlepriceTemp = titlepriceTemp.replace("$title$", descArray[i]);
			if ((typeof priceArray[i] == "undefined" || priceArray[i] == "") || (typeof this.ListType != "undefined" && this.ListType == "Statement" && typeof this.ShowPrice != "undefined" && this.ShowPrice.toLowerCase() == "false" )) {
				titlepriceTemp = titlepriceTemp.replace("$price$", "");
			} else {
				titlepriceTemp = titlepriceTemp.replace("$price$", priceArray[i]);
			}
		}
		itemTemp = itemTemp.replace("$titleprice$", titlepriceTemp);		
		
		if (bagType == "sb") {
			itemTemp = itemTemp.replace("$qty$", inlineQtyHTML.replace("$qtyAmt$", this.Qty));
		} else {
			itemTemp = itemTemp.replace("$qty$", "");
		}
		if (bagType == "rings") {
			itemTemp = itemTemp.replace("$itemType$","engagement").replace("$groupSku$","&groupSKU="+this.GroupSku).replace("$mcat$","&mcat=148203").replace("$cid$","").replace("$searchParams$","");
		} else if (this.isGroup == 1) {
			itemTemp = itemTemp.replace("$itemType$","shopping").replace("$groupSku$","&selectedsku="+this.SelectedSku).replace("$mcat$","&mcat="+this.MasterCategoryID).replace("$cid$","&cid="+this.CategoryID).replace("$searchParams$","&search_params="+this.SearchParams);
		} else {
			itemTemp = itemTemp.replace("$itemType$","shopping").replace("$groupSku$","").replace("$mcat$","&mcat="+this.MasterCategoryID).replace("$cid$","&cid="+this.CategoryID).replace("$searchParams$","&search_params="+this.SearchParams);
		}
		//if (this.isGroup == 1) {
		//	itemTemp = itemTemp.replace(/\$sku\$/g, this.groupSku);
		//} else {
		itemTemp = itemTemp.replace(/\$sku\$/g, this.Sku);
		//}
		itemTemp = itemTemp.replace(/\$bagtype\$/g, bagType);
		if (typeof this.ItemID != "undefined") {
			itemTemp = itemTemp.replace(/\$itemID\$/g, this.ItemID);
		} else {
			itemTemp = itemTemp.replace(/\$itemID\$/g, this.ID);
		}
		if (this.GroupSku != null) {
			itemTemp = itemTemp.replace(/\$groupSku\$/g, this.GroupSku);
		} else {
			itemTemp = itemTemp.replace(/\$groupSku\$/g, "");
		}
		if (this.Desc != null ) {
			itemTemp = itemTemp.replace(/\$itemDesc\$/g, encodeURI(this.Desc));
		} else {
			itemTemp = itemTemp.replace(/\$itemDesc\$/g, "");
		}
		if (this.SelectedSku != null ) {
			itemTemp = itemTemp.replace(/\$selectedSku\$/g, this.SelectedSku);
		} else {
			itemTemp = itemTemp.replace(/\$selectedSku\$/g, "");
		}			
		if (typeof this.SizeName != "undefined" && this.SizeName != null && this.SizeName != "") {
			itemTemp = itemTemp.replace("$ring$", inlineItemRingHTML);
			itemTemp = itemTemp.replace("$ringsize$", this.SizeName);
			itemTemp = itemTemp.replace("$sizelabel$", this.SizeLabel);
			/*
			if (this.SizeLabel == "Ring") {
			  itemTemp = itemTemp.replace("$sizelabel$", ringSizeLabel);
			} else if (this.SizeLabel == "Chain") {
			  itemTemp = itemTemp.replace("$sizelabel$", chainLengthLabel);
			} else {
			  itemTemp = itemTemp.replace("$sizelabel$", genericSizeLabel)
			}
			*/
		} else {
			itemTemp = itemTemp.replace("$ring$", "");
		}
		if (typeof this.isServiceable != "undefined" && this.isServiceable == 1) {
			if (typeof this.itemEngravingType != "undefined" && this.itemEngravingType !=null && this.itemEngravingType !="") {
				itemTemp = itemTemp.replace("$engraving$", inlineItemEngravingHTML);
				itemTemp = itemTemp.replace("$engravingType$", this.itemEngravingType);
				itemTemp = itemTemp.replace("$engravingInitials$", this.itemEngravingInitials);
				itemTemp = itemTemp.replace("$engravingStyle$", this.itemEngravingStyle);
				itemTemp = itemTemp.replace("$engravingPrice$", this.itemEngravingSubTotal);
			} else {
				itemTemp = itemTemp.replace("$engraving$", inlineItemNoEngravingHTML);
			}
		} else {
			itemTemp = itemTemp.replace("$engraving$", "");
		}				
		currentGridContainer.append(item.append(itemTemp));
		if (bagType == "saved" && this.IsServiceable) {
			$(item).find("a.add").attr("data-isEngravable", "true");
		}		
		count++;
	});
	if (count < 4) {
		for (var i=0; i<(4-count);i++){
			currentGridContainer.prepend('<div class="quarter">&nbsp;</div>');
		}
		savedHeaderWidth(1, count);				
	} else {
		savedHeaderWidth(count/4, 4-(count%4));
	}
	if (newlyAddedItemsArr.length > 0) {
		$("#inlineMainContainer").find(".quarter.item:lt("+newlyAddedItemsArr.length+")").addClass("newItem");
	}
	newlyAddedItemsArr = [];
	$("#saved-content .btn").css("visibility", "visible");
	initTouchpager($("#saved-content .touchpager"));
	currentGridContainer.find("a.item-page-link").each(function(){
		$(this).css("height",$(this).width()+"px");
	});
    resizeTouchPager($("#saved-content .touchpager"));
    $(".touchpager img:first").load(function () {
        resizeTouchPager();
    });
    $("#inlineMainContainer .newItem").each(function () {
        $(this).find(".inlineDesc").hide();
        if ($("#saved-content").hasClass("sb")) {
            $(this).append(inlineNewAddMsg);
            if ($(this).find(".inline-engraving").length > 0) {
                $(this).find(".item-removed").append("<br/><br/>" + $(this).find(".inline-engraving .engraving-type").text() + "<br/>" + $(this).find(".inline-engraving .engraving-style").text());
            }
        } else {
            $(this).append(inlineNewSavedMsg);
        }
        if ($("body").hasClass("ie-7") || $("body").hasClass("ie-8")) {
            setTimeout(function () {
                $(this).find(".item-removed").hide();
                $(this).find(".inlineDesc").show();
                resizeTouchPager();
            }, 3000);
        } else {
            $(this).hide().fadeIn(3000, function () {
                $(this).find(".item-removed").hide();
                $(this).find(".inlineDesc").show();
                resizeTouchPager();
            });
        }
        if (InlineShoppingBagManager.getInstance().addToBagTimeout) {
            clearTimeout(InlineShoppingBagManager.getInstance().addToBagTimeout);
            InlineShoppingBagManager.getInstance().addToBagTimeout = null;
        }
        InlineShoppingBagManager.getInstance().addToBagTimeout = setTimeout(function () {
            $("#saved").fadeOut(300, function () {
                $("#inlineLoading").show();
                $("#inlineContent").hide();
            });
            $(".open-bag, .open-saved").removeClass("selected");
        }, 5000);
    });
}
function decreaseInlineQty(count) {
	if ($("#saved-content").hasClass("sb")) {
		$("#numShoppingBagItems").text(count);
	} else if ($("#saved-content").hasClass("saved")) {
		$("#numSavedItems").text(count);
	} else if ($("#saved-content").hasClass("rings")) {
		$("#numSavedRings").text(count);
	}		
}	
function moveSavedItemToShoppingBag(elem) {
	if ($(elem).attr("data-isEngravable") == "true") {
		OverlayManager.getInstance().open("engraving", {
			url: '/Shopping/Engraving.aspx?wlid=' + $(elem).attr("data-itemID"),
			size: 'wide'
		}); 
		$("#saved").trigger("mouseleave");
		return;	
	}
	$.ajax({
		url: "/Customer/InlineCustomerSelections.aspx/MoveSavedItemToShoppingBag",
		type: "POST",
		data: '{"listItemKey":"' + $(elem).attr("data-itemID") + '"}',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data)
		{
			CookieManager.setCookieValue("shoppingbagcnt", data.d.Header.TotalBagCount);
			CookieManager.setCookieValue("saveditemscnt", data.d.Header.TotalCount+data.d.Header.TotalRingCount);
			InlineShoppingBagManager.getInstance().updateShoppingBagLabel();
			InlineShoppingBagManager.getInstance().updateSavedItemsLabel();	
			decreaseInlineQty(data.d.Header.TotalCount);
			//Tracking
			var argItem = ";" + decodeURI($(elem).attr("data-itemDesc")).replace(/<[^<>]+>|##/g," ").replace(/[,:'"-]/g,"").replace("™","(TM)").replace("®","(R)") + "-";
			if ($(elem).attr("data-groupSku") != "") {
				argItem += $(elem).attr("data-selectedSku") + ":" + $(elem).attr("data-groupSku");
			} else {
				argItem += $(elem).attr("data-sku");
			}
			TrackActionAddToShoppingBag("Inline Saved Items", "Add to ShoppingBag", argItem);
		},
		error: function (jqXHR, status, error)
		{

		}
	});				
}

function openEmailMeOverlay(elem) {
	var query = window.location.search.split("?").join("");
	var cid = URLFactory.extractQueryStringValue(query, "cid");
	var sku = $(elem).attr("data-sku");
	var selectedSku = $(elem).attr("data-selectedSku");

    OverlayManager.getInstance().open("linkEmailWhenAvailable", {
        url: "/Customer/Request/EmailWhenItemAvailable.aspx?source=InLineSave&selectedsku="+selectedSku+"&sku="+sku+"&cid="+cid,
        size: "skinny",
        iframe: true,
        position: "",
        bgstyle: ""
    });		
	
}
function removeInlineItem(elem) {
	var removeType;
	var removeKey;
	var isSavedRingsToken = "";
	if ($(elem).attr("data-bag-type") == "sb"){
		removeType = "RemoveShoppingBagItem";
		removeKey = "shoppingBagItemKey";
	} else if ($(elem).attr("data-bag-type") == "saved") {
		removeType = "RemoveSavedItem";
		removeKey = "listItemKey";
		isSavedRingsToken = ',"isSavedRings" : false';
	} else if ($(elem).attr("data-bag-type") == "rings") {
		removeType = "RemoveSavedItem";
		removeKey = "listItemKey";
		isSavedRingsToken = ',"isSavedRings" : true';
	}
	$.ajax({
		url: "/Customer/InlineCustomerSelections.aspx/" + removeType,
		type: "POST",
		data: '{"'+removeKey+'":"' + $(elem).attr("data-itemID") + '"'+isSavedRingsToken+'}',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data)
		{
			if ($(elem).attr("data-bag-type") == "sb"){
				CookieManager.setCookieValue("shoppingbagcnt", data.d.Header.TotalBagCount);
				InlineShoppingBagManager.getInstance().updateShoppingBagLabel();
				decreaseInlineQty(data.d.Header.TotalBagCount);
                TrackInlineRemoveShoppingBagItem("Inline Shopping Bag", "Delete Item");
			} else {
				CookieManager.setCookieValue("saveditemscnt", data.d.Header.TotalCount+data.d.Header.TotalRingCount);
				InlineShoppingBagManager.getInstance().updateSavedItemsLabel();	
				if ($(elem).attr("data-bag-type") == "rings"){
				    decreaseInlineQty(data.d.Header.TotalRingCount);
				    TrackRemoveSavedEngagementItem("Inline Saved Items", "Delete Engagement Item");
				} else {
				    decreaseInlineQty(data.d.Header.TotalCount);
				    TrackInlineRemoveSavedItem("Inline Saved Items", "Delete Item");
				}
                
			}
		},
		error: function (jqXHR, status, error)
		{

		}
	});				
}

function getInlineShoppingBag(fromGlobalNav) {
	$.ajax({
		url: "/Customer/InlineCustomerSelections.aspx/GetInlineShoppingBag",
		type: "POST",
		data: '',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data)
		{
            if (typeof(TrackInlineShoppingBagViewItems)!='undefined' && newlyAddedItemsArr.length == 0) {
				var argItems = "";
				var numItems = data.d.Header.TotalBagCount;
				if (numItems > 0) {
					$(data.d.ResponseObject.Items).each(function(index) {
						argItems += ";" + this.Desc.replace(/<[^<>]+>|##/g," ").replace(/[,:'"-]/g,"").replace("™","(TM)").replace("®","(R)") + "-" + this.Sku + ";" + this.Qty;
						if (index != numItems - 1) {
							argItems += ",";
						}
					});
				}
				TrackInlineShoppingBagViewItems("Inline Shopping Bag", "View ShoppingBag", argItems);
            }
			populateInlineShoppingBag(data.d.ResponseObject, data.d.Header);
		},
		error: function (jqXHR, status, error)
		{

		}
	});			
}
function getInlineSavedItems(fromGlobalNav) {
	$.ajax({
		url: "/Customer/InlineCustomerSelections.aspx/GetInlineSavedItems",
		type: "POST",
		data: '',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data)
		{
			populateInlineSavedItems(data.d.ResponseObject, data.d.Header, fromGlobalNav);
            if (typeof(TrackInlineViewSavedItems)!='undefined') {
                TrackInlineViewSavedItems("Inline Saved Items", "View Saved Items");
            }
            InlineShoppingBagManager.getInstance().updateSavedItemsLabel();
		},
		error: function (jqXHR, status, error)
		{

		}
	});			
}
function getInlineSavedRings(fromGlobalNav) {
	$.ajax({
		url: "/Customer/InlineCustomerSelections.aspx/GetInlineSavedRings",
		type: "POST",
		data: '',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data)
		{
		    populateInlineSavedRings(data.d.ResponseObject, data.d.Header);
		    InlineShoppingBagManager.getInstance().updateSavedItemsLabel();
		},
		error: function (jqXHR, status, error)
		{

		}
	});			
}

InlineShoppingBagManager.prototype.addToShoppingBag = function (primarySku, skuQtyArray, description, price, selectedSku, source) {

	var parent = this;
	var query = window.location.search.split("?").join("");
	var mcat = URLFactory.extractQueryStringValue(query, "mcat");
	var cid = URLFactory.extractQueryStringValue(query, "cid");
	if (typeof source != "undefined" && source == "digitalCatalogList") {
		var productData = StateModel.getInstance().custom.tooltipCatalogDataLookup[primarySku];
		if (productData.IsGroup.toLowerCase() == "true") {
			var groupData = StateModel.getInstance().custom.tooltipCatalogDataLookup[primarySku];
		} else {
			var groupData = null;
		}
	} else {
		var productData = StateModel.getInstance().getProduct(primarySku);
		var tooltipGroupDataLookup = StateModel.getInstance().custom.tooltipGroupDataLookup;
		var groupData = (typeof (tooltipGroupDataLookup[primarySku]) != "undefined") ? tooltipGroupDataLookup[primarySku].d : null;
	}
	var itemProperties = {};
	var url = "";
	var data = "";
	var qty = 0;
	var message = "This item has been added to your shopping bag.";
	var links = "";
	var skuQuantityArr = [];
	var isEngravable = (productData.IsServiceable != null && productData.IsServiceable.toLowerCase() == "true") ? true : false;
	var origin = (typeof ORDER_ORIGINATION != undefined) ? ORDER_ORIGINATION : 1;

	if (groupData != null && groupData.GroupTypeID == "1") {
		// For group type 1 SKUs, the IsServiceable property in the property data isn't accurate, use the group data instead.
		if (groupData.SKUList != null && groupData.SKUList.length > 0 && typeof (selectedSku) != "undefined" && selectedSku != null) {
			for (var i = 0; i < groupData.SKUList.length; i++) {
				if (groupData.SKUList[i].Sku == selectedSku) {
					isEngravable = (groupData.SKUList[i].IsServiceable != null && groupData.SKUList[i].IsServiceable.toLowerCase() == "true") ? true : false;
					break;
				}
			}
		}
	}
	if (groupData != null && groupData.GroupTypeID == "2") {
		// For group type 2 SKUs, the IsServiceable property in the property data isn't accurate, use the group data instead.
		if (groupData.SKUList != null && groupData.SKUList.length > 0) {
			for (var i = 0; i < groupData.SKUList.length; i++) {
				if (groupData.SKUList[i].IsServiceable != null && groupData.SKUList[i].IsServiceable.toLowerCase() == "true") {
					isEngravable = true;
					break;
				}
			}
		}
		if (isEngravable == false && groupData.Group != null && groupData.Group.SKUList != null && groupData.Group.SKUList.length > 0 && typeof (selectedSku) != "undefined" && selectedSku != null) {
			for (var i = 0; i < groupData.Group.SKUList.length; i++) {
				if (groupData.Group.SKUList[i].Sku == selectedSku) {
					isEngravable = (groupData.Group.SKUList[i].IsServiceable != null && groupData.Group.SKUList[i].IsServiceable.toLowerCase() == "true") ? true : false;
					break;
				}
			}
		}		
	}

	//this.addToBagTimeout = true;
	clearTimeout(this.addToBagTimeout);
	this.addToBagTimeout = null;

	if (isEngravable == true && typeof (getLinkEngravingParams) != "undefined") {
	    $("#grid-popup").hide();
	    $("#grid-popup a.add").css('opacity', 1.0);
		OverlayManager.getInstance().open("engraving", {
			url: '/Shopping/Engraving.aspx?' + getLinkEngravingParams(primarySku, source),
			size: 'wide'
		});
	}
	else {
		itemProperties.name = description;
		itemProperties.price = price;
		itemProperties.qty = 0;

		$("#grid-popup .error").html("");

		$(".open-bag, .open-saved, .open-rings").removeClass("selected");

		if (skuQtyArray.length == 1) {
			url = '/Default.aspx/AddShoppingBagItem';
			itemProperties.qty = skuQtyArray[0].qty;
			mcat = (mcat == "") ? 0 : mcat;
			cid = (cid == "") ? 0 : cid;
			data = '{"sku":"' + skuQtyArray[0].sku + '", "quantity":"' + skuQtyArray[0].qty + '", "selectedSku":"' + selectedSku + '", "strSkuAndQuantity":"' + skuQtyArray[0].sku + ':' + skuQtyArray[0].qty + '", "cid":' + cid + ', "mcid":' + mcat + ', "origin":'+origin+', "cat_id":"", "cat_item_id":"", "p_cat_id":"", "p_cat_item_id":""}'
		}
		else if (skuQtyArray.length > 1) {
			url = '/Default.aspx/AddMultipleShoppingBagItems';
			for (var i = 0; i < skuQtyArray.length; i++) {
				itemProperties.qty = skuQtyArray[0].qty;
				skuQuantityArr.push(skuQtyArray[i].sku + ":" + skuQtyArray[i].qty);
			}
			mcat = (mcat == "") ? 0 : mcat;
			cid = (cid == "") ? 0 : cid;
			data = '{"strSku":"' + primarySku + '", "selectedSku":"' + selectedSku + '", "strSkuAndQuantity":"' + skuQuantityArr.join(";") + '", "cid":' + cid + ', "mcid":' + mcat + ', "origin":'+origin+', "cat_id":"", "cat_item_id":"", "p_cat_id":"", "p_cat_item_id":""}'
		}

		if (skuQtyArray.length > 0) {
			$.ajax({
				url: url,
				type: 'POST',
				cache: false,
				data: data,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function (data) {
					if (typeof (data.d.SuccessFlag) == "undefined" || data.d.SuccessFlag == "False") {
						// Error handling goes here
					    $("#saved").fadeOut(300);
						if (source != "digitalCatalogList") {
							$("#grid-popup a.add").text($("#grid-popup a.add").attr("data-old-label")).attr("href", $("#grid-popup a.add").attr("data-old-url"));
						} else {
							$(".digital-catalog-item[data-sku="+primarySku+"] a.add").text($(".digital-catalog-item[data-sku="+primarySku+"] a.add").attr("data-old-label")).attr("href", $(".digital-catalog-item[data-sku="+primarySku+"] a.add").attr("data-old-url"));
						}
						$(".open-bag, .open-saved, .open-rings").removeClass("selected");
						for (var i = 0; i < data.d.SKUStatus.length; i++) {
							var errorMsg = "Error";
							try {
								errorMsg = eval(data.d.SKUStatus[i].StatusMessage);								
							} catch (e) {
							}							
							if (data.d.SKUStatus[i].StatusMessage == "ERROR_NEW_QUANTITY") {
								errorMsg = errorMsg.split("{0}").join(data.d.SKUStatus[i].OrderLimit);
							}
							$("#error_" + data.d.SKUStatus[i].SKU).html(errorMsg);
						}
					}
					else {
						CookieManager.setCookieValue("shoppingbagcnt", data.d.BagCount);
						itemProperties.img = data.d.Image;
						parent.updateShoppingBagLabel();
						$("#saved-content").removeClass("saved rings").addClass("sb");
						//parent.updateInlineCustomerSelections(itemProperties, message, links, data.d.BagCount);
						parent.updateInlineCustomerSelections(data.d.SKUStatus, data.d.Image);
						
						// Tracking
						var pageId = $("body").attr("id");
						var argItem = ";";
						if (productData.IsGroup != null && productData.IsGroup.toLowerCase() == "true" && groupData != null) {
							if (groupData.GroupTypeID == "2" && groupData.SKUList != null && groupData.SKUList.length > 0) {
								argItem += groupData.Name.replace(/<[^<>]+>|##/g," ").replace(/[,:'"-]/g,"").replace("™","(TM)").replace("®","(R)")+"-"+selectedSku+":"+groupData.DefaultSku;
							} else {
								argItem += description.replace(/<[^<>]+>|##/g," ").replace(/[,:'"-]/g,"").replace("™","(TM)").replace("®","(R)")+"-"+selectedSku;
							}
						} else {
							argItem += description.replace(/<[^<>]+>|##/g," ").replace(/[,:'"-]/g,"").replace("™","(TM)").replace("®","(R)")+"-"+primarySku;
						}
						if (pageId == "categoryBrowsePage") {
							if (typeof source != "undefined" && source == "digitalCatalogList") {
								TrackActionAddToShoppingBag("Digital Catalogue", "Add to ShoppingBag",argItem);
							} else if (URLFactory.extractQueryStringValue(query, "search") == 1) {
								TrackActionAddToShoppingBag("Search Results Grid", "Add to ShoppingBag",argItem);
							} else {
								TrackActionAddToShoppingBag("Category Browse", "Add to ShoppingBag",argItem);
							}
						} else if (pageId == "itemPage") {
							TrackActionAddToShoppingBag("Item Page Grid", "Add to ShoppingBag",argItem);
						}
					}
					
					//IBM BT # 9861 Error message is shown while adding an item to the Shopping Bag.
					if (locale.toLowerCase() == "en-us-trade" || locale.toLowerCase() == "ja-jp-trade") {
						$("#grid-popup a.add").text(LABEL_GO_TO_SHOPPING_BAG).attr("href", "/Trade/Customer/ShoppingBag.aspx?isMenu=1&").removeClass("add-to-bag");
					}
					else {
						if (source != "digitalCatalogList") {
							$("#grid-popup a.add").text(LABEL_GO_TO_SHOPPING_BAG).attr("href", "/Customer/ShoppingBag.aspx?isMenu=1&").removeClass("add-to-bag");
						} else {
							$(".digital-catalog-item[data-sku="+primarySku+"] a.add").text(LABEL_GO_TO_SHOPPING_BAG).attr("href", "/Customer/ShoppingBag.aspx?isMenu=1&").removeClass("add-to-bag");
						}
					}
					$("#grid-popup a.add").css('opacity',1.0);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					$("#grid-popup .error.master").html(LABEL_ITEM_NOT_ADDED);
					$("#saved").fadeOut(300);
					$("#grid-popup a.add").text($("#grid-popup a.add").attr("data-old-label")).attr("href", $("#grid-popup a.add").attr("data-old-url"));
					$(".open-bag, .open-saved, .open-rings").removeClass("selected");
					//IBM BT # 9861 Error message is shown while adding an item to the Shopping Bag.
					$("#grid-popup a.add").css('opacity',1.0);
					// window.location = "/Shopping/Item.aspx?fromGrid=1&sku=" + primarySku + "&mcat=&cid=&errorCode=ERROR_HTTP_500&search_params=" + document.location.hash.split("#").join("");
				}
			});
		}

		centerGridText();
	}

};

InlineShoppingBagManager.prototype.addToSavedItems = function (primarySku, skuQtyArray, description, price, selectedSku) {

	var parent = this;
	var query = window.location.search.split("?").join("");
	var mcat = URLFactory.extractQueryStringValue(query, "mcat");
	var cid = URLFactory.extractQueryStringValue(query, "cid");
	var productData = StateModel.getInstance().getProduct(primarySku);
	var itemProperties = {};
	var url = "";
	var data = "";
	var qty = 0;
	var skuArray = [];
	var qtyArray = [];
	var message = "This item has been added to your wish list.";
	var links = "";
	var skuQuantityArr = [];
	var priceMarket = "1";
	var trackingSku;
	//this.addToBagTimeout = true;
	clearTimeout(this.addToBagTimeout);
	this.addToBagTimeout = null;

	itemProperties.name = description;
	itemProperties.price = price;
	itemProperties.qty = 0;

	$(".open-bag, .open-saved, .open-rings").removeClass("selected");

	if (skuQtyArray.length == 1) {
		if (primarySku == skuQtyArray[0].sku) {
			trackingSku = primarySku;
		} else {
			trackingSku = primarySku + ":" + skuQtyArray[0].sku;
		}
		itemProperties.qty = skuQtyArray[0].qty;
		mcat = (mcat == "") ? 0 : mcat;
		cid = (cid == "") ? 0 : cid;
		//updated for IBM BT#9517
		if (locale.toLowerCase() == "en-us-pkb" && ($("#chkShowEInfo").length == 0 || $("#chkShowEInfo").attr("checked") == "checked")) {
			/*
			if (CookieManager.getCookieValue("pkbPriceCurrency") != null) {
				priceMarket = CookieManager.getCookieValue("pkbPriceCurrency");
			}
			*/
			url = '/Default.aspx/AddPKBSavedItem';
			data = '{"sku":"' + primarySku + '", "selectedSku":"' + skuQtyArray[0].sku + '", "cid":' + cid + ', "mcid":' + mcat + ', "qty":"1", "priceMarketID":"' + PKB_PRICMARKETID + '"}'
		}
		else {
			url = '/Default.aspx/AddSavedItem';
			data = '{"sku":"' + primarySku + '", "selectedSku":"' + skuQtyArray[0].sku + '", "cid":' + cid + ', "mcid":' + mcat + ', "qty":"1"}'
		}
	}
	else if (skuQtyArray.length > 1) {
		trackingSku = primarySku + ":" + selectedSku;
		url = '/Default.aspx/AddMultipleSavedItems';
		for (var i = 0; i < skuQtyArray.length; i++) {
			itemProperties.qty = skuQtyArray[0].qty;
			skuArray.push(skuQtyArray[i].sku);
			qtyArray.push(skuQtyArray[i].qty);
		}
		mcat = (mcat == "") ? 0 : mcat;
		cid = (cid == "") ? 0 : cid;
		data = '{"sku":"' + primarySku + '", "selectedSku":"' + selectedSku + '", "strSkuList":"' + skuArray.join(":") + '", "cid":' + cid + ', "mcid":' + mcat + ', "qtyList":"' + qtyArray.join(":") + '"}'
	}
	
	// Tracking
	var pageId = $("body").attr("id");
	if (pageId == "categoryBrowsePage") {
		if (typeof source != "undefined" && source == "digitalCatalogList") {
			TrackActionAddToSavedItems("Digital Catalogue", "Add to SavedItems", trackingSku);
		} else if (URLFactory.extractQueryStringValue(query, "search") == 1) {
			TrackActionAddToSavedItems("Search Results Grid", "Add to SavedItems", trackingSku);
		} else {
			TrackActionAddToSavedItems("Category Browse", "Add to SavedItems", trackingSku);
		}
	} else if (pageId == "itemPage") {
		TrackActionAddToSavedItems("Item Page Grid", "Add to SavedItems", trackingSku);
	}	

	if (skuQtyArray.length > 0) {
		$.ajax({
			url: url,
			type: 'POST',
			cache: false,
			data: data,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
			    if (typeof (data.d.SuccessFlag) == "undefined" || data.d.SuccessFlag == false || data.d.SuccessFlag == "False") {
				    $("#saved").fadeOut(300);
					$("#grid-popup a.save").text($("#grid-popup a.save").attr("data-old-label")).attr("href", $("#grid-popup a.save").attr("data-old-url"));
					$(".open-bag, .open-saved, .open-rings").removeClass("selected");
					for (var i = 0; i < data.d.SKUStatus.length; i++) {
						$("#error_" + data.d.SKUStatus[i].SKU).html(data.d.SKUStatus[i].StatusMessage);
					}
				}
				else {
					CookieManager.setCookieValue("saveditemscnt", data.d.BagCount);
					itemProperties.img = data.d.Image;
					// TCO BT# 11244 - Updating label is done at method updateInlineCustomerSelections
					$("#saved-content").removeClass("sb rings").addClass("saved");
					//parent.updateInlineCustomerSelections(itemProperties, message, links, data.d.BagCount);
					//IBM BT #9818: Saved count is not incremented after adding to saved.
					parent.updateSavedItemsLabel();
					parent.updateInlineCustomerSelections(data.d.SKUStatus, data.d.Image);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$("#grid-popup .error.master").html(LABEL_ITEM_NOT_ADDED);
				$("#saved").fadeOut(300);
				$("#grid-popup a.save").text($("#grid-popup a.save").attr("data-old-label")).attr("href", $("#grid-popup a.save").attr("data-old-url"));
				$(".open-bag, .open-saved, .open-rings").removeClass("selected");
			}
		});
	}

	centerGridText();
};

InlineShoppingBagManager.prototype.updateInlineCustomerSelections = function(SKUStatus, imagePath) {
	if (typeof showInlineBags != "undefined" && showInlineBags === false) {
		$("#confirmImage").attr("src",templateStrings.baseScene7ImageURL+imagePath);
		if ($("#saved-content").hasClass("sb")) {
			$("#confirmMessage").html(LABEL_CONFIRM_ADD_TO_BAG);
		} else {
			$("#confirmMessage").html(LABEL_CONFIRM_ADD_TO_WISHLIST);
		}
		$("#addConfirmation").css("opacity",1).show();
		setTimeout(function(){
			$("#addConfirmation").fadeTo(200,0,function(){$(this).hide();});
		}, 2000);
		return;
	}
	newlyAddedItemsArr = [];
	for (var i = 0; i < SKUStatus.length; i++) {
		var bagId = SKUStatus[i].ItemID;
		newlyAddedItemsArr[i] = bagId;
	}
	initInlineBag();
	if ($("#saved-content").hasClass("sb")) {
		$(".open-bag").addClass("selected");
	} else {
		$(".open-saved").addClass("selected");
	}
	$("#saved:hidden").fadeIn(300);
}

InlineShoppingBagManager.prototype.updateSavedItemsLabel = function () {
	var count = CookieManager.getCookieValue("saveditemscnt");
	if (count != null && count != "0" && count != "") {
		$("#spanSavedItemCount").html("(" + count + ")");
	}
	else {
		$("#spanSavedItemCount").html("");
	}
};

InlineShoppingBagManager.prototype.updateShoppingBagLabel = function () {
	var count = CookieManager.getCookieValue("shoppingbagcnt");
	if (count != null && count != "0" && count != "") {
		$("#spanShoppingBagCount").html("(" + count + ")");
	}
	else {
		$("#spanShoppingBagCount").html("");
	}
};

/* End of ShoppingBagManager.js */
// digitalCatalog.js

var miniPDPInit = false;

function initDigCatalogList(tile) {
	getDigCatalogList($(tile).attr("id"));
	if ($("body").hasClass("ios") &&  $(tile).find(".video1").is(":visible")) {
		var video1 = $(tile).find(".video1")[0];
		var video2 = $(tile).find(".video2")[0];
		video1.play();
		video2.play();
		setTimeout(function(){
			video2.pause();
			$(video2).hide();
			video1.play();
		}, 1);
		$(video1).bind("ended", function(){
			$(video2).show();
			$(video1).hide();
			video2.play();
		});
	}	
}

function getDigCatalogList(tileId) {
	var model = StateModel.getInstance();
	var tooltipCatalogDataLookup = model.custom.tooltipCatalogDataLookup;
	if ($("#digital-catalog-overlay").length > 0) {
		$(".digital-catalog-item .grouping .error").html("");
		$(".digital-catalog-item a.add").each(function() {
			if (typeof $(this).attr("data-old-label") != "undefined") {
				$(this).text($(this).attr("data-old-label"));
			}
			if (typeof $(this).attr("data-old-url") != "undefined") {
				$(this).attr("href", $(this).attr("data-old-url"));
			}			
		});
		$("#digital-catalog-overlay").fadeIn(200);
	} else {
		renderCatalogShopList(tileId);
		$.ajax({
			url: "/Shopping/CategoryBrowse.aspx/GetDigCatalogueData",
			type: "POST",
			data: '{"digCatalogueItems":'+digitalCatalogTileData+'}',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				if (data.d != null) {
					for (var i=0; i < data.d.length; i++) {
					    if (data.d[i] != null && data.d[i].isAvailable.toLowerCase() != "false") {
							tooltipCatalogDataLookup[data.d[i].Sku] = data.d[i];
							$("#digital-catalog-overlay").find(".rollbar").append(renderCatalogShopListItem(data.d[i]));
						}
					}
					$("#digital-catalog-overlay .list .loading").remove();
					applyCustomDropdown();
					initRollbar();
				}
			},
			error: function (jqXHR, status, error) {
		
			}
		});
	}			
}
function renderCatalogShopList(tileId) {
	var tempHTML = $('<div id="digital-catalog-overlay" style="display: none"><div class="list"><hr class="small" /><h3 class="">'+$("#"+tileId+" .btnShop a").text()+'</h3><a href="#" class="close">&times;<br /></a><div class="rollbar"><img class="loading" src="/shared/images/loading.gif" /></div></div><div class="miniPDP"></div></div>');
	$("#"+tileId).append(tempHTML);
	tempHTML.fadeIn(200);
	setTimeout(function(){
		$("#digital-catalog-overlay .list .loading").show();
	}, 500);
}
	
function renderCatalogShopListItem(productData) {
	//var contentHTML = templateStrings.tooltipGroupItemTemplate.split("$description$").join(desc).split("$setsLabel$").join("");
	//var isEngagementItem = ($("#engagementItemPage").length > 0) ? true : false;
	//var isItemDesignPage = $("#StatementItemPage").length == 1;
		
	var itemHTML = $(templateStrings.catalogListItemHTML);
		
	var sku = productData.Sku;

	var desc = (productData.Name == null) ? "" : productData.Name;
	var price = productData.Price;
	var showPrice = productData.ShowPrice;
	var wholesalePrice = productData.Wholesaleprice;
	var selectedSku = productData.DefaultSku;
	var isPurchasable = (productData.isPurchasable != null && productData.isPurchasable.toLowerCase() == "true") ? true : false;
	var isEngravable = (productData.IsServiceable != null && productData.IsServiceable.toLowerCase() == "true") ? true : false;
	var isSaveForLaterVisible = (productData.ShowAddtoWishList == null || (productData.ShowAddtoWishList != null && productData.ShowAddtoWishList.toLowerCase() == "true")) ? true : false;
	var isSaveForLaterEnabled = (productData.isSaveForLaterEnabled != null && productData.isSaveForLaterEnabled.toLowerCase() == "true") ? true : false;	

	var query = window.location.search.split("?").join("");
	var mcat = URLFactory.extractQueryStringValue(query, "mcat");
	var cid = URLFactory.extractQueryStringValue(query, "cid");
	var state = URLFactory.convertStateToServiceHash(StateModel.getInstance().pBrowseState);
	var isSearch = URLFactory.extractQueryStringValue(query, "search") == 1?1:0;
	var origin = URLFactory.extractQueryStringValue(query, "search") == 1 ? "search" : "browse";
	var searchKeyword = encodeURIComponent(StateModel.getInstance().getStateSnapshot().searchTerms);

	var contentHTML = templateStrings.tooltipGroupItemTemplate.split("$description$").join(desc).split("$setsLabel$").join("");		
	var itemURL = '/Shopping/DigiCatMiniPDP.aspx?fromGrid=1&sku=' + sku + '&mcat=' + mcat + '&cid=' + cid + '&search_params=' + state + "&search=" + isSearch + "&origin=" + origin + "&searchkeyword=" + searchKeyword;
	var isInformational = false;
	
	switch (locale.toLowerCase()) {
		case "zh-cn":
		case "zh-hant":
		case "intl":
		case "es-mx":
		case "ko-kr":
		case "pt-br":
		case "ru-ru":
			isInformational = true;
	}	
	
	if (locale.toLowerCase() == "en-us-estr" || locale.toLowerCase() == "ja-jp-estr") {
		isSaveForLaterVisible = false;
	}

	if (CookieManager.areCookiesEnabled() == false) {
		isSaveForLaterVisible = false;
		isPurchasable = false;
	}

	if (productData.IsGroup != null && productData.IsGroup.toLowerCase() == "false") {
		if (typeof productData.ShowPrice != "undefined" && productData.ShowPrice != null && productData.ShowPrice.toLowerCase() == "false") {
			contentHTML = contentHTML.split("$price$").join("").split("$id$").join(sku);
		} else {
			contentHTML = contentHTML.split("$price$").join(price).split("$id$").join(sku);
		}
		$(itemHTML).find(".info").prepend(contentHTML);	
	} else {
		$(itemHTML).find(".info").prepend(renderCatalogGroupHTML(productData));
		$(itemHTML).find(".info option[value='" + selectedSku + "']").attr('selected', true);
		$(itemHTML).find("select").parent().attr("id","digitalCatalogSelect_"+sku);
	}
	$(itemHTML).find(".grouping:last").after(templateStrings.digCatalogViewDetails);
		
	$(itemHTML).find(".image img").attr("src",templateStrings.baseScene7ImageURL+productData.ImgURL+"?$EcomBrowseM$");		
		
	$(itemHTML).find(".info > a.add").text(LABEL_ADD_TO_SHOPPING_BAG).attr("href", "#").addClass("add-to-bag");
	$(itemHTML).find(".info a.save").html('<span class="plus">+</span> ' + LABEL_ADD_TO_SAVED_ITEMS).attr("href", "#").addClass("add-to-saved");
				 
	$(itemHTML).find(".details").attr("href", itemURL);
	$(itemHTML).find(".image a").attr("href", itemURL);
	$(itemHTML).find(".save").attr("href", 'javascript:handleSaveForLater("' + sku + '", "digitalCatalogList")');
	$(itemHTML).find(".add").attr("href", 'javascript:handleAddToShoppingBag("' + sku + '", "digitalCatalogList")');
	$(itemHTML).find(".emailMe").attr("href", 'javascript:handleEmailWhenAvailable("' + sku + '", "digitalCatalogList")');

	if (isPurchasable == false) {
		$(itemHTML).find(".add").hide();
		if (productData.ShowEmailWhenAvailable == true) {
			$(itemHTML).find(".out-of-stock").show();
			$(itemHTML).find(".emailMe").show();
		} else {
			$(itemHTML).find(".out-of-stock").hide();
			$(itemHTML).find(".emailMe").hide();
		}
	}
	else {
		$(itemHTML).find(".add").show();
		$(itemHTML).find(".out-of-stock").hide();
		$(itemHTML).find(".emailMe").hide();
	}
	if (isInformational == true) {
		$(itemHTML).find(".findStores").show();
		$(itemHTML).find(".add").hide();
	} else {
		$(itemHTML).find(".findStores").hide();
	}

	if (isSaveForLaterVisible == false) {
		$("#grid-popup .add-to-saved").hide();
		$("#grid-popup .item-links .slash").hide();
	}
	else {
		$("#grid-popup .add-to-saved").show();
		$("#grid-popup .item-links .slash").show();
	}		
		
	itemHTML.attr("data-sku",sku);
	return itemHTML;
}
function renderCatalogGroupHTML(productData) {
	var i, n;
	var itemHTML = "";
	var groupHTML = "";
	var selectHTML = "";
	var outputHTML = "";
	var isInformational = false;
	var showPrice = true;
	var showDropdown = (productData.ShowType1Dropdown != null)?productData.ShowType1Dropdown:true;
	var price = "";
	var crop = "";
	var sharpen = "";
		
	if (typeof (productData.Crop) != "undefined" && productData.Crop != null && productData.Crop != "") {
		crop = productData.Crop;
	}
	else {
		crop = templateStrings.defaultScene7Crop;
	}

	if (typeof (productData.Sharpen) != "undefined" && productData.Sharpen != null && productData.Sharpen != "") {
		sharpen = productData.Sharpen;
	}		


	if (productData.GroupTypeID == "7") {
		price = productData.SKUList[0].Price;
	} else {
		price = productData.Price;
	}

	if (price == null) {price = "";}

	switch (locale.toLowerCase()) {
		case "zh-cn":
		case "zh-hant":
		case "intl":
		case "es-mx":
		case "ko-kr":
		case "pt-br":
			isInformational = true;
	}

	if (typeof productData.ShowPrice != "undefined" && productData.ShowPrice != null && productData.ShowPrice.toLowerCase() == "false") {
		showPrice = false;
		price = "";
	}

	if (productData.GroupTypeID == "1") {
		// Group 1 SKUs have one description and price, plus a drop-down menu.
		if (productData.SKUList != null) {
			itemHTML = templateStrings.tooltipGroupItemTemplate.split("$description$").join(productData.Name).split("$price$").join(price).split("$setsLabel$").join("");
			groupHTML = templateStrings.tooltipGroupTemplate;

			if (productData.SKUList.length > 0 && productData.SKUList[0].LinkText != null && showDropdown != false) {
				if (productData.IsColorSwatch != null && productData.IsColorSwatch.toLowerCase() == "true") {
					groupHTML = groupHTML.split("$isColorSwatch$").join("color");
					selectHTML = '<select class="l1" data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
					for (i = 0, n = productData.SKUList.length; i < n; i++) {
						// Handle each item
						//data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
						selectHTML += '<option value="' + productData.SKUList[i].Sku + '" data-price="' + productData.SKUList[i].Price + '" data-showprice="' + productData.SKUList[i].ShowPrice + '" data-sku="' + productData.SKUList[i].Sku + '" data-description="' + escape(productData.SKUList[i].Name) + '" data-image="' + productData.SKUList[i].ImgURL + '" data-is-purchasable="' + productData.SKUList[i].isPurchasable + '" data-show-email-when-available="' + productData.SKUList[i].ShowEmailWhenAvailable + '" data-swatch="' + productData.SKUList[i].SwatchFile + '" data-save-visible="' + productData.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + productData.SKUList[i].Wholesaleprice + '">' + productData.SKUList[i].LinkText + '</option>';
					}
					selectHTML += '</select>';
				}
				else {
					selectHTML = '<select data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
					for (i = 0, n = productData.SKUList.length; i < n; i++) {
						// Handle each item
						//data-showprice attribute is added to handle scenarios for group type 2 with group type 1
						selectHTML += '<option value="' + productData.SKUList[i].Sku + '" data-price="' + productData.SKUList[i].Price + '" data-showprice="' + productData.SKUList[i].ShowPrice + '" data-sku="' + productData.SKUList[i].Sku + '" data-description="' + escape(productData.SKUList[i].Name) + '" data-image="' + productData.SKUList[i].ImgURL + '" data-is-purchasable="' + productData.SKUList[i].isPurchasable + '" data-show-email-when-available="' + productData.SKUList[i].ShowEmailWhenAvailable + '" data-save-visible="' + productData.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + productData.SKUList[i].Wholesaleprice + '">' + productData.SKUList[i].LinkText + '</option>';
					}
					selectHTML += '</select>';
				}
			}
			groupHTML = groupHTML.split("$select$").join(selectHTML);
			if (showDropdown != false) {
				groupHTML = groupHTML.split("$label$").join((productData.MenuLabel != null) ? productData.MenuLabel : "");
			}
			else {
				groupHTML = groupHTML.split("$label$").join("");
			}
			outputHTML = itemHTML + groupHTML;
		}
	}
	else if (productData.GroupTypeID == "2") {
		// Group 2 SKUs have two or more descriptions and prices, plus one drop-down menu
		if (productData.Group != null) {
			if (productData.Group.SKUList != null) {

				if (showPrice)
					price = productData.Group.Price;
				else
					price = "";

				groupHTML = templateStrings.tooltipGroupType2Template.split("$description$").join(productData.Group.Name).split("$price$").join(price).split("$id$").join(productData.Group.Sku);

				if (productData.Group.SKUList.length > 0 && productData.Group.SKUList[0].LinkText != null && showDropdown != false) {
					if (productData.IsColorSwatch != null && productData.IsColorSwatch.toLowerCase() == "true") {
						groupHTML = groupHTML.split("$isColorSwatch$").join("");
						selectHTML = '<select class="l1" data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
						for (i = 0, n = productData.Group.SKUList.length; i < n; i++) {
							// Handle each item
							//data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
							if (productData.Group.SKUList[i].Price == null) { productData.Group.SKUList[i].Price = ""; }
							selectHTML += '<option value="' + productData.Group.SKUList[i].Sku + '" data-price="' + productData.Group.SKUList[i].Price + '" data-showprice="' + productData.Group.SKUList[i].ShowPrice + '" data-sku="' + productData.Group.SKUList[i].Sku + '" data-description="' + escape(productData.Group.SKUList[i].Name) + '" data-image="' + productData.Group.SKUList[i].ImgURL + '" data-is-purchasable="' + productData.Group.SKUList[i].isPurchasable + '" data-show-email-when-available="' + productData.Group.SKUList[i].ShowEmailWhenAvailable + '" data-swatch="' + productData.Group.SKUList[i].SwatchFile + '" data-save-visible="' + productData.Group.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + productData.Group.SKUList[i].Wholesaleprice + '">' + productData.Group.SKUList[i].LinkText + '</option>';
						}
						selectHTML += '</select>';
					}
					else {
						selectHTML = '<select data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
						for (i = 0, n = productData.Group.SKUList.length; i < n; i++) {
							// Handle each item
							//data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
							if (productData.Group.SKUList[i].Price == null) { productData.Group.SKUList[i].Price = ""; }
							selectHTML += '<option value="' + productData.Group.SKUList[i].Sku + '" data-price="' + productData.Group.SKUList[i].Price + '" data-showprice="' + productData.Group.SKUList[i].ShowPrice + '" data-sku="' + productData.Group.SKUList[i].Sku + '" data-description="' + escape(productData.Group.SKUList[i].Name) + '" data-image="' + productData.Group.SKUList[i].ImgURL + '" data-is-purchasable="' + productData.Group.SKUList[i].isPurchasable + '" data-show-email-when-available="' + productData.Group.SKUList[i].ShowEmailWhenAvailable + '" data-save-visible="' + productData.Group.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + productData.Group.SKUList[i].Wholesaleprice + '">' + productData.Group.SKUList[i].LinkText + '</option>';
						}
						selectHTML += '</select>';
					}
				}

				groupHTML = groupHTML.split("$select$").join(selectHTML);
				if (showDropdown != false) {
					groupHTML = groupHTML.split("$label$").join((productData.Group.MenuLabel != null) ? productData.Group.MenuLabel : "");
				}
				else {
					groupHTML = groupHTML.split("$label$").join("");
				}
			}
		}
		if (productData.SKUList != null) {
			for (i = 0, n = productData.SKUList.length; i < n; i++) {
				// Handle each item
				if (productData.SKUList[i].Price == null) { productData.SKUList[i].Price = ""; }

				//Add individual item price here. Based on show price, the price would be hidden in parent call
				//The price is required to be added as 
				price = productData.SKUList[i].Price;
					
				itemHTML += templateStrings.tooltipGroupItemTemplate.split("$description$").join(productData.SKUList[i].Name).split("$price$").join(price).split("$id$").join(productData.SKUList[i].Sku).split("$setsLabel$").join("");
			}
		}
		outputHTML = groupHTML + itemHTML;
	}
	else if (productData.GroupTypeID == "7") {
		if (productData.SKUList != null) {
			itemHTML = templateStrings.tooltipGroupItemTemplate.split("$description$").join(productData.Name).split("$price$").join(price);
			groupHTML = templateStrings.tooltipGroupTemplate;
			if (productData.SKUList.length > 0 && productData.SKUList[0].LinkText != null && showDropdown != false) {
				if (productData.IsColorSwatch != null && productData.IsColorSwatch.toLowerCase() == "true") {
					groupHTML = groupHTML.split("$isColorSwatch$").join("color");
					selectHTML = '<select class="l1" data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
					for (i = 0, n = productData.SKUList.length; i < n; i++) {
						// Handle each item
						//data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
						selectHTML += '<option value="' + productData.SKUList[i].Sku + '" data-price="' + productData.SKUList[i].Price + '" data-showprice="' + productData.SKUList[i].ShowPrice + '" data-sku="' + productData.SKUList[i].Sku + '" data-description="' + escape(productData.SKUList[i].Name) + '" data-image="' + productData.SKUList[i].ImgURL + '" data-is-purchasable="' + productData.SKUList[i].isPurchasable + '" data-show-email-when-available="' + productData.SKUList[i].ShowEmailWhenAvailable + '" data-swatch="' + productData.SKUList[i].SwatchFile + '" data-save-visible="' + productData.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + productData.SKUList[i].Wholesaleprice + '">' + productData.SKUList[i].LinkText + '</option>';
					}
					selectHTML += '</select>';
				}
				else {
					selectHTML = '<select data-crop="' + crop + '" data-sharpen="' + sharpen + '">';
					for (i = 0, n = productData.SKUList.length; i < n; i++) {
						// Handle each item
						//data-showprice attribute is added to handle scenarios for group type 2 with group type 1 
						selectHTML += '<option value="' + productData.SKUList[i].Sku + '" data-price="' + productData.SKUList[i].Price + '" data-showprice="' + productData.SKUList[i].ShowPrice + '" data-sku="' + productData.SKUList[i].Sku + '" data-description="' + escape(productData.SKUList[i].Name) + '" data-image="' + productData.SKUList[i].ImgURL + '" data-is-purchasable="' + productData.SKUList[i].isPurchasable + '" data-show-email-when-available="' + productData.SKUList[i].ShowEmailWhenAvailable + '" data-save-visible="' + productData.SKUList[i].ShowAddtoWishList + '" data-save-enabled="" data-wholesale="' + productData.SKUList[i].Wholesaleprice + '">' + productData.SKUList[i].LinkText + '</option>';
					}
					selectHTML += '</select>';
				}
			}

			if (productData.GroupSkuMultiple != null && productData.isPurchasable == true) {
				itemHTML = itemHTML.split("$setsLabel$").join(templateStrings.soldInSetsLabel.split("$n$").join(productData.GroupSkuMultiple));
			}
			else {
				itemHTML = itemHTML.split("$setsLabel$").join("");
			}

			groupHTML = groupHTML.split("$select$").join(selectHTML);
			if (showDropdown != false) {
				groupHTML = groupHTML.split("$label$").join((productData.MenuLabel != null) ? productData.MenuLabel : "");
			}
			else {
				groupHTML = groupHTML.split("$label$").join("");
			}
			outputHTML = itemHTML + groupHTML;
		}
	}
	return outputHTML;
}
	
function loadMiniPDP(url) {
	var itemPageFrame =  '<img class="loading" src="/shared/images/loading.gif" /><iframe src="'+url+'">hi</iframe>'
	$("#digital-catalog-overlay .miniPDP").html("").append(itemPageFrame);
	miniPDPInit = false;
	setTimeout(function(){
		if (miniPDPInit === false) {
			$("#digital-catalog-overlay .miniPDP .loading").show();
		}
	}, 500);		
}
	
function showMiniPDP(url) {
	if ($("#digital-catalog-overlay .miniPDP").is(":visible")) {
		loadMiniPDP(url);
	} else {
		$("#digital-catalog-overlay .list").animate({"min-width":"0"},100, function() {
			$("#digital-catalog-overlay .rollbar-content").css("overflow","hidden");
			$("#digital-catalog-overlay .digital-catalog-item").css("width", $("#digital-catalog-overlay .digital-catalog-item").width());
			$("#digital-catalog-overlay .list").animate({"width":"17%"},200, function() {
				$("#digital-catalog-overlay .list .info").slideUp(500, function() {
					$("#digital-catalog-overlay .image").css("width","98%");
					$("#digital-catalog-overlay .digital-catalog-item").css("width","auto");
					$("#digital-catalog-overlay .rollbar-content").css("overflow","visible");
				});
				//$("#digital-catalog-overlay .miniPDP").show("slide", { direction: "right" }, 500, "easeInOutQuad", function() {
				$("#digital-catalog-overlay .miniPDP").css("width","0").show().animate({width: "77%"},300, function() {
					loadMiniPDP(url);
				});
			});				
		});							
	}
}
	
function resetDigitalCatalog() {
	$("#digital-catalog-overlay .miniPDP").html("").hide();
	$("#digital-catalog-overlay .list").css( { "min-width": "370px","width":"33%" });
	$("#digital-catalog-overlay .image").css("width","48%");
	$("#digital-catalog-overlay .list .info").show();
	$("#digital-catalog-overlay .rollbar-handle, #digital-catalog-overlay .rollbar-content").css("top","0");
	$(".digital-catalog-item .image a").removeClass("active");
}
	
function initMiniPDPOverlay(contentHeight) {
	//var popUpHeight = $("#digital-catalog-overlay iframe").height();
	//console.log(contentHeight +" "+popUpHeight);
	//$("#digital-catalog-overlay iframe").height(contentHeight+20).css("margin-top",(popUpHeight - contentHeight)/2 +"px").animate({"opacity":"1"}, 500); 
	miniPDPInit = true;
	$("#digital-catalog-overlay .miniPDP .loading").hide();
	$("#digital-catalog-overlay iframe").animate({"opacity":"1"}, 500);
}

function getShopTileItems() {
	var model = StateModel.getInstance();
	var tooltipCatalogDataLookup = model.custom.tooltipCatalogDataLookup;
	var itemData = '[';
	var skuList = [];
	$(".shop-tile .shop-section a").each(function() {
		$(this).addClass("null");
		skuList[skuList.length] = '{"SKU": "'+$(this).attr("data-sku")+'", "TYPE": "N"}';
	});
	itemData += skuList.join(",");
	itemData += ']';
	$.ajax({
		url: "/Shopping/CategoryBrowse.aspx/GetDigCatalogueData",
		type: "POST",
		data: '{"digCatalogueItems":'+itemData+'}',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			if (data.d != null) {
				for (var i=0; i < data.d.length; i++) {
					if (data.d[i] != null && data.d[i].isAvailable.toLowerCase() != "false") {
						tooltipCatalogDataLookup[data.d[i].Sku] = data.d[i];
						$(".shop-tile .shop-section a[data-sku="+data.d[i].Sku+"]").removeClass("null");
					}
				}
			}
		},
		error: function (jqXHR, status, error) {
	
		}
	});	
}

function renderShopTileList(activeElem) {
	var activeListItem;
	$("#shop-tile-overlay").find(".rollbar").html("");
	$(activeElem).closest(".shop-section").find("a").each(function() {
		if (!$(this).hasClass("null")) {
			$("#shop-tile-overlay").find(".rollbar").append(renderShopTileListItem($(this).attr("data-sku") ));
		}
	});
	$("#shop-tile-overlay").show();
	$("#gray-overlay-shop-tile").show();
	initRollbar();
	$("#shop-tile-overlay").css("top", $(document).scrollTop() + (($(window).height() - $("#shop-tile-overlay").height())/2) + "px");
	activeListItem = $("#shop-tile-overlay").find(".shop-tile-item[data-sku="+$(activeElem).attr("data-sku")+"]")
	activeListItem.find(".image a").click();
	//activeListItem.closest(".rollbar-content").css("top", (activeListItem.position().top * -1) + "px");
	//updateRollbar(activeListItem.closest(".rollbar"));
	console.log((activeListItem.position().top+activeListItem.height())/activeListItem.closest(".rollbar-content").height());
	if ((activeListItem.position().top+activeListItem.height()) > activeListItem.closest(".rollbar").height()) {
		setTimeout(function() {
			activeListItem.closest(".rollbar").trigger('rollbar',(activeListItem.position().top+activeListItem.height())/(activeListItem.closest(".rollbar-content").height()*1.29));
		}, 1500);
	}
}

function renderShopTileListItem(sku) {
	var model = StateModel.getInstance();
	var tooltipCatalogDataLookup = model.custom.tooltipCatalogDataLookup;
	var productData = tooltipCatalogDataLookup[sku];
	var itemHTML = $('<div class="shop-tile-item" data-sku="32269427"><div class="image"><a href="#"><img alt="" src=""></a>\</div></div>');
		
	var sku = productData.Sku;

	var desc = (productData.Name == null) ? "" : productData.Name;
	var price = productData.Price;
	var showPrice = productData.ShowPrice;
	var wholesalePrice = productData.Wholesaleprice;
	var selectedSku = productData.DefaultSku;
	var isPurchasable = (productData.isPurchasable != null && productData.isPurchasable.toLowerCase() == "true") ? true : false;
	var isEngravable = (productData.IsServiceable != null && productData.IsServiceable.toLowerCase() == "true") ? true : false;
	var isSaveForLaterVisible = (productData.ShowAddtoWishList == null || (productData.ShowAddtoWishList != null && productData.ShowAddtoWishList.toLowerCase() == "true")) ? true : false;
	var isSaveForLaterEnabled = (productData.isSaveForLaterEnabled != null && productData.isSaveForLaterEnabled.toLowerCase() == "true") ? true : false;	

	var query = window.location.search.split("?").join("");
	var mcat = URLFactory.extractQueryStringValue(query, "mcat");
	var cid = URLFactory.extractQueryStringValue(query, "cid");
	var state = URLFactory.convertStateToServiceHash(StateModel.getInstance().pBrowseState);
	var isSearch = URLFactory.extractQueryStringValue(query, "search") == 1?1:0;
	var origin = URLFactory.extractQueryStringValue(query, "search") == 1 ? "search" : "browse";
	var searchKeyword = encodeURIComponent(StateModel.getInstance().getStateSnapshot().searchTerms);
		
	var itemURL = '/Shopping/DigiCatMiniPDP.aspx?shoptile=1&fromGrid=1&sku=' + sku + '&mcat=' + mcat + '&cid=' + cid + '&search_params=' + state + "&search=" + isSearch + "&origin=" + origin + "&searchkeyword=" + searchKeyword;
	
	$(itemHTML).find(".image img").attr("src",templateStrings.baseScene7ImageURL+productData.ImgURL+"?$EcomBrowseM$");		
		
	$(itemHTML).find(".image a").attr("href", itemURL);
	$(itemHTML).find(".save").attr("href", 'javascript:handleSaveForLater("' + sku + '", "digitalCatalogList")');
	$(itemHTML).find(".add").attr("href", 'javascript:handleAddToShoppingBag("' + sku + '", "digitalCatalogList")');	
		
	itemHTML.attr("data-sku",sku);
	return itemHTML;
}

function showShopTileMiniPDP(url) {
	var itemPageFrame =  '<img class="loading" src="/shared/images/loading.gif" /><iframe src="'+url+'">hi</iframe>'
	$("#shop-tile-overlay .miniPDP").html("").append(itemPageFrame);
	miniPDPInit = false;
	setTimeout(function(){
		if (miniPDPInit === false) {
			$("#digital-catalog-overlay .miniPDP .loading").show();
		}
	}, 500);		
}

function initSTMiniPDPOverlay(contentHeight) {
	miniPDPInit = true;
	$("#shop-tile-overlay .miniPDP .loading").hide();
	$("#shop-tile-overlay iframe").animate({"opacity":"1"}, 500);
}


/* End of digitalCatalog.js */

/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
{for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);

/* End of jquery-1.7.1.min.js */
/*!
 * jQuery UI 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(c,j){function k(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.9",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,
NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,
"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");
if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"),10);if(!isNaN(b)&&b!==0)return b}a=a.parent()}}return 0},disableSelection:function(){return this.bind((c.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});c.each(["Width","Height"],function(a,b){function d(f,g,l,m){c.each(e,function(){g-=parseFloat(c.curCSS(f,"padding"+this,true))||0;if(l)g-=parseFloat(c.curCSS(f,
"border"+this+"Width",true))||0;if(m)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c(this).css(h,d(this,f)+"px")})};c.fn["outer"+b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c(this).css(h,
d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){var b=a.nodeName.toLowerCase(),d=c.attr(a,"tabindex");if("area"===b){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&k(a)}return(/input|select|textarea|button|object/.test(b)?!a.disabled:"a"==b?a.href||!isNaN(d):!isNaN(d))&&k(a)},tabbable:function(a){var b=c.attr(a,"tabindex");return(isNaN(b)||b>=0)&&c(a).is(":focusable")}});
c(function(){var a=document.body,b=a.appendChild(b=document.createElement("div"));c.extend(b.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});c.support.minHeight=b.offsetHeight===100;c.support.selectstart="onselectstart"in b;a.removeChild(b).style.display="none"});c.extend(c.ui,{plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&
b[e][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)}})}})(jQuery);
;/*!
 * jQuery UI Widget 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)b(d).triggerHandler("remove");k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,
a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.charAt(0)==="_")return h;
e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,
this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},
widget:function(){return this.element},option:function(a,c){var d=a;if(arguments.length===0)return b.extend({},this.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(d,e){c._setOption(d,e)});return this},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},
enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
;/*!
 * jQuery UI Mouse 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(c){c.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(b){return a._mouseDown(b)}).bind("click."+this.widgetName,function(b){if(true===c.data(b.target,a.widgetName+".preventClickEvent")){c.removeData(b.target,a.widgetName+".preventClickEvent");b.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(a){a.originalEvent=
a.originalEvent||{};if(!a.originalEvent.mouseHandled){this._mouseStarted&&this._mouseUp(a);this._mouseDownEvent=a;var b=this,e=a.which==1,f=typeof this.options.cancel=="string"?c(a.target).parents().add(a.target).filter(this.options.cancel).length:false;if(!e||f||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){b.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=
this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();return true}}this._mouseMoveDelegate=function(d){return b._mouseMove(d)};this._mouseUpDelegate=function(d){return b._mouseUp(d)};c(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);a.preventDefault();return a.originalEvent.mouseHandled=true}},_mouseMove:function(a){if(c.browser.msie&&!(document.documentMode>=9)&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);
return a.preventDefault()}if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){c(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;a.target==this._mouseDownEvent.target&&c.data(a.target,this.widgetName+".preventClickEvent",
true);this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
;/*
 * jQuery UI Position 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c){c.ui=c.ui||{};var n=/left|center|right/,o=/top|center|bottom/,t=c.fn.position,u=c.fn.offset;c.fn.position=function(b){if(!b||!b.of)return t.apply(this,arguments);b=c.extend({},b);var a=c(b.of),d=a[0],g=(b.collision||"flip").split(" "),e=b.offset?b.offset.split(" "):[0,0],h,k,j;if(d.nodeType===9){h=a.width();k=a.height();j={top:0,left:0}}else if(d.setTimeout){h=a.width();k=a.height();j={top:a.scrollTop(),left:a.scrollLeft()}}else if(d.preventDefault){b.at="left top";h=k=0;j={top:b.of.pageY,
left:b.of.pageX}}else{h=a.outerWidth();k=a.outerHeight();j=a.offset()}c.each(["my","at"],function(){var f=(b[this]||"").split(" ");if(f.length===1)f=n.test(f[0])?f.concat(["center"]):o.test(f[0])?["center"].concat(f):["center","center"];f[0]=n.test(f[0])?f[0]:"center";f[1]=o.test(f[1])?f[1]:"center";b[this]=f});if(g.length===1)g[1]=g[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(b.at[0]==="right")j.left+=h;else if(b.at[0]==="center")j.left+=h/2;if(b.at[1]==="bottom")j.top+=
k;else if(b.at[1]==="center")j.top+=k/2;j.left+=e[0];j.top+=e[1];return this.each(function(){var f=c(this),l=f.outerWidth(),m=f.outerHeight(),p=parseInt(c.curCSS(this,"marginLeft",true))||0,q=parseInt(c.curCSS(this,"marginTop",true))||0,v=l+p+(parseInt(c.curCSS(this,"marginRight",true))||0),w=m+q+(parseInt(c.curCSS(this,"marginBottom",true))||0),i=c.extend({},j),r;if(b.my[0]==="right")i.left-=l;else if(b.my[0]==="center")i.left-=l/2;if(b.my[1]==="bottom")i.top-=m;else if(b.my[1]==="center")i.top-=
m/2;i.left=Math.round(i.left);i.top=Math.round(i.top);r={left:i.left-p,top:i.top-q};c.each(["left","top"],function(s,x){c.ui.position[g[s]]&&c.ui.position[g[s]][x](i,{targetWidth:h,targetHeight:k,elemWidth:l,elemHeight:m,collisionPosition:r,collisionWidth:v,collisionHeight:w,offset:e,my:b.my,at:b.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(i,{using:b.using}))})};c.ui.position={fit:{left:function(b,a){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();b.left=
d>0?b.left-d:Math.max(b.left-a.collisionPosition.left,b.left)},top:function(b,a){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();b.top=d>0?b.top-d:Math.max(b.top-a.collisionPosition.top,b.top)}},flip:{left:function(b,a){if(a.at[0]!=="center"){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();var g=a.my[0]==="left"?-a.elemWidth:a.my[0]==="right"?a.elemWidth:0,e=a.at[0]==="left"?a.targetWidth:-a.targetWidth,h=-2*a.offset[0];b.left+=
a.collisionPosition.left<0?g+e+h:d>0?g+e+h:0}},top:function(b,a){if(a.at[1]!=="center"){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();var g=a.my[1]==="top"?-a.elemHeight:a.my[1]==="bottom"?a.elemHeight:0,e=a.at[1]==="top"?a.targetHeight:-a.targetHeight,h=-2*a.offset[1];b.top+=a.collisionPosition.top<0?g+e+h:d>0?g+e+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(b,a){if(/static/.test(c.curCSS(b,"position")))b.style.position="relative";var d=c(b),
g=d.offset(),e=parseInt(c.curCSS(b,"top",true),10)||0,h=parseInt(c.curCSS(b,"left",true),10)||0;g={top:a.top-g.top+e,left:a.left-g.left+h};"using"in a?a.using.call(b,g):d.css(g)};c.fn.offset=function(b){var a=this[0];if(!a||!a.ownerDocument)return null;if(b)return this.each(function(){c.offset.setOffset(this,b)});return u.call(this)}}})(jQuery);
;/*
 * jQuery UI Draggable 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.draggable",d.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper==
"original"&&!/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position="relative";this.options.addClasses&&this.element.addClass("ui-draggable");this.options.disabled&&this.element.addClass("ui-draggable-disabled");this._mouseInit()},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();return this}},_mouseCapture:function(a){var b=
this.options;if(this.helper||b.disabled||d(a.target).is(".ui-resizable-handle"))return false;this.handle=this._getHandle(a);if(!this.handle)return false;return true},_mouseStart:function(a){var b=this.options;this.helper=this._createHelper(a);this._cacheHelperProportions();if(d.ui.ddmanager)d.ui.ddmanager.current=this;this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-
this.margins.top,left:this.offset.left-this.margins.left};d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this.position=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);b.containment&&this._setContainment();if(this._trigger("start",a)===false){this._clear();return false}this._cacheHelperProportions();
d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.helper.addClass("ui-draggable-dragging");this._mouseDrag(a,true);return true},_mouseDrag:function(a,b){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!b){b=this._uiHash();if(this._trigger("drag",a,b)===false){this._mouseUp({});return false}this.position=b.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||
this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);return false},_mouseStop:function(a){var b=false;if(d.ui.ddmanager&&!this.options.dropBehaviour)b=d.ui.ddmanager.drop(this,a);if(this.dropped){b=this.dropped;this.dropped=false}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return false;if(this.options.revert=="invalid"&&!b||this.options.revert=="valid"&&b||this.options.revert===true||d.isFunction(this.options.revert)&&
this.options.revert.call(this.element,b)){var c=this;d(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){c._trigger("stop",a)!==false&&c._clear()})}else this._trigger("stop",a)!==false&&this._clear();return false},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(a){var b=!this.options.handle||!d(this.options.handle,this.element).length?true:false;d(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==
a.target)b=true});return b},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a])):b.helper=="clone"?this.element.clone():this.element;a.parents("body").length||a.appendTo(b.appendTo=="parent"?this.element[0].parentNode:b.appendTo);a[0]!=this.element[0]&&!/(fixed|absolute)/.test(a.css("position"))&&a.css("position","absolute");return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||
0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-
(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment==
"parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[(a.containment=="document"?0:d(window).scrollLeft())-this.offset.relative.left-this.offset.parent.left,(a.containment=="document"?0:d(window).scrollTop())-this.offset.relative.top-this.offset.parent.top,(a.containment=="document"?0:d(window).scrollLeft())+d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a.containment=="document"?
0:d(window).scrollTop())+(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)&&a.containment.constructor!=Array){var b=d(a.containment)[0];if(b){a=d(a.containment).offset();var c=d(b).css("overflow")!="hidden";this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0)-this.margins.left,a.top+(parseInt(d(b).css("borderTopWidth"),
10)||0)+(parseInt(d(b).css("paddingTop"),10)||0)-this.margins.top,a.left+(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}}else if(a.containment.constructor==
Array)this.containment=a.containment},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():
f?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName),e=a.pageX,g=a.pageY;
if(this.originalPosition){if(this.containment){if(a.pageX-this.offset.click.left<this.containment[0])e=this.containment[0]+this.offset.click.left;if(a.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+this.offset.click.top;if(a.pageX-this.offset.click.left>this.containment[2])e=this.containment[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>this.containment[3])g=this.containment[3]+this.offset.click.top}if(b.grid){g=this.originalPageY+Math.round((g-this.originalPageY)/
b.grid[1])*b.grid[1];g=this.containment?!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g;e=this.originalPageX+Math.round((e-this.originalPageX)/b.grid[0])*b.grid[0];e=this.containment?!(e-this.offset.click.left<this.containment[0]||e-this.offset.click.left>this.containment[2])?e:!(e-this.offset.click.left<this.containment[0])?e-b.grid[0]:e+b.grid[0]:e}}return{top:g-this.offset.click.top-
this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop()),left:e-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");this.helper[0]!=
this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();this.helper=null;this.cancelHelperRemoval=false},_trigger:function(a,b,c){c=c||this._uiHash();d.ui.plugin.call(this,a,[b,c]);if(a=="drag")this.positionAbs=this._convertPositionTo("absolute");return d.Widget.prototype._trigger.call(this,a,b,c)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}});d.extend(d.ui.draggable,{version:"1.8.9"});
d.ui.plugin.add("draggable","connectToSortable",{start:function(a,b){var c=d(this).data("draggable"),f=c.options,e=d.extend({},b,{item:c.element});c.sortables=[];d(f.connectToSortable).each(function(){var g=d.data(this,"sortable");if(g&&!g.options.disabled){c.sortables.push({instance:g,shouldRevert:g.options.revert});g._refreshItems();g._trigger("activate",a,e)}})},stop:function(a,b){var c=d(this).data("draggable"),f=d.extend({},b,{item:c.element});d.each(c.sortables,function(){if(this.instance.isOver){this.instance.isOver=
0;c.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)this.instance.options.revert=true;this.instance._mouseStop(a);this.instance.options.helper=this.instance.options._helper;c.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",a,f)}})},drag:function(a,b){var c=d(this).data("draggable"),f=this;d.each(c.sortables,function(){this.instance.positionAbs=
c.positionAbs;this.instance.helperProportions=c.helperProportions;this.instance.offset.click=c.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=d(f).clone().appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return b.helper[0]};a.target=this.instance.currentItem[0];this.instance._mouseCapture(a,
true);this.instance._mouseStart(a,true,true);this.instance.offset.click.top=c.offset.click.top;this.instance.offset.click.left=c.offset.click.left;this.instance.offset.parent.left-=c.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=c.offset.parent.top-this.instance.offset.parent.top;c._trigger("toSortable",a);c.dropped=this.instance.element;c.currentItem=c.element;this.instance.fromOutside=c}this.instance.currentItem&&this.instance._mouseDrag(a)}else if(this.instance.isOver){this.instance.isOver=
0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",a,this.instance._uiHash(this.instance));this.instance._mouseStop(a,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();this.instance.placeholder&&this.instance.placeholder.remove();c._trigger("fromSortable",a);c.dropped=false}})}});d.ui.plugin.add("draggable","cursor",{start:function(){var a=d("body"),b=d(this).data("draggable").options;if(a.css("cursor"))b._cursor=
a.css("cursor");a.css("cursor",b.cursor)},stop:function(){var a=d(this).data("draggable").options;a._cursor&&d("body").css("cursor",a._cursor)}});d.ui.plugin.add("draggable","iframeFix",{start:function(){var a=d(this).data("draggable").options;d(a.iframeFix===true?"iframe":a.iframeFix).each(function(){d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1E3}).css(d(this).offset()).appendTo("body")})},
stop:function(){d("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)})}});d.ui.plugin.add("draggable","opacity",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("opacity"))b._opacity=a.css("opacity");a.css("opacity",b.opacity)},stop:function(a,b){a=d(this).data("draggable").options;a._opacity&&d(b.helper).css("opacity",a._opacity)}});d.ui.plugin.add("draggable","scroll",{start:function(){var a=d(this).data("draggable");if(a.scrollParent[0]!=
document&&a.scrollParent[0].tagName!="HTML")a.overflowOffset=a.scrollParent.offset()},drag:function(a){var b=d(this).data("draggable"),c=b.options,f=false;if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"){if(!c.axis||c.axis!="x")if(b.overflowOffset.top+b.scrollParent[0].offsetHeight-a.pageY<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop+c.scrollSpeed;else if(a.pageY-b.overflowOffset.top<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop-
c.scrollSpeed;if(!c.axis||c.axis!="y")if(b.overflowOffset.left+b.scrollParent[0].offsetWidth-a.pageX<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft+c.scrollSpeed;else if(a.pageX-b.overflowOffset.left<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft-c.scrollSpeed}else{if(!c.axis||c.axis!="x")if(a.pageY-d(document).scrollTop()<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()-c.scrollSpeed);else if(d(window).height()-
(a.pageY-d(document).scrollTop())<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()+c.scrollSpeed);if(!c.axis||c.axis!="y")if(a.pageX-d(document).scrollLeft()<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()-c.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()+c.scrollSpeed)}f!==false&&d.ui.ddmanager&&!c.dropBehaviour&&d.ui.ddmanager.prepareOffsets(b,a)}});d.ui.plugin.add("draggable",
"snap",{start:function(){var a=d(this).data("draggable"),b=a.options;a.snapElements=[];d(b.snap.constructor!=String?b.snap.items||":data(draggable)":b.snap).each(function(){var c=d(this),f=c.offset();this!=a.element[0]&&a.snapElements.push({item:this,width:c.outerWidth(),height:c.outerHeight(),top:f.top,left:f.left})})},drag:function(a,b){for(var c=d(this).data("draggable"),f=c.options,e=f.snapTolerance,g=b.offset.left,n=g+c.helperProportions.width,m=b.offset.top,o=m+c.helperProportions.height,h=
c.snapElements.length-1;h>=0;h--){var i=c.snapElements[h].left,k=i+c.snapElements[h].width,j=c.snapElements[h].top,l=j+c.snapElements[h].height;if(i-e<g&&g<k+e&&j-e<m&&m<l+e||i-e<g&&g<k+e&&j-e<o&&o<l+e||i-e<n&&n<k+e&&j-e<m&&m<l+e||i-e<n&&n<k+e&&j-e<o&&o<l+e){if(f.snapMode!="inner"){var p=Math.abs(j-o)<=e,q=Math.abs(l-m)<=e,r=Math.abs(i-n)<=e,s=Math.abs(k-g)<=e;if(p)b.position.top=c._convertPositionTo("relative",{top:j-c.helperProportions.height,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",
{top:l,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:i-c.helperProportions.width}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:k}).left-c.margins.left}var t=p||q||r||s;if(f.snapMode!="outer"){p=Math.abs(j-m)<=e;q=Math.abs(l-o)<=e;r=Math.abs(i-g)<=e;s=Math.abs(k-n)<=e;if(p)b.position.top=c._convertPositionTo("relative",{top:j,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:l-c.helperProportions.height,
left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:i}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:k-c.helperProportions.width}).left-c.margins.left}if(!c.snapElements[h].snapping&&(p||q||r||s||t))c.options.snap.snap&&c.options.snap.snap.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[h].item}));c.snapElements[h].snapping=p||q||r||s||t}else{c.snapElements[h].snapping&&c.options.snap.release&&c.options.snap.release.call(c.element,
a,d.extend(c._uiHash(),{snapItem:c.snapElements[h].item}));c.snapElements[h].snapping=false}}}});d.ui.plugin.add("draggable","stack",{start:function(){var a=d(this).data("draggable").options;a=d.makeArray(d(a.stack)).sort(function(c,f){return(parseInt(d(c).css("zIndex"),10)||0)-(parseInt(d(f).css("zIndex"),10)||0)});if(a.length){var b=parseInt(a[0].style.zIndex)||0;d(a).each(function(c){this.style.zIndex=b+c});this[0].style.zIndex=b+a.length}}});d.ui.plugin.add("draggable","zIndex",{start:function(a,
b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("zIndex"))b._zIndex=a.css("zIndex");a.css("zIndex",b.zIndex)},stop:function(a,b){a=d(this).data("draggable").options;a._zIndex&&d(b.helper).css("zIndex",a._zIndex)}})})(jQuery);
;/*
 * jQuery UI Droppable 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 *	jquery.ui.draggable.js
 */
(function(d){d.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var a=this.options,b=a.accept;this.isover=0;this.isout=1;this.accept=d.isFunction(b)?b:function(c){return c.is(b)};this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};d.ui.ddmanager.droppables[a.scope]=d.ui.ddmanager.droppables[a.scope]||[];d.ui.ddmanager.droppables[a.scope].push(this);
a.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){for(var a=d.ui.ddmanager.droppables[this.options.scope],b=0;b<a.length;b++)a[b]==this&&a.splice(b,1);this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");return this},_setOption:function(a,b){if(a=="accept")this.accept=d.isFunction(b)?b:function(c){return c.is(b)};d.Widget.prototype._setOption.apply(this,arguments)},_activate:function(a){var b=d.ui.ddmanager.current;this.options.activeClass&&
this.element.addClass(this.options.activeClass);b&&this._trigger("activate",a,this.ui(b))},_deactivate:function(a){var b=d.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass);b&&this._trigger("deactivate",a,this.ui(b))},_over:function(a){var b=d.ui.ddmanager.current;if(!(!b||(b.currentItem||b.element)[0]==this.element[0]))if(this.accept.call(this.element[0],b.currentItem||b.element)){this.options.hoverClass&&this.element.addClass(this.options.hoverClass);
this._trigger("over",a,this.ui(b))}},_out:function(a){var b=d.ui.ddmanager.current;if(!(!b||(b.currentItem||b.element)[0]==this.element[0]))if(this.accept.call(this.element[0],b.currentItem||b.element)){this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("out",a,this.ui(b))}},_drop:function(a,b){var c=b||d.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return false;var e=false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var g=
d.data(this,"droppable");if(g.options.greedy&&!g.options.disabled&&g.options.scope==c.options.scope&&g.accept.call(g.element[0],c.currentItem||c.element)&&d.ui.intersect(c,d.extend(g,{offset:g.element.offset()}),g.options.tolerance)){e=true;return false}});if(e)return false;if(this.accept.call(this.element[0],c.currentItem||c.element)){this.options.activeClass&&this.element.removeClass(this.options.activeClass);this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("drop",
a,this.ui(c));return this.element}return false},ui:function(a){return{draggable:a.currentItem||a.element,helper:a.helper,position:a.position,offset:a.positionAbs}}});d.extend(d.ui.droppable,{version:"1.8.9"});d.ui.intersect=function(a,b,c){if(!b.offset)return false;var e=(a.positionAbs||a.position.absolute).left,g=e+a.helperProportions.width,f=(a.positionAbs||a.position.absolute).top,h=f+a.helperProportions.height,i=b.offset.left,k=i+b.proportions.width,j=b.offset.top,l=j+b.proportions.height;
switch(c){case "fit":return i<=e&&g<=k&&j<=f&&h<=l;case "intersect":return i<e+a.helperProportions.width/2&&g-a.helperProportions.width/2<k&&j<f+a.helperProportions.height/2&&h-a.helperProportions.height/2<l;case "pointer":return d.ui.isOver((a.positionAbs||a.position.absolute).top+(a.clickOffset||a.offset.click).top,(a.positionAbs||a.position.absolute).left+(a.clickOffset||a.offset.click).left,j,i,b.proportions.height,b.proportions.width);case "touch":return(f>=j&&f<=l||h>=j&&h<=l||f<j&&h>l)&&(e>=
i&&e<=k||g>=i&&g<=k||e<i&&g>k);default:return false}};d.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(a,b){var c=d.ui.ddmanager.droppables[a.options.scope]||[],e=b?b.type:null,g=(a.currentItem||a.element).find(":data(droppable)").andSelf(),f=0;a:for(;f<c.length;f++)if(!(c[f].options.disabled||a&&!c[f].accept.call(c[f].element[0],a.currentItem||a.element))){for(var h=0;h<g.length;h++)if(g[h]==c[f].element[0]){c[f].proportions.height=0;continue a}c[f].visible=c[f].element.css("display")!=
"none";if(c[f].visible){c[f].offset=c[f].element.offset();c[f].proportions={width:c[f].element[0].offsetWidth,height:c[f].element[0].offsetHeight};e=="mousedown"&&c[f]._activate.call(c[f],b)}}},drop:function(a,b){var c=false;d.each(d.ui.ddmanager.droppables[a.options.scope]||[],function(){if(this.options){if(!this.options.disabled&&this.visible&&d.ui.intersect(a,this,this.options.tolerance))c=c||this._drop.call(this,b);if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],a.currentItem||
a.element)){this.isout=1;this.isover=0;this._deactivate.call(this,b)}}});return c},drag:function(a,b){a.options.refreshPositions&&d.ui.ddmanager.prepareOffsets(a,b);d.each(d.ui.ddmanager.droppables[a.options.scope]||[],function(){if(!(this.options.disabled||this.greedyChild||!this.visible)){var c=d.ui.intersect(a,this,this.options.tolerance);if(c=!c&&this.isover==1?"isout":c&&this.isover==0?"isover":null){var e;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");if(g.length){e=
d.data(g[0],"droppable");e.greedyChild=c=="isover"?1:0}}if(e&&c=="isover"){e.isover=0;e.isout=1;e._out.call(e,b)}this[c]=1;this[c=="isout"?"isover":"isout"]=0;this[c=="isover"?"_over":"_out"].call(this,b);if(e&&c=="isout"){e.isout=0;e.isover=1;e._over.call(e,b)}}}})}}})(jQuery);
;/*
 * jQuery UI Resizable 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(e){e.widget("ui.resizable",e.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1E3},_create:function(){var b=this,a=this.options;this.element.addClass("ui-resizable");e.extend(this,{_aspectRatio:!!a.aspectRatio,aspectRatio:a.aspectRatio,originalElement:this.element,
_proportionallyResizeElements:[],_helper:a.helper||a.ghost||a.animate?a.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&e.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),
top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=
this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=a.handles||(!e(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",
nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all")this.handles="n,e,s,w,se,sw,ne,nw";var c=this.handles.split(",");this.handles={};for(var d=0;d<c.length;d++){var f=e.trim(c[d]),g=e('<div class="ui-resizable-handle '+("ui-resizable-"+f)+'"></div>');/sw|se|ne|nw/.test(f)&&g.css({zIndex:++a.zIndex});"se"==f&&g.addClass("ui-icon ui-icon-gripsmall-diagonal-se");this.handles[f]=".ui-resizable-"+f;this.element.append(g)}}this._renderAxis=function(h){h=h||this.element;for(var i in this.handles){if(this.handles[i].constructor==
String)this.handles[i]=e(this.handles[i],this.element).show();if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var j=e(this.handles[i],this.element),k=0;k=/sw|ne|nw|se|n|s/.test(i)?j.outerHeight():j.outerWidth();j=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join("");h.css(j,k);this._proportionallyResize()}e(this.handles[i])}};this._renderAxis(this.element);this._handles=e(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!b.resizing){if(this.className)var h=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=h&&h[1]?h[1]:"se"}});if(a.autoHide){this._handles.hide();e(this.element).addClass("ui-resizable-autohide").hover(function(){e(this).removeClass("ui-resizable-autohide");b._handles.show()},function(){if(!b.resizing){e(this).addClass("ui-resizable-autohide");b._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(c){e(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};
if(this.elementIsWrapper){b(this.element);var a=this.element;a.after(this.originalElement.css({position:a.css("position"),width:a.outerWidth(),height:a.outerHeight(),top:a.css("top"),left:a.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle);b(this.originalElement);return this},_mouseCapture:function(b){var a=false;for(var c in this.handles)if(e(this.handles[c])[0]==b.target)a=true;return!this.options.disabled&&a},_mouseStart:function(b){var a=this.options,c=this.element.position(),
d=this.element;this.resizing=true;this.documentScroll={top:e(document).scrollTop(),left:e(document).scrollLeft()};if(d.is(".ui-draggable")||/absolute/.test(d.css("position")))d.css({position:"absolute",top:c.top,left:c.left});e.browser.opera&&/relative/.test(d.css("position"))&&d.css({position:"relative",top:"auto",left:"auto"});this._renderProxy();c=m(this.helper.css("left"));var f=m(this.helper.css("top"));if(a.containment){c+=e(a.containment).scrollLeft()||0;f+=e(a.containment).scrollTop()||0}this.offset=
this.helper.offset();this.position={left:c,top:f};this.size=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalSize=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalPosition={left:c,top:f};this.sizeDiff={width:d.outerWidth()-d.width(),height:d.outerHeight()-d.height()};this.originalMousePosition={left:b.pageX,top:b.pageY};this.aspectRatio=typeof a.aspectRatio=="number"?a.aspectRatio:
this.originalSize.width/this.originalSize.height||1;a=e(".ui-resizable-"+this.axis).css("cursor");e("body").css("cursor",a=="auto"?this.axis+"-resize":a);d.addClass("ui-resizable-resizing");this._propagate("start",b);return true},_mouseDrag:function(b){var a=this.helper,c=this.originalMousePosition,d=this._change[this.axis];if(!d)return false;c=d.apply(this,[b,b.pageX-c.left||0,b.pageY-c.top||0]);if(this._aspectRatio||b.shiftKey)c=this._updateRatio(c,b);c=this._respectSize(c,b);this._propagate("resize",
b);a.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();this._updateCache(c);this._trigger("resize",b,this.ui());return false},_mouseStop:function(b){this.resizing=false;var a=this.options,c=this;if(this._helper){var d=this._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName);d=f&&e.ui.hasScroll(d[0],"left")?0:c.sizeDiff.height;
f={width:c.size.width-(f?0:c.sizeDiff.width),height:c.size.height-d};d=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null;var g=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;a.animate||this.element.css(e.extend(f,{top:g,left:d}));c.helper.height(c.size.height);c.helper.width(c.size.width);this._helper&&!a.animate&&this._proportionallyResize()}e("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",
b);this._helper&&this.helper.remove();return false},_updateCache:function(b){this.offset=this.helper.offset();if(l(b.left))this.position.left=b.left;if(l(b.top))this.position.top=b.top;if(l(b.height))this.size.height=b.height;if(l(b.width))this.size.width=b.width},_updateRatio:function(b){var a=this.position,c=this.size,d=this.axis;if(b.height)b.width=c.height*this.aspectRatio;else if(b.width)b.height=c.width/this.aspectRatio;if(d=="sw"){b.left=a.left+(c.width-b.width);b.top=null}if(d=="nw"){b.top=
a.top+(c.height-b.height);b.left=a.left+(c.width-b.width)}return b},_respectSize:function(b){var a=this.options,c=this.axis,d=l(b.width)&&a.maxWidth&&a.maxWidth<b.width,f=l(b.height)&&a.maxHeight&&a.maxHeight<b.height,g=l(b.width)&&a.minWidth&&a.minWidth>b.width,h=l(b.height)&&a.minHeight&&a.minHeight>b.height;if(g)b.width=a.minWidth;if(h)b.height=a.minHeight;if(d)b.width=a.maxWidth;if(f)b.height=a.maxHeight;var i=this.originalPosition.left+this.originalSize.width,j=this.position.top+this.size.height,
k=/sw|nw|w/.test(c);c=/nw|ne|n/.test(c);if(g&&k)b.left=i-a.minWidth;if(d&&k)b.left=i-a.maxWidth;if(h&&c)b.top=j-a.minHeight;if(f&&c)b.top=j-a.maxHeight;if((a=!b.width&&!b.height)&&!b.left&&b.top)b.top=null;else if(a&&!b.top&&b.left)b.left=null;return b},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var b=this.helper||this.element,a=0;a<this._proportionallyResizeElements.length;a++){var c=this._proportionallyResizeElements[a];if(!this.borderDif){var d=[c.css("borderTopWidth"),
c.css("borderRightWidth"),c.css("borderBottomWidth"),c.css("borderLeftWidth")],f=[c.css("paddingTop"),c.css("paddingRight"),c.css("paddingBottom"),c.css("paddingLeft")];this.borderDif=e.map(d,function(g,h){g=parseInt(g,10)||0;h=parseInt(f[h],10)||0;return g+h})}e.browser.msie&&(e(b).is(":hidden")||e(b).parents(":hidden").length)||c.css({height:b.height()-this.borderDif[0]-this.borderDif[2]||0,width:b.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var b=this.options;this.elementOffset=
this.element.offset();if(this._helper){this.helper=this.helper||e('<div style="overflow:hidden;"></div>');var a=e.browser.msie&&e.browser.version<7,c=a?1:0;a=a?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+a,height:this.element.outerHeight()+a,position:"absolute",left:this.elementOffset.left-c+"px",top:this.elementOffset.top-c+"px",zIndex:++b.zIndex});this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(b,a){return{width:this.originalSize.width+
a}},w:function(b,a){return{left:this.originalPosition.left+a,width:this.originalSize.width-a}},n:function(b,a,c){return{top:this.originalPosition.top+c,height:this.originalSize.height-c}},s:function(b,a,c){return{height:this.originalSize.height+c}},se:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},sw:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,a,c]))},ne:function(b,a,c){return e.extend(this._change.n.apply(this,
arguments),this._change.e.apply(this,[b,a,c]))},nw:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,a,c]))}},_propagate:function(b,a){e.ui.plugin.call(this,b,[a,this.ui()]);b!="resize"&&this._trigger(b,a,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}});e.extend(e.ui.resizable,
{version:"1.8.9"});e.ui.plugin.add("resizable","alsoResize",{start:function(){var b=e(this).data("resizable").options,a=function(c){e(c).each(function(){var d=e(this);d.data("resizable-alsoresize",{width:parseInt(d.width(),10),height:parseInt(d.height(),10),left:parseInt(d.css("left"),10),top:parseInt(d.css("top"),10),position:d.css("position")})})};if(typeof b.alsoResize=="object"&&!b.alsoResize.parentNode)if(b.alsoResize.length){b.alsoResize=b.alsoResize[0];a(b.alsoResize)}else e.each(b.alsoResize,
function(c){a(c)});else a(b.alsoResize)},resize:function(b,a){var c=e(this).data("resizable");b=c.options;var d=c.originalSize,f=c.originalPosition,g={height:c.size.height-d.height||0,width:c.size.width-d.width||0,top:c.position.top-f.top||0,left:c.position.left-f.left||0},h=function(i,j){e(i).each(function(){var k=e(this),q=e(this).data("resizable-alsoresize"),p={},r=j&&j.length?j:k.parents(a.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(r,function(n,o){if((n=
(q[o]||0)+(g[o]||0))&&n>=0)p[o]=n||null});if(e.browser.opera&&/relative/.test(k.css("position"))){c._revertToRelativePosition=true;k.css({position:"absolute",top:"auto",left:"auto"})}k.css(p)})};typeof b.alsoResize=="object"&&!b.alsoResize.nodeType?e.each(b.alsoResize,function(i,j){h(i,j)}):h(b.alsoResize)},stop:function(){var b=e(this).data("resizable"),a=b.options,c=function(d){e(d).each(function(){var f=e(this);f.css({position:f.data("resizable-alsoresize").position})})};if(b._revertToRelativePosition){b._revertToRelativePosition=
false;typeof a.alsoResize=="object"&&!a.alsoResize.nodeType?e.each(a.alsoResize,function(d){c(d)}):c(a.alsoResize)}e(this).removeData("resizable-alsoresize")}});e.ui.plugin.add("resizable","animate",{stop:function(b){var a=e(this).data("resizable"),c=a.options,d=a._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName),g=f&&e.ui.hasScroll(d[0],"left")?0:a.sizeDiff.height;f={width:a.size.width-(f?0:a.sizeDiff.width),height:a.size.height-g};g=parseInt(a.element.css("left"),10)+(a.position.left-
a.originalPosition.left)||null;var h=parseInt(a.element.css("top"),10)+(a.position.top-a.originalPosition.top)||null;a.element.animate(e.extend(f,h&&g?{top:h,left:g}:{}),{duration:c.animateDuration,easing:c.animateEasing,step:function(){var i={width:parseInt(a.element.css("width"),10),height:parseInt(a.element.css("height"),10),top:parseInt(a.element.css("top"),10),left:parseInt(a.element.css("left"),10)};d&&d.length&&e(d[0]).css({width:i.width,height:i.height});a._updateCache(i);a._propagate("resize",
b)}})}});e.ui.plugin.add("resizable","containment",{start:function(){var b=e(this).data("resizable"),a=b.element,c=b.options.containment;if(a=c instanceof e?c.get(0):/parent/.test(c)?a.parent().get(0):c){b.containerElement=e(a);if(/document/.test(c)||c==document){b.containerOffset={left:0,top:0};b.containerPosition={left:0,top:0};b.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}}else{var d=e(a),f=[];e(["Top",
"Right","Left","Bottom"]).each(function(i,j){f[i]=m(d.css("padding"+j))});b.containerOffset=d.offset();b.containerPosition=d.position();b.containerSize={height:d.innerHeight()-f[3],width:d.innerWidth()-f[1]};c=b.containerOffset;var g=b.containerSize.height,h=b.containerSize.width;h=e.ui.hasScroll(a,"left")?a.scrollWidth:h;g=e.ui.hasScroll(a)?a.scrollHeight:g;b.parentData={element:a,left:c.left,top:c.top,width:h,height:g}}}},resize:function(b){var a=e(this).data("resizable"),c=a.options,d=a.containerOffset,
f=a.position;b=a._aspectRatio||b.shiftKey;var g={top:0,left:0},h=a.containerElement;if(h[0]!=document&&/static/.test(h.css("position")))g=d;if(f.left<(a._helper?d.left:0)){a.size.width+=a._helper?a.position.left-d.left:a.position.left-g.left;if(b)a.size.height=a.size.width/c.aspectRatio;a.position.left=c.helper?d.left:0}if(f.top<(a._helper?d.top:0)){a.size.height+=a._helper?a.position.top-d.top:a.position.top;if(b)a.size.width=a.size.height*c.aspectRatio;a.position.top=a._helper?d.top:0}a.offset.left=
a.parentData.left+a.position.left;a.offset.top=a.parentData.top+a.position.top;c=Math.abs((a._helper?a.offset.left-g.left:a.offset.left-g.left)+a.sizeDiff.width);d=Math.abs((a._helper?a.offset.top-g.top:a.offset.top-d.top)+a.sizeDiff.height);f=a.containerElement.get(0)==a.element.parent().get(0);g=/relative|absolute/.test(a.containerElement.css("position"));if(f&&g)c-=a.parentData.left;if(c+a.size.width>=a.parentData.width){a.size.width=a.parentData.width-c;if(b)a.size.height=a.size.width/a.aspectRatio}if(d+
a.size.height>=a.parentData.height){a.size.height=a.parentData.height-d;if(b)a.size.width=a.size.height*a.aspectRatio}},stop:function(){var b=e(this).data("resizable"),a=b.options,c=b.containerOffset,d=b.containerPosition,f=b.containerElement,g=e(b.helper),h=g.offset(),i=g.outerWidth()-b.sizeDiff.width;g=g.outerHeight()-b.sizeDiff.height;b._helper&&!a.animate&&/relative/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g});b._helper&&!a.animate&&/static/.test(f.css("position"))&&
e(this).css({left:h.left-d.left-c.left,width:i,height:g})}});e.ui.plugin.add("resizable","ghost",{start:function(){var b=e(this).data("resizable"),a=b.options,c=b.size;b.ghost=b.originalElement.clone();b.ghost.css({opacity:0.25,display:"block",position:"relative",height:c.height,width:c.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof a.ghost=="string"?a.ghost:"");b.ghost.appendTo(b.helper)},resize:function(){var b=e(this).data("resizable");b.ghost&&b.ghost.css({position:"relative",
height:b.size.height,width:b.size.width})},stop:function(){var b=e(this).data("resizable");b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}});e.ui.plugin.add("resizable","grid",{resize:function(){var b=e(this).data("resizable"),a=b.options,c=b.size,d=b.originalSize,f=b.originalPosition,g=b.axis;a.grid=typeof a.grid=="number"?[a.grid,a.grid]:a.grid;var h=Math.round((c.width-d.width)/(a.grid[0]||1))*(a.grid[0]||1);a=Math.round((c.height-d.height)/(a.grid[1]||1))*(a.grid[1]||1);if(/^(se|s|e)$/.test(g)){b.size.width=
d.width+h;b.size.height=d.height+a}else if(/^(ne)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}else{if(/^(sw)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else{b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}b.position.left=f.left-h}}});var m=function(b){return parseInt(b,10)||0},l=function(b){return!isNaN(parseInt(b,10))}})(jQuery);
;/*
 * jQuery UI Selectable 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Selectables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(e){e.widget("ui.selectable",e.ui.mouse,{options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var c=this;this.element.addClass("ui-selectable");this.dragged=false;var f;this.refresh=function(){f=e(c.options.filter,c.element[0]);f.each(function(){var d=e(this),b=d.offset();e.data(this,"selectable-item",{element:this,$element:d,left:b.left,top:b.top,right:b.left+d.outerWidth(),bottom:b.top+d.outerHeight(),startselected:false,selected:d.hasClass("ui-selected"),
selecting:d.hasClass("ui-selecting"),unselecting:d.hasClass("ui-unselecting")})})};this.refresh();this.selectees=f.addClass("ui-selectee");this._mouseInit();this.helper=e("<div class='ui-selectable-helper'></div>")},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");this._mouseDestroy();return this},_mouseStart:function(c){var f=this;this.opos=[c.pageX,
c.pageY];if(!this.options.disabled){var d=this.options;this.selectees=e(d.filter,this.element[0]);this._trigger("start",c);e(d.appendTo).append(this.helper);this.helper.css({left:c.clientX,top:c.clientY,width:0,height:0});d.autoRefresh&&this.refresh();this.selectees.filter(".ui-selected").each(function(){var b=e.data(this,"selectable-item");b.startselected=true;if(!c.metaKey){b.$element.removeClass("ui-selected");b.selected=false;b.$element.addClass("ui-unselecting");b.unselecting=true;f._trigger("unselecting",
c,{unselecting:b.element})}});e(c.target).parents().andSelf().each(function(){var b=e.data(this,"selectable-item");if(b){var g=!c.metaKey||!b.$element.hasClass("ui-selected");b.$element.removeClass(g?"ui-unselecting":"ui-selected").addClass(g?"ui-selecting":"ui-unselecting");b.unselecting=!g;b.selecting=g;(b.selected=g)?f._trigger("selecting",c,{selecting:b.element}):f._trigger("unselecting",c,{unselecting:b.element});return false}})}},_mouseDrag:function(c){var f=this;this.dragged=true;if(!this.options.disabled){var d=
this.options,b=this.opos[0],g=this.opos[1],h=c.pageX,i=c.pageY;if(b>h){var j=h;h=b;b=j}if(g>i){j=i;i=g;g=j}this.helper.css({left:b,top:g,width:h-b,height:i-g});this.selectees.each(function(){var a=e.data(this,"selectable-item");if(!(!a||a.element==f.element[0])){var k=false;if(d.tolerance=="touch")k=!(a.left>h||a.right<b||a.top>i||a.bottom<g);else if(d.tolerance=="fit")k=a.left>b&&a.right<h&&a.top>g&&a.bottom<i;if(k){if(a.selected){a.$element.removeClass("ui-selected");a.selected=false}if(a.unselecting){a.$element.removeClass("ui-unselecting");
a.unselecting=false}if(!a.selecting){a.$element.addClass("ui-selecting");a.selecting=true;f._trigger("selecting",c,{selecting:a.element})}}else{if(a.selecting)if(c.metaKey&&a.startselected){a.$element.removeClass("ui-selecting");a.selecting=false;a.$element.addClass("ui-selected");a.selected=true}else{a.$element.removeClass("ui-selecting");a.selecting=false;if(a.startselected){a.$element.addClass("ui-unselecting");a.unselecting=true}f._trigger("unselecting",c,{unselecting:a.element})}if(a.selected)if(!c.metaKey&&
!a.startselected){a.$element.removeClass("ui-selected");a.selected=false;a.$element.addClass("ui-unselecting");a.unselecting=true;f._trigger("unselecting",c,{unselecting:a.element})}}}});return false}},_mouseStop:function(c){var f=this;this.dragged=false;e(".ui-unselecting",this.element[0]).each(function(){var d=e.data(this,"selectable-item");d.$element.removeClass("ui-unselecting");d.unselecting=false;d.startselected=false;f._trigger("unselected",c,{unselected:d.element})});e(".ui-selecting",this.element[0]).each(function(){var d=
e.data(this,"selectable-item");d.$element.removeClass("ui-selecting").addClass("ui-selected");d.selecting=false;d.selected=true;d.startselected=true;f._trigger("selected",c,{selected:d.element})});this._trigger("stop",c);this.helper.remove();return false}});e.extend(e.ui.selectable,{version:"1.8.9"})})(jQuery);
;/*
 * jQuery UI Sortable 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.sortable",d.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1E3},_create:function(){this.containerCache={};this.element.addClass("ui-sortable");
this.refresh();this.floating=this.items.length?/left|right/.test(this.items[0].item.css("float")):false;this.offset=this.element.offset();this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var a=this.items.length-1;a>=0;a--)this.items[a].item.removeData("sortable-item");return this},_setOption:function(a,b){if(a==="disabled"){this.options[a]=b;this.widget()[b?"addClass":"removeClass"]("ui-sortable-disabled")}else d.Widget.prototype._setOption.apply(this,
arguments)},_mouseCapture:function(a,b){if(this.reverting)return false;if(this.options.disabled||this.options.type=="static")return false;this._refreshItems(a);var c=null,e=this;d(a.target).parents().each(function(){if(d.data(this,"sortable-item")==e){c=d(this);return false}});if(d.data(a.target,"sortable-item")==e)c=d(a.target);if(!c)return false;if(this.options.handle&&!b){var f=false;d(this.options.handle,c).find("*").andSelf().each(function(){if(this==a.target)f=true});if(!f)return false}this.currentItem=
c;this._removeCurrentsFromItems();return true},_mouseStart:function(a,b,c){b=this.options;var e=this;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(a);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");d.extend(this.offset,
{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};this.helper[0]!=this.currentItem[0]&&this.currentItem.hide();this._createPlaceholder();b.containment&&this._setContainment();
if(b.cursor){if(d("body").css("cursor"))this._storedCursor=d("body").css("cursor");d("body").css("cursor",b.cursor)}if(b.opacity){if(this.helper.css("opacity"))this._storedOpacity=this.helper.css("opacity");this.helper.css("opacity",b.opacity)}if(b.zIndex){if(this.helper.css("zIndex"))this._storedZIndex=this.helper.css("zIndex");this.helper.css("zIndex",b.zIndex)}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML")this.overflowOffset=this.scrollParent.offset();this._trigger("start",
a,this._uiHash());this._preserveHelperProportions||this._cacheHelperProportions();if(!c)for(c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("activate",a,e._uiHash(this));if(d.ui.ddmanager)d.ui.ddmanager.current=this;d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(a);return true},_mouseDrag:function(a){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs)this.lastPositionAbs=this.positionAbs;if(this.options.scroll){var b=this.options,c=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-a.pageY<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop+b.scrollSpeed;else if(a.pageY-this.overflowOffset.top<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop-b.scrollSpeed;if(this.overflowOffset.left+
this.scrollParent[0].offsetWidth-a.pageX<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft+b.scrollSpeed;else if(a.pageX-this.overflowOffset.left<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft-b.scrollSpeed}else{if(a.pageY-d(document).scrollTop()<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()-b.scrollSpeed);else if(d(window).height()-(a.pageY-d(document).scrollTop())<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()+
b.scrollSpeed);if(a.pageX-d(document).scrollLeft()<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()-b.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()+b.scrollSpeed)}c!==false&&d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+
"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(b=this.items.length-1;b>=0;b--){c=this.items[b];var e=c.item[0],f=this._intersectsWithPointer(c);if(f)if(e!=this.currentItem[0]&&this.placeholder[f==1?"next":"prev"]()[0]!=e&&!d.ui.contains(this.placeholder[0],e)&&(this.options.type=="semi-dynamic"?!d.ui.contains(this.element[0],e):true)){this.direction=f==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(c))this._rearrange(a,
c);else break;this._trigger("change",a,this._uiHash());break}}this._contactContainers(a);d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);this._trigger("sort",a,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(a,b){if(a){d.ui.ddmanager&&!this.options.dropBehaviour&&d.ui.ddmanager.drop(this,a);if(this.options.revert){var c=this;b=c.placeholder.offset();c.reverting=true;d(this.helper).animate({left:b.left-this.offset.parent.left-c.margins.left+(this.offsetParent[0]==
document.body?0:this.offsetParent[0].scrollLeft),top:b.top-this.offset.parent.top-c.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){c._clear(a)})}else this._clear(a,b);return false}},cancel:function(){var a=this;if(this.dragging){this._mouseUp({target:null});this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var b=this.containers.length-
1;b>=0;b--){this.containers[b]._trigger("deactivate",null,a._uiHash(this));if(this.containers[b].containerCache.over){this.containers[b]._trigger("out",null,a._uiHash(this));this.containers[b].containerCache.over=0}}}if(this.placeholder){this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove();d.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});
this.domPosition.prev?d(this.domPosition.prev).after(this.currentItem):d(this.domPosition.parent).prepend(this.currentItem)}return this},serialize:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[];a=a||{};d(b).each(function(){var e=(d(a.item||this).attr(a.attribute||"id")||"").match(a.expression||/(.+)[-=_](.+)/);if(e)c.push((a.key||e[1]+"[]")+"="+(a.key&&a.expression?e[1]:e[2]))});!c.length&&a.key&&c.push(a.key+"=");return c.join("&")},toArray:function(a){var b=this._getItemsAsjQuery(a&&
a.connected),c=[];a=a||{};b.each(function(){c.push(d(a.item||this).attr(a.attribute||"id")||"")});return c},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,e=this.positionAbs.top,f=e+this.helperProportions.height,g=a.left,h=g+a.width,i=a.top,k=i+a.height,j=this.offset.click.top,l=this.offset.click.left;j=e+j>i&&e+j<k&&b+l>g&&b+l<h;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?
"width":"height"]>a[this.floating?"width":"height"]?j:g<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<h&&i<e+this.helperProportions.height/2&&f-this.helperProportions.height/2<k},_intersectsWithPointer:function(a){var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top,a.height);a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left,a.width);b=b&&a;a=this._getDragVerticalDirection();var c=this._getDragHorizontalDirection();if(!b)return false;return this.floating?
c&&c=="right"||a=="down"?2:1:a&&(a=="down"?2:1)},_intersectsWithSides:function(a){var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top+a.height/2,a.height);a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left+a.width/2,a.width);var c=this._getDragVerticalDirection(),e=this._getDragHorizontalDirection();return this.floating&&e?e=="right"&&a||e=="left"&&!a:c&&(c=="down"&&b||c=="up"&&!b)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;
return a!=0&&(a>0?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){this._refreshItems(a);this.refreshPositions();return this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(a){var b=[],c=[],e=this._connectWith();if(e&&a)for(a=e.length-1;a>=0;a--)for(var f=d(e[a]),g=f.length-1;g>=0;g--){var h=
d.data(f[g],"sortable");if(h&&h!=this&&!h.options.disabled)c.push([d.isFunction(h.options.items)?h.options.items.call(h.element):d(h.options.items,h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),h])}c.push([d.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):d(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(a=c.length-1;a>=0;a--)c[a][0].each(function(){b.push(this)});
return d(b)},_removeCurrentsFromItems:function(){for(var a=this.currentItem.find(":data(sortable-item)"),b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(a){this.items=[];this.containers=[this];var b=this.items,c=[[d.isFunction(this.options.items)?this.options.items.call(this.element[0],a,{item:this.currentItem}):d(this.options.items,this.element),this]],e=this._connectWith();if(e)for(var f=e.length-1;f>=0;f--)for(var g=
d(e[f]),h=g.length-1;h>=0;h--){var i=d.data(g[h],"sortable");if(i&&i!=this&&!i.options.disabled){c.push([d.isFunction(i.options.items)?i.options.items.call(i.element[0],a,{item:this.currentItem}):d(i.options.items,i.element),i]);this.containers.push(i)}}for(f=c.length-1;f>=0;f--){a=c[f][1];e=c[f][0];h=0;for(g=e.length;h<g;h++){i=d(e[h]);i.data("sortable-item",a);b.push({item:i,instance:a,width:0,height:0,left:0,top:0})}}},refreshPositions:function(a){if(this.offsetParent&&this.helper)this.offset.parent=
this._getParentOffset();for(var b=this.items.length-1;b>=0;b--){var c=this.items[b],e=this.options.toleranceElement?d(this.options.toleranceElement,c.item):c.item;if(!a){c.width=e.outerWidth();c.height=e.outerHeight()}e=e.offset();c.left=e.left;c.top=e.top}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(b=this.containers.length-1;b>=0;b--){e=this.containers[b].element.offset();this.containers[b].containerCache.left=e.left;this.containers[b].containerCache.top=
e.top;this.containers[b].containerCache.width=this.containers[b].element.outerWidth();this.containers[b].containerCache.height=this.containers[b].element.outerHeight()}return this},_createPlaceholder:function(a){var b=a||this,c=b.options;if(!c.placeholder||c.placeholder.constructor==String){var e=c.placeholder;c.placeholder={element:function(){var f=d(document.createElement(b.currentItem[0].nodeName)).addClass(e||b.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!e)f.style.visibility="hidden";return f},update:function(f,g){if(!(e&&!c.forcePlaceholderSize)){g.height()||g.height(b.currentItem.innerHeight()-parseInt(b.currentItem.css("paddingTop")||0,10)-parseInt(b.currentItem.css("paddingBottom")||0,10));g.width()||g.width(b.currentItem.innerWidth()-parseInt(b.currentItem.css("paddingLeft")||0,10)-parseInt(b.currentItem.css("paddingRight")||0,10))}}}}b.placeholder=d(c.placeholder.element.call(b.element,b.currentItem));b.currentItem.after(b.placeholder);
c.placeholder.update(b,b.placeholder)},_contactContainers:function(a){for(var b=null,c=null,e=this.containers.length-1;e>=0;e--)if(!d.ui.contains(this.currentItem[0],this.containers[e].element[0]))if(this._intersectsWith(this.containers[e].containerCache)){if(!(b&&d.ui.contains(this.containers[e].element[0],b.element[0]))){b=this.containers[e];c=e}}else if(this.containers[e].containerCache.over){this.containers[e]._trigger("out",a,this._uiHash(this));this.containers[e].containerCache.over=0}if(b)if(this.containers.length===
1){this.containers[c]._trigger("over",a,this._uiHash(this));this.containers[c].containerCache.over=1}else if(this.currentContainer!=this.containers[c]){b=1E4;e=null;for(var f=this.positionAbs[this.containers[c].floating?"left":"top"],g=this.items.length-1;g>=0;g--)if(d.ui.contains(this.containers[c].element[0],this.items[g].item[0])){var h=this.items[g][this.containers[c].floating?"left":"top"];if(Math.abs(h-f)<b){b=Math.abs(h-f);e=this.items[g]}}if(e||this.options.dropOnEmpty){this.currentContainer=
this.containers[c];e?this._rearrange(a,e,null,true):this._rearrange(a,null,this.containers[c].element,true);this._trigger("change",a,this._uiHash());this.containers[c]._trigger("change",a,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder);this.containers[c]._trigger("over",a,this._uiHash(this));this.containers[c].containerCache.over=1}}},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a,this.currentItem])):
b.helper=="clone"?this.currentItem.clone():this.currentItem;a.parents("body").length||d(b.appendTo!="parent"?b.appendTo:this.currentItem[0].parentNode)[0].appendChild(a[0]);if(a[0]==this.currentItem[0])this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};if(a[0].style.width==""||b.forceHelperSize)a.width(this.currentItem.width());if(a[0].style.height==
""||b.forceHelperSize)a.height(this.currentItem.height());return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=
this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),
10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions=
{width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment=="parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(d(a.containment=="document"?document:window).height()||
document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)){var b=d(a.containment)[0];a=d(a.containment).offset();var c=d(b).css("overflow")!="hidden";this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0)-this.margins.left,a.top+(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0)-this.margins.top,a.left+(c?Math.max(b.scrollWidth,
b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=
document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():
e?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]))this.offset.relative=this._getRelativeOffset();var f=a.pageX,g=a.pageY;if(this.originalPosition){if(this.containment){if(a.pageX-
this.offset.click.left<this.containment[0])f=this.containment[0]+this.offset.click.left;if(a.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+this.offset.click.top;if(a.pageX-this.offset.click.left>this.containment[2])f=this.containment[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>this.containment[3])g=this.containment[3]+this.offset.click.top}if(b.grid){g=this.originalPageY+Math.round((g-this.originalPageY)/b.grid[1])*b.grid[1];g=this.containment?!(g-this.offset.click.top<
this.containment[1]||g-this.offset.click.top>this.containment[3])?g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g;f=this.originalPageX+Math.round((f-this.originalPageX)/b.grid[0])*b.grid[0];f=this.containment?!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:!(f-this.offset.click.left<this.containment[0])?f-b.grid[0]:f+b.grid[0]:f}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&
this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:c.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:c.scrollLeft())}},_rearrange:function(a,b,c,e){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling);this.counter=
this.counter?++this.counter:1;var f=this,g=this.counter;window.setTimeout(function(){g==f.counter&&f.refreshPositions(!e)},0)},_clear:function(a,b){this.reverting=false;var c=[];!this._noFinalSort&&this.currentItem[0].parentNode&&this.placeholder.before(this.currentItem);this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var e in this._storedCSS)if(this._storedCSS[e]=="auto"||this._storedCSS[e]=="static")this._storedCSS[e]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();
this.fromOutside&&!b&&c.push(function(f){this._trigger("receive",f,this._uiHash(this.fromOutside))});if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!b)c.push(function(f){this._trigger("update",f,this._uiHash())});if(!d.ui.contains(this.element[0],this.currentItem[0])){b||c.push(function(f){this._trigger("remove",f,this._uiHash())});for(e=this.containers.length-1;e>=0;e--)if(d.ui.contains(this.containers[e].element[0],
this.currentItem[0])&&!b){c.push(function(f){return function(g){f._trigger("receive",g,this._uiHash(this))}}.call(this,this.containers[e]));c.push(function(f){return function(g){f._trigger("update",g,this._uiHash(this))}}.call(this,this.containers[e]))}}for(e=this.containers.length-1;e>=0;e--){b||c.push(function(f){return function(g){f._trigger("deactivate",g,this._uiHash(this))}}.call(this,this.containers[e]));if(this.containers[e].containerCache.over){c.push(function(f){return function(g){f._trigger("out",
g,this._uiHash(this))}}.call(this,this.containers[e]));this.containers[e].containerCache.over=0}}this._storedCursor&&d("body").css("cursor",this._storedCursor);this._storedOpacity&&this.helper.css("opacity",this._storedOpacity);if(this._storedZIndex)this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex);this.dragging=false;if(this.cancelHelperRemoval){if(!b){this._trigger("beforeStop",a,this._uiHash());for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}return false}b||
this._trigger("beforeStop",a,this._uiHash());this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.helper[0]!=this.currentItem[0]&&this.helper.remove();this.helper=null;if(!b){for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}this.fromOutside=false;return true},_trigger:function(){d.Widget.prototype._trigger.apply(this,arguments)===false&&this.cancel()},_uiHash:function(a){var b=a||this;return{helper:b.helper,placeholder:b.placeholder||d([]),position:b.position,
originalPosition:b.originalPosition,offset:b.positionAbs,item:b.currentItem,sender:a?a.element:null}}});d.extend(d.ui.sortable,{version:"1.8.9"})})(jQuery);
;/*
 * jQuery UI Accordion 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(c){c.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var a=this,b=a.options;a.running=0;a.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
a.headers=a.element.find(b.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){b.disabled||c(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){b.disabled||c(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){b.disabled||c(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){b.disabled||c(this).removeClass("ui-state-focus")});a.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if(b.navigation){var d=a.element.find("a").filter(b.navigationFilter).eq(0);if(d.length){var h=d.closest(".ui-accordion-header");a.active=h.length?h:d.closest(".ui-accordion-content").prev()}}a.active=a._findActive(a.active||b.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");a.active.next().addClass("ui-accordion-content-active");a._createIcons();a.resize();a.element.attr("role","tablist");a.headers.attr("role","tab").bind("keydown.accordion",
function(f){return a._keydown(f)}).next().attr("role","tabpanel");a.headers.not(a.active||"").attr({"aria-expanded":"false",tabIndex:-1}).next().hide();a.active.length?a.active.attr({"aria-expanded":"true",tabIndex:0}):a.headers.eq(0).attr("tabIndex",0);c.browser.safari||a.headers.find("a").attr("tabIndex",-1);b.event&&a.headers.bind(b.event.split(" ").join(".accordion ")+".accordion",function(f){a._clickHandler.call(a,f,this);f.preventDefault()})},_createIcons:function(){var a=this.options;if(a.icons){c("<span></span>").addClass("ui-icon "+
a.icons.header).prependTo(this.headers);this.active.children(".ui-icon").toggleClass(a.icons.header).toggleClass(a.icons.headerSelected);this.element.addClass("ui-accordion-icons")}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();this.element.removeClass("ui-accordion-icons")},destroy:function(){var a=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabIndex");
this.headers.find("a").removeAttr("tabIndex");this._destroyIcons();var b=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");if(a.autoHeight||a.fillHeight)b.css("height","");return c.Widget.prototype.destroy.call(this)},_setOption:function(a,b){c.Widget.prototype._setOption.apply(this,arguments);a=="active"&&this.activate(b);if(a=="icons"){this._destroyIcons();
b&&this._createIcons()}if(a=="disabled")this.headers.add(this.headers.next())[b?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(a){if(!(this.options.disabled||a.altKey||a.ctrlKey)){var b=c.ui.keyCode,d=this.headers.length,h=this.headers.index(a.target),f=false;switch(a.keyCode){case b.RIGHT:case b.DOWN:f=this.headers[(h+1)%d];break;case b.LEFT:case b.UP:f=this.headers[(h-1+d)%d];break;case b.SPACE:case b.ENTER:this._clickHandler({target:a.target},a.target);
a.preventDefault()}if(f){c(a.target).attr("tabIndex",-1);c(f).attr("tabIndex",0);f.focus();return false}return true}},resize:function(){var a=this.options,b;if(a.fillSpace){if(c.browser.msie){var d=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}b=this.element.parent().height();c.browser.msie&&this.element.parent().css("overflow",d);this.headers.each(function(){b-=c(this).outerHeight(true)});this.headers.next().each(function(){c(this).height(Math.max(0,b-c(this).innerHeight()+
c(this).height()))}).css("overflow","auto")}else if(a.autoHeight){b=0;this.headers.next().each(function(){b=Math.max(b,c(this).height("").height())}).height(b)}return this},activate:function(a){this.options.active=a;a=this._findActive(a)[0];this._clickHandler({target:a},a);return this},_findActive:function(a){return a?typeof a==="number"?this.headers.filter(":eq("+a+")"):this.headers.not(this.headers.not(a)):a===false?c([]):this.headers.filter(":eq(0)")},_clickHandler:function(a,b){var d=this.options;
if(!d.disabled)if(a.target){a=c(a.currentTarget||b);b=a[0]===this.active[0];d.active=d.collapsible&&b?false:this.headers.index(a);if(!(this.running||!d.collapsible&&b)){var h=this.active;j=a.next();g=this.active.next();e={options:d,newHeader:b&&d.collapsible?c([]):a,oldHeader:this.active,newContent:b&&d.collapsible?c([]):j,oldContent:g};var f=this.headers.index(this.active[0])>this.headers.index(a[0]);this.active=b?c([]):a;this._toggle(j,g,e,b,f);h.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
if(!b){a.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);a.next().addClass("ui-accordion-content-active")}}}else if(d.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);this.active.next().addClass("ui-accordion-content-active");var g=this.active.next(),
e={options:d,newHeader:c([]),oldHeader:d.active,newContent:c([]),oldContent:g},j=this.active=c([]);this._toggle(j,g,e)}},_toggle:function(a,b,d,h,f){var g=this,e=g.options;g.toShow=a;g.toHide=b;g.data=d;var j=function(){if(g)return g._completed.apply(g,arguments)};g._trigger("changestart",null,g.data);g.running=b.size()===0?a.size():b.size();if(e.animated){d={};d=e.collapsible&&h?{toShow:c([]),toHide:b,complete:j,down:f,autoHeight:e.autoHeight||e.fillSpace}:{toShow:a,toHide:b,complete:j,down:f,autoHeight:e.autoHeight||
e.fillSpace};if(!e.proxied)e.proxied=e.animated;if(!e.proxiedDuration)e.proxiedDuration=e.duration;e.animated=c.isFunction(e.proxied)?e.proxied(d):e.proxied;e.duration=c.isFunction(e.proxiedDuration)?e.proxiedDuration(d):e.proxiedDuration;h=c.ui.accordion.animations;var i=e.duration,k=e.animated;if(k&&!h[k]&&!c.easing[k])k="slide";h[k]||(h[k]=function(l){this.slide(l,{easing:k,duration:i||700})});h[k](d)}else{if(e.collapsible&&h)a.toggle();else{b.hide();a.show()}j(true)}b.prev().attr({"aria-expanded":"false",
tabIndex:-1}).blur();a.prev().attr({"aria-expanded":"true",tabIndex:0}).focus()},_completed:function(a){this.running=a?0:--this.running;if(!this.running){this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""});this.toHide.removeClass("ui-accordion-content-active");if(this.toHide.length)this.toHide.parent()[0].className=this.toHide.parent()[0].className;this._trigger("change",null,this.data)}}});c.extend(c.ui.accordion,{version:"1.8.9",animations:{slide:function(a,b){a=
c.extend({easing:"swing",duration:300},a,b);if(a.toHide.size())if(a.toShow.size()){var d=a.toShow.css("overflow"),h=0,f={},g={},e;b=a.toShow;e=b[0].style.width;b.width(parseInt(b.parent().width(),10)-parseInt(b.css("paddingLeft"),10)-parseInt(b.css("paddingRight"),10)-(parseInt(b.css("borderLeftWidth"),10)||0)-(parseInt(b.css("borderRightWidth"),10)||0));c.each(["height","paddingTop","paddingBottom"],function(j,i){g[i]="hide";j=(""+c.css(a.toShow[0],i)).match(/^([\d+-.]+)(.*)$/);f[i]={value:j[1],
unit:j[2]||"px"}});a.toShow.css({height:0,overflow:"hidden"}).show();a.toHide.filter(":hidden").each(a.complete).end().filter(":visible").animate(g,{step:function(j,i){if(i.prop=="height")h=i.end-i.start===0?0:(i.now-i.start)/(i.end-i.start);a.toShow[0].style[i.prop]=h*f[i.prop].value+f[i.prop].unit},duration:a.duration,easing:a.easing,complete:function(){a.autoHeight||a.toShow.css("height","");a.toShow.css({width:e,overflow:d});a.complete()}})}else a.toHide.animate({height:"hide",paddingTop:"hide",
paddingBottom:"hide"},a);else a.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},a)},bounceslide:function(a){this.slide(a,{easing:a.down?"easeOutBounce":"swing",duration:a.down?1E3:200})}}})})(jQuery);
;/*
 * jQuery UI Autocomplete 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Autocomplete
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 */
(function(d){d.widget("ui.autocomplete",{options:{appendTo:"body",delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var a=this,b=this.element[0].ownerDocument,f;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(c){if(!(a.options.disabled||a.element.attr("readonly"))){f=false;var e=d.ui.keyCode;
switch(c.keyCode){case e.PAGE_UP:a._move("previousPage",c);break;case e.PAGE_DOWN:a._move("nextPage",c);break;case e.UP:a._move("previous",c);c.preventDefault();break;case e.DOWN:a._move("next",c);c.preventDefault();break;case e.ENTER:case e.NUMPAD_ENTER:if(a.menu.active){f=true;c.preventDefault()}case e.TAB:if(!a.menu.active)return;a.menu.select(c);break;case e.ESCAPE:a.element.val(a.term);a.close(c);break;default:clearTimeout(a.searching);a.searching=setTimeout(function(){if(a.term!=a.element.val()){a.selectedItem=
null;a.search(null,c)}},a.options.delay);break}}}).bind("keypress.autocomplete",function(c){if(f){f=false;c.preventDefault()}}).bind("focus.autocomplete",function(){if(!a.options.disabled){a.selectedItem=null;a.previous=a.element.val()}}).bind("blur.autocomplete",function(c){if(!a.options.disabled){clearTimeout(a.searching);a.closing=setTimeout(function(){a.close(c);a._change(c)},150)}});this._initSource();this.response=function(){return a._response.apply(a,arguments)};this.menu=d("<ul></ul>").addClass("ui-autocomplete").appendTo(d(this.options.appendTo||
"body",b)[0]).mousedown(function(c){var e=a.menu.element[0];d(c.target).closest(".ui-menu-item").length||setTimeout(function(){d(document).one("mousedown",function(g){g.target!==a.element[0]&&g.target!==e&&!d.ui.contains(e,g.target)&&a.close()})},1);setTimeout(function(){clearTimeout(a.closing)},13)}).menu({focus:function(c,e){e=e.item.data("item.autocomplete");false!==a._trigger("focus",c,{item:e})&&/^key/.test(c.originalEvent.type)&&a.element.val(e.value)},selected:function(c,e){var g=e.item.data("item.autocomplete"),
h=a.previous;if(a.element[0]!==b.activeElement){a.element.focus();a.previous=h;setTimeout(function(){a.previous=h;a.selectedItem=g},1)}false!==a._trigger("select",c,{item:g})&&a.element.val(g.value);a.term=a.element.val();a.close(c);a.selectedItem=g},blur:function(){a.menu.element.is(":visible")&&a.element.val()!==a.term&&a.element.val(a.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");d.fn.bgiframe&&this.menu.element.bgiframe()},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
this.menu.element.remove();d.Widget.prototype.destroy.call(this)},_setOption:function(a,b){d.Widget.prototype._setOption.apply(this,arguments);a==="source"&&this._initSource();if(a==="appendTo")this.menu.element.appendTo(d(b||"body",this.element[0].ownerDocument)[0]);a==="disabled"&&b&&this.xhr&&this.xhr.abort()},_initSource:function(){var a=this,b,f;if(d.isArray(this.options.source)){b=this.options.source;this.source=function(c,e){e(d.ui.autocomplete.filter(b,c.term))}}else if(typeof this.options.source===
"string"){f=this.options.source;this.source=function(c,e){a.xhr&&a.xhr.abort();a.xhr=d.ajax({url:f,data:c,dataType:"json",success:function(g,h,i){i===a.xhr&&e(g);a.xhr=null},error:function(g){g===a.xhr&&e([]);a.xhr=null}})}}else this.source=this.options.source},search:function(a,b){a=a!=null?a:this.element.val();this.term=this.element.val();if(a.length<this.options.minLength)return this.close(b);clearTimeout(this.closing);if(this._trigger("search",b)!==false)return this._search(a)},_search:function(a){this.pending++;
this.element.addClass("ui-autocomplete-loading");this.source({term:a},this.response)},_response:function(a){if(!this.options.disabled&&a&&a.length){a=this._normalize(a);this._suggest(a);this._trigger("open")}else this.close();this.pending--;this.pending||this.element.removeClass("ui-autocomplete-loading")},close:function(a){clearTimeout(this.closing);if(this.menu.element.is(":visible")){this.menu.element.hide();this.menu.deactivate();this._trigger("close",a)}},_change:function(a){this.previous!==
this.element.val()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(a){if(a.length&&a[0].label&&a[0].value)return a;return d.map(a,function(b){if(typeof b==="string")return{label:b,value:b};return d.extend({label:b.label||b.value,value:b.value||b.label},b)})},_suggest:function(a){var b=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(b,a);this.menu.deactivate();this.menu.refresh();b.show();this._resizeMenu();b.position(d.extend({of:this.element},this.options.position))},
_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth(),this.element.outerWidth()))},_renderMenu:function(a,b){var f=this;d.each(b,function(c,e){f._renderItem(a,e)})},_renderItem:function(a,b){return d("<li></li>").data("item.autocomplete",b).append(d("<a></a>").text(b.label)).appendTo(a)},_move:function(a,b){if(this.menu.element.is(":visible"))if(this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a)){this.element.val(this.term);this.menu.deactivate()}else this.menu[a](b);
else this.search(null,b)},widget:function(){return this.menu.element}});d.extend(d.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},filter:function(a,b){var f=new RegExp(d.ui.autocomplete.escapeRegex(b),"i");return d.grep(a,function(c){return f.test(c.label||c.value||c)})}})})(jQuery);
(function(d){d.widget("ui.menu",{_create:function(){var a=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(b){if(d(b.target).closest(".ui-menu-item a").length){b.preventDefault();a.select(b)}});this.refresh()},refresh:function(){var a=this;this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem").children("a").addClass("ui-corner-all").attr("tabindex",
-1).mouseenter(function(b){a.activate(b,d(this).parent())}).mouseleave(function(){a.deactivate()})},activate:function(a,b){this.deactivate();if(this.hasScroll()){var f=b.offset().top-this.element.offset().top,c=this.element.attr("scrollTop"),e=this.element.height();if(f<0)this.element.attr("scrollTop",c+f);else f>=e&&this.element.attr("scrollTop",c+f-e+b.height())}this.active=b.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();this._trigger("focus",a,{item:b})},
deactivate:function(){if(this.active){this.active.children("a").removeClass("ui-state-hover").removeAttr("id");this._trigger("blur");this.active=null}},next:function(a){this.move("next",".ui-menu-item:first",a)},previous:function(a){this.move("prev",".ui-menu-item:last",a)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(a,b,f){if(this.active){a=this.active[a+"All"](".ui-menu-item").eq(0);
a.length?this.activate(f,a):this.activate(f,this.element.children(b))}else this.activate(f,this.element.children(b))},nextPage:function(a){if(this.hasScroll())if(!this.active||this.last())this.activate(a,this.element.children(".ui-menu-item:first"));else{var b=this.active.offset().top,f=this.element.height(),c=this.element.children(".ui-menu-item").filter(function(){var e=d(this).offset().top-b-f+d(this).height();return e<10&&e>-10});c.length||(c=this.element.children(".ui-menu-item:last"));this.activate(a,
c)}else this.activate(a,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))},previousPage:function(a){if(this.hasScroll())if(!this.active||this.first())this.activate(a,this.element.children(".ui-menu-item:last"));else{var b=this.active.offset().top,f=this.element.height();result=this.element.children(".ui-menu-item").filter(function(){var c=d(this).offset().top-b+f-d(this).height();return c<10&&c>-10});result.length||(result=this.element.children(".ui-menu-item:first"));
this.activate(a,result)}else this.activate(a,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element.attr("scrollHeight")},select:function(a){this._trigger("selected",a,{item:this.active})}})})(jQuery);
;/*
 * jQuery UI Button 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Button
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(a){var g,i=function(b){a(":ui-button",b.target.form).each(function(){var c=a(this).data("button");setTimeout(function(){c.refresh()},1)})},h=function(b){var c=b.name,d=b.form,e=a([]);if(c)e=d?a(d).find("[name='"+c+"']"):a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form});return e};a.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",
i);if(typeof this.options.disabled!=="boolean")this.options.disabled=this.element.attr("disabled");this._determineButtonType();this.hasTitle=!!this.buttonElement.attr("title");var b=this,c=this.options,d=this.type==="checkbox"||this.type==="radio",e="ui-state-hover"+(!d?" ui-state-active":"");if(c.label===null)c.label=this.buttonElement.html();if(this.element.is(":disabled"))c.disabled=true;this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",
function(){if(!c.disabled){a(this).addClass("ui-state-hover");this===g&&a(this).addClass("ui-state-active")}}).bind("mouseleave.button",function(){c.disabled||a(this).removeClass(e)}).bind("focus.button",function(){a(this).addClass("ui-state-focus")}).bind("blur.button",function(){a(this).removeClass("ui-state-focus")});d&&this.element.bind("change.button",function(){b.refresh()});if(this.type==="checkbox")this.buttonElement.bind("click.button",function(){if(c.disabled)return false;a(this).toggleClass("ui-state-active");
b.buttonElement.attr("aria-pressed",b.element[0].checked)});else if(this.type==="radio")this.buttonElement.bind("click.button",function(){if(c.disabled)return false;a(this).addClass("ui-state-active");b.buttonElement.attr("aria-pressed",true);var f=b.element[0];h(f).not(f).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed",false)});else{this.buttonElement.bind("mousedown.button",function(){if(c.disabled)return false;a(this).addClass("ui-state-active");
g=this;a(document).one("mouseup",function(){g=null})}).bind("mouseup.button",function(){if(c.disabled)return false;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(f){if(c.disabled)return false;if(f.keyCode==a.ui.keyCode.SPACE||f.keyCode==a.ui.keyCode.ENTER)a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")});this.buttonElement.is("a")&&this.buttonElement.keyup(function(f){f.keyCode===a.ui.keyCode.SPACE&&a(this).click()})}this._setOption("disabled",
c.disabled)},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?"input":"button";if(this.type==="checkbox"||this.type==="radio"){this.buttonElement=this.element.parents().last().find("label[for="+this.element.attr("id")+"]");this.element.addClass("ui-helper-hidden-accessible");var b=this.element.is(":checked");b&&this.buttonElement.addClass("ui-state-active");this.buttonElement.attr("aria-pressed",b)}else this.buttonElement=
this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());this.hasTitle||
this.buttonElement.removeAttr("title");a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled")c?this.element.attr("disabled",true):this.element.removeAttr("disabled");this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b);if(this.type==="radio")h(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed",
true):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed",false)});else if(this.type==="checkbox")this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed",true):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed",false)},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var b=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
c=a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,e=d.primary&&d.secondary;if(d.primary||d.secondary){b.addClass("ui-button-text-icon"+(e?"s":d.primary?"-primary":"-secondary"));d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>");d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>");if(!this.options.text){b.addClass(e?"ui-button-icons-only":"ui-button-icon-only").removeClass("ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary");
this.hasTitle||b.attr("title",c)}}else b.addClass("ui-button-text-only")}}});a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c);a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()},
destroy:function(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");a.Widget.prototype.destroy.call(this)}})})(jQuery);
;/*
 * jQuery UI Dialog 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */
(function(c,j){var k={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},l={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true};c.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(a){var b=c(this).css(a).offset().top;b<0&&
c(this).css("top",a.top-b)}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1E3},_create:function(){this.originalTitle=this.element.attr("title");if(typeof this.originalTitle!=="string")this.originalTitle="";this.options.title=this.options.title||this.originalTitle;var a=this,b=a.options,d=b.title||"&#160;",e=c.ui.dialog.getTitleId(a.element),g=(a.uiDialog=c("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b.dialogClass).css({zIndex:b.zIndex}).attr("tabIndex",
-1).css("outline",0).keydown(function(i){if(b.closeOnEscape&&i.keyCode&&i.keyCode===c.ui.keyCode.ESCAPE){a.close(i);i.preventDefault()}}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(i){a.moveToTop(false,i)});a.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g);var f=(a.uiDialogTitlebar=c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),h=c('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role",
"button").hover(function(){h.addClass("ui-state-hover")},function(){h.removeClass("ui-state-hover")}).focus(function(){h.addClass("ui-state-focus")}).blur(function(){h.removeClass("ui-state-focus")}).click(function(i){a.close(i);return false}).appendTo(f);(a.uiDialogTitlebarCloseText=c("<span></span>")).addClass("ui-icon ui-icon-closethick").text(b.closeText).appendTo(h);c("<span></span>").addClass("ui-dialog-title").attr("id",e).html(d).prependTo(f);if(c.isFunction(b.beforeclose)&&!c.isFunction(b.beforeClose))b.beforeClose=
b.beforeclose;f.find("*").add(f).disableSelection();b.draggable&&c.fn.draggable&&a._makeDraggable();b.resizable&&c.fn.resizable&&a._makeResizable();a._createButtons(b.buttons);a._isOpen=false;c.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;a.overlay&&a.overlay.destroy();a.uiDialog.hide();a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");a.uiDialog.remove();a.originalTitle&&
a.element.attr("title",a.originalTitle);return a},widget:function(){return this.uiDialog},close:function(a){var b=this,d,e;if(false!==b._trigger("beforeClose",a)){b.overlay&&b.overlay.destroy();b.uiDialog.unbind("keypress.ui-dialog");b._isOpen=false;if(b.options.hide)b.uiDialog.hide(b.options.hide,function(){b._trigger("close",a)});else{b.uiDialog.hide();b._trigger("close",a)}c.ui.dialog.overlay.resize();if(b.options.modal){d=0;c(".ui-dialog").each(function(){if(this!==b.uiDialog[0]){e=c(this).css("z-index");
isNaN(e)||(d=Math.max(d,e))}});c.ui.dialog.maxZ=d}return b}},isOpen:function(){return this._isOpen},moveToTop:function(a,b){var d=this,e=d.options;if(e.modal&&!a||!e.stack&&!e.modal)return d._trigger("focus",b);if(e.zIndex>c.ui.dialog.maxZ)c.ui.dialog.maxZ=e.zIndex;if(d.overlay){c.ui.dialog.maxZ+=1;d.overlay.$el.css("z-index",c.ui.dialog.overlay.maxZ=c.ui.dialog.maxZ)}a={scrollTop:d.element.attr("scrollTop"),scrollLeft:d.element.attr("scrollLeft")};c.ui.dialog.maxZ+=1;d.uiDialog.css("z-index",c.ui.dialog.maxZ);
d.element.attr(a);d._trigger("focus",b);return d},open:function(){if(!this._isOpen){var a=this,b=a.options,d=a.uiDialog;a.overlay=b.modal?new c.ui.dialog.overlay(a):null;a._size();a._position(b.position);d.show(b.show);a.moveToTop(true);b.modal&&d.bind("keypress.ui-dialog",function(e){if(e.keyCode===c.ui.keyCode.TAB){var g=c(":tabbable",this),f=g.filter(":first");g=g.filter(":last");if(e.target===g[0]&&!e.shiftKey){f.focus(1);return false}else if(e.target===f[0]&&e.shiftKey){g.focus(1);return false}}});
c(a.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus();a._isOpen=true;a._trigger("open");return a}},_createButtons:function(a){var b=this,d=false,e=c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=c("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);b.uiDialog.find(".ui-dialog-buttonpane").remove();typeof a==="object"&&a!==null&&c.each(a,function(){return!(d=true)});if(d){c.each(a,function(f,
h){h=c.isFunction(h)?{click:h,text:f}:h;f=c('<button type="button"></button>').attr(h,true).unbind("click").click(function(){h.click.apply(b.element[0],arguments)}).appendTo(g);c.fn.button&&f.button()});e.appendTo(b.uiDialog)}},_makeDraggable:function(){function a(f){return{position:f.position,offset:f.offset}}var b=this,d=b.options,e=c(document),g;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(f,h){g=
d.height==="auto"?"auto":c(this).height();c(this).height(c(this).height()).addClass("ui-dialog-dragging");b._trigger("dragStart",f,a(h))},drag:function(f,h){b._trigger("drag",f,a(h))},stop:function(f,h){d.position=[h.position.left-e.scrollLeft(),h.position.top-e.scrollTop()];c(this).removeClass("ui-dialog-dragging").height(g);b._trigger("dragStop",f,a(h));c.ui.dialog.overlay.resize()}})},_makeResizable:function(a){function b(f){return{originalPosition:f.originalPosition,originalSize:f.originalSize,
position:f.position,size:f.size}}a=a===j?this.options.resizable:a;var d=this,e=d.options,g=d.uiDialog.css("position");a=typeof a==="string"?a:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:a,start:function(f,h){c(this).addClass("ui-dialog-resizing");d._trigger("resizeStart",f,b(h))},resize:function(f,h){d._trigger("resize",f,b(h))},stop:function(f,
h){c(this).removeClass("ui-dialog-resizing");e.height=c(this).height();e.width=c(this).width();d._trigger("resizeStop",f,b(h));c.ui.dialog.overlay.resize()}}).css("position",g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(a){var b=[],d=[0,0],e;if(a){if(typeof a==="string"||typeof a==="object"&&"0"in a){b=a.split?a.split(" "):[a[0],a[1]];if(b.length===
1)b[1]=b[0];c.each(["left","top"],function(g,f){if(+b[g]===b[g]){d[g]=b[g];b[g]=f}});a={my:b.join(" "),at:b.join(" "),offset:d.join(" ")}}a=c.extend({},c.ui.dialog.prototype.options.position,a)}else a=c.ui.dialog.prototype.options.position;(e=this.uiDialog.is(":visible"))||this.uiDialog.show();this.uiDialog.css({top:0,left:0}).position(c.extend({of:window},a));e||this.uiDialog.hide()},_setOptions:function(a){var b=this,d={},e=false;c.each(a,function(g,f){b._setOption(g,f);if(g in k)e=true;if(g in
l)d[g]=f});e&&this._size();this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",d)},_setOption:function(a,b){var d=this,e=d.uiDialog;switch(a){case "beforeclose":a="beforeClose";break;case "buttons":d._createButtons(b);break;case "closeText":d.uiDialogTitlebarCloseText.text(""+b);break;case "dialogClass":e.removeClass(d.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b);break;case "disabled":b?e.addClass("ui-dialog-disabled"):e.removeClass("ui-dialog-disabled");
break;case "draggable":var g=e.is(":data(draggable)");g&&!b&&e.draggable("destroy");!g&&b&&d._makeDraggable();break;case "position":d._position(b);break;case "resizable":(g=e.is(":data(resizable)"))&&!b&&e.resizable("destroy");g&&typeof b==="string"&&e.resizable("option","handles",b);!g&&b!==false&&d._makeResizable(b);break;case "title":c(".ui-dialog-title",d.uiDialogTitlebar).html(""+(b||"&#160;"));break}c.Widget.prototype._setOption.apply(d,arguments)},_size:function(){var a=this.options,b,d,e=
this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0});if(a.minWidth>a.width)a.width=a.minWidth;b=this.uiDialog.css({height:"auto",width:a.width}).height();d=Math.max(0,a.minHeight-b);if(a.height==="auto")if(c.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();a=this.element.css("height","auto").height();e||this.uiDialog.hide();this.element.height(Math.max(a,d))}else this.element.height(Math.max(a.height-b,0));this.uiDialog.is(":data(resizable)")&&
this.uiDialog.resizable("option","minHeight",this._minHeight())}});c.extend(c.ui.dialog,{version:"1.8.9",uuid:0,maxZ:0,getTitleId:function(a){a=a.attr("id");if(!a){this.uuid+=1;a=this.uuid}return"ui-dialog-title-"+a},overlay:function(a){this.$el=c.ui.dialog.overlay.create(a)}});c.extend(c.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(a){if(this.instances.length===
0){setTimeout(function(){c.ui.dialog.overlay.instances.length&&c(document).bind(c.ui.dialog.overlay.events,function(d){if(c(d.target).zIndex()<c.ui.dialog.overlay.maxZ)return false})},1);c(document).bind("keydown.dialog-overlay",function(d){if(a.options.closeOnEscape&&d.keyCode&&d.keyCode===c.ui.keyCode.ESCAPE){a.close(d);d.preventDefault()}});c(window).bind("resize.dialog-overlay",c.ui.dialog.overlay.resize)}var b=(this.oldInstances.pop()||c("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),
height:this.height()});c.fn.bgiframe&&b.bgiframe();this.instances.push(b);return b},destroy:function(a){var b=c.inArray(a,this.instances);b!=-1&&this.oldInstances.push(this.instances.splice(b,1)[0]);this.instances.length===0&&c([document,window]).unbind(".dialog-overlay");a.remove();var d=0;c.each(this.instances,function(){d=Math.max(d,this.css("z-index"))});this.maxZ=d},height:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
b=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return a<b?c(window).height()+"px":a+"px"}else return c(document).height()+"px"},width:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);b=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return a<b?c(window).width()+"px":a+"px"}else return c(document).width()+"px"},resize:function(){var a=c([]);c.each(c.ui.dialog.overlay.instances,
function(){a=a.add(this)});a.css({width:0,height:0}).css({width:c.ui.dialog.overlay.width(),height:c.ui.dialog.overlay.height()})}});c.extend(c.ui.dialog.overlay.prototype,{destroy:function(){c.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);
;/*
 * jQuery UI Slider 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.slider",d.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var b=this,a=this.options;this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");a.disabled&&this.element.addClass("ui-slider-disabled ui-disabled");
this.range=d([]);if(a.range){if(a.range===true){this.range=d("<div></div>");if(!a.values)a.values=[this._valueMin(),this._valueMin()];if(a.values.length&&a.values.length!==2)a.values=[a.values[0],a.values[0]]}else this.range=d("<div></div>");this.range.appendTo(this.element).addClass("ui-slider-range");if(a.range==="min"||a.range==="max")this.range.addClass("ui-slider-range-"+a.range);this.range.addClass("ui-widget-header")}d(".ui-slider-handle",this.element).length===0&&d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
if(a.values&&a.values.length)for(;d(".ui-slider-handle",this.element).length<a.values.length;)d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");this.handles=d(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(c){c.preventDefault()}).hover(function(){a.disabled||d(this).addClass("ui-state-hover")},function(){d(this).removeClass("ui-state-hover")}).focus(function(){if(a.disabled)d(this).blur();
else{d(".ui-slider .ui-state-focus").removeClass("ui-state-focus");d(this).addClass("ui-state-focus")}}).blur(function(){d(this).removeClass("ui-state-focus")});this.handles.each(function(c){d(this).data("index.ui-slider-handle",c)});this.handles.keydown(function(c){var e=true,f=d(this).data("index.ui-slider-handle"),h,g,i;if(!b.options.disabled){switch(c.keyCode){case d.ui.keyCode.HOME:case d.ui.keyCode.END:case d.ui.keyCode.PAGE_UP:case d.ui.keyCode.PAGE_DOWN:case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:e=
false;if(!b._keySliding){b._keySliding=true;d(this).addClass("ui-state-active");h=b._start(c,f);if(h===false)return}break}i=b.options.step;h=b.options.values&&b.options.values.length?(g=b.values(f)):(g=b.value());switch(c.keyCode){case d.ui.keyCode.HOME:g=b._valueMin();break;case d.ui.keyCode.END:g=b._valueMax();break;case d.ui.keyCode.PAGE_UP:g=b._trimAlignValue(h+(b._valueMax()-b._valueMin())/5);break;case d.ui.keyCode.PAGE_DOWN:g=b._trimAlignValue(h-(b._valueMax()-b._valueMin())/5);break;case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:if(h===
b._valueMax())return;g=b._trimAlignValue(h+i);break;case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:if(h===b._valueMin())return;g=b._trimAlignValue(h-i);break}b._slide(c,f,g);return e}}).keyup(function(c){var e=d(this).data("index.ui-slider-handle");if(b._keySliding){b._keySliding=false;b._stop(c,e);b._change(c,e);d(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();return this},_mouseCapture:function(b){var a=this.options,c,e,f,h,g;if(a.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();c=this._normValueFromMouse({x:b.pageX,y:b.pageY});e=this._valueMax()-this._valueMin()+1;h=this;this.handles.each(function(i){var j=Math.abs(c-h.values(i));if(e>j){e=j;f=d(this);g=i}});if(a.range===true&&this.values(1)===a.min){g+=1;f=d(this.handles[g])}if(this._start(b,
g)===false)return false;this._mouseSliding=true;h._handleIndex=g;f.addClass("ui-state-active").focus();a=f.offset();this._clickOffset=!d(b.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:b.pageX-a.left-f.width()/2,top:b.pageY-a.top-f.height()/2-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)};this.handles.hasClass("ui-state-hover")||this._slide(b,g,c);return this._animateOff=true},_mouseStart:function(){return true},
_mouseDrag:function(b){var a=this._normValueFromMouse({x:b.pageX,y:b.pageY});this._slide(b,this._handleIndex,a);return false},_mouseStop:function(b){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(b,this._handleIndex);this._change(b,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(b){var a;
if(this.orientation==="horizontal"){a=this.elementSize.width;b=b.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{a=this.elementSize.height;b=b.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}a=b/a;if(a>1)a=1;if(a<0)a=0;if(this.orientation==="vertical")a=1-a;b=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+a*b)},_start:function(b,a){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=
this.values(a);c.values=this.values()}return this._trigger("start",b,c)},_slide:function(b,a,c){var e;if(this.options.values&&this.options.values.length){e=this.values(a?0:1);if(this.options.values.length===2&&this.options.range===true&&(a===0&&c>e||a===1&&c<e))c=e;if(c!==this.values(a)){e=this.values();e[a]=c;b=this._trigger("slide",b,{handle:this.handles[a],value:c,values:e});this.values(a?0:1);b!==false&&this.values(a,c,true)}}else if(c!==this.value()){b=this._trigger("slide",b,{handle:this.handles[a],
value:c});b!==false&&this.value(c)}},_stop:function(b,a){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(a);c.values=this.values()}this._trigger("stop",b,c)},_change:function(b,a){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(a);c.values=this.values()}this._trigger("change",b,c)}},value:function(b){if(arguments.length){this.options.value=
this._trimAlignValue(b);this._refreshValue();this._change(null,0)}return this._value()},values:function(b,a){var c,e,f;if(arguments.length>1){this.options.values[b]=this._trimAlignValue(a);this._refreshValue();this._change(null,b)}if(arguments.length)if(d.isArray(arguments[0])){c=this.options.values;e=arguments[0];for(f=0;f<c.length;f+=1){c[f]=this._trimAlignValue(e[f]);this._change(null,f)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(b):this.value();
else return this._values()},_setOption:function(b,a){var c,e=0;if(d.isArray(this.options.values))e=this.options.values.length;d.Widget.prototype._setOption.apply(this,arguments);switch(b){case "disabled":if(a){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled");this.element.addClass("ui-disabled")}else{this.handles.removeAttr("disabled");this.element.removeClass("ui-disabled")}break;case "orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case "value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case "values":this._animateOff=true;this._refreshValue();for(c=0;c<e;c+=1)this._change(null,c);this._animateOff=false;break}},_value:function(){var b=this.options.value;return b=this._trimAlignValue(b)},_values:function(b){var a,c;if(arguments.length){a=this.options.values[b];
return a=this._trimAlignValue(a)}else{a=this.options.values.slice();for(c=0;c<a.length;c+=1)a[c]=this._trimAlignValue(a[c]);return a}},_trimAlignValue:function(b){if(b<=this._valueMin())return this._valueMin();if(b>=this._valueMax())return this._valueMax();var a=this.options.step>0?this.options.step:1,c=(b-this._valueMin())%a;alignValue=b-c;if(Math.abs(c)*2>=a)alignValue+=c>0?a:-a;return parseFloat(alignValue.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},
_refreshValue:function(){var b=this.options.range,a=this.options,c=this,e=!this._animateOff?a.animate:false,f,h={},g,i,j,l;if(this.options.values&&this.options.values.length)this.handles.each(function(k){f=(c.values(k)-c._valueMin())/(c._valueMax()-c._valueMin())*100;h[c.orientation==="horizontal"?"left":"bottom"]=f+"%";d(this).stop(1,1)[e?"animate":"css"](h,a.animate);if(c.options.range===true)if(c.orientation==="horizontal"){if(k===0)c.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},a.animate);
if(k===1)c.range[e?"animate":"css"]({width:f-g+"%"},{queue:false,duration:a.animate})}else{if(k===0)c.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},a.animate);if(k===1)c.range[e?"animate":"css"]({height:f-g+"%"},{queue:false,duration:a.animate})}g=f});else{i=this.value();j=this._valueMin();l=this._valueMax();f=l!==j?(i-j)/(l-j)*100:0;h[c.orientation==="horizontal"?"left":"bottom"]=f+"%";this.handle.stop(1,1)[e?"animate":"css"](h,a.animate);if(b==="min"&&this.orientation==="horizontal")this.range.stop(1,
1)[e?"animate":"css"]({width:f+"%"},a.animate);if(b==="max"&&this.orientation==="horizontal")this.range[e?"animate":"css"]({width:100-f+"%"},{queue:false,duration:a.animate});if(b==="min"&&this.orientation==="vertical")this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},a.animate);if(b==="max"&&this.orientation==="vertical")this.range[e?"animate":"css"]({height:100-f+"%"},{queue:false,duration:a.animate})}}});d.extend(d.ui.slider,{version:"1.8.9"})})(jQuery);
;/*
 * jQuery UI Tabs 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(d,p){function u(){return++v}function w(){return++x}var v=0,x=0;d.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)},_setOption:function(b,e){if(b=="selected")this.options.collapsible&&
e==this.options.selected||this.select(e);else{this.options[b]=e;this._tabify()}},_tabId:function(b){return b.title&&b.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+u()},_sanitizeSelector:function(b){return b.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+w());return d.cookie.apply(null,[b].concat(d.makeArray(arguments)))},_ui:function(b,e){return{tab:b,panel:e,index:this.anchors.index(b)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=
d(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(b){function e(g,f){g.css("display","");!d.support.opacity&&f.opacity&&g[0].style.removeAttribute("filter")}var a=this,c=this.options,h=/^#.+/;this.list=this.element.find("ol,ul").eq(0);this.lis=d(" > li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return d("a",this)[0]});this.panels=d([]);this.anchors.each(function(g,f){var i=d(f).attr("href"),l=i.split("#")[0],q;if(l&&(l===location.toString().split("#")[0]||
(q=d("base")[0])&&l===q.href)){i=f.hash;f.href=i}if(h.test(i))a.panels=a.panels.add(a.element.find(a._sanitizeSelector(i)));else if(i&&i!=="#"){d.data(f,"href.tabs",i);d.data(f,"load.tabs",i.replace(/#.*$/,""));i=a._tabId(f);f.href="#"+i;f=a.element.find("#"+i);if(!f.length){f=d(c.panelTemplate).attr("id",i).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(a.panels[g-1]||a.list);f.data("destroy.tabs",true)}a.panels=a.panels.add(f)}else c.disabled.push(g)});if(b){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(c.selected===p){location.hash&&this.anchors.each(function(g,f){if(f.hash==location.hash){c.selected=g;return false}});if(typeof c.selected!=="number"&&c.cookie)c.selected=parseInt(a._cookie(),10);if(typeof c.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length)c.selected=
this.lis.index(this.lis.filter(".ui-tabs-selected"));c.selected=c.selected||(this.lis.length?0:-1)}else if(c.selected===null)c.selected=-1;c.selected=c.selected>=0&&this.anchors[c.selected]||c.selected<0?c.selected:0;c.disabled=d.unique(c.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"),function(g){return a.lis.index(g)}))).sort();d.inArray(c.selected,c.disabled)!=-1&&c.disabled.splice(d.inArray(c.selected,c.disabled),1);this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");
if(c.selected>=0&&this.anchors.length){a.element.find(a._sanitizeSelector(a.anchors[c.selected].hash)).removeClass("ui-tabs-hide");this.lis.eq(c.selected).addClass("ui-tabs-selected ui-state-active");a.element.queue("tabs",function(){a._trigger("show",null,a._ui(a.anchors[c.selected],a.element.find(a._sanitizeSelector(a.anchors[c.selected].hash))[0]))});this.load(c.selected)}d(window).bind("unload",function(){a.lis.add(a.anchors).unbind(".tabs");a.lis=a.anchors=a.panels=null})}else c.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));
this.element[c.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");c.cookie&&this._cookie(c.selected,c.cookie);b=0;for(var j;j=this.lis[b];b++)d(j)[d.inArray(b,c.disabled)!=-1&&!d(j).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");c.cache===false&&this.anchors.removeData("cache.tabs");this.lis.add(this.anchors).unbind(".tabs");if(c.event!=="mouseover"){var k=function(g,f){f.is(":not(.ui-state-disabled)")&&f.addClass("ui-state-"+g)},n=function(g,f){f.removeClass("ui-state-"+
g)};this.lis.bind("mouseover.tabs",function(){k("hover",d(this))});this.lis.bind("mouseout.tabs",function(){n("hover",d(this))});this.anchors.bind("focus.tabs",function(){k("focus",d(this).closest("li"))});this.anchors.bind("blur.tabs",function(){n("focus",d(this).closest("li"))})}var m,o;if(c.fx)if(d.isArray(c.fx)){m=c.fx[0];o=c.fx[1]}else m=o=c.fx;var r=o?function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.hide().removeClass("ui-tabs-hide").animate(o,o.duration||"normal",
function(){e(f,o);a._trigger("show",null,a._ui(g,f[0]))})}:function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");a._trigger("show",null,a._ui(g,f[0]))},s=m?function(g,f){f.animate(m,m.duration||"normal",function(){a.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");e(f,m);a.element.dequeue("tabs")})}:function(g,f){a.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");a.element.dequeue("tabs")};
this.anchors.bind(c.event+".tabs",function(){var g=this,f=d(g).closest("li"),i=a.panels.filter(":not(.ui-tabs-hide)"),l=a.element.find(a._sanitizeSelector(g.hash));if(f.hasClass("ui-tabs-selected")&&!c.collapsible||f.hasClass("ui-state-disabled")||f.hasClass("ui-state-processing")||a.panels.filter(":animated").length||a._trigger("select",null,a._ui(this,l[0]))===false){this.blur();return false}c.selected=a.anchors.index(this);a.abort();if(c.collapsible)if(f.hasClass("ui-tabs-selected")){c.selected=
-1;c.cookie&&a._cookie(c.selected,c.cookie);a.element.queue("tabs",function(){s(g,i)}).dequeue("tabs");this.blur();return false}else if(!i.length){c.cookie&&a._cookie(c.selected,c.cookie);a.element.queue("tabs",function(){r(g,l)});a.load(a.anchors.index(this));this.blur();return false}c.cookie&&a._cookie(c.selected,c.cookie);if(l.length){i.length&&a.element.queue("tabs",function(){s(g,i)});a.element.queue("tabs",function(){r(g,l)});a.load(a.anchors.index(this))}else throw"jQuery UI Tabs: Mismatching fragment identifier.";
d.browser.msie&&this.blur()});this.anchors.bind("click.tabs",function(){return false})},_getIndex:function(b){if(typeof b=="string")b=this.anchors.index(this.anchors.filter("[href$="+b+"]"));return b},destroy:function(){var b=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var e=
d.data(this,"href.tabs");if(e)this.href=e;var a=d(this).unbind(".tabs");d.each(["href","load","cache"],function(c,h){a.removeData(h+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){d.data(this,"destroy.tabs")?d(this).remove():d(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")});b.cookie&&this._cookie(null,b.cookie);return this},add:function(b,
e,a){if(a===p)a=this.anchors.length;var c=this,h=this.options;e=d(h.tabTemplate.replace(/#\{href\}/g,b).replace(/#\{label\}/g,e));b=!b.indexOf("#")?b.replace("#",""):this._tabId(d("a",e)[0]);e.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var j=c.element.find("#"+b);j.length||(j=d(h.panelTemplate).attr("id",b).data("destroy.tabs",true));j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(a>=this.lis.length){e.appendTo(this.list);j.appendTo(this.list[0].parentNode)}else{e.insertBefore(this.lis[a]);
j.insertBefore(this.panels[a])}h.disabled=d.map(h.disabled,function(k){return k>=a?++k:k});this._tabify();if(this.anchors.length==1){h.selected=0;e.addClass("ui-tabs-selected ui-state-active");j.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){c._trigger("show",null,c._ui(c.anchors[0],c.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[a],this.panels[a]));return this},remove:function(b){b=this._getIndex(b);var e=this.options,a=this.lis.eq(b).remove(),c=this.panels.eq(b).remove();
if(a.hasClass("ui-tabs-selected")&&this.anchors.length>1)this.select(b+(b+1<this.anchors.length?1:-1));e.disabled=d.map(d.grep(e.disabled,function(h){return h!=b}),function(h){return h>=b?--h:h});this._tabify();this._trigger("remove",null,this._ui(a.find("a")[0],c[0]));return this},enable:function(b){b=this._getIndex(b);var e=this.options;if(d.inArray(b,e.disabled)!=-1){this.lis.eq(b).removeClass("ui-state-disabled");e.disabled=d.grep(e.disabled,function(a){return a!=b});this._trigger("enable",null,
this._ui(this.anchors[b],this.panels[b]));return this}},disable:function(b){b=this._getIndex(b);var e=this.options;if(b!=e.selected){this.lis.eq(b).addClass("ui-state-disabled");e.disabled.push(b);e.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[b],this.panels[b]))}return this},select:function(b){b=this._getIndex(b);if(b==-1)if(this.options.collapsible&&this.options.selected!=-1)b=this.options.selected;else return this;this.anchors.eq(b).trigger(this.options.event+".tabs");return this},
load:function(b){b=this._getIndex(b);var e=this,a=this.options,c=this.anchors.eq(b)[0],h=d.data(c,"load.tabs");this.abort();if(!h||this.element.queue("tabs").length!==0&&d.data(c,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(b).addClass("ui-state-processing");if(a.spinner){var j=d("span",c);j.data("label.tabs",j.html()).html(a.spinner)}this.xhr=d.ajax(d.extend({},a.ajaxOptions,{url:h,success:function(k,n){e.element.find(e._sanitizeSelector(c.hash)).html(k);e._cleanup();a.cache&&d.data(c,
"cache.tabs",true);e._trigger("load",null,e._ui(e.anchors[b],e.panels[b]));try{a.ajaxOptions.success(k,n)}catch(m){}},error:function(k,n){e._cleanup();e._trigger("load",null,e._ui(e.anchors[b],e.panels[b]));try{a.ajaxOptions.error(k,n,b,c)}catch(m){}}}));e.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]);this.panels.stop(false,true);this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup();return this},
url:function(b,e){this.anchors.eq(b).removeData("cache.tabs").data("load.tabs",e);return this},length:function(){return this.anchors.length}});d.extend(d.ui.tabs,{version:"1.8.9"});d.extend(d.ui.tabs.prototype,{rotation:null,rotate:function(b,e){var a=this,c=this.options,h=a._rotate||(a._rotate=function(j){clearTimeout(a.rotation);a.rotation=setTimeout(function(){var k=c.selected;a.select(++k<a.anchors.length?k:0)},b);j&&j.stopPropagation()});e=a._unrotate||(a._unrotate=!e?function(j){j.clientX&&
a.rotate(null)}:function(){t=c.selected;h()});if(b){this.element.bind("tabsshow",h);this.anchors.bind(c.event+".tabs",e);h()}else{clearTimeout(a.rotation);this.element.unbind("tabsshow",h);this.anchors.unbind(c.event+".tabs",e);delete this._rotate;delete this._unrotate}return this}})})(jQuery);
;/*
 * jQuery UI Datepicker 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function(d,G){function K(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._inDialog=this._datepickerShowing=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass=
"ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su",
"Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",
minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false};d.extend(this._defaults,this.regional[""]);this.dpDiv=d('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')}function E(a,b){d.extend(a,b);for(var c in b)if(b[c]==
null||b[c]==G)a[c]=b[c];return a}d.extend(d.ui,{datepicker:{version:"1.8.9"}});var y=(new Date).getTime();d.extend(K.prototype,{markerClassName:"hasDatepicker",log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){E(this._defaults,a||{});return this},_attachDatepicker:function(a,b){var c=null;for(var e in this._defaults){var f=a.getAttribute("date:"+e);if(f){c=c||{};try{c[e]=eval(f)}catch(h){c[e]=f}}}e=a.nodeName.toLowerCase();
f=e=="div"||e=="span";if(!a.id){this.uuid+=1;a.id="dp"+this.uuid}var i=this._newInst(d(a),f);i.settings=d.extend({},b||{},c||{});if(e=="input")this._connectDatepicker(a,i);else f&&this._inlineDatepicker(a,i)},_newInst:function(a,b){return{id:a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1"),input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:!b?this.dpDiv:d('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')}},
_connectDatepicker:function(a,b){var c=d(a);b.append=d([]);b.trigger=d([]);if(!c.hasClass(this.markerClassName)){this._attachments(c,b);c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});this._autoSize(b);d.data(a,"datepicker",b)}},_attachments:function(a,b){var c=this._get(b,"appendText"),e=this._get(b,"isRTL");b.append&&
b.append.remove();if(c){b.append=d('<span class="'+this._appendClass+'">'+c+"</span>");a[e?"before":"after"](b.append)}a.unbind("focus",this._showDatepicker);b.trigger&&b.trigger.remove();c=this._get(b,"showOn");if(c=="focus"||c=="both")a.focus(this._showDatepicker);if(c=="button"||c=="both"){c=this._get(b,"buttonText");var f=this._get(b,"buttonImage");b.trigger=d(this._get(b,"buttonImageOnly")?d("<img/>").addClass(this._triggerClass).attr({src:f,alt:c,title:c}):d('<button type="button"></button>').addClass(this._triggerClass).html(f==
""?c:d("<img/>").attr({src:f,alt:c,title:c})));a[e?"before":"after"](b.trigger);b.trigger.click(function(){d.datepicker._datepickerShowing&&d.datepicker._lastInput==a[0]?d.datepicker._hideDatepicker():d.datepicker._showDatepicker(a[0]);return false})}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var e=function(f){for(var h=0,i=0,g=0;g<f.length;g++)if(f[g].length>h){h=f[g].length;i=g}return i};b.setMonth(e(this._get(a,
c.match(/MM/)?"monthNames":"monthNamesShort")));b.setDate(e(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(a,b){var c=d(a);if(!c.hasClass(this.markerClassName)){c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});d.data(a,"datepicker",b);this._setDate(b,this._getDefaultDate(b),
true);this._updateDatepicker(b);this._updateAlternate(b);b.dpDiv.show()}},_dialogDatepicker:function(a,b,c,e,f){a=this._dialogInst;if(!a){this.uuid+=1;this._dialogInput=d('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');this._dialogInput.keydown(this._doKeyDown);d("body").append(this._dialogInput);a=this._dialogInst=this._newInst(this._dialogInput,false);a.settings={};d.data(this._dialogInput[0],"datepicker",a)}E(a.settings,e||{});
b=b&&b.constructor==Date?this._formatDate(a,b):b;this._dialogInput.val(b);this._pos=f?f.length?f:[f.pageX,f.pageY]:null;if(!this._pos)this._pos=[document.documentElement.clientWidth/2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)];this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px");a.settings.onSelect=c;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);
this._showDatepicker(this._dialogInput[0]);d.blockUI&&d.blockUI(this.dpDiv);d.data(this._dialogInput[0],"datepicker",a);return this},_destroyDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();d.removeData(a,"datepicker");if(e=="input"){c.append.remove();c.trigger.remove();b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",
this._doKeyUp)}else if(e=="div"||e=="span")b.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=false;c.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else if(e=="div"||e=="span")b.children("."+this._inlineClass).children().removeClass("ui-state-disabled");this._disabledInputs=d.map(this._disabledInputs,
function(f){return f==a?null:f})}},_disableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=true;c.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else if(e=="div"||e=="span")b.children("."+this._inlineClass).children().addClass("ui-state-disabled");this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:
f});this._disabledInputs[this._disabledInputs.length]=a}},_isDisabledDatepicker:function(a){if(!a)return false;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return true;return false},_getInst:function(a){try{return d.data(a,"datepicker")}catch(b){throw"Missing instance data for this datepicker";}},_optionDatepicker:function(a,b,c){var e=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?d.extend({},d.datepicker._defaults):e?b=="all"?d.extend({},
e.settings):this._get(e,b):null;var f=b||{};if(typeof b=="string"){f={};f[b]=c}if(e){this._curInst==e&&this._hideDatepicker();var h=this._getDateDatepicker(a,true);E(e.settings,f);this._attachments(d(a),e);this._autoSize(e);this._setDateDatepicker(a,h);this._updateDatepicker(e)}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){(a=this._getInst(a))&&this._updateDatepicker(a)},_setDateDatepicker:function(a,b){if(a=this._getInst(a)){this._setDate(a,b);
this._updateDatepicker(a);this._updateAlternate(a)}},_getDateDatepicker:function(a,b){(a=this._getInst(a))&&!a.inline&&this._setDateFromField(a,b);return a?this._getDate(a):null},_doKeyDown:function(a){var b=d.datepicker._getInst(a.target),c=true,e=b.dpDiv.is(".ui-datepicker-rtl");b._keyEvent=true;if(d.datepicker._datepickerShowing)switch(a.keyCode){case 9:d.datepicker._hideDatepicker();c=false;break;case 13:c=d("td."+d.datepicker._dayOverClass+":not(."+d.datepicker._currentClass+")",b.dpDiv);c[0]?
d.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,c[0]):d.datepicker._hideDatepicker();return false;case 27:d.datepicker._hideDatepicker();break;case 33:d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 34:d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 35:if(a.ctrlKey||a.metaKey)d.datepicker._clearDate(a.target);c=a.ctrlKey||
a.metaKey;break;case 36:if(a.ctrlKey||a.metaKey)d.datepicker._gotoToday(a.target);c=a.ctrlKey||a.metaKey;break;case 37:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?+1:-1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 38:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,-7,"D");c=a.ctrlKey||a.metaKey;break;case 39:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,
e?-1:+1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 40:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,+7,"D");c=a.ctrlKey||a.metaKey;break;default:c=false}else if(a.keyCode==36&&a.ctrlKey)d.datepicker._showDatepicker(this);else c=false;if(c){a.preventDefault();a.stopPropagation()}},_doKeyPress:function(a){var b=d.datepicker._getInst(a.target);if(d.datepicker._get(b,
"constrainInput")){b=d.datepicker._possibleChars(d.datepicker._get(b,"dateFormat"));var c=String.fromCharCode(a.charCode==G?a.keyCode:a.charCode);return a.ctrlKey||a.metaKey||c<" "||!b||b.indexOf(c)>-1}},_doKeyUp:function(a){a=d.datepicker._getInst(a.target);if(a.input.val()!=a.lastVal)try{if(d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),a.input?a.input.val():null,d.datepicker._getFormatConfig(a))){d.datepicker._setDateFromField(a);d.datepicker._updateAlternate(a);d.datepicker._updateDatepicker(a)}}catch(b){d.datepicker.log(b)}return true},
_showDatepicker:function(a){a=a.target||a;if(a.nodeName.toLowerCase()!="input")a=d("input",a.parentNode)[0];if(!(d.datepicker._isDisabledDatepicker(a)||d.datepicker._lastInput==a)){var b=d.datepicker._getInst(a);d.datepicker._curInst&&d.datepicker._curInst!=b&&d.datepicker._curInst.dpDiv.stop(true,true);var c=d.datepicker._get(b,"beforeShow");E(b.settings,c?c.apply(a,[a,b]):{});b.lastVal=null;d.datepicker._lastInput=a;d.datepicker._setDateFromField(b);if(d.datepicker._inDialog)a.value="";if(!d.datepicker._pos){d.datepicker._pos=
d.datepicker._findPos(a);d.datepicker._pos[1]+=a.offsetHeight}var e=false;d(a).parents().each(function(){e|=d(this).css("position")=="fixed";return!e});if(e&&d.browser.opera){d.datepicker._pos[0]-=document.documentElement.scrollLeft;d.datepicker._pos[1]-=document.documentElement.scrollTop}c={left:d.datepicker._pos[0],top:d.datepicker._pos[1]};d.datepicker._pos=null;b.dpDiv.empty();b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});d.datepicker._updateDatepicker(b);c=d.datepicker._checkOffset(b,
c,e);b.dpDiv.css({position:d.datepicker._inDialog&&d.blockUI?"static":e?"fixed":"absolute",display:"none",left:c.left+"px",top:c.top+"px"});if(!b.inline){c=d.datepicker._get(b,"showAnim");var f=d.datepicker._get(b,"duration"),h=function(){d.datepicker._datepickerShowing=true;var i=b.dpDiv.find("iframe.ui-datepicker-cover");if(i.length){var g=d.datepicker._getBorders(b.dpDiv);i.css({left:-g[0],top:-g[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})}};b.dpDiv.zIndex(d(a).zIndex()+1);d.effects&&
d.effects[c]?b.dpDiv.show(c,d.datepicker._get(b,"showOptions"),f,h):b.dpDiv[c||"show"](c?f:null,h);if(!c||!f)h();b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus();d.datepicker._curInst=b}}},_updateDatepicker:function(a){var b=this,c=d.datepicker._getBorders(a.dpDiv);a.dpDiv.empty().append(this._generateHTML(a));var e=a.dpDiv.find("iframe.ui-datepicker-cover");e.length&&e.css({left:-c[0],top:-c[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()});a.dpDiv.find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout",
function(){d(this).removeClass("ui-state-hover");this.className.indexOf("ui-datepicker-prev")!=-1&&d(this).removeClass("ui-datepicker-prev-hover");this.className.indexOf("ui-datepicker-next")!=-1&&d(this).removeClass("ui-datepicker-next-hover")}).bind("mouseover",function(){if(!b._isDisabledDatepicker(a.inline?a.dpDiv.parent()[0]:a.input[0])){d(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");d(this).addClass("ui-state-hover");this.className.indexOf("ui-datepicker-prev")!=
-1&&d(this).addClass("ui-datepicker-prev-hover");this.className.indexOf("ui-datepicker-next")!=-1&&d(this).addClass("ui-datepicker-next-hover")}}).end().find("."+this._dayOverClass+" a").trigger("mouseover").end();c=this._getNumberOfMonths(a);e=c[1];e>1?a.dpDiv.addClass("ui-datepicker-multi-"+e).css("width",17*e+"em"):a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");a.dpDiv[(c[0]!=1||c[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");a.dpDiv[(this._get(a,
"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");a==d.datepicker._curInst&&d.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input.focus();if(a.yearshtml){var f=a.yearshtml;setTimeout(function(){f===a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml);f=a.yearshtml=null},0)}},_getBorders:function(a){var b=function(c){return{thin:1,medium:2,thick:3}[c]||c};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},
_checkOffset:function(a,b,c){var e=a.dpDiv.outerWidth(),f=a.dpDiv.outerHeight(),h=a.input?a.input.outerWidth():0,i=a.input?a.input.outerHeight():0,g=document.documentElement.clientWidth+d(document).scrollLeft(),j=document.documentElement.clientHeight+d(document).scrollTop();b.left-=this._get(a,"isRTL")?e-h:0;b.left-=c&&b.left==a.input.offset().left?d(document).scrollLeft():0;b.top-=c&&b.top==a.input.offset().top+i?d(document).scrollTop():0;b.left-=Math.min(b.left,b.left+e>g&&g>e?Math.abs(b.left+e-
g):0);b.top-=Math.min(b.top,b.top+f>j&&j>f?Math.abs(f+i):0);return b},_findPos:function(a){for(var b=this._get(this._getInst(a),"isRTL");a&&(a.type=="hidden"||a.nodeType!=1);)a=a[b?"previousSibling":"nextSibling"];a=d(a).offset();return[a.left,a.top]},_hideDatepicker:function(a){var b=this._curInst;if(!(!b||a&&b!=d.data(a,"datepicker")))if(this._datepickerShowing){a=this._get(b,"showAnim");var c=this._get(b,"duration"),e=function(){d.datepicker._tidyDialog(b);this._curInst=null};d.effects&&d.effects[a]?
b.dpDiv.hide(a,d.datepicker._get(b,"showOptions"),c,e):b.dpDiv[a=="slideDown"?"slideUp":a=="fadeIn"?"fadeOut":"hide"](a?c:null,e);a||e();if(a=this._get(b,"onClose"))a.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b]);this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if(d.blockUI){d.unblockUI();d("body").append(this.dpDiv)}}this._inDialog=false}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},
_checkExternalClick:function(a){if(d.datepicker._curInst){a=d(a.target);a[0].id!=d.datepicker._mainDivId&&a.parents("#"+d.datepicker._mainDivId).length==0&&!a.hasClass(d.datepicker.markerClassName)&&!a.hasClass(d.datepicker._triggerClass)&&d.datepicker._datepickerShowing&&!(d.datepicker._inDialog&&d.blockUI)&&d.datepicker._hideDatepicker()}},_adjustDate:function(a,b,c){a=d(a);var e=this._getInst(a[0]);if(!this._isDisabledDatepicker(a[0])){this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):
0),c);this._updateDatepicker(e)}},_gotoToday:function(a){a=d(a);var b=this._getInst(a[0]);if(this._get(b,"gotoCurrent")&&b.currentDay){b.selectedDay=b.currentDay;b.drawMonth=b.selectedMonth=b.currentMonth;b.drawYear=b.selectedYear=b.currentYear}else{var c=new Date;b.selectedDay=c.getDate();b.drawMonth=b.selectedMonth=c.getMonth();b.drawYear=b.selectedYear=c.getFullYear()}this._notifyChange(b);this._adjustDate(a)},_selectMonthYear:function(a,b,c){a=d(a);var e=this._getInst(a[0]);e._selectingMonthYear=
false;e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10);this._notifyChange(e);this._adjustDate(a)},_clickMonthYear:function(a){var b=this._getInst(d(a)[0]);b.input&&b._selectingMonthYear&&setTimeout(function(){b.input.focus()},0);b._selectingMonthYear=!b._selectingMonthYear},_selectDay:function(a,b,c,e){var f=d(a);if(!(d(e).hasClass(this._unselectableClass)||this._isDisabledDatepicker(f[0]))){f=this._getInst(f[0]);f.selectedDay=f.currentDay=
d("a",e).html();f.selectedMonth=f.currentMonth=b;f.selectedYear=f.currentYear=c;this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))}},_clearDate:function(a){a=d(a);this._getInst(a[0]);this._selectDate(a,"")},_selectDate:function(a,b){a=this._getInst(d(a)[0]);b=b!=null?b:this._formatDate(a);a.input&&a.input.val(b);this._updateAlternate(a);var c=this._get(a,"onSelect");if(c)c.apply(a.input?a.input[0]:null,[b,a]);else a.input&&a.input.trigger("change");if(a.inline)this._updateDatepicker(a);
else{this._hideDatepicker();this._lastInput=a.input[0];typeof a.input[0]!="object"&&a.input.focus();this._lastInput=null}},_updateAlternate:function(a){var b=this._get(a,"altField");if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),e=this._getDate(a),f=this.formatDate(c,e,this._getFormatConfig(a));d(b).each(function(){d(this).val(f)})}},noWeekends:function(a){a=a.getDay();return[a>0&&a<6,""]},iso8601Week:function(a){a=new Date(a.getTime());a.setDate(a.getDate()+4-(a.getDay()||7));var b=
a.getTime();a.setMonth(0);a.setDate(1);return Math.floor(Math.round((b-a)/864E5)/7)+1},parseDate:function(a,b,c){if(a==null||b==null)throw"Invalid arguments";b=typeof b=="object"?b.toString():b+"";if(b=="")return null;var e=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff;e=typeof e!="string"?e:(new Date).getFullYear()%100+parseInt(e,10);for(var f=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,h=(c?c.dayNames:null)||this._defaults.dayNames,i=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,
g=(c?c.monthNames:null)||this._defaults.monthNames,j=c=-1,l=-1,u=-1,k=false,o=function(p){(p=z+1<a.length&&a.charAt(z+1)==p)&&z++;return p},m=function(p){var v=o(p);p=new RegExp("^\\d{1,"+(p=="@"?14:p=="!"?20:p=="y"&&v?4:p=="o"?3:2)+"}");p=b.substring(s).match(p);if(!p)throw"Missing number at position "+s;s+=p[0].length;return parseInt(p[0],10)},n=function(p,v,H){p=o(p)?H:v;for(v=0;v<p.length;v++)if(b.substr(s,p[v].length).toLowerCase()==p[v].toLowerCase()){s+=p[v].length;return v+1}throw"Unknown name at position "+
s;},r=function(){if(b.charAt(s)!=a.charAt(z))throw"Unexpected literal at position "+s;s++},s=0,z=0;z<a.length;z++)if(k)if(a.charAt(z)=="'"&&!o("'"))k=false;else r();else switch(a.charAt(z)){case "d":l=m("d");break;case "D":n("D",f,h);break;case "o":u=m("o");break;case "m":j=m("m");break;case "M":j=n("M",i,g);break;case "y":c=m("y");break;case "@":var w=new Date(m("@"));c=w.getFullYear();j=w.getMonth()+1;l=w.getDate();break;case "!":w=new Date((m("!")-this._ticksTo1970)/1E4);c=w.getFullYear();j=w.getMonth()+
1;l=w.getDate();break;case "'":if(o("'"))r();else k=true;break;default:r()}if(c==-1)c=(new Date).getFullYear();else if(c<100)c+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c<=e?0:-100);if(u>-1){j=1;l=u;do{e=this._getDaysInMonth(c,j-1);if(l<=e)break;j++;l-=e}while(1)}w=this._daylightSavingAdjust(new Date(c,j-1,l));if(w.getFullYear()!=c||w.getMonth()+1!=j||w.getDate()!=l)throw"Invalid date";return w},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",
RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1E7,formatDate:function(a,b,c){if(!b)return"";var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,h=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort;c=(c?c.monthNames:null)||this._defaults.monthNames;var i=function(o){(o=k+1<a.length&&
a.charAt(k+1)==o)&&k++;return o},g=function(o,m,n){m=""+m;if(i(o))for(;m.length<n;)m="0"+m;return m},j=function(o,m,n,r){return i(o)?r[m]:n[m]},l="",u=false;if(b)for(var k=0;k<a.length;k++)if(u)if(a.charAt(k)=="'"&&!i("'"))u=false;else l+=a.charAt(k);else switch(a.charAt(k)){case "d":l+=g("d",b.getDate(),2);break;case "D":l+=j("D",b.getDay(),e,f);break;case "o":l+=g("o",(b.getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":l+=g("m",b.getMonth()+1,2);break;case "M":l+=j("M",
b.getMonth(),h,c);break;case "y":l+=i("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case "@":l+=b.getTime();break;case "!":l+=b.getTime()*1E4+this._ticksTo1970;break;case "'":if(i("'"))l+="'";else u=true;break;default:l+=a.charAt(k)}return l},_possibleChars:function(a){for(var b="",c=false,e=function(h){(h=f+1<a.length&&a.charAt(f+1)==h)&&f++;return h},f=0;f<a.length;f++)if(c)if(a.charAt(f)=="'"&&!e("'"))c=false;else b+=a.charAt(f);else switch(a.charAt(f)){case "d":case "m":case "y":case "@":b+=
"0123456789";break;case "D":case "M":return null;case "'":if(e("'"))b+="'";else c=true;break;default:b+=a.charAt(f)}return b},_get:function(a,b){return a.settings[b]!==G?a.settings[b]:this._defaults[b]},_setDateFromField:function(a,b){if(a.input.val()!=a.lastVal){var c=this._get(a,"dateFormat"),e=a.lastVal=a.input?a.input.val():null,f,h;f=h=this._getDefaultDate(a);var i=this._getFormatConfig(a);try{f=this.parseDate(c,e,i)||h}catch(g){this.log(g);e=b?"":e}a.selectedDay=f.getDate();a.drawMonth=a.selectedMonth=
f.getMonth();a.drawYear=a.selectedYear=f.getFullYear();a.currentDay=e?f.getDate():0;a.currentMonth=e?f.getMonth():0;a.currentYear=e?f.getFullYear():0;this._adjustInstDate(a)}},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))},_determineDate:function(a,b,c){var e=function(h){var i=new Date;i.setDate(i.getDate()+h);return i},f=function(h){try{return d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),h,d.datepicker._getFormatConfig(a))}catch(i){}var g=
(h.toLowerCase().match(/^c/)?d.datepicker._getDate(a):null)||new Date,j=g.getFullYear(),l=g.getMonth();g=g.getDate();for(var u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,k=u.exec(h);k;){switch(k[2]||"d"){case "d":case "D":g+=parseInt(k[1],10);break;case "w":case "W":g+=parseInt(k[1],10)*7;break;case "m":case "M":l+=parseInt(k[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(j,l));break;case "y":case "Y":j+=parseInt(k[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(j,l));break}k=u.exec(h)}return new Date(j,
l,g)};if(b=(b=b==null||b===""?c:typeof b=="string"?f(b):typeof b=="number"?isNaN(b)?c:e(b):new Date(b.getTime()))&&b.toString()=="Invalid Date"?c:b){b.setHours(0);b.setMinutes(0);b.setSeconds(0);b.setMilliseconds(0)}return this._daylightSavingAdjust(b)},_daylightSavingAdjust:function(a){if(!a)return null;a.setHours(a.getHours()>12?a.getHours()+2:0);return a},_setDate:function(a,b,c){var e=!b,f=a.selectedMonth,h=a.selectedYear;b=this._restrictMinMax(a,this._determineDate(a,b,new Date));a.selectedDay=
a.currentDay=b.getDate();a.drawMonth=a.selectedMonth=a.currentMonth=b.getMonth();a.drawYear=a.selectedYear=a.currentYear=b.getFullYear();if((f!=a.selectedMonth||h!=a.selectedYear)&&!c)this._notifyChange(a);this._adjustInstDate(a);if(a.input)a.input.val(e?"":this._formatDate(a))},_getDate:function(a){return!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay))},_generateHTML:function(a){var b=new Date;b=this._daylightSavingAdjust(new Date(b.getFullYear(),
b.getMonth(),b.getDate()));var c=this._get(a,"isRTL"),e=this._get(a,"showButtonPanel"),f=this._get(a,"hideIfNoPrevNext"),h=this._get(a,"navigationAsDateFormat"),i=this._getNumberOfMonths(a),g=this._get(a,"showCurrentAtPos"),j=this._get(a,"stepMonths"),l=i[0]!=1||i[1]!=1,u=this._daylightSavingAdjust(!a.currentDay?new Date(9999,9,9):new Date(a.currentYear,a.currentMonth,a.currentDay)),k=this._getMinMaxDate(a,"min"),o=this._getMinMaxDate(a,"max");g=a.drawMonth-g;var m=a.drawYear;if(g<0){g+=12;m--}if(o){var n=
this._daylightSavingAdjust(new Date(o.getFullYear(),o.getMonth()-i[0]*i[1]+1,o.getDate()));for(n=k&&n<k?k:n;this._daylightSavingAdjust(new Date(m,g,1))>n;){g--;if(g<0){g=11;m--}}}a.drawMonth=g;a.drawYear=m;n=this._get(a,"prevText");n=!h?n:this.formatDate(n,this._daylightSavingAdjust(new Date(m,g-j,1)),this._getFormatConfig(a));n=this._canAdjustMonth(a,-1,m,g)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._adjustDate('#"+a.id+"', -"+j+", 'M');\" title=\""+n+'"><span class="ui-icon ui-icon-circle-triangle-'+
(c?"e":"w")+'">'+n+"</span></a>":f?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+n+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+n+"</span></a>";var r=this._get(a,"nextText");r=!h?r:this.formatDate(r,this._daylightSavingAdjust(new Date(m,g+j,1)),this._getFormatConfig(a));f=this._canAdjustMonth(a,+1,m,g)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._adjustDate('#"+a.id+"', +"+j+", 'M');\" title=\""+r+'"><span class="ui-icon ui-icon-circle-triangle-'+
(c?"w":"e")+'">'+r+"</span></a>":f?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+r+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+r+"</span></a>";j=this._get(a,"currentText");r=this._get(a,"gotoCurrent")&&a.currentDay?u:b;j=!h?j:this.formatDate(j,r,this._getFormatConfig(a));h=!a.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+y+'.datepicker._hideDatepicker();">'+this._get(a,
"closeText")+"</button>":"";e=e?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?h:"")+(this._isInRange(a,r)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._gotoToday('#"+a.id+"');\">"+j+"</button>":"")+(c?"":h)+"</div>":"";h=parseInt(this._get(a,"firstDay"),10);h=isNaN(h)?0:h;j=this._get(a,"showWeek");r=this._get(a,"dayNames");this._get(a,"dayNamesShort");var s=this._get(a,"dayNamesMin"),z=
this._get(a,"monthNames"),w=this._get(a,"monthNamesShort"),p=this._get(a,"beforeShowDay"),v=this._get(a,"showOtherMonths"),H=this._get(a,"selectOtherMonths");this._get(a,"calculateWeek");for(var L=this._getDefaultDate(a),I="",C=0;C<i[0];C++){for(var M="",D=0;D<i[1];D++){var N=this._daylightSavingAdjust(new Date(m,g,a.selectedDay)),t=" ui-corner-all",x="";if(l){x+='<div class="ui-datepicker-group';if(i[1]>1)switch(D){case 0:x+=" ui-datepicker-group-first";t=" ui-corner-"+(c?"right":"left");break;case i[1]-
1:x+=" ui-datepicker-group-last";t=" ui-corner-"+(c?"left":"right");break;default:x+=" ui-datepicker-group-middle";t="";break}x+='">'}x+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+t+'">'+(/all|left/.test(t)&&C==0?c?f:n:"")+(/all|right/.test(t)&&C==0?c?n:f:"")+this._generateMonthYearHeader(a,g,m,k,o,C>0||D>0,z,w)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var A=j?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";for(t=0;t<7;t++){var q=
(t+h)%7;A+="<th"+((t+h+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+r[q]+'">'+s[q]+"</span></th>"}x+=A+"</tr></thead><tbody>";A=this._getDaysInMonth(m,g);if(m==a.selectedYear&&g==a.selectedMonth)a.selectedDay=Math.min(a.selectedDay,A);t=(this._getFirstDayOfMonth(m,g)-h+7)%7;A=l?6:Math.ceil((t+A)/7);q=this._daylightSavingAdjust(new Date(m,g,1-t));for(var O=0;O<A;O++){x+="<tr>";var P=!j?"":'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(q)+"</td>";for(t=0;t<7;t++){var F=
p?p.apply(a.input?a.input[0]:null,[q]):[true,""],B=q.getMonth()!=g,J=B&&!H||!F[0]||k&&q<k||o&&q>o;P+='<td class="'+((t+h+6)%7>=5?" ui-datepicker-week-end":"")+(B?" ui-datepicker-other-month":"")+(q.getTime()==N.getTime()&&g==a.selectedMonth&&a._keyEvent||L.getTime()==q.getTime()&&L.getTime()==N.getTime()?" "+this._dayOverClass:"")+(J?" "+this._unselectableClass+" ui-state-disabled":"")+(B&&!v?"":" "+F[1]+(q.getTime()==u.getTime()?" "+this._currentClass:"")+(q.getTime()==b.getTime()?" ui-datepicker-today":
""))+'"'+((!B||v)&&F[2]?' title="'+F[2]+'"':"")+(J?"":' onclick="DP_jQuery_'+y+".datepicker._selectDay('#"+a.id+"',"+q.getMonth()+","+q.getFullYear()+', this);return false;"')+">"+(B&&!v?"&#xa0;":J?'<span class="ui-state-default">'+q.getDate()+"</span>":'<a class="ui-state-default'+(q.getTime()==b.getTime()?" ui-state-highlight":"")+(q.getTime()==u.getTime()?" ui-state-active":"")+(B?" ui-priority-secondary":"")+'" href="#">'+q.getDate()+"</a>")+"</td>";q.setDate(q.getDate()+1);q=this._daylightSavingAdjust(q)}x+=
P+"</tr>"}g++;if(g>11){g=0;m++}x+="</tbody></table>"+(l?"</div>"+(i[0]>0&&D==i[1]-1?'<div class="ui-datepicker-row-break"></div>':""):"");M+=x}I+=M}I+=e+(d.browser.msie&&parseInt(d.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");a._keyEvent=false;return I},_generateMonthYearHeader:function(a,b,c,e,f,h,i,g){var j=this._get(a,"changeMonth"),l=this._get(a,"changeYear"),u=this._get(a,"showMonthAfterYear"),k='<div class="ui-datepicker-title">',
o="";if(h||!j)o+='<span class="ui-datepicker-month">'+i[b]+"</span>";else{i=e&&e.getFullYear()==c;var m=f&&f.getFullYear()==c;o+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+y+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" onclick=\"DP_jQuery_"+y+".datepicker._clickMonthYear('#"+a.id+"');\">";for(var n=0;n<12;n++)if((!i||n>=e.getMonth())&&(!m||n<=f.getMonth()))o+='<option value="'+n+'"'+(n==b?' selected="selected"':"")+">"+g[n]+"</option>";o+="</select>"}u||(k+=o+(h||!(j&&
l)?"&#xa0;":""));a.yearshtml="";if(h||!l)k+='<span class="ui-datepicker-year">'+c+"</span>";else{g=this._get(a,"yearRange").split(":");var r=(new Date).getFullYear();i=function(s){s=s.match(/c[+-].*/)?c+parseInt(s.substring(1),10):s.match(/[+-].*/)?r+parseInt(s,10):parseInt(s,10);return isNaN(s)?r:s};b=i(g[0]);g=Math.max(b,i(g[1]||""));b=e?Math.max(b,e.getFullYear()):b;g=f?Math.min(g,f.getFullYear()):g;for(a.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+y+".datepicker._selectMonthYear('#"+
a.id+"', this, 'Y');\" onclick=\"DP_jQuery_"+y+".datepicker._clickMonthYear('#"+a.id+"');\">";b<=g;b++)a.yearshtml+='<option value="'+b+'"'+(b==c?' selected="selected"':"")+">"+b+"</option>";a.yearshtml+="</select>";if(d.browser.mozilla)k+='<select class="ui-datepicker-year"><option value="'+c+'" selected="selected">'+c+"</option></select>";else{k+=a.yearshtml;a.yearshtml=null}}k+=this._get(a,"yearSuffix");if(u)k+=(h||!(j&&l)?"&#xa0;":"")+o;k+="</div>";return k},_adjustInstDate:function(a,b,c){var e=
a.drawYear+(c=="Y"?b:0),f=a.drawMonth+(c=="M"?b:0);b=Math.min(a.selectedDay,this._getDaysInMonth(e,f))+(c=="D"?b:0);e=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(e,f,b)));a.selectedDay=e.getDate();a.drawMonth=a.selectedMonth=e.getMonth();a.drawYear=a.selectedYear=e.getFullYear();if(c=="M"||c=="Y")this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");b=c&&b<c?c:b;return b=a&&b>a?a:b},_notifyChange:function(a){var b=this._get(a,
"onChangeMonthYear");if(b)b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){a=this._get(a,"numberOfMonths");return a==null?[1,1]:typeof a=="number"?[1,a]:a},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()},_canAdjustMonth:function(a,b,c,e){var f=this._getNumberOfMonths(a);
c=this._daylightSavingAdjust(new Date(c,e+(b<0?b:f[0]*f[1]),1));b<0&&c.setDate(this._getDaysInMonth(c.getFullYear(),c.getMonth()));return this._isInRange(a,c)},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");return(!c||b.getTime()>=c.getTime())&&(!a||b.getTime()<=a.getTime())},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10);return{shortYearCutoff:b,dayNamesShort:this._get(a,
"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,e){if(!b){a.currentDay=a.selectedDay;a.currentMonth=a.selectedMonth;a.currentYear=a.selectedYear}b=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(e,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),b,this._getFormatConfig(a))}});d.fn.datepicker=
function(a){if(!d.datepicker.initialized){d(document).mousedown(d.datepicker._checkExternalClick).find("body").append(d.datepicker.dpDiv);d.datepicker.initialized=true}var b=Array.prototype.slice.call(arguments,1);if(typeof a=="string"&&(a=="isDisabled"||a=="getDate"||a=="widget"))return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b));if(a=="option"&&arguments.length==2&&typeof arguments[1]=="string")return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b));
return this.each(function(){typeof a=="string"?d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this].concat(b)):d.datepicker._attachDatepicker(this,a)})};d.datepicker=new K;d.datepicker.initialized=false;d.datepicker.uuid=(new Date).getTime();d.datepicker.version="1.8.9";window["DP_jQuery_"+y]=d})(jQuery);
;/*
 * jQuery UI Progressbar 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function(b,d){b.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});this.valueDiv=b("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);this.oldValue=this._value();this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
this.valueDiv.remove();b.Widget.prototype.destroy.apply(this,arguments)},value:function(a){if(a===d)return this._value();this._setOption("value",a);return this},_setOption:function(a,c){if(a==="value"){this.options.value=c;this._refreshValue();this._value()===this.options.max&&this._trigger("complete")}b.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var a=this.options.value;if(typeof a!=="number")a=0;return Math.min(this.options.max,Math.max(this.min,a))},_percentage:function(){return 100*
this._value()/this.options.max},_refreshValue:function(){var a=this.value(),c=this._percentage();if(this.oldValue!==a){this.oldValue=a;this._trigger("change")}this.valueDiv.toggleClass("ui-corner-right",a===this.options.max).width(c.toFixed(0)+"%");this.element.attr("aria-valuenow",a)}});b.extend(b.ui.progressbar,{version:"1.8.9"})})(jQuery);
;/*
 * jQuery UI Effects 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects||function(f,j){function n(c){var a;if(c&&c.constructor==Array&&c.length==3)return c;if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c))return[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10)];if(a=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c))return[parseFloat(a[1])*2.55,parseFloat(a[2])*2.55,parseFloat(a[3])*2.55];if(a=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c))return[parseInt(a[1],
16),parseInt(a[2],16),parseInt(a[3],16)];if(a=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c))return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)];if(/rgba\(0, 0, 0, 0\)/.exec(c))return o.transparent;return o[f.trim(c).toLowerCase()]}function s(c,a){var b;do{b=f.curCSS(c,a);if(b!=""&&b!="transparent"||f.nodeName(c,"body"))break;a="backgroundColor"}while(c=c.parentNode);return n(b)}function p(){var c=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,
a={},b,d;if(c&&c.length&&c[0]&&c[c[0]])for(var e=c.length;e--;){b=c[e];if(typeof c[b]=="string"){d=b.replace(/\-(\w)/g,function(g,h){return h.toUpperCase()});a[d]=c[b]}}else for(b in c)if(typeof c[b]==="string")a[b]=c[b];return a}function q(c){var a,b;for(a in c){b=c[a];if(b==null||f.isFunction(b)||a in t||/scrollbar/.test(a)||!/color/i.test(a)&&isNaN(parseFloat(b)))delete c[a]}return c}function u(c,a){var b={_:0},d;for(d in a)if(c[d]!=a[d])b[d]=a[d];return b}function k(c,a,b,d){if(typeof c=="object"){d=
a;b=null;a=c;c=a.effect}if(f.isFunction(a)){d=a;b=null;a={}}if(typeof a=="number"||f.fx.speeds[a]){d=b;b=a;a={}}if(f.isFunction(b)){d=b;b=null}a=a||{};b=b||a.duration;b=f.fx.off?0:typeof b=="number"?b:b in f.fx.speeds?f.fx.speeds[b]:f.fx.speeds._default;d=d||a.complete;return[c,a,b,d]}function m(c){if(!c||typeof c==="number"||f.fx.speeds[c])return true;if(typeof c==="string"&&!f.effects[c])return true;return false}f.effects={};f.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor",
"borderTopColor","borderColor","color","outlineColor"],function(c,a){f.fx.step[a]=function(b){if(!b.colorInit){b.start=s(b.elem,a);b.end=n(b.end);b.colorInit=true}b.elem.style[a]="rgb("+Math.max(Math.min(parseInt(b.pos*(b.end[0]-b.start[0])+b.start[0],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[1]-b.start[1])+b.start[1],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[2]-b.start[2])+b.start[2],10),255),0)+")"}});var o={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,
0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,
211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},r=["add","remove","toggle"],t={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};f.effects.animateClass=function(c,a,b,
d){if(f.isFunction(b)){d=b;b=null}return this.queue("fx",function(){var e=f(this),g=e.attr("style")||" ",h=q(p.call(this)),l,v=e.attr("className");f.each(r,function(w,i){c[i]&&e[i+"Class"](c[i])});l=q(p.call(this));e.attr("className",v);e.animate(u(h,l),a,b,function(){f.each(r,function(w,i){c[i]&&e[i+"Class"](c[i])});if(typeof e.attr("style")=="object"){e.attr("style").cssText="";e.attr("style").cssText=g}else e.attr("style",g);d&&d.apply(this,arguments)});h=f.queue(this);l=h.splice(h.length-1,1)[0];
h.splice(1,0,l);f.dequeue(this)})};f.fn.extend({_addClass:f.fn.addClass,addClass:function(c,a,b,d){return a?f.effects.animateClass.apply(this,[{add:c},a,b,d]):this._addClass(c)},_removeClass:f.fn.removeClass,removeClass:function(c,a,b,d){return a?f.effects.animateClass.apply(this,[{remove:c},a,b,d]):this._removeClass(c)},_toggleClass:f.fn.toggleClass,toggleClass:function(c,a,b,d,e){return typeof a=="boolean"||a===j?b?f.effects.animateClass.apply(this,[a?{add:c}:{remove:c},b,d,e]):this._toggleClass(c,
a):f.effects.animateClass.apply(this,[{toggle:c},a,b,d])},switchClass:function(c,a,b,d,e){return f.effects.animateClass.apply(this,[{add:a,remove:c},b,d,e])}});f.extend(f.effects,{version:"1.8.9",save:function(c,a){for(var b=0;b<a.length;b++)a[b]!==null&&c.data("ec.storage."+a[b],c[0].style[a[b]])},restore:function(c,a){for(var b=0;b<a.length;b++)a[b]!==null&&c.css(a[b],c.data("ec.storage."+a[b]))},setMode:function(c,a){if(a=="toggle")a=c.is(":hidden")?"show":"hide";return a},getBaseline:function(c,
a){var b;switch(c[0]){case "top":b=0;break;case "middle":b=0.5;break;case "bottom":b=1;break;default:b=c[0]/a.height}switch(c[1]){case "left":c=0;break;case "center":c=0.5;break;case "right":c=1;break;default:c=c[1]/a.width}return{x:c,y:b}},createWrapper:function(c){if(c.parent().is(".ui-effects-wrapper"))return c.parent();var a={width:c.outerWidth(true),height:c.outerHeight(true),"float":c.css("float")},b=f("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",
border:"none",margin:0,padding:0});c.wrap(b);b=c.parent();if(c.css("position")=="static"){b.css({position:"relative"});c.css({position:"relative"})}else{f.extend(a,{position:c.css("position"),zIndex:c.css("z-index")});f.each(["top","left","bottom","right"],function(d,e){a[e]=c.css(e);if(isNaN(parseInt(a[e],10)))a[e]="auto"});c.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})}return b.css(a).show()},removeWrapper:function(c){if(c.parent().is(".ui-effects-wrapper"))return c.parent().replaceWith(c);
return c},setTransition:function(c,a,b,d){d=d||{};f.each(a,function(e,g){unit=c.cssUnit(g);if(unit[0]>0)d[g]=unit[0]*b+unit[1]});return d}});f.fn.extend({effect:function(c){var a=k.apply(this,arguments),b={options:a[1],duration:a[2],callback:a[3]};a=b.options.mode;var d=f.effects[c];if(f.fx.off||!d)return a?this[a](b.duration,b.callback):this.each(function(){b.callback&&b.callback.call(this)});return d.call(this,b)},_show:f.fn.show,show:function(c){if(m(c))return this._show.apply(this,arguments);
else{var a=k.apply(this,arguments);a[1].mode="show";return this.effect.apply(this,a)}},_hide:f.fn.hide,hide:function(c){if(m(c))return this._hide.apply(this,arguments);else{var a=k.apply(this,arguments);a[1].mode="hide";return this.effect.apply(this,a)}},__toggle:f.fn.toggle,toggle:function(c){if(m(c)||typeof c==="boolean"||f.isFunction(c))return this.__toggle.apply(this,arguments);else{var a=k.apply(this,arguments);a[1].mode="toggle";return this.effect.apply(this,a)}},cssUnit:function(c){var a=this.css(c),
b=[];f.each(["em","px","%","pt"],function(d,e){if(a.indexOf(e)>0)b=[parseFloat(a),e]});return b}});f.easing.jswing=f.easing.swing;f.extend(f.easing,{def:"easeOutQuad",swing:function(c,a,b,d,e){return f.easing[f.easing.def](c,a,b,d,e)},easeInQuad:function(c,a,b,d,e){return d*(a/=e)*a+b},easeOutQuad:function(c,a,b,d,e){return-d*(a/=e)*(a-2)+b},easeInOutQuad:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a+b;return-d/2*(--a*(a-2)-1)+b},easeInCubic:function(c,a,b,d,e){return d*(a/=e)*a*a+b},easeOutCubic:function(c,
a,b,d,e){return d*((a=a/e-1)*a*a+1)+b},easeInOutCubic:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a+b;return d/2*((a-=2)*a*a+2)+b},easeInQuart:function(c,a,b,d,e){return d*(a/=e)*a*a*a+b},easeOutQuart:function(c,a,b,d,e){return-d*((a=a/e-1)*a*a*a-1)+b},easeInOutQuart:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a*a+b;return-d/2*((a-=2)*a*a*a-2)+b},easeInQuint:function(c,a,b,d,e){return d*(a/=e)*a*a*a*a+b},easeOutQuint:function(c,a,b,d,e){return d*((a=a/e-1)*a*a*a*a+1)+b},easeInOutQuint:function(c,
a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a*a*a+b;return d/2*((a-=2)*a*a*a*a+2)+b},easeInSine:function(c,a,b,d,e){return-d*Math.cos(a/e*(Math.PI/2))+d+b},easeOutSine:function(c,a,b,d,e){return d*Math.sin(a/e*(Math.PI/2))+b},easeInOutSine:function(c,a,b,d,e){return-d/2*(Math.cos(Math.PI*a/e)-1)+b},easeInExpo:function(c,a,b,d,e){return a==0?b:d*Math.pow(2,10*(a/e-1))+b},easeOutExpo:function(c,a,b,d,e){return a==e?b+d:d*(-Math.pow(2,-10*a/e)+1)+b},easeInOutExpo:function(c,a,b,d,e){if(a==0)return b;if(a==
e)return b+d;if((a/=e/2)<1)return d/2*Math.pow(2,10*(a-1))+b;return d/2*(-Math.pow(2,-10*--a)+2)+b},easeInCirc:function(c,a,b,d,e){return-d*(Math.sqrt(1-(a/=e)*a)-1)+b},easeOutCirc:function(c,a,b,d,e){return d*Math.sqrt(1-(a=a/e-1)*a)+b},easeInOutCirc:function(c,a,b,d,e){if((a/=e/2)<1)return-d/2*(Math.sqrt(1-a*a)-1)+b;return d/2*(Math.sqrt(1-(a-=2)*a)+1)+b},easeInElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=
g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g))+b},easeOutElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*a)*Math.sin((a*e-c)*2*Math.PI/g)+d+b},easeInOutElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e/2)==2)return b+d;g||(g=e*0.3*1.5);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/
h);if(a<1)return-0.5*h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)+b;return h*Math.pow(2,-10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)*0.5+d+b},easeInBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;return d*(a/=e)*a*((g+1)*a-g)+b},easeOutBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;return d*((a=a/e-1)*a*((g+1)*a+g)+1)+b},easeInOutBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;if((a/=e/2)<1)return d/2*a*a*(((g*=1.525)+1)*a-g)+b;return d/2*((a-=2)*a*(((g*=1.525)+1)*a+g)+2)+b},easeInBounce:function(c,
a,b,d,e){return d-f.easing.easeOutBounce(c,e-a,0,d,e)+b},easeOutBounce:function(c,a,b,d,e){return(a/=e)<1/2.75?d*7.5625*a*a+b:a<2/2.75?d*(7.5625*(a-=1.5/2.75)*a+0.75)+b:a<2.5/2.75?d*(7.5625*(a-=2.25/2.75)*a+0.9375)+b:d*(7.5625*(a-=2.625/2.75)*a+0.984375)+b},easeInOutBounce:function(c,a,b,d,e){if(a<e/2)return f.easing.easeInBounce(c,a*2,0,d,e)*0.5+b;return f.easing.easeOutBounce(c,a*2-e,0,d,e)*0.5+d*0.5+b}})}(jQuery);
;/*
 * jQuery UI Effects Blind 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(b){b.effects.blind=function(c){return this.queue(function(){var a=b(this),g=["position","top","bottom","left","right"],f=b.effects.setMode(a,c.options.mode||"hide"),d=c.options.direction||"vertical";b.effects.save(a,g);a.show();var e=b.effects.createWrapper(a).css({overflow:"hidden"}),h=d=="vertical"?"height":"width";d=d=="vertical"?e.height():e.width();f=="show"&&e.css(h,0);var i={};i[h]=f=="show"?d:0;e.animate(i,c.duration,c.options.easing,function(){f=="hide"&&a.hide();b.effects.restore(a,
g);b.effects.removeWrapper(a);c.callback&&c.callback.apply(a[0],arguments);a.dequeue()})})}})(jQuery);
;/*
 * jQuery UI Effects Bounce 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Bounce
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(e){e.effects.bounce=function(b){return this.queue(function(){var a=e(this),l=["position","top","bottom","left","right"],h=e.effects.setMode(a,b.options.mode||"effect"),d=b.options.direction||"up",c=b.options.distance||20,m=b.options.times||5,i=b.duration||250;/show|hide/.test(h)&&l.push("opacity");e.effects.save(a,l);a.show();e.effects.createWrapper(a);var f=d=="up"||d=="down"?"top":"left";d=d=="up"||d=="left"?"pos":"neg";c=b.options.distance||(f=="top"?a.outerHeight({margin:true})/3:a.outerWidth({margin:true})/
3);if(h=="show")a.css("opacity",0).css(f,d=="pos"?-c:c);if(h=="hide")c/=m*2;h!="hide"&&m--;if(h=="show"){var g={opacity:1};g[f]=(d=="pos"?"+=":"-=")+c;a.animate(g,i/2,b.options.easing);c/=2;m--}for(g=0;g<m;g++){var j={},k={};j[f]=(d=="pos"?"-=":"+=")+c;k[f]=(d=="pos"?"+=":"-=")+c;a.animate(j,i/2,b.options.easing).animate(k,i/2,b.options.easing);c=h=="hide"?c*2:c/2}if(h=="hide"){g={opacity:0};g[f]=(d=="pos"?"-=":"+=")+c;a.animate(g,i/2,b.options.easing,function(){a.hide();e.effects.restore(a,l);e.effects.removeWrapper(a);
b.callback&&b.callback.apply(this,arguments)})}else{j={};k={};j[f]=(d=="pos"?"-=":"+=")+c;k[f]=(d=="pos"?"+=":"-=")+c;a.animate(j,i/2,b.options.easing).animate(k,i/2,b.options.easing,function(){e.effects.restore(a,l);e.effects.removeWrapper(a);b.callback&&b.callback.apply(this,arguments)})}a.queue("fx",function(){a.dequeue()});a.dequeue()})}})(jQuery);
;/*
 * jQuery UI Effects Clip 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Clip
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(b){b.effects.clip=function(e){return this.queue(function(){var a=b(this),i=["position","top","bottom","left","right","height","width"],f=b.effects.setMode(a,e.options.mode||"hide"),c=e.options.direction||"vertical";b.effects.save(a,i);a.show();var d=b.effects.createWrapper(a).css({overflow:"hidden"});d=a[0].tagName=="IMG"?d:a;var g={size:c=="vertical"?"height":"width",position:c=="vertical"?"top":"left"};c=c=="vertical"?d.height():d.width();if(f=="show"){d.css(g.size,0);d.css(g.position,
c/2)}var h={};h[g.size]=f=="show"?c:0;h[g.position]=f=="show"?0:c/2;d.animate(h,{queue:false,duration:e.duration,easing:e.options.easing,complete:function(){f=="hide"&&a.hide();b.effects.restore(a,i);b.effects.removeWrapper(a);e.callback&&e.callback.apply(a[0],arguments);a.dequeue()}})})}})(jQuery);
;/*
 * jQuery UI Effects Drop 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(c){c.effects.drop=function(d){return this.queue(function(){var a=c(this),h=["position","top","bottom","left","right","opacity"],e=c.effects.setMode(a,d.options.mode||"hide"),b=d.options.direction||"left";c.effects.save(a,h);a.show();c.effects.createWrapper(a);var f=b=="up"||b=="down"?"top":"left";b=b=="up"||b=="left"?"pos":"neg";var g=d.options.distance||(f=="top"?a.outerHeight({margin:true})/2:a.outerWidth({margin:true})/2);if(e=="show")a.css("opacity",0).css(f,b=="pos"?-g:g);var i={opacity:e==
"show"?1:0};i[f]=(e=="show"?b=="pos"?"+=":"-=":b=="pos"?"-=":"+=")+g;a.animate(i,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){e=="hide"&&a.hide();c.effects.restore(a,h);c.effects.removeWrapper(a);d.callback&&d.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
;/*
 * jQuery UI Effects Explode 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Explode
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(j){j.effects.explode=function(a){return this.queue(function(){var c=a.options.pieces?Math.round(Math.sqrt(a.options.pieces)):3,d=a.options.pieces?Math.round(Math.sqrt(a.options.pieces)):3;a.options.mode=a.options.mode=="toggle"?j(this).is(":visible")?"hide":"show":a.options.mode;var b=j(this).show().css("visibility","hidden"),g=b.offset();g.top-=parseInt(b.css("marginTop"),10)||0;g.left-=parseInt(b.css("marginLeft"),10)||0;for(var h=b.outerWidth(true),i=b.outerHeight(true),e=0;e<c;e++)for(var f=
0;f<d;f++)b.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-f*(h/d),top:-e*(i/c)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:h/d,height:i/c,left:g.left+f*(h/d)+(a.options.mode=="show"?(f-Math.floor(d/2))*(h/d):0),top:g.top+e*(i/c)+(a.options.mode=="show"?(e-Math.floor(c/2))*(i/c):0),opacity:a.options.mode=="show"?0:1}).animate({left:g.left+f*(h/d)+(a.options.mode=="show"?0:(f-Math.floor(d/2))*(h/d)),top:g.top+
e*(i/c)+(a.options.mode=="show"?0:(e-Math.floor(c/2))*(i/c)),opacity:a.options.mode=="show"?1:0},a.duration||500);setTimeout(function(){a.options.mode=="show"?b.css({visibility:"visible"}):b.css({visibility:"visible"}).hide();a.callback&&a.callback.apply(b[0]);b.dequeue();j("div.ui-effects-explode").remove()},a.duration||500)})}})(jQuery);
;/*
 * jQuery UI Effects Fade 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Fade
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(b){b.effects.fade=function(a){return this.queue(function(){var c=b(this),d=b.effects.setMode(c,a.options.mode||"hide");c.animate({opacity:d},{queue:false,duration:a.duration,easing:a.options.easing,complete:function(){a.callback&&a.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);
;/*
 * jQuery UI Effects Fold 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Fold
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(c){c.effects.fold=function(a){return this.queue(function(){var b=c(this),j=["position","top","bottom","left","right"],d=c.effects.setMode(b,a.options.mode||"hide"),g=a.options.size||15,h=!!a.options.horizFirst,k=a.duration?a.duration/2:c.fx.speeds._default/2;c.effects.save(b,j);b.show();var e=c.effects.createWrapper(b).css({overflow:"hidden"}),f=d=="show"!=h,l=f?["width","height"]:["height","width"];f=f?[e.width(),e.height()]:[e.height(),e.width()];var i=/([0-9]+)%/.exec(g);if(i)g=parseInt(i[1],
10)/100*f[d=="hide"?0:1];if(d=="show")e.css(h?{height:0,width:g}:{height:g,width:0});h={};i={};h[l[0]]=d=="show"?f[0]:g;i[l[1]]=d=="show"?f[1]:0;e.animate(h,k,a.options.easing).animate(i,k,a.options.easing,function(){d=="hide"&&b.hide();c.effects.restore(b,j);c.effects.removeWrapper(b);a.callback&&a.callback.apply(b[0],arguments);b.dequeue()})})}})(jQuery);
;/*
 * jQuery UI Effects Highlight 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(b){b.effects.highlight=function(c){return this.queue(function(){var a=b(this),e=["backgroundImage","backgroundColor","opacity"],d=b.effects.setMode(a,c.options.mode||"show"),f={backgroundColor:a.css("backgroundColor")};if(d=="hide")f.opacity=0;b.effects.save(a,e);a.show().css({backgroundImage:"none",backgroundColor:c.options.color||"#ffff99"}).animate(f,{queue:false,duration:c.duration,easing:c.options.easing,complete:function(){d=="hide"&&a.hide();b.effects.restore(a,e);d=="show"&&!b.support.opacity&&
this.style.removeAttribute("filter");c.callback&&c.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
;/*
 * jQuery UI Effects Pulsate 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Pulsate
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(d){d.effects.pulsate=function(a){return this.queue(function(){var b=d(this),c=d.effects.setMode(b,a.options.mode||"show");times=(a.options.times||5)*2-1;duration=a.duration?a.duration/2:d.fx.speeds._default/2;isVisible=b.is(":visible");animateTo=0;if(!isVisible){b.css("opacity",0).show();animateTo=1}if(c=="hide"&&isVisible||c=="show"&&!isVisible)times--;for(c=0;c<times;c++){b.animate({opacity:animateTo},duration,a.options.easing);animateTo=(animateTo+1)%2}b.animate({opacity:animateTo},duration,
a.options.easing,function(){animateTo==0&&b.hide();a.callback&&a.callback.apply(this,arguments)});b.queue("fx",function(){b.dequeue()}).dequeue()})}})(jQuery);
;/*
 * jQuery UI Effects Scale 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Scale
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(c){c.effects.puff=function(b){return this.queue(function(){var a=c(this),e=c.effects.setMode(a,b.options.mode||"hide"),g=parseInt(b.options.percent,10)||150,h=g/100,i={height:a.height(),width:a.width()};c.extend(b.options,{fade:true,mode:e,percent:e=="hide"?g:100,from:e=="hide"?i:{height:i.height*h,width:i.width*h}});a.effect("scale",b.options,b.duration,b.callback);a.dequeue()})};c.effects.scale=function(b){return this.queue(function(){var a=c(this),e=c.extend(true,{},b.options),g=c.effects.setMode(a,
b.options.mode||"effect"),h=parseInt(b.options.percent,10)||(parseInt(b.options.percent,10)==0?0:g=="hide"?0:100),i=b.options.direction||"both",f=b.options.origin;if(g!="effect"){e.origin=f||["middle","center"];e.restore=true}f={height:a.height(),width:a.width()};a.from=b.options.from||(g=="show"?{height:0,width:0}:f);h={y:i!="horizontal"?h/100:1,x:i!="vertical"?h/100:1};a.to={height:f.height*h.y,width:f.width*h.x};if(b.options.fade){if(g=="show"){a.from.opacity=0;a.to.opacity=1}if(g=="hide"){a.from.opacity=
1;a.to.opacity=0}}e.from=a.from;e.to=a.to;e.mode=g;a.effect("size",e,b.duration,b.callback);a.dequeue()})};c.effects.size=function(b){return this.queue(function(){var a=c(this),e=["position","top","bottom","left","right","width","height","overflow","opacity"],g=["position","top","bottom","left","right","overflow","opacity"],h=["width","height","overflow"],i=["fontSize"],f=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],k=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],
p=c.effects.setMode(a,b.options.mode||"effect"),n=b.options.restore||false,m=b.options.scale||"both",l=b.options.origin,j={height:a.height(),width:a.width()};a.from=b.options.from||j;a.to=b.options.to||j;if(l){l=c.effects.getBaseline(l,j);a.from.top=(j.height-a.from.height)*l.y;a.from.left=(j.width-a.from.width)*l.x;a.to.top=(j.height-a.to.height)*l.y;a.to.left=(j.width-a.to.width)*l.x}var d={from:{y:a.from.height/j.height,x:a.from.width/j.width},to:{y:a.to.height/j.height,x:a.to.width/j.width}};
if(m=="box"||m=="both"){if(d.from.y!=d.to.y){e=e.concat(f);a.from=c.effects.setTransition(a,f,d.from.y,a.from);a.to=c.effects.setTransition(a,f,d.to.y,a.to)}if(d.from.x!=d.to.x){e=e.concat(k);a.from=c.effects.setTransition(a,k,d.from.x,a.from);a.to=c.effects.setTransition(a,k,d.to.x,a.to)}}if(m=="content"||m=="both")if(d.from.y!=d.to.y){e=e.concat(i);a.from=c.effects.setTransition(a,i,d.from.y,a.from);a.to=c.effects.setTransition(a,i,d.to.y,a.to)}c.effects.save(a,n?e:g);a.show();c.effects.createWrapper(a);
a.css("overflow","hidden").css(a.from);if(m=="content"||m=="both"){f=f.concat(["marginTop","marginBottom"]).concat(i);k=k.concat(["marginLeft","marginRight"]);h=e.concat(f).concat(k);a.find("*[width]").each(function(){child=c(this);n&&c.effects.save(child,h);var o={height:child.height(),width:child.width()};child.from={height:o.height*d.from.y,width:o.width*d.from.x};child.to={height:o.height*d.to.y,width:o.width*d.to.x};if(d.from.y!=d.to.y){child.from=c.effects.setTransition(child,f,d.from.y,child.from);
child.to=c.effects.setTransition(child,f,d.to.y,child.to)}if(d.from.x!=d.to.x){child.from=c.effects.setTransition(child,k,d.from.x,child.from);child.to=c.effects.setTransition(child,k,d.to.x,child.to)}child.css(child.from);child.animate(child.to,b.duration,b.options.easing,function(){n&&c.effects.restore(child,h)})})}a.animate(a.to,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){a.to.opacity===0&&a.css("opacity",a.from.opacity);p=="hide"&&a.hide();c.effects.restore(a,
n?e:g);c.effects.removeWrapper(a);b.callback&&b.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
;/*
 * jQuery UI Effects Shake 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Shake
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(d){d.effects.shake=function(a){return this.queue(function(){var b=d(this),j=["position","top","bottom","left","right"];d.effects.setMode(b,a.options.mode||"effect");var c=a.options.direction||"left",e=a.options.distance||20,l=a.options.times||3,f=a.duration||a.options.duration||140;d.effects.save(b,j);b.show();d.effects.createWrapper(b);var g=c=="up"||c=="down"?"top":"left",h=c=="up"||c=="left"?"pos":"neg";c={};var i={},k={};c[g]=(h=="pos"?"-=":"+=")+e;i[g]=(h=="pos"?"+=":"-=")+e*2;k[g]=
(h=="pos"?"-=":"+=")+e*2;b.animate(c,f,a.options.easing);for(e=1;e<l;e++)b.animate(i,f,a.options.easing).animate(k,f,a.options.easing);b.animate(i,f,a.options.easing).animate(c,f/2,a.options.easing,function(){d.effects.restore(b,j);d.effects.removeWrapper(b);a.callback&&a.callback.apply(this,arguments)});b.queue("fx",function(){b.dequeue()});b.dequeue()})}})(jQuery);
;/*
 * jQuery UI Effects Slide 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(c){c.effects.slide=function(d){return this.queue(function(){var a=c(this),h=["position","top","bottom","left","right"],f=c.effects.setMode(a,d.options.mode||"show"),b=d.options.direction||"left";c.effects.save(a,h);a.show();c.effects.createWrapper(a).css({overflow:"hidden"});var g=b=="up"||b=="down"?"top":"left";b=b=="up"||b=="left"?"pos":"neg";var e=d.options.distance||(g=="top"?a.outerHeight({margin:true}):a.outerWidth({margin:true}));if(f=="show")a.css(g,b=="pos"?isNaN(e)?"-"+e:-e:e);
var i={};i[g]=(f=="show"?b=="pos"?"+=":"-=":b=="pos"?"-=":"+=")+e;a.animate(i,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){f=="hide"&&a.hide();c.effects.restore(a,h);c.effects.removeWrapper(a);d.callback&&d.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
;/*
 * jQuery UI Effects Transfer 1.8.9
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Transfer
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(e){e.effects.transfer=function(a){return this.queue(function(){var b=e(this),c=e(a.options.to),d=c.offset();c={top:d.top,left:d.left,height:c.innerHeight(),width:c.innerWidth()};d=b.offset();var f=e('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(a.options.className).css({top:d.top,left:d.left,height:b.innerHeight(),width:b.innerWidth(),position:"absolute"}).animate(c,a.duration,a.options.easing,function(){f.remove();a.callback&&a.callback.apply(b[0],arguments);
b.dequeue()})})}})(jQuery);
;

/* End of jquery-ui-1.8.9.custom.min.js */
/**
 * jQuery Validation Plugin 1.9.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(c){c.extend(c.fn,{validate:function(a){if(this.length){var b=c.data(this[0],"validator");if(b)return b;this.attr("novalidate","novalidate");b=new c.validator(a,this[0]);c.data(this[0],"validator",b);if(b.settings.onsubmit){a=this.find("input, button");a.filter(".cancel").click(function(){b.cancelSubmit=true});b.settings.submitHandler&&a.filter(":submit").click(function(){b.submitButton=this});this.submit(function(d){function e(){if(b.settings.submitHandler){if(b.submitButton)var f=c("<input type='hidden'/>").attr("name",
b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm);b.settings.submitHandler.call(b,b.currentForm);b.submitButton&&f.remove();return false}return true}b.settings.debug&&d.preventDefault();if(b.cancelSubmit){b.cancelSubmit=false;return e()}if(b.form()){if(b.pendingRequest){b.formSubmitted=true;return false}return e()}else{b.focusInvalid();return false}})}return b}else a&&a.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing")},valid:function(){if(c(this[0]).is("form"))return this.validate().form();
else{var a=true,b=c(this[0].form).validate();this.each(function(){a&=b.element(this)});return a}},removeAttrs:function(a){var b={},d=this;c.each(a.split(/\s/),function(e,f){b[f]=d.attr(f);d.removeAttr(f)});return b},rules:function(a,b){var d=this[0];if(a){var e=c.data(d.form,"validator").settings,f=e.rules,g=c.validator.staticRules(d);switch(a){case "add":c.extend(g,c.validator.normalizeRule(b));f[d.name]=g;if(b.messages)e.messages[d.name]=c.extend(e.messages[d.name],b.messages);break;case "remove":if(!b){delete f[d.name];
return g}var h={};c.each(b.split(/\s/),function(j,i){h[i]=g[i];delete g[i]});return h}}d=c.validator.normalizeRules(c.extend({},c.validator.metadataRules(d),c.validator.classRules(d),c.validator.attributeRules(d),c.validator.staticRules(d)),d);if(d.required){e=d.required;delete d.required;d=c.extend({required:e},d)}return d}});c.extend(c.expr[":"],{blank:function(a){return!c.trim(""+a.value)},filled:function(a){return!!c.trim(""+a.value)},unchecked:function(a){return!a.checked}});c.validator=function(a,
b){this.settings=c.extend(true,{},c.validator.defaults,a);this.currentForm=b;this.init()};c.validator.format=function(a,b){if(arguments.length==1)return function(){var d=c.makeArray(arguments);d.unshift(a);return c.validator.format.apply(this,d)};if(arguments.length>2&&b.constructor!=Array)b=c.makeArray(arguments).slice(1);if(b.constructor!=Array)b=[b];c.each(b,function(d,e){a=a.replace(RegExp("\\{"+d+"\\}","g"),e)});return a};c.extend(c.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",
validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:c([]),errorLabelContainer:c([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(a){this.lastActive=a;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass);this.addWrapper(this.errorsFor(a)).hide()}},onfocusout:function(a){if(!this.checkable(a)&&(a.name in this.submitted||!this.optional(a)))this.element(a)},
onkeyup:function(a){if(a.name in this.submitted||a==this.lastElement)this.element(a)},onclick:function(a){if(a.name in this.submitted)this.element(a);else a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).addClass(b).removeClass(d):c(a).addClass(b).removeClass(d)},unhighlight:function(a,b,d){a.type==="radio"?this.findByName(a.name).removeClass(b).addClass(d):c(a).removeClass(b).addClass(d)}},setDefaults:function(a){c.extend(c.validator.defaults,
a)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:c.validator.format("Please enter no more than {0} characters."),
minlength:c.validator.format("Please enter at least {0} characters."),rangelength:c.validator.format("Please enter a value between {0} and {1} characters long."),range:c.validator.format("Please enter a value between {0} and {1}."),max:c.validator.format("Please enter a value less than or equal to {0}."),min:c.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){function a(e){var f=c.data(this[0].form,"validator"),g="on"+e.type.replace(/^validate/,
"");f.settings[g]&&f.settings[g].call(f,this[0],e)}this.labelContainer=c(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||c(this.currentForm);this.containers=c(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=this.groups={};c.each(this.settings.groups,function(e,f){c.each(f.split(/\s/),function(g,h){b[h]=e})});var d=
this.settings.rules;c.each(d,function(e,f){d[e]=c.validator.normalizeRule(f)});c(this.currentForm).validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",a).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",
a);this.settings.invalidHandler&&c(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){this.checkForm();c.extend(this.submitted,this.errorMap);this.invalid=c.extend({},this.errorMap);this.valid()||c(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(a){this.lastElement=
a=this.validationTargetFor(this.clean(a));this.prepareElement(a);this.currentElements=c(a);var b=this.check(a);if(b)delete this.invalid[a.name];else this.invalid[a.name]=true;if(!this.numberOfInvalids())this.toHide=this.toHide.add(this.containers);this.showErrors();return b},showErrors:function(a){if(a){c.extend(this.errorMap,a);this.errorList=[];for(var b in a)this.errorList.push({message:a[b],element:this.findByName(b)[0]});this.successList=c.grep(this.successList,function(d){return!(d.name in a)})}this.settings.showErrors?
this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){c.fn.resetForm&&c(this.currentForm).resetForm();this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b=0,d;for(d in a)b++;return b},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()==
0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{c(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(a){}},findLastActive:function(){var a=this.lastActive;return a&&c.grep(this.errorList,function(b){return b.element.name==a.name}).length==1&&a},elements:function(){var a=this,b={};return c(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&
a.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in b||!a.objectLength(c(this).rules()))return false;return b[this.name]=true})},clean:function(a){return c(a)[0]},errors:function(){return c(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=c([]);this.toHide=c([]);this.currentElements=c([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},
prepareElement:function(a){this.reset();this.toHide=this.errorsFor(a)},check:function(a){a=this.validationTargetFor(this.clean(a));var b=c(a).rules(),d=false,e;for(e in b){var f={method:e,parameters:b[e]};try{var g=c.validator.methods[e].call(this,a.value.replace(/\r/g,""),a,f.parameters);if(g=="dependency-mismatch")d=true;else{d=false;if(g=="pending"){this.toHide=this.toHide.not(this.errorsFor(a));return}if(!g){this.formatAndAdd(a,f);return false}}}catch(h){this.settings.debug&&window.console&&console.log("exception occured when checking element "+
a.id+", check the '"+f.method+"' method",h);throw h;}}if(!d){this.objectLength(b)&&this.successList.push(a);return true}},customMetaMessage:function(a,b){if(c.metadata){var d=this.settings.meta?c(a).metadata()[this.settings.meta]:c(a).metadata();return d&&d.messages&&d.messages[b]}},customMessage:function(a,b){var d=this.settings.messages[a];return d&&(d.constructor==String?d:d[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(arguments[a]!==undefined)return arguments[a]},defaultMessage:function(a,
b){return this.findDefined(this.customMessage(a.name,b),this.customMetaMessage(a,b),!this.settings.ignoreTitle&&a.title||undefined,c.validator.messages[b],"<strong>Warning: No message defined for "+a.name+"</strong>")},formatAndAdd:function(a,b){var d=this.defaultMessage(a,b.method),e=/\$?\{(\d+)\}/g;if(typeof d=="function")d=d.call(this,b.parameters,a);else if(e.test(d))d=jQuery.format(d.replace(e,"{$1}"),b.parameters);this.errorList.push({message:d,element:a});this.errorMap[a.name]=d;this.submitted[a.name]=
d},addWrapper:function(a){if(this.settings.wrapper)a=a.add(a.parent(this.settings.wrapper));return a},defaultShowErrors:function(){for(var a=0;this.errorList[a];a++){var b=this.errorList[a];this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass);this.showLabel(b.element,b.message)}if(this.errorList.length)this.toShow=this.toShow.add(this.containers);if(this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);
if(this.settings.unhighlight){a=0;for(b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass)}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return c(this.errorList).map(function(){return this.element})},showLabel:function(a,b){var d=this.errorsFor(a);if(d.length){d.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
d.attr("generated")&&d.html(b)}else{d=c("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(a),generated:true}).addClass(this.settings.errorClass).html(b||"");if(this.settings.wrapper)d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,c(a)):d.insertAfter(a))}if(!b&&this.settings.success){d.text("");typeof this.settings.success=="string"?d.addClass(this.settings.success):this.settings.success(d)}this.toShow=
this.toShow.add(d)},errorsFor:function(a){var b=this.idOrName(a);return this.errors().filter(function(){return c(this).attr("for")==b})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(a){if(this.checkable(a))a=this.findByName(a.name).not(this.settings.ignore)[0];return a},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(a){var b=this.currentForm;return c(document.getElementsByName(a)).map(function(d,
e){return e.form==b&&e.name==a&&e||null})},getLength:function(a,b){switch(b.nodeName.toLowerCase()){case "select":return c("option:selected",b).length;case "input":if(this.checkable(b))return this.findByName(b.name).filter(":checked").length}return a.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):true},dependTypes:{"boolean":function(a){return a},string:function(a,b){return!!c(a,b.form).length},"function":function(a,b){return a(b)}},optional:function(a){return!c.validator.methods.required.call(this,
c.trim(a.value),a)&&"dependency-mismatch"},startRequest:function(a){if(!this.pending[a.name]){this.pendingRequest++;this.pending[a.name]=true}},stopRequest:function(a,b){this.pendingRequest--;if(this.pendingRequest<0)this.pendingRequest=0;delete this.pending[a.name];if(b&&this.pendingRequest==0&&this.formSubmitted&&this.form()){c(this.currentForm).submit();this.formSubmitted=false}else if(!b&&this.pendingRequest==0&&this.formSubmitted){c(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=
false}},previousValue:function(a){return c.data(a,"previousValue")||c.data(a,"previousValue",{old:null,valid:true,message:this.defaultMessage(a,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(a,b){a.constructor==String?this.classRuleSettings[a]=b:c.extend(this.classRuleSettings,
a)},classRules:function(a){var b={};(a=c(a).attr("class"))&&c.each(a.split(" "),function(){this in c.validator.classRuleSettings&&c.extend(b,c.validator.classRuleSettings[this])});return b},attributeRules:function(a){var b={};a=c(a);for(var d in c.validator.methods){var e;if(e=d==="required"&&typeof c.fn.prop==="function"?a.prop(d):a.attr(d))b[d]=e;else if(a[0].getAttribute("type")===d)b[d]=true}b.maxlength&&/-1|2147483647|524288/.test(b.maxlength)&&delete b.maxlength;return b},metadataRules:function(a){if(!c.metadata)return{};
var b=c.data(a.form,"validator").settings.meta;return b?c(a).metadata()[b]:c(a).metadata()},staticRules:function(a){var b={},d=c.data(a.form,"validator");if(d.settings.rules)b=c.validator.normalizeRule(d.settings.rules[a.name])||{};return b},normalizeRules:function(a,b){c.each(a,function(d,e){if(e===false)delete a[d];else if(e.param||e.depends){var f=true;switch(typeof e.depends){case "string":f=!!c(e.depends,b.form).length;break;case "function":f=e.depends.call(b,b)}if(f)a[d]=e.param!==undefined?
e.param:true;else delete a[d]}});c.each(a,function(d,e){a[d]=c.isFunction(e)?e(b):e});c.each(["minlength","maxlength","min","max"],function(){if(a[this])a[this]=Number(a[this])});c.each(["rangelength","range"],function(){if(a[this])a[this]=[Number(a[this][0]),Number(a[this][1])]});if(c.validator.autoCreateRanges){if(a.min&&a.max){a.range=[a.min,a.max];delete a.min;delete a.max}if(a.minlength&&a.maxlength){a.rangelength=[a.minlength,a.maxlength];delete a.minlength;delete a.maxlength}}a.messages&&delete a.messages;
return a},normalizeRule:function(a){if(typeof a=="string"){var b={};c.each(a.split(/\s/),function(){b[this]=true});a=b}return a},addMethod:function(a,b,d){c.validator.methods[a]=b;c.validator.messages[a]=d!=undefined?d:c.validator.messages[a];b.length<3&&c.validator.addClassRules(a,c.validator.normalizeRule(a))},methods:{required:function(a,b,d){if(!this.depend(d,b))return"dependency-mismatch";switch(b.nodeName.toLowerCase()){case "select":return(a=c(b).val())&&a.length>0;case "input":if(this.checkable(b))return this.getLength(a,
b)>0;default:return c.trim(a).length>0}},remote:function(a,b,d){if(this.optional(b))return"dependency-mismatch";var e=this.previousValue(b);this.settings.messages[b.name]||(this.settings.messages[b.name]={});e.originalMessage=this.settings.messages[b.name].remote;this.settings.messages[b.name].remote=e.message;d=typeof d=="string"&&{url:d}||d;if(this.pending[b.name])return"pending";if(e.old===a)return e.valid;e.old=a;var f=this;this.startRequest(b);var g={};g[b.name]=a;c.ajax(c.extend(true,{url:d,
mode:"abort",port:"validate"+b.name,dataType:"json",data:g,success:function(h){f.settings.messages[b.name].remote=e.originalMessage;var j=h===true;if(j){var i=f.formSubmitted;f.prepareElement(b);f.formSubmitted=i;f.successList.push(b);f.showErrors()}else{i={};h=h||f.defaultMessage(b,"remote");i[b.name]=e.message=c.isFunction(h)?h(a):h;f.showErrors(i)}e.valid=j;f.stopRequest(b,j)}},d));return"pending"},minlength:function(a,b,d){return this.optional(b)||this.getLength(c.trim(a),b)>=d},maxlength:function(a,
b,d){return this.optional(b)||this.getLength(c.trim(a),b)<=d},rangelength:function(a,b,d){a=this.getLength(c.trim(a),b);return this.optional(b)||a>=d[0]&&a<=d[1]},min:function(a,b,d){return this.optional(b)||a>=d},max:function(a,b,d){return this.optional(b)||a<=d},range:function(a,b,d){return this.optional(b)||a>=d[0]&&a<=d[1]},email:function(a,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)},
url:function(a,b){return this.optional(b)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},
date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a))},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 -]+/.test(a))return false;var d=0,e=0,f=false;a=a.replace(/\D/g,"");for(var g=a.length-1;g>=
0;g--){e=a.charAt(g);e=parseInt(e,10);if(f)if((e*=2)>9)e-=9;d+=e;f=!f}return d%10==0},accept:function(a,b,d){d=typeof d=="string"?d.replace(/,/g,"|"):"png|jpe?g|gif";return this.optional(b)||a.match(RegExp(".("+d+")$","i"))},equalTo:function(a,b,d){d=c(d).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){c(b).valid()});return a==d.val()}}});c.format=c.validator.format})(jQuery);
(function(c){var a={};if(c.ajaxPrefilter)c.ajaxPrefilter(function(d,e,f){e=d.port;if(d.mode=="abort"){a[e]&&a[e].abort();a[e]=f}});else{var b=c.ajax;c.ajax=function(d){var e=("port"in d?d:c.ajaxSettings).port;if(("mode"in d?d:c.ajaxSettings).mode=="abort"){a[e]&&a[e].abort();return a[e]=b.apply(this,arguments)}return b.apply(this,arguments)}}})(jQuery);
(function(c){!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(e){e=c.event.fix(e);e.type=b;return c.event.handle.call(this,e)}c.event.special[b]={setup:function(){this.addEventListener(a,d,true)},teardown:function(){this.removeEventListener(a,d,true)},handler:function(e){arguments[0]=c.event.fix(e);arguments[0].type=b;return c.event.handle.apply(this,arguments)}}});c.extend(c.fn,{validateDelegate:function(a,
b,d){return this.bind(b,function(e){var f=c(e.target);if(f.is(a))return d.apply(f,arguments)})}})})(jQuery);

/* End of jquery.validate.min.js */
/*
  
RollBar - jQuery ScrollBar Plugin
-----------------------------------------------
  
@author   flGravity
@created  4.4.12
@version  1.4
@site     http://codecanyon.net/user/flGravity
  
*/

eval(function (p, a, c, k, e, r) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function (e) { return r[e] } ]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p } ('(8($){8 J(c,s){4.i=$(c);4.6=s;4.V=0;4.11={\'v\':0,\'h\':0};4.K={};4.R=0;4.k=$(\'<W/>\',{\'12\':\'x-1g\'});4.p=$(\'<W/>\',{\'12\':\'x-1r-1s\'});4.l=$(\'<W/>\',{\'12\':\'x-1g\'});4.q=$(\'<W/>\',{\'12\':\'x-1r-1t\'});4.r=4.k.1u(4.l);4.i.j({\'1Z\':\'21\',\'y\':\'1v\'}).22().23(4.6.1w).24(\'<W 12="x-A"></W>\');4.A=4.i.25(\'.x-A\').j({\'u\':0,\'o\':0,\'y\':\'1v\',\'26\':\'o\'});7(4.6.B==\'1t\'){4.i.1h(4.q.17(4.l))}L 7(4.6.B==\'1s\'){4.i.1h(4.p.17(4.k))}L{4.i.1h(4.p.17(4.k),4.q.17(4.l))}4.p.1u(4.q).j({\'z-27\':4.6.1x,\'28\':\'29\'});4.k.j({\'C\':4.6.1i,\'1y\':4.6.D});4.l.j({\'E\':4.6.1i,\'1y\':4.6.D});7(4.6.D){4.r.2a(4.M(8(){4.r.N().F(4.6.w,1)}),4.M(8(){7(!4.R){4.r.N().F(4.6.w,4.6.D)}}))}4.1z();4.18();4.m($(O),\'2b\',8(){1A(4.M(4.19),10)});7(4.6.1j>0){1B(4.M(8(){4.19();4.18()}),4.6.1j)}}J.P.19=8(){4.S=4.p.C()-4.k.C();4.G=4.q.E()-4.l.E();4.H=4.A.C()-4.i.C();4.I=4.A.E()-4.i.E();7(!4.6.1C)X;7(4.H>0){4.p.1D(4.6.13)}L{4.p.1E(4.6.13)}7(4.I>0){4.q.1D(4.6.13)}L{4.q.1E(4.6.13)}};J.P.18=8(){9 a=1k(4.6.1F,10);4.p.j({\'u\':a+\'Y\',\'C\':4.i.C()-2*a+\'Y\'});4.q.j({\'o\':a+\'Y\',\'E\':4.i.E()-2*a+\'Y\'})};J.P.B=8(v,h,e){9 a=0;9 b=0;7(v<0){v=0}7(v>4.S){v=4.S}4.k.j(\'u\',v+\'Y\');7(h<0){h=0}7(h>4.G){h=4.G}4.l.j(\'o\',h+\'Y\');7(4.H>0){b=v/4.S;4.A.j(\'u\',T.1a(-4.H*b));7(e&&(v&&v!=4.S)){e.Q();e.Z()}}7(4.I>0){a=h/4.G;4.A.j(\'o\',T.1a(-4.I*a));7(e&&(h&&h!=4.G)){e.Q();e.Z()}}7(4.11.v!=b||4.11.h!=a){7(2c 4.6.1l==\'8\'){4.6.1l.1G(4.i.1b(0),b,a)}4.11.v=b;4.11.h=a}};J.P.1m=8(v,h){9 n=0;9 a=T.2d(4.6.1H/4.6.1n);9 b=4.k.y().u;9 c=4.l.y().o;9 d=$.1I[4.6.1J]||$.1I.2e;4.r.N().F(4.6.w,1);O.1K(4.V);4.V=O.1B(4.M(8(){4.B(b+d(n/a,n,0,1,a)*v,c+d(n/a,n,0,1,a)*h);7(++n>a){O.1K(4.V);4.r.N().F(4.6.w,4.6.D)}}),4.6.1n)};J.P.M=8(f,s){9 a=4;X 8(){f.2f(s||a,2g.P.2h.1G(2i))}};J.P.m=8(t,e,f,s){X t.2j(e,4.M(f,s))};J.P.1z=8(){9 f=$(O.2k);4.m(4.r,\'2l\',8(e){4.R=(e.1c===4.k.1b(0))?1:2;9 a=e.1d;9 b=e.1e;9 c=4.k.y().u;9 d=4.l.y().o;4.m(f,\'1L\',8(e){7(4.R==1){4.B(c+(e.1e-b),d)}L{4.B(c,d+(e.1d-a))}});4.m(f,\'1M\',8(e){e.Z()})});4.m(f,\'2m\',8(e){7(4.R==1&&e.1c!==4.k.1b(0)){4.k.F(4.6.w,4.6.D)}L 7(4.R==2&&e.1c!==4.l.1b(0)){4.l.F(4.6.w,4.6.D)}4.R=0;f.1N(\'1L\');f.1N(\'1M\')});4.m(4.i,\'2n\',8(e){9 a=e.1o;9 b=a.1O[0];4.K.1P=b.1d;4.K.1Q=b.1e;4.K.1R=4.k.y().u;4.K.1S=4.l.y().o;4.r.N().F(4.6.w,1);7(4.6.14&&(4.H||4.I)){a.Q()}});4.m(4.i,\'2o\',8(e){9 a=e.1o;9 b=a.2p[0];4.B(4.K.1R+(4.K.1Q-b.1e)*4.6.1p,4.K.1S+(4.K.1P-b.1d)*4.6.1p,e);7(4.6.14&&(4.H||4.I)){a.Z();a.Q()}});4.m(4.i,\'2q 2r\',8(e){9 a=e.1o;9 b=a.1O[0];4.r.N().F(4.6.w,4.6.D);7(4.6.14&&(4.H||4.I)){a.Q()}});9 g=4.p.C(),G=4.q.E();4.m($(O),\'2s\',8(){4.18();4.19();7(4.H<=0){4.A.j(\'u\',0)}7(4.I<=0){4.A.j(\'o\',0)}4.B(T.1a(1k(4.k.j(\'u\'),10)*4.p.C()/g),T.1a(1k(4.l.j(\'o\'),10)*4.q.E()/G));g=4.p.C();G=4.q.E()});4.m(4.i,\'2t\',8(e,a,b,c){9 d=e.1c.2u;7(d==\'2v\'||(d==\'2w\'||d==\'2x\')){e.Q();X}4.B(4.k.y().u-4.6.1q*c,4.l.y().o+4.6.1q*b,e);4.r.N().F(4.6.w,1);O.2y(4.V);4.V=O.1A(4.M(8(){4.r.N().F(4.6.w,4.6.D)}),4.6.1T);7(4.6.14&&(4.H||4.I)){e.Z();e.Q()}});4.m(f,\'2z\',8(e){9 a=0,U=0;U=(e.1f==2A)?-4.6.16:U;U=(e.1f==2B)?4.6.16:U;a=(e.1f==2C)?-4.6.16:a;a=(e.1f==2D)?4.6.16:a;7(U||a){4.1m(U,a)}});4.m(4.i,"2E",8(e){e.Z()});4.m(4.i,\'x\',8(e,v,h,a){e.Q();7(v===\'2F\'){4.i.2G(\'.x-A, .x-1g\').j({u:0,o:0});X}v=v||0;h=h||0;7(/^[-\\d\\.]+$/.1U(v)){v=1V(v);7(T.1W(v)<=1&&!a){v*=4.S}L{v=v+v*(4.S/4.H-1)}}7(/^[-\\d\\.]+$/.1U(h)){h=1V(h);7(T.1W(h)<=1&&!a){h*=4.G}L{h=h+h*(4.G/4.I-1)}}4.1m(v,h)})};$.2H.x=8(s){9 a={B:\'2I\',1C:2J,13:\'2K\',1j:1X,14:2L,1w:\'*\',1i:\'2M%\',D:0.5,w:2N,1T:1X,1q:20,1p:0.3,1F:\'2O\',16:1Y,1H:2P,1n:15,1J:\'2Q\',1x:1Y,1l:8(){}};$.2R(a,s);X 4.2S(8(){2T J(4,a)})}})(2U);', 62, 181, '||||this||settings|if|function|var|||||||||container|css|vslider|hslider|bindEvent||left|vpath|hpath|sliders|||top||sliderOpacityTime|rollbar|position||content|scroll|height|sliderOpacity|width|fadeTo|htrack|vdiff|hdiff|RollBar|touch|else|fixFn|stop|window|prototype|stopPropagation|pressed|vtrack|Math|vkey|timer|div|return|px|preventDefault||before|class|autoHideTime|blockGlobalScroll||keyScroll|append|pathSize|checkScroll|round|get|target|pageX|pageY|keyCode|handle|prepend|sliderSize|lazyCheckScroll|parseInt|onscroll|easeScroll|scrollInterval|originalEvent|touchSpeed|wheelSpeed|path|vertical|horizontal|add|relative|contentFilter|zIndex|opacity|init|setTimeout|setInterval|autoHide|fadeIn|fadeOut|pathPadding|call|scrollTime|easing|scrollEasing|clearInterval|mousemove|selectstart|unbind|changedTouches|sx|sy|sv|sh|sliderOpacityDelay|test|parseFloat|abs|1000|100|overflow||hidden|contents|filter|wrapAll|children|float|index|display|none|hover|load|typeof|floor|linear|apply|Array|slice|arguments|bind|document|mousedown|mouseup|touchstart|touchmove|targetTouches|touchend|touchcancel|resize|mousewheel|nodeName|TEXTAREA|SELECT|OPTION|clearTimeout|keydown|38|40|37|39|dragstart|reset|find|fn|both|true|fast|false|30|200|20px|500|swing|extend|each|new|jQuery'.split('|'), 0, {}))

/* End of jquery.rollbar.min.js */
/* flash.js */

// Initialize vars for Flash detection
// Set to the Flash Player version checking for
var MM_contentVersion = 8;
// Assume the user doesn't have the plugin
var MM_FlashCanPlay = false;
//
// ------------------------------------------------------------------------------------------------------------
// Main Flash Detection Function
//
// Checks if the Flash Player exists and if it is >= specified version in MM_contentVersion
function flashDetection(width, height, swfName, swfSource) {		
  var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
  //alert(plugin);
	// Determine which browser the user has, since NN and IE handle the Flash Player plugin differently
  if (plugin) {
		// Checks the Flash Player version for NN
		//alert("NN");
		MM_FlashCanPlay = NN_FlashChecker();
  } else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.appVersion.indexOf("Win") != -1)) {
		// Checks the Flash Player version for IE
		//alert("IE");
		MM_FlashCanPlay = IE_FlashChecker();
	}
	// Determines if the user has the correct Flash Player
	if ( MM_FlashCanPlay ) {
		// Display Flash
		playFlash(width, height, swfName, swfSource);
	} else{
		// Error - Flash Player does not exist or wrong version
		doNotPlayFlash();
	}
}
//
// ------------------------------------------------------------------------------------------------------------
// Utility Funcitons for Flash Dectection
//
// Detects the Flash Player plugin for Internet Explorer
function IE_FlashChecker() {
	//alert("IE_FlashChecker");
	document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n'); //FS hide this from IE4.5 Mac by splitting the tag
	document.write('on error resume next \n');
	document.write('MM_FlashCanPlay = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & MM_contentVersion)))\n');
	document.write('</SCR' + 'IPT\> \n');
	//alert("MM_FlashCanPlay = " + MM_FlashCanPlay);
	return (MM_FlashCanPlay);
}
//
// Detects the Flash Player plugin for Netscape
function NN_FlashChecker() {
	//alert("NN_FlashChecker");	
	var words = navigator.plugins["Shockwave Flash"].description.split(" ");
	for (var i = 0; i < words.length; ++i) {
		if (isNaN(parseInt(words[i])))
		continue;
		var MM_PluginVersion = words[i]; 
	}
	var MM_FlashCanPlay = MM_PluginVersion >= MM_contentVersion;
	//alert("MM_FlashCanPlay = " + MM_FlashCanPlay);
	return (MM_FlashCanPlay);
}
//
// The user has the correct Flash Player 
// Writes the code for the Flash movie and allows the Flash movie to play
function playFlash(width, height, swfName, swfSource) {
	//alert("playFlash");
	document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
	document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"');
	document.write(' ID="' + swfName + '" WIDTH="' + width + '" HEIGHT="' + height + '" ALIGN="">');
	document.write('<PARAM NAME=movie VALUE="' + swfSource + '"><PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#FFFFFF>'); 
	document.write('<EMBED src="' + swfSource + '" quality=high bgcolor=#FFFFFF');
	document.write(' swLiveConnect=FALSE WIDTH="' + width + '" HEIGHT="' + height + '" NAME="' + swfName + '" ALIGN=""');
	document.write(' TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer">');
	document.write('</EMBED>');
	document.write('</OBJECT>');
}
//
// The user does not have the correct Flash Player 
// Redirects the user to the error page for no Flash Player
function doNotPlayFlash() {
	window.location.replace("/error_flash.asp?<%=display_sid%>");
}

function flashSplash(flashSource,assetWidth,assetHeight,bgcolor,imageSource) {
	if ( isCorrectFlash() ) {
				  			document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
				  			document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" ');
				  			document.write(' id="flashSplash" width="'+assetWidth+'" height="'+assetHeight+'" align="">');
				  			document.write(' <param name="movie" value="'+ flashSource+'"> <param name="quality" value="high"> <param name="bgcolor" value="#FFFFFF">  <param name="WMode" value="Transparent" />');
				  			document.write(' <embed wmode="transparent" src="'+ flashSource+'" quality="high" bgcolor="#FFFFFF"  ');
				  			document.write(' swLiveConnect=FALSE width="'+assetWidth+'" height="'+assetHeight+'" name="flashSplash" align=""');
				  			document.write(' type="application/x-shockwave-flash" pluginspage="'+flashPluginsPage+'">');
				  			document.write(' </embed>');
				  			document.write(' </object>');
	} else{
				  			document.write('<img src="'+imageSource+'" name="imgCategoryPhoto" width="'+assetWidth+'" height="'+assetHeight+'" border="0" id="imgCategoryPhoto" style="padding: 0px; margin: 0px; display:block;" galleryimg="no" />');
	}
			
}

function isCorrectFlash(){
	return false;
	}

function isCorrectFlash2() {
	// If the user has the correct vr of the Flash, then show flashSource
	// Else, Show the imageSource
	// Users can only see PMA Flash version if they have Flash 6 or higher installed.
	MM_contentVersion = 8; 
	var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;

	// Determine which browser the user has, since NN and IE handle the Flash Player plugin differently
	if (plugin) {
		// Checks the Flash Player version for NN
		MM_FlashCanPlay = NN_FlashChecker();
	} else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.appVersion.indexOf("Win") != -1)) {
		// Checks the Flash Player version for IE
		MM_FlashCanPlay = IE_FlashChecker();
	}
	if ( MM_FlashCanPlay ) {return true; }
	else {return false; }
}
// ------------------------------------------------------------------------------------------------------------
// Flash Version Detection Function
//
// Checks if the Flash Player exists. If exists, returns the flash player version number, otherwise returns -1.
function GetFlashVersion() {		
  
  var flashVersion;
  
  //default to -1
  flashVersion = -1;
  
  var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;

// Determine which browser the user has, since NN/Firefox and IE handle the Flash Player plugin differently
  if (plugin) {
		
		// Checks the Flash Player version for NN
		flashVersion = NN_GetFlashVersion();
		
  } else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.appVersion.indexOf("Win") != -1)) {
		
		// Checks the Flash Player version for IE
		flashVersion = IE_GetFlashVersion();
	}	
	
	return (flashVersion);

}

// Detects the Flash Player plugin for Netscape
function NN_GetFlashVersion() {

	var flashVersion;
	
	//Default to -1
	MM_PluginVersion = -1;
	
	var words = navigator.plugins["Shockwave Flash"].description.split(" ");
	for (var i = 0; i < words.length; ++i) {
		if (isNaN(parseInt(words[i])))
		continue;
		flashVersion = words[i]; 
	}
	
	return (flashVersion);
}

var IEFlashVersion;

// Utility Funcitons for Flash Dectection
//
// Detects the Flash Player plugin for Internet Explorer
function IE_GetFlashVersion() {

	//Default to -1
	IEFlashVersion = -1;
	
	document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n'); //FS hide this from IE4.5 Mac by splitting the tag
	document.write('on error resume next \n');
	document.write('For i = 2 to 15 \n');	
	document.write('If Not(IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & i))) Then \n');
	document.write('Else \n');
	document.write('IEFlashVersion = i \n');
	document.write('End If \n');	
	document.write('Next \n');	
	document.write('</SCR' + 'IPT\> \n');
		
	return (IEFlashVersion);
}

/* End of flash.js */
// ----------------------------------------------
// File:		flashAPI.js
// Author:		Nathan Derksen
// Description:	Wrapper class for Flash detect kit. Requires the adobe AC_OETags.js file to be in place as well.
// Example:
// var itemFlash = new FlashAPI("itemImage");
// itemFlash.setAttribute("src", "/Shared/flash/itemZoom.swf");
// itemFlash.setAttribute("width", "475");
// itemFlash.setAttribute("height", "440");
// itemFlash.setAttribute("bgcolor", itemZoomProperties.backgroundColor);
// itemFlash.setAttribute("flashVars", imageZoomData);
// itemFlash.setAttribute("name", "itemZoom");
// itemFlash.setAlternateHTML(alternateHTML);
// itemFlash.setFlashVersion(8, 0, 0);
// itemFlash.generateFlash();
// ----------------------------------------------

var FlashAPI_skipFlashFocus = false;

// ----------------------------------------------
// Function:	FlashAPI()
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<String> id: The ID for the tag to hold the Flash content
// Returns:		<Nothing>
// ----------------------------------------------
function FlashAPI(handle)
{
	this.pHandle = handle;
	
	this.pAttributes = new Object();
	this.pAttributes["width"] = 100;
	this.pAttributes["height"] = 100;
	this.pAttributes["wmode"] = "opaque";
	this.pAttributes["quality"] = "high";
	this.pAttributes["scale"] = "noscale";
	this.pAttributes["salign"] = "tl";
	this.pAttributes["bgcolor"] = "#FFFFFF";
	this.pAttributes["quality"] = "high";
	this.pAttributes["play"] = "true";
	this.pAttributes["loop"] = "false";
	this.pAttributes["allowScriptAccess"] = "sameDomain";

	this.pAlternateHTML = "";
	this.pAlternateImage = "";
	this.pRedirectURL = "";
	this.pAlternateMobile = "";
		
	this.pVersionMajor = 9;
	this.pVersionMinor = 0;
	this.pVersionRevision = 0;

	// Fix for IE title issue - trap focus event which triggers title replacement
	if (typeof (pageTitle_verify) != "undefined") {
		this.setAttribute("onfocus", "pageTitle_verify();");
	}
	this.setAttribute("menu", "false");
}

// ----------------------------------------------
// Function:	setAttribute()
// Author:		Nathan Derksen
// Description:	Sets the various attributes to be used within the <object> and <embed> tags. 
//				Certain attributes will automatically be put within certain tags (such as width 
//				and height in the <object> and <embed> tags and flashvars in the <param> and <embed> tags.
// Inputs:		<String> attName: The attribute name to set
//				<String> attValue: Value to give the specified attribute
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.setAttribute = function(attName, attValue)
{
	if (attName)
	{
		this.pAttributes[attName] = attValue;
	}
};

// ----------------------------------------------
// Function:	setAlternateHTML()
// Author:		Nathan Derksen
// Description:	Specify the HTML to show in the event that the user does not have a recent enough version of Flash.
//				This HTML will be applied when the generateFlash method is called.
// Inputs:		<String> alternateHTML: The HTML to place inside the element specified in the constructor
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.setAlternateHTML = function(alternateHTML)
{
	if (alternateHTML)
	{
		this.pAlternateHTML = alternateHTML;
	}
};

// ----------------------------------------------
// Function:	setAlternateImage()
// Author:		Nathan Derksen
// Description:	Specify an image to show in the event that the user does not have a recent enough version of Flash.
//				This image will be applied when the generateFlash method is called. Note that this method overrides 
//				the effect of setAlternateHTML().
// Inputs:		<String> src: The source of the image to place inside the element specified in the constructor. 
//				The dimensions used are taken from the width and height attributes assigned to the Flash component 
//				through setAttribute().
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.setAlternateImage = function(src)
{
	if (src)
	{
		this.pAlternateImage = src;
	}
};

// ----------------------------------------------
// ----------------------------------------------
FlashAPI.prototype.setAlternateMobile = function(src)
{
	if (src)
	{
		this.pAlternateMobile = src;
	}
};

// ----------------------------------------------
// Function:	setAlternateRedirect()
// Author:		Nathan Derksen
// Description:	Specify a url to navigate to in the event that the proper version of the Flash plugin is not installed.
// Inputs:		<String> url: The location to navigate to.
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.setAlternateRedirect = function(url)
{
	if (url)
	{
		this.pRedirectURL = url;
	}
};


// ----------------------------------------------
// Function:	setFlashVersion()
// Author:		Nathan Derksen
// Description:	Specify the version of the Flash player to set as minimum. Anything below this value will trigger
//				the alternate display when the generateFlash() method is called.
// Inputs:		<Number> major: The major version (eg 9)
//				<Number> minor: The minor version (almost always zero)
//				<Number> revision: The revision (generally zero, but may be higher. Set to zero if unsure)
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.setFlashVersion = function(major, minor, revision)
{
	if (major)
	{
		this.pVersionMajor = major;
	}
	if (minor)
	{
		this.pVersionMinor = minor;
	}
	if (revision)
	{
		this.pVersionRevision = revision;
	}
};

// ----------------------------------------------
// Function:	generateFlash()
// Author:		Nathan Derksen
// Description:	Trigger the rendering of the Flash component. Nothing is displayed until this method is called.
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.generateFlash = function(inline)
{
	var isInline = false;
	if (inline == true)
	{
		isInline = true;
	}
	var validate = false;

	if (this.pHandle)
	{
		validate = true;
	}
	else if (isInline == true)
	{
		validate = true;
	}

	if (validate == true)
	{
		var hasReqVers = DetectFlashVer(this.pVersionMajor, this.pVersionMinor, this.pVersionRevision);

		var attributeList = new Array();
		for (var attribute in this.pAttributes)
		{
			attributeList.push(attribute);
			attributeList.push(this.pAttributes[attribute]);
		}

		if (hasReqVers == true)
		{
			if (this.pAlternateMobile != "" && isMobile() == true)
			{
				if (isInline == true)
				{
					document.write(this.pAlternateMobile);
				}
				else
				{
					this.pHandle.innerHTML = this.pAlternateMobile;
				}
			}
			else
			{
				var args = AC_GetArgs(attributeList, "", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");
				var html = "";
				html += '<object ';
				for (var attr in args.objAttrs)
				{
					html += attr + '="' + args.objAttrs[attr] + '" ';
				}
				html += '>';
				for (var attr in args.params)
				{
					html += '<param name="' + attr + '" value="' + args.params[attr] + '" />';
				}
				html += '<embed ';
				for (var attr in args.embedAttrs)
				{
					html += attr + '="' + args.embedAttrs[attr] + '" ';
				}
				html += '></embed></object>';
				if (isInline == true)
				{
					document.write(html);
				}
				else
				{
					this.pHandle.innerHTML = html;
				}
				this.triggerBlur();
			}
		}
		else
		{
			if (this.pAlternateMobile != "" && isMobile() == true)
			{
				if (isInline == true)
				{
					document.write(this.pAlternateMobile);
				}
				else
				{
					this.pHandle.innerHTML = this.pAlternateMobile;
				}
			}
			else if (this.pRedirectURL != "")
			{
				window.location.href = this.pRedirectURL;
			}
			else if (this.pAlternateImage != "")
			{
				if (isInline == true)
				{
					document.write('<img src="' + this.pAlternateImage + '" width="' + this.pAttributes["width"] + '" height="' + this.pAttributes["height"] + '" />');
				}
				else
				{
					this.pHandle.innerHTML = '<img src="' + this.pAlternateImage + '" width="' + this.pAttributes["width"] + '" height="' + this.pAttributes["height"] + '" />';
				}
			}
			else
			{
				if (isInline == true)
				{
					document.write(this.pAlternateHTML);
				}
				else
				{
					this.pHandle.innerHTML = this.pAlternateHTML;
				}
			}
		}
	}
};

// ----------------------------------------------
// Function:	triggerBlur()
// Author:		Nathan Derksen
// Description:	Manually remove the focus from the Flash module
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
FlashAPI.prototype.triggerBlur = function()
{
	var elements = [];
	
	if (parent == window)
	{
		// not in an iframe		
		if (document.getElementById("divLogo") != null)
		{
			elements = document.getElementById("divLogo").getElementsByTagName("a");
		}
		else
		{
			elements = document.getElementsByTagName("a");
		}
	}
	else
	{
		// in an iframe, get around the fact that the first bunch of links are not visible and can't be detected as such
		if (document.getElementById("divPageContent") != null)
		{
			elements = document.getElementById("divPageContent").getElementsByTagName("a");
		}
	}

    try {
        // 3219: Fails in IE if <a> tag is hidden, so catch the error so that rest of code isn't aborted
        if (elements.length > 0) {
            if (FlashAPI_skipFlashFocus == false) {
                elements[0].focus();
                elements[0].blur();
            }
        }
    }
    catch (err) {
    }

    if (typeof (pageTitle_verify) != "undefined")
	{
		pageTitle_verify();
	}
}

// ----------------------------------------------
// Function:	isFlashAvailable()
// Author:		Nathan Derksen
// Description:	A static helper method that allows for a Flash player version test without actually needing to create 
//				a new instance of FlashAPI.
// Inputs:		<Number> major: The major version (eg 9)
//				<Number> minor: The minor version (almost always zero)
//				<Number> revision: The revision (generally zero, but may be higher. Set to zero if unsure)
// Returns:		<Boolean>: True if the installed player is greater than or equal to the passed in parameters, false otherwise.
// ----------------------------------------------
FlashAPI.isFlashAvailable = function(major, minor, revision)
{
	return DetectFlashVer(major, minor, revision);
};

FlashAPI.getHandle = function(movieName)
{
	var isIE = navigator.appName.indexOf("Microsoft") != -1;
	var windowRef = window[movieName];
	var documentRef = document[movieName];
	
	if (isIE)
	{
		if (windowRef) {
			return windowRef;
		} else {
			return document.getElementById(movieName);
		}
	}
	else
	{
		if (documentRef && documentRef.length > 0)
		{
			// Some flash embed implementations use "name" for both object and embed tags. We want the embed one.
			return documentRef[documentRef.length-1];
		}
	}
	return null;
};

/* End of flashAPI.js */
﻿// GlobalMenuManager.js, for managing top nav overlay component

var hoverOnEvent;
var hoverOffEvent;

function GlobalMenuManager()
{
	this.pInstance = null;
}

GlobalMenuManager.getInstance = function ()
{
	if (!this.pInstance)
	{
		this.pInstance = new GlobalMenuManager();
	}
	return this.pInstance;
};

GlobalMenuManager.prototype.init = function () {

    //auto advance carousel code
    var carouselTimer;

    if ('ontouchstart' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
        hoverOnEvent = "click";
    } else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOnEvent = "MSPointerOver";
        } else {
            hoverOnEvent = "pointerover";
        }
    } else {
        hoverOnEvent = "mouseenter";
    }

    if ('ontouchend' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
        hoverOffEvent = "mouseleave";
    } else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOffEvent = "MSPointerOut";
        } else {
            hoverOffEvent = "pointerout";
        }
    } else {
        hoverOffEvent = "mouseleave";
    }

    $(window).load(function () {
        autoAdvanceCarousel();
    });

    $("body").on("mouseenter", ".auto-advance", function () {
        clearInterval(carouselTimer);
        carouselTimer = null;
    });

    $("body").on("mouseleave", ".auto-advance", function () {
        autoAdvanceCarousel();
    });

    function autoAdvanceCarousel() {
        carouselTimer = setInterval(function () {
            $(".auto-advance").each(function () {
                if ($(this).hasClass("pager-circles")) {
                    var container = $(this).find(".container");
                    var next = $(this).find(".paging-circle.selected").next();

                    if (next.length) {
                        next.click();
                    } else {
                        if (supportsTransitions()) {
                            container.stop().css({
                                WebkitTransition: 'left 0s linear',
                                MozTransition: 'left 0s linear',
                                MsTransition: 'left 0s linear',
                                OTransition: 'left 0s linear',
                                transition: 'left 0s linear'
                            });
                        }
                        container.css("left", "100%");
                        //container.find(".grid-container:first").before(container.find(".grid-container:last"));
                        container.stop().animate({ left: "0%" }, 600, function () {
                            //container.find(".grid-container:last").after(container.find(".grid-container:first"));
                            //container.css("left", "0%");
                        });

                        $(this).find(".paging-circle").removeClass("selected");
                        $(this).find(".paging-circle:first").addClass("selected");
                        //$(this).find(".paging-circle:first").click();

                    }

                    //                    if ($(this).hasClass("auto-advance")) {
                    //                        var container = $(this).find(".container");
                    //                        var pages = container.find(".grid-container").length;

                    //                        if (pages > 2) {
                    //                            var next = container.find("div.current").next("div");
                    //                            container.find("div.current").removeClass("current");
                    //                            next.addClass("current");
                    //                            var index = next.index();

                    //                            container.find(".grid-container:last").after(container.find(".grid-container:first"));
                    //                            leftVal = (-1 * 100 * (index - 1));
                    //                            container.css("left", "0%");

                    //                            container.stop().animate({ left: leftVal + "%" }, 600);

                    //                            
                    //                            var next = $(this).find(".paging-circle.selected").next();
                    //                            $(this).find(".paging-circle").removeClass("selected");

                    //                            if (next.length) {
                    //                                next.addClass("selected");
                    //                            } else {
                    //                                $(this).find(".paging-circle:first").addClass("selected");
                    //                            }
                    //                        }
                    //                    }
                } else {
                    $(this).find(".page-right-box").click();
                }
            });
        }, 10000);
    }

    //nav flydown code	
    $("body").on("click", "#nav .flydowns a", function (e) {
        if (!$(this).hasClass("selected")) {
            if (hoverOnEvent != "click") {
                $(this).trigger(hoverOnEvent);
            }
            e.preventDefault();
        }
    });

    $("body").on(hoverOnEvent, "#nav .flydowns a", function (e) {
        var target = $(this);

        if (hoverOnEvent != "click") {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                flydown(target);
                clearTimeout(timer);
                timer = null;
            }, 300);
        } else {
            flydown(target);
        }
    });

    $("body").on(hoverOffEvent, "#nav .flydowns, .browse-grid", function (e) {
        clearTimeout(timer);
        timer = null;
    });

    $("body").on("blur", "#searchInput, #lowRangeSearch, #highRangeSearch", function (e) {
        timer = setTimeout(function () {
            if ($("#advSearchDrops").is(":visible")) {
                if ($("#searchInput").hasClass("placeholder") && $("#lowRangeSearch").hasClass("placeholder") && $("#highRangeSearch").hasClass("placeholder") && $("#selectGEMSTONES").val() == "" && $("#selectMATERIALS").val() == "" && $("#selectCATEGORIES").val() == "") {
                    $("#sitesearch").fadeOut(200);
                    $("#sitesearch input#searchInput").addClass("placeholder");
                    $("#sitesearch input#searchInput").val($("#sitesearch input#searchInput").attr("data-placeholder"));
                }
            } else {
                if ($("#searchInput").hasClass("placeholder")) {
                    $("#sitesearch").fadeOut(200);
                    $("#sitesearch input#searchInput").addClass("placeholder");
                    $("#sitesearch input#searchInput").val($("#sitesearch input#searchInput").attr("data-placeholder"));
                }
            }

            $("a.search").removeClass("selected");
            clearTimeout(timer);
            timer = null;
        }, 1250);
    });

    $("body").on(hoverOffEvent, "#nav", function (e) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        if ($("#flydown").is(":visible")) {
            timer = setTimeout(function () {
                $("#flydown").fadeOut(300);
                $("#nav .flydowns a").removeClass("selected");
                clearTimeout(timer);
                timer = null;
            }, 3000);
        }

        if ($("#saved").is(":visible")) {
            timer = setTimeout(function () {
                $("#saved").fadeOut(300);
                $(".open-bag, .open-saved, .open-rings").removeClass("selected");
                $("#inlineLoading").show();
                $("#inlineContent").hide();
                clearTimeout(timer);
                timer = null;
            }, 3000);
        }

        if ($(".searchbar").is(":visible")) {
            timer = setTimeout(function () {
                if ($("#advSearchDrops").is(":visible")) {
                    if ($("#searchInput").hasClass("placeholder") && $("#lowRangeSearch").hasClass("placeholder") && $("#highRangeSearch").hasClass("placeholder") && $("#selectGEMSTONES").val() == "" && $("#selectMATERIALS").val() == "" && $("#selectCATEGORIES").val() == "") {
                        $("#searchInput").blur();
                        $("#sitesearch").fadeOut(200);
                        $("#sitesearch input#searchInput").addClass("placeholder");
                        $("#sitesearch input#searchInput").val($("#sitesearch input#searchInput").attr("data-placeholder"));
                    }
                } else {
                    if ($("#searchInput").hasClass("placeholder")) {
                        $("#searchInput").blur();
                        $("#sitesearch").fadeOut(200);
                        $("#sitesearch input#searchInput").addClass("placeholder");
                        $("#sitesearch input#searchInput").val($("#sitesearch input#searchInput").attr("data-placeholder"));
                    }
                }
                $("#storesearch").fadeOut(200);
                $("#storesearch input").addClass("placeholder");
                $("#storesearch input").val($("#storesearch input").attr("data-placeholder"));

                $("a.search").removeClass("selected");
                clearTimeout(timer);
                timer = null;
            }, 1250);
        }
    });

    $("body").on(hoverOnEvent, "#flydown, #saved", function (e) {
        clearTimeout(timer);
        timer = null;
    });

    $("body").on(hoverOffEvent, "#flydown", function (e) {
        if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == e.originalEvent.MSPOINTER_TYPE_MOUSE)) {
            if (!$(e.relatedTarget).parents("#flydown").length) {
                $("#flydown").fadeOut(300);
                $("#nav .flydowns a").removeClass("selected");
            }
        }
    });

    $("body").on("click", "#flydown .close", function (e) {
        $("#flydown").fadeOut(300);
        $("#nav .flydowns a").removeClass("selected");
        return false;
    });

    $('html').on('touchstart', function (e) {
        if ($(e.target) != $("#flydown") && !$(e.target).parents("#flydown").length && !$(e.target).parents(".flydowns").length) {
            $('#flydown').fadeOut();
            $("#nav .flydowns a").removeClass("selected");
        }

        if (!$(e.target).hasClass("rollbar") && !$(e.target).parents(".rollbar").length) {
            $('.custom-drop .rollbar').hide();
        }

        if (!$(e.target).hasClass("searchbar") && !$(e.target).parents(".searchbar").length) {
            $('#sitesearch, #storesearch').hide();
        }
    });

    //flydown swipe
    var start;
    var end;
    var left;

    $("body").on(window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart", "#flydown", function (e) {
        if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == e.originalEvent.MSPOINTER_TYPE_TOUCH)) {
            //start = e.originalEvent.targetTouches[0].pageX;
            start = e.originalEvent.pageX || e.originalEvent.targetTouches[0].pageX;
            end = start;
            var index = $("#nav .flydowns a.selected").index();
            left = -1 * 100 * index;
        }
    });

    $("body").on(window.navigator.msPointerEnabled ? "MSPointerMove" : "touchmove", "#flydown", function (e) {

        if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == e.originalEvent.MSPOINTER_TYPE_TOUCH)) {
            //end = e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
            end = e.originalEvent.pageX || e.originalEvent.targetTouches[0].pageX;

            if (end > (start + 20) || end < (start - 20)) {
                e.preventDefault();

                var width = $("#flydown #container div:first").width();
                var moveVal = left + (((end - start) / width) * 100);
                var move = moveVal + "%";

                if (supportsTransitions()) {
                    $("#flydown #container").stop().css({
                        WebkitTransition: 'left 0s linear',
                        MozTransition: 'left 0s linear',
                        MsTransition: 'left 0s linear',
                        OTransition: 'left 0s linear',
                        transition: 'left 0s linear'
                    });
                }

                $("#flydown #container").css("left", move);
            }
        }
    });

    $("body").on(window.navigator.msPointerEnabled ? "MSPointerUp" : "touchend", "#flydown", function (e) {
        if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == e.originalEvent.MSPOINTER_TYPE_TOUCH)) {
            if (end > (start + 50)) {
                var prev = $("#nav .flydowns a.selected").prev("#nav .flydowns a");
                if (prev.length == 0) {
                    //$("#nav .flydowns a:last").trigger('mouseenter');
                    flydown($("#nav .flydowns a:last"));
                } else {
                    //$("#nav .flydowns a.selected").prev().trigger('mouseenter');
                    flydown($("#nav .flydowns a.selected").prev());
                }
            } else if (end < (start - 50)) {
                var next = $("#nav .flydowns a.selected").next("#nav .flydowns a");
                if (next.length == 0) {
                    //$("#nav .flydowns a:first").trigger('mouseenter');
                    flydown($("#nav .flydowns a:first"));
                } else {
                    //$("#nav .flydowns a.selected").next().trigger('mouseenter');
                    flydown($("#nav .flydowns a.selected").next());
                }
            }
        }
    });

    //end nav flydown code


    // start reusable touch/slide pager
    var touchPagerStart;
    var touchPagerEnd;
    var touchPagerLeft;

    initTouchpager();

    $("body").on(window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart", ".touchpager", function (e) {
        if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == e.originalEvent.MSPOINTER_TYPE_TOUCH)) {
            //touchPagerStart = e.originalEvent.targetTouches[0].pageX;
            touchPagerStart = e.originalEvent.pageX || e.originalEvent.targetTouches[0].pageX;
            touchPagerEnd = touchPagerStart;
            var index = $(this).find(".container div.current").index();
            touchPagerLeft = -1 * 100 * index;
            if ($(this).hasClass("statement")) {
                touchPagerLeft = (-1 * 40 * index) + 30;
            } else if ($(this).hasClass("romance-tips")) {
                touchPagerLeft = (-1 * 40 * index) + 30;
            }
        }
    });

    $("body").on(window.navigator.msPointerEnabled ? "MSPointerMove" : "touchmove", ".touchpager", function (e) {
        var pages = $(this).find(".grid-container").length;
        if (pages > 1) {
            if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == e.originalEvent.MSPOINTER_TYPE_TOUCH)) {
                var container = $(this).find(".container");
                //touchPagerEnd = e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
                touchPagerEnd = e.originalEvent.pageX || e.originalEvent.targetTouches[0].pageX;

                if (touchPagerEnd > (touchPagerStart + 20) || touchPagerEnd < (touchPagerStart - 20)) {
                    e.preventDefault();

                    var pageWidth = container.find("div.current").width();
                    var moveVal = touchPagerLeft + (((touchPagerEnd - touchPagerStart) / pageWidth) * 100);
                    if ($(this).hasClass("statement")) {
                        moveVal = touchPagerLeft + (((touchPagerEnd - touchPagerStart) / (pageWidth * 2.5)) * 100);
                    } else if ($(this).hasClass("romance-tips")) {
                        moveVal = touchPagerLeft + (((touchPagerEnd - touchPagerStart) / (pageWidth * 2.5)) * 100);
                    }

                    if (supportsTransitions()) {
                        container.stop().css({
                            WebkitTransition: 'left 0s linear',
                            MozTransition: 'left 0s linear',
                            MsTransition: 'left 0s linear',
                            OTransition: 'left 0s linear',
                            transition: 'left 0s linear'
                        });
                    }

                    container.css("left", moveVal + "%");
                }
            }
        }
    });

    $("body").on(window.navigator.msPointerEnabled ? "MSPointerUp" : "touchend", ".touchpager", function (e) {
        if (!window.navigator.msPointerEnabled || (window.navigator.msPointerEnabled && e.originalEvent.pointerType == e.originalEvent.MSPOINTER_TYPE_TOUCH)) {
            var touchPager = $(this);
            var container = $(this).find(".container");
            var pages = container.find(".grid-container").length;
            var index;
            var nextPage = 0;
            var direction = "";

            if (touchPagerEnd > (touchPagerStart + 50)) {
                var direction = "left";
                var prev = container.find("div.current").prev("div");

                if (prev.length > 0) {
                    nextPage = 1;
                    container.find("div.current").removeClass("current");
                    prev.addClass("current");
                    index = prev.index();
                    var childNum = index + 1;

                    if (childNum == 1) {
                        $(this).find(".page-left-box span").hide();
                    }
                    $(this).find(".page-right-box span").show();

                    if ($(this).hasClass("pager-circles")) {
                        $(this).find(".paging-circle.selected").removeClass("selected").prev().addClass("selected");
                    } else {
                        $(this).find(".currentPage").html(childNum);
                    }
                } else {
                    nextPage = 0;
                    index = container.find("div.current").index();
                }
                TrackMobileCarousel("left");

            } else if (touchPagerEnd < (touchPagerStart - 50)) {
                var direction = "right";
                var next = container.find("div.current").next("div");

                if (next.length > 0) {
                    nextPage = 1;
                    container.find("div.current").removeClass("current");
                    next.addClass("current");

                    index = next.index();
                    var childNum = index + 1;

                    if (childNum == pages) {
                        $(this).find(".page-right-box span").hide();
                    }
                    $(this).find(".page-left-box span").show();

                    if ($(this).hasClass("pager-circles")) {
                        $(this).find(".paging-circle.selected").removeClass("selected").next().addClass("selected");
                    } else {
                        $(this).find(".currentPage").html(childNum);
                    }

                } else {
                    nextPage = 0;
                    index = container.find("div.current").index();
                }
                TrackMobileCarousel("right");

            } else {
                index = container.find("div.current").index();
            }

            var leftVal = -1 * 100 * index;
            var itemText1;
            var itemText2;
            var itemDetails;
            if ($(this).hasClass("statement")) {
                leftVal = (-1 * 40 * index) + 30;
                if (nextPage > 0) {
                    $("#statement-details").animate({ opacity: 0 }, 200);
                    itemText1 = container.find("div.current").find("img").attr("data-collection");
                    itemText2 = container.find("div.current").find("img").attr("data-itemname");
                    itemDetails = container.find("div.current").find("img").attr("data-href");
                }
            } else if ($(this).hasClass("romance-tips")) {
                leftVal = (-1 * 40 * index) + 30;

                if (pages > 4 && direction != "") {
                    if (direction == "left") {
                        container.find(".grid-container:first").before(container.find(".grid-container:last"));
                        leftVal = (-1 * 40 * (index + 1)) + 30;
                        container.css("left", "-90%");
                    } else {
                        container.find(".grid-container:last").after(container.find(".grid-container:first"));
                        leftVal = (-1 * 40 * (index - 1)) + 30;
                        container.css("left", "-10%");
                    }

                }
            }

            if (supportsTransitions() && !touchPager.hasClass("romance-tips")) {
                container.stop().css({
                    left: leftVal + "%",
                    WebkitTransition: 'left 200ms linear',
                    MozTransition: 'left 200ms linear',
                    MsTransition: 'left 200ms linear',
                    OTransition: 'left 200ms linear',
                    transition: 'left 200ms linear'
                });

                if (nextPage > 0) {
                    setTimeout(function () {
                        var loadnext = container.find("div.current").next("div").next("div");
                        if (loadnext.length > 0) {
                            loadnext.find("img").each(function () {
                                $(this).attr("src", $(this).attr("data-src"));
                            });
                            if (typeof preloadImages == 'function') {
                                preloadImages(touchPager.attr("id"));
                            }
                        }
                    }, 200);
                }
            } else {
                container.stop().animate({ left: leftVal + "%" }, 200, function () {
                    if (nextPage > 0) {
                        var loadnext = container.find("div.current").next("div").next("div");
                        if (loadnext.length > 0) {
                            loadnext.find("img").each(function () {
                                $(this).attr("src", $(this).attr("data-src"));
                            });
                            if (typeof preloadImages == 'function') {
                                preloadImages(touchPager.attr("id"));
                            }
                        }
                    }
                });
            }

            if (nextPage > 0 && touchPager.hasClass("statement")) {
                var model = StateModel.getInstance();
                var hash = window.location.hash.split("#").join("");
                if (hash == "") {
                    hash = URLFactory.convertStateToHash(StateModel.getInstance().getStateSnapshot());
                }

                var stateSnapshot = model.getStateSnapshot();

                if (hash != "") {
                    stateSnapshot = URLFactory.convertHashToState(hash);
                }
                else if (searchParams != "") {
                    stateSnapshot = URLFactory.convertHashToState(searchParams);
                }
                var page = stateSnapshot.flash;
                if (!page) { page = 1; }
                if (direction == "right") {
                    page++;
                } else {
                    page--;
                }

                hash = URLFactory.updateHash(hash, "flash", page);

                if (e.hasOwnProperty('originalEvent')) {
                    window.location.replace("#" + hash);
                    HistoryManager.getInstance().overrideBaseState(hash);

                    $(".touchpager a").each(function () {
                        var href = $(this).attr("href").split("&search_params=");
                        var newHref = href[0] + "&search_params=" + hash;
                        $(this).attr("href", newHref);
                    });
                }

                var newhash = window.location.hash;
                newhash = newhash.replace("#", "");
                setTimeout(function () {
                    $("#itemText1").html(itemText1);
                    $("#itemText2").html(itemText2);
                    $("#itemDetails").attr("href", itemDetails + newhash);
                    $("#statement-details").animate({ opacity: 1 }, 400);
                }, 200);
            }
        }
    });

    $("body").on("click", ".touchpager.pager-circles .paging-circle.selected", function (e) {
        return false;
    });

    $("body").on("click", ".touchpager.pager-circles .paging-circle:not('.selected')", function (e) {
        var touchPager = $(this).parents(".touchpager");
        var container = touchPager.find(".container");
        var index = $(this).index();

        $(this).addClass("selected").siblings().removeClass("selected");

        var leftVal = -1 * 100 * index;
        if (supportsTransitions()) {
            container.stop().css({
                left: leftVal + "%",
                WebkitTransition: 'left 600ms linear',
                MozTransition: 'left 600ms linear',
                MsTransition: 'left 600ms linear',
                OTransition: 'left 600ms linear',
                transition: 'left 600ms linear'
            });
        } else {
            container.stop().animate({ left: leftVal + "%" }, 600);
        }
        if (touchPager.hasClass("statement")) {
            setTimeout(function () {
                $("#itemText1").html(itemText1);
                $("#itemText2").html(itemText2);
                $("#itemDetails").attr("href", itemDetails);
                $("#statement-details").animate({ opacity: 1 }, 400);
            }, 600);
        }

        TrackCarouselClick($("title").length > 0 ? $("title").text() : "Unknown", typeof touchPager.attr("data-carousel-name") != "undefined" ? touchPager.attr("data-carousel-name") : "pagerCircles", index + 1);

        return false;
    });

    $("body").on("click", ".touchpager .saved-left, .touchpager .page-left-box", function (e) {
        var touchPager = $(this).parents(".touchpager");
        var container = touchPager.find(".container");
        var pages = container.find(".grid-container").length;

        var prev = container.find("div.current").prev("div");

        if (prev.length > 0) {
            container.find("div.current").removeClass("current");
            prev.addClass("current");
            var index = prev.index();
            var childNum = index + 1;
            touchPager.find(".currentPage").html(childNum);

            if (childNum == 1 && !touchPager.hasClass("romance-tips")) {
                $(this).find("span").hide();
            }
            touchPager.find(".page-right-box span").show();

            var leftVal = -1 * 100 * index;
            if (touchPager.hasClass("statement")) {
                leftVal = (-1 * 40 * index) + 30;
                $("#statement-details").animate({ opacity: 0 }, 200);
                var itemText1 = prev.find("img").attr("data-collection");
                var itemText2 = prev.find("img").attr("data-itemname");
                var itemDetails = prev.find("img").attr("data-href");
            } else if (touchPager.hasClass("romance-tips")) {
                leftVal = (-1 * 40 * index) + 30;

                if (pages > 4) {
                    container.find(".grid-container:first").before(container.find(".grid-container:last"));
                    leftVal = (-1 * 40 * (index + 1)) + 30;
                    container.css("left", "-90%");
                }
            }

            if (supportsTransitions() && !touchPager.hasClass("romance-tips")) {
                container.stop().css({
                    left: leftVal + "%",
                    WebkitTransition: 'left 600ms linear',
                    MozTransition: 'left 600ms linear',
                    MsTransition: 'left 600ms linear',
                    OTransition: 'left 600ms linear',
                    transition: 'left 600ms linear'
                });
            } else {
                container.stop().animate({ left: leftVal + "%" }, 600);
            }
            if (touchPager.hasClass("statement")) {
                var hash = window.location.hash;
                hash = hash.replace("#", "");
                setTimeout(function () {
                    $("#itemText1").html(itemText1);
                    $("#itemText2").html(itemText2);
                    $("#itemDetails").attr("href", itemDetails + hash);
                    $("#statement-details").animate({ opacity: 1 }, 400);
                }, 600);
            }
            TrackCarouselClick($("title").length > 0 ? $("title").text() : "Unknown", typeof touchPager.attr("data-carousel-name") != "undefined" ? touchPager.attr("data-carousel-name") : "standardCarousel", index + 1);
        }

        return false;
    });

    $("body").on("click", ".touchpager .saved-right, .touchpager .page-right-box", function (e) {
        var touchPager = $(this).parents(".touchpager");
        var container = touchPager.find(".container");
        var pages = container.find(".grid-container").length;

        var next = container.find("div.current").next("div");

        if (next.length > 0) {
            container.find("div.current").removeClass("current");
            next.addClass("current");

            var index = next.index();
            var childNum = index + 1;
            touchPager.find(".currentPage").html(childNum);

            if (childNum == pages && !touchPager.hasClass("romance-tips")) {
                $(this).children("span").hide();
            }
            touchPager.find(".page-left-box span").show();

            var leftVal = -1 * 100 * index;
            if (touchPager.hasClass("statement")) {
                leftVal = (-1 * 40 * index) + 30;
                $("#statement-details").animate({ opacity: 0 }, 200);
                var itemText1 = next.find("img").attr("data-collection");
                var itemText2 = next.find("img").attr("data-itemname");
                var itemDetails = next.find("img").attr("data-href");
            } else if (touchPager.hasClass("romance-tips")) {
                leftVal = (-1 * 40 * index) + 30;

                if (pages > 4) {
                    container.find(".grid-container:last").after(container.find(".grid-container:first"));
                    leftVal = (-1 * 40 * (index - 1)) + 30;
                    container.css("left", "-10%");
                }
            }

            if (supportsTransitions() && !touchPager.hasClass("romance-tips")) {
                container.stop().css({
                    left: leftVal + "%",
                    WebkitTransition: 'left 600ms linear',
                    MozTransition: 'left 600ms linear',
                    MsTransition: 'left 600ms linear',
                    OTransition: 'left 600ms linear',
                    transition: 'left 600ms linear'
                });

                var loadnext = container.find("div.current").next("div").next("div");
                if (loadnext.length > 0) {
                    loadNextPage(loadnext);
                }
            } else {
                container.stop().animate({ left: leftVal + "%" }, 600, function () {
                    var loadnext = container.find("div.current").next("div").next("div");
                    if (loadnext.length > 0) {
                        loadnext.find("img").each(function () {
                            $(this).attr("src", $(this).attr("data-src"));
                        });
                        if (typeof preloadImages == 'function') {
                            preloadImages(touchPager.attr("id"));
                        }
                    }
                });
            }

            if (touchPager.hasClass("statement")) {
                var hash = window.location.hash;
                hash = hash.replace("#", "");
                setTimeout(function () {
                    $("#itemText1").html(itemText1);
                    $("#itemText2").html(itemText2);
                    $("#itemDetails").attr("href", itemDetails + hash);
                    $("#statement-details").animate({ opacity: 1 }, 400);
                }, 600);
            }
            TrackCarouselClick($("title").length > 0 ? $("title").text() : "Unknown", typeof touchPager.attr("data-carousel-name") != "undefined" ? touchPager.attr("data-carousel-name") : "standardCarousel", index + 1);
        }

        return false;
    });

    // end reusable touch/slide pager
}

function initTouchpager(targetTouchpager, startlastpage) {
    var touchpagers;
    if (targetTouchpager) {
        touchpagers = $(targetTouchpager);
    } else {
        touchpagers = $(".touchpager");
    }
    touchpagers.each(function () {
        var container = $(this).find(".container");
        var pages = container.children(".grid-container").length;

        if (pages > 0) {
            var containerWidth = pages * 100;
            container.find(".grid-container:first").addClass("current");
            var pageWidth = 100 / pages;

            if ($(this).hasClass("statement")) {
                containerWidth = containerWidth / 2.5;
                //                var pagePadding = 0.01;
                //                pageWidth = pageWidth - (pagePadding * 2);
                //                container.find(".grid-container").css("padding", "0 " + pagePadding + "%");
                container.css("left", "30%");
                var itemText1 = container.find(".current").find("img").attr("data-collection");
                var itemText2 = container.find(".current").find("img").attr("data-itemname");
                var itemDetails = container.find(".current").find("img").attr("data-href");
                $("#itemText1").html(itemText1);
                $("#itemText2").html(itemText2);
                $("#itemDetails").attr("href", itemDetails);
            } else if ($(this).hasClass("romance-tips")) {
                containerWidth = containerWidth / 2.5;

                if (pages > 4) {
                    $(this).find(".grid-container:first").before($(this).find(".grid-container:last"));
                    $(this).find(".grid-container:first").before($(this).find(".grid-container:last"));
                    container.css("left", "-50%");
                } else {
                    container.css("left", "30%");
                }
            }

            container.css("width", containerWidth + "%");            

            if ($("body").hasClass("ie") || $("body").hasClass("firefox")) {
                var width = Math.ceil(container.width());
                itemWidth = Math.floor(width / pages);

                container.children(".grid-container").css("width", itemWidth + "px");
            } else {
                container.children(".grid-container").css("width", pageWidth + "%");
            }

            if ($(this).hasClass("pager-circles")) {
                $(this).find(".paging").html("");
                if (pages > 1) {
                    for (var i = 0; i < pages; i++) {
                        //Aug-31  shamin    added Tracking Codes for Carousel Paging
                        $(this).find(".paging").prepend('<a href="#" class="paging-circle" name="' + (pages - i) + '" onclick="TrackCarouselClick($(this).parent().prev().children().eq(0).text(), $(this).parent().prev().children().eq(1).text(), this.name);"></a>');
                    }
                }
                $(this).find(".paging-circle:first").addClass("selected");
            } else {
                $(this).find(".totalPages").html(pages);
                $(this).find(".currentPage").html("1");
            }

            if (startlastpage) {
                $(this).find(".page-right-box span").hide();

                if (pages > 1) {
                    $(this).find(".page-left-box span").show();
                }
            } else {
                $(this).find(".page-left-box span, .page-right-box span").hide();

                if (pages > 1) {
                    $(this).find(".page-right-box span").show();
                }

                if ($(this).hasClass("romance-tips") && pages > 4) {
                    $(this).find(".page-left-box span, .page-right-box span").show();
                }
            }

            if (!$(this).hasClass("romance-tips") && !$(this).hasClass("statement")) {
                $(this).find(".paging").fadeIn();
            }
        }
    });
}

function loadNextPage(page) {
    var touchPagerID = page.parents(".touchpager").attr("id");

    setTimeout(function () {
        page.find("img").each(function () {
            $(this).attr("src", $(this).attr("data-src"));
        });
        if (typeof preloadImages == 'function') {
            preloadImages(touchPagerID);
        }        
    }, 600);
}

/* End of GlobalMenuManager.js */
﻿// MarketingTileLayoutManager.js
function MarketingTileLayoutManager()
{
	this.pInstance = null;

}

MarketingTileLayoutManager.getInstance = function ()
{
	if (!this.pInstance)
	{
		this.pInstance = new MarketingTileLayoutManager();
	}
	return this.pInstance;
};

MarketingTileLayoutManager.prototype.draw = function (tileDataArray)
{
	var i, n;
	var tileHandle;

	if (typeof (tileDataArray) != "undefined" && tileDataArray != null)
	{
		for (i = 0, n = tileDataArray.length; i < n; i++)
		{
			tileHandle = $(tileDataArray[i].id);
		}
	}
}

/* End of MarketingTileLayoutManager.js */
﻿// ----------------------------------------------
// File:		MassFadeEffect.js
// Author:		Nathan Derksen
// Description:	Manages image fade transitions amongst a number of images
// Example:
// massFadeInstance.addTarget("imageId", 20);
// ----------------------------------------------


// Global variable made available for convenience. Not done through a singleton due to performance optimization.
// This is a optimization sensitive grouping of code.
var massFadeInstance;

// ----------------------------------------------
// Function:	MassFadeEffect()
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
function MassFadeEffect()
{
	this.objectList = new Array();
	this.isRunning = false;
}
MassFadeEffect.fadeCompleteHandler = null;
// ----------------------------------------------
// Function:	addTarget()
// Author:		Nathan Derksen
// Description:	Indicate an image that is to be given a fade transition
// Inputs:		<String> targetId - The ID of the image to fade
//				<Number> rate - The number of percentage points to modify the fade for each animation interval. 
//						Positive values are for fade in, negative values are for fade out
// Returns:		<Nothing>
// ----------------------------------------------
MassFadeEffect.prototype.addTarget = function(targetId, rate)
{
	var targetElement = document.getElementById(targetId);
	if (rate)
	{
		if (rate == 0 || rate == null || rate == "")
		{
			rate = 20;
		}
	}
	else
	{
		rate = 20;
	}
	
	if (targetElement)
	{
		targetElement.style.visibility = "visible";
		if (rate < 0)
		{
			this.objectList[targetId] = {handle:targetElement, opacity:100+rate, rate:rate};
			setOpacity(targetElement, 100+rate);
		}
		else
		{
			this.objectList[targetId] = {handle:targetElement, opacity:0+rate, rate:rate};
			setOpacity(targetElement, 0+rate);
		}

		if (this.isRunning == false)
		{
			this.isRunning = true;
			setTimeout("updateOpacities()", 50);
		}
	}
};


// ----------------------------------------------
// Function:	updateOpacities()
// Author:		Nathan Derksen
// Description:	Change the opacities of each image in the list of images to transition according to its current and target opacities.
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
function updateOpacities() 
{
	var itemArray = massFadeInstance.objectList;
	var itemHandle;
	var itemFound = false;
	
	for (var item in itemArray)
	{
		itemFound = true;
		itemHandle = itemArray[item];
		
		if (itemHandle.rate > 0 && itemHandle.opacity >= 100)
		{
			setOpacity(itemHandle.handle, 100);
			delete massFadeInstance.objectList[item];
		}
		else if (itemHandle.rate < 0 && itemHandle.opacity <= 0)
		{
			setOpacity(itemHandle.handle, 0);
			delete massFadeInstance.objectList[item];
		}
		else
		{
			setOpacity(itemHandle.handle, itemHandle.opacity);
			itemHandle.opacity += itemHandle.rate;
		}
	}

	if (itemFound == true)
	{
		setTimeout("updateOpacities()", 50);
	}
	else
	{
		massFadeInstance.isRunning = false;
		if (MassFadeEffect.fadeCompleteHandler) {
			MassFadeEffect.fadeCompleteHandler();
		}
	}
};



// ----------------------------------------------
// Function:	setOpacity()
// Author:		Nathan Derksen
// Description:	Change the opacity of a particular image
// Inputs:		<Element> sourceObj - The object to modify
//				<Number> number - The new opacity number
// Returns:		<Nothing>
// ----------------------------------------------
function setOpacity(sourceObj, opacity) 
{
	opacity = (opacity == 100)?99.999:opacity;

	// IE/Win
	if (opacity < 99.999)
	{
		sourceObj.style.filter = "alpha(opacity:"+opacity+")";
	}
	else
	{
		sourceObj.style.filter = "";
	}

	// Safari<1.2, Konqueror
	sourceObj.style.KHTMLOpacity = opacity/100;

	// Older Mozilla and Firefox
	sourceObj.style.MozOpacity = opacity/100;

	// Safari 1.2, newer Firefox and Mozilla, CSS3
	sourceObj.style.opacity = opacity/100;
};

function revealImage(id)
{
	//sometimes this will fire BEFORE we add the element to the DOM, so delay it a smidge
	setTimeout(function () {
		massFadeInstance.addTarget(id);
	}, 10);
}

// Initialize the fade manager.
massFadeInstance = new MassFadeEffect();

/* End of MassFadeEffect.js */
﻿// OverlayManager.js, for creating and managing UI overlays
// Currently, it assumes that the modal content exists in the page DOM

function OverlayManager() {
	this.pInstance = null;
	this.initialScrollPosition = null;
}

OverlayManager.getInstance = function () {
	if (!this.pInstance) 	{
		this.pInstance = new OverlayManager();
	}
	return this.pInstance;
};

var deeplink;

OverlayManager.prototype.init = function () {
	var hoverOnEvent;
	var parent = this;

	if ('ontouchstart' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
		hoverOnEvent = "click";
	} else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOnEvent = "MSPointerOver";
        } else {
            hoverOnEvent = "pointerover";
        }
	} else {
		hoverOnEvent = "mouseenter";
	}

	var hoverOffEvent;
	if ('ontouchend' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
		hoverOffEvent = "mouseleave";
	} else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOffEvent = "MSPointerOut";
        } else {
            hoverOffEvent = "pointerout";
        }
	} else {
		hoverOffEvent = "mouseleave";
	}

	var parent = this;

	//modals
	$("body").on("click", ".open-modal", function () {
		var id = $(this).attr("id");
		deeplink = $(this).attr('href').split('#')[1];

		if (typeof (id) != "undefined" && id != null && id != "") {
			parent.open(id);
		}

		return false;
	});

	$("body").on("click touchstart", ".modal-popup .close, .btn.cancel, #gray-overlay", function () {
		parent.close();

		return false;
	});

	$(HistoryManager.getInstance()).bind("historyChanged", function (e, data) {
		var overlayId = data.state.popup;
		if (overlayId == "") {
			if ($(".modal-popup").css("display") != "none") {
				// Don't close an already closed overlay
				parent.close(null, true);
			}
		}
		else {
			parent.open(overlayId, null, true);
		}
	});

	// Open an overlay if the overlay value in the page hash has been set.
	var storyId;
	var hashOverlayValue = URLFactory.extractValue(window.location.hash.split("#").join(""), "popup");
	if (hashOverlayValue != null && hashOverlayValue != "") {
		if (hashOverlayValue.indexOf("storyText") == 0) {
			// Override for WMLT stories, overlay needs to be able to be opened without the link being present
			storyId = hashOverlayValue.split("storyText").join("");
			if (ValidationHelper.isValidNumber(storyId) == true) {
				OverlayManager.getInstance().open(hashOverlayValue, {
					url: "/WorldOfTiffany/WMLT/Stories/Text.aspx?ContentLinkID=" + storyId,
					size: "full",
					iframe: false,
					position: "top"
				});
			}
		}
		else if (hashOverlayValue.indexOf("storyVideo") == 0) {
			// Override for WMLT stories, overlay needs to be able to be opened without the link being present
			storyId = hashOverlayValue.split("storyVideo").join("");
			if (ValidationHelper.isValidNumber(storyId) == true) {
				OverlayManager.getInstance().open(hashOverlayValue, {
					url: "/Video/VideoOverlay.aspx?config=/WorldOfTiffany/WMLT/Stories/StoryData.aspx?contentLinkID=" + storyId,
					size: "full",
					iframe: true,
					position: "top"
				});
			}
		}
		else {
			this.open(hashOverlayValue);
		}
	}
}

OverlayManager.prototype.open = function (handleOrName, overrides, suppressHistory) {

	var hash = window.location.hash.split("#").join("");
	var query = "";

	suppressHistory = (typeof(suppressHistory) == "undefined") ? false : suppressHistory;

	if (hash == "") {
		hash = URLFactory.convertStateToHash(StateModel.getInstance().getStateSnapshot());
	}

	var props = {
		url: "",
		size: "",
		iframe: true,
		position: "",
		bgstyle: "",
		height: "auto"
	}

	this.initialScrollPosition = $(window).scrollTop();

	if (typeof (handleOrName) == "string") {

		if (typeof ($("#" + handleOrName).attr("href")) != "undefined") {
			props.url = $("#" + handleOrName).attr("href");
		}
		if (typeof ($("#" + handleOrName).attr("data-iframe")) != "undefined") {
			props.iframe = ($("#" + handleOrName).attr("data-iframe").toLowerCase() == "true") ? true : false;
		}
		if (typeof ($("#" + handleOrName).attr("data-size")) != "undefined") {
			props.size = $("#" + handleOrName).attr("data-size");
		}
		if (typeof ($("#" + handleOrName).attr("data-position")) != "undefined") {
			props.position = $("#" + handleOrName).attr("data-position");
		}
		if (typeof ($("#" + handleOrName).attr("data-bgstyle")) != "undefined") {
			props.bgstyle = $("#" + handleOrName).attr("data-bgstyle");
		}
		if (typeof ($("#" + handleOrName).attr("data-height")) != "undefined") {
			props.height = $("#" + handleOrName).attr("data-height");
		}

		this.close(null, true); // Make sure to destroy the previous overlay if one is already open

		if (typeof (overrides) != "undefined" && overrides != null) {
			$.extend(props, overrides);
		}

		// Exception for WMLT Stories
		if (props.url.toLowerCase().indexOf("text.aspx") > -1 && props.url.toLowerCase().indexOf("contentlinkid") > -1) {
			query = props.url.split("?").join("&")
			handleOrName = "storyText" + URLFactory.extractQueryStringValue(query, "ContentLinkID");
		}
		else if (props.url.toLowerCase().indexOf("storydata.aspx") > -1 && props.url.toLowerCase().indexOf("contentlinkid") > -1) {
			query = props.url.split("?").join("&")
			handleOrName = "storyVideo" + URLFactory.extractQueryStringValue(query, "ContentLinkID");
		}

    if (suppressHistory == false) {
        if (hash.indexOf("-pu+") == -1) {
            // Hash contains a page anchor instead of valid state data, clear out the old anchor
            // Create a new state object and convert that to a hash to get base state data: p+1-n+1000-c+-s+-r+-t+-ni+1-x+-pu+-f+-lr+-hr+-ri+
            hash = URLFactory.convertStateToHash(new StateSnapshotVO());
        }
			hash = URLFactory.updateHash(hash, "popup", handleOrName);
			window.location.hash = hash;
			HistoryManager.getInstance().addHistoryItem(hash);
		}

		//inject an iframe into the modal if needed
		if (props.iframe) {
			if (isIPad()) {
				$('meta[name="viewport"]').attr('content', 'width=1024px');
			}
			$("html").addClass('hasIframe');
			$(".modal-popup .content").html("<iframe frameBorder='0'></iframe>").attr("id", "overlayiframe");
			$(".modal-popup .content iframe").html("");
			if (props.height.toLowerCase() != "auto" && props.height != "") {
				$(".modal-popup").css("min-height", props.height + "px");
			}
			$(".modal-popup .content iframe").load(function () {
				if (props.height == "auto" || props.height == "") {
					$(".modal-popup .content").css("height", "auto").removeClass("rollbar"); ;
				}
				else {
					$(".modal-popup .content").css("height", props.height + "px").addClass("rollbar"); ;
				}
				initRollbar();
				try {
				    $('a[rel="' + deeplink + '"]', $(".modal-popup .content iframe").contents()).click();
				} catch (e) {
				    // this is a crossdomain iframe
				}
			}).attr("src", props.url);
		} else {
			if (props.height.toLowerCase() != "auto" && props.height != "") {
				$(".modal-popup").css("min-height", props.height + "px");
			}
			$(".modal-popup .content").html("");
			$(".modal-popup .content").load(props.url, function () {
				if (props.height.toLowerCase() == "auto" || props.height == "") {
					$(".modal-popup .content").css("height", "auto").removeClass("rollbar");
				}
				else {
					$(".modal-popup .content").css("height", props.height + "px").addClass("rollbar");
				}
				globalAjaxCallback();
				$('a[rel="' + deeplink + '"]').click();
				// Exception for WMLT stories - once text page loads, check to see if story type has been changed to video.
				if (props.url.toLowerCase().indexOf("text.aspx") > -1 && props.url.toLowerCase().indexOf("contentlinkid") > -1) {
					if ($("#storyType").val() == "video") {
						OverlayManager.getInstance().open("storyVideo" + $("#contentLinkId").val(), {
							url: '/Video/VideoOverlay.aspx?config=/WorldOfTiffany/WMLT/Stories/StoryData.aspx?contentLinkID=' + $("#contentLinkId").val(),
							size: "full",
							iframe: true,
							position: "top"
						});
					}
				}
			});
		}

		var topValue;
		if (props.position == "top") {
			topValue = 0;
		} else {
			topValue = 110;
		}

		//style and show the modal
		$(".modal-popup").attr("class", "modal-popup").addClass(props.size).addClass(props.bgstyle).css("top", this.initialScrollPosition + topValue + "px").show();
	}
	else {
		handleOrName.show();
	}
	$("#gray-overlay").show();

	//$(window).scrollTop(0);
};

OverlayManager.prototype.close = function (handle, suppressHistory) {
	if (typeof (handle) != "undefined" && handle != null) {
		handle.hide();
	}

	suppressHistory = (typeof(suppressHistory) == "undefined") ? false : suppressHistory;

	$("html").removeClass("hasIframe");
	var hash = "";
	if ($("body").hasClass("modal-frame")) {
        try {
	        hash = window.parent.location.hash.split("#").join("");
		} catch(e) {
			// this fails when trying to close from cross domain
			sendParentMessage("closePopup");
			return;
		}
		if (hash != "") {
			// Setting the hash to blank when it already is blank will result in IE popping the page to the top, so don't do it
		    if (suppressHistory == false) {
		        if (hash.indexOf("-pu+") == -1) {
		            // Hash contains a page anchor instead of valid state data, clear out the old anchor
		            // Create a new state object and convert that to a hash to get base state data: p+1-n+1000-c+-s+-r+-t+-ni+1-x+-pu+-f+-lr+-hr+-ri+
		            hash = URLFactory.convertStateToHash(new StateSnapshotVO());
		        }
				hash = URLFactory.updateHash(hash, "popup", "");
				window.parent.location.hash = hash;
				window.parent.HistoryManager.getInstance().addHistoryItem(hash);
			}
		}
		//window.parent.$(window).scrollTop(this.initialScrollPosition);
		window.parent.$(".modal-popup").attr("class", "modal-popup").hide();
		window.parent.$("#gray-overlay, .image-overlay").hide();
		// mobile safari crashes if you replace the iframe before the script is done running.  Hiding the iframe instead
		window.parent.$(".modal-popup .content").append('<img class="loading" src="/shared/images/loading.gif" />');
		window.parent.$(".modal-popup iframe").attr("src", "").hide();
	} else {
		$(".modal-popup").attr("class", "modal-popup").hide();
		$(".modal-popup .content").html('<img class="loading" src="/shared/images/loading.gif" />');
		$("#gray-overlay, .image-overlay").hide();
		hash = window.location.hash.split("#").join("");
		if (hash != "") {
			// Setting the hash to blank when it already is blank will result in IE popping the page to the top, so don't do it
		    if (suppressHistory == false) {
		        if (hash.indexOf("-pu+") == -1) {
		            // Hash contains a page anchor instead of valid state data, clear out the old anchor
		            // Create a new state object and convert that to a hash to get base state data: p+1-n+1000-c+-s+-r+-t+-ni+1-x+-pu+-f+-lr+-hr+-ri+
		            hash = URLFactory.convertStateToHash(new StateSnapshotVO());
		        }
				hash = URLFactory.updateHash(hash, "popup", "");
				window.location.hash = hash;
				HistoryManager.getInstance().addHistoryItem(hash);
			}
		}
		//$(window).scrollTop(this.initialScrollPosition);
	}
};

OverlayManager.prototype.resize = function (newHeight) {
	if ($(".modal-popup .content iframe").length > 0) {
		$(".modal-popup .content iframe").css("height", parseInt(newHeight, 10) + 10 + 'px');
	}
	else {
		$(".modal-popup .content").css("height", parseInt(newHeight, 10) + 10 + 'px');
	}
};

/* End of OverlayManager.js */
/* SiteCatalyst code version: H.22.
Copyright 1997-2007 Omniture, Inc. More info available at
http://www.omniture.com */
/************************ ADDITIONAL FEATURES ************************
     Plugins
*/
/* Specify the Report Suite ID(s) to track here */

var s=s_gi(s_account,1)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="utf-8"
/* E-commerce Config */
//s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:,.,tiffany.com,tiffany.co.jp,tiffany.ca,tiffany.cn,tiffany.kr,tiffany.co.uk,tiffany.at,tiffany.fr,tiffany.de,tiffany.ie,tiffany.it,tiffany.es,tiffany.com.mx,tiffany.com.au"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"
/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {
	/* Add calls to plugins here */
	if(s.getQueryParam('omcid')){
		s.campaign=s.getQueryParam('omcid')
		s.campaign = s.cleanParams(s.campaign);
		s_campaign=s.campaign
	}
		
	if(s.campaign){
	    s.prop6 = s.campaign + " : " + s.pageName;
	    s.eVar42 = s.campaign + " : " + s.pageName;
        }
	else{
	    //s.prop6=s.pageName;
        }
		
	//Internal Campaigns
	
	if(s.getQueryParam('hppromo')){
		s.eVar3=s.getQueryParam('hppromo')
		s.eVar3 = s.cleanParams(s.eVar3);
		s_eVar3=s.eVar3
	}
	
	if (s.getQueryParam('lppromo')) {
	    s.eVar28 = s.getQueryParam('lppromo')
	    s.eVar28 = s.cleanParams(s.eVar28);
	    s_eVar28 = s.eVar28		
	}
		
	if(s.getQueryParam('cid')){
			s.eVar4=s.getQueryParam('cid')
			s.eVar4 = s.cleanParams(s.eVar4);
			s_eVar4=s.eVar4
	}
	if(s.getQueryParam('xlink')){
			s.eVar5=s.getQueryParam('xlink')
			s.eVar5 = s.cleanParams(s.eVar5);
			s_eVar5=s.eVar5
	}
	if(s.getQueryParam('IQ_ID')){
			s.eVar22=s.getQueryParam('IQ_ID')
			s.eVar22 = s.cleanParams(s.eVar22);
			s_eVar22=s.eVar22
	}		
	
	/*social Authors*/
	s.socialPlatforms('eVar61');
	
}
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin: getQueryParam 2.1 - return query string parameter(s)
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t)v+=v?d+t:t;p=p.subs"
+"tring(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

s.cleanParams = new Function ("v",""
+"var p = v;if(p.indexOf('#')>-1){i = p.indexOf('#');p = p.substri"
+"ng(0,i);}return p;");

/*
 * Plugin: socialPlatforms v1.0
 */
s.socialPlatforms=new Function("a",""
+"var s=this,g,K,D,E,F;g=s.referrer?s.referrer:document.referrer;g=g."
+"toLowerCase();K=s.split(s.socPlatList,'|');for(i=0;i<K.length;i++){"
+"D=s.split(K[i],'>');if(g.indexOf(D[0])!=-1){if(a){s[a]=D[1];}}}");
s.socPlatList="facebook.com>Facebook|twitter.com>Twitter|t.co/>Twitter|youtube.com>Youtube|clipmarks.com>Clipmarks|dailymotion.com>Dailymotion|delicious.com>Delicious|digg.com>Digg|diigo.com>Diigo|flickr.com>Flickr|flixster.com>Flixster|fotolog.com>Fotolog|friendfeed.com>FriendFeed|google.com/buzz>Google Buzz|buzz.googleapis.com>Google Buzz|plus.google.com>Google+|hulu.com>Hulu|identi.ca>identi.ca|ilike.com>iLike|intensedebate.com>IntenseDebate|myspace.com>MySpace|newsgator.com>Newsgator|photobucket.com>Photobucket|plurk.com>Plurk|slideshare.net>SlideShare|smugmug.com>SmugMug|stumbleupon.com>StumbleUpon|tumblr.com>Tumblr|vimeo.com>Vimeo|wordpress.com>WordPress|xanga.com>Xanga";
/*  
 * socialAuthors v1.1
 */
s.socialAuthors=new Function("",""
+"var s=this,g,tco;g=s.referrer?s.referrer:document.referrer;if(g.ind"
+"exOf('t.co/')!=-1){s.tco=escape(s.split(g,'/')[3]);s.Integrate.add("
+"'SocialAuthor');s.Integrate.SocialAuthor.tEvar='eVar62';s.Integrate"
+".SocialAuthor.get('http://search.twitter.com/search.json?var=[VAR]&"
+"callback=s.twitterSearch&q=http%3A%2F%2Ft.co%2F'+s.tco);s.Integrate"
+".SocialAuthor.delay();s.Integrate.SocialAuthor.setVars=function(s,p"
+"){s[p.tEvar]=s.user;}}");
s.twitterSearch=new Function("obj",""
+"if(typeof obj=='undefined'||obj.results.length==0){s.user='Not Foun"
+"d';s.Integrate.SocialAuthor.ready();return;}s.user=obj.results[0].f"
+"rom_user;resultNum=obj.results;s.Integrate.SocialAuthor.ready();");


s.maxDelay='1000';	//max time to wait for 3rd party api response in milliseconds
s.loadModule("Integrate")
s.Integrate.onLoad=function(s,m){
	s.socialAuthors();
	//add other integration module dependent functions here
};


/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");



/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.dc=112
if (typeof(s_account) != "undefined")
{
    if (s_account == 'tiffanyrus' || s_account == 'tiffanyrint' || s_account == 'tiffanyrusmobile' || s_account == 'tiffanyrstmt' || s_account == 'tiffanyrwatches') {
        s.trackingServer = "stats.tiffany.com"
        s.trackingServerSecure = "sstats.tiffany.com"
    }
    else if (s_account == 'tiffanyruk') {
        s.trackingServer = "stats.tiffany.co.uk"
        s.trackingServerSecure = "sstats.tiffany.co.uk"
        s.cookieDomainPeriods = "3"
		s.visitorMigrationKey="4CCB6F8B"
        s.visitorMigrationServer = "stats.tiffany.com"
        s.visitorMigrationServerSecure = "sstats.tiffany.com"
    }
    else if (s_account == 'tiffanyrca') {
        s.trackingServer = "stats.tiffany.ca"
        s.trackingServerSecure = "sstats.tiffany.ca"
    }
    else if (s_account == 'tiffanyrjp') {
        s.trackingServer = "stats.tiffany.co.jp"
        s.trackingServerSecure = "sstats.tiffany.co.jp"
        s.cookieDomainPeriods = "3"
    }
    else if (s_account == 'tiffanyrmx') {
        s.trackingServer = "stats.tiffany.com.mx"
        s.cookieDomainPeriods = "3"
    }
    else if (s_account == 'tiffanyrau') {
        s.trackingServer = "stats.tiffany.com.au"
        s.trackingServerSecure = "sstats.tiffany.com.au"
        s.cookieDomainPeriods = "3"
        s.visitorMigrationKey = "50E5BE64"
        s.visitorMigrationServer = "stats.tiffany.com"
        s.visitorMigrationServerSecure = "sstats.tiffany.com"
    }
    else if (s_account == 'tiffanyrcn') {
        s.trackingServer = "stats.tiffany.cn"
        //s.trackingServerSecure = ""
    }
    else if (s_account == 'tiffanyrbe') {
        s.trackingServer = "stats.tiffany.com"
        s.trackingServerSecure = "sstats.tiffany.com"
    }
    else if (s_account == 'tiffanyrnl') {
        s.trackingServer = "stats.tiffany.com"
        s.trackingServerSecure = "sstats.tiffany.com"
    }
    else if (s_account == 'tiffanyrit') {
        s.trackingServer = "stats.tiffany.it"
        s.trackingServerSecure = "sstats.tiffany.it"
    }
    else if (s_account == 'tiffanyrde') {
        s.trackingServer = "stats.tiffany.de"
        s.trackingServerSecure = "sstats.tiffany.de"
    }
    else if (s_account == 'tiffanyrfr') {
        s.trackingServer = "stats.tiffany.fr"
        s.trackingServerSecure = "sstats.tiffany.fr"
    }
    else if (s_account == 'tiffanyres') {
        s.trackingServer = "stats.tiffany.es"
        s.trackingServerSecure = "sstats.tiffany.es"
    }
    else if (s_account == 'tiffanyrat') {
        s.trackingServer = "stats.tiffany.at"
        s.trackingServerSecure = "sstats.tiffany.at"
    }
    else if (s_account == 'tiffanyrie') {
        s.trackingServer = "stats.tiffany.ie"
        s.trackingServerSecure = "sstats.tiffany.ie"
    }
    else if (s_account == 'tiffanyemployeestore') 
    {
        s.trackingServer = "stats.estore-tco.com"
        s.trackingServerSecure = "sstats.estore-tco.com"
    }
    else if (s_account == 'tiffanyrestorejp') {
        s.trackingServer = "stats.estore-tco.jp"
        s.trackingServerSecure = "sstats.estore-tco.jp"
    }
    else if (s_account == 'tiffanyrkr') {
        s.trackingServer = "stats.tiffany.kr"
        s.trackingServerSecure = "sstats.tiffany.kr"
    }
    else if (s_account == 'tiffanyrzh') {
        s.trackingServer = "stats.tiffany.com"
        s.trackingServerSecure = "sstats.tiffany.com"
    }
    else if (s_account == 'tiffanyrbr') {
        s.trackingServer = "stats.tiffany.com.br"
    }
    else if (s_account == 'tiffanyrru') {
        s.trackingServer = "stats.tiffany.com.ru"
    }
}


/*Modules*/

/* Module: Integrate */
s.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!s.wd[o])s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p.get"
+"=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m.l[i]"
+"];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=function"
+"(p,u){var m=this,s=m.s,x,v,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*1000000000000"
+"0):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;for(x in p)if(x&&x.substring(0,1)!='_'&&(!Object||!Object.prototype||!Object.prototype[x])){v=''+p[x];if(v==p[x]||parseFloat(v)==p[x])u="
+"s.rep(u,'['+x+']',s.rep(escape(v),'+','%2B'))}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule("
+"'Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<"
+"m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d["
+"x];p._d--}};m.beacon=function(u){var p=this,m=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;i"
+"m=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.script=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
s.m_i("Integrate");



/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"
+"return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"
+"16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"
+"(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"
+"codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"
+"ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"
+"sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="
+"s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"
+"c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"
+" s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"
+".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."
+"epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"
+"E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"
+"+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."
+"o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"
+">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"
+"'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"
+".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="
+"p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"
+"l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"
+"ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"
+"){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"
+"(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"
+".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,2047)}if(id){s.br(id,r"
+"s);return}}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(windo"
+"w.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im"
+".s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;i"
+"m.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\""
+"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s"
+"=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y="
+"y.substring(0,i);h=y.toLowerCase();i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('goo"
+"gle')>=0){a=s.sp(a,'&');if(a.length>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+="
+"(c?'&':'')+t}if(b&&c){y+='?'+b+'&'+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe."
+"substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt"
+"(x),q=k;if(v&&k!='linkName'&&k!='linkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=="
+"'visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'"
+"){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=="
+"'AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider"
+"')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';e"
+"lse if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q"
+"='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if"
+"(v)qs+='&'+q+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.subst"
+"ring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.l"
+"inkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.tr"
+"ackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this"
+",\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e."
+"srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h"
+"=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathn"
+"ame.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCas"
+"e?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot"
+"(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r"
+"\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE"
+"')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').in"
+"dexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.p"
+"t(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs"
+"=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';"
+"for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]"
+"&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.lin"
+"ks.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function("
+"){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh("
+"s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if"
+"(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='"
+"):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynami"
+"cAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s."
+"fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.s"
+"ubstring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd"
+".s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r"
+"=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_i"
+"l['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\""
+"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;"
+"if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m["
+"t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<"
+"g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.subst"
+"ring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n"
+"+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;"
+"if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"s"
+"cript\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e"
+"){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}ret"
+"urn m};s.vo1=function(t,a){if(a[t]||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)"
+"for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s."
+"dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDel"
+"ay)s.maxDelay=250;s.dlt()};s.t=function(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10"
+"+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta="
+"-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if"
+"(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;t"
+"cf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.jav"
+"aEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5"
+"){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y"
+"\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)w"
+"hile(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.b"
+"rowserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.w"
+"d.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return"
+" '';var p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s"
+"_oidt}oc=o.onclick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i"
+"<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk="
+"0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s."
+"fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta"
+");qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.p"
+"g)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t"
+"(vo)};if(pg){s.wd.s_co=function(o){var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.lo"
+"cation.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns"
+"6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer'"
+");s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=pa"
+"rseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUp"
+"perCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorName"
+"space,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,s"
+"tate,zip,events,products,linkName,linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,"
+"cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDom"
+"ainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,"
+"linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s."
+"wds()",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}
/* End of s_code.js */
/**
 * @author Sandeep Rudrawar  
 *Dt 4/10/2009
 * Copyright 2009 IBM Corp
 *
 */
 /*  Begin Helper Functions */
 //pageview connector 
 /* Start Comstants */
 var CATEGORY_ITEM_PAGE_ACTIVITIES = 'Item Page Activities';
 var ITEM_EMAIL_ACTIVITIES = 'Item Email Activities'; 
 var ITEM_EMAIL_ACTIVITIES ='Item Email Activities';
 var BROWSE_RELATED = 'Browse Related';
 var USER_ACTIVITIES = 'User Activities';
 var ADVANCED_SEARCH = 'Advanced Search';
 var DEVICE_INFO = 'Device Info';
 var LABEL_VISITED_LINKS = 'Links Visited';

 // Start Custom Variable related constants

 // Slot of the variables
 
 var STORE_LOCATION_SEARCH_SLOT = 2;
 var SAVE_ITEM_SLOT = 3;
 var EMAIL_SIGNUP_SLOT = 8;
 // Name of the variables
 var EMAIL_SIGNUP_NAME = 'Email_Signup';
 var SAVE_ITEM_NAME = 'Save_Item';
 var STORE_LOCATION_SEARCH_NAME = 'Store_Search';
 // End Name Section

 // Scope of the variables
 var VISITOR_LEVEL_SCOPE = 1;
 var VISIT_LEVEL_SCOPE = 2;
 var PAGE_LEVEL_SCOPE = 3;
 // End Scope Section

 // End Custom Variable Constants

 /* End Constants */
 function SetCustomVariable(custVarSlot, custVarName, custVarValue, custVarScope,requiresPageView) {

     //slots 1,2,3,4,5 total. Only 5 slots are available in total. Do not send any other value, it will be ignored. 
    //scope 1=>visitor level, 2=>Session Lvele 3=>Page Level. Do not send anything else apart from 1,2,3.
     custVarValue = TrimString(custVarValue);
     if (!IsNullOrEmpty(custVarValue)) 
     {
         custVarValue = ReplaceSpacesWithUnderScore(custVarValue);
         pageTracker._setCustomVar(
      custVarSlot,                   // This custom var is set to this slot
      custVarName,           // Name of custom variable.
      custVarValue,      // Sets the value of "Section" to "Life & Style" for this particular aricle
      custVarScope                    // Sets the scope to page-level as default from GAHelper class.
                             );

         if (requiresPageView == true) 
         {
             TrackPageView();
         }
     } 

 }
 
 function GetVirtualPageViewPath(level0,level1,level2,level3)
 {	var slash = '/';
	var retVal;
	if(IsDefined(level0) && IsDefined(level1) && IsDefined(level2) && IsDefined(level3))
	{
		retVal= slash + level0 + slash + level1 + slash +level2 + slash +level3;
	}
	else if (IsDefined(level0) && IsDefined(level1) && IsDefined(level2))
	{
		retVal= slash + level0 + slash + level1 + slash +level2 ;
	}
	else if(IsDefined(level0) && IsDefined(level1) )
	{
		retVal= slash + level0 + slash + level1;
	}
	else if(IsDefined(level0) )
	{
		retVal= slash + level0;
	}
	// All virtual pageviews should go under /Virtual Folder/ in GA reports.
	retVal = slash + 'Virtual' +retVal ; 
	return retVal;
	
 }
function IsDefined( variable)
{

    if (typeof(variable) != 'undefined' && variable != null && variable != 'undefined') { return true; }
	else{return false;}
	

}
function IsNullOrEmpty(variable)
{
	if(variable ==null || variable =='undefined' || variable =='')
	{ return true;}
	else {return false;}
}
 /*  End Helper Functions */
function TrackEvent(category, action, label,value)
{			
	TrackEventAction(category,action,label,value);			
}
function TrackEventAction(category, action, label,value)
{
		
	if(IsDefined(pageTracker ))
	{		
		if( IsNullOrEmpty( value)== true)
		{			
			pageTracker._trackEvent(category , action, label);
		}
		else
		{
			pageTracker._trackEvent(category , action, label,value);
		}
	}
}
function TrackPageView(drillDownPath)
{
	if(IsDefined(pageTracker) == true )
	{	
		if(IsNullOrEmpty(drillDownPath) == false)
		{			
			pageTracker._trackPageview(drillDownPath);
		}
		else{pageTracker._trackPageview();}
	}	
	
}
function SetVar(varName)
{
	if( IsDefined(pageTracker ) && IsDefined(varName)  )
	{		
		pageTracker._setVar(varName);
	}
}
function GATrackBannerActivity(linkname)
{
    /* following variables are declared on MasterCategoryPage only*/
    if (typeof (BANNER_LABEL) == 'undefined') return;
	if(IsDefined (USER_ACTIVITIES)==true && IsDefined(BANNER_LABEL)==true )
	{	
		TrackEvent(USER_ACTIVITIES, linkname , BANNER_LABEL);
	}
}
function GATrackFileDownLoad(downloadName) 
{
	if(IsNullOrEmpty(downloadName)==false  )
	{
		var drilldownPath = GetVirtualPageViewPath('Downloads',downloadName);
		TrackPageView(drilldownPath);
	}
}
function GATrackExitLink(exitLinkName) {
    if (IsNullOrEmpty(exitLinkName) == false) {
        var drilldownPath = GetVirtualPageViewPath('Exit Links', exitLinkName);
        TrackPageView(drilldownPath);
    }

}
// Change the name as GATrackActivity(linkname)
function GATrackItemActivity(linkname) 
{
	if(IsDefined(linkname) == false)
	{
		return ;
	}
	
    if (linkname == "View Holiday Banner Detail") {
        GATrackBannerActivity(linkname);
        return;
    }

    if (linkname == "Email CSR Link") {
        if (typeof (USER_ACTIVITIES) != 'undefined' && IsDefined(USER_ACTIVITIES)) {
            TrackEvent(USER_ACTIVITIES, 'CSR Email', linkname);
            return;
        }
    }

    if (typeof (CATEGORY_ITEM_PAGE_ACTIVITIES) != 'undefined' && typeof (LABEL_PRODUCT_TITLE) != 'undefined') {
        if (IsDefined(CATEGORY_ITEM_PAGE_ACTIVITIES) && IsDefined(LABEL_PRODUCT_TITLE) && !IsNullOrEmpty(linkname)) {
            TrackEvent(CATEGORY_ITEM_PAGE_ACTIVITIES, linkname, LABEL_PRODUCT_TITLE);
        }
    }
    else {
        GATrackAction(LABEL_VISITED_LINKS, linkname);
    }
}
function GATrackItemEmailActivity(omie)
{
    var gaItemEmailAction = '';

    if (omie == "itemUrlClk") {
        gaItemEmailAction = 'Item Url Click';
    }
    else if (omie == "itemImgClk") {       
        gaItemEmailAction = 'Item Image Click';
    }
    else if (omie == "itemBtnClk") {       
        gaItemEmailAction = 'View Item Button Click';
    }
    else if (omie == "EmailsignUp") {       
        gaItemEmailAction = 'Email Signup';
    }
    else if (omie == "strloc") {       
        gaItemEmailAction = 'Store Locations';
    }
    if (IsDefined(CATEGORY_ITEM_PAGE_ACTIVITIES) && IsDefined(ITEM_EMAIL_ACTIVITIES) && !IsNullOrEmpty(gaItemEmailAction))
	{
	    TrackEvent(CATEGORY_ITEM_PAGE_ACTIVITIES, ITEM_EMAIL_ACTIVITIES, gaItemEmailAction);
	}
}
function TrackEngagementBrowseWithRefinements()
{	
	TrackPageView(ENGAGEMENT_BROWSE_REFINEMENT);
	
}
// Shpng Bag Tracking
function GATrackActionAddToShoppingBag(sourceOfAdd )
{
    var cookieCnt = parseInt(CookieManager.getCookieValue("shoppingbagcnt"));
    var drillDownLevel1 ;
    var drillDownLevel0 = 'Shopping Bag';
    var drillDownPath ;

		if (!isNaN(cookieCnt) && cookieCnt > 0)
		{	// nothing to do 
		}
		else 
		{
			drillDownLevel1 = 'sc Open';
			TrackEvent (drillDownLevel0, drillDownLevel1, sourceOfAdd); 
					
		}
		drillDownLevel1 = 'sc Add';
		//drillDownPath =  GetVirtualPageViewPath(drillDownLevel0,drillDownLevel1,sourceOfAdd);
		//TrackPageView (drillDownPath);		
		TrackEvent(drillDownLevel0,drillDownLevel1,sourceOfAdd);
}
//saved items 
function GATrackActionAddToSavedItems (sourceOfAdd)
{
	var drillDownLevel1 = 'Add' ;
	var drillDownLevel0 = 'Saved Items';
	var drillDownLevel2 = sourceOfAdd;
	//var drillDownPath = GetVirtualPageViewPath(drillDownLevel0,drillDownLevel1,drillDownLevel2);
	TrackEvent(drillDownLevel0,drillDownLevel1,drillDownLevel2);
	//TrackPageView(drillDownPath);
	
}
function GATrackActionEngagementAdd()
{
	var drillDownLevel0 = 'Saved Items';
	var drillDownLevel1 = 'Engagement add' ;
	var drillDownLevel2 = 'Engagement Item Page';
	//var drillDownPath = GetVirtualPageViewPath(drillDownLevel0, drillDownLevel1 ,drillDownLevel2);
	TrackEvent(drillDownLevel0, drillDownLevel1 ,drillDownLevel2);
	//TrackPageView(drillDownPath);		
	
}
function GATrackAction(argPageTitleSource , argAction,skuValue)
{
	if(! IsNullOrEmpty(argAction ))
	{
	    if (argAction == 'Add to SavedItems') 
	    {
	        if (! IsNullOrEmpty(skuValue))	
		        SetCustomVariableForSaveItem(skuValue); 
			GATrackActionAddToSavedItems (argPageTitleSource);
		}
		else if ( argAction == 'Add to ShoppingBag')
		{
			GATrackActionAddToShoppingBag(argPageTitleSource); 
		}
		else 
		{
			if(IsDefined(USER_ACTIVITIES)==true && IsDefined(argPageTitleSource)==true && IsDefined(argAction))
			{
				TrackEvent(USER_ACTIVITIES,argPageTitleSource,argAction);
			}
		}
	}
}
function GATrackCategoryBrowseEvent(viewAllAction)
{

	if( IsDefined(USER_ACTIVITIES) == true && IsDefined(BROWSE_RELATED) == true  && IsDefined(viewAllAction))
	{
		TrackEvent(USER_ACTIVITIES,BROWSE_RELATED,viewAllAction);
	}

}
function GATrackSearchTerm(searchTerm)
{
// Here /Search should be preceded otherwise it will flood in  Content Drilldown reports. 
  var newURL ;// = location.pathname;
  if(IsDefined(searchTerm) == true )
  {
	//newURL = '/Virtual/Search' +newURL +'?searchTerm='+searchTerm;
	newURL = '/Shopping/CategoryBrowse.aspx?searchTerm=' + searchTerm;	
	TrackPageView(newURL);
  }
}

function GATrackAdvancedSearchTerm(searchTerm, searchCriteriaForTracking) {

    if (IsDefined(searchTerm) == true && IsDefined(searchCriteriaForTracking) == true) {

        TrackEvent(USER_ACTIVITIES, ADVANCED_SEARCH, searchCriteriaForTracking.concat("searchTerm: ").concat(searchTerm));
    }

}
// Track to click event on Search icon in Mobile site.
function GATrackMobileSearchClick(category,action,labelName) {
    if (IsDefined(category) == true && IsDefined(action) == true && IsDefined(labelName) == true) {
        TrackEvent(category, action, labelName, ''); 
    } 
}

function AddTransaction(OrderID,Affiliation,Total,Tax,Shipping ,City ,State,Country)
{	
	if(IsDefined(OrderID) && IsDefined(Affiliation)&& IsDefined(Total)&& IsDefined(Tax)&& 
		IsDefined(Shipping)&& IsDefined(City)&& IsDefined(State) && IsDefined(Country))
	{
	
		pageTracker._addTrans(OrderID,Affiliation,Total,Tax,Shipping ,City ,State,Country);
	}
	else if( IsDefined(OrderID) && IsDefined(Affiliation)&& IsDefined(Total) )
	{
		pageTracker._addTrans(OrderID , Affiliation , Total);
	}
}
function AddItem(OrderID, SKU ,ProductName , Category, UnitPrice, Quantity)
{
	if( IsDefined(OrderID) && IsDefined(SKU) && IsDefined(ProductName) 	   &&
		IsDefined(Category) && IsDefined(UnitPrice) &&  IsDefined(Quantity)	)
	{
	
		pageTracker._addItem(OrderID ,SKU ,ProductName, Category , UnitPrice , Quantity);
	}
}
function TrackTransaction()
{

	if(IsDefined(pageTracker))
	{			
		pageTracker._trackTrans();
	}
}

function GATrackModuleEvent(moduleName, flashTitle)
{
	
	if(IsNullOrEmpty(flashTitle)==true)
	{
		flashTitle = moduleName;
	}
	
	if((IsNullOrEmpty(flashTitle)== false))
	{	var modulePathName ='Modules';
     	var drilldownPath=	GetVirtualPageViewPath(modulePathName,flashTitle );			
		TrackPageView(drilldownPath);
	}
}

//New method for Carosel swipe and nav link clicks
function GATrackCaroselEvent(eventName) {
    if ( ! IsNullOrEmpty(eventName)) {
        TrackEvent(USER_ACTIVITIES, BROWSE_RELATED, eventName);
    }
}

// Function to track device info properties
function GATrackDeviceInfo(category, data) 
{
    if (IsDefined(category) == true && IsDefined(data) == true) {

        TrackEvent(DEVICE_INFO, category, data);
    }
}

/* Functions related to Custom Variable */

// Function to set custom variable for Save Item.
function SetCustomVariableForSaveItem(skuValue) 
{
    SetCustomVariable(SAVE_ITEM_SLOT, SAVE_ITEM_NAME, skuValue, VISITOR_LEVEL_SCOPE,false);  
}

// Function to set custom variable for Store Location.
function SetCustomVariableForStoreLocation(searchTerm) 
{
    SetCustomVariable(STORE_LOCATION_SEARCH_SLOT, STORE_LOCATION_SEARCH_NAME, searchTerm, VISITOR_LEVEL_SCOPE, true);
}

function ReplaceSpacesWithUnderScore(custVarValue) 
{
    custVarValue = custVarValue.replace(" ", "_");
    return custVarValue;
}

function TrimString(contentToTrim) 
{
	 var finalContent = contentToTrim.match(/^\s*(\S+(\s+\S+)*)\s*$/);
	 return (finalContent == null) ? "" : finalContent[1];
}


function GATrackCompleteSearch(searchTerm) {

    if (IsDefined(searchTerm) == true) {

        TrackEvent(USER_ACTIVITIES, "Completed Search Results", searchTerm);
    }

}

function GATrackHomePagePromo(promo) {

    if (!IsNullOrEmpty(promo)) {
        SetVar('hppromo/' + promo);
        // Since setting variable requires pageview to be called, calling TrackPageView() method;
        TrackPageView();
    }

}
// Commented due to issue of custom variables of the slots after 5  
// Function to set custom variable for Email Signup.
//function SetCustomVariableForEmailSignup() 
//{
//   SetCustomVariable(EMAIL_SIGNUP_SLOT, EMAIL_SIGNUP_NAME, GA_SUBMIT_DATE, VISITOR_LEVEL_SCOPE, false);
//}
//--------------------------------------------------------------------------

/* End Functions related to Custom Variable */
/* End of SiteTrackingGA.js */
/**
* @author Partha Banerjee  
* Dt 9/14/2011
*/
/*  Begin Helper Functions */

// Function to track click on Header and Footer links.
function TrackMobileHeaderAndFooter(linkName) 
{
    if (!IsNullOrEmpty(linkName)) 
    {
        s.eVar8 = linkName;
        s.t();
    }

}

// Function to track click on the Master category links of mobile site
function TrackMobileMasterCategoryLink(masterCategoryName) 
{
    if (!IsNullOrEmpty(masterCategoryName)) 
    {
        s.prop3 = masterCategoryName;
        s.t();
    }
}

// Function to track click on the category links in Master Category landing page.
function TrackMobileCategoryLink(categoryName) 
{
    if (!IsNullOrEmpty(categoryName)) 
    {
        s.prop4 = categoryName;
        s.t();
    }
}

// Function to track click on the "Load More Results" link on category browse page.
function TrackMobileLoadMoreResults(valueToPost) 
{
    // Its required new eVar and since we don't have eVar31 yet so, I am assigning the value to the same below
    if (!IsNullOrEmpty(valueToPost)) 
    {
        s.eVar31 = valueToPost;
        s.t();
    }
}

function TrackMobileCarousel(value) 
{
    // Its required new Prop variable and since we don't have Prop 10 yet so, I am assinging the value to prop10.
    if (!IsNullOrEmpty(value)) 
    {
        s.prop10 = value;
        s.t();
    }
}

function omnitureTrackDeviceInfo(category, data) 
{
    if (!IsNullOrEmpty(category) && !IsNullOrEmpty(data)) 
    {
        s.prop11 = "Device Info | " + category + " | " + data;
        s.t();
    }
}
// Redesign Browsing
function OmnitureTrackHeaderMenu(menu) 
{
    if (!IsNullOrEmpty(menu)) 
    {
        s.prop3 = menu;
        s.eVar8 = menu;
        // void (s.t());
        SetlinkTrackVars("prop3,eVar8");
        s.tl(true, 'o', menu);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackHeaderMenuItem(menu, menuItemName) 
{
    if (!IsNullOrEmpty(menu) && !IsNullOrEmpty(menuItemName)) 
    {
        s.prop4 = menu + ' -> ' + menuItemName;
        //void (s.t());
        SetlinkTrackVars("prop4");
        s.tl(true, 'o', menu + ' -> ' + menuItemName);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackExploreAllLink(masterCategoryName) 
{
    if (!IsNullOrEmpty(masterCategoryName)) 
    {
        s.prop4 = masterCategoryName + ' -> ' + 'Explore All';
        //void (s.t());
        SetlinkTrackVars("prop4");
        s.tl(true, 'o', masterCategoryName + ' -> ' + 'Explore All');
        ClearlinkTrackVars();
    }
}

function OmnitureTrackingHeadlineOrImage(masterCategory) 
{
    if (!IsNullOrEmpty(masterCategoryName)) 
    {
        s.prop4 = masterCategoryName + ' -> ' + 'Headline Or Image Click';
        // void (s.t());
        SetlinkTrackVars("prop4");
        s.tl(true, 'o', masterCategoryName + ' -> ' + 'Headline Or Image Click');
        ClearlinkTrackVars();
    }
}

function OmnitureTrackFooterLinkClick(link) 
{
    if (!IsNullOrEmpty(link)) 
    {
        s.prop3 = link;
        s.eVar8 = link;
    //    void (s.t());
        SetlinkTrackVars("prop3,eVar8");
        s.tl(true, 'o', link);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackViewMoreStore() 
{
    s.eVar8 = "View More Stores and Events - Header";
    //void (s.t());
    SetlinkTrackVars("eVar8");
    s.tl(true, 'o', "View More Stores and Events - Header");
    ClearlinkTrackVars();
}

function OmnitureTrackViewAllStoresInCountry(countryandLoc) 
{
    if (!IsNullOrEmpty(countryandLoc)) 
    {
        s.eVar8 = 'View ALL Stores in ' + countryandLoc;
        //  void (s.t());
        SetlinkTrackVars("eVar8");
        s.tl(true, 'o', 'View ALL Stores in ' + countryandLoc);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackSortOptions(pageName, sortOption) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(sortOption)) 
    {
        s.eVar35 = pageName + ' -> ' + 'Sort By' + ' -> ' + sortOption;
        // void (s.t());
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + 'Sort By' + ' -> ' + sortOption);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackEndecaDimensions(pageName, endecaDimension, selectedValue, categoryName) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(endecaDimension) && !IsNullOrEmpty(selectedValue) && !IsNullOrEmpty(categoryName)) {
        s.eVar35 = pageName + ' -> ' + categoryName + ' -> ' + endecaDimension + ' -> ' + selectedValue;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + categoryName + ' -> ' + endecaDimension + ' -> ' + selectedValue);
        ClearlinkTrackVars();
    }
    else if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(endecaDimension) && !IsNullOrEmpty(selectedValue)) {
        s.eVar35 = pageName + ' -> ' + endecaDimension + ' -> ' + selectedValue;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + endecaDimension + ' -> ' + selectedValue);
        ClearlinkTrackVars();
    }   
}

function OmnitureTrackLoadMoreResults(pageName, linkName) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(linkName)) 
    {
        s.eVar35 = pageName + ' -> ' + 'View All Link' + ' -> ' + linkName;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + 'View All Link' + ' -> ' + linkName);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackItemDisplayOption(pageName, action, skuDescription) 
{
    s.eVar35 = pageName + '->' + action + '->' + skuDescription;
    SetlinkTrackVars("eVar35");
    s.tl(true, 'o', pageName + '->' + action + '->' + skuDescription);
    ClearlinkTrackVars();
}

function OmnitureTrackSKUInRecentlyViewedItems(pageName, skuDescription) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(skuDescription)) 
    {
        s.eVar35 = pageName + ' -> ' + 'Recently Viewed Rings' + ' -> ' + skuDescription;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + 'Recently Viewed Rings' + ' -> ' + skuDescription);
        ClearlinkTrackVars();

    }
}

function OmnitureTrackSeeItOn(pageName, action, value) 
{

    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(value)) 
    {
        s.eVar35 = pageName + ' -> ' + action + '->' + value;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + action + '->' + value);
        ClearlinkTrackVars();
    }

}

function OmnitureTrackLearnMoreLink(pageName, value) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(value)) 
    {
        s.eVar35 = pageName + ' -> ' + 'Learn More' + '->' + value;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + 'Learn More' + '->' + value);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackScheduleVisit(pageName, action) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action)) {
        s.eVar35 = pageName + ' -> ' + action;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + action);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackCarouselClick(pageName, carousalName, slideNumber) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(carousalName) && !IsNullOrEmpty(slideNumber)) {
        s.eVar35 = pageName + ' -> ' + 'Carousel Click' + ' -> ' + carousalName + ' -> ' + slideNumber;      
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + 'Carousel Click' + ' -> ' + carousalName + ' -> ' + slideNumber);
        ClearlinkTrackVars();    
    }
}


function OmnitureTrackLinkClickFromGridOrCarousel(pageName, action, linkValue) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(linkValue)) {
        s.eVar35 = pageName + ' -> ' + action + ' -> ' + linkValue;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + action + ' -> ' + linkValue);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackInlineCustomerSelectionPaginate(pageName, pageNumber) 
{
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(pageNumber)) 
    {
        s.eVar35 = pageName + '->' + 'Paginate' + '->' + pageNumber;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + '->' + 'Paginate' + '->' + pageNumber);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackWishListViewBy(value) 
{
    if (!IsNullOrEmpty(value)) {
        s.eVar35 = 'Full Page Saved Items' + ' -> ' + 'View By' + ' -> ' + value;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', 'Full Page Saved Items' + ' -> ' + 'View By' + ' -> ' + value);
        ClearlinkTrackVars();
    }
}

function OmnitureTrackFullSaveItemLinkClick(linkName)
{
    if (!IsNullOrEmpty(linkName)) 
    {
        s.prop8 = linkName;
        SetlinkTrackVars("prop8");
        s.tl(true, 'o', linkName);
        ClearlinkTrackVars();
    }
}

function omnitureTrackActionAddToShoppingBag(argPageTitle, argAction, argItem) {
    var cookieCnt = parseInt(CookieManager.getCookieValue("shoppingbagcnt"));
    if (!isNaN(cookieCnt) && cookieCnt > 1) {
        s.events = "scAdd,event21";
    } else {
        s.events = "scOpen,scAdd,event21";
    }
    // iTrack #11318
//    var pageName;
//    var company = "Tiffany & Co. | ";
//    if (locale == "en-us-ird") {
//        company = "IRIDESSE Pearls | ";
//    }
//    pageName = company + argPageTitle + " | ACTION | " + argAction;
//    //Set Omniture variables
//    s.pageName = pageName;
    s.prop8 = argPageTitle + " -> " + argAction;  
    s.eVar35 = argPageTitle + " | ACTION | " + argAction;
    if (!IsNullOrEmpty(argItem)) {
        s.products = argItem;
        SetlinkTrackVars("prop8,eVar35,products,events", s.events);
    } 
    else {
        SetlinkTrackVars("prop8,eVar35,events", s.events);
    }
    //Submit Omniture variable         
    s.tl(true, 'o', argPageTitle + " | ACTION | " + argAction);
    ClearlinkTrackVars(); 	
}

function omnitureTrackMobileLoadMoreResults(pageName, action) {
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action)) {
        s.eVar31 = pageName + ' -> ' + action;
        SetlinkTrackVars("eVar31");
        s.tl(true, 'o', pageName + ' -> ' + action);
        ClearlinkTrackVars();
    }
}
function omnitureTrackMobileCarousel(value) {
    // Its required new Prop variable and since we don't have Prop 10 yet so, I am assinging the value to prop10.
    if (!IsNullOrEmpty(value)) {
        s.prop10 = value;
        SetlinkTrackVars("prop10");
        s.tl(true, 'o', value);
        ClearlinkTrackVars();
    }
}
function OmnitureExitLinkTracking(linkObject, linkName) {
    var siteName = "Tiffany & Co.";   
    linkName = siteName + " | " + linkName
    s.pageName = "Activity | Exit Link";
    s.tl(linkObject, 'e', linkName);
}

function omnitureTrackAction(argPageTitle, argAction, skuValue) {
    var pageName;
    var company = "Tiffany & Co. | ";
    if (locale == "en-us-ird") {
        company = "IRIDESSE Pearls | ";
    }
    pageName = company + argPageTitle + " | ACTION | " + argAction;
    //Set Omniture variables
    s.pageName = pageName;
    s.prop8 = argPageTitle + " -> " + argAction;
    //Submit Omniture variable 	
    s.t();
    GATrackAction(argPageTitle, argAction, skuValue);
}

function OmnitureTrackSearchTerm(searchTerm) {
    s.eVar2 = searchTerm;
    s.eVar9 = "Search";
    s.prop3 = "Search";
    s.prop4 = "Search";
    s.prop18 = searchTerm;
    s.hier1 = "Search,Search";
    // s.pageName = "Activity | Search";
    s.events = "event41";
    SetlinkTrackVars("eVar2,eVar9,prop3,prop4,prop18,hier1,events", "event41");
    s.tl(true, 'o', "Activity | Search");
    ClearlinkTrackVars();
    //void (s.t());
}

function omnitureTrackStoreSearchTerm(searchTerm) {
    //s.eVar2 = "[Store Search] " + searchTerm;
    s.eVar49 = searchTerm;
    s.prop37 = searchTerm;
    s.eVar9 = "Search Store";
    s.prop3 = "Search Store";
    s.prop4 = "Search Store";
    s.hier1 = "Store Search, Search Store";
    //s.pageName = "Activity | Search Store";
    s.events = "event42";
    SetlinkTrackVars("eVar49,eVar9,prop37,prop3,prop4,hier1,events", "event42");
    s.tl(true, 'o', "Activity | Search Store");
    ClearlinkTrackVars();
    //void (s.t());
}

function omnitureTrackViewRemainingItems(pageName, linkName) {
    if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(linkName)) {
        s.eVar35 = pageName + ' -> ' + 'Activity' + ' -> ' + linkName;
        SetlinkTrackVars("eVar35");
        s.tl(true, 'o', pageName + ' -> ' + 'Activity' + ' -> ' + linkName);
        ClearlinkTrackVars();
    }
}

function omnitureTrackVideo(videoName, action, value) {
    s.events = "event10";
	s.pageName = videoName + " | " + action + " | " + value;

	if (action == "Play" && value == "Started") {
		s.eVar37 = videoName;
	}

	if (action == "Play") {
		s.eVar38 = value;
	}
	else if (action == "Video Length") {
		s.eVar39 = value;
	}

	s.t();
}

function omnitureTrackMasterCategoryShopLinks(masterCategory, linkValue) {
    if (!IsNullOrEmpty(masterCategory) && !IsNullOrEmpty(linkValue)) {
        s.prop5 = masterCategory + ' -> ' + linkValue;
        s.eVar41 = masterCategory + ' -> ' + linkValue;
        // void (s.t());
        SetlinkTrackVars("prop5,eVar41");
        s.tl(true, 'o', masterCategory + ' -> ' + linkValue);
        ClearlinkTrackVars();
    }
}

function OmnitureClickEvent(linkname)
{
        s.eVar16 = "";
        s.eVar17 = "";
        s.eVar18 = "";
        s.eVar19 = "";
        s.eVar20 = "";
        s.eVar21 = "";
        s.prop19 = "";
        s.eVar35 = "";
        s.eVar46 = "";
        s.prop39 = "";
        s.eVar47 = "";
        s.eVar57 = "";
        s.eVar48 = "";
        s.prop43 = "";

        if (linkname == "Engraving Available") {
            if (!IsNullOrEmpty(s.pageName)) {
                s.eVar16 = s.pageName + " -> " + linkname;
                s.events = "event16";
                SetlinkTrackVars("eVar16,events", "event16");
            }
        }
        else if (linkname == "View Specifications") {
            s.eVar17 = linkname;
            s.events = "event48";
            SetlinkTrackVars("eVar17,events", "event48");
        }
        else if (linkname == "View Relative Size") {
            s.eVar18 = linkname;
            SetlinkTrackVars("eVar18");
        }
        else if (linkname == "Print Item Information") {
            s.eVar19 = linkname;
            SetlinkTrackVars("eVar19");
        }
        else if (linkname == "Pick Up at Wall Street Store") {
            s.eVar20 = linkname;
            s.events = "event45";
            SetlinkTrackVars("eVar20,events","event45");
        }
        else if (linkname == "View Holiday Banner Detail") {
            s.eVar21 = linkname;
            SetlinkTrackVars("eVar21");
        }
        else if (linkname == "Email This Item") {
            s.prop19 = linkname;
            s.eVar35 = linkname;
            s.events = "event14";
            s.eVar46 = linkname;
            s.prop39 = linkname;
            SetlinkTrackVars("prop19,prop39,eVar35,eVar46,events", "event14");
        }
        else if (linkname == "CSR Print All Information" || linkname == "CSR Gender Diversity Graph" ||
                    linkname == "CSR Generation and Gender Graph" || linkname == "CSR Grants Graph" ||
                         linkname == "CSR Employee Diversity Graph") {
            s.events = "event32";
            s.eVar47 = linkname;
            SetlinkTrackVars("eVar47,events","event32");
        }
        else if (linkname == "Post to Facebook" || linkname == "Post to Pinterest" || linkname == "Post to Tumblr" ||
                    linkname == "Post to Twitter" || linkname == "Email All Item Icon" || linkname == "EMAIL Saved Item" || linkname == "Email This Ring" || linkname == "Share Saved Item" || linkname == "Post to Google") {
            s.events = "event14";
            s.eVar46 = linkname;
            s.prop39 = linkname;
            SetlinkTrackVars("eVar46,prop39,events", "event14");

        }
        else if (linkname == "Print All Item Icon" || linkname == "Print Item Information" || linkname == "PRINT Saved Item" || linkname == "Print This Ring") {
            s.events = "event37";
            s.eVar57 = linkname;
            SetlinkTrackVars("eVar57,events", "event37");
        }
        else if (linkname == "Save This Item") {
            s.events = "event15";
            SetlinkTrackVars("events", "event15");
        }
        else if (linkname == "Save This Ring") {
            s.events = "event40";
            SetlinkTrackVars("events", "event40");
        }
        else if (linkname == "Discover the Story of This Collection" || linkname == "Discover the Story of This Design" || linkname == "Additional Items" ||
                        linkname == "Recently Viewed Items") {
            s.events = "event43";
            s.eVar48 = linkname;
            s.prop43 = linkname;
            SetlinkTrackVars("eVar48,prop43,events", "event43");
        }
        else if (linkname == "Carat Size Guide") {
            s.events = "event46";
            SetlinkTrackVars("events", "event46");
        }
        else if (linkname == "Drop A Hint") {
            s.events = "event44";
            SetlinkTrackVars("events", "event44");
        }
        else if (linkname == "Shipping & Returns") {
            s.events = "event47";
            SetlinkTrackVars("events", "event47");
        }
        else if (linkname == "EMAIL Engagement Ring") {
            s.events = "event25";
            s.eVar35 = "Saved Items | ACTION | EMAIL Engagement Ring";
            SetlinkTrackVars("eVar35,events", "event25");
        }
        else if (linkname == "PRINT Engagement Ring") {
            s.events = "event26";
            s.eVar35 = "Saved Items | ACTION | PRINT Engagement Ring";
            SetlinkTrackVars("eVar35,events", "event26");
        }
        else if (linkname == "EMAIL ShoppingBag") {
            s.events = "event28";
            s.eVar35 = "Shopping Bag | ACTION | EMAIL ShoppingBag";
            SetlinkTrackVars("eVar35,events", "event28");
        }
        else if (linkname == "PRINT ShoppingBag") {
            s.events = "event29";
            s.eVar35 = "Shopping Bag | ACTION | PRINT ShoppingBag";
            SetlinkTrackVars("eVar35,events", "event29");
        }           
        else {
            s.eVar35 = linkname;
            SetlinkTrackVars("eVar35");
        }
        
        //s.pageName = "Activity | " + linkname;
        //s.t();    
        s.tl(true, 'o', linkname);
        ClearlinkTrackVars();
 }

 function omnitureItemEmailClicks(omie) {

     s.eVar23 = "";
     if (omie == "itemUrlClk") {
         s.pageName = "Activity | Item Email | Item Url Click";
         s.eVar23 = "Item Url Click";
         void (s.t());        
     }
     else if (omie == "itemImgClk") {
         s.pageName = "Activity | Item Email | Item Image Click";
         s.eVar23 = "Item Image Click";
         void (s.t());        
     }
     else if (omie == "itemBtnClk") {
         s.pageName = "Activity | Item Email | View Item Button Click";
         s.eVar23 = "View Item Button Click";
         void (s.t());        
     }
     else if (omie == "EmailsignUp") {
         s.pageName = "Activity | Item Email | Email Signup";
         s.eVar23 = "Email Signup";
         void (s.t());         
     }
     else if (omie == "strloc") {
         s.pageName = "Activity | Item Email | Store Locations";
         s.eVar23 = "Store Locations";
         void (s.t());         
     }

 }

 function omnitureTrackWeddingBandDetailsLink(pageName, action, value) {

     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
         s.eVar35 = pageName + ' -> ' + action + '->' + value;
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + action + '->' + value);
         ClearlinkTrackVars();
     }

 }

 function omnitureTrackSkinToneSeeItOn(pageName, action, value) {

     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
         s.eVar35 = pageName + ' -> ' + action + '->' + value;
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + action + '->' + value);
         ClearlinkTrackVars();
     }
 }

 function omnitureTrackCaratSizeSeeItOn(pageName, action, value) {

     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
         s.eVar35 = pageName + ' -> ' + action + '->' + value;
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + action + '->' + value);
         ClearlinkTrackVars();
     }
 }

 function omnitureTrackInlineShoppingBagViewItems(argPageTitle, argAction, argItems) {
     var cookieCnt = parseInt(CookieManager.getCookieValue("shoppingbagcnt"));   
     if (!isNaN(cookieCnt) && cookieCnt > 0) {
         s.events = "scView,event22";         
     } else {
         
     }
     //     var pageName;
     //     var company = "Tiffany & Co. | ";
     //     if (locale == "en-us-ird") {
     //         company = "IRIDESSE Pearls | ";
     //     }
     //     pageName = company + argPageTitle + " | ACTION | " + argAction;
     //Set Omniture variables
     if (!IsNullOrEmpty(argItems)) {
         s.products = argItems;
         SetlinkTrackVars("eVar35,prop8,products,events", "scView,event22");
     } else {
         SetlinkTrackVars("eVar35,prop8");
     }
     
     s.eVar35 = argPageTitle + " | ACTION | " + argAction;
     s.prop8 = argPageTitle + " -> " + argAction;
     //s.pageName = pageName; 
     s.tl(true, 'o', argPageTitle + " | ACTION | " + argAction);
     ClearlinkTrackVars();
 }

 function omnitureTrackInlineViewSavedItems(argPageTitle, argAction) {
     var cookieCnt = parseInt(CookieManager.getCookieValue("saveditemscnt"));
     if (!isNaN(cookieCnt) && cookieCnt > 0) {
         s.prop8 = argPageTitle + " -> " + argAction;
         SetlinkTrackVars("prop8");
         s.tl(true, 'o', argPageTitle + " -> " + argAction);
         ClearlinkTrackVars();          
      }

 }

 function omnitureTrackInlineRemoveShoppingBagItem(argPageTitle, argAction) {
     if (!IsNullOrEmpty(argPageTitle) && !IsNullOrEmpty(argAction)) {
         s.prop8 = argPageTitle + " -> " + argAction;
         s.events = "scRemove";
         SetlinkTrackVars("prop8,events", "scRemove");
         s.tl(true, 'o', argPageTitle + " -> " + argAction);
         ClearlinkTrackVars();  
      }

 }

 function omnitureTrackInlineRemoveSavedItem(argPageTitle, argAction) {
     if (!IsNullOrEmpty(argPageTitle) && !IsNullOrEmpty(argAction)) {
         s.prop8 = argPageTitle + " -> " + argAction;
         s.eVar35 = argPageTitle + " | ACTION | " + argAction;
         s.events = "event24";
         SetlinkTrackVars("prop8,eVar35,events", "event24");        
         s.tl(true, 'o', argPageTitle + " -> " + argAction);
         ClearlinkTrackVars();
     }

 }

 function omnitureTrackInlineShoppingBagLinksClick(argPageTitle, argAction) {
     if (!IsNullOrEmpty(argPageTitle) && !IsNullOrEmpty(argAction)) {
         s.prop8 = argPageTitle + " -> " + argAction;
         SetlinkTrackVars("prop8");
         s.tl(true, 'o', argPageTitle + " -> " + argAction);
         ClearlinkTrackVars();
     }
 }

 function omnitureTrackInlineSavedItemsLinkClick(argPageTitle, argAction) {
     if (!IsNullOrEmpty(argPageTitle) && !IsNullOrEmpty(argAction)) {
         s.prop8 = argPageTitle + " -> " + argAction;
         SetlinkTrackVars("prop8");
         s.tl(true, 'o', argPageTitle + " -> " + argAction);
         ClearlinkTrackVars();
     }
 }

 function omnitureTrackSavedItemsViewBy(pageName, viewbyOption) {
     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(viewbyOption)) {
         s.eVar35 = pageName + ' -> ' + 'View By' + ' -> ' + viewbyOption;
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + 'View By' + ' -> ' + viewbyOption);
         ClearlinkTrackVars();
     }
 }

 function omnitureTrackSavedItemsViewByImageSize(pageName, viewbyOption) {
     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(viewbyOption)) {
         s.eVar35 = pageName + ' -> ' + 'Image Size Option' + ' -> ' + viewbyOption;
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + 'Image Size Option' + ' -> ' + viewbyOption);
         ClearlinkTrackVars();
     }
 }
 function OmnitureTrackSKUInRecentlyViewedItemPageItems(ItemViewSource, skuDescription) {
     if (!IsNullOrEmpty(skuDescription) && !IsNullOrEmpty(ItemViewSource)) {
         s.prop20 = ItemViewSource + ' : ' + skuDescription;
         s.prop43 = ItemViewSource + ' : ' + skuDescription;
         s.eVar48 = ItemViewSource + ' : ' + skuDescription;
         s.events = "event43";         
        // s.pageName = "Activity | " + ItemViewSource + ' -> ' + skuDescription;
         SetlinkTrackVars("prop20,prop43,eVar48,events", "event43");
         s.tl(true, 'o', "Activity | " + ItemViewSource + ' -> ' + skuDescription);
         ClearlinkTrackVars();

     }
 }
 function OmnitureTrackCompleteSearch(pageName, searchTerm) {
     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(searchTerm)) {
         s.eVar35 = pageName + ' -> ' + 'Completed Search' + ' -> ' + searchTerm;
         // void (s.t());
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + 'Completed Search' + ' -> ' + searchTerm);
         ClearlinkTrackVars();
     }
 }

 function OmnitureTrackScheduleVisitWithRings(pageName, action, value) {
     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
         s.eVar35 = pageName + ' -> ' + action + ' -> ' + value;
         //void (s.t());
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o',  pageName + ' -> ' + action + ' -> ' + value);
         ClearlinkTrackVars();
     }
 }

 function OmnitureTrackActionAddToSavedItems(argPageTitle, argAction) {
     //var pageName;
//     var company = "Tiffany & Co. | ";
//     if (locale == "en-us-ird") {
//         company = "IRIDESSE Pearls | ";
//     }
     //pageName = company + argPageTitle + " | ACTION | " + argAction;
     //Set Omniture variables
    // s.pageName = pageName;
     s.prop8 = argPageTitle + " -> " + argAction;
     s.eVar35 = argPageTitle + " | ACTION | " + argAction;
     s.events = "event20";
     //Submit Omniture variable 	
     SetlinkTrackVars("prop8,eVar35,events","event20");
     s.tl(true, 'o', argPageTitle + " | ACTION | " + argAction);
     ClearlinkTrackVars();
 }

 function OmnitureTrackProductZoom(pageName, action, skuDescription) {
     s.events = "event9";
     s.eVar36 = pageName + '->' + action + '->' + skuDescription;
     SetlinkTrackVars("eVar36,events", "event9");
     s.tl(true, 'o', pageName + '->' + action + '->' + skuDescription);
     ClearlinkTrackVars();
 }

 function OmnitureTrackItemOnRollOver(level1) {
     var productDesc = "";
     var company = "Tiffany & Co. | ";     
     productDesc = "Item-" + level1;
     s.eVar40 = productDesc;     
     SetlinkTrackVars("eVar40");
     pageName = company + "Category Browse" + " | ACTION | " + "Item Roll Over";
    // s.pageName = pageName;
     s.tl(true, 'o', pageName);
     ClearlinkTrackVars();
 }

 function OmnitureTrackExpandCollapseMarketingTiles(pageName, action, sectionName) {
     if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(sectionName)) {
         s.eVar35 = pageName + ' -> ' + action + ' -> ' + sectionName;
         SetlinkTrackVars("eVar35");
         s.tl(true, 'o', pageName + ' -> ' + action + ' -> ' + sectionName);
         ClearlinkTrackVars();
     }
 }

 function OmnitureTrackItemPageShareType(linkName) {
     if (!IsNullOrEmpty(linkName)) {
         s.prop19 = linkName;
         s.events = "event13";
         SetlinkTrackVars("prop19,events", "event13");
         s.tl(true, 'o', linkName);
         ClearlinkTrackVars();
     }
 }

 function OmnitureTrackPDPTabActivity(linkName, itemDesc) {
     if (!IsNullOrEmpty(linkName) && !IsNullOrEmpty(itemDesc)) {
         s.prop20 = linkName + " : " + itemDesc;
         SetlinkTrackVars("prop20");
         s.tl(true, 'o', linkName + " : " + itemDesc);
         ClearlinkTrackVars();
     }

 }

 function OmnitureTrackDeviceInfo(category, data) {
     if (!IsNullOrEmpty(category) && !IsNullOrEmpty(data)) {
         s.prop11 = "Device Info | " + category + " | " + data;
         s.eVar43 = "Device Info | " + category + " | " + data;
         SetlinkTrackVars("prop11,eVar43");
         s.tl(true, 'o', "Device Info | " + category + " | " + data);
         ClearlinkTrackVars();       
    }
 }

function SetlinkTrackVars(vars, evts) {
    if (!IsNullOrEmpty(vars)) { s.linkTrackVars = vars; }
    if (!IsNullOrEmpty(evts)) { s.linkTrackEvents = evts; }
}

function ClearlinkTrackVars() {
    s.linkTrackVars = "None";
    s.linkTrackEvents = "None";
}
function OmnitureTrackRemoveSavedItem(argPageTitle, argAction) {
    if (!IsNullOrEmpty(argPageTitle) && !IsNullOrEmpty(argAction)) {
        s.eVar35 = argPageTitle + " | ACTION | " + argAction;
        s.events = "event24";
        SetlinkTrackVars("eVar35,events","event24");
        s.tl(true, 'o', argPageTitle + " | ACTION | " + argAction);
        ClearlinkTrackVars();
    }
}
function OmnitureTrackRemoveSavedEngagementItem(argPageTitle, argAction) {
    if (!IsNullOrEmpty(argPageTitle) && !IsNullOrEmpty(argAction)) {
        s.eVar35 = argPageTitle + " | ACTION | " + argAction;
        s.events = "event23";
        SetlinkTrackVars("eVar35,events", "event23");
        s.tl(true, 'o', argPageTitle + " | ACTION | " + argAction);
        ClearlinkTrackVars();
    }
}
function OmnitureTrackMapLink(link) {
    if (!IsNullOrEmpty(link)) {
        s.tl(link, 'o', s.pageName + ' : Map It');
    }
        
}
function OmnitureTrackHomePagePromo(promo) {
    if (!IsNullOrEmpty(promo)) {
        s.eVar3 = promo;
        s.eVar3 = s.cleanParams(s.eVar3);
        SetlinkTrackVars("eVar3");
        s.tl(true, 'o', ' hppromo: ' + promo);
    }

}
/* End of SiteTrackingOmniture.js */
/**
* @author Partha Banerjee  
* Dt 11/10/2011
*/
/*  Begin Helper Functions */

// This function tracks data for header menus
function TrackHeaderMenuEvent(menu) 
{
    //GA
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(menu)) 
        {
            TrackEvent('Menus', 'Header', menu, '');
        }
    }
    //Omniture
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackHeaderMenu(menu);
    }
}

// This function tracks data for menu items such as categories.
function TrackHeaderMenuItemEvent(menu, menuItemName) 
{
    //GA
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(menu) && !IsNullOrEmpty(menuItemName)) 
        {
            TrackEvent('Menus', 'Menu Items', menu + ' | ' + menuItemName, '');
        }
    }
    //Omniture
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackHeaderMenuItem(menu, menuItemName);
    }
}

// This function tracks data for click event on footer links.
function TrackFooterClickEvent(link) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(link)) 
        {
            TrackEvent('Menus', 'Footer', link, '');
        }
    }
    // Omniture tracking for Footer link click
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackFooterLinkClick(link);
    }
}

// Function to track Explore All link
function TrackExploreAll(masterCategoryName) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(masterCategoryName)) 
        {
            TrackEvent('User Activities', 'Explore All', masterCategoryName, '');
        }
    }
    // Omniture tracking for Footer link click
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackExploreAllLink(masterCategoryName);
    }
}

// Function to track Headline/Image click in Header Flyout
function TrackHeadlineOrImage(masterCategoryName) 
{

    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(masterCategoryName)) 
        {
            TrackEvent('User Activities', 'Headline Or Image Click', masterCategoryName, '');
        }
    }
    // Omniture tracking for Footer link click
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackingHeadlineOrImage(masterCategory); 
    }

}
// Function to track "View More Stores and Events" link. 
function TrackViewMoreStoreEvents() 
{
    //GA
    if (Is_GA_Enabled == 'true') 
    {
        TrackEvent('Menus', 'Header', 'View More Stores and Events', '');
    }

    //Omniture
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackViewMoreStore();
    }
}

function TrackViewAllStoresInCountry(countryandLoc) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(countryandLoc)) 
        {
            TrackEvent('Menus', 'Header', 'View ALL Stores in ' + countryandLoc, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackViewAllStoresInCountry(countryandLoc);
    }
}

// Function to track sort options from different page
// Here pageName will contain the name of the page from where request is coming
// and sortOption will contain the option value that was selected. 
function TrackSortOptions(pageName, sortOption) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(sortOption)) 
        {
            TrackEvent('User Activities', 'Sort By', pageName + ' | ' + sortOption, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackSortOptions(pageName, sortOption);
    }
}
// Function to track the endeca dimension that was selected from page and the dimension value.
// Here pageName -  The page from where request came.
//      endecaDimension - Dimension that was selected.
//      selectedValue - value that was selected.
//      categoryName - category selected in categorybrowse
function TrackEndecaDimensions(pageName, endecaDimension, selectedValue, categoryName) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(endecaDimension) && !IsNullOrEmpty(selectedValue) && !IsNullOrEmpty(categoryName)) {
            TrackEvent('User Activities', 'Endeca', categoryName + ' | ' + endecaDimension + ' | ' + selectedValue, '');
        }
        else if (!IsNullOrEmpty(endecaDimension) && !IsNullOrEmpty(selectedValue)) {
            TrackEvent('User Activities', 'Endeca', endecaDimension + ' | ' + selectedValue, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackEndecaDimensions(pageName, endecaDimension, selectedValue, categoryName);
    }
}

// Function to track "View All Link" click.
function TrackLoadMoreResults(pageName, linkName) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(linkName)) 
        {
            TrackEvent('User Activities', 'View All Link', pageName + ' | ' + linkName, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackLoadMoreResults(pageName, linkName);
    }
}

// This function is used to track different display modes that are used to see items in different way
// pagename - Name of the page from where request is made.
// action - Example "Full screen overlay", "Video overlay"
// skuDescription - SKU description of the item.
function TrackItemDisplayOption(pageName, action, skuDescription) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(skuDescription) && !IsNullOrEmpty(action)) 
        {
            TrackEvent('Item Page Activities', action, skuDescription, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackItemDisplayOption(pageName, action, skuDescription);
    }
}

// This function is responsible to track click event on links in item pages and also from some other pages. 
// Since this function is being used from several pages so we have kept this as it is now. But, in future  we need to shift omniture code to SiteTrackingOmniture.js and 
// GA related code to SiteTrackingGA.js file.

function sendOmnitureClickEvent(linkname) 
{
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureClickEvent(linkname);
    }

    if (Is_GA_Enabled == 'true') 
    {
        GATrackItemActivity(linkname);
    }
}

// This function is responsible to track any activities done from Item Emails.
function sendOmnitureItemEmailClicks(omie) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(omie)) {
            GATrackItemEmailActivity(omie);
        }
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureItemEmailClicks(omie);
    }   

}

// Function to track click count on items in Recently Viewed items.
// pageName - Name of the page from where the request is made
// skuDescription - SKU description
function TrackSKUInRecentlyViewedItems(pageName, skuDescription) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(skuDescription)) 
        {
            TrackEvent('Item Page Activities', 'Recently Viewed Rings', skuDescription, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackSKUInRecentlyViewedItems(pageName, skuDescription);
    }
}

function TrackSeeItOn(pageName, action, value) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(action) && !IsNullOrEmpty(value)) 
        {
            TrackEvent('Item Page Activities', action, value, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackSeeItOn(pageName, action, value);
    }

}

// This function tracks "Learn More" links in scheduled diamond consultation.
function TrackLearnMoreLink(pageName, value) 
{

    if (Is_GA_Enabled == 'true') 
    {

        if (!IsNullOrEmpty(value)) 
        {
            TrackEvent('Consultation', 'Schedule Diamond Consultation', 'Learn More', value);
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackLearnMoreLink(pageName, value);
    }
}

// This function tracks click on "Schedule Visit" link.
function TrackScheduleVisit(pageName, action) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(action)) 
        {
            TrackEvent('Consultation', 'Schedule Diamond Consultation', 'Schedule A Visit', action);
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action)) 
        {
            OmnitureTrackScheduleVisit(pageName, action);
        }
    }
}

//This function tracks Carousel links click
// pageName - Name of the page
// carousalName - Name of the Carousal
// slideNumber - Number of clicked slide.  
function TrackCarouselClick(pageName, carousalName, slideNumber) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(carousalName) && !IsNullOrEmpty(slideNumber)) 
        {
            TrackEvent('User Activities', 'Carousel Click', pageName + ' | ' + carousalName + ' | ' + slideNumber, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackCarouselClick(pageName, carousalName, slideNumber);
    }
}

// Action can be Grid Link Click or Carousel Link Click

function TrackLinkClickFromGridOrCarousel(pageName, action, linkValue) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(linkValue)) 
        {
            TrackEvent('User Activities', action, pageName + ' | ' + linkValue, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackLinkClickFromGridOrCarousel(pageName, action, linkValue);
    }

}


// This function to track pagination from Inline shopping bag or Inline saved item.
// pageName - "Inline Shopping Bag" or "Inline Saved Item" 
// pageNumber - Numbe rof page clicked
function TrackInlineCustomerSelectionPaginate(pageName, pageNumber) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(pageNumber)) 
        {
            TrackEvent('User Activities', 'Paginate', pageName + ' | ' + pageNumber, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackInlineCustomerSelectionPaginate(pageName, pageNumber);
    }

}

// Function to track View By drop down of wish list.
// value represents the option chosen from drop down.
function TrackWishListViewBy(value) 
{
    if (Is_GA_Enabled == 'true') 
    {
        if (!IsNullOrEmpty(value)) 
        {
            TrackEvent('User Activities', 'View By', 'Full Page Saved Items' + ' | ' + value, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackWishListViewBy(value);
    }
}

// Function to do web tracking on links available in Full page wish list.

function OmnitureTrackFullSaveItemLinkClick(linkName)
{
    if (Is_GA_Enabled == 'true') 
    {
        TrackEvent('Saved Items', linkName, 'Full Page Saved Items', '');
    }
    if (Is_Omniture_Enabled == 'true') 
    {
        OmnitureTrackFullSaveItemLinkClick(linkName);
    }
}

function TrackPrintEmailClick(argPageTitle, argAction, skuValue) {
    var pageName;
    var company = "Tiffany & Co. | ";
    if (locale == "en-us-ird") {
        company = "IRIDESSE Pearls | ";
    }
    pageName = company + argPageTitle + " | ACTION | " + argAction;
    //Set Omniture variables
    s.pageName = pageName;
    s.prop8 = argPageTitle + " -> " + argAction;
    //Submit Omniture variable 	
    s.t();
    GATrackAction(argPageTitle, argAction, skuValue);
}

function TrackActionAddToShoppingBag(argPageTitle, argAction, argItem) {
     if (Is_GA_Enabled == 'true') {    
            GATrackAction(argPageTitle, argAction);        
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackActionAddToShoppingBag(argPageTitle, argAction, argItem);
    }   

}

function TrackActionMobileLoadMoreResults(argPageTitle, action) {
    if (Is_GA_Enabled == 'true') {
        TrackEvent(argPageTitle, action);
    }
    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackMobileLoadMoreResults(argPageTitle, action);
    }
}

function TrackMobileCarousel(value) {
    if (Is_GA_Enabled == 'true') {
        GATrackCaroselEvent(value)
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackMobileCarousel(value);
    }
}

function TrackExitLinkClick(linkObject, linkName) {
    if (Is_GA_Enabled == 'true') {
        GATrackExitLink(linkName)
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureExitLinkTracking(linkObject, linkName);
    }
}

function TrackSearchTerm(searchTerm) {
    if (Is_GA_Enabled == 'true') {
        GATrackSearchTerm(searchTerm)
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackSearchTerm(searchTerm);
    }

}

function TrackStoreSearchTerm(searchTerm) {
    if (Is_GA_Enabled == 'true') {
        GATrackSearchTerm(searchTerm)
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackStoreSearchTerm(searchTerm);
    }

}
function TrackViewRemainingItems(pageName, linkName) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(linkName)) {
            TrackEvent('User Activities', 'View Remaining Items', pageName + ' | ' + linkName, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackViewRemainingItems(pageName, linkName);
    }
}

function TrackVideo(videoName, action, value) {
	omnitureTrackVideo(videoName, action, value);
}

function TrackMasterCategoryShopLinksClick(masterCategory, linkName) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(masterCategory) && !IsNullOrEmpty(linkName)) {
            TrackEvent('Menus', 'MC Menu Items', masterCategory + ' | ' + linkName);
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackMasterCategoryShopLinks(masterCategory, linkName);
    }
}

function TrackWeddingBandDetailsLink(pageName, action, value) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
            TrackEvent('Engagement Item Page Activities', action, value, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackWeddingBandDetailsLink(pageName, action, value);
    }

}

function TrackSkinToneSeeItOn(pageName, action, value) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
            TrackEvent('Engagement Item Page Activities', action, value);
        }
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackSkinToneSeeItOn(pageName, action, value);
    }

}

function TrackCaratSizeSeeItOn(pageName, action, value) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
            TrackEvent('Engagement Item Page Activities', action, value);
        }
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackCaratSizeSeeItOn(pageName, action, value);
    }

}

function TrackInlineShoppingBagViewItems(argPageTitle, argAction, argItems) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineShoppingBagViewItems(argPageTitle, argAction, argItems);
    }

}

function TrackInlineViewSavedItems(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineViewSavedItems(argPageTitle, argAction);
    }

}

function TrackInlineRemoveShoppingBagItem(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineRemoveShoppingBagItem(argPageTitle, argAction);
    }

}

function TrackInlineRemoveSavedItem(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineRemoveSavedItem(argPageTitle, argAction);
    }

}

function TrackInlineShoppingBagLinksClick(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineShoppingBagLinksClick(argPageTitle, argAction);
    }

}

function TrackInlineSavedItemsLinkClick(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackInlineSavedItemsLinkClick(argPageTitle, argAction);
    }
}

function TrackSavedItemsViewBy(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackSavedItemsViewBy(argPageTitle, argAction);
    }
}

function TrackSavedItemsViewByImageSize(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        omnitureTrackSavedItemsViewByImageSize(argPageTitle, argAction);
    }
}
function TrackSKUInRecentlyViewedItemPageItems(ItemViewSource, skuDescription) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(skuDescription) && !IsNullOrEmpty(ItemViewSource)) {
            TrackEvent('Item Page Activities', ItemViewSource, skuDescription, '');
        }
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackSKUInRecentlyViewedItemPageItems(ItemViewSource, skuDescription);
    }
}

function TrackCompleteSearch(pageName, searchTerm) {
    if (Is_GA_Enabled == 'true' && Is_Omniture_Enabled == 'true') {
        if (!IsNullOrEmpty(searchTerm)) {
            GATrackCompleteSearch(searchTerm)
        }        
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackCompleteSearch(pageName, searchTerm);
    }
}

function TrackScheduleVisitWithRings(pageName, action, value) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
            TrackEvent('Consultation', 'Schedule Diamond Consultation', 'Schedule A Visit', action + " | " + value);
        }      
    }

    if (Is_Omniture_Enabled == 'true') {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(value)) {
            OmnitureTrackScheduleVisitWithRings(pageName, action, value);
        }       
    }
}

function TrackActionAddToSavedItems(argPageTitle, argAction, skuValue) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction, skuValue);
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackActionAddToSavedItems(argPageTitle, argAction);
    }

}

function TrackProductZoom(pageName, action, skuDescription) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(skuDescription) && !IsNullOrEmpty(action)) {
            TrackEvent(CATEGORY_ITEM_PAGE_ACTIVITIES, action, skuDescription, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(skuDescription)) {
            OmnitureTrackProductZoom(pageName, action, skuDescription);
        }
    }
}

function TrackItemOnRollOver(level1, level2) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(level1) && !IsNullOrEmpty(level2)) {
            TrackEvent('Category Browse', 'View Product Overlay', level1);
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        if (!IsNullOrEmpty(level1)) {
            OmnitureTrackItemOnRollOver(level1);
        }
    }
}

function TrackExpandCollapseMarketingTiles(pageName, action, sectionName) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(pageName) && !IsNullOrEmpty(action) && !IsNullOrEmpty(sectionName)) {
            TrackEvent('User Activities', action, sectionName, '');
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackExpandCollapseMarketingTiles(pageName, action, sectionName);      
    }
}

function TrackItemPageShareType(linkName) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(linkName)) {
            GATrackItemActivity(linkName);
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackItemPageShareType(linkName);
    }
}
function TrackPDPTabActivity(linkName, itemDesc) {
    if (Is_GA_Enabled == 'true') {
        if (!IsNullOrEmpty(linkName)) {
            GATrackItemActivity(linkName); 
        }
    }
    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackPDPTabActivity(linkName, itemDesc);
    }
}

function TrackDeviceInfo(category, data) {
    if (Is_GA_Enabled == 'true') {
            GATrackDeviceInfo(category, data);        
    }
    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackDeviceInfo(category, data);
    }
}

function TrackRemoveSavedItem(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackRemoveSavedItem(argPageTitle, argAction);
    }
}

function TrackRemoveSavedEngagementItem(argPageTitle, argAction) {
    if (Is_GA_Enabled == 'true') {
        GATrackAction(argPageTitle, argAction);
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackRemoveSavedEngagementItem(argPageTitle, argAction);
    }
}
function TrackMapLink(link) {
    if (Is_GA_Enabled == 'true' && !IsNullOrEmpty(link) && !IsNullOrEmpty(link.href)) {
        GATrackExitLink(link.href);
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackMapLink(link);
    }
}
function TrackHomePagePromo(promo) {
    if (Is_GA_Enabled == 'true') {
        GATrackHomePagePromo(promo);
    }

    if (Is_Omniture_Enabled == 'true') {
        OmnitureTrackHomePagePromo(promo);
    }
}
/* End of SiteTracking.js */
﻿// SearchManager.js, for managing global site search functionality

function SearchManager()
{
	this.pInstance = null;
	this.categoryArray = [];
}

SearchManager.getInstance = function ()
{
	if (!this.pInstance)
	{
		this.pInstance = new SearchManager();
	}
	return this.pInstance;
};

SearchManager.prototype.init = function () {
    var hoverOnEvent;
    if ('ontouchstart' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
        hoverOnEvent = "click";
    } else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOnEvent = "MSPointerOver";
        } else {
            hoverOnEvent = "pointerover";
        }
    } else {
        hoverOnEvent = "mouseenter";
    }

    var hoverOffEvent;
    if ('ontouchend' in document.documentElement && ($("body").hasClass("ios") || $("body").hasClass("android"))) {
        hoverOffEvent = "mouseleave";
    } else if (window.navigator.msPointerEnabled) {
        if ($("body").hasClass("ie-10")) {
            hoverOffEvent = "MSPointerOut";
        } else {
            hoverOffEvent = "pointerout";
        }
    } else {
        hoverOffEvent = "mouseleave";
    }

    var parent = this;

    //inline store/search bar code
    $("body").on(hoverOnEvent, "a.search", function (e) {
        var target = $(this);

        if (hoverOnEvent != "click") {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                parent.openSearch(target);
                clearTimeout(timer);
                timer = null;
            }, 300);
        } else {
            parent.openSearch(target);
        }
    });

    $("body").on("click", "a.search, a.searchstores", function (e) {
        if (hoverOnEvent != "click") {
            $(this).trigger(hoverOnEvent);
        }
    });

    $("body").on(hoverOffEvent, "#sitesearch", function (e) {
        if (!$("body").hasClass("ios") && e.target.nodeName != "INPUT") {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                $("#searchInput").blur();
                $("#sitesearch").fadeOut(200); $("#sitesearch input#searchInput").addClass("placeholder"); $("#sitesearch input#searchInput").val($("#sitesearch input#searchInput").attr("data-placeholder"));
                $("a.search").removeClass("selected");
                clearTimeout(timer);
                timer = null;
            }, 1250);
        }
    });

    $("body").on(hoverOffEvent, "a.search", function (e) {
        if (!$("body").hasClass("ios")) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                $("#searchInput").blur();
                $("#sitesearch").fadeOut(200); $("#sitesearch input#searchInput").addClass("placeholder"); $("#sitesearch input#searchInput").val($("#sitesearch input#searchInput").attr("data-placeholder"));
                $("a.search").removeClass("selected");
                clearTimeout(timer);
                timer = null;
            }, 1250);
        }
    });

    $("body").on(hoverOnEvent, "#sitesearch, #storesearch", function (e) {
        clearTimeout(timer);
        timer = null;
    });

    $("body").on(hoverOnEvent, "a.searchstores", function (e) {
        if (typeof locale != "undefined" && (locale == "en-US-EStr" || locale == "ja-JP-EStr")) {
            return;
        }
        var target = $(this);

        if (hoverOnEvent != "click") {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                parent.openStoreSearch(target);
                clearTimeout(timer);
                timer = null;
            }, 300);
        } else {
            e.preventDefault();
            parent.openStoreSearch(target);
        }
    });

    $("body").on(hoverOffEvent, "#storesearch", function (e) {
        if (!$("body").hasClass("ios") && e.target.nodeName != "INPUT") {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                $("#locationSearchInput").blur();
                $("#storesearch").fadeOut(200); $("#storesearch input").addClass("placeholder"); $("#storesearch input").val($("#storesearch input").attr("data-placeholder"));
                $("a.searchstores").removeClass("selected");
                clearTimeout(timer);
                timer = null;
            }, 1250);
        }
    });

    $("body").on(hoverOffEvent, "a.searchstores", function (e) {
        if (!$("body").hasClass("ios")) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                $("#locationSearchInput").blur();
                $("#storesearch").fadeOut(200); $("#storesearch input").addClass("placeholder"); $("#storesearch input").val($("#storesearch input").attr("data-placeholder"));
                $("a.searchstores").removeClass("selected");
                clearTimeout(timer);
                timer = null;
            }, 1250);
        }
    });

    $("body").on("click", "#sitesearch .close, #storesearch .close", function (e) {
        $(this).parent().fadeOut(200);
        $("#searchInput, #locationSearchInput").blur();
        $("a.searchstores").removeClass("selected");
        $("a.search").removeClass("selected");
        return false;
    });

    $(document).keydown(function (e) {
        var keyPress = (e.keyCode ? e.keyCode : e.which);
        if (keyPress == 13) {
            if ($("#sitesearch input").is(":focus")) {
                parent.searchSite();
                return false;
            }
            if ($("#storesearch input").is(":focus")) {
                parent.searchLocations();
                return false;
            }
        }
    });

    //end inline store/search bar code
};

SearchManager.prototype.openSearch = function (target) {
	if (!$("#filters.searchbar").length) {
	    $("#storesearch").fadeOut(200);
		$("#sitesearch").fadeIn(200);
		$("#flydown").fadeOut(300);
		$("#nav .flydowns a").removeClass("selected");
		$("#saved").fadeOut(300);
		$("a.searchstores, .bag a").removeClass("selected");
		$("#filters > div").slideUp(200);
		$("#filters a").removeClass("selected");
		$("#grid-popup").hide();

		$("#divAdvSearch").show();
		$("#advSearchDrops").hide();
		$("#topSearchBtn").show();
		$("#advSearchButton").hide();
		target.addClass("selected");
	}
};

SearchManager.prototype.openStoreSearch = function (target) {
    $("#sitesearch").fadeOut(200);
	$("#storesearch").fadeIn(200);
	$("#flydown").fadeOut(300);
	$("#nav .flydowns a").removeClass("selected");
	$("#saved").fadeOut(300);
	$("a.search, .bag a").removeClass("selected");
	$("#filters > div").slideUp(200);
	$("#filters a").removeClass("selected");
	target.addClass("selected");
};

SearchManager.prototype.searchLocations = function (searchTerms) {
    if (typeof (searchTerms) == "undefined") {
        searchTerms = $("#locationSearchInput").val();
    }
    if (searchTerms == "" || searchTerms == $("#locationSearchInput").attr("data-placeholder")) {
        //window.location = '/Locations/Default.aspx';
    }
    else {
        TrackStoreSearchTerm(searchTerms);
        window.location = '/Locations/StoreLocator.aspx?qs=t+' + escape(searchTerms);
    }
};

SearchManager.prototype.searchSite = function () {
    var searchTerms = $("#searchInput").val();
    if (searchTerms == $("#searchInput").attr("data-placeholder")) {
		searchTerms = "";
	}

    if ($("#advSearchDrops").length == 0 || $("#advSearchDrops").css("display") == "none") {
        if (searchTerms != "" && searchTerms != $("#searchInput").attr("data-placeholder")) {
            TrackSearchTerm(searchTerms);
		    window.location = '/Shopping/CategoryBrowse.aspx?search=1&searchkeyword=' + encodeURIComponent(searchTerms);
		}
    }
    else {
        var refinements = [];
        var selectedCollection = $("#selectCOLLECTIONS").val();
        var selectedCategory = $("#selectCATEGORIES").val();
        var selectedMaterial = $("#selectMATERIALS").val();
        var selectedGemstone = $("#selectGEMSTONES").val();
        var lowRange = $("#lowRangeSearch").val();
        var highRange = $("#highRangeSearch").val();
        var highRangePlaceholder = $("#highRangeSearch").attr("data-placeholder");
        var stateSnapshot = new StateSnapshotVO();

        if (typeof(selectedCollection) != "undefined" && selectedCollection != "") {
            refinements.push(selectedCollection);
        }
        if (typeof(selectedCategory) != "undefined" && selectedCategory != "") {
            refinements.push(selectedCategory);
        }
        if (typeof(selectedMaterial) != "undefined" && selectedMaterial != "") {
            refinements.push(selectedMaterial);
        }
        if (typeof(selectedGemstone) != "undefined" && selectedGemstone != "") {
            refinements.push(selectedGemstone);
        }
        if (lowRange != "" && lowRange != "0") {
            stateSnapshot.lowRange = lowRange;
        }
        if (highRange != "" && highRange != highRangePlaceholder) {
            stateSnapshot.highRange = highRange;
        }

        stateSnapshot.searchTerms = encodeURIComponent(searchTerms);
        stateSnapshot.refinement = refinements.join("+");

		if (searchTerms != "" || refinements.length > 0 || stateSnapshot.highRange != "") {
			// Make sure that something has been selected or typed
	        window.location = '/Shopping/CategoryBrowse.aspx?search=1&search_params=' + URLFactory.convertStateToHash(stateSnapshot);
		}
    }
};

SearchManager.prototype.openAdvancedSearch = function () {
	$("#divAdvSearch").hide();
	$("#advSearchDrops").show();
	$("#topSearchBtn").hide();
	$("#advSearchButton").show();

	this.loadAdvancedSearchData();
};

SearchManager.prototype.loadAdvancedSearchData = function () {
	var parent = this;
	if (this.categoryArray == null || this.categoryArray.length == 0) {
		$.ajax({
			url: "/Default.aspx/GetJSONAdvancedSearchFilters",
			type: "POST",
			data: '',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				parent.categoryArray = data.d.Menus;
				parent.populateAdvancedSearchData(data.d.Menus);
				updateCustomDrop("selectWrapperCOLLECTIONS");
				updateCustomDrop("selectWrapperCATEGORIES");
				updateCustomDrop("selectWrapperMATERIALS");
				updateCustomDrop("selectWrapperGEMSTONES");
				parent.updateAdvancedRefinementVisibility(data.d.Menus);
			},
			error: function (jqXHR, status, error) {

			}
		});
	}
	else {
		// Use cached service data
		parent.populateAdvancedSearchData(this.categoryArray);
		updateCustomDrop("selectWrapperCOLLECTIONS");
		updateCustomDrop("selectWrapperCATEGORIES");
		updateCustomDrop("selectWrapperMATERIALS");
		updateCustomDrop("selectWrapperGEMSTONES");
		this.updateAdvancedRefinementVisibility(this.categoryArray);
	}
};

SearchManager.prototype.updateAdvancedRefinementVisibility = function (categories) {
	var showCollections = false;
	var showCategories = false;
	var showMaterials = false;
	var showGemstones = false;

	if (typeof (categories) != "undefined" && categories != null) {
		for (var i = 0; i < categories.length; i++) {
			switch (categories[i].DimensionGroup) {
				case "COLLECTIONS":
					if (categories[i].MenuItems != null && categories[i].MenuItems.length > 0) {
						showCollections = true;
					}
					break;
				case "CATEGORIES":
					if (categories[i].MenuItems != null && categories[i].MenuItems.length > 0) {
						showCategories = true;
					}
					break;
				case "MATERIALS":
					if (categories[i].MenuItems != null && categories[i].MenuItems.length > 0) {
						showMaterials = true;
					}
					break;
				case "GEMSTONES":
					if (categories[i].MenuItems != null && categories[i].MenuItems.length > 0) {
						showGemstones = true;
					}
					break;
			}
		}
	}
	if (showCollections == false) {
		$("#ctlHeader_ctlSearch_divsearchCollections").hide();
	}
	if (showCategories == false) {
		$("#ctlHeader_ctlSearch_divsearchCategories").hide();
	}
	if (showMaterials == false) {
		$("#ctlHeader_ctlSearch_divsearchMaterials").hide();
	}
	if (showGemstones == false) {
		$("#ctlHeader_ctlSearch_divsearchGemstones").hide();
	}
};

SearchManager.prototype.populateAdvancedSearchData = function (categories) {
	var $menuHandle;
	var items;
	var menuLabel;
	if (typeof (categories) != "undefined" && categories != null) {
		for (var i = 0; i < categories.length; i++) {
			$menuHandle = $("#select" + categories[i].DimensionGroup);
			menuLabel = $menuHandle.attr("data-initial-label");
			$menuHandle.empty();
			items = categories[i].MenuItems;
			if (items == null || items.length == 0) {
				$menuHandle.hide();
			}
			else {
				$menuHandle.show();
				$menuHandle.append($('<option value="">' + menuLabel + '</option>'));
				$menuHandle.append($('<option value="---">&nbsp;</option>'));
				for (var j = 0; j < items.length; j++) {
					$menuHandle.append($('<option value="' + items[j].refinementQS + '">' + items[j].Name + '</option>'));
				}
			}
		}
		globalAjaxCallback();
	}
}

/* End of SearchManager.js */
﻿// ----------------------------------------------
// File:		StateModel.js
// Author:		Nathan Derksen
// Description:	Singleton class used to keep track of application data and state.
//				Defines getters and setters used to track and modify state data.
// Example:
// StateModel.getInstance().getProduct("1235345");
// ----------------------------------------------
function StateModel()
{
	this.pInstance = null;

	this.pCachedProducts = {
		list: [],
		lookup: {}
	};
	this.pCachedMarketingTiles	= {
		list: [],
		lookup: {}
	};

	this.pCategoryMenus			= {};
	this.pBrowseState			= URLFactory.convertHashToState(window.location.hash);
	this.pLastHash				= "";
	this.pSKU					= "";
	this.productServiceURL = "";
	this.productServiceType = "GET";
	this.layoutType = "1";
	this.numProducts = 0;
	this.currentPage = 0;
	this.isSearchMode = false;
	this.custom = {};
}

StateModel.LAYOUT_UNIFORM = "0";
StateModel.LAYOUT_TOP_LEFT = "1";
StateModel.LAYOUT_TOP_RIGHT = "2";
StateModel.LAYOUT_MARKETING = "3";
StateModel.SHOW_MORE_THRESHOLD = 72;
StateModel.DEFAULT_IMAGE_CROP = "0.2,0.2,0.6,0.6";
StateModel.SORT_CRITERIA_NEW = 3;
StateModel.SORT_CRITERIA_NAME = 4;
StateModel.SORT_CRITERIA_HIGH_LOW = 1;
StateModel.SORT_CRITERIA_LOW_HIGH = 2;
StateModel.SORT_CRITERIA_DEFAULT = 5;

// ----------------------------------------------
StateModel.getInstance = function ()
{
	if (!this.pInstance)
	{
		this.pInstance = new StateModel();
	}
	return this.pInstance;
};

// ----------------------------------------------
StateModel.prototype.getProduct = function (productId)
{
	if (this.pCachedProducts.lookup[productId])
	{
		return this.pCachedProducts.lookup[productId];
	}
	return null;
};

// ----------------------------------------------
StateModel.prototype.getProducts = function (productId)
{
	return this.pCachedProducts.list;
};

// ----------------------------------------------
StateModel.prototype.appendProducts = function (productArray)
{
	if (productArray)
	{
		var numProducts = productArray.length;

		for (var i = 0; i < numProducts; i++)
		{
			if (productArray[i].id)
			{
				this.pCachedProducts.lookup[productArray[i].id] = productArray[i];
				this.pCachedProducts.list.push(productArray[i]);
			}
		}
	}
};

// ----------------------------------------------
StateModel.prototype.removeAllProducts = function ()
{
	$(this).trigger("currentPageChangeRequested", { value: this.getCurrentPage() });
	this.pCachedProducts.list = [];
	this.pCachedProducts.lookup = {};
	$(this).trigger("currentPageChangeCompleted", { value: 0 });
}

// ----------------------------------------------
StateModel.prototype.getCurrentPage = function ()
{
	return this.pBrowseState.currentPage;
};

// ----------------------------------------------
StateModel.prototype.getStateSnapshot = function ()
{
	var browseState = this.pBrowseState;
	return browseState;
};

// ----------------------------------------------
StateModel.prototype.setStateSnapshot = function (modelState) {
	var updatedProperties = [];
	var networkUpdateNeeded = false;
	var resetProductData = false;
	var parent = this;
	var hashData;
	var url;

	for (var propertyName in modelState) {
		if (typeof (modelState[propertyName]) != "undefined") {
			updatedProperties.push(propertyName);
			if (propertyName == "overlay") {
				if (this.pBrowseState.overlay != modelState.overlay) {
					this.pBrowseState.overlay = modelState.overlay;
					if (modelState.overlay != "") {
						var splitPopupState = modelState.overlay.split("+");
						if (splitPopupState.length == 1) {
							//							openMarketingPopUpFollowup(splitPopupState[0])
						}
						else if (splitPopupState.length >= 2) {
							for (var i = 1; i < splitPopupState.length; i++) {
								splitPopupState[i] = URLFactory.hashUnescape(splitPopupState[i]);
							}
							//							openMarketingPopUpFollowup(splitPopupState[0], splitPopupState);
						}
					}
					else {
						//						closePopUpFollowup();
					}
				}
			}
			else {
				this.pBrowseState[propertyName] = modelState[propertyName];
			}
		}

		// Take a look at which properties have been updated. If any of them require
		// a network call, then set the flag to indicate this. We only want one
		// network call for all products needing updating, which is why the flag is used.
		switch (propertyName) {
			case "currentPage":
				if (modelState[propertyName] >= this.pCachedProducts.list.length) {
					// Only call service if we don't already have the data pre-cached
					networkUpdateNeeded = true;
				}
				break;
			case "category":
			case "sortCriteria":
			case "refinement":
			case "searchTerms":
			case "pkbMipsOptions":
			case "pkbHideIndividual":
			case "pkbClassificationSort":
			case "pkbMipsLocations":
			case "pkbAvailableInventory":
				networkUpdateNeeded = true;
		}

	}

	$(this).trigger("setStateSnapshotRequested", { state: this.pBrowseState, updatedProperties: updatedProperties });

	if (networkUpdateNeeded == true && this.productServiceURL != "") {
		hashData = URLFactory.convertStateToServiceHash(this.pBrowseState);
		//		url = "/shared/scripts/ecom/shopping/categoryBrowseJSON_" + this.pBrowseState.currentPage + ".txt";
		url = this.productServiceURL;
		$.ajax({
			url: url,
			type: this.productServiceType,
			data: '{"searchQueryString": "' + hashData + '", "isSearchMode": ' + this.isSearchMode + '}',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				if (data.d != null) {
					$(parent).trigger("getProductsComplete", { results: data.d, service: "getProducts", state: URLFactory.convertHashToState(hashData), updatedProperties: updatedProperties });
					$(parent).trigger("setStateSnapshotComplete", { state: URLFactory.convertHashToState(hashData), updatedProperties: updatedProperties });
				} else {
					$(parent).trigger("getProductsError");
					$(parent).trigger("setStateSnapshotComplete", { state: URLFactory.convertHashToState(hashData), updatedProperties: updatedProperties });					
				}
			},
			error: function (jqXHR, status, error) {
				$(parent).trigger("getProductsError", { status: status, message: jqXHR.responseText, service: "getProducts", state: URLFactory.convertHashToState(hashData), updatedProperties: updatedProperties });
				$(parent).trigger("setStateSnapshotComplete", { state: URLFactory.convertHashToState(hashData), updatedProperties: updatedProperties });
			}
		});
	}
	else {
		$(this).trigger("setStateSnapshotComplete", { state: this.pBrowseState, updatedProperties: updatedProperties });
	}

	//	FlashCommBridge.getInstance().send("setFromHistory", modelState.flash); // Should be done in follow-up event handler

};

// ----------------------------------------------
StateModel.prototype.getSKU = function ()
{
	return this.pSKU;
};

// ----------------------------------------------
StateModel.prototype.setSKU = function (sku)
{
	this.pSKU = sku;
};

/* End of StateModel.js */
// ----------------------------------------------
// File:		TelephoneMaskManager.js
// Author:		Aaron Koss
// Description:	Controls telephone number masking for telephone input fields
// ----------------------------------------------

function TelephoneMaskManager() {
	this.pInstance = null;
	this.telMask = "(___) ___-____";
	this.phoneNumberBuffer = this.telMask.replace(/[^_]/g, '');
}

TelephoneMaskManager.getInstance = function () {
    //var addToBagTimeout;
    if (!this.pInstance) {
        this.pInstance = new TelephoneMaskManager();
    }
    return this.pInstance;
};
// ----------------------------------------------
// Function:	TelephoneMaskManager.init()
// Author:		Aaron Koss
// Description:	Attach event handlers to phone number fields with class "applyPhoneMask"
// Inputs:		<String> customPhoneMask - optional variable overrides default US/CA phone mask
// Returns:		<Nothing>
// ----------------------------------------------
TelephoneMaskManager.init = function(customPhoneMask) {
	$(".applyPhoneMask").each(function() {
		var telephoneMask = new TelephoneMaskManager();
		if (customPhoneMask != null) {
			telephoneMask.telMask = customPhoneMask;
		}		
		if (!isAndroid()) {
			$(this).focus(function() { telephoneMask.phoneFocus(this); });
			$(this).blur(function() { telephoneMask.phoneBlur(this); });
			$(this).keydown(function(event) { telephoneMask.formatPhoneNumber(this, event); });
		} else {
			$(this).focus(function() {telephoneMask.prePhoneFormat(this)});
			$(this).blur(function() {telephoneMask.postPhoneFormat(this)});
		}
	});
	$(".applyPhoneMask").removeClass("applyPhoneMask");
}

TelephoneMaskManager.prototype.phoneFocus = function(elem) {
    if (elem.value == "") {
      elem.value = this.telMask;
      this.setPhoneNumCursor(elem,0);
    } else {
	    this.setPhoneNumCursor(elem);
	  }
}
TelephoneMaskManager.prototype.phoneBlur = function(elem) {
    if (elem.value == this.telMask) {
        elem.value = "";
    }
    
}
TelephoneMaskManager.prototype.findNextPosition = function(pos) {
  while (/[^0-9_]/g.test(this.telMask.substring(pos, pos+1)) && pos<this.telMask.length) {
  	pos++;
  }
  return pos;
}
TelephoneMaskManager.prototype.findPreviousPosition = function(pos) {
  while (/[^_]/g.test(this.telMask.substring(pos-1, pos)) && pos > 0) {
  	pos--;
  }
  return pos;
}
TelephoneMaskManager.prototype.setPhoneNumCursor = function (elem, pos) {
    if (pos == null) {
        pos = $(elem).val().indexOf("_");
        if (pos < 0) { pos = $(elem).val().length; }
    }
    if (elem.setSelectionRange) {
        elem.focus();
        setTimeout(function () {
            elem.setSelectionRange(pos, pos);
        }, 0);
    }
    else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }

}
TelephoneMaskManager.prototype.mergePhoneMask = function() {
    var tempMask = this.telMask.replace(/_/g,"x");
    var tempPos;
    for (var i=0; i<this.phoneNumberBuffer.length;i++) {
        tempPos = tempMask.indexOf("x");
        tempMask = tempMask.substr(0, tempPos) + this.phoneNumberBuffer.charAt(i) + tempMask.substr(tempPos+1);
    }
    return tempMask;
}
TelephoneMaskManager.prototype.formatPhoneNumber = function(elem, e) {
    var tempMask;
    var key;
    var tempPos;
    var selectionRange = this.getInputSelectionRange(elem);
    var newCursorPos = selectionRange.begin;
    if (e.which == 9 || e.which == 37 || e.which == 39 || e.which == 16) { return; }
    if ((e.which == 8) || (e.which == 46) || (e.which > 47 && e.which < 58) || (e.which > 95	&& e.which < 106)) {
	    // numpad keys don't match to charcode
      if (e.which > 95 && e.which < 106) {
        key = (e.which-96).toString();
      } else if (e.which == 8 || e.which == 46) {
      	key = "_";
      } else {
        key = String.fromCharCode(e.which);
      }
      //if (this.phoneNumberBuffer.indexOf("_") != -1 || selectionRange.begin != selectionRange.end) {
  		tempMask = this.mergePhoneMask();
  		if (selectionRange.begin != selectionRange.end) {
  			var underscore = "";
  			for (var i=0; i < tempMask.substring(selectionRange.begin,selectionRange.end).replace(/[^0-9_]/g, '').length -1; i++) {
  				underscore += "_";
  			}
  			if (e.which != 8 && e.which != 46) {
  				this.phoneNumberBuffer = (tempMask.substring(0,selectionRange.begin) + key + tempMask.substring(selectionRange.end,tempMask.length) + underscore).replace(/[^0-9_]/g, '');
  				newCursorPos = this.findNextPosition(selectionRange.begin)+1;
  			} else {
  				this.phoneNumberBuffer = (tempMask.substring(0,selectionRange.begin) + tempMask.substring(selectionRange.end,tempMask.length) + key + underscore).replace(/[^0-9_]/g, '');
  			}
  		} else if (e.which == 8 && selectionRange.begin > 0) {
  				selectionRange.begin = this.findPreviousPosition(selectionRange.begin);
  				if (selectionRange.begin > 0) {
						this.phoneNumberBuffer = (tempMask.substring(0,selectionRange.begin-1) + tempMask.substring(selectionRange.begin,tempMask.length) + key).replace(/[^0-9_]/g, '');
					}
					if (selectionRange.begin-1 <= 0) {
						newCursor = this.findNextPosition(0);
					} else {
						newCursorPos = selectionRange.begin-1;
					}
			} else if(e.which == 46 && selectionRange.begin < tempMask.length) {
				selectionRange.begin = this.findNextPosition(selectionRange.begin);
				this.phoneNumberBuffer = (tempMask.substring(0,selectionRange.begin) + tempMask.substring(selectionRange.begin+1,tempMask.length) + key).replace(/[^0-9_]/g, '');				
			} else if (this.phoneNumberBuffer.indexOf("_") != -1 && selectionRange.begin != tempMask.length) {
				selectionRange.begin = this.findNextPosition(selectionRange.begin);
				if (tempMask.substring(selectionRange.begin, selectionRange.begin+1) == "_") {
					this.phoneNumberBuffer = (tempMask.substring(0,selectionRange.begin) + key + tempMask.substring(selectionRange.begin+1,tempMask.length)).replace(/[^0-9_]/g, '');
				} else {
					var nextPosition = tempMask.substring(selectionRange.begin, tempMask.length).indexOf("_") + selectionRange.begin;
					this.phoneNumberBuffer = (tempMask.substring(0,selectionRange.begin) + key + tempMask.substring(selectionRange.begin,nextPosition)+tempMask.substring(nextPosition+1,tempMask.length)).replace(/[^0-9_]/g, '');
				}
				newCursorPos = this.findNextPosition(selectionRange.begin+1);
			} 
	  	//}		
      elem.value = this.mergePhoneMask();    		    
    }
    e.preventDefault();
    this.setPhoneNumCursor(elem, newCursorPos);
}
TelephoneMaskManager.prototype.prePhoneFormat = function(elem) {
	$(elem).val($(elem).val().replace(/[^0-9]/g, ''));
}
TelephoneMaskManager.prototype.postPhoneFormat = function(elem) {
    var phoneNum = $(elem).val().replace(/[^0-9]/g, '');
    if (phoneNum == "") { $(elem).val(""); return; } 
	var newPhone = "(";
	if (typeof phoneNum.substring(0,1) != "undefined" && phoneNum.substring(0,1) == "1") {
		phoneNum = phoneNum.substring(1,phoneNum.length);
	}
	for (var i=0; i < 10; i++) {
		if (i == 3) {newPhone += ") ";}
		if (i == 6) {newPhone += "-";}
		if (typeof phoneNum.substring(i,i+1) != "undefined") {
			newPhone += phoneNum.substring(i,i+1);
		} else {
			newPhone += "_";
		}
	}
	$(elem).val(newPhone);
	$(elem).valid();
}

TelephoneMaskManager.prototype.getInputSelectionRange = function (elem) {
    if ($(elem)[0].setSelectionRange) {
        begin = $(elem)[0].selectionStart;
        end = $(elem)[0].selectionEnd;
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        begin = 0 - range.duplicate().moveStart('character', -100000);
        end = begin + range.text.length;
    }
    return { begin: begin, end: end };
}

$(document).ready(function() { 
	//apply Telephone Mask
	if (typeof locale != "undefined" && (locale == "en-US" || locale == "en-CA" || locale == "fr-CA")) {
		TelephoneMaskManager.init();
	}
});

/* End of TelephoneMaskManager.js */
﻿// URLFactory.js

function StateSnapshotVO()
{
	this.numProductsVisible = 0;
	this.currentPage = 0;
	this.pageSize = "1000";
	this.selectedTab = "";
	this.category = "";
	this.sortCriteria = 9999;
	this.refinement = "";
	this.searchTerms = "";
	this.onlyItems = "1";
	this.isNormalized = "";
	this.popup = "";
	this.flash = "";
	this.custom = "";
	this.selectedImage = "";
	this.selectedFilters = "";
	this.lowRange = "";
	this.highRange = "";
	this.pkbMipsOptions = "";
	this.pkbHideIndividual = "";
	this.pkbClassificationSort = "";
	this.pkbMipsLocations = "";
	this.pkbAvailableInventory = "";
	this.relatedItemSku = "";
	this.soldIR = "";
	this.pagePosition = "";
}

// ----------------------------------------------
// File:		URLFactory.js
// Author:		Nathan Derksen
// Description:	Class to handle converting URL parameters to StateSnapshotVO
// Example:
// var stateObj = URLFactory.convertHashToState(window.location.href);
// ----------------------------------------------


// ----------------------------------------------
// Function:	URLFactory()
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<None>
// Returns:		<Nothing>
// ----------------------------------------------
function URLFactory()
{
}

var intToExtStateMap = {
	currentPage:"p",
	currentProductGrid:"cg",
	category:"c",
	sortCriteria:"s",
	refinement:"r",
	pageSize:"n",
	searchTerms:"t",
	relatedItemSku:"ri",
	onlyItems:"ni",
	isNormalized:"x",
	popup:"pu",
	flash:"f",
	id:"id",
	selectedFilters:"k",
	lowRange:"lr",
	highRange:"hr",
	soldIR:"mi",
	pagePosition:"pp"
};

var extToIntStateMap = {
	p:"currentPage",
	cg:"currentProductGrid",
	c:"category",
	s:"sortCriteria",
	r:"refinement",
	n:"pageSize",
	t:"searchTerms",
	ri:"relatedItemSku",
	ni:"onlyItems",
	x:"isNormalized",
	pu:"popup",
	f:"flash",
	id:"id",
	k:"selectedFilters",
	lr:"lowRange",
	hr:"highRange",
	mi:"soldIR",
	pp:"pagePosition"
};


// ----------------------------------------------
// Function:	ProductFactory.convertHashToState()
// Author:		Nathan Derksen
// Description:	Converts a URL with parameters in an anchor to fill a StateSnapshotVO object
// Inputs:		<String> url: The URL from the address bar
// Returns:		<StateSnapshotVO>: An object with properties to hold the state values
// ----------------------------------------------
URLFactory.convertHashToState = function(hash)
{
	var snapshot = new StateSnapshotVO();
	var splitURL;
	var anchor;
	var hashArray;
	var splitItem;
	var mappedProperty;
	var valueName;

	if (hash)
	{
		hash = hash.split("#").join("");
		hashArray = hash.split("-");
		for (var i=0; i < hashArray.length; i++)
		{
			splitItem = hashArray[i].split("+");
			valueName = splitItem[0];
			if (splitItem.length >= 2)
			{
				mappedProperty = extToIntStateMap[valueName];
				splitItem.shift();
				
				if (mappedProperty)
				{
					switch(mappedProperty.toLowerCase())
					{
						case "currentpage":
							snapshot.currentPage = Number(unescape(splitItem.join("+"))) - 1;
							break;							
						case "currentproductgrid":
							snapshot.currentProductGrid = unescape(splitItem.join("+"));
							break;
						case "category":
							snapshot.category = unescape(splitItem.join("+"));
							break;
						case "sortcriteria":
							snapshot.sortCriteria = unescape(splitItem.join("+"));
							break;
						case "refinement":
							snapshot.refinement = unescape(splitItem.join("+"));
							break;
						case "pagesize":
							snapshot.pageSize = unescape(splitItem.join("+"));
							break;
						case "searchterms":
							snapshot.searchTerms = unescape(splitItem.join("+"));
							break;
						case "relateditemsku":
							snapshot.relatedItemSku = unescape(splitItem.join("+"));
							break;
						case "onlyitems":
							snapshot.onlyItems = unescape(splitItem.join("+"));
							break;
						case "isnormalized":
							snapshot.isNormalized = unescape(splitItem.join("+"));
							break;
						case "popup":
							snapshot.popup = unescape(splitItem.join("+"));
							break;
						case "flash":
							snapshot.flash = unescape(splitItem.join("+"));
							break;
						case "lowrange":
							snapshot.lowRange = unescape(splitItem.join("+"));
							break;
						case "highrange":
							snapshot.highRange = unescape(splitItem.join("+"));
							break;
						case "soldir":
							snapshot.soldIR = unescape(splitItem.join("+"));
							break;
						case "pageposition":
							snapshot.pagePosition = unescape(splitItem.join("+"));
							break;
					}
				}
			}
		}
	}
	return snapshot;
};

// ----------------------------------------------
// Function:	ProductFactory.convertStateToHash()
// Author:		Nathan Derksen
// Description:	Converts a StateSnapshotVO object to a URL with parameters in an anchor
// Inputs:		<StateSnapshotVO> stateSnapshot: An object with properties to hold the state values
// Returns:		<String>: The URL from the address bar
// ----------------------------------------------
URLFactory.convertStateToHash = function(stateSnapshot)
{
	var stateArray = new Array();
	var newStateStr = "";

	var productGrid = StateModel.getInstance().getProducts();
	var sortCriteria = "";
	var sampleQueryString = "";
	
	if (productGrid.length > 0) {
		if (typeof(productGrid[0].qs) != "undefined") {
			sampleQueryString = productGrid[0].qs;
		}
		else {
			sampleQueryString = productGrid[0].ItemQS;
		}
		sortCriteria = URLFactory.extractValue(sampleQueryString, "sortCriteria");
	}

	for (var item in stateSnapshot)
	{
		switch(item.toLowerCase())
		{
			case "currentproductgrid":
			case "category":
			case "refinement":
			case "pagesize":
			case "searchterms":
			case "relateditemsku":
			case "soldir":
			case "onlyitems":
			case "isnormalized":
			case "popup":
			case "flash":
			case "lowrange":
			case "highrange":
			case "pageposition":
				stateArray.push(intToExtStateMap[item] + "+" + escape(stateSnapshot[item]));
				break;
			case "currentpage":
				var offsetNum = String(Number(stateSnapshot[item]) + 1);
				stateArray.push(intToExtStateMap[item] + "+" + escape(offsetNum));
				break;
			case "sortcriteria":
				if (stateSnapshot[item] == "9999" || stateSnapshot[item] == 9999)
				{
					stateArray.push(intToExtStateMap[item] + "+" + sortCriteria);
				}
				else
				{
					stateArray.push(intToExtStateMap[item] + "+" + escape(stateSnapshot[item]));
				}
				break;
		}
	}
	
	newStateStr = stateArray.join("-");
	return newStateStr;
};

// ----------------------------------------------
// Function:	ProductFactory.convertStateToServiceHash()
// Author:		Nathan Derksen
// Description:	Converts a StateSnapshotVO object to a hash that can be consumed by a service (eg: removes "currentProductGrid" and makes pages 1 based instead of 0 based)
// Inputs:		<StateSnapshotVO> stateSnapshot: An object with properties to hold the state values
// Returns:		<String>: The URL from the address bar
// ----------------------------------------------
URLFactory.convertStateToServiceHash = function(stateSnapshot)
{
	var stateArray = new Array();
	var newStateStr = "";

	var productGrid = StateModel.getInstance().getProducts();
	var sortCriteria = "";
	var sampleQueryString = "";
	
	if (productGrid.length > 0)
	{
		if (typeof(productGrid[0].qs) != "undefined") {
			sampleQueryString = productGrid[0].qs;
		}
		else {
			sampleQueryString = productGrid[0].ItemQS;
		}
		sortCriteria = URLFactory.extractValue(sampleQueryString, "sortCriteria");
	}
	
	for (var item in stateSnapshot)
	{
		switch(item.toLowerCase())
		{
			case "category":
			case "refinement":
			case "pagesize":
			case "searchterms":
			case "relateditemsku":
			case "soldir":
			case "onlyitems":
			case "isnormalized":
			case "lowrange":
			case "highrange":
			case "pageposition":
			    stateArray.push(intToExtStateMap[item] + "+" + encodeURI(stateSnapshot[item]));
				break;
			case "currentpage":
				var offsetNum = String(Number(stateSnapshot[item]) + 1);
				stateArray.push(intToExtStateMap[item] + "+" + encodeURI(offsetNum));
				break;
			case "sortcriteria":
				if (stateSnapshot[item] == "9999" || stateSnapshot[item] == 9999)
				{
					stateArray.push(intToExtStateMap[item] + "+" + sortCriteria);
				}
				else
				{
				    stateArray.push(intToExtStateMap[item] + "+" + encodeURI(stateSnapshot[item]));
				}
				break;
		}
	}
	
	newStateStr = stateArray.join("-");
	return newStateStr;
};

// ----------------------------------------------
// Function:	ProductFactory.convertHashToServiceHash()
// Author:		Nathan Derksen
// Description:	Cleans up the hash contents for sending to a service (eg: removes "currentProductGrid" and makes pages 1 based instead of 0 based.
// Inputs:		<StateSnapshotVO> stateSnapshot: An object with properties to hold the state values
// Returns:		<String>: The URL from the address bar
// ----------------------------------------------
URLFactory.convertHashToServiceHash = function(hash)
{
	var tempState = URLFactory.convertHashToState(hash);
	return URLFactory.convertStateToServiceHash(tempState);
};


// ----------------------------------------------
// ----------------------------------------------
URLFactory.updateHash = function(inputHash, criteria, value)
{
	var hashArray = inputHash.split("-");
	var splitItem;
	
	for (var i=0; i < hashArray.length; i++)
	{
		splitItem = hashArray[i].split("+");
		if (extToIntStateMap[splitItem[0]] == criteria)
		{
			hashArray[i] = splitItem[0] + "+" + value;
		}
	}
	return hashArray.join("-");
};

// ----------------------------------------------
// ----------------------------------------------
URLFactory.updateQuery = function(inputQuery, criteria, value)
{
	var queryArray = inputQuery.split("&");
	var splitItem;
	var itemFound = false;
	
	for (var i=0; i < queryArray.length; i++)
	{
		splitItem = queryArray[i].split("=");
		if (splitItem[0] == criteria)
		{
			queryArray[i] = splitItem[0] + "=" + value;
			itemFound = true;
		}
	}
	if (itemFound == false)
	{
		queryArray.push(criteria + "=" + value);
	}
	return queryArray.join("&");
};

// ----------------------------------------------
// ----------------------------------------------
URLFactory.extractValue = function(inputHash, criteria)
{
	var hashArray = inputHash.split("-");
	var splitItem;
	var valueName;
	
	for (var i=0; i < hashArray.length; i++)
	{
		splitItem = hashArray[i].split("+");
		valueName = splitItem[0];
		splitItem.shift();
		if (extToIntStateMap[valueName] == criteria)
		{
//		alert("extractValue: " + criteria + ":" + splitItem.join("+"));
			return splitItem.join("+");
		}
	}
	return "";
};

// ----------------------------------------------
// ----------------------------------------------
URLFactory.extractQueryStringValue = function(inputQueryString, criteria)
{
	var queryStringArray = inputQueryString.split("?").join("").split("&");
	var splitItem;
	
	for (var i=0; i < queryStringArray.length; i++)
	{
		splitItem = queryStringArray[i].split("=");
		if (splitItem[0].toLowerCase() == criteria.toLowerCase())
		{
			return splitItem[1];
		}
	}
	return "";
};

// ----------------------------------------------
// ----------------------------------------------
URLFactory.hashEscape = function(oldHash)
{
	var newHash = oldHash;
	newHash = escape(newHash);
	newHash = newHash.split("-").join("%45");
	newHash = newHash.split("+").join("%43");
	return newHash;
}

// ----------------------------------------------
// ----------------------------------------------
URLFactory.hashUnescape = function(oldHash)
{
	var newHash = oldHash;
	newHash = newHash.split("%45").join("-");
	newHash = newHash.split("%43").join("+");
	newHash = unescape(newHash);
	return newHash;
}

URLFactory.appendQueryString = function (key, value, isFirst) {
	if (isFirst == true) {
		return key + "=" + value;
	} else {
		return "&" + key + "=" + value;
	}
}

URLFactory.scene7ImageURL = function (image, preset, sharpen, crop) {
	var base = templateStrings.baseScene7ImageURL;
	var missingImage = (templateStrings.defaultScene7NoImageName == "") ? "" : "&defaultImage=" + templateStrings.defaultScene7NoImageName + "&&";
	var url = "";

	if (preset.indexOf("$") == -1) {
		preset = "$" + preset + "$";
	}

	if (typeof (image) == "undefined" || image == null || image == "") {
		image = templateStrings.defaultScene7NoImageName;
		sharpen = "";
		crop = "";
	}
	else {
		if (typeof (sharpen) != "undefined" && sharpen != null && sharpen != "") {
			sharpen = "&op_usm=" + sharpen;
		}
		else {
			sharpen = "";
		}

		if (typeof (crop) != "undefined" && crop != null && crop != "") {
			if (preset == "$EcomBrowseM$" || preset == "$EcomBrowseL$" || preset == "$EcomInlineM$") {
				crop = "&$cropvalue=" + crop;
			}
			else {
				crop = "&cropN=" + crop;
			}
		}
		else {
			crop = "";
		}

	}

	url = base + image + "?" + preset + sharpen + crop + missingImage;

	return url;
}

URLFactory.hasSubDomain = function (url) {
    // IF THERE, REMOVE WHITE SPACE FROM BOTH ENDS
    url = url.replace(new RegExp(/^\s+/), ""); // START
    url = url.replace(new RegExp(/\s+$/), ""); // END

    // IF FOUND, CONVERT BACK SLASHES TO FORWARD SLASHES
    url = url.replace(new RegExp(/\\/g), "/");

    // IF THERE, REMOVES 'http://', 'https://' or 'ftp://' FROM THE START
    url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i), "");

    // IF THERE, REMOVES 'www.' FROM THE START OF THE STRING
    url = url.replace(new RegExp(/^www\./i), "");

    // REMOVE COMPLETE STRING FROM FIRST FORWARD SLASH ON
    url = url.replace(new RegExp(/\/(.*)/), "");

    // REMOVES '.??.??' OR '.???.??' FROM END - e.g. '.CO.UK', '.COM.AU'
    if (url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))) {
        url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i), "");

        // REMOVES '.??' or '.???' or '.????' FROM END - e.g. '.US', '.COM', '.INFO'
    } else if (url.match(new RegExp(/\.[a-z]{2,4}$/i))) {
        url = url.replace(new RegExp(/\.[a-z]{2,4}$/i), "");
    }
    // CHECK TO SEE IF THERE IS A DOT '.' LEFT IN THE STRING
    var subDomain = (url.match(new RegExp(/\./g))) ? true : false;

    return (subDomain);
};

   /* End of URLFactory.js */
﻿// VideoPlayer.js

function VideoPlayer(elementId) {
	this.elementId = elementId;
	this.dragInProgress = false;
	this.progressTracked = -1;
	this.props = {};
}

VideoPlayer.CONFIG_VALIDATION_ERROR = "configValidationError";
VideoPlayer.CONFIG_LOAD_ERROR = "configLoadError";

VideoPlayer.prototype.embedVideo = function (configData) {

	var parent = this;
	var testVideo = document.createElement('video');
	var canPlayHtml5 = false;

	if (!!testVideo.canPlayType && (testVideo.canPlayType("video/mp4") != "" || testVideo.canPlayType("video/ogg") != "")) {
		canPlayHtml5 = true;
	}

	this.props = {
		playerWidth: 800,
		playerHeight: 480,
		videoURL: "/Shared/Videos/DreamMaker/DreamMaker.mp4",
		videoURLMobile: "",
		videoURLOgg: "",
		captionURL: "",
		videoPosterURL: "",
		title: "",
		autoPlay: true,
		showReplay: true,
		showTime: true
	}

	// Check for <video>
	$("#btnShare").click(function () {

		if ($("#divMiniPopUpShare").css('display') == "none") {
			$("#divMiniPopUpShare").css('display', 'block');
			$("#btnShare").css('color', 'black');
			changeBulletStateShare();
		}
		else {
			$("#divMiniPopUpShare").css('display', 'none');
			$("#btnShare").css('color', '#7F7F7F');
		}
		return false;
	});

	if ($("body").attr('id') == "overlay") {
		//		if (usingIE6) {
		//			$("div#divMiniPopUpShare").css({ "left": "445px", "top": "-3px" });
		//		}
		if (isMac && (agt.indexOf('firefox') != -1)) {
			$("div#divMiniPopUpShare").css({ "left": "445px", "top": "-52px" });
		}
		else {
			$("div#divMiniPopUpShare").css({ "left": "445px", "top": "-2px" });
		}
	}
	//	else {
	//		if (usingIE6) { $("div#divMiniPopUpShare").css({ "top": "40px" }); }
	//	}


	if (typeof (configData) == "string") {
		// A URL has been provided, load the URL to get the config data
		$.ajax({
			url: configData,
			type: 'GET',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				var defaultData = null;
				var overrideData = null;
				var error = false;
				var baseImageUrl = templateStrings.baseScene7ImageURL;
				if (typeof (templateStrings.baseScene7VideoURL) != "undefined" && templateStrings.baseScene7VideoURL != null && templateStrings.baseScene7VideoURL != "") {
					baseImageUrl = templateStrings.baseScene7VideoURL;
				}

				if (data == null || typeof (data.d) == "undefined" || data.d == null) {
					error = true;
					$(parent).trigger("embedError", { errorType: VideoPlayer.CONFIG_VALIDATION_ERROR });
				}
				else {
					for (var i = 0; i < data.d.length; i++) {
						if (data.d[i].locale.toLowerCase() == "default") {
							if (parent.isConfigDataValid(data.d[i]) == true) {
								defaultData = data.d[i];
							}
						}
						if (data.d[i].locale.toLowerCase() == locale.toLowerCase()) {
							if (parent.isConfigDataValid(data.d[i]) == true) {
								overrideData = data.d[i];
							}
						}
					}
					$.extend(parent.props, defaultData);
					$.extend(parent.props, overrideData);

					if (typeof (parent.props.videoPosterURL) == "undefined" || parent.props.videoPosterURL == null || parent.props.videoPosterURL == "") {
						if (Number(parent.props.playerWidth) / Number(parent.props.playerHeight) < 1.4) {
							parent.props.videoPosterURL = baseImageUrl + "video_poster_default_standard?wid=1440&hei=1080";
						}
						else {
							parent.props.videoPosterURL = baseImageUrl + "video_poster_default_wide?wid=1920&hei=1080";
						}
					} else if (parent.props.videoPosterURL.indexOf("/") == -1) {
						// Just the ID was provided, so assume Scene7 use and derive the poster frame URL
						if (Number(parent.props.playerWidth) / Number(parent.props.playerHeight) < 1.4) {
							parent.props.videoPosterURL = baseImageUrl + parent.props.videoPosterURL + "?wid=1440&hei=1080";
						}
						else {
							parent.props.videoPosterURL = baseImageUrl + parent.props.videoPosterURL + "?wid=1920&hei=1080";
						}
					}


					if (parent.props.videoURL != "" && parent.props.videoURL != null && parent.props.videoURL.indexOf("/") == -1) {
						// Just the video ID was provided, so assume Scene7 use and derive the URLs
						parent.deriveVideoURLs(parent.props.videoURL);
					}

					if (defaultData == null && overrideData == null) {
						error = true;
						$(parent).trigger("embedError", { errorType: VideoPlayer.CONFIG_VALIDATION_ERROR });
					}
					else {
						if (canPlayHtml5 == true) {
							parent.embedHTML5Video(parent.props);
						}
						else {
							// Need to account for the height of the control bar in calculating 
							// the height of the Flash video playback component
							parent.props.playerHeight += 30;
							parent.embedFlashVideo(parent.props);
						}
					}
				}
				if (error == false) {
					$(parent).trigger("embedComplete", { properties: parent.props });
				}
			},
			error: function (jqXHR, status, error) {
				$(parent).trigger("embedError", { errorType: VideoPlayer.CONFIG_LOAD_ERROR });
			}
		});
	}
	else {
		// An object representing the config data to use has been provided
		if (this.isConfigDataValid(configData) == true) {
			$.extend(parent.props, configData);

			if (parent.props.videoURL != "" && parent.props.videoURL != null && parent.props.videoURL.indexOf("/") == -1) {
				// Just the video ID was provided, so assume Scene7 use and derive the URLs
				parent.deriveVideoURLs(parent.props.videoURL);
			}

			if (canPlayHtml5) {
				parent.embedHTML5Video(parent.props);
			}
			else {
				// Need to account for the height of the control bar in calculating 
				// the height of the Flash video playback component
				parent.props.playerHeight += 30;
				parent.embedFlashVideo(parent.props);
			}
			$(parent).trigger("embedComplete", { properties: parent.props });
		}
		else {
			// Show error message
			$(parent).trigger("embedError", { errorType: VideoPlayer.CONFIG_VALIDATION_ERROR });
		}
	}

	var $element = $("#" + this.elementId);
	var html = "";
};

VideoPlayer.prototype.embedFlashVideo = function (configData) {

	var autoPlay = configData.autoPlay;
	var parent = this;
	var videoHolderHnd;
	var flashHolder;
	var flashVars;

	if (configData.videoPosterURL != "") {
		$('#' + this.elementId + " .video-poster").html('<img src="' + configData.videoPosterURL + '" width="' + configData.playerWidth + '" height="' + configData.playerHeight + '" alt="" />');
		if (configData.autoPlay == false) {
			$('#' + this.elementId + " .video-poster").show();
		}
		else {
			$('#' + this.elementId + " .video-poster").hide();
		}
	}

	flashVars = "video=" + configData.videoURL;
	flashVars += "&subtitles=" + configData.captionURL;
	flashVars += "&audio=" + configData.audio;
	flashVars += "&autoplay=" + configData.autoPlay;
	flashVars += "&showreplay=" + configData.showReplay;
	flashVars += "&showtime=" + configData.showTime;
	flashVars += "&usearrow=true";
	flashVars += "&strokecolor=#ffffff";

	if ($('#' + this.elementId + " .video").length > 0) {
		videoHolderHnd = $('#' + this.elementId + " .video")[0];
		flashHolder = new FlashAPI(videoHolderHnd);
		flashHolder.setFlashVersion(8, 0, 0);
		flashHolder.setAttribute("src", "/shared/videos/player/video-player.swf");
		flashHolder.setAttribute("width", configData.playerWidth);
		flashHolder.setAttribute("height", configData.playerHeight);
		flashHolder.setAttribute("bgcolor", "#FFFFFF");
		flashHolder.setAttribute("wmode", "transparent");
		flashHolder.setAttribute("flashVars", flashVars);
		flashHolder.setAlternateRedirect("/Common/Errors/Flash.aspx");
		flashHolder.generateFlash();

		$('#' + this.elementId + ' .video-poster img').bind('click', function () {
			var tempHTML = $(videoHolderHnd).html();

			$('#' + parent.elementId + " .video-poster").hide();

			// Grab the HTML for the Flash player, set autoPlay to true so that when it's recreated it plays
			tempHTML = tempHTML.split("autoplay=false").join("autoplay=true");
			$(videoHolderHnd).html("");
			$(videoHolderHnd).html(tempHTML);
		});
	}

	setTimeout(function () { $("#" + parent.elementId + " .controls").hide(); }, 10);
};

VideoPlayer.prototype.embedHTML5Video = function (configData) {

	var parent = this;
	var videoHTML = "";
//	var videoURL = configData.videoURL;

//	if ((isIPad() == true || isIPhone() == true || isAndroid() == true) && configData.videoURLMobile != "") {
//		videoURL = configData.videoURLMobile;
//	}

	if (configData.videoPosterURL != "") {
		$('#' + parent.elementId + " .video-poster").html('<img src="' + configData.videoPosterURL + '" width="' + configData.playerWidth + '" height="' + configData.playerHeight + '" alt="" />');
		$('#' + parent.elementId + " .video-poster").show();
	}

	videoHTML = '<video id="' + this.elementId + '_video" onclick="play();" width="' + configData.playerWidth + '" height="' + configData.playerHeight + '">';
	// Add a source element for each video type, the browswer will pick the first one that is supported on that browser
	if (typeof (configData.videoURLMobile) != "undefined" && configData.videoURLMobile != null && configData.videoURLMobile != "") {
		videoHTML += '<source src="' + configData.videoURLMobile + '" type="application/x-mpegURL"></source>';
	}
	if (typeof (configData.videoURL) != "undefined" && configData.videoURL != null && configData.videoURL != "") {
		videoHTML += '<source src="' + configData.videoURL + '" type="video/mp4"></source>';
	}
	if (typeof (configData.videoURLOgg) != "undefined" && configData.videoURLOgg != null && configData.videoURLOgg != "") {
		videoHTML += '<source src="' + configData.videoURLOgg + '" type="video/ogg"></source>';
	}
	videoHTML += '</video>';

	$("#" + this.elementId + " .video").html(videoHTML);
	if (configData.captionURL != "") {
		this.setupHTML5Captions(configData);
	}

	$('#' + this.elementId + ' .video-back').bind('click', function () {
		$('#' + parent.elementId + " video")[0].currentTime -= 10;
		$('#' + parent.elementId + " video")[0].play();
	});

	$('#' + this.elementId + ' .video-forward').bind('click', function () {
		$('#' + parent.elementId + " video")[0].currentTime += 10;
		$('#' + parent.elementId + " video")[0].play();
	});

	$('#' + this.elementId + ' .video-play').bind('click', function () {
		$('#' + parent.elementId + ' .video-play').hide();
		$('#' + parent.elementId + ' .video-pause').show();
		$('#' + parent.elementId + " .video-poster").hide();
		$('#' + parent.elementId + " video")[0].play();
	});

	$('#' + this.elementId + ' .video-pause').bind('click', function () {
		$('#' + parent.elementId + ' .video-play').show();
		$('#' + parent.elementId + ' .video-pause').hide();
		$('#' + parent.elementId + " video")[0].pause();
	});

	$('#' + this.elementId + ' .video-mute').bind('click', function () {
		$('#' + parent.elementId + ' .video-mute').hide();
		$('#' + parent.elementId + ' .video-unmute').show();
		$('#' + parent.elementId + " video")[0].muted = true;
	});

	$('#' + this.elementId + ' .video-unmute').bind('click', function () {
		$('#' + parent.elementId + ' .video-mute').show();
		$('#' + parent.elementId + ' .video-unmute').hide();
		$('#' + parent.elementId + " video")[0].muted = false;
	});

	$('#' + this.elementId + ' .video-seek').bind('click', function (e) {
		var position = e.clientX - $(this).offset().left;
		var width = $('#' + parent.elementId + ' .video-seek').width();
		var percent = position / width;
		var duration = $('#' + parent.elementId + " video")[0].duration;
		var currentTime = Math.round(percent * duration)
		$('#' + parent.elementId + " video")[0].currentTime = currentTime;
		$('#' + parent.elementId + " video")[0].play();
	});

	$('#' + this.elementId + ' .video-poster img').bind('click', function () {
		$('#' + parent.elementId + ' .video-play').hide();
		$('#' + parent.elementId + ' .video-pause').show();
		$('#' + parent.elementId + " .video-poster").hide();
		$('#' + parent.elementId + " video")[0].play();
	});

	$('#' + this.elementId + ' .video-playhead').draggable({
		axis: "x",
		containment: "parent",
		start: function (event, ui) {
			parent.dragInProgress = true;
			$('#' + parent.elementId + " video")[0].pause();
		},
		drag: function (event, ui) {
			var position = ui.position.left;
			$('#' + parent.elementId + ' .video-play-progress').width((position + 5) + "px");
		},
		stop: function (event, ui) {
			parent.dragInProgress = false;
			var position = ui.position.left;
			var width = $('#' + parent.elementId + ' .video-seek').width();
			var percent = position / width;
			var duration = $('#' + parent.elementId + " video")[0].duration;
			$('#' + parent.elementId + " video")[0].currentTime = Math.round(percent * duration);
			$('#' + parent.elementId + " video")[0].play();
		}
	});

	$('#' + this.elementId + ' video').bind('timeupdate', function () {
		if (parent.dragInProgress == false) {
			var currentTime = Math.round(this.currentTime);
			var totalTime = this.duration;
			var numMinutes = Math.floor(currentTime / 60);
			var numSeconds = currentTime % 60;
			var percentProgress;
			if (numSeconds < 10) {
				$('#' + parent.elementId + ' .video-timer').html(numMinutes + ":0" + numSeconds);
			}
			else {
				$('#' + parent.elementId + ' .video-timer').html(numMinutes + ":" + numSeconds);
			}
			if (this.currentTime != null && this.currentTime > 0) {
				percentProgress = currentTime / totalTime * 100;
				$('#' + parent.elementId + ' .controls .video-play-progress').css("width", percentProgress + "%");
				$('#' + parent.elementId + ' .controls .video-playhead').css("left", ($('#' + parent.elementId + ' .controls .video-play-progress').width() - 5) + "px");

				if (percentProgress > 0 && parent.progressTracked == -1) {
					parent.progressTracked = 0;
					TrackVideo(parent.props.title, "Video Length", totalTime);
					TrackVideo(parent.props.title, "Play", "Started");
				}
				else if (percentProgress > 25 && parent.progressTracked == 0) {
					parent.progressTracked = 25;
					TrackVideo(parent.props.title, "Play", "25%");
				}
				else if (percentProgress > 50 && parent.progressTracked == 25) {
					parent.progressTracked = 50;
					TrackVideo(parent.props.title, "Play", "50%");
				}
				else if (percentProgress > 75 && parent.progressTracked == 50) {
					parent.progressTracked = 75;
					TrackVideo(parent.props.title, "Play", "75%");
				}
				else if (percentProgress >= 95 && parent.progressTracked == 75) {
					parent.progressTracked = 100;
					TrackVideo(parent.props.title, "Play", "Complete");
				}
			}

		}
	});

	$('#' + this.elementId + ' video').bind('progress', function () {
		var percentProgress = 0;

		if (this.buffered.length > 0 && this.buffered.end && this.duration) {
			percentProgress = this.buffered.end(0) / this.duration * 100;
		} else if (this.bytesTotal != undefined && this.bytesTotal > 0 && this.bufferedBytes != undefined) {
			percentProgress = this.bufferedBytes / this.bytesTotal * 100;
		}

		$('#' + parent.elementId + ' .controls .video-load-progress').css("width", percentProgress + "%");
	});

	$('#' + this.elementId + ' video').bind('play', function () {
		$('#' + parent.elementId + ' .video-play').hide();
		$('#' + parent.elementId + ' .video-pause').show();
		$('#' + parent.elementId + " .video-poster").hide();
	});

	$('#' + this.elementId + ' video').bind('pause', function () {
		$('#' + parent.elementId + ' .video-play').show();
		$('#' + parent.elementId + ' .video-pause').hide();
	});

	$('#' + this.elementId + ' video').bind('ended', function () {
		$('#' + parent.elementId + ' .video-play').show();
		$('#' + parent.elementId + ' .video-pause').hide();
		if (configData.videoPosterURL != "") {
			$('#' + parent.elementId + " .video-poster").show();
		}
	});

	if (configData.autoPlay == true) {
		$('#' + parent.elementId + ' .video-play').hide();
		$('#' + parent.elementId + ' .video-pause').show();
		$('#' + parent.elementId + " video")[0].play();
	}
	else {
		$('#' + parent.elementId + ' .video-play').show();
		$('#' + parent.elementId + ' .video-pause').hide();
		$('#' + parent.elementId + " video")[0].pause();
	}

	if (configData.audio == true) {
		$('#' + parent.elementId + ' .video-mute').show();
		$('#' + parent.elementId + ' .video-unmute').hide();
	}
	else {
		$('#' + parent.elementId + ' .video-mute').hide();
		$('#' + parent.elementId + ' .video-unmute').hide();
		$('#' + parent.elementId + ' .video-seek').css("right", "38px");
		$('#' + parent.elementId + ' .video-timer').css("right", "9px");
	}

	if (configData.showTime == false) {
		$('#' + parent.elementId + ' .video-timer').hide();
		$('#' + parent.elementId + ' .video-seek').css("right", "40px");
	}

	if (configData.audio == false && configData.showTime == false) {
		$('#' + parent.elementId + ' .video-seek').css("right", "11px");
	}

};

VideoPlayer.prototype.setupHTML5Captions = function (configData) {
	/* HTML5 Video Captioning */

	var $video = $("#" + this.elementId + "_video");
	var $player = $("#" + this.elementId + " .video");
	var isXMLLoaded = false;

	/* Manage captions */
	if (configData.captionURL != "") {

		var captionNode = '';

		/* Parse captions */
		$.ajax({
			type: "GET",
			url: configData.captionURL,
			dataType: "xml",
			success: function (xml) {

				isXMLLoaded = true;
				var $captions = $(xml).find('p')

				if ($captions.length) {

					$captions.each(function () {

						var beginSplit = $(this).attr('begin').split(':');
						var endSplit = $(this).attr('end').split(':');
						var begin = (parseFloat(beginSplit[0]) * 60) + parseFloat(beginSplit[1]);
						var end = (parseFloat(endSplit[0]) * 60) + parseFloat(endSplit[1]);
						var text = $(this).text();

						captionNode += '<span class="caption" data-begin="' + begin + '" data-end="' + end + '" style="display:none">' + text + '</span>';

					})

					$player.append('<div class="captions ' + locale + '">' + captionNode + '</div>');
					$("#" + this.elementId).css("position", "relative");
					$("#" + this.elementId + " .captions").width(configData.playerWidth);
				}
			}
		});

		/* Handle the display of captions */
		$player.children('video')[0].addEventListener('timeupdate', function () {
			if (isXMLLoaded) {
				var currT = $video[0].currentTime;

				if ($('.caption').length) {
					$('.caption').each(function () {
						if ((currT >= $(this).attr('data-begin')) && (currT <= $(this).attr('data-end'))) {
							$(this).css('display', 'block');
						} else {
							$(this).css('display', 'none');
						}
					})
				}
			}
		}, false);
	}
};

VideoPlayer.prototype.isConfigDataValid = function (configData) {
	if (typeof(configData.playerWidth) != "undefined" && ValidationHelper.isValidNumber(configData.playerWidth) == false) {
		return false;
	}
    else if (typeof (configData.playerHeight) != "undefined" && ValidationHelper.isValidNumber(configData.playerHeight) == false) {
		return false;
	}
    else if (typeof (configData.videoURL) != "undefined" && ValidationHelper.isValidURL(configData.videoURL) == false) {
		return false;
	}
    else if (typeof (configData.videoURLMobile) != "undefined" && ValidationHelper.isValidURL(configData.videoURLMobile) == false) {
		return false;
	}
    else if (typeof (configData.captionURL) != "undefined" && ValidationHelper.isValidPath(configData.captionURL) == false) {
		return false;
	}
    else if (typeof (configData.videoPosterURL) != "undefined" && ValidationHelper.isValidURL(configData.videoPosterURL) == false) {
		return false;
	}
    else if (typeof (configData.title) != "undefined" && ValidationHelper.isValidText(configData.title) == false) {
		return false;
	}
    else if (typeof (configData.autoPlay) != "undefined" && ValidationHelper.isValidBoolean(configData.autoPlay) == false) {
		return false;
	}
    else if (typeof (configData.showReplay) != "undefined" && ValidationHelper.isValidBoolean(configData.showReplay) == false) {
		return false;
	}
    else if (typeof (configData.showTime) != "undefined" && ValidationHelper.isValidBoolean(configData.showTime) == false) {
		return false;
	}
    else if (typeof (configData.audio) != "undefined" && ValidationHelper.isValidBoolean(configData.audio) == false) {
		return false;
	}

	return true;
}

VideoPlayer.prototype.deriveVideoURLs = function (videoId) {

	// Just the video ID was provided, so assume Scene7 use and derive the URLs

	var profileWide = "_1024x576_1500K";
	var profileStandard = "_1024x768_1500K";
	var profile = "";
	var baseScene7video = "";
	var scene7videoId = "";

	scene7videoId = videoId.split("-AVS").join("");
	if (typeof (templateStrings.baseScene7VideoURL) != "undefined" && templateStrings.baseScene7VideoURL != null && templateStrings.baseScene7VideoURL != "") {
		baseScene7video = templateStrings.baseScene7VideoURL.split("/image/").join("/content/");
	}
	else {
		baseScene7video = templateStrings.baseScene7ImageURL.split("/image/").join("/content/");
	}

	if (Number(this.props.playerWidth) / Number(this.props.playerHeight) < 1.4) {
		// Letterbox aspect ratio
		profile = profileStandard;
	}
	else {
		// Wide screen aspect ratio
		profile = profileWide;
	}

	// HTML5 video element can take a comma separated list of file names, the first one that works will be used
	this.props.videoURL = baseScene7video + scene7videoId + profile;
	this.props.videoURLMobile = baseScene7video + scene7videoId + profile + ".m3u8";
	this.props.videoURLOgg = baseScene7video + scene7videoId + "_OGG" + profile;
};

/* End of VideoPlayer.js */
﻿// ValidationHelper.js

function ValidationHelper() {
}

ValidationHelper.isValidNumber = function (input) {

	if (typeof (input) == "number" && isFinite(input) == true) {
		return true;
	} else if (isFinite(Number(input)) == true) {
		return true;
	}

	return false;
};

ValidationHelper.isValidText = function (input) {

	if (input.indexOf("<") > -1 || input.indexOf(">") > -1 || input.indexOf("\n") > -1) {
		return false;
	}
	return true;
};

ValidationHelper.isValidBoolean = function (input) {

	if (typeof (input) == "boolean") {
		return true;
	} else if (input.toLowerCase() == "true" || input.toLowerCase() == "false" || input == "") {
		return true;
	}
	return false;
};

ValidationHelper.isValidPath = function (input) {

	var valid = true;
	var validCharRegexp = /^[a-zA-Z0-9\/][a-zA-Z0-9_\.\&\?\/\%\-\=]*$/g;

	if (input == "") {
		return true;
	}
	else if (input.toLowerCase().indexOf("javascript:") > -1) {
		// No javascript: protocol allowed
		return false;
	}
	else if (input.toLowerCase().indexOf("http:") == 0 || input.toLowerCase().indexOf("https:") == 0) {
		// Paths are required to be from the same server, so no http: or https: protocol designators allowed
		return false;
	}
	else if (input.indexOf("//") == 0) {
		// An absolute URL can start with just // instead of http:// so don't allow that either
		return false;
	}
	else if (input.indexOf("./") > -1) {
		// ./ and ../ can be used improperly
		return false;
	}
	else if (input.search(validCharRegexp) == -1) {
		return false;
	}
	return true;
};

ValidationHelper.isValidURL = function (input) {
	var valid = true;
	var validCharRegexp = /^[a-zA-Z0-9\/][a-zA-Z0-9_\.\&\?\/\%\-\:\=]*$/g;

	if (input == "") {
		return true;
	}
	else if (input.toLowerCase().indexOf("javascript:") > -1) {
		// No javascript: protocol allowed
		return false;
	}
	else if (input.indexOf("./") > -1) {
		// ./ and ../ can be used improperly
		return false;
	}
	else if (input.search(validCharRegexp) == -1) {
		return false;
	}
	return true;

};

/* End of ValidationHelper.js */
// ----------------------------------------------
// File:		Detection.js
// Author:		Aaron Koss
// Description:	This file includes browser and hardware detection scripts.
// ----------------------------------------------

// ** Begin functions brought over from old JavaScript.ascx
var agt=navigator.userAgent.toLowerCase();
var appVer = navigator.appVersion.toLowerCase();
var is_minor = parseFloat(appVer);
var is_major = parseInt(is_minor);

function isIEUnsupported() 
{
	var iePos  = appVer.indexOf('msie');
	if (iePos !=-1) {
		is_minor = parseFloat(appVer.substring(iePos+5,appVer.indexOf(';',iePos)));
		is_major = parseInt(is_minor);
	}
	if ((iePos!=-1) && is_major<6) {
		if (isRetail.toLowerCase() == "true") {return false} 
		else {return true}
	}	
	else {return false}
}
	
function isSafariUnsupported() 
{
	if((agt.indexOf('safari') > 0) && agt.indexOf('mac') > 0 )
	{
		is_minor = parseFloat(agt.substring(agt.indexOf('safari')+7,agt.indexOf('safari')+12));
		is_major = parseInt(is_minor);
		if (is_major < 412) {return true}
		else {return false}
	}
}
	
function isSafari3Plus()
{
	if(agt.indexOf('safari') > 0)
	{
		is_minor = parseFloat(agt.substring(agt.indexOf('safari')+7,agt.indexOf('safari')+12));
		is_major = parseInt(is_minor);
		if (is_major >= 500) {return true}
		else {return false}
	}
	return false;
}

var browserName=navigator.appName;
var browserVer=parseInt(navigator.appVersion);
var isMac = (navigator.appVersion.indexOf("Mac") != -1);
//Do Object detection
if (document.location.href.toLowerCase().indexOf("upgrade.aspx") == -1 && document.location.href.toLowerCase().indexOf("externalsitewarning.aspx") == -1) {
	if (document.getElementById) {
		if ((browserName=="Netscape" && browserVer<5) || isIEUnsupported() || isSafariUnsupported() || (browserName=="Microsoft Internet Explorer" && isMac)) 
			{
				document.location.href = "/Common/errors/upgrade.aspx";
			}
	}
	else {document.location.href = "/Common/errors/upgrade.aspx";}
}
	
function shouldPriceBeVisible()
{
	if ((locale.toLowerCase() == "intl" && isRetail.toLowerCase() == "false") || (locale.toLowerCase() == "zh-cn") || (locale.toLowerCase().indexOf("watch") > -1))
	{
		return false;
	}
	return true;
}
	
function Redirect(url)
{
	window.location = url;
}
	
// ND: Added so that tIFR could access user agent through ExternalInterface
function getUserAgent()
{
	return navigator.userAgent.toLowerCase();
}
	
// ND: Added so that tIFR could access browser detection through ExternalInterface
function isBrowserIE()
{
	var iePos = appVer.indexOf('msie');
	if (iePos !=-1) 
	{
		is_minor = parseFloat(appVer.substring(iePos+5,appVer.indexOf(';',iePos)));
		is_major = parseInt(is_minor);
	}
		
	if ((iePos!=-1) && is_major >= 4) 
	{
		return true;
	}	
	else 
	{
		return false;
	}
}

function isIPhone()
{
    if (navigator.userAgent.match(/iPhone/i) != null)
    {
    	return true;
    }
    return false;
}

function isIPad()
{
    if (navigator.userAgent.match(/iPad/i) != null)
    {
    	return true;
    }
    return false;
}

function isIPod()
{
    if (navigator.userAgent.match(/iPod/i) != null)
    {
    	return true;
    }
    return false;
}

function isBlackBerry()
{
    if (navigator.userAgent.match(/BlackBerry/i) != null)
    {
    	return true;
    }
    return false;
}

function isKindle()
{
    if (navigator.userAgent.match(/Kindle/i) != null)
    {
    	return true;
    }
    else if (navigator.userAgent.match(/Silk-Accelerated/i) != null)
    {
    	return true;
    }
    return false;
}

function isKindleFire()
{
    if (navigator.userAgent.match(/Kindle Fire/i) != null)
    {
    	return true;
    }
    else if (navigator.userAgent.match(/Silk-Accelerated/i) != null)
    {
    	return true;
    }
   	return false;
}

function isWindowsPhone()
{
    if (navigator.userAgent.match(/Windows Phone/i) != null)
    {
    	return true;
    }
    return false;
}

function isAndroid()
{
	if (navigator.userAgent.match(/Android/i) != null)
	{
		return true;
	}
	return false;
}

function isAndroidMobile() {
	if (navigator.userAgent.match(/Android/i) != null && navigator.userAgent.match(/Mobile/i) != null) {
	    return true;
	}
	return false;
}

function isAndroidTablet() {
	if (navigator.userAgent.match(/Android/i) != null && navigator.userAgent.match(/Mobile/i) == null) {
	    return true;
	}
}    

function isMobile()
{
    return isIPhone() || isIPad() || isIPod() || isAndroid();
}
    
function isSmallMobile()
{
	return isIPhone() || isIPod() || isAndroidMobile();
}

function isTablet()
{
    return isIPad() || isAndroidTablet();
}
    
function isMobileDomain()
{
	var url = document.location.href;
	url = url.split("http://").join("").split("https://").join("");
	if (url.indexOf("m") == 0)
	{
		return true;
	}
	return false;
}

// ** End functions brought over from old JavaScript.ascx
/* End of Detection.js */
﻿var pcEmailID = "ctlEmailSignUp_txtSubscribeEmail"
var mEmailID = "ctlFooter_emailMarketingCtl_txtSubscribeMobileEmail"

if (locale.toUpperCase() == 'EN-US-ESTR' || locale.toUpperCase() == 'JA-JP-ESTR') {
	/* pcEmailID = "ctlFooter_emailMarketingCtlEStore_txtSubscribeEmail"; */
	mEmailID = "ctlFooter_emailMarketingCtlEStore_txtSubscribeMobileEmail" }
     
	function ValidateEmptySelectedValue() {
	var ddl = document.getElementById(countryddlID);
	if (ddl.options[ddl.selectedIndex].value == '-1') {
		ddl.selectedIndex = '0'; return;
	}
}

function getEmailMarketingAttributes() 
{
	var valid;
	valid = ValidateSubscribeEmail();
  
	var isCountrySelected ;
	if (locale.toUpperCase() == 'INTL' || locale.toUpperCase() == 'ZH-HANT') {

		var ddl = document.getElementById(countryddlID);
		if (ddl.options[ddl.selectedIndex].value == '-1') { ddl.selectedIndex = '0';return;}

		isCountrySelected = ValidateCountrySelected();
	}
  
	if (valid== true && (locale.toUpperCase()=='INTL'||locale.toUpperCase()=='ZH-HANT'))
	{
		valid =isCountrySelected;
	}
  
	if(valid)
	{
		// Commented due to issue of custom variables of the slots after 5  
		// Custom variable setting for Email Signup
		//SetCustomVariableForEmailSignup();
		//----------------------------------------
		if(blnSubscribeFromFooter)
		{
			//Omniture
			s.linkType="o";
			s.linkName = "Link to E-mail Marketing - Footer Thank You";
			s.events = "event11";
			s.linkTrackVars = "events";
			s.linkTrackEvents = "event11";
			//s_lnk = s_co(this);
			// iTrack #11317 
			//s_pageName="Activity | Email Marketing | Footer | Success";			
			//s_gs(s_account);
			s.tl(true, 'o', "Link to E-mail Marketing - Footer Thank You");
			s.linkTrackEvents = "None";
			s.linkTrackVars = "None";
			TrackEvent('Email Sign Up','Footer','Submit Success','');
		}
		else
		{
			//Omniture
			s_linkType="o";
			s_linkName = "Link to E-mail Marketing - HomePage Thank You";
			// iTrack #11317
			//s_pageName="Activity | Email Marketing | HomePage | Success";
			if (typeof s_account != 'undefined') {
				s_lnk=s_co(this);
				s_gs(s_account);
			}
			TrackEvent('Email Sign Up','Home Page','Submit Success','');
		}

		emailMarketing_showProgress();
//		var poststr = "txtSubscribeEmail=" + encodeURI( document.getElementById(pcEmailID).value ) + 
//						"&blnSubscribeFooter=" + encodeURI( document.getElementById("blnSubscribeFooter").value ) +
//						"&source=" + encodeURI ( '<%= Source %>' );
//		makePOSTRequest('/Customer/Request/ProcessEmailMarketingRequest.aspx', poststr);

		var emailAddr;
		var mobileEmailAddr; 
		var selectedCountry ;	
		var countryCode ='';
	
		if(locale.toUpperCase() == 'INTL'||locale.toUpperCase() == 'ZH-HANT')
		{
			selectedCountry = document.getElementById(countryddlID );
			if(selectedCountry !=null && selectedCountry!='undefined')
			{
			    countryCode = selectedCountry.options[selectedCountry.selectedIndex].value;
			    if (countryCode == '-1') {
			    
			    }
			}
		}	
		emailAddr = encodeURI( document.getElementById(pcEmailID).value );	
		if (isMobileEmailSubscribe() == true)
		{
			mobileEmailAddr = encodeURI( document.getElementById(mEmailID).value );
		}
//		var footer = encodeURI( document.getElementById("blnSubscribeFooter").value );
//		var source = encodeURI ( '<%= Source %>' );

		$.ajax({
			url: '/Default.aspx/SubmitEmailMarketingPreference',
			type: 'POST',
			data: '{"emailAddress": "' + emailAddr + '","mobileEmailAddress":"' + mobileEmailAddr + '","countryCode":"' + countryCode + '"}',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				emailMarketing_showResults();
			},
			error: function (jqXHR, status, error) {
				emailMarketing_showResults();
			}
		});
	}
}

function emailMarketing_showStart()
{
		/* This fix allows multiple time submissoin because every time in success we are setting join_email_list_confirm.gif 
		image in innerHTML of divTitle when submitting  from homepage / your account not footer.*/
		
		var emailSignup_joinTitle = document.getElementById('emailSignup_joinTitle');
		
		if(emailSignup_joinTitle == null || typeof(emailSignup_joinTitle)=='undefined')
		{
			document.getElementById('divTitle').innerHTML = '<span id="emailSignup_joinTitle"></span>';
		}
		
	if (blnSubscribeFromFooter == true)
	{
	
		$('#divSubscribeEntry').show();
		
		$("#emailSignup_joinTitle").show();
		
		document.getElementById('emailSignup_joinTitle').innerHTML = txtSubscribeTitle;
		
		$("#divClose").show();
		document.getElementById('divClose').innerHTML = '<a class="closeLink" href="javascript:closeSubscribe();">'+txtSubscribeClose+'</a>';

		$("#emailSignup_body").show();
		$("#emailSignup_progress").hide();
		$("#emailSignup_results").hide();

		document.getElementById('divErrors').innerHTML="";
		if(isMobileEmailSubscribe()) {document.getElementById('divPCErrors').innerHTML="";}

		$("#emailSignup_specialOfferPopover").show();
		$("#emailSignup_specialOfferLink").hide();
		
		//emailOverlayYCoord = $(document).height() - $('#divSubscribeEntry').height() + 25;
		//document.getElementById("divSubscribeEntry").style.top = emailOverlayYCoord +"px";
	}
	else
	{
		$('#divSubscribeEntry').show();
		
		$("#emailSignup_joinTitle").show();
		document.getElementById('emailSignup_joinTitle').innerHTML = txtSubscribeTitle;

		$("#divClose").show();
		document.getElementById('divClose').innerHTML = '<a class="closeLink" href="javascript:closeSubscribe();">'+txtSubscribeClose+'</a>';

		$("#emailSignup_body").show();
		$("#emailSignup_progress").hide();
		$("#emailSignup_results").hide();

		document.getElementById('divErrors').innerHTML="";
		//if(isMobileEmailSubscribe) {document.getElementById('divPCErrors').innerHTML="";}
		
		$("#emailSignup_specialOfferPopover").show();
		$("#emailSignup_specialOfferLink").hide();
		document.getElementById("divSubscribeEntry").style.top = "105px";
	}
}

function emailMarketing_showProgress()
{
	$("#emailSignup_joinTitle").hide();
	$("#emailSignup_resultsTitle").hide();

	$("#divClose").hide();

	$("#emailSignup_body").hide();
	$("#emailSignup_progress").show();
	document.getElementById('emailSignup_progress').innerHTML = txtSubscribeProcessing;
	$("#emailSignup_results").hide();

	document.getElementById('divErrors').innerHTML="";

	$("#emailSignup_specialOfferPopover").hide();
	$("#emailSignup_specialOfferLink").hide();
		
	//if (blnSubscribeFromFooter == true)
	//{
		//emailOverlayYCoord = $(document).height() - $('#divSubscribeEntry').height() + 25;
		//document.getElementById("divSubscribeEntry").style.top = emailOverlayYCoord +"px";
	//}
}

function emailMarketing_showResults()
{
	$("#emailSignup_joinTitle").show();
	document.getElementById('emailSignup_joinTitle').innerHTML = txtSubscribeThankYouTitle;

	if (blnSubscribeFromFooter == true)
	{
		$("#divClose").show();
	}
	else
	{
		$("#divClose").show();
		if (locale == "ja-JP" || locale == "ja-JP-EStr") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/ja-JP/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "zh-CN") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/zh-CN/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "zh-Hant") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/zh-Hant/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "ko-KR") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/ko-KR/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "de-AT") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/de-AT/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "de-DE") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/de-AT/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "es-ES") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/es-ES/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "fr-FR") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/fr-FR/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "it-IT") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/it-IT/images/title/join_email_list_confirm.gif' />"
		}
		else if (locale == "es-MX") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/es-MX/images/title/join_email_list_confirm.gif' />"
		    document.getElementById('divTitle').style.backgroundImage = "none";
		}
		else if (locale == "fr-CA") {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/fr-CA/images/title/join_email_list_confirm.gif' />"
		    document.getElementById('divTitle').style.backgroundImage = "none";
		}
		else {
		    document.getElementById('divTitle').innerHTML = "<img src='/local/en-US/images/title/join_email_list_confirm.gif' />"
		}
	}

	$("#emailSignup_body").hide();
	$("#emailSignup_progress").hide();
	$("#emailSignup_results").show();
	
	document.getElementById('emailSignup_results').innerHTML = '<p>'+txtSubscribeThankYou+'</p>';

	$("#emailSignup_specialOfferPopover").hide();
	$("#emailSignup_specialOfferLink").show();
	
	//if (blnSubscribeFromFooter == true)
	//{
		//emailOverlayYCoord = $(document).height() - $('#divSubscribeEntry').height() + 25;
		//document.getElementById("divSubscribeEntry").style.top = emailOverlayYCoord +"px";
	//}
}


function clearEmailText(aTextBox,txtMatchInputValue) 
{
	if (aTextBox.value == txtMatchInputValue || aTextBox.value =='') 
	{
		if (blnSubscribeFromFooter == true)
		{
			if (aTextBox.value == txtEmailAddress) {
				$('#' + pcEmailID).attr('class', 'english formText237');
			}

			if (isMobileEmailSubscribe() && aTextBox.value == txtMobEmailAddress) 
			{
				$('#' + pcEmailID).attr('class', 'english formText237 txtSubscribeMobileEmail');
			}

			if (document.getElementById(pcEmailID).value == "")
			{
				document.getElementById(pcEmailID).value = txtEmailAddress;
				$('#' + pcEmailID).attr('class', 'formText237');
			} 

			if (isMobileEmailSubscribe() && document.getElementById(mEmailID).value == "") 
			{
				document.getElementById(mEmailID).value = txtMobEmailAddress; 
				$('#' + pcEmailID).attr('class', 'formText237 txtSubscribeMobileEmail');
				$("#divErrors").hide();
			}
		}
		else
		{
			if (aTextBox.value == txtEmailAddress)
			{
				$('#' + pcEmailID).attr('class', 'english formText237');
			}
			if (isMobileEmailSubscribe() && aTextBox.value == txtMobEmailAddress) 
			{
				$('#' + pcEmailID).attr('class', 'english formText237 txtSubscribeMobileEmail');
			}
		}
		aTextBox.value = '';
	}
}

function isMobileEmailSubscribe()
{
	if (document.getElementById(mEmailID)!= null) 
	{
		return true;
	}
	else 
	{
		return false;
	}
}

function subscribeFooter()
{	
	if (blnSubscribeReady) 
	{
	
		document.getElementById(pcEmailID).onkeydown = function(e)
		{
		
			e = e || window.event;
			if (e.keyCode == 13) 
			{
				getEmailMarketingAttributes();
				e.cancelBubble = true;
				if (e.stopPropagation) e.stopPropagation();
				return false;
			}
		};
		document.getElementById(pcEmailID).onkeypress = function(e) 
		{
			e = e || window.event;
			if (e.keyCode == 13) 
			{
				getEmailMarketingAttributes();
				return false;
			}
		};
		
		if (isMobileEmailSubscribe() == true)
		{
			document.getElementById(mEmailID).onkeydown = document.getElementById(pcEmailID).onkeydown;
			document.getElementById(mEmailID).onkeypress = document.getElementById(pcEmailID).onkeypress;
		}
		
		blnSubscribeFromFooter = true;
		document.getElementById("blnSubscribeFooter").value = true; 
		document.getElementById(pcEmailID).value = txtEmailAddress;
		
		$('#' + pcEmailID).attr('class', 'formText237');
		
		if (isMobileEmailSubscribe() == true)
		{
			document.getElementById(mEmailID).value = txtMobEmailAddress;
			$('#' + mEmailID).attr('class', 'formText237 txtSubscribeMobileEmail');
			document.getElementById('divPCErrors').style.paddingBottom = "10px";
		}
		
		document.getElementById("divSubscribeEntry").className = 'subscribeFooter';		
		
		document.getElementById("divSubscribeEntry").style.left = "50%";
		document.getElementById("divSubscribeEntry").style.marginLeft = "145px";
			emailMarketing_showStart();
			
		//Omniture
		if (typeof s_account != 'undefined') 
		{
			s_linkType="o";
		    s_linkName="Link to E-mail Marketing - Footer Form";
            s_lnk=s_co(this);
            
            s_pageName="Activity | Email Marketing | Footer";	
			s_gs(s_account);
		}
		TrackEvent('Email Sign Up','Footer','View','');
		
	}
}
function linkEmailMarketing()
{
	if (blnSubscribeReady) 
	{	
		document.getElementById(pcEmailID).onkeydown = function(e)
		{
			e = e || window.event;
			if (e.keyCode == 13) 
			{
				getEmailMarketingAttributes();
				e.cancelBubble = true;
				if (e.stopPropagation) e.stopPropagation();
				return false;
			}
		};
		document.getElementById(pcEmailID).onkeypress = function(e) 
		{
			e = e || window.event;
			if (e.keyCode == 13) 
			{
				getEmailMarketingAttributes();
				return false;
			}
		};
		if (isMobileEmailSubscribe() == true)
		{
			document.getElementById(mEmailID).onkeydown = document.getElementById(pcEmailID).onkeydown;
			document.getElementById(mEmailID).onkeypress = document.getElementById(pcEmailID).onkeypress;
		}
	
		blnSubscribeFromFooter = false;
		document.getElementById("blnSubscribeFooter").value = false;
		document.getElementById(pcEmailID).value = "";
		$('#' + pcEmailID).attr('class', 'english formText237');
		if (isMobileEmailSubscribe() == true)
		{
			document.getElementById(mEmailID).value = "";
			$('#' + mEmailID).attr('class', 'english formText237');
			document.getElementById('divPCErrors').style.paddingBottom = "10px";
		}
		
		document.getElementById("divSubscribeEntry").className = 'subscribeHomepage';
		document.getElementById("divSubscribeEntry").style.left = "50%";
		document.getElementById("divSubscribeEntry").style.marginLeft = "-205px";
		
		emailMarketing_showStart();
		
		//Omniture
		s_linkType="o";
		s_linkName="Link to E-mail Marketing - HomePage Form";
		if (typeof s_account != 'undefined') 
		{
			s_lnk=s_co(this);
			s_pageName="Activity | Email Marketing | HomePage";
			s_gs(s_account);
		}
		
		TrackEvent('Email Sign Up','Home Page','View','');
		
	}
}

function closeSubscribe() 
{
	$('#divSubscribeEntry').hide();
	document.getElementById('divErrors').innerHTML="";
	if (isMobileEmailSubscribe()) 
	{
		document.getElementById('divPCErrors').innerHTML="";
	}
	if(locale.toUpperCase()=='INTL'||locale.toUpperCase()=='ZH-HANT')
	{
		document.getElementById('divCountryddlErr').innerHTML ="";
		selectedCountry = document.getElementById(countryddlID );
		if(selectedCountry !=null && selectedCountry!='undefined')
		{
			 selectedCountry.selectedIndex =0;
		}
	}
}


function ValidateCountrySelected() 
{
		var valid = false ;		
		var ddl=	document.getElementById(countryddlID );
		
		if(ddl.options[ddl.selectedIndex].value != '0')
		{	document.getElementById('divCountryddlErr').innerHTML ='';// Reset value.
			valid= true;
		}
		else 
		{
			document.getElementById('divCountryddlErr').innerHTML = txtErrSelectACountry;
			if (isMobileEmailSubscribe()) {document.getElementById('divCountryddlErr').style.paddingBottom = "10px";}
		}	

		return valid;
}
function ValidateSubscribeEmail()
{	
	var divPCEmailError = 'divErrors';
	var divMEmailError = 'divErrors';
	if (isMobileEmailSubscribe()) {divPCEmailError = 'divPCErrors';}
	
	document.getElementById('divErrors').innerHTML = "";
	if (isMobileEmailSubscribe()) {document.getElementById('divPCErrors').innerHTML = "";}
	
	var valid = ValidateEmailEntered(pcEmailID);
	if(!valid) 
	{
		document.getElementById(divPCEmailError).innerHTML = txtErrEmailNull;
		if (isMobileEmailSubscribe()) {document.getElementById(divPCEmailError).style.paddingBottom = "10px";}
	} 
	else 
	{
		valid = ValidateEmail4ASCII (pcEmailID);
		if(!valid)
		{
			document.getElementById(divPCEmailError).innerHTML = txtErrEmailNotASCII;
			if (isMobileEmailSubscribe()) {document.getElementById(divPCEmailError).style.paddingBottom = "10px";}
		}
		else
		{
			valid = ValidateEmailFormat(pcEmailID);
			if(!valid)
			{
				document.getElementById(divPCEmailError).innerHTML = txtErrEmailInvalidFormat;
				if (isMobileEmailSubscribe()) {document.getElementById(divPCEmailError).style.paddingBottom = "10px";}
			}
		}
	}
	
	
	if (isMobileEmailSubscribe() == true)
	{
		var mobileEmailValid = ValidateMobileEmailEntered(mEmailID);
	 
	    //In order to prevent sending to server "Please enter in half width." in Japanese as mobileEmail Address.
		if(document.getElementById(mEmailID).value == txtMobEmailAddress && valid == true )
		{
			document.getElementById(mEmailID).value ='';
		} 
		if (mobileEmailValid == true)
		{	
			mobileEmailValid = ValidateEmail4ASCII(mEmailID);
			if (!mobileEmailValid)
			{
				document.getElementById(divMEmailError).innerHTML = txtErrEmailNotASCII;
				valid = false;
			}
			else
			{
				mobileEmailValid = ValidateEmailFormat(mEmailID);
				if(!mobileEmailValid)
				{
					document.getElementById(divMEmailError).innerHTML = txtErrEmailInvalidFormat;
					valid = false;
				} 
				else 
				{				
				    mobileEmailValid = ValidateSameEmailAndMobileEmail(pcEmailID, mEmailID);
				    if(!mobileEmailValid)
				    {
				        document.getElementById(divMEmailError).innerHTML = txtErrSameEmailAndMobileEmail;
					    valid = false;
				    }
				}
			}
		}
	}
		
	return valid;
}

function ValidateEmailEntered(validateID)
{
	var email = document.getElementById(validateID).value;

	if (email!=txtEmailAddress && TrimString(email).length >0) 
	{
		return true;
	}
	else 
	{
		return false;
	}
}

function ValidateMobileEmailEntered(validateID)
{
	//This is an optional field
	var email = document.getElementById(validateID).value;
	if (email != txtMobEmailAddress && TrimString(email).length >0) 
	{
		return true;
	}
	else
	{
		return false;
	}
}

function ValidateEmailFormat(validateID) 
{	
	return ValidateEmailRegExp(document.getElementById(validateID).value);
}

function ValidateEmail4ASCII(validateID)
{
	var isSafari = (navigator.userAgent.toLowerCase().indexOf("safari") != -1)?true:false;
	if (isSafari) 
	{
		return ValidateRegExp(validateID, "^[a-zA-Z_0-9'\.\-]+@[a-zA-Z_0-9\-]+(\.([a-zA-Z_0-9\-])+)*[a-zA-Z]{1,4}$");
	}
	else 
	{
		return ValidateRegExp(validateID, "[\x00-\x7F]*");
	}
}

function ValidateRegExp(control, pattern) 
{	
	//Get the value entered in subscribe email textbox
	var email = document.getElementById(control).value;

	//Create a RegEx for Email Validation			
	var rx = new RegExp(pattern);
	
	//perform RegEx match
	var matches = rx.exec(email);
	
	return (matches != null && email == matches[0]);

}

function ValidateSameEmailAndMobileEmail(emailID, mobileEmailID)
{
    var email = document.getElementById(emailID).value;
    var mobileEmail = document.getElementById(mobileEmailID).value;

    return (email != mobileEmail);
}
function TrimString(s) 
{
	 var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
	 return (m == null) ? "" : m[1];
}


function ValidateEmailRegExp(email)
{	
	var result;
	//Tco Bug 2613 fixed
	var filter = /^\s*([0-9a-zA-Z]([-!#$%&*+_~'.\w]*[0-9a-zA-Z])*@[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*\.[a-zA-Z]{2,9})\s*$/i;
	try {
	    filter = emailsignupregex;
	}
	catch (ex) {
	    try {
	        filter = window.parent.window.emailsignupregex;
	    }
	    catch (ex1) {
	    }
	}

	if (filter == null || filter == 'undefined') {
	    return false;
	}

	if (filter.test(email)) {
	    result = true;
	}
	else {
	    result = false;
	}
	
	return (result);
}

/* End of emailSignup.js */
