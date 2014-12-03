/* Script imported from http://www.ralphlauren.com/include/expressShop.js */
function toggleIntro(){document.getElementById("expressShopIntro").style.display="";setTimeout("document.getElementById('expressShopIntro').style.display='none'",15000);}function showButton(buttonNumber){document.getElementById(buttonNumber).style.display="";}function hideButton(buttonNumber){document.getElementById(buttonNumber).style.display="none";}function centerDiv(){if(parseInt(navigator.appVersion)>3){if(navigator.appName.indexOf("Microsoft")!=-1){winW=document.body.offsetWidth;winH=document.body.offsetHeight;}else{winW=window.innerWidth;winH=window.innerHeight;}var expressShopDiv=document.getElementById("expressShop");var scrOfX=0,scrOfY=0;if(typeof(window.pageYOffset)=="number"){scrOfY=window.pageYOffset;scrOfX=window.pageXOffset;}else{if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){scrOfY=document.body.scrollTop;scrOfX=document.body.scrollLeft;}else{if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){scrOfY=document.documentElement.scrollTop;scrOfX=document.documentElement.scrollLeft;}}}document.getElementById("expressShop").style.zIndex="-100";document.getElementById("expressShop").style.display="";leftMarginBegins=((winW-expressShopDiv.offsetWidth)/2)+scrOfX;topMarginBegins=((winH-expressShopDiv.offsetHeight)/2)+scrOfY;document.getElementById("expressShop").style.left=leftMarginBegins;document.getElementById("expressShop").style.top=topMarginBegins;}}var xmlHttp;var bSaf=(navigator.userAgent.indexOf("Safari")!=-1);var bOpera=(navigator.userAgent.indexOf("Opera")!=-1);var bMoz=(navigator.appName=="Netscape");function execJS(node){var st=node.getElementsByTagName("SCRIPT");var strExec;for(var i=0;i<st.length;i++){if(bSaf){strExec=st[i].innerHTML;}else{if(bOpera){strExec=st[i].text;}else{if(bMoz){strExec=st[i].textContent;if(strExec==undefined){strExec=st[i].text;}}else{strExec=st[i].text;}}}try{eval(strExec);}catch(e){alert(e);}}}function createXMLHttpRequest(){if(window.ActiveXObject){xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");}else{if(window.XMLHttpRequest){xmlHttp=new XMLHttpRequest();}}}function showProductPopup(showThisProdID,currentCategoryId,currentProduct){createXMLHttpRequest();resetVars();var queryString2="../include/productDetails.jsp?productId="+showThisProdID+"&currentCategoryId="+currentCategoryId+"&currentProduct="+currentProduct;xmlHttp.onreadystatechange=showExpressShop;xmlHttp.open("GET",queryString2,true);xmlHttp.setRequestHeader("If-Modified-Since","Wed, 15 Nov 1995 00:00:00 GMT");xmlHttp.send(null);}function showExpressShop(){document.getElementById("expressShop").innerHTML="";if(xmlHttp.readyState==4){if(xmlHttp.status==200){document.getElementById("expressShop").innerHTML=xmlHttp.responseText;execJS($("expressShop"));document.getElementById("expressShop").style.display="";}else{alert("Unable to retrieve a response from the server");}}centerDiv();var fwSearchArray=document.getElementsByName("fwSearch");var brandFilterArray=document.getElementsByName("brandFilter");var brandFilterArray2=document.getElementsByName("brandFilter2");if(brandFilterArray.length>0){if(document.getElementsByName("fpricesort")){document.brandFilter.fpricesort.style.visibility="hidden";}}if(brandFilterArray2.length>0){if(document.getElementsByName("fpricesort")){document.brandFilter2.fpricesort.style.visibility="hidden";}}if(fwSearchArray.length>0){if(document.getElementsByName("fsize")){document.fwSearch.fsize.style.visibility="hidden";}if(document.getElementsByName("fpricesort")){document.fwSearch.fpricesort.style.visibility="hidden";}}document.getElementById("expressShop").style.zIndex="103";}function showAddMore(grouping_num){if(grouping_num=="first_group"){document.getElementById("dvAddMore1").style.display="";document.getElementById("dvBuyMoreLink").style.display="none";document.getElementById("dvBuyMoreLink_2").style.display="";grouping=grouping+1;}else{document.getElementById("dvAddMore2").style.display="";document.getElementById("dvBuyMoreLink_2").style.display="none";grouping=grouping+1;}centerDiv();document.getElementById("expressShop").style.zIndex="103";}function hideExpressShop(){document.getElementById("expressShop").style.display="none";var fwSearchArray=document.getElementsByName("fwSearch");var brandFilterArray=document.getElementsByName("brandFilter");var brandFilterArray2=document.getElementsByName("brandFilter2");if(brandFilterArray.length>0){if(document.getElementsByName("fpricesort")){document.brandFilter.fpricesort.style.visibility="visible";}}if(brandFilterArray2.length>0){if(document.getElementsByName("fpricesort")){document.brandFilter2.fpricesort.style.visibility="visible";}}if(fwSearchArray.length>0){if(document.getElementsByName("fsize")){document.fwSearch.fsize.style.visibility="visible";}if(document.getElementsByName("fpricesort")){document.fwSearch.fpricesort.style.visibility="visible";}}grouping=0;}
/*
	Lightbox JS: Fullsize Image Overlays 
	by Lokesh Dhakar - http://www.huddletogether.com
	For more information on this script, visit:
	http://huddletogether.com/projects/lightbox/
	Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
	(basically, do anything you want, just leave my name and link)
	Table of Contents
	-----------------
	Configuration
	Functions
	- getPageScroll()
	- getPageSize()
	- pause()
	- showLightbox()
	- hideLightbox()
	- initLightbox()
	- addLoadEvent()
	Function Calls
	- addLoadEvent(initLightbox)
*/
var loadingImage="../images/pixel.gif";var closeButton="../images/pixel.gif";function getPageScroll(){var yScroll;if(self.pageYOffset){yScroll=self.pageYOffset;}else{if(document.documentElement&&document.documentElement.scrollTop){yScroll=document.documentElement.scrollTop;}else{if(document.body){yScroll=document.body.scrollTop;}}}arrayPageScroll=new Array("",yScroll);return arrayPageScroll;}function getPageSize(){var xScroll,yScroll;if(window.innerHeight&&window.scrollMaxY){xScroll=document.body.scrollWidth;yScroll=window.innerHeight+window.scrollMaxY;}else{if(document.body.scrollHeight>document.body.offsetHeight){xScroll=document.body.scrollWidth;yScroll=document.body.scrollHeight;}else{xScroll=document.body.offsetWidth;yScroll=document.body.offsetHeight;}}var windowWidth,windowHeight;if(self.innerHeight){windowWidth=self.innerWidth;windowHeight=self.innerHeight;}else{if(document.documentElement&&document.documentElement.clientHeight){windowWidth=document.documentElement.clientWidth;windowHeight=document.documentElement.clientHeight;}else{if(document.body){windowWidth=document.body.clientWidth;windowHeight=document.body.clientHeight;}}}if(yScroll<windowHeight){pageHeight=windowHeight;}else{pageHeight=yScroll;}if(xScroll<windowWidth){pageWidth=windowWidth;}else{pageWidth=xScroll;}arrayPageSize=new Array(pageWidth,pageHeight,windowWidth,windowHeight);return arrayPageSize;}function pause(numberMillis){var now=new Date();var exitTime=now.getTime()+numberMillis;while(true){now=new Date();if(now.getTime()>exitTime){return;}}}function showLightbox(objLink){var objOverlay=document.getElementById("overlay");var objLightbox=document.getElementById("lightbox");var objCaption=document.getElementById("lightboxCaption");var objImage=document.getElementById("lightboxImage");var objLoadingImage=document.getElementById("loadingImage");var objLightboxDetails=document.getElementById("lightboxDetails");var arrayPageSize=getPageSize();var arrayPageScroll=getPageScroll();if(objLoadingImage){objLoadingImage.style.top=(arrayPageScroll[1]+((arrayPageSize[3]-35-objLoadingImage.height)/2)+"px");objLoadingImage.style.left=(((arrayPageSize[0]-20-objLoadingImage.width)/2)+"px");objLoadingImage.style.display="block";}objOverlay.style.height=(arrayPageSize[1]+"px");objOverlay.style.display="block";imgPreload=new Image();imgPreload.onload=function(){objImage.src=objLink.href;var lightboxTop=arrayPageScroll[1]+((arrayPageSize[3]-35-imgPreload.height)/2);var lightboxLeft=((arrayPageSize[0]-20-imgPreload.width)/2);objLightbox.style.top=(lightboxTop<0)?"0px":lightboxTop+"px";objLightbox.style.left=(lightboxLeft<0)?"0px":lightboxLeft+"px";objLightboxDetails.style.width=imgPreload.width+"px";if(objLink.getAttribute("title")){objCaption.style.display="block";objCaption.innerHTML=objLink.getAttribute("title");}else{objCaption.style.display="none";}if(navigator.appVersion.indexOf("MSIE")!=-1){pause(250);}if(objLoadingImage){objLoadingImage.style.display="none";}selects=document.getElementsByTagName("select");for(i=0;i!=selects.length;i++){selects[i].style.visibility="hidden";}objLightbox.style.display="block";arrayPageSize=getPageSize();objOverlay.style.height=(arrayPageSize[1]+"px");return false;};imgPreload.src=objLink.href;}function hideLightbox(){objOverlay=document.getElementById("overlay");objLightbox=document.getElementById("lightbox");if(objOverlay!=null){objOverlay.style.display="none";}if(objLightbox!=null){objLightbox.style.display="none";}document.onkeypress="";}function toggleTabContent(show_content,hide_content1,hide_content2){var showContent=document.getElementById(show_content);var hideContent1=document.getElementById(hide_content1);var hideContent2=document.getElementById(hide_content2);showContent.style.display="";hideContent1.style.display="none";hideContent2.style.display="none";document.getElementById("leftShadow").height=document.getElementById(show_content).offsetHeight+35;}function toggleTabOn(toggleTabOn,toggleTabOff,toggleTabOff2){var toggleTabOn_=document.getElementById(toggleTabOn);var toggleTabOff_=document.getElementById(toggleTabOff);var toggleTabOff2_=document.getElementById(toggleTabOff2);toggleTabOn_.style.display="";toggleTabOff_.style.display="none";toggleTabOff2_.style.display="none";}function initLightbox(){if(!document.getElementsByTagName){return;}var anchors=document.getElementsByTagName("a");for(var i=0;i<anchors.length;i++){var anchor=anchors[i];if(anchor.getAttribute("href")&&(anchor.getAttribute("rel")=="lightbox")){anchor.onclick=function(){showLightbox(this);return false;};}}var objBody=document.getElementsByTagName("body").item(0);var objOverlay=document.createElement("div");objOverlay.setAttribute("id","overlay");objOverlay.onclick=function(){hideLightbox();hideExpressShop();return false;};objOverlay.style.display="none";objOverlay.style.position="absolute";objOverlay.style.top="0";objOverlay.style.left="0";objOverlay.style.zIndex="90";objOverlay.style.width="100%";objBody.insertBefore(objOverlay,objBody.firstChild);var arrayPageSize=getPageSize();var arrayPageScroll=getPageScroll();var imgPreloader=new Image();imgPreloader.onload=function(){var objLoadingImageLink=document.createElement("a");objLoadingImageLink.setAttribute("href","#");objLoadingImageLink.onclick=function(){hideLightbox();return false;};objOverlay.appendChild(objLoadingImageLink);var objLoadingImage=document.createElement("img");objLoadingImage.src=loadingImage;objLoadingImage.setAttribute("id","loadingImage");objLoadingImage.style.position="absolute";objLoadingImage.style.zIndex="150";objLoadingImageLink.appendChild(objLoadingImage);imgPreloader.onload=function(){};return false;};imgPreloader.src=loadingImage;var objLightbox=document.createElement("div");objLightbox.setAttribute("id","lightbox");objLightbox.style.display="none";objLightbox.style.position="absolute";objLightbox.style.zIndex="100";objBody.insertBefore(objLightbox,objOverlay.nextSibling);var objLink=document.createElement("a");objLink.setAttribute("href","#");objLink.setAttribute("title","Click to close");objLink.onclick=function(){hideLightbox();return false;};objLightbox.appendChild(objLink);var imgPreloadCloseButton=new Image();imgPreloadCloseButton.onload=function(){var objCloseButton=document.createElement("img");objCloseButton.src=closeButton;objCloseButton.setAttribute("id","closeButton");objCloseButton.style.position="absolute";objCloseButton.style.zIndex="200";objLink.appendChild(objCloseButton);return false;};imgPreloadCloseButton.src=closeButton;var objImage=document.createElement("img");objImage.setAttribute("id","lightboxImage");objLink.appendChild(objImage);var objLightboxDetails=document.createElement("div");objLightboxDetails.setAttribute("id","lightboxDetails");objLightbox.appendChild(objLightboxDetails);var objCaption=document.createElement("div");objCaption.setAttribute("id","lightboxCaption");objCaption.style.display="none";objLightboxDetails.appendChild(objCaption);var objKeyboardMsg=document.createElement("div");objKeyboardMsg.setAttribute("id","keyboardMsg");objKeyboardMsg.innerHTML=" ";objLightboxDetails.appendChild(objKeyboardMsg);}function addLoadEvent(func){var oldonload=window.onload;if(typeof window.onload!="function"){window.onload=func;}else{window.onload=function(){oldonload();func();};}}addLoadEvent(initLightbox);var sizeAvail="true";function setSizeAvail(flag){sizeAvail=flag;}var swatchIds="";function updateSwatchIds(id){swatchIds=swatchIds+"|"+id;}var swatchSize=0;function setSwatchSize(size){swatchSize=size;if(size==0){$("dvCustomTagSwatch").style.display="none";}}var sizeCount=0;function setSizeCount(pSizeCount){sizeCount=pSizeCount;if(sizeCount==0){$("drpCustomTagProductSize").style.display="none";}}var colorCount=0;function setColorCount(pColorCount){colorCount=pColorCount;if(colorCount==0){$("drpCustomTagProductColor").style.display="none";}}function dispBuyMore(){if(swatchSize<2&&sizeCount<2){$("dvBuyMore").style.display="none";}}function resetVars(){mainColorMap=new Array();mainSizeMap=new Array();prodId="";swatchIds="";swatchSize=0;sizeAvail="true";newCartProducts=new Array();newCartProductsMono=new Array();grouping=0;allItemArray=new Array();}var newCartProducts=new Array();function loadNewCartProducts(productId,skuId){newCartProducts[newCartProducts.length]={productId:productId,skuId:skuId};}var newCartProductsMono=new Array();function loadNewCartProductsMono(productId,skuId,isMonogrammed){newCartProductsMono[newCartProductsMono.length]={productId:productId,skuId:skuId,isMonogrammed:isMonogrammed};}var allItemArray=new Array();function loadAllCartProducts(productId,skuId){allItemArray[allItemArray.length]={productId:productId,skuId:skuId};}var miniCartLen;function setMiniCartLen(pMiniCartLen){miniCartLen=pMiniCartLen;}function displayRecentItems(){if(newCartProducts&&newCartProducts.length>0){var i=newCartProducts.length-1;for(i;i>=0;i--){var cartDiv3="minicart11_"+newCartProducts[i].productId+"_"+newCartProducts[i].skuId;var cartDiv4="minicart11_"+newCartProducts[i].productId+"_"+newCartProducts[i].skuId+"_CYO";if(document.getElementById(cartDiv3)){document.getElementById(cartDiv3).style.display="block";}if(document.getElementById(cartDiv4)&&document.getElementById(cartDiv4).innerHTML.length>100){document.getElementById(cartDiv4).style.display="block";document.getElementById(cartDiv4).style.visibility="visible";}}var i=newCartProducts.length-1;for(i;i>=0;i--){if(document.getElementById("minicart11_innerCYOMsgTop_"+newCartProducts[i].productId)){document.getElementById("minicart11_innerCYOMsgTop_"+newCartProducts[i].productId).style.display="block";document.getElementById("minicart11_innerCYOMsgTop_"+newCartProducts[i].productId).style.visibility="visible";break;}else{if(document.getElementById("minicart11_innerCYOMsgBottom_"+newCartProducts[i].productId)){document.getElementById("minicart11_innerCYOMsgBottom_"+newCartProducts[i].productId).style.display="block";document.getElementById("minicart11_innerCYOMsgBottom_"+newCartProducts[i].productId).style.visibility="visible";break;}}}newCartProducts=new Array();}if(newCartProductsMono&&newCartProductsMono.length>0){var i=newCartProductsMono.length-1;for(i;i>=0;i--){var cartDiv3="minicart11_"+newCartProductsMono[i].productId+"_"+newCartProductsMono[i].skuId;var cartDiv4="minicart11_"+newCartProductsMono[i].productId+"_"+newCartProductsMono[i].skuId+"_CYO_mono";if(document.getElementById(cartDiv3)){document.getElementById(cartDiv3).style.display="block";}if(document.getElementById(cartDiv4)&&document.getElementById(cartDiv4).innerHTML.length>100&&newCartProductsMono[i].isMonogrammed&&newCartProductsMono[i].isMonogrammed==true){document.getElementById(cartDiv4).style.display="block";document.getElementById(cartDiv4).style.visibility="visible";}}newCartProductsMono=new Array();}}var mainColorMap=new Array();function loadMainColorMap(colorId,mainImg,sizes,colorTitle){mainColorMap[mainColorMap.length]={colorId:colorId,mainImg:mainImg,sizes:sizes,colorTitle:colorTitle};}mainSizeMap=new Array();function loadMainSizeMap(sku,price,colorId,sizeId,sizeDesc){mainSizeMap[mainSizeMap.length]={sku:sku,price:price,colorId:colorId,sizeId:sizeId,sizeDesc:sizeDesc};}var prodId="";function setProdId(id){prodId=id;}