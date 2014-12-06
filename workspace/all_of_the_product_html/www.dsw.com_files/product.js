var _MAX_PRODUCTS=3;
if($("leftNavHeader")){$("leftNavHeader").setStyles({width:"140px"})
}var failureText="Sorry, but this content is currently unavailable. Please contact technical support for assistance.";
function getScale(a,c,b){return({width:a,height:((a/c)*b).round(),scale:(c/a)})
}var SpinsetZoom=new Class({Implements:Options,options:{viewerWidth:null,viewerHeight:null,fixedScale:null,fixedQuality:null,maxWidth:null,maxHeight:null,maxQuality:null,gridFactor:null,startingX:null,startingY:null,zoomImage:"/dsw_shoes/images/zoom-icon.jpg",zoomInImage:"http://s7d2.scene7.com/is/image/DSWShoes/buttons-zoom",zoomOutImage:"http://s7d2.scene7.com/is/image/DSWShoes/buttons-zoomout",overlayImage:"http://s7d2.scene7.com/is/image/DSWShoes/buttons-larger",mediaImage:"http://s7d2.scene7.com/is/image/DSWShoes/buttons-video",overlayAvailable:true},initialize:function(g,f,d){this.src=g;
this.viewer=$(f);
this.setOptions($merge(this.options,d));
this.viewer.addClass("zoom_viewer");
this.outerContainer=this.viewer.getElement("div.zoom_outer_container")||new Element("div",{"class":"zoom_outer_container"}).inject(this.viewer);
this.container=this.outerContainer.getElement("div.zoom_container")||new Element("div",{"class":"zoom_container",styles:{width:this.options.viewerWidth+"px",height:this.options.viewerHeight+"px"}}).inject(this.outerContainer);
this.scaleData=getScale(this.options.viewerWidth,this.options.maxWidth,this.options.maxHeight);
this.scaleMultiplier=Browser.Platform.ios?3:1;
this.fixed=this.container.getElement("img.zoom_fixed")||new Element("img",{"class":"zoom_fixed",styles:{width:this.options.viewerWidth,height:this.options.viewerHeight},src:this.getFixedSrc(this.src)}).inject(this.container);
this.highres=this.container.getElement("div.zoom_highres")||new Element("div",{"class":"zoom_highres",styles:{width:this.options.maxWidth+"px",height:this.options.maxHeight+"px",opacity:0}});
this.lowres=new Element("img",{"class":"zoom_lowres zoom_fixed",styles:{width:this.options.maxWidth,height:this.options.maxHeight},src:this.getLowResSrc(this.src)}).inject(this.highres);
this.grid=[];
for(var b=0;
b<this.options.gridFactor;
b++){for(var i=0;
i<this.options.gridFactor;
i++){var a=this.grid.length,c=(this.options.maxWidth/this.options.gridFactor).round(),e=(this.options.maxHeight/this.options.gridFactor).round();
this.grid[a]=new Element("div",{"class":"zoom_grid",styles:{width:c+"px",height:e+"px",top:(e*i).round()+"px",left:(c*b).round()+"px"}});
this.grid[a].inject(this.highres)
}}this.cover=this.container.getElement("div.zoom_cover")||new Element("div",{"class":"zoom_cover",styles:{width:this.options.maxWidth+"px",height:this.options.maxHeight+"px"}});
this.controlContainer=this.container.getElement("div.control_container")||new Element("div",{"class":"control_container"});
this.controlContainer.addEvent("click",this.onControlClick.bindWithEvent(this));
this.zoomControl=this.controlContainer.getElement("img.control_zoom")||new Element("img",{"class":"control_zoom",src:this.options.zoomInImage}).inject(this.controlContainer);
if(!this.options.overlayMode&&this.options.overlayAvailable){this.overlayControl=this.controlContainer.getElement("img.control_overlay")||new Element("img",{"class":"control_overlay",src:this.options.overlayImage}).inject(this.controlContainer)
}if(this.options.mediaModal!=null){this.mediaControl=this.controlContainer.getElement("img.control_media")||new Element("img",{"class":"control_media",src:this.options.mediaImage}).inject(this.controlContainer)
}this.nativeZoom=Browser.Platform.ios;
if(Browser.Platform.ios){if(this.overlayControl!==undefined&&this.overlayControl!==null){this.overlayControl.setStyle("display","none")
}this.zoomControl.set("src",this.options.zoomImage);
$$("div.tile_secondary img").each(function(h){var j=new URI(h.get("src"));
j.setData("wid",j.getData("wid")*this.scaleMultiplier);
j.setData("hei",j.getData("hei")*this.scaleMultiplier);
j.setData("scl",j.getData("scl")/this.scaleMultiplier);
h.set("src",j.toString())
},this)
}this.highres.injectAfter(this.fixed);
this.cover.injectAfter(this.highres);
this.controlContainer.injectAfter(this.cover)
},changeSrc:function(c,b,d,a){this.emptyImages();
this.src=c;
this.options.productId=b;
this.options.productTitle=d;
this.options.colors=a;
this.fixed.src=this.getFixedSrc(this.src);
this.lowres.src=this.getLowResSrc(this.src)
},emptyImages:function(){this.fixed.src="/dsw_shoes/images/spacer.gif";
this.lowres.src="/dsw_shoes/images/spacer.gif";
len=this.grid.length;
for(var b=0;
b<len;
b++){var a=this.grid[b];
a.setStyle("background-image","none")
}},load:function(a){if(!this.images){this.images=[]
}this.images.unshift(this.getFixedSrc(a));
if(!this.nativeZoom){this.images.push(this.getLowResSrc(a));
if(!this.loadTimeout){this.loadTimeout=setTimeout(function(){var b=this.images.length;
for(var c=0;
c<b;
c++){new Image().src=this.images[c]
}this.loadTimeout=this.images=null
}.bind(this),250)
}}},getFixedSrc:function(d){var b=this.scaleData.width,a=this.options.viewerHeight,c=this.scaleData.scale;
if(Browser.Platform.ios){b=b*this.scaleMultiplier;
a=a*this.scaleMultiplier;
if(b>1000){a=Math.floor(1000/b*a);
b=1000
}if(a>1000){b=Math.floor(1000/a*b);
a=1000
}c=c/(b/this.scaleData.width)
}return d+"?scl="+c+"&qlt="+this.options.fixedQuality+"&fmt=jpeg&wid="+b+"&hei="+a+"&op_sharpen=1"
},getLowResSrc:function(a){return a+"?scl="+this.scaleData.scale+"&qlt="+this.options.fixedQuality+"&fmt=jpeg&wid="+this.scaleData.width+"&hei="+this.scaleData.height+"&op_sharpen=1"
},getGridSrc:function(b,a,j){var d=b.getStyle("width").toInt(),l=b.getStyle("height").toInt(),i=b.getStyle("top").toInt(),c=i+l,g=b.getStyle("left").toInt(),k=g+d,n=(i>j.top&&i<j.bottom&&g>j.left&&g<j.right),h=(i>j.top&&i<j.bottom&&k>j.left&&k<j.right),f=(c>j.top&&c<j.bottom&&g>j.left&&g<j.right),m=(c>j.top&&c<j.bottom&&k>j.left&&k<j.right),e;
if(n||h||f||m){e=a+"?rgn="+g+","+i+","+d+","+l+"&scl=1&qlt="+this.options.maxQuality+"&fmt=jpeg"
}return e
},onControlClick:function(c){var d=$(c.target);
if(!this.nativeZoom&&d==this.zoomControl){this.zoom()
}else{if(!this.nativeZoom&&d==this.overlayControl){var k=this.options.colors.length,g=k>0?66*(1+(k/9).toInt()):0,f=this.spinset.selectedSpin||this.spinset.defaultSpin||"",b=this.spinset.selectedColor||this.spinset.selectedColor||"",j=this.spinset.focusedColor||"",e=this.spinset.defaultColor||"",a="/dsw_shoes/catalog/modals/productOverlay.jsp?prodId="+this.options.productId;
if(g>0){a+="&swatchColumnWidth="+g
}if(f){a+="&selectedSpin="+f
}if(e){a+="&defaultColor="+e
}if(j){a+="&focusedColor="+j
}if(b){a+="&selectedColor="+b
}ModalWindow.open(a,this.options.productTitle,"modalwindow "+(680+g)+" 525 noscroll")
}else{if(d==this.mediaControl){var m=this.options.mediaModal.description.trim(),n=m.replace(/^(.*)_[0-9]+_[0-9]+$/,"$1"),l=m.replace(/^.*_([0-9]+)_[0-9]+$/,"$1"),i=m.replace(/^.*_[0-9]+_([0-9]+)$/,"$1");
ModalWindow.open(this.options.mediaModal.url,n,"modalwindow "+l+" "+i)
}}}},zoom:function(){if(this.highres.getStyle("opacity")==0){this.zoomIn()
}else{this.zoomOut()
}},zoomIn:function(){if(!this.nativeZoom&&this.highres.getStyle("opacity")==0){if(this.zoomControl){this.zoomControl.set("src",this.options.zoomOutImage)
}var a=this.options.startingY||((this.options.maxHeight-this.options.viewerHeight)/2).round(),b=this.options.startingX||((this.options.maxWidth-this.options.viewerWidth)/2).round();
this.highres.setStyles({top:"-"+a+"px",left:"-"+b+"px"});
this.cover.setStyles({top:"-"+a+"px",left:"-"+b+"px"});
new Fx.Tween(this.highres,{duration:"normal"}).start("opacity",1);
if(!this.highres.drag){this.highres.dragAction=function(){var j=this.highres.getStyle("top").toInt()*-1,f=j+this.options.viewerHeight,e=this.highres.getStyle("left").toInt()*-1,l=e+this.options.viewerWidth,k={top:j,bottom:f,left:e,right:l},h=this.grid.length;
for(var g=0;
g<h;
g++){var d=this.grid[g],c=this.getGridSrc(d,this.src,k);
if(c){d.setStyle("background-image","url("+c+")")
}}}.bind(this);
this.highres.drag=new Drag(this.highres,{handle:this.cover,modifiers:{x:"left",y:"top"},limit:{x:[(this.options.maxWidth*-1)+this.options.viewerWidth,0],y:[(this.options.maxHeight*-1)+this.options.viewerHeight,0]},onComplete:this.highres.dragAction});
new Fx.Tween(this.highres,{duration:"normal"}).start("opacity",1)
}this.highres.dragAction();
this.cover.setStyle("cursor","move")
}},zoomOut:function(){if(!this.nativeZoom){if(this.zoomControl){this.zoomControl.set("src",this.options.zoomInImage)
}if(this.highres.getStyle("opacity")==1){new Fx.Tween(this.highres,{duration:"fast"}).start("opacity",0);
this.cover.setStyle("cursor","default")
}}},show:function(a){this.src=a;
this.fixed.src=this.getFixedSrc(this.src);
this.lowres.src=this.getLowResSrc(this.src);
this.zoomOut();
this.cover.setStyle("cursor","default");
this.highres.setStyle("opacity",0);
this.outerContainer.setStyle("display","block")
},hide:function(){this.outerContainer.setStyle("display","none");
this.highres.setStyle("opacity",0);
this.zoomOut()
}});
var Spinset=new Class({Implements:Options,options:{zoom:null,tileWidthPrimary:63,tileHeightPrimary:62,tileWidthSecondary:58,tileHeightSecondary:62,tileLimit:7,overlayMode:false,mediaModal:null,defaultSpin:0,focusedSpin:null,selectedSpin:null,defaultColor:0,focusedColor:null,selectedColor:null},initialize:function(a,l,b,g,m){this.src=a;
this.zoomElement=$(l);
this.menuElement=$(b);
this.count=g;
this.setOptions($merge(this.options,m));
this.selectedColor=this.options.selectedColor;
this.focusedColor=this.options.focusedColor;
this.selectedSpin=this.options.selectedSpin;
this.focusedSpin=this.options.focusedSpin;
this.scaleMultiplier=Browser.Platform.ios?3:1;
if(this.options.swatchContainer){this.options.swatchContainer=$(this.options.swatchContainer)
}if(this.options.alternates){var h=this.options.alternates.length;
for(var e=0;
e<h;
e++){this.options.alternates[e].index=0
}}var h=this.options.spindexes.length;
if(h>0){this.spinsetZoom=new SpinsetZoom(this.options.spindexes[0].src,this.zoomElement,$merge(this.options.zoom,{productId:this.options.productId,productTitle:this.options.productTitle,overlayMode:this.options.overlayMode,colors:this.options.colors,mediaModal:this.options.mediaModal}));
this.spinsetZoom.spinset=this;
for(var e=0;
e<h;
e++){var d=this.options.spindexes[e];
if(!d.index){d.index=e
}if(!d.color){d.color=this.getSwatchColor(d.src)
}this.spinsetZoom.load(d.src);
if(!d.alternates&&this.options.alternates){d.alternates=this.options.alternates
}var k=d.alternates.length;
for(var c=0;
c<k;
c++){var f=d.alternates[c];
if(!f.color){f.color=this.getSwatchColor(f.src)
}this.spinsetZoom.load(f.src)
}}}this.createSpinsetMenu();
this.createSwatchMenu();
if(Browser.Platform.ios){this.removeSpinClass("spinsetFocused")
}},changeProduct:function(a,f,k){this.unselectSpin();
this.unfocusSpin();
this.src=a;
this.setOptions($merge(this.options,k));
this.count=f;
this.selectedColor=this.options.selectedColor;
this.focusedColor=this.options.focusedColor;
this.selectedSpin=this.options.selectedSpin;
this.focusedSpin=this.options.focusedSpin;
if(this.options.alternates){var g=this.options.alternates.length;
for(var d=0;
d<g;
d++){this.options.alternates[d].index=0
}}var g=this.options.spindexes.length;
if(g>0){this.spinsetZoom.changeSrc(this.options.spindexes[0].src,this.options.productId,this.options.productTitle,this.options.colors);
for(var d=0;
d<g;
d++){var c=this.options.spindexes[d];
if(!c.index){c.index=d
}if(!c.color){c.color=this.getSwatchColor(c.src)
}this.spinsetZoom.load(c.src);
if(!c.alternates&&this.options.alternates){c.alternates=this.options.alternates
}var h=c.alternates.length;
for(var b=0;
b<h;
b++){var e=c.alternates[b];
if(!e.color){e.color=this.getSwatchColor(e.src)
}}}}this.createSpinsetMenu()
},onTileFocus:function(a){a.preventDefault();
this.focusSpin(a.target.retrieve("index"))
},onTileUnfocus:function(a){a.preventDefault();
this.unfocusSpin()
},onTileClick:function(b){b.preventDefault();
var a=b.target.retrieve("index");
if(this.selectedSpin==a){this.unselectSpin()
}else{this.selectSpin(a)
}},createSpinsetMenu:function(){var o=this.selectedSpin;
if(!this.menuContainer){this.menuContainer=this.menuElement.getElement("div.tile_container")||new Element("div",{"class":"tile_container"}).inject(this.menuElement);
this.primary=this.menuContainer.getElement("div.tile_primary")||new Element("div",{"class":"tile_primary"}).inject(this.menuContainer);
this.secondary=this.menuContainer.getElement("div.tile_secondary")||new Element("div",{"class":"tile_secondary"}).inject(this.menuContainer);
this.IE6spacer=this.menuContainer.getElement("div.tile_spacer")||new Element("div",{"class":"tile_spacer"}).inject(this.menuContainer);
if(!Browser.Platform.ios){this.menuContainer.addEvent("mouseenter:relay(img)",this.onTileFocus.bind(this));
this.menuContainer.addEvent("mouseleave:relay(img)",this.onTileUnfocus.bind(this))
}this.menuContainer.addEvent("click:relay(img)",this.onTileClick.bind(this))
}var p=this.secondary.getElements("img");
var h=this.options.spindexes.length;
for(var e=0;
e<h;
e++){var d=this.options.spindexes[e],b,m,g,n,k;
if(e==this.options.defaultSpin){this.primaryScale=getScale(this.options.tileWidthPrimary,this.options.zoom.maxWidth,this.options.zoom.maxHeight);
if(d.alternates.length>0){var l=d.alternates.length;
for(var c=0;
c<l;
c++){var f=d.alternates[c];
f.tileSrc=f.src+"?scl="+(this.primaryScale.scale/this.scaleMultiplier)+"&qlt="+this.options.zoom.fixedQuality+"&fmt=jpeg&wid="+(this.primaryScale.width*this.scaleMultiplier)+"&hei="+(this.options.tileHeightSecondary*this.scaleMultiplier)+"&op_sharpen=1"
}}b=this.primaryScale;
m=this.options.tileWidthPrimary;
g=this.options.tileHeightPrimary;
n=this.primary;
k=n.getElement("img")
}else{b=getScale(this.options.tileWidthSecondary,this.options.zoom.maxWidth,this.options.zoom.maxHeight);
m=this.options.tileWidthSecondary;
g=this.options.tileHeightSecondary;
n=this.secondary;
k=p[e-1]
}var a=d.src+"?scl="+(b.scale/this.scaleMultiplier)+"&qlt="+this.options.zoom.fixedQuality+"&fmt=jpeg&wid="+(b.width*this.scaleMultiplier)+"&hei="+(g*this.scaleMultiplier)+"&op_sharpen=1";
if(k){k.set("src","/dsw_shoes/images/spacer.gif");
k.set("src",a);
k.setStyle("display","inline")
}else{k=new Element("img",{styles:{width:m+"px",height:g+"px"},src:a}).inject(n)
}d.tile=k;
d.tile.store("index",e)
}for(var e=p.length;
e>h-1;
--e){p[e-1].setStyle("display","none")
}if(this.options.overlayMode){if(this.selectedColor!=null){this.selectColor(this.selectedColor)
}if(o!=null){this.selectSpin(o)
}}else{if(this.selectedColor!=null){this.selectColor(this.selectedColor)
}else{if(this.focusedColor!=null){this.focusColor(this.focusedColor)
}else{if(this.selectedSpin!=null){this.selectSpin(this.selectedSpin)
}else{if(this.focusedSpin!=null){this.focusSpin(this.focusedSpin)
}else{this.focusSpin(this.options.defaultSpin)
}}}}}},getSwatchColor:function(a){return a.replace(/^.*_([0-9]+)_ss_.*$/,"$1")
},onSwatchFocus:function(a){a.preventDefault();
a.target.addClass("swatchActiveTemporary");
this.focusColor(this.getSwatchColor(a.target.get("src")))
},onSwatchUnfocus:function(a){a.preventDefault();
a.target.removeClass("swatchActiveTemporary");
this.unfocusColor()
},onSwatchClick:function(a){a.preventDefault();
a.target.getParent().getElements("img").removeClass("swatchActive");
a.target.addClass("swatchActive");
this.selectColor(this.getSwatchColor(a.target.get("src")))
},createSwatchMenu:function(){if(this.options.overlayMode&&this.options.swatchContainer){var a=9,d=0,e=this.menuElement.getElements("div");
if(!e){e=[new Element("div")];
this.options.colors.each(function(f){var g=new Element("img",{"class":"overlay_swatch",src:this.src.replace(/^(.*)_[0-9]+_ss_.*$/,"$1_"+f+"_ss_sw?$swatches$")});
if(f==this.selectedColor){g.addClass("swatchActive")
}if(d>=a){d=0;
e[e.length]=new Element("div")
}g.inject(e[e.length-1]);
d++
}.bind(this));
var c=e.length;
for(var b=0;
b<c;
b++){e[b].inject(this.options.swatchContainer)
}}if(!Browser.Platform.ios){this.options.swatchContainer.addEvent("mouseenter:relay(img)",this.onSwatchFocus.bindWithEvent(this));
this.options.swatchContainer.addEvent("mouseleave:relay(img)",this.onSwatchUnfocus.bindWithEvent(this))
}this.options.swatchContainer.addEvent("click:relay(img)",this.onSwatchClick.bindWithEvent(this))
}},selectColor:function(a){this.focusedColor=null;
this.selectedColor=a;
this.selectSpin(this.options.defaultSpin)
},unselectColor:function(){this.selectedColor=null;
this.selectSpin(this.options.defaultSpin)
},focusColor:function(a){this.focusedColor=a;
this.focusSpin(this.options.defaultSpin)
},unfocusColor:function(a){this.focusedColor=this.selectedColor||this.options.defaultColor;
if(this.selectedSpin!=null&&this.selectedSpin!=this.options.defaultSpin){this.locateAlternateSrc(this.options.spindexes[this.options.defaultSpin],this.focusedColor||this.selectedColor||this.options.defaultColor);
this.focusSpin(this.selectedSpin)
}else{this.focusSpin(this.options.defaultSpin)
}},locateAlternateSrc:function(f,a){var e;
if(a){var c=f.alternates.length;
for(var b=0;
!e&&b<c;
b++){var d=f.alternates[b];
if(a==d.color){if(f.tile.get("src")!=d.tileSrc){f.tile.set("src",d.tileSrc)
}e=d.src
}}}return e
},selectSpin:function(b){this.unselectSpin(false);
var a=this.options.spindexes.length;
if(b>=0&&b<a){var d=this.options.spindexes[b],c;
if(b==0){if(!this.selectedColor&&this.options.defaultSpin==b){this.selectedColor=this.options.defaultColor
}c=this.locateAlternateSrc(d,this.selectedColor)
}this.spinsetZoom.show(c||d.src);
d.tile.addClass("spinsetSelected")
}this.selectedSpin=b
},removeSpinClass:function(c){if(c){var a=this.options.spindexes.length;
for(var b=0;
b<a;
b++){this.options.spindexes[b].tile.removeClass(c)
}}},unselectSpin:function(){var a=(arguments.length>0)?arguments[0]:true;
this.removeSpinClass("spinsetSelected");
if(a){this.selectSpin(this.options.defaultSpin)
}},focusSpin:function(b){this.unfocusSpin(false);
var a=this.options.spindexes.length;
if(b>=0&&b<a){var d=this.options.spindexes[b],c;
if(b==this.options.defaultSpin){c=this.locateAlternateSrc(d,this.focusedColor||this.selectedColor||this.options.defaultColor)
}this.spinsetZoom.show(c||d.src);
d.tile.addClass("spinsetFocused")
}this.focusedSpin=b
},unfocusSpin:function(){var a=(arguments.length>0)?arguments[0]:true;
this.removeSpinClass("spinsetFocused");
this.focusedSpin=null;
if(a){if(this.selectedSpin!=null){this.selectSpin(this.selectedSpin)
}else{this.focusSpin(this.options.defaultSpin)
}}},emptyImages:function(){var a=this.menuContainer.getElements("img");
a.each(function(b){b.set("src","/dsw_shoes/images/spacer.gif")
});
this.spinsetZoom.emptyImages()
}});
var Product=new Class({Implements:[Options,Events],defaultOptions:{data:{},skuId:"",productId:"",collectionId:"",collectionName:"",qty:0,s7Address:"",referrerPage:null,isKidsProduct:false,openStockLocator:false,preloadReviews:false,supportPriceImages:false},initialize:function(b,a){this.showErrors();
this.setOptions($merge(this.defaultOptions,a));
this.choicesPrepared=false;
this.spinset=null;
this.productReviews=null;
this.reviewLoader=b;
this.productId=this.options.productId;
this.productUrl=this.options.productUrl;
if(this.options.preloadReviews===true){this.loadReviews()
}this.priceSelected=$("priceSelected");
this.skuStockLevel=$("sku_stockLevel");
this.skuUPC=$("skuUPC");
this.skuCompareAt=$("skuCompareAt");
this.colorLabel=$("ColorLabel");
this.currentProducts={choices:{}};
this.productActionForm=$("productActionForm");
if(this.productActionForm){this.sizeInput=$("size");
this.sizeSelect=$("sizes");
this.widthInput=$("width");
this.colorInput=$("color");
this.quantityInput=$("quantity");
this.skuInput=$("sku");
this.productInput=$("prod");
this.addToBagLink=$("addToBagLink");
this.quantitySelect=$("selQuantity");
this.productActionLink=$$("div.productActionLink");
this.productAction=new ProductAction();
this.productActionForm.set("send",{onSuccess:this.productAction.productActionSuccess.bind(this.productAction),onFailure:this.productAction.productActionError.bind(this.productAction)});
this.productActionLink.each(function(f,d){f.addEvent("click",function(g){if(this.productActionForm!==null){if(this.currentProducts.choices.sizes.length==1&&this.sizeInput.value==""){this.sizeInput.value=this.currentProducts.choices.sizes[0].id
}if(this.currentProducts.choices.widths.length==1&&this.widthInput.value==""){this.widthInput.value=this.currentProducts.choices.widths[0].id
}if(this.currentProducts.choices.colors.length==1&&this.colorInput.value==""){this.colorInput.value=this.currentProducts.choices.colors[0].id
}g.target.morph({opacity:".5"});
var e=$$("img.loader").pick();
var h=g.target.get("goTo");
if(g.target.id=="addToBagLink"){if($$(".loader-qv").pick()){e.removeClass("add-to-wishlist-loader-qv");
e.addClass("add-to-bag-loader-qv")
}else{e.removeClass("add-to-wishlist-loader");
e.addClass("add-to-bag-loader")
}}else{if($$(".loader-product").pick()){e.addClass("add-to-wishlist-loader");
e.removeClass("add-to-bag-loader")
}else{e.addClass("add-to-wishlist-loader-qv");
e.removeClass("add-to-bag-loader-qv")
}}e.fade("in");
this.productAction.resetErrors();
this.productActionForm.set("send",{url:h,method:"post"})
}this.productActionForm.send();
return false
}.bindWithEvent(this))
},this);
if(this.quantitySelect){this.quantityInput.value=this.quantitySelect.value;
this.quantitySelect.addEvent("change",function(d){this.quantityInput.value=this.quantitySelect.value
}.bind(this))
}if(this.options.skuId!=""){var c=this.getSku(this.options.skuId);
if(c){this.sizeInput.set("value",c.size);
this.widthInput.set("value",c.width);
this.colorInput.set("value",c.color)
}}this.prepare();
this.updateForm()
}this.stockLocatorButton=$("openStockLocator");
if(this.stockLocatorButton){this.stockLocatorButton.addEvent("click",this.onStockLocatorClick.bindWithEvent(this));
if(this.options.openStockLocator){this.openStockLocator()
}}},showErrors:function(){var a=$("productOptionsContainer");
if(a){a.getElements(".errorFlyout").fade("in")
}},onStockLocatorClick:function(a){this.openStockLocator()
},openStockLocator:function(){var a="/dsw_shoes/product/"+this.options.productId+"/find?";
if(this.options.collectionName){a+="&categoryName="+this.options.collectionName
}if(this.options.collectionId){a+="&categoryId="+this.options.collectionId
}if(this.sizeInput){a+="&size="+this.sizeInput.value
}if(this.widthInput){a+="&width="+this.widthInput.value
}if(this.colorInput){a+="&color="+this.colorInput.value
}if(window.stockLocator){window.stockLocator=null
}ModalWindow.stockLocatorModalWindow(a,"Find It In Store","741 0 noscroll")
},getSku:function(a){for(var b=0;
b<this.options.data.skus.length;
b++){if(this.options.data.skus[b].id==a){return this.options.data.skus[b]
}}},loadReviews:function(){var a;
a=function(b){if(b.productId===this.options.productId){this.productReviews=b;
this.reviewLoader.removeEvent("complete",a);
this.fireEvent("update",{type:"reviews",product:this})
}}.bind(this);
this.reviewLoader.addEvent("complete",a);
this.reviewLoader.loadReviews(this.options.productId)
},optionSortClosure:function(){var a=(arguments.length>0)?$A(arguments):[];
return a.sort(function(d,c){var f=d===null||d===""||d.innerHTML===null||d.innerHTML===""?-1:parseInt(d.innerHTML)||d.innerHTML,e=c===null||c===""||c.innerHTML===null||c.innerHTML===""?1:parseInt(c.innerHTML)||c.innerHTML;
if(f>e){return 1
}if(f<e){return -1
}return 0
})
},createOption:function(c,f,b,e,a){var b=c+"_"+e.id,d=$(b);
if(d){d.dispose()
}if(e.enabled){d=new Element("option",{id:b,value:e.id,text:e.label});
d.inject(f,"bottom");
if(e.enabled&&(this.currentProducts.choices[c].length==1||e.selected)){this.sizeInput.set("value",e.id)
}}},createButton:function(b,g,i,c,h){var j={},e=b+"_"+c.id,d=$(e),f="buttonDisabled";
if(!d){d=new Element("button",{id:e,name:e,value:c.id,styles:j}).set("html",c.label);
d.injectInside(g)
}if(c.enabled){var k=this.sizeInput.value,a=this.widthInput.value;
if(this.currentProducts.choices[b].length==1||c.selected||(k!=null&&k==c.id)||(a!=null&&a==c.id)){f="buttonActive"
}else{f="buttonNormal"
}}d.className=f;
d.set("disabled","buttonDisabled"==f?"disabled":"")
},createSwatch:function(b,e,h,c,f){var d=b+"_"+c.id,i=this.options.s7Address+this.options.productId+"_"+c.code+"_ss_sw?$slswatches$",g=$(d),a=this.colorInput.get("value");
if(!g){g=new Element("img",{src:i,id:d,value:c.id,alt:c.label,title:c.label,border:"0"}).setStyle("cursor","pointer");
g.injectInside(e)
}if(c.selected||(a!=null&&a==c.id)||(this.options.referrerPage!="shoppingBag"&&this.currentProducts.choices[b].length==1&&f==0&&c.enabled)){g.set("src",i);
g.className="swatchActive";
if(a!==null&&a!==""){this.enforceColorSelection(a)
}this.colorLabel.set("html"," - "+c.label)
}else{g.className="swatchNormal";
g.set("src",i)
}if(!c.enabled){g.set("src",this.options.s7Address+"/na4?$slswatches$&$layer_1_src="+this.options.productId+"_"+c.code+"_ss_sw");
g.className="swatchDisabled";
g.setStyles({opacity:"0.8",cursor:"default"})
}},enforceColorSelection:function(a){if(!window.colorEnforcement){if(this.spinset){this.spinset.selectColor(this.colorsById[a].code);
window.colorEnforcement=true
}else{setTimeout(this.enforceColorSelection.bind(this,a),500)
}}},updateProductInfo:function(){this.currentProducts={choices:{},details:this.options.data.details,skus:[{id:"",upc:"",price:0,clearance:"",luxury:"",msrp:"",yousave:0}]};
var b=this.colorInput.value,e=this.widthInput.value,d=this.sizeInput.value;
for(var a in this.options.data.choices){var c=this.getAvailableSkus(a=="colors"?"":b,a=="widths"?"":e,a=="sizes"?"":d);
this.currentProducts.choices[a]=[];
this.options.data.choices[a].each(function(h,g){var f=c.some(function(i){return i.color==h.id||i.width==h.id||i.size==h.id
});
this.currentProducts.choices[a][g]={id:h.id,code:h.code,label:h.label,selected:b==h.id||e==h.id||d==h.id,enabled:f}
},this)
}var c=this.getAvailableSkus(b,e,d);
if(c.length==1){this.currentProducts.skus=c
}},getAvailableSkus:function(a,d,c){var e=new Array();
for(var b=0;
b<this.options.data.skus.length;
b++){var f=this.options.data.skus[b];
if(a!=""&&a!=f.color){continue
}if(c!=""&&c!=f.size){continue
}if(d!=""&&d!=f.width){continue
}if(f.stockLevel==-1||f.stockLevel>0){e.push(f)
}}return e
},prepare:function(){if(!this.choicesPrepared){this.colorsByCode={};
this.colorsById={};
this.options.data.choices.colors.each(function(b){this.colorsByCode[b.code]=b;
this.colorsById[b.id]=b
},this);
this.updateProductInfo();
if(this.options.qty!=null&&this.options.qty.length>0){this.quantitySelect.value=this.options.qty;
this.quantityInput.value=this.quantitySelect.value
}this.updateChoices();
for(var a in this.currentProducts.choices){switch(this.currentProducts.details[a+"InputType"]){case"option":$(a).addEvent("change",this.onChoiceChange.bindWithEvent(this));
$$(".productOptions ."+a).each(function(b){b.setStyle("display","")
},this);
break;
case"button":$$(".productOptions ."+a).each(function(b){if(!Browser.Platform.ios){b.addEvent("mouseenter:relay(button)",this.onButtonEnter.bindWithEvent(this));
b.addEvent("mouseleave:relay(button)",this.onButtonExit.bindWithEvent(this))
}b.addEvent("click:relay(button)",this.onButtonClick.bindWithEvent(this));
b.setStyle("display","")
},this);
break;
case"swatch":$$(".productOptions ."+a).each(function(b){if(!Browser.Platform.ios){b.addEvent("mouseenter:relay(img)",this.onSwatchEnter.bindWithEvent(this));
b.addEvent("mouseleave:relay(img)",this.onSwatchExit.bindWithEvent(this))
}b.addEvent("click:relay(img)",this.onSwatchClick.bindWithEvent(this));
b.setStyle("display","")
},this);
break;
case"":$$(".productOptions ."+a).each(function(b){b.setStyle("display","none")
},this);
break
}}this.choicesPrepared=true
}},onChoiceChange:function(a){this.productAction.clearFlyouts(a.target);
this.updateForm()
},onButtonClick:function(b){var a=b.target;
if(a.className!="buttonDisabled"){if(a.getParent().getChildren("button").length>1){var c=a.className=="buttonActive";
a.getParent().getChildren("button.buttonActive").each(function(d){d.className="buttonNormal"
});
this.productAction.clearFlyouts(a);
if(!c){a.className="buttonActive"
}this.updateForm();
b.preventDefault()
}}},onButtonEnter:function(b){var a=b.target;
if(a.className!="buttonDisabled"&&a.className!="buttonActive"){if(a.className!="buttonOver"){a.className="buttonOver"
}b.preventDefault()
}},onButtonExit:function(b){var a=b.target;
if(a.className=="buttonOver"){a.className="buttonNormal";
b.preventDefault()
}},unfocusSwatch:function(a){if(a.hasClass("swatchActiveTemporary")){a.removeClass("swatchActiveTemporary")
}if(!a.hasClass("swatchActive")&&this.spinset){this.spinset.unfocusColor()
}},focusSwatch:function(a){if(this.spinset){this.spinset.focusColor(a.get("src").replace(/^.*_([0-9]+)_ss_.*$/,"$1"))
}if(!a.hasClass("swatchActive")){a.addClass("swatchActiveTemporary")
}},selectSwatch:function(a){if(a.getParent().getChildren("img").length>1){var c=a.hasClass("swatchActive");
a.getParent().getElements("img.swatchActive").each(function(d){d.className="swatchNormal"
});
if(!c){a.className="swatchActive"
}this.productAction.clearFlyouts(a);
if(this.spinset){if(!c){var b=a.get("src").replace(/^.*_([0-9]+)_ss_.*$/,"$1");
this.spinset.selectColor(b);
this.colorLabel.set("html"," - "+this.colorsByCode[b].label)
}else{this.spinset.unselectColor();
this.colorLabel.set("html","")
}}this.updateForm()
}},onSwatchEnter:function(b){var a=b.target;
if(a.className!="swatchDisabled"){this.focusSwatch(a);
b.preventDefault()
}},onSwatchExit:function(b){var a=b.target;
if(a.className!="swatchActive"){this.unfocusSwatch(a);
b.preventDefault()
}},onSwatchClick:function(b){var a=b.target;
if(a.className!="swatchDisabled"){this.selectSwatch(a);
b.preventDefault()
}},sortOptions:function(b,e){var c=b.getElements("option"),a=$A(c);
if(e){try{a=a.sort(e)
}catch(d){}}c.dispose();
a.each(function(h,g){h.inject(b,"bottom")
});
var f=this.sizeInput.value;
a.each(function(h,g){h.set("selected",(h.value==f?"true":""))
})
},updateForm:function(){if(this.currentProducts.details){var b,c,a,d=false;
if(this.currentProducts.details.sizesInputType!=""){if(this.currentProducts.details.sizesInputType=="button"){$$("#sizes .buttonActive").each(function(e){b=escape(e.id.replace("sizes_",""))
},this)
}else{if(this.currentProducts.details.sizesInputType=="option"){b=(this.sizeSelect.value=="Select One")?"":this.sizeSelect.value
}}if(this.sizeInput.value!=b){this.sizeInput.set("value",b);
d=true
}}if(this.currentProducts.details.widthsInputType=="button"){$$("#widths .buttonActive").each(function(e){c=escape(e.id.replace("widths_",""))
},this);
if(this.widthInput.value!=c){this.widthInput.set("value",c);
d=true
}}if(this.currentProducts.details.colorsInputType=="swatch"){$$("#colors .swatchActive").each(function(e){a=escape(e.id.replace("colors_",""))
},this);
if(this.colorInput.value!=a){this.colorInput.set("value",a);
d=true
}}if(d){this.updateProductInfo();
this.updateChoices()
}}},updateChoices:function(){for(var a in this.currentProducts.choices){var c=$(a),b=this.currentProducts.details[a+"InputType"];
if(c){this.currentProducts.choices[a].each(function(f,e){switch(b){case"button":this.createButton(a,c,a+"_"+f.id,f,e);
break;
case"option":this.createOption(a,c,a+"_"+f.id,f,e);
break;
case"swatch":this.createSwatch(a,c,a+"_"+f.id,f,e);
break
}},this);
if(b=="option"){this.sortOptions(c,(!this.options.isKidsProduct||(this.options.isKidsProduct&&a!=="sizes"))?this.optionSortClosure:null)
}}if(this.currentProducts.choices[a].length==0){$$("productOptions ."+a).each(function(e){e.setStyle("display","none");
e.set("html","")
},this)
}}$$(".productOptions .sizes, .productOptions .widths, .productOptions .colors, .productOptions .quantity").each(function(f,e){f.getElements(".productStep").each(function(g){g.set("text",e+1)
})
},this);
this.productInput.value=this.options.productId;
var d=this.sizeInput.value&&this.colorInput.value&&this.widthInput.value;
this.currentProducts.skus.each(function(n){if(n!=null){if(d){this.skuInput.value=n.id
}else{this.skuInput.value=""
}var r=(n.clearance=="true")||(this.currentProducts.details.clearance=="true"&&(n.clearance==""));
var g=(n.luxury=="true")||(this.currentProducts.details.luxury=="true"&&(n.luxury==""));
if(this.priceSelected){if(g&&this.options.supportPriceImages){var h=this.priceSelected.getElement("img"),j=r?"\\red255\\green0\\blue0":null,l=d?n.price:this.currentProducts.details.lowestPricePaid;
if(h===null){this.priceSelected.empty();
h=new Element("img").inject(this.priceSelected)
}h.set("src",this.buildPriceImageUrl(h.get("src"),l,null,j,null,false))
}else{this.priceSelected.set("text",d?n.price:this.currentProducts.details.lowestPricePaid)
}this.priceSelected.removeClass(r?"priceSelected":"clearancePriceSelected");
this.priceSelected.addClass(r?"clearancePriceSelected":"priceSelected")
}if(n.stockLevel==-1||n.stockLevel>0){var t=parseInt(n.stockLevel)||0,s=parseInt(this.currentProducts.details.stockLevelThreshold)||0;
if(t>0&&t<=s&&d){var q=null;
this.skuStockLevel.getParent().getElements("option").each(function(i){q=i.get("value").toInt();
if(q>t){i.dispose()
}},this);
if(t>q){var o=(t+1),f=this.skuStockLevel.getParent().getElement("select");
for(var k=(q+1);
k<o;
k++){new Element("option",{value:k}).set("html",k).inject(f)
}}this.skuStockLevel.set("text","ONLY "+t+" LEFT!");
this.skuStockLevel.addClass("stockLevel");
this.quantityInput.value=this.quantitySelect.value
}else{if(t!=0){this.skuStockLevel.set("text","");
this.skuStockLevel.removeClass("stockLevel");
var e=this.skuStockLevel.getParent().getElements("option");
if(e.length<10){var f=this.skuStockLevel.getParent().getElement("select");
for(var k=e.length+1;
k<11;
k++){new Element("option",{value:k}).set("html",k).inject(f)
}}}}}else{this.skuStockLevel.set("html","");
this.skuStockLevel.removeClass("stockLevel")
}if(n.upc){this.skuUPC.set("html","UPC # "+n.upc)
}if(n.msrp&&this.skuCompareAt!==null){if(g&&this.options.supportPriceImages){var m=this.skuCompareAt.getElement("img"),p=n.msrp;
if(m===null){this.skuCompareAt.empty();
this.skuCompareAt.set("html","Compare at ");
m=new Element("img").inject(this.skuCompareAt,"bottom")
}m.set("src",this.buildPriceImageUrl(m.get("src"),n.msrp,"150,24","\\red153\\green153\\blue153","24",false))
}else{this.skuCompareAt.set("html","Compare at "+n.msrp)
}}}},this)
},buildPriceImageUrl:function(g,e,c,a,f,d){var b,h="";
if(g){b=new URI(g)
}else{b=new URI(this.options.s7Address+"price")
}if(e){h+="$p="+e
}if(a){h+="&$color="+a
}if(f){h+="&$fontSize="+f
}if(c){h+="&$l0size="+c+"&$l1size="+c
}if(d!==null&&d!==undefined){if(d===true){h+="&$bold=b"
}else{h+="&$bold=b0"
}}h+="&fmt=png";
b.set("query",h);
return b.toString()
}});
var QuickViewProduct=new Class({Extends:Product,Implements:[Options],createAddToBagEventHandler:function(){}});
var StockLocator=new Class({Implements:[Options],defaultOptions:{data:{},skuId:"",productId:"",s7Address:"",isKidsProduct:false},initialize:function(a){this.setOptions($merge(this.defaultOptions,a));
this.choicesPrepared=false;
this.currentProducts=this.options.data||{choices:{}};
this.findElements();
this.modalCenter=$("mb_center");
this.modalContents=$("mb_contents");
this.productAction=new ProductAction();
if(this.options.skuId!=""){var b=this.getSku(this.options.skuId);
if(b){this.sizeInput.set("value",b.size);
this.widthInput.set("value",b.width);
this.colorInput.set("value",b.color)
}}this.prepare();
this.updateForm()
},prepare:function(){if(!this.choicesPrepared){this.colorsByCode={};
this.colorsById={};
this.options.data.choices.colors.each(function(a){this.colorsByCode[a.code]=a;
this.colorsById[a.id]=a
},this);
this.defaultColor=this.productImage.src.replace(/^.*_([0-9]+)_ss_.*$/,"$1");
this.updateChoices();
this.prepareEvents();
this.choicesPrepared=true
}},findElements:function(){this.sizeInput=$("size2");
this.widthInput=$("width2");
this.colorInput=$("color2");
this.productInput=$("productId");
this.multipleColorsOrWidths=($("widths2")&&$("widths2").getElements("button").length>1)||($("colors2")&&$("colors2").getElements("button").length>1);
this.skuPrice=$("price");
this.skuPriceColor=$("skuPrice_Color2");
this.productImage=$("productImage");
this.colorLabel=$("ColorLabel2");
this.form=$("stockLocatorSearchForm");
this.loadingIndicator=$("stockLocatorLoading");
this.stockLocatorContainer=$("stockLocatorContainer");
this.zipCode=$("zipCode");
this.city=$("city");
this.stateCode=$("stateCode");
this.findButton=$("find");
this.sizeSelect=$("sizes2")
},prepareEvents:function(){this.form=$("stockLocatorSearchForm");
for(var b in this.currentProducts.choices){var a=b+"2";
switch(this.currentProducts.details[b+"InputType"]){case"option":if($(a)){$(a).addEvent("change",this.onChoiceChange.bindWithEvent(this))
}this.form.getElements(".productOptions ."+b).each(function(c){c.setStyle("display","")
},this);
break;
case"button":this.form.getElements(".productOptions ."+b).each(function(c){if(!Browser.Platform.ios){c.addEvent("mouseenter:relay(button)",this.onButtonEnter.bindWithEvent(this));
c.addEvent("mouseleave:relay(button)",this.onButtonExit.bindWithEvent(this))
}c.addEvent("click:relay(button)",this.onButtonClick.bindWithEvent(this));
c.setStyle("display","")
},this);
break;
case"swatch":this.form.getElements(".productOptions ."+b).each(function(c){if(!Browser.Platform.ios){c.addEvent("mouseenter:relay(img)",this.onSwatchEnter.bindWithEvent(this));
c.addEvent("mouseleave:relay(img)",this.onSwatchExit.bindWithEvent(this))
}c.addEvent("click:relay(img)",this.onSwatchClick.bindWithEvent(this));
c.setStyle("display","")
},this);
break;
case"":this.form.getElements(".productOptions ."+b).each(function(c){c.setStyle("display","none")
},this);
break
}}if(this.zipCode){this.zipCode.addEvent("keydown",this.onKeyDown.bindWithEvent(this));
this.zipCode.addEvent("input",this.onInput.bindWithEvent(this))
}if(this.city){this.city.addEvent("keydown",this.onKeyDown.bindWithEvent(this));
this.city.addEvent("input",this.onInput.bindWithEvent(this))
}if(this.stateCode){this.stateCode.addEvent("keydown",this.onKeyDown.bindWithEvent(this));
this.stateCode.addEvent("change",this.onInput.bindWithEvent(this))
}if(Browser.Engine.trident&&Browser.Engine.version<=4&&this.stateCode){$("stateHeader").setStyle("width",149+"px")
}this.findButton.addEvent("click",this.onFindClick.bindWithEvent(this));
this.addForm=$("addForm");
if(this.addForm){this.addForm.addEvent("click:relay(a)",function(e){var d=$(e.target),c=d.getAttribute("data-name"),f=$("productAction");
f.setAttribute("name",c);
f.setAttribute("value",c);
this.addForm.submit();
e.preventDefault()
}.bindWithEvent(this))
}},getSku:function(a){for(var b=0;
b<this.options.data.skus.length;
b++){if(this.options.data.skus[b].id==a){return this.options.data.skus[b]
}}},onInput:function(b){var a=$(b.target);
if(a.value){this.hideErrors(a.getParent("fieldset"))
}},onKeyDown:function(a){if(a.key=="enter"&&this.form){this.submit();
a.stop()
}},showBusy:function(){if(this.loadingIndicator){this.loadingIndicator.setStyle("visibility","visible")
}},onFindClick:function(b){this.showBusy();
if(!this.zipCode.value&&!this.city.value&&!this.stateCode.value){var a=navigator.geolocation;
if(a){a.getCurrentPosition(this.submit.bind(this),this.submit.bind(this))
}else{this.submit()
}}else{this.submit()
}b.stop()
},onButtonEnter:function(b){var a=b.target;
if(a.className!="buttonDisabled"&&a.className!="buttonActive"){if(a.className!="buttonOver"){a.className="buttonOver"
}}b.preventDefault()
},onButtonExit:function(b){var a=b.target;
if(a.className=="buttonOver"){a.className="buttonNormal"
}b.preventDefault()
},onChoiceChange:function(a){this.productAction.clearFlyouts(a.target);
this.updateForm()
},onButtonClick:function(b){var a=b.target;
if(a.className!="buttonDisabled"){if(a.getParent().getChildren("button").length>1){var c=a.className=="buttonActive";
a.getParent().getChildren("button.buttonActive").each(function(d){d.className="buttonNormal"
});
if(!c){a.className="buttonActive"
}this.updateForm()
}this.productAction.clearFlyouts(a)
}b.preventDefault()
},getProductImageSrc:function(a){return this.productImage.src.replace(/^(.*_)([^_]+)(_ss_)(01[?].*)?$/,"$1"+a+"$3$4")
},unfocusSwatch:function(b){if(b.hasClass("swatchActiveTemporary")){b.removeClass("swatchActiveTemporary")
}if(!b.hasClass("swatchActive")){var a=this.defaultColor;
b.getParent().getElements("img.swatchActive").each(function(c){a=c.get("src").replace(/^.*_([^_]+)_ss_.*$/,"$1")
});
this.productImage.src=this.getProductImageSrc(a)
}},focusSwatch:function(a){if(this.productImage){this.productImage.src=this.getProductImageSrc(a.get("src").replace(/^.*_([^_]+)_ss_.*$/,"$1"))
}if(!a.hasClass("swatchActive")){a.addClass("swatchActiveTemporary")
}},selectSwatch:function(b){if(b.getParent().getChildren("img").length>1){var c=b.hasClass("swatchActive");
b.getParent().getElements("img.swatchActive").each(function(d){d.className="swatchNormal"
});
if(!c){b.className="swatchActive"
}this.productAction.clearFlyouts(b);
if(this.productImage){var a=this.defaultColor;
if(!c){a=b.get("src").replace(/^.*_([^_]+)_ss_.*$/,"$1");
this.colorLabel.set("text"," - "+this.colorsByCode[a].label)
}else{this.colorLabel.set("text","")
}this.productImage.src=this.getProductImageSrc(a)
}this.updateForm()
}},onSwatchEnter:function(b){var a=b.target;
if(a.className!="swatchDisabled"){this.focusSwatch(a);
b.preventDefault()
}},onSwatchExit:function(b){var a=b.target;
if(a.className!="swatchActive"){this.unfocusSwatch(a);
b.preventDefault()
}},onSwatchClick:function(b){var a=b.target;
if(a.className!="swatchDisabled"){this.selectSwatch(a);
b.preventDefault()
}},showErrors:function(){this.stockLocatorContainer.getElements(".errorFlyout").fade("in")
},hideErrors:function(a){a.removeClass("error");
a.getElements(".errorHeader").removeClass("errorHeader");
a.getElements(".errorFlyout").dispose()
},updateForm:function(){if(this.currentProducts.details){var b,c,a,d=false;
if(this.currentProducts.details.sizesInputType!=""){if(this.currentProducts.details.sizesInputType=="button"){$$("#sizes2 .buttonActive").each(function(e){b=escape(e.id.replace("sizes2_",""))
},this)
}else{if(this.currentProducts.details.sizesInputType=="option"){b=(this.sizeSelect.value=="Select One")?"":this.sizeSelect.value
}}if(this.sizeInput.value!=b){this.sizeInput.set("value",b);
d=true
}}if(this.currentProducts.details.widthsInputType=="button"){$$("#widths2 .buttonActive").each(function(e){c=escape(e.id.replace("widths2_",""))
},this);
if(this.widthInput.value!=c){this.widthInput.set("value",c);
d=true
}}if(this.currentProducts.details.colorsInputType=="swatch"){$$("#colors2 .swatchActive").each(function(e){a=escape(e.id.replace("colors2_",""))
},this);
if(this.colorInput.value!=a){this.colorInput.set("value",a);
d=true
}}this.showErrors()
}},submit:function(a){this.showBusy();
var d=function(){return(this.stockLocatorContainer.getSize())
}.bind(this);
var b=this.stockLocatorContainer.measure(d).y;
var c="/dsw_shoes/product/"+this.options.productId+"/find";
if(a&&a.coords){c+="?latitude="+a.coords.latitude+"&longitude="+a.coords.longitude
}var e=new Request.HTML({method:this.form.get("method"),url:c,data:this.form,evalScripts:false,onFailure:function(){this.loadingIndicator.setStyle("visibility","hidden")
}.bind(this),onSuccess:function(i,g,f,h){this.stockLocatorContainer.set("html",g.filter("#stockLocatorContainer").get("html"));
$exec(h);
setTimeout(function(){if($("stockLocatorSearchForm")){this.findElements();
this.prepareEvents();
this.updateChoices()
}this.adjustOverlay(b)
}.bind(this),100)
}.bind(this)});
e.send()
},adjustOverlay:function(a){var e=function(){return(this.stockLocatorContainer.getSize())
}.bind(this);
var c=this.stockLocatorContainer.measure(e).y;
var f=c-a;
if(a>this.modalCenter.getStyle("height").toInt()){this.modalCenter.setStyle("height",a+"px");
this.modalContents.setStyle("height",(a+1)+"px")
}var d=(this.modalCenter.getStyle("height").toInt()+f)+"px";
var b=(this.modalContents.getStyle("height").toInt()+f)+"px";
new Fx.Tween(this.modalCenter,{duration:"long",onComplete:function(){this.modalContents.setStyle("height",b)
}.bind(this)}).start("height",d)
},optionSortClosure:function(){var a=(arguments.length>0)?$A(arguments):[];
return a.sort(function(d,c){var f=d===null||d===""||d.innerHTML===null||d.innerHTML===""?-1:parseInt(d.innerHTML)||d.innerHTML,e=c===null||c===""||c.innerHTML===null||c.innerHTML===""?1:parseInt(c.innerHTML)||d.innerHTML;
if(f>e){return 1
}if(f<e){return -1
}return 0
})
},sortOptions:function(b,e){var c=b.getElements("option"),a=$A(c);
if(e){try{a=a.sort(e)
}catch(d){}}c.dispose();
a.each(function(h,g){h.inject(b,"bottom")
});
var f=this.sizeInput.value;
a.each(function(h,g){h.set("selected",(h.value==f?"true":""))
})
},createOption:function(c,f,b,e,a){var b=c+"2_"+e.id,d=$(b);
if(d){d.dispose()
}d=new Element("option",{id:b,value:e.id,text:e.label});
d.inject(f,"bottom");
if(this.currentProducts.choices[c].length==1||e.selected){this.sizeInput.set("value",e.id)
}},createButton:function(b,g,i,c,h){var j={},e=b+"2_"+c.id,d=$(e),f="buttonDisabled";
if(!d){d=new Element("button",{id:e,name:e,value:c.id,styles:j}).set("html",c.label);
d.injectInside(g)
}var k=this.sizeInput.value;
var a=this.widthInput.value;
if(this.currentProducts.choices[b].length==1||(!this.choicesPrepared&&c.selected)||(k!=null&&k==c.id)||(a!=null&&a==c.id)){f="buttonActive"
}else{f="buttonNormal"
}d.className=f;
d.set("disabled","buttonDisabled"==f?"disabled":"")
},createSwatch:function(b,e,h,c,f){var d=b+"2_"+c.id,i=this.options.s7Address+this.options.productId+"_"+c.code+"_ss_sw?$slswatches$",g=$(d),a=this.colorInput.get("value");
if(this.skuPrice&&this.skuPrice.hasClass("clearance")){this.skuPriceColor.removeClass("price");
this.skuPriceColor.addClass("clearance")
}if(!g){g=new Element("img",{src:i,id:d,value:c.id,alt:c.label,title:c.label,border:"0"}).setStyle("cursor","pointer");
g.injectInside(e)
}if((!this.choicesPrepared&&c.selected)||(a!=null&&a==c.id)||(this.currentProducts.choices[b].length==1&&f==0)){g.set("src",i);
g.className="swatchActive";
this.colorLabel.set("html"," - "+c.label)
}else{g.className="swatchNormal"
}},updateChoices:function(){var e=this.currentProducts,a=this.currentProducts.details;
for(var d in e.choices){var h=d+"2",g=$(h),f=a[d+"InputType"],j=e.choices[d];
if(g){j.each(function(l,k){switch(f){case"button":this.createButton(d,g,h+"_"+l.id,l,k);
break;
case"option":this.createOption(d,g,h+"_"+l.id,l,k);
break;
case"swatch":this.createSwatch(d,g,h+"_"+l.id,l,k);
break
}},this);
if(j.length==0){this.form.getElements("productOptions ."+h).each(function(k){k.setStyle("display","none");
k.set("html","")
},this)
}if(f=="option"){this.sortOptions(g,(!this.options.isKidsProduct||(this.options.isKidsProduct&&d!=="sizes"))?this.optionSortClosure:null)
}}}this.form.getElements("label.productOptionHeader").each(function(l,k){l.getElements(".productStep").each(function(m){m.set("text",k+1)
})
},this);
this.productInput.value=this.options.productId;
var b=a.lowestPricePaid,c=this.colorsById[this.colorInput.value],i=c?c.code:this.defaultColor;
if(this.skuPrice&&this.skuPrice.get("html")!=b){this.skuPrice.set("html",b);
this.skuPriceColor.set("html","")
}if(this.productImage){this.productImage.src=this.getProductImageSrc(i)
}this.showErrors()
}});
var Recommendation=new Class({Implements:Options,options:{itemsUrl:"/dsw_shoes/catalog/related_products.jsp",giveUpAfter:5,currentAttempt:0,listenDelay:1000,maxItems:4,recsVar:"adobe_recs",recZone:"productRecommendationZone",recommendedByOverride:"",referredPage:"",mainProduct:"",isOverlay:false},initialize:function(a){this.setOptions($merge(this.defaultOptions,a))
},listen:function(){this.options.currentAttempt++;
try{myRecs=window[this.options.recsVar]
}catch(b){}switch(typeof myRecs){case"undefined":if(this.options.currentAttempt<=this.options.giveUpAfter){rec_timout=setTimeout(this.listen.bind(this),this.options.listenDelay)
}break;
case"object":if(myRecs.recommendation.length>0){this.productIDs=[];
for(var a=0;
a<myRecs.recommendation.length;
a++){this.productIDs.push(myRecs.recommendation[a].productId)
}this.getItems()
}window[this.options.recsVar]=undefined;
break;
default:}},getItems:function(){var a=function(){}.bind(this);
var b=function(e){e=e.stripScripts();
recZone=$(this.options.recZone);
if(recZone!=null){var c=$try(function(){var f=new Element("div");
return f.set("html",e).getChildren().filter("div.productContainer")
})||[];
if(c.length>0){recZone.adopt(c.slice(0,(c.length<this.options.maxItems)?c.length:this.options.maxItems));
recZone.setStyle("display","block")
}var d=recZone.getElements("a");
if(!this.options.isOverlay){d.each(function(g,f){g.addEvent("mousedown",function(){document.getElementById(window.recommendationClickTarget).onclick()
})
})
}else{d.each(function(g,f){g.addEvent("mousedown",function(){document.getElementById(window.recommendationClickTarget_overlay).onclick()
})
})
}}}.bind(this);
this.request=new Request({evalScripts:false,method:"get",url:this.options.itemsUrl+"?id="+this.productIDs.join("&id=")+"&recommendedByOverride="+this.options.recommendedByOverride+"&referredPage="+this.options.referredPage+"&mainProduct="+this.options.mainProduct+"&maxItems="+this.options.maxItems,onFailure:a,onSuccess:b});
this.request.send()
}});
var ReviewLoader=new Class({Implements:[Options,Events],options:{apiKey:"kuy3zj9pr3n7i0wxajrzj04xo",uri:"http://reviews.apitestcustomer.bazaarvoice.com/bvstaging/data",apiVersion:"5.0",limit:100},initialize:function(a){this.setOptions(a);
this.apiVersion=this.options.apiVersion;
this.uri=this.options.uri;
this.apiKey=this.options.apiKey;
this.limit=this.options.limit;
this.requestURL=this.uri+"/reviews.json?apiversion="+this.apiVersion+"&passkey="+this.apiKey+"&Sort=SubmissionTime:desc"
},loadReviews:function(b){var a=function(f){var e=new ProductReviews(f.Results,b);
if(e.reviews.length<f.TotalResults){this.loadRemainingReviews(e,f.TotalResults)
}else{this.completeLoad(e)
}}.bind(this);
var d=this.requestURL+"&Filter=ProductId:"+b+"&Limit="+this.limit;
var c=new Request.JSONP({url:d,callbackKey:"callback",onComplete:a}).send()
},loadRemainingReviews:function(e,a){var d=e.reviews.length;
var b=0;
var c=new Array();
while(d<a){var h=d;
var g=this.requestURL+"&Filter=ProductId:"+e.productId+"&Limit="+this.limit+"&Offset="+h;
var f=new Request.JSONP({url:g,callbackKey:"callback",onComplete:(function(i){return function(k){c[i]=k.Results;
if(this.checkLoadProgress(c,a-this.limit)){var j=c[0];
for(b=1;
b<c.length;
++b){j.append(c[b])
}this.completeLoad(e.add(new ProductReviews(j)))
}}
})(b).bind(this)}).send();
d+=this.limit;
++b
}},checkLoadProgress:function(a,c){var b=0;
a.each(function(d){b+=d.length
});
return b===c
},completeLoad:function(a){this.fireEvent("complete",a)
}});
var ProductReviews=new Class({initialize:function(a,b){this.productId=b||null;
this.reviews=a||[];
this.rating={};
this.rating.sum=0;
this.rating.avg=0;
this.reviewsWithText=new Array();
this.sliders=new Object();
if(a.length>0){this.parseReviewData(this.reviews);
this.rating.scale=a[0].RatingRange
}},parseReviewData:function(b){for(var a=0;
a<b.length;
a++){if(b[a].SecondaryRatings){Object.each(b[a].SecondaryRatings,function(d){if(d.DisplayType=="SLIDER"){var c=this.sliders["_"+d.Id];
if(!c){c=new Object();
c.maxValue=d.ValueRange;
c.sum=0;
c.entries=0;
this.sliders["_"+d.Id]=c
}c.sum+=d.Value;
c.entries++;
c.avg=c.sum/c.entries
}}.bind(this))
}if(b[a].ReviewText){this.reviewsWithText.push(b[a])
}this.rating.sum+=b[a].Rating
}if(this.reviews.length>0){this.rating.avg=this.rating.sum/this.reviews.length
}},add:function(a){if(a!==null&&a.reviews.length>0){this.reviews.append(a.reviews);
this.reviewsWithText.append(a.reviewsWithText);
this.rating.sum+=a.rating.sum;
this.rating.avg=this.rating.sum/this.reviews.length;
this.addSliders(a.sliders)
}return this
},addSliders:function(a){Object.each(a,function(d,b){var c=this.sliders[b];
if(c!==undefined){c.sum+=d.sum;
c.entries+=d.entries;
if(c.entries>0){c.avg=c.sum/c.entries
}}else{this.sliders[b]=d
}}.bind(this))
}});
var AverageOverallRatingView=new Class({Implements:[Options],options:{bvReviewsUrl:"http://reviews.dsw.com"},initialize:function(a,b){this.setOptions(b);
this.container=a;
this.ratingsLoadingContainer=this.container.getElement("#ratingsLoadingContainer");
this.noRatingsContainer=this.container.getElement("#noRatingsContainer");
this.ratingsContainer=this.container.getElement("#ratingsContainer");
this.sliderContainer=this.ratingsContainer.getElement("#ratingSliders");
this.starsContainer=this.ratingsContainer.getElement(".starsContainer");
this.ratingsStars=this.ratingsContainer.getElement(".ratingsStars");
this.readReviewsLink=this.ratingsContainer.getElement("#readReviewsLink");
this.rateProductLink=this.noRatingsContainer.getElement("#rateProduct")
},updateView:function(a,b){this.ratingsLoadingContainer.setStyle("display","none");
if(a.reviews.length===0){this.ratingsContainer.setStyle("display","none");
this.noRatingsContainer.setStyle("display","block");
this.rateProductLink.set("href",this.options.bvReviewsUrl+"/2752/"+a.productId+"/writereview.htm")
}else{this.noRatingsContainer.setStyle("display","none");
this.ratingsContainer.setStyle("display","block");
if(Object.getLength(a.sliders)===0){this.sliderContainer.setStyle("display","none")
}else{this.sliderContainer.getElements("tr").each(function(c){c.setStyle("display","none")
});
this.sliderContainer.setStyle("display","table");
Object.each(a.sliders,function(d,c){this.renderSlider(d,c)
}.bind(this))
}this.ratingsStars.setStyle("width",((a.rating.avg/5)*100)+"%");
this.ratingsStars.set("title","Average Rating ("+a.rating.avg.round(2)+" out of 5)");
this.readReviewsLink.set("href",b+"#productRatingZone")
}},renderSlider:function(b,a){var c=this.sliderContainer.getElement("#slider"+a+" img");
c.getParent("tr").setStyle("display","table-row");
c.setStyle("left",((b.avg/b.maxValue)*100)+"%")
},displayLoadingScreen:function(){this.noRatingsContainer.setStyle("display","none");
this.ratingsContainer.setStyle("display","none");
this.ratingsLoadingContainer.setStyle("display","block")
}});