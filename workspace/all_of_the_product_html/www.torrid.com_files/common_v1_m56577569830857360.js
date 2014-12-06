// Login Enter Key
function submitenter(formName,e){
var keycode;
var form = document.forms[formName];
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;
		if (keycode == 13) {
		form.submit();
  		 }
}

// gerneric image swap
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

//url redirect
function csgoto(){
var url = document.getElementById('drpContactChoices').value;
window.location = url;
}

function divaon(divOn, divOff){
	document.getElementById(divOn).style.visibility="visible";
	document.getElementById(divOff).style.visibility="hidden";
}

function divaoff(divOn, divOff){
	document.getElementById(divOn).style.visibility="hidden";
	document.getElementById(divOff).style.visibility="visible";
}

// larger product view
function viewLargerShow(div){
document.getElementById(div).style.visibility="visible";
}
function viewLargerHide(div){
document.getElementById(div).style.visibility="hidden";
}
function LargeImageSwap(imgid,src){
document.getElementById(imgid).setAttribute("src", src);
}

// generic show hide
function hide(element){
if(document.getElementById(element)){
document.getElementById(element).style.visibility="hidden";
}
}
function show(element){
if(document.getElementById(element)){
document.getElementById(element).style.visibility="visible";
}
}

// product zoom
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('7 b=\'E\';7 W=3D.3E.3F();6(W.1Q("1F")!=-1){b=\'1F\'}z 6(W.1Q("E")!=-1){b=\'E\'}z 6(W.1Q("1r")!=-1){b=\'1r\'}z 6(W.1Q("3C")!=-1){b=\'1W\'}7 1o=18 3B();a 1B(u){g 9.3x(u)};a 2M(e){6(e.2B){7 r=e.2B();7 1O=0;7 1M=0;6(9.X&&(9.X.1m||9.X.Y)){1M=9.X.Y;1O=9.X.1m}z 6(9.U&&(9.U.1m||9.U.Y)){1M=9.U.Y;1O=9.U.1m}g{\'t\':r.t+1O,\'F\':r.F+1M,\'2m\':r.2m+1O,\'1V\':r.1V+1M}}}a 2f(){g q};7 37=a(){7 S=1D;6(!S[1])S=[4,S[0]];1h(7 2t 3z S[1])S[0][2t]=S[1][2t];g S[0]};a T(1G,N,1y){6(b==\'1W\'||b==\'1F\'||b==\'1r\'){1G.3G(N,1y,q)}z 6(b==\'E\'){1G.3H("2i"+N,1y)}};a 2G(1G,N,1y){6(b==\'1W\'||b==\'1F\'||b==\'1r\'){1G.3O(N,1y,q)}z 6(b==\'E\'){1G.3Q("2i"+N,1y)}};a 2J(){7 1C=[];1h(7 i=0;i<1D.1l;i++)1h(7 j=0;j<1D[i].1l;j++)1C.2l(1D[i][j]);g 1C};a 2K(2r,2U){1C=[];1h(7 i=2U;i<2r.1l;i++)1C.2l(2r[i]);g 1C};a 12(2p,2V){7 S=2K(1D,2);g a(){2p[2V].3I(2p,2J(1D,S))}};a 1v(e){6(b==\'1W\'||b==\'1r\'||b==\'1F\'){e.2L=G;e.3L();e.3R()}z 6(b==\'E\'){P.N.2L=G}};a B(2I,2H,2E,2F,h){4.2b=q;4.D=1B(2I);4.C=1B(2H);4.c=1B(2E);4.m=1B(2F);4.l=0;4.h=h;6(!4.h["1t"]){4.h["1t"]=""}4.1N=0;4.1w=0;4.16=0;4.Z=0;4.1a=20;4.3l=20;4.13=0;4.11=0;4.3v=\'\';4.1Z=q;1o.2l(4);4.2k=12(4,"22")};B.Q.32=a(){2G(P.9,"1H",4.2k)};B.Q.22=a(e){7 y=0;7 x=0;6(b==\'E\'){y=e.1K;x=e.1L;6(9.X&&(9.X.1m||9.X.Y)){y=e.1K+9.X.Y;x=e.1L+9.X.1m}z 6(9.U&&(9.U.1m||9.U.Y)){y=e.1K+9.U.Y;x=e.1L+9.U.1m}}z{y=e.1K;x=e.1L;y+=P.2P;x+=P.2O}1f=1b=0;7 H=4.C;1I(H.1A!="2T"&&H.1A!="2D"){1f+=H.2S;1b+=H.2v;H=H.2R}6(b==\'E\'){r=2M(4.C);1b=r[\'t\'];1f=r[\'F\']}6(x>O(1b+4.16)){4.1J();g q}6(x<O(1b)){4.1J();g q}6(y>O(1f+4.Z)){4.1J();g q}6(y<O(1f)){4.1J();g q}6(b==\'E\'){4.D.5.1x=1}g G};B.Q.2z=a(e){1v(e);4.D.5.2s=\'2N\'};B.Q.2x=a(e){1v(e);4.D.5.2s=\'3o\'};B.Q.1H=a(e){1v(e);1h(i=0;i<1o.1l;i++){6(1o[i]!=4){1o[i].22(e)}}6(4.h&&4.h["1u"]==G){6(4.D.5.2s!=\'2N\'){g}}6(4.2b){g}6(!4.22(e)){g}4.2b=G;7 25=4.C;7 1b=0;7 1f=0;6(b==\'1W\'||b==\'1F\'||b==\'1r\'){7 H=25;1I(H.1A!="2T"&&H.1A!="2D"){1f+=H.2S;1b+=H.2v;H=H.2R}}6(b==\'E\'){4.13=N.x-4.C.2v;7 Y=0;4.11=N.y+Y}z{4.13=e.1L-1b;4.11=e.1K-1f;4.13+=P.2O;4.11+=P.2P}6((4.13+4.1a/2)>=4.16){4.13=4.16-4.1a/2}6((4.11+4.1j/2)>=4.Z){4.11=4.Z-4.1j/2}6((4.13-4.1a/2)<=0){4.13=4.1a/2}6((4.11-4.1j/2)<=0){4.11=4.1j/2}2o(12(4,"2y"),10)};B.Q.2y=a(){4.l.5.t=(4.13-4.1a/2)+\'M\';4.l.5.F=(4.11-4.1j/2)+\'M\';4.l.5.1s="28";2Q=O(4.l.5.t)*(4.1N/4.16);2W=O(4.l.5.F)*(4.1w/4.Z);4.m.5.t=(-2Q)+\'M\';4.m.5.F=(-2W)+\'M\';4.c.5.29=\'2u\';4.c.5.1s=\'28\';4.m.5.29=\'2u\';4.m.5.1s=\'28\';4.2b=q};a 4k(2g){7 2e="";1h(i=0;i<2g.1l;i++){2e+=4l.4b(14^2g.40(i))}g 2e};B.Q.1J=a(){6(4.h&&4.h["1Y"]==G)g;4.l.5.1s="1R";4.c.5.29=\'2w\';4.c.5.1s=\'28\';6(b==\'E\'){4.D.5.1x=0}};B.Q.2n=a(){4.1a=(O(4.c.5.J)-3)/(4.1N/4.16);6(4.h&&4.h["1t"]!=""){4.1j=(O(4.c.5.K)-3-19)/(4.1w/4.Z)}z{4.1j=(O(4.c.5.K)-3)/(4.1w/4.Z)}4.l.5.J=4.1a+\'M\';4.l.5.K=4.1j+\'M\'};B.Q.3c=a(){4.l=9.R("2a");4.l.21=\'41\';4.l.5.1x=10;4.l.5.1s=\'1R\';4.l.5.n=\'2q\';4.l.5["L"]=2h(4.h[\'L\']/1z.0);4.l.5["-42-L"]=2h(4.h[\'L\']/1z.0);4.l.5["-48-L"]=2h(4.h[\'L\']/1z.0);4.l.5["2C"]="49(47="+4.h[\'L\']+")";4.2n();4.D.1k(4.l);4.D.46="2i";4.D.5.43="2w";4.D.4a=2f;4.D.45=2f};B.Q.3f=a(){7 2A=4.m.1i;1I(4.c.1c){4.c.3a(4.c.1c)}6(b==\'E\'){7 f=9.R("44");f.5.t=\'V\';f.5.F=\'V\';f.5.n=\'2q\';f.5.2C=\'3V:3U.3W.3Y(5=0,L=0)\';f.5.J=4.c.5.J;f.5.K=4.c.5.K;f.4i=0;4.c.1k(f)}6(4.h&&4.h["1t"]!=""){7 f=9.R("2a");f.21=\'4n\';f.5.n=\'1S\';f.5.1x=10;f.5.t=\'V\';f.5.F=\'V\';f.5.4j=\'4f\';f.4h=4.h["1t"];4.c.1k(f)}7 27=9.R("2a");27.5.38="1R";4.c.1k(27);4.m=9.R("1g");4.m.1i=2A;4.m.5.n=\'1S\';27.1k(4.m)};B.Q.1E=a(){6(W.1Q("1r")!=-1){6(!4.1Z){T(4.m,"3g",12(4,"1E"));4.1Z=G;g}}z{6(!4.m.3h||!4.C.3h){2o(12(4,"1E"),1z);g}}4.1N=4.m.J;4.1w=4.m.K;4.16=4.C.J;4.Z=4.C.K;6(4.1N==0||4.1w==0||4.16==0||4.Z==0){2o(12(4,"1E"),1z);g}4.D.5.J=4.C.J+\'M\';4.D.5.K=4.C.K+\'M\';4.c.5.t=4.C.J+15+\'M\';4.c.5.F=\'V\';2Y(4.h[\'n\']){1e\'t\':4.c.5.t=\'-\'+(15+O(4.c.5.J))+\'M\';17;1e\'1V\':4.c.5.F=4.C.K+15+\'M\';4.c.5.t=\'V\';17;1e\'F\':4.c.5.F=\'-\'+(15+O(4.c.5.K))+\'M\';4.c.5.t=\'V\';17;1e\'1P\':4.c.5.t=\'V\';4.c.5.F=\'V\';17}6(4.l){4.2n();g}4.3f();4.3c();T(P.9,"1H",4.2k);T(4.D,"1H",12(4,"1H"));6(4.h&&4.h["1u"]==G){T(4.D,"2z",12(4,"2z"));T(4.D,"2x",12(4,"2x"));4.13=4.16/2;4.11=4.Z/2;4.2y()}};B.Q.2j=a(e,26){6(26.24==4.m.1i)g;7 1T=9.R("1g");1T.u=4.m.u;1T.1i=26.24;7 p=4.m.2X;p.39(1T,4.m);4.m=1T;4.m.5.n=\'1S\';7 1X=9.R("1g");1X.u=4.C.u;1X.1i=26.36;7 p=4.C.2X;p.39(1X,4.C);4.C=1X;4.1Z=q;4.1E()};a 2Z(u,v){7 8=P.9.3b("A");1h(7 i=0;i<8.1l;i++){6(8[i].1d==u){T(8[i],"2d",a(N){6(b!=\'E\'){4.3i()}z{P.3e()}1v(N);g q});T(8[i],v.h[\'1U\'],12(v,"2j",8[i]));8[i].35=37;8[i].35({v:v,3T:a(){4.v.2j(3X,4)}});7 2c=9.R("1g");2c.1i=8[i].24;2c=9.R("1g");2c.1i=8[i].36}}};a 3Z(){1I(1o.1l>0){7 v=1o.4o();v.32()}};a 31(){7 8=P.9.3b("A");1h(7 i=0;i<8.1l;i++){6(8[i].21=="B"){1I(8[i].1c){6(8[i].1c.1A!=\'1g\'){8[i].3a(8[i].1c)}z{17}}6(8[i].1c.1A!=\'1g\')4m"4d B 4c!";7 1n=3d.4e(3d.4g()*3S);8[i].v=v;8[i].5.n="1S";8[i].5.29=\'2u\';8[i].5.3J=\'2w\';T(8[i],"2d",a(N){6(b!=\'E\'){4.3i()}z{P.3e()}1v(N);g q});6(8[i].u==\'\'){8[i].u="3n"+1n}6(b==\'E\'){8[i].5.1x=0}7 25=8[i].1c;25.u="34"+1n;7 o=9.R("2a");o.u="3u"+1n;I=18 1p(/L(\\s+)?:(\\s+)?(\\d+)/i);k=I.1q(8[i].1d);7 L=3s;6(k){L=O(k[3])}I=18 1p(/3r\\-3t(\\s+)?:(\\s+)?(2d|3q)/i);k=I.1q(8[i].1d);7 1U=\'2d\';6(k){1U=k[3]}I=18 1p(/v\\-J(\\s+)?:(\\s+)?(\\w+)/i);k=I.1q(8[i].1d);o.5.J=\'30\';6(k){o.5.J=k[3]}I=18 1p(/v\\-K(\\s+)?:(\\s+)?(\\w+)/i);k=I.1q(8[i].1d);o.5.K=\'30\';6(k){o.5.K=k[3]}I=18 1p(/v\\-n(\\s+)?:(\\s+)?(\\w+)/i);k=I.1q(8[i].1d);o.5.t=8[i].1c.J+15+\'M\';o.5.F=\'V\';7 n=\'2m\';6(k){2Y(k[3]){1e\'t\':n=\'t\';17;1e\'1V\':n=\'1V\';17;1e\'F\':n=\'F\';17;1e\'1P\':n=\'1P\';17}}I=18 1p(/3j\\-3m(\\s+)?:(\\s+)?(G|q)/i);k=I.1q(8[i].1d);7 1u=q;6(k){6(k[3]==\'G\')1u=G}I=18 1p(/3k\\-3p\\-v(\\s+)?:(\\s+)?(G|q)/i);k=I.1q(8[i].1d);7 1Y=q;6(k){6(k[3]==\'G\')1Y=G}o.5.38=\'1R\';o.21="3K";o.5.1x=1z;o.5.1s=\'1R\';6(n!=\'1P\'){o.5.n=\'2q\'}z{o.5.n=\'1S\'}7 23=9.R("1g");23.u="33"+1n;23.1i=8[i].24;o.1k(23);6(n!=\'1P\'){8[i].1k(o)}z{1B(8[i].u+\'-3w\').1k(o)}7 h={1Y:1Y,1u:1u,1t:8[i].3M,L:L,1U:1U,n:n};7 v=18 B(8[i].u,\'34\'+1n,o.u,\'33\'+1n,h);v.1E();2Z(8[i].u,v)}}};6(b==\'E\')3N{9.3P("3A",q,G)}3y(e){};T(P,"3g",31);',62,273,'||||this|style|if|var|aels|document|function|MagicZoom_ua|bigImageCont||||return|settings|||matches|pup|bigImage|position|bigCont||false|||left|id|zoom||||else||MagicZoom|smallImage|smallImageCont|msie|top|true|tag|re|width|height|opacity|px|event|parseInt|window|prototype|createElement|args|MagicZoom_addEventListener|documentElement|0px||body|scrollTop|smallImageSizeY||positionY|MagicZoom_createMethodReference|positionX|||smallImageSizeX|break|new||popupSizeX|smallX|firstChild|rel|case|smallY|IMG|for|src|popupSizeY|appendChild|length|scrollLeft|rand|MagicZoom_zooms|RegExp|exec|safari|visibility|header|drag_mode|MagicZoom_stopEventPropagation|bigImageSizeY|zIndex|listener|100|tagName|_el|result|arguments|initZoom|opera|obj|mousemove|while|hiderect|clientY|clientX|wy|bigImageSizeX|wx|custom|indexOf|hidden|relative|newBigImage|thumb_change|bottom|gecko|newSmallImage|bigImage_always_visible|safariOnLoadStarted||className|checkcoords|bigImg|href|smallImg|ael|ar1|visible|display|DIV|recalculating|img|click|vc68|MagicView_ia|vc67|parseFloat|on|replaceZoom|checkcoords_ref|push|right|recalculatePopupDimensions|setTimeout|object|absolute|sequence|cursor|property|block|offsetLeft|none|mouseup|showrect|mousedown|bigimgsrc|getBoundingClientRect|filter|HTML|bigImageContId|bigImageId|MagicZoom_removeEventListener|smallImageId|smallImageContId|MagicZoom_concat|MagicZoom_withoutFirst|cancelBubble|MagicZoom_getBounds|move|pageXOffset|pageYOffset|perX|offsetParent|offsetTop|BODY|skip|methodName|perY|parentNode|switch|MagicZoom_findSelectors|300px|MagicZoom_findZooms|stopZoom|bim|sim|mzextend|rev|MagicZoom_extendElement|overflow|replaceChild|removeChild|getElementsByTagName|initPopup|Math|focus|initBigContainer|load|complete|blur|drag|always|popupSizey|mode|sc|default|show|mouseover|thumb|50|change|bc|baseuri|big|getElementById|catch|in|BackgroundImageCache|Array|mozilla|navigator|userAgent|toLowerCase|addEventListener|attachEvent|apply|textDecoration|MagicZoomBigImageCont|preventDefault|title|try|removeEventListener|execCommand|detachEvent|stopPropagation|1000000|selectThisZoom|DXImageTransform|progid|Microsoft|null|Alpha|MagicZoom_stopZooms|charCodeAt|MagicZoomPup|moz|MozUserSelect|IFRAME|oncontextmenu|unselectable|Opacity|html|alpha|onselectstart|fromCharCode|invocation|Invalid|round|3px|random|innerHTML|frameBorder|padding|xgdf7fsgd56|String|throw|MagicZoomHeader|pop'.split('|'),0,{}))

