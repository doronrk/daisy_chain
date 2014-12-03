/*!
 Zoom v1.7.13 - 2014-04-29
 Enlarge images on click or mouseover.
 (c) 2014 Jack Moore - http://www.jacklmoore.com/zoom
 license: http://www.opensource.org/licenses/mit-license.php
 */
(function(a){var b={url:false,callback:false,target:false,duration:120,on:"mouseover",touch:true,onZoomIn:false,onZoomOut:false,magnify:1};a.zoom=function(n,c,i,g){var l,o,f,d,e,k,h,j=a(n).css("position"),m=a(c);n.style.position=/(absolute|fixed)/.test(j)?j:"relative";n.style.overflow="hidden";i.style.width=i.style.height="";a(i).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:i.width*g,height:i.height*g,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(n);return{init:function(){o=a(n).outerWidth();l=a(n).outerHeight();if(c===n){d=o;f=l}else{d=m.outerWidth();f=m.outerHeight()}e=(i.width-o)/d;k=(i.height-l)/f;h=m.offset()},move:function(r){var q=(r.pageX-h.left),p=(r.pageY-h.top);p=Math.max(Math.min(p,f),0);q=Math.max(Math.min(q,d),0);i.style.left=(q*-e)+"px";i.style.top=(p*-k)+"px"}}};a.fn.zoom=function(c){return this.each(function(){var g=a.extend({},b,c||{}),l=g.target||this,d=this,k=a(d),h=document.createElement("img"),e=a(h),j="mousemove.zoom",m=false,f=false,i;if(!g.url){i=k.find("img");if(i[0]){g.url=i.data("src")||i.attr("src")}if(!g.url){return}}(function(){var n=l.style.position;var o=l.style.overflow;k.one("zoom.destroy",function(){k.off(".zoom");l.style.position=n;l.style.overflow=o;e.remove()})}());h.onload=function(){var q=a.zoom(l,d,h,g.magnify);function r(s){q.init();q.move(s);e.stop().fadeTo(a.support.opacity?g.duration:0,1,a.isFunction(g.onZoomIn)?g.onZoomIn.call(h):false)}function o(){e.stop().fadeTo(g.duration,0,a.isFunction(g.onZoomOut)?g.onZoomOut.call(h):false)}if(g.on==="grab"){k.on("mousedown.zoom",function(s){if(s.which===1){a(document).one("mouseup.zoom",function(){o();a(document).off(j,q.move)});r(s);a(document).on(j,q.move);s.preventDefault()}})}else{if(g.on==="click"){k.on("click.zoom",function(s){if(m){return}else{m=true;r(s);a(document).on(j,q.move);a(document).one("click.zoom",function(){o();m=false;a(document).off(j,q.move)});return false}})}else{if(g.on==="toggle"){k.on("click.zoom",function(s){if(m){o()}else{r(s)}m=!m})}else{if(g.on==="mouseover"){q.init();k.on("mouseenter.zoom",r).on("mouseleave.zoom",o).on(j,q.move)}}}}if(g.touch){var p=false;var n=a('<button type="button" class="zoom-toggle"><i class="icon-white icon-search"></i></button>').on("click touchstart",function(s){s.preventDefault();s.stopPropagation();if(p){o()}else{r({pageX:k.offset().left+Math.floor(k.width()/2),pageY:k.offset().top+Math.floor(k.height()/2)})}p=!p}).appendTo(k);n.wrap('<div class="zoom-btn-wrap"></div>').after('<div class="zoom-triangle"></div>');k.on("touchstart.zoom",function(s){if(p){s.preventDefault();r(s.originalEvent.touches[0]||s.originalEvent.changedTouches[0])}}).on("touchmove.zoom",function(s){if(p){s.preventDefault();q.move(s.originalEvent.touches[0]||s.originalEvent.changedTouches[0])}})}if(a.isFunction(g.callback)){g.callback.call(h)}};h.src=g.url})};a.fn.zoom.defaults=b}(window.jQuery));