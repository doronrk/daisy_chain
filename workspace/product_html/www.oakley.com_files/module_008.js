!function(a){a.moduleCarouselOcp=function(b,c){var d,e=a(b),f=(a.extend({},a.moduleCarouselOcp.defaults,c),null),g={},h=0;a.data(b,"moduleCarouselOcp",e);var i=e.find(".products").html();g={init:function(){g.runSlider(),e.runSlider=g.runSlider,g.setOcpListeners()},runSlider:function(){e.find(".products").html(i);var b=e.find(".flexslider"),c={};c[a.mediaTypes.DESKTOP]=4,c[a.mediaTypes.TABLET]=3,c[a.mediaTypes.MOBILE]=2,d=e.find(".module-swipe-dots"),b.flexslider({animation:"slide",itemWidth:100,slideshow:!1,controlNav:!1,animationLoop:!1,itemMargin:0,minItems:c[a.currentMedia],maxItems:c[a.currentMedia],keyboard:!1,start:function(b){f=b,d.moduleSwipeDots({numDots:f.pagingCount}),4==c[a.currentMedia]&&f.pagingCount>1&&e.find(".flex-direction-nav").show(),0==h&&(e.find(".slides").css("display","block"),e.find(".dots").css("display","block"),e.find(".wrapper").show("scale",{},300),h=1)},after:function(a){e.triggerHandler("afterSlide",[a.currentSlide]),d.moduleSwipeDots("selectIndex",a.currentSlide)}}),f=b.data("flexslider")},setOcpListeners:function(){},launchIframe:function(b){a.ocpModules.m49.modulePDHero("launchIframe",b)}},a(window).on("mobileMedia tabletMedia desktopMedia",function(){g.runSlider()}),e.getItemsNum=function(){return f.pagingCount},e.next=function(){f.flexAnimate(f.getTarget("next"))},e.prev=function(){f.flexAnimate(f.getTarget("prev"))},g.init()};var b={init:function(b){return this.each(function(){void 0==a(this).data("moduleCarouselOcp")&&new a.moduleCarouselOcp(this,b)})},refresh:function(b){return this.each(function(){void 0==a(this).data("moduleCarouselOcp")?new a.moduleCarouselOcp(this,b):a(this).data("moduleCarouselOcp").runSlider()})},countItems:function(){return a(this).data("moduleCarouselOcp").getItemsNum()},next:function(){return this.each(function(){var b=a(this).data("moduleCarouselOcp");b.next()})},prev:function(){return this.each(function(){var b=a(this).data("moduleCarouselOcp");b.prev()})}};a.fn.moduleCarouselOcp=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.moduleCarouselOcp"):b.init.apply(this,arguments)},a(window).resize(function(){if(a.currentMedia==a.mediaTypes.DESKTOP||"desktopMedia"==a("#CurrentMediaOnPDP").val()){var b=a("#CurrentMediaOnPDP").val();"desktopMedia"!=b||a.currentMedia!=a.mediaTypes.MOBILE&&a.currentMedia!=a.mediaTypes.TABLET?a.currentMedia!=a.mediaTypes.DESKTOP||"tabletMedia"!=b&&"mobileMedia"!=b||hideVideoIcon():divLiConfigForApparelMobTab()}a("#CurrentMediaOnPDP").val(a.currentMedia)})}(jQuery);