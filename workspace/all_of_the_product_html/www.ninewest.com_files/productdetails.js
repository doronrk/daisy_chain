var productDetailTabElement = {
	initialize: function() {
		var reviewsTab = $('reviewsTab');
		var pdetailsTab = $('pdetailsTab');
		if (reviewsTab != null) {
			reviewsTab.onclick = this.reviewsClickHandler;
		}
		if (pdetailsTab != null) {
			pdetailsTab.onclick = this.pdetailsClickHandler;
		}
	},
	reviewsClickHandler: function() {
		$('productReview').style.display = 'block';
		$('productDetails').style.display = 'none';
		$('reviewsTab').src = staticRoot + 'images/productDetail/reviewsTab_on.jpg';
		$('pdetailsTab').src = staticRoot + 'images/productDetail/productDetailsTab.jpg';
	},
	pdetailsClickHandler: function() {
		$('productDetails').style.display = 'block';
		$('productReview').style.display = 'none';
		$('reviewsTab').src = staticRoot + 'images/productDetail/reviewsTab.jpg';
		$('pdetailsTab').src = staticRoot + 'images/productDetail/productDetailsTab_on.jpg';
	}
};

var extensibleArea = Class.create({
	element: null,
	openHandlers: [],
	closeHandlers: [],
	
	initialize: function(areaName) {
		var that = this;
		this.element = $(areaName);
		if (this.element) {
			var controls = $$('.extensibleAreaControl');
			if (controls) {
				controls.each(function(element) {
					if (element.hasClassName('open_' + areaName)) {
						element.extensibleAreaBinding = that;
						element.onclick = that.openHandler;
						that.openHandlers.push(element);
					}
					if (element.hasClassName('close_' + areaName)) {
						element.extensibleAreaBinding = that;
						element.onclick = that.closeHandler;
						that.closeHandlers.push(element);
						element.hide();
					}
				});
			}
			this.element.hide();
		}
	},
	show: function(visible) {
		if (visible) {
			this.element.show();
			this.openHandlers.each(function(element) {
				element.hide();
			});
			this.closeHandlers.each(function(element) {
				element.show();
			});
		} else {
			this.element.hide();
			this.openHandlers.each(function(element) {
				element.show();
			});
			this.closeHandlers.each(function(element) {
				element.hide();
			});
		}
	},
	openHandler: function() {
		this.extensibleAreaBinding.show(true);
	},
	closeHandler: function() {
		this.extensibleAreaBinding.show(false);
	}
});

var buttonsBar = {
	form: null,
	pidField: null,
	masterPidField: null,
	addToWishlistButton: null,
	tellAFriendButton: null,
	findInStoreButton: null,
	skuPicker: null,
	
	initialize: function(form, picker) {
		this.form = $(form);
		if (this.form != null) {
			this.pidField = this.form.pid;
			this.masterPidField = this.form.masterpid;
			if (this.pidField != null) {
				this.skuPicker = picker;
				this.addToWishlistButton = $('addToWishlistButton');
				//this.tellAFriendButton = $('tellAFriendButton');
				//this.findInStoreButton = $('findInStoreButton');
				
				this.registerButton(this.addToWishlistButton);
				//this.registerButton(this.tellAFriendButton);
				//this.registerButton(this.findInStoreButton);
			}
		}
	},
	
	registerButton: function(button) {
		if (button != null) {
			button.onclick = this.clickHandler;
			button.buttonsBarHandler = this;
		}
	},
	
	clickHandler: function() {
		if (this.buttonsBarHandler.pidField.value != '') {
			var url = this.href;
			if (url.indexOf('?') != -1) {
				url += '&';
			} else {
				url += '?';
			}
			url += 'pid=' + this.buttonsBarHandler.pidField.value;
			this.href = url;
			return true;
		} else {
			this.buttonsBarHandler.skuPicker.selectionStates.setMessage('force');
			return false;
		}
	}
};

var productDetails = {
	enlargeViewer: null,
	writeReviewViewer: null,
	readReviewViewer: null,
	printViewer: null,
	fabricGlossaryViewer: null,
	fitGuideViewer: null,
	picker: null,
	
	initialize: function() {
		productDetailTabElement.initialize();
		new extensibleArea('productDetails2');
		picker = new skuPicker(eval($('lookupTable').value)[0],'','productDetail',eval($('imagesLookupTable').value)[0]);
		picker.init();
		
		buttonsBar.initialize('addToCartForm', picker);
		
		this.initEasyViewer();
		this.initPrintButton();
	},
	
	initEasyViewer: function() {
		try{this.enlargeViewer = new easyViewer('Enlarge');}catch(err){}
		/*this.writeReviewViewer = new easyViewer('Write');
		this.readReviewViewer = new easyViewer('Read');*/
		try{this.printViewer = new easyViewer('Print');}catch(err){}
		try{this.fabricGlossaryViewer = new easyViewer('FabricGlossary');}catch(err){}
		try{this.fitGuideViewer = new easyViewer('FitGuide');}catch(err){}
	},
	
	initPrintButton: function() {
		var printButton = $('evPrintPrintButton');
		if (printButton) {
			printButton.onclick = this.printClickHandler;
		} 
	},
	
	printClickHandler: function() {
		$('evPrintShadow').style.display='none';
		window.print();
		return false;
	}
};

document.observe('dom:loaded', function() {
	productDetails.initialize();
});
function LoadRecommendations(url) {
	new Ajax.Request(url, {method:'post', onSuccess: this.showRec, onFailure: function() {alert('failure');}});
}
function showRec(transport){
	var response = transport.responseText;
	jQuery('#asynchrec').html(response);
	try {
		resx.appid = $('certonaSiteID').value;
		resx.top1 = 100000;
		resx.top2 = 100000;
		resx.links = $('certonaTagDataProducts').value;
		resx.event = "product";
		resx.itemid = $('certonaTagDataProductID').value;
		resx.pageid = $('certonaTagDataPageID').value;
		certonaResx.run();
	} catch(err) {}
}