//tealium universal tag - utag.8 ut4.0.201409120141, Copyright 2014 Tealium.com Inc. All Rights Reserved.
if(typeof utag.ut=="undefined"){utag.ut={};}
utag.ut.libloader2=function(o,a,b,c,l){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=o.src;if(o.id){b.id=o.id};if(typeof o.cb=='function'){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb()}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb()}}}
l=o.loc||'head';c=a.getElementsByTagName(l)[0];if(c){if(l=='script'){c.parentNode.insertBefore(b,c);}else{c.appendChild(b)}
utag.DB("Attach to "+l+": "+o.src)}}
try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.partnerid="30393";u.type="hp";u.base_url="//img.pulsemgr.com/script/pm/100/";u.map={"pty":"pty","product_sku":"pid"};u.extend=[function(a,b,c,d,e,f,g){d=b['page_type'];if(typeof d=='undefined')return;c=[{'home':'hp'},{'category':'cp'},{'product':'pp'},{'checkout':'ct'},{'thankyou':'cfp'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['pty']=c[e][f];m=true};};if(m)break};if(!m)b['pty']='';}];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){var c,d,e,f,g;c=[];g={};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f]=='pty'){u.type=b[d]}else if(e[f]=="pid"||e[f]=="cid"||e[f]=="partnerid"){u[e[f]]=b[d];}else{g[e[f]]=b[d];}}}}
u.adr_callback=function(){pulse.setPartnerId(u.partnerid);pulse.setSite(utag.loader.lh());pulse.set('prf',b['dom.referrer']);u.pid=u.pid||b._cprod||[];u.cid=u.cid||b._ccat||[];if(b._corder){u.type="cfp";pulse.set('onm',b._corder);pulse.set('ovl',b._csubtotal);pulse.set('pce','1');}else{pulse.set('pce','0');}
pulse.set('pty',u.type);if(u.cid instanceof Array){for(d=0;d<u.cid.length;d++){pulse.add('cid',u.cid[d]);}}else if(u.cid){pulse.add('cid',u.cid);}
if(u.pid instanceof Array){for(d=0;d<u.pid.length;d++){pulse.add('pid',u.pid[d]);}}else if(u.pid){pulse.add('pid',u.pid);}
for(var key in g){pulse.set(key,g[key]);}
pulse.pulse();}
utag.ut.libloader2({src:u.base_url,cb:u.adr_callback});}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('8','victoriassecret.main');}catch(e){}
