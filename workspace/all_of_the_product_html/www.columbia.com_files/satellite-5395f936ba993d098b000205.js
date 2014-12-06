_satellite.pushAsyncScript(function(event, target, $variables){
  var accountID = "";
var type = "";
var cat = "";
var addlParams = "";

if(TagManagerData.SiteID == "Columbia_US"){
	//COL US
	var accountID = "2347706";
	if(TagManagerData.PageType == "Home"){		
			var type = "colum392";
			var cat = "Colum00";
	} else if(TagManagerData.PageType == "ProductDetail"){
			var type = "colum392";
			var cat = "Produ0";
	} else if(TagManagerData.PageType == "Cart"){
		var type = "colum392";
		var cat = "Cartt0";
	} else if(TagManagerData.PageType == "CHKTShipping"){
		var type = "colum392";
		var cat = "Check0";
	} else if(TagManagerData.PageType == "AccountRegistration"){
		var type = "colum392";
		var cat = "Accou00";
	} else if(TagManagerData.PageType == "AccountCreated"){
		var type = "colum392";
		var cat = "Accou0";
	} else if(TagManagerData.PageType == "CHKTThanks"){
		//checkout page has two tags so just write one now
		var axel = Math.random() + "";
		var a = axel * 10000000000000;
		var ifrm = document.createElement("IFRAME"); 
		ifrm.setAttribute("src", "https://2347706.fls.doubleclick.net/activityi;src=2347706;type=colum392;cat=Order0;ord=" + a + "?"); 
		ifrm.style.width = "1px"; 
		ifrm.style.height = "1px";
		ifrm.style.display = "none";
		ifrm.setAttribute("frameborder", "0");
		document.getElementById("dtm_pixel_container").appendChild(ifrm); 

		//params for tag at the end of the script
		var orderQty = 0;
		for(var i=0; i<TagManagerData.OrderLineItems.length; i++){
			orderQty =  orderQty + TagManagerData.OrderLineItems[i].ProductQty;
		}
		var addlParams = addlParams + ";qty=" + orderQty + ";cost=" + TagManagerData.OrderGross + ";ord=" + TagManagerData.OrderNumber;
		var type = "Colum0";
		var cat = "Colum0";
	} else if(TagManagerData.PageType == "StoreLocatorSearch"){
		var type = "colum392";
		var cat = "Store0";
	}
	else if (document.location.href.indexOf("columbia.com/technology-turbodown/#prefn1=genderGroup&prefv1=Men%27s") > 0){
		var type = "colum392";
		var cat = "MensT0";
	}
	else if (document.location.href.indexOf("columbia.com/technology-turbodown/#prefn1=genderGroup&prefv1=Women%27s") > 0){
		var type = "colum392";
		var cat = "Women0";
	}
	else if (typeof TagManagerData.CategoryID !== "undefined" && TagManagerData.CategoryID === "technology-turboDown"){
		var type = "colum392";
		var cat = "Banne0";
	}
	else if (typeof TagManagerData.CategoryID !== "undefined" && TagManagerData.CategoryID === "Minx"){
		var type = "colum392";
		var cat = "MinxC0";
	}
	else if (typeof TagManagerData.CategoryID !== "undefined" && TagManagerData.CategoryID === "xcrsn-collection"){
		var type = "colum392";
		var cat = "XCRSN0";
	}
	else if (typeof TagManagerData.CategoryID !== "undefined" && TagManagerData.CategoryID === "activity-fishing"){
		var type = "colum392";
		var cat = "colum754";
	}
	else if (typeof TagManagerData.CategoryID !== "undefined" && TagManagerData.CategoryID === "footwear-women-boots"){
		var type = "colum392";
		var cat = "Women003";
	}
	else if (typeof TagManagerData.CategoryID !== "undefined" && TagManagerData.CategoryID === "footwear-men-boots"){
		var type = "colum392";
		var cat = "MensB0";
	}
	else if (typeof TagManagerData.CategoryID !== "undefined" && TagManagerData.CategoryID === "bugaboot"){
		var type = "colum392";
		var cat = "Bugab0";
	}else if (typeof TagManagerData.CategoryID !== "undefined"){
		var type = "colum392";
		var cat = "Resul0";
	}
} else if(TagManagerData.SiteID == "Sorel_US"){
	//SOR US
	var accountID = "2324553";
	if(TagManagerData.PageType == "Home"){
		var type = "sorel579";
		var cat = "sorel012";
	} else if(TagManagerData.PageType == "Cart"){
		var type = "sorel579";
		var cat = "shopp655";
	} else if(TagManagerData.PageType == "CHKTThanks"){
		//checkout page has two tags so just write one now
		var axel = Math.random() + "";
		var a = axel * 10000000000000;
		var ifrm = document.createElement("IFRAME"); 
		ifrm.setAttribute("src", "https://2324553.fls.doubleclick.net/activityi;src=2324553;type=sorel579;cat=order635;ord=" + a + "?"); 
		ifrm.style.width = "1px"; 
		ifrm.style.height = "1px";
		ifrm.style.display = "none";
		ifrm.setAttribute("frameborder", "0");
		document.getElementById("dtm_pixel_container").appendChild(ifrm); 

		//params for tag at the end of the script
		var orderQty = 0;
		for(var i=0; i<TagManagerData.OrderLineItems.length; i++){
			orderQty =  orderQty + TagManagerData.OrderLineItems[i].ProductQty;
		}
		var addlParams = addlParams + ";qty=" + orderQty + ";cost=" + TagManagerData.OrderGross + ";ord=" + TagManagerData.OrderNumber;
		var type = "sorel750";
		var cat = "sales299";
	} else if(TagManagerData.PageType == "ProductDetail" && typeof TagManagerData.ProductClassCategory != "undefined"){
		var type = "sorel579";
		var cat = "";
		if(TagManagerData.ProductName.toLowerCase().indexOf("women") === 0){
			cat = "women346";
		}
		else if(TagManagerData.ProductName.toLowerCase().indexOf("men") === 0){
			cat = "MensP0";
		}
		else if(TagManagerData.ProductName.toLowerCase().indexOf("kids") === 0 || TagManagerData.ProductName.toLowerCase().indexOf("children") === 0 || TagManagerData.ProductName.toLowerCase().indexOf("youth") === 0 || TagManagerData.ProductName.toLowerCase().indexOf("girl") === 0 ){
			cat = "Kidsp0";
		}
	} else if(TagManagerData.PageType == "StoreLocatorSearch"){
		var type = "sorel579";
		var cat = "shopo841";
	}
	else if (TagManagerData.PageType == "Category" && typeof TagManagerData.CategoryID != "undefined" && TagManagerData.CategoryID.indexOf("men") === 0){
		var type = "sorel579";
		var cat = "Mensr0";
	}
	else if (TagManagerData.PageType == "Category" && typeof TagManagerData.CategoryID != "undefined" && TagManagerData.CategoryID.indexOf("kids") === 0){
		var type = "sorel579";
		var cat = "Kidsr0";
	}
	else if (TagManagerData.PageType == "Category" && typeof TagManagerData.CategoryID != "undefined" && TagManagerData.CategoryID.indexOf("women") === 0){
		var type = "sorel579";
		var cat = "Women000";
	}
	else if (TagManagerData.PageType == "Wishlist"){
		var type = "sorel579";
		var cat = "Addto0";
	}
	else if (_satellite.getDataElement("CompareTable") !== "undefined" && _satellite.getQueryParam('category') && _satellite.getQueryParam('category') === "women"){
		var type = "sorel579";
		var cat = "Women0";
	}
  else if(_satellite.getQueryParam("addr") === "new_york-ny-345-w-14th-st-ste-b"){
  	var type = "sorel579";
    var cat = "nysto0";
  }
}

if(accountID != "" && type != "" && cat != ""){
	var axel = Math.random() + "";
	var a = axel * 10000000000000;
	var ifrm = document.createElement("IFRAME"); 
	ifrm.setAttribute("src", "//" +  + accountID + ".fls.doubleclick.net/activityi;src=" + accountID + ";type=" + type + ";cat=" + cat + ";ord=" + a + addlParams + "?"); 
	ifrm.style.width = "1px"; 
	ifrm.style.height = "1px";
	ifrm.style.display = "none";
	ifrm.setAttribute("frameborder", "0");
	document.getElementById("dtm_pixel_container").appendChild(ifrm); 
}



});