/* no need for this function anymore
function showAltImages(){
//magic zoom alt views
var mainthumb = document.getElementById("mainthumb");
var thumb1 = document.getElementById("thumb1");
var thumb2 = document.getElementById("thumb2");
var thumb3 = document.getElementById("thumb3");
var thumb4 = document.getElementById("thumb4");
var thumb5 = document.getElementById("thumb5");
var thumb6 = document.getElementById("thumb6");


if(thumb1.complete && thumb1.naturalWidth != 0) {
	thumb1.style.visibility="visible";
	mainthumb.style.visibility="visible";
	}else{
	thumb1.parentNode.removeChild(thumb1);
	mainthumb.parentNode.removeChild(mainthumb);
	document.getElementById('altImages').style.border = "0px";
	return;
	}
if(thumb2.complete && thumb2.naturalWidth != 0) {
	thumb2.style.visibility="visible";
	}else{
	thumb2.parentNode.removeChild(thumb2);
	}
if(thumb3.complete && thumb2.naturalWidth != 0) {
	thumb3.style.visibility="visible";
	}else{
	thumb3.parentNode.removeChild(thumb3);
	}
if(thumb4.complete && thumb4.naturalWidth != 0) {
	thumb4.style.visibility="visible";
	}else{
	thumb4.parentNode.removeChild(thumb4);
	}
if(thumb5.complete && thumb5.naturalWidth != 0) {
	thumb5.style.visibility="visible";
	}else{
	thumb5.parentNode.removeChild(thumb5);
	}
if(thumb6.complete && thumb6.naturalWidth != 0) {
	thumb6.style.visibility="visible";
	}else{
	thumb6.parentNode.removeChild(thumb6);
	}
}
*/

