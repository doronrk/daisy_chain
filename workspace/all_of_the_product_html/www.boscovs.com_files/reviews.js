$BV.Internal.ajaxCallback(function(url,apiConfig){
if(!/(^|\.)(bazaarvoice\.com|boscov\.com|boscovs\.com)(:\d+)?$/.test(location.hostname)){
throw "Bazaarvoice: Permission denied";
}
$BV.Internal.configureAppLoader("rr",false,{});
$BV.Internal.require(["rr/injection.rr","requester","rr/analyticsHooksRR","browserVersion","jquery.core","rr/feedbackStyle1RR","rr/contentFocusingSupportRR","rr/analyticsInternalLegacyHooksRR","contentDisplay","dropdown","domUtils","parseUri","analyticsVersioning","analyticsHooks","cookies","magpie","magpieTracking","analyticsAutoTagHooks","feedbackStyle1","contentFocusingSupport"],function(Injection){
var materials={"BVRRSecondaryRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRSecondaryRatingSummary\">\n\n<div class=\"BVRRRatingSummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"><div class=\"BVRRRatingSummaryNoReviews\"> <div id=\"BVRRRatingSummaryNoReviewsWriteImageLinkID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryNoReviewsWriteImageLink\">\n<a title=\"write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://boscovs.ugc.bazaarvoice.com/6514-en_us/326791/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fboscovs.ugc.bazaarvoice.com%2F6514-en_us%2F326791%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_2_WriteReview_326791\" onclick=\"bvShowContentOnReturnPRR('6514-en_us', '326791', 'BVRRWidgetID');\" href=\"javascript://\"> <img src=\"http://boscovs.ugc.bazaarvoice.com/static/6514-en_us/translucent.gif\" alt=\"Write a review\" />\n<\/a> <\/div>\n <div id=\"BVRRRatingSummaryLinkWriteFirstID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWriteFirst\">\n <span class=\"BVRRRatingSummaryLinkWriteFirstPrefix\"><\/span>\n<a data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://boscovs.ugc.bazaarvoice.com/6514-en_us/326791/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fboscovs.ugc.bazaarvoice.com%2F6514-en_us%2F326791%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_2_WriteReview_326791\" onclick=\"bvShowContentOnReturnPRR('6514-en_us', '326791', 'BVRRWidgetID');\" href=\"javascript://\">Write the first review<\/a><span class=\"BVRRRatingSummaryLinkWriteFirstSuffix\"><\/span> <\/div>\n<\/div><div class=\"BVRRSocialBookmarkingLinks\"><div class=\"BVRRProductBookmarkingLabel\">Share this product<\/div>\n<a name=\"BV_TrackingTag_Rating_Summary_2_SocialBookmarkFacebook_326791\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkFacebook\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=626,height=436,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.boscovs.com/6514-en_us/share.htm?site=Facebook&amp;url=http%3A%2F%2Fwww.boscovs.com%2Fshop%2Fprod%2Frosetti-holiday-party-crossbody-ice%2F326791.htm&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Fwwws.boscovs.com%2Fwcsstore%2Fboscovs%2Fimages%2Fstore%2Fproduct%2Fthumbnails%2F32836315811ena08rsbcicet.jpg\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://boscovs.ugc.bazaarvoice.com/static/6514-en_us/link-facebook.gif\"\n alt=\"Facebook\"\n title=\"Add to Facebook\"/><\/a>\n\n<a name=\"BV_TrackingTag_Rating_Summary_2_SocialBookmarkTwitter_326791\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkTwitter\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=795,height=700,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.boscovs.com/6514-en_us/share.htm?site=Twitter&amp;url=http%3A%2F%2Fwww.boscovs.com%2Fshop%2Fprod%2Frosetti-holiday-party-crossbody-ice%2F326791.htm&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Fwwws.boscovs.com%2Fwcsstore%2Fboscovs%2Fimages%2Fstore%2Fproduct%2Fthumbnails%2F32836315811ena08rsbcicet.jpg\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://boscovs.ugc.bazaarvoice.com/static/6514-en_us/link-twitter.gif\"\n alt=\"Twitter\"\n title=\"Tweet this\"/><\/a>\n\n<a name=\"BV_TrackingTag_Rating_Summary_2_SocialBookmarkDigg_326791\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkDigg\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=900,height=600,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.boscovs.com/6514-en_us/share.htm?site=Digg&amp;url=http%3A%2F%2Fwww.boscovs.com%2Fshop%2Fprod%2Frosetti-holiday-party-crossbody-ice%2F326791.htm&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Fwwws.boscovs.com%2Fwcsstore%2Fboscovs%2Fimages%2Fstore%2Fproduct%2Fthumbnails%2F32836315811ena08rsbcicet.jpg\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://boscovs.ugc.bazaarvoice.com/static/6514-en_us/link-digg.gif\"\n alt=\"Digg\"\n title=\"Digg this\"/><\/a>\n<\/div><\/div><\/div><\/div> <\/div>\n","BVRRSourceID":" <div id=\"BVRRWidgetID\" class=\"BVRRRootElement BVRRWidget\">\n\n<div id=\"BVRRContentContainerID\" class=\"BVRRContainer\">\n\n\n\n\n\n\n<div id=\"BVRRDisplayContentID\" class=\"BVRRDisplayContent BVRRNoContent\">\n<div id=\"BVRRDisplayContentNoReviewsImageID\" class=\"BVRRDisplayContentNoReviewsImage\"><a title=\"write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://boscovs.ugc.bazaarvoice.com/6514-en_us/326791/writereview.djs?format=embeddedhtml&amp;campaignid=BV_REVIEW_DISPLAY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fboscovs.ugc.bazaarvoice.com%2F6514-en_us%2F326791%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Review_Display_WriteReview\" onclick=\"bvShowContentOnReturnPRR('6514-en_us', '326791', '');\" href=\"javascript://\"><img src=\"http://boscovs.ugc.bazaarvoice.com/static/6514-en_us/translucent.gif\" alt=\"write a review\" /><\/a><\/div>\n<div id=\"BVRRDisplayContentNoReviewsID\" class=\"BVRRDisplayContentNoReviews\">Be the first to <a title=\"write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://boscovs.ugc.bazaarvoice.com/6514-en_us/326791/writereview.djs?format=embeddedhtml&amp;campaignid=BV_REVIEW_DISPLAY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fboscovs.ugc.bazaarvoice.com%2F6514-en_us%2F326791%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Review_Display_WriteReview\" onclick=\"bvShowContentOnReturnPRR('6514-en_us', '326791', '');\" href=\"javascript://\">write a review<\/a><\/div><\/div>\n<div id=\"BVRRFilteringBusyOverlayHighlightID\" class=\"BVDI_FBOverlayHighlight BVDIOverlay BVDIHidden\"><div class=\"BVDI_FBImage\"><img src=\"http://boscovs.ugc.bazaarvoice.com/static/6514-en_us/filteringBusy.gif\" alt=\"Filtering is in progress. Please wait until it completes.\" title=\"Filtering is in progress. Please wait until it completes.\"/><\/div><\/div><\/div>\n <\/div>\n","BVRRRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRPrimarySummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"><div class=\"BVRRRatingSummaryNoReviews\"> <div id=\"BVRRRatingSummaryNoReviewsWriteImageLinkID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryNoReviewsWriteImageLink\">\n<a title=\"write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://boscovs.ugc.bazaarvoice.com/6514-en_us/326791/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fboscovs.ugc.bazaarvoice.com%2F6514-en_us%2F326791%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_1_WriteReview_326791\" onclick=\"bvShowContentOnReturnPRR('6514-en_us', '326791', 'BVRRWidgetID');\" href=\"javascript://\"> <img src=\"http://boscovs.ugc.bazaarvoice.com/static/6514-en_us/translucent.gif\" alt=\"Write a review\" />\n<\/a> <\/div>\n <div id=\"BVRRRatingSummaryLinkWriteFirstID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWriteFirst\">\n <span class=\"BVRRRatingSummaryLinkWriteFirstPrefix\"><\/span>\n<a data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://boscovs.ugc.bazaarvoice.com/6514-en_us/326791/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fboscovs.ugc.bazaarvoice.com%2F6514-en_us%2F326791%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_1_WriteReview_326791\" onclick=\"bvShowContentOnReturnPRR('6514-en_us', '326791', 'BVRRWidgetID');\" href=\"javascript://\">Write the first review<\/a><span class=\"BVRRRatingSummaryLinkWriteFirstSuffix\"><\/span> <\/div>\n<\/div><div class=\"BVRRSocialBookmarkingLinks\"><div class=\"BVRRProductBookmarkingLabel\">Share this product<\/div>\n<a name=\"BV_TrackingTag_Rating_Summary_1_SocialBookmarkFacebook_326791\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkFacebook\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=626,height=436,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.boscovs.com/6514-en_us/share.htm?site=Facebook&amp;url=http%3A%2F%2Fwww.boscovs.com%2Fshop%2Fprod%2Frosetti-holiday-party-crossbody-ice%2F326791.htm&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Fwwws.boscovs.com%2Fwcsstore%2Fboscovs%2Fimages%2Fstore%2Fproduct%2Fthumbnails%2F32836315811ena08rsbcicet.jpg\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://boscovs.ugc.bazaarvoice.com/static/6514-en_us/link-facebook.gif\"\n alt=\"Facebook\"\n title=\"Add to Facebook\"/><\/a>\n\n<a name=\"BV_TrackingTag_Rating_Summary_1_SocialBookmarkTwitter_326791\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkTwitter\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=795,height=700,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.boscovs.com/6514-en_us/share.htm?site=Twitter&amp;url=http%3A%2F%2Fwww.boscovs.com%2Fshop%2Fprod%2Frosetti-holiday-party-crossbody-ice%2F326791.htm&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Fwwws.boscovs.com%2Fwcsstore%2Fboscovs%2Fimages%2Fstore%2Fproduct%2Fthumbnails%2F32836315811ena08rsbcicet.jpg\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://boscovs.ugc.bazaarvoice.com/static/6514-en_us/link-twitter.gif\"\n alt=\"Twitter\"\n title=\"Tweet this\"/><\/a>\n\n<a name=\"BV_TrackingTag_Rating_Summary_1_SocialBookmarkDigg_326791\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkDigg\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=900,height=600,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.boscovs.com/6514-en_us/share.htm?site=Digg&amp;url=http%3A%2F%2Fwww.boscovs.com%2Fshop%2Fprod%2Frosetti-holiday-party-crossbody-ice%2F326791.htm&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Fwwws.boscovs.com%2Fwcsstore%2Fboscovs%2Fimages%2Fstore%2Fproduct%2Fthumbnails%2F32836315811ena08rsbcicet.jpg\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://boscovs.ugc.bazaarvoice.com/static/6514-en_us/link-digg.gif\"\n alt=\"Digg\"\n title=\"Digg this\"/><\/a>\n<\/div><\/div><\/div><a id=\"BVSubmissionLink\" data-bvcfg=\"__CONFIGKEY__\" style=\"display: none;\" data-bvjsref=\"http://boscovs.ugc.bazaarvoice.com/6514-en_us/326791/writereview.djs?format=embeddedhtml&amp;campaignid=BV_SUBMISSIONLINK&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fboscovs.ugc.bazaarvoice.com%2F6514-en_us%2F326791%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" onclick=\"bvShowContentOnReturnPRR('6514-en_us', '326791', '');\" href=\"javascript://\"><\/a>\n <\/div>\n"},
initializers={"BVRRSecondaryRatingSummarySourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVRRSourceID":[{"module":"requester","data":{},"init":"bindJsLinks"},{"module":"rr/feedbackStyle1RR","data":{"helpfulnessMessage":"Vote recorded. Vote may take up to 12 hours to display.","inappropriateMessage":"Thank you for your feedback."},"init":"feedbackStatus"}],"BVRRRatingSummarySourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}]},
widgets={};
widgets["content"]={"handledContentTypes":["Review","Comment"],"containerId":"BVRRContainer","sourceId":"BVRRSourceID"};
widgets["secondarySummary"]={"containerId":"BVRRSecondarySummaryContainer","sourceId":"BVRRSecondaryRatingSummarySourceID"};
widgets["summary"]={"containerId":"BVRRSummaryContainer","sourceId":"BVRRRatingSummarySourceID"};
var injectionData={
apiConfig:apiConfig,
containerInitializer:false,
cookiePath:"/",
crossDomainUrl:"http://boscovs.ugc.bazaarvoice.com/6514-en_us/crossdomain.htm?format=embedded",
embeddedUrl:url,
globalInitializers:[{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSummaryContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSecondarySummaryContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRContainer"}},{"module":"dropdown","init":"addSelectHandlers","data":{"dropdownsName":"BV_TrackingTag_Review_Display_Sort"}},{"module":"rr/contentFocusingSupportRR","init":"postInjection","data":{"application":"PRR","source":"readLink","defaultContentContainerId":"BVRRContainer","tabSwitcher":"bvShowTab","displayCode":"6514-en_us"}}],
gotoCookieRegexp:/^https?:\/\/[^/?#]+(\/[^?#]*)\//,
inFrameSubmissionEnabled:false,
pageIdPrefix:"BVRR",
pageTrackers:["http://boscovs.ugc.bazaarvoice.com/static/6514-en_us/r_0_ispacer.gif"],
postInjectionFunction:function(Inject){
window.bvScrollToElement();
},
productId:"326791",
replaceDisplayTokens:true,
replacementsPrefix:"BVRR",
replaceSessionParameters:false,
returnURLFixedValue:"",
returnURLForceRelativeToRoot:true,
setWindowTitle:false,
soiContainerID:"BVRRContentValidationID_326791",
soiContentIDs:[],
sviParameterName:"bvrrp",
sviRedirectBaseUrl:"",
webAnalyticsConfig:{"customTrackedObjects":"","customizersName":"BVRRAnalyticsCustomizers","customContainersFnName":"BVRRAnalyticsCustomContainers","conversionTracking":{"conversionTrackingElementSelector":null,"conversionTrackingMetadataSelector":null,"conversionTrackingParseRegexp":null,"conversionTrackingName":"AddToCart"},"SIWZeroDeployEnabled":false,"maxTrackingTagTraversalDepth":3,"customTrackedObjectsSelector":"","jsonData":{"bvProduct":"RatingsAndReviews","autoTagAnalyticsConfiguration":{"trackSubmissionPageLoads":true,"autoTagAnalyticsVersion":"latest","trackFormActions":false,"productTracking":{"tracking":true,"initialProductDisplay":false},"vendors":[{"vendorName":"magpie","anonymous":false,"brandDomain":"false","defaultClassesOnly":false}]},"bvExtension":{},"bvAnalyticsVersion":"4.9","productId":"326791","eType":"Read","bvDisplayCode":"6514-en_us","rootCategoryId":"BV_MISCELLANEOUS_CATEGORY","subjectType":"Product","brand":"Rosetti","analyticsWhitespaceTrackingEnabled":false,"attributes":{"numRatingsOnlyReviews":0,"numReviews":0,"percentRecommend":0,"avgRating":0E-12},"ciTrackingEnabled":false,"bvClientName":"Boscovs","leafCategoryId":"BV_MISCELLANEOUS_CATEGORY"}},
widgetInitializers:initializers,
widgetLimit:1,
widgetMaterials:materials,
widgetMetadata:widgets,
windowTitle:null};
Injection.newInstance().apiInjection(injectionData);
});
});