var lpMTagConfig={lpServer:"sales.liveperson.net",lpNumber:"20944948",lpProtocol:(document.location.toString().indexOf("https:")==0)?"https":"http",lpTagLoaded:false,pageStartTime:(new Date()).getTime(),defaultUnit:"sales"};
if(typeof(lpMTagConfig.lpTagSrv)=="undefined"){lpMTagConfig.lpTagSrv=lpMTagConfig.lpServer
}lpMTagConfig.deploymentConfigPath=lpMTagConfig.lpTagSrv+"/visitor/addons/deploy.asp";
lpMTagConfig.lpLoadScripts=function(){lpAddMonitorTag(lpMTagConfig.lpProtocol+"://"+lpMTagConfig.deploymentConfigPath+"?site="+lpMTagConfig.lpNumber+"&d_id="+lpMTagConfig.deploymentID)
};
function lpAddMonitorTag(b){if(!lpMTagConfig.lpTagLoaded){if(typeof(b)=="undefined"||typeof(b)=="object"){if(lpMTagConfig.lpMTagSrc){b=lpMTagConfig.lpMTagSrc
}else{if(lpMTagConfig.lpTagSrv){b=lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpTagSrv+"/hcp/html/mTag.js"
}else{b="/hcp/html/mTag.js"
}}}if(b.indexOf("http")!=0){b=lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpServer+b+"?site="+lpMTagConfig.lpNumber
}else{if(b.indexOf("site=")<0){if(b.indexOf("?")<0){b=b+"?"
}else{b=b+"&"
}b=b+"site="+lpMTagConfig.lpNumber
}}var a=document.createElement("script");
a.setAttribute("type","text/javascript");
a.setAttribute("charset","iso-8859-1");
a.setAttribute("src",b);
document.getElementsByTagName("head").item(0).appendChild(a)
}}lpMTagConfig.calculateSentPageTime=function(){var a=(new Date()).getTime()-lpMTagConfig.pageStartTime;
lpAddVars("page","pageLoadTime",Math.round(a/1000)+" sec")
};
if(typeof(lpMTagConfig.pageVar)=="undefined"){lpMTagConfig.pageVar=[]
}if(typeof(lpMTagConfig.sessionVar)=="undefined"){lpMTagConfig.sessionVar=[]
}if(typeof(lpMTagConfig.visitorVar)=="undefined"){lpMTagConfig.visitorVar=[]
}if(typeof(lpMTagConfig.onLoadCode)=="undefined"){lpMTagConfig.onLoadCode=[]
}if(typeof(lpMTagConfig.dynButton)=="undefined"){lpMTagConfig.dynButton=[]
}if(typeof(lpMTagConfig.ifVisitorCode)=="undefined"){lpMTagConfig.ifVisitorCode=[]
}function lpAddVars(b,a,c){if(a.indexOf("OrderTotal")!=-1||a.indexOf("OrderNumber")!=-1){if(c==""||c==0){return
}else{lpMTagConfig.sendCookies=false
}}c=lpTrimSpaces(c.toString());
if(a.length>50){a=a.substr(0,50)
}if(c.length>50){c=c.substr(0,50)
}switch(b){case"page":lpMTagConfig.pageVar[lpMTagConfig.pageVar.length]=escape(a)+"="+escape(c);
break;
case"session":lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length]=escape(a)+"="+escape(c);
break;
case"visitor":lpMTagConfig.visitorVar[lpMTagConfig.visitorVar.length]=escape(a)+"="+escape(c);
break
}}function onloadEMT(){var a=document.cookie;
if(lpMTag.lpBrowser=="IE"&&a.length>1000){lpMTagConfig.sendCookies=false
}}function lpTrimSpaces(a){return a.replace(/^\s+|\s+$/g,"")
}function lpSendData(b,a,c){if(typeof(lpMTag)!="undefined"&&typeof(lpMTag.lpSendData)!="undefined"){lpMTag.lpSendData(b.toUpperCase()+"VAR!"+a+"="+c,true)
}}try{if(typeof(lpUnit)=="undefined"){var lpUnit=lpMTagConfig.defaultUnit
}lpMTagConfig.deploymentID=lpUnit;
if(typeof(lpLanguage)=="undefined"){var lpLanguage="english"
}if(typeof(lpAddVars)!="undefined"){lpAddVars("page","unit",lpUnit)
}if(typeof(lpAddVars)!="undefined"){lpAddVars("page","language",lpLanguage)
}lpMTagConfig.defaultInvite="chat-"+lpUnit+"-"+lpLanguage
}catch(e){}lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length]=onloadEMT;
lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length]=function(){if(typeof(lpMTagConfig.dynButton)!="undefined"){for(i=0;
i<lpMTagConfig.dynButton.length;
i++){if(typeof(lpMTagConfig.dynButton[i].pid)!="undefined"&&document.getElementById(lpMTagConfig.dynButton[i].pid)==null){lpMTagConfig.dynButton.splice(i,1);
i--
}}}};
lpMTagConfig.onLoadAll=function(){lpMTagConfig.calculateSentPageTime();
lpMTagConfig.lpLoadScripts()
};
if(window.attachEvent){window.attachEvent("onload",lpMTagConfig.onLoadAll)
}else{window.addEventListener("load",lpMTagConfig.onLoadAll,false)
}lpMTagConfig.db1=new Object();
lpMTagConfig.db1.busyAction=function(objName){objRef=eval(objName);
var chatWinURL=objRef.getActionURL("Busy");
chatWinURL=chatWinURL.replace(/forceOffline/,"SESSIONVAR%21BusyClickOverride");
window.open(chatWinURL,"chat"+lpMTagConfig.lpNumber,"width=472,height=320,status=0,resizable=0,menubar=no,scrollbars=no,location=no")
};
lpMTagConfig.db1.offlineAction=function(objName){objRef=eval(objName);
var chatWinURL=objRef.getActionURL("Offline");
window.open(chatWinURL,"chat"+lpMTagConfig.lpNumber,"width=472,height=320,status=0,resizable=0,menubar=no,scrollbars=no,location=no")
};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length]={name:"chat-"+lpUnit+"-"+lpLanguage+"-header",pid:"lpchatheader",ovr:"lpMTagConfig.db1"};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length]={name:"chat-"+lpUnit+"-"+lpLanguage+"-footer",pid:"lpchatfooter",ovr:"lpMTagConfig.db1"};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length]={name:"chat-"+lpUnit+"-"+lpLanguage,pid:"lpchat",ovr:"lpMTagConfig.db1"};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length]={name:"chat-"+lpUnit+"-"+lpLanguage+"-alt",pid:"lpchatalt",ovr:"lpMTagConfig.db1"};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length]={name:"chat-"+lpUnit+"-"+lpLanguage+"-product",pid:"lpchatproduct",ovr:"lpMTagConfig.db1"};