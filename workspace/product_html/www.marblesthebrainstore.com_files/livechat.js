var comm100_server='https://chatserver.comm100.com';var Comm100API=Comm100API||{loaded:!1};
(function(g){function u(){for(var a=[],b={},d=g.chat_buttons.length-1;0<=d;d--){var c=g.chat_buttons[d].code_plan;b[c]||(a.push(c),b[c]=1)}b[g.main_code_plan]||a.push(c);return a.join("_")}function y(){B([["action",c.actionType.pageVisit],["flash",c.getFlashVersion()],["res",c.getScrResolution()],["timezone",c.getTimezoneOffset()],["planIds",u()],["title",c.getTruncatedTitle()],["url",h.location],["referer",h.referrer]])}function v(a,b,d,e,f,R,m,l,k,r,J){1==M?(k?c.setSessionCookie(c.cookieKey_v6+
g.site_id,a):c.setCookie(c.cookieKey_v6+g.site_id,a),c.setSessionCookie(c.sessionCookieKey+g.site_id,d)):(k?c.setSessionCookie(c.standby_id_cookie_key+g.site_id,a):c.setCookie(c.standby_session_cookie_key+g.site_id,a),c.setSessionCookie(c.standby_session_cookie_key+g.site_id,d));c.setSessionCookie(c.guid_cookie_key+g.site_id,b);p.id=a;p.session=d;p.guid=b;if((a=g.chat_buttons)&&0!=a.length&&m&&0!=m.length){b={};for(d=m.length-1;0<=d;d--){var n=m[d];b[n.code_plan]=n}d=0;for(m=a.length;d<m;d++)if(k=
a[d],n=b[k.code_plan]){for(var s in n)k[s]=n[s];switch(k.t){case 0:var n=k,w=q(n.div_id);if(w){var ba=n.o?c.get_image_url(g.site_id,n.a):c.get_image_url(g.site_id,n.b);w.innerHTML='<a href="#" onclick="Comm100API.open_chat_window(event, '+n.code_plan+');"><img id="'+n.div_id+'img" src="'+ba+'" style="border:none;" alt=""/></a>';n.h&&C.ifLastOpened()&&(w=c.parse_query([["planId",n.code_plan],["siteId",g.site_id],["visitorId",p.id],["visitorGuid",p.guid],["pageTitle",c.getTruncatedTitle()],["pageUrl",
h.location],["userId",g.user_id],["r",c.getRandom()]]),C.open(F+"?"+w,n.code_plan))}break;case 1:n=k;if(w=q(n.div_id))w.innerHTML='<a href="#" onclick="Comm100API.open_chat_window(event, '+n.code_plan+');">'+n.c+"</a>",n.h&&C.ifLastOpened()&&(w=c.parse_query([["planId",n.code_plan],["siteId",g.site_id],["visitorId",p.id],["visitorGuid",p.guid],["pageTitle",c.getTruncatedTitle()],["pageUrl",h.location],["userId",g.user_id],["r",c.getRandom()]]),C.open(F+"?"+w,n.code_plan));break;case 3:D(k)}T(k)}}U(r);
z.stop();g.hb_offline=f;A();z.start(e||[{t:1,d:30}],V);R&&z.stop(R);!l||0==l.length||g.find_custom_vaiables(l);K.enable(J)}function A(){for(var a=g.chat_buttons.length-1;0<=a;a--)if(g.chat_buttons[a].o){z.set_interval(0);return}z.set_interval(g.hb_offline)}function D(a){c.hide(a.div_id);c.removeAd();var b=N(a),d=c.createFloatDiv();a.div_id=d.id;if(a.k&&c.mobile){d.style.cssText="position:fixed;left:50%;bottom:0;z-index:2147483637;";b=h.createElement("div");b.id=a.div_id+"-inner";var e;e="cursor:pointer;position:relative;text-align:center;box-shadow: 0 2px 25px rgba(0,0,0,0.2);font-weight:bold;bottom:0;left:-50%;border-radius:5px 5px 0 0;height:44px;line-height:44px;font-size:20px;padding:0 35px;white-space:nowrap;"+
("background-color:"+a.n+";");e+="color:"+a.q;b.style.cssText=e;b.innerHTML=a.o?a.l:a.m;d.appendChild(b);b.onclick=function(b){Comm100API.open_chat_window(b,a.code_plan)}}else d.onclick=function(b){Comm100API.open_chat_window(b,a.code_plan)},d.style.background=c.backgroundImage(b),e=h.createElement("IMG"),e.src=b,c.imageComplete(e,function(b){d.style.visibility="visible";d.style.width=b.w+"px";d.style.height=b.h+"px";c.f.floatIt(d,b,a.p);"opened"==a.h&&c.hide_ele(d);a.h&&C.ifLastOpened()&&(c.hide_ele(d),
b=c.parse_query([["planId",a.code_plan],["siteId",g.site_id],["visitorId",p.id],["pageTitle",c.getTruncatedTitle()],["pageUrl",h.location],["userId",g.user_id],["r",c.getRandom()]]),C.open(F+"?"+b,a.code_plan))})}function L(a){for(var b=g.chat_buttons.length-1;0<=b;b--){var d=g.chat_buttons[b];if(d.code_plan==a)return d}return null}function N(a){return a.o?c.get_image_url(g.site_id,a.a):c.get_image_url(g.site_id,a.b)}function W(a,b,d,e){c.preventDefault(a);b=b||g.main_code_plan;a=L(b);void 0==typeof a||
null==a||a.o||a.e||!a.f?(d=c.parse_query([["planId",b],["siteId",g.site_id],["visitorId",p.id],["visitorGuid",p.guid],["source",d],["autoInvId",e],["pageTitle",c.getTruncatedTitle()],["pageUrl",h.location],["userId",g.user_id],["r",c.getRandom()]]),c.mobile?window.open(X+"?"+d,"comm100_"+g.site_id):a.h?(a.h="opened",3==a.t&&c.hide(a.div_id),C.open(F+"?"+d,b)):c.popupWindow(Y+"?"+d,"comm100_"+g.site_id,a?a.w||540:540,a?a.h||560:560)):a.g?window.open(a.f):window.location.href=a.f;k.hide();V();return!1}
function ca(a){setTimeout(function(){B([["action",c.actionType.showAutoInvite],["invId",a.a]])},1E3*a.b)}function U(a){if(a&&0!=a.length)for(var b=0;b<a.length;b++)ca(a[b])}function V(){callId=B([["action",c.actionType.heartbeat],["planIds",u()]]);x[callId]=!0;da(callId)}function da(a){setTimeout(function(){null!=x[a]?(delete x[a],G++):G=0;4<=G&&O()},5E3)}function T(a){return a.d&&!a.o?(c.hide(a.div_id),c.removeAd(),!0):!1}function ea(a,b){for(var d=a.length-1;0<=d;d--){var e=a[d];var f=L(e.a),e=
e.b;if(f&&f.o!==e&&(f.o=e,!T(f))){if(0==f.t){if(e=q(f.div_id+"img"))e.src=N(f)}else 3==f.t&&(e=q(f.div_id))&&(f.k&&c.mobile?e.firstChild.innerHTML=f.o?f.l:f.m:e.style.background=c.backgroundImage(N(f)));"opened"!=f.h&&c.show(f.div_id)}}A()}function fa(a,b){var d=["action",c.actionType.set_custom_variables],e;if(a&&0!=a.length){e="[";for(var f=0,h=a.length;f<h;f++){0<f&&(e+=",");var g=a[f];e+='{"name":"'+g.name+'","value":"'+g.value+'"}'}e+="]"}else e="[]";B([d,["d",e],["i",b?1:0]])}function ga(){B([["action",
c.actionType.manualInvitationShowed]])}function B(a){p.guid=p.guid||c.getCookie(c.guid_cookie_key+g.site_id);a.unshift(["planId",g.main_code_plan]);a.unshift(["visitorId",p.id]);a.unshift(["siteId",g.site_id]);a.unshift(["visitorGuid",p.guid]);return c.sendRequest(Z,a)}function $(a){M=a;if(0==a)t=comm100_standby_server,p.id=c.getCookie(c.standby_id_cookie_key+g.site_id),p.session=c.getCookie(c.standby_session_cookie_key+g.site_id);else{t=comm100_server;a=c.getCookie(g.site_id);var b=c.getCookie(c.cookieKey_v5+
g.site_id),d=c.getCookie(c.cookieKey_v6+g.site_id);p.id=d?d:b?b:a;p.session=c.getCookie(c.sessionCookieKey+g.site_id)}Z=t+"/livechat.ashx";Y=t+"/chatwindow.aspx";X=t+"/chatwindowmobile.aspx";F=t+"/chatwindowembedded.aspx";z.stop();y()}function ha(a){a!=M&&$(a)}function O(){G=0;var a=c.sendRequest(P,[["action",1],["siteId",g.site_id],["r",(new Date).getTime()]]);x[a]=!0;setTimeout(function(){null!=x[a]&&(delete x[a],$(1))},5E3)}if(!g.loaded)if(g.site_id&&g.main_code_plan){var t=comm100_server||"https://chatserver.comm100.com",
P="";"undefined"!=typeof comm100_standby_server&&(P=comm100_standby_server+"/moderator.aspx");var Z=t+"/livechat.ashx",Y=t+"/chatwindow.aspx",X=t+"/chatwindowmobile.aspx",F=t+"/chatwindowembedded.aspx",M=-1,x={},G=0,p={id:0,session:0,guid:""},h=window.document,q=function(a){return h.getElementById(a)},H=function(){var a,b,d=1,c;return{postMessage:function(a,b,c){b&&(c=c||parent,window.postMessage?c.postMessage(a,b.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):b&&(c.location=b.replace(/#.*$/,"")+"#"+ +new Date+
d++ +"&"+a))},receiveMessage:function(d,g){if(window.postMessage)if(d&&(c=function(a){if("string"===typeof g&&-1==g.indexOf(a.origin)||"[object Function]"===Object.prototype.toString.call(g)&&!1===g(a.origin))return!1;d(a)}),window.addEventListener)window[d?"addEventListener":"removeEventListener"]("message",c,!1);else window[d?"attachEvent":"detachEvent"]("onmessage",c);else a&&clearInterval(a),a=null,d&&(a=setInterval(function(){var a=h.location.hash,c=/^#?\d+&/;a!==b&&c.test(a)&&(b=a,h.location.hash=
"",d({data:a.replace(c,"")}))},100))}}}(),K=function(){var a=!1;return{send:function(b){a&&(window.ga?window.ga("send","event","Comm100 Live Chat",b,b,0):window._gaq&&window._gaq.push(["_trackEvent","Comm100 Live Chat",b,b]))},enable:function(b){a=b}}}(),ia=function(){var a,b,d,e;function f(f){f=f||event;f.stopPropagation&&f.stopPropagation();f.preventDefault&&f.preventDefault();f.cancelBubble=!0;f.returnValue=!1;d=f.clientX;e=f.clientY;a=l.offsetLeft;b=l.offsetTop;f=h.createElement("span");l.appendChild(f);
l.setCapture?(l.onmousemove=g,l.onmouseup=k,l.setCapture()):(h.addEventListener("mousemove",g,!0),h.addEventListener("mouseup",k,!0));c.f.stopFloat(l);c.f.stopFloat(r);n.w=l.style.width;n.h=l.style.height;l.style.width=r.style.width;l.style.height=r.style.height;s=c.f.clientSize();s.w-=q.w;s.h-=q.h}function g(f){var h=f||event;c.ie&&event&&!event.button?k():(f=h.clientX-d+a,h=h.clientY-e+b,0>f&&(f=0),0>h&&(h=0),f>s.w&&(f=s.w),h>s.h&&(h=s.h),l.style.left=f+"px",l.style.top=h+"px",r.style.left=l.style.left,
r.style.top=l.style.top)}function k(){l.releaseCapture?(l.onmousemove=null,l.onmouseup=null,l.releaseCapture()):(h.removeEventListener("mousemove",g,!0),h.removeEventListener("mouseup",k,!0));l.removeChild(l.childNodes[0]);c.f.floatIt(l,p,{l:l.offsetLeft,t:l.offsetTop});c.f.floatIt(r,q,{l:l.offsetLeft,t:l.offsetTop});l.style.width=n.w;l.style.height=n.h}var l,p,r,q,n={};b=a=e=d=0;var s;return{draggable:function(a,b,d,c){null!=a&&(l=a,p=b,l.onmousedown=f,r=d,q=c)}}}(),aa=function(){var a=0,b=!1,d=
h.title,c="";return{flashTitle:function(f){0==a&&(d=h.title,a=setInterval(function(){h.title=""!=c?b?d:c+" - "+d:d;b=!b},1E3));c=f}}}(),c={actionType:{pageVisit:1,heartbeat:2,refuseInvitation:3,showAutoInvite:4,manualInvitationShowed:5,set_custom_variables:7},id:0,getId:function(){return++c.id},getRandom:function(){return Math.round(10*Math.random())},getCookie:function(a){for(var b=h.cookie.split("; "),d=0;d<b.length;d++){var c=b[d].split("=");if(null!=c&&2==c.length&&a==c[0])return c[1]}},getTruncatedTitle:function(){return 256<
h.title?h.title.substring(0,256):h.title},delCookie:function(a){h.cookie=a+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"},setCookie:function(a,b){h.cookie=a+"="+b+";expires=Sat, 01 Jan 10000 00:00:00 GMT"},setSessionCookie:function(a,b){h.cookie=window.ActiveXObject||"ActiveXObject"in window?a+"="+b+";path=/;":a+"="+b+";expires=0;path=/;"},getScrResolution:function(){return screen.width+"x"+screen.height},getTimezoneOffset:function(){return(new Date).getTimezoneOffset()},getFlashVersion:function(){var a=
"0.0.0";if(navigator.plugins&&navigator.mimeTypes.length){var b=navigator.plugins["Shockwave Flash"];b&&b.description&&(a=b.description.replace(/([a-z]|[A-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,"."))}else{try{for(var b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),d=3;null!=b;d++)b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+d),a=d+".0.0"}catch(c){}try{a=b.GetVariable("$version").split(" ")[1].split(",").join(".")}catch(f){}}return a},preventDefault:function(a){if(a=a||window.event)a.preventDefault?
a.preventDefault():a.returnValue=!1},stopPropagation:function(a){a=a||window.event;a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},popupWindow:function(a,b,d,c){try{var f=110;800>screen.height&&(f=50);return window.open(a,b,"height="+c+",width="+d+",left=200,top="+f+",status=yes,toolbar=no,menubar=no,resizable=yes,location=no,titlebar=no")}catch(h){}},sendRequest:function(a,b){var d=c.getId();b=b||[];b.push(["callId",d]);var e=h.createElement("script");e.type="text/javascript";e.src=a+"?"+
c.parse_query(b);e.id="comm100-script-"+d;h.getElementsByTagName("head")[0].appendChild(e);return d},removeRequest:function(a){(a=q("comm100-script-"+a))&&a.parentNode&&a.parentNode.removeChild(a)},px2int:function(a){return""==a?0:parseInt(a.replace(/^(\d+).*?$/,"$1"))},createIframe:function(a,b,d){a=a||0;b=b||"0px";d=d||"0px";var c=h.createElement("IFRAME");c.src="javascript:false";c.style.cssText="display:none;left:0px;top:0px;width:"+b+";height:"+d+";position:absolute;z-index:"+a+";filter:alpha(opacity=0,style=0);";
c.frameborder=0;h.body.insertBefore(c,h.body.firstChild);return c},f:{supportFixed:function(){var a=c.f;if(null!=a.fixed)return a.fixed;if(c.mobile)return a.fixed=!(/Android ([0-9]+)/i.test(navigator.userAgent)&&3>RegExp.$1)&&!/OS [2-4]_\d(_\d)? like Mac OS X/i.test(E),a.fixed;if(h.createElement)try{var b=h.body,d=h.createElement("div");if(d.getBoundingClientRect){d.innerHTML="x";d.style.cssText="position:fixed;top:100px;";b.insertBefore(d,b.firstChild);var e=b.style.height,f=b.scrollTop;b.style.height=
"3000px";b.scrollTop=500;var g=d.getBoundingClientRect().top;b.style.height=e;e=100===g;b.removeChild(d);b.scrollTop=f;return a.fixed=e}}catch(k){}return a.fixed=!1},clientSize:function(){var a=h.compatMode&&"CSS1Compat"===h.compatMode,b=h.documentElement.clientWidth,c=h.documentElement.clientHeight;return{w:a&&b||h.body.clientWidth||b,h:a&&c||h.body.clientHeight||c}},scrollPos:function(){var a=h.body,b=h.documentElement;return{x:a.scrollLeft||b.scrollLeft,y:a.scrollTop||b.scrollTop}},calcPos:function(a,
b){var d=c.f.clientSize(),e;b.l?e=b.l:(e=d.w-a.w,e=null!=b.r?e-b.r:null!=b.pl?e*b.pl*.01:null!=b.pr?e-e*b.pr*.01:0);b.t?d=b.t:(d=d.h-a.h,d=null!=b.b?d-b.b:null!=b.pt?d*b.pt*.01:null!=b.pb?d-d*b.pb*.01:0);0<e&&(e=Math.ceil(e));0<d&&(d=Math.ceil(d));return{x:e,y:d}},setFixPos:function(a,b,c){null!=c.l&&(a.style.left=c.l+"px");null!=c.pl&&(a.style.left=c.pl+"%",a.style.marginLeft=-Math.round(b.w*c.pl*.01)+"px");null!=c.r&&(a.style.right=c.r+"px");null!=c.pr&&(a.style.right=c.pr+"%",a.style.marginRight=
-Math.round(b.w*c.pr*.01)+"px");null!=c.t&&(a.style.top=c.t+"px");null!=c.pt&&(a.style.top=c.pt+"%",a.style.marginTop=-Math.round(b.h*c.pt*.01)+"px");null!=c.b&&(a.style.bottom=c.b+"px");null!=c.pb&&(a.style.bottom=c.pb+"%",a.style.marginBottom=-Math.round(b.h*c.pb*.01)+"px")},getFloat:function(a){for(var b=c.f.floatDivs,d=0;d<b.length;d++)if(a===b[d].div)return b[d]},smoothMove:function(a,b){var c=b-a;return 2>=Math.abs(c)?b:a+.2*c},doFloat:function(){for(var a=c.f,b=a.floatDivs,d=0;d<b.length;d++){var e=
b[d].div,f=a.calcPos(b[d].sz,b[d].option);if(a.fixed)e.style.position="fixed",c.mobile?(a.setFixPos(e,b[d].sz,b[d].option),null!=a.timer&&clearTimeout(a.timer)):(e.style.left=f.x+"px",e.style.top=f.y+"px");else{var h=a.scrollPos();e.style.position="absolute";var g=h.x+f.x,f=h.y+f.y;e.floated?(e.style.left=a.smoothMove(c.px2int(e.style.left),g)+"px",e.style.top=a.smoothMove(c.px2int(e.style.top),f)+"px"):(e.style.left=g+"px",e.style.top=f+"px",e.floated=!0);if(g=b[d].ifr)g.style.left=e.style.left,
g.style.top=e.style.top}}c.mobile||(null!=a.timer&&clearTimeout(a.timer),a.timer=setTimeout(a.doFloat,a.fixed?500:30))},floatDivs:[],floatIt:function(a,b,d){if(a&&d){var e=c.f;e.supportFixed();var f=e.getFloat(a);f?(f.option=d,f.sz&&f.sz.w==b.w&&f.sz.h==b.h||(f.sz=b,f.div.floated=!1)):(f=null,"6.0"==c.ie&&(f=c.createIframe(a.style.zIndex-1,a.style.width,a.style.height),f.style.display=""),e.floatDivs.push({div:a,sz:b,option:d,ifr:f}));e.doFloat()}},stopFloat:function(a){var b=c.f.floatDivs;if(b&&
0<b.length)for(var d=0;d<b.length;d++)if(a===b[d].div){(a=b[d].ifr)&&h.body.removeChild(a);b.splice(d,1);break}}},overlay:{pageSize:function(){var a=h.body,b=h.documentElement;return{w:Math.max(a.scrollWidth,a.offsetWidth,b.clientWidth,b.scrollWidth,b.offsetWidth),h:Math.max(a.scrollHeight,a.offsetHeight,b.clientHeight,b.scrollHeight,b.offsetHeight)}},show:function(a,b){var d=b+"ifr",e=q(d),f=q(b);f||(f=h.createElement("div"),f.id=b,f.style.cssText="position:absolute;left:0px;top:0px;background-color:black;"+
(c.ie?"filter:alpha(opacity=65);opacity:0.65;":"opacity:0.65;-moz-opacity:0.65"),null!=a&&(f.style.zIndex=a),h.body.insertBefore(f,h.body.firstChild));e||"6.0"!=c.ie||(e=c.createIframe(a-1),e.id=d,e.style.display="");f.style.display="";c.overlay.timer=setInterval(function(){var a=c.f.supportFixed();a&&(f.style.position="fixed");var b=c.f.clientSize();f.style.width=b.w+"px";f.style.height=b.h+"px";if(!a){var a=c.overlay.pageSize(),d=a.w<=b.w+21?-21:a.w<=b.w+17?-17:0;"7.0"==c.ie&&"BackCompat"!=h.compatMode&&
(d=0);var g=0;c.ie&&"BackCompat"==h.compatMode&&(g=a.h<=b.h+4?-4:0);f.style.width=a.w+d+"px";f.style.height=a.h+g+"px";e&&(e.style.width=f.style.width,e.style.height=f.style.height)}},500)},hide:function(a){var b=a+"ifr",d=c.overlay;(a=q(a))&&h.body.removeChild(a);(b=q(b))&&h.body.removeChild(b);null!=d.timer&&clearInterval(d.timer)}},imageComplete:function(a,b){function d(a){return"complete"==a.readyState||"loaded"==a.readyState||1==a.complete}function e(){setTimeout(function(){f&&h.body.removeChild(f);
b({w:a.width,h:a.height})},100)}var f;c.ie||null!=a.parentNode||(f=h.createElement("DIV"),f.style.display="none",f.innerHTML="<img src='"+a.src+"'/>",h.body.insertBefore(f,h.body.firstChild),a=f.firstChild);d(a)||null!=a.onload?e():a.onreadystatechange=a.onload=function(){d(a)&&(a.onreadystatechange=a.onload=null,e())}},playSound:function(a){try{var b=h.createElement("embed");b.src=a;b.hidden=!0;b.width=1;b.height=1;b.autostart=!0;b.loop=0;var c;a="application/x-mplayer2";var e=navigator.userAgent.toLowerCase();
navigator.mimeTypes&&(-1==e.indexOf("windows")&&navigator.mimeTypes["audio/mpeg"].enabledPlugin&&(a="audio/mpeg"),-1<e.indexOf("opera")&&(a=null));if(c=a)b.type=c;h.body.insertBefore(b,h.body.firstChild)}catch(f){}},invitationIframeId:"comm100-ifrInvitation",invitationDivId:"comm100-invitationDiv",overlayId:"comm100-overlay",cookieKey_v5:"comm100_",cookieKey_v6:"Comm100_CC_Identity_",sessionCookieKey:"comm100_session_",guid_cookie_key:"comm100_guid_",standby_id_cookie_key:"comm100standby_id",standby_session_cookie_key:"comm100standby_session",
createFloatDiv:function(){var a="comm100-float-button-"+c.getId();div=h.createElement("DIV");div.id=a;div.style.cssText="visibility:hidden;position:absolute;cursor:pointer;z-index:2147483637;";h.body.insertBefore(div,h.body.firstChild);return div},backgroundImage:function(a){return"url('"+a+"') no-repeat scroll 0% 0% transparent"},removeAd:function(){var a=q("comm100-powered-by");a&&a.parentNode&&a.parentNode.removeChild(a)},parse_query:function(a){for(var b="",c=0,e=a.length;c<e;c++){var f=a[c][0],
g=a[c][1];null!==g&&"undefined"!==typeof g&&(0<c&&(b+="&"),b+=f+"="+encodeURIComponent(g))}return b},hide:function(a){if(a=q(a))a.style.display="none"},show:function(a,b){var c=q(a);c&&(c.style.display=b||"")},set_ele_size:function(a,b){a&&(a.style.width=b.w+"px",a.style.height=b.h+"px")},show_ele:function(a,b){a&&(a.style.display=b||"")},hide_ele:function(a){a&&(a.style.display="none")},addIframeLoadEvent:function(a,b){if(null!=a&&null!=b)if(a.attachEvent){var c=function(){if("complete"==a.readyState||
"loaded"==a.readyState)a.detachEvent("onreadystatechange",c),b()};a.attachEvent("onreadystatechange",c)}else a.onload=function(){a.onload=null;b()}},add_protocol:function(a){var b="http://",c=comm100_server.indexOf("://");0<c&&(b=comm100_server.substring(0,c+3));return/^https?:\/\//.test(a)?a.replace(/^https?:\/\//,b):b+a},get_image_url:function(a,b){var d="";return d=0==b.a?c.add_protocol(b.c):t+"/DBResource/DBImage.ashx?imgId="+b.b+"&type="+b.a+"&siteId="+a}},E=navigator.userAgent.toLowerCase(),
Q;(Q=E.match(/msie ([\d.]+)/))?c.ie=Q[1]:(Q=E.match(/se 2.x/))?c.sougou=!0:0;c.mobile=/mobile|android|ipad/i.test(E);var C=function(){function a(a,b,c){var d=h.createElement("iframe");d.src="javascript:false";d.style.cssText="z-index:2147483639;overflow:hidden;display:none;width:"+(k.w-2)+"px;height:"+k.h+"px;right:"+m.r+"px;bottom:-"+k.h+"px;border-radius:4px 4px 0 0;border:solid 1px "+c;d.setAttribute("frameborder","0");h.body.insertBefore(d,h.body.firstChild);var e;e=d.document;d.contentDocument?
e=d.contentDocument:d.contentWindow&&(e=d.contentWindow.document);e.open();e.writeln('<html><head><meta charset="utf-8"><style type="text/css">body,html{margin:0;padding:0;overflow:hidden;}</style></head><body style="background-color:'+b+';"><div style="margin-top:24px;height:100%;background-color:white;border-top:solid 1px '+c+';"></div><img style="position:absolute;top:100px;left:192px;" src="'+t+'/images/loading-large.gif"/></body></html>');e.close();a&&a(d);return d}var b,d,e="comm100_embedded_"+
g.site_id,f="comm100_embedded_m_"+g.site_id,k={w:400,h:450},m={r:20,b:0},l={w:230,h:30};6==c.ie&&(l.h=32);var S={r:20,b:0},r={w:k.w-40,h:25},J={r:62,b:425},n=m,s=J,w=0,v=!1,z=c.getCookie(e),x=null;return{open:function(I,y){function A(){v=!1;H.receiveMessage(null,t);c.f.stopFloat(b);c.f.stopFloat(d);c.hide_ele(b);c.hide_ele(d);h.body.removeChild(b);h.body.removeChild(d);d=b=null;c.setSessionCookie(e,"")}var u=c.getCookie(f);u&&(I+="&lastMessageId="+u);if(v)H.postMessage("restore",I,b.contentWindow);
else if(v=!0,w=y,b=q("comm100-chat-window"),d=q("comm100-chat-window-drag"),null==b&&(b=h.createElement("IFRAME"),b.style.cssText="display:none;bottom:0px;position:absolute;z-index:2147483638;border-radius:4px 4px 0 0;width:"+k.w+"px;height:"+k.h+"px;",b.setAttribute("id","comm100-chat-window"),b.setAttribute("frameBorder","0"),h.body.insertBefore(b,h.body.firstChild),H.receiveMessage(function(a){var b=q("comm100-chat-window"),d=q("comm100-chat-window-drag");a=a.data;"minimize"==a?(c.set_ele_size(b,
l),n=c.f.getFloat(b).option,s=c.f.getFloat(d).option,6==c.ie&&c.f.stopFloat(b),c.f.floatIt(b,l,S),c.hide_ele(d),(b=c.getCookie(e))&&c.setSessionCookie(e,"m")):"restore"==a?(c.set_ele_size(b,k),c.f.floatIt(b,k,n),c.f.floatIt(d,r,s),c.show_ele(d,"block"),(b=c.getCookie(e))&&c.setSessionCookie(e,"n")):"close"==a?(A(),b=L(w),3==b.t&&c.show(b.div_id)):"waitingforchat"==a?(b=c.getCookie(e))||c.setSessionCookie(e,"n"):"chat"==a?K.send("Chat"):"endchat"==a?(c.setSessionCookie(e,""),aa.flashTitle(""),x&&x()):
"restart"==a?(A(),b=c.parse_query([["planId",y],["siteId",g.site_id],["visitorId",p.id],["visitorGuid",p.guid],["pageTitle",c.getTruncatedTitle()],["pageUrl",h.location],["userId",g.user_id],["r",c.getRandom()]]),C.open(F+"?"+b,y)):0==a.indexOf("lastMessageId")?c.setSessionCookie(f,a.replace("lastMessageId_","")):0==a.indexOf("notify")?(b=a.replace("notify_",""),aa.flashTitle(b)):"prechat"==a?K.send("Pre-chat"):"offlinemessage"==a&&K.send("Offline-Message")},t),d=h.createElement("div"),d.setAttribute("id",
"comm100-chat-window-drag"),d.style.cssText="display:none;cursor:move;z-index:2147483639;background-color:rgba(0,0,0,0);width:"+r.w+"px;height:"+r.h+"px;",h.body.insertBefore(d,h.body.firstChild),ia.draggable(d,r,b,k)),b.src=I,"m"==z)c.addIframeLoadEvent(b,function(){c.hide_ele(d);c.set_ele_size(b,l);c.f.floatIt(b,l,S);c.f.floatIt(d,r,J);H.postMessage("minimize",I,b.contentWindow);null!=b&&setTimeout(function(){c.show_ele(b,"block")},100)});else{var B=function(){G&&E&&(D&&(D.style.display="none",
h.body.removeChild(D)),c.f.floatIt(b,k,m),c.f.floatIt(d,r,J),c.show_ele(b),c.show_ele(d,"block"),H.postMessage("loaded",I,b.contentWindow))},D=null,G=!1,E=!1;c.f.supportFixed()?(u=L(w),D=a(function(a){a.style.position="fixed";a.style.bottom="-"+k.h+"px";a.style.right=m.r+"px";var b=-k.h;c.show_ele(a,"block");var d=setInterval(function(){b+=-b/8;-10<b&&(b=0);0==b?(clearInterval(d),E=!0,B()):a.style.bottom=b+"px"},50)},u.i,u.j)):E=!0;c.addIframeLoadEvent(b,function(){G=!0;B()})}},end_chat:function(a){x=
a;H.postMessage("endchat",F,b.contentWindow)},ifLastOpened:function(){return!!z}}}(),k={siteId:g.site_id,init:function(){k.div||(k.div=h.createElement("DIV"),k.div.style.cssText="visibility:hidden;position:absolute;z-index:2147483639;width:auto;height:auto;overflow:hidden;",h.body.insertBefore(k.div,h.body.firstChild));return k.div},show:function(a,b,d,e,f){var h=g.site_id;if(!k.isShowing){var m=k.init();m.innerHTML=a;m.style.display="";m.style.width=m.style.height="auto";k.isShowing=!0;f&&c.playSound(f);
e&&!c.sougou?(m.onmouseover=k.pauseMove,m.onmouseout=k.continueMove,k.isStopMove=!1,m.style.left=b.l+"px",m.style.top=b.t+"px",k.dir=1,k.lastY=0,c.imageComplete(q("invitationAcceptImg"+h),function(a){m.style.width=a.w+"px";m.style.height=a.h+"px";m.style.visibility="visible";var b;"6.0"!=c.ie||k.ifr||(b=k.ifr=c.createIframe(1E4));b&&(b.style.display="",b.style.width=m.style.width,b.style.height=m.style.height);k.move()})):(m.onmouseover=null,m.onmouseout=null,c.imageComplete(q("invitationAcceptImg"+
h),function(a){c.f.floatIt(m,a,b);m.style.width=a.w+"px";m.style.height=a.h+"px";m.style.visibility="visible";d&&c.overlay.show(2147483638,c.overlayId+h)}));K.send("Invitation")}},pauseMove:function(){k.isStopMove=!0},continueMove:function(){k.isStopMove=!1;k.move()},move:function(){function a(){if(k.isShowing&&!k.isStopMove){var e=c.f.clientSize().w-b.offsetWidth,f=c.px2int(b.style.left);0>=f?k.dir=1:f>=e&&(k.dir=-1);b.style.left=f+k.dir+"px";e=.3*(c.f.scrollPos().y-k.lastY);e=0<e?Math.ceil(e):Math.floor(e);
k.lastY+=e;b.style.top=c.px2int(b.style.top)+e+"px";d&&(d.style.left=b.style.left,d.style.top=b.style.top);k.moveTimer=setTimeout(a,20)}}var b=k.div,d=k.ifr;b&&(k.lastY=k.lastY||0,a())},hide:function(){k.moveTimer&&(clearTimeout(k.moveTimer),k.moveTimer=null);var a=k.div;c.f.stopFloat(a);a&&(k.div=null,h.body.removeChild(a));if(a=k.ifr)k.ifr=null,h.body.removeChild(a);c.overlay.hide(c.overlayId+g.site_id);setTimeout(function(){k.isShowing=!1},2E3)},accept:function(a,b){"function"==typeof k.acceptHandler&&
k.acceptHandler();W(null,null,a,b);k.hide()},refuse:function(a){c.stopPropagation(a);B([["action",c.actionType.refuseInvitation]]);k.hide()}};g.inv=k;var z={};(function(a){function b(a){var c=a.shift();c&&(f=1E3*c.d,0<a.length&&(g=setTimeout(function(){b(a)},1E3*c.t)))}function c(a){a?setTimeout(c,1E3*a):(g&&(clearTimeout(g),g=null),k&&(clearTimeout(k),k=null))}function e(){var a=f;h&&(a=1E3*h);k=setTimeout(function(){p&&p();e()},a)}var f,g,h=0,k,p=function(){};a.start=function(a,c){p=c;b(a);e()};
a.set_interval=function(a){h=a};a.stop=c})(z);g.set_custom_variables=fa;g.open_chat_window=W;g.page_visit=y;g.manual_inv_showed=ga;g.show_autoinvs=U;g.a=v;g.b=ea;g.c=ha;g.d=O;g.cb=function(a){null!=x[a]&&delete x[a];c.removeRequest(a)};g.ban=function(){g.banned=!0;z.stop()};g.end_chat=function(a){C.end_chat(a)};P?O():y();g.loaded=!0}else g.loaded=!1})(Comm100API);
"undefined"==typeof Comm100API.find_custom_vaiables&&(Comm100API.find_custom_vaiables=function(g){function u(){y++;for(var A=g.length-1;0<=A;A--){var D=g[A];Comm100API.eval_result=null;try{eval("Comm100API.eval_result="+D.expression)}catch(L){}null!==Comm100API.eval_result&&"undefined"!==typeof Comm100API.eval_result&&(g.splice(A,1),v.push({name:D.name,value:encodeURIComponent(Comm100API.eval_result)}))}1==y?0==g.length?Comm100API.set_custom_variables(v):(0<v.length&&(Comm100API.set_custom_variables(v,
!0),v=[]),setTimeout(u,2E3)):0==g.length||6==y?Comm100API.set_custom_variables(v):setTimeout(u,2E3)}var y=0,v=[];u()});
