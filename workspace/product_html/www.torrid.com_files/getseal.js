<!--
dn="www.torrid.com";
lang="en";
tpt="transparent";
vrsn_style="WW";
splash_url="https://trustsealinfo.websecurity.norton.com";
seal_url="https://seal.websecurity.norton.com";

u1=splash_url+"/splash?form_file=fdf/splash.fdf&dn="+dn+"&lang="+lang;u2=seal_url+"/getseal?at=0&sealid=2&dn="+dn+"&lang="+lang;u3=seal_url+"/getseal?at=1&sealid=2&dn="+dn+"&lang="+lang;var sopener;function vrsn_splash(){if(sopener&&!sopener.closed){sopener.focus();}else{tbar="location=yes,status=yes,resizable=yes,scrollbars=yes,width=560,height=500";var sw=window.open(u1,'VRSN_Splash',tbar);if(sw){sw.focus();sopener=sw;}}}
var MM_cVer=6;var plugin=(navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"])?navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin:0;var ver=-1;var v_ua=navigator.userAgent.toLowerCase();var re=new RegExp("msie ([0-9]{1,}[\.0-9]{0,})");if(re.exec(v_ua)!==null){ver=parseFloat(RegExp.$1);}
var v_old_ie=(v_ua.indexOf("msie")!=-1);if(v_old_ie){v_old_ie=ver<5;}
function v_mact(e){var s;if(document.addEventListener){s=(e.target.name=="seal");if(s){vrsn_splash();return false;}}else if(document.captureEvents){var tgt=e.target.toString();s=(tgt.indexOf("splash")!=-1);if(s){vrsn_splash();return false;}}
return true;}
function v_mDown(event){if(document.addEventListener){return true;}
event=event||window.event;if(event){if(event.button==1){if(v_old_ie){return true;}
else{vrsn_splash();return false;}}else if(event.button==2){vrsn_splash();return false;}}else{return true;}}
function v_resized(){if(pageWidth!=innerWidth||pageHeight!=innerHeight){self.history.go(0);}}
if(plugin){var words=navigator.plugins["Shockwave Flash"].description.split(" ");for(var i=0;i<words.length;++i){if(isNaN(parseInt(words[i],10))){continue;}
var MM_pVer=words[i];}
var MM_play=MM_pVer>=MM_cVer;}
else if(navigator.userAgent&&navigator.userAgent.indexOf("MSIE")>=0&&(navigator.appVersion.indexOf("Win")!=-1)){document.write('<SCR'+'IPT LANGUAGE=VBScript\> \n');document.write('on error resume next \n');document.write('MM_play = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & MM_cVer)))\n');document.write('</SCR'+'IPT\> \n');}
if(MM_play){document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');document.write('  codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0"');document.write(' ID="s_s" WIDTH="100" HEIGHT="72" ALIGN="">');document.write(' <PARAM NAME=movie VALUE="'+u3+'"> <PARAM NAME=loop VALUE=false> <PARAM NAME=menu VALUE=false> <PARAM NAME=quality VALUE=best> <PARAM NAME=wmode VALUE='+tpt+'> <PARAM NAME="allowScriptAccess" value="always">');document.write(' <EMBED src="'+u3+'" loop=false menu=false quality=best wmode='+tpt);document.write(' swLiveConnect=FALSE WIDTH="100" HEIGHT="72" NAME="s_s" ALIGN=""');document.write(' TYPE="application/x-shockwave-flash" PLUGINSPAGE="https://www.macromedia.com/go/getflashplayer" allowScriptAccess="always">');document.write(' </EMBED>');document.write(' </OBJECT>');}else{document.write("<a HREF=\"javascript:vrsn_splash()\" tabindex=\"-1\"><IMG NAME=\"seal\" BORDER=\"true\" SRC=\""+u2+"\" oncontextmenu=\"return false;\" alt=\"Click to Verify - This site has chosen an SSL Certificate to improve Web site security\"></A>");if(document.addEventListener){document.addEventListener('mouseup',v_mact,true);}
else{if(document.layers){document.captureEvents(Event.MOUSEDOWN);document.onmousedown=v_mact;}}
if(document.layers){pageWidth=innerWidth;pageHeight=innerHeight;window.onresize=v_resized;}}
if((v_ua.indexOf("msie")!=-1)&&(ver>=7)){var plat=-1;var re=new RegExp("windows nt ([0-9]{1,}[\.0-9]{0,})");if(re.exec(v_ua)!==null){plat=parseFloat(RegExp.$1);}
if((plat>=5.1)&&(plat!=5.2)){document.write("<div style='display:none'>");document.write("<img src='https://extended-validation-ssl.verisign.com/dot_clear.gif'/>");document.write("</div>");}}
-->