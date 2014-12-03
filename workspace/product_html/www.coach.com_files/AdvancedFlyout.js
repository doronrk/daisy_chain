/*
ADOBE CONFIDENTIAL
Copyright 2011 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  All information contained herein is, and remains the property of Adobe Systems Incorporated and its suppliers,
if any.  The intellectual and technical concepts contained herein are proprietary to Adobe Systems Incorporated and its
suppliers and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or 
copyright law. Dissemination of this information or reproduction of this material is strictly forbidden unless prior 
written permission is obtained from Adobe Systems Incorporated.
*/
s7js.flyout.AdvancedFlyout = function() {
	this.targetId = null;
	this.assetList = [];

	this.config = new s7js.flyout.Config();
	this.staticImageContainer = null;
	this.staticImage = null;
	this.frame = null;
	this.flyoutView = null;
	this.swatchesContainer = null;
	this.swatches = null;
	this.infoMessage = null;

	this.initialized = false;
	this.enabled = true;

	this.setupDefaults();
}

s7js.flyout.AdvancedFlyout.VIEWER_TYPE = '40';
s7js.flyout.AdvancedFlyout.VIEWER_VERSION = '5.1.1';

s7js.flyout.AdvancedFlyout.prototype.setTargetId = function(inTargetId) {
	this.targetId = inTargetId;
};

s7js.flyout.AdvancedFlyout.prototype.setAsset = function(inAsset) {
	if (!this.initialized) {
		s7js.flyout.Utils.log('not initialized');
	} else {
		var selfRef = this;
		
		selfRef.staticImage.onLoadComplete = function() {
			delete selfRef.staticImage.onLoadComplete;
			selfRef.onLoadComplete();
		};
		
		this.loadAsset(
			inAsset,
			function(inAsset, inNewAssetList) {
				if (selfRef.swatches != null) {
					selfRef.disposeSwatches();
				}

				selfRef.assetList.splice(0, selfRef.assetList.length);
				for (var i = 0; i < inNewAssetList.length; i ++) {
					selfRef.assetList.push(inNewAssetList[i]);
				}

				var serverUrl = selfRef.config.getParameter('serverUrl');
				var imageName = s7js.flyout.Utils.appendPath(serverUrl, selfRef.assetList[0].imageName);
				imageName = s7js.flyout.Utils.appendQuery(imageName, 'iv=' + selfRef.assetList[0].iv);
				selfRef.staticImage.setImageUrl(imageName);
				selfRef.flyoutView.setImageUrl(imageName);

				if (selfRef.assetList.length > 1) {
					selfRef.createSwatches();
				}
				selfRef.updateContainerSize();
			},
			function(inMessage) {
				selfRef.onLoadFail('unable to load asset information [' + inMessage + ']');
			}
		);
	}
};

s7js.flyout.AdvancedFlyout.prototype.getParameter = function(inParamName) {
	return this.config.getParameter(inParamName);
};

s7js.flyout.AdvancedFlyout.prototype.setParameter = function(inParamName, inValue) {
	this.config.setExplicitParameter(inParamName, inValue);
};

s7js.flyout.AdvancedFlyout.prototype.isEnabled = function() {
	return this.enabled;
};

s7js.flyout.AdvancedFlyout.prototype.setEnabled = function(inEnabled) {
	this.enabled = inEnabled;
	if (this.frame != null) {
		this.frame.setEnabled(this.enabled);
	}
	if (this.swatches != null) {
		this.swatches.setEnabled(this.enabled);
	}
};

s7js.flyout.AdvancedFlyout.prototype.init = function() {
	//disable native selection in the whole viewer
	var container = document.getElementById(this.targetId);
	container.style.WebkitUserSelect = 'none';
	container.style.MozUserSelect = 'none';
	s7js.flyout.Utils.addEventListener(container, 'selectstart', function(inE) {
		s7js.flyout.Utils.preventDefault(inE);
	}, false);
	

	var selfRef = this;
	this.config.onInitComplete = function() {
		selfRef.createStaticImage();
		selfRef.staticImage.onLoadComplete = function() {
			delete selfRef.staticImage.onLoadComplete;
			if ((selfRef.infoMessage != null) && !selfRef.infoMessage.wasDisplayed()) {
				selfRef.infoMessage.show();
			}
			selfRef.onLoadComplete();
		};
		
		selfRef.createFlyoutView();

		selfRef.loadAsset(
			selfRef.config.getParameter('asset'),
			function(inAsset, inNewAssetList) {
				selfRef.assetList.splice(0, selfRef.assetList.length);
				for (var i = 0; i < inNewAssetList.length; i ++) {
					selfRef.assetList.push(inNewAssetList[i]);
				}

				var serverUrl = selfRef.config.getParameter('serverUrl');
				var imageName = s7js.flyout.Utils.appendPath(serverUrl, selfRef.assetList[0].imageName);
				imageName = s7js.flyout.Utils.appendQuery(imageName, 'iv=' + selfRef.assetList[0].iv);
				selfRef.staticImage.setImageUrl(imageName);
				selfRef.flyoutView.setImageUrl(imageName);

				if (selfRef.assetList.length > 1) {
					selfRef.createSwatches();
				}

				selfRef.createFlyoutFrame();
				selfRef.createInfoMessage();
				selfRef.updateContainerSize();
	
				selfRef.sendLoadEvent(inAsset);

				selfRef.initialized = true;
			},
			function(inMessage) {
				selfRef.onLoadFail('unable to load asset information [' + inMessage + ']');
			}
		);
	};
	this.config.onInitFail = function(inMessage) {
		selfRef.onLoadFail('failed initializing configuration [' + inMessage + ']');
	};
	this.config.init();
};

