(function(a){a(document).on("cycle-bootstrap",function(d,c,b){"carousel"===c.fx&&(b.getSlideIndex=function(h){var g=this.opts()._carouselWrap.children(),f=g.index(h);return f%g.length},b.next=function(){var f=c.reverse?-1:1;c.allowWrap===!1&&c.currSlide+f>c.slideCount-c.carouselVisible||(c.API.advanceSlide(f),c.API.trigger("cycle-next",[c]).log("cycle-next"))})}),a.fn.cycle.transitions.carousel={preInit:function(c){c.hideNonActive=!1,c.container.on("cycle-destroyed",a.proxy(this.onDestroy,c.API)),c.API.stopTransition=this.stopTransition;for(var b=0;c.startingSlide>b;b++){c.container.append(c.slides[0])}},postInit:function(e){var d,k,f,h,g=e.carouselVertical;e.carouselVisible&&e.carouselVisible>e.slideCount&&(e.carouselVisible=e.slideCount-1);var b=e.carouselVisible||e.slides.length,j={display:g?"block":"inline-block",position:"static"};if(e.container.css({position:"relative",overflow:"hidden"}),e.slides.css(j),e._currSlide=e.currSlide,h=a('<div class="cycle-carousel-wrap"></div>').prependTo(e.container).css({margin:0,padding:0,top:0,left:0,position:"absolute"}).append(e.slides),e._carouselWrap=h,g||h.css("white-space","nowrap"),e.allowWrap!==!1){for(k=0;(void 0===e.carouselVisible?2:1)>k;k++){for(d=0;e.slideCount>d;d++){h.append(e.slides[d].cloneNode(!0))}for(d=e.slideCount;d--;){h.prepend(e.slides[d].cloneNode(!0))}}h.find(".cycle-slide-active").removeClass("cycle-slide-active"),e.slides.eq(e.startingSlide).addClass("cycle-slide-active")}e.pager&&e.allowWrap===!1&&(f=e.slideCount-b,a(e.pager).children().filter(":gt("+f+")").hide()),e._nextBoundry=e.slideCount-e.carouselVisible,this.prepareDimensions(e)},prepareDimensions:function(d){var c,h,e,g,f=d.carouselVertical,b=d.carouselVisible||d.slides.length;if(d.carouselFluid&&d.carouselVisible?d._carouselResizeThrottle||this.fluidSlides(d):d.carouselVisible&&d.carouselSlideDimension?(c=b*d.carouselSlideDimension,d.container[f?"height":"width"](c)):d.carouselVisible&&(c=b*a(d.slides[0])[f?"outerHeight":"outerWidth"](!0),d.container[f?"height":"width"](c)),h=d.carouselOffset||0,d.allowWrap!==!1){if(d.carouselSlideDimension){h-=(d.slideCount+d.currSlide)*d.carouselSlideDimension}else{for(e=d._carouselWrap.children(),g=0;d.slideCount+d.currSlide>g;g++){h-=a(e[g])[f?"outerHeight":"outerWidth"](!0)}}}d._carouselWrap.css(f?"top":"left",h)},fluidSlides:function(d){function c(){clearTimeout(e),e=setTimeout(h,20)}function h(){d._carouselWrap.stop(!1,!0);var i=d.container.width()/d.carouselVisible;i=Math.ceil(i-f),d._carouselWrap.children().width(i),d._sentinel&&d._sentinel.width(i),b(d)}var e,g=d.slides.eq(0),f=g.outerWidth()-g.width(),b=this.prepareDimensions;a(window).on("resize",c),d._carouselResizeThrottle=c,h()},transition:function(w,j,g,x,f){var b,h={},m=w.nextSlide-w.currSlide,q=w.carouselVertical,k=w.speed;if(w.allowWrap===!1){x=m>0;var v=w._currSlide,e=w.slideCount-w.carouselVisible;m>0&&w.nextSlide>e&&v==e?m=0:m>0&&w.nextSlide>e?m=w.nextSlide-v-(w.nextSlide-e):0>m&&w.currSlide>e&&w.nextSlide>e?m=0:0>m&&w.currSlide>e?m+=w.currSlide-e:v=w.currSlide,b=this.getScroll(w,q,v,m),w.API.opts()._currSlide=w.nextSlide>e?e:w.nextSlide}else{x&&0===w.nextSlide?(b=this.getDim(w,w.currSlide,q),f=this.genCallback(w,x,q,f)):x||w.nextSlide!=w.slideCount-1?b=this.getScroll(w,q,w.currSlide,m):(b=this.getDim(w,w.currSlide,q),f=this.genCallback(w,x,q,f))}h[q?"top":"left"]=x?"-="+b:"+="+b,w.throttleSpeed&&(k=b/a(w.slides[0])[q?"height":"width"]()*w.speed),w._carouselWrap.animate(h,k,w.easing,f)},getDim:function(c,b,e){var d=a(c.slides[b]);return d[e?"outerHeight":"outerWidth"](!0)},getScroll:function(f,c,b,h){var d,g=0;if(h>0){for(d=b;b+h>d;d++){g+=this.getDim(f,d,c)}}else{for(d=b;d>b+h;d--){g+=this.getDim(f,d,c)}}return g},genCallback:function(c,b,e,d){return function(){var f=a(c.slides[c.nextSlide]).position(),g=0-f[e?"top":"left"]+(c.carouselOffset||0);c._carouselWrap.css(c.carouselVertical?"top":"left",g),d()}},stopTransition:function(){var b=this.opts();b.slides.stop(!1,!0),b._carouselWrap.stop(!1,!0)},onDestroy:function(){var b=this.opts();b._carouselResizeThrottle&&a(window).off("resize",b._carouselResizeThrottle),b.slides.prependTo(b.container),b._carouselWrap.remove()}}})(jQuery);