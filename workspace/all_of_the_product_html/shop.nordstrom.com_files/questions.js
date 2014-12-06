$BV.Internal.ajaxCallback(function(url,apiConfig){
if(!/(^|\.)(bazaarvoice\.com|nordstrom\.com)(:\d+)?$/.test(location.hostname)){
throw "Bazaarvoice: Permission denied";
}
$BV.Internal.configureAppLoader("qa",false,{});
$BV.Internal.require(["injection.shared","feedback","qa/4094p/grabClientEventQA","requester","browserVersion","qa/contentFocusingSupportQA","contentFocusingSupport","jquery.core","qa/analyticsHooksQA","qa/analyticsInternalLegacyHooksQA","dropdown","domUtils","parseUri","cookies","analyticsVersioning","analyticsHooks","magpie","magpieTracking","analyticsAutoTagHooks","animationOptions","socialConnect","facebookConnect","facebookOpenGraph","jquery.effects.core","contentDisplay"],function(Injection){
var materials={"BVQASourceID":"<div id=\"BVQAWidgetID\" class=\"BVQAWidget\"> <div id=\"BVQABrowsePageID\" class=\"BVQAWidgetWrapper BVQABrowsePage BVQABrowseNoQuestions\">\n<div id=\"BVQAHeaderID\" class=\"BVQAHeader\"><div id=\"BVQAQuestionAndAnswerCountID\" class=\"BVQAQuestionAndAnswerCount\">(<span class=\"BVQACount BVQAZeroCount\"><span class=\"BVQANumber\">0<\/span> Questions<\/span> : <span class=\"BVQACount BVQAZeroCount\"><span class=\"BVQANumber\">0<\/span> Answers<\/span>)<\/div> <h1 id=\"BVQAHeaderTitleID\" class=\"BVQATitle BVQAHeaderTitle\">\n <div class=\"BVQAQuestionSubjectName\">St. John Collection 'Emma' Crop Crepe Marocain Pants<\/div>\n <\/h1>\n <h2 id=\"BVQAHeaderSubTitleID\" class=\"BVQASubTitle BVQAHeaderSubTitle\">\nAsk a question or share your thoughts about this item with other shoppers in the Nordstrom community. <span class=\"BVQAHeaderSubtitleCustom\"> Need immediate assistance? <span id=\"BVQALiveChatCustom\"><a href=\"http://about.nordstrom.com/help/livehelp/default.asp\" target=\"_blank\">Live Chat<\/a><\/span>.<\/span><a title=\"Start a discussion\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://nordstrom.ugc.bazaarvoice.com/answers/4094p/product/3182829/askquestion.djs?format=embeddedhtml&amp;campaignid=BV_QA_BROWSE&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fnordstrom.ugc.bazaarvoice.com%2Fanswers%2F4094p%2Fproduct%2F3182829%2Fquestions.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_QA_Display_AskQuestion\" onclick=\"return typeof(BVQAOnSubmit)=='function' ? BVQAOnSubmit(this.href, 'QUESTION_SUBMISSION') : true;\" href=\"javascript://\">Start a discussion<\/a>. <\/h2>\n<\/div><div id=\"BVQAMainID\" class=\"BVQAMain BVQAMainView\"><div id=\"BVQAViewQuestionsContentID\" class=\"BVQAMainContent BVQAViewQuestionsContent\"><div id=\"BVQANoQuestionsID\" class=\"BVQANoQuestions\"><div class=\"BVQATitle\">Be the first to start a discussion!<\/div><a title=\"Start a discussion\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://nordstrom.ugc.bazaarvoice.com/answers/4094p/product/3182829/askquestion.djs?format=embeddedhtml&amp;campaignid=BV_QA_BROWSE&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fnordstrom.ugc.bazaarvoice.com%2Fanswers%2F4094p%2Fproduct%2F3182829%2Fquestions.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_QA_Display_AskFirstQuestion\" onclick=\"bvShowContentOnReturnQA('4094p', '3182829', 'BVQAWidgetID');return typeof(BVQAOnSubmit)=='function' ? BVQAOnSubmit(this.href, 'QUESTION_SUBMISSION') : true;\" href=\"javascript://\"><img src=\"http://nordstrom.ugc.bazaarvoice.com/answers/4094p/static/buttonAskANewQuestion.gif\" alt=\"Start a discussion\" title=\"Start a discussion\" /><\/a><\/div><\/div><\/div><div id=\"BVQAFooterID\" class=\"BVQAFooter\"><div id=\"BVQAGuidelinesID\" class=\"BVQAGuidelines\"><a name=\"BV_TrackingTag_QA_Display_QAndAGuidelines\" href=\"http://answers.nordstrom.com/answers/4094p/content/guidelines.htm\" target=\"_blank\" onclick=\"window.open(this.href,null,'left=50,top=50,width=500,height=500,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" title=\"Policies &amp; Guidelines\">Policies &amp; Guidelines<\/a><\/div><\/div> <\/div>\n<\/div>","BVQASummaryBoxSourceID":"<div id=\"BVQASummaryBoxID\" class=\"BVQASummaryBox BVQASummaryBoxView\"><h1 id=\"BVQASummaryBoxTitleID\" class=\"BVQATitle BVQASummaryBoxTitle\"> | <\/h1><div id=\"BVQASummaryBoxViewQuestionsID\" class=\"BVQASummaryBoxLink\"><a data-bvtrack=\"eventTarget:Question,eName:ReadAll\" onclick=\"$(&quot;#discussionTab&quot;).click(); if (bvShowContent('QA','4094p','3182829','BVQAWidgetID')) {$bv.Event(event).preventDefault()};\" href=\"#BVQAWidgetID\"><span class=\"BVQACount BVQAZeroCount\">Ask a Question<\/span><\/a><\/div><\/div>"},
initializers={"BVQASourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVQASummaryBoxSourceID":[]},
widgets={};
widgets["content"]={"handledContentTypes":["Question","Answer"],"containerId":"BVQAContainer","sourceId":"BVQASourceID"};
widgets["summary"]={"containerId":"BVQASummaryContainer","sourceId":"BVQASummaryBoxSourceID"};
var injectionData={
apiConfig:apiConfig,
containerInitializer:false,
cookiePath:"/",
crossDomainUrl:"http://nordstrom.ugc.bazaarvoice.com/answers/4094p/crossdomain.htm?format=embedded",
embeddedUrl:url,
globalInitializers:[{"module":"qa/4094p/grabClientEventQA","init":"loaded","data":{}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVQAContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVQASummaryContainer"}},{"module":"dropdown","init":"addSelectHandlers","data":{"dropdownId":"BVQASortListID"}},{"module":"feedback","init":"onInjection","data":{"id":"Product_hfrilr4ui284q5jwm43pw1w2s","options":{"cookiePrefixes":{"Voting":"pfv"},"cookiePath":"/","contentFocusing":{"args":["4094p","3182829"],"fn":"bvShowContentOnReturnQA"}}}},{"module":"feedback","init":"onInjection","data":{"id":"Question_hfrilr4ui284q5jwm43pw1w2s","options":{"cookiePrefixes":{"Inappropriate":"qif","Voting":"qfv"},"cookiePath":"/","contentFocusing":{"args":["4094p","3182829"],"fn":"bvShowContentOnReturnQA"}}}},{"module":"feedback","init":"onInjection","data":{"id":"Answer_hfrilr4ui284q5jwm43pw1w2s","options":{"cookiePrefixes":{"Inappropriate":"aif","Voting":"afv"},"cookiePath":"/","contentFocusing":{"args":["4094p","3182829"],"fn":"bvShowContentOnReturnQA"}}}},{"module":"qa/contentFocusingSupportQA","init":"postInjection","data":{"application":"QA","source":"readLink","defaultContentContainerId":"BVQAContainer","tabSwitcher":"bvShowTab","displayCode":"4094p"}}],
gotoCookieRegexp:/^https?:\/\/[^/?#]+(\/[^?#]*)\//,
inFrameSubmissionEnabled:false,
pageIdPrefix:"BVQA",
pageTrackers:["http://nordstrom.ugc.bazaarvoice.com/answers/4094p/static/q_0_ispacer.gif","http://nordstrom.ugc.bazaarvoice.com/answers/4094p/static/a_0_ispacer.gif"],
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
soiContainerID:"BVQAContentValidationID_3182829",
soiContentIDs:[],
sviParameterName:"bvqap",
sviRedirectBaseUrl:"",
webAnalyticsConfig:{"customTrackedObjects":"","customizersName":"BVQAAnalyticsCustomizers","customContainersFnName":"BVQAAnalyticsCustomContainers","conversionTracking":{"conversionTrackingElementSelector":null,"conversionTrackingMetadataSelector":null,"conversionTrackingParseRegexp":null,"conversionTrackingName":"AddToCart"},"SIWZeroDeployEnabled":false,"maxTrackingTagTraversalDepth":3,"customTrackedObjectsSelector":"","jsonData":{"bvProduct":"AskAndAnswer","autoTagAnalyticsConfiguration":{"trackSubmissionPageLoads":true,"autoTagAnalyticsVersion":"latest","trackFormActions":false,"productTracking":{"tracking":true,"initialProductDisplay":false},"vendors":[{"vendorName":"magpie","anonymous":true,"defaultClassesOnly":true}]},"bvExtension":{},"bvAnalyticsVersion":"4.9","productId":"3182829","eType":"Read","bvDisplayCode":"4094p","rootCategoryId":"Products","subjectType":"Product","brand":"St. John Collection","analyticsWhitespaceTrackingEnabled":false,"attributes":{"numQuestions":0,"numAnswers":0,"good":true},"ciTrackingEnabled":false,"bvClientName":"Nordstrom","leafCategoryId":"A3_B12_A_F"}},
widgetInitializers:initializers,
widgetLimit:1,
widgetMaterials:materials,
widgetMetadata:widgets,
windowTitle:null};
Injection.newInstance().apiInjection(injectionData);
});
});