function thumbnailClear(){
var thumb1 = document.getElementById("thumb_1");
var thumb2 = document.getElementById("thumb_2");
var thumb3 = document.getElementById("thumb_3");
var thumb4 = document.getElementById("thumb_4");
var thumb5 = document.getElementById("thumb_5");
var thumb6 = document.getElementById("thumb_6");
if(thumb1.complete && thumb1.naturalWidth != 0) {
	thumb1.style.visibility="visible";
	}else{
	thumb1.parentNode.removeChild(thumb1);
	}
if(thumb2.complete && thumb2.naturalWidth != 0) {
	thumb2.style.visibility="visible";
	}else{
	thumb2.parentNode.removeChild(thumb2);
	}
if(thumb3.complete && thumb3.naturalWidth != 0) {
	thumb3.style.visibility="visible";
	document.getElementById('ajaxContent').style.height=500 + "px";
	}else{
	thumb3.parentNode.removeChild(thumb3);
	document.getElementById('ajaxContent').style.height=430 + "px";
	}
if(thumb4.complete && thumb4.naturalWidth != 0) {
	thumb4.style.visibility="visible";
	}else{
	thumb4.parentNode.removeChild(thumb4);
	}
if(thumb5.complete && thumb5.naturalWidth != 0) {
	thumb5.style.visibility="visible";
	}else{
	thumb5.parentNode.removeChild(thumb5);
	}
if(thumb6.complete && thumb6.naturalWidth != 0) {
	thumb6.style.visibility="visible";
	}else{
	thumb6.parentNode.removeChild(thumb6);
	}
}




