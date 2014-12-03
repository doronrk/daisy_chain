/*!************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2011 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
if(!s7sdk.IconEffect){s7sdk.IconEffect=function(b,c,e,f,a){arguments.callee.superclass.call(this,null,b.id,"div","s7iconeffect");this.container_=b;this.baseOpacity_=null;this.currentOpacity_=0;this.hiddenState_=true;this.iconType_="standard";var d=s7sdk.browser.device;if(d.name=="ipad"||d.name=="ipod"||d.name=="iphone"||(d.name=="android"&&parseFloat(d.version)>=3)){this.iconType_="multitouch"}this.iconEffectDiv_=this.createDiv();this.enabled=c;this.count=e;this.fade=f;this.autoHide=a};s7sdk.Class.inherits(s7sdk.IconEffect,s7sdk.UIComponent);s7sdk.IconEffect.prototype.createDiv=function(){this.createElement();var a=this.obj;a.setAttribute("media-type",this.iconType_);a.style.pointerEvents="none";a.style.position="absolute";return a};s7sdk.IconEffect.prototype.show=function(d,c){if(!this.hiddenState_||this.count==0||!this.enabled){return}if(this.count>0){this.count--}this.hiddenState_=false;this.container_.obj.appendChild(this.iconEffectDiv_);if(this.baseOpacity_==null){this.baseOpacity_=s7sdk.Util.getStyle(this.iconEffectDiv_,"opacity")}this.centerOverlay(d||this.container_.wid,c||this.container_.hei);var b=this;function a(){if(b.currentOpacity_<1&&!b.hiddenState_){b.currentOpacity_+=0.05/b.fade;s7sdk.Util.setOpacity(b.iconEffectDiv_,b.baseOpacity_*b.currentOpacity_);setTimeout(a,50)}}a();if(this.autoHide>0){if(this.displayTimeoutId){clearTimeout(this.displayTimeoutId);this.displayTimeoutId=null}this.displayTimeoutId=setTimeout(function(){b.hide()},(b.autoHide+b.fade)*1000)}};s7sdk.IconEffect.prototype.hide=function(){if(this.hiddenState_){return}this.hiddenState_=true;var a=this;function b(){if(a.hiddenState_){if(a.currentOpacity_>0){a.currentOpacity_-=0.05/a.fade;s7sdk.Util.setOpacity(a.iconEffectDiv_,a.baseOpacity_*a.currentOpacity_);setTimeout(b,50)}else{if(a.iconEffectDiv_.parentNode!=null){a.iconEffectDiv_.parentNode.removeChild(a.iconEffectDiv_)}}}}b()};s7sdk.IconEffect.prototype.centerOverlay=function(b,a){this.iconEffectDiv_.style.left=(b-this.iconEffectDiv_.clientWidth)/2+"px";this.iconEffectDiv_.style.top=(a-this.iconEffectDiv_.clientHeight)/2+"px"}};