/*jslint browser: true, undef: true, evil: true, white: true, sloppy: true */
/*jslint nomen: true, vars: true, continue: true */
/*global window */
/*global clearMouseoverHideDelay, delayHideMouseoverTooltip */
/*global showTooltip, hideTooltip, hideAllTooltips */
/*global tooltipShadowRemover */
/*global whiteOutLayerRemover */
/*global tooltipArrowRemover */
/*global blockingIframeRemover */
/*global getParentOffsetCorrection */
/******************************************************************************

This is tooltip.js.

The functions and variables contained within this document are used to
create and access the pseudo-layered tooltip functionality.

******************************************************************************/

/* SUPPORT IMAGES */
var shadowImagePath        = "http://www.geappliances.com/images/common/tooltipShadowBG.gif";
var blockingLayerImagePath = "http://www.geappliances.com/images/common/blockingBG.gif";
var arrowUpImagePath       = "http://www.geappliances.com/images/common/tooltipArrowUp.gif";
var arrowDownImagePath     = "http://www.geappliances.com/images/common/tooltipArrowDown.gif";
var arrowWidth             = 24; // pixels
var arrowHeight            = 22; // pixels
var arrowOffset            = 3;	 // pixels to hide border

/************************** DO NOT EDIT BELOW THIS LINE **********************/

// facilitate local surfing when image paths specified above begin with "//".
(function() {
	var proto = ("file:" === location.protocol) ? "http:" :
		location.protocol;
	function prependProtocol(s) {
		if (s && /^\/\//.test(s)) {
			return proto + s;
		}
		return s;
	}
	shadowImagePath        = prependProtocol(shadowImagePath);
	blockingLayerImagePath = prependProtocol(blockingLayerImagePath);
	arrowUpImagePath       = prependProtocol(arrowUpImagePath);
	arrowDownImagePath     = prependProtocol(arrowDownImagePath);
}());

/* required global vars */
var scrnwidth = screen.width;
var scrnheight = screen.height;
var isMouseoverVar = false;
var preloadShadow, preloadBlockingLayer, preloadArrowUp, preloadArrowDown;
var linkObjCenterX, linkObjCenterY;
var currentTooltip;
var tooltipArrow;
var divIDGlobal;
var mouseoverHideDelay;

if (shadowImagePath) {
	preloadShadow = new Image();
	preloadShadow.setAttribute('src', shadowImagePath);
}
if (blockingLayerImagePath) {
	preloadBlockingLayer = new Image();
	preloadBlockingLayer.setAttribute('src', blockingLayerImagePath);
}
if (arrowUpImagePath) {
	preloadArrowUp = new Image();
	preloadArrowUp.setAttribute('src', arrowUpImagePath);
}
if (arrowDownImagePath) {
	preloadArrowDown = new Image();
	preloadArrowDown.setAttribute('src', arrowDownImagePath);
}

///////////////////////////////////////////////////////////////////////////////
// Cross-platform thing to attach handlers to events.
///////////////////////////////////////////////////////////////////////////////
function $ADD_EVENT(obj, event, handler) {
	var old_handler;
	var on_event = "on" + event;
	if (window.addEventListener) {
		// good browsers and IE9+
		obj.addEventListener(event, handler, false);
	} else if (window.attachEvent) {
		// IE5 to IE8
		obj.attachEvent(on_event, handler);
	}
}

