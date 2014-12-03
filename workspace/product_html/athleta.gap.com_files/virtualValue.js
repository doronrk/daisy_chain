

/* Add the custom prototype events to the jQuery so we can use jQuery to observe these events:
 * - categoryFacetedSearchGrid:ready
 * - productPage:ready
 * - filterTools:ready
 */
(function( $ ) {
 	$.each(['personalizationData:ready','categoryFacetedSearchGrid:ready','productPage:ready','filterTools:ready'], function(index,eventName) {
 		document.observe(eventName,function(){ 
 			$(document).trigger(eventName);
 		});
 	});
})( jQuery );

var wcd_VV = function() {

var psRewardsOffers = false;  //note: BOOLEAN
var psVvAmtStyle = ''; //style VV AMOUNT
var psVvAmtStyleDsrpt = 'none'; //style VV AMOUNT

	//if ( (personalizationService.model.personalizationData.personalizationInfoV1.customerAttributes) && (parseInt(personalizationService.model.personalizationData.personalizationInfoV1.customerAttributes.totalRewardValue) > 0) ) {
if (jQuery(personalizationService.model.personalizationData.personalizationInfoV1.customerAttributes).length == 1){
		
	//Check for Brand ID in personalizationService and IF true equal to this BRAND_CODE set thisBrandOfferAvailable = true;
		var offersAvailable;
		var currentBrand;
		var thisBrandOfferAvailable;

		currentBrand = brandConst.BRAND_CODE.toString();
		offersAvailable = personalizationService.model.personalizationData.personalizationInfoV1.customerAttributes.offerBrands;
		offersAvailable.split(',');
		if (jQuery.inArray(currentBrand, offersAvailable) != -1) {
		    thisBrandOfferAvailable = true;
		} else {
		    thisBrandOfferAvailable = false;
		}
		//console.info(thisBrandOfferAvailable);
		
	//End Check for Brand ID and set offersForThisBrand = true;
		
	    var psRewards = false;
		if (parseInt(personalizationService.model.personalizationData.personalizationInfoV1.customerAttributes.totalRewardValue) > 0) {
		psRewards = true};

		var psOffersOnly = 'false';
		if (personalizationService.model.personalizationData.personalizationInfoV1.customerAttributes.hasOffers=="true" && thisBrandOfferAvailable == true ) {
		psOffersOnly = "true";}; ;  //note: STRING
		
		//var psRewardsOffers = false;  //note: BOOLEAN
		if(psRewards == true && psOffersOnly == 'true' && thisBrandOfferAvailable == true){psRewardsOffers = true;};  //set var for rewards and Offers - true or false

//Define Display Styles:  Rewards Only:	
if (psRewards == true){
	psVvAmtStyle = "rewardsOnlyBannerAmtStyle";  
	psVvAmtStyleDsrpt = "block";
	bannerClass = "rewardsOnlyBannerClass";
	discruptorClass = "rewardsOnlyFlyOutClass";
	}

//Define Display Styles:  Offers Only:		 
	if(psOffersOnly == 'true' && psRewardsOffers != true){
	psVvAmtStyle = "offersOnlyBannerAmtStyle";
	psVvAmtStyleDsrpt = "none";
	bannerClass = "offersOnlyBannerClass";
	discruptorClass = "offersOnlyFlyOutClass";
	} 
	
//Define Display Styles:  Rewards and Offers:
	if(psRewardsOffers == true && psOffersOnly == 'true'){
	psVvAmtStyle = "offersAndRewardsBannerAmtStyle";
	psVvAmtStyleDsrpt = "block";
	bannerClass = "offersAndRewardsBannerClass";
	discruptorClass = "offersAndRewardsFlyOutClass";
	} 

//console.info("VV Exists!");		
			
		// check for and setup the disruptor
		var disruptorVal = gidLib.getCookieVar("mktGlobalSession","vvdisruptorvalue");
		var value = 1;

// if wcdBrandDisrupterDidFire var not present assume false.
		if(typeof wcdBrandDisrupterDidFire == 'undefined') {
			wcdBrandDisrupterDidFire = false;
		}
		if ( (location.href.indexOf("category.do") < 0) && (location.href.indexOf("account_rewards_summary.do") < 0) && (location.href.indexOf("account_summary.do") < 0) && (!wcdBrandDisrupterDidFire) ){ // do not show disruptor if on a category page or account summary page
			if (disruptorVal == "" && psRewards == true || disruptorVal == "" && psOffersOnly == 'true' && psRewardsOffers != true || disruptorVal == "" && psRewardsOffers == true && psOffersOnly == 'true' ) {	// show disruptor only three times and in the specific 3 cases
				gidLib.setCookieVar("mktGlobalSession","vvdisruptorvalue",value);
				
				fireVVDisruptor(psVvAmtStyle, psVvAmtStyleDsrpt, psRewardsOffers);
			} 
			else if (parseInt(disruptorVal) < 3 && psRewards == true || disruptorVal < 3 && psOffersOnly == 'true' && psRewardsOffers != true || disruptorVal < 3 && psRewardsOffers == true && psOffersOnly == 'true') {
				value = parseInt(disruptorVal) + 1;
				gidLib.setCookieVar("mktGlobalSession","vvdisruptorvalue",value);
				
				fireVVDisruptor(psVvAmtStyle, psVvAmtStyleDsrpt, psRewardsOffers);
			} 
			
			else {
				Event.fire(document, "personalizationService:renderCustomerAttributes");
				if(jQuery("#offersAndRewards").length){ 
					jQuery("#offersAndRewards").addClass(bannerClass);
					jQuery("#offersAndRewards").html("<p class='"+psVvAmtStyle+"'>$"+personalizationService.model.personalizationData.personalizationInfoV1.customerAttributes.totalRewardValue+"</p>");
				}
			}
		} 
		else {
			Event.fire(document, "personalizationService:renderCustomerAttributes");
			if(jQuery("#offersAndRewards").length){ 
						jQuery("#offersAndRewards").addClass(bannerClass);
						jQuery("#offersAndRewards").html("<p class='"+psVvAmtStyle+"'>$"+personalizationService.model.personalizationData.personalizationInfoV1.customerAttributes.totalRewardValue+"</p>");
						jQuery("#offersAndRewards").css("display","block");
				}
		}
		// fire virtual value code
	}
}

