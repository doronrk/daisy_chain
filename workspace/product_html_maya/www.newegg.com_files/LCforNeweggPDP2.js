
/**
 * Created by Liveclicker
 * Newegg PDP Project
 *
 * Author: Carolina
 * Date: 23 September 2013
 *
 *Implements the video in the product page.
 *
 */

var listOfWidgets;
var oldwid;
//defaults
var player_ID =1783;
var videoWidth = 320;
var videoHeight = 180;
var Overlay_player_ID =1808;
var vendor_Player_ID= 2146;
var Overlay_videoWidth = 700;
var Overlay_videoHeight = 400;
var div_ID = "lcVideo";
var div_thumb_Class='lcThumbs';
var dim1;
var dim2;
var dim3;
var dim4;
var dim5;
var dim6;
var dim7;
var dim8;
var dim9;
var videoTitle = true;
var theresVideo=false;
var key = "Item";
var multipleVideos=false;
var addedEventShowImg=false;
var _player;
var visibleDivThumbs;
var visibleDivPlayer;


function onLCPlayerLoaded(player) {
    _player=player;
}

jQuery(document).ready(function(){


    /// Global Variables
    //This section retrieves the variables set on the page.

    if (! (typeof _LCvideoTitle === 'undefined')){
        videoTitle=_LCvideoTitle;
    }

    if (! (typeof _LCplayer_ID === 'undefined')){
        player_ID=_LCplayer_ID ;
    }
    if (! (typeof _LCvideoWidth === 'undefined')){
        videoWidth=_LCvideoWidth;
    }
    if (! (typeof _LCvideoHeight  === 'undefined')){
        videoHeight=_LCvideoHeight ;
    }

    if  (!(typeof _LCdiv_ID === 'undefined')){
        div_ID=_LCdiv_ID ;
    }
    if (!(typeof _LCdim1  === 'undefined' )) {
        dim1=_LCdim1;
        theresVideo=true;
    }
    if (!(typeof _LCdim2  === 'undefined' )) {
        dim2=_LCdim2;
        theresVideo=true;
    }
    if (!(typeof _LCdim3  === 'undefined' )){
        dim3=_LCdim3;
        theresVideo=true;
    }
    if (!(typeof _LCdim4  === 'undefined' )){
        dim4=_LCdim4;
        theresVideo=true;
    }
    if (!(typeof _LCdim5  === 'undefined' )) {
        dim5=_LCdim5;
        theresVideo=true;
    }
    if (!(typeof _LCdim6  === 'undefined' )) {
        dim6=_LCdim6;
        theresVideo=true;
    }
    if (!(typeof _LCdim7  === 'undefined' )) {
        dim7=_LCdim7;
        theresVideo=true;
    }
    if (!(typeof _LCdim8  === 'undefined' )) {
        dim8=_LCdim8;
        theresVideo=true;
    }
    if (!(typeof _LCdim9  === 'undefined' )) {
        dim9=_LCdim9;
        theresVideo=true;
    }



    /// !Global Variables
    //

    var lcInterval = setInterval( function() {

        if (!window.lc) return;
        clearInterval(lcInterval);



        lc.account_id = 2437;
        var tid = setInterval( function () {
            if ( jQuery("#A2").length < 1 ) return;
            clearInterval( tid );



    var lcResult=jQuery("#bcaBreadcrumbTop dd:last em").html();

    if (lcResult){
            dim1 = lcResult;
            theresVideo=true;


    }

            if  ( theresVideo &&( jQuery(".navThumbs").length > 0 || jQuery("#A2").length > 0)){
                lc({
                    'dim1': dim1,
                    'dim2': dim2,
                    'dim3': dim3,
                    'dim4': dim4,
                    'dim5': dim5,
                    'dim6': dim6,
                    'dim7': dim7,
                    'dim8': dim8,
                    'dim9': dim9,
                    'order': 'recent',
                    'extra_options' : {
                        'include_description' : 'true',
                        'include_extra_images' : 'true',
                        'return_dimensions' : '6'
                    }
                }).isReady(function(){
                    var i = 0;
                    var maxListLength =15;
                    var listLength = lc(this).length;
                    listOfWidgets = lc(this);
                    var nothumbs=false;
                    if (listLength > 0) { //if there are videos for this product

                        //add the video thumbnail to the thumbnail strip below the main image

                        visibleDivThumbs = jQuery(".navThumbs:visible");
                        var nyy = jQuery(visibleDivThumbs).parent();
                        visibleDivPlayer = jQuery(nyy).find('#A2');

                        if  (visibleDivThumbs.length>0){
                            jQuery(visibleDivThumbs).css("margin-left","40px");
                            var myCode= '<div id="lcVideoThumb" ><img src="http://edge.liveclicker.net/images/client/2437/imageassets/image3423.png" /></div>';
                            jQuery(myCode).insertAfter(visibleDivThumbs);
                            myCode='<div id="lcWrap"></div>';
                            jQuery(myCode).insertAfter(visibleDivPlayer);
                        }else{
                             var diva2= jQuery(".mainSlide:visible").parent()
                              if(visibleDivPlayer.length==0 && diva2.length>0){
                            visibleDivPlayer = diva2;
                        }
                            myCode= '<div id="lcVideoThumb" ><img src="http://edge.liveclicker.net/images/client/2437/imageassets/image3423.png" /></div>';
                            jQuery(myCode).insertAfter((visibleDivPlayer));
                            myCode='<div id="lcWrap"></div>';
                            jQuery(myCode).insertAfter(visibleDivPlayer);
                            nothumbs=true;
                            jQuery("#lcVideoThumb").css("margin-top","-0px");
                        }
jQuery("#lcVideoThumb").attr('title', "Watch " +  listOfWidgets.getByIndex(0).title );
                        //creates the html code for the video container and appends it to the video player div

                        myCode = '<div id="lcVideo"></div><div class="lcThumbs" style="display:none"></div><div id="backToImg"><img src="http://edge.liveclicker.net/images/client/2437/imageassets/image3610.gif" /></div>';
                        jQuery("#lcWrap").append(myCode);
                        myCode = ' <div id ="LiveclickerVideoDiv" > </div>';
                        jQuery("#"+div_ID).append(myCode);

                        //creates the code for the thumbnails container and appends it to the video thubmnails div
                        myCode = '<div  id="LiveclickerThumbnailDiv" class="jcarousel-skin-tango" > <ul id="mycarousel"></ul> </div>';
                        jQuery("."+div_thumb_Class).append(myCode);

                        jQuery("#lcVideo").hide();

                        // creates the same elements for the overlay
                        myCode='<div id="OverlaylcWrap" style="display:none"></div>';
                        jQuery("body").append(myCode);
                        myCode='<div class="OverlaylcThumbs" style="display:none"><div id="OverlayImagesTitle">Images</div><div id="OverlayVideosTitle">Videos</div></div>';
                        jQuery("body").append(myCode);
                        myCode = '<div id="OverlaylcVideo"></div>';
                        jQuery("#OverlaylcWrap").append(myCode);
                        myCode = ' <div id ="OverlayLiveclickerVideoDiv" > </div>';
                        jQuery("#OverlaylcVideo").append(myCode);

                        //creates the code for the thumbnails container and appends it to the video thubmnails div
                        myCode = '<div  id="OverlayLiveclickerThumbnailDiv" class="jcarousel-skin-tango" > <ul id="Overlaymycarousel"></ul> </div>';
                        jQuery(".OverlaylcThumbs").append(myCode);

                        jQuery("#lcVideoThumb").show();

                        jQuery("#lcWrap").hide();

                        jQuery("#lcThumbs").hide();

                        if (listLength > 0){

                            while ((i < maxListLength) && (i < listLength)) //loop throug the video list, create the li elenents for the carousel and add them to the correspondant div
                            {
                                ////overlay

                                jQuery("#Overlaymycarousel").append('<li class="Overlaylcelement" id="Overlaylcelement'+i+'"> <div id="Overlaylcthumbnail'+i+'" class = "Overlaylcthumb"><div id="Overlayplaybtn'+i+'" class="Overlayplaybtn"></div></div></li>');
                                if (lc(this).getByIndex(i).extra_image_small !== ""){
                                    myCode= '<img index="'+i+'" widget_id="'+lc(this).getByIndex(i).widget_id +'" src="'+lc(this).getByIndex(i).extra_image_small+'"width="60" height="45">';
                                    jQuery("#Overlaylcthumbnail"+i).append(myCode);
                                }else{
                                    lc(this).getByIndex(i).getThumbnail({
                                        'width' :60,
                                        'height' :45
                                    })
                                    .appendTo(jQuery("#Overlaylcthumbnail"+i));
                                }

                                jQuery("#Overlaylcthumbnail"+i).attr("index",i);
                                jQuery("#lOverlaycthumbnail"+i).append('<div id="OverlaylcthumBorder'+(i)+'" class="OverlaylcthumBorder">');
                                jQuery("#Overlaylcthumbnail"+i).attr('title', "Watch " +  listOfWidgets.getByIndex(i).title );
                                jQuery("#Overlaylcelement"+(i)).click(function(){ //asociates the click function that launches the video player

                                    var objt= jQuery(this);
                                    if((jQuery(this).attr("class")=="Overlayplaybtn")||
                                        (jQuery(this).attr("class")=="Overlaylcthumb")||
                                        (jQuery(this).attr("class")=="Overlaylctitle") ||
                                        (jQuery(this).attr("class")=="OverlaylctitleBG")){
                                        objt= jQuery(this).parent();
                                    }
                                    globalElementID=jQuery(objt).attr("id");
                                    var thumbhtml =objt.children(".Overlaylcthumb");
                                    var values = thumbhtml.html().split("widget_id");
                                    var wid= values[1];
                                    wid = wid.split(" ");
                                    wid=wid[0];
                                    wid= wid.replace(/"/g, '');
                                    wid= wid.replace(/=/g, '');
                                    jQuery("#OverlayLiveclickerVideoDiv").empty();
                                    var usePlayer= Overlay_player_ID;
                                    if  (("Vendor" in listOfWidgets.getByWidgetId(wid).dim6))  usePlayer= vendor_Player_ID;
                                    listOfWidgets.getByWidgetId(wid).getPlayer({
                                        'player_id': usePlayer,
                                        'width' : Overlay_videoWidth,
                                        'height' : Overlay_videoHeight,
                                        'autoplay':true,
                                        'bufferTime':0,
                                        'container': 'OverlayLiveclickerVideoDiv'
                                    }).appendPlayerTo({
                                        'id' : 'OverlayLiveclickerVideoDiv'
                                    }).show();

                                    jQuery("#widViewer").hide();
                                    jQuery("#OverlaylcWrap").show();
                                    if(jQuery("#OverlayLiveclickerVideoDiv > div").size()>1){
                                        jQuery("#OverlayLiveclickerVideoDiv :div first").remove();
                                    }
                                    if (!addedEventShowImg){
                                        addedEventShowImg=true;
                                        jQuery(".blockLinkSi, .blockLinkSi img, #segImageList li, .GalleryContainer2011Mask_on, .galleryBtnClose").click(function(){
                                            jQuery("#widViewer").show();
                                            jQuery("#OverlayLiveclickerVideoDiv").empty();
                                            jQuery("#OverlaylcWrap").hide();
                                        });
                                    }
                                });
                                if (listLength > 1){
                                    /////////////////////////////////////////// in page
                                    multipleVideos = true;
                                    jQuery("#lcVideoThumb").show();
                                    jQuery("#mycarousel").append('<li class="lcelement" id="lcelement'+i+'"> <div id="lcthumbnail'+i+'" class="lcthumb"><div id="playbtn'+i+'" class="playbtn"></div></div></li>');


                                    if (lc(this).getByIndex(i).extra_image_small !== ""){
                                        myCode= '<img index="'+i+'" widget_id="'+lc(this).getByIndex(i).widget_id +'" src="'+lc(this).getByIndex(i).extra_image_small+'"width="48" height="32">';
                                        jQuery("#lcthumbnail"+i).append(myCode);
                                    }else{
                                        lc(this).getByIndex(i).getThumbnail({
                                            'width' :48,
                                            'height' :32
                                        })
                                        .appendTo(jQuery("#lcthumbnail"+i));
                                    }


                                    jQuery("#lcthumbnail"+i).attr("index",i);
                                    jQuery("#lcthumbnail"+i).append('<div id="lcthumBorder'+(i)+'" class="lcthumBorder">');

                                    jQuery("#lcelement"+(i)).click(function(){ //asociates the click function that launches the video player

                                        var objt= jQuery(this);
                                        if((jQuery(this).attr("class")=="playbtn")||
                                            (jQuery(this).attr("class")=="lcthumb")||
                                            (jQuery(this).attr("class")=="lctitle") ||
                                            (jQuery(this).attr("class")=="lctitleBG")){
                                            objt= jQuery(this).parent();
                                        }
                                        globalElementID=jQuery(objt).attr("id");
                                        var thumbhtml =objt.children(".lcthumb");
                                        var values = thumbhtml.html().split("widget_id");
                                        var wid= values[1];
                                        wid = wid.split(" ");
                                        wid=wid[0];
                                        wid= wid.replace(/"/g, '');
                                        wid= wid.replace(/=/g, '');
                                        jQuery("#LiveclickerVideoDiv").empty();
                                        var usePlayer= player_ID;
                                        if  (("Vendor" in listOfWidgets.getByWidgetId(wid).dim6))  usePlayer= vendor_Player_ID;
                                        listOfWidgets.getByWidgetId(wid).getPlayer({
                                            'player_id': usePlayer,
                                            'width':videoWidth,
                                            'height' : videoHeight,
                                            'autoplay':true,
                                            'bufferTime':0,
                                                'container': 'LiveclickerVideoDiv'
                                        }).appendPlayerTo({
                                            'id' : 'LiveclickerVideoDiv'
                                        }).show();

                                        jQuery(".lctitle").show();
                                        jQuery(".lctitleBG").show();
                                        if(jQuery("#LiveclickerVideoDiv > div").size()>1){
                                            jQuery("#LiveclickerVideoDiv :div first").remove();
                                        }


                                    });


 jQuery("#lcthumbnail"+i).attr('title', "Watch " +  listOfWidgets.getByIndex(i).title );
                                }
                                i++;
                            }
                        }


                        oldwid= lc(this).getByIndex(0).widget_id;
                        jQuery("#lcthumbnail0").addClass("selected");

                        jQuery("#lcVideoThumb, #lcVideoThumb div, lcVideoThumb img").click(function(){
                            jQuery(visibleDivPlayer).hide();
                            jQuery("#lcWrap").show();
                            if (multipleVideos || nothumbs){

                                jQuery("#lcVideoThumb").hide();
                                jQuery("#backToImg").show();
                                jQuery(visibleDivThumbs).hide();
                                jQuery(".lcThumbs").show();
                            }else{
                                jQuery(".lcThumbs").hide();
                            }

                            jQuery("#lcVideo").show();
                            var usePlayer= player_ID;
                            if  (("Vendor" in listOfWidgets.getByWidgetId(oldwid).dim6))  usePlayer= vendor_Player_ID;
                            listOfWidgets.getByWidgetId(oldwid).getPlayer({
                                'player_id': usePlayer,
                                'width':videoWidth,
                                'height' : videoHeight,
                                'bufferTime':0,
                                 'container': 'LiveclickerVideoDiv'
                            }).appendPlayerTo({
                                'id' : 'LiveclickerVideoDiv'
                            }).show();
                        });






                        jQuery("#backToImg, .navThumbs").click(function(){
                            jQuery(visibleDivPlayer).show();
                            jQuery("#lcWrap").hide();
                            jQuery("#lcVideoThumb").show();
                            jQuery(visibleDivThumbs).show();
                            jQuery("#LiveclickerVideoDiv").empty();
                        });

                        if (jQuery("#mycarousel > li").size()>3){ //creates carousel if there are more than three videos for that product
                            jQuery('#mycarousel').jcarousel({
                                wrap: 'circular',
                                scroll: 1,
                                visible: null
                            });
                            jQuery('#Overlaymycarousel').jcarousel({
                                wrap: 'circular',
                                scroll: 1,
                                visible: null
                            });



                        }else{

                            jQuery("#LiveclickerThumbnailDiv").width("270px");
                            jQuery("#LiveclickerThumbnailDiv").css("text-align", "left");
                            jQuery("#mycarousel").css("margin-left","50");
                            jQuery("#mycarousel").css("margin-top","4");
                            jQuery("#mycarousel").css("list-style-type","none");

                            jQuery("#OverlayLiveclickerThumbnailDiv").width("270px");
                            jQuery("#OverlayLiveclickerThumbnailDiv").css("text-align", "left");
                            jQuery("#Overlaymycarousel").css("margin-left","13");
                            jQuery("#Overlaymycarousel").css("padding","0");
                            jQuery("#Overlaymycarousel").css("list-style-type","none");
                        }


                    }

                });


            }

        }, 100 );
    }, 100 );

});

