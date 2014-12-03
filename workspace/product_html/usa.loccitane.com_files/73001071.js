(function(){var chan={utilities:{}};
(function(d,b){var a=b.utilities;a.referrer=d.document.referrer;a.addScriptNode=function(a){var c=d.document.createElement("script");c.type="text/javascript";c.async=!0;c.src=a;a=d.document.getElementsByTagName("script")[0];a.parentNode.insertBefore(c,a)};a.getUrlParameter=function(a){for(var c=d.location.search.substring(1).split("&"),b=0;b<c.length;b++){var e=c[b].split("=");if(e[0]==a)return e[1]}return""};a.pageUrl=function(){return d.document.location.toString()};a.pageReferrer=function(){return a.referrer};
a.checkPageReferrerOverride=function(){var g=d.location.search.substring(1).split(/xoverride=/i);1<g.length&&(a.referrer=decodeURIComponent(g[1]))};a.pageHostname=function(){return d.document.location.hostname};a.isArray=function(g){return"array"==a.typeOf(g)};a.typeOf=function(a){var c=typeof a;if("object"==c)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return c;var b=Object.prototype.toString.call(a);if("[object Window]"==b)return"object";if("[object Array]"==b||"number"==typeof a.length&&
"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==b||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==c&&"undefined"==typeof a.call)return"object";return c}})(window,chan);chan.cookies={};
(function(d,b){var a=b.cookies;a.expire=30;a.cookieDomain=void 0;a.stripWhitespace=function(a){return!a?a:a.replace(/^\s+|\s+$/g,"")};a.detectDomain=function(){var g=b.utilities.pageHostname();a.cookieDomain=g||null;if(g&&g.match(/[a-zA-Z]+/)&&g.match(/\./))for(var g=g.split("."),c=g.length-2;0<=c;){var f="."+g.slice(c).join(".");a.setCookie("__ca_test__","ok",null,f);var e=a.getCookie("__ca_test__");a.deleteCookie("__ca_test__",f);if("ok"===e){a.cookieDomain=f||null;break}c--}};a.getDomain=function(){void 0===
a.cookieDomain&&a.detectDomain();return a.cookieDomain||null};a.getCookie=function(b){for(var c=d.document.cookie.split(";"),f=0;f<c.length;f++){var e=c[f].split("="),n=a.stripWhitespace(e[0]),e=a.stripWhitespace(e[1]);if(n===b)return e}return null};a.setCookie=function(b,c,f,e){c||(c="");e||(e=a.getDomain());b=[b,"=",c,"; path=/;"];e&&(b.push(" domain="),b.push(e),b.push(";"));f&&(b.push(" expires="),b.push(f.toGMTString()),b.push(";"));d.document.cookie=b.join("")};a.deleteCookie=function(b,c){a.setCookie(b,
null,new Date(0),c)}})(window,chan);chan.logging={};(function(d,b){var a=b.logging;a.logToConsole=!1;a.verbos=!0;a.debug=function(b){a.verbos&&a.info(b)};a.info=function(b){!0===a.logToConsole&&d.console&&d.console.log&&d.console.log(b)};a.error=function(b){a.info(b)};a.warning=a.error})(window,chan);chan.pixel={};
(function(d,b){var a=b.pixel;a.url="https://tracking2.channeladvisor.com";a.welcomeTarget="https://tracking2.channeladvisor.com/welcome_fp.asp";a.thankyouTarget="https://tracking2.channeladvisor.com/thankyou_fp.asp";a.addNode=function(a,c,f,e){a=[a,"?SMCID=",c,"&CAID=",encodeURIComponent(f),"&x=",encodeURIComponent(b.utilities.pageReferrer()),"&t=",(new Date).getTime()];e&&a.push(e);b.utilities.addScriptNode(a.join(""))};a.welcome=function(g,c,f){var e="";f&&(e="&CAWELAID="+f);a.addNode(a.welcomeTarget,g,c,e);b.user.save()};a.thankyou=function(g,
c,f){if(f){var e=[],n=",",d=[],h;for(h in f)if("string"===typeof h){var j=f[h];h=h.toLowerCase();if("eventtypeid"===h)e.push("&EventTypeID=",encodeURIComponent(j));else if("orderid"===h)e.push("&OrderID=",encodeURIComponent(j));else if("revenue"===h)e.push("&oVal=",encodeURIComponent(j));else if("currencycode"===h)e.push("&CurrencyID=",encodeURIComponent(j));else if("products"===h){if(b.utilities.isArray(j))for(var r in j){var m=j[r],p="",q=1,k;for(k in m)"string"===typeof k&&"sku"===k.toLowerCase()?
p=m[k]:"string"===typeof k&&"quantity"===k.toLowerCase()&&(q=m[k]);if(""!=p&&0<q)for(m=1;m<=q;m++)d.push(p)}}else"productseparator"===h&&(n=j)}d.length&&e.push("&ProductID=",encodeURIComponent(d.join(n)));a.addNode(a.thankyouTarget,g,c,e.join(""));b.user.save()}else b.logging.warning(g,"Attempting to track null order.")}})(window,chan);chan.user={};(function(d,b){var a=b.user;a.cookieKey="_caid";a.profileId="73001071";a.userId="0";a.save=function(){var d=new Date;d.setDate(d.getDate()+b.cookies.expire);b.cookies.setCookie(a.cookieKey,a.userId,d)};a.generateId=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)})}})(window,chan);chan.main={};
(function(d,b){var a=b.main;a.events=[];a.userSaved=!1;a.init=function(){var c=!1;b.logging.debug("Initializing with profile "+b.user.profileId+".");b.utilities.checkPageReferrerOverride();b.user.userId=b.cookies.getCookie(b.user.cookieKey);if(!b.user.userId||32>b.user.userId.length)b.user.userId=b.user.generateId(),b.user.save(),c=!0;a.userSaved=!0;a.maybeSendWelcomePixel(c);a.initEventCollections()};a.getAdId=function(){for(var a=[b.utilities.pageUrl(),b.utilities.pageReferrer()],f=0;f<a.length;f++){var e=
a[f],d=e&&e.match(/[?&]CA_6C15C=(\d+)/i);if(d||(d=e&&e.match(/[?&]catargetid=(\d+)/i))||(d=e&&e.match(/[?&]cawelaid=(\d+)/i))||(d=e&&e.match(/[?&]casitelinkaid=(\d+)/i)))return d[1]}return 1<a.length&&(d=(e=decodeURIComponent(a[1]))&&e.match(/click.asp\?aid=(\d+)/i))?d[1]:""};a.maybeSendWelcomePixel=function(c){var d=a.getAdId(),e=b.cookies.getCookie("_cavisit")||"",g="",l=e.split("|");2==l.length?(e=parseInt(l[0],16),g=l[1]):e=0;var l=(new Date).getTime(),h=new Date;h.setHours(h.getHours()+1);var j=
d;""==j&&(j=g);return c||36E5<l-e||""!=d?(b.cookies.setCookie("_cavisit",[l.toString(16),j].join("|"),h),b.pixel.welcome(b.user.profileId,b.user.userId,d),!0):!1};a.processEvent=function(c){return!a.userSaved?(b.logging.error("Process event called before initialization."),!1):!b.utilities.isArray(c)||2>c.length||"string"!==b.utilities.typeOf(c[0])||"object"!==b.utilities.typeOf(c[1])?(b.logging.error("Process event parameter needs to be an array of [string, object]."),!1):"order"===c[0].toLowerCase()?
(b.pixel.thankyou(b.user.profileId,b.user.userId,c[1]),!0):!1};a.initEventCollections=function(){d._caq=d._caq||[];b.utilities.isArray(d._caq)||(d._caq=[]);var c=d._caq;a.events.push=function(b){for(var c=0;c<arguments.length;c++){var d=arguments[c];d&&a.processEvent(d)}return Array.prototype.push.apply(this,arguments)};c.push=function(b){for(var c=0;c<arguments.length;c++)a.events.push(arguments[c]);return this.length};for(var f=0;f<c.length;f++)a.events.push(c[f]);c.length=0};try{a.init()}catch(g){b.logging.error("Exception during init "+
g)}})(window,chan);})();
