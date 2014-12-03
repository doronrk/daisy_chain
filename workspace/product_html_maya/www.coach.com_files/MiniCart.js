
var orderItemUpdateCmd = "OrderItemUpdate";
var orderCalculateCmd = "OrderCalculate";
var syncPDPCart = false;
var thisTimer = null;
var timeoutTime = 500; //.5 second
var mCartWidth = 412;//mini-cart width
var insidePopup = false;
var storeId = "10551";
var catalogId = "10051";
var currencySymbol = "$ ";
var shopBagHoverTimer = 0;
var miniCartTimer = 2000;

function runEffect() { // run effect while opening minicart
	thisTimer = setTimeout(function() {
					if(!insidePopup) {
						$("#add-to-bag-overlay").dialog("close");
					}
					//clearTimeout(thisTimer);
				}, timeoutTime);
}

$(function() {
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	var wWidth = window.innerWidth - 16 || document.documentElement.clientWidth || document.body.clientWidth;//chrome bug fix
	if (isiPad) {
		wWidth = wWidth + 16;//iPad Fix
	}
	var xPos = wWidth - (mCartWidth + 172);//mini-cart + search field
	var yPos = 23;//header gap
    $(window).resize(function () {
		xPos = $(window).width() - (mCartWidth + 172);
		$("#add-to-bag-overlay").dialog('option', 'position', [xPos,yPos]);
    });

	$("#gwt_page_header").mousemove(function(e) {
		var mInEle = $(e.target);
		//console.log("e.target : mousemove - if : "+ mInEle);
		if (mInEle.parents().andSelf().is('#bag-content') || mInEle.parents().andSelf().is('#shopBagContainerId')) {
			insidePopup = true;
		}
	}).mouseleave(function(e) {
		var mInEle = $(e.target);
		//console.log("e.target : mouseleave :"+ mInEle);
		if (!mInEle.parents().andSelf().is('#bag-content') || !mInEle.parents().andSelf().is('#shopBagContainerId')) {
			insidePopup = false;
			$("#add-to-bag-overlay").dialog("close");
		}
	});

	if(jQuery.isFunction(jQuery.fn.dialog)) {
		$("#add-to-bag-overlay").dialog({
			appendTo: "#gwt_page_header",
			autoOpen: false,
			modal: false,
			zindex: 10001,
			width: mCartWidth,
			position: [xPos,yPos],
			dialogClass: 'no-close',
			open: function() {
				$('#shopBagContainerId').addClass('shopBagContainerHover');
				$('div.shoppingBagImage').addClass('shoppingBagImagePopup');
				$('#uNavMyAccountContainer').addClass('uNavDevider');
			},
			close: function() {
				$('#shopBagContainerId').removeClass('shopBagContainerHover');
				$('div.shoppingBagImage').removeClass('shoppingBagImagePopup');
				$('#uNavMyAccountContainer').removeClass('uNavDevider');
			}
		});
    }
});

function iPadTapHandler() {
	if ($("#add-to-bag-overlay").dialog("isOpen")) {
		redirectToCheckout();
	}
	else {
		createMiniCart(true, false);
	}
}

function hideMiniCart() {
	$("#add-to-bag-overlay").dialog("close");
}

function addMiniCartPreloader(eAddItem) {
	$('html, body').animate({ scrollTop: 0 }, 0);//$(window).scrollTop(0);

	if (eAddItem)
		$(document.activeElement).blur();

	$("#miniCartHeaderTxt").empty(); 
	$('#miniCartHeaderTxt').text('Items in your bag');
	$('#miniCartContent').empty();
	$('#miniCartContent').removeClass('miniCartContents');
	$('#bag-product').removeClass('bag-products');
	$('#bag-content').removeClass('bag-contents');
	$('#miniCartContent').append('<div align="center"><img alt="Loading..." src="/wcsstore/Coach_US/images/spinner.gif" /></div>');

	if (eAddItem) {
		$( "#add-to-bag-overlay" ).dialog({ show: {effect:"slideDown",duration:500}},{ hide: {effect:"slideUp",duration:500}} );
	} else {
		$( "#add-to-bag-overlay" ).dialog({ show: {effect:"slideDown",duration:0}},{ hide: {effect:"slideUp",duration:0}} );
	}
	$("#add-to-bag-overlay").dialog('open');

	if (eAddItem)
		clearTimeout(thisTimer);
}

