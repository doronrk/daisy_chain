jQuery.fn.extend({getUrlParam:function(strParamName){strParamName=escape(unescape(strParamName));var returnVal=new Array();var qString=null;if($(this).attr("nodeName")=="#document"){if(window.location.search.search(strParamName)>-1){qString=window.location.search.substr(1,window.location.search.length).split("&");}}else{if($(this).attr("href")!="undefined"){var strHref=$(this).attr("href");if(strHref.indexOf("?")>-1){var strQueryString=strHref.substr(strHref.indexOf("?")+1);qString=strQueryString.split("&");}}else{if($(this).attr("src")!="undefined"){var strHref=$(this).attr("src");if(strHref.indexOf("?")>-1){var strQueryString=strHref.substr(strHref.indexOf("?")+1);qString=strQueryString.split("&");}}else{return null;}}}if(qString==null){return null;}for(var i=0;i<qString.length;i++){if(escape(unescape(qString[i].split("=")[0]))==strParamName){returnVal.push(qString[i].split("=")[1]);}}if(returnVal.length==0){return null;}else{if(returnVal.length==1){return returnVal[0];}else{return returnVal;}}}});