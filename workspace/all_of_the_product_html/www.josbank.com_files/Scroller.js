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
s7js.flyout.Scroller = function(inParent) {
	this.parentSize = {
		width : inParent.offsetWidth,
		height : inParent.offsetHeight
	};

	this.container = document.createElement('div');
	this.container.style.position = 'absolute';
	this.container.style.overflow = 'hidden';
	this.container.style.left = '0px';
	this.container.style.top = '0px';
	inParent.appendChild(this.container);

	this.content = null;
	this.offset = 0;
	this.dragStartMouseX = 0;
	this.dragStartOffset = 0;
	this.isDragging = false;
	this.dragPerformed = false;
	
	this.lastMouseX = 0;
	this.lastMouseTime = 0;	
	this.totalDragShift = 0;
	this.totalDragTime = 0;
	this.frictionCoef = 0.001;
	this.enabled = true;
	
	var selfRef = this;
	var trackDrag = function(inMouseX) {
		var mouseTime = (new Date()).getTime();
		var mouseLastDx = inMouseX - selfRef.lastMouseX;
		var dt = mouseTime - selfRef.lastMouseTime;
		selfRef.totalDragShift = selfRef.totalDragShift / 2 + mouseLastDx;
		selfRef.totalDragTime = selfRef.totalDragTime / 2 + dt;
		selfRef.lastMouseX = inMouseX;
		selfRef.lastMouseTime = mouseTime;
	};

	this.moveHandler = function(inE) {
		selfRef.dragPerformed = true;
		var mouseX = s7js.flyout.Utils.getRelativeEventCords(inE, selfRef.container).x;
		var mouseDx = mouseX - selfRef.dragStartMouseX;

		trackDrag(mouseX);
		
		selfRef.offset = selfRef.dragStartOffset + mouseDx;
		selfRef.offset = selfRef.getValidOffset(selfRef.offset);
		selfRef.positionContent();
		s7js.flyout.Utils.stopPropagation(inE);
		s7js.flyout.Utils.preventDefault(inE);
	};
	this.upHandler = function(inE) {
		if (s7js.flyout.Utils.isTouchDevice()) {
			s7js.flyout.Utils.removeEventListener(document, 'touchmove', selfRef.moveHandler, true);
			s7js.flyout.Utils.removeEventListener(document, 'touchend', selfRef.upHandler, true);
		} else {
			s7js.flyout.Utils.removeEventListener(document, 'mousemove', selfRef.moveHandler, true);
			s7js.flyout.Utils.removeEventListener(document, 'mouseup', selfRef.upHandler, true);
		}

		if (selfRef.dragPerformed) {
			trackDrag(s7js.flyout.Utils.getRelativeEventCords(inE, selfRef.container).x);
			var speed = selfRef.totalDragShift / selfRef.totalDragTime;
			selfRef.startInertion(speed);
			s7js.flyout.Utils.stopPropagation(inE);
		}
		selfRef.isDragging = false;
	};
	this.downHandler = function(inE) {
		if (!selfRef.enabled) {
			return;
		}
		if (selfRef.slowDownTransition.isWorking()) {
			selfRef.slowDownTransition.stopTransition();
		}
		
		selfRef.isDragging = true;
		selfRef.dragPerformed = false;
		selfRef.dragStartMouseX = s7js.flyout.Utils.getRelativeEventCords(inE, selfRef.container).x;
		selfRef.dragStartOffset = selfRef.offset;

		selfRef.lastMouseX = selfRef.dragStartMouseX;
		selfRef.lastMouseTime = (new Date()).getTime();
		selfRef.totalDragShift = 0;
		selfRef.totalDragTime = 0;
		
		if (s7js.flyout.Utils.isTouchDevice()) {
			s7js.flyout.Utils.addEventListener(document, 'touchmove', selfRef.moveHandler, true);
			s7js.flyout.Utils.addEventListener(document, 'touchend', selfRef.upHandler, true);
		} else {
			s7js.flyout.Utils.addEventListener(document, 'mousemove', selfRef.moveHandler, true);
			s7js.flyout.Utils.addEventListener(document, 'mouseup', selfRef.upHandler, true);
		}
		s7js.flyout.Utils.preventDefault(inE);
	};

	if (s7js.flyout.Utils.isTouchDevice()) {
		s7js.flyout.Utils.addEventListener(this.container, 'touchstart', this.downHandler, false);
	} else {
		s7js.flyout.Utils.addEventListener(this.container, 'mousedown', this.downHandler, false);
	}
	
	this.layout();

	this.slowDownTransition = new s7js.flyout.Transition(0);
	this.slowDownTransition.onChange = function(inTransition) {
		selfRef.offset = inTransition.getValue();
		selfRef.offset = selfRef.getValidOffset(selfRef.offset);
		selfRef.positionContent();
	};
}

