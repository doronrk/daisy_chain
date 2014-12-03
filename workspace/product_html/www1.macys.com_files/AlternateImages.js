define(["jquery","underscore","globals","hbsCommonTemplates/features/zoomer/AlternateZoomerImages","logger","imageUtils","mcomAnalytics","pubsub","hbsHelpers"],function(e,t,i,a,s,l,r,n){var o="alt-zoomer-images-image",h="alt-zoomer-images-video",m="alt-zoomer-images-vicon",d;function g(e){if(typeof e!=="undefined"){d=e}}function u(t,i,a){var s,l;s=e("img",i.currentTarget).attr("src");if(typeof this.pubSubEventName!=="undefined"){n.observe(this.pubSubEventName).publish({type:t,imageSrc:s,selectedAltImg:a})}}function c(t,i){var a,s;a=e(i.target.parentNode);s=e("span",a).html();if(typeof this.pubSubEventName!=="undefined"){n.observe(this.pubSubEventName).publish({type:t,videoID:s})}}function I(){var t=false,i=e("#hasProductVideo").val();if(i==="true"){t=e("html").hasClass("tablet")===true?false:true}return t}function p(e){e=e||{};this.altImageGridID=e.altImageGridID;this.altImageGridContainerID=this.altImageGridID+"Container";this.scrollUpID=this.altImageGridID+"ScrollUp";this.scrollDownID=this.altImageGridID+"ScrollDown";this.pubSubEventName=undefined;this.pubSubEventTypes=undefined;this.defaultAltImageIdx=0;this.altViewEvents=e.altViewEvents;this.isEnabled=true;this.altImagesActive=false;this.videoActive=false;this.noVideo=false;this.maxImagesDisplayed=e.maxImagesDisplayed||5}p.prototype.listToAlternateImagesList=function(e,s,l,r){var n,o=i.getValue("props.imageHost");this.originalImageList=e;this.imageList=[];this.imageHeight=l+3;this.altImageHTML=undefined;t.each(e,function(e,t){this.imageList.push({index:t,type:"image",imageURL:o+"/products/"+e+"?wid="+s+"&hei="+l+r})},this);if(!this.noVideo&&I()&&typeof window.videoData!=="undefined"){t.each(window.videoData,function(t,i){this.imageList.push({index:e.length+i,type:"video",imageURL:o+"/products/"+t["thumbnail"],videoId:t["videoid"]})},this)}if(this.imageList.length){n={alternateImageGridParentID:this.altImageGridContainerID,alternateImageGridID:this.altImageGridID,alternateImage:this.imageList};if(this.imageList.length>this.maxImagesDisplayed){n.scrollUp=this.scrollUpID;n.scrollDown=this.scrollDownID}this.altImageHTML=a(n)}return this.altImageHTML};p.prototype.verticalScrollList=function(t){var i,a;i=l.getElement(t);i.append(this.altImageHTML);a=l.getElement(this.altImageGridContainerID);this.defaultAltImage=e("li",a).eq(this.defaultAltImageIdx);this.selectAltImage(this.defaultAltImage)};p.prototype.loadScroller=function(){var e,i;if(this.imageList.length>this.maxImagesDisplayed){this.eyeScroller=new d("#"+this.altImageGridID,{bounce:false,disableMouse:true,disablePointer:true,disableTouch:true,scrollX:false,scrollY:true,scrollbars:false,snap:"li"});i=this.eyeScroller.pages[0].length-this.maxImagesDisplayed;e=t.min([this.defaultAltImageIdx,i]);this.eyeScroller.goToPage(0,e)}};p.prototype.selectAltImage=function(t){var i=l.getElement(this.altImageGridID);e("li",i).removeClass("selected");e(t).addClass("selected")};p.prototype.attachAltImageEvents=function(){var t=l.getElement(this.altImageGridContainerID);if(!t.length){return}e("li",t).on("mouseenter",e.proxy(this.imageMouseEnterHandler,this));e("li",t).on("mouseleave",e.proxy(this.imageMouseLeaveHandler,this));e("li",t).on("click touchstart touchend",e.proxy(this.imageClickHandler,this));e("img.alt-image-scroll",t).on("click",e.proxy(this.scrollerClickHandler,this))};p.prototype.imageMouseEnterHandler=function(t){var i=e(t.currentTarget),a;this.selectAltImage(i);if(this.pubSubEventTypes){switch(i.data("type")){case"image":this.altImagesActive=true;u.apply(this,[this.pubSubEventTypes.HOVER_ON,t]);break;case"video":this.videoActive=true;c.apply(this,[this.pubSubEventTypes.HOVER_ON,t]);break}}a=i.data("index");if(typeof this.altViewEvents==="function"){this.altViewEvents(a)}};p.prototype.imageMouseLeaveHandler=function(t){var i=e(t.currentTarget);this.selectAltImage(this.defaultAltImage);if(this.pubSubEventTypes){if(this.altImagesActive){this.altImagesActive=false;u.apply(this,[this.pubSubEventTypes.HOVER_OFF,t])}else if(this.videoActive){this.videoActive=false;c.apply(this,[this.pubSubEventTypes.HOVER_OFF,t])}}if(typeof this.altViewEvents==="function"){this.altViewEvents(this.defaultAltImageIdx)}};p.prototype.imageClickHandler=function(t){var i=e("#eolCategoryName").text(),a=e("#productId").val(),s=[],l={},n=e(t.currentTarget);this.defaultAltImage=n;this.defaultAltImageIdx=n.data("index");this.selectAltImage(n);if(e("#isTaazProduct").val()==="true"&&this.defaultAltImageIdx>0){if(document.location.href.indexOf("cm_kws")>-1||document.location.href.indexOf("keyword")!==-1){s[6]="Onsite Search - Results";s[7]=a}else{s[6]=i;s[7]=a}l.attributes=s;r.elementTag({elementID:"Model_"+this.defaultAltImageIdx,elementCategory:"Taaz Model Click",attributes:s})}if(this.pubSubEventTypes){switch(n.data("type")){case"image":u.apply(this,[this.pubSubEventTypes.CLICK,t,this.defaultAltImageIdx]);break;case"video":c.apply(this,[this.pubSubEventTypes.CLICK,t,this.defaultAltImageIdx]);break}}if(typeof this.altViewEvents==="function"){this.altViewEvents(this.defaultAltImageIdx)}};p.prototype.scrollerClickHandler=function(e){var t=this.eyeScroller.pages[0].length-this.maxImagesDisplayed;if(e.target.id===this.scrollUpID){this.eyeScroller.prev()}else if(e.target.id===this.scrollDownID&&this.eyeScroller.currentPage.pageY<t){this.eyeScroller.next()}};p.prototype.detachAltImageEvents=function(){var t=l.getElement(this.altImageGridID);e("li",t).off("mouseenter");e("li",t).off("mouseleave");e("li",t).off("click");e("img.alt-image-scroll",t).off("click")};p.prototype.changeImageList=function(i,a,s,l,r){var n=e(".features-zoomer"),o={};if(t.isEqual(i,this.originalImageList)){return}this.detachAltImageEvents();e("#"+this.altImageGridContainerID).remove();this.listToAlternateImagesList(i,s,l,r);if(this.defaultAltImageIdx>=this.imageList.length){this.defaultAltImageIdx=0}if(this.imageList.length>1){this.verticalScrollList(n);this.loadScroller();e(n).prepend(e("#"+this.altImageGridContainerID));this.attachAltImageEvents();o.currentTarget=e("li.selected","#"+this.altImageGridID)}else{o.currentTarget=e(this.altImageHTML).find("li[data-type=image]")}u.apply(this,[this.pubSubEventTypes.CLICK,o,this.defaultAltImageIdx])};p.prototype.getCurrentImageIdx=function(){return this.defaultAltImageIdx};p.prototype.setCurrentImageIdx=function(e){this.defaultAltImageIdx=e};p.prototype.getSelectedImage=function(){return this.imageList[this.defaultAltImageIdx].imageURL};p.prototype.destroy=function(){this.detachAltImageEvents();this.defaultAltImage=null;if(this.eyeScroller){this.eyeScroller.destroy();this.eyeScroller=null}};return{AlternateImages:p,setIScroll:g}});