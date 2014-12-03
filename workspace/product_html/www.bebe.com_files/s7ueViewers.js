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
//version and build info
var changelistNumber = '190148';
var buildTimeToolVersion = '5.0.2';
/*
*	
*/
var s7uev;
if (!s7uev){
	s7uev = {};
}else if (typeof s7uev != "object")
	throw new Error("Cannot initialize a root 's7uev' package. s7uev is not an object");

/*
* @class
*
* @param {Object} localConfig The configuration object in JSON that is used to configure the embedded viewer
* @param {ignoreServerConfig} Used to bypass calling the configuration servlet. Used when all configuration options are contained within the localconf parameter
*	
*
*/
if (!s7uev.EmbeddedViewer){
	s7uev.EmbeddedViewer = (function(localconf){
		//do not request the config from the server?
		/*
		* Private Members
		*/
		if(!s7uev.imageMapSupport) {
			s7uev.imageMapSupport = {};
		}else if (typeof s7uev.imageMapSupport != "object")
			throw new Error("Cannot initialize imageMapSupport. imageMapSupport is not an object");
		var s7uevFnParameters = localconf.s7uev;
		updateFnParameters();
		var actionIndicator = "";
		var appUrl = "";
		var asset = "";
		var assetContext = "";
		var assetType = "";
		var cache = "on";
		var codeUrl = "";
		var config = "";
		var container = null;		
		var containerColor = "";
		var contentUrl = "";
		var containerId = "";
		var codeRoot = "";
		var contentRoot = "";
		var currentViewerConfig = null;
		var currentViewerSetup = "";	
		var currentViewerType = "";
		var defaultDomain = "";		
		var defaultImg = "";
		var fallbackPolicy = null;
		var flashMode = "window";
		var https = false;
		var ignoreServerConfig = false;
		var isPopUp = false;
		//use this for resolving
		var isr = "";
		var isroot = "/";		
		var locale = "";		
		var modifiers = {};				
		var posterImage = "";
		var progressiveVideoUrl = "";
		var s7BaseURL = "";
		var s7UEresp = null;
		var serverUrl = "";
		var serverContext = "";	
		var stageSize = null;
		var startupDelay = 100;
		var streamingVideoUrl = "";		
		var targetdiv = null;
		var useDivSize = false;
		var video = {proot:"",sroot:"",method:"", comServerUrl:"", vidServerUrl:"", hds:false, posterImage:""};
		var viewer = {bitrate:"", path:"",type:"",size:{w:0,h:0,custom:true}};
		var viewerList = {};
		var viewerProxy = null;
		var config2 = null;
		var omnitureUrl = "";
		var omnitureIsAdded = false;
		var s7ViewerFuncsIsAdded = false;
	
		//resolve the config that was passed into constructor
		resolveConfig(localconf);		
		
		if (!ignoreServerConfig){
			loadServerConfig();
		}else{					
			delayInit();
		}	
		var scope = this;
	
		function setDomains(){
						
			if (defaultDomain == "")
				defaultDomain 		= getDefaultDomain();
				
			serverUrl 			= resolveUrl(defaultDomain, serverUrl);			
			//check if HTTPS or not
			if(defaultDomain.indexOf("https:") == 0){https = true;};		
		};
		//look to see if a server is defined in the configuration
		//if not, use a path to the configuration servlet derived from where the JavaScript is loaded from
		function getDefaultDomain(){
			//this is the overall default unless appUrl is defined
			var sRoot = s7ueUtils.getLibrarySourceDomain("s7ueUtils.js");
			//if appUrl isn't empty, check it first to see if it is an URL (http:)
			//use it for the servlet call and get the domain from the appUrl to resolve the server URL
			if(appUrl != ""){
				var dUrl = resolveAppUrl(appUrl, sRoot);				
				sRoot = dUrl;
			}else if (isr != ""){
				sRoot = isr;
				resolveAppUrl(sRoot, serverContext);	
			}else
				resolveAppUrl(sRoot, appUrl);	
						
			var hasTrailingSlash = sRoot.charAt(sRoot.length - 1) === "/";
			if (!hasTrailingSlash){
				sRoot += "/";	
			}
			return sRoot;									
		};
		function resolveAppUrl(url, jsDefault){
			var result = "";
			//full URL, resolve to this domain + this context (s7 is default)
			if (url.indexOf("http") == 0){
				var parts = url.split("/");
				if (parts.length > 2){
					var http = parts[0];
					var domain = parts[2];
					var context;
					if (parts.length > 3)
						context = parts[3];
					//set the default domain to this domain
					result = http + "//" + domain + "/";
					//use the context of appUrl OR default of '/s7'
					appUrl = http + "//" + domain + "/" + ((typeof context == "undefined" || context == "") ? (serverContext == "") ? "/s7" : serverContext : context);
					appUrl = s7ueUtils.normalizeFullURL(appUrl);
					return result;
				}
			}else{
				appUrl = s7ueUtils.normalizeFullURL(jsDefault + "/" + url);
				result = jsDefault;	
			}
			return result;
		}
		function resolveUrl(domain, context){
			var result = "";
			if (context.indexOf("http") == 0){
				result = context;
			}else if (context.indexOf("/") == 0){
				result = domain + context;
			}else{
				if (context.indexOf("/") == (context.length -1 ) ){
					result = domain + context;
				}else{
					result = domain + "/" + context;	
				}
			}
			//remove any double slashes that may occur
			result = s7ueUtils.normalizeFullURL(result);
			return result;		
		};		
		//initialize the embedded viewer		
		function init(){			

			enableRefresh = true;
			if(pendingRefresh){
				pendingRefresh = false;
				refresh();
				return;
			}

			container = document.body;
			video.sroot = streamingVideoUrl;
			video.proot = progressiveVideoUrl;			        
        	if(video.sroot != "") video.method = "stream";
        	if (isPopUp){
        		stageSize = getStageSize();
        	}
			//resolve the various domains
			setDomains();
			
			var reqString = serverUrl + getUniversalPreset() + s7uev.JSON_REQUEST_STRING + ((cache == "off") ? "&cache=off" : "");
			s7ueUtils.Callback.createCall(reqString, responsePreset, null, scope);
			
			//add a small line of tracking to page
			buildMessaging();		
		};
		function getStageSize(){			
			var size = s7ueUtils.page.get("stageSize");
			var stageSize = null;
	    	if (size) {
	            var sizeArray = size.split(",");
	            if (sizeArray.length == 2) {
	                    stageSize = {w:parseInt(sizeArray[0]), h:parseInt(sizeArray[1])};
	            }
	    	} 
	    	return stageSize;
		};
		function delayInit(){
			setTimeout(init, startupDelay);	
		};
		function delayResize(){
			if (!viewer.size.custom){
				s7ueUtils.browser.detectScreen();
				var w = s7ueUtils.browser.screensize.w;
				var h = s7ueUtils.browser.screensize.h;
				//now resize the proper viewer object
				if (viewerProxy != null)
					viewerProxy.resize(w,h);
			}
		};		
		//called when embedded viewer has already been embedded and 
		//client wants to change asset of embedded viewer
		var pendingRefresh = false;  
		var enableRefresh = false;
		function refresh(){	
			// block refresh until initial load is complete
			if(!enableRefresh) {
				pendingRefresh = true;
				return;
			}
			//reset anything that needs resetting
			cleanUp();		
			//call init again
			init();
		};
		function cleanUp(){
			viewer.path = "";
			s7ue = undefined;
			removeTargetDiv(containerId);
			setTargetDiv(containerId);
			
		};
		function loadServerConfig(){
			getDefaultDomain();
			var resolvedServer = appUrl;
			s7ueUtils.Callback.createCall(resolvedServer + "/s7ue?company=" + getCompany() + "&target=production" +
					(config2 != null ? "&config2="+config2 : ""), onConfigResponse, null, this);		
		};		
		function onConfigResponse(json){
			resolveServerConfig(json);
			enableRefresh = true;
			if(pendingRefresh){
				pendingRefresh = false;
				refresh();
			} else {
			delayInit();
			}
		};
		//creates a request using the image.src to add a line of logging to the server log.
		function buildMessaging(){
			var tmpImg = new Image();
				tmpImg.src = serverUrl + getCompany() + "?req=message&message=s7embed," + buildTimeToolVersion;
		};
		//parses the configuration object either from server or passed in from constructor
		function resolveConfig(conf){
			if (s7ueUtils.isValid(s7uev.FALLBACK_POLICY, conf)){
				fallbackPolicy = conf.fallbackPolicy;
			}			
			if (s7ueUtils.isValid(s7uev.ASSET, conf)){
				asset = conf.asset;
			}
			if (s7ueUtils.isValid(s7uev.DEF_IMAGE, conf)){
				defaultImg = conf.defaultImg;
			}
			if (s7ueUtils.isValid(s7uev.CACHE, conf)){
				cache = conf.cache;
			}
			if (s7ueUtils.isValid(s7uev.IGNORE_SERVER_CONFIG, conf)){
				ignoreServerConfig = conf.ignoreServerConfig;
			}			
			if (s7ueUtils.isValid(s7uev.START_UP_DELAY, conf)){
				startupDelay = conf.startupDelay;
			}
			if (s7ueUtils.isValid(s7uev.ASSETTYPE, conf)){
				assetType = conf.assetType;
			}			
			if (s7ueUtils.isValid(s7uev.CONFIG, conf)){
				config = conf.config;
			}
			if (s7ueUtils.isValid(s7uev.CONTAINER_ID, conf)){
				containerId = conf.containerId;
				//get the DIV attributes and
				//assign the DIV object
				setTargetDiv(containerId);
			}
			if (s7ueUtils.isValid(s7uev.ACTION_INDICATOR, conf)){
				actionIndicator = conf.actionIndicator;	
			}
			if (s7ueUtils.isValid(s7uev.ISR, conf)){
				isr = conf.isr;	
			}
			if (s7ueUtils.isValid(s7uev.APP_URL, conf)){
				appUrl = conf.appUrl;
			}
			if (s7ueUtils.isValid(s7uev.ASSET_CONTEXT, conf)){
				assetContext = conf.assetContext;
			}
			if (s7ueUtils.isValid(s7uev.SERVER_CONTEXT, conf)){
				serverContext = conf.serverContext;	
			}else{
				serverContext = "s7";	
			}
			if (s7ueUtils.isValid(s7uev.LOCALE, conf)){
				locale = conf.locale;
			}
			if (s7ueUtils.isValid(s7uev.USE_DIV_SIZE, conf)){
				useDivSize = conf.useDivSize;
			}
			if (s7ueUtils.isValid(s7uev.CODE_URL, conf)){
				codeUrl = conf.codeUrl;
			}
			if (s7ueUtils.isValid(s7uev.CONTENT_URL, conf)){
				contentUrl = conf.contentUrl;
			}
			if (s7ueUtils.isValid(s7uev.SERVER_URL, conf)){
				serverUrl = conf.serverUrl;
			}
			if (s7ueUtils.isValid(s7uev.PROGRESSIVE_VIDEO_URL, conf)){
				progressiveVideoUrl = conf.progressiveVideoUrl;
			}
			if (s7ueUtils.isValid(s7uev.STREAMING_VIDEO_URL , conf)){
				streamingVideoUrl = conf.streamingVideoUrl;
			}
			if (s7ueUtils.isValid(s7uev.FLASH_WMODE, conf)){
				flashMode = conf.flashMode;
			}
			if (s7ueUtils.isValid(s7uev.CONTAINER_COLOR, conf)){
				containerColor = conf.containerColor;
			}
			if (s7ueUtils.isValid(s7uev.POSTER_IMAGE, conf)){
				posterImage = conf.posterImage;
			}
			if (s7ueUtils.isValid(s7uev.MODIFIERS, conf)){
				modifiers = conf.modifiers;
			}
			if (s7ueUtils.isValid(s7uev.IS_POPUP, conf)){
				isPopUp = conf.isPopUp;
			}
			if (s7ueUtils.isValid(s7uev.CONFIG_2, conf)){
				config2 = conf.config2;
			}
			if (s7ueUtils.isValid(s7uev.OMNITURE_URL, conf)){
				omnitureUrl = conf.omnitureUrl;
			}
		};
		//used to map from the servlet response, if used, to the config object
		function resolveServerConfig(conf){
			if (s7ueUtils.isValid(s7uev.ASSET_CONTEXT, conf)){
				if (assetContext == "")
					assetContext = conf.assetContext;
			}
			if (s7ueUtils.isValid(s7uev.PROGRESSIVE_VIDEO_URL, conf)){
				if (progressiveVideoUrl == "")
					progressiveVideoUrl = conf.progressiveVideoUrl;
			}
			if (s7ueUtils.isValid(s7uev.STREAMING_VIDEO_URL, conf)){
				if (streamingVideoUrl == "")
					streamingVideoUrl = conf.streamingVideoUrl;
			}
			if (s7ueUtils.isValid(s7uev.LOCALE, conf)){
				if (locale == "")
					locale = conf.locale;
			}
			if (s7ueUtils.isValid(s7uev.CODE_URL, conf)){
				if (codeUrl == "")
					codeUrl = conf.codeUrl;
			}
			if (s7ueUtils.isValid(s7uev.CONTENT_URL, conf)){
				if (contentUrl == "")
					contentUrl = conf.contentUrl;
			}
			if (s7ueUtils.isValid(s7uev.SERVER_URL, conf)){
				if (serverUrl == "")
					serverUrl = conf.serverUrl;
			}
			if (s7ueUtils.isValid(s7uev.OMNITURE_URL, conf)){
				if (omnitureUrl == "")
					omnitureUrl = conf.omnitureUrl;
			}
			if (s7ueUtils.isValid("imageMapSupport", conf)){
				if (typeof(s7uevFnParameters) == 'undefined'){
					s7uevFnParameters = conf.imageMapSupport;
					updateFnParameters();
				}
			}
		};
		function updateFnParameters(){
			if (typeof(s7uevFnParameters) == 'undefined')
				return;
			s7uev.imageMapSupport.callBack = s7uevFnParameters.callBack; 
			s7uev.imageMapSupport.urlPassBack = s7uevFnParameters.urlPassBack; 
			s7uev.imageMapSupport.windowName = s7uevFnParameters.windowName; 
			s7uev.imageMapSupport.windowFeatures = s7uevFnParameters.windowFeatures; 
		};
		function getCompany(){
			var ca = asset.split("/");
			if (ca.length > 1){
				return ca[0];	
			}
			return "";
		};
		function getUniversalPreset(){
			var ca = config.split("/");
			if (ca.length > 1){
				return config;	
			}else{
				return getCompany() + "/" + config;
			}
		};
		function getActionIndicator(){
			if (actionIndicator == "") return actionIndicator;
			var ca = actionIndicator.split("/");
			if (ca.length > 1){
				return actionIndicator;	
			}else{
				return getCompany() + "/" + actionIndicator;
			}
		};
		function setTargetDiv(containerId){
			var divObj = document.getElementById(containerId);
			if (divObj == null){
				divObj = document.createElement("div");
				divObj.setAttribute("id", containerId);
				document.body.appendChild(divObj);
				targetdiv = divObj;			
			}else{	
				targetdiv = divObj;
				var curr_width = parseInt(divObj.offsetWidth);			
				var curr_height = parseInt(divObj.offsetHeight);	
				if ((!isNaN(curr_width)) && (!isNaN(curr_height))){
					viewer.size.w = curr_width;
					viewer.size.h = curr_height;
				}		
			} 
			
		};
		function removeTargetDiv(containerId){
			var divObj = document.getElementById(containerId);
			divObj.innerHTML = "";
		};		
		function loadCSS(url, callback){
			
			var link = document.createElement('link');
				link.type = 'text/css';
				link.rel = 'stylesheet';
				link.href = url;
		
			document.getElementsByTagName('head')[0].appendChild(link);
		
			var img = document.createElement('img');
				img.onerror = function(){
					(callback) ? callback(link) : alert('Style sheet loaded but callback not assigned. Viewer will not load');
				};
				img.src = url;
		};	
		function newskins(json){
			var elems = serverUrl.split("/");
			var fullDomain = "";
			if (elems.length >= 3){
				fullDomain = elems[0] + "//" + elems[2];
			}
			var flcss = fullDomain + "/skins/" + json.style;
			
			loadCSS(flcss, styleIsLoaded);
			
		};
		function styleIsLoaded(){			
			commonResponsePreset(s7UEresp);
		};
	    function buildUserDataURL(configStr, imageServer){
	    	var userDataURL = "";
	        if(configStr != null){
                configStr = decodeURIComponent(configStr);   
                if(configStr != null){
                    var configParts = configStr.split("\\?");
                    var configBase = configParts[0];
                    var configParams = null;
                    if(configParts.length > 1){
                        configParams = configParts[1];
                    }
                    if(configBase.indexOf("http") == 0){//check absolute path
                        var configBaseParts = configBase.split("/");
                        for(var i = 0; i < configBaseParts.length; i++){
                            userDataURL += (userDataURL.length > 0 ? "/" : "");
                            if(i == configBaseParts.length - 1){
                                //encode only the last ID part   
                                userDataURL += encodeURIComponent(configBaseParts[i]);                             
                            }
                            else{
                                userDataURL += configBaseParts[i];
                            }
                        }
                    }
                    else{        
                        var configBaseParts = configBase.split("/");
                        if(configBaseParts.length > 1){ 
                            for(var i = 0 ; i < configBaseParts.length; i++){
                                userDataURL += (userDataURL.length > 0 ? "/" : "");
                                if(i == configBaseParts.length - 1){
                                    //encode only the last ID part 
                                    userDataURL += encodeURIComponent(configBaseParts[i]);                               
                                }
                                else{
                                    userDataURL += configBaseParts[i];
                                }
                            }
                        }
                        else{
                            userDataURL = this.getCompany()+"/"+encodeURIComponent(configBase);
                        }
                        userDataURL = imageServer + userDataURL;
                    }
                    if(configParams != null){
                        userDataURL += "?" + configParams;
                    }
                }
                userDataURL += (userDataURL.indexOf("?") != -1 ? "&req=userdata" : "?req=userdata");
	        }	        
	        return userDataURL;
	    } 
	    
		function getConfigFromViewerSetup(p_path){
			var p = "";
			var lp = p_path.split("?");
			var cItm = "";
			for (var itm in lp)
			{
				var im = lp[itm];
				im = unescape(im);
				var parts = im.split("&");
				
				for (var i = 0; i < parts.length;i++){
					try{
						var strs = parts[i];
						if (strs.indexOf("config=") > -1)
						{
							cItm = strs.split("=")[1];	
						}	
					}
					/*fail silently*/
					catch(e){};					
				}
				
			}
			return cItm;
		};
		
		function responsePreset(json){
			if (json == undefined) return;
			s7UEresp = json;
			resolveViewerSetup(json);
			if(currentViewerSetup.indexOf('flash') == 0 && fallbackPolicy != null && !s7ueUtils.isFlash()){
				config = fallbackPolicy;
				fallbackPolicy = null;
				setTimeout(refresh,0);
				return;
			}
			commonResponsePreset(json);
		}
			
		function commonResponsePreset(json){
			
			var defImg = json["defaultImage"];
			
			if ((typeof defImg != "undefined") && (defaultImg == ""))
				defaultImg = defImg;
			
			viewerList = json;  
			if(!shouldEmbedViewer(json)){//if there isn't any universal preset
				buildByType();
			}else{
				var pureasset = asset; 
				if(asset.indexOf("?", 0) != -1){
					pureasset = asset.substring(0, asset.indexOf("?"));
					viewer.isCommand = asset.substring(asset.indexOf("?") + 1); 
				}
				var reqString = serverUrl + pureasset + s7uev.REQ_SET_REQUEST_STRING;
				s7ueUtils.Callback.createCall(reqString, getImageForNoPreset, null, scope);
			}
		};
		function createTracking(){
			if(omnitureIsAdded || omnitureUrl == ""){
				omnitureIsAdded = true;
				return false;
			}
			
			if(!omnitureIsAdded){
				switch(viewer.type){
					case "flashas2":
					case "flashas3":
					case "flashas3x":
						loadTrackingSupport();
						omnitureIsAdded = true;
						return true;
				}
			}
			omnitureIsAdded = true;
			return false;
		};		
		function getViewerPath(){
			var viewerUrl = "";    	
		    var localePathMod = "";
			var vpath = viewer.path;
		    if(viewer.path && viewer.path != ""){
				if(viewer.path.indexOf("$codeRoot$") < 0 && viewer.path.indexOf("$contentRoot$") < 0 ){
					viewerUrl = contentUrl + vpath;				
				}
				else{				
					viewerUrl = vpath.replace("$codeRoot$",codeUrl);
		            viewerUrl = viewerUrl.replace("$contentRoot$",contentUrl);
				}                        
		        if(viewerUrl.indexOf("http") != 0) viewerUrl = (defaultDomain == "/" ? "" : defaultDomain) + viewerUrl;
			}
			viewerUrl = s7ueUtils.normalizeFullURL(viewerUrl);
			return viewerUrl;
		};
		function createFullOmnitureURL(){

			var vPath = getViewerPath();
			
			if((vPath.indexOf("http://") == 0) || (vPath.indexOf("https://") == 0)){
				var ar = vPath.split("/");
				vPath = ar[0]+"//"+ar[2];
            } else 
            	vPath = "/"; 
			
			var omnitureFullUrl = resolveUrl(vPath, omnitureUrl);
            omnitureFullUrl = omnitureFullUrl+"?company="+getCompany();
            if(!(config2 == "companypreset") || !(config2 == "")){
            	omnitureFullUrl += "&preset=" + config2;
            }
			return omnitureFullUrl;
		};		
		function loadTrackingSupport(){
			var scriptElm = document.createElement("script");
			scriptElm.setAttribute("src", createFullOmnitureURL());
			document.getElementsByTagName("head")[0].appendChild(scriptElm);
			var inst = this;
			scriptElm.onload = scriptElm.onerror = function () {
				if(!this.executed) {
					this.executed = true;
					loadedTrackingCallback();
				}
			};
			
			scriptElm.onreadystatechange = function () {
				var self = this;
				if(this.readyState == "complete" || this.readyState == "loaded") {
					setTimeout(function(){	self.onload();}, 0);
				}
			};
		};
		function loadedTrackingCallback(){
			
			if(viewer.type == "flashas3" || viewer.type == "flashas3x"){
				if(typeof(window.s7ComponentEvent) == 'undefined'){
					window.s7ComponentEvent = function (objID, compClass, instName, timeStamp, eventData){
				    		s7track(eventData);
					};
				}
			}
			buildByType();
		};
		function createS7ViewerFuncs(){
			getDefaultDomain();
			var resolvedServer = s7ueUtils.getLibrarySourceDomain("s7ueUtils.js") + serverContext; // local test
			var scriptElm = document.createElement("script");
			scriptElm.setAttribute("src", resolvedServer+"/JavaScript/s7ViewerFuncs.js");
			document.getElementsByTagName("head")[0].appendChild(scriptElm);
			var inst = this;
			scriptElm.onload = scriptElm.onerror = function () {
				if(!this.executed) {
					this.executed = true;
					s7ViewerFuncsIsAdded = true;
					buildByType();
				}
			};
			
			scriptElm.onreadystatechange = function () {
				var self = this;
				if(this.readyState == "complete" || this.readyState == "loaded") {
					setTimeout(function(){	self.onload();}, 0);
				}
			};
		};
		function buildByType(){
			if(!s7ViewerFuncsIsAdded && !isPopUp){
				createS7ViewerFuncs();
				return;
			}
			
			switch(assetType)
			{
				case s7uev.MASTER_PRESET_TYPES.UNIVERSAL_VIDEO: 
					if(createTracking()){
						return;
					}
					var call = s7ueUtils.wrapContext(buildVideo, scope); 
					call();
				break;					
				case s7uev.MASTER_PRESET_TYPES.UNIVERSAL_ZOOM:
				case s7uev.MASTER_PRESET_TYPES.UNIVERSAL_SWATCH_SET:
				case s7uev.MASTER_PRESET_TYPES.UNIVERSAL_IMAGE_SET:
				case s7uev.MASTER_PRESET_TYPES.UNIVERSAL_E_CAT:
				case s7uev.MASTER_PRESET_TYPES.UNIVERSAL_SPIN_SET:
					if(createTracking()){
						return;
					}
					var call = s7ueUtils.wrapContext(buildZoom, scope); 
					call();
				break;
				default:
					buildNoViewer("","");
				break;								
			}

		};
		
		function resolveViewerSetup(json){
			
			var viewerSetup = json[s7ueUtils.device.name+s7ueUtils.device.version];
			if(typeof viewerSetup == "undefined" || viewerSetup == "" ){
				viewerSetup = json[s7ueUtils.device.name]; 
			}
			
			if (typeof viewerSetup != "undefined"){
				currentViewerSetup = viewerSetup;
				resolveCurrentViewerTypeAndPath();
			}			
		};
		function resolveCurrentViewerTypeAndPath(){
			
			if (s7ueUtils.device.isIOS() && assetType == s7uev.MASTER_PRESET_TYPES.UNIVERSAL_VIDEO){
				viewer.path =  s7ueUtils.normalizeFullURL(defaultDomain + assetContext + asset + ".m3u8");
			}else{
				var settingParts = currentViewerSetup.split(",");
				viewer.type = settingParts[0];			
				for(var i = 1; i < settingParts.length; i++){
					viewer.path += (viewer.path!=""? ",":"") + settingParts[i]; 
				};
			}
		};
		//the logic is, if the device ios and we're video,
		//there really isn't a 'viewer' and we create a poster image that links to the m3u8 streaming asset.
		//if not video and either ios/android or desktop, then check if there is a viewer config
		//if there is - we can embed viewer, if not, we embed a poster image
		function shouldEmbedViewer(json){
			if (((s7ueUtils.device.isIOS())) && (assetType == s7uev.MASTER_PRESET_TYPES.UNIVERSAL_VIDEO)){
				return false;
			}else{
				var viewerSetup = viewerList[s7ueUtils.device.name+s7ueUtils.device.version];
				if (typeof viewerSetup == "undefined"){
					viewerSetup = viewerList[s7ueUtils.device.name];
				}
				return (typeof viewerSetup == "undefined");		
			}
		};		
		function getImageForNoPreset(json){		
			var img = "";     
			var setRsp = json;
			var defImgUrl = "";
			var defImgSize = {w:0,h:0};
			if(setRsp.set){            
				if(setRsp.set.type && setRsp.set.type == "img"){//single image
					if(setRsp.set.item){
						defImgUrl = setRsp.set.item.i.n;
						defImgSize.w = setRsp.set.item.dx;
						defImgSize.h = setRsp.set.item.dy;					                    
					}
				}
				else{
					if(setRsp.set.item && setRsp.set.item.length > 0){
						if (typeof setRsp.set.item[0].set != "undefined"){
							defImgUrl 		= setRsp.set.item[0].set.item[0].i.n;
							defImgSize.w 	= setRsp.set.item[0].set.item[0].dx;
                   			defImgSize.h 	= setRsp.set.item[0].set.item[0].dy;
						}else{
							defImgUrl 		= setRsp.set.item[0].i.n;	
							defImgSize.w 	= setRsp.set.item[0].dx;
                   			defImgSize.h 	= setRsp.set.item[0].dy;
						}			   
					}
				}
				var isCmd = viewer.isCommand;
				delete viewer.isCommand;
				buildNoViewer(defImgUrl,defImgSize, isCmd);
			}
		};
		function buildNoViewer(baseImg,imgSize, isCmd){
			if(baseImg == ""){      
				var noViewerText = targetdiv;
				noViewerText.style.lineHeight = viewer.size.h + "px";
				noViewerText.setAttribute("align","center"); 
				noViewerText.appendChild(document.createTextNode("No Viewer for your device"));
				document.body.appendChild(noViewerText);
			}
			else{
				var imgUrl = "";
				if(defaultImg.indexOf("?")==0){
					imgUrl = serverUrl +  baseImg + defaultImg;
				}
				else if (defaultImg != ""){
					imgUrl = serverUrl + baseImg + "?" + defaultImg;
				}else{
					imgUrl = serverUrl 	+ baseImg;	
				}
				if(typeof(isCmd) != 'undefined' && isCmd != ""){
					imgUrl += (imgUrl.indexOf("?") != -1 ? "&" : "?") + isCmd;
				}
				var finalSize = {w:0,h:0};
				
				finalSize.w = imgSize.w;
				finalSize.h = imgSize.h;
				
				if(imgUrl.indexOf("hei=") < 0 || imgUrl.indexOf("wid=") < 0){
					imgUrl += (imgUrl.indexOf("?") > 0 ? "&" : "?") + "hei="+parseInt(finalSize.h)+"&wid="+parseInt(finalSize.w);
				}
				
				var divImg = document.createElement("div");
				divImg.style.lineHeight = viewer.size.h + "px";
				divImg.style.height = viewer.size.h + "px";
				divImg.style.width = viewer.size.w + "px";
				divImg.setAttribute("align", "left");
				var noViewerImg = document.createElement("img");
				noViewerImg.setAttribute("src", imgUrl);
				noViewerImg.setAttribute("height",finalSize.h);
				noViewerImg.setAttribute("width",finalSize.w);
				noViewerImg.setAttribute("alt", "");
				divImg.appendChild(noViewerImg);
				targetdiv.appendChild(divImg);
				
			}
        
    	};
		function buildZoom(){
			var iViewer = new s7uev.ImageView(asset, 
												defaultDomain, 
												serverUrl, 
												viewer, 
												viewerList,											 
												stageSize, 
												targetdiv, 
												contentUrl, 
												codeUrl, 
												modifiers, 
												getCompany(), 
												flashMode, 
												containerColor, 
												currentViewerSetup, 
												getActionIndicator(), 
												https,
												locale,
												isPopUp,
												config2);
			viewerProxy = iViewer;
		}
		function buildVideo(){	
			var vViewer = new s7uev.VideoView(asset,
												defaultDomain, 
												serverUrl, 
												assetContext, 
												viewer, 
												viewerList, 
												stageSize, 
												targetdiv, 
												video, 
												contentUrl, 
												codeUrl, 
												modifiers, 
												getCompany(), 
												flashMode, 
												containerColor, 
												currentViewerSetup, 
												getActionIndicator(), 
												https, 
												posterImage,
												locale,
												isPopUp,
												config2);
			viewerProxy = vViewer;
			
		};
		//create public getters/setters
		var getAsset = function(){ return asset; };		
		var setAsset = function(a){ asset = a; };
		var getAssetType = function() { return assetType; };
		var setAssetType = function(t) { assetType = t; };
		var setConfig = function (t) { config = t; };
		var getConfig = function() { return config; };
		//this could also, in the case of video, be bitrate for device
		var getViewerType = function() { return viewer.type; };
		//return a reference to the DIV object
		var getTargetDiv = function(){ return targetdiv; };		
		//create public API response		
		var interface = {
			getAsset:getAsset,
			setAsset:setAsset,
			setConfig:setConfig,
			getConfig:getConfig,
			getAssetType:getAssetType,
			setAssetType:setAssetType,
			refresh:refresh,
			delayInit:delayInit,
			delayResize:delayResize,
			viewerProxy:viewerProxy
		};
		//return reference to public API		
		return interface;

});
};

