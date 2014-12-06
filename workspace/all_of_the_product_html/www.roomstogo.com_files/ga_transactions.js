// GOOGLE ANALYTICS
// SITE INTERACTIONS

var oldLocation;  //old change location

// Cross domain
$(function(){

	/*
	$("body").on("click", ".xdomain", function(e){
		e.preventDefault();
		url = this.protocol + "//" + (this.hostname || this.pathname);
		locationurl = window.location.hostname;
		if (url != locationurl)  //_gaq.push(["_link", url]);
	});
	*/

	$("#createAccount").click(function() {
		//_gaq.push(["_trackPageview", "/createAnAccount"]);
		dataLayer.push({
			"event": "virturalPageview",
			"pagePath": "/createAnAccount"
		});
	});

	$("#signIn").click(function() {
		//_gaq.push(["_trackPageview", "/signin"]);
		dataLayer.push({
			"event": "virturalPageview",
			"pagePath": "/signin"
		});

	});

	$("#addToWishLIst").on("click", function(){
		var productSku = $("#addToCartSubmitProductId").val();
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "ProductPageInteraction",
			"eventAction": "AddToWishlist",
			"eventLabel": productSku
		});
	});

	$("input[id^='addToCartSubmit']").click(function(event){
		gaEvent("AddToCart");
	});

	$("input[id^='matchingProducts']").click(function(event){
		gaEvent("MatchingProducts");
		thisform = (this.id); thisform = thisform.substring(0, thisform.length - 6);

		//get cat name
		hrefanchor = "#" + thisform + " .recommendedProductDetail";
		hrefval = $(hrefanchor).attr("href");
		var n=hrefval.indexOf("/product/");   var newstring = hrefval.substring((n + 9));
		n=newstring.indexOf("/"); scCategoryName= newstring.substring(0,(n));

		//get skuid
		Url = hrefval;
		var cartproduct = Url.substring(Url.lastIndexOf("/")+1);
		if(cartproduct == ""){ Url = Url.substring(0, Url.length - 1); cartproduct = Url.substring(Url.lastIndexOf("/")+1); }
		scSkuId = cartproduct;
	});


	$("input[id^='upsellProducts']").click(function(event){
		gaEvent("UpsellProducts");

		thisform = (this.id); thisform = thisform.substring(0, thisform.length - 6);

		//get cat name
		hrefanchor = "#" + thisform + " .recommendedProductDetail";
		hrefval = $(hrefanchor).attr("href");
		var n=hrefval.indexOf("/product/");   var newstring = hrefval.substring((n + 9));
		n=newstring.indexOf("/"); scCategoryName= newstring.substring(0,(n));

		//get skuid
		Url = hrefval;
		var cartproduct = Url.substring(Url.lastIndexOf("/")+1);
		if(cartproduct == ""){ Url = Url.substring(0, Url.length - 1); cartproduct = Url.substring(Url.lastIndexOf("/")+1); }
		scSkuId = cartproduct;
	});


	$(".roomCustomizer legend").click(function(){
		gaEvent("CustomizeRoom");
	});


	$("a[class^='displayItemsLink']").click(function(event){
		var productCount = this.innerHTML;
		//_gaq.push(["_trackEvent", "CatalogPageInteraction", "ProductCount", productCount]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "CatalogPageInteraction",
			"eventAction" :"ProductCount",
			"eventLabel" : productCount
		});
	});


	$("#seeInStoreLink").click(function(){
		var productDescription = $.trim($(this).attr("desc"));
		//_gaq.push(["_trackEvent","ProductPageInteraction","SeeInStore", productDescription]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "ProductPageInteraction",
			"eventAction" :"SeeInStore",
			"eventLabel" : productDescription
		});
	});

	$("#locateProductButton").click(function(){
		var zipCodeEntry = $.trim($("#productLocatorInputBox").val());
		//_gaq.push(["_trackEvent","ProductPageInteraction","EnterZip", zipCodeEntry]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "ProductPageInteraction",
			"eventAction" :"EnterZip",
			"eventLabel" : zipCodeEntry
		});
	});


	$("#googleDirectionLink").click(function(){
		var link = $(this).attr("href");
		//_gaq.push(["_trackEvent","ProductPageInteraction","GetDirections", link]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "ProductPageInteraction",
			"eventAction" :"GetDirections",
			"eventLabel" : link
		});
	});

	$(".productVideo").click(function(){
		var videoIndex = $(this).index();

		dataLayer.push({
			'event': 'gaEvent',
			'eventCategory': 'ProductPageInteraction',
			'eventAction': 'Video',
			'eventLabel': 'Play',
			'eventValue':videoIndex
		});
	});//end productVideo click


});//end dom






