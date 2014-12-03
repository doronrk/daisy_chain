//tealium universal tag - utag.57 ut4.0.201402201604, Copyright 2014 Tealium.com Inc. All Rights Reserved.
if(typeof utag.ut=="undefined"){utag.ut={};}
utag.ut.libloader2=function(o,a,b,c,l){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=o.src;if(o.id){b.id=o.id};if(typeof o.cb=='function'){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb()}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb()}}}
l=o.loc||'head';c=a.getElementsByTagName(l)[0];if(c){if(l=='script'){c.parentNode.insertBefore(b,c);}else{c.appendChild(b)}
utag.DB("Attach to "+l+": "+o.src)}}
window._fbds=window._fbds||{};try{(function(id,loader,u){u=utag.o[loader].sender[id]={};u.ev={'view':1};u.initialized=false;u.data={};u.data.pixel_id="246375125542897";u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){var c,d,e,f;c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f].indexOf("event.")==0){c.push(b[d]);}else{u.data[e[f]]=b[d];}}}}
window._fbds.pixelId=u.data.pixel_id;u.callback=function(){if(!u.initialized){window._fbq.push(["track","PixelInitialized",{}]);}
for(var i=0;i<c.length;i++){window._fbq.push(c[i]);}};u.data.base_url=u.data.base_url||"//connect.facebook.net/en_US/fbds.js";if(!u.initialized){utag.ut.libloader2({src:u.data.base_url,cb:u.callback});}else{u.callback;}
}}
utag.o[loader].loader.LOAD(id);})('57','finishline.main');}catch(e){}
