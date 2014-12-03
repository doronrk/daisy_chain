$BV.Internal.ajaxCallback(function(url,apiConfig){
if(!/(^|\.)(atfingertips\.com|bazaarvoice\.com|macys\.com)(:\d+)?$/.test(location.hostname)){
throw "Bazaarvoice: Permission denied";
}
$BV.Internal.configureAppLoader("qa",false,{"cmn/7129/lightbox":"lightbox","cmn/7129gallery/ratingControls":"ratingControls"});
$BV.Internal.require(["injection.shared","feedback","requester","browserVersion","qa/contentFocusingSupportQA","contentFocusingSupport","jquery.core","qa/analyticsHooksQA","qa/analyticsInternalLegacyHooksQA","dropdown","domUtils","parseUri","cookies","analyticsVersioning","analyticsHooks","magpie","magpieTracking","analyticsAutoTagHooks","animationOptions","socialConnect","facebookConnect","facebookOpenGraph","jquery.effects.core","contentDisplay"],function(Injection){
var materials={"BVQASourceID":"<div id=\"BVQAWidgetID\" class=\"BVQAWidget\"><div id=\"BVQABrowsePageID\" class=\"BVQAWidgetWrapper BVQABrowsePage\"><div id=\"BVQAHeaderID\" class=\"BVQAHeader\"><div id=\"BVQAQuestionAndAnswerCountID\" class=\"BVQAQuestionAndAnswerCount\"><span class=\"BVQACount BVQAZeroCount\"><span class=\"BVQANumber\">0<\/span> Questions<\/span>, <span class=\"BVQACount BVQAZeroCount\"><span class=\"BVQANumber\">0<\/span> Answers<\/span><\/div><h1 id=\"BVQAHeaderTitleID\" class=\"BVQATitle BVQAHeaderTitle\">Product Q&amp;A<\/h1><h2 id=\"BVQAHeaderSubTitleID\" class=\"BVQASubTitle BVQAHeaderSubTitle\">Ask your questions. Share your answers.<\/h2><\/div><div id=\"BVQAMainID\" class=\"BVQAMain BVQAMainView\"><div class=\"BVQAPageTabs\"> <div class=\"BVQAPageTabSpacerLeft\">&nbsp;<\/div>\n\n <div class=\"BVQAPageTabSpacerMiddle\">&nbsp;<\/div>\n<div id=\"BVQAPageTabBrowseID\" class=\"BVQAPageTab BVQASelectedPageTab\">Back<\/div> <div class=\"BVQAPageTabSpacerMiddle\">&nbsp;<\/div>\n<div id=\"BVQAPageTabSearchID\" class=\"BVQAPageTab\" onclick=\"$BV.Internal.Requester.get('http://macys.ugc.bazaarvoice.com/answers/7129aa/product/1651335/searchquestions.djs?format=embeddedhtml&amp;search=__SEARCHTEXT__','BVQAFrame','__CONFIGKEY__'); return false;\"><a title=\"Search Q&amp;A\" data-bvcfg=\"__CONFIGKEY__\" name=\"BV_TrackingTag_QA_Display_SearchTab\" data-bvjsref=\"http://macys.ugc.bazaarvoice.com/answers/7129aa/product/1651335/searchquestions.djs?format=embeddedhtml&amp;search=__SEARCHTEXT__\" class=\"BVQAPageTabLink\" href=\"javascript://\">Search Q&amp;A<\/a><\/div>\n <div class=\"BVQAPageTabSpacerRight\">&nbsp;<\/div>\n<\/div><div id=\"BVQAViewQuestionsContentID\" class=\"BVQAMainContent BVQAViewQuestionsContent\"><div id=\"BVQANoQuestionsID\" class=\"BVQANoQuestions\"><div class=\"BVQATitle\">Be the first to ask a question!<\/div><a title=\"Ask a new question \" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://macys.ugc.bazaarvoice.com/answers/7129aa/product/1651335/askquestion.djs?format=embeddedhtml&amp;campaignid=BV_QA_BROWSE&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fmacys.ugc.bazaarvoice.com%2Fanswers%2F7129aa%2Fproduct%2F1651335%2Fquestions.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_QA_Display_AskFirstQuestion\" onclick=\"bvShowContentOnReturnQA('7129aa', '1651335', 'BVQAWidgetID');return typeof(BVQAOnSubmit)=='function' ? BVQAOnSubmit(this.href, 'QUESTION_SUBMISSION') : true;\" href=\"javascript://\"><img src=\"http://macys.ugc.bazaarvoice.com/answers/7129aa/static/btn_askNewQuestion.gif\" alt=\"Ask a new question \" title=\"Ask a new question \" /><\/a><\/div><\/div><\/div><div id=\"BVQAFooterID\" class=\"BVQAFooter\"><div id=\"BVQAGuidelinesID\" class=\"BVQAGuidelines\"><a name=\"BV_TrackingTag_QA_Display_QAndAGuidelines\" href=\"http://answers.macys.com/answers/7129aa/content/guidelines.htm\" target=\"_blank\" onclick=\"window.open(this.href,null,'left=50,top=50,width=500,height=500,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" title=\"Policies &amp; Guidelines\">Policies &amp; Guidelines<\/a><\/div><\/div><\/div><\/div>","BVQASummaryBoxSourceID":"<div id=\"BVQASummaryBoxID\" class=\"BVQASummaryBox BVQASummaryBoxView\"><h1 id=\"BVQASummaryBoxTitleID\" class=\"BVQATitle BVQASummaryBoxTitle\">Product Q&amp;A<\/h1><div id=\"BVQASummaryBoxAskFirstQuestionID\" class=\"BVQASummaryBoxLink\">Be the first to <a title=\"Ask a question\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://macys.ugc.bazaarvoice.com/answers/7129aa/product/1651335/askquestion.djs?format=embeddedhtml&amp;campaignid=BV_QA_BROWSE&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fmacys.ugc.bazaarvoice.com%2Fanswers%2F7129aa%2Fproduct%2F1651335%2Fquestions.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_QA_Display_AskQuestion\" onclick=\"bvShowContent('QA','7129aa','1651335','pdpTabs');return typeof(BVQAOnSubmit)=='function' ? BVQAOnSubmit(this.href, 'QUESTION_SUBMISSION') : true;\" href=\"javascript://\">ask a question<\/a>.<\/div><\/div>"},
initializers={"BVQASourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVQASummaryBoxSourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}]},
widgets={};
widgets["content"]={"handledContentTypes":["Question","Answer"],"containerId":"BVQAContainer","sourceId":"BVQASourceID"};
widgets["summary"]={"containerId":"BVQASummaryContainer","sourceId":"BVQASummaryBoxSourceID"};
var injectionData={
apiConfig:apiConfig,
containerInitializer:false,
cookiePath:"/",
crossDomainUrl:"http://macys.ugc.bazaarvoice.com/answers/7129aa/crossdomain.htm?format=embedded",
embeddedUrl:url,
globalInitializers:[{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVQAContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVQASummaryContainer"}},{"module":"dropdown","init":"addSelectHandlers","data":{"dropdownId":"BVQASortListID"}},{"module":"feedback","init":"onInjection","data":{"id":"Product_skcku10z7vygrancn5nt2t67f","options":{"cookiePrefixes":{"Voting":"pfv"},"cookiePath":"/","contentFocusing":{"args":["7129aa","1651335"],"fn":"bvShowContentOnReturnQA"}}}},{"module":"feedback","init":"onInjection","data":{"id":"Question_skcku10z7vygrancn5nt2t67f","options":{"cookiePrefixes":{"Inappropriate":"qif","Voting":"qfv"},"cookiePath":"/","contentFocusing":{"args":["7129aa","1651335"],"fn":"bvShowContentOnReturnQA"}}}},{"module":"feedback","init":"onInjection","data":{"id":"Answer_skcku10z7vygrancn5nt2t67f","options":{"cookiePrefixes":{"Inappropriate":"aif","Voting":"afv"},"cookiePath":"/","contentFocusing":{"args":["7129aa","1651335"],"fn":"bvShowContentOnReturnQA"}}}},{"module":"qa/contentFocusingSupportQA","init":"postInjection","data":{"application":"QA","source":"readLink","defaultContentContainerId":"BVQAContainer","tabSwitcher":"bvShowTab","displayCode":"7129aa"}}],
gotoCookieRegexp:/^https?:\/\/[^/?#]+(\/[^?#]*)\//,
inFrameSubmissionEnabled:true,
pageIdPrefix:"BVQA",
pageTrackers:["http://macys.ugc.bazaarvoice.com/answers/7129aa/static/q_0_ispacer.gif","http://macys.ugc.bazaarvoice.com/answers/7129aa/static/a_0_ispacer.gif"],
postInjectionFunction:function(Inject){
if (window.$bv.isFunction(window.bvClosePopups)) {
window.$bv('.BVQAQuestionHeader').click(window.bvClosePopups);
}
if (window.bvAppendSubmission) {
window.bvAppendSubmission.showContent('QA');
}
},
replaceDisplayTokens:true,
replacementsPrefix:"BVQA",
replaceSessionParameters:false,
setWindowTitle:false,
soiContainerID:"BVQAContentValidationID_1651335",
soiContentIDs:[],
sviParameterName:"bvqap",
sviRedirectBaseUrl:"",
webAnalyticsConfig:{"customTrackedObjects":[{"selector":".tabProductQA a"}],"customizersName":"BVQAAnalyticsCustomizers","customContainersFnName":"BVQAAnalyticsCustomContainers","conversionTracking":{"conversionTrackingElementSelector":null,"conversionTrackingMetadataSelector":null,"conversionTrackingParseRegexp":null,"conversionTrackingName":"AddToCart"},"SIWZeroDeployEnabled":false,"maxTrackingTagTraversalDepth":3,"customTrackedObjectsSelector":"","jsonData":{"bvProduct":"AskAndAnswer","autoTagAnalyticsConfiguration":{"trackSubmissionPageLoads":true,"autoTagAnalyticsVersion":"4.9","trackFormActions":false,"productTracking":{"tracking":true,"initialProductDisplay":false},"vendors":[{"vendorName":"coremetrics","signature":"pageCategorySearch"},{"vendorName":"magpie","anonymous":false,"brandDomain":"false","defaultClassesOnly":false}]},"bvExtension":{},"bvAnalyticsVersion":"4.7","productId":"1651335","eType":"Read","bvDisplayCode":"7129aa","rootCategoryId":"118","subjectType":"Product","brand":"Motherhood Maternity","analyticsWhitespaceTrackingEnabled":false,"attributes":{"numQuestions":0,"numAnswers":0,"good":true},"ciTrackingEnabled":false,"bvClientName":"Macys","leafCategoryId":"66718"}},
widgetInitializers:initializers,
widgetLimit:1,
widgetMaterials:materials,
widgetMetadata:widgets,
windowTitle:null};
Injection.newInstance().apiInjection(injectionData);
});
});