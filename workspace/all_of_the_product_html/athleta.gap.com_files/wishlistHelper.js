var WishlistHelperSegmenter=Class.create();WishlistHelperSegmenter.prototype={initialize:function(e,t,n,r,i,s,o){this.EvarToUse=s!=""?s:false;this.CookieVariableName=e;this.CookieUsed=t;this.CookieValueBase=n;this.SegBreakdown=i.split("-");this.DoesTheCookieExist=gidLib.getCookieVar(this.CookieUsed,this.CookieVariableName);this.RetrievedCookieValue=gidLib.getCookieVar(this.CookieUsed,this.CookieVariableName);this.QuickSegment="";this.piperlimeException=o;this.userNeedsSync=false;this.ForcedModeBase=r;this.ModeArrayIndex=this.SegBreakdown.length;this.modeArray=new Array;this.modeArray[0]="a";this.modeArray[1]="b";this.modeArray[2]="c";this.modeArray[3]="d";this.modeArray[4]="e";this.modeArray[5]="f";this.modeArray[6]="g";if(location.href.indexOf(this.ForcedModeBase)>=1){this.forcedMode()}else{this.cookieScanner()}},forcedMode:function(){for(i=0;i<this.ModeArrayIndex;i++){if(location.href.indexOf(this.ForcedModeBase+"="+this.modeArray[i])>=1){this.UserSegment=this.CookieValueBase+this.modeArray[i].toUpperCase();this.QuickSegment=this.modeArray[i].toUpperCase()}}gidLib.setCookieVar(this.CookieUsed,this.CookieVariableName,this.UserSegment);if(this.EvarToUse){this.setABTestVariable(this.UserSegment)}userNeedsSync=true},cookieScanner:function(){if(this.DoesTheCookieExist){if(this.EvarToUse){this.setABTestVariable(this.RetrievedCookieValue)}for(i=0;i<this.ModeArrayIndex;i++){if(this.RetrievedCookieValue==this.CookieValueBase+this.modeArray[i].toUpperCase()){this.QuickSegment=this.modeArray[i].toUpperCase();this.UserSegment=this.CookieValueBase+this.modeArray[i].toUpperCase();break}}}else{this.tagManager()}},tagManager:function(){this.Segmentation=Math.floor(Math.random()*100+1);this.FloorThreshold=0;this.TopThreshold=0;for(i=0;i<this.ModeArrayIndex;i++){this.TopThreshold=this.FloorThreshold+parseInt(this.SegBreakdown[i]);if(this.Segmentation>this.FloorThreshold&&this.Segmentation<=this.TopThreshold){this.UserSegment=this.CookieValueBase+this.modeArray[i].toUpperCase();this.QuickSegment=this.modeArray[i].toUpperCase();break}else{this.FloorThreshold=this.TopThreshold}}gidLib.setCookieVar(this.CookieUsed,this.CookieVariableName,this.UserSegment);if(this.EvarToUse){this.setABTestVariable(this.UserSegment)}},setABTestVariable:function(e){thisEvar="eVar"+this.EvarToUse;ABTestVariables[thisEvar]=e}};
var myWishlistHelperSegmenter = {};

//force IE Users to A
var isIE9Down = clientBrowser.isIE7 || clientBrowser.isIE8 || clientBrowser.isIE9 ? true : false;
if(isIE9Down){
	gidLib.setCookieVar("mktUniversalPersist","wishlist2","segA");
	myWishlistHelperSegmenter = new WishlistHelperSegmenter("wishlist2","mktUniversalPersist","seg","DISABLED","100-0","24","");
}else{
	myWishlistHelperSegmenter = new WishlistHelperSegmenter("wishlist2","mktUniversalPersist","seg","wishlisthelper","0-100","24","");
}

