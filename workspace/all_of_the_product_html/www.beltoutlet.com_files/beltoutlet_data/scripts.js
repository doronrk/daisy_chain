var requestFile = '/library/request.php',
scReviewFormHeight, scReviewsContainerHeight, scReviewsContainerWidth,verifiedCustomerKey;

function doWindowOverLay(el, appendTo, addClass){
	var docHeight = $(document).height(), 
	docWidth = $(document).width();
	$('body').append('<div id="scReviewsOverLay"></div>');
	$('#scReviewsOverLay').css({'height': docHeight + 'px', 'width': docWidth + 'px'});
	$('#scReviewsOverLay').addClass(addClass);
}

function showItemsReviewed(){
	var globalViewAll = 0,
	globalPage = 1,
	globalViewReviews = 0,
	globalSort = 0,
	globalStoreId = storeId,
	globalItemId = itemId,
	pageLoad = 'true',
	submittedArray = new Array();
	
	function getVals(){
		var getVals = '';
		getVals += '"viewAll": "' + globalViewAll + '", ';
		getVals += '"scAction": "showReviews", ';
		getVals += '"page": "' + globalPage + '", ';
		getVals += '"sort": "' + globalSort + '", ';
		getVals += '"itemId": "' + globalItemId + '", ';
		getVals += '"storeId": "' + globalStoreId + '"';
		
		getVals = '({' + getVals + '})';
		
		return getVals;
	}
	
	this.reviewHelpful = function(x, i){
		if(jQuery.inArray(x, submittedArray) > -1){
			alert('You may only submit one vote per review.')
			return;
		}else{
			doWindowOverLay(document, 'body', 'wait')
			$.ajax({
				url: requestFile, 
				type: 'POST',
				data: 'scAction=reviewHelpful&rid=' + x + '&hid=' + i,
				error: doError,
				success: doResponse
			});
		}
		
		function doResponse(data){
			$.ajax({
				url: requestFile + '?d=' + (new Date).getTime(), 
				type: 'GET',
				data: eval(getVals()), 
				error: doError,
				success: doResponse
			});
			
			function doResponse(data){
				$('#scReviewsContainer').html(data);
				$("#scReviewsOverLay").remove();
				scReviewsContainerHeight = $('#scReviewsContainer').height(),
				scReviewsContainerWidth = $('#scReviewsContainer').width();
				$('#reviewsFrame').attr('src', storeUrl+'/sc-product-reviews-script.html?action=item&p=true&w='+scReviewsContainerWidth+'&h=' + scReviewsContainerHeight);
				submittedArray.push(x);
			}
			
			function doError(){
				$("#scReviewsContainer").html('Error retrieving reviews... Please try again later.');
				$("#scReviewsOverLay").remove();
			}
		}
		
		function doError(){
		}
	}
	
	this.sortReviews = function(thisForm){
		var sortVal = thisForm.options[thisForm.selectedIndex].value
		globalSort = ((sortVal == '') ? 1 : sortVal);
		this.showReviews();
	}
	
	this.viewAllReviews = function(){
		if(globalViewAll == 1){
			globalViewAll = 0
		}else{
			globalViewAll = 1;
		}
		this.showReviews();
	}
	
	this.paginate = function(pageNum){
		globalPage = ((pageNum) ? pageNum : 1);
		this.showReviews();
	}
	
	this.refreshReviews = function(){
		globalPage = 1;
		globalSort = 0;
		
		$.ajax({
			url: requestFile + '?d=' + (new Date).getTime(), 
			type: 'GET',
			data: eval(getVals()), 
			error: doError,
			success: doResponse
		});
		
		function doResponse(data){
			$('#scReviewsContainer').html(data);
			scReviewsContainerHeight = $('#scReviewsContainer').height(),
			scReviewsContainerWidth = $('#scReviewsContainer').width();
			$('#reviewsFrame').attr('src', storeUrl+'/sc-product-reviews-script.html?action=item&p='+pageLoad+'&w='+scReviewsContainerWidth+'&h=' + scReviewsContainerHeight + '&updateAvgRating=true');
		}
		
		function doError(){
			$("#scReviewsContainer").html('Error retrieving reviews... Please try again later.');
			$("#scReviewsOverLay").remove();
		}
	}
	
	this.showReviews = function(){
		doWindowOverLay(document, 'body', 'wait')
		
		$.ajax({
			url: requestFile + '?d=' + (new Date).getTime(), 
			type: 'GET',
			data: eval(getVals()), 
			error: doError,
			success: doResponse
		});
		
		function doResponse(data){
			$('#scReviewsContainer').html(data);
			$("#scReviewsOverLay").remove();
			scReviewsContainerHeight = $('#scReviewsContainer').height(),
			scReviewsContainerWidth = $('#scReviewsContainer').width();
			$('#reviewsFrame').attr('src', storeUrl+'/sc-product-reviews-script.html?action=item&p='+pageLoad+'&w='+scReviewsContainerWidth+'&h=' + scReviewsContainerHeight);
			pageLoad = 'false';
			try{
				var parentFrame = parent.parent.frames['scProductReviewsFrame'];
				if(!parentFrame){
					if($('#scReviewsHeader').length > 0){
						$('#scReviewsHeader').css('display', 'block');
					}
					if($('#scReviewsStoreLink').length > 0){
						$('#scReviewsStoreLink').css('display', 'block');
					}
					if($('#scReviewsPoweredBy').length > 0){
						$('#scReviewsPoweredBy').css('display', 'block');
					}
				}
			}catch(e){}
			if(window.insertNewReview){
				scStarsInit.popIn(5)
			}
		}
		
		function doError(){
			$("#scReviewsContainer").html('Error retrieving reviews... Please try again later.');
			$("#scReviewsOverLay").remove();
		}
	}
}

