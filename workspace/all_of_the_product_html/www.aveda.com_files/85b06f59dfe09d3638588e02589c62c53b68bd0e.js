var visitor = new Visitor('esteelauder');
visitor.trackingServer    = 'esteelauder.d1.sc.omtrdc.net';


/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ============

 Adobe Visitor API for JavaScript version: 1.1
 Copyright 1996-2013 Adobe, Inc. All Rights Reserved
 More info available at http://www.omniture.com
*/
function Visitor(k){var a=this;a.version="1.1";var f=window;f.s_c_in||(f.s_c_il=[],f.s_c_in=0);a._c="Visitor";a._il=f.s_c_il;a._in=f.s_c_in;a._il[a._in]=a;f.s_c_in++;var i=f.document,h=f.z;h||(h=null);var j=f.A;j||(j=!0);var l=f.w;l||(l=!1);a.s=function(){var a;!a&&f.location&&(a=f.location.hostname);if(a)if(/^[0-9.]+$/.test(a))a="";else{var d=a.split("."),b=d.length-1,e=b-1;1<b&&2>=d[b].length&&0>",am,aq,ax,cc,cf,cg,ch,cv,cz,de,dj,dk,eu,fm,fo,ga,gd,gf,gl,gm,gq,gs,gw,hm,li,lu,md,mh,mp,mq,ms,ne,nl,nu,pm,si,sk,sm,sr,su,tc,td,tf,tg,tk,tv,va,vg,vu,wf,yt,".indexOf(","+
d[b]+",")&&e--;if(0<e)for(a="";b>=e;)a=d[b]+(a?".":"")+a,b--}return a};a.cookieRead=function(a){var d=(";"+i.cookie).split(" ").join(";"),b=d.indexOf(";"+a+"="),e=0>b?b:d.indexOf(";",b+1);return 0>b?"":decodeURIComponent(d.substring(b+2+a.length,0>e?d.length:e))};a.cookieWrite=function(c,d,b){var e=a.cookieLifetime,g,d=""+d,e=e?(""+e).toUpperCase():"";b&&"SESSION"!=e&&"NONE"!=e?(g=""!=d?parseInt(e?e:0):-60)?(b=new Date,b.setTime(b.getTime()+1E3*g)):1==b&&(b=new Date,g=b.getYear(),b.setYear(g+2+(1900>
g?1900:0))):b=0;return c&&"NONE"!=e?(i.cookie=c+"="+encodeURIComponent(d)+"; path=/;"+(b?" expires="+b.toGMTString()+";":"")+(a.k?" domain="+a.k+";":""),a.cookieRead(c)==d):0};a.b=h;a.j=function(a,d){try{"function"==typeof a?a.apply(f,d):a[1].apply(a[0],d)}catch(b){}};a.u=function(c,d){d&&(a.b==h&&(a.b={}),void 0==a.b[c]&&(a.b[c]=[]),a.b[c].push(d))};a.p=function(c,d){if(a.b!=h){var b=a.b[c];if(b)for(;0<b.length;)a.j(b.shift(),d)}};a.c=h;a.t=function(c,d,b){!d&&b&&b();var e=i.getElementsByTagName("HEAD")[0],
g=i.createElement("SCRIPT");g.type="text/javascript";g.setAttribute("async","async");g.src=d;e.firstChild?e.insertBefore(g,e.firstChild):e.appendChild(g);a.c==h&&(a.c={});a.c[c]=setTimeout(b,a.loadTimeout)};a.q=function(c){a.c!=h&&a.c[c]&&(clearTimeout(a.c[c]),a.c[c]=0)};a.l=l;a.m=l;a.isAllowed=function(){if(!a.l&&(a.l=j,a.cookieRead(a.cookieName)||a.cookieWrite(a.cookieName,"T",1)))a.m=j;return a.m};a.a=h;a.n=l;a.i=function(){if(!a.n){a.n=j;var c=a.cookieRead(a.cookieName),d,b,e,g,f=new Date;if(c&&
"T"!=c){c=c.split("|");1==c.length%2&&c.pop();for(d=0;d<c.length;d+=2)if(b=c[d].split("-"),e=b[0],g=c[d+1],b=1<b.length?parseInt(b[1]):0,e&&g&&(!b||f.getTime()<1E3*b))a.f(e,g,1),0<b&&(a.a["expire"+e]=b)}if(!a.d("MCAID")&&(c=a.cookieRead("s_vi")))c=c.split("|"),1<c.length&&0<=c[0].indexOf("v1")&&(g=c[1],d=g.indexOf("["),0<=d&&(g=g.substring(0,d)),g&&g.match(/^[0-9a-fA-F\-]+$/)&&a.f("MCAID",g))}};a.v=function(){var c="",d,b;for(d in a.a)!Object.prototype[d]&&a.a[d]&&"expire"!=d.substring(0,6)&&(b=a.a[d],
c+=(c?"|":"")+d+(a.a["expire"+d]?"-"+a.a["expire"+d]:"")+"|"+b);a.cookieWrite(a.cookieName,c,1)};a.d=function(c){return a.a!=h?a.a[c]:h};a.f=function(c,d,b){a.a==h&&(a.a={});a.a[c]=d;b||a.v()};a.o=function(c,d){var b=new Date;b.setTime(b.getTime()+1E3*d);a.a==h&&(a.a={});a.a["expire"+c]=Math.floor(b.getTime()/1E3)};a.r=function(a){if(a&&("object"==typeof a&&(a=a.visitorID?a.visitorID:a.id?a.id:a.uuid?a.uuid:""+a),a&&(a=a.toUpperCase(),"NOTARGET"==a&&(a="NONE")),!a||"NONE"!=a&&!a.match(/^[0-9a-fA-F\-]+$/)))a=
"";return a};a.g=function(c,d){var b;a.q(c);b=a.d(c);b||(b=a.r(d))&&a.f(c,b);if("object"==typeof d){var e=86400;"MCAAMID"==c&&(void 0!=d.id_sync_ttl&&d.id_sync_ttl&&(e=parseInt(d.id_sync_ttl)),a.o(c,e),a.o("MCAAMLH",e),d.dcs_region&&a.f("MCAAMLH",d.dcs_region))}a.p(c,["NONE"!=b?b:""])};a.e=h;a.h=function(c,d,b){if(a.isAllowed()){a.i();var e=a.d(c);if(e)return"NONE"==e&&a.j(b,[""]),"NONE"!=e?e:"";if(a.e==h||void 0==a.e[c])a.e==h&&(a.e={}),a.e[c]=j,a.t(c,d,function(){if(!a.d(c)){var b="";if("MCMID"==
c){var d=b="",e,f,h=10,i=10;for(e=0;19>e;e++)f=Math.floor(Math.random()*h),b+="0123456789".substring(f,f+1),h=0==e&&9==f?3:10,f=Math.floor(Math.random()*i),d+="0123456789".substring(f,f+1),i=0==e&&9==f?3:10;b+=d}a.g(c,b)}});a.u(c,b)}return""};a.setMarketingCloudVisitorID=function(c){a.g("MCMID",c)};a.getMarketingCloudVisitorID=function(c){var d=a.marketingCloudServer,b="";a.loadSSL&&a.marketingCloudServerSecure&&(d=a.marketingCloudServerSecure);d&&(b="http"+(a.loadSSL?"s":"")+"://"+d+"/id?d_rtbd=json&d_cid="+
encodeURIComponent(a.namespace)+"&d_cb=s_c_il%5B"+a._in+"%5D.setMarketingCloudVisitorID");return a.h("MCMID",b,c)};a.setAudienceManagerVisitorID=function(c){a.g("MCAAMID",c)};a.getAudienceManagerVisitorID=function(c){var d=a.audienceManagerServer,b="";a.loadSSL&&a.audienceManagerServerSecure&&(d=a.audienceManagerServerSecure);d&&(b="http"+(a.loadSSL?"s":"")+"://"+d+"/id?d_rtbd=json&d_cb=s_c_il%5B"+a._in+"%5D.setAudienceManagerVisitorID");return a.h("MCAAMID",b,c)};a.getAudienceManagerLocationHint=
function(){a.i();var c=a.d("MCAAMLH");return c?c:0};a.setAnalyticsVisitorID=function(c){a.i();a.g("MCAID",c)};a.getAnalyticsVisitorID=function(c){var d=a.trackingServer,b="";a.loadSSL&&a.trackingServerSecure&&(d=a.trackingServerSecure);d&&(b="http"+(a.loadSSL?"s":"")+"://"+d+"/id?callback=s_c_il%5B"+a._in+"%5D.setAnalyticsVisitorID");return a.h("MCAID",b,c)};a.getVisitorID=function(c){return a.getMarketingCloudVisitorID(c)};a.namespace=k;a.cookieName="AMCV_"+k;a.k=a.s();a.loadSSL=0<=f.location.protocol.toLowerCase().indexOf("https");
a.loadTimeout=500;a.marketingCloudServer=a.audienceManagerServer="dpm.demdex.net"}Visitor.getInstance=function(k){var a,f=window.s_c_il,i;if(f)for(i=0;i<f.length;i++)if((a=f[i])&&"Visitor"==a._c&&a.namespace==k)return a;return new Visitor(k)};
    
    s = new AppMeasurement()
    
    
    var omnitureHostName = window.location.host    
    var USList="eng.aveda.na.drupal.perlgem.esteeonline.com;aveda.na.dev.ncsa.perlgem.esteeonline.com;aveda.na.stage.ncsa.perlgem.esteeonline.com;efrazier.eng.aveda.na.drupal.perlgem.esteeonline.com";
    var USProd="aveda.com;www.aveda.com";
    USListArr =  USList.split(";")
    var reHostName = new RegExp(omnitureHostName, 'g')
    for (i = 0; i <= USListArr.length - 1; i++) {
      if ( USListArr[i].match(reHostName) ){
        s.account = 'esteeglobaldev'
        s.currencyCode ='USD'
      }
    }
    USProdArr =  USProd.split(";")
    var reHostName = new RegExp(omnitureHostName, 'g')
    for (i = 0; i <= USProdArr.length - 1; i++) {
      if ( USProdArr[i].match(reHostName) ){
        s.account = 'esteeavedaus,esteeglobal'
        s.currencyCode ='USD'
      }
    }
    
    var CAList="aveda.ca.dev.ncsa.perlgem.esteeonline.com;aveda.ca.stage.ncsa.perlgem.esteeonline.com";
    var CAProd="aveda.ca;www.aveda.ca";
    CAListArr = CAList.split(";")
    for (i = 0; i <= CAListArr.length - 1; i++) {
      if ( CAListArr[i].match(reHostName) ){
        s.account = 'esteeglobaldev' 
        s.currencyCode ='CAD'
       }
    }
    CAProdArr = CAProd.split(";")
    for (i = 0; i <= CAProdArr.length - 1; i++) {
      if ( CAProdArr[i].match(reHostName) ){
        s.account = 'esteeavedacanada,esteeglobal' 
        s.currencyCode ='CAD'
       }
    }
    
    
    s.visitorNamespace = "esteelauder"
    s.visitor = Visitor.getInstance("esteelauder")    
    s.trackDownloadLinks=true
    s.trackExternalLinks=true
    s.trackInlineStats=true
    s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
    //s.linkInternalFilters="javascript:" //optional: add your internal domain here
    s.linkLeaveQueryString=false
    s.linkTrackVars="None"
    s.linkTrackEvents="None"    
    s.trackingServer="esteelauder.d1.sc.omtrdc.net"
    
    s.usePlugins=true
    function s_doPlugins(s) {
        // standardizes on EST / ex. 4:04 pm - Tuesday
        s.eVar21 = s.getTimeParting('f', '-5');       
        
    } 
    s.doPlugins=s_doPlugins 


 /* Homepage page_name fix */
 
