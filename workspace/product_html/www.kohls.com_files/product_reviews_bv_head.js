/*
 * 
 * document.domain=kohls_domain;
 * function bvShowTab(application,displayCode,subjectId,deepLinkId){
 if(application=="PRR"){
 var findId = $('ul.productcdMenu li a.rating-content').attr('href');
 if($('a').hasClass('rating-content')){
 $('.productcdMenu li a').removeClass('active');
 $('a.rating-content').addClass('active');	
 $('.product-cd > div').hide();
 $(findId).show();
 }
 }
 }
 function ratingsDisplayed(totalReviewsCount,avgRating,ratingsOnlyReviewCount,recommendPercentage,productID){
 if(totalReviewsCount==0){
 var bvRevCntr=document.getElementById("BVReviewsContainer");
 var bvSVPLink=document.getElementById("BVSVPLinkContainer");
 if(bvRevCntr){bvRevCntr.style.display="none"
 }if(bvSVPLink){bvSVPLink.style.display="none"}
 }
 };*/
 var numberOfReviews = "";
$(document).ready(function(){	
	if(numberOfReviews != "" && isValidforBV != ""){
		var showBVContent = document.getElementById("bv-content-show");
		showBVContent.style.display = "block";
	}
	 $("#Qusetionstab").click(function(){
        $("#collection-content").removeClass("display-none").css("display","block");
    });
});

try {
$BV.ui("rr", "show_reviews", {
	productId : repoItemID,

	onEvent : function(json) {
		var totalReviewsCount = json.attributes.numReviews;
		var avgRating = json.attributes.avgRating;
		var ratingsOnlyReviewCount = json.attributes.numRatingsOnlyReviews;
		var recommendPercentage = json.attributes.percentRecommend;
		var productID = json.productId;
		if (json.eventSource == "Display") {
			if (totalReviewsCount == 0) {
				var bvRevCntr = document.getElementById("BVRRContainer");
				var bvSVPLink = document.getElementById("BVSVPLinkContainer");
				if (bvRevCntr) {
					bvRevCntr.style.display = "none"
				}
				if (bvSVPLink) {
					bvSVPLink.style.display = "none"
				}
			}
		}
	},
	doShowContent : function() {
		var findId = $('ul.productcdMenu li a.rating-content').attr('href');
		if ($('a').hasClass('rating-content')) {
			$('.productcdMenu li a').removeClass('active');
			$('a.rating-content').addClass('active');
			$('.product-cd > div').hide();
			$(findId).show();
			//var nw_offset = ($('.product-cd').position().top+10);
            $("html,body").animate({scrollTop:$('.rating-content').offset().top-70}, '1000');
		}
	}
});
} catch(e) {
	$log.error('$BV.ui call failed', e);
}

$(window).load(function(){
	var isRatingDisplayed = document.getElementById("BVRRRatingSummaryLinkReadID");
	if(isRatingDisplayed){
	var showBVContent = document.getElementById("bv-content-show");
	if(showBVContent!=null){
	showBVContent.style.display = "block";
	}
	}
});