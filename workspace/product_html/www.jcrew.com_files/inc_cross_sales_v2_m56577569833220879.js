	
	function getCrossSellProductDetail1(productCode, indexId, requestType, colorOptions)
	{
		var gotoPage = "/browse/ajax/add_cross_sell_to_shopping_cart.jsp?selectedIndex=" + indexId;
		divTagIds=new Array(6);
		divTagIds[0]="noOfItemsDiv";
		divTagIds[1]="topNavDiv";
		divTagIds[2]= "cross_sell_div";
		divTagIds[3]= "product_" + productCode;
		divTagIds[4] = "searchbox";
		divTagIds[5] = "pCross_Inventory_" + indexId;
		
		var _sizes = document.getElementsByName("ADD_CART_ITEM_ARRAY<>ATR_size");
		var mySelectedIndex = _sizes[indexId].selectedIndex;
		
		var swatchId = "up_cross_sell_" + indexId;
		var _colorSizes = document.getElementById(swatchId);
		var myColorIndex = _colorSizes.selectedIndex;
	
		if (mySelectedIndex <= 0) 
		{
			var errorDivId = "pCross_Error_" + indexId;
			document.getElementById(errorDivId).style.display='block';
			if (myColorIndex <= 0) 
			{
				var errorDivId = "pCross_CError_" + indexId;
				document.getElementById(errorDivId).style.display='block';
			}
			return;
		}
		else
		{
			if (myColorIndex <= 0) 
			{
				var errorDivId = "pCross_CError_" + indexId;
				document.getElementById(errorDivId).style.display='block';
				return;
			}
			else
			{
				document.forms['add_cross_sale'].ErrorRedirect.value = '/browse/ajax/refresh_cross_sell_product_details.jsp';
				var callBack = "function callBackFunc(t) { if (t[1] != null) { showBag(); parent.scrollTo(0,0); setTimeout('isBagOpen()', 5000);} }";
				sendAjaxRequest(false, gotoPage, document.forms['add_cross_sale'], divTagIds, true, requestType, true, callBack);
			}
		}
		
		//Omniture scAdd
		var s=s_gi(s_account);
		s.linkTrackVars='channel,eVar5,eVar7,prop11,products,events';
		s.linkTrackEvents='scAdd';
		s.channel='Shopping Bag:Add';
		s.events='scAdd';
		s.eVar5='cross sell';			//finding method populated if there is an upsell in the scAdd
		s.eVar7='Individual Product View';	//From what (product or page or location		
		s.prop11='Shopping Bag:Add';
		s.products = ';'+productCode;
		s.tl(this,'o','Add to Shopping Bag');		
		
		document.forms['add_cross_sale'].ErrorRedirect.value = '/browse/ajax/refresh_cross_sell_product_details.jsp';
		var callBack = "function callBackFunc(t) { if (t[1] != null) { showBag(); parent.scrollTo(0,0); setTimeout('isBagOpen()', 5000);} }";
		sendAjaxRequest(false, gotoPage, document.forms['add_cross_sale'], divTagIds, true, requestType, true, callBack);
	}
	
	
	function getCrossSellProductDetail(element, productCode, indexId, requestType, colorName, crossSaleNum)
	{
		var gotoPage = "/browse/ajax/refresh_cross_sell_product_details.jsp?selectedIndex=" + indexId;
		divTagId = "product_" + productCode;
		if (requestType == 'color') 
		{
			requestType = 'refresh_product_detail';
			var _sizes = document.getElementsByName("ADD_CART_ITEM_ARRAY<>ATR_size");
			var mySelectedIndex = _sizes[indexId].selectedIndex;
			if (mySelectedIndex <= 0 ) 
			{
				var swatchId = "up_cross_sell_" + indexId;
				var _colorSizes = document.getElementById(swatchId);
				var myColorIndex = _colorSizes.selectedIndex;
				if (myColorIndex <= 0)
				{
					var swatchId = "up_cross_sell_" + indexId;
					var _colorSizes = document.getElementById(swatchId);
					var myColorIndex = _colorSizes.selectedIndex;
					if (myColorIndex <= 0)
					{
						var errorDivId = "pCross_Error_" + indexId;
						document.getElementById(errorDivId).style.display='none';
						errorDivId = "pCross_CError_" + indexId;
						document.getElementById(errorDivId).style.display='none';
						return;
					}
					var errorDivId = "pCross_Error_" + indexId;
					document.getElementById(errorDivId).style.display='none';
					errorDivId = "pCross_CError_" + indexId;
					document.getElementById(errorDivId).style.display='none';
					return;
				}
				var errorDivId = "pCross_Error_" + indexId;
				document.getElementById(errorDivId).style.display='block';
				errorDivId = "pCross_CError_" + indexId;
				document.getElementById(errorDivId).style.display='none';
				return;
			} 
			else 
			{
				var colorDivId = "up_cross_sell_" + indexId;
				document.getElementById(colorDivId).value = colorName;
			}
		} 
		else 
		{
			// This is called because of size change.
			var _sizes = document.getElementsByName("ADD_CART_ITEM_ARRAY<>ATR_size");
			var mySelectedIndex = _sizes[indexId].selectedIndex;
			if (mySelectedIndex <= 0) 
			{
				return;
			}
			// reset the color.
			var colorDivId = "up_cross_sell_" + indexId;
			document.getElementById(colorDivId).value = '';
		}
		document.forms['add_cross_sale'].ErrorRedirect.value = "/browse/ajax/refresh_cross_sell_product_details.jsp";
		sendAjaxRequest(true,gotoPage, document.forms['add_cross_sale'],divTagId, true, requestType, false, '', true, 1, element, "Refreshing Details...", 50, 45);
	}
	
	function setViewImgCS(imgName,prodCode)
	{
		document.getElementById("crossSellImage"+prodCode).src=imgName;
		eval("currCrossSellImg"+prodCode+"='"+imgName+"'");
	}
	
	function changeViewImgCS(imgName,prodCode)
	{
		document.getElementById("crossSellImage"+prodCode).src=imgName;
	}
	
	function resetImgCS(prodCode)
	{
		document.getElementById("crossSellImage"+prodCode).src=eval("currCrossSellImg"+prodCode);
	}