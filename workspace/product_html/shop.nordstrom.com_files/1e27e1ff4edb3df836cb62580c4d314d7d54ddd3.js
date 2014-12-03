var CmBlockCoremetricsTags = true, CmBlockPageViewTags = true;

function cmCreatePageviewTag(pageID, searchString, categoryID, numSearchResults, template, attributes, respondentID) {
    if (CmBlockCoremetricsTags || CmBlockPageViewTags) {
		return;
	}

	if (pageID == null) {
		pageID = cmGetDefaultPageID();
	}
	if (/mstage1.shop/.test(window.location.hostname) || /mstage1.secure/.test(window.location.hostname) || /m.shop/.test(window.location.hostname) || /m.secure/.test(window.location.hostname)) pageID += ' - MOW';
 
	if (attributes) {
		var cm_exAttr = new Array;
		cm_exAttr = attributes.split("-_-");
	}
	cmMakeTag(["tid", "1", "pi", pageID, "cg", categoryID, "se", searchString, "sr", numSearchResults, "pv1", respondentID, "li", "3", "ps1", pageID, "ps2", template, "cm_exAttr", cm_exAttr]);
}

function cmCreateElementTag(elementID, categoryID, attributes) {
	if (CmBlockCoremetricsTags) {
		return;
	}
	if (/mstage1.shop/.test(window.location.hostname) || /mstage1.secure/.test(window.location.hostname) || /m.shop/.test(window.location.hostname) || /m.secure/.test(window.location.hostname)) elementID += ' - MOW';
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","15","eid",elementID,"ecat",categoryID,"cmAttributes",cm_exAttr]);
}

