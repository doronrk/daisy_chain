

var container, s7zoomview, params, swatches, mediaSet, videoPreview, videoView, s7videoplayer;
var curAsset, lastVideo, mediasetDesc, controls, fullscreenbutton;
var btnContainer, prevButton, nextButton;
var s7videotoolbar, s7closeButton, container, controls, fullscreenbutton, playPauseButton;
var curAssetIndex;

var currProtocol = false ? "https:" : "http:";

/**
 * Empty Parent node. Removes all child nodes from an element
 **/
var _removeChildNodes = function(_node) {
    if (_node) {
        while (_node.hasChildNodes()) {
            _node.removeChild(_node.lastChild);
        }
    }
};

var _getViewerWidthFromHeight = function(height){
    var ratio = 1.428571428571429;
    if ($("body").attr("id") == "ensemble") {
        ratio = 1.4296875;
    }
    return (height / ratio);
};

var _getViewerHeightFromWidth = function(width){
    var ratio = 1.428571428571429;
    if ($("body").attr("id") == "ensemble") {
        ratio = 1.4296875;
    }
    return (width * ratio);
};

var _getPopupViewerDimensions = function() {
    /* viewport height less 2% margins */
    var popupViewerHeight = ($(window).height() * .96);
    var popupViewerWidth = _getViewerWidthFromHeight(popupViewerHeight);
    if (popupViewerWidth > ($(window).width() * .96)) {
        /* the viewer will be too wide, so base the calculation off of the width instead */
        popupViewerWidth = ($(window).width() * .96);
        popupViewerHeight = _getViewerHeightFromWidth(popupViewerWidth);
    }
    return {width:popupViewerWidth, height:popupViewerHeight};
};

/**
 * _sizeViewerContainer is needed for responsive support, it will
 * read the width of the els (set by a percentage) and apply a fixed
 * height (by multiplying calculated width by 1.428571428571429)
 **/
var _sizeViewerContainer = function() {
    var $quicklookMiniproduct = $("#quicklookMiniproduct");
    var $viewerParent = ($quicklookMiniproduct.length > 0) ? $quicklookMiniproduct : $("#mainItemImage");
    $(".jsSizeToImageHeight", $viewerParent).each(function(){
        $("head").find("#s7ViewerSizes").remove();
        var $this = $(this);
        var width = parseFloat($this.width());
        var height = _getViewerHeightFromWidth(parseFloat(width));
        var parentId = "#"+$viewerParent.attr("id");
        var cssSelectorString = parentId + " #s7container," + parentId + " #s7videoviewer," + parentId + " #testVideoPreview," + parentId + " .s7viewer";
        $("head").append('<style id="s7ViewerSizes">'+cssSelectorString+' { width:'+parseFloat(width)+'px; height:'+height+'px; }</style>');
    });
};

/**
 * The PDP page (desktop version) is loaded with a default static image for
 * SEO and for Facebook purposes, this method hides the image when the viewer is ready
 **/
var hideStaticImage = function() {
    setTimeout(function() {
        $("#s7viewer > .defaultImage").fadeOut("slow");
    }, 1000);
};

var _usePopupViewer = (responsiveUtil.isMobile() && ($("body").attr("id") != "itemViewer"));

/**
 * Tracking clicks and drags.
 **/
