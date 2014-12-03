function BNLog(){this.timeBase=(new Date).getTime(),this.lines=new Array,this.lastLine="",this.repCount=0}function BNCriticalSectionQueue(){this.waitList=new Object,this.lastId=0}function BNCriticalSection(a){this.csQueue=a,this.debug=1}function BNResourceManager(a){this.csQueue=new BNCriticalSectionQueue,this.critSec=null,this.debug=1,this.resources=new Object,this.waiting=new Object,this.onloadInjected=!1,this.strategy="undefined"!=typeof a?a:Strategy.ScriptDOMInject}function BNSystem(){this.testServer=null}function BNTag(a){a?(this.id=a.id+1,this.server=a.server,this.customerId=a.customerId,this.code=a.code):this.id=0,this.attrs=new Object,this.docAttrs=new Object,this.css=new Object}function bnReadySignal(){bnResourceManager.registerResource(BN_READY_SIGNAL)}function bnCall(a,b,c){var d=bnResourceManager.getResource(a);if(!d)return void bnResourceManager.waitForResource(a,function(){bnCall(a,b,c)});if("object"==typeof d){var e=d[b];"function"==typeof e&&e.call(d,c)}}function bnWaitForCustomerStatus(a){if(!bnCheckCustomerStatus()){var b=baynote_tag.getFailsafeResourceId();return void bnResourceManager.waitForResource(b,function(){bnWaitForCustomerStatus(a)},baynote_tag.getFailsafeResourceAddress(),"img")}bnResourceManager.runCallback(a)}function bnCheckCustomerStatus(){var a=baynote_tag.getFailsafeResourceId();return bnResourceManager.getResource(a)?!0:!1}var BaynoteJSVersion="Version: V1151-03",BaynoteIgnored=!1,BN_READY_SIGNAL="ReadySignal",Strategy={ScriptDOMInject:2,OnLoadInject:3};if("undefined"==typeof baynote_globals)var baynote_globals=new Object;if(baynote_globals.CommonResourceURL="/baynote/tags3/common",baynote_globals.CommonResourceID="Common",baynote_globals.PolicyResourceID="Policy",baynote_globals.CustomerStatus="/baynote/customerstatus2",baynote_globals.CommonScriptId="commonScriptId",baynote_globals.DefaultInjectStrategy="undefined"!=typeof baynote_inject_strategy?baynote_inject_strategy:Strategy.ScriptDOMInject,baynote_globals.ServerTimeout="undefined"!=typeof baynote_server_timeout?baynote_server_timeout:void 0,baynote_globals.UseWindowName="undefined"!=typeof baynote_use_window_name?baynote_use_window_name:!1,baynote_globals.waitForReady=!1,baynote_globals.checkStatus=!1,baynote_globals.keepTrail=!1,baynote_globals.trailLength=5,bnIsOpera=navigator.userAgent.indexOf("Opera")>=0,bnIsSafari=navigator.userAgent.indexOf("AppleWebKit")>=0,bnIsKonqueror=navigator.userAgent.indexOf("Konqueror")>=0,bnIsKHTML=bnIsSafari||bnIsKonqueror||navigator.userAgent.indexOf("KHTML")>=0,bnIsIE=navigator.userAgent.indexOf("compatible")>=0&&navigator.userAgent.indexOf("MSIE")>=0&&!bnIsOpera,bnIsMozilla=navigator.userAgent.indexOf("Gecko")>=0&&!bnIsKHTML,BNLog.prototype.log=function(a){if(a==this.lastLine)return void++this.repCount;this.repCount>0&&this.lines.push("___ ABOVE REPEATED "+this.repCount+" TIME"+(this.repCount>1?"S":"")),this.lastLine=a,this.repCount=0;var b=(new Date).getTime()-this.timeBase;this.lines.push(b+": "+a)},BNLog.prototype.toString=function(){return this.repCount>0&&(this.lines.push("___ ABOVE REPEATED "+this.repCount+" TIME"+(this.repCount>1?"S":"")),this.lastLine="",this.repCount=0),this.lines.join("\n")},"undefined"==typeof bnLog)var bnLog=new BNLog;if(BNCriticalSectionQueue.prototype.issueId=function(){return++this.lastId},BNCriticalSectionQueue.prototype.enqueue=function(a,b){this.waitList[a]=b},BNCriticalSectionQueue.prototype.getWaiter=function(a){return null==a?null:this.waitList[a]},BNCriticalSectionQueue.prototype.firstWaiter=function(){return this.getWaiter(this.nextWaiterKeyAfter(null))},BNCriticalSectionQueue.prototype.nextWaiterAfter=function(a){return this.getWaiter(this.nextWaiterKeyAfter(a))},BNCriticalSectionQueue.prototype.nextWaiterKeyAfter=function(a){for(var b in this.waitList)if("object"==typeof this.waitList[b]){if(null==a)return b;a==b&&(a=null)}return null},BNCriticalSectionQueue.prototype.nextPredecessor=function(a,b){for(var c=b;null!=c;c=this.nextWaiterAfter(c.id))if(c.enter||0!=c.number&&(c.number<a.number||c.number==a.number&&c.id<a.id))return c;return null},BNCriticalSection.prototype.enter=function(a){this.enterFunc=a,this.id=this.csQueue.issueId(),this.csQueue.enqueue(this.id,this),this.enter=!0,this.number=(new Date).getTime(),this.enter=!1,this.attempt(this.csQueue.firstWaiter())},BNCriticalSection.prototype.leave=function(){this.debug&&bnLog.log("LEAVE "+this.id),this.number=0},BNCriticalSection.prototype.attempt=function(a){var b=this.csQueue.nextPredecessor(this,a);if(null!=b){this.debug&&bnLog.log("WAIT "+this.id);var c=this;return setTimeout(function(){c.attempt(b)},50)}this.debug&&bnLog.log("ENTER "+this.id),this.enterFunc()},BNResourceManager.prototype.getResource=function(a){return this.resources[a]},BNResourceManager.prototype.loadResource=function(a,b,c,d,e){if("undefined"==typeof this.resources[a]){this.resources[a]=null;var f=new BNCriticalSection(this.csQueue);f.enter(function(){bnResourceManager.inject(a,b,c,f,d,e)})}},BNResourceManager.prototype.inject=function(a,b,c,d,e,f){return this.critSec=d,this.debug&&bnLog.log("INJECT "+this.critSec.id+" ("+a+")"),"undefined"!=typeof c&&"script"!=c&&"img"!=c?void bnLog.log("Unexpected resource type to loadResource: "+c):void this.defaultInject(a,b,c,e,f)},BNResourceManager.prototype.defaultInject=function(a,b,c,d,e){if(!BaynoteIgnored)if(c&&"script"!=c){if("img"==c){var f=document.createElement("IMG"),g=function(){bnResourceManager.registerAndAddResource(a,f)};f.addEventListener?f.addEventListener("load",g,!1):f.attachEvent?f.attachEvent("onload",g):f.onload=g,f.src=b,f.style.display="none";var h=document.getElementsByTagName("body"),i=h[0];setTimeout(function(){null!=i&&i.appendChild(f)},5)}}else{if(this.strategy==Strategy.OnLoadInject&&(a==baynote_globals.CommonResourceID||a==baynote_globals.PolicyResourceID)&&!this.onloadInjected){var j=function(){bnResourceManager.injectHandler(a,b,d,e)};return window.addEventListener?window.addEventListener("load",j,!1):window.attachEvent?window.attachEvent("onload",j):window.onload=j,void(this.onloadInjected=!0)}this.injectHandler(a,b,d,e)}},BNResourceManager.prototype.injectHandler=function(a,b,c,d,e){if(!this.resources[a]){if("undefined"!=typeof e)return e.src="","function"==typeof d&&d(),BaynoteIgnored=!0,void bnLog.log("FATAL: Treating Baynote as down. Resource '"+a+"' took more than "+c+" mSec");var f=document.createElement("script");setTimeout(function(){var a=document.getElementsByTagName("head");f.language="javascript",f.src=b,a[0].appendChild(f)},50),(void 0===c||null===c)&&(c=baynote_globals.ServerTimeout),"undefined"!=typeof c&&setTimeout(function(){bnResourceManager.injectHandler(a,b,c,d,f)},c)}},BNResourceManager.prototype.waitForResource=function(rId,callbackCode,rAddress,rType,timeout,failureFunc){with(this)if(getResource(rId))this.runCallback(callbackCode);else{"undefined"==typeof waiting[rId]&&(waiting[rId]=new Array);var waitingList=waiting[rId];waitingList[waitingList.length]=callbackCode,rAddress&&this.loadResource(rId,rAddress,rType,timeout,failureFunc)}},BNResourceManager.prototype.wakeUpWaiting=function(rId){with(this){var waitingList=waiting[rId];if(!waitingList)return;for(var i=0;i<waitingList.length;i++)if(waitingList[i]){var codeToEval=waitingList[i];waitingList[i]=null,this.debug&&codeToEval&&bnLog.log("CALLBACK "+rId+": "+codeToEval),this.runCallback(codeToEval)}}},BNResourceManager.prototype.registerAndAddResource=function(a,b){this.debug&&bnLog.log("REGISTER "+(this.critSec?this.critSec.id:"")+" ("+a+")"),this.resources[a]=b,this.wakeUpWaiting(a),this.critSec&&this.critSec.leave(),setTimeout("bnResourceManager.wakeUpWaiting('"+a+"')",5e3)},BNResourceManager.prototype.registerResource=function(a){this.registerAndAddResource(a,!0)},BNResourceManager.prototype.removeResource=function(a){this.resources[a]=null,delete this.resources[a]},BNResourceManager.prototype.runCallback=function(a){"function"==typeof a?a():alert("Invalid callback, type="+typeof a)},"undefined"==typeof bnResourceManager)var bnResourceManager=new BNResourceManager(baynote_globals.DefaultInjectStrategy);if(BNSystem.prototype.getCookieValue=function(a,b){b||(b=baynote_globals.cookieSubDomain),b&&(a+="-"+b);var c="(?:; )?"+a+"=([^;]*);?",d=new RegExp(c);return d.test(document.cookie)?decodeURIComponent(RegExp.$1):null},BNSystem.prototype.setCookie=function(a,b,c,d,e,f){if(b=encodeURIComponent(b),"NEVER"==d){var g=new Date;g.setFullYear(g.getFullYear()+500),d=g.toGMTString()}else"SESSION"==d&&(d="");""!=c&&(c=";Path="+c),""!=d&&(d=";expires="+d),e||(e=baynote_globals.cookieDomain?baynote_globals.cookieDomain:""),""!=e&&(e=";domain="+e),f||(f=baynote_globals.cookieSubDomain),f&&(a+="-"+f);var h=a+"="+b+d+c+e;return h.length>4096?!1:(document.cookie=h,!0)},BNSystem.prototype.removeCookie=function(a,b){this.setCookie(a,"","/","Mon, 1 Jan 1990 00:00:00",b)},BNSystem.prototype.getURLParam=function(a,b){if(!b)var b=window.location.href;var c=new RegExp("[\\?&]"+a+"=([^&#]*)"),d=c.exec(b);return d?d[1]:null},BNSystem.prototype.getTestServer=function(){if(null!=this.testServer)return this.testServer;var a=this.getCookieValue("bn_test");return a||(a=""),this.testServer=a,a},"undefined"==typeof bnSystem)var bnSystem=new BNSystem;if(BNTag.prototype.getCommonResourceId=function(){return baynote_globals.CommonResourceID},BNTag.prototype.getCommonResourceAddress=function(a){var b="?";for(var c in a)"server"!=c&&(b+=c+"="+encodeURIComponent(a[c])+"&");var d=b.substring(0,b.length-1),e=this.server+baynote_globals.CommonResourceURL+d;return e},BNTag.prototype.getFailsafeResourceId=function(){return"Failsafe"},BNTag.prototype.getFailsafeResourceAddress=function(){var a=BaynoteJSVersion.split(" ")[1],b=bnSystem.getCookieValue("bn_u");return this.server+baynote_globals.CustomerStatus+"?customerId="+this.customerId+"&code="+this.code+"&v="+a+"&u="+b},BNTag.prototype.getParam=function(a,b){var c=this[a];return"undefined"==typeof c||null==c?b:c},"undefined"==typeof baynote_tag){window.bn_tags=new Array;var baynote_tag=new BNTag(null)}var BaynoteAPI={};BaynoteAPI.getURLParam=function(a,b){return bnSystem.getURLParam(a,b)},BaynoteAPI.init=function(a){if(!(a&&a.server&&a.customerId&&a.code))return void bnLog.log("ERROR: init called with insufficient arguments - needs server, customerId, code");a.timeout||(a.timeout=baynote_globals.ServerTimeout),a.onFailure||(a.onFailure=baynote_globals.onFailure);var b=bnSystem.getTestServer();if(b){var c=new RegExp("^https?://[^/]*\\.baynote\\.(com|net):?\\d*(/.*)?$");c.test(b)?a.server=b:bnLog.log('Ignoring invalid test server "'+b+'"')}a.server&&(baynote_tag.server=a.server),a.customerId&&(baynote_tag.customerId=a.customerId),a.code&&(baynote_tag.code=a.code);var d=baynote_tag.getCommonResourceId();bnResourceManager.getResource(d)?BaynoteIgnored||bnCommon.completePreload(a):bnResourceManager.waitForResource(d,function(){BaynoteAPI.init(a)},baynote_tag.getCommonResourceAddress(a),"script",a.timeout,a.onFailure)},BaynoteAPI.execute=function(a,b){var c=baynote_tag.getCommonResourceId();return"undefined"==typeof bnResourceManager.getResource(c)?void bnLog.log("WARN: common not loaded - exiting execute; consider calling init first"):"undefined"==typeof bnCommon?void bnResourceManager.waitForResource(c,function(){BaynoteAPI.execute(a,b)}):void bnCommon.waitAndExecute(a,b)},BaynoteAPI.executeAll=function(a){var b=baynote_tag.getCommonResourceId();return"undefined"==typeof bnResourceManager.getResource(b)?void bnLog.log("WARN: common not loaded - exiting executeAll; consider calling init first"):"undefined"==typeof bnCommon?void bnResourceManager.waitForResource(b,function(){BaynoteAPI.executeAll(a)}):void bnCommon.waitAndExecuteAll(a)},BaynoteAPI.call=function(a,b,c,d){var e=baynote_tag.getCommonResourceId();return"undefined"==typeof bnResourceManager.getResource(e)?void bnLog.log("WARN: common not loaded - exiting call; consider calling init first"):"undefined"==typeof bnCommon?void bnResourceManager.waitForResource(e,function(){BaynoteAPI.call(a,b,c,d)}):void bnCommon.finishCall(a,b,c,d)},BaynoteAPI.isBaynoteIgnored=function(){return BaynoteIgnored},BaynoteAPI.getCookieDomain=function(){var a="",b=window.location.href,c=b.indexOf("//"),d=b.substring(c+2),e=d.indexOf("/");if(0>e)var f=d;else var f=d.substring(0,e);var g=f.indexOf("."),h=f.substring(g+1);return a=h},baynote_globals.cookieDomain=BaynoteAPI.getCookieDomain();var preLoadObj={},bn_locHref=window.location.href;preLoadObj.server=0==bn_locHref.indexOf("https://")?"https://oakley-www.baynote.net":"http://oakley-www.baynote.net",preLoadObj.customerId="oakley",preLoadObj.code="www",BaynoteAPI.init(preLoadObj),("undefined"==typeof baynoteObserver||"boolean"!=typeof baynoteObserver||baynoteObserver)&&BaynoteAPI.execute("observer"),("undefined"==typeof baynoteGuide||"boolean"!=typeof baynoteGuide||baynoteGuide)&&BaynoteAPI.execute("recommendation"),"undefined"==typeof baynoteDisableAjax||"boolean"!=typeof baynoteDisableAjax||baynoteDisableAjax||BaynoteAPI.execute("ajax");