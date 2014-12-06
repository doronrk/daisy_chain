function SliderResponsive(){this.listSelector;
this.iScrollList;
this.containerWidth;
this.wrapperWidth;
this.currentIndexSlide;
this.maxScrollPosition;
this.slideCount;
this.showArrows=true;
this.showOverlays=true;
this.arrowLeft;
this.arrowRight;
this.overlayLeft;
this.overlayRight;
this.scrollDuration=500;
this.fadeAnimDuration=300;
this.isManualScroll=false;
this.isScrolling=false;
this.specificClass;
this.responsiveMode=false;
this.isSwiping=false;
this.initSlider=function(b,a){this.listSelector=b;
this.listElement=$(this.listSelector);
this.listElementWrapper=this.listElement.parent();
this.listElement.addClass("sliderRespContainer");
this.listElementWrapper.addClass("sliderRespWrapper");
if(a){this.responsiveMode=a.responsiveMode;
this.specificClass=a.specificClass;
this.listElement.addClass(this.specificClass);
this.listElementWrapper.addClass(this.specificClass)
}};
this.buildSlider=function(b,a){this.initSlider(b,a);
if(this.listElement.length>0){this.buildArchitecture();
this.buildArrows();
this.buildOverlays();
this.updateNavigationDisplay();
this.initEvents()
}};
this.refreshSlider=function(b,a){this.initSlider(b,a);
this.buildArchitecture();
this.iScrollList.refresh();
this.overlayLeft.height(this.liOuterWidth);
this.overlayRight.height(this.liOuterWidth);
this.updateNavigationDisplay();
this.initEvents()
};
this.buildArchitecture=function(){this.liElements=this.listElement.find("li");
this.slideCount=this.liElements.length;
this.setSliderItemsSize();
this.updateSliderItemsSize();
this.wrapperWidth=this.listElementWrapper.width();
this.listElement.width(this.slideCount*this.liOuterWidth);
this.containerWidth=this.listElement.width();
this.iScrollList=new iScroll(this.listElementWrapper.attr("id"),{snap:"li",vScrollbar:false,hScrollbar:false,vScroll:false,onBeforeScrollStart:function(a){if(this.absDistX>(this.absDistY+5)){a.preventDefault()
}},onScrollEnd:this.callbackAfterScroll.bind(this),onScrollMove:this.onScrollMoveCallback.bind(this)});
this.currentIndexSlide=this.getCurrentSlide();
this.maxScrollPosition=this.getMaxScrollPosition()
};
this.getVisibleSlideCount=function(){if(RESPONSIVE_MANAGER.isXtraSmallMode()){return 1
}else{if(RESPONSIVE_MANAGER.isSmallMode()){return 2
}else{return 3
}}};
this.setSliderItemsSize=function(){var a=this.getVisibleSlideCount();
if(this.responsiveMode){this.liOuterWidth=this.listElementWrapper.width()/a
}else{this.liOuterWidth=this.liElements.first().outerWidth(true)
}};
this.updateSliderItemsSize=function(){if(this.responsiveMode){this.liElements.each(this.updateLiWidth.bind(this))
}};
this.updateLiWidth=function(a,b){$(b).width(this.liOuterWidth)
};
this.buildArrows=function(){if(this.showArrows){this.arrowRight=$('<div class="arrowRight navigationBtn"></div>');
this.arrowLeft=$('<div class="arrowLeft navigationBtn"></div>');
var a=this;
this.arrowRight.click(this.handleArrowRightClick.bind(this));
this.listElementWrapper.append(this.arrowRight);
this.arrowLeft.click(this.handleArrowLeftClick.bind(this));
this.listElementWrapper.append(this.arrowLeft)
}};
this.updateNavigationDisplay=function(){if(this.containerWidth<=this.wrapperWidth){this.arrowLeft.fadeOut(this.fadeAnimDuration);
this.overlayLeft.fadeOut(this.fadeAnimDuration);
this.arrowRight.fadeOut(this.fadeAnimDuration);
this.overlayRight.fadeOut(this.fadeAnimDuration)
}else{if(this.currentIndexSlide==0){this.arrowLeft.fadeOut(this.fadeAnimDuration);
this.overlayLeft.fadeOut(this.fadeAnimDuration)
}if(this.currentIndexSlide==this.maxScrollPosition){this.arrowRight.fadeOut(this.fadeAnimDuration);
this.overlayRight.fadeOut(this.fadeAnimDuration)
}if(this.currentIndexSlide>0){this.arrowLeft.fadeIn(this.fadeAnimDuration);
this.overlayLeft.fadeIn(this.fadeAnimDuration)
}if(this.currentIndexSlide<this.maxScrollPosition){this.arrowRight.fadeIn(this.fadeAnimDuration);
this.overlayRight.fadeIn(this.fadeAnimDuration)
}}};
this.buildOverlays=function(){if(!this.showOverlays){return
}this.overlayLeft=$('<div class="overlayLeft shadowOverlay"></div>');
this.overlayRight=$('<div class="overlayRight shadowOverlay"></div>');
this.overlayLeft.height(this.liOuterWidth);
this.overlayRight.height(this.liOuterWidth);
this.listElementWrapper.append(this.overlayLeft);
this.listElementWrapper.append(this.overlayRight)
};
this.handleArrowRightClick=function(){this.isSwiping=false;
this.isScrolling=true;
this.scrollToNextSlide();
fireEvent("NavigateSlideshow",{type:"ArrowClick",isearch_rank:this.currentIndexSlide,selector:this.listSelector,arrowType:"next"})
};
this.handleArrowLeftClick=function(){this.isSwiping=false;
this.isScrolling=true;
this.scrollToPrevSlide();
fireEvent("NavigateSlideshow",{type:"ArrowClick",isearch_rank:this.currentIndexSlide,selector:this.listSelector,arrowType:"previous"})
};
this.initEvents=function(){this.listElementWrapper.scroll(this.callbackAfterScroll.bind(this))
};
this.callbackAfterScroll=function(){if(this.isSwiping){this.currentIndexSlide=this.getCurrentSlide();
fireEvent("NavigateSlideshow",{type:"Swipe",selector:this.listSelector,isearch_rank:this.currentIndexSlide})
}this.updateNavigationDisplay();
this.isSwiping=false;
this.isScrolling=false
};
this.onScrollMoveCallback=function(){this.isSwiping=true
};
this.scrollToSlide=function(a,b){this.isManualScroll=true;
if(b==undefined){b=this.scrollDuration
}this.iScrollList.scrollTo(-a*this.liOuterWidth,0,b)
};
this.scrollToPrevSlide=function(){if(this.currentIndexSlide>0){this.scrollToSlide(this.currentIndexSlide-1);
this.currentIndexSlide--
}this.updateNavigationDisplay()
};
this.scrollToNextSlide=function(){if(this.currentIndexSlide<this.maxScrollPosition){this.scrollToSlide(this.currentIndexSlide+1);
this.currentIndexSlide++
}this.updateNavigationDisplay()
};
this.getCurrentSlide=function(){if(this.responsiveMode){return Math.round(Math.abs(this.iScrollList.x/this.liOuterWidth))
}else{return Math.ceil(Math.abs(Math.round(this.iScrollList.x)/this.liOuterWidth))
}};
this.getMaxScrollPosition=function(){if(this.responsiveMode){return Math.round(Math.abs(this.iScrollList.maxScrollX/this.liOuterWidth))
}else{return Math.ceil(Math.abs(this.iScrollList.maxScrollX/this.liOuterWidth))
}}
};