// CHANGE LOCATION
$("#changeButtonSubmit").live("click", function() {
	var changeLocationValue = $("#changeLocationValue").val();
	var oldLocation = $(".currentCityState").text();
	$(".currentCityState").attr("title",oldLocation);
	//_gaq.push(["_trackEvent", "changeButtonSubmit", "SubmitLocation", changeLocationValue,0,true]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "changeButtonSubmit",
		"eventAction": "SubmitLocation",
		"eventLabel": changeLocationValue,
		"eventValue": 0,
		"eventNI": true
	});

	naf.omni.changeLocation(oldLocation, changeLocationValue);

});

// ACCOUNT





$("#loginSubmit").live("click", function() {
	//_gaq.push(["_trackEvent", "CartInteraction", "SignIn"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "CartInteraction",
		"eventAction": "SignIn"
	});
});

//PDP

$("#includedInThisRoom").live("click", function() {
	//_gaq.push(["_trackEvent", "ProductPageInteraction", "VisualControl", "IncludedInThisRoom"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "ProductPageInteraction",
		"eventAction": "VisualControl",
		"eventLabel" :"IncludedInThisRoom"
	});
});

$("#selectPhoto").live("click", function() {
	//_gaq.push(["_trackEvent", "ProductPageInteraction", "VisualControl", "SelectPhoto"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "ProductPageInteraction",
		"eventAction": "VisualControl",
		"eventLabel" :"SelectPhoto"
	});
});

$("#roomOverviewTab").live("click", function() {
	//_gaq.push(["_trackEvent", "ProductPageInteraction", "Tab", "Room Overview"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "ProductPageInteraction",
		"eventAction": "Tab",
		"eventLabel" :"Room Overview"
	});
});

$("#pieceDescriptionTab").live("click", function() {
	//_gaq.push(["_trackEvent", "ProductPageInteraction", "Tab", "Piece Descriptions"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "ProductPageInteraction",
		"eventAction": "Tab",
		"eventLabel" :"Piece Descriptions"
	});
});

$("#itemPageDescriptionTab").live("click", function() {
	//_gaq.push(["_trackEvent", "ProductPageInteraction", "Tab", "Description"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "ProductPageInteraction",
		"eventAction": "Tab",
		"eventLabel" :"Description"
	});
});

$("#dimensionsTab").live("click", function() {
	//_gaq.push(["_trackEvent", "ProductPageInteraction", "Tab", "Dimensions"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "ProductPageInteraction",
		"eventAction": "Tab",
		"eventLabel" :"Dimensions"
	});
});

$("#printLink").live("click", function() {
	//_gaq.push(["_trackEvent", "ProductPageInteraction", "Print"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "ProductPageInteraction",
		"eventAction": "Print"
	});
	var Url = "/" + document.URL;
	var theproduct = Url.substring(Url.lastIndexOf("/")+1);
	if (theproduct == "") { Url = Url.substring(0, Url.length - 1); theproduct = Url.substring(Url.lastIndexOf("/")+1); }
	shareContentPrint(theproduct); // site catalyst
});

$("#configuratorDropDown").live("click", function() {
	$productUrl = document.URL;
	var gaUrl = window.location.pathname + "/Configuration";
	//_gaq.push(["_trackPageview", gaUrl]);
	dataLayer.push({
		"event": "virturalPageview",
		"pagePath": gaUrl
	});
});

// configurator close
$("#rcc").live("click", function(event) {
	$productUrl = document.URL;
	var gaUrl = "/" + document.URL;
	//_gaq.push(["_trackPageview", gaUrl]);
	dataLayer.push({
		"event": "virturalPageview",
		"pagePath": gaUrl
	});

});

//
$("#emailAFriend").live("click", function() {
	//_gaq.push(["_trackEvent", "ProductPageInteraction", "SocialShare", "EmailAFriend"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "ProductPageInteraction",
		"eventAction": "SocialShare",
		"eventLabel" :"EmailAFriend"
	});
	var Url = "/" + document.URL;
	var theproduct = Url.substring(Url.lastIndexOf("/")+1);
	if (theproduct == "") { Url = Url.substring(0, Url.length - 1); theproduct = Url.substring(Url.lastIndexOf("/")+1); }

	if($(this).hasClass("isofa")){}else{
		shareContentEmail(theproduct); // site catalyst
	};
});

