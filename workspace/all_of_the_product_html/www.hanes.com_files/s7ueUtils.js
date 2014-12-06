/*!************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2011 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} };
//flyout support
if (typeof(s7js) == 'undefined') {
	s7js = new Object();
}
if (typeof(s7js.flyout) == 'undefined') {
	s7js.flyout = new Object();
}
//this is replaced by flyoutlibrarypath variable
//that is defined in the company INI file for a given OD company
var sj_codebase = "";
//used to determine when flyout libraries are loaded
var isFlyoutLibLoaded = [false];
//version and build info
var changelistNumber = '190148';
var buildTimeToolVersion = '5.0.2';
//optional context for s7uevServer - defaults to 's7'
if (typeof s7uevContext == "undefined")
	var s7uevContext = "";
//optional variable used to configure where utilities will call servlet. defaults to JS files domain and context if
//not provided
if (typeof s7uevServer == "undefined"){
	s7uevServer = "";
}
//
if (typeof s7uevCompany == "undefined"){
	s7uevCompany = "";	
}
/**
 * 	s7ueUtils
 */
if (typeof(s7ueUtils) == "undefined"){
	s7ueUtils = {};
	s7ueUtils.resolvedLibrarySourceDomain = null;
};
//zoom viewer links
s7ueUtils.ZOOM_VIEWER_LINKS = {
	ZOOM_VIEWER_LINKS_FLYOUT	:"advancedFlyout",
	ZOOM_VIEWER_LINKS_SPIN		:"genericSpinMobile",
	ZOOM_VIEWER_LINKS_BASIC_ZOOM:"genericZoomMobile",
	ZOOM_VIEWER_LINKS_E_CATALOG	:"genericBrochureMobile"
}
//return a hash of the string 'd'
s7ueUtils.getHashCode = function(d){
	if (!d || d == "") 
		return 1;
	var h = 0, g = 0;
	for (var i = d.length - 1; i >= 0; i--) {
		var c = parseInt(d.charCodeAt(i));
		h = ((h << 6) & 0xfffffff) + c + (c << 14);
		if ((g = h & 0xfe00000) != 0) 
			h = (h ^ (g >> 21));
	}
	return h;
};
//callback mechanism for JSON responses
if(!s7ueUtils.Callback){
    s7ueUtils.Callback = new Object();
    s7ueUtils.Callback.response = new Object(); // regular response
    s7ueUtils.Callback.error = new Object(); //error response
	s7ueUtils.Callback.scope = new Object();
    s7ueUtils.Callback.createCall = function(url,responseCb,errorCb, scope){
		var id = s7ueUtils.getHashCode(url);
		//make sure array is available 
		if (s7ueUtils.Callback.response[id] == null){
			s7ueUtils.Callback.response[id] = new Array();
		}
        s7ueUtils.Callback.response[id].push(responseCb);
        s7ueUtils.Callback.error[id] = errorCb;
		s7ueUtils.Callback.scope[id] = scope;
        var scr = document.createElement("script");
        scr.setAttribute("type", "text/javascript");	
        scr.setAttribute("language", "javascript");
        scr.setAttribute("src",url+"&id="+id);
        document.getElementsByTagName("head")[0].appendChild(scr);
    }
};
/*
*	Devices defined
*/
s7ueUtils.DEVICE= [
	[/iPhone/i,"iphone",[[/OS 3/i,"3"],[/OS 4/i,"4"]],""],
	[/iPod/i,"ipod",[],""],
	[/iPad/i,"ipad",[],""],
	[/Android/i,"android",[[/Android 3/i,"3"], [/Android 4/i,"3"]],"2"],
	[/Symbian/i,"symbian",[],""],
	[/BlackBerry/i,"blackberry",[[/BlackBerry 99/i,"blackberry99"],[/BlackBerry 98/i,"blackberry98"],[/BlackBerry97/i,"blackberry97"],[/BlackBerry96/i,"blackberry96"],[/BlackBerry95/i,"blackberry95"],[/BlackBerry 938/i,"blackberry938"],[/BlackBerry 93/i,"blackberry93"],[/BlackBerry89/i,"blackberry89"]],""],
	[/Palm/i,"palm",[],""],
	[/Windows CE; PPC/i,"pocketpc",[],""],
	[/windows phone os 7/i,"winphone7",[],""]
];
//server side configuration object
//used by JS code
s7ueUtils.serverConfig = null;
/**
* Start is used when library is only for device
* detection and not for embedding - saves loading the 
* rest of the embedding support files
* 
*/
s7ueUtils.start = function(){
	//initialize the browser info
	this.browser.init();	
	//initialize device after browser for screensize
	this.device.init();	
	//init page object

};
//load the JS configuration from the S7 OnDemand servlet
s7ueUtils.loadServerConfig = function(){
	if (!s7uevCompany == ""){	
		var resolvedServer = this.getServer();
		s7ueUtils.Callback.createCall(resolvedServer + "/s7UEmbedServlet?company=" + s7uevCompany + "&target=production&s7r=" + resolvedServer, this.onConfigResponse, null, this);
	}
};
//add the json response to the global object
s7ueUtils.onConfigResponse = function(json){
	s7ueUtils.serverConfig = json;
};
//resolves the domain that the server should point to
//if no server, use the domain of the JS file that is being loaded
s7ueUtils.getServer = function(){
	if (s7uevServer === ""){
		return s7ueUtils.getLibrarySourceDomain("s7ueUtils.js") + ((s7uevContext == "") ? "/s7" : s7uevContext);
	}else{
		return s7uevServer + ((s7uevContext == "") ? "/s7" : s7uevContext);	
	}			
};
//remove all doubles slashes from url
s7ueUtils.normalizeFullURL = function(url){
	var tokens = url.split("//");
	var http = tokens.shift();
	http += "//";
	var result = http += tokens.join("/");		
	return result;				
};	

