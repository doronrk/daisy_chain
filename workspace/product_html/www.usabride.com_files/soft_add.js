/* Soft Add to Cart 
 * Displays modal cart dialog with dynamically updated contents.
 * 
 * Updated with two pseudo-callbacks Sept 09 2011
 * The functions below are called if present at execution time:
 *
 * softAddOnHideCallback (when the cart is hidden by the close button or continue shopping link).
 * softAddOnFirstShowCallback (when the cart is first drawn). 
 */

var jsonCart = null;
var cartDiv = null;
var cartDiv2 = null;
var ProductPage = false;
var PhoneOrder = false;

function addToCart(form, button) {
	var softAdd = true;
	if (global_URL_Encode_Current_ProductCode.toUpperCase() == "GFT") {
		softAdd = false;
	}
	if (!softAdd) {
		return true;
	}

	ProductPage = true;
	var qstr;
	var bttnName = button.name;
	button.disabled = true;
	if (form.elements['ReturnTo']) {
		form.elements['ReturnTo'].value = "";
	}
	qstr = serialize(form, bttnName + '.x', '5', bttnName + '.y', '5');
	var Qty = 0;
	if (form['QTY.' + unescape(global_URL_Encode_Current_ProductCode)]) {
		Qty = form['QTY.' + unescape(global_URL_Encode_Current_ProductCode)].value;
	}
	SoftAddSingleItem(global_URL_Encode_Current_ProductCode, Qty, qstr);
	button.disabled = false;
	return false;

}

function removeFromCart(index) {

	var url = '/ShoppingCart.asp?ax=1&remove=' + index;

	if (!global_Config_ForceSecureShoppingCartPage) {

		jQuery.ajax({
			url: url,
			cache: false,
			dataType: 'text',
			success: function(data, textStatus, XMLHttpRequest) {
				if (displayCartPopup) {
					displayCartPopup.Dispose();
				}
				displayCartPopup = new DisplayCartPopup();
				displayCartPopup.ShowOK = true;
				displayCartPopup.DeleteItemComplete = true;
				displayCartPopup.retrieveCart();
			},
			error: function() {
				return false;
			}
		});

		return;
	}

	// if global_Config_ForceSecureShoppingCartPage - call with jsonp

	url = '/ShoppingCart.asp?ax=1&remove=' + index;
	url = 'https://' + location.host + url;

	jQuery.ajax({
		url: url,
		cache: false,
		dataType: 'jsonp',
		jsonp: 'jsonp_callback',
		success: function(data, textStatus, XMLHttpRequest) {
			//jsonp_callback is called
			return;
		},
		error: function() {
			return false;
		}
	});

}

function jsonp_callback() {
	if (displayCartPopup) {
		displayCartPopup.Dispose();
	}
	displayCartPopup = new DisplayCartPopup();
	displayCartPopup.ShowOK = true;
	displayCartPopup.DeleteItemComplete = true;
	displayCartPopup.retrieveCart();
}

function retrieveCart(url) {

	if (displayCartPopup) {
		displayCartPopup.Dispose();
	}
	displayCartPopup = new DisplayCartPopup();
	if (url) { displayCartPopup.RetrieveCartURL = url; }
	displayCartPopup.ShowOK = true;
	displayCartPopup.retrieveCart();
}

function getLineItemHTML(product, lastAddedIndex, isAnchored) {
	var productHTML, imageSource, productName, quantity, productPrice, hasOptions, productIndex, isProduct;

	product.IsProduct == undefined ? isProduct = 'N' : isProduct = product.IsProduct;
	if (global_Config_EnableDisplayOptionProducts == 'False' && isProduct == "N") { return ''; }

	product.ImageSource == undefined ? imageSource = '' : imageSource = '<img src="' + product.ImageSource + '" />'; //height="50px" width="50px"
	product.ProductIndex == undefined ? productIndex = '' : productIndex = product.ProductIndex;
	product.ProductName == undefined ? productName = '' : productName = product.ProductName;
	product.ProductPrice == undefined ? productPrice = '' : productPrice = product.ProductPrice;
	product.HasOptions == undefined ? hasOptions = 'N' : hasOptions = product.HasOptions;
	product.Quantity == undefined ? quantity = '' : quantity = product.Quantity;
    if (!isAnchored) {
        productHTML = '<tr class="product-row';
        if (product.ProductIndex == lastAddedIndex) {
            productHTML += ' recently-added';
        }
        productHTML += '"><td class="icon"><a href="/ProductDetails.asp?ProductCode=' + product.ProductCode + '">' + imageSource + '</a></td>';
        productHTML += '<td class="description"><span class="product_name"><a href="/ProductDetails.asp?ProductCode=' + product.ProductCode + '">' + productName + '</a></span>';
        productHTML += '<span class="product_id">';
        if (hasOptions == "Y") {
            productHTML += '<a href="javascript:void(0);" onclick="javascript:OpenNewWindow(\'/Help_CartItemDetails.asp?CartID=' + product.ProductIndex + '\',\'425\',\'300\');">Options</a>';
        }
        productHTML += '</span></td>';
        productHTML += '<td class="quantity"><span class="quantity_text">Quantity</span> ' + quantity + '</td>';
        productHTML += '<td class="price"><span id="product_price">' + productPrice + '</span></td>';
        productHTML += '<td class="remove">';
        if (isProduct == "Y") {
            productHTML += '<a href="" class="aremove" onclick="removeFromCart(' + productIndex + '); return false;">remove</a>';
        }
        productHTML += '</td></tr>';
    } else {
        productHTML = '<li class="product-row';
        if (product.ProductIndex == lastAddedIndex) {
            productHTML += ' recently-added';
        }
        productHTML += '"><div class="product-image icon"><a href="/ProductDetails.asp?ProductCode=' + product.ProductCode + '">' + imageSource + '</a></div>';
        productHTML += '<div class="product-detail">';
        productHTML += '<div class="product-name description"><a href="/ProductDetails.asp?ProductCode=' + product.ProductCode + '">' + productName + '</a></div>';
        if (hasOptions == "Y") {
            productHTML += '<div class="product-options"><a href="javascript:void(0);" onclick="javascript:OpenNewWindow(\'/Help_CartItemDetails.asp?CartID=' + product.ProductIndex + '\',\'425\',\'300\');">Options</a></div>';
        }
        productHTML += '<div class="product-qty quantity"><span class="quantity_text">Quantity</span> ' + quantity + '</div>';
        productHTML += '</div>';
        productHTML += '<div class="product-price price">' + productPrice + '</div>';
        productHTML += '<div class="product-remove remove">';
        if (isProduct == "Y") {
            productHTML += '<a href="" class="aremove" onclick="removeFromCart(' + productIndex + '); return false;">remove</a>';
        }
        productHTML += '</div>';
        productHTML += '</li>';
    }
    return productHTML;
}

