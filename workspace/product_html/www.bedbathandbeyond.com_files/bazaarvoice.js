var BBB=BBB||{};
(function(f,n,x,a,y){a.bazaarVoice=function(){return new function(){var l=this,u=!1,g=function(a){},b=function(a){var b="",c;if("undefined"!==typeof a&&!0===/^\d+$/.test(a)&&0<a)for(c=0;c<=a;c++)b+=" ";return b},k="",e={loadOnDOMReady:function(){g(b(c++)+"==> method: loadOnDOMReady");f(function(){e.confGlobal();e.renderReviews();e.renderQuestions();e.bindEventHandlers();e.triggerBVMethods();f(".bvSubmitReviewButtonContainer").removeClass("hidden").show();u=!0});g(b(--c)+"<== method: loadOnDOMReady")},getUserToken:function(){b(c++);
var p=null!==v?v:a.config.bazaarvoice&&a.config.bazaarvoice.userToken&&""!==a.config.bazaarvoice.userToken.trim()?a.config.bazaarvoice.userToken.trim():a.oQueryData.userToken?a.oQueryData.userToken:f("input[name=userToken]")[0]&&""!==f("input[name=userToken]").val().trim()?f("input[name=userToken]").val().trim():"";b(c);b(--c);return p},getProductId:function(){b(c++);var p=null!==q?q:a.config.bazaarvoice&&a.config.bazaarvoice.productId&&""!==a.config.bazaarvoice.productId.trim()?a.config.bazaarvoice.productId.trim():
a.oQueryData.BVProductId?a.oQueryData.BVProductId:f("input[name=bvProdId]")[0]&&""!==f("input[name=bvProdId]").val().trim()?f("input[name=bvProdId]").val().trim():f("#prodRatings input[name=prodId]")[0]&&""!==f("#prodRatings input[name=prodId]").val().trim()?f("#prodRatings input[name=prodId]").val().trim():"";b(c);b(--c);return p},getCampaignId:function(){b(c++);var p=null!==r?r:a.oQueryData.campaignId?a.oQueryData.campaignId:a.config.bazaarvoice&&a.config.bazaarvoice.campaignId&&""!==a.config.bazaarvoice.campaignId.trim()?
a.config.bazaarvoice.campaignId.trim():f("input[name=bvCampaignId]")[0]&&""!==f("input[name=bvCampaignId]").val().trim()?f("input[name=bvCampaignId]").val().trim():"";b(c);b(--c);return p},getQuestionId:function(){b(c++);var p=null!==t?t:a.oQueryData.BVQuestionId?a.oQueryData.BVQuestionId:a.config.bazaarvoice&&a.config.bazaarvoice.questionId&&""!==a.config.bazaarvoice.questionId.trim()?a.config.bazaarvoice.questionId.trim():f("input[name=bvQuestionId]")[0]&&""!==f("input[name=bvQuestionId]").val().trim()?
f("input[name=bvQuestionId]").val().trim():"";b(c);b(--c);return p},triggerBVMethods:function(){b(c++);a.oQueryData.writeReview&&"true"===a.oQueryData.writeReview.toLowerCase()||a.oQueryData.eid&&a.oQueryData.productId&&a.oQueryData.orderId&&!a.oQueryData.success?setTimeout(e.submitReview,500):a.oQueryData.writeAnswer&&"true"===a.oQueryData.writeAnswer.toLowerCase()&&a.oQueryData.productId&&a.oQueryData.BVQuestionId?setTimeout(e.submitAnswer,500):a.oQueryData.showRatings&&"true"===a.oQueryData.showRatings.toLowerCase()?
setTimeout(e.doShowReviews,500):a.oQueryData.showQuestions&&"true"===a.oQueryData.showQuestions.toLowerCase()&&setTimeout(e.doShowQuestions,500);b(--c)},bindEventHandlers:function(){g(b(c++)+"==> method: bindEventHandler");a.eventTarget.delegate(".triggerBVsubmitReview","click",function(a){b(c++);a.preventDefault();a=f(this);e.submitReview(a.attr("data-BVProductId"),a.attr("data-BVCampaignId"));b(c++)});a.eventTarget.delegate(".triggerBVsubmitAnswer","click",function(a){b(c++);a.preventDefault();
a=f(this);e.submitAnswer(a.attr("data-BVProductId"),a.attr("data-BVQuestionId"),a.attr("data-BVCampaignId"));b(c++)});g(b(--c)+"<== method: bindEventHandler")},submitAnswer:function(a,m,h){g(b(c++)+"==> method: submitAnswer .. productId("+a+") .. questionId("+m+") .. campaignId("+h+")");q=a&&"string"===typeof a&&""!==a.trim()?a.trim():null;r=h&&"string"===typeof h&&""!==h.trim()?h.trim():null;t=m&&"string"===typeof m&&""!==m.trim()?m.trim():null;h={subjectType:"product",productId:e.getProductId(),
questionId:e.getQuestionId(),onEvent:function(a){}};var d=e.getCampaignId();""!==d&&f.extend(h,{campaignId:d});try{$BV.ui("qa","submit_answer",h)}catch(k){}g(b(--c)+"<== method: submitAnswer .. productId("+a+") .. questionId("+m+") .. campaignId("+d+")")},submitReview:function(a,m){g(b(c++)+"==> method: submitReview .. productId("+a+") .. campaignId("+m+")");q=a&&"string"===typeof a&&""!==a.trim()?a.trim():null;r=m&&"string"===typeof m&&""!==m.trim()?m.trim():null;var h={productId:e.getProductId(),
onEvent:function(a){}},d=e.getCampaignId();""!==d&&f.extend(h,{campaignId:d});try{$BV.ui("rr","submit_review",h)}catch(k){}g(b(--c)+"<== method: submitReview .. productId("+a+") .. campaignId("+d+")")},renderReviews:function(){g(b(c++)+"==> method: renderReviews");if(f("#BVRRSummaryContainer")[0]&&f("#BVRRContainer")[0]){g(b(c)+"Rendering ratings & reviews...");try{$BV.ui("rr","show_reviews",{productId:e.getProductId(),doShowContent:function(){e.doShowReviews()},onEvent:function(a){}})}catch(a){}}else g(b(c)+
"Required DIVs for ratings & reviews not found... skipping");g(b(--c)+"<== method: renderReviews")},renderQuestions:function(){g(b(c++)+"==> method: renderQuestions");if(f("#BVQASummaryContainer")[0]&&f("#BVQAContainer")[0]){g(b(c)+"Rendering questions & answers...");try{$BV.ui("qa","show_questions",{productId:e.getProductId(),subjectType:"product",doShowContent:function(){e.doShowQuestions()},onEvent:function(a){}})}catch(a){}}else g(b(c)+"Required DIVs for questions & answers not found... skipping");
g(b(--c)+"<== method: renderQuestions")},confGlobal:function(){g(b(c++)+"==> method: confGlobal");$BV.configure("global",{userToken:e.getUserToken(),productId:e.getProductId(),allowSamePageSubmission:!0,canSetPageTitle:!1,submissionUnavailableMessage:a.fn.getString("errSubmissionUnavailable"),onEvent:function(a){},doShowContent:function(){b(c)},doLogin:function(a,b){e.doLogin(a,b)},doShowSubmission:function(){e.doShowSubmission()},onSubmissionReturn:function(){e.onSubmissionReturn()},doScrollSubmission:function(){e.doScrollSubmission()}});
g(b(--c)+"<== method: confGlobal")},doLogin:function(f,g){b(c++);var h=n.location.href.replace(n.location.hash,""),d=a.fn.getUrl("BVDoLogin"),k=e.getUserToken(),l=decodeURIComponent(decodeURIComponent(decodeURIComponent(g))),l=-1<l.indexOf("expandquestion=")?l.replace(/^.*expandquestion=/,"").replace(/&.*$/,""):"";"undefined"!==typeof k&&""!==k?(b(c),f(k)):(h=a.fn.addUrlParameter("BVPCampaignId",e.getCampaignId(),h),h=a.fn.addUrlParameter("BVProductId",e.getProductId(),h),h=a.fn.addUrlParameter("BVQuestionId",
l,h),h=a.fn.removeUrlParameter("campaignId",h),d=a.fn.addUrlParameter("BVProductId",e.getProductId(),d),d=a.fn.addUrlParameter("BVDoLogin","yes",d),a.oQueryData.writeReview?d=a.fn.addUrlParameter("BVDoWriteReview","true",d):a.oQueryData.writeAnswer&&(d=a.fn.addUrlParameter("BVDoWriteAnswer","true",d)),d=a.fn.addUrlParameter("pageName",h,d),d=a.fn.addUrlParameter("returnPage",g,d),b(c),n.location=d);b(--c)},doShowSubmission:function(){g(b(c++)+"==> method: doShowSubmission");k="BV_doShowSubmission_"+
e.getProductId();a.eventTarget.append(f("<div/>").addClass(k).html('<div id="BVSubmissionContainer"></div>'));a.modalDialog.openDialog({wrapperSetting:{type:"html",showPreloader:!1,modalContentHTML:f("."+k)},uiDialiogSettings:{title:"",dialogClass:"BV_reviewSubmission",width:780,fixOverflow:!1,fixPosition:!1,close:function(f,e){q=null;k="";var h=n.location.href,d=n.location.href,g=n.location.hash,d=a.fn.removeUrlParameter("bvdisplaycode",d),d=a.fn.removeUrlParameter("bvappcode",d),d=a.fn.removeUrlParameter("bvproductid",
d),d=a.fn.removeUrlParameter("bvpage",d),d=a.fn.removeUrlParameter("bvcontenttype",d),d=a.fn.removeUrlParameter("bvauthenticateuser",d),d=a.fn.removeUrlParameter("showSubmitReviews",d),d=a.fn.removeUrlParameter("_requestid",d),d=a.fn.removeUrlParameter("showQuestions",d),d=a.fn.removeUrlParameter("showRatings",d),d=a.fn.removeUrlParameter("writeReview",d),d=a.fn.removeUrlParameter("writeAnswer",d),d=a.fn.removeUrlParameter("campaignId",d),d=a.fn.removeUrlParameter("userToken",d),d=a.fn.removeUrlParameter("BVDoLogin",
d),d=a.fn.removeUrlParameter("BVDoWriteReview",d),d=a.fn.removeUrlParameter("BVDoWriteAnswer",d),d=a.fn.removeUrlParameter("BVProductId",d),d=a.fn.removeUrlParameter("BVCampaignId",d),d=a.fn.removeUrlParameter("BVQuestionId",d),d=a.fn.removeUrlParameter("pageName",d),d=a.fn.removeUrlParameter("returnPage",d);a.oQueryData.eid&&(a.oQueryData.productId&&a.oQueryData.orderId)&&(d=a.fn.addUrlParameter("success","yes",d));d+=g;h!==d&&(b(c),b(c),b(c),n.location=d)}}});g(b(--c)+"<== method: doShowSubmission")},
onSubmissionReturn:function(){b(c++);f("."+k).closest("div.ui-dialog-content")[0]?(b(c),f("."+k).closest("div.ui-dialog-content").dialog("close")):b(c);b(--c)},doScrollSubmission:function(){b(c++);f("."+k).closest(".ui-dialog")[0]?(b(c),f("."+k).closest(".ui-dialog").scrollTo({topOffset:15})):b(c);b(--c)},selectTab:function(a){b(c++);if("undefined"!==typeof a&&f("#"+a)[0])try{var e=f("#"+a),g=e.closest(".categoryProductTabsData"),d=e.closest(".categoryProductTabs"),k=d.find(".categoryProductTabsData").index(g);
d.find(".ui-state-focus").removeClass("ui-state-focus");d.tabs({selected:k}).scrollTo({topOffset:35})}catch(l){}else b(c);b(--c)},isSubmissionModalOpen:function(){b(c++);var a=!1;try{""!==k&&(f("."+k).closest("div.ui-dialog-content")[0]&&!0===f("."+k).closest("div.ui-dialog-content").dialog("isOpen"))&&(a=!0)}catch(e){}b(c);b(--c);return a},doShowReviews:function(){b(c++);e.isSubmissionModalOpen()||e.selectTab("BVRRContainer");b(--c)},doShowQuestions:function(){b(c++);e.isSubmissionModalOpen()||e.selectTab("BVQAContainer");
b(--c)}},v=null,q=null,r=null,t=null,c=0,s=0,w=0;l.init=function(){b(c++);u?b(c):(b(c),"undefined"!==typeof $BV?(b(c),e.loadOnDOMReady()):(b(c),l.bvAPIWait()));b(--c)};l.bvAPIWait=function(){b(c++);"undefined"!==typeof $BV?(b(c),clearTimeout(w),s=1E3,l.init()):(b(c),1E3>s?(b(c),s+=1,w=n.setTimeout(l.bvAPIWait,50)):b(c));b(--c)};return l.init()}}()})(jQuery,this,this.document,BBB);
