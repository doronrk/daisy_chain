//tealium universal tag - utag.38 ut4.0.201312231843, Copyright 2013 Tealium.com Inc. All Rights Reserved.
var $CVO=window.$CVO||[];try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.attr={};u.clientid='luxottica';u.event_type="";u.event_id="";u.event_value="";u.base_url='//d1ivexoxmp59q7.cloudfront.net/'+u.clientid+'/live.js';u.map={"order_type":"event_type","order_id":"event_id","convertro_subTotal":"event_value"};u.extend=[function(a,b){if((typeof b['order_id']!='undefined'&&b['customer_type'].toString().indexOf('registered')>-1)){b['order_type']='sale_repeat'}},function(a,b){if((typeof b['order_id']!='undefined'&&b['customer_type'].toString().indexOf('guest')>-1)){b['order_type']='sale_new'}},function(a,b){if(b['dom.pathname'].toString().indexOf('/ProfileView')>-1){b['order_type']='create_account';b['order_id']=b['cp.utag_main_ses_id'];b['convertro_subTotal']='1'}},function(a,b){if(b['dom.pathname'].toString().indexOf('/AjaxOrderItemDisplayView')>-1){b['order_type']='shopping_cart';b['order_id']=b['cp.utag_main_ses_id']}}];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!='undefined'){for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f]=="event_type"||e[f]=="event_id"||e[f]=="event_value"){u[e[f]]=b[d];}else{u.attr[e[f]]=b[d];}}}}
if(u.event_type==""){u.event_type=b._ctype};if(u.event_id==""){u.event_id=b._corder};if(u.event_value==""){u.event_value=b._csubtotal};if(u.attr.id||b._ccustid){u.attr.id=(u.attr.id?u.attr.id:b._ccustid);u.attr.city=(u.attr.city?u.attr.city:b._ccity);u.attr.state=(u.attr.state?u.attr.state:b._cstate);u.attr.zip=(u.attr.zip?u.attr.zip:b._czip);u.attr.country=(u.attr.country?u.attr.country:b._ccountry);$CVO.push(['trackUser',u.attr]);}
var t=u.event_type.split(',');var v=u.event_value.split(',');if(u.event_id){for(d=0;d<t.length;d++){var value=((typeof v[d]!="undefined")?v[d]:u.event_value);$CVO.push(['trackEvent',{type:((t[d])?t[d]:"sale"),id:u.event_id,amount:((value)?value:'0')}]);}}else if(u.event_type){for(d=0;d<t.length;d++){$CVO.push(['trackEvent',{type:t[d]}]);}}
u.s=document.getElementsByTagName("script")[0];u.scr=document.createElement("script");u.scr.type="text/javascript";u.scr.src=u.base_url;u.s.parentNode.insertBefore(u.scr,u.s);}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('38','luxottica.sunglasshutnew');}catch(e){}