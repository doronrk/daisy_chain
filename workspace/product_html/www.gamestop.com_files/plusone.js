var gapi=window.gapi=window.gapi||{};gapi._bs=new Date().getTime();(function(){var aa=encodeURIComponent,k=window,ba=Object,q=document,ca=Array,da=parseInt,r=String,ea=decodeURIComponent;function fa(a,b){return a.type=b}
var ga="appendChild",ha="shift",ia="exec",ja="width",t="replace",ka="concat",la="charAt",ma="match",u="createElement",w="setAttribute",na="bind",oa="getTime",pa="getElementsByTagName",y="substr",z="toString",A="split",B="location",qa="style",ra="protocol",C="href",sa="action",E="apply",ta="attributes",ua="height",F="push",G="test",va="slice",wa="getElementById",xa="JSON",H="indexOf",ya="nodeName",za="type",I="length",J="prototype",Aa="removeChild",L="call",Ba="getAttribute",Ca="charCodeAt",Da="substring",
Ea="documentMode",M="parentNode",Fa="update",N="join",Ga="toLowerCase",Ha=function(a,b,c){return a[L][E](a[na],arguments)},Ia=function(a,b,c){if(!a)throw Error();if(2<arguments[I]){var d=ca[J][va][L](arguments,2);return function(){var c=ca[J][va][L](arguments);ca[J].unshift[E](c,d);return a[E](b,c)}}return function(){return a[E](b,arguments)}},Ja=function(a,b,c){Ja=Function[J][na]&&-1!=Function[J][na][z]()[H]("native code")?Ha:Ia;return Ja[E](null,arguments)};
Function[J].bind=Function[J][na]||function(a,b){if(1<arguments[I]){var c=ca[J][va][L](arguments,1);c.unshift(this,a);return Ja[E](null,c)}return Ja(this,a)};var O=k,P=q,Ka=O[B],La=function(){},Ma=/\[native code\]/,Q=function(a,b,c){return a[b]=a[b]||c},Na=function(a){for(var b=0;b<this[I];b++)if(this[b]===a)return b;return-1},Oa=function(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a[I];d++){var e=a[d];e!=c&&b[F](e);c=e}return b},Pa=/&/g,Qa=/</g,Ra=/>/g,Sa=/"/g,Ta=/'/g,Ua=function(a){return r(a)[t](Pa,"&amp;")[t](Qa,"&lt;")[t](Ra,"&gt;")[t](Sa,"&quot;")[t](Ta,"&#39;")},R=function(){var a;if((a=ba.create)&&Ma[G](a))a=a(null);else{a={};for(var b in a)a[b]=
void 0}return a},S=function(a,b){return ba[J].hasOwnProperty[L](a,b)},Va=function(a){if(Ma[G](ba.keys))return ba.keys(a);var b=[],c;for(c in a)S(a,c)&&b[F](c);return b},T=function(a,b){a=a||{};for(var c in a)S(a,c)&&(b[c]=a[c])},Wa=function(a){return function(){O.setTimeout(a,0)}},Xa=function(a,b){if(!a)throw Error(b||"");},U=Q(O,"gapi",{});var V=function(a,b,c){var d=new RegExp("([#].*&|[#])"+b+"=([^&#]*)","g");b=new RegExp("([?#].*&|[?#])"+b+"=([^&#]*)","g");if(a=a&&(d[ia](a)||b[ia](a)))try{c=ea(a[2])}catch(e){}return c},Ya=/^([^?#]*)(\?([^#]*))?(\#(.*))?$/,Za=function(a){a=a[ma](Ya);var b=R();b.H=a[1];b.j=a[3]?[a[3]]:[];b.o=a[5]?[a[5]]:[];return b},$a=function(a){return a.H+(0<a.j[I]?"?"+a.j[N]("&"):"")+(0<a.o[I]?"#"+a.o[N]("&"):"")},ab=function(a,b){var c=[];if(a)for(var d in a)if(S(a,d)&&null!=a[d]){var e=b?b(a[d]):a[d];c[F](aa(d)+
"="+aa(e))}return c},bb=function(a,b,c,d){a=Za(a);a.j[F][E](a.j,ab(b,d));a.o[F][E](a.o,ab(c,d));return $a(a)},cb=function(a,b){var c="";2E3<b[I]&&(c=b[Da](2E3),b=b[Da](0,2E3));var d=a[u]("div"),e=a[u]("a");e.href=b;d[ga](e);d.innerHTML=d.innerHTML;b=r(d.firstChild[C]);d[M]&&d[M][Aa](d);return b+c},db=/^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;var eb=function(a,b,c,d){if(O[c+"EventListener"])O[c+"EventListener"](a,b,!1);else if(O[d+"tachEvent"])O[d+"tachEvent"]("on"+a,b)},fb=function(){var a=P.readyState;return"complete"===a||"interactive"===a&&-1==navigator.userAgent[H]("MSIE")},ib=function(a){var b=gb;if(!fb())try{b()}catch(c){}hb(a)},hb=function(a){if(fb())a();else{var b=!1,c=function(){if(!b)return b=!0,a[E](this,arguments)};O.addEventListener?(O.addEventListener("load",c,!1),O.addEventListener("DOMContentLoaded",c,!1)):O.attachEvent&&
(O.attachEvent("onreadystatechange",function(){fb()&&c[E](this,arguments)}),O.attachEvent("onload",c))}},jb=function(a){for(;a.firstChild;)a[Aa](a.firstChild)},kb={button:!0,div:!0,span:!0};var W;W=Q(O,"___jsl",R());Q(W,"I",0);Q(W,"hel",10);var lb=function(a){return W.dpo?W.h:V(a,"jsh",W.h)},mb=function(a){var b=Q(W,"sws",[]);b[F][E](b,a)},nb=function(a){return Q(W,"watt",R())[a]},pb=function(a){var b=Q(W,"PQ",[]);W.PQ=[];var c=b[I];if(0===c)a();else for(var d=0,e=function(){++d===c&&a()},f=0;f<c;f++)b[f](e)},qb=function(a){return Q(Q(W,"H",R()),a,R())};var rb=Q(W,"perf",R()),sb=Q(rb,"g",R()),tb=Q(rb,"i",R());Q(rb,"r",[]);R();R();var ub=function(a,b,c){var d=rb.r;"function"===typeof d?d(a,b,c):d[F]([a,b,c])},vb=function(a,b,c){sb[a]=!b&&sb[a]||c||(new Date)[oa]();ub(a)},xb=function(a,b,c){b&&0<b[I]&&(b=wb(b),c&&0<c[I]&&(b+="___"+wb(c)),28<b[I]&&(b=b[y](0,28)+(b[I]-28)),c=b,b=Q(tb,"_p",R()),Q(b,c,R())[a]=(new Date)[oa](),ub(a,"_p",c))},wb=function(a){return a[N]("__")[t](/\./g,"_")[t](/\-/g,"_")[t](/\,/g,"_")};var yb=R(),zb=[],X=function(a){throw Error("Bad hint"+(a?": "+a:""));};zb[F](["jsl",function(a){for(var b in a)if(S(a,b)){var c=a[b];"object"==typeof c?W[b]=Q(W,b,[])[ka](c):Q(W,b,c)}if(b=a.u)a=Q(W,"us",[]),a[F](b),(b=/^https:(.*)$/[ia](b))&&a[F]("http:"+b[1])}]);var Ab=/^(\/[a-zA-Z0-9_\-]+)+$/,Bb=/^[a-zA-Z0-9\-_\.,!]+$/,Cb=/^gapi\.loaded_[0-9]+$/,Db=/^[a-zA-Z0-9,._-]+$/,Hb=function(a,b,c,d){var e=a[A](";"),f=e[ha](),g=yb[f],h=null;g?h=g(e,b,c,d):X("no hint processor for: "+f);h||X("failed to generate load url");b=h;c=b[ma](Eb);(d=b[ma](Fb))&&1===d[I]&&Gb[G](b)&&c&&1===c[I]||X("failed sanity: "+a);return h},Kb=function(a,b,c,d){a=Ib(a);Cb[G](c)||X("invalid_callback");b=Jb(b);d=d&&d[I]?Jb(d):null;var e=function(a){return aa(a)[t](/%2C/g,",")};return[aa(a.U)[t](/%2C/g,
",")[t](/%2F/g,"/"),"/k=",e(a.version),"/m=",e(b),d?"/exm="+e(d):"","/rt=j/sv=1/d=1/ed=1",a.J?"/am="+e(a.J):"",a.K?"/rs="+e(a.K):"",a.L?"/zcms="+e(a.L):"","/cb=",e(c)][N]("")},Ib=function(a){"/"!==a[la](0)&&X("relative path");for(var b=a[Da](1)[A]("/"),c=[];b[I];){a=b[ha]();if(!a[I]||0==a[H]("."))X("empty/relative directory");else if(0<a[H]("=")){b.unshift(a);break}c[F](a)}a={};for(var d=0,e=b[I];d<e;++d){var f=b[d][A]("="),g=ea(f[0]),h=ea(f[1]);2==f[I]&&g&&h&&(a[g]=a[g]||h)}b="/"+c[N]("/");Ab[G](b)||
X("invalid_prefix");c=Lb(a,"k",!0);d=Lb(a,"am");e=Lb(a,"rs");a=Lb(a,"zcms");return{U:b,version:c,J:d,K:e,L:a}},Jb=function(a){for(var b=[],c=0,d=a[I];c<d;++c){var e=a[c][t](/\./g,"_")[t](/-/g,"_");Db[G](e)&&b[F](e)}return b[N](",")},Lb=function(a,b,c){a=a[b];!a&&c&&X("missing: "+b);if(a){if(Bb[G](a))return a;X("invalid: "+b)}return null},Gb=/^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,Fb=/\/cb=/g,Eb=/\/\//g,Mb=function(){var a=lb(Ka[C]);if(!a)throw Error("Bad hint");return a};
yb.m=function(a,b,c,d){(a=a[0])||X("missing_hint");return"https://apis.google.com"+Kb(a,b,c,d)};var Nb=decodeURI("%73cript"),Ob=function(a,b){for(var c=[],d=0;d<a[I];++d){var e=a[d];e&&0>Na[L](b,e)&&c[F](e)}return c},Qb=function(a){"loading"!=P.readyState?Pb(a):P.write("<"+Nb+' src="'+encodeURI(a)+'"></'+Nb+">")},Pb=function(a){var b=P[u](Nb);b[w]("src",a);b.async="true";(a=P[pa](Nb)[0])?a[M].insertBefore(b,a):(P.head||P.body||P.documentElement)[ga](b)},Rb=function(a,b){var c=b&&b._c;if(c)for(var d=0;d<zb[I];d++){var e=zb[d][0],f=zb[d][1];f&&S(c,e)&&f(c[e],a,b)}},Tb=function(a,b){Sb(function(){var c;
c=b===lb(Ka[C])?Q(U,"_",R()):R();c=Q(qb(b),"_",c);a(c)})},Vb=function(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);Rb(a,c);var d=a?a[A](":"):[],e=c.h||Mb(),f=Q(W,"ah",R());if(f["::"]&&d[I]){for(var g=[],h=null;h=d[ha]();){var l=h[A]("."),l=f[h]||f[l[1]&&"ns:"+l[0]||""]||e,n=g[I]&&g[g[I]-1]||null,m=n;n&&n.hint==l||(m={hint:l,N:[]},g[F](m));m.N[F](h)}var p=g[I];if(1<p){var x=c.callback;x&&(c.callback=function(){0==--p&&x()})}for(;d=g[ha]();)Ub(d.N,c,d.hint)}else Ub(d||[],c,e)},Ub=function(a,
b,c){a=Oa(a)||[];var d=b.callback,e=b.config,f=b.timeout,g=b.ontimeout,h=null,l=!1;if(f&&!g||!f&&g)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";var n=Q(qb(c),"r",[]).sort(),m=Q(qb(c),"L",[]).sort(),p=[][ka](n),x=function(a,b){if(l)return 0;O.clearTimeout(h);m[F][E](m,D);var d=((U||{}).config||{})[Fa];d?d(e):e&&Q(W,"cu",[])[F](e);if(b){xb("me0",a,p);try{Tb(b,c)}finally{xb("me1",a,p)}}return 1};0<f&&(h=O.setTimeout(function(){l=!0;g()},f));var D=Ob(a,m);if(D[I]){var D=
Ob(a,n),v=Q(W,"CP",[]),K=v[I];v[K]=function(a){if(!a)return 0;xb("ml1",D,p);var b=function(b){v[K]=null;x(D,a)&&pb(function(){d&&d();b()})},c=function(){var a=v[K+1];a&&a()};0<K&&v[K-1]?v[K]=function(){b(c)}:b(c)};if(D[I]){var ob="loaded_"+W.I++;U[ob]=function(a){v[K](a);U[ob]=null};a=Hb(c,D,"gapi."+ob,n);n[F][E](n,D);xb("ml0",D,p);b.sync||O.___gapisync?Qb(a):Pb(a)}else v[K](La)}else x(D)&&d&&d()};var Sb=function(a){if(W.hee&&0<W.hel)try{return a()}catch(b){W.hel--,Vb("debug_error",function(){try{k.___jsl.hefn(b)}catch(a){throw b;}})}else return a()};U.load=function(a,b){return Sb(function(){return Vb(a,b)})};var Wb=function(a){var b=k.___jsl=k.___jsl||{};b[a]=b[a]||[];return b[a]},Xb=function(a){var b=k.___jsl=k.___jsl||{};b.cfg=!a&&b.cfg||{};return b.cfg},Yb=function(a){return"object"===typeof a&&/\[native code\]/[G](a[F])},Zb=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]&&b[c]&&"object"===typeof a[c]&&"object"===typeof b[c]&&!Yb(a[c])&&!Yb(b[c])?Zb(a[c],b[c]):b[c]&&"object"===typeof b[c]?(a[c]=Yb(b[c])?[]:{},Zb(a[c],b[c])):a[c]=b[c])},$b=function(a){if(a&&!/^\s+$/[G](a)){for(;0==a[Ca](a[I]-
1);)a=a[Da](0,a[I]-1);var b;try{b=k[xa].parse(a)}catch(c){}if("object"===typeof b)return b;try{b=(new Function("return ("+a+"\n)"))()}catch(d){}if("object"===typeof b)return b;try{b=(new Function("return ({"+a+"\n})"))()}catch(e){}return"object"===typeof b?b:{}}},ac=function(a){Xb(!0);var b=k.___gcfg,c=Wb("cu");if(b&&b!==k.___gu){var d={};Zb(d,b);c[F](d);k.___gu=b}var b=Wb("cu"),e=q.scripts||q[pa]("script")||[],d=[],f=[];f[F][E](f,Wb("us"));for(var g=0;g<e[I];++g)for(var h=e[g],l=0;l<f[I];++l)h.src&&
0==h.src[H](f[l])&&d[F](h);0==d[I]&&0<e[I]&&e[e[I]-1].src&&d[F](e[e[I]-1]);for(e=0;e<d[I];++e)d[e][Ba]("gapi_processed")||(d[e][w]("gapi_processed",!0),(f=d[e])?(g=f.nodeType,f=3==g||4==g?f.nodeValue:f.textContent||f.innerText||f.innerHTML||""):f=void 0,(f=$b(f))&&b[F](f));a&&(d={},Zb(d,a),c[F](d));d=Wb("cd");a=0;for(b=d[I];a<b;++a)Zb(Xb(),d[a]);d=Wb("ci");a=0;for(b=d[I];a<b;++a)Zb(Xb(),d[a]);a=0;for(b=c[I];a<b;++a)Zb(Xb(),c[a])},Y=function(a){if(!a)return Xb();a=a[A]("/");for(var b=Xb(),c=0,d=a[I];b&&
"object"===typeof b&&c<d;++c)b=b[a[c]];return c===a[I]&&void 0!==b?b:void 0},bc=function(a,b){var c=a;if("string"===typeof a){for(var d=c={},e=a[A]("/"),f=0,g=e[I];f<g-1;++f)var h={},d=d[e[f]]=h;d[e[f]]=b}ac(c)};var cc=function(){var a=k.__GOOGLEAPIS;a&&(a.googleapis&&!a["googleapis.config"]&&(a["googleapis.config"]=a.googleapis),Q(W,"ci",[])[F](a),k.__GOOGLEAPIS=void 0)};var dc={apppackagename:1,callback:1,clientid:1,cookiepolicy:1,openidrealm:-1,includegrantedscopes:-1,requestvisibleactions:1,scope:1},ec=!1,fc=R(),gc=function(){if(!ec){for(var a=q[pa]("meta"),b=0;b<a[I];++b){var c=a[b].name[Ga]();if(0==c.lastIndexOf("google-signin-",0)){var c=c[Da](14),d=a[b].content;dc[c]&&d&&(fc[c]=d)}}if(k.self!==k.top){var a=q[B][z](),e;for(e in dc)0<dc[e]&&(b=V(a,e,""))&&(fc[e]=b)}ec=!0}e=R();T(fc,e);return e},hc=function(a){return!!(a.clientid&&a.scope&&a.callback)};var ic=k.console,jc=function(a){ic&&ic.log&&ic.log(a)};var kc=function(){return!!W.oa},lc=function(){};var Z=Q(W,"rw",R()),mc=function(a){for(var b in Z)a(Z[b])},nc=function(a,b){var c=Z[a];c&&c.state<b&&(c.state=b)};var oc;var pc=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/u\/(\d)\//,qc=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/b\/(\d{10,})\//,rc=function(a){var b=Y("googleapis.config/sessionIndex");null==b&&(b=k.__X_GOOG_AUTHUSER);if(null==b){var c=k.google;c&&(b=c.authuser)}null==b&&(a=a||k[B][C],b=V(a,"authuser")||null,null==b&&(b=(b=a[ma](pc))?b[1]:null));return null==b?null:r(b)},sc=function(a){var b=Y("googleapis.config/sessionDelegate");null==b&&(b=(a=(a||k[B][C])[ma](qc))?
a[1]:null);return null==b?null:r(b)};var tc=function(){this.c=-1};var uc=function(){this.c=-1;this.c=64;this.b=[];this.p=[];this.O=[];this.n=[];this.n[0]=128;for(var a=1;a<this.c;++a)this.n[a]=0;this.l=this.g=0;this.reset()};(function(){function a(){}a.prototype=tc[J];uc.aa=tc[J];uc.prototype=new a;uc.H=function(a,c,d){return tc[J][c][E](a,ca[J][va][L](arguments,2))}})();uc[J].reset=function(){this.b[0]=1732584193;this.b[1]=4023233417;this.b[2]=2562383102;this.b[3]=271733878;this.b[4]=3285377520;this.l=this.g=0};
var vc=function(a,b,c){c||(c=0);var d=a.O;if("string"==typeof b)for(var e=0;16>e;e++)d[e]=b[Ca](c)<<24|b[Ca](c+1)<<16|b[Ca](c+2)<<8|b[Ca](c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.b[0];c=a.b[1];for(var g=a.b[2],h=a.b[3],l=a.b[4],n,e=0;80>e;e++)40>e?20>e?(f=h^c&(g^h),n=1518500249):(f=c^g^h,n=1859775393):60>e?(f=c&g|h&(c|g),n=2400959708):(f=c^g^h,n=3395469782),f=(b<<5|b>>>27)+
f+l+n+d[e]&4294967295,l=h,h=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f;a.b[0]=a.b[0]+b&4294967295;a.b[1]=a.b[1]+c&4294967295;a.b[2]=a.b[2]+g&4294967295;a.b[3]=a.b[3]+h&4294967295;a.b[4]=a.b[4]+l&4294967295};
uc[J].update=function(a,b){if(null!=a){void 0===b&&(b=a[I]);for(var c=b-this.c,d=0,e=this.p,f=this.g;d<b;){if(0==f)for(;d<=c;)vc(this,a,d),d+=this.c;if("string"==typeof a)for(;d<b;){if(e[f]=a[Ca](d),++f,++d,f==this.c){vc(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.c){vc(this,e);f=0;break}}this.g=f;this.l+=b}};var wc=function(){this.q=new uc};wc[J].reset=function(){this.q.reset()};var xc=O.crypto,yc=!1,zc=0,Ac=0,Bc=1,Cc=0,Dc="",Ec=function(a){a=a||O.event;var b=a.screenX+a.clientX<<16,b=b+(a.screenY+a.clientY),b=(new Date)[oa]()%1E6*b;Bc=Bc*b%Cc;0<zc&&++Ac==zc&&eb("mousemove",Ec,"remove","de")},Fc=function(a){var b=new wc;a=unescape(aa(a));for(var c=[],d=0,e=a[I];d<e;++d)c[F](a[Ca](d));b.q[Fa](c);a=b.q;b=[];d=8*a.l;56>a.g?a[Fa](a.n,56-a.g):a[Fa](a.n,a.c-(a.g-56));for(c=a.c-1;56<=c;c--)a.p[c]=d&255,d/=256;vc(a,a.p);for(c=d=0;5>c;c++)for(e=24;0<=e;e-=8)b[d]=a.b[c]>>e&255,++d;
a="";for(c=0;c<b[I];c++)a+="0123456789ABCDEF"[la](Math.floor(b[c]/16))+"0123456789ABCDEF"[la](b[c]%16);return a},yc=!!xc&&"function"==typeof xc.getRandomValues;yc||(Cc=1E6*(screen[ja]*screen[ja]+screen[ua]),Dc=Fc(P.cookie+"|"+P[B]+"|"+(new Date)[oa]()+"|"+Math.random()),zc=Y("random/maxObserveMousemove")||0,0!=zc&&eb("mousemove",Ec,"add","at"));
var Gc=function(){var a=Bc,a=a+da(Dc[y](0,20),16);Dc=Fc(Dc);return a/(Cc+Math.pow(16,20))},Hc=function(){var a=new O.Uint32Array(1);xc.getRandomValues(a);return Number("0."+a[0])};var Ic=function(){var a=W.onl;if(!a){a=R();W.onl=a;var b=R();a.e=function(a){var d=b[a];d&&(delete b[a],d())};a.a=function(a,d){b[a]=d};a.r=function(a){delete b[a]}}return a},Jc=function(a,b){var c=b.onload;return"function"===typeof c?(Ic().a(a,c),c):null},Kc=function(a){Xa(/^\w+$/[G](a),"Unsupported id - "+a);Ic();return'onload="window.___jsl.onl.e(&#34;'+a+'&#34;)"'},Lc=function(a){Ic().r(a)};var Mc={allowtransparency:"true",frameborder:"0",hspace:"0",marginheight:"0",marginwidth:"0",scrolling:"no",style:"",tabindex:"0",vspace:"0",width:"100%"},Nc={allowtransparency:!0,onload:!0},Oc=0,Pc=function(a){Xa(!a||db[G](a),"Illegal url for new iframe - "+a)},Qc=function(a,b,c,d,e){Pc(c.src);var f,g=Jc(d,c),h=g?Kc(d):"";try{f=a[u]('<iframe frameborder="'+Ua(r(c.frameborder))+'" scrolling="'+Ua(r(c.scrolling))+'" '+h+' name="'+Ua(r(c.name))+'"/>')}catch(l){f=a[u]("iframe"),g&&(f.onload=function(){f.onload=
null;g[L](this)},Lc(d))}for(var n in c)a=c[n],"style"===n&&"object"===typeof a?T(a,f[qa]):Nc[n]||f[w](n,r(a));(n=e&&e.beforeNode||null)||e&&e.dontclear||jb(b);b.insertBefore(f,n);f=n?n.previousSibling:b.lastChild;c.allowtransparency&&(f.allowTransparency=!0);return f};var Rc=/^:[\w]+$/,Sc=/:([a-zA-Z_]+):/g,Tc=function(){var a=rc()||"0",b=sc(),c;c=rc(void 0)||a;var d=sc(void 0),e="";c&&(e+="u/"+c+"/");d&&(e+="b/"+d+"/");c=e||null;(e=(d=!1===Y("isLoggedIn"))?"_/im/":"")&&(c="");var f=Y("iframes/:socialhost:"),g=Y("iframes/:im_socialhost:");return oc={socialhost:f,ctx_socialhost:d?g:f,session_index:a,session_delegate:b,session_prefix:c,im_prefix:e}},Uc=function(a,b){return Tc()[b]||""},Vc=function(a){return function(b,c){return a?Tc()[c]||a[c]||"":Tc()[c]||""}};var Wc={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},Xc=function(a){var b,c,d;b=/[\"\\\x00-\x1f\x7f-\x9f]/g;if(void 0!==a){switch(typeof a){case "string":return b[G](a)?'"'+a[t](b,function(a){var b=Wc[a];if(b)return b;b=a[Ca]();return"\\u00"+Math.floor(b/16)[z](16)+(b%16)[z](16)})+'"':'"'+a+'"';case "number":return isFinite(a)?r(a):"null";case "boolean":case "null":return r(a);case "object":if(!a)return"null";b=[];if("number"===typeof a[I]&&!a.propertyIsEnumerable("length")){d=
a[I];for(c=0;c<d;c+=1)b[F](Xc(a[c])||"null");return"["+b[N](",")+"]"}for(c in a)!/___$/[G](c)&&S(a,c)&&"string"===typeof c&&(d=Xc(a[c]))&&b[F](Xc(c)+":"+d);return"{"+b[N](",")+"}"}return""}},Yc=function(a){if(!a)return!1;if(/^[\],:{}\s]*$/[G](a[t](/\\["\\\/b-u]/g,"@")[t](/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]")[t](/(?:^|:|,)(?:\s*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}return!1},Zc=!1;try{Zc=!!k[xa]&&'["a"]'===k[xa].stringify(["a"])&&"a"===k[xa].parse('["a"]')[0]}catch($c){}
var ad=function(a){try{return k[xa].parse(a)}catch(b){return!1}},bd=Zc?k[xa].stringify:Xc,cd=Zc?ad:Yc;var dd=function(a){var b;a[ma](/^https?%3A/i)&&(b=ea(a));return cb(q,b?b:a)},ed=function(a){a=a||"canonical";for(var b=q[pa]("link"),c=0,d=b[I];c<d;c++){var e=b[c],f=e[Ba]("rel");if(f&&f[Ga]()==a&&(e=e[Ba]("href"))&&(e=dd(e))&&null!=e[ma](/^https?:\/\/[\w\-\_\.]+/i))return e}return k[B][C]};var fd={se:"0"},gd={post:!0},hd={style:"position:absolute;top:-10000px;width:450px;margin:0px;border-style:none"},id="onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(" "),jd=Q(W,"WI",R()),kd=function(a,b,c){var d,e;d={};var f=e=a;"plus"==a&&b[sa]&&(e=a+"_"+b[sa],f=a+"/"+b[sa]);(e=Y("iframes/"+e+"/url"))||(e=":im_socialhost:/:session_prefix::im_prefix:_/widget/render/"+f+"?usegapi=1");for(var g in fd)d[g]=g+"/"+(b[g]||fd[g])+"/";d=cb(P,e[t](Sc,Vc(d)));g="iframes/"+
a+"/params/";f={};T(b,f);(e=Y("lang")||Y("gwidget/lang"))&&(f.hl=e);gd[a]||(f.origin=k[B].origin||k[B][ra]+"//"+k[B].host);f.exp=Y(g+"exp");if(g=Y(g+"location"))for(e=0;e<g[I];e++){var h=g[e];f[h]=O[B][h]}switch(a){case "plus":case "follow":g=f[C];e=b[sa]?void 0:"publisher";g=(g="string"==typeof g?g:void 0)?dd(g):ed(e);f.url=g;delete f[C];break;case "plusone":g=(g=b[C])?dd(g):ed();f.url=g;g=b.db;e=Y();null==g&&e&&(g=e.db,null==g&&(g=e.gwidget&&e.gwidget.db));f.db=g||void 0;g=b.ecp;e=Y();null==g&&
e&&(g=e.ecp,null==g&&(g=e.gwidget&&e.gwidget.ecp));f.ecp=g||void 0;delete f[C];break;case "signin":f.url=ed()}W.ILI&&(f.iloader="1");delete f["data-onload"];delete f.rd;for(var l in fd)f[l]&&delete f[l];f.gsrc=Y("iframes/:source:");l=Y("inline/css");"undefined"!==typeof l&&0<c&&l>=c&&(f.ic="1");l=/^#|^fr-/;c={};for(var n in f)S(f,n)&&l[G](n)&&(c[n[t](l,"")]=f[n],delete f[n]);n="q"==Y("iframes/"+a+"/params/si")?f:c;l=gc();for(var m in l)!S(l,m)||S(f,m)||S(c,m)||(n[m]=l[m]);m=[][ka](id);(n=Y("iframes/"+
a+"/methods"))&&"object"===typeof n&&Ma[G](n[F])&&(m=m[ka](n));for(var p in b)S(b,p)&&/^on/[G](p)&&("plus"!=a||"onconnect"!=p)&&(m[F](p),delete f[p]);delete f.callback;c._methods=m[N](",");return bb(d,f,c)},ld=["style","data-gapiscan"],nd=function(a){for(var b=R(),c=0!=a[ya][Ga]()[H]("g:"),d=0,e=a[ta][I];d<e;d++){var f=a[ta][d],g=f.name,h=f.value;0<=Na[L](ld,g)||c&&0!=g[H]("data-")||"null"===h||"specified"in f&&!f.specified||(c&&(g=g[y](5)),b[g[Ga]()]=h)}a=a[qa];(c=md(a&&a[ua]))&&(b.height=r(c));
(a=md(a&&a[ja]))&&(b.width=r(a));return b},md=function(a){var b=void 0;"number"===typeof a?b=a:"string"===typeof a&&(b=da(a,10));return b},pd=function(){var a=W.drw;mc(function(b){if(a!==b.id&&4!=b.state&&"share"!=b[za]){var c=b.id,d=b[za],e=b.url;b=b.userParams;var f=P[wa](c);if(f){var g=kd(d,b,0);g?(f=f[M],e[t](/\#.*/,"")[t](/(\?|&)ic=1/,"")!==g[t](/\#.*/,"")[t](/(\?|&)ic=1/,"")&&(b.dontclear=!0,b.rd=!0,b.ri=!0,fa(b,d),od(f,b),(d=Z[f.lastChild.id])&&(d.oid=c),nc(c,4))):delete Z[c]}else delete Z[c]}})};var qd,rd,sd,td,ud,vd=/(?:^|\s)g-((\S)*)(?:$|\s)/,wd={plusone:!0,autocomplete:!0,profile:!0,signin:!0};qd=Q(W,"SW",R());rd=Q(W,"SA",R());sd=Q(W,"SM",R());td=Q(W,"FW",[]);ud=null;
var yd=function(a,b){xd(void 0,!1,a,b)},xd=function(a,b,c,d){vb("ps0",!0);c=("string"===typeof c?q[wa](c):c)||P;var e;e=P[Ea];if(c.querySelectorAll&&(!e||8<e)){e=d?[d]:Va(qd)[ka](Va(rd))[ka](Va(sd));for(var f=[],g=0;g<e[I];g++){var h=e[g];f[F](".g-"+h,"g\\:"+h)}e=c.querySelectorAll(f[N](","))}else e=c[pa]("*");c=R();for(f=0;f<e[I];f++){g=e[f];var l=g,h=d,n=l[ya][Ga](),m=void 0;l[Ba]("data-gapiscan")?h=null:(0==n[H]("g:")?m=n[y](2):(l=(l=r(l.className||l[Ba]("class")))&&vd[ia](l))&&(m=l[1]),h=!m||
!(qd[m]||rd[m]||sd[m])||h&&m!==h?null:m);h&&(wd[h]||0==g[ya][Ga]()[H]("g:")||0!=Va(nd(g))[I])&&(g[w]("data-gapiscan",!0),Q(c,h,[])[F](g))}if(b)for(var p in c)for(b=c[p],d=0;d<b[I];d++)b[d][w]("data-onload",!0);for(var x in c)td[F](x);vb("ps1",!0);if((p=td[N](":"))||a)try{U.load(p,a)}catch(D){jc(D);return}if(zd(ud||{}))for(var v in c){a=c[v];x=0;for(b=a[I];x<b;x++)a[x].removeAttribute("data-gapiscan");Ad(v)}else{d=[];for(v in c)for(a=c[v],x=0,b=a[I];x<b;x++)e=a[x],Bd(v,e,nd(e),d,b);Cd(p,d)}},Dd=function(a){var b=
Q(U,a,{});b.go||(b.go=function(b){return yd(b,a)},b.render=function(b,d){var e=d||{};fa(e,a);return od(b,e)})},Ed=function(a){qd[a]=!0},Fd=function(a){rd[a]=!0},Gd=function(a){sd[a]=!0};var Ad=function(a,b){var c=nb(a);b&&c?(c(b),(c=b.iframeNode)&&c[w]("data-gapiattached",!0)):U.load(a,function(){var c=nb(a),e=b&&b.iframeNode;e&&c?(c(b),e[w]("data-gapiattached",!0)):(0,U[a].go)(e&&e[M])})},zd=function(){return!1},Cd=function(){},Bd=function(a,b,c,d,e,f){switch(Hd(b,a,f)){case 0:a=sd[a]?a+"_annotation":a;d={};d.iframeNode=b;d.userParams=c;Ad(a,d);break;case 1:var g;if(b[M]){for(var h in c){if(f=S(c,h))f=c[h],f=!!f&&"object"===typeof f&&(!f[z]||f[z]===ba[J][z]||f[z]===ca[J][z]);if(f)try{c[h]=
bd(c[h])}catch(l){delete c[h]}}var n=!0;c.dontclear&&(n=!1);delete c.dontclear;lc();f=kd(a,c,e);h={allowPost:1,attributes:hd};h.dontclear=!n;e={};e.userParams=c;e.url=f;fa(e,a);var m;c.rd?m=b:(m=q[u]("div"),b[w]("data-gapistub",!0),m[qa].cssText="position:absolute;width:450px;left:-10000px;",b[M].insertBefore(m,b));e.siteElement=m;m.id||(b=m,Q(jd,a,0),n="___"+a+"_"+jd[a]++,b.id=n);b=R();b[">type"]=a;T(c,b);n=f;c=m;f=h||{};b=f[ta]||{};Xa(!f.allowPost||!b.onload,"onload is not supported by post iframe");
h=b=n;Rc[G](b)&&(h=Y("iframes/"+h[Da](1)+"/url"),Xa(!!h,"Unknown iframe url config for - "+b));n=cb(P,h[t](Sc,Uc));b=c.ownerDocument||P;m=0;do h=f.id||["I",Oc++,"_",(new Date)[oa]()][N]("");while(b[wa](h)&&5>++m);Xa(5>m,"Error creating iframe id");m={};var p={};b[Ea]&&9>b[Ea]&&(m.hostiemode=b[Ea]);T(f.queryParams||{},m);T(f.fragmentParams||{},p);var x=f.connectWithQueryParams?m:p,D=f.pfname,v=R();v.id=h;v.parent=b[B][ra]+"//"+b[B].host;var K=V(b[B][C],"parent"),D=D||"";!D&&K&&(K=V(b[B][C],"id",""),
D=V(b[B][C],"pfname",""),D=K?D+"/"+K:"");v.pfname=D;T(v,x);(v=V(n,"rpctoken")||m.rpctoken||p.rpctoken)||(v=x.rpctoken=f.rpctoken||r(Math.round(1E8*(yc?Hc():Gc()))));f.rpctoken=v;v=b[B][C];x=R();(K=V(v,"_bsh",W.bsh))&&(x._bsh=K);(v=lb(v))&&(x.jsh=v);f.hintInFragment?T(x,p):T(x,m);n=bb(n,m,p,f.paramsSerializer);p=R();T(Mc,p);T(f[ta],p);p.name=p.id=h;p.src=n;f.eurl=n;if((f||{}).allowPost&&2E3<n[I]){m=Za(n);p.src="";p["data-postorigin"]=n;n=Qc(b,c,p,h);-1!=navigator.userAgent[H]("WebKit")&&(g=n.contentWindow.document,
g.open(),p=g[u]("div"),x={},v=h+"_inner",x.name=v,x.src="",x.style="display:none",Qc(b,p,x,v,f));p=(f=m.j[0])?f[A]("&"):[];f=[];for(x=0;x<p[I];x++)v=p[x][A]("=",2),f[F]([ea(v[0]),ea(v[1])]);m.j=[];p=$a(m);m=b[u]("form");m.action=p;m.method="POST";m.target=h;m[qa].display="none";for(h=0;h<f[I];h++)p=b[u]("input"),fa(p,"hidden"),p.name=f[h][0],p.value=f[h][1],m[ga](p);c[ga](m);m.submit();m[M][Aa](m);g&&g.close();g=n}else g=Qc(b,c,p,h,f);e.iframeNode=g;e.id=g[Ba]("id");g=e.id;c=R();c.id=g;c.userParams=
e.userParams;c.url=e.url;fa(c,e[za]);c.state=1;Z[g]=c;g=e}else g=null;g&&((e=g.id)&&d[F](e),Ad(a,g))}},Hd=function(a,b,c){if(a&&1===a.nodeType&&b){if(c)return 1;if(sd[b]){if(kb[a[ya][Ga]()])return(a=a.innerHTML)&&a[t](/^[\s\xa0]+|[\s\xa0]+$/g,"")?0:1}else{if(rd[b])return 0;if(qd[b])return 1}}return null},od=function(a,b){var c=b[za];delete b[za];var d=("string"===typeof a?q[wa](a):a)||void 0;if(d){var e={},f;for(f in b)S(b,f)&&(e[f[Ga]()]=b[f]);e.rd=1;(f=!!e.ri)&&delete e.ri;var g=[];Bd(c,d,e,g,0,
f);Cd(c,g)}else jc("string"==="gapi."+c+".render: missing element "+typeof a?a:"")};Q(U,"platform",{}).go=yd;var zd=function(a){for(var b=["_c","jsl","h"],c=0;c<b[I]&&a;c++)a=a[b[c]];b=lb(Ka[C]);return!a||0!=a[H]("n;")&&0!=b[H]("n;")&&a!==b},Cd=function(a,b){Id(a,b)},gb=function(a){xd(a,!0)},Jd=function(a,b){for(var c=b||[],d=0;d<c[I];++d)a(c[d]);for(d=0;d<c[I];d++)Dd(c[d])};
zb[F](["platform",function(a,b,c){ud=c;b&&td[F](b);Jd(Ed,a);Jd(Fd,c._c.annotation);Jd(Gd,c._c.bimodal);cc();ac();if("explicit"!=Y("parsetags")){mb(a);hc(gc())&&!Y("disableRealtimeCallback")&&lc();var d;c&&(a=c.callback)&&(d=Wa(a),delete c.callback);ib(function(){gb(d)})}}]);U._pl=!0;var Kd=function(a){a=(a=Z[a])?a.oid:void 0;if(a){var b=P[wa](a);b&&b[M][Aa](b);delete Z[a];Kd(a)}};var Ld=/^\{h\:'/,Md=/^!_/,Nd="",Id=function(a,b){function c(){eb("message",d,"remove","de")}function d(d){var g=d.data,h=d.origin;if(Od(g,b)){var l=e;e=!1;l&&vb("rqe");Pd(a,function(){l&&vb("rqd");c();for(var a=Q(W,"RPMQ",[]),b=0;b<a[I];b++)a[b]({data:g,origin:h})})}}if(0!==b[I]){Nd=V(Ka[C],"pfname","");var e=!0;eb("message",d,"add","at");Vb(a,c)}},Od=function(a,b){a=r(a);if(Ld[G](a))return!0;var c=!1;Md[G](a)&&(c=!0,a=a[y](2));if(!/^\{/[G](a))return!1;var d=cd(a);if(!d)return!1;var e=d.f;if(d.s&&
e&&-1!=Na[L](b,e)){if("_renderstart"===d.s||d.s===Nd+"/"+e+"::_renderstart"){var f=d.a&&d.a[c?0:1],c=P[wa](e);nc(e,2);if(f&&c&&f[ja]&&f[ua]){n:{d=c[M];e=f||{};if(kc()){var g=c.id;if(g){f=(f=Z[g])?f.state:void 0;if(1===f||4===f)break n;Kd(g)}}(f=d.nextSibling)&&f[Ba]&&f[Ba]("data-gapistub")&&(d[M][Aa](f),d[qa].cssText="");var f=e[ja],h=e[ua],l=d[qa];l.textIndent="0";l.margin="0";l.padding="0";l.background="transparent";l.borderStyle="none";l.cssFloat="none";l.styleFloat="none";l.lineHeight="normal";
l.fontSize="1px";l.verticalAlign="baseline";d=d[qa];d.display="inline-block";l=c[qa];l.position="static";l.left=0;l.top=0;l.visibility="visible";f&&(d.width=l.width=f+"px");h&&(d.height=l.height=h+"px");e.verticalAlign&&(d.verticalAlign=e.verticalAlign);g&&nc(g,3)}c["data-csi-wdt"]=(new Date)[oa]()}}return!0}return!1},Pd=function(a,b){Vb(a,b)};var Qd=function(a,b){this.B=a;var c=b||{};this.S=c.X;this.A=c.domain;this.C=c.path;this.T=c.Y},Rd=/^[-+/_=.:|%&a-zA-Z0-9@]*$/,Sd=/^[A-Z_][A-Z0-9_]{0,63}$/;
Qd[J].write=function(a,b){if(!Sd[G](this.B))throw"Invalid cookie name";if(!Rd[G](a))throw"Invalid cookie value";var c=this.B+"="+a;this.A&&(c+=";domain="+this.A);this.C&&(c+=";path="+this.C);var d="number"===typeof b?b:this.S;if(0<=d){var e=new Date;e.setSeconds(e.getSeconds()+d);c+=";expires="+e.toUTCString()}this.T&&(c+=";secure");q.cookie=c;return!0};Qd.iterate=function(a){for(var b=q.cookie[A](/;\s*/),c=0;c<b[I];++c){var d=b[c][A]("="),e=d[ha]();a(e,d[N]("="))}};var Td=function(a){this.V=a},Ud={};Td[J].write=function(a){Ud[this.V]=a;return!0};Td.iterate=function(a){for(var b in Ud)Ud.hasOwnProperty(b)&&a(b,Ud[b])};var Vd="https:"===k[B][ra],Wd=Vd||"http:"===k[B][ra]?Qd:Td,Xd=function(a){var b=a[y](1),c="",d=k[B].hostname;if(""!==b){c=da(b,10);if(isNaN(c))return null;b=d[A](".");if(b[I]<c-1)return null;b[I]==c-1&&(d="."+d)}else d="";return{d:"S"==a[la](0),domain:d,i:c}},Yd=function(a){if(0!==a[H]("GCSC"))return null;var b={w:!1};a=a[y](4);if(!a)return b;var c=a[la](0);a=a[y](1);var d=a.lastIndexOf("_");if(-1==d)return b;var e=Xd(a[y](d+1));if(null==e)return b;a=a[Da](0,d);if("_"!==a[la](0))return b;d="E"===
c&&e.d;return!d&&("U"!==c||e.d)||d&&!Vd?b:{w:!0,d:d,W:a[y](1),domain:e.domain,i:e.i}},Zd=function(a){if(!a)return[];a=a[A]("=");return a[1]?a[1][A]("|"):[]},$d=function(a){a=a[A](":");return{t:a[0][A]("=")[1],P:Zd(a[1]),$:Zd(a[2]),Z:Zd(a[3])}},ae=function(){var a,b=null;Wd.iterate(function(c,d){if(0===c[H]("G_AUTHUSER_")){var e=Xd(c[Da](11));if(!a||e.d&&!a.d||e.d==a.d&&e.i>a.i)a=e,b=d}});if(null!==b){var c;Wd.iterate(function(b,d){var e=Yd(b);e&&e.w&&e.d==a.d&&e.i==a.i&&(c=d)});if(c){var d=$d(c),
e=d&&d.P[Number(b)],d=d&&d.t;if(e)return{Q:b,R:e,t:d}}}return null};var be=function(a){this.G=a};be[J].k=0;be[J].F=2;be[J].G=null;be[J].v=!1;be[J].M=function(){this.v||(this.k=0,this.v=!0,this.D())};be[J].D=function(){this.v&&(this.G()?this.k=this.F:this.k=Math.min(2*(this.k||this.F),120),k.setTimeout(Ja(this.D,this),1E3*this.k))};for(var ce=0;64>ce;++ce);var de=null,kc=function(){return W.oa=!0},lc=function(){W.oa=!0;var a=ae();(a=a&&a.Q)&&bc("googleapis.config/sessionIndex",a);de||(de=Q(W,"ss",new be(ee)));a=de;a.M&&a.M()},ee=function(){var a=ae(),b=a&&a.R||null,c=a&&a.t;Vb("auth",{callback:function(){var a=O.gapi.auth,e={client_id:c,session_state:b};a.checkSessionState(e,function(b){var c=e.session_state,h=Y("isLoggedIn");b=Y("debug/forceIm")?!1:c&&b||!c&&!b;if(h=h!=b)bc("isLoggedIn",b),lc(),pd(),b||((b=a.signOut)?b():(b=a.setToken)&&b(null));b=
gc();var l=Y("savedUserState"),c=a._guss(b.cookiepolicy),l=l!=c&&"undefined"!=typeof l;bc("savedUserState",c);(h||l)&&hc(b)&&!Y("disableRealtimeCallback")&&a._pimf(b,!0)})}});return!0};vb("bs0",!0,k.gapi._bs);vb("bs1",!0);delete k.gapi._bs;})();
gapi.load("plusone",{callback:window["gapi_onload"],_c:{"jsl":{"ci":{"llang":"en","client":{"headers":{"response":["Cache-Control","Content-Disposition","Content-Encoding","Content-Language","Content-Length","Content-MD5","Content-Range","Content-Type","Date","ETag","Expires","Last-Modified","Location","Pragma","Range","Server","Transfer-Encoding","WWW-Authenticate","Vary","X-Goog-Safety-Content-Type","X-Goog-Safety-Encoding","X-Goog-Upload-Chunk-Granularity","X-Goog-Upload-Control-URL","X-Goog-Upload-Size-Received","X-Goog-Upload-Status","X-Goog-Upload-URL","X-Goog-Diff-Download-Range","X-Goog-Hash","X-Server-Object-Version","X-Guploader-Customer","X-Guploader-Upload-Result","X-Guploader-Uploadid"],"request":["Accept","Accept-Language","Authorization","Cache-Control","Content-Disposition","Content-Encoding","Content-Language","Content-Length","Content-MD5","Content-Range","Content-Type","Date","GData-Version","Host","If-Match","If-Modified-Since","If-None-Match","If-Unmodified-Since","Origin","OriginToken","Pragma","Range","Slug","Transfer-Encoding","X-ClientDetails","X-GData-Client","X-GData-Key","X-Goog-AuthUser","X-Goog-PageId","X-Goog-Encode-Response-If-Executable","X-Goog-Correlation-Id","X-Goog-Request-Info","X-Goog-Experiments","x-goog-iam-role","x-goog-iam-authorization-token","X-Goog-Spatula","X-Goog-Upload-Command","X-Goog-Upload-Content-Disposition","X-Goog-Upload-Content-Length","X-Goog-Upload-Content-Type","X-Goog-Upload-File-Name","X-Goog-Upload-Offset","X-Goog-Upload-Protocol","X-Goog-Visitor-Id","X-HTTP-Method-Override","X-JavaScript-User-Agent","X-Pan-Versionid","X-Origin","X-Referer","X-Upload-Content-Length","X-Upload-Content-Type","X-Use-HTTP-Status-Code-Override","X-YouTube-VVT","X-YouTube-Page-CL","X-YouTube-Page-Timestamp"]},"rms":"migrated","cors":false},"plus_layer":{"isEnabled":false},"enableMultilogin":true,"disableRealtimeCallback":false,"isLoggedIn":false,"iframes":{"additnow":{"methods":["launchurl"],"url":"https://apis.google.com/additnow/additnow.html?usegapi\u003d1"},"person":{"url":":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"},"visibility":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"},"photocomments":{"url":":socialhost:/:session_prefix:_/widget/render/photocomments?usegapi\u003d1"},"plus_followers":{"params":{"url":""},"url":":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"},"playreview":{"url":"https://play.google.com/store/ereview?usegapi\u003d1"},"signin":{"methods":["onauth"],"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1"},"share":{"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"},"commentcount":{"url":":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"},"page":{"url":":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"},"hangout":{"url":"https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"},"plus_circle":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"},"youtube":{"methods":["scroll","openwindow"],"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1"},"zoomableimage":{"url":"https://ssl.gstatic.com/microscope/embed/"},"card":{"url":":socialhost:/:session_prefix:_/hovercard/card"},"evwidget":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"},"reportabuse":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/reportabuse?usegapi\u003d1"},"follow":{"url":":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"},"shortlists":{"url":""},"plus":{"url":":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"},"configurator":{"url":":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"},":socialhost:":"https://apis.google.com","post":{"params":{"url":""},"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"},"community":{"url":":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"},":gplus_url:":"https://plus.google.com","rbr_s":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"},"autocomplete":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/autocomplete"},"plus_share":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"},":source:":"3p","blogger":{"methods":["scroll","openwindow"],"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1"},"savetowallet":{"url":"https://clients5.google.com/s2w/o/savetowallet"},"rbr_i":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"},"appcirclepicker":{"url":":socialhost:/:session_prefix:_/widget/render/appcirclepicker"},"udc_webconsentflow":{"params":{"url":""},"url":"https://www.google.com/settings/webconsent?usegapi\u003d1"},"savetodrive":{"methods":["save"],"url":"https://drive.google.com/savetodrivebutton?usegapi\u003d1"},":im_socialhost:":"https://plus.googleapis.com","ytshare":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"},":signuphost:":"https://plus.google.com","plusone":{"params":{"count":"","size":"","url":""},"url":":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"},"comments":{"methods":["scroll","openwindow"],"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1"},"ytsubscribe":{"url":"https://www.youtube.com/subscribe_embed?usegapi\u003d1"}},"isPlusUser":false,"debug":{"host":"https://apis.google.com","forceIm":false,"reportExceptionRate":0.05,"rethrowException":false},"enableContextualSignin":false,"enableSigninTooltip":false,"deviceType":"desktop","inline":{"css":1},"lexps":[99,97,79,109,45,17,117,115,81,127,123,122,61,30],"include_granted_scopes":true,"oauth-flow":{"usegapi":false,"disableOpt":true,"authUrl":"https://accounts.google.com/o/oauth2/auth","proxyUrl":"https://accounts.google.com/o/oauth2/postmessageRelay","idpIframeUrl":"https://accounts.google.com/o/oauth2/iframe"},"report":{"apiRate":{"gapi\\.signin\\..*":0.05},"host":"https://apis.google.com","rate":0.001,"apis":["iframes\\..*","gadgets\\..*","gapi\\.appcirclepicker\\..*","gapi\\.auth\\..*","gapi\\.client\\..*"]},"csi":{"rate":0.01},"googleapis.config":{"auth":{"useFirstPartyAuthV2":false}}},"h":"m;/_/scs/apps-static/_/js/k\u003doz.gapi.en_US.4IQMPwYhCMU.O/m\u003d__features__/am\u003dAQ/rt\u003dj/d\u003d1/t\u003dzcms/rs\u003dAGLTcCOvGLFi5QuUpvVu66hJ5k_HC2giKA","u":"https://apis.google.com/js/plusone.js","hee":true,"fp":"b5f1cde1ae162d40df3979609564f712cbc325e7","dpo":false},"platform":["additnow","blogger","comments","commentcount","community","follow","page","person","playreview","plus","plusone","post","reportabuse","savetodrive","savetowallet","shortlists","visibility","youtube","ytsubscribe","zoomableimage","photocomments","hangout","udc_webconsentflow"],"fp":"b5f1cde1ae162d40df3979609564f712cbc325e7","annotation":["interactivepost","recobar","autocomplete","profile"],"bimodal":["signin","share"]}});