if(typeof EntityAltImagesWidget=="undefined"){var EntityAltImagesWidget=Base.extend({constructor:null,create:function(b,d){var a=$(b);a.widgetState(d).widgetClass(EntityAltImagesWidget);$(".button",a).assignMouseEvents();var c=this;$(".image-item",a).hover(function(){var e=this.elementData;if(e.productId){c.overProduct(b,e.productId);a.widgetTrigger("ensembleproducthover",[e.productId])}},function(){});$(".image-item",a).click(function(){c.updateImage(b,$(this),0);$(".flash-hide").show();$("#flashContentWrap").hide();$(".alternate-images .image-list .video-item").removeClass("active");return false});$(".video-item",a).click(function(){$(".flash-hide").hide();$("#flashContentWrap").show();$(".alternate-images .image-list li").removeClass("active");$(".alternate-images .image-list .video-item").addClass("active");return false});$(".navigate-previous",a).click(function(){c.updateImage(b,$(".image-item.active",a),-1);return false});$(".navigate-next",a).click(function(){c.updateImage(b,$(".image-item.active",a),1);return false})},updateImage:function(i,a,c){var f=$(i);var h=f.widgetState();if(c==0){$(".image-item",f).removeClass("active");$(a).addClass("active")}else{var e=$(".image-item",f).not(".navigation");var d=e.index($(a)[0]);var g=d+c;g=(g<0?e.length-1:(g>e.length-1?0:g));$(".image-item",f).removeClass("active");$(a).addClass("active")}var b=$(a).elementData();f.widgetTrigger("updateimage",[b.altImage]);EventTracker.track("AltImage",h.entityType.properCase(),h.entityName,b.altImage);if(b.productId){f.widgetTrigger("ensembleproductselected",[b.productId])}},overProduct:function(c,b){var a=$(c);$(".image-item",a).removeClass("mouseover");$(".image-item.e-prod"+b,a).addClass("mouseover")},selectProduct:function(e,d){var c=$(e);var a=$(" .e-prod"+d,c);var b=a.entityData("altImage");c.widgetTrigger("updateimage",[b])},getWidgetClassName:function(){return"EntityAltImagesWidget"}})};