/** ios-sso deployment mar.13.2014 */
function getIosVersion(){if(/iP(hone|od|ad)/.test(navigator.platform)){var a=(navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);return[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3]||0,10)]}}function checkIosPlatform(){p=navigator.platform.toLowerCase();u=navigator.userAgent.toLowerCase();v=navigator.vendor;if(typeof(v)!=="undefined"){v=v.toLowerCase()}var a=getIosVersion();if(((p.indexOf("ipad")!==-1||p.indexOf("iphone")!==-1||p.indexOf("ipod")!==-1||p.indexOf("mac")!==-1)&&(typeof(a)!=="undefined"&&a[0]>=7)&&(checkSafari(u,v)===true))||(p.indexOf("mac")!==-1&&(checkSafari(u,v)===true))){alerts("....... IOS >= 7 or mac&safari... ");return true}return false}function checkSafari(b,a){if(b.indexOf("safari")!==-1&&a.indexOf("apple")!==-1){return true}else{return false}}function setCookie(a,d,b){var e=new Date();b=3650;e.setDate(e.getDate()+b);var c="";if(checkIosPlatform()===true){c=d+((b==null)?"":"; domain=.shoprunner.com; path=/; expires="+e.toUTCString())}else{c=d+((b==null)?"":"; expires="+e.toUTCString())}document.cookie=a+"="+c}function getCookie(b){var c,a,e,d=document.cookie.split(";");for(c=0;c<d.length;c++){a=d[c].substr(0,d[c].indexOf("="));e=d[c].substr(d[c].indexOf("=")+1);a=a.replace(/^\s+|\s+$/g,"");if(a==b){stripped_y=stripQuotes(e);if(stripped_y!==""&&typeof(stripped_y)!=="undefined"){return unescape(stripped_y)}else{return unescape(e)}}}}function stripQuotes(a){newStr="";if(typeof(a)!=="undefined"){fChar=a.substring(0,1);lChar=a.substring((a.length-1),a.length);start=(fChar==='"'||fChar==="'")?1:0;end=(lChar==='"'||lChar==="'")?(a.length-1):a.length;newStr=a.substring(start,end)}return newStr}function alerts(b){try{if(window.localStorage.debug_alerts==="true"){console.log(b)}}catch(a){}}function gup(b){b=b.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var a="[\\?&]"+b+"=([^&#]*)";var d=new RegExp(a);var c=d.exec(window.location.href);if(c===null){return false}else{return c[1]}}function setit(a){if(window.localStorage){window.localStorage.sr_ssotoken=a;alerts("Local Storage SSO set to "+a+".")}setCookie("sr_ssotoken",a,3650);alerts("Cookie SSO set to "+a+".")}function setLocalStorage(a,b){if(window.localStorage){window.localStorage[a]=b;alerts("Local Storage "+a+"set to "+b)}setCookie(a,b,3650);alerts("Cookie "+a+" set to "+b)}if(gup("sr_ssotoken")&&gup("sr_ssotoken")===""){setit("false")}else{if(gup("sr_ssotoken")){setit(gup("sr_ssotoken"))}}if(gup("sr_website_logout")){setLocalStorage("sr_website_logout",gup("sr_website_logout"))}var sr_$={};sr_$.actions={};(function(){var b,c,i=1,a,f=!1,g="postMessage",d="addEventListener",e,h=window[g]&&typeof(window.opera)=="undefined";sr_$.actions.postMessage=function(j,l,k){if(!l){return}k=k||parent;if(h){k[g](j,l.replace(/([^:]+:\/\/[^\/]+).*/,"$1"))}else{if(l){k.location=l.replace(/#.*$/,"")+"#"+(+new Date)+(i++)+"&"+j}}return true};sr_$.actions.receiveMessage=e=function(l,k,j){if(h){if(l){a&&e();a=function(m){l(m)}}if(window[d]){window[l?d:"removeEventListener"]("message",a,f)}else{window[l?"attachEvent":"detachEvent"]("onmessage",a)}}else{b&&clearInterval(b);b=null;if(l){j=typeof k==="number"?k:typeof j==="number"?j:100;b=setInterval(function(){var n=document.location.hash,m=/^#?\d+&/;if(n!==c&&m.test(n)){c=n;l({data:n.replace(m,"")})}},j)}}}}());var tok=(checkIosPlatform()||typeof(window.localStorage)=="undefined"||window.localStorage.sr_ssotoken==="")?getCookie("sr_ssotoken"):window.localStorage.sr_ssotoken;if(tok&&tok!==""){sr_$.actions.postMessage('{"sso":"'+tok+'"}',gup("purl"),parent);alerts("Sending SSO Token.")}else{alerts("No SSO Token.")};