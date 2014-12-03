var _atu="undefined",_atd="http://www.addthis.com/",_atr="http://s7.addthis.com/",_euc=encodeURIComponent,_atc={ver:152,note:"",samp:0.05,addr:-1};if(typeof(addthis_conf)===_atu){var addthis_conf={};}
for(i in addthis_conf){_atc[i]=addthis_conf[i];}
if(typeof(_ate)===_atu){(function(){var ua=navigator.userAgent.toLowerCase(),d=document,w=window,wa=w.addEventListener,we=w.attachEvent,xx=function(f,e){},b={saf:/webkit/.test(ua),opr:/opera/.test(ua),msi:(/msie/.test(ua))&&(!/opera/.test(ua)),ie6:/msie 6.0/},_a={isBound:false,isReady:false,readyList:[],onReady:function(){if(!_a.isReady){_a.isReady=true;var l=_a.readyList;for(var fn=0;fn<l.length;fn++){l[fn].call(window,[]);}
_a.readyList=[];}},addLoad:function(_d){var _e=w.onload;if(typeof w.onload!="function"){w.onload=_d;}else{w.onload=function(){if(_e){_e();}
_d();};}},bindReady:function(){if(r.isBound){return;}
r.isBound=true;if(d.addEventListener&&!b.opr){d.addEventListener("DOMContentLoaded",r.onReady,false);}
if(b.msi&&window==top){(function(){if(r.isReady){return;}
try{d.documentElement.doScroll("left");}
catch(error){setTimeout(arguments.callee,0);return;}
r.onReady();})();}
if(b.opr){d.addEventListener("DOMContentLoaded",function(){if(r.isReady){return;}
for(var i=0;i<d.styleSheets.length;i++){if(d.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}}
r.onReady();},false);}
if(b.saf){var _10;(function(){if(r.isReady){return;}
if(d.readyState!="loaded"&&d.readyState!="complete"){setTimeout(arguments.callee,0);return;}
if(_10===undefined){var _12=d.getElementsByTagName("link");for(var i=0;i<_12.length;i++){if(_12[i].getAttribute("rel")=="stylesheet"){_10++;}}
var _14=d.getElementsByTagName("style");_10+=_14.length;}
if(d.styleSheets.length!=_10){setTimeout(arguments.callee,0);return;}
r.onReady();})();}
r.addLoad(r.onReady);},append:function(fn,_16){r.bindReady();if(r.isReady){fn.call(window,[]);}else{r.readyList.push(function(){return fn.call(window,[]);});}}},r=_a,_17={ab:"-",bro:b,clck:1,show:1,samp:_atc.samp-Math.random(),scnt:1,seq:1,inst:1,wait:500,tmo:null,cvt:[],svt:[],sttm:new Date().getTime(),max:268435455,pix:"tev",sid:0,sub:typeof(at_sub)!==_atu,uid:null,swf:"http://bin.clearspring.com/at/v/1/button1.swf",evu:"http://e1.clearspring.com/at/",off:function(){return Math.floor((new Date().getTime()-_17.sttm)/100).toString(16);},ran:function(){return Math.floor(Math.random()*4294967295).toString(36);},cst:function(c){return"CXNID=2000001.521545608054043907"+(c||2)+"NXC";},img:function(i,c){if(typeof(at_sub)===_atu){new Image().src=_atr+"live/t00/"+i+".gif?"+_17.ran()+"&"+_17.cst(c);}},cuid:function(){return(_17.sttm&_17.max).toString(16)+(Math.floor(Math.random()*_17.max)).toString(16);},ssid:function(){if(_17.sid===0){_17.sid=_17.cuid();}
return _17.sid;},sev:function(id,_1c){_17.pix="sev-"+(typeof(id)!=="number"?_euc(id):id);_17.svt.push(id+";"+_17.off());if(_1c===1){_17.xmi(true);}else{_17.sxm(true);}},cev:function(k,v){_17.pix="cev-"+_euc(k);_17.cvt.push(_euc(k)+"="+_euc(v)+";"+_17.off());_17.sxm(true);},sxm:function(b){if(_17.tmo!==null){clearTimeout(_17.tmo);}
if(b){_17.tmo=_17.sto("_ate.xmi(false)",_17.wait);}},sto:function(c,t){return setTimeout(c,t);},sta:function(){var a=_17;return"AT-"+(typeof(addthis_pub)!==_atu?_euc(addthis_pub):"unknown")+"/-/"+a.ab+"/"+a.ssid()+"/"+(a.seq++)+(a.uid!==null?"/"+a.uid:"");},xmi:function(_23){var a=_17;if(!a.uid){a.dck("X"+a.cuid());}
if(a.cvt.length+a.svt.length>0){a.sxm(false);if(a.seq===1){a.cev("pin",a.inst);}
var url=a.evu+a.pix+"-"+a.ran()+".png?ev="+_17.sta()+"&se="+a.svt.join(",")+"&ce="+a.cvt.join(",");a.cvt=[];a.svt=[];if(_atc.xtr){return;}
if(_23){var d=document,i=d.ce("iframe");i.id="_atf";i.src=url;_17.opp(i.style);d.body.appendChild(i);i=d.getElementById("_atf");}else{new Image().src=url;}}},opp:function(st){st.width="1px";st.height="1px";st.position="absolute";st.zIndex=100000;},pub:function(){return typeof(addthis_pub)!==_atu?_euc(addthis_pub):"";},lad:function(x){_17.plo.push(x);},plo:[],jlo:function(){try{if(!_17.pld){var d=document,o=d.ce("script");o.src=_atr+"static/r04/menu00.js";d.gn("head")[0].appendChild(o);_17.pld=o;}}
catch(e){}},lod:function(arg){try{var a=_17,f=arg===1;if(!f){if(a.samp>=0&&!a.sub){a.sev("20");a.cev("plo",1/_atc.samp);}
a.img(_atc.ver+"lo","2");}
if(a.plo.length>0){a.jlo();}
if(_17.samp>=0){try{var z=d.gn("a");if(z){for(var y in z){y=z[y];if(y.toString().indexOf("/bookmark.php")>0&&!y.onmouseover){y.onmouseover=function(){return addthis_open(this,"","","");};y.onmouseout=function(){addthis_close();};}}}}
catch(e){}}
if(!_atc.xfl&&(f||a.uid===null)&&a.swf){var _31=function(o,n,v){var c=d.createElement("param");c.name=n;c.value=v;o.appendChild(c);};var o=d.createElement("object");a.opp(o.style);o.id="atff";if(b.msi){o.classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";_31(o,"movie",a.swf);}else{o.data=a.swf;o.quality="high";o.type="application/x-shockwave-flash";}
_31(o,"wmode","transparent");_31(o,"allowScriptAccess","always");d.body.insertBefore(o,d.body.firstChild);if(b.msi){o.outerHTML+=" ";}}}
catch(e){}},unl:function(){var a=_17;if(a.samp>=0&&!a.sub){a.sev("21",1);a.cev("pun",1/_atc.samp);}
return true;},dck:function(c){_17.uid=c;var p=_17.pub(),x="usagov,loc_webservices,massgov,govgab1".split(",");for(i in x){if(p==x[i]){return;}}
if(!_atc.xck){document.cookie="_csuid="+c+"; expires=Wed, 04 Oct 2028 03:19:53 GMT; path=/";}},fcl:null,asetup:function(x){var a=_17;try{if(x!==null&&x!==_atu){a.dck(x);}
if(a.fcl){a.fcl();}}
catch(e){}
return x;},ao:function(elt,_3f,_40,_41){_17.lad(["open",elt,_3f,_40,_41]);_17.jlo();},ac:function(){},as:function(s){_17.lad(["send",s]);_17.jlo();}},a=_17;w._ate=a;w._adr=r;d.ce=d.createElement;d.gn=d.getElementsByTagName;r.bindReady();if(wa){wa("unload",a.unl,false);}else{if(we){we("onunload",a.unl);}else{w.onunload=a.unl;}}
r.append(a.lod);if(d.cookie){var ck=d.cookie.split(";");for(var i=0;i<ck.length;i++){var c=ck[i],x=c.indexOf("_csuid=");if(x>=0){_17.uid=c.substring(x+7);}}}
try{var l=d.ce("link");l.rel="stylesheet";l.type="text/css";l.href=_atr+"static/r04/widget00.css";l.media="all";d.gn("head")[0].appendChild(l);}
catch(e){}})();function addthis_to(s){return addthis_sendto(s);}
function addthis_onmouseover(elt,e,_4b,_4c,_4d,_4e,_4f){addthis_pub=_4d;addthis_language=_4e;addthis_content=_4f||"";return addthis_open(elt,"share",_4b,_4c);}
function addthis_onmouseout(){addthis_close();}
function addthis_open(elt,_51,_52,_53){_ate.ao(elt,_51,_52,_53);}
function addthis_close(){_ate.ac();}
function addthis_sendto(s){_ate.as(s);return false;}}else{_ate.inst++;}
try{if(_atc.ver===120){var r="atb"+_ate.cuid();document.write("<span id=\""+r+"\"></span>");_ate.lad(["span",r]);}}
catch(e){alert("v12:"+e);}
