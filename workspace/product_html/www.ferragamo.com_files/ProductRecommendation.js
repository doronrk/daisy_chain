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

if(typeof(RecommendationJS) == "undefined" || RecommendationJS == null || !RecommendationJS){
	
	RecommendationJS = { 
	
	/**
	 *  This function is used to display the next set of product recommendations
	 */	

	
	showNextResults: function(widgetId,pageNumber){
			if(!submitRequest()){
				return;
			}
			cursor_wait(); 
			
			var activeId = widgetId+"_"+pageNumber;
			if(null != dojo.byId(activeId)){
				dojo.byId(activeId).style.display = "none";
				
			}
			
			pageNumber++;
			
			var nextId = widgetId+"_"+pageNumber;
			if(null != dojo.byId(nextId)){
				dojo.byId(nextId).style.display = "block";
				
			}
			
			var currentIdValue = currentId;
			
			cursor_clear();
			
			var currentPagingButton = dojo.query("#"+nextId+" a")[0]; 
			if(!!currentPagingButton){
				currentPagingButton.focus();
			}
	},
	
	/**
	 *  This function is used to display the previous set of product recommendations
	 */	
	 
	showPrevResults: function(widgetId, pageNumber){
			if(!submitRequest()){
				return;
			}
			cursor_wait(); 
			
			var activeId = widgetId+"_"+pageNumber;
			if(null != dojo.byId(activeId)){
				dojo.byId(activeId).style.display = "none";
				
			}
			
			pageNumber--;
			
			var prevId = widgetId+"_"+pageNumber;
			if(null != dojo.byId(prevId)){
				dojo.byId(prevId).style.display = "block";
				
			}
			
			var currentIdValue = currentId;
			
			cursor_clear();

			var currentPagingButton = dojo.query("#"+prevId+" a")[0]; 
			if(!!currentPagingButton){
				currentPagingButton.focus();
			}
	}
 };	
}