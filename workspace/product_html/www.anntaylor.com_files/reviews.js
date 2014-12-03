$BV.Internal.ajaxCallback(function(url,apiConfig){
if(!/(^|\.)(anntaylor\.com|bazaarvoice\.com)(:\d+)?$/.test(location.hostname)){
throw "Bazaarvoice: Permission denied";
}
$BV.Internal.configureAppLoader("rr",false,{"cmn/0059/ratingControls":"ratingControls","cmn/0059/analyticsInternalHooks":"analyticsHooks"});
$BV.Internal.require(["rr/injection.rr","feedback","requester","rr/analyticsHooksRR","browserVersion","jquery.core","rr/contentFocusingSupportRR","rr/analyticsInternalLegacyHooksRR","contentDisplay","dropdown","domUtils","parseUri","cookies","analyticsVersioning","analyticsHooks","cmn/0059/uniform","cmn/0059/analyticsInternalHooks","magpie","magpieTracking","analyticsAutoTagHooks","animationOptions","socialConnect","facebookConnect","facebookOpenGraph","jquery.effects.core","contentFocusingSupport"],function(Injection){
var materials={"BVRRSecondaryRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRSecondaryRatingSummary\">\n\n<div class=\"BVRRRatingSummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"><div class=\"BVRRRatingSummaryNoReviews\"> <div id=\"BVRRRatingSummaryNoReviewsWriteImageLinkID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryNoReviewsWriteImageLink\">\r\n <img src=\"http://anntaylor.ugc.bazaarvoice.com/static/0059-en_us/translucent.png\" alt=\"Write a review\" />\r\n <\/div>\r\n <div id=\"BVRRRatingSummaryLinkWriteFirstID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWriteFirst\">\n <span class=\"BVRRRatingSummaryLinkWriteFirstPrefix\"><\/span>\n<a data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://anntaylor.ugc.bazaarvoice.com/0059-en_us/358281/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fanntaylor.ugc.bazaarvoice.com%2F0059-en_us%2F358281%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_2_WriteReview_358281\" onclick=\"bvShowContentOnReturnPRR('0059-en_us', '358281', 'BVRRWidgetID');\" href=\"javascript://\">Be the first to write a review<\/a><span class=\"BVRRRatingSummaryLinkWriteFirstSuffix\"><\/span> <\/div>\n<\/div><div class=\"BVRRSocialBookmarkingLinks\"><div class=\"BVRRProductBookmarkingLabel\">Share this product<\/div>\n<a name=\"BV_TrackingTag_Rating_Summary_2_SocialBookmarkFacebook_358281\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkFacebook\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=626,height=436,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.anntaylor.com/0059-en_us/share.htm?site=Facebook&amp;url=http%3A%2F%2Fwww.anntaylor.com%2Fwinter-garden-necklace%2F358281&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Frichmedia.channeladvisor.com%2FImageDelivery%2FimageService%3FprofileId%3D52000652%26itemID%3D358281%26swatchID%3D3019%26recipeName%3Dgsm162x200\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://anntaylor.ugc.bazaarvoice.com/static/0059-en_us/link-facebook.gif\"\n alt=\"Facebook\"\n title=\"Add to Facebook\"/><\/a>\n\n<a name=\"BV_TrackingTag_Rating_Summary_2_SocialBookmarkTwitter_358281\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkTwitter\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=795,height=700,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.anntaylor.com/0059-en_us/share.htm?site=Twitter&amp;url=http%3A%2F%2Fwww.anntaylor.com%2Fwinter-garden-necklace%2F358281&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Frichmedia.channeladvisor.com%2FImageDelivery%2FimageService%3FprofileId%3D52000652%26itemID%3D358281%26swatchID%3D3019%26recipeName%3Dgsm162x200\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://anntaylor.ugc.bazaarvoice.com/static/0059-en_us/link-twitter.gif\"\n alt=\"Twitter\"\n title=\"Tweet this\"/><\/a>\n<\/div><\/div><\/div><\/div> <\/div>\n","BVRRSourceID":" <div id=\"BVRRWidgetID\" class=\"BVRRRootElement BVRRWidget\">\n\n<div id=\"BVRRContentContainerID\" class=\"BVRRContainer\">\n\n\n\n\n\n\n<div id=\"BVRRDisplayContentID\" class=\"BVRRDisplayContent BVRRNoContent\">\n<div id=\"BVRRDisplayContentNoReviewsImageID\" class=\"BVRRDisplayContentNoReviewsImage\"><a title=\"write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://anntaylor.ugc.bazaarvoice.com/0059-en_us/358281/writereview.djs?format=embeddedhtml&amp;campaignid=BV_REVIEW_DISPLAY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fanntaylor.ugc.bazaarvoice.com%2F0059-en_us%2F358281%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Review_Display_WriteReview\" onclick=\"bvShowContentOnReturnPRR('0059-en_us', '358281', '');\" href=\"javascript://\"><img src=\"http://anntaylor.ugc.bazaarvoice.com/static/0059-en_us/translucent.png\" alt=\"write a review\" /><\/a><\/div>\n<div id=\"BVRRDisplayContentNoReviewsID\" class=\"BVRRDisplayContentNoReviews\">Be the first to <a title=\"write a review\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://anntaylor.ugc.bazaarvoice.com/0059-en_us/358281/writereview.djs?format=embeddedhtml&amp;campaignid=BV_REVIEW_DISPLAY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fanntaylor.ugc.bazaarvoice.com%2F0059-en_us%2F358281%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Review_Display_WriteReview\" onclick=\"bvShowContentOnReturnPRR('0059-en_us', '358281', '');\" href=\"javascript://\">write a review<\/a><\/div><\/div>\n<div id=\"BVRRFilteringBusyOverlayHighlightID\" class=\"BVDI_FBOverlayHighlight BVDIOverlay BVDIHidden\"><div class=\"BVDI_FBImage\"><img src=\"http://anntaylor.ugc.bazaarvoice.com/static/0059-en_us/filteringBusy.gif\" alt=\"Filtering is in progress. Please wait until it completes.\" title=\"Filtering is in progress. Please wait until it completes.\"/><\/div><\/div><\/div>\n <\/div>\n","BVRRRatingSummarySourceID":" <div class=\"BVRRRootElement\">\n<div class=\"BVRRRatingSummary BVRRPrimarySummary BVRRPrimaryRatingSummary\"><div class=\"BVRRRatingSummaryStyle2\"><div class=\"BVRRRatingSummaryNoReviews\"> <div id=\"BVRRRatingSummaryNoReviewsWriteImageLinkID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryNoReviewsWriteImageLink\">\r\n <img src=\"http://anntaylor.ugc.bazaarvoice.com/static/0059-en_us/translucent.png\" alt=\"Write a review\" />\r\n <\/div>\r\n <div id=\"BVRRRatingSummaryLinkWriteFirstID\" class=\"BVRRRatingSummaryLink BVRRRatingSummaryLinkWriteFirst\">\n <span class=\"BVRRRatingSummaryLinkWriteFirstPrefix\"><\/span>\n<a data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://anntaylor.ugc.bazaarvoice.com/0059-en_us/358281/writereview.djs?format=embeddedhtml&amp;campaignid=BV_RATING_SUMMARY_ZERO_REVIEWS&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fanntaylor.ugc.bazaarvoice.com%2F0059-en_us%2F358281%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_Rating_Summary_1_WriteReview_358281\" onclick=\"bvShowContentOnReturnPRR('0059-en_us', '358281', 'BVRRWidgetID');\" href=\"javascript://\">Be the first to write a review<\/a><span class=\"BVRRRatingSummaryLinkWriteFirstSuffix\"><\/span> <\/div>\n<\/div><div class=\"BVRRSocialBookmarkingLinks\"><div class=\"BVRRProductBookmarkingLabel\">Share this product<\/div>\n<a name=\"BV_TrackingTag_Rating_Summary_1_SocialBookmarkFacebook_358281\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkFacebook\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=626,height=436,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.anntaylor.com/0059-en_us/share.htm?site=Facebook&amp;url=http%3A%2F%2Fwww.anntaylor.com%2Fwinter-garden-necklace%2F358281&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Frichmedia.channeladvisor.com%2FImageDelivery%2FimageService%3FprofileId%3D52000652%26itemID%3D358281%26swatchID%3D3019%26recipeName%3Dgsm162x200\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://anntaylor.ugc.bazaarvoice.com/static/0059-en_us/link-facebook.gif\"\n alt=\"Facebook\"\n title=\"Add to Facebook\"/><\/a>\n\n<a name=\"BV_TrackingTag_Rating_Summary_1_SocialBookmarkTwitter_358281\" target=\"_blank\" class=\"BVRRSocialBookmarkingSharingLink BVRRSocialBookmarkingSharingLinkTwitter\" onclick=\"this.href=bvReplaceTokensInSocialURL(this.href);window.open(this.href,'','left=0,top=0,width=795,height=700,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" onfocus=\"this.href=bvReplaceTokensInSocialURL(this.href);\" rel=\"nofollow\" href=\"http://reviews.anntaylor.com/0059-en_us/share.htm?site=Twitter&amp;url=http%3A%2F%2Fwww.anntaylor.com%2Fwinter-garden-necklace%2F358281&amp;title=__TITLE__&amp;robot=__ROBOT__&amp;image=http%3A%2F%2Frichmedia.channeladvisor.com%2FImageDelivery%2FimageService%3FprofileId%3D52000652%26itemID%3D358281%26swatchID%3D3019%26recipeName%3Dgsm162x200\" onmouseover=\"this.href=bvReplaceTokensInSocialURL(this.href);\"><img width=\"16\"\n height=\"16\"\n class=\"BVRRSocialBookmarkLinkImage\"\n src=\"http://anntaylor.ugc.bazaarvoice.com/static/0059-en_us/link-twitter.gif\"\n alt=\"Twitter\"\n title=\"Tweet this\"/><\/a>\n<\/div><\/div><\/div><a id=\"BVSubmissionLink\" data-bvcfg=\"__CONFIGKEY__\" style=\"display: none;\" data-bvjsref=\"http://anntaylor.ugc.bazaarvoice.com/0059-en_us/358281/writereview.djs?format=embeddedhtml&amp;campaignid=BV_SUBMISSIONLINK&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fanntaylor.ugc.bazaarvoice.com%2F0059-en_us%2F358281%2Freviews.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" onclick=\"bvShowContentOnReturnPRR('0059-en_us', '358281', '');\" href=\"javascript://\"><\/a>\n <\/div>\n"},
initializers={"BVRRSecondaryRatingSummarySourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVRRSourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVRRRatingSummarySourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}]},
widgets={};
widgets["content"]={"handledContentTypes":["Review","Comment"],"containerId":"BVRRContainer","sourceId":"BVRRSourceID"};
widgets["secondarySummary"]={"containerId":"BVRRSecondarySummaryContainer","sourceId":"BVRRSecondaryRatingSummarySourceID"};
widgets["summary"]={"containerId":"BVRRSummaryContainer","sourceId":"BVRRRatingSummarySourceID"};
var injectionData={
apiConfig:apiConfig,
containerInitializer:false,
cookiePath:"/",
crossDomainUrl:"http://anntaylor.ugc.bazaarvoice.com/0059-en_us/crossdomain.htm?format=embedded",
embeddedUrl:url,
globalInitializers:[{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSummaryContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRSecondarySummaryContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVRRContainer"}},{"module":"dropdown","init":"addSelectHandlers","data":{"dropdownsName":"BV_TrackingTag_Review_Display_Sort"}},{"module":"feedback","init":"onInjection","data":{"id":"Product_6cu7ohr3s3yhai6h31s3z9ikv","options":{"cookiePrefixes":{"Voting":"pfv"},"cookiePath":"/","contentFocusing":{"args":["0059-en_us","358281"],"fn":"bvShowContentOnReturnPRR"}}}},{"module":"feedback","init":"onInjection","data":{"id":"Review_6cu7ohr3s3yhai6h31s3z9ikv","options":{"cookiePrefixes":{"Inappropriate":"rif","Voting":"rfv"},"cookiePath":"/","contentFocusing":{"args":["0059-en_us","358281"],"fn":"bvShowContentOnReturnPRR"}}}},{"module":"feedback","init":"onInjection","data":{"id":"ReviewComment_6cu7ohr3s3yhai6h31s3z9ikv","options":{"cookiePrefixes":{"Inappropriate":"cif","Voting":"cfv"},"cookiePath":"/","contentFocusing":{"args":["0059-en_us","358281"],"fn":"bvShowContentOnReturnPRR"}}}},{"module":"rr/contentFocusingSupportRR","init":"postInjection","data":{"application":"PRR","source":"readLink","defaultContentContainerId":"BVRRContainer","tabSwitcher":"bvShowTab","displayCode":"0059-en_us"}}],
gotoCookieRegexp:/^https?:\/\/[^/?#]+(\/[^?#]*)\//,
inFrameSubmissionEnabled:false,
pageIdPrefix:"BVRR",
pageTrackers:["http://anntaylor.ugc.bazaarvoice.com/static/0059-en_us/r_0_ispacer.gif"],
postInjectionFunction:function(Inject){
window.bvScrollToElement();
},
productId:"358281",
replaceDisplayTokens:true,
replacementsPrefix:"BVRR",
replaceSessionParameters:false,
returnURLFixedValue:"",
returnURLForceRelativeToRoot:true,
setWindowTitle:false,
soiContainerID:"BVRRContentValidationID_358281",
soiContentIDs:[],
sviParameterName:"bvrrp",
sviRedirectBaseUrl:"",
webAnalyticsConfig:{"customTrackedObjects":"","customizersName":"BVRRAnalyticsCustomizers","customContainersFnName":"BVRRAnalyticsCustomContainers","conversionTracking":{"conversionTrackingElementSelector":null,"conversionTrackingMetadataSelector":null,"conversionTrackingParseRegexp":null,"conversionTrackingName":"AddToCart"},"SIWZeroDeployEnabled":false,"maxTrackingTagTraversalDepth":3,"customTrackedObjectsSelector":"","jsonData":{"bvProduct":"RatingsAndReviews","autoTagAnalyticsConfiguration":{"trackSubmissionPageLoads":true,"autoTagAnalyticsVersion":"5.0","trackFormActions":false,"productTracking":{"tracking":true,"initialProductDisplay":false},"vendors":[{"vendorName":"omniture","eventNum":25,"eVarNum":22,"trackerReference":"s","brandVoiceTrackingType":null,"brandVoiceTrackingEVarNum":0},{"vendorName":"magpie","anonymous":false,"brandDomain":"false","defaultClassesOnly":false}]},"bvExtension":{},"bvAnalyticsVersion":"4.7","productId":"358281","eType":"Read","bvDisplayCode":"0059-en_us","rootCategoryId":"cata000021","subjectType":"Product","brand":"","analyticsWhitespaceTrackingEnabled":false,"attributes":{"numRatingsOnlyReviews":0,"numReviews":0,"percentRecommend":0,"avgRating":0E-12},"ciTrackingEnabled":false,"bvClientName":"AnnTaylor","leafCategoryId":"cata000021"}},
widgetInitializers:initializers,
widgetLimit:1,
widgetMaterials:materials,
widgetMetadata:widgets,
windowTitle:null};
Injection.newInstance().apiInjection(injectionData);
});
});