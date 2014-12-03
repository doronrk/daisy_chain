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
function SjUtils() {
}

SjUtils.EPS = 0.0000001;

SjUtils.getElementPosition = function(inElm) {
	var pos = {
		x : 0,
		y : 0
	};
	var elm = inElm;
	while (elm.offsetParent != null) {
		pos.x += elm.offsetLeft;
		pos.y += elm.offsetTop;
		if (elm != inElm) {
			pos.x += elm.clientLeft;
			pos.y += elm.clientTop;
		}
		elm = elm.offsetParent;
	}
	return pos;
};

SjUtils.getGlobalEventCoords = function(inEvent) {
	var pos = SjUtils.getLocalEventCoords(inEvent);

	var elmPos = SjUtils.getElementPosition(inEvent.currentTarget);

	return {
		x : (pos.x - elmPos.x),
		y : (pos.y - elmPos.y)
	};
};

SjUtils.getLocalEventCoords = function(inEvent) {
	var pos = {
		x : 0,
		y : 0
	};
	var posY;
	if (inEvent.touches) {
		pos.x = inEvent.touches[0].clientX;
		pos.y = inEvent.touches[0].clientY;
	} else if (inEvent.pageX) {
		pos.x = inEvent.pageX;
		pos.y = inEvent.pageY;
	} else {
		pos.x = inEvent.clientX;
		pos.y = inEvent.clientY;
	}
	return pos;
}

SjUtils.floatCompare = function(inFloat1, inFloat2) {
    if (Math.abs(inFloat1 - inFloat2) < SjUtils.EPS) {
        return 0;
    } else if (inFloat1 > inFloat2) {
        return 1;
    } else {
        return -1;
	}
};

SjUtils.canUse3D = function() {
	if (SjUtils.canUse3DCached == null) {
		var div3d = document.createElement('div');
		SjUtils.canUse3DCached = (('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()) && 
									'webkitPerspective' in div3d.style);//Chrome has a 3D matrix but doesn't support 3d transforms
	}
	return SjUtils.canUse3DCached;
}

SjUtils.isLandscape = function() {
/*
0: "Portrait"; 
-90:"Landscape (right, screen turned clockwise)"; 
90:"Landscape (left, screen turned counterclockwise)"; 
180:"Portrait (upside-down portrait)"; 
*/
	return ((window.orientation == null) || (window.orientation % 180 != 0));
}

SjUtils.getCompanyName = function(inURLAsset) {
	var rawAsset = inURLAsset.split('?')[0].split(',')[0].split(';')[0].split(':')[0];
	return rawAsset.split('/')[0];
};

SjUtils.getCatalogId = function(inURLAsset) {
	var rawAsset = inURLAsset.split('?')[0].split(',')[0].split(';')[0].split(':')[0];
	if (rawAsset.indexOf('/') != -1) {
		return rawAsset.substring(rawAsset.indexOf('/') + 1);
	} else {
		return rawAsset;
	}
};

SjUtils.addDownStateToButton = function(inButton) {
	var overHandler = function(inEvent) {
		inButton.setAttribute('state', 'down');
	};
	var outHandler = function(inEvent) {
		inButton.setAttribute('state', '');
	};
	if (window.addEventListener) { 
		inButton.addEventListener('mouseover', overHandler, false);
		inButton.addEventListener('touchstart', overHandler, false);
		inButton.addEventListener('mouseout', outHandler, false);
		inButton.addEventListener('touchend', outHandler, false);
	}else if (window.attachEvent) { 
		inButton.attachEvent('onmouseover', overHandler);
		inButton.attachEvent('ontouchstart', overHandler);
		inButton.attachEvent('onmouseout', outHandler);
		inButton.attachEvent('ontouchend', outHandler);
	}
};
