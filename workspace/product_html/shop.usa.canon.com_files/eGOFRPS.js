eGOFRPS.getCookie=function(a){var b=document.cookie.match("(^|;) ?"+a+"=([^;]*)(;|$)");return b?b[2]:null};eGOFRPS.setCookie=function(a,b,c){var d=new Date;d.setDate(d.getDate()+c);var e=escape(b)+(c==null?"":"; expires="+d.toUTCString());document.cookie=a+"="+e};eGOFRPS.getOrderiFrame=function(a,b){eGOFRPS.cartData={};if(a==""||b==""){b=eGOFRPS.getCookie("storeCookie.catalogId");a=eGOFRPS.getCookie("storeCookie.storeId")}var c="http://shop.usa.canon.com/webapp/wcs/stores/servlet/CusaMiniShopCartDisplay?updatePrices=1&calculationUsageId=-1&catalogId="+a+"&storeId="+b+"&langId=-1&orderId=.";$eGOFRPS(document.body).append('<IFRAME id="eGSA_helper" height="0" width="0" style="display:none">');$eGOFRPS("iframe#eGSA_helper").attr("src",c);$eGOFRPS("iframe#eGSA_helper").load(function(){eGOFRPS.ifCallBack()})};eGOFRPS.getOrder=function(){surl=eGOFRPS.srcPath+"/custom/getCart.jsp?callback=?";wc1=eGOFRPS.getCookie("WC_PERSISTENT");wc2=eGOFRPS.getCookie("WC_SESSION_ESTABLISHED");wc3=eGOFRPS.getCookie("WC_ACTIVEPOINTER");cookie=document.cookie;act=cookie.match(/WC_USERACTIVITY_([-0-9]*)=/);wc_act_id=RegExp.$1;act="WC_USERACTIVITY_"+wc_act_id;wc4=eGOFRPS.getCookie(act);ci=eGOFRPS.getCookie("storeCookie.catalogId");si=eGOFRPS.getCookie("storeCookie.storeId");$eGOFRPS.getJSON(surl,{cid:wc1,wc_session_status:wc2,wc_act_pointer:wc3,storeId:si,catId:ci,wc_act_id:wc_act_id,wc_activity:wc4},function(a){eGOFRPS.cartData["orderId"]=eGOFRPS.getParameterByName(a.url,"orderId");scc=a.html;patt=new RegExp(/>(\$[0-9.,]*)</);scc.match(patt);eGOFRPS.cartData["cartTotal"]=RegExp.$1})};eGOFRPS.ifCallBack=function(){var a=$eGOFRPS("iframe#eGSA_helper").get(0).contentWindow.location.href;var b=eGOFRPS.getParameterByName(a,"orderId");var c="";eGOFRPS.cartData["orderId"]=b;eGOFRPS.cartData["numItems"]=$eGOFRPS("#num-items span",$eGOFRPS("iframe#eGSA_helper").contents()).text();eGOFRPS.cartData["cartTotal"]=$eGOFRPS("#cart-subtotal span",$eGOFRPS("iframe#eGSA_helper").contents()).text();eGOFRPS.cartData["recentlyViewedProducts"]=eGOFRPS.getCookie("recentlyviewedproductscookie");eGOFRPS.cartData["pageurl"]=document.URL;eGOFRPS.cartData["cartdata"]="";z=eGOFRPS.cartData["numItems"];$eGOFRPS(".even h3 a, .odd h3 a",$eGOFRPS("iframe#eGSA_helper").contents()).each(function(a){a=a+1;eGOFRPS.cartData["cartdata"]+=$eGOFRPS.trim($eGOFRPS(this).text())+"::";eGOFRPS.cartData["cartdata"]+=$eGOFRPS(this).attr("href")+(a==z?"":"~")});eGOFRPS.cartData["cartdata"]+="<IMAGES>";$eGOFRPS(".even a img, .odd a img",$eGOFRPS("iframe#eGSA_helper").contents()).each(function(a){a=a+1;eGOFRPS.cartData["cartdata"]+=$eGOFRPS.trim($eGOFRPS(this).attr("src"))+(a==z?"":"~")});$eGOFRPS("iframe#eGSA_helper").remove()};eGOFRPS.getParameterByName=function(a,b){b=b.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var c="[\\?&]"+b+"=([^&#]*)";var d=new RegExp(c);var e=d.exec(a);if(e==null)return"";else return decodeURIComponent(e[1].replace(/\+/g," "))};eGOFRPS.getTimesViewed=function(a){var b=$eGOFRPS.parseJSON(decodeURIComponent(eGOFRPS.getCookie("eGOFRPS_PCOUNT")));if(b!=null&&b[a]!=undefined){return b[a]}return-1};eGOFRPS.trackPageViews=function(){var a=1;var b=window.location.pathname.split("/");b=b[b.length-1];var c=$eGOFRPS.parseJSON(decodeURIComponent(eGOFRPS.getCookie("eGOFRPS_PCOUNT")));if(c!=null){pageArray=c;if(pageArray[b]!=undefined){pageArray[b]=pageArray[b]+1}else{pageArray[b]=1}pageString="{";var d=0;var i;for(i in pageArray){pageString+='"'+i+'"'+":"+pageArray[i]+",";d++}pageString=pageString.replace(/(.+)(,)$/,"$1");pageString+="}";eGOFRPS.setCookie("eGOFRPS_PCOUNT",pageString,1)}else{eGOFRPS.setCookie("eGOFRPS_PCOUNT",'{"'+b+'" : 1}',1)}};eGOFRPS.getTimesAccessed=function(a){var b=$eGOFRPS.parseJSON(decodeURIComponent(eGOFRPS.getCookie("eGOFRPS_CCOUNT")));if(b!=null&&b[a]!=undefined){return b[a]}return-1};eGOFRPS.trackBehavior=function(){var a=1;var b=window.location.pathname.split("/");b=b[b.length-1];b=b.indexOf("product")!=-1?"product details":b.indexOf("subCategory")!=-1?"product list":"other";var c=$eGOFRPS.parseJSON(decodeURIComponent(eGOFRPS.getCookie("eGOFRPS_CCOUNT")));if(c!=null){pageArray=c;if(pageArray[b]!=undefined){pageArray[b]=pageArray[b]+1}else{pageArray[b]=1}pageString="{";var d=0;var i;for(i in pageArray){pageString+='"'+i+'"'+":"+pageArray[i]+",";d++}pageString=pageString.replace(/(.+)(,)$/,"$1");pageString+="}";eGOFRPS.setCookie("eGOFRPS_CCOUNT",pageString,1)}else{eGOFRPS.setCookie("eGOFRPS_CCOUNT",'{"'+b+'" : 1}',1)}};setTimeout("eGOFRPS.trackBehavior()",200)