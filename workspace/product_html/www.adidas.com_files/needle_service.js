
var Needle=Needle||{},needleParam=needleParam||{};(function(N,np){if(N.loaded){return;}
N.scheme="http";N.version="125EED";N.service='adidas.needle.com';N.cws="width=485,height=525";N.cm="chatreq";N.cfid="reco";N.ls=0;N.ss=0;N.pl=1;N.ui=0;N.bt=0;N.it=0;N.ots="";N.pct="";N.lct="L";N.tsct=0;N.mps=300000;N.st=new Date().getTime();N.tNow=new Date().getTime();N.tAct=0;N.invites=N.invites||{};var storefail,uid;try{uid=new Date;(N.ls=window.localStorage).setItem(uid,uid);(N.ss=window.sessionStorage).setItem(uid,uid);storefail=(N.ls.getItem(uid)!=uid||N.ss.getItem(uid)!=uid);N.ls.removeItem(uid);N.ss.removeItem(uid);if(storefail){N.ls=false;N.ss=false;}}catch(e){}
var toType=function(obj){return({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();}
N.Invite=function(el,id,styles){id=(id===undefined)?+new Date:id.replace(/^needle_/,'');var t=N.invites[id]=this;t.id=id;t.el=el;t.el.id="needle_"+id;t.st=el.style;t.el.className='needlepoint';t.i=null;function _step(unit,props){unit=(unit===undefined)?'px':unit;if(t.sX){t.st.left=parseInt(t.x)+unit;t.x+=t.sX;}
if(t.sY){t.st.top=parseInt(t.y)+unit;t.y+=t.sY;}
if(t.od){t.opacity(t.op-t.od);}
if((t.d-=10)<=0){clearInterval(t.i);if(t.p.length){_leg(t.p.shift());}else if(toType(t.cb)==="function"){t.cb();}}};function _leg(a,unit){if((t.eX=a[0])==""){t.eX=t.x;}
if((t.eY=a[1])==""){t.eY=t.y;}
if((t.d=parseInt(a[2]))==0){t.d=10;}
if(a.length>3){if(a[3]!="")
t.od=(t.op-parseInt(a[3]))/(t.d/10);}
t.sX=(t.eX-t.x)/(t.d/10);t.sY=(t.eY-t.y)/(t.d/10);if(t.i){clearInterval(t.i);}
var n=t;t.i=setInterval(function(){_step(unit);},10);};t.animate=function(p,cb){if(p.length){var s=p.shift();var unit=(s.length>4&&s[4])?s[4]:"px";t.cb=cb;t.x=parseInt(s[0]);t.st.left=t.x+unit;t.y=parseInt(s[1]);t.st.top=t.y+unit;t.op=(t.op==undefined)?100:t.op;if(s.length>3){t.op=parseInt(s[3]);}
if(p.length){t.p=p;_leg(t.p.shift(),unit);}else if(toType(cb)==="function"){cb();}}};t.css=function(styl){if(toType(styl)==="object"){for(var k in styl){if(styl.hasOwnProperty(k)){t.st[k]=styl[k];}}}};t.opacity=function(op){if(document.all&&t.el){if(t.el.currentStyle&&!t.el.currentStyle.hasLayout){t.st.zoom=1;}
t.st.filter="alpha(opacity="+op+")";}else{t.st.opacity=parseFloat(op/100);}
t.op=op;};t.show=function(){t.st.display="block";return t;};t.hide=function(){t.st.display="none";return false;};t.close=function(){N.PageUpdate("X","&id="+id);N.removeNeedlePoint(id);t.el.parentNode.removeChild(t.el);delete N.invites[id];return false;};t.css(styles);};N.getCookie=function(c){var a=document.cookie.split(';');var i;for(i=0;i<a.length;i++){var t=a[i].split('=');var n=t[0].replace(/^\s+|\s+$/g,'');if(n==c){if(t.length>1)
return unescape(t[1].replace(/^\s+|\s+$/g,''));return'';}}
return null;};N.getDomain=function(h){var r=/([^\.]+)\.(com|net|org|info)$/;if(h.match(r)){return h.match(r)[0];}else{return h;}};N.getQueryVar=function(v,from_hash){var s=(from_hash)?location.hash:location.search;var q=s.substring(1);var vs=q.split("&");for(var i=0;i<vs.length;i++){var p=vs[i].split("=");if(p[0]==v){return unescape(p[1]);}}
return null;};N.getHashVar=function(v){return N.getQueryVar(v,true);};N.hideFrame=function(remove){var id=N.ls?N.ls.getItem('needle-cfid'):N.cfid;var f=document.getElementById(id)||document.getElementById('needle-overlay');if(f){if(remove){f.parentNode.removeChild(f);}else{f.style.display='none';}}};N.inviteClick=function(e,xp,cb){N.tNow=new Date().getTime();if(N.tAct&&(N.tNow-N.tAct)<1000){return false;}
N.tAct=new Date().getTime();var vpid='vid='+N.vid+'&pgid='+N.pgid;var params='id='+N.iid+'&campaign='+N.campaign;if(typeof xp==="string"){params+=xp;}
var url=N.scheme+'://'+N.service+'/'+N.cm+'?'+vpid;if(toType(cb)!=="function"){cb=N.initPopup;}
cb(url,params);N.removeNeedlePoint();N.PageUpdate('C');if(toType(N.analyticsCall)==="function"){N.analyticsCall('bc',N.iid,e);}
return false;};N.initPopup=function(url,params){var cw=window.open(url+'&'+params,N.wid,"toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=auto,resizable=yes,dependent=yes,"+N.cws);cw.focus();}
N.initInline=function(url,params){params+="&cache=0&json=1&cfid="+N.cfid;N.PageUpdate('I',"&params="+encodeURIComponent(params));}
N.onBlur=function(){if(N.au===false){N.stopUpdateTimer();}
try{clearTimeout(N.bt);N.bt=setTimeout(function(){if(N.ui&&N.lct!='B'){N.PageUpdate('B');}
N.removeNeedlePoint();if(toType(N.oldOnBlur)=="function"){N.oldOnBlur();}},1000);}catch(err){}};N.onFocus=function(){try{clearTimeout(N.bt);if(N.ui&&N.lct!='F'){N.st=new Date().getTime();N.PageUpdate('F');N.setUpdateTimer(N.ui,N.au);}
if(toType(N.oldOnFocus)==="function"){N.oldOnFocus();}}catch(err){}};N.PageLoad=function(t,q){if(N.nps>2||N.getCookie('needleopt')!=null){return;}
if(!t){t=document.title.replace(N.ots,'');}
var e=document.createElement('script');e.type='text/javascript';N.tNow=new Date().getTime();var s=location.protocol+"//"+N.service+"/pageload?v="+N.version+"&cid="+N.np+"&cids="+N.nps+"&ts="+N.tNow;if(q)s+=q;if(!window.name||window.name.length>32){window.name=Needle.tNow%1000000;}
if(N.ss&&N.ss.getItem('needle-window')==null){N.ss.setItem('needle-window',Needle.tNow%1000000);}
var pdata="title="+encodeURIComponent(t)
+"&url="+encodeURIComponent(location)
+"&wn="+encodeURIComponent(N.ss?N.ss.getItem('needle-window'):window.name)
+"&ls="+(N.ls?1:0);var pcount=4;if(document.referrer!==""&&document.referrer.indexOf(N.getDomain(location.hostname))<0){pdata+="&referrer="+encodeURIComponent(document.referrer);pcount++;}
if(typeof np!=="undefined"){for(var k in np){if(np.hasOwnProperty(k)){if(k==="productId"){np[k]=String(np[k]).replace(/\s/g,'');}
pdata+='&'+encodeURIComponent(k)+'='+encodeURIComponent(np[k]);pcount++;}}}
s+="&pcount="+pcount+"&pdata="+encodeURIComponent(pdata);e.src=s;document.body.appendChild(e);};N.PageUpdate=function(tr,q){var n=new Date().getTime();N.pct=N.lct;N.lct=tr;N.tsct=0;if(N.vid===undefined){return;}
if((tr=='T')&&((N.mps!=0)&&(n-N.st>=N.mps))){N.lct=tr='E';N.stopUpdateTimer();N.removeNeedlePoint();}
if(tr!='B'&&tr!='E'){N.setUpdateTimer(N.ui,N.au);}
var h=document.getElementsByTagName('head')[0];var s=document.getElementById('ndlbeacon');if(s){if(N.pl==0){return;}
h.removeChild(s);}
try{N.pl=0;s=document.createElement('script');s.type='text/javascript';s.defer=true;s.async=true;var src=document.location.protocol+'//'+N.service+'/pageupdate?vid='+N.vid+'&pgid='+N.pgid+'&tr='+tr+'&t='+n;if(q){src+=q;}
s.src=src;void(h.appendChild(s));if(s.readyState){s.onreadystatechange=function(){if(s.readyState=="loaded"||s.readyState=="complete"){s.id='ndlbeacon';s.onreadystatechange=null;N.pl=1;}};}else{s.onload=function(){s.id='ndlbeacon';N.pl=1;};}}catch(e){return;}};N.removeNeedlePoint=function(id){var t=this,e,a=[],cl=/\bneedlepoint\b/;clearTimeout(N.it);this.remove=function(el){var iid=el.id.replace(/^needle_/,'');if(N.invites&&N.invites[iid]&&toType(N.invites[iid].hide)==="function")
{if(N.invites[iid].hide(el)){el.parentNode.removeChild(el);}}else{el.parentNode.removeChild(el);}};if(id===undefined||id===""){e=document.getElementsByTagName('*');for(var i=0;i<e.length;i++){var cls=e[i].className;if(cl.test(cls)||e[i].id==='ndlbanner'){a.push(e[i]);}}
while(e=a.shift()){t.remove(e);}}else{if(e=document.getElementById(id)||document.getElementById('needle_'+id)){t.remove(e);}}};N.setCookie=function(n,v,s){var e=new Date();e.setTime(e.getTime()+(s*1000));document.cookie=n+"="+escape(v)+
(";expires="+e.toGMTString())+
(";domain="+N.getDomain(location.hostname))+
(";path=/");N.np=v;};N.setUpdateTimer=function(i,au){N.stopUpdateTimer();if(i){N.ut=setInterval(function(){Needle.PageUpdate("T");},i);}
N.ui=i;N.au=au;};N.stopUpdateTimer=function(){if(N.ut!==undefined&&N.ut!=-1){clearInterval(N.ut);N.ut=-1;}};N.load=function(url,type,cb){(function inner(url,type,cb){var ref,ext;if(typeof type==="string"&&(type==="js"||type==="css")){ext=type;}else if(typeof url==="string"){ext=/[^.]+$/.exec(url)[0];}
if(type instanceof Function){cb=type;type=false;}
if(!(url instanceof Array)){if(ext==="js"){ref=document.createElement("script");ref.src=url;}else if(ext==="css"){ref=document.createElement("link");ref.href=url;ref.rel="stylesheet";}
if(typeof cb!=="undefined"){ref.addEventListener?ref.addEventListener("load",cb.bind(null,url)):ref.attachEvent("load",cb.bind(null,url));}
if(typeof ref!=="undefined"){document.getElementsByTagName("head")[0].appendChild(ref)}}else if(type===true&&url.length>1){var one=url.shift();inner(one,function(){if(typeof cb!=="undefined"){cb(one);}
inner(url,true,cb);});}else{for(var i in url){if(typeof cb!=="undefined"){inner(url[i],cb.bind(null,url[i]));}else{inner(url[i]);}}}})(url,type,cb);}
N.injectReco=function(params,commonPath,partnerPath){N.chatreqParams=params;N.commonPath=location.protocol+commonPath;N.partnerPath=location.protocol+partnerPath;N.load(N.partnerPath+"/css/embed.css");N.load(N.commonPath+"/reco.js",function(){N.reco.bootstrap(document.body);});}
if(N.np=N.getCookie('needlepin')){N.nps='1';}else{N.np=N.tNow;N.setCookie('needlepin',N.np,180*24*3600);if(N.getCookie('needlepin'))
N.nps='2';else
N.nps='3';}
N.analyticsCall=function(a,v,e){function cmRequest(type){if(typeof cmCreateElementTag=='function'&&typeof coremetrics!='undefined'&&coremetrics.cmLastReferencedPageID){cmCreateElementTag('NEEDLE: '+type+': '+coremetrics.cmLastReferencedPageID,'NEEDLE|CHAT INVITE','us-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-30313');}
if(type.match(/initiate/i)&&typeof cmCreateConversionEventTag=='function'){cmCreateConversionEventTag("NEEDLE: Initiate","1","NEEDLE|CHAT INVITE","1",'us-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-30313');}};var type='';if(a==='bc'){var event=new CustomEvent("inviteClick",{"detail":{"inviteName":v.replace(/^needle_/,'')}});}else if(a==='qc'){type='Initiate';var event=new CustomEvent("qualifiedChat",{"detail":{"inviteName":v.replace(/^needle_/,'')}});}else if(a==='bi'){type='Display';var event=new CustomEvent("inviteImpression",{"detail":{"inviteName":v.replace(/^needle_/,'')}});}else{N.PageUpdate('A',"&call="+a+"&error=3");return;}
try{window.dispatchEvent(event);if(type!=''){cmRequest(type)}}catch(err){N.PageUpdate('A',"&call="+a+'&error=4');}}
var path=window.location.pathname;if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'');};}
if(!np.categoryId){if(path.match(/us\/content/)){var cat=path.match(/originals|basketball|running|football|soccer|training/i);if(cat){np.categoryId=cat[0].toUpperCase();}}
if(!np.categoryId&&typeof $=='function'){var newproductCatt;var newproductCatArrr=[];$("#breadcrumb li").each(function(j){newproductCatt=$.trim($(this).text());newproductCatArrr[j]=newproductCatt.trim().toUpperCase();});np.categoryId=newproductCatArrr.join('|');}}
if(np.categoryId&&np.categoryId=='HOME'){var pmatch=path.match(/soccer|running|mens-basketball|womens-training/i);if(pmatch){var newCat=pmatch[0];newCat=newCat.replace(/mens/,'men\'s');np.categoryId=newCat.toUpperCase().replace(/-/,'|');}}
N.PageUpdate=function(tr,q){var n=new Date().getTime();N.pct=N.lct;N.lct=tr;N.tsct=0;if(N.vid===undefined){return;}
if((tr=='T')&&((N.mps!=0)&&(n-N.st>=N.mps))){N.lct=tr='E';N.stopUpdateTimer();N.removeNeedlePoint();}
if(tr!='B'&&tr!='E'){N.setUpdateTimer(N.ui,N.au);}
var h=document.getElementsByTagName('head')[0];var s=document.getElementById('ndlbeacon');if(s){if(N.pl==0){return;}
h.removeChild(s);}
if(N.in_session&&window.location.hostname.match(/cfg.adidas.com/)){var product=productView='';if(typeof(MiA)!='undefined'&&MiA.Model&&typeof(MiA.Model.getModel)=='function'&&typeof(MiA.Model.getModel().getProduct)=='function'){product=MiA.Model.getModel().getProduct();}
if(typeof(MiA)!='undefined'&&MiA.currentProduct&&MiA.currentProduct.data&&MiA.currentProduct.data.views&&MiA.currentProduct.data.views.recipePreviewView){productView=MiA.currentProduct.data.views.recipePreviewView;}
if(productView&&product){N.conf_url_n=product.scene7.render(productView);}
if(N.conf_url_n){N.conf_url_n=N.conf_url_n.replace(/{/g,'(');N.conf_url_n=N.conf_url_n.replace(/}/g,')');N.conf_url_n=N.conf_url_n.replace(/http:\/\//,'https:\/\/')
N.conf_url_n=encodeURIComponent(N.conf_url_n);if(!N.conf_url_o||(N.conf_url_o!=N.conf_url_n)){N.conf_url=true;}else{N.conf_url=false;}
N.conf_url_o=N.conf_url_n;}}
try{N.pl=0;s=document.createElement('script');s.type='text/javascript';s.defer=true;s.async=true;var src=document.location.protocol+'//'+N.service+'/pageupdate?vid='+N.vid+'&pgid='+N.pgid+'&tr='+tr+'&t='+n;if(N.in_session&&N.conf_url&&N.conf_url_n){src+='&confimg='+N.conf_url_n;}
if(q){src+=q;}
s.src=src;void(h.appendChild(s));if(s.readyState){s.onreadystatechange=function(){if(s.readyState=="loaded"||s.readyState=="complete"){s.id='ndlbeacon';s.onreadystatechange=null;N.pl=1;}};}else{s.onload=function(){s.id='ndlbeacon';N.pl=1;};}}catch(e){return;}};if(!N.loaded&&N.nps<3&&N.getCookie("needleopt")==null){if("onfocusin"in document){N.oldOnFocus=document.onfocusin;N.oldOnBlur=document.onfocusout;document.onfocusin=N.onFocus;document.onfocusout=N.onBlur;}else{N.oldOnFocus=window.onfocus;N.oldOnBlur=window.onblur;window.onfocus=N.onFocus;window.onblur=N.onBlur;}
var plq=(typeof loadq==="string")?loadq:false;if(typeof N.getQueryVar=="function"){var qvid=N.getHashVar("ndlvid")||N.getQueryVar("ndlvid")||N.getQueryVar("vid");if(qvid){plq+="&vid="+qvid;if(N.getQueryVar("tc")=="1"){plq+="&tc=1";}}}
N.PageLoad(null,plq);N.loaded=true;}})(Needle,needleParam);