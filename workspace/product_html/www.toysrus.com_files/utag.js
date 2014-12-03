//tealium universal tag - utag.loader ut4.0.201411192256, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var utag_condload=false;try{(function(){function ul(src,a,b){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=src;a.getElementsByTagName('head')[0].appendChild(b)};if((""+document.cookie).match("utag_env_toysrus_us=([^\S;]*)")){if(RegExp.$1.indexOf("/prod/")===-1){ul(RegExp.$1);utag_condload=true;__tealium_default_path='//tags.tiqcdn.com/utag/toysrus/us/prod/';}}})();}catch(e){};try{try{var utag_data=utag_data||"";var tealium=tealium||{};tealium.com=tealium.com||{};tealium.com.tealium_w3c={};tealium.com.tealium_w3c.udo={};tealium.com.mapping_keys={"product_id":"product_id","product_sku":"product_sku","product_name":"product_name","primary_category":"product_category","sub_category1":"product_subcategory","price-total_price":"product_unit_price","quantity":"product_quantity","transaction_id":"order_id","cart_total":"order_total","base_price":"order_subtotal","order_level_promo_total":"order_discount","total-shipping":"order_shipping","currency":"order_currency","profileinfo-profile_id":"customer_id","profileinfo-user_name":"customer_username","page_type":"page_type","page_name":"page_name","unit_price":"product_unit_price","product_discount":"product_discount",".":"product_brand",".":"product_list_price",".":"order_payment_type",".":"order_tax",".":"order_coupon_code",".":"order_coupon_discount",".":"order_store",".":"order_type",".":"customer_city",".":"customer_state",".":"customer_zip",".":"customer_country",".":"customer_email",".":"customer_type",".":"page_category",".":"page_subcategory",".":"search_results",".":"search_term"};tealium.com.convert_mapping_keys=function(obj){for(idx in obj){var temp_val=obj[idx];var temp="";if(temp_val instanceof Array)
temp=obj[idx].slice(0);else if(typeof temp_val=="object"){temp={};for(k in temp_val)
temp[k]=temp_val[k];}else
temp=obj[idx];delete obj[idx];var newIdx=false;for(key in tealium.com.mapping_keys){if(idx.indexOf(key)>-1){newIdx=tealium.com.mapping_keys[key];break;}}
if(!newIdx)
newIdx=idx;obj[newIdx]=temp;}};tealium.com.convert_data_layer=function(data){var delim="-";var result={};function varChange(obj){for(idx in obj){var temp_val=obj[idx];var temp="";if(temp_val instanceof Array)
temp=obj[idx].slice(0);else if(typeof temp_val=="object"){temp={};for(k in temp_val)
temp[k]=temp_val[k];}else
temp=obj[idx];delete obj[idx];var newIdx=idx.replace(/([a-z][A-Z])/g,function(a){var str=a[0]+'_'+a[1];return str;}).toLowerCase();obj[newIdx]=temp;}}
function recurse(cur,prop){if(Object(cur)!==cur){result[prop]=cur;}else if(Array.isArray(cur)){for(var i=0,l=cur.length;i<l;i++)
recurse(cur[i],prop+"["+i+"]");if(l==0)
result[prop]=[];}else{var isEmpty=true;for(var p in cur){isEmpty=false;recurse(cur[p],prop?prop+delim+p:p);}
if(isEmpty&&prop)
result[prop]={};}}
function findLikeItems(arr,obj){var newObj={};var currFront=arr[0].substr(0,arr[0].length-3);var currFull=arr[1];var temp_val=arr[2];var currIdx=0;for(r in obj){if(r.indexOf(currFront)==0){var currBack=r.substr(currFront.length+5,currFull.length);newObj[currBack]=newObj[currBack]||[];newObj[currBack].push(obj[r]);delete obj[r];}}
return newObj;}
function checkItem(obj){var checkAgain=false;var newResult={};for(i in obj){var workingSet=[];var terms=i.split(delim);var hasArr=false;var curr=[];if(i.indexOf(']')>-1){hasArr=true;checkAgain=true;}
if(!hasArr)
newResult[i]=obj[i];else{var lastArrIdx=i.lastIndexOf('[');workingSet=[i.substr(0,lastArrIdx+2),i,obj[i]];curr=[];var newObj=findLikeItems(workingSet,obj);for(n in newObj){newResult[n]=newObj[n];}}}
if(checkAgain)
checkItem(newResult);return newResult;}
recurse(data,"");varChange(result);var finalObj=checkItem(result);return finalObj;}
tealium.com.tealium_w3c.udo=tealium.com.convert_data_layer(digitalData)
tealium.com.convert_mapping_keys(tealium.com.tealium_w3c.udo);if(!utag_data)
utag_data=tealium.com.tealium_w3c.udo;}catch(e){utag.DB("Error in converting data layer: ",e);}}catch(e){};if(!utag_condload){try{if(utag_data['page_name']){var temp_arr=utag_data.page_name.split(":");var temp_val=temp_arr[temp_arr.length-1].replace(/^\s+|\s+$/g,'');utag_data['page_category']=temp_val;}}catch(e){}};if(typeof utag=="undefined"&&!utag_condload){var utag={id:"toysrus.us",o:{},sender:{},send:{},rpt:{ts:{a:new Date()}},dbi:[],loader:{q:[],lc:0,f:{},p:0,ol:0,wq:[],lq:[],bq:{},bk:{},rf:0,ri:0,rp:0,rq:[],lh:function(a,b,c){a=""+location.hostname;b=a.split(".");c=(/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\./.test(a))?3:2;return b.splice(b.length-c,c).join(".");},WQ:function(a,b,c,d,g){utag.DB('WQ:'+utag.loader.wq.length);try{if(utag.udoname&&utag.udoname.indexOf(".")<0){utag.ut.merge(utag.data,window[utag.udoname],0);}
utag.handler.RE('view',utag.data,"bwq");if(utag.cfg.load_rules_at_wait){utag.handler.LR();}}catch(e){utag.DB(e)};d=0;g=[];for(a=0;a<utag.loader.wq.length;a++){b=utag.loader.wq[a];b.load=utag.loader.cfg[b.id].load;if(b.load==4){this.f[b.id]=0;utag.loader.LOAD(b.id)}else if(b.load>0){g.push(b);d++;}else{this.f[b.id]=1;}}
for(a=0;a<g.length;a++){utag.loader.AS(g[a]);}
if(d==0){utag.loader.END();}},AS:function(a,b,c,d){utag.send[a.id]=a;if(typeof a.src=='undefined'){a.src=utag.cfg.path+((typeof a.name!='undefined')?a.name:'utag.'+a.id+'.js')}
a.src+=(a.src.indexOf('?')>0?'&':'?')+'utv='+(a.v?a.v:utag.cfg.v);utag.rpt['l_'+a.id]=a.src;b=document;this.f[a.id]=0;if(a.load==2){b.write('<script id="utag_'+a.id+'" src="'+a.src+'"></scr'+'ipt>')
if(typeof a.cb!='undefined')a.cb();}else if(a.load==1||a.load==3){if(b.createElement){c='utag_toysrus.us_'+a.id;if(!b.getElementById(c)){d={src:a.src,id:c,uid:a.id,loc:a.loc}
if(a.load==3){d.type="iframe"};if(typeof a.cb!='undefined')d.cb=a.cb;utag.ut.loader(d);}}}},GV:function(a,b,c){b={};for(c in a){if(a.hasOwnProperty(c)&&typeof a[c]!="function")b[c]=a[c];}
return b},OU:function(a,b,c,d,f){try{if(typeof utag.data['cp.OPTOUTMULTI']!='undefined'){c=utag.loader.cfg;a=utag.ut.decode(utag.data['cp.OPTOUTMULTI']).split('|');for(d=0;d<a.length;d++){b=a[d].split(':');if(b[1]*1!==0){if(b[0].indexOf('c')==0){for(f in utag.loader.GV(c)){if(c[f].tcat==b[0].substring(1))c[f].load=0}}else if(b[0]*1==0){utag.cfg.nocookie=true}else{for(f in utag.loader.GV(c)){if(c[f].tid==b[0])c[f].load=0}}}}}}catch(e){utag.DB(e)}},RDdom:function(o){o["dom.referrer"]=eval("document."+"referrer");o["dom.title"]=""+document.title;o["dom.domain"]=""+location.hostname;o["dom.query_string"]=(""+location.search).substring(1);o["dom.hash"]=(""+location.hash).substring(1);o["dom.url"]=""+document.URL;o["dom.pathname"]=""+location.pathname;},RDcp:function(o,b,c,d){b=b||utag.loader.RC();for(d in b){if(d.match(/utag_(.*)/)){for(c in utag.loader.GV(b[d])){o["cp.utag_"+RegExp.$1+"_"+c]=b[d][c];}}}
for(c in utag.loader.GV((utag.cl&&!utag.cl['_all_'])?utag.cl:b)){if(c.indexOf("utag_")<0&&typeof b[c]!="undefined")o["cp."+c]=b[c];}},RDqp:function(o,a,b,c){a=location.search+(location.hash+'').replace("#","&");if(utag.cfg.lowerqp){a=a.toLowerCase()};if(a.length>1){b=a.substring(1).split('&');for(a=0;a<b.length;a++){c=b[a].split("=");if(c.length>1){o["qp."+c[0]]=utag.ut.decode(c[1])}}}},RDmeta:function(o,a,b,h){a=document.getElementsByTagName("meta");for(b=0;b<a.length;b++){try{h=a[b].name||a[b].getAttribute("property")||"";}catch(e){h="";utag.DB(e)};if(utag.cfg.lowermeta){h=h.toLowerCase()};if(h!=""){o["meta."+h]=a[b].content}}},RDva:function(o,a,b){a="";try{a=localStorage.getItem("tealium_va");if(!a||a=="{}")return;b=utag.ut.flatten({va:JSON.parse(a)});utag.ut.merge(utag.data,b,1);}catch(e){utag.DB("localStorage not supported");}
},RD:function(o,a,b,c,d){utag.DB("utag.loader.RD");if(typeof o["_t_session_id"]!="undefined"){return};a=(new Date()).getTime();b=utag.loader.RC();c=a+parseInt(utag.cfg.session_timeout);d=a;if(!b.utag_main){b.utag_main={};}else if(b.utag_main.ses_id&&typeof b.utag_main._st!="undefined"&&parseInt(b.utag_main._st)<a){delete b.utag_main.ses_id;}
if(!b.utag_main.v_id){b.utag_main.v_id=utag.ut.vi(a);}
if(!b.utag_main.ses_id){b.utag_main.ses_id=d+'';b.utag_main._ss=b.utag_main._pn=1;b.utag_main._sn=1+parseInt(b.utag_main._sn||0);}else{d=b.utag_main.ses_id;b.utag_main._ss=0;b.utag_main._pn=1+parseInt(b.utag_main._pn);b.utag_main._sn=parseInt(b.utag_main._sn);}
if(isNaN(b.utag_main._sn)||b.utag_main._sn<1){b.utag_main._sn=b.utag_main._pn=1}
b.utag_main._st=c+'';utag.loader.SC("utag_main",{"v_id":b.utag_main.v_id,"_sn":b.utag_main._sn,"_ss":b.utag_main._ss,"_pn":b.utag_main._pn+";exp-session","_st":c,"ses_id":d+";exp-session"});o["_t_visitor_id"]=b.utag_main.v_id;o["_t_session_id"]=d;this.RDqp(o);this.RDmeta(o);this.RDcp(o,b);this.RDdom(o);this.RDva(o);},RC:function(a,x,b,c,d,e,f,g,h,i,j,k,l,m,n,o,v,ck,cv,r,s,t){o={};b=(""+document.cookie!="")?(document.cookie).split("; "):[];r=/^(.*?)=(.*)$/;s=/^(.*);exp-(.*)$/;t=(new Date()).getTime();for(c=0;c<b.length;c++){if(b[c].match(r)){ck=RegExp.$1;cv=RegExp.$2;}
e=utag.ut.decode(cv);if(typeof ck!="undefined"){if(ck.indexOf("ulog")==0||ck.indexOf("utag_")==0){e=e.split("$");g=[];j={};for(f=0;f<e.length;f++){try{g=e[f].split(":");if(g.length>2){g[1]=g.slice(1).join(":");}
v="";if((""+g[1]).indexOf("~")==0){h=g[1].substring(1).split("|");for(i=0;i<h.length;i++)h[i]=utag.ut.decode(h[i]);v=h}else v=utag.ut.decode(g[1]);j[g[0]]=v;}catch(er){utag.DB(er)};}
o[ck]={};for(f in utag.loader.GV(j)){if(j[f]instanceof Array){n=[];for(m=0;m<j[f].length;m++){if(j[f][m].match(s)){k=(RegExp.$2=="session")?(typeof j._st!="undefined"?j._st:t-1):parseInt(RegExp.$2);if(k>t)n[m]=(x==0)?j[f][m]:RegExp.$1;}}
j[f]=n.join("|");}else{j[f]=""+j[f];if(j[f].match(s)){k=(RegExp.$2=="session")?(typeof j._st!="undefined"?j._st:t-1):parseInt(RegExp.$2);j[f]=(k<t)?null:(x==0?j[f]:RegExp.$1);}}
if(j[f])o[ck][f]=j[f];}}else if(utag.cl[ck]||utag.cl['_all_']){o[ck]=e}}}
return(a)?(o[a]?o[a]:{}):o;},SC:function(a,b,c,d,e,f,g,h,i,j,k,x,v){if(!a)return 0;if(a=="utag_main"&&utag.cfg.nocookie)return 0;v="";var date=new Date();var exp=new Date();exp.setTime(date.getTime()+(365*24*60*60*1000));x=exp.toGMTString();if(c&&c=="da"){x="Thu, 31 Dec 2009 00:00:00 GMT";}else if(a.indexOf("utag_")!=0&&a.indexOf("ulog")!=0){if(typeof b!="object"){v=b}}else{d=utag.loader.RC(a,0);for(e in utag.loader.GV(b)){f=""+b[e];if(f.match(/^(.*);exp-(\d+)(\w)$/)){g=date.getTime()+parseInt(RegExp.$2)*((RegExp.$3=="h")?3600000:86400000);if(RegExp.$3=="u")g=parseInt(RegExp.$2);f=RegExp.$1+";exp-"+g;}
if(c=="i"){if(d[e]==null)d[e]=f;}else if(c=="d")delete d[e];else if(c=="a")d[e]=(d[e]!=null)?(f-0)+(d[e]-0):f;else if(c=="ap"||c=="au"){if(d[e]==null)d[e]=f;else{if(d[e].indexOf("|")>0){d[e]=d[e].split("|")}
g=(d[e]instanceof Array)?d[e]:[d[e]];g.push(f);if(c=="au"){h={};k={};for(i=0;i<g.length;i++){if(g[i].match(/^(.*);exp-(.*)$/)){j=RegExp.$1;}
if(typeof k[j]=="undefined"){k[j]=1;h[g[i]]=1;}}
g=[];for(i in utag.loader.GV(h)){g.push(i);}}
d[e]=g}}else d[e]=f;}
h=new Array();for(g in utag.loader.GV(d)){if(d[g]instanceof Array){for(c=0;c<d[g].length;c++){d[g][c]=encodeURIComponent(d[g][c])}
h.push(g+":~"+d[g].join("|"))}else h.push(g+":"+encodeURIComponent(d[g]))};if(h.length==0){h.push("");x=""}
v=(h.join("$"));}
document.cookie=a+"="+v+";path=/;domain="+utag.cfg.domain+";expires="+x;return 1},LOAD:function(a,b,c,d){if(this.ol==0){if(utag.loader.cfg[a].block&&utag.loader.cfg[a].cbf){this.f[a]=1;delete utag.loader.bq[a];}
for(b in utag.loader.GV(utag.loader.bq)){if(utag.loader.cfg[a].load==4&&utag.loader.cfg[a].wait==0){utag.loader.bk[a]=1;utag.DB("blocked: "+a);}
utag.DB("blocking: "+b);return;}
utag.loader.INIT();return;}
utag.DB('utag.loader.LOAD:'+a);if(this.f[a]==0){this.f[a]=1;if(utag.cfg.noview!=true){if(utag.loader.cfg[a].send){utag.DB("SENDING: "+a);try{utag.sender[a].send('view',utag.handler.C(utag.data));utag.rpt['s_'+a]=0;}catch(e){utag.DB(e);utag.rpt['s_'+a]=1;}}}
if(utag.loader.rf==0)return;for(b in utag.loader.GV(this.f)){if(this.f[b]==0||this.f[b]==2)return}
utag.loader.END();}},EV:function(a,b,c,d){if(b=="ready"){if(document.readyState!=="loading")setTimeout(c,1);else{if(typeof utag.loader.ready_q=="undefined"){utag.loader.ready_q=[];utag.loader.run_ready_q=function(){for(var i=0;i<utag.loader.ready_q.length;i++){utag.DB("READY_Q:"+i);try{utag.loader.ready_q[i]()}catch(e){utag.DB(e)};}}}
utag.loader.ready_q.push(c);var RH;if(utag.loader.ready_q.length<=1){if(document.addEventListener){RH=function(){document.removeEventListener("DOMContentLoaded",RH,false);utag.loader.run_ready_q()};document.addEventListener("DOMContentLoaded",RH,false);window.addEventListener("load",utag.loader.run_ready_q,false);}else if(document.attachEvent){RH=function(){if(document.readyState!=="loading"){document.detachEvent("onreadystatechange",RH);utag.loader.run_ready_q()}};document.attachEvent("onreadystatechange",RH);window.attachEvent("onload",utag.loader.run_ready_q);}}}}else{if(a.addEventListener){a.addEventListener(b,c,false)}else if(a.attachEvent){a.attachEvent(((d==1)?"":"on")+b,c)}}},END:function(b,c,d,e,v,w){if(this.ended){return};this.ended=1;utag.DB("loader.END");b=utag.data;if(utag.handler.base&&utag.handler.base!='*'){e=utag.handler.base.split(",");for(d=0;d<e.length;d++){if(typeof b[e[d]]!="undefined")utag.handler.df[e[d]]=b[e[d]]}}else if(utag.handler.base=='*'){utag.ut.merge(utag.handler.df,b,1);}
utag.rpt['r_0']="t";for(var r in utag.loader.GV(utag.cond)){utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";}
utag.rpt.ts['s']=new Date();v=".tiqcdn.com";w=utag.cfg.path.indexOf(v);if(w>0&&b["cp.utag_main__ss"]==1)utag.ut.loader({src:utag.cfg.path.substring(0,w)+v+"/utag/tiqapp/utag.v.js?a="+utag.cfg.utid+(utag.cfg.nocookie?"&nocookie=1":"&cb="+(new Date).getTime()),id:"tiqapp"})
utag.handler.RE('view',b,"end");utag.handler.INIT();}},DB:function(a,b){if(utag.cfg.utagdb===false){return;}else if(typeof utag.cfg.utagdb=="undefined"){utag.db_log=[];b=document.cookie+'';utag.cfg.utagdb=((b.indexOf('utagdb=true')>=0)?true:false);}
if(utag.cfg.utagdb===true){utag.db_log.push(a);try{console.log(a)}catch(e){}}},RP:function(a,b,c){if(typeof a!='undefined'&&typeof a.src!='undefined'&&a.src!=''){b=[];for(c in utag.loader.GV(a)){if(c!='src')b.push(c+'='+escape(a[c]))}
this.dbi.push((new Image()).src=a.src+'?utv='+utag.cfg.v+'&utid='+utag.cfg.utid+'&'+(b.join('&')))}},view:function(a,c,d){return this.track({event:'view',data:a,cfg:{cb:c,uids:d}})},link:function(a,c){return this.track({event:'link',data:a,cfg:{cb:c}})},track:function(a,b,c,d){if(typeof a=="string")a={event:a,data:b,cfg:{cb:c}};for(d in utag.loader.GV(utag.o)){try{utag.o[d].handler.trigger(a.event||"view",a.data||a,a.cfg)}catch(e){utag.DB(e)};}
if(a.cfg&&a.cfg.cb)try{a.cfg.cb()}catch(e){utag.DB(e)};return true},handler:{base:"",df:{},o:{},send:{},iflag:0,INIT:function(a,b,c){utag.DB('utag.handler.INIT');this.iflag=1;a=utag.loader.q.length;if(a>0){for(b=0;b<a;b++){c=utag.loader.q[b];utag.handler.RE(c.a,c.b);utag.handler.trigger(c.a,c.b)}}
utag.cfg.noview=false;},test:function(){return 1},LR:function(){for(var d in utag.loader.GV(utag.cond)){utag.cond[d]=false;}
utag.loader.loadrules();utag.loader.initcfg();utag.loader.OU();},RE:function(a,b,c,d,e,f,g){if(c&&!this.cfg_extend){return 0;}
utag.DB('All Tags EXTENSIONS');if(typeof this.extend!="undefined"){g=0;for(d=0;d<this.extend.length;d++){try{e=0;if(typeof this.cfg_extend!="undefined"){f=this.cfg_extend[d];if(typeof f.count=="undefined")f.count=0;if(f[a]==0||(f.once==1&&f.count>0)||(typeof c!="undefined"&&f[c]==0)){e=1}else{if(typeof c!="undefined"&&f[c]==1){g=1};f.count++}}
if(e!=1){this.extend[d](a,b);utag.rpt['ex_'+d]=0}}catch(e){utag.rpt['ex_'+d]=1;utag.ut.error({e:e.message,s:utag.cfg.path+'utag.js',l:d,t:'ge'});}}
return g;}},trigger:function(a,b,c,d,e,f){utag.DB('trigger:'+a);b=b||{};if(!this.iflag){for(d in utag.loader.f){if(!(utag.loader.f[d]===1))utag.DB('Tag '+d+' did not LOAD')}
utag.loader.q.push({a:a,b:b});return;}
utag.ut.merge(b,this.df,0);utag.loader.RDqp(b);utag.loader.RDcp(b);utag.loader.RDdom(b);utag.loader.RDmeta(b);utag.loader.RDva(b);if(c&&c.uids){this.RE(a,b);for(f=0;f<c.uids.length;f++){d=c.uids[f];try{if(typeof utag.sender[d]!="undefined"){utag.sender[d].send(a,utag.handler.C(b));}else if(a=="view"&&utag.loader.cfg[d].load!=2&&utag.loader.cfg[d].s2s!=1){utag.ut.merge(utag.data,b,1);utag.loader.AS({id:d,load:1});}}catch(e){utag.DB(e)}}}else if(utag.cfg.load_rules_ajax){this.RE(a,b,"blr");utag.ut.merge(utag.data,b,1);this.LR();this.RE(a,b);for(d in utag.loader.cfg){try{if(utag.loader.cfg[d].load&&utag.loader.cfg[d].send){if(typeof utag.sender[d]!="undefined"){utag.sender[d].send(a,utag.handler.C(b));utag.rpt['s_'+d]=0;}else if(a=="view"&&utag.loader.cfg[d].load!=2&&utag.loader.cfg[d].s2s!=1){utag.loader.AS({id:d,load:1});}}}catch(e){utag.DB(e)}}}else{this.RE(a,b);for(d in utag.loader.GV(utag.sender)){try{utag.sender[d].send(a,utag.handler.C(b));utag.rpt['s_'+d]=0;}catch(e){utag.DB(e)}}}},C:function(a,b,c,d){b={};for(c in utag.loader.GV(a)){if(a[c]instanceof Array){b[c]=a[c].slice(0)}else{b[c]=a[c]}}
return b}},ut:{pad:function(a,b,c,d){a=""+((a-0).toString(16));d='';if(b>a.length){for(c=0;c<(b-a.length);c++){d+='0'}}return""+d+a},vi:function(t,a,b){a=this.pad(t,12);b=""+Math.random();a+=this.pad(b.substring(2,b.length),16);try{a+=this.pad((navigator.plugins.length?navigator.plugins.length:0),2);a+=this.pad(navigator.userAgent.length,3);a+=this.pad(document.URL.length,4);a+=this.pad(navigator.appVersion.length,3);a+=this.pad(screen.width+screen.height+parseInt((screen.colorDepth)?screen.colorDepth:screen.pixelDepth),5)}catch(e){utag.DB(e);a+="12345"};return a},isEmptyObject:function(o,a){for(a in o){return false;}
return true;},flatten:function(o){var a={};function r(c,p){if(Object(c)!==c||c instanceof Array){a[p]=c;}else{if(utag.ut.isEmptyObject(c)){}else{for(var d in c){r(c[d],p?p+"."+d:d);}}}}
r(o,"");return a;},merge:function(a,b,c,d){if(c){for(d in utag.loader.GV(b)){a[d]=b[d]}}else{for(d in utag.loader.GV(b)){if(typeof a[d]=="undefined")a[d]=b[d]}}},decode:function(a,b){b="";try{b=decodeURIComponent(a)}catch(e){utag.DB(e)};if(b==""){b=unescape(a)};return b},error:function(a,b,c){if(typeof utag_err!="undefined"){utag_err.push(a)}
c="";for(b in a){c+=b+":"+a[b]+" , "};utag.DB(c)},loader:function(o,a,b,c,l){a=document;if(o.type=="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type=="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}
if(o.id){b.id=o.id};if(typeof o.cb=="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb()},false);}else{b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}};}}
l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l=="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b)}}}}};utag.o['toysrus.us']=utag;utag.cfg={v:"ut4.31.201411192256",load_rules_ajax:true,load_rules_at_wait:false,lowerqp:false,session_timeout:1800000,readywait:0,noload:0,domain:utag.loader.lh(),path:"//tags.tiqcdn.com/utag/toysrus/us/prod/",utid:"toysrus/us/201411142101"};utag.cond={2:0,4:0,7:0};utag.loader.initdata=function(){try{utag.data=(typeof utag_data!='undefined')?utag_data:{};utag.udoname='utag_data';}catch(e){utag.data={};utag.DB('idf:'+e);}};utag.loader.loadrules=function(){try{utag.cond[2]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('m.toysrus.com'.toLowerCase())<0&&utag.data['dom.domain'].toString().toLowerCase().indexOf('t.toysrus.com'.toLowerCase())<0&&utag.data['dom.domain'].toString().toLowerCase().indexOf('tru.skavaone.com'.toLowerCase())<0&&utag.data['dom.domain'].toString().toLowerCase().indexOf('ttru.skavaone.com'.toLowerCase())<0&&utag.data['dom.domain'].toString().toLowerCase().indexOf('tru.localhost.com'.toLowerCase())<0)}catch(e){};try{utag.cond[4]|=(typeof utag.data['order_id']!='undefined'&&typeof utag.data['order_id']!='undefined'&&utag.data['order_id']!='')}catch(e){};try{utag.cond[7]|=(utag.data['page_name'].toString().toLowerCase().indexOf('Registry: Create: Step 1'.toLowerCase())>-1)||(utag.data['page_name'].toString().toLowerCase().indexOf('Email Signup'.toLowerCase())>-1)||(utag.data['page_name'].toString().toLowerCase().indexOf('Store Locator: Landing Page'.toLowerCase())>-1)||(utag.data['page_name'].toString().toLowerCase().indexOf('???'.toLowerCase())>-1)||(typeof utag.data['order_id']!='undefined'&&typeof utag.data['order_id']!='undefined'&&utag.data['order_id']!='')}catch(e){};};utag.pre=function(){utag.loader.initdata();try{utag.loader.RD(utag.data)}catch(e){utag.DB(e)};utag.loader.loadrules();};utag.loader.GET=function(){utag.cl={'_all_':1};utag.pre();utag.handler.extend=[function(a,b){try{var ild=b['transaction-total-item_level_promo_total'];var qtys=b['product_quantity'];var prcs=b['product_unit_price'];var t=b['order_subtotal'];if(t&&ild&&prcs&&qtys&&prcs.length>0&&qtys.length>0){var discArr=b['product_discount']||[];for(i=0;i<prcs.length;i++){if(typeof discArr[i]=="undefined"||discArr[i]==="")
discArr[i]=0;var w=(parseFloat(prcs[i])*parseInt(qtys[i]))/t;discArr[i]=((parseFloat(ild)*w)/parseInt(qtys[i])
+parseFloat(discArr[i])).toFixed(2);}
b['product_discount']=discArr;}}catch(e){utag.DB('error converting item level discount: ',e);}},function(a,b,c,d){b._ccity=(typeof b['customer_city']!='undefined')?b['customer_city']:'';b._ccountry=(typeof b['customer_country']!='undefined')?b['customer_country']:'';b._ccurrency=(typeof b['order_currency']!='undefined')?b['order_currency']:'';b._ccustid=(typeof b['customer_id']!='undefined')?b['customer_id']:'';b._corder=(typeof b['order_id']!='undefined')?b['order_id']:'';b._cpromo=(typeof b['order_coupon_code']!='undefined')?b['order_coupon_code']:'';b._cship=(typeof b['order_shipping']!='undefined')?b['order_shipping']:'';b._cstate=(typeof b['customer_state']!='undefined')?b['customer_state']:'';b._cstore=(typeof b['order_store']!='undefined')?b['order_store']:'web';b._csubtotal=(typeof b['order_subtotal']!='undefined')?b['order_subtotal']:'';b._ctax=(typeof b['order_tax']!='undefined')?b['order_tax']:'';b._ctotal=(typeof b['order_total']!='undefined')?b['order_total']:'';b._ctype=(typeof b['order_type']!='undefined')?b['order_type']:'';b._czip=(typeof b['customer_zip']!='undefined')?b['customer_zip']:'';b._cprod=(typeof b['product_id']!='undefined'&&b['product_id'].length>0)?b['product_id']:[];b._cprodname=(typeof b['product_name']!='undefined'&&b['product_name'].length>0)?b['product_name']:[];b._cbrand=(typeof b['product_brand']!='undefined'&&b['product_brand'].length>0)?b['product_brand']:[];b._ccat=(typeof b['product_category']!='undefined'&&b['product_category'].length>0)?b['product_category']:[];b._ccat2=(typeof b['product_subcategory']!='undefined'&&b['product_subcategory'].length>0)?b['product_subcategory']:[];b._cquan=(typeof b['product_quantity']!='undefined'&&b['product_quantity'].length>0)?b['product_quantity']:[];b._cprice=(typeof b['product_unit_price']!='undefined'&&b['product_unit_price'].length>0)?b['product_unit_price']:[];b._csku=(typeof b['product_sku']!='undefined'&&b['product_sku'].length>0)?b['product_sku']:[];b._cpdisc=(typeof b['product_discount']!='undefined'&&b['product_discount'].length>0)?b['product_discount']:[];if(b._cprod.length==0){b._cprod=b._csku.slice()};if(b._cprodname.length==0){b._cprodname=b._csku.slice()};function tf(a){if(a==''||isNaN(parseFloat(a))){return a}else{return(parseFloat(a)).toFixed(2)}};b._ctotal=tf(b._ctotal);b._csubtotal=tf(b._csubtotal);b._ctax=tf(b._ctax);b._cship=tf(b._cship);for(c=0;c<b._cprice.length;c++){b._cprice[c]=tf(b._cprice[c])};for(c=0;c<b._cpdisc.length;c++){b._cpdisc[c]=tf(b._cpdisc[c])};}];utag.loader.initcfg=function(){utag.loader.cfg={"13":{load:utag.cond[2],send:1,wait:1,tid:7115},"19":{load:(utag.cond[2]&&utag.cond[4]),send:1,wait:1,tid:16008},"22":{load:utag.cond[2],send:1,wait:1,tid:7115},"23":{load:(utag.cond[2]&&utag.cond[4]),send:1,wait:1,tid:16008},"30":{load:utag.cond[7],send:1,wait:1,tid:19038}};utag.loader.cfgsort=["13","19","22","23","30"];}
utag.loader.initcfg();}
if(typeof utag_cfg_ovrd!='undefined'){for(var i in utag.loader.GV(utag_cfg_ovrd))utag.cfg[i]=utag_cfg_ovrd[i]};utag.loader.PINIT=function(a,b,c){utag.DB("Pre-INIT");if(utag.cfg.noload){return;}
try{this.GET();if(utag.handler.RE('view',utag.data,"blr")){utag.handler.LR();}}catch(e){utag.DB(e)};a=this.cfg;c=0;for(b in this.GV(a)){if(a[b].load>0&&(typeof a[b].src!='undefined'&&a[b].src!='')){a[b].block=1}
if(a[b].block){if(a[b].load==4)a[b].load=1;c=1;this.bq[b]=1;a[b].cb=function(){var d=this.uid;utag.loader.cfg[d].cbf=1;utag.loader.LOAD(d)};a[b].id=b;this.AS(a[b]);}}
if(c==0)this.INIT();};utag.loader.INIT=function(a,b,c,d,e){utag.DB('utag.loader.INIT');if(this.ol==1)return-1;else this.ol=1;utag.handler.RE('view',utag.data);utag.rpt.ts['i']=new Date();d=this.cfgsort;for(a=0;a<d.length;a++){e=d[a];b=this.cfg[e];b.id=e;if(b.block!=1&&b.s2s!=1){if(utag.loader.bk[b.id]){this.f[b.id]=0;utag.loader.LOAD(b.id)
}else if(b.wait==1&&utag.loader.rf==0&&!(b.load==4&&utag.cfg.noview)){utag.DB('utag.loader.INIT: waiting '+b.id);this.wq.push(b)
this.f[b.id]=2;}else if(b.load>0){utag.DB('utag.loader.INIT: loading '+b.id);this.lq.push(b);this.AS(b);}}}
if(this.wq.length>0)utag.loader.EV('','ready',function(a){if(utag.loader.rf==0){utag.DB('READY:utag.loader.wq');utag.loader.rf=1;utag.loader.WQ();}});else if(this.lq.length>0)utag.loader.rf=1;else if(this.lq.length==0)utag.loader.END();return 1};utag.loader.EV('','ready',function(a){if(utag.loader.efr!=1){utag.loader.efr=1;try{if(typeof utag.runonce=='undefined')utag.runonce={};if(typeof utag.runonce[7]=='undefined'){utag.runonce[7]=1;jQuery('#emailSignup a.signUpButton, #ts_email_signup input:image').bind('click',function(e){utag.view({page_type:'email-signup',page_name:'Email Signup'})})}}catch(e){};}})
if(utag.cfg.readywait){utag.loader.EV('','ready',function(a){if(utag.loader.rf==0){utag.loader.rf=1;utag.DB('READY:utag.cfg.readywait');utag.loader.PINIT();}})}else{utag.loader.PINIT()}}