function cartLoop(length, isAnchored) {
    var loopHtml = '';
    if (length > 0) {
        var lastAddedProductIndex = parseInt(jsonCart.Totals[0].LastProduct);
        if (lastAddedProductIndex != -1)
            loopHtml += getLineItemHTML(jsonCart.Products[lastAddedProductIndex], lastAddedProductIndex + 1, isAnchored);
        for (var i = length - 1; i >= 0; i--) {
            if (jsonCart.Products[i].Display == "Y" && i != lastAddedProductIndex) {
                loopHtml += getLineItemHTML(jsonCart.Products[i], lastAddedProductIndex + 1, isAnchored);
            }
        }
    }
    return loopHtml;
}

function hideCart() {
	if (displayCartPopup) {
		displayCartPopup.Dispose();
	}
    if (cartDiv != null) {
        jQuery('.soft_add_wrapper').animate({ 'height': 0 }, 300, function () {
            cartDiv.innerHTML = '';
        });
	}
    
    if (typeof(softAddOnHideCallback) === "function") {
        softAddOnHideCallback();
    }
}

function AddCartLink(indexInArray, valueOfElement) {
	if (/shoppingcart\.asp$/i.test(valueOfElement)) {
		jQuery(this).mouseenter(function() {
			DisplayCartPopupBegin(this);
        });
        if (volusion.cart.hasAnchor()) {
            jQuery(this).mouseenter(function () { jQuery(this).data('hover', 1); }).mouseleave(function () { jQuery(this).data('hover', 0); });
        }
	}
}

function SoftAddSingleItem(ProductCode, Qty, Post) {

	var ProductCodes = [];
	ProductCodes[0] = { ProductCode: ProductCode, Qty: Qty };

	if (displayCartPopup) {
		displayCartPopup.Dispose();
	}
	displayCartPopup = new DisplayCartPopup();
	displayCartPopup.AsyncAddCodes = ProductCodes;
    
    DisplayCartPopup.RecentlyAddedProductCode = ProductCode;
	if (Post) {
		displayCartPopup.AsyncAddSingleItem(ProductCode, Post);
	} else {
		displayCartPopup.AsyncAddBegin();
	}

	return false;
}


function SoftAddCheckboxes(el, form) {

	var ProductCodes = [];

	var l = (form['ProductCode'].length) ? form['ProductCode'].length : 1;

	for (var i = 0; i < l; i++) {
		var checkbox = (l > 1) ? form['ProductCode'][i] : form['ProductCode'];
		if (checkbox.checked) {
			var input = form['QTY.' + checkbox.value];
			if (input.value > 0) {
				var ProductCode = { ProductCode: checkbox.value, Qty: input.value };
				ProductCodes[ProductCodes.length] = ProductCode;
			}
		}
    }

	if (displayCartPopup) {
		displayCartPopup.Dispose();
	}
	displayCartPopup = new DisplayCartPopup();
	displayCartPopup.AsyncAddCodes = ProductCodes;
	displayCartPopup.AsyncAddBegin();

	return false;
}

