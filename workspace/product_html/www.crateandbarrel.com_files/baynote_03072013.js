function BNLog(){this.timeBase=(new Date).getTime();this.lines=[];this.lastLine="";this.repCount=0}function BNCriticalSectionQueue(){this.waitList={};this.lastId=0}function BNCriticalSection(n){this.csQueue=n;this.debug=1}function BNResourceManager(n){this.csQueue=new BNCriticalSectionQueue;this.critSec=null;this.debug=1;this.resources={};this.waiting={};this.onloadInjected=!1;this.strategy=typeof n!="undefined"?n:Strategy.ScriptDOMInject}function BNSystem(){this.testServer=null}function BNTag(n){n?(this.id=n.id+1,this.server=n.server,this.customerId=n.customerId,this.code=n.code):this.id=0;this.attrs={};this.docAttrs={};this.css={}}function bnReadySignal(){bnResourceManager.registerResource(BN_READY_SIGNAL)}function bnCall(n,t,i){var r=bnResourceManager.getResource(n),u;if(!r){bnResourceManager.waitForResource(n,function(){bnCall(n,t,i)});return}typeof r=="object"&&(u=r[t],typeof u=="function")&&u.call(r,i)}function bnWaitForCustomerStatus(n){if(!bnCheckCustomerStatus()){var t=baynote_tag.getFailsafeResourceId();bnResourceManager.waitForResource(t,function(){bnWaitForCustomerStatus(n)},baynote_tag.getFailsafeResourceAddress(),"img");return}bnResourceManager.runCallback(n)}function bnCheckCustomerStatus(){var n=baynote_tag.getFailsafeResourceId();return bnResourceManager.getResource(n)?!0:!1}var BaynoteJSVersion="$Revision: 3.20 $",BaynoteIgnored=!1,BN_READY_SIGNAL="ReadySignal",Strategy={ScriptDOMInject:2,OnLoadInject:3},baynote_globals,bnLog,bnResourceManager,bnSystem,baynote_tag,BaynoteAPI,preLoadObj,bn_locHref;typeof baynote_globals=="undefined"&&(baynote_globals={});baynote_globals.CommonResourceURL="/baynote/tags3/common";baynote_globals.CommonResourceID="Common";baynote_globals.PolicyResourceID="Policy";baynote_globals.CustomerStatus="/baynote/customerstatus2";baynote_globals.CommonScriptId="commonScriptId";baynote_globals.DefaultInjectStrategy=typeof baynote_inject_strategy!="undefined"?baynote_inject_strategy:Strategy.ScriptDOMInject;baynote_globals.ServerTimeout=typeof baynote_server_timeout!="undefined"?baynote_server_timeout:undefined;baynote_globals.UseWindowName=typeof baynote_use_window_name!="undefined"?baynote_use_window_name:!1;baynote_globals.waitForReady=!1;baynote_globals.checkStatus=!1;baynote_globals.keepTrail=!1;baynote_globals.trailLength=5;bnIsOpera=navigator.userAgent.indexOf("Opera")>=0;bnIsSafari=navigator.userAgent.indexOf("AppleWebKit")>=0;bnIsKonqueror=navigator.userAgent.indexOf("Konqueror")>=0;bnIsKHTML=bnIsSafari||bnIsKonqueror||navigator.userAgent.indexOf("KHTML")>=0;bnIsIE=navigator.userAgent.indexOf("compatible")>=0&&navigator.userAgent.indexOf("MSIE")>=0&&!bnIsOpera;bnIsMozilla=navigator.userAgent.indexOf("Gecko")>=0&&!bnIsKHTML;BNLog.prototype.log=function(n){if(n==this.lastLine){++this.repCount;return}this.repCount>0&&this.lines.push("___ ABOVE REPEATED "+this.repCount+" TIME"+(this.repCount>1?"S":""));this.lastLine=n;this.repCount=0;var t=(new Date).getTime()-this.timeBase;this.lines.push(t+": "+n)};BNLog.prototype.toString=function(){return this.repCount>0&&(this.lines.push("___ ABOVE REPEATED "+this.repCount+" TIME"+(this.repCount>1?"S":"")),this.lastLine="",this.repCount=0),this.lines.join("\n")};typeof bnLog=="undefined"&&(bnLog=new BNLog);BNCriticalSectionQueue.prototype.issueId=function(){return++this.lastId};BNCriticalSectionQueue.prototype.enqueue=function(n,t){this.waitList[n]=t};BNCriticalSectionQueue.prototype.getWaiter=function(n){return n==null?null:this.waitList[n]};BNCriticalSectionQueue.prototype.firstWaiter=function(){return this.getWaiter(this.nextWaiterKeyAfter(null))};BNCriticalSectionQueue.prototype.nextWaiterAfter=function(n){return this.getWaiter(this.nextWaiterKeyAfter(n))};BNCriticalSectionQueue.prototype.nextWaiterKeyAfter=function(n){for(var t in this.waitList)if(typeof this.waitList[t]=="object"){if(n==null)return t;n==t&&(n=null)}return null};BNCriticalSectionQueue.prototype.nextPredecessor=function(n,t){for(var i=t;i!=null;i=this.nextWaiterAfter(i.id))if(i.enter||i.number!=0&&(i.number<n.number||i.number==n.number&&i.id<n.id))return i;return null};BNCriticalSection.prototype.enter=function(n){this.enterFunc=n;this.id=this.csQueue.issueId();this.csQueue.enqueue(this.id,this);this.enter=!0;this.number=(new Date).getTime();this.enter=!1;this.attempt(this.csQueue.firstWaiter())};BNCriticalSection.prototype.leave=function(){this.debug&&bnLog.log("LEAVE "+this.id);this.number=0};BNCriticalSection.prototype.attempt=function(n){var t=this.csQueue.nextPredecessor(this,n),i;if(t!=null)return this.debug&&bnLog.log("WAIT "+this.id),i=this,setTimeout(function(){i.attempt(t)},50);this.debug&&bnLog.log("ENTER "+this.id);this.enterFunc()};BNResourceManager.prototype.getResource=function(n){return this.resources[n]};BNResourceManager.prototype.loadResource=function(n,t,i,r,u){if(typeof this.resources[n]=="undefined"){this.resources[n]=null;var f=new BNCriticalSection(this.csQueue);f.enter(function(){bnResourceManager.inject(n,t,i,f,r,u)})}};BNResourceManager.prototype.inject=function(n,t,i,r,u,f){if(this.critSec=r,this.debug&&bnLog.log("INJECT "+this.critSec.id+" ("+n+")"),typeof i!="undefined"&&i!="script"&&i!="img"){bnLog.log("Unexpected resource type to loadResource: "+i);return}this.defaultInject(n,t,i,u,f)};BNResourceManager.prototype.defaultInject=function(n,t,i,r,u){var e,f,o,h,s;if(!BaynoteIgnored)if(i&&i!="script")i=="img"&&(f=document.createElement("IMG"),o=function(){bnResourceManager.registerAndAddResource(n,f)},f.addEventListener?f.addEventListener("load",o,!1):f.attachEvent?f.attachEvent("onload",o):f.onload=o,f.src=t,f.style.display="none",h=document.getElementsByTagName("body"),s=h[0],setTimeout(function(){s!=null&&s.appendChild(f)},5));else{if(this.strategy==Strategy.OnLoadInject&&(n==baynote_globals.CommonResourceID||n==baynote_globals.PolicyResourceID)&&!this.onloadInjected){e=function(){bnResourceManager.injectHandler(n,t,r,u)};window.addEventListener?window.addEventListener("load",e,!1):window.attachEvent?window.attachEvent("onload",e):window.onload=e;this.onloadInjected=!0;return}this.injectHandler(n,t,r,u)}};BNResourceManager.prototype.injectHandler=function(n,t,i,r,u){if(!this.resources[n]){if(typeof u!="undefined"){u.src="";typeof r=="function"&&r();BaynoteIgnored=!0;bnLog.log("FATAL: Treating Baynote as down. Resource '"+n+"' took more than "+i+" mSec");return}var f=document.createElement("script");setTimeout(function(){var n=document.getElementsByTagName("head");f.language="javascript";f.src=t;n[0].appendChild(f)},50);(i===undefined||i===null)&&(i=baynote_globals.ServerTimeout);typeof i!="undefined"&&setTimeout(function(){bnResourceManager.injectHandler(n,t,i,r,f)},i)}};BNResourceManager.prototype.waitForResource=function(rId,callbackCode,rAddress,rType,timeout,failureFunc){with(this)if(getResource(rId))this.runCallback(callbackCode);else{typeof waiting[rId]=="undefined"&&(waiting[rId]=[]);var waitingList=waiting[rId];waitingList[waitingList.length]=callbackCode;rAddress&&this.loadResource(rId,rAddress,rType,timeout,failureFunc)}};BNResourceManager.prototype.wakeUpWaiting=function(rId){var waitingList,i,codeToEval;with(this){if(waitingList=waiting[rId],!waitingList)return;for(i=0;i<waitingList.length;i++)waitingList[i]&&(codeToEval=waitingList[i],waitingList[i]=null,this.debug&&codeToEval&&bnLog.log("CALLBACK "+rId+": "+codeToEval),this.runCallback(codeToEval))}};BNResourceManager.prototype.registerAndAddResource=function(n,t){this.debug&&bnLog.log("REGISTER "+(this.critSec?this.critSec.id:"")+" ("+n+")");this.resources[n]=t;this.wakeUpWaiting(n);this.critSec&&this.critSec.leave();setTimeout("bnResourceManager.wakeUpWaiting('"+n+"')",5e3)};BNResourceManager.prototype.registerResource=function(n){this.registerAndAddResource(n,!0)};BNResourceManager.prototype.removeResource=function(n){this.resources[n]=null;delete this.resources[n]};BNResourceManager.prototype.runCallback=function(n){typeof n=="string"?eval(n):typeof n=="function"?n():alert("Invalid callback, type="+typeof n)};typeof bnResourceManager=="undefined"&&(bnResourceManager=new BNResourceManager(baynote_globals.DefaultInjectStrategy));BNSystem.prototype.getCookieValue=function(n,t){t||(t=baynote_globals.cookieSubDomain);t&&(n+="-"+t);var i="(?:; )?"+n+"=([^;]*);?",r=new RegExp(i);return r.test(document.cookie)?decodeURIComponent(RegExp.$1):null};BNSystem.prototype.setCookie=function(n,t,i,r,u,f){var e,o;return(t=encodeURIComponent(t),r=="NEVER"?(e=new Date,e.setFullYear(e.getFullYear()+500),r=e.toGMTString()):r=="SESSION"&&(r=""),i!=""&&(i=";Path="+i),r!=""&&(r=";expires="+r),u||(u=baynote_globals.cookieDomain?baynote_globals.cookieDomain:""),u!=""&&(u=";domain="+u),f||(f=baynote_globals.cookieSubDomain),f&&(n+="-"+f),o=n+"="+t+r+i+u,o.length>4096)?!1:(document.cookie=o,!0)};BNSystem.prototype.removeCookie=function(n,t){this.setCookie(n,"","/","Mon, 1 Jan 1990 00:00:00",t)};BNSystem.prototype.getURLParam=function(n,t){var t,r,i;return t||(t=window.location.href),r=new RegExp("[\\?&]"+n+"=([^&#]*)"),i=r.exec(t),i?i[1]:null};BNSystem.prototype.getTestServer=function(){if(this.testServer!=null)return this.testServer;var n=this.getURLParam("bn_test");return n?this.setCookie("bn_test",n,"/","SESSION"):n==""?this.removeCookie("bn_test"):(n=this.getCookieValue("bn_test"),n||(n="")),this.testServer=n,n};typeof bnSystem=="undefined"&&(bnSystem=new BNSystem);BNTag.prototype.getCommonResourceId=function(){return baynote_globals.CommonResourceID};BNTag.prototype.getCommonResourceAddress=function(n){var i="?",t,r,u;for(t in n)t!="server"&&(i+=t+"="+encodeURIComponent(n[t])+"&");return r=i.substring(0,i.length-1),u=this.server+baynote_globals.CommonResourceURL+r,u};BNTag.prototype.getFailsafeResourceId=function(){return"Failsafe"};BNTag.prototype.getFailsafeResourceAddress=function(){var n=BaynoteJSVersion.split(" ")[1],t=bnSystem.getCookieValue("bn_u");return this.server+baynote_globals.CustomerStatus+"?customerId="+this.customerId+"&code="+this.code+"&v="+n+"&u="+t};BNTag.prototype.getParam=function(n,t){var i=this[n];return typeof i=="undefined"||i==null?t:i};typeof baynote_tag=="undefined"&&(window.bn_tags=[],baynote_tag=new BNTag(null));BaynoteAPI={};BaynoteAPI.getURLParam=function(n,t){return bnSystem.getURLParam(n,t)};BaynoteAPI.init=function(n){var t,r,i;if(!n||!n.server||!n.customerId||!n.code){bnLog.log("ERROR: init called with insufficient arguments - needs server, customerId, code");return}n.timeout||(n.timeout=baynote_globals.ServerTimeout);n.onFailure||(n.onFailure=baynote_globals.onFailure);t=bnSystem.getTestServer();t&&(r=new RegExp("^https?://[^/]*\\.baynote\\.(com|net):?\\d*(/.*)?$"),r.test(t)?n.server=t:bnLog.log('Ignoring invalid test server "'+t+'"'));n.server&&(baynote_tag.server=n.server);n.customerId&&(baynote_tag.customerId=n.customerId);n.code&&(baynote_tag.code=n.code);i=baynote_tag.getCommonResourceId();bnResourceManager.getResource(i)?BaynoteIgnored||bnCommon.completePreload(n):bnResourceManager.waitForResource(i,function(){BaynoteAPI.init(n)},baynote_tag.getCommonResourceAddress(n),"script",n.timeout,n.onFailure)};BaynoteAPI.execute=function(n,t){var i=baynote_tag.getCommonResourceId();if(typeof bnResourceManager.getResource(i)=="undefined"){bnLog.log("WARN: common not loaded - exiting execute; consider calling init first");return}if(typeof bnCommon=="undefined"){bnResourceManager.waitForResource(i,function(){BaynoteAPI.execute(n,t)});return}bnCommon.waitAndExecute(n,t)};BaynoteAPI.executeAll=function(n){var t=baynote_tag.getCommonResourceId();if(typeof bnResourceManager.getResource(t)=="undefined"){bnLog.log("WARN: common not loaded - exiting executeAll; consider calling init first");return}if(typeof bnCommon=="undefined"){bnResourceManager.waitForResource(t,function(){BaynoteAPI.executeAll(n)});return}bnCommon.waitAndExecuteAll(n)};BaynoteAPI.call=function(n,t,i,r){var u=baynote_tag.getCommonResourceId();if(typeof bnResourceManager.getResource(u)=="undefined"){bnLog.log("WARN: common not loaded - exiting call; consider calling init first");return}if(typeof bnCommon=="undefined"){bnResourceManager.waitForResource(u,function(){BaynoteAPI.call(n,t,i,r)});return}bnCommon.finishCall(n,t,i,r)};BaynoteAPI.isBaynoteIgnored=function(){return BaynoteIgnored};BaynoteAPI.getCookieDomain=function(){var r=window.location.href,e=r.indexOf("//"),t=r.substring(e+2),u=t.indexOf("/"),n,f,i;return n=u<0?t:t.substring(0,u),f=n.indexOf("."),i=n.substring(f+1),i,i};baynote_globals.cookieDomain=BaynoteAPI.getCookieDomain();preLoadObj={};bn_locHref=window.location.href;preLoadObj.server=bn_locHref.indexOf("https://")==0?"https://crateandbarrel-www.baynote.net":"http://crateandbarrel-www.baynote.net";preLoadObj.customerId="crateandbarrel";preLoadObj.code="www";BaynoteAPI.init(preLoadObj);(typeof baynoteObserver=="undefined"||typeof baynoteObserver!="boolean"||baynoteObserver)&&BaynoteAPI.execute("observer");(typeof baynoteGuide=="undefined"||typeof baynoteGuide!="boolean"||baynoteGuide)&&BaynoteAPI.execute("recommendation");typeof baynoteDisableAjax=="undefined"||typeof baynoteDisableAjax!="boolean"||baynoteDisableAjax||BaynoteAPI.execute("ajax")