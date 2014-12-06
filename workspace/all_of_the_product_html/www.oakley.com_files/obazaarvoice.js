$.oakleybazaarvoice = {
    initBazaarvoiceUI : function(data){
        'use strict';

        if(typeof $BV !== 'undefined'){
            if(data.prodArray){
                console.log(data.prodArray);
                $BV.ui('rr', 'inline_ratings', 
                    {
                        productIds : data.prodArray, 
                        containerPrefix : 'BVRRInlineRating'
                    }
                );
            }else{
                $BV.ui('rr', 'show_reviews', {});
            }
        }
    }
};
(function($){
    'use strict';

    $.globalEvents.on('initBVUI', function(e){
        $.oakleybazaarvoice.initBazaarvoiceUI(e);
    } );
}(jQuery));