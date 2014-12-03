var productStyleProductPageView = {
	onlyOneSize1: false,
	onlyOneSize2: false,
	selection: {
		variantId: null,
		colorId: null,
		size1Index: null,
		size2Index: null
	},
	buildFistBoxCopy: function() { /* this is populated in the init */ }, 
	
	init: function() {
		document.observe('productPage:newSelection', productStyleProductPageView.onSelection);
	},
	
	onSelection: function(event) {
		var selection = event.memo;
		productStyleProductPageView.evaluateSelection(selection);
	},
	
	evaluateSelection: function (selection){
		var isOAO = productStyleService.controller.isOnlyAvailableOnline(selection);
		productStyleProductPageView.fistEnabled(!isOAO);
	},
	
	fistEnabled: function(isEnabled){
		$('findInStoreButton').disabled = !isEnabled;
		$('findInStorePostalMsg').innerHTML = productStyleProductPageView.buildFistBoxCopy(isEnabled);
		
		 $$('.postalEdit').invoke('observe', 'click', function(event) {
			 merchLocationsManager.view.postalCodeOverlay.open();
		 }); 
	},
	render: function(){ /* this is part of the view interface */ }
};