function createMiniCart(syncPDPCart, eAddItem) {
	if (!eAddItem) {
		setTimeout(function() {
				if (insidePopup) {
					showMiniCart(syncPDPCart, eAddItem);
				}
		},shopBagHoverTimer);
	} else {
		showMiniCart(syncPDPCart, eAddItem);
	}
}

function showMiniCart(syncPDPCart, eAddItem) {
	var htmlContent = "";
	var isStorePickup = (typeof(pdp) != "undefined") ? pdp.options.storePickup : false;
	if (syncPDPCart && (returnShopBagCount() > 0 || eAddItem || isStorePickup)) {
	//if (syncPDPCart && (returnShopBagCount() > 0 || eAddItem || pdp.options.storePickup)) {
		if (!eAddItem && !$("#add-to-bag-overlay").dialog("isOpen"))
			addMiniCartPreloader(false);

		var prdCount = 0;
		var totalPrdCount = 0;
		var isStorePickup = false;
		var havingMonogram = false;
		var styleNoLabel = "STYLE NO.";
		var colorLabel = "COLOR:";
		var qtyLabel = "QTY:";
		var removeLabel = "REMOVE";
		var sizeLabel = "SIZE:";
		var lineGap = "";
		var preOrderLabel = "Pre-Order";
		$.ajax({
			type:"GET",
			//url:getMiniCartBaseURL()+ "ShoppingCartView?langId=-1&storeId="+storeId+"&orderId=.&catalogId="+catalogId+"&promotionNotApplied=false",
			url:getMiniCartBaseURL()+ "MiniShoppingCartView?langId=-1&storeId="+storeId+"&orderId=.&catalogId="+catalogId+"&promotionNotApplied=false",
			data:"{}",
			contentType: "application/json; charset=utf-8",
			dataFilter: function(data) {
				var resp = eval('(' + data + ')');
				if (resp.shoppingCart.subCarts.length > 0)
				{
					for (var i in resp.shoppingCart.subCarts) {
						for (var j in resp.shoppingCart.subCarts[i].products) {
							if ( resp.shoppingCart.subCarts[i].products.hasOwnProperty(j) ) {
								for (var k in resp.shoppingCart.subCarts[i].products[j].productInfo) {
									if ( k == "longDescription" ) {
										delete resp.shoppingCart.subCarts[i].products[j].productInfo.longDescription;
									}
								}
							}
						}
					}
				}
				return resp;
			},
			success:function(resp){
				if (resp.shoppingCart.subCarts.length > 0)
				{
					// this is what is returned from the server, use it to create dynamic html component of mini-cart.												
					var total = currencySymbol + parseInt(resp.shoppingCart.subTotal);
					var jpTotal = 0;
					var orderId = resp.shoppingCart.orderId;
					var subCartJSON = resp.shoppingCart.subCarts;
					$('#miniCartContent').empty();
					var ii=0;
					$(subCartJSON).each(function(subCartJsonKey,subCartJsonVal){						
						isStorePickup = parseBool(subCartJsonVal.isStorePickup);
						havingMonogram = subCartJsonVal.havingMonogram;
						//console.log("havingMonogram : "+ havingMonogram);
						$(subCartJsonVal.products).each(function(key,val){
							ii++;
							var prdInfo = val.productInfo;
							var prdQty = val.quantity;
							var orderItemId = val.orderItemId;
							var isGiftCard = val.isGiftcard;
							var preOrderEnableFlag = val.preOrderEnableFlag;							
							var preOrderDateVal = val.preOrderDateVal;
							var prdName = prdInfo.productName;
							var prdColor = prdInfo.selectedColor;
							var prdStyle = prdInfo.style.toLowerCase();
							var prdColCode = prdInfo.selectedColorCode;
							var catEntryId = prdInfo.swatchGroup.swatches[0].sizes[0].catEntryId;
							//listPrice,unitPrice																					
							var prdPrice = parseInt(prdInfo.swatchGroup.swatches[0].unitPrice.replace(/[$|,]/g, ""));					
							var prdListPrice = parseInt(prdInfo.swatchGroup.swatches[0].listPrice.replace(/[$|,]/g, ""));
							var prdPriceDisplay = currencySymbol + prdPrice;
							var prdListPriceDisplay = currencySymbol + prdListPrice;
							var prdSize = val.selectedSize;
							var keyId = (subCartJsonKey + 1) + "_" + key;
							var prdMng = "";
							var prdUrl = getMiniCartBaseURL() + "Product-"
								+ prdName.replace(/ /g, "_").toLowerCase()
								+ "-"+storeId+"-"+catalogId+"-" + prdStyle + "-en?cs="
								+ prdColCode;
							if (havingMonogram) {
								prdMng = val.orderItemEbText;
							}

							/*console.log("catEntryId : "+ catEntryId);
							console.log("prdSize : "+ prdSize);
							console.log("orderItemId : "+ orderItemId);
							console.log("prdName : "+ prdName);
							console.log("prdQty : "+ prdQty);
							console.log("prdPrice : "+ prdPrice);
							console.log("prdColor : "+ prdColor);
							console.log("prdStyle : "+ prdStyle);
							console.log("prdColCode : "+ prdColCode);
							console.log("#######################################");*/
							//keyId += (subCartJsonKey + key);
							var preOrdMsg = '';
							if (preOrderEnableFlag && storeId == "10551") {
							  preOrdMsg = "<div class='prdStyle'><font style='color:red'>"+preOrderLabel+"</font>&nbsp&nbsp"+preOrderDateVal+"</div>";
							}
							totalPrdCount += parseInt(prdQty);
							var protocol_ImageVar = ('https:' == document.location.protocol ? ' https://coach.scene7.com/is/image/Coach/' : 'http://coach.scene7.com/is/image/Coach/');
							if (parseBool(isGiftCard)) {
								prdPrice =  parseInt(val.orderItemPrice);
								prdPriceDisplay = currencySymbol + prdPrice;
								prdStyle = prdStyle.replace("_bundle", "");
								htmlContent += "<li id=\"prd_"+keyId+"\" class='bag-product-item'><div class='miniCart-product-image'><a href=\""+prdUrl+"\"><img alt='Product Image' src="+"'"+protocol_ImageVar+prdStyle+"_a0?$pd_bag$'"+" /></a></div><div class='product-desc'><div class='desc-top'><div class='prdName'><a href=\""+prdUrl+"\">"+prdName+"</a></div>"+lineGap+"<div class='prdStyle'>"+styleNoLabel+"<font style='font-weight:bold'>"+prdStyle+"</font></div><div class='prdQty'>"+qtyLabel+" <font style='font-weight:bold'>"+prdQty+"</font></div>"+preOrdMsg+"</div><div class='desc-bottom'><div onclick=\"removeItemFrmCart('"+catEntryId+"','"+storeId+"','"+catalogId+"','"+orderId+"','"+orderItemId+"', '"+keyId+"', "+prdQty+", '"+prdPriceDisplay+"')\" class='prdRemoveBtn'>"+removeLabel+"</div><div class='prdPrice'>"+prdPriceDisplay+"</div></div></div></li>";
							}
							else if (prdPrice != prdListPrice && parseBool(havingMonogram) && prdMng != "" && prdMng != undefined) {
								if (prdSize != null && prdSize != "ONESIZE") {
									htmlContent += "<li id=\"prd_"+keyId+"\" class='bag-product-item'><div class='miniCart-product-image'><a href=\""+prdUrl+"\"><img alt='Product Image' src="+"'"+protocol_ImageVar+prdStyle+"_"+prdColCode+"_a0?$pd_bag$'"+" /></a></div><div class='product-desc'><div class='desc-top'><div class='prdName'><a href=\""+prdUrl+"\">"+prdName+"</a></div>"+lineGap+"<div class='prdStyle'>"+styleNoLabel+"<font style='font-weight:bold'>"+prdStyle+"</font></div><div class='prdColor'>"+colorLabel+" <font style='font-weight:bold'>"+prdColor+"</font></div><div class='prdQty'>"+qtyLabel+" <font style='font-weight:bold'>"+prdQty+"</font></div><div class='prdSize'>"+sizeLabel+" <font style='font-weight:bold'>"+prdSize+"</font></div><div class='prdMng'>MONOGRAM: <font style='font-weight:bold'>"+prdMng+"</font></div>"+preOrdMsg+"</div><div class='desc-bottom'><div onclick=\"removeItemFrmCart('"+catEntryId+"','"+storeId+"','"+catalogId+"','"+orderId+"','"+orderItemId+"', '"+keyId+"', "+prdQty+", '"+prdPriceDisplay+"')\" class='prdRemoveBtn'>"+removeLabel+"</div><div class='prdSalePrice'>SALE "+prdPriceDisplay+"</div><div class='prdPrice'>"+prdListPriceDisplay+"</div></div></div></li>";
								}
								else {
									htmlContent += "<li id=\"prd_"+keyId+"\" class='bag-product-item'><div class='miniCart-product-image'><a href=\""+prdUrl+"\"><img alt='Product Image' src="+"'"+protocol_ImageVar+prdStyle+"_"+prdColCode+"_a0?$pd_bag$'"+" /></a></div><div class='product-desc'><div class='desc-top'><div class='prdName'><a href=\""+prdUrl+"\">"+prdName+"</a></div>"+lineGap+"<div class='prdStyle'>"+styleNoLabel+"<font style='font-weight:bold'>"+prdStyle+"</font></div><div class='prdColor'>"+colorLabel+" <font style='font-weight:bold'>"+prdColor+"</font></div><div class='prdQty'>"+qtyLabel+" <font style='font-weight:bold'>"+prdQty+"</font></div><div class='prdMng'>MONOGRAM: <font style='font-weight:bold'>"+prdMng+"</font></div>"+preOrdMsg+"</div><div class='desc-bottom'><div onclick=\"removeItemFrmCart('"+catEntryId+"','"+storeId+"','"+catalogId+"','"+orderId+"','"+orderItemId+"', '"+keyId+"', "+prdQty+", '"+prdPriceDisplay+"')\" class='prdRemoveBtn'>"+removeLabel+"</div><div class='prdSalePrice'>SALE "+prdPriceDisplay+"</div><div class='prdPrice'>"+prdListPriceDisplay+"</div></div></div></li>";
								}
							}
							else if (prdPrice != prdListPrice) {
								if (prdSize != null && prdSize != "ONESIZE") {
									htmlContent += "<li id=\"prd_"+keyId+"\" class='bag-product-item'><div class='miniCart-product-image'><a href=\""+prdUrl+"\"><img alt='Product Image' src="+"'"+protocol_ImageVar+prdStyle+"_"+prdColCode+"_a0?$pd_bag$'"+" /></a></div><div class='product-desc'><div class='desc-top'><div class='prdName'><a href=\""+prdUrl+"\">"+prdName+"</a></div>"+lineGap+"<div class='prdStyle'>"+styleNoLabel+"<font style='font-weight:bold'>"+prdStyle+"</font></div><div class='prdColor'>"+colorLabel+" <font style='font-weight:bold'>"+prdColor+"</font></div><div class='prdQty'>"+qtyLabel+" <font style='font-weight:bold'>"+prdQty+"</font></div><div class='prdSize'>"+sizeLabel+" <font style='font-weight:bold'>"+prdSize+"</font></div>"+preOrdMsg+"</div><div class='desc-bottom'><div onclick=\"removeItemFrmCart('"+catEntryId+"','"+storeId+"','"+catalogId+"','"+orderId+"','"+orderItemId+"', '"+keyId+"', "+prdQty+", '"+prdPriceDisplay+"')\" class='prdRemoveBtn'>"+removeLabel+"</div><div class='prdSalePrice'>SALE "+prdPriceDisplay+"</div><div class='prdPrice'>"+prdListPriceDisplay+"</div></div></div></li>";
								}
								else {
									htmlContent += "<li id=\"prd_"+keyId+"\" class='bag-product-item'><div class='miniCart-product-image'><a href=\""+prdUrl+"\"><img alt='Product Image' src="+"'"+protocol_ImageVar+prdStyle+"_"+prdColCode+"_a0?$pd_bag$'"+" /></a></div><div class='product-desc'><div class='desc-top'><div class='prdName'><a href=\""+prdUrl+"\">"+prdName+"</a></div>"+lineGap+"<div class='prdStyle'>"+styleNoLabel+"<font style='font-weight:bold'>"+prdStyle+"</font></div><div class='prdColor'>"+colorLabel+" <font style='font-weight:bold'>"+prdColor+"</font></div><div class='prdQty'>"+qtyLabel+" <font style='font-weight:bold'>"+prdQty+"</font></div>"+preOrdMsg+"</div><div class='desc-bottom'><div onclick=\"removeItemFrmCart('"+catEntryId+"','"+storeId+"','"+catalogId+"','"+orderId+"','"+orderItemId+"', '"+keyId+"', "+prdQty+", '"+prdPriceDisplay+"')\" class='prdRemoveBtn'>"+removeLabel+"</div><div class='prdSalePrice'>SALE "+prdPriceDisplay+"</div><div class='prdPrice'>"+prdListPriceDisplay+"</div></div></div></li>";
								}
							}
							else if (prdSize != null && prdSize != "ONESIZE") {
								htmlContent += "<li id=\"prd_"+keyId+"\" class='bag-product-item'><div class='miniCart-product-image'><a href=\""+prdUrl+"\"><img alt='Product Image' src="+"'"+protocol_ImageVar+prdStyle+"_"+prdColCode+"_a0?$pd_bag$'"+" /></a></div><div class='product-desc'><div class='desc-top'><div class='prdName'><a href=\""+prdUrl+"\">"+prdName+"</a></div>"+lineGap+"<div class='prdStyle'>"+styleNoLabel+"<font style='font-weight:bold'>"+prdStyle+"</font></div><div class='prdColor'>"+colorLabel+" <font style='font-weight:bold'>"+prdColor+"</font></div><div class='prdQty'>"+qtyLabel+" <font style='font-weight:bold'>"+prdQty+"</font></div><div class='prdSize'>"+sizeLabel+"<font style='font-weight:bold'>"+prdSize+"</font></div>"+preOrdMsg+"</div><div class='desc-bottom'><div onclick=\"removeItemFrmCart('"+catEntryId+"','"+storeId+"','"+catalogId+"','"+orderId+"','"+orderItemId+"', '"+keyId+"', "+prdQty+", '"+prdPriceDisplay+"')\" class='prdRemoveBtn'>"+removeLabel+"</div><div class='prdPrice'>"+prdPriceDisplay+"</div></div></div></li>";
							}
							else if (parseBool(havingMonogram) && prdMng != "" && prdMng != undefined) {
								htmlContent += "<li id=\"prd_"+keyId+"\" class='bag-product-item'><div class='miniCart-product-image'><a href=\""+prdUrl+"\"><img alt='Product Image' src="+"'"+protocol_ImageVar+prdStyle+"_"+prdColCode+"_a0?$pd_bag$'"+" /></a></div><div class='product-desc'><div class='desc-top'><div class='prdName'><a href=\""+prdUrl+"\">"+prdName+"</a></div>"+lineGap+"<div class='prdStyle'>"+styleNoLabel+"<font style='font-weight:bold'>"+prdStyle+"</font></div><div class='prdColor'>"+colorLabel+" <font style='font-weight:bold'>"+prdColor+"</font></div><div class='prdQty'>"+qtyLabel+" <font style='font-weight:bold'>"+prdQty+"</font></div><div class='prdMng'>MONOGRAM: <font style='font-weight:bold'>"+prdMng+"</font></div>"+preOrdMsg+"</div><div class='desc-bottom'><div onclick=\"removeItemFrmCart('"+catEntryId+"','"+storeId+"','"+catalogId+"','"+orderId+"','"+orderItemId+"', '"+keyId+"', "+prdQty+", '"+prdPriceDisplay+"')\" class='prdRemoveBtn'>"+removeLabel+"</div><div class='prdPrice'>"+prdPriceDisplay+"</div></div></div></li>";
							}
							else {
								htmlContent += "<li id=\"prd_"+keyId+"\" class='bag-product-item'><div class='miniCart-product-image'><a href=\""+prdUrl+"\"><img alt='Product Image' src="+"'"+protocol_ImageVar+prdStyle+"_"+prdColCode+"_a0?$pd_bag$'"+" /></a></div><div class='product-desc'><div class='desc-top'><div class='prdName'><a href=\""+prdUrl+"\">"+prdName+"</a></div>"+lineGap+"<div class='prdStyle'>"+styleNoLabel+"<font style='font-weight:bold'>"+prdStyle+"</font></div><div class='prdColor'>"+colorLabel+" <font style='font-weight:bold'>"+prdColor+"</font></div><div class='prdQty'>"+qtyLabel+" <font style='font-weight:bold'>"+prdQty+"</font></div>"+preOrdMsg+"</div><div class='desc-bottom'><div onclick=\"removeItemFrmCart('"+catEntryId+"','"+storeId+"','"+catalogId+"','"+orderId+"','"+orderItemId+"', '"+keyId+"', "+prdQty+", '"+prdPriceDisplay+"')\" class='prdRemoveBtn'>"+removeLabel+"</div><div class='prdPrice'>"+prdPriceDisplay+"</div></div></div></li>";
							}
							prdCount++;
						});
					});
			//alert("ii: "+ii);
					updateLineItems(ii);
					$('#totalPrice').text(total);
				}
				createHeaderCartLink(totalPrdCount);
			},
			failure: function (errMsg) {
				alert(errMsg);
			},
			error: function (jqXHR, exception) {
				//alert('An error occured.\n' + jqXHR.responseText);
			},
			complete: function (complete){
				if (prdCount > 0 && totalPrdCount > 0)
				{
					switch (prdCount) {
						case 1:
							$('#miniCartContent').removeClass('miniCartContents');
							$('#bag-product').removeClass('bag-products');
							$('#bag-content').removeClass('bag-contents');
							break;
						case 2:
							$('#miniCartContent').removeClass('miniCartContents');
							$('#bag-product').removeClass('bag-products');
							$('#bag-content').removeClass('bag-contents');
							break;
						default:
							$('#miniCartContent').addClass('miniCartContents');
							$('#bag-product').addClass('bag-products');
							$('#bag-content').addClass('bag-contents');
							//$("#miniCartContent").customScrollbar();
					}

					if (eAddItem) {
						trackAddToCartClick(prdCount, isStorePickup);
						timeoutTime = miniCartTimer;
						runEffect();
					}
					$("#miniCartHeaderTxt").empty(); 
					$('#miniCartHeaderTxt').text('Items in your bag');
					$('#miniCartContent').empty();
					$('#miniCartContent').append(htmlContent);
					$('#bag-product').removeClass('emptyMiniCart');
					$('#miniCartFooter').removeClass('hideCartPanel');
					$('#miniCartFooterBtn').removeClass('hideCartPanel');

					//insidePopup = false;
					
					//if (!$( "#add-to-bag-overlay" ).dialog("isOpen")) {
						//$("#add-to-bag-overlay").dialog('open');
					//}
					if (prdCount > 2) {
						$("#miniCartContent").customScrollbar({skin: "gray-skin", hScroll: false, vScroll: true});
					}
				}
			}
		});
	} else {
		if (!$( "#add-to-bag-overlay" ).dialog("isOpen")) {
			htmlContent += "<li class='bag-product-item emptyMiniCart' id='emptyCart'><div>FILL IT NOW AND ENJOY</div><div class='emptyCartText'>FREE SHIPPING ON ORDERS OF $150+</div><div>ANYWHERE IN THE CONTINENTAL U.S.</div></li>";
			$("#miniCartHeaderTxt").empty(); 
			$('#miniCartHeaderTxt').text('YOUR SHOPPING BAG IS EMPTY');
			$('#miniCartContent').empty();
			$('#miniCartContent').append(htmlContent);
			$('#bag-product').addClass('emptyMiniCart');
			$('#miniCartFooter').addClass('hideCartPanel');
			$('#miniCartFooterBtn').addClass('hideCartPanel');
			$( "#add-to-bag-overlay" ).dialog({ show: {effect:"slideDown",duration:0}},{ hide: {effect:"slideUp",duration:0}} );
			$("#add-to-bag-overlay").dialog('open');
		}
	}
}

