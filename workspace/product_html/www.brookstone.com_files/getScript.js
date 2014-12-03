var firstVideo;
var _player;
var done=false;


function endPreview() {

    if(firstVideo>-1) {
        jQuery("#videosPrev").fadeIn("slow")  ;
    }else {
        jQuery("#imageplaybtn").hide();
        jQuery("#videosPrev").hide()  ;
    }

    jQuery("#preview_wrap").fadeOut("slow", function(){
        jQuery("#image_wrap").fadeIn("slow");
        jQuery("#imageplaybtn").fadeIn("slow");
    });


//    jQuery("#preview_wrap").empty();
}
function updatePlayerData() {
    var playerSettings = _player.getSettings();

    if (playerSettings.playTime > 0.90 * playerSettings.totalTime) {
        endPreview();
        done=true;
    }else{

        window.setTimeout(updatePlayerData,100);
    }
}

function onLCPlayerLoaded(player) {
    if(!done){
        _player = player;
        updatePlayerData();
    }
}


head(function(){
    jQuery(document).ready(function(){
        var lcInterval = setInterval( function() {

            if (!window.lc) return;
            clearInterval(lcInterval);

            function contains(a, obj) {
                var i = a.length;
                while (i--) {
                    if (a[i] === obj) {
                        return true;
                    }
                }
                return false;
            }

            var globalWidgetID ="";
            var globalElementID="";
            var globalVideo=false;
            // Define products that have running A/B tests, leave empty for no active tests
            var ab_test_products = [];
           // var ab_test_products = ['855317p','845812p'];
            //var ab_test_products = ['786406p','796087p','649525p'];
            // var ab_test_products = ['796087p','649525p'];
            //var ab_test_products = ['839107p'];

            var myCode = '<ul class="TabbedPanelsTabGroup" id="lcTabs"><li class="TabbedPanelsTab" id="imagesTab" goto="#product_images"><div id="imgCount" ></div></li><li class="TabbedPanelsTab" id="videoTab"  goto="#product_videos"><div id="vidCount"></div></li></ul>';

            jQuery(myCode).insertAfter("#product_text");

            jQuery("#product_images").addClass("lctabcontent");
            /*   myCode= '<div id="product_videos" style="display:none" class="lctabcontent">   <div id="video_wrap" class="viewer with_enlarge"></div><div id="video_wrap_enlarge" ></div><div id="lcthumbsContainer" align="center"><ul id="mycarousel" class="jcarousel-skin-tango"></ul></div><div id="imagesPrev" class="preview" goto="#product_images"></div></div>';*/
            myCode= '<div id="product_videos" style="display:none" class="lctabcontent">   <div id="video_wrap" class="viewer with_enlarge"></div><div id="video_wrap_enlarge" ></div><div id="lcthumbsContainer" align="center"><ul id="mycarousel" class="jcarousel-skin-tango"></ul></div></div>';
            jQuery(myCode).insertAfter("#product_images");
            myCode = '<div id="overlay_video_viewer"><a class="close" id="closeVideoOverlay"></a><div id="overlay_main_video_wrapper" class="viewer"></div></div>';
            jQuery(myCode).insertAfter("#overlay_image_viewer");
            //   myCode= '<div id="videosPrev" goto="#product_videos" class="preview"></div>';
            //  jQuery(myCode).insertAfter(".controls");

            myCode= '<div id="imageplaybtn" goto="#product_videos" style="display:none"></div>';
            jQuery("#product_images").append(myCode);
            jQuery("#videosPrev").hide();
            jQuery("#videoTab").hide();
            jQuery("#imagesTab").hide();
            lc.settings = {
                'account_id' : 1249
            };

            if (productID!="" && productID!=null && productID!=undefined){
                lc({
                    'dim1': productID,
                    'order': 'recent',
                    'extra_options' : {
                        'return_dimensions' : '9'
                    }
                }).isReady(function(){

                    var i = 0;
                    var listLength = lc(this).length;
                    var listOfWidgets = lc(this);
                    firstVideo=-1;
                    var hasPreview=-1;
                    var playMeFirst=0;

                    var imgCount = jQuery(".group").children(".thumb").size();
                    jQuery("#imgCount").append("Images ("+imgCount+")");
                    if (listLength > 0) {
                        globalVideo=true;
                        //  jQuery(".scrollable").css("width","265px");
                        //   jQuery(".controls ").css("width","335px");
                        if (contains(ab_test_products,productID)){
                            jQuery("#vidCount").append("Videos (1)");
                        }else{

                            jQuery("#vidCount").append("Videos ("+listLength+")");
                        }

                        var choosevidkey = 'widget';
                        var url = window.location.href;
                        var choosenOne=0;
                        var chooseVideo=false;
                        if(url.indexOf(choosevidkey) != -1){
                            chooseVideo=true;
                            var lcResult=new RegExp(choosevidkey + "=([^&]*)","i").exec(window.location.search);
                            if (lcResult){
                                if (lcResult[1]){
                                    choosenOne= lcResult[1];
                                }
                            }
                        }
                        while (i < listLength) {
                            if (contains(ab_test_products,productID)){
                                i = Math.floor((Math.random()*(listLength))+1);
                                i--;
                                playMeFirst=i;
                            }
                            if (!("preview"  in listOfWidgets.getByIndex(i).dim9)) {
                                if (listOfWidgets.getByIndex(i).widget_id==choosenOne) playMeFirst=i;
                                jQuery("#mycarousel").append('<li id="lcelement'+(i+1)+'" class="lcContainer"><div class="playbtn"></div><div id="lcthumbnail'+(i+1)+'" class="lcthumb"></div><div id="lctitle'+(i+1)+'" class="lctitle"></div></li>');
                                lc(this).getByIndex(i).getThumbnail({
                                    'width' : 60,
                                    'height' : 50
                                })
                                .appendTo(jQuery("#lcthumbnail"+(i+1)));
                                jQuery("#lcelement"+(i+1)).click(function(){
                                    jQuery("#video_wrap").empty();
                                    var objt= jQuery(this);
                                    if((jQuery(this).attr("class")=="playbtn")||
                                        (jQuery(this).attr("class")=="lcthumb")||
                                        (jQuery(this).attr("class")=="lctitle")){
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
                                    listOfWidgets.getByWidgetId(wid).getPlayer({
                                        'player_id': 1105,
                                        'width':400,
                                        'height': 400,
                                        'autoplay':true
                                    }).appendPlayerTo({
                                        'id' : 'video_wrap'
                                    }).show();
                                    globalWidgetID=wid;
                                });
                                if (!firstVideo>-1)   firstVideo=i;
                                jQuery("#lctitle"+(i+1)).append(listOfWidgets.getByIndex(i).title);
                                if (!contains(ab_test_products,productID)){
                                    i++;
                                }else{
                                    break;
                                }

                            }
                            else {
                                hasPreview=i;
                                i++;
                                myCode="";
                                myCode= '<div id="preview_wrap"  style="display:none; width: 400px; height: 400px;  z-index: 150000;  margin-bottom: 10px; border: 1px solid #CCC; overflow: hidden;"></div>';
                                jQuery(myCode).insertAfter("#image_wrap");


                            }

                        }
                        if (!contains(ab_test_products,productID)){
                            i = firstVideo;
                        }

                        var isiPad = navigator.userAgent.match(/iPad/i) != null;
                        if (hasPreview >-1 && !isiPad) {


                            jQuery("#preview_wrap").empty();
                            var previewPlayer =  lc(this).getByIndex(hasPreview).getPlayer({
                                'player_id': 1398,
                                'width':400,
                                'height': 400,
                                'autoplay':true,
                                'looping':true,
                                'smoothing':true,
                                'buffer_time':0,
                                'miniplayer':true,
                                'option_stageBGColor':000000
                            });
                            previewPlayer.appendPlayerTo({
                                'id' : 'preview_wrap'
                            });

                            jQuery("#imageplaybtn").hide();
                            jQuery("#image_wrap").fadeOut( function(){
                                jQuery("#preview_wrap").fadeIn("slow");
                            });


                        }

                        if (firstVideo>-1) {
                            jQuery("#videosPrev").show();

                            jQuery("#imageplaybtn").show();
                            jQuery("#lctitle0").append(lc(this).getByIndex(i).title);
                            jQuery("#video_wrap").empty();
                            lc(this).getByIndex(playMeFirst).getPlayer({
                                'player_id': 1105,
                                'width':400,
                                'height': 400,
                                'autoplay':true
                            }).appendPlayerTo({
                                'id' : 'video_wrap'
                            }).show();

                            globalWidgetID=lc(this).getByIndex(playMeFirst).widget_id;
                            globalElementID ="lcelement1";
                            if (jQuery("#mycarousel > li").size()>5){
                                jQuery('#mycarousel').jcarousel({
                                    wrap: 'circular',
                                    scroll: 1,
                                    visible: null
                                });
                            }else {

                                jQuery("#lcthumbsContainer").css ("margin-left",35);
                            }
                             jQuery("#lcthumbsContainer").css ("margin-top",-31);
                            jQuery("#videoTab").show();
                            jQuery("#imagesTab").show();
                            //show video tab and autoplay video when it comes from an email express campaing url?EE
                            var emailKey = '?EE';
                            var url = window.location.href;
                            if(url.indexOf(emailKey) != -1 || chooseVideo==true){
                                jQuery("#videoTab").click();
                            }

                        //
                        }
                    }

                });
            }




            jQuery("#lcTabs li, #videosPrev, #imagesPrev, #imageplaybtn").click(function() {
                jQuery("#lcTabs li").removeClass('active');
                if ((jQuery(this).attr("class")=="preview")){
                    if (jQuery(this).attr("id")=="imagesPrev"){
                        jQuery("#imagesTab").addClass("active");
                    }else{
                        jQuery("#videoTab").addClass("active");
                    }
                }else if (jQuery(this).attr("id")=="imageplaybtn"){
                    jQuery("#videoTab").addClass("active");
                }
                else{
                      if (jQuery(this).attr("id")=="imagesTab")
                      {
                	   if (_player!=null)
                		_player.sendEvent("pause");
                     }
                    jQuery(this).addClass("active");
                }
                jQuery(".lctabcontent").hide();
                var selected_tab = jQuery(this).attr("goto");
     jQuery(selected_tab).fadeIn();
                return true;
            });
            jQuery("#imagesTab").addClass("active");
            jQuery("#video_wrap_enlarge").click(function(){
                jQuery("#overlay_main_video_wrapper").empty();
                var script=document.createElement('script');
                script.type='text/javascript';
                script.src="http://sv.liveclicker.net/service/getEmbed?client_id=1249&widget_id="+globalWidgetID+"&width=700&height=600&div_id=overlay_main_video_wrapper&player_custom_id=1107&autoplay=true";
                jQuery("body").append(script);
                jQuery("#video_wrap").empty();
                jQuery("#overlay_video_viewer").show();
            });
            jQuery("#closeVideoOverlay").click(function(e){
                e.preventDefault();
                jQuery("#overlay_main_video_wrapper").empty();
                jQuery("#overlay_video_viewer").hide();
                jQuery("#"+globalElementID).click();
                return false;
            });
            jQuery(".scrollable .thumb img").click(function(e){
                if (globalVideo){
                    if (jQuery(this)[0]===jQuery(".thumb:first img")[0]){
                        jQuery("#imageplaybtn").show();
                    }else{
                        jQuery("#imageplaybtn").hide();
                    }
                }
            });

        }, 50);
    });
});