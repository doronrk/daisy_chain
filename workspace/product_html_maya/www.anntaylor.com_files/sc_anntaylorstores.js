/* Tag Version 6.2 Copyright 2000-2005 CheetahMail, an Experian Company */
if (! h_w.hs_ES) { var hs_ES=""; }
var h_d=h_w.document;
var hs_ev5=h_d.URL;
var hs_n5="";
var hs_TR=h_d.referrer.toLowerCase();
var hs_prot="http"; if (h_d.location.protocol.indexOf('https') > -1) {  hs_prot="https"; }
var hs_chkDom="";
var hs_QSI="&&";
if (! h_w.hs_defPg || h_w.hs_defPg == "")
h_w.hs_defPg="index.html";
var hs_aff="anntaylorstores";
var hs_coll="wvw.anntaylor.com";
hs_coll=hs_prot+"://"+hs_coll+"/spacer.gif?";
var hs_levo="120";
var hs_levopn="1001";
var hs_levi="119";
var hs_levii="122";
var hs_dlpgnm="1002";
var hs_dlnm="118";
var hs_dlev="123";
var hs_dlts="&pdf&wmv&ra&ram&rm&doc&xls&ppt&exe&zip&wav&mp3&mov&mpg&avi&sxi&sxc&";
var hsd="QZQ";
if (h_w.hs_aOE)
{ hs_ES=h_w.hs_aOE+hs_ES; }
if (! h_w.hs_CB) {var hs_CB="hscbrnd="+Math.floor(Math.random()*10000)+"&";
if (h_d.h_xes_ao && h_d.h_xes_ao.x_nocb && h_d.h_xes_ao.x_nocb.value=="1") { hs_CB="";}}
function hs_repl (hs_pstr, hs_fstr, hs_rstr)
{ var hs_repStr="";
hs_tInd=hs_pstr.indexOf (hs_fstr);
while (hs_tInd != -1)
{ hs_repStr=hs_repStr+hs_pstr.substring (0, hs_tInd)+hs_rstr;
hs_pstr=hs_pstr.substring(hs_tInd+hs_fstr.length);
hs_tInd=hs_pstr.indexOf (hs_fstr);}
return hs_repStr+hs_pstr;}
function hs_esc (hs_pqs)
{ var hs_retStr=escape (hs_pqs);
hs_retStr=hs_repl(hs_retStr, "~", "%7E");
hs_retStr=hs_repl(hs_retStr, "?", "%3F");
hs_retStr=hs_repl(hs_retStr, "&", "%26");
return hs_retStr;}
function hs_ce (eID,eStr)
{ tStr=eStr; aC=1;
while (tStr.length > 0 && tStr.indexOf ("~") >= 0)
{ fI=tStr.indexOf ("~");
tEv=tVal="";
if (fI != -1) {tEv=tStr.substring(0,fI); } else {return 0;}
tStr=tStr.substring (fI+1);
fI=tStr.indexOf ("~");
if (fI != -1) {tVal=tStr.substring(0,fI); tStr=tStr.substring (fI+1); }
else {tVal=tStr; tStr="";}
if (tEv == eID) {  if (tVal == "") { tVal="No Value"; } return tVal;}}
return 0;}
function hs_gtCk (hs_cn)
{ var hs_tcne=hs_cn+"=";
var hs_ca=h_d.cookie.split(';');
for(var i=0;i < hs_ca.length;i++)
{ var hs_tcn=hs_ca[i];
while (hs_tcn.charAt(0)==' ') hs_tcn=hs_tcn.substring(1,hs_tcn.length);
if (hs_tcn.indexOf(hs_tcne) == 0) return hs_tcn.substring(hs_tcne.length,hs_tcn.length);}
return 0;}
function CkexistingCart(){
    // get date check cookie
    var a=hs_gtCk('remarketing_return');
    if(a) {
        var b=new Date().getTime();
        // more than 1 day old
	if(b-a>86400000) {
            var c=(b-a);
            var d=parseInt(c/86400000,10);
            return d;
        } else
            return '';
    } else
        return '';
}
if(hs_gtCk('hs_basket')!= "")
hs_ES = hs_gtCk('hs_basket').replace(/\|\|/g,'').replace(/\|/g,'~').replace(/~~/g,'~') + hs_ES;

