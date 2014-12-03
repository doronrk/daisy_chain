function Slideshow(){this.slideshowContainer;
this.listBigs;
this.listThumbs;
this.listBigsWrapper;
this.listThumbsWrapper;
this.arrowLeft;
this.arrowRight;
this.myThumbsScroll;
this.myBigScroll;
this.itemClicked=-1;
this.thumbsWidth=0;
this.mediaWidth;
this.mediaHeight;
this.thumbsHeight;
this.bigsHeight;
this.bigsWidth;
this.paginationEl;
this.heightMode;
this.scrollDuration=500;
this.slideCount;
this.currentPosition=0;
this.arrowBulletRight;
this.arrowBulletLeft;
this.maxNumberOfBullets;
this.numberOfBullet;
this.callBackEndScroll;
this.options;
this.slideshowSelector;
this.isSwiping=false;
this.initSlideshow=function(a,c){var b=this;
this.slideshowSelector=a;
this.options=(c==undefined)?new SlideshowOption():c;
this.slideshowContainer=$(a);
if(this.slideshowContainer.attr("data-loaded")){return false
}this.slideshowContainer.attr("data-loaded","true");
this.buildArchitecture();
this.initializeScroll();
this.resizeContainer();
if(this.isThumbsUsed()||this.options.navigMode=="thumbsAndBullets"){this.linkThumbsToBig()
}registerEvent("resizeEvent",function(){var d=$(b.slideshowContainer).is(":visible");
if(d){b.resizeContainer();
b.reloadS7()
}})
};
this.scrollEndCallback=function(){this.currentPosition=Math.abs(Math.round(this.myBigScroll.x/this.myBigScroll.wrapperW));
if(this.itemClicked>=0){this.myThumbsScroll.scrollToElement("li:nth-child("+this.itemClicked+")",this.scrollDuration);
this.myBigScroll.currPageX=this.itemClicked;
this.itemClicked=-1
}else{if(this.isThumbsUsed()||this.options.navigMode=="thumbsAndBullets"){this.listThumbs.find(".focus").removeClass("focus")
}this.listBigs.find(".focus").removeClass("focus");
if(this.isThumbsUsed()||this.options.navigMode=="thumbsAndBullets"){this.myThumbsScroll.scrollToElement("li:nth-child("+(this.myBigScroll.currPageX+1)+")",this.scrollDuration);
this.listThumbs.find("li:nth-child("+(this.myBigScroll.currPageX+1)+")").addClass("focus")
}this.listBigs.find(">li:nth-child("+(this.myBigScroll.currPageX+1)+")").addClass("focus")
}if(this.options.displayArrows){this.handleMainArrowsDisplay()
}if(this.options.navigMode=="bullets"||this.options.navigMode=="thumbsAndBullets"){this.updateBullets();
this.updateBulletsArrows()
}this.calculateMainHeight();
if(this.paginationEl){this.paginationEl.html((this.myBigScroll.currPageX+1)+"/"+this.myBigScroll.pagesX.length)
}if(typeof(this.callBackEndScroll)=="function"){this.callBackEndScroll.call()
}if(this.isSwiping){fireEvent("NavigateSlideshow",{type:"Swipe",selector:this.slideshowSelector,isearch_rank:this.itemClicked});
this.isSwiping=false
}};
this.updateBulletsArrows=function(){if(this.currentPosition<this.slideCount-1){this.arrowBulletRight.addClass("arrowBulletRight")
}else{this.arrowBulletRight.removeClass("arrowBulletRight")
}if(this.currentPosition>0){this.arrowBulletLeft.addClass("arrowBulletLeft")
}else{this.arrowBulletLeft.removeClass("arrowBulletLeft")
}};
this.handleMainArrowsDisplay=function(){if(this.currentPosition!=0){this.arrowLeft.fadeIn("slow")
}else{this.arrowLeft.fadeOut("slow")
}if(this.currentPosition!=this.myBigScroll.pagesX.length-1){this.arrowRight.fadeIn("slow")
}else{this.arrowRight.fadeOut("fast")
}};
this.calculateMainHeight=function(){if(this.options.heightMode=="parent"){if(this.isThumbsUsed()||this.options.navigMode=="thumbsAndBullets"){}else{this.listBigsWrapper.height(this.slideshowContainer.outerHeight()+"px")
}}else{}if(this.options.isAnalyticCalledAtInit){this.options.lastPageX=0
}if(this.options.isAnalyticCalled&&this.lastPageX>=0){var a=(this.myBigScroll.currPageX+1);
fireEvent("SlideshowInit")
}this.options.lastPageX=0
};
this.resizeContainer=function(){this.mediaWidth=this.slideshowContainer.width();
this.mediaHeight=this.slideshowContainer.outerHeight();
if(this.isThumbsUsed()||this.options.navigMode=="thumbsAndBullets"){this.thumbsHeight=this.listThumbsWrapper.outerHeight();
this.drawThumbScroller();
this.myThumbsScroll.refresh()
}this.listBigs.find("li img").css("width","");
this.listBigsWrapper.find("li").width(this.mediaWidth);
this.bigsHeight=this.listBigsWrapper.outerHeight();
this.bigsWidth=this.listBigsWrapper.outerWidth();
var a=this;
this.listBigsScroller.css("width",this.listBigs.find(">li").length*this.mediaWidth);
this.myBigScroll.refresh();
this.scrollToSlide(this.currentPosition)
};
this.drawThumbScroller=function(){if(this.listThumbs.css("display")=="none"||this.listThumbsScroller.css("display")=="none"||this.listThumbsWrapper.css("display")=="none"){return
}this.listThumbs.find("li").css("width","");
this.listThumbs.find("li img").css("width","");
var b=this.listThumbs.find("li img");
var a=b.length;
this.thumbsWidth=0;
var c=this;
b.each(function(e){var f=$(this);
var d=Math.round(f.outerWidth());
f.width(d+"px");
f.parent().width(f.width());
d=f.parent().outerWidth();
c.thumbsWidth+=d;
if(e==(a-1)){c.listThumbsScroller.width(c.thumbsWidth+"px");
c.myThumbsScroll.refresh()
}})
};
this.linkThumbsToBig=function(){this.listThumbs.find("li:first-child").addClass("focus");
if(this.options.displayArrows){this.arrowLeft.hide()
}if(this.listThumbsWrapper.attr("data-clickable")=="true"){this.listThumbsWrapper.on("click","li",this.callbackClickThumbs.bind(this))
}};
this.callbackClickThumbs=function(b){var a=$(b.currentTarget);
this.listThumbs.find(".focus").removeClass("focus");
a.addClass("focus");
this.itemClicked=a.prevAll().length;
this.scrollToSlide(this.itemClicked);
fireEvent("NavigateSlideshow",{type:"ThumbsClick",selector:this.slideshowSelector,isearch_rank:this.itemClicked})
};
this.sizeAndPlaceImgs=function(a){a.css("top",parseInt((this.bigsHeight-a.outerHeight())/2)+"px");
a.css("left",parseInt((this.bigsWidth-a.outerWidth())/2)+"px");
this.myBigScroll.refresh()
};
this.buildArchitecture=function(){this.wrapBigList();
if(this.options.navigMode=="thumbs"){this.wrapThumbList()
}else{if(this.options.navigMode=="bullets"){this.buildBulletsNavigation()
}else{if(this.options.navigMode=="thumbsAndBullets"){this.wrapThumbList();
this.buildBulletsNavigation()
}else{if(this.options.navigMode=="pagination"){this.buildPagination()
}}}}if(this.options.displayArrows){this.buildArrows()
}};
this.buildBulletsNavigation=function(){this.buildBullets();
this.buildArrowsBullets()
};
this.buildBullets=function(){this.maxNumberOfBullets=Math.floor((this.slideshowContainer.outerWidth()-this.getElementWidth("arrow")*2)/this.getElementWidth("bulletPoint"));
this.slideCount=this.listBigs.find(">li").length;
this.numberOfBullet=Math.min(this.maxNumberOfBullets,this.slideCount);
this.bulletsWrapper=Slideshow.getBulletNavigationElement(this.numberOfBullet,this);
if(this.options.navigMode=="thumbsAndBullets"){this.bulletsWrapper.addClass("onlyAS")
}this.slideshowContainer.after(this.bulletsWrapper)
};
this.handleBulletClick=function(a){this.scrollToSlide(this.bulletToSlide(a));
fireEvent("NavigateSlideshow",{type:"BulletClick",selector:this.slideshowSelector,isearch_rank:a})
};
this.bulletToSlide=function(a){if(a==this.numberOfBullet-1){return this.slideCount-1
}return Math.round(a*this.slideCount/(this.numberOfBullet))
};
this.slideToBullet=function(a){var b=(this.slideCount<=this.maxNumberOfBullets)?a:Math.min(Math.floor((a+1)*(this.numberOfBullet)/this.slideCount),this.numberOfBullet-1);
return b
};
this.buildArrowsBullets=function(){this.arrowBulletLeft=$("<div/>");
this.arrowBulletLeft.addClass("arrowBulletLeft");
this.arrowBulletLeft.addClass("arrow");
this.bulletsWrapper.prepend(this.arrowBulletLeft);
this.arrowBulletLeft.click(this.leftArrowClick.bind(this));
this.arrowBulletRight=$("<div/>");
this.arrowBulletRight.addClass("arrowBulletRight");
this.arrowBulletRight.addClass("arrow");
this.bulletsWrapper.append(this.arrowBulletRight);
this.arrowBulletRight.click(this.rightArrowClick.bind(this))
};
this.getElementWidth=function(c){var a=$("<div/>");
a.addClass(c);
a.hide();
$("body").append(a);
var b=a.outerWidth();
a.remove();
return b
};
this.scrollToSlide=function(a,b){b=(b==undefined)?500:b;
this.myBigScroll.scrollToElement(this.listBigs.find(">li:nth-child("+(a+1)+")").get(0),b);
this.myBigScroll.currPageX=a
};
this.updateBullets=function(){var a=this.bulletsWrapper.find(".bulletPointDark");
a.removeClass("bulletPointDark");
a.addClass("bulletPointClear");
$(this.bulletsWrapper.find(".bulletPoint").get(this.slideToBullet(this.currentPosition))).addClass("bulletPointDark")
};
this.wrapBigList=function(){this.listBigs=this.slideshowContainer.find(".bigs");
this.listBigsScroller=this.listBigs.wrap("<div/>").parent();
this.listBigsScroller.addClass("scroller scollerBigs");
this.listBigsWrapper=this.listBigsScroller.wrap("<div/>").parent();
this.listBigsWrapper.addClass("wrapper wrapperBigs");
this.listBigsWrapper.wrap("<div/>").parent().addClass("wrapper containerWrapperBigs")
};
this.wrapThumbList=function(){this.listThumbs=this.slideshowContainer.find(".thumbs");
this.listThumbs.find("li img").css("max-width","100%").css("margin","auto").css("width","");
this.listThumbs.find("li").append('<div class="shadow"></div>');
this.listThumbsScroller=this.listThumbs.wrap("<div/>").parent();
this.listThumbsScroller.addClass("scroller scollerThumbs");
this.listThumbsWrapper=this.listThumbsScroller.wrap("<div/>").parent();
this.listThumbsWrapper.addClass("wrapper wrapperThumbs").attr("data-clickable","true");
if(this.options.navigMode=="thumbsAndBullets"){this.listThumbsWrapper.addClass("onlyML")
}};
this.buildArrows=function(){this.arrowRight=new $("<div>").addClass("rightArrowSlideshow "+CONFIGURATION.tagClickClass);
this.arrowRight.attr("id","rightArrowSlideshow");
this.arrowLeft=new $("<div>").addClass("leftArrowSlideshow "+CONFIGURATION.tagClickClass);
this.arrowLeft.attr("id","leftArrowSlideshow");
if(this.options.navigMode=="thumbsAndBullets"){this.arrowRight.addClass("onlyML");
this.arrowLeft.addClass("onlyML")
}$(".containerWrapperBigs").append(this.arrowLeft).append(this.arrowRight);
this.buildMainArrowEvents()
};
this.buildMainArrowEvents=function(){this.arrowLeft.click(this.leftArrowClick.bind(this));
this.arrowRight.click(this.rightArrowClick.bind(this))
};
this.leftArrowClick=function(){this.myBigScroll.scrollToPage("prev");
fireEvent("NavigateSlideshow",{type:"ArrowClick",isearch_rank:this.currentPosition,selector:this.slideshowSelector,arrowType:"Previous"})
};
this.rightArrowClick=function(){this.myBigScroll.scrollToPage("next");
fireEvent("NavigateSlideshow",{type:"ArrowClick",isearch_rank:this.currentPosition,selector:this.slideshowSelector,arrowType:"next"})
};
this.buildPagination=function(){this.paginationEl=new $("<span>").addClass("position");
this.slideshowContainer.append(this.paginationEl)
};
this.initializeScroll=function(){var a=this.options.allowVerticalScroll;
this.myBigScroll=new iScroll(this.listBigsWrapper.get(0),{snap:true,momentum:false,vScroll:false,onBeforeScrollStart:function(b){if(this.absDistX>(this.absDistY+5)||!a){b.preventDefault()
}},hScrollbar:false,onScrollEnd:this.scrollEndCallback.bind(this),onScrollMove:this.onScrollMoveCallback.bind(this)});
if(this.isThumbsUsed()||this.options.navigMode=="thumbsAndBullets"){this.myThumbsScroll=new iScroll(this.listThumbsWrapper.get(0),{snap:true,hScrollbar:false,vScroll:false})
}};
this.reloadS7=function(){if(isBeforeIE10||RESPONSIVE_MANAGER.isAllSmallMode()){this.listBigs.find("img").css("width","1px").each(function(){$(this).attr("data-currentcategory","")
});
loadingImgs(".bigs");
this.listBigs.find("li img").css("width","")
}};
this.onScrollMoveCallback=function(){this.isSwiping=true
};
this.isThumbsUsed=function(){return this.options.navigMode=="thumbs"
}
}Slideshow.getBulletNavigationElement=function(e,d){bulletsWrapper=$("<div/>");
bulletsWrapper.addClass("navigationSlideshow");
for(var c=0;
c<e;
c++){var b=$("<div/>");
b.addClass((c==0)?"bulletPointDark":"bulletPointClear");
b.addClass("bulletPoint");
var a=(function(f,g){return function(){g.handleBulletClick(f)
}
})(c,d);
b.click(a);
bulletsWrapper.append(b)
}return bulletsWrapper
};