//tealium universal tag - utag.55 ut4.0.201411171913, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var criteo_q=criteo_q||[];try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState==='complete'||this.readyState==='loaded')&&!b.hFlag){b.hFlag=1;o.cb();}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb();}};}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1};u.initialized=false;u.known_params={"product":1,"product.id":1,"product.price":1,"product.quantity":1,"event":1,"requiresDOM":1,"account":1,"keywords":1,"checkin_date":1,"checkout_date":1,"new_customer":1,"deduplication":1};u.map={"customer_id":"customer_id","criteo_site_type":"site_type","search_keyword":"keywords","criteo_event":"event","product_quantity":"product.quantity","trans_first_order_flag":"new_customer","criteo_nc":"new_customer","criteo_dd":"deduplication","product_organic_skus":"p","product_web_id":"product.id","cart_grand_total":"shopping_cart_total","product_sale_price":"product.price"};u.extend=[function(a,b){if(1){b['criteo_site_type']='d'}},function(a,b,c,d,e,f,g){d=b['page_type'];if(typeof d=='undefined')return;c=[{'Home':'viewHome'},{'Product':'viewItem'},{'Category':'viewList'},{'Checkout':'viewBasket'},{'Search':'viewSearch'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['criteo_event']=c[e][f];m=true};};if(m)break};if(!m)b['criteo_event']='';},function(a,b){if(typeof b['cp.criteo_one_bac']=='undefined'){b['criteo_dd']='0'}},function(a,b){if(b['page_name']=='ShoppingCheckoutStep3'){b['criteo_event']='trackTransaction'}},function(a,b){if(typeof b.page_type!='undefined'&&b.page_type=='product'){if(typeof b.product_id!='undefined'&&b.product_id instanceof array&&b.product_id.length>0){b.product_id=b.product_id[0];}}},function(a,b){if(typeof b._cprod!='undefined'&&b._cprod.length==1&&typeof b.page_type!='undefined'&&b.page_type=="Product"){b._cprod=b._cprod[0];}},function(a,b){if(1){b['criteo_nc']='0'}},function(a,b){if(b['trans_first_order_flag']=='Y'){b['criteo_nc']='1'}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f;u.data={"base_url":""||"//static.criteo.net/js/ld/ld.js","account":"1822","event":"viewHome","deduplication":1,"new_customer":"","keywords":"","setData":{"site_type":"d"},"order_id":"","product_id":[],"product_quantity":[],"product_unit_price":[]};var t_criteo_q=[];for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};c=[];for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(!u.known_params[e[f]]){u.data.setData[e[f]]=b[d];}else{u.data[e[f]]=b[d];}}}}
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
if(u.data.event.indexOf("viewSearch")>-1){t_criteo_q.push({event:"viewSearch"});}
criteo_q.push(t_criteo_q);u.loader_cb=function(){u.initialized=true;};if(!u.initialized){u.loader({"type":"script","src":u.data.base_url,"cb":u.loader_cb,"loc":"script","id":'utag_55'});}
}};utag.o[loader].loader.LOAD(id);}('55','newegg.newegg.com'));}catch(error){utag.DB(error);}