var isS7ViewerDragging = false;
function s7ZoomClickMouseDown() {
    $(window).bind("mousemove.s7ZoomClick", function() {
        $('#s7zoomviewId').addClass("mousemove");
        if ($.browser.msie) {
            /* ie only trigger a mouse movement to update the cursor */
            $('html,body').animate({scrollTop:'+=1'},1).animate({scrollTop:'-=1'},1);
        }
        isS7ViewerDragging = true;
        $(window).unbind("mousemove.s7ZoomClick");
    });
}
function s7ZoomClickMouseUp() {
    $('#s7zoomviewId').removeClass("mousemove");
    var wasDragging = isS7ViewerDragging;
    isS7ViewerDragging = false;
    $(window).unbind("mousemove.s7ZoomClick");
    if (!wasDragging) { //was clicking
        if(s7zoomview.getCapabilityState().hasCapability(s7sdk.ZoomCapabilityState.ZOOM_IN)) {
            s7zoomview.zoomIn();
        } else {
            s7zoomview.zoomReset();
        }
    }
}
function bindS7ZoomClickEvents() {
    $("#s7container").unbind(".s7ZoomClick").on("mousedown.s7ZoomClick", function(e) {
        e.preventDefault();
        s7ZoomClickMouseDown();
    }).on("mouseup.s7ZoomClick", function(e) {
        e.preventDefault();
        s7ZoomClickMouseUp();
    });
}

/**
 * Use this variable to check device type is desktop.
 * @return boolean - true if Desktop else returns false
 **/
var s7desktopCheck;
/**
 * Initial setup function that your html page will call to pass in the asset.
 **/
function setupViewer(passedImageSet, passedVideoSet)
{
    _sizeViewerContainer();
    if (_usePopupViewer) {
        $("#s7viewer").attr("data-viewerpathimageset", passedImageSet);
    }
    s7desktopCheck = s7ueUtils.device.getName().indexOf('desktop') != -1;

    if(document.getElementById("s7container")) {
        _removeChildNodes(document.getElementById("s7container"));
    }
    _removeChildNodes(document.getElementById("indctrContainer"));
    params = new s7sdk.ParameterManager();

    imageset = passedImageSet;

    /**
     * The ParameterManager will dispatch SDK_READY when all modifiers have been processed
     * and it is safe to initalize the viewer
     **/
    params.addEventListener(s7sdk.Event.SDK_READY,initViewer,false);

    /**
     * Now it is safe to process the modifiers, the callbacks have been defined
     * this will trigger the SDK_READY event
     **/
    params.init();
}

/**
 * Setup function that will initialize the viewer.
 */
function initViewer(){
	params.push("serverurl", currProtocol + "//s7d9.scene7.com/is/image");
	params.push("MediaSet.asset", "bebe/"+imageset);
	params.push("videoserverurl", currProtocol + "//s7d9.scene7.com/is/content/");

	//disable s7 icon effect to allow use of your own
	
	params.push("s7videoviewer.iconeffect", "0,1,0.3,3");
	params.push("s7videoviewer.singleclick", "playPause");

	if(vidAutoplay == true) {
        params.push("s7videoviewer.autoplay", "1");
    } else {
        params.push("s7videoviewer.autoplay", "0");
    }

	params.push("s7zoomviewId.singleclick", "none");
	params.push("s7zoomviewId.doubleclick", "none");
	params.push("s7zoomviewId.iconeffect", "0,0,0,0");
	params.push("s7zoomviewId.iscommand", preset);

    if (s7desktopCheck) {
        params.push("s7zoomviewId.zoomstep", "1,2");
    } else {
        params.push("s7zoomviewId.zoomstep", "1,4");
    }

	// create components
	container = new s7sdk.Container("s7viewer", params, "s7container");


    prevButton = new s7sdk.PanLeftButton("lbtnContainer", params, "prevBtn");
    prevButton.addEventListener("click", prevAsset, true);
    nextButton = new s7sdk.PanRightButton("rbtnContainer", params, "nextBtn");
    nextButton.addEventListener("click", nextAsset, true);

	s7zoomview = new s7sdk.ZoomView("s7container", params, "s7zoomviewId");
    s7zoomview.addEventListener(s7sdk.event.CapabilityStateEvent.NOTF_ZOOM_CAPABILITY_STATE, function() {
        if (s7zoomview.getCapabilityState().hasCapability(s7sdk.ZoomCapabilityState.ZOOM_IN)) {
            $('#s7zoomviewId').removeClass("zoomoutCursor");
            if ($.browser.msie) {
                /* ie only trigger a mouse movement to update the cursor */
                $('html,body').animate({scrollTop:'+=1'},1).animate({scrollTop:'-=1'},1);
            }
        } else {
            $('#s7zoomviewId').addClass("zoomoutCursor");
            if ($.browser.msie) {
                /* ie only trigger a mouse movement to update the cursor */
                $('html,body').animate({scrollTop:'+=1'},1).animate({scrollTop:'-=1'},1);
            }
        }
    });

    if (_usePopupViewer) {
        $("#s7container").after('<div class="jsMobileViewerShield"></div>');
    }
    


    //bindS7ZoomClickEvents();

	mediaSet = new s7sdk.MediaSet(null, params, null);
	mediaSet.addEventListener(s7sdk.AssetEvent.NOTF_SET_PARSED,onSetParsed, false);

	s7videoplayer = null;
	videoPreview = null;
}
/**
params.addEventListener(s7sdk.Event.SDK_READY,initViewer,false);
params.init();	//Initialize Parameter Manager
*/
/**
 * Function to parse the media set. If there is a a spin set then make it in to it's
 * own set so all images in the spin are not in the swatches area.
 **/
