//tealium universal tag - utag.loader ut4.0.201411251826, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var utag_condload=false;try{(function(){function ul(src,a,b){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=src;a.getElementsByTagName('head')[0].appendChild(b)};if((""+document.cookie).match("utag_env_qvc_qvcus=([^\S;]*)")){if(RegExp.$1.indexOf("/prod/")===-1){ul(RegExp.$1);utag_condload=true;__tealium_default_path='//tags.tiqcdn.com/utag/qvc/qvcus/prod/';}}})();}catch(e){};try{if(typeof(utag_data)=='undefined'){var utag_data={page_type:'default'};}
}catch(e){};if(!utag_condload){try{if(utag_data.page_type==='order'){utag_data.order_total=utag_data.trans_grand_total;utag_data.order_subtotal=utag_data.trans_grand_total;utag_data.order_id='';utag_data.product_id=[];utag_data.product_category_id=[];utag_data.order_products='';for(i=0;i<utag_data.trans_orders.length;i++){utag_data.order_id+=utag_data.trans_orders[i].order_id;utag_data.product_category_id.push(utag_data.trans_orders[i].product_category_id[0]);if(i<(utag_data.trans_orders.length-1)){utag_data.order_id+='|';}
for(y=0;y<utag_data.trans_orders[i].product_id.length;y++){utag_data.product_id.push(utag_data.trans_orders[i].product_id[y]);}}
for(j=0;j<utag_data.product_id.length;j++){utag_data.order_products+=utag_data.product_id[j];if(j<(utag_data.product_id.length-1)){utag_data.order_products+='|';}}}
if(utag_data.page_type==='cart'){if(utag_data.product_price){utag_data.cart_value=0;for(i=0;i<utag_data.product_price.length;i++){utag_data.cart_value=utag_data.cart_value+parseFloat(utag_data.product_price[i]);}
utag_data.cart_value=utag_data.cart_value.toFixed(2);}}}catch(e){}};if(!utag_condload){try{function md5cycle(x,k){var a=x[0],b=x[1],c=x[2],d=x[3];a=ff(a,b,c,d,k[0],7,-680876936);d=ff(d,a,b,c,k[1],12,-389564586);c=ff(c,d,a,b,k[2],17,606105819);b=ff(b,c,d,a,k[3],22,-1044525330);a=ff(a,b,c,d,k[4],7,-176418897);d=ff(d,a,b,c,k[5],12,1200080426);c=ff(c,d,a,b,k[6],17,-1473231341);b=ff(b,c,d,a,k[7],22,-45705983);a=ff(a,b,c,d,k[8],7,1770035416);d=ff(d,a,b,c,k[9],12,-1958414417);c=ff(c,d,a,b,k[10],17,-42063);b=ff(b,c,d,a,k[11],22,-1990404162);a=ff(a,b,c,d,k[12],7,1804603682);d=ff(d,a,b,c,k[13],12,-40341101);c=ff(c,d,a,b,k[14],17,-1502002290);b=ff(b,c,d,a,k[15],22,1236535329);a=gg(a,b,c,d,k[1],5,-165796510);d=gg(d,a,b,c,k[6],9,-1069501632);c=gg(c,d,a,b,k[11],14,643717713);b=gg(b,c,d,a,k[0],20,-373897302);a=gg(a,b,c,d,k[5],5,-701558691);d=gg(d,a,b,c,k[10],9,38016083);c=gg(c,d,a,b,k[15],14,-660478335);b=gg(b,c,d,a,k[4],20,-405537848);a=gg(a,b,c,d,k[9],5,568446438);d=gg(d,a,b,c,k[14],9,-1019803690);c=gg(c,d,a,b,k[3],14,-187363961);b=gg(b,c,d,a,k[8],20,1163531501);a=gg(a,b,c,d,k[13],5,-1444681467);d=gg(d,a,b,c,k[2],9,-51403784);c=gg(c,d,a,b,k[7],14,1735328473);b=gg(b,c,d,a,k[12],20,-1926607734);a=hh(a,b,c,d,k[5],4,-378558);d=hh(d,a,b,c,k[8],11,-2022574463);c=hh(c,d,a,b,k[11],16,1839030562);b=hh(b,c,d,a,k[14],23,-35309556);a=hh(a,b,c,d,k[1],4,-1530992060);d=hh(d,a,b,c,k[4],11,1272893353);c=hh(c,d,a,b,k[7],16,-155497632);b=hh(b,c,d,a,k[10],23,-1094730640);a=hh(a,b,c,d,k[13],4,681279174);d=hh(d,a,b,c,k[0],11,-358537222);c=hh(c,d,a,b,k[3],16,-722521979);b=hh(b,c,d,a,k[6],23,76029189);a=hh(a,b,c,d,k[9],4,-640364487);d=hh(d,a,b,c,k[12],11,-421815835);c=hh(c,d,a,b,k[15],16,530742520);b=hh(b,c,d,a,k[2],23,-995338651);a=ii(a,b,c,d,k[0],6,-198630844);d=ii(d,a,b,c,k[7],10,1126891415);c=ii(c,d,a,b,k[14],15,-1416354905);b=ii(b,c,d,a,k[5],21,-57434055);a=ii(a,b,c,d,k[12],6,1700485571);d=ii(d,a,b,c,k[3],10,-1894986606);c=ii(c,d,a,b,k[10],15,-1051523);b=ii(b,c,d,a,k[1],21,-2054922799);a=ii(a,b,c,d,k[8],6,1873313359);d=ii(d,a,b,c,k[15],10,-30611744);c=ii(c,d,a,b,k[6],15,-1560198380);b=ii(b,c,d,a,k[13],21,1309151649);a=ii(a,b,c,d,k[4],6,-145523070);d=ii(d,a,b,c,k[11],10,-1120210379);c=ii(c,d,a,b,k[2],15,718787259);b=ii(b,c,d,a,k[9],21,-343485551);x[0]=add32(a,x[0]);x[1]=add32(b,x[1]);x[2]=add32(c,x[2]);x[3]=add32(d,x[3]);}
function cmn(q,a,b,x,s,t){a=add32(add32(a,q),add32(x,t));return add32((a<<s)|(a>>>(32-s)),b);}
function ff(a,b,c,d,x,s,t){return cmn((b&c)|((~b)&d),a,b,x,s,t);}
function gg(a,b,c,d,x,s,t){return cmn((b&d)|(c&(~d)),a,b,x,s,t);}
function hh(a,b,c,d,x,s,t){return cmn(b^c^d,a,b,x,s,t);}
function ii(a,b,c,d,x,s,t){return cmn(c^(b|(~d)),a,b,x,s,t);}
function md51(s){txt='';var n=s.length,state=[1732584193,-271733879,-1732584194,271733878],i;for(i=64;i<=s.length;i+=64){md5cycle(state,md5blk(s.substring(i-64,i)));}
s=s.substring(i-64);var tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<s.length;i++)
tail[i>>2]|=s.charCodeAt(i)<<((i%4)<<3);tail[i>>2]|=0x80<<((i%4)<<3);if(i>55){md5cycle(state,tail);for(i=0;i<16;i++)tail[i]=0;}
tail[14]=n*8;md5cycle(state,tail);return state;}
function md5blk(s){var md5blks=[],i;for(i=0;i<64;i+=4){md5blks[i>>2]=s.charCodeAt(i)
+(s.charCodeAt(i+1)<<8)
+(s.charCodeAt(i+2)<<16)
+(s.charCodeAt(i+3)<<24);}
return md5blks;}
var hex_chr='0123456789abcdef'.split('');function rhex(n)
{var s='',j=0;for(;j<4;j++)
s+=hex_chr[(n>>(j*8+4))&0x0F]
+hex_chr[(n>>(j*8))&0x0F];return s;}
function hex(x){for(var i=0;i<x.length;i++)
x[i]=rhex(x[i]);return x.join('');}
function md5(s){return hex(md51(s));}
function add32(a,b){return(a+b)&0xFFFFFFFF;}
if(md5('hello')!='5d41402abc4b2a76b9719d911017c592'){function add32(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF),msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}}}catch(e){}};if(!utag_condload){try{window.utag_cfg_ovrd=window.utag_cfg_ovrd||{};window.utag_cfg_ovrd.load_rules_at_wait=true;}catch(e){}};if(typeof utag=="undefined"&&!utag_condload){var utag={id:"qvc.qvcus",o:{},sender:{},send:{},rpt:{ts:{a:new Date()}},dbi:[],loader:{q:[],lc:0,f:{},p:0,ol:0,wq:[],lq:[],bq:{},bk:{},rf:0,ri:0,rp:0,rq:[],lh:function(a,b,c){a=""+location.hostname;b=a.split(".");c=(/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\./.test(a))?3:2;return b.splice(b.length-c,c).join(".");},WQ:function(a,b,c,d){utag.DB('WQ:'+utag.loader.wq.length);try{if(utag.udoname&&utag.udoname.indexOf(".")<0){utag.ut.merge(utag.data,window[utag.udoname],0);}
utag.handler.RE('view',utag.data,"bwq");if(utag.cfg.load_rules_at_wait){utag.handler.LR();}}catch(e){utag.DB(e)};d=0;for(a=0;a<utag.loader.wq.length;a++){b=utag.loader.wq[a];b.load=utag.loader.cfg[b.id].load;if(b.load==4){this.f[b.id]=0;utag.loader.LOAD(b.id)}else if(b.load>0){utag.loader.AS(b);d++;}else{this.f[b.id]=1;}}
if(d==0){utag.loader.END();}},AS:function(a,b,c,d){utag.send[a.id]=a;if(typeof a.src=='undefined'){a.src=utag.cfg.path+((typeof a.name!='undefined')?a.name:'utag.'+a.id+'.js')}
a.src+=(a.src.indexOf('?')>0?'&':'?')+'utv='+(a.v?a.v:utag.cfg.v);utag.rpt['l_'+a.id]=a.src;b=document;this.f[a.id]=0;if(a.load==2){b.write('<script id="utag_'+a.id+'" src="'+a.src+'"></scr'+'ipt>')
if(typeof a.cb!='undefined')a.cb();}else if(a.load==1||a.load==3){if(b.createElement){c='utag_qvc.qvcus_'+a.id;if(!b.getElementById(c)){d={src:a.src,id:c,loc:a.loc}
if(a.load==3){d.type="iframe"};if(typeof a.cb!='undefined')d.cb=a.cb;utag.ut.loader(d);}}}},GV:function(a,b,c){b={};for(c in a){if(a.hasOwnProperty(c)&&typeof a[c]!="function")b[c]=a[c];}
return b},RDdom:function(o){o["dom.referrer"]=eval("document."+"referrer");o["dom.title"]=""+document.title;o["dom.domain"]=""+location.hostname;o["dom.query_string"]=(""+location.search).substring(1);o["dom.hash"]=(""+location.hash).substring(1);o["dom.url"]=""+document.URL;o["dom.pathname"]=""+location.pathname;},RDcp:function(o,b,c,d){b=b||utag.loader.RC();for(d in b){if(d.match(/utag_(.*)/)){for(c in utag.loader.GV(b[d])){o["cp.utag_"+RegExp.$1+"_"+c]=b[d][c];}}}
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
utag.loader.ready_q.push(c);var RH;if(utag.loader.ready_q.length<=1){if(document.addEventListener){RH=function(){document.removeEventListener("DOMContentLoaded",RH,false);utag.loader.run_ready_q()};document.addEventListener("DOMContentLoaded",RH,false);window.addEventListener("load",utag.loader.run_ready_q,false);}else if(document.attachEvent){RH=function(){if(document.readyState!=="loading"){document.detachEvent("onreadystatechange",RH);utag.loader.run_ready_q()}};document.attachEvent("onreadystatechange",RH);window.attachEvent("onload",utag.loader.run_ready_q);}}}}else{if(a.addEventListener){a.addEventListener(b,c,false)}else if(a.attachEvent){a.attachEvent(((d==1)?"":"on")+b,c)}}},END:function(b,c,d,e){if(this.ended){return};this.ended=1;utag.DB("loader.END");b=utag.data;if(utag.handler.base&&utag.handler.base!='*'){e=utag.handler.base.split(",");for(d=0;d<e.length;d++){if(typeof b[e[d]]!="undefined")utag.handler.df[e[d]]=b[e[d]]}}else if(utag.handler.base=='*'){utag.ut.merge(utag.handler.df,b,1);}
utag.rpt['r_0']="t";for(var r in utag.loader.GV(utag.cond)){utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";}
utag.rpt.ts['s']=new Date();if(b["cp.utag_main__ss"]==1)utag.ut.loader({src:"//tags.tiqcdn.com/utag/tiqapp/utag.v.js?a="+utag.cfg.utid+(utag.cfg.nocookie?"&nocookie=1":"&cb="+(new Date).getTime()),id:"tiqapp"});utag.handler.RE('view',b,"end");utag.handler.INIT();}},DB:function(a,b){if(utag.cfg.utagdb===false){return;}else if(typeof utag.cfg.utagdb=="undefined"){utag.db_log=[];b=document.cookie+'';utag.cfg.utagdb=((b.indexOf('utagdb=true')>=0)?true:false);}
if(utag.cfg.utagdb===true){utag.db_log.push(a);try{console.log(a)}catch(e){}}},RP:function(a,b,c){if(typeof a!='undefined'&&typeof a.src!='undefined'&&a.src!=''){b=[];for(c in utag.loader.GV(a)){if(c!='src')b.push(c+'='+escape(a[c]))}
this.dbi.push((new Image()).src=a.src+'?utv='+utag.cfg.v+'&utid='+utag.cfg.utid+'&'+(b.join('&')))}},view:function(a,c,d){return this.track({event:'view',data:a,cfg:{cb:c,uids:d}})},link:function(a,c){return this.track({event:'link',data:a,cfg:{cb:c}})},track:function(a,b,c,d){if(typeof a=="string")a={event:a,data:b,cfg:{cb:c}};for(d in utag.loader.GV(utag.o)){try{utag.o[d].handler.trigger(a.event||"view",a.data||a,a.cfg)}catch(e){utag.DB(e)};}
if(a.cfg&&a.cfg.cb)try{a.cfg.cb()}catch(e){utag.DB(e)};return true},handler:{base:"",df:{},o:{},send:{},iflag:0,INIT:function(a,b,c){utag.DB('utag.handler.INIT');this.iflag=1;a=utag.loader.q.length;if(a>0){for(b=0;b<a;b++){c=utag.loader.q[b];utag.handler.RE(c.a,c.b);utag.handler.trigger(c.a,c.b)}}
utag.cfg.noview=false;},test:function(){return 1},LR:function(){for(var d in utag.loader.GV(utag.cond)){utag.cond[d]=false;}
utag.loader.loadrules();if(utag.loader.initcfg){utag.loader.initcfg()}else{utag.loader.GET()};},RE:function(a,b,c,d,e,f,g){if(c&&!this.cfg_extend){return 0;}
utag.DB('All Tags EXTENSIONS');if(typeof this.extend!="undefined"){g=0;for(d=0;d<this.extend.length;d++){try{e=0;if(typeof this.cfg_extend!="undefined"){f=this.cfg_extend[d];if(typeof f.count=="undefined")f.count=0;if(f[a]==0||(f.once==1&&f.count>0)||(typeof c!="undefined"&&f[c]==0)){e=1}else{if(typeof c!="undefined"&&f[c]==1){g=1};f.count++}}
if(e!=1){this.extend[d](a,b);utag.rpt['ex_'+d]=0}}catch(e){utag.rpt['ex_'+d]=1;utag.ut.error({e:e.message,s:utag.cfg.path+'utag.js',l:d,t:'ge'});}}
return g;}},trigger:function(a,b,c,d,e,f){utag.DB('trigger:'+a);b=b||{};if(!this.iflag){utag.loader.q.push({a:a,b:b});return;}
utag.ut.merge(b,this.df,0);utag.loader.RDqp(b);utag.loader.RDcp(b);utag.loader.RDdom(b);utag.loader.RDmeta(b);utag.loader.RDva(b);if(c&&c.uids){this.RE(a,b);for(f=0;f<c.uids.length;f++){d=c.uids[f];try{if(typeof utag.sender[d]!="undefined"){utag.sender[d].send(a,utag.handler.C(b));}else if(a=="view"&&utag.loader.cfg[d].load!=2&&utag.loader.cfg[d].s2s!=1){utag.ut.merge(utag.data,b,1);utag.loader.AS({id:d,load:1});}}catch(e){utag.DB(e)}}}else if(utag.cfg.load_rules_ajax){this.RE(a,b,"blr");utag.ut.merge(utag.data,b,1);this.LR();this.RE(a,b);for(d in utag.loader.cfg){try{if(utag.loader.cfg[d].load&&utag.loader.cfg[d].send){if(typeof utag.sender[d]!="undefined"){utag.sender[d].send(a,utag.handler.C(b));utag.rpt['s_'+d]=0;}else if(a=="view"&&utag.loader.cfg[d].load!=2&&utag.loader.cfg[d].s2s!=1){utag.ut.merge(utag.data,b,1);utag.loader.AS({id:d,load:1});}}}catch(e){utag.DB(e)}}}else{this.RE(a,b);for(d in utag.loader.GV(utag.sender)){try{utag.sender[d].send(a,utag.handler.C(b));utag.rpt['s_'+d]=0;}catch(e){utag.DB(e)}}}},C:function(a,b,c,d){b={};for(c in utag.loader.GV(a)){if(a[c]instanceof Array){b[c]=a[c].slice(0)}else{b[c]=a[c]}}
return b}},ut:{pad:function(a,b,c,d){a=""+((a-0).toString(16));d='';if(b>a.length){for(c=0;c<(b-a.length);c++){d+='0'}}return""+d+a},vi:function(t,a,b){a=this.pad(t,12);b=""+Math.random();a+=this.pad(b.substring(2,b.length),16);try{a+=this.pad((navigator.plugins.length?navigator.plugins.length:0),2)}catch(e){};a+=this.pad(navigator.userAgent.length,3);a+=this.pad(top.document.URL.length,4);a+=this.pad(navigator.appVersion.length,3);a+=this.pad(screen.width+screen.height+parseInt((screen.colorDepth)?screen.colorDepth:screen.pixelDepth),5);return a},isEmptyObject:function(o,a){for(a in o){return false;}
return true;},flatten:function(o){var a={};function r(c,p){if(Object(c)!==c||c instanceof Array){a[p]=c;}else{if(utag.ut.isEmptyObject(c)){}else{for(var d in c){r(c[d],p?p+"."+d:d);}}}}
r(o,"");return a;},merge:function(a,b,c,d){if(c){for(d in utag.loader.GV(b)){a[d]=b[d]}}else{for(d in utag.loader.GV(b)){if(typeof a[d]=="undefined")a[d]=b[d]}}},decode:function(a,b){b="";try{b=decodeURIComponent(a)}catch(e){utag.DB(e)};if(b==""){b=unescape(a)};return b},error:function(a,b,c){if(typeof utag_err!="undefined"){utag_err.push(a)}
c="";for(b in a){c+=b+":"+a[b]+" , "};utag.DB(c)},loader:function(o,a,b,c,l){a=document;if(o.type=="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type=="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.src=o.src;}
if(o.id){b.id=o.id};if(typeof o.cb=="function"){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb()}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb()}}}
l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l=="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b)}}}}};utag.o['qvc.qvcus']=utag;utag.cfg={v:"ut4.28.201411251826",load_rules_ajax:true,load_rules_at_wait:false,lowerqp:false,session_timeout:1800000,readywait:0,noload:0,domain:utag.loader.lh(),path:"//tags.tiqcdn.com/utag/qvc/qvcus/prod/",utid:"qvc/qvcus/201411251826"};utag.cond={2:0,5:0,7:0};utag.loader.initdata=function(){try{utag.data=(typeof utag_data!='undefined')?utag_data:{};utag.udoname='utag_data';}catch(e){utag.data={};utag.DB('idf:'+e);}};utag.loader.loadrules=function(){try{utag.cond[2]|=(utag.data['page_type'].toString().toLowerCase().indexOf('order'.toLowerCase())>-1)}catch(e){};try{utag.cond[5]|=(utag.data['page_type'].toString().toLowerCase().indexOf('home'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('cart'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('order'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('fashionmeta'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('shmeta'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('jewelrymeta'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('beautymeta'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('kitchenmeta'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('fthmeta'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('electronicsmeta'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('fitnessmeta'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('keurig'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('vitamix'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('ninja'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('kitchenaid'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('apple'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('canon'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('dell'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('hp'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('lorigreiner'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('dyson'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('rowenta'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('shark'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('josiemaran'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('laurageller'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('mally'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('philosophy'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('bronzo'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('honora'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('johnhardy'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('ripka'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('clarks'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('dooney'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('orthaheel'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('dennisbasso'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('isaac'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('susangraver'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('bedding'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('mattresses'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('serta'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('myaccount'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('signin'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('reg_ship'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('reg_conf'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('holidayguide'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('itkwd'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('lrsxmas'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('dooneydays'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('blackfriday'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('cybermonday'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('greenmonday'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('givegorg'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('freesh'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('ffany'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('joanrivers'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('quacker'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('gili'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('marcfisher'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('verabradley'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('bareminerals'.toLowerCase())>-1)||(utag.data['page_type'].toString().toLowerCase().indexOf('clarisonic'.toLowerCase())>-1)}catch(e){};try{utag.cond[7]|=(utag.data['page_type'].toString().toLowerCase().indexOf('order'.toLowerCase())>-1)||(utag.data['dom.query_string'].toString().toLowerCase().indexOf('ref=AMZ'.toLowerCase())>-1)||(utag.data['dom.query_string'].toString().toLowerCase().indexOf('ref=GFS'.toLowerCase())>-1)||(utag.data['dom.query_string'].toString().toLowerCase().indexOf('ref=GAS'.toLowerCase())>-1)||(utag.data['dom.query_string'].toString().toLowerCase().indexOf('ref=GBA'.toLowerCase())>-1)||(utag.data['dom.query_string'].toString().toLowerCase().indexOf('ref=BRS'.toLowerCase())>-1)||(utag.data['dom.query_string'].toString().toLowerCase().indexOf('ref=PG4'.toLowerCase())>-1)||(utag.data['dom.query_string'].toString().toLowerCase().indexOf('ref=BCM'.toLowerCase())>-1)||(utag.data['dom.query_string'].toString().toLowerCase().indexOf('ref=JF1'.toLowerCase())>-1)||(utag.data['dom.query_string'].toString().toLowerCase().indexOf('ref=POL'.toLowerCase())>-1)}catch(e){};};utag.pre=function(){utag.loader.initdata();try{utag.loader.RD(utag.data)}catch(e){utag.DB(e)};utag.loader.loadrules();};utag.loader.GET=function(){utag.cl={'_all_':1};utag.pre();utag.handler.extend=[function(a,b){if(b.trans_orders){for(var i=0;i<b.trans_orders.length;i++){for(var x in b.trans_orders[i]){if(b.trans_orders[i][x]instanceof Array){for(var k=0;k<b.trans_orders[i][x].length;k++){b["flat_"+x]=b["flat_"+x]||[];b["flat_"+x].push(b.trans_orders[i][x][k]);}}
else if(typeof b.trans_orders[i][x]=='string'){for(var j=0;j<b.trans_orders[i].product_id.length;j++){b["flat_"+x]=b["flat_"+x]||[];b["flat_"+x].push(b.trans_orders[i][x]);}}}}}},function(a,b,c,d){b._ccity='';b._ccountry='';b._ccurrency='';b._ccustid='';b._corder=(typeof b['trans_id']!='undefined')?b['trans_id']:'';b._cpromo='';b._cship='';b._cstate='';b._cstore='';b._csubtotal=(typeof b['trans_grand_total']!='undefined')?b['trans_grand_total']:'';b._ctax='';b._ctotal=(typeof b['trans_grand_total']!='undefined')?b['trans_grand_total']:'';b._ctype='';b._czip='';b._cprod=(typeof b['flat_product_id']!='undefined'&&b['flat_product_id'].length>0)?b['flat_product_id']:[];b._cprodname=(typeof b['flat_product_name']!='undefined'&&b['flat_product_name'].length>0)?b['flat_product_name']:[];b._cbrand=[];b._ccat=(typeof b['product_category_id']!='undefined'&&b['product_category_id'].length>0)?b['product_category_id']:[];b._ccat2=[];b._cquan=(typeof b['flat_product_quantity']!='undefined'&&b['flat_product_quantity'].length>0)?b['flat_product_quantity']:[];b._cprice=(typeof b['flat_product_price']!='undefined'&&b['flat_product_price'].length>0)?b['flat_product_price']:[];b._csku=[];b._cpdisc=[];if(b._cprod.length==0){b._cprod=b._csku.slice()};if(b._cprodname.length==0){b._cprodname=b._csku.slice()};function tf(a){if(a==''||isNaN(parseFloat(a))){return a}else{return(parseFloat(a)).toFixed(2)}};b._ctotal=tf(b._ctotal);b._csubtotal=tf(b._csubtotal);b._ctax=tf(b._ctax);b._cship=tf(b._cship);for(c=0;c<b._cprice.length;c++){b._cprice[c]=tf(b._cprice[c])};for(c=0;c<b._cpdisc.length;c++){b._cpdisc[c]=tf(b._cpdisc[c])};},function(a,b){if((/^\/fashion\/_\/N-lglt\/c\.html/i.test(b['dom.pathname'])&&b['dom.title'].toString().toLowerCase().indexOf('Shop Fashion Online'.toLowerCase())>-1)){b['page_type']='fashionmeta'}},function(a,b){if((/^\/shoes-&-handbags\/_\/N-uopy\/c\.html/i.test(b['dom.pathname'])&&b['dom.title'].toString().toLowerCase().indexOf('Fashion Accessories for Women'.toLowerCase())>-1)){b['page_type']='shmeta'}},function(a,b){if((/^\/jewelry\/_\/N-mflu\/c\.html/i.test(b['dom.pathname'])&&b['dom.title'].toString().toLowerCase().indexOf('Shop for Jewelry Online'.toLowerCase())>-1)){b['page_type']='jewelrymeta'}},function(a,b){if((/^\/beauty\/_\/N-rhty\/c\.html/i.test(b['dom.pathname'])&&b['dom.title'].toString().toLowerCase().indexOf('Hair, Nail & Skin Care Products'.toLowerCase())>-1)){b['page_type']='beautymeta'}},function(a,b){if((/^\/kitchen-&-food\/_\/N-lglv\/c\.html/i.test(b['dom.pathname'])&&b['dom.title'].toString().toLowerCase().indexOf('Cookware, Baking Supplies & More'.toLowerCase())>-1)){b['page_type']='kitchenmeta'}},function(a,b){if((/^\/for-the-home\/_\/N-lglu\/c\.html/i.test(b['dom.pathname'])&&b['dom.title'].toString().toLowerCase().indexOf('For the Home'.toLowerCase())>-1)){b['page_type']='fthmeta'}},function(a,b){if((/^\/electronics\/_\/N-lglw\/c\.html/i.test(b['dom.pathname'])&&b['dom.title'].toString().toLowerCase().indexOf('Shop Electronics Online'.toLowerCase())>-1)){b['page_type']='electronicsmeta'}},function(a,b){if(/^\/kitchen-&-food\/keurig\/_\/N-lglvZ1z141kk\/c\.html/i.test(b['dom.pathname'])){b['page_type']='keurig'}},function(a,b){if(/^\/kitchen-&-food\/vitamix\/_\/N-lglvZ1z13ejs\/c\.html/i.test(b['dom.pathname'])){b['page_type']='vitamix'}},function(a,b){if(/^\/kitchen-&-food\/ninja\/_\/N-lglvZ1z139k3\/c\.html/i.test(b['dom.pathname'])){b['page_type']='ninja'}},function(a,b){if(/^\/kitchen-&-food\/kitchenaid\/_\/N-lglvZ1z141l1\/c\.html/i.test(b['dom.pathname'])){b['page_type']='kitchenaid'}},function(a,b){if(/^\/electronics\/apple\/_\/N-lglwZ1z13xnv\/c\.html/i.test(b['dom.pathname'])){b['page_type']='apple'}},function(a,b){if(/^\/electronics\/canon\/_\/N-lglwZ1z140je\/c\.html/i.test(b['dom.pathname'])){b['page_type']='canon'}},function(a,b){if(/^\/electronics\/dell\/_\/N-lglwZ8d\/c\.html/i.test(b['dom.pathname'])){b['page_type']='dell'}},function(a,b){if(/^\/electronics\/hp\/_\/N-lglwZ1z140j2\/c\.html/i.test(b['dom.pathname'])){b['page_type']='hp'}},function(a,b){if(/^\/Lori\+Greiner\.content\.html/i.test(b['dom.pathname'])||/^\/LoriGreiner\.content\.html/i.test(b['dom.pathname'])){b['page_type']='lorigreiner'}},function(a,b){if(/^\/for-the-home\/dyson\/_\/N-lgluZ1z13ibw\/c\.html/i.test(b['dom.pathname'])){b['page_type']='dyson'}},function(a,b){if(/^\/for-the-home\/rowenta\/_\/N-lgluZ1z140gs\/c\.html/i.test(b['dom.pathname'])){b['page_type']='rowenta'}},function(a,b){if(/^\/for-the-home\/shark\/_\/N-lgluZ1z139tx\/c\.html/i.test(b['dom.pathname'])){b['page_type']='shark'}},function(a,b){if(/^\/beauty\/josie-maran\/_\/N-rhtyZ1z13hfo\/c\.html/i.test(b['dom.pathname'])){b['page_type']='josiemaran'}},function(a,b){if(/^\/beauty\/laura-geller\/_\/N-rhtyZ1z141qc\/c\.html/i.test(b['dom.pathname'])){b['page_type']='laurageller'}},function(a,b){if(/^\/beauty\/mally-beauty\/_\/N-rhtyZ1z1416k\/c\.html/i.test(b['dom.pathname'])){b['page_type']='mally'}},function(a,b){if(/^\/beauty\/philosophy\/_\/N-rhtyZ1z13dvt\/c\.html/i.test(b['dom.pathname'])){b['page_type']='philosophy'}},function(a,b){if(/^\/jewelry\/bronzo-italia\/_\/N-mfluZ1z13b3t\/c\.html/i.test(b['dom.pathname'])){b['page_type']='bronzo'}},function(a,b){if(/^\/jewelry\/honora\/_\/N-mfluZ1z1419f\/c\.html/i.test(b['dom.pathname'])){b['page_type']='honora'}},function(a,b){if(/^\/jewelry\/jai-john-hardy\/_\/N-mfluZ1z13aap\/c\.html/i.test(b['dom.pathname'])){b['page_type']='johnhardy'}},function(a,b){if(/^\/jewelry\/judith-ripka\/_\/N-mfluZ1z14182\/c\.html/i.test(b['dom.pathname'])){b['page_type']='ripka'}},function(a,b){if(/^\/shoes-&-handbags\/clarks\/clarks-artisan\/clarks-unstructured\/_\/N-uopyZ1z141qwZ1z13j4zZ1z13j29\/c\.html/i.test(b['dom.pathname'])){b['page_type']='clarks'}},function(a,b){if(/^\/shoes-&-handbags\/dooney-&-bourke\/_\/N-uopyZ1z141jd\/c\.html/i.test(b['dom.pathname'])){b['page_type']='dooney'}},function(a,b){if(/^\/shoes-&-handbags\/vionic-with-orthaheel-technology\/_\/N-uopyZ1z139ek\/c\.html/i.test(b['dom.pathname'])){b['page_type']='orthaheel'}},function(a,b){if(/^\/fashion\/dennis-basso\/_\/N-lgltZ1z141qp\/c\.html/i.test(b['dom.pathname'])){b['page_type']='dennisbasso'}},function(a,b){if(/^\/fashion\/isaac-mizrahi-live!\/_\/N-lgltZ1z13aqc\/c\.html/i.test(b['dom.pathname'])){b['page_type']='isaac'}},function(a,b){if(/^\/fashion\/susan-graver\/_\/N-lgltZ1z141sm\/c\.html/i.test(b['dom.pathname'])){b['page_type']='susangraver'}},function(a,b){if(/^\/for-the-home\/bedding\/_\/N-mlpu\/c\.html/i.test(b['dom.pathname'])){b['page_type']='bedding'}},function(a,b){if(/^\/for-the-home\/mattresses\/_\/N-10koz\/c\.html/i.test(b['dom.pathname'])){b['page_type']='mattresses'}},function(a,b){if((/^\/MattressesEasyPays\.content\.html/i.test(b['dom.pathname'])&&b['dom.query_string'].toString().toLowerCase().indexOf('refine=4294936790'.toLowerCase())>-1)||(/^\/Mattresses\+Easy\+Pays\.content\.html/i.test(b['dom.pathname'])&&b['dom.query_string'].toString().toLowerCase().indexOf('refine=4294936790'.toLowerCase())>-1)||/^\/for-the-home\/serta\/_\/N-lgluZ1z13efq\/c\.html/i.test(b['dom.pathname'])){b['page_type']='serta'}},function(a,b){if(b['dom.title'].toString().toLowerCase().indexOf('QVC.com Sign In'.toLowerCase())>-1||b['dom.pathname'].toString().toLowerCase().indexOf('/SpeedBuyCheckoutForm'.toLowerCase())>-1){b['page_type']='signin'}},function(a,b){if(b['dom.pathname'].toString().toLowerCase().indexOf('/MyAccountView'.toLowerCase())>-1){b['page_type']='myaccount'}},function(a,b){if(/^\/EmailGiftCards\.content\.html/i.test(b['dom.pathname'])||/^\/Email\+Gift\+Cards\.content\.html/i.test(b['dom.pathname'])){b['page_type']='email_gift'}},function(a,b){if((b['dom.pathname'].toString().toLowerCase().indexOf('/InterestItemDisplay'.toLowerCase())>-1&&b['dom.title'].toString().toLowerCase().indexOf('Wish List'.toLowerCase())>-1)){b['page_type']='wish_list'}},function(a,b){if((b['dom.pathname'].toString().toLowerCase().indexOf('/RegistrationConfirmView'.toLowerCase())>-1&&b['dom.title'].toString().toLowerCase().indexOf('Sign up complete'.toLowerCase())>-1)){b['page_type']='reg_conf'}},function(a,b){if((b['dom.pathname'].toString().toLowerCase().indexOf('/MultipleShippingMethodView'.toLowerCase())>-1&&b['dom.title'].toString().toLowerCase().indexOf('shipping methods'.toLowerCase())>-1&&b['dom.referrer'].toString().toLowerCase().indexOf('/UserRegistrationForm'.toLowerCase())>-1)){b['page_type']='reg_ship'}},function(a,b){if(/^\/HolidayGuide\.content\.html/i.test(b['dom.pathname'])){b['page_type']='holidayguide'}},function(a,b){if(/^\/ITKWD\.content\.html/i.test(b['dom.pathname'])){b['page_type']='itkwd'}},function(a,b){if(/^\/LisaRobertsonChristmas\.content\.html/i.test(b['dom.pathname'])){b['page_type']='lrsxmas'}},function(a,b){if(/^\/DooneyDays\.content\.html/i.test(b['dom.pathname'])){b['page_type']='dooneydays'}},function(a,b){if(/^\/BlackFriday\.content\.html/i.test(b['dom.pathname'])){b['page_type']='blackfriday'}},function(a,b){if(/^\/CyberMonday\.content\.html/i.test(b['dom.pathname'])){b['page_type']='cybermonday'}},function(a,b){if(/^\/GreenMonday\.content\.html/i.test(b['dom.pathname'])){b['page_type']='greenmonday'}},function(a,b){if(/^\/GiveGorgeous\.content\.html/i.test(b['dom.pathname'])){b['page_type']='givegorg'}},function(a,b){if(/^\/shoes-&-handbags\/vera-bradley\/_\/N-uopyZ1z141eo\/c\.html/i.test(b['dom.pathname'])){b['page_type']='verabradley'}},function(a,b){if(/^\/shoes-&-handbags\/marc-fisher\/_\/N-uopyZ1z13icx\/c\.html/i.test(b['dom.pathname'])){b['page_type']='marcfisher'}},function(a,b){if(/^\/beauty\/bareminerals\/_\/N-rhtyZ1z13bax\/c\.html/i.test(b['dom.pathname'])){b['page_type']='bareminerals'}},function(a,b){if(/^\/FFANY\.content\.html/i.test(b['dom.pathname'])){b['page_type']='ffany'}},function(a,b){if(/^\/fashion\/joan-rivers\/_\/N-lgltZ1z141re\/c\.html/i.test(b['dom.pathname'])){b['page_type']='joanrivers'}},function(a,b){if(/^\/shoes-&-handbags\/g\.i\.l\.i\.\/_\/N-uopyZ1z13boj\/c\.html/i.test(b['dom.pathname'])){b['page_type']='gili'}},function(a,b){if(/^\/beauty\/clarisonic\/_\/N-rhtyZ1z1416w\/c\.html/i.test(b['dom.pathname'])){b['page_type']='clarisonic'}},function(a,b){if(/^\/fashion\/quacker-factory\/_\/N-lgltZ1z141ve\/c\.html/i.test(b['dom.pathname'])){b['page_type']='quacker'}},function(a,b){if(/^\/FreeShipping\.content\.html/i.test(b['dom.pathname'])){b['page_type']='freesh'}}];utag.loader.initcfg=function(){utag.loader.cfg={"7":{load:utag.cond[2],send:1,wait:1,tid:6011},"19":{load:utag.cond[2],send:1,wait:1,tid:7117},"20":{load:utag.cond[7],send:1,wait:1,tid:3114},"22":{load:utag.cond[2],send:1,wait:1,tid:3004},"23":{load:1,send:1,wait:1,tid:7115},"14":{load:utag.cond[5],send:1,wait:1,tid:20041},"28":{load:1,send:1,wait:1,tid:6020},"24":{load:1,send:1,wait:1,tid:4015},"48":{load:utag.cond[2],send:1,wait:1,tid:20011},"44":{load:1,send:1,wait:1,tid:3072}};utag.loader.cfgsort=["7","19","20","22","23","14","28","24","48","44"];}
utag.loader.initcfg();}
if(typeof utag_cfg_ovrd!='undefined'){for(var i in utag.loader.GV(utag_cfg_ovrd))utag.cfg[i]=utag_cfg_ovrd[i]};utag.loader.PINIT=function(a,b,c){utag.DB("Pre-INIT");if(utag.cfg.noload){return;}
try{this.GET();if(utag.handler.RE('view',utag.data,"blr")){utag.handler.LR();}
utag.handler.RE('view',utag.data);}catch(e){utag.DB(e)};a=this.cfg;c=0;for(b in this.GV(a)){if(a[b].load>0&&(typeof a[b].src!='undefined'&&a[b].src!='')){a[b].block=1}
if(a[b].block){if(a[b].load==4)a[b].load=1;c=1;this.bq[b]=1;var d=b;a[b].cb=function(){utag.loader.cfg[d].cbf=1;utag.loader.LOAD(d)};a[b].id=b;this.AS(a[b]);}}
if(c==0)this.INIT();};utag.loader.INIT=function(a,b,c,d,e){utag.DB('utag.loader.INIT');if(this.ol==1)return-1;else this.ol=1;utag.rpt.ts['i']=new Date();d=this.cfgsort;for(a=0;a<d.length;a++){e=d[a];b=this.cfg[e];b.id=e;if(b.block!=1&&b.s2s!=1){if(utag.loader.bk[b.id]){this.f[b.id]=0;utag.loader.LOAD(b.id)
}else if(b.wait==1&&utag.loader.rf==0&&!(b.load==4&&utag.cfg.noview)){utag.DB('utag.loader.INIT: waiting '+b.id);this.wq.push(b)
this.f[b.id]=2;}else if(b.load>0){utag.DB('utag.loader.INIT: loading '+b.id);this.lq.push(b);this.AS(b);}}}
if(this.wq.length>0)utag.loader.EV('','ready',function(a){if(utag.loader.rf==0){utag.DB('READY:utag.loader.wq');utag.loader.rf=1;utag.loader.WQ();}});else if(this.lq.length>0)utag.loader.rf=1;else if(this.lq.length==0)utag.loader.END();return 1};if(utag.cfg.readywait){utag.loader.EV('','ready',function(a){if(utag.loader.rf==0){utag.loader.rf=1;utag.DB('READY:utag.cfg.readywait');utag.loader.PINIT();}})}else{utag.loader.PINIT()}}