var fireVVDisruptor = function(psVvAmtStyle, psVvAmtStyleDsrpt, psRewardsOffers) {
//console.info(wcd_VV.psRewardsOffers);
var psRewardsOffers= psRewardsOffers;
var psVvAmtStyle = psVvAmtStyle;     //style VV AMOUNT
var psVvAmtStyleDsrpt = psVvAmtStyleDsrpt;    //style VV AMOUNT

//console.info("VV Disruptor Firing!");
	var vvvalue = parseInt(personalizationService.model.personalizationData.personalizationInfoV1.customerAttributes.totalRewardValue);
//	if (psRewards == true){
		var vvfontvalue = 12;
		var vvmargintopvalue = 2;
		vvMarginLeftValue= 128;
		var vvcurrency="";
		if (vvvalue < 100) { 
			vvfontvalue = 60;
			vvmargintopvalue = 1;
		} else if (vvvalue < 1000) {
			vvfontvalue = 42;
			vvmargintopvalue = 6;
		} else if (vvvalue < 10000) {
			vvmargintopvalue = 11;
			vvfontvalue = 28;
		}
//	}

if(psRewardsOffers == true ){	
		var vvfontvalue = 12;
		var vvmargintopvalue = 2;
		var vvcurrency="$";
		vvMarginLeftValue= 100;
		if (vvvalue < 100) { 
			vvfontvalue = 23;
			vvmargintopvalue = 4;
		} else if (vvvalue < 1000 ) {
			vvfontvalue = 18;
			vvmargintopvalue = 7;
		} else if (vvvalue < 10000) {
			vvmargintopvalue = 11;
			vvfontvalue = 28;
		}
}	

//insert inline bag header

jQuery( "<div id='vvParentContainer' class = 'vvParentContainerClass'><a href='/profile/account_rewards_summary.do?locale=en_US'><div id='vvDivDisContainer' class = " + discruptorClass + "><div id='vvamount' style='display: "+psVvAmtStyleDsrpt +";color:#f47529; margin-left:"+vvMarginLeftValue+"px; margin-top:"+ vvmargintopvalue + "px; font-size:" + vvfontvalue + "px;'></div></div></a></div>").insertAfter("#inlineBagHeader");
	
$("vvamount").update(vvvalue);	

jQuery( "#vvParentContainer" ).animate({height:"78px"},500,function() {
			setTimeout( function() { 
							if(jQuery("#vvParentContainer").length){
								jQuery("#vvParentContainer").css ("height","0px");
							} 
//console.info("Firing VV main code!");
							Event.fire(document, "personalizationService:renderCustomerAttributes");
				
							if(jQuery("#offersAndRewards").length){ 
									jQuery("#offersAndRewards").addClass(bannerClass);
									jQuery("#offersAndRewards").html("<p class='"+psVvAmtStyle+"'>$"+personalizationService.model.personalizationData.personalizationInfoV1.customerAttributes.totalRewardValue+"</p>");
									jQuery("#offersAndRewards").css("display","block");
							}

//console.info("VV Main code complete!");							
				}, 5000);
		});

//console.info("VV Disruptor Fired! Value = " + vvvalue);
}

var thisBrowser = navigator.userAgent;
if (thisBrowser.indexOf("MSIE") != -1) { // if IE
    if (thisBrowser.indexOf("MSIE 7") < 0) { // if not IE 7
        if (document.documentMode != 7) { // if not IE 7 mode

			//document.observe('updateDomWithPersonalizationData:completed', wcd_VV); // show VV
			jQuery(document).on('personalizationData:ready', function () {
		       // alert ("personalization ready");
			    wcd_VV();
		   })

        }
    }
} else { // all other browsers
		//document.observe('updateDomWithPersonalizationData:completed', wcd_VV); // show VV
		jQuery(document).on('personalizationData:ready', function () {
		//     alert ("personalization ready");
		    wcd_VV();
		  })

}
