// hack to fix 2 broken pagenames
if (typeof(btPageData) === 'object') {
    if (document.location.href.indexOf('/clothing/men/shoes-boots/cat/280006') > -1 && btPageData.page && btPageData.page.name != 'Mens : Shoes & Boots') {
		btPageData.page.name = 'Mens : Shoes & Boots';
		btPageData.page.categoryName = ' Mens > Shoes & Boots';
		btPageData.page.type = 'Category';
	}
	if (document.location.href.indexOf('/clothing/lookbooks/sec/cat1670004') > -1 && btPageData.page && btPageData.page.name != 'Lookbooks : Landing') {
		btPageData.page.name = 'Lookbooks : Landing';
		btPageData.page.categoryName = 'Lookbooks';
		btPageData.page.type = 'Landing';
	}
}


if (typeof(btPageData) === 'object') {
	btPageData.getParam = function (name, targetURL) {
		if (!targetURL) {
			targetURL = window.location.href;
		} else if (targetURL.indexOf('?') == -1) {
			targetURL = '?' + targetURL;
		}
		targetURL = typeof(decodeURIComponent) !== 'undefined' ? decodeURIComponent(targetURL) : unescape(targetURL);
		var regexS = "[\\?&]+"+name+"=([^&#]*)";
		var regex = new RegExp(regexS, "i");
		var results = regex.exec(targetURL);
		if (results == null) {
			return "";
		} else {
			return results[1].replace(/\+/g, " ").replace(/^[ \t]+|[ \t]+$/, "");
		}
	}
	
    btPageData.deduplicateProducts = function(products) {
        products = products || btPageData.items;
        var prods = [];
        for (var i=0; i<products.length; i++) {
    		var prod = products[i], prodExists = false;
			for (var j=0; j<prods.length; j++) {
				if (prod.id == prods[j].id) {
					prodExists = true;
					prods[j].quantity += prod.quantity;
					break;
				}
			}
			
			if (!prodExists) {
				var newProd = {};
				for (var j in prod) {
					newProd[j] = prod[j];
				}
				prods.push(newProd);
			}
		}
		return prods;
	}
    
	btPageData.setProductString = function(products) {
		if (typeof(btPageData) !== 'undefined' && products) {
			// deduplicate
			var productString = '', subtotal = 0, discountTotal, shippingTotal, giftCardTotal, rewardsTotal, crossSellId = bt_parameter('crossSellId');
			
			if (btPageData.order) {
				discountTotal = btPageData.order.discount || 0;
				shippingTotal = btPageData.order.shipping || 0;
				giftCardTotal = (btPageData.order.giftCard || 0) + (btPageData.order.eGiftCard || 0);
				rewardsTotal = btPageData.order.rewards || 0;
				subtotal = btPageData.order.merchandise || 0;
			}
			
			for (var i=0; i<products.length; i++) {
                if (products[i].isGiftBox === true || products[i].id == 'prod70001') {
                    continue;
                }
                
				var qty = products[i].quantity || 1, price = (qty * (products[i].discountPrice || products[i].price)), pctTotal, discount, shipping, giftCard, rewards;
                pctTotal = subtotal > 0 ? (price / subtotal) : 0;
				discount = discountTotal ? (pctTotal * discountTotal) : 0;
				shipping = shippingTotal ? (pctTotal * shippingTotal) : 0;
				giftCard = giftCardTotal ? (pctTotal * giftCardTotal) : 0;
				rewards = rewardsTotal ? (pctTotal * rewardsTotal) : 0;
				
				var thisProduct = [
					'',
					products[i].id,
					btPageData.order ? qty.toString() : '',
					btPageData.order ? price.toFixed(2) : '',
					'',
					''
				];
				
				if (btPageData.order) {
					// add order events here
					if (discount) {
						thisProduct[4] += (thisProduct[4] ? '|' : '') + 'event10=' + discount.toFixed(2);
					}
					if (shipping) {
						thisProduct[4] += (thisProduct[4] ? '|' : '') + 'event58=' + shipping.toFixed(2);
					}
					if (giftCard) {
						thisProduct[4] += (thisProduct[4] ? '|' : '') + 'event54=' + giftCard.toFixed(2);
					}
					if (rewards) {
						thisProduct[4] += (thisProduct[4] ? '|' : '') + 'event55=' + rewards.toFixed(2);
					}
				} else {
					// add merchandising eVars here
					if (products[i].sku) {
						thisProduct[5] += (thisProduct[5] ? '|' : '') + 'evar8=' + products[i].sku;
					}
					if (products[i].ensemble && btPageData.page.name.indexOf('Ensemble') > -1) {
						thisProduct[5] += (thisProduct[5] ? '|' : '') + 'evar11=' + products[i].ensemble;
					}
					if (products[i].totalReviews) {
						thisProduct[5] += (thisProduct[5] ? '|' : '') + 'evar17=' + products[i].totalReviews;
					}
					if (products[i].averageRating) {
						thisProduct[5] += (thisProduct[5] ? '|' : '') + 'evar18=' + products[i].averageRating;
					}
					if (crossSellId) {
						thisProduct[5] += (thisProduct[5] ? '|' : '') + 'evar27=' + crossSellId;
					}
				}
				
				productString += (productString ? ',' : '') + thisProduct.join(';').replace(/;+$/gi, '');
			}
            
            if (btPageData.order && btPageData.order.giftBoxes) {
    			productString += (productString ? ',' : '') + ';;;;event61=' + btPageData.order.giftBoxes.toString();
			}
            
			return productString;
		}
		
		return '';
	}
	
	btPageData.setProductRefinements = function(arr) {
		if (!arr) {
			return '';
		}
		var refs = '';
		for (var i=0; i<arr.length; i++) {
			refs += (refs ? '|' : '') + arr[i].name + '=' + arr[i].value;
		}
		
		return refs;
	}
}