var CART_MIN_LEFT = 0;
var CART_MIN_TOP = 0;
var CART_PADDING_LEFT = 0;
var CART_PADDING_TOP = 0;
var CART_PADDING_RIGHT = 5;
var CART_PADDING_BOTTOM = 0;
function DisplayCartPopup(trigger) { if (trigger) this.TriggerElement = trigger; }
DisplayCartPopup.prototype.Disposed = false;
DisplayCartPopup.prototype.DeleteItemComplete = false;
DisplayCartPopup.prototype.ShowOK = false;
DisplayCartPopup.prototype.ShowInterval = 50;
DisplayCartPopup.prototype.OKCounter = 0;
DisplayCartPopup.prototype.OKInterval = 50;
DisplayCartPopup.prototype.data = null;
DisplayCartPopup.prototype.cartErrorRedirect = false;
DisplayCartPopup.prototype.Cancel = false;
DisplayCartPopup.prototype.RecentlyAddedProductCode = null;
DisplayCartPopup.prototype.TriggerElement = null;
DisplayCartPopup.prototype.CancelEvent = function() {
    this.Cancel = true;
};
DisplayCartPopup.prototype.DragStop = function(event, ui) {
    this.SetXYCookie();
};
DisplayCartPopup.prototype.SetXYCookie = function() {
    var CartX = -1;
    var CartY = -1;
    var scrollleft = jQuery(window).scrollLeft();
    var scrolltop = jQuery(window).scrollTop();
    var o = jQuery('.soft_add_wrapper').offset();

    if (o) {
        CartX = o.left - scrollleft;
        CartY = o.top - scrolltop;

        if (window.localStorage) {
            localStorage['CartX'] = CartX;
            localStorage['CartY'] = CartY;
        } else {
            var cookie = '';
            var dt = new Date();
            dt.setFullYear(dt.getFullYear() + 1);
            cookie = 'CartX=' + CartX.toString() + '; expires=' + dt.toUTCString();
            document.cookie = cookie;
            cookie = 'CartY=' + CartY.toString() + '; expires=' + dt.toUTCString();
            document.cookie = cookie;
        }
    }
};
DisplayCartPopup.prototype.MouseOverCount = 0;
DisplayCartPopup.prototype.MouseOver = function() {
    this.MouseOverCount++;
};
DisplayCartPopup.prototype.HideInterval = 10000;
DisplayCartPopup.prototype.HideIntervalAnchored = 3000;
DisplayCartPopup.prototype.HideCart = function(isAnchored) {
    var instance = this;
    var num = this.MouseOverCount - 0;
    window.setTimeout(function() {
        if (instance.Disposed) {
            return;
        }
        if (num == instance.MouseOverCount) {
            hideCart();
        }
    }, isAnchored ? this.HideIntervalAnchored : this.HideInterval);
};

DisplayCartPopup.prototype.ShowCountdown = function() {
    if (this.OKCounter >= 5) {
        this.ShowOK = true;
        return;
    }
    this.OKCounter++;
    var instance = this;
    window.setTimeout(function() { instance.ShowCountdown(); }, this.OKInterval);
};

DisplayCartPopup.prototype.Show = function() {
    if (this.Cancel) {
        return;
    }
    if (this.ShowOK) {
        var CartX = -1;
        var CartY = -1;

        if (window.localStorage) {
            CartX = localStorage['CartX'];
            CartY = localStorage['CartY'];
            if (CartX == null) {
                CartX = -1;
            }
            if (CartY == null) {
                CartY = -1;
            }
        } else {
            var cookies = document.cookie.split(';');
            for (var i = 0, l = cookies.length; i < l; i++) {
                var c = cookies[i];
                var kv = c.split('=');
                switch (kv[0].replace(/^\s+|\s+$/g, '')) {
                case 'CartX':
                    CartX = kv[1] - 0;
                    break;
                case 'CartY':
                    CartY = kv[1] - 0;
                    break;
                }
            }
        }

        this.DrawCart(CartX, CartY);
        return;
    }
    var instance = this;
    window.setTimeout(function() { instance.Show(); }, this.ShowInterval);
};