var parseBool = function(str) {
    if (typeof str === 'string' && str.toLowerCase() == 'true')
            return true;

    return (parseInt(str) > 0);
}

function trackAddToCartClick(prdCount, isStorePickup) {
	//console.log("isStorePickup : "+ isStorePickup);
	//console.log("prdCount : "+ prdCount);
	if (typeof(pdp)=="undefined") return false; //added here for MultiProduct page integration - 'pdp' is not an object on this page

	if (prdCount == 1) {
		if (isStorePickup) {
			pdp.functions.omnitureTracker("pdpAddToCartWspIsFirstIn");
		}
		else {
			pdp.functions.omnitureTracker("pdpAddToCartIsFirstIn");
		}
	}
	else {
		if (isStorePickup) {
			pdp.functions.omnitureTracker("pdpAddToCartWsp");
		}
		else {
			pdp.functions.omnitureTracker("pdpAddToCart");
		}
	}
}

function processMiniCartPrint() {
	var i = 1;
	var shoppingBagDetailsUrl = "/online/handbags/ShoppingBagPrintView?catalogId="+catalogId+"&storeId="+storeId+"&langId=-1&shoppingBagDetails=";
	$(subCartJSON).each(function(subCartJsonKey,subCartJsonVal){
		var j = 1;
		$(subCartJsonVal.products).each(function(key,val){
			var prdInfo = val.productInfo;
			var prdPrice = parseFloat(val.orderItemPrice).toFixed(2);
			prdPrice = prdPrice.replace(".", "");
			var prdName = prdInfo.productName;
			var prdColor = prdInfo.selectedColor;
			var prdStyle = prdInfo.style.toLowerCase();
			var prdColCode = prdInfo.selectedColorCode;

			shoppingBagDetailsUrl += prdName + "_" + prdPrice + "_" + prdStyle + "_" + prdColor + "_" + prdColCode;

			if (j < $(subCartJsonVal.products).length) {
				shoppingBagDetailsUrl += "|";
			}
			j++;
		});
		if (i < $(subCartJSON).length) {
			shoppingBagDetailsUrl += "|";
		}
		i++;
	});

	window.open(shoppingBagDetailsUrl,'popup','height=800,width=750,menubar=no,scrollbar=no,status=no,toolbar=no,left=300,top=150');
}

