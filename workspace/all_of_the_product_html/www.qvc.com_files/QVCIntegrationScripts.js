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
 *	QVCIntegrationScripts.js
 *  requires these values to be declared before calling this .js
 *  var test = false/true (brings up debugging alerts)
 *	var BVisLoaded = false;
 **/ 
 
 	/**
 	 * ratingsDisplayed - gets called by BazaarVoice JS
 	 **/
 	 
 	function ratingsDisplayed(totalReviewsCount, avgRating, ratingsOnlyReviewCount) { // gets called by the BazaarVoice JavaScript
		if (test) {alert('enter ratingsDisplayed() \n' 
						+ 'parameters : \n'
						+ 'totalReviewsCount = [' + totalReviewsCount + '] \n'
						+ 'avgRating = [' + avgRating + '] \n'
						+ 'ratingsOnlyReviewCount = [' + ratingsOnlyReviewCount + '] \n'
						);}
	}
 	/**
 	 * showReviewMarkup - gets called by BazaarVoice JS
 	 **/
	function showReviewMarkup() {  // gets called by the BazaarVoice JavaScript	
		if (test) {alert('enter showReviewMarkup()');	}
		document.getElementById("hideBV").style.display = "block";
	}
 	/**
 	 * BVcheckLoadState - gets called by BazaarVoice JS
 	 **/
	function BVcheckLoadState(){  // gets called by the BazaarVoiceJavaScript
		
	
	// Commented out for new API
		//if(!BVisLoaded && document.getElementById('BVFrame')){	//Added second condition for defect 8527
		//document.getElementById('BVFrame').src="";
			//var page = document.getElementById('BVFrame').src;
			//document.getElementById('BVFrame').src="http://reviews.qvc.com/" + "logging?page=" + page;
			//document.getElementById('BVReviewsContainer').innerHTML = "<!--Review retrieval timed out-->";
		//}
		
	}		
 	/**
 	 * changeURL - created to change the url appropriately
 	 * @param - urlReviewEmbed - the url to change
 	 **/
	function changeBVFrameURL(urlReviewEmbed) {
		// Commented out for new API
		//if (test) {alert('enter changeBVFrameURL() \n' 
		//				+ 'parameters : \n'
		//				+ 'urlReviewEmbed = [' + urlReviewEmbed + '] \n');}
		// inline function to load the appropriate divs when the dom is ready		
		//document.getElementById('BVFrame').src = urlReviewEmbed;
	}	
	
	var communityTab, reviewDisplayArea;	
	function setCommunityTab(newCommunityTab, newReviewDisplayArea) {
		// Set the review tab and display area used by ratings displayed 
		communityTab = newCommunityTab;
		reviewDisplayArea = newReviewDisplayArea;
	} 
    function ratingsDisplayed(totalReviewsCount, avgRating, ratingsOnlyReviewCount) {
		var reviewTabShown = true;
		if(document.domain != 'qvc.de')
		{
			if(totalReviewsCount < 1) {
				if (communityTab != null) {
	          		$(communityTab).css('display', 'none');
				}
	          	if (reviewDisplayArea != null) {
	          		$(reviewDisplayArea).css('display', 'none');
				}
	          	reviewTabShown = false;
	          	
	          	 // Show Q&A contents
		 		if (typeof DisplayQuestionAnswerContents == 'function') {
		 			DisplayQuestionAnswerContents(!reviewTabShown);
		 		}
	 		} else {
	 			highlightTab('body', 'productDetailDescriptionCustomerReviewTab','productDetailDescriptionCustomerReviewTab1');
	 		}
 		}
    }
    
    function showReviewMarkup() {
		document.getElementById("hideBV").style.display = "block";
	}
	
	function SubmitReviewPageViewTag(pagePrefix, categoryId, itemNumber, itemDesc)
    {
    	var reviewCoreMetricsPageID = pagePrefix + ": " + itemNumber + " - " + itemDesc;
    	var reviewCoreMetricsCategoryID = categoryId;
    	cmCreateManualPageviewTag(reviewCoreMetricsPageID, reviewCoreMetricsCategoryID);
    }
