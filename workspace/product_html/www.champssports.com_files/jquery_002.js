(function(e){var t=false,n=false,r=new Array,i={};var s=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"];if(e["transform"]=="")return true;while(t.length)if(t.pop()+"Transform"in e)return true;return false}();var o={init:function(i){var s;s=e.extend({callback:"",direction:"vertical",scrollbar:"",target:undefined,content:"ul",start:0},i);if(!jQuery.support.cssFloat)t=true;n=typeof document.ontouchstart!="undefined"?true:false;return this.each(function(){var t,i;t=e(this);r.push({el:t,original:this,scrollbar:e(s.scrollbar),scrollbarInner:e(s.scrollbar).find(".scrollbar-inner"),target:e(s.target),content:t.find(s.content),parentWidth:t.width(),parentHeight:t.height(),contentWidth:this.scrollWidth,contentHeight:this.scrollHeight,settings:s});i=r.length-1;t.attr("data-index",i);e(s.scrollbar).find(".scrollbar-inner").attr("data-index",i);t.find(s.content).attr("data-index",i);if(r[i].target===undefined||r[i].target.length===0)r[i].target=r[i].scrollbarInner;if(s.direction=="horizontal")o.horizontal(i);else if(s.direction=="vertical")o.vertical(i);else e.error('No support for "'+s.direction+'" scrolling');if(n)o.touch(i)})},vertical:function(i){var s=r[i],u=0;s.scrollFullHeight=s.scrollbar.height();s.scrollMinHeight=s.parentHeight/s.contentHeight*s.scrollFullHeight;if(s.scrollMinHeight<=75)s.scrollMinHeight=75;s.scrollMaxTop=s.scrollFullHeight-s.scrollMinHeight;s.scrollbarInner.animate({height:s.scrollMinHeight+"px"},"fast");s.contentMaxTop=s.contentHeight-s.parentHeight;if(!t){s.target.mousedown(function(t){if(n)o.touchListeners(s,t.pageX,t.pageY,t.pageX,t.pageY,true);else o.bodyListeners(r[e(this).attr("data-index")]);return false})}else{e("body").on("mousedown",s.target,function(e){o.bodyListeners(r[e.data.attr("data-index")]);return false})}},horizontal:function(i){var s=r[i],u=0;s.scrollFullWidth=s.scrollbar.width();s.scrollMinWidth=s.parentWidth/s.contentWidth*s.scrollFullWidth;if(s.scrollMinWidth<=75)s.scrollMinWidth=75;s.scrollMaxLeft=s.scrollFullWidth-s.scrollMinWidth;s.scrollbarInner.animate({width:s.scrollMinWidth+"px"},"fast");s.contentMaxLeft=s.contentWidth-s.parentWidth;if(!t){var a="mousedown";if(n)a="touchstart";s.target.bind(a+".customscroll",function(t){if(n){var i=t.originalEvent.touches[0];o.touchListeners(s,i.clientX,i.clientY,i.clientX,i.clientY,true)}else o.bodyListeners(r[e(this).attr("data-index")]);return false})}else{e("body").bind("mousedown.customscroll",s.target,function(e){o.bodyListeners(r[e.data.attr("data-index")]);return false})}},bodyListeners:function(t){var n=0,r=0;e("body").bind("mousemove.customscroll",function(e){if(t.settings.direction==="horizontal"){o.moveScrollbar(t,e.pageX,n,"left");n=e.pageX}else if(t.settings.direction==="vertical"){o.moveScrollbar(t,e.pageY,r,"top");r=e.pageY}});e("body").bind("mouseup.customscroll",function(t){e("body").unbind("mousemove.customscroll mouseup.customscroll")})},touch:function(t){var n=r[t],i=0,s=0,u=false,a,f;n.content.bind("touchstart.customscroll",function(t){var n=t.originalEvent.touches[0];i=a=n.clientX;s=f=n.clientY;var u=e(this).attr("data-index"),l=r[u];o.touchListeners(l,i,s,a,f,false)})},touchListeners:function(t,n,r,i,s,u){e("body").bind("touchmove.customscroll",function(e){var a=e.originalEvent.touches[0],f,l;if(t.settings.direction==="horizontal"){if(u)o.moveScrollbar(t,a.clientX,n);else{var c,h=Math.abs(n-a.clientX),p=t.scrollFullWidth/t.contentWidth,d=h*p-h;if(n-a.clientX>0)c=(a.clientX-d).toFixed(2);else c=(a.clientX+d).toFixed(2);o.moveScrollbar(t,n,c)}n=a.clientX;f=i-a.clientX;if(!swiping&&Math.abs(f)>30){t.content.find("a").on("click",function(e){return false});swiping=true}}else if(t.settings.direction==="vertical"){if(u)o.moveScrollbar(t,a.clientY,r);else o.moveScrollbar(t,r,a.clientY);r=a.clientY;l=s-a.clientY;if(!swiping&&Math.abs(l)>30){t.content.find("a").on("click",function(e){return false});swiping=true}}});e("body").bind("touchend.customscroll",function(n){e("body").unbind("touchmove.customscroll touchend.customscroll");t.content.find("a").off("click");swiping=false;var r=n.originalEvent.changedTouches[0]})},update:function(){return this.each(function(){var t=r[parseInt(e(this).attr("data-index"),10)];if(t.settings.direction==="horizontal"){t.parentWidth=t.el.width();t.contentWidth=this.scrollWidth;t.scrollFullWidth=t.scrollbar.width();t.scrollMinWidth=t.parentWidth/t.contentWidth*t.scrollFullWidth;if(t.scrollMinWidth<=75)t.scrollMinWidth=75;t.scrollMaxLeft=t.scrollFullWidth-t.scrollMinWidth;t.scrollbarInner.animate({width:t.scrollMinWidth+"px"},"fast");t.contentMaxLeft=t.contentWidth-t.parentWidth}else if(t.settings.direction==="vertical"){t.parentHeight=t.el.height();t.contentHeight=this.scrollHeight;t.scrollFullHeight=t.scrollbar.height();t.scrollMinHeight=t.parentHeight/t.contentHeight*t.scrollFullHeight;if(t.scrollMinHeight<=75)t.scrollMinHeight=75;t.scrollMaxTop=t.scrollFullHeight-t.scrollMinHeight;t.scrollbarInner.animate({height:t.scrollMinHeight+"px"},"fast");t.contentMaxTop=t.contentHeight-t.parentHeight}})},moveContent:function(e,t){var n,r,i;if(s){if(t==="left")i=e.scrollbarInner.position().left;else if(t==="top")i=e.scrollbarInner.position().top}else i=parseInt(e.scrollbarInner.css(t),10);if(e.settings.direction==="horizontal"){var o=(e.scrollMaxLeft-i)/e.scrollMaxLeft;n=e.contentMaxLeft*(1-o);if(s){var u="translate3D("+ -n+"px,0,0)";e.content.css({WebkitTransform:u,MozTransform:u,MsTransform:u,transform:u})}else e.content.css("left",-n+"px")}else if(e.settings.direction==="vertical"){var o=(e.scrollMaxTop-i)/e.scrollMaxTop;r=e.contentMaxTop*(1-o);if(s){var u="translate3D(0,"+ -r+"px,0)";e.content.css({WebkitTransform:u,MozTransform:u,MsTransform:u,transform:u})}else e.content.css("top",-r+"px")}},moveScrollbar:function(e,t,n){var r,i;if(e.settings.direction==="horizontal"){i="left";full=e.scrollFullWidth;min=e.scrollMinWidth}else if(e.settings.direction==="vertical"){i="top";full=e.scrollFullHeight;min=e.scrollMinHeight}if(s){if(i==="left")r=e.scrollbarInner.position().left;else if(i==="top")r=e.scrollbarInner.position().top}else r=parseInt(e.scrollbarInner.css(i),10);if(n!=0){if(t-n>0){if(r+(t-n)>=e.scrollMaxLeft)o.animateScrollbar(e,i,full-min);else o.animateScrollbar(e,i,r+(t-n))}else if(t-n<0){if(r-(n-t)<=0)o.animateScrollbar(e,i,0);else o.animateScrollbar(e,i,r-(n-t))}}o.moveContent(e,i)},animateScrollbar:function(e,t,n){n=parseFloat(n)+"px";if(typeof e.settings.callback==="function")e.settings.callback(n);if(s){var r;if(t==="left")r="translate3D("+n+",0,0)";else if(t==="top")r="translate3D(0,"+n+",0)";e.scrollbarInner.css({WebkitTransform:r,MozTransform:r,MsTransform:r,transform:r})}else e.scrollbarInner.css(t,n)},inertiaScroll:function(e,t){},scrollTo:function(t){var t=parseInt(t,10);return this.each(function(){var n=r[parseInt(e(this).attr("data-index"),10)],i;if(n.settings.direction==="horizontal")i="left";else if(n.settings.direction==="vertical")i="top";var s=t/n.contentMaxLeft;o.animateScrollbar(n,i,n.scrollMaxLeft*s+"px");o.moveContent(n,i)})},destroy:function(){return this.each(function(){var t=parseInt(e(this).attr("data-index")),i=r[t];e("body").unbind(".customscroll");if(n)i.el.unbind(".customscroll");r.splice(t,1)})}};e.fn.customscroll=function(t){if(o[t]){return o[t].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof t==="object"||!t){return o.init.apply(this,arguments)}else{e.error("Method "+t+" does not exist on jQuery.customscroll")}}})(jQuery)