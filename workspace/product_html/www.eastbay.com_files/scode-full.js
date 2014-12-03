function saveCode(code) {
	if(typeof(Storage)!=="undefined") {
		
		if(sessionStorage.getItem('sourceCode') != code && document.location.protocol != "https:") {
			$('<iframe />', {
				name: 'myFrame',
				id:   'myFrame',
				src: 'https://'+document.domain+'/images/common/mobile/js/scode.cfm?code='+code+"&cd=365"
			}).appendTo('body');
			$('#myFrame').hide();
		}
		sessionStorage.setItem('sourceCode', code);
		//$('#save_msg').html("Promo Code: " + code + " has been saved to your device for checkout");
		
	} else {
		createCookie('sourceCode', code, 180)	
	}
	var element = $('#global_banner_disclaimer');
	if (!element.hasClass("dialog")) element = element.parent(".dialog");
	$("#global_banner_disclaimer.fade").remove();
	element.hide();
	populateCode();
	return false;
}

$(document).ready(function(e) {
	populateCode();
	if($('#estimator_submit').length > 0 && $("#estimator_zipcode").val() != ""){
		calculateTotal();
	}
});

function populateCode() {
	if(typeof(Storage)!=="undefined") {		
		if(sessionStorage.getItem('sourceCode') != null) {
			if($('input#promoType').val() != undefined){
				$('input#promoType').click();
			}
			if($('input[name=CPCOrSourceCode]').val() != undefined) 
				$('input[name=CPCOrSourceCode]').val(sessionStorage.getItem('sourceCode'));
			
			if($('input#estimator_sourcecode').val() != undefined) 
				$('input#estimator_sourcecode').val(sessionStorage.getItem('sourceCode'));			
		} 
		
	} else {
		if(readCookie('sourceCode') != null) {
			if($('input#promoType').val() != undefined){
				$('input#promoType').click();
			}
			if($('input[name=CPCOrSourceCode]').val() != undefined) 
				$('input[name=CPCOrSourceCode]').val(readCookie('sourceCode'));
				
			if($('input#estimator_sourcecode').val() != undefined) 
				$('input#estimator_sourcecode').val(readCookie('sourceCode'));	
		}
	}
}