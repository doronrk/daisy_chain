/**
 *
 * A JS library file for Tealium helpers.
 * This file is included by several script nodes using:
 *
 */

var TealiumHelper = TealiumHelper || {};

/*****************************************************************************
 * Name: resetProductAttributes
 * Description: Resets the product attributes
 *****************************************************************************/
TealiumHelper.resetProductAttributes = function( utag_data ) {
	utag_data.consumer_segment = '';
	utag_data.product_art = '';
	utag_data.product_brand = '';
	utag_data.product_category = '';
	utag_data.product_page_category = '';
	utag_data.product_subcategory = '';
	utag_data.product_collection = '';
	utag_data.product_color = '';
	utag_data.product_delivery_group = '';
	utag_data.product_department = '';
	utag_data.product_gender = '';
	utag_data.product_id = '';
	utag_data.product_sku = '';
	utag_data.product_name = '';
	utag_data.product_price = '';
	utag_data.product_season = '';
	utag_data.product_size = '';
	utag_data.product_style = '';
	utag_data.sbu = '';
};

/*****************************************************************************
 * Name: parseQueryString
 * Description: Parses a query string for select values
 *****************************************************************************/
TealiumHelper.parseQueryString = function( utagData ) {
	utagData.filter_gender = TealiumHelper.queryObj( 'gender', window.location.search );
	if( utagData.filter_gender == '' ){
		utagData.filter_gender = TealiumHelper.queryObj( 'gender', window.location.hash );
	}
	
	utagData.filter_size = TealiumHelper.queryObj( 'size', window.location.search );
	if( utagData.filter_size == '' ){
		utagData.filter_size = TealiumHelper.queryObj( 'size', window.location.hash );
	}
	
	utagData.filter_brand = TealiumHelper.queryObj( 'brand', window.location.search );
	if( utagData.filter_brand == '' ){
		utagData.filter_brand = TealiumHelper.queryObj( 'brand', window.location.hash );
	}
	
	utagData.filter_style = TealiumHelper.queryObj( 'filterNavLevel1', window.location.search );
	if( utagData.filter_style == '' ){
		utagData.filter_style = TealiumHelper.queryObj( 'filterNavLevel1', window.location.hash );
	}
	
	return utagData;
};

/*****************************************************************************
 * Name: resetQueryStringAttributes
 * Description: Resets the query string attributes
 *****************************************************************************/
TealiumHelper.resetQueryStringAttributes = function() {
	utag_data.filter_gender = '';
	utag_data.filter_size = '';
};

/*****************************************************************************
 * Name: queryObj
 * Description: Searches a query string for variables
 *****************************************************************************/
TealiumHelper.queryObj = function( match, location ) {
    var result = {}, keyValuePairs = location.slice(1).split('&');
    
    var matchingValue = null;
    var matchingAttr = null;
    
    // Provides IE8 with forEach support
    if (typeof Array.prototype.forEach != 'function') {
        Array.prototype.forEach = function(callback){
          for (var i = 0; i < this.length; i++){
            callback.apply(this, [this[i], i, this]);
          }
        };
    }
    
    keyValuePairs.forEach(function(keyValuePair) {
        keyValuePair = keyValuePair.split('=');
        if( keyValuePair[1] == match ){
        	matchingAttr = keyValuePair[0].replace('n', 'v');
        }
        
        if( matchingAttr != null & keyValuePair[0] == matchingAttr) {
        	matchingValue = keyValuePair[1]
        }
    });

    if( matchingValue != null){
    	return matchingValue;
    }
    return '';
};

/*****************************************************************************
 * Name: setAttr
 * Description: Sets a variable within the utag
 *****************************************************************************/
TealiumHelper.setAttr = function( name, value ) {	
	if( utag_data == null){
		utag_data = {};
		utag_data[ name ] = value;
	} else {
		utag_data[ name ] = value;
	}
};

/*****************************************************************************
 * Name: throwShippingEvent
 * Description: Fires the tealium link method for tracking shipping
 *****************************************************************************/
TealiumHelper.throwShippingEvent = function() {
	if( typeof(utag) != 'undefined' && typeof(shippingAttributes) != 'undefined')
	{
		shippingAttributes.page_name = "Shipping";
		shippingAttributes.page_category_id = utag_data.page_category_id;
		utag.view( shippingAttributes );
		
	}
};

TealiumHelper.throwRegistrationEvent = function( id, email, city, state, zip){
	if( typeof(utag) != 'undefined' ){
		utag.link({
			"customer_id"	: id.toString(),
			"customer_email": email.toString(),
			"customer_city"	: city.toString(),
			"customer_state": state.toString(),
			"customer_zip"	: zip.toString(),
			"event_type"	: "registration"
		});
	}
};

TealiumHelper.throwPayPalConversion = function( eventID, eventActionType, callback ){
	if( typeof(utag) != 'undefined' ){
		utag.link({
			"event_category": 'PayPal',
			"event_id"		: eventID.toString(),
			"event_action_type": eventActionType.toString()
		});
	};
	
	if (typeof callback === 'function') {
		callback();	
	};
};


/*****************************************************************************
 * Name: throwSizeChartEvent
 * Description: Tracks size chart clicks
 *****************************************************************************/
