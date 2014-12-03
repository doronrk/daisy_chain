(function($){function format(e){for(var t=1;t<arguments.length;t++){e=e.replace("%"+(t-1),arguments[t])}return e}function CloudZoom(e,t){var n=$("img",e);var r;var i;var s=null;var o=null;var u=null;var a=null;var f=null;var l=null;var c;var h=0;var p,d;var v=0;var m=0;var g=0;var y=0;var b=0;var w,E;var S=this,x;setTimeout(function(){if(o===null){var t=e.width();var n="<div id='mask'></div>";e.parent().append(n);$("#mask").css("height","325px").css("width","325px").addClass("mask");e.parent().append(format('<div style="width:90px;position:absolute;top:145px;left:120px;text-align:center" class="cloud-zoom-loading" >'+app.resources.LOADING+'</div>',t/3,t/2-t/6)).find(":last").css("opacity",.5)}},200);var T=function(){if(l!==null){l.remove();l=null}};this.removeBits=function(){if(u){u.remove();u=null}if(a){a.remove();a=null}if(f){f.remove();f=null}T();$(".cloud-zoom-loading",e.parent()).remove();$(".mask",e.parent()).remove()};this.destroy=function(){e.data("zoom",null);if(o){o.unbind();o.remove();$mask.remove();o=null}if(s){s.remove();s=null}this.removeBits()};this.fadedOut=function(){if(s){s.remove();s=null}this.removeBits()};this.controlLoop=function(){if(u){var e=w-n.offset().left-p*.5>>0;var r=E-n.offset().top-d*.5>>0;if(e<0){e=0}else if(e>n.outerWidth()-p){e=n.outerWidth()-p}if(r<0){r=0}else if(r>n.outerHeight()-d){r=n.outerHeight()-d}u.css({left:e,top:r});u.css("background-position",-e+"px "+ -r+"px");v=e/n.outerWidth()*c.width>>0;m=r/n.outerHeight()*c.height>>0;y+=(v-y)/t.smoothMove;g+=(m-g)/t.smoothMove;s.css("background-position",-(y>>0)+"px "+(-(g>>0)+"px"))}h=setTimeout(function(){S.controlLoop()},30)};this.init2=function(e,t){b++;if(t===1){c=e}if(b===2){this.init()}};this.init=function(){$(".cloud-zoom-loading",e.parent()).remove();$(".mask",e.parent()).remove();o=e.parent().append(format("<div class='mousetrap' style='background-image:url(\".\");z-index:999;position:absolute;width:%0px;height:%1px;left:%2px;top:%3px;'></div>",n.outerWidth(),n.outerHeight(),0,0)).find(":last");var r="ontouchstart"in document.documentElement?true:false;var i="touchmove mousemove";var v="touchend mouseleave";var m="touchstart mouseenter";var g="touchstart click";o.bind(i,this,function(e){w=typeof e.originalEvent.touches!="undefined"?e.originalEvent.touches[0].pageX:e.pageX;E=typeof e.originalEvent.touches!="undefined"?e.originalEvent.touches[0].pageY:e.pageY});o.bind(v,this,function(e){clearTimeout(h);if(u){u.fadeOut(0)}if(a){a.fadeOut(0)}if(f){f.fadeOut(0)}s.fadeOut(300,function(){S.fadedOut()});return false});o.bind(m,this,function(i){if(r){i.preventDefault()}w=typeof i.originalEvent.touches!="undefined"?i.originalEvent.touches[0].pageX:i.pageX;E=typeof i.originalEvent.touches!="undefined"?i.originalEvent.touches[0].pageY:i.pageY;x=i.data;if(s){s.stop(true,false);s.remove()}var h=t.adjustX,v=t.adjustY;var m=n.outerWidth();var g=n.outerHeight();var y=t.zoomWidth;var b=t.zoomHeight;if(t.zoomWidth=="auto"){y=m}if(t.zoomHeight=="auto"){b=g}var S=e.parent();switch(t.position){case"top":v-=b;break;case"right":h+=m;break;case"bottom":v+=g;break;case"left":h-=y;break;case"inside":y=m;b=g;break;default:S=$("#"+t.position);if(!S.length){S=e;h+=m;v+=g}else{y=S.innerWidth();b=S.innerHeight()}}s=S.append(format('<div id="cloud-zoom-big" class="cloud-zoom-big" style="display:none;position:absolute;left:%0px;width:300px;height:400px;background-image:url(\'%4\');z-index:100;"></div>',h,v,y,b,c.src)).find(":last");if(n.attr("title")&&t.showTitle){s.append(format('<div class="cloud-zoom-title">%0</div>',n.attr("title"))).find(":last").css("opacity",t.titleOpacity)}if($.browser.msie&&$.browser.version<7){l=$('<iframe frameborder="0" src="#"></iframe>').css({position:"absolute",left:h,top:v,zIndex:99,width:y,height:b}).insertBefore(s)}s.fadeIn(500);if(u){u.remove();u=null}p=n.outerWidth()/c.width*s.width();d=n.outerHeight()/c.height*s.height();u=e.append(format("<div class = 'cloud-zoom-lens' style='display:none;z-index:98;position:absolute;width:%0px;height:%1px;'></div>",p,d)).find(":last");o.css("cursor",u.css("cursor"));var T=false;if(t.tint){u.css("background",'url("'+n.attr("src")+'")');a=e.append(format('<div style="display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;" />',n.outerWidth(),n.outerHeight(),t.tint)).find(":last");a.css("opacity",t.tintOpacity);T=true;a.fadeIn(0)}if(t.softFocus){u.css("background",'url("'+n.attr("src")+'")');f=e.append(format('<div style="position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;" />',n.outerWidth()-2,n.outerHeight()-2,t.tint)).find(":last");f.css("background",'url("'+n.attr("src")+'")');f.css("opacity",.5);T=true;f.fadeIn(500)}if(!T){u.css("opacity",t.lensOpacity)}if(t.position!=="inside"){u.fadeIn(500)}x.controlLoop();return})};r=new Image;$(r).load(function(){S.init2(this,0)});r.src=n.attr("src");i=new Image;$(i).load(function(){S.init2(this,1)});i.src=e.attr("href")}$.fn.CloudZoom=function(options){try{document.execCommand("BackgroundImageCache",false,true)}catch(e){}this.each(function(){var relOpts,opts;eval("var	a = {"+$(this).attr("rel")+"}");relOpts=a;if($(this).is(".cloud-zoom")){$(this).css({position:"relative",display:"block"});$("img",$(this)).css({display:"block"});if($(this).parent().attr("id")!="wrap"){$(this).wrap('<div id="wrap" style="top:0px;position:relative;"></div>')}opts=$.extend({},$.fn.CloudZoom.defaults,options);opts=$.extend({},opts,relOpts);$(this).data("zoom",new CloudZoom($(this),opts))}else if($(this).is(".cloud-zoom-gallery")){opts=$.extend({},relOpts,options);$(this).data("relOpts",opts);$(this).bind(m_click,$(this),function(e){var t=e.data.data("relOpts");$("#"+t.useZoom).data("zoom").destroy();$("#"+t.useZoom).attr("href",e.data.attr("href"));$("#"+t.useZoom+" img").attr("src",e.data.data("relOpts").smallImage);$("#"+e.data.data("relOpts").useZoom).CloudZoom();return false})}});return this};$.fn.CloudZoom.defaults={zoomWidth:"auto",zoomHeight:"auto",position:"right",tint:false,tintOpacity:0,lensOpacity:.5,softFocus:false,smoothMove:3,showTitle:true,titleOpacity:.5,adjustX:0,adjustY:0}})(jQuery)