function extendedShelfHeader(){
    if(!$('#shelf_header .disableExtended').length){
         var isSearchPage = (window.location.href.indexOf('/store/search/search_results.jsp')>0)?true:false;
        if(window.location.href.indexOf('/store/browse/shelf.jsp')>0 || isSearchPage){
            
            var shelfId = ($('#shelf_header .extendedHTML').length)?"#shelf_header .extendedHTML":"#shelf_header";
            var bannerId = ($('#banner .extendedHTML').length)?'#banner .extendedHTML':'#content #banner';
            var mBox = '#mboxImported-default-whbm_shelf_promo1-0';
            var bannerPos = ($('#banner .bannerTop,#mboxImported-default-whbm_shelf_promo1-0 .bannerTop').length)?'t':'b';
            var fsImg = true;

            //Check if Possible Facet Page
            if(!$(shelfId).length && window.location.href.indexOf('/store/browse/shelf.jsp')<0){
                shelfId = '#content #feature'
            }
              /* if(isSearchPage){
             if($('#shelf #banner').length >= 1){
             //Had to modify check to work on IE7 & IE8.  Duplicate #banner used
             var searchBannerDuplicate = $('#shelfAjax div').eq(0).attr('id');
             if(searchBannerDuplicate == 'banner'){
             //On search page with duplicate banners
             //$('#shelf #banner').attr('style','display:none !important;');
             fsImg = false;
             $('#shelf #banner img').css({'width':'803px','height':'auto'});
             $('#shelfAjax div').eq(0).remove();
             }

             }

             }*/

            $('#content.shelfContent').prepend($(shelfId));
            $(shelfId,bannerId,mBox).css({'width':'100%'});

            //Position Shelf Banner
            (bannerPos != 'b')?$('#content.shelfContent').prepend($(bannerId)):$('#content #main-content').prepend($(bannerId));
            if($(mBox).is(':visible'))(bannerPos != 'b')?$(shelfId).before($(mBox)):$(shelfId).after($(mBox));

            //Fixes T&T Image Resize to 100%
            if(fsImg){
                $(shelfId+' img, '+bannerId+' img, '+mBox+' img').not('.no-resize').css({'width':'100%','height':'auto'});
            }

            //CallBacks
            if(typeof extendedMoveComplete != 'undefined'){
                extendedMoveComplete();
            }

        }
    }
}