!function(a){a.fn.backgroundSize=function(b){var c=a.extend({type:"contain"},b),d={CONTAIN:"contain",COVER:"cover"};return this.each(function(){var b=a(this),e=b.css("background-image").replace('url("',"").replace('")',"");if(e){b.css({background:"none",position:"relative"});var f=function(){var a=g.width()||g.attr("width"),e=g.height()||g.attr("height"),f=a/e,h=b.width(),i=b.height(),j=h/i;g.removeAttr("width").removeAttr("height"),g.css(c.type==d.CONTAIN?f>j?{width:"100%",height:"auto","margin-top":(i-h/f)/2}:{width:"auto",height:"100%","margin-left":(h-i*f)/2}:f>j?{width:"auto",height:"100%","margin-left":-(i*f-h)/2}:{width:"100%",height:"auto","margin-top":-(h/f-i)/2})},g=a("<img/>");g.bind("load",function(){f()}).attr("src",e),a(window).bind("resize",function(){f()}),g.css({position:"absolute",top:0,left:0});var h=a("<div/>");h.css({position:"absolute",top:0,left:0,width:"100%",height:"100%","z-index":0,overflow:"hidden"}),h.html(g),b.prepend(h)}})}}(jQuery);