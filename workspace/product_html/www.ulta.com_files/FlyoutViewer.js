/*!************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2013 Adobe Systems Incorporated
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
if(typeof s7viewers == "undefined") {
	s7viewers = {};
}else if(typeof s7viewers != "object") {
	throw new Error("Cannot initialize a root 's7viewers' package. s7viewers is not an object");
}

if(!s7viewers.FlyoutViewer) {

	s7viewers.FlyoutViewer = function (inObj) {
		this.sdkBasePath = '../../s7sdk/2.8/';
		this.containerId = null;
		this.params = {};
        this.handlers = [];
		this.onInitComplete = null;
		this.onInitFail = null;
		this.initializationComplete = false;
		this.initCalled = false;
		this.legacyFixedSizing = false;

        if (typeof inObj == "object"){
            if (inObj.containerId) {
                this.setContainerId(inObj.containerId);
            }
            if (inObj.params) {
                for (var param in inObj.params) {
                    if (inObj.params.hasOwnProperty(param) && inObj.params.propertyIsEnumerable(param)) {
                        this.setParam(param, inObj.params[param]);
                    }
                }
            }
            if (inObj.handlers) {
                this.setHandlers(inObj.handlers);
            }
            if (inObj.localizedTexts) {
				this.setLocalizedTexts(inObj.localizedTexts);
            }
        }
	}

	s7viewers.FlyoutViewer.cssClassName = "s7flyoutviewer";

	s7viewers.FlyoutViewer.prototype.setContainerId = function (inElemId) {
		this.containerId = inElemId || null;
	}

	s7viewers.FlyoutViewer.prototype.getContentUrl = function () {
		 var contentUrl = "";
		 var viewerPath = "";
		 var scriptTags = null;
		 if (document.scripts){
			scriptTags = document.scripts;
		 }else{
			scriptTags = document.getElementsByTagName("script");
		 }

		for(var i=0; i<scriptTags.length;i++){
			var result = /^\s*(http[s]?:\/\/[^\/]*)?(.*)(\/js\/FlyoutViewer\.js)/.exec(scriptTags[i].getAttribute('src'));
			if (result && result.length == 4) {
                if ( typeof result[1] !== 'undefined' ) {
                    contentUrl = result[1];
                }
				contentUrl += result[2];
				break;
			 }
		}
		if ((contentUrl != '') && (contentUrl.lastIndexOf('/') != contentUrl.length - 1)) {
			contentUrl += '/';
		}
		return contentUrl;
	}

	s7viewers.FlyoutViewer.prototype.includeViewer = function () {
		s7sdk.Util.require("s7sdk.set.MediaSet");
		s7sdk.Util.require("s7sdk.image.FlyoutZoomView");
		s7sdk.Util.require("s7sdk.set.Swatches");
		s7sdk.Util.require('s7sdk.common.Container');

        this.trackingManager = new s7sdk.TrackingManager(); // needs to be created first to track LOAD event

		this.s7params = new s7sdk.ParameterManager(null,null,{"asset" : "MediaSet.asset"},this.getContentUrl()+"FlyoutViewer.css");
		var viewerName = ""; 
		if (this.s7params.params.config && s7sdk.Util.isString(this.s7params.params.config)) {
			viewerName = ",";
			if (this.s7params.params.config.indexOf("/") > -1) {
				viewerName += this.s7params.params.config.split('/')[1];
			} else 
				viewerName += this.s7params.params.config;
		}
		this.s7params.setViewer("504,5.1.1" + viewerName);

		var defaultLocalizedTexts = {
		"en":{
			"FlyoutZoomView.TIP_BUBBLE_OVER":"Mouse over image for a closer look.",
			"FlyoutZoomView.TIP_BUBBLE_TAP":"Drag image to explore."
		},
			defaultLocale: "en"
		};
		this.s7params.setLocalizedTexts(defaultLocalizedTexts);

		for(var prm in this.params){
			if (prm != "localizedtexts"){
				this.s7params.push(prm, this.params[prm]);
			}else{
				this.s7params.setLocalizedTexts(this.params[prm]);
			}
		}

		this.s7flyout = null;
		this.s7mediaset = null; 
		this.s7mediasetDesc = null; 
		this.s7visibility = null;
		this.s7swatches = null; 
		this.container = null; 
		this.initialFrame = 0;
		this.visibilityManager = null;
		this.swatchesHeight = 0;
		this.containerHeight = 0;
		this.singleImage = false;

		if (this.containerId != null){
			this.container = document.getElementById(this.containerId);
			if (this.container){
				if (this.container.className != ""){
					if (this.container.className.indexOf(s7viewers.FlyoutViewer.cssClassName) != -1){
						//
					}else{
						this.container.className += " "+s7viewers.FlyoutViewer.cssClassName;
					}	
				}else{
					this.container.className = s7viewers.FlyoutViewer.cssClassName;
				}
			}
		}

		var self = this;
		
			function initViewer(){
				self.s7params.push("tmblayout", "0,1");
				self.s7params.push("resizable", "0");	
				self.s7params.push("orientation", "0");	

				self.s7params.push("textpos", "none");	
				if (s7sdk.browser.device.name != "desktop"){
					self.s7params.push("enablescrollbuttons","0");	
				}
//
				if ("ontouchstart" in window){
					addClass(self.containerId,"s7touchinput");
				}else{
					addClass(self.containerId,"s7mouseinput");
				}

                // work-around for webkit issue with applying height:100% to the containing element
                var containerDiv = document.getElementById(self.containerId);
                var tempMinHeight = containerDiv.style.minHeight;
                containerDiv.style.minHeight = "1px";

                var testdiv = document.createElement("div");
                testdiv.style.position = "relative";
                testdiv.style.width = "100%";
                testdiv.style.height = "100%";
                containerDiv.appendChild(testdiv);
                var emptyViewerHeight = testdiv.offsetHeight;
                if (testdiv.offsetHeight <= 1){
                    containerDiv.style.height = "100%";
                    emptyViewerHeight = testdiv.offsetHeight;
                }
                containerDiv.removeChild(testdiv);
                containerDiv.style.minHeight = tempMinHeight;

				self.container = new s7sdk.common.Container(self.containerId, self.s7params, self.containerId+"_container");
				// Add Container event listeners
				self.container.addEventListener(s7sdk.event.ResizeEvent.COMPONENT_RESIZE, onContainerResize,false);
				self.container.addEventListener(s7sdk.event.ResizeEvent.FULLSCREEN_RESIZE, onContainerFullScreen,false);	

				var responsive = false;
				switch(self.s7params.get("responsive", "auto")){
					case "fit":
						responsive = false;
						break;
					case "constrain":
						responsive = true;
						break;
					default :
						responsive = emptyViewerHeight == 0;
						break;
				}
				updateCSSMarkers(self.container.getWidth(), self.container.getHeight());

				if(self.container.isFixedSize()) { // free
					self.viewerMode = "fixed";
				} else {
					if(responsive) { // restrict
						self.viewerMode = "ratio";
					} else {
						self.viewerMode = "free";
					}
				}

				self.swatchesHeight = parseInt(s7sdk.Util.css.getCss("s7swatches","height", self.containerId+"_swatches", null, document.getElementById(self.containerId+"_container")));
				//check if the size of the main view was explicitly set in CSS. If so turn on "legacy" sizing mode, where Container resize is ignored.
				var mainViewSize = self.getMainViewSize();
				if (mainViewSize.height > 0) {
					self.legacyFixedSizing = true;
				}
				if (self.legacyFixedSizing) {
					//in legacy sizing mode, set the size of container to the size of the parent div to ensure backward compatibility.
					var w = parseInt(s7sdk.Util.css.getCss("s7flyoutviewer","width",self.containerId,null,containerDiv));
					var h = parseInt(s7sdk.Util.css.getCss("s7flyoutviewer","height",self.containerId,null,containerDiv));   
					if (!isNaN(w) && !isNaN(h)) {
						self.container.resize(w, h);
					}
				}
				self.containerHeight = self.container.getHeight();
//

				document.getElementById(self.containerId+"_container").style.overflow = "visible";
				self.s7flyout = new s7sdk.FlyoutZoomView(self.containerId+"_container", self.s7params, self.containerId+"_flyout");
				self.s7flyout.getObj().style.visibility = "hidden";

				self.trackingManager.attach(self.s7flyout);

				self.s7mediaset = new s7sdk.MediaSet(null, self.s7params, self.containerId+"_mediaset");
				self.trackingManager.attach(self.s7mediaset);
				self.s7mediaset.addEventListener(s7sdk.AssetEvent.NOTF_SET_PARSED,onSetParsed, false);

                self.trackingManager.setCallback(onProxyTrack);
                if (typeof AppMeasurementBridge == "function") {
                    self.appMeasurementBridge = new AppMeasurementBridge();
                }

                function onProxyTrack(objID, compClass, instName, timeStamp, eventInfo) {
                    if (self.appMeasurementBridge) {
                        self.appMeasurementBridge.track(objID, compClass, instName, timeStamp, eventInfo);
                    }
                    if (self.handlers["trackEvent"]) {
                        self.handlers["trackEvent"](objID, compClass, instName, timeStamp, eventInfo);
                    }
                    if ("s7ComponentEvent" in window) {
                        s7ComponentEvent(objID, compClass, instName, timeStamp, eventInfo);
                    }
                }

////
				function addClass(elm, inClass) {
					var cls = document.getElementById(elm).className.split(' ');
					if(cls.indexOf(inClass) == -1) {
						cls[cls.length] = inClass;
						document.getElementById(elm).className = cls.join(' ');
					}
				};

				/*	ID				min-area max-area
				 s7size_small	0		 210000
				 s7size_medium	210001	 920000
				 s7size_large	920001	 Infinity
				 */
				function sizeSwitch(inW,inH){
					var szswitch = inW * inH;
					var deviceType = 0; //s7size_large
					if (szswitch <= 210000){
						deviceType = 1; //s7size_small
					}else if ((szswitch >210000) && (szswitch <=920000)){
						deviceType = 2; //s7size_medium
					}else{
						deviceType = 0; //s7size_large
					}
					return deviceType;
				}

				function updateCSSMarkers(w, h) {
					var szsw = sizeSwitch(w, h);
					var newclass;
					if (szsw == 0){
						newclass = "s7size_large";
					}else{
						if (szsw == 1){
							newclass = "s7size_small";
						}else{
							newclass = "s7size_medium";
						}
					}
					setNewSizeMarker(self.containerId, newclass);
				}
				
				function setNewSizeMarker(elm, inClass) {
					var cls = document.getElementById(elm).className;
					var re = /^(.*)(s7size_small|s7size_medium|s7size_large)(.*)$/gi;
					var newcls;
					if(cls.match(re)){
						newcls = cls.replace(re,  "$1" + inClass + "$3");
					} else {
						newcls = cls + " " + inClass;
					}
					if(cls != newcls){
						document.getElementById(elm).className = newcls;
					}
				}

