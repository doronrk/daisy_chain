//tealium universal tag - utag.34 ut4.0.201410161256, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var dtmTag={};var dtmSrc="";function timeOutDotomi(){document.getElementById("dtmdiv").innerHTML="";}
try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.qsp_delim="&";u.kvp_delim="=";u.divid="dtmdiv";u.cid="2827";u.cmagic="09b69a";u.clipromoid="";u.product_variable="prod";u.base_url="//login.dotomi.com/ucm/UCMController?";u.map={"conversant_promo_id":"cli_promo_id","current_brand":"dtmc_brand","conversant_FPC_domain":"dtmc_fpc_domain","customer_id_hash":"dtm_email_hash,dtm_user_id","page_category_id":"dtmc_category"};u.extend=[function(a,b,c,d,e,f,g){d=b['page_type'];if(typeof d=='undefined')return;c=[{'home':'1'},{'category':'3'},{'plp':'3'},{'pdp':'5'},{'shopping cart':'6'},{'Search Results':'7'},{'Transaction Confirmation/Receipt':'100'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['conversant_promo_id']=c[e][f];m=true};};if(m)break};if(!m)b['conversant_promo_id']='3';},function(a,b,c,d,e,f,g){d=b['dom.domain'];if(typeof d=='undefined')return;c=[{'oshkosh':'dtm.oshkosh.com'},{'carters':'dtm.carters.com'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d.toString().indexOf(f)>-1){b['conversant_FPC_domain']=c[e][f];m=true};};if(m)break};if(!m)b['conversant_FPC_domain']='dtm.carters.com';}];u.send=function(a,b,c,d,e,f,g,h){if(u.ev[a]||typeof u.ev.all!="undefined"){for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};c=[];dtmTag={};var items=[];var orders=[];var conv_vals=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){dtmTag[e[f]]=b[d];}}}
if(b._corder||typeof dtmTag.dtmc_transaction_id!="undefined"){dtmTag.dtmc_transaction_id=dtmTag.dtmc_transaction_id||b._corder;dtmTag.cli_promo_id="100";c.push("dtm_com=29");c.push("dtm_fid=102");if(dtmTag.dtmc_transaction_id instanceof Array&&dtmTag.dtmc_transaction_id.length>0){var lastindex=0;for(f=0;f<dtmTag.dtmc_transaction_id.length;f++){if(f==dtmTag.dtmc_transaction_id.length-1||(dtmTag.dtmc_transaction_id[f]!=dtmTag.dtmc_transaction_id[f+1])){if(dtmTag.dtm_conv_val&&dtmTag.dtm_conv_val[f])conv_vals.push(dtmTag.dtm_conv_val[f]);if(dtmTag.dtmc_transaction_id&&dtmTag.dtmc_transaction_id[f])orders.push(dtmTag.dtmc_transaction_id[f]);g=[];for(e=lastindex;e<f+1;e++){for(h=0;h<b._cquan[e];h++){g.push(b._cprod[e]+';'+b._cprice[e]);}}
items.push(g.join("|"));lastindex=f+1;}}}else{if(typeof dtmTag.dtm_conv_val=="undefined"&&b._ctotal){dtmTag.dtm_conv_val=b._ctotal};if(typeof dtmTag.dtm_items=="undefined"&&b._cprod.length>0&&b._cprice.length>0){g=[];for(d=0;d<b._cprod.length;d++){for(e=0;e<b._cquan[d];e++){g.push(b._cprod[d]+';'+b._cprice[d]);}}
dtmTag.dtm_items=g.join('|');}}}else{c.push("dtm_com=28");c.push("dtm_fid=101");if(typeof dtmTag.dtmc_category=="undefined"&&b._ccat.length>0){dtmTag.dtmc_category=b._ccat[0]};if(typeof dtmTag.dtmc_sub_category=="undefined"&&b._ccat2.length>0){dtmTag.dtmc_sub_category=b._ccat2[0]};if(typeof dtmTag.dtmc_brand=="undefined"&&b._cbrand.length>0){dtmTag.dtmc_brand=b._cbrand[0]};if(typeof dtmTag["dtmc_"+u.product_variable+"_id"]=="undefined"&&b._cprod.length>0){dtmTag["dtmc_"+u.product_variable+"_id"]=b._cprod[0]};if(typeof dtmTag["dtmc_"+u.product_variable+"_name"]=="undefined"&&b._cprodname.length>0){dtmTag["dtmc_"+u.product_variable+"_name"]=b._cprodname[0]};}
c.push("dtm_cid="+u.cid);c.push("dtm_cmagic="+u.cmagic);c.push("dtm_format=5");if(typeof dtmTag.cli_promo_id=="undefined"){dtmTag.cli_promo_id=u.clipromoid};if(typeof dtmTag.dtm_user_id=="undefined"&&b._ccustid){dtmTag.dtm_user_id=b._ccustid};dtmTag.dtmc_ref=b['dom.referrer'];dtmTag.dtmc_loc=b['dom.url'];dtmTag.dtm_user_token="";function readCookieDotomi(){var name="dtm_token";var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')
c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0){var d=c.substring(nameEQ.length,c.length);dtmTag.dtm_user_token=d;}}}
readCookieDotomi();if(!document.getElementById(u.divid)){d=document;e=d.createElement("div");try{e.style.display='none';}catch(err){};e.id=u.divid;d.getElementsByTagName("body")[0].appendChild(e);}
u.div=document.getElementById(u.divid);if(orders.length>0){for(f=0;f<orders.length;f++){g=[];dtmTag.dtmc_transaction_id=orders[f];dtmTag.dtm_conv_val=conv_vals[f];dtmTag.dtm_items=items[f];for(var item in dtmTag){if(typeof dtmTag[item]!="function"&&typeof dtmTag[item]!="object"){g.push(item+'='+escape(dtmTag[item]));}}
d=document.createElement("iframe");d.setAttribute('name','response_frame');dtmSrc=u.base_url+c.join(u.qsp_delim)+u.qsp_delim+g.join(u.qsp_delim);d.setAttribute('src',dtmSrc);u.div.appendChild(d);}}else{for(var item in dtmTag){if(typeof dtmTag[item]!="function"&&typeof dtmTag[item]!="object"){c.push(item+'='+escape(dtmTag[item]));}}
d=document.createElement("iframe");d.setAttribute('name','response_frame');dtmSrc=u.base_url+c.join(u.qsp_delim);d.setAttribute('src',dtmSrc);u.div.appendChild(d);setTimeout('timeOutDotomi()',((dtmTag.cli_promo_id=="100")?7000:3000));}}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('34','carters.main');}catch(e){utag.DB(error);}
