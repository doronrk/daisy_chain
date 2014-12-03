var quantityOptionTemplate=["","",'">',"","</option>"],sizeIconTemplate=',,"><a href="javascript:void(0);" title="Size: ,,">,,</a></li>'.split(","),sizeOptionTemplate=',," title=",,">,,</option>'.split(","),colorSwatchTemplate=',,"><a href="#" onclick="return false;" title="Color: ,,"><img style="width:38px;height:25px;border:solid black 0px;opacity:1;filter:alpha(opacity=100);" src=",," alt=",," width="25px" height="25px"/>,,</a></li>'.split(","),colorOptionTemplate=',," title=",,">,,</option>'.split(","),
stickyColorValue,useStickyColorValue=!1,videoPreview,videoView,s7videoplayer,curAsset,lastVideo,initialColorValue;function cleanString(a){return!a?a:a.replace(/[. \/]/g,"")}
function determineStickyColor(){if("ProductDisplay"==displayPage){var a=window.location.toString(),b=a.indexOf("?");if(-1!=b)for(var a=a.substring(b+1).split("&"),c=0;c<a.length;++c)if(b=a[c].split("=",2),2==b.length&&"color"==b[0]){stickyColorValue=decodeURIComponent(b[1]);break}}else"AJAXProductDisplay"==displayPage&&$("#sticky-color")&&(stickyColorValue=$("#sticky-color").text())}
function determineInitialItem(a){var b=a||0===a,a=b?productJson[a]:productJson;determineStickyColor();for(var c,d,e=!1,g=b?0:1<a.itemKeys.length?1:0,h=g;h<a.itemKeys.length;++h)(b=a.items[a.itemKeys[h]])&&0<b.stock&&(e=!0);for(;g<a.itemKeys.length;++g)if(b=a.items[a.itemKeys[g]],"AJAXProductDisplay"==displayPage){if(b&&0<b.stock){if(!c&&(c=b,!stickyColorValue))break;if(b.Color==stickyColorValue){useStickyColorValue=!0;d=b;break}}}else if(e){if(b&&0<b.stock){if(!c&&(c=b,!stickyColorValue))break;if(b.Color==
stickyColorValue){useStickyColorValue=!0;d=b;break}}}else{if(!c&&(c=b,!stickyColorValue))break;if(b.Color==stickyColorValue){useStickyColorValue=!0;d=b;break}}d||(d=c,void 0!=d&&void 0!=d.Color&&(initialColorValue=d.Color));return d}function createQuantityOption(a,b){quantityOptionTemplate[0]=!b?'<option value="':'<option selected="selected" value="';quantityOptionTemplate[1]=a;quantityOptionTemplate[3]=a;return quantityOptionTemplate.join("")}
function refreshQuantities(a){if("ProductDisplay"==displayPage||"AJAXProductDisplay"==displayPage){if(!a&&(a=productJson.items[$("select.indexed-dd-Color option:selected").val()+"_"+$("select.indexed-dd-Size option:selected").val()],!a))return;var b=10<=a.stock?10:a.stock;0<a.id&&"number"===typeof INVENTORY_THRESHOLD&&null!=INVENTORY_THRESHOLD&&(a.stock<INVENTORY_THRESHOLD?$("#low_inventory").show():$("#low_inventory").hide());if($("#quantity option").length!=b){var a=[],c=parseInt($("#quantity option:selected").val(),
10);if(0<b)for(var d=1;d<=b;++d)a[a.length]=createQuantityOption(""+d,d==c);else a[a.length]=createQuantityOption("0",0==c);$("#quantity").html(a.join(""))}$("#quantity option").length==b&&0==parseInt($("#quantity option:selected").val(),0)&&(a=[],a[a.length]=createQuantityOption(""+b,!0),$("#quantity").html(a.join("")))}}
function createSizeIcon(a,b,c,d){var e=b.Size;0<b.stock?(sizeIconTemplate[0]="BundleDisplay"==displayPage?e!=c?'<li id="Size-':'<li class="selected" id="Size-':a?'<li class="selected" id="Size-':'<li id="Size-',sizeIconTemplate[3]=e):(sizeIconTemplate[0]='<li class="notavail" id="Size-',sizeIconTemplate[3]=e+" (not available at this time)");sizeIconTemplate[1]=d+"-"+cleanString(e);sizeIconTemplate[5]=e;return sizeIconTemplate.join("")}
function createSizeOption(a,b,c){var d=b.Size,b=b.price?d+": "+b.price:d;sizeOptionTemplate[0]="BundleDisplay"==displayPage?d!=c?'<option value="':'<option selected="selected" value="':a?'<option selected="selected" value="':'<option value="';sizeOptionTemplate[1]=d;sizeOptionTemplate[3]=b;sizeOptionTemplate[5]=b;return sizeOptionTemplate.join("")}
function refreshSizes(a,b,c){for(var d=c||0===c,e=d?productJson[c]:productJson,g=[],h=[],f,j,k=1==e.Size.length,l=0;l<e.Size.length;++l)if(f=e.Size[l],f=a+"_"+f,f=e.items[f])g[g.length]=createSizeIcon(k,f,b,c),0<f.stock&&(j||(j="#Size-"+c+"-"+cleanString(f.Size)),h[h.length]=createSizeOption(k,f,b));a=d?"#indexed-"+c+" ":"";$(a+"ul.indexed-list-Size").html(g.join(""));$(a+"select.indexed-dd-Size").html(h.join(""));("ProductDisplay"==displayPage||"AJAXProductDisplay"==displayPage)&&refreshQuantity(h);
$(a+"select.indexed-dd-Size").change(function(){onDropDownChange(this,c);refreshQuantities()});$(a+"div.indexed-attribute-Size li").each(function(){$(this).click(function(){onAttributeChange(this,null,c)})});0===$(a+"div.indexed-attribute-Size li.selected").length&&($(a+j).attr("class","selected"),$(a+j).trigger("click"));refreshHeaders(c)}function inlineAdd2ShopCartModal(){Add2ShopCartModal(document.QuickOrderItemAddForm);return!1}
function refreshQuantity(a){1==productJson.Color.length&&1==productJson.Size.length&&null==productJson.Color[0]&&null==productJson.Size[0]&&"null_null"==productJson.itemKeys[0]?($("#quantity").append("<option value='0'>0</option>"),$("#quantity option[value='0']").attr("selected",!0),$("#quantity").attr("disabled",!0),"null_null"==productJson.itemKeys[0]&&0<productJson.items.null_null.stock&&$("#quantity").removeAttr("disabled")):0!=$("ul.indexed-list-Size li").length?(1>$("ul.indexed-list-Size li").length-
$("ul.indexed-list-Size li.notavail").length||0<$("ul.indexed-list-Color li").length&&0==$("ul.indexed-list-Color li").length-$("ul.indexed-list-Color li.notavail").length?($("#quantity").append("<option value='0'>0</option>"),$("#quantity option[value='0']").attr("selected",!0),$("#quantity").attr("disabled",!0),$("#addToCartBtn").unbind("click")):(0<$("#quantity option[value=0]").length&&$("#quantity option[value='0']").remove(),$("#quantity").removeAttr("disabled"),$("#addToCartBtn").click(ajaxAddToCartClick)),
$(".indexed-list-Size li.notavail").hide()):"No Sz"==$("#dd-Size.indexed-dd-Size").val()&&"Select Color"!=$("#dd-Color.indexed-dd-Color").val()||"No Sz"!=$("#dd-Size.indexed-dd-Size").val()&&"Select Color"!=$("#dd-Color.indexed-dd-Color").val()?$("#quantity").removeAttr("disabled"):null!=a&&1==a.length?($("#quantity").html(""),$("div#quickOrderItemAddFormDiv form#QuickOrderItemAddForm div#quantity-box.attribute_custom select#quantity").empty(),$("#quantity").append("<option value='0'>0</option>"),
$("#quantity option[value='0']").attr("selected",!0),$("#quantity").attr("disabled",!0),$("#addToCartBtn").unbind("click")):(0<$("#quantity option[value=0]").length&&$("#quantity option[value='0']").remove(),$("#quantity").removeAttr("disabled"),$("#addToCartBtn").bind("click",inlineAdd2ShopCartModal))}var counter=0;
function createColorSwatch(a,b,c,d,e,g){d?(counter++,colorSwatchTemplate[0]="BundleDisplay"==displayPage?!e?'<li id="Color-':'<li class="selected" id="Color-':stickyColorValue==b?'<li class="selected" id="Color-':a||1==counter?'<li class="selected" id="Color-':'<li id="Color-',colorSwatchTemplate[3]=b,colorSwatchTemplate[7]=b,colorSwatchTemplate[9]=""):(colorSwatchTemplate[0]='<li class="notavail" id="Color-',colorSwatchTemplate[3]=b+" (not available at this time)",colorSwatchTemplate[7]=b+" (not available at this time)",
colorSwatchTemplate[9]='<img src="/wcsstore/CVB2BDirectStorefrontAssetStore/images/bealls/notavail_rect.gif" alt="'+b+' (not available at this time)" width="38" height="25" border="0" style="border:0;margin:0 0 0 -22px;padding:0;"/>');colorSwatchTemplate[1]=g+"-"+cleanString(b);colorSwatchTemplate[5]=scene7SchemeUrlPrefix+c+scene7UrlPostfixSwatch;return colorSwatchTemplate.join("")}
function createColorOption(a,b,c){colorOptionTemplate[0]="BundleDisplay"==displayPage?!c?'<option value="':'<option selected="selected" value="':stickyColorValue==b?'<option selected="selected" value="':a?'<option selected="selected" value="':'<option value="';colorOptionTemplate[1]=b;colorOptionTemplate[3]=b;colorOptionTemplate[5]=void 0===b||12>=b.length?b:b.substr(0,12);return colorOptionTemplate.join("")}
function getIpsIdAndAvailability(a,b){var c=b||0===b?productJson[b]:productJson,a=void 0!=a?a:null,d,e,g=0;"AJAXProductDisplay"==displayPage&&(c=productJson);for(var h=0;h<c.Size.length;++h)if("AJAXProductDisplay"==displayPage||"ProductDisplay"==displayPage){if("Select "+pdpLabelOverride_Color!=a&&c.Size[h]!="Select "+pdpLabelOverride_Size&&(d=c.items[a+"_"+c.Size[h]]))!e&&void 0!==d.extra.ipsId&&(e=d.extra.ipsId),g+=Math.max(0,d.stock)}else if("BundleDisplay"==displayPage&&(d=c.items[a+"_"+c.Size[h]]))!e&&
void 0!==d.extra.ipsId&&(e=d.extra.ipsId),g+=Math.max(0,d.stock);e||(e=scene7UrlIpsIdNotAvailable);return[e,0<g]}
function initializeColors(a,b){var c=b||0===b,d=c?productJson[b]:productJson;colorSwatches=[];colorOptions=[];for(var e=!0,g,h,f=1==d.Color.length,j=0;j<d.Color.length;++j)g=d.Color[j],h=getIpsIdAndAvailability(g,b),colorSwatches[colorSwatches.length]=createColorSwatch(f,g,h[0],h[1],g==a,b),h[1]&&(colorOptions[colorOptions.length]=createColorOption(f,g,g==a),e=!1);e&&(colorOptions[colorOptions.length]=createColorOption(f,"Select "+pdpLabelOverride_Color,g==a));c=c?"#indexed-"+b+" ":"";$(c+"ul.indexed-list-Color").html(colorSwatches.join(""));
$(c+"select.indexed-dd-Color").html(colorOptions.join(""))}function refreshHeaders(a){var a=a||0===a?"#indexed-"+a+" ":"",b=$(a+"select.indexed-dd-Color option:selected").val(),c=$(a+"select.indexed-dd-Size option:selected").val();$(a+"span.indexed-selected-Color").text(b);void 0==c?$(a+"span.indexed-selected-Size").text("Select Size"):$(a+"span.indexed-selected-Size").text(c)}
function getFirstColorAndIpsId(a){var b=a||0===a?productJson[a]:productJson,c,d;"AJAXProductDisplay"==displayPage&&(b=productJson);for(var e=0;e<b.Color.length&&!(c=b.Color[e],d=getIpsIdAndAvailability(c,a),d=d[0],d!=scene7UrlIpsIdNotAvailable);++e);return[c,d]}
function handleNotAvailable(a){var b=a||0===a,c=b?"#indexed-"+a+" ":"";"AJAXProductDisplay"==displayPage&&($("#quantity").append("<option value='0'>0</option>"),$("#quantity option[value='0']").attr("selected",!0),$("#quantity").attr("disabled",!0),$("select.indexed-dd-Size").empty(),$("select.indexed-dd-Color").empty(),$("select.indexed-dd-Size").append("<option value='Select Size'>Select Size</option>"),$("select.indexed-dd-Color").append("<option value='Select Color'>Select Color</option>"));var d=
getFirstColorAndIpsId(a)[0],b=!b?"#productImage":"#productImage_"+a;if(null!=d)displayImageForProductByColor($(b),d,a);else if(("AJAXProductDisplay"==displayPage||"BundleDisplay"==displayPage)&&null!=getFirstColorAndIpsId(a)[1])imageMap[d].src=buildBadgedAssetForQV(),$("div#prod-image.prod-image img#productImage").attr("src",imageMap[d].src);$(c+"span.indexed-selected-Color").text("N/A");$(c+"select.indexed-dd-Color").html('<option value="">N/A</option>');$(c+"select.indexed-dd-Color").attr("disabled",
!0);$(c+"span.indexed-selected-Size").text("N/A");$(c+"select.indexed-dd-Size").html('<option value="">N/A</option>');$(c+"select.indexed-dd-Size").attr("disabled",!0);$(c+"#quantity").html('<option value="">N/A</option>');$(c+"#quantity").attr("disabled",!0);"BundleDisplay"==displayPage&&(a="#select_bundle_item_"+a,"checked"==$(a).attr("class")&&($(a).attr("class","unchecked"),$(a).trigger("click")),$(a).unbind(),$(a).hide())}
$(document).ready(function(){var a;if("ProductDisplay"==displayPage||"AJAXProductDisplay"==displayPage){(1<productJson.Color.length||1<productJson.Size.length)&&injectSelectChooseIntoProductJson();if(a=determineInitialItem()){void 0!=a.Color&&initializeColors(a.Color);var b=productJson.ProductIPSID.match(/\d{3}\-\d{4}\-\d{4}\-\d{2}\-/g);"AJAXProductDisplay"==displayPage&&(b=imageMap[a.Color].src.replace(/\d{3}\-\d{4}\-\d{4}\-\d{2}\-/g,b[0]),$("#productImage").attr("src",b));$("select.indexed-dd-Color").change(function(){onDropDownChange(this);
var b=$("#dd-Size option:selected").val();if(!b)b=a.Size;refreshSizes($("#dd-Color option:selected").val(),b);if(displayPage=="AJAXProductDisplay"){displayImageForProductByColor($("#productImage"),this);setSelectedColor()}refreshQuantities()});$("select.indexed-dd-Size").change(function(){$("#dd-Size option:selected").val();displayImageForProductByColor($("#productImage"),$("#dd-Color option:selected").val())});$("#attribute-Color li").each(function(){$(this).click(function(){$("#list-Size").show();
onAttributeChange(this)})});refreshSizes(a.Color,a.Size);refreshQuantities(a);useStickyColorValue&&$("select.indexed-dd-Color").trigger("change");!useStickyColorValue&&1<productJson.Color.length&&!a&&$("#list-Size").hide()}else handleNotAvailable(0);$("#images").children("div").click(function(){imageClicked(this)});$(".recent-item").each(function(){0==$(this).children("a").length&&$(this).hide()});"ProductDisplay"==displayPage&&(bealls.s7.params.addEventListener(s7sdk.Event.SDK_READY,initViewer,!1),
bealls.s7.params.init(),showInlineAvgRatings("BVRRSummaryContainer_"))}else if("BundleDisplay"==displayPage){for(b=0;b<productJson.length;++b)if(a=determineInitialItem(b)){void 0!=a.Color&&initializeColors(a.Color,b);var c="#indexed-"+b+" ";$(c+"select.indexed-dd-Color").change(function(){var a="#"+$(this).parents("div.indexed").attr("id")+" ",b=parseInt(a.substring(9),10);onDropDownChange(this,b);var c=$(a+"select.indexed-dd-Size option:selected").val();c||(c=$(a+"select.indexed-dd-Size option")[0].val());
a=$(a+"select.indexed-dd-Color option:selected").val();refreshSizes(a,c,b);displayImageForProductByColor($("#productImage_"+b),a,b)});$(c+"div.indexed-attribute-Color li").each(function(){$(this).click(function(){var a=parseInt($(this).parents("div.indexed").attr("id").substring(8),10);onAttributeChange(this,null,a)})});refreshSizes(a.Color,a.Size,b)}else handleNotAvailable(b);$(".recent-item").each(function(){0==$(this).children("a").length&&$(this).hide()});setBundlePrintImageSrc();showInlineAvgRatings("BVRRSummaryContainer_")}});
var defining_js={attr:null,attrVal:null,change:null,header:null,rawVal:null,sI:null};function imageClicked(a){$("#list-Color").length&&(q=$("#images div").index(a),$("#list-Color").length>q&&(z=$("#list-Color li").get(q),onAttributeChange(z,"y")))}
function onAttributeChange(a,b,c){var d=c||0===c,e=d?"#indexed-"+c+" ":"";if(void 0!==a&&!$(a).hasClass("selected")&&!$(a).hasClass("notavail")){selectAttribute(a,c);defining_js.attrVal=$(a).children([0]).html();-1!=defining_js.attrVal.indexOf("alt=")&&(defining_js.attrVal=$(a).children([0]).children([0]).attr("alt"));defining_js.attr=$(a).attr("id").split("-")[0];var g=e+"select.indexed-dd-"+defining_js.attr;$(g).val(defining_js.attrVal);$(g).trigger("change",[$(g)]);defining_js.sI=$(a).index();
if("Color"==defining_js.attr&&"y"!=b)try{$(e+"#images div:nth-child("+defining_js.sI+")").length&&imageClicked($(e+"#images div:nth-child("+defining_js.sI+")"))}catch(h){}("ProductDisplay"==displayPage||"AJAXProductDisplay"==displayPage)&&refreshQuantity(null);try{var f,j=d?productJson[c]:productJson,k=$(".indexed-list-Color .selected").children([0]).children([0]).attr("alt"),l=$(".indexed-list-Size .selected a").html();if(k&&l&&""!=k&""!=l&&void 0!=k&&void 0!=l&&((f=j.items[k+"_"+l])&&f.price&&null!=
f.price&&$("div#prod-price div.offer-price").html(f.price),f&&f.price&&null!=f.price&&null!=f.listPrice)){var m=f.listPrice.substr(1,f.listPrice.length),n=f.price.substr(1,f.price.length);(a=100*((m-n)/m))&&0!=a&&0<$(".save-price").length&&$(".save-price").html("you save: "+Math.floor(a)+"%")}}catch(r){console&&console.log&&console.log("Error while displaying the SKU Price.")}}}
function onDropDownChange(a,b){var c=b||0===b?"#indexed-"+b+" ":"";defining_js.attr=$(a).attr("id").split("-")[1];defining_js.attrVal=$(":selected",a).val();var d=$(c+"#"+defining_js.attr+"-"+b+"-"+cleanString(defining_js.attrVal));selectAttribute(d,b);$(c+"span.indexed-selected-"+defining_js.attr).text(defining_js.attrVal);defining_js.sI=$(a).attr("selectedIndex");defining_js.sI+=1;"Color"==defining_js.attr&&imageClicked($(c+"#images div:nth-child("+defining_js.sI+")"))}
function selectAttribute(a,b){var c=b||0===b?$("#indexed-"+b+" #"+$(a).attr("id")):a;$(c).nextAll().removeClass("selected");$(c).prevAll().removeClass("selected");$(c).addClass("selected")}function setProductPrintImageSrc(){var a=determineInitialItem();a&&(a=getIpsIdAndAvailability(a.Color,void 0),a=scene7SchemeUrlPrefix+a[0]+scene7UrlPostfixProduct+"&wid=240",$("div#printImage > img#productImage").attr("src",a))}
function setBundlePrintImageSrc(){void 0!==bundleIpsId&&($("div#printImage > img#productImage").attr("src",scene7SchemeUrlPrefix+bundleIpsId+scene7UrlPostfixProduct+"&wid=240"),$("#printImage").show())}function setProductAdditionalImagesSrc(){$("div#images > div.i > img").each(function(){var a=$(this).attr("alt").split("/"),a=scene7SchemeUrlPrefix+a[a.length-1];$(this).attr("src")!=a&&$(this).attr("src",a)})}
function injectSelectChooseIntoProductJson(){for(var a=["Select "+pdpLabelOverride_Color],b=["Select "+pdpLabelOverride_Size],c=[a[0]+"_"+b[0]],d={Color:a[0],Size:b[0],extra:{ipsId:void 0},id:0,listPrice:"$0.00",partNumber:"Select",stock:100},e=0,e=0;e<productJson.Color.length;e++)d.Color=productJson.Color[e],productJson.items[productJson.Color[e]+"_Select "+pdpLabelOverride_Size]=d;d.Color=a[0];1==productJson.Color.length?(a=productJson.Color,c=[a[0]+"_"+b[0]],d={Color:productJson.Color,Size:b[0],
extra:{ipsId:void 0},id:0,listPrice:"$0.00",partNumber:"Select",stock:100}):productJson.Color=a.concat(productJson.Color);1==productJson.Size.length?(c=[a[0]+"_"+productJson.Size],d={Color:a[0],Size:productJson.Size[0],extra:{ipsId:void 0},id:0,listPrice:"$0.00",partNumber:"Select",stock:100}):productJson.Size=b.concat(productJson.Size);productJson.itemKeys=c.concat(productJson.itemKeys);productJson.items[c[0]]=d}
function displayImageForProductByColor(a,b){var c=!b.substr?b[b.selectedIndex].value:b;selectedColor=c;console&&console.log&&(console.log("displayImageForProductByColor: imageObject = %o",a),console.log("displayImageForProductByColor: colorSource = %o",b),console.log("displayImageForProductByColor: colorName = %o",c),console.log("displayImageForProductByColor: imageMap[colorName] = %o",imageMap[c]));if(void 0!==imageMap[c]){var d=getImageSetName(imageMap[c].src);"AJAXProductDisplay"==displayPage||
"BundleDisplay"==displayPage?(imageMap[c].src=buildBadgedAssetForQV(),$("div#prod-image.prod-image img#productImage").attr("src",imageMap[c].src)):changeAsset(d)}else console&&console.log&&console.log("displayImageForProductByColor: image map color name is undefined: %o",c)}
function showInlineAvgRatings(a){var b,c,d;$("[id^="+a+"]").each(function(a){c=$(this).attr("id");d=c.split("_")[1];0>d.indexOf("GC")&&(b=0==a?d:b+","+d)});$.ajaxSetup({cache:!0});$.getJSON(api_server+api_stats,api_version+api_key+api_filter_productId+b+api_filter_stats,function(b){var c="<div class='review'><img src='"+ratingImagUri+"<%=AverageOverallRating%>/<%=OverallRatingRange%>/"+ratingImageName+"' /></div><br />",d,f;for(i=0;i<b.Results.length;i++)f=b.Results[i].ProductStatistics.ReviewStatistics.AverageOverallRating,
null==f&&(f=0),d=_.template(c,{AverageOverallRating:f,OverallRatingRange:b.Results[i].ProductStatistics.ReviewStatistics.OverallRatingRange}),$("[id^="+a+b.Results[i].ProductStatistics.ProductId+"]").each(function(){$(this).append(d)})})}function onSetParsed(a){bealls.s7.altViews.setMediaSet(a.s7event.asset);bealls.s7.altViews.selectSwatch(0,!0);hideSwatchesForIpad()}function getBadgedQuickViewAssetName(a){return getBadgedAssetName(a,"Bealls/QuickView?$layer_2_src="+a.toString())}
function getBadgedAssetName(a){return buildBadgedAssetName(a,"Bealls/ProductImg?$layer_2_src="+a.toString())}
function buildBadgedAssetName(a,b){if(null!=productJson){var c=null,d=null,e=null,g=null,h=null,f=productJson.position1Badge,j=productJson.position2Badge,k=productJson.position3Badge,l=productJson.position4Badge,m=productJson.position5Badge,n=productJson.isStyLvlBdge1,r=productJson.isStyLvlBdge2,s=productJson.isStyLvlBdge3,t=productJson.isStyLvlBdge4,u=productJson.isStyLvlBdge5,o=$("#dd-Color option:selected").val(),p=$("#dd-Size option:selected").val();void 0!=o&&void 0!=p&&void 0!=productJson.items[o+
"_"+p]&&(c=productJson.items[o+"_"+p].position1Badge,d=productJson.items[o+"_"+p].position2Badge,e=productJson.items[o+"_"+p].position3Badge,g=productJson.items[o+"_"+p].position4Badge,h=productJson.items[o+"_"+p].position5Badge);b=null!=c&&0<=c.length&&n?0<c.length?b+"&$layer_3_src=Bealls/"+c+"&$layer_3_hide=0":b+"&$layer_3_hide=1":null!=f&&0!=f.length?b+"&$layer_3_src=Bealls/"+f+"&$layer_3_hide=0":b+"&$layer_3_hide=1";b=null!=d&&0<=d.length&&r?0<d.length?b+"&$layer_4_src=Bealls/"+d+"&$layer_4_hide=0":
b+"&$layer_4_hide=1":null!=j&&0!=j.length?b+"&$layer_4_src=Bealls/"+j+"&$layer_4_hide=0":b+"&$layer_4_hide=1";b=null!=e&&0<=e.length&&s?0<e.length?b+"&$layer_5_src=Bealls/"+e+"&$layer_5_hide=0":b+"&$layer_5_hide=1":null!=k&&0!=k.length?b+"&$layer_5_src=Bealls/"+k+"&$layer_5_hide=0":b+"&$layer_5_hide=1";b=null!=g&&0<=g.length&&!t?0<g.length?b+"&$layer_6_src=Bealls/"+g+"&$layer_6_hide=0":b+"&$layer_6_hide=1":null!=l&&0!=l.length?b+"&$layer_6_src=Bealls/"+l+"&$layer_6_hide=0":b+"&$layer_6_hide=1";b=
null!=h&&0<=h.length&&!u?0<h.length?b+"&$layer_7_src=Bealls/"+h+"&$layer_7_hide=0":b+"&$layer_7_hide=1":null!=m&&0!=m.length?b+"&$layer_7_src=Bealls/"+m+"&$layer_7_hide=0":b+"&$layer_7_hide=1"}return b}
function swatchSelected(a){var b=a.s7event.asset;curAsset=b;var c=curAsset.type;displayElement("flyoutZoomView",!1);displayElement("testVideoView",!1);if(1==c){a=getBadgedAssetName(b);bealls.s7.flyout.setAsset(a);var a=document.getElementById("flyoutZoomView"),d;document.getElementById("selected-Color")&&(d=document.getElementById("selected-Color").childNodes[0].nodeValue);a&&(a=a.childNodes[0].childNodes[0],d&&"Select Color"!=d?a.setAttribute("alt",prodImageAltText+" "+d):a.setAttribute("alt",prodImageAltText));
displayElement("flyoutZoomView",!0)}else if(2==c||128==c)d=document.getElementById("s7container"),lastVideo!=b&&(null!=s7videoplayer&&(c=document.getElementById("testVideoView"),c.parentNode.removeChild(c)),videoPreview=document.createElement("div"),videoPreview.setAttribute("id","testVideoPreview"),videoPreview.setAttribute("class","s7videoplayer"),s7videoplayer=document.createElement("div"),s7videoplayer.setAttribute("id","testVideoView"),d.appendChild(s7videoplayer),d={assetType:"VIDEO",config:"Scene7SharedAssets/Universal_Video1",
containerId:"testVideoPreview"},d.asset=a.s7event.asset.toString(),s7videoplayer.appendChild(videoPreview),videoView=new s7uev.EmbeddedViewer(d)),lastVideo=b,displayElement("testVideoView",!0)}function changeAsset(a){bealls.s7.flyout.setAsset&&(bealls.s7.flyout.setAsset(a),bealls.s7.altViews.setAsset(a),bealls.s7.altViews.selectSwatch(0,!0))}
function onNodeInserted(a){"flyoutZoomView"==a.target.id&&a.target.childNodes[0].childNodes[0]&&(a=a.target.childNodes[0].childNodes[0],prodImageAltText&&a.setAttribute("alt",prodImageAltText))}function displayElement(a,b){var c=document.getElementById(a);c&&(c.style.display=b?"block":"none")}
function initViewer(){var a;isOnPageLoad=!0;a=$.query.get("color");if(""!==a)selectedColor=a,a=getImageSetNameByColor(a);else if("ProductDisplay"==displayPage&&null!=initialColorValue&&0!=initialColorValue.length)selectedColor=initialColorValue,a=getImageSetNameByColor(initialColorValue);else{a=getImageSetNameByIndex(1==productJson.itemKeys.length?0:1);var b=productJson.ProductIPSID.match(/\d{3}\-\d{4}\-\d{4}\-\d{2}\-/g);a=a.replace(/\d{3}\-\d{4}\-\d{4}\-\d{2}\-/g,b[0])}bealls.s7.params.push("serverurl",
"//images.beallsflorida.com/is/image/");bealls.s7.params.push("MediaSet.asset",a);bealls.s7.params.push("cellspacing","4");bealls.s7.params.push("tmblayout","0,1");bealls.s7.params.push("videoserverurl","http://images.beallsflorida.com/is/content/");bealls.s7.params.push("scrollstep","2, 2");bealls.s7.altViews=new s7sdk.Swatches("s7container",bealls.s7.params,"swatches");bealls.s7.altViews.addEventListener(s7sdk.AssetEvent.SWATCH_SELECTED_EVENT,swatchSelected,!1);bealls.s7.mediaSet=new s7sdk.MediaSet(null,
bealls.s7.params,null);bealls.s7.mediaSet.addEventListener(s7sdk.AssetEvent.NOTF_SET_PARSED,onSetParsed,!1);bealls.s7.flyout=new s7sdk.FlyoutZoomView("s7container",bealls.s7.params,"flyoutZoomView");bealls.s7.flyout.addEventListener("DOMNodeInserted",onNodeInserted,!1)}function hideSwatchesForIpad(){/iPad/i.test(navigator.userAgent)&&$("#swatches").hide()}
function buildBadgedAssetForQV(){if(null!=productJson){var a=$("#dd-Color option:selected").val(),b=$("#dd-Size option:selected").val(),c=[],d=productJson.position1Badge,e=productJson.position2Badge,g=productJson.position3Badge,h=productJson.position4Badge,f=productJson.position5Badge,j=null,k=null,l=null,m=null,n=null,r=productJson.isStyLvlBdge1,s=productJson.isStyLvlBdge2,t=productJson.isStyLvlBdge3,u=productJson.isStyLvlBdge4,o=productJson.isStyLvlBdge5;a=="Select "+pdpLabelOverride_Color&&(a=
getFirstColorAndIpsId(0)[0]);c=getIpsIdAndAvailability(a,void 0);c=scene7SchemeUrlPrefix+"QuickViewImg?$layer_2_src=Bealls/"+c[0]+"-yyy";void 0!=a&&void 0!=b&&void 0!=productJson.items[a+"_"+b]&&(j=productJson.items[a+"_"+b].position1Badge,k=productJson.items[a+"_"+b].position2Badge,l=productJson.items[a+"_"+b].position3Badge,m=productJson.items[a+"_"+b].position4Badge,n=productJson.items[a+"_"+b].position5Badge);c=null!=j&&0<=j.length&&r?0<j.length?c+"&$layer_3_src=Bealls/"+k+"&$layer_3_hide=0":
c+"&$layer_3_hide=1":null!=d&&0!=d.length?c+"&$layer_3_src=Bealls/"+d+"&$layer_3_hide=0":c+"&$layer_3_hide=1";c=null!=k&&0<=k.length&&s?0<k.length?c+"&$layer_4_src=Bealls/"+k+"&$layer_4_hide=0":c+"&$layer_4_hide=1":null!=e&&0!=e.length?c+"&$layer_4_src=Bealls/"+e+"&$layer_4_hide=0":c+"&$layer_4_hide=1";c=null!=l&&0<=l.length&&t?0<l.length?c+"&$layer_5_src=Bealls/"+l+"&$layer_5_hide=0":c+"&$layer_5_hide=1":null!=g&&0!=g.length?c+"&$layer_5_src=Bealls/"+g+"&$layer_5_hide=0":c+"&$layer_5_hide=1";c=null!=
m&&0<=m.length&&u?0<m.length?c+"&$layer_6_src=Bealls/"+m+"&$layer_6_hide=0":c+"&$layer_6_hide=1":null!=h&&0!=h.length?c+"&$layer_6_src=Bealls/"+h+"&$layer_6_hide=0":c+"&$layer_6_hide=1";c=null!=n&&0<=n.length&&o?0<n.length?c+"&$layer_7_src=Bealls/"+n+"&$layer_7_hide=0":c+"&$layer_7_hide=1":null!=f&&0!=f.length?c+"&$layer_7_src=Bealls/"+f+"&$layer_7_hide=0":c+"&$layer_7_hide=1"}return c};