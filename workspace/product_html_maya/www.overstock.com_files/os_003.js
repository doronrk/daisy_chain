/**
 *	os.Carousel: Abstract Class
 *  Base class for all types of carousels and slide shows 
 */if(typeof os=="undefined")var os={};os.Plug&&os.MediaControl?(os.Carousel=function(a,b){var c={name:"os.Carousel",slideWindowClass:os.$c.SLIDE_WINDOW,slideClass:os.$c.SLIDE,slidePanelClass:os.$c.SLIDE_PANEL,slideShowClass:os.$c.SLIDE_SHOW,controlsClass:os.$c.CONTROLS,controlItemClass:os.$c.CONTROL_TRIGGER,enableClass:os.$c.ENABLED,disabledClass:os.$c.DISABLED,isPaused:!1,LAZY_LOAD_TIMEOUT:1500,onComplete:null};os.Carousel._super.constructor.apply(this,arguments),this.applySettings(c,b)},os.Plug.extend(os.Carousel,os.Plug.Core,{initialize:function(){this._this.isCarousel=!0;var a=this;this.addClass(this.enableClass),this.slideWindow=jQuery("<div></div>").addClass(this.slideWindowClass),this.slides=this.getNumSlides(),this.slidePanel=this.element.find("."+this.slidePanelClass)},getNumSlides:function(){return this.element.find("."+this.slideClass)},getDataTarget:function(a){return null},checkIndex:function(a){return a=parseInt(a)||0,a>this.slides.length-1?0:a},setSlideDisplay:function(){this.slideWindow.insertBefore(this.slidePanel).append(this.slidePanel)},setControls:function(){var a=this;this.bind("mediacontrolclick",function(b){a.handleControlClick(b)})},handleControlClick:function(a){},changePanelByIndex:function(a){var b=this,c=this.checkIndex(a),d=this.getCurrentIndex();if(d===c)return;this.loadImagesForSlide(this.slides[c],function(){b.showPanel(b.slides[c]),b.hidePanel(b.slides[d]),b.setCurrentIndex(c),b.updateInterface(c)})},showPanel:function(a){jQuery(a).fadeIn(this.slideEffectSpeed)},hidePanel:function(a,b){jQuery(a).fadeOut(this.slideEffectSpeed)},doPlay:function(){if(this.AUTO_ID)return;this.startAutoRun(!0)},doPause:function(){this.resumeId&&(clearTimeout(this.resumeId),this.resumeId=null),this.isPaused=!0,this.doStop()},doResume:function(){var a=this;this.resumeId=setTimeout(function(){a.isPaused=!1,a.doPlay()},2e3)},doStop:function(){this.AUTO_ID&&clearInterval(this.AUTO_ID),this.AUTO_ID=null},updateInterface:function(a){a=a||this.getCurrentIndex(),this.controls.toggleSelect(a+1)},startAutoRun:function(a){var b=this;a&&b.changePanelByIndex(b.getCurrentIndex()+1),this.AUTO_ID=setInterval(function(){b.changePanelByIndex(b.getCurrentIndex()+1)},this.slideInterval)},getCurrentIndex:function(){return this.currentIndex},setCurrentIndex:function(a){this.currentIndex=parseInt(a)},lazyLoadImages:function(a,b,c){b=b||function(){},c=c||{};var d=os.Plug.config.SlideShow.DATA_SRC,e=this,f=null,g=!1,h=jQuery(a).find("["+d+"]");if(h.size()>0){f=setTimeout(function(){g=!0,c.after&&c.after instanceof Function&&c.after(),b()},this.LAZY_LOAD_TIMEOUT),c.before&&c.before instanceof Function&&c.before();var i=0;h.each(function(){var a=jQuery(this);if(a.attr(d)){var e=jQuery("<img></img>").on("load",function(a){i++,i===h.size()&&!g&&(f&&clearTimeout(f),c.after&&c.after instanceof Function&&c.after(),b())}).attr({src:a.attr(d),alt:a.text()});a.empty().append(e).removeAttr(d)}})}else b()}}),os.SlideShow=function(a,b){b=b||{};var c=b.type||null;return jQuery(a).each(function(){if(this&&this.isCarousel)return;var a=null;switch(c){case"slider":a=new os.Slider(this,b);break;default:a=new os.Pager(this,b)}a.setContext(this)._create()})},os.Pager=function(a,b){var c={name:"os.SlideShow",slideEffectSpeed:os.Plug.config.SlideShow.SLIDE_EFFECT_SPEED,slideInterval:os.Plug.config.SlideShow.SLIDE_INTERVAL,currentIndex:0,slideWindow:null,slidePanel:null,triggerNodes:{},triggers:null,controls:null,auto:!0,toggleClass:os.$c.TOGGLE,itemClass:"item"};os.Pager._super.constructor.apply(this,arguments),this.applySettings(c,b)},os.Plug.extend(os.Pager,os.Carousel,{initialize:function(){os.Pager._super.initialize.apply(this);var a=this,b=null;this.addClass(this.toggleClass),this.setSlideDisplay(),this.setControls(),b=this.slides[this.getCurrentIndex()],this.loadImagesForSlide(b,function(){a.showPanel(b)}),this.bind("slide-change",function(b){a.handlePanelChange(b)}),this.slideWindow.hover(function(){a.doPause()},function(){a.doResume()}),this.auto&&this.startAutoRun()},setControls:function(){os.Pager._super.setControls.apply(this);var a=this;this.controls=new os.MediaControl;var b=this.slides.length;this.slides.each(function(c){var d={};d.img=this.getAttribute("data-control-img")||null,d.lbl=this.getAttribute("data-label")||c+1,a.controls.addControlItem(d.lbl,d,{"data-index":c}),c+1===b&&(a.slideWindow.before(a.controls),a.updateInterface())})},handlePanelChange:function(a){switch(a.type){case"slide-change":this.changePanelByIndex(a.indexId)}},handleControlClick:function(a){var b=a.controlTarget,c=null;while(b.nodeName.toLowerCase()!=="a"&&b.parentNode){if(b===this._this)return;b=b.parentNode}c=b.getAttribute("data-index"),c&&(a.preventDefault(),this.doStop(),this.trigger({trigger:b,type:"slide-change",indexId:c,request:{url:this.getDataTarget(c)}}))},loadImagesForSlide:function(a,b){this.lazyLoadImages(a,b)}}),os.Slider=function(a,b){defaults={currentIndex:0,maxIndex:null,itemsRemainder:null,minColumnWidth:null,colBase:null,onBeforeSlideChange:null,lazyLoadSlides:!1,getLazyLoadStatus:function(){return 0}},os.Slider._super.constructor.apply(this,arguments),this.applySettings(defaults,b)},os.Plug.extend(os.Slider,os.Carousel,{initialize:function(){os.Slider._super.initialize.apply(this);var a=this,b;this.setSlideDisplay(),this.setControls(),this.adaptProductLayout(),this.sliderWinMargin=parseInt(this.slideWindow.css("margin-left")),jQuery(window).resize(function(){a.adaptProductLayout()}),this.bind("slide-change",function(b){a.handleSlideChange(b)}),this.bind("addSlide",function(b){a.addSlide(b)}),this.bind("changePanel",function(b,c){a.changePanel(c)}),this.bind("data-loaded",function(b,c){a.dataLoaded(c)}),jQuery(document).bind("update-tab-interface",function(){a.adaptProductLayout()}),this.onComplete&&typeof this.onComplete=="function"&&this.onComplete(this)},changePanel:function(a){var b=a.panel,c=this.currentIndex,d=this.maxIndex;isNaN(b)&&(b=b==="last"?d:c),d<b&&(b=d),b!==c&&(this.changeSlide(b),this.setCurrentIndex(b))},addSlide:function(){this.slides=this.getNumSlides(),this.currentIndex===-1&&(this.currentIndex=0),this.adaptProductLayout()},setControls:function(){os.Slider._super.setControls.apply(this),this.controls=new os.MediaControl,this.controls.addControlItem("previous",'<i class="icon"></i>Previous',{className:"left"}),this.controls.addControlItem("next",'<i class="icon"></i>Next',{className:"right"}),this.slideWindow.before(this.controls),this.updateInterface()},setSlideDisplay:function(){os.Slider._super.setSlideDisplay.apply(this)},setPanelWidth:function(a){var b=this.slides.length,c=b/a,d=100*c,e=d/c/b,f=this.lazyLoadSlides;if(f)var g=this.lazyLoadState||{};this.itemsRemainder=b%a,this.numItemsInView=Math.round(b/c),this.slides.css({width:e+"%"}),this.slidePanel.css({width:d+"%"}),this.setMaxIndex(c,this.itemsRemainder,g),this.currentIndex===this.maxIndex&&b>1&&this.slides.filter(":last").addClass("carousel-last"),this.currentIndex>=1&&this.slides.filter("li:nth-child("+Math.round(c)+"n)").addClass("margin-fix");if(this.currentIndex>this.maxIndex){var h=this.maxIndex;this.setCurrentIndex(h),this.changeSlide(h)}this.updateInterface()},handleControlClick:function(a){var b=a.controlTarget,c=null;while(b.nodeName.toLowerCase()!=="a"&&b.parentNode){if(b===this._this)return;b=b.parentNode}if(jQuery(b).hasClass("disabled"))return;action=b.getAttribute("data-action"),action&&(a.preventDefault(),this.trigger({trigger:b,type:"slide-change",action:action}))},handleSlideChange:function(a){switch(a.action){case"next":this.nextSlide();break;case"previous":this.previousSlide()}},changeSlide:function(a){var b=this;if(a>this.maxIndex||a<0)return;if(!this.itemsRemainder&&a>this.maxIndex)return;this.slidePanel.animate({marginLeft:-(a*100)+"%"},"swing",function(){b.updateInterface()})},nextSlide:function(){var a=this,b=this.currentIndex+1,c=this.onBeforeSlideChange;this.setCurrentIndex(b),c&&typeof c=="function"&&c({action:"next",context:this,index:b});if(this.isDataLoading)return;this.loadImagesForSlide(b,{onComplete:function(){a.changeSlide(b)}})},previousSlide:function(){var a=this,b=this.currentIndex-1,c=this.onBeforeSlideChange;this.setCurrentIndex(b),c&&typeof c=="function"&&c({action:"previous",context:this,index:b}),this.loadImagesForSlide(b,{onComplete:function(){a.changeSlide(b)}})},loadImagesForSlide:function(){var a=arguments,b=this,c=null,d=null,e=[],f=null,g={};this.getObjectClass(a[0])==="Number"?(c=a[0],d=a[1]):this.getObjectClass(a[0])==="Object"?(c=this.currentIndex,d=a[0]):(c=this.currentIndex,d={}),d.interfaceEnabled=d.interfaceEnabled||!1,f=d.onComplete,d.interfaceEnabled||(g={before:function(){b.toggleInterface(!1)},after:function(){b.toggleInterface(!0)}});for(var h=0,i=this.numItemsInView;h<i;h++){var j=parseInt(this.returnWithinRange(this.currentIndex*i+(c>=this.currentIndex?+h:-h),0,b.slides.length));this.slides[j]!==e[e.length]&&e.push(this.slides[j])}this.lazyLoadImages(e,f,g)},toggleInterface:function(a){var b=a?"enable":"disable",c=!0,d=this.controls.controlItems;a?(this.slidePanel.fadeTo(200,1),c&&this.slideWindow.removeClass("loading").find(".loading-overlay").remove()):(this.slidePanel.fadeTo(0,.5),c&&this.slideWindow.addClass("loading").append('<div class="loading-overlay"></div>')),this.lazyLoadSlides?this.updateInterface():(d.next[b](),d.previous[b]())},setCurrentIndex:function(a){a<0&&(a=0),a>=this.maxIndex&&(a=this.maxIndex),!this.itemsRemainder&&a>=this.maxIndex&&(a=this.maxIndex),this.currentIndex=a},setMaxIndex:function(a,b,c){c?c.allSlidesLoaded?b===0?this.maxIndex=Math.floor(a-1):this.maxIndex=Math.floor(a):this.maxIndex=Math.floor(a):b===0?this.maxIndex=Math.floor(a-1):this.maxIndex=Math.floor(a)},updateInterface:function(){var a=this.controls.controlItems,b={};this.lazyLoadSlides&&(this.getLazyLoadStatus(),b=this.lazyLoadState||{}),this.currentIndex===0&&!b.prev?a.previous.disable():a.previous.enable(),this.currentIndex>=this.maxIndex||!this.itemsRemainder&&this.currentIndex>=this.maxIndex||this.lazyLoadSlides&&!b.allSlidesLoaded&&!b.next?a.next.disable():a.next.enable(),this.currentIndex===-1&&a.previous.disable()},maxProductsViewable:null,setMaxProductsViewable:function(a){this.maxProductsViewable=parseInt(a)},adaptProductLayout:function(){var a=this.slideWindow.width(),b=this.colBase||300,c=this.minColumnWidth||150,d=0;while(b<3600){d++;if(a<=b+c&&a>b){this.setPanelWidth(d),this.setMaxProductsViewable(d);break}b+=c}this.loadImagesForSlide({interfaceEnabled:!0})}})):(os.Carousel=function(){},os.SlideShow=function(){});