$("#swapButton").live("click", function() {
	//_gaq.push(["_trackEvent", "ProductPageInteraction", "Swap", "OpenSwap"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "ProductPageInteraction",
		"eventAction": "Swap",
		"eventLabel" :"OpenSwap"
	});
});

$("#swapSelect").live("click", function() {
	//_gaq.push(["_trackEvent", "ProductPageInteraction", "Swap", "SelectSwap"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "ProductPageInteraction",
		"eventAction": "Swap",
		"eventLabel" :"SelectSwap"
	});
});

//swap window close
$("#availableProductsWindow").live("click", function(event) {
	//_gaq.push(["_trackEvent", "ProductPageInteraction", "Swap", "CloseSwap"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "ProductPageInteraction",
		"eventAction": "Swap",
		"eventLabel" :"CloseSwap"
	});
});

$(".deleteRow").live("click", function() {
	//_gaq.push(["_trackEvent", "CartInteraction", "RemoveItem"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "CartInteraction",
		"eventAction": "RemoveItem"
	});
});

$("#miniCartCheckoutButton").live("click", function() {
	//_gaq.push(["_trackPageview", "/ChooseSignIn"]);
	dataLayer.push({
		"event": "virturalPageview",
		"pagePath": "/ChooseSignIn"
	});
});

$("#emailSignUp").live("click", function() {
	//_gaq.push(["_trackPageview", "/EmailSignupForm"]);
	dataLayer.push({
		"event": "virturalPageview",
		"pagePath": "/EmailSignupForm"
	});
});

$("#emailSignUpConfirmation").live("click", function() {
	//_gaq.push(["_trackPageview", "/EmailSignupConfirmation"]);
	dataLayer.push({
		"event": "virturalPageview",
		"pagePath": "/EmailSignupConfirmation"
	});
});



//STORE LOCATOR
$("#storeLocatorByCityStateSubmitLink").live("click", function() {
	//_gaq.push(["_trackEvent", "StoreLocator", "Search"]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "StoreLocator",
		"eventAction": "Search"
	});
});


$(".paginationWrap a").live("click", function() {
	var paginationLabel = this.innerHTML;
	if (paginationLabel == " &lt; ") paginationLabel = "<";
	if (paginationLabel == " &gt; ") paginationLabel = ">";
	//_gaq.push(["_trackEvent", "CatalogPageInteraction", "Paging", paginationLabel]);
	dataLayer.push({
		"event": "gaEvent",
		"eventCategory": "CatalogPageInteraction",
		"eventAction": "Paging",
		"eventLabel": paginationLabel
	});
});



