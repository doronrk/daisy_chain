jQuery(document).ready(function($){
	
	// http://phpjs.org/functions/number_format/
	function numberFormat(number, decimals) {
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
		var n = !isFinite(+number) ? 0 : +number,
			prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep = ',',
			dec = '.',
			s = '',
			toFixedFix = function (n, prec) {
				var k = Math.pow(10, prec);
				return '' + Math.round(n * k) / k;
			};
		// Fix for IE parseFloat(0.55).toFixed(0) = 0;
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}
		return s.join(dec);
	}
	
	$('.ink-colors-link').colorbox({inline:true});
	$('.type-styles-link').colorbox({inline:true});
	$('.paper-types-link').colorbox({inline:true});
	//$('.help-link, .chat-link').colorbox({inline:true});
	$('.color-swatches-link').colorbox({inline:true});
	$('.liner-swatches-link').colorbox({inline:true});
	$('.motif-swatches-link').colorbox({inline:true});
	
	
	//$('#customizer-draft input:checkbox, #customizer-draft input:radio').click(function(){
	$('#customizer-draft input:radio').click(function(){
		if(this.checked){
			if($(this).is("input:radio")){
				$(this).parent().parent().parent().children().children().removeClass('selected');
			}
			$(this).parent().addClass('selected');
		} else {
			$(this).parent().removeClass('selected');
		}
	});
	
	
	
	/***************************************/
	/* media views in product detail page */
	/*************************************/
	
	if($('#gallery-views').length){
		
		$('#gallery-views li').click(function(){
		
			$('#gallery-views li.selected').removeClass('selected');
			
			$(this).addClass('selected');
			
			
		});
		
	}

/* =========================================================================
   Mini Shopping Bag
   ========================================================================= */

$(".product-view form#product_addtocart_form").submit(function() {
	var $form = $(this),
	$itemsCount = $(".header-top li.mini-shopping-bag > a .items-count"),
	$dropdown = $(".header-top li.mini-shopping-bag .dropdown"),
	$dropdownProduct = $dropdown.find(".product"),
	action = $form.attr("action"),
	itemsCountNo = parseInt($itemsCount.text(), 10),
	productName = $form.find("input[name='ajax_product_name']").val(),
	productThumb =  $form.find("input[name='ajax_product_thumb']").val(),
	productUrl =  $form.find("input[name='ajax_product_url']").val(),
	price = Number($form.find("input[name='ajax_product_price']").val()),
	qty =  parseInt($form.find("input[name='qty']").val(), 10),
	subtotalOrig = $dropdown.find(".subtotal .price").text(),
	subtotalNew;

	if(isNaN(qty) || qty == 0) {
		qty = 1;
	}
	
	// Convert original subtotal to number
	subtotalOrig = Number(subtotalOrig.replace(/[^0-9\.]+/g,""));

	// Calculate subtotal of newest product
	subtotalNew = Number(price * qty);

	// Format price
	price = "$" + numberFormat(price, 2);

	// Calculate and format new subtotal
	subtotalNew = "$" + numberFormat(subtotalOrig + subtotalNew, 2);

	var posting = $.post(action, $form.serialize());
	
	$(".btn-cart").attr('disabled', 'disabled');
	
	// Populate mini shopping bag with updated info
	$itemsCount.text(itemsCountNo + 1);
	$dropdownProduct.find(".product-image img").attr({ src: productThumb, alt: productName	});
	$dropdownProduct.find("h4 a").text(productName);
	$dropdownProduct.find("a").attr({ href: productUrl });
	$dropdownProduct.find("p.price").text(price);
	$dropdownProduct.find("p.qty").text("Qty " + qty);
	$dropdown.find(".subtotal .price").text(subtotalNew);
	
	// Scroll to top
	$("html, body").animate({ scrollTop: 0 }, 600);
	
	// Hide existing message if it exists
	$("#messages_product_view").slideUp(200);
	
	// Show mini shopping bag
	$dropdown.fadeIn(200).delay(3000).queue(function() {
		$(this).stop(true, true).fadeOut(200);
	});

	// After AJAX call
	posting.done(function(data) {
		$(".btn-cart").removeAttr('disabled');
		var $message = $(data).find("#messages_product_view").children(),
		$dropdownAJAX = $(data).find(".header-top li.mini-shopping-bag .dropdown").children();
		$itemsCountAJAX = $(data).find(".header-top li.mini-shopping-bag > a .items-count"),
		itemsCountNoAJAX = parseInt($itemsCountAJAX.text(), 10);
		
		// Update mini shopping bag with returned info (in case the estimated one was inaccurate)
		$itemsCount.text(itemsCountNoAJAX);
		$dropdown.empty().append($dropdownAJAX);
		
		// Show returned message if it wasn't a success message
		if(!$message.find(".success-msg").length) {
			$("#messages_product_view").hide().empty().append($message).slideDown(200);
		}
	});

	return false;
});

$(".header-top li.mini-shopping-bag").mouseenter(function() {
	// If there's items in the shopping bag, toggle the drop-down
	if($(this).find(".items-count").html() !== "0") {
		$(this).children(".dropdown").stop(true, true).fadeIn(100);
	}
}).mouseleave(function() {
	// Wait 300ms before fading out
	$(this).children(".dropdown").delay(250).queue(function() {
		$(this).stop(true, true).fadeOut(100);
	});
});

/* =========================================================================
   Drop-Down Menus
   ========================================================================= */

$(".header .nav > ul").children("li").hover(function() {
	$(this).siblings().children(".sub-menu").hide();
	$(this).children(".sub-menu").stop(true, true).fadeIn(100);
}, function() {
	$(this).children(".sub-menu").stop(true, true).delay(250).fadeOut(100);
});

/* =========================================================================
   Shopping Cart Tabs
   ========================================================================= */

// If more than one tab
if($(".checkout-cart-index .cart-tabs li.item").length > 1) {
	// Toggle when clicked
	$(".checkout-cart-index .cart-tabs li.item").click(function() {
		var index = $(this).index();
		$(this).parents(".cart-tabs").find(".cart-tabs-content").eq(index).addClass("active").siblings().removeClass("active");
		$(this).addClass("active").siblings().removeClass("active");
		return false;
	});
}


/* =========================================================================
   Add Body Classes (Done w/ JS because the PHP gets cached)
   ========================================================================= */

// Add class for webkit (used for the customizer font drop-down styling because the select box styling on Webkit/Mac is way different to every other browser)
// Beware when upgrading jQuery - $.browser was removed in 1.9
if($.browser.webkit) {
	$("html").addClass("webkit");
}

/* =========================================================================
   Fix for Clicking on the Shopping Cart Link too Many Times
   ========================================================================= */

$(".header-top ul.user-links li.mini-shopping-bag > a, .header-top .dropdown .cta p.view-bag a").click(function() {
	window.location = $(this).attr("href");
	$(this).removeAttr("href");
	$(this).unbind("click");
	return false;
});

});
