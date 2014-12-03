//tealium universal tag - utag.47 ut4.0.201409051533, Copyright 2014 Tealium.com Inc. All Rights Reserved.
function callRTA(client){var elementRTA=document.createElement('DIV');try{rtaCart+='';}catch(err){rtaCart='';}
try{rtaCartSku+='';}catch(err){rtaCartSku='';}
try{rtaTags+='';}catch(err){rtaTags='';}
try{rtaProductSKU+='';}catch(err){rtaProductSKU='';}
try{rtaSort+='';}catch(err){rtaSort='';}
try{rtaFilters+='';}catch(err){rtaFilters='';}
try{rtaCartAddSKU+='';}catch(err){rtaCartAddSKU='';}
try{rtaSessionID+='';}catch(err){rtaSessionID='';}
try{rtaEmail+='';}catch(err){rtaEmail='';}
try{rtaConvertCart+='';}catch(err){rtaConvertCart='';}
try{rtaClearCart+='';}catch(err){rtaClearCart='';}
try{rtaProductList+='';}catch(err){rtaProductList='';}
try{rtaOrderNum+='';}catch(err){rtaOrderNum='';}
try{rtaCartAmounts+='';}catch(err){rtaCartAmounts='';}
try{rtaCartQuantities+='';}catch(err){rtaCartQuantities='';}
try{rtaReportingSegment1+='';}catch(err){rtaReportingSegment1='';}
try{rtaReportingSegment2+='';}catch(err){rtaReportingSegment2='';}
try{rtaRating+='';}catch(err){rtaRating='';}
try{rtaSearch+='';}catch(err){rtaSearch='';}
try{rtaUniqueId+='';}catch(err){rtaUniqueId='';}
try{if(rtaCategory){rtaSearch=rtaCategory;}}catch(err){}
try{rtaSpecial+='';}catch(err){rtaSpecial='';}
try{rtaCartValues+='';if(rtaCartValues!='')rtaCartAmounts=rtaCartValues;}catch(err){}
try{rtaRetailer+='';}catch(err){rtaRetailer='';}
protocolPrepend='http';if(document.location.protocol=='https:')protocolPrepend='https';var outstr='<img src="'+protocolPrepend+'://'+((typeof client!='undefined')?client+'.':'')+'collect.igodigital.com/collect/recordWithImage?u='+escape(window.location.href)+'&r='+escape(document.referrer)+'&t='+escape(rtaTitle)+'&c='+escape(rtaCart)+'&cart_skus='+escape(rtaCartSku)+'&w='+escape(rtaTags)+'&p='+escape(rtaProductSKU)+'&s='+escape(rtaSort)+'&f='+escape(rtaFilters)+'&a='+escape(rtaCartAddSKU)+'&e='+escape(rtaSessionID)+'&l='+escape(rtaProductList)+'&m='+escape(rtaEmail)+'&o='+escape(rtaOrderNum)+'&x='+escape(rtaConvertCart)+'&b='+escape(rtaCartAmounts)+'&z='+escape(rtaClearCart)+'&q='+escape(rtaCartQuantities)+'&j='+escape(rtaReportingSegment1)+'&k='+escape(rtaReportingSegment2)+'&d='+escape(rtaRating)+'&search='+escape(rtaSearch)+'&special='+escape(rtaSpecial)+'&retailer='+escape(rtaRetailer)+'">';elementRTA.setAttribute("style","position: absolute; width: 1px; height; 1px; top: -1px; left: -1px;");elementRTA.innerHTML=outstr;var bodyRef=document.getElementsByTagName("body").item(0);bodyRef.appendChild(elementRTA);}
try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.qsp_delim="&";u.kvp_delim="=";u.client="tommy";window.rtaRetailer=u.client;u.event_lookup={"prodview":1,"cartview":1};u.map={"customer_email":"rtaEmail","page_type_name":"rtaRetailer","page_type":"rtaReportingSegment1","page_name":"rtaCategory","igo_rtaspecial":"rtaSpecial","igo_rtaTags":"rtaTags"};u.extend=[function(a,b){if(b['page_division'].toString().toLowerCase()=='SHOP COMPANY STORE'.toLowerCase()){b['igo_rtaTags']='site=Outlet';b['igo_rtaspecial']='keepit'}},function(a,b){if(b['page_division'].toString().toLowerCase()!='SHOP COMPANY STORE'.toLowerCase()){b['igo_rtaTags']='site=Main';b['igo_rtaspecial']='keepit'}},function(a,b){if(typeof b.page_name!=='undefined'&&b.page_name.indexOf(' & ')>-1){b.page_name=b.page_name.replace(/ & /g,' AND ');}
if(typeof b.page_name!=='undefined'&&b.page_name.indexOf(':')>-1){b.page_name=b.page_name.replace(/:/g,'>');}
if(typeof document.title!=='undefined'&&document.title.indexOf(' & ')>-1){document.title=document.title.replace(/ & /g,' AND ');}},function(a,b){if(b['page_type'].toString().toLowerCase()=='department'.toLowerCase()||b['page_type'].toString().toLowerCase()=='subcategory'.toLowerCase()){b['_csku']='[]'}},function(a,b){if(typeof b._csku!='undefined'){rtaProductSKU=b._csku.join('|');}}];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};var c,d,e,f,g;for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){window[e[f]]=b[d];}}else{c=d.split(":");if(c.length==2&&b[c[0]]==c[1]){g=""+u.event_lookup[u.map[d]];if(g!=""){b._cevent=u.map[d]}}}}
var w=window;w.rtaUniqueId=w.rtaUniqueId||b._ccustid;if(b._corder){w.rtaConvertCart="1";}
if(typeof w.rtaCart!="undefined"&&!(w.rtaCart instanceof Array)){w.rtaCart=w.rtaCart.split(',').join("|");}
if(typeof w.rtaCartSku!="undefined"&&!(w.rtaCartSku instanceof Array)){w.rtaCartSku=w.rtaCartSku.split(',').join("|");}
if(typeof w.rtaCartAmounts!="undefined"&&!(w.rtaCartAmounts instanceof Array)){w.rtaCartAmounts=w.rtaCartAmounts.split(',').join("|");}
if(typeof w.rtaCartQuantities!="undefined"&&!(w.rtaCartQuantities instanceof Array)){w.rtaCartQuantities=w.rtaCartQuantities.split(',').join("|");}
if(typeof w.rtaProductSKU!="undefined"&&!(w.rtaProductSKU instanceof Array)){w.rtaProductSKU=w.rtaProductSKU.split(',').join("|");}
if(w.rtaConvertCart){w.rtaOrderNum=w.rtaOrderNum||b._corder;w.rtaCart=w.rtaCart||b._csku.join("|");w.rtaCartSku=w.rtaCartSku||b._csku.join("|");w.rtaCartAmounts=w.rtaCartAmounts||b._cprice.join("|");w.rtaCartQuantities=w.rtaCartQuantities||b._cquan.join("|");}else if(b._cevent=="prodview"){w.rtaProductSKU=w.rtaProductSKU||b._csku.join("|");}else if(b._cevent=="cartview"){w.rtaCart=w.rtaCart||b._csku.join("|");w.rtaCartSku=w.rtaCartSku||b._csku.join("|");w.rtaCartAmounts=w.rtaCartAmounts||b._cprice.join("|");w.rtaCartQuantities=w.rtaCartQuantities||b._cquan.join("|");}
w.rtaTitle=w.rtaTitle||document.title;callRTA(u.client);}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('47','pvh.tommyna');}catch(e){}
