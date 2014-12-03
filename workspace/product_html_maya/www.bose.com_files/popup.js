/*--------------------------------------------------------------------------------------------------------*/

/***
** title: Popup Window Script
** author: Dan DeRose
** company: Bose Corporation
** requires: $ 1.5
** last updated: 6/23/2011 by Dan DeRose
** description: Creates a popup window that can refer back to its parent. The popup behavior is keyed off the class "popup". If this class is applied to a normal href then it will instantiate the popup behavior. The rel attribute is used to specify the width, height, and popup behavior (child window or new window) in that order.
** rel="width,height,type"
***/

function popupWindowClass() {
	this.width = 600; // Default width
	this.height = 600; // Default height
	this.href = '';
	this.rel = '';
	this.type = '';

	// Methods
	this.doPopup = function(t,e) {
		// Kill the event and stop the href action
		e.preventDefault();
		
		// Get the href and rel and store in object
		this.href = jQuery(t).attr('href') || jQuery(t).parent().attr('href') || jQuery(t).parent().attr('action');
		this.rel = jQuery(t).attr('rel') || jQuery(t).parent().attr('rel') || jQuery(t).parent().attr('rel');
		if (this.rel) {
			var relData = this.rel.split(/,/);
			if(relData[0]) {
				this.width = relData[0];
			}
			if(relData[1]) {
				this.height = relData[1];
			}
			if(relData[2]) {
				this.type = relData[2];
			}
		}
		if(jQuery(t).data('width')) {
			this.width = jQuery(t).data('width');
		}
		if(jQuery(t).data('height')) {
			this.height = jQuery(t).data('height');
		}
		if(jQuery(t).data('popup-type')) {
			this.type = jQuery(t).data('popup-type');
		}

		// Check to see whether this is a child window or new window and spawn the popup
		if(this.type === 'new') {
			window.open(this.href,'','menubar=yes,toolbar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes,width=' + this.width + ',height=' + this.height);
		} else {
			window.open(this.href,'childWindow','menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=' + this.width + ',height=' + this.height);
		}
	}
}

if (typeof popupWindow == 'undefined') {
	var popupWindow = popupWindowClass;
}

jQuery('body').delegate('.popup','click',function(e) {
	objPopup = new popupWindowClass();
	objPopup.doPopup(this,e);
});