DisplayCartPopup.prototype.DrawCart = function (CartX, CartY) {
    if (window.hideEditBoundingBox) {
        window.hideEditBoundingBox();
    }
    var instance = this;
    jsonCart = this.data;

    var index = parseInt(jsonCart.Totals[0].LastProduct);
    var quantity;
    var cartTotal;
    var discountTotal;
    var cartLength = 0;
    if (jsonCart != null) {
        cartLength = jsonCart.Products.length;
    }

    quantity = jsonCart.Totals[0].Quantity;
    cartTotal = jsonCart.Totals[0].CartTotal;
    discountTotal = jsonCart.Totals[0].DiscountTotal;

    var i = 0;
    var cartHTML = '';
    cartHTML += '<div class="soft_add_wrapper">';
    cartHTML += '<div class="soft_add_header_shadow">';
    cartHTML += '<div class="soft_add_header"><span class="soft_add_span">' + PageText_842 + '</span><a href="" class="close_btn" onclick="hideCart(); return false;">Close</a></div></div>'
    cartHTML += '<div class="soft_add_content_shadow"><div class="soft_add_content_wrapper">';
    cartHTML += '<div class="soft_add_content_area">';
    if (!volusion.cart.hasAnchor()) {
        cartHTML += '<table class="cart_table" cellpadding="0" cellspacing="0" border="0">';
        cartHTML += cartLoop(cartLength, false);
        if (cartLength > 0 && discountTotal != "0") {
            var discountProduct = {
                ProductName: "Discount(s)",
                ProductPrice: '<span style="color:red">' + discountTotal + '</span>'
            };
            cartHTML += getLineItemHTML(discountProduct, 0);
        }
        cartHTML += '</table>';
    } else {
        cartHTML += '<ul class="anchored-cart">';
        cartHTML += cartLoop(cartLength, true);
        cartHTML += '</ul>';
    }

    cartHTML += '</div><div class="soft_add_sub_total"><div class="number_of_items">' + quantity + ' ' + PageText_844 + '</div>';
    cartHTML += '<div class="sub_total">';
    cartHTML += PageText_843 + ': <span class="sub_total_amount">' + cartTotal + '</span>';
    cartHTML += '</div>';
    cartHTML += '</div><div class="soft_add_action_area">';
    cartHTML += '<a href="/ShoppingCart.asp" class="check_out"';
    if (typeof (isSocialStore) === "function") {
        cartHTML += ' target="_blank" ';
    } else if (top !== self) {
        cartHTML += ' target="_parent" ';
    }
    cartHTML += '>View Cart</a>';
    cartHTML += '<a href="" class="continue_shopping" onclick="hideCart(); return false;">Continue shopping</a>';
    cartHTML += '</div></div></div></div>';

    if (!cartDiv2) {
        cartDiv2 = document.createElement('div');
        jQuery(cartDiv2).css('visibility', 'hidden').attr('class', 'cartDiv2');
        if (volusion.cart.hasAnchor()) {
            jQuery(volusion.cart.anchor()[0]).append(cartDiv2);
        } else {
            jQuery('body').append(cartDiv2);
        }
    } else {
        cartDiv2.innerHTML = '';
    }
    cartDiv2.innerHTML = cartHTML;
    jQuery('.cartDiv2 .product_name a').each(function (index, element) {
        if (element.textContent) {
            element.innerHTML = element.textContent;
        } else if (element.innerText) {
            element.innerHTML = element.innerText;
        }
        element.innerHTML = element.innerHTML.replace(/<[^>]*>/g, '');
    });

    var $softAddWrapper = jQuery('.soft_add_wrapper');
    if (volusion.cart.hasAnchor()) {
        var $anchor = volusion.cart.anchor();
        $softAddWrapper.addClass('anchored');
        CartX = $anchor.width() - $softAddWrapper.width();
        CartY = $anchor.height();
        $softAddWrapper.css({ left: CartX.toString() + 'px', top: CartY.toString() + 'px' });
    } else {
        if (CartX >= 0 && CartY >= 0) {
            var MaxX = (jQuery(window).width()) - $softAddWrapper.width();
            MaxX += CART_MIN_LEFT;
            MaxX -= CART_PADDING_RIGHT;
            if (CartX > MaxX) {
                CartX = MaxX;
            }

            var MaxY = (jQuery(window).height()) - $softAddWrapper.height();
            if (CartY > MaxY) {
                CartY = MaxY;
            }

            var MinX = CART_MIN_LEFT + CART_PADDING_LEFT;
            var MinY = CART_MIN_TOP + CART_PADDING_TOP;

            if (CartX < CART_MIN_LEFT) {
                CartX = CART_MIN_LEFT;
            } //left
            if (CartY < CART_MIN_TOP) {
                CartY = CART_MIN_TOP;
            } //left
            $softAddWrapper.css({ left: Math.round(CartX).toString() + 'px', top: Math.round(CartY).toString() + 'px' });
        } else {
            $softAddWrapper.css({ left: 50 + '%', top: 140 + 'px' });
            CartX = $softAddWrapper.offset().left;
            CartX -= ($softAddWrapper.width() / 2);
            $softAddWrapper.css({ left: CartX + 'px' });
        }
    }

    if (typeof (softAddOnFirstShowCallback) === "function") {
        softAddOnFirstShowCallback();
    }

    if (typeof (addFacebookLikeDiscountToCart) === "function" && discountTotal == "0" && quantity != "0") {
        addFacebookLikeDiscountToCart();
        DisplayCartPopupBegin('');
        return false;
    }

    window.setTimeout(function () { instance.ResizeImages(); }, 200);
    volusion.cart.itemCount(quantity);
};