function cmCreateProductviewTag(productID, productName, categoryID, pageID, outfitID, PickupInStore, attributes) {
	if (CmBlockCoremetricsTags) {
		return;
	}
	if (/mstage1.shop/.test(window.location.hostname) || /mstage1.secure/.test(window.location.hostname) || /m.shop/.test(window.location.hostname) || /m.secure/.test(window.location.hostname)) productName += ' - MOW';
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	if (outfitID || pageID || PickupInStore){
		cmMakeTag(["tid","5","pi",pageID,"pr",productID,"pm",productName,"cg",categoryID,"pc","N","li","4","ps1",productID,"ps2",productName,"ps3",categoryID,"ps4",pageID,"ps5",outfitID,"ps6",PickupInStore,"cm_vc",cmExtractParameter("cm_vc",document.location.href),"cm_exAttr",cm_exAttr]);
	} else {
		cmMakeTag(["tid","5","pi",pageID,"pr",productID,"pm",productName,"cg",categoryID,"pc","N","cm_vc",cmExtractParameter("cm_vc",document.location.href),"cm_exAttr",cm_exAttr]);
	}
}
function cmCreateShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID, outfitID, giftServices, SavedForLater, PickupInStore, storeID, SavedForLaterDt,attributes) {
	if (CmBlockCoremetricsTags) {
		return;
	}
	var pattern = /[^\-0-9\.]/gi;
	productPrice = productPrice.toString().replace(pattern, "");
	var cm_slotNum;
	if (attributes){
		__ex=attributes.split("-_-");  
	} else {
	__ex=new Array();
	}
	productID = productID.toUpperCase();
	if (/mstage1.shop/.test(window.location.hostname) || /mstage1.secure/.test(window.location.hostname) || /m.shop/.test(window.location.hostname) || /m.secure/.test(window.location.hostname)) productName += ' - MOW';

	if (outfitID || giftServices || SavedForLater || PickupInStore || storeID || SavedForLaterDt)	{	
	cmMakeTag(["tid","7","li","40","ps1","5","ps2",productID,"ps3",productQuantity,"ps4",productPrice,"ps5",categoryID,"ps6",outfitID,"ps7",giftServices,"ps8",SavedForLater,"ps9",PickupInStore,"ps10",storeID,"ps11",SavedForLaterDt]);
	}
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"ha1",attributes ? cm_hex_sha1(attributes) : null,"at","5","tid","4","pc","N","sx1",outfitID,"cmAttributes",attributes]);
	cmDisplayShop5s();
}
function cmCreateShopAction9Tag(productID, productName, productQuantity, productPrice, customerID, orderID, orderTotal, categoryID, outfitID, giftServices, SavedForLater, PickupInStore, storeID, SavedForLaterDt, attributes) {

	if (CmBlockCoremetricsTags) {
		return;
	}
	var cm_slotNum;
	var pattern = /[^\-0-9\.]/gi;
	var pattern1 = /^\s+|\s+$/gi;
	productPrice = productPrice.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	productID = productID.toString().replace(pattern1, "");	 
	productID = productID.toUpperCase();
	if (/mstage1.shop/.test(window.location.hostname) || /mstage1.secure/.test(window.location.hostname) || /m.shop/.test(window.location.hostname) || /m.secure/.test(window.location.hostname)) productName += ' - MOW';

	if (attributes){
		__ex=attributes.split("-_-");	productID = productID.toUpperCase();
	} else {
	__ex=new Array();
	}

	if (outfitID || giftServices || SavedForLater || PickupInStore || storeID || SavedForLaterDt)	{	
		 cmMakeTag(["tid","7","li","50","ps1","9","ps2",productID,"ps3",productQuantity,"ps4",productPrice,"ps5",categoryID,"ps6",outfitID,"ps7",giftServices,"ps8",SavedForLater,"ps9",PickupInStore,"ps10",storeID,"ps11",SavedForLaterDt,"ps12",orderID]);
	} 
	cmAddShop(["pr",productID,"pm",productName,"qt",productQuantity,"bp",productPrice,"cg",categoryID,"ha1",attributes ? cm_hex_sha1(attributes) : null,"cd",customerID,"on",orderID,"tr",orderTotal,"at","9","tid","4","pc","N","sx1",outfitID,"cmAttributes",attributes]);
	cmCalcSKUString();
}
function cmCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, newsletterName, subscribe, attributes) {
	if (CmBlockCoremetricsTags) {
		return;
	}
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","2","cd",customerID,"em",customerEmail,"ct",customerCity,"sa",customerState,"zp",customerZIP,"nl",newsletterName,"sd",subscribe,"cm_exAttr",cm_exAttr]);
}

function cmCreateConversionEventTag(eventID,actionType,categoryID,eventPoints,Attributes,ExtraField){
	if (CmBlockCoremetricsTags) {
		return;
	}
	cmMakeTag(["tid","14","cid",((/mstage1.shop/.test(window.location.hostname) || /mstage1.secure/.test(window.location.hostname) || /m.shop/.test(window.location.hostname) || /m.secure/.test(window.location.hostname)) ? eventID + ' - MOW' : eventID),"cat",actionType,"ccid",categoryID,"cpt",eventPoints,"cmAttributes",Attributes,"cmExtraFields",ExtraField]);
} 

function cmSearchResultFollowed(searchString, productID) {
	if (CmBlockCoremetricsTags) {
		return;
	}
	cmMakeTag(["tid","7","li","1","ps1",searchString,"ps2",productID]);
}

function cmRelatedItemInfo(productID, categoryID, refProductID, refCategoryID) {
	if (CmBlockCoremetricsTags) {
		return;
	}
	cmMakeTag(["tid","7","li","2","ps1",productID,"ps2",categoryID,"ps3",refProductID,"ps4",refCategoryID]);
}

function cmLIVEviewClick(href, name, pageID) {
	if (CmBlockCoremetricsTags) {
		return;
	}
	cmCreateManualLinkClickTag(href,name,pageID)
}

function cmCreateManualLinkClickTag(href, name, pageID) {
	if (CmBlockCoremetricsTags) {
		return;
	}
	if (cM != null) {
		var d = new Date();
		cGK = d.getTime();
		href = myNormalizeURL(href, true);
		cM(cm_ClientTS, cGK, name, href, false, pageID);
	}
}