function gaEvent(event){
	switch(event){
	case "ClickOnMiniCartLink":
		//_gaq.push(["_trackPageview", "/viewCart"]);
		dataLayer.push({
			"event": "virturalPageview",
			"pagePath": "/viewCart"
		});
	break;
	case "ClickAndCloseMiniCart":
		var gaUrl = "/" + document.URL;
		//_gaq.push(["_trackPageview", gaUrl]);
		dataLayer.push({
			"event": "virturalPageview",
			"pagePath": gaUrl
		});
	break;
	case "MatchingProducts":
		//_gaq.push(["_trackEvent", "ProductPageInteraction", "AddToCart", "MatchingItem"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "ProductPageInteraction",
			"eventAction": "AddToCart",
			"eventLabel": "MatchingItem"
		});
	break;
	case "UpsellProducts":
		//_gaq.push(["_trackEvent", "ProductPageInteraction", "AddToCart", "CoordinatingItem"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "ProductPageInteraction",
			"eventAction": "AddToCart",
			"eventLabel": "CoordinatingItem"
		});
	break;
	case "AddToCart":
		//_gaq.push(["_trackEvent", "ProductPageInteraction", "AddToCart", "MainItem"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "ProductPageInteraction",
			"eventAction": "AddToCart",
			"eventLabel": "MainItem"
		});
	break;
	case "CustomizeRoom":
		//_gaq.push(["_trackEvent", "ProductPageInteraction", "CustomizeThisRoom"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "ProductPageInteraction",
			"eventAction": "CustomizeThisRoom",
		});
	break;
	case "FirstCheckoutStep":
		//_gaq.push(["_trackPageview", "/Checkout2"]);
		dataLayer.push({
			"event": "virturalPageview",
			"pagePath": "/Checkout2"
		});
	break;
	case "DeliveryStepContinueButton":
		//_gaq.push(["_trackPageview", "/Checkout3"]);
		dataLayer.push({
			"event": "virturalPageview",
			"pagePath": "/Checkout3"
		});
	break;
	case "ShippingAddressLink":
		//_gaq.push(["_trackPageview", "/checkout/index.jsp"]);
		dataLayer.push({
			"event": "virturalPageview",
			"pagePath": "/checkout/index.jsp"
		});
	break;
	case "ConfirmAddress":
		//_gaq.push(["_trackEvent", "CartInteraction", "ConfirmAddress"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "CartInteraction",
			"eventAction": "ConfirmAddress",
		});
	break;
	case "AcceptSuggestion":
		//_gaq.push(["_trackEvent", "CartInteraction", "AcceptSuggestion"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "CartInteraction",
			"eventAction": "AcceptSuggestion",
		});
	break;
	case "SuggestionWindowClosed":
		//_gaq.push(["_trackEvent", "CartInteraction", "CloseAddressWindow"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "CartInteraction",
			"eventAction": "CloseAddressWindow",
		});
	break;
	case "DeliveryScheduleLink":
		//_gaq.push(["_trackPageview", "/Checkout2"]);
		dataLayer.push({
			"event": "virturalPageview",
			"pagePath": "/Checkout2"
		});
	break;
	case "DeliveryInfoSubmit":
		//_gaq.push(["_trackPageview", "/Checkout4"]);
		dataLayer.push({
			"event": "virturalPageview",
			"pagePath": "/Checkout4"
		});
	break;
	case "CreditCardTab":
		//_gaq.push(["_trackEvent", "CartInteraction", "ClickCreditCardTab"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "CartInteraction",
			"eventAction": "ClickCreditCardTab",
		});
	break;
	case "RTGFinanceTab":
		//_gaq.push(["_trackEvent", "CartInteraction", "ClickRTGFinanceTab"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "CartInteraction",
			"eventAction": "ClickRTGFinanceTab",
		});
	break;
	case "GiftCertificateSubmit":
		//_gaq.push(["_trackEvent", "CartInteraction", "AddGiftCard"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "CartInteraction",
			"eventAction": "AddGiftCard",
		});
	break;
	case "BillingInfoSubmit":
		//_gaq.push(["_trackPageview", "/Checkout5"]);
		dataLayer.push({
			"event": "virturalPageview",
			"pagePath": "/Checkout5"
		});
	break;
	case "ChangeLocation":
		//_gaq.push(["_trackEvent", "ChangeLocation", "InitialClick","",0,true]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "ChangeLocation",
			"eventAction": "InitialClick",
			"eventLabel": "",
			"eventValue": 0,
			"eventNI": true,
		});
	break;
	case "ZoomOut":
		//_gaq.push(["_trackEvent", "ProductPageInteraction", "VisualControl", "ZoomOut"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "ProductPageInteraction",
			"eventAction": "VisualControl",
			"eventLabel": "ZoomOut",
		});
	break;
	case "ZoomIn":
		//_gaq.push(["_trackEvent", "ProductPageInteraction", "VisualControl", "ZoomIn"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "ProductPageInteraction",
			"eventAction": "VisualControl",
			"eventLabel": "ZoomIn",
		});
	break;
	case "LoginSuccess":
		//_gaq.push(["_trackEvent", "CartInteraction", "SignIn"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "CartInteraction",
			"eventAction": "SignIn",
		});
	break;
	case "ForgotPassword":
		//_gaq.push(["_trackEvent", "CartInteraction", "ForgotPassword"]);
		dataLayer.push({
			"event": "gaEvent",
			"eventCategory": "CartInteraction",
			"eventAction": "ForgotPassword",
		});
	break;
	case "CreateAccountModal":
		//_gaq.push(["_trackPageview", "/createAnAccount"]);
		dataLayer.push({
			"event": "virturalPageview",
			"pagePath": "/createAnAccount"
		});

	break;
	default:
		//alert("error");
		}
	//alert(event);
}




