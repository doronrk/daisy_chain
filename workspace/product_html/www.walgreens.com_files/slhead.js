var __$1a49,__$1D0C=__$1D0C||null,__$1D3F=__$1D3F||null;
typeof __$1a49=="undefined"&&function(j,s,g){try{var p=function(){return"https:"==g.location.protocol?"https:":"http:"},h=37,k=s.userAgent.toLowerCase(),q=p()+"//analytics.strangeloopnetworks.com/",l=function(b,a,c){try{if(c&&g.URL.search(/(sljsdbg=true)(.*?)(&|$)/)!=-1)return q+"debug/"+(b=="slHead"?"slhead.js":"");var d=g.getElementById("slheadjs");d&&d.getAttribute(b)&&(a=d.getAttribute(b),a.indexOf("//")==0&&(a=p()+a));return a}catch(e){}},t=function(b,a){b.readyState?b.onreadystatechange=function(){/loaded|complete/.test(b.readyState)&&
a()}:(b.onload=function(){a()},b.onerror=function(){a()})},o=function(b,a){var c=g.createElement("script");c.type="text/javascript";c.async=!0;a&&t(c,a);c.src=b;var d=g.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d)},u=function a(b,d){if(b)if(b.length==0)d();else{var e=b.shift();e&&o(e,function(){a(b,d)})}},b={jsv:h,ua:k,tixUrl:l("tix",q,!1),tixAlt:l("alttix",null,!1),anaUrl:l("ana","/",!0),preUrl:l("pre","/",!0),slHead:l("slHead",null,!0),adp:l("adp","true",!1),ck:l("ck",null,!1),
buf:l("buf","false",!1),wbv:(k.match(/.+(?:rv|it|ra|ie|me)[\/: ]([\d]+)/)||[])[1],msie:/msie/.test(k)&&!/opera/.test(k),firefox:/firefox/.test(k),chrome:/chrome/.test(k),safari:/webkit/.test(k)&&!/chrome/.test(k),webkit:/webkit/.test(k),append:function(a){try{var b=g.body||g.getElementById("slheadjs")||null;b&&b.appendChild(a)}catch(d){}},toQuery:function(a){function c(a,d,c){try{return a+d+"="+encodeURIComponent(c)}catch(f){b.e(f,"b","query",d+":"+c)}}var d="",e="?",f;try{for(f in a)a.hasOwnProperty(f)&&
typeof a[f]!="function"&&(d+=c(e,f,a[f]),e="&")}catch(i){}return d},listen:function(a,c,d,e){try{a.addEventListener?a.addEventListener(c,d,e):a.attachEvent&&a.attachEvent("on"+c,d)}catch(f){b.e(f,h,"slhead","r","listen")}},href:function(){try{if(typeof top!="undefined"&&top&&top.location&&top.location.href)return top.location.href}catch(a){}return""},err:{tLog:[],eat:function(a,c,d,e,f){try{if(this.enabled()){a=a||{name:"unknown",message:"",number:0};a.msg=encodeURIComponent(a.name+(a.message?": "+
a.message:""));a.jsUrl=encodeURIComponent(g.URL||"unknown");a.jsFunction=d+"->"+this.tLog.join("->")+(e?"->"+e+"->":"")+(f?f:"");a.jsv=c;a.jsErrNum=a.jsErrNum||a.number||0;a.name=a.message=a.number=function(){};if(!b.tixUrl)b.tixUrl=b.tixUrl?b.tixUrl:("https:"==g.location.protocol?"https:":"http:")+"//analytics.strangeloopnetworks.com/";var i=new Image;i.src=b.tixUrl+"sfinx.gif"+b.toQuery(a);b.append(i)}}catch(m){}},send:function(a,b,d){this.eat(a,b,d,null,null)},enabled:function(){return this.override?
!0:l("err","false",!1)==="true"?!0:!1}},e:function(a,b,d,e){e=e!=null&&e.length>0?"("+encodeURIComponent(e)+")":"";this.err.tLog.unshift(b+":"+d+e);if(typeof a=="undefined")throw Error("undefined");else throw a;},ee:function(a,b,d,e,f){this.e(a,b+"."+d,e,f)},exec:function(){try{if(b.stack&&b.stack.length>0){var a=b.stack.shift();if(a.length>0){var c=a.shift();b.cmd(c,a)}}}catch(d){b.err.eat(d,h,"slhead","r","exec")}},cmd:function(a,c){try{switch(a){case "slana":b.slana(c);break;case "slanasiteparams":b.slanasiteparams(c);
break;case "preload":b.preload(c);break;case "deferrerload":b.deferrerload();break;case "pirload":b.pirload();break;default:b.err.eat({name:"unknown cmd",message:a,number:43},h,"slhead","r","cmd","unknown command")}}catch(d){b.e(d,"r","cmd",null)}},head:new Date,paintTest:function(){try{b.paint=new Date,typeof top!="undefined"&&top&&top.window&&top.window.innerHeight&&top.window.innerWidth==0&&setTimeout(function(){b.paintTest()},16)}catch(a){}},slana:function(a){try{try{if(j.frameElement!=null)return}catch(c){}if(!this.body)this.body=
this.paint=a.shift(),b.PagePackage=a,b.href().indexOf("slana=off")==-1&&o(b.anaUrl+"slana.js?Lo0P="+b.PagePackage[6],null)}catch(d){b.err.eat(d,h,"slhead","pg","slana")}},slanasiteparams:function(a){try{b.SitePackage=a,b.beacon.fire(),b.exec()}catch(c){b.err.eat(c,h,"slhead","pg","slanasiteparams")}},preload:function(a){try{try{if(j.frameElement!=null)return}catch(c){}try{var d=b.sys.cookie.getVisitor();if(d.fLst&&d.fLst.length>=1024)b.sys.cookie.set(b.sys.cookie.visitor,"",-1,"/"),visitor={vid:d.vid,
nvid:d.nvid,cvid:d.cvid},visitor.save=d.save,visitor.save()}catch(e){}b.preloadPkg=a;var f=b.evalPrefetch(a[6]);if(!(b.href().indexOf("slpbc=off")!=-1||!b.preloadPkg||b.preloader))if(a[1]!==""||a[2]!==""||a[3]!=="")d=[],a[1]&&d.push(a[0]+"pdata.js?Lo0P="+a[1]),a[2]&&d.push(a[0]+"cdata.js?Lo0P="+a[2]),a[3]&&d.push(a[0]+"gdata.js?Lo0P="+a[3]),u(d,function(){var d=b.preUrl+"slpre.js?Lo0P="+a[4];if(f)try{var c=g.createElement("iframe"),d=null;c.width=0;c.height=0;c.scrolling="no";c.style.border="0px";
c.style.overflow="hidden";c.style.display="none";typeof g.domain!="undefined"&&g.domain&&g.domain.length>0&&(d="&d="+g.domain);var e=a[0]+"slpref.html?Lo0P="+a[5]+(d?d:"");g.getElementsByTagName("body")[0].appendChild(c);c.contentWindow.location.replace(e)}catch(i){b.err.eat(i,h,"slhead","pg","prefetch")}else o(d,null)})}catch(i){b.err.eat(i,h,"slhead","pg","preload")}},evalPrefetch:function(a){if(b.adp==!0)return b.firefox;else if(!a||a==="auto")return b.firefox;else if(a==="true")return!0},pirload:function(){try{try{if(b.href().indexOf("slpir=off")!=
-1)return}catch(a){}b.pir=__$1D0C.pir||{};try{b.pir.preloadImg=[];for(var c=0,d=b.pir.list.length;c<d;++c)b.pir.preloadImg[c]=new Image,b.pir.preloadImg[c].src=b.pir.list[c];o(b.pir.src,function(){b.exec()})}catch(e){b.e(e,"pir","load",null)}}catch(f){b.err.eat(f,h,"slhead","pg","pirload")}},deferrerload:function(){try{b.deferrer.sortDeferrals(),b.deferrer.process()}catch(a){b.err.eat(a,h,"slhead","pg","deferrerload")}},deferrer:{dwBuffer:[],swapEventLoading:function(a){try{if(j.addEventListener)__$SL_WAEL=
j.addEventListener,j.addEventListener=function(b,c,f){b==="load"||b==="DOMContentLoaded"?__$1D3F.deferScript(a,c):__$SL_WAEL.apply(j,[b,c,f])},__$SL_DAEL=g.addEventListener,g.addEventListener=function(b,c,f){b==="load"||b==="DOMContentLoaded"?__$1D3F.deferScript(a,c):__$SL_DAEL.apply(g,[b,c,f])};else if(j.attachEvent)__$SL_WAE=j.attachEvent,j.attachEvent=function(b,c){b==="onload"||b==="onreadystatechange"?__$1D3F.deferScript(a,c):__$SL_WAE(b,c)},__$SL_DAE=g.attachEvent,g.attachEvent=function(b,c){b===
"onload"||b==="onreadystatechange"?__$1D3F.deferScript(a,c):__$SL_DAE(b,c)}}catch(c){b.err.eat(c,h,"slhead","deferrer","swapEventLoading")}},resetEventLoading:function(){try{if(j.addEventListener)j.addEventListener=__$SL_WAEL,g.addEventListener=__$SL_DAEL;else if(j.attachEvent)j.attachEvent=__$SL_WAE,g.attachEvent=__$SL_DAE}catch(a){b.err.eat(a,h,"slhead","deferrer","resetEventLoading")}},process:function(){try{for(;b.deferrer.deferred.length>0;){var a=b.deferrer.deferred.shift(),c=typeof a[1];if(c==
"string"){b.deferrer.swapEventLoading(a[0]);b.deferrer.captureDocumentWrite(a[0]);b.deferrer.loadJavaScript(a);return}else if(c=="function"){b.deferrer.swapEventLoading(a[0]);b.deferrer.captureDocumentWrite(a[0]);try{a[1]()}catch(d){}b.deferrer.flushDocumentWriteBuffer(a[0],!1);b.deferrer.resetDocWrite();b.deferrer.resetEventLoading()}}}catch(e){b.err.eat(e,h,"slhead","deferrer","process")}b.exec()},sortDeferrals:function(){try{b.deferrer.deferred=__$1D3F.deferred||[];for(var a=0;a<b.deferrer.deferred.length;a++)if(b.deferrer.deferred[a].length<
3||!b.deferrer.deferred[a][2])b.deferrer.deferred[a][2]=1E6+a;b.deferrer.deferred.sort(function(a,b){return a[2]-b[2]})}catch(c){b.e(c,"deferrer","sortDeferrals",null)}},captureDocumentWrite:function(a){try{if(a!="")b.deferrer.originalDw=g.write,b.deferrer.originalDwLn=g.writeln,b.deferrer.dwBuffer[a]="",g.write=function(c){b.deferrer.dwBuffer[a]+=c;b.deferrer.flushDocumentWriteBuffer(a,!0)},g.writeln=function(c){b.deferrer.dwBuffer[a]+=c+"\n";b.deferrer.flushDocumentWriteBuffer(a,!0)}}catch(c){b.e(c,
"deferrer","deferrer",null)}},loadBufferedScriptTags:function(a,c,d){try{for(var e=RegExp("(<script[^>]*?src=['\"](.*?)['\"].*?><\/script>)","g"),c=[],f=e.exec(d);f!=null;)f.length==3&&(c.push(f[1]),b.deferrer.deferred.unshift([a,f[2]])),f=e.exec(d);for(;c.length>0;)var i=c.shift(),d=d.replace(i,"")}catch(g){b.e(g,"deferrer","loadBufferedScriptTags",null)}return d},flushDocumentWriteBuffer:function(a,c){try{if(a!=""){var d=b.deferrer.dwBuffer[a];if(c==!0){var e=["</iframe>","</div>"],f=-1,i="",m;
for(m in e){var h=d.toLowerCase().lastIndexOf(e[m]);h>f&&(f=h,i=e[m])}if(f==-1)return;f+=i.length;var v=d.substr(0,f);b.deferrer.dwBuffer[a]=d.slice(f);d=v}if(typeof d!="undefined"&&d!=""){var n=g.getElementById(a),d=b.deferrer.loadBufferedScriptTags(a,n,d);n.innerHTML=d;for(var j=document.createDocumentFragment();n.firstChild;)j.appendChild(n.firstChild);n.parentNode.insertBefore(j,n)}}}catch(k){b.e(k,"deferrer","flushDocumentWriteBuffer",null)}},resetDocWrite:function(){g.write=b.deferrer.originalDw;
g.writeln=b.deferrer.originalDwLn},loadJavaScript:function(a){try{o(a[1],function(){b.deferrer.flushDocumentWriteBuffer(a[0],!1);b.deferrer.resetDocWrite();b.deferrer.resetEventLoading();b.deferrer.process()})}catch(c){b.e(c,"deferrer","loadJavaScript",null)}}},sys:{jsv:18,cookie:{session:"SASId",visitor:"SAVId",prefetch:"SAPref",latcheck:"SALat",getPrefetch:function(a){try{var c=a.sys.cookie.get(a.sys.cookie.prefetch),d=null;c!=null&&(d={list:c});d==null&&(d={list:"0"});d.save=function(a){try{a.sys.cookie.set(a.sys.cookie.prefetch,
this.list,365,"/")}catch(c){b.e(c,"prefetch","save",null)}};return d}catch(e){a.e(e,"cookie","getPrefetch",null)}},getVisitor:function(){try{var a=this.get(this.visitor),c=null,d=null;a!=null&&(c=a.split(","),d=c.length>1?{vid:c[0]||b.sys.newUUID(),cvid:c[1]&&isNaN(c[1])&&c[1]>0?c[1]:0}:b.sys.regx2Obj("(.*?)=(.*?);",a));d==null&&(d={vid:b.sys.newUUID(),nvid:1,cvid:0});d.save=function(){try{var a,c="";for(a in this)this.hasOwnProperty(a)&&typeof this[a]!="function"&&(c+=a+"="+this[a]+";");b.sys.cookie.set(b.sys.cookie.visitor,
c,7,"/")}catch(d){b.e(d,"visitor","save",null)}};return d}catch(e){b.e(e,"cookie","getVisitor",null)}},getSession:function(){try{var a=this.get(this.session),c=null;a!=null&&(c=b.sys.regx2Obj("(.*?)=(.*?);",a));c==null&&(c={sid:b.sys.newUUID(),csid:0,nsid:1});c.save=function(){try{var a="",c;for(c in this)this.hasOwnProperty(c)&&typeof this[c]!="function"&&(a+=c+"="+this[c]+";");b.sys.cookie.set(b.sys.cookie.session,a,null,"/")}catch(d){b.e(d,"session","save",null)}};return c}catch(d){b.e(d,"cookie",
"getVisitor",null)}},set:function(a,c,d,e){try{var f=a+"="+escape(c);if(d){var i=new Date;i.setTime(i.getTime()+d*864E5);f+="; expires="+i.toGMTString()}e&&(f+="; path="+escape(e));g.cookie=f}catch(m){b.e(m,"cookie","set",null)}},get:function(a){try{if(typeof a=="undefined"||!a)return null;var a=" "+a+"=",c,d=null;try{d=" "+g.cookie+";"}catch(e){}return d&&(c=d.indexOf(a))>=0?(c+=a.length,d=d.substring(c,d.indexOf(";",c)),unescape(d)):null}catch(f){b.e(f,"cookie","get",null)}},erase:function(a,c){try{typeof a!=
"undefined"&&a&&this.set(a,"",-1,c)}catch(d){b.e(d,"cookie","erase",null)}}},newUUID:function(){try{for(var a=0,c=[],a=0;a<32;a++)c[a]="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".substr(Math.floor(Math.random()*62),1);return c.join("")}catch(d){b.e(d,"sys","newUUID",null)}},regx2Obj:function(a,c){try{for(var d,e={},f=RegExp(a,"g"),i;(d=f.exec(c))!=null;){i=isNaN(d[2])?d[2]:parseInt(d[2],10);if(i=="true"||i=="false")i=i=="true"?!0:!1;e[d[1]]=i}return e}catch(g){b.e(g,"sys","regx2Obj",
null)}},pre:{treat:function(a,c){try{if(typeof a=="undefined"||a==null)return null;if(typeof a.td=="undefined"||a.td==null)return a.u?a.u:null;if(typeof c=="undefined"||c==null)return null;var d=c[a.td];return d.p+"://"+a.p+d.d+a.u}catch(e){b.ee(e,"sys","pre","treat",null)}},load:function(){try{b.preloader&&setTimeout(function(){if(b.sys)b.sys.pre.start=(new Date).getTime();b.preloader.stale()?b.preloader.reload():b.preloader.load()},16)}catch(a){b.ee(a,"sys","pre","load",null)}},start:(new Date).getTime(),
fin:function(a,c){try{if(c.sys&&c.sys.cookie){var d=null,e=c.sys.cookie.getPrefetch(c);if(e.list==="0")setTimeout(function(){c.sys.pre.fin(a,c)},200);else{d=c.sys.cookie.getVisitor();d.pid=c.preloadPkg[1];d.pdx=d.plen;d.cid=c.preloadPkg[2];d.cdx=d.clen;d.gid=c.preloadPkg[3];d.gdx=d.glen;var f=function(a,b){var c=typeof a[b+"id"]=="undefined"?null:a[b+"id"],d=typeof a[b+"len"]=="undefined"?null:a[b+"len"];a.fLst=a.fLst||"";if(c&&(a.fLst.length==0||a.fLst.indexOf(c)==-1))a.fLst+=a.fLst&&a.fLst.length>
0?"~":"",a.fLst+=d+b+c};f(d,"p");f(d,"c");f(d,"g");d.save();e.save(c);c.sys.pre.close(a,c)}}}catch(g){b.ee(g,"sys","pre","fin",null)}},close:function(a){try{a.close()}catch(c){b.ee(c,"sys","pre","close",null)}},count:function(a,c){try{if(c!=null)c[a]++,c.pt=(new Date).getTime()-b.sys.pre.start,c.save()}catch(d){b.ee(d,"sys","pre","count",null)}},cull:function(a){try{var c=function(b,c,d,e,g,h){var j=0,k=0;g[e]=0;if(typeof b!="undefined"&&b&&b.length>0)if(g[e]=b.length,typeof g.fLst!="undefined"&&
g.fLst.indexOf(c)>=0)g[d]=b.length,b.clear();else if(a.preloadPkg[h]==g[c])for(k=g[d]||0;j<k;j++)b.shift();else g[c]=a.preloadPkg[h],g[d]=0},d=null;if(a.sys&&a.sys.cookie&&(d=a.sys.cookie.getVisitor(),d!=null))c(a.pList,"pid","pdx","plen",d,1),c(a.cList,"cid","cdx","clen",d,2),c(a.gList,"gid","gdx","glen",d,3),d.pt=0,d.p=d.c=d.g=0,d.save();return d}catch(e){b.ee(e,"sys","pre","cull",null)}},prefetch:function(a,c){try{var d=function(d,e,f,h,j){for(;d.length>0;)if(h=d.shift(),g=c.sys.pre.treat(h,e),
g!=null&&(!window.location.href.match(/^https/i)||!g.match(/^http:/i)))typeof f!="undefined"&&(f[j]=!0),h.a&&b.chrome&&b.wbv>12?a.write('<link rel="prerender" href="'+g+'" />'):a.write('<link rel="prefetch" href="'+g+'" />')},e=null,f=null,g=null;if(c.sys&&c.sys.cookie)e=c.sys.cookie.getPrefetch(c),e.list="0",e.save(c),f=c.sys.pre.cull(c);if(c.sys)c.sys.pre.start=(new Date).getTime();f||(f=b.sys.cookie.getVisitor());c.pList&&c.pList.length>0&&d(c.pList,c.pTreatedDomains,f,"pdx","p");c.cList&&c.cList.length>
0&&d(c.cList,c.cTreatedDomains,f,"cdx","c");c.gList&&c.gList.length>0&&d(c.gList,c.gTreatedDomains,f,"gdx","g");f.save();a.write('<link rel="prefetch" href="'+b.preloadPkg[0]+'slpref.gif" />');c.sys.pre.fin(a,c)}catch(h){b.ee(h,"sys","pre","prefetch",null)}}}}};__$1a49=b;b.paintTest()}catch(r){typeof console!="undefined"&&console.log(r),b.err.send(r,h,"slhead")}if(__$1D0C&&__$1D0C.stack&&__$1D0C.stack.length>0)b.load=__$1D0C.onload,b.stack=__$1D0C.stack,b.exec()}(window,navigator,document);