function onSetParsed(e) {

	mediasetDesc = e.s7event.asset;
	curAssetIndex = -1;

	var url = currProtocol + "//s7d9.scene7.com/is/content/"+videoset+"?req=userdata,json";
	//var url = 'http://s7d4.scene7.com/is/image/S7train/Backpack_B?req=imageprops';
	if(videoset != "")
	{
		if(vidFirst)
			displayElement("s7zoomviewId", false);
		createIndicators(true);

		/**
		 * Use universal viewer from SPS for desktop and iPhone.
		 */
		
		if(isLTEie8()){
			var videoPreview = document.createElement("div");
			videoPreview.setAttribute("id", "testVideoPreview");
			videoPreview.setAttribute("class", "s7videoplayer");
			var s7videoplayer2 = document.createElement("div");
			s7videoplayer2.setAttribute("id", "s7videoviewer");
            var s7container = document.getElementById("s7container");
			s7container.appendChild(s7videoplayer2);

			var theAsset = videoset;

            var vidStreamUrl;
            if(vidAutoplay == true) {
                vidStreamUrl = currProtocol + "//s7d9.scene7.com/is/content/&streaming=true&videoPlayer.autoplay=1";
            } else {
                vidStreamUrl = "";
            }

			var videoConfig = {
				// type of embedded asset UNIVERSAL_VIDEO  :"VIDEO", UNIVERSAL_ZOOM  :"ZOOM", UNIVERSAL_IMAGE_SET :"IMAGE_SET", UNIVERSAL_SWATCH_SET:"RENDER_SET", UNIVERSAL_SPIN_SET :"SPIN_SET_2D", UNIVERSAL_E_CAT  :"ECATALOG"
				assetType:"VIDEO",
				// universal preset
				config:"Universal_Video1",
				// container
				containerId:"testVideoPreview",
                flashMode:"transparent",
                streamingVideoUrl:vidStreamUrl
			};
			videoConfig.asset = theAsset.toString();
			s7videoplayer2.appendChild(videoPreview);
			videoView = new s7uev.EmbeddedViewer(videoConfig);

		}
		/**
		 * Create universal video for mobile with custom controls using sdk
		 */
		else
		{
			s7videoplayer = new s7sdk.video.VideoPlayer("s7container",params,"s7videoviewer");

			//create the video control bar
			controls = new s7sdk.common.ControlBar("vdCntrlContainer", params, "controls");

			//playPauseButton block
			playPauseButton = new s7sdk.common.PlayPauseButton("controls", params, "playPauseBtn");
			playPauseButton.setSelected(true);
			playPauseButton.addEventListener("click",function() {
			if (!playPauseButton.isSelected()) {
				s7videoplayer.play();

			}
			else {
				s7videoplayer.pause();
			}
			});

			//fullScreenButton block
			fullScreenButton = new s7sdk.common.FullScreenButton("controls", params, "fullScreenBtn");
			fullScreenButton.addEventListener("click",function() {
			if (!container.isFullScreen()){
				container.requestFullScreen();
				displayElement("btnContainer", false);
				displayElement("indctrContainer", false);
			}
			else {
				container.cancelFullScreen();
				displayElement("btnContainer", true);
				displayElement("indctrContainer", true);
			}
			});

			//videoScrubber block
			videoScrubber = new s7sdk.video.VideoScrubber("controls", params, "videoScrubber");
			videoScrubber.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_DOWN, onScrubberSlide, false);
			videoScrubber.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_MOVE, onScrubberSlide, false);
			videoScrubber.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_UP, onScrubberSlide, false);

			//videoTime block
			videoTime = new s7sdk.VideoTime("controls", params, "videoTime");

			//mutableVolume block
			mutableVolume = new s7sdk.video.MutableVolume("controls", params, "mutableVolume");
			mutableVolume.addEventListener("click",function() {
				if (!mutableVolume.isSelected()) {
					s7videoplayer.setVolume(mutableVolume.getPosition());
				}
				else {
					s7videoplayer.setVolume(0);
				}
			});
			mutableVolume.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_DOWN, onVolumeSlide, false);
			mutableVolume.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_MOVE, onVolumeSlide, false);
			mutableVolume.addEventListener(s7sdk.SliderEvent.NOTF_SLIDER_UP, onVolumeSlide, false);

			setupVideo();
		}
	}
	if(!vidFirst || videoset=="")
	{
		curAssetIndex = 0;
		if (videoset=="") {
            createIndicators(false);
        }
		s7zoomview.setItem(mediasetDesc.items[curAssetIndex]);
        bindS7ZoomClickEvents();
		displayElement("s7videoviewer", false);
		displayElement("vdCntrlContainer", false);
		displayElement("s7zoomviewId", true);
	}
    hideStaticImage();
}



