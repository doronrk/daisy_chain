
RightNow.Client.Controller.addCss(["https:\/\/speedcommerce.widget.custhelp.com\/euf\/assets\/css\/syndicated_widgets\/standard\/ConditionalChatLink.css"]);RightNow.Client.Controller.includeCSS();if(!RightNow.Client.Event.evt_conditionalChatLinkAvailabilityResponse){RightNow.Client.Event.evt_conditionalChatLinkAvailabilityResponse=new RightNow.util.CustomEvent("evt_conditionalChatLinkAvailabilityResponse");}
if(!RightNow.Client.Event.evt_conditionalChatLinkOffered){RightNow.Client.Event.evt_conditionalChatLinkOffered=new RightNow.util.CustomEvent("evt_conditionalChatLinkOffered");}
if(!RightNow.Client.Event.evt_conditionalChatLinkClicked){RightNow.Client.Event.evt_conditionalChatLinkClicked=new RightNow.util.CustomEvent("evt_conditionalChatLinkClicked");}
RightNow.Client.ConditionalChatLink=function()
{function addChatDataParam(chatData,key,value)
{if(chatData===undefined)
chatData='';if(value===undefined||value===null||value.length===0)
return chatData;if(chatData.length!==0)
chatData+='&';chatData+=key+'='+value;return chatData;}
function onChatLinkAvailabilityResponse(type,args,instance)
{var result=args[0].data;var scope=args[1].scope;var eventScope=args[1];if(instance.instance_id!==eventScope.id)
return;instance.queueId=result.q_id;instance.surveyData=result.survey_data;if(result.rules!==undefined)
{instance.escalation=result.rules.escalation;instance.ruleState=result.rules.state;}
var minSessions=instance.attrs.min_sessions_avail;var waitThreshold=instance.attrs.wait_threshold;var availableSessionCount=0;var expectedWaitSeconds=0;var availableImmediately=false,availableWithWait=false,unavailableBusy=false,unavailableHours=false;if(result.stats)
{availableSessionCount=result.stats.availableSessionCount;expectedWaitSeconds=parseInt(result.stats.expectedWaitSeconds,10);if(result.q_id>0&&availableSessionCount>=minSessions&&expectedWaitSeconds<=waitThreshold&&(availableSessionCount>0||expectedWaitSeconds>0))
{if(expectedWaitSeconds===0)
availableImmediately=true;else
availableWithWait=true;}
else
{unavailableBusy=true;}}
else if(result.out_of_hours)
{unavailableHours=true;}
var Dom=RightNow.util.Dom;if(availableImmediately)
{if(instance._containerElement)
{Dom.addClass(instance._containerElement,'rn_ChatAvailable');}
if(instance._infoElement)
{instance._infoSpan.innerHTML=parseMacro(instance.attrs.label_available_immediately_template,expectedWaitSeconds,instance);Dom.addClass(instance._infoElement,'rn_ChatAvailable');}
if(instance._linkElement)
{instance._linkElement.innerHTML=instance._chatLinkDiv.innerHTML;Dom.addClass(instance._linkElement,'rn_ChatAvailable');}}
else if(availableWithWait)
{if(instance._containerElement)
{Dom.addClass(instance._containerElement,'rn_ChatAvailable');}
if(instance._infoElement)
{instance._infoSpan.innerHTML=parseMacro(instance.attrs.label_available_with_wait_template,expectedWaitSeconds,instance);Dom.addClass(instance._infoElement,'rn_ChatAvailable');}
if(instance._linkElement)
{instance._linkElement.innerHTML=instance._chatLinkDiv.innerHTML;Dom.addClass(instance._linkElement,'rn_ChatAvailable');}}
else if(unavailableBusy)
{if(instance._containerElement)
{Dom.removeClass(instance._containerElement,'rn_ChatAvailable');}
if(instance._infoElement)
{instance._infoSpan.innerHTML=parseMacro(instance.attrs.label_unavailable_busy_template,expectedWaitSeconds,instance);Dom.removeClass(instance._infoElement,'rn_ChatAvailable');}
if(instance._linkElement)
{instance._linkElement.innerHTML=instance._chatLink.innerHTML;Dom.removeClass(instance._linkElement,'rn_ChatAvailable');}}
else if(unavailableHours)
{if(instance._containerElement)
{Dom.removeClass(instance._containerElement,'rn_ChatAvailable');}
if(instance._infoElement)
{instance._infoSpan.innerHTML=instance.attrs.label_unavailable_hours;Dom.removeClass(instance._infoElement,'rn_ChatAvailable');}
if(instance._linkElement)
{instance._linkElement.innerHTML=instance._chatLink.innerHTML;Dom.removeClass(instance._linkElement,'rn_ChatAvailable');}}
else
{if(instance._containerElement)
{Dom.removeClass(instance._containerElement,'rn_ChatAvailable');}
if(instance._infoElement)
{instance._infoSpan.innerHTML=instance.attrs.label_default;Dom.removeClass(instance._infoElement,'rn_ChatAvailable');}
if(instance._linkElement)
{instance._linkElement.innerHTML=instance._chatLinkDiv.innerHTML;Dom.removeClass(instance._linkElement,'rn_ChatAvailable');}}
if(!instance._chatOffered&&(availableImmediately||availableWithWait)&&!instance.attrs.test)
{instance._chatOffered=true;instance.CT.submitClickAction(instance.CT.DQA_WIDGET_STATS,{w:instance.attrs.type.toString(),offers:1});RightNow.Client.ActionCapture.record('conditionalChatLink','available');RightNow.Client.Event.evt_conditionalChatLinkOffered.fire(instance.eo);}}
function parseMacro(message,expectedWaitSeconds,instance)
{var expectedWaitMinutes=Math.floor(expectedWaitSeconds/60);if(message.indexOf('{NUM_MINUTES}')!==-1)
{expectedWaitSeconds=expectedWaitSeconds%60;message=message.replace('{NUM_MINUTES}',expectedWaitMinutes).replace('{MINUTES}',expectedWaitMinutes===1?instance.data.label_minute:instance.data.label_minutes);}
var expectedWaitSecondsPadded=expectedWaitSeconds<10?'0'+expectedWaitSeconds.toString():expectedWaitSeconds;message=message.replace('{TIME}',expectedWaitMinutes+':'+expectedWaitSecondsPadded);return message.replace('{NUM_SECONDS}',expectedWaitSeconds).replace('{SECONDS}',expectedWaitSeconds===1?instance.data.label_second:instance.data.label_seconds);}
function startPolling(instance)
{var pollCount=10*60/5;var pollerID=setInterval(function()
{instance.checkChatLinkAvailability(null,instance);pollCount--;if(pollCount===0)
{clearInterval(pollerID);setInterval(function()
{instance.checkChatLinkAvailability(null,instance);},1*60*1000);}},5*1000);}
this.chatLinkClicked=function(context)
{var path=this.attrs.chat_login_page+'/request_source/'+this.data.request_source;var chatData='';if(!this.attrs.ignore_preroute)
{var surveyParms="",surveyData=this.surveyData;if(surveyData)
{if(surveyData.send_id)
surveyParms+="/survey_send_id/"+surveyData.send_id+"/survey_send_delay/"+surveyData.send_delay+(surveyData.send_auth?"/survey_send_auth/"+surveyData.send_auth:'');if(surveyData.comp_id)
surveyParms+="/survey_comp_id/"+surveyData.comp_id+(surveyData.comp_auth?"/survey_comp_auth/"+surveyData.comp_auth:'');if(surveyData.term_id)
surveyParms+="/survey_term_id/"+surveyData.term_id+(surveyData.term_auth?"/survey_term_auth/"+surveyData.term_auth:'');}
path+=surveyParms;chatData=addChatDataParam(chatData,'q_id',this.queueId);}
if(this.data.p)
{path+='/p/'+this.data.p;}
if(this.data.c)
{path+='/c/'+this.data.c;}
if(RightNow.env.ua.ie)
chatData=addChatDataParam(chatData,'referrerUrl',encodeURIComponent(window.location.href));chatData=addChatDataParam(chatData,'v_id',this.attrs.visitor_id);chatData=addChatDataParam(chatData,'ee_id',this.attrs.ee_id);chatData=addChatDataParam(chatData,'es_id',this.attrs.estara_id);chatData=addChatDataParam(chatData,'state',this.ruleState);chatData=addChatDataParam(chatData,'escalation',this.escalation);if(chatData.length!==0)
path+='/chat_data/'+RightNow.Client.Text.Encoding.base64Encode(chatData);if(this.data.common_fields_in_url)
path+=this.data.common_fields_in_url;if(this.data.custom_fields_in_url)
path+=this.data.custom_fields_in_url;if(RightNow.Client.Controller.session)
path+=RightNow.Client.Controller.session;if(this.eo.pta)
{if(path.match('/app/'))
path=path.substr(4);path=this.data.base_url+'/ci/pta/login/redirect'+path+'/p_li/'+this.eo.pta;}
else
{path=this.data.base_url+path;}
var callback=null;if(this.attrs.open_in_new_window)
{window.open(path,'chatLauncher','width='+this.attrs.chat_login_page_width+',height='+this.attrs.chat_login_page_height+',scrollbars=1');}
else
{this.navigateToUrl=path;callback=function()
{var callback=function(){window.location=this.navigateToUrl;}
if(!this._chatLinkClicked&&!this.attrs.test)
{RightNow.Client.ActionCapture.record('conditionalChatLink','click');RightNow.Client.ActionCapture.flush(callback,this);this._chatLinkClicked=true;}
else
{callback.apply(this);}}}
if(!this._chatLinkClicked&&!this.attrs.test)
{this.CT.submitClickAction(this.CT.DQA_WIDGET_STATS,{w:this.attrs.type.toString(),accepts:1},callback,this);if(!callback)
{RightNow.Client.ActionCapture.record('conditionalChatLink','click');this._chatLinkClicked=true;}}
else if(callback)
{callback.apply(this);}
RightNow.Client.Event.evt_conditionalChatLinkClicked.fire(this.eo);};this.init=function()
{RightNow.Client.Event.evt_conditionalChatLinkAvailabilityResponse.subscribe(onChatLinkAvailabilityResponse,this);if(window.location.protocol==='https:'&&this.data.uri.indexOf('http:')===0)
this.data.uri=this.data.uri.replace(/http:/i,'https:');this.eo=new RightNow.Client.EventObject(this.name,this.instance_id);this.eo.uri=this.data.uri;this.eo.dsType=RightNow.Client.Const.INTERNAL_TRADITIONAL;this.eo.dsCallbackField="callback";this.eo.dsResponseField="responseType";this.eo.dsResponseValue="JSON";RightNow.Client.Event.evt_widgetLoaded.fire(this.eo);};this.render=function()
{if(!this.attrs.test)
{RightNow.Client.ActionCapture.record('conditionalChatLink','render');}
this._containerElement=document.getElementById(this.attrs.container_element_id);this._linkElement=document.getElementById(this.attrs.link_element_id);this._infoElement=document.getElementById(this.attrs.info_element_id);if(!this._linkElement)
return;this._linkElementHTML=this._linkElement.innerHTML;var Dom=RightNow.util.Dom;if(this._containerElement)
Dom.addClass(this._containerElement,'rn_ConditionalChatLink');this._chatLinkDiv=document.createElement('div');this._chatLinkDiv.innerHTML=this.view;this._chatLink=this._chatLinkDiv.firstChild;while(this._linkElement.firstChild)
{this._chatLink.appendChild(this._linkElement.removeChild(this._linkElement.firstChild));}
if(this._infoElement)
{this._infoSpan=document.createElement('span');this._infoElement.appendChild(this._infoSpan);}
if(!this.attrs.enable_availability_check||this.attrs.test)
{if(this._containerElement)
Dom.addClass(this._containerElement,'rn_ChatAvailable');if(this._linkElement)
{this._linkElement.appendChild(this._chatLink);this._infoSpan.innerHTML=this.attrs.label_default;Dom.addClass(this._linkElement,'rn_ChatAvailable');}
if(this._infoElement)
Dom.addClass(this._infoElement,'rn_ChatAvailable');RightNow.Client.Event.evt_beforeDataRequest.fire(this.eo);this.CT.submitClickAction(this.CT.DQA_WIDGET_STATS,{w:this.attrs.type.toString(),offers:1});RightNow.Client.ActionCapture.record('conditionalChatLink','available');RightNow.Client.Event.evt_conditionalChatLinkOffered.fire(this.eo);}
else
{this.checkChatLinkAvailability(null,this);if(this.attrs.enable_polling)
startPolling(this);}};this.execute=function(){};this.checkChatLinkAvailability=function(callback,scope)
{this.eo.onComplete=RightNow.Client.Event.evt_conditionalChatLinkAvailabilityResponse;this.eo.callback=callback;this.eo.scope=scope;RightNow.Client.Event.evt_dataRequest.fire(this.eo);};};var justice_1=new RightNow.Client.ConditionalChatLink();justice_1.instance_id="justice_1";justice_1.uri="https://speedcommerce.custhelp.com/";justice_1.ds="ci/ds/get";justice_1.CT=new RightNow.Client.CT("https://speedcommerce.custhelp.com/ci/dqa/publish");justice_1.name="ConditionalChatLink";justice_1.data={"base_url":"https:\/\/speedcommerce.custhelp.com","request_source":8,"p":"6","c":null,"label_minute":"Minute","label_minutes":"Minutes","label_second":"Second","label_seconds":"Seconds","cached_content_server":"https:\/\/speedcommerce.widget.custhelp.com","uri":"https:\/\/speedcommerce.widget.custhelp.com\/ci\/ajaxRequestOptional\/checkChatQueue\/avail_type\/sessions\/cacheable\/true\/prod\/6"};justice_1.attrs={"enable_availability_check":true,"enable_polling":true,"ignore_preroute":false,"wait_threshold":40,"min_sessions_avail":0,"p":"6","c":"","custom_fields":"","chat_login_page":"\/app\/chat\/justice_launch","chat_login_page_width":510,"chat_login_page_height":780,"open_in_new_window":true,"label_available_with_wait_template":"online","label_available_immediately_template":"online","label_unavailable_busy_template":"offline","label_unavailable_hours":"offline","label_default":"online","container_element_id":"myChatLinkContainer2","link_element_id":"myChatLink2","info_element_id":"myChatLinkInfo2","instance_id":"justice_1","module":"ConditionalChatLink","type":7,"instance":"conditionalchatlink"};justice_1.view="<a id=\"rn_justice_1_Link\" href=\"javascript:void(0);\" onclick=\"justice_1.chatLinkClicked();\"><\/a>\n";RightNow.Client.Controller.verifyDiv(justice_1.attrs.div_id);justice_1.init();if(document.readyState==="complete"){justice_1.render(justice_1);}else{RightNow.util.Event.onDOMReady(justice_1.render,justice_1,true);}
var _rnq=_rnq||[];_rnq.push({"uh":"f293b927","uc":"speedcommerce.widget.custhelp.com\/ci\/widgetService\/get","b":"ca97370","i":"speedcommerce:speedcommerce","f":"rnw","p":"CP Syndicated Widget","v":"14.8.0.1-b113-sp1","th":"www.rnengage.com"});
(function(f){var b,d,a=document.createElement("iframe"),c=document.getElementsByTagName("script");a.src="javascript:false";a.title="";a.role="presentation";(a.frameElement||a).style.cssText="width:0;height:0;border:0";c=c[c.length-1];c.parentNode.insertBefore(a,c);try{b=a.contentWindow.document}catch(g){d=document.domain,a.src="javascript:var d=document.open();d.domain='"+d+"';void(0);",b=a.contentWindow.document}b.open()._l=function(){for(var a;f.length;)a=this.createElement("script"),d&&(this.domain=
d),a.src=f.pop(),this.body.appendChild(a)};b.write('<body onload="document._l();">');b.close()})(["https://www.rnengage.com/api/e/ca97370/e.js","//www.rnengage.com/api/1/javascript/acs.js"]);