if (tms_page_data.tms_page_info.page_name.pageID == '')  { 
    tms_page_data.tms_page_info.page_name.pageID = "Home"
    tms_page_data.tms_page_info.page_name.categoryID = "home"
    tms_page_data.tms_page_info.page_name.categoryName = "home"
    tms_page_data.tms_page_info.page_name.pageType = "home"
    s.pageName = "Home"
    s.eVar3="Home"
    //console.log(tms_page_data.tms_page_info.page_name); 
}


     //Until functions(so called plugins)
/*
 * Utility Functions: apl, p_c, p_gh, split, replace, join
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");
s.p_gh=new Function(""
+"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

   /*
 * Plugin: getTimeParting 3.4
 */
s._tpDST = {
    2012:'3/11,11/4',
    2013:'3/10,11/3',
    2014:'3/9,11/2',
    2015:'3/8,11/1',
	2016:'3/13,11/6',
	2017:'3/12,11/5',
	2018:'3/11,11/4',
	2019:'3/10,11/3'
};
s.getTimeParting=new Function("h","z",""
+"var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont"
+"h()!=0){return'Data Not Available';}else{var H,M,D,U,ds,de,tm,da=['"
+"Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturda"
+"y'],d=new Date();z=z?z:0;z=parseFloat(z);if(s._tpDST){var dso=s._tp"
+"DST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d.getFullYea"
+"r());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d>ds&&d<de)"
+"{z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime()+(d.getT"
+"imezoneOffset()*60000);d=new Date(d+(3600000*z));H=d.getHours();M=d"
+".getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U=' AM';if(H>=12){U=' P"
+"M';H=H-12;}if(H==0){H=12;}D=da[D];var mr=(((M+7.5)/15|0)*15)%60;var hr=(((M/105+.5)|0)+H)%24;tm=hr+':'+mr+U;return(tm+'|'+D);}");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Function - read combined cookies v 0.3
 */
