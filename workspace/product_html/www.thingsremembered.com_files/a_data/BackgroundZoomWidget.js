var BackgroundZoomWidget=BaseWidget.extend({create:function(c,d){var b=this.base(c,d);var a=c+"_EntityZoom";$(".buttons .zoom-in",b).click(function(){$(a).widgetTrigger("zoomin")}).assignMouseEvents();$(".buttons .zoom-out",b).click(function(){$(a).widgetTrigger("zoomout")}).assignMouseEvents();$(".buttons .zoom-reset",b).click(function(){$(a).widgetTrigger("reset")}).assignMouseEvents();$(".BackgroundZoom .close-button").assignMouseEvents();$(a).widgetBind("scene7zoomin",function(e,g,f){$(".controls .zoom-reset",b).parent().removeClass("disabled");$(".controls .zoom-out",b).parent().removeClass("disabled");if(f){$(".controls .zoom-in",b).parent().addClass("disabled")}});$(a).widgetBind("scene7zoomout",function(e,f){if(f==1){$(".controls .zoom-reset",b).parent().addClass("disabled");$(".controls .zoom-out",b).parent().addClass("disabled")}$(".controls .zoom-in",b).parent().removeClass("disabled")});$(a).widgetBind("scene7reset",function(){$(".controls .zoom-reset",b).parent().addClass("disabled");$(".controls .zoom-out",b).parent().addClass("disabled");$(".controls .zoom-in",b).parent().removeClass("disabled")});$(a).widgetBind("scene7imagechanged",function(){$(".controls .zoom-reset",b).parent().addClass("disabled");$(".controls .zoom-out",b).parent().addClass("disabled");$(".controls .zoom-in",b).parent().removeClass("disabled")});return b}});