function removeThumbs(){
var thumb1 = document.getElementById("thumb_1");
var thumb2 = document.getElementById("thumb_2");
var thumb3 = document.getElementById("thumb_3");
var thumb4 = document.getElementById("thumb_4");
var thumb5 = document.getElementById("thumb_5");
var thumb6 = document.getElementById("thumb_6");
if(thumb1) {
	thumb1.parentNode.removeChild(thumb1);
	}
if(thumb2) {
	thumb2.parentNode.removeChild(thumb2);
	}
if(thumb3) {
	thumb3.parentNode.removeChild(thumb3);
	}
if(thumb4) {
	thumb4.parentNode.removeChild(thumb4);
	}
if(thumb5) {
	thumb5.parentNode.removeChild(thumb5);
	}
if(thumb6) {
	thumb6.parentNode.removeChild(thumb6);
	}
}




function errorControl(status){
	try{
		if(status =="front"){
		document.getElementById('error_slidedown').style.zIndex=25;
		document.getElementById('error_close').style.zIndex=26;
		}
		if(status =="back"){
		document.getElementById('error_slidedown').style.zIndex=-2;
		document.getElementById('error_close').style.zIndex=-1;
		}
	}catch(e){
		//
	}
}

//Error div mozilla fix
function errorDivHide(){
setTimeout('hideErrorTimer()',2400);
}
function hideErrorTimer(){
errorControl('back');
}

