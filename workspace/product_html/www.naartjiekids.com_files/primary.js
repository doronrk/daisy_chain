// Ignore any IE "console." JS errors.  (We had one with Flexpaper that we couldn't work around)
window.console = window.console || (function(){
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
    return c;
})();

$(document).ready(function(){

	//  MAIN NAV
	$('#main_nav li').mouseover(function() {
		$(this).find('.nav_size').css( 'display', 'block' );
	});

	$('#main_nav li').mouseout(function() {
		$(this).find('.nav_size').css( 'display', 'none' );
	});

	//  CATEGORY MOUSE OVERS
	$('.category_sub_list li.animate').mouseover(function() {
		$(this).addClass( 'over' );
	});

	$('.category_sub_list li.animate').mouseout(function() {
		$(this).removeClass( 'over' );
	});

	//  Disable all form autocompleting (for security)
	disableAutoComplete();

	//  Is fancybox loaded?
	if( typeof( $.fancybox ) != 'undefined' ) {
		//  Set the modals.
		$("a.modal, a.modal-link, area.modal-link").fancybox({
			'titlePosition'     : 'inside',
			'showCloseButton'   : true,
			'transitionIn'      : 'none',
			'centerOnScroll'    : true,
			'transitionOut'     : 'none'
			});

		$("a.modal-iframe").each(function() {

			var iframe_params = {
				'type'              : 'iframe',
				'titlePosition'     : 'inside',
				'showCloseButton'   : true,
				'transitionIn'      : 'none',
				'centerOnScroll'    : true,
				'transitionOut'     : 'none'
				};

			var rel_regex = /^(\d+)x(\d+)$/;
			var rel = new String( $(this).attr( 'rel' ) );

			//  Set the iframe width using the 'rel' attribute?
			if( rel != undefined && rel.match( rel_regex ) ) {
				iframe_params.autoScale = false;
				iframe_params.autoSize = false;
				iframe_params.width = Number( rel.replace( rel_regex, '$1' ) );
				iframe_params.height = Number( rel.replace( rel_regex, '$2' ) );
			}

			$(this).fancybox( iframe_params );
		});

		//  Set the modals.
		$("a.modal-no-close").fancybox({
			'titlePosition'     : 'inside',
			'showCloseButton'   : false,
			'transitionIn'      : 'none',
			'centerOnScroll'    : true,
			'transitionOut'     : 'none'
			});

		$("#email_join_widget").submit( function(){

			if( $('body').hasClass('mobile-body') ){ return true; }

			the_email = $(this).find(':input[name=email]').val();
			if( /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(the_email) ){
				$.fancybox({
					'transitionIn': 'fade',
					'transitionOut': 'fade',
					'width': 450,
					'padding': 0,
					'href': '/email/captcha?email=' + encodeURIComponent(the_email),
					'type': 'iframe'
				});
			}
			else{
				$.fancybox({
					'transitionIn': 'fade',
					'transitionOut': 'fade',
					'width': 450,
					'padding': 0,
					'content': '<div style="text-align:center;padding: 75px 40px">That is not a valid email address.</div>'
				});
			}
			return false;
		});
	}
});

//  DISABLE ALL FORM AUTOCOMPLETING
function disableAutoComplete() {
	if( !( document.forms && document.forms.length > 0 ) ) {
		return;
	}

	var my_url = new String( document.location );

	//  Disable for admin login.
	if( my_url.match( /\/admin\/index\/login\/.*/ ) ) {
		return;
	}

	for( var i = 0; i < document.forms.length; i++ ) {
		if( !( document.forms[i] && document.forms[i].elements && document.forms[i].elements.length > 0 ) ) {
			continue;
		}
		for( var j = 0; j < document.forms[i].elements.length; j++ ) {
			if( !$( document.forms[i].elements[j] ).attr( 'autocomplete' ) || $( document.forms[i].elements[j] ).attr( 'autocomplete' ) != 'on' ) {
				$( document.forms[i].elements[j] ).attr( 'autocomplete', 'off' );
			}
		}
	}
}

