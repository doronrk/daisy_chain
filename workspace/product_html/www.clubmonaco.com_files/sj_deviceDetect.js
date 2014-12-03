/*
ADOBE CONFIDENTIAL
Copyright 2010 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  All information contained herein is, and remains the property of Adobe Systems Incorporated and its suppliers,
if any.  The intellectual and technical concepts contained herein are proprietary to Adobe Systems Incorporated and its
suppliers and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or 
copyright law. Dissemination of this information or reproduction of this material is strictly forbidden unless prior 
written permission is obtained from Adobe Systems Incorporated.
*/
/*
JavaScript method to detect the basic browser/device type.
Only needs the following capabilities for now:
0 - other
1 - iPhone/iPad
2 - Flash installed
*/
function sjGetDeviceType(){
	var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
	var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
	var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
	var isIPhone  = (navigator.userAgent.match(/iPhone/i));
	var isIPod  = (navigator.userAgent.match(/iPod/i));
	var isIPad  = (navigator.userAgent.match(/iPad/i));
	var isAndroid  = (navigator.userAgent.match(/Android/i));

	function isFlash() {
		if (navigator.plugins != null && navigator.plugins.length > 0) {
			if (navigator.plugins["Shockwave Flash"]) {
				return true;
			}
		} else if (isIE && isWin && !isOpera) {
			try {
				var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				if (axo) return true;
			} catch (e) {
			}
		}
		return false;
	}

	if (isFlash()){
			return 2;
	}
 
	if (isIPhone || isIPod || isIPad){
			return 1;
	}
	return 0;
}