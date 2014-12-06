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
s7js.flyout.FlyoutFrame = function(inParent) {
	this.container = document.createElement('div');
	this.container.style.position = 'absolute';
	this.container.style.top = '0px';
	this.container.style.left = '0px';
	this.container.style.overflow = 'hidden';
	inParent.appendChild(this.container);

	this.frameContainer = document.createElement('div');
	this.frameContainer.style.position = 'absolute';
	if (s7js.flyout.Utils.isIOS()) {
//		this.frameContainer.style.webkitTransform = 'translate3d(0,0,0)';
	}
	this.container.appendChild(this.frameContainer);

	this.shading = document.createElement('div');
	this.shading.style.position = 'absolute';
	this.frameContainer.appendChild(this.shading);

	this.shadingTop = document.createElement('div');
	this.shadingLeft = document.createElement('div');
	this.shadingRight = document.createElement('div');
	this.shadingBottom = document.createElement('div');

	this.shading.appendChild(this.shadingTop);
	this.shading.appendChild(this.shadingLeft);
	this.shading.appendChild(this.shadingRight);
	this.shading.appendChild(this.shadingBottom);

	this.shadingTop.className = 's7flyoutShading';
	this.shadingLeft.className = 's7flyoutShading';
	this.shadingRight.className = 's7flyoutShading';
	this.shadingBottom.className = 's7flyoutShading';

	this.shadingTop.style.position = 'absolute';
	this.shadingLeft.style.position = 'absolute';
	this.shadingRight.style.position = 'absolute';
	this.shadingBottom.style.position = 'absolute';
	
	if (s7js.flyout.Utils.isTouchDevice()) {
		this.shading.style.display = 'none';
	}

	this.frame = document.createElement('div');
	this.frameCorrection = null;
	this.frame.style.position = 'absolute';
	this.frameContainer.appendChild(this.frame);

	this.cursor = document.createElement('div');
	this.cursor.className = (s7js.flyout.Utils.isTouchDevice() ? 's7flyoutCursorTouch' : 's7flyoutCursorDesktop');
	this.cursor.style.position = 'absolute';
	this.frameContainer.appendChild(this.cursor);

	this.containerSize = {
		width : inParent.offsetWidth,
		height : inParent.offsetHeight
	};
	this.cursorSize = {
		width : this.cursor.offsetWidth,
		height : this.cursor.offsetHeight
	};
	this.frameSize = {
		width : 0,
		height : 0
	};
	this.showCallbackDelay = 100;
	this.hideCallbackDelay = 2000;
	this.useFixedCursor = true;

	this.layout();

	var selfRef = this;
	var showFrame = function(inE) {
		if (!selfRef.visible && selfRef.enabled) {
			selfRef.visible = true;
			
			selfRef.frameContainer.style.visibility = 'inherit';
			selfRef.frame.style.display = (selfRef.useFixedCursor ? 'none' : 'block');
			selfRef.cursor.style.display = (!selfRef.useFixedCursor ? 'none' : 'block');

			if (s7js.flyout.Utils.isTouchDevice()) {
				s7js.flyout.Utils.addEventListener(document, 'touchmove', selfRef.moveHandler, false);
				s7js.flyout.Utils.addEventListener(document, 'touchend', selfRef.upHandler, false);
			} else {
				s7js.flyout.Utils.addEventListener(document, 'mousemove', selfRef.moveHandler, false);
			}

			var relativeCoords = s7js.flyout.Utils.getRelativeEventCords(inE, selfRef.container);
			selfRef.lastNormCoords = selfRef.getNormMouseCords(relativeCoords);
			selfRef.lastNormCoords = selfRef.validateCoords(selfRef.lastNormCoords);
			selfRef.setPosition(selfRef.lastNormCoords);
			selfRef.showTransition.startTransition();
			if (selfRef.notifiedShow) {
				selfRef.onMove(selfRef.lastNormCoords);
			}
		}
		s7js.flyout.Utils.preventDefault(inE);
	};

	var hideFrame = function() {
		if (selfRef.visible) {
			selfRef.visible = false;
			selfRef.frameContainer.style.visibility = 'hidden';
			
			selfRef.showTransition.stopTransition();
			if (selfRef.showCallbackTimeoutId != null) {
				clearTimeout(selfRef.showCallbackTimeoutId);
				delete selfRef.showCallbackTimeoutId;
			}

			if (s7js.flyout.Utils.isTouchDevice()) {
				s7js.flyout.Utils.removeEventListener(document, 'touchmove', selfRef.moveHandler, false);
				s7js.flyout.Utils.removeEventListener(document, 'touchend', selfRef.upHandler, false);
			} else {
				s7js.flyout.Utils.removeEventListener(document, 'mousemove', selfRef.moveHandler, false);
			}
			if (selfRef.notifiedShow) {
				selfRef.hideCallbackTimeoutId = setTimeout(
					function() {
						delete selfRef.hideCallbackTimeoutId;
						selfRef.notifiedShow = false;
						selfRef.onHide();
					},
					selfRef.hideCallbackDelay
				);
			}
		}
	};
	
	this.upHandler = function() {
		hideFrame();
	};

	this.moveHandler = function(inE) {
		var relativeCoords = s7js.flyout.Utils.getRelativeEventCords(inE, selfRef.container);
		if (!s7js.flyout.Utils.isTouchDevice() && !selfRef.isOverView(relativeCoords)) {
			hideFrame();
		} else {
			selfRef.lastNormCoords = selfRef.getNormMouseCords(relativeCoords);
			selfRef.lastNormCoords = selfRef.validateCoords(selfRef.lastNormCoords);
			selfRef.setPosition(selfRef.lastNormCoords);
			if (selfRef.notifiedShow) {
				selfRef.onMove(selfRef.lastNormCoords);
			}
		}
		s7js.flyout.Utils.stopPropagation(inE);
		s7js.flyout.Utils.preventDefault(inE);
	};
	
	if (s7js.flyout.Utils.isTouchDevice()) {
		s7js.flyout.Utils.addEventListener(inParent, 'touchstart', showFrame, false);
	} else {
		s7js.flyout.Utils.addEventListener(inParent, 'mousemove', showFrame, false);
	}

	this.visible = false;
	this.enabled = true;
	this.lastNormCoords = null;
	this.notifiedShow = false;
	this.showCallbackTimeoutId = null
	this.hideCallbackIntervalId = null
	this.frameContainer.style.visibility = 'hidden';

	this.showTransition = new s7js.flyout.Transition(0);
	this.showTransition.setType(new s7js.flyout.TransitionTypeLinear(0, 1));
	this.showTransition.onChange = function(inTransition) {
		s7js.flyout.Utils.setOpacity(selfRef.frameContainer, inTransition.getValue());
		if (!inTransition.isWorking() && selfRef.visible) {
			if (!selfRef.notifiedShow) {
				selfRef.showCallbackTimeoutId = setTimeout(
					function() {
						delete selfRef.showCallbackTimeoutId;
						selfRef.onShow();
						selfRef.onMove(selfRef.lastNormCoords);
						selfRef.notifiedShow = true;
					},
					selfRef.showCallbackDelay
				);
			} else {
				if (selfRef.hideCallbackTimeoutId != null) {
					clearTimeout(selfRef.hideCallbackTimeoutId);
					delete selfRef.hideCallbackTimeoutId;
				}
			}
		}
	};
}

