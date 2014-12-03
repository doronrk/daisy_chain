
var omniturePageName = "", omnitureServer = "", omnitureChannel = "", omniturePageType = "";
var omnitureProp1 = "", omnitureProp2 = "", omnitureProp3 = "", omnitureProp4 = "", omnitureProp5 = "";
var omnitureProp6 = "", omnitureProp14 = "", omnitureProp15 = "", omnitureProp16 = "";
var omnitureProp17 = "", omnitureProp18 = "";
var omnitureCampaign = "", omnitureState = "", omnitureZip = "";
var omnitureEvents = "", omnitureProducts = "", omniturePurchaseID = "";
var omnitureEVar1 = "", omnitureEVar2 = "", omnitureEVar3 = "", omnitureEVar4 = "", omnitureEVar5 = "";
var omnitureEVar6 = "", omnitureEVar7 = "", omnitureEVar8 = "", omnitureEVar9 = "", omnitureEVar10 = "";
var omnitureEVar21 = "";
function omnitureItemsAddedToCart(originalCartItemsCount, styleNumbers) {
	var s = s_gi(s_account), evnts = "scAdd";
	if (originalCartItemsCount < 1) evnts += ",scOpen";
	s.linkTrackVars = "prop1,prop2,prop3,prop4,prop5,prop6,prop14,events,products";
	s.linkTrackEvents = evnts;
	s.prop1 = omnitureProp1;
	s.prop2 = omnitureProp2;
	s.prop3 = omnitureProp3;
	s.prop4 = omnitureProp4;
	s.prop5 = omnitureProp5;
	s.prop6 = omnitureProp6;
	s.prop14 = omnitureProp14;
	s.products = styleNumbers;
	s.events = evnts;
	s.tl(true, 'o', 'Add To Bag');
}
function omnitureFacebookLikeClicked(styleNumber) {
	var s = s_gi(s_account), evnts = "event7";
	s.linkTrackVars = "products,events,eVar20";
	s.linkTrackEvents = evnts;
	s.products = ";" + styleNumber;
	s.events = evnts;
	s.eVar20 = "Facebook Like";
	s.tl(true, 'o', 'Facebook Like Clicked');
}
function omnitureChatClicked() {
	var s = s_gi(s_account), evnts = "event6";
	s.linkTrackVars = "prop1,events";
	s.linkTrackEvents = evnts;
	s.prop1 = "Chat";
	s.events = evnts;
	s.tl(true, 'o', 'Chat Clicked');
}
function omnitureSocialShareClicked(shareDescription, styleNumber) {
	var s = s_gi(s_account), evnts = "event7";
	s.linkTrackVars = "products,events,eVar20";
	s.linkTrackEvents = evnts;
	s.products = ";" + styleNumber;
	s.events = evnts;
	s.eVar20 = shareDescription;
	s.tl(true, 'o', shareDescription + ' Clicked');
}
function omnitureQuickShopClick(clickType, styleNumber) {
	var s = s_gi(s_account), evnts = "";
	switch (clickType) {
		case "Primary": evnts = "event10"; break;
		case "Full Details": evnts = "event11"; break;
		case "Return to Category": evnts = "event12"; break;
		case "Add to Bag": evnts = "event13"; break;
		case "Reviews": evnts = "event14"; break;
		case "Size Chart": evnts = "event15"; break;
		case "Continue Shopping": evnts = "event17"; break;
	}
	if (evnts != "") {
		s.linkTrackVars = "prop1,prop2,prop4,prop5,prop6,prop14,products,events"; s.linkTrackEvents = evnts;
		s.prop1 = omnitureProp1; s.prop2 = omnitureProp2; s.prop4 = omnitureProp4; s.prop5 = omnitureProp5; s.prop6 = omnitureProp6;
		s.prop14 = omnitureProp14; s.products = ";" + styleNumber; s.events = evnts; s.tl(true, 'o', 'Quick Shop: ' + clickType + ' Clicked');
	}
}
