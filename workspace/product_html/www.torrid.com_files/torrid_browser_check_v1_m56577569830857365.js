function writeCookie(name, value, hours)
{
  var expire = "";
  if(hours != null)
  {
    expire = new Date((new Date()).getTime() + hours * 3600000);
    expire = "; expires=" + expire.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expire;
}
function readCookie(name)
{
  var cookieValue = "";
  var search = name + "=";
  if(document.cookie.length > 0)
  { 
    offset = document.cookie.indexOf(search);
    if (offset != -1)
    { 
      offset += search.length;
      end = document.cookie.indexOf(";", offset);
      if (end == -1) end = document.cookie.length;
      cookieValue = unescape(document.cookie.substring(offset, end))
    }
  }
  return cookieValue;
}
//Mozilla Check
if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ 
 var ffversion=new Number(RegExp.$1) 
 if (ffversion < 3 && readCookie('browserUpdate') != "True"){
 
 	//24 Hours / set to 6 months testing
	writeCookie("browserUpdate", "True", 2160) 
	
	//write error div
	document.write('<div id="error_close"><a href="#" onMouseDown="slidedown_showHide(); errorDivHide();"><img src="'+mediaClearGif+'" width="20px" height="20px" border="0"></a></div><div id="error_slidedown"><div id="error_control"></div><div id="error_contentBox"><div id="error_content"><table width="281" border="0" cellspacing="0" cellpadding="0"><tr><td height="120px" valign="top" id="dropdowntd" class="ContentPink9px"><div align="center" style="font-size:14px;"><strong>BROWSER ALERT</strong></div><div align="center"style="padding-top:10px;">We see that you are using</div><div align="center"><strong>Firefox '+ffversion+'</strong></div><div align="center" style="padding-top:10px;">Torrid.com looks best on</div><div align="center"><strong><a href="http://www.mozilla.com/en-US/firefox/" class="ContentPink" style="text-decoration:underline" target="_blank">Firefox 3</a> or <a href="http://www.microsoft.com/windows/downloads/ie/getitnow.mspx" class="ContentPink" style="text-decoration:underline" target="_blank">Internet Explorer 7</a></strong></div></div></td></tr></table></div></div></div>')
	slidedown_showHide();
}
}
//IE Check
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ 
 var ieversion=new Number(RegExp.$1) 
 if (ieversion < 7 && readCookie('browserUpdate') != "True"){
 	//24 Hours / set to 6 months testing
	writeCookie("browserUpdate", "True", 2160)
	//write error div
	document.write('<div id="error_close"><a href="#" onMouseDown="slidedown_showHide(); errorDivHide();"><img src="'+mediaClearGif+'" width="20px" height="20px" border="0"></a></div><div id="error_slidedown"><div id="error_control"></div><div id="error_contentBox"><div id="error_content"><table width="281" border="0" cellspacing="0" cellpadding="0"><tr><td height="120px" valign="top" id="dropdowntd" class="ContentPink9px"><div align="center" style="font-size:14px;"><strong>BROWSER ALERT</strong></div><div align="center"style="padding-top:10px;">We see that you are using</div><div align="center"><strong>Internet Explorer '+ieversion+'</strong></div><div align="center" style="padding-top:10px;">Torrid.com looks best on</div><div align="center"><strong><a href="http://www.microsoft.com/windows/downloads/ie/getitnow.mspx" class="ContentPink" style="text-decoration:underline" target="_blank">Internet Explorer 7</a> or <a href="http://www.mozilla.com/en-US/firefox/" class="ContentPink" style="text-decoration:underline" target="_blank">Firefox 3</a></strong></div></div></td></tr></table></div></div></div>')
	// slidedown script
	slidedown_showHide()
	//setTimeout("slidedown_showHide()",5000);
}
}