function createHeaderCartLink(totalPrdCount) {
    $("#miniCartCount").empty(); 
    $('#miniCartCount').text('shopping bag (' + totalPrdCount + ')');
}
// Construct the base url for minicart popup.
function getMiniCartBaseURL() {
	var baseURL = location.host + "/online/handbags/";
	if (location.href.indexOf("https://") == -1) {
        baseURL = "http://" + baseURL;
    }
	else {
		baseURL = "https://" + baseURL;
	}
	return baseURL;
}
// Removed the item from minicart popup.
function removeItemFrmCart(catEntryId, storeId, catalogId, orderId, orderItemId, prdKey, prdQty, prdPrice) 
{
	if (location.href.indexOf("CheckoutView") != -1) {
		/*var cartTotal = $('#totalPrice').text().replace("$", "") - (prdPrice.replace("$", "") * prdQty);
		if (prdKey != null) {
			$('#totalPrice').empty();
			$('#totalPrice').text('$ ' + parseInt(cartTotal));
			$('#prd'+prdKey).remove();
		}*/
		$("#add-to-bag-overlay").dialog('close');
		$('#productRemoveGWT'+prdKey).click();
		return;
    }

	if (prdKey != null) {
		$('#prd_'+prdKey).empty();
		$('#prd_'+prdKey).append('<div align="center"><img alt="Loading..." src="/wcsstore/Coach_US/images/spinner.gif" /></div>');
	}

	var postData = {catEntryId: catEntryId, orderItemId: orderItemId, quantity : 0, storeId: storeId, catalogId: catalogId, orderId: orderId, comment: '|', calculateOrder: 1, URL : 'SuccessView'};

	$.ajax({
		type: "POST",
		url: getMiniCartBaseURL() + orderItemUpdateCmd,
		data: postData,
		success: function(json) {
			if (json.success) {
				showRemovetoCartSuccess(prdKey, catalogId, storeId, catEntryId, prdQty, prdPrice);
				updateLineItems(retrieveLineItems() - 1);
				enablePdpButton();
				removeCartLimitErrorMessage();
			} else {
				console.log("orderItemUpdateCmd : Failed");
			}
		},
		dataType: "json"
	});
}

