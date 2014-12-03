var wa=wa||{};wa.config={RELEASE:"20141021",BASE_PATH:"/javascripts/analytics/",includeStates:[{NAME:"preproduction",PROD_MODE:false,HOSTS:["localhost","qa.sephora.com","preview.qa.sephora.com","staging.merchantmail.net","sandbox.qa.sephora.com","origin.qa.sephora.com","staging.illuminate.sephora.com","staging.sephora.com","dev.illuminate.sephora.com","dev.sephora.com","qa.illuminate.sephora.com","qa.sephora.com","m-qa.sephora.com","m-qa.illuminate.sephora.com","community.qa.sephora.com","ebf.sephora.com","test.skedge.me","dev.reserve.sephora.com","dev-canada.sephora.com","fr-dev-canada.sephora.com","qa-canada.sephora.com","fr-qa-canada.sephora.com","fr-sephora-dev.onelink-translations.com","fr-sephora-qa.onelink-translations.com","gallery-qa.sephora.com",new RegExp("\\d+\\.\\d+\\.\\d+\\.\\d+")],INCLUDE_HOST:""},{NAME:"online reservations development/test",PROD_MODE:false,HOSTS:["test.skedge.me","dev.reserve.sephora.com","dev-m-reserve.sephora.com"],INCLUDE_HOST:"dev.illuminate.sephora.com"},{NAME:"online reservations production",PROD_MODE:true,HOSTS:["www.skedge.me","skedge.me","reserve.sephora.com","m-reserve.sephora.com"],INCLUDE_HOST:"www.sephora.com"},{NAME:"external preproduction",PROD_MODE:false,HOSTS:["m-qa.sephora.com","community.qa.sephora.com","m-qa.illuminate.sephora.com"],INCLUDE_HOST:"qa.illuminate.sephora.com"},{NAME:"sephora 2.0 beta",PROD_MODE:true,HOSTS:["beta.sephora.com","illuminate.becho.net"],INCLUDE_HOST:"beta.sephora.com"},{NAME:"production",PROD_MODE:true,HOSTS:["www.sephora.com","sephora.com","shop.sephora.com","community.sephora.com","m.sephora.com","reviews.sephora.com","s.brandingbrandmobile.com","www.sephoracanada.com","birthday.sephora.com","sephoralove.com","www.sephoralove.com","sephoralove.ca","www.sephoralove.ca","app.sephora.com","canada.sephora.com","www.sephora.ca","sephora.ca","fr-canada.sephora.com","coloroftheyear.sephora.com","gallery.sephora.com","sephora.cashstar.com"],INCLUDE_HOST:"www.sephora.com"}]};wa.lineItem=function(productId,productName,skuId,skuName,quantity,price,special,biType,notInStock,isAncillary){this.productId=productId;this.productName=productName;this.skuId=skuId;this.skuName=skuName;this.quantity=quantity;this.price=price;this.special=special?special.toLowerCase():"";this.biType=biType?biType.toLowerCase():"unspecified";this.notInStock=notInStock;this.isAncillary=isAncillary};wa.Payment=function(type,value){this.type=type;this.value=value};wa.Refinement=function(type,value){this.type=type;this.value=value};wa.tries=0;wa.action=function(obj){try{wa.trackAction(obj)}catch(e){if(wa.tries<10){setTimeout(function(){wa.action(obj)},1000);wa.tries++}}};wa.setCookie=function(name,value,days){try{var expires="";if(!wa.isEmpty(days)){var dt=new Date();dt.setTime(dt.getDate()+days);expires="; expires="+dt.toGMTString()}document.cookie=name+"="+escape(value)+expires+"; path=/"}catch(e){}};wa.getCookie=function(name){try{var results=document.cookie.match("(^|;) ?"+name+"=([^;]*)(;|$)");var result=(results&&results.length>2)?unescape(results[2]):"";if(results){return result}else{return null}}catch(e){}};wa.deleteCookie=function(name){this.setCookie(name,"",-1)};wa.loadScript=function(js,callback){try{var b=document.getElementsByTagName("head")[0];var s=document.createElement("script");if(s.readyState){s.onreadystatechange=function(){if(s.readyState=="loaded"||s.readyState=="complete"){s.onreadystatechange=null;callback()}}}else{s.onload=function(){callback()}}s.type="text/javascript";s.src=js;b.appendChild(s)}catch(e){}};wa.isEmpty=function(a){return a===null||typeof a=="undefined"||a===""};wa.inStringRegExpList=function(a,v){for(var i=a.length;i--;){if(typeof a[i]=="string"&&a[i]==v){return true}else{if(a[i] instanceof RegExp&&a[i].test(v)){return true}}}return false};wa.getQueryParam=function(name,href){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var result=RegExp("[\\?&]"+name+"=([^&#]*)").exec(href);return result===null?"":decodeURIComponent(result[1].replace(/\+/g," "))};wa.clean=function(txt){txt=decodeURIComponent(decodeURIComponent(decodeURIComponent(txt)));return txt};wa.initOnReady=function(){if(wa.config.ready){if((typeof wa!=="undefined")&&("waInitReady" in wa)){wa.init()}else{$("body").one("waInitReady",function(){wa.init()})}}else{wa.config.ready=true}};wa.loadWa2=function(){var host=location.hostname.toLowerCase();var includeStateFound=false;var i=wa.config.includeStates.length;while(i--&&!includeStateFound){var state=wa.config.includeStates[i];includeStateFound=(wa.inStringRegExpList(state.HOSTS,host))?true:includeStateFound;if(includeStateFound){wa.config.includeName=state.NAME;wa.config.includeHost=state.INCLUDE_HOST;wa.config.prodMode=state.PROD_MODE}}if(!includeStateFound){wa.config.includeName="no include state found";wa.config.includeHost="";wa.config.prodMode=false}var locationPort="";if(!wa.isEmpty(location.port)){locationPort=":"+location.port}wa.config.baseURL=(wa.isEmpty(wa.config.includeHost))?"//"+host+locationPort:"//"+wa.config.includeHost;wa.config.baseURL+=wa.config.BASE_PATH;wa.loadScript(wa.config.baseURL+"wa2.js?release="+wa.config.RELEASE,function(){wa.config.ready=true;wa.initOnReady()});try{jQuery(document).ready(function(){});wa.config.jQueryFound=true}catch(e){wa.config.jQueryFound=false;if(window.addEventListener){}else{if(window.attachEvent){}}}};