s7js.flyout.AdvancedFlyout.prototype.onLoadComplete = function() {
};

s7js.flyout.AdvancedFlyout.prototype.onLoadFail = function(inMessage) {
};

s7js.flyout.AdvancedFlyout.prototype.onFlyoutStart = function() {
};

s7js.flyout.AdvancedFlyout.prototype.onFlyoutEnd = function() {
};

s7js.flyout.AdvancedFlyout.prototype.onSwatchSelect = function(inSelectedIdx) {
};

//private methods

s7js.flyout.AdvancedFlyout.prototype.createStaticImage = function() {
	var container = document.getElementById(this.targetId);

	this.staticImageContainer = document.createElement('div');
	this.staticImageContainer.className = 's7flyoutStaticImage';
	container.appendChild(this.staticImageContainer);

	this.staticImage = new s7js.flyout.StaticImage(this.staticImageContainer);
	this.staticImage.setTransparent(this.config.getParameter('transparent').toLowerCase() == 'true');
	this.staticImage.setFadeTime(this.config.getParameter('imageFadeTime') * 1000);
	var selfRef = this;
	this.staticImage.onLoadFail = function(inMessage) {
		selfRef.onLoadFail('failed loading static image [' + inMessage + ']');
	};
};

s7js.flyout.AdvancedFlyout.prototype.createFlyoutFrame = function() {
	this.frame = new s7js.flyout.FlyoutFrame(this.staticImageContainer);
	this.frame.setEnabled(this.enabled);
	var selfRef = this;
	this.frame.onShow = function() {
		selfRef.flyoutView.show();
	};
	this.frame.onHide = function() {
		selfRef.flyoutView.hide();
	};
	this.frame.onMove = function(inNormCoords) {
		selfRef.flyoutView.setPosition(inNormCoords);
	};
	var flyoutSize = this.flyoutView.getFlyoutSize();
	this.frame.setFrameSize({
		width : flyoutSize.width / this.config.getParameter('zoomFactor'),
		height : flyoutSize.height / this.config.getParameter('zoomFactor')
	});
	if (s7js.flyout.Utils.isTouchDevice()) {
		this.frame.setCursorFadeTime(1000 * this.config.getParameter('cursorFadeTime'));
	} else {
		this.frame.setCursorFadeTime(0);
	}

	if (s7js.flyout.Utils.isTouchDevice()) {
		this.frame.setShowCallbackDelay(this.config.getParameter('flyoutShowDelay') * 1000);
		this.frame.setHideCallbackDelay(this.config.getParameter('flyoutHideDelay') * 1000);
	} else {
		this.frame.setShowCallbackDelay(0);
		this.frame.setHideCallbackDelay(0);
	}

	this.frame.setUseFixedCursor(this.config.getParameter('useFixedCursor').toLowerCase() == 'true');
};

s7js.flyout.AdvancedFlyout.prototype.createFlyoutView = function() {
	this.flyoutView = new s7js.flyout.FlyoutView(this.staticImageContainer);

	var zoomFactor = this.config.getParameter('zoomFactor');
	if (s7js.flyout.Utils.isIOS()) {
		var staticImageSize = this.staticImage.getSize();
		var flyoutPixels = staticImageSize.width * staticImageSize.height * zoomFactor * zoomFactor;
		//2MP is iOS limit
		var iOSLimit = 2000000;
		if (flyoutPixels >= iOSLimit) {
			zoomFactor = Math.pow(iOSLimit / staticImageSize.width / staticImageSize.height, 0.5);
		}
	}
	this.flyoutView.setZoomFactor(zoomFactor);
	
	this.flyoutView.setShowTime(this.config.getParameter('flyoutShowTime') * 1000);
	this.flyoutView.setHideTime(this.config.getParameter('flyoutHideTime') * 1000);
	
	var selfRef = this;
	this.flyoutView.onFlyoutStart = function() {
		selfRef.onFlyoutStart();
	};
	this.flyoutView.onFlyoutEnd = function() {
		selfRef.onFlyoutEnd();
	};
};