/**
 * Function to create the indicator buttons.
 **/
function createIndicators(hasVideo) {
    _removeChildNodes(document.getElementById("indctrContainer"));

    var index;

    if(hasVideo && vidFirst) {
        index = -1;
    } else {
        index = 0;
    }

    var prevBtn = $('#prevBtn');
    var nextBtn = $('#nextBtn');

    if(mediasetDesc.items.length <= 1) {
        prevBtn.hide();
        nextBtn.hide();
    } else {
        prevBtn.show();
        nextBtn.show();
    }

    for (var i = index; i < (mediasetDesc.items.length); i++) {
        var indicatorButton = new Image();
        if(i==-1 && vidFirst) {
            indicatorButton.src = 'http://www.bebe.com/assets/bb/assets/images/common/video-Selector-2.png';
        } else if(i==-0 && !hasVideo) {
            indicatorButton.src = 'http://www.bebe.com/assets/bb/assets/images/common/Image-Selector-2.png';
        } else if(i==-0 && !vidFirst) {
            indicatorButton.src = 'http://www.bebe.com/assets/bb/assets/images/common/Image-Selector-2.png';
        } else {
            indicatorButton.src = 'http://www.bebe.com/assets/bb/assets/images/common/Image-Selector-1.png';
        }

        indicatorButton.id = "indicator"+i;
        $(indicatorButton).addClass("indicator");
        document.getElementById("indctrContainer").appendChild(indicatorButton);
        if(i == -1)
        {
            if(indicatorButton.addEventListener) {
                indicatorButton.addEventListener("click",function() {
                    changeIndicator(-1);
                    displayElement("s7videoviewer", true);
                    displayElement("vdCntrlContainer", true);
                    displayElement("s7zoomviewId", false);
                });
            }
            else {
                indicatorButton.attachEvent("onclick",function() {
                    changeIndicator(-1);
                    displayElement("s7videoviewer", true);
                    displayElement("vdCntrlContainer", true);
                    displayElement("s7zoomviewId", false);
                });
            }
        }
        else
        {
            if(indicatorButton.addEventListener) {
                indicatorButton.addEventListener("click",function(num) {
                    return function() {
                        changeIndicator(num);
                        s7zoomview.setItem(mediasetDesc.items[num]);
                        bindS7ZoomClickEvents();
                        displayElement("s7videoviewer", false);
                        displayElement("vdCntrlContainer", false);
                        displayElement("s7zoomviewId", true);
                    };
                }(i));
            }
            else {
                indicatorButton.attachEvent("onclick",function(num) {
                    return function() {
                        changeIndicator(num);
                        s7zoomview.setItem(mediasetDesc.items[num]);
                        bindS7ZoomClickEvents();
                        displayElement("s7videoviewer", false);
                        displayElement("vdCntrlContainer", false);
                        displayElement("s7zoomviewId", true);
                    };
                }(i));
            }
        }
    }

    if(hasVideo && !vidFirst) {
        var indicatorButton = new Image();
        indicatorButton.src = 'http://www.bebe.com/assets/bb/assets/images/common/video-Selector-1.png';
        indicatorButton.id = "indicator-1";
        $(indicatorButton).addClass("indicator");
        document.getElementById("indctrContainer").appendChild(indicatorButton);

        if(indicatorButton.addEventListener) {
            indicatorButton.addEventListener("click",function() {
                changeIndicator(-1);
                displayElement("s7videoviewer", true);
                displayElement("vdCntrlContainer", true);
                displayElement("s7zoomviewId", false);
            });
        }
        else {
            indicatorButton.attachEvent("onclick",function() {
                changeIndicator(-1);
                displayElement("s7videoviewer", true);
                displayElement("vdCntrlContainer", true);
                displayElement("s7zoomviewId", false);
            });
        }
    }
}

