//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2011, 2012 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

dojo.require("dojox.xml.DomParser");

if(typeof(ProductTabJS) == "undefined" || ProductTabJS == null || !ProductTabJS) {
	
	ProductTabJS = {
		/**
		 * To make the tab selected
		 * 
		 * @param {String} tabId
		 */
		selectTab: function(tabId){
			dojo.query(".widget_tab_container .header li").removeClass("selected");
			dojo.query(".widget_tab_container .header li").removeClass("focused");	
			dojo.query(".widget_tab_container .header li a").forEach(function(selectedTab){
				selectedTab.setAttribute("aria-selected", "false");
			});
			
			dojo.addClass(tabId,"selected");
			document.getElementById(tabId + "_link").setAttribute("aria-selected", "true");
			
			dijit.byId('productTabContainer').selectChild(dijit.byId(tabId+"_content"));
			
			showById(tabId+"_content");
		},
		
		/**
		 * To make the tab selected with keyboard, only check for spacebar
		 * 
		 * @param {String} tabId
		 * @param {event} event
		 */
		selectTabWithKeyboard: function(tabId, event) {
			if (event.keyCode == dojo.keys.SPACE) {
				this.selectTab(tabId);
				this.cancelEvent(event);
			}
		},

		/**
		 * Stop event propagation
		 * 
		 * @param {event} e
		 */
		cancelEvent: function(e) {
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			if (e.preventDefault) {
				e.preventDefault();
			}
			e.cancelBubble = true;
			e.cancel = true;
			e.returnValue = false;
		},
		
		/**
		 * To bring the focus to the tab
		 * 
		 * @param {String} tabId
		 */
		focusTab: function(tabId){
			if(dojo.hasClass(tabId,"focused")){
				return;
			}
			
			dojo.query(".widget_tab_container .header li").removeClass("focused");
			if(!dojo.hasClass(tabId,"selected")){
				dojo.byId(tabId+"_link").focus();
				dojo.addClass(tabId,"focused");
			}
		},
	
		/**
		 * To take the focus out from the tab
		 * 
		 * @param {String} tabId
		 */
		blurTab: function(tabId){
			dojo.removeClass(tabId,"focused");
		},
		
		showAttachmentPage:function(data){
			var pageNumber = data['pageNumber'];
			var pageSize = data['pageSize'];
			pageNumber = dojo.number.parse(pageNumber);
			pageSize = dojo.number.parse(pageSize);

			setCurrentId(data["linkId"]);

			if(!submitRequest()){
				return;
			}
			
			console.debug(wc.render.getRefreshControllerById('AttachmentPagination_Controller').renderContext.properties);
			var beginIndex = pageSize * ( pageNumber - 1 );
			cursor_wait();
			wc.render.updateContext('AttachmentPagination_Context', {'beginIndex':beginIndex});
			MessageHelper.hideAndClearMessage();
		}
	}
	
}