/*
*	@class ImageView
*	@private
*
*
*/
s7uev.ImageView = function(asset, defaultDomain, serverUrl, viewer, viewerList, stageSize, targetdiv, contentUrl, codeUrl, modifiers, company, flashMode, containerColor, currentViewerSetup, actionIndicator, https, locale, isPopUp, config2){
	
	var setImageList = null;
	var isImageSet = false;
	var scope = this;
	var isFlyout = false;
	var currentViewerConfig = null;
	var iframeTarget = null;

	viewer.config2 = config2;
	var pureasset = asset; 
	if(asset.indexOf("?", 0) != -1){
		pureasset = asset.substring(0, asset.indexOf("?"));
		viewer.isCommand = asset.substring(asset.indexOf("?") + 1); 
	}
	var reqString = serverUrl + pureasset + s7uev.REQ_SET_REQUEST_STRING;		
	
	if(typeof currentViewerSetup != "undefined" && currentViewerSetup != ""){		
		//check to see if it is a flyout viewer - we have to inject JS dynamically in this case
		try{
			//todo: we need the 'right' way to do this or just not have so many fringe cases for embedding
			isFlyout = (currentViewerSetup.indexOf(s7ueUtils.ZOOM_VIEWER_LINKS.ZOOM_VIEWER_LINKS_FLYOUT) > -1);
		}
		catch(e){};
		//this is here for the desktop flyout embed...I just do it here regardless of platform because overhead is minimal
		var vConf = getConfigFromViewerSetup(currentViewerSetup);
		currentViewerConfig = vConf;		
		//the logic goes, if you are NOT a desktop device AND you are HTML or HTML5, then create a link that will show a poster image
		//if you are a desktop, even if you are HTML or HTML 5, go ahead and make an iframe with the viewer
		if ((!(s7ueUtils.device.name == "desktop")) && ((viewer.type == "dhtml") || (viewer.type == "html5"))){															
			s7ueUtils.Callback.createCall(reqString, viewerImageSetResponse, null, scope);
		}else{
			prepareViewer();
		}
	}else{
		s7ueUtils.Callback.createCall(reqString, getImageForNoPreset, null, scope);					
	};
	//added resize to prototype chain - needed so that API is available on instance
	this.resize = function(w,h){
		if (iframeTarget != null){
			iframeTarget.setAttribute("width",w);
			iframeTarget.setAttribute("height",h);
		}else{
			viewer.size.w = s7ueUtils.browser.screensize.w; 
            viewer.size.h = s7ueUtils.browser.screensize.h;
            buildFlash();
		}

	};
	function viewerImageSetResponse(json){
		var img = "";
		if (json.set.item.length > 1){
			viewer.isImageSet = true;
		}
		if (json.set.item)
		{
			setImageList = getListOfImages(json);
			prepareViewer();	
		}
	};
	function getConfigFromViewerSetup(p_path){
		var p = "";
		var lp = p_path.split("?");
		var cItm = "";
		for (var itm in lp)
		{
			var im = lp[itm];
			im = unescape(im);
			var parts = im.split("&");
			
			for (var i = 0; i < parts.length;i++){
				try{
					var strs = parts[i];
					if (strs.indexOf("config=") > -1)
					{
						cItm = strs.split("=")[1];	
					}	
				}
				/*fail silently*/
				catch(e){};					
			}
			
		}
		return cItm;
	};
	function getListOfImages(json){
		
		var l = new Array();
		var p = json.set.item;	
		if (p.length > 0){
			for (var i = 0; i < p.length; i++)
			{
				if (p[i].set){
					for (var y = 0; y < p[i].set.item.length; y++){
						l.push( getImgFromItem(p[i].set.item[y]));							
					}
					break;
				}else{
					l.push(getImgFromItem(p[i]));	
				}				
			}			
		}else{				
			img = getImgFromItem(p);
			l.push(img);
		}
		return l;
	};
	function getImgFromItem(itm){
		return itm.i.length > 0 ? itm.i[0].n : itm.i.n;
	};
	function prepareViewer(){
		var vpathParts = viewer.path.split("&");
		for(var j=0; j < vpathParts.length; j++){
			if(vpathParts[j].toLowerCase().indexOf("stagesize") >= 0){
				var sParts = vpathParts[j].split("=");				
				if(sParts.length > 0){
					var newsizes = unescape(sParts[1]);	
					var sizes = newsizes.split(",");						
					if(sizes.length > 1){
						viewer.size.w = sizes[0];
						viewer.size.h = sizes[1];
						break;
					}
				}				
			}
		}
			
		if(viewer.size.w <= 0) {viewer.size.w = s7ueUtils.browser.screensize.w;viewer.size.custom = false;}
		if(viewer.size.h <= 0) {viewer.size.h = s7ueUtils.browser.screensize.h;viewer.size.custom = false;}		
			
		if((viewer.type == "dhtml") || (viewer.type == "html5")){
			if ((isFlyout) && (s7ueUtils.device.name == "desktop")){
				loadFlyoutSupport();
			}else if (s7ueUtils.device.name == "desktop"){
				buildIframe();
			}else{
				if (isPopUp){
					redirect();
				}else{
					buildTabletAndMobileViewerLink();
				}
			}        
		}else if(viewer.type == "flashas2" || viewer.type == "flashas3"){
			buildFlash(true);
		}				
	};
	function appendParameter(path, par){
		return path+(path.indexOf("?") >=0 ? "&":"?")+par; 
	};
	function buildTabletAndMobileViewerLink(){		
		var p1 = getViewerPath();
		var img = getViewerPath()+((p1.indexOf("?") >= 0 ? "&" :"?") + buildParams());
		if(viewer.config2 != "")
			img = appendParameter(img, "config2="+viewer.config2);
		buildMobilePageLink(img);		
	};
	function buildFlash(){    
		var movieid = s7ueUtils.guidGenerator();		  
		s7uev.instance = "s7ueobj_" + movieid; // use internal generated object name
		targetdiv.style.width = viewer.size.w+ "px";
		targetdiv.style.height = viewer.size.h+ "px";
		//is there a div color defined? if so, set the backgroundcolor of the div to that
		(containerColor != "") ? (targetdiv.style.backgroundColor = containerColor) : "";   	
        var embedString = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
       	' codebase="'+ (https ? 'https' : 'http') +'://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" '+
  		' id="s7ueobj_' + movieid + '" width="'+viewer.size.w+'" height="'+viewer.size.h+'" align="" >'+
  		' <param name="movie" value="'+getViewerPath()+(getViewerPath().indexOf("?") >= 0 ? "&" :"?")+buildParams() +'">'+
  		' <param name="menu" value="false"> <param name="quality" value="high">'+ 
  		' <param name="salign" value="LT">'+                    
  		' <param name="allowScriptAccess" value="always">'+ 
        ' <param name="allowFullScreen" value="true">'+
		' <param name="wmode" value="' + flashMode + '">'+
        ' <embed src="'+getViewerPath()+(getViewerPath().indexOf("?") >= 0 ? "&" :"?")+buildParams() +'"'+
        ' quality="high" width="'+viewer.size.w+'" height="'+viewer.size.h+'" SWLIVECONNECT="true" allowScriptAccess="always" '+
        ' name="s7ueobj_' + movieid + '"  id="s7ueobj_' + movieid + '" wmode="' + flashMode + '" type="application/x-shockwave-flash" allowFullScreen="true" PLUGINSPAGE="'+ (https ? 'https' : 'http') +'://www.macromedia.com/go/getflashplayer">'+
        ' </embed> </object>';
        if(viewer.type == "flashas3" || viewer.type == "flashas3x"){
        	embedString = "<div style='position:absolute'>" + embedString + "</div>";
        }
        targetdiv.innerHTML = embedString;       
	};  
	function buildIframe(){
		var iframe = document.createElement("iframe");
		iframeTarget = iframe;
		iframe.setAttribute("width",viewer.size.w);
		iframe.setAttribute("height",viewer.size.h);		
		iframe.setAttribute("allowTransparency","true");
		iframe.setAttribute("frameBorder","0");
		iframe.setAttribute("scrolling","no");
		targetdiv.appendChild(iframe);
		targetdiv.setAttribute("style", "width:" + viewer.size.w + ";height:" + viewer.size.h);
		var vPath = getViewerPath();
		var mod = "?";
		var p1 = getViewerPath();
		mod = p1.indexOf("?") > -1 ? "&" : "?";
		iframe.setAttribute("src", getViewerPath() + mod + buildParams());  
	};
	function getViewerPath(){
    	var viewerUrl = "";    	
        var localePathMod = "";
		var vpath = viewer.path;
        if(viewer.type == "flashas2") {
            localePathMod = (locale != "en" ? locale+"/" : "" );
            vpath = vpath.replace("flash/","flash/"+localePathMod);
        }
        if(viewer.path && viewer.path != ""){

    		if(viewer.path.indexOf("$codeRoot$") < 0 && viewer.path.indexOf("$contentRoot$") < 0 ){
    			viewerUrl = contentUrl + vpath;				
    		}
    		else{				
    			viewerUrl = vpath.replace("$codeRoot$",codeUrl);
                viewerUrl = viewerUrl.replace("$contentRoot$",contentUrl);
    		}                        
            if(viewerUrl.indexOf("http") != 0) viewerUrl = (defaultDomain == "/" ? "" : defaultDomain) + viewerUrl;
    	}
		viewerUrl = s7ueUtils.normalizeFullURL(viewerUrl);
		return viewerUrl;
    };
    function getConfig2(){
    	var cfg2 = "";
    	if(viewer.config2 != null && viewer.config2 != ""){
    		switch(viewer.type){
    		case "flashas2":
    			cfg2 = "&eventlog=javascript:s7track(%22$1$%22)";
    			break;
    		case "html5":
    			cfg2 = "&config2="+viewer.config2;
    			break;
    		}
    	}
    	return cfg2;
    };
    function buildParams(){

    	var modifierStr = getModifiers();

    	var params = (viewer.type == "flashas2" ? "image" : "asset")
					 + "="
					 + encodeURIComponent(asset) 
					 + '&locale=' + locale
					 + (viewer.type == "flashas2" ? "&contentRoot=" + contentUrl : (viewer.type == "flashas3") ? "" : "&contentRoot=" 
					 + ((viewer.type == "html5") ? s7ueUtils.normalizeFullURL(defaultDomain + contentUrl) : contentUrl)
					 + "&serverUrl=" + serverUrl)
					 + (modifierStr != "" ? "&" : "") + modifierStr 
					 + getConfig2()
					 ;
		return params;
    };
	function redirect(){
		var vpath = appendParameter(getViewerPath(), buildParams());
		if(viewer.config2 != "")
			vpath = appendParameter(vpath, "config2="+viewer.config2);
		window.location = vpath;
	};
	function loadFlyoutSupport(){
		//HACK HACK HACK HACK HACK 		
		if (typeof(s7ue) == 'undefined') {
			s7ue = new Object();
			s7ue.browser = new Object();
			s7ue.browser.name = s7ueUtils.browser.name;												 		
		}		
		if (typeof s7ue != "undefined"){
			if(typeof s7ue.viewer == "undefined"){
				s7ue.viewer = {};
				s7ue.viewerArray = [];
				s7ue.viewer.loadedFlyoutCallback = function(){
					for(var i=0;i<s7ue.viewerArray.length; i++) {
						s7ue.viewerArray[i]();
					}
					while(s7ue.viewerArray.length != 0){
						s7ue.viewerArray.pop();
					}
				}; 
				sj_codebase = s7ueUtils.normalizeFullURL(defaultDomain + codeUrl + "/dhtml/");
				
				var escr = document.createElement("script");
				var url = s7ueUtils.normalizeFullURL(sj_codebase + "sj_advancedflyout_embed.js");
				escr.setAttribute("src",url);
				document.getElementsByTagName("head")[0].appendChild(escr);
			} else {
				setTimeout(loadedFlyoutCallback, 0);
				return;
			}
			s7ue.viewerArray.push(loadedFlyoutCallback);	
		}		
	};
	function buildMobilePageLink(img){
	
		var vW 		= viewer.size.w;
		var vH 		= viewer.size.h;
		var oImg 	= buildOverlayImage(getViewerImage());
		var url 	= viewer.path;
		var myDIV 	= createDivLink(oImg, img);
		targetdiv.appendChild(myDIV);	   
	};
	function getViewerImage(){
		return setImageList[0];
	};
	function buildOverlayImage(img){
		
		var callToAction = ((actionIndicator == "") ? "Scene7SharedAssets/tap-for-more" : actionIndicator);
		var mURL = serverUrl + company + "?layer=0&src=/" + img + "&size=" + viewer.size.w + "," + viewer.size.h + "&layer=1&src=/" + callToAction + "&scl=1&wid=" + viewer.size.w + "&hei=" + viewer.size.h;
		return mURL;		
	
	};
	function createDivLink(p_img, p_link){
		
		var divObj = document.createElement("div");
		var img = document.createElement("img");	
		img.setAttribute("src", p_img);
		var targ = document.createElement("a");
		if (typeof p_link != "undefined"){
			targ.appendChild(img);
			targ.setAttribute("href", p_link);
			targ.setAttribute("target", "_self");
			divObj.appendChild(targ);
		}else
			divObj.appendChild(img);

			
	 	var ST = 'position:absolute'
		 	  +'; text-align:center'
			  +';display: table-cell; vertical-align: middle';
		  
			divObj.setAttribute("style", ST);
	
			return divObj;		
	};
	function getModifiers(){
		var modifierStr = modifiers.all != null ? modifiers.all : "";
    	var viewerTyp = viewer.type == "flashas3" || viewer.type == "flashas3x" ? "flashas3" : viewer.type; 
    	modifierStr += modifiers[viewerTyp] != null ? (modifierStr != "" ? "&" : "") + modifiers[viewerTyp] : "";
    	return modifierStr;
	};
	function createFlyoutViewer(){		
		var divId = targetdiv.getAttribute("id");
		var modifierStr = getModifiers();
		modifierStr = modifierStr.split("&");
		
		var flyout = new s7js.flyout.AdvancedFlyout();
			flyout.setTargetId(divId);
			flyout.setParameter('serverUrl', serverUrl);
			flyout.setParameter('asset', asset);
			flyout.setParameter('config', currentViewerConfig);
			flyout.setParameter('contentRoot', contentUrl);
			for(var i=0;i<modifierStr.length; i++){
				var mod = modifierStr[i].split("=");
				flyout.setParameter(mod[0], mod[1]);
			}
			flyout.init();
	};
	function loadedFlyoutCallback(){
		createFlyoutViewer();
	};
	function markFlyout(id){
		isFlyoutLibLoaded[id] = true;      
		var allLoaded = true;
		for(var i=0; i < isFlyoutLibLoaded.length; i++) {
			allLoaded = (allLoaded && isFlyoutLibLoaded[i]);
		}
		if(allLoaded){
		// if all lib are loaded, now we can do init() and add other element for DHTML here
			createFlyoutViewer();				 
		}
	};
	function initializeFlyout(){
		flyout.init();
	};
};