/**
 * Function to go to show the next asset in the viewer.
 **/
function nextAsset() {
	var len;
	if(videoset) {
        len = mediasetDesc.items.length;
    } else {
        len = mediasetDesc.items.length;
    }

	if((curAssetIndex + 1) == len )
	{

		if(!videoset)
		{
			changeIndicator(0);
			s7zoomview.setItem(mediasetDesc.items[curAssetIndex]);
            bindS7ZoomClickEvents();
			displayElement("s7videoviewer", false);
			displayElement("vdCntrlContainer", false);
			displayElement("s7zoomviewId", true);
		}
		else
		{
			changeIndicator(-1);
			displayElement("s7videoviewer", true);
			displayElement("vdCntrlContainer", true);
			displayElement("s7zoomviewId", false);
		}

	}
	else if((curAssetIndex + 1) < mediasetDesc.items.length )
	{
		var asset = mediasetDesc.items[curAssetIndex + 1] + "";
        changeIndicator(curAssetIndex + 1);
		s7zoomview.setAsset(asset);
        bindS7ZoomClickEvents();
		displayElement("s7videoviewer", false);
		displayElement("vdCntrlContainer", false);
		displayElement("s7zoomviewId", true);
	}
	else
	{
		changeIndicator(0);
		s7zoomview.setItem(mediasetDesc.items[curAssetIndex + 1]);
        bindS7ZoomClickEvents();
		displayElement("s7videoviewer", false);
		displayElement("vdCntrlContainer", false);
		displayElement("s7zoomviewId", true);

	}
}
/**
 * Function to go to show the previous asset in the viewer.
 **/
