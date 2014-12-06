//tealium universal tag - utag.28 ut4.0.201405072009, Copyright 2014 Tealium.com Inc. All Rights Reserved.
if(typeof utag.ut=="undefined"){utag.ut={};}
utag.ut.libloader2=function(o,a,b,c,l){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=o.src;if(o.id){b.id=o.id};if(typeof o.cb=='function'){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb()}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb()}}}
l=o.loc||'head';c=a.getElementsByTagName(l)[0];if(c){if(l=='script'){c.parentNode.insertBefore(b,c);}else{c.appendChild(b)}
utag.DB("Attach to "+l+": "+o.src)}}
window._fbds=window._fbds||{};try{(function(id,loader,u){u=utag.o[loader].sender[id]={};u.ev={'view':1};u.initialized=false;u.data={};u.data.pixel_id="233167536882183";u.map={};u.extend=[function(a,b,c,d,e,f,g){d=b['page_type'];if(typeof d=='undefined')return;c=[{'product':'ViewProduct'},{'cart':'AddToCart'},{'order':'Checkout'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['fbaud_event']=c[e][f];m=true};};if(m)break};if(!m)b['fbaud_event']='Checkout';}];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};var c,d,e,f;c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f].indexOf("event.")==0){c.push(b[d]);}else{u.data[e[f]]=b[d];}}}}
window._fbds.pixelId=u.data.pixel_id;u.callback=function(){if(!u.initialized){if((utag_data.page_type=='product'||utag_data.page_type=='cart'||utag_data.page_type=='order')&&(utag_data.product_id!=null)){for(q=0;q<utag_data.product_id.length;q++){window._fbq.push(["track",b.fbaud_event,{productId:utag_data.product_id[q]}]);}}
window._fbq.push(["track","PixelInitialized",{}]);}
for(var i=0;i<c.length;i++){window._fbq.push(c[i]);}};u.data.base_url=u.data.base_url||"//connect.facebook.net/en_US/fbds.js";if(!u.initialized){utag.ut.libloader2({src:u.data.base_url,cb:u.callback});}else{u.callback;}
}}
utag.o[loader].loader.LOAD(id);})('28','qvc.qvcus');}catch(e){}