DisplayCartPopup.prototype.ResizeImages = function() {

    var instance = this;

    jQuery.fn.imageMaxSide = imageMaxSide;

    jQuery('.cartDiv2 .soft_add_wrapper .cart_table .icon img').imageMaxSide({ 'maxside': 50 });

    if (!cartDiv) {
        cartDiv = document.createElement('div');
        jQuery(cartDiv).attr('class', 'cartDiv');
        if (volusion.cart.hasAnchor()) {
            jQuery(volusion.cart.anchor()[0]).append(cartDiv);
            jQuery('.cartDiv').click(function(e) {
                e.stopPropagation();
            });
            jQuery('body').click(function() {
                hideCart();
            });
        } else {
            jQuery('body').append(cartDiv);
        }
    } else {
        cartDiv.innerHTML = '';
    }

    var cartHeight = jQuery('.soft_add_wrapper').height();
    jQuery('.soft_add_wrapper').css({ 'height': 0 });
    cartDiv.innerHTML = cartDiv2.innerHTML;
    cartDiv2.innerHTML = '';
    jQuery('.soft_add_wrapper').animate({ 'height': cartHeight }, 300);

    jQuery('.cartDiv .soft_add_wrapper .cart_table .icon img').imageMaxSide({ 'maxside': 50 });

    jQuery('a.close_btn').addClass('close_btn'); //reflow

    if (!volusion.cart.hasAnchor()) {
        jQuery('.soft_add_wrapper').draggable({ containment: 'document', cancel: '.soft_add_content_area', stop: function(event, ui) { instance.DragStop(event, ui); } }).css('cursor', 'move').mouseleave(function() { instance.HideCart(); }).mouseover(function() { instance.MouseOver(); });
        jQuery('.soft_add_content_area').css('cursor', 'default');
        jQuery('.soft_add_wrapper').mouseleave(function() { instance.SetXYCookie(); });
        this.HideCart();
    } else {
        jQuery('.soft_add_wrapper').mouseleave(function() { instance.HideCart(true); }).mouseenter(function() { instance.MouseOver(); });
        if (this.TriggerElement) {
            this.TriggerElement.mouseleave(function() { instance.HideCart(true); }).mouseenter(function() { instance.MouseOver(); });
            if (!this.TriggerElement.data('hover'))
                this.HideCart(true);
        } else {
            this.HideCart(true);
        }
    }
    this.SetXYCookie();
};

DisplayCartPopup.prototype.RetrieveCartURL = '/AjaxCart.asp';
DisplayCartPopup.prototype.retrieveCart = function(ProductIndex) {
    var instance = this;
    this.ShowCountdown();

    var url = this.RetrieveCartURL;

    if (ProductIndex) {
        url += '?Index=' + ProductIndex;
    }

    jQuery.ajax({
        url: url,
        cache: false,
        dataType: 'json',
        success: function(data, textStatus, XMLHttpRequest) {
            var json = data;
            if (json && json['Totals'] && json['Totals'][0] && json['Totals'][0]['Quantity']) {
                CurrentQuantity = json['Totals'][0]['Quantity'] - 0;
                if (CurrentQuantity == 0 && instance.DeleteItemComplete == false) {
                    return false;
                }
                instance.data = data;
                instance.Show();
            }
        },
        error: function() {
            return false;
        }
    });
};

DisplayCartPopup.prototype.InProgressModalActive = false;
DisplayCartPopup.prototype.AsyncCartCreated = false;
DisplayCartPopup.prototype.AsyncAddItemsRemaining = 0;
DisplayCartPopup.prototype.AsyncBatchItemsAdded = 0;
DisplayCartPopup.prototype.AsyncLastItemAdded = 0;
DisplayCartPopup.prototype.AsyncAddBatchSize = 10;
DisplayCartPopup.prototype.AsyncAddTimeLimit = 10000; //3000
DisplayCartPopup.prototype.AsyncAddTimeLimitExpired = false;
DisplayCartPopup.prototype.AsyncAddTimeLimitExpire = function() {
    this.AsyncAddTimeLimitExpired = true;
};
DisplayCartPopup.prototype.AsyncAddCodes = null;

DisplayCartPopup.prototype.AsyncAddBegin = function() {
    var instance = this;
    if (this.AsyncAddCodes && this.AsyncAddCodes.length) {
        if (this.AsyncAddCodes.length > (3 * this.AsyncAddBatchSize)) {
            InProgressModalStart();
            this.InProgressModalActive = true;
        }

        for (var i = 0, l = this.AsyncAddCodes.length; i < l; i++) {
            var AsyncAddCode = this.AsyncAddCodes[i];
            AsyncAddCode['complete'] = false;
            AsyncAddCode['success'] = false;
        }
        this.AsyncAddItemsRemaining = this.AsyncAddCodes.length;

        jQuery.ajax({
            url: this.RetrieveCartURL,
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, XMLHttpRequest) {
                instance.AsyncAddContinue(data);
            },
            error: function() {
                return false;
            }
        });

        window.setTimeout(function() { instance.AsyncAddTimeLimitExpire(); }, this.AsyncAddTimeLimit);
    }
};
DisplayCartPopup.prototype.AsyncAddContinue = function(InitialCartData) {
    var json = InitialCartData;
    var InitialQuantities = {};
    var InitialCartTotal = json['Totals'][0]['Quantity'] - 0;

    for (var i = 0, l = json['Products'].length; i < l; i++) {
        var product = json['Products'][i];
        InitialQuantities[product.ProductCode] = product.Quantity;
    }

    for (var i = 0, l = this.AsyncAddCodes.length; i < l; i++) {
        var AsyncAddCode = this.AsyncAddCodes[i];
        AsyncAddCode['InitialQuantity'] = 0;
        if (InitialQuantities[AsyncAddCode.ProductCode]) {
            AsyncAddCode['InitialQuantity'] = InitialQuantities[AsyncAddCode.ProductCode];
        }
    }

    var AsyncAddCode = this.AsyncAddCodes[0];
    this.AsyncAdd(AsyncAddCode.ProductCode, AsyncAddCode.Qty, 0, 0);
};

