$BV.Internal.ajaxCallback(function(url,apiConfig){
if(!/(^|\.)(answers\.atfingertips\.com|bazaarvoice\.com|macys\.com)(:\d+)?$/.test(location.hostname)){
throw "Bazaarvoice: Permission denied";
}
$BV.Internal.configureAppLoader("rr",false,{"cmn/7129/lightbox":"lightbox","cmn/7129gallery/ratingControls":"ratingControls"});
$BV.Internal.require(["rr/injection.rr","feedback","mediaGallery","requester","rr/analyticsHooksRR","browserVersion","contentFocusingSupport","jquery.core","rr/contentFocusingSupportRR","rr/analyticsInternalLegacyHooksRR","contentDisplay","dropdown","domUtils","parseUri","cookies","analyticsVersioning","analyticsHooks","magpie","magpieTracking","analyticsAutoTagHooks","animationOptions","socialConnect","facebookConnect","facebookOpenGraph","jquery.effects.core","positioners","contentDispatcher","wrapperDivs"],function(Injection){
var materials={"BVRRSecondaryRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRSecondaryRatingSummary\">\n\n<div class=\"BVRRRatingSummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"><div class=\"BVRRRatingSummaryNoReviews\"> <div id=\"BVRRRatingSummaryLinkWriteFirstID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWriteFirst\">\n <span class=\"BVRRRatingSummaryLinkWriteFirstPrefix\">Be the first to<\/span>\n<a data-bvcfg=\"__CONFIGKEY__\" name=\"BV_TrackingTag_Rating_Summary_2_WriteReview_1651335\" data-bvjsref=\"http://macys.ugc.bazaarvoice.com/7129aa/1651335/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fmacys.ugc.bazaarvoice.com%2F7129aa%2F1651335%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" href=\"javascript://\">write a review<\/a><span class=\"BVRRRatingSummaryLinkWriteFirstSuffix\">.<\/span> <\/div>\n<\/div><\/div><\/div><\/div> <\/div>\n","BVRRSourceID":" <div id=\"BVRRWidgetID\" class=\"BVRRRootElement BVRRWidget\">\n\n<div id=\"BVRRContentContainerID\" class=\"BVRRContainer\">\n\n\n\n\n<div id=\"BVRRDisplayContentID\" class=\"BVRRDisplayContent BVRRNoContent\">\n\n<div id=\"BVRRDisplayContentNoReviewsID\" class=\"BVRRDisplayContentNoReviews\">Be the first to write a review for a chance to win a $1,000 gift card! <span class=\"BVRRPromoLinkContainer\"><a href=\"http://www1.macys.com/campaign/bvSweeps.jsp\" target=\"_blank\">(see details)<\/a><\/span> <a title=\"write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://macys.ugc.bazaarvoice.com/7129aa/1651335/writereview.djs?format=embeddedhtml&amp;campaignid=BV_REVIEW_DISPLAY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fmacys.ugc.bazaarvoice.com%2F7129aa%2F1651335%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Review_Display_WriteReview\" onclick=\"bvShowContentOnReturnPRR('7129aa', '1651335', '');\" href=\"javascript://\">write a review<\/a><\/div><\/div>\n<div id=\"BVRRFilteringBusyOverlayHighlightID\" class=\"BVDI_FBOverlayHighlight BVDIOverlay BVDIHidden\"><div class=\"BVDI_FBImage\"><img src=\"http://macys.ugc.bazaarvoice.com/static/7129aa/filteringBusy.gif\" alt=\"Filtering is in progress. Please wait until it completes.\" title=\"Filtering is in progress. Please wait until it completes.\"/><\/div><\/div><\/div>\n <\/div>\n","BVRRRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRPrimarySummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"><div class=\"BVRRRatingSummaryNoReviews\"> <div id=\"BVRRRatingSummaryLinkWriteFirstID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWriteFirst\">\n <span class=\"BVRRRatingSummaryLinkWriteFirstPrefix\">Be the first to<\/span>\n<a data-bvcfg=\"__CONFIGKEY__\" name=\"BV_TrackingTag_Rating_Summary_1_WriteReview_1651335\" data-bvjsref=\"http://macys.ugc.bazaarvoice.com/7129aa/1651335/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fmacys.ugc.bazaarvoice.com%2F7129aa%2F1651335%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" href=\"javascript://\">write a review<\/a><span class=\"BVRRRatingSummaryLinkWriteFirstSuffix\">.<\/span> <\/div>\n<\/div><\/div><\/div><a id=\"BVSubmissionLink\" data-bvcfg=\"__CONFIGKEY__\" style=\"display: none;\" data-bvjsref=\"http://macys.ugc.bazaarvoice.com/7129aa/1651335/writereview.djs?format=embeddedhtml&amp;campaignid=BV_SUBMISSIONLINK&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fmacys.ugc.bazaarvoice.com%2F7129aa%2F1651335%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" onclick=\"bvShowContent('PRR','7129aa','1651335','');bvShowContentOnReturnPRR('7129aa', '1651335', '');\" href=\"javascript://\"><\/a>\n <\/div>\n"},
initializers={"BVRRSecondaryRatingSummarySourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVRRSourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVRRRatingSummarySourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}]},
widgets={};
widgets["content"]={"handledContentTypes":["Review","Comment"],"containerId":"BVRRContainer","sourceId":"BVRRSourceID"};
if((typeof(window['BVRR_1651335_MediaGalleryObject']) != 'object') || !window['BVRR_1651335_MediaGalleryObject'].isRendered()){
widgets["mediaGallery"]={"containerId":"BVRRMediaGalleryContainer","sourceId":"BVRRMediaGallerySourceID"};
}
widgets["secondarySummary"]={"containerId":"BVRRSecondarySummaryContainer","sourceId":"BVRRSecondaryRatingSummarySourceID"};
widgets["summary"]={"containerId":"BVRRSummaryContainer","sourceId":"BVRRRatingSummarySourceID"};
var injectionData={
apiConfig:apiConfig,
containerInitializer:false,
cookiePath:"/",
crossDomainUrl:"http://macys.ugc.bazaarvoice.com/7129aa/crossdomain.htm?format=embedded",
embeddedUrl:url,
globalInitializers:[{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSummaryContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSecondarySummaryContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRContainer"}},{"module":"dropdown","init":"addSelectHandlers","data":{"dropdownsName":"BV_TrackingTag_Review_Display_Sort"}},{"module":"feedback","init":"onInjection","data":{"id":"Product_eey4ttlc1nvqbp70nr7p3f6cz","options":{"cookiePrefixes":{"Voting":"pfv"},"cookiePath":"/","contentFocusing":{"args":["7129aa","1651335"],"fn":"bvShowContentOnReturnPRR"}}}},{"module":"feedback","init":"onInjection","data":{"id":"Review_eey4ttlc1nvqbp70nr7p3f6cz","options":{"cookiePrefixes":{"Inappropriate":"rif","Voting":"rfv"},"cookiePath":"/","contentFocusing":{"args":["7129aa","1651335"],"fn":"bvShowContentOnReturnPRR"}}}},{"module":"feedback","init":"onInjection","data":{"id":"ReviewComment_eey4ttlc1nvqbp70nr7p3f6cz","options":{"cookiePrefixes":{"Inappropriate":"cif","Voting":"cfv"},"cookiePath":"/","contentFocusing":{"args":["7129aa","1651335"],"fn":"bvShowContentOnReturnPRR"}}}},{"module":"rr/contentFocusingSupportRR","init":"postInjection","data":{"application":"PRR","source":"readLink","defaultContentContainerId":"BVRRContainer","tabSwitcher":"bvShowTab","displayCode":"7129aa"}}],
gotoCookieRegexp:/^https?:\/\/[^/?#]+(\/[^?#]*)\//,
inFrameSubmissionEnabled:true,
pageIdPrefix:"BVRR",
pageTrackers:["http://macys.ugc.bazaarvoice.com/static/7129aa/r_0_ispacer.gif"],
postInjectionFunction:function(Inject){
window.bvScrollToElement();
(function() {
if (typeof(window['BVRR_1651335_MediaGalleryObject']) == 'object') {
window['BVRR_1651335_MediaGalleryObject'].sync();
} else {
window['BVRR_1651335_MediaGalleryObject'] = window.newBVMediaGallery('BVRR_1651335_MediaGallery', 0,
0, true, 'http://macys.ugc.bazaarvoice.com/7129aa/1651335/mediagallery.djs?format=embeddedhtml',
true, { name : 'centerWithinAnchor', args : ['<POPIN_ID>', 'BVRRWidgetID', 10] }
,
[]);
}
})();
},
productId:"1651335",
replaceDisplayTokens:true,
replacementsPrefix:"BVRR",
replaceSessionParameters:false,
returnURLFixedValue:"",
returnURLForceRelativeToRoot:true,
setWindowTitle:false,
soiContainerID:"BVRRContentValidationID_1651335",
soiContentIDs:[],
sviParameterName:"bvrrp",
sviRedirectBaseUrl:"",
webAnalyticsConfig:{"customTrackedObjects":[{"selector":".tabReviews a"}],"customizersName":"BVRRAnalyticsCustomizers","customContainersFnName":"BVRRAnalyticsCustomContainers","conversionTracking":{"conversionTrackingElementSelector":null,"conversionTrackingMetadataSelector":null,"conversionTrackingParseRegexp":null,"conversionTrackingName":"AddToCart"},"SIWZeroDeployEnabled":false,"maxTrackingTagTraversalDepth":3,"customTrackedObjectsSelector":"","jsonData":{"bvProduct":"RatingsAndReviews","autoTagAnalyticsConfiguration":{"trackSubmissionPageLoads":true,"autoTagAnalyticsVersion":"4.9","trackFormActions":false,"productTracking":{"tracking":true,"initialProductDisplay":false},"vendors":[{"vendorName":"coremetrics","signature":"pageCategorySearch"},{"vendorName":"magpie","anonymous":false,"brandDomain":"false","defaultClassesOnly":false}]},"bvExtension":{},"bvAnalyticsVersion":"4.7","productId":"1651335","eType":"Read","bvDisplayCode":"7129aa","rootCategoryId":"118","subjectType":"Product","brand":"Motherhood Maternity","analyticsWhitespaceTrackingEnabled":false,"attributes":{"numRatingsOnlyReviews":0,"numReviews":0,"percentRecommend":0,"avgRating":0E-12},"ciTrackingEnabled":false,"bvClientName":"Macys","leafCategoryId":"66718"}},
widgetInitializers:initializers,
widgetLimit:-1,
widgetMaterials:materials,
widgetMetadata:widgets,
windowTitle:null};
Injection.newInstance().apiInjection(injectionData);
});
});