//error drop down
var initHeight = 0;
var slidedown_direction = 1;
var slidedownContentBox = false;
var slidedownContent = false;
var slidedownActive = false;
var contentHeight = false;
var slidedownSpeed = 4;  // Higher value = faster script
var slidedownTimer = 7; // Lower value = faster script

function slidedown_showHide() {
  if(initHeight==0 )
  slidedown_direction=slidedownSpeed;
  else slidedown_direction = slidedownSpeed*-1;
  if(!slidedownContentBox) {
    slidedownContentBox = document.getElementById('error_contentBox');
    slidedownContent = document.getElementById('error_content');
    contentHeight = document.getElementById('error_content').offsetHeight;
    if(contentHeight == 0)
    	contentHeight = document.getElementById('error_slidedown').offsetHeight;
  }
  errorControl('front');
	  try{
		  document.getElementById('error_close').innerHTML="<a href=\"#\" onMouseDown=\"slidedown_showHide(); errorDivHide();\"><img src="+mediaClearGif+" width=\"20\" height=\"20\" border=\"0\"></a>";
	  }catch(e){
			//let it go
	  }
  slidedownContentBox.style.visibility='visible';
  slidedownActive = true;
  slidedown_showHide_start();
}

function slidedown_showHide_start() {
  if(!slidedownActive)return;
  initHeight = initHeight/1 + slidedown_direction;
  if(initHeight <= 0) {
    slidedownActive = false;
    slidedownContentBox.style.visibility='hidden';
	errorControl('back');
	//document.getElementById('error_close').innerHTML="";
    initHeight = 0;
  }
  if(initHeight>contentHeight) {
    slidedownActive = false;

  }
  slidedownContentBox.style.height = initHeight + 'px';
  slidedownContent.style.top = initHeight - contentHeight + 'px';
  setTimeout('slidedown_showHide_start()',slidedownTimer); // Choose a lower value than 10 to make the script move faster
}

