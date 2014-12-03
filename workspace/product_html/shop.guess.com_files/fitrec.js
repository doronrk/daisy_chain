(function(){var a;
TFCApp={getRunMode:function(){return a
},RunModes:{dev:1,test:2,staging:3,prod:4},Constants:{RequestParameter:{UserCookie:"userCookie",Gender:"gender",Category:"category",IPS:"ips",FirstName:"firstName",OrderId:"orderid",DetailStyleId:"detailstyleid",StyleId:"styleid",StoreEmbedded:"storeEmbedded",Placement:"placement",ServiceMode:"serviceMode",UserId:"userid",DeviceType:"deviceType",MailboxId:"mailboxId",Locale:"locale",StoreRegistered:"storeRegistered",OriginWidget:"originWidget",Container:"container",SaveProfilePrompt:"saveProfilePrompt",SessionParams:"sessionParams",SessionParamOverrides:"sessionParamOverrides"},CookieName:{UserCookie:"_tfcUserCookie",MailboxId:"_tfcMailboxId",UserVisit:"tfcUserVisit",UserSettings:"tfcUserSettings"},DeviceType:{Mobile:"mobile",Desktop:"desktop"},IPS:{FitDetails:"fitdetails"},Container:{AccountWindow:"accountwindow",Tip:"tip"},Message:{Open:"open",Close:"close",Update:"update",Complete:"complete",PageLoad:"pageload",Cookie:"cookie",SessionParams:"sessionparams",SessionParamsMaxAge:"sessionparamsmaxage",LogOut:"logout",Resize:"resize",Estimate:"estimate",Refresh:"refresh",TrackVisit:"trackvisit",Register:"register"}},analytics:{},component:{},tips:{},utility:{}};
a=(TFCApp.RunModes.prod||TFCApp.RunModes.dev)
})();
var tfc={},tfc_loadIeCssWorkaround=function(a){var b=document.getElementsByTagName("style")[0]||(function(){var c=document.createElement("style");
c.type="text/css";
document.getElementsByTagName("head")[0].appendChild(c);
return c
})();
if(b.styleSheet){b.styleSheet.cssText=b.styleSheet.cssText+a
}else{b.textContent=b.textContent+a
}};
(function(e){var g="text/css",j="text/javascript",m="link",h="script";
var i=function(o,n){return(("https:"===document.location.protocol)?n:o)
};
var c=function(p,t,u,o,r){if(document.createStyleSheet&&t===g){document.createStyleSheet(o)
}else{var n=document.getElementById(u);
if(typeof n!=="undefined"&&n!==null){n.parentNode.removeChild(n)
}n=document.createElement(p);
n.id=u;
n.type=t;
if(r){n.onload=r
}if(t===g){n.rel="stylesheet";
n.href=o
}else{if(t===j){n.async=true;
n.src=o
}}var q=document.getElementsByTagName("script")[0];
q.parentNode.insertBefore(n,q)
}};
var f=function(o,n){if(typeof o==="undefined"){throw n
}return o
};
function b(){var r=document.getElementsByTagName("script"),t,s="",o,n,q,p={};
for(o=0;
o<r.length;
++o){t=r[o].src;
if(/fitrec(-[^\.]+)?\.js/.test(t)){s=t;
break
}}n=(s.split("?",2)[1]||"").split("&");
for(o=0;
o<n.length;
++o){q=n[o].split("=",2);
if(q.length===2){p[q[0]]=q[1]
}}return p
}function a(r,q){var p=0,o;
function n(){if(++p>=q){return
}if(!r()){o=setTimeout(n,100*(1<<(p-1)))
}}n()
}function d(n){a(function(){if(!window.jQuery){return false
}n();
return true
},15)
}function l(n){a(function(){if(tfc===e){return false
}n();
return true
},15)
}e.event=function(p,n,o){if(typeof o==="function"){k.push({name:p,event:n,callback:o})
}};
var k=[];
e.calculate=function(){};
TFCApp.Manager=function(o){var w=TFCApp.Constants,q=w.RequestParameter,n=w.DeviceType;
f(o,"Context is undefined.");
var t=f(o.configurationURI,"Context configuration URI is undefined."),s=f(o.configurationSecureURI,"Context secure configuration URI is undefined."),v=f(o.storeKey,"Context store unique key is undefined."),p=i(t,s),r=p+"/fitconfig?callback=tfcManager.processConfiguration&storeId="+v+"&c="+(new Date()).getTime(),u=b();
if(o.serviceMode){r=r+"&"+q.ServiceMode+"="+o.serviceMode
}if(u.deviceType){r+="&"+q.DeviceType+"="+u.deviceType
}c(h,j,"tfc-fitrec-config",r);
this.processConfiguration=function(x){if(typeof o.serviceMode!=="undefined"){x.serviceMode=o.serviceMode
}var E=this.configuration=x,G=f(E.cdnURI,"Config. CDN URI is undefined."),D=f(E.cdnSecureURI,"Config. CDN secure URI is undefined."),R=f(E.jQueryURI,"Config jQuery URI is undefined"),P=f(E.jQuerySecureURI,"Config jQuery secure URI is undefined"),A=f(E.storeProductId,"Config. store product id is undefined."),N=f(E.storeVersion,"Config. store version is undefined."),z=f(E.uxProductId,"Config. ux product id is undefined."),F=f(E.uxVersion,"Config. ux version is undefined."),Q=f(E.storeLoadsJquery,"Config store loads jQuery flag is undefined."),K=f(E.ieCssWorkaround,"Config IE CSS workaround is undefined."),y="/resources/store/"+v+"/css/fitrec"+(E.widgetDeviceType===n.Mobile?"-mobile":"")+".css",C="/resources/store/"+v+"/js/",B="/resources/fitrec/js/application.js";
f(E.profileURI,"Config. profile URI is undefined.");
f(E.serviceURI,"Config. service URI is undefined.");
f(E.serviceSecureURI,"Config. service secure URI is undefined.");
var L=((N===""||A==="")?"":"/"+A+"/"+N),H=i(G+L+y,D+L+y),M=i(G+L+C+"fitrec-css.js",D+L+C+"fitrec-css-s.js");
if(K&&E.widgetDeviceType===n.Desktop){c(h,j,"tfc-fitrec-css-js",M)
}else{c(m,g,"tfc-fitrec-css",H)
}var J=((F===""||z==="")?"":"/"+z+"/"+F),O=i(G+J+B,D+J+B);
function I(){c(h,j,"tfc-fitrec-library",O);
l(function(){var S,T;
for(S=0;
S<k.length;
S++){T=k[S];
tfc.event(T.name,T.event,T.callback)
}})
}if(Q){d(function(){window.tfcJQuery=jQuery;
I()
})
}else{c(h,j,"tfc-jquery-library",i(R,P),function(){window.tfcJQuery=jQuery.noConflict(true);
I()
})
}}
}
})(tfc);
tfcManager=new TFCApp.Manager({configurationURI:"http://fitrec.truefitcorp.com",configurationSecureURI:"https://consumer.truefitcorp.com",storeKey:"gus"});
