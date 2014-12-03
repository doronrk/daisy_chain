//tealium universal tag - utag.42 ut4.0.201408261630, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var criteo_q=criteo_q||[];try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState==='complete'||this.readyState==='loaded')&&!b.hFlag){b.hFlag=1;o.cb();}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb();}};}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1};u.initialized=false;u.known_params={"product":1,"product.id":1,"product.price":1,"product.quantity":1,"event":1,"requiresDOM":1,"account":1,"keywords":1,"checkin_date":1,"checkout_date":1,"new_customer":1,"deduplication":1};u.map={"criteo_event":"event","_ccustid":"customer_id","site_type":"site_type","search_term":"keywords"};u.extend=[function(a,b){if(b['page_type'].toString().toLowerCase()=='home'.toLowerCase()){b['criteo_event']='viewHome'}},function(a,b){if(b['page_type'].toString().toLowerCase()=='product'.toLowerCase()){b['criteo_event']='viewItem'}},function(a,b){if(b['page_type'].toString().toLowerCase()=='category'.toLowerCase()){b['criteo_event']='viewList'}},function(a,b){if(b['page_type'].toString().toLowerCase()=='cart'.toLowerCase()){b['criteo_event']='viewBasket'}},function(a,b){if(b['is_mobile'].toString().toLowerCase()=='true'.toLowerCase()){b['site_type']='m'}},function(a,b){if(b['is_mobile'].toString().toLowerCase()=='false'.toLowerCase()){b['site_type']='d'}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f;u.data={"base_url":"//static.criteo.net/js/ld/ld.js"||"//static.criteo.net/js/ld/ld.js","account":"15438","event":"viewHome","deduplication":1,"new_customer":"","keywords":"","setData":{"site_type":"d"},"order_id":"","product_id":[],"product_quantity":[],"product_unit_price":[]};var t_criteo_q=[];for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};c=[];for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(!u.known_params[e[f]]){u.data.setData[e[f]]=b[d];}else{u.data[e[f]]=b[d];}}}}
u.data.order_id=u.data.order_id||b._corder;if(u.data.product_id.length===0&&b._cprod!==undefined){u.data.product_id=b._cprod.slice(0);}
if(u.data.product_quantity.length===0&&b._cquan!==undefined){u.data.product_quantity=b._cquan.slice(0);}
if(u.data.product_unit_price.length===0&&b._cprice!==undefined){u.data.product_unit_price=b._cprice.slice(0);}
t_criteo_q.push({event:"setAccount",account:parseInt(u.data.account)});for(d in u.data.setData){c={event:"setData"};c[d]=u.data.setData[d];t_criteo_q.push(c);}
u.data.transaction_id=u.data.transaction_id||u.data.order_id;u.data.product_id=u.data["product.id"]||u.data.product_id;u.data.product_unit_price=u.data["product.price"]||u.data.product_unit_price;u.data.product_quantity=u.data["product.quantity"]||u.data.product_quantity;if(u.data.transaction_id){u.data.event="";f={event:"trackTransaction",id:u.data.transaction_id,new_customer:u.data.new_customer,deduplication:u.data.deduplication,product:[]};for(d=0;d<u.data.product_id.length;d++){f.product.push({id:u.data.product_id[d],price:u.data.product_unit_price[d],quantity:u.data.product_quantity[d]});}
t_criteo_q.push(f)}
if(u.data.event.indexOf("viewHome")>-1){t_criteo_q.push({event:"viewHome"})}
if(u.data.event.indexOf("viewItem")>-1){u.data.product_id=u.data["product.id"]||u.data.product_id[0];t_criteo_q.push({event:"viewItem",product:u.data.product_id});}
if(u.data.event.indexOf("viewList")>-1){t_criteo_q.push({event:"viewList",product:u.data.product_id,keywords:u.data.keywords});}
if(u.data.event.indexOf("viewBasket")>-1){f={event:"viewBasket",product:[]};for(d=0;d<u.data.product_id.length;d++){f.product.push({id:u.data.product_id[d],price:u.data.product_unit_price[d],quantity:u.data.product_quantity[d]});}
t_criteo_q.push(f)}
if(u.data.event.indexOf("viewSearch")>-1){t_criteo_q.push({event:"viewSearch",checkin_date:u.data.checkin_date||"",checkout_date:u.data.checkout_date||""});}
criteo_q.push(t_criteo_q);u.loader_cb=function(){u.initialized=true;};if(!u.initialized){u.loader({"type":"script","src":u.data.base_url,"cb":u.loader_cb,"loc":"script","id":'utag_42'});}
}};utag.o[loader].loader.LOAD(id);}('42','hott.torrid'));}catch(error){utag.DB(error);}
