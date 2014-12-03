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

// Declare refresh controller which are used in pagination controls of SearchBasedNavigationDisplay -- both products and articles+videos
wc.render.declareRefreshController({
	id: "prodRecommendationRefresh_controller",
	renderContext: wc.render.getContextById("searchBasedNavigation_context"),
	url: "",
	formId: ""

	,renderContextChangedHandler: function(message, widget) {
		var controller = this;
		var renderContext = this.renderContext;
		var resultType = renderContext.properties["resultType"];
		if(resultType == "products" || resultType == "both"){
			widget.refresh(renderContext.properties);
			console.log("espot refreshing");
		}
	}
	
	/**
	 * Clears the progress bar after a successful refresh.
	 *
	 * @param {Object} widget The refresh area widget.
	 */
	,postRefreshHandler: function(widget) {
		var controller = this;
		var renderContext = this.renderContext;
		cursor_clear();
		
		var refreshUrl = controller.url;
		var emsName = "";
		var indexOfEMSName = refreshUrl.indexOf("emsName=", 0);
		if(indexOfEMSName >= 0){
			emsName = refreshUrl.substring(indexOfEMSName+8);
			if (emsName.indexOf("&") >= 0) {
				emsName = emsName.substring(0, emsName.indexOf("&"));
				emsName = "script_" + emsName;
			}
		}
		
		if (emsName != "") {
			var espot = dojo.query('.genericESpot',dojo.byId(emsName).parentNode)[0];
			if (espot != null) {
				dojo.addClass(espot,'emptyESpot');
			}
		}
		dojo.publish("CMPageRefreshEvent");
	}
});
