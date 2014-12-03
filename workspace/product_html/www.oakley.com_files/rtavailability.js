function initRealTimeAvailability(app) {
    app.checkAvailabilityHandler = function( event ) {
	//referencing the Oakley app that this function has been bound to
	var instance = this;
	var aliases  = instance.productAttributes[instance.productId]['aliases'];
	console.log(event);
	jQuery.each( aliases, function( alias, label ) {
	    attr = instance.getProductAttributeByAlias( alias );
	
	    if( event.data.productAttributeId == attr.productAttributeId ) {
		jQuery.each(attr.productAttributeValues, function(index, value) {
		    console.log(value);
		    var vendorId = value.valueConfig.vendorId;
		    //if(vendorId == "44-120") {
	            //		alert("NOT AVAILABLE");
	            //		event.stopPropagation();
		    //}
		});
	    }
	});
	
	console.log(event);
	console.log(instance.productAttributes[instance.productId]);
    };
    
    app.configureApi.configureApp.addEventListener(
	fluid.retail.html.configure.FConfigureApplication.BEFORE_SELECT_VALUE, 
	app, app.checkAvailabilityHandler);
    
}

/*
 this.configParams['productOverrides'] = {
            "values": {
                "37-659": {
                    "valueUsages": {
                        "RTA": { "active":false}
                    }
                },
                "37-677": {
                    "valueUsages": {
                        "RTA": { "active":false}
                    }
                },
                "44-116": {
                    "valueUsages": {
                        "RTA": { "active":false}
                    }
                }
            }
        };
*/
