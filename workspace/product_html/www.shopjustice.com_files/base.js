var currentCartItems=0;
var removeItem=false;
(function(){if(undefined===window.console||undefined===window.console.log){window.console={"log":function(){}};
}})();
(function(){if(!window.addEventListener){window.attachEvent=window.attachEvent||function(name,callback){};
window.addEventListener=function(name,callback,useCapture){return window.attachEvent(name,callback);
};
}})();
$(document).ready(function(){var departmentSelected=$("#sidebar > div.sideBarTitle > a").text();
var departmentSelected=$.trim(departmentSelected.toLowerCase());
$("ul.nav > li.nav-Cat > a").each(function(){var departmentLi=$.trim($(this).text());
if(departmentSelected===departmentLi.toLowerCase()){$(this).addClass("nav-Selected");
}});
$("#sidebar ul li ul li ul li").prepend("- ");
var lengthNav=$("#sidebar > ul.leftNavCategory > li").length;
if($("#sidebar > ul.leftNavCategory > li").eq(lengthNav-1).children().length>0){$("#sidebar > ul.leftNavCategory > li").eq(lengthNav-1).has("ul").attr("class","last");
}else{$("#sidebar > ul.leftNavCategory > li").eq(lengthNav-2).attr("class","last");
}var lengthFeatureNav=$("#sidebar > ul.featureLeftNav > li").length;
if($("#sidebar > ul.featureLeftNav > li").eq(lengthFeatureNav-1).children().length>0){$("#sidebar > ul.featureLeftNav > li").eq(lengthFeatureNav-1).has("ul").attr("class","last");
}else{$("#sidebar > ul.featureLeftNav > li").eq(lengthFeatureNav-2).attr("class","last");
}$(".ymal ul.cat-list li:nth-child(5n)").addClass("fifth");
$("#sidebar h4:first").addClass("first");
$("ul.tab-nav li:first").addClass("first");
$("ol.checkout-nav li:nth-child(3n)").addClass("third");
$("ol.checkout-nav li:last").addClass("last");
$(".topnav-wl").click(wlExpand);
minicartCloseTimeout=5000;
$("html").click(function(){if($("#minicartHeader").attr("class")==="minicart active"){cartContract();
}});
$("#minicartHeader").click(function(event){event.stopPropagation();
});
$("#minicartHeader .hover").mouseenter(function(){if(getItemCount()>0&&!$(".minicart:first").hasClass("active")){cartExpand();
}else{$(".minicart:first").addClass("active");
}});
$("#minicartHeader").mouseenter(function(){if(typeof timeoutHandle!="undefined"){window.clearTimeout(timeoutHandle);
delete timeoutHandle;
}});
$("#minicartHeader").mouseleave(function(){if(getItemCount()>0){timeoutHandle=window.setTimeout(cartContract,minicartCloseTimeout);
}else{$(".minicart:first").removeClass("active");
}});
$("#minicartHeader .hover").click(function(){window.location=getHttpsUrl()+"/cart";
});
$("textarea").keyup(function(e){var limit=parseInt($(this).attr("maxlength"));
var text=$(this).val();
var chars=text.length;
if(chars>limit){var new_text=text.substr(0,limit);
$(this).val(new_text);
}});
changeSelectColor();
});
$("ul.cat-list").ready(function(){$("ul.cat-list li:nth-child(4n)").addClass("fourth");
});
function getCookieValue(key){currentcookie=document.cookie;
if(currentcookie.length>0){firstidx=currentcookie.indexOf(key+"=");
if(firstidx!=-1){firstidx=firstidx+key.length+1;
lastidx=currentcookie.indexOf(";",firstidx);
if(lastidx==-1){lastidx=currentcookie.length;
}return unescape(currentcookie.substring(firstidx,lastidx));
}}return"";
}function cartExpand(done){$.ajax({url:"/minicart/modals/modal-minicart.jsp",cache:false,dataType:"html",success:function(data){loadMini();
jQuery(".minicart:first").addClass("active");
$("#minicart").html(data);
if($(".minicart .body")[0].scrollHeight>290){$(".minicart .body").jScrollPane({verticalDragMinHeight:118,verticalDragMaxHeight:118,autoReinitialise:true});
}preloadCheckoutButton=new Image();
preloadCheckoutButton.src="/img/minicart/view_cart_checkout_on.gif";
$("#checkout-button").mouseenter(function(){$("#checkout-button").attr("src","/img/minicart/view_cart_checkout_on.gif");
});
$("#checkout-button").mouseleave(function(){$("#checkout-button").attr("src","/img/minicart/view_cart_checkout_off.gif");
});
if(typeof done==="function"){done();
}currentCartItems=getItemCount();
if(($(".donations-combobox-container").length>0)&&($(".mc-raw-block").length>0)&&(currentCartItems>1)&&!removeItem){$(".donations-combobox-container").css("visibility","hidden");
removeItem=false;
}}});
}function getItemCount(){var itemCount=0;
var itemCountElementText=$("#minicartHeader .item-amount").text();
if(itemCountElementText!=""){var itemCountStr=itemCountElementText.match(/\d+/);
if(itemCountStr!=null){itemCount=parseInt(itemCountStr,10);
}}return itemCount;
}function wlExpand(){$.ajax({url:"/wishlist/modals/modal-wishlist.jsp",cache:false,dataType:"html",success:function(data){$("#miniwishlist").html(data);
loadMiniWl();
}});
}function loadMini(){$("#minicart").css("height","auto");
$("#minicart").css("display","block");
if($("#miniwishlist").css("display")!="none"){$("#miniwishlist").animate({"height":0},200);
$("#miniwishlist").fadeOut("fast");
}}function loadMiniWl(){$("#miniwishlist").css("height","auto");
var height=$("#miniwishlist").height();
$("#miniwishlist").css("height",height+"px");
var wlLinkPos=$(".topnav-wl").position();
var wlDivPos=$("#miniwishlist").position();
var wlNewLeft=wlLinkPos.left+parseInt($(".topnav-wl").css("margin-left"));
$("#miniwishlist").css("top",wlLinkPos.top+$(".topnav-wl").height());
$("#miniwishlist").css("left",wlNewLeft);
$("#miniwishlist").animate({"height":height},200);
$("#miniwishlist").fadeIn("fast");
$("#minicart").animate({"height":0},200);
$("#minicart").fadeOut("fast");
}function autoCloseMinicart(){if(typeof timeoutHandle!="undefined"){window.clearTimeout(timeoutHandle);
delete timeoutHandle;
}timeoutHandle=window.setTimeout(cartContract,minicartCloseTimeout);
}function cartContract(){$("#minicart").fadeOut("fast",function(){if(($(".donations-combobox-container").length>0)&&($(".mc-raw-block").length>0)&&(currentCartItems>1)){$(".donations-combobox-container").css("visibility","");
}$("#minicart").empty();
jQuery(".minicart:first").removeClass("active");
});
}function wlContract(){$("#miniwishlist").animate({"height":0},200);
$("#miniwishlist").fadeOut("fast");
$(".close-miniwishlist").remove();
$(".miniwishlist-header").remove();
$(".miniwishlist-list").remove();
$(".miniwishlist-total").remove();
$(".miniwishlist-button").remove();
}function popupOptions(){this.height=screen.availHeight/2;
this.width=screen.availWidth/2;
this.top=0;
this.left=0;
this.toolbar=false;
this.location=false;
this.directories=false;
this.status=false;
this.menubar=false;
this.scrollbars=false;
this.resizable=false;
this.dependent=false;
this.build=_buildOptions;
}function _buildOptions(){var sTemp="";
sTemp+="height="+this.height+",";
sTemp+="width="+this.width+",";
sTemp+="top="+this.top+",";
sTemp+="left="+this.left+",";
sTemp+="scrollbars="+((this.scrollbars)?"yes":"no")+",";
sTemp+="toolbar="+((this.toolbar)?"yes":"no")+",";
sTemp+="location="+((this.location)?"yes":"no")+",";
sTemp+="directories="+((this.directories)?"yes":"no")+",";
sTemp+="status="+((this.status)?"yes":"no")+",";
sTemp+="menubar="+((this.menubar)?"yes":"no")+",";
sTemp+="resizable="+((this.resizable)?"yes":"no")+",";
sTemp+="dependent="+((this.dependent)?"yes":"no");
return(sTemp);
}function popup(winlink,winname){var winwidth=(arguments.length>=3)?arguments[2]:screen.availWidth/2;
var winheight=(arguments.length>=4)?arguments[3]:screen.availHeight/2;
var winscroll=(arguments.length>=5)?((arguments[4]=="1")?true:false):false;
var wintoolbar=(arguments.length>=6)?((arguments[5]=="1")?true:false):false;
var winresize=(arguments.length>=7)?((arguments[6]=="1")?true:false):true;
var winmenubar=(arguments.length>=8)?((arguments[7]=="1")?true:false):false;
var oOption=new popupOptions();
oOption.width=winwidth;
oOption.height=winheight;
oOption.scrollbars=winscroll;
oOption.toolbar=wintoolbar;
oOption.resizable=winresize;
oOption.menubar=winmenubar;
oOption.top=((screen.availHeight/2)-(winheight/2));
oOption.left=((screen.availWidth/2)-(winwidth/2));
oOption.location=false;
oOption.directories=false;
oOption.status=false;
oOption.dependent=false;
var sOptions=oOption.build();
window.open(winlink,null,sOptions);
}function addElement(rootElementID,content){$(rootElementID).append(content);
}if(typeof String.prototype.trim!=="function"){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"");
};
}function createPinterestLink(urlProduct,imageUrl,productDescription){var tempUrl="http://pinterest.com/pin/create/button/?"+encodeURI("url="+urlProduct+"&media="+imageUrl+"&maskuse=off&wid=1119&size=1121,1254&fit=crop&qlt=70,0&description="+productDescription);
popup(tempUrl,"pinterest",655,300,true);
}function createFacebookLink(urlProduct,colorCode){if(urlProduct==""){urlProduct="www.justice.com";
}var tempUrl='<iframe src="//www.facebook.com/plugins/like.php?api_key=240710779389081&amp;href=http://'+urlProduct+"?colorCode="+encodeURI(colorCode)+'&amp;send=false&amp;layout=box_count&locale=en_US&amp;node_type=link&amp;sdk=joey&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=90" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:50px; height:90px;" allowTransparency="true"></iframe>';
$("#facebookIframe").html(tempUrl);
}function checkBoxClick(){this.blur();
this.focus();
}function changeSelectColor(){$("select").each(function(){var selectOption=$(this).val();
if(selectOption==="0"||selectOption===""||selectOption===null){$(this).css({"color":"#666"});
}else{$(this).css({"color":"#333"});
}});
$("select").change(function(){if($(this).val()==="0"||$(this).val()===""||$(this).val()===null){$(this).css({"color":"#666"});
}else{$(this).css({"color":"#333"});
}});
}function setError(msg,resetMsg,productId,clook,isNote,noBorder){var messageField="addItemTocartError";
clook=clook||"false";
isNote=isNote||false;
noBorder=noBorder||false;
if(isNote){messageField="itemPresellMsg";
}if(clook=="true"){messageField="clookAddItemTocartError";
if(isNote){messageField="clookItemPresellMsg";
}}if(resetMsg){$("#"+messageField+productId).html("");
$("#"+messageField+productId).hide();
}else{msgDiv=$("<div>"+msg+"</div>");
if(productId==""||productId==undefined){return msgDiv.addClass("error-message");
}else{currentMessage=$("#"+messageField+productId).text();
addMessage=currentMessage.indexOf(msg);
if(addMessage<0){$("#"+messageField+productId).append(msgDiv);
}if(noBorder){$("#"+messageField+productId).css("border","none");
}$("#"+messageField+productId).show();
}}}(function(){window.jus=window.jus||{};
window.jus.cookies=window.jus.cookies||{};
window.jus.cookies.areCookiesEnabled=areCookiesEnabled;
window.jus.cookies.setUpLightboxSignUpCookies=setUpLightboxSignUpCookies;
window.jus.cookies.getExpirationTimeForCookies=getExpirationTimeForCookies;
function areCookiesEnabled(){return navigator.cookieEnabled&&testWithCookie();
function testWithCookie(){document.cookie="areCookiesEnabled=true";
return document.cookie!==undefined&&document.cookie.length>0;
}}function setUpLightboxSignUpCookies(fromMarketingEmail,lightboxPresentedCookieName,lightboxPresentedCookieExpirationTime,lightboxAgeGateCookieName,lightboxAgeGateCookieExpirationTime){var presentLightbox=false;
if(areCookiesEnabled()){if(fromMarketingEmail=="true"){console.log("Lightbox - From marketing email");
addLightboxCookie(lightboxPresentedCookieName,lightboxPresentedCookieExpirationTime);
removeLightboxCookie(lightboxAgeGateCookieName);
}else{if($.cookie(lightboxAgeGateCookieName)!=null&&$.cookie(lightboxPresentedCookieName)!=null){removeLightboxCookie(lightboxAgeGateCookieName);
}if($.cookie(lightboxAgeGateCookieName)==null&&$.cookie(lightboxPresentedCookieName)==null){console.log("Lightbox - Displaying sign up overlay");
addLightboxCookie(lightboxPresentedCookieName,lightboxPresentedCookieExpirationTime);
presentLightbox=true;
}}}else{console.log("Lightbox - Cookies disabled");
}return presentLightbox;
}function removeLightboxCookie(cookieName){$.removeCookie(cookieName,{path:"/"});
}function addLightboxCookie(cookieName,lightboxPresentedCookieExpirationTime){$.cookie(cookieName,true,{path:"/",expires:getExpirationTimeForCookies(lightboxPresentedCookieExpirationTime)});
}function getExpirationTimeForCookies(secondsNumber){var date=new Date();
date.setTime(date.getTime()+(secondsNumber*1000));
return date;
}})();
(function(){var findPageSortAndProductOriginData=function(dataLayer){var keysToFind=["productsDisplayed","productsInSearchResults"],firstProduct,productOriginMap={productsDisplayed:"category page",productsInSearchResults:"search page"},productOrigin;
for(var idx=0;
dataLayer&&!firstProduct&&idx<keysToFind.length;
idx++){var currentKey=keysToFind[idx],listOfProducts=dataLayer[currentKey];
firstProduct=listOfProducts&&listOfProducts.length&&listOfProducts[0];
productOrigin=productOriginMap[currentKey];
}console.log("findPageSortAndProductOriginData(): return values:",{firstProduct:firstProduct,productOrigin:productOrigin});
return{firstProduct:firstProduct,productOrigin:productOrigin};
};
var jus=window.jus||{};
var productsViewedKey="productsViewed",objectReadyKey="objectReady";
var omniture={constants:{PRODUCTS_VIEWED:productsViewedKey,OBJECT_READY:objectReadyKey},buildOmnitureShareObject:function(shareType){return{siteEvents:{socialShare:true},shareType:shareType};
},lightboxFormErrors:function(formErrorsLightbox){return{formErrors:formErrorsLightbox,formName:"email modal"};
},lightboxThankYou:function(){return{siteEvents:{emailModalComplete:true}};
},lightboxUserClosedSignUp:function(){return{siteEvents:{emailModalClosedByUser:true}};
},lightboxUserOpenSignUp:function(){return{siteEvents:{displayEmailmodal:true}};
},executeEvent:function(eventDataLayer){try{console.log("Bootstrapper._trackAnalytics:",eventDataLayer);
Bootstrapper._trackAnalytics(eventDataLayer);
}catch(e){console.log(e);
}},messaging:{publish:function(key,object){var keySubscribers=this.subscribers[key];
if(keySubscribers){$.each(keySubscribers,function(idx,subscriber){subscriber.consume(object,key);
});
}},subscribe:function(key,subscriber){var subscribersLength=(this.subscribers[key]=this.subscribers[key]||[]).length;
this.subscribers[key][subscribersLength]=subscriber;
},subscribers:{}},quickViewAsyncHolder:{consume:function(object,key){this.keysUsed[key]=true;
$.extend(this.object,object);
this.onConsume();
},onConsume:function(){if(this.allAreTrue(this.keysUsed)){this.sendEvent(this.object);
this.reset();
}},allAreTrue:function(array){var result=true;
$.each(array,function(idx,item){result=result&&item;
});
return result;
},sendEvent:function(object){this.messaging.publish(this.sendEventKey,object);
},reset:function(){this.object={};
for(var k in this.keysUsed){this.keysUsed[k]=false;
}},sendEventKey:objectReadyKey,object:{},keysUsed:{price:false,size:false}},productReadyMessageReceiver:{consume:function(object,key){if(this.isModal){this.sendModalEvent(object);
}else{this.sendNoModalEvent(object);
}},isModal:true,isTransient:true},persistenceLayer:{storeName:"omnitureStore",init:function(options){this.store=new Persist.Store(this.storeName,options);
},retrieve:function(key,defaultValue){var value=this.store.get(key);
return $.evalJSON(value)||defaultValue;
},append:function(key,object){var savedObject=this.retrieve(key,[]);
savedObject.push(object);
this.store.set(key,$.toJSON(savedObject));
this.store.save();
return savedObject;
},clear:function(){var store=this.store;
store.iterate(function(k,v){store.remove(k);
});
store.save();
}}};
for(var k in omniture.quickViewAsyncHolder.keysUsed){omniture.messaging.subscribe(k,omniture.quickViewAsyncHolder);
}omniture.quickViewAsyncHolder.messaging=omniture.messaging;
omniture.messaging.subscribe(omniture.quickViewAsyncHolder.sendEventKey,omniture.productReadyMessageReceiver);
omniture.productReadyMessageReceiver.sendModalEvent=function(object){var pageSortAndProductOrigin=findPageSortAndProductOriginData(window.dataLayer)||{};
var firstProduct=pageSortAndProductOrigin.firstProduct||{};
var pageSort=firstProduct.pageSort;
var productOrigin=pageSortAndProductOrigin.productOrigin;
var productListToAddPageSortAndProductOrigin;
if($.url().attr("path").indexOf("/cart")!=-1){productOrigin="upsell";
}console.log("sendModalEvent(): pageSortAndProductOrigin",pageSortAndProductOrigin);
console.log("sendModalEvent(): about to inject pageSort and productOrigin",pageSort,productOrigin);
productListToAddPageSortAndProductOrigin=object.productsQuickViewed||object.productsUpsell||{};
$.extend(productListToAddPageSortAndProductOrigin[0],{productOrigin:productOrigin,pageSort:pageSort});
this.executeEvent(object);
};
omniture.productReadyMessageReceiver.executeEvent=omniture.executeEvent;
omniture.productReadyMessageReceiver.sendNoModalEvent=function(object){if(!omniture.productReadyMessageReceiver.isTransient){omniture.persistenceLayer.append(productsViewedKey,object.productsDetailView[0]);
}};
jus.omniture=omniture;
window.jus=jus;
})();
$(document).ready(function(){if(window.dataLayer){var key=jus.omniture.constants.PRODUCTS_VIEWED;
jus.omniture.persistenceLayer.init({defer:true});
window.dataLayer.productsViewed=jus.omniture.persistenceLayer.retrieve(key,[]);
}});
function getHttpsUrl(){return"https://"+window.document.location.hostname+((httpsPort&&httpsPort!="443")?(":"+httpsPort):"");
}(function(){createNamespace();
createFunctions();
function createNamespace(){window.jus=window.jus||{};
window.jus.signup=window.jus.signup||{};
}function createFunctions(){window.jus.signup.bindFooterLink=bindFooterLink;
window.jus.signup.logout=logout;
window.jus.signup.bindLogoutToFooterLink=bindLogoutToFooterLink;
function bindLogoutToFooterLink(){bindFooterLink(logout);
}function bindFooterLink(callback){$(".footer-signUp-link").click(callback);
}function logout(event){event.preventDefault();
$("#signOutFormFooter").submit();
}}})();
