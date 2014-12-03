//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2010 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------
//---------------------------------------------------------------------
//  The sample contained herein is provided to you "AS IS".
// 
//  It is furnished by IBM as a simple example and has not been thoroughly
//  tested under all conditions.  IBM, therefore, cannot guarantee its
//  reliability, serviceability or functionality.
// 
//  This sample may include the names of individuals, companies, brands
//  and products in order to illustrate concepts as completely as possible.
//  All of these names are fictitious and any similarity to the names and
//  addresses used by actual persons or business enterprises is entirely
//  coincidental.
//--------------------------------------------------------------------- 

/** 
 * @fileOverview This file provides the render context used to display
 * the recommendations from Coremetrics Intelligent Offer. It also
 * contains the zone population function called with the results to
 * display.
 */
 
dojo.require("wc.render.common");
dojo.require("wc.render.RefreshController");
dojo.require("wc.render.Context");
dojo.require("wc.widget.RefreshArea");

/** 
 * @class The IntelligentOfferJS class defines the render context used to display
 * the recommendations from Coremetrics Intelligent Offer.
 */
IntelligentOfferJS = {
	/* The common parameters used in service calls. */
		langId: "-1",
		storeId: "",
		catalogId: "",
	
	/**
	 * This function initializes common parameters used in all service calls.
	 * @param {int} langId The language id to use.
	 * @param {int} storeId The store id to use.
	 * @param {int} catalogId The catalog id to use.
	 */
		setCommonParameters:function(langId,storeId,catalogId){
			this.langId = langId;
			this.storeId = storeId;
			this.catalogId = catalogId;
		},

	/**
	 *  This function declares a context and a refresh area controller that has the given context ID and controller ID.
	 *	@param {string} controllerId The ID of the controller that is going to be declared.
	 *	@param {string} contextId The ID of the context that is going to be declared.
	 */
	declareRefreshController: function(controllerId, contextId){
		 
		wc.render.declareContext(contextId,{partNumbers: "", zoneId: "", espotTitle: ""},"")
		 
		//console.debug("entering IntelligentOfferJS.declareRefreshController with contextId = " + contextId + " and controller id = " + controllerId);
		if(wc.render.getRefreshControllerById(controllerId)){
			//console.debug("controller with id = " + controllerId + " already exists. No declaration will be done");
			return;
		}
		wc.render.declareRefreshController({
			id: controllerId, 
			renderContext: wc.render.getContextById(contextId),
			url: "",
	    formId: ""
	    
     /** 
      * Refreshes the Intelligent Offer Recommendations e-Marketing Spot area.
      * This function is called when a render context changed event is detected. 
      * @param {string} message The model changed event message
      * @param {object} widget The registered refresh area
      */	    
	   ,modelChangedHandler: function(message, widget) {
          var renderContext = this.renderContext;
			}

     /** 
      * Refreshes the Intelligent Offer Recommendations e-Marketing Spot area.
      * This function is called when a render context changed event is detected. 
      * @param {string} message The model changed event message
      * @param {object} widget The registered refresh area
      */
     ,renderContextChangedHandler: function(message, widget) {
          var renderContext = this.renderContext;

          widget.refresh(renderContext.properties);
			}
    
     /** 
      * Post handling for the Intelligent Offer Recommendations e-Marketing Spot area.
      * This function is called after a successful refresh. 
      * @param {object} widget The registered refresh area
      */    
     ,postRefreshHandler: function(widget) {
	    		var renderContext = this.renderContext;	   
	    		cursor_clear();
	    		// need to process cm_cr tags
	    		cX("onload");
     	}
		});
	}
};	

/**
 *  This function is the zone population function called by Coremetrics Intelligent Offer.
 *  It creates a comma separated list of the partnumbers to display, and then updates
 *  the refresh area that will display the recommendations.
 */

/** Moved to IntelligentOffer_Zones.js
* function io_rec_zp(a_product_ids,zone,symbolic,target_id,category,rec_attributes,target_attributes,target_header_txt) {
* 	console.warn('in io_rec_zp update');
* 	console.warn('in io_rec_zp update::zone ' + zone);
* 	console.warn('in io_rec_zp update::symbolic ' + symbolic);
* 	console.warn('in io_rec_zp update::target_id ' + target_id);
* 	console.warn('in io_rec_zp update::category ' + category);
* 	console.warn('in io_rec_zp update::rec_attributes ' + rec_attributes);
* 	console.warn('in io_rec_zp update::target_attributes ' + target_attributes);
* 	console.warn('in io_rec_zp update::target_header_txt ' + target_header_txt);
* 	
* 	if (symbolic !== '_NR_') {
* 		var n_recs = a_product_ids.length;
* 		var rec_part_numbers;
* 		for (var ii=0; ii < n_recs; ii++) {
* 			if (ii == 0) {
*  				rec_part_numbers = a_product_ids[ii];
* 			} else {
* 				rec_part_numbers = rec_part_numbers + ',' + a_product_ids[ii];
* 			}
* 			//console.warn('product: ' + a_product_ids[ii]);
* 		}
* 		console.warn('partNumbers: ' + rec_part_numbers);
* 		var zoneId = zone.replace(/\s+/g,'');
* 		wc.render.updateContext('WC_IntelligentOfferESpot_context_ID_' + zoneId, {'partNumbers':rec_part_numbers, 'zoneId': zoneId, 'espotTitle': target_header_txt});
* 	}
* }
*/