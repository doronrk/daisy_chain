(function(){jQuery.widgetSlider=function(a){a=jQuery.extend({viewport:"#widget-slider-viewport",content:"#widget-slider-content",next:"#widget-slider-next",prev:"#widget-slider-prev",item:"div",direction:"vertical",showAmount:3},a);if(jQuery(a.viewport).size()>0){sliderInfo=new Object();jQuery(a.next).hide().attr("href","javascript:void(0)");jQuery(a.prev).hide().attr("href","javascript:void(0)");if(jQuery(a.item).size()>a.showAmount){jQuery(a.next).show()}if(a.direction=="vertical"){sliderInfo.start=0;sliderInfo.end=(jQuery(a.item).size()-a.showAmount)*jQuery(a.item).eq(0).height()*-1;sliderInfo.itemSize=jQuery(a.item).eq(0).height();sliderInfo.top=0}else{sliderInfo.start=0;sliderInfo.end=(jQuery(a.item).size()-a.showAmount)*jQuery(a.item).eq(0).width()*-1;sliderInfo.itemSize=jQuery(a.item).eq(0).width();sliderInfo.left=0}prevButton(a.prev,a);nextButton(a.next,a)}};prevButton=function(a,b){$(a).unbind("click");setTimeout(function(){$(a).click(function(){if(b.direction=="vertical"){sliderInfo.top=parseInt(jQuery(b.content).css("top").split("px")[0])+sliderInfo.itemSize;jQuery(b.content).animate({top:sliderInfo.top+"px"},350);if(sliderInfo.top!=sliderInfo.end){jQuery(b.next).show()}if(sliderInfo.top==0){jQuery(b.prev).hide()}}else{sliderInfo.left=parseInt(jQuery(b.content).css("left").split("px")[0])+sliderInfo.itemSize;jQuery(b.content).animate({left:sliderInfo.left+"px"},350);if(sliderInfo.left!=sliderInfo.end){jQuery(b.next).show()}if(sliderInfo.left==0){jQuery(b.prev).hide()}}prevButton(a,b)})},351)};nextButton=function(a,b){$(a).unbind("click");setTimeout(function(){$(a).click(function(){if(b.direction=="vertical"){sliderInfo.top=parseInt(jQuery(b.content).css("top").split("px")[0])-sliderInfo.itemSize;jQuery(b.content).animate({top:sliderInfo.top+"px"},350);if(sliderInfo.top==sliderInfo.end){jQuery(b.next).hide()}if(sliderInfo.top!=0){jQuery(b.prev).show()}}else{sliderInfo.left=parseInt(jQuery(b.content).css("left").split("px")[0])-sliderInfo.itemSize;jQuery(b.content).animate({left:sliderInfo.left+"px"},350);if(sliderInfo.left==sliderInfo.end){jQuery(b.next).hide()}if(sliderInfo.left!=0){jQuery(b.prev).show()}}nextButton(a,b)})},360)}})(jQuery);