TealiumHelper.throwSizeChartEvent = function() {
	if( typeof(utag) != 'undefined' && typeof(sizeChartAttributes) != 'undefined' && typeof(customerAttributes) != 'undefined')
	{
		if( typeof(customerAttributes) != 'undefined' )
		{
			var customerData = this.extractCustomerAttributes( customerAttributes );
			$.extend(sizeChartAttributes, customerData);
		}
		
		sizeChartAttributes = TealiumHelper.scrubPageAttributes( sizeChartAttributes );
		utag.link( sizeChartAttributes );
	}
};

/*****************************************************************************
 * Name: throwAddToCartEvent
 * Description: Tracks size chart clicks
 *****************************************************************************/
TealiumHelper.throwAddToCartEvent = function() {
	if( typeof(utag) != 'undefined' && typeof(addToCartAttributes) != 'undefined' && typeof(utag_data) != 'undefined')
	{
		if( typeof(customerAttributes) != 'undefined' )
		{
			var customerData = this.extractCustomerAttributes( customerAttributes );
			$.extend(addToCartAttributes, customerData);
			addToCartAttributes.site_currency 		= ( customerAttributes.site_currency != null ) ? customerAttributes.site_currency : '';
			addToCartAttributes.total_cart_count 	= ( customerAttributes.total_cart_count != null ) ? customerAttributes.total_cart_count : '';
			addToCartAttributes.total_cart_count 	= ( customerAttributes.total_cart_count != null ) ? customerAttributes.total_cart_count : '';
			addToCartAttributes.current_brand 		= ( customerAttributes.current_brand != null ) ? customerAttributes.current_brand : '';
			addToCartAttributes.visitor_device 		= ( customerAttributes.visitor_device != null ) ? customerAttributes.visitor_device : '';		}
		
		if( typeof( pdpAttributes ) != 'undefined' ){
			addToCartAttributes.online_exclusive	= ( pdpAttributes.online_exclusive != null ) ? pdpAttributes.online_exclusive : '';
			addToCartAttributes.product_msrp 		= ( pdpAttributes.product_msrp != null ) ? pdpAttributes.product_msrp : '';
			addToCartAttributes.product_class 		= ( pdpAttributes.product_class != null ) ? pdpAttributes.product_class : '';
			addToCartAttributes.product_subclass	= ( pdpAttributes.product_subclass != null ) ? pdpAttributes.product_subclass : '';
		}

		utag.link( addToCartAttributes );
	}
};

/*****************************************************************************
 * Name: scrubPageAttributes
 * Description: Removes the page_ attributes from the utag
 *****************************************************************************/
TealiumHelper.scrubPageAttributes = function( utag ) {
	delete utag['page_name'];
	delete utag['page_type'];
	delete utag['page_category_id'];
	delete utag['product_page_category'];
	
	return utag;
};

/*****************************************************************************
 * Name: extractCustomerAttributes
 * Description: Returns a JSON containing only Customer attributes
 *****************************************************************************/
TealiumHelper.extractCustomerAttributes = function( utag ) {
	var customerData 						= {};
	customerData.customer_city 				= ( utag.customer_city != null ) ? utag.customer_city : '';
	customerData.customer_country 			= ( utag.customer_country != null ) ? utag.customer_country : '';
	customerData.customer_id 				= ( utag.customer_id != null ) ? utag.customer_id : '';
	customerData.customer_state 			= ( utag.customer_state != null ) ? utag.customer_state : '' ;
	customerData.customer_updated_country 	= ( utag.customer_updated_country != null ) ? utag.customer_updated_country : '';
	customerData.customer_zip 				= ( utag.customer_zip != null ) ? utag.customer_zip : '';
	customerData.cross_brand_shopper		= ( utag.cross_brand_shopper != null ) ? utag.cross_brand_shopper : '';
	customerData.logged_in_state			= ( utag.logged_in_state != null ) ? utag.logged_in_state : '';
	customerData.cart_total					= ( utag.cart_total != null ) ? utag.cart_total : '';
	return customerData;
};

/*****************************************************************************
 * Name: initSocialButtons
 * Description: Returns a JSON containing only Customer attributes
 *****************************************************************************/
TealiumHelper.initSocialButtons = function(){
	$("li.pdpShare, li.send-to-friend").on("click", function(){
		TealiumHelper.throwSocialShareEvent( this, 'Send To Friend' );
	});
	
	$("li.pinterest").on("click", function(){
		TealiumHelper.throwSocialShareEvent( this, 'Pinterest' );
	});
	
	// Facebook share tracking on Product Set page, PDP uses FB event subscribing
	$("#product-set-list .share-icons li.facebook a").on("click", function(){
		TealiumHelper.throwSocialShareEvent( this, 'Facebook' );
	});

};

TealiumHelper.throwSocialShareEvent = function( obj, type ){
	var socialData = {};
	socialData.social_share = type;
	socialData.product_sku = $(obj).closest("ul").attr("pid");
	socialData.product_name = $(obj).closest("ul").attr("pname");
	
	if( typeof(pdpAttributes) != 'undefined' )
	{
		socialData.brands_browsed = pdpAttributes.brands_browsed;
	}

	utag.link( socialData );
};