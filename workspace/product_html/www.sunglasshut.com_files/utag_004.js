//tealium universal tag - utag.185 ut4.0.201403131246, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.data=[];u.qsp_delim="&";u.kvp_delim="=";u.cid="sunglasshut";u.base_url="//clients.pointroll.com/clients/"+u.cid+"/rt/cookie.ashx?";u.map={"page_type":"param1","product_id":"param2","page_name":"param3","product_name":"param4","page_subcategory_name":"param5","product_brand":"param6"};u.extend=[function(a,b){if(b['page_type'].toString().toLowerCase()=='catalog'.toLowerCase()){b['product_brand']=b['page_subcategory_name']}}];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!="undefined"){for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data.push(encodeURIComponent(b[d]))}}else{u.data.push("");}}
c.push("data="+u.data.join('|'));u.img=new Image();u.img.src=u.base_url+c.join(u.qsp_delim);}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('185','luxottica.sunglasshutnew');}catch(e){}
