/*jslint browser: true*/
/*global $jq*/
"use strict";

window.resizeGrid = function resizeGrid() {
	$jq('[class*="ratio_"]').centering();
	$jq('.cleanrow').cleanrow({tolerance: 2});
}



if (!window.addEventListener) {
    window.attachEvent("onload", resizeGrid);
}
else {
    window.addEventListener("load", resizeGrid);
}

$jq(window).resize(function () {
	var windowHeight = $jq(window).height();
	var windowWidth = $jq(window).width();
	if ((window.currentHeight == undefined) || (window.currentHeight != windowHeight) || (window.currentWidth == undefined) || (window.currentWidth != windowWidth)) {
		resizeGrid();
		window.currentHeight = windowHeight;
		window.currentWidth = windowWidth;
	}
});
