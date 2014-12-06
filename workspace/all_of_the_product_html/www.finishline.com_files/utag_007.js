//tealium universal tag - utag.68 ut4.0.201408012022, Copyright 2014 Tealium.com Inc. All Rights Reserved.
if(typeof utag.ut=="undefined"){utag.ut={};}
utag.ut.libloader2=function(o,a,b,c,l){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=o.src;if(o.id){b.id=o.id};if(typeof o.cb=='function'){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb()}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb()}}}
l=o.loc||'head';c=a.getElementsByTagName(l)[0];if(c){if(l=='script'){c.parentNode.insertBefore(b,c);}else{c.appendChild(b)}
utag.DB("Attach to "+l+": "+o.src)}}
try{(function(id,loader,u){u=utag.o[loader].sender[id]={};u.ev={'view':1};u.initialized=false;u.map={"_twitter_pid":"pid"};u.extend=[function(a,b,c,d,e,f,g){d=b['dom.url'];if(typeof d=='undefined')return;c=[{'http://www.finishline.com/store/shop/sale/mens-sale/_/N-33if9?categoryId=cat301719':'l4omi'},{'http://www.finishline.com/store/shop/sale/mens-sale/_/N-33if9?categoryId=cat301719':'l4omk'},{'http://www.finishline.com/store/shop/men/shoes/_/N-33id6?categoryId=cat301564':'l4oml'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['_twitter_pid']=c[e][f];m=true};};if(m)break};if(!m)b['_twitter_pid']='';}];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){var c,d,e,f;u.data={"pid":"l4jb1","base_url":"//platform.twitter.com/oct.js",}
for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
u.twitter_callback=function(){u.initialized=true;twttr.conversion.trackPid(u.data.pid);};if(!u.initialized){utag.ut.libloader2({src:u.data.base_url,cb:u.twitter_callback});}else{u.twitter_callback();}
}}
utag.o[loader].loader.LOAD(id);})('68','finishline.main');}catch(e){}
