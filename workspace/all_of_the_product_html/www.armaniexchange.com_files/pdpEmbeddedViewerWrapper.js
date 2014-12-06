function PDPEmbeddedViewerWrapper() {
	this.containerId; //flyout container id
	this.serverUrl; // image server URL
	this.viewer; // viewer instance
	this.currentAsset; //currently displayed asset
	this.flyoutShowDelay = 2;
	this.flyoutHideDelay = 0;
	this.ZOOM1 = 2;
	//constant - larger zoom
	this.ZOOM2 = 4;
	//flag that keeps the zoom state
	this.zoomState = 0;
	//the 0-based index of currently active image
	this.selectedSwatch = 0;
};

PDPEmbeddedViewerWrapper.prototype.setContainerId = function(inId) {
	this.containerId = inId;
};

PDPEmbeddedViewerWrapper.prototype.setServerUrl = function(inServerUrl) {
	this.serverUrl = inServerUrl;
};

PDPEmbeddedViewerWrapper.prototype.setIntialAsset = function(inAsset) {
	this.currentAsset = inAsset;
};

PDPEmbeddedViewerWrapper.prototype.setCurrentAsset = function(inAsset) {
	this.currentAsset = inAsset;
	if (this.viewer) {
		this.viewer.setAsset(this.currentAsset);
	}
};

PDPEmbeddedViewerWrapper.prototype.setFlyoutShowDelay = function(inDelay) {
	this.flyoutShowDelay = inDelay;
};

PDPEmbeddedViewerWrapper.prototype.setFlyoutHideDelay = function(inDelay) {
	this.flyoutHideDelay = inDelay;
};


PDPEmbeddedViewerWrapper.prototype.setParamNameValues = function(inParamNameValues) {
	this.paramNameValues = inParamNameValues;
};

PDPEmbeddedViewerWrapper.prototype.getCurrentAsset = function() {
	return this.currentAsset;
};

PDPEmbeddedViewerWrapper.prototype.draw = function() {
	this.viewer = new s7js.flyout.AdvancedFlyout();
	this.viewer.setTargetId(this.containerId);
	this.viewer.setParameter('serverUrl', this.serverUrl);
	this.viewer.setParameter('asset', this.currentAsset);
	this.viewer.setParameter("useFixedCursor", "true");
	var classRef = this;
	
	this.viewer.createFlyoutFrame_copy = this.viewer.createFlyoutFrame;
	this.viewer.createFlyoutFrame = function() {
		this.createFlyoutFrame_copy();
		this.frame.setShowCallbackDelay(classRef.flyoutShowDelay * 1000);
		this.frame.setHideCallbackDelay(classRef.flyoutHideDelay * 1000);
	};
	
	// Set the parameters
	if(this.paramNameValues !=null){
		for (var i = 0; i < this.paramNameValues.length; i++) {
			this.viewer.setParameter(this.paramNameValues[i].name,this.paramNameValues[i].value);
		}	
	
	}
	if (window.attachEvent) {
		document.getElementById('pdpViewerContainer').attachEvent('onclick', function() {classRef.toggleZoomState(window.event);});	
	} else {
		document.getElementById(this.containerId).addEventListener('click', function(e) {classRef.toggleZoomState(e);}, false);
	}
	this.viewer.init();
};

PDPEmbeddedViewerWrapper.prototype.setSmallCursor = function(inCursor, inWid, inHei) {
	this.smallCursorObj = {cursor:inCursor, wid:inWid, hei:inHei};
};

PDPEmbeddedViewerWrapper.prototype.setLargeCursor = function(inCursor, inWid, inHei) {
	this.largeCursorObj = {cursor:inCursor, wid:inWid, hei:inHei};
};


PDPEmbeddedViewerWrapper.prototype.setCursor = function(inCursor, inWid, inHei) {

	var cursor = this.viewer.frame.cursor;
	if ((inWid != null) && (inHei != null)) {
		cursor.style.width = inWid + 'px';
		cursor.style.height = inHei + 'px';
	}	
	cursor.style.backgroundImage = 'url(' + inCursor + ')';

	this.viewer.frame.cursorSize.width = inWid;
	this.viewer.frame.cursorSize.height = inHei;
	this.viewer.frame.setUseFixedCursor(true);
}


PDPEmbeddedViewerWrapper.prototype.toggleZoomState = function(e){
	var factor;
	//check to see what is the zoom state and select approrpiate zoom factor
	if (this.zoomState == 0) {
		this.zoomState = 1;	
		factor =  this.ZOOM2;
		this.setCursor(this.smallCursorObj.cursor, this.smallCursorObj.wid, this.smallCursorObj.hei);
	} else {
		this.zoomState = 0;	
		factor = this.ZOOM1;
		this.setCursor(this.largeCursorObj.cursor, this.largeCursorObj.wid, this.largeCursorObj.hei);
	}
	//this piece starts using private API
	//set new zoom factor on the FlyoutView component
	this.viewer.flyoutView.setZoomFactor(factor);
	//make FlyoutView component reload its image with the new zoom factor
	this.viewer.flyoutView.setImageUrl(s7js.flyout.Utils.appendPath(this.viewer.getParameter('serverUrl'), this.viewer.assetList[this.selectedSwatch].imageName));
	//set the new frame size for the FrameView component
	var flyoutSize = this.viewer.flyoutView.getFlyoutSize();
	this.viewer.frame.setFrameSize({
		width : flyoutSize.width / factor,
		height : flyoutSize.height / factor
	});
	//make the viewer to recalculate frame position even though the mouse did not move
	this.viewer.frame.moveHandler(e);
}