function prevAsset() {
	var len;
	if(videoset) {
        len = mediasetDesc.items.length;
    } else {
        len = mediasetDesc.items.length - 1;
    }

	if((curAssetIndex - 1) == -1)
	{
		if(videoset) {
            changeIndicator(curAssetIndex - 1);
            displayElement("s7videoviewer", true);
            displayElement("vdCntrlContainer", true);
            displayElement("s7zoomviewId", false);
		} else {
			changeIndicator(len);
			s7zoomview.setItem(mediasetDesc.items[len]);
            bindS7ZoomClickEvents();
			displayElement("s7videoviewer", false);
			displayElement("vdCntrlContainer", false);
			displayElement("s7zoomviewId", true);
		}
	}
	else if((curAssetIndex - 1) > -1)
	{
		s7zoomview.setItem(mediasetDesc.items[curAssetIndex - 1]);
        changeIndicator(curAssetIndex - 1);
        bindS7ZoomClickEvents();
		displayElement("s7videoviewer", false);
		displayElement("vdCntrlContainer", false);
		displayElement("s7zoomviewId", true);
	}
	else
	{
		s7zoomview.setItem(mediasetDesc.items[mediasetDesc.items.length -1]);
        changeIndicator(mediasetDesc.items.length -1);
        bindS7ZoomClickEvents();
		displayElement("s7videoviewer", false);
		displayElement("vdCntrlContainer", false);
		displayElement("s7zoomviewId", true);
	}
}

/**
 * Function to show or hide element.
 **/
function displayElementOLD(elementId, show) {
	var element = document.getElementById(elementId);
	if (element) {
		element.style.display = show ? 'inline-block' : 'none';
	}
}

/* Show or hide an element specified by its id. */
function displayElement(elementId, show) {
    var element = document.getElementById(elementId);
    if (element) {
        if (!show){
            element.style.left = '-99999px';
        } else {
            element.style.left = '0px';
        }
        if(s7sdk.browser.name == 'safari' && s7sdk.browser.version.major == 5){
            element.style.visibility = show ? 'inherit' : 'hidden';
        }
    }
}

/**
 * Function to change the indicator icon to the new index selected. Also changes
 * the previous selected index to the non-selected icon.
 **/
function changeIndicator(newIndex) {
	

	if(newIndex == -1)
	{

        s7videoplayer.seek(0);
        s7videoplayer.play();
	}

	if(curAssetIndex == -1) {
        document.getElementById("indicator"+curAssetIndex).src = 'http://www.bebe.com/assets/bb/assets/images/common/video-Selector-1.png';
    } else {
        document.getElementById("indicator"+curAssetIndex).src = 'http://www.bebe.com/assets/bb/assets/images/common/Image-Selector-1.png';
    }

	curAssetIndex = newIndex;

	if(curAssetIndex == -1) {
        document.getElementById("indicator"+curAssetIndex).src = 'http://www.bebe.com/assets/bb/assets/images/common/video-Selector-2.png';
    } else {
        document.getElementById("indicator"+curAssetIndex).src = 'http://www.bebe.com/assets/bb/assets/images/common/Image-Selector-2.png';
    }
}

/**
 * Listener function that is dispatched when the play/pause capability has changed.
 **/
function onPlayPauseButtonSelectionChange(event) {
	var cap = event.s7event.state;
	if (cap.hasCapability(s7sdk.VideoCapabilityState.PAUSE)) {
		playPauseButton.setSelected(false);
		$("#videoIcon").delay(400).fadeOut(300);
	}
	else if (cap.hasCapability(s7sdk.VideoCapabilityState.PLAY)) {
		// pause or stop
		playPauseButton.setSelected(true);
		if(s7videoplayer.getCurrentTime() != 0) {
		$("#videoIcon").delay(1).fadeIn(100);
		}
	}
}
/**
 * Video control functions.
 **/