// CONTRACT/EXPAND A CATEGORY
function catContract( cnt ) {
	if( $('#'+cnt).find( '.category_sub_list' ).css( 'display' ) == "block" ) {
		$('#'+cnt).find( '.category_sub_list' ).slideUp();
		$('#'+cnt).find( '.category_sub_list_header .arrow' ).attr( 'src', '/images/cat_arraw_right.gif' );
	} else {
		$('#'+cnt).find( '.category_sub_list' ).slideDown();
		$('#'+cnt).find( '.category_sub_list_header .arrow' ).attr( 'src', '/images/cat_arraw_down.gif' );
	}
}

//  PRODUCT TABS
function toggleProductTab( cnt ) {
	tabs = $(cnt).parents('.tab-container');
	$(tabs).find('li').removeClass('on');
	$(tabs).find('.tab-pane').hide();
	var id_cnt = $(cnt).attr( 'id' ) + "-pane";
	$(cnt).addClass('on');
	$('#'+id_cnt).show();

}

//  ADD ITEM POPUP
$(function(){
	var page_popup = function(){
		showPagePopup();
		//$('#page_screen_box').css({'display': 'block', opacity: 0.7, 'width':$(document).width(),'height':$(document).height()});
		//$('body').css({'overflow':'hidden'});
		//$('#page_popup_box').css({'display': 'block'}).click(function(){$(this).css('display', 'none');$('#page_screen_box').css('display', 'none')});
	}
	$('#button').click(page_popup);
});

function showPagePopup() {
	$('#page_screen_box').css({'display': 'block', opacity: 0.7, 'width':$(document).width(),'height':$(document).height()});
	$('#page_popup_box').css({'display': 'block'});
	$('#page_popup_box').html( $('#page_popup_box').html() + '<a href="javascript: void(0);" onclick="closePagePopup();"><img id="page_popup_box_close" src="/images/popup_close.gif" /></a>' );
	$('#item_added_continue_shopping').focus();
}

function closePagePopup() {
	$('#page_popup_box').css({'display': 'block'}).click(function(){$(this).css('display', 'none');$('#page_screen_box').css('display', 'none')});
}

//  UPDATE THE 'VIEW CART' BUTTON CONTENT.
function updateViewCart() {
	$.get("/order/json-cart-summary/", function(data){

		var summary = data;

		if( summary && typeof( summary.line_count ) != 'undefined' && summary.line_count > 0 ) {
			$('#header_view_cart_count').html( '(' + summary.line_count+ ')' );
			$('#header_view_cart').removeClass('no-display');

			//  On the order summary page, update the sub-total.
			if( $('#order_sub_total') ) {
				$('#order_sub_total').html( summary.sub_total);
			}

			//  Shipping.
			if( summary.shipping > 0.00 ) {
				$('#order_shipping').html( summary.shipping );
				$('#shipping_cnt').css( 'display', 'block' );
			} else {
				$('#shipping_cnt').css( 'display', 'none' );
			}
		} else {
			$('#header_view_cart').addClass('no-display');
		}
	}, 'json' );
}

//  ADD AN ITEM TO A CART
function addItemToCart( sku_idx, price, from_mobile_product_idx ) {

	$('#adding-item-modal-link').click()

	var url = "/product/add-to-cart/?"
		+ "product_sku_idx=" + encodeURIComponent( sku_idx )
		+ "&product_price_quote=" + encodeURIComponent( price )
		+ "&from_category=" + encodeURIComponent( ( ( typeof( from_category ) != 'undefined' ) ? from_category : '' ) )
		+ "&other_info=" + encodeURIComponent( "other info" );

	$.get( url, function(data) {
		updateViewCart();

		if( !from_mobile_product_idx ) {
			$('#add-item-modal').html( data.html );
			$('#add-item-modal-link').click();
		} else {

			count = data.line_count;

			if( count > 1 ) { $('#mobile-added-number-'+from_mobile_product_idx).html( "are " + count + " items" );
			} else { $('#mobile-added-number-'+from_mobile_product_idx).html( "is " + count + " item" ); }

			$('div.mobile-nav span.mobile-header-nav-cart-num').html( count );
			$('#mobile-cart-line-expiration-'+from_mobile_product_idx).html( data.line_expiration );
			$('#mobile-added-to-cart-link-'+from_mobile_product_idx).click();
		}
	},'json');
}

