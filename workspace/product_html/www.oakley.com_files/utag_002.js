//~~tv:7115.20140310
//~~tc: Adding quotes around standard config Conversion ID.

if(typeof utag.ut=="undefined"){
  utag.ut={};
}

utag.ut.libloader2=function(o, a, b, c, l) {
  a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=o.src;if(o.id){b.id=o.id};
  if (typeof o.cb=='function') {
    b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb()}};
    b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb()}}
  }
  l = o.loc || 'head';
  c = a.getElementsByTagName(l)[0];
  if (c) {
    if (l == 'script') {
      c.parentNode.insertBefore(b, c);
    } else {
      c.appendChild(b)
    }
    utag.DB("Attach to "+l+": "+o.src)
  }
}

//tealium universal tag - utag.sender.7115 ut4.0.201406162115, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  u=utag.o[loader].sender[id]={};
  u.ev={'view':1};
  u.initialized = false;
  u.data={};
  u.data.google_conversion_id = "1070744181";
  u.data.google_conversion_label = "";
  u.data.pagetype = "other";
  u.data.value = "";
  u.data.google_remarketing_only = true;
  u.data.base_url="//www.googleadservices.com/pagead/conversion_async.js";
  u.map={"google_adwords_conversionid_remarketing":"google_conversion_id","google_adwords_conversionlabel_remarketing":"google_conversion_label"};
  u.extend=[function(a,b,c,d,e,f,g){d=b['dom.url'];if(typeof d=='undefined')return;c=[{'at.oakley.com/':'1017642904'},{'au.oakley.com/':'1033202459'},{'be.oakley.com/':'1017642904'},{'ca.oakley.com/':'1026236546'},{'ch.oakley.com/':'1017642904'},{'de.oakley.com/':'1017642904'},{'dk.oakley.com/':'1017642904'},{'es.oakley.com/':'1017642904'},{'fr.oakley.com/':'1017642904'},{'ie.oakley.com/':'1017642904'},{'it.oakley.com/':'1017642904'},{'lu.oakley.com/':'1017642904'},{'nl.oakley.com/':'1017642904'},{'no.oakley.com/':'1017642904'},{'pl.oakley.com/':'1017642904'},{'pt.oakley.com/':'1017642904'},{'se.oakley.com/':'1017642904'},{'uk.oakley.com/':'1017642904'},{'www.oakley.com/':'1070744181'},{'oakleydev1-store-us.oakleydev.com/':'1070744181'},{'qa5-store-us.oakleydev.com/':'1070744181'},{'hyb-qa-www.oakley.com/':'1070744181'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d.toString().indexOf(f)>-1){b['google_adwords_conversionid_remarketing']=c[e][f];m=true};};if(m)break};if(!m)b['google_adwords_conversionid_remarketing']='1070744181';},
function(a,b,c,d,e,f,g){d=b['dom.url'];if(typeof d=='undefined')return;c=[{'at.oakley.com/':''},{'au.oakley.com/':''},{'be.oakley.com/':''},{'ca.oakley.com/':'7CKYCN7OggQQgsGs6QM'},{'ch.oakley.com/':''},{'de.oakley.com/':''},{'dk.oakley.com/':''},{'es.oakley.com/':''},{'fr.oakley.com/':''},{'ie.oakley.com/':''},{'it.oakley.com/':''},{'lu.oakley.com/':''},{'nl.oakley.com/':''},{'no.oakley.com/':''},{'pl.oakley.com/':''},{'pt.oakley.com/':''},{'se.oakley.com/':''},{'uk.oakley.com/':''},{'www.oakley.com/':''},{'oakleydev1-store-us.oakleydev.com/':''},{'qa5-store-us.oakleydev.com/':''},{'hyb-qa-www.oakley.com/':''}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d.toString().indexOf(f)>-1){b['google_adwords_conversionlabel_remarketing']=c[e][f];m=true};};if(m)break};if(!m)b['google_adwords_conversionlabel_remarketing']='';}];

  u.send=function(a,b){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
      var c,d,e,f,g;
      g = {};
      u.data.google_custom_params = {};
      for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
        if (e[f].indexOf("custom.") == 0) {
          u.data.google_custom_params[e[f].substr(7)] = b[d];
        } else {
          u.data[e[f]] = b[d];
        }
      }}}
      u.data.google_conversion_id = parseInt(u.data.google_conversion_id);
      g.google_conversion_id = u.data.google_conversion_id;
      if (u.data.google_conversion_label) { g.google_conversion_label = u.data.google_conversion_label; }
      if (b._corder) {
        u.data.pagetype = "purchase";
      }
      u.data.prod = u.data.prod || (typeof b._cprod != "undefined" ? b._cprod.slice(0) : []);
      u.data.value = u.data.value || b._csubtotal;
      u.data.google_custom_params.ecomm_prodid = u.data.prod;
      u.data.google_custom_params.ecomm_pagetype = u.data.pagetype;
      u.data.google_custom_params.ecomm_value = u.data.value;
      u.data.google_custom_params.ecomm_category = u.data.google_custom_params.ecomm_category || (b._ccat !== undefined ? b._ccat.slice(0) : []);
      u.data.google_custom_params.ecomm_pvalue = u.data.google_custom_params.ecomm_pvalue || (b._cprice !== undefined ? b._cprice.slice(0) : []);
      u.data.google_custom_params.ecomm_quantity = u.data.google_custom_params.ecomm_quantity || (b._cquan !== undefined ? b._cquan.slice(0) : []);
      g.google_custom_params = u.data.google_custom_params;
      if (u.data.google_remarketing_only) { g.google_remarketing_only = u.data.google_remarketing_only; }
      u.gac_callback=function(){
        window.google_trackConversion(g);
      }
      if (!u.initialized) {
        u.initialized = true;
        utag.ut.libloader2({src:u.data.base_url, cb:u.gac_callback});
      } else {
        u.gac_callback();
      }
    }
  }
  utag.o[loader].loader.LOAD(id);
})('184','oakley.hybrisprod');
}catch(e){}
//end tealium universal tag