DisplayCartPopup.prototype.AsyncAddQueueRemaining = function(itemsToAdd) {
    var loopStart = this.AsyncLastItemAdded + 1;
    var loopEnd = loopStart + (itemsToAdd != undefined ? itemsToAdd : this.AsyncAddBatchSize);

    for (var i = loopStart, l = this.AsyncAddCodes.length; i < l && i < loopEnd; i++) {
        var AsyncAddCode = this.AsyncAddCodes[i];
        this.AsyncLastItemAdded = i;
        this.AsyncAdd(AsyncAddCode.ProductCode, AsyncAddCode.Qty, i);
    }
};

DisplayCartPopup.prototype.AsyncAdd = function(ProductCode, Qty, i, l) {
    var instance = this;
    var ProductIndexNodePattern = /<ProductIndex>\d+<\/ProductIndex>/;
    var ProductIndexPattern = /\d+/;
    jQuery.ajax({
        url: '/ProductDetails.asp?ProductCode=' + ProductCode + '&btnaddtocart=btnaddtocart&AjaxError=Y&batchadd=Y',
        type: 'POST',
        cache: false,
        data: 'ProductCode=' + ProductCode + '&QTY.' + ProductCode + '=' + Qty.toString(),
        processData: false,
        dataType: 'text',
        success: function(data, textStatus, XMLHttpRequest) {

            if (data.indexOf('<input type="hidden" name="CalledBy" value="Register.asp">') != -1) {
                instance.cartErrorRedirect = true;
            }

            var productIndex = 0;
            var m = ProductIndexNodePattern.exec(data);
            if (m) {
                productIndex = ProductIndexPattern.exec(m);
            }
            instance.AsyncAddCodes[i]['ProductIndex'] = productIndex;
            instance.AsyncAddCodes[i]['complete'] = true;
            instance.AsyncAddCodes[i]['errortext'] = ErrorData(data);

            if (!instance.AsyncCartCreated) {
                instance.AsyncCartCreated = (instance.AsyncAddCodes[i]['errortext'] == "");
                if (!instance.AsyncCartCreated) {
                    instance.AsyncBatchItemsAdded = 0;
                    instance.AsyncAddQueueRemaining(1);
                } else {
                    instance.AsyncBatchItemsAdded = 0;
                    instance.AsyncAddQueueRemaining();
                }
            } else {
                instance.AsyncBatchItemsAdded++;

                if ((instance.AsyncBatchItemsAdded == instance.AsyncAddBatchSize) || (instance.AsyncAddItemsRemaining < instance.AsyncAddBatchSize)) {
                    instance.AsyncBatchItemsAdded = 0;
                    instance.AsyncAddQueueRemaining();
                }
            }

            instance.AsyncAddItemsRemaining--;

            if (instance.AsyncAddItemsRemaining == 0)
                instance.AsyncAddComplete(instance.AsyncAddCodes[instance.AsyncLastItemAdded]);
        },
        error: function() {
            return false;
        }
    });
};

DisplayCartPopup.prototype.AsyncAddSingleItem = function(ProductCode, Post) {
    var instance = this;
    var ProductIndexNodePattern = /<ProductIndex>\d+<\/ProductIndex>/;
    var ProductIndexPattern = /\d+/;
    jQuery.ajax({
        url: '/ProductDetails.asp?ProductCode=' + ProductCode + '&AjaxError=Y',
        type: 'POST',
        cache: false,
        data: Post,
        processData: false,
        dataType: 'text',
        success: function(data, textStatus, XMLHttpRequest) {
            if (data.indexOf('<input type="hidden" name="CalledBy" value="Register.asp">') != -1) {
                instance.cartErrorRedirect = true;
            }

            var ProductIndex = 0;
            var m = ProductIndexNodePattern.exec(data);
            if (m) {
                ProductIndex = ProductIndexPattern.exec(m);
            }
            instance.AsyncAddCodes[0]['ProductIndex'] = ProductIndex;
            instance.AsyncAddCodes[0]['complete'] = true;
            instance.AsyncAddCodes[0]['errortext'] = ErrorData(data);
            instance.AsyncAddComplete(instance.AsyncAddCodes[0], true);
        },
        error: function() {
            return false;
        }
    });
};

DisplayCartPopup.prototype.AsyncAddComplete = function(AsyncAddCodeCurrent, NoRedirect) {
    var instance = this;

    var complete = true;
    var productIndex = 0;
    for (var i = 0, l = this.AsyncAddCodes.length; i < l; i++) {
        var AsyncAddCode = this.AsyncAddCodes[i];
        complete = complete && AsyncAddCode.complete;
        productIndex = Math.max(AsyncAddCode['ProductIndex'], productIndex);
    }

    //if (this.AsyncAddTimeLimitExpired) { location.href = '/ShoppingCart.asp'; }

    if (complete) {

        var ajaxCallUrl = this.RetrieveCartURL;

        if (productIndex) {
            ajaxCallUrl += '?Index=' + productIndex;
        }

        jQuery.ajax({
            url: ajaxCallUrl,
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, XMLHttpRequest) {
                instance.AsyncAddCompleteValidate(data, productIndex, NoRedirect);

                if (PhoneOrder) {
                    location.href = "/CloseWindow.asp";
                }
            },
            error: function() {
                return false;
            }
        });
    }
};