/******************************************************************************
Use this function of "showTooltip" when the situation calls for a
'mouseover tooltip'.  The corresponding 'mouseout' should call the
function 'delayHideMouseoverTooltip'.

The divWidth argument can be a number of pixels, or null if you want
to allow CSS to control the width of the tooltip instead.
******************************************************************************/
function showNonStickyTooltip (divID, divWidth, event, linkObj) {
	var linkObjWidth, linkObjHeight;
	var linkObjX, linkObjXpos, linkObjY, linkObjYpos;
	var overflowTestNode;
	var overflowTestNodeScrollTop, overflowTestNodeScrollLeft;
	
	clearMouseoverHideDelay();
		
	isMouseoverVar = true;	
		
	// link obj dimensions
	linkObjWidth = linkObj.offsetWidth;
	linkObjHeight = linkObj.offsetHeight;
	
	// link obj positions
	linkObjX = linkObj;
	linkObjXpos = 0;
	if (linkObjX.offsetParent) {
		while (true) {
			linkObjXpos += linkObjX.offsetLeft;
			if (!linkObjX.offsetParent) {
				break;
			}
			linkObjX = linkObjX.offsetParent;
		}
	} else if (linkObjX.x) {
		linkObjXpos += linkObjX.x;
	}
	
	linkObjY = linkObj;
	linkObjYpos = 0;
	if (linkObjY.offsetParent) {
		while (true) {
			linkObjYpos += linkObjY.offsetTop;
			if (!linkObjY.offsetParent) {
				break;
			}
			linkObjY = linkObjY.offsetParent;
		}
	} else if (linkObjY.y) {
		linkObjYpos += linkObjY.y;
	}
	
	// test that linkObj is not in scrolling element (and adjust accordingly)
	overflowTestNode = linkObj;
	while (overflowTestNode.parentNode &&
	       overflowTestNode.tagName.toLowerCase() !== "body") {
		if (overflowTestNode.scrollTop > 0) {
			overflowTestNodeScrollTop = overflowTestNode.scrollTop;
			overflowTestNodeScrollLeft = overflowTestNode.scrollLeft;
			
			linkObjYpos = linkObjYpos - overflowTestNodeScrollTop;
			linkObjXpos = linkObjXpos - overflowTestNodeScrollLeft;
		}
		
		overflowTestNode = overflowTestNode.parentNode;
	}
	
	
	
	// set link center
	linkObjCenterX = linkObjXpos + (linkObjWidth / 2);
	linkObjCenterY = linkObjYpos + (linkObjHeight / 2);
	
	// attaching mouse out event listeners to trigger
	$ADD_EVENT(linkObj, "mouseout", delayHideMouseoverTooltip);
	
	//run standard tooltip function
	showTooltip(divID, divWidth, event);
	
	// attaching event listeners to tooltip
	$ADD_EVENT(currentTooltip, "mouseover", clearMouseoverHideDelay);
	$ADD_EVENT(currentTooltip, "mouseout", delayHideMouseoverTooltip);
	
	// attaching event listeners to arrow (if necessary)
	if (/\barrowTooltip\b/.test(currentTooltip.className)) {
		$ADD_EVENT(tooltipArrow, "mouseover", clearMouseoverHideDelay);
		$ADD_EVENT(tooltipArrow, "mouseout", delayHideMouseoverTooltip);
	}
}

/******************************************************************************
Function that hides the mouseoverTooltip. This function is called in 
'delayHideMouseOverTooltip' and should not be called on its own
******************************************************************************/
function hideMouseoverTooltip (someObj) {
	if (someObj !== this) {
		someObj = document.getElementById(divIDGlobal);
	}
	hideTooltip(someObj);
}

/******************************************************************************
This function runs 'hideMouseoverTooltip' after a delay (which is
cleared by 'clearMouseoverHideDelay' when user switches focus to the
actual tooltip. This function should be called onMouseOut of the
element which triggers the tooltip, as well as the tooltip itself and
its support elements (i.e. 'arrow' and 'shadow')
******************************************************************************/
function delayHideMouseoverTooltip () {
	mouseoverHideDelay = setTimeout(function () { hideMouseoverTooltip(); }, 350);
}

/******************************************************************************
This function clears the delay set in
'delayHideMouseoverTooltip'. This function should be called
onMouseOver of the tooltip itself and its support elements
(i.e. 'arrow' and 'shadow')
******************************************************************************/
function clearMouseoverHideDelay () {
	if (mouseoverHideDelay) {
		clearTimeout(mouseoverHideDelay);
		mouseoverHideDelay = null;
	}
}

