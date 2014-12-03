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
s7sdk.pkg("s7sdk.video");s7sdk.Util.require("s7sdk.common.ItemDesc");s7sdk.Util.require("s7sdk.common.IS");s7sdk.Util.require("s7sdk.common.IconEffect");s7sdk.Util.require("s7sdk.common.Enumeration");if(!s7sdk.video.VideoPlayer){s7sdk.video.VideoPlayer=function VideoPlayer(a,e,c){arguments.callee.superclass.apply(this,[c,a,"div","s7videoplayer",e]);this.createElement();this.container=s7sdk.Util.byId(a);if(this.videoServerUrl.lastIndexOf("/")!=(this.videoServerUrl.length-1)){this.videoServerUrl+="/"}this.compId=(s7sdk.Util.isNull(c)?"":c);this.videoItem=null;this.serverDuration=undefined;this.curMilestone=undefined;this.videoCapabilityState=new s7sdk.VideoCapabilityState();this.wid=this.size.width;this.hei=this.size.height;if(this.wid==0||this.hei==0){this.wid=parseInt(s7sdk.Util.css.getCss("s7videoplayer","width",this.compId));this.hei=parseInt(s7sdk.Util.css.getCss("s7videoplayer","height",this.compId));if(!s7sdk.Util.isNumber(this.wid)||!s7sdk.Util.isNumber(this.hei)||this.wid<=0||this.hei<=0){if("clientHeight" in this.container&&"clientWidth" in this.container){this.wid=this.container.clientWidth;this.hei=this.container.clientHeight}if(this.wid==0||this.hei==0){this.wid=400;this.hei=300}}}if(("ipad"==s7sdk.browser.device.name)||("iphone"==s7sdk.browser.device.name)||("android"==s7sdk.browser.device.name)){this.autoplay=false}this.clickToPlay=0;if((/play/i).test(this.singleclick)){this.clickToPlay=1}if(this.serverUrl.lastIndexOf("/")!=(this.serverUrl.length-1)){this.serverUrl+="/"}this.container.appendChild(this.obj);var b=this;this.videoProxy=this.resolveVideoProxy();if(this.clickToPlay&&!this.hasNativeControls()){this.divClickElement=document.createElement("div");this.obj.appendChild(this.divClickElement);this.divClickElement.style.width=this.wid+"px";this.divClickElement.style.height=this.hei+"px";this.divClickElement.style.position="absolute";this.divClickElement.style.top="0px";this.divClickElement.style.left="0px";if(s7sdk.browser.name=="ie"){this.divClickElement.style.backgroundColor="#000";this.divClickElement.style.filter="alpha(opacity=0)"}s7sdk.Event.addDOMListener(this.obj,"click",function(){b.togglePause()},false)}this.createIconEffect();var d=unescape(this.asset);if(d!=""){this.setAsset(d)}this.addEventListener(s7sdk.event.CapabilityStateEvent.NOTF_VIDEO_CAPABILITY_STATE,function(f){b.onCapabilityState(f)},false)};s7sdk.Class.inherits(s7sdk.video.VideoPlayer,s7sdk.UIComponent);s7sdk.video.VideoPlayer.prototype.symbols={ERROR:"Your Browser does not support HTML5 Video tag or the video cannot be played."};s7sdk.video.VideoPlayer.prototype.modifiers={serverUrl:{params:["isRootPath"],defaults:["/is/image/"]},videoServerUrl:{params:["value"],defaults:["/is/content/"]},size:{params:["width","height"],defaults:[0,0],ranges:["0:","0:"]},asset:{params:["value"],defaults:[""]},autoplay:{params:["enabled"],defaults:[true]},singleclick:{params:["singleclick"],defaults:["playPause"],ranges:[["none","playPause"]]},posterimage:{params:["posterimage"],defaults:[""]},iconEffect:{params:["enabled","count","fade","autoHide"],defaults:[true,1,0.3,3],ranges:[null,"-1:","0:","0:"]},playback:{params:["type","controls"],defaults:["auto",false],ranges:[["auto","native"]]},progressivebitrate:{params:["value"],defaults:[900000]}};s7sdk.video.VideoPlayer.prototype.addEventListener=function(c,b,a){this.superproto.addEventListener.apply(this,[c,b,a])};s7sdk.video.VideoPlayer.prototype.onCapabilityState=function(a){var b=a.s7event.state;if(b.hasCapability(s7sdk.VideoCapabilityState.PAUSE)){if(this.iconEffectObj){this.iconEffectObj.hide()}}if(b.hasCapability(s7sdk.VideoCapabilityState.PLAY)){if(this.iconEffectObj){this.iconEffectObj.show(this.wid,this.hei)}}};s7sdk.video.VideoPlayer.prototype.resize=function(a,b){if(a==this.wid&&b==this.hei){return}this.wid=a>0?a:1;this.hei=b>0?b:1;this.videoProxy.resize(this.wid,this.hei);if(this.divClickElement){this.divClickElement.style.width=this.wid+"px";this.divClickElement.style.height=this.hei+"px"}if(this.iconEffectObj&&this.iconEffectObj.enabled){this.iconEffectObj.centerOverlay(a,b)}s7sdk.UIComponent.prototype.resize.apply(this,[a,b]);s7sdk.Logger.log(s7sdk.Logger.INFO,"VideoPlayer.resize( %0 %1 )",a,b)};s7sdk.video.VideoPlayer.prototype.supportsInline=function(){s7sdk.Logger.log(s7sdk.Logger.INFO,"VideoPlayer.supportsInline() = %0",!((s7sdk.browser.device.name=="android"&&s7sdk.browser.device.version<4)||s7sdk.browser.device.name=="iphone"));return !((s7sdk.browser.device.name=="android"&&s7sdk.browser.device.version<4)||s7sdk.browser.device.name=="iphone")};s7sdk.video.VideoPlayer.prototype.getAsset=function(){var a=(this.videoItem==null?null:this.videoItem.name);s7sdk.Logger.log(s7sdk.Logger.INFO,"VideoPlayer.getAsset() = %0",a);return a};s7sdk.video.VideoPlayer.prototype.setAsset=function(a){this.loadAsset(a)};s7sdk.video.VideoPlayer.prototype.loadAsset=function(a){s7sdk.Logger.log(s7sdk.Logger.INFO,"VideoPlayer.loadAsset");var c=s7sdk.MediaSetParser.parseAssetForSetReq(a);var b=this.serverUrl+"/"+c.name;b+="?"+c.req;if(s7sdk.Util.isNonEmptyString(this.locale)){b+="&locale="+this.locale}if(this.isReq){this.isReq.cancelHttpReq()}this.isReq_=new s7sdk.IS(this.serverUrl,a);this.isReq_.getHttpReq(b,function(e,d){s7sdk.video.VideoPlayer.prototype.setRequestComplete.apply(d,[e])},function(e,d){s7sdk.video.VideoPlayer.prototype.setRequestError.apply(d,[e,a])},this)};s7sdk.video.VideoPlayer.prototype.setRequestComplete=function(b){var a=b.set;if(a==null){return}var c=s7sdk.MediaSetParser.parse(a,"");switch(c.type){case s7sdk.ItemDescType.VIDEO_SET:this.createViewer(c);break;case s7sdk.ItemDescType.VIDEO:this.createViewer(c.items[0]);break;default:throw new Error("parsed media set is of wrong type: "+c.type)}};s7sdk.video.VideoPlayer.prototype.createViewer=function(a){this.setAssetInternal(a);var c=new s7sdk.UserEvent(this.autoplay?s7sdk.UserEvent.PLAY:s7sdk.UserEvent.PAUSE,this.videoProxy.getCurrentTime(),true);this.dispatchEvent(c,false);var b=new s7sdk.event.AssetEvent(s7sdk.event.AssetEvent.ASSET_CHANGED,a,this.getIndexFromItem(a),true);this.dispatchEvent(b)};s7sdk.video.VideoPlayer.prototype.getIndexFromItem=function(d){if(d.parent!=null){var c=-1;var b=d.parent.items;for(var a=0;a<b.length;a++){if(b[a].name==d.name){c=a;break}}return c}else{return 0}};s7sdk.video.VideoPlayer.prototype.createIconEffect=function(){if(this.clickToPlay&&!this.hasNativeControls()){this.iconEffectObj=new s7sdk.IconEffect(this,this.iconEffect.enabled,this.iconEffect.count,this.iconEffect.fade,this.iconEffect.autoHide);if(this.autoplay){this.iconEffectObj.hide()}}};s7sdk.video.VideoPlayer.prototype.hasNativeControls=function(){if(s7sdk.browser.supportflash()&&this.playback.type=="auto"){return false}else{if((s7sdk.browser.device.name=="android"&&s7sdk.browser.device.version<4)||s7sdk.browser.device.name=="iphone"||this.playback.controls){return true}else{return false}}};s7sdk.video.VideoPlayer.prototype.resolveVideoProxy=function(){var b;if((s7sdk.browser.supportflash()&&this.playback.type=="auto")&&(s7sdk.browser.device.name!=="android")){b=this.buildFlashVideoProxy()}else{b=this.buildHTML5VideoProxy()}var a=this;b.onCurrentTime=function(){a.checkMilestone();a.checkState();var c=new s7sdk.event.VideoEvent(s7sdk.event.VideoEvent.NOTF_CURRENT_TIME,a.videoProxy.getCurrentTime(),true);a.dispatchEvent(c,false);if(a.videoProxy.ended()){var e=new s7sdk.UserEvent(s7sdk.UserEvent.STOP,a.videoProxy.getCurrentTime(),true);a.dispatchEvent(e,false);var d=new s7sdk.event.VideoEvent(s7sdk.event.VideoEvent.NOTF_VIDEO_END,a.videoProxy.getCurrentTime(),true);a.dispatchEvent(d,false)}};b.onDuration=function(){a.checkState();var c=new s7sdk.event.VideoEvent(s7sdk.event.VideoEvent.NOTF_DURATION,a.videoProxy.getDuration(),true);a.dispatchEvent(c,false)};b.onLoadProgress=function(){a.checkState();var c=new s7sdk.event.VideoEvent(s7sdk.event.VideoEvent.NOTF_LOAD_PROGRESS,a.videoProxy.getLoadedPosition(),true);a.dispatchEvent(c,false)};b.onVolume=function(){a.checkState();var c=new s7sdk.event.VideoEvent(s7sdk.event.VideoEvent.NOTF_VOLUME,a.videoProxy.getVolume(),true);a.dispatchEvent(c,false)};b.onSeeked=function(){var c=new s7sdk.event.VideoEvent(s7sdk.event.VideoEvent.NOTF_SEEK,a.videoProxy.getCurrentTime(),true);a.dispatchEvent(c,false)};b.onStateChange=function(){a.checkState()};return b};s7sdk.video.VideoPlayer.prototype.resolveVideoAsset=function(a){var b=a.name;if(s7sdk.browser.name=="safari"){if((("ipad"==s7sdk.browser.device.name)||("iphone"==s7sdk.browser.device.name))||((s7sdk.browser.device.name=="desktop")&&(!(s7sdk.browser.supportflash())||(this.playback.type=="native")))){if(a.videoType!=s7sdk.VideoDescType.PATH){b+=".m3u8"}}}else{if(((s7sdk.browser.device.name=="android")||((s7sdk.browser.device.name=="desktop")&&(!s7sdk.browser.supportflash()||(this.playback.type=="native"))))&&(a.type==s7sdk.ItemDescType.VIDEO_SET)){b=this.getAssetByNearestBitrate(a.items,this.progressivebitrate)}}return b};s7sdk.video.VideoPlayer.prototype.resolvePosterUrl=function(b){var c=this.posterimage;var d="";if(c==""||c.indexOf("?")==0){d=c;c=s7sdk.video.VideoPlayer.parseMovieUrl(b.name)}var a=null;if(c!=null&&c!=""&&c!="none"){var e=(c.indexOf("?")>=0)?"&":"?";if(d!=""){if(d.indexOf("?")==0){e=d}else{e+=d}e+="&"}e+="fit=constrain,1&wid="+this.wid+"&hei="+this.hei;a=c+e}return a};s7sdk.video.VideoPlayer.prototype.getAssetByNearestBitrate=function(h,g){var b=-1;var f=-1;var c="";if(!h.length){c=h.name}else{for(var e=0;e<h.length;e++){var a=parseInt(h[e].bitrate);if((a<=g)&&(a>f)){b=a;f=a;c=h[e].name}}if(c==""){var d=-1;for(var e=0;e<h.length;e++){var a=parseInt(h[e].bitrate);if((d==-1)||(a<d)){d=a;c=h[e].name}}}}return c};s7sdk.video.VideoPlayer.prototype.buildHTML5VideoProxy=function(){return new s7sdk.video.HTML5VideoProxy(this.obj,this.wid,this.hei,this.serverUrl,this.videoServerUrl,this.autoplay,this.playback.controls,this.getLocalizedText("ERROR"))};s7sdk.video.VideoPlayer.prototype.buildFlashVideoProxy=function(){return new s7sdk.video.FlashVideoProxy(this.obj,"flashVideo",this.wid,this.hei,this.serverUrl,this.videoServerUrl,this.autoplay)};s7sdk.video.VideoPlayer.prototype.setRequestError=function(a){s7sdk.Logger.log(s7sdk.Logger.ERROR,"setRequestError %0",a)};s7sdk.video.VideoPlayer.prototype.setAssetInternal=function(a){var d=this.videoItem;this.videoItem=a;var e=this.resolveVideoAsset(a);this.serverDuration=this.getDurationFromItem(a);if(!s7sdk.Util.isNull(this.serverDuration)){var c=new s7sdk.event.VideoEvent(s7sdk.event.VideoEvent.NOTF_DURATION,this.serverDuration,true);this.dispatchEvent(c,false)}s7sdk.Logger.log(s7sdk.Logger.INFO,"VideoPlayer.setAsset( %0 )",e);this.videoProxy.setAsset(e,this.resolvePosterUrl(a));if(this.autoplay){this.videoProxy.play()}if(d!=null){var b=new s7sdk.UserEvent(s7sdk.UserEvent.SWAP,[0,a.name],true);this.dispatchEvent(b,false)}};s7sdk.video.VideoPlayer.prototype.setItem=function(a){s7sdk.Logger.log(s7sdk.Logger.INFO,"VideoPlayer.setItem( %0 )",a);if(this.isReq){this.isReq.cancelHttpReq()}if(!((a instanceof s7sdk.VideoDesc&&a.type==s7sdk.ItemDescType.VIDEO)||(a instanceof s7sdk.MediaSetDesc&&a.type==s7sdk.ItemDescType.VIDEO_SET))){throw new Error("Item must be a video!")}this.createViewer(a)};s7sdk.video.VideoPlayer.prototype.getVolume=function(){if(this.supportsVolumeControl()){return this.videoProxy.getVolume()}else{return 1}};s7sdk.video.VideoPlayer.prototype.setVolume=function(a){if(this.supportsVolumeControl()){this.videoProxy.setVolume(a);this.checkState()}};s7sdk.video.VideoPlayer.prototype.getCurrentTime=function(){return this.videoProxy.getCurrentTime()};s7sdk.video.VideoPlayer.prototype.getLoadedPosition=function(){return this.videoProxy.getLoadedPosition()};s7sdk.video.VideoPlayer.prototype.getDuration=function(){if(!s7sdk.Util.isNull(this.videoProxy.getDuration())){return this.videoProxy.getDuration()}else{if(!s7sdk.Util.isNull(this.serverDuration)){return this.serverDuration}else{return undefined}}};s7sdk.video.VideoPlayer.prototype.getCapabilityState=function(){s7sdk.Logger.log(s7sdk.Logger.INFO,"VideoPlayer.getCapabilityState() = %0 ",this.videoCapabilityState);return this.videoCapabilityState};s7sdk.video.VideoPlayer.prototype.checkState=function(){var a=this.videoCapabilityState;this.videoCapabilityState=new s7sdk.VideoCapabilityState();if(this.videoProxy.paused()){this.videoCapabilityState.setCapability(s7sdk.VideoCapabilityState.PLAY);if(this.videoProxy.getCurrentTime()>0){this.videoCapabilityState.setCapability(s7sdk.VideoCapabilityState.STOP)}}if(!this.videoProxy.paused()&&!this.videoProxy.ended()){this.videoCapabilityState.setCapability(s7sdk.VideoCapabilityState.PAUSE);this.videoCapabilityState.setCapability(s7sdk.VideoCapabilityState.STOP)}this.videoProxy.muted()?this.videoCapabilityState.setCapability(s7sdk.VideoCapabilityState.UNMUTE):this.videoCapabilityState.setCapability(s7sdk.VideoCapabilityState.MUTE);if(this.videoProxy.ended()){this.videoCapabilityState.setCapability(s7sdk.VideoCapabilityState.PLAY)}if((a==null)||(a.state!=this.videoCapabilityState.state)){this.dispatchEvent(new s7sdk.event.CapabilityStateEvent(s7sdk.event.CapabilityStateEvent.NOTF_VIDEO_CAPABILITY_STATE,this.videoCapabilityState))}};s7sdk.video.VideoPlayer.prototype.ended=function(){return this.videoProxy.ended()};s7sdk.video.VideoPlayer.prototype.supportsFullScreen=function(){return this.videoProxy.supportsFullScreen()};s7sdk.video.VideoPlayer.prototype.enterFullScreen=function(){return this.videoProxy.enterFullScreen()};s7sdk.video.VideoPlayer.prototype.play=function(){this.videoProxy.play();var a=new s7sdk.UserEvent(s7sdk.UserEvent.PLAY,this.videoProxy.getCurrentTime(),true);this.dispatchEvent(a,false)};s7sdk.video.VideoPlayer.prototype.pause=function(){this.videoProxy.pause();var a=new s7sdk.UserEvent(s7sdk.UserEvent.PAUSE,this.videoProxy.getCurrentTime(),true);this.dispatchEvent(a,false)};s7sdk.video.VideoPlayer.prototype.stop=function(){this.videoProxy.pause();this.videoProxy.seek(0);var a=new s7sdk.UserEvent(s7sdk.UserEvent.STOP,this.videoProxy.getCurrentTime(),true);this.dispatchEvent(a,false)};s7sdk.video.VideoPlayer.prototype.togglePause=function(){if(this.videoCapabilityState!=null){if(this.videoCapabilityState.hasCapability(s7sdk.VideoCapabilityState.PLAY)){this.play()}else{if(this.videoCapabilityState.hasCapability(s7sdk.VideoCapabilityState.PAUSE)){this.pause()}}}};s7sdk.video.VideoPlayer.prototype.seek=function(a){this.videoProxy.seek(a)};s7sdk.video.VideoPlayer.prototype.mute=function(){if(this.supportsVolumeControl()){this.videoProxy.mute(true);this.checkState()}};s7sdk.video.VideoPlayer.prototype.unmute=function(){if(this.supportsVolumeControl()){this.videoProxy.mute(false);this.checkState()}};s7sdk.video.VideoPlayer.prototype.checkMilestone=function(){var a=this.videoProxy.getDuration();if(s7sdk.Util.isNull(a)||a==0){return}var c=s7sdk.Util.isNull(this.videoProxy.getCurrentTime())?0:this.videoProxy.getCurrentTime();c=25*Math.floor((c*4)/a);if(c!=this.curMilestone){this.curMilestone=c;var b=new s7sdk.UserEvent(s7sdk.UserEvent.MILESTONE,this.curMilestone,true);this.dispatchEvent(b,false)}};s7sdk.video.VideoPlayer.parseMovieUrl=function(b){var a=null;if(b){a=b.replace(/[\\]/g,"/");ar=a.split(".");if(ar.length>1){a=ar[0]}ar=a.split(":");if(ar.length>1){a=ar[1]}ar=a.split("/");a=ar.length>1?ar[0]+"/"+ar[ar.length-1]:a}return a};s7sdk.video.VideoPlayer.prototype.supportsVolumeControl=function(){var a=true;if(("ipad"==s7sdk.browser.device.name)||("iphone"==s7sdk.browser.device.name)||("android"==s7sdk.browser.device.name)){a=false}return a};s7sdk.video.VideoPlayer.prototype.getDurationFromItem=function(b){if(b.type==s7sdk.ItemDescType.VIDEO_SET){var a=b.items[0];if(a.userData&&a.userData.Video_Length){return parseFloat(a.userData.Video_Length)*1000}}else{if(b.userData&&b.userData.Video_Length){return parseFloat(b.userData.Video_Length)*1000}}return undefined};s7sdk.VideoPlayer=s7sdk.video.VideoPlayer;(function addDefaultCSS(){var c=s7sdk.Util.css.createCssRuleText;var b=s7sdk.Util.css.createCssImgUrlText;var a=c(".s7videoplayer",{position:"absolute","-webkit-touch-callout":"none","-webkit-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none","-webkit-tap-highlight-color":"rgba(0,0,0,0)"})+c(".s7videoplayer .s7iconeffect",{width:"120px",height:"120px","background-repeat":"no-repeat","background-position":"center","background-image":b("videoplayicon.png")});s7sdk.Util.css.addDefaultCSS(a,"VideoPlayer")})()}if(!s7sdk.video.HTML5VideoProxy){s7sdk.video.HTML5VideoProxy=function HTML5VideoProxy(h,e,g,a,i,b,c,f){s7sdk.Logger.log(s7sdk.Logger.INFO,"HTML5VideoProxy constructor");this.serverUrl=a;this.videoServerUrl=i;this.curTime=undefined;this.bufTime=undefined;this.videoDuration=undefined;this.fallbackmessage=f;this.volume=1;this.videoElement=s7sdk.Util.createObj(null,"video",null,null);this.resize(e,g);this.videoElement.preload="auto";if(s7sdk.browser.name=="ie"){this.videoElement.preload="none"}h.appendChild(this.videoElement);this.videoElement.id="s7VideoElement";if(b){this.videoElement.autoplay=true}if(c){this.videoElement.controls=true}else{if(("ipad"==s7sdk.browser.device.name)||("iphone"==s7sdk.browser.device.name)){this.videoElement.setAttribute("webkit-playsinline",1)}}var d=this;this.playTimer=setInterval(function(){d.timerHandler()},s7sdk.video.HTML5VideoProxy.VIDEO_POLLING_RATE);s7sdk.Event.addDOMListener(this.videoElement,"seeked",function(){d.onSeeked()},true)};s7sdk.video.HTML5VideoProxy.VIDEO_POLLING_RATE=100;s7sdk.video.HTML5VideoProxy.prototype.setAsset=function(g,a){var b=(this.videoServerUrl&&this.videoServerUrl.length>0?this.videoServerUrl.charAt(this.videoServerUrl.length-1):"");var f=(g&&g.length>0?g.charAt(0):"");var d;if(b=="/"&&f=="/"){d=this.videoServerUrl+g.substr(1)}else{d=this.videoServerUrl+g}while(this.videoElement.firstChild){this.videoElement.removeChild(this.videoElement.firstChild)}var e=document.createElement("source");e.src=d;var c=document.createElement("p");c.innerHTML=this.fallbackmessage;this.videoElement.appendChild(e);this.videoElement.appendChild(c);this.videoElement.load();if(a!=null){this.videoElement.poster=this.serverUrl+a}};s7sdk.video.HTML5VideoProxy.prototype.getVolume=function(){return this.videoElement.volume};s7sdk.video.HTML5VideoProxy.prototype.setVolume=function(a){if(this.videoElement.muted){this.videoElement.muted=false}this.videoElement.volume=a};s7sdk.video.HTML5VideoProxy.prototype.mute=function(a){this.videoElement.muted=a};s7sdk.video.HTML5VideoProxy.prototype.muted=function(){return this.videoElement.muted};s7sdk.video.HTML5VideoProxy.prototype.getLoadedPosition=function(){return((this.videoElement.buffered&&this.videoElement.buffered.length>0)?this.videoElement.buffered.end(0)*1000:0)};s7sdk.video.HTML5VideoProxy.prototype.getDuration=function(){if(isNaN(this.videoElement.duration)){return undefined}else{return this.videoElement.duration*1000}};s7sdk.video.HTML5VideoProxy.prototype.ended=function(){return this.videoElement.ended};s7sdk.video.HTML5VideoProxy.prototype.supportsFullScreen=function(){if(("ipad"==s7sdk.browser.device.name)||("safari"==s7sdk.browser.name)||("chrome"==s7sdk.browser.name)){return this.videoElement.webkitSupportsFullscreen}if("firefox"==s7sdk.browser.name){return document.mozFullScreenEnabled}return false};s7sdk.video.HTML5VideoProxy.prototype.enterFullScreen=function(){if(this.supportsFullScreen()){if("firefox"==s7sdk.browser.name){this.videoElement.mozRequestFullScreen()}if(this.videoElement.webkitSupportsFullscreen){this.videoElement.webkitEnterFullScreen()}}};s7sdk.video.HTML5VideoProxy.prototype.resize=function(a,b){this.videoElement.width=a*s7sdk.browser.device.pixelratio;this.videoElement.height=b*s7sdk.browser.device.pixelratio;this.videoElement.style.width=a+"px";this.videoElement.style.height=b+"px"};s7sdk.video.HTML5VideoProxy.prototype.play=function(){this.videoElement.play();this.onStateChange()};s7sdk.video.HTML5VideoProxy.prototype.paused=function(){return this.videoElement.paused};s7sdk.video.HTML5VideoProxy.prototype.pause=function(){this.videoElement.pause();this.onStateChange()};s7sdk.video.HTML5VideoProxy.prototype.getCurrentTime=function(){return this.videoElement.currentTime*1000};s7sdk.video.HTML5VideoProxy.prototype.seek=function(a){this.videoElement.currentTime=a/1000};s7sdk.video.HTML5VideoProxy.prototype.onLoadProgress=function(){};s7sdk.video.HTML5VideoProxy.prototype.onCurrentTime=function(){};s7sdk.video.HTML5VideoProxy.prototype.onDuration=function(){};s7sdk.video.HTML5VideoProxy.prototype.onSeeked=function(){};s7sdk.video.HTML5VideoProxy.prototype.onVolume=function(){};s7sdk.video.HTML5VideoProxy.prototype.onStateChange=function(){};s7sdk.video.HTML5VideoProxy.prototype.timerHandler=function(){var a=0;if(this.videoElement.buffered&&this.videoElement.buffered.length>0){a=this.videoElement.buffered.end(0)}if((!s7sdk.Util.isNull(a))&&(a!=this.bufTime)){this.bufTime=a;this.onLoadProgress()}var d=this.videoElement.currentTime;if((!s7sdk.Util.isNull(d))&&(d!=this.curTime)){this.curTime=d;this.onCurrentTime()}d=this.videoElement.duration;if((!s7sdk.Util.isNull(d))&&!isNaN(d)&&(d!=this.videoDuration)){var c=("android"==s7sdk.browser.device.name)&&(4==s7sdk.browser.device.version);if(this.videoElement.readyState==4){if((c&&d>1)||!c){this.videoDuration=d;this.onDuration()}}}var b=this.videoElement.volume;if(b!=this.volume){this.volume=b;this.onVolume()}}}if(!s7sdk.video.FlashVideoProxy){s7sdk.video.FlashVideoProxy=function FlashVideoProxy(k,b,h,j,d,i,c){s7sdk.Logger.log(s7sdk.Logger.INFO,"FlashVideoProxy constructor");this.viewerReady=false;var a=s7sdk.Util.lib.root.substring(0,s7sdk.Util.lib.root.indexOf("/js"));if(a!=""){a+="/"}a+="flash/VideoPlayer.swf";var e="videoserverurl="+i+"&serverurl="+d+"&autoplay="+c+"&stagesize="+h+","+j+"&streaming=true&singleclick=none";var f='<object style="max-width:none; max-height:none;"	classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0"  width="'+h+'" height="'+j+'" 	id="'+b+'" name = "'+b+'" align="middle"> ';f+=' <param name="allowScriptAccess" value="always" />';f+='<PARAM NAME="movie" VALUE="'+a+'" />';f+='<PARAM NAME="flashVars" value="'+e+'"/>';f+='<PARAM NAME="quality" VALUE="high" />';f+='<PARAM NAME="bgcolor" VALUE="#ffffff" />';f+='<PARAM NAME="wmode" VALUE="transparent" />';f+='<PARAM NAME="allowScriptAccess" VALUE="always" />';f+='<PARAM NAME="allowFullScreen" value="true" />';f+=' <embed type="application/x-shockwave-flash"';f+=' pluginspage="http://www.adobe.com/go/getflashplayer"';f+=' name="'+b+'"';f+=' allowScriptAccess="always"';f+=' quality="high"';f+=' bgcolor="#ffffff"';f+=' width="'+h+'"';f+=' height="'+j+'"';f+=' wmode="transparent"';f+=' allowFullScreen="true"';f+=' src="'+a+'"';f+=' flashVars="'+e+'">';f+=" </embed>";f+=" </object>";k.innerHTML=f;this.callQueue=[];this.flash=s7sdk.video.FlashVideoProxy.getSWF(b);var g=this;this.flash.onCurrentTimeUpdate=function(l){g.onCurrentTime()};this.flash.onDurationUpdate=function(l){g.onDuration()};this.flash.onLoadProgressUpdate=function(l){g.onLoadProgress()};this.flash.onVolumeUpdate=function(l){g.onVolume()};this.flash.onSeekUpdate=function(l){g.onSeeked()};this.flash.onCapabilityStateUpdate=function(l){g.onStateChange()};this.flash.onViewerReady=function(){g.viewerReady=true;while(g.callQueue.length>0){var l=g.callQueue[0];g.callQueue.splice(0,1);g.flash[l.func].apply(g.flash,l.args)}}};s7sdk.video.FlashVideoProxy.VIDEO_POLLING_RATE=100;s7sdk.video.FlashVideoProxy.prototype.setAsset=function(b,a){this.protectedCall("setAsset",[b,a])};s7sdk.video.FlashVideoProxy.prototype.getVolume=function(){if(this.viewerReady){return this.flash.getVolume()}else{return 1}};s7sdk.video.FlashVideoProxy.prototype.setVolume=function(a){this.protectedCall("setVolume",[a])};s7sdk.video.FlashVideoProxy.prototype.mute=function(a){this.protectedCall("muteVideo",[a])};s7sdk.video.FlashVideoProxy.prototype.muted=function(){if(this.viewerReady){return this.flash.muted()}else{return false}};s7sdk.video.FlashVideoProxy.prototype.getLoadedPosition=function(){if(this.viewerReady){return this.flash.getLoadedPosition()}else{return 0}};s7sdk.video.FlashVideoProxy.prototype.getDuration=function(){if(this.viewerReady&&!isNaN(this.flash.getDuration())){return this.flash.getDuration()}else{return undefined}};s7sdk.video.FlashVideoProxy.prototype.ended=function(){if(this.viewerReady){return this.flash.ended()}else{return false}};s7sdk.video.FlashVideoProxy.prototype.resize=function(a,b){this.protectedCall("resize",[a,b]);this.flash.style.width=a+"px";this.flash.style.height=b+"px"};s7sdk.video.FlashVideoProxy.prototype.play=function(){this.protectedCall("playVideo",[])};s7sdk.video.FlashVideoProxy.prototype.paused=function(){if(this.viewerReady){return this.flash.paused()}else{return false}};s7sdk.video.FlashVideoProxy.prototype.pause=function(){this.protectedCall("pauseVideo",[])};s7sdk.video.FlashVideoProxy.prototype.getCurrentTime=function(){if(this.viewerReady){return this.flash.getCurrentTime()}else{return 0}};s7sdk.video.FlashVideoProxy.prototype.seek=function(a){this.protectedCall("seekVideo",[a])};s7sdk.video.FlashVideoProxy.prototype.onLoadProgress=function(){};s7sdk.video.FlashVideoProxy.prototype.onCurrentTime=function(){};s7sdk.video.FlashVideoProxy.prototype.onDuration=function(){};s7sdk.video.FlashVideoProxy.prototype.onSeeked=function(){};s7sdk.video.FlashVideoProxy.prototype.onVolume=function(){};s7sdk.video.FlashVideoProxy.prototype.onStateChange=function(){};s7sdk.video.FlashVideoProxy.getSWF=function(a){var b=navigator.userAgent.toLowerCase();if(b.indexOf("gecko")!=-1){return document.embeds[a]}else{if(s7sdk.browser.name=="ie"){return document.getElementById(a)}else{return window[a]}}};s7sdk.video.FlashVideoProxy.prototype.protectedCall=function(b,a){if(this.viewerReady){this.flash[b].apply(this.flash,a)}else{this.callQueue.push({func:b,args:a})}}};