DisplayCartPopup.prototype.AsyncAddCompleteValidate = function (validateCartData, productIndex, noRedirect) {
    if (this.InProgressModalActive) {
        InProgressModalEnd();
        this.InProgressModalActive = false;
    }

    var json = validateCartData;
    if (productIndex == 0 && this.AsyncAddCodes[0].errortext == '') {
        productIndex = json.Products.filter(function (p) {
            return p.Display == 'Y';
        }).pop().ProductIndex;
    }

    var ValidateQuantities = {};

    for (var i = 0, l = json['Products'].length; i < l; i++) {
        var product = json['Products'][i];
        ValidateQuantities[product.ProductCode] = product.Quantity;
    }

    for (var i = 0, l = this.AsyncAddCodes.length; i < l; i++) {
        var AsyncAddCode = this.AsyncAddCodes[i];
        AsyncAddCode['ValidateQuantity'] = 0;
        if (ValidateQuantities[AsyncAddCode.ProductCode]) {
            AsyncAddCode['ValidateQuantity'] = ValidateQuantities[AsyncAddCode.ProductCode];
        }
    }

    for (var i = 0, l = this.AsyncAddCodes.length; i < l; i++) {
        var AsyncAddCode = this.AsyncAddCodes[i];
        var currentQty = 0;
        currentQty += AsyncAddCode['InitialQuantity'] - 0;
        currentQty += AsyncAddCode['Qty'] - 0;
        AsyncAddCode['success'] = (AsyncAddCode['ValidateQuantity'] == currentQty);
        AsyncAddCode['partial'] = (AsyncAddCode['success'] == false) && (AsyncAddCode['InitialQuantity'] < AsyncAddCode['ValidateQuantity']);
    }

    var success = true;
    for (var i = 0, l = this.AsyncAddCodes.length; i < l; i++) {
        var AsyncAddCode = this.AsyncAddCodes[i];
        success = success && AsyncAddCode.success;
    }

    //success - show cart
    if (success) {
        switch (Config_EnableSoftAddToCart) {
            case true:
                this.ShowOK = true;
                this.retrieveCart(productIndex);
                return;
            default:
                location.href = '/ShoppingCart.asp';
                return;
        }
    }

    var fail = 0;
    var added = 0;
    var codes = null;

    codes = [];
    for (var i = 0, l = this.AsyncAddCodes.length; i < l; i++) {
        var AsyncAddCode = this.AsyncAddCodes[i];
        if (!AsyncAddCode.success) {
            codes[fail] = { ProductCode: AsyncAddCode.ProductCode, error: AsyncAddCode.errortext };
            fail++;
        }
        if (AsyncAddCode.success || AsyncAddCode.partial) {
            added++;
        }
    }

    //one item did not add
    if ((fail == 1 && !noRedirect) || this.cartErrorRedirect) {
        if (window.sessionStorage) {
            var messages = new CartMessages();
            messages.Add(new CartMessage(codes[0]['error']));

            //sessionStorage['cartError'] = codes[0]['error'];
            sessionStorage['cartError'] = messages.FormatMessages(added);

            if (added) {
                sessionStorage['cartPopup'] = 1;
                sessionStorage['cartPopupProductIndex'] = productIndex;
            }
        }
        location.href = '/ProductDetails.asp?ProductCode=' + codes[0]['ProductCode'];
        return;
    }

    //multiple items did not add
    var s = '';
    var messages = new CartMessages();
    for (var i = 0; i < fail; i++) {
        if (codes[i]['error']) {
            messages.Add(new CartMessage(codes[i]['error'], codes[i]['ProductCode']));
        }
    }
    s = messages.FormatMessages(added);

    jQuery('#listOfErrorsSpan').html(s);
    jQuery(document).scrollTop(0);

    if (Config_EnableSoftAddToCart) {
        if (added || noRedirect) {
            if (displayCartPopup) {
                displayCartPopup.Dispose();
            }
            displayCartPopup = new DisplayCartPopup();
            displayCartPopup.ShowOK = true;
            displayCartPopup.retrieveCart(productIndex);
        }
    }
};

DisplayCartPopup.prototype.Dispose = function() {
    this.Disposed = true;
};

function DisplayCartPopupBegin(el) {
    if (jQuery('.soft_add_wrapper').length == 0) {
        jQuery(el).unbind('mouseleave');

        if (displayCartPopup) {
            displayCartPopup.Dispose();
        }

        displayCartPopup = new DisplayCartPopup(jQuery(el));

        jQuery(el).mouseleave(function () {
            displayCartPopup.CancelEvent();
        });

        displayCartPopup.retrieveCart();
    }
}

function ErrorData(data) {
	var p = /<span id="listOfErrorsSpan">[\s\S]*<\/carterror>[\s]*<\/span>/i;
	var m = p.exec(data);
	if (m) {
	    return m.toString().replace(/ id="listOfErrorsSpan"/i, '').replace(/<carterror>/, '').replace(/<\/carterror>/, '');
	};
	return '';
}

