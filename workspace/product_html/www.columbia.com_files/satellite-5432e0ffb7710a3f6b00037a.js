_satellite.pushAsyncScript(function(event, target, $variables){
  var accountID = "3903227";
var cat = "";
var type = "";
var addlParams = "";
if (TagManagerData.SiteID === "Columbia_EU" && TagManagerData.Locale === "de_DE"){
	if(TagManagerData.PageType == "Home"){		
		type = "2014-000";
		cat = "2014-00";
	} else if(TagManagerData.PageType == "AccountCreated"){
		type = "2014-000";
		cat = "2014-000";
		var addlParams = ";u2=" + TagManagerData.CustomerNumber;
	} else if(TagManagerData.PageType == "CHKTThanks"){
		//params for tag at the end of the script
		var orderQty = 0;
		var products = "";
		for(var i=0; i<TagManagerData.OrderLineItems.length; i++){
			products += TagManagerData.OrderLineItems[i].ProductMasterProductID;
			if (i < TagManagerData.OrderLineItems.length -1){
				products += "|";
			}
		}
		var addlParams = addlParams + ";u1=" + products + ";u2=" + TagManagerData.OrderNumber + ";u4=" + TagManagerData.OrderGross;
		type = "2014-000";
		cat = "2014-0";
	} else if(TagManagerData.PageType == "StoreLocatorSearch"){
		type = "2014-000";
		cat = "2014-002";
	} else if (typeof TagManagerData.CategoryID !== "undefined" && TagManagerData.CategoryID === "technology-turboDown"){
		type = "2014-000";
		cat = "2014-001";
	}
}
else if (TagManagerData.SiteID === "Columbia_EU" && TagManagerData.Locale === "fr_FR"){
	if(TagManagerData.PageType == "Home"){		
		type = "2014-00";
		cat = "2014-00";
	} else if(TagManagerData.PageType == "AccountCreated"){
		type = "2014-00";
		cat = "2014-000";
		var addlParams = ";u2=" + TagManagerData.CustomerNumber;
	} else if(TagManagerData.PageType == "CHKTThanks"){
		//params for tag at the end of the script
		var orderQty = 0;
		var products = "";
		for(var i=0; i<TagManagerData.OrderLineItems.length; i++){
			products += TagManagerData.OrderLineItems[i].ProductMasterProductID;
			if (i < TagManagerData.OrderLineItems.length -1){
				products += "|";
			}
		}
		var addlParams = addlParams + ";u1=" + products + ";u2=" + TagManagerData.OrderNumber + ";u4=" + TagManagerData.OrderGross;
		type = "2014-00";
		cat = "2014-0";
	} else if(TagManagerData.PageType == "StoreLocatorSearch"){
		type = "2014-00";
		cat = "2014-002";
	} else if (typeof TagManagerData.CategoryID !== "undefined" && TagManagerData.CategoryID === "technology-turboDown"){
		type = "2014-00";
		cat = "2014-001";
	}
}
else if (TagManagerData.SiteID === "Columbia_UK"){
	if(TagManagerData.PageType == "Home"){		
		type = "2014-001";
		cat = "2014-0";
	} else if(TagManagerData.PageType == "AccountCreated"){
		var type = "2014-001";
		var cat = "2014-00";
		var addlParams = ";u2=" + TagManagerData.CustomerNumber;
	} else if(TagManagerData.PageType == "CHKTThanks"){
		//params for tag at the end of the script
		var orderQty = 0;
		var products = "";
		for(var i=0; i<TagManagerData.OrderLineItems.length; i++){
			products += TagManagerData.OrderLineItems[i].ProductMasterProductID;
			if (i < TagManagerData.OrderLineItems.length -1){
				products += "|";
			}
		}
		var addlParams = addlParams + ";u1=" + products + ";u2=" + TagManagerData.OrderNumber + ";u4=" + TagManagerData.OrderGross;
		type = "2014-001";
		cat = "2014-000";
	} else if(TagManagerData.PageType == "StoreLocatorSearch"){
		type = "2014-001";
		cat = "2014-001";
	} else if (typeof TagManagerData.CategoryID !== "undefined" && TagManagerData.CategoryID === "technology-turboDown"){
		type = "2014-001";
		cat = "2014-002";
	}
}
else if (TagManagerData.SiteID === "Columbia_EU" && TagManagerData.Locale === "es_ES"){
	if(TagManagerData.PageType == "Home"){		
		type = "2014-002";
		cat = "2014-0";
	} else if(TagManagerData.PageType == "AccountCreated"){
		var type = "2014-002";
		var cat = "2014-001";
		var addlParams = ";u2=" + TagManagerData.CustomerNumber;
	} else if(TagManagerData.PageType == "CHKTThanks"){
		//params for tag at the end of the script
		var orderQty = 0;
		var products = "";
		for(var i=0; i<TagManagerData.OrderLineItems.length; i++){
			products += TagManagerData.OrderLineItems[i].ProductMasterProductID;
			if (i < TagManagerData.OrderLineItems.length -1){
				products += "|";
			}
		}
		var addlParams = addlParams + ";u1=" + products + ";u2=" + TagManagerData.OrderNumber + ";u4=" + TagManagerData.OrderGross;
		type = "2014-002";
		cat = "2014-002";
	} else if(TagManagerData.PageType == "StoreLocatorSearch"){
		type = "2014-002";
		cat = "2014-000";
	} else if (typeof TagManagerData.CategoryID !== "undefined" && TagManagerData.CategoryID === "technology-turboDown"){
		type = "2014-002";
		cat = "2014-00";
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