function setslidedownWidth(newWidth) {
  document.getElementById('error_slidedown').style.width = newWidth + 'px';
  document.getElementById('error_contentBox').style.width = newWidth + 'px';
}

function setSlideDownSpeed() {
  slidedownSpeed = 2;
}


// standard ajax request
	var http = false;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            http = new XMLHttpRequest();
            if (http.overrideMimeType) {
                http.overrideMimeType('text/xml');
                // See note below about this line
            }
        // IE
        } else if (window.ActiveXObject) { // IE
            try {
                http = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
            }
        }


		// Get the visitor’s browser information
var browser = navigator.appName;

// If the visitor is using IE, then use ActiveXObject
if (browser == "Microsoft Internet Explorer") {
var http = new ActiveXObject("Microsoft.XMLHTTP");
}
else {
var http = new XMLHttpRequest();
}



function ajax(element,url) {
  http.open("GET", url, true);
    http.onreadystatechange=function() {
    if(http.readyState == 4) {
      document.getElementById(element).innerHTML = http.responseText;

    }
  }
  http.send(null);
}

function ajaxNodePage(element,url) {// ajax function for the intial node page request
  	http.open("GET", url, true);
    http.onreadystatechange=function() {
		//document.getElementById(element).innerHTML = "<div style=\"padding-top:100px; padding-bottom:100px;\"><div class=\"Content\" style=\"font-size:16px;\"><img src=\"/media/torrid/images/loadinglabel.gif\"/></div><div style=\"padding-top:20px;\"><img src=\"/media/torrid/images/ajax-loader.gif\" border=\"0\"/></div></div>";

		document.getElementById('quickViewLoading').style.display = 'block';
        document.getElementById('quickViewDiv').style.display = 'none';

		if(http.readyState == 4) {
			var data = null;
			try{
				//document.write(http.responseText);
	      		//document.getElementById(element).innerHTML = http.responseText;
	      		data = eval('(' + http.responseText + ')');
				updateQuickView(data);
				document.getElementById('quickViewLoading').style.display = 'none';
				document.getElementById('quickViewDiv').style.display = 'block';
			}
			catch(ex)
			{
			alert(ex.message); // never displayed
			}

		  //setTimeout("thumbnailClear();",1000);
	    }
  	}
  	http.send(null);
}