//  ADD AN OUTFIT ITEM
function addOutFitSKU( product_idx, sku, color, size, color_idx ) {

	//  Adding or removing?
	var adding = true;
	if( $('#sku_image_'+sku).hasClass( 'sku-checked' ) ) {
		removeOutfitProduct( sku );
		return;
	}

	for( var i = 0; i < product_list.length; i++ ) {
		if( product_list[i].idx == product_idx ) {

			var sel_sku = new Object();
			sel_sku.sku = sku;
			sel_sku.color = color;
			sel_sku.color_idx = color_idx;
			sel_sku.size = size;
			product_list[i].selected_skus.push( sel_sku );
		}
	}

	drawOutfitCart();
}

function drawOutfitCart() {

	//  Reset some stuff.
	$('#outfit-selections').html( '' );
	$('img.sku-check').removeClass( 'sku-checked' );
	var total_sku_count = 0;

	for( var i = 0; i < product_list.length; i++ ) {

		var prod = product_list[i];

		for( var j = 0; j < prod.selected_skus.length; j++ ) {

			var me = prod.selected_skus[j];
			total_sku_count++;
			$('#sku_image_'+me.sku).addClass( 'sku-checked' );

			var tr = "";
			tr = tr + '<li id="outfit-selection-' + prod.product_key + '">';
			tr = tr + '<table><tr>';
			tr = tr + '<td><img src="/files/product_images/' + prod.product_key + '-' + me.color_idx + '-65x73.jpg" /></td>';
			tr = tr + '<td>';
			tr = tr + '		<div id="outfit-selections-prod-title" class="orange"><b>' + prod.product_name + '</b></div>';
			tr = tr + '		<div id="outfit-selections-prod-color">Color: ' + me.color + '</div>';
			tr = tr + '		<div id="outfit-selections-prod-size">Size: ' + me.size + '</div>';
			tr = tr + '		<div id="outfit-selections-prod-size"><a href="javascript: void(0);" onclick="removeOutfitProduct( \'' + me.sku + '\' )">delete</a></div>';
			tr = tr + '</td>';
			tr = tr + '</tr></table>';
			tr = tr + '</li>';

			$('#outfit-selections').append( tr );
		}
	}

	//  Open the fancy box window.
	if( $('#fancybox-content').html() == '' && total_sku_count > 0 ) {
		$('#outlook-add-to-cart-link').click();
	}

	//  No items?
	if( total_sku_count <= 0 ) {
		$.fancybox.close();
	}

	setOutfitTotal();
	toggleOutfitSubmit();
}

function removeOutfitProduct( sku ) {

	for( var i = 0; i < product_list.length; i++ ) {

		var delete_index = null;

		for( var j = 0; j < product_list[i].selected_skus.length; j++ ) {

			var me = product_list[i].selected_skus[j];

			if( me.sku == sku ) {
				delete_index = j;
			}

		}

		if( delete_index != null ) {
			product_list[i].selected_skus.splice( delete_index, 1 );
		}
	}

	drawOutfitCart();
}

function toggleOutfitSubmit() {
	if( numberOfOutfitItems() > 0 ) {
		$('div.outfit-submit').show();
		return true;
	}
	$('div.outfit-submit').hide();
	return false
}

function setOutfitTotal() {

	var total = 0.00;

	for( var i = 0; i < product_list.length; i++ ) {
		if( product_list[i].selected_skus.length > 0 ) {
			total += product_list[i].price * product_list[i].selected_skus.length;
		}
	}

	$('#outfit-selections-total-value').html( total.toFixed( 2 ) );
}

function numberOfOutfitItems() {

	var num_items = 0;

	for( var i = 0; i < product_list.length; i++ ) {
		if( product_list[i].selected_skus.length > 0 ) {
			num_items += product_list[i].selected_skus.length;
		}
	}

	return num_items;
}

