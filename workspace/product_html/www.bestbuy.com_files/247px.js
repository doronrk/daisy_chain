/*!
 * 24/7 Customer, Inc. Confidential, Do Not Distribute. This is an
 * unpublished, proprietary work which is fully protected under
 * copyright law. This code may only be used pursuant to a valid
 * license from 24/7 Customer, Inc.
 */
window._tfsc=window._tfsc||parent._tfsc;if(!window._tfsc||!_tfsc.env)window._tfsc&&typeof _tfsc.getPath=="function"?_tfsc.env=function(){return _tfsc.STAGING_URL.match(/(.*?)\//)&&_tfsc.getPath().match(/(.*?)\//)[1]===_tfsc.STAGING_URL.match(/(.*?)\//)[1]?"s":_tfsc.PRODUCTION_URL.match(/(.*?)\//)&&_tfsc.getPath().match(/(.*?)\//)[1]===_tfsc.PRODUCTION_URL.match(/(.*?)\//)[1]?"p":"o"}():location.href.match(/[&\?]env=([pos])(&.*)?/)?window._tfsc={env:location.href.match(/[&\?]env=([pos])(&.*)?/)[1],getPath:function(){return location.href.match(/[&\?]cdnPath=(.*)(&.*)?/)[1]}}:window._tfsc={env:"p"};typeof SN=="undefined"&&(SN={}),SN.Conf=function(){function a(a){return a}function b(){var a=window.location.href;return a.indexOf("testsite1")!=-1?"X":a.indexOf("testsite2")!=-1?"Y":"id"}function d(){var a=b();return c[a]}function g(){return this.CUSTOM_TRACK_SERVER}var c={X:["subtenant1"],Y:["subtenant2"],id:["subtenant1","subtenant2"]},e="bestbuypsp-staging.px.247-inc.com/psp/bestbuy-v1-001/default/cpxt.js",f="bestbuypsp.px.247-inc.com/psp/bestbuy-v1-001/default/cpxt.js",h=null,i=null,j=null,k=null;return function(){switch(_tfsc.env){case"p":h="bestbuypsp.px.247inc.net",i="d1af033869koo7.cloudfront.net",j="bestbuy.vs.assist.247-inc.net",k="bestbuy.ca.assist.247-inc.net";break;case"s":h="bestbuypsp-staging.px.247inc.net",i="d2j8jkom7xmn9n.cloudfront.net",j="bestbuy.vs.assist.staging.247-inc.net",k="bestbuy.ca.assist.staging.247-inc.net";break;case"o":h="bestbuypsp-staging.px.247inc.net",i=_tfsc.getPath().match(/(.*?)\//)[1],j="bestbuy.vs.assist.staging.247-inc.net",k="bestbuy.ca.assist.staging.247-inc.net"}}(),{CONST_PSP_KEY:"bestbuy-v1-001",CUSTOM_TRACK_SERVER:h,CONST_PSP_ROOT:h,CONST_PSP_CDN_ROOT:i,PROXY_SERVER:h+"/tps/tpsp.php?",SPACER_IMAGEPATH:h+"/",CDN_DOMAIN:i+"/psp/",DOMAIN_VS_PARAMETIZED_PATH_AND_EXTENSION:{"www-ssl.bestbuy.com":"www-ssl.bestbuy.com/247/247chat.html","www.bestbuybusiness.com":"www.bestbuybusiness.com/bbfb/en/US/bb_info/content/psp247/247chat.html","bestbuybusiness.com":"bestbuybusiness.com/bbfb/en/US/bb_info/content/psp247/247chat.html","bbfb-vip-pl1-ext.bestbuy.com":"bbfb-vip-pl1-ext.bestbuy.com/bbfb-static-q03/en/US/bb_info/content/psp247/247chat.html","epro-pl.bestbuybusiness.com":"epro-pl.bestbuybusiness.com/bbfb-static-q03/en/US/bb_info/content/GeekSquad/global/psp247/247chat.html","business.geeksquad.com":"business.geeksquad.com/bbfb/en/US/bb_info/content/PILOT_3424234234236/global/psp247/247chat.html"},CONST_PXFWK_ID:"pxfwk.gz.js",CONST_PSP_VERSION:"default",PXOE_VERSION:"6.3",TRACKING_VERSION:"1.5",CONST_CDN_VERSION:"20141111113341",CONST_PSP_STAGE:"p",pspxdPath:"/pspxd.html",CONST_PSP_VISITOR_PERCENTAGE:100,CONST_ASSIST_VS_ROOT:j,CONST_ASSIST_CA_ROOT:k,pluginsToBeTracked:!1,mimeTypesToBeTracked:!1,browserGeoLocationFlag:!1,timeOutForBrowserGeoLocation:1e4,pollingTime:1e4,trackingUrlFlag:!1,varMapFlag:!1,CUSTOM_TRACKING_PERCENTAGE:100,varmap:{"<key>":"<value>"},FSM:{currentPageUrl:"document.location.href",referrer:"parent.document.referrer",title:"parent.document.title",el:'SN.Conf.getDecodedValue(SN.CookieManager.readSNCookie("sn.eh","el"))'},ED:{},ruleTypeMapping:null,japCharMap:{"0xff1f":"?","0xff0f":"/"},MAX_COOKIE_SIZE:2e3,MAX_COOKIE_COUNT_THRESHOLD:60,MIN_COOKIE_COUNT_THRESHOLD:45,DISABLED_COOKIES:[],COOKIEPATH:["www.bestbuy.com","www-ssl.bestbuy.com","espanol.bestbuy.com","espanol-ssl.bestbuy.com","www.cdc-172-16-22-151.cdc.bestbuy.com","espanol.cdc-172-16-22-151.cdc.bestbuy.com","www.bestbuybusiness.com","business.geeksquad.com"],INVALID_COOKIE_CHARACTERS:["&",">","<","#",";","javascript","\0","script","ATTACK","REPLACE","STYLE","%2F","ALERT","TRACE","X_IGNORE","X-NADA:","GET","","%3C",")","(","%3E","APPEND","SCRIPT","attack","replace","style","append","alert","trace","x_ignore","get","x-nada:","%3c","%3e","%2f","JAVASCRIPT","","?","&lsquo;","?","&rsquo;","&lt;","&gt;"],dataStore:"cookie",viStore:"cookie",viStoreName:"sn.vi",isViStoreSession:!1,shouldMaintainVi:!0,customDataSizeInViStore:2,tnt:"nemo-client-bestbuy",stnt:d,getDecodedValue:a,getUrlId:b,getCpxtDomain:g,SOCIAL_STORE_ID:"s51d520214c1b7",SOCIAL_BASE_URL:document.location.protocol+"//social.247-inc.com",ADP_BASE_URL:"http://ec2-54-242-63-0.compute-1.amazonaws.com/",IS_DS_REQUIRED:!1,TEST_PERCENTAGE:0,BYPASS_PERCENTAGE:0,PEAK_HOUR_START:0,PEAK_HOUR_STOP:1600,OFFPEAK_BYPASS:0,working_hours:{monday_start:"9",monday_end:"18",tuesday_start:"9",tuesday_end:"18",wednesday_start:"9:20",wednesday_end:"18:30",thursday_start:"9",thursday_end:"20:30",friday_start:"9",friday_end:"18",saturday_start:"9",saturday_end:"18",sunday_start:"9",sunday_end:"18"},timezone:"+5:30"}}(),typeof SN=="undefined"&&(SN={}),SN.Constants=function(){var a={UNDEFINED_STR:"undefined",LOGLEVEL_ERROR:"e",LOGLEVEL_WARN:"w",LOGLEVEL_DEBUG:"d",LOGLEVEL_INFO:"i",IS_ENV_SUPPORTED_OR_NOT:"es",IS_CUSTOM_TRACKING_ENABLED:"cte",BROWSER_GEO_LOCATION:"bgl",KEY_VALUE_SEPERATOR:"||",KEY_VALUE_SEPERATOR_OLD:"#",KEY_SEPERATOR:"~"};return a}(),SN.Utils=function(){function a(a){return a=="undefined"||a==null||a==="null"}var b={undefinedOrNull:a};return b}(),SN.Logger=function(){function c(c){if(!b)return;typeof console!=a.UNDEFINED_STR&&console.log(c)}var a=SN.Constants,b=!1,d={consoleLog:c};return d}(),SN.UserAgentParser=function(){function k(b){if(b!=null){var c=a.split(b),d=/(\d+\.)+\d+/,e=d.exec(c[1]);return e[0]}}function n(b){var c=a.indexOf(b)!=-1;if(c==1){var d=l[b].subStringNotToBePresent;for(var e=0;e<d.length;e++)if(a.indexOf(d[e])!=-1){c=!1;break}}else if(b=="MSIE"){var f="Trident/";if(a.indexOf(f)!=-1&&a.indexOf("rv:")!=-1){c=!0;var d=l[b].subStringNotToBePresent;for(var e=0;e<d.length;e++)if(a.indexOf(d[e])!=-1){c=!1;break}}}return c}function o(){return g}function p(){return g+d+f+d+e}function q(){for(var a in l)if(n(a)==1){c=a.toLowerCase().charAt(0),c=="v"?c="s":c=="m"&&(c="i"),c=c+d+l[a].getVersion();break}}function r(){return window.navigator.language?window.navigator.language:window.navigator.userLanguage}function s(){return c}function t(){var c=!1;for(var d in j)if(a.indexOf(d)!=-1){var f=j[d].osVersion;g=j[d].osType;for(var i in f)if(a.indexOf(i)!=-1){h=f[i];break}g=="iOS"&&(e=d),c=u(j[d].blacklisted,h);break}if(g==b){var k="Android",l=-1;(l=a.indexOf(k))!=-1?(g=k,h=a.substring(l+8,l+11),c=u(j[k].blacklisted,h)):a.indexOf("X11")!=-1?g="UNIX":g="-bv"}h!=b&&(g=g+"-"+h,c==1&&(g+="-bv"))}function u(a,b){var c=!1;if(a.length>0){for(var d in a)if(h==d){c=!0;break}if(c==0&&a.join().indexOf(".x")!=-1)for(var e=0;e<a.length;e++){var f=a[e].indexOf(".x");if(h.indexOf(a[e].substring(0,f))!=-1){c=!0;break}}}return c}function v(){try{if(e=="iPhone"||e=="iPod"){f="M";return}if(e=="iPad"){f="T";return}var b=a.toLowerCase(),c=0;for(var d in m){if(c==1)break;var g=m[d];for(var h in g){c=1;for(var j in g[h]){var k=g[h][j];if(k.charAt(0)=="!"){if(b.indexOf(k.substring(1))!=-1){c=0;break}}else if(b.indexOf(k)==-1){c=0;break}}if(c==1){f=d.charAt(0),e=g[h][0];break}}}}catch(l){i.consoleLog("Error while initializing device details:",l)}}var a=navigator.userAgent,b="unknown",c=b,d="~",e="others",f="U",g=b,h=b,i=SN.Logger,j={Win:{osType:"Windows",osVersion:{"NT 5.1":"XP","NT 6.0":"Vista","NT 6.1":"7","NT 6.2":"8","Phone OS 7":"Phone_OS_7","Phone OS 8":"Phone_OS_8"},blacklisted:["Phone_OS_7","Phone_OS_8"]},iPod:{osType:"iOS",osVersion:{"CPU iPhone OS 4":"4","CPU iPhone OS 5":"5","CPU iPhone OS 6":"6","CPU iPhone OS 7":"7","CPU OS 4":"4","CPU OS 5":"5","CPU OS 6":"6","CPU OS 7":"7"},blacklisted:["7"]},iPad:{osType:"iOS",osVersion:{"CPU iPhone OS 4":"4","CPU iPhone OS 5":"5","CPU iPhone OS 6":"6","CPU iPhone OS 7":"7","CPU OS 4":"4","CPU OS 5":"5","CPU OS 6":"6","CPU OS 7":"7"},blacklisted:["7"]},iPhone:{osType:"iOS",osVersion:{"CPU iPhone OS 4":"4","CPU iPhone OS 5":"5","CPU iPhone OS 6":"6","CPU iPhone OS 7":"7","CPU OS 4":"4","CPU OS 5":"5","CPU OS 6":"6","CPU OS 7":"7"},blacklisted:["7"]},Mac:{osType:"MacOS",osVersion:{"Mac OS X 10_4":"Tiger","Mac OS X 10.4":"Tiger","Mac OS X 10_5":"Leopard","Mac OS X 10.5":"Leopard","Mac OS X 10_6":"Snow Leopard","Mac OS X 10.6":"Snow Leopard","Mac OS X 10_7":"Lion","Mac OS X 10.7":"Lion","Mac OS X 10_8":"Mountain Lion","Mac OS X 10.8":"Mountain Lion","Mac OS X 10_9":"Mavericks","Mac OS X 10.9":"Mavericks"},blacklisted:[]},Android:{osType:"Android",osVersion:{"Android 4.1":"4.1","Android 4.1.1":"4.1.1","Android 4.1.2":"4.1.2","Android 4.2":"4.2","Android 4.2.1":"4.2.1","Android 4.2.2":"4.2.2","Android 4.3":"4.3","Android 4.3.1":"4.3.1","Android 4.4":"4.4"},blacklisted:["4.3.x","4.4.x"]},Linux:{osType:"Linux",osVersion:{Ubuntu:"Ubuntu",CentOS:"CentOS","Red Hat":"Red Hat",Mandriva:"Mandriva",Gentoo:"Gentoo",Debian:"Debian",Fedora:"Fedora"},blacklisted:[]}},l={Firefox:{lowestSupportedVersion:"3.6",subStringNotToBePresent:["Classilla","Kapika","CometBird","Orca","Madfox","PaleMoon","midori","Navigator","Pogo","SeaMonkey","TenFourFox","Wyzo","Fennec"],blacklistedVersions:[],getVersion:function(){return k("Firefox/")}},Version:{lowestSupportedVersion:"5",subStringNotToBePresent:["Android","Mobile Safari","Opera","BOLT","Dorothy","BlackBerry","Iris","SkyFire"],blacklistedVersions:[],getVersion:function(){return k("Version/")}},Chrome:{lowestSupportedVersion:"10",subStringNotToBePresent:["ChromePlus","Flock","Comodo_Dragon","Iron","RockMelt"],blacklistedVersions:[],getVersion:function(){return k("Chrome/")}},CriOS:{lowestSupportedVersion:"10",subStringNotToBePresent:[],blacklistedVersions:[],getVersion:function(){return k("CriOS/")}},MSIE:{lowestSupportedVersion:"8",blacklistedVersions:[],subStringNotToBePresent:["AOL","Avant","Crazy Browser","Deepnet Explorer","Surf","GreenBrowser","iRider","TencentTraveler","The World","KKMAN","MyIE2","Sleipnir","SlimBrowser"],getVersion:function(){var b=null,c=null,d=null;return a.indexOf("MSIE")!=-1?(b=/MSIE (\d+\.)+\d+/,c=b.exec(a),d=c[0].split(" ")):(b=/rv:(\d+\.)+\d+/,c=b.exec(a),d=c[0].split(":")),d[1]}}},m={Tablet:{1:["android","!mobile"],2:["ipad","webkit"],3:["playbook"],4:["kindle"],5:["xoom"],6:["tablet"]},Mobile:{1:["iphone","!ipad","!ipod"],2:["blackberry"],3:["android","mobile"],4:["iemobile"],5:["windows phone"],6:["nokia"],7:["fennec"],8:["mib"],9:["minimo"],10:["symbian"],11:["netfront"],12:["up.browser"],13:["openweb"],14:["opera mini"],15:["opera mobi"],16:["brew"],17:["danger"],18:["hiptop"],19:["midp"],20:["webos"],21:["ipod"]},Desktop:{1:["windows"],2:["linux"],3:["oss+[x9]"],4:["solaris"],5:["bsd"],6:["mac os x"]},Unknown:{1:["others"]}},w={getOSType:o,browserList:l,isBrowser:n,getBrowserDetails:s,getBrowserLanguage:r,getDeviceDetails:p};return t(),v(),q(),w}(),typeof SN=="undefined"&&(SN={}),SN.loadTrackingScript=function(a,b,c,d,e,f){var g=SN.Constants;try{var h=new String((new Date).getTime()),i=document.createElement("script");i.type="text/javascript";var j="id="+window.pspSNTrackingId+"&type="+a+"&ts="+h;typeof b!==g.UNDEFINED_STR&&b!=null&&(j=j+"&vid="+b);var k=window.location.pathname;k.length>200&&(k=k.substr(0,200)),j=j+"&u="+encodeURIComponent(k),j=j+"&ll="+f,typeof c!==g.UNDEFINED_STR&&c!=null&&c!=""&&(j=j+"&ed="+c),j.length>2e3&&(j=j.substr(0,2e3)),i.id="track-js"+h,i.src=document.location.protocol+"//"+SN.Conf.getCpxtDomain()+"/psp/"+e+"/"+SN.Conf.CONST_PSP_VERSION+"/cpxt.js?"+j;var l=document.getElementsByTagName("head").item(0);void l.appendChild(i)}catch(m){typeof console!=undefined&&SN.Logger.consoleLog("Error while sending custom tracking data "+m)}};var JSON_247=function(){function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}function stringify(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON_247.stringify")}function parse(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON_247.parse")}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep,me={parse:parse,stringify:stringify};return me}();SN.Logger=function(){function c(c){if(!b)return;typeof console!=a.UNDEFINED_STR&&console.log(c)}var a=SN.Constants,b=!1,d={consoleLog:c};return d}(),SN.CookieSanitizer=function(){function c(c){if(typeof c!="string")return c;var d=c;for(var e=0;e<b;++e)d=d.split(a[e]).join("");return d!=c&&SN.loadTrackingScript("InvalidCharacterInCookie","","",SN.Conf.CUSTOM_TRACK_SERVER,SN.Conf.CONST_PSP_KEY,SN.Constants.LOGLEVEL_ERROR),d}var a=SN.Conf.INVALID_COOKIE_CHARACTERS,b=a.length,d={sanitize:c};return d}(),SN.Tracker=function(){function poll(){sendAll()}function saveOnExit(a){try{var b=JSON_247.stringify(eventStorage);sessionStorage.setItem("sn.tdata",b)}catch(c){SN.Logger.consoleLog("SN.Tracker:Error storing event data "+c)}}function init(){isIE()||isSafari()?(MAX_URL_SIZE=1e3,SN.Logger.consoleLog("SN.Tracker: browser type IE , setting url size to 2k")):(MAX_URL_SIZE=1700,SN.Logger.consoleLog("SN.Tracker: browser type is not IE , setting url size to 4k")),setInterval(poll,CONST_POLLING_TIME_INTERVAL);if(typeof sessionStorage==SN_CONSTANTS.UNDEFINED_STR||SN.Utils.undefinedOrNull(sessionStorage))return;try{window.addEventListener?window.addEventListener("unload",saveOnExit,!1):document.addEventListener?document.addEventListener("unload",saveOnExit,!1):window.attachEvent&&window.attachEvent("onunload",saveOnExit);var oldEventData=eval("("+sessionStorage.getItem("sn.tdata")+")");copyParams(oldEventData,eventStorage),sendAll()}catch(err){SN.Logger.consoleLog("SN.Tracker:Error in accessing old session data "+err)}}function sendAll(){for(var a in eventStorage){var b=eventStorage[a],c;b[CONST_RETRY_COUNT]<MAX_RETRY_COUNT?(new Date).getTime()-b[CONST_REQUEST_TIME]>CONST_TIME_OUT&&(b[CONST_REQUEST_TIME]=(new Date).getTime(),b[CONST_RETRY_COUNT]=b[CONST_RETRY_COUNT]+1,SN.Logger.consoleLog("SN.Tracker:Retrying It, retry count ="+b[CONST_RETRY_COUNT]+", request id ="+a),c=b[CONST_TRACKING_SECURED],makeTrackingCall(getDefaultUrl(c),b[CONST_REQUEST_PARAM])):(SN.Logger.consoleLog("SN.Tracker:Removing event data , retry count ="+b[CONST_RETRY_COUNT]+", request id :"+a),delete eventStorage[a],updateStatus(a,"FAILED"))}}function makeTrackingCall(a,b){sseq++;var c="pt"+sseq,d=document.getElementsByTagName("head").item(0),e=document.createElement("script");e.type="text/javascript",e.id=c,e.src=appendUrlParams(a,c,b),e.async=!0;for(var f in SN.Conf.japCharMap)e.src=replaceAllInString(e.src,f,SN.Conf.japCharMap[f]);void d.appendChild(e)}function replaceAllInString(a,b,c,d){return a.replace(new RegExp(b.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),d?"gi":"g"),typeof c=="string"?c.replace(/\$/g,"$$$$"):c)}function processResponse(a){SN.Logger.consoleLog("SN.Tracker: Processing response"),SN.Utils.undefinedOrNull(a.code)||(SN.Logger.consoleLog("SN.Tracker: Got error response for r="+a.r+" with error code= "+a.code),SN.Utils.undefinedOrNull(eventStorage[a.r])||(delete eventStorage[a.r],updateStatus(a.r,"FAILED"))),SN.Utils.undefinedOrNull(eventStorage[a.r])?SN.Logger.consoleLog("SN.Tracker: Got success response for req ="+a.r+" , but the response is already processed , so ignoring it"):(SN.Logger.consoleLog("SN.Tracker: Got success response for req ="+a.r+" ,  removing it"),delete eventStorage[a.r],updateStatus(a.r))}function removeElement(a){var b=document.getElementById(a);if(b){var c=document.getElementsByTagName("head").item(0);setTimeout(function(){try{c.removeChild(b)}catch(a){SN.Logger.consoleLog("Could not remove pxt.js in 247px.js. "+a)}},2e3)}}function getSessionData(){var a=document.getElementById("sn_iframe");if(SN.Utils.undefinedOrNull(a)){a=window;if(!SN.Utils.undefinedOrNull(a.SN.StoreManager)&&!SN.Utils.undefinedOrNull(a.SN.StoreManager.getDOMData)){var b=a.SN.StoreManager.getDOMData("custom_sessionData");return b}return null}a=a.contentWindow;var c,d,b={},e="-";SN.Utils.undefinedOrNull(vi)&&(vi=a.SN.StoreManager.getValueFromStore("sn.vi","vi")),b.vi=vi;var f=a.SN.StoreManager.getValueFromStore("sn.vi","sp");if(SN.Utils.undefinedOrNull(vg)||SN.Utils.undefinedOrNull(tp)||SN.Utils.undefinedOrNull(ti)||SN.Utils.undefinedOrNull(rt)||SN.Utils.undefinedOrNull(rv))vg=a.SN.StoreManager.getValueFromStore("sn.as","vg"),ti=a.SN.StoreManager.getValueFromStore("sn.as","ti"),tp=a.SN.StoreManager.getValueFromStore("sn.as","tp"),rt=a.SN.StoreManager.getValueFromStore("sn.rn","rt"),rv=a.SN.StoreManager.getValueFromStore("sn.rn","rv");b.vg=vg,b.ti=ti,b.tp=tp,b.rt=rt,b.rv=rv,d=a.SN.StoreManager.getValueFromStore("sn.as","a"),c=a.SN.StoreManager.getValueFromStore("sn.vi","as"),SN.Utils.undefinedOrNull(c)||(d!="t"?b.as=(parseInt(c)+1).toString():b.as=c.toString()),b.v=SN.Conf.CONST_PSP_VERSION,bsid=a.SN.StoreManager.getValueFromStore("sn.vi","vi")+e+b.as,b.bsid=bsid,b.up=getUniquePageId();var g=a.SN.StoreManager.getValueFromStore("sn.vi","it");return g==null&&(g=0),b.it=g,tseq++,b.tseq=tseq,b}function createMetaData(){var a={};return a.key=SN.Conf.CONST_PSP_KEY,a}function constructAndMakeTrackingCall(a,b,c,d){SN.Utils.undefinedOrNull(c)||(statusTracker=c),SN.Utils.undefinedOrNull(a)&&(a=createMetaData());var e=getDefaultUrl(d),f=getSessionData();b.vp=SN.Conf.PXOE_VERSION,b.vt=SN.Conf.TRACKING_VERSION,b.tnt=SN.Conf.tnt,b.vc=SN.Conf.CONST_CDN_VERSION,copyParams(f,b),SN.Utils.undefinedOrNull(b.f)&&(b.f={}),SN.Utils.undefinedOrNull(b.f.v)&&(b.f.v={}),b.f.v.br=uAParser.getBrowserDetails(),b.f.v.dd=uAParser.getDeviceDetails(),currDate=new Date,b.f.v.tz=currDate.getTimezoneOffset();var g=getUniqueId(),h=createTrackingData(b),i=h.length;status[g]=i;var j=1;while(h.length>0){var k={};k[CONST_REQUEST_ID]=g+"-"+i+"-"+j,j++;try{copyParams(a,k),k[CONST_TRACKING_DATA]=h.shift(),save(k,d),SN.Logger.consoleLog("SN.Tracker: Got an event, assigning request id = "+k[CONST_REQUEST_ID]),makeTrackingCall(e,k)}catch(l){SN.Logger.consoleLog("SN.Tracker:Exception while sending event data. request id:"+k[CONST_REQUEST_ID]+" "+l)}}return g}function save(a,b){var c={};c[CONST_REQUEST_PARAM]=a,c[CONST_REQUEST_TIME]=(new Date).getTime(),c[CONST_RETRY_COUNT]=1,c[CONST_TRACKING_SECURED]=b,eventStorage[a[CONST_REQUEST_ID]]=c,SN.Logger.consoleLog("SN.Tracker: Successfully saved the request, req id = "+a[CONST_REQUEST_ID])}function getDefaultUrl(a){return!SN.Utils.undefinedOrNull(a)&&a?"https://"+SN.Conf.CONST_PSP_ROOT+"/psp/"+SN.Conf.CONST_PSP_KEY+"/"+SN.Conf.CONST_PSP_VERSION+"/pxt.js?":document.location.protocol+"//"+SN.Conf.CONST_PSP_ROOT+"/psp/"+SN.Conf.CONST_PSP_KEY+"/"+SN.Conf.CONST_PSP_VERSION+"/pxt.js?"}function createTrackingData(a){var b={};b.e=a;var c=JSON_247.stringify(b),d=[];for(var e=0;e<c.length;e+=MAX_URL_SIZE){var f=e+MAX_URL_SIZE;c.length<=e+MAX_URL_SIZE&&(f=c.length),d.push(c.substring(e,f))}return d}function isIE(){return navigator.userAgent.indexOf(CONST_IE)!=-1?!0:!1}function isSafari(){return navigator.userAgent.indexOf(CONST_SAFARI)!=-1?!0:!1}function evaluate(inputExp){var result={};for(var property in inputExp)try{var value=eval(inputExp[property]);value!=null&&value!=SN_CONSTANTS.UNDEFINED_STR&&value!="null"&&(result[property]=eval(inputExp[property]))}catch(err){SN.Logger.consoleLog("PS: error in getting value for: "+property+" "+err)}return result}function getUniqueId(){return Math.random().toString().substring(2,18)+"-"+(new Date).getTime()}function getUniquePageId(){return uniquePageId}function appendUrlParams(a,b,c){var d=a.length>0&&a.charAt(a.length-1)!="?";d==1?a+="&":d=!0,a+="sId="+b;for(var e in c)d==1?a+="&":d=!0,typeof c[e]=="object"?a+=e+"="+encodeURIComponent(JSON_247.stringify(c[e])):a+=e+"="+encodeURIComponent(c[e]);return a}function copyParams(a,b){if(SN.Utils.undefinedOrNull(a))return;for(var c in a)SN.Utils.undefinedOrNull(a[c])||(b[c]=a[c])}function retrieveEventRequestId(a){var b=a.split("-");return b[0]+"-"+b[1]}function updateStatus(a,b){try{var c=retrieveEventRequestId(a);if(SN.Utils.undefinedOrNull(status[c]))return;if(!SN.Utils.undefinedOrNull(b)){SN.Utils.undefinedOrNull(statusTracker)||statusTracker.call(this,c,b),delete status[c];return}status[c]=status[c]-1,status[c]==0&&(SN.Utils.undefinedOrNull(statusTracker)||statusTracker.call(this,c,"SUCCESS"),delete status[c])}catch(d){SN.Logger.consoleLog("SN.Tracker: Error while updating the status for request id ="+a+" "+d)}}function setWowpxSessionData(a,b,c,d,e,f){!SN.Utils.undefinedOrNull(a)&&!SN.Utils.undefinedOrNull(b)&&!SN.Utils.undefinedOrNull(c)&&(vg=a,tp=b,ti=c),SN.Utils.undefinedOrNull(d)||(d="wowpx_"+d),!SN.Utils.undefinedOrNull(e)&&!SN.Utils.undefinedOrNull(f)&&(rt=e,rv=f)}var SN_CONSTANTS=SN.Constants,uAParser=SN.UserAgentParser,fsmMap=SN.Conf.FSM,ed=SN.Conf.ED,CONST_REQUEST_ID="r",CONST_TRACKING_DATA="d",CONST_IE="MSIE",CONST_SAFARI="Safari",CONST_RETRY_COUNT="retryCount",CONST_REQUEST_TIME="requestTime",CONST_REQUEST_PARAM="requestParam",CONST_TRACKING_SECURED="trackingSecured",eventStorage={},pspVersion=SN.Conf.CONST_PSP_VERSION,CONST_POLLING_TIME_INTERVAL=3e3,MAX_RETRY_COUNT=3,CONST_TIME_OUT=2e3,tseq=-1,sseq=-1,uniquePageId=(new Date).getTime(),vi,bsid,MAX_URL_SIZE,statusTracker,status={},vg,tp,ti,rt,rv;return init(),{constructAndMakeTrackingCall:constructAndMakeTrackingCall,processResponse:processResponse,removeElement:removeElement,getUniquePageId:getUniquePageId,setWowpxSessionData:setWowpxSessionData}}(),SN.Custom=SN.Custom||{},SN.Custom.XdDataHandler=function(a){var b="wowpxstatechangeevent",c="wowpxtrackingevent",d="trackingEvent",e="customEvent",f={};if(a.data==null||typeof a.data=="undefined")a.data={};a.data.force=!0;var g="sn_iframe",h=document.getElementById(g);if(h){var i=h.contentWindow||h.contentDocument;i&&i.SN&&i.SN.EventManager&&(a.eventType==d?i.SN.EventManager.fire(c,{sr:a.source,eventId:a.eventId,x:a.ex,agentId:a.agentId,formId:a.formId,fireImmediately:!0,data:a.data}):a.eventType==e&&i.SN.EventManager.fire(b,{sr:a.source,eventId:a.eventId,x:a.ex,agentId:a.agentId,formId:a.formId,fireImmediately:!0,data:a.data}))}},XD=function(){function b(b,c){var d=a[b]||null;return a[b]=c,d}function c(b,c){var d=a[b];d&&d(c)}function d(){typeof console!="undefined"&&console.error(arguments)}var a={};return{registerListener:b,process:c}}(),XD.registerListener("https://d1af033869koo7.cloudfront.net",SN.Custom.XdDataHandler),XD.registerListener("http://d1af033869koo7.cloudfront.net",SN.Custom.XdDataHandler),typeof SN=="undefined"&&(SN={}),SN.MetaLayer=function(){function c(){try{a.hasOwnProperty("sc-meta-layer/javascript/metaLayer")&&a.hasOwnProperty("eventmanager")&&require(["sc-meta-layer/javascript/metaLayer","eventmanager"],function(a,b){function c(){var a=d();document.getElementById("sn_iframe").contentWindow.SN.CustomScript.fireStateChangeEvent(a)}function d(){var b={};return b.catName=a.get("catName"),b.catId=a.get("catId"),b.parentCatName=a.get("parentCatName"),b.uberCatName=a.get("uberCatName"),b}a&&b.on("checkoutStateChange",c)})}catch(b){}}function d(b){try{a.hasOwnProperty("sc-meta-layer/javascript/metaLayer")&&require(["sc-meta-layer/javascript/metaLayer"],function(a){return a?a.get(b):""})}catch(c){}}try{var a=require.s.contexts._.defined}catch(b){}return{bindStateChangeEvent:c,getPageContextVars:d}}(),typeof SN=="undefined"&&(SN={});try{var randStr=(new String((new Date).getTime())).valueOf()+"-"+Math.floor(Math.random()*1e6);window.pspSNTrackingId=randStr}catch(err){typeof console!=undefined&&SN.Logger.consoleLog("Error: Unable to generate unique id for custom events "+err)}SN.Tag=function(){function l(){var a=new Image;a.style.display="none";var b=SN.Conf.CONST_PSP_ROOT;a.src="https://"+b+"/spacer.gif";try{var c=document.getElementsByTagName("head").item(0);void c.appendChild(a)}catch(d){typeof console!=undefined&&SN.Logger.consoleLog("Error while loading image "+d)}}function m(i,j){if(document.getElementById(b)!=null){SN.loadTrackingScript("Not loading again as sn_iframe already present in page(url : "+location.href,null,"",SN.Conf.CUSTOM_TRACK_SERVER,SN.Conf.CONST_PSP_KEY,SN.Constants.LOGLEVEL_INFO);return}l();var k=document.createElement(a);k.style.width=c,k.style.height=d,k.style.border=e,k.style.position=f,k.style.top=h,k.style.left=g,k.async=!0,k.id=b;var m=document.getElementsByTagName("script")[0];m.parentNode.insertBefore(k,m);var n="//"+SN.Conf.CDN_DOMAIN+SN.Conf.CONST_PSP_KEY+"/"+j+"/"+i+"/"+SN.Conf.CONST_PXFWK_ID,o=document.domain,p=!1;try{doc=k.contentWindow.document}catch(q){p=!0,k.src="javascript:var d=document.open();d.domain='"+o+"';void(0);",doc=k.contentWindow.document}doc.open()._l=function(){var a=this.createElement("script");p&&(this.domain=o),a.id="js-iframe-async",a.src=n,this.getElementsByTagName("head")[0].appendChild(a)},doc.write('<!DOCTYPE html><html><head></head><body onload="document._l();"></body></html>'),doc.close()}function n(){if(!SN.Utils.undefinedOrNull(i))return i=="true";if(!navigator.cookieEnabled){SN.loadTrackingScript("cookies disabled because of which localstorage doesn't work",null,"",SN.Conf.CUSTOM_TRACK_SERVER,SN.Conf.CONST_PSP_KEY,SN.Constants.LOGLEVEL_ERROR);return}return window.localStorage&&(i=window.localStorage.getItem(SN.Constants.IS_CUSTOM_TRACKING_ENABLED)),SN.Utils.undefinedOrNull(i)&&(Math.floor(Math.random()*100)<=SN.Conf.CUSTOM_TRACKING_PERCENTAGE?i="true":i="false",window.localStorage&&window.localStorage.setItem(SN.Constants.IS_CUSTOM_TRACKING_ENABLED,i)),i=="true"}function o(){window.localStorage&&navigator.geolocation&&SN.UserAgentParser.getBrowserDetails().indexOf("i~8")==-1&&navigator.geolocation.getCurrentPosition(function(b){window.localStorage.setItem(SN.Constants.BROWSER_GEO_LOCATION,"lat||"+b.coords.latitude+"~long||"+b.coords.longitude)},function(b){switch(b.code){case b.PERMISSION_DENIED:window.localStorage.setItem(SN.Constants.BROWSER_GEO_LOCATION,"err||pd");break;case b.POSITION_UNAVAILABLE:window.localStorage.setItem(SN.Constants.BROWSER_GEO_LOCATION,"err||pu");break;case b.TIMEOUT:window.localStorage.setItem(SN.Constants.BROWSER_GEO_LOCATION,"err||to");break;case b.UNKNOWN_ERROR:window.localStorage.setItem(SN.Constants.BROWSER_GEO_LOCATION,"err||ue")}},{timeout:SN.Conf.timeOutForBrowserGeoLocation})}var a="iframe",b="sn_iframe",c="0px",d="0px",e="0px",f="absolute",g="-50px",h="-50px",i=null,j=document.domain,k="";n(),SN.Conf.browserGeoLocationFlag&&o();var p={createSNIframeOnHead:m};return p}();if(!SN)var SN={};SN.CustomDecisionServer=function(){function j(a){return a==null||typeof a=="undefined"||typeof a==null}function k(b){a=b}function l(){var k=new Date;k=new Date(k.getTime()-(a.tzoffset-k.getTimezoneOffset())*60*1e3);var l=k.getHours()*100+k.getMinutes(),m=SN.Store.get(g);if(l>a.start&&l<a.stop){var n=SN.Store.get(h);if(!j(n))b=n;else{var o=parseInt(Math.random().toString().substring(2,4));o<a.offpeakbypass?b=e:b=f}}else if(!j(m))b=f;else{var n=SN.Store.get(h);if(!j(n))b=n;else{var o=parseInt(Math.random().toString().substring(2,4));o<SN.Conf.BYPASS_PERCENTAGE?b=e:b=f}}return SN.Store.set(h,b),b==f&&(d=i,c=SN.Conf.CONST_CDN_VERSION),{decision:b,pspVersion:d,cdnVersion:c}}var a=null,b=null,c=null,d=null,e="b",f="a",g="sn.vi",h="sn.ds",i="d";SN.Store=function(){function c(a,b){return j(b)?encodeURIComponent(a):encodeURIComponent(b)+encodeURIComponent(a)}function d(c,d){return j(a)?null:j(b)?a.setItem(c,d):a.setItem(c(b,c),d)}function e(c){return j(a)?null:j(b)?a.getItem(c):a.getItem(c(b,c))}var a=window.sessionStorage,b=null,f={get:e,set:d};return f}();var m={init:k,getDecision:l};return m}(),typeof SN=="undefined"&&(SN={}),SN.ResourceLoader=function(){function s(){typeof c=="undefined"||SN.Utils.undefinedOrNull(c)?(r.consoleLog("decision doesn't exist, getting decision !!"),t()):c==a?typeof f=="undefined"||SN.Utils.undefinedOrNull(f)||typeof g=="undefined"||SN.Utils.undefinedOrNull(g)?(typeof console!="undefined"&&SN.Logger.consoleLog("decision exists but not pspversion or cdnversion, getting decision !!"),t()):SN.Tag.createSNIframeOnHead(g,q[f]):r.consoleLog("Decision != active, not initializing framework")}function t(){try{var d=Math.random().toString().substring(2,4);d<SN.Conf.BYPASS_PERCENTAGE?c=b:c=a,c==a&&(d=Math.random().toString().substring(2,4),d=parseInt(d),d<SN.Conf.TEST_PERCENTAGE?(f="t",SN.Conf.CONST_PSP_VERSION="test"):(f="d",SN.Conf.CONST_PSP_VERSION="default")),g=SN.Conf.CONST_CDN_VERSION,s()}catch(e){r.consoleLog("Error while processing decision",e)}}function u(a){var b=a.split(".");for(var c in b)b[c]=parseInt(b[c]);return b}function v(a,b){var c=u(a),d=u(b),e=c.length;c.length>d.length&&(e=d.length);for(var f=0;f<e;f++){if(c[f]>d[f])return!0;if(c[f]<d[f])return!1}if(f==e)return!0}function w(){try{var a=SN.UserAgentParser,b;for(var c in a.browserList)if(a.isBrowser(c)==1){b=a.browserList[c].getVersion();if(v(b,a.browserList[c].lowestSupportedVersion)){for(var d in a.browserList[c].blacklistedVersions)if(b==a.browserList[c].blacklistedVersions[d])return!1;return!0}return!1}return!1}catch(e){return r.consoleLog("Error while evaluating isBrowserSupported:"+e),!1}}function x(){try{var a=SN.UserAgentParser.getOSType();return SN.Utils.undefinedOrNull(a)?!1:SN.UserAgentParser.isBrowser("Firefox")&&a.indexOf("Android-not found")!=-1?!1:a.indexOf("-bv")==a.length-3?!1:!0}catch(b){return r.consoleLog("Error while evaluating isOSSupported:",b),!0}}function y(a,b){var c=a.length>0&&a.charAt(a.length-1)!="?";for(var d in b)c==1?a+="&":c=!0,typeof b[d]=="object"||z(b)?a+=d+"="+encodeURIComponent(JSON_247.stringify(b[d])):a+=d+"="+encodeURIComponent(b[d]);return a}function z(a){return a.constructor==Array}function A(){if(!w()||!navigator.cookieEnabled||!x()){try{var a=SN.UserAgentParser,b={},d={};d[l]=p,d[i]=navigator.userAgent,d[j]=navigator.cookieEnabled,d[m]=o,d[k]=a.getBrowserLanguage(),d[n]=document.referrer;var e={key:SN.Conf.CONST_PSP_KEY};b[h]=d,SN.Tracker.constructAndMakeTrackingCall(e,d)}catch(q){SN.Logger.consoleLog("Error while making a tracking call: "+q)}return}if(!SN.Conf.IS_DS_REQUIRED){SN.Tag.createSNIframeOnHead(SN.Conf.CONST_CDN_VERSION,SN.Conf.CONST_PSP_VERSION);return}var r=function(){var a=new Date,b=new Date(a.getFullYear(),0,1),c=new Date(a.getFullYear(),6,1),d=Math.max(b.getTimezoneOffset(),c.getTimezoneOffset());return a.getTimezoneOffset()<d}();SN.CustomDecisionServer.init({start:SN.Conf.PEAK_HOUR_START,stop:SN.Conf.PEAK_HOUR_STOP,tzoffset:r?300:360,offpeakbypass:SN.Conf.OFFPEAK_BYPASS});var t=SN.CustomDecisionServer.getDecision();c=t.decision,f=t.pspVersion,g=t.cdnVersion,s()}var a="a",b="b",c=null,d="Windows",e="MacOS",f="default",g=null,h="e",i="bd",j="ce",k="bl",l="si",m="ec",n="rf",o="500001",p="ENVNOTSUPPORTED",q={t:"test",d:"default"},r=SN.Logger;A()}()