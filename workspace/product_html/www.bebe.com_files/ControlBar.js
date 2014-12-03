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
s7sdk.pkg("s7sdk.common");s7sdk.Util.require("s7sdk.video.VideoControls");s7sdk.Util.require("s7sdk.common.Enumeration");s7sdk.Util.require("s7sdk.event.Event");s7sdk.Util.require("s7sdk.common.Button");if(!s7sdk.common.ControlBar){s7sdk.common.ControlBar=function ControlBar(a,c,b){b=(typeof b=="string"&&b.length)?b:"ControlBar_"+s7sdk.Util.createUniqueId();arguments.callee.superclass.apply(this,[b,a,"div","s7controlbar",c]);this.createElement();this.container=s7sdk.Util.byId(a);this.container.appendChild(this.obj);if(this.transition.transition=="fade"){if(s7sdk.browser.name==="ie"&&s7sdk.browser.version.major<9){this.transition.transition="none"}}else{this.transition.transition="none"}this.animate=new s7sdk.common.Animation(this,this.transition.duration,this.transition.delaytohide,this.transition.transition);var d=this;this.fnShow=function(f){d.showEv(f)};this.addEventListener("mousemove",this.fnShow);this.addEventListener("mousedown",this.fnShow);this.addEventListener("touchmove",this.fnShow,true);this.addEventListener("touchstart",this.fnShow,true);this.views=[]};s7sdk.Class.inherits(s7sdk.common.ControlBar,s7sdk.UIComponent);s7sdk.common.ControlBar.prototype.modifiers={transition:{params:["transition","delaytohide","duration"],defaults:["fade",2,0.5],ranges:[["none","fade"],"0:","0:"]}};s7sdk.common.ControlBar.prototype.viewAttached=function(a){for(var b=0;b<this.views.length;b++){if(this.views[b]==a){return b}}return -1};s7sdk.common.ControlBar.prototype.animationStep=function(b,a){if(this.transition.transition=="fade"){s7sdk.Util.setOpacity(this.obj,a?b:1-b)}};s7sdk.common.ControlBar.prototype.animationStart=function(){};s7sdk.common.ControlBar.prototype.animationStop=function(a){if(this.transition.transition=="fade"){s7sdk.Util.setOpacity(this.obj,a?1:0)}else{if(s7sdk.browser.name==="ie"&&s7sdk.browser.version.major<8){this.obj.style.filter="alpha(opacity=0)"}else{this.obj.style.visibility="hidden"}}};s7sdk.common.ControlBar.prototype.showEv=function(a){if(this.transition.transition=="none"){if(s7sdk.browser.name==="ie"&&s7sdk.browser.version.major<8){this.obj.style.filter=""}else{this.obj.style.visibility="inherit"}}this.animate.startTransition()};s7sdk.common.ControlBar.prototype.addEventListener=function(c,b,a){this.superproto.addEventListener.apply(this,[c,b,a])};s7sdk.common.ControlBar.prototype.attachView=function(b){var a=b instanceof s7sdk.Base?b.obj:b;var c=this.viewAttached(a);if(c==-1){this.views.push(a);s7sdk.Event.addDOMListener(a,"mousemove",this.fnShow);s7sdk.Event.addDOMListener(a,"touchmove",this.fnShow,true);s7sdk.Event.addDOMListener(a,"touchstart",this.fnShow,true)}};s7sdk.common.ControlBar.prototype.detachView=function(b){var a=b instanceof s7sdk.Base?b.obj:b;var c=this.viewAttached(a);if(c!=-1){this.views.splice(c,1);s7sdk.Event.removeDOMListener(a,"mousemove",this.fnShow);s7sdk.Event.removeDOMListener(a,"touchmove",this.fnShow,true);s7sdk.Event.removeDOMListener(a,"touchstart",this.fnShow,true)}};s7sdk.common.ControlBar.prototype.detachAll=function(){while(this.views.length!=0){var a=this.views.pop();s7sdk.Event.removeDOMListener(a,"mousemove",this.fnShow);s7sdk.Event.removeDOMListener(a,"touchmove",this.fnShow,true);s7sdk.Event.removeDOMListener(a,"touchstart",this.fnShow,true)}};s7sdk.ControlBar=s7sdk.common.ControlBar;(function addDefaultCSS(){var c=s7sdk.Util.css.createCssRuleText;var b={"background-color":"#a6a6a6",position:"relative",width:"420px",height:"30px","-webkit-touch-callout":"none","-webkit-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none","-webkit-tap-highlight-color":"rgba(0,0,0,0)"};if(("android"==s7sdk.browser.device.name)&&(4==s7sdk.browser.device.version)){b["-webkit-perspective"]="1000"}var a=c(".s7controlbar",b);s7sdk.Util.css.addDefaultCSS(a,"ControlBar")})()}if(!s7sdk.common.Animation){s7sdk.common.Animation=function(e,b,a,c,f){this.transitionEasing=typeof(f)=="undefined"?s7sdk.Enum.TRANSITION_EASING.AUTO:f;this.type=c;this.startTime=(new Date()).getTime();this.shiftTime=0;this.maxStep=60;this.transitionTime=typeof(b)=="undefined"?5000:b*1000;this.delayToHide=typeof(a)=="undefined"?5000:a*1000;this.state=2;this.viewParent=e;var d=this;this.tmr=setInterval(function(){d.onEnterFrame()},25)};s7sdk.common.Animation.prototype.onEnterFrame=function(){if(this.state==0){return}var b=(new Date()).getTime();if(this.state==2){if(b-this.startTime>this.delayToHide){if(this.type=="none"){this.state=0;this.stopTransition(false)}else{this.state=3;this.startTime=b;this.reverse=false}}return}var a=this.calcStep(b);if(a==0){return}if(a>=1){if(this.state==1){this.state=2;this.startTime=b;this.stopTransition(true)}else{if(this.state==3){this.state=0;this.stopTransition(false)}}return}if(this.viewParent!=null&&typeof(this.viewParent.viewTransitionStep)!=null){this.viewParent.animationStep(a,this.reverse)}};s7sdk.common.Animation.prototype.calcStep=function(b){var a=(this.transitionTime!=0)?(b+this.shiftTime-this.startTime)/this.transitionTime:1;if(a>this.prevStep+this.maxStep){a=this.prevStep+this.maxStep}this.prevStep=a;if(a==0){return a}if(a>=1){return a}if(this.transitionEasing==s7sdk.Enum.TRANSITION_EASING.AUTO){}else{if(this.transitionEasing==s7sdk.Enum.TRANSITION_EASING.QUADRATIC){a=(a*(a-2))*-1}else{if(this.transitionEasing==s7sdk.Enum.TRANSITION_EASING.CUBIC){a=(a-=1)*a*a+1}else{if(this.transitionEasing==s7sdk.Enum.TRANSITION_EASING.QUARTIC){a=((a-=1)*a*a*a-1)*-1}else{if(this.transitionEasing==s7sdk.Enum.TRANSITION_EASING.QUINTIC){a=(a-=1)*a*a*a*a+1}}}}}return a};s7sdk.common.Animation.prototype.startTransition=function(){this.shiftTime=0;this.reverse=true;switch(this.state){case 0:this.prevStep=0;this.startTime=(new Date()).getTime();if(this.type=="none"){this.state=2}else{this.state=1}if(this.viewParent!=null&&this.viewParent.animationStart!=null){this.viewParent.animationStart()}break;case 1:break;case 2:this.startTime=(new Date()).getTime();break;case 3:this.state=1;this.prevStep=0;if(this.viewParent!=null&&this.viewParent.animationStart!=null){this.viewParent.animationStart()}break}};s7sdk.common.Animation.prototype.stopTransition=function(a){if(this.viewParent!=null&&this.viewParent.animationStop!=null){this.viewParent.animationStop(a)}}};