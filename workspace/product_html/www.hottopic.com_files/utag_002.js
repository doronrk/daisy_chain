//tealium universal tag - utag.8 ut4.0.201405211607, Copyright 2014 Tealium.com Inc. All Rights Reserved.
function SliSpark(Q,N){var C=undefined,G=Q,J=N,t=C,b=C,O=C,u=C,w=C,a=C,p=C,j=C,D=[],s=window.location.protocol,H=C,F=C,o=C,m=1,P="",U=0,W=new Date().getTime(),K=C,r=0,v=C,i=[],e=C,y=C,n="SLIBeacon",I="SLI1",E="SLI2",A="SLI4",k=false,M=63072000,L=15552000,f=43200,g=1800,x=0,h=0,B="b.sli-spark.com/b.png?";function d(X){return encodeURIComponent(X);}
function l(Y,aa,Z,ab){Y+=y;var ad=C,X=";",ac=C;if(Z>=0){ad=new Date();ad.setSeconds(Z);X="; expires="+ad.toGMTString()}
ac=Y+"="+aa+X+"; path="+ab+e;document.cookie=ac;return ac;}
function q(aa){aa+=y;var Z=C;var X=new RegExp(aa+"\\s*=\\s*([^\\s;$]*)\\s*(?:;|$)","g");var Y=X.exec(document.cookie);if(Y===null){return Z}
Z=Y[1];return Z;}
function V(Y){var Z="";for(var X=0;X<9;X++){Z+=String.fromCharCode(65+Math.round(Math.random()*25));}
Z+=(Y);for(X=0;X<9;X++){Z+=String.fromCharCode(65+Math.round(Math.random()*25));}
return Z;}
var T=function R(ac,aa,Z,X,Y){this.transactionId=ac;this.systemUserId=aa;this.orderTotal=Z;this.shippingTotal=X;this.taxTotal=Y;this.items=[];var ab=function(af,ae,ad){this.sku=af;this.qty=ae;this.total=ad;this.toString=function(){return"("+d(this.sku)+"|"+d(this.qty)+"|"+d(this.total)+")"}};this.addItem=function(ag,af,ae){var ad=new ab(ag,af,ae);this.items.push(ad);}};function S(){k=true;if(e===C){z();}
o=q(n);var ae=/\W/;if(o!==C&&ae.test(o)){o=V(W);}
var ab=q(E),af=q(I),ad,Z=C;if(af&&ab&&o){ad=af.split(".");if(ad.length===3){P=ad[0];m=parseInt(ad[1],10)+1;U=ad[2];}else{if(ad.length===4){Z=ad[0];P=ad[1];m=parseInt(ad[2],10)+1;U=ad[3];}}
if((W-(f*1000))>P){P=W;m=1;U=0;}}else{if(o&&af){ad=af.split(".");if(ad.length===4){Z=ad[0];}
P=W;m=1;U=0;}else{if(o&&ab){ad=ab.split(".");if(ad.length===4){Z=ad[0]}
P=W;m=1;U=0;}else{if(ab){r|=2;ad=ab.split(".");if(ad.length===3){P=ad[0];m=parseInt(ad[1],10)+1;U=ad[2];}else{if(ad.length===4){Z=ad[0];P=ad[1];m=parseInt(ad[2],10)+1;U=ad[3];}}
if((W-(f*1000))>P){P=W;m=1;U=0;}}else{P=W;m=1;U=0;}}}}
if(o===C){o=V(W);}
l(n,o,M,"/");v=o+"."+P+"."+m+"."+U;l(I,v,g,"/");l(E,v,-1,"/");var Y=q(E),aa=q(I);if(Y===C){r|=1;}
if(aa===C){r|=2;}
K=q(A);if(K===C){K=0;}
try{H=top.document.referrer;}catch(ac){try{H=document.referrer;}catch(X){H=C;}}}
this.addTransaction=function(ab,aa,Z,X,Y){F=new T(ab,aa,Z,X,Y);};this.addItem=function(Z,Y,X){if(F!==C){F.addItem(Z,Y,X);}};this.addSearch=function(aa,Z,X,ab,Y){if(!k){S();}
O=aa;a=Z;w=X;p=ab;if(Y){j=Y;}
U=parseInt(U,10)+1;v=o+"."+P+"."+m+"."+U;K=W;l(I,v,g,"/");l(E,v,-1,"/");l(A,W,L,"/");};this.setPageType=function(X){u=X;};this.setLocation=function(X){t=X;};this.addPageSku=function(X){D.push(d(X));};this.setSystemUserId=function(X){b=X;};this.setCookieDomain=function(X){if(X.substring(0,1)!=="."){X="."+X;}
e="; domain="+X;y=c(e);};this.addCustomField=function(Y,X){var Z=[Y,X];if(h){i=[];h=0;}
i.push(Z);};this.writeTrackCode=function(){if(!k){S();}
var ac;try{ac=top.document.title;}catch(ab){try{ac=document.title}catch(Z){ac=C;}}
var Y=B,ad="logtype=pageview",aa;ad+="&custCode="+d(G);ad+="&siteId="+d(J);ad+="&pageTitle="+d(ac);ad+="&identifier="+d(o);ad+="&sessionId="+d(v);ad+="&lastVisit="+d(P);if(K){ad+="&lastSearch="+d(K);}
if(t){ad+="&location="+d(t);}
if(b){ad+="&systemUserId="+d(b);}
if(O){ad+="&searchTerm="+d(O);}
if(u){ad+="&pageType="+d(u);}
if(w){ad+="&searchPageNumber="+d(w);}
if(a){ad+="&numberSearchResults="+d(a);}
if(p){ad+="&searchRefinements="+d(p);}
if(j){ad+="&sort="+d(j);}
if(H){ad+="&referrer="+d(H);}
if(r){ad+="&bcf="+d(r);}
if(D.length){ad+="&pageSKU="+D.join(";");D=[];}
if(i.length){ad+="&customFields=";for(aa=0;aa<i.length;aa++){var X="("+d(i[aa][0])+":"+d(i[aa][1])+")";ad+=(aa>0)?";"+X:X;}
h=1;}
var ae=new Image(1,1);ae.src=s+"//"+Y+ad;ae.onload=function(){}};this.writeTransactionCode=function(){if(!k){S();}
var Y=B,aa="logtype=transaction";aa+="&custCode="+d(G);aa+="&siteId="+d(J);aa+="&transactionId="+d(F.transactionId);aa+="&systemUserId="+d(F.systemUserId);aa+="&orderTotal="+d(F.orderTotal);aa+="&shippingTotal="+d(F.shippingTotal);aa+="&taxTotal="+d(F.taxTotal);aa+="&identifier="+d(o);aa+="&sessionId="+d(v);aa+="&lastVisit="+d(P);if(K){aa+="&lastSearch="+d(K);}
if(r){aa+="&bcf="+d(r);}
if(F.items.length){aa+="&items=";for(var Z=0;Z<F.items.length;Z++){aa+=(Z>0)?";"+F.items[Z].toString():F.items[Z].toString();}}
if(i.length){aa+="&customFields=";for(Z=0;Z<i.length;Z++){var X="("+d(i[Z][0])+":"+d(i[Z][1])+")";aa+=(Z>0)?";"+X:X;}
h=1;}
var ab=new Image(1,1);ab.src=s+"//"+Y+aa;ab.onload=function(){}};function c(aa){var Y=0;for(var X=0,Z=aa.length;X<Z;X++){Y=(Y>>2)^aa.charCodeAt(X);}
return"_"+Y;}
function z(){var Z=document.domain.split(".");var Y=Z[Z.length-1];for(var X=Z.length-2;X>=0;X--){Y=Z[X]+"."+Y;y=c(Y);e="; domain="+Y;l("locator","s",-1,"/");if(q("locator")!==C){l("locator","s",0,"/");return e;}}
e="; domain="+document.domain;y=c(e);}};try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.qsp_delim="&";u.kvp_delim="=";u.acct="514";u.pageType="checkout-confirmation";u.map={};u.extend=[];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!="undefined"){if(b._corder){d=new SliSpark(u.acct,"1");d.setPageType(u.pageType);d.addTransaction(b._corder,(b._ccustid||"1"),b._ctotal,b._cship,b._ctax);for(c=0;c<b._cprod.length;c++){d.addItem(b._cprod[c],b._cquan[c],b._cprice[c]);}
d.writeTrackCode();d.writeTransactionCode();}}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('8','hott.hottopic');}catch(e){}