//  ADD AN OUTFIT TO CART
function addOutfitToCart() {

	if( !numberOfOutfitItems() ) {
		return false;
	}

	//  Build a list of the seleced skus.
	var selected_skus = new Array();

	for( var i = 0; i < product_list.length; i++ ) {
		for( var j = 0; j < product_list[i].selected_skus.length; j++ ) {

			var sku_data = product_list[i].selected_skus[j];

			var my_sku = new Object();
			my_sku.sku = sku_data.sku;
			my_sku.price = product_list[i].price;

			selected_skus.push( my_sku );
		}
	}

	var url = '/outfit/add-to-cart/?item_data=' + encodeURIComponent( JSON.stringify( selected_skus ) );

	$.get( url, function(data) {
		if( data.success ) {
			document.location = '/order/?u=' + Math.random();
		}
	},'json');
}

//  DELETE A CART LINEITEM
function deleteCartItem( line_idx ) {
	$.ajax({
		type: "POST",
		url: "/order/modal-delete-item/",
		data: {
			line_idx: line_idx
		},
		success: function(data){
			updateViewCart();
		},
		error: function( xhr, status, error ){
			console.log( status );
			console.log( error );
		}
	});

	$('#fancybox-close').click();
}

//  CHANGE A CART QUANTITY
var changing_qty = false;
function cartChangeQty( line_idx, fld, old_qty ) {

	//  Is QTY Changing.
	if( changing_qty ) { return; }

	if( !( Number( line_idx ) && Number( line_idx ) > 0 && fld && Number( $(fld).val() ) == $(fld).val() && $(fld).val() != '' ) ) {
		return;
	}

	var url = "/order/change-cart-qty/?line_idx=" + Number( line_idx ) + "&qty=" + Number( $(fld).val() );

	$('#qty_notice_'+line_idx).html( 'updating quantity' );

	changing_qty = true;

	$.get( url, function(data){

		changing_qty = false;

		var summary = eval( '('+data+')' );

		//  Error?
		if( summary && typeof( summary.error ) != 'undefined' && summary.error ) {
			$('#qty_notice_'+line_idx).html( summary.error );

			if( summary && typeof( summary.total_inv ) != 'undefined' && summary.total_inv ) {
				$(fld).val( summary.total_inv );
			}

			return;
		}

		if( summary && typeof( summary.idx ) != 'undefined' && summary.idx > 0 ) {

			if( summary.total_lines <= 0 ) {
				document.location = '/order/';
				return;
			}

			//  Deleted?
			if( summary.is_deleted == 1 ) {
				$('#cart_line_'+line_idx).css( 'display', 'none' );
			}

			//  Update the notice.
            if( typeof( summary.message ) != 'undefined' && summary.message != '' ) {
				$('#qty_notice_'+line_idx).html( summary.message );
			} else {
				$('#qty_notice_'+line_idx).html( 'quantity updated' );
			}

			$(fld).val( summary.new_qty );
			$('#'+line_idx+'_inventory').html( summary.inventory );

			//  Update the price
			$('#price_'+line_idx).html( summary.price );

			//  Update the total price
			$('#total_'+line_idx).html( summary.total_price );

		} else {
			$('#qty_notice_'+line_idx).html( '' );
		}

		updateViewCart();
	});
}

// CHANGE THE SHIPPING ADDRESS TYPE
function changeShippingType( el ) {
	if( $(el).val() == "usa" ) {
		$('#delivery_address_usa').css( 'display', 'block' );
		$('#delivery_address_intl').css( 'display', 'none' );
		toggleShippingMethods( 'block' );
	} else {
		$('#delivery_address_usa').css( 'display', 'none' );
		$('#delivery_address_intl').css( 'display', 'block' );
		toggleShippingMethods( 'none' );
	}

	showGiftingOptions();
	storeShipmentOption();
}

function showGiftingOptions() {
	if( $('#ship_type').val() == 'usa' || $('#ship_locale_idx').val() == 2 ) {
		$('#gifting_options').css( 'display', 'block' );
	} else {
		$('#gifting_options').css( 'display', 'none' );
	}
}

