var s=new AppMeasurement();

s._channelDomain='social networks|facebook.com,linkedin.com,/t.co,twitter.com,plus.google.com,plus.url.google.com,pinterest.com,orkut.com,friendster.com,livejournal.com,blogspot.com,wordpress.com,friendfeed.com,myspace.com,digg.com,reddit.com'
+'stumbleupon.com,twine.com,yelp.com,mixx.com,delicious.com,tumblr.com,disqus.com,intensedebate.com,plurk.com,slideshare.net,backtype.com,netvibes.com,mister-wong.com,'
+'diigo.com,flixster.com,youtube.com,vimeo.com,12seconds.tv,zooomr.com,identi.ca,jaiku.com,flickr.com,imeem.com,dailymotion.com,photobucket.com,fotolog.com,smugmug.com,'
+'classmates.com,myyearbook.com,mylife.com,tagged.com,brightkite.com,ning.com,bebo.com,hi5.com,yuku.com,cafemom.com,xanga.com>'
+'comparison shopping engines|pricegrabber.com,shopping.com,nextag.com>'
+'natural email|mail.live.com,mail.yahoo.com,mail.google.com,mail.comcast.net,mail.verizon.com,mail.aol.com';

s._channelParameter="Email|EML,EMA>SEM|SEM,PLA,PPC>CPA|Affliliate>CPM|Display,CAFGL";

/* Plugin Config */
s.usePlugins=true;

function s_doPlugins(s) {  
  if(s.channel && s.channel=='error')
    s.pageType='404';
  if(typeof universal_variable.events !== 'undefined' && universal_variable.events !== null){    
    for(var i=0; i<universal_variable.events.length; i++){
    	if(typeof universal_variable.events[i].action !== 'undefined'){
          if(universal_variable.events[i].action == 'loginSuccess')
            s.events = s.apl(s.events, 'event6', ',', 2);
        	if(universal_variable.events[i].action == 'accountCreation' || universal_variable.events[i].action == 'actionCreation')
            s.events = s.apl(s.events, 'event7', ',', 2);
  				if(universal_variable.events[i].action == "storeLocatorResults")
    				s.events = s.apl(s.events, 'event9', ',', 2);
    			if(universal_variable.events[i].action == "storeLocatorNoResults")
  					s.events = s.apl(s.events, 'event10', ',', 2);
   				if(universal_variable.events[i].action == "viewStoreLocator")
            s.events = s.apl(s.events, 'event8', ',', 2);
        if(universal_variable.events[i].action == "emailSignUp")
            s.events = s.apl(s.events, 'event11', ',', 2);
  		}
    }
  }
  /*if(s.eVar9=='undefined' || s.eVar9 == '')
  	s.eVar9='no PSFM';
	 if(s.eVar8=='undefined' || s.eVar8 == '')
  	s.eVar8='no PFM'; */
	s.prop16=s.getVisitNum(365);
  if(s.prop16)
    s.eVar16=s.prop16;
  s.prop17 = s.getNewRepeat();
  if(s.prop17)
    s.eVar17=s.prop17;
//US time parting configuration
s._tpDST = {
2012:'3/11,11/4',
2013:'3/10,11/3',
2014:'3/9,11/2',
2015:'3/8,11/1',
2016:'3/13,11/6',
2017:'3/12,11/5',
2018:'3/11,11/4',
2019:'3/10,11/3'}

/* getTimeParting set variables with different values */
var tpA = s.getTimeParting('s','-6');
s.prop21 = tpA[1]; // Time at 30 minute level
s.prop20 = tpA[2]; // Day of week
s.prop22 = tpA[3]; // Weekend or Weekday

  s.campaign=s.getQueryParam('cid');
  s.channelManager('cid,camp','','cmgvo','','s_dl','30');
//If a channel has returned and eVar21 hasn't been set on the page yet
if(s._channel&&!s.eVar12)
{
    //trim down the email referring domains.  Otherwise, you'll get a *LOT* of unnecessary duplicate domain entries from gmail, hotmail, yahoo! mail, etc.
    s.mailRef=s._referringDomain.indexOf('.mail.')
    if(s.mailRef>-1)
        s._referringDomain=s._referringDomain.substring(s.mailRef+1);
  	if(typeof s.campaign !== "undefined" && s.campaign !== "null"){
      if(s.campaign.toLowerCase().indexOf("eml")>-1 || s.campaign.toLowerCase().indexOf("ema")>-1)
         s._channel="email";
      if(s.campaign.toLowerCase().indexOf("sem")>-1 || s.campaign.toLowerCase().indexOf("pla")>-1 || s.campaign.toLowerCase().indexOf("ppc")>-1)
         s._channel="SEM";
      if(s.campaign.toLowerCase().indexOf("affiliate")>-1)
         s._channel="CPA";
      if(s.campaign.toLowerCase().indexOf("display")>-1 || s.campaign.toLowerCase().indexOf("cafgl")>-1)
         s._channel="CPM";
    }
    //set eVar12 equal to the channel.
    s.eVar12=s._channel;
    //Remove plus signs from keywords where plus signs weren't originally used
    if(s._keywords.indexOf('+')==0)
        s._keywords=s._keywords.replace('+','  ');
    s._keywords=s.repl(s._keywords,'+',' ');
    s._keywords=s.repl(s._keywords,'  ',' +').replace(/^\s+/,"");
  
  
    //Set the channel detail variables
    switch(s.eVar12)
    {
        case 'Paid Search':
            s.eVar31='Paid Search: '+s._partner+': '+s._keywords;
            break;
        case 'Natural Search':
            s.eVar31='Natural Search: '+s._partner+': ' + s._keywords;
            break;
        case 'Typed/Bookmarked':
            s.eVar31='Typed/Bookmarked: '+s.pageName;
            break;
        case 'Other Natural Referrers':
            s.eVar31='Other Natural Referrers: '+s._referringDomain;
            break;
        default:
            s.eVar31=s._campaignID!='n/a'?s._channel+': '+s._campaignID:s._channel+': '+s._referringDomain;            
    }
}
 
/* prepend keywords with either p| or n| in order to identify paid vs. natural keywords*/
if(s._channel=="Natural Search")
    s.eVar30=s._keywords="n|" + s._keywords;
else if(s._channel=="Paid Search")
    s.eVar29=s._keywords="p|" + s._keywords;
  
  /* channel stacking */
  if(!s.eVar13 && s.eVar12)s.eVar13=s.crossVisitParticipation(s.eVar12,'s_atx','7','5',' > ','','0');
}
s.doPlugins=s_doPlugins

/* PLUGINS SECTION */

/*
 * Utility: AppMeasurement Compatibility v1.1
 * Define deprecated H-code s properties and methods used by legacy plugins
 */
