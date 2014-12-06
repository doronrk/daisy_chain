dojo.require("dojo.NodeList-manipulate");
dojo.require("dojo.io.script");

HBCLocalizationUtilJS = {

	/***********************
	 * UC-7 International flow
	 * 
	 * Hiding promotion related elements from the pages in international flow.
	 ***********************/
	fnHidePromo:function(){
			dojo.query(".logo_text,.main_ad,#_dropslide1,div#main_coach div.ad,#shoprunner,.sr_footer,.sr_reset").forEach(function(node,index){
			dojo.query(node).style({display:"none" }); 
	});
			dojo.query("#shoprunner,.srPromotionClass,.ad_run_Pdp,.shopping-right").forEach(function(node,index){
				dojo.query(node).style({display:"none" }); 
		});
	},

	/***********************
	 * UC-7 International flow
	 * Showing the promotion related elements on the page for US(non-international) flow only
	 ************************/
fnShowPromo:function(){
	dojo.query(".logo_text,.main_ad,#_dropslide1,div#main_coach div.ad,#shoprunner,.sr_footer,.sr_reset").forEach(function(node,index){
	dojo.query(node).style({display:"block" }); 
});
	dojo.query("#shoprunner,.srPromotionClass,.ad_run_Pdp").forEach(function(node,index){
		dojo.query(node).style({display:"block" }); 
});
},
/***********************
 * UC-7 International flow
 * Getting page name for price translation in international flow.
 ***********************/
fnLoadPageName:function(){
	//adding try catch for handling pagename exception for non international pages
	try{
	pageNameVar = dojo.byId("intlPageName").value;
	}
	catch(e){
		pageNameVar="";
		
	}
},

/***********************
 * UC-7 International flow
 * update Cookie with country code, currency code, exchange rate and quote id for international flow.
 ***********************/
fnPopulateExchangeRates:function(){
	dojo.require("dojo.cookie");
	var cookieValue=dojo.cookie("INTL");
	var splitCookieValues=cookieValue.split("|");
	var currCurrency=splitCookieValues[2];
	var currCountry=splitCookieValues[1];
	try{
	var currJson=intlShip.currency;
	var quoteId = currJson[currCurrency].QuoteId;
	var exchrate=currJson[currCurrency].ExchangeRate;
	var LcpId = UtilitiesJS.fetchlcpId(currCountry);
	var cntryPMID = UtilitiesJS.fetchPMID(currCountry);
	splitCookieValues[3]=exchrate;
	
	  splitCookieValues[4]=quoteId;
	  splitCookieValues[6]=LcpId;
	 
	  if(cntryPMID!=""){
		  splitCookieValues[7]= cntryPMID;
		  var updatedValue=splitCookieValues[0]+"|"+splitCookieValues[1]+"|"+splitCookieValues[2]+"|"+splitCookieValues[3]+"|"+splitCookieValues[4]+"|"+splitCookieValues[5]+"|"+splitCookieValues[6]+"|"+splitCookieValues[7];  
	  }
	  else{
		  var updatedValue=splitCookieValues[0]+"|"+splitCookieValues[1]+"|"+splitCookieValues[2]+"|"+splitCookieValues[3]+"|"+splitCookieValues[4]+"|"+splitCookieValues[5]+"|"+splitCookieValues[6]; 
	  }
	UtilitiesJS.setCookie("INTL",updatedValue);
	}
	catch(err){
		UtilitiesJS.setCookie("INTL","N|US|USD");
	}
},

/***********************
 * UC-7 International flow
 * This function determines whether product is eligible for international shipping or not and
 * disables addtobag button and displays error message if not eligible for international shipping.
 ***********************/
fnShowEligibility:function(){

	dojo.query(".intlShipElgibilty").forEach(function(node,index){
		var intShipavailCase =node.value;
		var intShipavail=intShipavailCase.toUpperCase();
		//alert(intShipavail);
		if (intShipavail == 'N') {

			dojo.query("div#availability dl.intlShipElg ").style({ display:"block" }); 
			var idVal = dojo.query(node).attr("id");
			dojo.query(idVal).removeClass("intlShipHide");
			dojo.query(idVal).addClass("intlShipShow");   	
			if(pageNameVar == "Product"){
				dojo.query("#inventoryCheck a#addtobag").style({ display:"none" }); 
			}
			else if(pageNameVar == "CoachProduct"){

				dojo.query("div.actions a#addtobag").style({ display:"none" });
			}

			else if(pageNameVar == "GiftCard"){

				dojo.query("div.gift_info, .dijitButtonNode").style({ display:"none" });
			}
			else if(pageNameVar == "QuickView"){

				dojo.query("#inventoryCheck a#addtobag").style({ display:"none" }); 
			}
			
		}
	});
},
/***********************
 * UC-7 International flow
 * Call of Price translation logic for product page.
 ***********************/
fnTranlateProduct:function(){
	dojo.query(".ora,.sale,.price,.save ,.total,.suggestItemPrice").forEach(function(node, index){
		var oldSaveStory=node.innerHTML;
		var newSaveStory=HBCLocalizationUtilJS.convertSaveStory(oldSaveStory);
		node.innerHTML=newSaveStory;
	});
},
/***********************
 * UC-7 International flow
 * Call of Price translation logic for mini shopcart.
 ***********************/
fnTranlateMiniCart:function(){
	var totalCharge=0;
	var cookieValue=dojo.cookie("INTL");
	var splitValues=cookieValue.split("|");
	var cookieCurr = splitValues[2];
	var curr = cookieCurr + ' ';
	var round_method=splitValues[5];
	dojo.query("ul.baglist .sale,ul.baglist .price,div.total_info .total").forEach(function(node, index){
		var oldTotal=node.innerHTML;
		if(oldTotal.replace(/(^[\s]+|[\s]+$)/g, '')!='' && node.innerHTML.indexOf('$')!=-1){
			if(!$(node).hasClass('total') && ($(node).hasClass('sale') || $(node).hasClass('price'))){
				var quant = $(node).parent().find('span.quantity').html();
				quant = parseFloat(quant.replace(/[^0-9\.]/g, ''));
				var price = oldTotal.match(/\$\d{1,3}[,.]\d{1,3}/g);
				price[0] = price[0].replace(/\$/g, '');
				price[0] = price[0].replace(/\,/g, '');
				var oldItemPrice = price[0]/quant;
				var newItemPrice=HBCLocalizationUtilJS.performConversion(oldItemPrice);
				var newTotal = Math.round(newItemPrice * quant * Math.pow(10, round_method)) / Math.pow(10, round_method);
				if(!$(node).hasClass('sale') && !($(node).parent().find('.sale').length!=0 && $(node).parent().find('.sale').html().replace(/(^[\s]+|[\s]+$)/g, '')!='')){
					totalCharge += newTotal;
				}else if($(node).hasClass('sale')){
					totalCharge += newTotal;
				}
				newTotal = curr.concat(newTotal);
				newTotal = HBCLocalizationUtilJS.numberWithCommas(newTotal);
				node.innerHTML=newTotal;
			}else if($(node).hasClass('total')){
				var totalNewCharge = Math.round(totalCharge * Math.pow(10, round_method)) / Math.pow(10, round_method);
				totalNewCharge = HBCLocalizationUtilJS.numberWithCommas(totalNewCharge);
				totalNewCharge = curr.concat(totalNewCharge);
				node.innerHTML = totalNewCharge;
			}
		}
	});
	dojo.query("div.total_info .save").forEach(function(node, index){
		var oldTotal=node.innerHTML;
		if(oldTotal.replace(/(^[\s]+|[\s]+$)/g, '')!='' && node.innerHTML.indexOf('$')!=-1){
			var price = oldTotal.match(/\$\d{1,3}[,.]\d{1,3}/g);
			price[0] = price[0].replace(/\$/g, '');
			price[0] = price[0].replace(/\,/g, '');
			var newItemPrice=HBCLocalizationUtilJS.performConversion(price);
			var newTotal = Math.round(newItemPrice * Math.pow(10, round_method)) / Math.pow(10, round_method);
			newTotal = curr.concat(newTotal);
			newTotal = HBCLocalizationUtilJS.numberWithCommas(newTotal);
			node.innerHTML=newTotal;
		}
	});
	// #928-Font size reduction for higher conversion currencies - fixing misalignment
	$('ul.baglist>li>div').css('width','320px');	
	var reduceFont=false;
	$('ul.baglist>li>div').each(function(){	
		var sale=$(this).children('span.sale').text();
		var price=$(this).children('span.price').text();
		var priceLen="";
		var saleLen="";
		if(!!sale){
		saleLen=$.trim(sale).length;
		}
		if(!!price){
		priceLen=$.trim(price).length;
		}		
		if(saleLen!=null && saleLen!= "" && priceLen!=null && priceLen!= ""){
			var fontLimitLen=saleLen+priceLen;
			if(fontLimitLen>=32){
				reduceFont=true;
			}	
		}
	});
	if(reduceFont){
		$('ul.baglist>li>div').css('font-size','80%');
	}
	
},
/***********************
 * UC-7 International flow
 * Call of Price translation logic for search and wish list page.
 ***********************/
fnTranlateSearchAndWishList:function(){
	dojo.query (".pro_price_black ,.pro_price_red,.sale,.price,.save ,.total").forEach(function(node, index){
		var oldSaveStory=node.innerHTML;
		var newSaveStory=HBCLocalizationUtilJS.convertSaveStory(oldSaveStory);
		node.innerHTML=newSaveStory;
	});
},
/***********************
 * UC-7 International flow
 * Call of Price translation logic for shopping bag page.
 ***********************/
fnTranlateShoppingBag:function(){
	var totalCharge=0;
	var cookieValue=dojo.cookie("INTL");
	var splitValues=cookieValue.split("|");
	var cookieCurr = splitValues[2];
	var curr = cookieCurr + ' ';
	var round_method=splitValues[5]
	dojo.query (".price").forEach(function(node, index){
		if(!$(node).parent().hasClass('item-total') && node.id!="estimateTotalCharges" && node.id!="intlPreshippingOrderTotal"){
			if(node.innerHTML!='' && node.innerHTML.indexOf('$')!=-1){
				var oldSaveStory=node.innerHTML;
				var newSaveStory=HBCLocalizationUtilJS.convertSaveStory(oldSaveStory);
				node.innerHTML=newSaveStory;
			}
		}
		else if($(node).parent().hasClass('item-total')){
			var quant = $(node).parent().parent().find('div.quantity-info select.quantityType option[selected=selected]').val();
			var oldTotal=node.innerHTML;
			if(node.innerHTML!='' && node.innerHTML.indexOf('$')!=-1){
				var price = oldTotal.match(/\$\d{1,3}[,.]\d{1,3}/g);
				price[0] = price[0].replace(/\$/g, '');
				price[0] = price[0].replace(/\,/g, '');
				var oldItemPrice = price[0]/quant;
				var newItemPrice=HBCLocalizationUtilJS.performConversion(oldItemPrice);
				var newTotal = Math.round(newItemPrice * quant * Math.pow(10, round_method)) / Math.pow(10, round_method);
			}else{
				newTotal = parseFloat(oldTotal.replace(/[^0-9\.]/g, ''));
			}
			if($(node).parent().parent().css('display') != 'none'){
				totalCharge += newTotal;
			}
			newTotal = curr.concat(newTotal);
			newTotal = HBCLocalizationUtilJS.numberWithCommas(newTotal);
			node.innerHTML=newTotal;
		}
		else if(node.id=="estimateTotalCharges" || node.id=="intlPreshippingOrderTotal"){
			var totalNewCharge = Math.round(totalCharge * Math.pow(10, round_method)) / Math.pow(10, round_method);
			totalNewCharge = curr.concat(totalNewCharge);
			totalNewCharge = HBCLocalizationUtilJS.numberWithCommas(totalNewCharge);
			node.innerHTML = totalNewCharge;
		}
	});
},
/***********************
 * UC-7 International flow
 * Call of Price translation logic for price range selector.
 ***********************/
fnTranslatePriceRange:function(){
	dojo.query(".div-pricefilter").forEach(function(node, index){
		var oldSaveStory=node.innerHTML;
		var newSaveStory=HBCLocalizationUtilJS.convertSaveStoryPriceRange(oldSaveStory);
		node.innerHTML=newSaveStory;
	});
},
/***********************
 * UC-7 International flow
 * Call of Price translation logic for Coach category  page.
 ***********************/
fnTranlateCoachCategory:function(){
	dojo.query(".sPrice,.sale,.price,.save ,.total").forEach(function(node, index){
		var oldSaveStory=node.innerHTML;
		var newSaveStory=HBCLocalizationUtilJS.convertSaveStoryPriceRange(oldSaveStory);
		node.innerHTML=newSaveStory;
	});
},

/***********************
 * UC-7 International flow
 * Price translation logic.
 ***********************/
convertSaveStory:function(inputSaveStory) {
	//alert(saveStory);
	var saveStory = inputSaveStory.toString();
	var newSaveStory = saveStory;
	if (typeof (saveStory) == "undefined" || saveStory == "") {
		return " ";
	} else if ( !! saveStory) {
		var cookieValue=dojo.cookie("INTL");
		var splitValues=cookieValue.split("|");
		var cookieCurr = splitValues[2];
		var currJson=intlShip.currency;
		var intlShipJson=currJson[cookieCurr];
		var tempCurrencySymbol = saveStory.match(/[A-Z]*[a-z]*\$/g);

		var currencySymbol = "";
		if (tempCurrencySymbol != null && tempCurrencySymbol != "") {
			currencySymbol = tempCurrencySymbol[0];
			if (currencySymbol != cookieCurr && currencySymbol != null ) {
				newSaveStory = HBCLocalizationUtilJS.convertPrice(newSaveStory);
				var curr = cookieCurr + ' ';
				newSaveStory = curr.concat(newSaveStory);
				newSaveStory = HBCLocalizationUtilJS.numberWithCommas(newSaveStory)

			}
			
			
			if(saveStory.indexOf("SALE")!= -1) {
				newSaveStory = newSaveStory + " SALE";
			}
			if(saveStory.indexOf("CLEARANCE")!= -1) {
				newSaveStory = newSaveStory + " CLEARANCE";
			}
		}

		return newSaveStory;
	}

},
/***********************
 * UC-7 International flow
 * Adding commas to price to be shown on front end.
 ***********************/
numberWithCommas:function(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
},

/***********************
 * UC-7 International flow
 * Price translation logic.
 ***********************/
convertPrice:function(newSaveStory) {
	var price = newSaveStory.match(/\$\d{1,3}[,.]\d{1,3}/g);
	if (price !== null) {
		for (i = 0; i < price.length; i++) {
			price[i] = price[i].replace(/\$/g, '');
			price[i] = price[i].replace(/\,/g, '');
			pageNameVar = dojo.byId("intlPageName").value;
			if(pageNameVar == "Product" &&(price[i] == "0.00" || price[i]=="")){
			
			dojo.query("#inventoryCheck a#addtobag").style({ display:"none" }); 
			}
			var convertedPrice = HBCLocalizationUtilJS.performConversion(price[i])
		}
	}

	return convertedPrice;
},
/***********************
 * UC-7 International flow
 * Price translation logic.
 ***********************/
performConversion:function(originalPrice) {
	var cookieValue=dojo.cookie("INTL");
	var splitValues=cookieValue.split("|");
	var curr=splitValues[2];
	var round_method=splitValues[5];
	var lcpMultiplier=splitValues[6];
	var currJson=intlShip.currency;
	var intlShipJson=currJson[curr];
	var convPrice = parseFloat(originalPrice * parseFloat(intlShipJson.ExchangeRate) * parseFloat(lcpMultiplier));
	//convPrice = Math.round(convPrice * Math.pow(10, 2)) / Math.pow(10, 2);
	convPrice = Math.round(convPrice * Math.pow(10, round_method)) / Math.pow(10, round_method);
	convPrice = parseFloat(convPrice).toFixed(2);
	return convPrice;
},
/***********************
 * UC-7 International flow
 * Price translation logic for price filter.
 ***********************/
convertSaveStoryPriceRange:function(saveStory){

	var newSaveStory = saveStory;
	if(typeof(saveStory) == "undefined" || saveStory==""){
		return " ";
	}
	else if (!!saveStory) {
		var cookieValue=dojo.cookie("INTL");
		var splitValues=cookieValue.split("|");
		var cookieCurr = splitValues[2];
		var currJson=intlShip.currency;
		var intlShipJson=currJson[cookieCurr];

		saveStory=$.trim(saveStory);
		var tempCurrencySymbol = saveStory.match(/[A-Z]*[a-z]*\$/g);

		var currencySymbol = "";
		if (tempCurrencySymbol != null && tempCurrencySymbol != "") {
			currencySymbol = tempCurrencySymbol[0];
			if (currencySymbol != cookieCurr && currencySymbol != null && cookieCurr !== "USD") {
				newSaveStory = HBCLocalizationUtilJS.convertPriceRange(newSaveStory);
				if(newSaveStory.indexOf("-")!=-1){
					var splitPrice=newSaveStory.split("-");

					var priceCurr1=HBCLocalizationUtilJS.appendCurrency(splitPrice[0]);
					var priceCurr2=HBCLocalizationUtilJS.appendCurrency(splitPrice[1]);
					priceCurr1=priceCurr1.concat("-");
					newSaveStory=priceCurr1.concat(priceCurr2);
				}
				else{
					newSaveStory=HBCLocalizationUtilJS.appendCurrency(newSaveStory);		
					saveStory=$.trim(saveStory);
					var beginChar=saveStory.match(/[A-Z]*[a-z]*/);				
					if(saveStory.indexOf("+")!=-1){
						newSaveStory=newSaveStory+' ';
						newSaveStory=newSaveStory.concat("+");

					}
					else if(beginChar!=null ||beginChar!=""){
						beginChar=beginChar+' ';
						newSaveStory=beginChar.concat(newSaveStory);
					}

				}


			}
			// When Country selected is other then 'US' but currency selected is 'USD'
			if (currencySymbol != cookieCurr && currencySymbol != null && cookieCurr === "USD" && intlShipJson.ExchangeRate != 1) {
				newSaveStory = HBCLocalizationUtilJS.convertPriceRange(newSaveStory);
			}
		}	

		return newSaveStory;
	}

},
/***********************
 * UC-7 International flow
 * Appending currency code to translated price.
 ***********************/
appendCurrency:function(splitPrice){
	var cookieValue=dojo.cookie("INTL");
	var splitValues=cookieValue.split("|");
	var cookieCurr = splitValues[2];
	var curr=cookieCurr + ' ';
	var priceWithCurr = curr.concat(splitPrice);
	priceWithCurr = HBCLocalizationUtilJS.numberWithCommas(priceWithCurr);
	return priceWithCurr;

},
/***********************
 * UC-7 International flow
 * Price translation logic for price filter.
 ***********************/
convertPriceRange:function(newSaveStory) {
	var tempPrice=newSaveStory;

	if(tempPrice.indexOf("-")!=-1){
		var splitPrice=tempPrice.split("-");

		var convertedPrice1=HBCLocalizationUtilJS.replaceSpecialChar(splitPrice[0]);

		var convertedPrice2=HBCLocalizationUtilJS.replaceSpecialChar(splitPrice[1]);

		convertedPrice1=convertedPrice1.concat("-");
		newSaveStory=convertedPrice1.concat(convertedPrice2);


		return newSaveStory;
	}
	else{
		var convertedPrice=HBCLocalizationUtilJS.replaceSpecialChar(newSaveStory);
		return convertedPrice;
	}
},
/***********************
 * UC-7 International flow
 * replacing special character with empty string for price translation. 
 ***********************/
replaceSpecialChar:function(priceConvert){
	var price = priceConvert.match(/\$\d{1,3}[,.]?\d{1,3}/g);

	if (price !== null) {
		for (i = 0; i < price.length; i++) {
			price[i] = price[i].replace(/\$/g,'');

			price[i] = price[i].replace(/\,/g,'');
			var convertedPrice=HBCLocalizationUtilJS.performConversion(price[i]);
		}
	}
	return convertedPrice;
},

fnInitialize:function(){
	HBCLocalizationUtilJS.fnPopulateExchangeRates();
	HBCLocalizationUtilJS.fnLoadPageName();
	var cookieValue=dojo.cookie("INTL");
	var splitValues=cookieValue.split("|");
	var cookieCountry = splitValues[1];
	if(cookieCountry !== "US"){
		HBCLocalizationUtilJS.fnHidePromo();  
		if(pageNameVar!=null && typeof(pageNameVar)!="undefined" && pageNameVar!= ""){
		switch(pageNameVar){
		//coach n gift card
	
		case 'Product':         HBCLocalizationUtilJS.fnTranlateProduct();
								HBCLocalizationUtilJS.fnShowEligibility();
								break;
	
		case 'Search':          HBCLocalizationUtilJS.fnTranlateSearchAndWishList();
								HBCLocalizationUtilJS.fnTranslatePriceRange();     
								break;
	
		case 'QuickView':       HBCLocalizationUtilJS.fnTranlateProduct();
								HBCLocalizationUtilJS.fnShowEligibility();
								break;
								
		case 'ShoppingBag':     			CheckoutHelperJS.calculatePreshippingOrderTotal();
								HBCLocalizationUtilJS.fnTranlateShoppingBag();
								HBCLocalizationUtilJS.fnShowEligibility();
								HBCLocalizationUtilJS.fnHidePromo(); 								
								UtilitiesJS.modifyPageAfterCheckingIntlCookie();
								break;
	
		case 'WishList':        HBCLocalizationUtilJS.fnTranlateSearchAndWishList();
								HBCLocalizationUtilJS.fnHidePromo();     
								break;
	
		case 'CoachCategory':   HBCLocalizationUtilJS.fnTranlateCoachCategory();
								break;
								
		case 'CoachProduct':    HBCLocalizationUtilJS.fnTranlateProduct();
								HBCLocalizationUtilJS.fnShowEligibility();
								break;	
								
		case 'GiftCard':        HBCLocalizationUtilJS.fnShowEligibility();
								break;	        						
	
		}
		}
	}
	else{
		HBCLocalizationUtilJS.fnShowPromo();  
	}
}
}
/***********************
 * UC-7 International flow
 * Initializing price translation logic on page load.
 ***********************/
dojo.ready(function(){	
	HBCLocalizationUtilJS.fnInitialize();
});

