//tealium universal tag - utag.44 ut4.0.201411072056, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var $CVO=window.$CVO||[];try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.attr={};u.clientid='qvc';u.event_type="";u.event_id="";u.event_value="";u.base_url='//d1ivexoxmp59q7.cloudfront.net/'+u.clientid+'/live.js';u.map={};u.extend=[function(a,b){if(b['dom.pathname'].toString().toLowerCase().indexOf('/OrderStatusView'.toLowerCase())>-1||b['page_type'].toString().toLowerCase()=='wish_list'.toLowerCase()||b['dom.pathname'].toString().toLowerCase().indexOf('/EditEmailAddressForm'.toLowerCase())>-1||b['dom.pathname'].toString().toLowerCase().indexOf('/EditPasswordForm'.toLowerCase())>-1||b['dom.pathname'].toString().toLowerCase().indexOf('/EditPinForm'.toLowerCase())>-1||b['dom.pathname'].toString().toLowerCase().indexOf('/EditSecurityQuestionsForm'.toLowerCase())>-1||b['dom.pathname'].toString().toLowerCase().indexOf('/CreditCardDisplay'.toLowerCase())>-1||b['dom.pathname'].toString().toLowerCase().indexOf('/UserRegistrationUpdateFormView'.toLowerCase())>-1||b['dom.pathname'].toString().toLowerCase().indexOf('/EditPermanentShippingAddressView'.toLowerCase())>-1||b['dom.pathname'].toString().toLowerCase().indexOf('/AddressBookForm'.toLowerCase())>-1||b['dom.pathname'].toString().toLowerCase().indexOf('/PfcScheduledRemindersForm'.toLowerCase())>-1||b['dom.pathname'].toString().toLowerCase().indexOf('/EmailMobileServicesForm'.toLowerCase())>-1||b['dom.pathname'].toString().toLowerCase().indexOf('/NickNameForm'.toLowerCase())>-1||b['dom.pathname'].toString().toLowerCase().indexOf('/ApplyForQCardView'.toLowerCase())>-1||b['dom.pathname'].toString().toLowerCase().indexOf('/ManageYourQCard'.toLowerCase())>-1||/\/TrackYourShipment$/i.test(b['dom.pathname'])||(b['page_type'].toString().toLowerCase()=='checkout'.toLowerCase()&&b['dom.pathname'].toString().toLowerCase().indexOf('/SingleShippingAddressView'.toLowerCase())>-1)||(b['page_type'].toString().toLowerCase()=='checkout'.toLowerCase()&&b['dom.pathname'].toString().toLowerCase().indexOf('/OrderDetailsView'.toLowerCase())>-1)||b['page_type'].toString().toLowerCase()=='order'.toLowerCase()||(b['dom.pathname'].toString().toLowerCase().indexOf('/MyAccountView'.toLowerCase())>-1&&b['cp.qvcauthenticed'].toString().toLowerCase().indexOf('true'.toLowerCase())>-1)||b['page_type'].toString().toLowerCase()=='reg_conf'.toLowerCase()){try{b['_ccustid']=md5(utag_data["cp.qvcmn"])}catch(e){}}},function(a,b,c,d,e,f,g){d=b['page_type'];if(typeof d=='undefined')return;c=[{'order':'sale'},{'cart':'cart'},{'wish_list':'wishlist'},{'reg_conf':'registration'},{'reg_ship':'registration'},{'email_gift':'gift-card'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['_ctype']=c[e][f];m=true};};if(m)break};if(!m)b['_ctype']='';}];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!='undefined'){for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f]=="event_type"||e[f]=="event_id"||e[f]=="event_value"){u[e[f]]=b[d];}else{u.attr[e[f]]=b[d];}}}}
if(u.event_type==""){u.event_type=b._ctype};if(u.event_id==""){u.event_id=b._corder};if(u.event_value==""){u.event_value=b._csubtotal};if(u.attr.id||b._ccustid){u.attr.id=(u.attr.id?u.attr.id:b._ccustid);$CVO.push(['trackUser',u.attr]);}
var t=u.event_type.split(',');var v=u.event_value.split(',');if(u.event_id){for(d=0;d<t.length;d++){var value=((typeof v[d]!="undefined")?v[d]:u.event_value);if(typeof utag_data.trans_orders!="undefined"&&utag_data.trans_orders.length>=1){for(q=0;q<utag_data.trans_orders.length;q++){if(typeof utag_data.trans_orders[q].product_id!="undefined"&&utag_data.trans_orders[q].product_id[0].indexOf('G')!=-1){continue;}
u.event_id=utag_data.trans_orders[q].order_id;value=utag_data.trans_orders[q].order_merchandise_total;$CVO.push(['trackEvent',{type:((t[d])?t[d]:"sale"),id:u.event_id,amount:((value)?value:'0')}]);}}else{$CVO.push(['trackEvent',{type:((t[d])?t[d]:"sale"),id:u.event_id,amount:((value)?value:'0')}]);}}}else if(u.event_type){for(d=0;d<t.length;d++){$CVO.push(['trackEvent',{type:t[d]}]);}}
u.s=document.getElementsByTagName("script")[0];u.scr=document.createElement("script");u.scr.type="text/javascript";u.scr.src=u.base_url;u.s.parentNode.insertBefore(u.scr,u.s);}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('44','qvc.qvcus');}catch(e){}