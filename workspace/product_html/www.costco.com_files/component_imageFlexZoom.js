RICHFX.prototype.component_imageFlexZoom = function(componentName, elem, metrics, containerDiv, width, height, idSuffix, remoteMediaPath, clearFlashInterval, clearFlashInitialInterval, preLoadEventType, preLoadValue) {

  var properties = RICHFX.properties(elem);
  var D = properties['component_' + componentName] = new Object();
  
  //RICHFX.consoleDebug('[imageFlexZoom] - Calling registerViewer - compName: ' + componentName + ', src: ' + elem.src);
  RICHFX.registerViewer(componentName, arguments, elem.src, 'RICHFXimageFlexZoom');
  
  if( typeof(containerDiv) == 'object') {
	var baseObject = containerDiv;
	
	containerDiv = baseObject.containerDiv;
	width = baseObject.width;
	height = baseObject.height;
	idSuffix = baseObject.idSuffix;
	clearFlashInterval = baseObject.clearFlashInterval;
	clearFlashInitialInterval = baseObject.clearFlashInitialInterval;
	preLoadEventType = baseObject.preLoadEventType;
	preLoadValue = baseObject.preLoadValue;
	remoteMediaPath = baseObject.remoteMediaPath;
  }
  
  D.flashHolder = D.flash = D.infoXML = undefined;
  D.clearFlashTimer = 0;
  D.flashEventsRegistered = false;
  D.mediaID = RICHFX.DecodeMedia( elem );
  if ( RICHFX_CONFIG.pageSuffix && RICHFX_CONFIG.zoomPageSuffix && RICHFX_CONFIG.overlaySuffix ) {
		D.mediaID = D.mediaID.replace(RICHFX_CONFIG.pageSuffix, RICHFX_CONFIG.zoomPageSuffix);
		D.mediaID = D.mediaID.replace(RICHFX_CONFIG.overlaySuffix, RICHFX_CONFIG.zoomOverlaySuffix);
  } 
  
  D.properties = properties;
  D.ZINDEX_BASE = RICHFX.allocateZIndex(elem,20000);
  D.originalElement = D.elem = elem;
  
  //RICHFX.consoleDebug('[imageFlexZoom] - mediaID: ' + D.mediaID + ', zIndex: ' + D.ZINDEX_BASE + ', ' + elem.src);
  
  D.containerDiv = RICHFX.getConfig(componentName, 'containerDiv', containerDiv || 'RICHFXCompoundViewerMedia');
  D.width = RICHFX.getConfig(componentName, 'width', width || 400);
  D.height = RICHFX.getConfig(componentName, 'height', height || 400);
  
  D.idSuffix = RICHFX.getConfig(componentName, 'idSuffix', idSuffix || '');
  
  D.clearFlashInterval = parseFloat( RICHFX.getConfig(componentName, 'clearFlashInterval', clearFlashInterval || 20000) );
  D.clearFlashInitialInterval = parseFloat( RICHFX.getConfig(componentName, 'clearFlashInitialInterval', clearFlashInitialInterval || D.clearFlashInterval) );
  
  //preLoadEventType = RICHFX.getConfig(componentName, 'preLoadEventType', preLoadEventType || undefined);
  //D.preLoadEventType = RICHFX.isValidPreLoadEventType(preLoadEventType) ? preLoadEventType : undefined;
  //D.preLoadValue = RICHFX.getConfig(componentName, 'preLoadValue', preLoadValue || 0);
  
  // Handle modal issues in IE
  D.preloadEventType = "mousenear";
  D.preLoadValue = "20";
  
  D.remoteMediaPath = RICHFX.getConfig(componentName, 'remoteMediaPath', remoteMediaPath || '');
  
  //D.loadingAnimation = RICHFX.LoadingAnimation(elem.parentNode, D.idSuffix);
  
  D.initCompleted = false;

  // XML load handler
  D.loadXML_handler = function ( xmlDOM ) { with ( D ) {
  
	//RICHFX.consoleDebug('[imageFlexZoom] - Entered loadXML_handler: ' + originalElement.id);
	
	//leftPos = $('#' + originalElement.id).position().left;
	//topPos = $('#' + originalElement.id).position().top;
	
	leftPos = 16;
	topPos = 8;
	
	//RICHFX.consoleDebug('[imageFlexZoom] - creating container div: ' + leftPos + '|' + topPos + ' [' + containerDiv + ']');

	var flexZoomDiv = 'rfximageZoom' + D.idSuffix;
	$('#' + D.containerDiv).append("<div id='" + flexZoomDiv + "'></div>");
	
	RICHFX.consoleDebug('[imageFlexZoom] - Adding flex viewer: ' + D.mediaID);
	
	var flashvars = {};
    flashvars.rfx_configuration = 'http://costco6.richfx.com.edgesuite.net/project/viewers/zoom/configs/PanZoomViewerConfig.xml';
    flashvars.rfx_media_source = RICHFX.imageMediaURL + D.mediaID + '/zoom.info';
    flashvars.rfx_style_path = 'http://costco6.richfx.com.edgesuite.net/project/viewers/zoom/Style.swf';

    var params = {};
    params.allowscriptaccess = "always";
    params.name = 'imageZoom' + D.idSuffix;
    params.quality = "high";
    params.id = 'rfxFlexZoom' + D.idSuffix;
    params.wmode = "transparent";
    params.bgcolor = "#ffffff";
	params.hasPriority = "true";
	
	//RICHFX.consoleDebug('[imageFlexZoom] - swfObject EmbedSwf Start');
	//costco6.richfx.com.edgesuite.net
    swfobject.embedSWF('http://costco6.richfx.com.edgesuite.net/project/viewers/zoom/BackCompatPanZoomViewer.swf', 
						flexZoomDiv, D.width,  D.height, "9.0.0", "expressInstall.swf", flashvars, params);
						
	//RICHFX.consoleDebug('[imageFlexZoom] - swfObject EmbedSwf End');
		
	// Add Change Handler
	/*
	$('#modal-zoom-img').bind('load', $.proxy(function(event, data){
		RICHFX.consoleDebug('[imageFlexZoom] - caught change event');
		
		document.getElementById('rfximageZoom').changeSource(data.src.substring(0, data.src.lastIndexOf("/"))+'/zoom.info');
		//RICHFX.imageMediaURL + imageMediaID + '/zoom.info')
	    //this.changeSource(data);
    }, this));
	*/
	//
		
	/*
	$('#' + flexZoomDiv).flash(
		{
			// test_flashvars.swf is the flash document
			// swf: this.sSwf,
			swf: 'http://gregpower.preview.richfx.com/image/media/_samples_/V7/flexZoom/BackCompatPanZoomViewer.swf', 
			allowscriptaccess: "always",
			name: 'imageZoom' + D.idSuffix,
			quality: "high",
			id: 'rfxFlexZoom' + D.idSuffix,
			wmode: "transparent",
			bgcolor: "#ffffff",
			height: D.height, 
			width: D.width,
			// these arguments will be passed into the flash document
			flashvars: {
				rfx_configuration: 'http://gregpower.preview.richfx.com/image/media/_samples_/V7/flexZoom/configs/PanZoomViewerConfig.xml',  
				rfx_media_source: this.imageMediaURL + D.mediaID + '/zoom.info',  
				rfx_style_path: 'http://gregpower.preview.richfx.com/image/media/_samples_/V7/flexZoom/Style.swf'
				//rfx_configuration: this.sRfxConfiguration,
				//rfx_media_source: this.sRfxMediaPath,
				//rfx_style_path: this.sRfxStylePath
			}
		}
	);
	*/
	
	$('#' + flexZoomDiv).css('position', 'absolute');
	$('#' + flexZoomDiv).css('visibility', 'visible');
	
	$('#' + flexZoomDiv).css('left', leftPos+'px');
	$('#' + flexZoomDiv).css('top', topPos+'px');
	
	$('#' + flexZoomDiv).css('zIndex', 60000);
	
	$('#' + originalElement.id).css('visibility', 'hidden');
	
	//RICHFX.consoleDebug('[imageFlexZoom] - leaving loadXML');
   
  } }
  
  // Method gets called from Flex viewer
  this.scriptLoaded = function() {
	//RICHFX.api('RICHFXCompoundViewerMedia', 'imageColorChange').hideBaseElement();
	RICHFX_CONFIG.scriptLoaded = true;
	
	//RICHFX.consoleDebug('imageFlexFoom] - RICHFX.scriptLoaded has been executed');
	
	// Stop the loading animation
	//RICHFX.LoadingAnimation.off(D.idSuffix);
  }

  // Handler is getting called, when the preLoadEvent occurs, or direct if no event was set
  D.startMediaLoading = function(){
  	// Start the loading animation
	//RICHFX.LoadingAnimation.on(D.idSuffix);
	
  	//if (D.preLoadEventType != undefined){
		this.removeEventListener(D.elem, "mousenear", D.startMediaLoading, this);
    //}
  
	//RICHFX.consoleDebug('[imageFlexZoom] - calling loadXML: ' + this.imageMediaURL + 'BESTBUYSKU8__ALPHA_z-standard/zoom.info.js');
	
	D.elem = document.getElementById(D.elem.id);
	D.mediaID = RICHFX.DecodeMedia( D.elem );
	
	RICHFX.consoleDebug('[imageFlexZoom] - calling loadXML: ' + RICHFX.imageMediaURL + D.mediaID + '/zoom.info.js');
	
    // load media XML
	RICHFX.loadXML( RICHFX.imageMediaURL + D.mediaID + '/zoom.info.js', D.mediaID, D.loadXML_handler, this );
  }

  // Add swfObject
  //$LAB.script( "http://gregpower.preview.richfx.com/image/viewers/jsdeps/jquery.swfobject.1-0-9.js" );
  
  //D.startMediaLoading.apply(this); 
  /*
  if (D.preLoadEventType == undefined){
	RICHFX.consoleDebug('[imageFlexZoom] - NO preloadEvent');
	D.startMediaLoading.apply(this);
  } else {
	RICHFX.consoleDebug('[imageFlexZoom] - Adding preloadEvent: ' + D.preLoadEventType);
	this.addEventListener(D.elem, D.preLoadEventType, D.startMediaLoading, this, D.preLoadValue);
  }
  */
  // Force an eventListener
  this.addEventListener(D.elem, "mousenear", D.startMediaLoading, this, "100");
  
	//this.loadXML( this.imageMediaURL + D.mediaID + '/zoom.info.js', D.mediaID, D.loadXML_handler, this );	  
}
RICHFX.prototype.component_imageFlexZoom.require = [ 'ClickLayer', 'DecodeMedia'];
