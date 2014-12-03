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

if(!s7viewers.MixedMediaViewer) {

	/**
	 * Construct a MixedMediaViewer object
	 * @param {Object} inObj optional simple JSON object that consists of name:value pairs for customization of the viewer.
	 */
	s7viewers.MixedMediaViewer = function (inObj) {
		this.sdkBasePath = '../../s7sdk/2.8/';
		this.containerId = null;
		this.params = {};
		this.handlers = [];
//		this.onInitComplete = null;
		this.onInitFail = null;
		this.initializationComplete = false;
		this.initCalled = false;
        if (typeof inObj == "object"){
            if (inObj.containerId) {
                this.setContainerId(inObj.containerId)
            }
            if (inObj.params) {
                for(var param in inObj.params) {
                    if(inObj.params.hasOwnProperty(param) && inObj.params.propertyIsEnumerable(param)) {
                        this.setParam(param,inObj.params[param]);
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
	};

	s7viewers.MixedMediaViewer.cssClassName = "s7mixedmediaviewer";

	s7viewers.MixedMediaViewer.prototype.setContainerId = function (inElemId) {
		this.containerId = inElemId || null;
	};

	s7viewers.MixedMediaViewer.prototype.getContentUrl = function () {
		 var contentUrl = "";
		 var viewerPath = "";
		 var scriptTags = null;
		 if (document.scripts){
			scriptTags = document.scripts;
		 }else{
			scriptTags = document.getElementsByTagName("script");
		 }

		for(var i=0; i<scriptTags.length;i++){
			var result = /^\s*(http[s]?:\/\/[^\/]*)?(.*)(\/js\/MixedMediaViewer\.js)/.exec(scriptTags[i].getAttribute('src'));
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
	};

	s7viewers.MixedMediaViewer.prototype.includeViewer = function () {
		s7sdk.Util.require("s7sdk.event.Event");
		s7sdk.Util.require("s7sdk.common.Button");
		s7sdk.Util.require('s7sdk.common.Container');
		s7sdk.Util.require("s7sdk.image.ZoomView");
		s7sdk.Util.require("s7sdk.set.SpinView");
		s7sdk.Util.require("s7sdk.set.MediaSet");
		s7sdk.Util.require("s7sdk.set.Swatches");
		s7sdk.Util.require("s7sdk.video.VideoControls");
		s7sdk.Util.require("s7sdk.video.VideoPlayer");
		s7sdk.Util.require("s7sdk.common.ControlBar");
		s7sdk.Util.require("s7sdk.set.SetIndicator");

        this.trackingManager = new s7sdk.TrackingManager(); // needs to be created first to track LOAD event
		
		var mixedMediaViewerLocalizedTexts = {
			"en":{
				"PanRightButton.TOOLTIP":"Spin East",			
				"PanLeftButton.TOOLTIP":"Spin West"
			},
			defaultLocale: "en"
		};		

		this.s7params = new s7sdk.ParameterManager(null,null,{"asset" : "MediaSet.asset"},this.getContentUrl()+"MixedMediaViewer_light.css");
		var viewerName = ""; 
		if (this.s7params.params.config && s7sdk.Util.isString(this.s7params.params.config)) {
			viewerName = ",";
			if (this.s7params.params.config.indexOf("/") > -1) {
				viewerName += this.s7params.params.config.split('/')[1];
			} else 
				viewerName += this.s7params.params.config;
		}
		this.s7params.setViewer("505,5.1.1" + viewerName);

		this.s7params.localizedTexts = mixedMediaViewerLocalizedTexts;

		for(var prm in this.params){
			if (prm != "localizedtexts"){
				this.s7params.push(prm, this.params[prm]);
			}else{
				this.s7params.setLocalizedTexts(this.params[prm]);
			}
		}

		this.container = null;
		this.zoomView = null;
		this.spinView = null;
		this.videoPlayer = null;
		this.activeView = null;

		this.toolbarContainer = null;
		this.zoomInButton = null;
		this.zoomOutButton = null;
		this.zoomResetButton = null;
		this.spinLeftButton = null;
		this.spinRightButton = null;
		this.fullScreenButton = null;
		this.videoFullScreenButton = null;
		this.closeButton = null;
		this.closedCaptionButton = null;

		this.videoControls = null;
		this.playPauseButton = null;
		this.videoScrubber = null;
		this.videoTime = null;
		this.mutableVolume = null;
		this.bcr_videoControls = null;
		this.bcr_playPauseButton = null;
		this.bcr_videoTime = null;
		this.bcr_videoScrubber = null;

		this.mediaSet = null; 
		this.s7mediasetDesc = null; 
		this.singleImage = null;

		this.colorSwatches = null; 
		this.currentColorSwatchesFrame = null;
		this.colorSwatchesActive = false;

		this.swatches = null; 
		this.currentSwatchesFrame = null;
		this.swatchesHeight = null;
		this.containerHeight = null;

		this.setindicator = null;
		//visibility manager
		this.visibilityManagerZoom = null;
		this.visibilityManagerSpin = null;
		this.visibilityManagerVideo = null;

		this.captionButtonPosition = null;
		this.volumeButtonPosition = null;
		this.videoTimePosition = null;		
		this.captionSpecified = true;
		this.storedCaptionEnabled = true;
		this.isCSSforCaptionButton = true;
		
		
		//initial frame
		this.initialFrame = 0;

		this.setPages = true;
		
		this.container = document.getElementById(this.containerId);
		if (this.container.className != ""){
			if (this.container.className.indexOf(s7viewers.MixedMediaViewer.cssClassName) != -1){
				//
			}else{
				this.container.className += " "+s7viewers.MixedMediaViewer.cssClassName;
			}	
		}else{
			this.container.className = s7viewers.MixedMediaViewer.cssClassName;
		}
		
		var self = this;
		
		function initViewer(){
			self.s7params.push("Swatches.tmblayout", "0,1");
			self.s7params.push("Swatches.textpos", "none");
			self.s7params.push("VideoPlayer.autoplay", "0");
			self.s7params.push("ZoomView.frametransition", "slide");
			self.s7params.push("initialbitrate", "1400");

			var isNotDesktop = !(s7sdk.browser.device.name == "desktop");
			
			if (s7sdk.browser.device.name == "desktop") self.s7params.push("ZoomView.singleclick", "zoomReset"); //singleclick and doubleclick for desktop have specific
			if (s7sdk.browser.device.name == "desktop") self.s7params.push("ZoomView.doubleclick", "reset");						
			if (s7sdk.browser.device.name == "desktop") self.s7params.push("SpinView.singleclick", "zoomReset"); //singleclick and doubleclick for desktop have specific
			if (s7sdk.browser.device.name == "desktop") self.s7params.push("SpinView.doubleclick", "reset");						
			if (s7sdk.browser.device.name != "desktop"){
				self.s7params.push("Swatches.enablescrollbuttons","0");	
			}			

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

			self.sdkContainer = new s7sdk.common.Container(self.containerId, self.s7params, self.containerId+"_container");
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
            updateCSSMarkers(self.sdkContainer.getWidth(), self.sdkContainer.getHeight());

            if(self.sdkContainer.isFixedSize()) { // free
				self.viewerMode = "fixed";
            } else {
                if(responsive) { // restrict
					self.viewerMode = "ratio";
                } else {
					self.viewerMode = "free";
                }
            }

            self.containerHeight = self.sdkContainer.getHeight();
					
			self.zoomView = new s7sdk.image.ZoomView(self.containerId+"_container", self.s7params, self.containerId+"_zoomView");
			self.trackingManager.attach(self.zoomView);
		
			self.swatches = new s7sdk.set.Swatches(self.containerId+"_container", self.s7params, self.containerId+"_swatches");
			self.swatchesHeight = parseInt(s7sdk.Util.css.getCss("s7swatches","height", self.containerId+"_swatches", null, document.getElementById(self.containerId+"_container")));
			self.trackingManager.attach(self.swatches);
			
			self.spinView = new s7sdk.set.SpinView(self.containerId+"_container", self.s7params, self.containerId+"_spinView");
			self.trackingManager.attach(self.spinView);

			if (isNotDesktop) self.setindicator = new s7sdk.set.SetIndicator(self.containerId+"_container", self.s7params, self.containerId+"_setIndicator");

			self.toolbarContainer = document.createElement('div');
			self.toolbarContainer.className = "s7toolbarcontainer";
			self.toolbarContainer.setAttribute("id",self.containerId+"_toolbarContainer");
			self.toolbarContainer.style.position = "absolute";
			self.toolbarContainer.style.width= self.sdkContainer.getWidth() + "px";
			self.toolbarContainer.style.top= self.containerHeight - self.swatchesHeight + "px";
			self.toolbarContainer.style.height = "0px";
			self.toolbarContainer.style.zIndex = "1";
			document.getElementById(self.containerId+"_container").appendChild(self.toolbarContainer);


			// Create the VideoPlayer
			self.videoPlayer = new s7sdk.video.VideoPlayer(self.containerId+"_container", self.s7params, self.containerId + "_videoPlayer");
			self.trackingManager.attach(self.videoPlayer);
			self.storedCaptionEnabled = self.videoPlayer.getCaptionEnabled();
			// Create the ControlBar
			self.videoControls = new s7sdk.common.ControlBar(self.containerId+"_container", self.s7params, self.containerId + "_controls");
			self.bcr_videoControls = self.videoControls.getObj().getBoundingClientRect();
			self.videoControlsHeight = self.videoControls.getHeight();
			self.videoControls.attachView(self.videoPlayer);
			// Create the PlayPauseButton
			self.playPauseButton = new s7sdk.common.PlayPauseButton(self.containerId + "_controls", self.s7params, self.containerId + "_playPauseButton");
			// Create the VideoScrubber
			self.videoScrubber = new s7sdk.video.VideoScrubber(self.containerId + "_controls", self.s7params, self.containerId + "_videoScrubber");
			// Create the VideoTime
			self.videoTime = new s7sdk.video.VideoTime(self.containerId + "_controls", self.s7params, self.containerId + "_videoTime");
			self.bcr_playPauseButton = self.playPauseButton.getObj().getBoundingClientRect();
			self.bcr_videoTime = self.videoTime.getObj().getBoundingClientRect();
			self.bcr_videoScrubber = self.videoScrubber.getObj().getBoundingClientRect();

			// Create the MutableVolume
			self.mutableVolume = new s7sdk.video.MutableVolume(self.containerId + "_controls", self.s7params, self.containerId + "_mutableVolume");
			
			// Create the ClosedCaptionButton
			self.closedCaptionButton = new s7sdk.common.ClosedCaptionButton(self.containerId+"_controls", self.s7params, self.containerId + "_closedCaptionButton");
			self.closedCaptionButton.addEventListener("click", clickClosedCaptionButton);
			self.closedCaptionButton.setSelected(self.videoPlayer.getCaptionEnabled());
			//check user specified ClosedCaptionButton in css
			var captionStyleLeft = s7sdk.Util.getStyle(self.closedCaptionButton.getObj(),"left");
			var captionStyleRight = s7sdk.Util.getStyle(self.closedCaptionButton.getObj(),"right");			
			self.isCSSforCaptionButton =  ((!isNaN(captionStyleRight.substring(0, captionStyleRight.length-2))&& Number(captionStyleLeft.substring(0, captionStyleLeft.length-2)) != 0));
			self.videoFullScreenButton = new s7sdk.common.FullScreenButton(self.containerId + "_controls", self.s7params, self.containerId + "_videofullScreenButton");

			self.supportsInline = self.videoPlayer.supportsInline();
			if(!self.supportsInline){
				// IF inline playback isn't available (iPhone, etc.), hide the controlbar.
				self.videoControls.getObj().style.display = "none";
			}
			self.zoomInButton = new s7sdk.common.ZoomInButton(self.containerId+"_toolbarContainer", self.s7params, self.containerId+"_zoomInButton");
			self.zoomOutButton = new s7sdk.common.ZoomOutButton(self.containerId+"_toolbarContainer", self.s7params, self.containerId+"_zoomOutButton");
			self.zoomResetButton = new s7sdk.common.ZoomResetButton(self.containerId+"_toolbarContainer", self.s7params, self.containerId+"_zoomResetButton");

			//create container for SpinButtons
			self.divSpinButton = document.createElement('div');
			self.divSpinButton.setAttribute("id",self.containerId+"_divSpinButton");
			self.divSpinButton.className = "s7spinbuttons";
			self.divSpinButton.style.position = "absolute";
			self.divSpinButton.style.top = self.containerHeight - self.swatchesHeight + "px";
			document.getElementById(self.containerId+"_container").appendChild(self.divSpinButton);
			self.spinLeftButton = new s7sdk.common.PanLeftButton(self.containerId+"_divSpinButton", self.s7params, self.containerId+"_spinLeftButton");
			self.spinRightButton = new s7sdk.common.PanRightButton(self.containerId+"_divSpinButton", self.s7params, self.containerId+"_spinRightButton");

			if ((self.s7params.get("closeButton", "0") == "1") || (self.s7params.get("closeButton", "0").toLowerCase() == "true")){
				self.closeButton = new s7sdk.common.CloseButton(self.containerId+"_container", self.s7params, self.containerId + "_closeButton");
				self.closeButton.addEventListener("click", closeWindow);
			}			

			//create container for ColorSwatches
			self.divColorSwatches = document.createElement('div');
			self.divColorSwatches.setAttribute("id",self.containerId+"_divColorSwatches");
			self.divColorSwatches.className = "s7colorswatches";
			self.divColorSwatches.style.position = "absolute";
			self.divColorSwatches.style.zIndex = "1";
			self.divColorSwatches.style.top = self.containerHeight - self.swatchesHeight + "px";
			document.getElementById(self.containerId+"_container").appendChild(self.divColorSwatches);

			self.colorSwatches = new s7sdk.set.Swatches(self.containerId+"_divColorSwatches", self.s7params, self.containerId+"_colorSwatches");
			if (s7sdk.browser.device.name != "desktop"){
				self.colorSwatches.setCSS(".s7swatches", "pointer-events", "none");
			}
			self.trackingManager.attach(self.colorSwatches);			

			self.fullScreenButton = new s7sdk.common.FullScreenButton(self.containerId+"_toolbarContainer", self.s7params, self.containerId + "_fullScreenButton");
			self.notCustomSize = self.sdkContainer.isPopup() && !self.sdkContainer.isFixedSize();
			if (self.notCustomSize && !self.sdkContainer.supportsNativeFullScreen()) {
				self.videoFullScreenButton.getObj().style.display = "none";
				self.fullScreenButton.getObj().style.display = "none";
			}
			if (!self.videoPlayer.supportsVolumeControl()){
				self.mutableVolume.getObj().style.display = "none";
			}
            if(self.viewerMode == "ratio"){
                containerDiv.style.height = "auto";
            }
			//Store button positions
			self.captionButtonPosition = getDeepCSS(self.closedCaptionButton.getObj(), "right");
			self.captionButtonPosition =  Number(self.captionButtonPosition.substring(0, self.captionButtonPosition.length - 2));

			self.volumeButtonPosition = getDeepCSS(self.mutableVolume.getObj(), "right");
			self.volumeButtonPosition =  Number(self.volumeButtonPosition.substring(0, self.volumeButtonPosition.length - 2));
			self.videoTimePosition = getDeepCSS(self.videoTime.getObj(), "right");
			self.videoTimePosition =  Number(self.videoTimePosition.substring(0, self.videoTimePosition.length - 2));
			
			//check is caption
			if (!self.s7params.get("caption")) {
				self.captionSpecified = false;
			}
			
			function getDeepCSS (element, css){
				var dv, sty, val;
				if(element && element.style){
					css= css.toLowerCase();
					sty= css.replace(/\-([a-z])/g, function(a, b){
						return b.toUpperCase();
					});
					val= element.style[sty];
					if(!val){
						dv= document.defaultView || window;
						if(dv.getComputedStyle){
							val= dv.getComputedStyle(element,'').getPropertyValue(css);
						}
						else if(element.currentStyle){
							val= element.currentStyle[sty];
						}
					}
				}
				return val || '';
			}
			//Initial preparation
			viewerPreparation();


			self.mediaSet = new s7sdk.set.MediaSet(null, self.s7params, self.containerId+"_mediaSet");
			self.trackingManager.attach(self.mediaSet);

			// ====================================== VisibilityManagers ====================================== //
			//Add VisibilityManager (for touch devices only)
			if (isNotDesktop) {
				self.visibilityManagerZoom = new s7sdk.VisibilityManager();
				self.visibilityManagerSpin = new s7sdk.VisibilityManager();
                self.visibilityManagerZoom.reference(self.zoomView);
                self.visibilityManagerSpin.reference(self.spinView);

				self.visibilityManagerZoom.attach(self.closeButton);
				self.visibilityManagerSpin.attach(self.closeButton);

				self.visibilityManagerZoom.attach(self.zoomInButton);
				self.visibilityManagerZoom.attach(self.zoomOutButton);
				self.visibilityManagerZoom.attach(self.zoomResetButton);
				if (!self.notCustomSize  || self.sdkContainer.supportsNativeFullScreen()) {
					self.visibilityManagerZoom.attach(self.fullScreenButton);
				}

				self.visibilityManagerSpin.attach(self.zoomInButton);
				self.visibilityManagerSpin.attach(self.zoomOutButton);
				self.visibilityManagerSpin.attach(self.zoomResetButton);
				self.visibilityManagerSpin.attach(self.spinLeftButton);
				self.visibilityManagerSpin.attach(self.spinRightButton);
				if (!self.notCustomSize  || self.sdkContainer.supportsNativeFullScreen()) {
					self.visibilityManagerSpin.attach(self.fullScreenButton);
				}

				self.visibilityManagerZoom.attach(self.colorSwatches);
				self.visibilityManagerZoom.attach(self.swatches);
				self.visibilityManagerSpin.attach(self.swatches);
				
				self.visibilityManagerZoom.attach(self.setindicator);
				self.visibilityManagerSpin.attach(self.setindicator);
				
				// IF inline playback isn't available (iPhone, etc.), do not create VisibilityManager for VideoPlayer.
				if (self.supportsInline) {
					self.visibilityManagerVideo = new s7sdk.VisibilityManager();
					self.visibilityManagerVideo.reference(self.videoPlayer);
					self.visibilityManagerVideo.attach(self.closeButton);
					self.visibilityManagerVideo.attach(self.videoControls);
					self.visibilityManagerVideo.attach(self.swatches);
					self.visibilityManagerVideo.attach(self.setindicator);					
				}
			}		
			// ====================================== Event Listeners ====================================== //
			// Add Swatches event listeners
			self.swatches.addEventListener(s7sdk.AssetEvent.SWATCH_SELECTED_EVENT, swatchSelected, false); 
			// Add ColorSwatches event listeners
			self.colorSwatches.addEventListener(s7sdk.AssetEvent.SWATCH_SELECTED_EVENT, colorSwatchSelected, false); 
			// Add MediaSet event listeners
			self.mediaSet.addEventListener(s7sdk.AssetEvent.NOTF_SET_PARSED, onSetParsed, false);
			// Add Container event listeners
			self.sdkContainer.addEventListener(s7sdk.event.ResizeEvent.COMPONENT_RESIZE, onContainerResize,false);
			self.sdkContainer.addEventListener(s7sdk.event.ResizeEvent.FULLSCREEN_RESIZE, onContainerFullScreen,false);	
			
			if (isNotDesktop) self.swatches.addEventListener(s7sdk.event.SwatchEvent.SWATCH_PAGE_CHANGE, onPageChange, false);

			// Add ZoomInButton event listeners
			self.zoomInButton.addEventListener("click", onZoomInClick, false);
			// Add ZoomOutButton event listeners
			self.zoomOutButton.addEventListener("click", onZoomOutClick, false);
			// Add ZoomResetButton event listeners
			self.zoomResetButton.addEventListener("click",onZoomResetClick, false);	

			// Add SpinLeftButton event listeners
			self.spinLeftButton.addEventListener("click", onSpinLeftButtonClick, false);
			// Add SpinRightButton event listeners
			self.spinRightButton.addEventListener("click", onSpinRightButtonClick, false);

			// Add FullScreenButton event listeners
			self.fullScreenButton.addEventListener("click", onFullScreenButtonClick);
			// Add VideoFullScreenButton event listeners
			self.videoFullScreenButton.addEventListener("click", onFullScreenButtonClick);

			// Add event listener for swipe image
			self.zoomView.addEventListener(s7sdk.event.AssetEvent.ASSET_CHANGED, onImageChanged, false);

			// Add buttons event listener (change states)
			self.zoomView.addEventListener(s7sdk.event.CapabilityStateEvent.NOTF_ZOOM_CAPABILITY_STATE,onChangeZoomState, false);				
			self.spinView.addEventListener(s7sdk.event.CapabilityStateEvent.NOTF_SPIN_CAPABILITY_STATE,onChangeZoomState, false);				

			// Add VideoPlayer event listeners
			self.videoPlayer.addEventListener(s7sdk.event.CapabilityStateEvent.NOTF_VIDEO_CAPABILITY_STATE, onVideoCapabilityStateChange, false);
			self.videoPlayer.addEventListener(s7sdk.event.VideoEvent.NOTF_DURATION, onVideoDuration, false);
			self.videoPlayer.addEventListener(s7sdk.event.VideoEvent.NOTF_LOAD_PROGRESS, onVideoLoadProgress, false);
			self.videoPlayer.addEventListener(s7sdk.event.VideoEvent.NOTF_CURRENT_TIME, onVideoCurrentTime, false);
			// Add PlayPauseButton event listeners
			self.playPauseButton.addEventListener("click", onPlayPauseButtonClick);
			// Add VideoScrubber event listeners
			self.videoScrubber.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_UP, onNotifyScrubberEvent, false);
			// Add MutableVolume event listeners
			self.mutableVolume.addEventListener("click", onMuteButtonClick);
			self.mutableVolume.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_DOWN, onVolumeDown, false);
			self.mutableVolume.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_MOVE, onVolumeMove, false);
			self.mutableVolume.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_UP, onVolumeMove, false);

			if (("onorientationchange" in window) && s7sdk.browser.device != "") {
				window.addEventListener("orientationchange", onOrientationChange); 
			}

            self.trackingManager.setCallback(proxyTrack);
            // AppMeasurementBridge only available when config2 modifier is present
            if (typeof(AppMeasurementBridge) == "function") {
                self.appMeasurementBridge = new AppMeasurementBridge();
                self.appMeasurementBridge.setVideoPlayer(self.videoPlayer);
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
                if(self.colorSwatches){
                    self.colorSwatches.reload();
                }
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
////
			// ====================================== Event Handlers ====================================== //
			function onOrientationChange(event){				
			}
			
			function onChangeZoomState(stateEvent){
				if (stateEvent.s7event.state.hasCapability(s7sdk.ZoomCapabilityState.ZOOM_IN))
					self.zoomInButton.activate();
				else
					self.zoomInButton.deactivate();
					
				if (stateEvent.s7event.state.hasCapability(s7sdk.ZoomCapabilityState.ZOOM_OUT))
					self.zoomOutButton.activate();
				else
					self.zoomOutButton.deactivate();						
						
				if (stateEvent.s7event.state.hasCapability(s7sdk.ZoomCapabilityState.ZOOM_RESET)){
					self.zoomResetButton.activate();
				}
				else {
					self.zoomResetButton.deactivate();
                }
			}

			function onZoomInClick(){
				if(self.activeView && (self.activeView === self.zoomView || self.activeView === self.spinView)){
					self.activeView.zoomIn();
				}
			}
			function onZoomOutClick(){
				if(self.activeView && (self.activeView === self.zoomView || self.activeView === self.spinView)){
					self.activeView.zoomOut();
				}
			}
			function onSpinLeftButtonClick(){
				if(self.activeView && self.activeView === self.spinView){
					self.activeView.moveFrame(s7sdk.Enum.SPIN_DIRECTION.WEST);
				}
			}
			function onSpinRightButtonClick(){
				if(self.activeView && self.activeView === self.spinView){
					self.activeView.moveFrame(s7sdk.Enum.SPIN_DIRECTION.EAST);
				}
			}
			function onZoomResetClick(){
				if(self.activeView && (self.activeView === self.zoomView || self.activeView === self.spinView)){
					self.activeView.zoomReset();
				}
			}

			function onSetParsed(e) {
				self.s7mediasetDesc = e.s7event.asset;
				self.currentSwatchesFrame = null;
				self.initialFrame = Math.max(0,parseInt((typeof(self.s7params.get('initialframe')) != 'undefined') ? self.s7params.get('initialframe') : 0));			
				
				if (self.initialFrame < self.s7mediasetDesc.items.length){
					//
				}else{
					self.initialFrame = 0;
				}

				var isComlex = false;
				if(self.s7mediasetDesc.items.length > 1 && ((self.s7mediasetDesc.type == s7sdk.ItemDescType.VIDEO_SET) ||
                    (self.s7mediasetDesc.type == s7sdk.ItemDescType.SPIN_SET))){
					isComlex = true;
				}
				var assetRatio = 1;
				if(self.viewerMode == "ratio"){
					var itm = self.s7mediasetDesc.items[0];
					while(itm instanceof s7sdk.MediaSetDesc && itm.items && (itm.itemslength != 0)){
						itm = itm.items[0];
					}
					if(itm && itm.height) {
						assetRatio = itm.width/itm.height;
					}
				}
				if(self.s7mediasetDesc.items.length == 1 || isComlex) {
					self.singleImage = true;
					self.swatches.setCSS(".s7swatches", "visibility", "hidden");
				  	if(self.viewerMode == "fixed") {
						self.sdkContainer.resize (self.sdkContainer.getWidth(), self.containerHeight - self.swatchesHeight);
					} else if(self.viewerMode == "ratio") {
						self.sdkContainer.setAspect(assetRatio);
				  	} else {
				  		updateLayout(self.sdkContainer.getWidth(), self.sdkContainer.getHeight(), self.sdkContainer.getHeight());
				  	}
					if(isComlex){
						var e = {};
						e.s7event = {};
						e.s7event.asset = self.s7mediasetDesc;
						e.s7event.frame = 0;
						swatchSelected(e); 
					} else {
					self.swatches.setMediaSet(self.s7mediasetDesc);
					}
					self.swatches.selectSwatch(0, true);			
				}
				else {
					self.singleImage = false;
				  	if(self.viewerMode == "fixed") {
						self.sdkContainer.resize (self.sdkContainer.getWidth(), self.containerHeight);
                        updateLayout(self.sdkContainer.getWidth(), self.containerHeight, self.containerHeight - self.swatchesHeight);
				  	} else if(self.viewerMode == "ratio") {
				  		var w = self.sdkContainer.getWidth();
				  		if(s7sdk.browser.device.name == "desktop"){
							self.sdkContainer.setAspect(w /( w/assetRatio + self.swatchesHeight));
				  		} else {
				  			self.sdkContainer.setAspect(assetRatio);
				  		}
				  	} else {
				  		updateLayout(self.sdkContainer.getWidth(),  self.containerHeight, self.containerHeight - self.swatchesHeight);
				  	}

					self.swatches.setMediaSet(self.s7mediasetDesc);
					self.swatches.selectSwatch(self.initialFrame, true);			
					self.swatches.setCSS(".s7swatches", "visibility", "inherit");
				}			
				if (self.setindicator){								
					resolveIndicatorVisibility();
				}		

				if ((self.handlers["initComplete"] != null) && (typeof self.handlers["initComplete"] == "function")){
					self.handlers["initComplete"]();
				}
			}


			function resolveIndicatorVisibility(){
				if (self.swatches.getPageCount().x <= 1){
					self.setindicator.getObj().style.visibility = 'hidden';	
				}else{				
					self.setindicator.setNumberOfPages(self.swatches.getPageCount().x);
					self.setindicator.getObj().style.visibility = 'inherit';	
				}
				var pages = self.swatches.getPageCount();
				self.setindicator.setNumberOfPages(pages.x);
			}

			function positionSetIndicator(top){			
				self.setindicator.getObj().style.top = (top) + 'px';			
			}
			
			// Define an event handler function to update the SetIndicator when the swatch page changes
            function onPageChange(event){
                var pg = event.s7event.page.x;				
                self.setindicator.setSelectedPage(pg);
            }
			
			// FullScreenButtons Event Handlers
			function onFullScreenButtonClick() { 
				if (!self.sdkContainer.isFullScreen()){
					if(self.closeButton){
						self.closeButton.getObj().style.display = "none";
					}
					self.sdkContainer.requestFullScreen();
				}
				else {
					if(self.closeButton){
						self.closeButton.getObj().style.display = "block";
					}
					self.sdkContainer.cancelFullScreen();
				}					
			}				
			
			function updateLayout(containerWidth, containerHeight, viewHeight) {
				self.toolbarContainer.style.top = viewHeight + "px";
				self.toolbarContainer.style.width = containerWidth + "px";
				self.divColorSwatches.style.top = viewHeight + "px";
				self.divColorSwatches.style.left = parseInt(containerWidth / 2 - self.colorSwatches.getObj().getWidth()/2) + "px";
				self.divSpinButton.style.top = viewHeight + "px";

				self.videoControls.getObj().style.top = viewHeight - self.videoControlsHeight+"px";
				self.videoControls.getObj().style.width = containerWidth + "px";

				var bcr_playPauseButton = self.playPauseButton.getObj().getBoundingClientRect();
				var bcr_videoTime = self.videoTime.getObj().getBoundingClientRect();
				var bcr_videoScrubber = self.videoScrubber.getObj().getBoundingClientRect();
				self.videoScrubber.resize(bcr_videoTime.left - bcr_playPauseButton.right - 10, (bcr_videoScrubber.bottom - bcr_videoScrubber.top));
				
				if (s7sdk.browser.device.name != "desktop") {
					self.zoomView.resize(containerWidth, containerHeight);
					self.spinView.resize(containerWidth, containerHeight);
					self.videoPlayer.resize(containerWidth, containerHeight);
				}else{
					self.zoomView.resize(containerWidth, viewHeight);
					self.spinView.resize(containerWidth, viewHeight);
					self.videoPlayer.resize(containerWidth, viewHeight);
				}
				self.swatches.resize(containerWidth, self.swatchesHeight);
                updateCSSMarkers(containerWidth, containerHeight);
				
				if (isNotDesktop){
					resolveIndicatorVisibility();
					//todo:the hard coded '5' isn't good...but not sure of what value to be able to calculate.
					positionSetIndicator(containerHeight - self.swatchesHeight - 10);
				}
			}
			
			function handleButtonsVisibility (asset) {
				
				var showCaptionButton = self.captionSpecified && needSetCaption(asset,self.swatches.getFrame()) && self.isCSSforCaptionButton;
				var volFlag = self.videoPlayer.supportsVolumeControl();
				var videoTimeRight;
				var bcr_playPauseButton = self.playPauseButton.getObj().getBoundingClientRect();
				if(!volFlag && !showCaptionButton) {
					self.mutableVolume.getObj().style.display = "none";

					self.closedCaptionButton.getObj().style.display = "none";
					videoTimeRight = self.volumeButtonPosition;
				}
				else {
					if(!volFlag) {
						self.mutableVolume.getObj().style.display = "none";
						videoTimeRight = self.captionButtonPosition;
						self.closedCaptionButton.getObj().style.right = self.volumeButtonPosition + "px";
					}
					if(!showCaptionButton) {
						self.closedCaptionButton.getObj().style.display = "none";
						if (self.isCSSforCaptionButton){
							videoTimeRight = self.captionButtonPosition;
						}
						else {
							videoTimeRight = self.videoTimePosition;
						}
					}
					else {
						self.closedCaptionButton.getObj().style.display = "block";
						if (!volFlag) {
							videoTimeRight = self.captionButtonPosition;
						}
						else {
							videoTimeRight = self.videoTimePosition;
						}
					}
				}
				self.videoTime.getObj().style.right = videoTimeRight + "px";

				self.videoScrubber.resize(self.videoTime.getObj().getBoundingClientRect().left - bcr_playPauseButton.right - 10, self.videoScrubber.getObj().getBoundingClientRect().height);
			}
			
			//Container Resize handler
			function onContainerResize(event) {
				if((typeof(event.target) == 'undefined') || (event.target == document.getElementById(self.containerId+"_container"))) {
					var hei = event.s7event.h;
					hei = Math.max(self.singleImage ? event.s7event.h : event.s7event.h - self.swatchesHeight, 1);

					if(self.closeButton){
						if(self.sdkContainer.isFullScreen()) {
							self.closeButton.getObj().style.display = "none";
						}else{
							self.closeButton.getObj().style.display = "block";
						}
					}
					updateLayout(event.s7event.w, event.s7event.h, hei);
				}				
			}
			
			//Container FullScreen Resize handler
			function onContainerFullScreen(event) {
				if(self.closeButton){
					if(self.sdkContainer.isFullScreen()) {
						self.closeButton.getObj().style.display = "none";
					}else{
						self.closeButton.getObj().style.display = "block";
					}
				}
				self.fullScreenButton.setSelected(self.sdkContainer.isFullScreen());
				self.videoFullScreenButton.setSelected(self.sdkContainer.isFullScreen());
			}
			
			// VideoPlayer Event Handlers
			function onVideoCapabilityStateChange(event){
				var cap = event.s7event.state;
				if (cap.hasCapability(s7sdk.VideoCapabilityState.PAUSE)) {
	 				self.playPauseButton.setSelected(false);
				}
				else if (cap.hasCapability(s7sdk.VideoCapabilityState.PLAY) || cap.hasCapability(s7sdk.VideoCapabilityState.REPLAY)) {
					// pause or stop
	 				self.playPauseButton.setSelected(true);
				}				
				self.playPauseButton.enableReplay(cap.hasCapability(s7sdk.VideoCapabilityState.REPLAY));
			}
			function onVideoDuration(event){
				self.videoTime.setDuration(event.s7event.data);					
				self.videoScrubber.setDuration(event.s7event.data);
			}
			function onVideoLoadProgress(event){
				self.videoScrubber.setLoadedPosition(event.s7event.data);
			}
			function onVideoCurrentTime(event){
				self.videoTime.setPlayedTime(event.s7event.data);
				self.videoScrubber.setPlayedTime(event.s7event.data);
			}
			// PlayPauseButton Event handlers
			function onPlayPauseButtonClick(event) { 
				if (!self.playPauseButton.isSelected()) {
					// IF the video is over, restart from the beginning
					var rem = self.videoPlayer.getDuration() - self.videoPlayer.getCurrentTime();	// Time remaining
					if (rem <= 1){
						self.videoPlayer.seek(0);
					}
					self.videoPlayer.play();
				}
				else {
					self.videoPlayer.pause();
				}
			}
			// VideoScrubber Event Handlers
			function onNotifyScrubberEvent(event) {
				self.videoPlayer.seek(event.s7event.position * self.videoPlayer.getDuration());
			}
			// MutableVolume Event Handlers
			function onMuteButtonClick(event) {
				if(self.mutableVolume.isSelected()){
                    self.videoPlayer.mute();
                }else{
                    self.videoPlayer.unmute();
					self.videoPlayer.setVolume(self.mutableVolume.getPosition());
                }
			}
			function onVolumeDown(event){
				self.videoPlayer.unmute();	// Make sure the player isn't muted as soon as the user start to change volume
			}
			function onVolumeMove(event){
				self.videoPlayer.setVolume(event.s7event.position);
			}

			function showHide(element,show) { 
				if (element && element.style){
					if (!show){
						element.style.position = 'absolute';
						element.style.left = '-99999px';
					}else{
						element.style.left = '0px';
					}
				}
			}

			function toolsButtonsShowHide(isShow) {
				self.zoomResetButton.getObj().style.display = isShow ? "" : "none";
				self.zoomInButton.getObj().style.display = isShow ? "" : "none";
				self.zoomOutButton.getObj().style.display = isShow ? "" : "none";
				
			}
			
			function viewerPreparation() { 
				document.getElementById(self.containerId+"_zoomView").style.display="none";
				document.getElementById(self.containerId+"_spinView").style.display="none";
				self.spinLeftButton.getObj().style.display="none";
				self.spinRightButton.getObj().style.display="none";
				self.toolbarContainer.style.display="none";
				var videoState = self.videoPlayer.getCapabilityState();
				if (videoState.hasCapability(s7sdk.VideoCapabilityState.STOP) || 
					videoState.hasCapability(s7sdk.VideoCapabilityState.REPLAY) ||
					videoState.hasCapability(s7sdk.VideoCapabilityState.PAUSE) 
					) {
					self.videoPlayer.stop();
				}
				showHide(self.videoControls.getObj(),false);
				showHide(self.videoPlayer.getObj(),false);
				self.divColorSwatches.style.display = "none";
				self.colorSwatchesActive = false;
				self.currentColorSwatchesFrame = null;
			}

			function swatchSelected(e) { 
				var asset = e.s7event.asset;
				
				
				if(self.currentSwatchesFrame != e.s7event.frame || asset != self.prevAsset){
					viewerPreparation();				

					switch(asset.type){
					case s7sdk.ItemDescType.IMG:
						if(self.zoomView){
							toolsButtonsShowHide(true);
							self.activeView = self.zoomView;
						
							var mediaDsc = new s7sdk.MediaSetDesc();
							mediaDsc.name = new Date().getTime();
							var imgDsc = new s7sdk.ImageDesc(
										mediaDsc,
										asset.type,asset.name,
										asset.swatch,
										asset.width,asset.height,asset.version,asset.isDefault,asset.mod,asset.pmod,asset.label,null,null,null,
										(asset.maps && asset.maps.length) ? true:false,
										false,true
									);
							mediaDsc.items.push(imgDsc);
							self.zoomView.setItem(imgDsc);
							if (self.visibilityManagerZoom){
								self.visibilityManagerZoom.detach(self.colorSwatches);
							}
							document.getElementById(self.containerId+"_zoomView").style.display="block";
							self.toolbarContainer.style.display="block";
                            var state = self.zoomView.getCapabilityState();
                            if(typeof(state) !=  'undefined'){
                                onChangeZoomState({s7event: {state: state}});
                            }
						}
						break;
					case s7sdk.ItemDescType.IMAGE_SET:
						if(self.zoomView){
							toolsButtonsShowHide(true);
							self.activeView = self.zoomView;
							self.colorSwatchesActive = true;
							if (self.visibilityManagerZoom){
								self.visibilityManagerZoom.attach(self.colorSwatches);
							}
							self.divColorSwatches.style.display = "";
							self.colorSwatches.setMediaSet(asset);
							self.colorSwatches.selectSwatch(0, false);
							document.getElementById(self.containerId+"_zoomView").style.display="block";
							self.toolbarContainer.style.display="block";
                            var state = self.zoomView.getCapabilityState();
                            if(typeof(state) !=  'undefined'){
                                onChangeZoomState({s7event: {state: state}});
                            }
						}
						break;
					case s7sdk.ItemDescType.SPIN_SET:
						if(self.spinView){
							toolsButtonsShowHide(true);
							self.activeView = self.spinView;
							self.spinLeftButton.getObj().style.display="block";
							self.spinRightButton.getObj().style.display="block";
							self.spinView.setMediaSet(asset);
							document.getElementById(self.containerId+"_spinView").style.display="block";
							self.toolbarContainer.style.display="block";
                            var state = self.spinView.getCapabilityState();
                            if(typeof(state) !=  'undefined'){
                                onChangeZoomState({s7event: {state: state}});
                            }
						}
						break;
					case s7sdk.ItemDescType.VIDEO:
						if(self.videoPlayer){
							toolsButtonsShowHide(false);
							self.activeView = self.videoPlayer;
							self.videoPlayer.setItem(asset);
							self.videoPlayer.setCaptionEnabled(needSetCaption(asset, self.swatches.getFrame()) && self.captionSpecified && self.storedCaptionEnabled);
							if (self.videoPlayer.supportsInline()) {
								self.videoControls.getObj().style.visibility="inherit";
							} else {
								self.toolbarContainer.style.display="block";
							}
							showHide(self.videoPlayer.getObj(),true);
							showHide(self.videoControls.getObj(),true);
							handleButtonsVisibility(asset);
						}
						break;
					case s7sdk.ItemDescType.VIDEO_SET:
						if(self.videoPlayer){
							toolsButtonsShowHide(false);
							self.activeView = self.videoPlayer;
							self.videoPlayer.setItem(asset);
							self.videoPlayer.setCaptionEnabled(needSetCaption(asset, self.swatches.getFrame()) && self.captionSpecified && self.storedCaptionEnabled);
							if (self.videoPlayer.supportsInline()) {
								self.videoControls.getObj().style.visibility="inherit";
							} else {
								self.toolbarContainer.style.display="block";
							}
							showHide(self.videoPlayer.getObj(),true);
							showHide(self.videoControls.getObj(),true);
							handleButtonsVisibility(asset);
						}
						break;
					default:
						break;
					}
				}
				self.currentSwatchesFrame = e.s7event.frame;
                self.prevAsset = asset;
			}
	
			function needSetCaption (asset, frame){
				for (var i = 0; i < frame; i++) {
					if ((asset.parent.items[i].type == s7sdk.ItemDescType.VIDEO) || (asset.parent.items[i].type == s7sdk.ItemDescType.VIDEO_SET)){
						return false; 
					}
				}
				return true;
			}
			
			function colorSwatchSelected(e) { 
				var asset = e.s7event.asset;
					if(self.activeView && (self.activeView === self.zoomView)){
						if(self.activeView){
							self.activeView.setItem(asset);
						}
					}

			}

			function onImageChanged(e) {
				if (self.colorSwatches && self.colorSwatchesActive && e.s7event.frame != self.colorSwatches.getFrame()){
					self.currentColorSwatchesFrame = e.s7event.frame; 
					self.colorSwatches.selectSwatch(e.s7event.frame, true);
				}
			}

			function closeWindow() {
				try{
					if(s7sdk.browser.name != "firefox") {
						window.open(self.getContentUrl() + "s7sdkclose.html","_self"); //workaround for close self window with JS
					} else {
						window.close(); // Firefox does not allow workaround so we fall back to window.close to cover pop-up case
					} 
				}
				catch(e){
					s7sdk.Logger.log(s7sdk.Logger.WARN,"Cannot close the window");
				}
			}	
			
            function proxyTrack(objID, compClass, instName, timeStamp, eventInfo) {
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
			
            // Add ClosedCaption enable/disable feature.
            function clickClosedCaptionButton() {
                self.videoPlayer.setCaptionEnabled(self.closedCaptionButton.isSelected());
				self.storedCaptionEnabled = self.closedCaptionButton.isSelected();
            }	
		}

		this.s7params.addEventListener(s7sdk.Event.SDK_READY,function(){
												self.initSiteCatalyst(self.s7params,initViewer);
										},false);
		this.s7params.init();
	};

	
	s7viewers.MixedMediaViewer.prototype.setParam = function(key, def){
		this.params[key] = def;	
	};

	s7viewers.MixedMediaViewer.prototype.setParams = function(inParams){
		var params = inParams.split("&");
		for (var i = 0; i < params.length; i++) {
			var pair = params[i].split("=");
			if (pair.length > 1) {
				this.setParam(pair[0],decodeURIComponent(params[i].split("=")[1]));
			}
		}
	};
	
	s7viewers.MixedMediaViewer.prototype.s7sdkUtilsAvailable = function(){
		return (typeof s7sdk != "undefined");
	};

	s7viewers.MixedMediaViewer.prototype.init = function(){
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
						self.onreadystatechange = null;
					}, 0);
				}  
			};
			elems[0].appendChild(elem);
		}
		
		return this;
	};
			
	s7viewers.MixedMediaViewer.prototype.getDomain = function(inUrl) {
		var res = /(^http[s]?:\/\/[^\/]+)/i.exec(inUrl);
		if (res == null) {
			return '';
		} else {
			return res[1];
		}
	};

	s7viewers.MixedMediaViewer.prototype.setAsset = function(inAsset, inCaption) {
		if (this.mediaSet){
			this.mediaSet.setAsset(inAsset);
			if (inCaption){
				this.captionSpecified = true;
				this.videoPlayer.setCaption(inCaption);
				this.videoPlayer.setCaptionEnabled(this.storedCaptionEnabled);
			}
			else {
				this.captionSpecified = false;
				this.videoPlayer.setCaptionEnabled(false);//disable caption because caption may be active from previous video
			}
		}else{
			this.setParam("asset", inAsset);
		}	
	};
	
	s7viewers.MixedMediaViewer.prototype.setLocalizedTexts = function(inText) {
		if (this.s7params){
			this.s7params.setLocalizedTexts(inText);
		}else{
			this.setParam("localizedtexts", inText);
		}
	};

	s7viewers.MixedMediaViewer.prototype.initSiteCatalyst = function(params,inCallback) {
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
								self.onreadystatechange = null;
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
	};
	
	
	/**
	 * Return component within the viewer according the specified id, null if id is invalid or inapplicable.
	 * @param inId ID of the component to retrieve 
	 */
	s7viewers.MixedMediaViewer.prototype.getComponent = function(inId) {
		switch(inId){
			case "container":
				return this.container || null;
			case "mediaSet":
				return this.mediaSet || null;
			case "zoomView":
				return this.zoomView || null;
			case "spinView":
				return this.spinView || null;
			case "videoPlayer":
				return this.videoPlayer || null;
			case "controls":
				return this.videoControls || null;
			case "videoScrubber":
				return this.videoScrubber || null;
			case "videoTime":
				return this.videoTime || null;
			case "swatches":
				return this.swatches || null;
			case "colorSwatches":
				return this.colorSwatches || null;
			case "setIndicator":
				return this.setindicator || null;			
			case "zoomInButton":
				return this.zoomInButton || null;
			case "zoomOutButton":
				return this.zoomOutButton || null;
			case "zoomResetButton":
				return this.zoomResetButton || null;
			case "spinLeftButton":
				return this.spinLeftButton || null;
			case "spinRightButton":
				return this.spinRightButton || null;
			case "mutableVolume":
				return this.mutableVolume || null;
			case "playPauseButton":
				return this.playPauseButton || null;
			case "fullScreenButton":
				return this.fullScreenButton || null;
			case "closeButton":
				return this.closeButton || null;
			default:
				return null;
		}
	};	

	/**
	 * @private
	 * Assigns handler functions by names.  This function will clear the previous handler functions on the list.
	 * Non-function entries will be ignored.
	 *
	 * @param {Object} inObj Simple JSON object containing name:function pairs.
	 */
	s7viewers.MixedMediaViewer.prototype.setHandlers = function(inObj) {
        if (this.initCalled) return;
		this.handlers = [];
		for (var i in inObj) {
			if (!inObj.hasOwnProperty(i)) continue;
			if (typeof inObj[i] != "function") continue;
			this.handlers[i] = inObj[i];
		}
	};
}
