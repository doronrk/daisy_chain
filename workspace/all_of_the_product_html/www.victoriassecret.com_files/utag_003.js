//tealium universal tag - utag.27 ut4.0.201410171629, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState==='complete'||this.readyState==='loaded')&&!b.hFlag){b.hFlag=1;o.cb();}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb();}};}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1};u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f;u.data={"qsp_delim":"&","kvp_delim":"=","base_url":(document.location.protocol==="https:"?"//cts-secure":"//cts")+".channelintelligence.com/tt.js","vid":"435825510","associationtime":"","order_id":"","product_id":[],"product_quantity":[],"product_unit_price":[]};c=[];for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
u.data.order_id=u.data.order_id||b._corder;if(u.data.product_id.length===0&&b._cprod!==undefined){u.data.product_id=b._cprod.slice(0);}
if(u.data.product_quantity.length===0&&b._cquan!==undefined){u.data.product_quantity=b._cquan.slice(0);}
if(u.data.product_unit_price.length===0&&b._cprice!==undefined){u.data.product_unit_price=b._cprice.slice(0);}
window.CI_VID=u.data.vid;if(u.data.order_id!==""){window.CI_OrderID=u.data.CI_order_ID||u.data.order_id;window.CI_ItemIDs=u.data.CI_ItemIDs||u.data.product_id;window.CI_ItemQtys=u.data.CI_ItemQtys||u.data.product_quantity;window.CI_ItemPrices=u.data.CI_ItemPrices||u.data.product_unit_price;}else{window.CI_AssociationTime=u.data.associationtime;}
u.loader_cb=function(){};u.loader({"type":"script","src":u.data.base_url,"cb":u.loader_cb,"loc":"script","id":'utag_27'});}};utag.o[loader].loader.LOAD(id);}('27','victoriassecret.main'));}catch(error){utag.DB(error);}