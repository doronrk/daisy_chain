$BV.Internal.define("overlay",[],["exports","jquery.core","contentDisplay","animationQueueing"],function(a,b){a.createOverlay=function(h,e){var m={},n=h+"Hidden",l=h+"Overlay",i=bvCreateTimer(),g=15000,d;function c(o){g=o;return m}function j(o){d=o;return m}function f(){for(var r=0;r<e.length;r++){var t=b("#"+e[r].targetId);if(t.length==0){continue}var p=b("#"+e[r].id);if(p.length==0){var q="element" in e[r]?e[r].element:"div";var o="cssClass" in e[r]?e[r].cssClass+" ":"";t.append("<"+q+" id='"+e[r].id+"' class='"+o+l+" "+n+"'></"+q+">");p=b("#"+e[r].id)}if(p.parent().index(t)!=0){t.append(p)}p.height(t.height());p.width(t.width());if(t.css("position")=="relative"||t.css("position")=="absolute"){p.css("top",0);p.css("left",0)}else{var s=t.position();p.css("top",s.top);p.css("left",s.left)}p.removeClass(n);if("targetCssClass" in e[r]){t.addClass(e[r].targetCssClass)}}if(g>=0){i.set(function(){k(true)},g)}}function k(o){bvAnimationEventQueue.pushAnimationEvent(function(){i.clear();for(var p=0;p<e.length;p++){b("#"+e[p].id).addClass(n);if("targetCssClass" in e[p]){b("#"+e[p].targetId).removeClass(e[p].targetCssClass)}}if(b.isFunction(d)){d(o)}},arguments)}b.extend(m,{setTimeoutLength:c,onStop:j,start:f,stop:k});return m}});
$BV.Internal.define("filtering",[window,document],["exports","jquery.core","overlay","contentDisplay","domUtils"],function(c,a,d,e,b){e.extend(d,{_timer:bvCreateTimer(),_busy:false,bvTriggerAttributeContent:function(g,j,f,i){var h=e("#"+g+"FilterAttributeContent"+(f)+"ID").is(":visible");d.bvHideAllAttributeContent(g,j);d.bvClearFilteringTimer();if(!h){bvExpandDivWithIEControlsFrame(g+"FilterAttributeContent"+f+"ID",g+"FilterAttributeContentIEControlsFrameID","FilterAttributeContentIEControlsFrame",function(k){e("#"+k).removeClass(j+"Hidden")});e("#"+g+"FilterAttribute"+f+"ID").addClass(j+"FilterAttributeExpanded").hover(d.bvClearFilteringTimer,i)}return false},bvHideAllAttributeContent:function(f,g){if(!d._busy){e("."+g+"FilterAttributeContent").addClass(g+"Hidden");e("#"+f+"FilterAttributeContentIEControlsFrameID").addClass(g+"Hidden");e("."+g+"FilterAttributeExpanded").unbind();e("."+g+"FilterAttribute").removeClass(g+"FilterAttributeExpanded")}},bvClearFilteringTimer:function(){d._timer.clear()},bvTriggerMoreFilteringItems:function(g,f,i,j){var h=e("#"+g);if(h.is(":visible")){j.innerHTML=f;h.hide()}else{j.innerHTML=i;h.show()}return false},bvBindFilteringHandlers:function(g,f,i,h){d._busy=false;e("."+i+"FilterAttributeContent").hover(d.bvClearFilteringTimer,h);e(a).unbind("mousedown.bvfiltering");if(!g){e(a).bind("mousedown.bvfiltering",function(j){if(!e(j.target).parents("."+i+"FilterAttribute").length){d.bvHideAllAttributeContent(f,i)}})}},bvCheckAttributeFilteringBox:function(h,g,i,f){e("#"+h+"FilterAttributeItemCheckbox"+g+i+"ID").attr({checked:!f})},bvrrFilteringMouseout:function(){d._timer.set(d.bvrrHideAllAttributeContent,3000)},bvrrHideAllAttributeContent:function(){d.bvHideAllAttributeContent("BVRR","BVDI_AF")},bvqaFilteringMouseout:function(){d._timer.set(d.bvqaHideAllAttributeContent,3000)},bvqaHideAllAttributeContent:function(){d.bvHideAllAttributeContent("BVQA","BVDI_AF")},bvsyFilteringMouseout:function(){d._timer.set(d.bvsyHideAllAttributeContent,3000)},bvsyHideAllAttributeContent:function(){d.bvHideAllAttributeContent("BVSY","BVDI_AF")},bvAttributeFilteringBusyOverlayStart:function(i,h,g,l,f,j){d._busy=true;var k=i+"FilterAttributeContent"+(g+1)+"ID";d.bvFilteringBusyOverlay(i,k,j).onStop(function(m){if(m&&d._busy){d.bvCheckAttributeFilteringBox(i,h,l,!f)}d._busy=false}).start()},bvFilteringBusyOverlay:function(h,j,i){var g=[];if(typeof a.body.style.maxHeight==="undefined"){g.push({id:h+"FilteringBusyHideSelectID",cssClass:"BVDI_FBHideSelect",targetId:h+"ContentContainerID",element:"iframe"})}g.push({id:h+"FilteringBusyOverlayContainerID",cssClass:"BVDI_FBOverlayContainer",targetId:h+"ContentContainerID"});g.push({id:h+"FilteringBusyOverlayHighlightID",targetId:j,targetCssClass:"BVDI_FBContainerHighlight"});var f=b.createOverlay("BVDI",g);if(i!=undefined){f.setTimeoutLength(i)}return f}});d.onPageLoad=function(g,f){if(g==="bindFilteringHandlers"){if(a.getElementById(f.containerId)){d.bvBindFilteringHandlers(f.disableMouseDown,f.idPrefix,f.cssPrefix,d[f.mouseOutHandlerName]);if(f.activeItemIndex!=-1){d.bvTriggerAttributeContent(f.idPrefix,f.cssPrefix,f.activeItemIndex+1,d[f.mouseOutHandlerName])}}}};$BV.Internal.exposeGlobals(d)});
$BV.Internal.define("commentDisplay",[window,document],["exports"],function(c,a,b){b.commentSubmittedMessage=function(h,e,g){var f=h.displayPrefix;var d=h.cookiePrefix;var i=new RegExp(d+"-commented-");g(function(k){for(var j in k){if(i.test(j)){var l=j.match(/\d+/i);e.find("#"+f+"CommentSubmittedMessageID_"+l).removeClass("BVDIHidden");var m="BVDI_COSubmittedSubject";if(/^s-commented/i.test(j)){e.find("#BVSYDisplayContentStoryID_"+l).addClass(m);e.find("#BVSYSStory"+l).addClass(m)}else{if(/^r-commented/i.test(j)){e.find("#BVRRDisplayContentReviewID_"+l).addClass(m)}else{$BV.log("commentDisplay initialization failed. Could not apply BVDI_COSubmittedSubject additional css.")}}}}})};b.onPageLoad=function(g,f,d,e){if(g==="commentSubmittedMessage"){b.commentSubmittedMessage(f,d,e)}}});
$BV.Internal.define("contentFocusingSupport",[window,document],["exports","jquery.core","cookies","contentDisplay"],function(g,b,a,h,d){var c={};function f(j,k,i){return c[j+k+"|"+i]||c[j+k+"|"]}function e(k,l,j,i){c[k+l+"|"+j]=i}g.bvShowContent=a.showContent=function(l,m,k,i){if(g.bvClosePopups){bvClosePopups()}var j=f(l,m,k);return j&&j.handleShowContent(k,i)};a.switchTabOnce=function(l,m,k,i){var j=f(l,m,k);return j&&j.handleSwitchTabOnce(k,i)};a.scrollContainers=function(i){if(i&&i.length>0){var o=i.offset().top;if(i.parents().length>2){var k=i.parents();for(var j=0;j<k.length-2;j++){try{var l=h(k[j]);var m=l.scrollTop()>0;if(!m){l.scrollTop(1);m=l.scrollTop()>0;l.scrollTop(0)}if(m&&l.css("overflow")!=="hidden"){l.scrollTop(o+l.scrollTop()-l.offset().top);o=l.offset().top}}catch(n){}}}h(g).scrollTop(o);return true}return false};a.postInjection=function(q,s,u,r){var p=q.application,k=u.apiConfig(),l=(k&&k.doShowContent)||(q.tabSwitcher&&g[q.tabSwitcher]),t=q.displayCode,o=u.getComponent(q.defaultContentContainerId),j=q.source,n=(k&&k.doScrollContent),m=(k&&(k.productId||k.categoryId))||"";a.registerShowContent(p,t,m,l,o,j,n);var i=$BV.Internal.newLatch(1);if(q.deepLinkId){i.queue(function(){a.showContent(p,t,m,q.deepLinkId)})}if(!q.submission&&r.processDisplayState){r.processDisplayState(t)}a.processReturnPosition(p,t,s,i,q.submission);i.release()};a.registerShowContent=function(l,m,o,p,j,n,i){var k=j?h(j).attr("id"):"";e(l,m,o,h.extend(f(l,m,o),{handleSwitchTabOnce:function(s,q){function r(){h.isFunction(p)&&p(l,m,s,q,h.noop,n)}if(!this.switchedTab){r(s,q);this.switchedTab=true}},handleShowContent:function(t,q){function v(){if(q||k!=""){if(q==""){q=k}var w=h("#"+q);if(w.length==0&&k!=""){w=h("#"+k)}return a.scrollContainers(w)}return false}function s(){return i&&i(v)===false||v()}function r(){return h.isFunction(p)&&p(l,m,t,q,s,n)===false||s()}var u=r();this.switchedTab=true;return u}}))};a.processReturnPosition=function(j,m,l,n,i){function o(q){var r=false;var p=q.split("/");if(p.length>1&&p[0]==j&&p[1]==m){if(d.get("bvZeroDeployFirst")){d.remove("bvZeroDeployFirst");f(j,m,p[2]).switchedTab=true}else{if(i){a.switchTabOnce.apply(g,p)}else{a.showContent.apply(g,p);n.increment();r=true}}}return r}var k=d.get("bvReturnPosition");if(k){if(o(k)){d.remove("bvReturnPosition")}}else{n.increment();l(function(p,r){var q=p.bvReturnPosition;if(q){if(o(q)){r("bvReturnPosition")}}n.release()})}};a.saveReturnPosition=function(j,k,l,i){d.set("bvReturnPosition",j+"/"+k+"/"+l+"/"+(i||""))};a.clearReturnPosition=function(j,l,m){var k=d.get("bvReturnPosition");if(k){var i=k.split("/");if(i.length>2&&i[0]==j&&i[1]==l&&i[2]==m){d.remove("bvReturnPosition")}}};a.onPageLoad=function(l,k,i,j){}});
$BV.Internal.define("rr/analyticsHooksRR",[window],["jquery.core","analyticsHooks"],function(a,b){b.extend(BVAnalyticsCustomizer,{eventSocialConnectRR:function(c,e){c.eName=BVAnalyticsData.E_NAME.socialConnect;var d=e.substr(e.lastIndexOf("_")+1);d=d.substr(0,1).toUpperCase()+d.substr(1);c.socialMedium=d},eventTargetReview:function(c){if(!c.eventTarget){c.eventTarget=BVAnalyticsData.EVENT_TARGET.review}}});a.BVRRAnalyticsCustomizers=[new BVAnalyticsCustomizer("SocialBookmark.*",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.support)),new BVAnalyticsCustomizer("SocialBookmark.*",BVAnalyticsCustomizer.linkDestinationLocationExternal),new BVAnalyticsCustomizer("Inappropriate",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.support)),new BVAnalyticsCustomizer("Inappropriate",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.inappropriate)),new BVAnalyticsCustomizer(".*Feedback",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.support)),new BVAnalyticsCustomizer(".*Feedback",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.associate)),new BVAnalyticsCustomizer("Review_Display_.*Search.*",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.search)),new BVAnalyticsCustomizer("SocialBookmark.*",BVAnalyticsCustomizer.eventShoutit),new BVAnalyticsCustomizer("SocialConnect",BVAnalyticsCustomizer.eventSocialConnectRR),new BVAnalyticsCustomizer("FacebookLike.*",BVAnalyticsCustomizer.eventFacebookLike),new BVAnalyticsCustomizer("FacebookSend.*",BVAnalyticsCustomizer.eventFacebookSend),new BVAnalyticsCustomizer("AnswerThisQ",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.write)),new BVAnalyticsCustomizer("AnswerThisQ",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.write)),new BVAnalyticsCustomizer("AnswerThisQ",BVAnalyticsCustomizer.setEventTargetProperty(BVAnalyticsData.EVENT_TARGET.answer)),new BVAnalyticsCustomizer("WriteReview",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.write)),new BVAnalyticsCustomizer("WriteReview",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.write)),new BVAnalyticsCustomizer("PostComment",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.write)),new BVAnalyticsCustomizer("PostComment",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.write)),new BVAnalyticsCustomizer("PostComment",BVAnalyticsCustomizer.setEventTargetProperty(BVAnalyticsData.EVENT_TARGET.comment)),new BVAnalyticsCustomizer("ReturnToProduct",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.read)),new BVAnalyticsCustomizer("Display_Sort",BVAnalyticsCustomizer.eventSort),new BVAnalyticsCustomizer("(Prev|Next)?Page(Number)?",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.paginate)),new BVAnalyticsCustomizer("NextQuestions",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.paginate)),new BVAnalyticsCustomizer("NextQuestions",BVAnalyticsCustomizer.setEventTargetProperty(BVAnalyticsData.EVENT_TARGET.question)),new BVAnalyticsCustomizer("ProductLink.*",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.productLink)),new BVAnalyticsCustomizer(".*",BVAnalyticsCustomizer.socialAndButtonElementsDispatcher),new BVAnalyticsCustomizer(".*",BVAnalyticsCustomizer.eventTargetReview)]});
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
$BV.Internal.define("rr/contentFocusingSupportRR",[window],["exports","jquery.core","cookies","contentFocusingSupport"],function(d,c,e,b,a){d.bvShowContentOnReturnPRR=function(h,g,f){a.saveReturnPosition("PRR",h,g,f)};c.onPageLoad=function(j,i,f,h,g){if(j==="postInjection"){a.postInjection(i,h,g,this)}}});