function addressHasPO() {

	if( $('#ship_type').val() != 'usa' ) {
		return;
	}

	// FPO, PO?
	var address1 = ( ( $('#address1') && $('#address1').val() ) ? $('#address1').val() : '' );
	var address2 = ( ( $('#address2') && $('#address2').val() ) ? $('#address2').val() : '' );
	var address = new String( address1 + " " + address2 );

	//  Address field.
	if( address.match( /(p\.?\s?o\.?\s?|f\.?p\.?o\.?|a\.?p\.?o\.?)\s*box/i ) ) {
		return true;
	}

	//  City.
	if( $('#shipping_city_select').val() == 'FPO' || $('#shipping_city_select').val() == 'APO' ) {
		return true;
	}

	return false;
}

function addressPOChecker() {

	if( addressHasPO() || $('#ship_type').val() != 'usa' ) {
		$('#domestic_shipping_methods').css( 'display', 'none' );
		return;
	}

	$('#domestic_shipping_methods').css( 'display', 'block' );
}

function onLoadCheckForMethods() {

	if( $('#ship_type').val() != 'usa' ) {
		$('#domestic_shipping_methods').css( 'display', 'none' );
	} else {
		$('#domestic_shipping_methods').css( 'display', 'block' );
	}
}

function toggleShippingMethods( display_value ) {

	// FPO, PO?
	if( addressHasPO() || $('#ship_type').val() != 'usa' ) {
		$('#domestic_shipping_methods').css( 'display', 'none' );
		return;
	}

	$('#domestic_shipping_methods').css( 'display', display_value );
}

//  CHANGE STORE SHIPMENT OPTIONS
function storeShipmentOption() {
	if( $('#is_store_shipment' ) ) {
		if( $('#is_store_shipment' ).attr( 'checked' ) ) {
			toggleShippingMethods( 'none' );
		} else {
			if( $('#ship_type').val() == 'usa' ) {
				toggleShippingMethods( 'block' );
			} else {
				toggleShippingMethods( 'none' );
			}
		}
	}
}

//  CHANGE THE PAYMENT TYPE
function changePaymentType() {
	if( $('#payment_type_usa').attr( 'checked' ) ) {
		$('#payment_address_us').css( 'display', 'block' );
		$('#payment_address_intl').css( 'display', 'none' );
	} else {
		$('#payment_address_us').css( 'display', 'none' );
		$('#payment_address_intl').css( 'display', 'block' );
	}
}

//  ON THE BILLING FORM, USE THE SHIPPING INFORMATION
function billingUseShipping( el, ship_data ) {

	//  Not checked, clear the fielkds.
	if( !$(el).attr( 'checked' ) ) {
		for( var i = 0; i <= document.forms[ 'billing_form' ].elements.length; i++ ) {
			var fld = document.forms[ 'billing_form' ].elements[i];

			if( !( fld && fld.name && fld.name != '' ) ) {
				continue;
			}

			if( fld.name.toString().match( /^billing\[.*\]$/ ) ) {
				$(fld).val( '' );
			}
		}
		return;
	}

	if( !( addr_vals = ship_data.split( "^^^" ) ) ) {
		return;
	}

	//  International?
	var intl = false;
	for( var i = 0; i <= addr_vals.length; i++ ) {
		if( addr_vals[i] && addr_vals[i].split( "*||*" )[0] == 'geo_country_idx' && addr_vals[i].split( "*||*" )[1] != 1 ) {
			intl = true;
		}
	}

	//  Show either INTL or USA
	if( intl ) {
		$('#payment_type_intl').attr( 'checked', true );
		changePaymentType();
	} else {
		$('#payment_type_usa').attr( 'checked', true );
		changePaymentType();
	}

	//  Fill the form fields.
	for( var i = 0; i <= addr_vals.length; i++ ) {

		if( !addr_vals[i] ) {
			continue;
		}

		val = addr_vals[i].split( "*||*" );
		val_field = val[0];
		val_value = val[1];

		//  Set the standard values.
		form_field = document.forms[ 'billing_form' ].elements[ 'billing['+val_field+']' ] ;
		if( form_field ) { $(form_field).val( val_value ); }

		//  Set the USA values
		form_field = document.forms[ 'billing_form' ].elements[ 'billing[usa]['+val_field+']' ] ;
		if( form_field ) { $(form_field).val( val_value ); }

		//  Set the INTL values
		form_field = document.forms[ 'billing_form' ].elements[ 'billing[intl]['+val_field+']' ] ;
		if( form_field ) { $(form_field).val( val_value ); }
	}
}