s7js.flyout.FlyoutFrame.prototype.setFrameSize = function(inFrameSize) {
	this.frameSize.width = inFrameSize.width;
	this.frameSize.height = inFrameSize.height;
	this.layout();
};

s7js.flyout.FlyoutFrame.prototype.setCursorFadeTime = function(inCursorFadeTime) {
	this.showTransition.setTotalTime(inCursorFadeTime);
};

s7js.flyout.FlyoutFrame.prototype.setShowCallbackDelay = function(inShowCallbackDelay) {
	this.showCallbackDelay = inShowCallbackDelay;
};

s7js.flyout.FlyoutFrame.prototype.setHideCallbackDelay = function(inHideCallbackDelay) {
	this.hideCallbackDelay = inHideCallbackDelay;
};

s7js.flyout.FlyoutFrame.prototype.setUseFixedCursor = function(inUseFixedCursor) {
	this.useFixedCursor = inUseFixedCursor;
	this.layoutShading(this.useFixedCursor ? this.cursorSize : this.frameSize);
};

s7js.flyout.FlyoutFrame.prototype.setEnabled = function(inEnabled) {
	this.enabled = inEnabled;
};

s7js.flyout.FlyoutFrame.prototype.onShow = function() {
};

s7js.flyout.FlyoutFrame.prototype.onHide = function() {
};

s7js.flyout.FlyoutFrame.prototype.onMove = function(inNormCoords) {
};

//private methods

