/**
 * calls named spaced function that returns the required object
 */
function getPRCart(){
	if(window.Prototype){
		// deleting prototype toJSON
		delete Array.prototype.toJSON;
	}

	// check if BPP is has been selected
	if (PRCart.hasBPP()) {
		return false;
	} else {
		return PRCart.getData();
	}
}

// PayRunner Cart namespace
var PRCart = new Object();

// ID to look for to see if this is on a cart page
PRCart.cartContainerID = 'cartProductsTable';
 
// original onclick event of Buy Now button
PRCart.buyNowOriginalOnclick = null;

// message to display to user when Buyer Protection Plan (BPP) 
// has been selected and then the SEC "Buy Now" button is clicked
PRCart.BPPMessage = 'ShopRunner\'s Express Checkout feature is not currently available for your order.  To complete your order please choose the "ADD TO CART" button and receive free 2 day shipping';

// ID to use for the pay runner cart (should be set before calling getPRCart())
if (PRCart.prCartID == 'undefined' || PRCart.prCartID == null){
	PRCart.prCartID = 'GSICart1234';
}
/*
 This variable should be set from the JSP using something similar to below:

	<script type="text/javascript">
		// make sure namespace is defined
		if (PRCart != 'undefined' || PRCart == null) {
			var PRCart = new Object();
		}
		// set the cartID
		PRCart.prCartID = '<c:out value="GSICart1234" />'; 
	</script>
*/

/**
 * Returns a JSON format pay runner cart object containing the 
 * information of the payrunner cart for either a product or cart page
 *
 * @return Stringified JSON format pay runner cart object
 */
PRCart.getData = function() {
	var data = null;
	if(PRCart.isCart()) {
		data = PRCart.getCartPageData(PRCart.cartContainerID);
	} else {
		data = PRCart.getProductPageData();
	}
	return data;
}

/**
 * Removes leading and trailing whitespace from the given string. When
 * given paramenter is null, and empty string is returned.
 *
 * @param str String to have beginning and trailing whitespace removed from
 */
PRCart.trim = function(str) {
	if (str != null) {
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	} else {
		return '';
	}
}

/**
 * Looks for an element associated only to the cart page and returns
 * true if found; false otherwise
 * 
 * @return true if it is determined that this is on a cart page; false otherwise
 */
PRCart.isCart = function() {
	var isCart = false;
	if (document.getElementById(PRCart.cartContainerID)) {
		isCart = true;
	}
	return isCart;
}

/**
 * Constructs a product object that will be added to the PR cart object
 * which in turn will be returned by this function
 *
 * @return cart object for product page
 */
PRCart.getProductPageData = function() {
	var productPageData = false;
	try {
		var name = PRCart.getProductName();
		var SKU = PRCart.getProductSKU();
		var qty = PRCart.getProductQty();

		if (name && SKU && qty){
			var product = [
				{
				"productName" : PRCart.trim(name),
				"productSKU" : PRCart.trim(SKU),
				"productQty" : PRCart.trim(qty)
				}
			];
			productPageData = PRCart.generateCartObject(product);
		}
	} catch (er) {
		alert('ERROR: getProductPageData - ' + er);
	}
	return productPageData;
}

/**
 * Constructs product objects that will be added to the PR cart object
 * which in turn will be returned by this function
 *
 * @param cartID id of element on cart page that contains necessary product info
 * @return cart object for cart page
 */
PRCart.getCartPageData = function(cartID) {
	var cartData = null;
	try {
		if (cartID == null || cartID == '') {
			throw 'ILLEGAL ARGUMENT EXCEPTION: parameter cartID can neither be null nor empty';
		}

		// array of products
		var products = new Array();

		// tempProduct to be added to array as created
		var tempProduct = null;

		var cartElem = document.getElementById(cartID);
		var prodInfoRows = new Array();
		var trIdArr = new Array();
		if (cartElem != null) {
			// collect all the product rows
			var tempTagCollection = cartElem.getElementsByTagName('tr');
			var i = 0;
			var j = 0;
			var counter = 0;
			// get the product rows
			for (i = 0; i < tempTagCollection.length; i++) {
				if(tempTagCollection[i].className != null && (tempTagCollection[i].className).indexOf('cartInfoRow') != -1){
					if(trIdArr.toString().indexOf(tempTagCollection[i].id) <= -1){
						prodInfoRows.push(tempTagCollection[i]);
						trIdArr.push(tempTagCollection[i].id);
					}
				}
			}
			// for each row
			for (i = 0; i < prodInfoRows.length; i++){
				counter = 0;
				// get a new product object ready to add to the array
				tempProduct = new Object();

				// get anchors cartProductTitle for product name
				tempTagCollection = prodInfoRows[i].getElementsByTagName('a');
				for (j = 0; j < tempTagCollection.length; j++) {
					if(tempTagCollection[j].className != null && (tempTagCollection[j].className).indexOf('cartProductTitle') != -1){
						tempProduct.productName = PRCart.trim(tempTagCollection[j].innerHTML);
						// encode URL unfriendly entities
						tempProduct.productName = encodeURIComponent(tempProduct.productName);
						break;
					}
				}

				// get SKU and respective Qty
				for (var SKU in payRunnerCartItems) {
					if (counter == i) {
						tempProduct.productSKU = SKU.substring(4);
						// set the quantity from the SKU
						tempProduct.productQty = payRunnerCartItems[SKU];
						break;
					} else {
						counter++;
					}
				}

				// add the tempProduct to the array
				products.push(tempProduct);

				// get the complete object of cart data
				cartData = PRCart.generateCartObject(products);
			}
		} else {
			throw 'EXCEPTION: ' + PRCart.cartContainerID + ' does not exist';
		}
	} catch (er) {
		alert('ERROR: getCartPageData - ' + er);
	}
	return cartData;
}

