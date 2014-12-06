_satellite.pushBlockingScript(function(event, target, $variables){
  $(document).on('basketItemAdded', function(e){
	if (e.addedToCart) {
		var qty = e.addedToCart.Quantity;
		var cost = e.addedToCart.price;
		var sku = e.addedToCart.pid;
		
		if (qty && cost && sku) {
			var arguments = 'activity;src=1391379;type=pier1290;cat=Pier10;qty=' + qty + ';cost=' + cost + ';u6=' + sku + '';
			writeFloodlightImagePixel(arguments);		
		}
	}
});

var params = 'activity;src=1391379;type=fy14p612;cat=Pier10;u6=' + $("#pdpMain").attr("data-pid") + '';
writeFloodlightImagePixel(params);

});