//  SWAP THE PRODUCT IMAGE (ON THE PRODUCT PAGE) FOR EACH NEW COLOR
var new_product_image;
function swapProductColor( color_idx, product_image_id ) {

	var img = ( product_image_id ? $('#'+product_image_id) : $('#product_image') );

	if( !img.attr( 'src' ) ) {
		return;
	}

	//  Load the new product image.
	var new_src = img.attr( 'src' ).toString().replace( /(.*-)(\d+)(-\d+[x]\d+\.jpg)/, ( "$1" + color_idx + "$3" ) );
	new_product_image = new Image();
	new_product_image.src = new_src;
	new_product_image.onload = loadProductImage( product_image_id );
}

//  SWAP THE PRODUCT IMAGE (ON THE PRODUCT PAGE) FOR EACH NEW COLOR
function loadProductImage( product_image_id ) {

	var img = ( product_image_id ? $('#'+product_image_id) : $('#product_image') );
	var img_href = ( product_image_id ? $('#'+product_image_id+'-href') : $('#product_image_href') );

	img.attr( 'src', new_product_image.src );

	//  Load the zoomable image.
	var zoom_src = img.attr( 'src' ).toString().replace( /(.*-\d+-)(\d+[x]\d+)(\.jpg)/, ( "$1" + "1630x1830" + "$3" ) );
	img_href.attr( 'href', zoom_src );

	//  Restart the zooming for this image.
	$('.cloud-zoom').CloudZoom();
}

//  LOAD A SHIPPING ADDRESS
function loadShippingAddress( addr ) {

	//  Nothing? clear the form.
	if( !addr || !$(addr).val() ) {
		for( var i = 0; i < document.forms[ 'shipping_form' ].elements.length; i++ ) {
			if( document.forms[ 'shipping_form' ].elements[i].name != 'ship[type]' ) {
				$(document.forms[ 'shipping_form' ].elements[i]).val( '' );
			}
		}

		$('#ship_type').val( 'usa' );
		$('#is_store_shipment').attr( 'checked', true );

		$('#city_state_cnt').html( '' );
		changeShippingType( $('#ship_type'), false )
		return;
	}

	addr_vals = $(addr).val().toString().split( "^^^" );

	if( !addr_vals ) {
	}

	var intl = false;
	for( var i = 0; i <= addr_vals.length; i++ ) {
		if( addr_vals[i] && addr_vals[i].split( "*||*" )[0] == 'geo_country_idx' && addr_vals[i].split( "*||*" )[1] != 1 ) {
			intl = true;
		}
	}

	if( intl ) {
		$('#ship_type').val( 'intl' );
		changeShippingType( $('#ship_type'), false );
	} else {
		$('#ship_type').val( 'usa' );
		changeShippingType( $('#ship_type'), false );
	}

	shipping_city = '';

	//  Fill in the values.
	for( var i = 0; i <= addr_vals.length; i++ ) {

		if( !addr_vals[i] ) {
			continue;
		}

		val = addr_vals[i].split( "*||*" );
		val_field = val[0];
		val_value = val[1];

		if( val_field == 'city' ) {
			shipping_city = val_value;
		}

		//  Set the value.
		if( form_field = document.forms[ 'shipping_form' ].elements[ 'ship['+val_field+']' ] ) {
			$(form_field).val( val_value );
		}

		//  USA...
		if( form_field = document.forms[ 'shipping_form' ].elements[ 'ship[usa]['+val_field+']' ] ) {
			$(form_field).val( val_value );
		}

		//  INTL...
		if( form_field = document.forms[ 'shipping_form' ].elements[ 'ship[intl]['+val_field+']' ] ) {
			$(form_field).val( val_value );
		}
	}

	if( !intl ) {
		loadRecipCityState( shipping_city, true );
	}
}

