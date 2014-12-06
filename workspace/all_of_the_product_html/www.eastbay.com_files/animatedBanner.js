var globalBannerDetails = {
	
	iecheck: !$.support.cssFloat,
	
	init: function() {
		var $headerNewMsgAchor = $('#small-banner a'),
		//$anibannerContent = $('.anibannerContent'),
		$promoMsgContent = $('.anibannerContent'),
		//detailHeight = $promoMsgContent.prop('scrollHeight'),
		detailHeight = 300;
		promoContentHeight = 300; //sets height for IE
		
		$headerNewMsgAchor.click(function(){
			if(!$promoMsgContent.hasClass('seeDetails')){
				$promoMsgContent.addClass('promoMsgAffects');
				$promoMsgContent.show();
				if(globalBannerDetails.iecheck){
					// do ie thing
					$promoMsgContent.show().css({height:promoContentHeight+'px'});
					//$promoMsgContent.stop().animate({height:detailHeight+'px'}, 200);
				} else {
					$promoMsgContent.height(detailHeight);
				}
				$promoMsgContent.addClass('seeDetails');
			} else {
				if(globalBannerDetails.iecheck){
					// do ie thing
					$promoMsgContent.stop().animate({height:'1px'}, 100, function(){
						$promoMsgContent.hide();
					});
				} else {
					$promoMsgContent.height(0);
				}
				//$headerNewMsg.addClass('removed');
				setTimeout(function(){
					$promoMsgContent.removeClass('promoMsgAffects').removeClass('seeDetails');
				}, 105);
				
			}
		});
		
		$('.anibannerCloseBtn a').click(function(){
			if($promoMsgContent.hasClass('seeDetails')){
				if(globalBannerDetails.iecheck){
					// do ie thing
					$promoMsgContent.stop().animate({height:'1px'}, 100, function(){
						$promoMsgContent.hide();
					});
				} else {
					$promoMsgContent.height(0);
				}
				$promoMsgContent.hide();
				$promoMsgContent.removeClass('promoMsgAffects').removeClass('seeDetails');
			}
		});
	
	}
}

$(document).ready(function(e) {
	globalBannerDetails.init();
});




