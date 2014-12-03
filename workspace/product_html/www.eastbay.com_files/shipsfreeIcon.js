$(document).ready(function(){
    /* //Insert a Ships Free icon into the product image wrapper
     if($('#endeca_search_results').length > 0){
     $('#endeca_search_results').children('ul').children().each(function(){
     if($(this).children('.product_freeShipping').length > 0){
     var spanner = '<span class="shipsfreeIcon"></span>';
     var wrapper = $(this).children('.quickViewButtonWrap');
     wrapper.css('position', 'relative').prepend(spanner);
     }
     });
     }
     */
    //Handle search results page
    if($('#endeca_search_results').length > 0){
        $('#endeca_search_results').children('ul').children().each(function(){
            if($(this).children('.product_freeShipping').length > 0){
                //Replace the 'FREE Shipping' text with a Ships Free icon
                var icon = '<img src="/ns/common/images/ships-free-skinny.png" class="sfskinny" alt="Ships Free" border="0" style="vertical-align: middle;"/>';
                var wrapper = $(this).children('.product_freeShipping');
                wrapper.contents().each(function(){
                    if(this.nodeType != 3){return true;} //Skip it if not a text node
                    $(this).replaceWith(icon);
                });
            }
            //Attach a listener to the quickview buttons
            $('.quickviewButton').on('mousedown', function(e){
                //Check for Quickview every 100ms and then replace free shipping text with icon
                var checkForPDP = setInterval(function(){
                    if($('#quickview_freeShipping').length > 0){
                        $('#quickview_freeShipping').contents().each(function(){
                            var icon = '<img src="/ns/common/images/ships-free-skinny.png" class="sfskinny" alt="Ships Free" border="0" style="vertical-align: middle;" />';
                            if(this.nodeType != 3){return true;} //Skip it if not a text node
                            $(this).replaceWith(icon);
                        });
                        clearInterval(checkForPDP); //Kill interval checking
                    }
                    $('#QV_otherStyles').children('a').on('mousedown mouseover mouseout', function(){
                        setTimeout(function(){
                            $('#quickview_freeShipping').contents().each(function(){
                                var icon = '<img src="/ns/common/images/ships-free-skinny.png" class="sfskinny" alt="Ships Free" border="0" style="vertical-align: middle;" />';
                                if(this.nodeType != 3){return true;} //Skip it if not a text node
                                $(this).replaceWith(icon);
                            });
                        }, 250);
                    });
                }, 100);
            });
        });
    }
    //Handle PDP Pages
    if($('#pdp_container').length > 0 && $('#pdp_top').length > 0){
        if($('#pdp_form').find('#pdp_freeShipping').length > 0){
            //Insert a Ships Free icon into the product image wrapper
            var tryCount = 0;
            var wrapperListener = setInterval(function(){
                if($('#pdp_form').find('#pdp_freeShipping').html()!==''){
                    var spanner = '<span id="shipsfreeIcon"><span class="shipsfreeIconPDP"></span></span>';
                    var imgWrapper = $('#pdp_image');
                    imgWrapper.prepend(spanner);
                    clearInterval(wrapperListener);
                }
                tryCount++;
                if(tryCount>=20){clearInterval(wrapperListener);}
            }, 100);
            //Replace the 'Ships Free!' text on the PDP with the Ships Free Icon
            /*
             var wrapperListener = setInterval(function(){
             var icon = '<img src="/ns/common/images/ships-free-skinny.png" alt="Ships Free" border="0" />';
             var shipWrapper = $('#pdp_freeShipping');
             shipWrapper.contents().each(function(){
             if(this.nodeType != 3){return true;} //Skip it if not a text node
             $(this).replaceWith(icon);
             });
             }, 100);
             */

        }
    }
    //Free shipping side nav filter
    //Handle search results page
    if ($('#endeca_search_results').length > 0) {
        $('#Eligible_for_FREE_Shipping_control a').empty();
        $('#Eligible_for_FREE_Shipping_control a').html('<img src="/ns/images/sidenav/free-shipping-callout.gif" alt="Shop Items with Free Shipping" />');
        $('#Eligible_for_FREE_Shipping_control a').attr('title', 'Shop Items with Free Shipping');
    }
});