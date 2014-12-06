//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------
function cartEvent() {
	// Google Analytics
	if (_gaq) {
		if (_addEventMap.opt_value != null) {
			_addEventMap.opt_value = parseInt(_addEventMap.opt_value);
		}
		_gaq.push(['_trackEvent', _addEventMap.category, _addEventMap.action, _addEventMap.opt_name, _addEventMap.opt_value]);
	}
	
	// Google Tag Manager
	if (dataLayer) {
		dataLayer.push({
			'event': _addEventMap.category
		    ,'cartAction': _addEventMap.action
			,'cartSku': _addEventMap.opt_name
			,'cartQty': _addEventMap.opt_value
		});
	}	
}
