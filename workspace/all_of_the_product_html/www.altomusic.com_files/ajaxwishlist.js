function ajaxCompare(url,id){
	url = url.replace("catalog/product_compare/add","ajax/whishlist/compare");
	url += 'isAjax/1/';

    jQuery('#preloader .loader').fadeIn(300);

	jQuery.ajax( {
		url : url,
		dataType : 'json',
		success : function(data) {
			//jQuery('#ajax_loading'+id).hide();
			if(data.status == 'ERROR'){
                jQuery('#preloader .loader').hide();
                jQuery('#preloader .inside').html(data.message);
                jQuery('#preloader .message').fadeIn(300);

                setTimeout(function(){
                    jQuery('#preloader .message').fadeOut();
                },1500);
			}else{

                jQuery('#preloader .loader').hide();
                jQuery('#preloader .inside').html(data.message);
                jQuery('#preloader .message').fadeIn(300);

                setTimeout(function(){
                    jQuery('#preloader .message').fadeOut();
                },1500);


				if(jQuery('.block-compare').length){
                    jQuery('.block-compare').replaceWith(data.sidebar);
                }else{
                    if(jQuery('.col-right').length){
                    	jQuery('.col-right').prepend(data.sidebar);
                    }
                }
                if(jQuery('#topline .links')){
                    jQuery('#topline .links').replaceWith(data.toplink);
                }
			}
		}
	});
}

function ajaxWishlist(url,id){
	url = url.replace("wishlist/index","ajax/whishlist");
	url += 'isAjax/1/';
    jQuery('#preloader .loader').fadeIn(300);
	jQuery.ajax( {
		url : url,
		dataType : 'json',
		success : function(data) {
			//jQuery('#ajax_loading'+id).hide();
			if(data.status == 'ERROR'){
                jQuery('#preloader .loader').hide();
                jQuery('#preloader .inside').html(data.message);
                jQuery('#preloader .message').fadeIn(300);

                setTimeout(function(){
                    jQuery('#preloader .message').fadeOut();
                },1500);
			}else{
                jQuery('#preloader .loader').hide();
                jQuery('#preloader .inside').html(data.message);
                jQuery('#preloader .message').fadeIn(300);

                setTimeout(function(){
                    jQuery('#preloader .message').fadeOut();
                },1500);

                if(jQuery('#topline .links')){
                    jQuery('#topline .links').replaceWith(data.toplink);
                }
			}
		}
	});
}