if(typeof TeaLeaf==="undefined"){TeaLeaf={};TeaLeaf.Private={};TeaLeaf.tlStartLoad=new Date();if(!TeaLeaf.Configuration){TeaLeaf.Configuration={"tlversion":"2011.07.22.1","tlinit":false,"tlSDK":false,"tlSetGUID":false,"tlGUIDCookie":{name:"TLGUID",valueLength:32,valueSet:"0123456789ABCDEF",path:"",domain:"",expires:0,secure:false},"tlurl":"/tltarget.aspx","tlsecureurl":"/tltarget.aspx","xhrAsync":true,"xhrAsyncOnUnload":false,"tlDisableIfInactive":false,"tlActivityTimeout":5,"xd_CommonDomain":"dell.com","xd_iframeID":"","xd_iframeSrcURL":"","xd_iframeSrcURLSecure":""};}}
if(typeof TeaLeaf!=="undefined"&&((typeof TeaLeaf.replay==="function")?!TeaLeaf.replay():!TeaLeaf.replay)&&TeaLeaf.Configuration&&!TeaLeaf.Configuration.tlinit)
{TeaLeaf.Configuration.tlinit=true;if(!TeaLeaf.tlBrowser){TeaLeaf.tlBrowser={"UNKNOWN":true};}
if(!TeaLeaf.$C){TeaLeaf.$C=function(attr){return attr;};}
if(!Array.prototype.push){Array.prototype.stackEnd=0;Array.prototype.push=function(obj){this[this.stackEnd]=obj;this.stackEnd++;};}
if(!Array.prototype.pop){Array.prototype.pop=function(obj){this.stackEnd--;return this[this.stackEnd];};}
TeaLeaf.XHRFactory=(function(){var isHttpSuccess,MAX_XHR_WAIT_TIME;MAX_XHR_WAIT_TIME=30000;isHttpSuccess=function(statusCode){if((statusCode>=200&&statusCode<300)||statusCode===304)
{return true;}
return false;}
return{"createXHRObject":function(){var i,methods,xhr;methods=[function(){return new XMLHttpRequest();},function(){return new ActiveXObject("Msxml2.XMLHTTP.6.0");},function(){return new ActiveXObject("Microsoft.XMLHTTP");}];for(i=0;i<methods.length;i++){try{xhr=methods[i]();}
catch(e){continue;}
if(xhr){this.createXHRObject=methods[i];return xhr;}}
return null;},"xhrRequest":function(reqMethod,reqUrl,reqHeaders,reqData,reqAsync,callback,xhr){var i,timeoutID;if(!reqMethod||!reqUrl){return null;}
reqMethod=reqMethod.toUpperCase();if(!xhr){xhr=this.createXHRObject();}
if(!xhr){return null;}
if(reqAsync){xhr.onreadystatechange=function(){var status,statusText;try{switch(xhr.readyState){case 0:break;case 1:break;case 2:if(callback&&callback.loaded){try{status=xhr.status;statusText=xhr.statusText;}
catch(e){if(!status){status=0;}
if(!statusText){statusText="None";}}
finally{callback.loaded(status,statusText);}}
break;case 3:break;case 4:if(isHttpSuccess(xhr.status)){if(callback&&callback.success){callback.success(xhr.responseText,xhr.responseXML);}}
else{if(callback&&callback.failure){callback.failure(xhr.status,xhr.statusText);}}
break;default:break;}}catch(e){}};}
xhr.open(reqMethod,reqUrl,reqAsync);if(reqHeaders){for(i=0;i<reqHeaders.length;i++){xhr.setRequestHeader(reqHeaders[i].name,reqHeaders[i].value);}}
if(reqMethod!=="POST"||!reqData){reqData=null;}
if(reqAsync){try{timeoutID=setTimeout(function(){TeaLeaf.XHRFactory.deleteXHRObj(xhr);},MAX_XHR_WAIT_TIME);xhr.timeoutID=timeoutID;}catch(e){}}
xhr.send(reqData);return xhr;},"deleteXHRObj":function(xhr){if(xhr&&xhr.readyState!==4){if(xhr.abort){xhr.abort();}}
if(xhr.timeoutID){clearTimeout(xhr.timeoutID);xhr.timeoutID=null;}
xhr.onreadystatechange=function(){};xhr=null;}};})();TeaLeaf.Request=function(){var data,headers,method,url;data=headers=url=null;method="POST";this.getUrl=function(){var TCfg,tmpPath,tmpUrl,windowLocation,windowProtocol;if(url){return url;}
TCfg=TeaLeaf.Configuration;windowLocation=window.location;windowProtocol=windowLocation.protocol;tmpUrl=windowProtocol+"//"+windowLocation.host;if(windowProtocol=="http:"){tmpPath=TCfg.tlurl;}
else{tmpPath=TCfg.tlsecureurl;}
if(tmpPath.substr(0,1)=="/"){tmpUrl+=tmpPath;}
else{tmpUrl+=windowLocation.pathname.substr(0,windowLocation.pathname.lastIndexOf("/")+1)+tmpPath;}
return tmpUrl;};this.setUrl=function(newUrl){url=newUrl;};this.getMethod=function(){return method;};this.setMethod=function(newMethod){method=newMethod;};this.getData=function(){return data;};this.setData=function(newData){var length;data=newData;if(data){length=TeaLeaf.Request.totalDataLength||0;length+=data.length;TeaLeaf.Request.totalDataLength=length;}};this.getHeaders=function(){return headers;};this.setHeaders=function(newHeaders){headers=newHeaders;};this.clear=function(){data=headers=url=null;};};TeaLeaf.Request.prototype={send:function(callback){var iframeNode,iframeWindow,thatRequest,thatTealeaf,TCfg,xhr;TCfg=TeaLeaf.Configuration;if(!TCfg.xd_iframeID){xhr=TeaLeaf.XHRFactory.xhrRequest(this.getMethod(),this.getUrl(),this.getHeaders(),this.getData(),TCfg.xhrAsync,callback);if(!xhr){if(callback&&callback.failure){callback.failure(0,"XHR request failed!");}
return;}}
else{try{iframeNode=document.getElementById(TCfg.xd_iframeID);if(!iframeNode||!iframeNode.contentWindow){if(callback&&callback.failure){callback.failure(0,"Could not retrive cross-domain iframe target!");}
return;}
iframeWindow=iframeNode.contentWindow;if(iframeWindow.postMessage&&window.JSON&&0){alert("Not implemented!");}
else{thatTealeaf=iframeWindow.TeaLeaf;if(thatTealeaf&&thatTealeaf.Request){thatRequest=new thatTealeaf.Request();thatRequest.clear();this.setUrl(thatRequest.getUrl());thatRequest.setHeaders(this.getHeaders());thatRequest.setData(this.getData());thatRequest.send(callback);}}}
catch(e){if(callback&&callback.failure){callback.failure(0,(e.name?(e.name+": "+e.message):e.toString()));}
return;}}}};TeaLeaf.Request.GetTotalDataLength=function(){var length;length=TeaLeaf.Request.totalDataLength||0;return length;};TeaLeaf.settlSDK=function(){TeaLeaf.Configuration.tlSDK=true;};TeaLeaf.resettlSDK=function(){TeaLeaf.Configuration.tlSDK=false;};TeaLeaf.tlSetPostURL=function(tlvalue){TeaLeaf.Configuration.tlurl=tlvalue;}
TeaLeaf.tlGetPostURL=function(){return TeaLeaf.Configuration.tlurl;}
TeaLeaf.makeRandomString=function(length,inputSet){var i,j,rv;if(!length||length<=0){return;}
if(!inputSet){inputSet="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^+-?";}
rv="";for(i=0;i<length;i++){j=Math.floor(Math.random()*inputSet.length);rv+=inputSet.charAt(j);}
return rv;};TeaLeaf.getNodeType=function(node){var nodeName,nodeType;if(!node){return"";}
nodeName=node.nodeName?node.nodeName.toLowerCase():"";nodeType="";if(nodeName==="input"||nodeName==="object"||nodeName==="script"){nodeType=node.type?node.type.toLowerCase():"";}
return nodeType;}
TeaLeaf.tLoadObjs=[];TeaLeaf.addOnLoad=function(obj,functionName){if(arguments.length===1){TeaLeaf.tLoadObjs.push(obj);}
else if(arguments.length>1){TeaLeaf.tLoadObjs.push(obj[functionName]);}};TeaLeaf.tlSetCookie=function(name,value,expires,path,domain,secure){if(!name){return;}
document.cookie=name+"="+value+
(expires?(";expires="+expires.toUTCString()):"")+";path="+(path?path:"/")+
(domain?(";domain="+domain):"")+
(secure?";secure":"");};TeaLeaf.tlGetCookieValue=function(name){var i,j,c,cookies,value,nameEQ;nameEQ=name+"=";value=null;cookies=document.cookie.split(';');for(i=0;i<cookies.length;i++){c=cookies[i];for(j=0;c.charAt(j)==' ';j++){;}
if(j){c=c.substring(j,c.length);}
if(c.indexOf(nameEQ)===0){value=c.substring(nameEQ.length,c.length);break;}}
return value;};TeaLeaf.tlEraseCookie=function(name){var expires;expires=new Date(1970,1,1);TeaLeaf.tlSetCookie(name,"",expires);};TeaLeaf.tlBrowserIsIE=function(){var TB;TB=TeaLeaf.tlBrowser;if(TB){return!!TB["MSIE"];}
return false;};TeaLeaf.tlBrowserIsMozilla=function(){var TB;TB=TeaLeaf.tlBrowser;if(TB){return!!TB["MOZILLA"];}
return false;};TeaLeaf.tlBrowserIsWebKit=function(){var TB;TB=TeaLeaf.tlBrowser;if(TB){return!!TB["WEBKIT"];}
return false;};TeaLeaf.tlBrowserIsOpera=function(){var TB;TB=TeaLeaf.tlBrowser;if(TB){return!!TB["OPERA"];}
return false;};TeaLeaf.tlBrowserIsUnknown=function(){var TB;TB=TeaLeaf.tlBrowser;if(TB){return!!TB["UNKNOWN"];}
return false;};(function(){var T,TC,TCfg,TE,acTimerID,activityFlag,disabled;T=TeaLeaf;TC=T.Client;TE=T.Event;TCfg=T.Configuration;acTimerID=null;disabled=false,activityFlag=true;T.tlDisable=function(){activityFlag=false;if(TCfg.tlDisableIfInactive&&!disabled){try{TE.tlFlushQueue(true);TC.tlDetachFromAllControls();TeaLeaf.Event.tlRemoveHandler(window,"beforeunload",TeaLeaf.Event.tlBeforeUnload,false);TeaLeaf.Event.tlRemoveHandler(window,"unload",TeaLeaf.Event.tlUnload,false);}
catch(e){}
disabled=true;}};T.activitySinceDisabled=function(){return activityFlag;};T.tlKeepAlive=function(){if(acTimerID){window.clearTimeout(acTimerID);acTimerID=null;}
if(!disabled&&TCfg.tlActivityTimeout){acTimerID=window.setTimeout(function(){T.tlDisable();},(TCfg.tlActivityTimeout*60000));}
if(!activityFlag){activityFlag=true;}};})();TeaLeaf.PageSetup=function(){var i,cValue,expires,iframeNode,iframeSrc,now,T,TCfg,TCfgGUIDCookie,ua;if(document.readyState&&document.readyState!=="complete"){return;}
T=TeaLeaf;TCfg=T.Configuration;TCfgGUIDCookie=TCfg.tlGUIDCookie;if(T.PageSetup.Complete){return;}
T.PageSetup.Complete=true;if(T.PageSetup.Cleanup){T.PageSetup.Cleanup();}
T.tlBrowser["UNKNOWN"]=false;ua=navigator.userAgent.toLowerCase();if(/opera|presto/.test(ua)){T.tlBrowser["OPERA"]=true;}
else if(/(apple)?webkit|safari|chrome/.test(ua)){T.tlBrowser["WEBKIT"]=true;}
else if(/msie|trident/.test(ua)){T.tlBrowser["MSIE"]=true;}
else if(/^(?=.*?\b(mozilla|gecko|firefox)\b)((?!compatible).)*$/.test(ua)){T.tlBrowser["MOZILLA"]=true;}
else{T.tlBrowser["UNKNOWN"]=true;}
if(TCfg.xd_CommonDomain){try{document.domain=TCfg.xd_CommonDomain;}
catch(e){}}
if(TCfg.xd_iframeID){try{iframeNode=document.getElementById(TCfg.xd_iframeID);if(!iframeNode){iframeSrc=((window.location.protocol==="http:")?TCfg.xd_iframeSrcURL:TCfg.xd_iframeSrcURLSecure);if(iframeSrc){iframeNode=document.createElement("IFRAME");if(iframeNode){iframeNode.id=TCfg.xd_iframeID;iframeNode.src=iframeSrc;iframeNode.style.display="none"
iframeNode.style.visibility="hidden";document.body.appendChild(iframeNode);}}}}
catch(e){}}
if(TCfg.tlSetGUID){if(!TCfgGUIDCookie||!TCfgGUIDCookie.name){}
else{if(!TCfgGUIDCookie.valueLength){TCfgGUIDCookie.valueLength=32;}
if(!TCfgGUIDCookie.valueSet){TCfgGUIDCookie.valueSet="0123456789ABCDEF";}
cValue=T.tlGetCookieValue(TCfgGUIDCookie.name);if(!cValue){now=new Date();cValue=T.makeRandomString(TCfgGUIDCookie.valueLength,TCfgGUIDCookie.valueSet);expires=TCfgGUIDCookie.expires?new Date(now.getTime()+TCfgGUIDCookie.expires*60*1000):null;T.tlSetCookie(TCfgGUIDCookie.name,cValue,expires,TCfgGUIDCookie.path,TCfgGUIDCookie.domain,TCfgGUIDCookie.secure);}}}
if(!TCfg.tlSDK){for(i=0;i<T.tLoadObjs.length;i++){T.tLoadObjs[i]();}}
T.EndLoad=new Date();};if(document.readyState==="complete"){TeaLeaf.PageSetup();}
else if(document.addEventListener){document.addEventListener("DOMContentLoaded",TeaLeaf.PageSetup,false);window.addEventListener("load",TeaLeaf.PageSetup,false);TeaLeaf.PageSetup.Cleanup=function(){var T;T=TeaLeaf;document.removeEventListener("DOMContentLoaded",T.PageSetup,false);window.removeEventListener("load",T.PageSetup,false);}}
else if(document.attachEvent){document.attachEvent("onreadystatechange",TeaLeaf.PageSetup);window.attachEvent("onload",TeaLeaf.PageSetup);TeaLeaf.PageSetup.Cleanup=function(){var T;T=TeaLeaf;document.detachEvent("onreadystatechange",T.PageSetup);window.detachEvent("onload",T.PageSetup);}}
else{if(typeof window.onload==="function"){TeaLeaf.OnLoad=window.onload;}
else{TeaLeaf.OnLoad=null;}
window.onload=function(){var T;T=TeaLeaf;T.PageSetup();window.onload=T.OnLoad;if(T.OnLoad){T.OnLoad();}};}}