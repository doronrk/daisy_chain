//tealium universal tag - utag.50 ut4.0.201312061732, Copyright 2013 Tealium.com Inc. All Rights Reserved.
var WRInitTime=(new Date()).getTime();if(!utag.libloader){utag.libloader=function(src,handler,a,b){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=src;if(typeof handler=='function'){b.handlerFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.handlerFlag){b.handlerFlag=1;handler()}};b.onload=function(){if(!b.handlerFlag){b.handlerFlag=1;handler()}};a.getElementsByTagName('head')[0].appendChild(b)}}};var ClickTaleSSL=1;try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.projectid='50146';u.recordingratio='.02';u.partitiontoken='www';u.base_url=((document.location.protocol=="https:")?"https://clicktale.pantherssl.com/":"http://s.clicktale.net/")+"WRe5.js";u.map={};u.extend=[];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!='undefined'){c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u[e[f]]=b[d];}}}
try{e=document.createElement('div');e.setAttribute('id','ClickTaleDiv');e.setAttribute('style','display:none');document.getElementsByTagName('body')[0].appendChild(e);}catch(e){};u.tealium_ClickTale_callback=function(){if(!document.getElementById('ClickTaleDiv')){try{var e=document.createElement('div');e.setAttribute('id','ClickTaleDiv');e.setAttribute('style','display:none');document.getElementsByTagName('body')[0].appendChild(e);}catch(e){};}
var ClickTaleSSL=1;ClickTaleFetchFromWithCookies.setFromCookie("JSESSIONID");ClickTaleFetchFromWithCookies.setFromCookie(/^WC_USERACTIVITY*/);ClickTaleFetchFromWithCookies.setFromCookie(/^WC_AUTHENTICATION*/);ClickTaleFetchFromWithCookies.setFromCookie(/^WC_AUTHENTICATION*/);ClickTaleFetchFrom=ClickTaleFetchFromWithCookies.constructFetchFromUrl();if(typeof ClickTale=='function'){ClickTale(u.projectid,u.recordingratio,u.partitiontoken);}
if(typeof ClickTaleEvent=='function'&&u.ClickTaleEvent){ClickTaleEvent(u.ClickTaleEvent);}}
utag.libloader(u.base_url,u.tealium_ClickTale_callback);}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('50','allenedmonds.main');}catch(e){}