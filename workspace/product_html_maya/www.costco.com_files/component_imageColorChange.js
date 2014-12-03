RICHFX.prototype.component_imageColorChange = function(componentName, elem, metrics, swatchElementID, categoriesElementID, viewsElementID, availableSwatches, changeOnHover, custControlForColorElementID, custControlForCategoryElementID, custControlForViewElementID, useSingleAltView, slideDirection, slideLeftID, slideRightID, slideImagesID, slideType, slideSpeed, slideThumbnailsNum, tooltipActive, tooltipAlignPixelsLeft, tooltipAlignPixelsTop, preLoadEventType, preLoadValue, swatchLabelID, swatchFunctionName, defaultToPrimaryView, minViewsReq, minSwatchesReq, viewPrefix, viewSuffix, sSlideLeftID, sSlideRightID, sSlideImagesID, sSlideType, sSlideSpeed, sSlideThumbnailsNum) {
	
  var properties = this.properties(elem);
  var D = properties['component_' + componentName] = new Object();
  
  RICHFX.registerViewer(componentName, arguments, elem.src, 'RICHFXColorChange');
  D.regViewerSrc = elem.src;  
  
  // handle object param if necessary
  if( typeof(swatchElementID) == 'object') {
	var baseObject = swatchElementID;
	
	swatchElementID = baseObject.swatchElementID;
	categoriesElementID = baseObject.categoriesElementID; 
	viewsElementID = baseObject.viewsElementID; 
	availableSwatches = baseObject.availableSwatches;
	changeOnHover = baseObject.changeOnHover;
	custControlForColorElementID = baseObject.custControlForColorElementID;
	custControlForCategoryElementID = baseObject.custControlForCategoryElementID;
	custControlForViewElementID = baseObject.custControlForViewElementID;
	useSingleAltView = baseObject.useSingleAltView;
	slideDirection = baseObject.slideDirection;
	slideLeftID = baseObject.slideLeftID;
	slideRightID = baseObject.slideRightID;
	slideImagesID = baseObject.slideImagesID;
	slideType = baseObject.slideType;
	slideSpeed = baseObject.slideSpeed;
	slideThumbnailsNum = baseObject.slideThumbnailsNum;
	tooltipActive = baseObject.tooltipActive;
	tooltipAlignPixelsLeft = baseObject.tooltipAlignPixelsLeft;
	tooltipAlignPixelsTop = baseObject.tooltipAlignPixelsTop;
	preLoadEventType = baseObject.preLoadEventType;
	preLoadValue = baseObject.preLoadValue;
	swatchLabelID = baseObject.swatchLabelID;
	swatchFunctionName = baseObject.swatchFunctionName;
	defaultToPrimaryView = baseObject.defaultToPrimaryView;
	minViewsReq = baseObject.minViewsReq;
	minSwatchesReq = baseObject.minSwatchesReq;
	viewPrefix = baseObject.viewPrefix;
	viewSuffix = baseObject.viewSuffix;
	sSlideLeftID = baseObject.sSlideLeftID;
	sSlideRightID = baseObject.sSlideRightID;
	sSlideImagesID = baseObject.sSlideImagesID;
	sSlideType = baseObject.sSlideType;
	sSlideSpeed = baseObject.sSlideSpeed;
	sSlideThumbnailsNum = baseObject.sSlideThumbnailsNum;
  }
  
  D.swatchElementID = this.getConfig(componentName, 'swatchElementID', swatchElementID);
  D.categoriesElementID = this.getConfig(componentName, 'categoriesElementID', categoriesElementID);
  D.viewsElementID = this.getConfig(componentName, 'viewsElementID', viewsElementID);
  D.availableSwatches = this.getConfig(componentName, 'availableSwatches', availableSwatches);
  D.changeOnHover = this.getConfig(componentName, 'changeOnHover', changeOnHover);
  D.swatchLabelID = this.getConfig(componentName, 'swatchLabelID', swatchLabelID);
  D.swatchFunctionName = this.getConfig(componentName, 'swatchFunctionName', swatchFunctionName);

  D.tooltipActive = this.getConfig(componentName, 'tooltipActive', tooltipActive || false);
  D.tooltipAlignPixelsLeft = this.getConfig(componentName, 'tooltipAlignPixelsLeft', tooltipAlignPixelsLeft || 0);
  D.tooltipAlignPixelsTop = this.getConfig(componentName, 'tooltipAlignPixelsTop', tooltipAlignPixelsTop || 0);

  preLoadEventType = this.getConfig(componentName, 'preLoadEventType', preLoadEventType || undefined);
  D.preLoadEventType = this.isValidPreLoadEventType(preLoadEventType) ? preLoadEventType : undefined;
  D.preLoadValue = this.getConfig(componentName, 'preLoadValue', preLoadValue || 0);
  
  D.useSingleAltView = this.getConfig(componentName, 'useSingleAltView', useSingleAltView || 0 );
  D.singleAltViewSwatch = undefined;
  D.singleAltViewSwatchName = undefined;
  D.singleAltViewView = undefined;
  D.singleAltViewCat = undefined;
  D.usingSingleAltViewView = 0;
  
  // handle primaryView when necessary
  D.defaultToPrimaryView = this.getConfig(componentName, 'defaultToPrimaryView', defaultToPrimaryView || 0 );
  D.primaryView = undefined;
  
  D.usingDefaultView = 0;
  D.DViewID = undefined;
  D.DCategoryID = undefined;
  D.DSwatchID = undefined;
  
  D.currViewID = undefined;
  D.currCategoryID = undefined;
  D.currSwatchID = undefined;
  
  D.maxViewName = undefined;
  D.maxSwatchName = undefined;
  
  D.loadImageInfoCount = 0;
  D.loadImageSwatchCount = 0;
  
  D.activeTracking = this.getConfig('tracking', 'active', false);
  
  D.custControlForColorElementID = this.getConfig(componentName, 'custControlForColorElementID', custControlForColorElementID || undefined);
  D.custControlForCategoryElementID = this.getConfig(componentName, 'custControlForCategoryElementID', custControlForCategoryElementID || undefined);
  D.custControlForViewElementID = this.getConfig(componentName, 'custControlForViewElementID', custControlForViewElementID || undefined);
  
  D.custControlColorDefault = '';

  D.initCompleted = false;
  D.sliderTimeoutCleared = false;

  D.mediaID = this.DecodeMedia( elem );
  
  // Save Image slider info where necessary
  D.slideDirection = this.getConfig(componentName, 'slideDirection', slideDirection || 'horizontal');
  
  D.slideLeftID = this.getConfig(componentName, 'slideLeftID', slideLeftID || undefined);
  D.slideRightID = this.getConfig(componentName, 'slideRightID', slideRightID || undefined);
  D.slideImagesID = this.getConfig(componentName, 'slideImagesID', slideImagesID || undefined);
  D.slideType = this.getConfig(componentName, 'slideType', slideType || undefined);
  D.slideSpeed = this.getConfig(componentName, 'slideSpeed', slideSpeed || 1);
  D.slideThumbnailsNum = this.getConfig(componentName, 'slideThumbnailsNum', slideThumbnailsNum || 3);
  
  D.sSlideLeftID = this.getConfig(componentName, 'sSlideLeftID', sSlideLeftID || undefined);
  D.sSlideRightID = this.getConfig(componentName, 'sSlideRightID', sSlideRightID || undefined);
  D.sSlideImagesID = this.getConfig(componentName, 'sSlideImagesID', sSlideImagesID || undefined);
  D.sSlideType = this.getConfig(componentName, 'sSlideType', sSlideType || undefined);
  D.sSlideSpeed = this.getConfig(componentName, 'sSlideSpeed', sSlideSpeed || 1);
  D.sSlideThumbnailsNum = this.getConfig(componentName, 'sSlideThumbnailsNum', sSlideThumbnailsNum || 3);
  
  D.minViewsReq = this.getConfig(componentName, 'minViewsReq', minViewsReq || 0);
  D.minSwatchesReq = this.getConfig(componentName, 'minSwatchesReq', minSwatchesReq || 0);
  
  D.viewPrefix = this.getConfig(componentName, 'viewPrefix', viewPrefix || '');
  D.viewSuffix = this.getConfig(componentName, 'viewSuffix', viewSuffix || '');
  
  D.imageArray = D.imageMediaArray = D.imageProps = D.srcDim = D.swatchData = D.viewLevel = D.mediaLevels = D.srcAspectRatio = D.imageAspectRatio = D.displayedImage = undefined;
  D.currMediaSrc = '';
  D.mediaLevels = 0; D.imageItemId = '';
  D.originalElement = D.elem = elem;
 

  D.ZINDEX_BASE = this.allocateZIndex(elem,100,true);
  D.availableSwatches = D.availableSwatches ? D.availableSwatches.split('|') : undefined;
  
  // 'sticky' now needs to be an option.
  //D.changeOnHover = parseFloat( D.changeOnHover );
  
  // this function is getting called after viewer was drawn
  D.initCompleted_handler = function(viewID, categoryID, swatchID){
    D.initCompleted = true;
	
    if (D.custControlForColorElementID != undefined){
        var custControl = document.getElementById( D.custControlForColorElementID );
        if (custControl != undefined ){
            RICHFX.addEventListener(custControl, 'change', D.changeColorByCustControl, RICHFX, custControl, D.elem);
            RICHFX.addEventListener(D.elem, 'elementchange', D.updateCustomColorControl, RICHFX, custControl, D.elem);
			
			D.custControlColorDefault = D.internalSwatchIDToSwatchName(viewID, categoryID, swatchID);
            custControl.value = D.custControlColorDefault;
        }
    }

    if (D.custControlForViewElementID != undefined){
        var custControl = document.getElementById( D.custControlForViewElementID );
        if (custControl != undefined ){
            RICHFX.addEventListener(custControl, 'change', D.changeViewByCustControl, RICHFX, custControl, D.elem);
            RICHFX.addEventListener(D.elem, 'elementchange', D.updateCustomViewControl, RICHFX, custControl, D.elem);
            custControl.value = viewID;
        }
    }

    if (D.custControlForCategoryElementID != undefined){
        var custControl = document.getElementById( D.custControlForCategoryElementID);
        if (custControl != undefined ){
            RICHFX.addEventListener(custControl, 'change', D.changeCategoryByCustControl, RICHFX, custControl, D.elem);
            RICHFX.addEventListener(D.elem, 'elementchange', D.updateCustomCategoryControl, RICHFX, custControl, D.elem);
            custControl.value = categoryID;
        }
    }
	
	if (D.useSingleAltView == 1) {
	
		D.singleAltViewSwatch = D.maxSwatchName;
		D.singleAltViewView = D.maxViewName; // singleAltViewView now set to the maxViewName
		D.singleAltViewCat = categoryID;
	}
			
	// run ImageSlider constructor, if necessary
	if (D.slideLeftID != undefined) {
	
		// Setup ImageSlider once the images are loaded
		D.imageSliderTimer = RICHFX.setTimeout( imageViewSliderSetup , 20, this );
	}
	
	if (D.sSlideLeftID != undefined) {
	
		// Setup ImageSlider once the images are loaded
		D.imageSSliderTimer = RICHFX.setTimeout( imageSwatchSliderSetup , 20, this );
	}
	
	// Build tooltip div
    if ( D.tooltipActive == 'both' || D.tooltipActive == 'view' || D.tooltipActive == 'swatch' ) {
	   D.buildTooltip.apply(this);
    }
  }
  
	function imageViewSliderSetup() {
	
		with (D) {
		
			var imageGalleryObj = document.getElementById(D.slideImagesID);
			var slideshowImages = imageGalleryObj.getElementsByTagName('img');		
			var imageCount = slideshowImages.length;
			
			// Check that image load is complete
			for ( var i = 0; i < imageCount; i++ ) {
		
				if ( !slideshowImages[i].complete ) {
					D.imageSliderTimer = RICHFX.setTimeout( imageViewSliderSetup, 20, this );
					return;
				}
			}
			//
			
			D.imageSlider = this.ImageSlider(elem, D.slideDirection, D.slideLeftID, D.slideRightID, D.slideImagesID, D.viewsElementID, D.slideSpeed, D.slideThumbnailsNum, 'slideEnd');
			
			// Retrieve arrow divs
			arrowLeftDiv = document.getElementById(D.slideLeftID);
			arrowRightDiv = document.getElementById(D.slideRightID);
			
			if ( imageCount > D.slideThumbnailsNum ) {
				
				arrowLeftDiv.className = 'RFXActive';
				arrowRightDiv.className = 'RFXActive';
			/*
				// Add Listeners  
				if ( D.slideType != undefined && D.slideType == 'click' ) {
					this.addEventListener( arrowLeftDiv,  'click', this.ImageSlider.arrow_left_click_handler,   this );
					this.addEventListener( arrowRightDiv, 'click', this.ImageSlider.arrow_right_click_handler,  this );
				} else {
					//this.ImageSlider.gallerySlide();
					
					this.addEventListener( arrowLeftDiv,  'mousemove', this.ImageSlider.arrow_left_on_handler,   this );
					this.addEventListener( arrowRightDiv, 'mousemove', this.ImageSlider.arrow_right_on_handler,  this );
					this.addEventListener( arrowLeftDiv,  'mouseout',  this.ImageSlider.arrow_left_off_handler,  this );
					this.addEventListener( arrowRightDiv, 'mouseout',  this.ImageSlider.arrow_right_off_handler, this );
				}
			*/
				// Add Listeners  
				if ( D.slideType != undefined && D.slideType == 'click' ) {
					this.addEventListener( arrowLeftDiv,  'click', this.ImageSlider.arrow_top_click_handler,   this );
					this.addEventListener( arrowRightDiv, 'click', this.ImageSlider.arrow_bottom_click_handler,  this );
				} else {
					//this.ImageSlider.gallerySlide();
					
					this.addEventListener( arrowLeftDiv,  'mousemove', this.ImageSlider.arrow_top_on_handler,   this );
					this.addEventListener( arrowRightDiv, 'mousemove', this.ImageSlider.arrow_bottom_on_handler,  this );
					this.addEventListener( arrowLeftDiv,  'mouseout',  this.ImageSlider.arrow_top_off_handler,  this );
					this.addEventListener( arrowRightDiv, 'mouseout',  this.ImageSlider.arrow_bottom_off_handler, this );
				}
			} else {
				arrowLeftDiv.className = 'RFXInactive';
				arrowRightDiv.className = 'RFXInactive';
			}
		}			
	}
	
	function imageSwatchSliderSetup() {
	
		with (D) {
		
			var imageGalleryObj = document.getElementById(D.sSlideImagesID);
			var slideshowImages = imageGalleryObj.getElementsByTagName('img');		
			var imageCount = slideshowImages.length;
			
			// Check that image load is complete
			for ( var i = 0; i < imageCount; i++ ) {
		
				if ( !slideshowImages[i].complete ) {
					D.imageSSliderTimer = RICHFX.setTimeout( imageSwatchSliderSetup, 20, this );
					return;
				}
			}
			//
			
			D.imageSwatchSlider = this.ImageSlider(elem, D.sSlideLeftID, D.sSlideRightID, D.sSlideImagesID, D.swatchElementID, D.sSlideSpeed, D.sSlideThumbnailsNum, 'slideSwatchEnd');
			
			// Retrieve arrow divs
			arrowLeftDiv = document.getElementById(D.sSlideLeftID);
			arrowRightDiv = document.getElementById(D.sSlideRightID);
			
			if ( imageCount > D.slideThumbnailsNum ) {
				
				arrowLeftDiv.className = 'RFXActive';
				arrowRightDiv.className = 'RFXActive';
			
				// Add Listeners  
				if ( D.sSlideType != undefined && D.sSlideType == 'click' ) {
					this.addEventListener( arrowLeftDiv,  'click', this.ImageSlider.arrow_left_click_handler,   this );
					this.addEventListener( arrowRightDiv, 'click', this.ImageSlider.arrow_right_click_handler,  this );
				} else {
					//this.ImageSlider.gallerySlide();
					
					this.addEventListener( arrowLeftDiv,  'mousemove', this.ImageSlider.arrow_left_on_handler,   this );
					this.addEventListener( arrowRightDiv, 'mousemove', this.ImageSlider.arrow_right_on_handler,  this );
					this.addEventListener( arrowLeftDiv,  'mouseout',  this.ImageSlider.arrow_left_off_handler,  this );
					this.addEventListener( arrowRightDiv, 'mouseout',  this.ImageSlider.arrow_right_off_handler, this );
				}
			} else {
				arrowLeftDiv.className = 'RFXInactive';
				arrowRightDiv.className = 'RFXInactive';
			}
		}			
	}
	
	function buildSwatchList() {
		D.swatchList = D.availableSwatches && D.availableSwatches.length ? {} : undefined; 
		
		if ( D.swatchList != undefined ) {
			for ( var s in D.availableSwatches ) {
			
				var validSwatch = false;
			
				// ensure it is a legit swatch	
				for (var tempViewName in D.swatchData ) {
			  
					var tempViewData = D.swatchData[tempViewName];
		
					// var reset
					tempCatName = '';
			
					for (var tempCatName in tempViewData) {
					
						for ( var tempSwatchID in tempViewData[tempCatName] ) {
							var tempSwatch = tempViewData[tempCatName][tempSwatchID];
							
							if ( tempSwatch.swatch == D.availableSwatches[s] ) {
								
								validSwatch = true;
								break;
							}
						}
					}
				}
			
				// add 's' to swatchList 
				if ( validSwatch == true ) {
					D.swatchList[ D.availableSwatches[s] ] = s;
				}
			}
		} else {
			D.swatchList = {};
			
			// Make swatchlist the full set
			for (var tempViewName in D.swatchData ) {
		  
				var tempViewData = D.swatchData[tempViewName];
	
				// var reset
				tempCatName = '';
		
				for (var tempCatName in tempViewData) {
				
					for ( var tempSwatchID in tempViewData[tempCatName] ) {
						var tempSwatch = tempViewData[tempCatName][tempSwatchID];
						
						D.swatchList[ tempSwatch.swatch ] = tempSwatch.swatch;
					}
				}
			}			
		}
	}
	
	function sortNumber(a1,b1)
	{
		var returnVal = 0;
		var a = ('' + a1).toLowerCase();
		var b = ('' + b1).toLowerCase();
		
		//RICHFX.consoleDebug('[imageColorChange] - sortNumber - a: ' + a + ', b: ' + b);
		
		if ( a > b ) returnVal = 1;
		if ( a < b ) returnVal = -1;
		
		return returnVal;
	}
	
	function sortSwatchDataViews() {
		var sortArray = new Array();
		var sortedData = new Array();
		
		for ( var v in D.swatchData ) {
			sortArray[v] = v;
			
			//RICHFX.consoleDebug('[imageColorChange] - (before) sortSwatchDataViews: ' + v);
		}
		
		//sortArray.sort(function(a,b){return a - b});
		sortArray.sort(sortNumber);
		
		for ( var v in sortArray ) {
			//RICHFX.consoleDebug('[imageColorChange] - (after) sortSwatchDataViews: ' + v + '|' + sortArray[v]);
			
			sortedData[sortArray[v]] = D.swatchData[sortArray[v]];
		}
		
		D.swatchData = sortedData;
	}
  
  // maps swatch name to internal id
  D.swatchNameToInternalSwatchID = function( viewID, categoryID, swatchName ){
	
	var currViewID = viewID;
	
	if ( D.swatchData[viewID] == undefined && useSingleAltView == 1 ) {
		currViewID = D.singleAltViewView;
	}
		
    for(var swatchID in D.swatchData[currViewID][categoryID]){
		var tmpSwatchName = D.swatchData[currViewID][categoryID][swatchID].swatch;
        if ( tmpSwatchName == swatchName){
            return swatchID;
        } 
    }
	
    // nothing found? just return the name
    return swatchName;
  }
  
  // maps internal id back to swatch name
  D.internalSwatchIDToSwatchName = function( viewID, categoryID, swatchID ){
	if ( D.swatchData[viewID] == undefined && useSingleAltView == 1 ) {
		var tmpSwatchName = D.swatchData[D.singleAltViewView][categoryID][swatchID].swatch;
	} else {
		var tmpSwatchName = D.swatchData[viewID][categoryID][swatchID].swatch;
	}
	
    return tmpSwatchName;
  }
  
  // viewer -> custControl update for color
  D.updateCustomColorControl = function(event, custControl){

    var elemData = RICHFX.getElementData(D.elem);
    var viewID = elemData.ColorChange_selection[0];
	//var viewID = D.currViewID;
  	var categoryID = elemData.ColorChange_selection[1];
    var swatchID = elemData.ColorChange_selection[2];
	
	//custControl.value =  D.internalSwatchIDToSwatchName(viewID, categoryID, swatchID);
	
	var ddValue = D.internalSwatchIDToSwatchName(viewID, categoryID, swatchID);
	
	custControl.value = '';
	
	for (x = 0; x < custControl.length; x++){
		if (custControl.options[x].value == ddValue){
			custControl.value = ddValue;
			break;
		}
	} 
  }
  
  // custControl -> viewer update for color
  D.changeColorByCustControl = function(e, custControl, dviewID, dcategoryID){
	
	// Check if change is blocked by 'swatchlist'
	if ( D.swatchList == undefined || D.swatchList[ custControl.value ] ) {
  
		var elemData = RICHFX.getElementData(D.elem);
		
		if ( elemData.ColorChange_selection ){
			var viewID = elemData.ColorChange_selection[0];
			var categoryID = elemData.ColorChange_selection[1];
		} else {
			var viewID = dviewID;
			var categoryID = dcategoryID;
		}
		
		if ( custControl.value == '' ) { 
			var newColor = D.swatchNameToInternalSwatchID(viewID, categoryID, D.custControlColorDefault);
		} else {
			var newColor = D.swatchNameToInternalSwatchID(viewID, categoryID, custControl.value);
		}
	
		D.changeColor.apply( this, [ null, viewID, categoryID, newColor] );
	}
  }
  
  // viewer -> custControl update for view
  D.updateCustomViewControl = function(e, custControl){
    custControl.value =  RICHFX.getElementData(D.elem).ColorChange_selection[0];
  }
  
  // custControl -> viewer update for view
  D.changeViewByCustControl = function(e, custControl, dcategoryID, dswatchID){
    var newView = custControl.value;
    var elemData = RICHFX.getElementData(D.elem);
    if ( elemData.ColorChange_selection ){
      	var categoryID = elemData.ColorChange_selection[1];
        var swatchID = elemData.ColorChange_selection[2];
    } else {
      	var categoryID = dcategoryID;
        var swatchID = dswatchID;
    }
  	
  	D.changeColor.apply( this, [ null, newView, categoryID, swatchID] );
  }
  
  // viewer -> custControl update for category
  D.updateCustomCategoryControl = function(e, custControl){
    custControl.value =  RICHFX.getElementData(D.elem).ColorChange_selection[1];
  }

  // custControl -> viewer update for category
  D.changeCategoryByCustControl = function(e, custControl, dviewID, dswatchID){
    var newCategory = custControl.value;
    var elemData = RICHFX.getElementData(D.elem);
    if ( elemData.ColorChange_selection ){
        var viewID = elemData.ColorChange_selection[0];
        var swatchID = elemData.ColorChange_selection[2];
    } else {
        var viewID = dviewID;
        var swatchID = dswatchID;
    }
    D.changeColor.apply( this, [ null, viewID, newCategory, swatchID] );
  }
  
    D.handleHover = function(e, eventType, value) {

	var elemData = RICHFX.getElementData(D.originalElement);
	
	D.origElemData = elemData;
	
    if (eventType == 'changeColor') {
        var viewID = elemData.ColorChange_selection[0];
        var categoryID = elemData.ColorChange_selection[1];
	    var swatchID = D.swatchNameToInternalSwatchID(viewID, categoryID, value);
		elemData.ColorChange_selection[2] = swatchID;
    } else if (eventType == 'changeView'){
        var viewID = value;
		elemData.ColorChange_selection[0] = viewID;
        var categoryID = elemData.ColorChange_selection[1];
  	    var swatchID = elemData.ColorChange_selection[2];
    } else if (eventType == 'changeCategory'){
        var viewID = elemData.ColorChange_selection[0];
        var categoryID = value;
  	    var swatchID = 0;
		elemData.ColorChange_selection[1] = categoryID;
  	    elemData.ColorChange_selection[2] = swatchID;
    }
	
	//RICHFX.consoleDebug('[imageColorChange] - handleHover: ' + viewID + '|' + swatchID + '|' + e.type + '|' + D.currViewID + '|' + D.currSwatchID);
	
    D.hover_handler( e, D.originalElement, eventType, D.currViewID, D.currCategoryID, D.currSwatchID, 1 );
	//D.hover_handler( e, D.originalElement, eventType, viewID, categoryID, swatchID, 1 ); // failed mouseout
  }
  
  D.sendEvent = function(eventType, value){
    var elemData = RICHFX.getElementData(D.elem);
    if ( elemData.ColorChange_selection ){
        if (eventType == 'changeColor'){
            var viewID = elemData.ColorChange_selection[0];
            var categoryID = elemData.ColorChange_selection[1];
  	        var swatchID = D.swatchNameToInternalSwatchID(viewID, categoryID, value);
        } else if (eventType == 'changeView'){
            var viewID = value;
            var categoryID = elemData.ColorChange_selection[1];
  	        var swatchID = elemData.ColorChange_selection[2];
        } else if (eventType == 'changeCategory'){
            var viewID = elemData.ColorChange_selection[0];
            var categoryID = value;
  	        var swatchID = 0;
        }
        D.changeColor.apply( this, [ null, viewID, categoryID, swatchID] );
    }
  }
  
  D.getActualImageUrl = function(){
  	return this.properties(D.elem).element.src;
  }
  
  D.redraw = function(){
	D.resize_handler.apply( this, [ undefined, D.elem ] );
  }
  
  D.reloadConfig = function(newMediaID){
	this.loadXML( this.imageMediaURL + newMediaID + '/zoom.info.js', newMediaID, D.loadXML_handler, this);
  }
  
  D.switchViewer = function(viewerName){
	var args = [];
	args[0] = viewerName;
	args[1] = D.elem;
	args[2] = metrics;		
				
	this.lateLoadComponent( viewerName, D.elem, args );
  }
  
  // adding generic bindmethods to viewer API
  this.registerMethod(D.elem, componentName, 'sendEvent', D.sendEvent, this);
  this.registerMethod(D.elem, componentName, 'handleHover', D.handleHover, this);
  this.registerMethod(D.elem, componentName, 'getActualImageUrl', D.getActualImageUrl, this);
  this.registerMethod(D.elem, componentName, 'redraw', D.redraw, this);
  this.registerMethod(D.elem, componentName, 'switchViewer', D.switchViewer, this);
  this.registerMethod(D.elem, componentName, 'reloadConfig', D.reloadConfig, this);

  // change image to new color
  D.changeColor = function ( e, viewID, categoryID, swatchID, type, ccElemList, ccElem, clickStyle ) {
  
    with (D) {
	
	  if ( swatchID == undefined || swatchID == 'undefined' ) swatchID = 0;
	  
	  //RICHFX.consoleDebug('[imageColorChange] - changeColor image: ' + 'image_' + viewID + '_' + categoryID + '_' + swatchID );
	  
      var image = imageArray[ 'image_' + viewID + '_' + categoryID + '_' + swatchID ];
	  var lookupMediaID = imageMediaArray[ 'image_' + viewID + '_' + categoryID + '_' + swatchID ];
	  
	  // reset value
	  D.usingSingleAltViewView = 0;
	  
	  if ( !image && useSingleAltView == 1 ) {
		image = imageArray[ 'image_' + D.singleAltViewView + '_' + categoryID + '_' + swatchID ];
		// mark that singleAltViewView was required
		D.usingSingleAltViewView = 1;
		viewID = D.singleAltViewView;
	  }
	  
      if ( !image ) return;
      
      if ( type != 'preview' && ccElemList && ccElem && clickStyle ) {
          for ( var i = 0; i < ccElemList.length; i++ ) {
              var obj = ccElemList[i];
              var elemData = RICHFX.getElementData(obj);
              obj.className = elemData.ColorChange_class = elemData.ColorChange_baseClass;       
          }
          var elemData = RICHFX.getElementData(ccElem);
          ccElem.className = elemData.ColorChange_class = elemData.ColorChange_baseClass + ' ' + clickStyle;
      }
      
      // Handle aspect ratio difference between element and media
      if ( imageAspectRatio > image.srcAspectRatio )
        var imageSize = [ metrics.realDim[1] * image.srcAspectRatio, metrics.realDim[1] ];
      else
        var imageSize = [ metrics.realDim[0], metrics.realDim[0] / image.srcAspectRatio ];
  
      // add image to Dom
      if ( !displayedImage ) {
        this.addEvent( elem, 'offsetchange', resize_handler, this, elem );
      } else {
        try {
          displayedImage.parentNode.removeChild( displayedImage );
        } catch ( err ) {}
      }
	  
      document.body.appendChild(image);
      displayedImage = image;
      
      // position image
      resize_handler.apply( this, [ undefined, elem ] );
	  
	  D.currMediaSrc = image.src;
	  // Update Flex components where necessary
	  //RICHFX.consoleDebug('[imageColorChange] - UpdatingFlexViewers');
	  updateFlexViewers();
	  /*
	  // call relevant flex viewers
	  var viewerList = RICHFX.retrieveViewers();
	  if ( viewerList[elem.src].indexOf('imageZoom') != -1 || 
		   viewerList[elem.src].indexOf('imageZoomOverlay') != -1 || 
		   viewerList[elem.src].indexOf('imagePersZoom') != -1 ) {
	  
		// imageZoom
		updateMedia(lookupMediaID, 1);	
		
		//updateMedia(D.mediaID, 1, viewID, categoryID, swatchID);	
	  }
      */
      RICHFX.properties(elem).element = displayedImage;

      // draw color chage elements
      if ( type != 'preview' ) {
		drawColorChange.apply( this, [ viewID, categoryID, swatchID, type ] );
	  }

      // dispatch element source change event
      // cm: changed order -> was: 1) dispatchevent 2) drawColorChange
      // otherwise the elemData.ColorChange_selection field still contains the old value when event was handled
      RICHFX.dispatchEvent(elem, 'elementchange');
  
    }
  }
  
 
  function updateMedia(mediaID, zoomOutPlease, viewID, categoryID, swatchID ) {

	var mediaObj = new Object();
	
	mediaObj.mediaID = mediaID;
	mediaObj.zoomOutPlease = zoomOutPlease;

    var objs = RICHFX.RFX_INTERFACE.Application_Objects;
	
	var viewerList = RICHFX.retrieveViewers();

    for (var name in objs){
	
		if ( viewerList[elem.src].indexOf('imageZoom') != -1 )
			objs[name].callMethod("zoom","updateMedia",mediaObj);
			
		if ( viewerList[elem.src].indexOf('imageZoomOverlay') != -1 )
			objs[name].callMethod("zoomoverlay","updateMedia",mediaObj);
		
		if ( viewerList[elem.src].indexOf('imagePersZoom') != -1 ) {
			objs[name].swatchChange(swatchID, categoryID);
		}
        break;
    }              
  }
  
    D.hover_handler = function( e, target, type, hViewID, hCatID, hSwatchID, apiCall ) {
    with (D) {
      var elemData = RICHFX.getElementData(target);
	  
	  if ( hSwatchID == undefined || hSwatchID == 'undefined' ) hSwatchID = 0;
	  
	  //RICHFX.consoleDebug('[imageColorChange] - hover_handler: ' + hViewID + '|' + hCatID + '|' + hSwatchID);
	  
	  // This needs to be set based on what is calling hover_handler
	  var mouseoutElemData = [ hViewID, hCatID, hSwatchID ];
  
      // add the mouse over class to the element on mouse over and remove on mouse out
      if ( changeOnHover != 'sticky' && e.type == 'mouseout' ) {
          target.className = elemData.ColorChange_class;
      } else if ( e.type == 'mouseover' ) {
          target.className += ' RICHFXColorChange' + type + '_hover';
      }
      
      if ( changeOnHover == 'sticky' || changeOnHover && !isNaN(changeOnHover) || apiCall == 1 ) {
	  
		  //RICHFX.consoleDebug('[imageColorChange] - hover_handler: passed changeOnHover');
			
          var elemK = RICHFX.getElementData(elem);
          if ( D.changeOnHoverTimer ) 
            clearTimeout( D.changeOnHoverTimer );
          D.changeOnHoverTimer = 0;

          if ( changeOnHover != 'sticky' && e.type == 'mouseout' ) {
              D.changeOnHoverTimer = RICHFX.setTimeout ( 
                function() { 
                  clearTimeout( D.changeOnHoverTimer );
				  
				  if ( apiCall == 1 ) { 
					D.changeColor.apply( this, [ null ].concat( mouseoutElemData ).concat( 'preview' ) );
				  } else {
					D.changeColor.apply( this, [ null ].concat( elemK.ColorChange_selection ).concat( 'preview' ) );
				  }  
                }, 
                changeOnHover, this 
              );
          } else if ( e.type != 'mouseout' ) {
              D.changeOnHoverTimer = RICHFX.setTimeout ( 
                function() { 
                  clearTimeout( D.changeOnHoverTimer );
				  if ( changeOnHover != 'sticky' ) {
					if ( !apiCall ) {
						elemData.ColorChange_selection[0] = hViewID;
						elemData.ColorChange_selection[1] = hCatID;
						elemData.ColorChange_selection[2] = hSwatchID;
					}
						
					D.changeColor.apply( this, [ null ].concat( elemData.ColorChange_selection ).concat( 'preview' ) )
				  } else {
					if ( !(hViewID == D.currViewID && hCatID == D.currCategoryID && hSwatchID == D.currSwatchID) ) {
						if ( !apiCall ) {
							elemData.ColorChange_selection[0] = hViewID;
							elemData.ColorChange_selection[1] = hCatID;
							elemData.ColorChange_selection[2] = hSwatchID;
						}
  						   
  						D.changeColor.apply( this, [ null ].concat( elemData.ColorChange_selection ) )
					}
				  }
                }, 
                changeOnHover, this 
              );
          }
      }

    }
  }
  
  /*
  // handle mouse over events on the color change elements
  D.hover_handler = function( e, target, type, hViewID, hCatID, hSwatchID ) {
  
    with (D) {
      var elemData = RICHFX.getElementData(target);
	  
	  // This needs to be set based on what is calling hover_handler
	  var mouseoutElemData = [ hViewID, hCatID, hSwatchID ];
	  
      // add the mouse over class to the element on mouse over and remove on mouse out
      if ( changeOnHover != 'sticky' && e.type == 'mouseout' ) {
          target.className = elemData.ColorChange_class;
      } else if ( e.type == 'mouseover' ) {
          target.className += ' RICHFXColorChange' + type + '_hover';
      }
	  
      if ( changeOnHover == 'sticky' || changeOnHover && !isNaN(changeOnHover) ) {
          var elemK = RICHFX.getElementData(elem);
          if ( D.changeOnHoverTimer ) 
            clearTimeout( D.changeOnHoverTimer );
          D.changeOnHoverTimer = 0;

          if ( changeOnHover != 'sticky' && e.type == 'mouseout' ) {
              D.changeOnHoverTimer = RICHFX.setTimeout ( 
                function() { 
                  clearTimeout( D.changeOnHoverTimer );
                  D.changeColor.apply( this, [ null ].concat( elemK.ColorChange_selection ).concat( 'preview' ) );
                }, 
                changeOnHover, this 
              );
          } else if ( e.type != 'mouseout' ) {
              D.changeOnHoverTimer = RICHFX.setTimeout ( 
                function() { 
                  clearTimeout( D.changeOnHoverTimer );
				  if ( changeOnHover != 'sticky' ) {
				  
					elemData.ColorChange_selection[0] = hViewID;
  					elemData.ColorChange_selection[1] = hCatID;
  					elemData.ColorChange_selection[2] = hSwatchID;
						   
					D.changeColor.apply( this, [ null ].concat( elemData.ColorChange_selection ).concat( 'preview' ) )
				  } else {
					if ( !(hViewID == D.currViewID && hCatID == D.currCategoryID && hSwatchID == D.currSwatchID) ) {
						   // set required selection
						   elemData.ColorChange_selection[0] = hViewID;
  						   elemData.ColorChange_selection[1] = hCatID;
  						   elemData.ColorChange_selection[2] = hSwatchID;
													
  						D.changeColor.apply( this, [ null ].concat( elemData.ColorChange_selection ) )
					}
				  }
                }, 
                changeOnHover, this 
              );
          }
      }

    }
  }
*/
  	// Handle CSS tooltip
	D.buildTooltip = function () {
	
		var tt = document.createElement('div');
		tt.id = 'RICHFXTooltip';
		tt.className = "RICHFXTooltip";
		
		document.getElementsByTagName('body')[0].appendChild(tt);
		
		tt.style.position = 'absolute';
		tt.style.visibility = 'hidden';
	}
	
	D.showTooltip = function(e, target, type) {
		// retrieve tooltip node
		var tt = document.getElementById('RICHFXTooltip');
		
		// update text
		tt.innerHTML = target.title;
		target.title="";
		
		var absoluteOffset = this.getAbsoluteOffset(target);
		
		tt.style.left = (parseInt(absoluteOffset.left) + parseInt(D.tooltipAlignPixelsLeft)) + 'px';
		tt.style.top  = (parseInt(absoluteOffset.top) + parseInt(D.tooltipAlignPixelsTop)) + 'px';
		
		tt.style.visibility = 'visible';
	}
	
	D.hideTooltip = function(e, target, type) {
		var tt = document.getElementById('RICHFXTooltip');
		target.title = tt.innerHTML;
		tt.style.visibility = 'hidden';
	}
		
	function updateFlexViewers(remoteURL) {
	
	// && RICHFX.flexViewerLoaded 
	if ( D.initCompleted == true ) {
	
		var viewerList = RICHFX.retrieveViewers();
		
		if ( viewerList[D.regViewerSrc] != undefined && 
			 viewerList[D.regViewerSrc].indexOf('imageFlexZoom') != -1 ) {
			 
			var imageMediaID = RICHFX.DecodeMedia( D.currMediaSrc );
			//RICHFX.consoleDebug('[imageColorChange] - changeSource: ' + RICHFX.imageMediaURL + imageMediaID + 'zoom.info');
				
			if ( viewsElementID.indexOf('Overlay') != -1 ) {
				var rfxFlexZoomOverlay = document.getElementById('rfximageZoomOverlay');
				if ( rfxFlexZoomOverlay != null && rfxFlexZoomOverlay != undefined )
					rfxFlexZoomOverlay.changeSource(RICHFX.imageMediaURL + imageMediaID + '/zoom.info');
				imageMediaID = imageMediaID.replace(RICHFX_CONFIG.zoomOverlaySuffix, RICHFX_CONFIG.zoomPageSuffix);
			} 
			
			//RICHFX.consoleDebug('[imageColorChange] - imageMediaID(2): ' + imageMediaID);
			var rfxFlexZoom = document.getElementById('rfximageZoom');
		
			if ( rfxFlexZoom != null && rfxFlexZoom != undefined ) 
			{	
				try {
					rfxFlexZoom.changeSource(RICHFX.imageMediaURL + imageMediaID + '/zoom.info');
					//alert('called rfxFlexZoom changeSource');
				} catch ( err ) {
					//alert('updating rfxFlexZoom vis flashvar param');
					var rfxParams = document.getElementsByTagName('param');
					
					for ( var param in rfxParams ) 
					{
						var tmpParam = rfxParams[param];
						
						if ( tmpParam.name == 'flashvars' ) 
						{	
							var parts = tmpParam.value.split('rfx_media_source=');
							var valStart = parts[0];
							var parts = parts[1].split('&');
							var valEnd = parts[1];
							
							tmpParam.value = valStart + 'rfx_media_source=' + RICHFX.imageMediaURL + imageMediaID + '/zoom.info&' + valEnd;
					
							//RICHFX.consoleDebug('[imageColorChange] - paramValue: ' + tmpParam.value); 
						}	
					}	
				}
			}
		}
	}
	}
	/*
	function updateFlexViewers(remoteURL) {
	
	with (D) {
		// call relevant flex viewers
		var regViewerList = RICHFX.retrieveViewers();
		
		if ( regViewerList[D.regViewerSrc] != undefined && 
			(regViewerList[D.regViewerSrc].indexOf('imageZoom') != -1 || 
			(regViewerList[D.regViewerSrc].indexOf('imageZoomOverlay') != -1 || 
			 regViewerList[D.regViewerSrc].indexOf('imagePersZoom') != -1 ) ) ) {
			
			var objs = RICHFX.RFX_INTERFACE.Application_Objects;
			var mediaObj = new Object();
	
			for (var name in objs){
	
				// get current mediaID
				var imageMediaID = RICHFX.DecodeMedia( D.currMediaSrc );
	
				if ( regViewerList[elem.src].indexOf('imageZoom') != -1 ) {
				
					mediaObj.mediaID = imageMediaID;
					mediaObj.zoomOutPlease = 1;
					
					objs[name].callMethod("zoom", "updateMedia", mediaObj);
				}
	
				if ( regViewerList[elem.src].indexOf('imageZoomOverlay') != -1 ) {
				
					mediaObj.mediaID = imageMediaID;
					mediaObj.zoomOutPlease = 1;
					
					objs[name].callMethod("zoomoverlay", "updateMedia", mediaObj);
				}
		
				if ( regViewerList[elem.src].indexOf('imagePersZoom') != -1 ) {
				
					mediaObj.mediaID = imageMediaID;
					
					if ( remoteURL != undefined && remoteURL != '' )
						mediaObj.remoteMediaUrl = remoteURL;
				
					objs[name].callMethod("personalizationViewer", "swatchChange", mediaObj);
				}
				
				break;
			}	
		}
	}
	}
	*/
    function clone(myObj){
	   if(typeof(myObj) != 'object') return myObj;
    	if(myObj == null) return myObj;

    	var myNewObj = new Object();

	   for(var i in myObj)
		myNewObj[i] = clone(myObj[i]);
	
	   return myNewObj;
    }
	
	function keySort(unsorted) {
	
		var keys = new Array();
		var sorted = new Array();
		for(k in unsorted) {
			keys.push(k);
		}

		keys.sort( function (a, b){ return (a > b) - (a < b);});

		for (var i = 0; i < keys.length; i++){
			sorted[keys[i]] = unsorted[keys[i]];
		}
		
		return sorted;
	}
	
	function checkForMissingSwatches (localSwatchData) {
		
		var maxCount = new Object();
		var maxView  = new Object();
	
		// Set count defaults
	    for (var tempViewName in localSwatchData ) {
		
			// needs to be stored for later use.
			if ( D.primaryView == undefined ) D.primaryView = tempViewName;
			  
			var tempViewData = localSwatchData[tempViewName];
			
			// set default counts
			for (var tempCatName in tempViewData) {
				maxCount[tempCatName] = 0;
			}
		}
		
		// Store the name and swatch count of the view with the most swatches pre category.
	    for (var tempViewName in localSwatchData ) {
			  
			var tempViewData = localSwatchData[tempViewName];
	
			// var reset
			tempCatName = '';
			
			for (var tempCatName in tempViewData) {
			
				tmpCatLength = tempViewData[tempCatName].length;
				
				for ( var ts in tempViewData[tempCatName] ) 
				{
					// remove 'invisible' swatches from the count
					if ( tempViewData[tempCatName][ts].visible == '' ) {
						tmpCatLength -= 1;
					}
				}
				// Add to swatchCount
				D.loadImageSwatchCount += tmpCatLength;
				
				// Work out the category with the most swatches for the current view
				// store it's lentgh and name.
				if ( maxCount[tempCatName] < tmpCatLength ) {	
					maxCount[tempCatName] = tmpCatLength;
					maxView[tempCatName] = tempViewName;
				}
			}
		}
			
		// reset values
		tempViewName = '';
		tempCatName = '';
		var swatchCount = new Object();
		
		// reset count
	    for (var tempViewName in localSwatchData ) {
			var tempViewData = localSwatchData[tempViewName];
			// var reset
			tempCatName = '';
			for (var tempCatName in tempViewData) {
				for ( var tempSwatch in tempViewData[tempCatName] ) {
					swatchCount[tempViewData[tempCatName][tempSwatch].swatch] = 0;
				}
			}
		}
		
		// Find the swatch that is in all views
	    for (var tempViewName in localSwatchData ) {
			  
			var tempViewData = localSwatchData[tempViewName];
	
			// var reset
			tempCatName = '';
			
			for (var tempCatName in tempViewData) {
				
				for ( var tempSwatch in tempViewData[tempCatName] ) {
					if ( tempViewData[tempCatName][tempSwatch].visible != '' ) {
						swatchCount[tempViewData[tempCatName][tempSwatch].swatch] += 1;
					}
				}
			}
		}
		
		var maxSwatchCount = 0;
		
		for ( var tempSwatch in swatchCount ) {
			
			if ( swatchCount[tempSwatch] > maxSwatchCount ) {
				
				maxSwatchCount = swatchCount[tempSwatch];
				
				D.maxSwatchName = tempSwatch;
			}
		}
		
		D.singleAltViewSwatch = D.maxSwatchName;
			
		// reset values
		tempViewName = '';
		tempCatName = '';
		
		// Update any views that do not have the max count of swatches
		for (var tempViewName in localSwatchData ) {
			
			var tempSwatchData = localSwatchData[tempViewName];
				
			for (var tempCatName in tempSwatchData) {
				
				// holding variables for readability.
				var maxCountVal = maxCount[tempCatName];
				var maxViewName = maxView[tempCatName];
				
				D.maxViewName = maxViewName;
				
				if ( (tempViewName != maxViewName) && (tempSwatchData[tempCatName].length != maxCountVal) ) {
							
					var i = 0;
						
					while ( i < maxCountVal ) {
						var maxSwatchData = clone(localSwatchData[maxViewName]);
					
						var maxTempSwatchName = maxSwatchData[tempCatName][i].swatch;
						if ( tempSwatchData[tempCatName][i] ) { 
							var tempSwatchName = tempSwatchData[tempCatName][i].swatch; 
						} else {
						    var tempSwatchName = '';
						}
						
						if ( maxTempSwatchName != tempSwatchName )
						{	
							var dummyArray = Array();
							var fixcount = 0;
							
							for (j = 0; j < maxCountVal; j++)
							{
								if ( j == i ) 
								{
									dummyArray[j] = maxSwatchData[tempCatName][i];
								
									var tempImageName = clone(dummyArray[j].image);
									
									if ( maxViewName != '' ) {
										tempImageName = tempImageName.replace('_' + maxViewName, '_' + tempViewName);
									} else {
										tempImageName = tempImageName + '_' + tempViewName;
									}
									
									dummyArray[j].image = tempImageName;
									dummyArray[j].visible = '0';
										
									fixcount++;
								}
								else if ( j < i )
								{
									dummyArray[j] = tempSwatchData[tempCatName][j];
								}
								else
								{
									dummyArray[j] = tempSwatchData[tempCatName][j - fixcount];
								}
							}
							
							tempSwatchData[tempCatName] = dummyArray;
						}
					
						i++;
					}
				}
			}
		}

		return localSwatchData;		
	}

  // Draw the color change components
  D.drawColorChange = function ( viewID, categoryID, swatchID, type ) {
  
	//RICHFX.consoleDebug('[imageColorChange] - Entered drawColorChange');
  
    with (D) {
      var swatchCount = 0, catCount = 0, viewCount = 0, viewSeqCount = 0;
      var views = [], cats = [], swatches = [];
	  var viewsSeq = [];
	  
	  /* --------------- */
	  
	  if ( D.activeTracking == true && D.currCategoryID != undefined ) {
	  
		// store color change data;
		var origColor = swatchData[D.currViewID][D.currCategoryID][D.currSwatchID].name;
		var newColor = swatchData[viewID][categoryID][swatchID].name;
	  
		//RICHFX.consoleDebug('TRACKING: ' + swatchData[viewID][categoryID][swatchID].name);
	
		//tracking = this.Tracking();
		this.Tracking.trackEvent(elem, 'colorChange', 'From: ' + origColor + ', To: ' + newColor);
	  }
	  
	  /* -------------- */
	  
  	  // Uodate values for surrent settings
  	  D.currViewID = viewID;
  	  D.currCategoryID = categoryID;
  	  D.currSwatchID = swatchID;
 
      var elemK = RICHFX.getElementData(elem);
      elemK.ColorChange_selection = [ viewID, categoryID, swatchID ];
  
      // draw views
      // - draw only the views that is related to the specified view, category and swatch
      var viewsElement;
		  
	  //RICHFX.consoleDebug('[imageColorChange] - Retrieving viewsElementID: ' + viewsElementID);
		  
      if ( typeof(viewsElementID) != undefined ) 
        viewsElement = document.getElementById(viewsElementID);
		
      if ( viewsElement && (type != 'view' || useSingleAltView == 1) ) {
		//RICHFX.consoleDebug('[imageColorChange] - Breaking Down swatchData');
        for ( var v in swatchData ) {
		
	      //RICHFX.consoleDebug('[imageColorChange] - (pre check) swatchData view: ' + v);
		
		  // handle IE forLoop error
		  if ( v == 'indexOf' || v == 'filter') continue;
		
		  //RICHFX.consoleDebug('[imageColorChange] - swatchData View: ' + v);
		
          var view = swatchData[v];
		  
		  // Check that this view contains a swatch in the swatchlist
		  if ( swatchList ) {
		  
			for ( var sl in swatchList ) {
				var emptyView = true;
				var tempSID = swatchNameToInternalSwatchID(v, categoryID, sl);
				/*
				if ( view != null &&
					 view[categoryID] != null &&
					 view[categoryID][tempSID] != null &&
					 view[categoryID][tempSID].visible != null &&
					 view[categoryID][tempSID].visible == '1') {
					// found a swatch in the view, continue
					emptyView = false;
					break;
					//continue;
				}
				*/
				/*
				if ( view[categoryID][tempSID].visible != '0') {
					// found a swatch in the view, continue
					emptyView = false;
					break;
				}
				*/
				
				emptyView = false;
				break;
				
			}
			
		  }
		  
		  //RICHFX.consoleDebug('[imageColorChange] - swatchTest: ' + !view[categoryID] + '|' + !view[categoryID][swatchID] + '|' + view[categoryID][swatchID].visible + '|' + swatchList.length + '|' + !swatchList[ view[categoryID][swatchID].swatch ] );
		  
		  var swatchTest = ( !view[categoryID] || !view[categoryID][swatchID] || view[categoryID][swatchID].visible != '1' || ( swatchList && (!swatchList[ view[categoryID][swatchID].swatch ] && swatchList.length != undefined) ));
		  
		  if ( emptyView ) continue;
		  //RICHFX.consoleDebug('[imageColorChange] - Passed emptyView');
          if ( useSingleAltView != 1 && swatchTest ) continue;
		  
		  //RICHFX.consoleDebug('[imageColorChange] - Passed swatchTest');
		  
            var swatch = view[categoryID][swatchID];
		 
		    // if in singleAltViewMode, setup data apropriately
			if ((typeof(useSingleAltView) != undefined) && (useSingleAltView == 1) && (D.singleAltViewSwatch != undefined) ) {
				
				if ( swatchTest && swatch.visible != '1' ) {
					
					var tempSwatchID = swatchNameToInternalSwatchID(v, categoryID, D.singleAltViewSwatch);
					swatch = view[categoryID][tempSwatchID];
				}
			}
			
		  //RICHFX.consoleDebug('[imageColorChange] - Passed 1');
		  
          var viewImage = new Image();
          var elemData = RICHFX.getElementData(viewImage);
		  var blockView = false;
		  
          elemData.ColorChange_selection = [ v, categoryID, swatchID ];
          elemData.ColorChange_baseClass = 'RICHFXColorChangeView RICHFXColorChangeView' + viewCount++;
		  
		  //RICHFX.consoleDebug('[imageColorChange] - Passed 2');
		  
		  if ( useSingleAltView == 1 && D.usingSingleAltViewView == 1 ) {
			elemData.ColorChange_class = viewImage.className += elemData.ColorChange_baseClass + ( D.singleAltViewView == v ? ' RICHFXColorChangeViewSelected' : '' );
		  } else {
			elemData.ColorChange_class = viewImage.className += elemData.ColorChange_baseClass + ( viewID == v ? ' RICHFXColorChangeViewSelected' : '' );
		  }
		  
		  //RICHFX.consoleDebug('[imageColorChange] - Passed 3');
		  
		  var viewfinderSrc = this.imageMediaURL + imageProps.ImagePrefix + swatch.image + imageProps.ImageSuffix + '/viewfinder.jpg';
		  
		  // Add appropriate alt. view image
		  if ( D.viewPrefix == '' && D.viewSuffix == '' ) {
			this.setImageSource(viewImage, viewfinderSrc);
		  } else {
			var resizeSrc = this.imageMediaURL + D.viewPrefix + swatch.image + D.viewSuffix + '.jpg';
			this.setImageSource(viewImage, resizeSrc , viewfinderSrc);
		  }
		  
		  //RICHFX.consoleDebug('[imageColorChange] - Passed 4');
		  
          viewImage.tooltip = viewImage.title = viewImage.alt = v;
          viewImage.sort = swatchList ? swatchList[ swatch.swatch ] : 0;
		  
		  
		  //RICHFX.consoleDebug('[imageColorChange] - Passed 5');
		  
		  if ( !view[categoryID] || !view[categoryID][swatchID] || view[categoryID][swatchID].visible != '1' || ( swatchList && !swatchList[ view[categoryID][swatchID].swatch ] ) ) {
		  
		  //RICHFX.consoleDebug('[imageColorChange] - Passed 6');
		  
			var tempSwatchID = swatchNameToInternalSwatchID(v, categoryID, D.singleAltViewSwatch);
		  
			this.addEvent( viewImage, 'click', changeColor, this, v, categoryID, tempSwatchID, 'view', views, viewImage, 'RICHFXColorChangeViewSelected' );
			  
			this.addEvent( viewImage, 'mouseover', hover_handler, this, viewImage, 'View', v, categoryID, tempSwatchID );
			this.addEvent( viewImage, 'mouseout', hover_handler, this, viewImage, 'View', v, categoryID, tempSwatchID );
		  } else {
		  
			//RICHFX.consoleDebug('[imageColorChange] - Passed 7');
			
			this.addEvent( viewImage, 'click', changeColor, this, v, categoryID, swatchID, 'view', views, viewImage, 'RICHFXColorChangeViewSelected' );
		
			this.addEvent( viewImage, 'mouseover', hover_handler, this, viewImage, 'View', v, categoryID, swatchID );
			this.addEvent( viewImage, 'mouseout', hover_handler, this, viewImage, 'View', v, categoryID, swatchID );
		  }
		  
		  //RICHFX.consoleDebug('[imageColorChange] - Passed 8');
		  
          //this.addEvent( viewImage, 'mouseover', hover_handler, this, viewImage, 'View' );
          //this.addEvent( viewImage, 'mouseout', hover_handler, this, viewImage, 'View' );
          
          if ( D.tooltipActive == 'both' || D.tooltipActive == 'view' ) {
			// CSS Tooltip
			this.addEvent( viewImage, 'mouseover', D.showTooltip, this, viewImage, 'View' );
			this.addEvent( viewImage, 'mouseout', D.hideTooltip, this, viewImage, 'View' );
		  }
	  
	      // build views array
		  if ( swatch.sequence != '' ) {
			viewsSeq[ swatch.sequence ] = views.length;
			viewSeqCount++;
		  }
		  
		  //RICHFX.consoleDebug('[imageColorChange] - Passed 9: ' + views.length + '|' + viewImage.title);
		  
		  views[ views.length ] = viewImage;
        }
		
		  //RICHFX.consoleDebug('[imageColorChange] - Passed 10');
		  
		// take slider usage into account
		if (D.slideLeftID == undefined) {
			viewsElement.innerHTML = '';
		} else {
			imagesDiv = document.getElementById(D.slideImagesID);
			imagesDiv.innerHTML = '';
		}
        
        if ( views.length >= D.minViewsReq ) { 
		
		  //RICHFX.consoleDebug('[imageColorChange] - views > minViewsReq');
		
		  // Handle the use of an image slider
		  if (D.slideLeftID != undefined) {
			  
			// Retrieve images Div
			imagesDiv = document.getElementById(D.slideImagesID);
		  }
		
		  // Add each view image
		  
		  //RICHFX.consoleDebug('[imageColorChange] - viewSeqCount: ' + viewSeqCount + ', viewsLength: ' + views.length);
		  
		  var viewAdditionCount = 0;
		  
		  // handle sequence where necessary
		  if ( viewSeqCount == views.length ) {
			
			//RICHFX.consoleDebug('[imageColorChange] - viewsSeqCount');
					
			// ensure the keys are read in asc order .. this is to ensure all browsers work the same
			viewsSeq = keySort(viewsSeq);
			
			for ( var viewSeqId in viewsSeq )
			{  
				if ( viewAdditionCount < 8 ) {
					if (D.slideLeftID != undefined) {
						imagesDiv.appendChild( views[viewsSeq[viewSeqId]] );
					} else {
						//RICHFX.consoleDebug('[imageColorChange] - Adding views seq');
						viewsElement.appendChild( views[viewsSeq[viewSeqId]] );
					}
				}
				
				viewAdditionCount++;
			}
			
		  } else {
		  
			for ( var i = 0; i < views.length; i++ )
			{  
				if ( viewAdditionCount < 8 ) {
					//RICHFX.consoleDebug('[imageColorChange] - views forLoop ' + 1);
					if (D.slideLeftID != undefined) {
						imagesDiv.appendChild( views[i] );
					} else {
						//RICHFX.consoleDebug('[imageColorChange] - Adding views');
						viewsElement.appendChild( views[i] );
					}
				}
				
				viewAdditionCount++;
			}
			
		  }
		  
		  if (D.slideLeftID != undefined) {
			
			//  - Add slideEnd div
			var slideEndDiv = document.createElement('div');
			var elemDataSlideDiv = RICHFX.getElementData(slideEndDiv);
			slideEndDiv.id = 'slideEnd';
		  
			imagesDiv.appendChild(slideEndDiv);
		    
			viewsElement.appendChild(imagesDiv);
		  }
        }
      }
  
      // draw categories
      // - draw only the categories that is related to the specified view, category and swatch
      var categoriesElement;
      if ( typeof(categoriesElementID) != undefined ) 
        categoriesElement = document.getElementById(categoriesElementID);  
      if ( categoriesElement && type != 'category'  ) {
        var view = swatchData[viewID];
        for ( var c in view ) {
          var category = view[c];
          var catSwatchID = swatchID;
  
          // search for a visible swatchID before drawing category
          for ( var s = 0; s < category.length; s++ ) {
            if ( category[s].visible == '1' ) {
              catSwatchID = s;
              break;
            }
          }
          // do not draw if no visible swatch found in category
          if ( !category[catSwatchID] || category[catSwatchID].visible != '1' || ( swatchList && !swatchList[ category[catSwatchID].swatch ] ) ) continue;
          var swatch = category[catSwatchID];
  
          var catImage = document.createElement('span');
          var elemData = RICHFX.getElementData(catImage);
          elemData.ColorChange_selection = [ viewID, c, catSwatchID ];
          elemData.ColorChange_baseClass = 'RICHFXColorChangeCategory RICHFXColorChangeCategory' + catCount++;
          elemData.ColorChange_class = catImage.className = elemData.ColorChange_baseClass + ( categoryID == c ? ' RICHFXColorChangeCategorySelected' : '' );
          catImage.tooltip = catImage.title = catImage.innerHTML = c;
          catImage.sort = swatchList ? swatchList[ swatch.swatch ] : 0;
          this.addEvent( catImage, 'click', changeColor, this, viewID, c, catSwatchID, 'category', cats, catImage, 'RICHFXColorChangeCategorySelected' );
          this.addEvent( catImage, 'mouseout', hover_handler, this, catImage, 'Category', viewID, c, catSwatchID );
          this.addEvent( catImage, 'mouseover', hover_handler, this, catImage, 'Category', viewID, c, catSwatchID );
          
          cats[ cats.length ] = catImage;
        }
        categoriesElement.innerHTML = '';
        if ( cats.length > 1 ) {
          if ( swatchList )
            cats.sort(function( a, b ) { return a.sort - b.sort; }); 
          for ( var i = 0; i < cats.length; i++ )
            categoriesElement.appendChild( cats[i] );
        }
      }
  
      // draw swatches
      // - draw only the swatches that is related to the specified view, category and swatch
      var swatchElement;
      if ( typeof(swatchElementID) != undefined ) 
        swatchElement = document.getElementById(swatchElementID);  
      if ( swatchElement && type != 'swatch'  ) {
	  
		var tempViewID = viewID
	  
		if ( swatchData[viewID] == undefined && useSingleAltView == 1 ) {
			tempViewID = D.singleAltViewView;
		}
		
		var category = swatchData[tempViewID][categoryID];
		var workingViewTest = false;
		
        for ( var s = 0; s < category.length; s++ ) {
          var swatch = category[s];
		  
		  // If in 'useSingleAltView' mode, ignore the other factors.
		  if ( (useSingleAltView != 1 && swatch.visible != '1') || ( swatchList && !swatchList[ swatch.swatch ] ) ) continue;
		  
		  // check for a broken swatch
		  var workingView = '';
		  
		  if ( swatch.visible != '1' || ( swatchList && !swatchList[ swatch.swatch ] ) ) {
		  
			workingViewTest = true;
		  
			// find a working view for the current swatch.
			for ( var tempViewName in swatchData ) {
				var tempSwatch = swatchData[tempViewName][categoryID][s];
				
				if ( tempSwatch.visible == '1' || ( swatchList && swatchList[ tempSwatch.swatch ] ) ) {
					workingView = tempViewName;
					break;
				}
			}
			
			if ( workingView == '' ) {
			
				// if the swatch has no relevant image, go to a default of the initial image.	
				if ( D.singleAltViewView != '' ) {
					workingView = D.singleAltViewView;
				} else {
					workingView = D.DViewID;
				}
			}
			
		  }
		  
          var swatchImage = new Image();
          var elemData = RICHFX.getElementData(swatchImage);
          elemData.ColorChange_selection = [ viewID, categoryID, s ];
          elemData.ColorChange_baseClass = 'RICHFXColorChangeSwatch RICHFXColorChangeSwatch' + swatchCount++;
          elemData.ColorChange_class = swatchImage.className = elemData.ColorChange_baseClass + ( swatchID == s ? ' RICHFXColorChangeSwatchSelected' : '' );
          this.setImageSource(swatchImage, this.imageMediaURL + swatch.swatch + '.jpg');
          swatchImage.tooltip = swatchImage.title = swatchImage.alt = swatch.name;
          swatchImage.sort = swatchList ? swatchList[ swatch.swatch ] : 0;
		  
		  // Change the 'clicked' view where necessary.
		  //if ( swatch.visible != '1' || ( swatchList && !swatchList[ swatch.swatch ] ) ) {
		  // use the same view for each swatch
		  if ( D.defaultToPrimaryView == 1 ) {
			this.addEvent( swatchImage, 'click', changeColor, this, D.primaryView, categoryID, s, 'swatch', swatches, swatchImage, 'RICHFXColorChangeSwatchSelected' );
			
			this.addEvent( swatchImage, 'mouseover', hover_handler, this, swatchImage, 'Swatch', D.primaryView, categoryID, s );
			this.addEvent( swatchImage, 'mouseout', hover_handler, this, swatchImage, 'Swatch', D.primaryView, categoryID, s );
		  } else if ( workingViewTest == true ) {
			this.addEvent( swatchImage, 'click', changeColor, this, workingView, categoryID, s, 'swatch', swatches, swatchImage, 'RICHFXColorChangeSwatchSelected' );
			
			this.addEvent( swatchImage, 'mouseover', hover_handler, this, swatchImage, 'Swatch', workingView, categoryID, s );
			this.addEvent( swatchImage, 'mouseout', hover_handler, this, swatchImage, 'Swatch', workingView, categoryID, s );
		  } else {
			this.addEvent( swatchImage, 'click', changeColor, this, viewID, categoryID, s, 'swatch', swatches, swatchImage, 'RICHFXColorChangeSwatchSelected' );
			
			this.addEvent( swatchImage, 'mouseover', hover_handler, this, swatchImage, 'Swatch', viewID, categoryID, s );
			this.addEvent( swatchImage, 'mouseout', hover_handler, this, swatchImage, 'Swatch', viewID, categoryID, s );
		  }
		  
          //this.addEvent( swatchImage, 'mouseover', hover_handler, this, swatchImage, 'Swatch' );
          //this.addEvent( swatchImage, 'mouseout', hover_handler, this, swatchImage, 'Swatch' );
	  
		  if ( D.tooltipActive == 'both' || D.tooltipActive == 'swatch' ) { 
			// CSS Tooltip
			this.addEvent( swatchImage, 'mouseover', D.showTooltip, this, swatchImage, 'Swatch' );
			this.addEvent( swatchImage, 'mouseout', D.hideTooltip, this, swatchImage, 'Swatch' );
		  }
          
          swatches[ swatches.length ] = swatchImage;
          
        }
		// non slide version
		/*
			swatchElement.innerHTML = '';
		
			if ( swatches.length >= D.minSwatchesReq ) {
				if ( swatchList )
					swatches.sort(function( a, b ) { return a.sort - b.sort; }); 
				for ( var i = 0; i < swatches.length; i++ )
					swatchElement.appendChild( swatches[i] );
			}
		*/
		
		if (D.sSlideLeftID == undefined) {
			swatchElement.innerHTML = '';
		} else {
			imagesDiv = document.getElementById(D.sSlideImagesID);
			imagesDiv.innerHTML = '';
		}
		
        if ( swatches.length >= D.minSwatchesReq ) {
          if ( swatchList )
            swatches.sort(function( a, b ) { return a.sort - b.sort; }); 
			
          for ( var i = 0; i < swatches.length; i++ )
			if (D.sSlideLeftID != undefined) {
				imagesDiv.appendChild( swatches[i] );
			} else {
				swatchElement.appendChild( swatches[i] );
			}
        }
		  
		if (D.sSlideLeftID != undefined) {
			
			//  - Add slideEnd div
			var slideEndDiv = document.createElement('div');
			var elemDataSlideDiv = RICHFX.getElementData(slideEndDiv);
			slideEndDiv.id = 'slideSwatchEnd';
		  
			imagesDiv.appendChild(slideEndDiv);
		    
			swatchElement.appendChild(imagesDiv);
		}
      }
	  
	  // update swatch label
	  var tempViewID = viewID
	  
	  if ( swatchData[viewID] == undefined && useSingleAltView == 1 ) {
		tempViewID = D.singleAltViewView;
	  }
		
	  if ( D.swatchLabelID != undefined && D.swatchLabelID != '' ) {
		
		document.getElementById(D.swatchLabelID).innerHTML = swatchData[tempViewID][categoryID][swatchID].name;
	  }
	  
	  if ( D.swatchFunctionName != undefined && D.swatchFunctionName != '' ) {
	  
		// verify function exists beofre calling it
		if ( eval("typeof " + D.swatchFunctionName + " == 'function'") ) {
	  
			tempFunctionName = D.swatchFunctionName + "('" + D.swatchLabelID + "', '" + swatchData[tempViewID][categoryID][swatchID].name + "')";
		
			eval(tempFunctionName);
		}
	  }
		  
      if (initCompleted == false){
        initCompleted_handler.apply(this, [viewID, categoryID, swatchID]);
      } 
    }
  }

  // window resize handler
  D.resize_handler = function ( e, elem ) {
  
    with (D) {
      if (!displayedImage) return;
      metrics = RICHFX.getElementMetrics( elem );
  
      // Handle aspect ratio difference between element and media
      if ( imageAspectRatio > displayedImage.srcAspectRatio )
        var imageSize = [ metrics.realDim[1] * displayedImage.srcAspectRatio, metrics.realDim[1] ];
      else
        var imageSize = [ metrics.realDim[0], metrics.realDim[0] / displayedImage.srcAspectRatio ];
  		
	  var posLeft = (( metrics.offset[2] + metrics.dim[0] / 2 ) - imageSize[0] / 2);
	  var posTop = (( metrics.offset[3] + metrics.dim[1] / 2 ) - imageSize[1] / 2);
	  /*
	  if ( RICHFX.isFirefox && RICHFX.browserVersion >= 3.0 && RICHFX.browserVersion < 3.6.2 ) {
		posLeft++;
		posTop++;
	  }
		*/
      displayedImage.style.width = imageSize[0] + 'px';
      displayedImage.style.height = imageSize[1] + 'px';
      displayedImage.style.left = posLeft + 'px';
      displayedImage.style.top = posTop + 'px';
    }
  } 

  // zoom XML load hander for color change images
  // - preload color change images
  D.loadImageInfo_handler = function (xmlDOM, viewID, categoryID, swatchID) {
  
	D.loadImageInfoCount++;
	  
    with (D) {
	  var props = {};
	  // Check conditons to avoid errors
	  if ( xmlDOM != undefined && xmlDOM.firstChild != undefined && xmlDOM.firstChild.attributes != undefined ) {
		props = xmlDOM.firstChild.attributes;
	  }
	  
      var attr = {};
      for ( var i = 0; i < props.length; i++ )
        attr[props[i].nodeName] = props[i].nodeValue;
  
      var imageSrcDim = [ parseFloat(attr.ImageWidth), parseFloat(attr.ImageHeight) ];
  
      var altMediaID = attr.ImagePrefix + attr.ImageName + attr.ImageSuffix;
      var image = new Image();
      var mediaLevels = parseFloat(attr.NumLevels);
      viewLevel = Math.min( Math.max( Math.floor( - Math.log( metrics.realDim[0] / imageSrcDim[0] ) / Math.LN2 ), 0 ), mediaLevels - 2 );
      var viewLevelName = '00' + viewLevel;
      viewLevelName = viewLevelName.substr( viewLevelName.length - 2 );
      image.className = 'RICHFXColorChange';
      image.style.zIndex = ZINDEX_BASE++;
      image.style.position = 'absolute';
      image.srcAspectRatio = imageSrcDim[0] / imageSrcDim[1];
	  
	  // Costco Overlay setup
	  image.style.visibility = "hidden";
	  
	  // leChateau temp
	  //var viewerList = RICHFX.retrieveViewers();
	  //if ( viewerList[elem.src].indexOf('imageZoom') == -1  ) {
		//this.setImageSource(image, this.imageMediaURL + altMediaID + '/' + 'level_' + viewLevelName + '.jpg');
		this.setImageSource(image, this.imageMediaURL + altMediaID + '/FirstFrame.jpg');
	  //}
	  
      this.ClickLayer( elem, image );

      if ( this.isIE ) image.galleryimg = 'no';
      imageArray[ 'image_' + viewID + '_' + categoryID + '_' + swatchID ] = image;
	  imageMediaArray[ 'image_' + viewID + '_' + categoryID + '_' + swatchID ] = altMediaID;
	
	  // set default image where necessary.
	  var correctView = (D.currViewID == D.DViewID && 
						 D.currCategoryID == D.DCategoryID && 
  					     D.currSwatchID == D.DSwatchID);
	
	  if ( D.usingDefaultView == 1 && !correctView ) {
		D.changeColor.apply( this, [ null, D.DViewID, D.DCategoryID, D.DSwatchID] );
		
	  } 
	}
  }

  // Color change item XML load handler
  // - read color change and preload all color change zoom XML data
  D.loadItemXML_handler = function () {
  
	//RICHFX.consoleDebug('[imageColorChange] - Entering loadItemXML_handler');
  
    with (D) {
      if ( !( imageItemId in window.swatchData ) ) return;
      swatchData = window.swatchData[imageItemId];
      var dviewID, dcategoryID, dswatchID;

	  buildSwatchList();
	  
	  if ( !RICHFX.isIE ) sortSwatchDataViews();
  
	  swatchData = checkForMissingSwatches(swatchData);
	  
	  // sort the viewID's
	  var orderArray = new Array();
	  var firstView = true;
	  var viewMin = -1;
	  var viewMax = -1;
	  
	  for ( var vu in swatchData ) {
		//RICHFX.consoleDebug('[imageColorChange] - orderArray vu: ' + vu);
		orderArray[vu] = vu;
		
		if ( firstView ) {
			firstView = false;
			viewMin = vu;
			viewMax = vu;
		} else {
			if (vu < viewMin) viewMin = vu;
			if (vu > viewMax) viewMax = vu;
		}
	  }	
	  
		//RICHFX.consoleDebug('[imageColorChange] - orderArray sorting');
	  orderArray.sort(sortNumber);
		//RICHFX.consoleDebug('[imageColorChange] - orderArray sorted');
		
	  var tmpSwatchData = [];
	  
	  for ( var orderIdx = viewMin; orderIdx <= viewMax; orderIdx++ ) {
		//RICHFX.consoleDebug('[imageColorChange] - orderIdx: ' + orderIdx);
			var v = orderArray[orderIdx];
			
			var tmpView = swatchData[orderIdx];
			
			if ( tmpView != null ) {
				//RICHFX.consoleDebug('[imageColorChange] - adding tmpSwatchData for: ' + orderIdx);
				tmpSwatchData[orderIdx] = swatchData[orderIdx];
			}
	  }
	  
	  swatchData = tmpSwatchData;
	  
      // get list of images and load their zoom XML info files
      imageArray = {};
	  imageMediaArray = {};
	  
      for ( var v in swatchData ) {
        var view = swatchData[v];
        for ( var c in view ) {
          var category = view[c];
          for ( var s = 0; s < category.length; s++ ) {
            var swatch = category[s];
			
            if ( swatch.visible == '1' ) {
              var altMediaID = imageProps.ImagePrefix + swatch.image + imageProps.ImageSuffix;
              this.loadXML( this.imageMediaURL + imageProps.ImagePrefix + swatch.image + imageProps.ImageSuffix + '/zoom.info.js', altMediaID, loadImageInfo_handler, this, v, c, s );
            }
				
            // get the default view, category and swatch id
            if ( dviewID == undefined || swatch.image == imageProps.ImageName || swatch.default_view == '1' ) { 
              dviewID = v; dcategoryID = c; dswatchID = s;
			  
			  if ( swatch.visible == '1' && swatch.default_view == '1' ) {
				// update main image
				D.usingDefaultView = 1;
				D.DViewID = v;
				D.DCategoryID = c;
				D.DSwatchID = s;
			  }
            }
          }
        }
      }
      
      //drawColorChange.apply( this, [ dviewID, dcategoryID, dswatchID ] );
	  changeColor.apply( this, [ null, dviewID, dcategoryID, dswatchID] );
    }
  }

  // XML load handler
  D.loadXML_handler = function ( xmlDOM ) {
  
    with (D) {
      if ( !xmlDOM || !xmlDOM.firstChild || !xmlDOM.firstChild.attributes ) return;
      // parse attributes
      var props = xmlDOM.firstChild.attributes;
      var attr = {};
      for ( var i = 0; i < props.length; i++ )
        attr[props[i].nodeName] = props[i].nodeValue;
      imageProps = attr;
  
      // check that media version is supported
      if ( parseFloat(imageProps.MediaVersion) < 2.00 ) return;
      
      // get media properties
      mediaLevels = parseFloat(imageProps.NumLevels);
      srcDim = [ parseFloat(imageProps.ImageWidth), parseFloat(imageProps.ImageHeight) ];
      imageItemId = imageProps.ImageItemId;
  
      imageAspectRatio = metrics.realDim[0] / metrics.realDim[1];
  
      // load item XML
      if ( !window.swatchData ) window.swatchData = {};
      
      this.includeJS( this.imageMediaURL + imageItemId + '.xmt', true, loadItemXML_handler, this );
    }
  }
  
  // Handler is getting called, when the preLoadEvent occurs, or direct if no event was set
  D.startMediaLoading = function(){
  	if (D.preLoadEventType != undefined){
       		this.removeEventListener(D.elem, D.preLoadEventType, D.startMediaLoading, this);
       	}
        
	D.elem = document.getElementById(D.elem.id);
	D.mediaID = RICHFX.DecodeMedia( D.elem );
		
	// load media XML
	this.loadXML( this.imageMediaURL + D.mediaID + '/zoom.info.js', D.mediaID, D.loadXML_handler, this );
  }
    
  if (D.preLoadEventType == undefined){
	D.startMediaLoading.apply(this);
  } else {
	this.addEventListener(D.elem, D.preLoadEventType, D.startMediaLoading, this, D.preLoadValue);
  }
  
  if ( this.isIE && D.elem.nodeName == 'IMG' ) D.elem.galleryimg = 'no';
}

