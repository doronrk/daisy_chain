/*jQuery.noConflict();*/
jQuery(document).ready(function(){
    jQuery('.fancybox').fancybox(
        {
            hideOnContentClick : true,
            width: 876,
            height:450,
            margin:0,
            padding:0,
            autoDimensions: true,
            type : 'iframe',
            showTitle: false,
            scrolling: 'no',

            onComplete: function(){
                jQuery('#fancybox-frame').load(function () {
                    jQuery('#fancybox-content').height(jQuery(this).contents().height());
                    jQuery.fancybox.resize();

                });
            }
        }
    );
});
function showOptions(id){
    jQuery('.popup_fancybox'+id).trigger('click');
}
function setAjaxData(data,iframe){
    if(data.status == 'ERROR'){
        alert(data.message);
    }else{
        if(jQuery('.ul_wrapper.toplinks')){
            jQuery('.shoppingcart').replaceWith(data.sidebar);
        }



        jQuery(".shoppingcart").bind('mouseenter',function() {
            jQuery(".shopping_cart_mini",this).stop(true, true).fadeIn(200, "linear");
        });

        jQuery(".shoppingcart").bind('mouseleave',function() {
            jQuery(".shopping_cart_mini",this).stop(true, true).fadeOut(200, "linear");
        });



        if(jQuery('#topline .links')){
            jQuery('#topline .links').replaceWith(data.toplink);
        }
        jQuery.fancybox.close();


        jQuery('#preloader .inside').html(data.message);
        jQuery('#preloader .message').fadeIn(300);

            setTimeout(function(){
                jQuery('#preloader .message').fadeOut();
                jQuery('.product-tocart a').fadeIn();
            },1500)




    }
}
function setLocationAjax(url,id){
    url += 'isAjax/1';
    url = url.replace("checkout/cart","ajax/index");



        jQuery('#preloader .loader').fadeIn(300);
        jQuery('.product-tocart a').fadeOut();
        try {
            jQuery.ajax( {
                url : url,
                dataType : 'json',
                success : function(data) {
                    jQuery('#preloader .loader').hide();
                    setAjaxData(data,false);

                }
            });
        } catch (e) {

        }


}