/******************************************************************************
This function unhides, sizes, and positions a specified "tooltip" div
on the click of a link.
 
All 'tooltips' for a given page should be have a class of "tooltipDiv"
and a unique ID.

The basic <a> tag to call this function is as follows, where the user
specifies the ID of the tooltip to be displayed and the width at which
the tooltip should be displayed:
 
    <a href="javascript:void(0);"
       onclick="showTooltip(divID, width, event); return false;">
 
* Optional classes on "tooltipDiv":
  - tooltipShadowLeft
  - tooltipShadowRight
  - hCenteredTooltip
  - vCenteredTooltip
  - useWhiteOutLayer
  - arrowTooltip

The divWidth argument can be a number of pixels.  If it's falsy or
left unspecified, CSS will control the width of the tooltip.

If the event argument is falsy or left unspecified, the tooltip is
horizontally and vertically centered on the screen.
******************************************************************************/
function showTooltip (divID, divWidth, event) {
	var i, selectArray, root, selectTestNode;
	var ww, wh, st, sl, sh, sw;
	var docWidth, grabbedDivHeight, grabbedDivWidth;
	var mouseX, mouseY, xpt, ypt, arrowDirection, arrowXpt, arrowYpt;
	var shadowXpt, shadowYpt, tooltipShadow;
	var whiteout, blockingIframe;
	
	divIDGlobal = divID;
	hideAllTooltips();
	
	// if div with id of 'divID' exists, function will run normally, otherwise it will do nothing //
	if (document.getElementById(divID)) { 
			
		// get tooltip[x]
		currentTooltip = document.getElementById(divID);
		if (divWidth) {
			currentTooltip.style.width = divWidth + "px";
		}
		currentTooltip.style.zIndex = 1005;
		
		// determine root (for determining scrolls and offsets)
		if (document.body.scrollTop > 0 || document.body.scrollLeft > 0) {
			root = document.body; // Safari
		} else {
			root = document.documentElement; // IE and Mozilla
		}
		
		ww = root.offsetWidth;		
		wh = root.offsetHeight;
		st = root.scrollTop;
		sl = root.scrollLeft;
		sh = root.scrollHeight;
		sw = root.scrollWidth;
		docWidth = document.body.offsetWidth;
		grabbedDivHeight = currentTooltip.offsetHeight;
		grabbedDivWidth = currentTooltip.offsetWidth;

		//get mouse coordinates
		if (event) {
			mouseX = event.clientX + sl;
			mouseY = event.clientY + st;
		} else {
			mouseX = 0;
			mouseY = 0;
		}

		// for mouseover tooltips, change detected mouse coordinates to center of link obj
		if (isMouseoverVar) {
			mouseX = linkObjCenterX;
			mouseY = linkObjCenterY;
		}
		
		//set initial tooltip position //
		xpt = mouseX - (grabbedDivWidth / 2);
		ypt = mouseY + 10;

		//set initial ARROW tooltip position //
		if (/\barrowTooltip\b/.test(currentTooltip.className)) {
			xpt = mouseX - (grabbedDivWidth / 2);
			ypt = mouseY - grabbedDivHeight - 15;
			arrowDirection = "Down";
		}
		
		
		// testing the document/window boundaries //
		
		if (xpt < 15) {
			xpt = 15;
		}
		if ((xpt + grabbedDivWidth) > (ww + sl)) {
			xpt = (ww + sl) - grabbedDivWidth - 15;
		}
		if (ww < grabbedDivWidth) {
			xpt = sl + 15;
		}	
		
		if ((ypt + grabbedDivHeight + 15) > sh) {
			ypt = ypt - grabbedDivHeight - 15;
		}
		
		// tooltip boundary checking (when using arrow variant) //
		if ((ypt - 5) < 0) {
			ypt = mouseY + arrowHeight;
			arrowDirection = "Up";
		}
		
		// hCenteredTooltip
		if (!event || /\bhCenteredTooltip\b/.test(currentTooltip.className)) {
			xpt = sl + ((ww - grabbedDivWidth) / 2);
			
			// boundary checking
			if (xpt < (sl + 10)) {
				xpt = sl + 10;
			}
		}
		
		// vCenteredTooltip
		if (!event || /\bvCenteredTooltip\b/.test(currentTooltip.className)) {
			ypt = st + ((document.documentElement.clientHeight - grabbedDivHeight) / 2);

			// boundary checking
			if (ypt < (st + 10)) {
				ypt = st + 10;
			}
		}
		
		var correction = getParentOffsetCorrection(currentTooltip);
		xpt -= correction.x;
		ypt -= correction.y;

		//set definite tooltip[x] position //
		currentTooltip.style.left = xpt + "px"; 
		currentTooltip.style.top = ypt + "px";
		
		// check for 'tooltipShadow' class and create shadow layer //
		if (/\btooltipShadowLeft\b/.test(currentTooltip.className) || /\btooltipShadowRight\b/.test(currentTooltip.className)) {
			shadowYpt = ypt + 5;
			
			if (currentTooltip.className && /\btooltipShadowRight\b/.test(currentTooltip.className)) {
				shadowXpt = xpt + 5;
			} else if (currentTooltip.className && /\btooltipShadowLeft\b/.test(currentTooltip.className)) {
				shadowXpt = xpt - 5;
			}			
			
			tooltipShadow = document.createElement('div');
			tooltipShadow.id = "tooltipShadow";
			tooltipShadow.style.width = (grabbedDivWidth)+"px";
			tooltipShadow.style.height = (grabbedDivHeight)+"px";
			tooltipShadow.style.position = "absolute";
			tooltipShadow.style.top = shadowYpt+"px";
			tooltipShadow.style.left = shadowXpt+"px";
			tooltipShadow.style.zIndex = 999;
			if (shadowImagePath) {
				tooltipShadow.style.backgroundImage = "url("+shadowImagePath+")";
			}
			
			currentTooltip.parentNode.appendChild(tooltipShadow);
		}
		
		// check for 'useWhiteOutLayer' class and create shadow layer //
		if (/\buseWhiteOutLayer\b/.test(currentTooltip.className)) {
					
			// define whiteout //
			whiteout = document.createElement('div');
			whiteout.id = "whiteOutLayer";
			whiteout.style.width = sw+"px";
			whiteout.style.height = sh+"px";
			whiteout.style.position = "absolute";
			whiteout.style.top = "0px";
			whiteout.style.left = "0px";
			whiteout.style.zIndex = 998;
			if (blockingLayerImagePath) {
				whiteout.style.backgroundImage = "url("+blockingLayerImagePath+")";
			}
			
			// hide selects (since they burn through) -- with exception of selects WITHIN tooltip //
			selectArray = document.getElementsByTagName("select");
			for(i = 0; i < selectArray.length; i++) {
				selectTestNode = selectArray[i];
				while (selectTestNode.parentNode && !/\btooltipDiv\b/.test(selectTestNode.className)) {
					selectTestNode = selectTestNode.parentNode;
				}
				if (!selectTestNode.parentNode) {
					selectArray[i].style.visibility = "hidden";
				}
			}
			
			// add whiteout to page //
			document.body.appendChild(whiteout);
		}
		
		// check for 'arrowTooltip' class and create arrow layer //
		if (/\barrowTooltip\b/.test(currentTooltip.className)) {
			if (arrowDirection === "Down") {
				arrowYpt = ypt + currentTooltip.offsetHeight - arrowOffset;
			} else if (arrowDirection === "Up") {
				arrowYpt = ypt - arrowHeight + arrowOffset;
			}
			arrowXpt = xpt + Math.round((currentTooltip.offsetWidth - arrowWidth) / 2);
			
			
			tooltipArrow = document.createElement('img');
			tooltipArrow.id = "tooltipArrow";
			tooltipArrow.style.width = arrowWidth + "px";
			tooltipArrow.style.height = arrowHeight + "px";
			tooltipArrow.style.position = "absolute";
			tooltipArrow.style.top = arrowYpt+"px";
			tooltipArrow.style.left = arrowXpt+"px";
			tooltipArrow.style.zIndex = 2000;
			if (arrowDirection === "Down") {
				if (arrowDownImagePath) {
					tooltipArrow.src = arrowDownImagePath;
				}
			} else if (arrowDirection === "Up") {
				if (arrowUpImagePath) {
					tooltipArrow.src = arrowUpImagePath;
				}
			}
			
			currentTooltip.parentNode.appendChild(tooltipArrow);
		}
		
		// create a 'select'-blocking iframe //
		blockingIframe = document.createElement('iframe');
		blockingIframe.id = "blockingIframe";
		if (arrowDownImagePath) {
			blockingIframe.src = arrowDownImagePath;
		}
		blockingIframe.style.zIndex = 997;
		blockingIframe.style.width = grabbedDivWidth+"px";
		blockingIframe.style.height = grabbedDivHeight+"px";
		blockingIframe.style.position = "absolute";
		blockingIframe.style.border = "0";
		blockingIframe.style.left = xpt+"px"; 
		blockingIframe.style.top = ypt+"px";
		
		currentTooltip.parentNode.appendChild(blockingIframe);
		
		// show tooltip[x] //
		currentTooltip.style.visibility = "visible";
	}
}

