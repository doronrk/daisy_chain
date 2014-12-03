var kwm_rating = 5;
var kwm_rating_text = 'Click on Stars to Rate';

function showThankyou(name){
	if(navigator.appName.indexOf("Microsoft")!=-1){
		window_width = document.documentElement.clientWidth;
		window_height = document.documentElement.clientHeight;
	}else{
		window_width = window.innerWidth;
		window_height = window.innerHeight;
	}
	
	w_left = (window_width/2) - 200;
	w_top = (window_height/2) - 200;
	
	window.open(name+".html", null, "height=400,width=400,left="+w_left+",top="+w_top);
}

function setValue(option, rating){
	switch(rating){
		case 1:
			rating_str = 'one';
			//document.getElementById('star-selection').innerHTML = 'Not Good';
			//kwm_rating_text = 'Not Good';
			break;    
		case 2:
			rating_str = 'two';
			//document.getElementById('star-selection').innerHTML = 'Needs That Special Something';
			//kwm_rating_text = 'Needs That Special Something';
			break;
		case 3:
			rating_str = 'three';
			//document.getElementById('star-selection').innerHTML = 'Average, Ordinary';
			//kwm_rating_text = 'Average, Ordinary';
			break;    
		case 4:
			rating_str = 'four';
			//document.getElementById('star-selection').innerHTML = 'That\'s Good Stuff';
			//kwm_rating_text = 'That\'s Good Stuff';
			break;
		case 5:
			rating_str = 'five';
			//document.getElementById('star-selection').innerHTML = 'Perfect. It doesn\'t get any better';
			//kwm_rating_text = 'Perfect. It doesn\'t get any better';
			break;
	}
                
	if(option == 'kwm_rating'){
		kwm_rating = rating;
		document.getElementById('kwm_rating').className = 'rating '+rating_str+'star';
	}
}


var loadingStr = '<img src="http://www.kingwebtools.com/victorias_jewelry_box/feedback_system/images/ajax-loader.gif" />'

function SubmitReview(kwm_folder) {
	
	var chk_error = 0;

	if(document.getElementById("your_name").getAttribute("required") == 'Y' && document.getElementById("your_name").value == ''){
		alert ('Your Name is required field!');
		document.getElementById("your_name").focus();
		chk_error = 1;
	}
	
	if(document.getElementById("your_location").getAttribute("required") == 'Y' && document.getElementById("your_location").value == '' && chk_error == 0){
		alert ('Your City, State is required field!');
		document.getElementById("your_location").focus();
		chk_error = 1;
	}
	
	if(document.getElementById("kwm_comment").getAttribute("required") == 'Y' && document.getElementById("kwm_comment").value == '' && chk_error == 0){
		alert ('Your Comment is required field!');
		document.getElementById("kwm_comment").focus();
		chk_error = 1;
	}
	
	if(chk_error == 0){			
		var jsel = document.createElement('SCRIPT');
		var rating = kwm_rating;
		jsel.type = 'text/javascript';
		jsel.src = 'http://www.kingwebtools.com/'+ kwm_folder +'/feedback_system/submit_review.php?item_id=' + encodeURI( document.getElementById("kwm_item_id").value ) + '&kwm_comment=' + encodeURI( document.getElementById("kwm_comment").value ) + '&your_name=' + encodeURI( document.getElementById("your_name").value ) + '&your_location=' + encodeURI( document.getElementById("your_location").value ) + '&rating=' + encodeURI( rating );

		document.getElementById('reviews-thank-you').style.display = 'block';
		document.getElementById('reviews-thank-you').innerHTML = loadingStr;
		document.getElementById('reviews-thank-you').appendChild (jsel);
	}
}


// Display More Reviews
function showMoreReviews(eId){
	if(document.getElementById('moreReviews').style.display == 'none'){
		document.getElementById('moreReviews').style.display = '';
		eId.innerHTML = 'Hide Reviews';
	}else{
		document.getElementById('moreReviews').style.display = 'none';
		eId.innerHTML = 'More Reviews...';
	}
}

// Show or Hide Reviews
function showhideReviews(eId){
	//if(eId.innerHTML == 'Write a Review'){
	if(document.getElementById('readreviews').style.display == ''){	
		if(document.getElementById('readreviews')){
			eId.innerHTML = kwm_read_reviews_text;
			document.getElementById('readreviews').style.display = 'none';
		}
		if(document.getElementById('writereviews')){
			document.getElementById('writereviews').style.display = '';
		}
	}else{
		if(document.getElementById('readreviews')){
			eId.innerHTML = kwm_write_review_text;
			document.getElementById('readreviews').style.display = '';
		}
		if(document.getElementById('writereviews')){
			document.getElementById('writereviews').style.display = 'none';
		}
	}
}