if(!s.__ccucr){s.c_rr=s.c_r;s.__ccucr = true;
s.c_r=new Function("k",""
+"var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)ret"
+"urn v;k=s.escape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i="
+"c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';'"
+",i);m=m>0?m:e;v=i<0?'':s.unescape(c.substring(i+2+k.length,m<0?c.length:"
+"m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.get"
+"Time()){d.setTime(d.getTime()-60000);s.c_w(s.unescape(k),'',d);v='';}ret"
+"urn v;");}

/*
 * Function - write combined cookies v 0.3
 */
if(!s.__ccucw){s.c_wr=s.c_w;s.__ccucw = true;
s.c_w=new Function("k","v","e",""
+"this.new2 = true;"
+"var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,"
+"c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s"
+".escape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substr"
+"ing(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv"
+".indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.i"
+"ndexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime())"
+"{pv+=' '+k+'='+s.escape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'"
+"='+s.escape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t"
+".indexOf(';')!=-1){var t1=parseInt(t.substring(t.indexOf('|')+1,t.i"
+"ndexOf(';')));t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.set"
+"Time(ht);s.c_wr(pn,pv,d);}return v==s.c_r(s.unescape(k));");}

/* end getTimeParting 3.4 */

/* For serializing cookie vals provides, jQuery.stringify, s.cvw, s.cvr for use with cookie methods above */

jQuery.extend({stringify:function stringify(e){if("JSON" in window){return JSON.stringify(e)}var d=typeof(e);if(d!="object"||e===null){if(d=="string"){e='"'+e+'"'}return String(e)}else{var f,b,c=[],a=(e&&e.constructor==Array);for(f in e){b=e[f];d=typeof(b);if(e.hasOwnProperty(f)){if(d=="string"){b='"'+b+'"'}else{if(d=="object"&&b!==null){b=jQuery.stringify(b)}}c.push((a?"":'"'+f+'":')+String(b))}}return(a?"[":"{")+String(c)+(a?"]":"}")}}});s.cvw=new Function("value","return jQuery.stringify(value)");s.cvr=new Function("value","return jQuery.parseJSON(value)");



// JW - For Merchandizing eVars
/*
 * Get the current "fake" product number
 */
s.getProductNum = function() {
var s = this, pn, e = new Date();
if (!s.c_r('pn')) pn = 1;
else pn = parseInt(s.c_r('pn')) + 1;
e.setTime(e.getTime() + (30 * 86400000));
s.c_w('pn', pn, e);
return pn;
}


/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

 AppMeasurement for JavaScript version: 1.2.1
 Copyright 1996-2013 Adobe, Inc. All Rights Reserved
 More info available at http://www.omniture.com
