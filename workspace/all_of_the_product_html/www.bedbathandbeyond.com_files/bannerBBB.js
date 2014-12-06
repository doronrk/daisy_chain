function lcCreateBanner(lcwidgetlist_div, sku) {


			lc.account_id = 64;

			lc({'dim6': sku , 'extra_options' : {'include_description' :'true'}}).isReady(function(){
				var listLength = (lc(this).length>3)?2:lc(this).length;
				var listOfWidgets = lc(this);
				if (listLength > 0) {
                                    var lcplaylist = $('<div class="lcplaylist"/>');
                                    for (var i =0;i<listLength ; i++){
					var widget = listOfWidgets.getByIndex(i);
					var lcthumbnail = widget.thumbnail_normalized != undefined ? widget.thumbnail_normalized : listOfWidgets.getByIndex(i).thumbnail.src;
                                        var lcwidget_id = widget.widget_id;
                                        var lctitle = widget.title;
                                        var lcinformation = widget.description;
                                        var lcelement = $('<div class="widgetblock clickableblock " id="lc'+lcwidget_id+'" widget_id="'+lcwidget_id+'">\n\
                                                                        <div class="thumbnailcontainer">\n\
                                                                            <div class="lcplaybtn"></div>\n\
                                                                            <img class="thumbnail" imgloaded="0" src="'+lcthumbnail+'">\n\
                                                                        </div>\n\
                                                                        <div class="videoinformation">\n\
                                                                            <a href="javascript:void(0);" class="widgetlink">'+lctitle+'</a>\n\
                                                                            <div class="videometa">'+lcinformation+'</div>\n\
                                                                            <div style="clear:both;"></div>\n\
                                                                        </div>\n\
                                                            </div>');
                                        lcplaylist.append(lcelement);
                                        lcelement.click(function(){
                                          var banner = new lcBanner({'banner_id': 501},[$(this).attr("widget_id")]);
                                          var spanId = "lcs"+Math.floor(Math.random()*100000);
                                          jQuery("body").append("<span id=\""+spanId+"\" style=\"display:none;\"></span>");
                                          banner.appendBannerTo({'id' : spanId});
                                          jQuery(this).click(function() {
                                             var link = jQuery('a:first','#'+spanId);
                                             if($("#LCTB_title") != null){
                                                $("#LCTB_title").remove();
                                             }
                                             link.click();

                                          });
                                        });
                                        lcelement.click();
                                    }
                                    lcelement.click();
                                    $("#"+lcwidgetlist_div).append(lcplaylist);
				}
			});
		
}

