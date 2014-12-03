
//within product namespace, this piece is devoted to checking the video from scene 7
(function( product, $, undefined ) {
	product.isValidVideo = function(prd){
		if(typeof(prd.videoExist) != undefined && (prd.videoExist == "true" || prd.videoExist))
			return true;
		else
			return false;
	};
	
	product.isValidImage = function(url){
		var isValid = false;
		$.ajax({
			type: 'GET',
			url: isValidImageURL,
			dataType: 'json',
			success: function(data) { isValid = data.valid },
			data: {imageUrl : url},
			async: false
		});
		
		return isValid;
	};
}( window.product = window.product || {}, jQuery ));