/*** This function is used on the tooltip close button to hide the tooltip. ***/
function hideTooltip (nodeObj)	{
	while (!nodeObj.className || !/\btooltipDiv\b/.test(nodeObj.className))	{
		nodeObj = nodeObj.parentNode;
	}
	nodeObj.style.visibility = "hidden";
	tooltipShadowRemover();
	whiteOutLayerRemover();
	tooltipArrowRemover();
	blockingIframeRemover();
	isMouseoverVar = false;
}

/*** This function hides all open tooltips ***/
function hideAllTooltips () {
	var tooltipDivArray, j, tooltipDiv;

	// determine which divs are tooltips and hide any open tooltips //
	tooltipDivArray = document.getElementsByTagName('div');
	for (j = 0; j < tooltipDivArray.length; ++j) {
		tooltipDiv = tooltipDivArray[j];
		if (!tooltipDiv.className || !/\btooltipDiv\b/.test(tooltipDiv.className)) {
			continue;
		}
		tooltipDiv.style.visibility = "hidden";
		tooltipShadowRemover();
		whiteOutLayerRemover();
		tooltipArrowRemover();
		blockingIframeRemover();
	}
}

/*** This function removes the tooltipShadow (if it exists) ***/
function tooltipShadowRemover () {
	var shadow;

	if (document.getElementById('tooltipShadow')) {
		shadow = document.getElementById('tooltipShadow');
		shadow.parentNode.removeChild(shadow);
	}
}

