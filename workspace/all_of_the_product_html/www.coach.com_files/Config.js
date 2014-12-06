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
s7js.flyout.Config = function() {
	this.explicitParams = new Object();
	this.serverParams = new Object();
	this.defaultParams = new Object();
}

s7js.flyout.Config.prototype.init = function() {
	var serverUrl = this.getParameter('serverUrl');
	var config = this.explicitParams['config'];

	if ((config != null) && (serverUrl != null)) {
		//SPS may supply config= value prefixed with "/". This is a special case to ensure that such value will be treated properly and IS context won't be lost.
		while (config.charAt(0) == '/') {
			config = config.substring(1);
		}
		this.loadConfig(s7js.flyout.Utils.resolveUrl(serverUrl, config));
	} else {
		this.onInitComplete();
	}
};

//private methods

s7js.flyout.Config.prototype.loadConfig = function(inUrl) {
	var selfRef = this;
	var configUrl = s7js.flyout.Utils.appendQuery(inUrl, 'req=userdata,json');
	sjGetResponse(
		'',
		configUrl,
		function(inObj) {
			for (var paramName in inObj) {
				var paramNameLC = paramName.toLowerCase();
				selfRef.serverParams[paramNameLC] = inObj[paramName];
			}
			selfRef.onInitComplete();
		},
		function() {
			selfRef.onInitFail('failed loading config from [' + configUrl + ']');
		}
	);
};

s7js.flyout.Config.prototype.getParameter = function(inParamName, inDefault) {
	var paramNameLC = inParamName.toLowerCase(); 
	if (this.explicitParams[paramNameLC] != null) {
		return this.explicitParams[paramNameLC];
	} else if (this.serverParams[paramNameLC] != null) {
		return this.serverParams[paramNameLC];
	} else if (this.defaultParams[paramNameLC] != null) {
		return this.defaultParams[paramNameLC];
	} else if (inDefault != null) {
		return inDefault;
	} else {
		return null;
	}
};

s7js.flyout.Config.prototype.setExplicitParameter = function(inParamName, inValue) {
	this.explicitParams[inParamName.toLowerCase()] = inValue;
};

s7js.flyout.Config.prototype.setDefaultParameter = function(inParamName, inValue) {
	this.defaultParams[inParamName.toLowerCase()] = inValue;
};

s7js.flyout.Config.prototype.onInitComplete = function() {
};

s7js.flyout.Config.prototype.onInitFail = function(inMessage) {
};