function onVolumeSlide(event) {
	s7videoplayer.setVolume(mutableVolume.getPosition());
}
function onCurrentTimeFunc(event) {
	if (event.s7event.type == s7sdk.VideoEvent.NOTF_CURRENT_TIME) {
		videoTime.setPlayedTime(s7videoplayer.getCurrentTime());
		videoScrubber.setPlayedTime(s7videoplayer.getCurrentTime());
	}
	else if (event.s7event.type == s7sdk.VideoEvent.NOTF_DURATION) {
		videoTime.setDuration(s7videoplayer.getDuration());
		if (s7videoplayer.getDuration() > 0)
			videoScrubber.setDuration(s7videoplayer.getDuration());
	}
	else if (event.s7event.type == s7sdk.VideoEvent.NOTF_LOAD_PROGRESS) {
		if (s7videoplayer.getDuration() > 0)
			videoScrubber.setLoadedPosition(s7videoplayer.getLoadedPosition());
	}
}
function onScrubberSlide(event) {
	if (event.s7event.type == s7sdk.SliderEvent.NOTF_SLIDER_UP) {
		s7videoplayer.seek(videoScrubber.getPosition() * s7videoplayer.getDuration());
	}
}
function resizeViewer(event) {
	if(container.isFullScreen()) {
        $(".s7viewer").width(event.s7event.w);
		$(".s7viewer").height(event.s7event.h);
		container.resize(event.s7event.w, event.s7event.h );
		s7videoplayer.resize(event.s7event.w, event.s7event.h );
		$(".s7controlbar").width(event.s7event.w);
		//$(".s7videoscrubber").width(event.s7event.w / 2);
		$(".s7videoscrubber .s7track").width(event.s7event.w / 2);
		$(".s7controlbar").css("bottom", "100%");
	}
}
function fullScreenEnter(event) {
	fullScreenButton.setSelected(container.isFullScreen());
	if(container.isFullScreen()) {
		$(".s7viewer").width(event.s7event.w);
		$(".s7viewer").height(event.s7event.h);
		container.resize(event.s7event.w, event.s7event.h);
		s7videoplayer.resize(event.s7event.w, event.s7event.h );
		$(".s7controlbar").width(event.s7event.w);
		$(".s7videoscrubber .s7track").width(event.s7event.w / 1.28);
	}
	else
	{
		$(".s7viewer").width(585);
		$(".s7viewer").height( 835);
		container.resize(585, 835);
		s7videoplayer.resize(585, 835);
		$(".s7controlbar").width(585);
		$(".s7videoscrubber .s7track").width(430);
	}
}

/**
 * Function to setup video for mobile devices.
 **/
function setupVideo() {
    _removeChildNodes(document.getElementById("s7videoviewer"));
	s7videoplayer = new s7sdk.video.VideoPlayer("s7container",params,"s7videoviewer");

	//create iconeffect
	var vidicon = document.createElement("div");
	vidicon.setAttribute("id", "videoIcon");
	vidicon.setAttribute("class", "s7iconeffect");
	vidicon.setAttribute("media-type", "standard");
	vidicon.setAttribute("style", "pointer-events: none; position: absolute; left: 232px; top: 357px; opacity: 0.75;");
	var video = document.getElementById("s7videoviewer");
	video.appendChild(vidicon);

	s7videoplayer.addEventListener(s7sdk.event.VideoEvent.NOTF_VIDEO_END, function(){
			if(s7videoplayer.ended()) {
				s7videoplayer.seek(0);
				s7videoplayer.play();
			}
		}, false);

	s7videoplayer.addEventListener(s7sdk.event.CapabilityStateEvent.NOTF_VIDEO_CAPABILITY_STATE, onPlayPauseButtonSelectionChange, false);
	s7videoplayer.addEventListener(s7sdk.event.VideoEvent.NOTF_DURATION, onCurrentTimeFunc, false);
	s7videoplayer.addEventListener(s7sdk.event.VideoEvent.NOTF_CURRENT_TIME, onCurrentTimeFunc, false);
	s7videoplayer.addEventListener(s7sdk.event.VideoEvent.NOTF_LOAD_PROGRESS, onCurrentTimeFunc, false);

	controls.attachView(s7videoplayer);
	s7videoplayer.setAsset(videoset);
}