//  CHECKOUT
var checkout_clicked = false;
function processOrder() {

	//  Checkout?
	if( !checkout_clicked ) {
		checkout_clicked = true;

		//  Swap the buttons.
		$('#checkout-now-button').hide();
		$('#order-processing').show();

		document.forms[ 'billing_form' ].submit();
	}

	return false;
}

//  SPECIAL INSTRUCTIONS COUNTER
function shippingSpecialInstructionsCounter( max, box ) {

	var cur_count = $(box).val().length;
	var remaining = max - cur_count;

	if( remaining <= 0 ) {
		remaining = 0;
	}

	$('#special_inst_count').html( remaining );

	if( remaining == 0 ) {
		$(box).val( $(box).val().toString().substr( 0, max ) )
	}
}

//  TOGGLE FAQ
function toggleFaq( idx ) {
	if( $('#answer_'+idx).css( 'display' ) == 'none' ) {
		$('#answer_'+idx).slideDown();
	} else {
		$('#answer_'+idx).slideUp();
	}
}

//  STORE SEARCH
function storeSearch( form ) {

	var go = false;

	//  Do the fields have anything?
	for( var i = 0; i <= form.elements.length; i++ ) {
		var fld = form.elements[i];
		if( $(fld).val() && $(fld).val() != '' ) {
			go = true;
		}
	}

	var error_msg = '';

	if( !( go && GBrowserIsCompatible() ) ) {
		showStoreSearchErrors( "Please provide search criteria." );
		return;
	}

	//  Only a state
	if( $(form.elements[ 'state' ]).val() != '' && $(form.elements[ 'address' ]).val() == "" && $(form.elements[ 'city' ]).val() == "" && $(form.elements[ 'zip' ]).val() == "" ) {
		document.location = "/stores/" + $(form.elements[ 'state' ]).val();
		return;
	}

	//  Check the address.
	if( $(form.elements[ 'address' ]).val() && !( $(form.elements[ 'city' ]).val() != "" && $(form.elements[ 'state' ]).val() != "" ) ) {
		showStoreSearchErrors( "Please also provide a City and State to perform your search." );
		return;
	}

	//  Check the zip code.
	if( $(form.elements[ 'zip' ]).val() != '' && !$(form.elements[ 'zip' ]).val().match( /\d{5}/ ) ) {
		showStoreSearchErrors( "Please provide a valid zip code." );
		return;
	}

	//  Build the map.
	geocoder = new GClientGeocoder();

	if( $(form.elements[ 'zip' ]).val() != '' ) {
		address = $(form.elements[ 'zip' ]).val();
	} else {
		address = $(form.elements[ 'address' ]).val() + ", " + $(form.elements[ 'city' ]).val() + ", " + $(form.elements[ 'state' ]).val();
	}

	//  Get the lat and long of the address and then load the map.
	geocoder.getLatLng( address, function(start_point) {

		//  Get the LAT and LONG.
		regex = /^\(([0-9-.]+), (.*)\)$/;
		start_lat = start_point.toString().replace( regex, "$1" );
		start_long = start_point.toString().replace( regex, "$2" );

		if( !( start_lat && start_long ) ) {
			showStoreSearchErrors( "The address you entered could not be found." );
			return;
		}

		document.location = "/stores/search/?lat=" + start_lat + "&long=" + start_long +
			"&address=" + encodeURIComponent( $(form.elements[ 'address' ]).val() ) +
			"&city=" + encodeURIComponent( $(form.elements[ 'city' ]).val() ) +
			"&state=" + encodeURIComponent( $(form.elements[ 'state' ]).val() ) +
			"&zip=" + encodeURIComponent( $(form.elements[ 'zip' ]).val() );
	});

	return false;
}

//  SHOW SEARCH ERRORS
function showStoreSearchErrors( err ) {
	$('#search_error').html( err );
	$('#search_error_cnt').css( 'display', 'block' );
}

