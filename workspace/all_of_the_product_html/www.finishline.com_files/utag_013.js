//tealium universal tag - utag.67 ut4.0.201405301611, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var _TrueTagVendorId='7046505';var _TrueTagProtocol=window.location.protocol;var _TrueTagScriptBaseUrl='cts.channelintelligence.com';if(_TrueTagProtocol=='https:'){_TrueTagScriptBaseUrl='cts-secure.channelintelligence.com';}
try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.qsp_delim='&';u.kvp_delim='=';u.base_url='//'+_TrueTagScriptBaseUrl;u.map={"order_id":"CI_OrderID","product_sku":"CI_ItemIDs","product_quantity":"CI_ItemQtys","product_price":"CI_ItemPrices"};u.extend=[];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!='undefined'){c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!='undefined'&&b[d]!=''){e=u.map[d].split(',');for(f=0;f<e.length;f++){if(e[f]=="vid"){window._TrueTagVendorId=b[d]}
else if(e[f]=='CI_ItemQtyAvailable'){CI_ItemQtyAvailable=b[d]}}}}
if(b._corder){CI_PageType='Confirmation';CI_OrderID=b._corder;if(typeof b._cprod!='undefined'&&b._cprod){CI_ItemIDs=b._cprod;}
if(typeof b._cprice!='undefined'&&b._cprice){CI_ItemPrices=b._cprice;}
if(typeof b._cquan!='undefined'&&b._cquan){CI_ItemQtys=b._cquan;}
if(typeof b._cprodname!='undefined'&&b._cprodname){CI_ItemNames=b._cprodname;}
if(typeof b._csku!='undefined'&&b._csku){CI_ItemUPCs=b._csku;}
if(typeof b._cbrand!='undefined'&&b._cbrand){CI_ItemMfrs=b._cbrand;}
if(typeof b._ccat!='undefined'&&b._ccat){CI_CatIDs=b._ccat;}
if(typeof b._ccurrency!='undefined'&&b._ccurrency){CI_Currency=b._ccurrency;}
if(typeof b._ctax!='undefined'&&b._ctax){CI_Tax=b._ctax;}
if(typeof b._cship!='undefined'&&b._cship){CI_Shipping=b._cship;}
if(typeof b._cstate!='undefined'&&b._cstate){CI_ShipState=b._cstate;}
if(typeof b._ccity!='undefined'&&b._ccity){CI_ShipCity=b._ccity;}
if(typeof b._czip!='undefined'&&b._czip){CI_ShipZip=b._czip;}
if(typeof b._ccountry!='undefined'&&b._ccountry){CI_ShipCountry=b._ccountry;}}else if(b._cquan.length>0){CI_PageType='Cart';if(typeof b._ccustid!='undefined'&&b._ccustid){CI_CustomerID=b._ccustid;}
if(typeof b._cprod!='undefined'&&b._cprod){CI_ItemIDs=b._cprod;}
if(typeof b._cquan!='undefined'&&b._cquan){CI_ItemQtys=b._cquan;}
if(typeof b._cprice!='undefined'&&b._cprice){CI_ItemPrices=b._cprice;}}else if(b._cprod.length>0){CI_PageType='Product';if(typeof b._cprod!='undefined'&&b._cprod[0]){CI_ItemID=b._cprod[0];}
if(typeof b._cprodname!='undefined'&&b._cprodname[0]){CI_ItemName=b._cprodname[0];}
if(typeof b._csku!='undefined'&&b._csku[0]){CI_ItemUPC=b._csku[0];}
if(typeof b._cbrand!='undefined'&&b._cbrand[0]){CI_ItemMfr=b._cbrand[0];}
if(typeof b._ccat!='undefined'&&b._ccat[0]){CI_CatID=b._ccat[0];}
if(typeof b._ccat2!='undefined'&&b._ccat2[0]){CI_CatName=b._ccat2[0];}
if(typeof b._cprice!='undefined'&&b._cprice[0]){CI_ItemPrice=b._cprice[0];}
CI_ItemAvailability='Y';if(typeof CI_ItemQtyAvailable!='undefined'&&CI_ItemQtyAvailable=='0'){CI_ItemAvailability='N';}}
if(typeof CI_OrderID!='undefined'&&CI_OrderID){u.base_url+='/'+_TrueTagVendorId+'_confirmation.js';}else if(CI_PageType=='Cart'){u.base_url+='/'+_TrueTagVendorId+'_cart.js';}else{u.base_url+='/'+_TrueTagVendorId+'_landing.js';}
u.head=document.getElementsByTagName('head')[0];u.scr=document.createElement('script');u.scr.type='text/javascript';u.scr.src=u.base_url+c.join(u.qsp_delim);u.head.appendChild(u.scr);}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('67','finishline.main');}catch(e){}