var skavaWishListHelper = {

	model : {
		SKAVA_ADD_TO_WISHLIST_CONTAINER_ID : 'skava-wishlist-container',
		SKAVA_WISHLIST_ITEM_COUNT_CONTAINER_ID : 'wishlistCountNumber',
		DEBUG_MODE : true,
		productPageStatus : 'pending',
		skavaHeaderStatus : 'pending',
		LANDING_PAGE_URL : {
			"BR" : "/customerService/info.do?cid=1020315",
			"ON" : "/customerService/info.do?cid=1020251",
			"GP" : "/customerService/info.do?cid=1020253",
			"PL" : "/customerService/info.do?cid=1020345",
			"AT" : "/customerService/info.do?cid=1020314"	
		},
		GIFTCARD_PID : {
			"BR" : ["000002","000050"],
			"ON" : ["000152"],
			"GP" : ["000173"],
			"PL" : ["000194"],
			"AT" : ["000126"]	
		},

		excludeThisPage : false
	},

	controller : {
		init : function(){

			//exclude giftcard product page
			var thisPID = gidLib.getQuerystringParam("pid");
			if(skavaWishListHelper.model.GIFTCARD_PID[brandConst.BRAND_ID].indexOf(thisPID) >= 0){
				skavaWishListHelper.model.excludeThisPage = true;
			}

			jQuery(document).on('skava:init_add_to_wishlist',skavaWishListHelper.controller.initializeSkavaAddToWishlist);
			
		},

		getSelectedProductIdAndSku : function(){
			
			var productInfo = {};
			//get sku
			objSku = productPage.getVariantSku( productPage.selectedColor, productPage.selectedSizeDimension1, productPage.selectedSizeDimension2);
			productInfo['sku'] = typeof objSku != "undefined" ? objSku.strSkuId : ""; //could be undefined if color is not selected yet
			productInfo['pid'] = gidLib.getQuerystringParam('pid');
			//get product id
			return productInfo;
		},

		updateProductPageStatus : function(status){
			skavaWishListHelper.model.productPageStatus = status;
		},

		updateSkavaHeaderStatus : function(status){
			skavaWishListHelper.model.skavaHeaderStatus = status;
		},

		//handler for custom event. Will check that skava and product page is ready
		initializeSkavaAddToWishlist : function(){
			if(!skavaWishListHelper.model.excludeThisPage && skavaWishListHelper.model.productPageStatus == "ready" && skavaWishListHelper.model.skavaHeaderStatus == "ready"){
				//Run Skava's code
				if(typeof SKS_initAddToWishlist != "undefined"){
					SKS_initAddToWishlist(skavaWishListHelper.model.SKAVA_ADD_TO_WISHLIST_CONTAINER_ID);
				}
			}
		}
	},

	view : {

		insertAddToWishListButton : function(){
			// var temp = setTimeout(function(){
				//Insert container
				if(jQuery("#" + skavaWishListHelper.model.SKAVA_ADD_TO_WISHLIST_CONTAINER_ID).length < 1){
					jQuery("#addToBagBtn").after("<div id='" + skavaWishListHelper.model.SKAVA_ADD_TO_WISHLIST_CONTAINER_ID + "' style='clear: both;float: right;margin: -12px 6px 6px 0px;'></div>");
				}
			// },1500);
		},

		insertWishlistText : function(){
			
			//remove the "Shipping to: " text
			var jShippingTargetElement = jQuery("#showShippingTo");
			if(jShippingTargetElement.length > 0){
				jShippingTargetElement.html(jShippingTargetElement.html().replace("Shipping to: ", "&nbsp;&nbsp;&nbsp;"));
			}
			//add Wish List copy & span tag wishlistCountNumber
			var hrefStr = skavaWishListHelper.model.LANDING_PAGE_URL[brandConst.BRAND_ID];
			jQuery("#signInOrderStatus").prepend('<a href="' + hrefStr + '">Wish List</a> | ');

			//call skava's function to get count
			// var isProductPage = location.pathname.indexOf("/browse/product.do") >= 0 ? true : false;
			// SKS_getWishlistCount(isProductPage, skavaWishListHelper.view.insertWishlistItemCount);
			
		},

		insertWishlistItemCount : function(objWishlistResponse){

			if(objWishlistResponse["responseCode"] === 0 && objWishlistResponse["responseMessage"].toLowerCase() == "success"){
				count = objWishlistResponse["count"];
				//insert count/number text
				jQuery("#" + skavaWishListHelper.model.SKAVA_WISHLIST_ITEM_COUNT_CONTAINER_ID).text(count);
			}		

			//output response for debugging
			// if(skavaWishListHelper.model.DEBUG_MODE){
			// 	console.log("Skava Wish List Count Callback Response:");
			// 	jQuery.each(objWishlistResponse,function(key,val){
			// 		console.log("key : " + key + " | val : " + val);
			// 	});
			// }
		}
	}
};

skavaWishListHelper.controller.init();

if(myWishlistHelperSegmenter.QuickSegment.toLowerCase() == "b"){

	//required if not running on a *.gap.com
	//subdomain; for example, this will be needed for
	//Gap staging environments where the domain is
	//*.******.com
	SKSOVERRIDEDOMAIN = "www.gap.com";

	jQuery.getScript('//d16rliti0tklvn.cloudfront.net/47/skwl_gap.js',function(){
		//console.log('calling init_SKSWishlistHeader');
		init_SKSWishlistHeader();//init for all pages (i.e. sitewide)

		//if this is the product page we need to watch for this status and productPage status...
		if(location.pathname.indexOf("/browse/product.do") >= 0){
			skavaWishListHelper.controller.updateSkavaHeaderStatus('ready');
			//trigger this. handler will check that skava and product page is ready
			jQuery(document).trigger('skava:init_add_to_wishlist');
		}
	});

	jQuery.getScript('//d16rliti0tklvn.cloudfront.net/47/sks_gap.js',function(){
		//console.log('2 js loaded');
	});
	
	jQuery(document).ready(function(){		
		skavaWishListHelper.view.insertAddToWishListButton();
	});	

	//listen for these events and do more stuff
	// document.observe('personalizationData:ready',skavaWishListHelper.view.insertWishlistText);
	document.observe('productPage:ready',function(){
		skavaWishListHelper.controller.updateProductPageStatus('ready');
		//trigger this. handler will check that skava and product page is ready
		jQuery(document).trigger('skava:init_add_to_wishlist');
	});

	document.observe('personalizationData:ready',skavaWishListHelper.view.insertWishlistText);
}