s7ueUtils.stripLeadingAndTrailingSlash = function(str){
		var result = str;		
		if((str.indexOf("/") == 0) && (str.length > 1)){
			result = str.substring(1, str.length);				
		}
		var lastPos = result.lastIndexOf("/");
		if (lastPos > -1){
			result = result.substring(0, lastPos);
		}
		return result;
	}

/*
*	Creates an id used for JSON requests
*/
s7ueUtils.randId = function(){
	var d = new Date();  
	return d.getTime();    	
};

s7ueUtils.guidGenerator = function() {
    var S4 = function() {
       return (((1+Math.random())*0x100)|0).toString(16).substring(1);
    };
    return (S4()+S4());
};
/**
 * Initialize the various objects
 * used by the browser detect code
 * 
 */
s7ueUtils.device = {
	
	getName:function (){
		return this.name;
	},
	getVersion:function(){
		return this.version;
	},
	
	name: "",
	version: "",
	pixelratio: 1,
	init: function(){
		var dname = "desktop";
		var dver = "";	
		for(var i = 0; i < s7ueUtils.DEVICE.length; i++ ){
			if(navigator.userAgent.match(s7ueUtils.DEVICE[i][0])){
				dname = s7ueUtils.DEVICE[i][1];
				dver = s7ueUtils.DEVICE[i][3];
				var dvlist = s7ueUtils.DEVICE[i][2];                               

				for(var j = 0; j < dvlist.length; j++){
					var veritem = dvlist[j];
					if(navigator.userAgent.match(veritem[0])){
						dver = veritem[1];
						break;
					}
				}
				break;
			}
		}	
		this.name = dname;
		s7ueUtils.browser.detectScreen();//refresh size after we know device type
        this.version = dver;
		if (this.isBlackBerry() || this.isWINPHONE7()){
			this.name = "android";
		}	
        if(this.name == "iphone") this.fixiphone();
		if(typeof window.devicePixelRatio != "undefined"){
			this.pixelratio = window.devicePixelRatio;
		}		
	},
	fixiphone: function(){
		if(window.devicePixelRatio < 2){
			s7ueUtils.device.version = 3;
		}
	},
	isIOS: function() {	
		return (this.name == "iphone" || this.name == "ipod" || this.name == "ipad");
	},
	isAndroid: function() {
		return (this.name == "android");
	},
	isBlackBerry: function() {
		return ((this.name == "blackberry") && (
				this.version == "blackberry99" || //Bold 99x0 (touchscreen)
				this.version == "blackberry98" || //Torch
				this.version == "blackberry97" || //Bold 97x0 (non-touch)
				this.version == "blackberry96" || //Tour
				this.version == "blackberry95" || //Storm 1 and 2
				this.version == "blackberry938" || //Curve Touch 9380
				this.version == "blackberry93" || //Curve 1
				this.version == "blackberry89" //Curve 2
				));
	},
	isWINPHONE7: function() {
		return (this.name == "winphone7");
	}
};
/**
* The browser object contains all information about the user's browser
*/
s7ueUtils.browser = {
	//return the name of the browser
	getName: function(){
		return this.name;	
	},
	//return the version of the browser
	getVersion: function(){
		return this.version;
	},
	//raw data
	raw: {
		ua: navigator.userAgent.toLowerCase(),
		ver: navigator.appVersion.toLowerCase()
	},
	//browser name to undefined as default
	name: "undefined",
	//version info - major / minor /javascript
	version: {
		major: "0",
		minor: "0",
		js: "0"
	},
	screensize: {w:0,h:0},
	/*
	*	supportsflash returns whether the current
	*	browser supports flash / or whether flash is 
	*	enabled in the users browser
	*	
	*/
	supportsflash: function(){
		if (navigator.plugins != null && navigator.plugins.length > 0) {
			if (navigator.plugins["Shockwave Flash"]) {
				return true;
			} 
		}
		else 
			if (this.name != "undefined"){
				if (((this.name.toLowerCase() == "msie") || (this.name.toLowerCase() == "ie")) && (navigator.appVersion.toLowerCase().indexOf("win") != -1)) {
					try {
						var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
						if (axo) 
							return true;
					} 
					catch (e) {
					}
				}
			}
		return false;
	},
	detectScreen: function(){
	    var size = {w:0, h:0};
	    if (window.innerHeight) {
	        size.w = window.innerWidth;
	        size.h = window.innerHeight;
	    }
	    else if (document.documentElement && document.documentElement.clientHeight){
	        //IE6
	        size.w = document.documentElement.clientWidth;
	        size.h = document.documentElement.clientHeight;
	        
	    }else if (document.body) {
	        //other IE
	        size.w = document.body.clientWidth;
	        size.h = document.body.clientHeight;
	    }
		//
		if(s7ueUtils.device.name != "desktop" && s7ueUtils.device.name != ""){
			size.w = screen.width;
			size.h = screen.height;              
		}
	    this.screensize = size;                 
	},
	
	init: function () {
		this.name = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
		this.detectScreen();
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "IE",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
		   string: navigator.userAgent,
		   subString: "iPhone",
		   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]
};
//checks to see if an object's property is either
//undefined or empty string
s7ueUtils.isValid = function(name,conf){
	if ((typeof(conf[name]) != "undefined") && (conf[name] != "")){
		return true;
	}
	return false;
};
s7ueUtils.resolveUrlIE7 = function( url ){// IE7 specific get full path 
	    var img = document.createElement('img');
	    img.src = url; // set string url
	    url = img.src; // get qualified url
	    return url;
};
//returns the http://<domain><port> of any URL
s7ueUtils.getLibrarySourceDomain = function(lib) { 
	if (s7ueUtils.resolvedLibrarySourceDomain != null){
		return  s7ueUtils.resolvedLibrarySourceDomain;	
	}
	var scriptTags = document.getElementsByTagName("script");
	for(var i = 0; i < scriptTags.length; i++){				
		 if(scriptTags[i].getAttribute("src") && scriptTags[i].getAttribute("src").indexOf(lib) >= 0){			 
			 var jsSrc = scriptTags[i].src;
			 var elems = jsSrc.split("/");
			 if(s7ueUtils.browser.name == "IE" && (elems[0] == "" || elems[0] == ".." || elems[0] == ".")){
				 if(s7ueUtils.browser.version == 7 || document.documentMode == 7){
					 jsSrc = s7ueUtils.resolveUrlIE7(scriptTags[i].src); 
					 elems = jsSrc.split("/");
				 }
			 }
			 if (elems.length > 0){
				var fullDomain = elems[0] + "//" + elems[2] + "/";
				s7ueUtils.resolvedLibrarySourceDomain = fullDomain;
				return fullDomain;
			 }
		 }
	}
	s7ueUtils.resolvedLibrarySourceDomain = "";
	return "";
};
//call start automatically to get browser/device detection
s7ueUtils.start();