s7js.flyout.AdvancedFlyout.prototype.createSwatches = function() {
	var container = document.getElementById(this.targetId);

	this.swatchesContainer = document.createElement('div');
	this.swatchesContainer.className = 's7flyoutSwatches';
	container.appendChild(this.swatchesContainer);

	this.swatches = new s7js.flyout.Swatches(this.swatchesContainer);
	this.swatches.setEnabled(this.enabled);
	this.swatches.setScrollTime(this.config.getParameter('scrollTime') * 1000);
	this.swatches.setFrictionCoef(this.config.getParameter('frictionCoef') / 1000);
	this.swatches.setUsePager(!s7js.flyout.Utils.isTouchDevice());
	
	var serverUrl = this.config.getParameter('serverUrl');
	var swatchUrlList = [];
	for (var i = 0; i < this.assetList.length; i ++) {
		var asset = this.assetList[i];
		var swatchUrl = s7js.flyout.Utils.appendPath(serverUrl, asset.swatchName);
		swatchUrl = s7js.flyout.Utils.appendQuery(swatchUrl, 'iv=' + asset.iv);
		swatchUrlList.push(swatchUrl);
	}
	this.swatches.setSwatchUrlList(swatchUrlList);

	var selfRef = this;
	this.swatches.setSelectedSwatch(0);
	this.swatches.onSelect = function(inIdx) {
		selfRef.staticImage.setImageUrl(s7js.flyout.Utils.appendPath(serverUrl, selfRef.assetList[inIdx].imageName));
		selfRef.flyoutView.setImageUrl(s7js.flyout.Utils.appendPath(serverUrl, selfRef.assetList[inIdx].imageName));
		selfRef.onSwatchSelect(inIdx);
	};
};

s7js.flyout.AdvancedFlyout.prototype.createInfoMessage = function() {
	var displayTime = 1000 * this.config.getParameter('messageDisplayTime');
	if (displayTime > 0) {
		this.infoMessage = new s7js.flyout.InfoMessage(this.staticImageContainer);
		if (s7js.flyout.Utils.isTouchDevice()) {
			this.infoMessage.setText(this.config.getParameter('messageTextTouch'));
		} else {
			this.infoMessage.setText(this.config.getParameter('messageTextDesktop'));
		}
		this.infoMessage.setDisplayTime(1000 * this.config.getParameter('messageDisplayTime'));
		this.infoMessage.setFadeTime(1000 * this.config.getParameter('messageFadeTime'));
	}
};

s7js.flyout.AdvancedFlyout.prototype.disposeSwatches = function() {
	var container = document.getElementById(this.targetId);

	this.swatches.dispose();
	delete this.swatches;

	container.removeChild(this.swatchesContainer);
	delete this.swatchesContainer;
};

s7js.flyout.AdvancedFlyout.prototype.loadAsset = function(inAsset, inCompleteHandler, inErrorHandler) {
		var selfRef = this;
		var setRequestInfo = this.getSetRequestInfo(inAsset);
		sjGetResponse(
			'',
			setRequestInfo.setUrl,
			function(inObj) {
				var newAssetList = selfRef.processSetResponse(inObj, setRequestInfo.effectiveModifier, selfRef.config.getParameter('swatchModifier'));
				inCompleteHandler(inAsset, newAssetList);
			},
			function() {
				inErrorHandler('failed loading req=set from [' + setRequestInfo.setUrl + ']');
			}
		);

};

s7js.flyout.AdvancedFlyout.prototype.getSetRequestInfo = function(inAsset) {
	var serverUrl = this.config.getParameter('serverUrl');

	var rawAsset;
	var assetModifier;
	if (inAsset.indexOf('?') != -1) {
		rawAsset = inAsset.substring(0, inAsset.indexOf('?'));
		assetModifier = inAsset.substring(inAsset.indexOf('?') + 1);
	} else {
		rawAsset = inAsset;
		assetModifier = null;
	}

	var modifier = this.config.getParameter('modifier');

	var effectiveModifier = null;
	if (modifier != null) {
		effectiveModifier = modifier;
	}
	if (assetModifier != null) {
		if (effectiveModifier == null) {
			effectiveModifier = assetModifier;
		} else {
			effectiveModifier += '&' + assetModifier;
		}
	}

	var setUrl;
	if ((rawAsset.indexOf(',') == -1) && (rawAsset.indexOf(';') == -1)) {
		setUrl = s7js.flyout.Utils.appendPath(serverUrl, rawAsset) + '?req=set,json&scl=1';
	} else {
		setUrl = s7js.flyout.Utils.appendPath(serverUrl, SjUtils.getCompanyName(rawAsset)) + '?req=set,json&scl=1&imageSet=' + rawAsset;
	}
	if (effectiveModifier != null) {
		setUrl += '&' + effectiveModifier;
	}

	return {
		setUrl : setUrl,
		rawAsset : rawAsset,
		effectiveModifier : effectiveModifier
	};
};