// Added to differentiate Coremetrics and Bright tag call
function btCreatePageviewTag(pageID, searchString, categoryID, numSearchResults, template, attributes, respondentID) {
	if (pageID == null) { pageID = cmGetDefaultPageID(); }
	if (/mstage1.shop/.test(window.location.hostname) || /mstage1.secure/.test(window.location.hostname) || /m.shop/.test(window.location.hostname) || /m.secure/.test(window.location.hostname)) pageID += ' - MOW';
	if (attributes) {
		var cm_exAttr = new Array;
		cm_exAttr = attributes.split("-_-");
	}
	cmMakeTag(["tid", "1", "pi", pageID, "cg", categoryID, "se", searchString, "sr", numSearchResults, "pv1", respondentID, "li", "3", "ps1", pageID, "ps2", template, "cm_exAttr", cm_exAttr]);
}

function btCreateElementTag(elementID, categoryID, attributes) {
	if (/mstage1.shop/.test(window.location.hostname) || /mstage1.secure/.test(window.location.hostname) || /m.shop/.test(window.location.hostname) || /m.secure/.test(window.location.hostname)) elementID += ' - MOW';
	if (attributes){
		var cm_exAttr=new Array;
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","15","eid",elementID,"ecat",categoryID,"cmAttributes",cm_exAttr]);
}

function btCreateProductviewTag(productID, productName, categoryID, pageID, outfitID, PickupInStore, attributes) {
	if (/mstage1.shop/.test(window.location.hostname) || /mstage1.secure/.test(window.location.hostname) || /m.shop/.test(window.location.hostname) || /m.secure/.test(window.location.hostname)) productName += ' - MOW';
	if (attributes) {
		var cm_exAttr = new Array;
		cm_exAttr = attributes.split("-_-");
	}
	if (outfitID || pageID || PickupInStore) {
		cmMakeTag(["tid", "5", "pi", pageID, "pr", productID, "pm", productName, "cg", categoryID, "pc", "N", "li", "4", "ps1", productID, "ps2", productName, "ps3", categoryID, "ps4", pageID, "ps5", outfitID, "ps6", PickupInStore, "cm_vc", cmExtractParameter("cm_vc", document.location.href), "cm_exAttr", cm_exAttr]);
	} else {
		cmMakeTag(["tid", "5", "pi", pageID, "pr", productID, "pm", productName, "cg", categoryID, "pc", "N", "cm_vc", cmExtractParameter("cm_vc", document.location.href), "cm_exAttr", cm_exAttr]);
	}
}
function btCreateShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID, outfitID, giftServices, SavedForLater, PickupInStore, storeID, SavedForLaterDt, attributes) {
	var pattern = /[^\-0-9\.]/gi;
	productPrice = productPrice.toString().replace(pattern, "");
	var cm_slotNum;
	if (attributes) {
		__ex = attributes.split("-_-");
	} else {
		__ex = new Array();
	}
	//productID = productID.toUpperCase();
	if (/mstage1.shop/.test(window.location.hostname) || /mstage1.secure/.test(window.location.hostname) || /m.shop/.test(window.location.hostname) || /m.secure/.test(window.location.hostname)) productName += ' - MOW';

	if (outfitID || giftServices || SavedForLater || PickupInStore || storeID || SavedForLaterDt) {
		cmMakeTag(["tid", "7", "li", "40", "ps1", "5", "ps2", productID, "ps3", productQuantity, "ps4", productPrice, "ps5", categoryID, "ps6", outfitID, "ps7", giftServices, "ps8", SavedForLater, "ps9", PickupInStore, "ps10", storeID, "ps11", SavedForLaterDt]);
	}
	cmAddShop(["pr", productID, "pm", productName, "qt", productQuantity, "bp", productPrice, "cg", categoryID, "ha1", attributes ? cm_hex_sha1(attributes) : null, "at", "5", "tid", "4", "pc", "N", "sx1", outfitID, "cmAttributes", attributes]);
	cmDisplayShop5s();
}
function btCreateShopAction9Tag(productID, productName, productQuantity, productPrice, customerID, orderID, orderTotal, categoryID, outfitID, giftServices, SavedForLater, PickupInStore, storeID, SavedForLaterDt, attributes) {

	var cm_slotNum;
	var pattern = /[^\-0-9\.]/gi;
	var pattern1 = /^\s+|\s+$/gi;
	productPrice = productPrice.toString().replace(pattern, "");
	orderTotal = orderTotal.toString().replace(pattern, "");
	productID = productID.toString().replace(pattern1, "");
	productID = productID.toUpperCase();
	if (/mstage1.shop/.test(window.location.hostname) || /mstage1.secure/.test(window.location.hostname) || /m.shop/.test(window.location.hostname) || /m.secure/.test(window.location.hostname)) productName += ' - MOW';

	if (attributes) {
		__ex = attributes.split("-_-"); productID = productID.toUpperCase();
	} else {
		__ex = new Array();
	}

	if (outfitID || giftServices || SavedForLater || PickupInStore || storeID || SavedForLaterDt) {
		cmMakeTag(["tid", "7", "li", "50", "ps1", "9", "ps2", productID, "ps3", productQuantity, "ps4", productPrice, "ps5", categoryID, "ps6", outfitID, "ps7", giftServices, "ps8", SavedForLater, "ps9", PickupInStore, "ps10", storeID, "ps11", SavedForLaterDt, "ps12", orderID]);
	}
	cmAddShop(["pr", productID, "pm", productName, "qt", productQuantity, "bp", productPrice, "cg", categoryID, "ha1", attributes ? cm_hex_sha1(attributes) : null, "cd", customerID, "on", orderID, "tr", orderTotal, "at", "9", "tid", "4", "pc", "N", "sx1", outfitID, "cmAttributes", attributes]);
	cmCalcSKUString();
}
function btCreateRegistrationTag(customerID, customerEmail, customerCity, customerState, customerZIP, newsletterName, subscribe, attributes) {
	if (attributes) {
		var cm_exAttr = new Array;
		cm_exAttr = attributes.split("-_-");
	}
	cmMakeTag(["tid", "2", "cd", customerID, "em", customerEmail, "ct", customerCity, "sa", customerState, "zp", customerZIP, "nl", newsletterName, "sd", subscribe, "cm_exAttr", cm_exAttr]);
}

