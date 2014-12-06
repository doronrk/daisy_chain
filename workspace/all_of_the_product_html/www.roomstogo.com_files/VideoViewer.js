
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
if(typeof s7viewers == "undefined"){
	s7viewers = {};
}else if(typeof s7viewers != "object"){
	throw new Error("Cannot initialize a root 's7viewers' package. s7viewers is not an object");
}

if(!s7viewers.VideoViewer){

	s7viewers.VideoViewer = function (inObj) {
		this.sdkBasePath = '../../s7sdk/2.8/';
		this.viewerFileName = "VideoViewer.js";
		this.cssSrcURL = "VideoViewer.css";
		this.utilsFilePath = "js/s7sdk/utils/Utils.js";
		this.containerId = null;
		this.params = {};
		this.handlers = [];
		this.onInitComplete = null;
		this.onInitFail = null;
		this.initializationComplete = false;
		this.initCalled = false;
		this.firstMediasetParsed = false;
		
        if (typeof inObj == "object"){
            if (inObj.containerId) {
                this.setContainerId(inObj.containerId);
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
	
	s7viewers.VideoViewer.cssClassName = "s7videoviewer";

	s7viewers.VideoViewer.prototype.setContainerId = function (inElemId) {
		this.containerId = inElemId || null;
	};

	s7viewers.VideoViewer.prototype.getContentUrl = function () {
		 var contentUrl = "";
		 var viewerPath = "";
		 var scriptTags = null;
		 if (document.scripts){
			scriptTags = document.scripts;
		 }else{
			scriptTags = document.getElementsByTagName("script");
		 }

		for(var i=0; i<scriptTags.length;i++){
			var result = /^\s*(http[s]?:\/\/[^\/]*)?(.*)(\/js\/VideoViewer\.js)/.exec(scriptTags[i].getAttribute('src'));
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

	s7viewers.VideoViewer.prototype.includeViewer = function () {
		s7sdk.Util.require("s7sdk.common.Button");
		s7sdk.Util.require("s7sdk.common.Container");
		s7sdk.Util.require("s7sdk.event.Event");
		s7sdk.Util.require("s7sdk.video.VideoControls");
		s7sdk.Util.require("s7sdk.video.VideoPlayer");
		s7sdk.Util.require("s7sdk.common.ControlBar");
		s7sdk.Util.require("s7sdk.set.MediaSet");
		s7sdk.Util.require("s7sdk.share.Share");
		
		this.s7params = new s7sdk.ParameterManager(null, null, {"asset" : "MediaSet.asset" },this.getContentUrl() + this.cssSrcURL);
		var viewerName = ""; 
		if (this.s7params.params.config && s7sdk.Util.isString(this.s7params.params.config)) {
			viewerName = ",";
			if (this.s7params.params.config.indexOf("/") > -1) {
				viewerName += this.s7params.params.config.split('/')[1];
			} else 
				viewerName += this.s7params.params.config;
		}
		this.s7params.setViewer("506,5.1.1" + viewerName);

		for(var prm in this.params){
			if (prm != "localizedTexts"){
				this.s7params.push(prm, this.params[prm]);
			}else{
				this.s7params.setLocalizedTexts(this.params[prm]);
			}
		}

		this.trackingManager = new s7sdk.TrackingManager();

        this.mediaSet = null;
		this.mediasetDesc = null; 
		this.container = null; 
		this.videoplayer = null;
		this.controls = null;
		this.playPauseButton = null;
		this.videoScrubber = null;
		this.videoTime = null;
		this.mutableVolume = null;
		this.fullScreenButton = null;
		this.closedCaptionButton = null
		
		this.socialShare = null;
		this.emailShare = null;
		this.embedShare = null;
		this.linkShare = null;
		this.twitterShare = null;
		this.facebookShare = null;
		this.captionButtonPosition = null;
		this.volumeButtonPosition = null;
		this.videoTimePosition = null;
		this.isCaption = true;
		this.curCaption = null;
		this.storedCaptionEnabled = null;
		this.isNavigation = null;
		this.fixTrackCSS = false;
		
		this.supportsInline = null;
		
		// Make sure the viewer container has a CSS class name above the basic videoplayer and SDK component names
		if (this.containerId != null){
			var containerDiv = document.getElementById(this.containerId);
			if (containerDiv){
				if (containerDiv.className != ""){
					if (containerDiv.className.indexOf(s7viewers.VideoViewer.cssClassName) != -1){
						//
					}else{
						containerDiv.className += " "+s7viewers.VideoViewer.cssClassName;
					}	
				}else{
					containerDiv.className = s7viewers.VideoViewer.cssClassName;
				}
			}
		}

		var self = this;

		function initViewer(){
			var containerDivID = self.containerId + "_container";
			var controlsDivID = self.containerId + "_controls";
			self.s7params.push("autoplay", "0");
			self.s7params.push("singleclick", "playPause");
			self.s7params.push("iconeffect", "1,-1,0.3,0");
			self.s7params.push('bearing', 'fit-vertical');
			self.s7params.push("initialbitrate", "1400");

			// Create MediaSet
			self.mediaSet = new s7sdk.MediaSet(null, self.s7params, self.containerId+"_mediaSet");
			// Create a viewer Container

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

            self.container = new s7sdk.Container(self.containerId, self.s7params, containerDivID);
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

            self.containerHeight = self.container.getHeight();

			// Create the VideoPlayer
			self.videoplayer = new s7sdk.video.VideoPlayer(containerDivID, self.s7params, self.containerId + "_videoPlayer");
			self.trackingManager.attach(self.videoplayer);
            // Create the ControlBar
			self.controls = new s7sdk.common.ControlBar(containerDivID, self.s7params, controlsDivID);
            self.controls.getObj().style.visibility = "hidden";

			self.controls.attachView(self.videoplayer);
			// Create the PlayPauseButton
			self.playPauseButton = new s7sdk.common.PlayPauseButton(controlsDivID, self.s7params, self.containerId + "_playPauseButton");
			// Create the VideoScrubber
			self.videoScrubber = new s7sdk.video.VideoScrubber(controlsDivID, self.s7params, self.containerId + "_videoScrubber");
			//check if css contains 'width:310px' || 'width:365px' style for track of VideoScrubber (fixed issue S7-5594, S7-6006).
			self.fixTrackCSS = 
				(s7sdk.Util.getStyle(self.videoScrubber.component.track, "width") == "310px") || 
				(s7sdk.Util.getStyle(self.videoScrubber.component.track, "width") == "365px");
			// Create the VideoTime
			self.videoTime = new s7sdk.VideoTime(controlsDivID, self.s7params, self.containerId + "_videoTime");
			// Create the MutableVolume
			self.mutableVolume = new s7sdk.video.MutableVolume(controlsDivID, self.s7params, self.containerId + "_mutableVolume");
			// Create the FullScreenButton
			self.fullScreenButton = new s7sdk.common.FullScreenButton(controlsDivID, self.s7params, self.containerId + "_fullScreenButton");
			// Create the ClosedCaptionButton
			self.closedCaptionButton = new s7sdk.common.ClosedCaptionButton(controlsDivID, self.s7params, self.containerId + "_closedCaptionButton");
			self.closedCaptionButton.addEventListener("click", clickClosedCaptionButton);
			self.closedCaptionButton.setSelected(self.videoplayer.getCaptionEnabled());
			self.videoplayer.setCaptionEnabled(self.videoplayer.getCaptionEnabled());
			self.storedCaptionEnabled = self.videoplayer.getCaptionEnabled();
			self.captionButtonPosition = getDeepCSS(self.closedCaptionButton.getObj(), "right");
			self.captionButtonPosition =  Number(self.captionButtonPosition.substring(0, self.captionButtonPosition.length - 2));
			self.volumeButtonPosition = getDeepCSS(self.mutableVolume.getObj(), "right");
			self.volumeButtonPosition =  Number(self.volumeButtonPosition.substring(0, self.volumeButtonPosition.length - 2));
			self.videoTimePosition = getDeepCSS(self.videoTime.getObj(), "right");
			self.videoTimePosition =  Number(self.videoTimePosition.substring(0, self.videoTimePosition.length - 2));
			if (!self.s7params.get("caption")) {
				self.isCaption = false;
			} else {
				self.curCaption = self.s7params.params.caption;
			}
			if (self.s7params.get("navigation")) {
				self.isNavigation = self.s7params.get("navigation"); // needed for embedshare to include navigation data
			}
			
			// Create SocialShare
			self.socialShare = new s7sdk.share.SocialShare(containerDivID, self.s7params, self.containerId + "_socialShare");
			if (s7sdk.browser.device.name != "iphone") {
				self.controls.attach(self.socialShare);
			}
			self.emailShare = new s7sdk.share.EmailShare(self.containerId + "_socialShare", self.s7params, self.containerId + "_emailShare");
			self.embedShare = new s7sdk.share.EmbedShare(self.containerId + "_socialShare", self.s7params, self.containerId + "_embedShare");
			self.linkShare = new s7sdk.share.LinkShare(self.containerId + "_socialShare", self.s7params, self.containerId + "_linkShare");
			self.twitterShare = new s7sdk.share.TwitterShare(self.containerId + "_socialShare", self.s7params, self.containerId + "_twitterShare");
			self.facebookShare = new s7sdk.share.FacebookShare(self.containerId + "_socialShare", self.s7params, self.containerId + "_facebookShare"); 
			self.emailShare.addEventListener(s7sdk.event.SocialEvent.NOTF_SOCIAL_ACTIVATED, onSocialActivated, false);
			self.embedShare.addEventListener(s7sdk.event.SocialEvent.NOTF_SOCIAL_ACTIVATED, onSocialActivated, false);
			self.linkShare.addEventListener(s7sdk.event.SocialEvent.NOTF_SOCIAL_ACTIVATED, onSocialActivated, false);
			self.twitterShare.addEventListener(s7sdk.event.SocialEvent.NOTF_SOCIAL_ACTIVATED, onSocialActivated, false);
			self.facebookShare.addEventListener(s7sdk.event.SocialEvent.NOTF_SOCIAL_ACTIVATED, onSocialActivated, false);
			/* This block is to disable auto-hide of socialShare panel if mouse cursor is over it.*/
			self.socialShare.addEventListener("mouseover", function(event) { 
				self.controls.allowAutoHide(false);
			});
			self.socialShare.addEventListener("mouseout", function(event) { 
				self.controls.allowAutoHide(true);
			});

			// Pass parameters to Social elements
			self.linkShare.setContentUrl(document.URL); 
			self.emailShare.setOriginUrl(window.location.hostname);
			self.emailShare.setContentUrl(document.URL);
			self.supportsInline = self.videoplayer.supportsInline();
			
			// ====================================== Event Listeners ====================================== //
			
			// Add MediaSet event listeners
			self.mediaSet.addEventListener(s7sdk.AssetEvent.NOTF_SET_PARSED, onSetParsed, false);
			// Add Container event listeners
			self.container.addEventListener(s7sdk.event.ResizeEvent.COMPONENT_RESIZE, onContainerResize,false);
			self.container.addEventListener(s7sdk.event.ResizeEvent.FULLSCREEN_RESIZE, onContainerFullScreen,false);
			// Add VideoPlayer event listeners
			self.videoplayer.addEventListener(s7sdk.event.CapabilityStateEvent.NOTF_VIDEO_CAPABILITY_STATE, onVideoCapabilityStateChange, false);
			self.videoplayer.addEventListener(s7sdk.event.VideoEvent.NOTF_DURATION, onVideoDuration, false);
			self.videoplayer.addEventListener(s7sdk.event.VideoEvent.NOTF_LOAD_PROGRESS, onVideoLoadProgress, false);
			self.videoplayer.addEventListener(s7sdk.event.VideoEvent.NOTF_CURRENT_TIME, onVideoCurrentTime, false);
			self.videoplayer.addEventListener(s7sdk.event.VideoEvent.NOTF_NAVIGATION, onVideoNavigation, false);
			// Add PlayPauseButton event listeners
			self.playPauseButton.addEventListener("click", onPlayPauseButtonClick);
			// Add VideoScrubber event listeners
			//self.videoScrubber.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_DOWN, onNotifyScrubberEvent, false);
			//self.videoScrubber.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_MOVE, onNotifyScrubberEvent, false);
			self.videoScrubber.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_UP, onNotifyScrubberEvent, false);
			// Add MutableVolume event listeners
			self.mutableVolume.addEventListener("click", onMuteButtonClick);
			self.mutableVolume.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_DOWN, onVolumeDown, false);
			self.mutableVolume.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_MOVE, onVolumeMove, false);
			self.mutableVolume.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_UP, onVolumeMove, false);
			// Add FullScreenButton event listeners
			self.fullScreenButton.addEventListener("click", onFullScreenButtonClick);
            // Add tracking callback
            self.trackingManager.setCallback(proxyTrack);
            if (typeof(AppMeasurementBridge) == "function") {
                self.appMeasurementBridge = new AppMeasurementBridge();
                self.appMeasurementBridge.setVideoPlayer(self.videoplayer);
            }
			if(self.viewerMode == "ratio"){
			    containerDiv.style.height = "auto";                
			}
            // ====================================== Event Handlers ====================================== //
            function proxyTrack(objID, compClass, instName, timeStamp, eventInfo) {
                if (self.appMeasurementBridge) {
                    self.appMeasurementBridge.track(objID, compClass, instName, timeStamp, eventInfo);
                }
                if (self.handlers["trackEvent"]) {
                    self.handlers["trackEvent"](objID, compClass, instName, timeStamp, eventInfo)
                }
                if ("s7ComponentEvent" in window) {
                    s7ComponentEvent(objID, compClass, instName, timeStamp, eventInfo);
                }
            }

            function onSocialActivated (event) {
					self.videoplayer.pause();
			}	
			
			// MediaSet Event Handlers
			function onSetParsed(event) {
				self.mediasetDesc = event.s7event.asset;
				
				// just in case, check what is returned is of type MediaSetDesc
				if (self.mediasetDesc instanceof s7sdk.MediaSetDesc) {
                    if(self.viewerMode == "ratio"){
                        var itm = self.mediasetDesc.items[0];
                        var assetRatio = itm.width/itm.height;
                        self.container.setAspect(assetRatio);
                    }
					if (self.mediasetDesc.type == s7sdk.ItemDescType.VIDEO_SET) {
						// MBR set
						self.videoplayer.setItem(self.mediasetDesc);
					}
					else {
						// single video
						self.videoplayer.setItem(self.mediasetDesc.items[0]);
					}
					
					if (self.isNavigation) {
						self.videoplayer.setModifier({ "navigation": self.isNavigation });
					}
				}
				else
					throw new Error("Failed to get meta data for video: " + event.s7event.asset);
				handleButtonsVisibility();
				if (self.emailShare) self.emailShare.setThumbnail(event.s7event.asset.name);
				if (self.embedShare) self.embedShare.setEmbedCode(getTemplateForViewer());
				if ((self.handlers["initComplete"] != null) && (typeof self.handlers["initComplete"] == "function") && !self.firstMediasetParsed){
					self.handlers["initComplete"]();
				}
				self.firstMediasetParsed = true;
				self.controls.getObj().style.visibility = "";
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
////
			// Container Event Handlers
			function onContainerResize(event) {
				resizeViewer(event.s7event.w, event.s7event.h);
				self.fullScreenButton.setSelected(self.container.isFullScreen());
			}
			function onContainerFullScreen(event) {
				resizeViewer(event.s7event.w, event.s7event.h);
				self.fullScreenButton.setSelected(self.container.isFullScreen());
				//When viewer goes full screen, onFullScreenEnter call back should be executed; 
				//when viewer backs to normal mode, onFullScreenExit should be called.
				if (!self.container.isFullScreen()){
					self.onFullScreenExit(event);
				} else {
					self.onFullScreenEnter(event);
				}					
			}
			// VideoPlayer Event Handlers
			function onVideoCapabilityStateChange(event){
				//self.playPauseButton.setSelected(event.s7event.state.hasCapability(s7sdk.VideoCapabilityState.PLAY));	
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
			function onVideoNavigation(event) {
				self.videoScrubber.setNavigation(event.s7event.data);
			}
			// PlayPauseButton Event handlers
			function onPlayPauseButtonClick(event) { 
				if (!self.playPauseButton.isSelected()) {
					// IF the video is over, restart from the beginning
					var rem = self.videoplayer.getDuration() - self.videoplayer.getCurrentTime();	// Time remaining
					if (rem <= 1){
						self.videoplayer.seek(0);
					}
					self.videoplayer.play();
				}
				else {
					self.videoplayer.pause();
				}
			}
			// VideoScrubber Event Handlers
			function onNotifyScrubberEvent(event) {
				self.videoplayer.seek(event.s7event.position * self.videoplayer.getDuration());
			}
			// MutableVolume Event Handlers
			function onMuteButtonClick(event) {
				if(self.mutableVolume.isSelected()){
                    self.videoplayer.mute();
                }else{
                    self.videoplayer.unmute();
					self.videoplayer.setVolume(self.mutableVolume.getPosition());
                }
			}
			function onVolumeDown(event){
				self.videoplayer.unmute();	// Make sure the player isn't muted as soon as the user start to change volume
			}
			function onVolumeMove(event){
				self.videoplayer.setVolume(event.s7event.position);
			}
			// FullScreenButton Event Handlers
			function onFullScreenButtonClick(event) { 
				if (!self.container.isFullScreen()){
					self.container.requestFullScreen();
				}
				else {
					self.container.cancelFullScreen();
				}					
			}
            // Add ClosedCaption enable/disable feature.
            function clickClosedCaptionButton() {
                self.videoplayer.setCaptionEnabled(self.closedCaptionButton.isSelected());
            }			
			
			// Generate template for EmbedShare
			function getTemplateForViewer() {
				// NOTE: The following use of .component is a work-around for retrieving modifier values from core component.  This should be fixed in future releases	to retrieve values use an API on the control level.
				var tempStr = "";
				if (self.s7params.params.style !="" && self.s7params.params.style != undefined) tempStr = '    videoViewer.setParam("style", "'+ self.s7params.params.style +'"); \n';
				if (self.isCaption && self.curCaption != "" && self.curCaption != undefined) tempStr += '    videoViewer.setParam("caption", "'+ self.curCaption+'"); \n';
				if (self.isNavigation && self.isNavigation != "" && self.isNavigation != undefined) tempStr += '    videoViewer.setParam("navigation", "'+ self.isNavigation+'"); \n';
                var config = "";
                if (self.s7params.params.config !="" && self.s7params.params.config != undefined) {
                    config = '    videoViewer.setParam("config", "'+ self.s7params.params.config +'"); \n';
                }
				var config2 = "";
				if (self.s7params.params.config2 != "" && self.s7params.params.config2 != undefined) 
					config2 = '		videoViewer.setParam("config2", "' + self.s7params.params.config2 + '"); \n';
				
				var template =
							'<'+'script language="javascript" type="text/javascript" src="' +self.getDomScriptTag(self.viewerFileName).src+ '"><'+'/script> \n'+     
				  	        '<'+'div id="' +self.containerId+ '"><'+'/div> \n'+
				  	        '<'+'script type="text/javascript"> \n'+
				  	        '    var videoViewer = new s7viewers.VideoViewer(); \n'+
				  	      	'    videoViewer.setParam("videoserverurl", "' + makeAbsolutePath(self.videoplayer.component.videoServerUrl) + '"); \n'+
				  	      	'    videoViewer.setParam("serverurl", "'+ makeAbsolutePath(self.videoplayer.component.serverUrl) +'"); \n'+
				  	      	'    videoViewer.setParam("contenturl", "' + makeAbsolutePath(self.s7params.get("contenturl","/is/content")) + '"); \n'+
							tempStr +
							'    videoViewer.setAsset("' + self.mediaSet.component.asset + '"); \n'+
				  	      	'    videoViewer.setParam("stagesize", "$EMBED_WIDTH$,$EMBED_HEIGHT$"); \n'+
				  			'	 videoViewer.setParam("emailurl", "' + makeAbsolutePath(self.emailShare.component.emailurl) + '"); \n'+
							config +
							config2 +
				  			'	 videoViewer.setContainerId("' +self.containerId+ '"); \n'+
				  			'	 videoViewer.init(); \n'+
				  	        '<'+'/script> \n';
				return template;
			}

            function makeAbsolutePath(url) {
                if (url && ((url.indexOf("http://") == 0) || (url.indexOf("https://") == 0))) {
                    return url;
                }

                var absUrl = document.location.protocol + "//" + document.location.host;

                if (!url || url.indexOf('/') != 0) {
                    absUrl += "/";
                }

                if (url) {
                    absUrl += url;
                }
                return absUrl;
            }

			// ====================================== UI Layout Helper Functions ====================================== //
			
			// UI Layout Helper Functions
			
			function resizeViewer(w,h){
				self.videoplayer.resize(w, h);
				updateCSSMarkers(w, h);
				updateControlsWidth(w);
			}
			function updateControlsWidth(w) {
				if (self.supportsInline != true){
					return;
				}
				var bcr_playPauseButton = self.playPauseButton.getObj().getBoundingClientRect();
				var bcr_videoTime = self.videoTime.getObj().getBoundingClientRect();
				var bcr_videoScrubber = self.videoScrubber.getObj().getBoundingClientRect();
				self.videoScrubber.resize(bcr_videoTime.left - bcr_playPauseButton.right - 10, (bcr_videoScrubber.bottom - bcr_videoScrubber.top));				
				
				handleFullScreen();
				handleButtonsVisibility();
			}
			function handleFullScreen () {
				if (self.container.isPopup() && !self.container.isFixedSize() &&!self.container.supportsNativeFullScreen()) {
					self.fullScreenButton.getObj().style.display = "none";
				}
			}
			function handleButtonsVisibility () {

				var volFlag = self.videoplayer.supportsVolumeControl();
				var videoTimeRight;
				var bcr_playPauseButton = self.playPauseButton.getObj().getBoundingClientRect();
				var videoTimeRight;
				if(!volFlag && !self.isCaption) {
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
					if(!self.isCaption) {
						self.closedCaptionButton.getObj().style.display = "none";
						videoTimeRight = self.captionButtonPosition;
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
				//resize track of VideoScrubber if css contains 'width'=310px for it (fixed issue S7-5594).
				if (self.fixTrackCSS)
					self.videoScrubber.setCSS('.s7videoscrubber .s7track','width', (self.videoTime.getObj().getBoundingClientRect().left - bcr_playPauseButton.right - 10) + "px");

				self.videoScrubber.resize(self.videoTime.getObj().getBoundingClientRect().left - bcr_playPauseButton.right - 10, self.videoScrubber.getObj().getBoundingClientRect().height);			
			}
			// Helper for getting computed CSS Styles
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
			
			if(self.supportsInline){
				// If the platform supports inline playback (embedded on the page), update the controlbar layout.
				var cW = self.container.getWidth();
				updateControlsWidth(cW);
			}
			else
			{
				// IF inline playback isn't available (iPhone, etc.), hide the controlbar.
				self.controls.getObj().style.display = "none";
			}
			
			if ((self.onInitComplete != null) && (typeof self.onInitComplete == "function")){
				self.onInitComplete();
			}
		} // End initViewer()

		this.s7params.addEventListener(s7sdk.Event.SDK_READY, function(){ self.initSiteCatalyst(self.s7params,initViewer); },false);
		this.s7params.init();	
	};

	s7viewers.VideoViewer.prototype.setParam = function(key, def){
		this.params[key] = def;	
	};

	s7viewers.VideoViewer.prototype.getParam = function(key){
		return this.params[key];	
	};

	s7viewers.VideoViewer.prototype.setParams = function(inParams){
		var params = inParams.split("&");
		for (var i = 0; i < params.length; i++) {
			var pair = params[i].split("=");
			if (pair.length > 1) {
				this.setParam(pair[0],decodeURIComponent(params[i].split("=")[1]));
			}
		}
	};
	
	s7viewers.VideoViewer.prototype.s7sdkUtilsAvailable = function(){
		return (typeof s7sdk != "undefined");
	};
	
	s7viewers.VideoViewer.prototype.resize = function(w, h){
		this.container.resize(w, h);
	};
	
	s7viewers.VideoViewer.prototype.init = function(){
		this.initCalled = true;
		if (this.initializationComplete) return this;
		
		if (this.s7sdkUtilsAvailable()){
			s7sdk.Util.init(); 
			this.includeViewer();
			this.initializationComplete = true;  
		}else{
			var utilSrcPath = this.getContentUrl() + this.sdkBasePath + this.utilsFilePath;
			
			if (this.getDomScriptTag(utilSrcPath) != null) {
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
		}
		return this;
	};

	s7viewers.VideoViewer.prototype.getDomScriptTag = function(jsFileNameOrPath){
		var scriptTags;
		if (document.scripts){
			scriptTags = document.scripts;
		}else{
			scriptTags = document.getElementsByTagName("script");
		}
		for (var i = 0; i < scriptTags.length; i++){ 
			if (scriptTags[i] && scriptTags[i].getAttribute("src") != null && scriptTags[i].getAttribute("src").indexOf(jsFileNameOrPath) != -1){
				return scriptTags[i];
				break;
			}
		}
		return null;
	};
	
	s7viewers.VideoViewer.prototype.getDomain = function(inUrl) {
		var res = /(^http[s]?:\/\/[^\/]+)/i.exec(inUrl);
		if (res == null) {
			return '';
		} else {
			return res[1];
		}
	};

	/**
	 * @private
	 * The second parameter could be the caption or a JSON object contain pairs of values to
	 * specify the caption, navigation, etc.
	 */
	s7viewers.VideoViewer.prototype.setAsset = function(inAsset, inObj) {
		var inCaption = null, inNavigation = null;
		// check if second parameter is present
		if (inObj) {
			// check for type, cannot use s7sdk before initialization in embed share usage
			if (Object.prototype.toString.apply(inObj) === '[object String]') {
				inCaption = inObj;
			} else if (typeof inObj == "object"){
				if (inObj.caption) {
					inCaption = inObj.caption;
				} 
				if (inObj.navigation) {
					inNavigation = inObj.navigation
				}			
			}
		}
		
		if (this.mediaSet){
			this.mediaSet.setAsset(inAsset);
			if (inCaption){
				this.isCaption = true;
				this.curCaption = inCaption + ",1";
				this.videoplayer.setCaption(inCaption);
				this.videoplayer.setCaptionEnabled(this.storedCaptionEnabled);
			}
			else {
				this.isCaption = false;
				this.curCaption = null;
				this.videoplayer.setCaptionEnabled(false);//disable caption because caption may be active from previous video
			}

			this.isNavigation = (inNavigation)? inNavigation : null;			

			this.closedCaptionButton.setSelected(this.storedCaptionEnabled);
			if(this.emailShare) this.emailShare.setThumbnail(inAsset);
			
		}else{
			this.setParam("asset", inAsset);
		}
	};
	
	s7viewers.VideoViewer.prototype.setLocalizedTexts = function(inText) {
		if (this.s7params){
			this.s7params.setLocalizedTexts(inText);
		}else{
			this.setParam("localizedTexts", inText);
		}
	};


	s7viewers.VideoViewer.prototype.initSiteCatalyst = function(params,inCallback) {
		//integrate SiteCatalyst logging
		//strip modifier from asset and take the very first entry from the image list, and the first element in combination from that entry
		var siteCatalystAsset = params.get("asset", null, "MediaSet").split(',')[0].split(':')[0];
		var isConfig2Exist = false;
		var self = this;
		if (siteCatalystAsset.indexOf('/') != -1) {
			var company = s7sdk.MediaSetParser.findCompanyNameInAsset(siteCatalystAsset);
			var config2 = params.get("config2");
			isConfig2Exist = (config2 != '' && typeof config2 != "undefined");
			if (isConfig2Exist){
				var jsp_src = this.getContentUrl()+'../AppMeasurementBridge.jsp?company=' + company + (config2 == '' ? '' : '&preset=' + config2);
                if (params.get("serverurl", null)) {
                    jsp_src += "&isRoot=" + params.get("serverurl");
                }

                var elem = document.createElement("script");
				elem.setAttribute("language", "javascript");
				elem.setAttribute("type", "text/javascript");
				elem.setAttribute("src", jsp_src);

				var elems = document.getElementsByTagName("head");
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
	};

	s7viewers.VideoViewer.prototype.onFullScreenEnter = function(event) {
	 //callback template
		this.socialShare.getObj().style.display = "none";
	};

	s7viewers.VideoViewer.prototype.onFullScreenExit = function(event) {
	 //callback template
		this.socialShare.getObj().style.display = "";
	};

	s7viewers.VideoViewer.prototype.getComponent = function(inId) {
		switch(inId){
			case "container":
				return this.container || null;
			case "mediaSet":
				return this.mediaSet || null;
			case "videoPlayer":
				return this.videoplayer || null;
			case "controls":
				return this.controls || null;
			case "videoScrubber":
				return this.videoScrubber || null;
			case "videoTime":
				return this.videoTime || null;
			case "mutableVolume":
				return this.mutableVolume || null;
			case "playPauseButton":
				return this.playPauseButton || null;
			case "closedCaptionButton":
				return this.closedCaptionButton || null;
			case "fullScreenButton":
				return this.fullScreenButton || null;
			case "twitterShare":
				return this.twitterShare || null;
			case "facebookShare":
				return this.facebookShare || null;
			case "linkShare":
				return this.linkShare || null;
			case "socialShare":
				return this.socialShare || null;
			case "emailShare":
				return this.emailShare || null;
			case "embedShare":
				return this.embedShare || null;
			default:
				return null;
		}
	};

	s7viewers.VideoViewer.prototype.setHandlers = function(inObj) {
		if (this.initCalled) return;
		this.handlers = [];
		for (var i in inObj) {
            if (!inObj.hasOwnProperty(i)) continue;
			if (typeof inObj[i] != "function") continue;
			this.handlers[i] = inObj[i];
		}
	};
	


}
