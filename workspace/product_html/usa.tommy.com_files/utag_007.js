//tealium universal tag - utag.24 ut4.0.201304061331, Copyright 2013 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.qsp_delim="&";u.kvp_delim="=";u.adid="tommy";u.format="image";u.base_url="//pm.dp.yieldmanager.net/";u.revenue="";u.map={};u.extend=[];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!="undefined"){for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}}
c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u[e[f]]=b[d];}}}
c.push("adId="+u.adid);c.push("format="+u.format);if((typeof b._corder!="undefined"&&b._corder)||u.revenue){u.base_url+="ConversionMonkey?";if(u.revenue==""){u.revenue=b._csubtotal};c.push("revenue="+u.revenue);}else{u.base_url+="PixelMonkey?";c.push("useReferrer=1");}
if(u.format=="image"){u.img=new Image();u.img.src=u.base_url+c.join(u.qsp_delim);}else{d=document.createElement("iframe");d.setAttribute('id','24');d.setAttribute('height','1');d.setAttribute('width','1');d.setAttribute('style','display:none');d.setAttribute('src',u.base_url+c.join(u.qsp_delim));document.body.appendChild(d);}}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('24','pvh.tommyna');}catch(e){}