function ajaxNodeCheck(element,url) {

	http.open("GET", url, true);
    http.onreadystatechange=function() {
    if(http.readyState == 4) {
		errorControl('front')

			try //Internet Explorer
			  {
			  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			  xmlDoc.async="false";
			  xmlDoc.loadXML(http.responseText);
			  }
			catch(e)
			  {
			  try //Firefox, Mozilla, Opera, etc.
			  {
			  parser=new DOMParser();
			  xmlDoc=parser.parseFromString(http.responseText,"text/xml");
			  }
			  catch(e)
			  {
			  alert(e.message);
			  return;
			  }
			}

		if(slidedownActive){
			slidedown_showHide();
		}

	var success = xmlDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue;
	if(success == "True")
	{
	var title = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
	var price = xmlDoc.getElementsByTagName("price")[0].childNodes[0].nodeValue;
	var sku = xmlDoc.getElementsByTagName("sku")[0].childNodes[0].nodeValue;
	var imgPath = "http://img.hottopic.com/is/image/HotTopic/"+sku+"_hi?wid=43&hei=65&fmt=jpeg&qlt=85,0&op_sharpen=1&resMode=bicub&op_usm=0.0,0.0,0,0&iccEmbed=0";
	var qty = xmlDoc.getElementsByTagName("qty")[0].childNodes[0].nodeValue;
	var message = xmlDoc.getElementsByTagName("message")[0].childNodes[0].nodeValue;
	var headerTotal = xmlDoc.getElementsByTagName("headertotal")[0].childNodes[0].nodeValue;
	//E4X Integration
	var currency;
	if (xmlDoc.getElementsByTagName("currency")[0] != null) {
		currency = xmlDoc.getElementsByTagName("currency")[0].childNodes[0].nodeValue;
	}

	var addText ="<table width=\"281\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
		+"<tr>"
		+"<td height=\"120px\" valign=\"top\" id=\"dropdowntd\" class=\"ContentPink9px\">"
        +"<div style=\"padding-bottom:10px;\"><strong>"+message+"</strong></div>"
			+"<table width=\"250\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">"
				+"<tr>"
					+"<td valign=\"top\"><img src=\""+imgPath+"\" /></td>"
					+"<td class=\"Content\" valign=\"top\" style=\"padding-left:5px;\">"
					+"<div id=\"title\" style=\"padding-bottom:5px;\"><strong> "+title+"</strong></div>"
					+"<div id=\"price\" style=\"padding-bottom:2px;\"><strong>Price:</strong> "+price+"</div>"
					+"<div id=\"price\" style=\"padding-bottom:2px;\"><strong>Sku:</strong> "+sku+"</div>"
					+"<div id=\"qty\"><strong>QTY:</strong> "+qty+"</div>"
					+"</td>"
					+"</tr>"
			+"</table>"
		+"</td>"
		+"</tr>"
	+"</table>";
	//E4X Integration
	if (currency) {
		addText ="<table width=\"281\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
			+"<tr>"
			+"<td height=\"120px\" valign=\"top\" id=\"dropdowntd\" class=\"ContentPink9px\">"
	        +"<div style=\"padding-bottom:10px;\"><strong>"+message+"</strong></div>"
				+"<table width=\"250\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">"
					+"<tr>"
						+"<td valign=\"top\"><img src=\""+imgPath+"\" /></td>"
						+"<td class=\"Content\" valign=\"top\" style=\"padding-left:5px;\">"
						+"<div id=\"title\" style=\"padding-bottom:5px;\"><strong> "+title+"</strong></div>"
						+"<div id=\"price\" style=\"padding-bottom:2px;\"><strong>Price:</strong> "+currency+" "+getCurrencySymbol(currency)+price+"</div>"
						+"<div id=\"price\" style=\"padding-bottom:2px;\"><strong>Sku:</strong> "+sku+"</div>"
						+"<div id=\"qty\"><strong>QTY:</strong> "+qty+"</div>"
						+"</td>"
						+"</tr>"
				+"</table>"
			+"</td>"
			+"</tr>"
		+"</table>";
		var total = headerTotal.split(']');
		headerTotal = total[0] + "] " + currency + " " + getCurrencySymbol(currency) + total[1].substring(1);
	}

	var currWindowLocation = window.location.toString();

	if (currWindowLocation.indexOf("ShoppingCart")>0)
		window.location="/torrid/cart/ShoppingCart.jsp";
	else if (currWindowLocation.indexOf("expressCart")>0)
	{
		hideQuickView();
		makeAjaxCall("/torrid/expressCart/default.jsp", null, decideState);
	}
	else{



	document.getElementById('error_content').innerHTML = addText;
	if (headerTotal != "false"){
	document.getElementById('ajaxCartTotal').innerHTML = headerTotal;
	}
	window.location = "#";
	errorControl('front');
	slidedown_showHide();
	setTimeout("slidedown_showHide();hide('ajaxContent');removeThumbs();",1800);
	try
	{
		document.getElementById('wishListError').innerHTML="";
	}
	catch(e)
	{

	}
	//errorDivHide();
	}
}
else
{
window.location = "#"
var errorResponse = xmlDoc.getElementsByTagName("message")[0].childNodes[0].nodeValue;
var errorText = "<table width=\"281\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td height=\"120px\" valign=\"top\" id=\"dropdowntd\" class=\"ContentPink9px\"><span class=\"pmainbold\"><b>"+errorResponse+"</b></span></td></tr></table>"
document.getElementById('error_content').innerHTML = errorText;
slidedown_showHide();
}
	}
  }
  http.send(null);
}

function getCurrencySymbol(currency) {
	var returnVal = ' ';
	if (currency == 'USD' || currency == 'CAD' || currency == 'AUD' || currency == 'HKD' || currency == 'SGD' || currency == 'NZD' || currency == 'TWD') {
		returnVal = '$';
	} else if (currency == 'EUR') {
		returnVal = '&#128;';
	} else if (currency == 'GBP') {
		returnVal = '&#163;';
	} else if (currency == 'JPY') {
		returnVal = '&#165;';
	}
	return returnVal;
}

function addToCart(skuCode,listprice,saleprice,productid){

	var sizeDropDownValueCapture = document.getElementById('sizeDropDown');

	if(sizeDropDownValueCapture){
		sizeDropDownValueCapture=sizeDropDownValueCapture.value;
	}

	var quickViewCheck = document.getElementById('ajaxContent');

	if (quickViewCheck.style.visibility == "visible"){
		sizeDropDownValueCapture = document.getElementById('sizeDropDownQuick').value;
	}





ajaxNodeCheck('ajaxImport','/torrid/store/addToCart.jsp?&sku6digit='+skuCode+'&form=addtocart&listprice='+listprice+'&saleprice='+saleprice+'&qty='+document.getElementById('quantityChange').value+'&productid='+productid+'&skuid='+sizeDropDownValueCapture);
}