function allAvgRatings(itemId, avgRating, storeUrl){
	var iFrame = document.createElement('iframe');
	iFrame.src = 'http://'+storeUrl+'/reviews/sc-reviews-script.html?action=allAvg&itemId='+itemId+'&avgRating='+avgRating;
	document.getElementById('scAllAvgStars').appendChild(iFrame)
}

function scStars(){
	var currStars = 5, vck = '';
	this.popIn = function(stars){
		currStars = stars;
		if(document.location.hash != ''){
			vck = document.location.hash.substring(1);
		}
		if($('#scReviewsOverLay').length > 0 && $('#scReviewForm').length > 0){
			$('#scReviewsOverLay').removeClass('scReviewsDisplayNone');
			$('#scReviewForm').slideDown();
			$('#scReviewsStars').removeClass('scReviewsStars1');
			$('#scReviewsStars').removeClass('scReviewsStars2');
			$('#scReviewsStars').removeClass('scReviewsStars3');
			$('#scReviewsStars').removeClass('scReviewsStars4');
			$('#scReviewsStars').removeClass('scReviewsStars5');
			$('#scReviewsStars').addClass('scReviewsStars' + stars);
			$('#scReviewForm :hidden[name=stars]').val(stars);
		}else{
			//alert(vck)
			$('#scReviewsOverLay').remove()
			$('#scReviewForm').remove()
			doWindowOverLay(document, 'body', 'wait')
			
			$.ajax({
				url: requestFile + '?d=' + (new Date).getTime(), 
				type: 'GET',
				data: 'scAction=rateItem&stars='+encodeURIComponent(stars)+'&storeId='+encodeURIComponent(storeId)+'&id='+encodeURIComponent(itemId)+'&name='+encodeURIComponent(itemName)+'&vck='+vck, 
				error: doError,
				success: doResponse
			});
		}
		function doResponse(data){
			$('body').append(data);
			
			$('#scReviewForm').css({'float': 'left', 'visibility': 'hidden'});
			
			$('#scReviewsOverLay').removeClass('wait');
			$('#scReviewsOverLay').addClass('pointer');
			
			documentHeight = $(document).height();
			scReviewsContainerHeight = $('#scReviewsContainer').height();
			scReviewFormHeight = $('#scReviewForm').height();
			
			$('#scReviewsOverLay').css('height', (documentHeight -  scReviewFormHeight)+ 'px');
			
			$('#scReviewForm').css({'position': 'absolute', 'display': 'none', 'visibility': 'visible', 'top': '20px', 'left': ((scReviewsContainerWidth/2) - ($('#scReviewForm').width() / 2)) + 'px'});
			
			if(scReviewFormHeight > scReviewsContainerHeight){
				$('#scReviewsOverLay').css('height', documentHeight + 'px');
				$('#reviewsFrame').attr('src', storeUrl+'/sc-product-reviews-script.html?action=item&popin=true&p=true&w='+scReviewsContainerWidth+'&h=' + (scReviewFormHeight + 60));
			}
			
			$('#scReviewsOverLay').attr('title', 'Click to Close')
			
			$('#scReviewsOverLay').bind('click', function(){
				scHideReviewForm()
			})
			
			$('#scReviewForm').fadeIn('slow')
		}
		
		function doError(){
			$("#scReviewsContainer").html('Error retrieving reviews... Please try again later.');
			$("#scReviewsOverLay").remove();
		}
	}
	
	this.changeRating = function(stars, evt){
		if(stars){
			if(evt == 'over'){
				if($('#scReviewsStars').hasClass('scReviewsStars' + currStars) && stars != currStars){
					$('#scReviewsStars').removeClass('scReviewsStars' + currStars)
				}
				$('#scReviewsStars').addClass('scReviewsStars' + stars)
			}
			if(evt == 'out'){
				if(stars != currStars){
					$('#scReviewsStars').removeClass('scReviewsStars' + stars)
					$('#scReviewsStars').addClass('scReviewsStars' + currStars)
				}
			}
			if(evt == 'click'){
				$('#scReviewsStars').addClass('scReviewsStars' + stars);
				$('#scReviewForm :hidden[name=stars]').val(stars);
				currStars = stars;
			}
		}
	}
	
	this.mouseEvt = function(stars, evt){
		if(stars){
			if(evt == 'over'){
				$('#scRateThisItem').addClass('scReviewsStars' + stars)
			}
			if(evt == 'out'){
				$('#scRateThisItem').removeClass('scReviewsStars' + stars)
			}
		}
	}
}
var scStarsInit = new scStars();

