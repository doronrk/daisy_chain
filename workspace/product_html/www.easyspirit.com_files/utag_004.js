//tealium universal tag - utag.319 ut4.0.201410211719, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var certonaResx=function(){function b(e){return parseInt(e,10)}function w(e){try{if(e!=null&&e!="null"&&e!=""){return true}}catch(t){}return false}function E(){return resx.rrelem}function S(e){try{var t=null;if(w(e)){t=new Array;if(w(document.getElementById(e))){t[0]=e}else{var n=e.replace(/[,;\-:]/g,".").split(".");for(var r=0;r<n.length;r++){if(w(document.getElementById(n[r]))){t[r]=n[r]}else{t[r]=""}}}}return t}catch(i){T("",i)}return null}function x(){try{if(resx.rrelem!==undefined){var e=S(E());if(e!=null){var t=null;for(var n=0;n<e.length;n++){t=document.getElementById(e[n]);if(w(t)){t.style.visibility="visible"}}}}}catch(r){}}function T(n,r){try{if(!e){e=true;t=escape(n+"|"+(r.number!==undefined?r.number:"undefined")+"|"+(r.name!==undefined?r.name:"undefined")+"|"+(r.description!==undefined?r.description:"undefined"))}}catch(i){}finally{x()}}function N(e){try{if(document.cookie.length>0){var t=document.cookie.indexOf(e+"=");if(t!=-1){t+=e.length+1;var n=document.cookie.indexOf(";",t);if(n==-1){n=document.cookie.length}return unescape(document.cookie.substring(t,n))}}}catch(r){T("",r)}return null}function C(e,t,n,r,i){try{var s=new Date;if(n!=null){s.setTime(s.getTime()+n*3600*1e3)}document.cookie=e+"="+escape(t)+(w(n)?"; expires="+s.toGMTString():"")+(w(r)?"; path="+r:"; path=/")+(w(i)?"; domain="+i:"")}catch(o){T("",o)}}function k(e,t){try{if(t!==undefined&&t!=null){for(var n=0;n<t.length;n++){if(t[n]+""==e){return true}}}}catch(r){}return false}function L(){try{var t=resx.rrec!==undefined&&(resx.rrec==true||resx.rrec=="true")&&c=="1"&&!e;if(t){if(!g){t=false;if(resx.rrelem!==undefined){var n=S(E());if(n!=null){for(var r=0;r<n.length;r++){if(w(n[r])){t=true;break}}}}}if(t){if(resx.useitems===undefined||!w(resx.useitems)){t=false;if(resx.rrnum!==undefined){var i=resx.rrnum+"";i=i.replace(/,/g,";");var s=i.split(";");for(var r=0;r<s.length;r++){if(!isNaN(s[r])&&b(s[r])>0){t=true;break}}}}}}return t}catch(o){}return false}function A(e){try{var t="";e+="";for(var n=e.length-1;n>=0;n--){t+=e.charAt(n)}return t}catch(r){}return""}function O(){try{var e="";if(navigator.userAgent.toLowerCase().indexOf("mac")==-1){e=Math.floor(Math.random()*1e15);e+=""}else{var t=Math.floor(Math.random()*1e6),n=new Date,r=n.getTime();r+="";var i=A(r);t+="";e=t+i.substring(0,11)}return e}catch(s){T("guid",s)}return""}function M(e,t,n,r,i,s){try{var o="",u=null,a="";if(typeof e==="object"){u=document.getElementsByTagName("a")}else{var f=document.getElementById(e);if(w(f)){u=f.getElementsByTagName("a");a=e}}if(u!==undefined&&u!=null){var l=null,c=null,h=null,p=0,d="",v="",m="",g="",y="",b=null;if(w(t)){h=-1;c=new Array;for(var E=0;E<t.length;E++){l=document.getElementById(t[E]);if(w(l)){b=l.getElementsByTagName("a");for(var S=0;S<b.length;S++){h++;c[h]=b[S]+""}}}}for(var E=0;E<u.length;E++){if(p==s){break}d=u[E]+"";if(w(d)){v=escape(d);g="";if(w(n)){v=v.match(n)+""}if(w(v)){g=v.match(r)+""}if(w(g+"")){if(!k(d,c)){y=v.match(i)+"";m=g+escape("|")+a+escape("|")+(w(y)?y:"")+";";if(o.indexOf(m)==-1){o+=m;p++}}}}}}return o}catch(x){T("gpl",x)}return""}function _(e){try{m=true;if(!g){var t=null;for(var n=0;n<e.Resonance.Response.length;n++){if(e.Resonance.Response[n].display=="yes"){t=document.getElementById(e.Resonance.Response[n].scheme);if(w(t)){t.innerHTML=e.Resonance.Response[n].output}}}}}catch(r){}finally{x();pidExchange()}}function D(){try{if(!m&&!g){if(y<2e3){y=y+50;window.setTimeout("certonaResx.checkCallback()",50)}else{g=true;x()}}}catch(e){x()}}function P(e){try{var t="",n="",r="";if(typeof e==="boolean"&&e===true){if(resx.rrcall!==undefined&&w(resx.rrcall)){n=resx.rrcall}else{n=v}}else if(typeof e==="string"){n=e}if(n.length>0){if(n==v){r="&cb="}else{r="&ccb="}r+=n}t=(resx.useitems!==undefined&&w(resx.useitems)?"&ui="+resx.useitems:"&no="+resx.rrnum)+(resx.exitemid!==undefined&&w(resx.exitemid)?"&ex="+resx.exitemid:"")+(resx.rrqs!==undefined?"&"+resx.rrqs:"")+r;return t}catch(i){}return""}function H(){try{var e=location.hostname;if(w(e)){if(!e.match(/(\d{1,3}\.){3}\d{1,3}/)){var t=e.split(".");if(t.length>1){e="."+t[t.length-2]+"."+t[t.length-1];var n=/\.(co|com)\.\w{2}$/;if(e.toLowerCase().match(n)&&t.length>2){e="."+t[t.length-3]+e}}}return e}}catch(r){T("gcd",r)}return null}function B(e){try{var t=location.search,n=t.indexOf("?"+e+"=");if(n==-1){n=t.indexOf("&"+e+"=")}if(n>-1){n=n+e.length+2;var r=t.indexOf("&",n);if(r==-1){return t.substring(n)}else{return t.substring(n,r)}}}catch(i){}return null}function j(){try{var e="",t="";for(var n=0;n<51;n++){if(resx["cv"+n]!==undefined){t=resx["cv"+n]+"";t=t.replace(/\+/g,"%2B");e+="&cv"+n+"="+encodeURIComponent(t)}}return e}catch(r){T("gcv",r)}return""}function F(n){try{var r={callback:false};if(n===undefined){var n=r}else{for(var i in r){if(n[i]===undefined){n[i]=r[i]}}}e=false;t=null;f="";l="";c="";h="";p="";d=false;m=false;g=false;y=0;var s=H();if(location.search.indexOf("resxtrack=")>0&&(resx.trackingid===undefined||!w(resx.trackingid))){f=B("resxtrack")}if(resx.trackingid===undefined||!w(resx.trackingid)){if(!isNaN(b(f))){C(o,f,87648,null,s);if(!w(N(o))){C(o,f,null,null,s)}C(u,"",-1,null,s)}else{f=N(o);if(isNaN(b(f))){f=O();C(o,f,87648,null,s);if(!w(N(o))){C(o,f,null,null,s)}}}if(resx.segment===undefined||!w(resx.segment)){var k=b(f);if(!isNaN(k)&&k>0){k+="";k=k.substring(1,6);k=b(k);var A=b(resx.top1),_=b(resx.top2),D=b(resx.top3),P=1e5;if(!(isNaN(A)&&isNaN(_)&&isNaN(D))){if(isNaN(A)){A=0}if(isNaN(_)){_=A}if(isNaN(D)){D=_}if(k<A){c="1"}else if(k<_){c="2"}else if(k<D){c="3"}else if(k<P){c="4"}}}C(a,c,1440,null,s);if(!w(N(a))){C(a,c,null,null,s)}}}else{f=resx.trackingid}if((resx.sessionid===undefined||!w(resx.sessionid))&&(resx.trackingid===undefined||!w(resx.trackingid))){l=N(u);if(!w(l)){l=O()}C(u,l,.5,null,s);if(!w(N(u))){C(u,l,null,null,s)}}else{l=resx.sessionid}if(resx.segment!==undefined&&w(resx.segment)){c=resx.segment}if(isNaN(b(c))){c="1"}if(resx.pageid!==undefined&&w(resx.pageid)){h=resx.pageid}else{h=O()}var j=resx.links!==undefined?resx.links+"":"";if(w(j)){var F=j.replace(/\,/g,";").replace(/\|/g,"%7C").split(";",50);for(var I=0;I<F.length;I++){p+=F[I]+";"}}var q=resx.maxl!==undefined&&!isNaN(resx.maxl)?b(resx.maxl):20,R=resx.lkmatch!==undefined?resx.lkmatch:"",U=resx.ltmatch!==undefined?resx.ltmatch:"";if(w(R)){var W=resx.plkmatch!==undefined?resx.plkmatch:"",X=null;if(resx.rrelem!==undefined){X=S(E())}if(X!=null){for(var I=0;I<X.length;I++){if(w(X[I])){p+=M(X[I],null,W,R,U,50)}}}if(q>0){p+=M(document,X,W,R,U,q)}}if(typeof n.callback==="string"&&n.callback!=v||n.callback==false||resx.rrcall!==undefined&&w(resx.rrcall)&&resx.rrcall!=v){g=true}d=L()&&w(f)&&w(h);if(!d){x()}}catch(V){T("pv",V)}}function I(o){try{if(c=="1"||c=="2"||c=="3"){if(d){window.setTimeout("certonaResx.checkCallback();",50)}var u="appid="+(resx.appid!==undefined?resx.appid:"")+"&tk="+(w(f)?f:"")+"&ss="+(w(l)?l:"")+"&sg="+(w(c)?c:"")+"&pg="+(w(h)?h:"")+"&vr="+s+"&bx="+d,a="";if(resx.rrelem!==undefined){var v=E().replace(/[,;\-:]/g,".").split(".");if(v!=null){for(var m=0;m<v.length;m++){a+="&sc="+v[m]}}}u+=a+(resx.event!==undefined?"&ev="+resx.event:"")+(resx.itemid!==undefined?"&ei="+resx.itemid:"")+(resx.qty!==undefined?"&qty="+resx.qty:"")+(resx.price!==undefined?"&pr="+resx.price:"")+(resx.shipping!==undefined?"&sh="+resx.shipping:"")+(resx.total!==undefined?"&tt="+resx.total:"")+(resx.currencycode!==undefined?"&cc="+resx.currencycode:"")+(resx.customerid!==undefined?"&cu="+resx.customerid:"")+(resx.transactionid!==undefined?"&tr="+resx.transactionid:"");u+=(d?P(o):"")+j()+"&ur="+escape(location.href.substring(0,400))+"&plk="+(w(p)?p:"")+"&rf="+escape(document.referrer)+(e?"&er="+e+"&em="+t:"");var g=r;if(resx.host!==undefined&&w(resx.host)){g=resx.host}var y=n+g+i+"?"+u;return y.substring(0,2083)}}catch(b){T("",b)}return""}function q(e){try{if(e!=""){var t=document.createElement("script");t.type="text/javascript";t.async=true;t.src=e;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n)}}catch(r){T("",r)}}function R(e){var t={callback:false};if(e===undefined){var e=t}else{for(var n in t){if(e[n]===undefined){e[n]=t[n]}}}return I(e.callback)}function U(){F({callback:true});var e=I(true);q(e)}var e=false,t=null,n=location.protocol.toLowerCase()=="https:"?"https://":"http://",r="www.res-x.com",i="/ws/r2/Resonance.aspx",s="4.2x",o="RES_TRACKINGID",u="RES_SESSIONID",a="ResonanceSegment",f="",l="",c="",h="",p="",d=false,v="certonaResx.showResponse",m=false,g=false,y=0;return{checkCallback:function(){D()},showResponse:function(e){_(e)},getURL:function(e){F(e);return R(e)},run:function(){U()}}}()
var resx=resx||{};try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.appid='Jones04';u.top1='100000';u.top2='100000';u.lkmatch=u.ltmatch=u.rrec=false;u.rrelem='';u.rrnum='';u.jquery="false";u.map={"recommendation_callback":"success","get_recommendations":"rrec","recommendation_schemes":"rrelem","recommendation_number":"rrnum","product_id":"itemid","recomendation_event":"event","order_subtotal":"total"};u.extend=[function(a,b){if(resx.qty){resx.qty=resx.qty.replace(/,/g,";");resx.price=resx.price.replace(/,/g,";");}},function(a,b){if(b['page_type'].toString().toLowerCase().indexOf('product'.toLowerCase())>-1||(b['page_type'].toString().toLowerCase().indexOf('checkout'.toLowerCase())>-1&&b['page_name'].toString().toLowerCase().indexOf('cart'.toLowerCase())>-1)||b['page_type'].toString().toLowerCase().indexOf('home'.toLowerCase())>-1||b['page_type'].toString().toLowerCase().indexOf('search'.toLowerCase())>-1||b['page_type'].toString().toLowerCase().indexOf('nosearch'.toLowerCase())>-1||(b['page_type'].toString().toLowerCase().indexOf('checkout'.toLowerCase())>-1&&b['page_name'].toString().toLowerCase().indexOf('checkout'.toLowerCase())>-1)){b['get_recommendations']='true'}},function(a,b,c,d,e,f,g){d=b['page_type'];if(typeof d=='undefined')return;c=[{'product':'product_rr;product2_rr'},{'checkout':'cart_rr'},{'home':'home1_rr'},{'search':'search1_rr;search2_rr'},{'nosearch':'nosearch1_rr'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['recommendation_schemes']=c[e][f];m=true};};if(m)break};if(!m)b['recommendation_schemes']='';},function(a,b,c,d,e,f,g){d=b['page_type'];if(typeof d=='undefined')return;c=[{'product':'4;4'},{'checkout':'3'},{'home':'4'},{'search':'4;4'},{'nosearch':'4'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['recommendation_number']=c[e][f];m=true};};if(m)break};if(!m)b['recommendation_number']='';},function(a,b){if(b['page_type'].toString().toLowerCase().indexOf('product'.toLowerCase())>-1){b['recomendation_event']='product'}},function(a,b){if((b['page_type'].toString().toLowerCase().indexOf('checkout'.toLowerCase())>-1&&b['product_name'].toString().toLowerCase().indexOf('cart'.toLowerCase())>-1)){b['recomendation_event']='shopping+cart'}}];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!="undefined"){resx.appid=u.appid;resx.top1=u.top1;resx.top2=u.top2;resx.lkmatch=u.lkmatch;resx.ltmatch=u.ltmatch;resx.rrec=u.rrec;if(resx.rrec){resx.rrelem=u.rrelem;resx.rrnum=u.rrnum;}
for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f]=='top1'||e[f]=="top2"||e[f]=="lkmatch"||e[f]=="ltmatch"||e[f]=="rrec"||e[f]=="success"||e[f]=="error"||e[f]=="jquery"){u[e[f]]=b[d];}else if(e[f]=='rrelem'||e[f]=="rrnum"){u[e[f]]=((b[d]instanceof Array)?b[d].join(";"):b[d]);}else{resx[e[f]]=((b[d]instanceof Array)?b[d].join(";"):b[d]);}}}};resx.transaction=resx.transaction||b._corder;if(resx.transaction){resx.event=resx.event||"purchase+confirmation";resx.itemid=(resx.itemid?resx.itemid:b._cprod.join(';'));resx.qty=(resx.qty?resx.qty:b._cquan.join(';'));resx.price=(resx.price?resx.price:b._cprice.join(';'));resx.shipping=(resx.shipping?resx.shipping:b._cship);resx.total=(resx.total?resx.total:b._ctotal);resx.customerid=resx.customerid||b._ccustid;u.jquery="false";}
resx.appid=u.appid;resx.top1=u.top1;resx.top2=u.top2;resx.lkmatch=u.lkmatch;resx.ltmatch=u.ltmatch;resx.rrec=u.rrec;if(resx.rrec){resx.rrelem=u.rrelem;resx.rrnum=u.rrnum;}
if(u.jquery=="true"&&typeof window[u.success]!="undefined"){var url=certonaResx.getURL();jQuery.ajax({url:url,dataType:'jsonp',jsonp:'jsonp',success:function(response){try{window[u.success](response)}catch(e){};},error:function(){try{window[u.error]()}catch(e){};}});}else if(u.jquery!="true"){certonaResx.run();}}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('319','thejonesgroup.easyspirit');}catch(e){}