function btCreateConversionEventTag(eventID,actionType,categoryID,eventPoints,Attributes,ExtraField){
	cmMakeTag(["tid","14","cid",((/mstage1.shop/.test(window.location.hostname) || /mstage1.secure/.test(window.location.hostname) || /m.shop/.test(window.location.hostname) || /m.secure/.test(window.location.hostname)) ? eventID + ' - MOW' : eventID),"cat",actionType,"ccid",categoryID,"cpt",eventPoints,"cmAttributes",Attributes,"cmExtraFields",ExtraField]);
} 

function btCreateOrderTag(f,a,e,b,d,h,i,c,g) {
	if ((typeof(cm_currencyCode)=="undefined")||(!cm_currencyCode)) {
		cm_currencyCode=""
	}
	if (e) {
		e=e.toString().replace(cmPricePattern,"")
	}
	a=a.toString().replace(cmPricePattern,"");
	cmMakeTag(["tid","3","on",f,"tr",a,"sg",e,"cd",b,"ct",d,"sa",h,"zp",i,"cc",cm_currencyCode,"cmAttributes",c,"cmExtraFields",g])
}

function btSearchResultFollowed(searchString, productID) {
	cmMakeTag(["tid", "7", "li", "1", "ps1", searchString, "ps2", productID]);
}