*/
function AppMeasurement(){var s=this;s.version="1.2.1";var w=window;if(!w.s_c_in)w.s_c_il=[],w.s_c_in=0;s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;s._c="s_c";var k=w.fb;k||(k=null);var m=w,i,n;try{i=m.parent;for(n=m.location;i&&i.location&&n&&""+i.location!=""+n&&m.location&&""+i.location!=""+m.location&&i.location.host==n.host;)m=i,i=m.parent}catch(p){}s.Sa=function(s){try{console.log(s)}catch(a){}};s.ja=function(s){return""+parseInt(s)==""+s};s.replace=function(s,a,c){if(!s||s.indexOf(a)<
0)return s;return s.split(a).join(c)};s.escape=function(b){var a,c;if(!b)return b;b=encodeURIComponent(b);for(a=0;a<7;a++)c="+~!*()'".substring(a,a+1),b.indexOf(c)>=0&&(b=s.replace(b,c,"%"+c.charCodeAt(0).toString(16).toUpperCase()));return b};s.unescape=function(b){if(!b)return b;b=b.indexOf("+")>=0?s.replace(b,"+"," "):b;try{return decodeURIComponent(b)}catch(a){}return unescape(b)};s.Ja=function(){var b=w.location.hostname,a=s.fpCookieDomainPeriods,c;if(!a)a=s.cookieDomainPeriods;if(b&&!s.ca&&
!/^[0-9.]+$/.test(b)&&(a=a?parseInt(a):2,a=a>2?a:2,c=b.lastIndexOf("."),c>=0)){for(;c>=0&&a>1;)c=b.lastIndexOf(".",c-1),a--;s.ca=c>0?b.substring(c):b}return s.ca};s.c_r=s.cookieRead=function(b){b=s.escape(b);var a=" "+s.d.cookie,c=a.indexOf(" "+b+"="),e=c<0?c:a.indexOf(";",c);b=c<0?"":s.unescape(a.substring(c+2+b.length,e<0?a.length:e));return b!="[[B]]"?b:""};s.c_w=s.cookieWrite=function(b,a,c){var e=s.Ja(),d=s.cookieLifetime,f;a=""+a;d=d?(""+d).toUpperCase():"";c&&d!="SESSION"&&d!="NONE"&&((f=a!=
""?parseInt(d?d:0):-60)?(c=new Date,c.setTime(c.getTime()+f*1E3)):c==1&&(c=new Date,f=c.getYear(),c.setYear(f+5+(f<1900?1900:0))));if(b&&d!="NONE")return s.d.cookie=b+"="+s.escape(a!=""?a:"[[B]]")+"; path=/;"+(c&&d!="SESSION"?" expires="+c.toGMTString()+";":"")+(e?" domain="+e+";":""),s.cookieRead(b)==a;return 0};s.C=[];s.B=function(b,a,c){if(s.da)return 0;if(!s.maxDelay)s.maxDelay=250;var e=0,d=(new Date).getTime()+s.maxDelay,f=s.d.cb,g=["webkitvisibilitychange","visibilitychange"];if(!f)f=s.d.eb;
if(f&&f=="prerender"){if(!s.M){s.M=1;for(c=0;c<g.length;c++)s.d.addEventListener(g[c],function(){var b=s.d.cb;if(!b)b=s.d.eb;if(b=="visible")s.M=0,s.delayReady()})}e=1;d=0}else c||s.q("_d")&&(e=1);e&&(s.C.push({m:b,a:a,t:d}),s.M||setTimeout(s.delayReady,s.maxDelay));return e};s.delayReady=function(){var b=(new Date).getTime(),a=0,c;for(s.q("_d")&&(a=1);s.C.length>0;){c=s.C.shift();if(a&&!c.t&&c.t>b){s.C.unshift(c);setTimeout(s.delayReady,parseInt(s.maxDelay/2));break}s.da=1;s[c.m].apply(s,c.a);s.da=
0}};s.setAccount=s.sa=function(b){var a,c;if(!s.B("setAccount",arguments))if(s.account=b,s.allAccounts){a=s.allAccounts.concat(b.split(","));s.allAccounts=[];a.sort();for(c=0;c<a.length;c++)(c==0||a[c-1]!=a[c])&&s.allAccounts.push(a[c])}else s.allAccounts=b.split(",")};s.W=function(b,a,c,e,d){var f="",g,j,w,q,i=0;b=="contextData"&&(b="c");if(a){for(g in a)if(!Object.prototype[g]&&(!d||g.substring(0,d.length)==d)&&a[g]&&(!c||c.indexOf(","+(e?e+".":"")+g+",")>=0)){w=!1;if(i)for(j=0;j<i.length;j++)g.substring(0,
i[j].length)==i[j]&&(w=!0);if(!w&&(f==""&&(f+="&"+b+"."),j=a[g],d&&(g=g.substring(d.length)),g.length>0))if(w=g.indexOf("."),w>0)j=g.substring(0,w),w=(d?d:"")+j+".",i||(i=[]),i.push(w),f+=s.W(j,a,c,e,w);else if(typeof j=="boolean"&&(j=j?"true":"false"),j){if(e=="retrieveLightData"&&d.indexOf(".contextData.")<0)switch(w=g.substring(0,4),q=g.substring(4),g){case "transactionID":g="xact";break;case "channel":g="ch";break;case "campaign":g="v0";break;default:s.ja(q)&&(w=="prop"?g="c"+q:w=="eVar"?g="v"+
q:w=="list"?g="l"+q:w=="hier"&&(g="h"+q,j=j.substring(0,255)))}f+="&"+s.escape(g)+"="+s.escape(j)}}f!=""&&(f+="&."+b)}return f};s.La=function(){var b="",a,c,e,d,f,g,j,w,i="",k="",m=c="";if(s.lightProfileID)a=s.P,(i=s.lightTrackVars)&&(i=","+i+","+s.ma.join(",")+",");else{a=s.e;if(s.pe||s.linkType)if(i=s.linkTrackVars,k=s.linkTrackEvents,s.pe&&(c=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1),s[c]))i=s[c].pb,k=s[c].ob;i&&(i=","+i+","+s.H.join(",")+",");k&&(k=","+k+",",i&&(i+=",events,"));s.events2&&
(m+=(m!=""?",":"")+s.events2)}for(c=0;c<a.length;c++){d=a[c];f=s[d];e=d.substring(0,4);g=d.substring(4);!f&&d=="events"&&m&&(f=m,m="");if(f&&(!i||i.indexOf(","+d+",")>=0)){switch(d){case "timestamp":d="ts";break;case "dynamicVariablePrefix":d="D";break;case "visitorID":d="vid";break;case "marketingCloudVisitorID":d="mid";break;case "analyticsVisitorID":d="aid";break;case "audienceManagerVisitorID":d="aamid";break;case "audienceManagerLocationHint":d="aamlh";break;case "pageURL":d="g";if(f.length>
255)s.pageURLRest=f.substring(255),f=f.substring(0,255);break;case "pageURLRest":d="-g";break;case "referrer":d="r";break;case "vmk":case "visitorMigrationKey":d="vmt";break;case "visitorMigrationServer":d="vmf";s.ssl&&s.visitorMigrationServerSecure&&(f="");break;case "visitorMigrationServerSecure":d="vmf";!s.ssl&&s.visitorMigrationServer&&(f="");break;case "charSet":d="ce";break;case "visitorNamespace":d="ns";break;case "cookieDomainPeriods":d="cdp";break;case "cookieLifetime":d="cl";break;case "variableProvider":d=
"vvp";break;case "currencyCode":d="cc";break;case "channel":d="ch";break;case "transactionID":d="xact";break;case "campaign":d="v0";break;case "resolution":d="s";break;case "colorDepth":d="c";break;case "javascriptVersion":d="j";break;case "javaEnabled":d="v";break;case "cookiesEnabled":d="k";break;case "browserWidth":d="bw";break;case "browserHeight":d="bh";break;case "connectionType":d="ct";break;case "homepage":d="hp";break;case "plugins":d="p";break;case "events":m&&(f+=(f!=""?",":"")+m);if(k){g=
f.split(",");f="";for(e=0;e<g.length;e++)j=g[e],w=j.indexOf("="),w>=0&&(j=j.substring(0,w)),w=j.indexOf(":"),w>=0&&(j=j.substring(0,w)),k.indexOf(","+j+",")>=0&&(f+=(f?",":"")+g[e])}break;case "events2":f="";break;case "contextData":b+=s.W("c",s[d],i,d);f="";break;case "lightProfileID":d="mtp";break;case "lightStoreForSeconds":d="mtss";s.lightProfileID||(f="");break;case "lightIncrementBy":d="mti";s.lightProfileID||(f="");break;case "retrieveLightProfiles":d="mtsr";break;case "deleteLightProfiles":d=
"mtsd";break;case "retrieveLightData":s.retrieveLightProfiles&&(b+=s.W("mts",s[d],i,d));f="";break;default:s.ja(g)&&(e=="prop"?d="c"+g:e=="eVar"?d="v"+g:e=="list"?d="l"+g:e=="hier"&&(d="h"+g,f=f.substring(0,255)))}f&&(b+="&"+d+"="+(d.substring(0,3)!="pev"?s.escape(f):f))}d=="pev3"&&s.g&&(b+=s.g)}return b};s.u=function(s){var a=s.tagName;if(""+s.nb!="undefined"||""+s.Xa!="undefined"&&(""+s.Xa).toUpperCase()!="HTML")return"";a=a&&a.toUpperCase?a.toUpperCase():"";a=="SHAPE"&&(a="");a&&((a=="INPUT"||
a=="BUTTON")&&s.type&&s.type.toUpperCase?a=s.type.toUpperCase():!a&&s.href&&(a="A"));return a};s.fa=function(s){var a=s.href?s.href:"",c,e,d;c=a.indexOf(":");e=a.indexOf("?");d=a.indexOf("/");if(a&&(c<0||e>=0&&c>e||d>=0&&c>d))e=s.protocol&&s.protocol.length>1?s.protocol:l.protocol?l.protocol:"",c=l.pathname.lastIndexOf("/"),a=(e?e+"//":"")+(s.host?s.host:l.host?l.host:"")+(h.substring(0,1)!="/"?l.pathname.substring(0,c<0?0:c)+"/":"")+a;return a};s.D=function(b){var a=s.u(b),c,e,d="",f=0;if(a){c=b.protocol;
e=b.onclick;if(b.href&&(a=="A"||a=="AREA")&&(!e||!c||c.toLowerCase().indexOf("javascript")<0))d=s.fa(b);else if(e)d=s.replace(s.replace(s.replace(s.replace(""+e,"\r",""),"\n",""),"\t","")," ",""),f=2;else if(a=="INPUT"||a=="SUBMIT"){if(b.value)d=b.value;else if(b.innerText)d=b.innerText;else if(b.textContent)d=b.textContent;f=3}else if(b.src&&a=="IMAGE")d=b.src;if(d)return{id:d.substring(0,100),type:f}}return 0};s.kb=function(b){for(var a=s.u(b),c=s.D(b);b&&!c&&a!="BODY";)if(b=b.parentElement?b.parentElement:
b.parentNode)a=s.u(b),c=s.D(b);if(!c||a=="BODY")b=0;if(b&&(a=b.onclick?""+b.onclick:"",a.indexOf(".tl(")>=0||a.indexOf(".trackLink(")>=0))b=0;return b};s.Va=function(){var b,a,c=s.linkObject,e=s.linkType,d=s.linkURL,f,g;s.Q=1;if(!c)s.Q=0,c=s.j;if(c){b=s.u(c);for(a=s.D(c);c&&!a&&b!="BODY";)if(c=c.parentElement?c.parentElement:c.parentNode)b=s.u(c),a=s.D(c);if(!a||b=="BODY")c=0;if(c){var j=c.onclick?""+c.onclick:"";if(j.indexOf(".tl(")>=0||j.indexOf(".trackLink(")>=0)c=0}}else s.Q=1;!d&&c&&(d=s.fa(c));
d&&!s.linkLeaveQueryString&&(f=d.indexOf("?"),f>=0&&(d=d.substring(0,f)));if(!e&&d){var i=0,k=0,m;if(s.trackDownloadLinks&&s.linkDownloadFileTypes){j=d.toLowerCase();f=j.indexOf("?");g=j.indexOf("#");f>=0?g>=0&&g<f&&(f=g):f=g;f>=0&&(j=j.substring(0,f));f=s.linkDownloadFileTypes.toLowerCase().split(",");for(g=0;g<f.length;g++)(m=f[g])&&j.substring(j.length-(m.length+1))=="."+m&&(e="d")}if(s.trackExternalLinks&&!e&&(j=d.toLowerCase(),s.ia(j))){if(!s.linkInternalFilters)s.linkInternalFilters=w.location.hostname;
f=0;s.linkExternalFilters?(f=s.linkExternalFilters.toLowerCase().split(","),i=1):s.linkInternalFilters&&(f=s.linkInternalFilters.toLowerCase().split(","));if(f){for(g=0;g<f.length;g++)m=f[g],j.indexOf(m)>=0&&(k=1);k?i&&(e="e"):i||(e="e")}}}s.linkObject=c;s.linkURL=d;s.linkType=e;if(s.trackClickMap||s.trackInlineStats)if(s.g="",c){e=s.pageName;d=1;c=c.sourceIndex;if(!e)e=s.pageURL,d=0;if(w.s_objectID)a.id=w.s_objectID,c=a.type=1;if(e&&a&&a.id&&b)s.g="&pid="+s.escape(e.substring(0,255))+(d?"&pidt="+
d:"")+"&oid="+s.escape(a.id.substring(0,100))+(a.type?"&oidt="+a.type:"")+"&ot="+b+(c?"&oi="+c:"")}};s.Ma=function(){var b=s.Q,a=s.linkType,c=s.linkURL,e=s.linkName;if(a&&(c||e))a=a.toLowerCase(),a!="d"&&a!="e"&&(a="o"),s.pe="lnk_"+a,s.pev1=c?s.escape(c):"",s.pev2=e?s.escape(e):"",b=1;s.abort&&(b=0);if(s.trackClickMap||s.trackInlineStats){a={};c=0;var d=s.cookieRead("s_sq"),f=d?d.split("&"):0,g,j,w;d=0;if(f)for(g=0;g<f.length;g++)j=f[g].split("="),e=s.unescape(j[0]).split(","),j=s.unescape(j[1]),
a[j]=e;e=s.account.split(",");if(b||s.g){b&&!s.g&&(d=1);for(j in a)if(!Object.prototype[j])for(g=0;g<e.length;g++){d&&(w=a[j].join(","),w==s.account&&(s.g+=(j.charAt(0)!="&"?"&":"")+j,a[j]=[],c=1));for(f=0;f<a[j].length;f++)w=a[j][f],w==e[g]&&(d&&(s.g+="&u="+s.escape(w)+(j.charAt(0)!="&"?"&":"")+j+"&u=0"),a[j].splice(f,1),c=1)}b||(c=1);if(c){d="";g=2;!b&&s.g&&(d=s.escape(e.join(","))+"="+s.escape(s.g),g=1);for(j in a)!Object.prototype[j]&&g>0&&a[j].length>0&&(d+=(d?"&":"")+s.escape(a[j].join(","))+
"="+s.escape(j),g--);s.cookieWrite("s_sq",d)}}}return b};s.Na=function(){if(!s.bb){var b=new Date,a=m.location,c,e,d,f=d=e=c="",g="",w="",i="1.2",k=s.cookieWrite("s_cc","true",0)?"Y":"N",n="",p="",o=0;if(b.setUTCDate&&(i="1.3",o.toPrecision&&(i="1.5",c=[],c.forEach))){i="1.6";d=0;e={};try{d=new Iterator(e),d.next&&(i="1.7",c.reduce&&(i="1.8",i.trim&&(i="1.8.1",Date.parse&&(i="1.8.2",Object.create&&(i="1.8.5")))))}catch(r){}}c=screen.width+"x"+screen.height;d=navigator.javaEnabled()?"Y":"N";e=screen.pixelDepth?
screen.pixelDepth:screen.colorDepth;g=s.w.innerWidth?s.w.innerWidth:s.d.documentElement.offsetWidth;w=s.w.innerHeight?s.w.innerHeight:s.d.documentElement.offsetHeight;b=navigator.plugins;try{s.b.addBehavior("#default#homePage"),n=s.b.lb(a)?"Y":"N"}catch(t){}try{s.b.addBehavior("#default#clientCaps"),p=s.b.connectionType}catch(u){}if(b)for(;o<b.length&&o<30;){if(a=b[o].name)a=a.substring(0,100)+";",f.indexOf(a)<0&&(f+=a);o++}s.resolution=c;s.colorDepth=e;s.javascriptVersion=i;s.javaEnabled=d;s.cookiesEnabled=
k;s.browserWidth=g;s.browserHeight=w;s.connectionType=p;s.homepage=n;s.plugins=f;s.bb=1}};s.G={};s.loadModule=function(b,a){var c=s.G[b];if(!c){c=w["AppMeasurement_Module_"+b]?new w["AppMeasurement_Module_"+b](s):{};s.G[b]=s[b]=c;c.ua=function(){return c.wa};c.xa=function(a){if(c.wa=a)s[b+"_onLoad"]=a,s.B(b+"_onLoad",[s,c],1)||a(s,c)};try{Object.defineProperty?Object.defineProperty(c,"onLoad",{get:c.ua,set:c.xa}):c._olc=1}catch(e){c._olc=1}}a&&(s[b+"_onLoad"]=a,s.B(b+"_onLoad",[s,c],1)||a(s,c))};
s.q=function(b){var a,c;for(a in s.G)if(!Object.prototype[a]&&(c=s.G[a])){if(c._olc&&c.onLoad)c._olc=0,c.onLoad(s,c);if(c[b]&&c[b]())return 1}return 0};s.Qa=function(){var b=Math.floor(Math.random()*1E13),a=s.visitorSampling,c=s.visitorSamplingGroup;c="s_vsn_"+(s.visitorNamespace?s.visitorNamespace:s.account)+(c?"_"+c:"");var e=s.cookieRead(c);if(a){e&&(e=parseInt(e));if(!e){if(!s.cookieWrite(c,b))return 0;e=b}if(e%1E4>v)return 0}return 1};s.I=function(b,a){var c,e,d,f,g,w;for(c=0;c<2;c++){e=c>0?
s.$:s.e;for(d=0;d<e.length;d++)if(f=e[d],(g=b[f])||b["!"+f]){if(!a&&(f=="contextData"||f=="retrieveLightData")&&s[f])for(w in s[f])g[w]||(g[w]=s[f][w]);s[f]=g}}};s.qa=function(b,a){var c,e,d,f;for(c=0;c<2;c++){e=c>0?s.$:s.e;for(d=0;d<e.length;d++)f=e[d],b[f]=s[f],!a&&!b[f]&&(b["!"+f]=1)}};s.Ia=function(s){var a,c,e,d,f,g=0,w,i="",k="";if(s&&s.length>255&&(a=""+s,c=a.indexOf("?"),c>0&&(w=a.substring(c+1),a=a.substring(0,c),d=a.toLowerCase(),e=0,d.substring(0,7)=="http://"?e+=7:d.substring(0,8)=="https://"&&
(e+=8),c=d.indexOf("/",e),c>0&&(d=d.substring(e,c),f=a.substring(c),a=a.substring(0,c),d.indexOf("google")>=0?g=",q,ie,start,search_key,word,kw,cd,":d.indexOf("yahoo.co")>=0&&(g=",p,ei,"),g&&w)))){if((s=w.split("&"))&&s.length>1){for(e=0;e<s.length;e++)d=s[e],c=d.indexOf("="),c>0&&g.indexOf(","+d.substring(0,c)+",")>=0?i+=(i?"&":"")+d:k+=(k?"&":"")+d;i&&k?w=i+"&"+k:k=""}c=253-(w.length-k.length)-a.length;s=a+(c>0?f.substring(0,c):"")+"?"+w}return s};s.za=!1;s.Z=!1;s.ib=function(b){s.marketingCloudVisitorID=
b;s.Z=!0;s.z()};s.J=!1;s.X=!1;s.ta=function(b){s.analyticsVisitorID=b;s.X=!0;s.z()};s.ya=!1;s.Y=!1;s.hb=function(b){s.audienceManagerVisitorID=b;if(s.audienceManagerVisitorID&&s.visitor.getAudienceManagerLocationHint)s.audienceManagerLocationHint=s.visitor.getAudienceManagerLocationHint();s.Y=!0;s.z()};s.isReadyToTrack=function(){var b=!0,a=s.visitor;if(a&&a.isAllowed()){if(!s.J&&!s.analyticsVisitorID&&a.getAnalyticsVisitorID&&(s.analyticsVisitorID=a.getAnalyticsVisitorID([s,s.ta]),!s.analyticsVisitorID))s.J=
!0;if(s.za&&!s.Z&&!s.marketingCloudVisitorID||s.J&&!s.X&&!s.analyticsVisitorID||s.ya&&!s.Y&&!s.audienceManagerVisitorID)b=!1}return b};s.k=k;s.l=0;s.callbackWhenReadyToTrack=function(b,a,c){var e;e={};e.Da=b;e.Ca=a;e.Aa=c;if(s.k==k)s.k=[];s.k.push(e);if(s.l==0)s.l=setInterval(s.z,100)};s.z=function(){var b;if(s.isReadyToTrack()){if(s.l)clearInterval(s.l),s.l=0;if(s.k!=k)for(;s.k.length>0;)b=s.k.shift(),b.Ca.apply(b.Da,b.Aa)}};s.va=function(b){var a,c,e=k,d=k;if(!s.isReadyToTrack()){a=[];if(b!=k)for(c in e=
{},b)e[c]=b[c];d={};s.qa(d,!0);a.push(e);a.push(d);s.callbackWhenReadyToTrack(s,s.track,a);return!0}return!1};s.Ka=function(){var b=s.cookieRead("s_fid"),a="",c="",e;e=8;var d=4;if(!b||b.indexOf("-")<0){for(b=0;b<16;b++)e=Math.floor(Math.random()*e),a+="0123456789ABCDEF".substring(e,e+1),e=Math.floor(Math.random()*d),c+="0123456789ABCDEF".substring(e,e+1),e=d=16;b=a+"-"+c}s.cookieWrite("s_fid",b,1)||(b=0);return b};s.t=s.track=function(b,a){var c,e=new Date,d="s"+Math.floor(e.getTime()/108E5)+
Math.floor(Math.random()*1E13),f=e.getYear();f="t="+s.escape(e.getDate()+"/"+e.getMonth()+"/"+(f<1900?f+1900:f)+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()+" "+e.getDay()+" "+e.getTimezoneOffset());s.q("_s");if(!s.B("track",arguments)){if(!s.va(b)){a&&s.I(a);b&&(c={},s.qa(c,0),s.I(b));if(s.Qa()){if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.Ka();s.Va();s.usePlugins&&s.doPlugins&&s.doPlugins(s);if(s.account){if(!s.abort){if(s.trackOffline&&!s.timestamp)s.timestamp=Math.floor(e.getTime()/
1E3);e=w.location;if(!s.pageURL)s.pageURL=e.href?e.href:e;if(!s.referrer&&!s.ra)s.referrer=m.document.referrer,s.ra=1;s.referrer=s.Ia(s.referrer);s.q("_g")}s.Ma()&&!s.abort&&(s.Na(),f+=s.La(),s.Ua(d,f));s.abort||s.q("_t")}}b&&s.I(c,1)}s.timestamp=s.linkObject=s.j=s.linkURL=s.linkName=s.linkType=w.mb=s.pe=s.pev1=s.pev2=s.pev3=s.g=0}};s.tl=s.trackLink=function(b,a,c,e,d){s.linkObject=b;s.linkType=a;s.linkName=c;if(d)s.i=b,s.p=d;return s.track(e)};s.trackLight=function(b,a,c,e){s.lightProfileID=b;s.lightStoreForSeconds=
a;s.lightIncrementBy=c;return s.track(e)};s.clearVars=function(){var b,a;for(b=0;b<s.e.length;b++)if(a=s.e[b],a.substring(0,4)=="prop"||a.substring(0,4)=="eVar"||a.substring(0,4)=="hier"||a.substring(0,4)=="list"||a=="channel"||a=="events"||a=="eventList"||a=="products"||a=="productList"||a=="purchaseID"||a=="transactionID"||a=="state"||a=="zip"||a=="campaign")s[a]=void 0};s.Ua=function(b,a){var c,e=s.trackingServer;c="";var d=s.dc,f="sc.",w=s.visitorNamespace;if(e){if(s.trackingServerSecure&&s.ssl)e=
s.trackingServerSecure}else{if(!w)w=s.account,e=w.indexOf(","),e>=0&&(w=w.gb(0,e)),w=w.replace(/[^A-Za-z0-9]/g,"");c||(c="2o7.net");d=d?(""+d).toLowerCase():"d1";c=="2o7.net"&&(d=="d1"?d="112":d=="d2"&&(d="122"),f="");e=w+"."+d+"."+f+c}c=s.ssl?"https://":"http://";c+=e+"/b/ss/"+s.account+"/"+(s.mobile?"5.":"")+"1/JS-"+s.version+(s.ab?"T":"")+"/"+b+"?AQB=1&ndh=1&"+a+"&AQE=1";s.Pa&&(c=c.substring(0,2047));s.Ga(c);s.N()};s.Ga=function(b){s.c||s.Oa();s.c.push(b);s.O=s.r();s.pa()};s.Oa=function(){s.c=
s.Ra();if(!s.c)s.c=[]};s.Ra=function(){var b,a;if(s.T()){try{(a=w.localStorage.getItem(s.R()))&&(b=w.JSON.parse(a))}catch(c){}return b}};s.T=function(){var b=!0;if(!s.trackOffline||!s.offlineFilename||!w.localStorage||!w.JSON)b=!1;return b};s.ga=function(){var b=0;if(s.c)b=s.c.length;s.v&&b++;return b};s.N=function(){if(!s.v)if(s.ha=k,s.S)s.O>s.F&&s.na(s.c),s.V(500);else{var b=s.Ba();if(b>0)s.V(b);else if(b=s.ea())s.v=1,s.Ta(b),s.Ya(b)}};s.V=function(b){if(!s.ha)b||(b=0),s.ha=setTimeout(s.N,b)};s.Ba=
function(){var b;if(!s.trackOffline||s.offlineThrottleDelay<=0)return 0;b=s.r()-s.la;if(s.offlineThrottleDelay<b)return 0;return s.offlineThrottleDelay-b};s.ea=function(){if(s.c.length>0)return s.c.shift()};s.Ta=function(b){if(s.debugTracking){var a="AppMeasurement Debug: "+b;b=b.split("&");var c;for(c=0;c<b.length;c++)a+="\n\t"+s.unescape(b[c]);s.Sa(a)}};s.Ya=function(b){var a;if(!a)a=new Image,a.alt="";a.ba=function(){try{if(s.U)clearTimeout(s.U),s.U=0;if(a.timeout)clearTimeout(a.timeout),a.timeout=
0}catch(b){}};a.onload=a.$a=function(){a.ba();s.Fa();s.K();s.v=0;s.N()};a.onabort=a.onerror=a.Ha=function(){a.ba();(s.trackOffline||s.S)&&s.v&&s.c.unshift(s.Ea);s.v=0;s.O>s.F&&s.na(s.c);s.K();s.V(500)};a.onreadystatechange=function(){a.readyState==4&&(a.status==200?a.$a():a.Ha())};s.la=s.r();a.src=b;if(a.abort)s.U=setTimeout(a.abort,5E3);s.Ea=b;s.jb=w["s_i_"+s.replace(s.account,",","_")]=a;if(s.useForcedLinkTracking&&s.A||s.p){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;s.L=setTimeout(s.K,
s.forcedLinkTrackingTimeout)}};s.Fa=function(){if(s.T()&&!(s.ka>s.F))try{w.localStorage.removeItem(s.R()),s.ka=s.r()}catch(b){}};s.na=function(b){if(s.T()){s.pa();try{w.localStorage.setItem(s.R(),w.JSON.stringify(b)),s.F=s.r()}catch(a){}}};s.pa=function(){if(s.trackOffline){if(!s.offlineLimit||s.offlineLimit<=0)s.offlineLimit=10;for(;s.c.length>s.offlineLimit;)s.ea()}};s.forceOffline=function(){s.S=!0};s.forceOnline=function(){s.S=!1};s.R=function(){return s.offlineFilename+"-"+s.visitorNamespace+
s.account};s.r=function(){return(new Date).getTime()};s.ia=function(s){s=s.toLowerCase();if(s.indexOf("#")!=0&&s.indexOf("about:")!=0&&s.indexOf("opera:")!=0&&s.indexOf("javascript:")!=0)return!0;return!1};s.setTagContainer=function(b){var a,c,e;s.ab=b;for(a=0;a<s._il.length;a++)if((c=s._il[a])&&c._c=="s_l"&&c.tagContainerName==b){s.I(c);if(c.lmq)for(a=0;a<c.lmq.length;a++)e=c.lmq[a],s.loadModule(e.n);if(c.ml)for(e in c.ml)if(s[e])for(a in b=s[e],e=c.ml[e],e)if(!Object.prototype[a]&&(typeof e[a]!=
"function"||(""+e[a]).indexOf("s_c_il")<0))b[a]=e[a];if(c.mmq)for(a=0;a<c.mmq.length;a++)e=c.mmq[a],s[e.m]&&(b=s[e.m],b[e.f]&&typeof b[e.f]=="function"&&(e.a?b[e.f].apply(b,e.a):b[e.f].apply(b)));if(c.tq)for(a=0;a<c.tq.length;a++)s.track(c.tq[a]);c.s=s;break}};s.Util={urlEncode:s.escape,urlDecode:s.unescape,cookieRead:s.cookieRead,cookieWrite:s.cookieWrite,getQueryParam:function(b,a,c){var e;a||(a=s.pageURL?s.pageURL:w.location);c||(c="&");if(b&&a&&(a=""+a,e=a.indexOf("?"),e>=0&&(a=c+a.substring(e+
1)+c,e=a.indexOf(c+b+"="),e>=0&&(a=a.substring(e+c.length+b.length+1),e=a.indexOf(c),e>=0&&(a=a.substring(0,e)),a.length>0))))return s.unescape(a);return""}};s.H=["timestamp","dynamicVariablePrefix","visitorID","marketingCloudVisitorID","analyticsVisitorID","audienceManagerVisitorID","audienceManagerLocationHint","fid","vmk","visitorMigrationKey","visitorMigrationServer","visitorMigrationServerSecure","charSet","visitorNamespace","cookieDomainPeriods","fpCookieDomainPeriods","cookieLifetime","pageName",
"pageURL","referrer","contextData","currencyCode","lightProfileID","lightStoreForSeconds","lightIncrementBy","retrieveLightProfiles","deleteLightProfiles","retrieveLightData","pe","pev1","pev2","pev3","pageURLRest"];s.e=s.H.concat(["purchaseID","variableProvider","channel","server","pageType","transactionID","campaign","state","zip","events","events2","products","tnt"]);s.ma=["timestamp","charSet","visitorNamespace","cookieDomainPeriods","cookieLifetime","contextData","lightProfileID","lightStoreForSeconds",
"lightIncrementBy"];s.P=s.ma.slice(0);s.$=["account","allAccounts","debugTracking","visitor","trackOffline","offlineLimit","offlineThrottleDelay","offlineFilename","usePlugins","doPlugins","configURL","visitorSampling","s.visitorSamplingGroup","linkObject","linkURL","linkName","linkType","trackDownloadLinks","trackExternalLinks","trackClickMap","trackInlineStats","linkLeaveQueryString","linkTrackVars","linkTrackEvents","linkDownloadFileTypes","linkExternalFilters","linkInternalFilters","useForcedLinkTracking",
"forcedLinkTrackingTimeout","trackingServer","trackingServerSecure","ssl","abort","mobile","dc","lightTrackVars","maxDelay"];for(i=0;i<=75;i++)s.e.push("prop"+i),s.P.push("prop"+i),s.e.push("eVar"+i),s.P.push("eVar"+i),i<6&&s.e.push("hier"+i),i<4&&s.e.push("list"+i);i=["resolution","colorDepth","javascriptVersion","javaEnabled","cookiesEnabled","browserWidth","browserHeight","connectionType","homepage","plugins"];s.e=s.e.concat(i);s.H=s.H.concat(i);s.ssl=w.location.protocol.toLowerCase().indexOf("https")>=
0;s.charSet="UTF-8";s.contextData={};s.offlineThrottleDelay=0;s.offlineFilename="AppMeasurement.offline";s.la=0;s.O=0;s.F=0;s.ka=0;s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";s.w=w;s.d=w.document;try{s.Pa=navigator.appName=="Microsoft Internet Explorer"}catch(o){}s.K=function(){if(s.L)w.clearTimeout(s.L),s.L=k;s.i&&s.A&&s.i.dispatchEvent(s.A);if(s.p)if(typeof s.p=="function")s.p();else if(s.i&&s.i.href)s.d.location=s.i.href;s.i=s.A=s.p=0};s.oa=function(){s.b=
s.d.body;if(s.b)if(s.o=function(b){var a,c,e,d,f;if(!(s.d&&s.d.getElementById("cppXYctnr")||b&&b.Wa)){if(s.aa)if(s.useForcedLinkTracking)s.b.removeEventListener("click",s.o,!1);else{s.b.removeEventListener("click",s.o,!0);s.aa=s.useForcedLinkTracking=0;return}else s.useForcedLinkTracking=0;s.j=b.srcElement?b.srcElement:b.target;try{if(s.j&&(s.j.tagName||s.j.parentElement||s.j.parentNode))if(e=s.ga(),s.track(),e<s.ga()&&s.useForcedLinkTracking&&b.target){for(d=b.target;d&&d!=s.b&&d.tagName.toUpperCase()!=
"A"&&d.tagName.toUpperCase()!="AREA";)d=d.parentNode;if(d&&(f=d.href,s.ia(f)||(f=0),c=d.target,b.target.dispatchEvent&&f&&(!c||c=="_self"||c=="_top"||c=="_parent"||w.name&&c==w.name))){try{a=s.d.createEvent("MouseEvents")}catch(g){a=new w.MouseEvent}if(a){try{a.initMouseEvent("click",b.bubbles,b.cancelable,b.view,b.detail,b.screenX,b.screenY,b.clientX,b.clientY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,b.button,b.relatedTarget)}catch(i){a=0}if(a)a.Wa=1,b.stopPropagation(),b.Za&&b.Za(),b.preventDefault(),
s.i=b.target,s.A=a}}}}catch(k){}s.j=0}},s.b&&s.b.attachEvent)s.b.attachEvent("onclick",s.o);else{if(s.b&&s.b.addEventListener){if(navigator&&(navigator.userAgent.indexOf("WebKit")>=0&&s.d.createEvent||navigator.userAgent.indexOf("Firefox/2")>=0&&w.MouseEvent))s.aa=1,s.useForcedLinkTracking=1,s.b.addEventListener("click",s.o,!0);s.b.addEventListener("click",s.o,!1)}}else setTimeout(s.oa,30)};s.oa()}
function s_gi(s){var w,k=window.s_c_il,m,i=s.split(","),n,p,o=0;if(k)for(m=0;!o&&m<k.length;){w=k[m];if(w._c=="s_c"&&w.account)if(w.account==s)o=1;else{if(!w.allAccounts)w.allAccounts=w.account.split(",");for(n=0;n<i.length;n++)for(p=0;p<w.allAccounts.length;p++)i[n]==w.allAccounts[p]&&(o=1)}m++}o||(w=new AppMeasurement);w.setAccount(s);return w}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var s=window,w=s.s_giq,k,m,i;if(w)for(k=0;k<w.length;k++)m=w[k],i=s_gi(m.oun),i.setAccount(m.un),i.setTagContainer(m.tagContainerName);s.s_giq=0}s_pgicq();
