//tealium universal tag - utag.81 ut4.0.201403241504, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var _TrueTagVendorId='16095880';var _TrueTagProtocol=window.location.protocol;var _TrueTagScriptBaseUrl='cts.channelintelligence.com';if(_TrueTagProtocol=='https:'){_TrueTagScriptBaseUrl='cts-secure.channelintelligence.com';}
try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.qsp_delim='&';u.kvp_delim='=';u.base_url='//'+_TrueTagScriptBaseUrl;u.map={};u.extend=[function(a,b){if(1){try{b['p_price']=jQuery("div.price span.dollars").text()+"."+jQuery("div.price span.cents").text()}catch(e){}}},function(a,b){var unit_price=[];if(b._corder){for(var i=0;i<b._cprice.length;i++)
{var calculated=b._cprice[i]/b._cquan[i];unit_price.push(calculated.toFixed(2).toString());}
b._cprice=unit_price;}}];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!='undefined'){for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!='undefined'&&b[d]!=''){e=u.map[d].split(',');for(f=0;f<e.length;f++){if(e[f]=="vid"){window._TrueTagVendorId=b[d]}else if(e[f]=='CI_ItemQtyAvailable'){CI_ItemQtyAvailable=b[d]}}}}
if(b._corder){CI_PageType='Confirmation';CI_OrderID=b._corder;if(typeof b._csku!='undefined'&&b._csku){CI_ItemIDs=b._csku;}
if(typeof b._cprice!='undefined'&&b._cprice){CI_ItemPrices=b._cprice;}
if(typeof b._cquan!='undefined'&&b._cquan){CI_ItemQtys=b._cquan;}}
else if(b.product_skus.length>0){CI_PageType='Product';if(typeof b.product_skus!='undefined'&&b.product_skus){CI_ItemIDs=[b.product_skus];}
if(typeof b.p_price!='undefined'&&b.p_price){CI_ItemPrices=[b.p_price];}
CI_ItemAvailability=['1'];if(typeof CI_ItemQtyAvailable!='undefined'&&CI_ItemQtyAvailable=='0'){CI_ItemAvailability=['0'];}}
if(typeof CI_OrderID!='undefined'&&CI_OrderID){u.base_url+='/'+_TrueTagVendorId+'_confirmation.js';}
else{u.base_url+='/'+_TrueTagVendorId+'_landing.js';}
u.head=document.getElementsByTagName('head')[0];u.scr=document.createElement('script');u.scr.type='text/javascript';u.scr.src=u.base_url+c.join(u.qsp_delim);u.head.appendChild(u.scr);}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('81','americaneagle.main');}catch(e){}