if(CkexistingCart()!="")
hs_ES = hs_ES + "~1010~"+CkexistingCart();

function hs_stCk(hs_cn, hs_cv, hs_perm)
{ var hs_ckExp="";
if (hs_perm == 1)
{ var has_expDate=new Date();
has_expDate.setTime(has_expDate.getTime()+(157680000));
hs_ckExp="; expires="+has_expDate.toGMTString();}
h_d.cookie=hs_cn+"="+hs_cv+hs_ckExp+"; path=/";}
function hs_extDom (hs_fullURL, addWWW)
{ var hs_retDom="";
var DI=hs_fullURL.indexOf("//");
if (DI != -1)
{ hs_retDom=hs_fullURL.substring (DI+2).toLowerCase();
DI=hs_retDom.indexOf ("/");
if (DI != -1) { hs_retDom=hs_retDom.substring(0,DI) } }
if (addWWW == 0) return hs_retDom;
var fp=hs_retDom.indexOf (".");
if (fp != -1)
{ fp=hs_retDom.substring(fp+1).indexOf (".");
if(fp == -1)  hs_retDom="www."+hs_retDom;}
return hs_retDom;}
function hs_addDefPg (hses)
{ if (hs_defPg == "donothing") return hses;
hs_fS=hses.indexOf ("://");
if (hs_fS != -1)
{  hs_fS += 3; }
if (hses.substring (hses.length - 1) == "/")
{  hses += hs_defPg; return hses;  }
hs_lD=hses.substring (hs_fS);
if (hs_lD.indexOf ("/") == -1)
{   hses += "/"+hs_defPg; return hses; }
hs_lD=hses.substring (hs_fS);
hs_fS=hs_lD.indexOf ("/");
while (hs_fS != -1)
{ hs_lD=hs_lD.substring (hs_fS+1);
hs_fS=hs_lD.indexOf ("/");}
if (hs_lD.indexOf (".") == -1) { hses += "/"+hs_defPg; }
return hses;}
function hs_gEv(pgRf,rqType)
{ SI=OSI=pgRf.indexOf("?");
var hses="";
if (OSI >= 0)
{ QS=pgRf.substring (SI+1);
SI=QS.indexOf ("&");
if (SI == -1) { SI=QS.length; }
if (rqType == "qs") { hses=hs_addDefPg(pgRf.substring (0,OSI)); }
while (QS)
{ st=QS.substring (0,SI);
QS=QS.substring (SI+1);
SI=QS.indexOf("&")
if (SI == -1) { SI=QS.length; }
eV=st.split ("=");
if (eV.length == 2)
{ tE=eV[0];
if (rqType == "qs")
{ hsI=tE.indexOf ("hs");
if (hsI == 0 || hs_QSI.indexOf("&"+eV[0]+"&") >= 0)
{ if (OSI != -1)
{ hses=hses+"?"+st;
OSI=-1;}
else
{ hses=hses+"&"+st;}}}
else
{ if (tE == "yyy")
{ hses="zzz~"+eV[1]+"~"+hses; }
else
{ hsI=tE.indexOf (rqType);
if (hsI == 0)
{ tE=tE.substring (rqType.length);
hses=tE+"~"+hs_esc(eV[1])+"~"+hses;}}}}}}
else if (rqType == "qs")
{ return hs_addDefPg(pgRf);}
return hses;}
hs_chkDom=hs_extDom (hs_ev5, 1);
var hs_add20=0;
if(hs_ce ("20",hs_ES) != 0){
hs_add20=1; }
hs_ev31=hs_ce ("31", hs_ES);
var hs_add31=0;
if (hs_ev31 == 0 || hs_ev31 == "No Value")
{ hs_add31=1;
hs_ev31=hs_gEv (hs_ev5, "qs");
hs_31Dom=hs_extDom (hs_ev31, 0);
if (hs_31Dom != hs_chkDom)
hs_ev31=hs_repl (hs_ev31, hs_31Dom, hs_chkDom);}
else
{ hs_31Dom=hs_extDom (hs_ev31, 0);
hs_chkDom=hs_31Dom;}
hs_n5=hs_ce ("5",hs_ES);
hs_ev31=hs_esc (hs_ev31);
if (hs_n5 == 0) { hs_n5=hs_ev31; }
function hs_mkHSD ()
{ var hs_qE="";
var hs_qV="";
for (var hs_AI=0; hs_AI < hs_mkHSD.arguments.length/2; hs_AI++)
{ if (hs_qE != "") { hs_qE += hsd; }
hs_qE += hs_mkHSD.arguments[hs_AI * 2];
if (hs_qV != "") { hs_qV += hsd; }
hs_qV += hs_mkHSD.arguments[hs_AI * 2+1];}
return hs_qE+"~"+hs_qV+"~";}
function hs_chgState(hs_flEv, hs_aCB)
{ if (!hs_ce ("5",hs_flEv) && !hs_ce ("29", hs_flEv))
hs_flEv="29~~"+hs_flEv;
if(hs_add20==1)
{ hs_flEv="20~~"+hs_flEv;}
if (!hs_ce ("28",hs_flEv) && h_w.hs_aff)
hs_flEv="28~"+h_w.hs_aff+"~"+hs_flEv;
hs_flEv="event="+hs_flEv;
if (hs_aCB)
hs_flEv="RND="+Math.floor(Math.random()*10000)+"&"+hs_flEv;
if (h_d.hs_pix_es && h_d.hs_pix_es.src)
h_d.hs_pix_es.src=hs_coll+hs_flEv;}
function hs_flipPixel (lObj)
{ if (h_d.hs_pix_es && h_d.hs_pix_es.src && lObj.href && lObj.linkIndex >= 0)
{ var hs_trkLnk=lObj.href.toLowerCase();
var hs_lnkStr="";
if (!hs_trkLnk) { return; }
hs_trkDom=hs_extDom (hs_trkLnk, 1);
if (hs_trkDom == hs_chkDom)
{ hs_trkDom=hs_extDom(hs_trkLnk, 0);
if (hs_trkDom != hs_chkDom) hs_trkLnk=hs_repl (hs_trkLnk, hs_trkDom, hs_chkDom);
hs_trkLnk=hs_gEv (hs_trkLnk, "qs");
if (hs_31Dom && hs_trkLnk.indexOf (hs_31Dom) == -1)
hs_trkLnk=hs_repl (hs_trkLnk, hs_chkDom, hs_31Dom);
hs_trkLnk=hs_esc (hs_trkLnk);
hs_lnkStr=hs_mkHSD ("28",hs_aff,"5",hs_n5,"31",hs_ev31,hs_levi,hs_trkLnk,hs_levii,lObj.linkIndex);
hs_lkSpl=hs_trkLnk.split ("?");
hs_ext=hs_lkSpl[0]; pI=hs_ext.indexOf (".");
while (pI != -1) { hs_ext=hs_ext.substring (pI+1); pI=hs_ext.indexOf ("."); }
if (hs_dlts.indexOf ("&"+hs_ext+"&") == -1)
{ hs_lnkStr=hs_lnkStr.substring (0, hs_lnkStr.length-1);
if (h_w.hs_psES) { hs_lnkStr=hs_lnkStr+"~"+h_w.hs_psES; }
hs_stCk ("hs_psck",hs_lnkStr,0);
return;}
hs_lnkStr +=  hs_dlev+"~"+hs_ext+"~"+hs_dlnm+"~"+hs_trkLnk+"~"+ hs_dlpgnm+"~"+hs_n5+"~";}
else
{ hs_lnkStr=hs_mkHSD ("28",hs_aff,"5",hs_n5,"31",hs_ev31,hs_levi,hs_esc(hs_trkLnk),hs_levii,lObj.linkIndex);
if (hs_trkLnk.indexOf ('http') >= 0 && hs_trkLnk.indexOf ('http') < 2)
hs_lnkStr += hs_levo+"~"+hs_esc(hs_trkLnk)+"~"+hs_levopn+"~"+hs_n5+"~"+hs_gEv(lObj.href.toLowerCase(), "lohs");}
hs_lnkStr += "29~~28~"+hs_aff;
if(hs_add20==1)
{ hs_lnkStr="20~~"+hs_lnkStr;}
h_d.hs_pix_es.src=hs_coll+"RND="+Math.floor (Math.random()*10000)+"&event="+hs_lnkStr;
var currTime=new Date();
var startTime=new Date();
while( (currTime.getTime() - startTime.getTime()) < 450)
{    currTime=new Date(); }}}
function hs_click (passedArg)
{ hs_flipPixel (this);
if (this.origOnclick)
{   return this.origOnclick (passedArg);   }
return true;}
function hs_stub(e)
{   return true; }
function hs_linkFix (passedArg)
{ if (h_w.linksChecked == 1)
{    return; }
if (!h_d.links)
{    h_w.linksChecked=1; return; }
h_w.origOnError=h_w.onerror;
h_w.onerror=hs_stub;
linkArray=h_d.links;
for (i=0; i < linkArray.length; i++)
{ currLink=linkArray[i];
currLink.origOnclick=currLink.onclick;
currLink.linkIndex=i;
currLink.onclick=hs_click;}
h_w.onerror=h_w.origOnError;
h_w.linksChecked=1;
if (h_w.hs_strt)
{ hs_td=new Date(); var hs_end=hs_td.getTime(); hs_td=(hs_end - h_w.hs_strt)/ 1000.0;
if (h_d.hs_pix_es && h_w.sc_timePage && h_w.sc_timePage == 1) {
h_d.hs_pix_es.src=hs_coll+"event=29~~28~"+hs_aff+"~32~"+hs_td+"~121~"+hs_n5; }}
if (h_w.origOnload)
{     h_w.origOnload(passedArg);	}}
hs_ES=hs_gEv (hs_ev5,"hs")+hs_ES;
if (hs_chkDom)
{  var hs_TR=h_d.referrer.toLowerCase();
if (hs_TR != "")
{ hs_refDom=hs_extDom (hs_TR, 1);
if (hs_refDom != hs_chkDom)
{   hs_TR=hs_esc (hs_TR); hs_TR=hs_repl (hs_TR,"/","%2F");
hs_ES="2~"+hs_TR+"~"+hs_ES; } } }
hs_ES="7~"+screen.width+"x"+screen.height+"~"+hs_ES;
if (h_d.h_xes_ao && h_d.h_xes_ao.x_ao)
{ hs_ES=h_d.h_xes_ao.x_ao.value+hs_ES;}
hs_taff=hs_ce ("28",hs_ES);
if (hs_taff != 0 && hs_taff != "No Value")
{ hs_aff=hs_taff; }
else
{ hs_ES="28~"+hs_aff+"~"+hs_ES; }
if (hs_ce ("5",hs_ES) == 0) { hs_ES="5~"+hs_n5+"~"+hs_ES; }
if (hs_ce ("53",hs_ES) == 0) { hs_ES="53~"+hs_n5+"~"+hs_ES; }
if (hs_add31)
hs_ES="31~"+hs_ev31+"~"+hs_ES;
hs_ES=hs_repl (hs_ES,"'","%27");
hs_taff=hs_gtCk("hs_psck");
if (hs_taff != 0) { hs_ES=hs_taff+"~"+hs_ES; hs_stCk("hs_psck","",0);}

var imgElem = document.createElement("img");
var src = hs_coll+hs_CB+'event='+hs_ES;
imgElem.setAttribute("name", "hs_pix_es");
imgElem.setAttribute("src", src);
imgElem.setAttribute("height", "1");
imgElem.setAttribute("width", "1");
imgElem.setAttribute("alt", "");

if(document.body != undefined){
	document.body.appendChild(imgElem);
}

//h_d.write("<i"+"mg"+" name='hs_pix_es' src='"+hs_coll+hs_CB+"event="+hs_ES+"' border=0 height=1 width=1 alt=''/>");
h_w.linksChecked=0;
h_w.origOnload=h_w.onload;
//h_w.onload=hs_linkFix;
