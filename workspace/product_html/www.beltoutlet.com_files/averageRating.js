function scProductReviewsAvgRating(){
	var pInfoTblRating = document.getElementById('p-info-tbl-rating'),
	averageStarsDiv = document.createElement('div'),
	ratingsLink = document.createElement('a'),
	avgRating = 0,
	starColor = 'orange',
	bgPosition = '0',
	bgPositionCalc = (12 * 0),
	viewRatingsText = 'Rate This Item!',
	scProductReviewsFrame = document.getElementById('scProductReviewsFrame');
	if(pInfoTblRating){

		pInfoTblRating.appendChild(averageStarsDiv);
		
		averageStarsDiv.id = 'scReviewsPInfoAvgRating';
		averageStarsDiv.className += ' scAverageStars' + avgRating;
		averageStarsDiv.style.textAlign = 'right';
		if(bgPositionCalc > 0){
			bgPosition = '-' + bgPositionCalc + 'px';
		}
		averageStarsDiv.style.background = 'url(http://admin.starproductreviews.com/images/stars/stars-'+starColor+'.png) 0 '+ bgPosition +' no-repeat';
		averageStarsDiv.style.height = '12px';
		averageStarsDiv.style.width = '175px';
		averageStarsDiv.appendChild(ratingsLink);
		
		ratingsLink.href = '#scProductReviews';
		
		if(avgRating == 0){
			ratingsLink.onclick = function(){
				var scProductReviewsFrameHash = scProductReviewsFrame.src.indexOf('#'),
				scProductReviewsFrameNewSrc = scProductReviewsFrame.src.substring(0, scProductReviewsFrameHash) + '&insertNewReview' + scProductReviewsFrame.src.substring(scProductReviewsFrameHash, scProductReviewsFrame.src.length);
				if(scProductReviewsFrameHash > -1){
					document.getElementById('scProductReviewsFrame').src = scProductReviewsFrameNewSrc
				}else{
					document.getElementById('scProductReviewsFrame').src = scProductReviewsFrame.src + '&insertNewReview'
				}
			}
		}
		
		if(avgRating > 0){
			viewRatingsText = 'View Reviews!';
		}
		
		ratingsLink.appendChild(document.createTextNode(viewRatingsText))
		
		
		
	}
}
try{scProductReviewsAvgRating();}
catch(e){}