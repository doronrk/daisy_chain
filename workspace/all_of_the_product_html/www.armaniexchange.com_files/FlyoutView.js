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
s7js.flyout.FlyoutView = function(inParent) {
	this.parentSize = {
		width : inParent.offsetWidth,
		height : inParent.offsetHeight
	};

	this.offset = s7js.flyout.Utils.measureDivPosition(inParent, 's7flyoutFlyoutViewOffset');
	
	this.flyoutSize = s7js.flyout.Utils.measureDivSize(inParent, 's7flyoutFlyoutView');
	
	this.flyoutContainer = document.createElement('div');
	inParent.appendChild(this.flyoutContainer);
	this.flyoutContainer.style.position = 'absolute';
	this.flyoutContainer.style.visibility = 'hidden';
	
	this.borderContainer = document.createElement('div');
	this.flyoutContainer.appendChild(this.borderContainer);
	this.borderCorrection = s7js.flyout.Utils.prototype.setupBorder(this.borderContainer, 's7flyoutFlyoutViewBorder', this.flyoutSize.width, this.flyoutSize.height, false);

	this.staticContainer = document.createElement('div');
	this.flyoutContainer.appendChild(this.staticContainer);
	this.staticContainer.className = 's7flyoutFlyoutView';
	this.staticContainer.style.position = 'absolute';
	this.staticContainer.style.overflow = 'hidden';
	this.staticContainer.style.left = '0px';
	this.staticContainer.style.top = '0px';

	this.animatedContainer = document.createElement('div');
	this.staticContainer.appendChild(this.animatedContainer);
	this.animatedContainer.style.position = 'absolute';
	this.animatedContainer.style.overflow = 'hidden';
	if (s7js.flyout.Utils.isIOS()) {
//		this.animatedContainer.style.webkitTransform = 'translate3d(0,0,0)';
	}

	this.imageContainer = document.createElement('div');
	this.animatedContainer.appendChild(this.imageContainer);
	this.imageContainer.style.position = 'absolute';

	this.img = document.createElement('img');
	this.imageContainer.appendChild(this.img);
	var selfRef = this;
	s7js.flyout.Utils.addEventListener(
		this.img, 
		'load', 
		function() {
			selfRef.onLoadComplete();
		}, 
		false
	);
	s7js.flyout.Utils.addEventListener(
		this.img, 
		'error', 
		function() {
			selfRef.onLoadFail('failed loading image from [' + selfRef.img.src + ']');
		}, 
		false
	);

	this.visible = false;
	this.imageUrl = null;
	this.zoomFactor = null;

	this.showTransition = new s7js.flyout.Transition(250);
	this.showTransition.setType(new s7js.flyout.TransitionTypeLinear(- this.flyoutSize.width, 0));
	this.showTransition.onChange = function(inTransition) {
		var width = selfRef.flyoutSize.width + inTransition.getValue();
		selfRef.staticContainer.style.width = width + 'px';
		selfRef.borderContainer.style.width = (width + selfRef.borderCorrection.width) + 'px';
		selfRef.animatedContainer.style.left = inTransition.getValue() + 'px';
		if (!inTransition.isWorking() && !selfRef.visible) {
			selfRef.startHideAnimation();
		}
	};

	this.hideTransition = new s7js.flyout.Transition(150);
	this.hideTransition.setType(new s7js.flyout.TransitionTypeLinear(0, - this.flyoutSize.width));
	this.hideTransition.onChange = function(inTransition) {
		var width = selfRef.flyoutSize.width + inTransition.getValue();
		selfRef.staticContainer.style.width = width + 'px';
		selfRef.borderContainer.style.width = (width + selfRef.borderCorrection.width) + 'px';
		selfRef.animatedContainer.style.left = inTransition.getValue() + 'px';
		if (!inTransition.isWorking()) {
			selfRef.flyoutContainer.style.visibility = 'hidden';
			if (selfRef.visible) {
				selfRef.startShowAnimation();
			} else {
				selfRef.onFlyoutEnd();
			}
		}
	};

	this.layout();
}

s7js.flyout.FlyoutView.prototype.setImageUrl = function(inImageUrl) {
	this.imageUrl = inImageUrl;
	this.load();
};

s7js.flyout.FlyoutView.prototype.setZoomFactor = function(inZoomFactor) {
	this.zoomFactor = inZoomFactor;
};

s7js.flyout.FlyoutView.prototype.getFlyoutSize = function() {
	return {
		width : this.flyoutSize.width,
		height : this.flyoutSize.height
	};
};

s7js.flyout.FlyoutView.prototype.load = function() {
	var flyoutWidth = this.parentSize.width * this.zoomFactor;
	var flyoutHeight = this.parentSize.height * this.zoomFactor;
	//using flooe here in order to not fall outside iPad limit calculated on an upper level
	var url = s7js.flyout.Utils.appendQuery(this.imageUrl, 'wid=' + Math.floor(flyoutWidth) + '&hei=' + Math.floor(flyoutHeight) + '&fit=fit,1');
	this.img.src = url;
};

s7js.flyout.FlyoutView.prototype.setShowTime = function(inTime) {
	this.showTransition.setTotalTime(inTime);
};

s7js.flyout.FlyoutView.prototype.setHideTime = function(inTime) {
	this.hideTransition.setTotalTime(inTime);
};

s7js.flyout.FlyoutView.prototype.getSize = function() {
	return {
		width : this.flyoutSize.width,
		height : this.flyoutSize.height
	};
};

s7js.flyout.FlyoutView.prototype.onLoadComplete = function() {
};

s7js.flyout.FlyoutView.prototype.onLoadFail = function(inMsg) {
};

//private methods

s7js.flyout.FlyoutView.prototype.setPosition = function(inNormCoords) {
	this.imageContainer.style.left = Math.round(- inNormCoords.x * (this.parentSize.width * this.zoomFactor - this.flyoutSize.width)) + 'px';
	this.imageContainer.style.top = Math.round(- inNormCoords.y * (this.parentSize.height * this.zoomFactor - this.flyoutSize.height)) + 'px';
};

s7js.flyout.FlyoutView.prototype.show = function() {
	if (!this.visible) {
		this.visible = true;
		if (!this.showTransition.isWorking() && !this.hideTransition.isWorking()) {
			this.startShowAnimation();
			this.onFlyoutStart();
		}
	}
};

s7js.flyout.FlyoutView.prototype.hide = function() {
	if (this.visible) {
		this.visible = false;
		if (!this.showTransition.isWorking() && !this.hideTransition.isWorking()) {
			this.startHideAnimation();
		}
	}
};

s7js.flyout.FlyoutView.prototype.onFlyoutStart = function() {
};

s7js.flyout.FlyoutView.prototype.onFlyoutEnd = function() {
};

s7js.flyout.FlyoutView.prototype.startShowAnimation = function() {
	this.flyoutContainer.style.visibility = 'inherit';
	this.showTransition.startTransition();
};

s7js.flyout.FlyoutView.prototype.startHideAnimation = function() {
	this.hideTransition.startTransition();
};

s7js.flyout.FlyoutView.prototype.layout = function() {
	this.flyoutContainer.style.left = this.parentSize.width + this.offset.x + 'px';
	this.flyoutContainer.style.top = this.offset.y + 'px';
	
	this.animatedContainer.style.width = this.flyoutSize.width + 'px';
	this.animatedContainer.style.height = this.flyoutSize.height + 'px';
};