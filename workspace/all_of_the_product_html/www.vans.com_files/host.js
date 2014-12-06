var PDJS=(function(){var e="Copying Prohibited by Law - McAfee SECURE is a Trademark of McAfee, Inc.";var h="bottom";var j="right";
var E=0;function D(){try{if(!document.body){if(E<10){window.setTimeout(function(){D()},1000)}E++;return}if(z("disablefloat")){return
}var M=q("floatcorner",1);if(M==0){return}var N=124;var S=55;var K="//cdn.ywxi.net/tm/img/badge01.png?h=www.vans.com&d="+r();
var Q=z("disablefloathover",0);if(m()||o()[0]<320||o()[1]<320){Q=1}var O=q("floatYoffset",10);var R=q("floatXoffset",10);
var L="position:fixed;cursor:pointer;border:0;padding:0;margin:0;z-index:"+q("floatzindex",998)+";";if(M==2){j="left";L+="bottom:"+O+"px;";
L+="left:"+R+"px;"}else{if(M==4){h="top";j="left";L+="top:"+O+"px;";L+="left:"+R+"px;"}else{if(M==3){h="top";L+="top:"+O+"px;";
L+="right:"+R+"px;"}else{L+="bottom:"+O+"px;";L+="right:"+R+"px;"}}}var T=document.createElement("a");T.style.cursor="pointer";
T.innerHTML='<img id="pd-float-tm" width="'+N+'" height="'+S+'" src="'+K+'" style="'+L+'" oncontextmenu="alert(\'Copying Prohibited by Law - McAfee SECURE is a Trademark of McAfee, Inc.\'); return false;">';
if(Q){T.onclick=w}else{T.onclick=l;T.onmouseover=G}if(document.body){document.body.appendChild(T);document.getElementById("pd-float-tm").style.boxShadow="0px 0px 20px rgba(0, 0, 0, 0.20)"
}else{I("mfes body not ready")}}catch(P){I(P)}if(m()){F();pd_onscroll(function(){F()})}}function F(){if(!m()){return}try{var M=document.getElementById("pd-float-tm");
if(M){M.style.zoom=((window.innerWidth)/(screen.width))*0.7}var L=document.getElementById("pd_mouseOverWin");if(L){L.style.zoom=((window.innerWidth)/(screen.width))*0.7
}}catch(K){}}function A(){try{if(typeof document.getElementsByClassName!="function"){return}var K=document.getElementsByClassName("pd-mfes-trustmark");
if(K){for(var L=0;L<K.length;L++){var O=K[L];O.style.cursor="pointer";O.onclick=w;var N=O.getAttribute("data-pd-style");var M=parseInt(O.getAttribute("data-pd-hover"));
if(N==1||N==2||N==3){var Q="//cdn.ywxi.net/tm/img/badge-mfes-"+N+".png?h=www.vans.com&d="+r();O.oncontextmenu=function(){alert(e);
return false};O.style.backgroundImage="url("+Q+")"}else{O.innerHTML="Invalid Style"}if(isNaN(M)||M==1){O.onmouseover=function(){}
}}}}catch(P){I(P)}}function t(K){try{ga("send","event","McAfeeSECURE",K)}catch(L){}}function f(){if(m()){window.open("https://www.mcafeesecure.com/verify-float?host=www.vans.com")
}else{window.open("https://www.mcafeesecure.com/verify?host=www.vans.com")}}function n(){window.open("https://www.mcafeesecure.com/verify-float?host=www.vans.com")
}function z(L,K){if((typeof PDOPTS!="undefined")&&(typeof PDOPTS[L]!="undefined")){return PDOPTS[L]}if(typeof K!="undefined"){return K
}return 0}function q(L,K){if(typeof PDOPTS!="undefined"&&typeof PDOPTS[L]!="undefined"){return PDOPTS[L]}return K}function r(){var K=new Date();
return K.getFullYear()+""+(K.getMonth()<9?"0":"")+(K.getMonth()+1)+(K.getDay()<10?"0":"")+K.getDay()}function l(){if(m()){w();
return}b();var K=document.getElementById("pd_mouseOverWin");if(K&&K.style.display!="none"){k()}else{G()}}function G(){if(x()){return
}if(z("disablefloathover",0)){return}b();try{var K=d();B(K);K.pdHideOnScroll=0;K.style[h]="80px";K.style[j]="10px";if(a(K)==1){K.style.display="";
t("hover")}}catch(L){I(L)}}var c=0;function C(){c=window.setTimeout(function(){var K=document.getElementById("pd_mouseOverWin");
k();b()},1000)}function k(){var K=document.getElementById("pd_mouseOverWin");if(K){K.style.display="none";K.pdHideOnScroll=0
}}function b(){window.clearTimeout(c)}function d(){var K=document.getElementById("pd_mouseOverWin");if(!K){K=document.createElement("div");
K.style.display="none";K.id="pd_mouseOverWin";K.style.position="fixed";K.style.width="330px";K.style.height="340px";K.style.backgroundColor="#fff";
K.style.boxShadow="0 7px 27px rgba(0, 0, 0, 0.45)";K.style.borderRadius="3px";K.style.overflow="hidden";K.style.padding="0px";
K.style.margin="0px";K.style.zIndex=q("floatzindex",998);K.onmouseout=C;K.onmouseover=b;K.innerHTML='<div style="background:#f2f2f2;"><table style="border:0;margin:0;" width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td style="text-align:left;padding:5px;"><a href="https://www.mcafeesecure.com/" target="_blank"><img border="0" style="border:0;margin:0;padding:0;outline:0;box-shadow:none;" src="//cdn.ywxi.net/static/img/vh_logo.png" width="145" height="30"></a></td><td style="padding:0;" width="30"><div style="cursor:pointer;transition: background 0.2s;width:30px;height:30px;background:url(//cdn.ywxi.net/static/img/vh_close_button.png) no-repeat center center;" id="pd_mouseOverWin_x"></td></tr></table></div><iframe src="https://www.mcafeesecure.com/verify-float?width=330&height=300&host=www.vans.com" frameborder="0" scrolling="no" style="border:0;width:330px;height:300px;"></iframe>';
document.body.appendChild(K);var L=document.getElementById("pd_mouseOverWin_x");if(L){L.onclick=k;L.onmouseover=function(){L.style.backgroundImage="url(//cdn.ywxi.net/static/img/vh_close_button_hover.png)"
};L.onmouseout=function(){L.style.backgroundImage="url(//cdn.ywxi.net/static/img/vh_close_button.png)"}}}return K}function w(){t("click");
if(m()){window.open("https://www.mcafeesecure.com/verify-mobile?host=www.vans.com")}else{window.open("https://www.mcafeesecure.com/verify?host=www.vans.com")
}}function y(){try{if(typeof document.getElementsByClassName!="function"){return}pd_onscroll(function(){var M=document.getElementById("pd_mouseOverWin");
if(M&&M.pdHideOnScroll==1){k()}});var K=document.getElementsByClassName("mfes-trustmark-hover");console.log(K.length);if(K){for(i in K){K[i].onmouseover=function(N){var M=d();
M.style.display="none";B(M);M.style.top=(N.clientY-N.offsetY+20)+"px";M.style.left=(N.clientX-N.offsetX+20)+"px";if(a(M)==0){M.style.top=(N.clientY-N.offsetY+35-parseInt(M.style.height))+"px";
M.style.left=(N.clientX-N.offsetX+20)+"px";if(a(M)==0){M.style.top=(N.clientY-N.offsetY+35-parseInt(M.style.height))+"px";
M.style.left=(N.clientX-N.offsetX+104-parseInt(M.style.width))+"px";if(a(M)==0){M.style.top=(N.clientY-N.offsetY+20)+"px";
M.style.left=(N.clientX-N.offsetX+104-parseInt(M.style.width))+"px";if(a(M)==0){B(M);M.style.display="none";return}}}}t("hover");
M.pdHideOnScroll=1;M.style.display=""}}}}catch(L){}}function o(){var L=window,O=document,N=O.documentElement,M=O.getElementsByTagName("body")[0],K=L.innerWidth||N.clientWidth||M.clientWidth,P=L.innerHeight||N.clientHeight||M.clientHeight;
return[K,P]}function B(K){K.style.left="";K.style.top="";K.style.right="";K.style.bottom=""}function a(O){var M=parseInt(O.style.top);
if(M<0){return 0}var L=parseInt(O.style.left);if(L<0){return 0}var K=parseInt(O.style.width);if(L+K>o()[0]){return 0}var N=parseInt(O.style.height);
if(M+N>o()[1]){return 0}return 1}function x(){return 0}function m(){return navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)
}var J=-2;function s(){if(J==-2){J=-1;if(navigator.appName=="Microsoft Internet Explorer"){var L=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
var K=L.exec(navigator.userAgent);if(K&&K.length>1){J=parseFloat(K[1])}}}return J}function I(K){try{console.log(K)}catch(L){}}function H(L){try{var K=document.createElement("script");
K.setAttribute("type","text/javascript");K.setAttribute("src",L);document.getElementsByTagName("head")[0].appendChild(K)}catch(M){}}function p(K){var N="";
var L="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(var M=0;M<K;M++){N+=L.charAt(Math.floor(Math.random()*L.length))
}return N}function v(){document.cookie="__verify=1";var K=document.cookie.length>1&&document.cookie.indexOf("__verify=1")>-1;
document.cookie="__verify=1;expires="+new Date(2000,1,1).toUTCString();return K}function g(L,O,M){if(M){var N=new Date();
N.setTime(N.getTime()+(M*24*60*60*1000));var K="expires="+N.toGMTString();document.cookie=L+"="+O+"; path=/;"+K}else{document.cookie=L+"="+O+"; path=/;"
}}function u(M){var L=M+"=";var K=document.cookie.split(";");for(var N=0;N<K.length;N++){var O=pd_trim(K[N]);if(O.indexOf(L)==0){return O.substring(L.length,O.length)
}}return""}D();A();y()});function pd_trim(a){if(!a){return""}return new String(a).trim()}function pd_onload(a){var b=window.onload;
if(typeof window.onload!="function"){window.onload=a}else{window.onload=function(){if(b){b()}a()}}}function pd_onscroll(a){var b=window.onscroll;
if(typeof window.onscroll!="function"){window.onscroll=a}else{window.onscroll=function(){if(b){b()}a()}}}if(typeof window.PDJS_loaded=="undefined"){window.PDJS_loaded=1;
window.PDJS=PDJS()};