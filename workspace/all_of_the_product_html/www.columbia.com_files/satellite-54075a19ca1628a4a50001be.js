_satellite.pushAsyncScript(function(event, target, $variables){
  if (TagManagerData.SiteID === "Columbia_UK" || TagManagerData.SiteID === "Sorel_UK" || TagManagerData.SiteID === "Columbia_EU" || TagManagerData.SiteID === "Sorel_EU"){
	var criteoScript = document.createElement('script');
	criteoScript.setAttribute('src','//static.criteo.net/js/ld/ld.js');
	criteoScript.setAttribute('async', true);
	document.body.appendChild(criteoScript);
	var criteoAccount = 0;
	if (TagManagerData.SiteID === "Columbia_UK"){
		criteoAccount = 15703; 
	}
	else if (TagManagerData.SiteID === "Columbia_EU" && TagManagerData.Locale === "fr_FR"){
		criteoAccount = 15702;
	}
	else if (TagManagerData.SiteID === "Columbia_EU" && TagManagerData.Locale === "de_DE"){
		criteoAccount = 15701;
	}
	else if (TagManagerData.SiteID === "Sorel_UK"){
		criteoAccount = 15706;
	}
	else if (TagManagerData.SiteID === "Sorel_EU" && TagManagerData.Locale === "fr_FR"){
		criteoAccount = 15705;
	}
	else if (TagManagerData.SiteID === "Sorel_EU" && TagManagerData.Locale === "de_DE"){
		criteoAccount = 15704;
	}	
  if (criteoAccount > 0){
	window.criteo_q = window.criteo_q || [];
	window.criteo_q.push({event: "setAccount",account: criteoAccount });
  window.criteo_q.push({event: "setSiteType",type: "d"});
	if (TagManagerData.PageType === "ProductDetail"){
		window.criteo_q.push({event: "viewItem", item: TagManagerData.ProductMasterProductID});
	}	
	if (TagManagerData.PageType === "Home"){
		window.criteo_q.push({event: "viewHome"});
	}
	if (TagManagerData.PageType === "Category"){
		window.criteo_q.push({event: "viewList", item: function(){var il = [];
			$("div.product-tile").each(function(i){ if(il.length < 3) { il.push($(this).data("itemid")); } else { return false; } });
			return il;}});
	}
	if (TagManagerData.PageType === "Cart"){
		window.criteo_q.push({event: "viewBasket",item: function(){ var pl = [];
			for(var i = 0; i<TagManagerData.CartLineItems.length; i++){
				var cartItem = TagManagerData.CartLineItems[i]
				pl.push({
					id: cartItem.ProductMasterProductID,
					price: cartItem.ProductAdjustedPrice / cartItem.ProductQty,
					quantity: cartItem.ProductQty });}
				return pl;}});
	}
	if (TagManagerData.PageType === "CHKTThanks"){
		window.criteo_q.push(
			{event: "trackTransaction", id: TagManagerData.OrderNumber, item: function(){ var pl = [];
				for(var i = 0; i<TagManagerData.OrderLineItems.length; i++){
					var orderItem = TagManagerData.OrderLineItems[i]
					pl.push({
						id: orderItem.ProductMasterProductID,
						price: orderItem.ProductAdjustedPrice / orderItem.ProductQty,
						quantity: orderItem.ProductQty });}
					return pl;}});
	}
	
 }
}


});
