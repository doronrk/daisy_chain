var MP={Version:"1.0.23",Domains:{fr:"fr.origins.com"},SrcLang:"en",UrlLang:"mp_js_current_lang",SrcUrl:decodeURIComponent("mp_js_orgin_url"),init:function(){if(MP.UrlLang.indexOf("p_js_")==1){MP.SrcUrl=window.top.document.location.href;MP.UrlLang=MP.SrcLang}},getCookie:function(b){var c=document.cookie.indexOf(b+"=");if(c<0){return null}c=c+b.length+1;var a=document.cookie.indexOf(";",c);if(a<0){a=document.cookie.length}while(document.cookie.charAt(c)==" "){c++}return decodeURIComponent(document.cookie.substring(c,a))},setCookie:function(b,e,f,d){var c=b+"="+encodeURIComponent(e);if(f){c+="; path="+f}if(d){c+="; domain="+d}var a=new Date();a.setTime(a.getTime()+1000*60*60*24*365);c+="; expires="+a.toUTCString();document.cookie=c},switchLanguage:function(b){if(b!=MP.SrcLang){var a=document.createElement("SCRIPT");a.src=location.protocol+"//"+MP.Domains[b]+"/"+MP.SrcLang+b+"/?1023749632;"+encodeURIComponent(MP.SrcUrl);document.body.appendChild(a)}else{if(b==MP.SrcLang&&MP.UrlLang!=MP.SrcLang){var a=document.createElement("SCRIPT");a.src=location.protocol+"//"+MP.Domains[MP.UrlLang]+"/"+MP.SrcLang+MP.UrlLang+"/?1023749634;"+encodeURIComponent(location.href);document.body.appendChild(a)}}return false},switchToLang:function(a){if(MP.UrlLang=="fr"){var b="";var c=a.split("?");if(typeof c[1]=="undefined"){b="?LOCALE=en_CA"}else{if(c[1]&&c[1].indexOf("LOCALE=en_CA")==-1){b="&LOCALE=en_CA"}}a+=b}if(MP.UrlLang=="en"){a=MP.removeURLParameter(a,"LOCALE")}window.top.location.href=a},removeURLParameter:function(a,f){var d=a.split("?");if(d.length>=2){var e=encodeURIComponent(f)+"=";var c=d[1].split(/[&;]/g);for(var b=c.length;b-->0;){if(c[b].lastIndexOf(e,0)!==-1){c.splice(b,1)}}if(c.length>=1){a=d[0]+"?"+c.join("&")}else{a=d[0]}return a}else{return a}}};