/*** This function removes the whiteOutLayer (if it exists) ***/
function whiteOutLayerRemover () {
	var i, whiteout, selectArray;
	
	if (document.getElementById('whiteOutLayer')) {
		whiteout = document.getElementById('whiteOutLayer');
		whiteout.parentNode.removeChild(whiteout);
	}
	
	selectArray = document.getElementsByTagName("select");
	for(i = 0; i < selectArray.length; i++) {
		selectArray[i].style.visibility = "inherit";
	}
}

/*** This function removes the tooltipArrow (if it exists) ***/
function tooltipArrowRemover () {
	var arrow;

	if (document.getElementById('tooltipArrow')) {
		arrow = document.getElementById('tooltipArrow');
		arrow.parentNode.removeChild(arrow);
	}
}
/*** This function removes the blockingIframe ***/
function blockingIframeRemover () {
	var blockingIframe;

	if (document.getElementById('blockingIframe')) {
		blockingIframe = document.getElementById('blockingIframe');
		blockingIframe.parentNode.removeChild(blockingIframe);
	}
}

function getParentOffsetCorrection(elt) {
	// based on getElementPos() from "JavaScript:
	// The Definitive Guide", 6th ed.
	var x = 0, y = 0, e;
	for (e = elt.offsetParent; e; e = e.offsetParent) {
		x += e.offsetLeft;
		y += e.offsetTop;
	}
	// for (e = elt.parentNode; e && e.nodeType === 1; e = e.parentNode) {
	// 	x -= e.scrollLeft;
	// 	y -= e.scrollTop;
	// }
	return { x: x, y: y };
}

if (!(/(?:Android|BlackBerry|iPhone|iPad|iPod|Opera\s*Mini|IEMobile)/.test(navigator.userAgent))) {
	/*** This will cause any open tooltip to close if the page is resized. ***/
	$ADD_EVENT(window, "resize", hideAllTooltips);
}

