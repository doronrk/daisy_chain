//THIS SCRIPT WILL UPDATE SALE LINKS ON LOAD
//USAGE: add class="auto_saleLink" and href="#TRACKING_ID" to sale link

$(document).ready(function(){
	var saleLink = $('#menu_sale a').attr('href');

	 $('.auto_saleLink').each(function(){
	    var $saleMain = $(this);
	   	var saleICID = $saleMain.attr('href').replace('#','');
	   	var newLink = saleLink+'&icid='+saleICID;
	
	   	$saleMain.attr('href',newLink);
	 });
});


//TEMPORARY FOR EGIFT CARDS
//Swap E-Gift Card Image Only
$(function(){
	var clearMainImg = function(){
		$('#product #photos #modelshot').attr('src', '')
	}
	if($('#product #eskuForm').length){
		$('#product #eskuForm #skuIdSelect').bind('change', function() {
			//E-Gift Cards: Shopping Spree = 1, A Girl's Best Friend = 2
			var curSel = $(this).find(':selected').text().trim();
			if (curSel == "Shopping Spree" || curSel == "A Girl's Best Friend") {
				var curIdx = $(this)[0].selectedIndex;
				clearMainImg();
				$('#product #photos #modelshot').attr('src', '/web_assets/img/giftCards/EGIFTCERTWHext' + curIdx + '_normal.gif');
			}
		})
		
		//ThumbNail Image Updates
		$('.altThumb').bind('click',function(){
			var idx = $(this).parent().prevAll().length;
			if(idx>0 && idx<=2){
				clearMainImg();
			}
		})
		$('.thumbImg').each(function(i){
			if(i>0 && i<=2){
				var $thumbImg = $(this).find('.altThumb');
				$thumbImg.attr('href',$thumbImg.attr('href').replace('/Product_Images/','/web_assets/img/giftCards/').replace('.jpg','.gif'))
			}	
		})
	}
})
