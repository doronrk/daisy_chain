//tealium universal tag - utag.42 ut4.0.201409051533, Copyright 2014 Tealium.com Inc. All Rights Reserved.
var _tealenv="www";if(utag.cfg.path.indexOf("/dev")!=-1||utag.cfg.path.indexOf("/qa")!=-1){_tealenv="qa"}
var certonaResx=function(){var ak=false,ay=null,di=location.protocol.toLowerCase()=="https:"?"https://":"http://",cm=_tealenv+".res-x.com",cj="/ws/r2/Resonance.aspx",cs="4.2x",i="RES_TRACKINGID",s="RES_SESSIONID",ai="ResonanceSegment",b="",l="",d="",ao="",z="",o=false,u="certonaResx.showResponse",ac=false,h=false,n=0;function k(df){return parseInt(df,10);}function a(dl){try{if(dl!=null&&dl!="null"&&dl!=""){return true;}}catch(ex){}return false;}function aq(){return resx.rrelem;}function at(cf){try{var bf=null;if(a(cf)){bf=new Array();if(a(document.getElementById(cf))){bf[0]=cf;}else{var by=cf.replace(/[,;\-:]/g,".").split(".");for(var ag=0;ag<by.length;ag++){if(a(document.getElementById(by[ag]))){bf[ag]=by[ag];}else{bf[ag]="";}}}}return bf;}catch(ex){c("",ex);}return null;}function m(){try{if(resx.rrelem!==undefined){var e=at(aq());if(e!=null){var t=null;for(var ag=0;ag<e.length;ag++){t=document.getElementById(e[ag]);if(a(t)){t.style.visibility="visible";}}}}}catch(ex){}}function c(de,af){try{if(!ak){ak=true;ay=escape(de+"|"+(af.number!==undefined?af.number:"undefined")+"|"+(af.name!==undefined?af.name:"undefined")+"|"+(af.description!==undefined?af.description:"undefined"));}}catch(ex){}finally{m();}}function ae(ah){try{if(document.cookie.length>0){var y=document.cookie.indexOf(ah+"=");if(y!=-1){y+=ah.length+1;var bl=document.cookie.indexOf(";",y);if(bl==-1){bl=document.cookie.length;}return unescape(document.cookie.substring(y,bl));}}}catch(ex){c("",ex);}return null;}function q(ah,dr,as,dn,cx){try{var ax=new Date();if(as!=null){ax.setTime(ax.getTime()+(as*3600*1000));}document.cookie=ah+"="+escape(dr)+((a(as))?"; expires="+ax.toGMTString():"")+((a(dn))?"; path="+dn:"; path=/")+((a(cx))?"; domain="+cx:"");}catch(ex){c("",ex);}}function bz(dt,dq){try{if(dq!==undefined&&dq!=null){for(var ag=0;ag<dq.length;ag++){if((dq[ag]+"")==dt){return true;}}}}catch(ex){}return false;}function bw(){try{var x=resx.rrec!==undefined&&(resx.rrec==true||resx.rrec=="true")&&d=="1"&&!ak;if(x){if(!h){x=false;if(resx.rrelem!==undefined){var e=at(aq());if(e!=null){for(var ag=0;ag<e.length;ag++){if(a(e[ag])){x=true;break;}}}}}if(x){if(resx.useitems===undefined||!a(resx.useitems)){x=false;if(resx.rrnum!==undefined){var ds=resx.rrnum+"";ds=ds.replace(/,/g,";");var co=ds.split(";");for(var ag=0;ag<co.length;ag++){if(!isNaN(co[ag])&&k(co[ag])>0){x=true;break;}}}}}}return x;}catch(ex){}return false;}function dk(df){try{var dh="";df+="";for(var ag=df.length-1;ag>=0;ag--){dh+=df.charAt(ag);}return dh;}catch(ex){}return"";}function ad(){try{var dp="";if(navigator.userAgent.toLowerCase().indexOf("mac")==-1){dp=Math.floor(Math.random()*1000000000000000);dp+="";}else{var bt=Math.floor(Math.random()*1000000),dg=new Date(),cd=dg.getTime();cd+="";var cn=dk(cd);bt+="";dp=bt+cn.substring(0,11);}return dp;}catch(ex){c("guid",ex);}return"";}function bi(bh,bp,az,dd,dc,dj){try{var be="",aj=null,cv="";if(typeof bh==="object"){aj=document.getElementsByTagName("a");}else{var bs=document.getElementById(bh);if(a(bs)){aj=bs.getElementsByTagName("a");cv=bh;}}if(aj!==undefined&&aj!=null){var al=null,bo=null,bn=null,cl=0,bk="",an="",bx="",bj="",ck="",au=null;if(a(bp)){bn=-1;bo=new Array();for(var ag=0;ag<bp.length;ag++){al=document.getElementById(bp[ag]);if(a(al)){au=al.getElementsByTagName("a");for(var dx=0;dx<au.length;dx++){bn++;bo[bn]=au[dx]+"";}}}}for(var ag=0;ag<aj.length;ag++){if(cl==dj){break;}bk=aj[ag]+"";if(a(bk)){an=escape(bk);bj="";if(a(az)){an=an.match(az)+"";}if(a(an)){bj=an.match(dd)+"";}if(a(bj+"")){if(!bz(bk,bo)){ck=an.match(dc)+"";bx=bj+escape("|")+cv+escape("|")+(a(ck)?ck:"")+";";if(be.indexOf(bx)==-1){be+=bx;cl++;}}}}}}return be;}catch(ex){c("gpl",ex);}return"";}function ct(aa){try{ac=true;if(!h){var t=null;for(var ag=0;ag<aa.Resonance.Response.length;ag++){if(aa.Resonance.Response[ag].display=="yes"){t=document.getElementById(aa.Resonance.Response[ag].scheme);if(a(t)){t.innerHTML=aa.Resonance.Response[ag].output;}}}}}catch(ex){}finally{m();}}function bv(){try{if(!ac&&!h){if(n<2000){n=n+50;window.setTimeout("certonaResx.checkCallback()",50);}else{h=true;m();}}}catch(ex){m();}}function cr(p){try{var cc="",j="",ab="";if(typeof p==="boolean"&&p===true){if(resx.rrcall!==undefined&&a(resx.rrcall)){j=resx.rrcall;}else{j=u;}}else if(typeof p==="string"){j=p;}if(j.length>0){if(j==u){ab="&cb=";}else{ab="&ccb=";}ab+=j;}cc=(resx.useitems!==undefined&&a(resx.useitems)?"&ui="+resx.useitems:"&no="+resx.rrnum)+(resx.exitemid!==undefined&&a(resx.exitemid)?"&ex="+resx.exitemid:"")+(resx.rrqs!==undefined?"&"+resx.rrqs:"")+ab;return cc;}catch(ex){}return"";}function bu(){try{var w=location.hostname;if(a(w)){if(!w.match(/(\d{1,3}\.){3}\d{1,3}/)){var cb=w.split(".");if(cb.length>1){w="."+cb[cb.length-2]+"."+cb[cb.length-1];var dv=/\.(co|com)\.\w{2}$/;if(w.toLowerCase().match(dv)&&cb.length>2){w="."+cb[cb.length-3]+w;}}}return w;}}catch(ex){c("gcd",ex);}return null;}function ce(cq){try{var av=location.search,y=av.indexOf("?"+cq+"=");if(y==-1){y=av.indexOf("&"+cq+"=");}if(y>-1){y=y+cq.length+2;var bl=av.indexOf("&",y);if(bl==-1){return av.substring(y);}else{return av.substring(y,bl);}}}catch(ex){}return null;}function bg(){try{var br="",db="";for(var ag=0;ag<51;ag++){if(resx["cv"+ag]!==undefined){db=resx["cv"+ag]+"";db=db.replace(/\+/g,"%2B");br+="&cv"+ag+"="+encodeURIComponent(db);}}return br;}catch(ex){c("gcv",ex);}return"";}function bm(g){try{var r={callback:false};if(g===undefined){var g=r;}else{for(var aw in r){if(g[aw]===undefined){g[aw]=r[aw];}}}ak=false;ay=null;b="";l="";d="";ao="";z="";o=false;ac=false;h=false;n=0;var f=bu();if(location.search.indexOf("resxtrack=")>0&&(resx.trackingid===undefined||!a(resx.trackingid))){b=ce("resxtrack");}if(resx.trackingid===undefined||!a(resx.trackingid)){if(!isNaN(k(b))){q(i,b,87648,null,f);if(!a(ae(i))){q(i,b,null,null,f);}q(s,"",-1,null,f);}else{b=ae(i);if(isNaN(k(b))){b=ad();q(i,b,87648,null,f);if(!a(ae(i))){q(i,b,null,null,f);}}}if(resx.segment===undefined||!a(resx.segment)){var v=k(b);if(!isNaN(v)&&v>0){v+="";v=v.substring(1,6);v=k(v);var ch=k(resx.top1),cg=k(resx.top2),da=k(resx.top3),du=100000;if(!(isNaN(ch)&&isNaN(cg)&&isNaN(da))){if(isNaN(ch)){ch=0;}if(isNaN(cg)){cg=ch;}if(isNaN(da)){da=cg;}if(v<ch){d="1";}else if(v<cg){d="2";}else if(v<da){d="3";}else if(v<du){d="4";}}}q(ai,d,1440,null,f);if(!a(ae(ai))){q(ai,d,null,null,f);}}}else{b=resx.trackingid;}if((resx.sessionid===undefined||!a(resx.sessionid))&&(resx.trackingid===undefined||!a(resx.trackingid))){l=ae(s);if(!a(l)){l=ad();}q(s,l,.5,null,f);if(!a(ae(s))){q(s,l,null,null,f);}}else{l=resx.sessionid;}if(resx.segment!==undefined&&a(resx.segment)){d=resx.segment;}if(isNaN(k(d))){d="1";}if(resx.pageid!==undefined&&a(resx.pageid)){ao=resx.pageid;}else{ao=ad();}var bd=(resx.links!==undefined?resx.links+"":"");if(a(bd)){var ar=bd.replace(/\,/g,";").replace(/\|/g,"%7C").split(";",50);for(var ag=0;ag<ar.length;ag++){z+=ar[ag]+";";}}var bc=(resx.maxl!==undefined&&!isNaN(resx.maxl)?k(resx.maxl):20),bb=(resx.lkmatch!==undefined?resx.lkmatch:""),ca=(resx.ltmatch!==undefined?resx.ltmatch:"");if(a(bb)){var ba=(resx.plkmatch!==undefined?resx.plkmatch:""),e=null;if(resx.rrelem!==undefined){e=at(aq());}if(e!=null){for(var ag=0;ag<e.length;ag++){if(a(e[ag])){z+=bi(e[ag],null,ba,bb,ca,50);}}}if(bc>0){z+=bi(document,e,ba,bb,ca,bc);}}if(((typeof g.callback==="string"&&g.callback!=u)||g.callback==false)||(resx.rrcall!==undefined&&a(resx.rrcall)&&resx.rrcall!=u)){h=true;}o=bw()&&a(b)&&a(ao);if(!o){m();}}catch(ex){c("pv",ex);}}function cw(p){try{if(d=="1"||d=="2"||d=="3"){if(o){window.setTimeout("certonaResx.checkCallback();",50);}var ap="appid="+(resx.appid!==undefined?resx.appid:"")+"&tk="+(a(b)?b:"")+"&ss="+(a(l)?l:"")+"&sg="+(a(d)?d:"")+"&pg="+(a(ao)?ao:"")+"&vr="+cs+"&bx="+o,cu="";if(resx.rrelem!==undefined){var cz=aq().replace(/[,;\-:]/g,".").split(".");if(cz!=null){for(var ag=0;ag<cz.length;ag++){cu+="&sc="+cz[ag];}}}ap+=cu+(resx.event!==undefined?"&ev="+resx.event:"")+(resx.itemid!==undefined?"&ei="+resx.itemid:"")+(resx.qty!==undefined?"&qty="+resx.qty:"")+(resx.price!==undefined?"&pr="+resx.price:"")+(resx.shipping!==undefined?"&sh="+resx.shipping:"")+(resx.total!==undefined?"&tt="+resx.total:"")+(resx.currencycode!==undefined?"&cc="+resx.currencycode:"")+(resx.customerid!==undefined?"&cu="+resx.customerid:"")+(resx.transactionid!==undefined?"&tr="+resx.transactionid:"");ap+=(o?cr(p):"")+bg()+"&ur="+escape(location.href.substring(0,400))+"&plk="+(a(z)?z:"")+"&rf="+escape(document.referrer)+((ak)?"&er="+ak+"&em="+ay:"");var ci=cm;if(resx.host!==undefined&&a(resx.host)){ci=resx.host;}var cy=di+ci+cj+"?"+ap;return(cy.substring(0,2083));}}catch(ex){c("",ex);}return"";}function cp(src){try{if(src!=""){var am=document.createElement('script');am.type='text/javascript';am.async=true;am.src=src;var bq=document.getElementsByTagName('script')[0];bq.parentNode.insertBefore(am,bq);}}catch(ex){c("",ex);}}function dm(g){var r={callback:false};if(g===undefined){var g=r;}else{for(var aw in r){if(g[aw]===undefined){g[aw]=r[aw];}}}return cw(g.callback);}function dw(){bm({callback:true});var src=cw(true);cp(src);}return{checkCallback:function(){bv();},showResponse:function(aa){ct(aa);},getURL:function(g){bm(g);return dm(g);},run:function(){dw();}}}();var resx={};try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.appid='TommyHilfiger01';u.top1='100000';u.top2='100000';u.lkmatch=u.ltmatch=u.rrec=true;u.rrelem='';u.rrnum='';u.map={"certona_div_id":"rrelem","certona_event":"event","certona_number_rec":"rrnum","order_id":"transactionid","product_part_number":"itemid,lkmatch","order_shipping":"shipping","product_base_price":"price","product_quantity":"qty","product_subtotal":"total","customer_id":"customerid"};u.extend=[function(a,b){if(b.page_name=="<cart page>"){resx.itemid="";resx.qty="";}},function(a,b){if(b.page_name=="Checkout: Shopping Bag"){if(b._csubtotal<150){resx.rrqs="shipgap="+(150-b._csubtotal).toFixed(2);}else{resx.rrqs="shipgap=0";}}}];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!="undefined"){resx.appid=u.appid;resx.top1=u.top1;resx.top2=u.top2;resx.lkmatch=u.lkmatch;resx.ltmatch=u.ltmatch;resx.rrec=u.rrec;if(resx.rrec){resx.rrelem=u.rrelem;resx.rrnum=u.rrnum;}
for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f]=='top1'){u.top1=b[d]}
else if(e[f]=='top2'){u.top2=b[d]}
else if(e[f]=='lkmatch'){u.lkmatch=b[d]}
else if(e[f]=='ltmatch'){u.ltmatch=b[d]}
else if(e[f]=='rrec'){u.rrec=b[d]}
else if(e[f]=='rrelem'){u.rrelem=((b[d]instanceof Array)?b[d].join(";"):b[d]);}
else if(e[f]=='rrnum'){u.rrnum=((b[d]instanceof Array)?b[d].join(";"):b[d]);}
else if(e[f]=='event'){resx.event=b[d]}
else if(e[f]=='itemid'){resx.itemid=((b[d]instanceof Array)?b[d].join(";"):b[d]);}
else if(e[f]=='links'){resx.links=((b[d]instanceof Array)?b[d].join(";"):b[d]);}
else if(e[f]=='qty'){resx.qty=b[d]}
else if(e[f]=='price'){resx.price=b[d]}
else if(e[f]=='shipping'){resx.shipping=b[d]}
else if(e[f]=='total'){resx.total=b[d]}
else if(e[f]=='customerid'){resx.customerid=b[d]}
else if(e[f]=='transactionid'){resx.transactionid=b[d]};}}};if(typeof b._corder!='undefined'&&b._corder){if(typeof resx.event=="undefined"){resx.event="purchase+confirmation";}
resx.itemid=b._cprod.join(';');resx.qty=b._cquan.join(';');resx.price=b._cprice.join(';');resx.shipping=b._cship;resx.total=b._ctotal;if(b._ccustid){resx.customerid=b._ccustid};resx.transactionid=b._corder;}
resx.appid=u.appid;resx.top1=u.top1;resx.top2=u.top2;resx.lkmatch=u.lkmatch;resx.ltmatch=u.ltmatch;resx.rrec=u.rrec;if(resx.rrec){resx.rrelem=u.rrelem;resx.rrnum=u.rrnum;}
certonaResx.run();}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('42','pvh.tommyna');}catch(e){}
