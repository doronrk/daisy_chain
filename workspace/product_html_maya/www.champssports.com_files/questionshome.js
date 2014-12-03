$BV.Internal.ajaxCallback(function(url,apiConfig){
if(!/(^|\.)(answers\.champssports\.uat\.msp\.lashoes\.guidance\.com|bazaarvoice\.com|champssports\.com|reviews\.champssports\.uat\.msp\.lashoes\.guidance\.com|reviews\.eastbay\.com)(:\d+)?$/.test(location.hostname)){
throw "Bazaarvoice: Permission denied";
}
$BV.Internal.configureAppLoader("qa",false,{"qa/9054/contentFocusingSupportQA":"qa/contentFocusingSupportQA","qa/8006/contentFocusingSupportQA":"qa/contentFocusingSupportQA"});
$BV.Internal.require(["injection.shared","feedback","requester","browserVersion","qa/contentFocusingSupportQA","contentFocusingSupport","jquery.core","qa/analyticsHooksQA","qa/analyticsInternalLegacyHooksQA","domUtils","parseUri","cookies","analyticsVersioning","analyticsHooks","magpie","magpieTracking","analyticsAutoTagHooks","animationOptions","socialConnect","facebookConnect","facebookOpenGraph","jquery.effects.core","contentDisplay","qa/8006/contentFocusingSupportQA","qa/9054/contentFocusingSupportQA"],function(Injection){
var materials={"BVQASourceID":"<div id=\"BVQAWidgetID\" class=\"BVQAWidget\"><div id=\"BVQAHomePageID\" class=\"BVQAWidgetWrapper BVQAHomePage\"><div id=\"BVQAHeaderID\" class=\"BVQAHeader\"><div id=\"BVQAQuestionAndAnswerCountID\" class=\"BVQAQuestionAndAnswerCount\">(<span class=\"BVQACount BVQAZeroCount\"><span class=\"BVQANumber\">0<\/span> Questions<\/span> : <span class=\"BVQACount BVQAZeroCount\"><span class=\"BVQANumber\">0<\/span> Answers<\/span>)<\/div><h1 id=\"BVQAHeaderTitleID\" class=\"BVQATitle BVQAHeaderTitle\">Product Q&amp;A<\/h1><h2 id=\"BVQAHeaderSubTitleID\" class=\"BVQASubTitle BVQAHeaderSubTitle\">Ask your questions. Share your answers.<\/h2><\/div><div id=\"BVQAMainID\" class=\"BVQAMain BVQAMainView\"><div class=\"BVQAPageTabs\"> <div class=\"BVQAPageTabSpacerLeft\">&nbsp;<\/div>\n\n<div id=\"BVQAPageTabHomeID\" class=\"BVQAPageTab BVQASelectedPageTab\">Q&amp;A Home<\/div> <div class=\"BVQAPageTabSpacerMiddle\">&nbsp;<\/div>\n<div id=\"BVQAPageTabBrowseID\" class=\"BVQAPageTab\" onclick=\"$BV.Internal.Requester.get('http://champssports.ugc.bazaarvoice.com/answers/8006/product/218871/questions.djs?format=embeddedhtml','BVQAFrame','__CONFIGKEY__'); return false;\"><a title=\"&laquo; Back\" data-bvcfg=\"__CONFIGKEY__\" name=\"BV_TrackingTag_QA_Display_BrowseTab\" data-bvjsref=\"http://champssports.ugc.bazaarvoice.com/answers/8006/product/218871/questions.djs?format=embeddedhtml\" class=\"BVQAPageTabLink\" href=\"javascript://\">&laquo; Back<\/a><\/div> <div class=\"BVQAPageTabSpacerMiddle\">&nbsp;<\/div>\n<div id=\"BVQAPageTabSearchID\" class=\"BVQAPageTab\" onclick=\"$BV.Internal.Requester.get('http://champssports.ugc.bazaarvoice.com/answers/8006/product/218871/searchquestions.djs?format=embeddedhtml&amp;search=__SEARCHTEXT__','BVQAFrame','__CONFIGKEY__'); return false;\"><a title=\"Search Q&amp;A\" data-bvcfg=\"__CONFIGKEY__\" name=\"BV_TrackingTag_QA_Display_SearchTab\" data-bvjsref=\"http://champssports.ugc.bazaarvoice.com/answers/8006/product/218871/searchquestions.djs?format=embeddedhtml&amp;search=__SEARCHTEXT__\" class=\"BVQAPageTabLink\" href=\"javascript://\">Search Q&amp;A<\/a><\/div>\n <div class=\"BVQAPageTabSpacerRight\">&nbsp;<\/div>\n<\/div><div id=\"BVQANoQuestionsID\" class=\"BVQANoQuestions\"><div class=\"BVQATitle\">Be the First to Ask a Question!<\/div><a title=\"Ask a New Question \" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://champssports.ugc.bazaarvoice.com/answers/8006/product/218871/askquestion.djs?format=embeddedhtml&amp;campaignid=BV_QA_HOME&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fchampssports.ugc.bazaarvoice.com%2Fanswers%2F8006%2Fproduct%2F218871%2Fquestionshome.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_QA_Display_AskFirstQuestion\" onclick=\"bvShowContentOnReturnQA('8006', '218871', 'BVQAWidgetID');return typeof(BVQAOnSubmit)=='function' ? BVQAOnSubmit(this.href, 'QUESTION_SUBMISSION') : true;\" href=\"javascript://\">Ask a New Question <\/a><\/div><\/div><div id=\"BVQAFooterID\" class=\"BVQAFooter\"><div id=\"BVQAGuidelinesID\" class=\"BVQAGuidelines\"><a name=\"BV_TrackingTag_QA_Display_QAndAGuidelines\" href=\"http://answers.champssports.com/answers/8006/content/guidelines.htm\" target=\"_blank\" onclick=\"window.open(this.href,null,'left=50,top=50,width=500,height=500,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" title=\"Policies &amp; Guidelines\">Policies &amp; Guidelines<\/a><\/div><\/div><\/div><\/div>","BVQASummaryBoxSourceID":"<div id=\"BVQASummaryBoxID\" class=\"BVQASummaryBox BVQASummaryBoxView\"><h1 id=\"BVQASummaryBoxTitleID\" class=\"BVQATitle BVQASummaryBoxTitle\">Product Q&amp;A<\/h1><div id=\"BVQASummaryBoxAskFirstQuestionID\" class=\"BVQASummaryBoxLink\">Be the first to <a title=\"Ask a Question\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://champssports.ugc.bazaarvoice.com/answers/8006/product/218871/askquestion.djs?format=embeddedhtml&amp;campaignid=BV_QA_HOME&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fchampssports.ugc.bazaarvoice.com%2Fanswers%2F8006%2Fproduct%2F218871%2Fquestionshome.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_QA_Display_AskQuestion\" onclick=\"bvShowContent('QA','8006','218871','BVQAWidgetID');return typeof(BVQAOnSubmit)=='function' ? BVQAOnSubmit(this.href, 'QUESTION_SUBMISSION') : true;\" href=\"javascript://\">ask a question<\/a>.<\/div><\/div>"},
initializers={"BVQASourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVQASummaryBoxSourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}]},
widgets={};
widgets["content"]={"handledContentTypes":["Question","Answer"],"containerId":"BVQAContainer","sourceId":"BVQASourceID"};
widgets["summary"]={"containerId":"BVQASummaryContainer","sourceId":"BVQASummaryBoxSourceID"};
var injectionData={
apiConfig:apiConfig,
containerInitializer:false,
cookiePath:"/",
crossDomainUrl:"http://champssports.ugc.bazaarvoice.com/answers/8006/crossdomain.htm?format=embedded",
embeddedUrl:url,
globalInitializers:[{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVQAContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVQASummaryContainer"}},{"module":"feedback","init":"onInjection","data":{"id":"Product_66c0ki5tl424r51z5vdy4lpyb","options":{"cookiePrefixes":{"Voting":"pfv"},"cookiePath":"/","contentFocusing":{"args":["8006","218871"],"fn":"bvShowContentOnReturnQA"}}}},{"module":"qa/contentFocusingSupportQA","init":"postInjection","data":{"application":"QA","source":"readLink","defaultContentContainerId":"BVQAContainer","tabSwitcher":"bvShowTab","displayCode":"8006"}}],
gotoCookieRegexp:/^https?:\/\/[^/?#]+(\/[^?#]*)\//,
inFrameSubmissionEnabled:true,
pageIdPrefix:"BVQA",
pageTrackers:["http://champssports.ugc.bazaarvoice.com/answers/8006/static/q_0_ispacer.gif","http://champssports.ugc.bazaarvoice.com/answers/8006/static/a_0_ispacer.gif"],
postInjectionFunction:function(Inject){
if (window.bvAppendSubmission) {
window.bvAppendSubmission.showContent('QA');
}
},
replaceDisplayTokens:true,
replacementsPrefix:"BVQA",
replaceSessionParameters:false,
setWindowTitle:false,
soiContainerID:"BVQAContentValidationID_218871",
soiContentIDs:[],
sviParameterName:"bvqap",
sviRedirectBaseUrl:"",
webAnalyticsConfig:{"customTrackedObjects":[{"selector":"#pdp_tab_answers a"}],"customizersName":"BVQAAnalyticsCustomizers","customContainersFnName":"BVQAAnalyticsCustomContainers","conversionTracking":{"conversionTrackingElementSelector":null,"conversionTrackingMetadataSelector":null,"conversionTrackingParseRegexp":null,"conversionTrackingName":"AddToCart"},"SIWZeroDeployEnabled":false,"maxTrackingTagTraversalDepth":3,"customTrackedObjectsSelector":"","jsonData":{"bvProduct":"AskAndAnswer","autoTagAnalyticsConfiguration":{"trackSubmissionPageLoads":true,"autoTagAnalyticsVersion":"4.6","trackFormActions":false,"productTracking":{"tracking":true,"initialProductDisplay":false},"vendors":[{"vendorName":"coremetrics","signature":"pageCategorySearch"},{"vendorName":"magpie","anonymous":false,"brandDomain":"false","defaultClassesOnly":false}]},"bvExtension":{},"bvAnalyticsVersion":"4.7","productId":"218871","eType":"Read","bvDisplayCode":"8006","rootCategoryId":"Performance_Tees_LS","subjectType":"Product","brand":"Jordan","analyticsWhitespaceTrackingEnabled":false,"attributes":{"numQuestions":0,"numAnswers":0,"good":false},"ciTrackingEnabled":false,"bvClientName":"Champssports","leafCategoryId":"Performance_Tees_LS"}},
widgetInitializers:initializers,
widgetLimit:1,
widgetMaterials:materials,
widgetMetadata:widgets,
windowTitle:null};
Injection.newInstance().apiInjection(injectionData);
});
});