/* jQuery elevateZoom 2.2.3 - Demo's and documentation: - www.elevateweb.co.uk/image-zoom - Copyright (c) 2012 Andrew Eades - www.elevateweb.co.uk - Dual licensed under the LGPL licenses. - http://en.wikipedia.org/wiki/MIT_License - http://en.wikipedia.org/wiki/GNU_General_Public_License */
"function"!==typeof Object.create&&(Object.create=function(c){function e(){}e.prototype=c;return new e});
(function(c){var e={init:function(a,b){var d=this;d.elem=b;d.$elem=c(b);d.imageSrc=d.$elem.data("zoom-image")?d.$elem.data("zoom-image"):d.$elem.attr("src");d.options=c.extend({},c.fn.elevateZoom.options,a);d.options.tint&&(d.options.lensColour="none",d.options.lensOpacity="1");"inner"==d.options.zoomType&&(d.options.showLens=!1);d.$elem.parent().removeAttr("title").removeAttr("alt");d.zoomImage=d.imageSrc;d.refresh(1);c("#"+d.options.gallery+" a").click(function(a){a.preventDefault();d.zoomImagePre=
c(this).data("zoom-image")?c(this).data("zoom-image"):c(this).data("image");d.swaptheimage(c(this).data("image"),d.zoomImagePre);return!1})},refresh:function(a){var b=this;setTimeout(function(){b.fetch(b.imageSrc)},a||b.options.refresh)},fetch:function(a){var b=this,c=new Image;c.onload=function(){b.largeWidth=c.width;b.largeHeight=c.height;b.startZoom();b.currentImage=b.imageSrc;b.options.onZoomedImageLoaded()};c.src=a},startZoom:function(){var a=this;a.nzWidth=a.$elem.width();a.nzHeight=a.$elem.height();
a.nzOffset=a.$elem.offset();a.widthRatio=a.largeWidth/a.nzWidth;a.heightRatio=a.largeHeight/a.nzHeight;"window"==a.options.zoomType&&(a.zoomWindowStyle="overflow: hidden;background-position: 0px 0px;background-color:white;text-align:center;width: "+String(a.options.zoomWindowWidth)+"px;height: "+String(a.options.zoomWindowHeight)+"px;float: left;display: none;z-index:100px;border: "+String(a.options.borderSize)+"px solid "+a.options.borderColour+";background-repeat: no-repeat;position: absolute;");
"inner"==a.options.zoomType&&(a.zoomWindowStyle="overflow: hidden;background-position: 0px 0px;width: "+String(a.nzWidth)+"px;height: "+String(a.nzHeight)+"px;float: left;display: none;cursor:"+a.options.cursor+";px solid "+a.options.borderColour+";background-repeat: no-repeat;position: absolute;");"window"==a.options.zoomType&&(lensHeight=a.nzHeight<a.options.zoomWindowWidth/a.widthRatio?a.nzHeight:String(a.options.zoomWindowHeight/a.heightRatio),lensWidth=a.largeWidth<a.options.zoomWindowWidth?
a.nzHWidth:a.options.zoomWindowWidth/a.widthRatio,a.lensStyle="background-position: 0px 0px;width: "+String(a.options.zoomWindowWidth/a.widthRatio)+"px;height: "+String(a.options.zoomWindowHeight/a.heightRatio)+"px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:"+a.options.lensOpacity+";filter: alpha(opacity = "+100*a.options.lensOpacity+"); zoom:1;width:"+lensWidth+"px;height:"+lensHeight+"px;background-color:"+a.options.lensColour+";cursor:"+a.options.cursor+
";border: "+a.options.lensBorder+"px solid black;background-repeat: no-repeat;position: absolute;");a.tintStyle="display: block;position: absolute;background-color: "+a.options.tintColour+";filter:alpha(opacity=0);opacity: 0;width: "+a.nzWidth+"px;height: "+a.nzHeight+"px;";a.lensRound="";"lens"==a.options.zoomType&&(a.lensStyle="background-position: 0px 0px;float: left;display: none;border: "+String(a.options.borderSize)+"px solid "+a.options.borderColour+";width:"+String(a.options.lensSize)+"px;height:"+
String(a.options.lensSize)+"px;background-repeat: no-repeat;position: absolute;");"round"==a.options.lensShape&&(a.lensRound="border-top-left-radius: "+String(a.options.lensSize/2+a.options.borderSize)+"px;border-top-right-radius: "+String(a.options.lensSize/2+a.options.borderSize)+"px;border-bottom-left-radius: "+String(a.options.lensSize/2+a.options.borderSize)+"px;border-bottom-right-radius: "+String(a.options.lensSize/2+a.options.borderSize)+"px;");a.zoomContainer=c('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:'+
a.nzOffset.left+"px;top:"+a.nzOffset.top+"px;height:"+a.nzHeight+"px;width:"+a.nzWidth+'px;"></div>');c("body").append(a.zoomContainer);a.options.containLensZoom&&"lens"==a.options.zoomType&&a.zoomContainer.css("overflow","hidden");"inner"!=a.options.zoomType&&(a.zoomLens=c("<div class='zoomLens' style='"+a.lensStyle+a.lensRound+"'>&nbsp;</div>").appendTo(a.zoomContainer).click(function(){a.$elem.trigger("click")}));a.options.tint&&(a.tintContainer=c("<div/>").addClass("tintContainer"),a.zoomTint=
c("<div class='zoomTint' style='"+a.tintStyle+"'></div>"),a.zoomLens.wrap(a.tintContainer),a.zoomTintcss=a.zoomLens.after(a.zoomTint),a.zoomTintImage=c('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+a.nzWidth+"px; height: "+a.nzHeight+'px;" src="'+a.imageSrc+'">').appendTo(a.zoomLens).click(function(){a.$elem.trigger("click")}));a.zoomWindow=isNaN(a.options.zoomWindowPosition)?c("<div style='z-index:999;left:"+a.windowOffsetLeft+"px;top:"+a.windowOffsetTop+"px;"+a.zoomWindowStyle+
"' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function(){a.$elem.trigger("click")}):c("<div style='z-index:999;left:"+a.windowOffsetLeft+"px;top:"+a.windowOffsetTop+"px;"+a.zoomWindowStyle+"' class='zoomWindow'>&nbsp;</div>").appendTo(a.zoomContainer).click(function(){a.$elem.trigger("click")});a.zoomWindowContainer=c("<div/>").addClass("zoomWindowContainer").css("width",a.options.zoomWindowWidth);a.zoomWindow.wrap(a.zoomWindowContainer);"lens"==a.options.zoomType&&a.zoomLens.css({backgroundImage:"url('"+
a.imageSrc+"')"});"window"==a.options.zoomType&&a.zoomWindow.css({backgroundImage:"url('"+a.imageSrc+"')"});"inner"==a.options.zoomType&&a.zoomWindow.css({backgroundImage:"url('"+a.imageSrc+"')"});a.$elem.bind("touchmove",function(b){b.preventDefault();a.setPosition(b.originalEvent.touches[0]||b.originalEvent.changedTouches[0])});a.zoomContainer.bind("touchmove",function(b){"inner"==a.options.zoomType&&(a.options.zoomWindowFadeIn?a.zoomWindow.stop(!0,!0).fadeIn(a.options.zoomWindowFadeIn):a.zoomWindow.show());
b.preventDefault();a.setPosition(b.originalEvent.touches[0]||b.originalEvent.changedTouches[0])});a.zoomContainer.bind("touchend",function(){a.zoomWindow.hide();a.options.showLens&&a.zoomLens.hide();a.options.tint&&a.zoomTint.hide()});a.$elem.bind("touchend",function(){a.zoomWindow.hide();a.options.showLens&&a.zoomLens.hide();a.options.tint&&a.zoomTint.hide()});a.options.showLens&&(a.zoomLens.bind("touchmove",function(b){b.preventDefault();a.setPosition(b.originalEvent.touches[0]||b.originalEvent.changedTouches[0])}),
a.zoomLens.bind("touchend",function(){a.zoomWindow.hide();a.options.showLens&&a.zoomLens.hide();a.options.tint&&a.zoomTint.hide()}));a.$elem.bind("mousemove",function(b){(a.lastX!==b.clientX||a.lastY!==b.clientY)&&a.setPosition(b);a.lastX=b.clientX;a.lastY=b.clientY});a.zoomContainer.bind("mousemove",function(b){(a.lastX!==b.clientX||a.lastY!==b.clientY)&&a.setPosition(b);a.lastX=b.clientX;a.lastY=b.clientY});"inner"!=a.options.zoomType&&a.zoomLens.bind("mousemove",function(b){(a.lastX!==b.clientX||
a.lastY!==b.clientY)&&a.setPosition(b);a.lastX=b.clientX;a.lastY=b.clientY});a.options.tint&&a.zoomTint.bind("mousemove",function(b){(a.lastX!==b.clientX||a.lastY!==b.clientY)&&a.setPosition(b);a.lastX=b.clientX;a.lastY=b.clientY});"inner"==a.options.zoomType&&a.zoomWindow.bind("mousemove",function(b){(a.lastX!==b.clientX||a.lastY!==b.clientY)&&a.setPosition(b);a.lastX=b.clientX;a.lastY=b.clientY});a.zoomContainer.mouseenter(function(){"inner"==a.options.zoomType&&(a.options.zoomWindowFadeIn?a.zoomWindow.stop(!0,
!0).fadeIn(a.options.zoomWindowFadeIn):a.zoomWindow.show());"window"==a.options.zoomType&&(a.options.zoomWindowFadeIn?a.zoomWindow.stop(!0,!0).fadeIn(a.options.zoomWindowFadeIn):a.zoomWindow.show());a.options.showLens&&(a.options.lensFadeIn?a.zoomLens.stop(!0,!0).fadeIn(a.options.lensFadeIn):a.zoomLens.show());a.options.tint&&(a.options.zoomTintFadeIn?a.zoomTint.stop(!0,!0).fadeIn(a.options.zoomTintFadeIn):a.zoomTint.show())}).mouseleave(function(){a.zoomWindow.hide();a.options.showLens&&a.zoomLens.hide();
a.options.tint&&a.zoomTint.hide()});a.$elem.mouseenter(function(){"inner"==a.options.zoomType&&(a.options.zoomWindowFadeIn?a.zoomWindow.stop(!0,!0).fadeIn(a.options.zoomWindowFadeIn):a.zoomWindow.show());"window"==a.options.zoomType&&(a.options.zoomWindowFadeIn?a.zoomWindow.stop(!0,!0).fadeIn(a.options.zoomWindowFadeIn):a.zoomWindow.show());a.options.showLens&&(a.options.lensFadeIn?a.zoomLens.stop(!0,!0).fadeIn(a.options.lensFadeIn):a.zoomLens.show());a.options.tint&&(a.options.zoomTintFadeIn?a.zoomTint.stop(!0,
!0).fadeIn(a.options.zoomTintFadeIn):a.zoomTint.show())}).mouseleave(function(){a.zoomWindow.hide();a.options.showLens&&a.zoomLens.hide();a.options.tint&&a.zoomTint.hide()});"inner"!=a.options.zoomType&&a.zoomLens.mouseenter(function(){"inner"==a.options.zoomType&&(a.options.zoomWindowFadeIn?a.zoomWindow.stop(!0,!0).fadeIn(a.options.zoomWindowFadeIn):a.zoomWindow.show());"window"==a.options.zoomType&&a.zoomWindow.show();a.options.showLens&&a.zoomLens.show();a.options.tint&&a.zoomTint.show()}).mouseleave(function(){a.options.zoomWindowFadeOut?
a.zoomWindow.stop(!0,!0).fadeOut(a.options.zoomWindowFadeOut):a.zoomWindow.hide();"inner"!=a.options.zoomType&&a.zoomLens.hide();a.options.tint&&a.zoomTint.hide()});a.options.tint&&a.zoomTint.mouseenter(function(){"inner"==a.options.zoomType&&a.zoomWindow.show();"window"==a.options.zoomType&&a.zoomWindow.show();a.options.showLens&&a.zoomLens.show();a.zoomTint.show()}).mouseleave(function(){a.zoomWindow.hide();"inner"!=a.options.zoomType&&a.zoomLens.hide();a.zoomTint.hide()});"inner"==a.options.zoomType&&
a.zoomWindow.mouseenter(function(){"inner"==a.options.zoomType&&a.zoomWindow.show();"window"==a.options.zoomType&&a.zoomWindow.show();a.options.showLens&&a.zoomLens.show()}).mouseleave(function(){a.options.zoomWindowFadeOut?a.zoomWindow.stop(!0,!0).fadeOut(a.options.zoomWindowFadeOut):a.zoomWindow.hide();"inner"!=a.options.zoomType&&a.zoomLens.hide()})},setPosition:function(a){this.nzHeight=this.$elem.height();this.nzWidth=this.$elem.width();this.nzOffset=this.$elem.offset();this.options.tint&&(this.zoomTint.css({top:0}),
this.zoomTint.css({left:0}));this.options.responsive&&(lensHeight=this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/this.heightRatio),lensWidth=this.largeWidth<this.options.zoomWindowWidth?this.nzHWidth:this.options.zoomWindowWidth/this.widthRatio,this.widthRatio=this.largeWidth/this.nzWidth,this.heightRatio=this.largeHeight/this.nzHeight,this.zoomLens.css({width:String(this.options.zoomWindowWidth/this.widthRatio)+"px",height:String(this.options.zoomWindowHeight/
this.heightRatio)+"px"}));this.zoomContainer.css({top:this.nzOffset.top});this.zoomContainer.css({left:this.nzOffset.left});this.mouseLeft=parseInt(a.pageX-this.nzOffset.left);this.mouseTop=parseInt(a.pageY-this.nzOffset.top);"window"==this.options.zoomType&&(this.Etoppos=this.mouseTop<this.zoomLens.height()/2,this.Eboppos=this.mouseTop>this.nzHeight-this.zoomLens.height()/2-2*this.options.lensBorder,this.Eloppos=this.mouseLeft<0+this.zoomLens.width()/2,this.Eroppos=this.mouseLeft>this.nzWidth-this.zoomLens.width()/
2-2*this.options.lensBorder);"inner"==this.options.zoomType&&(this.Etoppos=this.mouseTop<this.nzHeight/2/this.heightRatio,this.Eboppos=this.mouseTop>this.nzHeight-this.nzHeight/2/this.heightRatio,this.Eloppos=this.mouseLeft<0+this.nzWidth/2/this.widthRatio,this.Eroppos=this.mouseLeft>this.nzWidth-this.nzWidth/2/this.widthRatio-2*this.options.lensBorder);0>this.mouseLeft||0>=this.mouseTop||this.mouseLeft>this.nzWidth||this.mouseTop>this.nzHeight?(this.zoomWindow.hide(),this.options.showLens&&this.zoomLens.hide(),
this.options.tint&&this.zoomTint.hide()):("window"==this.options.zoomType&&this.zoomWindow.show(),this.options.tint&&this.zoomTint.show(),this.options.showLens&&(this.zoomLens.show(),this.lensLeftPos=String(this.mouseLeft-this.zoomLens.width()/2),this.lensTopPos=String(this.mouseTop-this.zoomLens.height()/2)),this.Etoppos&&(this.lensTopPos=0),this.Eloppos&&(this.tintpos=this.lensLeftPos=this.windowLeftPos=0),"window"==this.options.zoomType&&(this.Eboppos&&(this.lensTopPos=Math.max(this.nzHeight-this.zoomLens.height()-
2*this.options.lensBorder,0)),this.Eroppos&&(this.lensLeftPos=this.nzWidth-this.zoomLens.width()-2*this.options.lensBorder)),"inner"==this.options.zoomType&&(this.Eboppos&&(this.lensTopPos=Math.max(this.nzHeight-2*this.options.lensBorder,0)),this.Eroppos&&(this.lensLeftPos=this.nzWidth-this.nzWidth-2*this.options.lensBorder)),"lens"==this.options.zoomType&&(this.windowLeftPos=String(-1*((a.pageX-this.nzOffset.left)*this.widthRatio-this.zoomLens.width()/2)),this.windowTopPos=String(-1*((a.pageY-this.nzOffset.top)*
this.heightRatio-this.zoomLens.height()/2)),this.zoomLens.css({backgroundPosition:this.windowLeftPos+"px "+this.windowTopPos+"px"}),this.setWindowPostition(a)),this.options.tint&&this.setTintPosition(a),"window"==this.options.zoomType&&this.setWindowPostition(a),"inner"==this.options.zoomType&&this.setWindowPostition(a),this.options.showLens&&this.zoomLens.css({left:this.lensLeftPos+"px",top:this.lensTopPos+"px"}))},setLensPostition:function(){},setWindowPostition:function(a){if(isNaN(this.options.zoomWindowPosition))this.externalContainer=
c("#"+this.options.zoomWindowPosition),this.externalContainerWidth=this.externalContainer.width(),this.externalContainerHeight=this.externalContainer.height(),this.externalContainerOffset=this.externalContainer.offset(),this.windowOffsetTop=this.externalContainerOffset.top,this.windowOffsetLeft=this.externalContainerOffset.left;else switch(this.options.zoomWindowPosition){case 1:this.windowOffsetTop=this.options.zoomWindowOffety;this.windowOffsetLeft=+this.nzWidth;break;case 2:this.options.zoomWindowHeight>
this.nzHeight&&(this.windowOffsetTop=-1*(this.options.zoomWindowHeight/2-this.nzHeight/2),this.windowOffsetLeft=this.nzWidth);break;case 3:this.windowOffsetTop=this.nzHeight-this.zoomWindow.height()-2*this.options.borderSize;this.windowOffsetLeft=this.nzWidth;break;case 4:this.windowOffsetTop=this.nzHeight;this.windowOffsetLeft=this.nzWidth;break;case 5:this.windowOffsetTop=this.nzHeight;this.windowOffsetLeft=this.nzWidth-this.zoomWindow.width()-2*this.options.borderSize;break;case 6:this.options.zoomWindowHeight>
this.nzHeight&&(this.windowOffsetTop=this.nzHeight,this.windowOffsetLeft=-1*(this.options.zoomWindowWidth/2-this.nzWidth/2+2*this.options.borderSize));break;case 7:this.windowOffsetTop=this.nzHeight;this.windowOffsetLeft=0;break;case 8:this.windowOffsetTop=this.nzHeight;this.windowOffsetLeft=-1*(this.zoomWindow.width()+2*this.options.borderSize);break;case 9:this.windowOffsetTop=this.nzHeight-this.zoomWindow.height()-2*this.options.borderSize;this.windowOffsetLeft=-1*(this.zoomWindow.width()+2*this.options.borderSize);
break;case 10:this.options.zoomWindowHeight>this.nzHeight&&(this.windowOffsetTop=-1*(this.options.zoomWindowHeight/2-this.nzHeight/2),this.windowOffsetLeft=-1*(this.zoomWindow.width()+2*this.options.borderSize));break;case 11:this.windowOffsetTop=this.options.zoomWindowOffety;this.windowOffsetLeft=-1*(this.zoomWindow.width()+2*this.options.borderSize);break;case 12:this.windowOffsetTop=-1*(this.zoomWindow.height()+2*this.options.borderSize);this.windowOffsetLeft=-1*(this.zoomWindow.width()+2*this.options.borderSize);
break;case 13:this.windowOffsetTop=-1*(this.zoomWindow.height()+2*this.options.borderSize);this.windowOffsetLeft=0;break;case 14:this.options.zoomWindowHeight>this.nzHeight&&(this.windowOffsetTop=-1*(this.zoomWindow.height()+2*this.options.borderSize),this.windowOffsetLeft=-1*(this.options.zoomWindowWidth/2-this.nzWidth/2+2*this.options.borderSize));break;case 15:this.windowOffsetTop=-1*(this.zoomWindow.height()+2*this.options.borderSize);this.windowOffsetLeft=this.nzWidth-this.zoomWindow.width()-
2*this.options.borderSize;break;case 16:this.windowOffsetTop=-1*(this.zoomWindow.height()+2*this.options.borderSize);this.windowOffsetLeft=this.nzWidth;break;default:this.windowOffsetTop=this.options.zoomWindowOffety,this.windowOffsetLeft=this.nzWidth}this.windowOffsetTop+=this.options.zoomWindowOffety;this.windowOffsetLeft+=this.options.zoomWindowOffetx;this.zoomWindow.css({top:this.windowOffsetTop});this.zoomWindow.css({left:this.windowOffsetLeft});"inner"==this.options.zoomType&&(this.zoomWindow.css({top:0}),
this.zoomWindow.css({left:0}));this.windowLeftPos=String(-1*((a.pageX-this.nzOffset.left)*this.widthRatio-this.zoomWindow.width()/2));this.windowTopPos=String(-1*((a.pageY-this.nzOffset.top)*this.heightRatio-this.zoomWindow.height()/2));this.Etoppos&&(this.windowTopPos=0);this.Eloppos&&(this.windowLeftPos=0);this.Eboppos&&(this.windowTopPos=-1*(this.largeHeight-this.zoomWindow.height()));this.Eroppos&&(this.windowLeftPos=-1*(this.largeWidth-this.zoomWindow.width()));if("window"==this.options.zoomType)if(1>=
this.widthRatio&&(this.windowLeftPos=0),1>=this.heightRatio&&(this.windowTopPos=0),this.largeHeight<this.options.zoomWindowHeight&&(this.windowTopPos=0),this.largeWidth<this.options.zoomWindowWidth&&(this.windowLeftPos=0),this.options.easing)if(c.easing.zoomsmoothmove=function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},a=c('<div style="background-position: 3px 5px">'),c.support.bgPos="3px 5px"===a.css("backgroundPosition")?!0:!1,c.support.bgPosXY="3px"===a.css("backgroundPositionX")?
!0:!1,a=null,c.support.bgPos&&!c.support.bgPosXY){var b=c.camelCase,d=function(a){return{top:"0px",bottom:"100%",left:"0px",right:"100%"}[a]||a};c.each(["x","y"],function(a,e){var f=b("background-position-"+e);c.cssHooks[f]={get:function(b){b=c.css(b,"background-position").split(/\s+/,2);return d(b[a])},set:function(b,e){var f=c.css(b,"background-position").split(/\s+/,2);f[a]=d(e);c.style(b,"background-position",f.join(" "))}};c.fx.step[f]=function(a){c.style(a.elem,a.prop,a.now)}});this.zoomWindow.stop().animate({backgroundPositionY:this.windowTopPos,
backgroundPositionX:this.windowLeftPos},{queue:!1,duration:this.options.easingDuration,easing:"zoomsmoothmove"})}else this.zoomWindow.animate({"background-position-x":this.windowLeftPos,"background-position-y":this.windowTopPos},{queue:!1,duration:this.options.easingDuration,easing:"zoomsmoothmove"});else this.zoomWindow.css({backgroundPosition:this.windowLeftPos+"px "+this.windowTopPos+"px"});"inner"==this.options.zoomType&&this.zoomWindow.css({backgroundPosition:this.windowLeftPos+"px "+this.windowTopPos+
"px"})},setTintPosition:function(a){this.nzOffset=this.$elem.offset();this.tintpos=String(-1*(a.pageX-this.nzOffset.left-this.zoomLens.width()/2));this.tintposy=String(-1*(a.pageY-this.nzOffset.top-this.zoomLens.height()/2));this.Etoppos&&(this.tintposy=0);this.Eloppos&&(this.tintpos=0);this.Eboppos&&(this.tintposy=-1*(this.nzHeight-this.zoomLens.height()-2*this.options.lensBorder));this.Eroppos&&(this.tintpos=-1*(this.nzWidth-this.zoomLens.width()-2*this.options.lensBorder));this.options.tint&&(this.zoomTint.css({opacity:this.options.tintOpacity}).animate().fadeIn("slow"),
this.zoomTintImage.css({left:this.tintpos-this.options.lensBorder+"px"}),this.zoomTintImage.css({top:this.tintposy-this.options.lensBorder+"px"}))},swaptheimage:function(a,b){var c=this,e=new Image;e.onload=function(){c.largeWidth=e.width;c.largeHeight=e.height;c.zoomImage=b;c.swapAction(a,b)};e.src=b},swapAction:function(a,b){var c=this,e=new Image;e.onload=function(){c.nzHeight=e.height;c.nzWidth=e.width;c.doneCallback()};e.src=a;c.zoomWindow.css({backgroundImage:"url('"+b+"')"});c.currentImage=
b;c.$elem.attr("src",a)},doneCallback:function(){this.options.tint&&(this.zoomTintImage.attr("src",largeimage),this.zoomTintImage.attr("height",this.$elem.height()),this.zoomTintImage.css({height:this.$elem.height()}),this.zoomTint.css({height:this.$elem.height()}));this.nzOffset=this.$elem.offset();this.nzWidth=this.$elem.width();this.nzHeight=this.$elem.height();this.widthRatio=this.largeWidth/this.nzWidth;this.heightRatio=this.largeHeight/this.nzHeight;lensHeight=this.nzHeight<this.options.zoomWindowWidth/
this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/this.heightRatio);lensWidth=this.largeWidth<this.options.zoomWindowWidth?this.nzHWidth:this.options.zoomWindowWidth/this.widthRatio;this.zoomLens.css("width",lensWidth);this.zoomLens.css("height",lensHeight)},getCurrentImage:function(){return this.zoomImage},getGalleryList:function(){var a=this;a.gallerylist=[];a.options.gallery?c("#"+a.options.gallery+" a").each(function(){var b="";c(this).data("zoom-image")?b=c(this).data("zoom-image"):
c(this).data("image")&&(b=c(this).data("image"));b==a.zoomImage?a.gallerylist.unshift({href:""+b+"",title:c(this).find("img").attr("title")}):a.gallerylist.push({href:""+b+"",title:c(this).find("img").attr("title")})}):a.gallerylist.push({href:""+a.zoomImage+"",title:c(this).find("img").attr("title")});return a.gallerylist}};c.fn.elevateZoom=function(a){return this.each(function(){var b=Object.create(e);b.init(a,this);c.data(this,"elevateZoom",b)})};c.fn.elevateZoom.options={easing:!1,easingType:"zoomdefault",
easingDuration:2E3,lensSize:200,zoomWindowWidth:400,zoomWindowHeight:400,zoomWindowOffetx:0,zoomWindowOffety:0,zoomWindowPosition:1,lensFadeIn:!1,lensFadeOut:!1,debug:!1,zoomWindowFadeIn:!1,zoomWindowFadeOut:!1,zoomWindowAlwaysShow:!1,zoomTintFadeIn:!1,zoomTintFadeOut:!1,borderSize:4,showLens:!0,borderColour:"#888",lensBorder:1,lensShape:"square",zoomType:"window",containLensZoom:!1,lensColour:"white",lensOpacity:0.4,lenszoom:!1,tint:!1,tintColour:"#333",tintOpacity:0.4,gallery:!1,cursor:"default",
responsive:!1,onComplete:c.noop,onZoomedImageLoaded:function(){}}})(jQuery,window,document);