s7ueUtils.page = {
	    url: null, 
	    qStrings: {},
	    init: function(){
	        this.url = window.location.href;
	        var qs = (this.url.indexOf("?") > 0 ? this.url.split("?")[1] :  "");
	        var qsList = qs.split("&");
	        for(var i = 0; i < qsList.length; i++){
	            this.qStrings[qsList[i].substring(0,qsList[i].indexOf("="))] = qsList[i].substring(qsList[i].indexOf("=")+1);
	        }
	    },
	    get: function(k){
	        return this.qStrings[k];
	    },
	    addQS: function(k,v){
	        if(!this.qStrings[k])  this.qStrings[k] = v; //prevent adding more than one
	    }
	};
s7ueUtils.page.init();
/*
*	Standard JSON response objects	
*/
function s7ueResponse(json, id) {
	if (s7ueUtils.Callback.response[id].length > 0){
		var cllbk = s7ueUtils.Callback.response[id].pop();
		cllbk(json, s7ueUtils.Callback.scope[id]);	
	}
}
function s7ueError(json, id) {
    if(s7ueUtils.Callback.error[id])	
		s7ueUtils.Callback.error[id](json);
};
s7ueUtils.wrapContext = function(callback, context) {
	return function () {
		callback.apply(context, Array.prototype.splice.call(arguments, 0)); 
	}
};

s7ueUtils.isFlash = function(){
	var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
	var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
	var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
	var isIPhone  = (navigator.userAgent.match(/iPhone/i));
	var isIPod  = (navigator.userAgent.match(/iPod/i));
	var isIPad  = (navigator.userAgent.match(/iPad/i));
	var isAndroid  = (navigator.userAgent.match(/Android/i));

	function chkFlash() {
		if (navigator.plugins != null && navigator.plugins.length > 0) {
			if (navigator.plugins["Shockwave Flash"]) {
				return true;
			}
		} else if (isIE && isWin && !isOpera) {
			try {
				var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				if (axo) return true;
			} catch (e) {
			}
		}
		return false;
	}

	return chkFlash();
};