/*
*	@class VideoView
*	@private
*
*	The VideoView class encapsulates the logic for embedding video viewers within the page.
*
*	@param {asset} The asset being shown in this embedded viewer. The asset is defined as 'companyName/assetName'.
*	@param {serverUrl} The image serving root. Used for all server requests for this particular viewer.
*	@param {assetContext} Defines where the video should be loaded. For FlashAS3X (latest) viewers it is is/content/. For legacy viewer, it is is/image/.
*	@param {viewer} A reference to the viewer object defined by the embed code wrapper. The viewer contains the height and width properties as well as the path to the viewer.
*	@param {viewerList} A reference to the JSON object representing the list of Universal URL viewers based on platform.
*	@param {stageSize} The size of the viewer defined as {w:100,h:50}.
*	@param {targetdiv} A reference to the HTMLDOMElement where the viewer will be embedded.
*	@param {video} A reference to the video object from the embed code wrapper.
*	@param {contentUrl} Defines where the skin or viewer path should load from.
*	@param {codeUrl} Defines where the viewer's should be loaded from.
*	@param {modifiers} An options list of URL modifiers to be added to the URL when calling the viewer.
*	@param {company} The company that is requesting this embedded viewer.asset.
*	@param {flashMode} Defines the object/embed Flash wmode. Default is 'window'.
*	@param {containerColor} Defines an optional parameter for the DIV backgroundColor style when embeding.
*/
s7uev.VideoView = function(asset, defaultDomain, serverUrl, assetContext, viewer, viewerList, stageSize, targetdiv, video, contentUrl, codeUrl, modifiers, company, flashMode, containerColor, currentViewerSetup, actionIndicator, https, posterImage, locale, isPopUp, config2){
	//all video embed logic here
	var assetId = parseMovieUrl(asset);	
	var scope = this;
	var flashcont = null;
	viewer.config2 = config2;
	
	if (s7ueUtils.device.isIOS()) { //iOS doesn't have viewer 
		viewer.path =  s7ueUtils.normalizeFullURL(defaultDomain + assetContext + asset + ".m3u8");
		if (isPopUp){
			redirect(viewer.path);
		}else{		
			                 		
			var reqString = serverUrl + asset+ s7uev.REQ_SET_REQUEST_STRING;
			//for the uvideo.jsp we need to make sure we have a size.
			if(viewer.size.w <= 0) {viewer.size.w = s7ueUtils.browser.screensize.w;viewer.size.custom = false;}
			if(viewer.size.h <= 0) {viewer.size.h = s7ueUtils.browser.screensize.h;viewer.size.custom = false;}	
				
			s7ueUtils.Callback.createCall(reqString, responseSetIphone, null, scope);     
		}
	}else{
	
		if(typeof currentViewerSetup != "undefined" && currentViewerSetup != ""){
			var settingParts = currentViewerSetup.split(",");              
			viewer.bitrate = parseInt(settingParts[0]);
			if(isNaN(viewer.bitrate + 0)){
				viewer.bitrate = -1; 
				viewer.type = settingParts[0];
			}
			if (stageSize !== null) {
                viewer.size.w = stageSize.w;
                viewer.size.h = stageSize.h;
            }else{
				// extract stage size from viewer path, if present
				var vpathParts = viewer.path.split("&");
				for(var j=0; j < vpathParts.length; j++){
					if(vpathParts[j].toLowerCase().indexOf("stagesize") >= 0){
						var sParts = vpathParts[j].split("=");
						if(sParts.length > 0){
							var newsizes = unescape(sParts[1]);
							var sizes = newsizes.split(",");
							if(sizes.length > 1){
								viewer.size.w = sizes[0];
								viewer.size.h = sizes[1];
								break;
							}
						}
					}
				}
			}
			
			//preset with no size
			if(viewer.size.w <= 0) {viewer.size.w = s7ueUtils.browser.screensize.w;viewer.size.custom = false;}
			if(viewer.size.h <= 0) {viewer.size.h = s7ueUtils.browser.screensize.h;viewer.size.custom = false;}
		}
		var reqString = serverUrl + asset + s7uev.REQ_SET_REQUEST_STRING;
		if (s7ueUtils.device.isAndroid() && viewer.bitrate > 0) {			
			s7ueUtils.Callback.createCall(reqString, responseSetAndroid, null, scope);
		}
		else if(getViewerPath() == ""){
			s7ueUtils.Callback.createCall(reqString, responseImg, null, scope);
		}
		else{
			if(viewer.type == "flashas3x" && video.method == "stream"){//mbr set viewer
				//TODO: for case of this.viewer.type == "flashas3x" to skip this and pass MBR set ... wait for respond from Derek on AS3 - pass this.asset + ".f4m";				                
				//asset += ".f4m";
				buildFlashVideo();
			}else{//other viewer without VideoPlayerExt component                 
				if(s7ueUtils.device.name == "desktop") viewer.bitrate = "infinite";//we want max bit rate for this case
					video.posterImage = asset;
					s7ueUtils.Callback.createCall(reqString, responseSetViewer, null, scope);               
			}
		}
	};
	this.resize = function(w,h){		
		if (flashcont != null){
			viewer.size.w = w; 
		    viewer.size.h = h;
		    buildFlashVideo();
		}
	};
	function responseSetIphone(json){		
		var imgName = "";
		imgName = getImageNameFromJSON(json);
		buildVideoPageLink(imgName);
	};
	function responseSetAndroid(json){		
		
		var mbrset  = json.set.item;
		var view = loadMbrSet( mbrset );
		var mbrset  = json.set.item;
		var realAsset = loadMbrSet(mbrset);
		if(/^\.\//.test(realAsset)) realAsset = realAsset.substring(2);
		
		viewer.path = s7ueUtils.normalizeFullURL(
			(video.proot.indexOf("http") >= 0 ? "" : defaultDomain) 
			+ video.proot 
			+ realAsset);                          
						  
		if(viewer.path.indexOf("http") < 0){
           var root = window.location.href;
           viewer.path = (https ? "https" : "http") + root.split("/")[2] + viewer.path;
       	}
		if (isPopUp){
			redirect(viewer.path);
		}else{
			imgName = getImageNameFromJSON(json);
			buildVideoPageLink(imgName);
		}
	};
	function parseMovieUrl(movieName) {
		// extracts asset name for retrieving poster image from the video URL (which may contain folders in the path)
		var result = null; 
		if(movieName != null) {
			result = movieName.replace(/[\\]/g, '/'); 
			var ar = result.split('.');
			if(ar.length > 1) { // assume only one occurrence of '.' 
					result = ar[0];
			}
			ar = result.split(':');
			if(ar.length > 1) { // assume only one occurrence of ':'
					result = ar[1];
			}
			ar = result.split('/');
			result = ar.length > 1 ? ar[0] + "/" + ar[ar.length-1] : result;
		}
		return result; 
	};
	function buildVideoPageLink(img){
	
		var vW 		= viewer.size.w;
		var vH 		= viewer.size.h;
		var oImg 	= buildOverlayImage(img);
		var url 	= viewer.path;
		var myDIV 	= createDivLink(oImg, url);
		targetdiv.appendChild(myDIV);	   
	};
	function buildOverlayImage(img){
		var callToAction = ((actionIndicator == "") ? "Scene7SharedAssets/tap-for-more" : actionIndicator);
		var mURL = serverUrl + company + "?layer=0&src=/" + img + "&size=" + viewer.size.w + "," + viewer.size.h + "&layer=1&src=/" + callToAction + "&scl=1&wid=" + viewer.size.w + "&hei=" + viewer.size.h;
		return mURL;		
	};
	function redirect(url){
		window.location = url;
	};
	function createDivLink(p_img, p_link){
		console.log("createDivLink " + p_img);
		var divObj = document.createElement("div");
		var img = document.createElement("img");	
		img.setAttribute("src", p_img);
		var targ = document.createElement("a");
		if (typeof p_link != "undefined"){
			targ.appendChild(img);
			targ.setAttribute("href", p_link);
			targ.setAttribute("target", "_self");
			divObj.appendChild(targ);
		}else
			divObj.appendChild(img);

			
	 	var ST = 'position:absolute'
		 	  +'; text-align:center'
			  +';display: table-cell; vertical-align: middle';
		  
			divObj.setAttribute("style", ST);
	
			return divObj;		
	};	
	function getImageNameFromJSON(json){
		var imgName = "";
		if (!json.set.item.length)
		{
			imgName = json.set.item.i.n;
		}else{
			imgName = json.set.item[0].i.n;
		
		}
		return imgName;		
	};	
	function responseSetViewer(json){
       var mbrset  = json.set.item;
       var realAsset = loadMbrSet(mbrset);
       if(/^\.\//.test(realAsset)) realAsset = realAsset.substring(2);
       viewer.asset = realAsset;
       buildFlashVideo();
    };
	function buildFlashVideo(){  
		var movieid = s7ueUtils.guidGenerator();
		s7uev.instance = "s7ueobj_" + movieid; // use internal generated object name 
    	targetdiv.style.width = viewer.size.w+ "px";
        targetdiv.style.height = viewer.size.h+ "px"; 
		//is there a div color defined? if so, set the backgroundcolor of the div to that
		(containerColor != "") ? (targetdiv.style.backgroundColor = containerColor) : "";   	
        var embedString = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
        ' codebase="'+ (https ? 'https' : 'http') +'://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" ' +
  		' id="s7ueobj_' + movieid + '" width="'+viewer.size.w+'" height="'+viewer.size.h+'" align="">'+
  		' <param name="movie" value="'+getViewerPath()+(getViewerPath().indexOf("?") >= 0 ? "&" :"?")+buildVideoParams()+'">'+
  		' <param name="menu" value="false"> <param name="quality" value="high">'+ 
  		' <param name="salign" value="LT">'+                    
  		' <param name="allowScriptAccess" value="always">'+ 
        ' <param name="allowFullScreen" value="true">'+
		' <param name="wmode" value="' + flashMode + '">'+
        ' <embed src="'+getViewerPath()+(getViewerPath().indexOf("?") >= 0 ? "&" :"?")+buildVideoParams()+'"'+
        ' quality="high" width="'+viewer.size.w+'" height="'+viewer.size.h+'" SWLIVECONNECT="true" allowScriptAccess="always" '+
        ' name="s7uuembed"  id="s7ueobj_' + movieid + '" wmode="' + flashMode + '" type="application/x-shockwave-flash" allowFullScreen="true" PLUGINSPAGE="'+ (https ? 'https' : 'http') +'://www.macromedia.com/go/getflashplayer">'+
        ' </embed> </object>';
        targetdiv.innerHTML = embedString; 
        flashcont = targetdiv;
    };
	function buildVideoParams(){
    	var params = "";
        if(viewer.type == "flashas2"){
            params = "movie="+(video.method == "stream" ? "" : video.proot) + ((typeof viewer.asset != "undefined") ? viewer.asset : asset);            
        }
        else{            
            params = "asset=" + ((typeof viewer.asset != "undefined") ? viewer.asset : asset);//no need for prog root to add in front of asset on AS3
        }
        params += (video.method == "stream" ? "&comServerUrl="+ video.sroot+"&method=stream" : "");	
		//if we're a flash AS3 viewer, and there is a poster image, add this to the URL
		/*
			this was removed as of 8/23/2012 by request from product management. support for 
			this and mobile custom poster image will come in Spring 2013
		if ((viewer.type != "flashas2" && (viewer.type.indexOf('flashas3') >= 0)))
			params += (posterImage == "") ? "" : "&videoPlayer.posterImage=" + company + "/" + posterImage;
		*/
        if(viewer.type != "flashas3x"){
            params += "&videoserverurl=" + (video.method == "stream" ? video.sroot : video.proot);
        }
        else{
            params += "&videoserverurl=" + (video.method == "stream" ? s7ueUtils.normalizeFullURL(defaultDomain + assetContext) : video.proot);
			if (video.method == "stream"){
				params += "&streaming=true";	
			}
			if ((video.posterImage != "") && (video.method != "stream")){
				params += "&posterImage="+video.posterImage;	
			}
        }
        params += (viewer.type == "flashas2" ? '&contentRoot=/' + s7ueUtils.stripLeadingAndTrailingSlash(contentUrl) + "/" : "");
        var modifierStr = getModifiers();
        params += (modifierStr != "" ? "&":"")+ modifierStr;
        params += (viewer.type == "flashas2" && viewer.config2 != null && viewer.config2 != "") ? "&eventlog=javascript:s7track(%22$1$%22)" : "";
        return params;
    };
	function getModifiers(){
		var modifierStr = modifiers.all != null ? modifiers.all : "";
    	var viewerTyp = viewer.type == "flashas3" || viewer.type == "flashas3x" ? "flashas3" : viewer.type; 
    	modifierStr += modifiers[viewerTyp] != null ? (modifierStr != "" ? "&" : "") + modifiers[viewerTyp] : "";
    	return modifierStr;
	};
	function getViewerPath(){
    	var viewerUrl = "";    	
        var localePathMod = "";
		var vpath = viewer.path;
        if(viewer.type == "flashas2") {
            localePathMod = (locale != "en" ? locale+"/" : "" );
            vpath = vpath.replace("flash/","flash/"+localePathMod);
        }
        if(viewer.path && viewer.path != ""){

    		if(viewer.path.indexOf("$codeRoot$") < 0 && viewer.path.indexOf("$contentRoot$") < 0 ){
    			viewerUrl = contentUrl + vpath;				
    		}
    		else{				
    			viewerUrl = vpath.replace("$codeRoot$",codeUrl);
                viewerUrl = viewerUrl.replace("$contentRoot$",contentUrl);
    		}                        
            if(viewerUrl.indexOf("http") != 0) viewerUrl = (defaultDomain == "/" ? "" : defaultDomain) + viewerUrl;
    	}
		return s7ueUtils.normalizeFullURL(viewerUrl);
    };
	function loadMbrSet(mbrset) {        
        var v = null;
        var cbr = 0;
        if(viewer.bitrate == "infinite"){
            v = getMaxBitRate(mbrset);
        }
        else{
            
           if(!mbrset.length){ 
               v = mbrset.v.path;
           }
           else{
                for(var i=0; i < mbrset.length; i++){
                    var lbr = parseInt(mbrset[i].v.bitrate);            
                    var lpath = mbrset[i].v.path;
                    if((lbr <= viewer.bitrate*1000) && (lbr > cbr)){ 
                        // bit rate must be less than max bit rate and more then the current bit rate
                        if(!/flv$/.test(lpath)){// don't consider flv
                            v = lpath;
                            cbr = lbr;
                        }
                    }
                }
                if(v == null){
                    v = getMinBitRate(mbrset);
                }
           }
        }        
        return v;
    };   
    function getMaxBitRate(mbrset){
       var tmpBitRate = -1;
       var v = "";
       if(!mbrset.length){ 
           v = mbrset.v.path;
       }
       else{
           for(var i=0;i<mbrset.length;i++){
               var lbr = parseInt(mbrset[i].v.bitrate);
               if(tmpBitRate < lbr){//desktop is ok for flv
                   tmpBitRate = lbr;
                   v = mbrset[i].v.path;
               }
           }
       }
       return v;
    };
    function getMinBitRate(mbrset){
       var tmpBitRate = -1;
       var v = "";
       if(!mbrset.length){ 
           v = mbrset.v.path;
       }
       else{
           for(var i=0;i<mbrset.length;i++){
               var lbr = parseInt(mbrset[i].v.bitrate);
               var lpath =  mbrset[i].v.path;
               if(tmpBitRate == -1 || tmpBitRate > lbr){
                   if(!/flv$/.test(lpath)){ //don't consider flv
                      tmpBitRate = lbr;
                      v = lpath;
                   }
               }
           }
       }
       return v;        
    };
};
//class statics
s7uev.JSON_REQUEST_STRING 			= "?req=userdata,json&handler=s7ueResponse";
s7uev.REQ_SET_REQUEST_STRING 		= "?req=set,json&handler=s7ueResponse";
//configuration properties
s7uev.ASSET 						= "asset";
s7uev.ASSETTYPE 					= "assetType";
s7uev.CONFIG		 				= "config";
s7uev.CONTAINER_ID 					= "containerId";
s7uev.ASSET_CONTEXT 				= "assetContext";
s7uev.ACTION_INDICATOR				= "actionIndicator";
s7uev.LOCALE 						= "locale";
s7uev.IGNORE_SERVER_CONFIG			= "ignoreServerConfig";
//deprecated at the moment
s7uev.USE_DIV_SIZE 					= "useDivSize";
//codeRoot should viewersUrl and contentRoot change to - codeUrl, contentUrl and remove the array definition and make explicit
s7uev.CONTENT_URL					= "contentUrl";
s7uev.CODE_URL						= "codeUrl";
//which URL we load the dhtml flyout from equal to sj_codebase (change to dhtmlLibPath)
s7uev.DHTML_FLYOUT_LIBRARY_PATH 	= "dhtmlLibPath";
//ok
s7uev.SERVER_URL 					= "serverUrl";
s7uev.ISR							= "isr";
s7uev.HDS							= "hds";
s7uev.APP_URL						= "appUrl";
s7uev.POSTER_IMAGE					= "posterImage";
//change to progressiveVideoUrl
s7uev.PROGRESSIVE_VIDEO_URL 		= "progressiveVideoUrl";
//delay the initialization of the embedded viewer
s7uev.START_UP_DELAY				= "startupDelay";
//change to streamingVideoUrl
s7uev.STREAMING_VIDEO_URL 			= "streamingVideoUrl";
//ok for now
s7uev.SERVER_CONTEXT				= "serverContext";
//ok
s7uev.FLASH_WMODE 					= "flashMode";
//container color
s7uev.CONTAINER_COLOR 				= "containerColor";
//
s7uev.DEFAULT_LANG					= "en";
//
s7uev.DEF_IMG						= "defaultImg";
//
s7uev.CACHE							= "cache";
//
s7uev.FALLBACK_POLICY				= "fallbackPolicy";
//
s7uev.MODIFIERS						= 'modifiers';
//
s7uev.IS_POPUP						= 'isPopUp';
//
s7uev.CONFIG_2						= 'config2';
//
s7uev.OMNITURE_URL					= 'omnitureUrl';

var sj_codebase 					= "";
//universal asset types
s7uev.MASTER_PRESET_TYPES =
{
	UNIVERSAL_VIDEO		:"VIDEO",
	UNIVERSAL_ZOOM		:"ZOOM",
	UNIVERSAL_IMAGE_SET	:"IMAGE_SET",
	UNIVERSAL_SWATCH_SET:"RENDER_SET",
	UNIVERSAL_SPIN_SET	:"SPIN_SET_2D",
	UNIVERSAL_E_CAT		:"ECATALOG"
};
s7uev.DEFAULT_UNIVERSAL_PRESETS = {
	
	UNIVERSAL_SWATCH_SET:"Universal_RenderSet1",
	UNIVERSAL_IMAGE_SET:"Universal_ImageSet1",
	UNIVERSAL_ZOOM:"Universal_Zoom1",
	UNIVERSAL_E_CATALOG:"Universal_Catalog1",
	UNIVERSAL_VIDEO:"Universal_Video1",
	UNIVERSAL_SPIN:"Universal_Spin1"
	
};