/**
 * Creates the over all structure of the cart object and adds the given
 * products to the products array
 *
 * @param products Array of product objects to be included in cart object
 * @return cart object
 */
PRCart.generateCartObject = function(products){
	// create cart object that has an array to store products
	var cartObject = {
		"cart" : {
			"cartId" : PRCart.prCartID, 
			"products" : [],
			"shippingGroups": [
				{
                "shippingGroup": 1,
                "shipping": [
                    {
                        "shippingDisplay": "",
                        "method": "",
                        "shipPrice": 0,
                        "selected": false
                    }
				]
				}
			]
		},
		"status" : 0
	}
	try {
		// add products to the product array
		var currentProduct = null;
		var tempProduct = null;
		for (var i = 0; i < products.length; i++) {
			currentProduct = products[i];
			tempProduct = {
				"sku" : currentProduct.productSKU,
				"skuName" : currentProduct.productName,
				"skuDescription" : "",
				"isSREligible" : false,
				"skuQty" : parseInt(currentProduct.productQty),
				"shipping":[
					{
						"shippingDisplay" : "",
						"method" : "",
						"shipPrice" : 0,
						"selected" : false
					}
				],
				"shippingGroup" : 1,
				"message" : "",
				"unitPrice" : 0,
				"smallImageUrl" : "",
				"largeImageUrl" : ""
			}
			// add the temporary product to the cart object's products array
			cartObject.cart.products.push(tempProduct);
		}
	} catch (er) {
		alert('ERROR: generateCartObject - ' + er);
	}
	return cartObject;
}

// ######################################################
//  The section below contains STORE specific DOM parsing code
// ######################################################

/**
 * Looks for and returns the name of the product displayed on the 
 * product page
 *
 * @return name of the product on the product page
 */
PRCart.getProductName = function(){
	var productName = null;
	try {
		var container = document.getElementById('priceReviewAge');
		if (container ){
			var h1s = container.getElementsByTagName('h1');
			if (h1s != null) {
				productName = h1s[0].innerHTML;
				// encode URL unfriendly entities
				productName = encodeURIComponent(productName);
			}
		} else {
			throw 'priceReviewAge was not found';
		}
	} catch (er) {
		alert('ERROR: getProductName - ' + er);
	}
	return productName;
}

/**
 * Looks for and returns the quantity of the product displayed on the 
 * product page
 *
 * @return quantity of the product on the product page
 */
PRCart.getProductQty = function(){
	var productQty = null;
	try {
		var container = document.getElementById('quantity');
		if (container) {
			productQty = container.value;
		} else {
			throw 'quantity does not exist';
		}
		// validate productQty
		if(!PRCart.validateQty(productQty)){
			// reset productQty to 1 before it is returned
			productQty = '1';
		}
	} catch (er) {
		alert('ERROR: getProductQty - ' + er);
	}
	return productQty;
}

/**
 * Looks for and returns the SKU of the product displayed on the 
 * product page
 *
 * @return SKU of the product on the product page
 */
PRCart.getProductSKU = function(){
	var productSKU = null;
	try {
		var container = document.getElementById('prod_1');
		if (container) {
			productSKU = container.value;
			productSKU = (productSKU.split('|'))[1];
		} else {
			throw 'prod_1 does not exist';
		}
		// validate productSKU
		if (!productSKU){
			productSKU = null;
			alert("Please select a Color / Size combination");
		}
	} catch (er) {
		alert('ERROR: getProductSKU - ' + er);
	}
	return productSKU;
}

// ######################################################
//  The section below contains validation code
// ######################################################
/**
 * Returns true if the give qty is an integer greater than 0;
 * returns false otherwise
 *
 * @return true if given quantity is valid; false otherwise
 */
PRCart.validateQty = function(qty){
	var isValid = false;
	try {
		if ((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)){
			if (parseInt(qty) > 0){
				isValid = true;
			}
		}
	} catch (er){}
	return isValid;
}

// ######################################################
//  The section below contains support for Buyer Protection
//  Plan (BPP) support and requires the Prototype JS library
// ######################################################

/**
 * Checks to see if a BPP has been selected.
 *
 * @return true if BPP was selected by user; false otherwise
 */
PRCart.hasBPP = function(){
	var hasBPP = false;
	// check if on product page
	if ($$('body.product').length){

		var BPPRadios = $$('#buyerProtectionPlan input[name="warranty_1"]');
		
		for(var i = 0; i < BPPRadios.length; i++) {
			if (BPPRadios[i].checked == true){
				if (BPPRadios[i].value) {
					hasBPP = true;
					break;
				}
			}
		}
	}
	// display message
	if(hasBPP){
		alert(PRCart.BPPMessage);
	}
	return hasBPP;
};