/**
 * Created by Liveclicker
 * GNC  PDP Project
 *
 * Author: Carolina
 * Date: 20 May 2013
 *
 *Implements the video in the product page.
 *
 */

lc.account_id = 2069;

var listOfWidgets;
var key="productId";
var oldwid;
//defaults
var player_ID =1660;
var videoWidth = 287;
var videoHeight = 220;
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
jQuery(document).ready(function(){
    jQuery.browser={};
    (function(){
        jQuery.browser.msie=false;
        jQuery.browser.version=0;
        if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
            jQuery.browser.msie=true;
            jQuery.browser.version=RegExp.$1;
        }
    })();

    var lcResult=new RegExp(key + "=([^&]*)","i").exec(window.location.search);

    if (lcResult){
        if (lcResult[1]){
            dim1 = lcResult[1];
            theresVideo=true;
        }

    }
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

    if  (jQuery(".productImageBlock").length > 0 && theresVideo) {

        // create video html

        myCode = '<div id="lcWrap">'

        + '<div id="lcVideo"><div id="lcinner"><div id="LiveclickerVideoDiv"></div></div></div>'

        + '<div class="lcThumbs"><div id="LiveclickerThumbnailDiv" class="jcarousel-skin-tango">'

        + '<ul id="mycarousel"></ul>'

        + '</div></div></div>';



        // add video html to the video container

        jQuery("#lcContainer").append(myCode);


        //this is the liveclicker query for videos
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
                'include_description' : 'true'
            }
        }).isReady(function(){
            var i = 0;
            var maxListLength =15;
            var listLength = lc(this).length;
            listOfWidgets = lc(this);
            var index = 0;

            if (listLength > 0) { //if there are videos for this product


                // call to the ebay function that will enable the video tab and handle the user clicks

                enableVideoTab();


                //add the video thumbnail to the thumbnail strip on the right

                lc(this).getByIndex(i).getThumbnail({
                    'width' :107,
                    'height' :60
                }).appendTo(jQuery("#lcVideoThumb"));
                var lcplaybtn='<div class="playbtn" style="left: 12px; margin-top: -78px;"></div>';
                jQuery(lcplaybtn).appendTo(jQuery("#lcVideoThumb"));


                if (listLength > 1){

                    while ((i < maxListLength) && (i < listLength)) //loop throug the video list, create the li elenents for the carousel and add them to the correspondant div
                    {
                        jQuery("#mycarousel").append('<li class="lcelement" id="lcelement'+i+'"> <div id="lcthumbnail'+i+'" class="lcthumb"><div id="playbtn'+i+'" class="playbtn"></div></div></li>');
                        lc(this).getByIndex(i).getThumbnail({
                            'width' :107,
                            'height' :62
                        })
                        .appendTo(jQuery("#lcthumbnail"+i))        ;

                        jQuery("#lcthumbnail"+i).attr("index",i);

                        jQuery("#lcthumbnail"+i).append('<div id="lcthumBorder'+(i)+'" class="lcthumBorder">');

                        jQuery("#lcelement"+(i)).click(function(){ //asociates the click function that launches the video player
                            jQuery("#LiveclickerVideoDiv").empty();
                            var objt= jQuery(this);
                            if((jQuery(this).attr("class")=="playbtn")||
                                (jQuery(this).attr("class")=="lcthumb")){
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
                            //  jQuery("#lcVideo").show();
                            //  jQuery("#mainimage").hide();



                            jQuery("#LiveclickerVideoDiv").empty();

                            listOfWidgets.getByWidgetId(wid).getPlayer({
                                'player_id': player_ID,
                                'width':videoWidth,
                                'height' : videoHeight,
                                'autoplay':true
                            }).appendPlayerTo({
                                'id' : 'LiveclickerVideoDiv'
                            }).show();

                            jQuery(".selected").removeClass("selected");


                            jQuery(thumbhtml).addClass("selected");
                            var id=  jQuery(thumbhtml).attr('id');
                            jQuery("#"+id+" ~ div").hide();

                            if(jQuery("#LiveclickerVideoDiv > div").size()>1){
                                console.log("doble");
                                jQuery("#LiveclickerVideoDiv > div :first").remove();
                            }


                        });

                        i++;
                    }



                }


                lc(this).getByIndex(0).getPlayer({
                    'player_id': player_ID,
                    'width':videoWidth,
                    'height' : videoHeight
                }).appendPlayerTo({
                    'id' : 'LiveclickerVideoDiv'
                }).show();
                oldwid= lc(this).getByIndex(0).widget_id;
                //     if("#LiveclickerVideoDiv :children").size()>
                jQuery("#lcthumbnail0").addClass("selected");
                jQuery("#lcVideo").show();
                if (jQuery("#mycarousel > li").size()>4){ //creates carousel if there are more than three videos for that product
                    jQuery('#mycarousel').jcarousel({
                        wrap: 'circular',
                        scroll: 1,
                        visible: null
                    });



                }else{
                    var lcmymarginleft= 198/-2/3*jQuery("#mycarousel > li").size();
                    jQuery("#LiveclickerThumbnailDiv").width("300px");
                    jQuery("#LiveclickerThumbnailDiv").css("position", "relative");
                    jQuery("#mycarousel").css("left","50%");
                    jQuery("#mycarousel").css("margin-left", lcmymarginleft);
                    jQuery("#mycarousel").css("margin-top","4");
                    jQuery(".lcelement").css("margin-left", "3");
                    jQuery("#mycarousel").css("list-style-type","none");
                    jQuery("#mycarousel").css("position","relative");
                //  if (jQuery.browser.msie  && parseInt(jQuery.browser.version, 10) === 8) {

                //     jQuery("#mycarousel").css("padding-left","0");

                //}

                }

                jQuery("#imagesTab").addClass("active");

               var isIE8 = $.browser.msie && +$.browser.version === 8;



            }

        });


    }

});