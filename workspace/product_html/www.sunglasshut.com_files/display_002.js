$BV.Internal.define("commentDisplay",[window,document],["exports"],function(c,a,b){b.commentSubmittedMessage=function(h,e,g){var f=h.displayPrefix;var d=h.cookiePrefix;var i=new RegExp(d+"-commented-");g(function(k){for(var j in k){if(i.test(j)){var l=j.match(/\d+/i);e.find("#"+f+"CommentSubmittedMessageID_"+l).removeClass("BVDIHidden");var m="BVDI_COSubmittedSubject";if(/^s-commented/i.test(j)){e.find("#BVSYDisplayContentStoryID_"+l).addClass(m);e.find("#BVSYSStory"+l).addClass(m)}else{if(/^r-commented/i.test(j)){e.find("#BVRRDisplayContentReviewID_"+l).addClass(m)}else{$BV.log("commentDisplay initialization failed. Could not apply BVDI_COSubmittedSubject additional css.")}}}}})};b.onPageLoad=function(g,f,d,e){if(g==="commentSubmittedMessage"){b.commentSubmittedMessage(f,d,e)}}});
$BV.Internal.define("trustMark",[window,document],["exports","jquery.core","analyticsHooks"],function(k,r,e,v,w){var d,t,c,j,g;var b=false;var s=null;var h=false;if(typeof r.hidden!=="undefined"){s="hidden"}else{if(typeof r.mozHidden!=="undefined"){s="mozHidden"}else{if(typeof r.msHidden!=="undefined"){s="msHidden"}else{if(typeof r.webkitHidden!=="undefined"){s="webkitHidden"}}}}function i(){if(s&&r[s]){return false}var A=v("#"+d).offset();if(!A){return false}var C=v(k),z=C.scrollTop(),D=C.scrollLeft(),B=((A.top>z)&&(A.top<(z+C.height()))),y=((A.left>D)&&(A.left<(D+C.width())));return B&&y}function n(y){d=y;if(!c){c=(new Date()).getTime();f()}}function x(y){n(y);bvOpenDivs(d);v("#"+d).addClass("BVRRTrustMarkDiv")}function f(){if(i()){var y={type:"Shown",name:"TrustMarkVisible",productId:j,brand:g};k._bvaq.push(["trackEvent","Feature",y])}else{if(((new Date()).getTime()-c)<900000){t=setTimeout(function(){f()},1000)}}}function q(y,A,z){b=true;t=setTimeout(function(){l(y,A,z)},300)}function o(y){b=false;t=setTimeout(function(){a(y)},300)}function m(){b=true;p()}function p(){if(t){clearTimeout(t)}}function l(y,A,z){u(A,z);if(!h){w.fireActionEvent(y,null,null,false,"TrustMarkViewInfo");h=true}}function u(A,y){if(b){if(!y){bvOpenDivs(A)}else{var z=v("#"+A+" > .BVRRTrustMarkInfoCore");var B=v("#"+A+" > .BVRRTrustMarkInfoPointer");if(z.css("display")!="block"){B.stop(true,true).slideDown({duration:"fast",queue:false});z.stop(true,true).slideDown({duration:"fast",queue:false})}}}}function a(z){if(!b){var y=v("#"+z+" > .BVRRTrustMarkInfoCore");var A=v("#"+z+" > .BVRRTrustMarkInfoPointer");if(y.css("display")=="block"){y.stop(true,true).slideUp({duration:"fast",queue:false});A.stop(true,true).slideUp({duration:"fast",queue:false})}}}e.onPageLoad=function(A,y){var z=y.target;j=y.tmProductId;g=y.tmBrand;if(A==="initQuickTake"){n(z)}else{if(A==="initContentSection"){x(z)}}};v.extend(e,{onMouseOver:q,onMouseOut:o,infoMouseOver:m});k.BVTrustMark=e});
$BV.Internal.define("rr/analyticsHooksRR",[window],["jquery.core","analyticsHooks"],function(a,b){b.extend(BVAnalyticsCustomizer,{eventSocialConnectRR:function(c,e){c.eName=BVAnalyticsData.E_NAME.socialConnect;var d=e.substr(e.lastIndexOf("_")+1);d=d.substr(0,1).toUpperCase()+d.substr(1);c.socialMedium=d},eventTargetReview:function(c){if(!c.eventTarget){c.eventTarget=BVAnalyticsData.EVENT_TARGET.review}}});a.BVRRAnalyticsCustomizers=[new BVAnalyticsCustomizer("SocialBookmark.*",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.support)),new BVAnalyticsCustomizer("SocialBookmark.*",BVAnalyticsCustomizer.linkDestinationLocationExternal),new BVAnalyticsCustomizer("Inappropriate",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.support)),new BVAnalyticsCustomizer("Inappropriate",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.inappropriate)),new BVAnalyticsCustomizer(".*Feedback",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.support)),new BVAnalyticsCustomizer(".*Feedback",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.associate)),new BVAnalyticsCustomizer("Review_Display_.*Search.*",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.search)),new BVAnalyticsCustomizer("SocialBookmark.*",BVAnalyticsCustomizer.eventShoutit),new BVAnalyticsCustomizer("SocialConnect",BVAnalyticsCustomizer.eventSocialConnectRR),new BVAnalyticsCustomizer("FacebookLike.*",BVAnalyticsCustomizer.eventFacebookLike),new BVAnalyticsCustomizer("FacebookSend.*",BVAnalyticsCustomizer.eventFacebookSend),new BVAnalyticsCustomizer("AnswerThisQ",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.write)),new BVAnalyticsCustomizer("AnswerThisQ",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.write)),new BVAnalyticsCustomizer("AnswerThisQ",BVAnalyticsCustomizer.setEventTargetProperty(BVAnalyticsData.EVENT_TARGET.answer)),new BVAnalyticsCustomizer("WriteReview",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.write)),new BVAnalyticsCustomizer("WriteReview",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.write)),new BVAnalyticsCustomizer("PostComment",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.write)),new BVAnalyticsCustomizer("PostComment",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.write)),new BVAnalyticsCustomizer("PostComment",BVAnalyticsCustomizer.setEventTargetProperty(BVAnalyticsData.EVENT_TARGET.comment)),new BVAnalyticsCustomizer("ReturnToProduct",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.read)),new BVAnalyticsCustomizer("Display_Sort",BVAnalyticsCustomizer.eventSort),new BVAnalyticsCustomizer("(Prev|Next)?Page(Number)?",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.paginate)),new BVAnalyticsCustomizer("NextQuestions",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.paginate)),new BVAnalyticsCustomizer("NextQuestions",BVAnalyticsCustomizer.setEventTargetProperty(BVAnalyticsData.EVENT_TARGET.question)),new BVAnalyticsCustomizer("ProductLink.*",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.productLink)),new BVAnalyticsCustomizer(".*",BVAnalyticsCustomizer.socialAndButtonElementsDispatcher),new BVAnalyticsCustomizer(".*",BVAnalyticsCustomizer.eventTargetReview)]});
$BV.Internal.modify("rr/analyticsHooksRR","rr/5968/analyticsInternalHooksRR",[window],["rr/analyticsHooksRR"],function(a){a.BVRRAnalyticsCustomContainers=function(){return $bv(" #bv-tabs a[href*='pdpRatings'] ")}});
$BV.Internal.define("rr/analyticsInternalLegacyHooksRR",[window],["jquery.core","analyticsHooks"],function(a,b){a.BVRRInternalLegacyCallback=function(d){var g=a.BVAnalyticsData;if(d.bvProduct!==g.PRODUCT.prr){return}var f=b.isFunction(a.BVRRInternalUseOnlyCallback);var e=d.leafCategoryId||d.categoryId||"";if(d.sortType&&d.sortDirection){if(f){a.BVRRInternalUseOnlyCallback({interactionType:"sort",productId:d.productId,categoryId:e,sortType:d.sortType,sortDirection:d.sortDirection})}}else{if(d.eventSource===g.EVENT_SOURCE.display){if(d.eType==g.E_TYPE.read){if(f){a.BVRRInternalUseOnlyCallback({interactionType:"display",numReviews:d.attributes.numReviews,productId:d.productId,categoryId:e,avgRating:d.attributes.avgRating,ratingsOnlyReviewCount:d.attributes.numRatingsOnlyReviews,recommendedPercentage:d.attributes.percentRecommend})}if(b.isFunction(a.ratingsDisplayed)){a.ratingsDisplayed(d.attributes.numReviews,d.attributes.avgRating,d.attributes.numRatingsOnlyReviews,d.attributes.percentRecommend,d.productId)}if(d.attributes.numReviews>0){if(b.isFunction(a.showReviewMarkup)){a.showReviewMarkup()}}}else{if(d.eType==g.E_TYPE.write||d.eType==g.E_TYPE.support){if(f){var c={interactionType:d.interactionType,productId:d.productId,categoryId:e};if(d.interactionOverallRating){c.overallRating=d.interactionOverallRating}a.BVRRInternalUseOnlyCallback(c)}if(d.pageName&&b.isFunction(a.pageChanged)){if(d.pageName=="ReviewSubmit"){a.pageChanged(d.pageName,"")}else{if(d.pageChangedStatus){a.pageChanged(d.pageName,d.pageChangedStatus)}else{a.pageChanged(d.pageName,d.pageStatus||"")}}}}}}}}});
$BV.Internal.define("rr/contentDisplayRR",[window],["analyticsHooks","domUtils","contentDisplay","animationQueueing"],function(b,a){var c={};b.bvHistogramMouseover=function(g,d,f,e){if(c[d]){clearTimeout(c[d])}bvExpandDivWithIEControlsFrame(f,"BVRRRatingsHistogramButtonIEControlsFrame",e);bvFocus(f);a.fireActionEvent(g)};b.bvHistogramMouseout=function(d,f,e){bvAnimationEventQueue.pushAnimationEvent(function(){c[d]=setTimeout(function(){bvCloseDivs(f,"BVRRRatingsHistogramButtonIEControlsFrame")},e)},arguments)}});
$BV.Internal.define("rr/injection.rr.replacements",[],["exports","jquery.core","injection.shared.replacements","domUtils"],function(a,c,b){c.extend(a,b,{determineTargetFrame:function(){var d=this.getComponent("BVFrame");return d?d.id:"BVFrame"},determineReturnUrlPrr:function(e,d){var g=this.determineReturnUrl(false,d);if(g&&!g.match(/^https?\:\/\//)){if(e.returnURLFixedValue){g=e.returnURLFixedValue}else{var f=this.targetWindow().location;if(g[0]!="/"){if(e.returnURLForceRelativeToRoot){g="/"+g}else{g=f.pathname.match(/(.*\/)/)[0]+g}}g=f.protocol+"//"+f.host+g}}return encodeURIComponent(g)},determineSubmissionUrl:function(e){var d;if(e){d=e.submissionContainerUrl}else{d=this.getClientDivData("ContainerPageURL")}if(!d&&e&&e.allowSamePageSubmission){d=this.targetWindow().location.href}return d?encodeURIComponent(this.stripAnchors(d)):null},determineLoginParameters:function(d){var e;if(!d){e=this.getClientDivData("LoginParameters")}return e?encodeURIComponent(e):null}})});
$BV.Internal.define("rr/injection.rr",[],["exports","jquery.core","injection","rr/injection.rr.replacements","requester"],function(d,e,b,a,c){e.extend(d,b,a,{getTargetFrame:function(){return this.determineTargetFrame()},getComponent:function(g){var i=this.targetWindow(),h=this.productId(),f=this.divOverrides(g);if(!f&&h&&!this.apiConfig()){f=i.document.getElementById(g+"_"+h)}if(!f){f=i.document.getElementById(g)}return f},getReplacements:function(h,f){var k=[];if(!f){k.push({pattern:/__BVLOGINPARAMETERS__/g,replacement:this.determineLoginParameters(f)})}k.push({pattern:/__CONFIGKEY__/g,replacement:f?c.getConfigKey(f):""});k.push({pattern:/__TARGETFRAME__/g,replacement:this.determineTargetFrame()});k.push({pattern:/__RETURN__/g,replacement:this.determineReturnUrlPrr(h,f)});k.push({pattern:/__BVSUBMISSIONURL__/g,replacement:this.determineSubmissionUrl(f)});k.push({pattern:/__BVSUBMISSIONPARAMETERS__/g,replacement:this.determineSubmissionParameters(f)});k.push({pattern:/__USERID__|__ALLOWANONYMOUS__/g,replacement:this.determineCustomerId(f)});var j=[];for(var g=0;g<k.length;++g){if(k[g].replacement!=null){j.push(k[g])}}return j},injectScriptIfNecessary:function(h,l){var k=window.parent,j=k.document,g;function i(){if(k.$BV){return true}var n=j.getElementsByTagName("script");for(var m=0;m<n.length;m++){if(n[m].getAttribute("src")===h){return true}}return false}function f(){if(k.$BV){l&&l()}else{g=g?g*2:10;k.setTimeout(f,g)}}k.setTimeout(function(){if(!i()){var m=j.createElement("script");m.type="text/javascript";m.src=h;j.getElementsByTagName("head")[0].appendChild(m)}f()},0)},getSviRedirectUrl:function(h,n,g){var i,l,j;if(h.length==5){i=h[1];l=h[3];j=h[4]}else{if(h.length>5){var f=(h.length-5);i=h[f+1];l=h[f+3];j=h[f+4]}else{return null}}var m;if(i=="reviews"){if(g){m=".djs?format=embeddedhtml"}else{m=".htm?format=embedded"}}else{if(i=="reviewsPage"){if(g){m=".djs?format=bulkembeddedhtml"}else{return null}}else{return null}}var k=n+j+"/reviews"+m;if(l>1){k+="&page="+l}return k}})});
$BV.Internal.define("feedbackStyle1",[],["exports","jquery.core"],function(a,b){b.extend(a,{inactivateYesNo:function(d,c,e){b(d+" "+c+"FeedbackLinkYes").addClass(e);b(d+" "+c+"FeedbackLinkNo").addClass(e);b(d+" "+c+"FeedbackLinkInactiveYes").removeClass(e);b(d+" "+c+"FeedbackLinkInactiveNo").removeClass(e)},inactivateInappropriate:function(d,c,e){b(d+" "+c+"FeedbackLinkInappropriate").addClass(e);b(d+" "+c+"FeedbackLinkInactiveInappropriate").removeClass(e)},showMessage:function(e,c,f,d){b(e+" "+c+"FeedbackMessage").removeClass(f).html(d)}})});
$BV.Internal.define("rr/feedbackStyle1RR",[],["exports","feedbackStyle1","cookies"],function(b,e,d){function a(f,i,h,g){g(function(k){for(var l in k){var j=c().exec(l);if(j){b.initFeedback(f,j[1],j[2],k[l],i,h)}}})}function c(){return/^r(hf|if)_(\d+)$/}b.initFeedback=function(f,g,k,j,i,h){if("hf"==g){b.initHelpfulnessFeedback(k,j,i)}else{b.initInappropriateFeedback(k,j,h)}};b.initHelpfulnessFeedback=function(h,g,f){if(g!="-1"){e.showMessage("#BVRRDisplayContentReviewID_"+h,".BVRRReview","BVRRHidden",f)}e.inactivateYesNo("#BVRRDisplayContentReviewID_"+h,".BVRRReview","BVRRHidden")};b.initInappropriateFeedback=function(h,g,f){if(g!="-1"){e.showMessage("#BVRRDisplayContentReviewID_"+h,".BVRRReview","BVRRHidden",f)}e.inactivateInappropriate("#BVRRDisplayContentReviewID_"+h,".BVRRReview","BVRRHidden")};b.onPageLoad=function(i,h,f,g){if(i==="feedbackStatus"){a(f,h.helpfulnessMessage,h.inappropriateMessage,g)}}});
$BV.Internal.define("alignments",[window,document],["exports","jquery.core"],function(c,a,d,g){function f(){var i=0;var h=g("body");if(h.css("position")=="relative"&&(h.offset().left==0||g.browser.msie)){var j=h.css("left");if(j=="auto"||j=="50%"||(g.browser.mozilla&&j=="0px")){if("getBoundingClientRect" in h[0]){i=-h[0].getBoundingClientRect().left}else{i=-g(c).width()/2+h.width()/2}}else{if(j!=null&&j.length>2&&j.substring(j.length-2,j.length)=="px"){i=-j.substring(0,j.length-2);var k=h.css("marginLeft");if(k!=null&&k.length>2&&k.substring(k.length-2,k.length)=="px"){i-=k.substring(0,k.length-2)}}}}return i}function e(k,j){var i=a.getElementById(j);if(i){var l=g(i);var h=f();g.each(k,function(){var m=g("#"+this);m.css("left",l.offset().left+l.width()/2-m[0].offsetWidth/2+h)})}return k}function b(k,j,h){var l=g("#"+h).parents("#"+j);if(l.length){var i=f();g.each(k,function(){var m=g("#"+this);m.css("left",l.offset().left+l.width()/2-m[0].offsetWidth/2+i)})}return k}g.extend(d,{alignByWidth:e,alignByWidthOfParent:b})});
$BV.Internal.define("popupDisplay",[window,document],["exports","jquery.core","alignments","browserVersion","wrapperDivs","domUtils"],function(d,g,e,c,j,f,h){var i={};d.bvClosePopups=function(){for(var k in i){b(k)}if(d.bvCloseGalleries){d.bvCloseGalleries()}};function b(k){if(i[k]){c.each(i[k],function(l,m){if(c.isFunction(m.closePopup)){m.closePopup()}})}}function a(k,l){if(!i[l]){i[l]=[]}i[l].push(k)}d.BvPopup=function(l,k,m){this.activeDivId=l;this.ieFrameId=k;this.groupName=m;this.activationInProgress=false;this.activePopupId=null;if(m!=null){a(this,m)}};BvPopup.prototype.createPopupDivs=function(l,k){c("#"+l).clone(true).attr("id",this.activeDivId).appendTo("body").show();f.addBrowserClasses({containerId:this.activeDivId});h.addWrapperDivs(this.activeDivId,k);var m=bvGetIEControlsFrame(this.ieFrameId,"");if(m){m.style.position="absolute";c(m).insertBefore("#"+this.activeDivId).show();this.synchronizeSize([this.activeDivId,this.ieFrameId]);return[this.activeDivId,this.ieFrameId]}else{return[this.activeDivId]}};BvPopup.prototype.synchronizeSize=function(k){var m=g.getElementById(k[0]);for(var l=1;l<k.length;l++){var n=g.getElementById(k[l]);n.style.width=m.offsetWidth+"px";n.style.height=m.offsetHeight+"px"}};BvPopup.prototype.toggleActivatePopup=function(k,l){if(this.activationInProgress){return}var m=(c("#"+this.activeDivId).is(":visible")&&this.activePopupId==k);if(this.groupName){b(this.groupName)}else{this.closePopup()}if(m){return}this.activationInProgress=true;l(this,k)};BvPopup.prototype.setPopupActivated=function(k){this.activationInProgress=false;this.activePopupId=k};BvPopup.prototype.closePopup=function(){c("#"+this.activeDivId+", #"+this.ieFrameId).hide();c("#"+this.activeDivId).remove();this.activePopupId=null};BvPopup.prototype.alignByWidth=j.alignByWidth;BvPopup.prototype.alignByWidthOfParent=j.alignByWidthOfParent;BvPopup.prototype.alignByTop=function(l,k){this.setTop(l,bvGetLocation(k).top+10);this.adjustLocationToIncludeScrollOffsetDifference(l,k)};BvPopup.prototype.adjustLocationToIncludeScrollOffsetDifference=function(n,m){var l=0;c("#"+m).parents().each(function(){l+=this.scrollTop});for(var o=0;o<n.length;o++){var p=n[o];var q=0;var k=c("#"+p);k.parents().each(function(){q+=this.scrollTop});k.css("top",bvGetLocation(p).top+q-l+"px")}return n};BvPopup.prototype.alignByHeight=function(n,m){var l=g.getElementById(m);if(l){var k=bvGetLocation(m);c.each(n,function(){var o=c("#"+this);o.css("top",k.top+k.height/2-o[0].offsetHeight/2);e.ensureWindowHeight(o)})}return n};BvPopup.prototype.setTop=function(k,l){c.each(k,function(){var m=c("#"+this);m.css("top",l);e.ensureWindowHeight(m)})};e.BvPopup=BvPopup;e._popupHandlers=i;e.ensureWindowHeight=function(){};e.connectFromSubmitFrame=function(l,k){e.ensureWindowHeight=function(m){k.heightManager.ensureHeight(m.offset().top+m.outerHeight())}}});
$BV.Internal.define("photoDisplay",[window],["jquery.core","domUtils","popupDisplay"],function(a,b){a.BvPhoto=function(d,c,g,f,e){BvPopup.call(this,f,e,"mediapopup");this.popupDivIdPrefix=d;this.popupImageIdPrefix=c;this.captionCssClass=g};BvPhoto.prototype=new BvPopup;BvPhoto.prototype.constructor=BvPhoto;BvPhoto.prototype.createPhotoPopup=function(e,g,h,f,d,c){this.toggleActivatePopup(e,function(i,j){var k=new Image();k.onload=function(){i.setPhotoImage(j,this,h,f,d,c);i.setPopupActivated(j)};k.onerror=function(){i.setPopupActivated(null)};k.src=g})};BvPhoto.prototype.setPhotoImage=function(d,f,g,e,k,c){var h=this.popupDivIdPrefix+d;var i=this.popupImageIdPrefix+d;b("#"+i).attr("src",f.src);b("#"+h+" ."+this.captionCssClass).css("width",Math.max(f.width-10,200));var j=this.createPopupDivs(h,c);if(b.isFunction(k)){k(j)}else{this.alignByWidthOfParent(j,g,e);this.alignByTop(j,e)}}});
$BV.Internal.define("rr/photoDisplayRR",[window],["photoDisplay"],function(a){a.bvrrPhoto=new BvPhoto("BVRRPhotoPopup","BVRRPhotoImage","BVRRPhotoPopupCaption","BVRRActivePhotoID","BVRRPhotoFrameID")});