//  LOAD THE CITY & STATE OPTIONS ON THE RECIP PAGE.
function loadRecipCityState( load_city, fluid_divs ) {

	el = document.getElementById( 'shipping_postal_code' );

	if( !( el.value.toString().length == 5 ) ) {
		return
	}

	$('#city_state_cnt').html( '<div class="zip_error">Searching...</div>' );

	url = "/order/city-state-from-zip/?zip=" + encodeURIComponent( $(el).val() ) + "&fluid_divs=" + ( fluid_divs ? '1' : '0' );

	$.get(url, function(data){

		if( data.none ) {
			$('#city_state_cnt').html( '<div class="zip_error">The zip code you entered is not valid.</div>' );
			return;
		}

		$('#city_state_cnt').html( data.html );

		var state_idx = $('select[name="ship[usa][geo_state_idx]"]').val();

		if( typeof( state_idx ) != 'undefined' ) {
			if( state_idx == 12 || state_idx == 2 ) {
				$('#shipping-method-cnt-2').hide();
				$('#shipping-method-cnt-3').hide();
			} else {
				$('#shipping-method-cnt-2').show();
				$('#shipping-method-cnt-3').show();
			}
		}

		// city?
		if( load_city != '' ) {
			loadPreSetCity( load_city );
			addressPOChecker();
		}
	},'json');
}

function loadPreSetCity( city ) {

	el = document.getElementById( 'shipping_city_select' );

	if( !( el && el.length > 0 ) ) {
		return;
	}

	for( var i = 0; i < el.length; i++ ) {
		if( el[i].value == city ) {
			el.selectedIndex = i;
		}
	}
}

//  LOAD THE GIFT CARD TERMS
function loadGiftCardTerms( ecards ) {

	//  Css
	$('#page_popup_box').css( 'width', '600px' );
	$('#page_popup_box').css( 'padding', '0px 0px' );
	$('#page_popup_box').css( 'margin-left', '-300px' );
	$('#page_popup_box').css( 'height', '400px' );
	$('#page_popup_box').css( 'margin-top', '-150px' );
	$('#page_popup_box').css( 'margin-top', '-150px' );

	var url = "/gift-card/terms-pop-up/" + ( ecards ? '#ecards' : '' );

	$.get(url, function(data){

		//  Load the iframe
		$('#page_popup_box').html( data );

		//  Show the popup
		showPagePopup();
		$('#page_popup_box_close').css( 'margin-right', '20px' );
	});
}

//	RESTART LINE ITEM TIMER
function restartTimer( $line_idx ){
	var url = "/order/line-update-timer/?idx=" + $line_idx;
	$.get(url, function(data){
		document.location.reload();
	});

	return false;
}


//	SHOW TIMER HELP
function timerHelp(){
	var url = "/order/timer-help";

	$.get(url, function(data){
		//  Load the iframe
		$('#timer-help-modal').html( data );
		//  Show the popup
		$('#timer-help-modal-link').click();
	});

}

function saveOrderExpiryEmail( email ) {

	var url = '/product/save-order-expiry-email/?email=' + encodeURIComponent( email );

	$.get( url, function(data) {

		//  Error?
		if( !data.success ) {
			if( data.error_msg ) { $('#expiry_notification_notice').html( data.error_msg ); }
			return false;
		}

		$('#add_to_cart_expiry_notify').slideUp(function() {
			if( data.email ) {
				$('#add_to_cart_expiry_email').html( data.email );
				$('#add_to_cart_expiry_notify_msg').slideDown();
			}
		});

	},'json');

	return false;

}

//  THIS FUNCTION CAN ONLY BE CALLED IN A $(document).ready(function() { });
function whatDevice() {
	var envs = ['phone', 'tablet', 'desktop'];

	$el = $('<div>');
	$el.appendTo($('body'));

	for (var i = envs.length - 1; i >= 0; i--) {
		var env = envs[i];

		$el.addClass('hidden-'+env);
		if ($el.is(':hidden')) {
			$el.remove();
			return env
		}
	}
}


function showAssociateTerms(){
	content = $('#associate_terms').html();
	$.fancybox({
		'transitionIn': 'fade',
		'transitionOut': 'fade',
		'width': 300,
		'padding': 0,
		'content': content
	});

}

