//tealium universal tag - utag.19 ut4.0.201409221408, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader,u){u=utag.o[loader].sender[id]={};u.ev={'view':1};u.data={};u.data.tagtype="retargeting";u.base_url="//dyau9xqp8gzji.cloudfront.net/autotag.js";u.map={"dom.url":"adextent_dynads_url"};u.extend=[];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){var c,d,e,f;c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
if(u.data.tagtype=="conversion"){window.dynadshost=(("https:"==document.location.protocol)?"https://ssl.":"http://dynads.");u.base_url=dynadshost+"adextent.com/ansn-creative/dynads/ServeS3.ashx/autotag-event.js";}else if(u.data.tagtype=="cart"){window.adextent_dynads_url=u.data.adextent_dynads_url;}
u.s=document.getElementsByTagName("script")[0];u.scr=document.createElement("script");u.scr.type="text/javascript";u.scr.src=u.base_url;u.s.parentNode.insertBefore(u.scr,u.s);}}
utag.o[loader].loader.LOAD(id);})('19','mattel.americangirl');}catch(e){}