function showRemovetoCartSuccess(prdKey, catalogId, storeId, catEntryId, prdQty, prdPrice) {
	//var successData = {catEntryId: catEntryId, catalogId: catalogId, storeId: storeId, addressType: 'B', URL: 'ShoppingCartView', primary: 0, quantity_0: prdQty};
	var successData = {catEntryId: catEntryId, catalogId: catalogId, storeId: storeId, addressType: 'B', URL: 'MiniShoppingCartView', primary: 0, quantity_0: prdQty};
	$.ajax({
		type: "POST",
		url: getMiniCartBaseURL() + orderCalculateCmd,
		data: successData,
		//success: function() {
		//	console.log("orderCalculateCmd : Success");
		//},
		complete: function (complete) {
			setHeaderText(prdKey, prdQty, prdPrice);
		},
		dataType: "json"
	});
}

function returnShopBagCount() {
	//return parseInt($('#miniCartCount').text().split("shopping bag (")[1].split(")")[0]);
	return parseInt($('#miniCartCount').text().match(/\(([^)]*)\)[^(]*$/)[1]);
}

function setHeaderText(prdKey, prdQty, prdPrice) {
	var count = returnShopBagCount() - prdQty;
	var subTotal = 0;
	subTotal = $('#totalPrice').text().replace("$", "") - (prdPrice.replace("$", "") * prdQty);		
	subTotal = currencySymbol + parseInt(subTotal);

	createHeaderCartLink(count);

	if (prdKey != null) {
		$('#totalPrice').empty();
		$('#totalPrice').text(subTotal);
		$('#prd_'+prdKey).remove();
	}

	var miiniCartEleCount = $('li.bag-product-item').length;
	if (prdKey != null && miiniCartEleCount > 0) {
		//$('#miniCartContent').children('li').first().addClass('bag-product-first-item');
		$('li.bag-product-item').first().addClass('bag-product-first-item');
		switch (miiniCartEleCount) {
			case 1:
				$('#miniCartContent').removeClass('miniCartContents');
				$('#bag-product').removeClass('bag-products');
				$('#bag-content').removeClass('bag-contents');
				$("#miniCartContent").customScrollbar("resize");
				$('div.viewport').css("height","140px");
				$('div.vertical').css("display","none");
				break;
			case 2:
				$('#miniCartContent').removeClass('miniCartContents');
				$('#bag-product').removeClass('bag-products');
				$('#bag-content').removeClass('bag-contents');
				$("#miniCartContent").customScrollbar("resize");
				$('div.vertical').css("display","none");
				break;
			default:
				/*$('#miniCartContent').addClass('miniCartContents');
				$('#bag-product').addClass('bag-products');
				$('#bag-content').addClass('bag-contents');*/
				$("#miniCartContent").customScrollbar("resize");
		}
	}
	else {
		$("#add-to-bag-overlay").dialog('close');
	}
}

function numberWithCommas(x) {
    x = x.toString(); 
    var pattern = /(-?\d+)(\d{3})/; 
    while (pattern.test(x)) 
        x = x.replace(pattern, "$1,$2"); 
    return x; 
}
//wcs-6379 changes for shopping bag omniture
function callOmnitureForShoppingBag() {
    var s = window.s;
    s.linkTrackVars="events";
    s.events="scView";
    s.pageName="Cart View";
    s.prop18="UN1";
    s.t();
}
mcart={
	vars:{
		mCartQty:0
	}
}
function updateLineItems(items) {
	mcart.vars.mCartQty = items;
}

function retrieveLineItems() {
	return mcart.vars.mCartQty;
}