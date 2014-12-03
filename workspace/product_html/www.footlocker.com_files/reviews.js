$BV.Internal.ajaxCallback(function(url,apiConfig){
if(!/(^|\.)(answers\.footlocker\.uat\.msp\.lashoes\.guidance\.com|bazaarvoice\.com|footlocker\.com|reviews\.eastbay\.com|reviews\.footlocker\.uat\.msp\.lashoes\.guidance\.com)(:\d+)?$/.test(location.hostname)){
throw "Bazaarvoice: Permission denied";
}
$BV.Internal.configureAppLoader("rr",false,{});
$BV.Internal.require(["rr/injection.rr","feedback","requester","rr/analyticsHooksRR","browserVersion","jquery.core","rr/contentFocusingSupportRR","rr/analyticsInternalLegacyHooksRR","contentDisplay","dropdown","domUtils","parseUri","cookies","analyticsVersioning","analyticsHooks","magpie","magpieTracking","analyticsAutoTagHooks","animationOptions","socialConnect","facebookConnect","facebookOpenGraph","jquery.effects.core","contentFocusingSupport"],function(Injection){
var materials={"BVRRSecondaryRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRSecondaryRatingSummary\">\n\n<div class=\"BVRRRatingSummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"><div class=\"BVRRRatingSummaryNoReviews\"> <div id=\"BVRRRatingSummaryNoReviewsWriteImageLinkID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryNoReviewsWriteImageLink\">\n<a title=\"write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://footlocker.ugc.bazaarvoice.com/8001/244939/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Ffootlocker.ugc.bazaarvoice.com%2F8001%2F244939%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_2_WriteReview_244939\" onclick=\"bvShowContentOnReturnPRR('8001', '244939', 'BVRRWidgetID');\" href=\"javascript://\"> <img src=\"http://footlocker.ugc.bazaarvoice.com/static/8001/translucent.gif\" alt=\"Write a review\" />\n<\/a> <\/div>\n <div id=\"BVRRRatingSummaryLinkWriteFirstID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWriteFirst\">\n <span class=\"BVRRRatingSummaryLinkWriteFirstPrefix\">Be the first to<\/span>\n<a data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://footlocker.ugc.bazaarvoice.com/8001/244939/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Ffootlocker.ugc.bazaarvoice.com%2F8001%2F244939%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_2_WriteReview_244939\" onclick=\"bvShowContentOnReturnPRR('8001', '244939', 'BVRRWidgetID');\" href=\"javascript://\">write a review<\/a><span class=\"BVRRRatingSummaryLinkWriteFirstSuffix\"><\/span> <\/div>\n<\/div><\/div><\/div><\/div> <\/div>\n","BVRRSourceID":" <div id=\"BVRRWidgetID\" class=\"BVRRRootElement BVRRWidget\">\n\n<div id=\"BVRRContentContainerID\" class=\"BVRRContainer\">\n\n\n\n\n\n\n<div id=\"BVRRDisplayContentID\" class=\"BVRRDisplayContent\"><div id=\"BVRRDisplayContentHeaderID\" class=\"BVRRHeader BVRRDisplayContentHeader\"><div class=\"BVRRDisplayContentHeaderContent\"><span id=\"BVRRDisplayContentTitleID\" class=\"BVRRTitle BVRRDisplayContentTitle\">Product Reviews<\/span><span id=\"BVRRDisplayContentSubtitleID\" class=\"BVRRSubtitle BVRRDisplayContentSubtitle\"><span id=\"BVRRDisplayContentLinkWriteID\" class=\"BVRRContentLink BVRRDisplayContentLinkWrite\"><a title=\"Review This Product\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://footlocker.ugc.bazaarvoice.com/8001/244939/writereview.djs?format=embeddedhtml&amp;campaignid=BV_REVIEW_DISPLAY&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Ffootlocker.ugc.bazaarvoice.com%2F8001%2F244939%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Review_Display_WriteReview\" onclick=\"bvShowContentOnReturnPRR('8001', '244939', '');\" href=\"javascript://\">Review This Product<\/a><\/span><\/span><span class=\"BVRRSortAndSearch\"><\/span><\/div><\/div><div id=\"BVRRDisplayContentBodyID\" class=\"BVRRDisplayContentBody\"><div id=\"BVRRDisplayContentNoReviewsID\" class=\"BVRRDisplayContentNoReviews\"><\/div><\/div><div id=\"BVRRDisplayContentFooterID\" class=\"BVRRFooter BVRRDisplayContentFooter\"><\/div><div class=\"BVRRSpacer BVRRDisplayContentSpacer\"><\/div><\/div>\n<div id=\"BVRRFilteringBusyOverlayHighlightID\" class=\"BVDI_FBOverlayHighlight BVDIOverlay BVDIHidden\"><div class=\"BVDI_FBImage\"><img src=\"http://footlocker.ugc.bazaarvoice.com/static/8001/filteringBusy.gif\" alt=\"Filtering is in progress. Please wait until it completes.\" title=\"Filtering is in progress. Please wait until it completes.\"/><\/div><\/div><\/div>\n <\/div>\n","BVRRRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRPrimarySummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"><div class=\"BVRRRatingSummaryNoReviews\"> <div id=\"BVRRRatingSummaryNoReviewsWriteImageLinkID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryNoReviewsWriteImageLink\">\n<a title=\"write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://footlocker.ugc.bazaarvoice.com/8001/244939/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Ffootlocker.ugc.bazaarvoice.com%2F8001%2F244939%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_1_WriteReview_244939\" onclick=\"bvShowContentOnReturnPRR('8001', '244939', 'BVRRWidgetID');\" href=\"javascript://\"> <img src=\"http://footlocker.ugc.bazaarvoice.com/static/8001/translucent.gif\" alt=\"Write a review\" />\n<\/a> <\/div>\n <div id=\"BVRRRatingSummaryLinkWriteFirstID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWriteFirst\">\n <span class=\"BVRRRatingSummaryLinkWriteFirstPrefix\">Be the first to<\/span>\n<a data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://footlocker.ugc.bazaarvoice.com/8001/244939/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Ffootlocker.ugc.bazaarvoice.com%2F8001%2F244939%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_1_WriteReview_244939\" onclick=\"bvShowContentOnReturnPRR('8001', '244939', 'BVRRWidgetID');\" href=\"javascript://\">write a review<\/a><span class=\"BVRRRatingSummaryLinkWriteFirstSuffix\"><\/span> <\/div>\n<\/div><\/div><\/div><a id=\"BVSubmissionLink\" data-bvcfg=\"__CONFIGKEY__\" style=\"display: none;\" data-bvjsref=\"http://footlocker.ugc.bazaarvoice.com/8001/244939/writereview.djs?format=embeddedhtml&amp;campaignid=BV_SUBMISSIONLINK&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Ffootlocker.ugc.bazaarvoice.com%2F8001%2F244939%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" onclick=\"bvShowContentOnReturnPRR('8001', '244939', '');\" href=\"javascript://\"><\/a>\n <\/div>\n"},
initializers={"BVRRSecondaryRatingSummarySourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVRRSourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVRRRatingSummarySourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}]},
widgets={};
widgets["content"]={"handledContentTypes":["Review","Comment"],"containerId":"BVRRContainer","sourceId":"BVRRSourceID"};
widgets["secondarySummary"]={"containerId":"BVRRSecondarySummaryContainer","sourceId":"BVRRSecondaryRatingSummarySourceID"};
widgets["summary"]={"containerId":"BVRRSummaryContainer","sourceId":"BVRRRatingSummarySourceID"};
var injectionData={
apiConfig:apiConfig,
containerInitializer:false,
cookiePath:"/",
crossDomainUrl:"http://footlocker.ugc.bazaarvoice.com/8001/crossdomain.htm?format=embedded",
embeddedUrl:url,
globalInitializers:[{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSummaryContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSecondarySummaryContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRContainer"}},{"module":"dropdown","init":"addSelectHandlers","data":{"dropdownsName":"BV_TrackingTag_Review_Display_Sort"}},{"module":"feedback","init":"onInjection","data":{"id":"Product_e4hir13rvz3sse58j1m1simcy","options":{"cookiePrefixes":{"Voting":"pfv"},"cookiePath":"/","contentFocusing":{"args":["8001","244939"],"fn":"bvShowContentOnReturnPRR"}}}},{"module":"feedback","init":"onInjection","data":{"id":"Review_e4hir13rvz3sse58j1m1simcy","options":{"cookiePrefixes":{"Inappropriate":"rif","Voting":"rfv"},"cookiePath":"/","contentFocusing":{"args":["8001","244939"],"fn":"bvShowContentOnReturnPRR"}}}},{"module":"feedback","init":"onInjection","data":{"id":"ReviewComment_e4hir13rvz3sse58j1m1simcy","options":{"cookiePrefixes":{"Inappropriate":"cif","Voting":"cfv"},"cookiePath":"/","contentFocusing":{"args":["8001","244939"],"fn":"bvShowContentOnReturnPRR"}}}},{"module":"rr/contentFocusingSupportRR","init":"postInjection","data":{"application":"PRR","source":"readLink","defaultContentContainerId":"BVRRContainer","tabSwitcher":"bvShowTab","displayCode":"8001"}}],
gotoCookieRegexp:/^https?:\/\/[^/?#]+(\/[^?#]*)\//,
inFrameSubmissionEnabled:false,
pageIdPrefix:"BVRR",
pageTrackers:["http://footlocker.ugc.bazaarvoice.com/static/8001/r_0_ispacer.gif"],
postInjectionFunction:function(Inject){
window.bvScrollToElement();
},
productId:"244939",
replaceDisplayTokens:true,
replacementsPrefix:"BVRR",
replaceSessionParameters:false,
returnURLFixedValue:"",
returnURLForceRelativeToRoot:true,
setWindowTitle:false,
soiContainerID:"BVRRContentValidationID_244939",
soiContentIDs:[],
sviParameterName:"bvrrp",
sviRedirectBaseUrl:"http://footlocker.ugc.bazaarvoice.com/8001/",
webAnalyticsConfig:{"customTrackedObjects":[{"selector":"#pdp_tab_reviews a"}],"customizersName":"BVRRAnalyticsCustomizers","customContainersFnName":"BVRRAnalyticsCustomContainers","conversionTracking":{"conversionTrackingElementSelector":null,"conversionTrackingMetadataSelector":null,"conversionTrackingParseRegexp":null,"conversionTrackingName":"AddToCart"},"SIWZeroDeployEnabled":false,"maxTrackingTagTraversalDepth":3,"customTrackedObjectsSelector":"","jsonData":{"bvProduct":"RatingsAndReviews","autoTagAnalyticsConfiguration":{"trackSubmissionPageLoads":true,"autoTagAnalyticsVersion":"4.6","trackFormActions":false,"productTracking":{"tracking":true,"initialProductDisplay":false},"vendors":[{"vendorName":"coremetrics","signature":"pageCategorySearch"},{"vendorName":"magpie","anonymous":false,"brandDomain":"false","defaultClassesOnly":false}]},"bvExtension":{},"bvAnalyticsVersion":"4.7","productId":"244939","eType":"Read","bvDisplayCode":"8001","rootCategoryId":"Casual_Basketball_Shoes","subjectType":"Product","brand":"Nike","analyticsWhitespaceTrackingEnabled":false,"attributes":{"numRatingsOnlyReviews":0,"numReviews":0,"percentRecommend":0,"avgRating":0E-12},"ciTrackingEnabled":false,"bvClientName":"Footlocker","leafCategoryId":"Casual_Basketball_Shoes"}},
widgetInitializers:initializers,
widgetLimit:1,
widgetMaterials:materials,
widgetMetadata:widgets,
windowTitle:null};
Injection.newInstance().apiInjection(injectionData);
});
});