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
s7sdk.Util.require("s7sdk.event.Event");s7sdk.Util.require("s7sdk.common.Enumeration");s7sdk.Util.require("s7sdk.image.Resolution");s7sdk.Util.require("s7sdk.image.Tile");if(!s7sdk.View){s7sdk.VIEW_ALIGN_LEFT=1;s7sdk.VIEW_ALIGN_CENTER=0;s7sdk.VIEW_ALIGN_RIGHT=2;s7sdk.View=function(e,j,t,a,h,s,n,u,x,o,d,l,f,c,k,m,g,q){s7sdk.Logger.log(s7sdk.Logger.FINER,"s7sdk.View constructor (canvas based) - url: %0, image size: %1 x %2, view size: %3 x %4",e,j,t,a,h);this.idx=typeof(g)=="undefined"?0:g;this.aspect=j/t;this.imageWidth=j;this.imageHeight=t;this.zoomLimit=s7sdk.Util.checkDefault(k,0);this.h=h;this.w=a;if(this.w==0){this.w=Math.round(this.aspect*h)}this.align=typeof(q)=="undefined"?s7sdk.VIEW_ALIGN_CENTER:q;this.constrainWidth=(this.align==s7sdk.VIEW_ALIGN_CENTER)?1:0.5;this.url=e;this.textoverlay=null;this.state=7;this.maxHeight=Math.round(t*u);this.zoomStep=s7sdk.Util.checkDefault(n,1);this.limit=s7sdk.Util.checkDefault(u,1);this.transitionTime=s7sdk.Util.checkDefault(x,0.5)*1000;this.transitionEasing=s7sdk.Util.checkDefault(o,0);this.clickToZoom=s7sdk.Util.checkDefault(f,9);this.elasticZoom=s7sdk.Util.checkDefault(l,0);this.elasticZoom=(this.elasticZoom<0)?0:(this.elasticZoom>1)?1:this.elasticZoom;this.elasticZoom=(this.elasticZoom>0)?this.elasticZoom*0.3+0.69:0;this.fmt=s7sdk.Util.checkDefault(c,"jpg");this.transparent=((this.fmt.indexOf("png")!=-1||this.fmt.indexOf("gif")!=-1)&&(this.fmt.indexOf("-alpha")>0))?true:false;this.zoomLimit=s7sdk.Util.checkDefault(k,0);this.inPan=false;this.inPinch=false;this.sliding=false;this.speedX=0;this.speedY=0;this.lastTx=0;this.lastTy=0;this.inTransition=false;this.prevStep=0;this.maxStep=1;this.resized=false;this.tileRender=true;this.loadResetImage=s7sdk.Util.checkDefault(m,true);this.devicePixelRatio=s;this.setInitView();this.targetViewToImage=this.resetView();this.topScale=1/this.maxHeight;this.initScale=this.targetViewToImage.d;if(!s7sdk.Util.isNull(d)){this.targetViewToImage=this.zoomViewTransform(d)}this.viewToImage=this.targetViewToImage.clone();this.checkState();this.resolutions=new Array();var r=Math.floor(Math.log(1/this.limit)/Math.log(2));var p=Math.round(j/Math.pow(2,r));var b=Math.round(t/Math.pow(2,r));var y;do{y=new s7sdk.Resolution(r++,p,b,e,this.fmt,this);this.resolutions.push(y);p=Math.round(p/2);b=Math.round(b/2)}while(y.nTiles()>1);s7sdk.View.maxLevel=r-1;this.resolutions.reverse();this.calcRes();var v=new s7sdk.TileAddress(this.resolutions[0].w,this.resolutions[0].h,0,0,0);var w=this.resolutions[0].getCreateTile(v,0);if(w.image!=null&&w.image.addEventListener!=null){w.image.parentView=this;w.image.addEventListener(s7sdk.Event.TILE_LOADED,this.onTileLoad,true);w.image.addEventListener(s7sdk.Event.TILE_FAILED,this.onTileLoad,true)}this.canvas=null;this.resetImageLoaded=false;this.resetImage=new Image();this.resetImage.onload=this.onLoadImage;this.resetImage.onerror=this.onErrorImage;this.resetImage.onabort=this.onAbortImage;this.resetImage.view=this;this.onResetImageLoaded=s7sdk.Util.noop;this.delayTileLoad=false;this.parentView=null;this.invalidated=false;this.drawInterval=s7sdk.Util.interval(s7sdk.View.intervalDraw,60,[this])};s7sdk.View.epsilon1=0.01;s7sdk.View.epsilon2=0.00001;s7sdk.View.epsilon3=1e-9;s7sdk.View.createDisplay=function(){return s7sdk.Util.createObj(null,"canvas",null,null)};s7sdk.View.prototype.changeStatus=function(a){};s7sdk.View.prototype.writeOverlay=function(a){this.textoverlay=a};s7sdk.View.prototype.init=function(){var a=24;if(this.transitionTime>0){this.maxStep=2000/(a*transitionTime)}};s7sdk.View.prototype.findParentElement=function(){return this.parentView.obj};s7sdk.View.prototype.getDisplayElement=function(){return this.canvas};s7sdk.View.prototype.attach=function(b){this.parentView=b;this.canvas=b.displayElement;var a=this.findParentElement();this.canvas.view=this;this.invalidate()};s7sdk.View.prototype.detach=function(){if(null!=this.canvas){this.canvas.view=null;this.canvas=null}};s7sdk.View.prototype.onTileLoad=function(b){var a=s7sdk.Event.getTarget(b);a.removeEventListener(s7sdk.Event.TILE_LOADED,this.onTileLoad,true);a.removeEventListener(s7sdk.Event.TILE_FAILED,this.onTileLoad,true);if(a.parentView.viewParent!=null&&a.parentView.viewParent.onReadyToDislpay){a.parentView.viewParent.onReadyToDislpay()}a.parentView.invalidate(true);if(a.parentView.loadResetImage){a.parentView.loadImage()}a.parentView=null};s7sdk.View.prototype.loadImage=function(){if(this.resetImageLoaded||this.resetImage.src){return}var a=this.url+(this.url.indexOf("?")>=0?"&":"?")+"wid="+Math.floor(this.width)+"&hei="+Math.floor(this.height)+"&fmt="+this.fmt;s7sdk.Logger.log(s7sdk.Logger.INFO,"s7sdk.View.loadImage - requestUrl: %0",a);this.resetImage.src=a};s7sdk.View.prototype.onLoadImage=function(b){var b=b||window.event;var a=s7sdk.Event.getTarget(b);a.view.invalidate(true);a.view.resetImageLoaded=true;if(a.view.resized){if(a.width==a.view.width&&a.height==a.view.height){a.view.resized=false}}a.view.onResetImageLoaded.apply(a.view,[true,a.view.idx])};s7sdk.View.prototype.onErrorImage=function(b){var a=s7sdk.Event.getTarget(b);a.view.onResetImageLoaded.apply(a.view,[false,a.view.idx]);s7sdk.Logger.log(s7sdk.Logger.WARNING,"s7sdk.View.onErrorImage - Reset image failed to load")};s7sdk.View.prototype.onAbortImage=function(b){var a=s7sdk.Event.getTarget(b);a.view.onResetImageLoaded.apply(a.view,[false,a.view.idx]);s7sdk.Logger.log(s7sdk.Logger.WARNING,"s7sdk.View.onAbortImage - Reset image did not finish the load")};s7sdk.View.prototype.lowerTile=function(h,e){var b=null;var g=h+1;var f;while((b==null||!b.loaded)&&g<=this.resolutions[0].level){var a=this.resolutions[0].level-g;var d=this.resolutions[a];var c=Math.floor(e.x()/Math.pow(2,g-h))+Math.floor(e.y()/Math.pow(2,g-h))*Math.ceil(d.w/s7sdk.Enum.TILE.SIZE);b=d.getTile(c);g++}return b};s7sdk.View.prototype.isLowerTileLoaded=function(){var a=this.resolutions[0].getTile(0);return((a!=null)&&(a.loaded))};s7sdk.View.prototype.clampScale=function(a,c,b){if(a.d*c>this.initScale){c=this.initScale/a.d}if(a.d*c<this.topScale){c=this.topScale/a.d}if(b&&this.zoomLimit>0&&a.d*c<this.initScale/this.zoomLimit){c=this.initScale/(this.zoomLimit*a.d)}if(Math.abs(c-1)<s7sdk.View.epsilon2){return 1}else{return c}};s7sdk.View.prototype.scaleView=function(a){if(this.elasticZoom==0){a=this.clampScale(this.viewToImage,a);if(a==1){return}this.scaleTransform(this.viewToImage,a);this.clampToImage(this.viewToImage);this.calcRes();this.invalidate(true);this.checkState()}else{if(!this.inTransition){this.targetViewToImage=this.viewToImage.clone()}a=this.clampScale(this.targetViewToImage,a);if(a==1){return}this.scaleTransform(this.targetViewToImage,a);this.clampToImage(this.targetViewToImage);this.startTransition()}};s7sdk.View.prototype.scaleTransform=function(c,d){var e=c.transformPoint(new s7sdk.Point2D(this.w/2,this.h/2));c.scale(d,d);var b=c.a*this.w/2+c.b*this.h/2;var a=c.c*this.w/2+c.d*this.h/2;c.tx=e.x-b;c.ty=e.y-a};s7sdk.View.prototype.resize=function(d,e){this.stopAction();if(this.canvas!=null){this.canvas.width=d;this.canvas.height=e}var f=this.width;var b=this.height;var i=this.viewToImage.transformPoint(new s7sdk.Point2D(this.w/2,this.h/2));this.w=d;this.h=e;this.setInitView();this.initScale=1/this.height;var g=this.clampScale(this.viewToImage,b/this.height);this.viewToImage.translate(this.viewToImage.tx*-1,this.viewToImage.ty*-1);this.viewToImage.scale(g,g);var c=this.viewToImage.a*this.w/2+this.viewToImage.b*this.h/2;var a=this.viewToImage.c*this.w/2+this.viewToImage.d*this.h/2;this.viewToImage.tx=i.x-c;this.viewToImage.ty=i.y-a;this.clampToImage(this.viewToImage);this.calcRes();this.resized=true;this.resized=true;if(this.resetImageLoaded){if(this.width==this.resetImage.width&&this.height==this.resetImage.height){this.resized=false}}this.invalidate(false);if(this.viewParent!=null&&this.viewParent.viewInvalidate){this.viewParent.viewInvalidate(this.getViewPort())}this.checkState()};s7sdk.View.prototype.checkState=function(){var a=0;if(Math.abs(this.viewToImage.d-this.initScale)>s7sdk.View.epsilon2){a=6}if(Math.abs(this.viewToImage.d-this.topScale)>s7sdk.View.epsilon2){a|=8;if(this.zoomLimit>0&&this.viewToImage.d>this.initScale/this.zoomLimit&&this.viewToImage.d-this.initScale/this.zoomLimit>s7sdk.View.epsilon2){a|=1}else{if(this.zoomLimit<=0){a|=1}}}if(a&4){var b=this.getViewPort();if(b.x>s7sdk.View.epsilon2){a|=16}if(Math.abs(1-(b.x+b.width))>s7sdk.View.epsilon2){a|=32}if(b.y>s7sdk.View.epsilon2){a|=64}if(Math.abs(1-(b.y+b.height))>s7sdk.View.epsilon2){a|=128}}if(a==this.state){return}this.state=a;if(this.viewParent!=null){this.viewParent.viewStateChange.apply(this.viewParent,[a])}};s7sdk.View.prototype.pinchZoom=function(g,e,a,h){s7sdk.Logger.log(s7sdk.Logger.FINEST,"s7sdk.View.pinchZoom - x: %0, y: %1, scale: %2",g,e,a);g*=this.devicePixelRatio;e*=this.devicePixelRatio;var i=this.clampScale(h,a,false);if(i==1){return}var f=this.viewToImage.transformPoint(new s7sdk.Point2D(g,e));this.viewToImage=h.clone();var c=this.viewToImage.tx;var b=this.viewToImage.ty;this.viewToImage.translate(-c,-b);this.viewToImage.scale(i,i);var d=this.viewToImage.transformPoint(new s7sdk.Point2D(g,e));this.viewToImage.tx=f.x-d.x;this.viewToImage.ty=f.y-d.y;this.clampToImage(this.viewToImage);this.calcRes();this.invalidate(true);this.checkState()};s7sdk.View.prototype.zoomClick=function(b,g,d){b*=this.devicePixelRatio;g*=this.devicePixelRatio;s7sdk.Logger.log(s7sdk.Logger.FINEST,"s7sdk.View.zoomClick - x: %0, y: %1, ctrlDown: %2",b,g,d);var e;if(d){e=this.zoomScale}else{e=1/this.zoomScale}e=this.clampScale(this.viewToImage,e,true);if(e==1){return}this.targetViewToImage=this.viewToImage.clone();var f=this.targetViewToImage.transformPoint(new s7sdk.Point2D(b,g));this.targetViewToImage.scale(e,e);var c=this.targetViewToImage.a*this.w/2+this.targetViewToImage.b*this.h/2;var a=this.targetViewToImage.c*this.w/2+this.targetViewToImage.d*this.h/2;this.targetViewToImage.tx=f.x-c;this.targetViewToImage.ty=f.y-a;this.clampToImage(this.targetViewToImage);this.startTransition()};s7sdk.View.prototype.doNPan=function(b,a,c){this.viewToImage.tx-=b;this.viewToImage.ty-=a;this.clampToImage(this.viewToImage);this.checkState();this.invalidate(c)};s7sdk.View.prototype.doPan=function(b,a,c){this.viewToImage.tx=this.viewToImage.tx-b*this.viewToImage.a*this.devicePixelRatio;this.viewToImage.ty=this.viewToImage.ty-a*this.viewToImage.d*this.devicePixelRatio;this.clampToImage(this.viewToImage);this.checkState();this.invalidate(c)};s7sdk.View.prototype.draw=function(){if(!this.invalidated){return}if(this.canvas==null){return}var m=this.canvas.getContext("2d");if(m==null){return}var l=this.viewToImage.clone();l.invert();var b=l.transformPoint(new s7sdk.Point2D(0,0));var a=l.transformPoint(new s7sdk.Point2D(1,1));var e=new s7sdk.Rectangle(b.x,b.y,a.x-b.x,a.y-b.y);var g=new s7sdk.Rectangle(0,0,this.w,this.h);e=e.intersection(g);var c=new s7sdk.Rectangle(Math.round(e.x),Math.round(e.y),Math.round(e.width),Math.round(e.height));if(e.containsRect(g)==false){if(c.y>0){m.clearRect(0,0,this.canvas.width,c.y+1)}if(c.height+c.y<this.canvas.height){m.clearRect(0,c.height+c.y-1,this.canvas.width,this.canvas.height-c.height+c.y+1)}if(c.x>0){m.clearRect(0,0,c.x+1,this.canvas.height)}if(c.width+c.x<this.canvas.width){m.clearRect(c.x+c.width-1,0,this.canvas.width-c.x+c.width+1,this.canvas.height)}}if(!this.resetImageLoaded||(!this.inTransition&&!this.inPan&&!this.inPinch&&(this.tileRender&&(this.resized||Math.abs(this.viewToImage.d-this.initScale)>s7sdk.View.epsilon2)))){if(!this.isLowerTileLoaded()){return}var h=this.viewToRes();h.invert();this.cleanUpCanvasAndroid4();this.res.draw(e,h,this);s7sdk.Logger.log(s7sdk.Logger.FINEST,"s7sdk.View.draw - Rendering from tiles: %0",e.toString())}else{var f=this.viewToImage.clone();f.scale(this.resetImage.width,this.resetImage.height);var d=f.transformRect(e);var j=new s7sdk.Rectangle(0,0,this.resetImage.width,this.resetImage.height);var k=d.intersection(j);var i=Math.abs(this.viewToImage.d-this.initScale)>s7sdk.View.epsilon3;s7sdk.Logger.log(s7sdk.Logger.FINEST,"s7sdk.View.draw - Rendering from image: %0 to: %1",k.toString(),e.toString());s7sdk.Logger.log(s7sdk.Logger.FINEST,"s7sdk.View - inPan: %0, inPinch: %1, resetImageLoaded: %2, inTransition: %3, tileRender: %4, resized: %5",this.inPan,this.inPinch,this.resetImageLoaded,this.inTransition,this.tileRender,this.resized);if(!isNaN(k.x)&&!isNaN(k.y)&&k.height>0&&k.width>0){if(this.transparent){if(e.x==0&&e.y==0&&e.width==this.canvas.width&&e.height==this.canvas.height){this.canvas.width=e.width}else{m.clearRect(e.x,e.y,e.width,e.height)}}this.cleanUpCanvasAndroid4();if(i||this.resized){m.drawImage(this.resetImage,k.x,k.y,k.width,k.height,e.x,e.y,e.width,e.height)}else{m.drawImage(this.resetImage,0,0,this.resetImage.width,this.resetImage.height,Math.round(e.x),Math.round(e.y),this.resetImage.width,this.resetImage.height)}}}if(this.textoverlay!=null){m.font="30px Times New Roman";m.fillStyle="Black";m.fillText(this.textoverlay,this.canvas.width/2-50,this.canvas.height/2-15)}this.invalidated=false;if(typeof(this.parentView.drawChild)!="undefined"){this.parentView.drawChild()}};s7sdk.View.prototype.cleanUpCanvasAndroid4=function(){if(s7sdk.browser.device.name=="android"&&s7sdk.browser.device.version=="4"&&!(s7sdk.browser.name=="chrome")){this.canvas.style.visibility="hidden";var a=this.canvas.offsetHeight;this.canvas.style.visibility="visible"}};s7sdk.View.prototype.resetView=function(){var d=1/this.height;var c=new s7sdk.Matrix2D(d/this.aspect,0,0,d,0,0);var b=c.a*this.w/2+c.b*this.h/2;var a=c.c*this.w/2+c.d*this.h/2;if(this.align==s7sdk.VIEW_ALIGN_LEFT){c.tx=1-b}else{if(this.align==s7sdk.VIEW_ALIGN_RIGHT){c.tx=0-b}else{c.tx=0.5-b}}c.ty=0.5-a;return c};s7sdk.View.prototype.setInitView=function(){var a=(this.constrainWidth<1)?this.w*this.constrainWidth:this.w;if(a/this.h>this.aspect){this.width=Math.round(this.aspect*this.h);this.height=this.h}else{this.width=a;this.height=Math.round(a/this.aspect)}if(this.maxHeight<this.height){this.height=this.maxHeight;this.width=Math.round(this.aspect*this.height)}var b=(this.zoomStep>0)?this.zoomStep:Math.log(2)/Math.log(this.maxHeight/this.h);this.zoomScale=Math.pow(2,1/b);if(this.elasticZoom<=0){this.scaleInc=Math.pow(2,1/(b*10))}else{this.scaleInc=Math.pow(2,1/(b))}};s7sdk.View.prototype.startTransition=function(){this.startViewToImage=this.viewToImage.clone();var a=new Date();this.startTime=a.getTime();this.prevStep=0;if(!this.inTransition){s7sdk.Util.timeout(s7sdk.View.transitionHandler,25,[this])}this.inTransition=true;if(this.viewParent!=null&&this.viewParent.viewTransitionStart!=null){this.viewParent.viewTransitionStart()}};s7sdk.View.transitionHandler=function(a){var b=false;b=a.onEnterFrame();if(b){s7sdk.Util.timeout(s7sdk.View.transitionHandler,25,[a])}};s7sdk.View.prototype.stopTransition=function(){if(this.inTransition){this.viewToImage=this.targetViewToImage.clone();this.inTransition=false;this.checkState();if(this.viewParent!=null&&this.viewParent.viewTransitionStop!=null){this.viewParent.viewTransitionStop()}}};s7sdk.View.prototype.stopAction=function(){this.stopTransition()};s7sdk.View.prototype.setViewPort=function(a){this.stopAction();this.viewToImage=this.zoomViewTransform(a);this.calcRes();this.invalidate(false)};s7sdk.View.prototype.onEnterFrame=function(){var a=new Date();var b=a.getTime();var j=(this.transitionTime!=0)?(b-this.startTime)/this.transitionTime:1;if(j>this.prevStep+this.maxStep){j=this.prevStep+this.maxStep}this.prevStep=j;if(j==0){return true}if(j>=1){this.viewToImage=this.targetViewToImage.clone();this.calcRes();this.invalidate(false);this.stopTransition();return false}if(this.transitionEasing==s7sdk.Enum.TRANSITION_EASING.AUTO){if(this.elasticZoom>0){if(this.transitionTime>=1500){j=(j*(j-2))*-1}else{if(this.transitionTime>1000){j=(j-=1)*j*j+1}else{if(this.transitionTime>500){j=((j-=1)*j*j*j-1)*-1}else{j=(j-=1)*j*j*j*j+1}}}}}else{if(this.transitionEasing==s7sdk.Enum.TRANSITION_EASING.QUADRATIC){j=(j*(j-2))*-1}else{if(this.transitionEasing==s7sdk.Enum.TRANSITION_EASING.CUBIC){j=(j-=1)*j*j+1}else{if(this.transitionEasing==s7sdk.Enum.TRANSITION_EASING.QUARTIC){j=((j-=1)*j*j*j-1)*-1}else{if(this.transitionEasing==s7sdk.Enum.TRANSITION_EASING.QUINTIC){j=(j-=1)*j*j*j*j+1}}}}}var i=1/j;var c=Math.exp(Math.log(this.targetViewToImage.d/this.startViewToImage.d)/i);var h;if(Math.abs(1-c)>1e-12){h=(1-Math.pow(c,i))/(1-c)}else{h=i}var g=(this.targetViewToImage.tx-this.startViewToImage.tx)/h;var f=(this.targetViewToImage.ty-this.startViewToImage.ty)/h;this.viewToImage=this.startViewToImage.clone();var e=this.viewToImage.tx;var d=this.viewToImage.ty;this.viewToImage.translate(-e,-d);this.viewToImage.scale(c,c);this.viewToImage.translate(e+g,d+f);this.calcRes();if((1-j)<0.1){this.invalidate(false)}else{this.invalidate(true)}this.checkState();return true};s7sdk.View.prototype.calcRes=function(){var b;var a=this.resolutions.length-1;if(this.viewToImage.a>this.viewToImage.d){b=this.viewToImage.a*this.resolutions[a].w}else{b=this.viewToImage.d*this.resolutions[a].h}while(b+s7sdk.View.epsilon1>2&&a>0){a--;b/=2}if(this.res){this.res.release()}this.res=this.resolutions[a]};s7sdk.View.prototype.invalidate=function(b){var d=this.delayTileLoad?this.delayTileLoad:s7sdk.Util.checkDefault(b,false);if(d==false&&this.tileRender&&this.resized==false&&Math.abs(this.viewToImage.d-this.initScale)<s7sdk.View.epsilon2){d=true}var c=new s7sdk.Rectangle(0,0,this.w,this.h);var a=this.viewToRes();c.x=Math.round(a.a*c.x+a.b*c.y+a.tx);c.y=Math.round(a.c*c.x+a.d*c.y+a.ty);c.width=Math.round(a.a*c.width+a.b*c.height);c.height=Math.round(a.c*c.width+a.d*c.height);this.res.invalidate(c,d?-1:0);this.invalidated=true;if(this.viewParent!=null){this.viewParent.viewInvalidate(this.getViewPort())}};s7sdk.View.intervalDraw=function(a){a.draw()};s7sdk.View.prototype.unload=function(a){if(a&8){if(this.drawInterval){clearInterval(this.drawInterval);this.drawInterval=null}}if(this.resolutions==null){return}if(a&1){for(var b=0;b<this.resolutions.length;b++){this.resolutions[b].release()}}};s7sdk.View.prototype.clampToImage=function(c){var e=this.h*c.d;var d=this.w*c.a;if(e<=1){c.ty=Math.max(c.ty,0);c.ty=Math.min(c.ty,1-e)}else{var a=c.d*this.h/2;c.ty=0.5-a}if(d<=1){c.tx=Math.max(c.tx,0);c.tx=Math.min(c.tx,1-d)}else{var b=c.a*this.w/2;if(this.align==s7sdk.VIEW_ALIGN_LEFT){c.tx=1-b;c.tx=Math.min(c.tx,0)}else{if(this.align==s7sdk.VIEW_ALIGN_RIGHT){c.tx=0-b;c.tx=Math.max(c.tx,1-d)}else{c.tx=0.5-b}}}};s7sdk.View.prototype.zoomViewTransform=function(i){var f=i.width*this.aspect;var b=i.height;var e;var j;var h=this.w;if((Math.abs(i.x-0)<s7sdk.View.epsilon2)&&(Math.abs(i.y-0)<s7sdk.View.epsilon2)&&(Math.abs(i.right-1)<s7sdk.View.epsilon2)&&(Math.abs(i.bottom-1)<s7sdk.View.epsilon2)){h=this.constrainWidth*h}if(h/this.h>f/b){j=i.height/this.h;e=j/this.aspect}else{e=i.width/h;j=e*this.aspect}var g=new s7sdk.Matrix2D(e,0,0,j,i.x,i.y);if(g.d<this.topScale){var a=this.topScale/g.d;var d=g.tx;var c=g.ty;g.translate(-d,-c);g.scale(a,a);g.translate(d,c)}this.clampToImage(g);return g};s7sdk.View.prototype.viewToRes=function(){var a=this.viewToImage.clone();a.scale(this.res.w,this.res.h);return a};s7sdk.View.prototype.getViewPort=function(){var a=new s7sdk.Rectangle(0,0,this.w,this.h);a.x=this.viewToImage.a*a.x+this.viewToImage.b*a.y+this.viewToImage.tx;a.y=this.viewToImage.c*a.x+this.viewToImage.d*a.y+this.viewToImage.ty;a.width=this.viewToImage.a*a.width+this.viewToImage.b*a.height;a.height=this.viewToImage.c*a.width+this.viewToImage.d*a.height;return a.intersection(new s7sdk.Rectangle(0,0,1,1))};s7sdk.View.prototype.imagePixelsToViewPoint=function(b){var c=this.viewToImage.clone();c.scale(this.imageWidth,this.imageHeight);c.invert();var a=c.transformPoint(b);a.x/=this.devicePixelRatio;a.y/=this.devicePixelRatio;return a};s7sdk.View.prototype.viewPointToImagePixels=function(a){var b=this.viewToImage.clone();b.scale(this.imageWidth,this.imageHeight);return b.transformPoint(a)};s7sdk.View.prototype.zoomIn=function(){this.zoomClick(this.w/(2*this.devicePixelRatio),this.h/(2*this.devicePixelRatio),false)};s7sdk.View.prototype.zoomOut=function(){this.zoomClick(this.w/(2*this.devicePixelRatio),this.h/(2*this.devicePixelRatio),true)};s7sdk.View.prototype.zoomReset=function(){this.targetViewToImage=this.resetView();this.startTransition()};s7sdk.View.prototype.zoomNRgn=function(a){this.targetViewToImage=this.zoomViewTransform(a);this.startTransition()};s7sdk.View.prototype.zoomRgn=function(a){this.zoomNRgn(new s7sdk.Rectangle(a.x/this.imageWidth,a.y/this.imageHeight,a.width/this.imageWidth,a.height/this.imageHeight))};s7sdk.View.prototype.parentToClientX=function(b,c){var d=c.getBoundingClientRect();var a=b.clientX-d.left;return a};s7sdk.View.prototype.parentToClientY=function(b,c){var d=c.getBoundingClientRect();var a=b.clientY-d.top;return a}};