
(window.callback6899=window.callback6899||Bootstrapper.new_fArray()).add(function(){Bootstrapper.setCurrentRuleId(6899);cy={};cy.control={};cy._version='3.6.15/335';cy.documentdomain=window.document.domain;cy.locationpathname=window.location.pathname;cy.documentreferrer=window.document.referrer;cy.control.defaults={};cy.control.defaults.PageName="";cy.control.defaults.FunnelLevel="0";cy.control.defaults.Section="";cy.control.defaults.UserId="";cy.control.defaults.Product="";cy.control.defaults.Quantity=0;cy.control.defaults.Value=0.0;cy.control.defaults.OrderNumber="";cy.control.defaults.ReturnToLink="";cy.control.defaults.Custom1="";cy.control.defaults.Custom2="";cy.control.defaults.Custom3="";cy.control.defaults.Custom4="";cy.control.defaults.Custom5="";cy.control.defaults.Custom6="";cy.control.defaults.Custom7="";cy.control.defaults.Custom8="";cy.control.defaults.Custom9="";cy.control.defaults.Custom10="";cy.control.defaults.Custom11="0";cy.control.defaults.Custom12="0";cy.control.defaults.Custom13="0";cy.control.defaults.Custom14="0";cy.control.defaults.Custom15="0";cy.control.defaults.Custom16="0";cy.control.defaults.Custom17="0";cy.control.defaults.Custom18="0";cy.control.defaults.Custom19="0";cy.control.defaults.Custom20="0";cy.control.defaults.BusinessUnitCode="";cy.control.WAIT_DURATION=100;cy.control.UPPER_LIMIT_WAIT_DURATION=2000;cy.control.CSSR=0.0;cy.control.CSM=0;cy.CSSID='';cy.control.CSSESSIONFLAG=-1;cy.CUSTOMERCODE='8859234113';cy.BASKETAPPEND='1';cy.control.misc_data_keys=new Array();cy.control.misc_data_vals=new Array();cy.control.misc_data_map=new Array();cy.control.misc_data_count=0;cy.control.cookieinfo={domain:null,path:"/",secure:false};var cyPageBasket="";var cyCurrLineNumber="";cy.control._cyImages={};cy.control._cyGetUniqueId=(function(){var id=0;return function(){return"_"+id++;};})();cy.control.cySessionIdDetails=null;cy.control.cyGenerateSessionId=true;cyResetCYToDefaults=function(){cy.documentdomain=window.document.domain;cy.locationpathname=window.location.pathname;cy.documentreferrer=window.document.referrer;cy.control.defaults.PageName="";cy.control.defaults.FunnelLevel="0";cy.control.defaults.Section="";cy.control.defaults.UserId="";cy.control.defaults.Product="";cy.control.defaults.Quantity=0;cy.control.defaults.OrderNumber="";cy.control.defaults.Value=0.0;cy.control.defaults.ReturnToLink="";cy.control.defaults.Custom1="";cy.control.defaults.Custom2="";cy.control.defaults.Custom3="";cy.control.defaults.Custom4="";cy.control.defaults.Custom5="";cy.control.defaults.Custom6="";cy.control.defaults.Custom7="";cy.control.defaults.Custom8="";cy.control.defaults.Custom9="";cy.control.defaults.Custom10="";cy.control.defaults.Custom11="0";cy.control.defaults.Custom12="0";cy.control.defaults.Custom13="0";cy.control.defaults.Custom14="0";cy.control.defaults.Custom15="0";cy.control.defaults.Custom16="0";cy.control.defaults.Custom17="0";cy.control.defaults.Custom18="0";cy.control.defaults.Custom19="0";cy.control.defaults.Custom20="0";cy.control.defaults.BusinessUnitCode="";};cy.control._cyBrowser={isMicrosoft:navigator.appName.indexOf("Microsoft")!=-1};cy.control._cyNavigate=function(url){if(cy.control._cyBrowser.isMicrosoft===true){var referLink=document.createElement('a');referLink.href=url;document.body.appendChild(referLink);referLink.click();}else{window.location=url;}};_cyGetCookie=function(c_name,suffix_allowed){var c_start;var c_end;if(document.cookie.length>0){if(suffix_allowed===false){c_start=document.cookie.toLowerCase().indexOf(c_name.toLowerCase()+"=");if(c_start!=-1){c_start=c_start+c_name.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1){c_end=document.cookie.length;}
return decodeURIComponent(document.cookie.substring(c_start,c_end));}}else{var regexp=c_name.toLowerCase()+"(.*)=";c_start=document.cookie.toLowerCase().search(regexp);if(c_start!=-1){var s1=document.cookie.slice(c_start);c_start=s1.indexOf("=")+1;if(c_start!=-1)
{c_end=s1.indexOf(";");if(c_end==-1){c_end=s1.length;}
return decodeURIComponent(s1.substring(c_start,c_end));}}}}
return"";};cy.control._cyConvertCYPropertyNamesToUpperCase=function(){var propertyValue="";for(var propertyName in cy){if(propertyName!="control"){propertyValue=cy[propertyName];delete cy[propertyName];cy[propertyName.toUpperCase()]=propertyValue;}}
return"";};cy.control._cyGetWaitDuration=function(){return cy.control.WAIT_DURATION;};cySetWaitDuration=function(millis){cy.control.WAIT_DURATION=millis;};cy.control._cyGetUpperLimitWaitDuration=function(){return cy.control.UPPER_LIMIT_WAIT_DURATION;};cySetUpperLimitWaitDuration=function(millis){cy.control.UPPER_LIMIT_WAIT_DURATION=millis;};cy.control._cyOnImageLoad=function(elementId){cy.control._cyImages[elementId].loadingComplete=true;};cy.control._cyGetLoaded=function(elementId){return cy.control._cyImages[elementId].loadingComplete;};cy.control._cyOnImageAbort=function(elementId){cy.control._cyImages[elementId].loadingComplete=false;};cy.control._cyCreateImage=function(doCreateHandlers){var cy_image=document.createElement("img");cy_image.id=cy.control._cyGetUniqueId();var createHandlers=false;if(doCreateHandlers&&typeof(doCreateHandlers)=="boolean"){createHandlers=doCreateHandlers;}
if(createHandlers===true){cy_image.onload=function(){cy.control._cyOnImageLoad(cy_image.id);};cy_image.onabort=function(){cy.control._cyOnImageAbort(cy_image.id);};}
cy_image.width=1;cy_image.height=1;cy_image.border=0;var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(cy_image,s);return cy_image;}
cy.control._cySetCYProperties=function(ocy,cysetter){if(ocy){for(var p in ocy){cy[p]=ocy[p];}
cy.control._cyConvertCYPropertyNamesToUpperCase();}
if(cysetter&&typeof(cysetter)=="function"){cysetter();cy.control._cyConvertCYPropertyNamesToUpperCase();}}
cy.control._cyTimeoutSubmit=function(thisForm,elementId,resetTimeout){if(resetTimeout===true&&cy.control._cyIsImageLoadedOrTimedOut(elementId)===false){setTimeout(function(){cy.control._cyTimeoutSubmit(thisForm,elementId,true);},cy.control._cyGetWaitDuration());cy.control._cyImages[elementId].totalWaitTime+=cy.control._cyGetWaitDuration();}else{thisForm.submit();}}
cy.control._cyOnSubmit=function(thisForm,wait){try{var cy_image=cy.control._cyCreateImage(wait);if(wait===true){cy.control._cyImages[cy_image.id]={totalWaitTime:0,loadingComplete:false};cy_image.src=cy.control._cyGetElementSrc("seewhy.gif");}else{cy_image.src=cy.control._cyGetElementSrc("seewhy.nogif");}
setTimeout(function(){cy.control._cyTimeoutSubmit(thisForm,cy_image.id,wait);},cy.control._cyGetWaitDuration());}catch(err){}
return false;}
cyOnSubmit=function(thisForm,doWait,ocy,cysetter){var waitOnImage=false;try{cy.control._cySetCYProperties(ocy,cysetter);if(doWait&&typeof(doWait)=="boolean"){waitOnImage=doWait;}}catch(err){}
return cy.control._cyOnSubmit(thisForm,waitOnImage);}
cy.control._cyIsImageLoadedOrTimedOut=function(elementId){if((cy.control._cyImages[elementId].totalWaitTime>cy.control._cyGetUpperLimitWaitDuration())||(document.getElementById(elementId).complete===true&&cy.control._cyGetLoaded(elementId)===true)){return true;}
return false;}
cy.control._cyWait=function(millis){var start=new Date().getTime();while(new Date().getTime()<(start+millis)){}}
cyOnPageLoad=function(isBlocking,doDelay,ocy,cysetter){var block=false;if(isBlocking&&typeof(isBlocking)=="boolean"){block=isBlocking;}
try{cy.control._cySetCYProperties(ocy,cysetter);if(block===true){src=cy.control._cyGetElementSrc("seewhy.js");if(document.readyState){if(document.readyState!="complete"){document.write('<script type="text/javascript" src="',src,'"><\/script>');}}else{document.write('<script type="text/javascript" src="',src,'"><\/script>');}}else{var cy_image=cy.control._cyCreateImage(false);cy_image.src=cy.control._cyGetElementSrc("seewhy.nogif");}
var delay=false;if(doDelay&&typeof(doDelay)=="boolean"){delay=doDelay;}
if(delay===true){cy.control._cyWait(cy.control._cyGetWaitDuration());}}catch(err){}}
cy.control._cyTimeoutLink=function(anchor,elementId,resetTimeout){if(resetTimeout===true&&cy.control._cyIsImageLoadedOrTimedOut(elementId)===false){setTimeout(function(){cy.control._cyTimeoutLink(anchor,elementId,true);},cy.control._cyGetWaitDuration());cy.control._cyImages[elementId].totalWaitTime+=cy.control._cyGetWaitDuration();}else{if(anchor&&anchor.href){cy.control._cyNavigate(anchor.href);}}}
cyOnLink=function(anchor,doWait,ocy,cysetter){var wait=false;if(doWait&&typeof(doWait)=="boolean"){wait=doWait;}
try{cy.control._cySetCYProperties(ocy,cysetter);var cy_image=cy.control._cyCreateImage(wait);if(wait){cy.control._cyImages[cy_image.id]={totalWaitTime:0,loadingComplete:false};cy_image.src=cy.control._cyGetElementSrc("seewhy.gif");}else{cy_image.src=cy.control._cyGetElementSrc("seewhy.nogif");}
setTimeout(function(){cy.control._cyTimeoutLink(anchor,cy_image.id,wait);},cy.control._cyGetWaitDuration());}catch(err){}
return false;}
cyOnClick=function(doDelay,ocy,cysetter){try{cy.control._cySetCYProperties(ocy,cysetter);var cy_image=cy.control._cyCreateImage(false);cy_image.src=cy.control._cyGetElementSrc("seewhy.nogif");var delay=false;if(doDelay&&typeof(doDelay)=="boolean"){delay=doDelay;}
if(delay){cy.control._cyWait(cy.control._cyGetWaitDuration());}}catch(err){}}
cyOnChange=function(doDelay,ocy,cysetter){try{cy.control._cySetCYProperties(ocy,cysetter);var cy_image=cy.control._cyCreateImage(false);cy_image.src=cy.control._cyGetElementSrc("seewhy.nogif");var delay=false;if(doDelay&&typeof(doDelay)=="boolean"){delay=doDelay;}
if(delay){cy.control._cyWait(cy.control._cyGetWaitDuration());}}catch(err){}}
cy.control._cyGetDT=function(){var d=new Date();var t=d.getTime();var tz=d.getTimezoneOffset();return t+"~"+tz;}
cy.control._getBaseURL=function(res){var resource="seewhy.gif";if(res){resource=res;}
var protocol;var port;var swd='abandonment3.saas.seewhy.com';var path='/abandonment2/WE/'+resource;var ssl=window.location.protocol.toLowerCase().indexOf('https')>=0;if(ssl){protocol='https';port=443;}else{protocol='http';port=80;}
var swi=protocol+'://'+swd+':'+port+path;var rn=Math.random();return swi+"/"+rn;}
cy.control._cyGetElementSrc=function(res){cy.control._cyConvertCYPropertyNamesToUpperCase();var baseURL=cy.control._getBaseURL(res);var sessionId=cy.control._cyGetSessionId();var csData='';if(cy.control._cyIsCSSession()==true){if(cy.control.CSM==0){csData="&ClickstreamFlag=2&ClickstreamSessionID="+cy.CSSID;}}else{csData="&ClickstreamFlag=0";}
var queryString="?Event=WebEvent"+"&CustomerCode="+cy.CUSTOMERCODE+"&Server="+cy.DOCUMENTDOMAIN+"&DefaultPageName="+encodeURIComponent(cy.LOCATIONPATHNAME)+"&Referrer="+encodeURIComponent(cy.DOCUMENTREFERRER)+"&SessionID="+encodeURIComponent(sessionId)+"&FunnelLevel="+encodeURIComponent((cy.FUNNELLEVEL==undefined)?cy.control.defaults.FunnelLevel:cy.FUNNELLEVEL)+"&Section="+encodeURIComponent((cy.SECTION==undefined)?cy.control.defaults.Section:cy.SECTION)+"&UserID="+encodeURIComponent((cy.USERID==undefined)?cy.control.defaults.UserId:cy.USERID)+"&Product="+encodeURIComponent((cy.PRODUCT==undefined)?cy.control.defaults.Product:cy.PRODUCT)+"&Quantity="+encodeURIComponent((cy.QUANTITY==undefined)?cy.control.defaults.Quantity:cy.QUANTITY)+"&OrderNumber="+encodeURIComponent((cy.ORDERNUMBER==undefined)?cy.control.defaults.OrderNumber:cy.ORDERNUMBER)+"&Value="+encodeURIComponent((cy.VALUE==undefined)?cy.control.defaults.Value:cy.VALUE)+"&PageName="+encodeURIComponent((cy.PAGENAME==undefined)?cy.control.defaults.PageName:cy.PAGENAME)+"&ReturnToLink="+encodeURIComponent((cy.RETURNTOLINK==undefined)?cy.control.defaults.ReturnToLink:cy.RETURNTOLINK)+"&Custom1="+encodeURIComponent((cy.CUSTOM1==undefined)?cy.control.defaults.Custom1:cy.CUSTOM1)+"&Custom2="+encodeURIComponent((cy.CUSTOM2==undefined)?cy.control.defaults.Custom2:cy.CUSTOM2)+"&Custom3="+encodeURIComponent((cy.CUSTOM3==undefined)?cy.control.defaults.Custom3:cy.CUSTOM3)+"&Custom4="+encodeURIComponent((cy.CUSTOM4==undefined)?cy.control.defaults.Custom4:cy.CUSTOM4)+"&Custom5="+encodeURIComponent((cy.CUSTOM5==undefined)?cy.control.defaults.Custom5:cy.CUSTOM5)+"&Custom6="+encodeURIComponent((cy.CUSTOM6==undefined)?cy.control.defaults.Custom6:cy.CUSTOM6)+"&Custom7="+encodeURIComponent((cy.CUSTOM7==undefined)?cy.control.defaults.Custom7:cy.CUSTOM7)+"&Custom8="+encodeURIComponent((cy.CUSTOM8==undefined)?cy.control.defaults.Custom8:cy.CUSTOM8)+"&Custom9="+encodeURIComponent((cy.CUSTOM9==undefined)?cy.control.defaults.Custom9:cy.CUSTOM9)+"&Custom10="+encodeURIComponent((cy.CUSTOM10==undefined)?cy.control.defaults.Custom10:cy.CUSTOM10)+"&Custom11="+encodeURIComponent((cy.CUSTOM11==undefined)?cy.control.defaults.Custom11:cy.CUSTOM11)+"&Custom12="+encodeURIComponent((cy.CUSTOM12==undefined)?cy.control.defaults.Custom12:cy.CUSTOM12)+"&Custom13="+encodeURIComponent((cy.CUSTOM13==undefined)?cy.control.defaults.Custom13:cy.CUSTOM13)+"&Custom14="+encodeURIComponent((cy.CUSTOM14==undefined)?cy.control.defaults.Custom14:cy.CUSTOM14)+"&Custom15="+encodeURIComponent((cy.CUSTOM15==undefined)?cy.control.defaults.Custom15:cy.CUSTOM15)+"&Custom16="+encodeURIComponent((cy.CUSTOM16==undefined)?cy.control.defaults.Custom16:cy.CUSTOM16)+"&Custom17="+encodeURIComponent((cy.CUSTOM17==undefined)?cy.control.defaults.Custom17:cy.CUSTOM17)+"&Custom18="+encodeURIComponent((cy.CUSTOM18==undefined)?cy.control.defaults.Custom18:cy.CUSTOM18)+"&Custom19="+encodeURIComponent((cy.CUSTOM19==undefined)?cy.control.defaults.Custom19:cy.CUSTOM19)+"&Custom20="+encodeURIComponent((cy.CUSTOM20==undefined)?cy.control.defaults.Custom20:cy.CUSTOM20)+"&BizUnit="+encodeURIComponent((cy.BUSINESSUNITCODE==undefined)?cy.control.defaults.BusinessUnitCode:cy.BUSINESSUNITCODE)+csData+"&ClientTimeAndTZ="+cy.control._cyGetDT()+"&Version="+cy._VERSION+_cyGetBasketLinesQueryString()+"&BasketAppend="+cy.BASKETAPPEND+cy.control.cyGetUserDefinedQueryString();var src=baseURL+queryString;return src;}
cySetSessionDetails=function(sessionIdName,suffixAllowed){var isSuffixAllowed=false;if(suffixAllowed&&typeof(suffixAllowed)=="boolean"){isSuffixAllowed=suffixAllowed;}
cy.control.cySessionIdDetails={sessionKeyName:sessionIdName,sessionKeySuffixAllowed:isSuffixAllowed};}
cy.control._cyGetSessionId=function(){var sessionId;if(cy.SESSIONID!=null){sessionId=cy.SESSIONID;}else{if(cy.control.cyGenerateSessionId===true){sessionId=cy.control._cyGetGeneratedSessionId();}else{if(cy.control.cySessionIdDetails&&cy.control.cySessionIdDetails.sessionKeyName){sessionId=_cyGetCookie(cy.control.cySessionIdDetails.sessionKeyName,cy.control.cySessionIdDetails.sessionKeySuffixAllowed);}else{var sessionId=_cyGetCookie("JSESSIONID",false);if(sessionId==""){sessionId=_cyGetCookie("ASPSESSIONID",true);}
if(sessionId==""){sessionId=_cyGetCookie("PHPSESSID",false);}
if(sessionId==""){sessionId=_cyGetCookie("ASP.NET_SessionId",false);}
if(sessionId==""){sessionId=_cyGetCookie("sid",false);}
if(sessionId==""){sessionId=_cyGetCookie("SESS",true);}}}}
return sessionId;}
cy.control._cyGetGeneratedSessionId=function(){var cyd;cyd=_cyGetCookie("__cy_d",false);if(cyd==""){cyd=_cyGenerateUUID();}
_cyCreateClientCookie("__cy_d",cyd,(60*60*24*365*2));return cyd;}
cySetCookieInfo=function(domain,path,secure){cy.control.cookieinfo.domain=domain;if(path){cy.control.cookieinfo.path=path;}
if(secure){cy.control.cookieinfo.secure=secure;}}
_cyGenerateUUID=function(){return'NNNNNNNN-NNNN-4NNN-XNNN-NNNNNNNNNNNN'.replace(/[NX]/g,function(c){var rn=Math.floor(Math.random()*16);if(c=='N'){v=rn;}else{v=(rn&0x3|0x8);}
return v.toString(16);}).toUpperCase();}
_cyCreateClientCookie=function(cookieName,cookieValue,maxage,domain,path,secure){var value=encodeURIComponent(cookieValue);var maxageString="";var domainString="";var pathString="; path=/";var secureString="";if(maxage!=null&&maxage!=""){if(cy.control._cyBrowser.isMicrosoft===true){var date=new Date();date.setTime(date.getTime()+(maxage*1000));maxageString="; expires="+date.toUTCString();}else{maxageString="; max-age="+maxage;}}else{maxageString="";}
if(domain){domainString=";domain="+domain;}else if(cy.control.cookieinfo.domain){domainString=";domain="+cy.control.cookieinfo.domain;}
if(path){pathString=";path="+path;}else if(cy.control.cookieinfo.path){pathString=";path="+cy.control.cookieinfo.path;}
if(secure&&secure===true){secureString=";secure";}else if(cy.control.cookieinfo.secure&&cy.control.cookieinfo.secure===true){secureString=";secure";}
document.cookie=cookieName+"="+value+domainString+maxageString+pathString+secureString;}
cy_getImageSrc=function(){cyOnPageLoad(false,false);}
cy.control._getCSSampleRate=function(){return cy.control.CSSR;}
cy.control._cyCreateClickStreamCookie=function(isCS){var css_c_val;if(isCS){var css_id=_cyGenerateUUID();cy.cssid=css_id;css_c_val="1:"+css_id;}else{css_c_val="0:";}
_cyCreateClientCookie("__cy_e",css_c_val);}
cy.control._cyIsCSSession=function(){if(cy.control.CSSESSIONFLAG==-1){cy.control.CSSESSIONFLAG=cy.control._cyCSSession()==true?1:0;}
return cy.control.CSSESSIONFLAG==1?true:false;}
cy.control._cyCSSession=function(){var sr=cy.control._getCSSampleRate();if(sr<=0){return false;}
var css=false;var cssid=_cyGetCookie("__cy_e",false);if(cssid!=""){var cssid_details=[];cssid_details=cssid.split(':');if(cssid_details.length>0){var is_css=cssid_details[0];if(is_css==1){css=true;if(cssid_details.length>1){cy.cssid=cssid_details[1];}else{css=cy.control._cyClickStreamCookie();}}}else{css=cy.control._cyClickStreamCookie();}}else{var rn=Math.random();if(rn<sr){cy.control._cyCreateClickStreamCookie(true);css=true;}else{cy.control._cyCreateClickStreamCookie(false);}}
return css;}
cy.control._cyClickStreamCookie=function(){var css=false;var rn=Math.random();if(rn<sr){cy.control._cyCreateClickStreamCookie(true);css=true;}else{cy.control._cyCreateClickStreamCookie(false);}
return css;}
cy.control._cyCS=function(){if(cy.control._cyIsCSSession()==true){cy.control.CSM==1?cy.control._cyCS1():cy.control._cyCS0();}}
cy.control._cyCS0=function(){cy.control._cyConvertCYPropertyNamesToUpperCase();var baseURL=cy.control._getBaseURL();var ref=encodeURIComponent(cy.DOCUMENTREFERRER);var queryString="?Event=WebEvent"+"&CustomerCode="+cy.CUSTOMERCODE+"&DefaultPageName="+encodeURIComponent(cy.LOCATIONPATHNAME)+"&Referrer="+encodeURIComponent(cy.DOCUMENTREFERRER)+"&ClickstreamSessionID="+cy.CSSID+"&ClientTimeAndTZ="+cy.control._cyGetDT()+"&FunnelLevel=0"+"&ClickstreamFlag=1"+"&Version="+cy._VERSION;var src=baseURL+queryString;var cy_image=cy.control._cyCreateImage(false);cy_image.src=src;}
cy.control._cyCS1=function(){}
_cyFormatLineNumber=function(iLineNumber){var strLineNumber;iLineNumber<10?(strLineNumber='00'+iLineNumber):iLineNumber<100?(strLineNumber='0'+iLineNumber):(strLineNumber=''+iLineNumber);return strLineNumber;}
_cyGetBasketDetailNameFromKeyStartingAt=function(strValue,iStartPosition){var iEqualsStartPosition,iLineNameStartPosition,strLineName;iLineNameStartPosition=iStartPosition+7;iEqualsStartPosition=strValue.indexOf(':',iStartPosition);strLineName=strValue.substr(iLineNameStartPosition,iEqualsStartPosition-iLineNameStartPosition);return strLineName;}
_cyGetBasketDetailValueFromKeyStartingAt=function(strValue,iStartPosition){var iKVDelimiterStartPosition,iPairDelimiterStartPosition,strLineValue;iKVDelimiterStartPosition=strValue.indexOf(':',iStartPosition);iPairDelimiterStartPosition=strValue.indexOf('&',iStartPosition);iPairDelimiterStartPosition==-1?(strLineValue=strValue.substr(iKVDelimiterStartPosition+1,strValue.length-(iKVDelimiterStartPosition+1))):(strLineValue=strValue.substr(iKVDelimiterStartPosition+1,iPairDelimiterStartPosition-(iKVDelimiterStartPosition+1)));return strLineValue;}
_cyGetNextBasketLineNumber=function(){var iCurrentLineNumber,iHighestLineNumber,iNextStartPosition,iPos,strBasketLineCookieValue,strLineNumber,iLineNumberStartPosition;iNextStartPosition=0;iHighestLineNumber=0;strBasketLineCookieValue=_cyGetBasketLineCookieValue();while((iPos=strBasketLineCookieValue.indexOf('CYBK',iNextStartPosition))!=-1){strLineNumber=(iLineNumberStartPosition=iPos+4,strBasketLineCookieValue.substr(iLineNumberStartPosition,iLineNumberStartPosition+3-iLineNumberStartPosition));iCurrentLineNumber=parseInt(strLineNumber,10);iCurrentLineNumber>iHighestLineNumber&&(iHighestLineNumber=iCurrentLineNumber);iNextStartPosition=iPos+1;}
return _cyFormatLineNumber(iHighestLineNumber+1);}
_cyGetNextBasketLineNumberInt=function(){var strNextLineNumber;var iNextLineNumber;strNextLineNumber=_cyGetNextBasketLineNumber();iNextLineNumber=parseInt(strNextLineNumber,10);return iNextLineNumber;}
_cyInsertBasketLineValue=function(strBeforeLineNumber,strInsertionName,strInsertionValue){var blnFirst,iCurrentLineNumber,iInsertionPointLineNumber,iNextStartPosition,iPos,strBasketLineCookieValue,strDetailsToKeep,strLineNumber,strName,strValue,iLineNumberStartPosition;iNextStartPosition=0;strDetailsToKeep='';blnFirst=true;strBasketLineCookieValue=_cyGetBasketLineCookieValue();if(strBasketLineCookieValue!=null){iInsertionPointLineNumber=parseInt(strBeforeLineNumber,10);while((iPos=strBasketLineCookieValue.indexOf('CYBK',iNextStartPosition))!=-1){strLineNumber=(iLineNumberStartPosition=iPos+4,strBasketLineCookieValue.substr(iLineNumberStartPosition,iLineNumberStartPosition+3-iLineNumberStartPosition));strName=_cyGetBasketDetailNameFromKeyStartingAt(strBasketLineCookieValue,iPos);strValue=_cyGetBasketDetailValueFromKeyStartingAt(strBasketLineCookieValue,iPos);iNextStartPosition=iPos+1;iCurrentLineNumber=parseInt(strLineNumber,10);iCurrentLineNumber>=iInsertionPointLineNumber&&++iCurrentLineNumber;blnFirst||(strDetailsToKeep=strDetailsToKeep+'&');strDetailsToKeep=strDetailsToKeep+'CYBK';strDetailsToKeep=strDetailsToKeep+_cyFormatLineNumber(iCurrentLineNumber);strDetailsToKeep=strDetailsToKeep+strName;strDetailsToKeep=strDetailsToKeep+':';strDetailsToKeep=strDetailsToKeep+strValue;blnFirst=false;}
_cySetBasketLineCookieValue(strDetailsToKeep);}
_cyUpdateBasketLineValue(strBeforeLineNumber,strInsertionName,strInsertionValue);}
_cyInsertBasketLineValueInt=function(iBeforeLineNumber,strInsertionName,strInsertionValue){_cyInsertBasketLineValue(_cyFormatLineNumber(iBeforeLineNumber),strInsertionName,strInsertionValue);}
_cyRemoveBasketLine=function(strLineNumberToRemove){var blnFirst,iCurrentLineNumber,iLineNumberToRemove,iNextStartPosition,iPos,strBasketLineCookieValue,strDetailsToKeep,strLineNumber,strName,strValue,iLineNumberStartPosition;iNextStartPosition=0;strDetailsToKeep='';blnFirst=true;strBasketLineCookieValue=_cyGetBasketLineCookieValue();if(strBasketLineCookieValue!=null){iLineNumberToRemove=parseInt(strLineNumberToRemove,10);while((iPos=strBasketLineCookieValue.indexOf('CYBK',iNextStartPosition))!=-1){strLineNumber=(iLineNumberStartPosition=iPos+4,strBasketLineCookieValue.substr(iLineNumberStartPosition,iLineNumberStartPosition+3-iLineNumberStartPosition));strName=_cyGetBasketDetailNameFromKeyStartingAt(strBasketLineCookieValue,iPos);strValue=_cyGetBasketDetailValueFromKeyStartingAt(strBasketLineCookieValue,iPos);iNextStartPosition=iPos+1;iCurrentLineNumber=parseInt(strLineNumber,10);if(iLineNumberToRemove!=iCurrentLineNumber){iCurrentLineNumber>iLineNumberToRemove&&--iCurrentLineNumber;blnFirst||(strDetailsToKeep=strDetailsToKeep+'&');strDetailsToKeep=strDetailsToKeep+'CYBK';strDetailsToKeep=strDetailsToKeep+_cyFormatLineNumber(iCurrentLineNumber);strDetailsToKeep=strDetailsToKeep+strName;strDetailsToKeep=strDetailsToKeep+':';strDetailsToKeep=strDetailsToKeep+strValue;blnFirst=false;}}
_cySetBasketLineCookieValue(strDetailsToKeep);}}
_cyRemoveBasketLineInt=function(iLineNumberToRemove){_cyRemoveBasketLine(_cyFormatLineNumber(iLineNumberToRemove));}
_cyRemoveBasketLineValue=function(strLineNumberOfValue,strNameOfValue){var blnDetailsStillExistForLine,blnFirst,iNextStartPosition,iPos,strBasketLineCookieValue,strDetailsToKeep,strLineNumber,strName,strValue,iLineNumberStartPosition;iNextStartPosition=0;strDetailsToKeep='';blnFirst=true;blnDetailsStillExistForLine=false;strBasketLineCookieValue=_cyGetBasketLineCookieValue();if(strBasketLineCookieValue!=null){while((iPos=strBasketLineCookieValue.indexOf('CYBK',iNextStartPosition))!=-1){strLineNumber=(iLineNumberStartPosition=iPos+4,strBasketLineCookieValue.substr(iLineNumberStartPosition,iLineNumberStartPosition+3-iLineNumberStartPosition));strName=_cyGetBasketDetailNameFromKeyStartingAt(strBasketLineCookieValue,iPos);strValue=_cyGetBasketDetailValueFromKeyStartingAt(strBasketLineCookieValue,iPos);iNextStartPosition=iPos+1;if(compareTo(strLineNumber,strLineNumberOfValue)!=0||compareTo(strName,strNameOfValue)!=0){compareTo(strLineNumber,strLineNumberOfValue)==0&&(blnDetailsStillExistForLine=true);blnFirst||(strDetailsToKeep=strDetailsToKeep+'&');strDetailsToKeep=strDetailsToKeep+'CYBK';strDetailsToKeep=strDetailsToKeep+strLineNumber;strDetailsToKeep=strDetailsToKeep+strName;strDetailsToKeep=strDetailsToKeep+':';strDetailsToKeep=strDetailsToKeep+strValue;blnFirst=false;}}
_cySetBasketLineCookieValue(strDetailsToKeep);blnDetailsStillExistForLine||_cyRemoveBasketLine(strLineNumberOfValue);}
return!blnDetailsStillExistForLine;}
_cyRemoveBasketLineValueInt=function(iLineNumberOfValue,strNameOfValue){return _cyRemoveBasketLineValue(_cyFormatLineNumber(iLineNumberOfValue),strNameOfValue);}
_cyUpdateBasketLineValue=function(strLineNumber,strKey,strValue){var blnLineRemoved=false;var strBasketLineCookieValue,strDetailsToKeep;strBasketLineCookieValue=_cyGetBasketLineCookieValue();if(strBasketLineCookieValue.indexOf('CYBK000')!=-1){_cyRemoveBasketLine('000');strBasketLineCookieValue=_cyGetBasketLineCookieValue();}
if(strBasketLineCookieValue.indexOf('CYBK'+strLineNumber+strKey)!=-1){blnLineRemoved=_cyRemoveBasketLineValue(strLineNumber,strKey);}
if(blnLineRemoved==true){_cyInsertBasketLineValue(strLineNumber,strKey,strValue);}else{strBasketLineCookieValue=_cyGetBasketLineCookieValue();strBasketLineCookieValue==null&&(strBasketLineCookieValue='');strDetailsToKeep=''+strBasketLineCookieValue;compareTo(strBasketLineCookieValue,'')!=0&&(strDetailsToKeep=strDetailsToKeep+'&');strDetailsToKeep=strDetailsToKeep+'CYBK';strDetailsToKeep=strDetailsToKeep+strLineNumber;strDetailsToKeep=strDetailsToKeep+strKey;strDetailsToKeep=strDetailsToKeep+':';strDetailsToKeep=strDetailsToKeep+encodeURIComponent(strValue);_cySetBasketLineCookieValue(strDetailsToKeep);}}
_cyUpdateBasketLineValueInt=function(iLineNumber,strKey,strValue){_cyUpdateBasketLineValue(_cyFormatLineNumber(iLineNumber),strKey,strValue);}
_cyEmptyTheServerBasket=function(){_cyUpdateBasketLineValue('000','Empty','TheBasket');}
_cyEmptyTheClientBasket=function(){_cySetBasketLineCookieValue('');}
_cySetBasketLineCookieValue=function(strValue){cyPageBasket=strValue;_cyCreateClientCookie('_cybskt',strValue);}
_cyGetBasketLineCookieValue=function(){var strValue='';if(cyPageBasket==''){strValue=_cyGetCookie('_cybskt',false);}else{strValue=cyPageBasket;}
return strValue;}
_cyGetBasketLinesQueryString=function(){var strValue='';strValue=_cyGetBasketLineCookieValue();_cySetBasketLineCookieValue('');_cySetCurrentLineNumberCookieValue('');if(strValue!=undefined&&strValue!=null&&strValue!=''){strValue=$replaceAll(strValue,':','=');strValue="&"+strValue;}
return strValue;}
$replaceAll=function(strValue,regex,replace){replace=__translateReplaceString(replace);return strValue.replace(RegExp(regex,'g'),replace);}
__translateReplaceString=function(replaceStr){var pos;pos=0;while(0<=(pos=replaceStr.indexOf('\\',pos))){replaceStr.charCodeAt(pos+1)==36?(replaceStr=replaceStr.substr(0,pos-0)+'$'+$substring(replaceStr,++pos)):(replaceStr=replaceStr.substr(0,pos-0)+$substring(replaceStr,++pos));}
return replaceStr;}
compareTo=function(thisStr,otherStr){thisStr=String(thisStr);if(thisStr==otherStr){return 0;}
return thisStr<otherStr?-1:1;}
_cySetCurrentLineNumberCookieValue=function(strValue){cyCurrLineNumber=strValue;_cyCreateClientCookie('_cycurrln',strValue);}
_cyGetCurrentLineNumberCookieValue=function(){var strValue='';if(cyCurrLineNumber==''){strValue=_cyGetCookie('_cycurrln',false);}else{strValue=cyCurrLineNumber;}
return strValue;}
cyNewBasketLine=function(){var strLineNumber='';strLineNumber=_cyGetNextBasketLineNumber();_cySetCurrentLineNumberCookieValue(strLineNumber);}
cyAddBasketLineDetail=function(strKey,strValue){var strLineNumber='';strLineNumber=_cyGetCurrentLineNumberCookieValue();if(strLineNumber==undefined||strLineNumber==null||strLineNumber==''){cyNewBasketLine();strLineNumber=_cyGetCurrentLineNumberCookieValue();}
_cyUpdateBasketLineValue(strLineNumber,strKey,strValue);}
cyRemoveCurrentBasketLine=function(){var strLineNumber='';strLineNumber=_cyGetCurrentLineNumberCookieValue();if(strLineNumber!=undefined&&strLineNumber!=null&&strLineNumber!=''){_cyRemoveBasketLine(strLineNumberToRemove)}}
cyClientSideBasketReset=function(){_cySetCurrentLineNumberCookieValue('');_cyEmptyTheClientBasket();}
cyServerSideBasketReset=function(){_cyEmptyTheServerBasket();}
cy.control.cySetUserDefined=function(strKey,strValue){if(strKey!=undefined&&strKey!=null&&strKey!='HasDiscount'){if(strKey=="length"){strKey="Length";}
var strMappedKeyIndex;strMappedKeyIndex=cy.control.misc_data_map[strKey];if(strMappedKeyIndex==undefined||strMappedKeyIndex==null){strMappedKeyIndex=cy.control.misc_data_count;cy.control.misc_data_count=cy.control.misc_data_count+1;}else{}
cy.control.misc_data_keys[strMappedKeyIndex]=strKey;cy.control.misc_data_vals[strMappedKeyIndex]=strValue;cy.control.misc_data_map[strKey]=strMappedKeyIndex;}else{cy.CUSTOM10=strValue;}}
cy.control.cyGetUserDefined=function(){var strUserDefined="";for(var count=0;count<cy.control.misc_data_keys.length;count++){if(count!=0){strUserDefined=strUserDefined+"&";}
strUserDefined=strUserDefined+encodeURIComponent(cy.control.misc_data_keys[count])+"="+encodeURIComponent(cy.control.misc_data_vals[count]);}
cy.control.misc_data_keys=new Array();cy.control.misc_data_vals=new Array();cy.control.misc_data_map=new Array();cy.control.misc_data_count=0;return strUserDefined;}
cy.control.cyGetUserDefinedQueryString=function(){var strUserDefinedQueryString="";var strUserDefinedData="";strUserDefinedData=cy.control.cyGetUserDefined();if(strUserDefinedData!=undefined&&strUserDefinedData!=null&&strUserDefinedData!=''){strUserDefinedQueryString="&"+strUserDefinedData;}
return strUserDefinedQueryString;}
if(window.location.href.indexOf('.staples.com/office/supplies/yourorder')!=-1){cy.control.cookieinfo.domain="staples.com";cy.FunnelLevel="4";var cartTables=document.getElementById("myCartItems");var imageURL="";var pageURL="";var itemName="";cy.Custom1="Guest";cy.ReturnToLink=document.URL;function cyHTMLsafe(str){str=str.replace(/ +(?= )/g,'');str=str.replace(/(\r\n|\n|\r)/gm,'');var newStr="";var newChar="";for(i=0;i<str.length;i++){if(str.charCodeAt(i)==32){newChar=str.charAt(i);}else if(str.charCodeAt(i)==35||str.charCodeAt(i)==38||str.charCodeAt(i)==59||str.charCodeAt(i)==60||str.charCodeAt(i)==62||str.charCodeAt(i)==47){newChar=str.charAt(i);}else if(str.charCodeAt(i)>=48&&str.charCodeAt(i)<=57){newChar=str.charAt(i);}else if(str.charCodeAt(i)>=65&&str.charCodeAt(i)<=90){newChar=str.charAt(i);}else if(str.charCodeAt(i)>=97&&str.charCodeAt(i)<=122){newChar=str.charAt(i);}else{newChar="&#"+str.charCodeAt(i)+";";}
newStr+=newChar;}
return(newStr);}
if(cartTables==null){}else{for(var i=0;i<cartTables.getElementsByTagName("img").length;i++){if(cartTables.getElementsByTagName("img")[i].src.indexOf("thb")!==-1){imageURL=cartTables.getElementsByTagName("img")[i].src;imageURL=imageURL.replace("thb","sku");pageURL=cartTables.getElementsByTagName("img")[i].parentNode;break;}}
for(var i=0;i<cartTables.getElementsByTagName("a").length;i++){if(cartTables.getElementsByTagName("a")[i].href.indexOf(pageURL)!==-1&&cartTables.getElementsByTagName("a")[i].getElementsByTagName("img").length==0){itemName=cartTables.getElementsByTagName("a")[i].innerHTML;itemName=itemName.trim();break;}}
cy.Custom2="http://s7d5.scene7.com/is/image/Staples/s0504042_sc7?$lnk$";cy.Custom3="http://www.staples.com/HP-Pavilion-dv6-7010us-156-Laptop/product_932061";cy.Custom4="HP Pavilion dv6-7010us 15.6&#34; Laptop";cy.Custom5="http://s7d5.scene7.com/is/image/Staples/s0404020_sc7?$lnk$";cy.Custom6="http://www.staples.com/HammerMill-Copy-Plus-Copy-Paper-8-1-2-x-11-Case/product_122374";cy.Custom7="HammerMill Copy Plus Copy Paper, 8 1/2&#34; x 11&#34;, Case";cy.Custom8="http://s7d5.scene7.com/is/image/Staples/s0436032_sc7?$lnk$";cy.Custom9="http://www.staples.com/Brawny-White-Perforated-Paper-Towel-Rolls-2-Ply-12-Rolls-Case/product_852190";cy.Custom10="Brawny White Perforated Paper Towel Rolls, 2-Ply, 12 Rolls/Case";cy.Custom11=0;if(_cyGetCookie('customerEmailAddress')){if(unescape(_cyGetCookie('customerEmailAddress')).indexOf("@")!==-1&&unescape(_cyGetCookie('customerEmailAddress')).indexOf(".")!==-1){cy.UserId=unescape(_cyGetCookie('customerEmailAddress'));}}
cyNewBasketLine();cyAddBasketLineDetail('ItemName',cyHTMLsafe(itemName));cyAddBasketLineDetail('ItemImageURL',imageURL);cyAddBasketLineDetail('ItemPageURL',pageURL);cy_getImageSrc();var x=0;var intervalTest;function testForData(){var altBox=document.getElementById("cart_box1");if(++x===10){window.clearInterval(intervalTest);}
if(altBox){var altImage1=altBox.getElementsByTagName("img")[0].src;var altName1=altBox.getElementsByTagName("img")[0].alt;var altURL1=altBox.getElementsByTagName("img")[0].parentNode.href;var altImage2=altBox.getElementsByTagName("img")[1].src;var altName2=altBox.getElementsByTagName("img")[1].alt;var altURL2=altBox.getElementsByTagName("img")[1].parentNode.href;var altImage3=altBox.getElementsByTagName("img")[3].src;var altName3=altBox.getElementsByTagName("img")[3].alt;var altURL3=altBox.getElementsByTagName("img")[3].parentNode.href;cy.Custom2=altImage1;cy.Custom3=altURL1;cy.Custom4=cyHTMLsafe(altName1);cy.Custom5=altImage2;cy.Custom6=altURL2;cy.Custom7=cyHTMLsafe(altName2);cy.Custom8=altImage3;cy.Custom9=altURL3;cy.Custom10=cyHTMLsafe(altName3);cy.Custom11=1;if(altImage1.indexOf("$lnk")!==-1&&altImage2.indexOf("$lnk")!==-1&&altImage3.indexOf("$lnk")!==-1){cy_getImageSrc();}
window.clearInterval(intervalTest);}}
intervalTest=setInterval(testForData,1000);}}
if(window.location.href.indexOf('.staples.com/office/supplies/StaplesCheckoutFlow')!=-1){cy.control.cookieinfo.domain="staples.com";cy.FunnelLevel="5";cyEmail=document.getElementById("emailAddress");if(cyEmail){if(cyEmail.value.length>0){cy.UserId=cyEmail.value;cy_getImageSrc();}
cyEmail.onchange=function(){cy.UserId=cyEmail.value;cy_getImageSrc();return true;}}}
if(window.location.href.indexOf('orderconf')!=-1){cy.control.cookieinfo.domain="staples.com";cy.FunnelLevel="7";if(typeof window.pr_userEmailAddress!='undefined'){cy.UserId=window.pr_userEmailAddress;}else{if(_cyGetCookie('customerEmailAddress')){if(unescape(_cyGetCookie('customerEmailAddress')).indexOf("@")!==-1&&unescape(_cyGetCookie('customerEmailAddress')).indexOf(".")!==-1){cy.UserId=unescape(_cyGetCookie('customerEmailAddress'));}}}
if(typeof window.pr_OrderSubtotal!='undefined'){cy.Value=window.pr_OrderSubtotal;}
if(typeof window.pr_OrderID!='undefined'){cy.OrderNumber=window.pr_OrderID;}else{cy.OrderNumber="error";}
cy_getImageSrc();}
if(window.location.href.indexOf('.staples.com')!=-1){cy.control.cookieinfo.domain="staples.com";cy.Custom1="Guest";cy.FunnelLevel="3";function queryStr(queryName){queryString=window.location.search.substring(1);queryStringSplit=queryString.split("&");for(i=0;i<queryStringSplit.length;i++){queryResult=queryStringSplit[i].split("=");if(queryResult[0]==queryName){return queryResult[1];}}}
if(queryStr("email")||queryStr("cm_lm")||queryStr("om_rid")){cyGetEmail="";if(queryStr("email")){cyGetEmail=unescape(queryStr('email'));}else if(queryStr("cm_lm")){cyGetEmail=unescape(queryStr('cm_lm'));}else if(queryStr("om_rid")){cyGetEmail=unescape(queryStr('om_rid'));}
cy.UserId=cyGetEmail;cy_getImageSrc();}}});(window.callback15828=window.callback15828||Bootstrapper.new_fArray()).add(function(){Bootstrapper.setCurrentRuleId(15828);if(typeof console!='undefined'&&console.log){console.log('Ensighten rule 15149: [prod]global scode page load track');}
(function($){$.cookie=function(key,value,options){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(value))||value===null||value===undefined)){options=$.extend({},options);if(value===null||value===undefined){options.expires=-1;}
if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}
value=String(value);return(document.cookie=[encodeURIComponent(key),'=',options.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
options=value||{};var decode=options.raw?function(s){return s;}:decodeURIComponent;var pairs=document.cookie.split('; ');var i=0,pair;for(;pair=pairs[i]&&pairs[i].split('=');i++){if(decode(pair[0])===key)
return decode(pair[1]||'');}
return null;};})(jQuery);$.log=jQuery.fn.log=function(msg){if(window.console&&window.console.log){console.log(msg);}
return this;};var trackingLogging=null;var trackingLog=function(msg,obj){if(isTrackingLog()){if(typeof console!='undefined'&&console.log){if(typeof msg=='string'){console.log('[Tracking]'+msg);if(obj){console.log(obj);}}else{console.log('[Tracking]logging received object');if(obj){console.log(obj);}}}}};window.trackingLog=trackingLog;var isTrackingLog=function(){if(trackingLogging===null){var trackingCook=document.cookie.indexOf('trackingLog')>-1;var trackingParam=location.search.indexOf('trackinglog')>-1;trackingLogging=trackingCook||trackingParam;if(trackingParam&&!trackingCook){document.cookie='trackingLog=true';}}
return trackingLogging;};var addEvents=function(events){if(s.events){s.events+=','+events;}else{s.events=events;}};window.addEvents=addEvents;var setCookieValue=function(cname,cvalue,exdays){var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toGMTString();document.cookie=cname+"="+cvalue+";path=/;"+expires;};window.setCookieValue=setCookieValue;var getCookieValue=function(cname){var name=cname+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i].trim();if(c.indexOf(name)==0)
return c.substring(name.length,c.length);}
return"";};window.getCookieValue=getCookieValue;function getCookie(c_name){var c_value=document.cookie;var c_start=c_value.indexOf(" "+c_name+"=");if(c_start==-1){c_start=c_value.indexOf(c_name+"=");}
if(c_start==-1){c_value=null;}else{c_start=c_value.indexOf("=",c_start)+1;var c_end=c_value.indexOf(";",c_start);if(c_end==-1){c_end=c_value.length;}
c_value=unescape(c_value.substring(c_start,c_end));}
return c_value;}
function s_executeCompareProducts(parentClassName,productSku){if(productSku!==null&&parentClassName.indexOf('selected')==-1){s.products=';'+productSku;s.events='event51';s.linkTrackEvents='event51';s.linkTrackVars='products,events';s.tl(true,'o','Product Added to Comparison');}}
function dynamicPageViewTracking(){s.products=";"+window.productSku;s.doPlugins(s);if($.cookie('psku').indexOf('SS')==-1){s.pageName=s.pageName.replace(/Sku Set/,'Product Detail');s.prop3='Product Detail';s.events="event4,event3,prodView";}else{s.pageName=s.pageName.replace(/Product Detail/,'Sku Set');s.prop3='Sku Set';s.events="event4,event16";}
if($('p#stockMessage').is(':visible')&&typeof(productSku)!='undefined'&&s.events.indexOf('event78')==-1){s.linkTrackVars=s.linkTrackVars+",prop9";s.prop9="Currently out of stock";}
s.t();}
function omniTrackLinkGlobal(myLink,type){if(type=="o"){s.linkTrackVars="prop72,prop73,prop74";}
s.prop72=s.pageName;s.prop73=myLink;s.prop74=s.prop72+"|"+s.prop73;s.tl(1,type,myLink);s.prop72=s.prop73=s.prop74='';}
function tagPDBViewButtonsAndLinks(){$('.seeMore').click(function(){var type="o";var myLink="View All";omniTrackLinkGlobal(myLink,type);setTimeout('document.location = "'+this.href+'"',400);return true;});$('.buttonTertiaryLarge').click(function(){var type="o";var myLink=this.href.substr(this.href.lastIndexOf('/')+1);myLink=myLink.replace(/product_/,'');myLink="View Deal:"+myLink;omniTrackLinkGlobal(myLink,type);setTimeout('document.location = "'+this.href+'"',400);return true;});$('#groupNamesLink').click(function(){var type="o";var myLink=$("#groupNamesLink a").text();omniTrackLinkGlobal(myLink,type);});if(typeof console!='undefined'&&console.log){console.log('Tagging View All, View Deal and Other Deals on PDB landing page.');}}
function s_populateRunaEvar(){if(typeof $.cookie=='function'&&$.cookie('rmc_2')&&$.cookie('rmc_2')==="true"){s.eVar68="Active";}else if(typeof $.cookie=='function'&&$.cookie('rmc_2')&&$.cookie('rmc_2')==="false"){s.eVar68="Control";}}
var searchPriceTracked=false;function s_bindSearchPriceRefinement(){if(window.s.pageName=='Search Results'){$('.gobtn').click(function(){var minP=$('#price_min').attr("value");var maxP=$('#price_max').attr("value");var minMaxPrice="$"+minP+"-$"+maxP;$.cookie('priceCookie',minMaxPrice);searchPriceTracked=true;});}}
function s_refineSearchPrice(){if(!searchPriceTracked&&typeof($.cookie)=='function'&&$.cookie('priceCookie')){s.prop7="Price";s.prop8=$.cookie('priceCookie');$.cookie('priceCookie',null);}}
function s_pastPurchasesPFM(){$('.rrliprdimg a').mouseup(function(){s.eVar3="Past Purchases";s.eVar17="Past Purchases:"+s.prop3;s.prop38="Past Purchases";s.linkTrackVars="eVar3,eVar17,prop38";s.tl(true,'o','Finding Method');});}
var s_directPFM=function(){if(document.referrer.length===0&&(getCookieValue('directPFMSession').length==0||getCookieValue('directPFMSession')!=getCookieValue('JSESSIONID'))){s.eVar3="Direct";s.eVar17="Direct:"+s.prop3;s.prop38="Direct";setCookieValue('directPFMSession',getCookieValue('JSESSIONID'),1);}};window.s_directPFM=s_directPFM;function s_orderConfCoupons(){if(location.href.indexOf('/office/supplies/orderconf')!=-1||(typeof s.events!='undefined'&&s.events.indexOf('purchase')!=-1)){if(s.products.indexOf('event13')!=-1){s.products=s.products.replace(/event13=[a-zA-Z|:|\s|\-]+/,'event13=');}
if(s.products.indexOf('event14')!=-1){s.products=s.products.replace(/event14=[a-zA-Z|:|\s|\-]+/,'event14=');}
if(s.products.indexOf('event15')!=-1){s.products=s.products.replace(/event15=[a-zA-Z|:|\s|\-]+/,'event15=');}}}
window.s_loginRegmouseupTracking=function(){$('#headerSignupTitle a.login').mouseup(function(){$.cookie('loginPosition','Login|Header',{path:'/'});$.cookie('registerPosition',null,{path:'/'});});$('.loginReminderContainer a.login').mouseup(function(){$.cookie('loginPosition','Login|Pop Up',{path:'/'});$.cookie('registerPosition',null,{path:'/'});});$('a.d01.billBtn3').mouseup(function(){if($.cookie('StaplesUser')===null&&location.href.indexOf('/office/supplies/yourorderview')!=-1){$.cookie('loginPosition','Login|Checkout',{path:'/'});$.cookie('registerPosition',null,{path:'/'});}});if(location.href.indexOf('/office/supplies/login')!=-1){if(document.referrer.indexOf('/office/supplies/login')!=-1){$.cookie('loginStarted','Yes',{path:'/'});}else{$.cookie('loginStarted',null,{path:'/'});}}
$('#headerSignupTitle a').mouseup(function(){if($(this).attr('href').indexOf('/office/supplies/registration')!=-1){$.cookie('registerPosition','Registration|Header',{path:'/'});$.cookie('loginPosition',null,{path:'/'});}});$('.loginReminderContainer a').mouseup(function(){if($(this).attr('href').indexOf('/office/supplies/registration')!=-1){$.cookie('registerPosition','Registration|Pop Up',{path:'/'});$.cookie('loginPosition',null,{path:'/'});}});if(location.pathname.indexOf('/office/supplies/registration')!=-1||location.pathname.indexOf('/office/supplies/StaplesUserRegistration')!=-1){$('a.d01.continue').mouseup(function(){if(document.getElementById('prefs1').checked){$.cookie('emailPreferenceSignUp','Yes',{path:'/'});$.cookie('ResponsysEmailPrefSignUp','Yes',{path:'/'});}else{$.cookie('emailPreferenceSignUp',null,{path:'/'});$.cookie('ResponsysEmailPrefSignUp',null,{path:'/'});}});}};window.s_loginRegisterEventTracking=function(){if(location.href.indexOf('/office/supplies/login')!=-1&&typeof $.cookie=='function'&&$.cookie('loginPosition')!==null&&$.cookie('StaplesUser')===null){$.cookie('registerPosition',null,{path:'/'});if($.cookie('loginStarted')===null){s.eVar37=$.cookie('loginPosition');if(s.events){s.events=s.events+',event39';}else{s.events='event39';}}}
if(typeof $.cookie=='function'&&$.cookie('StaplesUser')!==null&&$.cookie('loginPosition')!==null){s.eVar37=$.cookie('loginPosition');if(s.events){s.events=s.events+',event40';}else{s.events='event40';}
$.cookie('loginPosition',null,{path:'/'});$.cookie('registerPosition',null,{path:'/'});}
if(location.href.indexOf('/office/supplies/registration')!=-1&&typeof $.cookie=='function'&&$.cookie('registerPosition')!==null&&$.cookie('StaplesUser')===null){s.eVar37=$.cookie('registerPosition');$.cookie('loginPosition',null,{path:'/'});if(s.events){s.events=s.events+',event39';}else{s.events='event39';}}
if(typeof $.cookie=='function'&&$.cookie('StaplesUser')!==null&&$.cookie('registerPosition')!==null){s.eVar37=$.cookie('registerPosition');if(s.events){s.events=s.events+',event40';}else{s.events='event40';}
if($.cookie('emailPreferenceSignUp')!==null&&$.cookie('emailPreferenceSignUp')=='Yes'){s.events=s.events+',event26';}
$.cookie('registerPosition',null,{path:'/'});$.cookie('loginPosition',null,{path:'/'});$.cookie('emailPreferenceSignUp',null,{path:'/'});}
if(location.pathname.indexOf('/office/supplies/registration')!=-1||location.pathname.indexOf('/office/supplies/StaplesUserRegistration')!=-1){if(typeof $('div.emsgwrap')!='undefined'&&$('div.emsgwrap').length>0){var errorMessage='';$('div.emsgwrap dt').each(function(index){errorMessage+=$(this).text().trim()+"-"+$('div.emsgwrap dd')[index].textContent+'|';});errorMessage=errorMessage.replace(/\*/g,'');errorMessage=errorMessage.substring(0,errorMessage.length-1);s.prop10=errorMessage;}}};window.trackAddCartCheckout=false;window.s_AddCartCheckoutBtn=function(){if(typeof $('body#class')!='undefined'&&$('body#class').length>0){$(document).on('mouseup','.add_ckout,.ad_ck',function(){s.c_w('s_atcLocationOverride','Class: Add to Cart & Checkout');window.trackAddCartCheckout=true;});}};window.s_AddCartCheckoutBtnPage=function(){if(location.pathname.indexOf('/office/supplies/yourorderview')!=-1&&$.cookie('addcartchkBtn')){s.eVar12='Class: Add to Cart & Checkout';$.cookie('addcartchkBtn',null,{path:'/'});}};window.s_groupPerfectOffer=function(){var tgPO=$('#treatmentGroupPerfectOffer'),tgPS=$('#treatmentGroupPerfectShipping');if(typeof tgPO!=='undefined'||typeof tgPS!=='undefined'){var groupPerfectOfferVal="NULL",groupPerfectShippingVal="NULL";if(typeof tgPO!=='undefined'&&tgPO.length>0){if(tgPO.val()){groupPerfectOfferVal=tgPO.val();}else{groupPerfectOfferVal='BLANK';}}
if(typeof tgPS!=='undefined'&&tgPS.length>0){if(tgPS.val()){groupPerfectShippingVal=tgPS.val();}else{groupPerfectShippingVal='BLANK';}}
s.eVar68="PO:"+groupPerfectOfferVal+"|PS:"+groupPerfectShippingVal;}
var pcpoObject=$("input[id*='productCoveragePerfectOffer']"),pcpsObject=$("input[id*='productCoveragePerfectShipping']"),POPS="",poItem=false,psItem=false;if(typeof pcpoObject!=='undefined'&&pcpoObject.length>0){var poLength=pcpoObject.length,i=0;for(i=0;i<poLength;i++){if(typeof pcpoObject[i].value!='undefined'&&pcpoObject[i].value=='MANAGED'){poItem=true;break;}}}
if(typeof pcpsObject!=='undefined'&&pcpsObject.length>0){var psLength=pcpsObject.length,i=0;for(i=0;i<psLength;i++){if(typeof pcpsObject[i].value!='undefined'&&pcpsObject[i].value=='MANAGED'){psItem=true;break;}}}
if(poItem){POPS+="PO:MANAGED|";}else{POPS+="PO:UNMANAGED|";}
if(psItem){POPS+="PS:MANAGED";}else{POPS+="PS:UNMANAGED";}
s.eVar54=POPS;};function s_dynamicPageViewTracking(){s.products=";"+window.productSku;if(window.productSku.indexOf('SS')==-1){s.pageName=s.pageName.replace(/Sku Set/,'Product Detail');s.prop3='Product Detail';s.events='event3,prodView';}else{s.pageName=s.pageName.replace(/Product Detail/,'Sku Set');s.prop3='Sku Set';s.events='event16';}
if($('p#stockMessage').is(':visible')&&typeof(productSku)!='undefined'&&s.events.indexOf('event78')==-1){s.linkTrackVars=s.linkTrackVars+",prop9";s.prop9="Currently out of stock";}
s.t();}
var s_odinBuild=function(){console.log("Checking for ODIN Function");if(typeof Analytics!=='undefined'&&typeof Analytics.tracking!=='undefined'&&typeof Analytics.global!=='undefined'){s.products=";"+Analytics.tracking.item['sku'];s.prop4=Analytics.tracking.item.producthierarchy['sc'].value+":"+Analytics.tracking.item.producthierarchy['cg'].value;s.eVar15=Analytics.tracking.item.producthierarchy['sc'].value+":"+Analytics.tracking.item.producthierarchy['cg'].value;s.prop5=Analytics.tracking.item.producthierarchy['sc'].value+":"+Analytics.tracking.item.producthierarchy['cg'].value+":"+Analytics.tracking.item.producthierarchy['dp'].value;s.prop6=Analytics.tracking.item.producthierarchy['sc'].value+":"+Analytics.tracking.item.producthierarchy['cg'].value+":"+Analytics.tracking.item.producthierarchy['dp'].value+":"+Analytics.tracking.item.producthierarchy['cl'].value;s.prop3="Product Detail";s.server=Analytics.global['server'];s.eVar38=Analytics.tracking.item.producthierarchy['sc'].id+":"+Analytics.tracking.item.producthierarchy['cg'].id+":"+Analytics.tracking.item.producthierarchy['dp'].id+":"+Analytics.tracking.item.producthierarchy['cl'].id;s.eVar27=Analytics.tracking.item['ratings'];s.prop41=Analytics.global['language'];s.eVar35=Analytics.global['language'];s.prop40="en-US:skuskuset";s.eVar51=Analytics.global['zipcode'];s.prop64="ODIN";console.log("Successfully executing ODIN Function");}};window.s_odinBuild=s_odinBuild;var s_helpcenterSearchPageTag=function(){var searchResults=0;if($('.z_results').length>0&&$('.z_results').text().length>0){searchResults=$('.z_results').text().match(/[0-9]+ matches/);searchResults=searchResults[0].replace(/ matches/,'');}
s.prop2="Help Center: "+searchResults;if(s.getQueryParam('query').length>0){if(searchResults===0){s.eVar64='Help Center:Null:'+s.getQueryParam('query');}else{s.eVar64='Help Center:'+s.getQueryParam('query');}}
if(document.referrer.indexOf('/content/help-center/index.html')!=-1||document.referrer.indexOf('/content/help-center/search/search-results.html')!=-1||document.referrer.indexOf('/content/help-centre/index.html')!=-1||document.referrer.indexOf('/content/help-centre/search/search-results.html')!=-1){s.events='event73';$.cookie('hcSearchCookie',null,{path:'/'});console.log("Help center search results tracking along with "+s.events);}
s.pageName="Help Center: Search Results";s.channel="Help Center";s.prop3="Help Center";s.prop4="Help Center: Search Results";s.prop5="Help Center: Search Results";s.prop6="Help Center: Search Results";s.eVar3="Customer Service";s.eVar17="Customer Service : Help Center: Search Results";s.t();s.events='';};window.s_helpcenterSearchPageTag=s_helpcenterSearchPageTag;var s_helpcenterSearchPage=function(){var numIterations=1;var hpInterval=setInterval(function(){if($('#z_noresults').length>0||$('.z_results').length>0){s_helpcenterSearchPageTag();clearInterval(hpInterval);console.log("Tracking Search Page success - After "+numIterations+" iterations");}else if(numIterations<30){numIterations++;}else{clearInterval(hpInterval);console.log("Search tracking Failed - Search Results not loaded after "+numIterations+" iterations");}},100);};window.s_helpcenterSearchPage=s_helpcenterSearchPage;var s_helpcenterSearchSlot=function(){$(document).on('click','.z_search_result h3 a',function(){var slotNum=$('.z_search_result h3 a').index(this)+1;var pageNum=$('.z_active').text().trim();if(pageNum.length===0){pageNum=1;}
s.eVar19='Help Center:'+slotNum+"x"+pageNum;s.linkTrackVars='eVar19';s.tl(true,'o','Search Slot');});};window.s_helpcenterSearchSlot=s_helpcenterSearchSlot;function s_helpcenterFinalTagging(){if(location.pathname.indexOf('/content/help-center/search/search-results.html')!=-1||location.pathname.indexOf('/content/help-centre/search/search-results.html')!=-1){s_helpcenterSearchPage();s_helpcenterSearchSlot();}}
function enrichPageloadTracking(){if(typeof(s)!='undefined'){var scJSessionID=getCookie("JSESSIONID");if(scJSessionID!==null&&scJSessionID!=""){s.eVar70=scJSessionID;}else{s.eVar70='No JSESSIONID found';}
if($('div.emsgwrap').is(':visible')&&$('dl.error dt').text()=='*Zip Code'){s.prop10='2430:Invalid Zipcode';}
var getAppID='';if(s.c_r('JSESSIONID')){getAppID=s.c_r('JSESSIONID');getAppID=getAppID.split(':');getAppID=getAppID[1];if(getAppID&&getAppID.length>9){getAppID=getAppID.slice(0,9);}}else{getAppID='No App Server ID in Cookie';}
s.prop62=getAppID;var content=$('#wrapall').html(),comment='';if(content){var match=content.match(/<!--.*?-->/g);comment=match&&match.length>0?match[0]:'';}
var pipe1=comment.indexOf('|')+1;var pipe2=comment.indexOf('|',pipe1);var appServerLoc=comment.substring(pipe1,pipe2);s.prop59=appServerLoc;if(typeof $.cookie=='function'){if($.cookie('ae_cheerio')){var ae_cheerio=$.cookie('ae_cheerio');var ae_cheerio_bits=ae_cheerio.split('.');if(ae_cheerio_bits&&ae_cheerio_bits.length==2){s.prop58=ae_cheerio_bits[0];s.eVar40=ae_cheerio_bits[1];}}}
if(typeof CookiedResource=='function'&&typeof CookiedResource.new_instance=='function'){var transducer_SA=CookiedResource.new_instance('Transducer.StaplesAdvantage');var osa_svi=transducer_SA.get('s_vi','staplesadvantage.com');if(typeof console!='undefined'&&console.log){console.log('Transducer.StaplesAdvantage client: after transducer_SA.get()'+' osa_svi='+osa_svi);}
if(osa_svi){var clean_svi=typeof Analytics!='undefined'&&typeof Analytics.clean_svi=='function'&&Analytics.clean_svi||function(s){return s;};if(typeof clean_svi=='function'){osa_svi=clean_svi(osa_svi);}
s.prop57=osa_svi;}}}}
function bindQuickViewOVerlay(){$('body').on('click','div.quickView, div.bgQuickView',function(){if(typeof console!='undefined'&&console.log){console.log('Quick view Tracking: via dotcom global page load track');}
s.linkTrackVars='events,pageName,products,prop3,prop4,prop5,prop6,prop12,prop21,prop26,prop31,prop40,prop41,eVar10,eVar12,eVar14,eVar15,eVar27,eVar35,eVar38,eVar51,eVar55,eVar56,eVar57,eVar58';s.linkTrackEvents='prodView,event3,event4,event58';s.events='prodView,event3,event4,event58';s.pageName=s.eVar12='Product Quickview';s.prop3='Product Quickview';s.products='';var skuNumber='';s.eVar27='';var skuRating='';setTimeout(function(){$('.quickViewScroll .quickViewDetails #stage #skuspecial .productDetails').each(function(){var skuModelNumber=$(this).find('p.itemModel').eq(0).text();var n=skuModelNumber.split(" ");skuNumber=$.trim(n[1]);});if(skuNumber){s.products=";"+skuNumber;}else{s.products=';skuset';}
$('.quickViewScroll .quickViewDetails #stage #skuspecial .productDetails #reviewsContainer .reviewssnippet').each(function(){skuRating=$(this).find('dl.stReviews dd.stStars').eq(0).text();skuRating=$.trim(skuRating);});if(skuRating){s.eVar27=skuRating;}else{s.eVar27='No Reviews';}
s.t();},2000);});}
function bindProductComparison(){$(document).on('mouseup','.comparechkbx',function(){var parentClass=$(this).parent();parentClass=parentClass[0].className;var parentClassName=new String(parentClass);parentClassName=JSON.stringify(parentClassName);var productSku=$(this).parent()[0].innerHTML.match(/product_[0-9]+/);productSku=productSku[0];productSku=productSku.replace(/product_/,'');s_executeCompareProducts(parentClassName,productSku);});$(document).on('mouseup','.cmprtxt',function(){var parentClass=$(this).parent();parentClass=parentClass[0].className;var parentClassName=new String(parentClass);parentClassName=JSON.stringify(parentClassName);var productSku=$(this).parent()[0].innerHTML.match(/product_[0-9]+/);productSku=productSku[0];productSku=productSku.replace(/product_/,'');s_executeCompareProducts(parentClassName,productSku);});}
var bindSkuSkuSetPages=function(psku){var skuIter=1;var skuInterval=setInterval(function(){var productSkuValue=window.productSku.trim();if(psku!=productSkuValue){setTimeout(function(){s_runaTrackingGlobal();},1000);clearInterval(skuInterval);}else if(skuIter<10){skuIter++;}else{clearInterval(skuInterval);}},100);};window.bindSkuSkuSetPages=bindSkuSkuSetPages;function trackBasketBuilder(){var pageURL=(window.location!=window.parent.location)?document.referrer:window.location.toString();if(pageURL.indexOf('basketbuilder.staples.com/basketDetail.aspx')!=-1){if(s.eVar17){s.eVar12="Basketbuilder:Main";}}}
var s_tabletHomeProductDetail=function(pfm,clickpos,skuNumber){s.eVar3="StapleRec";s.eVar17="StapleRec:"+pfm;if($('.cls_skPdtAddToCartBtn').length>0){s.eVar17="StapleRec:Product:"+pfm;}
s.prop38="StapleRec";s.eVar19=pfm+":"+clickpos;s.pageName="Product Detail:"+skuNumber;s.events="prodView,event3,event4";s.eVar1=s.prop1="";s.prop3="Product Detail";s.products=";"+skuNumber;if($('.cls_skOutOfStock').length>0){s.events=s.events+",event78";s.prop9="Currently out of stock";}
s.t();$('.cls_skPdtDetailsTitleCont').click(function(){if(!$('.cls_skPdtDetailsContainer').is(':visible')){s.prop11='Product Information:Product Details';s.prop48=$('.cls_skPdtAddToCartBtn').attr('pid');s.linkTrackVars='prop11,prop48';s.tl(true,'o','Product Info');}});$('.cls_skpdtSpecTitleCont').click(function(){if(!$('.cls_skPdtSpecContainer').is(':visible')){s.prop11='Product Information:Specifications';s.prop48=$('.cls_skPdtAddToCartBtn').attr('pid');s.linkTrackVars='prop11,prop48';s.tl(true,'o','Product Info');}});$('.cls_skPdtReviewsContainer').click(function(){if(!$('.cls_skPdtReviewsWrapper').is(':visible')){s.prop11='Product Reviews:';s.prop48=$('.cls_skPdtAddToCartBtn').attr('pid');s.linkTrackVars='prop11,prop48';s.tl(true,'o','Product Info');}});};window.s_tabletHomeProductDetail=s_tabletHomeProductDetail;var s_tabletHomePFM=function(){$(document).on('mouseup','#id_panelTrendsNow_0 .cls_skPdtListCont',function(){if($(this).attr('class').indexOf('cls_skSelectedCss')==-1){window.clickPos=$('#id_panelTrendsNow_0 .cls_skPdtListCont').index(this)+1;window.currentElement=$(this);window.selectedProductSku=$(this).attr('partnumber');var iter=1;var inter=setInterval(function(){if(currentElement.attr('class').indexOf('cls_skSelectedCss')>-1){s_tabletHomeProductDetail("Trending Now",clickPos,selectedProductSku);window.currentElement="";window.clickPos="";window.selectedProductSku="";clearInterval(inter);}else if(iter<10){iter++;}else{clearInterval(inter);}},200);}});$(document).on('mouseup','#id_panelBestSeller_0 .cls_skPdtListCont',function(){if($(this).attr('class').indexOf('cls_skSelectedCss')==-1){window.clickPos=$('#id_panelBestSeller_0 .cls_skPdtListCont').index(this)+1;window.currentElement=$(this);window.selectedProductSku=$(this).attr('partnumber');var iter=1;var inter=setInterval(function(){if(currentElement.attr('class').indexOf('cls_skSelectedCss')>-1){s_tabletHomeProductDetail("Best Sellers",clickPos,selectedProductSku);window.currentElement="";window.clickPos="";window.selectedProductSku="";clearInterval(inter);}else if(iter<10){iter++;}else{clearInterval(inter);}},200);}});$(document).on('mouseup','.cls_skCategoryCont',function(){if($(this).attr('identifier').indexOf('BI')!=-1){s.eVar3="StapleRec";s.eVar17="StapleRec:"+$(this).text().trim();s.prop38="StapleRec";s.linkTrackVars="eVar3,eVar17,prop38";s.tl(true,'o','Finding Method');}});};window.s_tabletHomePFM=s_tabletHomePFM;var s_easyCheckoutTagging=function(){if(s.pageName=="Checkout:Enter Addresses"||s.pageName=="Checkout:Ship To Store"||s.pageName=="Checkout: Easy Checkout Review and Pay"||s.pageName=="Checkout:Easy Checkout"){s.pageName="Checkout:Easy Checkout";s.prop3="Checkout";s.prop4="Checkout:Easy Checkout";s.prop5="Checkout:Easy Checkout";s.prop6="Checkout:Easy Checkout";if(s.events){if(s.events.indexOf('event6')==-1){s.events=s.events+",event6";}}else{s.events="event6";}
if($('#z_credit_card_info').is(':visible')&&s.events.indexOf('event7')==-1){s.events=s.events+",event7";}
var ccMarked="N";$('.z_button').mouseup(function(){var ezIter=1;var ezInterval=setInterval(function(){if($('#z_credit_card_info').is(':visible')&&ccMarked=="N"){ccMarked="Y";s.events="event7";s.linkTrackEvents="event7";s.linkTrackVars="events";s.tl(true,'o','Easy Checkout');clearInterval(ezInterval);}else if(ezIter<500){ezIter++;}else{clearInterval(ezInterval);}},100);});}
if(s.pageName=="Checkout: Review and Pay"){if(s.events){if(s.events.indexOf('event7')==-1){s.events=s.events+",event7";}}else{s.events="event7";}}};window.s_easyCheckoutTagging=s_easyCheckoutTagging;var s_trackErrors=function(obj){var s=s_gi(s_account);s.linkTrackVars='prop10';s.prop10=obj&&obj.error&&obj.error.desc?obj.error.desc.replace(/,/g,"|"):"error";s.tl(this,'o','Easy checkout: Error');};window.s_trackErrors=s_trackErrors;var s_runaTrackingSearchClass=function(){function s_runaTrackingSearchClassLocal(){if(typeof $('#eddie_discount')!='undefined'&&$('#eddie_discount').text().length>0){var productString="";for(var i=0;i<Analytics.items.length;i++){var offerValue="Save $"+Analytics.items[i].promos[0].total;var perfectshipping="";productString+=";"+Analytics.items[i].sku+";;;event100="+Analytics.items[i].promos[0].total+";eVar72="+s.prop3+"-"+offerValue+"-"+perfectshipping+",";}
productString=productString.substr(0,productString.length-1);s.products=productString;s.events="event99,event100";s.linkTrackEvents="event99,event100";s.linkTrackVars="products,events";s.tl(true,'o','Runa Offer Displayed');s.events='';s.products='';}}
try{var startTime=new Date().getTime();var iterations=1;var interval=setInterval(function(){if(typeof s!='undefined'&&($('.eddie-bubble').length>0||$('#eddieQSText').length>0)){if(typeof console!='undefined'&&console.log){console.log('[AFTER DOM COMPLETE]runa loaded after ['+(new Date().getTime()-startTime)+'ms] over ['+iterations+']intervals');}
clearInterval(interval);s_runaTrackingSearchClassLocal();}else if(iterations<100){iterations++;}else{clearInterval(interval);if(typeof console!='undefined'&&console.log){console.log('runa failed to load after ['+(new Date().getTime()-startTime)+'ms] over ['+iterations+']intervals');}}},10);}catch(e){console.log(e);}};window.s_runaTrackingSearchClass=s_runaTrackingSearchClass;var s_kioskTracking=function(){if(typeof isKiosk!='undefined'&&isKiosk){s.eVar73="Kiosk";}};window.s_kioskTracking=s_kioskTracking;function isOmniRetailDOM(){return typeof window.parent.$("#omniTest")!=='undefined'&&window.parent.$("#omniTest").length>0&&typeof window.parent.$("#omniTest")[0].contentWindow!=='undefined'&&window.parent.$("#omniTest")[0].contentWindow?true:false;}
function isOmniRetailSignal(){return window.omniretail||(typeof window.parent.$("#omniTest")!=='undefined'&&window.parent.$("#omniTest").length>0)?true:false;}
var omniRetailDomainsArr=['http://omni.staples.com','https://omni.staples.com'];var analyticsListener=function(event){trackingLog('called listener: '+event);trackingLog('event payload: '+event.data);trackingLog('event origin: '+event.origin);if($.inArray(event.origin,omniRetailDomainsArr)!==-1){var data=null;try{trackingLog('attempting to process payload as JSON');data=JSON.parse(event.data);trackingLog('processed payload from postMessage');}catch(e){trackingLog('caught error processing postMessage data');}
if(data){var tracking=data.type;if('filters'==tracking){trackingLog('filter tracking requested');s_trackOmniRetailFilters(data.data.filters,data.data.numResults,data.data.sortBy);}else if('compare'==tracking){trackingLog('compare tracking requested');s_trackOmniRetailCompare(data.data);}else if('pageload'==tracking){trackingLog('pageload tracking requested');s_trackOmniRetailPage(data.data.numResults,data.data.sortBy);}}}};window.analyticsListener=analyticsListener;var boxFinderListener=function(event){trackingLog('called listener: '+event);trackingLog('event payload: '+event.data);trackingLog('event origin: '+event.origin);if(event.data.payload.type=="pageload"){var dataObject=event.data.payload.data;s.pageName=dataObject.traffic.pagename;s.channel="Boxfinder";s.prop3=dataObject.traffic.pagename;s.prop4=dataObject.traffic.pagename;s.prop5=dataObject.traffic.pagename;s.prop6=dataObject.traffic.pagename;if(typeof dataObject.tracking!=='undefined'&&typeof dataObject.tracking.filters!=='undefined'&&dataObject.tracking.filters.length>0){var categoryVal=dataObject.tracking.filters[0].category.value;categoryVal=categoryVal.substr(1,categoryVal.length-2);s.prop7=categoryVal;s.prop8=s.prop7+": "+dataObject.tracking.filters[0].values[0];}
s.t();s.prop3=s.prop4=s.prop5=s.prop6=s.prop7=s.prop8="";}else if(event.data.payload.type=="addtocart"){if(typeof s!='undefined'){s_findMethod("BXH",event.data.payload.data.location.match(/[a-zA-Z]+/)[0]);s.events="scAdd,scOpen,event35,event36";s.linkTrackEvents="scAdd,scOpen,event35,event36";s.eVar12="BXH:"+event.data.payload.data.location.match(/[a-zA-Z]+/)[0];s.linkTrackVars="products,events,eVar12";s.products=";"+event.data.payload.data.items[0].sku.match(/[0-9]+/)[0]+";;;event35="+event.data.payload.data.items[0].rev+"|event36="+event.data.payload.data.items[0].qty;s.tl(true,'o','Cart Addition');s.events="";s.products="";}}};window.boxFinderListener=boxFinderListener;function isBoxFinderSignal(){return location.pathname.indexOf('/marketing/boxfinder/')!=-1;}
function trackOmniRetail(){if(window.addEventListener){addEventListener("message",analyticsListener,false);}else{attachEvent("onmessage",analyticsListener);}}
function processFilters(omnifilters){var cats=new Array(),vals=new Array();if(omnifilters&&omnifilters.length>0){$.each(omnifilters,function(index,value){var filter=value;if(typeof filter.category!='undefined'&&filter.category&&typeof filter.category.id!='undefined'&&filter.category.id){var cat=filter.category.id;cats.push(cat);if(typeof filter.values!='undefined'&&filter.values&&filter.values.length>0){var likeVals=new Array();$.each(filter.values,function(index,value){var val=value;likeVals.push(val);});vals.push(likeVals.join('-'));}}});}
return{'cats':cats.join('|'),'vals':vals.join('|')};}
var s_trackOmniRetailFilters=function(omnifilters,count,sortBy){if(typeof Profile!='undefined'&&typeof Profile.log=='function'){Profile.log('called trackOmniRetailFilters()');}
var processedFilters=processFilters(omnifilters);if(processedFilters.cats&&processedFilters.vals){s.prop7='Sidekick: '+processedFilters.cats;s.prop8='Sidekick: '+processedFilters.vals;s.prop54=sortBy;s.prop2=count;s.linkTrackVars='prop7,prop8,prop54,prop2';s.tl(true,'o','Sidekick Filter');};}
window.s_trackOmniRetailFilters=s_trackOmniRetailFilters;var s_trackOmniRetailPage=function(count,sort){if(typeof Profile!='undefined'&&typeof Profile.log=='function'){Profile.log('called trackOmniRetailPage()');}
if(typeof(s)!='undefined'&&typeof window.s_omniPageLoadTrack=='function'){window.bopisPageload=(function(count,sort){return function(s){if(s){s.prop54=sort;s.prop2=count;if(typeof s.prop3!='undefined'&&s.prop3){s.prop3+=':Sidekick';}
if(typeof s.eVar17!='undefined'&&s.eVar17){s.eVar17+=':Sidekick';}}
return true;};})(count,sort);window.s_omniPageLoadTrack();}};window.s_trackOmniRetailPage=s_trackOmniRetailPage;var s_trackOmniRetailCompare=function(arrSku){if(typeof Profile!='undefined'&&typeof Profile.log=='function'){Profile.log('called trackOmniRetailCompare()');}
s.linkTrackEvents='event51,event52';s.linkTrackVars='products,events';s.events='event51,event52';if(arrSku&&arrSku.length>0){s.products=';'+arrSku.join(';');}
s.tl(true,'o','Compare Products');};window.s_trackOmniRetailCompare=s_trackOmniRetailCompare;var s_shipToAddress=function(){$('.delivery-sec').on('click','input',function(){if($(this).attr('id')=='ship-to-add'){s.tl(true,'o','Ship to Address');}});};window.s_shipToAddress=s_shipToAddress;var s_shoppingCartCleanup=function(){if(s.pageName=='Checkout:Shopping Cart'||window.location.toString().indexOf('yourorderview')!=-1){addEvents("scView,event4");}};window.s_shoppingCartCleanup=s_shoppingCartCleanup;var s_giftCardCheckoutPage=function(){$('a[id*="btnSubmit"]').mouseup(function(){var giftCardElem=$('#sgcAmountApplied'),giftCardNoElem=$('ul#sgcApplied li');if(giftCardElem!==null&&giftCardElem.text().match(/[0-9|.]+/)>0){var giftRev=giftCardElem.text().match(/[0-9|.]+/),giftNo=giftCardNoElem.length;document.cookie="giftNo="+giftNo+"; path=/";document.cookie="giftRev="+giftRev+"; path=/";}else{document.cookie="giftNo=; expires=Thu, 01 Jan 1970 00:00:00 GMT";document.cookie="giftRev=; expires=Thu, 01 Jan 1970 00:00:00 GMT";}
if(typeof $('#paymentUsed')!=='undefined'&&$('#paymentUsed')!==null&&$('#paymentUsed').val()==1){setCookieValue('visaCheckoutComplete','Y',1);}});};window.s_giftCardCheckoutPage=s_giftCardCheckoutPage;var s_bopisInitiate=function(storeId,sku,defaultStoreAvailability){if(typeof console!='undefined'&&console.log){console.log('bopis initiate called storeId, sku, defaultStoreAvailability- '+storeId+'-'+sku+'-'+defaultStoreAvailability);}
window.bopisFlag=true;var s=window.parent.s;if(s.pageName=="Checkout:Shopping Cart"){s.pageName="BOPiS: Change Store Overlay";s.events="event4";s.prop3=s.prop4=s.prop5=s.prop6="BOPiS: Change Store Overlay";}else{s.pageName="BOPiS: Cart Overlay";s.prop3=s.prop4=s.prop5=s.prop6="BOPiS: Cart Overlay";s.prop1=s.eVar1=s.prop2=s.eVar3=s.eVar4=s.eVar14=s.eVar15=s.prop17=s.prop50=s.prop54=s.eVar64=s.eVar68="";s.events="event4,event80";if(defaultStoreAvailability=='false'){s.events=s.events+",event86";}
if($('#errorSearch')!==null&&$('#errorSearch').is(':visible')){s.events=s.events+",event91";}
s.products=";"+sku;}
s.t();};window.s_bopisInitiate=s_bopisInitiate;var s_bopisChangeStore=function(storeId,sku){if(typeof console!='undefined'&&console.log){console.log('bopis change store called storeId, sku-'+storeId+'-'+sku);}
var s=window.parent.s;s.pageName="BOPiS: Change Store Overlay";s.products=";"+sku;s.prop64=storeId;s.linkTrackVars='products,prop64';s.tl(true,'o','Bopis Change Store');};window.s_bopisChangeStore=s_bopisChangeStore;var s_bopisAddToCart=function(addToCartObj){if(typeof console!='undefined'&&console.log){console.log('bopis add to cart called addtocartobj -'+addToCartObj);}
if(typeof s!='undefined'){var s=window.parent.s;var addtocartobj=jQuery.parseJSON(addToCartObj);s.pageName="Shopping Cart Overlay";s.linkTrackEvents="scAdd,scOpen,event35,event36,event81,event82";s.events="scAdd,scOpen,event35,event36,event81,event82";if(s.channel=="Search Results"){s.eVar12="Search: BOPiS Cart Overlay";}else if(window.parent.location.href.indexOf('product_')!=-1){s.eVar12="Browse: BOPiS Cart Overlay";}else{s.eVar12="Product Detail: BOPiS Cart Overlay";}
s.products="";for(x in addtocartobj.items){if(typeof $.cookie=='function'){$.cookie('bopisSKU',addtocartobj.items[x].item.sku,{path:'/'});}
s.products+=";"+addtocartobj.items[x].item.sku+";;;event35="+addtocartobj.items[x].item.qty*addtocartobj.items[x].item.price+"|event36="+addtocartobj.items[x].item.qty+"|event81="+addtocartobj.items[x].item.qty+"|event82="+addtocartobj.items[x].item.qty*addtocartobj.items[x].item.price+",";}
s.products=s.products.substr(0,s.products.length-1);s.linkTrackVars="events,eVar12,products";s.tl(true,'o','BOPiS Cart Addition');}};window.s_bopisAddToCart=s_bopisAddToCart;var s_bopisOrderConfirmation=function(orderObj){if(typeof console!='undefined'&&console.log){console.log('bopis order confirmation called orderObj-'+orderObj);}
var Analytics=typeof window.Analytics!='undefined'?window.Analytics:window.Analytics={};Analytics.tntOrder=orderObj;var bopisItem=false,productCoupon=false,orderobject=orderObj,giftCardPresent=false;s.products="";s.pageName=s.prop4=s.prop5=s.prop6="Checkout: Confirmation";s.prop3="Checkout";if(typeof orderobject.purchaseId!='undefined'){s.purchaseID=s.eVar7=orderobject.purchaseId;}
if(typeof orderobject.paymenttype!='undefined'){s.eVar8=orderobject.paymenttype;}
if(location.href.indexOf('easycheckoutorderconf')!=-1){console.log("SPC Order Confirmation");var discountElement=$('td.discount');for(x in orderobject.items){if(orderobject.items[x].item.shippingMethod=="bopis"){bopisItem=true;s.products+=";"+orderobject.items[x].item.sku+";"+orderobject.items[x].item.qty+";"+orderobject.items[x].item.total+";event84="+orderobject.items[x].item.qty+"|event85="+orderobject.items[x].item.total;if(discountElement[x]!==null&&typeof discountElement[x].textContent!='undefined'&&discountElement[x].textContent&&parseFloat(discountElement[x].textContent.match(/[0-9|.]+/))!==0){s.products+="|event13="+discountElement[x].textContent.match(/[0-9|.]+/);productCoupon=true;}
s.products+=";eVar9="+orderobject.items[x].item.shippingMethod+"|eVar75="+orderobject.items[x].item.storeId;}else{s.products+=";"+orderobject.items[x].item.sku+";"+orderobject.items[x].item.qty+";"+orderobject.items[x].item.total+";";if(discountElement[x]!==null&&typeof discountElement[x].textContent!='undefined'&&discountElement[x].textContent&&parseFloat(discountElement[x].textContent.match(/[0-9|.]+/))!==0){s.products+="event13="+discountElement[x].textContent.match(/[0-9|.]+/);productCoupon=true;}
s.products+=";eVar9="+orderobject.items[x].item.shippingMethod;if(orderobject.items[x].item.storeId){s.products+="|eVar75="+orderobject.items[x].item.storeId;}}
s.products=s.products+",";}}else{console.log("Legacy Order Confirmation");var discountElemLegacy=$('tr.subline td:eq(1) b');for(x in orderobject.items){if(orderobject.items[x].item.shippingMethod=="bopis"){bopisItem=true;s.products+=";"+orderobject.items[x].item.sku+";"+orderobject.items[x].item.qty+";"+orderobject.items[x].item.total+";event84="+orderobject.items[x].item.qty+"|event85="+orderobject.items[x].item.total;if(discountElemLegacy!==null&&parseFloat(discountElemLegacy.length>0&&discountElemLegacy.text().match(/[0-9|.]+/))!==0){s.products+="|event13="+discountElemLegacy.text().match(/[0-9|.]+/);productCoupon=true;}
s.products+=";eVar9="+orderobject.items[x].item.shippingMethod+"|eVar75="+orderobject.items[x].item.storeId;}else{s.products+=";"+orderobject.items[x].item.sku+";"+orderobject.items[x].item.qty+";"+orderobject.items[x].item.total+";";if(discountElemLegacy!==null&&parseFloat(discountElemLegacy.length>0&&discountElemLegacy.text().match(/[0-9|.]+/))!==0){s.products+="event13="+discountElemLegacy.text().match(/[0-9|.]+/);productCoupon=true;}
s.products+=";eVar9="+orderobject.items[x].item.shippingMethod;if(orderobject.items[x].item.storeId){s.products+="|eVar75="+orderobject.items[x].item.storeId;}}
s.products=s.products+",";}}
s.products=s.products+";;;;event9="+orderobject.tax+"|event10="+orderobject.shipping;if($('.cardDetail')!==null){$('.cardDetail').each(function(){if($(this).text().indexOf('Gift Card')!=-1){giftCardPresent=true;}});}
if(giftCardPresent&&typeof $.cookie=='function'&&typeof $.cookie('giftRev')!='undefined'&&$.cookie('giftRev')!==null){addEvents("event11,event12");s.eVar8='Gift Card: '+s.eVar8;s.products=s.products+'|event11='+$.cookie('giftNo')+'|event12='+$.cookie('giftRev');$.cookie('giftNo',null,{path:'/'});$.cookie('giftRev',null,{path:'/'});}
addEvents("purchase,event9,event10");if(bopisItem){addEvents("event83,event84,event85");}
if(productCoupon){addEvents("event13");}};window.s_bopisOrderConfirmation=s_bopisOrderConfirmation;var s_visaCheckout=function(){if(location.href.indexOf('office/supplies/login')!=-1){$('.v-button').click(function(){s.linkTrackVars="eVar37,events";s.events="event39";s.linkTrackEvents="event39";s.eVar37="VCO|Cart";setCookieValue('visaCheckout',s.eVar37,1);s.tl(true,'o','Visa Checkout');});}
if(location.href.indexOf('office/supplies/StaplesCheckoutFlow')!=-1){$(document).on('click','.v-button',function(){s.linkTrackVars="eVar37,events";s.events="event39";s.linkTrackEvents="event39";s.eVar37="VCO|Checkout "+s.eVar10;setCookieValue('visaCheckout',s.eVar37,1);s.tl(true,'o','Visa Checkout');});}};window.s_visaCheckout=s_visaCheckout;var s_visaCheckoutSuccess=function(){if(location.href.indexOf('/office/supplies/orderconf')!=-1||location.href.indexOf('/office/supplies/easycheckoutorderconf')!=-1){if(getCookieValue('visaCheckoutComplete').length>0&&getCookieValue('visaCheckout').length>0){addEvents('event40');s.eVar37=getCookieValue('visaCheckout');s.eVar8="Visa Checkout";setCookieValue('visaCheckout',null,1);setCookieValue('visaCheckoutComplete',null,1);}}};window.s_visaCheckoutSuccess=s_visaCheckoutSuccess;var s_QOBINStart=function(){if(location.href.indexOf('office/supplies/qobin')!=-1){$('#addtocartbox a').click(function(){var productstring="";var qtystring="";$(".text4").each(function(index){if(this.value.length>0){productstring+=this.value+";";qtystring+=$(".text3")[index].value+";";}});productstring=productstring.substr(0,productstring.length-1);qtystring=qtystring.substr(0,qtystring.length-1);setCookieValue('QOBINproduct',productstring,1);setCookieValue('QOBINqty',qtystring,1);});}};window.s_QOBINStart=s_QOBINStart;var s_QOBINEnd=function(){if(location.href.indexOf('office/supplies/yourorder')!=-1&&getCookieValue('QOBINproduct').length>0){if(typeof s!='undefined'){s.events="scAdd,scOpen";s.linkTrackEvents="scAdd,scOpen";s.linkTrackVars="eVar12,products,events";s.eVar12="QOBIN";s.products=getCookieValue('QOBINproduct');s.tl(true,'o','Cart Addition');setCookieValue('QOBINproduct','',1);}}};window.s_QOBINEnd=s_QOBINEnd;var s_platformFlag=function(){if(typeof $.cookie=='function'&&(typeof $.cookie('PLATFORMB_FLAG')!=='undefined'||typeof $.cookie('PLATFORMA_FLAG')!=='undefined')&&(typeof s.prop3!='undefined'&&(s.prop3.indexOf('Search')!=-1||s.prop3.indexOf('Class')!=-1))){if($.cookie('PLATFORMB_FLAG')=="true"){s.eVar35="en-US|Platform B";}
if($.cookie('PLATFORMA_FLAG')=="true"){s.eVar35="en-US|Platform A";}}};window.s_platformFlag=s_platformFlag;var oldSt=null;var oldStl=null;var calledDFA=false;function newSt(){if(typeof console!='undefined'&&console.log){console.log('Calling newSt.');}
s_refineSearchPrice();s_loginRegisterEventTracking();if(typeof s.prop3!='undefined'&&(s.prop3.indexOf('Product Detail')!=-1||s.prop3.indexOf('Search')!=-1||s.prop3.indexOf('Class')!=-1)){s_groupPerfectOffer();}
s_orderConfCoupons();s_directPFM();s_easyCheckoutTagging();s_shoppingCartCleanup();s_visaCheckoutSuccess();if(typeof $.cookie=='function'&&typeof $.cookie('desktopView')!=='undefined'){s.prop70="T";if($.cookie('desktopView')=='false'){s.prop70="F";}}
s_odinBuild();s_platformFlag();if(typeof window.bopisPageload==='function'){window.bopisPageload(s);window.bopisPageload=null;}
if(!calledDFA){var visIdCookie=s.c_r('s_vi');var visRegExp=/[0-9A-F]+-[0-9A-F]+/g;var visId=visIdCookie.match(visRegExp);if(visId){}else{}
calledDFA=true;}
if(typeof oldSt=='function'){if(typeof console!='undefined'&&console.log){console.log('Finishing with oldSt');}
return oldSt.apply(s,arguments);}}
function newStl(){if(typeof console!='undefined'&&console.log){console.log('Calling newStl.');}
if(typeof oldStl=='function'){if(typeof console!='undefined'&&console.log){console.log('Finishing with oldStl');}
return oldStl.apply(s,arguments);}}
$('document').ready(function(){bindQuickViewOVerlay();bindProductComparison();$(document).on('mouseup','.skuSelectControl a, .selectSwatch a',function(){if(typeof window.productSku!='undefined'){bindSkuSkuSetPages(window.productSku.trim());}});s_AddCartCheckoutBtn();s_loginRegmouseupTracking();s_pastPurchasesPFM();if(location.href.indexOf('tstage.staples.com')!=-1||location.href.indexOf('t.staples.com')!=-1){s_tabletHomePFM();if(typeof Analytics.traffic.interface!='undefined'&&Analytics.traffic.interface){s.eVar73=Analytics.traffic.interface;}}
s_kioskTracking();if(location.href.indexOf('office/supplies/yourorder')!=-1){s_shipToAddress();}
if(location.href.indexOf('/office/supplies/StaplesCheckoutFlow')!=-1){s_giftCardCheckoutPage();}
s_visaCheckout();s_pageURL=window.location.toString();trackBasketBuilder();enrichPageloadTracking();var pdbPageType=$('body').attr('pageType');var pdbPageId=$('body').attr('id');if(typeof(s)!='undefined'&&typeof window.s_omniPageLoadTrack=='function'&&location.pathname.indexOf('/content/help-center/search/search-results.html')==-1&&location.pathname.indexOf('/content/help-centre/search/search-results.html')==-1&&!isOmniRetailSignal()&&!isBoxFinderSignal()&&!(typeof bopisFlag!='undefined'&&bopisFlag)){if(!s.wrapped){oldSt=s.t;s.t=newSt;oldStl=s.tl;s.tl=newStl;s.wrapped=true;}
s_omniPageLoadTrack();s_bindSearchPriceRefinement();if(typeof s.prop3!='undefined'&&(s.prop3.toLowerCase()=="search"||s.prop3.toLowerCase()=="class")){s_runaTrackingSearchClass();}
if(s_pageURL.indexOf('/cat_BI')!=-1||(pdbPageId==='promotemplate'&&pdbPageType===undefined)){tagPDBViewButtonsAndLinks();}
s.events='';}else if(location.pathname.indexOf('/content/help-center/search/search-results.html')!=-1||location.pathname.indexOf('/content/help-centre/search/search-results.html')==-1&&!isOmniRetailSignal()){s_helpcenterFinalTagging();}else if(isOmniRetailSignal()){trackOmniRetail();}
if(typeof(s)!='undefined'&&typeof window.s_ommniPageLoadTrack=='function'){s_ommniPageLoadTrack();}});;Bootstrapper.setCurrentRuleId(15149);callback15149.exec();});(window.callback15828=window.callback15828||Bootstrapper.new_fArray()).add(function(){Bootstrapper.setCurrentRuleId(15828);if(typeof console!='undefined'&&console.log){console.log('Ensighten rule '+Bootstrapper.currentRuleId+' : [prod]dotcom global scode SKU Search Redirect Fix');}
$(window).load(function(){$('form#hsearch').submit(function(){$.log('Search Invoked');var searchKeyword=$('input#searchkey').val();$.cookie('scSearch',null,{path:'/'});$.cookie('scSearch',searchKeyword,{path:'/'});});var startTime=new Date().getTime();var iterations=1;var interval=setInterval(function(){if(typeof $.cookie=='function'&&$.cookie('scSearch')&&typeof s!='undefined'&&typeof s.prop3!='undefined'){clearInterval(interval);if(s.prop3=='Product Detail'){s.events='event1';s.linkTrackVars='eVar1,prop1,events,prop17,eVar19,prop2,prop50';s.linkTrackEvents='event1';s.events='event1';s.eVar1=s.prop1=$.cookie('scSearch');s.prop17=s.eVar19=s.prop2=s.prop50='Redirected Search';s.tl(true,'o','Redirected Search using '+s.eVar1);}
$.cookie('scSearch',null,{path:'/'});}else if(iterations<50){iterations++;}else{clearInterval(interval);}},100);});});(window.callback15828=window.callback15828||Bootstrapper.new_fArray()).add(function(){Bootstrapper.setCurrentRuleId(15828);if(typeof console!='undefined'&&console.log){console.log('Ensighten rule 66220: ATC Overlay Tracking');}
var dupeSku='';var s_recRule='0';addFromOverlay='false';(function(){var s_getCartItems=function(){var skuString='';var qtyString='';var priceString='';var charStart='';var charEnd='';var rowCounter=0;if(typeof $.cookie=='undefined'){loadJqueryCookiePlugin();}
$('div.cartInfo div#item_box div.b201 div.p01').each(function(index){if(rowCounter!==0){var getSku=$(this).find('ul.note li div').eq(0).text();if(!getSku){getSku=$(this).find('ul.note li').eq(0).text();}
getSku=getSku.slice(6);skuString=skuString+':'+getSku;var getQty=$(this).find('td.mathLeft').text();charStart=getQty.indexOf('Qty')+4;charEnd=getQty.indexOf('at')-1;qtyString=qtyString+':'+getQty.substring(charStart,charEnd);qtyString=!!qtyString?qtyString.trim():'not available';var getPrice=$(this).find('td.mathPrice1').text();getPrice=$.trim(getPrice).slice(1);priceString=priceString+':'+getPrice;}else{var getSku=$(this).find('ul.note li div').eq(0).text();if(!getSku){getSku=$(this).find('ul.note li').eq(0).text();}
skuString=getSku.slice(6);var getQty=$(this).find('td.mathLeft').text();charStart=getQty.indexOf('Qty')+4;charEnd=getQty.indexOf('at')-1;qtyString=getQty.substring(charStart,charEnd);qtyString=!!qtyString?qtyString.trim():'not available';var getPrice=$(this).find('td.mathPrice1').text();priceString=$.trim(getPrice).slice(1);}
rowCounter++;});if(dupeSku!=skuString&&(typeof $.cookie=='function'&&$.cookie('bopisSKU')!=skuString)){s_cartAdd(skuString,priceString,qtyString);dupeSku=skuString;}
$.cookie('bopisSKU',null,{path:'/'});};$(window).load(function(){var addToCartWithOverlayWWW=null;var loops=1;var interval=setInterval(function(){if(typeof STAPLES!='undefined'&&typeof STAPLES.Main!='undefined'&&typeof STAPLES.Main.addToCartWithOverlay=='function'){clearInterval(interval);addToCartWithOverlayWWW=STAPLES.Main.addToCartWithOverlay;STAPLES.Main.addToCartWithOverlay=function(){if($('#cart_overlay_box').is(':visible')){addFromOverlay='true';}else{addFromOverlay='false';}
addToCartWithOverlayWWW.apply(this,arguments);if(addFromOverlay=='true'){s_findMethod('Recommendations','cart_overlay_box',s_recRule);}
s_atcOverlay();};}else if(loops<50){loops++;}else{clearInterval(interval);}},100);});$(window).load(function(){var addAllToCart=null;var loops=1;var interval=setInterval(function(){if(typeof STAPLES.Main.addAllToCart=='function'){clearInterval(interval);addAllToCart=STAPLES.Main.addAllToCart;STAPLES.Main.addAllToCart=function(){if($('#cart_overlay_box').is(':visible')){addFromOverlay='true';}else{addFromOverlay='false';}
addAllToCart.apply(this,arguments);if(addFromOverlay=='true'){s_findMethod('Recommendations','cart_overlay_box',s_recRule);}
s_atcOverlay();};}else if(loops<50){loops++;}else{clearInterval(interval);}},100);});var runInterval=function(objFn,fn){var iterations=1;var interval=setInterval(function(){var tmp=objFn();if(typeof tmp!='undefined'&&tmp){clearInterval(interval);fn();}else if(iterations<50){iterations++;}else{clearInterval(interval);}},100);};var s_atcOverlay=function(){runInterval(function(){return $('.addtocart').is(':visible');},function(){runInterval(function(){return $('div.cartInfo div#item_box div.b201 div.p01');},s_getCartItems);runInterval(function(){return $('.addtocart .alsoInfo #cart_overlay_box');},function(){s_recRule=$('.addtocart .alsoInfo #cart_overlay_box').find('input').first().attr('value');});});};window.s_atcOverlay=s_atcOverlay;})();});(window.callback15149=window.callback15149||Bootstrapper.new_fArray()).add(function(){Bootstrapper.setCurrentRuleId(15149);Bootstrapper.bindDOMParsed(function(){try{Bootstrapper.setCurrentRuleId(67001);if(typeof console!='undefined'&&console.log){console.log('Ensighten rule 67001: [prod]ROPiS Tracking');}
var thePage='';function s_trackROPiSPage(){var getPage=$.text($('#overlayframe').contents()).toString();if(getPage!='defined'&&getPage!=''){if(getPage.indexOf('Store Availability for:')!=-1){thePage='storeinventory';}else
if(getPage.indexOf('Your Reservation Details:')!=-1){thePage=('ROPS:Enter Details');}else
if(getPage.indexOf('Thank you for your request')!=-1){thePage='ROPS:Confirmation';}
else
if(getPage.indexOf('Reserve Online and Pickup In Store Details')!=-1){thePage='ROPS:How it Works';}
if(thePage!==s.pageName){window.parent.$("#overlayframe")[0].contentWindow.s=window.parent.s;window.parent.$("#overlayframe")[0].contentWindow.s_omniPageLoadTrack();s.events='';s.products='';}}}
function setupIframeHandler(){$('iframe#overlayframe').load(function(){setTimeout(function(){s_trackROPiSPage();},3000);});}
$('.ropsButtonWrapper button,.ropsContent a').on('click',function(){setupIframeHandler();});}catch(e){Bootstrapper.reportException(e);}});});Bootstrapper.bindDOMLoaded(function(){try{Bootstrapper.setCurrentRuleId(6899);if(typeof console!='undefined'&&console.log){console.log('Ensighten rule 6899: SeeWhy [Prod] Image Tag Test');}
var img=document.createElement("img");img.id="cy_image";img.setAttribute("id","cy_image");img.setAttribute("width",1);img.setAttribute("height",1);img.setAttribute("border",0);document.body.appendChild(img);;callback6899.exec();}catch(e){Bootstrapper.reportException(e);}});try{Bootstrapper.setCurrentRuleId(15828);$('document').ready(function(){if(typeof console!='undefined'&&console.log){console.log('Ensighten rule 15828: [prod]global scode');}
var domain=document.location.hostname;if(domain.indexOf('staples.ca')>-1){window.s_account="staplescadevreplat";}else if(domain.indexOf('staples.com')>-1){window.s_account="staplescomdev";}
var s_account=window.s_account;window.s_gi=s_gi;var s=window.s=s_gi(s_account);s.dynamicAccountSelection=true;s.dynamicAccountMatch=window.location.hostname;s.dynamicAccountList="staplescomprod=www.staples.com;staplescomprod=weeklyad.staples.com;staplescomprod=documents.staples.com;staplescomprod=www.staples.com;staplescomprod=storelocator.staples.com;staplescaprodreplat=www.staples.ca;staplescaprodreplat=flyer.staples.ca;staplescaprodreplat=stores.staples-locator.com;staplescomprod,staplescommobile2prod=t.staples.com";if(s_account.indexOf('staplesca')>-1){s.linkInternalFilters="javascript:,.staples.ca,www.staples.ca,businessdepot.ca,businessdepot.com,.bureauengros.ca,www.bureauengros.ca,bureauengros.com,stapleslistens.ca,easy.staples.ca,simple.bureauengros.com,flyerservices.staples.ca,flyerservices2.staples.ca,flyer.staples.ca,http://staples.ca,stores.staples-locator.com";s.currencyCode="CAD";s.trackExternalLinks=true;}else if(s_account.indexOf('staplescom')>-1){s.linkInternalFilters="javascript:,.staples.com,weeklyad.staples.com,cache.vendaria.com,staplesrewardscenter.com,stapleseasyrebates.com,"+"sellpoint.net,powerreviews.com,webcollage.net,shoplocal.com,weeklyad.com,staples-locator.com";s.currencyCode="USD";s.trackExternalLinks=true;}
s.charSet="iso-8859-1"
s.trackDownloadLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"
s.usePlugins=true
s.successfulSearchEvent='event1';s.nullSearchEvent='event2';s.searchTermVariable='eVar1';s.doPlugins=s_doPlugins;s.getObjectID=s_getObjectID;s._channelDomain='Social Media Organic|facebook.com,flickr.com,twitter.com,youtube.com,myspace.com,blogspot.com,t.co>';s._channelPattern="Email|EM>Affiliates|AFF>Banner|BNR>Banner|BAN>Broadband|BRD>Social Media|SM>Comparison Shopping|CSE>Display Advertising|DA>Paid Search|PS>Endless Aisle|RTL";s.exitLinkHandler=new Function("p","o",""
+"var s=this,h=s.p_gh(),n='linkInternalFilters',i,t;if(!h||(s.linkTyp"
+"e&&(h||s.linkName)))return'';i=h.href.indexOf('?');t=s[n];s[n]=p?p:"
+"t;h.ref=s.linkLeaveQueryString||i<0?h.href:h.href.substring(0,i);if"
+"(s.lt(h.href)=='e')s.linkType='e';else h='';s[n]=t;return o?h:h.hre"
+"f;");s.p_gh=new Function("",""
+"var s=this;if(!s.eo&&!s.lnk)return'';var o=s.eo?s.eo:s.lnk,y=s.ot(o"
+"),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o"
+"=o.parentElement?o.parentElement:o.parentNode;if(!o)return'';y=s.ot"
+"(o);n=s.oid(o);x=o.s_oidt;}}return o?o:'';");s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;");s.handlePPVevents=new Function("","if(!s.getPPVid)return;var dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documentElement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document.documentElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph,pv=Math.min(Math.round(vh/dh*100),100),c=s.c_r('s_ppv'),a=(c.indexOf(',')>-1)?c.split(',',4):[],id=(a.length>0)?(a[0]):escape(s.getPPVid),cv=(a.length>1)?parseInt(a[1]):(0),p0=(a.length>2)?parseInt(a[2]):(pv),cy=(a.length>3)?parseInt(a[3]):(0),cn=(pv>0)?(id+','+((pv>cv)?pv:cv)+','+p0+','+((vh>cy)?vh:cy)):'';s.c_w('s_ppv',cn);");s.getPercentPageViewed=new Function("pid","pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false;if(typeof(s.linkType)!='undefined'&&s.linkType!='e')return'';var v=s.c_r('s_ppv'),a=(v.indexOf(',')>-1)?v.split(',',4):[];if(a.length<4){for(var i=3;i>0;i--){a[i]=(i<a.length)?(a[i-1]):('');}a[0]='';}a[0]=unescape(a[0]);s.getPPVpid=pid;s.c_w('s_ppv',escape(pid));if(ist){s.getPPVid=(pid)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('s_ppv',escape(s.getPPVid));if(s.wd.addEventListener){s.wd.addEventListener('load',s.handlePPVevents,false);s.wd.addEventListener('scroll',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handlePPVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onload',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevents);s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-')?(a):(a[1]);");s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");s.manageQueryParam=new Function("p","w","e","u",""
+"var s=this,x,y,i,qs,qp,qv,f,b;u=u?u:(s.pageURL?s.pageURL:''+s.wd.lo"
+"cation);u=u=='f'?''+s.gtfs().location:u+'';x=u.indexOf('?');qs=x>-1"
+"?u.substring(x,u.length):'';u=x>-1?u.substring(0,x):u;x=qs.indexOf("
+"'?'+p+'=');if(x>-1){y=qs.indexOf('&');f='';if(y>-1){qp=qs.substring"
+"(x+1,y);b=qs.substring(y+1,qs.length);}else{qp=qs.substring(1,qs.le"
+"ngth);b='';}}else{x=qs.indexOf('&'+p+'=');if(x>-1){f=qs.substring(1"
+",x);b=qs.substring(x+1,qs.length);y=b.indexOf('&');if(y>-1){qp=b.su"
+"bstring(0,y);b=b.substring(y,b.length);}else{qp=b;b='';}}}if(e&&qp)"
+"{y=qp.indexOf('=');qv=y>-1?qp.substring(y+1,qp.length):'';var eui=0"
+";while(qv.indexOf('%25')>-1){qv=unescape(qv);eui++;if(eui==10)break"
+";}qv=s.rep(qv,'+',' ');qv=escape(qv);qv=s.rep(qv,'%25','%');qv=s.re"
+"p(qv,'%7C','|');qv=s.rep(qv,'%7c','|');qp=qp.substring(0,y+1)+qv;}i"
+"f(w&&qp){if(f)qs='?'+qp+'&'+f+b;else if(b)qs='?'+qp+'&'+b;else qs='"
+"?'+qp}else if(f)qs='?'+f+'&'+qp+b;else if(b)qs='?'+qp+'&'+b;else if"
+"(qp)qs='?'+qp;return u+qs;");s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");s.join=new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");if(!s.__ccucr){s.c_rr=s.c_r;s.__ccucr=true;s.c_r=new Function("k",""
+"var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)ret"
+"urn v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i="
+"c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';'"
+",i);m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:"
+"m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.get"
+"Time()){d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}ret"
+"urn v;");}
if(!s.__ccucw){s.c_wr=s.c_w;s.__ccucw=true;s.c_w=new Function("k","v","e",""
+"this.new2 = true;"
+"var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,"
+"c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s"
+".ape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substr"
+"ing(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv"
+".indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.i"
+"ndexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime())"
+"{pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'"
+"='+s.ape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t"
+".indexOf(';')!=-1){var t1=parseInt(t.substring(t.indexOf('|')+1,t.i"
+"ndexOf(';')));t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.set"
+"Time(ht);s.c_wr(pn,pv,d);}return v==s.c_r(s.epa(k));");}
s.trackTNT=new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");s.clickPast=new Function("scp","ct_ev","cp_ev","cpc",""
+"var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
+"{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
+";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
+",0,0);}}}");s.setupDynamicObjectIDs=new Function(""
+"var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
+">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
+" if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
+"lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
+"re=1}");s.setOIDs=new Function("e",""
+"var s=s_c_il["+s._in+"],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
+",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
+"{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
+"=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
+"objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re"
+"pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';"
+"if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0"
+")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this."
+"s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o"
+"]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");s.channelManager=new Function("a","b","c","d","e","f",""
+"var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
+"X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("
+"e))v=0;if(!s.c_w(e,1,n))s.c_w(e,1,0);if(!s.c_r(e))v=0;}g=s.referrer"
+"?s.referrer:document.referrer;g=g.toLowerCase();if(!g)h=1;i=g.index"
+"Of('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkInter"
+"nalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<l;m+"
+"+){B=j.indexOf(k[m])==-1?'':g;if(B)O=B;}if(!O&&!h){p=g;U=g.indexOf("
+"'//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q,r)"
+";t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSearchE"
+"ngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g=s."
+"repl(g,'as_q','*');}A=s.split(S,'>');T=A.length;for(i=0;i<A.length;"
+"i++){D=A[i];D=s.split(D,'|');E=s.split(D[0],',');for(G=0;G<E.length"
+";G++){H=j.indexOf(E[G]);if(H>-1){if(D[2])N=u=D[2];else N=t;if(d==1)"
+"{N=s.repl(N,'#',' - ');g=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo'"
+");N=s.repl(N,'%','oogle');}i=s.split(D[1],',');for(k=0;k<i.length;k"
+"++){M=s.getQueryParam(i[k],'',g).toLowerCase();if(M)break;}}}}}if(!"
+"O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M)P='Paid Search';el"
+"se P='Paid Non-Search';}if(!O&&N){u=N;P='Natural Search'}}if(h==1&&"
+"!O&&v==1)u=P=t=p='Direct Load';X=M+u+t;c=c?c:'c_m';if(c!='0'){X=s.g"
+"etValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.split(g,'>');l=k."
+"length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r"
+".length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=j.indexOf(Y);if"
+"(i>-1)P=q[0];}}}g=s._channelParameter;if(g&&X){k=s.split(g,'>');l=k"
+".length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S="
+"r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if(U)P=q[0]}}}g=s"
+"._channelPattern;if(g&&X){k=s.split(g,'>');l=k.length;for(m=0;m<l;m"
+"++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;"
+"T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i.indexOf(Y);if(H"
+"==0)P=q[0];}}}if(X)M=M?M:N?'Keyword Unavailable':'n/a';p=X&&p?p:'';"
+"t=X&&t?t:'';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?"
+"P:'';s._referrer=p;s._referringDomain=t;s._partner=N;s._campaignID="
+"O;s._campaign=u;s._keywords=M;s._channel=P;");s.seList="altavista.co|q,r|AltaVista>aol.co.uk,search.aol.co.uk|query"
+"|AOL - United Kingdom>search.aol.com,search.aol.ca|query,q|AOL.com "
+"Search>ask.com,ask.co.uk|ask,q|Ask Jeeves>www.baidu.com|wd|Baidu>da"
+"um.net,search.daum.net|q|Daum>google.co,googlesyndication.com|q,as_"
+"q|Google>google.com.ar|q,as_q|Google - Argentina>google.com.au|q,as"
+"_q|Google - Australia>google.at|q,as_q|Google - Austria>google.com."
+"bh|q,as_q|Google - Bahrain>google.com.bd|q,as_q|Google - Bangladesh"
+">google.be|q,as_q|Google - Belgium>google.com.bo|q,as_q|Google - Bo"
+"livia>google.ba|q,as_q|Google - Bosnia-Hercegovina>google.com.br|q,"
+"as_q|Google - Brasil>google.bg|q,as_q|Google - Bulgaria>google.ca|q"
+",as_q|Google - Canada>google.cl|q,as_q|Google - Chile>google.cn|q,a"
+"s_q|Google - China>google.com.co|q,as_q|Google - Colombia>google.co"
+".cr|q,as_q|Google - Costa Rica>google.hr|q,as_q|Google - Croatia>go"
+"ogle.cz|q,as_q|Google - Czech Republic>google.dk|q,as_q|Google - De"
+"nmark>google.com.do|q,as_q|Google - Dominican Republic>google.com.e"
+"c|q,as_q|Google - Ecuador>google.com.eg|q,as_q|Google - Egypt>googl"
+"e.com.sv|q,as_q|Google - El Salvador>google.ee|q,as_q|Google - Esto"
+"nia>google.fi|q,as_q|Google - Finland>google.fr|q,as_q|Google - Fra"
+"nce>google.de|q,as_q|Google - Germany>google.gr|q,as_q|Google - Gre"
+"ece>google.com.gt|q,as_q|Google - Guatemala>google.hn|q,as_q|Google"
+" - Honduras>google.com.hk|q,as_q|Google - Hong Kong>google.hu|q,as_"
+"q|Google - Hungary>google.co.in|q,as_q|Google - India>google.co.id|"
+"q,as_q|Google - Indonesia>google.ie|q,as_q|Google - Ireland>google."
+"is|q,as_q|Google - Island>google.co.il|q,as_q|Google - Israel>googl"
+"e.it|q,as_q|Google - Italy>google.com.jm|q,as_q|Google - Jamaica>go"
+"ogle.co.jp|q,as_q|Google - Japan>google.jo|q,as_q|Google - Jordan>g"
+"oogle.co.ke|q,as_q|Google - Kenya>google.co.kr|q,as_q|Google - Kore"
+"a>google.lv|q,as_q|Google - Latvia>google.lt|q,as_q|Google - Lithua"
+"nia>google.com.my|q,as_q|Google - Malaysia>google.com.mt|q,as_q|Goo"
+"gle - Malta>google.mu|q,as_q|Google - Mauritius>google.com.mx|q,as_"
+"q|Google - Mexico>google.co.ma|q,as_q|Google - Morocco>google.nl|q,"
+"as_q|Google - Netherlands>google.co.nz|q,as_q|Google - New Zealand>"
+"google.com.ni|q,as_q|Google - Nicaragua>google.com.ng|q,as_q|Google"
+" - Nigeria>google.no|q,as_q|Google - Norway>google.com.pk|q,as_q|Go"
+"ogle - Pakistan>google.com.py|q,as_q|Google - Paraguay>google.com.p"
+"e|q,as_q|Google - Peru>google.com.ph|q,as_q|Google - Philippines>go"
+"ogle.pl|q,as_q|Google - Poland>google.pt|q,as_q|Google - Portugal>g"
+"oogle.com.pr|q,as_q|Google - Puerto Rico>google.com.qa|q,as_q|Googl"
+"e - Qatar>google.ro|q,as_q|Google - Romania>google.ru|q,as_q|Google"
+" - Russia>google.st|q,as_q|Google - Sao Tome and Principe>google.co"
+"m.sa|q,as_q|Google - Saudi Arabia>google.com.sg|q,as_q|Google - Sin"
+"gapore>google.sk|q,as_q|Google - Slovakia>google.si|q,as_q|Google -"
+" Slovenia>google.co.za|q,as_q|Google - South Africa>google.es|q,as_"
+"q|Google - Spain>google.lk|q,as_q|Google - Sri Lanka>google.se|q,as"
+"_q|Google - Sweden>google.ch|q,as_q|Google - Switzerland>google.com"
+".tw|q,as_q|Google - Taiwan>google.co.th|q,as_q|Google - Thailand>go"
+"ogle.bs|q,as_q|Google - The Bahamas>google.tt|q,as_q|Google - Trini"
+"dad and Tobago>google.com.tr|q,as_q|Google - Turkey>google.com.ua|q"
+",as_q|Google - Ukraine>google.ae|q,as_q|Google - United Arab Emirat"
+"es>google.co.uk|q,as_q|Google - United Kingdom>google.com.uy|q,as_q"
+"|Google - Uruguay>google.co.ve|q,as_q|Google - Venezuela>google.com"
+".vn|q,as_q|Google - Viet Nam>google.co.vi|q,as_q|Google - Virgin Is"
+"lands>icqit.com|q|icq>bing.com|q|Microsoft Bing>myway.com|searchfor"
+"|MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|quer"
+"y,search|Netscape Search>reference.com|q|Reference.com>seznam|w|Sez"
+"nam.cz>abcsok.no|q|Startsiden>tiscali.it|key|Tiscali>virgilio.it|qs"
+"|Virgilio>yahoo.com,search.yahoo.com|p|Yahoo!>ar.yahoo.com,ar.searc"
+"h.yahoo.com|p|Yahoo! - Argentina>au.yahoo.com,au.search.yahoo.com|p"
+"|Yahoo! - Australia>ca.yahoo.com,ca.search.yahoo.com|p|Yahoo! - Can"
+"ada>fr.yahoo.com,fr.search.yahoo.com|p|Yahoo! - France>de.yahoo.com"
+",de.search.yahoo.com|p|Yahoo! - Germany>hk.yahoo.com,hk.search.yaho"
+"o.com|p|Yahoo! - Hong Kong>in.yahoo.com,in.search.yahoo.com|p|Yahoo"
+"! - India>yahoo.co.jp,search.yahoo.co.jp|p,va|Yahoo! - Japan>kr.yah"
+"oo.com,kr.search.yahoo.com|p|Yahoo! - Korea>mx.yahoo.com,mx.search."
+"yahoo.com|p|Yahoo! - Mexico>ph.yahoo.com,ph.search.yahoo.com|p|Yaho"
+"o! - Philippines>sg.yahoo.com,sg.search.yahoo.com|p|Yahoo! - Singap"
+"ore>es.yahoo.com,es.search.yahoo.com|p|Yahoo! - Spain>telemundo.yah"
+"oo.com,espanol.search.yahoo.com|p|Yahoo! - Spanish (US : Telemundo)"
+">tw.yahoo.com,tw.search.yahoo.com|p|Yahoo! - Taiwan>uk.yahoo.com,uk"
+".search.yahoo.com|p|Yahoo! - UK and Ireland>yandex|text|Yandex.ru>s"
+"earch.cnn.com|query|CNN Web Search>search.earthlink.net|q|Earthlink"
+" Search>search.comcast.net|q|Comcast Search>search.rr.com|qs|RoadRu"
+"nner Search>optimum.net|q|Optimum Search";s.loadModule("Media")
s.Media.autoTrack=true
s.Media.trackWhilePlaying=true
s.Media.trackVars="events"
s.Media.trackEvents="event53,event54"
s.Media.trackMilestones="25,50,75,100";s.Media.monitor=function(s,media){if(media.event=="Open"){s.events="event53";}
if(media.event=="Close"){s.events="event54";}}
s.visitorNamespace="staples"
s.trackingServer="metrics.staples.com"
s.trackingServerSecure="smetrics.staples.com"
s.dc=122
s.m_Media_c="var m=s.m_i('Media');m.cn=function(n){var m=this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',"
+"x;n=m.cn(n);l=parseInt(l);if(!l)l=1;if(n&&p){if(!m.l)m.l=new Object;if(m.l[n])m.close(n);if(b&&b.id)a=b.id;for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.p=m.cn(p);i.a=a;i.t=0"
+";i.ts=0;i.s=Math.floor(tm.getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;m.l[n]=i}};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o){var m=this,i;i=m.e(n,1,o);i.m=new Function('var m"
+"=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.mt=setTimeout(i.m,5000)}}');i.m()};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){va"
+"r m=this;if (m.trackWhilePlaying) {m.e(n,4,-1)}};m.e=function(n,x,o){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),ti=m.trackSeconds,tp=m.trackMilestones,z=new Array,j,d='--**--',t=1,b,"
+"v=m.trackVars,e=m.trackEvents,pe='media',pev3,w=new Object,vo=new Object;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){w.name=n;w.length=i.l;w.playerName=i.p;if(i.to<0)w.event=\"OPEN\";else w.event=(x="
+"=1?\"PLAY\":(x==2?\"STOP\":(x==3?\"MONITOR\":\"CLOSE\")));w.openTime=new Date();w.openTime.setTime(i.s*1000);if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {b=\"Media.\"+name;pev3 = m.s.ape(i.n)+d+i.l+d+m.s.a"
+"pe(i.p)+d;if(x){if(o<0&&i.lt>0){o=(ts-i.lt)+i.lo;o=o<i.l?o:i.l-1}o=Math.floor(o);if(x>=2&&i.lo<o){i.t+=o-i.lo;i.ts+=o-i.lo;}if(x<=2){i.e+=(x==1?'S':'E')+o;i.lx=x;}else if(i.lx!=1)m.e(n,1,o);i.lt=ts"
+";i.lo=o;pev3+=i.t+d+i.s+d+(m.trackWhilePlaying&&i.to>=0?'L'+i.to:'')+i.e+(x!=2?(m.trackWhilePlaying?'L':'E')+o:'');if(m.trackWhilePlaying){b=0;pe='m_o';if(x!=4){w.offset=o;w.percent=((w.offset+1)/w"
+".length)*100;w.percent=w.percent>100?100:Math.floor(w.percent);w.timePlayed=i.t;if(m.monitor)m.monitor(m.s,w)}if(i.to<0)pe='m_s';else if(x==4)pe='m_i';else{t=0;v=e='None';ti=ti?parseInt(ti):0;z=tp?"
+"m.s.sp(tp,','):0;if(ti&&i.ts>=ti)t=1;else if(z){if(o<i.to)i.to=o;else{for(j=0;j<z.length;j++){ti=z[j]?parseInt(z[j]):0;if(ti&&((i.to+1)/i.l<ti/100)&&((o+1)/i.l>=ti/100)){t=1;j=z.length}}}}}}}else{m"
+".e(n,2,-1);if(m.trackWhilePlaying){w.offset=i.lo;w.percent=((w.offset+1)/w.length)*100;w.percent=w.percent>100?100:Math.floor(w.percent);w.timePlayed=i.t;if(m.monitor)m.monitor(m.s,w)}m.l[n]=0;if(i"
+".e){pev3+=i.t+d+i.s+d+(m.trackWhilePlaying&&i.to>=0?'L'+i.to:'')+i.e;if(m.trackWhilePlaying){v=e='None';pe='m_o'}else{t=0;m.s.fbr(b)}}else t=0;b=0}if(t){vo.linkTrackVars=v;vo.linkTrackEvents=e;vo.p"
+"e=pe;vo.pev3=pev3;m.s.t(vo,b);if(m.trackWhilePlaying){i.ts=0;i.to=o;i.e=''}}}}return i};m.ae=function(n,l,p,x,o,b){if(n&&p){var m=this;if(!m.l||!m.l[n])m.open(n,l,p,b);m.e(n,x,o)}};m.a=function(o,t"
+"){var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',"
+"f7='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=n"
+"ew Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catc"
+"h(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){"
+"p='Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n="
+"=8)x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x.type='tex"
+"t/javascript';x.htmlFor=i;x.event='PlayStateChange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p==2){p='Qui"
+"ckTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTimeScale();l"
+"=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,o);m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,o)}if(n>0&&"
+"o.'+f7+'>=10){m.ae(mn,l,\"'+p+'\",3,p,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c);o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='"
+"RealPlayer '+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetLength()/1000;p=o.GetPosition()/1000;if(n!="
+"o.'+f4+'){if(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,o)}if(n==3&&(o.'+f7+'>=10||!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,o);o.'+f7+'=0}o."
+"'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o.'+f3+"
+"'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName(m.s.i"
+"sie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd.addEventListener)s.wd.addEventListener('load',m.as,false)";s.m_i("Media");s_prod_arr=new Array();s.checkProd=function(){var s_prodarray=s.split(s.products,',');if(s_prodarray.length>15){s.products=s_prodarray.slice(0,15);s_prodarray=s_prodarray.slice(15,90);var i=0;while(s_prodarray.length>0){s_prod_arr[i]=s_prodarray.slice(0,15);s_prodarray=s_prodarray.slice(15);i++;}}}
s.sendExtra=function(p){var i=0;var s=s_gi(s_account);while(s_prod_arr[i]){s.linkTrackVars="events,purchaseID,products";s.linkTrackEvents="purchase,event49"
s.events="purchase,event49";s.products=s_prod_arr[i];s.purchaseID=p+"_"+(i+2);s.tl(this,'o','long product string');i++;}}
var s_code='',s_objectID;function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()
function s_gi(un,pg,ss){var c="s.version='H.24.2';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+"fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+"s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+"rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+"pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+"(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+"=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+"_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+"x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+"r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+"oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+"s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+"('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+"ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+"ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+"=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl"
+"(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im."
+"s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if"
+"(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.na"
+"me&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg"
+"=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s"
+"=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCas"
+"e();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l"
+"=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.su"
+"bstring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f"
+"){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>="
+"0)){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.in"
+"dexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(s"
+"v){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';e"
+"lse if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs"
+"!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType"
+"){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;"
+"if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&"
+"e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL"
+"'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationS"
+"erverSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s"
+".em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='"
+"cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';els"
+"e if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else"
+" if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q"
+"='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=="
+"'deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if("
+"b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase("
+"):'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h."
+"indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if("
+"s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';r"
+"eturn ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],"
+"f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e"
+"){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&"
+"&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/"
+"':'')+h}return h};s.ot=function(o){var t=o.tagName;if((''+o.tagUrn)!='undefined'||((''+o.scopeName)!='undefined'&&(''+o.scopeName).toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase("
+"):'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0"
+";if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",'"
+"'),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){"
+"o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+','"
+")>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un"
+");return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){"
+"var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)i"
+"f(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v"
+"+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o"
+"=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if("
+"s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,"
+"s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n"
+"){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0"
+"&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,"
+"i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.u"
+"n.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,"
+"l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;"
+"m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m"
+"._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s"
+"[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if"
+"((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl"
+")for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]"
+"){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o="
+"g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.su"
+"bstring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s="
+"s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s"
+".maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o"
+".type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o')"
+";o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=fun"
+"ction(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]="
+"v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<"
+"s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxD"
+"elay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()}"
+";s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),v"
+"t=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code=''"
+",vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.proto"
+"type){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','"
+"var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if"
+"(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElem"
+"ent.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}re"
+"turn hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&"
+"pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.con"
+"nectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pa"
+"geURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo"
+"&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('."
+"s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);"
+"if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');q+='&pe='+s.pe+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex"
+";if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}"
+"if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLi"
+"ghtProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd."
+"s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfile"
+"ID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagConta"
+"inerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];"
+"x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&ty"
+"peof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().in"
+"dexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var "
+"apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.iso"
+"pera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.ap"
+"v=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i"
+"=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cooki"
+"eDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s."
+"va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,"
+"channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n"
+"=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWi"
+"dth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBuffer"
+"edRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,lin"
+"kDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=n"
+"ew Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_doPlugins(s){s.events=s.events?s.events:"";var s_kenId=s.getQueryParam('k_clickid');var s_cid=s.getQueryParam('cid');if(s_kenId)
s.eVar50=s.getQueryParam('k_clickid');else if(s_cid)
s.eVar50="tracking code with no k_clickid";s.pageURL=s.manageQueryParam('cid',1,1);s.pageURL=s.manageQueryParam('om_rid',1,0);var s_omtrCmp=s.getQueryParam('cid')
var s_coreCmp=s.getQueryParam('cm_mmc')
if(!s_omtrCmp&&s_coreCmp){s.campaign=s.getQueryParam('cm_mmc');s.channelManager('cm_mmc','','c_m','0','','1');}
else{s.campaign=s.getQueryParam('cid');s.channelManager('cid','','c_m','0','','1');}
if(s.c_r('cid_weeklyad'))
{s.campaign=(s.c_r('cid_weeklyad'));s.c_w('cid_weeklyad','');}
s.campaign=s.repl(s.campaign,'%25','%');s.campaign=s.repl(s.campaign,'%3A',':');s.campaign=s.repl(s.campaign,'%3a',':');s.campaign=s.repl(s.campaign,'%5F','_');s.campaign=s.repl(s.campaign,'%5f','_');s.campaign=s.repl(s.campaign,'%20',' ');s.campaign=s.repl(s.campaign,'%21','!');s.campaign=s.repl(s.campaign,'%22','"');s.campaign=s.repl(s.campaign,'%23','#');s.campaign=s.repl(s.campaign,'%24','$');s.campaign=s.repl(s.campaign,'%28','(');s.campaign=s.repl(s.campaign,'%29',')');s.campaign=s.repl(s.campaign,'%2D','-');s.campaign=s.repl(s.campaign,'%2d','-');s.campaign=s.repl(s.campaign,'%2E','.');s.campaign=s.repl(s.campaign,'%2e','.');if(s._channel=="Direct Load"){s._campaign=s._channel=s._referrer=s._keywords=s._partner=s._referringDomain="";}
if(!s._referrer&&s._channel)
s._channel=s._channel+': No Referrer';if(s._channel=='Referrers'){s._referringDomain=s.split(s._referringDomain,'/');s._campaign='referrer:'+s._referringDomain[0];s.eVar5=s._referringDomain[0];}
if(s._channel=='Natural Search'){s._campaign='seo:'+s._partner;s.eVar24=s._keywords;s.eVar25='Other';s.prop17=s.eVar6=s.pageName;}
if(s._channel=='Paid Search'){s.eVar24='Other';s.eVar25=s._keywords;s.eVar6='Paid Search Campaign';}
if(s._channel=='Social Media Organic'){s._campaign='smo:'+s._campaign;}
if(s._campaign&&!s._partner){s.eVar24='Other';s.eVar25='Other';}
s.eVar20='';if(s._campaign&&typeof s._campaign!='undefined'){if(!s.campaign)
s.campaign=s.eVar20=s._campaign;s.eVar20=s.campaign&&!s.eVar20?s.campaign:s.eVar20;s.campaign=s.eVar20&&!s.campaign?s.eVar20:s.campaign;s.prop12=s.campaign+': '+s.pageName;s.campaign=s.repl(s.campaign,'%25','%');s.campaign=s.repl(s.campaign,'%3A',':');s.campaign=s.repl(s.campaign,'%3a',':');s.campaign=s.repl(s.campaign,'%24','$');s.prop30=s.campaign;}
else{s.prop12=s.pageName;}
if(s.campaign){s.campaign=s.repl(s.campaign,'%25','%');s.campaign=s.repl(s.campaign,'%3A',':');s.campaign=s.repl(s.campaign,'%3a',':');s.campaign=s.repl(s.campaign,'%24','$');s.eVar20=s.campaign&&!s.eVar20?s.campaign:s.eVar20;s.campaign=s.eVar20&&!s.campaign?s.eVar20:s.campaign;}
if(s._channel&&typeof s._channel!='undefined'){s.eVar22=s.eVar21=s._channel;}
if(!s.eVar21&&s.campaign){s.eVar21=s.eVar22=s.campaign.substring(0,2).toLowerCase()=='em'?'Email':s.eVar21;s.eVar21=s.eVar22=s.campaign.substring(0,2).toLowerCase()=='ps'?'Paid Search':s.eVar21;s.eVar21=s.eVar22=s.campaign.substring(0,3).toLowerCase()=='seo'?'Natural Search':s.eVar21;s.eVar21=s.eVar22=s.campaign.substring(0,8).toLowerCase()=='referrer'?'Referrers':s.eVar21;s.eVar21=s.eVar22=s.campaign.substring(0,3).toLowerCase()=='cse'?'Comparison Shopping':s.eVar21;s.eVar21=s.eVar22=s.campaign.substring(0,3).toLowerCase()=='aff'?'Affiliates':s.eVar21;s.eVar21=s.eVar22=s.campaign.substring(0,3).toLowerCase()=='bnr'?'Banner':s.eVar21;s.eVar21=s.eVar22=s.campaign.substring(0,3).toLowerCase()=='ban'?'Banner':s.eVar21;s.eVar21=s.eVar22=s.campaign.substring(0,3).toLowerCase()=='brd'?'Broadband':s.eVar21;s.eVar21=s.eVar22=s.campaign.substring(0,2).toLowerCase()=='sm'?'Social Media':s.eVar21;s.eVar21=s.eVar22=s.campaign.substring(0,2).toLowerCase()=='da'?'Display Advertising':s.eVar21;if(!s.eVar21&&s.campaign)
s.eVar21=s.eVar22='Paid Non-Search';}
var campaign=s.getValOnce(s.campaign,"s_campaign",0);if(s.eVar21)
s.eVar23=s.crossVisitParticipation(s.eVar21,'cvp_cha','60','5','>','purchase');s.clickPast(s.campaign,'event37','event38');var s_recipient=s.getQueryParam('om_rid')
var s_coreRecipient=s.getQueryParam('cm_lm')
if(s_recipient){s.eVar32=s_recipient;s.eVar33=s.campaign;}
if(!s_recipient&&s_coreRecipient){s.eVar32=s_coreRecipient;s.eVar33=s.campaign;}
if(s.getQueryParam('ICID'))
s.eVar4=s.getQueryParam('ICID');if(s.getQueryParam('cm_sp'))
s.eVar4=s.getQueryParam('cm_sp');var prevPage=s.getPreviousValue(s.pageName,'gpv_pn','');if(prevPage)
s.prop26=prevPage;s.tnt=s.trackTNT();var searchTerm=s.getQueryParam('cmSearchKeyword')
if(searchTerm){s.eVar1=s.prop1=searchTerm;if(s.events){s.events=s.events+',event1';}
else{s.events='event1';}
s.prop17=s.eVar19=s.prop2=s.prop50='Redirected Search';if(!s.eVar3)
s.eVar3='Search';}
if(s.eVar1){s.eVar1=s.prop1=s.eVar1.toLowerCase();s.prop17=prevPage;s.eVar1=s.prop1=s.repl(s.eVar1,'+',' ');}
var t_search=s.getValOnce(s.eVar1,'ev1',0)
if(t_search=='')
{var a=s.split(s.events,',');var e='';for(var i=0;i<a.length;i++)
{if(a[i]=='event1'||a[i]=='event2')
continue;else
e+=a[i]?a[i]+',':a[i];}
s.events=e.substring(0,e.length-1);}
else if(!s.products)
{if(!s.c_r('productnum'))
s.productNum=1;else
s.productNum=parseInt(s.c_r('productnum'))+1;s.products=';productsearch'+s.productNum;var e=new Date();e.setTime(e.getTime()+(30*86400000));s.c_w('productnum',s.productNum,e);}
if(s.c_r('productnum')&&s.events.indexOf('purchase')>-1)
s.c_w('productnum','0',0);if(s.events&&((s.events+',').indexOf('event1,')>-1||(s.events+',').indexOf('event2,')>-1))
s.events=s.apl(s.events,'event73',',',2);if(document.referrer.indexOf("flyerservices")>-1){s.eVar3="Weekly Ad";s.eVar17="Weekly Ad:No Sub-Finding Method Specified";}
if(s.eVar4&&typeof s.eVar4!='undefined'&&!s.eVar3)
s.eVar3="Internal Campaigns"
if(s.eVar4&&s.eVar4!='Non-Internal Campaign'&&typeof s.eVar4!='undefined'&&s.eVar3=='Browse')
s.eVar3="Internal Campaigns"
if(campaign&&typeof campaign!='undefined'){if(s.linkName){}
else{s.eVar3='External Campaigns';s.eVar17='External Campaigns:No Sub-Finding Method Specified';}}
var s_cmArea=s.getQueryParam('cmArea');if(s_cmArea=='RIGHTRAIL+EZRO')
s.eVar3="Easy Reorder";var s_pfm=s.getQueryParam('pfm');if(s_pfm&&s_pfm!='undefined'){s.eVar3=s_pfm;}
if(location.pathname.indexOf('StaplesEZReorderDetail')!=-1){s.eVar3='Easy Reorder';s.eVar17='Easy Reorder:My Orders';s.prop38='Easy Reorder';}
if(document.referrer.indexOf('weeklyad.staples.com')>-1&&(!s.eVar3||s.eVar3.toLowerCase()=='browse')){s.eVar3='Weekly Ad';s.eVar17='Weekly Ad:No Sub-Finding Method Specified';}
if(document.referrer&&document.location.href)
{if(document.location.href.indexOf('StaplesSearch?')>-1&&(document.location.hostname!=document.referrer.split('/')[2]||document.referrer=='http://www.staples.com/sbd/content/inc/partner_header607.html')&&s.eVar3=='Search')
s.eVar17='Search:Basic Search';}
if(s.eVar3&&typeof s.eVar3!='undefined'){if(s.eVar3!='Browse')
s.eVar14=s.eVar15='Non-Browse';if(s.eVar3!='Search'&&!s.eVar1)
s.eVar1='Non-Search';if(s.eVar3!='Internal Campaigns'&&!s.eVar4)
s.eVar4='Non-Internal Campaign';}
if(s.eVar3=='Browse'&&!s.eVar17&&s.prop3)
{s.linkTrackVars=s.apl(s.linkTrackVars,'eVar17',',',2);s.eVar17=s.eVar3+':'+s.prop3;}
if(document.referrer.indexOf("basketbuilder.staples.com/basketDetail.aspx")!=-1&&s.events.indexOf("scAdd")!=-1){s.eVar3="Basketbuilder";s.eVar17="Basketbuilder:Main";}
if(document.referrer.indexOf("basketbuilder.staples.com/candyaisle")!=-1&&s.events.indexOf("scAdd")!=-1){s.eVar3="Basketbuilder";s.eVar17="Basketbuilder:Candy Aisle";}
if(document.referrer.indexOf("basketbuilder.staples.com/modalAlert")!=-1&&s.events.indexOf("scAdd")!=-1){s.eVar3="Basketbuilder";s.eVar17="Basketbuilder:Intercept";}
if(s.eVar3=='ATC Overlay')
s.eVar3=s.eVar17='';if(s.eVar3=='Up-Sell'||s.eVar3=='Cross-Sell')
s.eVar17='';if(s.eVar3&&s.eVar3!='Search'&&!s.eVar17){s.linkTrackVars=s.apl(s.linkTrackVars,'eVar17',',',2);s.eVar17=s.eVar3+':No Sub-Finding Method Specified';}
if(s.purchaseID)
s.eVar7=s.purchaseID;s.setupDynamicObjectIDs();var s_thisPage=location.href;s.prop21=s_thisPage.substr(0,99);if(!s.eVar18)
s.eVar18=s.c_r('DirectCustomerNumber');if(s.events&&typeof s.events!='undefined'){if(!(s.events.match("event4"))){s.events=s.events+",event4";}
if($('p#stockMessage').is(':visible')&&typeof(productSku)!='undefined'&&s.events.indexOf('event78')==-1){s.linkTrackVars=s.linkTrackVars+",prop9";s.events=s.events+",event78";s.prop9="Currently out of stock";}}else{s.events="event4";if($('p#stockMessage').is(':visible')&&typeof(productSku)!='undefined'&&s.events.indexOf('event78')==-1){s.linkTrackVars=s.linkTrackVars+",prop9";s.events=s.events+",event78";s.prop9="Currently out of stock";}}
if(s_thisPage.indexOf("weeklyad")>-1||s_thisPage.indexOf("shoplocal")>-1||s_thisPage.indexOf("crossmediaservices")>-1||s_thisPage.indexOf("localhost")>-1){if(!s.pageName)s.pageName="wklyad:LandingPage";if(!s.channel)s.channel="wklyad:LandingPage";if(!s.prop3)s.prop3="wklyad:LandingPage";if(!s.prop12)s.prop12="wklyad:LandingPage";s.prop29="Weekly Ad";if(!s.eVar3){s.eVar3="Weekly Ad";s.eVar17='Weekly Ad:No Sub-Finding Method Specified';}}
else{s.prop29=document.location.hostname;}
if(s.eVar38)
s.prop31=s.eVar38;var userCookie=s.c_r('StaplesUser');if(!s.eVar32&&userCookie){if(userCookie.indexOf('@')>-1||userCookie.indexOf('%40')>-1){userCookie=s.repl(userCookie,'%2E','.');userCookie=s.repl(userCookie,'%40','@');userCookie=s.repl(userCookie,'%5F','_');userCookie=s.repl(userCookie,'%2D','-');userCookie=s.repl(userCookie,'%21','!');userCookie=s.repl(userCookie,'%26','&');userCookie=s.repl(userCookie,"%27","'");userCookie=s.repl(userCookie,'%3A',':');userCookie=s.repl(userCookie,'%3B',';');userCookie=s.repl(userCookie,'%2B','+');userCookie=s.repl(userCookie,'%3D','=');userCookie=s.repl(userCookie,'%3F','?');s.eVar32=userCookie;}}
var userInfoCookie=s.c_r('StaplesUserInfo');if(userInfoCookie){userInfoCookie=s.repl(userInfoCookie,"%22","");userInfoCookie=s.repl(userInfoCookie,"}","");userInfoCookie=s.repl(userInfoCookie,'"','');userInfoCookie=s.repl(userInfoCookie,'%3A',':');var rewardsTier=s.split(userInfoCookie,'tier:');rewardsTier=s.split(rewardsTier[1],",");s.eVar46=rewardsTier[0];}
s.eVar46=s.getAndPersistValue(s.eVar46,'s_v46_persist',730);var s_visIdCookie=s.c_r('s_vi');var visRegExp=/[0-9A-F]+-[0-9A-F]+/g;var s_visId=s_visIdCookie.match(visRegExp);if(s_visId){s.eVar47=s_visId;}
s.eVar47=s.getAndPersistValue(s.eVar47,'s_v47_persist',730);if(window.mboxFactoryDefault&&typeof mboxFactoryDefault.getPCId=="function")
s.eVar42=mboxFactoryDefault.getPCId().getId();if(s.eVar3&&!s.prop38)
s.prop38=s.eVar3;if(s.linkTrackVars&&(s.linkTrackVars+',').indexOf('eVar3,')>-1)
{s.linkTrackVars=s.apl(s.linkTrackVars,'prop38',',',2);s.prop38=s.eVar3;}
if(s.getQueryParam('fromCartridge').toLowerCase()=='y'&&s.eVar3=='Search')
s.eVar17='Search:InkCart';var tierCookie=s.c_r('customerTier');if(tierCookie){tierCookie=s.repl(tierCookie,"%22","");tierCookie=s.repl(tierCookie,"}","");tierCookie=s.repl(tierCookie,'"','');tierCookie=s.repl(tierCookie,'%3A',':');var cbp=s.split(tierCookie,'cbp:');cbp=s.split(cbp[1],",");if(cbp[0]==""){cbp[0]="None";}
s.eVar55="cbp="+cbp[0];}
else{s.eVar55="cbp=None";}
var segmentCookie=s.c_r('CustomerSegment');if(segmentCookie){segmentCookie=s.repl(segmentCookie,"%22","");segmentCookie=s.repl(segmentCookie,"}","");segmentCookie=s.repl(segmentCookie,'"','');segmentCookie=s.repl(segmentCookie,'%3A',':');var leapData=s.split(segmentCookie,'LEAP:');leapData=s.split(leapData[1],",");if(leapData[0]){s.eVar55=s.eVar55+",business=Leap No Data,emprange=Leap No Data";s.eVar56="Leap No Data";s.eVar57="Leap No Data";s.eVar58="Leap No Data"}
else{var business=s.split(segmentCookie,'business:');business=s.split(business[1],",");if(business[0]==""){business[0]="None";}
s.eVar55=s.eVar55+",business="+business[0];var empRange=s.split(segmentCookie,'empRange:');empRange=s.split(empRange[1],",");if(empRange[0]==""){empRange[0]="None";}
s.eVar55=s.eVar55+",emprange="+empRange[0];var endDigit=1;s.eVar56="";while(endDigit<11){var name="msv_id"+endDigit;var msv_id=s.split(segmentCookie,name+":");msv_id=s.split(msv_id[1],",");if(msv_id[0]==""){msv_id[0]="None";}
s.eVar56=s.eVar56+name+"="+msv_id[0];if(endDigit<10){s.eVar56=s.eVar56+",";}
endDigit++;}
var categoryList=["CopyPaper","Ink","Toner","CleaningandBreakroom","Technology","Furniture","Computers","CPC","MailandShip","OtherSupplies","Others"];s.eVar57="";s.eVar58="";for(var x=0;x<categoryList.length;x++){var category=s.split(segmentCookie,categoryList[x]+":");category=s.split(category[1],",");if(category[0]==""){s.eVar57=s.eVar57+categoryList[x].toLowerCase()+"_sow=None"
s.eVar58=s.eVar58+categoryList[x].toLowerCase()+"_pc=None";}
else{var walletInfo=s.split(category[0],"|");s.eVar57=s.eVar57+categoryList[x].toLowerCase()+"_sow="+walletInfo[0];s.eVar58=s.eVar58+categoryList[x].toLowerCase()+"_pc="+walletInfo[1];}
if(x<(categoryList.length-1)){s.eVar57=s.eVar57+",";s.eVar58=s.eVar58+",";}}}}
else{s.eVar55=s.eVar55+",business=None,emprange=None";s.eVar56="None";s.eVar57="None";s.eVar58="None";}
if(s.eVar17&&s.eVar17.indexOf(': ')>-1)
s.eVar17=s.repl(s.eVar17,': ',':');if(s.prop6)s.hier1=s.prop6;if(s.linkTrackVars&&(s.linkTrackVars+',').indexOf('prop6,')>-1)
{if(s.prop6){s.linkTrackVars=s.apl(s.linkTrackVars,'hier1',',',2);s.hier1=s.prop6;}}
var prevPageType=s.getPreviousValue(s.prop3,'gpv_c3','')
if(s.events&&(s.events+',').indexOf('scAdd,')>-1&&!s.eVar12&&prevPageType){s.linkTrackVars=s.apl(s.linkTrackVars,'eVar12',',',2);s.eVar12=prevPageType;}
var vpCartPage=document.location.toString();if(s.getQueryParam('pf_id')&&vpCartPage.indexOf('display_xcart.aspx')!=-1)
{if(s.events&&typeof s.events!='undefined')
{s.events=s.events+",scAdd";}
else{s.events="scAdd";}}
var noPopUp=document.location.toString();if(window.self==window.parent&&noPopUp.indexOf('popup')<0&&s.events.indexOf('scAdd')<0)
{s.c_w('s_atcLocation',s.prop3);}
if(s.events&&(s.events+',').indexOf('scAdd,')>-1){s.linkTrackVars=s.apl(s.linkTrackVars,'eVar12',',',2);var checkCartRec=s.eVar17;if(s.eVar17&&checkCartRec.indexOf('cart')!=-1){if(checkCartRec.indexOf('cart_overlay')!=-1){s.eVar12='Shopping Cart Overlay';}else{s.eVar12='Shopping Cart Page';}}else{if(!window.trackAddCartCheckout&&s.c_r('s_atcLocationOverride')&&s.c_r('s_atcLocationOverride')!='false'){s.eVar12=s.c_r('s_atcLocationOverride');s.c_w('s_atcLocationOverride',false);}else{s.eVar12=s.c_r('s_atcLocation');}}}
var exitLinkCMSP=s.exitLinkHandler();var exitLinkICID=s.exitLinkHandler();if(exitLinkCMSP){var exitLink=exitLinkCMSP;if(exitLink.indexOf('cm_sp')>-1){var start=exitLink.indexOf('cm_sp');var subValue=exitLink.substring(start+6);var end=subValue.indexOf('&');if(end!=-1)
subValue=subValue.substring(0,end)
else
subValue=subValue.substring(0);s.eVar4=subValue;s.linkTrackVars="eVar4";}}
else if(exitLinkICID){var exitLink=exitLinkICID;if(exitLink.indexOf('ICID')>-1){var start=exitLink.indexOf('ICID');var subValue=exitLink.substring(start+6);var end=subValue.indexOf('&');if(end!=-1)
subValue=subValue.substring(0,end)
else
subValue=subValue.substring(0);s.eVar4=subValue;s.linkTrackVars="eVar4";}}
var b=s.getPercentPageViewed(s.pageName);s.prop44=b[0];s.prop45=b[1];s.prop46=b[2];s.prop47=b[3];if(typeof(s.prop3)!='undefined'&&s.prop3=='Product Detail')
{var mainSKU=s.products;mainSKU=mainSKU.slice(1);s.c_w('s_mainSKU',mainSKU);}
if(s.getQueryParam('sRule'))
{s.eVar64=s.getQueryParam('sRule');}
if(typeof(s.prop2)!='undefined')
{if(s.prop2=='zero')
{s.prop50='No Search Results';}else if(s.prop2=='Redirected Search')
{s.prop50='Redirected Search';}else{s.prop50='Search Results';}}
if(s.eVar62){s.transactionID=s.eVar62;}}
function s_getObjectID(o){var ID=o.href;return ID;}});$(document).on('click','.patc a',function(){if($(this).attr('cmarea')=='cart_overlay_box'){$.cookie('cartoverlayaddbtn','clicked');}else{$.cookie('cartoverlayaddbtn','not clicked');}});function s_previouslyOrderedSearchBox(resultNum)
{s.linkTrackVars="prop1,prop49,prop51";s.linkTrackEvents="None";s.events="";s.prop49=resultNum;s.prop51='Previously Ordered Items';s.tl(true,"o","Clicked on Previously Ordered Items Box from Search Results Page");}
function s_previouslyOrderedItemSearchClick()
{s.linkTrackVars="prop49,eVar3,eVar17,prop1,prop51";s.linkTrackEvents="None";s.events="";s.eVar3='Search';s.eVar17='Search:Previously Ordered Items';s.prop51='Previously Ordered Items';s.tl(true,"o","Clickthrough or Add-to-Cart of Item from Previously Ordered Items on Search Results Page");}
function s_prodResearchToolsSearchBox(resultNum)
{s.linkTrackVars="prop1,prop49,prop51";s.linkTrackEvents="None";s.events="";s.prop49=resultNum;s.prop51='Product and Research Tools';s.tl(true,"o","Clicked on Product and Research Tools Box from Search Results Page");}
function s_prodResearchToolsSearchClick()
{s.linkTrackVars="prop49,prop51,prop1";s.linkTrackEvents="None";s.events="";s.prop51='Product and Research Tools';s.tl(true,"o","Clickthrough from Product and Research Tools Box on Search Results Page");}
function s_blueBoxMessagingClick(msg)
{s.linkTrackVars="prop49,prop51,prop1,prop52";s.linkTrackEvents="None";s.events="";s.prop51='Blue Box Messaging';s.prop52=msg;s.tl(true,"o","Clickthrough from Blue Messaging Box on No Search Results Page");}
function s_searchDisplayView(view)
{s.linkTrackVars="prop1,prop2,prop3,prop4,prop5,prop6,prop53";s.linkTrackEvents="None";s.events="";s.prop53=view;s.tl(true,"o","Clicked "+view+" view on search results page");}
function s_shareProduct(socialType,product)
{s.linkTrackVars="products,eVar63,events";s.linkTrackEvents="event56";s.events="event56";s.products=";"+product;s.eVar63=socialType;s.tl(true,"o","Shared "+product+" to "+socialType);}
function s_beginCheckout(products){s.linkTrackVars='events,products';s.linkTrackEvents='scCheckout';s.products=products;s.events='scCheckout';s.tl(true,'o','Checkout');}
function s_intCmp(campaign){s.linkTrackVars='eVar4';s.linkTrackEvents='none';s.eVar4=campaign;s.tl(true,'o','Internal Campaign Click-Through');}
function s_prodTab(tab){s.eVar12='';s.linkTrackVars='prop11,prop48';s.linkTrackEvents='none';s.events='';s.prop11=tab;s.prop48=s.c_r('s_mainSKU');s.tl(true,'o',tab);s.prop48=s.prop11='';}
function s_cartAdd(products,revenue,units,atcMethod,findMethod){if(typeof s!='undefined'){if(findMethod&&(findMethod!=="ERO previousluy purchased items  - Add To Cart"&&findMethod!=="FavoritesList - Items From Fav list - Add To Cart")){s.linkTrackVars='events,products,eVar12,eVar3,eVar14,eVar15,eVar1,eVar4';s.eVar3=findMethod;}
else{s.linkTrackVars='events,products,eVar12';}
if(!s.eVar12&&s.prop3){s.eVar12=s.prop3;}
s.linkTrackEvents='scAdd,scOpen,event35,event36';s.events='scAdd,scOpen,event35,event36';var prodArray=s.split(products,':')
if(products)s.products='';if(revenue&&units){var revArray=s.split(revenue,':')
var unitsArray=s.split(units,':')
for(var i=0;i<prodArray.length;i++){if(typeof s.products!='undefined'&&s.products){if(revArray[i]&&unitsArray[i]){s.products=s.products+',;'+prodArray[i]+';;;event35='+revArray[i]+'|event36='+unitsArray[i];}
else{s.products=s.products+',;'+prodArray[i];}}
else{if(revArray[i]&&unitsArray[i]){s.products=';'+prodArray[i]+';;;event35='+revArray[i]+'|event36='+unitsArray[i];}
else{s.products=';'+prodArray[i];}}}}
else{for(var i=0;i<prodArray.length;i++){if(typeof s.products!='undefined'&&s.products){s.products=s.products+',;'+prodArray[i];}
else{s.products=';'+prodArray[i];}}}
s.tl(true,'o','Cart Addition');}}
function s_addToFavorites(products){s.linkTrackVars='events,products';s.linkTrackEvents='event23';s.events='event23';var prodArray=s.split(products,':')
for(var i=0;i<prodArray.length;i++){if(typeof s.products!='undefined'&&s.products){s.products=s.products+',;'+prodArray[i];}
else{s.products=';'+prodArray[i];}}
s.tl(true,'o','Add to Favorites');}
function s_homeLoc(clickLocation){s.linkTrackVars='prop15';s.linkTrackEvents='none';s.prop15=clickLocation;s.tl(true,'o','Home Page Click');}
function s_prodAffinity(product,findMethod,referralType,recRule){s.linkTrackVars='eVar3,eVar16,eVar17,eVar45';s.linkTrackEvents='none';if(recRule)
s.eVar45=recRule;else
s.eVar45='no recRule';if(findMethod)
s.eVar3=findMethod;else
s.eVar3='no PFM in prodAffinity';if(referralType)
s.eVar17=s.eVar3+':'+referralType;else
s.eVar17=s.eVar3+':No SPFM in prodAffinity';if(product)
s.eVar16=product;else
s.eVar16='no product in prodAffinity';s.tl(true,'o','Product Affinity');}
function s_findMethod(findMethod,recommendType,recRule){s.linkTrackVars='eVar3,eVar17,eVar45';if(recRule)
s.eVar45=recRule;else
s.eVar45='no recRule';if(findMethod)
s.eVar3=findMethod;else
s.eVar3='no PFM in findMethod';if(recommendType)
s.eVar17=s.eVar3+':'+recommendType;else
s.eVar17=s.eVar3+':No SPFM in findMethod';if(recommendType.indexOf('Autocomplete')>-1&&location.href.indexOf('/copyandprint/')==-1){s.linkTrackVars+=',events';s.linkTrackEvents='event62';s.events='event62';}else{s.linkTrackEvents='none';}
s.products='';s.tl(true,'o','Finding Method');}
function s_prodSlot(slot,searchPageNumber){s.linkTrackVars='eVar19';s.linkTrackEvents='none';s.eVar19=slot+': '+searchPageNumber;s.tl(true,'o','Search Slot');}
function s_wkAdProdView(product){s.linkTrackVars='events,products';s.linkTrackEvents='event43';s.events='event43';s.products=';'+product;s.tl(true,'e','Weekly Ad Product View');}
function s_wkAdCartAdd(product){s.linkTrackVars='events,products';s.linkTrackEvents='event44';s.events='event44';s.products=';'+product;s.tl(true,'e','Weekly Ad Cart Additions');}
function s_flyoutTrack(flyoutCategory,matchToolClick){if(matchToolClick=='true'){s.linkTrackVars='prop27,eVar3,eVar17';s.eVar3="Ink & Toner";s.eVar17="Ink & Toner:flyout";}else
s.linkTrackVars='prop27';s.linkTrackEvents='none';s.prop27=flyoutCategory;s.tl(true,'o','Product Flyout Interaction');}
function s_refineTrack(rtAction,rtType,rtValue){s.linkTrackVars='prop7,prop8,prop4';if(rtAction&&!rtType&&!rtValue)
s.prop7=s.prop8=rtAction;if(rtType&&!rtValue){s.prop7=s.prop8=rtAction+': '+rtType;}
if(rtValue){s.prop7=rtAction+': '+rtType;s.prop8=rtAction+': '+rtType+': '+rtValue;}
if(s.prop4){s.prop7=s.prop4+': '+s.prop7;s.prop8=s.prop4+': '+s.prop8;}
s.linkTrackEvents='none';s.tl(true,'o','Refinement Tracking');}
function s_fbLike(){s.linkTrackVars='products,events,eVar47';s.linkTrackEvents='event62';s.events='event62';s.eVar47='Facebook Like';s.tl(true,'o','Facebook Like');}
function s_storeLocator(zip,city,state,address){s.linkTrackVars='prop18,events';s.linkTrackEvents='event24';s.events='event24';if(zip)
s.prop18='zip:'+zip;if(state){s.prop18?s.prop18=s.prop18+',state:'+state:s.prop18='state:'+state;}
if(city){s.prop18?s.prop18=s.prop18+',city:'+city:s.prop18='city:'+city;}
if(address){s.prop18?s.prop18=s.prop18+',addr:'+address:s.prop18='addr:'+address;}
s_dfaCall();s.tl(this,'o','Store Locator Search');}
function s_comparisonTrack(){s.eVar10=s.eVar10;if(s.events){if(s.events.indexOf('event52')==-1){s.events=s.events+',event52';}}else{s.events='event52';}
s.pageName="compchartresults";s.server=s.server;s.channel="Other";s.prop3="compchartresults";s.prop4=s.prop4;s.prop5=s.prop5;s.prop6=s.prop6;s.hier1=s.prop6;var s_code=s.t();if(s_code)document.write(s_code);}
function s_cartAddOverlay(products,revenue,units,atcMethod,findMethod){if(typeof s!='undefined'){if(findMethod){s.linkTrackVars='events,products,eVar12,eVar3,eVar14,eVar15,eVar1,eVar4';s.eVar3=findMethod;}
else{s.linkTrackVars='events,products,eVar12';}
s.linkTrackEvents='scAdd,scOpen,event35,event36';s.events='scAdd,scOpen,event35,event36,event4';s.products='';var prodArray=s.split(products,':');if(revenue&&units){var revArray=s.split(revenue,':')
var unitsArray=s.split(units,':')
for(var i=0;i<prodArray.length;i++){if(typeof s.products!='undefined'&&s.products){if(revArray[i]&&unitsArray[i]){s.products=s.products+',;'+prodArray[i]+';;;event35='+revArray[i]+'|event36='+unitsArray[i];}
else{s.products=s.products+',;'+prodArray[i];}}
else{if(revArray[i]&&unitsArray[i]){s.products=';'+prodArray[i]+';;;event35='+revArray[i]+'|event36='+unitsArray[i];}
else{s.products=';'+prodArray[i];}}}}
else{for(var i=0;i<prodArray.length;i++){if(typeof s.products!='undefined'&&s.products){s.products=s.products+',;'+prodArray[i];}
else{s.products=';'+prodArray[i];}}}}}
function s_atcOverlayRecom(findMethod,clickType,products){if(true){s.linkTrackVars='prop3,prop4,prop5,prop6,eVar3,products,hier1';s.linkTrackEvents='none';s.prop3='Checkout';s.prop4="Checkout: "+findMethod+": "+clickType;s.prop5="Checkout: "+findMethod+": "+clickType;s.prop6="Checkout: "+findMethod+": "+clickType;s.hier1=s.prop6;s.products='';var prodArray=s.split(products,':');if(products){for(var i=0;i<prodArray.length;i++){if(typeof s.products!='undefined'&&s.products){s.products=s.products+',;'+prodArray[i];}
else{s.products=';'+prodArray[i];}}}}}
function s_searchHelpful(yesno,searchTerm){s.linkTrackEvents='none';if(yesno){if(searchTerm){s.linkTrackVars='prop33,prop34,eVar3,eVar4,eVar17,prop3,prop4,prop5,prop6,hier1';s.prop34=searchTerm+":"+yesno;}
else{s.linkTrackVars='prop33,eVar3,eVar4,eVar17,prop3,prop4,prop5,prop6,hier1';}
s.prop33=yesno;}
else
s.linkTrackVars='none';s.tl(true,'o','Search Helpful');}
function s_checkInStore(){s.linkTrackVars='events,products,eVar3,eVar4,eVar17,prop3,prop4,prop5,prop6,hier1';s.linkTrackEvents='event61';s.events='event61';s.tl(true,'o','Check InStore Availability');}
function s_printThisPage(){s.linkTrackVars='events,products,eVar3,eVar4,eVar17,prop3,prop4,prop5,prop6,hier1';s.linkTrackEvents='event60';s.events='event60';s.tl(true,'o','Print This Page');}
function s_outOfStock(product,postalCode,message,timestamp){s.linkTrackVars='products,events,eVar51,prop9';s.linkTrackEvents='event78';s.events='event78';s.products='';if(product)s.products=';'+product;if(postalCode)s.eVar51=postalCode;else s.eVar51='';if(message)s.prop9=message;else s.prop9='';}
function s_remItem(product){s.linkTrackVars='events,products';s.linkTrackEvents='scRemove';s.events='scRemove';s.products='';if(product)s.products=';'+product;s.tl(true,'o','Item removal from Cart');}
function s_formError(errorMessage){s.linkTrackVars='prop9';s.linkTrackEvents='none';if(errorMessage)s.prop9=errorMessage;else s.prop9='No form error specified';s.tl(true,'o','Form Error');}
window.s_hybridRopis=function(carouselName){try{if(typeof console!='undefined'&&console.log){console.log('calling s_hybridRopis with carousel '+carouselName);}
s.linkTrackVars='prop55';s.linkTrackEvents='none';s.prop55=" ROPiS:SearchHybrid:"+carouselName;s.tl(this,'o','ROPiS:SearchHybrid:'+carouselName);}catch(err){}};window.s_hybridViewMore=function(carouselName){try{if(typeof console!='undefined'&&console.log){console.log('calling s_hybridViewMore with carousel '+carouselName);}
s.linkTrackVars='prop55';s.linkTrackEvents='none';s.prop55="ViewMore:SearchHybrid:"+carouselName;s.tl(this,'o','ViewMore:SearchHybrid:'+carouselName);}catch(err){}};window.s_hybridViewAll=function(){try{if(typeof console!='undefined'&&console.log){console.log('calling s_hybridViewAll');}
s.linkTrackVars='prop55';s.linkTrackEvents='none';s.prop55='ViewAll:SearchHybrid';s.tl(true,'o','Hybrid ViewAll');}catch(err){}};;callback15828.exec();}catch(e){Bootstrapper.reportException(e);}Bootstrapper.bindDOMLoaded(function(){try{Bootstrapper.setCurrentRuleId(76662);if(typeof console!='undefined'&&console.log){console.log('Ensighten rule : 76662');}
function checkMatchURL(_chkList){for(var i=0;i<_chkList.length;i++){var chk=window.location.href.match(_chkList[i]);if(chk){return true;}}
return false;}
var chkList=[/\.staples\.com\/HP/,/\.staples\.com\/HP-Ink-Toner-Finder\/cat_CG812/,/\.staples\.com\/Ink-Toner-Finder\/cat_SC43/,/\.staples\.com\/All-in-One-Machines-Printers-All-in-Ones\/cat_DP1607/,/\.staples\.com\/All-in-One-Printers\/cat_CL161518/,/\.staples\.com\/All-in-One-Printers-Printers-All-in-Ones\/cat_DP1607/,/\.staples\.com\/All-Printers\/brandedcat_CL167883_Photo_31225/,/\.staples\.com\/All-Printers\/cat_CL167883/,/\.staples\.com\/Black-White-Laser-All-in-One-Printers-All-in-One-Printers\/cat_CL141778/,/\.staples\.com\/Black-White-Laser-All-in-One-Printers-Office-machines-supplies\/cat_CL141778/,/\.staples\.com\/Business-Laser-Printers-Business-Printers\/cat_CL166161/,/\.staples\.com\/Business-Printers-Business-Printers\/cat_DP4702/,/\.staples\.com\/B-W-Laser-Printers\/cat_CL142045/,/\.staples\.com\/B-W-Laser-Printers-Laser-Printers\/cat_CL142045/,/\.staples\.com\/cat_SH136_SH136\?d=MzgwJjE1OCZ1cw/,/\.staples\.com\/Color-Laser-All-in-One-Printers-All-in-One-Machines\/cat_CL161518/,/\.staples\.com\/Color-Laser-All-in-One-Printers-All-in-One-Printers\/cat_CL161518/,/\.staples\.com\/Color-Laser-Printers-Laser-Printers\/cat_CL142044/,/\.staples\.com\/Deals_Inkjet-All-in-One-Printers-All-in-One-Machines\/brandedcat_CL40303_Deals_9398/,/\.staples\.com\/Deals-Color-Laser-Printers-Laser-Printers\/brandedcat_CL142044_Deals_9398/,/\.staples\.com\/Dot-Matrix-Printers-Printers-All-in-Ones\/cat_CL40302/,/\.staples\.com\/Home-Printers-Home-Printers\/cat_CG1231/,/\.staples\.com\/Inkjet-Printers\/cat_CL40300/,/\.staples\.com\/office\/supplies\/StaplesCategoryDisplay\?storeId=10001&catalogIdentifier=2&identifier=CL166870/,/\.staples\.com\/Photo-Printers-Printers-All-in-Ones\/cat_CL140780/,/\.staples\.com\/Printers-All-in-Ones\/cat_CG44/,/\.staples\.com\/Printers-All-in-Ones\/cat_SC51CG44_SC51/,/\.staples\.com\/Printers-All-in-Ones-Printers-Shredders-Machines\/cat_CG44/,/\.staples\.com\/Inkjet-Printers-Printers-All-in-Ones\/cat_CL40300/,/\.staples\.com\/Printers-All-in-Ones-Printers-Shredders-Machines\/cat_CG44/,/\.staples\.com\/Laser-l-Inkjet-l-All-in-One-Printers-Printers\/brandedcat_CL167883_Wide-Format_31226/,/\.staples\.com\/Laser-Printers\/brandedcat_CL142044_Laser\+Printers_31228/,/\.staples\.com\/Laser-Printers\/cat_CL142044/,/\.staples\.com\/Laser-Printers\/cat_DP1606/,/\.staples\.com\/Laser-Printers-Printers-All-in-Ones\/cat_DP1606/];if(checkMatchURL(chkList)){var LIVERAMP_CUSTOMER_ID=367158;function pingLiveRamp(gclid){var img=new Image();img.src="//idsync.rlcdn.com/"+LIVERAMP_CUSTOMER_ID+".gif?partner_uid="+gclid;}
var query=window.location.search.substr(1);if(query.length>0){var params=query.split("&");for(var i=0;i<params.length;i++){var pos=params[i].indexOf("=");var name=params[i].substring(0,pos);if(name==="gclid"){var value=params[i].substring(pos+1);pingLiveRamp(value);}}}};}catch(e){Bootstrapper.reportException(e);}});try{Bootstrapper.setCurrentRuleId(15299);var qString=window.location.toString();qmCount=qString.split('?').length-1;if(qmCount>1)
{if(qString.indexOf('?cid')!=-1)
{var newqString=qString.replace('?cid','&cid');window.location.href=newqString;}};}catch(e){Bootstrapper.reportException(e);}Bootstrapper.bindDOMLoaded(function(){try{Bootstrapper.setCurrentRuleId(83739);if(typeof console!='undefined'&&console.log){console.log('Ensighten rule 83739: [prod]Responsys:Utilities');}
$(document).on('mouseup','.nonPurchaseBtn',function(){$.cookie('footerEmailSub','Yes',{path:'/'});});if(typeof $('body#dailydealstemplate')!='undefined'&&$('body#dailydealstemplate').length>0){$('#emaildd').keydown(function(e){if(e.keyCode==13){$.cookie('responsysDDP','Yes',{path:'/'});}});$('.spl-emailSignup .buttonMedium').mouseup(function(e){$.cookie('responsysDDP','Yes',{path:'/'});});}
if($.cookie('EmailOverLay')!=='undefined'){$(document).on('mouseup','.sign_up_link',function(){setCookieValue('responsysEOverlay',$('#email').val(),1);sourceCode='OVR';});$('#email').keydown(function(e){if(e.keyCode==13){setCookieValue('responsysEOverlay',$('#email').val(),1);sourceCode='OVR';}});}
if(document.referrer.length===0&&getCookieValue('CJPIXEL').length===0&&location.href.indexOf('AID=')!=-1&&location.href.indexOf('PID=')!=-1&&location.href.indexOf('SID=')!=-1){setCookieValue('CJPIXEL','Yes',1);}
if(document.referrer.length>0&&document.referrer.indexOf('staples.com')==-1&&getCookieValue('CJPIXEL').length>0){$.cookie('CJPIXEL',null,{path:'/'});};}catch(e){Bootstrapper.reportException(e);}});try{Bootstrapper.setCurrentRuleId(17777);window.s_newFlyoutTrack=function s_newFlyoutTrack(flyoutVal){s.linkTrackVars='prop27';s.linkTrackEvents='none';s.events='';s.prop27=flyoutVal;s.tl(true,'o','Product Flyout Interaction');};;}catch(e){Bootstrapper.reportException(e);}Bootstrapper.bindDOMLoaded(function(){try{Bootstrapper.setCurrentRuleId(18752);if(typeof(s)!='undefined')
{if(s.getQueryParam('noBasket')&&s.getQueryParam('noBasket')=='true')
{if(typeof console!='undefined'&&console.log){console.log('noBasket is present and true');}
var bbSku=s.getQueryParam('SkuID');var bbQty=s.getQueryParam('qty');var bbCookieCheck=bbQty+': '+bbSku;if(!s.c_r('bbCookie')||s.c_r('bbCookie')!==bbCookieCheck&&window.location!==document.referrer)
{if(typeof console!='undefined'&&console.log){console.log(s.c_r('bbCookie'));}
s.c_w('bbCookie',bbCookieCheck,0);if(typeof console!='undefined'&&console.log){console.log(bbCookieCheck);}
$('.item').each(function(index)
{if(typeof console!='undefined'&&console.log){console.log('in SKU eval loop');}
var evalSKU=$(this).text();evalSKU=evalSKU.slice(5);if(typeof console!='undefined'&&console.log){console.log(evalSKU);}
if(evalSKU==bbSku)
{if(typeof console!='undefined'&&console.log){console.log('get price once match is made');}
var bbPrice=$(this).parentsUntil('tr').parent().find('td.qty3 .note').text();var index1=bbPrice.indexOf('at $')+4;var index2=bbPrice.indexOf(' Each',index1);bbPrice=bbPrice.substring(index1,index2);if(typeof console!='undefined'&&console.log){console.log(bbPrice);}
bbPrice=parseFloat(bbQty)*parseFloat(bbPrice);bbPrice=bbPrice.toString();if(typeof console!='undefined'&&console.log){console.log('bbPrice parsed and converted back to string: '+bbPrice);}
s_cartAdd(bbSku,bbPrice,bbQty,'','');}});}else
{if(typeof console!='undefined'&&console.log){console.log('Refresh or Reload: '+s.c_r('bbCookie'));}}}};}catch(e){Bootstrapper.reportException(e);}});Bootstrapper.bindDOMLoaded(function(){try{Bootstrapper.setCurrentRuleId(23447);if(typeof console!='undefined'&&console.log){console.log('Ensighten rule 23447: dotcom global scode C&P Page Code');}
var s_copyandprintSearchFilterTag=function(eventList,eventName){if(s.getQueryParam('q').length>0){if(searchResults===0){s.eVar64='Copy and Print:Null: '+s.getQueryParam('q');}else{s.eVar64='Copy and Print: '+s.getQueryParam('q');}}
s.events=eventList;s.linkTrackEvents=eventList;s.linkTrackVars='eVar64,events';if($.cookie('copyPrintsearchFilter')!==null){var searchFilter=$.cookie('copyPrintsearchFilter');searchFilter=searchFilter.split('--');s.prop7='Copy and Print: '+searchFilter[0];s.prop8=s.prop7+": "+searchFilter[1];s.prop2='Copy and Print: '+searchFilter[2];s.linkTrackVars=s.linkTrackVars+',prop2,prop7,prop8';$.cookie('copyPrintsearchFilter',null,{path:'/'});}
s.tl(true,'o',eventName);s.events='';};window.s_copyandprintSearchFilterTag=s_copyandprintSearchFilterTag;var s_copyandprintSearchPageTag=function(){console.log("Executing Search Results logic");var searchResults=0;if($('#search-header').length>0){searchResults=parseInt($('#search-header').text().match(/\([0-9]+/)[0].replace(/\(/,''),10);}
s.prop2="Copy and Print: "+searchResults;if(s.getQueryParam('q').length>0){if(searchResults===0){s.eVar64='Copy and Print:Null:'+s.getQueryParam('q');}else{s.eVar64='Copy and Print:'+s.getQueryParam('q');}}
s.linkTrackVars='prop2,eVar64';if($.cookie('cpSearchCookie')!==null){s.events='event73';s.linkTrackEvents='event73';s.linkTrackVars+=',events';}
s.tl(true,'o','Copy and Print:Search Results');s.events='';$.cookie('cpSearchCookie',null,{path:'/'});};window.s_copyandprintSearchPageTag=s_copyandprintSearchPageTag;var s_copyandprintSearchPage=function(){var numIterations=1;var cpInterval=setInterval(function(){if($('.nosearchresults_wrap').length>0||$('#sfilters').length>0){s_copyandprintSearchPageTag();clearInterval(cpInterval);console.log("Tracking Search Page success - After "+numIterations+" iterations");}else if(numIterations<50){numIterations++;console.log("Iteration - "+numIterations);}else{clearInterval(cpInterval);s.t();console.log("Search tracking Failed - Search Results not loaded after "+numIterations+" iterations");}},100);};window.s_copyandprintSearchPage=s_copyandprintSearchPage;var s_copyandprintSearchSlot=function(){$(document).on('click','.pic a',function(){var slotNum=$('.pic a').index(this)+1;var pageNum=$('#topPagination li.active').text().trim();if(pageNum.length===0){pageNum=1;}
s.eVar19='Copy and Print:'+slotNum+"x"+pageNum;s.linkTrackVars='eVar19';s.tl(true,'o','Search Slot');});$(document).on('click','.name a',function(){var slotNum=$('.name a').index(this)+1;var pageNum=$('#topPagination li.active').text().trim();if(pageNum.length===0){pageNum=1;}
s.eVar19='Copy and Print:'+slotNum+"x"+pageNum;s.linkTrackVars='eVar19';s.tl(true,'o','Search Slot');});};window.s_copyandprintSearchSlot=s_copyandprintSearchSlot;var searchCookie=function(searchWord){$.cookie('cpSearchCookie',searchWord,{path:'/'});};window.searchCookie=searchCookie;var searchCookieIdentify=function(){$(document).on('keypress','#mainsearchkey',function(e){var code=e.keyCode||e.which;if(code==13&&$('#mainsearchkey').length>0){searchCookie($('#mainsearchkey').val());}});$(document).on('mouseup','#mainsearchgo,.ac_even,.ac_odd',function(){if($('#mainsearchkey').length>0){searchCookie($('#mainsearchkey').val());}});};window.searchCookieIdentify=searchCookieIdentify;searchCookieIdentify();if(location.pathname.indexOf('/sbd/cre/copyandprint/search/search-results.html')!=-1){console.log("C&P Search Results page");s_copyandprintSearchPage();$(document).on('mouseup','#searchFilter .mywidget li',function(){var searchCategory=$(this).parent().siblings('h4.a200').text().trim();var searchItemValue=$(this).find('label').text();var searchItemResults=searchItemValue.match(/\([0-9]+\)/);searchItemResults=searchItemResults[0];searchItemResults=searchItemResults.replace(/\(/,'');searchItemResults=searchItemResults.replace(/\)/,'');var searchFilterValue=searchCategory+"--"+searchItemValue.replace(/\([0-9]+\)/,'').trim()+'--'+searchItemResults;if(!($(this).find('input').attr('checked'))&&searchItemResults!='0'){$.cookie('copyPrintsearchFilter',searchFilterValue,{path:'/'});s_copyandprintSearchFilterTag('event73','Copy and Print:Search Results');}});s_copyandprintSearchSlot();}else{$.cookie('cpSearchCookie',null,{path:'/'});};}catch(e){Bootstrapper.reportException(e);}});Bootstrapper.bindDOMLoaded(function(){try{Bootstrapper.setCurrentRuleId(81688);if(typeof console!='undefined'&&console.log){console.log('Ensighten rule : 81688');}
var ks3={};ks3.cookie={set:function(k,v,e,p,d){var exp=(typeof(e)==="object"?e:new Date((new Date().getTime())+(!e?0:e)*86400000));document.cookie=k+"="+escape(v)+(e!=null?"; expires="+exp.toGMTString():"")+"; path="+(!p?"/":p)+"; "+(d!=null?" domain="+d:"");},get:function(c_name){var i,x,y,ac=document.cookie.split(";");for(i=0;i<ac.length;i++){x=ac[i].substr(0,ac[i].indexOf("="));y=ac[i].substr(ac[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name){return unescape(y);}}
return null;}};function sendDartBeacon(){var iframe_elem=document.createElement("iframe");iframe_elem.setAttribute("src",'//737194.fls.doubleclick.net/activityi;src=737194;type=staples;cat=retur171;ord=1;num='+(Math.floor(Math.random()*99999999999))+'?');iframe_elem.setAttribute("frameborder","0");iframe_elem.setAttribute("scrolling","no");iframe_elem.style.display="none";iframe_elem.setAttribute("width","1");iframe_elem.setAttribute("height","1");document.body.appendChild(iframe_elem);}
if(window.s){if(s.eVar10==="Registered"){var chk=ks3.cookie.get('ks3_uniq1');if(chk){if(chk!==window.location.pathname){ks3.cookie.set('ks3_uniq1',window.location.pathname,null,window.location.pathname,window.location.hostname);sendDartBeacon();}}else{ks3.cookie.set('ks3_uniq1',window.location.pathname,null,window.location.pathname,window.location.hostname);sendDartBeacon();}}};}catch(e){Bootstrapper.reportException(e);}});Bootstrapper.bindDOMLoaded(function(){try{Bootstrapper.setCurrentRuleId(25451);$('span.z_print_selected a').on("click",function()
{$.log('Print Coupon Button Click Multiple');$('span.z_select_coupon input:checked').each(function(index)
{var couponCode=$(this).parentsUntil('div.z_coupon_rwd').parent().find('ul li.z_coupon_code').text();$.log(couponCode);var getCouponCodes=couponCode.split(': ');if(getCouponCodes[1].indexOf('Online')!=-1)
{var pipe1=couponCode.indexOf('code: ')+6;var pipe2=couponCode.indexOf('Online')-1;var coupon1=couponCode.substring(pipe1,pipe2);$.log(coupon1);if(typeof(s)!='undefined')
{s.events='';s.linkTrackVars='eVar13,events';s.linkTrackEvents='event60';s.events='event60';s.eVar13=coupon1;s.tl(true,'o',s.eVar13+' printed');s.events='';s.linkTrackVars='eVar13,events';s.linkTrackEvents='event60';s.events='event60';s.eVar13=getCouponCodes[2];$.log(s.eVar13);s.tl(true,'o',s.eVar13+' printed');}}else
{if(typeof(s)!='undefined')
{s.events='';s.linkTrackVars='eVar13,events';s.linkTrackEvents='event60';s.events='event60';s.eVar13=getCouponCodes[1];s.tl(true,'o',s.eVar13+' printed');s.events='';}}});});$('li.z_coupon_cta a.z_print_this').on("click",function()
{$.log('Print Coupon Button Click 1');var couponCode=$(this).parentsUntil('ul').parent().find('li.z_coupon_code').text();$.log(couponCode);var getCouponCodes=couponCode.split(': ');if(getCouponCodes[1].indexOf('Online')!=-1)
{var pipe1=couponCode.indexOf('code: ')+6;var pipe2=couponCode.indexOf('Online')-1;var coupon1=couponCode.substring(pipe1,pipe2);$.log(coupon1);if(typeof(s)!='undefined')
{s.events='';s.linkTrackVars='eVar13,events';s.linkTrackEvents='event60';s.events='event60';s.eVar13=coupon1;s.tl(true,'o',s.eVar13+' printed');s.events='';s.linkTrackVars='eVar13,events';s.linkTrackEvents='event60';s.events='event60';s.eVar13=getCouponCodes[2];$.log(s.eVar13);s.tl(true,'o',s.eVar13+' printed');}}else
{if(typeof(s)!='undefined')
{s.events='';s.linkTrackVars='eVar13,events';s.linkTrackEvents='event60';s.events='event60';s.eVar13=getCouponCodes[1];s.tl(true,'o',s.eVar13+' printed');s.events='';}}});;}catch(e){Bootstrapper.reportException(e);}});Bootstrapper.bindDOMLoaded(function(){try{Bootstrapper.setCurrentRuleId(25954);if(window.location.href.indexOf("//www.staples.com/office/supplies/login")===-1){if(typeof console!='undefined'&&console.log){console.log('Ensighten rule : 25954');}
(function(){var oiq=document.createElement('script');oiq.type='text/javascript';oiq.async=true;oiq.src=document.location.protocol+'//px.owneriq.net/stas/s/stapl.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(oiq,s);})();$.ajax({url:"//px.owneriq.net/stas/s/stapl.js",dataType:"script",success:function(){oiq_doTag();},fail:function(){if(typeof(s)!='undefined')
{s.linkTrackVars='prop10';s.events='';s.prop10='Owner IQ Pixel Tag Failure';s.tl(true,'o',s.prop10);}},timeout:2500});};}catch(e){Bootstrapper.reportException(e);}});Bootstrapper.bindDOMParsed(function(){try{Bootstrapper.setCurrentRuleId(84933);var lrCheck=typeof $!='undefined'&&typeof $.cookie=='function'?$.cookie('lrcheck'):null;if(!lrCheck){$(window).load(function(){new Image().src="//rc.rlcdn.com/383896.gif?num="+(Math.floor(Math.random()*99999999999));});if(typeof $!='undefined'&&typeof $.cookie=='function'){$.cookie('lrcheck',true,{path:'/'});}};}catch(e){Bootstrapper.reportException(e);}});Bootstrapper.bindDOMParsed(function(){try{Bootstrapper.setCurrentRuleId(81689);var ks3={};ks3.cookie={set:function(k,v,e,p,d){var exp=(typeof(e)==="object"?e:new Date((new Date().getTime())+(!e?0:e)*86400000));document.cookie=k+"="+escape(v)+(e!=null?"; expires="+exp.toGMTString():"")+"; path="+(!p?"/":p)+"; "+(d!=null?" domain="+d:"");},get:function(c_name){var i,x,y,ac=document.cookie.split(";");for(i=0;i<ac.length;i++){x=ac[i].substr(0,ac[i].indexOf("="));y=ac[i].substr(ac[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name){return unescape(y);}}
return null;}};function sendDartBeacon(){var iframe_elem=document.createElement("iframe");iframe_elem.setAttribute("src","//737194.fls.doubleclick.net/activityi;src=737194;type=staples;cat=weekl720;ord=1;num="+(Math.floor(Math.random()*99999999999))+"?");iframe_elem.setAttribute("frameborder","0");iframe_elem.setAttribute("scrolling","no");iframe_elem.style.display="none";iframe_elem.setAttribute("width","1");iframe_elem.setAttribute("height","1");document.body.appendChild(iframe_elem);}
var chk=ks3.cookie.get('ks3_uniqwk');if(!chk){ks3.cookie.set('ks3_uniqwk',"1");sendDartBeacon();};}catch(e){Bootstrapper.reportException(e);}});Bootstrapper.bindDOMLoaded(function(){try{Bootstrapper.setCurrentRuleId(81690);if(typeof console!='undefined'&&console.log){console.log('Ensighten rule : 81690');}
var chk=(window.s&&s.eVar17)?s.eVar17:"";if(!chk){chk=$("script").text().match(/s\.eVar17\=\".*\";/);if(chk){chk=chk[0];chk=chk.replace(/"|'/g,"");chk=chk.replace("s.eVar17=","");}}
if(window.s&&s.pageName==="Search Results:InkPrinter"||window.s&&s.pageName==="Search Results"&&chk&&chk.toLowerCase().indexOf("ink & toner")!==-1){var prods=(window.s&&s.products)?s.products:"";if(!prods){prods=$("script").text().match(/s.products=\";.*\";/);if(prods){prods=prods[0];prods=prods.replace(/"|'/g,"");prods=prods.replace("s.products=","");}}
prods=(prods)?prods:"";var iframe_elem=document.createElement("iframe");iframe_elem.setAttribute("src","//737194.fls.doubleclick.net/activityi;src=737194;type=staples;cat=inkto194;u6="+prods+";ord="+(Math.floor(Math.random()*99999999999))+"?");iframe_elem.setAttribute("frameborder","0");iframe_elem.setAttribute("scrolling","no");iframe_elem.style.display="none";iframe_elem.setAttribute("width","1");iframe_elem.setAttribute("height","1");document.body.appendChild(iframe_elem);};}catch(e){Bootstrapper.reportException(e);}});Bootstrapper.bindDOMLoaded(function(){try{Bootstrapper.setCurrentRuleId(80577);if(location.href.toLowerCase().indexOf('/product_')>-1){if(typeof console!='undefined'&&console.log){console.log('Ensighten rule : 80577');}
var prods=(window.s&&s.products)?s.products:"";if(!prods){prods=$("script").text().match(/s.products=\";.*\";/);if(prods){prods=prods[0];prods=prods.replace(/"|'/g,"");prods=prods.replace("s.products=","");}}
var iframe_elem=document.createElement("iframe");iframe_elem.setAttribute("src","//737194.fls.doubleclick.net/activityi;src=737194;type=staples;cat=produ149;u6="+prods+";ord="+(Math.floor(Math.random()*99999999999))+"?");iframe_elem.setAttribute("frameborder","0");iframe_elem.setAttribute("scrolling","no");iframe_elem.style.display="none";iframe_elem.setAttribute("width","1");iframe_elem.setAttribute("height","1");document.body.appendChild(iframe_elem);};}catch(e){Bootstrapper.reportException(e);}});Bootstrapper.bindDOMLoaded(function(){try{Bootstrapper.setCurrentRuleId(81137);if(typeof console!='undefined'&&console.log){console.log('Ensighten rule : 81137');}
var gfn=function(){window.google_trackConversion({google_conversion_id:1066244916,google_conversion_params:window.google_tag_params||{},google_remarketing_only:true});};if(typeof window.google_trackConversion==="function"){gfn();}else{Bootstrapper.loadScriptCallback("//www.googleadservices.com/pagead/conversion_async.js",function(a){return a;}(gfn));};}catch(e){Bootstrapper.reportException(e);}});Bootstrapper.bindDOMLoaded(function(){try{Bootstrapper.setCurrentRuleId(83934);try{var pagenumber="";var adobeID=(window.s&&s.c_r)?s.c_r("s_vi"):"";adobeID=(adobeID)?adobeID.split("|"):"";adobeID=(adobeID[1])?adobeID[1].replace(/\[.*\]/g,""):"";var siteID="";var e7=(window.s&&s.eVar7)?s.eVar7:"";var e46=(window.s&&s.eVar46)?s.eVar46:"";var e36=(window.s&&s.eVar36)?s.eVar36:"";var p18=(window.s&&s.prop18)?s.prop18:"";var p21=(window.s&&s.prop21)?s.prop21:"";var p24=(window.s&&s.prop24)?s.prop24:"";var p6=(window.s&&s.prop6)?s.prop6:"";var pagename=(window.s&&s.pageName)?s.pageName:"";var evts=(window.s&&s.events)?s.events:"";var prod=(window.s&&s.products)?s.products:"";prod=(prod)?encodeURIComponent(prod):"";var ev24_25=(window.s&&s.eVar24)?s.eVar24:"";ev24_25=(ev24_25&&window.s&&s.eVar25)?(ev24_25+","+s.eVar25):(window.s&&s.eVar25)?s.eVar25:"";var sc="//737194.fls.doubleclick.net/activityi;src=737194;type=staples;cat=stapl887;u2="+pagenumber+";u3="+adobeID+";u4="+e7+";u5="+evts+";u14="+pagename+";u1="+siteID+";u11="+p18+";u10="+e46+";u13="+ev24_25+";u12="+p21+";u7="+p6+";u6="+prod+";u9="+e36+";u8="+p24+";ord="+(Math.floor(Math.random()*99999999999))+"?";var iframe_elem=document.createElement("iframe");iframe_elem.setAttribute("src",sc);iframe_elem.setAttribute("frameborder","0");iframe_elem.setAttribute("scrolling","no");iframe_elem.style.display="none";iframe_elem.setAttribute("width","1");iframe_elem.setAttribute("height","1");document.body.appendChild(iframe_elem);}catch(e){};}catch(e){Bootstrapper.reportException(e);}});Bootstrapper.bindDOMParsed(function(){try{Bootstrapper.setCurrentRuleId(83811);(function(){var tagjs=document.createElement("script");var s=document.getElementsByTagName("script")[0];tagjs.async=true;tagjs.src="//s.btstatic.com/tag.js#site=OrAd7ep";s.parentNode.insertBefore(tagjs,s);}());;}catch(e){Bootstrapper.reportException(e);}});Bootstrapper.bindDOMLoaded(function(){try{Bootstrapper.setCurrentRuleId(84257);(function(){window._fbq=window._fbq||(window._fbq=[]);if(!_fbq.loaded){var fbds=document.createElement('script');fbds.async=true;fbds.src='//connect.facebook.net/en_US/fbds.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(fbds,s);_fbq.loaded=true;}
_fbq.push(['addPixelId',"293162764172480"]);})();window._fbq=window._fbq||[];window._fbq.push(["track","PixelInitialized",{}]);;}catch(e){Bootstrapper.reportException(e);}});try{Bootstrapper.setCurrentRuleId(84900);$(document).ready(function(){var pixelQueue=[];var madeAjaxCall=false;function sendPixel(product,price){if(typeof BrTrk!='undefined'){makePixelRequest(product,price);}else{pixelQueue.push((function(product,price){return function(){makePixelRequest(product,price);};})(product,price));if(!madeAjaxCall){var clsCB=function(){while(pixelQueue.length!=0){var fn=pixelQueue.pop();if(typeof fn=='function'){fn();}}};var br_data=window.br_data={};br_data.acct_id="5073";br_data.is_conversion="0";var url="http://cdn.brcdn.com/v1/br-trk-5073.js";var timeout=1500;if("https:"==document.location.protocol){timeout=3000;url="https://cdns.brsrvr.com/v1/br-trk-5073.js";}
$.ajax({url:url,dataType:"script",cache:true,timeout:timeout,success:clsCB});madeAjaxCall=true;}}}
function makePixelRequest(product,price){if(!!product&&!!price&&$.isNumeric(price)){BrTrk.getTracker().logEvent('Cart','add',{'prod_id':product},{'price':price});}}
var runInterval=function(objFn,fn){var iterations=1;var interval=setInterval(function(){var tmp=objFn();if(typeof tmp!='undefined'&&tmp){clearInterval(interval);fn();}else if(iterations<100){iterations++;}else{clearInterval(interval);}},10);};runInterval(function(){return typeof window.s_cartAdd=='function';},(function(oldCartAdd){return function(){window.s_cartAdd=(function(oldCartAdd){return function(){console.log('in addtocart');if(!!arguments[0]&&!!(arguments[0].trim())&&!!arguments[1]&&!!(arguments[1].trim())&&!!arguments[2]&&!!(arguments[2].trim())){var products=arguments[0].trim().split(':'),revs=arguments[1].trim().split(':'),qtys=arguments[2].trim().split(':'),price=null;$.each(products,function(index,value){var product=value;var rev=revs[index];var qty=qtys[index];try{price=rev/qty;}catch(e){}
sendPixel(product,price);});oldCartAdd.apply(this,arguments);}};})(oldCartAdd);};})(window.s_cartAdd));if('yourcart'==$('body').attr('id')){runInterval(function(){return typeof window.s!='undefined'&&!!window.s.products&&!!window.s.events&&window.s.events.indexOf('scAdd')>-1;},function(){console.log('calling st products['+s.products+']');var items=s.products.split(',');$.each(items,function(index,value){parts=value.split(';');var sku=parts[1];var revqty=!!parts[4]?parts[4].split('|'):[];var rev=!!revqty[0]?revqty[0].substring(7):'na';var qty=!!revqty[1]?revqty[1].substring(7):'na';var price=null;try{price=rev/qty;}catch(e){}
sendPixel(product,price);});});}
runInterval(function(){return typeof window.s_bopisAddToCart=='function';},(function(oldCartAdd){return function(){window.s_bopisAddToCart=(function(oldCartAdd){return function(addToCartObj){console.log('calling bopis add to cart');var product;var addtocartobj=jQuery.parseJSON(addToCartObj);$.each(addtocartobj.items,function(index,value){var product=value.item.sku;var price=value.item.price;sendPixel(product,price);});oldCartAdd.apply(this,arguments);};})(oldCartAdd);};})(window.s_bopisAddToCart));runInterval(function(){return typeof window.boxFinderListener=='function';},(function(oldCartAdd){return function(){window.boxFinderListener=(function(oldCartAdd){return function(){console.log('calling boxfinder');var products;if(event.data.payload.type=="addtocart"&&!!event.data.payload.data.items&&event.data.payload.data.items.length>0){console.log('in boxfinder addtocart');$.each(event.data.payload.data.items,function(index,value){var product=value.sku.match(/[0-9]+/)[0];var price=null;var rev=!!value.rev&&value.rev>0?value.rev:null;var qty=!!value.qty&&value.qty>0?value.qty:null;if(!!qty&&!!rev){try{price=rev/qty;}catch(e){}}
if(!!product&&!!price){sendPixel(product,price);}});}
oldCartAdd.apply(this,arguments);};})(oldCartAdd);};})(window.boxFinderListener));});;}catch(e){Bootstrapper.reportException(e);};