//tealium universal tag - utag.40 ut4.0.201411171721, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState==='complete'||this.readyState==='loaded')&&!b.hFlag){b.hFlag=1;o.cb();}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb();}};}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1,'link':1};u.map={"non_pi_user_id":"u15,u16","dc_sku":"u4","dc_name":"u10","dc_dept":"u11","dc_cat":"u12"};u.extend=[function(a,b){if(b.product_sku&&b.product_sku.length>0){b.dc_sku="";for(var j=0;j<b.product_sku.length;j++){b.dc_sku+=b.product_sku[j]+"|";}
b.dc_sku=b.dc_sku.substring(0,b.dc_sku.length-1);if(b.order_promo_name){b.dc_sku+="|Discount";}}
if(b.product_quantity){b.dc_quan="";for(var k=0;k<b.product_quantity.length;k++){b.dc_quan+=b.product_quantity[k]+"|";}
b.dc_quan=b.dc_quan.substring(0,b.dc_quan.length-1);b.dc_quan+="|0";}
if(b.product_name&&b.product_name.length>0){b.dc_name="";for(var m=0;m<b.product_name.length;m++){b.dc_name+=b.product_name[m]+"|";}
b.dc_name=b.dc_name.substring(0,b.dc_sku.name-1);if(b.order_promo_name){b.dc_name+="|Discount";}}
if(b.product_department){b.dc_dept="";for(var n=0;n<b.product_department.length;n++){b.dc_dept+=b.product_department[n]+"|";}
b.dc_dept=b.dc_dept.substring(0,b.dc_dept.length-1);}
if(b.product_category){b.dc_cat="";for(var p=0;p<b.product_category.length;p++){b.dc_cat+=b.product_category[p]+"|";}
b.dc_cat=b.dc_cat.substring(0,b.dc_cat.length-1);}},function(a,b){if(!b.event_type||b.event_type!="add_to_cart"){return false;}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,g;u.data={"qsp_delim":";","kvp_delim":"=","base_url":"","src":"3014299","type":"HBI","cat":"HBIaddto","multicat":"","ord":"","cost":"","qty":0,"total_qty":0,"countertype":"standard","order_id":"","order_subtotal":"","product_id":[],"product_quantity":[],"product_unit_price":[]};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};c=[];g=[];for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(/^(cat|multicat|type|src|cost|qty|ord|order_id|order_subtotal|product_id|product_quantity|product_unit_price)$/.test(e[f])){u.data[e[f]]=b[d];}else{u.data[e[f]]=b[d];g.push(e[f]+u.data.kvp_delim+encodeURIComponent(b[d]))}}}}
u.data.order_id=u.data.order_id||u.data.ord||b._corder;u.data.order_subtotal=u.data.cost||u.data.order_subtotal||b._csubtotal||b._ctotal;if(u.data.product_id.length===0&&b._cprod!==undefined){u.data.product_id=b._cprod.slice(0);}
if((u.data.qty&&u.data.qty.length>0)||(u.data.product_quantity.length===0&&b._cquan!==undefined)){u.data.product_quantity=u.data.qty||b._cquan.slice(0);}
if(u.data.product_unit_price.length===0&&b._cprice!==undefined){u.data.product_unit_price=b._cprice.slice(0);}
u.data.base_url='//'+u.data.src+'.fls.doubleclick.net/activityi;src='+u.data.src+';type='+u.data.type+';';if(u.data.multicat===""){u.data.multicat_arr=[u.data.cat];}else{u.data.multicat_arr=u.data.multicat.split(';');}
if(u.data.order_id){if(u.data.total_qty===0&&u.data.product_quantity.length>0){for(f=0;f<u.data.product_quantity.length;f++){u.data.total_qty+=parseInt(u.data.product_quantity[f]);}}
if(u.data.total_qty===0){u.data.total_qty=1;}
var dc_fl_prd=[];for(var i=0;i<u.data.product_id.length;i++){var prod_num=i+1;dc_fl_prd.push("i"+prod_num+":"+u.data.product_id[i]+"|p"+prod_num+":"+u.data.product_unit_price[i]+"|q"+prod_num+":"+u.data.product_quantity[i])}
u.prd=dc_fl_prd.join('|');if(u.prd){c.push("prd="+u.prd);}
c.push('qty='+(u.data.total_qty));c.push('cost='+(u.data.order_subtotal));if(g.length>0){c.push(g.join(';'));}
c.push('ord='+(u.data.order_id));}else if(u.data.countertype==='standard'){if(g.length>0){c.push(g.join(';'));}
c.push('ord='+(Math.random()*10000000000000));}else if(u.data.countertype==='unique'){if(g.length>0){c.push(g.join(';'));}
c.push('ord=1');c.push('num='+(Math.random()*10000000000000));}else{if(g.length>0){c.push(g.join(';'));}
c.push('ord='+(u.data.order_id?u.data.order_id:window.utag.data['cp.utag_main_ses_id']));}
u.loader_cb=function(){};for(f=0;f<u.data.multicat_arr.length;f++){u.loader({"type":"iframe","src":u.data.base_url+'cat='+u.data.multicat_arr[f]+((c.length>0)?';'+c.join(u.data.qsp_delim):'')+'?',"cb":u.loader_cb,"loc":"body","id":'utag_40_iframe'});}}};utag.o[loader].loader.LOAD(id);}('40','hanes.main'));}catch(error){utag.DB(error);}