s7js.flyout.AdvancedFlyout.prototype.processSetResponse = function(inResponse, inModifier, inSwatchModifier) {
	var assets = [];
	if (inResponse.set.item.length != undefined) {
		for (var i = 0; i < inResponse.set.item.length; i ++) {
			assets.push(this.processSetItem(inResponse.set.item[i], inModifier, inSwatchModifier));
		}
	} else {
		assets.push(this.processSetItem(inResponse.set.item, inModifier, inSwatchModifier));
	}
	return assets;
};

s7js.flyout.AdvancedFlyout.prototype.processSetItem = function(inItem, inModifier, inSwatchModifier) {
	var imageName = inItem.i.n + (inModifier == null ? '' : '?' + inModifier);
	var swatchName;
	if (inItem.s != null) {
		swatchName = inItem.s.n;
	} else {
		swatchName = inItem.i.n;
	}
	swatchName = swatchName + (inModifier == null ? '' : '?' + inModifier);
	if (inSwatchModifier != null) {
		swatchName = s7js.flyout.Utils.appendQuery(swatchName, inSwatchModifier);
	}
	return {
		imageName : imageName,
		swatchName : swatchName,
		iv : inItem.iv
	};
};

s7js.flyout.AdvancedFlyout.prototype.sendLoadEvent = function(inAsset) {
	var i = new Image();
	var serverUrl = this.config.getParameter('serverUrl');
	var url = s7js.flyout.Utils.appendPath(serverUrl, SjUtils.getCompanyName(inAsset));
	url += '?req=message&message=' + this.createSessionId();
	url += ',0,LOAD,' + s7js.flyout.AdvancedFlyout.VIEWER_TYPE;
	url += ',' + encodeURIComponent(s7js.flyout.AdvancedFlyout.VIEWER_VERSION);
	url += ',0';//mask
	url += ',-1';//time since last visit
	url += ',-1';//visit counter
	url += ',-1';//FP version
	url += ',' + encodeURIComponent(inAsset);
	i.src = url;
};

s7js.flyout.AdvancedFlyout.prototype.createSessionId = function() {
	//power should be multiple of 16.
	var power = 64;
	var str = '';
	for (var i = 0; i < power / 16; i ++) {
		var id = Math.round(Math.pow(2, 16) * Math.random());
		var hex = id.toString(16);
		while (hex.length < 4) {
			hex = '0' + hex;
		}
		str += hex;
	}
	return str;
};

s7js.flyout.AdvancedFlyout.prototype.updateContainerSize = function() {
	var containerWidth = Math.max(this.staticImageContainer.offsetWidth, (this.swatchesContainer != null ? this.swatchesContainer.offsetWidth : 0));
	var containerHeight = this.staticImageContainer.offsetHeight + (this.swatchesContainer != null ? this.swatchesContainer.offsetHeight : 0);
	var container = document.getElementById(this.targetId);
	container.style.width = containerWidth + 'px';
	container.style.height = containerHeight + 'px';
};

s7js.flyout.AdvancedFlyout.prototype.setupDefaults = function() {
	this.config.setDefaultParameter('serverUrl', '/is/image/');
	this.config.setDefaultParameter('transparent', 'true');
	this.config.setDefaultParameter('flyoutShowTime', '0.25');
	this.config.setDefaultParameter('flyoutHideTime', '0.15');
	this.config.setDefaultParameter('zoomFactor', '3');
	this.config.setDefaultParameter('imageFadeTime', '0.35');
	this.config.setDefaultParameter('scrollTime', '0.5');
	this.config.setDefaultParameter('useFixedCursor', 'true');
	this.config.setDefaultParameter('frictionCoef', '1');
	//tablet-specific, will be ignored on desktop
	this.config.setDefaultParameter('flyoutShowDelay', '0.1');
	this.config.setDefaultParameter('flyoutHideDelay', '0.75');
	this.config.setDefaultParameter('cursorFadeTime', '0.1');
	this.config.setDefaultParameter('messageDisplayTime', '3');
	this.config.setDefaultParameter('messageFadeTime', '0.25');
	this.config.setDefaultParameter('messageTextDesktop', 'Mouse over to zoom');
	this.config.setDefaultParameter('messageTextTouch', 'Tap and hold to zoom');
};