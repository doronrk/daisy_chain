if(typeof ImageWidget=="undefined"){var ImageWidget=BaseWidget.extend({getState:function(c){var a=$(c);var b=a.widgetState();if(!b.layers&&a.elementData()){a.widgetState(a.elementData()).widgetClass(ImageWidget);b=a.widgetState()}return b},getBackgroundSrc:function(c){var b=this.getState(c);var a=b.layers.split(",");return(a.length==2?a[0]:"")},getImageSrc:function(c){var b=this.getState(c);var a=b.layers.split(",");return(a.length==2?a[1]:a[0])},getLayerSrc:function(c,a){var b=this.getState(c);return b.layers.split(",")[a]},setLayerSrc:function(g,a,c){if(c.indexOf(".")!=-1){c=c.substring(0,c.indexOf("."))}var f=this.getState(g);var e=$("#currentImageSrc").val();if(e==""){e=$(g).widgetChild("img").attr("src")}var b=f.layers.split(",")[a];var d=e.replace(new RegExp("&src=ThingsRemembered/"+b),"&src=ThingsRemembered/"+c);var h=f.layers.split(",");h[a]=c;f.layers=h.join(",");$(g).widgetChild("img").attr("src",d)},setImageSrc:function(f,d,c){var e=this.getState(f);var b=e.layers.split(",");for(var a in b){if(d==b[a]){this.setLayerSrc(f,parseInt(a),c);break}}},setImageSize:function(c,e,a){var b=$("img",c);var d=b.attr("src").replace(/wid=[0-9]+/g,"wid="+e).replace(/hei=[0-9]+/g,"hei="+a).replace(/size=[0-9,\.]+/g,"size="+e+","+a);b.attr("width",e).attr("height",a).attr("src",d)},getWidgetClassName:function(){return"ImageWidget"}})};