s7js.flyout.FlyoutFrame.prototype.getNormMouseCords = function(inRelativeCoords) {
	var normCoords = new Object();
	if (this.useFixedCursor) {
		normCoords.x = (inRelativeCoords.x - this.cursorSize.width / 2) / (this.containerSize.width - this.cursorSize.width);
		if (s7js.flyout.Utils.isTouchDevice()) {
			normCoords.y = (inRelativeCoords.y - this.cursorSize.height) / (this.containerSize.height - this.cursorSize.height);
		} else {
			normCoords.y = (inRelativeCoords.y - this.cursorSize.height / 2) / (this.containerSize.height - this.cursorSize.height);
		}
	} else {
		normCoords.x = (inRelativeCoords.x - this.frameSize.width / 2) / (this.containerSize.width - this.frameSize.width);
		normCoords.y = (inRelativeCoords.y - this.frameSize.height / 2) / (this.containerSize.height - this.frameSize.height);
	}
	return normCoords;
};

s7js.flyout.FlyoutFrame.prototype.setPosition = function(inNormCoords) {
	this.frameContainer.style.left = (inNormCoords.x * (this.containerSize.width - this.cursorSize.width)) + 'px';
	this.frameContainer.style.top = (inNormCoords.y * (this.containerSize.height - this.cursorSize.height)) + 'px';
	this.frame.style.left = this.frameCorrection.x + (this.cursorSize.width - this.frameSize.width) * inNormCoords.x + 'px';
	this.frame.style.top = this.frameCorrection.y + (this.cursorSize.height - this.frameSize.height) * inNormCoords.y + 'px';
	if (!this.useFixedCursor) {
		this.shading.style.left = (this.cursorSize.width - this.frameSize.width) * inNormCoords.x + 'px';
		this.shading.style.top = (this.cursorSize.height - this.frameSize.height) * inNormCoords.y + 'px';
	}
};

s7js.flyout.FlyoutFrame.prototype.isOverView = function(inRelativeCoords) {
	return ((inRelativeCoords.x >= 0) && (inRelativeCoords.x <= this.containerSize.width) && (inRelativeCoords.y >= 0) && (inRelativeCoords.y <= this.containerSize.height));
};

s7js.flyout.FlyoutFrame.prototype.validateCoords = function(inNormCoords) {
	return {
		x : Math.max(Math.min(inNormCoords.x, 1), 0),
		y : Math.max(Math.min(inNormCoords.y, 1), 0)
	};
};

s7js.flyout.FlyoutFrame.prototype.layout = function() {
	this.container.style.width = this.containerSize.width + 'px';
	this.container.style.height = this.containerSize.height + 'px';
	if ((this.frameSize.width > 0) && (this.frameSize.height > 0)) {
		this.frameCorrection = s7js.flyout.Utils.prototype.setupBorder(this.frame, 's7flyoutFrame', this.frameSize.width, this.frameSize.height, true);
	}
	this.layoutShading(this.useFixedCursor ? this.cursorSize : this.frameSize);
};

s7js.flyout.FlyoutFrame.prototype.layoutShading = function(inClipSize) {
	this.shadingTop.style.top = - (this.containerSize.height - inClipSize.height) + 'px';
	this.shadingTop.style.left = - (this.containerSize.width - inClipSize.width) + 'px';
	this.shadingTop.style.width = (2 * this.containerSize.width - inClipSize.width) + 'px';
	this.shadingTop.style.height = (this.containerSize.height - inClipSize.height) + 'px';
	this.shadingLeft.style.top = '0px';
	this.shadingLeft.style.left = - (this.containerSize.width - inClipSize.width) + 'px';
	this.shadingLeft.style.width = (this.containerSize.width - inClipSize.width) + 'px';
	this.shadingLeft.style.height = inClipSize.height + 'px';
	this.shadingRight.style.top = '0px';
	this.shadingRight.style.left = inClipSize.width + 'px';
	this.shadingRight.style.width = (this.containerSize.width - inClipSize.width) + 'px';
	this.shadingRight.style.height = inClipSize.height + 'px';
	this.shadingBottom.style.top = inClipSize.height + 'px';
	this.shadingBottom.style.left = - (this.containerSize.width - inClipSize.width) + 'px';
	this.shadingBottom.style.width = (2 * this.containerSize.width - inClipSize.width) + 'px';
	this.shadingBottom.style.height = (this.containerSize.height - inClipSize.height) + 'px';
};
