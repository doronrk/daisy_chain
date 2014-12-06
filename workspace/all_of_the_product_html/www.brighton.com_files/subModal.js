
if(typeof SubModal=="undefined")
SubModal={};(function(){function addEvent(obj,evType,fn){if(obj.addEventListener){obj.addEventListener(evType,fn,false);return true;}else if(obj.attachEvent){var r=obj.attachEvent("on"+evType,fn);return r;}else{return false;}}
function removeEvent(obj,evType,fn,useCapture){if(obj.removeEventListener){obj.removeEventListener(evType,fn,useCapture);return true;}else if(obj.detachEvent){var r=obj.detachEvent("on"+evType,fn);return r;}else{alert("Handler could not be removed");}}
function getViewportHeight(){if(window.innerHeight!=window.undefined)return window.innerHeight;if(document.compatMode=='CSS1Compat')return document.documentElement.clientHeight;if(document.body)return document.body.clientHeight;return window.undefined;}
function getViewportWidth(){var offset=17;var width=null;if(window.innerWidth!=window.undefined)return window.innerWidth;if(document.compatMode=='CSS1Compat')return document.documentElement.clientWidth;if(document.body)return document.body.clientWidth;}
function getScrollTop(){if(self.pageYOffset)
{return self.pageYOffset;}
else if(document.documentElement&&document.documentElement.scrollTop)
{return document.documentElement.scrollTop;}
else if(document.body)
{return document.body.scrollTop;}}
function getScrollLeft(){if(self.pageXOffset)
{return self.pageXOffset;}
else if(document.documentElement&&document.documentElement.scrollLeft)
{return document.documentElement.scrollLeft;}
else if(document.body)
{return document.body.scrollLeft;}}
var gPopupMask=null;var gPopupContainer=null;var gPopFrame=null;var gReturnFunc;var gPopupIsShown=false;var gDefaultPage="/Public/Scripts/subModal/loading.html";var gCloseImage="/Public/Scripts/subModal/close.gif";var gHideSelects=false;var gReturnVal=null;var gTabIndexes=new Array();var gTabbableTags=new Array("A","BUTTON","TEXTAREA","INPUT","IFRAME");if(!document.all){document.onkeypress=keyDownHandler;}
function initPopUp(){theBody=document.getElementsByTagName('BODY')[0];popmask=document.createElement('div');popmask.id='popupMask';popmask.onclick=function(){SubModal.hidePopWin(false)};popcont=document.createElement('div');popcont.id='popupContainer';popcont.innerHTML=''+'<div id="popupInner">'+'<div id="popupTitleBar">'+'<div id="popupTitle">Loading...</div>'+'<div id="popupControls">'+'<div onclick="SubModal.hidePopWin(false);" id="popCloseBox" ></div>'+'</div>'+'</div>'+'<iframe onload="SubModal.setPopTitle()" src="about:blank" style="width:100%;height:100%;background-color:transparent;" scrolling="auto" frameborder="0" allowtransparency="true" id="popupFrame" name="popupFrame" width="100%" height="100%"></iframe>'+'</div>';theBody.appendChild(popmask);theBody.appendChild(popcont);gPopupMask=document.getElementById("popupMask");gPopupContainer=document.getElementById("popupContainer");gPopFrame=document.getElementById("popupFrame");var brsVersion=parseInt(window.navigator.appVersion.charAt(0),10);if(brsVersion<=6&&window.navigator.userAgent.indexOf("MSIE")>-1){gHideSelects=true;}
var elms=document.getElementsByTagName('a');for(var i=0;i<elms.length;i++){if(elms[i].className.indexOf("submodal")==0){elms[i].onclick=function(){var width=400;var height=200;params=this.className.split('-');if(params.length==3){width=parseInt(params[1]);height=parseInt(params[2]);}
showPopWin(this.href,width,height,null);return false;}}}
gPopFrame.src=gDefaultPage;}
addEvent(window,"load",initPopUp);function showPopWin(url,width,height,returnFunc,showCloseBox){if(!gPopupContainer){setTimeout(function(){showPopWin(url,width,height,returnFunc,showCloseBox)},500);return;}
if(url!=gPopFrame.src)
gPopFrame.src='';if(showCloseBox==null||showCloseBox==true){document.getElementById("popCloseBox").style.display="block";}else{document.getElementById("popCloseBox").style.display="none";}
gPopupIsShown=true;disableTabIndexes();gPopupMask.style.display="block";gPopupContainer.style.display="block";centerPopWin(width,height);var titleBarHeight=parseInt(document.getElementById("popupTitleBar").offsetHeight,10);gPopupContainer.style.width=width+"px";gPopupContainer.style.height=(height+titleBarHeight)+"px";setMaskSize();gPopFrame.style.width=parseInt(document.getElementById("popupTitleBar").offsetWidth,10)+"px";gPopFrame.style.height=(height)+"px";if(gPopFrame.src!=url)
gPopFrame.src=url;gReturnFunc=returnFunc;if(gHideSelects==true){hideSelectBoxes();}
addEvent(gPopFrame.contentWindow,"load",setPopTitle);}
var gi=0;function centerPopWin(width,height){if(gPopupIsShown==true){if(width==null||isNaN(width)){width=gPopupContainer.offsetWidth;}
if(height==null){height=gPopupContainer.offsetHeight;}
var theBody=document.getElementsByTagName("BODY")[0];var scTop=parseInt(getScrollTop(),10);var scLeft=parseInt(theBody.scrollLeft,10);setMaskSize();var titleBarHeight=parseInt(document.getElementById("popupTitleBar").offsetHeight,10);var fullHeight=getViewportHeight();var fullWidth=getViewportWidth();gPopupContainer.style.top=(scTop+((fullHeight-(height+titleBarHeight))/2))+"px";gPopupContainer.style.left=(scLeft+((fullWidth-width)/2))+"px";}}
addEvent(window,"resize",centerPopWin);function setMaskSize(){var theBody=document.getElementsByTagName("BODY")[0];var fullHeight=getViewportHeight();var fullWidth=getViewportWidth();if(fullHeight>theBody.scrollHeight){popHeight=fullHeight;}else{popHeight=theBody.scrollHeight;}
if(fullWidth>theBody.scrollWidth){popWidth=fullWidth;}else{popWidth=theBody.scrollWidth;}
gPopupMask.style.height=popHeight+"px";gPopupMask.style.width=popWidth+"px";}
function hidePopWin(callReturnFunc){gPopupIsShown=false;var theBody=document.getElementsByTagName("BODY")[0];theBody.style.overflow="";restoreTabIndexes();if(gPopupMask==null){return;}
gPopupMask.style.display="none";gPopupContainer.style.display="none";if(callReturnFunc==true&&gReturnFunc!=null){gReturnVal=window.frames["popupFrame"].returnVal;window.setTimeout(function(){gReturnFunc(gReturnVal)},1);}
if(gHideSelects==true){displaySelectBoxes();} gPopFrame.src=gPopFrame.src;}
function setPopTitle(){var popupTitle=document.getElementById("popupTitle");if(gPopFrame){var frameDoc;if(gPopFrame.contentDocument){frameDoc=gPopFrame.contentDocument;}else if(gPopFrame.contentWindow&&gPopFrame.contentWindow.document){frameDoc=gPopFrame.contentWindow.document;}
if(frameDoc){popupTitle.innerHTML=frameDoc.title;}}
if(!popupTitle.innerHTML)
popupTitle.innerHTML="Loading...";}
function keyDownHandler(e){if(gPopupIsShown&&e.keyCode==9)return false;}
function disableTabIndexes(){if(document.all){var i=0;for(var j=0;j<gTabbableTags.length;j++){var tagElements=document.getElementsByTagName(gTabbableTags[j]);for(var k=0;k<tagElements.length;k++){gTabIndexes[i]=tagElements[k].tabIndex;tagElements[k].tabIndex="-1";i++;}}}}
function restoreTabIndexes(){if(document.all){var i=0;for(var j=0;j<gTabbableTags.length;j++){var tagElements=document.getElementsByTagName(gTabbableTags[j]);for(var k=0;k<tagElements.length;k++){tagElements[k].tabIndex=gTabIndexes[i];tagElements[k].tabEnabled=true;i++;}}}}
function hideSelectBoxes(){var x=document.getElementsByTagName("SELECT");for(var i=0;x&&i<x.length;i++){x[i].style.visibility="hidden";}}
function displaySelectBoxes(){var x=document.getElementsByTagName("SELECT");for(var i=0;x&&i<x.length;i++){x[i].style.visibility="visible";}}
SubModal.showPopWin=SubModal.showPopWin||showPopWin;SubModal.hidePopWin=SubModal.hidePopWin||hidePopWin;SubModal.setPopTitle=SubModal.setPopTitle||setPopTitle;})();