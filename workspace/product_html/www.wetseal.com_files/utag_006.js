//tealium universal tag - utag.9 ut4.0.201408011629, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var criteo_q=criteo_q||[];try{(function(id,loader,u){u=utag.o[loader].sender[id]={};u.ev={'view':1,'link':1};u.data={};u.data.account="11265";u.data.event="viewHome";u.data.deduplication=1;u.data.new_customer="";u.data.keywords="";u.initialized=false;u.base_url=""||"//static.criteo.net/js/ld/ld.js";u.known_params={"product":1,"product.id":1,"product.price":1,"product.quantity":1,"event":1,"requiresDOM":1,"account":1,"keywords":1,"checkin_date":1,"checkout_date":1,"new_customer":1,"deduplication":1};u.map={"customer_id":"customer_id","crt_page_type":"event"};u.extend=[function(a,b,c,d,e,f,g){d=b['page_type'];if(typeof d=='undefined')return;c=[{'category':'viewList'},{'product':'viewItem'},{'search':'viewSearch'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['crt_page_type']=c[e][f];m=true};};if(m)break};if(!m)b['crt_page_type']='';},function(a,b){if(b['page_context_type']=='cart'){b['crt_page_type']='viewBasket'}}];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){var t_criteo_q=[];u.data.setData={site_type:"d"};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};var c,d,e,f;for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(!u.known_params[e[f]]){u.data.setData[e[f]]=b[d];}else{u.data[e[f]]=b[d];}}}}
t_criteo_q.push({event:"setAccount",account:parseInt(u.data.account)});for(d in u.data.setData){c={event:"setData"};c[d]=u.data.setData[d];t_criteo_q.push(c);}
u.data.transaction_id=u.data.transaction_id||b._corder;if(u.data.transaction_id){u.data.event="";u.data["product.id"]=u.data["product.id"]||b._cprod.slice(0);u.data["product.price"]=u.data["product.price"]||b._cprice.slice(0);u.data["product.quantity"]=u.data["product.quantity"]||b._cquan.slice(0);f={event:"trackTransaction",id:u.data.transaction_id,new_customer:u.data.new_customer,deduplication:u.data.deduplication,product:[]};for(d=0;d<u.data["product.id"].length;d++){f.product.push({id:u.data["product.id"][d],price:u.data["product.price"][d],quantity:u.data["product.quantity"][d]});}
t_criteo_q.push(f)}
if(u.data.event.indexOf("viewHome")>-1){t_criteo_q.push({event:"viewHome"})}
if(u.data.event.indexOf("viewItem")>-1){u.data["product.id"]=u.data["product.id"]||b._cprod.slice(0);t_criteo_q.push({event:"viewItem",product:u.data["product.id"]});}
if(u.data.event.indexOf("viewList")>-1){u.data["product.id"]=u.data["product.id"]||b._cprod.slice(0);t_criteo_q.push({event:"viewList",product:u.data["product.id"],keywords:u.data.keywords});}
if(u.data.event.indexOf("viewBasket")>-1){u.data["product.id"]=u.data["product.id"]||b._cprod.slice(0);u.data["product.price"]=u.data["product.price"]||b._cprice.slice(0);u.data["product.quantity"]=u.data["product.quantity"]||b._cquan.slice(0);f={event:"viewBasket",product:[]};for(d=0;d<u.data["product.id"].length;d++){f.product.push({id:u.data["product.id"][d],price:u.data["product.price"][d],quantity:u.data["product.quantity"][d]});}
t_criteo_q.push(f)}
if(u.data.event.indexOf("viewSearch")>-1){u.data.product=u.data.product||u.data["product.id"]||b._cprod.slice(0);t_criteo_q.push({event:"viewSearch",checkin_date:u.data.checkin_date||"",checkout_date:u.data.checkout_date||""});}
criteo_q.push(t_criteo_q);if(!u.initialized){u.initialized=true;u.s=document.getElementsByTagName("script")[0];u.scr=document.createElement("script");u.scr.type="text/javascript";u.scr.src=u.base_url;u.s.parentNode.insertBefore(u.scr,u.s);}}}
utag.o[loader].loader.LOAD(id);})('9','wetseal.main');}catch(e){}