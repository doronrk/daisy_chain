function EmailPopup(arg0, arg1, arg2) 
{
	var ddlColor = document.getElementById(arg0);		//try to get handle to color dropdown
	var ddlSizeWidth = document.getElementById(arg1);	//try to get handle to size dropdown
	var url = "";
	
	//on donation page, there are no dropdowns, it passes in (productId, variantId) [33817, 33817-000-00]
	if (!ddlSizeWidth && !ddlColor) {
		var color = arg0; // productId
		var size = arg1;  // variantId
		url = "/Shopping/EmailProductToFriend.aspx?s=" + size + "&c=" + color + "&p=" + color;
		
	//both size and color dropdowns are populated
	} else if (ddlSizeWidth && ddlColor) {
		var size = (ddlSizeWidth.selectedIndex > 0) ? ddlSizeWidth.options[ddlSizeWidth.selectedIndex].value : "0";		
		var color = ddlColor.options[ddlColor.selectedIndex].value;
        if (size && color) 
			url = "/Shopping/EmailProductToFriend.aspx?s=" + size + "&c=" + color + "&p=" + color;
		
	//only color dropdown is populated
	} else if (!ddlSizeWidth && ddlColor) {
		var color = ddlColor.options[ddlColor.selectedIndex].value;
		if (color) 
			url = "/Shopping/EmailProductToFriend.aspx?s=0&c=" + color + "&p=" + color;
	}
	
	if (arg2 && arg2>" ")
	{
	    url=url+ "&lang=" + arg2;
	}

	if (url.length > 0) 
		window.open(url, "EmailAFriendPopUp", "resizable=0,status=0,toolbar=0,location=0,menubar=0,directories=0,scrollbars=0,height=560,width=550");
	 else 
		alert("Please Select a Color First.");
}