function scSubmitReview(thisForm){
	var name = thisForm['name'],
	title = thisForm['title'],
	review = thisForm['review'],
	itemName = thisForm['itemName'],
	itemId = thisForm['itemId'],
	stars = thisForm['stars'],
	store = thisForm['store'],
	vck = thisForm['vck'],
	select = $(thisForm).find('select'),
	postVals = '';
	
	if(name.value == ''){
		alert('Please enter your name.');
		name.focus();
		return false;
	}
	if(title.value == ''){
		alert('Please enter a title for your review.');
		title.focus();
		return false;
	}
	if(review.value == ''){
		alert('Please enter your review.');
		review.focus();
		return false;
	}
	
	$(thisForm).find('select').map(function(){
			postVals += '"'+encodeURIComponent($(this).attr('name'))+'": "' + encodeURIComponent($(this).val()) + '",';
		}
	)
	
	postVals += '"name": "' + encodeURIComponent(name.value) + '",'
	postVals += '"title": "' + encodeURIComponent(title.value) + '",'
	postVals += '"review": "' + encodeURIComponent(review.value) + '",'
	postVals += '"itemName": "' + encodeURIComponent(itemName.value) + '",'
	postVals += '"itemId": "' + encodeURIComponent(itemId.value) + '",'
	postVals += '"stars": "' + encodeURIComponent(stars.value) + '",'
	postVals += '"store": "' + encodeURIComponent(store.value) + '",'
	if(vck){
		postVals += '"vck": "' + encodeURIComponent(vck.value) + '",'
	}
	postVals += '"scAction": "reviewSubmission"'
	postVals = '({' + postVals + '})';
	
	$('#scReviewsMessage').remove()
	$(thisForm + ':input[type=submit]').attr('disabled', 'disabled');
	$(thisForm + ':input[type=submit]').addClass('scReviewFormSubmitDisabled');
	$(thisForm + ':input[type=submit]').after('<div id="scReviewSubmissionText">Submitting review...<br/>One moment please.</div>');
	$('.scReviewFormCloseText a').addClass('scReviewsDisplayNone');
	$('.scReviewFormHeader img').addClass('scReviewsDisplayNone');
	
	$.ajax({
		url: requestFile, 
		type: 'POST',
		data: eval(postVals), 
		error: doError,
		success: doResponse
	});
	
	function doResponse(data){
		switch(data){
			case '1':
				$('#scReviewForm .scReviewFormHeader').after('<div id="scReviewsMessage">Thank you for rating and reviewing this item... your submission will be reviewed and posted within a few days.</div>');
				thisForm.reset();
			break;
			
			case '2':
				scHideReviewForm()
				thisForm.reset();
				$(thisForm + ':textarea[name=review]').removeAttr('style')
				showItemsReviewedInit.refreshReviews();
			break;
			
			case '0':
			default:
				$('#scReviewForm .scReviewFormHeader').after('<div id="scReviewsMessage">There was an error saving your review... Please try again.</div>');
			break;
		}
		$(thisForm + ':input[type=submit]').removeAttr('disabled', 'disabled');
		$(thisForm + ':input[type=submit]').removeClass('scReviewFormSubmitDisabled');
		$('#scReviewSubmissionText').remove();
		$('.scReviewFormCloseText a').removeClass('scReviewsDisplayNone');
		$('.scReviewFormHeader img').removeClass('scReviewsDisplayNone');
	}
	
	function doError(){
		$(thisForm + ':input[type=submit]').removeAttr('disabled', 'disabled');
		$(thisForm + ':input[type=submit]').removeClass('scReviewFormSubmitDisabled');
		$('#scReviewSubmissionText').remove();
		$('.scReviewFormCloseText a').removeClass('scReviewsDisplayNone');
		$('.scReviewFormHeader img').removeClass('scReviewsDisplayNone');
	}
}

