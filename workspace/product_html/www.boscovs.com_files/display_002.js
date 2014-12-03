$BV.Internal.define("filtering",[window,document],["exports","jquery.core","overlay","contentDisplay","domUtils"],function(c,a,d,e,b){e.extend(d,{_timer:bvCreateTimer(),_busy:false,bvTriggerAttributeContent:function(g,j,f,i){var h=e("#"+g+"FilterAttributeContent"+(f)+"ID").is(":visible");d.bvHideAllAttributeContent(g,j);d.bvClearFilteringTimer();if(!h){bvExpandDivWithIEControlsFrame(g+"FilterAttributeContent"+f+"ID",g+"FilterAttributeContentIEControlsFrameID","FilterAttributeContentIEControlsFrame",function(k){e("#"+k).removeClass(j+"Hidden")});e("#"+g+"FilterAttribute"+f+"ID").addClass(j+"FilterAttributeExpanded").hover(d.bvClearFilteringTimer,i)}return false},bvHideAllAttributeContent:function(f,g){if(!d._busy){e("."+g+"FilterAttributeContent").addClass(g+"Hidden");e("#"+f+"FilterAttributeContentIEControlsFrameID").addClass(g+"Hidden");e("."+g+"FilterAttributeExpanded").unbind();e("."+g+"FilterAttribute").removeClass(g+"FilterAttributeExpanded")}},bvClearFilteringTimer:function(){d._timer.clear()},bvTriggerMoreFilteringItems:function(g,f,i,j){var h=e("#"+g);if(h.is(":visible")){j.innerHTML=f;h.hide()}else{j.innerHTML=i;h.show()}return false},bvBindFilteringHandlers:function(g,f,i,h){d._busy=false;e("."+i+"FilterAttributeContent").hover(d.bvClearFilteringTimer,h);e(a).unbind("mousedown.bvfiltering");if(!g){e(a).bind("mousedown.bvfiltering",function(j){if(!e(j.target).parents("."+i+"FilterAttribute").length){d.bvHideAllAttributeContent(f,i)}})}},bvCheckAttributeFilteringBox:function(h,g,i,f){e("#"+h+"FilterAttributeItemCheckbox"+g+i+"ID").attr({checked:!f})},bvrrFilteringMouseout:function(){d._timer.set(d.bvrrHideAllAttributeContent,3000)},bvrrHideAllAttributeContent:function(){d.bvHideAllAttributeContent("BVRR","BVDI_AF")},bvqaFilteringMouseout:function(){d._timer.set(d.bvqaHideAllAttributeContent,3000)},bvqaHideAllAttributeContent:function(){d.bvHideAllAttributeContent("BVQA","BVDI_AF")},bvsyFilteringMouseout:function(){d._timer.set(d.bvsyHideAllAttributeContent,3000)},bvsyHideAllAttributeContent:function(){d.bvHideAllAttributeContent("BVSY","BVDI_AF")},bvAttributeFilteringBusyOverlayStart:function(i,h,g,l,f,j){d._busy=true;var k=i+"FilterAttributeContent"+(g+1)+"ID";d.bvFilteringBusyOverlay(i,k,j).onStop(function(m){if(m&&d._busy){d.bvCheckAttributeFilteringBox(i,h,l,!f)}d._busy=false}).start()},bvFilteringBusyOverlay:function(h,j,i){var g=[];if(typeof a.body.style.maxHeight==="undefined"){g.push({id:h+"FilteringBusyHideSelectID",cssClass:"BVDI_FBHideSelect",targetId:h+"ContentContainerID",element:"iframe"})}g.push({id:h+"FilteringBusyOverlayContainerID",cssClass:"BVDI_FBOverlayContainer",targetId:h+"ContentContainerID"});g.push({id:h+"FilteringBusyOverlayHighlightID",targetId:j,targetCssClass:"BVDI_FBContainerHighlight"});var f=b.createOverlay("BVDI",g);if(i!=undefined){f.setTimeoutLength(i)}return f}});d.onPageLoad=function(g,f){if(g==="bindFilteringHandlers"){if(a.getElementById(f.containerId)){d.bvBindFilteringHandlers(f.disableMouseDown,f.idPrefix,f.cssPrefix,d[f.mouseOutHandlerName]);if(f.activeItemIndex!=-1){d.bvTriggerAttributeContent(f.idPrefix,f.cssPrefix,f.activeItemIndex+1,d[f.mouseOutHandlerName])}}}};$BV.Internal.exposeGlobals(d)});
$BV.Internal.define("contentFocusingSupport",[window,document],["exports","jquery.core","cookies","contentDisplay"],function(g,b,a,h,d){var c={};function f(j,k,i){return c[j+k+"|"+i]||c[j+k+"|"]}function e(k,l,j,i){c[k+l+"|"+j]=i}g.bvShowContent=a.showContent=function(l,m,k,i){if(g.bvClosePopups){bvClosePopups()}var j=f(l,m,k);return j&&j.handleShowContent(k,i)};a.switchTabOnce=function(l,m,k,i){var j=f(l,m,k);return j&&j.handleSwitchTabOnce(k,i)};a.scrollContainers=function(i){if(i&&i.length>0){var o=i.offset().top;if(i.parents().length>2){var k=i.parents();for(var j=0;j<k.length-2;j++){try{var l=h(k[j]);var m=l.scrollTop()>0;if(!m){l.scrollTop(1);m=l.scrollTop()>0;l.scrollTop(0)}if(m&&l.css("overflow")!=="hidden"){l.scrollTop(o+l.scrollTop()-l.offset().top);o=l.offset().top}}catch(n){}}}h(g).scrollTop(o);return true}return false};a.postInjection=function(q,s,u,r){var p=q.application,k=u.apiConfig(),l=(k&&k.doShowContent)||(q.tabSwitcher&&g[q.tabSwitcher]),t=q.displayCode,o=u.getComponent(q.defaultContentContainerId),j=q.source,n=(k&&k.doScrollContent),m=(k&&(k.productId||k.categoryId))||"";a.registerShowContent(p,t,m,l,o,j,n);var i=$BV.Internal.newLatch(1);if(q.deepLinkId){i.queue(function(){a.showContent(p,t,m,q.deepLinkId)})}if(!q.submission&&r.processDisplayState){r.processDisplayState(t)}a.processReturnPosition(p,t,s,i,q.submission);i.release()};a.registerShowContent=function(l,m,o,p,j,n,i){var k=j?h(j).attr("id"):"";e(l,m,o,h.extend(f(l,m,o),{handleSwitchTabOnce:function(s,q){function r(){h.isFunction(p)&&p(l,m,s,q,h.noop,n)}if(!this.switchedTab){r(s,q);this.switchedTab=true}},handleShowContent:function(t,q){function v(){if(q||k!=""){if(q==""){q=k}var w=h("#"+q);if(w.length==0&&k!=""){w=h("#"+k)}return a.scrollContainers(w)}return false}function s(){return i&&i(v)===false||v()}function r(){return h.isFunction(p)&&p(l,m,t,q,s,n)===false||s()}var u=r();this.switchedTab=true;return u}}))};a.processReturnPosition=function(j,m,l,n,i){function o(q){var r=false;var p=q.split("/");if(p.length>1&&p[0]==j&&p[1]==m){if(d.get("bvZeroDeployFirst")){d.remove("bvZeroDeployFirst");f(j,m,p[2]).switchedTab=true}else{if(i){a.switchTabOnce.apply(g,p)}else{a.showContent.apply(g,p);n.increment();r=true}}}return r}var k=d.get("bvReturnPosition");if(k){if(o(k)){d.remove("bvReturnPosition")}}else{n.increment();l(function(p,r){var q=p.bvReturnPosition;if(q){if(o(q)){r("bvReturnPosition")}}n.release()})}};a.saveReturnPosition=function(j,k,l,i){d.set("bvReturnPosition",j+"/"+k+"/"+l+"/"+(i||""))};a.clearReturnPosition=function(j,l,m){var k=d.get("bvReturnPosition");if(k){var i=k.split("/");if(i.length>2&&i[0]==j&&i[1]==l&&i[2]==m){d.remove("bvReturnPosition")}}};a.onPageLoad=function(l,k,i,j){}});
$BV.Internal.define("tagDisplay",[window,document],["exports","jquery.core","filtering","contentDisplay","domUtils","cookies"],function(l,n,i,k,d,c,a,m){var o=null;var h="";var g=true;var b=bvCreateTimer();var q=[];var e={};var j="";var f="bvQTActiveToggler";var p=(navigator.userAgent.match(/iPad|iPhone|iPod/i)!=null);k.extend(i,{makeInputs:function(t){var r=k(t),s=[];for(var u=0;u<r.length;u++){s[u]=i.assessInput(r[u],u);i.inputEvents(s[u],s[u].index,false);k(s[u]).click(function(){i.inputEvents(this,this.index,true)});k(s[u]).focusin(function(){k(this.parent).addClass("BVDI_QTFilterFocus")});k(s[u]).focusout(function(){k(this.parent).removeClass("BVDI_QTFilterFocus")});if(!p){i.handleEventHover(s[u],s[u].label)}}},inputEvents:function(r,t,s){i.clickEvents(i.assessInput(r,t),s)},clickEvents:function(s,r){if(s.checked){k(s.parent).addClass("BVDI_QTFilterChecked");k(s.parent).removeClass("BVDI_QTFilterUnchecked")}else{if(s.disabled){k(s.parent).removeClass("BVDI_QTFilterChecked");k(s.parent).addClass("BVDI_QTFilterDisabled")}else{k(s.parent).addClass("BVDI_QTFilterUnchecked");k(s.parent).removeClass("BVDI_QTFilterChecked")}}if(r){k(s.parent).toggleClass("BVDI_QTFilterActive")}},toggleSelectBox:function(r){r.attr("checked",!r.attr("checked"));i.clickEvents(r.get(0),true)},handleEventHover:function(r,s){k(s).mouseenter(function(){var t=i.assessInput(r,r.index);if(t.checked){k(t.parent).addClass("BVDI_QTFilterCheckedHover")}else{if(t.disabled){}else{k(t.parent).addClass("BVDI_QTFilterHover")}}});k(s).mouseleave(function(){var t=i.assessInput(r,r.index);k(t.parent).removeClass("BVDI_QTFilterCheckedHover");k(t.parent).removeClass("BVDI_QTFilterHover")})},assessInput:function(r,s){r.id=r.getAttribute("id");r.parent=i.findParent(r,"BVDI_QTFilter");r.label=k("#"+r.id.replace(/\-(\d+)ID$/,"Label-$1ID"));r.index=s;return r},toggleGroup:function(r,y,u,x,t,w){var s=n.getElementById(r+"_QTToggleAreaGroup"+y+"ID"),v=k(s).hasClass("BVDIHidden");if(v){if(t){i.collapseExpandedDimension(r);o=y;h=k("#"+r+"Toggle"+y+"HeaderID").attr("title")}i.expandGroup(r,y,s,x)}else{if(!w){if(t){o=null;h=""}i.collapseGroup(r,y,s,u)}}},bvsyCollapseExpandedDimensionTimeout:function(){b.set(i.bvsyCollapseExpandedDimension,3000)},bvsyCollapseExpandedDimension:function(){i.collapseExpandedDimension("BVSY")},bvrrCollapseExpandedDimensionTimeout:function(){b.set(i.bvrrCollapseExpandedDimension,3000)},bvrrCollapseExpandedDimension:function(){i.collapseExpandedDimension("BVRR")},bvqaCollapseExpandedDimensionTimeout:function(){b.set(i.bvqaCollapseExpandedDimension,3000)},bvqaCollapseExpandedDimension:function(){i.collapseExpandedDimension("BVQA")},clearQuickTakeTimer:function(){b.clear()},collapseExpandedDimension:function(r){if(o!=null){i.collapseGroup(r,o,n.getElementById(r+"_QTToggleAreaGroup"+o+"ID"),h)}o=null;h=""},expandGroup:function(r,v,t,u){var s=k(t).attr("id");bvExpandDivWithIEControlsFrame(s,"BVDI_QTToggleAreaGroupIEControlsFrameID","ToggleAreaGroupIEControlsFrame",function(w){k("#"+w).removeClass("BVDIHidden")});i.showParent(i.findParent(t,"BVDI_QTGroup"));k("#"+r+"_QT_ToggleMore"+v).addClass("BVDIHidden");k("#"+r+"_QT_ToggleFewer"+v).removeClass("BVDIHidden");k("#"+r+"Toggle"+v+"HeaderID").attr("title",u);k("#"+r+"Toggle"+v+"FooterID").attr("title",u)},collapseGroup:function(r,u,s,t){k(s).addClass("BVDIHidden");k("#BVDI_QTToggleAreaGroupIEControlsFrameID").addClass("BVDIHidden");i.hideParent(i.findParent(s,"BVDI_QTGroup"));k("#"+r+"_QT_ToggleFewer"+u).addClass("BVDIHidden");k("#"+r+"_QT_ToggleMore"+u).removeClass("BVDIHidden");k("#"+r+"Toggle"+u+"HeaderID").attr("title",t);k("#"+r+"Toggle"+u+"FooterID").attr("title",t)},showParent:function(r){k(r).removeClass("BVDI_QTGroupCollapsed");k(r).addClass("BVDI_QTGroupExpanded")},hideParent:function(r){k(r).removeClass("BVDI_QTGroupExpanded");k(r).addClass("BVDI_QTGroupCollapsed")},findParent:function(u,t){var s=u,r;for(r=0;r<6;r++){s=s.parentNode;if(k(s).hasClass(t)){return s}}return false},filteringBusyOverlay:function(s,t,v,r,u){if(!i.disableFiltering(s)){return false
}d._busy=true;d.bvFilteringBusyOverlay(t,v,u).onStop(function(w){if(w){i.enableFiltering(s);if(d._busy&&r.length>0){i.toggleSelectBox(k("#"+r))}}d._busy=false}).start()},filteringBusySimple:function(s,r){if(!i.disableFiltering(s)){return false}setTimeout(function(){if(!g){i.enableFiltering(s);i.toggleSelectBox(k("#"+r))}},15000)},disableFiltering:function(r){if(!g){return false}if(q[r]){q[r].addClass("BVDI_QTFilterFilteringDisabled")}g=false;return true},enableFiltering:function(r){if(!g){if(q[r]){q[r].removeClass("BVDI_QTFilterFilteringDisabled")}g=true}return true},bindFilteringHandlers:function(s,r,u,t){k("."+u+"Group").hover(i.clearQuickTakeTimer,t);k(n).unbind("mousedown.bvfiltering");if(!s){k(n).bind("mousedown.bvfiltering",function(v){if(!k(v.target).parents("."+u+"Group").length){i.collapseExpandedDimension(r)}})}},bindTogglerHandler:function(v){var s=v.containerId+v.sitePrefix+v.toggleId;e[s]=v;var r=k("#"+v.containerId);if(r.length!=1){return}var w=m.get(f);if(w){var u=e[w];if(u){var t=u.customClass||"";if(t){r.addClass(t);k("#"+u.linkId).addClass("BVDI_Active");j=w}}}r.find("#"+v.linkId).click(function(z){z.preventDefault();var y=e[j];if(y){var x=y.customClass||"";if(x){r.removeClass(x);m.remove(f)}k("#"+y.linkId).removeClass("BVDI_Active")}if(j!==s){j=s;y=e[j];x=y.customClass||"";if(x){r.addClass(x);m.set(f,j)}k("#"+y.linkId).addClass("BVDI_Active")}else{j=""}return false})},initTagDisplay:function(s,v,w){i.makeInputs(".BVDI_QTFilter > input");if(w&&w.length>0){o=w;var r=s+"_QTToggleAreaGroup"+w+"ID";bvExpandDivWithIEControlsFrame(r,"BVDI_QTToggleAreaGroupIEControlsFrameID","ToggleAreaGroupIEControlsFrame",function(x){k("#"+x).removeClass("BVDIHidden")})}q[s]=v;d._busy=false;i.enableFiltering(s);var u=k("#"+s+"QuickTakeContentContainerID"),t=k("#"+s+"FilteringBusyOverlayHighlightID");t.width(u.width());t.height(u.height());t.offset(u.offset())}});i.onPageLoad=function(t,s,r){if(t==="init"){i.initTagDisplay(s.prefix,r,s.expandedDimension)}else{if(t==="bindFilteringHandlers"){if(n.getElementById(s.containerId)){i.bindFilteringHandlers(s.disableMouseDown,s.idPrefix,s.cssPrefix,i[s.mouseOutHandlerName])}}else{if(t==="bindTogglerHandler"){if(n.getElementById(s.containerId)){i.bindTogglerHandler(s)}}}}};l.bvTagDisplay=i});
$BV.Internal.define("trustMark",[window,document],["exports","jquery.core","analyticsHooks"],function(k,r,e,v,w){var d,t,c,j,g;var b=false;var s=null;var h=false;if(typeof r.hidden!=="undefined"){s="hidden"}else{if(typeof r.mozHidden!=="undefined"){s="mozHidden"}else{if(typeof r.msHidden!=="undefined"){s="msHidden"}else{if(typeof r.webkitHidden!=="undefined"){s="webkitHidden"}}}}function i(){if(s&&r[s]){return false}var A=v("#"+d).offset();if(!A){return false}var C=v(k),z=C.scrollTop(),D=C.scrollLeft(),B=((A.top>z)&&(A.top<(z+C.height()))),y=((A.left>D)&&(A.left<(D+C.width())));return B&&y}function n(y){d=y;if(!c){c=(new Date()).getTime();f()}}function x(y){n(y);bvOpenDivs(d);v("#"+d).addClass("BVRRTrustMarkDiv")}function f(){if(i()){var y={type:"Shown",name:"TrustMarkVisible",productId:j,brand:g};k._bvaq.push(["trackEvent","Feature",y])}else{if(((new Date()).getTime()-c)<900000){t=setTimeout(function(){f()},1000)}}}function q(y,A,z){b=true;t=setTimeout(function(){l(y,A,z)},300)}function o(y){b=false;t=setTimeout(function(){a(y)},300)}function m(){b=true;p()}function p(){if(t){clearTimeout(t)}}function l(y,A,z){u(A,z);if(!h){w.fireActionEvent(y,null,null,false,"TrustMarkViewInfo");h=true}}function u(A,y){if(b){if(!y){bvOpenDivs(A)}else{var z=v("#"+A+" > .BVRRTrustMarkInfoCore");var B=v("#"+A+" > .BVRRTrustMarkInfoPointer");if(z.css("display")!="block"){B.stop(true,true).slideDown({duration:"fast",queue:false});z.stop(true,true).slideDown({duration:"fast",queue:false})}}}}function a(z){if(!b){var y=v("#"+z+" > .BVRRTrustMarkInfoCore");var A=v("#"+z+" > .BVRRTrustMarkInfoPointer");if(y.css("display")=="block"){y.stop(true,true).slideUp({duration:"fast",queue:false});A.stop(true,true).slideUp({duration:"fast",queue:false})}}}e.onPageLoad=function(A,y){var z=y.target;j=y.tmProductId;g=y.tmBrand;if(A==="initQuickTake"){n(z)}else{if(A==="initContentSection"){x(z)}}};v.extend(e,{onMouseOver:q,onMouseOut:o,infoMouseOver:m});k.BVTrustMark=e});
$BV.Internal.define("rr/analyticsHooksRR",[window],["jquery.core","analyticsHooks"],function(a,b){b.extend(BVAnalyticsCustomizer,{eventSocialConnectRR:function(c,e){c.eName=BVAnalyticsData.E_NAME.socialConnect;var d=e.substr(e.lastIndexOf("_")+1);d=d.substr(0,1).toUpperCase()+d.substr(1);c.socialMedium=d},eventTargetReview:function(c){if(!c.eventTarget){c.eventTarget=BVAnalyticsData.EVENT_TARGET.review}}});a.BVRRAnalyticsCustomizers=[new BVAnalyticsCustomizer("SocialBookmark.*",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.support)),new BVAnalyticsCustomizer("SocialBookmark.*",BVAnalyticsCustomizer.linkDestinationLocationExternal),new BVAnalyticsCustomizer("Inappropriate",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.support)),new BVAnalyticsCustomizer("Inappropriate",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.inappropriate)),new BVAnalyticsCustomizer(".*Feedback",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.support)),new BVAnalyticsCustomizer(".*Feedback",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.associate)),new BVAnalyticsCustomizer("Review_Display_.*Search.*",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.search)),new BVAnalyticsCustomizer("SocialBookmark.*",BVAnalyticsCustomizer.eventShoutit),new BVAnalyticsCustomizer("SocialConnect",BVAnalyticsCustomizer.eventSocialConnectRR),new BVAnalyticsCustomizer("FacebookLike.*",BVAnalyticsCustomizer.eventFacebookLike),new BVAnalyticsCustomizer("FacebookSend.*",BVAnalyticsCustomizer.eventFacebookSend),new BVAnalyticsCustomizer("AnswerThisQ",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.write)),new BVAnalyticsCustomizer("AnswerThisQ",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.write)),new BVAnalyticsCustomizer("AnswerThisQ",BVAnalyticsCustomizer.setEventTargetProperty(BVAnalyticsData.EVENT_TARGET.answer)),new BVAnalyticsCustomizer("WriteReview",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.write)),new BVAnalyticsCustomizer("WriteReview",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.write)),new BVAnalyticsCustomizer("PostComment",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.write)),new BVAnalyticsCustomizer("PostComment",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.write)),new BVAnalyticsCustomizer("PostComment",BVAnalyticsCustomizer.setEventTargetProperty(BVAnalyticsData.EVENT_TARGET.comment)),new BVAnalyticsCustomizer("ReturnToProduct",BVAnalyticsCustomizer.setEventTypeProperty(BVAnalyticsData.E_TYPE.read)),new BVAnalyticsCustomizer("Display_Sort",BVAnalyticsCustomizer.eventSort),new BVAnalyticsCustomizer("(Prev|Next)?Page(Number)?",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.paginate)),new BVAnalyticsCustomizer("NextQuestions",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.paginate)),new BVAnalyticsCustomizer("NextQuestions",BVAnalyticsCustomizer.setEventTargetProperty(BVAnalyticsData.EVENT_TARGET.question)),new BVAnalyticsCustomizer("ProductLink.*",BVAnalyticsCustomizer.setEventNameProperty(BVAnalyticsData.E_NAME.productLink)),new BVAnalyticsCustomizer(".*",BVAnalyticsCustomizer.socialAndButtonElementsDispatcher),new BVAnalyticsCustomizer(".*",BVAnalyticsCustomizer.eventTargetReview)]});
$BV.Internal.define("rr/analyticsInternalLegacyHooksRR",[window],["jquery.core","analyticsHooks"],function(a,b){a.BVRRInternalLegacyCallback=function(d){var g=a.BVAnalyticsData;if(d.bvProduct!==g.PRODUCT.prr){return}var f=b.isFunction(a.BVRRInternalUseOnlyCallback);var e=d.leafCategoryId||d.categoryId||"";if(d.sortType&&d.sortDirection){if(f){a.BVRRInternalUseOnlyCallback({interactionType:"sort",productId:d.productId,categoryId:e,sortType:d.sortType,sortDirection:d.sortDirection})}}else{if(d.eventSource===g.EVENT_SOURCE.display){if(d.eType==g.E_TYPE.read){if(f){a.BVRRInternalUseOnlyCallback({interactionType:"display",numReviews:d.attributes.numReviews,productId:d.productId,categoryId:e,avgRating:d.attributes.avgRating,ratingsOnlyReviewCount:d.attributes.numRatingsOnlyReviews,recommendedPercentage:d.attributes.percentRecommend})}if(b.isFunction(a.ratingsDisplayed)){a.ratingsDisplayed(d.attributes.numReviews,d.attributes.avgRating,d.attributes.numRatingsOnlyReviews,d.attributes.percentRecommend,d.productId)}if(d.attributes.numReviews>0){if(b.isFunction(a.showReviewMarkup)){a.showReviewMarkup()}}}else{if(d.eType==g.E_TYPE.write||d.eType==g.E_TYPE.support){if(f){var c={interactionType:d.interactionType,productId:d.productId,categoryId:e};if(d.interactionOverallRating){c.overallRating=d.interactionOverallRating}a.BVRRInternalUseOnlyCallback(c)}if(d.pageName&&b.isFunction(a.pageChanged)){if(d.pageName=="ReviewSubmit"){a.pageChanged(d.pageName,"")}else{if(d.pageChangedStatus){a.pageChanged(d.pageName,d.pageChangedStatus)}else{a.pageChanged(d.pageName,d.pageStatus||"")}}}}}}}}});
$BV.Internal.define("rr/contentDisplayRR",[window],["analyticsHooks","domUtils","contentDisplay","animationQueueing"],function(b,a){var c={};b.bvHistogramMouseover=function(g,d,f,e){if(c[d]){clearTimeout(c[d])}bvExpandDivWithIEControlsFrame(f,"BVRRRatingsHistogramButtonIEControlsFrame",e);bvFocus(f);a.fireActionEvent(g)};b.bvHistogramMouseout=function(d,f,e){bvAnimationEventQueue.pushAnimationEvent(function(){c[d]=setTimeout(function(){bvCloseDivs(f,"BVRRRatingsHistogramButtonIEControlsFrame")},e)},arguments)}});
$BV.Internal.define("rr/injection.rr.replacements",[],["exports","jquery.core","injection.shared.replacements","domUtils"],function(a,c,b){c.extend(a,b,{determineTargetFrame:function(){var d=this.getComponent("BVFrame");return d?d.id:"BVFrame"},determineReturnUrlPrr:function(e,d){var g=this.determineReturnUrl(false,d);if(g&&!g.match(/^https?\:\/\//)){if(e.returnURLFixedValue){g=e.returnURLFixedValue}else{var f=this.targetWindow().location;if(g[0]!="/"){if(e.returnURLForceRelativeToRoot){g="/"+g}else{g=f.pathname.match(/(.*\/)/)[0]+g}}g=f.protocol+"//"+f.host+g}}return encodeURIComponent(g)},determineSubmissionUrl:function(e){var d;if(e){d=e.submissionContainerUrl}else{d=this.getClientDivData("ContainerPageURL")}if(!d&&e&&e.allowSamePageSubmission){d=this.targetWindow().location.href}return d?encodeURIComponent(this.stripAnchors(d)):null},determineLoginParameters:function(d){var e;if(!d){e=this.getClientDivData("LoginParameters")}return e?encodeURIComponent(e):null}})});
$BV.Internal.define("rr/injection.rr",[],["exports","jquery.core","injection","rr/injection.rr.replacements","requester"],function(d,e,b,a,c){e.extend(d,b,a,{getTargetFrame:function(){return this.determineTargetFrame()},getComponent:function(g){var i=this.targetWindow(),h=this.productId(),f=this.divOverrides(g);if(!f&&h&&!this.apiConfig()){f=i.document.getElementById(g+"_"+h)}if(!f){f=i.document.getElementById(g)}return f},getReplacements:function(h,f){var k=[];if(!f){k.push({pattern:/__BVLOGINPARAMETERS__/g,replacement:this.determineLoginParameters(f)})}k.push({pattern:/__CONFIGKEY__/g,replacement:f?c.getConfigKey(f):""});k.push({pattern:/__TARGETFRAME__/g,replacement:this.determineTargetFrame()});k.push({pattern:/__RETURN__/g,replacement:this.determineReturnUrlPrr(h,f)});k.push({pattern:/__BVSUBMISSIONURL__/g,replacement:this.determineSubmissionUrl(f)});k.push({pattern:/__BVSUBMISSIONPARAMETERS__/g,replacement:this.determineSubmissionParameters(f)});k.push({pattern:/__USERID__|__ALLOWANONYMOUS__/g,replacement:this.determineCustomerId(f)});var j=[];for(var g=0;g<k.length;++g){if(k[g].replacement!=null){j.push(k[g])}}return j},injectScriptIfNecessary:function(h,l){var k=window.parent,j=k.document,g;function i(){if(k.$BV){return true}var n=j.getElementsByTagName("script");for(var m=0;m<n.length;m++){if(n[m].getAttribute("src")===h){return true}}return false}function f(){if(k.$BV){l&&l()}else{g=g?g*2:10;k.setTimeout(f,g)}}k.setTimeout(function(){if(!i()){var m=j.createElement("script");m.type="text/javascript";m.src=h;j.getElementsByTagName("head")[0].appendChild(m)}f()},0)},getSviRedirectUrl:function(h,n,g){var i,l,j;if(h.length==5){i=h[1];l=h[3];j=h[4]}else{if(h.length>5){var f=(h.length-5);i=h[f+1];l=h[f+3];j=h[f+4]}else{return null}}var m;if(i=="reviews"){if(g){m=".djs?format=embeddedhtml"}else{m=".htm?format=embedded"}}else{if(i=="reviewsPage"){if(g){m=".djs?format=bulkembeddedhtml"}else{return null}}else{return null}}var k=n+j+"/reviews"+m;if(l>1){k+="&page="+l}return k}})});
$BV.Internal.define("feedbackStyle1",[],["exports","jquery.core"],function(a,b){b.extend(a,{inactivateYesNo:function(d,c,e){b(d+" "+c+"FeedbackLinkYes").addClass(e);b(d+" "+c+"FeedbackLinkNo").addClass(e);b(d+" "+c+"FeedbackLinkInactiveYes").removeClass(e);b(d+" "+c+"FeedbackLinkInactiveNo").removeClass(e)},inactivateInappropriate:function(d,c,e){b(d+" "+c+"FeedbackLinkInappropriate").addClass(e);b(d+" "+c+"FeedbackLinkInactiveInappropriate").removeClass(e)},showMessage:function(e,c,f,d){b(e+" "+c+"FeedbackMessage").removeClass(f).html(d)}})});
$BV.Internal.define("rr/feedbackStyle1RR",[],["exports","feedbackStyle1","cookies"],function(b,e,d){function a(f,i,h,g){g(function(k){for(var l in k){var j=c().exec(l);if(j){b.initFeedback(f,j[1],j[2],k[l],i,h)}}})}function c(){return/^r(hf|if)_(\d+)$/}b.initFeedback=function(f,g,k,j,i,h){if("hf"==g){b.initHelpfulnessFeedback(k,j,i)}else{b.initInappropriateFeedback(k,j,h)}};b.initHelpfulnessFeedback=function(h,g,f){if(g!="-1"){e.showMessage("#BVRRDisplayContentReviewID_"+h,".BVRRReview","BVRRHidden",f)}e.inactivateYesNo("#BVRRDisplayContentReviewID_"+h,".BVRRReview","BVRRHidden")};b.initInappropriateFeedback=function(h,g,f){if(g!="-1"){e.showMessage("#BVRRDisplayContentReviewID_"+h,".BVRRReview","BVRRHidden",f)}e.inactivateInappropriate("#BVRRDisplayContentReviewID_"+h,".BVRRReview","BVRRHidden")};b.onPageLoad=function(i,h,f,g){if(i==="feedbackStatus"){a(f,h.helpfulnessMessage,h.inappropriateMessage,g)}}});
$BV.Internal.define("rr/contentFocusingSupportRR",[window],["exports","jquery.core","cookies","contentFocusingSupport"],function(d,c,e,b,a){d.bvShowContentOnReturnPRR=function(h,g,f){a.saveReturnPosition("PRR",h,g,f)};c.onPageLoad=function(j,i,f,h,g){if(j==="postInjection"){a.postInjection(i,h,g,this)}}});
