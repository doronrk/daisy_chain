//tealium universal tag - utag.20 ut4.0.201404162019, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader,u){u=utag.o[loader].sender[id]={};u.ev={'view':1};u.data={};u.data.pid="60000646";u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){var c,d,e,f;c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
window._caq=window._caq||[];if(typeof utag_data.trans_orders!="undefined"&&utag_data.trans_orders.length>=1){for(o=0;o<utag_data.trans_orders.length;o++){u.data.orderId=utag_data.trans_orders[o].order_id;u.data.products=[];u.data.sku=utag_data.trans_orders[o].product_id||[];u.data.price=utag_data.trans_orders[o].product_price||[];u.data.quan=utag_data.trans_orders[o].product_quantity||[];u.data.revenue=utag_data.trans_orders[o].order_merchandise_total;u.data.currency=u.data.currency||b._ccurrency;for(var i=0;i<u.data.sku.length;i++){u.data.products.push({Sku:u.data.sku[i],UnitPrice:u.data.price[i],Quantity:u.data.quan[i]});}
window._caq.push(["Order",{OrderId:u.data.orderId,Revenue:u.data.revenue,CurrencyCode:u.data.currency,Products:u.data.products}]);}}
u.base_url="//t.channeladvisor.com/v2/"+u.data.pid+".js";u.s=document.getElementsByTagName("script")[0];u.scr=document.createElement("script");u.scr.type="text/javascript";u.scr.src=u.base_url;u.s.parentNode.insertBefore(u.scr,u.s);}}
utag.o[loader].loader.LOAD(id);})('20','qvc.qvcus');}catch(e){}