function submitWishList(skuCode,listprice,saleprice,productid){
	var sizeDropDownValueCapture = document.getElementById('sizeDropDown');
	var quickViewCheck = document.getElementById('ajaxContent');

	if (sizeDropDownValueCapture){
	sizeDropDownValueCapture = sizeDropDownValueCapture.value;
	}


	if (quickViewCheck.style.visibility == "visible"){

		sizeDropDownValueCapture = document.getElementById('sizeDropDownQuick').value;
	}




if (isLoggedIn){
ajaxNodeCheck('ajaxImport','/torrid/store/addToCart.jsp?sku6digit='+skuCode+'&form=addtowish&listprice='+listprice+'&saleprice='+saleprice+'&qty='+document.getElementById('quantityChange').value+'&productid='+productid+'&skuid='+sizeDropDownValueCapture);
}else{
var errorText2 = "<div style=\"padding-bottom:5px;\"><b>Please <a href=\"/torrid/wishlist/welcome.jsp\" class=\"Content \">log in</a> or <a href=\"/torrid/wishlist/welcome.jsp\" class=\"Content \">create an account</a> to add this item to your wish list.</div>"
var wishlistErrorQuick = document.getElementById('wishListErrorQuick');
	if(wishlistErrorQuick){

	            wishlistErrorQuick.innerHTML=errorText2;

	}else{

	            document.getElementById('wishListError').innerHTML = errorText2;

	}

	}
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

//node page product zoom
function hideNodeImage(imageid) {
document.getElementById(imageid).style.visibility = "hidden";
document.getElementById(imageid).setAttribute("src", mediaClearGif);
}

function showNodeImage(imgsource,imageid) {
document.getElementById(imageid).style.visibility = "visible";
document.getElementById(imageid).setAttribute("src", imgsource);
}

function OpenViewWindow( go_there, width, height,scbar,tbar ){// local clientside javascript
   // mainCleanup();
	if(isNaN(width)) width=390 ;
	if(isNaN(height)) height=427 ;
	if(scbar != "yes") scbar="no" ;
	if(tbar != "yes") tbar ="no" ;
	var bars = "menubar=no,toolbar=no" ;
	if( tbar == "yes" ) bars = "menubar=yes,toolbar=yes" ;

    var strwindow = "toolbar=no,width=" + width + ",height=" + height + ",directories=no,status=no,scrollbars="+scbar+"," + bars + ",resizable=yes";
    if (navigator.appName == "Microsoft Internet Explorer") {
            strwindow = "toolbar=no,width=" + (width-10) + ",height=" + (height-5) + ",directories=no,status=no,scrollbars="+scbar+"," + bars + ",resizable=yes";
    }
    windowpic = window.open(go_there, "wwchild", strwindow);
}

function hidenavNode(){
	hide('nodenav1');
	hide('nodenav2');

}

function shownavNode(){
	show('nodenav1');
	show('nodenav2');

}
function getPosition(element) {
	var left = document.getElementById(element).offsetLeft;
	var top = document.getElementById(element).offsetTop;
	document.getElementById('ajaxContent').style.top=20+top+"px";
	if (left >=400){
		document.getElementById('ajaxContent').style.left= 410+"px";
	}else if (left <= 168){
		document.getElementById('ajaxContent').style.left= 200+"px";
	}else{
		document.getElementById('ajaxContent').style.left= left+"px";
	}
		window.scrollTo(100,top - 100);
	}
function thumbnailShow(imageToSwap){
var mainImage = document.getElementById('mainImage');
mainImage.src = imageToSwap;
}


//added by eddie
function isThumb(image){
	var mainThumb = document.getElementById('mainthumb');
	image.parentNode.style.visibility = 'visible';
	mainThumb.parentNode.style.visibility = 'visible';
}
//jquery time
$(function(){
	//this is for top nav
	$('#nav .topL').hover(
		function () {
			//show its submenu
			$('ul', this).fadeIn(300);
			$(this).children(":first").css({
				backgroundColor: "black",
				color: "white"
			});

		},
		function() {
			$('ul', this).css("display","none");
			if($(this).children(":first").attr("status")!= "selected"){
				//hide its submenu
				$(this).children(":first").css({
					backgroundColor: "white",
					color: "black"
				});
			}
		}
	);
	//on the fly fixes
	if(navigator.userAgent.indexOf("MSIE") != -1){
		$("#headerTopLinks").css("width","245px");
		$("#siteSearchBtn").css("margin-top","1px");
	}

});
//Changes for TR - SB Loyalty - Cross Login - start
function viewRewards(){
	var frmData = $("form[name='frm_tr_sb_sso']").serialize();
	$.ajax({
		type: "POST",
		url: "/torrid/trMember/ajax/openSBPortal.jsp",
		data: frmData,
		dataType: "json",
		cache: false,
		success: function(msg) {
			if(msg!=null){
				if(msg.portalUrl !=null && msg.returnCode == "0"){
					var custPortal = msg.portalUrl;
					var strWindowFeatures = "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no";
					window.open(custPortal,"",strWindowFeatures);
				}else{
					$.colorbox({html:"<br/>&nbsp;" + msg.message + "<br/>&nbsp;"});
				}
			}
		}
	});
}
//Changes for TR - SB Loyalty - Cross Login - end