$BV.Internal.ajaxCallback(function(url,apiConfig){
if(!/(^|\.)(bazaarvoice\.com|underarmour\.com)(:\d+)?$/.test(location.hostname)){
throw "Bazaarvoice: Permission denied";
}
$BV.Internal.configureAppLoader("qa",false,{"cmn/2471redes2/analyticsInternalHooks":"analyticsHooks","cmn/2471redes3/analyticsInternalHooks":"analyticsHooks"});
$BV.Internal.require(["injection.shared","feedback","requester","browserVersion","qa/contentFocusingSupportQA","jquery.core","qa/analyticsHooksQA","qa/analyticsInternalLegacyHooksQA","dropdown","domUtils","contentSubscription","parseUri","cookies","analyticsVersioning","analyticsHooks","cmn/2471redes3/selectReplacer","cmn/2471redes3/analyticsInternalHooks","cmn/2471redes2/selectReplacer","cmn/2471redes2/analyticsInternalHooks","magpie","magpieTracking","analyticsAutoTagHooks","jquery.effects.core","animationOptions","contentDisplay","contentFocusingSupport","json2","swfobject","rpcSupport","iframeSupport","crossDomain","contentDispatcher","injection","injection.shared.replacements","injection.shared","apiCore","underscore","dotnet","injectionRPC","wrapperDivs","framedContent"],function(Injection){
var materials={"BVQASourceID":"<div id=\"BVQAWidgetID\" class=\"BVQAWidget\"><div id=\"BVQABrowsePageID\" class=\"BVQAWidgetWrapper BVQABrowsePage\"> <div id=\"BVQAHeaderID\" class=\"BVQAHeader\">\r\n<div id=\"BVQAQuestionAndAnswerCountID\" class=\"BVQAQuestionAndAnswerCount\"><span class=\"BVQACount BVQAZeroCount\"><span><span class=\"BVQANumber\">0<\/span> Questions<\/span><\/span><\/div><div id=\"BVQAHeaderTitleID\" class=\"BVQATitle BVQAHeaderTitle\">Product Q&amp;A<\/div><div id=\"BVQAHeaderSubTitleID\" class=\"BVQASubTitle BVQAHeaderSubTitle\">Ask your questions. Share your answers.<\/div><div class=\"BVContentSubscription\"><a id=\"BVDI_CSSubmitLink_lx0ciyjcjc1k1sphekerqdijh_ID\" title=\"Get new content notifications\" data-bvcsref=\"https://underarmour.ugc.bazaarvoice.com/answers/2471redes2/product/1253910/subscribesubject.htm?format=embeddedframe&amp;questionsanswers=true\" data-bvtrack=\"eventTarget:Product,eName:ProductFollow\" data-bvcsappcode=\"qa\" name=\"BV_TrackingTag_QA_Display_SubcribeContent\" class=\"BVDILink \" data-bvcssubjectid=\"1253910\" href=\"javascript://\" data-bvcssubjecttype=\"product\"><span class=\"BVDILinkSpan\">Follow this product<\/span><\/a><\/div> <\/div>\r\n<div id=\"BVQAMainID\" class=\"BVQAMain BVQAMainView\"><div id=\"BVQAViewQuestionsContentID\" class=\"BVQAMainContent BVQAViewQuestionsContent\"><div id=\"BVQANoQuestionsID\" class=\"BVQANoQuestions\"><div class=\"BVQATitle\">Be the first to ask a question!<\/div><a title=\"Submit a Question \" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"https://underarmour.ugc.bazaarvoice.com/answers/2471redes2/product/1253910/askquestion.djs?format=embeddedhtml&amp;campaignid=BV_QA_BROWSE&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=https%3A%2F%2Funderarmour.ugc.bazaarvoice.com%2Fanswers%2F2471redes2%2Fproduct%2F1253910%2Fquestions.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_QA_Display_AskFirstQuestion\" onclick=\"bvShowContentOnReturnQA('2471redes2', '1253910', 'BVQAWidgetID');return typeof(BVQAOnSubmit)=='function' ? BVQAOnSubmit(this.href, 'QUESTION_SUBMISSION') : true;\" href=\"javascript://\">Submit a Question <\/a><\/div><\/div><\/div><div id=\"BVQAFooterID\" class=\"BVQAFooter\"><div id=\"BVQAGuidelinesID\" class=\"BVQAGuidelines\"><a name=\"BV_TrackingTag_QA_Display_QAndAGuidelines\" href=\"https://underarmour.ugc.bazaarvoice.com/answers/2471redes2/content/guidelines.htm\" target=\"_blank\" onclick=\"window.open(this.href,null,'left=50,top=50,width=500,height=500,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" title=\"Policies &amp; Guidelines\">Policies &amp; Guidelines<\/a><\/div><\/div><\/div><\/div>","BVQASummaryBoxSourceID":"<div id=\"BVQASummaryBoxID\" class=\"BVQASummaryBox BVQASummaryBoxView\"><div id=\"BVQASummaryBoxTitleID\" class=\"BVQATitle BVQASummaryBoxTitle\">Product Q&amp;A<\/div><div id=\"BVQASummaryBoxAskFirstQuestionID\" class=\"BVQASummaryBoxLink\">Be the first to <a title=\"Ask a Question\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"https://underarmour.ugc.bazaarvoice.com/answers/2471redes2/product/1253910/askquestion.djs?format=embeddedhtml&amp;campaignid=BV_QA_BROWSE&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=https%3A%2F%2Funderarmour.ugc.bazaarvoice.com%2Fanswers%2F2471redes2%2Fproduct%2F1253910%2Fquestions.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_QA_Display_AskQuestion\" onclick=\"return typeof(BVQAOnSubmit)=='function' ? BVQAOnSubmit(this.href, 'QUESTION_SUBMISSION') : true;\" href=\"javascript://\">ask a question<\/a>.<\/div><\/div>"},
initializers={"BVQASourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVQASummaryBoxSourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}]},
widgets={};
widgets["content"]={"handledContentTypes":["Question","Answer"],"containerId":"BVQAContainer","sourceId":"BVQASourceID"};
widgets["summary"]={"containerId":"BVQASummaryContainer","sourceId":"BVQASummaryBoxSourceID"};
var injectionData={
apiConfig:apiConfig,
containerInitializer:false,
cookiePath:"/",
crossDomainUrl:"https://underarmour.ugc.bazaarvoice.com/answers/2471redes2/crossdomain.htm?format=embedded",
embeddedUrl:url,
globalInitializers:[{"module":"contentSubscription","init":"contentDisplay","data":{"rootWrappers":[]}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVQAContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVQASummaryContainer"}},{"module":"dropdown","init":"addSelectHandlers","data":{"dropdownId":"BVQASortListID"}},{"module":"feedback","init":"onInjection","data":{"id":"Product_hqvvqkws41gb076ykbqvfsbwk","options":{"cookiePrefixes":{"Voting":"pfv"},"cookiePath":"/","contentFocusing":{"args":["2471redes2","1253910"],"fn":"bvShowContentOnReturnQA"}}}},{"module":"feedback","init":"onInjection","data":{"id":"Question_hqvvqkws41gb076ykbqvfsbwk","options":{"cookiePrefixes":{"Inappropriate":"qif","Voting":"qfv"},"cookiePath":"/","contentFocusing":{"args":["2471redes2","1253910"],"fn":"bvShowContentOnReturnQA"}}}},{"module":"feedback","init":"onInjection","data":{"id":"Answer_hqvvqkws41gb076ykbqvfsbwk","options":{"cookiePrefixes":{"Inappropriate":"aif","Voting":"afv"},"cookiePath":"/","contentFocusing":{"args":["2471redes2","1253910"],"fn":"bvShowContentOnReturnQA"}}}},{"module":"qa/contentFocusingSupportQA","init":"postInjection","data":{"application":"QA","source":"readLink","defaultContentContainerId":"BVQAContainer","tabSwitcher":"bvShowTab","displayCode":"2471redes2"}}],
gotoCookieRegexp:/^https?:\/\/[^/?#]+(\/[^?#]*)\//,
inFrameSubmissionEnabled:false,
pageIdPrefix:"BVQA",
pageTrackers:["https://underarmour.ugc.bazaarvoice.com/answers/2471redes2/static/q_0_ispacer.gif","https://underarmour.ugc.bazaarvoice.com/answers/2471redes2/static/a_0_ispacer.gif"],
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
soiContainerID:"BVQAContentValidationID_1253910",
soiContentIDs:[],
sviParameterName:"bvqap",
sviRedirectBaseUrl:"",
webAnalyticsConfig:{"customTrackedObjects":"","customizersName":"BVQAAnalyticsCustomizers","customContainersFnName":"BVQAAnalyticsCustomContainers","conversionTracking":{"conversionTrackingElementSelector":null,"conversionTrackingMetadataSelector":null,"conversionTrackingParseRegexp":null,"conversionTrackingName":"AddToCart"},"SIWZeroDeployEnabled":false,"maxTrackingTagTraversalDepth":3,"customTrackedObjectsSelector":"","jsonData":{"bvProduct":"AskAndAnswer","autoTagAnalyticsConfiguration":{"trackSubmissionPageLoads":true,"autoTagAnalyticsVersion":"latest","trackFormActions":false,"productTracking":{"tracking":true,"initialProductDisplay":false},"vendors":[{"vendorName":"magpie","anonymous":false,"brandDomain":"false","defaultClassesOnly":false}]},"bvExtension":{},"bvAnalyticsVersion":"4.7","productId":"1253910","eType":"Read","bvDisplayCode":"2471redes2","rootCategoryId":"Apparel","subjectType":"Product","brand":"","analyticsWhitespaceTrackingEnabled":false,"attributes":{"numQuestions":0,"numAnswers":0,"good":true},"ciTrackingEnabled":false,"bvClientName":"UnderArmour","leafCategoryId":"Apparel"}},
widgetInitializers:initializers,
widgetLimit:1,
widgetMaterials:materials,
widgetMetadata:widgets,
windowTitle:null};
Injection.newInstance().apiInjection(injectionData);
});
});