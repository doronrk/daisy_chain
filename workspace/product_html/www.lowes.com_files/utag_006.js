//tealium universal tag - utag.88112 ut4.0.201411211729, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState==='complete'||this.readyState==='loaded')&&!b.hFlag){b.hFlag=1;o.cb();}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb();}};}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1,'link':1};u.map={};u.extend=[function(a,b){if(a=="view"||(typeof(b.event_type)!=="undefined"&&b.event_type.indexOf('cart-add')<0)||(typeof(b.product_name)!=="undefined"&&b.product_name.toString().indexOf('whirlpool')<0))
{return false;}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,g;u.data={"qsp_delim":";","kvp_delim":"=","base_url":"","src":"2625291","type":"whp_lowe","cat":"WHPLo0","multicat":"","ord":"","cost":"","qty":0,"product_quantity":[],"countertype":"standard"};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){if(typeof utag_err!='undefined'){utag_err.push({e:'extension error:'+e,s:utag.cfg.path+'utag.'+id+'.js',l:c,t:'ex'})}}};c=[];g=[];for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(/^(cat|multicat|type|src|cost|qty|ord)$/.test(e[f])){u.data[e[f]]=b[d];}else{u.data[e[f]]=b[d];g.push(e[f]+u.data.kvp_delim+encodeURIComponent(b[d]))}}}}
u.data.base_url='//'+u.data.src+'.fls.doubleclick.net/activityi;src='+u.data.src+';type='+u.data.type+';';u.data.ord=u.data.ord||b._corder;u.data.cost=u.data.cost||b._csubtotal;if(u.data.product_quantity.length===0&&b._cquan!==undefined){u.data.product_quantity=b._cquan.slice(0);}
if(u.data.multicat===""){u.data.multicat_arr=[u.data.cat];}else{u.data.multicat_arr=u.data.multicat.split(';');}
if(u.data.ord){if(u.data.qty===0&&u.data.product_quantity.length>0){for(f=0;f<u.data.product_quantity.length;f++){u.data.qty+=parseInt(u.data.product_quantity[f]);}}
if(u.data.qty===0){u.data.qty=1};c.push('qty='+(u.data.qty));c.push('cost='+(u.data.cost));if(g.length>0){c.push(g.join(';'));}
c.push('ord='+(u.data.ord));}else if(u.data.countertype==='standard'){if(g.length>0){c.push(g.join(';'));}
c.push('ord='+(Math.random()*10000000000000));}else if(u.data.countertype==='unique'){if(g.length>0){c.push(g.join(';'));}
c.push('ord=1');c.push('num='+(Math.random()*10000000000000));}else{if(g.length>0){c.push(g.join(';'));}
c.push('ord='+(u.data.ord?u.data.ord:window.utag.data['cp.utag_main_ses_id']));}
u.loader_cb=function(){};for(f=0;f<u.data.multicat_arr.length;f++){u.loader({"type":"iframe","src":u.data.base_url+'cat='+u.data.multicat_arr[f]+((c.length>0)?';'+c.join(u.data.qsp_delim):'')+'?',"cb":u.loader_cb,"loc":"body","id":'utag_88112_iframe'});}}};utag.o[loader].loader.LOAD(id);}('88112','lowes.main'));}catch(error){utag.DB(error);}