function CartMessage(error, ProductCode) {
    var messageBuilder = "";

    this.ProductCode = ProductCode;

    //this.message = jQuery(error).find('li').text();
    jQuery(error).find('li').each(function() {
        messageBuilder += "<li>" + this.innerHTML + "</li>";
    });
    this.message = messageBuilder;
}
CartMessage.prototype.ProductCode = '';
CartMessage.prototype.message = '';

function CartMessages() { }
CartMessages.prototype.Messages = null;
CartMessages.prototype.Add = function(CartMessage) {
    if (!this.Messages) {
        this.Messages = [];
    }
    var i = this.Messages.length;
    this.Messages[i] = CartMessage;
};
CartMessages.prototype.FormatMessages = function(bOtherItemsAdded) {
    if (!this.Messages) {
        return '';
    }
    if (!this.Messages.length) {
        return '';
    }
    var s = '';
    s += '<div class="v65-error-list-wrapper"><div class="v65-error-list-container"><div class="v65-error-list-text"><div class="v65-error-list-image"></div><ul>';
    for (var i = 0, len = this.Messages.length; i < len; i++) {
        //if (i == 0) { s += '<br />'; }
        var m = this.Messages[i];
        if (m.ProductCode && len > 1) {
            var href = '';
            var url = '/ProductDetails.asp?ProductCode=' + m.ProductCode;
            href = '<a class="errorlinks" href="' + url + '">' + unescape(m.ProductCode) + '</a>';
            s += '<li style="cursor:pointer;" onclick="location.href=\'' + url + '\'">' + href + '<br />' + m.message + '</li>';
            if (i != len - 1)   // don't add if last item in list
                s += '<br />';
        } else {
            if (m.message) {
                s += m.message;
                if (i != len - 1)   // don't add if last item in list
                    s += '<br />';
            }
        }
    }

    if (bOtherItemsAdded) {
        if (jQuery('<div>' + s + '</div>').text()) {
            s += '<span style="cursor:pointer;" onclick="location.href=\'/ShoppingCart.asp\';">' + global_PageText_OtherItemsAdded + '</span><br /><br />';
        }
    }

    s += '</ul></div><div class="v65-error-list-clear"></div></div></div>';

    return s;
};

var displayCartPopup = null;

jQuery(document).ready(function () {

    if (window.sessionStorage) {

        if (Config_EnableSoftAddToCart) {
            if (sessionStorage['cartPopup'] == 1) {
                sessionStorage['cartPopup'] = 0;

                if (displayCartPopup) {
                    displayCartPopup.Dispose();
                }
                var ProductIndex = sessionStorage['cartPopupProductIndex'];
                sessionStorage['cartPopupProductIndex'] = 0;
                displayCartPopup = new DisplayCartPopup();
                displayCartPopup.retrieveCart(ProductIndex);
            }
        }

        if (sessionStorage['cartError']) {
            jQuery('#listOfErrorsSpan').css('display', 'none');
            jQuery('#listOfErrorsSpan').html(sessionStorage['cartError']);
            var el = jQuery('#listOfErrorsSpan').get()[0];
            if (el) {
                if (el.innerText || el.textContent) {
                    jQuery('#listOfErrorsSpan').css('display', 'block');
                }
            }
            sessionStorage['cartError'] = '';
        }

    }
});

function imageMaxSide(options) {

    this.each(function (index, element) {

        var img = jQuery(element);

        var settings = {
            'maxside': 50
        };
        if (options) {
            jQuery.extend(settings, options);
        }

        if (settings['iteration']) {
            settings['iteration']++;
        } else {
            settings['iteration'] = 1;
        }

        if (settings['iteration'] == 1) {
            img.load(function () {
                img.imageMaxSide(settings);
            });
        }

        var MAX_SIDE = settings['maxside'];

        var w = img.width();
        var h = img.height();
        var new_width = 0, new_height = 0;

        if (w > MAX_SIDE || h > MAX_SIDE) {
            if (w >= h) {
                new_width = MAX_SIDE;
                new_height = h / (w / MAX_SIDE);
            } else {
                new_height = MAX_SIDE;
                new_width = w / (h / MAX_SIDE);
            }
        }

        if (new_height > 0 && new_width > 0) {
            img.height(new_height);
        }
    });

	return this;
}

jQuery.fn.imageMaxSide = imageMaxSide;

function InProgressModalStart() {
    jQuery("#divWaitModal").dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        stack: true,
        position: 'center',
        width: '50px',
        //        height: 50,
        closeOnEscape: false,
        disabled: true,
        open: function () {
            jQuery('.ui-dialog').css('height', '50px').css('padding', '0px');
            jQuery('#divWaitModal').css('width', '50px');
        }
    });

    jQuery('.ui-dialog-titlebar').hide();
    jQuery('.ui-dialog-titlebar-close').hide();

    jQuery('#divWaitModal').dialog('open');
}

function InProgressModalEnd() {
    jQuery('#divWaitModal').dialog('close');
}