function scHideReviewForm(){
	$('#scReviewForm').fadeOut('slow', function(){
		$(this).remove()
		$('#scReviewsMessage').remove()
		$('#scReviewsOverLay').remove()
	})
	if(scReviewFormHeight > scReviewsContainerHeight){
		$('#reviewsFrame').attr('src', storeUrl+'/sc-product-reviews-script.html?action=item&popin=true&p=true&w='+scReviewsContainerWidth+'&h=' + scReviewsContainerHeight);
	}
}

function scProductReviews(){
	var winLoc = window.location,
	frameParams =  winLoc.search.substring(1),
	frameParamsKeys = frameParams.split('&'),
	frameParamsLen = frameParamsKeys.length,
	frameParamsVals,
	action = '';
	if(frameParams != ''){
		for(var i = 0; i < frameParamsLen; i++){
			frameParamsVals = frameParamsKeys[i].split('=');
			if(frameParamsVals[0] == 'action'){
				action = frameParamsVals[1];
				break;
			}
			 
		}
	}
	if(action == 'allAvg'){
		scAllAvgRatings();
	}
	if(action == 'item'){
		scItemReviews();
	}
}

function scItemReviews(){
	var winLoc = window.location,
	parentWinLoc = parent.parent.document.location,
	parentWinHash = parentWinLoc.hash,
	frameParams =  winLoc.search.substring(1),
	frameParamsKeys, 
	frameParamsLen, 
	frameParamsVals, 
	parentFrame, 
	avgRatingContainer, 
	popin = false, 
	updateAvgRating = false, 
	averageRatingScriptDiv,
	addHash = '',
	vck;
	if(frameParams != ''){
		parentFrame = parent.parent.document.getElementById('scProductReviewsFrame');
		vck = parentWinLoc.search.substring(1).match(/vck=([a-zA-Z0-9]{40})/);
		if(vck && vck[1] && parentFrame.src.indexOf('#' + vck[1]) == -1){
			parentFrame.src = parentFrame.src + '#' + vck[1]
		}
		scProductReviewsHeader = parent.parent.document.getElementById('scProductReviewsHeader');
		if(parentFrame){
			if(scProductReviewsHeader){
				scProductReviewsHeader.style.display = 'block';
			}
			frameParamsKeys = frameParams.split('&');
			frameParamsLen = frameParamsKeys.length;
			for(var i = 0; i < frameParamsLen; i++){
				frameParamsVals = frameParamsKeys[i].split('=');
				switch (frameParamsVals[0]){
					case 'p':
						if(frameParamsVals[1] == 'false'){
							if(parentWinHash == '' || (parentWinHash != '' && parentWinHash != '#scProductReviews')){
								if(parentWinHash != '' && parentWinHash != '#scProductReviews'){
									parentWinLoc = parentWinLoc.href.substring(0, parentWinLoc.href.indexOf('#'))
								}
								addHash = '#scProductReviews';
							}
							parent.parent.document.location = parentWinLoc + addHash;
						}
					break;
					case 'popin':
						popin = true;
					break;
					case 'updateAvgRating':
						if(frameParamsVals[1] == 'true'){
							updateAvgRating = true;
						}
					break;
					case 'h':
						parentFrame.style.height = frameParamsVals[1] + 'px';
					break;
					case 'w':
						parentFrame.style.width = frameParamsVals[1] + 'px';
					break;
					case 'avgrating':
						avgRatingContainer = parent.parent.document.getElementById('scAverageRating');
						if(avgRatingContainer){
							avgRatingContainer.innerHTML = frameParamsVals[1]
						}
					break;
					
				}
			}
			if(updateAvgRating){
				var scriptTag,
				pInfoTblRating = parent.parent.document.getElementById('p-info-tbl-rating'),
				scProductReviewsAverageRatingScript = parent.parent.document.getElementById('scProductReviewsAverageRatingScript'),
				scProductReviewsPath = parent.parent.scProductReviewsPath,
				scProductReviewsStoreId = parent.parent.scProductReviewsStoreId,
				scProductReviewsId = parent.parent.scProductReviewsId;
				if(pInfoTblRating && scProductReviewsAverageRatingScript && scProductReviewsPath && scProductReviewsStoreId && scProductReviewsId){
					pInfoTblRating.innerHTML = '';
					scProductReviewsAverageRatingScript.innerHTML = '';
					scriptTag = document.createElement('script');
					scriptTag.type = 'text/javascript';
					scriptTag.src = scProductReviewsPath + '/scripts/averageRating.php?store=' + scProductReviewsStoreId + '&id=' + scProductReviewsId;
					scProductReviewsAverageRatingScript.appendChild(scriptTag);
				}
			}
		}
	}
}

function scAllAvgRatings(){
	
}