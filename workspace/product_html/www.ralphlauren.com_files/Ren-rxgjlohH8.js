/* Script imported from http://s7d2.scene7.com/s7viewers/dhtml/4.4/flyout/StaticImage.js */
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
s7js.flyout.StaticImage=function(inParent){this.parent=inParent;this.container=document.createElement("div");this.container.style.width="100%";this.container.style.height="100%";this.parent.appendChild(this.container);this.containerSize={width:this.container.offsetWidth,height:this.container.offsetHeight};this.activeImageDesc=this.createImageDesc("i1");this.bufferImageDesc=this.createImageDesc("i2");this.activeImageDesc.outerContainer.style.visibility="hidden";this.bufferImageDesc.outerContainer.style.visibility="hidden";this.firstLoad=true;this.lastLoadUrlHash=new Object();this.pendingUrl=null;this.loading=false;this.transparent=false;var selfRef=this;this.loadHandler=function(){selfRef.loading=false;if(selfRef.pendingUrl!=null){var url=selfRef.pendingUrl;selfRef.pendingUrl=null;selfRef.setImageUrl(url);}else{var tempRef=selfRef.bufferImageDesc;selfRef.bufferImageDesc=selfRef.activeImageDesc;selfRef.activeImageDesc=tempRef;selfRef.activeImageDesc.outerContainer.style.visibility="inherit";if(s7js.flyout.Utils.needsAlphaImageLoader()&&selfRef.transaprent){selfRef.activeImageDesc.img.style.visibility="hidden";selfRef.activeImageDesc.innerContainer.style.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+encodeURI(selfRef.activeImageDesc.img.src)+'")';}else{selfRef.activeImageDesc.img.style.visibility="inherit";}if(selfRef.firstLoad){selfRef.firstLoad=false;selfRef.onLoadComplete();}else{selfRef.swapTransition.startTransition();}}};var errorHandler=function(){selfRef.onLoadFail("failed loading image from ["+selfRef.bufferImageDesc.img.src+"]");};s7js.flyout.Utils.addEventListener(this.activeImageDesc.img,"load",this.loadHandler,false);s7js.flyout.Utils.addEventListener(this.bufferImageDesc.img,"load",this.loadHandler,false);s7js.flyout.Utils.addEventListener(this.activeImageDesc.img,"error",errorHandler,false);s7js.flyout.Utils.addEventListener(this.bufferImageDesc.img,"error",errorHandler,false);var selfRef=this;this.swapTransition=new s7js.flyout.Transition(350);this.swapTransition.setType(new s7js.flyout.TransitionTypeLinear(0,1));this.swapTransition.onChange=function(inTransition){s7js.flyout.Utils.setOpacity(selfRef.activeImageDesc.outerContainer,inTransition.getValue());s7js.flyout.Utils.setOpacity(selfRef.bufferImageDesc.outerContainer,1-inTransition.getValue());if(!inTransition.isWorking()){selfRef.bufferImageDesc.outerContainer.style.visibility="hidden";if(selfRef.pendingUrl!=null){var url=selfRef.pendingUrl;selfRef.pendingUrl=null;selfRef.setImageUrl(url);}else{selfRef.onLoadComplete();}}};this.layout();};s7js.flyout.StaticImage.prototype.setImageUrl=function(inURL){if(this.loading||this.swapTransition.isWorking()){this.pendingUrl=inURL;}else{this.loading=true;var url=s7js.flyout.Utils.appendQuery(inURL,"wid="+this.containerSize.width+"&hei="+this.containerSize.height);if(this.lastLoadUrlHash[this.bufferImageDesc.img.id]==url){this.loadHandler();}else{this.lastLoadUrlHash[this.bufferImageDesc.img.id]=url;this.bufferImageDesc.img.src=url;}}};s7js.flyout.StaticImage.prototype.setFadeTime=function(inFadeTime){this.swapTransition.setTotalTime(inFadeTime);};s7js.flyout.StaticImage.prototype.setTransparent=function(inTransaprent){this.transaprent=inTransaprent;};s7js.flyout.StaticImage.prototype.getSize=function(){return{width:this.containerSize.width,height:this.containerSize.height};};s7js.flyout.StaticImage.prototype.onLoadComplete=function(){};s7js.flyout.StaticImage.prototype.onLoadFail=function(inMsg){};s7js.flyout.StaticImage.prototype.createImageDesc=function(inId){var outerContainer=document.createElement("div");outerContainer.style.position="absolute";this.container.appendChild(outerContainer);var innerContainer=document.createElement("div");innerContainer.style.position="absolute";innerContainer.style.width="100%";innerContainer.style.height="100%";outerContainer.appendChild(innerContainer);var img=document.createElement("img");outerContainer.appendChild(img);s7js.flyout.Utils.disableDragBehavior(img);img.id=inId;img.style.position="absolute";img.style.left="0px";img.style.top="0px";return{outerContainer:outerContainer,innerContainer:innerContainer,img:img};};s7js.flyout.StaticImage.prototype.layout=function(){this.activeImageDesc.outerContainer.style.width=this.containerSize.width;this.activeImageDesc.outerContainer.style.height=this.containerSize.height;this.bufferImageDesc.outerContainer.style.width=this.containerSize.width;this.bufferImageDesc.outerContainer.style.height=this.containerSize.height;};