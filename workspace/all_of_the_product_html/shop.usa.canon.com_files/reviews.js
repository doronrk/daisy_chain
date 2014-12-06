$BV.Internal.ajaxCallback(function(url,apiConfig){
if(!/(^|\.)(bazaarvoice\.com|canon\.com)(:\d+)?$/.test(location.hostname)){
throw "Bazaarvoice: Permission denied";
}
$BV.Internal.configureAppLoader("rr",false,{});
$BV.Internal.require(["rr/injection.rr","requester","rr/analyticsHooksRR","browserVersion","filtering","jquery.core","rr/feedbackStyle1RR","rr/analyticsInternalLegacyHooksRR","contentDisplay","dropdown","domUtils","parseUri","analyticsVersioning","analyticsHooks","cookies","magpie","magpieTracking","analyticsAutoTagHooks","animationQueueing","overlay","feedbackStyle1"],function(Injection){
var materials={"BVRRSecondaryRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRSecondaryRatingSummary\">\n\n<div class=\"BVRRRatingSummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"><div class=\"BVRRRatingSummaryNoReviews\"> <div id=\"BVRRRatingSummaryNoReviewsWriteImageLinkID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryNoReviewsWriteImageLink\">\n<a title=\"write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://canon.ugc.bazaarvoice.com/3798-e/36341/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fcanon.ugc.bazaarvoice.com%2F3798-e%2F36341%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_2_WriteReview_36341\" onclick=\"dcsMultiTrack('WT.ac','Bazaar Voice _ Write a Review','WT.ti','','DCS.dcsuri', '/consumer/controller','DCS.dcssip', 'reviews.usa.canon.com');\" href=\"javascript://\"> <img src=\"http://canon.ugc.bazaarvoice.com/static/3798-e/translucent.gif\" alt=\"Write a review\" />\n<\/a> <\/div>\n <div id=\"BVRRRatingSummaryLinkWriteFirstID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWriteFirst\">\n <span class=\"BVRRRatingSummaryLinkWriteFirstPrefix\">Be the first to<\/span>\n<a data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://canon.ugc.bazaarvoice.com/3798-e/36341/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fcanon.ugc.bazaarvoice.com%2F3798-e%2F36341%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_2_WriteReview_36341\" onclick=\"dcsMultiTrack('WT.ac','Bazaar Voice _ Write a Review','WT.ti','','DCS.dcsuri', '/consumer/controller','DCS.dcssip', 'reviews.usa.canon.com');\" href=\"javascript://\">write a review<\/a><span class=\"BVRRRatingSummaryLinkWriteFirstSuffix\">.<\/span> <\/div>\n<\/div><\/div><\/div><\/div> <\/div>\n","BVRRSourceID":" <div id=\"BVRRWidgetID\" class=\"BVRRRootElement BVRRWidget\">\n\n<div id=\"BVRRContentContainerID\" class=\"BVRRContainer\">\n\n\n\n\n\n\n<div id=\"BVRRDisplayContentID\" class=\"BVRRDisplayContent\"><div id=\"BVRRDisplayContentHeaderID\" class=\"BVRRHeader BVRRDisplayContentHeader\"><div class=\"BVRRDisplayContentHeaderContent\"><span id=\"BVRRDisplayContentTitleID\" class=\"BVRRTitle BVRRDisplayContentTitle\">Product Reviews<\/span><span id=\"BVRRDisplayContentSubtitleID\" class=\"BVRRSubtitle BVRRDisplayContentSubtitle\"><span id=\"BVRRDisplayContentLinkWriteID\" class=\"BVRRContentLink BVRRDisplayContentLinkWrite\"><a title=\"Review This Product\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://canon.ugc.bazaarvoice.com/3798-e/36341/writereview.djs?format=embeddedhtml&amp;campaignid=BV_REVIEW_DISPLAY&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fcanon.ugc.bazaarvoice.com%2F3798-e%2F36341%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Review_Display_WriteReview\" onclick=\"dcsMultiTrack('WT.ac','Bazaar Voice _ Write a Review','WT.ti','','DCS.dcsuri', '/consumer/controller','DCS.dcssip', 'reviews.usa.canon.com');\" href=\"javascript://\">Review This Product<\/a><\/span><\/span><span class=\"BVRRSortAndSearch\"><\/span><\/div><\/div><div id=\"BVRRDisplayContentBodyID\" class=\"BVRRDisplayContentBody\"><div id=\"BVRRDisplayContentNoReviewsID\" class=\"BVRRDisplayContentNoReviews\"><\/div><\/div><div id=\"BVRRDisplayContentFooterID\" class=\"BVRRFooter BVRRDisplayContentFooter\"><\/div><div class=\"BVRRSpacer BVRRDisplayContentSpacer\"><\/div><\/div>\n<\/div>\n <\/div>\n","BVRRRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRPrimarySummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"><div class=\"BVRRRatingSummaryNoReviews\"> <div id=\"BVRRRatingSummaryNoReviewsWriteImageLinkID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryNoReviewsWriteImageLink\">\n<a title=\"write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://canon.ugc.bazaarvoice.com/3798-e/36341/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fcanon.ugc.bazaarvoice.com%2F3798-e%2F36341%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_1_WriteReview_36341\" onclick=\"dcsMultiTrack('WT.ac','Bazaar Voice _ Write a Review','WT.ti','','DCS.dcsuri', '/consumer/controller','DCS.dcssip', 'reviews.usa.canon.com');\" href=\"javascript://\"> <img src=\"http://canon.ugc.bazaarvoice.com/static/3798-e/translucent.gif\" alt=\"Write a review\" />\n<\/a> <\/div>\n <div id=\"BVRRRatingSummaryLinkWriteFirstID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWriteFirst\">\n <span class=\"BVRRRatingSummaryLinkWriteFirstPrefix\">Be the first to<\/span>\n<a data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://canon.ugc.bazaarvoice.com/3798-e/36341/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fcanon.ugc.bazaarvoice.com%2F3798-e%2F36341%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_1_WriteReview_36341\" onclick=\"dcsMultiTrack('WT.ac','Bazaar Voice _ Write a Review','WT.ti','','DCS.dcsuri', '/consumer/controller','DCS.dcssip', 'reviews.usa.canon.com');\" href=\"javascript://\">write a review<\/a><span class=\"BVRRRatingSummaryLinkWriteFirstSuffix\">.<\/span> <\/div>\n<\/div><\/div><\/div><a id=\"BVSubmissionLink\" data-bvcfg=\"__CONFIGKEY__\" style=\"display: none;\" data-bvjsref=\"http://canon.ugc.bazaarvoice.com/3798-e/36341/writereview.djs?format=embeddedhtml&amp;campaignid=BV_SUBMISSIONLINK&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fcanon.ugc.bazaarvoice.com%2F3798-e%2F36341%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" onclick=\"dcsMultiTrack('WT.ac','Bazaar Voice _ Write a Review','WT.ti','','DCS.dcsuri', '/consumer/controller','DCS.dcssip', 'reviews.usa.canon.com');\" href=\"javascript://\"><\/a>\n <\/div>\n"},
initializers={"BVRRSecondaryRatingSummarySourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVRRSourceID":[{"module":"requester","data":{},"init":"bindJsLinks"},{"module":"rr/feedbackStyle1RR","data":{"helpfulnessMessage":"Vote recorded. Vote may take up to 12 hours to display.","inappropriateMessage":"Thank you for your feedback."},"init":"feedbackStatus"}],"BVRRRatingSummarySourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}]},
widgets={};
widgets["content"]={"handledContentTypes":["Review","Comment"],"containerId":"BVRRContainer","sourceId":"BVRRSourceID"};
widgets["secondarySummary"]={"containerId":"BVRRSecondarySummaryContainer","sourceId":"BVRRSecondaryRatingSummarySourceID"};
widgets["summary"]={"containerId":"BVRRSummaryContainer","sourceId":"BVRRRatingSummarySourceID"};
var injectionData={
apiConfig:apiConfig,
containerInitializer:false,
cookiePath:"/",
crossDomainUrl:"http://canon.ugc.bazaarvoice.com/3798-e/crossdomain.htm?format=embedded",
embeddedUrl:url,
globalInitializers:[{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSummaryContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSecondarySummaryContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRContainer"}},{"module":"dropdown","init":"addSelectHandlers","data":{"dropdownsName":"BV_TrackingTag_Review_Display_Sort"}},{"module":"filtering","init":"bindFilteringHandlers","data":{"idPrefix":"BVRR","activeItemIndex":-1,"disableMouseDown":false,"mouseOutHandlerName":"bvrrFilteringMouseout","containerId":"BVRRAttributeFilteringContentID","cssPrefix":"BVDI_AF"}}],
gotoCookieRegexp:/^https?:\/\/[^/?#]+(\/[^?#]*)\//,
inFrameSubmissionEnabled:false,
pageIdPrefix:"BVRR",
pageTrackers:["http://canon.ugc.bazaarvoice.com/static/3798-e/r_0_ispacer.gif"],
postInjectionFunction:function(Inject){
window.bvScrollToElement();
},
productId:"36341",
replaceDisplayTokens:true,
replacementsPrefix:"BVRR",
replaceSessionParameters:false,
returnURLFixedValue:"",
returnURLForceRelativeToRoot:true,
setWindowTitle:false,
soiContainerID:"BVRRContentValidationID_36341",
soiContentIDs:[],
sviParameterName:"bvrrp",
sviRedirectBaseUrl:"",
webAnalyticsConfig:{"customTrackedObjects":"","customizersName":"BVRRAnalyticsCustomizers","customContainersFnName":"BVRRAnalyticsCustomContainers","conversionTracking":{"conversionTrackingElementSelector":null,"conversionTrackingMetadataSelector":null,"conversionTrackingParseRegexp":null,"conversionTrackingName":"AddToCart"},"SIWZeroDeployEnabled":false,"maxTrackingTagTraversalDepth":3,"customTrackedObjectsSelector":"","jsonData":{"bvProduct":"RatingsAndReviews","autoTagAnalyticsConfiguration":{"trackSubmissionPageLoads":true,"autoTagAnalyticsVersion":"latest","trackFormActions":false,"productTracking":{"tracking":true,"initialProductDisplay":false},"vendors":[{"vendorName":"magpie","anonymous":false,"brandDomain":"false","defaultClassesOnly":false}]},"bvExtension":{},"bvAnalyticsVersion":"","productId":"36341","eType":"Read","bvDisplayCode":"3798-e","rootCategoryId":"0901e02480069f6b","subjectType":"Product","brand":"","analyticsWhitespaceTrackingEnabled":false,"attributes":{"numRatingsOnlyReviews":0,"numReviews":0,"percentRecommend":0,"avgRating":0E-12},"ciTrackingEnabled":false,"bvClientName":"Canon","leafCategoryId":"0901e02480069fc4"}},
widgetInitializers:initializers,
widgetLimit:1,
widgetMaterials:materials,
widgetMetadata:widgets,
windowTitle:null};
Injection.newInstance().apiInjection(injectionData);
});
});