s.wd=window;
s.fl=new Function("x","l",""
+"return x?(''+x).substring(0,l):x");
s.pt=new Function("x","d","f","a",""
+"var s=this,t=x,z=0,y,r,l='length';while(t){y=t.indexOf(d);y=y<0?t[l"
+"]:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d[l];t=x.subs"
+"tring(z,x[l]);t=z<x[l]?t:''}return''");
s.rep=new Function("x","o","n",""
+"var a=new Array,i=0,j;if(x){if(x.split)a=x.split(o);else if(!o)for("
+"i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){"
+"j=x.indexOf(o,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i"
+">=0)i+=o.length}}x='';j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.joi"
+"n)x=a.join(n);else for(i=1;i<j;i++)x+=n+a[i]}}return x");
s.ape=new Function("x",""
+"var s=this,h='0123456789ABCDEF',f='+~!*()\\'',i,c=s.charSet,n,l,e,y"
+"='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComp"
+"onent(x);for(i=0;i<f.length;i++){n=f.substring(i,i+1);if(x.indexOf("
+"n)>=0)x=s.rep(x,n,'%'+n.charCodeAt(0).toString(16).toUpperCase())}}"
+"else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.sub"
+"string(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e="
+"h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='"
+"+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2"
+"B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0)"
+"{i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.subst"
+"ring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.subst"
+"ring(i);i=x.indexOf('%',i)}}}return x");
s.epa=new Function("x",""
+"var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Fu"
+"nction('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape"
+"(x)}return y');return tcf(x)}else return unescape(x)}return y");
s.parseUri=new Function("u",""
+"if(u){u=u+'';u=u.indexOf(':')<0&&u.indexOf('//')!=0?(u.indexOf('/')"
+"==0?'/':'//')+u:u}u=u?u+'':window.location.href;var e,a=document.cr"
+"eateElement('a'),l=['href','protocol','host','hostname','port','pat"
+"hname','search','hash'],p,r={href:u,toString:function(){return this"
+".href}};a.setAttribute('href',u);for(e=1;e<l.length;e++){p=l[e];r[p"
+"]=a[p]||''}delete a;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathnam"
+"e='/'+p;return r");
s.gtfs=new Function(""
+"var w=window,l=w.location,d=document,u;if(!l.origin)l.origin=l.prot"
+"ocol+'//'+l.hostname+(l.port?':'+l.port:'');u=l!=w.parent.location?"
+"d.referrer:d.location;return{location:s.parseUri(u)}");
/*                                                                 
   * Plugin: getVisitNum - version 3.0
   */
   s.getVisitNum=new Function("tp","c","c2",""
  +"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
  +"if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
  +"me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
  +"c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
  +"'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
  +"t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
  +"e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
  +"ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
  +"s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)"
  +";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
  s.dimo=new Function("m","y",""
  +"var d=new Date(y,m+1,0);return d.getDate();");
  s.endof=new Function("x",""
  +"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
  +"'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
  +"x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
  +"t;");
/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
/*
	* Plugin Utility: apl v1.1
	*/
	s.apl=new Function("l","v","d","u",""
	+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
	+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
	+"e()));}}if(!m)l=l?l+d+v:v;return l"); 
/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin: getTimeParting 3.3
 */
s.getTimeParting=new Function("h","z",""
+"var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont"
+"h()!=0){return'Data Not Available';}else{var H,M,D,W,U,ds,de,tm,tt,"
+"da=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Sa"
+"turday'],d=new Date(),a=[];z=z?z:0;z=parseFloat(z);if(s._tpDST){var"
+" dso=s._tpDST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d."
+"getFullYear());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d"
+">ds&&d<de){z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime"
+"()+(d.getTimezoneOffset()*60000);d=new Date(d+(3600000*z));H=d.getH"
+"ours();M=d.getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U='AM';W='Wee"
+"kday';if(H>=12){U='PM';H=H-12;}if(H==0){H=12;}if(D==6||D==0){W='Wee"
+"kend';}D=da[D];tm=H+':'+M+U;tt=H+':'+((M>30)?'30':'00')+U;a=[tm,tt,"
+"D,W];return a;}");

/*
 * channelManager v3.0 - Tracking External Traffic
 */
s.channelManager=new Function("a","b","c","d","e","f","g",""
+"var s=this,h=new Date,i=0,j,k,l,m,n,o,p,q,r,t,u,v,w,x,y,z,A,B,C,D,E"
+",F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V;U=s.getQueryParam?1:0;V=s.repl?1"
+":0;h.setTime(h.getTime()+1800000);if(e){i=1;if(s.c_r(e))i=0;if(!s.c"
+"_w(e,1,h))s.c_w(e,1,0);if(!s.c_r(e))i=0;if(f&&s.c_r('s_tbm'+f))i=0;"
+"}j=s.referrer?s.referrer:document.referrer;j=decodeURIComponent(j.t"
+"oLowerCase());if(!j)k=1;else {l=j.indexOf('?')>-1?j.indexOf('?'):j."
+"length;m=j.substring(0,l);n=j.split('/');n=n[2].split('?');o=n[0].t"
+"oLowerCase();p=s.linkInternalFilters.toLowerCase();p=p.split(',');f"
+"or(q=0;q<p.length;q++){r=o.indexOf(p[q])==-1?'':j;if(r)break;}}if(!"
+"r&&!k){t=j;u=v=o;w='Other Natural Referrers';x=s.seList+'>'+s._extr"
+"aSearchEngines;if(d==1){m=V?s.repl(m,'oogle','%'):s.replace(m,'oogl"
+"e','%');m=V?s.repl(m,'ahoo','^'):s.replace(m,'ahoo','^');j=V?s.repl"
+"(j,'as_q','*'):s.replace(j,'as_q','*');}y=x.split('>');for(z=0;z<y."
+"length;z++){A=y[z];A=A.split('|');B=A[0].split(',');for(C=0;C<B.len"
+"gth;C++){D=m.indexOf(B[C]);if(D>-1){if(A[2])E=v=A[2];else E=o;if(d="
+"=1){E=V?s.repl(E,'#',' - '):s.replace(E,'#',' - ');j=V?s.repl(j,'*'"
+",'as_q'):s.replace(j,'*','as_q');E=V?s.repl(E,'^','ahoo'):s.replace"
+"(E,'^','ahoo');E=V?s.repl(E,'%','oogle'):s.replace(E,'%','oogle');}"
+"F=A[1].split(',');for(G=0;G<F.length;G++){if(j.indexOf(F[G]+'=')>-1"
+"||j.indexOf('https://www.google.')==0||j.indexOf('http://r.search.y"
+"ahoo.com')==0)H=1;I=U?s.getQueryParam(F[G],'',j).toLowerCase():s.Ut"
+"il.getQueryParam(F[G],j).toLowerCase();if(H||I)break;}}if(H||I)brea"
+"k;}if(H||I)break;}}if(!r||g!='1'){J=a.split(',');for(var q in J){if"
+"(J.hasOwnProperty(q)){if(U?s.getQueryParam(J[q]):s.Util.getQueryPar"
+"am(J[q])){T=T?T+b+(U?s.getQueryParam(J[q]):s.Util.getQueryParam(J[q"
+"])):(U?s.getQueryParam(J[q]):s.Util.getQueryParam(J[q]));}}}if(T){v"
+"=T;if(E)w='Paid Search';else w='Unknown Paid Channel';}if(!T&&E&&H)"
+"{v=E;w='Natural Search';}}if(i&&k&&!T)t=u=v=w='Typed/Bookmarked';J="
+"s._channelDomain;if(J&&o&&!r){K=J.split('>');for(L=0;L<K.length;L++"
+"){M=K[L]?K[L].split('|'):'';N=M[1]?M[1].split(','):'';O=N.length;fo"
+"r(P=0;P<O;P++){Q=N[P].toLowerCase();R=('/'+o).indexOf(Q);if(R>-1){w"
+"=M[0];break;}}if(R>-1)break;}}J=s._channelParameter;if(J){K=J.split"
+"('>');for(L=0;L<K.length;L++){M=K[L]?K[L].split('|'):'';N=M[1]?M[1]"
+".split(','):'';O=N.length;for(P=0;P<O;P++){R=U?s.getQueryParam(N[P]"
+"):s.Util.getQueryParam(N[P]);if(R){w=M[0];break;}}if(R)break;}}J=s."
+"_channelPattern;if(J){K=J.split('>');for(L=0;L<K.length;L++){M=K[L]"
+"?K[L].split('|'):'';N=M[1]?M[1].split(','):'';O=N.length;for(P=0;P<"
+"O;P++){Q=N[P].toLowerCase();R=T?T.toLowerCase():'';S=R.indexOf(Q);i"
+"f(S==0){w=M[0];break;}}if(S==0)break;}}S=w?T+u+w+I:'';c=c?c:'c_m';i"
+"f(c!='0')S=s.getValOnce(S,c,0);if(S){s._campaignID=T?T:'n/a';s._ref"
+"errer=t?t:'n/a';s._referringDomain=u?u:'n/a';s._campaign=v?v:'n/a';"
+"s._channel=w?w:'n/a';s._partner=E?E:'n/a';s._keywords=H?I?I:'Keywor"
+"d Unavailable':'n/a';if(f&&w!='Typed/Bookmarked'){h.setTime(h.getTi"
+"me()+f*86400000);s.c_w('s_tbm'+f,1,h);}}else s._campaignID=s._refer"
+"rer=s._referringDomain=s._campaign=s._channel=s._partner=s._keyword"
+"s='';");
/* Top 130 - Grouped */
s.seList="google.,googlesyndication.com,.googleadservices.com|q,as_q|"
+"Google>bing.com|q|Bing>yahoo.com,yahoo.co.jp|p,va|Yahoo!>ask.jp,ask"
+".co|q,ask|Ask>search.aol.,suche.aolsvc.de|q,query|AOL>altavista.co,"
+"altavista.de|q,r|AltaVista>.mywebsearch.com|searchfor|MyWebSearch>w"
+"ebcrawler.com|q|WebCrawler>wow.com|q|Wow>infospace.com|q|InfoSpace>"
+"blekko.com|q|Blekko>dogpile.com|q|DogPile>alhea.com|q|Alhea>goduckg"
+"o.com|q|GoDuckGo>info.com|qkw|Info.com>contenko.com|q|Contenko>baid"
+"u.com|word,wd|Baidu>daum.net,search.daum.net|q|Daum>icqit.com|q|icq"
+">myway.com|searchfor|MyWay.com>naver.com,search.naver.com|query|Nav"
+"er>netscape.com|query,search|Netscape Search>reference.com|q|Refere"
+"nce.com>seznam|w|Seznam.cz>abcsok.no|q|Startsiden>tiscali.it,www.ti"
+"scali.co.uk|key,query|Tiscali>virgilio.it|qs|Virgilio>yandex|text|Y"
+"andex.ru>optimum.net|q|Optimum Search>search.earthlink.net|q|Earthl"
+"ink>search.comcast.net|q|Comcast>libero.it|query|libero.it>excite.c"
+"o|search|Excite>mail.ru|q|Mail.ru>isearch.avg.com|q|AVG>msn.com|q|M"
+"SN>seznam.cz|q|seznam.cz>so.com|q|so.com>ixquick.com|query|ixquick."
+"com>sogou.com|query|sogou.com>360.cn|q|360.cn";

/*
 * Plugin: getValOnce_v1.11
 */
s.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");

/*
 * Plugin: getQueryParam 2.4
 */
s.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");

/*
 *  Plug-in: crossVisitParticipation v1.7 - stacks values from
 *  specified variable in cookie and returns value
 */
 
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");

/*
 * s.join: 1.0 - Joins an array into a string
 */
 
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

 AppMeasurement for JavaScript version: 1.3.2
 Copyright 1996-2013 Adobe, Inc. All Rights Reserved
 More info available at http://www.omniture.com
*/
function AppMeasurement(){var s=this;s.version="1.3.2";var w=window;if(!w.s_c_in)w.s_c_il=[],w.s_c_in=0;s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;s._c="s_c";var k=w.ob;k||(k=null);var j=w,g,o;try{g=j.parent;for(o=j.location;g&&g.location&&o&&""+g.location!=""+o&&j.location&&""+g.location!=""+j.location&&g.location.host==o.host;)j=g,g=j.parent}catch(p){}s.Za=function(s){try{console.log(s)}catch(a){}};s.oa=function(s){return""+parseInt(s)==""+s};s.replace=function(s,a,c){if(!s||s.indexOf(a)<
0)return s;return s.split(a).join(c)};s.escape=function(b){var a,c;if(!b)return b;b=encodeURIComponent(b);for(a=0;a<7;a++)c="+~!*()'".substring(a,a+1),b.indexOf(c)>=0&&(b=s.replace(b,c,"%"+c.charCodeAt(0).toString(16).toUpperCase()));return b};s.unescape=function(b){if(!b)return b;b=b.indexOf("+")>=0?s.replace(b,"+"," "):b;try{return decodeURIComponent(b)}catch(a){}return unescape(b)};s.Qa=function(){var b=w.location.hostname,a=s.fpCookieDomainPeriods,c;if(!a)a=s.cookieDomainPeriods;if(b&&!s.ha&&
!/^[0-9.]+$/.test(b)&&(a=a?parseInt(a):2,a=a>2?a:2,c=b.lastIndexOf("."),c>=0)){for(;c>=0&&a>1;)c=b.lastIndexOf(".",c-1),a--;s.ha=c>0?b.substring(c):b}return s.ha};s.c_r=s.cookieRead=function(b){b=s.escape(b);var a=" "+s.d.cookie,c=a.indexOf(" "+b+"="),e=c<0?c:a.indexOf(";",c);b=c<0?"":s.unescape(a.substring(c+2+b.length,e<0?a.length:e));return b!="[[B]]"?b:""};s.c_w=s.cookieWrite=function(b,a,c){var e=s.Qa(),d=s.cookieLifetime,f;a=""+a;d=d?(""+d).toUpperCase():"";c&&d!="SESSION"&&d!="NONE"&&((f=a!=
""?parseInt(d?d:0):-60)?(c=new Date,c.setTime(c.getTime()+f*1E3)):c==1&&(c=new Date,f=c.getYear(),c.setYear(f+5+(f<1900?1900:0))));if(b&&d!="NONE")return s.d.cookie=b+"="+s.escape(a!=""?a:"[[B]]")+"; path=/;"+(c&&d!="SESSION"?" expires="+c.toGMTString()+";":"")+(e?" domain="+e+";":""),s.cookieRead(b)==a;return 0};s.D=[];s.C=function(b,a,c){if(s.ia)return 0;if(!s.maxDelay)s.maxDelay=250;var e=0,d=(new Date).getTime()+s.maxDelay,f=s.d.mb,i=["webkitvisibilitychange","visibilitychange"];if(!f)f=s.d.nb;
if(f&&f=="prerender"){if(!s.V){s.V=1;for(c=0;c<i.length;c++)s.d.addEventListener(i[c],function(){var b=s.d.mb;if(!b)b=s.d.nb;if(b=="visible")s.V=0,s.delayReady()})}e=1;d=0}else c||s.r("_d")&&(e=1);e&&(s.D.push({m:b,a:a,t:d}),s.V||setTimeout(s.delayReady,s.maxDelay));return e};s.delayReady=function(){var b=(new Date).getTime(),a=0,c;for(s.r("_d")&&(a=1);s.D.length>0;){c=s.D.shift();if(a&&!c.t&&c.t>b){s.D.unshift(c);setTimeout(s.delayReady,parseInt(s.maxDelay/2));break}s.ia=1;s[c.m].apply(s,c.a);s.ia=
0}};s.setAccount=s.sa=function(b){var a,c;if(!s.C("setAccount",arguments))if(s.account=b,s.allAccounts){a=s.allAccounts.concat(b.split(","));s.allAccounts=[];a.sort();for(c=0;c<a.length;c++)(c==0||a[c-1]!=a[c])&&s.allAccounts.push(a[c])}else s.allAccounts=b.split(",")};s.foreachVar=function(b,a){var c,e,d,f,i="";d=e="";if(s.lightProfileID)c=s.H,(i=s.lightTrackVars)&&(i=","+i+","+s.Y.join(",")+",");else{c=s.c;if(s.pe||s.linkType)if(i=s.linkTrackVars,e=s.linkTrackEvents,s.pe&&(d=s.pe.substring(0,1).toUpperCase()+
s.pe.substring(1),s[d]))i=s[d].lb,e=s[d].kb;i&&(i=","+i+","+s.A.join(",")+",");e&&i&&(i+=",events,")}a&&(a=","+a+",");for(e=0;e<c.length;e++)d=c[e],(f=s[d])&&(!i||i.indexOf(","+d+",")>=0)&&(!a||a.indexOf(","+d+",")>=0)&&b(d,f)};s.J=function(b,a,c,e,d){var f="",i,m,w,q,g=0;b=="contextData"&&(b="c");if(a){for(i in a)if(!Object.prototype[i]&&(!d||i.substring(0,d.length)==d)&&a[i]&&(!c||c.indexOf(","+(e?e+".":"")+i+",")>=0)){w=!1;if(g)for(m=0;m<g.length;m++)i.substring(0,g[m].length)==g[m]&&(w=!0);if(!w&&
(f==""&&(f+="&"+b+"."),m=a[i],d&&(i=i.substring(d.length)),i.length>0))if(w=i.indexOf("."),w>0)m=i.substring(0,w),w=(d?d:"")+m+".",g||(g=[]),g.push(w),f+=s.J(m,a,c,e,w);else if(typeof m=="boolean"&&(m=m?"true":"false"),m){if(e=="retrieveLightData"&&d.indexOf(".contextData.")<0)switch(w=i.substring(0,4),q=i.substring(4),i){case "transactionID":i="xact";break;case "channel":i="ch";break;case "campaign":i="v0";break;default:s.oa(q)&&(w=="prop"?i="c"+q:w=="eVar"?i="v"+q:w=="list"?i="l"+q:w=="hier"&&(i=
"h"+q,m=m.substring(0,255)))}f+="&"+s.escape(i)+"="+s.escape(m)}}f!=""&&(f+="&."+b)}return f};s.Sa=function(){var b="",a,c,e,d,f,i,m,w,g="",k="",j=c="";if(s.lightProfileID)a=s.H,(g=s.lightTrackVars)&&(g=","+g+","+s.Y.join(",")+",");else{a=s.c;if(s.pe||s.linkType)if(g=s.linkTrackVars,k=s.linkTrackEvents,s.pe&&(c=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1),s[c]))g=s[c].lb,k=s[c].kb;g&&(g=","+g+","+s.A.join(",")+",");k&&(k=","+k+",",g&&(g+=",events,"));s.events2&&(j+=(j!=""?",":"")+s.events2)}s.AudienceManagement&&
s.AudienceManagement.isReady()&&(b+=s.J("d",s.AudienceManagement.getEventCallConfigParams()));for(c=0;c<a.length;c++){d=a[c];f=s[d];e=d.substring(0,4);i=d.substring(4);!f&&d=="events"&&j&&(f=j,j="");if(f&&(!g||g.indexOf(","+d+",")>=0)){switch(d){case "supplementalDataID":d="sdid";break;case "timestamp":d="ts";break;case "dynamicVariablePrefix":d="D";break;case "visitorID":d="vid";break;case "marketingCloudVisitorID":d="mid";break;case "analyticsVisitorID":d="aid";break;case "audienceManagerLocationHint":d=
"aamlh";break;case "audienceManagerBlob":d="aamb";break;case "pageURL":d="g";if(f.length>255)s.pageURLRest=f.substring(255),f=f.substring(0,255);break;case "pageURLRest":d="-g";break;case "referrer":d="r";break;case "vmk":case "visitorMigrationKey":d="vmt";break;case "visitorMigrationServer":d="vmf";s.ssl&&s.visitorMigrationServerSecure&&(f="");break;case "visitorMigrationServerSecure":d="vmf";!s.ssl&&s.visitorMigrationServer&&(f="");break;case "charSet":d="ce";break;case "visitorNamespace":d="ns";
break;case "cookieDomainPeriods":d="cdp";break;case "cookieLifetime":d="cl";break;case "variableProvider":d="vvp";break;case "currencyCode":d="cc";break;case "channel":d="ch";break;case "transactionID":d="xact";break;case "campaign":d="v0";break;case "resolution":d="s";break;case "colorDepth":d="c";break;case "javascriptVersion":d="j";break;case "javaEnabled":d="v";break;case "cookiesEnabled":d="k";break;case "browserWidth":d="bw";break;case "browserHeight":d="bh";break;case "connectionType":d="ct";
break;case "homepage":d="hp";break;case "plugins":d="p";break;case "events":j&&(f+=(f!=""?",":"")+j);if(k){i=f.split(",");f="";for(e=0;e<i.length;e++)m=i[e],w=m.indexOf("="),w>=0&&(m=m.substring(0,w)),w=m.indexOf(":"),w>=0&&(m=m.substring(0,w)),k.indexOf(","+m+",")>=0&&(f+=(f?",":"")+i[e])}break;case "events2":f="";break;case "contextData":b+=s.J("c",s[d],g,d);f="";break;case "lightProfileID":d="mtp";break;case "lightStoreForSeconds":d="mtss";s.lightProfileID||(f="");break;case "lightIncrementBy":d=
"mti";s.lightProfileID||(f="");break;case "retrieveLightProfiles":d="mtsr";break;case "deleteLightProfiles":d="mtsd";break;case "retrieveLightData":s.retrieveLightProfiles&&(b+=s.J("mts",s[d],g,d));f="";break;default:s.oa(i)&&(e=="prop"?d="c"+i:e=="eVar"?d="v"+i:e=="list"?d="l"+i:e=="hier"&&(d="h"+i,f=f.substring(0,255)))}f&&(b+="&"+d+"="+(d.substring(0,3)!="pev"?s.escape(f):f))}d=="pev3"&&s.g&&(b+=s.g)}return b};s.v=function(s){var a=s.tagName;if(""+s.sb!="undefined"||""+s.eb!="undefined"&&(""+s.eb).toUpperCase()!=
"HTML")return"";a=a&&a.toUpperCase?a.toUpperCase():"";a=="SHAPE"&&(a="");a&&((a=="INPUT"||a=="BUTTON")&&s.type&&s.type.toUpperCase?a=s.type.toUpperCase():!a&&s.href&&(a="A"));return a};s.ka=function(s){var a=s.href?s.href:"",c,e,d;c=a.indexOf(":");e=a.indexOf("?");d=a.indexOf("/");if(a&&(c<0||e>=0&&c>e||d>=0&&c>d))e=s.protocol&&s.protocol.length>1?s.protocol:l.protocol?l.protocol:"",c=l.pathname.lastIndexOf("/"),a=(e?e+"//":"")+(s.host?s.host:l.host?l.host:"")+(h.substring(0,1)!="/"?l.pathname.substring(0,
c<0?0:c)+"/":"")+a;return a};s.F=function(b){var a=s.v(b),c,e,d="",f=0;if(a){c=b.protocol;e=b.onclick;if(b.href&&(a=="A"||a=="AREA")&&(!e||!c||c.toLowerCase().indexOf("javascript")<0))d=s.ka(b);else if(e)d=s.replace(s.replace(s.replace(s.replace(""+e,"\r",""),"\n",""),"\t","")," ",""),f=2;else if(a=="INPUT"||a=="SUBMIT"){if(b.value)d=b.value;else if(b.innerText)d=b.innerText;else if(b.textContent)d=b.textContent;f=3}else if(b.src&&a=="IMAGE")d=b.src;if(d)return{id:d.substring(0,100),type:f}}return 0};
s.pb=function(b){for(var a=s.v(b),c=s.F(b);b&&!c&&a!="BODY";)if(b=b.parentElement?b.parentElement:b.parentNode)a=s.v(b),c=s.F(b);if(!c||a=="BODY")b=0;if(b&&(a=b.onclick?""+b.onclick:"",a.indexOf(".tl(")>=0||a.indexOf(".trackLink(")>=0))b=0;return b};s.bb=function(){var b,a,c=s.linkObject,e=s.linkType,d=s.linkURL,f,i;s.Z=1;if(!c)s.Z=0,c=s.j;if(c){b=s.v(c);for(a=s.F(c);c&&!a&&b!="BODY";)if(c=c.parentElement?c.parentElement:c.parentNode)b=s.v(c),a=s.F(c);if(!a||b=="BODY")c=0;if(c){var m=c.onclick?""+
c.onclick:"";if(m.indexOf(".tl(")>=0||m.indexOf(".trackLink(")>=0)c=0}}else s.Z=1;!d&&c&&(d=s.ka(c));d&&!s.linkLeaveQueryString&&(f=d.indexOf("?"),f>=0&&(d=d.substring(0,f)));if(!e&&d){var g=0,k=0,j;if(s.trackDownloadLinks&&s.linkDownloadFileTypes){m=d.toLowerCase();f=m.indexOf("?");i=m.indexOf("#");f>=0?i>=0&&i<f&&(f=i):f=i;f>=0&&(m=m.substring(0,f));f=s.linkDownloadFileTypes.toLowerCase().split(",");for(i=0;i<f.length;i++)(j=f[i])&&m.substring(m.length-(j.length+1))=="."+j&&(e="d")}if(s.trackExternalLinks&&
!e&&(m=d.toLowerCase(),s.na(m))){if(!s.linkInternalFilters)s.linkInternalFilters=w.location.hostname;f=0;s.linkExternalFilters?(f=s.linkExternalFilters.toLowerCase().split(","),g=1):s.linkInternalFilters&&(f=s.linkInternalFilters.toLowerCase().split(","));if(f){for(i=0;i<f.length;i++)j=f[i],m.indexOf(j)>=0&&(k=1);k?g&&(e="e"):g||(e="e")}}}s.linkObject=c;s.linkURL=d;s.linkType=e;if(s.trackClickMap||s.trackInlineStats)if(s.g="",c){e=s.pageName;d=1;c=c.sourceIndex;if(!e)e=s.pageURL,d=0;if(w.s_objectID)a.id=
w.s_objectID,c=a.type=1;if(e&&a&&a.id&&b)s.g="&pid="+s.escape(e.substring(0,255))+(d?"&pidt="+d:"")+"&oid="+s.escape(a.id.substring(0,100))+(a.type?"&oidt="+a.type:"")+"&ot="+b+(c?"&oi="+c:"")}};s.Ta=function(){var b=s.Z,a=s.linkType,c=s.linkURL,e=s.linkName;if(a&&(c||e))a=a.toLowerCase(),a!="d"&&a!="e"&&(a="o"),s.pe="lnk_"+a,s.pev1=c?s.escape(c):"",s.pev2=e?s.escape(e):"",b=1;s.abort&&(b=0);if(s.trackClickMap||s.trackInlineStats){a={};c=0;var d=s.cookieRead("s_sq"),f=d?d.split("&"):0,i,w,g;d=0;if(f)for(i=
0;i<f.length;i++)w=f[i].split("="),e=s.unescape(w[0]).split(","),w=s.unescape(w[1]),a[w]=e;e=s.account.split(",");if(b||s.g){b&&!s.g&&(d=1);for(w in a)if(!Object.prototype[w])for(i=0;i<e.length;i++){d&&(g=a[w].join(","),g==s.account&&(s.g+=(w.charAt(0)!="&"?"&":"")+w,a[w]=[],c=1));for(f=0;f<a[w].length;f++)g=a[w][f],g==e[i]&&(d&&(s.g+="&u="+s.escape(g)+(w.charAt(0)!="&"?"&":"")+w+"&u=0"),a[w].splice(f,1),c=1)}b||(c=1);if(c){d="";i=2;!b&&s.g&&(d=s.escape(e.join(","))+"="+s.escape(s.g),i=1);for(w in a)!Object.prototype[w]&&
i>0&&a[w].length>0&&(d+=(d?"&":"")+s.escape(a[w].join(","))+"="+s.escape(w),i--);s.cookieWrite("s_sq",d)}}}return b};s.Ua=function(){if(!s.jb){var b=new Date,a=j.location,c,e,d,f=d=e=c="",i="",w="",g="1.2",k=s.cookieWrite("s_cc","true",0)?"Y":"N",o="",p="",n=0;if(b.setUTCDate&&(g="1.3",n.toPrecision&&(g="1.5",c=[],c.forEach))){g="1.6";d=0;e={};try{d=new Iterator(e),d.next&&(g="1.7",c.reduce&&(g="1.8",g.trim&&(g="1.8.1",Date.parse&&(g="1.8.2",Object.create&&(g="1.8.5")))))}catch(r){}}c=screen.width+
"x"+screen.height;d=navigator.javaEnabled()?"Y":"N";e=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;i=s.w.innerWidth?s.w.innerWidth:s.d.documentElement.offsetWidth;w=s.w.innerHeight?s.w.innerHeight:s.d.documentElement.offsetHeight;b=navigator.plugins;try{s.b.addBehavior("#default#homePage"),o=s.b.qb(a)?"Y":"N"}catch(t){}try{s.b.addBehavior("#default#clientCaps"),p=s.b.connectionType}catch(u){}if(b)for(;n<b.length&&n<30;){if(a=b[n].name)a=a.substring(0,100)+";",f.indexOf(a)<0&&(f+=a);n++}s.resolution=
c;s.colorDepth=e;s.javascriptVersion=g;s.javaEnabled=d;s.cookiesEnabled=k;s.browserWidth=i;s.browserHeight=w;s.connectionType=p;s.homepage=o;s.plugins=f;s.jb=1}};s.I={};s.loadModule=function(b,a){var c=s.I[b];if(!c){c=w["AppMeasurement_Module_"+b]?new w["AppMeasurement_Module_"+b](s):{};s.I[b]=s[b]=c;c.Ba=function(){return c.Ea};c.Fa=function(a){if(c.Ea=a)s[b+"_onLoad"]=a,s.C(b+"_onLoad",[s,c],1)||a(s,c)};try{Object.defineProperty?Object.defineProperty(c,"onLoad",{get:c.Ba,set:c.Fa}):c._olc=1}catch(e){c._olc=
1}}a&&(s[b+"_onLoad"]=a,s.C(b+"_onLoad",[s,c],1)||a(s,c))};s.r=function(b){var a,c;for(a in s.I)if(!Object.prototype[a]&&(c=s.I[a])){if(c._olc&&c.onLoad)c._olc=0,c.onLoad(s,c);if(c[b]&&c[b]())return 1}return 0};s.Xa=function(){var b=Math.floor(Math.random()*1E13),a=s.visitorSampling,c=s.visitorSamplingGroup;c="s_vsn_"+(s.visitorNamespace?s.visitorNamespace:s.account)+(c?"_"+c:"");var e=s.cookieRead(c);if(a){e&&(e=parseInt(e));if(!e){if(!s.cookieWrite(c,b))return 0;e=b}if(e%1E4>v)return 0}return 1};
s.K=function(b,a){var c,e,d,f,w,g;for(c=0;c<2;c++){e=c>0?s.ea:s.c;for(d=0;d<e.length;d++)if(f=e[d],(w=b[f])||b["!"+f]){if(!a&&(f=="contextData"||f=="retrieveLightData")&&s[f])for(g in s[f])w[g]||(w[g]=s[f][g]);s[f]=w}}};s.wa=function(b,a){var c,e,d,f;for(c=0;c<2;c++){e=c>0?s.ea:s.c;for(d=0;d<e.length;d++)f=e[d],b[f]=s[f],!a&&!b[f]&&(b["!"+f]=1)}};s.Pa=function(s){var a,c,e,d,f,w=0,g,k="",j="";if(s&&s.length>255&&(a=""+s,c=a.indexOf("?"),c>0&&(g=a.substring(c+1),a=a.substring(0,c),d=a.toLowerCase(),
e=0,d.substring(0,7)=="http://"?e+=7:d.substring(0,8)=="https://"&&(e+=8),c=d.indexOf("/",e),c>0&&(d=d.substring(e,c),f=a.substring(c),a=a.substring(0,c),d.indexOf("google")>=0?w=",q,ie,start,search_key,word,kw,cd,":d.indexOf("yahoo.co")>=0&&(w=",p,ei,"),w&&g)))){if((s=g.split("&"))&&s.length>1){for(e=0;e<s.length;e++)d=s[e],c=d.indexOf("="),c>0&&w.indexOf(","+d.substring(0,c)+",")>=0?k+=(k?"&":"")+d:j+=(j?"&":"")+d;k&&j?g=k+"&"+j:j=""}c=253-(g.length-j.length)-a.length;s=a+(c>0?f.substring(0,c):
"")+"?"+g}return s};s.S=!1;s.O=!1;s.Da=function(b){s.marketingCloudVisitorID=b;s.O=!0;s.l()};s.P=!1;s.L=!1;s.ya=function(b){s.analyticsVisitorID=b;s.L=!0;s.l()};s.R=!1;s.N=!1;s.Aa=function(b){s.audienceManagerLocationHint=b;s.N=!0;s.l()};s.Q=!1;s.M=!1;s.za=function(b){s.audienceManagerBlob=b;s.M=!0;s.l()};s.isReadyToTrack=function(){var b=!0,a=s.visitor;if(a&&a.isAllowed()){if(!s.S&&!s.marketingCloudVisitorID&&a.getMarketingCloudVisitorID&&(s.S=!0,s.marketingCloudVisitorID=a.getMarketingCloudVisitorID([s,
s.Da]),s.marketingCloudVisitorID))s.O=!0;if(!s.P&&!s.analyticsVisitorID&&a.getAnalyticsVisitorID&&(s.P=!0,s.analyticsVisitorID=a.getAnalyticsVisitorID([s,s.ya]),s.analyticsVisitorID))s.L=!0;if(!s.R&&!s.audienceManagerLocationHint&&a.getAudienceManagerLocationHint&&(s.R=!0,s.audienceManagerLocationHint=a.getAudienceManagerLocationHint([s,s.Aa]),s.audienceManagerLocationHint))s.N=!0;if(!s.Q&&!s.audienceManagerBlob&&a.getAudienceManagerBlob&&(s.Q=!0,s.audienceManagerBlob=a.getAudienceManagerBlob([s,
s.za]),s.audienceManagerBlob))s.M=!0;if(s.S&&!s.O&&!s.marketingCloudVisitorID||s.P&&!s.L&&!s.analyticsVisitorID||s.R&&!s.N&&!s.audienceManagerLocationHint||s.Q&&!s.M&&!s.audienceManagerBlob)b=!1}return b};s.k=k;s.o=0;s.callbackWhenReadyToTrack=function(b,a,c){var e;e={};e.Ja=b;e.Ia=a;e.Ga=c;if(s.k==k)s.k=[];s.k.push(e);if(s.o==0)s.o=setInterval(s.l,100)};s.l=function(){var b;if(s.isReadyToTrack()){if(s.o)clearInterval(s.o),s.o=0;if(s.k!=k)for(;s.k.length>0;)b=s.k.shift(),b.Ia.apply(b.Ja,b.Ga)}};s.Ca=
function(b){var a,c,e=k,d=k;if(!s.isReadyToTrack()){a=[];if(b!=k)for(c in e={},b)e[c]=b[c];d={};s.wa(d,!0);a.push(e);a.push(d);s.callbackWhenReadyToTrack(s,s.track,a);return!0}return!1};s.Ra=function(){var b=s.cookieRead("s_fid"),a="",c="",e;e=8;var d=4;if(!b||b.indexOf("-")<0){for(b=0;b<16;b++)e=Math.floor(Math.random()*e),a+="0123456789ABCDEF".substring(e,e+1),e=Math.floor(Math.random()*d),c+="0123456789ABCDEF".substring(e,e+1),e=d=16;b=a+"-"+c}s.cookieWrite("s_fid",b,1)||(b=0);return b};s.t=s.track=
function(b,a){var c,e=new Date,d="s"+Math.floor(e.getTime()/108E5)%10+Math.floor(Math.random()*1E13),f=e.getYear();f="t="+s.escape(e.getDate()+"/"+e.getMonth()+"/"+(f<1900?f+1900:f)+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()+" "+e.getDay()+" "+e.getTimezoneOffset());if(!s.supplementalDataID&&s.visitor&&s.visitor.getSupplementalDataID)s.supplementalDataID=s.visitor.getSupplementalDataID("AppMeasurement:"+s._in,s.expectSupplementalData?!1:!0);s.r("_s");if(!s.C("track",arguments)){if(!s.Ca(b)){a&&
s.K(a);b&&(c={},s.wa(c,0),s.K(b));if(s.Xa()){if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.Ra();s.bb();s.usePlugins&&s.doPlugins&&s.doPlugins(s);if(s.account){if(!s.abort){if(s.trackOffline&&!s.timestamp)s.timestamp=Math.floor(e.getTime()/1E3);e=w.location;if(!s.pageURL)s.pageURL=e.href?e.href:e;if(!s.referrer&&!s.xa)s.referrer=j.document.referrer,s.xa=1;s.referrer=s.Pa(s.referrer);s.r("_g")}if(s.Ta()&&!s.abort)s.Ua(),f+=s.Sa(),s.ab(d,f),s.r("_t"),s.referrer=""}}b&&s.K(c,1)}s.abort=
s.supplementalDataID=s.timestamp=s.pageURLRest=s.linkObject=s.j=s.linkURL=s.linkName=s.linkType=w.rb=s.pe=s.pev1=s.pev2=s.pev3=s.g=0}};s.tl=s.trackLink=function(b,a,c,e,d){s.linkObject=b;s.linkType=a;s.linkName=c;if(d)s.i=b,s.q=d;return s.track(e)};s.trackLight=function(b,a,c,e){s.lightProfileID=b;s.lightStoreForSeconds=a;s.lightIncrementBy=c;return s.track(e)};s.clearVars=function(){var b,a;for(b=0;b<s.c.length;b++)if(a=s.c[b],a.substring(0,4)=="prop"||a.substring(0,4)=="eVar"||a.substring(0,4)==
"hier"||a.substring(0,4)=="list"||a=="channel"||a=="events"||a=="eventList"||a=="products"||a=="productList"||a=="purchaseID"||a=="transactionID"||a=="state"||a=="zip"||a=="campaign")s[a]=void 0};s.ab=function(b,a){var c,e=s.trackingServer;c="";var d=s.dc,f="sc.",w=s.visitorNamespace;if(e){if(s.trackingServerSecure&&s.ssl)e=s.trackingServerSecure}else{if(!w)w=s.account,e=w.indexOf(","),e>=0&&(w=w.substring(0,e)),w=w.replace(/[^A-Za-z0-9]/g,"");c||(c="2o7.net");d=d?(""+d).toLowerCase():"d1";c=="2o7.net"&&
(d=="d1"?d="112":d=="d2"&&(d="122"),f="");e=w+"."+d+"."+f+c}c=s.ssl?"https://":"http://";d=s.AudienceManagement&&s.AudienceManagement.isReady();c+=e+"/b/ss/"+s.account+"/"+(s.mobile?"5.":"")+(d?"10":"1")+"/JS-"+s.version+(s.ib?"T":"")+"/"+b+"?AQB=1&ndh=1&"+(d?"callback=s_c_il["+s._in+"].AudienceManagement.passData&":"")+a+"&AQE=1";s.Wa&&(c=c.substring(0,2047));s.Na(c);s.W()};s.Na=function(b){s.e||s.Va();s.e.push(b);s.X=s.u();s.va()};s.Va=function(){s.e=s.Ya();if(!s.e)s.e=[]};s.Ya=function(){var b,
a;if(s.ba()){try{(a=w.localStorage.getItem(s.$()))&&(b=w.JSON.parse(a))}catch(c){}return b}};s.ba=function(){var b=!0;if(!s.trackOffline||!s.offlineFilename||!w.localStorage||!w.JSON)b=!1;return b};s.la=function(){var b=0;if(s.e)b=s.e.length;s.z&&b++;return b};s.W=function(){if(!s.z)if(s.ma=k,s.aa)s.X>s.G&&s.ta(s.e),s.da(500);else{var b=s.Ha();if(b>0)s.da(b);else if(b=s.ja())s.z=1,s.$a(b),s.fb(b)}};s.da=function(b){if(!s.ma)b||(b=0),s.ma=setTimeout(s.W,b)};s.Ha=function(){var b;if(!s.trackOffline||
s.offlineThrottleDelay<=0)return 0;b=s.u()-s.ra;if(s.offlineThrottleDelay<b)return 0;return s.offlineThrottleDelay-b};s.ja=function(){if(s.e.length>0)return s.e.shift()};s.$a=function(b){if(s.debugTracking){var a="AppMeasurement Debug: "+b;b=b.split("&");var c;for(c=0;c<b.length;c++)a+="\n\t"+s.unescape(b[c]);s.Za(a)}};s.fb=function(b){var a,c,e;if(!a&&s.d.createElement&&s.AudienceManagement&&s.AudienceManagement.isReady()&&(a=s.d.createElement("SCRIPT"))&&"async"in a)(e=(e=s.d.getElementsByTagName("HEAD"))&&
e[0]?e[0]:s.d.body)?(a.type="text/javascript",a.setAttribute("async","async"),c=3):a=0;if(!a)a=new Image,a.alt="";a.ga=function(){try{if(s.ca)clearTimeout(s.ca),s.ca=0;if(a.timeout)clearTimeout(a.timeout),a.timeout=0}catch(b){}};a.onload=a.hb=function(){a.ga();s.Ma();s.T();s.z=0;s.W()};a.onabort=a.onerror=a.Oa=function(){a.ga();(s.trackOffline||s.aa)&&s.z&&s.e.unshift(s.La);s.z=0;s.X>s.G&&s.ta(s.e);s.T();s.da(500)};a.onreadystatechange=function(){a.readyState==4&&(a.status==200?a.hb():a.Oa())};s.ra=
s.u();if(c==1)a.open("GET",b,!0),a.send();else if(c==2)a.open("GET",b),a.send();else if(a.src=b,c==3){if(s.pa)try{e.removeChild(s.pa)}catch(d){}e.firstChild?e.insertBefore(a,e.firstChild):e.appendChild(a);s.pa=s.Ka}if(a.abort)s.ca=setTimeout(a.abort,5E3);s.La=b;s.Ka=w["s_i_"+s.replace(s.account,",","_")]=a;if(s.useForcedLinkTracking&&s.B||s.q){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;s.U=setTimeout(s.T,s.forcedLinkTrackingTimeout)}};s.Ma=function(){if(s.ba()&&!(s.qa>s.G))try{w.localStorage.removeItem(s.$()),
s.qa=s.u()}catch(b){}};s.ta=function(b){if(s.ba()){s.va();try{w.localStorage.setItem(s.$(),w.JSON.stringify(b)),s.G=s.u()}catch(a){}}};s.va=function(){if(s.trackOffline){if(!s.offlineLimit||s.offlineLimit<=0)s.offlineLimit=10;for(;s.e.length>s.offlineLimit;)s.ja()}};s.forceOffline=function(){s.aa=!0};s.forceOnline=function(){s.aa=!1};s.$=function(){return s.offlineFilename+"-"+s.visitorNamespace+s.account};s.u=function(){return(new Date).getTime()};s.na=function(s){s=s.toLowerCase();if(s.indexOf("#")!=
0&&s.indexOf("about:")!=0&&s.indexOf("opera:")!=0&&s.indexOf("javascript:")!=0)return!0;return!1};s.setTagContainer=function(b){var a,c,e;s.ib=b;for(a=0;a<s._il.length;a++)if((c=s._il[a])&&c._c=="s_l"&&c.tagContainerName==b){s.K(c);if(c.lmq)for(a=0;a<c.lmq.length;a++)e=c.lmq[a],s.loadModule(e.n);if(c.ml)for(e in c.ml)if(s[e])for(a in b=s[e],e=c.ml[e],e)if(!Object.prototype[a]&&(typeof e[a]!="function"||(""+e[a]).indexOf("s_c_il")<0))b[a]=e[a];if(c.mmq)for(a=0;a<c.mmq.length;a++)e=c.mmq[a],s[e.m]&&
(b=s[e.m],b[e.f]&&typeof b[e.f]=="function"&&(e.a?b[e.f].apply(b,e.a):b[e.f].apply(b)));if(c.tq)for(a=0;a<c.tq.length;a++)s.track(c.tq[a]);c.s=s;break}};s.Util={urlEncode:s.escape,urlDecode:s.unescape,cookieRead:s.cookieRead,cookieWrite:s.cookieWrite,getQueryParam:function(b,a,c){var e;a||(a=s.pageURL?s.pageURL:w.location);c||(c="&");if(b&&a&&(a=""+a,e=a.indexOf("?"),e>=0&&(a=c+a.substring(e+1)+c,e=a.indexOf(c+b+"="),e>=0&&(a=a.substring(e+c.length+b.length+1),e=a.indexOf(c),e>=0&&(a=a.substring(0,
e)),a.length>0))))return s.unescape(a);return""}};s.A=["supplementalDataID","timestamp","dynamicVariablePrefix","visitorID","marketingCloudVisitorID","analyticsVisitorID","audienceManagerLocationHint","fid","vmk","visitorMigrationKey","visitorMigrationServer","visitorMigrationServerSecure","charSet","visitorNamespace","cookieDomainPeriods","fpCookieDomainPeriods","cookieLifetime","pageName","pageURL","referrer","contextData","currencyCode","lightProfileID","lightStoreForSeconds","lightIncrementBy",
"retrieveLightProfiles","deleteLightProfiles","retrieveLightData","pe","pev1","pev2","pev3","pageURLRest"];s.c=s.A.concat(["purchaseID","variableProvider","channel","server","pageType","transactionID","campaign","state","zip","events","events2","products","audienceManagerBlob","tnt"]);s.Y=["timestamp","charSet","visitorNamespace","cookieDomainPeriods","cookieLifetime","contextData","lightProfileID","lightStoreForSeconds","lightIncrementBy"];s.H=s.Y.slice(0);s.ea=["account","allAccounts","debugTracking",
"visitor","trackOffline","offlineLimit","offlineThrottleDelay","offlineFilename","usePlugins","doPlugins","configURL","visitorSampling","visitorSamplingGroup","linkObject","linkURL","linkName","linkType","trackDownloadLinks","trackExternalLinks","trackClickMap","trackInlineStats","linkLeaveQueryString","linkTrackVars","linkTrackEvents","linkDownloadFileTypes","linkExternalFilters","linkInternalFilters","useForcedLinkTracking","forcedLinkTrackingTimeout","trackingServer","trackingServerSecure","ssl",
"abort","mobile","dc","lightTrackVars","maxDelay","expectSupplementalData","AudienceManagement"];for(g=0;g<=75;g++)s.c.push("prop"+g),s.H.push("prop"+g),s.c.push("eVar"+g),s.H.push("eVar"+g),g<6&&s.c.push("hier"+g),g<4&&s.c.push("list"+g);g=["resolution","colorDepth","javascriptVersion","javaEnabled","cookiesEnabled","browserWidth","browserHeight","connectionType","homepage","plugins"];s.c=s.c.concat(g);s.A=s.A.concat(g);s.ssl=w.location.protocol.toLowerCase().indexOf("https")>=0;s.charSet="UTF-8";
s.contextData={};s.offlineThrottleDelay=0;s.offlineFilename="AppMeasurement.offline";s.ra=0;s.X=0;s.G=0;s.qa=0;s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";s.w=w;s.d=w.document;try{s.Wa=navigator.appName=="Microsoft Internet Explorer"}catch(n){}s.T=function(){if(s.U)w.clearTimeout(s.U),s.U=k;s.i&&s.B&&s.i.dispatchEvent(s.B);if(s.q)if(typeof s.q=="function")s.q();else if(s.i&&s.i.href)s.d.location=s.i.href;s.i=s.B=s.q=0};s.ua=function(){s.b=s.d.body;if(s.b)if(s.p=
function(b){var a,c,e,d,f;if(!(s.d&&s.d.getElementById("cppXYctnr")||b&&b.cb)){if(s.fa)if(s.useForcedLinkTracking)s.b.removeEventListener("click",s.p,!1);else{s.b.removeEventListener("click",s.p,!0);s.fa=s.useForcedLinkTracking=0;return}else s.useForcedLinkTracking=0;s.j=b.srcElement?b.srcElement:b.target;try{if(s.j&&(s.j.tagName||s.j.parentElement||s.j.parentNode))if(e=s.la(),s.track(),e<s.la()&&s.useForcedLinkTracking&&b.target){for(d=b.target;d&&d!=s.b&&d.tagName.toUpperCase()!="A"&&d.tagName.toUpperCase()!=
"AREA";)d=d.parentNode;if(d&&(f=d.href,s.na(f)||(f=0),c=d.target,b.target.dispatchEvent&&f&&(!c||c=="_self"||c=="_top"||c=="_parent"||w.name&&c==w.name))){try{a=s.d.createEvent("MouseEvents")}catch(g){a=new w.MouseEvent}if(a){try{a.initMouseEvent("click",b.bubbles,b.cancelable,b.view,b.detail,b.screenX,b.screenY,b.clientX,b.clientY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,b.button,b.relatedTarget)}catch(j){a=0}if(a)a.cb=1,b.stopPropagation(),b.gb&&b.gb(),b.preventDefault(),s.i=b.target,s.B=a}}}}catch(k){}s.j=
0}},s.b&&s.b.attachEvent)s.b.attachEvent("onclick",s.p);else{if(s.b&&s.b.addEventListener){if(navigator&&(navigator.userAgent.indexOf("WebKit")>=0&&s.d.createEvent||navigator.userAgent.indexOf("Firefox/2")>=0&&w.MouseEvent))s.fa=1,s.useForcedLinkTracking=1,s.b.addEventListener("click",s.p,!0);s.b.addEventListener("click",s.p,!1)}}else setTimeout(s.ua,30)};s.ua()}
function s_gi(s){var w,k=window.s_c_il,j,g,o=s.split(","),p,n,b=0;if(k)for(j=0;!b&&j<k.length;){w=k[j];if(w._c=="s_c"&&(w.account||w.oun))if(w.account&&w.account==s)b=1;else{g=w.account?w.account:w.oun;g=w.allAccounts?w.allAccounts:g.split(",");for(p=0;p<o.length;p++)for(n=0;n<g.length;n++)o[p]==g[n]&&(b=1)}j++}b||(w=new AppMeasurement);w.setAccount?w.setAccount(s):w.sa&&w.sa(s);return w}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var s=window,w=s.s_giq,k,j,g;if(w)for(k=0;k<w.length;k++)j=w[k],g=s_gi(j.oun),g.setAccount(j.un),g.setTagContainer(j.tagContainerName);s.s_giq=0}s_pgicq();
