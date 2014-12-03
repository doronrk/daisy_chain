//tealium universal tag - utag.9 ut4.0.201411152202, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var s_account="sssamsungnewusdev";var s=s_gi(s_account);var teal_sc_namespace="samsung";var teal_sc_trackingServer="nmetrics.samsung.com";s.dynamicAccountSelection=false;s.dynamicAccountList="";s.trackDownloadLinks=true;s.trackExternalLinks=true;s.trackInlineStats=true;s.linkDownloadFileTypes="zip,exe,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx,dmg";s.linkInternalFilters="redirect.pricespider.com,stgwebus.samsung.com,facebook.com,twitter.com,youtube.com,plus.google.com,samsung.com,link.brightcove.com,brightcove.com,pinterest.com";s.linkLeaveQueryString=false;s.linkTrackVars="None";s.linkTrackEvents="None";s.usePlugins=false;s.currencyCode="USD";if(teal_sc_namespace===""){utag.DB("Error:9: Namespace field is blank. Namespace is required for SiteCatalyst H.27.");s.visitorNamespace=teal_sc_trackingServer.substr(0,teal_sc_trackingServer.indexOf("."));}else{s.visitorNamespace="samsung";}
s.trackingServer="nmetrics.samsung.com";s.trackingServerSecure="smetrics.samsung.com";s.dc=122;var visitor=new Visitor(s.visitorNamespace);visitor.trackingServer=s.trackingServer;visitor.trackingSecureServer=s.trackingServerSecure;function Visitor(k,q){if(!k)throw"Visitor requires Adobe Marketing Cloud Org ID";var a=this;a.version="1.2.2";var g=window;g.s_c_in||(g.s_c_il=[],g.s_c_in=0);a._c="Visitor";a._il=g.s_c_il;a._in=g.s_c_in;a._il[a._in]=a;g.s_c_in++;var o=g.document,i=g.O;i||(i=null);var j=g.P;j||(j=!0);var r=g.N;r||(r=!1);a.C=function(a){var d=0,b,e;if(a)for(b=0;b<a.length;b++)e=a.charCodeAt(b),d=(d<<5)-d+e,d&=d;return d};a.m=function(a){var d="0123456789",b="",e="",f,h=8,g=10,i=10;if(1==a){d+="ABCDEF";for(a=0;16>a;a++)f=Math.floor(Math.random()*h),b+=d.substring(f,f+1),f=Math.floor(Math.random()*h),e+=d.substring(f,f+1),h=16;return b+"-"+e}for(a=0;19>a;a++)f=Math.floor(Math.random()*g),b+=d.substring(f,f+1),g=0==a&&9==f?3:10,f=Math.floor(Math.random()*i),e+=d.substring(f,f+1),i=0==a&&9==f?3:10;return b+e};a.I=function(){var a;!a&&g.location&&(a=g.location.hostname);if(a)if(/^[0-9.]+$/.test(a))a="";else{var d=a.split("."),b=d.length-1,e=b-1;1<b&&2>=d[b].length&&0>",ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,be,bf,bg,bh,bi,bj,bm,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,cl,cm,cn,co,cr,cu,cv,cw,cx,cz,de,dj,dk,dm,do,dz,ec,ee,eg,es,eu,fi,fm,fo,fr,ga,gb,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,im,in,io,iq,ir,is,it,je,jo,jp,kg,ki,km,kn,kp,kr,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,na,nc,ne,nf,ng,nl,no,nr,nu,om,pa,pe,pf,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,rs,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tt,tv,tw,tz,ua,ug,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,yt,".indexOf(","+
d[b]+",")&&e--;if(0<e)for(a="";b>=e;)a=d[b]+(a?".":"")+a,b--}return a};a.cookieRead=function(a){var a=encodeURIComponent(a),d=(";"+o.cookie).split(" ").join(";"),b=d.indexOf(";"+a+"="),e=0>b?b:d.indexOf(";",b+1);return 0>b?"":decodeURIComponent(d.substring(b+2+a.length,0>e?d.length:e))};a.cookieWrite=function(c,d,b){var e=a.cookieLifetime,f,d=""+d,e=e?(""+e).toUpperCase():"";b&&"SESSION"!=e&&"NONE"!=e?(f=""!=d?parseInt(e?e:0):-60)?(b=new Date,b.setTime(b.getTime()+1E3*f)):1==b&&(b=new Date,f=b.getYear(),b.setYear(f+2+(1900>f?1900:0))):b=0;return c&&"NONE"!=e?(o.cookie=encodeURIComponent(c)+"="+encodeURIComponent(d)+"; path=/;"+(b?" expires="+b.toGMTString()+";":"")+(a.l?" domain="+a.l+";":""),a.cookieRead(c)==d):0};a.d=i;a.w=function(a,d){try{"function"==typeof a?a.apply(g,d):a[1].apply(a[0],d)}catch(b){}};a.L=function(c,d){d&&(a.d==i&&(a.d={}),void 0==a.d[c]&&(a.d[c]=[]),a.d[c].push(d))};a.k=function(c,d){if(a.d!=i){var b=a.d[c];if(b)for(;0<b.length;)a.w(b.shift(),d)}};a.g=i;a.J=function(c,d,b){!d&&b&&b();var e=o.getElementsByTagName("HEAD")[0],f=o.createElement("SCRIPT");f.type="text/javascript";f.setAttribute("async","async");f.src=d;e.firstChild?e.insertBefore(f,e.firstChild):e.appendChild(f);b&&(a.g==i&&(a.g={}),a.g[c]=setTimeout(b,a.loadTimeout))};a.H=function(c){a.g!=i&&a.g[c]&&(clearTimeout(a.g[c]),a.g[c]=0)};a.D=r;a.F=r;a.isAllowed=function(){if(!a.D&&(a.D=j,a.cookieRead(a.cookieName)||a.cookieWrite(a.cookieName,"T",1)))a.F=j;return a.F};a.a=i;a.c=i;var t=a.V;t||(t="MC");var l=a.X;l||(l="MCMID");var u=a.W;u||(u="MCCIDH");var v=a.T;v||(v="A");var m=a.Q;m||(m="MCAID");var w=a.U;w||(w="AAM");var p=a.S;p||(p="MCAAMLH");var n=a.R;n||(n="MCAAMB");var s=a.Y;s||(s="NONE");a.t=0;a.B=function(){if(!a.t){var c=a.version;a.customerIDMappingServer&&(c+="|"+a.customerIDMappingServer);a.customerIDMappingServerSecure&&(c+="|"+a.customerIDMappingServerSecure);a.audienceManagerServer&&(c+="|"+a.audienceManagerServer);a.audienceManagerServerSecure&&(c+="|"+a.audienceManagerServerSecure);if(a.audienceManagerCustomerIDDPIDs)for(var d in a.audienceManagerCustomerIDDPIDs)!Object.prototype[d]&&a.audienceManagerCustomerIDDPIDs[d]&&(c+=d+"="+a.audienceManagerCustomerIDDPIDs[d]);a.t=a.C(c)}return a.t};a.G=r;a.i=function(){if(!a.G){a.G=j;var c=a.B(),d=r,b=a.cookieRead(a.cookieName),e,f,h,g=new Date;a.a==i&&(a.a={});if(b&&"T"!=b){b=b.split("|");b[0].match(/^[\-0-9]+$/)&&(parseInt(b[0])!=c&&(d=j),b.shift());1==b.length%2&&b.pop();for(c=0;c<b.length;c+=2)e=b[c].split("-"),f=e[0],h=b[c+1],e=1<e.length?parseInt(e[1]):0,d&&(f==u&&(h=""),0<e&&(e=g.getTime()/1E3-60)),f&&h&&(a.f(f,h,1),0<e&&(a.a["expire"+
f]=e,g.getTime()>=1E3*e&&(a.c||(a.c={}),a.c[f]=j)))}if(!a.b(m)&&(b=a.cookieRead("s_vi")))b=b.split("|"),1<b.length&&0<=b[0].indexOf("v1")&&(h=b[1],c=h.indexOf("["),0<=c&&(h=h.substring(0,c)),h&&h.match(/^[0-9a-fA-F\-]+$/)&&a.f(m,h))}};a.M=function(){var c=a.B(),d,b;for(d in a.a)!Object.prototype[d]&&a.a[d]&&"expire"!=d.substring(0,6)&&(b=a.a[d],c+=(c?"|":"")+d+(a.a["expire"+d]?"-"+a.a["expire"+d]:"")+"|"+b);a.cookieWrite(a.cookieName,c,1)};a.b=function(c,d){return a.a!=i&&(d||!a.c||!a.c[c])?a.a[c]:i};a.f=function(c,d,b){a.a==i&&(a.a={});a.a[c]=d;b||a.M()};a.s=function(c,d){var b=new Date;b.setTime(b.getTime()+1E3*d);a.a==i&&(a.a={});a.a["expire"+c]=Math.floor(b.getTime()/1E3);0>d&&(a.c||(a.c={}),a.c[c]=j)};a.A=function(a){if(a&&("object"==typeof a&&(a=a.d_mid?a.d_mid:a.visitorID?a.visitorID:a.id?a.id:a.uuid?a.uuid:""+a),a&&(a=a.toUpperCase(),"NOTARGET"==a&&(a=s)),!a||a!=s&&!a.match(/^[0-9a-fA-F\-]+$/)))a="";return a};a.o=function(c,d){a.H(c);if(c==t||c==w){if(c==t){var b=a.b(l);b||((b=a.A(d))||(b=a.m()),a.f(l,b));if(!b||b==s)b="";a.k(l,[b])}if("object"==typeof d){b=604800;void 0!=d.id_sync_ttl&&d.id_sync_ttl&&(b=parseInt(d.id_sync_ttl));var e=a.b(p);e||((e=d.d_region)||(e=d.dcs_region),e&&(a.s(p,b),a.f(p,e)));e||(e="");a.k(p,[e]);e=a.b(n);if(d.d_blob||d.blob)(e=d.d_blob)||(e=d.blob),a.s(n,b),a.f(n,e);e||(e="");a.k(n,[e])}}else if(c==v){b=a.b(m);b||(b=a.A(d))&&a.f(m,b);if(!b||b==s)b="";a.k(m,[b])}};a.h=i;a.n=function(c,d,b,e){var f="",h;if(a.isAllowed()&&(a.i(),f=a.b(c),!f&&(c==l?h=t:c==p||c==n?h=w:c==m&&(h=v),h))){if(a.h==i||void 0==a.h[h])a.h==i&&(a.h={}),a.h[h]=j,a.J(h,d,function(){if(!a.b(c)){var b="";c==l&&(b=a.m());a.o(h,b)}});a.L(c,b);return""}if((c==l||c==m)&&f==s)f="";b&&e&&a.w(b,[f]);return f};a._setMarketingCloudFields=function(c){a.i();a.o(t,c)};a.setMarketingCloudVisitorID=function(c){a._setMarketingCloudFields(c)};a.getMarketingCloudVisitorID=function(c,d){return a.isAllowed()?a.n(l,a.q("_setMarketingCloudFields"),c,d):""};a._mapCustomerIDsDone=function(c){c&&"success"==c.status&&a.f(u,a.r)};a.K=function(){a._mapCustomerIDsDone({status:"success"})};a.e={};a.z=r;a.r="";a.setCustomerIDs=function(c){a.e=c;if(a.isAllowed()){a.i();var c=a.b(u),d="",b,e;c||(c=0);for(b in a.e)e=a.e[b],!Object.prototype[b]&&e&&(d+=(d?"|":"")+b+"|"+e);a.r=a.C(d);a.r!=c&&(a.z=j,a.K())}};a.getCustomerIDs=function(){return a.e};a._setAnalyticsFields=function(c){a.i();a.o(v,c)};a.setAnalyticsVisitorID=function(c){a._setAnalyticsFields(c)};a.getAnalyticsVisitorID=function(c,d){if(a.isAllowed()){var b=a.getMarketingCloudVisitorID(function(){a.getAnalyticsVisitorID(c,j)});if(b){var e=a.trackingServer,f="";a.loadSSL&&a.trackingServerSecure&&(e=a.trackingServerSecure);e&&(f="http"+(a.loadSSL?"s":"")+"://"+e+"/id?mid="+b+"&callback=s_c_il%5B"+a._in+"%5D._setAnalyticsFields");return a.n(m,f,c,d)}}return""};a._setAudienceManagerFields=function(c){a.i();a.o(w,c)};a.q=function(c){var d=a.audienceManagerServer,b="",e=a.b(l),f=a.b(n,j),h="",g,i;a.loadSSL&&a.audienceManagerServerSecure&&(d=a.audienceManagerServerSecure);if(d){if(a.e&&a.audienceManagerCustomerIDDPIDs)for(g in a.e)Object.prototype[g]||(b=a.e[g],i=a.audienceManagerCustomerIDDPIDs[g],b&&i&&(h+=(h?"%01":"&d_cid=")+i+"%01"+encodeURIComponent(b)));c||(c="_setAudienceManagerFields");b="http"+(a.loadSSL?"s":"")+"://"+d+"/id?d_rtbd=json&d_ver=2&d_orgid="+encodeURIComponent(a.marketingCloudOrgID)+(e?"&d_mid="+e:"")+(f?"&d_blob="+encodeURIComponent(f):"")+h+"&d_cb=s_c_il%5B"+a._in+"%5D."+c}return b};a.getAudienceManagerLocationHint=function(c,d){return a.isAllowed()&&a.getMarketingCloudVisitorID(function(){a.getAudienceManagerLocationHint(c,j)})?a.n(p,a.q(),c,d):""};a.getAudienceManagerBlob=function(c,d){if(a.isAllowed()&&a.getMarketingCloudVisitorID(function(){a.getAudienceManagerBlob(c,j)})){var b=a.q();a.z&&a.s(n,-1);return a.n(n,b,c,d)}return""};a.j="";a.p={};a.u="";a.v={};a.getSupplementalDataID=function(c,d){!a.j&&!d&&(a.j=a.m(1));var b=a.j;a.u&&!a.v[c]?(b=a.u,a.v[c]=j):b&&(a.p[c]&&(a.u=a.j,a.v=a.p,a.j=b=!d?a.m(1):"",a.p={}),b&&(a.p[c]=j));return b};0>k.indexOf("@")&&(k+="@AdobeOrg");a.marketingCloudOrgID=k;a.namespace=q;a.cookieName="AMCV_"+k;a.l=a.I();a.l==g.location.hostname&&(a.l="");if(q){var x="AMCV_"+q,z=a.cookieRead(a.cookieName),y=a.cookieRead(x);!z&&y&&(a.cookieWrite(a.cookieName,y,1),a.cookieWrite(x,"",-60))}a.loadSSL=0<=g.location.protocol.toLowerCase().indexOf("https");a.loadTimeout=500;a.marketingCloudServer=a.audienceManagerServer="dpm.demdex.net";a.customerIDMappingServer="map.adobecrs.com"}
Visitor.getInstance=function(k,q){var a,g=window.s_c_il,o;0>k.indexOf("@")&&(k+="@AdobeOrg");if(g)for(o=0;o<g.length;o++)if((a=g[o])&&"Visitor"==a._c&&(a.marketingCloudOrgID==k||q&&a.namespace==q))return a;return new Visitor(k,q)};var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.27';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\\\"
+"\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return "
+"y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;retur"
+"n 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent(x)"
+";for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.subs"
+"tring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+',"
+"'%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+"
+"x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescap"
+"e(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z"
+"+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,"
+"2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f"
+");return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visibi"
+"litychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){while("
+"s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s"
+".sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.link"
+"Type=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,"
+"n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.'"
+",'c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?"
+"c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60)"
+";if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');"
+"return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l"
+"[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf="
+"new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.w"
+"d,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;r"
+"eturn true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s."
+"tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for("
+"n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingS"
+"erverBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLower"
+"Case();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.versio"
+"n+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!"
+"s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r"
+";return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[im"
+"n];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s."
+"nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s"
+"_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.g"
+"etTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v"
+"]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l="
+"0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='http"
+"s://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',"
+"p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c"
+";else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData"
+"\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nf"
+"n=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk"
+"=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLig"
+"htData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp"
+"=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return q"
+"s};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe="
+"s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if("
+"fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||"
+"fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';el"
+"se if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocationHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='pageURL')"
+"{q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigration"
+"Key')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}e"
+"lse if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='coo"
+"kieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='r"
+"esolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='bro"
+"wserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';"
+"else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q="
+"'mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k]"
+",fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'"
+"?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0"
+",qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h"
+"){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h"
+"))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';"
+"return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.di"
+"spatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s."
+"_in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForc"
+"edLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target"
+";while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0"
+";t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}c"
+"atch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,"
+"e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePr"
+"opagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||("
+"j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!"
+"='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():"
+"'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;i"
+"f(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",'')"
+",\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o."
+"s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>"
+"=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);"
+"return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){va"
+"r s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if("
+"x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+="
+"(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s"
+".d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s."
+"apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n"
+".userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s"
+".wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n)"
+"{if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&"
+"&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i"
+";s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un"
+".substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,"
+"a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._i"
+"l;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}e"
+"lse if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g"
+"=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'"
+"+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=f"
+"unction(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m["
+"t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s"
+".m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h"
+"?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){i"
+"f(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\""
+"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c',"
+"'i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChi"
+"ld(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.l"
+"ength&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k"
+"==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!'+"
+"k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}el"
+"se f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime"
+"();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketing"
+"CloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloudVisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrackC"
+"heck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID = false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analyticsV"
+"isitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._aud"
+"ienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s.audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;s."
+"_callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWaitingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s.a"
+"udienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.vis"
+"itor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisitorID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s.marketingCloudVisitorID = visit"
+"or.getMarketingCloudVisitorID([s,s._marketingCloudVisitorIDCallback]);if (!s.marketingCloudVisitorID) {s._waitingForMarketingCloudVisitorID = true;}}if ((!s._waitingForAnalyticsVisitorID) && (!s.an"
+"alyticsVisitorID) && (visitor.getAnalyticsVisitorID)) {s.analyticsVisitorID = visitor.getAnalyticsVisitorID([s,s._analyticsVisitorIDCallback]);if (!s.analyticsVisitorID) {s._waitingForAnalyticsVisi"
+"torID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (visitor.getAudienceManagerLocationHint)) {s.audienceManagerLocationHint = visitor.getAudienceM"
+"anagerLocationHint([s,s._audienceManagerLocationHintCallback]);if (!s.audienceManagerLocationHint) {s._waitingForAudienceManagerLocationHint = true;}}if ((!s._waitingForAudienceManagerBlob) && (!s."
+"audienceManagerBlob) && (visitor.getAudienceManagerBlob)) {s.audienceManagerBlob = visitor.getAudienceManagerBlob([s,s._audienceManagerBlobCallback]);if (!s.audienceManagerBlob) {s._waitingForAudie"
+"nceManagerBlob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarketingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)     "
+"     && (!s._doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingForAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceM"
+"anagerLocationHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceManagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._"
+"callbackWhenReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToTrack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo."
+"callbackThis = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;if (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWh"
+"enReadyToTrackQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWhenReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReady"
+"ToTrackCheck=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack()) {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._"
+"callbackWhenReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._callbackWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();cal"
+"lbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrack=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = "
+"null;if (!s.isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {};for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}se"
+"tVariables = {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s.callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this"
+",d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math."
+"random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTr"
+"ack,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+"
+"'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if ((!s.supplement"
+"alDataID) && (s.visitor) && (s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}if(s.m"
+"pc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,"
+"o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.isma"
+"c&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j"
+"='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.ja"
+"vaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>="
+"5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\""
+"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)"
+"while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s."
+"browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if("
+"s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');"
+"if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot"
+"(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);"
+"i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');"
+"s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttrib"
+"ute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.index"
+"Of('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'"
+"||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc"
+"){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')"
+"+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?q"
+"s:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.pageURLRest=s."
+"lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){"
+"var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s."
+"setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t."
+"lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!="
+"'function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f"
+"].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElements"
+"ByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.in"
+"dexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.ap"
+"v=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);"
+"s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='suppleme"
+"ntalDataID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServer"
+"Secure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,"
+"deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,"
+"lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,linkName,linkType';var n;for(n=1;n"
+"<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resol"
+"ution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackin"
+"gServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMa"
+"tch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTra"
+"ckVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function("
+"un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()
try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1,'link':1,'video':1};u.o=s;u.varlist={pageName:'pageName',channel:'ch',campaign:'v0',hier1:'h1',hier2:'h2',hier3:'h3',hier4:'h4'};for(var i=1;i<76;i++){u.varlist['prop'+i]='c'+i;u.varlist['eVar'+i]='v'+i};u.pushlt=function(l,v){if(typeof l!="undefined")l.push(v)};u.map={"page_name":"pageName","ss_url_noparams":"prop13,hier2","ss_url":"prop14","site_country":"prop2,eVar2","_pathname2":"prop3,eVar3","_pathname3":"prop4,eVar4","_pathname4":"prop5,eVar5","site_search_term":"prop6,eVar6","site_search_results":"prop7","search_category":"prop8,eVar8","search_category:general":"event5","search_category:predictive":"event5","search_category:predictive>recommended":"event5,event5","search_category:predictive>general":"event5","search_category:accessory":"event53","search_category:category":"event73","search_category:accessory comaptibility":"event80","search_category:support":"event1","site_search_null":"prop9","page_channel":"channel","site_language":"prop1,eVar1","loggedin_status":"prop25","division":"prop30,eVar54","page_type":"prop22,eVar52","page_type:product detail":"event2,prodView","page_type:product accessories":"prodView,event2,event84","page_type:product page":"prodView","page_type:product review":"prodView,event2,event16,event81","support_search_null":"prop12","order_id":"purchase,prop69","support_tab":"prop68","download_category":"prop32","revenue_source":"eVar32","support_sections":"prop27","support_sections:support product detail":"event34","support_sections:faq":"event44","support_sections:how to guide":"event74","support_sections:trouble-shooting":"event75","product_bundle":"eVar12","out_of_stock_status":"eVar57","billing_li_state":"prop48","products_registered":"eVar18","support_product_type":"eVar14","support_page_name":"prop28,eVar13","support_product_subtype":"eVar15","support_howto":"eVar16","app_name":"eVar42","faq_title":"prop67","foresee_respondent":"prop41,eVar37","foresee_survey":"prop40,eVar36","category_view":"prop26,eVar53","results_per_page":"prop49","product_rollup":"prop43,eVar51","campaign_internal":"eVar7,prop62","campaign_external":"prop23","link_tax_1":"prop15,eVar9","link_tax_2":"prop16,eVar10","link_tax_3":"prop17,eVar11","site_search_result_position":"prop18","modules":"prop19","sorted_modules":"prop20","sort_option":"prop21","module_content":"prop29","download_file":"prop31","time_parting":"prop39,eVar41","responsive_design_mode":"prop55,eVar49","e_social_click":"event15","social_click_type":"eVar33","link_cat:add to cart":"scAdd","link_cat:find product":"event21","link_cat:social share":"event15","link_cat:compare init":"event3","link_cat:see all":"event18","link_cat:3rd party site":"event10","link_cat:feature link":"event82","link_cat:specs link":"event83","link_cat:support link":"event34","link_cat:video":"event9","link_cat:faq link":"event44","link_cat:accessories link":"84,event84","link_cat:compare complete":"event48","link_cat:register product":"event47","link_cat:download link":"event4","link_cat:download specs":"event4","link_cat:download manual":"event4","link_cat:cart click":"event42","link_cat:features link":"event82","link_cat:see specs":"event83","link_cat:video play":"event9","link_cat:product learn more":"event22","link_cat:see all compatible products":"event18","link_cat:first write review":"event60","link_cat:social follow":"event15","link_cat:pre order":"scAdd,event72","link_cat:live chat":"event55","link_cat:login myaccount":"event39","link_cat:myaccount registerprod_submit":"event40","link_cat:create acct submit":"event41","link_cat:create account":"event41","link_cat:service_request_complete":"event77","link_cat:b2b sales form submit":"event59","link_cat:have questions":"event58","link_cat:sales inquiry initiated":"event58","link_cat:b2b newsletter signup":"event68","link_cat:b2b more":"event11","link_cat:email_form_submit":"event46","link_cat:support search":"event1","link_cat:successful form submit":"event17","link_cat:contact us":"event17","searchpage_click_type":"prop70","e_cart_mouseover":"event42","link_type:download link":"event4","link_name:service request":"event76","link_name:compare start":"event3","link_name:video play":"event9,event9","link_name:shop now":"event20","link_name:bazaarvoice review started":"event60","link_name:Request Service":"event76","link_name:request service":"event76","e_aa_answer_source":"event65","product_model_code":"eVar38","troubleshooting_topic":"eVar35","video_name":"eVar22","support_search_term":"eVar34","site_predictive_search_term":"eVar19","search_counter":"eVar23","buy_online_retailer":"eVar27","search_page_click_type":"prop70","pageview_event":"event16","sc_pagename":"eVar17","survey_name":"prop40,eVar36","survey_response_id":"prop41,eVar37","fs_survey_complete":"event36","home_page_viewed":"prop75","filter_state":"eVar55","filter_click":"event73","page_breadcrumb":"hier2","page_section_viewed":"prop75","search_term":"prop6,eVar6","order_flow:mobile accessories":"event69","product_subcategory_s":"eVar29","product_category_s":"eVar28","sc_reporting_suite":"s_account","video_link_data":"eVar22","marketplace_product_name":"eVar30,eVar39","email_form_submit":"event46","marketplace_model_code":"eVar38","percent_page_view_formatted":"prop54","error_page":"pageType","link_searchTerm":"eVar34","download_filename":"prop31","download_type":"prop32,eVar43","link_carrier":"prop56","product_name":"eVar30","page_category:authorized partner thank you":"event59","percent_page_view_page":"prop53","service_loc_results":"prop42","cart_theme":"prop75","dr_page_name":"pageName","dr_page_name:ecom crosssell_upsell":"event19","dr_page_name:ecom step1|cart":"scOpen,scView","dr_page_name:ecom|login":"event7","dr_page_name:ecom step 2|billing":"scCheckout","dr_page_name:ecom step 3|review order":"event97","stock_list":"list1","_event61":"PRODUCTS_event61","_event99":"PRODUCTS_event99","_event100":"PRODUCTS_event100","support_search_counter":"eVar56"};u.extend=[function(a,b){if(typeof b.link_position=='undefined'){b.link_position="";}},function(a,b){if(typeof b['link_id']!='undefined'){try{b['link_tax_1']=b.link_name||b.link_id||"";}catch(e){};try{b['link_tax_2']=(window.keep_pn||(location.protocol+"//"+location.host+location.pathname))+">"+b.link_tax_1;}catch(e){};try{b['link_tax_3']=(window.keep_pn||(location.protocol+"//"+location.host+location.pathname))+">"+b.link_position+">"+b.link_tax_1;}catch(e){}}},function(a,b){if((!b.link_obj["link_id"]&&!b.link_id)&&b.link_flag=="true"){return false;}},function(a,b){if((typeof b['link_cat']!='undefined'&&b['link_cat'].toString().toLowerCase().indexOf('download'.toLowerCase())>-1)){b['link_type']='d'}},function(a,b){if(typeof b['dr_page_name']=='undefined'){try{b['page_name']=b.ss_url_noparams;}catch(e){}}},function(a,b){if(b.page_name){window.keep_pn=b.page_name}},function(a,b){if(b['page_type'].toString().indexOf('404')>-1){b['error_page']='errorPage'}},function(a,b){if(typeof b['support_product_type']!='undefined'){b['support_page_name']=b['page_name']}},function(a,b){s.partnerDFACheck=new Function("c","src","p",""
+"var s=this,dl=',',cr,nc,q,g,i,j,k,fnd,v=1,t=new Date,cn=0,ca=new Ar"
+"ray,aa=new Array,cs=new Array;t.setTime(t.getTime()+1800000);cr=s.c"
+"_r(c);if(cr){v=0;}ca=s.split(cr,dl);aa=s.split(s.un,dl);for(i=0;i<a"
+"a.length;i++){fnd=0;for(j=0;j<ca.length;j++){if(aa[i]==ca[j]){fnd=1"
+";}}if(!fnd){cs[cn]=aa[i];cn++;}}if(cs.length){for(k=0;k<cs.length;k"
+"++){nc=(nc?nc+dl:'')+cs[k];}cr=(cr?cr+dl:'')+nc;s.vpr(p,nc);v=1;}q="
+"s.wd.location.search.toLowerCase();q=s.repl(q,'?','&');g=q.indexOf("
+"'&'+src.toLowerCase()+'=');if(g>-1){s.vpr(p,cr);v=1;}if(!s.c_w(c,cr"
+",t)){s.c_w(c,cr,0);}if(!s.c_r(c)){v=0;}return v>=1;");s.getFullReferringDomains=new Function(""
+"var s=this,dr=window.document.referrer,n=s.linkInternalFilters.spli"
+"t(',');if(dr){var r=dr.split('/')[2],l=n.length;for(i=0;i<=l;i++){i"
+"f(r.indexOf(n[i])!=-1){r='';i=l+1;}}return r}");s.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
+"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
+"n 'Repeat';");s.facebookSocialRefferrers=new Function("c",""
+"var s=this,g,i,j,m,v,d,x,J,n=new Date;n.setTime(n.getTime()+1800000"
+");c=c?c:'s_fbsr';if(s.c_r(c)){J=0}if(!s.c_w(c,1,n)){s.c_w(c,1,0)}if"
+"(!s.c_r(c)){J=0}x=g=s.referrer?s.referrer:document.referrer;if(J==0"
+"){g=g.toLowerCase();if(g){z=g.indexOf('?');i=z>-1?z:g.length;j=g.su"
+"bstring(0,i);v=j.indexOf('facebook.com')>-1?1:'';if(v){f=s.getQuery"
+"Param('u','',g);if(f){d=s.linkInternalFilters.toLowerCase();d=s.spl"
+"it(d,',');b=d.length;for(c=0;c<b;c++){m=f.indexOf(d[c])>-1?1:'';if("
+"m)x=d[1];}}}}}return x");s.omnitureReviews=new Function("p","owr",""
+"var list='type,client,landing,product,link';"
+"s=this,qs='bv';prm=s.getQueryParam(qs);if(typeof(omnitureReview"
+")=='undefined'&&prm!='')omnitureReview=new Object();if(prm!=''){var"
+" bar=s.split(prm,'-_-');var z=0;while(list){i=list.indexOf(',');i=i"
+"<0?list.length:i;d=list.substring(0,i);if(d)omnitureReview[d]=bar[z"
+"];z++;list=list.substring(i==list.length?i:i+1)}}if(typeof(omniture"
+"Review)!='undefined'){var po=omnitureReview;if(!owr||(owr&&po.revie"
+"wsFound)){var vs='',i,j,pv,ajc=po.ajaxCatch,nltv='';while(p){i=p.in"
+"dexOf(',');i=i<0?p.length:i;d=p.substring(0,i);if(d){j=p.indexOf(':"
+"');if(j>0){pv=d.substring(0,j);d=d.substring(j==d.length?j:j+1);whi"
+"le(d){j=d.indexOf('|');j=j<0?d.length:j;vs=d.substring(0,j);if(pv.i"
+"ndexOf('|')>0){var fl,pz='';ptm=pv;while(ptm){k=ptm.indexOf('|');k="
+"k<0?ptm.length:k;pv=ptm.substring(0,k);ptm=ptm.substring(k==ptm.len"
+"gth?k:k+1);dl=fl?'|':'';if(!('undefined'==typeof(po[pv]))){pz=pz+dl"
+"+po[pv];fl=1;}}s.vpr(vs,pz);if(ajc)nltv+=vs+','}else s.vpr(vs,('und"
+"efined'==typeof(po[pv]))?'':po[pv]);if(ajc)nltv+=vs+',';d=d.substri"
+"ng(j==d.length?j:j+1)}}}p=p.substring(i==p.length?i:i+1)}if(ajc)s.l"
+"inkTrackVars=nltv}}");s.vpr=new Function("vs","v","var s=this,k=vs.substring(0,2)=='s_'?vs.substring(2):vs;s['vpv_'+k]="
+"v;s['vpm_'+k]=1");s.dt=new Function("tz","t","var d=new Date;if(t)d.setTime(t);d=new Date(d.getTime()+(d.getTimezo"
+"neOffset()*60*1000));return new Date(Math.floor(d.getTime()+(tz*60*"
+"60*1000)))");s.vh_gt=new Function("k","v","var s=this,vh='|'+s.c_r('s_vh_'+k),vi=vh.indexOf('|'+v+'='),ti=vi<0?"
+"vi:vi+2+v.length,pi=vh.indexOf('|',ti),t=ti<0?'':vh.substring(ti,pi"
+"<0?vh.length:pi);return t");s.vh_gl=new Function("k","var s=this,vh=s.c_r('s_vh_'+k),e=vh?vh.indexOf('='):0;return vh?(vh."
+"substring(0,e?e:vh.length)):''");s.vh_s=new Function("k","v","if(k&&v){var s=this,e=new Date,st=e.getTime(),y=e.getYear(),c='s_vh_"
+"'+k,vh='|'+s.c_r(c)+'|',t=s.vh_gt(k,v);e.setYear((y<1900?y+1900:y)+"
+"5);if(t)vh=s.rep(vh,'|'+v+'='+t+'|','|');if(vh.substring(0,1)=='|')"
+"vh=vh.substring(1);if(vh.substring(vh.length-1,vh.length)=='|')vh=v"
+"h.substring(0,vh.length-1);vh=v+'=[PCC]'+(vh?'|'+vh:'');s.c_w(c,vh,"
+"e);if(s.vh_gt(k,v)!='[PCC]')return 0;vh=s.rep(vh,'[PCC]',st);s.c_w("
+"c,vh,e)}return 1");s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"escp(v)}return ''");s.channelManager=new Function("a","b","c","d","e","f",""
+"var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
+"X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("
+"e))v=0;if(!s.c_w(e,1,n))s.c_w(e,1,0);if(!s.c_r(e))v=0;}g=s.referrer"
+"?s.referrer:document.referrer;g=g.toLowerCase();if(!g)h=1;i=g.index"
+"Of('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkInter"
+"nalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<l;m+"
+"+){B=j.indexOf(k[m])==-1?'':g;if(B)O=B;}if(!O&&!h){p=g;U=g.indexOf("
+"'//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q,r)"
+";t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSearchE"
+"ngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g=s."
+"repl(g,'as_q','*');}A=s.split(S,'>');T=A.length;for(i=0;i<A.length;"
+"i++){D=A[i];D=s.split(D,'|');E=s.split(D[0],',');for(G=0;G<E.length"
+";G++){H=j.indexOf(E[G]);if(H>-1){if(D[2])N=u=D[2];else N=t;if(d==1)"
+"{N=s.repl(N,'#',' - ');g=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo'"
+");N=s.repl(N,'%','oogle');}i=s.split(D[1],',');for(k=0;k<i.length;k"
+"++){M=s.getQueryParam(i[k],'',g).toLowerCase();if(M)break;}}}}}if(!"
+"O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M)P='Paid Search';el"
+"se P='Paid Non-Search';}if(!O&&N){u=N;P='Natural Search'}}if(h==1&&"
+"!O&&v==1)u=P=t=p='Direct Load';X=M+u+t;c=c?c:'c_m';if(c!='0'){X=s.g"
+"etValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.split(g,'>');l=k."
+"length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r"
+".length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=j.indexOf(Y);if"
+"(i>-1)P=q[0];}}}g=s._channelParameter;if(g&&X){k=s.split(g,'>');l=k"
+".length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S="
+"r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if(U)P=q[0]}}}g=s"
+"._channelPattern;if(g&&X){k=s.split(g,'>');l=k.length;for(m=0;m<l;m"
+"++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;"
+"T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i.indexOf(Y);if(H"
+"==0)P=q[0];}}}if(X)M=M?M:N?'Keyword Unavailable':'n/a';p=X&&p?p:'';"
+"t=X&&t?t:'';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?"
+"P:'';s._referrer=p;s._referringDomain=t;s._partner=N;s._campaignID="
+"O;s._campaign=u;s._keywords=M;s._channel=P;");s.getPercentPageViewed=new Function("",""
+"var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var"
+" v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");s.getPPVCalc=new Function("",""
+"var dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement."
+"scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.of"
+"fsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clie"
+"ntHeight)),vph=s.d.clientHeight||Math.min(s.d.documentElement.clien"
+"tHeight,s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document."
+"documentElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph,"
+"pv=Math.round(vh/dh*100),cv=s.c_r('s_ppv'),cpi=cv.indexOf('|'),cpv="
+"'',ps='';if(cpi!=-1){cpv=cv.substring(0,cpi);ps=parseInt(cv.substri"
+"ng(cpi+1));}else{cpv=ps=0;}if(pv<=100){if(pv>parseInt(cpv)){ps=pv-M"
+"ath.round(vph/dh*100);s.c_w('s_ppv',pv+'|'+ps);}}else{s.c_w('s_ppv'"
+",'');}");s.getPPVSetup=new Function("",""
+"var s=this;if(s.wd.addEventListener){s.wd.addEventListener('load',s"
+".getPPVCalc,false);s.wd.addEventListener('scroll',s.getPPVCalc,fals"
+"e);s.wd.addEventListener('resize',s.getPPVCalc,false);}else if(s.wd"
+".attachEvent){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEv"
+"ent('onscroll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCa"
+"lc);}");s.getPPVSetup();s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");s.visitorNamespace="samsung"
s.trackingServer="nmetrics.samsung.com";s.trackingServerSecure="smetrics.samsung.com";s.m_Media_c="='s_media_'+m._in+'_~=new Function(~m.ae(mn,l,\"'+p+'\",~;`H~o.'+f~o.Get~=function(~){var m=this~}^9 p');p=tcf(o)~setTimeout(~x,x!=2?p:-1,o)}~=parseInt(~m.s.d.getElementsByTagName~ersion"
+"Info~'`z_c_il['+m._in+'],~'o','var e,p=~QuickTime~if(~}catch(e){p=~s.wd.addEventListener~m.s.rep(~=new Object~layState~||^D~m.s.wd[f1]~Media~.name~Player '+~s.wd.attachEvent~'a','b',c~;o[f1]~tm.get"
+"Time()/1~m.s.isie~.current~,tm=new Date,~p<p2||p-p2>5)~m.e(n,1,o^F~m.close~i.lx~=v+',n,~){this.e(n,~MovieName()~);o[f~i.lo~m.ol~o.controls~load',m.as~==3)~script';x.~,t;try{t=~Version()~else~o.id~)"
+"{mn=~1;o[f7]=~Position~);m.~(x==~)};m.~&&m.l~l[n])~var m=s~!p){tcf~xc=m.s.~Title()~();~7+'~)}};m.a~\"'+v+';~3,p,o);~5000~return~i.lt~';c2='~Change~n==~',f~);i.~==1)~{p='~4+'=n;~()/t;p~.'+n)}~~`z.m_"
+"i('`P'`uopen`6n,l,p,b`7,i`L`Ya='',x;l`Bl)`3!l)l=1`3n&&p){`H!m.l)m.l`L;n=`Km.s.rep(`Kn,\"\\n\",''),\"\\r\",''),'--**--','')`3m.`y`b(n)`3b&&b.id)a=b.id;for (x in m.l)`Hm.l[x]`x[x].a==a)`b(m.l[x].n^Fn"
+"=n;i.l=l;i.p=p;i.a=a;i.t=0;i.s`B`V000);`c=0;^A=0;`h=0;i.e='';m.l[n]=i}};`b`6n`e0,-1`wplay`6n,o`7,i;i=`am`1`Ei`3m.l){i=m.l[\"'+`Ki.n,'\"','\\\\\"')+'\"]`3i){`H`c^Gm.e(i.n,3,-1^Fmt=`9i.m,^8)}}'^Fm(`w"
+"stop`6n,o`e2,o`we`6n,x,o`7,i=n`x&&m.l[n]?m.l[n]:0`Yts`B`V000),d='--**--'`3i){if `v3||(x!=`c&&(x!=2||`c^G)) {`Hx){`Ho<0&&^A>0){o=(ts-^A)+`h;o=o<i.l?o:i.l-1}o`Bo)`3`v2||x`l&&`h<o)i.t+=o-`h`3x!=3){i.e"
+"+=`v1?'S':'E')+o;`c=x;}`p `H`c!=1)`alt=ts;`h=o;m.s.pe='media';m.s.pev3=i.n+d+i.l+d+i.p+d+i.t+d+i.s+d+i.e+`v3?'E'+o:''`us.t(0,'`P^K`p{m.e(n,2,-1`ul[n]=0;m.s.fbr('`P^K}}^9 i};m.ae`6n,l,p,x,o,b){`Hn&&"
+"p`7`3!m.l||!m.`ym.open(n,l,p,b`ue(n,x,o^5`6o,t`7,i=`q?`q:o`Q,n=o`Q,p=0,v,c,c1,c2,^1h,x,e,f1,f2`0oc^E3`0t^E4`0s^E5`0l^E6`0m^E7`0c',tcf,w`3!i){`H!m.c)m.c=0;i`0'+m.c;m.c++}`H!`q)`q=i`3!o`Q)o`Q=n=i`3!`"
+"i)`i`L`3`i[i])^9;`i[i]=o`3!xc)^1b;tcf`1`F0;try{`Ho.v`D&&o`X`P&&`j)p=1`I0`8`3^0`1`F0`n`5`G`o`3t)p=2`I0`8`3^0`1`F0`n`5V`D()`3t)p=3`I0`8}}v=\"`z_c_il[\"+m._in+\"],o=`i['\"+i+\"']\"`3p^G^HWindows `P `R"
+"o.v`D;c1`dp,l,x=-1,cm,c,mn`3o){cm=o`X`P;c=`j`3cm&&c`rcm`Q?cm`Q:c.URL;l=cm.duration;p=c`X`t;n=o.p`M`3n){`H^D8)x=0`3n`lx=1`3^D1`N2`N4`N5`N6)x=2;}^B`Hx>=0)`2`A}';c=c1+c2`3`W&&xc){x=m.s.d.createElement"
+"('script');x.language='j`mtype='text/java`mhtmlFor=i;x.event='P`M^C(NewState)';x.defer=true;x.text=c;xc.appendChild(x`g6]`1c1+'`Hn`l{x=3;'+c2+'}`9`46+',^8)'`g6]()}}`Hp==2)^H`G `R(`5Is`GRegistered()"
+"?'Pro ':'')+`5`G`o;f1=f2;c`dx,t,l,p,p2,mn`3o`r`5`f?`5`f:`5URL^3n=`5Rate^3t=`5TimeScale^3l=`5Duration^J=`5Time^J2=`45+'`3n!=`44+'||`Z{x=2`3n!=0)x=1;`p `Hp>=l)x=0`3`Z`22,p2,o);`2`A`Hn>0&&`4^4>=10){`2"
+"^7`4^4=0}`4^4++;`4^I`45+'=p;`9^6`42+'(0,0)\",500)}'`U`1`T`g4]=-`s0`U(0,0)}`Hp`l^HReal`R`5V`D^3f1=n+'_OnP`M^C';c1`dx=-1,l,p,mn`3o`r`5^2?`5^2:`5Source^3n=`5P`M^3l=`5Length()/1000;p=`5`t()/1000`3n!=`4"
+"4+'){`Hn`lx=1`3^D0`N2`N4`N5)x=2`3^D0&&(p>=l||p==0))x=0`3x>=0)`2`A`H^D3&&(`4^4>=10||!`43+')){`2^7`4^4=0}`4^4++;`4^I^B`H`42+')`42+'(o,n)}'`3`O)o[f2]=`O;`O`1`T1+c2)`U`1`T1+'`9^6`41+'(0,0)\",`43+'?500:"
+"^8);'+c2`g4]=-1`3`W)o[f3]=`s0`U(0,0^5s`1'e',`El,n`3m.autoTrack&&`C){l=`C(`W?\"OBJECT\":\"EMBED\")`3l)for(n=0;n<l.length;n++)m.a(`y;}')`3`S)`S('on`k);`p `H`J)`J('`k,false)";s.m_i("Media");s.m_Integrate_c="var m=s.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!s.wd[o])s.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p.get"
+"=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m.l[i]"
+"];if(p&&!p.disable&&p[f]){if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=function"
+"(p,u){var m=this,s=m.s,x,v,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(s.ssl)u=s.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*1000000000000"
+"0):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;for(x in p)if(x&&x.substring(0,1)!='_'&&(!Object||!Object.prototype||!Object.prototype[x])){v=''+p[x];if(v==p[x]||parseFloat(v)==p[x])u="
+"s.rep(u,'['+x+']',s.rep(escape(v),'+','%2B'))}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule("
+"'Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<"
+"m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d["
+"x];p._d--}};m.beacon=function(u){var p=this,m=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){p._c++;i"
+"m=s.wd[imn]=new Image;im.src=m._fu(p,u)}};m.script=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";s.m_i("Integrate");s.escp=new Function("x","var s=this;if(typeof(encodeURIComponent)=='function'&&x)return encodeURIComponent(s.rep(''+x,'+',' '));else return escape(s.rep(''+x,'+',' '));");s.unescp=new Function("x","var s=this;if(typeof(decodeURIComponent)=='function'&&x)return decodeURIComponent(s.rep(''+x,'+',' '));else return unescape(s.rep(''+x,'+',' '));");s.checkCartEvents=function(cookieName,days,reset){var q=function(name,value,seconds){var d=new Date();if(seconds)
d.setTime(d.getTime()+(seconds*1000));document.cookie=name+"="+value+";path=/;domain=;expires="+d.toGMTString();};var r=function(name){var pairs=document.cookie.split(";");for(var i=0;i<pairs.length;i++){var pair=pairs[i].split("=");if(name==pair[0].trim())
return unescape(pair[1]);}
return"";};var e=function(v){if(typeof v=="string"&&v)
return false;else if(typeof v=="number"&&v)
return false;else{for(var p in v){if(v.hasOwnProperty(p)){return false;}}}
return true;};var fireAdd=function(arr){s.events=!s.events?"scAdd":s.events+",scAdd";q(cookieName,arr.join(","),days*60*60);};var fireRemove=function(arr){s.events=!s.events?"scRemove":s.events+",scRemove";q(cookieName,arr.join(","),days*60*60);};if(!reset){var ids=[];var items=s.products.split(',');for(var i=0;i<items.length;i++){var params=items[i].split(';');ids.push(params[1]);}
var cookie=r(cookieName);if(ids.length>0){if(e(cookie)){fireAdd(ids);}else{var cArr=cookie.split(",");if(ids.length>cArr.length){fireAdd(ids);}else if(ids.length==cArr.length){var n=0;for(i=0;i<ids.length;i++){for(j=0;j<cArr.length;j++){if(ids[j]==cArr[i])
n++;}}
if(n!=ids.length){fireAdd(ids);fireRemove(ids);}else{}
}else{fireRemove(ids);}}}else{if(!e(cookie)){fireRemove(ids);}}}
if(reset)
q(cookieName,"",-1);return s.events;};},function(a,b){s._channelDomain="Social Networks|facebook.com,twitter.com,digg.com,stumbleupon.com,fark.com,reddit.com,linkedin.com,myspace.com,buzz.yahoo.com,delicious.com,del.icio.us,plus.google.com";s.seList="search.about.com|terms|About.com>alltheweb.com|query,q|All The Web>altavista.co,altavista.de|q,r|AltaVista>.aol.,suche.aolsvc.de|q,query|AOL>ask.jp,ask.co|q,ask|Ask>www.baidu.com|wd|Baidu>business.com/search|query|Business.com>clix.pt|question|Clix>cuil.com|q|Cuil>daum.net,search.daum.net|q|Daum>eniro.|search_word|Eniro>goo.ne.jp,search.mobile.goo.ne.jp|MT|Goo (Jp.)>google.,googlesyndication.com|q,as_q|Google>icqit.com|q|icq>ixquick.com|query|ixquick>bing.com|q|Microsoft Bing>lycos.|query|Lycos>mail.ru/search,go.mail.ru/search|q|Mail.ru>bing.com|q|Microsoft Bing>myway.com|searchfor|MyWay.com>netscape.com|query,search|Netscape Search>reference.com|q|Reference.com>searchalot.com|query,q|Searchalot>seznam|w|Seznam.cz>busca.uol.com.br|q|UOL Busca>usseek.com|string|Usseek>virgilio.it|qs|Virgilio>web.de|su|Web.de>yahoo.com,yahoo.co.jp|p,va|Yahoo!>yandex|text|Yandex.ru>search.cnn.com|query|CNN Web Search>search.earthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Search>search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Search";s.usePlugins=true;function s_doPlugins(s){s.eVar63=s.getFullReferringDomains();if(typeof b.sc_use_plugins!='undefined'&&b.sc_use_plugins=="false"){s.pageName="";s.eVar17="";if(typeof b.link_cat!='undefined'&&(b.link_cat=="add to cart"||b.link_cat=="find product"||b.link_cat=="product learn more"||b.link_cat=="pre order")&&b.product_category&&b.product_id){var prodcat=b.product_category[0]||'';var prodid=b.product_id[0]||'';s.products=prodcat+";"+prodid;}else{s.products="";}
if(s.events&&s.events.indexOf("prodView")>=0){s.events=s.apl(s.events,'event2',',',1);}}else{if(s.events&&s.events.indexOf("prodView")>=0){s.events=s.apl(s.events,'event2',',',1);}
if(typeof b.page_type!='undefined'&&(b.page_type=="product page"||b.page_type=="product")&&b.product_category&&b.product_id){var prodcat_l=b.product_category[0]||'';var prodid_l=b.product_id[0]||'';s.products=prodcat_l+";"+prodid_l;}
if(b.page_type&&b.page_type.toLowerCase()=="category filter"){s.products="";}
if(a=="view"){if(s.pageName=="ecom step1|cart"){s.events=s.checkCartEvents('sc_cart_items',30);}
if(s.pageName=="ecom step 4|thank you"||s.pageName=="ecom fraud thank you"){s.checkCartEvents('sc_cart_items',30,true);}}
s.prop66="D=s_vi";if(!s.campaign)
s.campaign=semphonicGetQueryParm('cid');if(!s.campaign)
s.campaign=semphonicGetQueryParm('EP_MID');if(!s.campaign)
s.campaign=semphonicGetQueryParm('MKM_CID');if(!s.campaign)
s.campaign=semphonicGetQueryParm('MKM_MID');if(!s.campaign&&typeof cid_storedParam!=='undefined')
s.campaign=cid_storedParam;if(!s.eVar7)
s.eVar7=semphonicGetQueryParm('int_cid');if(!s.eVar7)
s.eVar7=semphonicGetQueryParm('INT');if(!s.eVar7)
s.eVar7=semphonicGetQueryParm('pid');var firstVisitCookieName="first_page_visit";if(a=="view"){s.channelManager("cid","","","",1);if(s._channel=="Referrers")
s._channel="Other Referrer";if(s._channel=="Paid Search")
s._channel="";var smSites=s._channelDomain.split("|");smSites=smSites[smSites.indexOf("Social Networks")+1].split(",");for(i=0;i<smSites.length;i++){if(document.URL.toLowerCase().indexOf('cid=smc-')==-1&&document.referrer.toLowerCase().indexOf(smSites[i])>-1){s._channel="Social Media Referred";}}
s.eVar72=s._channel;s.eVar59=s.eVar72;}
var existingCookie=s.c_r(firstVisitCookieName);var expire=new Date(),ct=expire.getTime();expire.setTime(ct+(1000*60*30));var cookieValue=(!existingCookie||existingCookie=="")?b.ss_url:existingCookie;s.c_w(firstVisitCookieName,cookieValue,expire);if(s.c_r(firstVisitCookieName).match("www.samsung.com/us/business/"))
s.prop44="b2b";else
s.prop44="consumer";if(s.eVar7)
s.prop63=s.eVar7;if(s.campaign)
s.prop63=s.campaign;var aid=s.getQueryParam('aid');if(aid)
s.prop63=aid;s.events=s.apl(s.events,'event16',',',1);s.eVar7=s.getValOnce(s.eVar7,"s_v7",0);s.campaign=s.getValOnce(s.campaign,"s_campaign",0);if(typeof b.sc_pagename!='undefined'&&b.sc_pagename!=''){s.eVar17=b.sc_pagename;}else{s.eVar17=s.pageName;};if(s.events&&s.events.indexOf("prodView")>=0){s.eVar24="+1";s.events=s.apl(s.events,'event2',',',1);s.hier1=s.prop2+">"+s.prop35+">"+s.prop36+">"+s.prop37;}
s.prop24=s.getNewRepeat();s.server=document.location.host.toLowerCase();if(!s.eVar45)
s.eVar45=s.prop47=semphonicGetQueryParm('MKM_LID');if(!s.eVar45)
s.eVar45=s.prop47=semphonicGetQueryParm('LID');if(!s.eVar50)
s.eVar50=semphonicGetQueryParm('EP_RID');if(!s.eVar50)
s.eVar50=semphonicGetQueryParm('MKM_RID');s.eVar50=s.getValOnce(s.eVar50,"s_evar50",0);s.eVar50=s.c_r('prof_bpno_s');if(s.eVar50)
s.prop50=s.eVar50;var ppv_pagename=s.getPreviousValue(s.pageName,'gpv_pn');var ppv_val=s.getPercentPageViewed();if(ppv_pagename&&ppv_val&&ppv_val!=='0'){s.prop53=ppv_pagename;s.prop54=ppv_val;}
if(s.prop3&&s.prop3=='video')
s.prop30=s.eVar54='shop:tv_video';if(s.prop3&&s.prop3=='mobile')
s.prop30=s.eVar54='shop:mobile';if(s.prop3&&s.prop3=='computer')
s.prop30=s.eVar54='shop:computing';if(s.prop3&&s.prop3=='appliances')
s.prop30=s.eVar54='shop:home_appliances';if(s.prop3&&s.prop3=='photography')
s.prop30=s.eVar54='shop:photo';if(s.prop3&&s.prop3=='appstore'){if(s.prop35&&s.prop35=='tvapp')
s.prop30=s.eVar54='shop:tv_video';}
if(s.prop3&&s.prop3=='support'){if(s.eVar14){if(s.eVar14=='cell-phones')
s.prop30=s.eVar54='support:mobile';if(s.eVar14=='tvs')
s.prop30=s.eVar54='support:tv_video';if(s.eVar14=='cell phones')
s.prop30=s.eVar54='support:mobile';if(s.eVar14=='printers')
s.prop30=s.eVar54='support:computing';if(s.eVar14=='laptops')
s.prop30=s.eVar54='support:computing';if(s.eVar14=='monitors')
s.prop30=s.eVar54='support:computing';if(s.eVar14=='blu-ray-dvd')
s.prop30=s.eVar54='support:tv_video';if(s.eVar14=='galaxy-tab')
s.prop30=s.eVar54='support:mobile';if(s.eVar14=='galaxy tab')
s.prop30=s.eVar54='support:mobile';if(s.eVar14=='refrigerators')
s.prop30=s.eVar54='support:home_appliances';if(s.eVar14=='blu-ray & dvd')
s.prop30=s.eVar54='support:tv_video';if(s.eVar14=='home-theater')
s.prop30=s.eVar54='support:tv_video';if(s.eVar14=='home theater')
s.prop30=s.eVar54='support:tv_video';if(s.eVar14=='blu ray-dvd')
s.prop30=s.eVar54='support:tv_video';if(s.eVar14=='memory-storage')
s.prop30=s.eVar54='support:computing';if(s.eVar14=='washers-dryers')
s.prop30=s.eVar54='support:home_appliances';if(s.eVar14=='camcorders')
s.prop30=s.eVar54='support:photo';if(s.eVar14=='mp3-players')
s.prop30=s.eVar54='support:mobile';if(s.eVar14=='digital-cameras')
s.prop30=s.eVar54='support:photo';if(s.eVar14=='mp3 players')
s.prop30=s.eVar54='support:mobile';if(s.eVar14=='microwaves')
s.prop30=s.eVar54='support:home_appliances';if(s.eVar14=='tablet-pcs')
s.prop30=s.eVar54='support:computing';if(s.eVar14=='digital cameras')
s.prop30=s.eVar54='support:photo';if(s.eVar14=='washers & dryers')
s.prop30=s.eVar54='support:home_appliances';if(s.eVar14=='memory storage')
s.prop30=s.eVar54='support:computing';if(s.eVar14=='tablet pcs')
s.prop30=s.eVar54='support:computing';if(s.eVar14=='washers dryers')
s.prop30=s.eVar54='support:home_appliances';if(s.eVar14=='dishwashers')
s.prop30=s.eVar54='support:home_appliances';if(s.eVar14=='memory & storage')
s.prop30=s.eVar54='support:computing';if(s.eVar14=='oven-ranges')
s.prop30=s.eVar54='support:home_appliances';if(s.eVar14=='oven ranges')
s.prop30=s.eVar54='support:home_appliances';if(s.eVar14=='chromebook')
s.prop30=s.eVar54='support:computing';if(s.eVar14=='all-in-one-pcs')
s.prop30=s.eVar54='support:computing';if(s.eVar14=='projectors')
s.prop30=s.eVar54='support:tv_video';if(s.eVar14=='digital-photo-frames')
s.prop30=s.eVar54='support:photo';if(s.eVar14=='all in-one-pcs')
s.prop30=s.eVar54='support:computing';if(s.eVar14=='all-in-one pcs')
s.prop30=s.eVar54='support:computing';if(s.eVar14=='digital photo-frames')
s.prop30=s.eVar54='support:photo';if(s.eVar14=='digital photo frames')
s.prop30=s.eVar54='support:photo';if(s.eVar14=='air conditioners')
s.prop30=s.eVar54='support:home_appliances';if(s.eVar14=='air-conditioners')
s.prop30=s.eVar54='support:home_appliances';}}
s.omnitureReviews("totalReviewCount:eVar48,avgRating:eVar49,type|product:campaign",true);s.referrer=s.facebookSocialRefferrers();if(s.pageName=="ecom step 4|thank you"||s.pageName=="ecom fraud thank you")
if(!s.c_r('sssuscust')){s.createCookie=function(name,value,seconds){var d=new Date();if(seconds)
d.setTime(d.getTime()+(seconds*1000));document.cookie=name+"="+value+";path=/;domain=;expires="+d.toGMTString();};s.createCookie('sssuscust',true,60*60*24*365*30);}
if(!s.c_r('sssuscust'))
s.eVar62="prospect";else
s.eVar62="customer";}}
s.doPlugins=s_doPlugins;function semphonicGetQueryParm(qpin){var qp=qpin.toLowerCase();var d_URL=document.URL.toLowerCase();var pos=d_URL.indexOf("?"+qp+"=");if(pos==-1)
pos=d_URL.indexOf("&"+qp+"=");if(pos==-1)
return null;pos+=qp.length+2;if(pos>=d_URL.length)
return null;var endPos1=d_URL.indexOf("&",pos);var endPos2=d_URL.indexOf("#",pos);if(endPos1<0&&endPos2<0)
return unescape(d_URL.substring(pos));var endPos=endPos1;if(endPos<0||(endPos2>=0&&endPos2<endPos1))
endPos=endPos2;return unescape(d_URL.substring(pos,endPos));}
function bubbleSort(ul,splitdelim,joindelim){var sorted_list="";var unsorted_list=ul.split(splitdelim);var i,j,save_val;for(i=0;i<unsorted_list.length;i++){for(j=0;j<unsorted_list.length-1;j++){if(unsorted_list[j]>unsorted_list[j+1]){save_val=unsorted_list[j+1];unsorted_list[j+1]=unsorted_list[j];unsorted_list[j]=save_val;}}}
sorted_list=unsorted_list.join(joindelim);return sorted_list;}
function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}else
var expires="";document.cookie=name+"="+value+expires+"; path=/";}
function get_cookie(cookie_name){var results=document.cookie.match('(^|;) ?'+cookie_name+'=([^;]*)(;|$)');if(results)
return(unescape(results[2]));else
return null;}
function getCookie(name){var search=name+"=";if(document.cookie.length>0){offset=document.cookie.indexOf(search);if(offset!=-1){offset+=search.length;end=document.cookie.indexOf(";",offset);if(end==-1)
end=document.cookie.length;return unescape(document.cookie.substring(offset,end));}}
return null;}
function deleteCookie(name,path,domain){if(getCookie(name)){document.cookie=name+'='+
((path)?';path='+path:'')+
((domain)?';domain='+domain:'')+
';expires=Thu, 01-Jan-1970 00:00:01 GMT';}}
function ss_filterSolution(){var ss_check=get_cookie('ss_check');if(!ss_check){var s_checkboxes=new Array;}else{var s_checkboxes=ss_check.split('|');}
$(".shop-type-list a").click(function(){s_checkboxes.push($.trim(this.text));ss_check=s_checkboxes.join("|");createCookie('ss_check',ss_check);});$(window).load(function(){$("input:checkbox[name=filter_option]:not(:checked)").each(function(){var inputObj=this;var labelObj=$(this).next();var labelTxt=$(labelObj).text();labelTxt=$.trim(labelTxt);if(ss_check.indexOf(labelTxt)>-1){s_checkboxes.splice($.inArray(labelTxt,s_checkboxes),1);}});$("input:checkbox[name=filter_option]:checked").each(function(){var inputObj=this;var labelObj=$(this).next();var labelTxt=$(labelObj).text()
labelTxt=$.trim(labelTxt);if(ss_check.indexOf(labelTxt)==-1){s_checkboxes.push(labelTxt);s.linkTrackVars='eVar9,prop15,eVar10,prop16,eVar11,prop17,eVar20,eVar55,events';s.linkTrackEvents='event73';s.eVar9=s.prop15='category_filter_check';s.eVar10=s.prop16=s.pageName+">category_filter_check";s.eVar11=s.prop17=s.pageName+">left_cat_filter>category_filter_check";s.eVar20='+1';s.events='event73';s.eVar55="check_type:"+labelTxt.toLowerCase();s.tl(this,'o','category_filter_check');}});ss_check=s_checkboxes.join("|");createCookie('ss_check',ss_check);});}
ss_filterSolution();},function(a,b){var omn_cat=new Array(5);omn_cat[0]=['video','tvs','blu-ray-dvd','projectors','home-theater'];omn_cat[1]=['mobile','cell-phones','galaxy-tab','cell-phones-accessories','mp3-players','chromebook'];omn_cat[2]=['photography','digital-cameras','camcorders','digital-photo-frames'];omn_cat[3]=['computer','laptops','monitors','printers','projectors','memory-storage','chromebook'];omn_cat[4]=['appliances','washers-dryers','refrigerators','microwaves','dishwashers','oven-ranges'];var omn_addToHier="";var omn_rollup="";for(var omn_i=0;omn_i<omn_cat.length;omn_i++){if(b._pathname2==omn_cat[omn_i][0])
omn_rollup=b._pathname2;for(var omn_x=0;omn_x<omn_cat[omn_i].length;omn_x++){if(b._pathname3==omn_cat[omn_i][omn_x])
omn_addToHier=b._pathname3;}}
b.product_rollup=omn_rollup;if(omn_addToHier){var omn_cross_sell=get_cookie("omn_hier");if(omn_cross_sell!=null){if(omn_cross_sell!=""){omn_cross_sell=omn_cross_sell.split("<");if(omn_cross_sell.length<5){if(omn_cross_sell[omn_cross_sell.length-1]==omn_addToHier)
omn_addToHier="";else
omn_cross_sell=omn_cross_sell.join("<")+"<"+omn_addToHier;}else{omn_addToHier="";}}}else{omn_cross_sell=omn_addToHier;}
if(omn_addToHier!=""){createCookie("omn_hier",omn_cross_sell,0);b.hier3=omn_cross_sell;}}},function(a,b){if(b['site_search_results']=='0'){b['site_search_null']=b['site_search_term']}},function(a,b){if(b['page_type']=='homepage'){b['page_name']='www.samsung.com/us'}},function(a,b){if(b['dom.domain'].toString().toLowerCase()=='www.samsung.com'.toLowerCase()||b['dom.domain'].toString().toLowerCase()=='samsung.com'.toLowerCase()||b['dom.domain'].toString().toLowerCase()=='pages.samsung.com'.toLowerCase()||b['dom.domain'].toString().toLowerCase()=='techlife.samsung.com'.toLowerCase()||b['dom.domain'].toString().toLowerCase()=='originus.samsung.com'.toLowerCase()||b['dom.domain'].toString().toLowerCase()=='m.samsung.com'.toLowerCase()||b['dom.domain'].toString().toLowerCase()=='snpk.smgmb.us'.toLowerCase()||b['dom.domain'].toString().toLowerCase().indexOf('foresee'.toLowerCase())>-1||b['dom.domain'].toString().toLowerCase().indexOf('sso-us.samsung.com'.toLowerCase())>-1||b['dom.domain'].toString().toLowerCase()=='support-us.samsung.com'.toLowerCase()||b['dom.domain'].toString().toLowerCase()=='product.samsung.com'.toLowerCase()||b['dom.domain'].toString().toLowerCase().indexOf('samsungbcs.com'.toLowerCase())>-1||b['dom.domain'].toString().toLowerCase().indexOf('shop.us.samsung.com'.toLowerCase())>-1||b['dom.domain'].toString().toLowerCase()=='skills.samsung.com'.toLowerCase()){b['sc_reporting_suite']='sssamsungnewus'}},function(a,b){if((b['page_type']=='product marketplace'&&typeof b['product_name']!='undefined')){try{b['marketplace_product_id']=b.product_id[0]}catch(e){};try{b['marketplace_product_name']=b.product_name[0]}catch(e){}}},function(a,b){if((b['page_type'].toString().toLowerCase()=='ecommerce marketplace'.toLowerCase()&&typeof b['product_id']!='undefined')){try{b['marketplace_model_code']=b.product_id[0]}catch(e){}}},function(a,b){if((typeof b['searchpage_click_type']!='undefined'&&b['link_cat']=='search_leftnav_click')){try{b['searchpage_click_type']="left nav click"+b.search_click_type}catch(e){}}},function(a,b){if(b.sc_disable){return false;}},function(a,b){b['previous_page_name']=b['cp.utag_main__prevpage'];utag.loader.SC('utag_main',{'_prevpage':b['page_name']+';exp-1h'})},function(a,b){if((typeof b['percent_page_view']!='undefined'&&typeof b['previous_page_name']!='undefined')){try{b['percent_page_view_formatted']=b.previous_page_name+"> "+b.percent_page_view}catch(e){}}},function(a,b){if(b.iframe_content=="true"||b.iframe_content=="t"){return false;}},function(a,b){if(isLogin()){b['loggedin_status']="logged in";}else{b['loggedin_status']="logged out";}},function(a,b){if(b['order_id']){b['_cprod'].push("");b['_cprodname'].push("");b['_ccat'].push("");b['_ccat2'].push("");b['_cquan'].push("");b['_cprice'].push("");b['_event61']=[];b['_event99']=[];b['_event100']=[];for(i=0;i<b['_cprod'].length;i++){if((b['_cprod'].length-1)==i){b['_event61'].push(b['_cship']);b['_event99'].push(b['_ctax']);b['_event100'].push(b['_ctotal']);}else{b['_event61'].push("");b['_event99'].push("");b['_event100'].push("");}}}},function(a,b){if(b['dr_page_name']=="ecom fraud thank you"){if(b._cprod.toString().toLowerCase().indexOf("storage")>-1||b._cprod.toString().toLowerCase().indexOf("shoot")>-1)
return false;for(i=0;i<b['_cquan'].length;i++){if(parseInt(b['_cquan'][i])>10)return false;}}
return true;}];u.send=function(a,b,c,d,e,f,g,h,ev){if(u.ev[a]||typeof u.ev.all!="undefined"){utag.DB("send:9");u.data={};u.a=a;b.sc_events=b.sc_events||{};u.addEvent=function(v,n){var t=[];if(v instanceof Array){t=v.slice(0);}else if(typeof n!="undefined"){t.push(v+"="+n);}else{t.push(v);}
for(var i=0;i<t.length;i++){b.sc_events[t[i]]=1;u.pushlt(u.lte,t[i].split('=')[0]);}
return b.sc_events;}
u.addProduct=function(v){u.data.sc_addProd="";if(v instanceof Array){u.data.sc_addProd=v.join(',');}else{u.data.sc_addProd=v;}}
if(u.a=="link"){u.ltflag=true;u.ltv=[];u.lte=[];}
for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(e in utag.loader.GV(u.map)){if(typeof b[e]!="undefined"&&typeof u.map[e]=="string"&&u.map[e].indexOf("PRODUCTS_")>-1){f=u.map[e].split(",");for(g=0;g<f.length;g++){if(f[g].indexOf("PRODUCTS_id")||f[g].indexOf("PRODUCTS_category")||f[g].indexOf("PRODUCTS_quantity")||f[g].indexOf("PRODUCTS_price")){u.data[f[g].substring(9)]=b[e];}}}}
u.data.id=u.data.id||(typeof b._cprod!="undefined"?b._cprod.slice(0):[]);u.data.category=u.data.category||(typeof b._ccat!="undefined"?b._ccat.slice(0):[]);u.data.quantity=u.data.quantity||(typeof b._cquan!="undefined"?b._cquan.slice(0):[]);u.data.price=u.data.price||(typeof b._cprice!="undefined"?b._cprice.slice(0):[]);if(typeof u.data.id!="undefined"&&u.data.id!=""){c=[];d={};ev={};for(e in utag.loader.GV(u.map)){if(typeof b[e]!="undefined"&&typeof u.map[e]=="string"&&u.map[e].indexOf("PRODUCTS_")>-1){f=u.map[e].split(",");for(g=0;g<f.length;g++){var pv=f[g].substring(9);if(f[g].indexOf("PRODUCTS_evar")==0||f[g].indexOf("PRODUCTS_eVar")==0){if(b[e]instanceof Array){b.sc_prodevars=b.sc_prodevars||[];for(var i=0;i<b[e].length;i++){var prodvars={};if(typeof b.sc_prodevars[i]!="undefined"&&b.sc_prodevars[i]!=""){b.sc_prodevars[i][pv]=b[e][i];}else{prodvars[pv]=b[e][i];b.sc_prodevars.push(prodvars);}}}else{if(b[e]!=="")
d[pv]=b[e].split(",");}}else if(f[g].indexOf("PRODUCTS_event")==0){if(b[e]instanceof Array){b.sc_prodevents=b.sc_prodevents||[];for(var i=0;i<b[e].length;i++){var prodevents={};if(typeof b.sc_prodevents[i]!="undefined"&&b.sc_prodevents[i]!=""){b.sc_prodevents[i][pv]=b[e][i];}else{prodevents[pv]=b[e][i];b.sc_prodevents.push(prodevents);}}
u.addEvent(pv);}else{if(b[e]!=""){ev[pv]=b[e];u.addEvent(pv);}}}}}}
e="";for(f in utag.loader.GV(d)){for(g=0;g<d[f].length;g++){if(e!="")e+="|"+f+"="+d[f][g];else e=f+"="+d[f][g];}}
h="";for(f in utag.loader.GV(ev)){if(h)h+="|"+f+"="+((isNaN(ev[f]))?"1":ev[f]);else h=f+"="+((isNaN(ev[f]))?"1":ev[f]);}
b.sc_prodevents=b.sc_prodevents||[];b.sc_prodevars=b.sc_prodevars||[];for(d=0;d<u.data.id.length;d++){var h2=h;var h3=e;if(typeof b.sc_prodevents!="undefined"){for(f in b.sc_prodevents[d]){if(typeof b.sc_prodevents[d][f]!="undefined"){var l=b.sc_prodevents[d][f];if(typeof l!="undefined"&&l!=""&&isNaN(l)==false){if(h2){h2+="|"+f+'='+l;}else{h2=f+'='+l;}}}}}
if(typeof b.sc_prodevars!="undefined"){for(f in b.sc_prodevars[d]){if(typeof b.sc_prodevars[d][f]!="undefined"){var l=b.sc_prodevars[d][f];if(typeof l!="undefined"&&l!=""){if(h3){h3+="|"+f+'='+l;}else{h3=f+'='+l;}}}}}
c.push((u.data.category[d]?u.data.category[d]:"")+";"+u.data.id[d]+";"+(u.data.quantity[d]?u.data.quantity[d]:"")+";"+(u.data.price[d]?((u.data.quantity[d]?parseInt(u.data.quantity[d]):1)*parseFloat(u.data.price[d])).toFixed(2):"")+";"+h2+";"+h3);}
if(typeof u.data.sc_addProd!="undefined"&&u.data.sc_addProd){c.push(u.data.sc_addProd);}
u.o.products=c.join(",");}
var evt=/^event|prodView|scOpen|scAdd|scRemove|scView|scCheckout|purchase$/;for(c in utag.loader.GV(b)){d=[];if(typeof u.map[c+":"+b[c]]!="undefined"){b[c+":"+b[c]]=b[c];d=u.map[c+":"+b[c]].split(",");}else if(typeof u.map[c]!="undefined")d=u.map[c].split(",");for(e=0;e<d.length;e++){if(d[e]!="events"&&evt.test(d[e])&&b[c]!=""){if(d[e].indexOf("ONCE_")==0){f=d[e].substring(5);if(utag.handler.ONCE("ev_"+b[c])){u.addEvent(f);}}else{u.addEvent(d[e]);}}}}
for(c in utag.loader.GV(b)){if(typeof u.map[c]!="undefined"){d=u.map[c].split(",");for(e=0;e<d.length;e++){if(d[e].indexOf("ONCE_")==0){f=d[e].substring(5);if(utag.loader.ONCE("map_"+b[c])){u.o[f]=b[c];u.pushlt(u.ltv,f)}}else if(d[e]=="doneAction"){b.doneAction=b[c];if(b.doneAction!="navigate"){b.doneAction=eval(b[c]);}}else{if(c=="sc_events"||c=="sc_prodevents"||c=="sc_prodevars"){utag.DB("Error:9: Mapping reserved object name "+c)}else{u.o[d[e]]=b[c];}
if(d[e]=="s_account"){u.o.dynamicAccountSelection=true;u.o.dynamicAccountList=b[c]+"=.";}else if(d[e]=="linkTrackVars"){u.ltflag=false;}else{u.pushlt(u.ltv,d[e]);}}}}}
d=[];for(c in utag.loader.GV(b.sc_events)){if(b.sc_events[c])d.push(c)};if(d.length>0){u.o.events=d.join(",");u.pushlt(u.lte,u.o.events);}
if(b._corder){u.pushlt(u.lte,"purchase");u.pushlt(u.ltv,"purchaseID");u.o.purchaseID=((u.o.purchaseID)?u.o.purchaseID:b._corder);u.o.events=((u.o.events)?u.o.events:"purchase");if(u.o.events.indexOf("purchase")<0){u.o.events+=",purchase"};}
var t=u.o;var q={},l={};c=u.varlist;for(d in utag.loader.GV(c)){if(typeof t[d]!='undefined'&&t[d]!=null&&t[d]!=''&&t[d].toString().indexOf('D=')!=0)
{if(typeof l[t[d]]=='undefined')l[t[d]]=c[d];else t[d]='D='+l[t[d]];}}
if(u.a=="view"){var img=u.o.t();if(typeof img!="undefined"&&img!=""){u.img=new Image();u.img.src=img.substring(img.indexOf("src=")+5,img.indexOf("width=")-2);}}else if(u.a=="link"){if(typeof b.linkTrackVars=="undefined"&&u.ltflag){if(u.o.events){u.ltv.push("events")};if(u.o.products){u.ltv.push("products")};b.linkTrackVars=u.ltv.join(',');}
if(typeof b.linkTrackEvents=="undefined"&&u.ltflag){b.linkTrackEvents=u.lte.join(',');}
if(b.linkTrackEvents){u.o.linkTrackEvents=b.linkTrackEvents;}
if(b.linkTrackVars){u.o.linkTrackVars=b.linkTrackVars;}
if(!u.o.linkType)u.o.linkType='o';if(b.link_name)b.link_text=b.link_name;b.link_text=(b.link_text)?b.link_text:"no link_name";if(b.link_type=='exit link'){u.o.linkType='e'}
else if(b.link_type=='download link')u.o.linkType='d';u.o.tl(((b.link_obj)?b.link_obj:true),u.o.linkType,b.link_text,null,(b.doneAction?b.doneAction:null));}
if("yes"=="yes"){u.o.events="";u.o.products="";for(d in utag.loader.GV(u.varlist)){if(d!="pageName")u.o[d]=""}}
utag.DB("send:9:COMPLETE");}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('9','samsung.main');}catch(e){};