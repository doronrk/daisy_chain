//tealium universal tag - utag.22 ut4.0.201406251900, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.qsp_delim="&";u.kvp_delim="=";u.pl="pdj";u.sid="629";u.name="";u.cat="";u.base_url="//pixel.fetchback.com/serve/fb/"+u.pl+"?";u.map={"_fb_browse_products":"browse_products","_fb_abandon_products":"abandon_products","_fb_key":"fb_key"};u.extend=[function(a,b){if((b['page_type'].toString().toLowerCase()=='product'.toLowerCase()&&typeof b['product_id']!='undefined')){try{b['_fb_browse_products']=b['product_id'][0]}catch(e){}}},function(a,b){if((b['page_type'].toString().toLowerCase()=='cart'.toLowerCase()&&typeof b['product_id']!='undefined')){try{b['_fb_abandon_products']=b['product_id'].join(",")}catch(e){}}},function(a,b){if(1){b['_fb_key']='optout'}}];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!="undefined"){u.data={name:"",cat:"",sid:u.sid};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=encodeURIComponent(b[d])}}}
if(typeof b._corder!="undefined"&&b._corder){u.data.purchase_products=u.data.purchase_products||b._cprod.slice(0);if(u.data.name==""){u.data.name="success"};u.data.crv=u.data.crv||b._csubtotal;u.data.oid=u.data.oid||b._corder;}else{if(u.data.name==""){u.data.name="landing"};}
c.push("cat="+u.data.cat);c.push("name="+u.data.name);c.push("sid="+u.data.sid);for(e in u.data){if(e!="cat"&&e!="name"&&e!="sid"){c.push(e+"="+((u.data[e]instanceof Array)?u.data[e].join(','):u.data[e]))}}
d=document.createElement("iframe");d.setAttribute('id','22');d.setAttribute('height','1');d.setAttribute('width','1');d.setAttribute('style','display:none');d.setAttribute('src',u.base_url+c.join(u.qsp_delim));document.body.appendChild(d);}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('22','calendars.com.main');}catch(e){}
