/*
 * Created by Liveclicker
 *
 * Zales PDP Project
 *
 * Author: Carolina
 *
 *  Date: 19 July 2013
 *
 *
 *Implements the video in the product page.
 *
 *Reviewed October 7th
 *
 */


var _player = null;

var isiPad = false;

var productID ;

var categoryID;

var key = "productId";

var dim1="";

lc.settings = {
    'account_id' :1483
};
var theresVideo = false;

jQuery(document).ready(function(){

    var lcResult=new RegExp(key + "=([^&]*)","i").exec(window.location.search);

    if (lcResult){
        if (lcResult[1]){
            dim1 = lcResult[1];
            if (dim1!=""){
                theresVideo=true;
                console.log("found product id, dim1 = "+dim1);

            }
        }

    }


    isiPad = navigator.userAgent.match(/iPad/i) != null;


    console.log("searches for video, dim1 = "+dim1);

    if (theresVideo){
        lc({
            'dim1': dim1
        }).isReady(function(){
            var listOfWidgets = lc(this);

            if (listOfWidgets.length > 0) {
                console.log("found video, dim1 = "+dim1 +" videos are"+ listOfWidgets );
                jQuery(".video-link").empty();
                var myCode ='<div id="lcthumb"> <div id="lcPlayBtn" > </div> </div>';
                jQuery(".video-link").prepend(myCode);
                jQuery(".video-link a").hide();
                myCode ='<td id="productVideoCell" style ="width:400px; height:400px;display:none; "><div id="lcVideoWrapper" ></div></td>';
                jQuery("#productImageCell").after(myCode);

                console.log("insert thumb");
                listOfWidgets.getByIndex(0).getThumbnail({
                    'width' :138,
                    'height' :78
                }).appendTo(jQuery("#lcthumb"));

                myCode="<div style='font-weight:bold;'>Play Video</div>";
                jQuery(".video-link").append(myCode);
                jQuery(".video-link").width("80px");
                jQuery(".video-link").css("margin-top","12px");



                jQuery("#lcthumb").click(function (){

                    jQuery(".active").removeClass("active");
                    jQuery("#lcthumb").addClass("selected");
                    jQuery("#productImageCell").hide();
                    jQuery("#productVideoCell").show();
                    jQuery("#lcVideoWrapper").empty();
                    if (!isiPad){
                        listOfWidgets.getByIndex(0).getPlayer({
                            'player_id': 1703,
                            'width':400,
                            'height' :250,
                            'autoplay':true
                        }).appendPlayerTo({
                            'id' : 'lcVideoWrapper'
                        }).show();
                    }else{
                        listOfWidgets.getByIndex(0).getPlayer({
                            'player_id': 1885,
                            'width':400,
                            'height' :250,
                            'autoplay':true
                        }).appendPlayerTo({
                            'id' : 'lcVideoWrapper'
                        }).show();
                    }

                    jQuery(".productAltImageCell").click(function (){
                        jQuery("#lcVideoWrapper").empty();
                        jQuery(".selected").removeClass("selected");
                        jQuery("#productImageCell").show();
                        jQuery("#lcVideoWrapper").empty();
                        jQuery("#productVideoCell").hide();
                    });

                });


            }

        });

    }

});