s7js.flyout.Scroller.prototype.setContent = function(inContent) {
	this.content = inContent;
	this.container.appendChild(inContent);
	this.positionContent();
};

s7js.flyout.Scroller.prototype.setFrictionCoef = function(inFrictionCoef) {
	this.frictionCoef = inFrictionCoef;
};

s7js.flyout.Scroller.prototype.setEnabled = function(inEnabled) {
	this.enabled = inEnabled;
};

s7js.flyout.Scroller.prototype.dispose = function() {
	if (this.slowDownTransition.isWorking()) {
		this.slowDownTransition.stopTransition();
	}
	if (this.isDragging) {
		if (s7js.flyout.Utils.isTouchDevice()) {
			s7js.flyout.Utils.removeEventListener(document, 'touchmove', this.moveHandler, true);
			s7js.flyout.Utils.removeEventListener(document, 'touchend', this.upHandler, true);
		} else {
			s7js.flyout.Utils.removeEventListener(document, 'mousemove', this.moveHandler, true);
			s7js.flyout.Utils.removeEventListener(document, 'mouseup', this.upHandler, true);
		}
	}
	if (s7js.flyout.Utils.isTouchDevice()) {
		s7js.flyout.Utils.removeEventListener(this.container, 'touchstart', this.downHandler, false);
	} else {
		s7js.flyout.Utils.removeEventListener(this.container, 'mousedown', this.downHandler, false);
	}
};

///private methods

s7js.flyout.Scroller.prototype.startInertion = function(inStartSpeed) {
	var slowDownTime = Math.abs(inStartSpeed / this.frictionCoef);
	var distance = (inStartSpeed > 0 ? 1 : -1) * inStartSpeed * inStartSpeed / this.frictionCoef / 2;
	this.slowDownTransition.setTotalTime(slowDownTime);
	this.slowDownTransition.setType(new s7js.flyout.TransitionTypeQuadratic(this.offset, this.offset + distance, false));
	this.slowDownTransition.startTransition();
};

s7js.flyout.Scroller.prototype.positionContent = function() {
	this.content.style.left = this.offset + 'px';
	this.content.style.top = ((this.parentSize.height - this.content.offsetHeight) / 2) + 'px';
};

s7js.flyout.Scroller.prototype.getValidOffset = function(inOffset) {
	if (inOffset > 0) {
		inOffset = 0;
	}
	if (inOffset < - (this.content.offsetWidth - this.parentSize.width)) {
		inOffset = - (this.content.offsetWidth - this.parentSize.width);
	}
	return inOffset;
};

s7js.flyout.Scroller.prototype.layout = function() {
	this.container.style.width = this.parentSize.width + 'px';
	this.container.style.height = this.parentSize.height + 'px';
};

s7js.flyout.Scroller.prototype.canScrollLeft = function() {
	return (this.offset < 0);
};

s7js.flyout.Scroller.prototype.canScrollRight = function() {
	return (this.offset > - (this.content.offsetWidth - this.getPageSize()));
};
