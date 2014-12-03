function AC_AddExtension(src,ext)
{if(src.indexOf('?')!=-1)
return src.replace(/\?/,ext+'?');else
return src+ ext;}
function AC_Generateobj(objAttrs,params,embedAttrs,parElement)
{var str='<object ';for(var i in objAttrs)
str+=i+'="'+ objAttrs[i]+'" ';str+='>';for(var i in params)
str+='<param name="'+ i+'" value="'+ params[i]+'" /> ';str+='<embed ';for(var i in embedAttrs)
str+=i+'="'+ embedAttrs[i]+'" ';str+=' ></embed></object>';if(parElement==""){document.write(str);}else{if(document.getElementById(parElement))document.getElementById(parElement).innerHTML=str;}}
function loadFlash(){var ret=AC_GetArgs
(arguments,".swf","movie","application/x-shockwave-flash");AC_Generateobj(ret.objAttrs,ret.params,ret.embedAttrs,'');}
function AC_GetArgs(args,ext,srcParamName,mimeType){var ret=new Object();ret.embedAttrs=new Object();ret.params=new Object();ret.objAttrs=new Object();for(var i=0;i<args.length;i=i+2){var currArg=args[i].toLowerCase();switch(currArg){case"pluginspage":ret.embedAttrs[args[i]]=args[i+1];break;case"src":case"movie":args[i+1]=AC_AddExtension(args[i+1],ext);ret.embedAttrs["src"]=args[i+1];ret.params[srcParamName]=args[i+1];ret.objAttrs["data"]=args[i+1];break;case"onafterupdate":case"onbeforeupdate":case"onblur":case"oncellchange":case"onclick":case"ondblClick":case"ondrag":case"ondragend":case"ondragenter":case"ondragleave":case"ondragover":case"ondrop":case"onfinish":case"onfocus":case"onhelp":case"onmousedown":case"onmouseup":case"onmouseover":case"onmousemove":case"onmouseout":case"onkeypress":case"onkeydown":case"onkeyup":case"onload":case"onlosecapture":case"onpropertychange":case"onreadystatechange":case"onrowsdelete":case"onrowenter":case"onrowexit":case"onrowsinserted":case"onstart":case"onscroll":case"onbeforeeditfocus":case"onactivate":case"onbeforedeactivate":case"ondeactivate":case"type":ret.objAttrs[args[i]]=args[i+1];break;case"align":case"vspace":case"hspace":case"class":case"title":case"accesskey":case"name":case"id":case"tabindex":case"width":case"height":ret.embedAttrs[args[i]]=args[i+1];ret.objAttrs[args[i]]=args[i+1];break;default:ret.embedAttrs[args[i]]=ret.params[args[i]]=args[i+1];}}
if(mimeType){ret.embedAttrs["type"]=mimeType;ret.objAttrs["type"]=mimeType;}
return ret;}
loadFlash('align','middle','id','countdown','width','150','height','90','allowScriptAccess','always','quality','high','salign','lt','align','middle','wmode','transparent','movie','http://mycountdown.org/swf/countdown_flash_widget?UTCoffset=0&gid=0&text1=Special Pricing Ends&text2=SpecialPricing Ends&event_time=1419897600&rec=&rnd=0&gha=0&ghb=0&ghf=0&gbc=0F0200&gfc=040244&gtc=F9F9FF&gnu=http://mycountdown.org/My_Countdown/My_Countdown/widget/&fna=fallingStars.swf&ims=');