RICHFX.prototype.component_imageColorChange.require = [ 'DecodeMedia', 'ClickLayer', 'ImageSlider', 'Tracking' ];
RICHFX.addCSSRule( '.RICHFXColorChangeViewSelected', 'border: 1px solid #000000;' );
RICHFX.addCSSRule( '.RICHFXColorChangeCategorySelected', 'border: 1px solid #000000;' );
RICHFX.addCSSRule( '.RICHFXColorChangeSwatchSelected', 'border: 1px solid #000000;' );
RICHFX.addCSSRule( '.RICHFXColorChangeCategory_hover', 'border: 1px solid #555555;' );
RICHFX.addCSSRule( '.RICHFXColorChangeView_hover', 'border: 1px solid #888888;' );
RICHFX.addCSSRule( '.RICHFXColorChangeSwatch_hover', 'border: 1px solid #888888;' );
RICHFX.addCSSRule( '.RICHFXColorChange', 'border-width: 0px' );
RICHFX.addCSSRule( '.RICHFXColorChangeSwatch', 'margin: 0px 5px 5px 0px; padding: 2px; border: 1px solid #cecece; cursor: pointer;' );
RICHFX.addCSSRule( '.RICHFXColorChangeView', 'border: 1px solid #cecece; margin-top: 5px; margin-right: 3px; margin-bottom: 5px; cursor: pointer; float: left' );
//RICHFX.addCSSRule( '.RICHFXColorChangeView', 'display:block; border: 1px solid #cecece; margin-top: 5px; margin-right: 3px; margin-bottom: 5px; cursor: pointer;' );
RICHFX.addCSSRule( '.RICHFXColorChangeCategory', 'font-family: Verdana, Arial, Helvetica; font-size: 12px; text-decoration: none; padding: 5px 10px; height: 10px; margin-right: 10px; border: 1px solid #888888; background-color: #DDDDDD; color: black; cursor: pointer;' );
RICHFX.addCSSRule( '.RICHFXTooltip', 'min-width: 50px; margin: 1em; padding: 3px; border: 1px solid black; background-color: white; z-index:1000');