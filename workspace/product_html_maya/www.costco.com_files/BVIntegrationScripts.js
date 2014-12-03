//********************************************************************
//*-------------------------------------------------------------------
//* Licensed Materials - Property of IBM
//*
//* WebSphere Commerce
//*
//* (c) Copyright IBM Corp. 2000, 2002
//*
//* US Government Users Restricted Rights - Use, duplication or
//* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
//*
//*-------------------------------------------------------------------
//*
/** 
 *	BVIntegrationScripts.js
 *  requires these values to be declared before calling this .js
 *  var test = false/true (brings up debugging alerts)
 *	var BVisLoaded = false;
 **/ 
 
/**
 * ratingsDisplayed - gets called by BazaarVoice JS
 **/

var reviewTabContent;

$( document ).ready(function() {
	if( typeof bvProductId != 'undefined' ){
		$BV.ui("rr", "show_reviews", {
			productId: bvProductId,
			onEvent: function(json) {
				var totalReviewsCount = json.attributes.numReviews;
				var avgRating = json.attributes.avgRating;
				var ratingsOnlyReviewCount = json.attributes.numRatingsOnlyReviews;
				var recommendPercentage = json.attributes.percentRecommend;
				var productID = json.productId;
				if (json.eventSource == "Display") {
					if (!reviewTabContent){
						reviewTabContent = $('#reviews-tab').html();
					}
					if(totalReviewsCount > 0) {
						$('#reviews-tab').empty().append(reviewTabContent+ ' ('+totalReviewsCount+')');
					}		
					document.getElementById('PleaseWait').style.display = "none";
				    if (totalReviewsCount > 0) {
				        var bvRevCntr = document.getElementById("BVRRContainer");
						if (bvRevCntr) { bvRevCntr.style.display = "block"; }
				        var bvSVPLink = document.getElementById("BVSVPLinkContainer");
						if (bvSVPLink) { bvSVPLink.style.display = "block"; }
				     }
					else {   
						var noReviews = document.getElementById("NoReviewsYet");
						if (noReviews) { noReviews.style.display = "block"; }
						createWriteReviewLink();
					}
				}
			}
		});
	}
});




//function ratingsDisplayed(totalReviewsCount, avgRating, ratingsOnlyReviewCount, buyAgainPercentage, productID)
//{   
//	if (!reviewTabContent)
//	{
//		reviewTabContent = $('#reviews-tab').html();
//	}
//	if(totalReviewsCount > 0) {
//		$('#reviews-tab').empty().append(reviewTabContent+ ' ('+totalReviewsCount+')');
//	}		
//	
//	document.getElementById('PleaseWait').style.display = "none";
//    if (totalReviewsCount > 0) {
//        
//        var bvRevCntr = document.getElementById("BVRRContainer");
//		if (bvRevCntr) { bvRevCntr.style.display = "block"; }
//        var bvSVPLink = document.getElementById("BVSVPLinkContainer");
//		if (bvSVPLink) { bvSVPLink.style.display = "block"; }
//     }
//	else
//	{   
//		var noReviews = document.getElementById("NoReviewsYet");
//		if (noReviews) { noReviews.style.display = "block"; }
//		createWriteReviewLink();
//	}
//// ShowReviewCount(totalReviewsCount);
//}

function createWriteReviewLink(){
	var srcLink = document.getElementById('BVSubmissionURL');
	var destLink = document.getElementById('WriteFirstReviewLink');
	if (srcLink && destLink){
		destLink.href = srcLink.href;
	}
}

var BVisLoaded = false;
function BVcheckLoadState() {
	if(!BVisLoaded) {

// var page = document.getElementById('BVFrame').src;
// document.getElementById('BVFrame').src='http://reviews.costco.com/logging?page='
// + escape(page);
		document.getElementById('BVRRContainer').style.display = "block";
		document.getElementById('BVRRContainer').innerHTML = 'We\'re sorry, but we are temporarily unable to display product reviews.  Please try again later.';
   }
}


/**
 * BVcheckLoadState - gets called by BazaarVoice JS
 */
/*
 * function BVcheckLoadState(){ // gets called by the BazaarVoiceJavaScript if
 * (test) {alert('enter BVcheckLoadState()'); } if(!BVisLoaded &&
 * document.getElementById('BVFrame')){ //Added second condition for defect 8527
 * document.getElementById('BVFrame').src=""; var page =
 * document.getElementById('BVFrame').src;
 * document.getElementById('BVFrame').src="http://reviews.costco.com/" +
 * "logging?page=" + page;
 * document.getElementById('BVReviewsContainer').innerHTML = "<!--Review
 * retrieval timed out-->"; }
 *  }
 */	

