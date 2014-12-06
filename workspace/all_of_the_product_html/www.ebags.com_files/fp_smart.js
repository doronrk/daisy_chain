/*jshint devel:true, regexp:false */(function(e){e._i||(e._i=[]);if(e.Utils)return;e.Utils={};e.Utils.extend=function(e){var t=Array.prototype.slice.call(arguments,1),n,r,i;for(n=0;n<t.length;n++){r=t[n];if(r)for(i in r)e[i]=r[i]}return e};e.Utils.log=function(){if(e.Utils.log.enabled&&window.console&&window.console.log)try{console.log.apply(console,arguments)}catch(t){}};e.Utils.warn=function(){if(e.Utils.log.enabled&&window.console&&window.console.warn)try{console.warn.apply(console,arguments)}catch(t){}};e.Utils.log.enabled=/fp_trace=1/i.test(window.location.href);e.Utils.getInstance=function(t,n){var r;if(!e||!e._i)return null;for(r=0;r<e._i.length;r++)if((!e._i[r]._init||n)&&(!t||e._i[r].type===t)){e._i[r]._init=!0;return e._i[r]}return null};e.Utils.isElementInDom=function(e){while(e=e.parentNode)if(e===document)return!0;return!1};e.Utils.serialize=function(e){var t="",n,r,i;for(n in e){t+=encodeURIComponent(n)+"=";r=e[n];i=typeof r;r===null&&(t+="n");r===undefined&&(t+="u");i==="boolean"&&(t+="b"+(r?1:0));i==="number"&&(t+="f"+r);i==="string"&&(t+="s"+encodeURIComponent(r));t+=";"}return t};e.Utils.deserialize=function(e){var t={},n;e&&typeof e=="string"&&e.replace(/([^=;]+)=([^;]*)/g,function(e,r,i){n=i.substr(0,1);i=i.substr(1,i.length-1);n==="n"&&(i=null);n==="u"&&(i=undefined);n==="b"&&(i=!!parseInt(i,10));n==="f"&&(i=parseFloat(i));n==="s"&&(i=decodeURIComponent(i));t[decodeURIComponent(r)]=i});return t};e.Utils.injectCss=function(e,t){var n=document.getElementsByTagName("head"),r;if(n&&n.length&&e){if(t){r=document.createElement("style");r.type="text/css";r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}else{r=document.createElement("link");r.type="text/css";r.rel="stylesheet";r.href=e}n[0].appendChild(r)}};e.Utils.injectJs=function(e,t){var n=document.getElementsByTagName("head"),r;if(n&&n.length&&e){r=document.createElement("script");r.type="text/javascript";if(t)r.text?r.text=e:r.appendChild(document.createTextNode(e));else{r.src=e;r.async=!0}n[0].appendChild(r)}};e.Utils.getCookie=function(e){var t=document.cookie.split(";"),n,r;for(n=0;n<t.length;n++){r=t[n].match(/([a-z0-9_\-]+)=(.*)/i);if(r&&decodeURIComponent(r[1])===e)return decodeURIComponent(r[2])}return null};e.Utils.setCookie=function(t,n,r){r=r||{};if(r.expires)if(r.expires==="never"){var i=new Date;i.setFullYear(i.getFullYear()+20);r.expires=i}else r.expires==="expire"&&(r.expires=new Date(2e3,1,1));r.domain==="*"&&(r.domain=e.Utils.getCookieRootDomain(window.location.hostname));var s=[encodeURIComponent(t),"=",r.raw?n:encodeURIComponent(n),r.expires&&r.expires instanceof Date?"; expires="+r.expires.toUTCString():"","; path="+(r.path||"/"),r.domain?"; domain="+r.domain:"",r.secure?"; secure":""].join("");document.cookie=s;return!0};(function(){function i(e){e=e||document.location.hostname;var r=e.split(".");if(r.length>2){var i=r.slice(0).reverse();if(n.test(i[0])&&t.test(i[1]))return r.slice(-3).join(".")}return r.slice(-2).join(".")}var t=/^(co|com|net|org|gov|edu|mil|int)$/,n=/^(ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cw|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$/,r=/(MSIE|Trident)/i.test(navigator.userAgent);e.Utils.getRootDomain=i;e.Utils.getCookieRootDomain=function(e){e=e||document.location.hostname;return r||/^([a-z]+|[\d\.]+)$/i.test(e)?null:"."+i(e)}})();e.Utils.deleteCookie=function(t){e.Utils.setCookie(t,"",{expires:new Date(2e3,1,1)})};e.Utils.initSession=function(t,n){var r,i=e.Utils.deserialize(e.Utils.getCookie(t));r=function(e,t){var n;if(arguments.length===0)return i;if(arguments.length===1){if(typeof e=="string")return i[e];for(n in e)i[n]=e[n];r.save();return e}i[e]=t;r.save();return t};r.refresh=function(){i=e.Utils.deserialize(e.Utils.getCookie(t))};r.remove=function(e){var t;if(typeof e=="string"){t=i[e];if(t!==undefined)try{delete i[e]}catch(n){}r.save();return t}var s={};for(var o=0;o<e.length;o++){var u=e[o];t=i[u];s[u]=t;if(t!==undefined)try{delete i[u]}catch(n){}}r.save();return s};r.save=function(){e.Utils.setCookie(t,e.Utils.serialize(i),n)};r.toJson=function(){if(window.JSON&&JSON.stringify)return JSON.stringify(i)};return r};(function(){var t=0;e.Utils.deferFn=function(e,n){var r="fanplayr_fn_"+t++,i;arguments.length===1&&(n=arguments[0]);i=function(){n.apply(n,Array.prototype.slice.apply(arguments));if(e===!0){window[r]=undefined;try{delete window[r]}catch(t){}}};i.uid=r;i.invokeStr=r+"();";window[r]=i;return i}})();e.Utils.jsonp=function(t,n){var r=document.createElement("script"),i=document.getElementsByTagName("script")[0],s=e.Utils.deferFn(!0,function(){n&&n.apply(n,Array.prototype.slice.apply(arguments));r&&r.parentNode&&r.parentNode.removeChild(r)});r.async=!0;r.src=t+(t.indexOf("?")>=0?"&":"?")+"callback="+s.uid;i.parentNode.insertBefore(r,i)};e.Utils.hasClass=function(e,t){if(e&&t){if(e.classList&&e.classList.contains)return e.classList.contains(t);if(e.className)return(new RegExp("\\b"+t+"\\b")).test(e.className)}return!1};e.Utils.addClass=function(e,t){e&&t&&(e.classList&&e.classList.add?e.classList.add(t):e.className&&(e.className+=" "+t))};e.Utils.removeClass=function(e,t){e&&t&&(e.classList&&e.classList.remove?e.classList.remove(t):e.className&&(e.className=e.className.replace(new RegExp("\\b"+t+"\\b","g"),"")))};e.Utils.toggleClass=function(t,n,r){r?e.Utils.addClass(t,n):e.Utils.removeClass(t,n)};e.Utils.bind=function(e,t,n,r){e&&e.addEventListener?e.addEventListener(t,n,r):e.attachEvent("on"+t,n)};e.Utils.unbind=function(e,t,n,r){e&&e.removeEventListener?e.removeEventListener(t,n,r):e.detachEvent("on"+t,n)};(function(){var t,n,r;t=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;n=/(?:^|&)([^&=]*)=?([^&]*)/g;r=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];e.Utils.parseUrl=function(e){var i=14,s={},o=t.exec(e);while(i--)s[r[i]]=o[i]||"";s.params={};s.query.replace(n,function(e,t,n){t&&(s.params[t]=decodeURIComponent(n))});s.toString=function(){var e=null;if(s.host){e=s.protocol?s.protocol+"://":"http://";e+=s.host;s.path&&(e+=s.path);s.query&&(e+="?"+s.query);s.anchor&&(e+="#"+s.anchor)}return e};return s}})();e.Utils.onDomReady=function(e,t){var n=!1,r=!0,i=e.document,s=i.documentElement,o=i.addEventListener?"addEventListener":"attachEvent",u=i.addEventListener?"removeEventListener":"detachEvent",a=i.addEventListener?"":"on",f=function(r){if(r.type==="readystatechange"&&i.readyState!=="complete")return;(r.type==="load"?e:i)[u](a+r.type,f,!1);!n&&(n=!0)&&t.call(e,r.type||r)},l=function(){try{s.doScroll("left")}catch(e){setTimeout(l,50);return}f("poll")};if(i.readyState==="complete")t.call(e,"lazy");else{if(i.createEventObject&&s.doScroll){try{r=!e.frameElement}catch(c){}r&&l()}i[o](a+"DOMContentLoaded",f,!1);i[o](a+"readystatechange",f,!1);e[o](a+"load",f,!1)}};e.Utils.manageTraceCookie=function(){var t="fanplayr_trace",n=window.location.href.match(/fp_trace=(\d)/),r;if(n){r=parseInt(n[1],10);e.Utils.setCookie(t,r?1:0,{expires:"never",domain:"*"})}else r=parseInt(e.Utils.getCookie(t),10)===1;e.Utils.log.enabled=r}})(window.fanplayr=window.fanplayr||{});(function(e){function n(e,n){var r=e[0],a=e[1],f=e[2],l=e[3];r=i(r,a,f,l,n[0],7,-680876936);l=i(l,r,a,f,n[1],12,-389564586);f=i(f,l,r,a,n[2],17,606105819);a=i(a,f,l,r,n[3],22,-1044525330);r=i(r,a,f,l,n[4],7,-176418897);l=i(l,r,a,f,n[5],12,1200080426);f=i(f,l,r,a,n[6],17,-1473231341);a=i(a,f,l,r,n[7],22,-45705983);r=i(r,a,f,l,n[8],7,1770035416);l=i(l,r,a,f,n[9],12,-1958414417);f=i(f,l,r,a,n[10],17,-42063);a=i(a,f,l,r,n[11],22,-1990404162);r=i(r,a,f,l,n[12],7,1804603682);l=i(l,r,a,f,n[13],12,-40341101);f=i(f,l,r,a,n[14],17,-1502002290);a=i(a,f,l,r,n[15],22,1236535329);r=s(r,a,f,l,n[1],5,-165796510);l=s(l,r,a,f,n[6],9,-1069501632);f=s(f,l,r,a,n[11],14,643717713);a=s(a,f,l,r,n[0],20,-373897302);r=s(r,a,f,l,n[5],5,-701558691);l=s(l,r,a,f,n[10],9,38016083);f=s(f,l,r,a,n[15],14,-660478335);a=s(a,f,l,r,n[4],20,-405537848);r=s(r,a,f,l,n[9],5,568446438);l=s(l,r,a,f,n[14],9,-1019803690);f=s(f,l,r,a,n[3],14,-187363961);a=s(a,f,l,r,n[8],20,1163531501);r=s(r,a,f,l,n[13],5,-1444681467);l=s(l,r,a,f,n[2],9,-51403784);f=s(f,l,r,a,n[7],14,1735328473);a=s(a,f,l,r,n[12],20,-1926607734);r=o(r,a,f,l,n[5],4,-378558);l=o(l,r,a,f,n[8],11,-2022574463);f=o(f,l,r,a,n[11],16,1839030562);a=o(a,f,l,r,n[14],23,-35309556);r=o(r,a,f,l,n[1],4,-1530992060);l=o(l,r,a,f,n[4],11,1272893353);f=o(f,l,r,a,n[7],16,-155497632);a=o(a,f,l,r,n[10],23,-1094730640);r=o(r,a,f,l,n[13],4,681279174);l=o(l,r,a,f,n[0],11,-358537222);f=o(f,l,r,a,n[3],16,-722521979);a=o(a,f,l,r,n[6],23,76029189);r=o(r,a,f,l,n[9],4,-640364487);l=o(l,r,a,f,n[12],11,-421815835);f=o(f,l,r,a,n[15],16,530742520);a=o(a,f,l,r,n[2],23,-995338651);r=u(r,a,f,l,n[0],6,-198630844);l=u(l,r,a,f,n[7],10,1126891415);f=u(f,l,r,a,n[14],15,-1416354905);a=u(a,f,l,r,n[5],21,-57434055);r=u(r,a,f,l,n[12],6,1700485571);l=u(l,r,a,f,n[3],10,-1894986606);f=u(f,l,r,a,n[10],15,-1051523);a=u(a,f,l,r,n[1],21,-2054922799);r=u(r,a,f,l,n[8],6,1873313359);l=u(l,r,a,f,n[15],10,-30611744);f=u(f,l,r,a,n[6],15,-1560198380);a=u(a,f,l,r,n[13],21,1309151649);r=u(r,a,f,l,n[4],6,-145523070);l=u(l,r,a,f,n[11],10,-1120210379);f=u(f,l,r,a,n[2],15,718787259);a=u(a,f,l,r,n[9],21,-343485551);e[0]=t(r,e[0]);e[1]=t(a,e[1]);e[2]=t(f,e[2]);e[3]=t(l,e[3])}function r(e,n,r,i,s,o){n=t(t(n,e),t(i,o));return t(n<<s|n>>>32-s,r)}function i(e,t,n,i,s,o,u){return r(t&n|~t&i,e,t,s,o,u)}function s(e,t,n,i,s,o,u){return r(t&i|n&~i,e,t,s,o,u)}function o(e,t,n,i,s,o,u){return r(t^n^i,e,t,s,o,u)}function u(e,t,n,i,s,o,u){return r(n^(t|~i),e,t,s,o,u)}function a(e){/[\x80-\xFF]/.test(e)&&(e=unescape(encodeURI(e)));var t=e.length,r=[1732584193,-271733879,-1732584194,271733878],i;for(i=64;i<=e.length;i+=64)n(r,f(e.substring(i-64,i)));e=e.substring(i-64);var s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<e.length;i++)s[i>>2]|=e.charCodeAt(i)<<(i%4<<3);s[i>>2]|=128<<(i%4<<3);if(i>55){n(r,s);for(i=0;i<16;i++)s[i]=0}s[14]=t*8;n(r,s);return r}function f(e){var t=[],n;for(n=0;n<64;n+=4)t[n>>2]=e.charCodeAt(n)+(e.charCodeAt(n+1)<<8)+(e.charCodeAt(n+2)<<16)+(e.charCodeAt(n+3)<<24);return t}function c(e){var t="",n=0;for(;n<4;n++)t+=l[e>>n*8+4&15]+l[e>>n*8&15];return t}function h(e){for(var t=0;t<e.length;t++)e[t]=c(e[t]);return e.join("")}var t,l="0123456789abcdef".split("");e.Utils.md5=function(e){return h(a(e))};t=function(e,t){return e+t&4294967295};e.Utils.md5("hello")!="5d41402abc4b2a76b9719d911017c592"&&(t=function(e,t){var n=(e&65535)+(t&65535),r=(e>>16)+(t>>16)+(n>>16);return r<<16|n&65535})})(window.fanplayr=window.fanplayr||{});(function(e){e.Utils.fingerprint=function(t){var n=!1,r=!1;try{n=!!window.sessionStorage;r=!!window.localStorage}catch(i){}var s=[navigator.userAgent,[screen.height,screen.width,screen.colorDepth].join("x"),(new Date).getTimezoneOffset(),n,r],o=navigator.plugins,u,a,f;for(f=0;f<navigator.plugins.length;f++){a=o[f];s.push([a.name,a.description].join("::"))}u=s.join("l");return t?u:e.Utils.md5(u)}})(window.fanplayr=window.fanplayr||{});(function(e){function M(e){var t=/\/\/([^\/]+)/i,n=t.exec(e.origin),r=t.exec(d.widget_url);if(!n||!r||n[1]!==r[1])return;e.data==="abort-show"&&(m=!0)}function P(){if(!D){D=!0;window.addEventListener?addEventListener("message",M,!1):window.attachEvent("onmessage",M)}}function z(t){var r=t&&t.afn_tracking;if(typeof r!="object"||!r.url||!r.iframe&&!r.script)return;if(document.location.protocol==="https:"&&/^http:/i.test(r.url)){n("AFN url is not compatible with secure protocol. "+r.url);return}var i=!1,s="//"+E+"/external.Genius/"+"?a=afn-tracking-status"+"&sk="+t.session_key+"&status=complete",o=function(){if(!i){i=!0;setTimeout(function(){e.Utils.jsonp(s,function(e){})},1e3)}};r.url=r.url.replace(/SESSION_KEY/g,t.session_key).replace(/CURRENT_TIMESTAMP/g,(new Date).getTime());if(r.iframe){var u=document.createElement("iframe");u.style.position="absolute";u.style.top=u.style.left="0px";u.style.width=u.style.height="1px";u.style.visibility="hidden";document.body.appendChild(u);if(r.script){var a=u.contentDocument||u.contentWindow&&u.contentWindow.document;a&&a.write('<script language="javascript" type="text/javascript" src="'+r.url+'"></sc'+"ript>")}else u.src=r.url;o()}else if(r.script){var f=document.createElement("script");f.src=r.url;document.body.appendChild(f);o()}}if(e&&e.st)return;e.widget||(e.widget={});var t=e.st={};e.st.version="2014-11-25-0530";var n,r,i,s,o,u,a,f,l,c=e.Utils.extend,h=null,p=e.Utils.initSession("fanplayr_genius_session",{expires:"never",domain:"*"}),d={},v=null,m=!1,g=null,y=!1,b=!1,w=!1,E="my.fanplayr.com",S="fanplayr_region",x="fanplayr_override";n=function(){e.Utils.log.apply(this,arguments)};r=function(){e.Utils.warn.apply(this,arguments)};e.Utils.manageTraceCookie();i=function(){var e;f=document.getElementById("fanplayr-st-iframe");l=document.getElementById("fanplayr-st-close");var t=(d.offer_delay||0)*1e3,r=d.has_auto_collected_offer,i=y&&p("delay"),s=(!y||r)&&d.offer_delay,o=i||s||0;p("delay",o);n("[FPST widget loaded, delay = %s]",o);var u=/fpst_show=1/i.test(window.location.href)||h.forceOpen,c=d.widget_config&&d.widget_config.alwaysShowOnCart;c===undefined&&(c=!0);p("hidden_by_user")&&(c=!1);setTimeout(function(){if(u)T(!0);else if(r||!y||d.page_type==="cart"&&c||o){T(!0);(r||!y||o)&&O(a,"left",-300,0,1500)}else T(!1);n("[FPST widget show]");p.remove("delay");setTimeout(function(){m||(a.style.display="block")},100)},o*1e3)};o=function(t){var r,i;i=e.Utils.deferFn(function(){t&&t();setTimeout(function(){document.body.removeChild(r)},5e3)});r=document.createElement("div");r.style.display="none";var s="//"+E+"/external.Genius/?a=link-request-user&id="+g;n("[FPST linking user to invocation id: "+g+"]");r.innerHTML='<iframe src="'+s+'" onload="'+i.invokeStr+'" style="width: 1px; height: 1px; opacity: 0;"></iframe>';document.body.appendChild(r)};t.toggle=function(){var e=!p("isOpen");h.data.pageType==="cart"&&p("hidden_by_user",!e);T(e)};var T=function(t){var n=t!==undefined?t:p("isOpen");n?e.Utils.removeClass(a,"fpst-closed"):e.Utils.addClass(a,"fpst-closed");p("isOpen",n)},N=function(t){e.Utils.injectCss("//"+E+"/widgets/genius/builds/current/css/embed.css?v="+e.st.version,!1);var n=Math.round(screen.height*.4);n=150;var r="#fanplayr-st-mobile-banner {";r+="background-color: "+t.color1+";";r+="color: "+t.color2+";";r+="font-size: "+n+"px;";r+="}";e.Utils.injectCss(r,!0);var i=document.createElement("div");i.id="fanplayr-st-mobile-banner";i.style.height=n+"px";var s='<div id="fanplayr-st-mobile-banner-text">'+t.offer_text+"</div>";s+='<div id="fanplayr-st-mobile-banner-close"><span>&times;</span></div>';i.innerHTML=s;document.body.appendChild(i);var o=i.ontouchstart?"ontouchstart":"onclick",u=document.getElementById("fanplayr-st-mobile-banner-text");u&&(u[o]=function(){document.body.removeChild(i);C(t)});var a=document.getElementById("fanplayr-st-mobile-banner-close");a&&(a[o]=function(){p("hide_mobile",!0);document.body.removeChild(i)})},C=function(e){var t=document.createElement("div");t.id="fanplayr-st-mobile-loader";t.style.backgroundImage="url(//"+E+"/widgets/genius/builds/current/images/loader.gif)";document.body.appendChild(t);setTimeout(function(){window.location=L(e)},500);return},k=function(e){try{if(e&&decodeURIComponent(e)===e.toString())return encodeURIComponent(e)}catch(t){return encodeURIComponent(e)}return e},L=function(t){var n=t.widget_url;n+="&dep="+k(h.dep||h.deputizeUrl||h.depitizeUrl||"");n+="&atc="+k(h.atc||h.applyToCartUrl||"");n+="&return_url="+encodeURIComponent(window.location.href);e.Utils.log.enabled&&(n+="&fp_trace=1");w&&(n+="&mobile=1");n+="&has_presented="+(y?"1":"0");n+="&has_collected="+(b?"1":"0");n=n.replace(/site\.fanplayr/i,E);return n};s=function(t){n("[FPST creating widget]");if(!t.widget_url)return;var r=e.Utils.deferFn(i);e.Utils.injectCss("//"+E+"/widgets/genius/builds/current/css/embed.css?cc=2014-11-25-0530",!1);t.site_css_url&&U(t.site_css_url);a=document.createElement("div");a.id="fanplayr-st";a.className="fanplayr-st-wrapper";a.style.display="none";var s='<iframe id="fanplayr-st-iframe" class="fpst-iframe" src="'+L(t)+'" allowtransparency="true" frameborder="0" scrolling="no" onload="'+r.invokeStr+'"></iframe>';s+='<div id="fanplayr-st-close" class="fanplayr-st-close" onclick="fanplayr.st.toggle();"></div>';a.innerHTML=s;document.body.appendChild(a);n("[FPST created widget]")};var A=function(){n("[FPST destroying widget]");if(a){document.body.removeChild(a);a=null}},O=function(e,t,n,r,i,s){var o,u=r-n,a=(new Date).getTime();if(!e||!e.style){s&&s();return}e.style[t]=n+"px";o=setInterval(function(){var r=(new Date).getTime()-a;if(r>i){r=i;clearInterval(o);s&&s()}e.style[t]=u*((r=r/i-1)*r*r*r*r+1)+n+"px"},25)},_=function(t){if(t&&t!==p("key")){e.widget&&e.widget.onChangeSession&&e.widget.onChangeSession(t,p("key"),window.JSON&&JSON.parse&&JSON.parse(p.toJson()));p.remove(["key","hide_mobile","offer_id","campaign","isOpen","shown_offers"]);p("key")&&p.remove(["hidden_by_user"])}},D=!1,H=function(){var t=e.Utils.getCookie(S);n("[FPST get region cookie: %s]",t);return t},B=function(t){var r=H();if(r)t(r);else{var i="//"+E+"/external.Genius/?a=get-region";n("[FPST requesting region from: %s]",E);e.Utils.jsonp(i,function(e){if(e&&e.region){j(e.region);t(e.region)}else t(E)})}},j=function(t){var n=new Date((new Date).getTime()+72e5);e.Utils.setCookie(S,t,{expires:n,domain:"*"})},F=function(){var t=document.createElement("div"),r=e.Utils.deferFn(function(){setTimeout(function(){document.body.removeChild(t)},5e3)});t.style.display="none";var i="//"+E+"/external.Genius/?a=set-data"+"&ak="+(h.ak||h.accountKey)+"&sk="+p("key")+"&uk="+p("user")+"&url="+encodeURIComponent(window.location.href);n("[FPST setting Fanplayr cookie at: %s]",i);t.innerHTML='<iframe src="'+i+'" onload="'+r.invokeStr+'" style="width: 1px; height: 1px; opacity: 0;"></iframe>';document.body.appendChild(t)},I=function(){var t=null,n=document.location.href.match(/fp_override_display=(\d)/);if(n){t=parseInt(n[1],10);var r=new Date;r.setFullYear(r.getFullYear()+20);e.Utils.setCookie(x,t,{expires:r,domain:"*"})}else t=parseInt(e.Utils.getCookie(x),10);return t},q=function(e){if(typeof e=="string")return e;var t=2,n=e&&parseInt(e.version,10)||t,i="__REQUIRED__",s={pageType:null,productId:null,categoryId:null,currency:null,lineItemCount:null,numItems:null,couponCode:null,subTotal:null,total:null,email:null,userKey:null,version:t};n>=3&&(s={lineItemCount:i,numItems:i,couponCode:i,total:i,discount:i,pageType:null,categoryId:null,categoryName:null,productId:null,productName:null,currency:null,customerEmail:null,customerId:null,shopType:null,version:null,hash:null,products:null,customerGroup:null,customerSegment:null,repeatCart:null});e.repeatCart&&!/0|false/.test(e.repeatCart)&&(s.lineItemCount=s.numItems=s.couponCode=s.total=s.discount=null);var o=c({},s,e),u=[],a;for(a in o){var f=o[a];f===i&&r("[FPST missing required param %s]",a);if(s[a]===undefined||f===null)continue;u.push(a+"="+encodeURIComponent(f))}u.push("custom=1");var l=encodeURIComponent(u.join("&"));return l},R=function(){var e=!1,t=function(){var e=0,t=!1,n="//"+E+"/external.Genius/?a=fprint",r=document.createElement("iframe");r.style.position="absolute";r.style.zIndex=-100;r.style.display="none";r.style.width="1px";r.style.height="1px";r.style.opacity=0;r.src=n;r.onload=function(){e++;if(e>=2&&!t){t=!0;setTimeout(function(){r.parentNode&&r.parentNode.removeChild(r)},2e3)}};document.body.appendChild(r)},n=function(){if(!e){e=!0;setTimeout(t,1e3)}};window.addEventListener?window.addEventListener("load",n,!1):window.attachEvent&&window.attachEvent("onload",n)},U=function(t){var n=e.injected;n||(e.injected=n={});if(!n[t]){e.Utils.injectCss(t,!1);n[t]=!0}},W=function(t){h=t||e.Utils.getInstance("st",!0);if(!h)return;var r=I();if(r===0)return;var i=h.ck||h.campaignKey,u=h.ak||h.accountKey,a=q(h.data),f=h.sessionKey||p("key"),l=h.userKey||p("user"),c=e.Utils.fingerprint(!0),m=new Date,S="",x;p("key",f);p("user",l);g=e.Utils.md5(c+location.href+m.getTime())+"-"+m.getTime();c=e.Utils.md5(c);w=/(iPhone|iPod|BlackBerry|Mobile|IEMobile|Opera Mobi|Opera Mini|phone)/i.test(navigator.userAgent)&&!/(iPad)/i.test(navigator.userAgent);location.hostname==="magento.fanplayr.com";/fp_mobile=1/.test(window.location.href)&&(w=!0);location.hostname==="192.168.1.7"&&E==="my.fanplayr.com"&&(E="192.168.1.7");n("[FPST campaign=%s, user=%s, session=%s]",i,l,p("key"));if(h.custom_data){var T;for(T in h.custom_data)S+=T+"="+h.custom_data[T]+"&";S=encodeURIComponent(S.substr(0,S.length-1))}var N=H();N&&(E=N);x=function(){var t;t="//"+E;t+="/external.Genius/?a=init";t+="&campaign="+i;t+="&user="+(l||0);t+="&session="+(p("key")||0);t+="&url="+encodeURIComponent(window.location.href);t+="&store_domain="+encodeURIComponent(h.storeDomain||"");t+="&tz="+(new Date).getTimezoneOffset();t+="&account="+u;t+="&store_data="+a;t+="&custom_data="+S;t+="&fingerprint="+c;t+="&invocation="+g;t+="&ref="+encodeURIComponent(document.referrer);t+="&log_only="+(h.logOnly?"1":"0");r!==null&&(t+="&override_display="+r);w&&(t+="&mobile=1");P();e.Utils.jsonp(t,function(t){d=t;if(!t)return;e.widget.onLogVisit&&e.widget.onLogVisit(t);(function(){var t="fanplayr_genius_session=; path=/; expires="+(new Date(2e3,1,1)).toUTCString();if(/(MSIE|Trident)/i.test(navigator.userAgent)){t+="; domain=."+e.Utils.getRootDomain();n("Removing old IE cookie: "+t)}else{t+="; domain=."+document.location.hostname;n("Removing old non-IE cookie: "+t)}document.cookie=t})();if(t.custom_widget){_(t._internal.session_key);if(t.excluded_ip)return;t._internal.region&&j(t._internal.region);p({campaign:i,key:t._internal.session_key,user:t._internal.user_key});F();var r=window.fanplayr_api=window.fanplayr_api||{};r.data=t;r&&r.init&&window.fanplayr_api.init()}else{_(t.session_key);n("[FPST offer_id: %s]",t.offer_id);if(t.excluded_ip){n("[FPST excluded ip=%s]",t.excluded_ip);return}if(t.region){n("[FPST updating region cookie: %s]",t.region);j(t.region)}n("[FPST omitted_by_ab_test = %s]",t.omitted_by_ab_test);var o=t.offer_id;y=d.has_presented_offer;b=d.has_collected_offer;n("[FPST page_type = %s]",d.page_type);n("[FPST has_presented = %s]",y);v=p("offer_id");p("key")!==t.session_key&&n("[FPST updated session key = %s]",t.session_key);p({campaign:i,key:t.session_key,user:t.user_key});F();o&&p("offer_id",o);e.st_debug&&t.debug_segmentation&&e.st_debug.printDebugInfo(t);t.has_offer&&t.widget_url&&(w||s(t))}z(t)})};e.Utils.onDomReady(window,function(){l?x():B(function(e){E=e;o(function(){n("[FPST linked user invocation]");x()})})})};e.reinitialize=function(e){A();W(e)};W()})(window.fanplayr=window.fanplayr||{});