function btRelatedItemInfo(productID, categoryID, refProductID, refCategoryID) {
	cmMakeTag(["tid", "7", "li", "2", "ps1", productID, "ps2", categoryID, "ps3", refProductID, "ps4", refCategoryID]);
}

function btLIVEviewClick(href, name, pageID) {
	cmCreateManualLinkClickTag(href, name, pageID)
}

function btCreateManualLinkClickTag(href, name, pageID) {
	if (cM != null) {
		var d = new Date();
		cGK = d.getTime();
		href = myNormalizeURL(href, true);
		cM(cm_ClientTS, cGK, name, href, false, pageID);
	}
}


if (defaultNormalize == null) { var defaultNormalize = null; }

/* This normalization function takes a list of parameters and parses out
   all url parameters that ARE in that list.  This only handles the simple case of 
   basic url parameters in the query string.  */
function myNormalizeURL(url, isHref) {
	if (url === null || url === undefined || url === '') return false;
	var newURL = url;
	if (isHref) {
		if (newURL.toUpperCase().indexOf("TRANSLATE.GOOGLEUSERCONTENT.COM")>-1){
			return "TRANSLATE.GOOGLE.COM";
		}
		//Javascript code
		if (newURL.toLowerCase().indexOf("GuidedNavigationSetQuery")!=-1){
			newURL="javascript:GuidedNavigationSetQuery();";
		} else {
			//whitelist code
			if (newURL.toUpperCase().indexOf("SIGNIN.ASPX")>-1){
				// map pages whitelist
					var whiteList = ["origin="];
					var paramString;
					var paramIndex = newURL.indexOf("?");
					var startArgindex=newURL.toUpperCase().indexOf("ORIGIN=");
					var endArgindex1=newURL.toUpperCase().indexOf("?",startArgindex+1);
					var endArgindex2=newURL.toUpperCase().indexOf("&",startArgindex+1);
					var NewParam="";
					if (endArgindex1>-1 && endArgindex2>-1 && endArgindex1<endArgindex2 && startArgindex>-1){
						//second question mark comes before ampersand
						NewParam=newURL.substring(startArgindex,endArgindex1);
					} else if (endArgindex2==-1 && endArgindex1>-1 && startArgindex>-1){
						//second ampersand does not exist, second question mark does
						NewParam=newURL.substring(startArgindex,endArgindex1);
					} else if (endArgindex2>-1 && endArgindex1==-1 && startArgindex>-1){
						//second ampersand  exists, second question mark does
						NewParam=newURL.substring(startArgindex,endArgindex2);
					} else if (endArgindex1==-1 && endArgindex2==-1 && startArgindex>-1){
						//no second question mark or ampersand
						NewParam=newURL.substring(startArgindex);
					}
					if (NewParam!=""){
						newURL=newURL.substring(0,startArgindex-1)+"?"+NewParam;	
					}
			}
			var mapflag = newURL.indexOf("/MapPoint/");
			var catflag = newURL.indexOf("/catalogonline/");
			if ((mapflag != -1) || (catflag != -1)){
				// map pages whitelist
				if (mapflag != -1){
					var whiteList = ["bizid="];
					var paramString;
					var paramIndex = newURL.indexOf("?");
					var params;
					var keepParams = new Array();
					
					if (paramIndex > 0) {
					paramString = newURL.substring(paramIndex+1);
					newURL = newURL.substring(0, paramIndex);
					params = paramString.split("&");
					for(var i=0; i<params.length; i++) {
						for(var j=0; j<whiteList.length; j++) {
							if (params[i].indexOf(whiteList[j]) == 0) {
								keepParams[keepParams.length] = params[i];
							}
						}
					}
				
					newURL += "?" + keepParams.join("&");
				
					}
				} else { // catalog pages whitelist
					var whiteList = ["ver=", "p="];
					var paramString;
					var paramIndex = newURL.indexOf("?");
					var params;
					var keepParams = new Array();
					
					if (paramIndex > 0) {
					paramString = newURL.substring(paramIndex+1);
					newURL = newURL.substring(0, paramIndex);
					params = paramString.split("&");
					for(var i=0; i<params.length; i++) {
						for(var j=0; j<whiteList.length; j++) {
							if (params[i].indexOf(whiteList[j]) == 0) {
								keepParams[keepParams.length] = params[i];
							}
						}
					}
				
					newURL += "?" + keepParams.join("&");
				
					}
				}
			} else {
			//blacklist code
				var paramString;
				var paramIndex = newURL.indexOf("?");
				var styleFlag = newURL.indexOf("styleid=");
				var searchFlag=document.URL.indexOf("/SR?");
				var blackList = ["AddressID=", "URL=", "basketitemid=", "promocode=", "startNum=", "styleNum=", "shopper=", "ordernum=", "PrevStyleID=", "NextStyleID=", "boutique=", "refsid=", "refcat=", "slotid=", "SourceID=", "sourcecode=", "offercode=", "SearchType=", "Search=", "CatID=", "q=", "sort=", "bd=", "sa=", "hn=", "kf=", "brand=", "size=", "width=", "color=", "pricelow=", "pricehigh=", "catname=", "mediumthumbnail=", "cattext=", "PriceRange=", "sizename=", "widthname=", "brandlabelid=", "findertype=", "findertypename=", "pricerangename=", "sizename=", "widthname=", "brandlabelid=", "findertype=", "findertypename=", "pricerangename=", "origquery=", "CatID2=", "CatID3=", "catname1=", "catname2=", "catname3=", "navstate=", "gn=", "initsearch=", "ProductFinder=", "pfindid=", "category=","keyword=","returnurl=","previousurl=","hl=","sl=","tl=","u=","rulr=","usg="];
				if (styleFlag != -1) {
					blackList[blackList.length]="category="
				}
				if (searchFlag!=-1){
					blackList[blackList.length]="origin="
					blackList[blackList.length]="searchorigin="
					blackList[blackList.length]="keyword="
					blackList[blackList.length]="giftfinder="
					blackList[blackList.length]="mode="
				}
				var params;
				var keepParams = new Array();
				var goodParam;
				var newURL;
			
				if (paramIndex > 0) {
				paramString = newURL.substring(paramIndex+1);
				newURL = newURL.substring(0, paramIndex);
				params = paramString.split("&");
			
				for(var i=0; i<params.length; i++) {
					goodParam = true;
					for(var j=0; j<blackList.length; j++) {
						if (params[i].toLowerCase().indexOf(blackList[j].toLowerCase()) == 0) {
							goodParam = false;
						}
					}
					if(goodParam == true) {
						keepParams[keepParams.length] = params[i];
					}
				}
				
				newURL += "?" + keepParams.join("&");
			
				}
			}

			if (newURL.toLowerCase().indexOf("store.nordstrom.com")==-1){
				newURL = newURL.split('http://shop.nordstrom.com').join('');
				newURL = newURL.split('https://shop.nordstrom.com').join('');
			} else {
				newURL = newURL.split('http://store.nordstrom.com').join('');
				newURL = newURL.split('https://store.nordstrom.com').join('');
			}

		 
			if (defaultNormalize != null) {
				newURL = defaultNormalize(newURL, isHref);
			}
		}
	}	
	return newURL;
}

// install normalization
if (document.cmTagCtl != null) {
	var func = "" + document.cmTagCtl.normalizeURL;
	if (func.indexOf('myNormalizeURL') == -1) {
		defaultNormalize = document.cmTagCtl.normalizeURL;
		document.cmTagCtl.normalizeURL = myNormalizeURL;
	}
}

function cmCreateOrderTag() { return false; }

function cmCreateConversionEventTag() { return false; }

function cmCreateElementTag(b,a,c) { 
	if (window.location.pathname !== '/livechat.aspx') return false;
	else cmMakeTag(["tid","15","eid",b,"ecat",a,"cmAttributes",c]);
}