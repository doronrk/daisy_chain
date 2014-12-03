var PDJS=(function(){var o="Copying Prohibited by Law - McAfee SECURE is a Trademark of McAfee, Inc.";var j="bottom";var k="right";
var s=0;function y(){try{if(!document.body){if(s<10){window.setTimeout(function(){y()},1000)}s++;return}if(b("disablefloat")){return
}var N=p("floatcorner",1);if(N==0){return}var O=124;var T=55;var L="//cdn.ywxi.net/tm/img/badge01.png?h=www.fatbraintoys.com&d="+H();
var R=b("disablefloathover",0);if(e()||F()[0]<320||F()[1]<320){R=1}var P=p("floatYoffset",10);var S=p("floatXoffset",10);
var M="position:fixed;cursor:pointer;border:0;padding:0;margin:0;z-index:"+p("floatzindex",998)+";";if(N==2){k="left";M+="bottom:"+P+"px;";
M+="left:"+S+"px;"}else{if(N==4){j="top";k="left";M+="top:"+P+"px;";M+="left:"+S+"px;"}else{if(N==3){j="top";M+="top:"+P+"px;";
M+="right:"+S+"px;"}else{M+="bottom:"+P+"px;";M+="right:"+S+"px;"}}}var U=document.createElement("a");U.style.cursor="pointer";
U.innerHTML='<img id="pd-float-tm" width="'+O+'" height="'+T+'" src="'+L+'" style="'+M+'" oncontextmenu="alert(\'Copying Prohibited by Law - McAfee SECURE is a Trademark of McAfee, Inc.\'); return false;">';
if(R){U.onclick=D}else{U.onclick=z;U.onmouseover=f}if(document.body){document.body.appendChild(U);document.getElementById("pd-float-tm").style.boxShadow="0px 0px 20px rgba(0, 0, 0, 0.20)"
}else{a("mfes body not ready")}}catch(Q){a(Q)}if(e()){x();pd_onscroll(function(){x()})}}function x(){if(!e()){return}try{var N=document.getElementById("pd-float-tm");
if(N){N.style.zoom=((window.innerWidth)/(screen.width))*0.7}var M=document.getElementById("pd_mouseOverWin");if(M){M.style.zoom=((window.innerWidth)/(screen.width))*0.7
}}catch(L){}}function l(){try{if(typeof document.getElementsByClassName!="function"){return}var L=document.getElementsByClassName("pd-mfes-trustmark");
if(L){for(var M=0;M<L.length;M++){var P=L[M];P.style.cursor="pointer";P.onclick=D;var O=P.getAttribute("data-pd-style");var N=parseInt(P.getAttribute("data-pd-hover"));
if(O==1||O==2||O==3){var R="//cdn.ywxi.net/tm/img/badge-mfes-"+O+".png?h=www.fatbraintoys.com&d="+H();P.oncontextmenu=function(){alert(o);
return false};P.style.backgroundImage="url("+R+")"}else{P.innerHTML="Invalid Style"}if(isNaN(N)||N==1){P.onmouseover=function(){}
}}}}catch(Q){a(Q)}}function G(L){try{ga("send","event","McAfeeSECURE",L)}catch(M){}}function v(){if(e()){window.open("https://www.mcafeesecure.com/verify-float?host=www.fatbraintoys.com")
}else{window.open("https://www.mcafeesecure.com/verify?host=www.fatbraintoys.com")}}function J(){window.open("https://www.mcafeesecure.com/verify-float?host=www.fatbraintoys.com")
}function b(M,L){if((typeof PDOPTS!="undefined")&&(typeof PDOPTS[M]!="undefined")){return PDOPTS[M]}if(typeof L!="undefined"){return L
}return 0}function p(M,L){if(typeof PDOPTS!="undefined"&&typeof PDOPTS[M]!="undefined"){return PDOPTS[M]}return L}function H(){var L=new Date();
return L.getFullYear()+""+(L.getMonth()<9?"0":"")+(L.getMonth()+1)+(L.getDay()<10?"0":"")+L.getDay()}function z(){if(e()){D();
return}A();var L=document.getElementById("pd_mouseOverWin");if(L&&L.style.display!="none"){n()}else{f()}}function f(){if(t()){return
}if(b("disablefloathover",0)){return}A();try{var L=c();C(L);L.pdHideOnScroll=0;L.style[j]="80px";L.style[k]="10px";if(B(L)==1){L.style.display="";
G("hover")}}catch(M){a(M)}}var K=0;function u(){K=window.setTimeout(function(){var L=document.getElementById("pd_mouseOverWin");
n();A()},1000)}function n(){var L=document.getElementById("pd_mouseOverWin");if(L){L.style.display="none";L.pdHideOnScroll=0
}}function A(){window.clearTimeout(K)}function c(){var L=document.getElementById("pd_mouseOverWin");if(!L){L=document.createElement("div");
L.style.display="none";L.id="pd_mouseOverWin";L.style.position="fixed";L.style.width="330px";L.style.height="340px";L.style.backgroundColor="#fff";
L.style.boxShadow="0 7px 27px rgba(0, 0, 0, 0.45)";L.style.borderRadius="3px";L.style.overflow="hidden";L.style.padding="0px";
L.style.margin="0px";L.style.zIndex=p("floatzindex",998);L.onmouseout=u;L.onmouseover=A;L.innerHTML='<div style="background:#f2f2f2;"><table style="border:0;margin:0;" width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td style="text-align:left;padding:5px;"><a href="https://www.mcafeesecure.com/" target="_blank"><img border="0" style="border:0;margin:0;padding:0;outline:0;box-shadow:none;" src="//cdn.ywxi.net/static/img/vh_logo.png" width="145" height="30"></a></td><td style="padding:0;" width="30"><div style="cursor:pointer;transition: background 0.2s;width:30px;height:30px;background:url(//cdn.ywxi.net/static/img/vh_close_button.png) no-repeat center center;" id="pd_mouseOverWin_x"></td></tr></table></div><iframe src="https://www.mcafeesecure.com/verify-float?width=330&height=300&host=www.fatbraintoys.com" frameborder="0" scrolling="no" style="border:0;width:330px;height:300px;"></iframe>';
document.body.appendChild(L);var M=document.getElementById("pd_mouseOverWin_x");if(M){M.onclick=n;M.onmouseover=function(){M.style.backgroundImage="url(//cdn.ywxi.net/static/img/vh_close_button_hover.png)"
};M.onmouseout=function(){M.style.backgroundImage="url(//cdn.ywxi.net/static/img/vh_close_button.png)"}}}return L}function D(){G("click");
if(e()){window.open("https://www.mcafeesecure.com/verify-mobile?host=www.fatbraintoys.com")}else{window.open("https://www.mcafeesecure.com/verify?host=www.fatbraintoys.com")
}}function g(){try{if(typeof document.getElementsByClassName!="function"){return}pd_onscroll(function(){var N=document.getElementById("pd_mouseOverWin");
if(N&&N.pdHideOnScroll==1){n()}});var L=document.getElementsByClassName("mfes-trustmark-hover");console.log(L.length);if(L){for(i in L){L[i].onmouseover=function(O){var N=c();
N.style.display="none";C(N);N.style.top=(O.clientY-O.offsetY+20)+"px";N.style.left=(O.clientX-O.offsetX+20)+"px";if(B(N)==0){N.style.top=(O.clientY-O.offsetY+35-parseInt(N.style.height))+"px";
N.style.left=(O.clientX-O.offsetX+20)+"px";if(B(N)==0){N.style.top=(O.clientY-O.offsetY+35-parseInt(N.style.height))+"px";
N.style.left=(O.clientX-O.offsetX+104-parseInt(N.style.width))+"px";if(B(N)==0){N.style.top=(O.clientY-O.offsetY+20)+"px";
N.style.left=(O.clientX-O.offsetX+104-parseInt(N.style.width))+"px";if(B(N)==0){C(N);N.style.display="none";return}}}}G("hover");
N.pdHideOnScroll=1;N.style.display=""}}}}catch(M){}}function F(){var M=window,P=document,O=P.documentElement,N=P.getElementsByTagName("body")[0],L=M.innerWidth||O.clientWidth||N.clientWidth,Q=M.innerHeight||O.clientHeight||N.clientHeight;
return[L,Q]}function C(L){L.style.left="";L.style.top="";L.style.right="";L.style.bottom=""}function B(P){var N=parseInt(P.style.top);
if(N<0){return 0}var M=parseInt(P.style.left);if(M<0){return 0}var L=parseInt(P.style.width);if(M+L>F()[0]){return 0}var O=parseInt(P.style.height);
if(N+O>F()[1]){return 0}return 1}function t(){return 0}function e(){return navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)
}var h=-2;function m(){if(h==-2){h=-1;if(navigator.appName=="Microsoft Internet Explorer"){var M=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
var L=M.exec(navigator.userAgent);if(L&&L.length>1){h=parseFloat(L[1])}}}return h}function a(L){try{console.log(L)}catch(M){}}function w(){if(!window.chrome){return
}r("https://cdn.ywxi.net/static/js/suggestplugin.js")}function r(M){try{var L=document.createElement("script");L.setAttribute("type","text/javascript");
L.setAttribute("src",M);document.getElementsByTagName("head")[0].appendChild(L)}catch(N){}}function I(L){var O="";var M="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
for(var N=0;N<L;N++){O+=M.charAt(Math.floor(Math.random()*M.length))}return O}function q(){document.cookie="__verify=1";var L=document.cookie.length>1&&document.cookie.indexOf("__verify=1")>-1;
document.cookie="__verify=1;expires="+new Date(2000,1,1).toUTCString();return L}function E(M,P,N){if(N){var O=new Date();
O.setTime(O.getTime()+(N*24*60*60*1000));var L="expires="+O.toGMTString();document.cookie=M+"="+P+"; path=/;"+L}else{document.cookie=M+"="+P+"; path=/;"
}}function d(N){var M=N+"=";var L=document.cookie.split(";");for(var O=0;O<L.length;O++){var P=pd_trim(L[O]);if(P.indexOf(M)==0){return P.substring(M.length,P.length)
}}return""}y();l();w();g()});function pd_trim(a){if(!a){return""}return new String(a).trim()}function pd_onload(a){var b=window.onload;
if(typeof window.onload!="function"){window.onload=a}else{window.onload=function(){if(b){b()}a()}}}function pd_onscroll(a){var b=window.onscroll;
if(typeof window.onscroll!="function"){window.onscroll=a}else{window.onscroll=function(){if(b){b()}a()}}}if(typeof window.PDJS_loaded=="undefined"){window.PDJS_loaded=1;
window.PDJS=PDJS()};