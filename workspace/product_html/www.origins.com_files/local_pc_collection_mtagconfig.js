var lpMTagConfig={lpServer:"server.iad.liveperson.net",lpNumber:"24631554",lpProtocol:(document.location.toString().indexOf("https:")==0)?"https":"http",lpTagLoaded:false,pageStartTime:(new Date()).getTime(),defaultUnit:"Origins"};if(typeof(lpMTagConfig.lpTagSrv)=="undefined"){lpMTagConfig.lpTagSrv=lpMTagConfig.lpServer}lpMTagConfig.deploymentConfigPath=lpMTagConfig.lpTagSrv+"/visitor/addons/deploy.asp";lpMTagConfig.lpLoadScripts=function(){lpAddMonitorTag(lpMTagConfig.lpProtocol+"://"+lpMTagConfig.deploymentConfigPath+"?site="+lpMTagConfig.lpNumber+"&d_id="+lpMTagConfig.deploymentID)};function lpAddMonitorTag(b){if(!lpMTagConfig.lpTagLoaded){if(typeof(b)=="undefined"||typeof(b)=="object"){if(lpMTagConfig.lpMTagSrc){b=lpMTagConfig.lpMTagSrc}else{if(lpMTagConfig.lpTagSrv){b=lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpTagSrv+"/hcp/html/mTag.js"}else{b="/hcp/html/mTag.js"}}}if(b.indexOf("http")!=0){b=lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpServer+b+"?site="+lpMTagConfig.lpNumber}else{if(b.indexOf("site=")<0){if(b.indexOf("?")<0){b=b+"?"}else{b=b+"&"}b=b+"site="+lpMTagConfig.lpNumber}}var a=document.createElement("script");a.setAttribute("type","text/javascript");a.setAttribute("charset","iso-8859-1");a.setAttribute("src",b);a.setAttribute("id","script_test");document.getElementsByTagName("head").item(0).appendChild(a)}}lpMTagConfig.calculateSentPageTime=function(){var b=(new Date()).getTime()-lpMTagConfig.pageStartTime;lpAddVars("page","pageLoadTime",Math.round(b/1000)+" sec");var a=generic.cookie("LOCALE")||"en_US";var c=(a=="en_US")?"":"OriginsCA";lpAddVars("page","SiteLocale",c)};if(typeof(lpMTagConfig.pageVar)=="undefined"){lpMTagConfig.pageVar=[]}if(typeof(lpMTagConfig.sessionVar)=="undefined"){lpMTagConfig.sessionVar=[]}if(typeof(lpMTagConfig.visitorVar)=="undefined"){lpMTagConfig.visitorVar=[]}if(typeof(lpMTagConfig.onLoadCode)=="undefined"){lpMTagConfig.onLoadCode=[]}if(typeof(lpMTagConfig.dynButton)=="undefined"){lpMTagConfig.dynButton=[]}if(typeof(lpMTagConfig.ifVisitorCode)=="undefined"){lpMTagConfig.ifVisitorCode=[]}function lpAddVars(b,a,c){if(a.indexOf("OrderTotal")!=-1||a.indexOf("OrderNumber")!=-1){if(c==""||c==0){return}else{lpMTagConfig.sendCookies=false}}c=lpTrimSpaces(c.toString());if(a.length>50){a=a.substr(0,50)}if(c.length>50){c=c.substr(0,50)}switch(b){case"page":lpMTagConfig.pageVar[lpMTagConfig.pageVar.length]=escape(a)+"="+escape(c);break;case"session":lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length]=escape(a)+"="+escape(c);break;case"visitor":lpMTagConfig.visitorVar[lpMTagConfig.visitorVar.length]=escape(a)+"="+escape(c);break}}function onloadEMT(){var a=document.cookie;if(lpMTag.lpBrowser=="IE"&&a.length>1000){lpMTagConfig.sendCookies=false}}function lpTrimSpaces(a){return a.replace(/^\s+|\s+$/g,"")}function lpSendData(b,a,c){if(typeof(lpMTag)!="undefined"&&typeof(lpMTag.lpSendData)!="undefined"){lpMTag.lpSendData(b.toUpperCase()+"VAR!"+a+"="+c,true)}}try{if(typeof(lpUnit)=="undefined"){var lpUnit=lpMTagConfig.defaultUnit}lpMTagConfig.deploymentID=lpUnit;if(typeof(lpAddVars)!="undefined"){lpAddVars("page","unit",lpUnit)}lpMTagConfig.defaultInvite="chat-"+lpUnit}catch(e){}lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length]=onloadEMT;lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length]=function(){if(typeof(lpMTagConfig.dynButton)!="undefined"){for(i=0;i<lpMTagConfig.dynButton.length;i++){if(typeof(lpMTagConfig.dynButton[i].pid)!="undefined"&&document.getElementById(lpMTagConfig.dynButton[i].pid)==null){lpMTagConfig.dynButton.splice(i,1);i--}}}};function lpTriggerEvent(d,a,b){var c=b||{};c.lpEventName=a;if(typeof document.fire==="function"){document.fire(d,c)}else{if(typeof jQuery!="undefined"){jQuery(document).trigger(d,[c])}}}function lpEventButtonClicked(a,b){lpTriggerEvent("livechat:button_clicked",a,b)}function lpEventInviteAccepted(a,b){lpTriggerEvent("livechat:invite_accepted",a,b)}function lpEventInviteShown(a,b){lpTriggerEvent("livechat:invite_shown",a,b)}lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length]=function(){lpTriggerEvent("livechat:loaded","",{});lpMTag.events.register("LP_INV_SHOWN",lpEventInviteShown);lpMTag.events.register("LP_INV_ACCEPT",lpEventInviteAccepted);lpMTag.events.register("LP_DYNBUTTON_CLICKED",lpEventButtonClicked);lpMTag.events.register("LP_STATBUTTON_CLICKED",lpEventButtonClicked)};lpMTagConfig.onLoadAll=function(){lpMTagConfig.calculateSentPageTime();lpMTagConfig.lpLoadScripts()};function load_mtagconfig(){if(window.attachEvent){window.attachEvent("onload",lpMTagConfig.onLoadAll)}else{window.addEventListener("load",lpMTagConfig.onLoadAll,false)}}lpMTagConfig.dynButton[lpMTagConfig.dynButton.length]={name:"chat-"+lpUnit,pid:"lpchat",afterStartPage:true};lpMTagConfig.dynButton[lpMTagConfig.dynButton.length]={name:"chat-"+lpUnit+"-product",pid:"lpchatproduct",afterStartPage:true};lpMTagConfig.dynButton[lpMTagConfig.dynButton.length]={name:"chat-"+lpUnit+"-ordertech",pid:"lpchatordertech",afterStartPage:true};var checkOverlayRunning;checkDuplicateOverlay=function(){console.log($$("#lpchatproduct").length);if($$("#lpchatproduct").length>1){$$("#lpchatproduct").each(function(a){console.log(a.innerHTML)})}};document.observe("dom:loaded",function(){$$(".live-chat-overlay-simulate-click").each(function(a){a.observe("click",function(){$$(".live-chat-overlay-button")[0].simulate("click")})})});