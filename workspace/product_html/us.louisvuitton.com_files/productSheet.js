var startDoubleClick=false;
var zoomInitialised=false;
var isProductSheetPage=true;
var isHotstampable=false;
var hsDeactivate=false;
var isMomPage=false;
var topPosition=0;
var leftPosition=0;
var fontSize=0;
var ihsMediaUrl="";
var maxProductToSave=16;
var zoomModal;
var SEE_MORE_STATUS=true,SEE_LESS_STATUS=false;
var THREE_DOTS="...",FULL_STOP=".";
var viewedArticleMomUrl="";
var countSkusForIeHistory=0;
function loadDom(){CURRENT_SKU=getSkuHash();
if(CURRENT_SKU!=DEFAULT_SKU){getAjax(false,"product.jsp",callbackDomSpecificSkuLoad,{id:CURRENT_SKU});
DEFAULT_SKU=CURRENT_SKU
}else{$(document).unbind("click");
domIsLoaded()
}$.jStorage.set("lastPageVisited",window.location.href)
}$(document).ready(loadDom);
function getSkuHash(){return window.location.hash?window.location.hash.substring(1):DEFAULT_SKU
}function callbackDomSpecificSkuLoad(a){$("#contentWrapper").html(a);
domIsLoaded();
utag_data.product_sku=DEFAULT_SKU
}function domIsLoaded(){DOM_LOADED=true;
LOADED_DONE=false;
loaded();
orangeRightArrowHandler()
}function specificLoadingEvent(){loadAjaxDom("#helpPopin","helpPopin.jsp",callbackHelpPopinLoaded);
handlesImagesClasses();
if(ihsMediaUrl!=""&&ihsMediaUrl!=null){getOriginalWidthOfImg()
}if(isMomPage){launchMom()
}$(".slideshow img").show();
loadingImgs();
registerEvent("endImagesLoad",endImageLoadedCallback);
share();
addListenerOpener();
if($("#checkStockLevel").length>0){var a;
if($("#size").length>0){a="";
$("#size li").each(function(){if(a==""){a=$(this).attr("data-sku")
}else{a+=","+$(this).attr("data-sku")
}});
checkStockLevel(a,$("#checkStockLevel").attr("data-index"),buildSizeSelect)
}else{a=$("#checkStockLevel").attr("data-sku");
checkStockLevel(a,$("#checkStockLevel").attr("data-index"))
}}if(RESPONSIVE_MANAGER.isAllSmallMode()){$("#allImagesCompleteTheLook").addClass("contentPanel")
}bindDoubleTap();
buildModelSizeSelect();
if(is_touch_device()){$(".zoomInIcon").show()
}bindModelSizeSelector();
registerEvent("windowResize",productSheetResizeHandler);
registerEvent("resizeEvent",setProductSheetSlideshowMaxWidth);
registerEvent("leave-MediumLarge-breakpoint",productSheetHandleEnterAS);
registerEvent("leave-AllSmall-breakpoint",productSheetHandleEnterML);
expandProductDesc();
handlePaletteRollOver();
if(getCookie(CONFIGURATION.COOKIE_NAME)!=="true"){buildProductViewedArticles();
$("#discoverTheFamily").removeClass("hide")
}else{$("#viewedArticles").addClass("hide");
$("#discoverTheFamily").addClass("hide")
}saveProductViewedArticles();
initSliders();
viewedArticlesTagManagement("viewedArticles");
initMoreChoicesPanelEvent();
handleMoreChoicesPanel();
handleMoreChoicesBtnArrow();
handleModalResizing()
}function isPageReloaded(){return window.location.href==($.jStorage.get(localStorageCurrentUrl))
}function specificResizeEvent(){$(".imageContainer img").addClass("postLoaderResponsive");
if(RESPONSIVE_MANAGER.isMediumLargeMode()){showPriceButton()
}handlesImagesClasses()
}function addOutOfStockLabel(a){logDebug("addOutOfStockLabel "+a);
$("#size option").each(function(){if($(this).attr("data-sku")==a){$(this).addClass("sizeOutOfStock").attr("disabled","disabled");
$(this).text($(this).text()+" - "+CONFIGURATION.SIZE_OUT_OF_STOCK_LABEL)
}})
}function buildModelSizeSelect(){var b=$("<select></select>");
var a=$("#modelSize li");
var c=$("#modelSize").attr("data-selectedvalue");
a.each(function(){var d=$("<option>"+$(this).find("span").text()+"</option>");
$.each(this.attributes,function(){if(this.specified&&(this.name!=c||this.name==c&&this.value==c)){d.attr(this.name,this.value)
}});
b.append(d).attr("id","modelSize").addClass(CONFIGURATION.tagChangeClass)
});
$("#modelSize").after(b);
$("#modelSize").remove()
}function buildSizeSelect(e){logDebug("in buildSizeSelect");
logDebug("tabResult = "+e);
var b=$("<select></select>");
var a=$("#size li");
var d=$("#size").attr("data-selectedvalue");
var c=$('<option value="sizeNoChoice" selected="selected" disabled="disabled">'+CONFIGURATION.SIZE_SELECT_DEFAULT_TEXT+"</option>");
b.append(c);
a.each(function(){var f=$(this).attr("data-sku");
var g=$("<option>"+$(this).find("span").text()+"</option>");
if(!e[f]["inStock"]){g.text(g.text()+" - "+CONFIGURATION.SIZE_OUT_OF_STOCK_LABEL);
g.addClass("sizeOutOfStock").attr("disabled","disabled")
}$.each(this.attributes,function(){if(this.specified&&this.name!=d){g.attr(this.name,this.value)
}});
g.attr("value",f);
b.append(g).attr("id","size").addClass(CONFIGURATION.tagChangeClass)
});
$("#size").after(b);
$("#size").remove();
$("#skuIdAddToCart").attr("value","sizeNoChoice");
$("#sizeAvailableList select").change(function(){logDebug("on size change");
var g=$(this);
var f=g.find("option:selected").attr("value");
$(".sku").text(f);
$("#skuIdAddToCart").attr("value",f);
$("#addToCartSubmit").attr("data-sku",f)
})
}function bindDoubleTap(){var b=/android|iphone|ipad/i.test(navigator.userAgent.toLowerCase()),a=b?"touchstart":"click";
$("#productSheetSlideshow img").on(a,function(){handleDoubleTap(a,$(this).attr("data-src").match(/--(.+)\./)[1])
});
$("#productSheetSlideshow .zoomInIcon").on(a,function(){handleDoubleTap(a,$(this).attr("data-src").split("/")[2].split(".")[0])
});
$("#productPictures img").on(a,function(){handleDoubleTap(a,$(this).attr("data-src").match(/--(.+)\./)[1])
});
$("#productPictures .zoomInIcon").on(a,function(){handleDoubleTap(a,$(this).attr("data-src").split("/")[2].split(".")[0])
})
}function handleDoubleTap(b,a){if(b==="touchstart"){if(startDoubleClick){launchZoomModal(a);
setTimeout(function(){startDoubleClick=false
},500)
}startDoubleClick=true;
setTimeout(function(){startDoubleClick=false
},500)
}else{launchZoomModal(a)
}}function launchZoomModal(a){zoomModal=new modal();
zoomModal.dataId="s7viewer";
zoomModal.dataImgId=a;
zoomModal.dataClass="zoomProductSheet";
zoomModal.dataHeight="100%";
zoomModal.fullWxfullH=true;
zoomModal.callbackAfterOpen=callbackAfterOpenZoomModal;
zoomModal.callbackBeforeClose=callbackBeforeCloseZoomModal;
zoomModal.callbackBeforeOpen=callbackBeforeOpenZoomModal;
zoomModal.open()
}function callbackBeforeOpenZoomModal(){}function callbackBeforeCloseZoomModal(){zoomInitialised=false;
fireEvent("ResetZoom");
loadingImgs()
}function callbackAfterOpenZoomModal(){var a=new s7viewers.BasicZoomViewer();
a.setContainerId("s7viewer");
a.setParam("serverurl",SCENE7_URL);
a.setAsset(SCENE7_ACCOUNT+"/"+zoomModal.dataImgId);
a.init();
zoomInitialised=true;
fireEvent("Zoom")
}function closeZoomModal(){if(zoomInitialised){$(".zoomProductSheet").find(".closeButton").click()
}}function productSheetHandleEnterML(){}function productSheetHandleEnterAS(){setTimeout(loadingImgs,500)
}function handlesImagesClasses(){if(RESPONSIVE_MANAGER.isMediumLargeMode()){$(".imageContainer img").addClass("postLoaderResponsive")
}if(RESPONSIVE_MANAGER.isAllSmallMode()){$(".slideshow img").addClass("postLoaderResponsive")
}}function endImageLoadedCallback(a){buildSlideshow()
}function buildSlideshow(){setProductSheetSlideshowMaxWidth();
var a=$(".slideshow");
if(a.find("li").length>1){var c=a.attr("id");
var a=new Slideshow();
a.callBackEndScroll=function(){fireEvent("slideshowNavigateEvent")
};
var b=new SlideshowOption();
b.navigMode="bullets";
b.displayArrows=false;
b.allowVerticalScroll=true;
a.initSlideshow("#"+c,b);
if(isBeforeIE10){if(typeof addCallBackEndScrollHotStamping=="function"){addCallBackEndScrollHotStamping()
}}else{fireEvent("slideshowInitialized")
}}}var NAVIGATION_HEIGHT;
function getNavigationHeigt(){if(NAVIGATION_HEIGHT){return NAVIGATION_HEIGHT
}var a=Slideshow.getBulletNavigationElement(1,null);
a.css("visibility","hidden").css("position","absolute").css("top","-999px");
$("body").append(a);
NAVIGATION_HEIGHT=a.height()+parseInt(a.css("margin-top"));
a.remove();
return NAVIGATION_HEIGHT
}function setProductSheetSlideshowMaxWidth(){if($("#productSheetSlideshow").length!=0){var a=Math.min($(window).height()-$("#productSheetSlideshow").offset().top-getNavigationHeigt(),$(window).width());
$(".bigs img").css("max-width",a);
$("#productSheetSlideshow").css("max-width",a)
}}function openPanel(){var a=$(this);
var b=a.next(".contentPanel");
changeArrowPanelOpener(a,b);
b.slideToggle()
}function changeArrowPanelOpener(a,c){var b=a.find(".arrowPanelWrapper img");
if(c.css("display")=="block"){b.attr("src",CONFIGURATION.TECH_ASSETS_PATH+"store/arrow_right.png")
}else{b.attr("src",CONFIGURATION.TECH_ASSETS_PATH+"store/arrow_bottom.png")
}}function showPriceButton(){$(".priceButton").css("visibility","visible");
orangeRightArrowHandler()
}function addListenerOpener(){$("#shareButton span").click(openSharingBubbleProductSheet)
}function openSharingBubbleProductSheet(){getUrlBitly();
SharingBubble.openSharingBubble("#sharingBubble")
}function share(){shareListener();
$("#shareByMail").click(function(){var a=$(this);
shareWrapper(a)
})
}function retrieveImageData(a){return $("#informations").attr("data-src-"+a)
}function handleContentAfterFullscreen(){setTimeout(function(){$("body, html").css("overflow","hidden")
},100)
}function HsOptionsFunctionWishlist(){$("#addPersonalizedItemToGiftlist").attr("disabled",true);
$("#addItemToGiftlist").attr("disabled",true);
var c=$("#initialsHS").val();
if(c!=null&&c.length>0){$("#addPersonalizedItemToGiftlist").attr("disabled",false);
var a=$("#HSOptionsFormId").serializeObject();
var b=JSON.stringify(a);
$("#tableHsOptionsWishlist").attr("value",b)
}else{$("#addItemToGiftlist").attr("disabled",false);
$("#tableHsOptionsWishlist").attr("value","")
}}function MomOptionsFunctionWishlist(){$("#addPersonalizedItemToGiftlist").attr("disabled",true);
$("#addItemToGiftlist").attr("disabled",true);
var c=$("#ruleId").val();
if(c!=null&&c.length>0){$("#addPersonalizedItemToGiftlist").attr("disabled",false);
var b=$("#momOptionsFormId").serializeObject();
var a=JSON.stringify(b);
$("#tableMomOptionsWishlist").attr("value",a)
}else{$("#addItemToGiftlist").attr("disabled",false);
$("#tableMomOptionsWishlist").attr("value","")
}}function adaptWishlistModalPosition(a){if(isSmartphoneMode()){var b=$(a).offset().top
}}var BACK_BUTTON_PRESSED=false;
function redirectBackButton(){$.jStorage.set(localStorageSkuToScroll,DEFAULT_SKU);
$.jStorage.set(localStorageShouldScrollToSku,"true");
BACK_BUTTON_PRESSED=true;
if(parseInt(sessionStorage.getItem("inSite"))){makeBackHistory()
}else{window.location=(BACK_BUTTON.homeURL==""?makeBackHistory():BACK_BUTTON.homeURL)
}}$(window).on("hashchange",onHashChange);
function onHashChange(){if(BACK_BUTTON_PRESSED){makeBackHistory()
}}function makeBackHistory(){if(IE&&getReferrer().indexOf("search")!=-1){window.history.go(-2)
}else{window.history.back()
}}function bindModelSizeSelector(){$("#modelSizeList select").change(function(){var b=$(this);
var a=b.find("option:selected").val();
a=$.trim(a);
if(a!=null){window.location=a
}})
}function preValidationSkuSize(){if($("#skuIdAddToCart").attr("value")=="sizeNoChoice"){return"error error"
}}function gotoOtherSku(a){window.location.hash=a;
loadDom()
}function viewedArticlesTagManagement(b){var a=$("#viewedArticlesContainer li a.visualContainer");
a.each(function(c){counter=c+1;
tagID=b+"_"+counter;
$(this).attr("id",tagID);
$(this).attr("data-detail",counter)
})
}Array.prototype.insert=function(a,b){this.splice(a,0,b)
};
Array.prototype.remove=function(a){return this.splice(a,1)[0]
};
Array.prototype.move=function(b,a){this.insert(a,this.remove(b))
};
function saveProductViewedArticles(){var c,h,g,f,e;
c=utag_data.product_sku;
h=$.trim($("#infoProductBlockTop .productName").text());
g=$.trim($(".priceValue").text());
f=$(location).attr("href");
if(isMomPage){e=viewedArticleMomUrl
}else{e=$("#productPictures li:first-child").find("img").attr("data-src")
}var k={name:h,price:g,url:f,imageUrl:e,sku:c};
var a=$.jStorage.get("viewedProductArray")||[];
var j=$.jStorage.get("lastViewedProduct")||0;
var d=checkProductAlreadyExist(a,k);
if(d!=-1){var b=a.remove(d);
if(d<j){a.insert(j-1,b)
}else{a.insert(j,b);
incrementLastViewedProduct(j)
}}else{a[j]=k;
incrementLastViewedProduct(j)
}$.jStorage.set("viewedProductArray",a)
}function incrementLastViewedProduct(a){a=(a==maxProductToSave-1)?0:a+1;
$.jStorage.set("lastViewedProduct",a)
}function checkProductAlreadyExist(c,b){if(typeof c!=="undefined"&&c.length>0){for(var a=0;
a<c.length;
a++){if(c[a].sku==b.sku){return a
}}}return -1
}function buildProductViewedArticles(){var c=$.jStorage.get("viewedProductArray")||[];
var d=$.jStorage.get("lastViewedProduct")||0;
var f=$("#viewedArticles");
var a=$("#viewedArticlesWrapper");
var e=$('<ul id="viewedArticlesContainer" class="sliderRespContainer"></ul>');
if(!c.length>0){f.addClass("hide");
return
}f.removeClass("hide");
if(c[d]){for(var b=d;
b<c.length;
b++){addProductInfo(e,c[b])
}}for(var b=0;
b<d;
b++){addProductInfo(e,c[b])
}a.append(e)
}function addProductInfo(a,b){a.prepend($("#viewArticleTemplate").tmpl(b))
}var slidersReponsive={discoverTheFamilyContainer:{},youMayAlsoLikeContainerAS:{},viewedArticlesContainer:{}};
function getResponsiveSliderIds(){return Object.keys(slidersReponsive)
}function getResponsiveSlideFromIndex(a){return slidersReponsive[getResponsiveSliderIds()[a]]
}for(var i=0;
i<getResponsiveSliderIds().length;
i++){getResponsiveSlideFromIndex(i)["sliderObject"]=new SliderResponsive();
getResponsiveSlideFromIndex(i)["sliderOptions"]={}
}slidersReponsive.viewedArticlesContainer["sliderOptions"].specificClass="viewedArticles";
slidersReponsive.viewedArticlesContainer["sliderOptions"].responsiveMode=false;
slidersReponsive.youMayAlsoLikeContainerAS["sliderOptions"].responsiveMode=true;
slidersReponsive.discoverTheFamilyContainer["sliderOptions"].responsiveMode=true;
function buildSlider(c,b,a){c.buildSlider("#"+b,a)
}function initSliders(){for(var a=0;
a<getResponsiveSliderIds().length;
a++){buildSlider(getResponsiveSlideFromIndex(a)["sliderObject"],getResponsiveSliderIds()[a],getResponsiveSlideFromIndex(a)["sliderOptions"])
}loadingImgs()
}function refreshAllSliders(){for(var a=0;
a<getResponsiveSliderIds().length;
a++){if($("#"+getResponsiveSliderIds()[a]).length>0){getResponsiveSlideFromIndex(a)["sliderObject"].refreshSlider("#"+getResponsiveSliderIds()[a],getResponsiveSlideFromIndex(a)["sliderOptions"])
}}}function productSheetResizeHandler(){handleModalResizing();
orangeRightArrowHandler();
refreshAllSliders()
}String.prototype.countCharOccurence=function(a){return this.split(a).length-1
};
function expandProductDesc(){switch(CONFIGURATION.STORE_LANG){case"jpn-jp":case"zht-tw":case"kor-kr":case"zht-hk":case"zhs-cn":break;
default:var e=$.trim($("#productDescriptionSeeMore").text());
var d=e.countCharOccurence(FULL_STOP);
if(d>1){var c=SEE_MORE_STATUS;
var e=$.trim($("#productDescriptionSeeMore").text());
var d=e.countCharOccurence(FULL_STOP);
var b=e.indexOf(FULL_STOP);
var a=$.trim($("#productDescriptionSeeMore").text()).substring(0,b).split(" ").slice(0,-1).join(" ")+THREE_DOTS;
$("#productDescriptionSeeMore").html(a);
$("#seeMore").css("display","block");
$("#seeMore").on("click",function(){if(c==SEE_MORE_STATUS){$("#productDescriptionSeeMore").html(e);
c=SEE_LESS_STATUS;
$("#seeMore").fadeOut("fast");
$("#seeLess").fadeIn("slow")
}});
$("#seeLess").on("click",function(){if(c==SEE_LESS_STATUS){$("#productDescriptionSeeMore").html(a);
c=SEE_MORE_STATUS;
$("#seeLess").fadeOut("fast");
$("#seeMore").fadeIn("slow")
}})
}break
}}function handlePaletteRollOver(){if(!is_touch_device()){var c,b,a;
var e=$(".paletteContainer.Color");
var d=$(".paletteContainer.Material");
if(e.length>0){c=$.trim(e.prev().find(".paletteTitleValue").text())
}if(d.length>0){b=$.trim(d.prev().find(".paletteTitleValue").text())
}$("#attributePanelOpenedWrapper .palette").each(function(){$(this).mouseover(function(){paletteHeader=$(this).parent().prev().find(".paletteTitleValue");
a=$.trim($(this).find("img").attr("alt"));
paletteHeader.html(a)
});
$(this).mouseout(function(){paletteHeader=$(this).parent().prev().find(".paletteTitleValue");
if($(this).parent().hasClass("Color")){paletteHeader.html(c)
}else{if($(this).parent().hasClass("Material")){paletteHeader.html(b)
}else{return
}}})
})
}}function callbackHelpPopinLoaded(){$("#helpPopin .helpPopinContent").each(function(){var a=$(this).find(".contentText").html();
var b=$(this).attr("data-detail");
$('#clientInfo .textClientInfo[data-id="'+b+'"] .innerContent').html(a)
})
}function handleMoreChoicesBtnArrow(){var a=$(".expand-moreChoices").find("#moreChoicesBtn");
($(".moreChoicesWrapper").is(":visible"))?a.addClass("opened"):a.removeClass("opened")
}function initMoreChoicesPanelEvent(){$(".expand-moreChoices").click(function(){$("#moreChoicesBtn").toggleClass("opened");
$(".moreChoicesWrapper").slideToggle("show")
})
}function openMoreChoicePanel(){$.jStorage.set("openMoreChoicePanel","true")
}function handleMoreChoicesPanel(){var a=$(".moreChoicesWrapper");
if($.jStorage.get("openMoreChoicePanel")){a.show();
$.jStorage.deleteKey("openMoreChoicePanel")
}else{a.hide()
}}function handleProductPopinPositionWishlist(){var a;
if(RESPONSIVE_MANAGER.isAllSmallMode()){$(".cartModalHeader").css({position:"fixed",left:"auto",right:"0"});
$(".popinArrowSelected ").hide()
}else{if(RESPONSIVE_MANAGER.isMediumLargeMode()&&$("#header-wish").is(":visible")){a=($("#header-wish").offset().left-$(".cartModalHeader").width())+30;
$(".cartModalHeader").css({position:"fixed",left:a});
$(".popinArrowSelected ").show()
}else{$(".popinArrowSelected ").fadeOut();
$(".cartModalHeader").css({left:"auto",right:"0"})
}}}function handleProductPopinPositionAddCart(){if(RESPONSIVE_MANAGER.isAllSmallMode()){$(".cartModalHeader").css({position:"fixed",left:"auto",right:"0"});
$(".popinArrowSelected ").hide()
}else{if(RESPONSIVE_MANAGER.isMediumLargeMode()&&$("#header-cart").is(":visible")){leftPosition=($("#header-cart").offset().left-$(".cartModalHeader").width())+35;
$(".cartModalHeader").css({position:"fixed",left:leftPosition,marginLeft:"0px"});
$(".popinArrowSelected").css({right:"19px"});
$(".popinArrowSelected ").show()
}else{$(".cartModalHeader").css({left:"auto",right:"0"})
}}}function handleModalResizing(){if($(".modal_addToWishlist").is(":visible")){handleProductPopinPositionWishlist()
}else{handleProductPopinPositionAddCart()
}};