//
				if(self.viewerMode == "ratio"){
                    containerDiv.style.height = "auto";
				}

//
				function updateLayout(containerWidth, containerHeight, viewHeight) {
					if (self.legacyFixedSizing) {
						//ignore all API resizing in legacy sizing mode.
						return;
					}
					if ((self.s7swatches != null) && !self.singleImage){
						self.s7swatches.resize(containerWidth, self.swatchesHeight);
					}
					self.s7flyout.resize(containerWidth, viewHeight);
				}

				//Container Resize handler
				function onContainerResize(event) {
					if((typeof(event.target) == 'undefined') || (event.target == document.getElementById(self.containerId+"_container"))) {
						var hei = event.s7event.h;
						hei = self.singleImage ? event.s7event.h : event.s7event.h - self.swatchesHeight;
						updateLayout(event.s7event.w, event.s7event.h, hei);
						updateCSSMarkers(event.s7event.w, event.s7event.h);
					}
				}

				//Container FullScreen Resize handler
				function onContainerFullScreen(event) {
					//
				}
////


				function onSetParsed(e) {
					self.s7mediasetDesc = e.s7event.asset;
					self.initialFrame = Math.max(0,parseInt((typeof(self.s7params.get('initialframe')) != 'undefined') ? self.s7params.get('initialframe') : 0));
					if (self.initialFrame < self.s7mediasetDesc.items.length){
						//
					}else{
						self.initialFrame = 0;
					}
//
					var assetRatio;
					if(self.viewerMode == "ratio"){
						var itm = self.s7mediasetDesc.items[0];
						assetRatio = itm.width/itm.height;
					}

//
					if (self.s7mediasetDesc.items.length > 1){
						self.singleImage = false;
						if (self.s7swatches == null){
							self.s7swatches = new s7sdk.Swatches(self.containerId+"_container", self.s7params, self.containerId+"_swatches"); 
							self.swatchesHeight = parseInt(s7sdk.Util.css.getCss("s7swatches","height", self.containerId+"_swatches", null, document.getElementById(self.containerId+"_container")));
							self.trackingManager.attach(self.s7swatches);
							self.s7swatches.addEventListener(s7sdk.AssetEvent.SWATCH_SELECTED_EVENT, swatchSelected, false); 
						}else{
							self.s7swatches.show();
						}
//
						if(self.viewerMode == "fixed") {
							self.container.resize (self.container.getWidth(), self.containerHeight);
							updateLayout(self.container.getWidth(), self.containerHeight, self.containerHeight - self.swatchesHeight);
						} else if(self.viewerMode == "ratio") {
							var w = self.container.getWidth();
							self.container.setAspect(w /( w/assetRatio + self.swatchesHeight));
						} else {
							updateLayout(self.container.getWidth(), self.containerHeight, self.container.getHeight() - self.swatchesHeight);
						}
						self.s7swatches.setMediaSet(self.s7mediasetDesc);
						self.s7swatches.selectSwatch(self.initialFrame, true);
//

					} else if (self.s7mediasetDesc.items.length == 1){
						self.singleImage = true;
						if (self.s7swatches != null){
							self.s7swatches.hide(); 
						}
//
						if(self.viewerMode == "fixed") {
							self.container.resize (self.container.getWidth(), self.containerHeight - self.swatchesHeight);
						} else if(self.viewerMode == "ratio") {
							self.container.setAspect(assetRatio);
						} else {
							updateLayout(self.container.getWidth(), self.container.getHeight(), self.container.getHeight());
						}
//
						self.s7flyout.setItem(self.s7mediasetDesc.items[self.initialFrame]);
					}

					if ((self.handlers["initComplete"] != null) && (typeof self.handlers["initComplete"] == "function")){
						self.handlers["initComplete"]();
					}
					self.s7flyout.getObj().style.visibility = "";
				}

				function swatchSelected(e) { 
					var asset = e.s7event.asset;
					if(self.s7flyout){
						self.s7flyout.setItem(asset);
					}
				} 
				
				function viewer_ASSET_CHANGED(e) { 
					if((self.s7swatches) && (self.s7swatches.frame != e.s7event.frame)){
						self.s7swatches.selectSwatch(e.s7event.frame, true);
					}
				} 
			}


		this.s7params.addEventListener(s7sdk.Event.SDK_READY,function(){
												self.initSiteCatalyst(self.s7params,initViewer);
										},false);
		this.s7params.init();	
	};

	s7viewers.FlyoutViewer.prototype.setParam = function(key, def){
		this.params[key] = def;	
	}

	s7viewers.FlyoutViewer.prototype.getParam = function(key){
		return this.params[key];	
	}

	s7viewers.FlyoutViewer.prototype.setParams = function(inParams){
		var params = inParams.split("&");
		for (var i = 0; i < params.length; i++) {
			var pair = params[i].split("=");
			if (pair.length > 1) {
				this.setParam(pair[0],decodeURIComponent(params[i].split("=")[1]));
			}
		}
	}
	
	s7viewers.FlyoutViewer.prototype.s7sdkUtilsAvailable = function(){
		return (typeof s7sdk != "undefined");
	};

	s7viewers.FlyoutViewer.prototype.init = function(){
		this.initCalled = true;
		if (this.initializationComplete) return this;

		var s7sdkUtilsAddedToDOM = false;
		var utilSrcPath = this.getContentUrl() + this.sdkBasePath + "js/s7sdk/utils/Utils.js";
		var allScripts = null;
		if (document.scripts){
			allScripts = document.scripts;
		}else{
			allScripts = document.getElementsByTagName("script");
		}
		for (var i=0; i<allScripts.length; i++){ 
			if (allScripts[i] && allScripts[i].getAttribute("src")!=null && allScripts[i].getAttribute("src").indexOf(utilSrcPath)!=-1){
				s7sdkUtilsAddedToDOM = true;
				break;
			}
		}

		if (this.s7sdkUtilsAvailable()){
			s7sdk.Util.init(); 
			this.includeViewer();  
			this.initializationComplete = true;  
		}else if (!this.s7sdkUtilsAvailable() && s7sdkUtilsAddedToDOM) {
			var selfRef = this;
			var utilsWaitId = setInterval(
				function() {
					if (selfRef.s7sdkUtilsAvailable()) {
						clearInterval(utilsWaitId);
						s7sdk.Util.init(); 
						selfRef.includeViewer();  
						selfRef.initializationComplete = true;  
					}
				}, 100
			);
		}else{
			var elem = document.createElement("script");
			elem.setAttribute("language", "javascript");
			elem.setAttribute("type", "text/javascript");
			elem.setAttribute("src", utilSrcPath);

			var elems = document.getElementsByTagName("head");
			var self = this;
			elem.onload = elem.onerror = function() {  
				if (!this.executed) { 
					this.executed = true;  
					if (self.s7sdkUtilsAvailable() && s7sdk.Util){
						s7sdk.Util.init(); 
						self.includeViewer();  
						self.initializationComplete = true;  
					}
				}  
			};  

			elem.onreadystatechange = function() {  
				var self = this;  
				if (this.readyState == "complete" || this.readyState == "loaded") {  
					setTimeout(function() { 
						self.onload(); 
						self.onreadystatechange = null
					}, 0);
				}  
			};
			elems[0].appendChild(elem);
		}
        return this;
	};

	s7viewers.FlyoutViewer.prototype.getDomain = function(inUrl) {
		var res = /(^http[s]?:\/\/[^\/]+)/i.exec(inUrl);
		if (res == null) {
			return '';
		} else {
			return res[1];
		}
	}

	s7viewers.FlyoutViewer.prototype.setAsset = function(inAsset) {
		if (this.s7mediaset){
			this.s7mediaset.setAsset(inAsset);
		}else{
			this.setParam("asset", inAsset);
		}
	}
	
	s7viewers.FlyoutViewer.prototype.setLocalizedTexts = function(inText) {
		if (this.s7params){
			this.s7params.setLocalizedTexts(inText);
		}else{
			this.setParam("localizedtexts", inText);
		}
	}

	s7viewers.FlyoutViewer.prototype.initSiteCatalyst = function(params,inCallback) {
			//integrate SiteCatalyst logging
			//strip modifier from asset and take the very first entry from the image list, and the first element in combination from that entry
			var siteCatalystAsset = params.get("asset", null, "MediaSet").split(',')[0].split(':')[0];
			var isConfig2Exist = false;
			if (siteCatalystAsset.indexOf('/') != -1) {
				var company = s7sdk.MediaSetParser.findCompanyNameInAsset(siteCatalystAsset);
				var config2 = params.get("config2");
				isConfig2Exist = (config2 != '' && typeof config2 != "undefined");
				if (isConfig2Exist){
					var jsp_src =this.getContentUrl()+'../AppMeasurementBridge.jsp?company=' + company + (config2 == '' ? '' : '&preset=' + config2);
                    if (params.get("serverurl", null)) {
                        jsp_src += "&isRoot=" + params.get("serverurl");
                    }
					var elem = document.createElement("script");
					elem.setAttribute("language", "javascript");
					elem.setAttribute("type", "text/javascript");
					elem.setAttribute("src", jsp_src);

					var elems = document.getElementsByTagName("head");
					var self = this;
					elem.onload = elem.onerror = function() {  
						if (!this.executed) { 
							this.executed = true;  
							if (typeof inCallback == "function"){
								inCallback();
							}
						}  
					};  

					elem.onreadystatechange = function() {  
						var self = this;  
						if (this.readyState == "complete" || this.readyState == "loaded") {  
							setTimeout(function() { 
								self.onload(); 
								self.onreadystatechange = null
							}, 0);
						}  
					};
					elems[0].appendChild(elem);
				}else{
					if (typeof inCallback == "function"){
						inCallback();
					}
				}	
			}
	}

    s7viewers.FlyoutViewer.prototype.getComponent = function(inId) {
        switch(inId){
            case "container":
                return this.container || null;
            case "swatches":
                return this.s7swatches || null;
            case "flyout":
                return this.s7flyout|| null;
            case "mediaSet":
                return this.s7mediaset || null;
            default:
                return null;
        }
    };

    s7viewers.FlyoutViewer.prototype.setHandlers = function(inObj) {
		if (this.initCalled) return;
        this.handlers = [];
        for (var i in inObj) {
            if (!inObj.hasOwnProperty(i)) continue;
            if (typeof inObj[i] != "function") continue;
            this.handlers[i] = inObj[i];
        }
    };

    //returns the pixel size of the main view, as configured in CSS. returns 0x0 in case no CSS sizing was provided.
	s7viewers.FlyoutViewer.prototype.getMainViewSize = function() {
		var containerDiv = document.getElementById(this.containerId+"_container");
		var testdiv = document.createElement("div");
		testdiv.style.position = "absolute";
		testdiv.className = "s7flyoutzoomview";
		testdiv.style.borderStyle = "none";
		containerDiv.appendChild(testdiv);

		var size = {
			width : 0,
			height : 0
		};
		if (testdiv.offsetHeight > 0) {
			size.width = parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","width", this.containerId+"_flyout", null, document.getElementById(this.containerId+"_container")));
			size.height = parseInt(s7sdk.Util.css.getCss("s7flyoutzoomview","height", this.containerId+"_flyout", null, document.getElementById(this.containerId+"_container")));
		}
		containerDiv.removeChild(testdiv);
		return size;
	}
}
