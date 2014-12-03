/* Script imported from http://s7d2.scene7.com/s7viewers/dhtml/4.4/flyout/Utils.js */
/*
ADOBE CONFIDENTIAL
Copyright 2011 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  All information contained herein is, and remains the property of Adobe Systems Incorporated and its suppliers,
if any.  The intellectual and technical concepts contained herein are proprietary to Adobe Systems Incorporated and its
suppliers and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or 
copyright law. Dissemination of this information or reproduction of this material is strictly forbidden unless prior 
written permission is obtained from Adobe Systems Incorporated.
*/
s7js.flyout.Utils=function(){};s7js.flyout.Utils.addEventListener=function(inSrc,inEvent,inHandler,inUseCapture){if(inSrc.addEventListener){return inSrc.addEventListener(inEvent,inHandler,inUseCapture);}else{return inSrc.attachEvent("on"+inEvent,inHandler);}};s7js.flyout.Utils.removeEventListener=function(inSrc,inEvent,inHandler,inUseCapture){if(inSrc.addEventListener){return inSrc.removeEventListener(inEvent,inHandler,inUseCapture);}else{return inSrc.detachEvent("on"+inEvent,inHandler);}};s7js.flyout.Utils.stopPropagation=function(inE){if(window.event){inE.cancelBubble=true;}else{inE.stopPropagation();}};s7js.flyout.Utils.preventDefault=function(inE){if(window.event){inE.returnValue=false;}else{inE.preventDefault();}};s7js.flyout.Utils.setAttribute=function(inElement,inName,inValue){inElement.setAttribute(inName,inValue);inElement.className=inElement.className;};s7js.flyout.Utils.setOpacity=function(inElement,inOpacity){if(inElement.filters){if(inOpacity!=1){inElement.style.filter="alpha(opacity="+(100*inOpacity)+")";}else{inElement.style.filter="";}}else{inElement.style.opacity=inOpacity;}};s7js.flyout.Utils.disableDragBehavior=function(inElement){inElement.ondragstart=function(){return false;};};s7js.flyout.Utils.log=function(inS){if(window.console){console.log(inS);}else{alert(inS);}};s7js.flyout.Utils.measureDivSize=function(inContainer,inClassName){var tmpDiv=document.createElement("div");tmpDiv.className=inClassName;inContainer.appendChild(tmpDiv);var res={width:tmpDiv.offsetWidth,height:tmpDiv.offsetHeight};inContainer.removeChild(tmpDiv);return res;};s7js.flyout.Utils.measureDivPosition=function(inContainer,inClassName){var tmpDivCont=document.createElement("div");tmpDivCont.style.position="absolute";inContainer.appendChild(tmpDivCont);var tmpDiv=document.createElement("div");tmpDiv.className=inClassName;tmpDiv.style.position="absolute";tmpDivCont.appendChild(tmpDiv);var res={x:tmpDiv.offsetLeft,y:tmpDiv.offsetTop};tmpDivCont.removeChild(tmpDiv);inContainer.removeChild(tmpDivCont);return res;};s7js.flyout.Utils.addStatesToButton=function(inButton,inUseOverState,inUseDownState){var isOver=false;var isDown=false;var updateState=function(){var mouseState=null;if(inUseDownState&&isDown){mouseState="down";}else{if(isOver&&inUseOverState){mouseState="over";}else{mouseState="";}}if(mouseState!=null){inButton.mouseState=mouseState;if(inButton.getAttribute("state")!="disabled"){s7js.flyout.Utils.setAttribute(inButton,"state",mouseState);}}};var downHandler=function(inEvent){isDown=true;updateState();};var upHandler=function(inEvent){isDown=false;updateState();};var overHandler=function(inEvent){isOver=true;updateState();};var outHandler=function(inEvent){isOver=false;updateState();};s7js.flyout.Utils.addEventListener(inButton,"mouseover",overHandler,false);s7js.flyout.Utils.addEventListener(inButton,"mouseout",outHandler,false);s7js.flyout.Utils.addEventListener(inButton,"mousedown",downHandler,false);s7js.flyout.Utils.addEventListener(inButton,"mouseup",upHandler,false);};s7js.flyout.Utils.getGlobalEventCoords=function(inEvent){var pos={x:0,y:0};var posY;if(inEvent.touches){if(inEvent.touches.length>0){pos.x=inEvent.touches[0].pageX;pos.y=inEvent.touches[0].pageY;}else{pos.x=inEvent.changedTouches[0].pageX;pos.y=inEvent.changedTouches[0].pageY;}}else{if(inEvent.pageX){pos.x=inEvent.pageX;pos.y=inEvent.pageY;}else{pos.x=inEvent.clientX+document.documentElement.scrollLeft;pos.y=inEvent.clientY+document.documentElement.scrollTop;}}return pos;};s7js.flyout.Utils.getRelativeEventCords=function(inEvent,inElement){var elementPosition=SjUtils.getElementPosition(inElement);var eventCoords=s7js.flyout.Utils.getGlobalEventCoords(inEvent);eventCoords.x-=elementPosition.x;eventCoords.y-=elementPosition.y;return eventCoords;};s7js.flyout.Utils.isIOS=function(){if(!s7js.flyout.Utils._isIOS){s7js.flyout.Utils._isIOS=((navigator.userAgent.indexOf("Safari")!=-1)&&(navigator.userAgent.indexOf("Mobile")!=-1)&&(navigator.userAgent.indexOf("AppleWebKit")!=-1));}return s7js.flyout.Utils._isIOS;};s7js.flyout.Utils.isAndroid=function(){if(!s7js.flyout.Utils._isAndroid){s7js.flyout.Utils._isAndroid=(navigator.userAgent.indexOf("Android")!=-1);}return s7js.flyout.Utils._isAndroid;};s7js.flyout.Utils.needsAlphaImageLoader=function(){if(!s7js.flyout.Utils._needsAlphaImageLoader){s7js.flyout.Utils._needsAlphaImageLoader=((navigator.userAgent.indexOf("MSIE 7.0")!=-1)||(navigator.userAgent.indexOf("MSIE 8.0")!=-1));}return s7js.flyout.Utils._needsAlphaImageLoader;};s7js.flyout.Utils.isTouchDevice=function(){return s7js.flyout.Utils.isIOS()||s7js.flyout.Utils.isAndroid();};s7js.flyout.Utils.appendPath=function(inUrl,inPath){if((inUrl.lastIndexOf("/")!=inUrl.length-1)&&(inPath.indexOf("/")!=0)){return inUrl+"/"+inPath;}else{return inUrl+inPath;}};s7js.flyout.Utils.appendQuery=function(inUrl,inQuery){return inUrl+(inUrl.indexOf("?")!=-1?"&":"?")+inQuery;};s7js.flyout.Utils.parseUrl=function(inUrl){var res=/^(https?:\/\/[^\/]+)?([\/]*.+)?/i.exec(inUrl);var authority;var path;if((res[1]!=null)&&(res[1]!="")){authority=res[1];}else{authority=null;}if(res[2]!=null){path=res[2];}else{path=null;}if((authority==null)&&(path==null)){return null;}else{return{authority:authority,path:path};}};s7js.flyout.Utils.resolveUrl=function(inBaseUrl,inUrl){var urlObj=s7js.flyout.Utils.parseUrl(inUrl);if(urlObj.authority!=null){return inUrl;}else{var givenPath;if(urlObj.path==null){givenPath="/";}else{givenPath=urlObj.path;}var baseUrlObj=s7js.flyout.Utils.parseUrl(inBaseUrl);var basePath;if(baseUrlObj.path==null){basePath="/";}else{if(baseUrlObj.path.lastIndexOf("/")!=baseUrlObj.path.length-1){basePath=baseUrlObj.path+"/";}else{basePath=baseUrlObj.path;}}var resultingPath;if(givenPath.indexOf("/")==0){resultingPath=givenPath;}else{resultingPath=basePath+givenPath;}if(baseUrlObj.authority!=null){return baseUrlObj.authority+resultingPath;}else{return resultingPath;}}};s7js.flyout.Utils.prototype.setupBorder=function(inElement,inStyle,inWidth,inHeight,inInset){inElement.className=inStyle;inElement.style.position="absolute";var correction={dx:0,top:0,width:0,height:0};if(inInset){if(!((document.compatMode=="BackCompat")&&(navigator.appName=="Microsoft Internet Explorer"))){correction.width=-2*inElement.clientLeft;correction.height=-2*inElement.clientTop;}}else{if((document.compatMode=="BackCompat")&&(navigator.appName=="Microsoft Internet Explorer")){correction.width=2*inElement.clientLeft;correction.height=2*inElement.clientTop;}}inElement.style.width=inWidth+correction.width+"px";inElement.style.height=inHeight+correction.height+"px";correction.x=-(inElement.offsetWidth-inWidth)/2;correction.y=-(inElement.offsetHeight-inHeight)/2;inElement.style.left=correction.x+"px";inElement.style.top=correction.y+"px";return correction;};