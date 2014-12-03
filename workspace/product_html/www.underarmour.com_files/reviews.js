$BV.Internal.ajaxCallback(function(url,apiConfig){
if(!/(^|\.)(bazaarvoice\.com|underarmour\.com)(:\d+)?$/.test(location.hostname)){
throw "Bazaarvoice: Permission denied";
}
$BV.Internal.configureAppLoader("rr",false,{"cmn/2471redes2/analyticsInternalHooks":"analyticsHooks","cmn/2471redes3/analyticsInternalHooks":"analyticsHooks"});
$BV.Internal.require(["rr/injection.rr","feedback","requester","rr/analyticsHooksRR","browserVersion","jquery.core","rr/contentFocusingSupportRR","rr/analyticsInternalLegacyHooksRR","contentDisplay","dropdown","domUtils","parseUri","cookies","analyticsVersioning","analyticsHooks","cmn/2471redes3/selectReplacer","cmn/2471redes3/analyticsInternalHooks","cmn/2471redes2/selectReplacer","cmn/2471redes2/analyticsInternalHooks","magpie","magpieTracking","analyticsAutoTagHooks","jquery.effects.core","animationOptions","contentFocusingSupport"],function(Injection){
var materials={"BVRRSecondaryRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRSecondaryRatingSummary\">\n\n<div class=\"BVRRRatingSummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"> <div class=\"BVRRRatingSummaryNoReviews\">\n <div class=\"BVRRNoContentCustomHeader\">\nProduct Reviews (<span>0<\/span>) <\/div>\n <div id=\"BVRRRatingSummaryNoReviewsWriteImageLinkID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryNoReviewsWriteImageLink\">\n<a title=\"write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"https://underarmour.ugc.bazaarvoice.com/2471redes2/1253910/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=https%3A%2F%2Funderarmour.ugc.bazaarvoice.com%2F2471redes2%2F1253910%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_2_WriteReview_1253910\" onclick=\"bvShowContentOnReturnPRR('2471redes2', '1253910', 'BVRRWidgetID');\" href=\"javascript://\"> <img src=\"https://underarmour.ugc.bazaarvoice.com/static/2471redes2/translucent.png\" alt=\"Write a review\" />\n<\/a> <\/div>\n <div id=\"BVRRRatingSummaryLinkWriteFirstID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWriteFirst\">\n <span class=\"BVRRRatingSummaryLinkWriteFirstPrefix\"><\/span>\n<a data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"https://underarmour.ugc.bazaarvoice.com/2471redes2/1253910/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=https%3A%2F%2Funderarmour.ugc.bazaarvoice.com%2F2471redes2%2F1253910%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_2_WriteReview_1253910\" onclick=\"bvShowContentOnReturnPRR('2471redes2', '1253910', 'BVRRWidgetID');\" href=\"javascript://\">Write the first review<\/a><span class=\"BVRRRatingSummaryLinkWriteFirstSuffix\"><\/span> <\/div>\n <\/div>\n<\/div><\/div><\/div> <\/div>\n","BVRRSourceID":" <div id=\"BVRRWidgetID\" class=\"BVRRRootElement BVRRWidget\">\n\r\n<div id=\"BVRRContentContainerID\" class=\"BVRRContainer\">\r\n\r\n\r\n\r\n\n\r\n <div id=\"BVRRDisplayContentID\" class=\"BVRRDisplayContent BVRRNoContent\">\r\n <div class=\"BVRRNoContentCustomHeader\"><span>0<\/span> Reviews<\/div>\r\n\n<div id=\"BVRRDisplayContentNoReviewsImageID\" class=\"BVRRDisplayContentNoReviewsImage\"><a title=\"write the first review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"https://underarmour.ugc.bazaarvoice.com/2471redes2/1253910/writereview.djs?format=embeddedhtml&amp;campaignid=BV_REVIEW_DISPLAY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=https%3A%2F%2Funderarmour.ugc.bazaarvoice.com%2F2471redes2%2F1253910%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Review_Display_WriteReview\" onclick=\"bvShowContentOnReturnPRR('2471redes2', '1253910', '');\" href=\"javascript://\"><img src=\"https://underarmour.ugc.bazaarvoice.com/static/2471redes2/translucent.png\" alt=\"write the first review\" /><\/a><\/div>\n<div id=\"BVRRDisplayContentNoReviewsID\" class=\"BVRRDisplayContentNoReviews\"><a title=\"write the first review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"https://underarmour.ugc.bazaarvoice.com/2471redes2/1253910/writereview.djs?format=embeddedhtml&amp;campaignid=BV_REVIEW_DISPLAY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=https%3A%2F%2Funderarmour.ugc.bazaarvoice.com%2F2471redes2%2F1253910%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Review_Display_WriteReview\" onclick=\"bvShowContentOnReturnPRR('2471redes2', '1253910', '');\" href=\"javascript://\">write the first review<\/a><\/div> <\/div>\r\n\r\n<div id=\"BVRRFilteringBusyOverlayHighlightID\" class=\"BVDI_FBOverlayHighlight BVDIOverlay BVDIHidden\"><div class=\"BVDI_FBImage\"><img src=\"https://underarmour.ugc.bazaarvoice.com/static/2471redes2/filteringBusy.gif\" alt=\"Filtering is in progress. Please wait until it completes.\" title=\"Filtering is in progress. Please wait until it completes.\"/><\/div><\/div><\/div>\r\n <\/div>\n","BVRRRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRPrimarySummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"> <div class=\"BVRRRatingSummaryNoReviews\">\n <div class=\"BVRRNoContentCustomHeader\">\nProduct Reviews (<span>0<\/span>) <\/div>\n <div id=\"BVRRRatingSummaryNoReviewsWriteImageLinkID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryNoReviewsWriteImageLink\">\n<a title=\"write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"https://underarmour.ugc.bazaarvoice.com/2471redes2/1253910/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=https%3A%2F%2Funderarmour.ugc.bazaarvoice.com%2F2471redes2%2F1253910%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_1_WriteReview_1253910\" onclick=\"bvShowContentOnReturnPRR('2471redes2', '1253910', 'BVRRWidgetID');\" href=\"javascript://\"> <img src=\"https://underarmour.ugc.bazaarvoice.com/static/2471redes2/translucent.png\" alt=\"Write a review\" />\n<\/a> <\/div>\n <div id=\"BVRRRatingSummaryLinkWriteFirstID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWriteFirst\">\n <span class=\"BVRRRatingSummaryLinkWriteFirstPrefix\"><\/span>\n<a data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"https://underarmour.ugc.bazaarvoice.com/2471redes2/1253910/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=https%3A%2F%2Funderarmour.ugc.bazaarvoice.com%2F2471redes2%2F1253910%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_1_WriteReview_1253910\" onclick=\"bvShowContentOnReturnPRR('2471redes2', '1253910', 'BVRRWidgetID');\" href=\"javascript://\">Write the first review<\/a><span class=\"BVRRRatingSummaryLinkWriteFirstSuffix\"><\/span> <\/div>\n <\/div>\n<\/div><\/div><a id=\"BVSubmissionLink\" data-bvcfg=\"__CONFIGKEY__\" style=\"display: none;\" data-bvjsref=\"https://underarmour.ugc.bazaarvoice.com/2471redes2/1253910/writereview.djs?format=embeddedhtml&amp;campaignid=BV_SUBMISSIONLINK&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=https%3A%2F%2Funderarmour.ugc.bazaarvoice.com%2F2471redes2%2F1253910%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" onclick=\"bvShowContentOnReturnPRR('2471redes2', '1253910', '');\" href=\"javascript://\"><\/a>\n <\/div>\n"},
initializers={"BVRRSecondaryRatingSummarySourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVRRSourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVRRRatingSummarySourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}]},
widgets={};
widgets["content"]={"handledContentTypes":["Review","Comment"],"containerId":"BVRRContainer","sourceId":"BVRRSourceID"};
widgets["secondarySummary"]={"containerId":"BVRRSecondarySummaryContainer","sourceId":"BVRRSecondaryRatingSummarySourceID"};
widgets["summary"]={"containerId":"BVRRSummaryContainer","sourceId":"BVRRRatingSummarySourceID"};
var injectionData={
apiConfig:apiConfig,
containerInitializer:false,
cookiePath:"/",
crossDomainUrl:"https://underarmour.ugc.bazaarvoice.com/2471redes2/crossdomain.htm?format=embedded",
embeddedUrl:url,
globalInitializers:[{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSummaryContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSecondarySummaryContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRContainer"}},{"module":"dropdown","init":"addSelectHandlers","data":{"dropdownsName":"BV_TrackingTag_Review_Display_Sort"}},{"module":"feedback","init":"onInjection","data":{"id":"Product_76vzrx13fnelat2j0kme95wek","options":{"cookiePrefixes":{"Voting":"pfv"},"cookiePath":"/","contentFocusing":{"args":["2471redes2","1253910"],"fn":"bvShowContentOnReturnPRR"}}}},{"module":"feedback","init":"onInjection","data":{"id":"Review_76vzrx13fnelat2j0kme95wek","options":{"cookiePrefixes":{"Inappropriate":"rif","Voting":"rfv"},"cookiePath":"/","contentFocusing":{"args":["2471redes2","1253910"],"fn":"bvShowContentOnReturnPRR"}}}},{"module":"feedback","init":"onInjection","data":{"id":"ReviewComment_76vzrx13fnelat2j0kme95wek","options":{"cookiePrefixes":{"Inappropriate":"cif","Voting":"cfv"},"cookiePath":"/","contentFocusing":{"args":["2471redes2","1253910"],"fn":"bvShowContentOnReturnPRR"}}}},{"module":"rr/contentFocusingSupportRR","init":"postInjection","data":{"application":"PRR","source":"readLink","defaultContentContainerId":"BVRRContainer","tabSwitcher":"bvShowTab","displayCode":"2471redes2"}}],
gotoCookieRegexp:/^https?:\/\/[^/?#]+(\/[^?#]*)\//,
inFrameSubmissionEnabled:false,
pageIdPrefix:"BVRR",
pageTrackers:["https://underarmour.ugc.bazaarvoice.com/static/2471redes2/r_0_ispacer.gif"],
postInjectionFunction:function(Inject){
window.bvScrollToElement();
},
productId:"1253910",
replaceDisplayTokens:true,
replacementsPrefix:"BVRR",
replaceSessionParameters:false,
returnURLFixedValue:"",
returnURLForceRelativeToRoot:true,
setWindowTitle:false,
soiContainerID:"BVRRContentValidationID_1253910",
soiContentIDs:[],
sviParameterName:"bvrrp",
sviRedirectBaseUrl:"https://underarmour.ugc.bazaarvoice.com/2471redes2/",
webAnalyticsConfig:{"customTrackedObjects":"","customizersName":"BVRRAnalyticsCustomizers","customContainersFnName":"BVRRAnalyticsCustomContainers","conversionTracking":{"conversionTrackingElementSelector":null,"conversionTrackingMetadataSelector":null,"conversionTrackingParseRegexp":null,"conversionTrackingName":"AddToCart"},"SIWZeroDeployEnabled":false,"maxTrackingTagTraversalDepth":3,"customTrackedObjectsSelector":"","jsonData":{"bvProduct":"RatingsAndReviews","autoTagAnalyticsConfiguration":{"trackSubmissionPageLoads":true,"autoTagAnalyticsVersion":"latest","trackFormActions":false,"productTracking":{"tracking":true,"initialProductDisplay":false},"vendors":[{"vendorName":"magpie","anonymous":false,"brandDomain":"false","defaultClassesOnly":false}]},"bvExtension":{},"bvAnalyticsVersion":"4.7","productId":"1253910","eType":"Read","bvDisplayCode":"2471redes2","rootCategoryId":"Apparel","subjectType":"Product","brand":"","analyticsWhitespaceTrackingEnabled":false,"attributes":{"numRatingsOnlyReviews":0,"numReviews":0,"percentRecommend":0,"avgRating":0E-12},"ciTrackingEnabled":false,"bvClientName":"UnderArmour","leafCategoryId":"Apparel"}},
widgetInitializers:initializers,
widgetLimit:1,
widgetMaterials:materials,
widgetMetadata:widgets,
windowTitle:null};
Injection.newInstance().apiInjection(injectionData);
});
});