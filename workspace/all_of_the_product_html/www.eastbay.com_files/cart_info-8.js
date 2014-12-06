var globalCartDetails = {
	
	iecheck: !$.support.cssFloat,
	
	init: function() {
		var $headerNewMsgAchor = $('a.msg_banner'),
		//$anibannerContent = $('.anibannerContent'),
		$promoMsgContent = $('.cart_message .promoMsgContent'),
		//detailHeight = $promoMsgContent.prop('scrollHeight'),
		detailHeight = 400;
		promoContentHeight = 400; //sets height for IE
		
		$headerNewMsgAchor.on('click',function(){
			$promoMsgContent = $(this).parent().children('.promoMsgContent');
			if(!$promoMsgContent.hasClass('seeDetails')){
				$promoMsgContent.addClass('promoMsgAffects');
				$promoMsgContent.show();
				if(globalCartDetails.iecheck){
					// do ie thing
					$promoMsgContent.show().css({height:'auto'});
					//$promoMsgContent.stop().animate({height:detailHeight+'px'}, 200);
				} else {
					$promoMsgContent.height('auto');
				}
				$promoMsgContent.addClass('seeDetails');
			} else {
				if(globalCartDetails.iecheck){
					// do ie thing
					$promoMsgContent.stop().animate({height:'1px'}, 100, function(){
						$promoMsgContent.hide();
					});
				} else {
					$promoMsgContent.height(0);
				}
				//$headerNewMsg.addClass('removed');
				setTimeout(function(){
					$promoMsgContent.removeClass('promoMsgAffects').removeClass('seeDetails');
				}, 105);
				
			}
			return false;
		});
		
		$('.cart_msg .promoCloseBtn a').click(function(){
			$promoMsgContent = $(this).parents('.promoMsgContent');
			if($(this).parents('.promoMsgContent').hasClass('seeDetails')){
				if(globalCartDetails.iecheck){
					// do ie thing
					$promoMsgContent.stop().animate({height:'1px'}, 100, function(){
						$promoMsgContent.hide();
					});
				} else {
					$promoMsgContent.height(0);
				}
				$promoMsgContent.hide();
				$promoMsgContent.removeClass('promoMsgAffects').removeClass('seeDetails');
			}
		});
		
	}
}
var ticker = false;
if(typeof cartMessaging === 'undefined') {
	var cartMessaging = {
		'normal' : [{'value':75,'source_code':'IPEB3845','message':'<div class="cart_msg seeDetails">'
	+    '<a href="#cartMsg" title="View Free Shipping Details" class="msg_banner">'
	+        'You\'re only <span class="msgHighlight subtotal_value">$[VALUE]</span> away from <span class="msgHighlight">FREE SHIPPING</span><br /><div>Use Code: <span class="headerPromoCode">IPEB3845</span></div>'
	+    '</a>'
	+    '<div id="cartMsg" class="promoMsgContent">'
	+    	'<span class="promoArrow">&nbsp;</span>'
	+    	'<div class="promoCloseBtn"><a title="Close" href="javascript:void(0);">x</a></div>'
	+        '<div class="topBlackBar">&nbsp;</div>'
	+        '<p class="promoText_main">Free Shipping</p>'
	+        '<p class="promoText_sub">on your $75 order*</p>'
	+        '<p>APO/FPO addresses now eligible on all free shipping offers!</p>'
	+        '<p>'
	+            '*Use promotion code <span class="headerPromoCode">IPEB3845</span> at checkout. Promotion/source code box is located in step 4 of checkout. Order value must total $75 or more before services, taxes, shipping and handling. Valid online at eastbay.com. Offer is limited to standard ground delivery within the 48 contiguous United States and APO/FPO addresses. Excludes bulk orders and drop ships. Entire order must be shipped to a single address. Does not apply to prior purchases or open orders and cannot be combined with any other offer. Customer is responsible for shipping costs on returned merchandise. May not be used toward purchase of GiftCards or team orders. Promotion may be modified or terminated at any time. Certain restrictions and exclusions may apply. Offer expires 09/01/2013 (11:59 pm CT).'
	+          '<br><br>'
	+            'Be the First to Know! Get up-to-the-minute info on the latest product launches, special offers and sales events by signing up for Eastbay emails or by requesting our free catalog.'
	+        '</p>'
	+    '</div>'
	+'</div>'}],
		'mobile' : [{'value':75,'message':'<div class="cart_msg seeDetails">'
	+    '<a dialog="cartMsg" href="#" title="View Free Shipping Details" class="msg_banner">'
	+        'You\'re only <span class="msgHighlight">$[VALUE]</span> away from <span class="msgHighlight">FREE SHIPPING</span><br />Use Code: <span class="headerPromoCode">MBEB3845</span>'
	+    '</a>'
	+    '<div id="cartMsg" class="promoMsgContent dialog">'
	+    	'<div id="close"><a title="Close" href="#" class="button">Close</a></div>'
	+    '<div class="offer_title">'
	+        '<span class="offer_text">'
	+            '<span class="large_text">FREE SHIPPING</span> <span class="small_text">on your $75 order*</span>'
	+        '</span>'
	+        '<span class="code_text">'
	+            '<span class="small_text">use code <span class="large_text">MBEB3845</span> in checkout</span>'
	+        '</span>'
	+    '</div>'
	+    '<p align="center">'
	+    	'<a href="javascript:void();" class="action_btn button" onClick="saveCode(\'MBEB3845\'); return false;">Copy Code to Cart</a>'
	+    '</p>'
	+    '<p>'
	+       '*Use promotional code MBEB3845 at checkout. Promotion/source code box is located on the Payment Information tab at checkout. Order value must total $75 or more before services, taxes, shipping and handling. Valid online at m.eastbay.com, www.eastbay.com. Offer is limited to standard delivery within the 48 contiguous US and APO/FPO addresses. Excludes bulk orders and drop ships. Entire order must be shipped to a single address. Does not apply to prior purchases or open orders and cannot be combined with any other offer. Customer is responsible for shipping costs on returned merchandise. May not be used toward purchase of GiftCards or team orders. Promotion may be modified or terminated at any time. Certain restrictions and exclusions may apply. Offer expires 09/01/2013 (11:59 pm CT).'
	+    '</p></div>'}],
		'ending' : '<div class="cart_msg seeDetails">'
	+    '<a href="#cartMsg" title="View Free Shipping Details" class="msg_banner">'
	+        'You just scored <span class="msgHighlight">FREE SHIPPING!</span><br />Use Code: <span class="headerPromoCode">IPEB3845</span>'
	+    '</a>'
	+    '<div id="cartMsg" class="promoMsgContent">'
	+    	'<span class="promoArrow">&nbsp;</span>'
	+    	'<div class="promoCloseBtn"><a title="Close" href="javascript:void(0);">x</a></div>'
	+        '<div class="topBlackBar">&nbsp;</div>'
	+        '<p class="promoText_main">Free Shipping</p>'
	+        '<p class="promoText_sub">on your $75 order*</p>'
	+        '<p>APO/FPO addresses now eligible on all free shipping offers!</p>'
	+        '<p>'
	+            '*Use promotion code <span class="headerPromoCode">IPEB3845</span> at checkout. Promotion/source code box is located in step 4 of checkout. Order value must total $75 or more before services, taxes, shipping and handling. Valid online at eastbay.com. Offer is limited to standard ground delivery within the 48 contiguous United States and APO/FPO addresses. Excludes bulk orders and drop ships. Entire order must be shipped to a single address. Does not apply to prior purchases or open orders and cannot be combined with any other offer. Customer is responsible for shipping costs on returned merchandise. May not be used toward purchase of GiftCards or team orders. Promotion may be modified or terminated at any time. Certain restrictions and exclusions may apply. Offer expires 09/01/2013 (11:59 pm CT).'
	+          '<br><br>'
	+            'Be the First to Know! Get up-to-the-minute info on the latest product launches, special offers and sales events by signing up for Eastbay emails or by requesting our free catalog.'
	+        '</p>'
	+    '</div>'
	+'</div>',
		'mobileending' : '<div class="cart_msg seeDetails">'
	+    '<a dialog="cartMsg" href="#" title="View Free Shipping Details" class="msg_banner">'
	+        'You just scored <span class="msgHighlight">FREE SHIPPING!</span><br />Use Code: <span class="headerPromoCode">MBEB3845</span>'
	+    '</a>'
	+    '<div id="cartMsg" class="promoMsgContent dialog">'
	+    	'<div id="close"><a title="Close" href="#" class="button">Close</a></div>'
	+    '<div class="offer_title">'
	+        '<span class="offer_text">'
	+            '<span class="large_text">FREE SHIPPING</span> <span class="small_text">on your $75 order*</span>'
	+        '</span>'
	+        '<span class="code_text">'
	+            '<span class="small_text">use code <span class="large_text">MBEB3845</span> in checkout</span>'
	+        '</span>'
	+    '</div>'
	+    '<p align="center">'
	+    	'<a href="javascript:void();" class="action_btn button" onClick="saveCode(\'MBEB3845\'); return false;">Copy Code to Cart</a>'
	+    '</p>'
	+    '<p>'
	+       '*Use promotional code MBEB3845 at checkout. Promotion/source code box is located on the Payment Information tab at checkout. Order value must total $75 or more before services, taxes, shipping and handling. Valid online at m.eastbay.com, www.eastbay.com. Offer is limited to standard delivery within the 48 contiguous US and APO/FPO addresses. Excludes bulk orders and drop ships. Entire order must be shipped to a single address. Does not apply to prior purchases or open orders and cannot be combined with any other offer. Customer is responsible for shipping costs on returned merchandise. May not be used toward purchase of GiftCards or team orders. Promotion may be modified or terminated at any time. Certain restrictions and exclusions may apply. Offer expires 09/01/2013 (11:59 pm CT).'
	+    '</p></div>'
	}
}
function updateInlineCart() {
	if(ticker) {
		/* Initialize Settings */
		//$('.cart_info').cartInfo({tiers:[{'value':75,'message':'You are $[VALUE] away from Free Shipping'},{'value':300,'message':'You are now exactly $[VALUE] away from Free Shoes'}]});
		
		/* Display Cart Tiered Messaging */
		$.cartInfoSetup({'tiers':cartMessaging.normal,'endingTier':cartMessaging.ending,'promoBoxes':['#estimator_sourcecode','#CPCOrSourceCode']});
		$('.cart_message').cartInfo('getTierMessaging');
		$('.mini_cart_msg').cartInfo('getTierMessaging');
		$('.shopping_cart_msg').cartInfo('getTierMessaging');	
		globalCartDetails.init();
		//$('header .cart_message').cartInfo('getTierMessaging',{'tiers':cartMessaging.mobile,'endingTier':cartMessaging.mobileending});
		$('#body_wrapper .shopping_cart_msg').cartInfo('getTierMessaging',{'tiers':cartMessaging.mobile,'endingTier':cartMessaging.mobileending});
		$('#miniCartContainer .mini_cart_msg').cartInfo('getTierMessaging',{'tiers':cartMessaging.mobile,'endingTier':cartMessaging.mobileending});
		$('.cart_message').css({'display':'inline-block'});
		$('.mini_cart_msg').css({'display':'inline-block'});
		$('.shopping_cart_msg').css({'display':'inline-block'});
		
		try {
			$("a[dialog]").dialog();
		} catch(err) {
			
		}
	}
	if(readCookie('INLINECARTSUMMARY') != undefined) {
		var cart = readCookie('INLINECARTSUMMARY').split('%2C');
		if(cart != null && cart[0] != '0') {
			try {	
				$('li.cart > a').html("Cart("+cart[0]+")");
			} catch(err) {
				
			}
			try {
				$('#header_nav').css("margin-top", "20px");
				$('ul.nomargin').parent().css("margin-top", "0"); 
				if($('#custName').html() != '') {
					$('a.loggedIn').css("top", "30px");
				}
				$('#cart_info').css("display", "inline-block");
				$('#cart_info').empty();
				$('#cart_info').append("<span class=\"cart_label\">Items:</span> <span class=\"cart_value\">" + cart[0] + "</span> - ");
				$('#cart_info').append("<span class=\"cart_label\">Subtotal:</span> <span class=\"cart_value\">$" + parseFloat(unescape(cart[1])).toFixed(2) +"</span>");
			} catch(err) {
				
			}
		} else {
			$('li.cart > a').html("Cart");
			$('#header_nav').css("margin-top", "0");
			$('#cart_info').empty();
		}
	}
}
function initTicker(cartInfo) {
	if(cartInfo) {
		cartMessaging = cartInfo;	
	}
	ticker = true;
	updateInlineCart();
	$("#order_summary_content").on('OrderSummaryUpdate', function(e, d) {updateInlineCart()});
}
