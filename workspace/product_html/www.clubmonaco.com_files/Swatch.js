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
s7js.flyout.Swatch = function(inParent) {
	this.container = document.createElement('div');
	this.container.className = 's7flyoutSwatch';
	this.container.style.position = 'absolute';
	inParent.appendChild(this.container);

	this.swatchSize = {
		width : this.container.offsetWidth,
		height : this.container.offsetHeight
	};

	this.background = document.createElement('div');
	this.background.style.position = 'absolute';
	this.container.appendChild(this.background);

	this.imageContainer = document.createElement('div');
	this.imageContainer.style.position = 'absolute';
	this.container.appendChild(this.imageContainer);

	this.activeBorder = document.createElement('div');
	this.container.appendChild(this.activeBorder);

	this.overBorder = document.createElement('div');
	this.container.appendChild(this.overBorder);
	
	var selfRef = this;
	this.image = document.createElement('img');
	this.imageContainer.appendChild(this.image);
	s7js.flyout.Utils.disableDragBehavior(this.image);
	this.loadListener = function() {
		selfRef.onLoadComplete(selfRef);
	};
	s7js.flyout.Utils.addEventListener(this.image, 'load', this.loadListener, false);

	this.activateListener = function() {
		if (selfRef.enabled) {
			selfRef.onClick(selfRef);
		}
	};
	if (s7js.flyout.Utils.isTouchDevice()) {
		s7js.flyout.Utils.addEventListener(this.container, 'touchend', this.activateListener, false);
		this.touchStartListener = function(inE) {
			s7js.flyout.Utils.preventDefault(inE);
		};
		s7js.flyout.Utils.addEventListener(this.container, 'touchstart', this.touchStartListener, false);
	} else {
		s7js.flyout.Utils.addEventListener(this.container, 'mouseup', this.activateListener, false);
	}

	this.overListener = function() {
		if (selfRef.enabled) {
			selfRef.onOver(selfRef);
		}
	};
	if (!s7js.flyout.Utils.isTouchDevice()) {
		s7js.flyout.Utils.addEventListener(this.container, 'mouseover', this.overListener, false);
	}

	this.active = false;
	this.enabled = true;
	this.activeBorder.style.visibility = 'hidden';
	this.overBorder.style.visibility = 'hidden';

	this.layout();
}

s7js.flyout.Swatch.prototype.setUrl = function(inUrl) {
	this.image.src = s7js.flyout.Utils.appendQuery(inUrl, 'wid=' + this.swatchSize.width + '&hei=' + this.swatchSize.height);
};

s7js.flyout.Swatch.prototype.setActive = function(inActive) {
	if (this.active != inActive) {
		this.active = inActive;
		this.activeBorder.style.visibility = (this.active ? 'inherit' : 'hidden');
	}
};

s7js.flyout.Swatch.prototype.setOver = function(inOver) {
	this.overBorder.style.visibility = (inOver ? 'inherit' : 'hidden');
};

s7js.flyout.Swatch.prototype.setEnabled = function(inEnabled) {
	this.enabled = inEnabled;
};

s7js.flyout.Swatch.prototype.onClick = function(inSwatch) {
};

s7js.flyout.Swatch.prototype.onOver = function(inSwatch) {
};

s7js.flyout.Swatch.prototype.onLoadComplete = function(inSwatch) {
};

s7js.flyout.Swatch.prototype.onLoadFail = function(inSwatch) {
};

s7js.flyout.Swatch.prototype.dispose = function() {
	s7js.flyout.Utils.removeEventListener(this.image, 'load', this.loadListener, false);
	if (s7js.flyout.Utils.isTouchDevice()) {
		s7js.flyout.Utils.removeEventListener(this.container, 'touchend', this.activateListener, false);
		s7js.flyout.Utils.removeEventListener(this.container, 'touchstart', this.touchStartListener, false);
	} else {
		s7js.flyout.Utils.removeEventListener(this.container, 'mouseup', this.activateListener, false);
		s7js.flyout.Utils.removeEventListener(this.container, 'mouseover', this.overListener, false);
	}
};

//private methods

s7js.flyout.Swatch.prototype.layout = function(inSwatch) {
	s7js.flyout.Utils.prototype.setupBorder(this.background, 's7flyoutSwatchBackground', this.swatchSize.width, this.swatchSize.height, false);
	s7js.flyout.Utils.prototype.setupBorder(this.activeBorder, 's7flyoutSwatchActiveBorder', this.swatchSize.width, this.swatchSize.height, false);
	s7js.flyout.Utils.prototype.setupBorder(this.overBorder, 's7flyoutSwatchOverBorder', this.swatchSize.width, this.swatchSize.height, false);
};
