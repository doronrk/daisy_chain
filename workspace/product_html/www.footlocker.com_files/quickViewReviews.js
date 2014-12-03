$(document).ready(function(){
   if($('#endeca_search_results').length > 0){
	 $('.quickviewButton').on('mousedown', function(e){
		var checkCount = 0;
		/*Check for Quickview every 250ms*/
		var checkForReview = setInterval(function(){
			if($('#quickviewContent').length > 0){
			  if($('#BVRating').length > 0){
				  /* Attach to BV iframe content */
				  $('#BVRating').load(function(){
					/* Make it clickable to desired URL */
					if($('#BVRating').contents().find('.BVRROverallRatingContainer').length > 0 ||
  					   $('#BVRating').contents().find('.bv-inline-rating-container').length > 0){
							$('#BVRating').contents().find('body').css('cursor', 'pointer');
							$('#BVRating').contents().find('body').on('click', function(){
								window.location = $('#quickviewMoreInfo').attr('href')+'#tab-reviews';
							});
					}
				   });
				   clearInterval(checkForReview); /*Kill interval checking*/
				}
			}
			checkCount++;
			if(checkCount>=10){
				clearInterval(checkForReview); /*Kill interval checking*/
			}
		}, 250);
	 });
	}
});